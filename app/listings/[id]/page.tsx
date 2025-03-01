"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Building, Calendar, Check, ChevronLeft, Heart, MapPin, Maximize, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for property listings
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description:
      "This stunning downtown apartment offers modern amenities and a convenient location. Perfect for professionals or small families looking for urban living with all the comforts of home.",
    location: "123 Main St, New York, NY",
    price: 2500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    featured: true,
    aiMatch: 95,
    amenities: ["Parking", "Gym", "Pool", "Elevator", "Pets Allowed", "Dishwasher", "Air Conditioning", "Washer/Dryer"],
    availableDate: "2023-08-15",
    landlord: {
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john@example.com",
      responseRate: "98%",
      responseTime: "within a day",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    nearbyPlaces: [
      { name: "Central Park", distance: "0.5 miles" },
      { name: "Whole Foods Market", distance: "0.3 miles" },
      { name: "Downtown Station", distance: "0.2 miles" },
      { name: "City Hospital", distance: "1.2 miles" },
    ],
  },
  {
    id: 2,
    title: "Cozy Studio in Brooklyn",
    description:
      "A charming studio apartment in the heart of Brooklyn. This cozy space features modern finishes, plenty of natural light, and a functional layout perfect for city living.",
    location: "456 Park Ave, Brooklyn, NY",
    price: 1800,
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    featured: true,
    aiMatch: 88,
    amenities: ["Laundry", "Dishwasher", "Hardwood Floors", "Air Conditioning"],
    availableDate: "2023-07-01",
    landlord: {
      name: "Emily Johnson",
      phone: "(555) 987-6543",
      email: "emily@example.com",
      responseRate: "95%",
      responseTime: "within hours",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    nearbyPlaces: [
      { name: "Prospect Park", distance: "0.7 miles" },
      { name: "Brooklyn Market", distance: "0.2 miles" },
      { name: "Brooklyn Station", distance: "0.4 miles" },
    ],
  },
  {
    id: 3,
    title: "Luxury Condo with View",
    description:
      "Experience luxury living in this stunning condo with breathtaking views. This property features high-end finishes, spacious rooms, and resort-style amenities for the ultimate living experience.",
    location: "789 Ocean Dr, Miami, FL",
    price: 3200,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "condo",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    featured: true,
    aiMatch: 92,
    amenities: ["Parking", "Gym", "Pool", "Doorman", "Balcony", "Pets Allowed", "Ocean View", "Security"],
    availableDate: "2023-08-01",
    landlord: {
      name: "Michael Rodriguez",
      phone: "(555) 456-7890",
      email: "michael@example.com",
      responseRate: "99%",
      responseTime: "within hours",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    nearbyPlaces: [
      { name: "Miami Beach", distance: "0.1 miles" },
      { name: "Ocean Drive Shops", distance: "0.3 miles" },
      { name: "South Beach", distance: "1.5 miles" },
      { name: "Miami International Airport", distance: "10 miles" },
    ],
  },
]

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const propertyId = Number.parseInt(params.id)
  const property = properties.find((p) => p.id === propertyId)

  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#2C3531] text-white">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <p className="text-[#D1E8E2] mt-2">The property you're looking for doesn't exist or has been removed.</p>
        <Link href="/listings" className="mt-4">
          <Button className="bg-[#116466] text-white hover:bg-[#116466]/90 glow">Back to Listings</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#2C3531] text-white">
      <header className="sticky top-0 z-50 w-full border-b border-[#116466]/20 bg-[#2C3531]/95 backdrop-blur supports-[backdrop-filter]:bg-[#2C3531]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-[#116466] animate-pulse-glow" />
                <span className="text-xl font-heading font-bold text-glow">Rentify</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-[#116466] transition-colors">
              Home
            </Link>
            <Link href="/listings" className="text-sm font-medium hover:text-[#116466] transition-colors">
              Listings
            </Link>
            <Link href="/ai-match" className="text-sm font-medium hover:text-[#116466] transition-colors">
              AI Match
            </Link>
            <Link href="/roommates" className="text-sm font-medium hover:text-[#116466] transition-colors">
              Find Roommates
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white hover:text-[#116466] hover:bg-[#116466]/10">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[#116466] text-white hover:bg-[#116466]/90 glow">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6">
            <Link href="/listings" className="flex items-center text-[#D1E8E2] hover:text-[#116466] transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Listings
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="relative h-[400px] overflow-hidden rounded-xl">
                  <Image
                    src={property.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-4 right-4 rounded-full bg-[#2C3531]/80 ${
                    isFavorite ? "text-[#D9B08C]" : "text-white"
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 rounded-full bg-[#2C3531]/80 text-white"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-20 w-32 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                      selectedImageIndex === index ? "ring-2 ring-[#116466]" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} - image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h1 className="text-2xl font-bold md:text-3xl gradient-text">{property.title}</h1>
                <div className="flex items-center mt-2 text-[#D1E8E2]">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-4 py-4 border-y border-[#116466]/20">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-[#116466]" />
                  <div>
                    <p className="text-sm text-[#D1E8E2]">Bedrooms</p>
                    <p className="font-semibold">{property.beds}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-[#116466]" />
                  <div>
                    <p className="text-sm text-[#D1E8E2]">Bathrooms</p>
                    <p className="font-semibold">{property.baths}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Maximize className="h-5 w-5 mr-2 text-[#116466]" />
                  <div>
                    <p className="text-sm text-[#D1E8E2]">Square Feet</p>
                    <p className="font-semibold">{property.sqft}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#116466]" />
                  <div>
                    <p className="text-sm text-[#D1E8E2]">Available</p>
                    <p className="font-semibold">{new Date(property.availableDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-[#2C3531] border border-[#116466]">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-[#116466] data-[state=active]:text-white"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="amenities"
                    className="data-[state=active]:bg-[#116466] data-[state=active]:text-white"
                  >
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="data-[state=active]:bg-[#116466] data-[state=active]:text-white"
                  >
                    Location
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-[#D1E8E2]">{property.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="mt-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-[#116466]" />
                        <span className="text-[#D1E8E2]">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-4">
                  <div className="space-y-4">
                    <div className="h-[300px] rounded-lg bg-[#116466]/10 flex items-center justify-center">
                      <p className="text-[#D1E8E2]">Map view would be displayed here</p>
                    </div>
                    <h3 className="text-lg font-semibold text-[#FFCB9A]">Nearby Places</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.nearbyPlaces.map((place) => (
                        <div key={place.name} className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-[#116466]" />
                          <span className="text-[#D1E8E2]">
                            {place.name} <span className="text-sm opacity-70">({place.distance})</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="bg-[#2C3531] border-[#116466]/30 glass-effect">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-[#FFCB9A]">${property.price}</span>
                      <span className="text-[#D1E8E2]">per month</span>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-[#116466] text-white hover:bg-[#116466]/90 glow">
                        Schedule a Tour
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#116466] text-[#116466] hover:bg-[#116466]/10"
                      >
                        Contact Landlord
                      </Button>
                    </div>
                    <div className="pt-4 border-t border-[#116466]/20">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={property.landlord.image || "/placeholder.svg"}
                          alt={property.landlord.name}
                          width={50}
                          height={50}
                          className="rounded-full border border-[#116466]"
                        />
                        <div>
                          <p className="font-medium">{property.landlord.name}</p>
                          <p className="text-sm text-[#D1E8E2]">Response rate: {property.landlord.responseRate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2C3531] border-[#116466]/30 glass-effect">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#FFCB9A]">AI Match Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#D1E8E2]">Match Score</span>
                      <span className="text-xl font-bold text-[#116466]">{property.aiMatch}%</span>
                    </div>
                    <div className="w-full bg-[#116466]/20 rounded-full h-2.5">
                      <div className="bg-[#116466] h-2.5 rounded-full" style={{ width: `${property.aiMatch}%` }}></div>
                    </div>
                    <p className="text-sm text-[#D1E8E2]">
                      This property matches {property.aiMatch}% of your preferences based on location, amenities, and
                      price range.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-[#116466]/20 bg-[#2C3531] py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-[#116466]" />
            <span className="text-xl font-bold font-heading">Rentify</span>
          </div>
          <p className="text-center text-sm text-[#D1E8E2] md:text-left font-light">
            © {new Date().getFullYear()} Rentify. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-[#D1E8E2] hover:text-[#116466] transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-[#D1E8E2] hover:text-[#116466] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-[#D1E8E2] hover:text-[#116466] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

