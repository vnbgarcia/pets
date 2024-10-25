import "dotenv/config";
import "express-async-errors";
import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { petsRouter } from "./routes/petsRoutes";
import { errorHandler } from "./middlewares/errorMidleware";
import sequelize from "./config/database";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pets API",
      version: "1.0.0",
      description: "A simple Express Pets API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/**/*.ts"], // files containing annotations
};

export const app = express();
const port = 3000;

const specs = swaggerJsdoc(options);

app.use(json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(petsRouter);
app.use(errorHandler);

if (require.main === module) {
  sequelize.sync({ force: true }).then(() => {
    console.log("Database is synced");
    app.listen(port, () =>
      console.log(`Listening at http://localhost:${port}`),
    );
  });
}
