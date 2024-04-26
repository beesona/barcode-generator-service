# To run this with TSX in watch mode.

-   install dev-dependency tsx `npm i --save-dev tsx`
-   use the command `node --env-file=.env --import=tsx --watch ./whatever-file.ts`
    -   NOTE: the `env-file` arg depends on node version 20+, but lets us use an .env without the dotenv dependency.
