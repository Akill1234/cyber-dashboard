"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, ShieldX, ShieldCheck, Activity, ChevronRight, Share2 } from "lucide-react"
import { cn } from "@/utils/cn"
import { RECENT_LOGS } from "@/data/mock-data"
import Link from "next/link"

interface LogItem {
    id: string
    timestamp: string
    event: string
    source: string
    status: string
    severity: "Critical" | "High" | "Medium" | "Low"
}

interface RecentLogsProps {
    logs?: LogItem[]
}

const severityColors: any = {
    Critical: "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
    High: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Low: "bg-primary/10 text-primary border-primary/20",
}

export function RecentLogs({ logs = RECENT_LOGS as any }: RecentLogsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-8 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-3xl flex flex-col gap-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] h-full relative overflow-hidden group/logs"
        >
            <div className="flex flex-col gap-1 relative z-10">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black tracking-tight uppercase group-hover/logs:text-primary transition-colors">Recent Intelligence</h3>
                    <div className="p-2 rounded-xl bg-accent/10 hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
                        <Activity className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] opacity-60">Real-time monitoring across global nodes</p>
            </div>

            <div className="flex flex-col gap-3 relative z-10 overflow-y-auto custom-scrollbar pr-2 max-h-[600px]">
                <AnimatePresence initial={false}>
                    {logs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center gap-5 p-5 rounded-3xl hover:bg-white/5 transition-all duration-300 group/log border border-transparent hover:border-border/40 relative overflow-hidden"
                        >
                            <div className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 shadow-lg transition-transform duration-500 group-hover/log:scale-110",
                                log.severity === 'Critical' ? 'bg-red-500/15 border border-red-500/20' : 'bg-primary/10 border border-primary/20'
                            )}>
                                {log.severity === "Critical" ? (
                                    <ShieldX className="w-6 h-6 text-red-500" />
                                ) : log.severity === "High" ? (
                                    <ShieldAlert className="w-6 h-6 text-orange-500" />
                                ) : (
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                )}
                            </div>

                            <div className="flex-1 flex flex-col min-w-0">
                                <span className="text-[14px] font-black tracking-tighter truncate group-hover/log:text-primary transition-colors">{log.event}</span>
                                <div className="flex items-center gap-2 mt-1 opacity-60">
                                    <span className="text-[10px] font-bold uppercase tracking-widest truncate">{log.source}</span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span className="text-[10px] tabular-nums font-bold uppercase tracking-widest">{log.timestamp}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                    severityColors[log.severity]
                                )}>
                                    {log.severity}
                                </span>
                                <div className="flex items-center gap-1 opacity-40 group-hover/log:opacity-100 transition-opacity">
                                    <span className="text-[9px] font-black uppercase tracking-widest">{log.status}</span>
                                    <ChevronRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <Link href="/compliance" className="w-full">
                <button className="w-full py-5 text-[10px] font-black text-muted-foreground hover:text-white uppercase tracking-[0.3em] bg-accent/5 rounded-[1.5rem] transition-all duration-500 mt-4 border border-border/40 relative group/btn overflow-hidden">
                    <span className="relative z-10 transition-transform group-hover/btn:translate-x-1 inline-flex items-center gap-2">
                        Expand Global Ledger
                        <ChevronRight className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
            </Link>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover/logs:bg-primary/10 transition-colors" />
        </motion.div>
    )
}
