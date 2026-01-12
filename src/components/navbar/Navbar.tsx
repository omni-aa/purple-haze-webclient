import { useEffect, useState, useRef, FormEvent } from "react";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
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
    User,
    LogOut,
    UserCircle,
    LayoutDashboard,
    ChevronDown,
    ChevronUp,
    Settings,
    HelpCircle,
    Search,
    History,
    TrendingUp,
    BookOpen,
    FileText,
    ChevronRight, // Added missing import
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/dark-mode-toggle.tsx";
import { ROUTE_PATHS } from "@/routes.ts";
import { Button } from "@/components/ui/button";

// Mock search data - replace with your actual data or API
const mockSearchResults = [
    { id: 1, title: "Getting Started Guide", category: "Documentation", path: "/docs/getting-started", icon: BookOpen },
    { id: 2, title: "Project Dashboard", category: "Features", path: "/features/dashboard", icon: LayoutDashboard },
    { id: 3, title: "Team Collaboration", category: "Features", path: "/features/team", icon: Globe },
    { id: 4, title: "API Documentation", category: "Documentation", path: "/docs/api", icon: FileText },
    { id: 5, title: "Recent Updates", category: "Blog", path: "/blog/updates", icon: Newspaper },
    { id: 6, title: "Contact Support", category: "Help", path: "/contact", icon: Contact },
    { id: 7, title: "Privacy Policy", category: "Legal", path: "/privacy", icon: HatGlasses },
    { id: 8, title: "User Settings", category: "Account", path: "/settings", icon: Settings },
];

// Mock recent searches
const mockRecentSearches = [
    "dashboard setup",
    "team management",
    "API integration",
    "project templates",
];

