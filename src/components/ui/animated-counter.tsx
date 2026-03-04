"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring, useInView } from "framer-motion"

export function AnimatedCounter({ value, direction = "up" }: { value: number, direction?: "up" | "down" }) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(direction === "down" ? value : 0)
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [motionValue, value, isInView])

    useEffect(() => {
        const isDecimal = value % 1 !== 0
        const decimals = isDecimal ? 1 : 0

        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US", {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                }).format(Number(latest.toFixed(decimals)))
            }
        })
    }, [springValue, value])

    return <span ref={ref} />
}
