// src/App.tsx
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider/theme-provider";
import { ProtectedRoute } from "@/components/ProtectedRoutes";


// Pages
import MainPage from "@/pages/MainPage";
import { SignUp } from "@/pages/SignUp";
import { SignIn } from "@/pages/SignIn";
import { Dashboard } from "@/pages/Dashboard";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ResetPassword } from "@/pages/ResetPassword";
import { NotFound } from "@/pages/NotFound";

import { ROUTE_PATHS } from "@/routes";
import AppLayout from "@/layout/AppLayout.tsx";
import PublicLayout from "@/layout/RootLayout.tsx";
import ContactUs from "@/pages/contact/ContactUs.tsx";


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
