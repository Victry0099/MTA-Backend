const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://mtaindia.org", // Update to HTTPS
    "https://www.mtaindia.org",
    "https://api.mtaindia.org", // Ensure this is also allowed
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export { corsOption };
