import { config } from 'dotenv';
import { app } from './src/app';

config();

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
