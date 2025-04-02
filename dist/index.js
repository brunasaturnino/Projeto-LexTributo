"use strict";
// Espera o carregamento completo do DOM
window.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector("h1");
    if (titulo) {
        titulo.textContent = "Lextributo rodando com TypeScript! 🚀";
    }
    else {
        console.error("Elemento <h1> não encontrado!");
    }
});
