import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Tenant",
    content:
      "Rentify's AI matching system found me the perfect apartment in just two days. The secure payment system made me feel safe throughout the entire process.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Landlord",
    content:
      "As a property owner, Rentify has simplified my rental process. The verification system ensures I get reliable tenants, and the automatic payment system is a game-changer.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tenant",
    content:
      "I found a great roommate through Rentify's co-living recommendations. We have similar interests and lifestyles, making our shared living experience fantastic.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#2C3531] geometric-bg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text">What Our Users Say</h2>
            <p className="max-w-[900px] text-[#D1E8E2] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from tenants and landlords who have found success with Rentify.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 bg-[#2C3531]/60 backdrop-blur-lg glass-effect hover:glow transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-[#FFCB9A] fill-[#FFCB9A]" : "text-muted"}`}
                      />
                    ))}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-[#D1E8E2]">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-[#116466]"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{testimonial.name}</p>
                    <p className="text-xs text-[#D1E8E2]">{testimonial.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

