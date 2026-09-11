const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Force port to a string or fallback number as cPanel requires
const port = process.env.PORT || 3000;
const dev = false;
const app = next({ dev, conf: { hostname: "localhost", port } });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    // Bind to '0.0.0.0' or 'localhost' explicitly to ensure the cPanel passenger proxy hooks in
    server.listen(port, "localhost", (err) => {
      if (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
      }
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Next.js preparation failed:", err);
    process.exit(1);
  });
