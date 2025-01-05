﻿"use strict"
var keyPrefix = "frml";
function desfoqueDoFundo(accao) {
    const desfoque = document.querySelector(".desfoque");
    accao === "desfocar" ? 
    desfoque.classList.add("on") :
    desfoque.classList.remove("on");
}
function alertarSobre(msg) {
    const dialogBoxDefault = document.querySelector(".dialog-box-default--small");
    const dialogBoxDefault__console = dialogBoxDefault.querySelector(".dialog-box-default__p--js-console");
    dialogBoxDefault__console.textContent = msg;
    clearInterval(btnAutoCloseLoop);
    let time = 15;
    const btn__outputTime = document.querySelector(".dialog-box-default__output-autoclose-loop");
    btn__outputTime.textContent = `(${time--}s)`;
    btnAutoCloseLoop = setInterval(() => {
        btn__outputTime.textContent = `(${time--}s)`;
        if(time < 0) {
            dialogBoxDefault.classList.remove("--open");
            clearInterval(btnAutoCloseLoop);
        }
    }, 1000);
    dialogBoxDefault.classList.add("--open");
}
function destacarCelulasComConteudoOmisso() {
    const celulas = document.querySelectorAll(".ficha__seccao input");
    let celulasSaturadas = 0;
    for(const c of celulas) {
        c.classList.remove("input--font-small");
        c.classList.remove("input--bg-color-danger");
        if(c.clientWidth < 65) {
            if(c.value.length >= 8 && c.value.length < 10) {
                c.classList.add("input--font-small");
            } else if(c.value.length > 9) {
                c.classList.add("input--bg-color-danger");
                celulasSaturadas++;
            }
        
        } else if(c.clientWidth < 105 && c.value.length > 12){
            c.classList.add("input--bg-color-danger");
            celulasSaturadas++;
        } else if(c.clientWidth < 126 && c.value.length > 15){
            c.classList.add("input--bg-color-danger");
            celulasSaturadas++;
        }
        else if(c.clientWidth < 190 && c.value.length > 24){
            c.classList.add("input--bg-color-danger");
            celulasSaturadas++;
        }
    }
    if(celulasSaturadas > 0) {
        setTimeout(() => {
            const motivoDeSaturacao =  document.querySelector(".artigo__details--motivo-de-celulas-vermelhas");
            menu.abrirArtigo("ajuda");
            motivoDeSaturacao.setAttribute("open", "");
            motivoDeSaturacao.scrollIntoView();
        }, 2500);
    }  
}
function removerDestaqueDeRedCells() {
    const celulas = document.querySelectorAll(".ficha__seccao input");
    for (const c of celulas) c.classList.remove("input--bg-color-danger");
}
const aqd = {
    mostrarAviso() {
        if(!sessionStorage.getItem(`${keyPrefix}-aviso-aqd`)) {
            const avisoDeAQD = document.querySelector(".dialog-box-default--sobre-aqd");
            setTimeout(() => avisoDeAQD.classList.add("--open"), 3000);
        }
    },
    salvarCiencia() {
        sessionStorage.setItem(`${keyPrefix}-aviso-aqd`, `user:aware`);
    }
}
function actualizarAnoDeCopyright() {
    const tempo = new Date();
    let anoActual = tempo.getFullYear();
    if(anoActual < 2024) anoActual = 2024;
    const currentYearOutput = document.querySelector(".footer__current-year");
    currentYearOutput.textContent = anoActual;
}
function animarCaixaDeDialogo(event) {
    const dialogBox = document.querySelector(".dialog-box-esvaziar-ficha");
    if(dialogBox.matches(".--open")) {
        event === "mousedown" ? dialogBox.classList.add("--mexer") 
        : dialogBox.classList.remove("--mexer");
    }
}
function fecharTopoPropaganda(topoPropaganda) {
    const body = document.querySelector("#body");
    topoPropaganda.classList.add("topo-propaganda--off");
    if(!topoPropaganda.matches(".topo-propaganda--festas-felizes")) {
        body.classList.remove("body-com-topo-propaganda");
    }
}
function omitirLinkDesteServicoNoRodape(){
    const servicosAfins = document.querySelectorAll(".footer__nav__link");
    let urlDestaPagina = location.href;
    for (const servico of servicosAfins) {
        if(servico.href === urlDestaPagina) {
            servico.parentElement.hidden = true;
        }
    }
}
let btnAutoCloseLoop;
window.addEventListener("load", () => {
    const readonlyInputs = document.querySelectorAll("[readonly]");
    readonlyInputs.forEach ( inputTarget => inputTarget.addEventListener("click", () => {
        const readonlyInputsMsg = "Os totais estão inacessíveis para assegurar que não sejam modificados.";
        alertarSobre(readonlyInputsMsg);
    }));
    const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
    inputsCelulares.forEach (inputCelular => inputCelular.addEventListener("input", destacarCelulasComConteudoOmisso));
    destacarCelulasComConteudoOmisso();
    actualizarAnoDeCopyright()
    aqd.mostrarAviso();
    const dialogBoxAQD__btn = document.querySelector(".dialog-box-default__btn--aqd");
    dialogBoxAQD__btn.addEventListener("click", aqd.salvarCiencia);
    // Animar Caixa de diálogo "Esvaziar ficha"
    const desfoque = document.querySelector(".desfoque");
    desfoque.addEventListener("mousedown", event => animarCaixaDeDialogo(event.type));
    desfoque.addEventListener("mouseup", event => animarCaixaDeDialogo(event.type));
    // Fechar Topo Propaganda 
    const btnXDetopoProgaganda = document.querySelectorAll(".topo-propaganda__btn");
    btnXDetopoProgaganda.forEach(btn => {
        btn.addEventListener("click", () => fecharTopoPropaganda(btn.parentElement.parentElement));
    });
    // Focar campo de observacoes
    const inputObs = document.querySelector(".obs__input");
    const labelObs = document.querySelector(".obs__label");
    labelObs.addEventListener("click", () => {
        labelObs.parentElement.classList.add("--focus");
        inputObs.focus();
    });
    inputObs.addEventListener("focus", () => inputObs.parentElement.classList.add("--focus"));
    inputObs.addEventListener("focusout", () => inputObs.parentElement.classList.remove("--focus"));
    omitirLinkDesteServicoNoRodape();
});
