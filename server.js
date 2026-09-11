// // Force production environment parameters explicitly
// process.env.NODE_ENV = "production";
// process.env.PORT = process.env.PORT || 3000;

// // Pull the optimized standalone server out of the production build folder
// require("./.next/standalone/server.js");




const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Detect the port cPanel assigns dynamically, fallback to 3000 for local testing
const port = process.env.PORT || 3000;
const dev = false; // Forces production layout explicitly
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Let cPanel's process controller proxy incoming requests smoothly
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);
});
