const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const rotasAuth = express.Router()

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        //connectionString: process.env.DATABASE_URL,
        connectionString: 'postgres://hfyazzznsxtayn:d7c0d134c3c1f40fd84ce7c1b4b33c53b63e49fd2d82d3fccda87322e741da49@ec2-18-209-78-11.compute-1.amazonaws.com:5432/d7iuucfc9vrjfd',
        ssl: { rejectUnauthorized: false }
    }
});

rotasAuth.post('/register', (requisicao, resposta) => {
    let senhaHash = bcrypt.hashSync(requisicao.body.senha, 8)
    knex('usuario')
        .insert({
            nome: requisicao.body.nome,
            login: requisicao.body.login,
            senha: senhaHash,
            email: requisicao.body.email
        }, ['id', 'nome', 'email', 'login', 'roles'])
        .then((result) => {
            let usuario = result[0]
            resposta.status(200).json({
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "login": usuario.login,
                "roles": usuario.roles
            })
            return
        })
        .catch(err => {
            resposta.status(500).json({message: 'Erro ao registrar usuário - ' + err.message})
        })
})

rotasAuth.post('/login', (requisicao, resposta) => {
    knex
        .select('*')
        .from('usuario')
        .where({ login: requisicao.body.login })
        .then(usuarios => {
            if (usuarios.length) {
                let usuario = usuarios[0]
                let checkSenha = bcrypt.compareSync(requisicao.body.senha, usuario.senha)
                if (checkSenha) {
                    var tokenJWT = jwt.sign({ id: usuario.id },
                        process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })
                    resposta.status(200).json({
                        id: usuario.id,
                        login: usuario.login,
                        nome: usuario.nome,
                        roles: usuario.roles,
                        token: tokenJWT
                    })
                    return
                }
            }
            resposta.status(403).json({ message: 'Login ou senha incorretos.' })
        })
        .catch(err => {
            resposta.status(500).json({message: 'Erro ao verificar login - ' + err.message})
        })
})

module.exports = rotasAuth