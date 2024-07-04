// src/data-source.ts
import { DataSource } from "typeorm";
import { Driver } from "./entity/Driver";
import { Vehicle } from "./entity/Vehicle";
import { Transfer } from "./entity/Transfer";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "vehicle_management",
  synchronize: true,
  logging: false,
  entities: [Driver, Vehicle, Transfer],
  migrations: [],
  subscribers: [],
});
