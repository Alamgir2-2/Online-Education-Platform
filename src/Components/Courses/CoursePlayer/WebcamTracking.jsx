import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js'; // Import face-api.js for face detection

const WebcamTracking = ({ onFaceDetected, onFaceLost }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      // Load the models needed for face detection
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing webcam:', err);
        });
    };

    const detectFace = async () => {
      if (videoRef.current) {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detection) {
          onFaceDetected(); // Face detected
        } else {
          onFaceLost(); // No face detected
        }
      }
    };

    loadModels().then(() => {
      startVideo();
      videoRef.current.addEventListener('play', () => {
        const intervalId = setInterval(detectFace, 500); // Run face detection every 500ms
        return () => clearInterval(intervalId);
      });
    });
  }, [onFaceDetected, onFaceLost]);

  return <video ref={videoRef} autoPlay muted className="hidden" />; // Hidden video element for webcam feed
};

export default WebcamTracking;
