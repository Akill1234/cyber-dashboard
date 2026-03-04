"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-background overflow-hidden relative selection:bg-primary/20">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]" />
            </div>

            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar relative z-10 transition-all duration-500">
                    <motion.div // Wrapped children in motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="max-w-[1600px] mx-auto flex flex-col gap-8 p-4 md:p-8" // Merged classes
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
