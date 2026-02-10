import 'dotenv/config'
import app from '../config/express.js';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

app.use('/api', router);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
})
