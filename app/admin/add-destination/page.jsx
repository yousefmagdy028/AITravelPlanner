"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

function Page() {
    const [step, setStep] = useState(1)
    const [imagePreview, setImagePreview] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        city: "",
        description: "",
        highlights: "",
        bestSeason: "",
        activities: "",
        price: "",
        duration: "",
        imageUrl: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        
        if (files && files[0]) {
            // Handle image file
            const file = files[0]
            setFormData((prev) => ({ ...prev, [name]: file }))
            
            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => setImagePreview(e.target.result)
            reader.readAsDataURL(file)
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const validateStep = () => {
        switch (step) {
            case 1:
                return formData.name && formData.country && formData.city
            case 2:
                return formData.description && formData.highlights && formData.bestSeason
            case 3:
                return formData.activities && formData.price && formData.duration
            case 4:
                return formData.imageUrl !== null
            default:
                return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Final validation
        if (!formData.imageUrl) {
            toast.error("Please upload an image")
            return
        }

        try {
            const data = new FormData()
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null) {
                    data.append(key, formData[key])
                }
            })

            const res = await fetch("/api/destinations", {
                method: "POST",
                body: data
            })

            if (res.ok) {
                toast.success("Destination added successfully 🎉")
                setFormData({
                    name: "",
                    country: "",
                    city: "",
                    description: "",
                    highlights: "",
                    bestSeason: "",
                    activities: "",
                    price: "",
                    duration: "",
                    imageUrl: null,
                })
                setImagePreview(null)
                setStep(1)
            } else {
                const errorData = await res.json()
                toast.error(`Error: ${errorData.error || 'Something went wrong'} ❌`)
            }

        } catch (error) {
            console.error(error)
            toast.error("Server error ❌")
        }
    }

    const nextStep = () => {
        if (validateStep()) {
            setStep((prev) => prev + 1)
        } else {
            toast.error("Please fill in all required fields")
        }
    }
    
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden'>

                {/* Form Section */}
                <div className='p-6'>
                    <h2 className='text-[#f78547] text-[20px] my-4'>
                        Add Destination - Step {step} of 4
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <div className='space-y-4'>
                                <Input 
                                    name='name' 
                                    placeholder='Destination Name*' 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="country"
                                    placeholder="Country*"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="city"
                                    placeholder="City*"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <div className='space-y-4'>
                                <Textarea
                                    name="description"
                                    placeholder="Description*"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                                <Textarea
                                    name="highlights"
                                    placeholder="Highlights*"
                                    value={formData.highlights}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="bestSeason"
                                    placeholder="Best Season (e.g., Summer, Winter)*"
                                    value={formData.bestSeason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div className='space-y-4'>
                                <Input
                                    name="activities"
                                    placeholder="Activities (e.g., Hiking, Diving)*"
                                    value={formData.activities}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="price"
                                    placeholder="Price*"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="duration"
                                    placeholder="Duration (e.g., 5 days)*"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4">
                                <label className="block font-medium">Upload Image*</label>
                                <Input
                                    type="file"
                                    name="imageUrl"
                                    accept="image/*"
                                    onChange={handleChange}
                                    required
                                />
                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-48 object-cover rounded-lg border"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className='flex justify-between'>
                            {step > 1 && (
                                <Button type="button" onClick={prevStep}>Back</Button>
                            )}

                            {step < 4 && (
                                <Button 
                                    type="button" 
                                    onClick={nextStep}
                                    disabled={!validateStep()}
                                >
                                    Next
                                </Button>
                            )}

                            {step === 4 && (
                                <Button 
                                    type="submit"
                                    disabled={!validateStep()}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Image Section */}
                <div className='relative hidden md:block'>
                    <Image src="/formImg.png" width={500} height={500} alt="Form illustration" />
                </div>
            </div>
        </div>
    )
}

export default Page