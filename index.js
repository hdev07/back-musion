import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import museumRouter from "./routes/museum.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import opinionRouter from "./routes/opinion.routes.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
import reviewRouter from "./routes/review.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { limiter } from "./middlewares/rateLimit.js";

const app = express();

const { ORIGIN, ORIGIN1, ORIGIN2, ORIGIN3, ORIGIN4 } = process.env;
const witheList = [ORIGIN, ORIGIN1, ORIGIN2, ORIGIN3, ORIGIN4];

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
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/museums", museumRouter);
app.use("/api/v1/favorites", favoriteRouter);
app.use("/api/v1/opinions", opinionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/reviews", reviewRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
