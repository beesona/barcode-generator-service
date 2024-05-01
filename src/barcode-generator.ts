import bwipjs from 'bwip-js';
import fs from 'fs';

function convertToBarcode(text: string) {
    bwipjs
        .toBuffer({
            bcid: 'code128', // Barcode type
            text: text, // Text to encode
            scale: 3, // 3x scaling factor
            height: 10, // Bar height, in millimeters
            includetext: true, // Show human-readable text
            textxalign: 'center' // Always good to set this
        })
        .then((png: any) => {
            fs.writeFile('./image.png', png, (err) => {
                if (err) {
                    throw err;
                }
                console.log('Barcode saved!');
            });
        })
        .catch((err: Error) => {
            // `err` may be a string or Error object
        });
}

export default convertToBarcode;
//convertToBarcode('1234567890');
