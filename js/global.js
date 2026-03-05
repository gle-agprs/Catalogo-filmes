document.addEventListener("DOMContentLoaded", function (){
    const inicio = document.getElementById("inicio");
    const filmes = document.getElementById("filmes");
    const series = document.getElementById("series");
    inicio.addEventListener("click", function(e){
        window.location.href = "/index.html";
    });
    filmes.addEventListener("click", function(e){
        window.location.href = "/index.html?tipo=filme";
    });
    series.addEventListener("click", function(e){
        window.location.href = "/index.html?tipo=serie";
    });
     
    const temaSalvo = localStorage.getItem("botaoTema");

    if (temaSalvo === "claro") {
        document.body.classList.add("tema-claro");
        if (checkbox) checkbox.checked = true;
    }

    if (checkbox) {
        checkbox.addEventListener("change", () => {
            document.body.classList.toggle("tema-claro");

            const temaAtual = document.body.classList.contains("tema-claro")
                ? "claro"
                : "escuro";

            localStorage.setItem("tema", temaAtual);
        });
    }
});
