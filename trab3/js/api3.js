// API 3 (indicador de leitura)
// cria variaveis para alterar dados e imagem
let imagemLivro = document.getElementById('imagemLivro');
let isbn = '';
// função para alterar dados e imagem
function mudarCapaLivro() {
   if (document.getElementById('Estrangeira').checked) {
      if (document.getElementById('Ficcao').checked) {
         imagemLivro.src = 'img/theEyeOfTheWorld.jpg';
         isbn = '978-65-5560-337-8';
      } else if (document.getElementById('Psicologia').checked) {
         imagemLivro.src = 'img/12RulesForLife.jpg';
         isbn = '978-65-5520-057-7';
      } else if (document.getElementById('Saude').checked) {
         imagemLivro.src = 'img/grainBrain.jpg';
         isbn = '978-65-5782-008-7';
      }
   } else if (document.getElementById('Nacional').checked) {
      if (document.getElementById('Ficcao').checked) {
         imagemLivro.src = 'img/oValeDosMortos.jpg';
         isbn = '9788579237799';
      } else if (document.getElementById('Psicologia').checked) {
         imagemLivro.src = 'img/oVendedorDeSonhos.jpg';
         isbn = '9788560096657';
      } else if (document.getElementById('Saude').checked) {
         imagemLivro.src = 'img/umaDietaAlemDaModa.jpg';
         isbn = '978-85-469-0487-7';
      }
   }
   exibirLivro();
}
// resultado da API 3
const exibirDadosLivro = document.getElementById('exibirDadosLivro');
async function exibirLivro() {
   let textoLivro = "<h3>Livro indicado para você</h3><br>";
   const url = 'https://brasilapi.com.br/api/isbn/v1/' + isbn;
   try {
      let resposta = await fetch(url);
      let js = await resposta.json();
      textoLivro = textoLivro + `
        <b>Título:</b> ${js.title} <br>
        <b>Autor(es):</b> ${js.authors.join(', ')} <br>
        <b>Editora:</b> ${js.publisher} <br>
        <b>Categoria:</b> ${js.subjects.join(', ')} <br><br>`;
      exibirDadosLivro.innerHTML = textoLivro;
   } catch (err) {
      console.log(err);
   }
}
// exporta a função do módulo 3
export {
   mudarCapaLivro
};