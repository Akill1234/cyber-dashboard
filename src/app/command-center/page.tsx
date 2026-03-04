"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Filter,
    Download,
    Activity,
    AlertCircle,
    Zap,
    UserX,
    ShieldCheck,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from "lucide-react"
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    LineChart,
    Line,
    Legend
} from "recharts"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { SOC_STATS, SEVERITY_DATA, LIVE_FEED, TRANSACTION_ANOMALIES, RISK_HEATMAP, HEALTH_PULSE } from "@/data/mock-data"
import { cn } from "@/utils/cn"

export default function SOCCommandCenter() {
    const [stats, setStats] = useState(SOC_STATS)
    const [feed, setFeed] = useState(LIVE_FEED)

    // Simulation of real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => prev.map(stat => ({
                ...stat,
                value: stat.label === "System Health"
                    ? Number((98 + Math.random() * 1.5).toFixed(1))
                    : stat.label === "Compliance Score"
                        ? stat.value
                        : Math.floor(stat.value + (Math.random() > 0.5 ? 1 : -1))
            })))

            // Rotate feed (simulate new arrival)
            setFeed(prev => {
                const newFeed = [...prev]
                const last = newFeed.pop()!
                return [last, ...newFeed]
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <DashboardLayout>
            {/* SOC Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div className="flex flex-col gap-1">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-black tracking-tighter"
                    >
                        SOC Command Center
                    </motion.h1>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Real-time surveillance of financial infrastructure and data assets.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-all">
                        <Filter className="w-3.5 h-3.5" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-all">
                        <Download className="w-3.5 h-3.5" />
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                        <Activity className="w-3.5 h-3.5" />
                        Active Pulse
                    </button>
                </div>
            </div>

            {/* KPI Stats Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
                {stats.map((stat, i) => (
                    <KPICard key={stat.label} stat={stat} index={i} />
                ))}
            </motion.div>

            {/* Main Grid Row 1: Attack Vectors & Severity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AttackVectorMap />
                </div>
                <div className="lg:col-span-1">
                    <IncidentSeverityChart />
                </div>
            </div>

            {/* Main Grid Row 2: Live Feed & Transaction Anomalies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <LiveThreatFeed feed={feed} />
                </div>
                <div className="lg:col-span-1">
                    <TransactionAnomaliesChart />
                </div>
            </div>

            {/* Main Grid Row 3: Heatmap & Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InstitutionalRiskHeatmap />
                <SecurityHealthPulse />
            </div>

            <div className="h-8" />
        </DashboardLayout>
    )
}

// Sub-components

function KPICard({ stat, index }: { stat: any, index: number }) {
    const IconMap: Record<string, any> = {
        AlertCircle, Zap, UserX, Activity, ShieldCheck
    }
    const Icon = IconMap[stat.icon] || Activity

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl border border-border/40 bg-card/30 backdrop-blur-md flex flex-col gap-3 group hover:border-primary/30 transition-all"
        >
            <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-accent/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
                {stat.trend !== 0 && (
                    <div className={cn(
                        "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                        stat.trendUp ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                    )}>
                        {stat.trendUp ? <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" /> : <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />}
                        {stat.trend}%
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <div className="text-2xl font-black tracking-tight mt-1">
                    <AnimatedCounter value={stat.value} />
                    {stat.unit && <span className="text-lg ml-0.5">{stat.unit}</span>}
                </div>
            </div>
        </motion.div>
    )
}

function AttackVectorMap() {
    return (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-lg flex flex-col h-[400px] overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4 z-10">
                <div className="flex flex-col">
                    <h3 className="text-sm font-bold flex items-center gap-2 tracking-tight uppercase">
                        <GlobeIcon className="w-4 h-4 text-primary" />
                        Geographic Attack Vectors
                    </h3>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Real-time origin visualization of inbound threats</p>
                </div>
                <div className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-bold text-primary uppercase animate-pulse">
                    Live Monitoring
                </div>
            </div>

            {/* Placeholder for SVG Map */}
            <div className="flex-1 flex items-center justify-center relative opacity-60">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-center bg-no-repeat invert dark:opacity-20 opacity-5" />

                {/* Animated Hotspots */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-orange-500 rounded-full animate-bounce" />
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
            </div>

            <div className="flex items-center gap-4 mt-4 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Critical DDoS Origin</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Secure Banking Node</span>
                </div>
            </div>
        </div>
    )
}

function IncidentSeverityChart() {
    return (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-lg flex flex-col h-[400px]">
            <div className="flex flex-col mb-8">
                <h3 className="text-sm font-bold tracking-tight uppercase">Incident Severity</h3>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Breakdown by impact level</p>
            </div>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SEVERITY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: "bold" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: 'rgba(11,28,45,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                            {SEVERITY_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

function LiveThreatFeed({ feed }: { feed: any[] }) {
    return (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-lg flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h3 className="text-sm font-bold flex items-center gap-2 tracking-tight uppercase">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        Live Threat Feed
                    </h3>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Continuous stream of detected security events</p>
                </div>
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wide">View All Threats</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border/40 uppercase text-[10px] font-black text-muted-foreground tracking-widest">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Threat Type</th>
                            <th className="px-4 py-3">Target Asset</th>
                            <th className="px-4 py-3">Severity</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-[12px] font-medium">
                        <AnimatePresence mode="popLayout">
                            {feed.map((item, idx) => (
                                <motion.tr
                                    key={`${item.id}-${idx}`}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="border-b border-border/20 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-4 py-4 text-muted-foreground group-hover:text-foreground">{item.id}</td>
                                    <td className="px-4 py-4 font-black">{item.type}</td>
                                    <td className="px-4 py-4 text-muted-foreground">{item.asset}</td>
                                    <td className="px-4 py-4">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter",
                                            item.severity === 'Critical' ? 'bg-red-500/20 text-red-500 ring-1 ring-red-500/30' :
                                                item.severity === 'High' ? 'bg-orange-500/20 text-orange-500 ring-1 ring-orange-500/30' :
                                                    'bg-blue-500/20 text-blue-500 ring-1 ring-blue-500/30'
                                        )}>
                                            {item.severity}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                item.status === 'Blocked' ? 'bg-green-500' : 'bg-primary'
                                            )} />
                                            <span className="text-[11px] group-hover:text-primary transition-colors">{item.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-muted-foreground tabular-nums">{item.time}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TransactionAnomaliesChart() {
    return (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-lg flex flex-col h-[400px]">
            <div className="flex flex-col mb-8">
                <h3 className="text-sm font-bold tracking-tight uppercase">Transaction Anomalies</h3>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Volatility in banking transaction patterns</p>
            </div>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TRANSACTION_ANOMALIES}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(11,28,45,0.9)', border: 'none', borderRadius: '8px' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 'bold', paddingTop: 20 }} />
                        <Line type="monotone" dataKey="normal" name="Normal Traffic" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="anomalous" name="Anomalous Activity" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

function InstitutionalRiskHeatmap() {
    const sectors = ["Retail", "Corporate", "Wealth", "Treasury", "Operations"]
    return (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-lg flex flex-col">
            <div className="flex flex-col mb-6">
                <h3 className="text-sm font-bold tracking-tight uppercase">Institutional Risk Heatmap</h3>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Risk concentration across operational sectors</p>
            </div>

            <div className="grid grid-cols-5 gap-3">
                {sectors.map(s => (
                    <span key={s} className="text-[10px] font-black text-muted-foreground uppercase text-center pb-2 opacity-60 tracking-tighter">
                        {s}
                    </span>
                ))}

                {RISK_HEATMAP.map((row, ridx) => (
                    <React.Fragment key={ridx}>
                        {row.scores.map((score, sidx) => (
                            <motion.div
                                key={`${ridx}-${sidx}`}
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                    "aspect-square rounded flex items-center justify-center text-[11px] font-black transition-all",
                                    score > 80 ? "bg-red-500/80 text-white shadow-lg shadow-red-500/20" :
                                        score > 60 ? "bg-orange-500/60 text-white" :
                                            score > 40 ? "bg-primary/40 text-white" :
                                                "bg-cyan-500/20 text-cyan-400"
                                )}
                            >
                                {score}%
                            </motion.div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/20">
                <span className="text-[9px] font-bold text-muted-foreground uppercase uppercase">Low Risk</span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase uppercase">High Risk</span>
            </div>
        </div>
    )
}

function SecurityHealthPulse() {
    return (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-lg flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h3 className="text-sm font-bold tracking-tight uppercase">Security Health Pulse</h3>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Internal node and service availability</p>
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </div>

            <div className="flex flex-col gap-6">
                {HEALTH_PULSE.map((item, i) => (
                    <div key={item.name} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs font-black tracking-tight">{item.name}</span>
                                <span className={cn(
                                    "text-[9px] font-bold uppercase",
                                    item.status === 'Optimal' ? 'text-green-500' : item.status === 'Degraded' ? 'text-orange-500' : 'text-red-500 animate-pulse'
                                )}>
                                    {item.status}
                                </span>
                            </div>
                            <span className="text-xs font-black italic">{item.load}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-accent/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.load}%` }}
                                className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    item.load > 90 ? 'bg-red-500' : item.load > 60 ? 'bg-orange-500' : 'bg-primary'
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function GlobeIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}
