require('dotenv').config();

const path = require('path');
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors  = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
// app.use(express.static("public"))
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);


app.use(express.static('public'));

// Express serve up index.html file if it doesn't recognize route

app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}


start();
