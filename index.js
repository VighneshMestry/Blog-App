const express = require('express');
const app = express();
import 'dotenv/config';

app.listen(process.env.PORT, () => console.log("Server Started"));