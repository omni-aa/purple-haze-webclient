// src/App.tsx
import { BrowserRouter, Routes, Route,  } from "react-router-dom";


// Pages

import { NotFound } from "@/pages/NotFound";

import { ROUTE_PATHS } from "@/routes";
import AppLayout from "@/layout/AppLayout.tsx";
import PublicLayout from "@/layout/RootLayout.tsx";
import ContactUs from "@/pages/contact/ContactUs.tsx";
import MainPage from "@/pages/main-page/MainPage.tsx";
import {SignIn} from "@/pages/sign-in/SignIn.tsx";
import {SignUp} from "@/pages/sign-up/SignUp.tsx";
import {ForgotPassword} from "@/pages/forgot-password/ForgotPassword.tsx";
import {ResetPassword} from "@/pages/reset-password/ResetPassword.tsx";
import {Dashboard} from "@/pages/dashboard/Dashboard.tsx";
import {ProtectedRoute} from "@/lib/ProtectedRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider/theme-provider";


function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
            <BrowserRouter>
                <Routes>

                    {/* 🌐 PUBLIC WEBSITE (Navbar) */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path={ROUTE_PATHS.AUTH.SIGN_IN} element={<SignIn />} />
                        <Route path={ROUTE_PATHS.AUTH.SIGN_UP} element={<SignUp />} />
                        <Route path={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
                        <Route path={ROUTE_PATHS.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
                        <Route path={"/contact-us"} element={<ContactUs/>}/>
                    </Route>

                    {/* 🔐 PROTECTED APP (Sidebar + Header) */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    {/* ❌ 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
