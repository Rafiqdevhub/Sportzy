import express from "express";
import { commentaryRouter } from "./routes/commentaryRoute.js";
import { matchRouter } from "./routes/matchRoute.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Sportzy API is running." });
});

app.use("/matches", matchRouter);
app.use("/matches/:id/commentary", commentaryRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
