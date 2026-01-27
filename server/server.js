import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Add CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: "Text is required and must be a string" });
    }

    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/eleven_monolingual_v1", {
      method: "POST",
      headers: {
        "xi-api-key": "sk_aa7d9613effa4ae2bb9171ae259c90b661d3ff8d19e48a77", // Replace with your actual API key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.35,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.byteLength
    });
    
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("TTS Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TTS Proxy server running on port ${PORT}`);
});
