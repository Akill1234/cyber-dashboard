"use client"

import React from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/utils/cn"
import { AnimatedCounter } from "../ui/animated-counter"

interface StatCardProps {
    title: string
    value: number | string
    unit?: string
    trend?: string
    status?: "up" | "down" | "stable"
    icon?: React.ReactNode
    color?: string
    description?: string
    index?: number
}

export function StatCard({
    title,
    value,
    unit = "",
    trend,
    status = "stable",
    icon,
    color = "text-foreground",
    description,
    index = 0
}: StatCardProps) {
    const isNumber = typeof value === "number"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-8 rounded-[2rem] border border-border/40 bg-card/20 backdrop-blur-3xl hover:bg-card/40 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] group relative overflow-hidden h-full flex flex-col justify-between"
        >
            <div className="flex flex-col gap-1.5 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-primary transition-colors">{title}</span>
                    <div className={cn(
                        "p-2.5 rounded-xl bg-accent/10 border border-border/40 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300",
                        color.replace("text-", "text-") // Keep original color for icon if needed
                    )}>
                        {icon || <div className="w-5 h-5" />}
                    </div>
                </div>

                <div className="flex items-baseline gap-1 mt-1">
                    <div className={cn("text-4xl font-black tracking-tighter tabular-nums", color)}>
                        {isNumber ? <AnimatedCounter value={Number(value)} /> : value}
                        {unit && <span className="text-xl ml-1 opacity-20">{unit}</span>}
                    </div>
                </div>

                {trend && (
                    <div className="flex items-center gap-2 mt-4">
                        <div className={cn(
                            "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            status === "up" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                status === "down" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                    "bg-accent/20 text-muted-foreground border-border/40"
                        )}>
                            {status === "up" && <TrendingUp className="w-2.5 h-2.5" />}
                            {status === "down" && <TrendingDown className="w-2.5 h-2.5" />}
                            {status === "stable" && <Minus className="w-2.5 h-2.5" />}
                            {trend}
                        </div>
                        {description && <span className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase tracking-tighter">{description}</span>}
                    </div>
                )}
            </div>

            {/* Progress line decor */}
            {isNumber && (
                <div className="w-full h-1.5 bg-accent/20 rounded-full mt-8 overflow-hidden relative z-10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={cn("h-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]", color.includes("primary") ? "bg-primary" : "bg-primary")}
                    />
                </div>
            )}

            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-[-40px] left-[-40px] w-24 h-24 bg-primary/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    )
}
