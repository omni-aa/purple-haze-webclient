import { useEffect, useState } from "react";
import {
    Link,
    NavLink,
    useLocation,
} from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Home,
    Menu,
    X,
    Info,
    Newspaper,
    Globe,
    Contact,
    HatGlasses,
} from "lucide-react";


import { motion, AnimatePresence } from "framer-motion";
import {ModeToggle} from "@/components/ui/theme-provider/dark-mode-toggle.tsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); // ✅ Reactive router location

    // Handle scroll background opacity
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    const navigation = [
        { path: "/", label: "Home", icon: Home },
        { path: "/signin", label: "Sign In", icon: Newspaper },
        { path: "/signup", label: "Sign Up", icon: Globe },
        { path: "/about-us", label: "About Us", icon: Info },
        { path: "/contact-us", label: "Contact Us", icon: Contact },
        { path: "/privacy-policy", label: "Privacy Policy", icon: HatGlasses },
    ];

    return (
        <>
            <div className="flex flex-col bg-background dark:bg-background-dark">
                {/* Header */}
                <header
                    className={cn(
                        "sticky top-0 z-50 backdrop-blur-md transition-all duration-300 border-b",
                        scrolled
                            ? "bg-background/80 dark:bg-background-dark/80 border-border/40 dark:border-border-dark/40"
                            : "bg-background/95 dark:bg-background-dark/95 border-transparent"
                    )}
                >
                    {/* Gradient Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-40" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex items-center justify-between h-16">
                            {/* Brand */}
                            <Link to="/" className="flex items-center space-x-2 group relative">
                                <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-primary/50">
                                    <span className="text-white font-bold text-sm">PA</span>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 dark:from-foreground-dark dark:to-foreground-dark/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-primary/70">
                  Proj-Ariel
                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-3">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path; // ✅ Track route reactively
                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                cn(
                                                    "relative flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-200",
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-foreground/70 dark:text-foreground-dark/70 hover:text-foreground dark:hover:text-foreground-dark"
                                                )
                                            }
                                        >
                                            <Icon size={18} />
                                            <span>{item.label}</span>

                                            {/* ✅ Active underline animation */}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="activeNavUnderline"
                                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 500,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                        </NavLink>
                                    );
                                })}
                            </nav>

                            {/* Right Controls */}
                            <div className="flex items-center space-x-2">
                                <ModeToggle />
                                {/* Mobile Menu Button */}
                                <button
                                    aria-label="Toggle menu"
                                    aria-expanded={isOpen}
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="md:hidden p-2 rounded-lg bg-muted/50 dark:bg-muted-dark/50 hover:bg-muted dark:hover:bg-muted-dark transition-colors"
                                >
                                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Navigation with Framer Motion */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="mobileMenu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-0 z-40 md:hidden"
                        >
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm"
                                onClick={closeMenu}
                            />

                            {/* Menu Panel */}
                            <div className="absolute right-0 top-0 h-full w-80 bg-background dark:bg-background-dark border-l border-border/40 dark:border-border-dark/40 shadow-2xl flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-border/40 dark:border-border-dark/40">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">PA</span>
                                        </div>
                                        <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 dark:from-foreground-dark dark:to-foreground-dark/80 bg-clip-text text-transparent">
                      Proj-Ariel
                    </span>
                                    </div>
                                    <button
                                        onClick={closeMenu}
                                        className="p-2 rounded-lg hover:bg-muted/50 dark:hover:bg-muted-dark/50 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Nav Items */}
                                <div className="h-full overflow-y-auto p-6 space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-foreground/60 dark:text-foreground-dark/60 uppercase tracking-wide px-2">
                                            Navigation
                                        </h3>
                                        {navigation.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <NavLink
                                                    key={item.path}
                                                    to={item.path}
                                                    onClick={closeMenu}
                                                    className={({ isActive }) =>
                                                        cn(
                                                            "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group",
                                                            isActive
                                                                ? "text-primary bg-primary/10 dark:bg-primary-dark/10 shadow-sm"
                                                                : "text-foreground/70 dark:text-foreground-dark/70 hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted/50 dark:hover:bg-muted-dark/50"
                                                        )
                                                    }
                                                >
                                                    <div
                                                        className={cn(
                                                            "p-2 rounded-lg transition-all duration-200",
                                                            "bg-muted/50 dark:bg-muted-dark/50 group-hover:bg-primary/10 dark:group-hover:bg-primary-dark/10"
                                                        )}
                                                    >
                                                        <Icon size={18} />
                                                    </div>
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            );
                                        })}
                                    </div>

                                    {/* Bottom note */}
                                    <div className="pt-8 text-center text-sm text-foreground/40 dark:text-foreground-dark/40">
                                        Proj-Ariel © {new Date().getFullYear()}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                </main>

            </div>
        </>
    );
};

export default Navbar;