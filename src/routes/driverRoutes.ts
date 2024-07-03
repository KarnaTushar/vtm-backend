// src/routes/driverRoutes.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Driver } from "../entity/Driver";
import { handleError } from "../utils/errorHandler";

const router = Router();
const driverRepository = AppDataSource.getRepository(Driver);

router.get("/list", async (req, res) => {
  try {
    const drivers = await driverRepository.find();
    res.json(drivers);
  } catch (error: unknown) {
    handleError(res, error);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const driver = driverRepository.create(req.body);
//     const result = await driverRepository.save(driver);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

export default router;
