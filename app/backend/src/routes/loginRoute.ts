import * as express from 'express';
import loginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginValidate';

const router = express.Router();

router.post('/', loginMiddleware.loginValidate, loginController.login);

router.get('/validate', loginController.getRole);

export default router;
