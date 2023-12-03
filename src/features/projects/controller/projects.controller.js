import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import ProjectsRepository from "../model/projects.repository.js";

export default class ProjectsController {

    constructor() {
        this.projectsRepository = new ProjectsRepository();
    }

    // Controller for GET request of new Project page
    async getCreate(req, res) {
        return res.render('new-project');
    }

    // Controller for POST request of new Project page
    async postCreate(req, res) {
        try {
            const { name, description, labels } = req.body;
            const author = req.cookies.name;
            const newProject = await this.projectsRepository.postCreate(name, description, author, labels);
            if(newProject.statusCode == 200) {
                const allProjects = await this.projectsRepository.getAll();
                return res.status(newProject.statusCode).render('projects', {projects: allProjects.details});
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong with Controller.");
        }
    };

    // Controller for fetching the list of all Projects
    async getAll(req, res, next) {
        try {
            const allProjects = await this.projectsRepository.getAll();
            return res.status(allProjects.statusCode).render('projects', { projects: allProjects.details });
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong with Controller.");
        }
    };
}