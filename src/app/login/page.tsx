"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Shield,
    Lock,
    AtSign,
    ArrowRight,
    Eye,
    EyeOff,
    Fingerprint,
    Key,
    CheckCircle2,
    Loader2
} from "lucide-react"
import { cn } from "@/utils/cn"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Validate Institutional Credentials
        setTimeout(() => {
            if (email === "user@gmail.com" && password === "user@1234") {
                setIsLoading(false)
                setIsSuccess(true)
                setTimeout(() => {
                    router.push("/dashboard")
                }, 800)
            } else {
                setIsLoading(false)
                setError("ACCESS DENIED: INVALID NODE IDENTITY OR KEY")
            }
        }, 2200)
    }

    return (
        <main className="min-h-screen bg-[#0B1C2D] flex items-center justify-center p-6 relative overflow-hidden">
            {/* God-Tier Background: Tech Grid & Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <TechGrid />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] animate-pulse opacity-40 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] animate-pulse opacity-40 -translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Logo Link */}
            <Link href="/" className="absolute top-12 left-12 flex items-center gap-3 group z-50">
                <div className="p-3 rounded-2xl bg-primary shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-all duration-500">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                        Cyber Shield
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-60">Banking Security</span>
                </div>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[520px] z-10"
            >
                <div className="rounded-[3.5rem] bg-indigo-950/20 backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative">
                    {/* Scanning Line Overlay during Loading */}
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ top: "-100%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-20 opacity-40"
                            />
                        )}
                    </AnimatePresence>

                    <div className="p-16 flex flex-col gap-12">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-5xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                                Identity <br />
                                <span className="text-primary italic">Gateway</span>
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-80">Terminal Encryption: Active</p>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-8">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Node Entity ID</label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                    <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                                    <input
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Institutional Username (e.g. Akil)"
                                        className="w-full h-20 pl-16 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/20 focus:border-primary/50 focus:bg-white/[0.08] outline-none transition-all font-black text-sm z-10 relative"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between ml-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Encryption Key</label>
                                    <button type="button" className="text-[9px] font-black uppercase text-primary/60 hover:text-primary transition-colors">Reset Protocol</button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••••••"
                                        className="w-full h-20 pl-16 pr-16 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground/20 focus:border-primary/50 focus:bg-white/[0.08] outline-none transition-all font-black text-sm tracking-[0.4em] z-10 relative"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors z-20"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || isSuccess}
                                className={cn(
                                    "w-full h-20 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn",
                                    isSuccess ? "bg-green-500 text-white" : "bg-primary text-white shadow-[0_20px_40px_-10px_rgba(6,182,212,0.4)] hover:scale-[1.03] active:scale-95"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex items-center gap-3"
                                        >
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Encrypting & Syncing...
                                        </motion.div>
                                    ) : isSuccess ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle2 className="w-6 h-6" />
                                            Identity Confirmed
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center gap-3"
                                        >
                                            Authorize Access
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
                            </button>
                        </form>

                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-6">
                                <div className="h-[1px] bg-white/5 flex-1" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">Biometric Sync</span>
                                <div className="h-[1px] bg-white/5 flex-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <button className="h-20 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/40 transition-all flex items-center justify-center gap-4 group/bio">
                                    <Fingerprint className="w-6 h-6 text-muted-foreground group-hover/bio:text-primary transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/bio:text-white">Biometric</span>
                                </button>
                                <button className="h-20 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/40 transition-all flex items-center justify-center gap-4 group/bio">
                                    <Key className="w-6 h-6 text-muted-foreground group-hover/bio:text-primary transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/bio:text-white">Security Key</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-4 opacity-30 text-white">
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase">Protocol 4.2.0-secure</span>
                    <div className="w-1 h-1 rounded-full bg-white" />
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase">Hardware Verified</span>
                </div>
            </motion.div>
        </main>
    )
}

function TechGrid() {
    return (
        <div className="absolute inset-0 z-0">
            <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-transparent to-[#0B1C2D]" />
        </div>
    )
}
