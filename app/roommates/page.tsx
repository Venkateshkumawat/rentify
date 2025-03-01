"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for roommates
const roommates = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 28,
    gender: "Male",
    occupation: "Software Engineer",
    location: "Downtown, New York",
    budget: 1500,
    moveInDate: "2023-08-01",
    bio: "Easy-going software engineer looking for a roommate who is clean and respectful. I work from home most days but enjoy going out on weekends.",
    interests: ["Technology", "Hiking", "Cooking", "Movies"],
    lifestyle: ["Non-smoker", "Social", "Early riser"],
    avatar: "/placeholder.svg?height=200&width=200",
    compatibility: 92,
  },
  {
    id: 2,
    name: "Sarah Williams",
    age: 25,
    gender: "Female",
    occupation: "Marketing Specialist",
    location: "Brooklyn, New York",
    budget: 1300,
    moveInDate: "2023-07-15",
    bio: "Marketing professional looking for a roommate who is friendly and tidy. I enjoy a balance of socializing and quiet time.",
    interests: ["Photography", "Yoga", "Reading", "Travel"],
    lifestyle: ["Non-smoker", "Occasional drinker", "Night owl"],
    avatar: "/placeholder.svg?height=200&width=200",
    compatibility: 85,
  },
  {
    id: 3,
    name: "Michael Chen",
    age: 30,
    gender: "Male",
    occupation: "Financial Analyst",
    location: "Midtown, New York",
    budget: 1800,
    moveInDate: "2023-08-15",
    bio: "Financial analyst looking for a responsible roommate. I'm clean, quiet, and respectful of personal space.",
    interests: ["Finance", "Running", "Chess", "Jazz music"],
    lifestyle: ["Non-smoker", "Quiet", "Early riser"],
    avatar: "/placeholder.svg?height=200&width=200",
    compatibility: 78,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    age: 27,
    gender: "Female",
    occupation: "Graphic Designer",
    location: "Williamsburg, Brooklyn",
    budget: 1600,
    moveInDate: "2023-09-01",
    bio: "Creative graphic designer seeking a like-minded roommate. I value creativity, cleanliness, and open communication.",
    interests: ["Art", "Design", "Concerts", "Vegetarian cooking"],
    lifestyle: ["Non-smoker", "Creative", "Social"],
    avatar: "/placeholder.svg?height=200&width=200",
    compatibility: 88,
  },
  {
    id: 5,
    name: "David Kim",
    age: 29,
    gender: "Male",
    occupation: "Doctor",
    location: "Upper East Side, New York",
    budget: 2000,
    moveInDate: "2023-08-01",
    bio: "Medical resident with irregular hours looking for an understanding roommate. I'm clean, quiet, and rarely home.",
    interests: ["Medicine", "Fitness", "Classical music", "Documentaries"],
    lifestyle: ["Non-smoker", "Quiet", "Clean"],
    avatar: "/placeholder.svg?height=200&width=200",
    compatibility: 75,
  },
  {
    id: 6,
    name: "Jessica Taylor",
    age: 26,
    gender: "Female",
    occupation: "Teacher",
    location: "Astoria, Queens",
    budget: 1400,
    moveInDate: "2023-07-15",
    bio: "Elementary school teacher looking for a friendly and respectful roommate. I enjoy a clean living space and occasional movie nights.",
    interests: ["Education", "Baking", "Hiking", "Board games"],
    lifestyle: ["Non-smoker", "Early riser", "Organized"],
    avatar: "/placeholder.svg?height=200&width=200",
    compatibility: 90,
  },
]

export default function RoommatesPage() {
  const [filters, setFilters] = useState({
    gender: "",
    minBudget: 0,
    maxBudget: 3000,
    location: "",
    lifestyle: [] as string[],
  })
  const [searchQuery, setSearchQuery] = useState("")

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  const toggleLifestyle = (lifestyle: string) => {
    if (filters.lifestyle.includes(lifestyle)) {
      handleFilterChange(
        "lifestyle",
        filters.lifestyle.filter((l) => l !== lifestyle)
      )
    } else {
      handleFilterChange("lifestyle", [...filters.lifestyle, lifestyle])
    }
  }

  const filteredRoommates = roommates.filter((roommate) => {
    // Filter by gender
    if (filters.gender && roommate.gender !== filters.gender) {
      return false
    }

    // Filter by budget
    if (roommate.budget < filters.minBudget || roommate.budget > filters.maxBudget) {
      return false
    }

    // Filter by location
    if (
      filters.location &&
      !roommate.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false
    }

    // Filter by lifestyle
    if (
      filters.lifestyle.length > 0 &&
      !filters.lifestyle.every((lifestyle) => roommate.lifestyle.includes(lifestyle))
    ) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !roommate.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !roommate.bio.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !roommate.interests.some((interest) => interest.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    return true
  })

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
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-binary">Non-binary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <div className="flex items-center justify-between">
                        <span>${filters.minBudget}</span>
                        <span>${filters.maxBudget}</span>
                      </div>
                      <div className="pt-2">
                        <Input
                          type="range"
                          min="0"
                          max="3000"
                          step="100"
                          value={filters.maxBudget}
                          onChange={(e) => handleFilterChange("maxBudget", Number.parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Neighborhood or area"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Lifestyle</Label>
                      <div className="space-y-2">
                        {["Non-smoker", "Early riser", "Night owl", "Quiet", "Social", "Clean"].map((lifestyle) => (
                          <div key={lifestyle} className="flex items-center space-x-2">
                            <Checkbox
                              id={`lifestyle-${lifestyle}`}
                              checked={filters.lifestyle.includes(lifestyle)}
                              onCheckedChange={() => toggleLifestyle(lifestyle)}
                            />
                            <label
                              htmlFor={`lifestyle-${lifestyle}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {lifestyle}
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
                  <h1 className="text-2xl font-bold">Find Roommates</h1>
                  <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="relative flex-1 md:w-80">
                      <Input
                        type="search"
                        placeholder="Search by name, interests, or bio..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Filters</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                          <SheetDescription>Adjust filters to find your perfect roommate</SheetDescription>
                        </SheetHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="mobile-gender">Gender</Label>
                            <Select
                              value={filters.gender}
                              onValueChange={(value) => handleFilterChange("gender", value)}
                            >
                              <SelectTrigger id="mobile-gender">
                                <SelectValue placeholder="Any" />
                              </SelectTrigger\

