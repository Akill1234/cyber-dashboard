"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    User,
    Lock,
    Bell,
    Globe,
    Shield,
    ShieldAlert,
    Activity,
    Key,
    Save,
    Trash2,
    Eye,
    EyeOff,
    CheckCircle2,
    Monitor,
    Smartphone,
    Database,
    Cpu,
    Zap
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { cn } from "@/utils/cn"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Profile")
    const [isSaving, setIsSaving] = useState(false)

    const tabs = [
        { id: "Profile", icon: User, label: "Identity" },
        { id: "Security", icon: Lock, label: "Encryption" },
        { id: "Notifications", icon: Bell, label: "Threat Alerts" },
        { id: "System", icon: Globe, label: "Core Console" },
    ]

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => setIsSaving(false), 2000)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 page-transition">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                            <div className="p-2 rounded-2xl bg-primary/10 border border-primary/20">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            System Settings
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">Configure institutional security protocols and administrative node parameters.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-widest rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-[1.05] disabled:opacity-50 disabled:grayscale disabled:scale-100",
                        )}
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? "Synchronizing..." : "Synchronize Node"}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Navigation Sidebar */}
                    <aside className="w-full lg:w-72 flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group border border-transparent",
                                    activeTab === tab.id
                                        ? "bg-primary/15 text-primary border-primary/20 shadow-lg shadow-primary/5"
                                        : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-5 h-5 transition-all duration-300",
                                    activeTab === tab.id ? "text-primary scale-110" : "group-hover:text-primary group-hover:scale-110"
                                )} />
                                <span className="font-black text-[11px] uppercase tracking-widest">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="active-settings-tab"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(6,182,212,1)]"
                                    />
                                )}
                            </button>
                        ))}

                        <div className="mt-8 p-6 rounded-[2rem] bg-accent/5 border border-border/20 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Cpu className="w-4 h-4 text-primary opacity-40" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Node Version</span>
                            </div>
                            <div className="text-[10px] font-black tabular-nums">v4.8.2-stable-release</div>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 min-h-[600px] mb-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="h-full"
                            >
                                {activeTab === "Profile" && <ProfileSettings />}
                                {activeTab === "Security" && <SecuritySettings />}
                                {activeTab === "Notifications" && <NotificationSettings />}
                                {activeTab === "System" && <SystemSettings />}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </DashboardLayout>
    )
}

function SettingsSection({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-3xl shadow-2xl flex flex-col gap-8 relative overflow-hidden group">
            <div className="flex flex-col gap-1 relative z-10">
                <h3 className="text-xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{description}</p>
            </div>
            <div className="relative z-10">
                {children}
            </div>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
        </div>
    )
}

function InputField({ label, placeholder, type = "text", value }: any) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{label}</label>
            <input
                type={type}
                defaultValue={value}
                placeholder={placeholder}
                className="w-full h-12 px-5 rounded-xl bg-accent/10 border border-border/40 focus:border-primary/60 focus:bg-accent/20 transition-all outline-none text-[11px] font-black tabular-nums placeholder:text-muted-foreground/30"
            />
        </div>
    )
}

function ToggleItem({ icon: Icon, title, description, enabled = false }: any) {
    const [isOn, setIsOn] = useState(enabled)
    return (
        <div className="flex items-center justify-between p-5 rounded-2xl bg-accent/5 border border-border/20 group/toggle hover:bg-accent/10 transition-all duration-300">
            <div className="flex items-center gap-5">
                <div className={cn(
                    "p-3 rounded-xl transition-all duration-300 border border-border/40",
                    isOn ? "bg-primary/20 border-primary/40 text-primary" : "bg-accent/10 text-muted-foreground"
                )}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest">{title}</span>
                    <span className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase tracking-tighter mt-0.5">{description}</span>
                </div>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={cn(
                    "w-12 h-6 rounded-full p-1 transition-all duration-500 relative overflow-hidden",
                    isOn ? "bg-primary shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "bg-accent/20"
                )}
            >
                <div className={cn(
                    "w-4 h-4 rounded-full bg-white shadow-lg transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    isOn ? "translate-x-6" : "translate-x-0"
                )} />
            </button>
        </div>
    )
}

