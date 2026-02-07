import 'dotenv/config'
import app from '../config/express.js';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
// TEST
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the api',
  })
})
app.use(router);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
})
