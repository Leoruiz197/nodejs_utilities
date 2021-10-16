const express = require('express');
const app = express();
const multer = require('multer');
const storage = require('./controller/index')
app.set("view engine", "ejs"); 
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const upload = multer({ storage });
const lista_nomes = [];

app.get("/", function (req, res){
    res.send("ok") ;
});

app.get("/upload", function (req, res){
    res.render("index"); 
});

app.post('/upload',upload.array('imagem'), function(req, res) {
    req.files.map(img =>{
        lista_nomes.push({nome: img.filename, caminho: img.destination});
    })
    res.json(lista_nomes); // essa é a lista de nomes que devem ser salvo no banco de dados
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));