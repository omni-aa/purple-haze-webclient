// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar.tsx";
import Footer from "@/components/footer/Footer.tsx";


export default function PublicLayout() {
    return (
        <div>
            <div className="min-h-screen bg-background pt-20">
                <Navbar />
                <main className="pt-16">
                    <Outlet />
                </main>
            </div>
            <Footer/>
        </div>

    );
}
