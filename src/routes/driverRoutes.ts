// src/routes/driverRoutes.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Driver } from "../entity/Driver";
import { handleError } from "../utils/errorHandler";

const router = Router();
const driverRepository = AppDataSource.getRepository(Driver);

// Get list of all drivers
router.get("/list", async (req, res) => {
  try {
    const drivers = await driverRepository.find();
    res.json(drivers);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Get a specific driver by ID
router.get("/:id", async (req, res) => {
  try {
    const driver = await driverRepository.findOneBy({ id: parseInt(req.params.id) });
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Create a new driver
router.post("/create", async (req, res) => {
  try {
    const driver = driverRepository.create(req.body);
    const result = await driverRepository.save(driver);
    res.status(201).json(result);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Update an existing driver by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const driver = await driverRepository.findOneBy({ id: parseInt(req.params.id) });
    if (driver) {
      driverRepository.merge(driver, req.body);
      const result = await driverRepository.save(driver);
      res.json(result);
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Delete a driver by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await driverRepository.delete(req.params.id);
    if (result.affected) {
      res.status(204).send({mesage: "Driver deleted successfully"});
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error: unknown) {
    handleError(res, error);
  }
});

export default router;
