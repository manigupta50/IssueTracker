import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';

import { invalidRoutesHandlerMiddleware } from './src/middlewares/invalidRoutes.middleware.js';
import { errorHandlerMiddleware } from './src/middlewares/errorHandler.js';
import usersRoutes from './src/features/user/user.routes.js'
import projectsRoutes from './src/features/projects/routes/projects.routes.js'
import issuesRoutes from './src/features/issues/routes/issues.routes.js'
import jwtAuth from './src/middlewares/jwtAuth.js';
import HomeController from './src/features/home/home.controller.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To parse data and put it in body object

// Logger middleware
app.use(loggerMiddleware);

// Instance of classes
const homeController = new HomeController();

// For accessing public folder across project
app.use(express.static('public'));

// View Engine settings
app.set('view engine', 'ejs');
app.set('views', [
    path.join(path.resolve(), 'src', 'features', 'user', 'views'),
    path.join(path.resolve(), 'src', 'features', 'home', 'view'),
    path.join(path.resolve(), 'src', 'features', 'projects', 'view'),
    path.join(path.resolve(), 'src', 'features', 'issues', 'view')
]);
app.use(ejsLayouts);

// Routes
app.get('/', (req, res) => {
    homeController.home(req, res)
});
app.use('/api/users', usersRoutes);
app.use('/api/projects', jwtAuth, projectsRoutes);
app.use('/api/issues', jwtAuth, issuesRoutes);

// Invalid Routes Middleware
app.use(invalidRoutesHandlerMiddleware);

// App level Error Handler
app.use(errorHandlerMiddleware);

export default app;