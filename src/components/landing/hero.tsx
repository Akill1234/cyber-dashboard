"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, ChevronRight, PlayCircle, Lock, Gauge } from "lucide-react"

export function LandingHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#0B1C2D]">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full scale-150 opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full scale-110 opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">v4.2.0 AI-Powered Predictive Defense Live</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-white">
                            Intelligent <br />
                            <span className="text-primary italic">Cybersecurity</span> <br />
                            for Modern Banking
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mt-4 font-medium">
                            Cyber Shield provides enterprise-grade threat detection, risk analysis, and regulatory compliance. Secure your institution's sensitive financial data with real-time SOC monitoring.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 mt-4">
                        <Link
                            href="/login"
                            className="bg-primary text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-[1.05] active:scale-95 transition-all text-center"
                        >
                            Request Demo
                        </Link>
                        <Link
                            href="#features"
                            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors group px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/40 text-center"
                        >
                            Explore Platform
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-6 mt-8">
                        <div className="flex items-center gap-[-10px]">
                            {[1, 2, 3, 4].map(idx => (
                                <div
                                    key={idx}
                                    className="w-12 h-12 rounded-full border-4 border-[#0B1C2D] bg-gradient-to-tr from-accent to-accent/40 shadow-xl overflow-hidden -ml-3 first:ml-0 flex items-center justify-center text-xs font-black text-white"
                                >
                                    {String.fromCharCode(64 + idx)}
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-[#0B1C2D] bg-primary flex items-center justify-center text-[10px] font-black text-white shadow-xl -ml-3">
                                500+
                            </div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
                            Trusted by 500+ global financial institutions
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="relative flex items-center justify-center"
                >
                    <div className="relative w-full aspect-square max-w-lg">
                        {/* Central Shield Graphic */}
                        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-primary/30 to-cyan-500/10 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-center shadow-primary/20">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Shield className="w-32 h-32 text-primary drop-shadow-[0_0_40px_rgba(6,182,212,0.8)]" />
                            </motion.div>
                        </div>

                        {/* Floating elements to mock landing page graphics */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 p-6 rounded-3xl bg-card border border-border/40 shadow-2xl flex flex-col gap-2 z-20 w-48"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-primary">Active Protection</span>
                                <Lock className="w-3 h-3 text-primary" />
                            </div>
                            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["10%", "95%", "10%"] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 p-6 rounded-3xl bg-card border border-border/40 shadow-2xl flex flex-col gap-2 z-20 w-48"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-secondary">Threat Mitigation</span>
                                <Gauge className="w-3 h-3 text-secondary" />
                            </div>
                            <div className="text-xl font-black text-white">99.98%</div>
                        </motion.div>

                        <div className="absolute -inset-10 border-2 border-dashed border-white/5 rounded-[4rem] animate-[spin_60s_linear_infinite] opacity-40" />
                        <div className="absolute -inset-20 border border-white/5 rounded-[5rem] animate-[spin_90s_linear_infinite_reverse] opacity-20" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