function ProfileSettings() {
    return (
        <div className="flex flex-col gap-8">
            <SettingsSection
                title="Identity Node Controller"
                description="Manage administrative identification and biometric verification data."
            >
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-primary to-cyan-500 shadow-2xl flex items-center justify-center text-4xl font-black text-white p-1">
                            <div className="w-full h-full rounded-[2.2rem] border-4 border-background/20 overflow-hidden flex items-center justify-center">
                                JD
                            </div>
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 rounded-[1.5rem] bg-white text-black shadow-xl hover:scale-110 transition-all border border-border/20">
                            <Zap className="w-4 h-4 fill-current text-primary" />
                        </button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <InputField label="Intelligence Name" value="Jane Doe" placeholder="Jane Doe" />
                        <InputField label="Credential Hash" value="jd-console-admin-482" placeholder="admin-hash-xyz" />
                        <InputField label="Direct Uplink Email" value="jane.doe@cybershield.io" placeholder="email@address.com" />
                        <InputField label="Authority Role" value="Lead System Architect" placeholder="Role description" />
                        <div className="md:col-span-2">
                            <InputField label="Security Brief (BIO)" value="Overseeing tier-1 institutional firewall clusters and global threat mitigation nodes." placeholder="Enter bio..." />
                        </div>
                    </div>
                </div>
            </SettingsSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SettingsSection title="Login Pulse" description="Recent authentication activity on this node.">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-border/10">
                            <div className="flex items-center gap-3">
                                <Monitor className="w-4 h-4 text-primary" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black uppercase">MacOS • San Francisco, CA</span>
                                    <span className="text-[9px] text-muted-foreground font-bold">Current Session • 192.168.1.1</span>
                                </div>
                            </div>
                            <span className="text-[9px] font-black uppercase text-primary">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-border/10 opacity-60">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black uppercase">iPhone 15 Pro • London, UK</span>
                                    <span className="text-[9px] text-muted-foreground font-bold">2 days ago • 84.12.3.4</span>
                                </div>
                            </div>
                            <Trash2 className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition-all" />
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection title="Node Danger Zone" description="Irreversible administrative commands.">
                    <div className="flex flex-col gap-4 text-center items-center justify-center py-4">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 leading-relaxed">
                            Terminate current administrative identity and purge all local encrypted cache.
                        </p>
                        <button className="px-6 py-3 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 w-full">
                            Decommission Identity
                        </button>
                    </div>
                </SettingsSection>
            </div>
        </div>
    )
}

function SecuritySettings() {
    return (
        <div className="flex flex-col gap-8">
            <SettingsSection
                title="Encryption & Authentication"
                description="Manage institutional-grade security layers and multi-factor protocols."
            >
                <div className="flex flex-col gap-4">
                    <ToggleItem
                        icon={Shield}
                        title="Biometric Verification"
                        description="Require fingerprint or face scanning for high-privilege commands."
                        enabled={true}
                    />
                    <ToggleItem
                        icon={Key}
                        title="Hardware Security Keys"
                        description="Enforce Yubikey or FIDO2 hardware authentication for all uplinks."
                        enabled={true}
                    />
                    <ToggleItem
                        icon={Zap}
                        title="Instant Containment"
                        description="Automatically lock all institutional assets if suspicious login is detected."
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Access Token Rotation" description="Institutional API gateway secrets.">
                <div className="flex flex-col gap-4">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Current Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    defaultValue="••••••••••••••••"
                                    className="w-full h-12 px-5 rounded-xl bg-accent/10 border border-border/40 outline-none text-[11px] font-black tabular-nums"
                                />
                                <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="New Secret Hash" placeholder="••••••••••••••••" type="password" />
                            <InputField label="Confirm Intelligence Hash" placeholder="••••••••••••••••" type="password" />
                        </div>
                    </div>
                </div>
            </SettingsSection>
        </div>
    )
}

