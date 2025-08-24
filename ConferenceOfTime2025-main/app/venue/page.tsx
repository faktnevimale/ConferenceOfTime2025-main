"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ArrowLeft, MapPin, Clock, Phone, Mail, Car, Train, Plane, Wifi, Coffee, Utensils } from "lucide-react"
import Link from "next/link"

export default function VenuePage() {
  const [language, setLanguage] = useState<"cs" | "en">("cs")
  const content = {
    en: {
      title: "Venue & Location",
      subtitle: "Everything will happen here",
      backToHome: "Back to Home",
      venueInfo: "Venue Information",
      venueName: "Jihočeské muzeum v Českých Budějovicích",
      venueAddress: "Dukelská 1, 370 01 České Budějovice 1, Czech Republic",
      facilities: "Facilities & Amenities",
      facilityWifi: "High-speed WiFi throughout",
      facilityCoffee: "Coffee stations and refreshments",
      facilityDining: "On-site dining options",
      facilityParking: "Parking available",
      gettingThere: "Getting There",
      byPlane: "By Plane",
      planeText: "České Budějovice Airport (JCL) – approx. 15 minutes by taxi to the museum, or Václav Havel Airport Prague (PRG) – about 2.5 hours by car or train",
      byTrain: "By Train",
      trainText: "České Budějovice Main Station – approx. 10 minutes on foot or a short ride by public transport to the museum",
      byCar: "By Car",
      carText: "Museum accessible via D3 highway, parking available on-site",
      publicTransport: "Public Transport",
      transportText: "MHD bus stop 'Jihočeské muzeum' right at the entrance, lines 3, 5, 7",
      contact: "Contact Information",
      phone: "+420 759 897 156",
      email: "conferenceoftime@gmail.com",
      mapTitle: "Interactive Map",
      mapDescription: "Find us at Jihočeské muzeum, České Budějovice",
    },
    cs: {
      title: "Místo konání",
      subtitle: "Zde se vše bude odehrávat",
      backToHome: "Zpět na hlavní stránku",
      venueInfo: "Informace o místě konání",
      venueName: "Jihočeské muzeum v Českých Budějovicích",
      venueAddress: "Dukelská 1, 370 01 České Budějovice 1, Česká republika",
      facilities: "Vybavení a služby",
      facilityWifi: "Vysokorychlostní WiFi v celém objektu",
      facilityCoffee: "Káva a občerstvení",
      facilityParking: "Dostupné parkování",
      gettingThere: "Jak se na místo dostat",
      byTrain: "Vlakem",
      trainText: "České Budějovice hlavní nádraží – cca 10 minut pěšky nebo krátkou jízdou MHD do muzea",
      byCar: "Autem",
      carText: "Muzeum je dostupné z dálnice D3, parkování přímo u muzea",
      publicTransport: "Veřejná doprava",
      transportText: "Zastávka MHD „Jihočeské muzeum“ přímo u vchodu, linky MHD č. 3, 5, 7",
      contact: "Kontaktní informace",
      phone: "+420 759 897 156",
      email: "conferenceoftime@gmail.com",
      mapTitle: "Interaktivní mapa",
      mapDescription: "Najděte nás v Jihočeském muzeu v Českých Budějovicích",
    },
  }

  const t = content[language]

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

      {/* Venue Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Venue Details */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {t.venueInfo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t.venueName}</h3>
                      <p className="text-muted-foreground">{t.venueAddress}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{language === "en" ? "September 20-22, 2025" : "20.–22. září 2025"}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.facilities}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-accent" />
                        <span className="text-sm">{t.facilityWifi}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coffee className="h-4 w-4 text-accent" />
                        <span className="text-sm">{t.facilityCoffee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-accent" />
                        <span className="text-sm">{t.facilityParking}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.gettingThere}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Train className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t.byTrain}</h4>
                          <p className="text-sm text-muted-foreground">{t.trainText}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Car className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t.byCar}</h4>
                          <p className="text-sm text-muted-foreground">{t.carText}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">{t.publicTransport}</h4>
                      <p className="text-sm text-muted-foreground">{t.transportText}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.contact}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent" />
                      <a href={`tel:${t.phone}`} className="text-accent hover:underline">
                        {t.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      <a href={`mailto:${t.email}`} className="text-accent hover:underline">
                        {t.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interactive Map */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.mapTitle}</CardTitle>
                    <CardDescription>{t.mapDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square w-full rounded-lg overflow-hidden border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12103.22641473123!2d14.464615714409197!3d48.973548059914975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47734fcf547575fb%3A0x794b6ea9b9d62f7d!2zSmlob8SNZXNrw6kgbXV6ZXVtIHYgxIxlc2vDvWNoIEJ1ZMSbam92aWPDrWNo!5e0!3m2!1scs!2scz!4v1755889384390!5m2!1scs!2scz"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={t.mapTitle}
                      />
                    </div>
                  </CardContent>
                </Card>


                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Quick Actions" : "Rychlé akce"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/register">{language === "en" ? "Register Now" : "Registrovat se"}</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/program">{language === "en" ? "View Program" : "Zobrazit program"}</Link>
                    </Button>
                  </CardContent>
                </Card>
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
