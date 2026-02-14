# Get Started with Cinema in 3 Minutes

## Step 1: Get Your Free Groq API Key (2 minutes)

1. **Visit:** [https://console.groq.com/keys](https://console.groq.com/keys)
2. **Sign up** (no credit card needed)
3. **Click** "Create API Key"
4. **Copy** the key (starts with `gsk_...`)

## Step 2: Add Key to Cinema (30 seconds)

Open `.env.local` and replace the placeholder:

```
GROQ_API_KEY=gsk_paste_your_actual_key_here
```

## Step 3: Start Creating (30 seconds)

```bash
# Restart dev server if it's running
npm run dev
```

Visit: **http://localhost:3001**

### Try it:
1. Enter a topic (e.g., "The future of artificial intelligence")
2. Click "Generate Presentation"
3. Wait 10-20 seconds
4. Scroll through your cinematic presentation!

---

## Why Groq is Better

| Feature | Groq | OpenAI GPT-4 |
|---------|------|--------------|
| Cost | **100% Free** | $10-30/month |
| Speed | **2-5 seconds** | 15-30 seconds |
| Credit Card | **Not required** | Required |
| Rate Limits | 30/min (free) | Varies by tier |
| Quality | Excellent (Llama 3.3 70B) | Excellent |

---

## Troubleshooting

**"API key not configured"**
- Check `.env.local` has `GROQ_API_KEY=gsk_...`
- Restart dev server after adding key

**"Rate limit reached"**
- Wait 60 seconds (free tier: 30 requests/minute)
- This is normal, limits reset every minute

**Need more help?**
- See `GROQ_SETUP.md` for detailed guide
- Check `README.md` for full documentation

---

**That's it!** You're ready to create cinematic presentations. 🎬
