# Getting Your Free Groq API Key

Groq provides **100% free AI inference** with incredibly fast speeds. No credit card required!

## Why Groq?

- ✅ **Completely Free** - No credit card, no payment required
- ✅ **Super Fast** - Among the fastest AI inference available
- ✅ **Generous Limits** - Free tier supports substantial usage
- ✅ **Llama 3.3 70B** - State-of-the-art open-source model
- ✅ **JSON Mode** - Perfect for structured outputs like Cinema needs

## Setup Steps

### 1. Create Account

Visit [https://console.groq.com/keys](https://console.groq.com/keys)

Click **"Sign Up"** (top right) and create your free account with:
- Email & password, or
- Google account, or
- GitHub account

### 2. Generate API Key

Once logged in:
1. You'll see the "API Keys" page
2. Click **"Create API Key"**
3. Give it a name (e.g., "Cinema App")
4. Click **"Create"**
5. Copy the key (starts with `gsk_...`)

⚠️ **Important:** Save this key immediately! You won't be able to see it again.

### 3. Add to Cinema

Open your Cinema project's `.env.local` file and add:

```
GROQ_API_KEY=gsk_your_actual_key_here
```

### 4. Restart Dev Server

If Cinema is running, restart it to load the new key:

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## Rate Limits (Free Tier)

Groq's free tier includes:
- **30 requests per minute**
- **6,000 tokens per minute** (per model)
- **Unlimited daily requests**

This is more than enough for Cinema's presentation generation!

## Troubleshooting

### "API key not configured" error
- Make sure your `.env.local` file has `GROQ_API_KEY=gsk_...`
- Restart your dev server after adding the key
- Check there are no spaces or quotes around the key

### "Rate limit reached" error
- Wait 60 seconds before trying again
- Free tier resets every minute
- For higher limits, check Groq's paid plans (still very affordable)

### Generation takes too long
- Groq is typically very fast (2-5 seconds)
- Check your internet connection
- Try a shorter presentation length first

## Model Info

Cinema uses **Llama 3.3 70B Versatile**:
- 70 billion parameters
- Excellent at creative and structured tasks
- Supports JSON mode for reliable output
- Comparable quality to GPT-4 for many tasks

## Need Help?

- Groq Documentation: [https://console.groq.com/docs](https://console.groq.com/docs)
- Groq Community: [https://discord.gg/groq](https://discord.gg/groq)
- Cinema Issues: [GitHub Issues](https://github.com/yourusername/cinema/issues)

---

**You're all set!** Generate your first cinematic presentation. 🎬
