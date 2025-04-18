import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {});
authRouter.post("/login", async (req, res) => {});
authRouter.post("/logout", async (req, res) => {});
authRouter.get("/current", async (req, res) => {});

export default authRouter;
