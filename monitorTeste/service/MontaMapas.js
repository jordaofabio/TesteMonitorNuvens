'use strict';



module.exports = function(aeroportos, nuvens, terreno) {

    const area = terreno.split('x');

    const colunas = area[0];
    const linhas = area[1];

    const listaAeroportos = marcarPontos(colunas, linhas, aeroportos, []);

    const listaNuvens = marcarPontos(colunas, linhas, nuvens, listaAeroportos);

    let listaMapas = [];

    const mapaInicial = montaMapa(listaAeroportos, listaNuvens, colunas, linhas);
    listaMapas.push(mapaInicial);

    let mapaEvoluido = evolucaoNuvem(mapaInicial);
    listaMapas.push(mapaEvoluido);

    let diasParaPrimeiroAeroporto = 1;
    let dias = 2;

    let verificaAeroportoLivre = aeroportoLivre(mapaEvoluido);

    while(verificaAeroportoLivre > 0) {
        if ((verificaAeroportoLivre < aeroportos) && diasParaPrimeiroAeroporto === 0) {
            diasParaPrimeiroAeroporto = dias - 1;
        }
        mapaEvoluido = evolucaoNuvem(mapaEvoluido);
        listaMapas.push(mapaEvoluido);

        verificaAeroportoLivre = aeroportoLivre(mapaEvoluido);

        dias++;
    }

    return { mapas: listaMapas, dias, diasParaPrimeiroAeroporto };

}


function marcarPontos(colunas, linhas, quantidade, cargaInicial) {

    let listaMarcada = [];

    for(let i = 0; i < quantidade; i++) {
        let a = Math.floor(Math.random() * (colunas * linhas));

        if (listaMarcada.indexOf(a) < 0 && cargaInicial.indexOf(a) < 0) {
            listaMarcada.push(a);
        } else {
            i--
        }
    }

    return listaMarcada;
}

function montaMapa(listaAeroportos, listaNuvens, colunas, linhas) {

    const quantidadeTotal = colunas * linhas;

    let listaMapa = [];

    let arrayAux = [];

    for(let i = 0; i < quantidadeTotal; i++) {

        if (listaAeroportos.indexOf(i) >= 0) {
            arrayAux.push('A');
        } else if (listaNuvens.indexOf(i) >= 0) {
            arrayAux.push('*');
        } else {
            arrayAux.push('.');
        }

        if (arrayAux.length === parseInt(colunas)) {
            listaMapa.push(arrayAux);
            arrayAux = [];
        }
    }

    return listaMapa;
}

function evolucaoNuvem(mapaBase) {

    let novoMapa = [];

    mapaBase.forEach(x => {
        novoMapa.push(new Array(...x));
    });

    for(let i = 0; i < mapaBase.length; i++) {
        for(let j = 0; j < mapaBase[i].length; j++) {
            if (
                (mapaBase[i][j-1] && mapaBase[i][j-1] === '*') ||
                (mapaBase[i][j + 1] && mapaBase[i][j + 1] === '*') ||
                (mapaBase[i-1] && mapaBase[i-1][j] && mapaBase[i-1][j] === '*') ||
                (mapaBase[i+1] && mapaBase[i+1][j] && mapaBase[i+1][j] === '*')
                ) {
                    novoMapa[i][j] = '*';
            }
        }
    }

    return novoMapa;
}


function aeroportoLivre(mapa) {
    let quantidadeAeroportos = 0
    mapa.forEach(m => {
        if (m.indexOf('A') >= 0) {
            quantidadeAeroportos++
        }
    })
    return quantidadeAeroportos;
}

