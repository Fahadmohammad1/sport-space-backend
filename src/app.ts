import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// app routes
// app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hi Next Level Developer !");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
