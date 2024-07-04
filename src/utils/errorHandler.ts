import { Response } from "express";

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Unknown error occurred" });
  }
};