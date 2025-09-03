import express from 'express';
import { registerUserDoador, registerUserDonatario, registerUserInstituicao, registerUserOng } from '../controllers/registerUser.controller.js';

const userRouter = express.Router();

userRouter.post('/cadastrar/doador', registerUserDoador);
userRouter.post('/cadastrar/donatario', registerUserDonatario);
userRouter.post('/cadastrar/instituicao', registerUserInstituicao);
userRouter.post('/cadastrar/ong', registerUserOng);

export default userRouter;