// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import {SiteHeader} from "@/components/site-header/site-header.tsx";
import {AppSidebar} from "@/components/app-side-bar/app-sidebar.tsx";

export default function AppLayout() {
    return (
        <SidebarProvider defaultOpen>
            <div className="flex min-h-screen bg-background">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <SiteHeader />
                    <main className="flex-1 p-4 md:p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
