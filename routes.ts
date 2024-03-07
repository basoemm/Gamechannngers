import asyncHandler from "express-async-handler";
import { Router, Request, Response, NextFunction } from "express";

export const router: Router = Router();

router.post("/gameobject/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { alias, name, description, type, price, hp } = req.body;

        // Validate required fields
        if (!alias || !name || !description || !type) {
            return res.status(400).send("Alias, name, description, and type are required.");
        }

        // Validate 'price' for 'Item' type
        if (type === "Item" && (price === null || price === undefined)) {
            return res.status(400).send("Price is required for items.");
        }

        // Validate 'hp' for 'Character' type
        if (type === "Character" && (hp === null || hp === undefined)) {
            return res.status(400).send("HP is required for characters.");
        }

        // If validation passes, proceed with your logic here
        // ...

        // Example response when creation is successful
        res.status(201).json({ message: "GameObject added successfully" });
    } catch (error) {
        // Handle errors here
        next(error); // Pass errors to the error handling middleware
    }
});
