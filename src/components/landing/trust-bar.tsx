"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Lock, Globe, Database, FileText } from "lucide-react"

export function TrustBar() {
    const certs = [
        { icon: ShieldCheck, label: "ISO 27001 Certified" },
        { icon: Lock, label: "GDPR Compliant" },
        { icon: Globe, label: "SOC2 Type II" },
        { icon: Database, label: "PCI DSS 4.0" },
        { icon: FileText, label: "NIST Framework" },
    ]

    return (
        <section className="bg-[#0B1C2D] border-y border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40">
                {certs.map((cert) => (
                    <motion.div
                        key={cert.label}
                        whileHover={{ opacity: 1, scale: 1.05 }}
                        className="flex items-center gap-3 grayscale transition-all duration-300 hover:grayscale-0"
                    >
                        <cert.icon className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{cert.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
