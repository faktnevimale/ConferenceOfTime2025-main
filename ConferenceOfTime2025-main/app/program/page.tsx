"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, User, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Session {
  id: string
  title: string
  titleCs: string
  speaker: string
  time: string
  duration: string
  room: string
  type: "keynote" | "workshop" | "panel" | "presentation"
  description: string
  descriptionCs: string
}

const programData: Record<string, Session[]> = {
  day1: [
    {
      id: "1",
      title: "Opening Keynote: A World Without Watches",
      titleCs: "Úvodní přednáška: Svět bez hodinek",
      speaker: "Dr. Alice Novak",
      time: "09:00",
      duration: "60 min",
      room: "Main Hall",
      type: "keynote",
      description: "Exploring how society and daily life would change if timekeeping devices never existed.",
      descriptionCs: "Zkoumání, jak by se společnost a každodenní život změnily, kdyby neexistovaly hodinky.",
    },
    {
      id: "2",
      title: "Temporal Perception Workshop",
      titleCs: "Workshop: Vnímání času",
      speaker: "Prof. Jan Svoboda",
      time: "10:30",
      duration: "90 min",
      room: "Room A",
      type: "workshop",
      description: "Hands-on activities to understand human perception of time without clocks.",
      descriptionCs: "Praktické aktivity pro pochopení lidského vnímání času bez hodin.",
    },
    {
      id: "3",
      title: "Panel: Historical Timekeeping",
      titleCs: "Panel: Historické způsoby měření času",
      speaker: "Multiple Speakers",
      time: "14:00",
      duration: "75 min",
      room: "Main Hall",
      type: "panel",
      description: "Discussion about ancient and modern methods of tracking time.",
      descriptionCs: "Diskuse o starověkých a moderních způsobech měření času.",
    },
  ],
  day2: [
    {
      id: "4",
      title: "Time in Culture",
      titleCs: "Čas v kultuře",
      speaker: "Dr. Petra Novak",
      time: "09:00",
      duration: "60 min",
      room: "Main Hall",
      type: "keynote",
      description: "How different societies understand and value time.",
      descriptionCs: "Jak různé společnosti chápou a oceňují čas.",
    },
    {
      id: "5",
      title: "Psychology of Waiting",
      titleCs: "Psychologie čekání",
      speaker: "Dr. Tomas Kral",
      time: "10:30",
      duration: "45 min",
      room: "Room B",
      type: "presentation",
      description: "Examining human patience and time perception in daily life.",
      descriptionCs: "Zkoumání lidské trpělivosti a vnímání času v každodenním životě.",
    },
    {
      id: "6",
      title: "Workshop: Natural Time Indicators",
      titleCs: "Workshop: Přirozené indikátory času",
      speaker: "Lucie Havel",
      time: "14:00",
      duration: "90 min",
      room: "Room A",
      type: "workshop",
      description: "Using the sun, stars, and natural events to track time.",
      descriptionCs: "Používání slunce, hvězd a přírodních událostí k měření času.",
    },
  ],
  day3: [
    {
      id: "7",
      title: "Future of Timekeeping",
      titleCs: "Budoucnost měření času",
      speaker: "Dr. Eva Novak",
      time: "09:00",
      duration: "60 min",
      room: "Main Hall",
      type: "keynote",
      description: "Exploring innovative concepts for measuring and experiencing time.",
      descriptionCs: "Zkoumání inovativních konceptů měření a prožívání času.",
    },
    {
      id: "8",
      title: "Closing Panel: Imagining a Timeless World",
      titleCs: "Závěrečný panel: Představujeme si svět bez času",
      speaker: "Industry Leaders",
      time: "14:00",
      duration: "90 min",
      room: "Main Hall",
      type: "panel",
      description: "Reflections on living without conventional timekeeping.",
      descriptionCs: "Úvahy o životě bez tradičního měření času.",
    },
  ],
}

