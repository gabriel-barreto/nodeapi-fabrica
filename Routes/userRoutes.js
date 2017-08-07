//importando modulos do express
let express = require('express');
let router = express.Router();

//importando modelo de usuários
let Users = require('../Models/Users.js');

//Rotas
router.get('/', function(req, res) {
    Users.find(function(err, users) {
        res.send(users);
    });
});

router.post('/', function(req, res) {
    //Verificando se o username já existe na base de dados.
    Users.findOne({ username: req.body.username }, function(err, user) {
        console.log(user);
        if (user) {
            res.status(409).json({
                success: false,
                message: 'O username já está cadastrado na base de dados',
                data: req.body
            });
        } else {
            //Instancioando um objeto que segue o mesmo schema do modelo.
            let nUser = new Users(req.body);
            /*
            //Poderia ser fetio de forma mais descritiva também
            nUser.name = req.body.name;
            nUser.username = req.body.username;
            nUser.password = req.body.password;
            nUser.email = req.body.email;
            */
            //Executando a função save para adicionar o objeto no banco.
            nUser.save(function(err) {
                if (err) throw err;
                res.status(201).json({
                    success: true,
                    message: 'Usuário cadastrado na base de dados',
                    data: nUser
                });
            });
        }
    });
});

router.get('/:username', function(req, res) {
    Users.findOne({ username: req.params.username }, function(err, user) {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                success: false,
                message: 'Username não encontrado na base de dados',
                data: {
                    username: req.params.username
                }
            });
        }
    });
});

router.put('/:username', function(req, res) {
    Users.findOne({ username: req.params.username }, function(err, user) {
        if (err) throw err;
        if (user) {
            let oldData = user;
            let newData = req.body;

            /*
            Atualizando os atributos do modelo só se foram alterados
            ** nome de usuário não pode ser alterado.
            */
            user.username = oldData.username;
            user.name = newData.name || oldData.name;
            user.password = newData.password || oldData.password;
            user.email = newData.email || oldData.email;

            user.save(function(err) {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    message: 'Os dados do usuário foram atualizados com sucesso!',
                    oldData: oldData,
                    newData: newData
                });
            });

            /*Users.findOneAndUpdate({ username: req.body.username }, {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                },
                function(err) {
                    if (err) throw err;
                    res.status(200).json({
                        success: true,
                        message: 'Os dados do usuário foram atualizados com sucesso!',
                        oldData: oldData,
                        newData: {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        }
                    });
                }
            );*/
        } else {
            res.status(404).json({
                success: false,
                message: 'Username não encontrado na base de dados',
                data: {
                    username: req.params.username
                }
            });
        }
    });
});

router.delete('/:username', function(req, res) {
    Users.findOne({ username: req.params.username }, function(err, user) {
        if (err) throw err;
        if (user) {
            user.remove(function(err) {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    message: 'Usuário deletado com sucesso',
                    data: user
                });
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Username não encontrado na base de dados',
                data: {
                    username: req.params.username
                }
            });
        }
    });
});

//Exportando rotas
module.exports = router;