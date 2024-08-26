const corsOption = {
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL,
    "http://mtaindia.org",
    "http://www.mtaindia.org",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export { corsOption };
