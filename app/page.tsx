'use client';

import CarGrid from '@/components/booking/CarGrid';
import GMap from '@/components/GMap';
import BookingDialog from '@/components/booking/BookingDialog';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Car Rental App</h1>
        {/* Display the car grid */}
        <CarGrid />

        <hr className="my-8" />

        {/* Display the station map */}
        <GMap googleApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} />

        {/* Booking dialog (opens automatically if car+station selected) */}
        <BookingDialog />
      </div>
    </main>
  );
}
