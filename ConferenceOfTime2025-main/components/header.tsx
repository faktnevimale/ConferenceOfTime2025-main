import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, User, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
    language: "en" | "cs";
    setLanguage: (language: "en" | "cs") => void;
}

export default function Header({ language, setLanguage }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/40">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img
                        src="/logo.png"
                        alt="Conference of Time 2025 Logo"
                        className="h-6 w-6 object-contain"
                    />
                    <span className="font-semibold text-primary">Conference of Time 2025</span>
                </div>
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/public" className="text-accent font-medium">
                            {language === "en" ? "Home" : "Domů"}
                        </Link>
                        <Link href="/program" className="text-foreground hover:text-accent">
                            {language === "en" ? "Program" : "Program"}
                        </Link>
                        <Link href="/venue" className="text-foreground hover:text-accent">
                            {language === "en" ? "Venue" : "Místo konání"}
                        </Link>
                        <Link href="/register" className="text-foreground hover:text-accent">
                            {language === "en" ? "Register" : "Registrace"}
                        </Link>
                    </nav>
                    <div className="flex space-x-2">
                        <Button variant={language === "cs" ? "default" : "outline"} size="sm" onClick={() => setLanguage("cs")}>
                            CS
                        </Button>
                        <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                            EN
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}