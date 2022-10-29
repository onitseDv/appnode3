require('dotenv').config()

const express = require ('express')
const cors = require('cors')
const path = require ('path')
const app = express ()
const rotasIndex = require ('./Rotas/rotas');
const rotasAuth = require ('./Rotas/rotasAuth');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/App/dist/app')))
app.get('/*', (req, res) => {res.sendFile(path.join(`${__dirname}/App/dist/app/index.html`));});
app.use('/api',rotasIndex);
app.use('/seguranca', rotasAuth)

let port = process.env.PORT || 3000
app.listen (port, () =>{
    console.log(`Servidor iniciado - http://localhost:${port}/`)
})