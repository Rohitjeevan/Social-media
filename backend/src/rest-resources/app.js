import express from  'express';
import cors from 'cors';
import helmet  from 'helmet';
import bodyParser from 'body-parser';
import routes from '../rest-resources/routes/index.js'

const app = express();


app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(routes);

app.use((req,res) =>{
    return res.status(404).json({status:"not found"});
})


export default app;