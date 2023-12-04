import mongoose from "mongoose";

// Schema for Issues
const issuesSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    title: {
        type: String,
        required: [true, "Title is required."],
        minLength: [1, "Title should be minimum of 1 characters."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minLength: [1, "Description should be at least of 1 characters."]
    },
    labels: {
        type: [String],
        required: [true, "At least one label is required."]
    },
    author: {
        type: String,
        required: [true, "Author is required."],
        minLength: [1, "Author should be at least of 2 characters."]
    },
});

export const IssuesModel = mongoose.model('Issue', issuesSchema);