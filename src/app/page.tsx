"use client"

import React from "react"
import { LandingNavbar } from "@/components/landing/navbar"
import { LandingHero } from "@/components/landing/hero"
import { TrustBar } from "@/components/landing/trust-bar"
import { FeatureGrid } from "@/components/landing/features"
import { RiskSection } from "@/components/landing/risk-section"
import { LandingCTA } from "@/components/landing/cta"
import { LandingFooter } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B1C2D]">
      <LandingNavbar />
      <LandingHero />
      <TrustBar />
      <FeatureGrid />
      <RiskSection />
      <LandingCTA />
      <LandingFooter />
    </main>
  )
}