function NotificationSettings() {
    return (
        <div className="flex flex-col gap-8">
            <SettingsSection
                title="Threat Intelligence Pipeline"
                description="Configure how this node receives and propagates threat alerts."
            >
                <div className="flex flex-col gap-4">
                    <ToggleItem
                        icon={ShieldAlert}
                        title="Critical Breach Alerts"
                        description="Immediate direct push notifications for tier-1 security events."
                        enabled={true}
                    />
                    <ToggleItem
                        icon={Database}
                        title="Weekly Governance Digests"
                        description="Aggregated compliance and risk scoring reports via encrypted email."
                    />
                    <ToggleItem
                        icon={Activity}
                        title="Node Health Flux"
                        description="Notify when any global node latency exceeds 500ms."
                        enabled={true}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Slack & Intelligence Nodes" description="Propagate threats to third-party secure channels.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-4 p-5 rounded-2xl bg-[#4A154B]/10 border border-[#4A154B]/20 group hover:bg-[#4A154B]/20 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-[#4A154B] flex items-center justify-center text-white shadow-lg overflow-hidden shrink-0">
                            S
                        </div>
                        <div className="flex flex-col items-start truncate">
                            <span className="text-xs font-black uppercase">Slack Console</span>
                            <span className="text-[10px] font-bold opacity-60">Uplinked: #sec-ops</span>
                        </div>
                        <CheckCircle2 className="ml-auto w-4 h-4 text-green-500" />
                    </button>
                    <button className="flex items-center gap-4 p-5 rounded-2xl bg-accent/5 border border-border/20 group hover:border-primary/40 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-card border border-border/40 flex items-center justify-center shrink-0">
                            <Globe className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col items-start truncate">
                            <span className="text-xs font-black uppercase">Elastic Stack</span>
                            <span className="text-[10px] font-bold opacity-40">Configure Endpoint...</span>
                        </div>
                    </button>
                </div>
            </SettingsSection>
        </div>
    )
}

function SystemSettings() {
    return (
        <div className="flex flex-col gap-8">
            <SettingsSection
                title="Global Console Configuration"
                description="Configure the primary visualization interface and institutional localization."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Visualization Region</label>
                            <select className="w-full h-12 px-5 rounded-xl bg-accent/10 border border-border/40 text-[11px] font-black uppercase tracking-widest outline-none">
                                <option>North America (US-EAST-01)</option>
                                <option>European Union (EU-WEST-02)</option>
                                <option>Asia-Pacific (AP-SOUTH-01)</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Threat Retention Period</label>
                            <select className="w-full h-12 px-5 rounded-xl bg-accent/10 border border-border/40 text-[11px] font-black uppercase tracking-widest outline-none">
                                <option>30 Days (standard)</option>
                                <option>90 Days (archive)</option>
                                <option>1 Year (institutional compliance)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ToggleItem
                            icon={Monitor}
                            title="Dark Protocol"
                            description="Enforce deep navy #0B1C2D theme across all institutional nodes."
                            enabled={true}
                        />
                        <ToggleItem
                            icon={Zap}
                            title="Motion Dynamics"
                            description="Enable glassmorphism and real-time fluidity animations."
                            enabled={true}
                        />
                    </div>
                </div>
            </SettingsSection>

            <SettingsSection title="Institutional Sync" description="Last synchronized with Global Master Node: 2s ago.">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-primary/5 border border-primary/20">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary">
                        <Database className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-black uppercase tracking-tighter leading-none mb-1">Global Database Optimization</span>
                        <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase opacity-60">842 GB of threat intelligence synchronized successfully locally.</span>
                    </div>
                </div>
            </SettingsSection>
        </div>
    )
}

