"use strict"
const referencia = {
    retornarLinhaEcoluna(inputTarget) {
        const linhaOutput = document.querySelector(".reference__output--indicador");
        const colunaOutput = document.querySelector(".reference__output--idade");
        const celulaComFocoEirmas = inputTarget.parentElement.children;
        // Seccoes
        let isSection2 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--2");
        let isSection3 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--3");
        let isSection4 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--4");
        let isSection5 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--5");
        let tituloDaSeccao = inputTarget.parentElement.parentElement.children[0].textContent;
        if(isSection3) {
            let subtituloDaSeccao = inputTarget.parentElement.dataset.subtitulo;
            tituloDaSeccao = `${tituloDaSeccao}: ${subtituloDaSeccao}`
        }
        let linha = inputTarget.parentElement.children[0].textContent;
        let colVariables, inputTargetIndex;
        for(let i = 0; i < celulaComFocoEirmas.length; i++) {
            if(celulaComFocoEirmas[i] === inputTarget) inputTargetIndex = i - 1;
        }
        if(isSection2) {
            colVariables = document.querySelectorAll(".seccao-2__header__exames span");
        } else if(isSection4) {
            colVariables = document.querySelectorAll(".ficha__seccao__header--seccao-4 span");
        } else if(isSection5) {
            colVariables = document.querySelectorAll(".ficha__seccao__header--seccao-5 span");
        } else {
            colVariables = document.querySelectorAll(".linha-de-faixas-etarias--seccao-1 span");
        }
        linhaOutput.innerHTML = `${tituloDaSeccao}: ${linha}`;
        colunaOutput.innerHTML = colVariables[inputTargetIndex].textContent;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            if(!inputCelular.matches("[readonly]")) {
                referencia.retornarLinhaEcoluna(inputCelular);
            }
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;