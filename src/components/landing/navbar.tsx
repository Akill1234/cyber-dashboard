"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Menu, X } from "lucide-react"
import { cn } from "@/utils/cn"

export function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
                isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/20 py-3" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                        Cyber Shield
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: "Solutions", href: "/#features" },
                        { name: "Global Reach", href: "/#risk" },
                        { name: "Security Console", href: "/dashboard" }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 hover:shadow-primary/30 transition-all border border-primary/20"
                    >
                        Access Terminal
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-3 rounded-xl bg-accent/20 text-muted-foreground hover:text-primary transition-all"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-4 right-4 mt-2 bg-card/95 backdrop-blur-2xl rounded-[2rem] border border-border/40 p-10 md:hidden shadow-3xl flex flex-col gap-8 z-50"
                    >
                        <div className="flex flex-col gap-8">
                            {[
                                { name: "Architectures", href: "/#features" },
                                { name: "Institutional Risk", href: "/#risk" },
                                { name: "Mission Control", href: "/dashboard" }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-black uppercase tracking-tighter text-foreground/80 hover:text-primary transition-colors flex items-center justify-between"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                    <Shield className="w-5 h-5 opacity-20" />
                                </Link>
                            ))}
                        </div>
                        <div className="h-[1px] bg-border/20 w-full" />
                        <Link
                            href="/login"
                            className="w-full py-5 rounded-2xl bg-primary text-primary-foreground text-center text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Access Platform
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
