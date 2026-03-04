"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    Filter,
    Download,
    ShieldAlert,
    ExternalLink,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    User,
    Shield,
    Activity,
    UserCheck,
    Zap,
    Share2,
    Lock,
    CheckCircle2,
    Plus,
    X,
    Trash2,
    Clock,
    UserPlus,
    Terminal
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { INCIDENTS_DATA } from "@/data/mock-data"
import { cn } from "@/utils/cn"

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState(() =>
        INCIDENTS_DATA.map(inc => ({
            ...inc,
            status: inc.status === "Under Investigation" ? "Investigating" : inc.status
        }))
    )
    const [selectedIncident, setSelectedIncident] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("Active Threats")
    const [severityFilter, setSeverityFilter] = useState("All")
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => {
        if (incidents.length > 0 && !selectedIncident) {
            setSelectedIncident(incidents[0])
        }
    }, [incidents, selectedIncident])

    // New Incident State
    const [newIncident, setNewIncident] = useState({
        summary: "",
        category: "Network Defense",
        priority: "Medium",
        description: ""
    })

    // Filter incidents based on Tab and Search
    const filteredIncidents = incidents.filter(incident => {
        const query = searchQuery.toLowerCase()
        const matchesSearch = incident.summary.toLowerCase().includes(query) ||
            incident.id.toLowerCase().includes(query) ||
            incident.category.toLowerCase().includes(query)

        const matchesTab = activeTab === "All Incidents" ||
            (activeTab === "Active Threats" && incident.priority === "Critical") ||
            (activeTab === "Investigating" && incident.status === "Investigating")

        const matchesSeverity = severityFilter === "All" || incident.priority === severityFilter

        return matchesSearch && matchesTab && matchesSeverity
    })

    // Real-time Simulation: Add a new anomaly occasionally
    useEffect(() => {
        const interval = setInterval(() => {
            const template = INCIDENTS_DATA[Math.floor(Math.random() * INCIDENTS_DATA.length)]
            const newInc = {
                ...template,
                id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
                status: "Active",
                priority: Math.random() > 0.5 ? "Critical" : "High",
                date: new Date().toISOString(),
                description: template.description || "Automated anomaly detection triggered by system heuristic analysis.",
                evidence: template.evidence || {
                    sourceIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1.1`,
                    target: "Institutional Gateway",
                    payload: "Anomaly Detected"
                }
            }
            setIncidents(prev => [newInc, ...prev].slice(0, 15))
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    const handleStatusChange = (id: string, newStatus: string) => {
        setIncidents(prev => {
            const updated = prev.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc);
            if (selectedIncident?.id === id) {
                const found = updated.find(i => i.id === id);
                if (found) setSelectedIncident(found);
            }
            return updated;
        })
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                            <div className="p-2 rounded-2xl bg-red-500/10 border border-red-500/20">
                                <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
                            </div>
                            Threat & Incident Management
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">Real-time security lifecycle tracking and forensic analysis suite.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.05] transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" />
                            Report Anomaly
                        </button>
                        <button
                            onClick={() => {
                                const blob = new Blob([JSON.stringify(incidents, null, 2)], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `cyber-shield-incidents-${new Date().toISOString().split('T')[0]}.json`;
                                a.click();
                            }}
                            className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl border border-border/40 bg-card/40 hover:bg-accent hover-glow transition-all duration-300"
                        >
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("INITIATE GLOBAL CONTAINMENT PROTOCOL? THIS WILL SEQUESTER ALL ACTIVE THREAT NODES.")) {
                                    setIncidents(prev => prev.map(inc => ({ ...inc, status: "Isolated" })));
                                    alert("CONTAINMENT SUCCESSFUL: ALL THREATS SEQUESTERED.");
                                }
                            }}
                            className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-red-500 text-white shadow-xl shadow-red-500/20 hover:scale-[1.05] transition-all duration-300"
                        >
                            <Zap className="w-4 h-4" />
                            Force Containment
                        </button>
                    </div>
                </div>

                {/* Filters & Navigation */}
                <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex items-center justify-between p-1.5 bg-accent/10 rounded-2xl border border-border/40 w-full glass relative overflow-hidden">
                            <div className="flex items-center gap-1 z-10 px-1">
                                {["Active Threats", "All Incidents", "Investigating"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 relative",
                                            activeTab === tab ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        )}
                                    >
                                        {tab}
                                        <span className={cn(
                                            "ml-2 px-1.5 py-0.5 rounded-full text-[10px]",
                                            tab === "Active Threats" ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"
                                        )}>
                                            {tab === "All Incidents" ? incidents.length :
                                                tab === "Active Threats" ? incidents.filter(i => i.priority === "Critical").length :
                                                    incidents.filter(i => i.status === "Investigating").length}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div className="w-[1px] h-8 bg-border/20 mx-4 hidden md:block z-10" />
                            <div className="flex items-center gap-4 flex-1 z-10 pr-2">
                                <div className="flex items-center gap-2 mr-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Severity:</span>
                                    <select
                                        className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-primary cursor-pointer"
                                        value={severityFilter}
                                        onChange={(e) => setSeverityFilter(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        <option value="Critical">Critical</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                    </select>
                                </div>
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
                                    <input
                                        type="text"
                                        placeholder="Search by hash, ID, or IP..."
                                        className="w-full h-10 pl-10 pr-4 text-xs bg-transparent outline-none font-bold placeholder:text-muted-foreground/50 transition-all focus:pl-11"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Incidents Table */}
                        <div className="flex-1 rounded-3xl border border-border/40 bg-card/20 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl relative group/table">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-border/40 uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] bg-accent/10">
                                            <th className="px-8 py-5 w-12">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-border/40 bg-accent/20 accent-primary cursor-pointer"
                                                    onChange={(e) => {
                                                        if (e.target.checked) setSelectedIds(filteredIncidents.map(i => i.id))
                                                        else setSelectedIds([])
                                                    }}
                                                    checked={selectedIds.length === filteredIncidents.length && filteredIncidents.length > 0}
                                                />
                                            </th>
                                            <th className="px-8 py-5">Case ID</th>
                                            <th className="px-8 py-5">Event Summary</th>
                                            <th className="px-8 py-5">Priority</th>
                                            <th className="px-8 py-5">Lifecycle</th>
                                            <th className="px-8 py-5 text-right pr-12">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[11px] font-bold">
                                        <AnimatePresence initial={false} mode="popLayout">
                                            {filteredIncidents.map((incident) => (
                                                <motion.tr
                                                    key={incident.id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    onClick={() => setSelectedIncident(incident)}
                                                    className={cn(
                                                        "cursor-pointer border-b border-border/10 transition-all duration-300 hover:bg-primary/5 group/row",
                                                        selectedIncident?.id === incident.id ? "bg-primary/10 shadow-inner" : "",
                                                        selectedIds.includes(incident.id) ? "bg-primary/5" : ""
                                                    )}
                                                >
                                                    <td className="px-8 py-7" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 rounded border-border/40 bg-accent/20 accent-primary cursor-pointer"
                                                            checked={selectedIds.includes(incident.id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) setSelectedIds([...selectedIds, incident.id])
                                                                else setSelectedIds(selectedIds.filter(id => id !== incident.id))
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="px-8 py-7 font-black text-primary/80 group-hover/row:text-primary transition-colors tabular-nums">{incident.id}</td>
                                                    <td className="px-8 py-7">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[13px] font-black tracking-tighter leading-none group-hover/row:translate-x-1 transition-transform">{incident.summary}</span>
                                                            <div className="flex items-center gap-2 opacity-60 text-[10px]">
                                                                <span className="uppercase tracking-widest">{incident.category}</span>
                                                                <span className="w-1 h-1 rounded-full bg-border" />
                                                                <span className="whitespace-nowrap tabular-nums">{new Date().toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-7">
                                                        <div className={cn(
                                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-center w-[90px] border",
                                                            incident.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' :
                                                                'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                                        )}>
                                                            {incident.priority}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-7">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className="relative">
                                                                <Activity className="w-4 h-4 text-primary" />
                                                                <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full animate-pulse" />
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/80">{incident.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-7 text-right pr-12">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleStatusChange(incident.id, "Resolved")
                                                                }}
                                                                title="Mark as Resolved"
                                                                className="p-2 rounded-xl border border-border/40 bg-accent/10 hover:bg-green-500 hover:text-white transition-all duration-300"
                                                            >
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 rounded-xl border border-border/40 bg-accent/10 hover:bg-primary hover:text-white transition-all duration-300">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                            {filteredIncidents.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="text-center py-20 text-muted-foreground uppercase text-xs font-black tracking-widest opacity-40">
                                                        No threats detected matching these credentials.
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={() => {
                                    const olderIncidents = INCIDENTS_DATA.map(i => ({ ...i, id: `H-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Resolved' }));
                                    setIncidents(prev => [...prev, ...olderIncidents]);
                                }}
                                className="w-full py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] hover:bg-primary/5 transition-all duration-500 relative group/btn"
                            >
                                <span className="z-10 relative">Load Historical Ledger (2,450+)</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none group-hover/table:bg-primary/10 transition-colors" />
                        </div>
                    </div>

                    {/* Details Sidebar Panel */}
                    <div className="w-full lg:w-[480px] h-full sticky top-8">
                        <AnimatePresence mode="wait">
                            {selectedIncident && (
                                <motion.div
                                    key={selectedIncident.id}
                                    initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="flex flex-col gap-8 p-8 rounded-[40px] border border-border/40 bg-card/20 backdrop-blur-3xl h-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
                                >
                                    {/* Panel Header */}
                                    <div className="flex flex-col gap-4 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[9px] font-black uppercase tracking-[0.2em] text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                                    Live Threat
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] opacity-60">Verified Origin</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 rounded-xl hover:bg-accent/40 cursor-pointer transition-all">
                                                    <Share2 className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                                <div className="p-2 rounded-xl hover:bg-accent/40 cursor-pointer transition-all">
                                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-3xl font-black tracking-tighter leading-[1.1]">{selectedIncident.summary}</h2>
                                                <select
                                                    className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary outline-none cursor-pointer"
                                                    value={selectedIncident.status}
                                                    onChange={(e) => handleStatusChange(selectedIncident.id, e.target.value)}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Investigating">Investigating</option>
                                                    <option value="Resolved">Resolved</option>
                                                    <option value="Isolated">Isolated</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground bg-accent/5 self-start px-3 py-1.5 rounded-lg border border-border/20">
                                                <span className="text-primary font-black">{selectedIncident.id}</span>
                                                <span className="opacity-40">•</span>
                                                <span className="tabular-nums">SHA-256: {Math.random().toString(16).substring(2, 10).toUpperCase()}...</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-4 relative z-10">
                                        <ActionButton
                                            icon={<Shield className="w-4 h-4" />}
                                            label="Lock Assets"
                                            onClick={() => {
                                                handleStatusChange(selectedIncident.id, "Locked");
                                                alert(`ASSETS LOCKED FOR CASE ${selectedIncident.id}`);
                                            }}
                                        />
                                        <ActionButton
                                            icon={<UserCheck className="w-4 h-4" />}
                                            label="Triage"
                                            onClick={() => handleStatusChange(selectedIncident.id, "Investigating")}
                                        />
                                        <ActionButton
                                            icon={<User className="w-4 h-4" />}
                                            label="Transfer"
                                            onClick={() => alert("CASE TRANSFERRED TO L4 OPERATOR")}
                                        />
                                        <ActionButton
                                            icon={<Lock className="w-4 h-4" />}
                                            label="Escalate"
                                            color="text-red-500 bg-red-500/10 border-red-500/20"
                                            onClick={() => {
                                                setIncidents(prev => prev.map(i => i.id === selectedIncident.id ? { ...i, priority: "Critical" } : i));
                                                alert("PRIORITY ESCALATED TO CRITICAL");
                                            }}
                                        />
                                    </div>

                                    {/* Forensic Intelligence */}
                                    <div className="flex flex-col gap-6 relative z-10 custom-scrollbar overflow-y-auto max-h-[400px] pr-2">
                                        <DropdownSection title="Forensic Evidence" defaultOpen>
                                            {selectedIncident.evidence && (
                                                <div className="p-5 rounded-2xl bg-black/40 border border-border/40 font-mono text-[11px] leading-relaxed shadow-inner">
                                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                        <span className="font-bold text-red-500 uppercase tracking-widest text-[9px]">Anomalous Activity Detected</span>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        <div className="flex justify-between">
                                                            <span className="opacity-40 uppercase tracking-widest">Source IP</span>
                                                            <span className="text-primary">{selectedIncident.evidence.sourceIp}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="opacity-40 uppercase tracking-widest">Institution Target</span>
                                                            <span className="text-cyan-400">{selectedIncident.evidence.target}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/5 overflow-hidden">
                                                            <span className="opacity-40 uppercase tracking-widest">Malicious Payload</span>
                                                            <div className="p-3 rounded-xl bg-red-500/5 text-red-400 break-all select-all hover:bg-red-500/10 transition-colors">
                                                                {selectedIncident.evidence.payload}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </DropdownSection>

                                        <DropdownSection title="Assigned Security Analyst">
                                            <div className="p-4 rounded-2xl border border-border/40 bg-accent/5 hover-glow transition-all group/analyst">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative">
                                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-sm font-black text-white shadow-xl shadow-primary/20">
                                                                {selectedIncident.analyst ? selectedIncident.analyst.split(' ').map((n: string) => n[0]).join('') : 'UN'}
                                                            </div>
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-background rounded-full" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[13px] font-black tracking-tight">{selectedIncident.analyst || 'Unassigned Node'}</span>
                                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">L3 Incident Handler</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-2 rounded-xl bg-accent/10 opacity-0 group-hover/analyst:opacity-100 transition-opacity">
                                                        <ExternalLink className="w-4 h-4 text-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </DropdownSection>

                                        <DropdownSection title="Incident Timeline">
                                            <div className="flex flex-col gap-4 pl-4 border-l border-border/20">
                                                <TimelineItem time="14:22:01" event="Case Initialized" status="Critical" />
                                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
                                                    <TimelineItem time="14:35:12" event="Forensic Analysis Started" status="Investigating" active />
                                                </motion.div>
                                                <TimelineItem time="14:40:05" event="Primary Payload Sequestered" status="Active" disabled />
                                            </div>
                                        </DropdownSection>
                                    </div>

                                    {/* Panel Footer Decor */}
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-primary rounded-2xl p-4 flex items-center gap-8 shadow-2xl glass border border-white/20 whitespace-nowrap"
                    >
                        <div className="flex items-center gap-4 px-4 border-r border-white/10">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black text-white">
                                {selectedIds.length}
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-white">Nodes Selected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    setIncidents(prev => prev.map(i => selectedIds.includes(i.id) ? { ...i, status: 'Resolved' } : i));
                                    setSelectedIds([]);
                                }}
                                className="px-6 py-2 rounded-xl bg-white text-primary text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                            >
                                Bulk Resolve
                            </button>
                            <button
                                onClick={() => {
                                    setIncidents(prev => prev.filter(i => !selectedIds.includes(i.id)));
                                    setSelectedIds([]);
                                }}
                                className="px-6 py-2 rounded-xl bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                            >
                                Purge Logs
                            </button>
                            <button onClick={() => setSelectedIds([])} className="p-2 text-white/60 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Create Incident Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card w-full max-w-2xl rounded-[40px] border border-border/40 p-12 relative overflow-hidden flex flex-col gap-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter">Report Anomaly</h2>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manual Security Event Initialization</p>
                                </div>
                                <button onClick={() => setIsCreateModalOpen(false)} className="p-3 rounded-2xl bg-accent/10 hover:bg-accent transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-2">Summary</label>
                                    <input
                                        type="text"
                                        placeholder="Brief event overview..."
                                        className="bg-accent/10 border border-border/40 rounded-2xl p-4 outline-none focus:border-primary/40 transition-all font-bold text-sm"
                                        value={newIncident.summary}
                                        onChange={e => setNewIncident({ ...newIncident, summary: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-2">Category</label>
                                    <select
                                        className="bg-accent/10 border border-border/40 rounded-2xl p-4 outline-none focus:border-primary/40 transition-all font-bold text-sm"
                                        value={newIncident.category}
                                        onChange={e => setNewIncident({ ...newIncident, category: e.target.value })}
                                    >
                                        <option>Network Defense</option>
                                        <option>Access Control</option>
                                        <option>Data Security</option>
                                        <option>Identity Management</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 col-span-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-2">Description / Forensic Context</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Provide full technical context of the security event..."
                                        className="bg-accent/10 border border-border/40 rounded-2xl p-4 outline-none focus:border-primary/40 transition-all font-bold text-sm resize-none"
                                        value={newIncident.description}
                                        onChange={e => setNewIncident({ ...newIncident, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (!newIncident.summary) return alert("SUMMARY REQUIRED");
                                    const created = {
                                        id: `INC-${Math.floor(10000 + Math.random() * 90000)}`,
                                        ...newIncident,
                                        date: new Date().toISOString(),
                                        status: "Under Investigation",
                                        analyst: "Institutional Operator",
                                        priority: "High",
                                        evidence: {
                                            sourceIp: "System Internal",
                                            target: "Manual Initialization",
                                            payload: "N/A"
                                        }
                                    };
                                    setIncidents([created, ...incidents]);
                                    setIsCreateModalOpen(false);
                                    setNewIncident({ summary: "", category: "Network Defense", priority: "Medium", description: "" });
                                }}
                                className="w-full h-20 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
                            >
                                Initialize Incident Protocol
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout >
    )
}

function TimelineItem({ time, event, status, active = false, disabled = false }: any) {
    return (
        <div className={cn("flex items-start gap-4 py-2", disabled && "opacity-30")}>
            <div className="flex flex-col items-center">
                <div className={cn(
                    "w-3 h-3 rounded-full bg-border border-2 border-background z-10",
                    active && "bg-primary animate-pulse",
                    status === "Critical" && "bg-red-500"
                )} />
            </div>
            <div className="flex flex-col gap-1 -translate-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black font-mono text-muted-foreground uppercase">{time}</span>
                    <span className={cn(
                        "text-[7px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded bg-accent/5",
                        status === "Critical" ? "text-red-500 bg-red-500/10" : "text-primary bg-primary/10"
                    )}>{status}</span>
                </div>
                <span className="text-[11px] font-bold text-foreground/80">{event}</span>
            </div>
        </div>
    )
}

function ActionButton({ icon, label, onClick, color = "text-primary bg-accent/20 border-border/40" }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center justify-center gap-3 p-4 rounded-2xl border hover:scale-[1.02] active:scale-95 transition-all font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-black/20",
                color
            )}
        >
            {icon}
            {label}
        </button>
    )
}

function DropdownSection({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return (
        <div className="flex flex-col gap-3 relative z-10 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between group py-1"
            >
                <span className="text-xs font-black uppercase tracking-widest text-foreground/80 group-hover:text-primary transition-colors">{title}</span>
                <div className={cn("p-1.5 rounded-lg bg-accent/5 transition-all duration-300", isOpen && "rotate-90 bg-primary/10")}>
                    <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground", isOpen && "text-primary")} />
                </div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <div className="pb-2">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
