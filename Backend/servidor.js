const express = require("express")
const app = express();

app.get("/", (req,res) => {res.send ("aber")});

const port = 3000;
app.listen(port, () => {console.log ('Pagina funcionando en http://localhost:${port}')})

