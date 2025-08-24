"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Globe, Clock, Mail } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [language, setLanguage] = useState<"cs" | "en">("cs")

  const content = {
    en: {
      title: "Conference of Time 2025",
      subtitle: "What Would the World Look Like Without Watches?",
      date: "September 20-22, 2025",
      location: "Jihočeské muzeum, České Budějovice, Czech Republic",
      description:
          "Join leading thinkers, researchers, and creators for three days of discussions, lectures, and workshops exploring how humanity, culture, and science might have developed without the invention of timekeeping.",
      registerButton: "Register Now",
      learnMore: "Learn More",
      aboutTitle: "About the Conference",
      aboutText:
          "The Conference of Time brings together scientists, philosophers, and artists to explore the essence of time. Through lectures, panels, and interactive sessions, we will examine one of humanity’s most fundamental questions.",
      keynotesTitle: "Keynote Speakers",
      programTitle: "Conference Program",
      programText:
          "Discover a rich program full of keynote lectures, panel discussions, and interactive sessions for all participants.",
      viewProgram: "View Full Program",
      venueTitle: "Conference Venue",
      venueText: "The conference takes place in unique spaces in muzeum of České Budějovice.",
      viewVenue: "View Venue Details",
      contactTitle: "Contact Information",
      contactEmail: "conferenceoftime@gmail.com",
      contactPhone: "+420 759 897 156",
    },
    cs: {
      title: "Konference času 2025",
      subtitle: "Jak by vypadal svět bez hodinek?",
      date: "20.–22. září 2025",
      location: "Jihočeské muzeum, České Budějovice",
      description:
          "Připojte se k předním myslitelům, badatelům a tvůrcům na tři dny přednášek, diskusí a workshopů, které zkoumají, jak by se lidstvo, kultura a věda vyvíjely bez vynálezu měření času.",
      registerButton: "Registrovat se",
      learnMore: "Zjistit více",
      aboutTitle: "O konferenci",
      aboutText:
          "Konference času spojuje vědce, filozofy a umělce, aby společně zkoumali podstatu času. Prostřednictvím přednášek, panelových diskusí a interaktivních setkání se budeme zabývat jednou z nejzásadnějších otázek lidstva.",
      keynotesTitle: "Hlavní řečníci",
      programTitle: "Program konference",
      programText:
          "Objevte pestrý program plný hlavních přednášek, panelových diskusí a interaktivních aktivit pro všechny účastníky.",
      viewProgram: "Zobrazit celý program",
      venueTitle: "Místo konání",
      venueText: "Letošní konference se odehrává v jedinečných prostorách muzea v Českých Budějovicích.",
      viewVenue: "Zobrazit detaily místa",
      contactTitle: "Kontaktní informace",
      contactEmail: "conferenceoftime@gmail.com",
      contactPhone: "+420 759 897 156",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Language Toggle */}
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
          <Badge className="mb-4 bg-secondary text-secondary-foreground">
            {language === "en" ? "International Conference" : "Mezinárodní konference"}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{t.subtitle}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{t.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{t.location}</span>
            </div>
          </div>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">{t.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link href="/register">{t.registerButton}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/venue">{t.learnMore}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">{t.aboutTitle}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t.aboutText}</p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                  <CardTitle className="text-center">500+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{language === "en" ? "Attendees" : "Účastníků"}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                  <CardTitle className="text-center">50+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{language === "en" ? "Sessions" : "Přednášek"}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-accent mx-auto mb-2" />
                  <CardTitle className="text-center">5+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{language === "en" ? "Countries" : "Zemí"}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Program Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">{t.programTitle}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t.programText}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/program">{t.viewProgram}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">{t.venueTitle}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t.venueText}</p>
            <div className="mb-8">
              <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8557.101062135247!2d14.477160681558596!3d48.98037712773672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47734fcf547575fb%3A0x794b6ea9b9d62f7d!2zSmlob8SNZXNrw6kgbXV6ZXVtIHYgxIxlc2vDvWNoIEJ1ZMSbam92aWPDrWNo!5e0!3m2!1scs!2scz!4v1755885764484!5m2!1scs!2scz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/venue">{t.viewVenue}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-card-foreground">{t.contactTitle}</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent" />
                <a href={`mailto:${t.contactEmail}`} className="text-accent hover:underline">
                  {t.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{t.contactPhone}</span>
              </div>
            </div>
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
