import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Loader2, Sparkles, MapPin, X, Globe, Zap, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotionAPI } from '../../services/api';

const EmotionDiscover = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
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
    };

    const handleDiscover = async () => {
        if (!imgSrc) return;
        setLoading(true);

        try {
            // Convert base64 to blob
            const fetchRes = await fetch(imgSrc);
            const blob = await fetchRes.blob();

            const formData = new FormData();
            formData.append('image', blob, 'capture.jpg');

            // Mocking geo-data if not available
            formData.append('lat', '33.6844');
            formData.append('lng', '73.0479');

            const response = await emotionAPI.detect(formData);
            setResult(response.data);
        } catch (err) {
            console.error('Detection failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-black tracking-tighter uppercase leading-none mb-3">Initialize Discovery</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Map internal energy to spatial sanctuary</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2.5 border-2 border-slate-200 hover:border-black transition-all rounded-full group"
                    >
                        <Settings className="w-5 h-5 text-slate-400 group-hover:text-black" />
                    </button>
                    <div className="px-6 py-2.5 border-2 border-black bg-black text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-brutal">
                        <MapPin className="w-3 h-3 text-primary-DEFAULT" />
                        Protocol Locked
                    </div>
                </div>
            </div>

            {showSettings && (
                <div className="p-6 bg-slate-50 border-2 border-black mb-8 animate-in slide-in-from-top-4">
                    <label className="text-[10px] font-black uppercase tracking-widest mb-2 block">Select Input Device</label>
                    <div className="flex gap-2 flex-wrap">
                        {devices.map((device, key) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedDeviceId(device.deviceId);
                                    setShowSettings(false);
                                }}
                                className={`px-4 py-2 text-xs font-bold border-2 ${selectedDeviceId === device.deviceId ? 'bg-black text-white border-black' : 'bg-white text-black border-slate-200 hover:border-black'} transition-all uppercase tracking-wide`}
                            >
                                {device.label || `Device ${key + 1}`}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Webcam / Capture Section */}
                <div className="bg-white border-2 border-black p-6 flex flex-col items-center justify-center relative overflow-hidden group shadow-brutal">
                    <div className="relative w-full aspect-video bg-black border-2 border-black overflow-hidden mb-6">
                        {!imgSrc ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover"
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
                            backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    <div className="flex gap-4 w-full">
                        {!imgSrc ? (
                            <button
                                onClick={capture}
                                className="flex-1 bg-black text-white border-2 border-black py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                <Camera className="w-5 h-5" />
                                Capture Frame
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={retake}
                                    className="flex-1 bg-white text-black border-2 border-black py-4 font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Retake
                                </button>
                                {!result && (
                                    <button
                                        disabled={loading}
                                        onClick={handleDiscover}
                                        className="flex-1 bg-primary-DEFAULT text-white border-2 border-black py-4 font-black uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                            <>
                                                <Zap className="w-5 h-5 text-black fill-black" />
                                                <span className="text-black">Analyze</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Result Section */}
                <div className="space-y-8">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {/* Emotion Card */}
                                <div className="bg-black border-2 border-black p-12 text-white relative overflow-hidden shadow-brutal">
                                    <div className="absolute top-0 right-0 p-12 opacity-20">
                                        <Sparkles className="w-40 h-40 text-primary-DEFAULT" />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] mb-6">Subjective Evaluation</p>
                                        <h3 className="text-7xl font-black tracking-tighter leading-none uppercase mb-8">
                                            {result.emotion}
                                        </h3>
                                        <div className="flex items-center gap-4 bg-white/10 border border-white/20 p-5 inline-flex self-start">
                                            <div className="text-[10px] font-black text-primary-DEFAULT uppercase tracking-widest">Confidence: {Math.round(result.confidence * 100)}%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Places Grid */}
                                <div>
                                    <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-6 px-1 bg-primary-DEFAULT inline-block text-white">Resonant Destinations</h4>
                                    <div className="space-y-4">
                                        {result.places.map((place, i) => (
                                            <motion.a
                                                key={i}
                                                href={place.mapLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="block p-8 bg-white border-2 border-black hover:bg-black hover:text-white transition-all group shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h5 className="text-xl font-black tracking-tight leading-none mb-2 group-hover:text-primary-DEFAULT transition-colors uppercase">{place.name}</h5>
                                                        <p className="text-[10px] font-black text-slate-400 group-hover:text-white/50 uppercase tracking-widest">{place.category}</p>
                                                    </div>
                                                    <div className="w-12 h-12 border-2 border-black group-hover:border-white group-hover:bg-primary-DEFAULT flex items-center justify-center transition-all bg-white">
                                                        <MapPin className="w-5 h-5 text-black group-hover:text-white" />
                                                    </div>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full bg-white border-2 border-black p-16 flex flex-col items-center justify-center text-center opacity-100 shadow-brutal">
                                <Globe className="w-20 h-20 text-black mb-10" />
                                <h4 className="text-xl font-black text-black uppercase tracking-widest">Protocol Idle</h4>
                                <p className="text-sm font-bold text-slate-500 mt-4 max-w-xs">Initialize analysis to unlock resonant spatial coordinates.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default EmotionDiscover;
