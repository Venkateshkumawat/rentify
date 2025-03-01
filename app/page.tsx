"use client"

import { Building, Search, Shield, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FeaturedListings from "@/components/featured-listings"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import ParticlesBackground from "@/components/particles-background"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { StaggerIn, StaggerItem } from "@/components/animations/stagger-in"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b border-secondary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-primary animate-pulse-glow" />
                <span className="text-xl font-heading font-bold text-glow">Rentify</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/listings" className="text-sm font-medium hover:text-primary transition-colors">
              Listings
            </Link>
            <Link href="/ai-match" className="text-sm font-medium hover:text-primary transition-colors">
              AI Match
            </Link>
            <Link href="/roommates" className="text-sm font-medium hover:text-primary transition-colors">
              Find Roommates
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary text-white hover:bg-primary/90 glow">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <ParticlesBackground />
          <div className="absolute inset-0 hero-pattern"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div style={{ opacity, scale }} className="flex flex-col justify-center space-y-4">
                <FadeIn>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-glow font-heading">
                      Find Your Perfect Home with <span className="gradient-text">AI</span>
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl font-light">
                      Rentify uses AI to match you with the perfect rental property based on your preferences, budget,
                      and location trends.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/listings">
                      <Button size="lg" className="button-gradient text-white">
                        Browse Listings
                      </Button>
                    </Link>
                    <Link href="/ai-match">
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        AI Match Me
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              </motion.div>
              <ScaleIn delay={0.4}>
                <div className="flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full aspect-square rounded-xl bg-gradient-soft p-1"
                  >
                    <div className="relative h-full w-full rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
                        alt="Modern apartment building"
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-center justify-center"
                      >
                        <Building className="w-24 h-24 text-primary glow" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm border border-primary/30">
                    Why Choose Rentify
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">
                    Smart Rental Solutions
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our AI-powered platform makes finding and managing rentals easier than ever before.
                  </p>
                </div>
              </div>
            </FadeIn>
            <StaggerIn className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  icon: Search,
                  title: "AI Matching",
                  description: "Our AI analyzes your preferences and budget to find the perfect rental match.",
                },
                {
                  icon: Shield,
                  title: "Secure Payments",
                  description: "Smart contracts and blockchain technology ensure secure and transparent transactions.",
                },
                {
                  icon: Users,
                  title: "Roommate Matching",
                  description: "Find compatible roommates based on lifestyle, interests, and personality traits.",
                },
              ].map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                    <Card className="bg-background border-primary/30 card-hover">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-accent">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerIn>
          </div>
        </section>

        <FeaturedListings />
        <HowItWorks />
        <Testimonials />
      </main>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full border-t border-secondary/20 bg-background py-6"
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-heading">Rentify</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left font-light">
            © {new Date().getFullYear()} Rentify. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

