import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import OfflineIndicator from "@/components/ui/OfflineIndicator";

export const metadata: Metadata = {
    title: "Financial App - Transaction Management",
    description: "A modern financial transaction management application with PWA support",
    manifest: "/manifest.json",
    themeColor: "#1890ff",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Financial App"
    },
    formatDetection: {
        telephone: false
    },
    icons: {
        icon: [
            { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
        ],
        apple: [
            { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" }
        ]
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <meta name="application-name" content="Financial App" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Financial App" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-TileColor" content="#1890ff" />
            <meta name="msapplication-tap-highlight" content="no" />
        </head>
        <body>
        <Providers>
            <OfflineIndicator />
            {children}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <PWAInstallPrompt />
        </Providers>
        </body>
        </html>
    );
}
