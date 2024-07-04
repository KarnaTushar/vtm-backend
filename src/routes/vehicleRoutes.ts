// src/routes/vehicleRoutes.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity/Vehicle";
import { handleError } from "../utils/errorHandler";

const router = Router();
const vehicleRepository = AppDataSource.getRepository(Vehicle);

// Get list of all vehicles
router.get("/list", async (req, res) => {
  try {
    const vehicles = await vehicleRepository.find();
    res.json(vehicles);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Get a specific vehicle by vehicleNumber
router.get("/:vehicleNumber", async (req, res) => {
  try {
    const vehicle = await vehicleRepository.findOneBy({ vehicleNumber: req.params.vehicleNumber });
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Create a new vehicle
router.post("/create", async (req, res) => {
  try {
    const vehicle = vehicleRepository.create(req.body);
    const result = await vehicleRepository.save(vehicle);
    res.status(201).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Update an existing vehicle by vehicleNumber
router.put("/edit/:vehicleNumber", async (req, res) => {
  try {
    const vehicle = await vehicleRepository.findOneBy({ vehicleNumber: req.params.vehicleNumber });
    if (vehicle) {
      vehicleRepository.merge(vehicle, req.body);
      const result = await vehicleRepository.save(vehicle);
      res.json(result);
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Delete a vehicle by vehicleNumber
router.delete("/delete/:vehicleNumber", async (req, res) => {
  try {
    const result = await vehicleRepository.delete(req.params.vehicleNumber);
    if (result.affected) {
      res.status(204).send({mesage: "Vehicle deleted successfully"});
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error: unknown) {
    handleError(res, error);
  }
});

export default router;
