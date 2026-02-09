import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Loader2, Sparkles, MapPin, Globe, Zap, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { emotionAPI } from '../../services/api';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map centering
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const EmotionDiscover = ({ onAnalysisComplete }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    const handleDevices = useCallback(
        (mediaDevices) =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setResult(null);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
        setResult(null);
        setError(null);
    };

    const handleDiscover = async () => {
        if (!imgSrc) return;
        setLoading(true);
        setError(null);

        try {
            console.log('[EmotionDiscover] Starting emotion detection...');
            let lat = '33.6844';
            let lng = '73.0479';

            if ("geolocation" in navigator) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                    });
                    lat = position.coords.latitude.toString();
                    lng = position.coords.longitude.toString();
                    console.log('[EmotionDiscover] Got location:', lat, lng);
                } catch (geoErr) {
                    console.warn('[EmotionDiscover] Geolocation denied, using fallback', geoErr);
                }
            }

            console.log('[EmotionDiscover] Converting image to blob...');
            const fetchRes = await fetch(imgSrc);
            const blob = await fetchRes.blob();
            console.log('[EmotionDiscover] Blob size:', blob.size);

            const formData = new FormData();
            formData.append('image', blob, 'capture.jpg');
            formData.append('lat', lat);
            formData.append('lng', lng);

            console.log('[EmotionDiscover] Sending to API...');
            const response = await emotionAPI.detect(formData);
            console.log('[EmotionDiscover] Response:', response.data);
            setResult(response.data);
            if (onAnalysisComplete) onAnalysisComplete(response.data);
        } catch (err) {
            console.error('[EmotionDiscover] Detection failed:', err);
            const errorMsg = err.response?.data?.msg || err.response?.data?.error || err.message || 'Detection failed';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* Header - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-black tracking-tighter uppercase leading-none mb-2">Initialize Discovery</h2>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Map energy to sanctuary</p>
                </div>
                <div className="flex gap-2 md:gap-3">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 border-4 border-black hover:bg-black hover:text-white transition-all"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                    <div className="px-3 md:px-4 py-2 border-4 border-black bg-black text-white text-[9px] font-black uppercase tracking-wide flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="hidden sm:inline">Active</span>
                    </div>
                </div>
            </div>

            {/* Device Settings */}
            {showSettings && (
                <div className="p-4 bg-slate-50 border-4 border-black">
                    <label className="text-[10px] font-black uppercase tracking-widest mb-2 block">Select Device</label>
                    <div className="flex gap-2 flex-wrap">
                        {devices.map((device, key) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedDeviceId(device.deviceId);
                                    setShowSettings(false);
                                }}
                                className={`px-3 py-1.5 text-[10px] font-bold border-4 ${selectedDeviceId === device.deviceId ? 'bg-black text-white border-black' : 'bg-white text-black border-black hover:bg-slate-50'} transition-all uppercase tracking-wide`}
                            >
                                {device.label || `Device ${key + 1}`}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className={`grid ${result ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-4 md:gap-6`}>
                {/* Webcam Section */}
                <div className="bg-white flex flex-col">
                    {/* Camera View - Responsive height */}
                    <div className={`relative w-full ${result ? 'h-[280px] md:h-[350px]' : 'h-[300px] md:h-[400px] lg:h-[450px]'} bg-black border-4 border-black overflow-hidden`}>
                        {!imgSrc ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover grayscale"
                                videoConstraints={{
                                    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined
                                }}
                                onUserMediaError={(err) => console.error("Webcam Error:", err)}
                            />
                        ) : (
                            <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
                        )}

                        {/* Overlay Grid */}
                        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(to right, #FF4D00 1px, transparent 1px), linear-gradient(to bottom, #FF4D00 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}></div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-primary z-20"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-primary z-20"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-primary z-20"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-primary z-20"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                        {!imgSrc ? (
                            <button
                                onClick={capture}
                                className="flex-1 btn-brutal btn-brutal-primary flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 text-xs md:text-sm"
                            >
                                <Camera className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Capture</span>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={retake}
                                    className="flex-1 btn-brutal flex items-center justify-center gap-2 py-3 md:py-4 text-xs md:text-sm"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Retake</span>
                                </button>
                                {!result && (
                                    <button
                                        disabled={loading}
                                        onClick={handleDiscover}
                                        className="flex-1 btn-brutal btn-brutal-primary flex items-center justify-center gap-2 py-3 md:py-4 text-xs md:text-sm disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                            <>
                                                <Zap className="w-4 h-4" />
                                                <span>Analyze</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border-4 border-red-500 flex items-start gap-3">
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Error</p>
                                <p className="text-sm font-bold text-red-800">{error}</p>
                            </div>
                            <button
                                onClick={() => setError(null)}
                                className="p-2 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all text-red-500 font-black text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        {/* Emotion Card */}
                        <div className="bg-black border-4 border-black p-6 md:p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <Sparkles className="w-20 h-20 md:w-24 md:h-24 text-primary" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.4em] mb-4">Detected Emotion</p>
                                <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase mb-4">
                                    {result.emotion}
                                </h3>
                                <div className="flex items-center gap-3 bg-white/10 border-2 border-white/20 p-3 inline-flex">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Confidence: {Math.round(result.confidence * 100)}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Map - Responsive height */}
                        <div className="h-[200px] md:h-[250px] border-4 border-black relative z-0">
                            <MapContainer
                                center={[result.places?.[0]?.lat || 33.6844, result.places?.[0]?.lng || 73.0479]}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <ChangeView
                                    center={[result.places?.[0]?.lat || 33.6844, result.places?.[0]?.lng || 73.0479]}
                                    zoom={13}
                                />
                                {result.places && result.places.map((place, idx) => (
                                    <Marker key={idx} position={[place.lat, place.lng]}>
                                        <Popup>
                                            <div className="font-black uppercase text-[10px] tracking-widest">
                                                {place.name}
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>

                        {/* Places List */}
                        <div>
                            <h4 className="text-[9px] font-black text-black uppercase tracking-[0.3em] mb-3 px-1 bg-primary inline-block text-white">Destinations</h4>
                            <div className="space-y-2">
                                {result.places && result.places.length > 0 ? (
                                    result.places.slice(0, 3).map((place, i) => (
                                        <motion.a
                                            key={i}
                                            href={place.mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="block p-4 md:p-5 bg-white border-4 border-black hover:bg-black hover:text-white transition-all group shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <h5 className="text-sm md:text-base font-black tracking-tight leading-none mb-1 group-hover:text-primary transition-colors uppercase truncate">{place.name}</h5>
                                                    <p className="text-[9px] font-black text-slate-400 group-hover:text-white/50 uppercase tracking-widest">{place.category}</p>
                                                </div>
                                                <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-black group-hover:border-white group-hover:bg-primary flex items-center justify-center transition-all bg-white flex-shrink-0 ml-3">
                                                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-black group-hover:text-white" />
                                                </div>
                                            </div>
                                        </motion.a>
                                    ))
                                ) : (
                                    <div className="p-4 bg-slate-50 border-4 border-dashed border-black text-center">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">No locations found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EmotionDiscover;
