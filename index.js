const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/email', require('./routes/mail.route'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});