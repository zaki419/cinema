import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

// Initialize Unsplash (lazy to avoid build errors)
let unsplashClient: ReturnType<typeof createApi> | null = null;

function getUnsplashClient() {
  if (!unsplashClient) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY || '';
    if (!accessKey) {
      // Return a fallback - we'll use placeholder images
      return null;
    }
    unsplashClient = createApi({ accessKey });
  }
  return unsplashClient;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, orientation = 'landscape' } = body;

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const unsplash = getUnsplashClient();

    // If no Unsplash API key, return placeholder
    if (!unsplash) {
      return NextResponse.json({
        url: `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80`,
        photographer: 'Unsplash',
        photographerUrl: 'https://unsplash.com',
        description: query,
      });
    }

    // Search for images
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 10,
      orientation: orientation as 'landscape' | 'portrait' | 'squarish',
    });

    if (result.errors) {
      console.error('Unsplash API error:', result.errors);
      return NextResponse.json(
        { error: 'Failed to fetch images' },
        { status: 500 }
      );
    }

    const photos = result.response?.results || [];

    if (photos.length === 0) {
      // Fallback to a generic image
      return NextResponse.json({
        url: `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80`,
        photographer: 'Unsplash',
        photographerUrl: 'https://unsplash.com',
        description: query,
      });
    }

    // Pick a random image from results
    const photo = photos[Math.floor(Math.random() * Math.min(photos.length, 5))];

    return NextResponse.json({
      url: photo.urls.regular,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      description: photo.description || photo.alt_description || query,
      color: photo.color, // Dominant color for palette adaptation
    });

  } catch (error: unknown) {
    console.error('Image fetch error:', error);

    if (error instanceof Error) {
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(
          { error: `Image fetch failed: ${error.message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch image. Using fallback.' },
      { status: 500 }
    );
  }
}
