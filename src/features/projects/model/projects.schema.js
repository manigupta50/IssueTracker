import mongoose from "mongoose"

// Schema for Projects
const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minLength: [1, "Name should be minimum of 5 characters."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minLength: [1, "Description should be at least of 10 characters."]
    },
    author: {
        type: String,
        required: [true, "Author is required."],
        minLength: [2, "Author should be at least of 2 characters."]
    },
    labels: {
        type: [String],
        required: [true, "At least one label is required."]
    }
});

export const ProjectsModel = mongoose.model('Project', projectsSchema);