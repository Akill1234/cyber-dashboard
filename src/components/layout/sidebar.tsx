"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Shield,
    ShieldAlert,
    LayoutDashboard,
    Activity,
    Lock,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bell,
    Search,
    Globe,
    Database,
    Terminal,
    FileText
} from "lucide-react"
import { cn } from "@/utils/cn"

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ShieldAlert, label: "Incidents", href: "/incidents" },
    { icon: Activity, label: "Risk Analysis", href: "/risk-analysis" },
    { icon: Users, label: "Access Control", href: "/access-control" },
    { icon: FileText, label: "Compliance", href: "/compliance" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const pathname = usePathname()

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
                "relative flex flex-col h-screen border-r border-border/40 bg-background/40 backdrop-blur-2xl z-50",
                "dark:bg-[#0B1C2D]/50"
            )}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 p-6 mb-8 hover:scale-[1.02] transition-transform group">
                <motion.div
                    layout
                    className="flex items-center justify-center w-10 h-10 rounded-2xl bg-primary shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform"
                >
                    <Shield className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
                        >
                            Cyber Shield
                        </motion.span>
                    )}
                </AnimatePresence>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-primary/15 text-primary shadow-lg shadow-primary/5"
                                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-all duration-300",
                                isActive ? "text-primary scale-110" : "group-hover:text-primary group-hover:scale-110"
                            )} />

                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="whitespace-nowrap font-bold text-sm tracking-tight"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {isActive && (
                                <motion.div
                                    layoutId="active-nav-indicator"
                                    className="absolute left-[-16px] w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / Toggle */}
            <div className="p-4 border-t border-border/40 bg-accent/5">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-300 group"
                >
                    <motion.div
                        animate={{ rotate: isCollapsed ? 180 : 0 }}
                        className="mx-auto"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.div>
                    {!isCollapsed && <span className="font-bold text-xs uppercase tracking-widest text-[10px]">Close Console</span>}
                </button>

                <Link
                    href="/login"
                    className="flex items-center gap-3 w-full px-3 py-3 mt-2 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 font-bold text-xs uppercase tracking-widest text-[10px]"
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span>Deauthenticate</span>}
                </Link>
            </div>

            {/* Bottom Profile Mini (if expanded) */}
            {!isCollapsed && (
                <div className="px-6 py-6 flex items-center gap-4 bg-accent/5 border-t border-border/20">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 shadow-xl shadow-primary/20 flex items-center justify-center text-xs font-black text-white">JD</div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-4 border-background" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black truncate leading-none mb-1">Jane Doe</span>
                        <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase opacity-40">System Architect</span>
                    </div>
                </div>
            )}
        </motion.aside>
    )
}
