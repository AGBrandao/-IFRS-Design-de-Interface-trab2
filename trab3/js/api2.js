// API 2 (feriados nacionais)
const feriadosNacionais = document.getElementById('feriadosNacionais');
let textoFeriados = "";
async function buscaFeriados() {
   const url = 'https://brasilapi.com.br/api/feriados/v1/2025';
   try {
      let resposta = await fetch(url);
      let js = await resposta.json();
      js.forEach(feriado => {
         textoFeriados = textoFeriados + `
        <b>Data:</b> ${feriado.date} <br>
        <b>Nome:</b> ${feriado.name} <br><br>`;
      });
      // adiciona no elemento
      feriadosNacionais.innerHTML = textoFeriados;
   } catch (error) {
      console.log(error);
   }
}
// exporta a função do módulo 2
export {
   buscaFeriados
};