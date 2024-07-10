import express from 'express';
import bwipjs from 'bwip-js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get barcode image
 *     description: Generates a barcode image based on the query "text" query string. "bcid" query string is optional and defaults to code128.
 *     produces:
 *       - image/png
 *     parameters:
 *       - name: text
 *         description: Text to barcode.
 *         required: true
 *         type: string
 *         in: query
 *       - name: bcid
 *         description: Barcode type (Defaults to code128 if not provided).
 *         required: false
 *         type: string
 *         in: query
 *       - name: includetext
 *         description: Include the text under the barcode in the image.
 *         required: false
 *         default: false
 *         type: boolean
 *         in: query
 *       - name: guardwhitespace
 *         description:  Add whitespace to the left and right of the barcode.
 *         required: false
 *         default: false
 *         type: boolean
 *         in: query
 */
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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.listen(PORT);
