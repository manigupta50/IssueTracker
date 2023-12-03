import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import IssuesRepository from "../model/issues.repository.js";

export default class IssuesController {

    constructor() {
        this.issuesRepository = new IssuesRepository();
    }

    // Controller for fetching the issues by Id
    async getById(req, res) {
        try {
            if(req.query.radios) {
                if(req.query.radios == 'author')
                    return this.getByAuthor(req, res);
                if(req.query.radios == 'labels')
                    return this.getByLabels(req, res);
                if(req.query.radios == 'title-desc')
                    return this.getByTitleAndDesc(req, res);
            }
            const projectId = req.params.id;
            res.cookie('projectId', projectId, {maxAge: 900000000, httpOnly: false})
            const allIssues = await this.issuesRepository.getById(projectId);
            if(allIssues.success) {
                return res.status(200).render('issues', { issues: allIssues.details, projectId: projectId });
            } else {
                return res.status(400).json({ msg: allIssues.msg });
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Controller.");
        }
    }

    // Controller for GET request of Create Issue page
    async getCreate(req, res) {
        const projectId = req.cookies.projectId;
        console.log("project id from get create: " + projectId);
        return res.render('new-issue', { projectId });
    }

    // Controller for POST request of Create Issue page
    async postCreate(req, res, next) {
        try {
            const { title, description, labels } = req.body;
            console.log("labels: " + labels);
            const projectId = req.params.projectId;
            const author = req.cookies.name;
            const created = await this.issuesRepository.postCreate(projectId, title, description, labels, author);
            if(created.success) {
                const allIssues = await this.issuesRepository.getById(projectId);
                return res.status(201).render('issues', { issues: allIssues.details, projectId: projectId });//json({ msg: created.msg });
            } else {
                return res.status(400).json({ msg: created.msg });
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Controller.");
        }
    };

    // Controller for fetching the issues by Labels
    async getByLabels(req, res) {
        try {
            const labels = req.query.value;
            const newLabels = labels.split(',');
            const projectId = req.cookies.projectId;
            const allIssues = await this.issuesRepository.getByLabels(newLabels, projectId);
            return res.status(allIssues.statusCode).render('issues', { projectId: projectId, issues: allIssues.details });
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Controller.");
        }
    };

    // Controller for fetching the issues by Authors
    async getByAuthor(req, res) {
        try {
            const author = req.query.value;
            const projectId = req.cookies.projectId;
            const allIssues = await this.issuesRepository.getByAuthor(author, projectId);
            return res.status(allIssues.statusCode).render('issues', { projectId: projectId, issues: allIssues.details });
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Controller.");
        }
    };

    // Controller for fetching the issues by Title and Description
    async getByTitleAndDesc(req, res) {
        try {
            const value = req.query.value;
            const projectId = req.cookies.projectId;
            const allIssues = await this.issuesRepository.getByTitleAndDesc(value, projectId);
            return res.status(allIssues.statusCode).render('issues', { projectId: projectId, issues: allIssues.details });
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Controller.");
        }
    };
}