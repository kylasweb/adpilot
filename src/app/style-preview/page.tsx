'use client'

import React from 'react'
import { useEffect, useState } from 'react'

export default function Page() {
    const [vars, setVars] = useState({ primary: '', card: '', border: '' })

    useEffect(() => {
        const style = getComputedStyle(document.documentElement)
        setVars({
            primary: style.getPropertyValue('--primary'),
            card: style.getPropertyValue('--card'),
            border: style.getPropertyValue('--border')
        })
    }, [])

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Style Preview — Tokens & Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-adsilo-border bg-card">
                    <h2 className="font-semibold">Surface</h2>
                    <p className="text-adsilo-text-secondary">This is using `bg-card`, border, and `text-adsilo-text-secondary`.</p>
                </div>
                <div className="p-6 rounded-lg border border-adsilo-border bg-sidebar">
                    <h2 className="font-semibold">Sidebar</h2>
                    <p className="text-adsilo-text-secondary">This is using `bg-sidebar` + tokens.</p>
                </div>
                <div className="p-6 rounded-lg border border-adsilo-border bg-adsilo-primary text-white">
                    <h2 className="font-semibold">Primary</h2>
                    <p>bg-adsilo-primary</p>
                </div>
                <div className="p-6 rounded-lg border border-adsilo-border bg-adsilo-accent text-white">
                    <h2 className="font-semibold">Accent</h2>
                    <p>bg-adsilo-accent</p>
                </div>
            </div>

            <h2 className="text-xl mt-8 mb-4">CSS Vars</h2>
            <ul>
                <li>--primary: <span className="font-mono">{vars.primary}</span></li>
                <li>--card: <span className="font-mono">{vars.card}</span></li>
                <li>--border: <span className="font-mono">{vars.border}</span></li>
            </ul>
        </div>
    )
}
