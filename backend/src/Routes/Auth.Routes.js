import express from 'express';
import registerController from '../Controllers/Register.Controller.js';
import loginController from '../Controllers/Login.Controllers.js';


const route = express.Router();

// /user/register
route.post('/register', registerController);
// /user/login
route.post('/login', loginController);

export default route;