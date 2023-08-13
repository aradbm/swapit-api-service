const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// This is a package that will list all of the endpoints in your Express app.
// const expressListEndpoints = require('express-list-endpoints');
// console.log(expressListEndpoints(app)); // 'app' being your express instance.

app.use(bodyParser.json());  // This allows Express to understand JSON payloads in request bodies.

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
