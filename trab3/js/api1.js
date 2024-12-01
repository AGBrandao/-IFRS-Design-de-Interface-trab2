// API 1 (selecionador de países)
// cria um mapa para os países
const mapaDosPaises = new Map();
// funcao para adicionar países no seletor
async function adicionarPaisesNoBotao() {
   const botaoSelecionarPais = document.querySelector('#selecionadorDePaises');
   const arquivoPaises = "./js/paises.json";
   try {
      let resposta = await fetch(arquivoPaises);
      let js = await resposta.json();

      // país inicial não existe
      const opcaoInicial = document.createElement("option");
      opcaoInicial.text = "País";
      opcaoInicial.value = "";
      botaoSelecionarPais.add(opcaoInicial);
      // transforma países em opções do botão
      js.forEach(pais => {
         const opcao = document.createElement("option");
         opcao.text = pais.nome_pais;
         opcao.value = pais.nome_pais;
         botaoSelecionarPais.add(opcao);
         // guarda os países no mapa
         mapaDosPaises.set(pais.nome_pais, {
            gentilico: pais.gentilico,
            nome_pais_int: pais.nome_pais_int,
            sigla: pais.sigla
         });
      });
   } catch (error) {
      console.log(error);
   }
}
// "isola" o botão para a função iniciarAPI1 funcionar
function prepararBotao() {
   // pesca o elemento de descrição
   const textoMutavel = document.getElementById('textoMutavel');
   // usa o país selecionado para mudar a descrição
   document.getElementById('selecionadorDePaises').addEventListener('change', function () {
      const paisSelecionado = this.value;
      if (this.value != "") {
         const infoPais = mapaDosPaises.get(paisSelecionado);
         textoMutavel.innerHTML = `
            <br><p><b>País:</b> ${paisSelecionado} <br>
            <b>Gentílico:</b> ${infoPais.gentilico} <br>
            <b>Nome em Inglês:</b> ${infoPais.nome_pais_int} <br>
            <b>Sigla:</b> ${infoPais.sigla}</p>`;
      } else {
         textoMutavel.innerHTML = '<br>Selecione um país para exibir informações';
      }
   });
}
// só prepara o botão depois de carregar os países
async function iniciarAPI1() {
   await adicionarPaisesNoBotao();
   prepararBotao();
}
// exporta a função do módulo 1
export {
   iniciarAPI1
};