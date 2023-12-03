import { ProjectsModel } from "./projects.schema.js";

export default class ProjectsRepository{

    // Repository for creating new Project
    async postCreate(name, description, author, labels) {
        try {
            const newProject = new ProjectsModel({ name, description, author, labels });
            await newProject.save();
            if(newProject) {
                return { statusCode: 200, msg: 'Project created.', details: newProject };
            } else {
                return { statuscode: 400, msg: 'Error creating project', details: newProject };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong with Repository.");
        }
    };

    // Repository for fetching all the Projects
    async getAll() {
        try {
            const allProjects = await ProjectsModel.find();
            if(!Object.keys(allProjects).length == 0) {
                return { statusCode: 200, msg: 'All Projects', details: allProjects };
            } else {
                return { statusCode: 400, msg: 'No Projects found.', details: allProjects };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong with Repository.");
        }
    };
}