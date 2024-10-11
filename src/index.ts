import express from "express";
import "express-async-errors";
import { petsRouter } from "./routes/petsRoutes";
import { errorHandler } from "./middlewares/errorMidleware";

const app = express();
const port = 3000;

app.use(petsRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
