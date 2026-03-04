"use client"

import React from "react"
import { motion } from "framer-motion"
import { Activity, ShieldAlert, Monitor, FileText, ChevronRight } from "lucide-react"

export function FeatureGrid() {
    const features = [
        {
            icon: ShieldAlert,
            title: "Real-Time Threat Detection",
            description: "Proprietary AI models scan for anomalous transaction patterns and lateral movements in milliseconds.",
        },
        {
            icon: Monitor,
            title: "Advanced Authentication",
            description: "Zero-trust architecture ensuring multi-factor biometric and cryptographic access control across all nodes.",
        },
        {
            icon: Activity,
            title: "SOC Dashboard",
            description: "A high-density command center providing bird's-eye visibility into your entire security perimeter.",
        },
        {
            icon: FileText,
            title: "Secure Logging & Audits",
            description: "Immutable, tamper-proof audit trails compliant with global banking regulations and governance standards.",
        },
    ]

    return (
        <section id="features" className="bg-[#0B1C2D] py-40 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-20">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-white">
                        Enterprise Defense <br />
                        <span className="text-primary italic">Infrastructure</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                        Cyber Shield is engineered for the specific rigorous demands of global finance. Our modular platform scales with your institution's risk profile.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[2.5rem] bg-indigo-950/20 border border-white/5 backdrop-blur-3xl hover:border-primary/40 transition-all flex flex-col gap-8 group"
                        >
                            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 w-fit text-primary group-hover:scale-110 transition-transform">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-black tracking-tight uppercase text-white leading-none">{feature.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed font-bold opacity-60 uppercase tracking-wide">
                                    {feature.description}
                                </p>
                            </div>
                            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all mt-auto group/btn relative overflow-hidden px-6 py-3 rounded-xl border border-primary/20 hover:bg-primary/10">
                                <span className="relative z-10 flex items-center gap-3">
                                    Technical Specs
                                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
