import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUHyMjFqmm_ObpvzCQZ1UX-hGAyG80arU1ClTVAmOtaZntaVb3sFzW5sOEXWjkqbFmLA/exec';

app.post('/send', async (req, res) => {
    try {
        console.log("Sending to:", GOOGLE_SCRIPT_URL);
        console.log("Payload:", req.body);

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        const text = await response.text();
        console.log("Response from Google:", text);

        res.send(text);
    } catch (err) {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy failed');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});

// Добавь пустой комментарий