import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// app routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Api is Working fine !");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
