import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import orderRoutes from './routes/order.route.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(morgan('dev'))

app.use(orderRoutes)

export default app