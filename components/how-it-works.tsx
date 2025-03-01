import { ArrowRight, Building, CreditCard, Search, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background geometric-bg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">How Rentify Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered platform makes finding and renting properties simple and secure.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#116466]/10 border border-[#116466] glow">
              <Search className="h-8 w-8 text-[#116466]" />
            </div>
            <h3 className="text-xl font-bold text-[#FFCB9A]">1. Search & Match</h3>
            <p className="text-muted-foreground">
              Browse listings or let our AI match you with properties based on your preferences and budget.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#116466]/10 border border-[#116466] glow">
              <Building className="h-8 w-8 text-[#116466]" />
            </div>
            <h3 className="text-xl font-bold text-[#FFCB9A]">2. Verify & Tour</h3>
            <p className="text-muted-foreground">
              All listings are verified. Schedule virtual or in-person tours directly through the platform.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#116466]/10 border border-[#116466] glow">
              <Shield className="h-8 w-8 text-[#116466]" />
            </div>
            <h3 className="text-xl font-bold text-[#FFCB9A]">3. Secure & Move In</h3>
            <p className="text-muted-foreground">
              Complete the rental agreement and payments securely through our blockchain-backed system.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold gradient-text">Additional Features</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#116466]/10 border border-[#116466] glow">
                <Users className="h-6 w-6 text-[#116466]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#D9B08C]">Roommate Matching</h4>
                <p className="text-muted-foreground">
                  Our AI analyzes personality traits and lifestyle preferences to find compatible roommates.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#116466]/10 border border-[#116466] glow">
                <CreditCard className="h-6 w-6 text-[#116466]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#D9B08C]">Split Payments</h4>
                <p className="text-muted-foreground">
                  Easily manage rent payments with roommates through our automated payment system.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/ai-match">
            <Button size="lg" className="bg-[#116466] text-white hover:bg-[#116466]/90 glow gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

