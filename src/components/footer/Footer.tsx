import { Github, Mail, Twitch, Twitter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-gray-200 overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute inset-0">
                <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* Upper Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-5">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-700/30">
                                <span className="text-white font-bold text-xl">PA</span>
                            </div>
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300">
                                Proj-Ariel
                            </h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed max-w-lg text-sm md:text-base">
                            Empowering adventurers with cutting-edge tools and innovative solutions.
                            We build the future of interactive experiences.
                        </p>

                        <div className="flex space-x-4 mt-8">
                            {[
                                { icon: Mail, href: "mailto:contact@auroraproject.com", label: "Email" },
                                { icon: Github, href: "https://github.com/auroraproject", label: "GitHub" },
                                { icon: Twitch, href: "https://twitch.tv/auroraproject", label: "Twitch" },
                                { icon: Twitter, href: "https://twitter.com/auroraproject", label: "Twitter" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 bg-indigo-800/40 hover:bg-indigo-700/70 backdrop-blur-md rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] group"
                                    aria-label={label}
                                >
                                    <Icon size={18} className="text-gray-300 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center">
                            Navigation
                            <ExternalLink size={16} className="ml-2 opacity-70" />
                        </h3>
                        <nav className="space-y-3 text-sm">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/News", label: "News" },
                                { to: "/Explore", label: "Explore" },

                            ].map(({ to, label }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5">Resources</h3>
                        <nav className="space-y-3 text-sm">
                            {[
                                { to: "/about-us", label: "About Us" },
                                { to: "/privacy-policy", label: "Privacy Policy" },
                                { to: "/contact-us", label: "Contact Us" },
                            ].map(({ to, label }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-indigo-800/50 my-6"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm space-y-4 md:space-y-0">
                    <div>
                        © {new Date().getFullYear()}{" "}
                        <span className="text-white font-medium">Proj-Ariel</span>. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-3">
                        <span>Built with 💜 Passion</span>
                        <span className="opacity-50">•</span>
                        <span className="opacity-50">•</span>
                        <span>Community Driven</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;