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
import {Profile} from "@/pages/profile/Profile.tsx";
import {ProtectedRoute} from "@/lib/ProtectedRoutes.tsx";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import {Dashboard} from "@/pages/dashboard/Dashboard.tsx";
import {Features} from "@/pages/features/page.tsx";
import {TournamentNews} from "@/pages/tournament-news/page.tsx";
import {About} from "@/pages/about/page.tsx";
import {NewsUpdates} from "@/pages/news-updates/page.tsx";
import PrivacyPolicyPage from "@/pages/privacy-page/Privacy-Page.tsx";


function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
            <BrowserRouter>
                <Routes>

                    {/* 🌐 PUBLIC WEBSITE (navbar) */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path={ROUTE_PATHS.AUTH.SIGN_IN} element={<SignIn />} />
                        <Route path={ROUTE_PATHS.AUTH.SIGN_UP} element={<SignUp />} />
                        <Route path={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
                        <Route path={ROUTE_PATHS.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
                        <Route path={ROUTE_PATHS.PUBLIC.CONTACT} element={<ContactUs/>}/>
                        <Route path={ROUTE_PATHS.PUBLIC.FEATURES} element={<Features/>}/>`
                        <Route path={ROUTE_PATHS.PUBLIC.TOURNAMENTNEWS} element={<TournamentNews/>}/>
                        <Route path={ROUTE_PATHS.PUBLIC.ABOUT} element={<About/>}/>
                        <Route path={ROUTE_PATHS.PUBLIC.NEWSUPDATES} element={<NewsUpdates/>}/>
                        <Route path={ROUTE_PATHS.PUBLIC.PRIVACY} element={<PrivacyPolicyPage/>}/>
                    </Route>

                    {/* 🔐 PROTECTED APPDashboard (Sidebar + Header) */}
                    <Route element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>}>

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile/>} />
                    </Route>
                    {/* ❌ 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
