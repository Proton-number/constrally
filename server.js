// Force production environment parameters explicitly
process.env.NODE_ENV = "production";
process.env.PORT = process.env.PORT || 3000;

// Pull the optimized standalone server out of the production build folder
require("./.next/standalone/server.js");
