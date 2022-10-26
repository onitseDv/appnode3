const jwt = require('jsonwebtoken')

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
});

let checkToken = (requisicao, resposta, next) => {
    let authToken = requisicao.headers["authorization"]
    if (!authToken) {
        resposta.status(401).json({ message: 'Token de acesso requerida.'})
    } else {
        let token = authToken.split(' ')[1]
        requisicao.token = token
    }
    jwt.verify(requisicao.token, process.env.SECRET_KEY, (err, decodeToken) => {
        if (err) {
            resposta.status(401).json({ message: 'Acesso negado.'})
            return
        }
        requisicao.usuarioId = decodeToken.id
        next()
    })
}

let isAdmin = (requisicao, resposta, next) => {
    knex
        .select('*')
        .from('usuario')
        .where({ id: requisicao.usuarioId })
        .then((usuarios) => {
            if (usuarios.length) {
                let usuario = usuarios[0]
                let roles = usuario.roles.split(';')
                let adminRole = roles.find(i => i === 'ADMIN')
                if (adminRole === 'ADMIN') {
                    next()
                    return
                }
                else {
                    resposta.status(403).json({ message: 'Role de ADMIN requerida.'})
                    return
                }
            }
        })
        .catch(err => {
            resposta.status(500).json({message: 'Erro ao verificar roles de usuário - ' + err.message})
        })
}

module.exports = { checkToken, isAdmin }