"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Filter,
    Download,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Activity,
    ChevronRight,
    ShieldCheck,
    Zap,
    MoreVertical,
    ExternalLink,
    Lock,
    Shield,
    X,
    ClipboardList,
    FileSearch,
    BrainCircuit,
    Globe
} from "lucide-react"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from "recharts"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { VULNERABILITY_MATRIX, RISK_BREAKDOWN, PREDICTIVE_RISK_DATA } from "@/data/mock-data"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/utils/cn"

export default function RiskScoringPage() {
    const [riskScore, setRiskScore] = useState(72)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [activeTimeframe, setActiveTimeframe] = useState("6 Months")
    const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState(false)
    const [selectedRiskFactor, setSelectedRiskFactor] = useState<string | null>(null)
    const [riskFactors, setRiskFactors] = useState([
        { label: "System Integrity", value: 84, trend: "-2.4%", isUp: false, description: "Node stability & latency monitoring" },
        { label: "Exposure Analysis", value: 42, trend: "~12%", isUp: true, description: "Real-time perimeter analysis" },
        { label: "Governance Alignment", value: 91, trend: "+0.5%", isUp: true, description: "Regulatory & internal standards" },
        { label: "Incident MTTR", value: 18, trend: "lower", isUp: true, description: "Average remediation timeframe", unit: "h" }
    ])

    // Simulated Yearly Data Extension
    const YEARLY_DATA = [
        ...PREDICTIVE_RISK_DATA,
        { month: "Jul", institutional: 70, sectorAvg: 52 },
        { month: "Aug", institutional: 68, sectorAvg: 55 },
        { month: "Sep", institutional: 75, sectorAvg: 58 },
        { month: "Oct", institutional: 82, sectorAvg: 60 },
        { month: "Nov", institutional: 78, sectorAvg: 62 },
        { month: "Dec", institutional: 85, sectorAvg: 65 },
    ]

    const chartData = activeTimeframe === "6 Months" ? PREDICTIVE_RISK_DATA : YEARLY_DATA

    // Real-time fluctuation: Subtly change risk score every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRiskScore(prev => {
                const change = Math.random() > 0.5 ? 1 : -1
                return Math.max(60, Math.min(85, prev + change))
            })
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [sensitivity, setSensitivity] = useState(75)

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setRiskScore(Math.floor(65 + Math.random() * 15))
            setRiskFactors(prev => prev.map(f => ({
                ...f,
                value: f.unit === "h" ? Math.max(10, f.value + (Math.random() > 0.5 ? 2 : -2)) : Math.min(100, Math.max(10, f.value + (Math.random() > 0.5 ? 5 : -5)))
            })))
            setIsRefreshing(false)
        }, 2000)
    }

    const handleExport = () => {
        const data = {
            timestamp: new Date().toISOString(),
            riskScore,
            factors: riskFactors,
            intelligence: RISK_BREAKDOWN
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `cyber-shield-risk-report-${new Date().toISOString().split('T')[0]}.json`
        a.click()
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                            <div className="p-2 rounded-2xl bg-primary/10 border border-primary/20">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            Risk Scoring & Analysis
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">Real-time quantification of Institutional security posture and predictive vulnerability modeling.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl border border-border/40 bg-card/40 hover:bg-accent hover-glow transition-all duration-300"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl border border-border/40 bg-card/40 hover:bg-accent hover-glow transition-all duration-300"
                        >
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>
                        <button
                            onClick={handleRefresh}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-primary text-white shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-[1.05]",
                                isRefreshing && "opacity-70 cursor-not-allowed scale-[0.98]"
                            )}
                        >
                            <RotateCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                            Run Assessment
                        </button>
                    </div>
                </div>

                {/* Top Grid: Circular Score & Factors */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-3xl p-10 flex flex-col items-center justify-center relative overflow-hidden group/gauge shadow-2xl">
                        <div className="absolute top-8 left-8 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Live Threat Index</span>
                        </div>

                        <div className="relative w-72 h-72 flex items-center justify-center translate-y-4">
                            <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                                <circle
                                    className="text-accent/10"
                                    strokeWidth="16"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="115"
                                    cx="144"
                                    cy="144"
                                />
                                <motion.circle
                                    className="text-primary"
                                    strokeWidth="16"
                                    strokeDasharray={2 * Math.PI * 115}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 115 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 115 * (1 - riskScore / 100) }}
                                    transition={{ duration: 2, ease: "circOut" }}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="115"
                                    cx="144"
                                    cy="144"
                                    style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))' }}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <div className="text-7xl font-black tabular-nums tracking-tighter flex items-baseline">
                                    <AnimatedCounter value={riskScore} />
                                    <span className="text-xl ml-1 opacity-40">%</span>
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] translate-y-[-4px] opacity-60">Aggregated Risk</span>
                            </div>
                        </div>

                        {/* Status Label */}
                        <div className="mt-12 px-6 py-2 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Posture: Elevated</span>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {riskFactors.map((factor, idx) => (
                            <div key={idx} onClick={() => setSelectedRiskFactor(factor.label)} className="cursor-pointer">
                                <RiskFactorCard
                                    {...factor}
                                />
                            </div>
                        ))}

                        {/* Alert Ledger Summary */}
                        <div className="col-span-1 md:col-span-2 p-5 rounded-3xl bg-red-500/5 border border-red-500/20 flex items-center justify-between glass-card hover-glow">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-red-500/10">
                                    <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-red-500 uppercase tracking-widest">Action Required</span>
                                    <span className="text-[11px] font-bold text-muted-foreground opacity-80">3 Critical Vulnerabilities detected in Node-Cluster-09</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsIntelligenceModalOpen(true)}
                                className="px-5 py-2 rounded-xl bg-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 shadow-lg shadow-red-500/10"
                            >
                                View Intelligence
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trend Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-2xl p-8 flex flex-col gap-8 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-black tracking-tight uppercase">Risk Trajectory</h3>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">Comparative intelligence: Institutional vs Global Sector Avg</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTimeframe("6 Months")}
                                    className={cn(
                                        "px-4 py-1.5 text-[9px] font-black rounded-lg uppercase tracking-widest transition-all",
                                        activeTimeframe === "6 Months" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5"
                                    )}
                                >
                                    6 Months
                                </button>
                                <button
                                    onClick={() => setActiveTimeframe("Yearly")}
                                    className={cn(
                                        "px-4 py-1.5 text-[9px] font-black rounded-lg uppercase tracking-widest transition-all",
                                        activeTimeframe === "Yearly" ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5"
                                    )}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>

                        <div className="h-[350px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="month"
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
                                        contentStyle={{
                                            backgroundColor: 'rgba(11,28,45,0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '20px',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="institutional"
                                        name="Our Risk"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#riskGradient)"
                                        animationDuration={2000}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sectorAvg"
                                        name="Global Avg"
                                        stroke="#ffffff20"
                                        strokeWidth={2}
                                        strokeDasharray="8 8"
                                        fill="transparent"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="rounded-[2.5rem] border border-border/40 bg-card/10 backdrop-blur-3xl p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden group">
                            <h3 className="text-sm font-black flex items-center gap-3 tracking-widest uppercase mb-2">
                                <Zap className="w-5 h-5 text-primary animate-pulse" />
                                Threat Foresight
                            </h3>

                            <div className="flex flex-col gap-5 relative z-10">
                                {RISK_BREAKDOWN.slice(0, 3).map((item, idx) => (
                                    <div key={idx} className="flex flex-col gap-4 p-5 rounded-3xl bg-accent/5 border border-border/40 card-lift hover-glow group/item transition-all duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                                <span className="text-[11px] font-black uppercase tracking-wider group-hover/item:text-primary transition-colors">{item.name}</span>
                                            </div>
                                            <div className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-muted-foreground tabular-nums">
                                                {item.probability}% PROB
                                            </div>
                                        </div>
                                        <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
                                            <span className="text-[9px] font-black uppercase text-primary tracking-widest opacity-60">Strategy:</span>
                                            <p className="text-[10px] leading-relaxed text-muted-foreground font-bold italic">
                                                {item.recommendedAction}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsIntelligenceModalOpen(true)}
                                className="w-full py-4 rounded-2xl border border-border/40 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-500 group/btn relative overflow-hidden"
                            >
                                <span className="relative z-10">Expand Intelligence Feed</span>
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </button>

                            <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
                        </div>

                        <div className="flex-1 rounded-[2.5rem] border border-border/40 bg-gradient-to-br from-primary/10 to-transparent p-8 flex flex-col justify-center gap-4 shadow-xl">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                            <h4 className="text-xl font-black tracking-tighter uppercase leading-none">Security Posture<br />Verified</h4>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed opacity-60">All node endpoints are currently synchronized and under active monitoring.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Intelligence & Alert Modal */}
            <AnimatePresence>
                {isIntelligenceModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsIntelligenceModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-4xl rounded-[40px] border border-border/40 p-12 relative overflow-hidden flex flex-col gap-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                                        <BrainCircuit className="w-8 h-8 text-primary" />
                                        Threat Intelligence ledger
                                    </h2>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-black opacity-60">Full Forensic Analysis & Mitigation Strategies</p>
                                </div>
                                <button onClick={() => setIsIntelligenceModalOpen(false)} className="p-3 rounded-2xl bg-accent/10 hover:bg-accent transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <div className="p-6 rounded-3xl bg-accent/5 border border-border/40">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Current Critical Alerts</h4>
                                        <div className="space-y-4">
                                            {[
                                                { id: "VUL-982", title: "Endpoint Buffer Overflow", risk: "Critical", system: "Node-09" },
                                                { id: "VUL-985", title: "Stale SSL Certificate", risk: "High", system: "Global Gateway" },
                                                { id: "VUL-990", title: "Unauthorized Port Binding", risk: "Critical", system: "DB-Cluster-01" }
                                            ].map((alert, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-primary/40 transition-all group cursor-pointer">
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn("w-1 h-8 rounded-full", alert.risk === "Critical" ? "bg-red-500" : "bg-orange-500")} />
                                                        <div className="flex flex-col">
                                                            <span className="text-[11px] font-black uppercase">{alert.title}</span>
                                                            <span className="text-[9px] text-muted-foreground font-bold">{alert.system} • {alert.id}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10">
                                            <Globe className="w-5 h-5 text-primary mb-3" />
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block mb-1">Global Threat Rank</span>
                                            <span className="text-2xl font-black">Top 12%</span>
                                        </div>
                                        <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10">
                                            <FileSearch className="w-5 h-5 text-primary mb-3" />
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block mb-1">Audit Findings</span>
                                            <span className="text-2xl font-black">1.4K Resolved</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="p-6 rounded-3xl bg-card border border-border/40 flex-1 shadow-inner relative overflow-hidden">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Mitigation Strategy</h4>
                                        <div className="space-y-6">
                                            {RISK_BREAKDOWN.map((item, idx) => (
                                                <div key={idx} className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-black uppercase">{item.name}</span>
                                                        <span className="text-[9px] font-bold text-primary">{item.probability}%</span>
                                                    </div>
                                                    <div className="w-full h-1 bg-accent/20 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${item.probability}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                                    </div>
                                    <button className="h-20 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                        Generate Full PDF Dossier
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Risk Factor Detail Modal */}
            <AnimatePresence>
                {selectedRiskFactor && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedRiskFactor(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-xl rounded-[40px] border border-border/40 p-10 relative overflow-hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Factor Detail Analysis</span>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{selectedRiskFactor}</h3>
                                </div>
                                <button onClick={() => setSelectedRiskFactor(null)} className="p-2 rounded-xl bg-accent/10 hover:bg-accent transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-accent/5 border border-border/40">
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                                        Detailed telemetry indicates that <span className="text-foreground font-black">{selectedRiskFactor}</span> is currently operating within the expected institutional parameters, but shows a {riskFactors.find(f => f.label === selectedRiskFactor)?.trend} trend over the last monitoring cycle.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl border border-border/40">
                                        <span className="text-[10px] font-black uppercase text-muted-foreground block mb-2">Current Value</span>
                                        <span className="text-3xl font-black tabular-nums">{riskFactors.find(f => f.label === selectedRiskFactor)?.value}{riskFactors.find(f => f.label === selectedRiskFactor)?.unit || "%"}</span>
                                    </div>
                                    <div className="p-4 rounded-2xl border border-border/40">
                                        <span className="text-[10px] font-black uppercase text-muted-foreground block mb-2">Confidence Level</span>
                                        <span className="text-3xl font-black tabular-nums">99.8%</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedRiskFactor(null)}
                                    className="w-full py-5 bg-accent/10 hover:bg-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all"
                                >
                                    Dismiss Analysis
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Filter Modal */}
            <AnimatePresence>
                {isFilterModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsFilterModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-md rounded-[40px] border border-border/40 p-10 relative overflow-hidden shadow-2xl flex flex-col gap-8"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black uppercase tracking-tight">Analysis Scope</h3>
                                <button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-xl bg-accent/10 hover:bg-accent transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Target Logic</label>
                                    <select className="bg-accent/10 border border-border/40 rounded-2xl p-4 outline-none focus:border-primary/40 transition-all font-bold text-sm">
                                        <option>Full Institutional Stack</option>
                                        <option>Node Cluster Analysis</option>
                                        <option>Gateway Perimeter Only</option>
                                        <option>Legacy Core Systems</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Detection Sensitivity</label>
                                        <span className="text-xs font-black text-primary">{sensitivity}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={sensitivity}
                                        onChange={(e) => setSensitivity(parseInt(e.target.value))}
                                        className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <p className="text-[9px] text-muted-foreground font-medium italic">Higher sensitivity increases predictive anomaly flagging.</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                Apply Parameters
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    )
}

function RiskFactorCard({ label, value, unit = "%", trend, isUp, description }: { label: string, value: number, unit?: string, trend: string, isUp: boolean, description: string }) {
    return (
        <div className="p-6 rounded-[2rem] border border-border/40 bg-card/10 hover:bg-card/20 glass-card card-lift hover-glow transition-all duration-500 group relative overflow-hidden h-full flex flex-col justify-between">
            <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-black text-muted-foreground tracking-[0.2em] uppercase opacity-60">{label}</span>
                <div className={cn(
                    "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                    isUp ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" : "text-red-500 bg-red-500/10 border-red-500/20"
                )}>
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-6 mb-4 relative z-10">
                <div className="text-4xl font-black tabular-nums tracking-tighter flex items-baseline">
                    <AnimatedCounter value={value} />
                    <span className="text-xl ml-1 opacity-20">{unit}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-bold tracking-tight opacity-100 mt-1 max-w-[80%] leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden shadow-inner relative z-10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary relative shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                />
            </div>

            {/* Decorator */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2 -translate-y-1/2" />
        </div>
    )
}
