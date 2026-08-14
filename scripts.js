const CHANNEL_ID = "3456165";

const URL_API =
    `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=1`;

async function carregarDados() {
    try {
        const resposta = await fetch(URL_API);
        const dados = await resposta.json();
        const ultimo = dados.feeds[0];
        const temperatura = ultimo.field1;
        const umidade = ultimo.field2;

        document.getElementById("temperatura")
            .textContent =
            temperatura !== null
                ? `${temperatura} °C`
                : "-- °C";
        document.getElementById("umidade")
            .textContent =
            umidade !== null
                ? `${umidade} %`
                : "-- %";
        document.getElementById("status")
            .textContent = "Online";
        document.getElementById("atualizacao")
            .textContent =
            `Última atualização: ${ultimo.created_at}`;
    } catch (erro) {
        console.error(erro);
        document.getElementById("status")
            .textContent = "Erro de conexão";
    }
}
// Carrega imediatamente
carregarDados();
// Atualiza a cada 20 segundos
setInterval(carregarDados,20000);