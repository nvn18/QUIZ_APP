import { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle, RotateCcw } from 'lucide-react';

interface CameraSetupProps {
  onComplete: (photoData: string) => void;
}

export default function CameraSetup({ onComplete }: CameraSetupProps) {
  const [cameraStatus, setCameraStatus] = useState<'requesting' | 'active' | 'captured'>('requesting');
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraStatus('active');
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera access to continue.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const data = canvas.toDataURL('image/jpeg');
        setPhotoData(data);
        setCameraStatus('captured');
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setPhotoData(null);
    setCameraStatus('requesting');
    setTimeout(startCamera, 100);
  };

  const confirmPhoto = () => {
    if (photoData) {
      onComplete(photoData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-400 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-4 rounded-full shadow-lg">
              <Camera className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Identity Verification
          </h2>
          <p className="text-white/80 text-center mb-8">
            {cameraStatus === 'requesting' && 'Initializing camera...'}
            {cameraStatus === 'active' && 'Position yourself in the frame and capture your photo'}
            {cameraStatus === 'captured' && 'Review your photo and confirm'}
          </p>

          <div className="relative bg-black/40 rounded-2xl overflow-hidden mb-6">
            {cameraStatus !== 'captured' ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-96 object-cover"
              />
            ) : (
              <img
                src={photoData || ''}
                alt="Captured"
                className="w-full h-96 object-cover"
              />
            )}

            <div className="absolute top-4 right-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                cameraStatus === 'active' ? 'bg-green-500' :
                cameraStatus === 'captured' ? 'bg-blue-500' : 'bg-yellow-500'
              } text-white font-medium`}>
                <div className={`w-2 h-2 rounded-full ${
                  cameraStatus === 'active' ? 'bg-white animate-pulse' : 'bg-white'
                }`} />
                {cameraStatus === 'requesting' && 'Initializing...'}
                {cameraStatus === 'active' && 'Camera Active'}
                {cameraStatus === 'captured' && 'Photo Captured'}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400 rounded-xl p-4 mb-6">
              <p className="text-red-200 text-center">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            {cameraStatus === 'active' && (
              <button
                onClick={capturePhoto}
                className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
            )}

            {cameraStatus === 'captured' && (
              <>
                <button
                  onClick={retakePhoto}
                  className="flex-1 bg-white/20 border border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake
                </button>
                <button
                  onClick={confirmPhoto}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm & Continue
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
