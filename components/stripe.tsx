"use client"

import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Mock Stripe public key - in a real app, this would be your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_mock_key")

export function Stripe({ children, options, className }) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // In a real implementation, this would be a fetch to your backend to create a payment intent
    // For this demo, we're simulating the response
    setTimeout(() => {
      setClientSecret("mock_client_secret")
    }, 1000)
  }, [])

  return (
    <div className={className}>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          {children}
        </Elements>
      )}
      {!clientSecret && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}

