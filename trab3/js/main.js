// importa da API 1
import {
    iniciarAPI1
 } from './api1.js';
 // inicializa API 1
 iniciarAPI1();
 
 // importa da API 2
 import {
    buscaFeriados
 } from './api2.js';
 // inicializa API 2
 buscaFeriados();
 
 // importa da API 3
 import {
    mudarCapaLivro
 } from './api3.js';
 // inicializa API 3 com listeners dos radios
 document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="seletor1"]').forEach(radio => {
       radio.addEventListener('change', mudarCapaLivro);
    });
    document.querySelectorAll('input[name="seletor2"]').forEach(radio => {
       radio.addEventListener('change', mudarCapaLivro);
    });
 });
 
 // importa da API 4
 import {
    ocuparArray
 } from './api4.js';
 // inicializa API 4
 ocuparArray();