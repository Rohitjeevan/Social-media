import { Router } from "express";
import  userRoutes from './user.route.js';
import  authRoutes from './auth.route.js';
import postRoutes from  './post.route.js';
import commentRoutes from "./comment.route.js";
import likeRouter from "./like.route.js";

const v1Router = Router();


v1Router.use('/user',userRoutes);
v1Router.use('/auth',authRoutes);
v1Router.use('/post',postRoutes);
v1Router.use('/comment',commentRoutes);
v1Router.use('/like',likeRouter);


export default  v1Router;