"use client"

import React from "react"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts"
import { motion } from "framer-motion"
import { CHART_DATA } from "@/data/mock-data"

interface ChartCardProps {
    data?: any[]
    title?: string
    subtitle?: string
}

export function ChartCard({
    data = CHART_DATA,
    title = "Intelligence Flux",
    subtitle = "Real-time institutional threat telemetry and detection surface analysis."
}: ChartCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-8 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-3xl flex flex-col gap-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group/chart"
        >
            <div className="flex flex-col gap-1 relative z-10">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black tracking-tight uppercase group-hover/chart:text-primary transition-colors">{title}</h3>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">Live Feed</div>
                        <div className="px-3 py-1 rounded-full bg-accent/20 border border-border/40 text-[9px] font-black text-muted-foreground uppercase tracking-widest">Institutional</div>
                    </div>
                </div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] opacity-60">{subtitle}</p>
            </div>

            <div className="h-[350px] w-full mt-2 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: "bold" }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: "bold" }}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(11, 28, 45, 0.95)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "20px",
                                boxSizing: "border-box",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                            }}
                            labelStyle={{ color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="threats"
                            stroke="hsl(var(--primary))"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#chartGradient)"
                            animationDuration={2500}
                        />
                        <Area
                            type="monotone"
                            dataKey="blocked"
                            stroke="#F43F5E"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fillOpacity={0}
                            animationDuration={3500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none group-hover/chart:bg-primary/10 transition-colors" />
        </motion.div>
    )
}
