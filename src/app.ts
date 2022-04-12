import express from 'express';
import cors from 'cors';
import { dbConnect } from './config/mongo.config';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
const app = express();
const PORT = process.env.PORT || 3001;
//--- Routes imports ---
import auth from './routes/auth';
import sensors from './routes/sensors';

// const swaggerDocument = YAML.load('./public/swagger/openapi.yml');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//-MongoDB connection
// dbConnect();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', auth);
app.use('/sensors', sensors);

app.listen(PORT, () => console.log('>_Listening on port:', PORT));