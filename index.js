import cors from "cors";
import "dotenv/config";
import express from "express";
import registerRoutes from "./src/routes.js";

const app = express();
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express");
});

registerRoutes(app);

