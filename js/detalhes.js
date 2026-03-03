const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const detalhesContainer = document.getElementById ("detalhesContainer");

const params =  new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

const inicio = document.getElementById("inicio");

if (inicio) {
    inicio.addEventListener("click", () => {
        window.location.href = "../index (1).html";
    });
}
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

const botaoTema = document.getElementById("botaoTema");
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");
});

const body = document.body;
async function carregarDetalhes() {
    if (!id || !type) {
        detalhesContainer.innerHTML = "<p> Conteúdo inválido</p>";
        return;
    }

try {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`
    );
    if (!response.ok) {
        throw new Error("Erro na API");
    }
    const data = await response.json();

    /*variavel trailer*/
    const trailerUrl = await buscarTrailer(id, type);

    renderizarDetalhes(data, trailerUrl);
} catch (error) {
    detalhesContainer.innerHTML = "<p>Erro ao carregar detalhes.</p>";
    console.error(error);
    }  
    
}

function renderizarDetalhes(item, trailerUrl){
    const imagem = item.poster_path
    ? IMAGE_URL + item.poster_path
    : "";
    const titulo = item.title || item.name;
    const dataLancamento = item.release_date || item.first_air_date;
    document.title = titulo;
    detalhesContainer.innerHTML = `
    <div class = "detalhes-card">
        <img src = "${imagem}" alt = "${titulo}">
        <div class = "detalhes-info">
        <h2>${titulo}</h2>
        <p> Data: ${dataLancamento || "nao disponivel"}<br>
        Nota: ${item.vote_average}<br>
        ${item.tagline}<br>
        ${item.overview}</p>
        
        <div class = "botao-trailer">
         ${trailerUrl 
                    ? `<a href="${trailerUrl}" target="_blank" class="botao-trailer">▶️Assistir Trailer</a>` 
                    : `<p>Trailer não disponível.</p>`
                }
                </div>
        </div>
    </div>
    `;
}




/*aqui a criança chora e  a mae nao ve😈*/
async function buscarTrailer(id, type) {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=pt-BR`
    );

    const data = await response.json();

    const trailer = data.results.find(
        video => video.site === "YouTube" && video.type === "Trailer"
    );

    if (trailer) {
        return `https://www.youtube.com/watch?v=${trailer.key}`;
    } else {
        return null;
    }
}

document.addEventListener("DOMContentLoaded", carregarDetalhes);

