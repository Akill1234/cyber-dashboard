"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users,
    ShieldCheck,
    Key,
    Lock,
    Shield,
    MoreVertical,
    ChevronRight,
    UserPlus,
    Settings,
    Activity,
    Globe,
    Plus,
    ArrowRight,
    X,
    LogOut,
    CheckCircle2,
    Search,
    Fingerprint
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { IAM_USERS, PERMISSION_MATRIX } from "@/data/mock-data"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/utils/cn"

export default function AccessControlPage() {
    const [selectedRole, setSelectedRole] = useState("Global Administrator")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const roles = [
        { name: "Global Administrator", users: 3, description: "Full system governance & audit access" },
        { name: "Security Architect", users: 12, description: "Infrastructure & policy design" },
        { name: "Compliance Auditor", users: 8, description: "Regulatory reporting & audit review" },
        { name: "Incident Responder", users: 25, description: "Threat triage & containment" },
        { name: "Platform Engineer", users: 15, description: "Cluster & infrastructure ops" },
    ]

    const [isLoading, setIsLoading] = React.useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [users, setUsers] = useState(IAM_USERS)
    const [matrix, setMatrix] = useState(PERMISSION_MATRIX)
    const [inviteEmail, setInviteEmail] = useState("")
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [isGlobalConfigOpen, setIsGlobalConfigOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    const handleRoleChange = (roleName: string) => {
        setSelectedRole(roleName)
        // Simulate loading new matrix for the role
        setMatrix(prev => prev.map(group => ({
            ...group,
            items: group.items.map(item => ({
                ...item,
                enabled: Math.random() > 0.4,
                mfa: Math.random() > 0.6
            }))
        })))
    }

    const savePermissions = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            alert("Security Protocol Updated: Role privileges synchronized across all clusters.")
        }, 1500)
    }

    const discardChanges = () => {
        if (confirm("Abandon unsaved configuration changes?")) {
            setMatrix(PERMISSION_MATRIX)
        }
    }

    // Filter users
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const togglePermission = (groupIndex: number, itemIndex: number, field: 'enabled' | 'mfa') => {
        setMatrix(prev => {
            const newMatrix = [...prev]
            newMatrix[groupIndex].items[itemIndex] = {
                ...newMatrix[groupIndex].items[itemIndex],
                [field]: !newMatrix[groupIndex].items[itemIndex][field]
            }
            return newMatrix
        })
    }

    const handleInvite = () => {
        if (!inviteEmail) return
        setIsSuccessModalOpen(true)
        setIsModalOpen(false)
        setInviteEmail("")
    }

    const lockUser = (email: string) => {
        setUsers(prev => prev.map(u => u.email === email ? { ...u, status: u.status === 'Suspicious' ? 'Safe' : 'Suspicious' } : u))
    }

    const terminateSessions = () => {
        if (confirm("Terminate all active administrative sessions?")) {
            alert("Protocol 0: Global Session Purge Initialized.")
        }
    }

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex flex-col gap-6 animate-pulse">
                    <div className="h-20 bg-accent/20 rounded-3xl w-full" />
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-accent/10 rounded-2xl" />)}
                    </div>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3 h-[500px] bg-accent/10 rounded-2xl" />
                        <div className="col-span-6 h-[500px] bg-accent/10 rounded-2xl" />
                        <div className="col-span-3 h-[500px] bg-accent/10 rounded-2xl" />
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                            Access Control & Identity
                        </h1>
                        <p className="text-muted-foreground text-sm">Configure role-based access controls, manage institutional security policies, and monitor real-time privileged administrative activity.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-all"
                        >
                            <UserPlus className="w-3.5 h-3.5" />
                            Invite Admin
                        </button>
                        <button
                            onClick={() => setIsGlobalConfigOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all font-black uppercase tracking-tighter"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            Global Config
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <IAMStatCard label="TOTAL IAM USERS" value={1284} trend="+12 this week" icon={<Users className="w-4 h-4" />} />
                    <IAMStatCard label="ACTIVE SESSIONS" value={42} trend="15 high privilege" icon={<Activity className="w-4 h-4" />} />
                    <IAMStatCard label="MFA COMPLIANCE" value={98.2} unit="%" trend="Institutional target: 100%" icon={<Key className="w-4 h-4" />} />
                    <IAMStatCard label="PENDING REQUESTS" value={9} trend="3 urgent escalations" icon={<Lock className="w-4 h-4" />} color="text-red-500" />
                </div>

                {/* Roles and Matrix Section */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Left: Security Roles */}
                    <div className="xl:col-span-3 flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Security Roles</h3>
                            <Settings className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-2">
                            {roles.map((role) => (
                                <button
                                    key={role.name}
                                    onClick={() => handleRoleChange(role.name)}
                                    className={cn(
                                        "flex flex-col gap-1 p-4 rounded-xl border transition-all text-left group",
                                        selectedRole === role.name
                                            ? "bg-primary/10 border-primary/40 shadow-lg shadow-primary/5"
                                            : "bg-card/20 border-border/40 hover:bg-accent/20 hover:border-border/60"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={cn("text-xs font-black tracking-tight", selectedRole === role.name ? "text-primary" : "text-foreground")}>{role.name}</span>
                                        <span className="text-[10px] font-bold text-muted-foreground">{role.users} Users</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-tight">{role.description}</p>
                                </button>
                            ))}
                            <button className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border/40 text-muted-foreground hover:bg-accent/10 hover:border-border/60 transition-all mt-2">
                                <Plus className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Create New Role</span>
                            </button>
                        </div>
                    </div>

                    {/* Middle: Permission Matrix */}
                    <div className="xl:col-span-6 rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl p-6 flex flex-col gap-6 relative overflow-hidden">
                        <div className="flex items-center justify-between z-10">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-black tracking-tighter">Permission Matrix</h2>
                                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Grant specific capabilities for the selected role</p>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase">Role ID: 1</div>
                        </div>

                        <div className="flex flex-col gap-8 z-10">
                            <div className="grid grid-cols-12 text-[9px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20 pb-4">
                                <div className="col-span-8">Capability</div>
                                <div className="col-span-2 text-center">Enabled</div>
                                <div className="col-span-2 text-center">2FA REQ.</div>
                            </div>

                            {matrix.map((group, gIdx) => (
                                <div key={gIdx} className="flex flex-col gap-4">
                                    <span className="text-[9px] font-black text-primary/60 tracking-[0.3em] uppercase">{group.group}</span>
                                    {group.items.map((item, iIdx) => (
                                        <div key={iIdx} className="grid grid-cols-12 items-center group/row">
                                            <div className="col-span-8 flex flex-col gap-0.5">
                                                <span className="text-xs font-bold group-hover/row:text-primary transition-colors">{item.name}</span>
                                                <span className="text-[10px] text-muted-foreground">Detailed description of the protocol access privilege.</span>
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={item.enabled}
                                                    onChange={() => togglePermission(gIdx, iIdx, 'enabled')}
                                                    className="w-4 h-4 rounded border-border/40 bg-accent/20 checked:bg-primary transition-all cursor-pointer accent-primary"
                                                />
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={item.mfa}
                                                    onChange={() => togglePermission(gIdx, iIdx, 'mfa')}
                                                    className="w-4 h-4 rounded border-border/40 bg-accent/20 checked:bg-primary transition-all cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-border/20 z-10">
                            <button
                                onClick={discardChanges}
                                className="px-4 py-2 text-[10px] font-black uppercase text-muted-foreground hover:text-foreground transition-all"
                            >
                                Discard Changes
                            </button>
                            <button
                                onClick={savePermissions}
                                disabled={isSaving}
                                className={cn(
                                    "px-6 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all min-w-[180px]",
                                    isSaving && "opacity-50 cursor-not-allowed scale-[0.98]"
                                )}
                            >
                                {isSaving ? "Synchronizing..." : "Update Role Permissions"}
                            </button>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                    </div>

                    {/* Right: Activity and Sessions */}
                    <div className="xl:col-span-3 flex flex-col gap-6">
                        <div className="rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md p-5 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest">Privileged Activity</h3>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[9px] font-bold uppercase text-red-500">Live</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <ActivityItem user="Sarah Chen" event="Modified firewall rules for SWIFT Gateway Cluster-B" time="2 mins ago" type="info" />
                                <ActivityItem user="Michael Vance" event="Attempted to export bulk customer PII data to external IP" time="14 mins ago" type="critical" />
                                <ActivityItem user="Elena Rodriguez" event="Authorized lockdown of compromised terminal #8821" time="45 mins ago" type="warning" />
                            </div>
                            <button className="w-full text-center text-[9px] font-black uppercase text-muted-foreground hover:text-primary transition-all mt-2 tracking-widest">View Extended Audit Trail</button>
                        </div>

                        <div className="rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md p-5 flex flex-col gap-4">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                Active Admin Sessions
                            </h3>
                            <div className="flex flex-col gap-3">
                                <SessionItem ip="192.150.1.42" location="New York, US" elapsed="45m 12s" />
                                <SessionItem ip="117.43.12.9" location="London, UK" elapsed="1h 22m" />
                            </div>
                            <button
                                onClick={terminateSessions}
                                className="w-full py-2.5 rounded-lg border border-red-500/30 bg-red-500/5 text-[9px] font-black uppercase text-red-500 hover:bg-red-500/10 transition-all tracking-widest"
                            >
                                Terminate All Other Sessions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Table: Privileged User Directory */}
                <div className="rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl p-6 flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-black tracking-tighter">Privileged User Directory</h2>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">Showing 25 of 142 administrators</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Filter by name, ID or role..."
                                    className="h-10 pl-10 pr-4 bg-accent/20 border border-border/40 rounded-xl text-xs outline-none focus:border-primary/40 transition-all w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="p-2.5 rounded-xl border border-border/40 bg-accent/10 hover:bg-accent/30 flex items-center justify-center transition-all">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border/20 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] bg-accent/5">
                                    <th className="px-6 py-4">User Entity</th>
                                    <th className="px-6 py-4">Primary Security Role</th>
                                    <th className="px-6 py-4">Last Auth Method</th>
                                    <th className="px-6 py-4">Risk Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] font-semibold">
                                {filteredUsers.map((user, idx) => (
                                    <tr key={idx} className="border-b border-border/10 hover:bg-white/5 transition-all group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/10">
                                                    {user.avatar}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black group-hover:text-primary transition-colors">{user.name}</span>
                                                    <span className="text-[10px] text-muted-foreground">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-2 py-0.5 rounded-full bg-accent/40 border border-border/40 text-[9px] font-black uppercase tracking-tighter">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-muted-foreground">{user.auth}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    user.status === 'Safe' ? 'bg-green-500' : user.status === 'Caution' ? 'bg-orange-500 animate-pulse' : 'bg-red-500 animate-bounce'
                                                )} />
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase",
                                                    user.status === 'Safe' ? 'text-green-500/80' : user.status === 'Caution' ? 'text-orange-500/80' : 'text-red-500/80'
                                                )}>{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Settings className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-all" />
                                                <button
                                                    onClick={() => lockUser(user.email)}
                                                    className={cn(
                                                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all outline-none",
                                                        user.status === 'Suspicious' ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "bg-accent/20 border border-border/40 text-muted-foreground hover:bg-primary hover:text-white"
                                                    )}
                                                >
                                                    {user.status === 'Suspicious' ? <Lock className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                                                    {user.status === 'Suspicious' ? "Unlock" : "Lock"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Invite Admin Modal Placeholder */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-lg rounded-3xl border border-border/40 bg-card p-8 shadow-2xl flex flex-col gap-6 relative"
                        >
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-black tracking-tighter">Invite Security Administrator</h2>
                                <p className="text-sm text-muted-foreground">Grant privileged access to the platform infrastructure.</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">User Identity</label>
                                    <input
                                        type="email"
                                        placeholder="email@cybershield.io"
                                        className="h-12 px-4 rounded-xl border border-border/40 bg-accent/10 focus:border-primary/60 outline-none transition-all"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Initial Security Role</label>
                                    <select className="h-12 px-4 rounded-xl border border-border/40 bg-accent/10 focus:border-primary/60 outline-none transition-all cursor-pointer">
                                        <option>Select a role...</option>
                                        <option>Security Architect</option>
                                        <option>Incident Responder</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-xs font-black uppercase text-muted-foreground hover:text-foreground">Cancel</button>
                                <button
                                    onClick={handleInvite}
                                    className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                                >
                                    Send Invitation
                                </button>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-all"
                            >
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Invitation Modal */}
            <AnimatePresence>
                {isSuccessModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card w-full max-w-sm rounded-[40px] border border-border/40 p-10 flex flex-col items-center text-center gap-6 shadow-2xl"
                        >
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-primary" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">Invitation Sent</h3>
                                <p className="text-xs text-muted-foreground font-medium">The privileged access token has been dispatched via encrypted protocol.</p>
                            </div>
                            <button
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                            >
                                Dismiss Protocol
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Global Security Config Modal */}
            <AnimatePresence>
                {isGlobalConfigOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-card w-full max-w-2xl rounded-[40px] border border-border/40 p-12 relative overflow-hidden shadow-2xl flex flex-col gap-10"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                                        <Globe className="w-8 h-8 text-primary" />
                                        Global security config
                                    </h2>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-black opacity-60">System-wide Security Protocols & Institutional Policies</p>
                                </div>
                                <button onClick={() => setIsGlobalConfigOpen(false)} className="p-3 rounded-2xl bg-accent/10 hover:bg-accent transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Authentication Protocols</h4>
                                    <div className="flex flex-col gap-4">
                                        <ConfigToggle label="Mandatory Biometric MFA" description="Require FaceID/TouchID for all high-privilege operations." defaultChecked={true} />
                                        <ConfigToggle label="Geo-Fencing Restrictions" description="Limit administrative access to authorized institutional zones." defaultChecked={true} />
                                        <ConfigToggle label="Hardware Key Enforcement" description="Mandate Yubikey for Global Administrator roles." defaultChecked={false} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">System Resilience</h4>
                                    <div className="flex flex-col gap-4">
                                        <ConfigToggle label="Auto-Lock Suspicious Entity" description="Automatically lock accounts with risk scores > 85%." defaultChecked={true} />
                                        <ConfigToggle label="Protocol 0: Rapid Purge" description="Enable emergency session termination across global nodes." defaultChecked={true} />
                                        <ConfigToggle label="Deep Packet Inspection" description="Enable recursive inspection on admin egress traffic." defaultChecked={true} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-6 rounded-3xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-4">
                                    <Fingerprint className="w-6 h-6 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase">Institutional Cipher Strength</span>
                                        <span className="text-sm font-bold text-muted-foreground">AES-256-GCM / Quantum Resistant</span>
                                    </div>
                                </div>
                                <button className="px-6 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Update Cipher</button>
                            </div>

                            <button
                                onClick={() => setIsGlobalConfigOpen(false)}
                                className="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                Deploy Global Security Parameters
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    )
}

function IAMStatCard({ label, value, unit = "", trend, icon, color = "text-foreground" }: any) {
    return (
        <div className="p-5 rounded-2xl border border-border/40 bg-card/10 hover:bg-card/30 transition-all flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 rounded-xl bg-accent/20 text-primary group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">{label}</span>
                <div className={cn("text-2xl font-black tabular-nums tracking-tighter mt-1", color)}>
                    <AnimatedCounter value={value} />
                    <span className="text-lg ml-0.5">{unit}</span>
                </div>
                <span className="text-[9px] font-bold text-muted-foreground opacity-60 mt-0.5">{trend}</span>
            </div>
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <ChevronRight className="w-8 h-8 rotate-[-45deg]" />
            </div>
        </div>
    )
}

function ActivityItem({ user, event, time, type }: any) {
    return (
        <div className="flex gap-3 group translate-x-0 hover:translate-x-1 transition-transform">
            <div className="w-8 h-8 rounded-full bg-accent/40 flex items-center justify-center text-[10px] font-bold shadow-sm">
                {user.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black">{user}</span>
                    {type === 'critical' && <span className="px-1 py-0.5 rounded text-[7px] font-black uppercase bg-red-500 text-white">Critical</span>}
                    {type === 'info' && <span className="px-1 py-0.5 rounded text-[7px] font-black uppercase border border-border/40 text-muted-foreground">Info</span>}
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug">{event}</p>
                <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground opacity-60">
                    <Activity className="w-3 h-3" />
                    {time}
                </div>
            </div>
        </div>
    )
}

function SessionItem({ ip, location, elapsed }: any) {
    return (
        <div className="flex flex-col gap-1 p-3 rounded-xl border border-border/20 bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold group-hover:text-primary transition-colors">{ip}</span>
                <span className="text-[9px] font-black text-muted-foreground opacity-60">Elapsed: {elapsed}</span>
            </div>
            <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-muted-foreground" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase">{location}</span>
            </div>
        </div>
    )
}
function ConfigToggle({ label, description, defaultChecked }: any) {
    const [checked, setChecked] = useState(defaultChecked)
    return (
        <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer" onClick={() => setChecked(!checked)}>
            <div className="flex flex-col gap-1">
                <span className="text-[11px] font-black uppercase group-hover:text-primary transition-colors">{label}</span>
                <p className="text-[9px] text-muted-foreground font-medium leading-tight">{description}</p>
            </div>
            <div className={cn(
                "w-10 h-6 rounded-full p-1 transition-all duration-300",
                checked ? "bg-primary" : "bg-accent/20"
            )}>
                <div className={cn(
                    "w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm",
                    checked ? "translate-x-4" : "translate-x-0"
                )} />
            </div>
        </div>
    )
}
