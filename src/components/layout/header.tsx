"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, User, Moon, Sun, HelpCircle, LogOut, Settings, ChevronDown, X, Terminal, ShieldAlert, Activity } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/utils/cn"

export function Header() {
    const { theme, setTheme } = useTheme()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [showProfileMenu, setShowProfileMenu] = React.useState(false)
    const [showNotifications, setShowNotifications] = React.useState(false)
    const [showSupportModal, setShowSupportModal] = React.useState(false)
    const [isShieldActive, setIsShieldActive] = React.useState(true)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isSearching, setIsSearching] = React.useState(false)
    const [searchResults, setSearchResults] = React.useState<any[]>([])

    const intelligenceNodes = [
        { id: "node-101", name: "US-EAST-PRIMARY", type: "Core Node", status: "Optimal", meta: "Security Level 5" },
        { id: "node-204", name: "EU-WEST-SECONDARY", type: "Relay Node", status: "Optimal", meta: "Encrypted-Tunnel" },
        { id: "node-408", name: "ASIA-SEA-EDGE", type: "Edge Node", status: "Optimal", meta: "Latency 12ms" },
        { id: "inc-992", name: "Unauthorized Ping", type: "Incident", status: "Critical", meta: "Trace: Active" },
        { id: "pol-442", name: "GDPR Drift", type: "Compliance", status: "Warning", meta: "Policy Node" },
        { id: "usr-001", name: "Alex Rivera", type: "Security Ops", status: "Active", meta: "Lead Admin" },
        { id: "usr-002", name: "Sarah Chen", type: "Data Privacy", status: "Active", meta: "Legal Node" }
    ]

    const handleCatchResult = (node: any) => {
        const catchAlert = {
            id: Date.now(),
            title: "Analysis Captured",
            msg: `Node ${node.id} (${node.name}) has been indexed and analyzed.`,
            time: "Just now",
            type: "success",
            read: false
        }
        setNotifications(prev => [catchAlert, ...prev].slice(0, 10))
        setActiveToast(catchAlert)
        setSearchQuery("")
        setSearchResults([])

        setTimeout(() => setActiveToast(null), 5000)
    }

    React.useEffect(() => {
        if (searchQuery.length > 0) {
            setIsSearching(true)
            const timeout = setTimeout(() => {
                const filtered = intelligenceNodes.filter(node =>
                    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    node.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    node.meta.toLowerCase().includes(searchQuery.toLowerCase())
                )
                setSearchResults(filtered)
                setIsSearching(false)
            }, 800)
            return () => clearTimeout(timeout)
        } else {
            setSearchResults([])
            setIsSearching(false)
        }
    }, [searchQuery])
    const [activeToast, setActiveToast] = React.useState<any>(null)

    const [notifications, setNotifications] = React.useState([
        { id: 1, title: "Critical Alert", msg: "Unauthorized access attempt at Node-7", time: "2m ago", type: "error", read: false },
        { id: 2, title: "System Update", msg: "Kernel patch 4.2.1 deployed successfully", time: "15m ago", type: "success", read: false },
        { id: 3, title: "New Report", msg: "Weekly compliance audit ready for review", time: "1h ago", type: "info", read: false }
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    // Simulate incoming intelligence alerts
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newAlert = {
                    id: Date.now(),
                    title: Math.random() > 0.5 ? "Node Intrusion" : "Protocol Breach",
                    msg: `Suspicious activity detected at Node-${Math.floor(Math.random() * 100)}`,
                    time: "Just now",
                    type: Math.random() > 0.5 ? "error" : "info",
                    read: false
                }
                setNotifications(prev => [newAlert, ...prev].slice(0, 10))
                setActiveToast(newAlert)

                // Auto-dim toast after 5 seconds
                setTimeout(() => setActiveToast(null), 5000)
            }
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    const clearNotifications = () => {
        setNotifications([])
    }

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={cn(
            "sticky top-0 z-40 flex items-center justify-between w-full h-20 px-8 transition-all duration-500 border-b border-border/40",
            isScrolled ? "bg-background/40 backdrop-blur-2xl py-2 shadow-2xl" : "bg-transparent py-4"
        )}>
            {/* Left Search */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative group max-w-md w-full">
                    <Search className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300",
                        isSearching ? "text-primary animate-pulse" : "text-muted-foreground/60 group-focus-within:text-primary"
                    )} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH INTELLIGENCE NODES..."
                        className="w-full h-11 pl-11 pr-12 text-[10px] font-black bg-accent/5 hover:bg-accent/10 focus:bg-accent/20 transition-all rounded-2xl border border-white/5 focus:border-primary/40 outline-none placeholder:text-muted-foreground/20 placeholder:tracking-[0.2em] focus:ring-4 focus:ring-primary/5"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/20 rounded-lg transition-colors group/clr"
                        >
                            <X className="w-3 h-3 text-muted-foreground/40 group-hover/clr:text-primary transition-colors" />
                        </button>
                    )}
                    {searchQuery && (
                        <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-card/60 backdrop-blur-3xl rounded-[2.5rem] border border-border/40 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-4">
                            <div className="px-6 py-4 border-b border-border/10 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] opacity-40">Intelligence Registry</span>
                                {isSearching && <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
                            </div>
                            <div className="p-1 flex flex-col gap-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {searchResults.length > 0 ? (
                                    searchResults.map((node) => (
                                        <div
                                            key={node.id}
                                            onClick={() => handleCatchResult(node)}
                                            className="p-4 rounded-[1.5rem] hover:bg-accent/40 transition-all group cursor-pointer border border-transparent hover:border-border/20 flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                                                    node.status === 'Critical' ? "bg-red-500/20 text-red-500" :
                                                        node.status === 'Warning' ? "bg-amber-500/20 text-amber-500" :
                                                            "bg-primary/20 text-primary"
                                                )}>
                                                    {node.id.split('-')[0].toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black uppercase tracking-tight">{node.name}</span>
                                                    <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{node.type}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                                    node.status === 'Critical' ? "bg-red-500 text-white" :
                                                        node.status === 'Warning' ? "bg-amber-500 text-black" :
                                                            "bg-primary/20 text-primary border border-primary/20"
                                                )}>
                                                    {node.status}
                                                </div>
                                                <ChevronDown className="w-4 h-4 -rotate-90 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    ))
                                ) : !isSearching ? (
                                    <div className="p-10 text-center opacity-40 flex flex-col items-center gap-3">
                                        <Search className="w-8 h-8 opacity-20" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">No intelligence matches found</span>
                                    </div>
                                ) : (
                                    <div className="p-10 text-center opacity-40 flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Indexing Nodes...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
                {/* Status Badge */}
                <button
                    onClick={() => setIsShieldActive(!isShieldActive)}
                    className={cn(
                        "hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all duration-500 mr-4 shadow-xl active:scale-95",
                        isShieldActive
                            ? "border-primary/40 bg-primary/5 text-primary shadow-primary/10"
                            : "border-red-500/40 bg-red-500/5 text-red-500 shadow-red-500/10"
                    )}
                >
                    <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        isShieldActive ? "bg-primary animate-ping" : "bg-red-500"
                    )} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {isShieldActive ? "Shield Active" : "Shield Offline"}
                    </span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 rounded-xl hover:bg-accent/40 text-muted-foreground hover:text-primary transition-all duration-300 relative group border border-transparent hover:border-border/40"
                    title="Toggle theme"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute left-2.5 top-2.5 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>

                {/* Support */}
                <button
                    onClick={() => setShowSupportModal(true)}
                    className="hidden sm:flex p-2.5 rounded-xl hover:bg-accent/40 text-muted-foreground hover:text-primary transition-all duration-300 border border-transparent hover:border-border/40 active:scale-90"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications)
                            setShowProfileMenu(false)
                        }}
                        className={cn(
                            "p-2.5 rounded-xl transition-all duration-300 border border-transparent hover:border-border/40",
                            showNotifications ? "bg-primary text-white" : "hover:bg-accent/40 text-muted-foreground hover:text-primary"
                        )}
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    {!showNotifications && unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-4 ring-background animate-pulse" />}

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-80 p-2 rounded-[2.5rem] border border-border/40 bg-card/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-1 backdrop-blur-3xl"
                            >
                                <div className="px-6 py-5 mb-1 border-b border-border/20 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] opacity-40">Intelligence Alerts</span>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllRead}
                                            className="px-2 py-0.5 rounded-full bg-primary/10 text-[9px] font-black text-primary uppercase hover:bg-primary hover:text-white transition-all"
                                        >
                                            {unreadCount} New
                                        </button>
                                    )}
                                </div>
                                <div className="p-1 flex flex-col gap-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {notifications.length > 0 ? (
                                        notifications.map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => {
                                                    setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))
                                                }}
                                                className={cn(
                                                    "p-4 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-border/20",
                                                    n.read ? "opacity-40 grayscale-[0.5]" : "bg-accent/40"
                                                )}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest",
                                                        n.type === 'error' ? 'text-red-500' : n.type === 'success' ? 'text-green-500' : 'text-primary'
                                                    )}>{n.title}</span>
                                                    <span className="text-[9px] font-bold text-muted-foreground opacity-40">{n.time}</span>
                                                </div>
                                                <p className="text-[11px] font-bold text-foreground/80 leading-relaxed">{n.msg}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center opacity-40">
                                            <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">All nodes silent</span>
                                        </div>
                                    )}
                                </div>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={clearNotifications}
                                        className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-t border-border/10 mt-2"
                                    >
                                        Archive All Intel
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-[1px] h-8 bg-border/40 mx-3" />

                {/* Profile Avatar */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowProfileMenu(!showProfileMenu)
                            setShowNotifications(false)
                        }}
                        className={cn(
                            "flex items-center gap-2 p-1 pl-4 rounded-2xl transition-all group border border-transparent",
                            showProfileMenu ? "bg-accent/40 border-border/40" : "hover:bg-accent/40 hover:border-border/40"
                        )}
                    >
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-xs font-black tracking-tight leading-none group-hover:text-primary transition-colors">J. Doe</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Super Admin</span>
                                <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-300", showProfileMenu ? "rotate-180" : "rotate-0")} />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-primary/20 transform active:scale-95 transition-all overflow-hidden font-black text-xs ring-2 ring-transparent group-hover:ring-primary/40 group-hover:scale-105">
                                JD
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-4 border-background group-hover:scale-110 transition-transform" />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                                className="absolute right-0 mt-3 w-64 p-2 rounded-[2.5rem] border border-border/40 bg-card/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-1 backdrop-blur-3xl"
                            >
                                <div className="px-6 py-5 mb-1 border-b border-border/20">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] opacity-40">Identity Node</span>
                                    <div className="text-xs font-black mt-1">jd-console-admin-482</div>
                                </div>
                                <div className="p-1 flex flex-col gap-1">
                                    <button className="flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all duration-300">
                                        <User className="w-4 h-4" />
                                        Your Identity
                                    </button>
                                    <button className="flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-accent transition-all duration-300">
                                        <Settings className="w-4 h-4" />
                                        Core Settings
                                    </button>
                                    <div className="h-[1px] bg-border/10 my-1 mx-4" />
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl text-red-500 hover:bg-red-500/10 transition-all duration-300"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Terminate Session
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Support Modal */}
            <AnimatePresence>
                {/* Float Toast Alert */}
                {activeToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="fixed top-24 right-8 z-[100] w-96 p-6 rounded-[2rem] border border-border/40 bg-card/80 backdrop-blur-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex items-center gap-5 group/toast"
                    >
                        <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shrink-0 group-hover/toast:scale-110 transition-transform duration-500",
                            activeToast.type === 'error' ? "bg-red-500/20 text-red-500 shadow-red-500/20" : "bg-primary/20 text-primary shadow-primary/20"
                        )}>
                            {activeToast.type === 'error' ? <ShieldAlert className="w-7 h-7" /> : <Activity className="w-7 h-7" />}
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em]",
                                    activeToast.type === 'error' ? "text-red-500" : "text-primary"
                                )}>{activeToast.title}</span>
                                <button onClick={() => setActiveToast(null)} className="opacity-0 group-hover/toast:opacity-40 hover:opacity-100 transition-opacity">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                            <p className="text-xs font-bold text-foreground/90 leading-snug truncate">{activeToast.msg}</p>
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Tactical Alert • Real-time</span>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full overflow-hidden rounded-full">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className={cn(
                                    "h-full",
                                    activeToast.type === 'error' ? "bg-red-500" : "bg-primary"
                                )}
                            />
                        </div>
                    </motion.div>
                )}

                {showSupportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card w-full max-w-lg rounded-[40px] border border-border/40 p-10 flex flex-col gap-8 shadow-3xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">Institutional Support</h3>
                                    <p className="text-[10px] font-black text-primary tracking-widest uppercase">Direct Intelligence Channel</p>
                                </div>
                                <button onClick={() => setShowSupportModal(false)} className="p-3 rounded-2xl bg-accent/20 hover:bg-accent transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <SupportAction icon={<Terminal className="w-5 h-5" />} title="API Documentation" desc="Technical node specifications" />
                                <SupportAction icon={<HelpCircle className="w-5 h-5" />} title="Help Center" desc="Operational guides & FAQ" />
                                <button className="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                    Connect to Lead Architect
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    )
}

function SupportAction({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-3xl bg-accent/5 border border-border/20 hover:border-primary/40 transition-all group cursor-pointer flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-accent/10 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
                {icon}
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-black uppercase tracking-tight">{title}</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-60">{desc}</span>
            </div>
        </div>
    )
}
