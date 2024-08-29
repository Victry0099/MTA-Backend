const corsOption = {
  origin: ["https://mtaindia.org", "https://www.mtaindia.org"],
  allowedHeaders: "Content-Type,Authorization",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export { corsOption };
