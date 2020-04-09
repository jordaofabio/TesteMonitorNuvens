'use strict';

var MontaMapas = require('../service/MontaMapas')

module.exports = function (router) {

    router.get('/',  function (req, res) {

    const { a: aeroportos, n: nuvens, t: terreno } = req.query;

    const result =  new MontaMapas(aeroportos, nuvens, terreno);

    console.log(result)

    res.status(200).json(result);

    });

};
