# Unsplash Images Setup (Optional - Also FREE!)

Cinema now supports beautiful, topic-relevant background images for each section using Unsplash's free API.

## Features

- **Automatic Image Selection:** AI suggests relevant search terms for each section
- **Adaptive Backgrounds:** Images blend with color palettes using overlays
- **Fallback Support:** Works without API key (uses placeholder images)
- **Free Tier:** 50 requests/hour - more than enough for presentations

## Setup Steps

### 1. Create Unsplash Developer Account

Visit: [https://unsplash.com/developers](https://unsplash.com/developers)

1. Click **"Register as a developer"**
2. Sign up (free, no credit card)
3. Accept the API terms

### 2. Create a New Application

1. Go to **"Your apps"** in the dashboard
2. Click **"New Application"**
3. Accept the API Guidelines
4. Fill in details:
   - **Application name:** Cinema Presentation Generator
   - **Description:** Dynamic cinematic presentation generator
5. Click **"Create application"**

### 3. Get Your Access Key

1. Scroll to **"Keys"** section
2. Copy your **Access Key** (starts with `...`)
3. Keep this key secure!

### 4. Add to Cinema

Open `.env.local` and add:

```
UNSPLASH_ACCESS_KEY=your_access_key_here
```

### 5. Restart Dev Server

```bash
npm run dev
```

## How It Works

1. **AI Generation:** Groq generates image suggestions for each section
   - Example: "mars landscape sunset", "ocean waves", "modern technology"

2. **Image Fetching:** Cinema queries Unsplash for relevant photos

3. **Adaptive Display:**
   - Images fade in with 25% opacity
   - Color gradient overlay maintains readability
   - Smooth transitions between sections

4. **Fallback Mode:** Without API key, uses placeholder images

## Rate Limits

**Unsplash Free Tier:**
- 50 requests per hour
- Unlimited requests per month
- No credit card required

**Cinema Usage:**
- ~8-18 images per presentation (one per section)
- Well within free tier limits

## Examples

### With Images
```
Section: "The Ocean's Depths"
Image Suggestion: "deep ocean underwater"
Result: Beautiful underwater scene with coral
```

### Without API Key
```
Falls back to: Generic gradient backgrounds
Still looks great! Images are optional.
```

## Troubleshooting

### "Failed to fetch images"
- Check your API key is correct in `.env.local`
- Verify you've created an Unsplash app
- Make sure you restarted the dev server

### "Rate limit exceeded"
- Wait one hour (limit resets)
- Free tier: 50 requests/hour
- Consider upgrading for higher limits

### Images not showing
- Check browser console for errors
- Verify `UNSPLASH_ACCESS_KEY` is in `.env.local`
- Images load asynchronously - may take 1-2 seconds

## Image Quality

Cinema uses Unsplash's **"regular"** size (1080px width):
- High quality for presentations
- Fast loading times
- Perfect for backgrounds

## Attribution

Unsplash requires attribution. Cinema automatically:
- Links to photographer's Unsplash profile
- Credits photographer name
- Complies with Unsplash API terms

## Alternative: Without Images

Don't want to set up Unsplash? No problem!

Cinema works perfectly without images:
- Beautiful gradient backgrounds
- Smooth color transitions
- Full cinematic experience

Simply leave `UNSPLASH_ACCESS_KEY` blank.

---

**Ready to add stunning visuals?** Follow the setup steps above and generate your next presentation with dynamic images! 📸
