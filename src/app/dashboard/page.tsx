"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Shield,
  ShieldAlert,
  Zap,
  Lock,
  Globe,
  Database,
  ChevronRight,
  Search,
  Bell,
  CheckCircle2,
  X,
  RefreshCcw,
  ZapOff,
  Terminal,
  ArrowRight
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { RecentLogs } from "@/components/dashboard/recent-logs"
import { cn } from "@/utils/cn"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    threats: 1284,
    uptime: 99.98,
    attacks: 42,
    risk: 12
  })
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(100)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [trafficData, setTrafficData] = useState([
    { name: "United States", value: 45 },
    { name: "European Union", value: 32 },
    { name: "South East Asia", value: 18 },
    { name: "Rest of World", value: 5 }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        threats: prev.threats + Math.floor(Math.random() * 3),
        risk: Math.max(8, Math.min(25, prev.risk + (Math.random() > 0.5 ? 0.05 : -0.05)))
      }))

      // Slightly fluctuate traffic
      setTrafficData(prev => prev.map(t => ({
        ...t,
        value: Math.max(2, Math.min(60, t.value + (Math.random() > 0.5 ? 1 : -1)))
      })))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleManualScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5
      if (progress >= 100) {
        progress = 100
        setScanProgress(100)
        setIsScanning(false)
        clearInterval(interval)
        // Update stats after scan
        setStats(prev => ({ ...prev, uptime: 99.99 }))
      } else {
        setScanProgress(progress)
      }
    }, 400)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              Security Overview
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Real-time threat intelligence and institutional security posture monitoring.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStatusModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl border border-border/40 bg-card/40 hover:bg-accent transition-all duration-300 shadow-lg group"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse group-hover:scale-125 transition-transform" />
              Intelligence Status: Optimal
            </button>
            <button
              onClick={handleManualScan}
              disabled={isScanning}
              className={cn(
                "hidden md:flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl shadow-xl transition-all duration-500",
                isScanning ? "bg-accent text-muted-foreground opacity-50 cursor-not-allowed" : "bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/20"
              )}
            >
              <RefreshCcw className={cn("w-4 h-4", isScanning && "animate-spin")} />
              {isScanning ? `Scanning Nodes ${scanProgress}%` : "Initiate Global Scan"}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            index={0}
            title="Total Threats Blocked"
            value={stats.threats}
            trend="+12% daily"
            status="up"
            icon={<ShieldAlert className="w-5 h-5 text-red-500" />}
            color="text-red-500"
            description="Institutional wide"
          />
          <StatCard
            index={1}
            title="System Uptime"
            value={stats.uptime}
            unit="%"
            trend="+0.02% 24h"
            status="up"
            icon={<Activity className="w-5 h-5 text-primary" />}
            color="text-primary"
            description="Across 128 global nodes"
          />
          <StatCard
            index={2}
            title="Active Attack Vectors"
            value={stats.attacks}
            trend="High Density"
            status="stable"
            icon={<Zap className="w-5 h-5 text-orange-500" />}
            color="text-orange-500"
            description="Verified perimeter pings"
          />
          <StatCard
            index={3}
            title="Institutional Risk"
            value={Number(stats.risk.toFixed(1))}
            unit="/100"
            trend="-0.5% 1hr"
            status="down"
            icon={<Lock className="w-5 h-5 text-cyan-400" />}
            color="text-cyan-400"
            description="Aggregated scoring"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <ChartCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-xl card-lift hover-glow shadow-xl relative overflow-hidden group">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 group-hover:text-primary transition-colors">
                  <Globe className="w-5 h-5 text-primary" />
                  Global Traffic Origin
                </h3>
                <div className="space-y-6">
                  {trafficData.map((t) => (
                    <CountryTraffic key={t.name} name={t.name} value={t.value} />
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
              </div>
              <div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/20 backdrop-blur-xl card-lift hover-glow shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3 group-hover:text-primary transition-colors self-start">
                  <Database className="w-5 h-5 text-primary" />
                  Data Integrity Scan
                </h3>
                <div className="flex flex-col items-center justify-center py-10 h-full w-full">
                  <div className="relative">
                    <div className={cn(
                      "w-32 h-32 rounded-[2.5rem] border-[8px] border-primary/10 transition-all duration-500",
                      isScanning || scanProgress < 100 ? "border-t-primary animate-spin" : "border-primary"
                    )} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={isScanning ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {scanProgress < 100 ? (
                          <span className="text-xs font-black text-primary">{scanProgress}%</span>
                        ) : (
                          <Lock className="w-10 h-10 text-primary opacity-40" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                  <span className="mt-8 text-[11px] font-black uppercase tracking-[0.3em] text-primary">
                    {isScanning ? "Deep-Packet Inspection..." : scanProgress < 100 ? "Validating Hashes..." : "All Systems Verified"}
                  </span>
                  <button
                    onClick={handleManualScan}
                    disabled={isScanning}
                    className="mt-4 px-4 py-2 text-[8px] font-black uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {isScanning ? "Verification in Progress" : "Run Verification Protocol"}
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 h-full">
            <RecentLogs />
          </div>
        </div>
      </div>

      {/* Status Overview Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card w-full max-w-2xl rounded-[40px] border border-border/40 p-12 relative overflow-hidden shadow-3xl shadow-primary/5"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[2rem] bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">System Intelligence</h2>
                  <p className="text-[10px] font-black text-primary tracking-widest uppercase opacity-60">Status ID: CS-INST-88219</p>
                </div>
              </div>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="p-4 rounded-2xl bg-accent/20 hover:bg-accent transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <StatusDetail icon={<Shield className="w-4 h-4" />} label="Perimeter Defense" status="Active" color="text-green-500" />
              <StatusDetail icon={<Zap className="w-4 h-4" />} label="Threat Response" status="Automated" color="text-primary" />
              <StatusDetail icon={<Globe className="w-4 h-4" />} label="Node Propagation" status="Stable" color="text-green-500" />
              <StatusDetail icon={<Database className="w-4 h-4" />} label="Ledger Integrity" status="Verified" color="text-primary" />
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Institutional Core Health</span>
                <span className="text-sm font-black text-primary">99.992%</span>
              </div>
              <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden border border-primary/20 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "99.992%" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="w-full h-16 mt-8 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              Continue Monitoring Protocol
            </button>

            {/* Decorator */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  )
}

function StatusDetail({ icon, label, status, color }: any) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-accent/5 border border-border/20 group hover:border-border/60 transition-all">
      <div className="p-3 rounded-xl bg-accent/10 text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className={cn("text-xs font-black uppercase tracking-tighter", color)}>{status}</span>
      </div>
    </div>
  )
}

function CountryTraffic({ name, value }: { name: string, value: number }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.1em]">
        <span className="opacity-60">{name}</span>
        <span className="text-primary">{value}%</span>
      </div>
      <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-full bg-primary rounded-full relative shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
      </div>
    </div>
  )
}
