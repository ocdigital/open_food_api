import app from './app';
import { connectdatabase } from './config/database';

const PORT = 3000;

connectdatabase().then(async () => {    
    app.listen(PORT);
});

