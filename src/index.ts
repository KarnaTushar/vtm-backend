// src/app.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import driverRoutes from "./routes/driverRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import transferRoutes from "./routes/transferRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/drivers", driverRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/transfers", transferRoutes);

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