// Search component
const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setShowResults(true);

        // Simulate API delay
        setTimeout(() => {
            const filteredResults = mockSearchResults.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
            setIsLoading(false);
        }, 300);
    };

    const handleQuickSearch = (query: string) => {
        setSearchQuery(query);
        const filteredResults = mockSearchResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setShowResults(true);
    };

    const handleResultClick = (path: string) => {
        navigate(path);
        onClose();
        setSearchQuery("");
        setShowResults(false);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setShowResults(false);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 dark:bg-background-dark/95 backdrop-blur-md z-50"
            onClick={onClose}
        >
            <div className="container mx-auto px-4 pt-20">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="max-w-3xl mx-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-foreground/40 group-focus-within:text-primary" size={24} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (e.target.value.length > 0) {
                                    handleQuickSearch(e.target.value);
                                } else {
                                    setShowResults(false);
                                }
                            }}
                            placeholder="Search documentation, features, help..."
                            className="w-full pl-16 pr-24 py-5 bg-background dark:bg-background-dark rounded-2xl border-2 border-border/50 dark:border-border-dark/50 shadow-2xl text-lg focus:outline-none focus:border-primary transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="px-3 py-1 text-sm text-foreground/60 hover:text-foreground bg-muted/50 rounded-lg transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                            >
                                Esc
                            </button>
                        </div>
                    </form>

                    {/* Search Results */}
                    <AnimatePresence>
                        {showResults ? (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-6 bg-background dark:bg-background-dark rounded-xl border border-border/50 dark:border-border-dark/50 shadow-xl overflow-hidden"
                            >
                                <div className="p-4 border-b border-border/30 dark:border-border-dark/30">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground/80">
                                            {isLoading ? "Searching..." : `Results (${searchResults.length})`}
                                        </h3>
                                        {searchQuery && (
                                            <span className="text-sm text-foreground/60">
                                                Search: "{searchQuery}"
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="p-8 text-center">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p className="mt-3 text-foreground/60">Searching...</p>
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="divide-y divide-border/30 dark:divide-border-dark/30">
                                        {searchResults.map((result) => {
                                            const Icon = result.icon;
                                            return (
                                                <button
                                                    key={result.id}
                                                    onClick={() => handleResultClick(result.path)}
                                                    className="w-full text-left p-4 hover:bg-muted/30 dark:hover:bg-muted-dark/30 transition-colors group"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                            <Icon size={18} className="text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium group-hover:text-primary transition-colors">
                                                                {result.title}
                                                            </div>
                                                            <div className="text-sm text-foreground/60 mt-1">
                                                                {result.category} • Click to navigate
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="opacity-0 group-hover:opacity-60 transition-opacity" size={18} />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <Search size={40} className="mx-auto text-foreground/30 mb-3" />
                                        <h4 className="font-medium text-foreground/80">No results found</h4>
                                        <p className="text-sm text-foreground/60 mt-1">
                                            Try different keywords or browse our documentation
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ) : searchQuery.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-6 bg-background dark:bg-background-dark rounded-xl border border-border/50 dark:border-border-dark/50 shadow-xl overflow-hidden"
                            >
                                <div className="p-4 border-b border-border/30 dark:border-border-dark/30">
                                    <h3 className="font-semibold text-foreground/80">Recent Searches</h3>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {mockRecentSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickSearch(search)}
                                                className="px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-lg text-sm text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2"
                                            >
                                                <History size={12} />
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                                            <TrendingUp size={14} />
                                            Trending Searches
                                        </h4>
                                        <div className="space-y-2">
                                            {mockSearchResults.slice(0, 3).map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleResultClick(item.path)}
                                                        className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-colors flex items-center gap-3 group"
                                                    >
                                                        <Icon size={16} className="text-foreground/50 group-hover:text-primary" />
                                                        <span className="text-sm">{item.title}</span>
                                                        <span className="text-xs text-foreground/40 ml-auto">{item.category}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    {/* Search Tips */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-4 text-sm text-foreground/50">
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">↑</kbd>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">↓</kbd>
                                <span>to navigate</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
                                <span>to select</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
                                <span>to close</span>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Simple auth hook
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");

            if (token) {
                setIsAuthenticated(true);
                if (storedUsername) {
                    setUsername(storedUsername);
                } else {
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        if (payload.username) {
                            setUsername(payload.username);
                            localStorage.setItem('username', payload.username);
                        }
                    } catch (error) {
                        console.error("Failed to decode token:", error);
                    }
                }
            } else {
                setIsAuthenticated(false);
                setUsername(null);
            }
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername(null);
        navigate(ROUTE_PATHS.PUBLIC.MAINPAGE);
    };

    return { isAuthenticated, username, logout };
};

// Navigation components
const DesktopNavigation = ({
                               items,
                               className = "",
                               showIcons = true,
                               showActiveIndicator = false,
                               currentPath
                           }: {
    items: Array<{ path: string; label: string; icon: any }>;
    className?: string;
    showIcons?: boolean;
    showActiveIndicator?: boolean;
    currentPath: string;
}) => (
    <nav className={cn("hidden lg:flex items-center", className)}>
        {items.map((item) => {
            const Icon = item.icon;
            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        cn(
                            "group relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm hover:bg-muted/50",
                            "min-w-[80px] justify-center",
                            isActive
                                ? "text-primary font-semibold"
                                : "text-foreground/80 hover:text-foreground"
                        )
                    }
                >
                    {showIcons && <Icon size={16} className="shrink-0" />}
                    <span className="whitespace-nowrap">{item.label}</span>
                    {showActiveIndicator && currentPath === item.path && (
                        <motion.span
                            layoutId="desktopActiveIndicator"
                            className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-primary rounded-full -translate-x-1/2"
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
);

const MobileNavigation = ({
                              items,
                              onItemClick,
                              className = "",
                              showIcons = true
                          }: {
    items: Array<{ path: string; label: string; icon: any }>;
    onItemClick: () => void;
    className?: string;
    showIcons?: boolean;
}) => (
    <div className={cn("space-y-1", className)}>
        {items.map((item) => {
            const Icon = item.icon;
            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onItemClick}
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200",
                            isActive
                                ? "text-primary bg-primary/10"
                                : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                        )
                    }
                >
                    {showIcons && <Icon size={18} className="shrink-0" />}
                    <span className="text-sm">{item.label}</span>
                </NavLink>
            );
        })}
    </div>
);

// User dropdown component
const UserDropdown = ({ username, logout }: { username: string; logout: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getUserInitials = () => {
        if (!username) return "U";
        return username.charAt(0).toUpperCase();
    };

    const userMenuItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: ROUTE_PATHS.APP.DASHBOARD },
        { label: "Profile", icon: UserCircle, path: ROUTE_PATHS.APP?.PROFILE || "/profile" },
        { label: "Settings", icon: Settings, path: ROUTE_PATHS.APP?.SETTINGS || "/settings" },
    ];

    if (isMobile) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                </div>
                <span className="text-sm font-medium truncate max-w-[100px]">{username}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="ml-2"
                >
                    <LogOut size={16} />
                </Button>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                </div>
                <span className="text-sm font-medium truncate max-w-[120px]">{username}</span>
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-background dark:bg-background-dark rounded-lg shadow-lg border border-border/50 dark:border-border-dark/50 py-1 z-50"
                    >
                        {userMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}
                        <div className="border-t border-border/30 dark:border-border-dark/30 my-1" />
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors text-red-500"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const { isAuthenticated, username, logout } = useAuth();

    // Handle responsive breakpoints
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width <= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle scroll
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Navigation configurations
    const baseNavigation = [
        { path: ROUTE_PATHS.PUBLIC.MAINPAGE, label: "Home", icon: Home },
        { path: ROUTE_PATHS.PUBLIC?.ABOUT || "/about", label: "About", icon: Info },
        { path: ROUTE_PATHS.PUBLIC?.FEATURES || "/features", label: "Features", icon: Globe },
    ];

    const secondaryNavigation = [
        { path: ROUTE_PATHS.PUBLIC?.BLOG || "/blog", label: "Blog", icon: Newspaper },
        { path: ROUTE_PATHS.PUBLIC?.CONTACT || "/contact", label: "Contact", icon: Contact },
        { path: ROUTE_PATHS.PUBLIC?.PRIVACY || "/privacy", label: "Privacy", icon: HatGlasses },
    ];

    const authNavigation = isAuthenticated
        ? []
        : [
            { path: ROUTE_PATHS.AUTH?.SIGN_IN || "/signin", label: "Sign In", icon: User },
            { path: ROUTE_PATHS.AUTH?.SIGN_UP || "/signup", label: "Sign Up", icon: UserCircle },
        ];

    const allNavigation = [...baseNavigation, ...secondaryNavigation, ...authNavigation];

    // Add keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === '/' && !searchOpen) {
                e.preventDefault();
                setSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchOpen]);

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-40 w-full transition-all duration-300",
                    scrolled
                        ? "bg-background/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border/50 dark:border-border-dark/50 shadow-sm"
                        : "bg-background dark:bg-background-dark border-b border-transparent"
                )}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top bar for announcements/banners */}
                    <div className="hidden md:flex items-center justify-center py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium">
                        🚀 Welcome to Proj-Ariel • Next-gen project management platform
                    </div>

                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo/Brand */}
                        <Link
                            to={ROUTE_PATHS.PUBLIC.MAINPAGE}
                            className="flex items-center gap-2.5 group relative z-10"
                        >
                            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
                                <span className="text-white font-bold text-sm">PA</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 dark:from-foreground-dark dark:to-foreground-dark/80 bg-clip-text text-transparent">
                                    Proj-Ariel
                                </span>
                                <span className="text-[10px] lg:text-xs text-foreground/60 dark:text-foreground-dark/60 -mt-1">
                                    Project Management
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center flex-1 justify-center px-8">
                            <DesktopNavigation
                                items={allNavigation}
                                showActiveIndicator={true}
                                currentPath={location.pathname}
                            />
                        </div>

                        {/* Right side controls */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            {/* Search - Desktop */}
                            {!isMobile && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchOpen(true)}
                                    className="hidden md:flex items-center gap-2 hover:bg-primary/10"
                                >
                                    <Search size={16} />
                                    <span className="hidden lg:inline text-sm">Search</span>
                                    <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-muted rounded ml-2">
                                        <span className="text-[10px]">⌘</span>K
                                    </kbd>
                                </Button>
                            )}

                            {/* Auth buttons or user dropdown */}
                            {isAuthenticated ? (
                                <UserDropdown username={username || ""} logout={logout} />
                            ) : (
                                !isTablet && (
                                    <div className="hidden lg:flex items-center gap-2">
                                        {authNavigation.map((item) => {
                                            const Icon = item.icon;
                                            const isSignUp = item.label === "Sign Up";
                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                                        isSignUp
                                                            ? "bg-primary text-white hover:bg-primary/90"
                                                            : "hover:bg-muted/50"
                                                    )}
                                                >
                                                    {!isSignUp && <Icon size={16} className="inline mr-2" />}
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )
                            )}

                            <ModeToggle />

                            {/* Mobile menu button */}
                            <button
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors relative z-10"
                            >
                                {isOpen ? (
                                    <X size={22} />
                                ) : (
                                    <Menu size={22} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Tablet Navigation (simplified) */}
                    {isTablet && !isMobile && (
                        <div className="hidden md:flex lg:hidden justify-center py-3 border-t border-border/30 dark:border-border-dark/30">
                            <DesktopNavigation
                                items={[...baseNavigation, ...secondaryNavigation.slice(0, 2)]}
                                showIcons={false}
                                currentPath={location.pathname}
                                className="gap-1"
                            />
                        </div>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm z-40 lg:hidden"
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed inset-y-0 right-0 w-full max-w-sm bg-background dark:bg-background-dark border-l border-border/50 dark:border-border-dark/50 shadow-2xl z-50 lg:hidden overflow-y-auto"
                            >
                                <div className="p-6">
                                    {/* Mobile header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                                                <span className="text-white font-bold">PA</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">Proj-Ariel</h3>
                                                {isAuthenticated && username && (
                                                    <p className="text-sm text-foreground/60">Hi, {username}!</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 hover:bg-muted/50 rounded-lg"
                                        >
                                            <X size={22} />
                                        </button>
                                    </div>

                                    {/* Search in mobile menu */}
                                    <div className="mb-6">
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                setSearchOpen(true);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                                        >
                                            <Search className="text-foreground/40" size={18} />
                                            <span className="text-foreground/70">Search...</span>
                                            <kbd className="ml-auto px-2 py-1 text-xs bg-background rounded">/</kbd>
                                        </button>
                                    </div>

                                    {/* Navigation sections */}
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                                Main Menu
                                            </h4>
                                            <MobileNavigation
                                                items={baseNavigation}
                                                onItemClick={() => setIsOpen(false)}
                                            />
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                                Discover
                                            </h4>
                                            <MobileNavigation
                                                items={secondaryNavigation}
                                                onItemClick={() => setIsOpen(false)}
                                            />
                                        </div>

                                        {!isAuthenticated && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                                    Account
                                                </h4>
                                                <MobileNavigation
                                                    items={authNavigation}
                                                    onItemClick={() => setIsOpen(false)}
                                                />
                                            </div>
                                        )}

                                        {isAuthenticated && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                                    Your Account
                                                </h4>
                                                <div className="space-y-1">
                                                    <Link
                                                        to={ROUTE_PATHS.APP.DASHBOARD}
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium hover:bg-muted/50"
                                                    >
                                                        <LayoutDashboard size={18} />
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        to={ROUTE_PATHS.APP?.PROFILE || "/profile"}
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium hover:bg-muted/50"
                                                    >
                                                        <UserCircle size={18} />
                                                        Profile
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setIsOpen(false);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                    >
                                                        <LogOut size={18} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer in mobile menu */}
                                    <div className="mt-12 pt-6 border-t border-border/30">
                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <Link to="/help" className="text-sm text-foreground/60 hover:text-foreground">
                                                <HelpCircle size={16} className="inline mr-1" /> Help
                                            </Link>
                                            <Link to="/terms" className="text-sm text-foreground/60 hover:text-foreground">
                                                Terms
                                            </Link>
                                            <Link to="/cookies" className="text-sm text-foreground/60 hover:text-foreground">
                                                Cookies
                                            </Link>
                                        </div>
                                        <p className="text-xs text-foreground/40 text-center">
                                            © {new Date().getFullYear()} Proj-Ariel. All rights reserved.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>

            {/* Search Overlay Component */}
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Navbar;