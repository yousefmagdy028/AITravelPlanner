"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
    Calendar, 
    Users, 
    DollarSign, 
    Mail, 
    Phone,
    CheckCircle,
    ArrowLeft,
    Search,
    User,
    CreditCard,
    MapPin
} from 'lucide-react';

function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [bookings, searchTerm]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/checkout');
            const data = await response.json();
            
            if (data.success) {
                setBookings(data.data);
            } else {
                setError('Failed to fetch bookings');
            }
        } catch (err) {
            setError('Error loading bookings');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterBookings = () => {
        let filtered = bookings;

        if (searchTerm) {
            filtered = filtered.filter(booking => 
                booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBookings(filtered);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateDays = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f78547]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => router.push('/destinations')}
                                className="flex items-center gap-2 text-gray-600 hover:text-[#f78547]"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Destinations
                            </Button>
                            <div>
                                <h1 className="text-3xl font-bold text-[#f78547]">My Bookings</h1>
                                <p className="text-gray-600">Manage your travel reservations</p>
                            </div>
                        </div>
                        
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">{filteredBookings.length}</div>
                            <div className="text-sm text-gray-500">Total Bookings</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">!</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-red-800">Error</h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {filteredBookings.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📅</div>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">No bookings found</h2>
                        <p className="text-gray-500 mb-6">
                            {searchTerm 
                                ? 'Try adjusting your search criteria'
                                : 'Start your journey by booking your first destination!'
                            }
                        </p>
                        <Button 
                            onClick={() => router.push('/destinations')}
                            className="bg-[#f78547] hover:bg-[#e67435]"
                        >
                            Browse Destinations
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-[#f78547] rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    Booking #{booking.id}
                                                </h3>
                                                <p className="text-gray-500 text-sm">
                                                    Confirmed booking
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-[#f78547]">
                                                ${booking.price}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                ${Math.round(booking.price / booking.travelers)} per person
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Guest Information */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                <User className="w-5 h-5 mr-2 text-[#f78547]" />
                                                Guest Information
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Name: </span>
                                                    <span className="font-medium">{booking.firstName} {booking.lastName}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span className="text-gray-600">{booking.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span className="text-gray-600">{booking.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                                Trip Details
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span>{booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Check-in: </span>
                                                    <span className="font-medium">{formatDate(booking.checkInDate)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Check-out: </span>
                                                    <span className="font-medium">{formatDate(booking.checkOutDate)}</span>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-blue-200">
                                                    <span className="text-blue-600 font-medium">
                                                        {calculateDays(booking.checkInDate, booking.checkOutDate)} nights
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                                <CreditCard className="w-5 h-5 mr-2 text-green-500" />
                                                Payment Summary
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Per person:</span>
                                                    <span className="font-medium">${Math.round(booking.price / booking.travelers)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Travelers:</span>
                                                    <span className="font-medium">{booking.travelers}</span>
                                                </div>
                                                <div className="flex justify-between pt-2 border-t border-green-200">
                                                    <span className="font-semibold">Total:</span>
                                                    <span className="font-bold text-green-600">${booking.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                                        <Button 
                                            variant="outline"
                                            className="border-[#f78547] text-[#f78547] hover:bg-[#f78547] hover:text-white"
                                        >
                                            View Details
                                        </Button>
                                        
                                        <Button 
                                            variant="outline"
                                            className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                        >
                                            Download Receipt
                                        </Button>
                                        
                                        <Button 
                                            variant="outline"
                                            className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                        >
                                            Contact Support
                                        </Button>
                                        
                                        <Button 
                                            variant="outline"
                                            className="border-red-300 text-red-600 hover:bg-red-50 ml-auto"
                                        >
                                            Cancel Booking
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary Stats */}
                {bookings.length > 0 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-[#f78547] mb-2">
                                {bookings.length}
                            </div>
                            <div className="text-gray-600">Total Bookings</div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                {bookings.reduce((sum, booking) => sum + booking.travelers, 0)}
                            </div>
                            <div className="text-gray-600">Total Travelers</div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-green-500 mb-2">
                                ${bookings.reduce((sum, booking) => sum + booking.price, 0)}
                            </div>
                            <div className="text-gray-600">Total Revenue</div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-purple-500 mb-2">
                                {Math.round(bookings.reduce((sum, booking) => sum + booking.price, 0) / bookings.length) || 0}
                            </div>
                            <div className="text-gray-600">Avg. Booking Value</div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                onClick={() => router.push('/destinations')}
                                className="bg-[#f78547] hover:bg-[#e67435] flex items-center gap-2"
                            >
                                <MapPin className="w-4 h-4" />
                                Browse Destinations
                            </Button>
                            
                            <Button 
                                onClick={() => router.push('/admin')}
                                variant="outline"
                                className="border-[#f78547] text-[#f78547] hover:bg-[#f78547] hover:text-white flex items-center gap-2"
                            >
                                <MapPin className="w-4 h-4" />
                                Add New Destination
                            </Button>
                            
                            <Button 
                                onClick={fetchBookings}
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                                Refresh Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingsPage;