import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'OneRail - Barcode Generation Service',
        version: '0.0.3',
        description:
            'Supports a wide range of barcode formats and options. Check out here for the full list: https://github.com/metafloor/bwip-js/wiki/BWIPP-Barcode-Types'
    }
};

const options = {
    swaggerDefinition,
    apis: ['./src/index.ts'] // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
