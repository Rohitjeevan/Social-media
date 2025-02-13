import express from 'express';
import apiRouter from "./api/index.js";
import { contextMiddleware } from '../middlewares/context.middleware.js';

const router = express.Router();

router.use('/api',contextMiddleware(),apiRouter);
router.get('/health-check',(req,res)=>{
      console.log('okkk ')
    return res.send();
})

export default router;