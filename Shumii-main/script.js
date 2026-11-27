
document.addEventListener("DOMContentLoaded", () => {

    const carrossel = document.querySelector(".imagens-carrossel");
    const container = document.querySelector(".cursos-container");
    const cards = document.querySelectorAll(".curso-card");

    if (!carrossel || !container || cards.length === 0) return;

    let indiceAtual = 0;
    let intervalo;

    const tempo = 4000;

    // Calcula quantos cards podem aparecer na tela
    function calcularLimite() {

        const larguraCard = cards[0].offsetWidth;

        const estilos = window.getComputedStyle(container);
        const espacamento = parseFloat(estilos.gap) || 0;

        const larguraVisivel = carrossel.clientWidth;

        const cardsVisiveis = Math.round(
            (larguraVisivel + espacamento) /
            (larguraCard + espacamento)
        );

        return Math.max(0, cards.length - cardsVisiveis);
    }

    // Atualiza a posição do carrossel
    function atualizarCarrossel() {

        const limite = calcularLimite();

        indiceAtual = Math.min(indiceAtual, limite);

        const larguraCard = cards[0].offsetWidth;

        const estilos = window.getComputedStyle(container);
        const espacamento = parseFloat(estilos.gap) || 0;

        const deslocamento = indiceAtual * (larguraCard + espacamento);

        container.style.transform =
            `translateX(-${deslocamento}px)`;
    }

    // Movimentação manual
    window.moverCarrossel = function(direcao) {

        const limite = calcularLimite();

        indiceAtual += direcao;

        if (indiceAtual > limite) {
            indiceAtual = 0;
        }

        if (indiceAtual < 0) {
            indiceAtual = limite;
        }

        atualizarCarrossel();
    };

    // Inicia a movimentação automática
    function iniciarAutomatico() {

        clearInterval(intervalo);

        intervalo = setInterval(() => {
            window.moverCarrossel(1);
        }, tempo);
    }

    // Pausa quando o mouse está sobre o carrossel
    carrossel.addEventListener("mouseenter", () => {
        clearInterval(intervalo);
    });

    // Retoma quando o mouse sai
    carrossel.addEventListener("mouseleave", () => {
        iniciarAutomatico();
    });

    // Ajusta quando a janela muda de tamanho
    window.addEventListener("resize", atualizarCarrossel);

    // Inicialização
    atualizarCarrossel();
    iniciarAutomatico();

});

