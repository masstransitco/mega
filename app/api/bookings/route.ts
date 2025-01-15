import { NextResponse } from 'next/server';
import { Booking } from '@/types/booking';

export async function POST(request: Request) {
  try {
    const booking: Booking = await request.json();
    // TODO: Persist booking to DB (e.g. Prisma, Mongo, etc.)
    console.log('Received booking:', booking);

    // Return some confirmation / booking ID
    return NextResponse.json({ success: true, bookingId: 'abc123' });
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create booking',
        details: error.message ?? 'Unknown error'
      },
      { status: 500 }
    );
  }
}
