![barcode image](barcode.png)

# Barcode Generator
This application is a simple Node Express handler wrapping the functionality of a dependency named [bwip-js](https://github.com/metafloor/bwip-js), a module with a ton of available functionality to handle generation of a ton of barcode encoding types in a ton of output format and handlers.

# To run this with TSX in watch mode.

-   install dev-dependency tsx `npm i --save-dev tsx`
-   use the command `node --env-file=.env --import=tsx --watch ./whatever-file.ts`
    -   NOTE: the `env-file` arg depends on node version 20+, but lets us use an .env without the dotenv dependency.
