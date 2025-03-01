"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Heart, MapPin, Maximize } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Real estate images from public sources
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "123 Main St, New York, NY",
    price: 2500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    featured: true,
    aiMatch: 95,
  },
  {
    id: 2,
    title: "Cozy Studio in Brooklyn",
    location: "456 Park Ave, Brooklyn, NY",
    price: 1800,
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    featured: true,
    aiMatch: 88,
  },
  {
    id: 3,
    title: "Luxury Condo with View",
    location: "789 Ocean Dr, Miami, FL",
    price: 3200,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "condo",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    featured: true,
    aiMatch: 92,
  },
  {
    id: 4,
    title: "Charming Townhouse",
    location: "101 Oak St, Boston, MA",
    price: 2800,
    beds: 3,
    baths: 2.5,
    sqft: 1600,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    featured: true,
    aiMatch: 85,
  },
  {
    id: 5,
    title: "Spacious Family Home",
    location: "202 Maple Ave, Chicago, IL",
    price: 3500,
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    featured: false,
    aiMatch: 78,
  },
  {
    id: 6,
    title: "Urban Loft Space",
    location: "303 Loft Ln, San Francisco, CA",
    price: 2900,
    beds: 1,
    baths: 1,
    sqft: 950,
    type: "loft",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    featured: false,
    aiMatch: 90,
  },
]

export default function FeaturedListings() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#2C3531] geometric-bg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white gradient-text">
              Featured Properties
            </h2>
            <p className="max-w-[900px] text-[#D1E8E2] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our handpicked selection of premium rental properties.
            </p>
          </div>
        </div>
        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mt-8">
          <TabsList className="grid w-full grid-cols-4 bg-[#2C3531] border border-[#116466]">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#116466] data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="apartment" className="data-[state=active]:bg-[#116466] data-[state=active]:text-white">
              Apartments
            </TabsTrigger>
            <TabsTrigger value="house" className="data-[state=active]:bg-[#116466] data-[state=active]:text-white">
              Houses
            </TabsTrigger>
            <TabsTrigger value="ai-match" className="data-[state=active]:bg-[#116466] data-[state=active]:text-white">
              AI Matches
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((p) => p.featured)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="apartment" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((p) => p.type === "apartment")
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="house" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((p) => p.type === "house")
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="ai-match" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .sort((a, b) => b.aiMatch - a.aiMatch)
                .slice(0, 3)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onFavoriteToggle={toggleFavorite}
                    showAiMatch={true}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-center mt-10">
          <Link href="/listings">
            <Button size="lg" className="bg-[#116466] text-white hover:bg-[#116466]/90 glow">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface PropertyCardProps {
  property: (typeof properties)[0]
  isFavorite: boolean
  onFavoriteToggle: (id: number) => void
  showAiMatch?: boolean
}

function PropertyCard({ property, isFavorite, onFavoriteToggle, showAiMatch = false }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden bg-[#2C3531] border-[#116466]/20 glass-effect hover:glow transition-all duration-300">
      <div className="relative">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-[#2C3531]/80 ${
            isFavorite ? "text-[#D9B08C]" : "text-white"
          }`}
          onClick={() => onFavoriteToggle(property.id)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        {showAiMatch && (
          <Badge className="absolute top-2 left-2 bg-[#116466] text-white">{property.aiMatch}% Match</Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-white">{property.title}</CardTitle>
          <span className="font-bold text-lg text-[#FFCB9A]">${property.price}/mo</span>
        </div>
        <div className="flex items-center text-sm text-[#D1E8E2]">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between text-[#D1E8E2]">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.beds} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.baths} Baths</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.sqft} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/listings/${property.id}`} className="w-full">
          <Button variant="outline" className="w-full border-[#116466] text-[#116466] hover:bg-[#116466]/10">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

