var grupoDeCartas = ["🦄","🍦","🌈","👽","👾","🤖", "👹", "👺","🏋🏿","💣"];
var totalDeCartas = grupoDeCartas.concat(grupoDeCartas);
var cartasViradas = []; // Array para armazenar as cartas viradas
var pontos = 0; // Variável para armazenar a pontuação atual

function cartasDoBaralho() {
    var resultado;
    resultado = totalDeCartas.sort(function() {
        return 0.5 - Math.random();
    });
    return resultado;
}

function distribuirCartas() {
    var mesa = document.querySelector("#mesa");
    var cartasEmbaralhadas = cartasDoBaralho();
    mesa.innerHTML = "";

    cartasEmbaralhadas.forEach(function(elemento) {
        var carta = document.createElement("div");

        carta.innerHTML =
            "<div class = 'cartas'>" +
            "<div class='cartas__conteudo'>" +
            elemento +
            "</div>" +
            "</div>";

        mesa.appendChild(carta);
    });
}

function virarCarta() {
    // Verifica se já existem duas cartas viradas
    if (cartasViradas.length === 2) {
        // Se sim, remove a classe 'descoberta' de ambas
        cartasViradas.forEach(function(cartaVirada) {
            cartaVirada.classList.remove("descoberta");
        });
        // Limpa o array de cartas viradas
        cartasViradas = [];
    }

    // Adiciona a classe 'descoberta' à carta clicada
    this.classList.add("descoberta");

    // Adiciona a carta clicada ao array de cartas viradas
    cartasViradas.push(this);

    // Verifica se duas cartas foram viradas
    if (cartasViradas.length === 2) {
        // Verifica se as cartas correspondem
        if (cartasViradas[0].querySelector(".cartas__conteudo").innerText === cartasViradas[1].querySelector(".cartas__conteudo").innerText) {
            // Se correspondem, adiciona pontos
            adicionarPontos(1);
            // Se correspondem, mantém as cartas viradas
            cartasViradas = [];
        } else {
            // Se não correspondem, aguarda um tempo e vira as cartas de volta
            setTimeout(function() {
                cartasViradas.forEach(function(cartaVirada) {
                    cartaVirada.classList.remove("descoberta");
                });
                cartasViradas = [];
            }, 1000);
        }
    }
}

function adicionarPontos(pontosAdicionais) {
    pontos += pontosAdicionais;
    document.getElementById("pontuacao-atual").textContent = pontos;
}


distribuirCartas();

document.querySelectorAll(".cartas").forEach(function(elemento) {
    elemento.addEventListener("click", virarCarta);
});
