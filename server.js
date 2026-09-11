const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Detect the port cPanel assigns dynamically, fallback to 3000 for local testing
const port = process.env.PORT || 3000;
// FORCED PRODUCTION: Tells Next.js to strictly read the uploaded production build folder
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
