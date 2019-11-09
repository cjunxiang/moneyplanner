const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => logger.listen(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
