"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FileText,
    ShieldCheck,
    RotateCcw,
    Download,
    Filter,
    Search,
    AlertTriangle,
    Activity,
    ChevronRight,
    MoreVertical,
    CheckCircle2,
    Lock,
    Globe,
    Database,
    Terminal,
    Grid,
    ArrowRight
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AUDIT_LOGS, COMPLIANCE_SCORES } from "@/data/mock-data"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/utils/cn"

interface ComplianceFramework {
    name: string;
    score: number;
    trend: string;
    status: string;
}

interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    event: string;
    severity: string;
    domain: string;
    integrity: string;
}

export default function CompliancePage() {
    const [logs, setLogs] = useState<AuditLog[]>(AUDIT_LOGS)
    const [searchQuery, setSearchQuery] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework | null>(null)
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
    const [activeFilters, setActiveFilters] = useState({
        time: ["Last 7 days"],
        severity: ["Compliance Alert"],
        domain: ["GDPR (Privacy)"]
    })
    const [currentPage, setCurrentPage] = useState(1)
    const logsPerPage = 5

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            // Shuffle logs for simulation
            setLogs([...AUDIT_LOGS].sort(() => Math.random() - 0.5))
            setIsRefreshing(false)
        }, 1200)
    }

    const toggleFilter = (section: keyof typeof activeFilters, value: string) => {
        setActiveFilters(prev => {
            const current = prev[section]
            if (current.includes(value)) {
                return { ...prev, [section]: current.filter(v => v !== value) }
            }
            return { ...prev, [section]: [...current, value] }
        })
        setCurrentPage(1)
    }

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.id.toLowerCase().includes(searchQuery.toLowerCase())

        // Severity mapping for filter
        const severityFilterMap: Record<string, string> = {
            "Compliance Alert": "High",
            "Critical": "Critical",
            "Information": "Info",
            "High Warning": "High"
        }

        const selectedSeverities = activeFilters.severity.map(s => severityFilterMap[s])
        const matchesSeverity = activeFilters.severity.length === 0 || selectedSeverities.includes(log.severity)

        const domainFilterMap: Record<string, string> = {
            "GDPR (Privacy)": "GDPR",
            "PCI-DSS (Payments)": "PCI-DSS",
            "SOX (Financial)": "SOX",
            "ISO 27001": "ISO 27001"
        }
        const selectedDomains = activeFilters.domain.map(d => domainFilterMap[d])
        const matchesDomain = activeFilters.domain.length === 0 || selectedDomains.includes(log.domain) || (log.domain === "Global" && activeFilters.domain.length === 0)

        return matchesSearch && matchesSeverity && matchesDomain
    })

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage)
    const currentLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)

    const handleExport = (type: 'PDF' | 'CSV') => {
        const btn = document.activeElement as HTMLButtonElement
        if (btn) btn.innerText = "Processing..."
        setTimeout(() => {
            alert(`${type} export initialized. Check your encrypted downloads folder.`)
            if (btn) btn.innerText = type === 'PDF' ? "Export PDF" : "CSV Data"
        }, 1500)
    }

    const lockIP = (ip: string) => {
        alert(`PROTOCOL LOCKDOWN: IP ${ip} has been blacklisted across all nodes.`)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                            <FileText className="w-8 h-8 text-primary" />
                            Compliance & Governance
                        </h1>
                        <p className="text-muted-foreground text-sm">Real-time regulatory tracking and cryptographic audit ledger verified via distributed ledger protocol.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleExport('PDF')}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-all"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Export PDF
                        </button>
                        <button
                            onClick={() => handleExport('CSV')}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-all"
                        >
                            <Grid className="w-3.5 h-3.5" />
                            CSV Data
                        </button>
                        <button
                            onClick={handleRefresh}
                            className={cn(
                                "p-2 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20",
                                isRefreshing && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            <RotateCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                        </button>
                    </div>
                </div>

                {/* Compliance Framework Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {COMPLIANCE_SCORES.map((framework, idx) => (
                        <motion.div
                            key={framework.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedFramework(framework)}
                            className="p-6 rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md flex flex-col gap-4 group relative overflow-hidden cursor-pointer hover:border-primary/40 transition-all"
                        >
                            <div className="flex items-center justify-between z-10">
                                <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">{framework.name}</span>
                                <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex flex-col gap-1 z-10">
                                <div className="text-4xl font-black tabular-nums tracking-tighter">
                                    <AnimatedCounter value={framework.score} />
                                    <span className="text-xl ml-0.5">%</span>
                                </div>
                                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest mt-1 opacity-60">
                                    <span className={cn(
                                        framework.trend.startsWith('+') ? "text-green-500" : framework.trend === 'Stable' ? "text-blue-500" : "text-red-500"
                                    )}>{framework.trend} from last audit</span>
                                    <span className="px-1.5 py-0.5 rounded border border-border/40 text-[7px]">Certified</span>
                                </div>
                                <div className="w-full h-1 bg-accent/20 rounded-full mt-3 overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${framework.score}%` }}
                                        className={cn(
                                            "h-full rounded-full transition-all duration-1000",
                                            framework.score > 90 ? 'bg-primary' : framework.score > 60 ? 'bg-orange-500' : 'bg-red-500'
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Background Decorator */}
                            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-primary/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                        </motion.div>
                    ))}
                </div>

                {/* Audit Activity Ledger Section */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Left Sidebar: Filters */}
                    <div className="xl:col-span-3 flex flex-col gap-6">
                        <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" />
                                    Log Filters
                                </h3>
                                <button className="text-[10px] font-black text-muted-foreground uppercase hover:text-foreground">Clear All</button>
                            </div>

                            <FilterSection title="Time Period">
                                <div className="flex flex-col gap-2">
                                    <CheckboxLabel label="Last 1 hour" checked={activeFilters.time.includes("Last 1 hour")} onChange={() => toggleFilter('time', "Last 1 hour")} />
                                    <CheckboxLabel label="Last 24 hours" checked={activeFilters.time.includes("Last 24 hours")} onChange={() => toggleFilter('time', "Last 24 hours")} />
                                    <CheckboxLabel label="Last 7 days" checked={activeFilters.time.includes("Last 7 days")} onChange={() => toggleFilter('time', "Last 7 days")} />
                                    <CheckboxLabel label="Custom Range" checked={activeFilters.time.includes("Custom Range")} onChange={() => toggleFilter('time', "Custom Range")} />
                                </div>
                            </FilterSection>

                            <FilterSection title="Event Severity">
                                <div className="flex flex-col gap-2">
                                    <CheckboxLabel label="Critical" checked={activeFilters.severity.includes("Critical")} onChange={() => toggleFilter('severity', "Critical")} />
                                    <CheckboxLabel label="High Warning" checked={activeFilters.severity.includes("High Warning")} onChange={() => toggleFilter('severity', "High Warning")} />
                                    <CheckboxLabel label="Compliance Alert" checked={activeFilters.severity.includes("Compliance Alert")} onChange={() => toggleFilter('severity', "Compliance Alert")} />
                                    <CheckboxLabel label="Information" checked={activeFilters.severity.includes("Information")} onChange={() => toggleFilter('severity', "Information")} />
                                </div>
                            </FilterSection>

                            <FilterSection title="Regulatory Domain">
                                <div className="flex flex-col gap-2">
                                    <CheckboxLabel label="GDPR (Privacy)" checked={activeFilters.domain.includes("GDPR (Privacy)")} onChange={() => toggleFilter('domain', "GDPR (Privacy)")} />
                                    <CheckboxLabel label="PCI-DSS (Payments)" checked={activeFilters.domain.includes("PCI-DSS (Payments)")} onChange={() => toggleFilter('domain', "PCI-DSS (Payments)")} />
                                    <CheckboxLabel label="SOX (Financial)" checked={activeFilters.domain.includes("SOX (Financial)")} onChange={() => toggleFilter('domain', "SOX (Financial)")} />
                                    <CheckboxLabel label="ISO 27001" checked={activeFilters.domain.includes("ISO 27001")} onChange={() => toggleFilter('domain', "ISO 27001")} />
                                </div>
                            </FilterSection>
                        </div>

                        {/* Security Policy Info */}
                        <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-[11px] font-black uppercase text-primary tracking-widest">Tamper Detection Active</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                                Cryptographic signatures are being validated in real-time. Any mismatch will trigger a critical alert and system lockdown.
                            </p>
                        </div>
                    </div>

                    {/* Right Section: Logs Table */}
                    <div className="xl:col-span-9 rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl p-6 flex flex-col gap-6 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-black tracking-tighter flex items-center gap-3">
                                    Audit Activity Ledger
                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black uppercase text-blue-500">Live Sync Active</span>
                                </h2>
                            </div>
                            <div className="relative group flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search log contents, hashes, or users..."
                                    className="w-full h-10 pl-10 pr-4 bg-accent/20 border border-border/40 rounded-xl text-xs outline-none focus:border-primary/40 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto z-10">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border/20 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] bg-accent/5">
                                        <th className="px-4 py-4">Log ID</th>
                                        <th className="px-4 py-4">Timestamp</th>
                                        <th className="px-4 py-4">User/Entity</th>
                                        <th className="px-4 py-4">Event Description</th>
                                        <th className="px-4 py-4">Domain</th>
                                        <th className="px-4 py-4">Integrity</th>
                                        <th className="px-4 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-semibold">
                                    {currentLogs.map((log, idx) => (
                                        <tr key={idx} className="border-b border-border/10 hover:bg-white/5 transition-all group">
                                            <td className="px-4 py-6 font-black text-primary/80 group-hover:text-primary transition-colors">{log.id}</td>
                                            <td className="px-4 py-6">
                                                <div className="flex items-center gap-2 text-muted-foreground tabular-nums opacity-60">
                                                    <Activity className="w-3 h-3" />
                                                    {log.timestamp}
                                                </div>
                                            </td>
                                            <td className="px-4 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center text-[9px] font-black text-primary">
                                                        {log.user.split('_')[0][0]}
                                                    </div>
                                                    <span className="text-xs font-black opacity-80">{log.user}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6 flex flex-col gap-1">
                                                <span className="font-black text-foreground/80">{log.event}</span>
                                                {log.severity === 'High' && <span className="text-[8px] font-black uppercase text-orange-500 opacity-80">High Alert</span>}
                                                {log.severity === 'Critical' && <span className="text-[8px] font-black uppercase text-red-500 opacity-80 animate-pulse">Critical Severity</span>}
                                                {log.severity === 'Info' && <span className="text-[8px] font-black uppercase text-blue-500 opacity-80">System Info</span>}
                                            </td>
                                            <td className="px-4 py-6">
                                                <span className="px-2 py-0.5 rounded-full bg-accent/30 text-[9px] font-black uppercase opacity-60">
                                                    {log.domain}
                                                </span>
                                            </td>
                                            <td className="px-4 py-6">
                                                <div className="flex items-center gap-2">
                                                    {log.integrity === 'Verified' ? (
                                                        <>
                                                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                                                            <span className="text-[10px] uppercase font-black text-blue-500/80">Verified</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                                            <span className="text-[10px] uppercase font-black text-red-500/80 underline decoration-red-500/30">Tampered</span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-6 text-center">
                                                <button onClick={() => setSelectedLog(log)}>
                                                    <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-all mx-auto" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between z-10 mt-4 pt-4 border-t border-border/20">
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Showing {(currentPage - 1) * logsPerPage + 1} to {Math.min(currentPage * logsPerPage, filteredLogs.length)} of {filteredLogs.length} entries</span>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={cn("hover:text-primary transition-colors", currentPage === 1 && "opacity-30 cursor-not-allowed")}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className={cn("text-primary border border-primary/40 px-3 py-1 rounded-lg hover:bg-primary/10 transition-all", (currentPage === totalPages || totalPages === 0) && "opacity-30 cursor-not-allowed")}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Alert Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-3xl border border-red-500/30 bg-red-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
                >
                    <div className="flex items-center gap-6 z-10">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-red-500 animate-[bounce_1s_infinite]" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-black tracking-tighter text-red-500 uppercase">Critical Tamper Alert Detected</h2>
                            <p className="text-[12px] text-foreground font-medium flex items-center gap-2">
                                Log entry <span className="font-black underline font-mono">LOG-99206</span> failed cryptographic verification. Source: 185.122.44.11
                                <span className="text-red-500 font-black cursor-pointer hover:underline uppercase text-[10px] flex items-center gap-1">Investigate Source <ArrowRight className="w-3 h-3" /></span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 z-10">
                        <button
                            onClick={() => lockIP('185.122.44.11')}
                            className="px-8 py-3 rounded-xl bg-red-500 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/30 hover:scale-[1.05] transition-all"
                        >
                            Lock Origin IP
                        </button>
                    </div>

                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-red-500/5 backdrop-blur-[2px]" />
                </motion.div>

                {/* Bottom Verification Status */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-accent/5 overflow-hidden relative">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Blockchain Immutable Logs Verified</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
                        <span>System Operational</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span>Version 4.2.0-stable</span>
                    </div>
                </div>
            </div>
            {/* Framework Detail Modal */}
            <AnimatePresence>
                {selectedFramework && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card w-full max-w-lg rounded-[40px] border border-border/40 p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">{selectedFramework.name} Analysis</h3>
                                    <p className="text-[10px] font-black text-primary tracking-widest uppercase">Compliance Deep-Scan</p>
                                </div>
                                <button onClick={() => setSelectedFramework(null)} className="p-2 rounded-xl bg-accent/20 hover:bg-accent transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ScoreCard label="Control Groups" value="142 Verified" />
                                <ScoreCard label="Last Audit" value="2h 12m ago" />
                                <ScoreCard label="Policy Drift" value="-0.04%" color="text-green-500" />
                                <ScoreCard label="Certification" value="Active till 2025" />
                            </div>

                            <div className="flex flex-col gap-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Framework Health Score</h4>
                                <div className="w-full h-4 bg-accent/20 rounded-full overflow-hidden border border-border/20">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${selectedFramework.score}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedFramework(null)}
                                className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                Close Audit View
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Audit Log Detail Modal */}
            <AnimatePresence>
                {selectedLog && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-card w-full max-w-xl rounded-[40px] border border-border/40 p-10 flex flex-col gap-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between border-b border-border/20 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Database className="w-7 h-7 text-primary" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="text-xl font-black uppercase tracking-tighter">Log Entry: {selectedLog.id}</h3>
                                        <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Cryptographic Audit Trail</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedLog(null)} className="p-2 rounded-xl bg-accent/20 hover:bg-accent transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                <LogDetail label="Origin Entity" value={selectedLog.user} />
                                <LogDetail label="Timestamp (UTC)" value={selectedLog.timestamp} />
                                <LogDetail label="Regulatory Domain" value={selectedLog.domain} />
                                <LogDetail label="Event Type" value={selectedLog.event} />
                            </div>

                            <div className="p-6 rounded-2xl bg-black/40 border border-border/40 font-mono text-[10px] flex flex-col gap-2 overflow-hidden">
                                <span className="text-primary font-bold uppercase tracking-widest text-[8px]">Electronic Signature (SHA-256)</span>
                                <p className="text-muted-foreground break-all leading-relaxed uppercase">
                                    {selectedLog.integrity === 'Verified'
                                        ? "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                                        : "ALARM: SIGNATURE MISMATCH DETECTED - 0xINVALIDHASH"}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="flex-1 h-14 bg-accent/20 text-foreground border border-border/40 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-accent transition-all">Download Audit Bundle</button>
                                <button
                                    onClick={() => setSelectedLog(null)}
                                    className="flex-1 h-14 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                                >
                                    Dismiss Record
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    )
}

function FilterSection({ title, children }: any) {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="flex flex-col gap-3 border-b border-border/20 pb-4 last:border-0 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between group"
            >
                <span className="text-[11px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all">{title}</span>
                <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", isOpen && "rotate-90")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function CheckboxLabel({ label, checked = false, onChange }: any) {
    return (
        <label className="flex items-center gap-3 group cursor-pointer" onClick={onChange}>
            <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                checked ? "bg-primary border-primary shadow-lg shadow-primary/20" : "border-border/40 bg-accent/20 group-hover:border-border/60"
            )}>
                {checked && <div className="w-1.5 h-1.5 bg-background rounded-full" />}
            </div>
            <span className={cn("text-xs transition-colors", checked ? "font-bold text-foreground" : "text-muted-foreground group-hover:text-foreground")}>{label}</span>
        </label>
    )
}

function ScoreCard({ label, value, color = "text-foreground" }: any) {
    return (
        <div className="flex flex-col gap-0.5 p-4 rounded-2xl bg-accent/5 border border-border/20">
            <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{label}</span>
            <span className={cn("text-xs font-black", color)}>{value}</span>
        </div>
    )
}

function LogDetail({ label, value }: any) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{label}</span>
            <span className="text-xs font-black">{value}</span>
        </div>
    )
}

const X = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)
