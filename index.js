import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import museumRouter from "./routes/museum.route.js";
import favoritesRouter from "./routes/favorites.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const { ORIGIN, ORIGIN1, ORIGIN2 } = process.env;
const witheList = [ORIGIN, ORIGIN1, ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || witheList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        return callback(
          new Error("Not allowed by CORS: " + origin + " No autorizado")
        );
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/museums", museumRouter);
app.use("/api/v1/favorites", favoritesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
