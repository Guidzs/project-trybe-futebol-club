import * as express from 'express';
import loginController from '../controllers/loginController';
import { loginValidate } from '../middlewares/loginValidate'

const router = express.Router();

router.post('/', loginValidate, loginController.login);

export default router;
