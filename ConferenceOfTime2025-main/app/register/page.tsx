"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Globe, ArrowLeft, CheckCircle, AlertCircle, User, Building, MessageSquare, Mail } from "lucide-react"
import Link from "next/link"

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  position: string
  country: string
  phone: string
  dietaryRequirements: string
  newsletter: boolean
  terms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  terms?: string
  submit?: string
}

export default function RegisterPage() {
  const [language, setLanguage] = useState<"cs" | "en">("cs")
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    country: "",
    phone: "",
    dietaryRequirements: "",
    newsletter: false,
    terms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const content = {
    en: {
      title: "Conference Registration",
      subtitle: "Join us at Conference of Time 2025",
      backToHome: "Back to Home",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      professionalInfo: "Professional Information",
      company: "Company/Organization",
      position: "Position/Title",
      country: "Country",
      additionalInfo: "Additional Information",
      dietaryRequirements: "Dietary Requirements",
      dietaryPlaceholder: "Please specify any dietary restrictions or allergies...",
      newsletter: "Subscribe to our newsletter for updates",
      terms: "I agree to the terms and conditions",
      submitButton: "Register for Conference",
      submitting: "Submitting...",
      successTitle: "Registration Successful!",
      successMessage:
        "Thank you for registering for Conference of Time 2025. You will receive a confirmation email shortly.",
      backToProgram: "View Program",
      required: "Required",
      optional: "Optional",
      errors: {
        firstName: "First name is required",
        lastName: "Last name is required",
        email: "Please enter a valid email address",
        terms: "You must agree to the terms and conditions",
        emailExists: "This email is already registered",
        serverError: "Registration failed. Please try again.",
      },
    },
    cs: {
      title: "Registrace na konferenci",
      subtitle: "Připojte se k nám na konferenci času 2025",
      backToHome: "Zpět na hlavní stránku",
      personalInfo: "Osobní údaje",
      firstName: "Jméno",
      lastName: "Příjmení",
      email: "E-mailová adresa",
      phone: "Telefonní číslo",
      professionalInfo: "Profesní údaje",
      company: "Společnost/Organizace",
      position: "Pozice/Titul",
      country: "Země",
      additionalInfo: "Dodatečné informace",
      newsletter: "Přihlásit se k odběru novinek",
      terms: "Souhlasím s obchodními podmínkami",
      submitButton: "Registrovat se na konferenci",
      submitting: "Odesílání...",
      successTitle: "Registrace úspěšná!",
      successMessage: "Děkujeme za registraci na konferenci času 2025. Brzy obdržíte potvrzovací e-mail.",
      backToProgram: "Zobrazit program",
      required: "Povinné",
      optional: "Volitelné",
      errors: {
        firstName: "Jméno je povinné",
        lastName: "Příjmení je povinné",
        email: "Zadejte prosím platnou e-mailovou adresu",
        terms: "Musíte souhlasit s obchodními podmínkami",
        emailExists: "Tento e-mail je již registrován",
        serverError: "Registrace se nezdařila. Zkuste to prosím znovu.",
      },
    },
  }

  const t = content[language]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.errors.firstName
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t.errors.lastName
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errors.email
    }

    if (!formData.terms) {
      newErrors.terms = t.errors.terms
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: t.errors.emailExists });
        } else {
          setErrors({ submit: result.error || t.errors.serverError });
        }
        return;
      }

    
      setIsSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ submit: t.errors.serverError });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                  src="/logo.png"
                  alt="Conference of Time 2025 Logo"
                  className="h-6 w-6 object-contain"
              />              <span className="font-semibold text-primary">Conference of Time 2025</span>
            </div>
            <div className="flex space-x-2">
              <Button variant={language === "cs" ? "default" : "outline"} size="sm" onClick={() => setLanguage("cs")}>
                CS
              </Button>
              <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                EN
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-700">{t.successTitle}</CardTitle>
                <CardDescription className="text-lg">{t.successMessage}</CardDescription>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Mail className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      {language === "en"
                        ? "A confirmation email has been sent to your email address."
                        : "Potvrzovací e-mail byl odeslán na vaši e-mailovou adresu."}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/">{t.backToHome}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/program">{t.backToProgram}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
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

                    <section className ="relative bg-[url('/background.jpg')] bg-cover bg-center text-primary-foreground py-20 opacity-100">
                      <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
                        <p className="text-xl opacity-90">{t.subtitle}</p>
                      </div>
                    </section>

                    <section className="py-16">
                      <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto">
                          <form onSubmit={handleSubmit} className="space-y-8">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <User className="h-5 w-5" />
                                  {t.personalInfo}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="firstName">
                        {t.firstName} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {t.lastName} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t.email} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t.phone} <span className="text-muted-foreground">({t.optional})</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {t.professionalInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      {t.company} <span className="text-muted-foreground">({t.optional})</span>
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">
                      {t.position} <span className="text-muted-foreground">({t.optional})</span>
                    </Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      {t.country} <span className="text-muted-foreground">({t.optional})</span>
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === "en" ? "Select country" : "Vyberte zemi"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cz">Czech Republic / Česká republika</SelectItem>
                        <SelectItem value="sk">Slovakia / Slovensko</SelectItem>
                        <SelectItem value="de">Germany / Německo</SelectItem>
                        <SelectItem value="at">Austria / Rakousko</SelectItem>
                        <SelectItem value="pl">Poland / Polsko</SelectItem>
                        <SelectItem value="hu">Hungary / Maďarsko</SelectItem>
                        <SelectItem value="other">Other / Jiné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {t.additionalInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        {t.newsletter}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) => handleInputChange("terms", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        {t.terms} <span className="text-destructive">*</span>
                      </Label>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.terms}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {errors.submit && (
                <Card className="border-destructive">
                  <CardContent className="pt-6">
                    <p className="text-destructive flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.submit}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="text-center">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? t.submitting : t.submitButton}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

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
