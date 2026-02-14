import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { PresentationData } from '@/types/presentation';
import { SYSTEM_PROMPT, generateUserPrompt } from '@/lib/ai/prompts';

// Initialize Groq client (lazy to avoid build errors)
let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not configured');
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, tone = 'Professional', audience = 'General', length = 'Medium' } = body;

    // Validate input
    if (!topic || topic.trim().length < 10) {
      return NextResponse.json(
        { error: 'Topic must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Map length to section count
    const sectionCounts: Record<string, number> = {
      'Short': 8,
      'Medium': 12,
      'Long': 18
    };
    const targetSections = sectionCounts[length] || 12;

    // Call Groq with structured output (using Llama 3.3 70B)
    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: generateUserPrompt(topic, tone, audience, targetSections)
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 8000
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from AI');
    }

    // Parse and validate response
    const presentationData: PresentationData = JSON.parse(content);

    // Basic validation
    if (!presentationData.meta || !presentationData.narrativeFlow) {
      throw new Error('Invalid presentation structure');
    }

    // Ensure IDs are present
    presentationData.narrativeFlow = presentationData.narrativeFlow.map((section, index) => ({
      ...section,
      id: section.id || `section-${index + 1}`
    }));

    return NextResponse.json(presentationData);

  } catch (error: unknown) {
    console.error('Generation error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // API key errors
      if (error.message.includes('API key') || error.message.includes('GROQ_API_KEY')) {
        return NextResponse.json(
          { error: 'Groq API key not configured. Please add GROQ_API_KEY to .env.local file.' },
          { status: 500 }
        );
      }

      // Timeout errors
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Generation timeout. Please try again.' },
          { status: 504 }
        );
      }

      // Rate limit errors
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        return NextResponse.json(
          { error: 'Rate limit reached. Please wait a moment and try again.' },
          { status: 429 }
        );
      }

      // Return the actual error message for debugging (in development)
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(
          { error: `Generation failed: ${error.message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate presentation. Please try again.' },
      { status: 500 }
    );
  }
}
