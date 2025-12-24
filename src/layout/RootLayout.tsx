// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";


export default function PublicLayout() {
    return (
        <div>
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-16">
                    <Outlet />
                </main>
            </div>
            <Footer/>
        </div>

    );
}
