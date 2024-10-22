import "dotenv/config";
import "express-async-errors";
import express, { json } from "express";
import { petsRouter } from "./routes/petsRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import sequelize from "./config/database";

const app = express();
const port = 3000;

app.use(json());
app.use(petsRouter);
app.use(errorHandler);

sequelize.sync({ force: true }).then(() => {
  console.log("Database is synced");
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
})
