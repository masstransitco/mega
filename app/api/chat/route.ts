import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || 'your-key-here'
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface CarFeature {
  id: number;
  name: string;
  type: string;
  price: number;
  features: {
    range: string;
    charging: string;
    acceleration: string;
  };
}

interface ChatRequestBody {
  messages: ChatMessage[];
  selectedCar?: CarFeature;
  currentBookingStep?: string; // can help guide Claude about next step
}

export async function POST(request: Request) {
  try {
    const body: ChatRequestBody = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Only the last few messages to prevent token limit issues
    const recentMessages = body.messages.slice(-5);

    // Base system message
    let systemMessage = `
      You are a helpful car rental assistant. 
      The user can select a vehicle, pick a station, confirm a date/time,
      then must verify HKID/driver's license and pay to finalize the booking.
      Keep a friendly, concise tone.
    `;

    if (body.selectedCar) {
      systemMessage += `
        The user is currently viewing the ${body.selectedCar.name}, 
        which is ${body.selectedCar.type} at $${body.selectedCar.price}/day,
        featuring ${body.selectedCar.features.range} range, 
        ${body.selectedCar.features.charging} charging, 
        and ${body.selectedCar.features.acceleration} acceleration.
      `;
    }

    if (body.currentBookingStep) {
      systemMessage += `\nThe user is currently at booking step: ${body.currentBookingStep}.`;
    }

    // Filter user+assistant messages
    const validMessages = recentMessages
      .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
      .map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

    const response = await anthropic.messages.create({
      model: 'claude-2', // Example model
      max_tokens: 1024,
      temperature: 0.7,
      messages: validMessages,
      system: systemMessage
    });

    if (!response.content?.[0]?.text) {
      throw new Error('Invalid response from Anthropic API');
    }

    return NextResponse.json({
      message: response.content[0].text,
      role: 'assistant'
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);

    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error.message ?? 'Unknown error'
      },
      { status: 500 }
    );
  }
}
