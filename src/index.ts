// src/index.ts
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import driverRoutes from "./routes/driverRoutes";
// import vehicleRoutes from "./routes/vehicleRoutes";

const PORT = 3000;
const app: Express = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    app.use("/drivers", driverRoutes);
    // app.use("/vehicles", vehicleRoutes);

    app.get("/", (req: Request, res: Response) => {
      res.send("ALL Ok with TS and tsc watch");
    });

    app.listen(PORT, () => {
      console.log("Listening on port ", PORT);
    });
  })
  .catch((error) => console.log("Database connection error: ", error));
