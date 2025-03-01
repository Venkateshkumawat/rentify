"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Building, Heart, MapPin, Maximize, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for property listings
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
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    aiMatch: 95,
    amenities: ["Parking", "Gym", "Pool", "Elevator", "Pets Allowed"],
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
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    aiMatch: 88,
    amenities: ["Laundry", "Dishwasher", "Hardwood Floors"],
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
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    aiMatch: 92,
    amenities: ["Parking", "Gym", "Pool", "Doorman", "Balcony", "Pets Allowed"],
  },
]

export default function AiMatchPage() {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState({
    location: "",
    budget: [1500, 3000],
    beds: "",
    baths: "",
    propertyType: "",
    amenities: [] as string[],
    lifestyle: "",
    moveInDate: "",
    commute: "",
  })
  const [showResults, setShowResults] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences({ ...preferences, [key]: value })
  }

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const resetForm = () => {
    setStep(1)
    setShowResults(false)
    setPreferences({
      location: "",
      budget: [1500, 3000],
      beds: "",
      baths: "",
      propertyType: "",
      amenities: [],
      lifestyle: "",
      moveInDate: "",
      commute: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Rentify</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/listings" className="text-sm font-medium">
              Listings
            </Link>
            <Link href="/ai-match" className="text-sm font-medium">
              AI Match
            </Link>
            <Link href="/roommates" className="text-sm font-medium">
              Find Roommates
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          {!showResults ? (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">AI Matching System</h1>
                <p className="text-muted-foreground mt-2">
                  Tell us about your preferences and our AI will find your perfect rental match
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className={`h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      2
                    </div>
                    <div className={`h-1 w-16 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      3
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Step {step} of 3</div>
                </div>

                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Where are you looking to rent?</Label>
                        <Input
                          id="location"
                          placeholder="City, neighborhood, or zip code"
                          value={preferences.location}
                          onChange={(e) => handlePreferenceChange("location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Budget Range (per month)</Label>
                        <div className="flex items-center justify-between">
                          <span>${preferences.budget[0]}</span>
                          <span>${preferences.budget[1]}</span>
                        </div>
                        <Slider
                          defaultValue={preferences.budget}
                          max={5000}
                          step={100}
                          onValueChange={(value) => handlePreferenceChange("budget", value)}
                          className="my-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="beds">Bedrooms</Label>
                          <Select
                            value={preferences.beds}
                            onValueChange={(value) => handlePreferenceChange("beds", value)}
                          >
                            <SelectTrigger id="beds">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="studio">Studio</SelectItem>
                              <SelectItem value="1">1 Bedroom</SelectItem>
                              <SelectItem value="2">2 Bedrooms</SelectItem>
                              <SelectItem value="3">3 Bedrooms</SelectItem>
                              <SelectItem value="4+">4+ Bedrooms</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="baths">Bathrooms</Label>
                          <Select
                            value={preferences.baths}
                            onValueChange={(value) => handlePreferenceChange("baths", value)}
                          >
                            <SelectTrigger id="baths">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Bathroom</SelectItem>
                              <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                              <SelectItem value="2">2 Bathrooms</SelectItem>
                              <SelectItem value="2.5+">2.5+ Bathrooms</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => setStep(2)}>
                        Next Step
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="property-type">Property Type</Label>
                        <Select
                          value={preferences.propertyType}
                          onValueChange={(value) => handlePreferenceChange("propertyType", value)}
                        >
                          <SelectTrigger id="property-type">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="loft">Loft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Must-Have Amenities (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Parking",
                            "In-unit Laundry",
                            "Dishwasher",
                            "Air Conditioning",
                            "Gym",
                            "Pool",
                            "Pets Allowed",
                            "Balcony",
                          ].map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`amenity-${amenity}`}
                                className="h-4 w-4 rounded border-gray-300"
                                checked={preferences.amenities.includes(amenity)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handlePreferenceChange("amenities", [...preferences.amenities, amenity])
                                  } else {
                                    handlePreferenceChange(
                                      "amenities",
                                      preferences.amenities.filter((a) => a !== amenity),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`amenity-${amenity}`} className="text-sm">
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="move-in-date">Desired Move-in Date</Label>
                        <Input
                          id="move-in-date"
                          type="date"
                          value={preferences.moveInDate}
                          onChange={(e) => handlePreferenceChange("moveInDate", e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Previous
                      </Button>
                      <Button onClick={() => setStep(3)}>Next Step</Button>
                    </CardFooter>
                  </Card>
                )}

                {step === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Lifestyle & Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Lifestyle</Label>
                        <RadioGroup
                          value={preferences.lifestyle}
                          onValueChange={(value) => handlePreferenceChange("lifestyle", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="quiet" id="quiet" />
                            <Label htmlFor="quiet">I prefer a quiet, peaceful environment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="social" id="social" />
                            <Label htmlFor="social">I enjoy a social, lively atmosphere</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="balanced" id="balanced" />
                            <Label htmlFor="balanced">I like a balance of both</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Commute Preference</Label>
                        <RadioGroup
                          value={preferences.commute}
                          onValueChange={(value) => handlePreferenceChange("commute", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public">I primarily use public transportation</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="car" id="car" />
                            <Label htmlFor="car">I primarily drive</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="walk" id="walk" />
                            <Label htmlFor="walk">I prefer to walk or bike</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Anything else we should know?</Label>
                        <textarea
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Additional preferences or requirements..."
                        ></textarea>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Previous
                      </Button>
                      <Button onClick={handleSubmit}>Find Matches</Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <Sparkles className="h-12 w-12 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Your AI Matches</h1>
                <p className="text-muted-foreground max-w-2xl">
                  Based on your preferences, our AI has found these perfect matches for you. Properties are ranked by
                  match percentage.
                </p>
                <Button variant="outline" onClick={resetForm}>
                  Refine Preferences
                </Button>
              </div>

              <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Matches</TabsTrigger>
                  <TabsTrigger value="high">High Match (90%+)</TabsTrigger>
                  <TabsTrigger value="map">View on Map</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties
                      .sort((a, b) => b.aiMatch - a.aiMatch)
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
                <TabsContent value="high" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties
                      .filter((p) => p.aiMatch >= 90)
                      .sort((a, b) => b.aiMatch - a.aiMatch)
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
                <TabsContent value="map" className="mt-6">
                  <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Map view would display properties here</p>
                      <p className="text-sm text-muted-foreground">
                        (Interactive map integration would be implemented here)
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Rentify</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Rentify. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
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
    <Card className="overflow-hidden">
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
          className={`absolute top-2 right-2 rounded-full bg-background/80 ${
            isFavorite ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={() => onFavoriteToggle(property.id)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        {showAiMatch && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">{property.aiMatch}% Match</Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{property.title}</CardTitle>
          <span className="font-bold text-lg">${property.price}/mo</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between">
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
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

