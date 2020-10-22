const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

// const logger = require('./middleware/logger');



const app = express();


//Init middeleware
// app.use(logger);

//Body Parser Middleware
app.use(bodyParser.json());


//set static folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public')); 
// Are the above the same? 

/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/
const router = require('./routes/api/members');
app.use('/api/members', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
