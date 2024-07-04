// src/routes/transferRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Driver } from "../entity/Driver";
import { Vehicle } from "../entity/Vehicle";
import { Transfer } from "../entity/Transfer";
import { handleError } from "../utils/errorHandler";

const router = Router();
const transferRepository = AppDataSource.getRepository(Transfer);
const driverRepository = AppDataSource.getRepository(Driver);
const vehicleRepository = AppDataSource.getRepository(Vehicle);

// Middleware for validating input
const validateTransferInput = (req: Request, res: Response, next: NextFunction) => {
  const { fromDriverId, toDriverId, vehicleId } = req.body;

  // if (typeof fromDriverId !== "number" || typeof toDriverId !== "number" || typeof vehicleId !== "number") {
  //   return res.status(400).json({ error: "Invalid input. Expected numbers for fromDriverId, toDriverId, and vehicleId." });
  // }

  next();
};

// Transfer a vehicle from one driver to another
router.post("/transfer", validateTransferInput, async (req, res) => {
  try {
    const { fromDriverId, toDriverId, vehicleId } = req.body;
    console.log(req.body, fromDriverId)
    const fromDriver = req.body.fromDriverId ? await driverRepository.findOneBy({ id: fromDriverId }) : null;
    console.log("fromDriver", fromDriver)
    const toDriver = await driverRepository.findOneBy({ id: toDriverId });
    const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Deactivate previous transfers for the vehicle
    await transferRepository.update({ vehicle }, { active: false });

    const transfer = new Transfer();
    transfer.fromDriver = fromDriver || null;
    transfer.toDriver = toDriver || null;
    transfer.vehicle = vehicle;

    console.log("transfer", transfer)
    await transferRepository.save(transfer);
    res.status(201).json(transfer);
  } catch (error: unknown) {
    console.log(error)
    handleError(res, error);
  }
});

// Get transfer history of a vehicle
router.get("/history/:vehicleId", async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.vehicleId);
    const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const transfers = await transferRepository.find({
      where: { vehicle },
      relations: ["fromDriver", "toDriver", "vehicle"],
      order: { transferDate: "DESC" }
    });
    console.log(transfers)
    res.json(transfers);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// List all transfers
router.get("/list", async (req, res) => {
  try {
    const transfers = await transferRepository.find({ relations: ["fromDriver", "toDriver", "vehicle"] });
    console.log(transfers);
    res.json(transfers);
  } catch (error) {
    handleError(res, error);
  }
});

// Get all actively mapped vehicles for a driver
router.get("/driver/:driverId/vehicles", async (req, res) => {
  try {
    const driverId = parseInt(req.params.driverId);
    const driver = await driverRepository.findOneBy({ id: driverId });

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const vehicles = await transferRepository
      .createQueryBuilder("transfer")
      .leftJoinAndSelect("transfer.vehicle", "vehicle")
      .where("transfer.toDriverId = :driverId AND transfer.active = true", { driverId })
      .getMany();

    const activeVehicles = vehicles.map(transfer => transfer.vehicle);
    console.log(activeVehicles);
    res.json(activeVehicles);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// Get the driver mapped to a vehicle
router.get("/vehicle/:vehicleId/driver", async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.vehicleId);
    const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const transfer = await transferRepository
      .createQueryBuilder("transfer")
      .leftJoinAndSelect("transfer.toDriver", "toDriver")
      .where("transfer.vehicleId = :vehicleId AND transfer.active = true", { vehicleId })
      .getOne();

    if (!transfer) {
      return res.status(404).json({ error: "No active transfer found for this vehicle" });
    }

    res.json(transfer.toDriver);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

export default router;
