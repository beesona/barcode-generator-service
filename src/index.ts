import express from 'express';
import bwipjs from 'bwip-js';

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ?bcid=code128 - Barcode type (We set it to code128 if it isnt provided)
// &text=978-1-56581-231-4+52250 - Text to encode
// &includetext - Show human-readable text
// &guardwhitespace - Add whitespace to the left and right of the barcode
app.get('/', (req, res) => {
    if (!req.url.includes('bcid=')) {
        // add bcid to the url
        if (req.url.includes('?')) {
            req.url += '&bcid=code128';
        } else {
            req.url += '?bcid=code128';
        }
    }
    if (!req.url.includes('text=')) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Missing text query string', 'utf8');
    } else { 
        bwipjs.request(req, res);
    }
});

app.get('/svg', (req, res) => {
    const urlParams = req.url.split('?')[1].split('&');
    const bcid = urlParams.find((param) => param.includes('bcid='))?.split('=')[1];
    const text = urlParams.find((param) => param.includes('text='))?.split('=')[1];
    let svg = bwipjs.toSVG({
        bcid: bcid || 'code128', // Barcode type
        text: text || '0000000000', // Text to encode
        height: 12, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
        textcolor: 'ff0000' // Red text
    });
    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(`${svg}`, 'utf8');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
