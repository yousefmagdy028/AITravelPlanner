"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CreditCard, Shield, Clock, MapPin, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Separate component that uses useSearchParams
function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false);

  // Get destination info from URL params
  const destinationId = searchParams.get("destinationId")
  const destinationName = searchParams.get("name")
  const price = parseFloat(searchParams.get('price')) || 0;

  const [bookingData, setBookingData] = useState({
    travelers: 1,
    checkInDate: '',
    checkOutDate: '',
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const [totalPrice, setTotalPrice] = useState(price)

  useEffect(() => {
    setTotalPrice(bookingData.travelers * price)
  }, [bookingData.travelers, price])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          travelers: bookingData.travelers,
          price: totalPrice,
        })
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Booking failed");
      }
      toast.success("Booking confirmed! ")
      router.push("/")
    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#f78547]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-[#f78547]">Secure Checkout</h1>
          <div className="flex items-center text-green-600">
            <Shield className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Details */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-[#f78547] mr-3" />
                Trip Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      type="number"
                      name="travelers"
                      min="1"
                      max="10"
                      value={bookingData.travelers}
                      onChange={handleInputChange}
                      className="flex-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      type="date"
                      name="checkInDate"
                      value={bookingData.checkInDate}
                      onChange={handleInputChange}
                      className="flex-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <Input
                      type="date"
                      name="checkOutDate"
                      value={bookingData.checkOutDate}
                      onChange={handleInputChange}
                      className="flex-1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 text-[#f78547] mr-3" />
                Payment Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <Input
                    type="text"
                    name="cardNumber"
                    value={bookingData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <Input
                      type="text"
                      name="expiryDate"
                      value={bookingData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <Input
                      type="text"
                      name="cvv"
                      value={bookingData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <Input
                    type="text"
                    name="cardName"
                    value={bookingData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Destination Preview */}
              <div className="border-2 border-gray-100 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{destinationName}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">Duration info</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travelers:</span>
                    <span className="font-medium">{bookingData.travelers} person{bookingData.travelers > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Price per person:</span>
                  <span>${price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Number of travelers:</span>
                  <span>{bookingData.travelers}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-[#f78547]">${totalPrice}</span>
                </div>
              </div>

              {/* Complete Booking Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Complete Booking
                  </>
                )}
              </Button>

              {/* Security Notice */}
              <div className="mt-4 text-center text-xs text-gray-500">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>
                <p>We never store your payment information</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f78547] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

export default Page
