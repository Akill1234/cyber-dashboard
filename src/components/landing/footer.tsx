"use client"

import React from "react"
import Link from "next/link"
import { Shield, ChevronRight, Twitter, Linkedin, Github } from "lucide-react"

export function LandingFooter() {
    return (
        <footer className="bg-[#040D16] border-t border-white/5 py-24 px-6 md:px-12 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-32">
                    <div className="lg:col-span-4 flex flex-col gap-10">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <Shield className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                                Cyber Shield
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-sm">
                            Next-generation cybersecurity intelligence for the global banking sector. Built for modular, high-scale financial defense.
                        </p>
                        <div className="flex items-center gap-6">
                            {[Twitter, Linkedin, Github].map((Icon, idx) => (
                                <Link key={idx} href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-primary transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                        <FooterColumn title="Solutions">
                            <Link href="#">Threat Detection</Link>
                            <Link href="#">Risk Analysis</Link>
                            <Link href="#">Compliance Management</Link>
                            <Link href="#">IAM Protocols</Link>
                        </FooterColumn>
                        <FooterColumn title="Company">
                            <Link href="#">About Cyber Shield</Link>
                            <Link href="#">Careers</Link>
                            <Link href="#">Security Team</Link>
                            <Link href="#">Press Release</Link>
                        </FooterColumn>
                        <FooterColumn title="Support">
                            <Link href="#">Documentation</Link>
                            <Link href="#">API Reference</Link>
                            <Link href="#">Incident Reporting</Link>
                            <Link href="/login">Portal Access</Link>
                        </FooterColumn>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/10 opacity-60">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        © 2024 Cyber Shield Security Platform. ISO 27001 Certified.
                    </span>
                    <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                {title}
            </h4>
            <div className="flex flex-col gap-5 text-sm font-medium text-muted-foreground">
                {children}
            </div>
        </div>
    )
}
