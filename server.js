const express = require('express');
const cors = require('cors');
const path = require('path');

//Enable cors 
app.use(cors());

const PORT = 8080;

const server = app.listen(PORT, console.log(`Pos Server is running in on port ${PORT}`));