import express from "express";
import ProjectsController from "../controller/projects.controller.js";

const router = express.Router();

const projectsController = new ProjectsController();

// Routes
router.route("/create").get((req, res) => {
    projectsController.getCreate(req, res)
});
router.route("/create").post((req, res) => {
    projectsController.postCreate(req, res)
});
router.route("/").get((req, res) => {
    projectsController.getAll(req, res);
});

export default router;