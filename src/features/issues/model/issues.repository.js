import { IssuesModel } from "./issues.schema.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.js";

export default class IssuesRepository {

    // Repository for fetching the issue by project Id
    async getById(projectId) {
        try {
            const allIssues = await IssuesModel.find({ projectId: projectId });
            if(allIssues) {
                return { success: true, msg: "All Issues.", details: allIssues};
            } else {
                return { success: false, msg: "No issues found.", details: allIssues };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    }

    // Repository for creating new issues
    async postCreate(projectId, title, description, labels, author) {
        try {
            const labelsArray = labels.split(",");
            console.log("labelsArray: " + labelsArray);
            const newIssue = new IssuesModel({ projectId, title, description, labels: labelsArray, author });
            await newIssue.save();
            if(newIssue) {
                return { success: true, msg: "Issue created.", details: newIssue};
            } else {
                return { success: false, msg: "Error creating issue.", details: newIssue };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    };

    // Repository for fetching the issues by Labels
    async getByLabels(labels, projectId) {
        try {
            // const newLabels = JSON.stringify(labels).replace(/^"(.*)"$/, '$1');
            // console.log("labels: " + labels);
            const allIssues = await IssuesModel.find({ projectId: projectId, labels: {$in: labels }});
            if(!Object.keys(allIssues).length == 0) {
                return { success: true, statusCode: 200, msg: "Issues found.", details: allIssues };
            } else {
                return { success: false, statusCode: 404, msg: "No issues found.", details: allIssues };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    };

    // Repository for fetching the issues by Author
    async getByAuthor(author, projectId) {
        try {
            const allIssues = await IssuesModel.find({ projectId: projectId, author: author });
            console.log(allIssues);
            if(!Object.keys(allIssues).length == 0) {
                return { success: true, statusCode: 200, msg: "Issues found.", details: allIssues };
            } else {
                return { success: false, statusCode: 404, msg: "No issues found.", details: allIssues };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    };

    // Repository for fetching the issues by Title and Description
    async getByTitleAndDesc(value, projectId) {
        try {
            const allIssuesTitle = await IssuesModel.find({ projectId: projectId, title: { "$regex": value, "$options": "i" } });
            const allIssuesDesc = await IssuesModel.find({ projectId: projectId, description: { "$regex": value, "$options": "i" } });
            const allIssues = Object.assign(allIssuesTitle, allIssuesDesc);
            console.log(allIssues);
            if(!Object.keys(allIssues).length == 0) {
                return { success: true, statusCode: 200, msg: "Issues found.", details: allIssues };
            } else {
                return { success: false, statusCode: 404, msg: "No issues found.", details: allIssues };
            }
        } catch(err) {
            console.log(err);
            throw new customErrorHandler(500, "Something went wrong in Repository.");
        }
    };
}