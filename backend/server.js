import app from "./src/rest-resources/app.js";
import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
});