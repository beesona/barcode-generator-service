// create a test for the get method in the index file

import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../src/index';

describe('GET /', () => {
    it('should return 404 if text query string is missing', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).to.equal(404);
        expect(response.text).to.equal('Missing text query string');
    });

    it('should default bcid to code128 if bcid is not a query string', async () => {
        const response = await supertest(app).get('/?text=978-1-56581-231-4+52250');
        expect(response.header.bcid).to.equal('code128');
        expect(response.status).to.equal(200);
    });

    it('should return 200 if the barcode is successfully processed', async () => {
        const response = await supertest(app).get('/?text=978-1-56581-231-4+52250');
        expect(response.status).to.equal(200);
    });

    it('should return a QR Code if bcid is type qrcode', async () => {
        const response = await supertest(app).get('/?text=978-1-56581-231-4+52250&bcid=qrcode');
        expect(response.header.bcid).to.equal('qrcode');
    });
});