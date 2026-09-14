import express from 'express';
import registerController from '../Controllers/Register.Controller.js';


const route = express.Router();


route.post('/register', registerController);

export default route;