import { Router } from "express";
import { AddUrl, getAllUrls } from "../controllers/UrlsController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const urlsRoutes = Router();

urlsRoutes.post("/add-url", verifyToken, AddUrl);
urlsRoutes.get("/get-urls", verifyToken, getAllUrls);

export default urlsRoutes;
