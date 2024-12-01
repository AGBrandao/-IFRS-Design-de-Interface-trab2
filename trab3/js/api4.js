// API 4 (FILTER)
// pesca os elementos de descrição
const municipiosFiltrados = document.getElementById('municipiosFiltrados');
const primeiroMuniciopio = document.getElementById('primeiroMuniciopio');
const segundoMuniciopio = document.getElementById('segundoMuniciopio');
const penultimoMuniciopio = document.getElementById('penultimoMuniciopio');
const ultimoMuniciopio = document.getElementById('ultimoMuniciopio');
// cria um array vazio para preencher posteriormente
let arrayInicial = [];

// função para adicionar municípios no array
async function ocuparArray() {
   const url = 'https://brasilapi.com.br/api/ddd/v1/53';
   try {
      let resposta = await fetch(url);
      let js = await resposta.json();
      // coloca municipios no array
      arrayInicial = js.cities;
      // chama todos quando carrega a página
      exibirMunicipios("Todos");
   } catch (error) {
      console.log(error);
   }
}
// função para mostrar os municípios
function exibirMunicipios(vogalSelecionada) {
   // cria um array vazio para preencher com quem passar pelo filtro
   let arrayFinal = [];
   if (vogalSelecionada === "Todos") {
      // como ele sempre começa com "Todos", já fica arrumado
      arrayFinal = arrayInicial.sort();
   } else {
      //**map, filter ou reduce**
      arrayFinal = arrayInicial.filter((municipio) => {
         return municipio.includes(vogalSelecionada)
      });
   }
   // mostra os municípios
   if (vogalSelecionada === "Todos") {
      municipiosFiltrados.innerHTML = `
               <b><br>Todos os municípios:</b> ${arrayFinal.join(', ')}`;      
   } else {
      municipiosFiltrados.innerHTML = `
               <b><br>Municípios com a vogal "${vogalSelecionada}":</b> ${arrayFinal.join(', ')}`;
   }
   //**Destructuring**
   [primeiro, segundo, ...resto] = arrayFinal;
   primeiroMuniciopio.innerHTML = `<br><b>Primeiro município da lista:</b> ${primeiro}.`;
   segundoMuniciopio.innerHTML = `<b>Segundo município da lista:</b> ${segundo}.`;
   penultimoMuniciopio.innerHTML = `<b>Penultimo município da lista:</b> ${resto[resto.length-2]}.`;
   ultimoMuniciopio.innerHTML = `<b>Último município da lista:</b> ${resto[resto.length-1]}.`;
}
let primeiro, segundo, resto;

// cuida se o usuário escolheu uma vogal par alterar a lista
document.getElementById('selecionadorDeVogais').addEventListener('change', function () {
   const vogalSelecionada = this.value;
   exibirMunicipios(vogalSelecionada);
});
// exporta a função do módulo 4
export {
   ocuparArray
};