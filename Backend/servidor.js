const express = require("express");
const app = express();
const cors = require('cors');
const tasksRouter = require('./routes/tareas.js');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pagina funcionando");
});

app.use(tasksRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Pagina funcionando en http://localhost:${port}`);
});