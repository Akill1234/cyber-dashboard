"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Lock, Globe } from "lucide-react"

export function LandingCTA() {
    return (
        <section className="bg-[#0B1C2D] py-40 px-6 relative overflow-hidden">
            {/* Background elements to match the reference look */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full opacity-10" />

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12 relative z-10">
                <div className="flex flex-col gap-6">
                    <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                        Ready to Secure <br />
                        <span className="text-primary italic">Your Institution?</span>
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
                        Join the world's most security conscious banks. Transition from passive monitoring to active, predictive defense today.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8">
                    <Link
                        href="/login"
                        className="bg-primary text-white px-12 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 hover:scale-[1.05] active:scale-95 transition-all w-full md:w-fit"
                    >
                        Request a Personal Demo
                    </Link>
                    <Link
                        href="/login"
                        className="px-12 py-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/40 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all w-full md:w-fit"
                    >
                        View Live Dashboard
                    </Link>
                </div>

                <div className="flex items-center gap-12 mt-4 flex-wrap justify-center opacity-40">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">ISO 27001 Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">GPDR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Global Support</span>
                    </div>
                </div>
            </div>

            {/* Glowing orbs for CTA section */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-t-full blur-[120px] pointer-events-none" />
        </section>
    )
}
