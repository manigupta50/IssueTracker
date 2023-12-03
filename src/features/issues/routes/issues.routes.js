import express from "express";
import IssuesController from "../controller/issues.controller.js";

const router = express.Router();

const issuesController = new IssuesController();

// Routes
router.route("/:id").get((req, res) => {
    issuesController.getById(req, res)
});

router.route("/:projectId/create").get((req, res) => {
    issuesController.getCreate(req, res)
});
router.route("/:projectId/create").post((req, res) => {
    issuesController.postCreate(req, res)
});

export default router;