"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap, CheckCircle2, ChevronRight, BarChart3, Lock, Shield } from "lucide-react"

export function RiskSection() {
    return (
        <section id="risk" className="bg-[#0B1C2D] py-40 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-10 flex-1"
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">New Feature</span>
                        </div>
                        <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                            Predictive Risk <br />
                            <span className="text-secondary italic">Scoring</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-lg mt-4">
                            Leverage machine learning to identify vulnerabilities before they are exploited. Our predictive models analyze historical breaches across the banking sector to strengthen your perimeter.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-5 group">
                            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform">
                                <Zap className="w-5 h-5 fill-current" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-black uppercase tracking-widest text-white">Sentiment Analysis</h4>
                                <p className="text-xs text-muted-foreground font-bold opacity-60 uppercase tracking-wide leading-relaxed">Monitoring dark-web chatter for institutional mentions.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5 group">
                            <div className="p-3 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-black uppercase tracking-widest text-white">Automated Patching</h4>
                                <p className="text-xs text-muted-foreground font-bold opacity-60 uppercase tracking-wide leading-relaxed">Prioritize vulnerability remediation across decentralized systems.</p>
                            </div>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/40 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-primary transition-all w-fit relative overflow-hidden group/riskbtn">
                        <span className="relative z-10 flex items-center gap-3">
                            Access Risk Intelligence
                            <ChevronRight className="w-4 h-4 group-hover/riskbtn:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-primary/5 -translate-y-full group-hover/riskbtn:translate-y-0 transition-all duration-500" />
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 relative w-full aspect-square max-w-2xl p-6"
                >
                    <div className="w-full h-full rounded-[3rem] bg-indigo-950/20 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden p-8 flex flex-col gap-8">
                        <div className="flex items-center justify-between z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Institutional Pulse</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-red-500">Alert Mode Active</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 z-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3">
                                    <BarChart3 className="w-5 h-5 text-primary opacity-40" />
                                    <div className="h-1.5 w-12 bg-primary/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${i * 30}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 rounded-[2rem] bg-black/40 border border-white/5 p-8 flex flex-col items-center justify-center relative z-10">
                            {/* Abstract Chart Graphic */}
                            <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                <path
                                    d="M 0 100 Q 50 20 100 100 T 200 100 T 300 100 T 400 100 L 400 200 L 0 200 Z"
                                    fill="url(#chart-grad)"
                                    opacity="0.8"
                                />
                                <path
                                    d="M 0 100 Q 50 20 100 100 T 200 100 T 300 100 T 400 100"
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="4"
                                />
                                <defs>
                                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                    </div>

                    {/* Floating icons around graphic */}
                    <div className="absolute top-1/4 -right-10 p-5 rounded-3xl bg-card border border-border flex items-center justify-center shadow-2xl z-20">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute bottom-1/4 -left-10 p-5 rounded-3xl bg-card border border-border flex items-center justify-center shadow-2xl z-20">
                        <Shield className="w-6 h-6 text-secondary" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
