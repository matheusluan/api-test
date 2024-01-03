import { Router } from "express";
import userController from "./controllers/userController";
import companyController from "./controllers/companyController";

const router = Router();

router.get("/", (_request, response) => {
  const { name, version } = require("../package.json");
  return response.json({
    name,
    version,
  });
});

//User
router.post("/user", userController.create);
router.get("/user", userController.findAll);
router.get("/user/:id", userController.findById);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

//Company
router.post("/companies", companyController.create);
router.get("/companies", companyController.findAll);
router.get("/companies/:id", companyController.findById);
router.put("/companies/:id", companyController.update);
router.delete("/companies/:id", companyController.delete);

export { router };
