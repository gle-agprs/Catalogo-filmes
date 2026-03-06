const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const filmesGrid = document.getElementById("filmesGrid");
const inicio = document.getElementById("inicio");
const filmes = document.getElementById("filmes");
const series = document.getElementById("series");

async function requisicaoURL(url){
 try {
    const response =await fetch(url);
    if(!response.ok){
        throw new Error("erro na requisição");
    }
    const data = await response.json();
    renderizarMidia(data.results);
 } catch (error){
    console.error("Erro:", error);
    filmesGrid.innerHTML = `<p>Erro ao carregar filmes.</p>`;
 }
}


const botaoTema = document.getElementById("botaoTema");

botaoTema.addEventListener("change", () => {
    document.body.classList.toggle("tema-claro");
});


function renderizarMidia(filmes){
    filmesGrid.innerHTML = "";
    if(!filmes || filmes.length === 0) {
        filmesGrid.innerHTML = `<p>Nenhum filme encontrado.</p>`;
        return;
    } 
filmes.forEach(filme => {
        const card = document.createElement("div");
        card.classList.add("card");
        const imagem = filme.poster_path
            ? IMAGE_URL + filme.poster_path
            : "";
        let media_type = "movie";
            if(filme.title){
                card.innerHTML = `
                <img src ="${imagem}" alt="${filme.title}">
                <h3>${filme.title}</h3>
                `;
                media_type = "movie";                ;
            }else{
                card.innerHTML = `
                <img src ="${imagem}" alt="${filme.name}">
                <h3>${filme.name}</h3>
            `;
            media_type = "tv";
            }
            card.addEventListener("click", () => {
                window.location.href = `pages/detalhes.html?id=${filme.id}&type=${media_type}`
        });
    filmesGrid.appendChild(card);
    });
}


/*funcao para buscar filmes*/
function pesquisaGeral(){
    const informacao = campoPesquisa.value.trim();
    if (informacao === ''){
        carregarTendenciasGeral();
        return;
    }
    console.log("pesquisando por:", informacao);
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-BR`;
    requisicaoURL(url);
    campoPesquisa.value = '';
}

/*filtrar por genero*/
async function carregarGeneros (tipo = "movie") {
    const response = await fetch (
        `${BASE_URL}/genre/${tipo}/list?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    const select = document.getElementById("filtroGenero");
    select.innerHTML = '<option value = ""> Todos </option>';
    data.genres.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.id;
        option.textContent = genero.name;
        select.appendChild(option);
        
    });
}
/*filtrar por genero*/
function filtrarPorGenero() {
    const generoId = document.getElementById("filtroGenero").
    value;
    if (!generoId) {
        carregarTendenciasGeral();
        return;
    }
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${generoId}&language=pt-BR`;
    requisicaoURL(url);
}


/*carregar tendencias*/
function carregarTendenciasGeral(){
    const url= `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}
botaoPesquisa.addEventListener('click', pesquisaGeral);
campoPesquisa.addEventListener('keypress', function (event) { 
    if (event.key=== 'Enter'){
        pesquisaGeral();
    }
});
function buscaFilme(){
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}
function buscaSerie(){
    const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}


document.addEventListener("DOMContentLoaded", carregarTendenciasGeral);
inicio.addEventListener("click", carregarTendenciasGeral);
filmes.addEventListener("click", buscaFilme);
series.addEventListener("click", buscaSerie);

window.addEventListener("load", function(){
    const loader = this.document.getElementById("loader");
    if (loader){
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        setTimeout(function(){
            loader.style.display = "none";
        }, 500);
    }
});


document.addEventListener("DOMContentLoaded", () =>{
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");    
    if (tipo==="filme"){
        buscaFilme();
    }else if (tipo==="serie"){
        buscaSerie();
    }else {
        carregarTendenciasGeral();
    }
    carregarGeneros();
    document.getElementById("filtroGenero").addEventListener("change", filtrarPorGenero);
});
