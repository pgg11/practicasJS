const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const claveSecreta = 'esta_es_una_clave_para_token';

//HASING
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
 
//ENCRIPTACION
const algorithm = 'aes-128-gcm';
const password = 'pass 16 caracter';
const iv = crypto.randomBytes(16);

function miHash(clave) {

    const claveConHash = bcrypt.hashSync(clave,salt);

    return claveConHash;
}

function miEncriptado(dato){
    
    const cifrado = crypto.createCipheriv(algorithm,password,iv);

    let encriptado = cifrado.update(dato,'utf8','hex');
    encriptado += cifrado.final('hex');

    return encriptado;
}

function crearToken(idUsuario, usuario){
    const informacion = {
        usuario_id: idUsuario,
        usuario: usuario
    }

    const token = jwt.sign(informacion, claveSecreta, { expiresIn: '1h'});
    
    return token;
}

function validarToken(req, res, next){
    const token = req.headers.authorization;

    try{
        const decodificado = jwt.verify(token.split(' ')[1],claveSecreta);
        req.user = decodificado;
        next();
    }catch(error){
        return res.status(401).send('Token de autenticación invalido')
    }
}

module.exports = { miHash, miEncriptado, crearToken, validarToken };