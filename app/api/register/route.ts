import { NextRequest, NextResponse } from 'next/server';
import { saveRegistration, generateConfirmationNumber } from '@/lib/data';
import { Registration } from '@/types/registration';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone number are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create registration
    const registration: Registration = {
      id: Date.now().toString(),
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      organization: body.organization || undefined,
      jobTitleDegree: body.jobTitleDegree || undefined,
      questions: body.questions || undefined,
      createdAt: new Date().toISOString(),
      confirmationNumber: generateConfirmationNumber(),
    };

    // Save registration
    saveRegistration(registration);

    // Send confirmation email (non-blocking)
    try {
      await sendConfirmationEmail(registration);
    } catch (emailError) {
      console.error('Email sending failed, but registration was saved:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        confirmationNumber: registration.confirmationNumber,
        registration 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}

