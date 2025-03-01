"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Building, Filter, Heart, MapPin, Maximize, Search, SlidersHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
  {
    id: 4,
    title: "Charming Townhouse",
    location: "101 Oak St, Boston, MA",
    price: 2800,
    beds: 3,
    baths: 2.5,
    sqft: 1600,
    type: "house",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    aiMatch: 85,
    amenities: ["Parking", "Yard", "Fireplace", "Washer/Dryer"],
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
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    aiMatch: 78,
    amenities: ["Parking", "Yard", "Basement", "Garage", "Washer/Dryer"],
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
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    aiMatch: 90,
    amenities: ["Parking", "High Ceilings", "Exposed Brick", "Stainless Steel Appliances"],
  },
  {
    id: 7,
    title: "Waterfront Apartment",
    location: "404 Harbor Dr, Seattle, WA",
    price: 3100,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "apartment",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    aiMatch: 87,
    amenities: ["Waterfront", "Balcony", "Gym", "Concierge", "Pets Allowed"],
  },
  {
    id: 8,
    title: "Renovated Historic Building",
    location: "505 Heritage St, Philadelphia, PA",
    price: 2200,
    beds: 2,
    baths: 1,
    sqft: 1000,
    type: "apartment",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    aiMatch: 82,
    amenities: ["Laundry", "Hardwood Floors", "High Ceilings", "Original Details"],
  },
]

export default function ListingsPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    beds: "",
    baths: "",
    propertyType: "",
    amenities: [] as string[],
  })
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  const toggleAmenity = (amenity: string) => {
    if (filters.amenities.includes(amenity)) {
      handleFilterChange(
        "amenities",
        filters.amenities.filter((a) => a !== amenity),
      )
    } else {
      handleFilterChange("amenities", [...filters.amenities, amenity])
    }
  }

  const filteredProperties = properties.filter((property) => {
    // Filter by price range
    if (property.price < filters.minPrice || property.price > filters.maxPrice) {
      return false
    }

    // Filter by beds
    if (filters.beds && Number.parseInt(filters.beds) > property.beds) {
      return false
    }

    // Filter by baths
    if (filters.baths && Number.parseFloat(filters.baths) > property.baths) {
      return false
    }

    // Filter by property type
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false
    }

    // Filter by amenities
    if (filters.amenities.length > 0 && !filters.amenities.every((amenity) => property.amenities.includes(amenity))) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const allAmenities = [
    "Parking",
    "Gym",
    "Pool",
    "Elevator",
    "Pets Allowed",
    "Laundry",
    "Dishwasher",
    "Hardwood Floors",
    "Balcony",
    "Yard",
    "Washer/Dryer",
    "Doorman",
    "Fireplace",
  ]

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
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Desktop Filters */}
            <div className="hidden md:block w-64 sticky top-24">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="flex items-center justify-between">
                        <span>${filters.minPrice}</span>
                        <span>${filters.maxPrice}</span>
                      </div>
                      <Slider
                        defaultValue={[filters.minPrice, filters.maxPrice]}
                        max={5000}
                        step={100}
                        onValueChange={(value) => {
                          handleFilterChange("minPrice", value[0])
                          handleFilterChange("maxPrice", value[1])
                        }}
                        className="my-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="beds">Bedrooms</Label>
                      <Select value={filters.beds} onValueChange={(value) => handleFilterChange("beds", value)}>
                        <SelectTrigger id="beds">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="baths">Bathrooms</Label>
                      <Select value={filters.baths} onValueChange={(value) => handleFilterChange("baths", value)}>
                        <SelectTrigger id="baths">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="1.5">1.5+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select
                        value={filters.propertyType}
                        onValueChange={(value) => handleFilterChange("propertyType", value)}
                      >
                        <SelectTrigger id="property-type">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amenities</Label>
                      <div className="space-y-2">
                        {allAmenities.map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={`amenity-${amenity}`}
                              checked={filters.amenities.includes(amenity)}
                              onCheckedChange={() => toggleAmenity(amenity)}
                            />
                            <label
                              htmlFor={`amenity-${amenity}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <h1 className="text-2xl font-bold">Available Properties</h1>
                  <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search by location or property name..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                          <SlidersHorizontal className="h-4 w-4" />
                          <span className="sr-only">Filters</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                          <SheetDescription>Adjust filters to find your perfect home</SheetDescription>
                        </SheetHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label>Price Range</Label>
                            <div className="flex items-center justify-between">
                              <span>${filters.minPrice}</span>
                              <span>${filters.maxPrice}</span>
                            </div>
                            <Slider
                              defaultValue={[filters.minPrice, filters.maxPrice]}
                              max={5000}
                              step={100}
                              onValueChange={(value) => {
                                handleFilterChange("minPrice", value[0])
                                handleFilterChange("maxPrice", value[1])
                              }}
                              className="my-2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile-beds">Bedrooms</Label>
                            <Select value={filters.beds} onValueChange={(value) => handleFilterChange("beds", value)}>
                              <SelectTrigger id="mobile-beds">
                                <SelectValue placeholder="Any" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="1">1+</SelectItem>
                                <SelectItem value="2">2+</SelectItem>
                                <SelectItem value="3">3+</SelectItem>
                                <SelectItem value="4">4+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile-baths">Bathrooms</Label>
                            <Select value={filters.baths} onValueChange={(value) => handleFilterChange("baths", value)}>
                              <SelectTrigger id="mobile-baths">
                                <SelectValue placeholder="Any" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="1">1+</SelectItem>
                                <SelectItem value="1.5">1.5+</SelectItem>
                                <SelectItem value="2">2+</SelectItem>
                                <SelectItem value="3">3+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile-property-type">Property Type</Label>
                            <Select
                              value={filters.propertyType}
                              onValueChange={(value) => handleFilterChange("propertyType", value)}
                            >
                              <SelectTrigger id="mobile-property-type">
                                <SelectValue placeholder="Any" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="loft">Loft</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Amenities</Label>
                            <div className="space-y-2">
                              {allAmenities.map((amenity) => (
                                <div key={amenity} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`mobile-amenity-${amenity}`}
                                    checked={filters.amenities.includes(amenity)}
                                    onCheckedChange={() => toggleAmenity(amenity)}
                                  />
                                  <label
                                    htmlFor={`mobile-amenity-${amenity}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {amenity}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Showing {filteredProperties.length} of {properties.length} properties
                  </p>
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="match">Best Match</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onFavoriteToggle={toggleFavorite}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No properties found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
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