export default function ProgramPage() {
  const [language, setLanguage] = useState<"cs" | "en">("cs")
  const [activeDay, setActiveDay] = useState("day1")

  const content = {
    en: {
      title: "Conference Program",
      subtitle: "Three days exploring time and society",
      day1: "Day 1 - September 20",
      day2: "Day 2 - September 21",
      day3: "Day 3 - September 22",
      backToHome: "Back to Home",
      speaker: "Speaker",
      room: "Room",
      duration: "Duration",
    },
    cs: {
      title: "Program konference",
      subtitle: "Tři dny zkoumání času a společnosti",
      day1: "Den 1 - 20. září",
      day2: "Den 2 - 21. září",
      day3: "Den 3 - 22. září",
      backToHome: "Zpět na hlavní stránku",
      speaker: "Řečník",
      room: "Místnost",
      duration: "Délka",
    },
  }

  const t = content[language]

  const getTypeColor = (type: Session["type"]) => {
    switch (type) {
      case "keynote":
        return "bg-primary text-primary-foreground"
      case "workshop":
        return "bg-secondary text-secondary-foreground"
      case "panel":
        return "bg-accent text-accent-foreground"
      case "presentation":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeLabel = (type: Session["type"]) => {
    const labels = {
      en: {
        keynote: "Keynote",
        workshop: "Workshop",
        panel: "Panel",
        presentation: "Presentation",
      },
      cs: {
        keynote: "Hlavní přednáška",
        workshop: "Workshop",
        panel: "Panel",
        presentation: "Prezentace",
      },
    }
    return labels[language][type]
  }

  return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/40">
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
                <Link href="/" className="text-accent font-medium">
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

        {/* Hero Section */}
        <section className ="relative bg-[url('/background.jpg')] bg-cover bg-center text-primary-foreground py-20 opacity-100">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </section>

        {/* Program Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="day1">{t.day1}</TabsTrigger>
                <TabsTrigger value="day2">{t.day2}</TabsTrigger>
                <TabsTrigger value="day3">{t.day3}</TabsTrigger>
              </TabsList>

              {Object.entries(programData).map(([day, sessions]) => (
                  <TabsContent key={day} value={day} className="space-y-6">
                    <div className="grid gap-6">
                      {sessions.map((session) => (
                          <Card key={session.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Badge className={getTypeColor(session.type)}>{getTypeLabel(session.type)}</Badge>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Clock className="h-4 w-4" />
                                      <span className="text-sm">{session.time}</span>
                                    </div>
                                  </div>
                                  <CardTitle className="text-xl mb-2">
                                    {language === "en" ? session.title : session.titleCs}
                                  </CardTitle>
                                  <CardDescription>
                                    {language === "en" ? session.description : session.descriptionCs}
                                  </CardDescription>
                                </div>
                                <div className="flex flex-col gap-2 text-sm text-muted-foreground md:text-right">
                                  <div className="flex items-center gap-1 md:justify-end">
                                    <User className="h-4 w-4" />
                                    <span>{session.speaker}</span>
                                  </div>
                                  <div className="flex items-center gap-1 md:justify-end">
                                    <MapPin className="h-4 w-4" />
                                    <span>{session.room}</span>
                                  </div>
                                  <div className="flex items-center gap-1 md:justify-end">
                                    <Clock className="h-4 w-4" />
                                    <span>{session.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                      ))}
                    </div>
                  </TabsContent>
              ))}
            </Tabs>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>{language === "en" ? "Ready to Join Us?" : "Připraveni se k nám připojit?"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                        ? "Register now to secure your spot at Conference of Time 2025"
                        : "Registrujte se nyní a zajistěte si místo na Konferenci času 2025"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link href="/register">{language === "en" ? "Register Now" : "Registrovat se"}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; 2025 Conference of Time. {language === "en" ? "All rights reserved." : "Všechna práva vyhrazena."}
            </p>
          </div>
        </footer>
      </div>
  )
}