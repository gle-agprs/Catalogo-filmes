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
     
    /*const temaSalvo = localStorage.getItem("botaoTema");

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
});*/

document.addEventListener("DOMContentLoaded", () => {
        const botaoTema = document.getElementById("botaoTema");
                const temaSalvo = localStorage.getItem("tema");
                    if (temaSalvo === "claro") {
                            document.body.classList.add("tema-claro");
                    if(botaoTema) botaoTema.checked = true;
                                        }

                     if(botaoTema){
                  botaoTema.addEventListener("change", () => {

                     if(botaoTema.checked){
                     document.body.classList.add("tema-claro");
                     localStorage.setItem("tema","claro");
                    }else{
                     document.body.classList.remove("tema-claro");
                                                                                                                                            localStorage.setItem("tema","escuro");
                                                                                                                                                        }

                                                                                                                                                                });
                                                                                                                                                                    }

                                                                                                                                                                    });
})

