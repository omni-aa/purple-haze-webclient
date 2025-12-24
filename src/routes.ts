export const ROUTE_PATHS = {
    AUTH: {
        SIGN_IN: "/signin",
        SIGN_UP: "/signup",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
    APP: {
        DASHBOARD: "dashboard", // relative path for nested routes
        TEST: "test",
    },
    PUBLIC: {
        MAINPAGE: "/",
    },
} as const;
