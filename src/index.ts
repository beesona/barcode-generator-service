import express from 'express';
import bwipjs from 'bwip-js';

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ?bcid=code128 - Barcode type (We set it to code128 if it isnt provided)
// &text=978-1-56581-231-4+52250 - Text to encode
// &includetext - Show human-readable text
// &guardwhitespace - Add whitespace to the left and right of the barcode
app.get('/', (req, res) => {
    try { 
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
            res.header('bcid', req.url.split('bcid=')[1].split('&')[0]);
            bwipjs.request(req, res);
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error processing barcode: ${error}`, 'utf8');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
