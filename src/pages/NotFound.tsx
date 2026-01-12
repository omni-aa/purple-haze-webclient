import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, AlertCircle, Ghost, Sparkles, Navigation, Rocket } from "lucide-react";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 text-white overflow-auto">
            {/* Animated stars */}
            <div className="absolute inset-0">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] sm:w-[2px] sm:h-[2px] bg-white rounded-full"
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                        }}
                        animate={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                        }}
                        transition={{
                            duration: Math.random() * 8 + 4,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            {/* Content container */}
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 relative z-10">
                <div className="w-full max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-4 sm:mb-6 md:mb-8 px-2"
                    >
                        <motion.h1
                            className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-bold mb-2 sm:mb-3 md:mb-4"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                404
                            </span>
                        </motion.h1>

                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold">
                                Lost in Digital Space
                            </h2>
                            <Ghost className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                        </div>

                        <p className="text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                            The page you're looking for has drifted into the cosmic void.
                        </p>
                    </motion.div>

                    {/* Main content area */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 px-2 sm:px-4">
                        {/* Planet with astronaut - Mobile first */}
                        <div className="flex-1 flex justify-center order-2 lg:order-1">
                            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                                {/* Planet */}
                                <motion.div
                                    className="w-full h-full rounded-full bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                >
                                    {/* Planet details */}
                                    <div className="absolute top-4 left-4 xs:top-6 xs:left-6 sm:top-8 sm:left-8 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full blur-sm" />
                                    <div className="absolute bottom-6 right-6 xs:bottom-8 xs:right-8 sm:bottom-12 sm:right-12 w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-purple-400/20 rounded-full blur-sm" />

                                    {/* Astronaut */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        animate={{
                                            y: [0, -10, 0],
                                            x: [0, 6, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="relative">
                                            <div className="w-7 h-8 xs:w-8 xs:h-10 sm:w-10 sm:h-12 bg-white rounded-md sm:rounded-lg">
                                                <div className="absolute top-1.5 left-2 xs:top-2 xs:left-2.5 sm:top-2 sm:left-3 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 bg-gray-900 rounded-full" />
                                            </div>
                                            <motion.div
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="absolute -top-1 xs:-top-1.5 sm:-top-2 left-1/2 -translate-x-1/2"
                                            >
                                                <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Ring */}
                                <motion.div
                                    className="absolute -inset-4 xs:-inset-5 sm:-inset-6 md:-inset-7"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="w-full h-0.5 xs:h-0.75 sm:h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-full" />
                                </motion.div>

                                {/* Satellite */}
                                <motion.div
                                    className="absolute top-0 right-0"
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <Rocket className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-cyan-300" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Error info and buttons */}
                        <div className="flex-1 max-w-md w-full order-1 lg:order-2 mb-4 sm:mb-0">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10 mb-4 sm:mb-5 md:mb-6"
                            >
                                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                    <Navigation className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2">Navigation Error</h3>
                                        <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
                                            Our scanners can't find the page you requested.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    {["URL might be incorrect", "Page could have been moved", "Cosmic interference detected"].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 sm:gap-3">
                                            <motion.div
                                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full flex-shrink-0"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                            />
                                            <span className="text-xs sm:text-sm md:text-base text-gray-200">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate(-1)}
                                    className="flex-1 p-3 sm:p-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20
                                    backdrop-blur-sm rounded-lg sm:rounded-xl border border-cyan-500/30
                                    flex items-center justify-center gap-2 sm:gap-3 font-medium hover:bg-cyan-600/30 transition-all duration-200
                                    text-sm sm:text-base"
                                >
                                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Go Back</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate("/")}
                                    className="flex-1 p-3 sm:p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20
                                    backdrop-blur-sm rounded-lg sm:rounded-xl border border-purple-500/30
                                    flex items-center justify-center gap-2 sm:gap-3 font-medium hover:bg-purple-600/30 transition-all duration-200
                                    text-sm sm:text-base"
                                >
                                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Return Home</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Additional info for mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="block lg:hidden mt-4 px-2"
                    >
                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">

                            <span className="text-xs">Lost in space? We're here to help</span>
                        </div>
                    </motion.div>

                    {/* footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center pt-3 sm:pt-4 border-t border-white/10 mt-4 sm:mt-6 px-2"
                    >
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Need assistance? <span className="text-cyan-300">support@example.com</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}