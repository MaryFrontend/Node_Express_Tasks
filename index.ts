import { app } from './src/app';
import { config } from 'dotenv';

config();

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
