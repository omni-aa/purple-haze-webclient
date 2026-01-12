// In your routes.ts file, make sure you have:
export const ROUTE_PATHS = {
    PUBLIC: {
        MAINPAGE: "/",
        ABOUT: "/about-us",
        CONTACT: "/contact-us",
        PRIVACY: "/privacy-policy",
        BLOG: "/blog",
        FEATURES: "/features",
    },
    APP: {
        DASHBOARD: "/dashboard",
        PROFILE: "/profile",
        TEST: "/test",
    },
    AUTH: {
        SIGN_IN: "/signin",
        SIGN_UP: "/signup",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
} as const;