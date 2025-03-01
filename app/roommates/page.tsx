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
    <>
    </>
   
  );
}

