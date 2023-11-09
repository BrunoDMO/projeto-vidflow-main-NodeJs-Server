//Pra usar nodejs, para API dos videos
//https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?_gl=1*148j2xj*_ga*MTY2MDU5NzczNy4xNjkxODU1NjM1*_ga_1EPWSW3PCS*MTY5ODQzNDg2NS40NS4wLjE2OTg0MzQ4NjUuMC4wLjA.*_fplc*SW9VYjdWRGxNbjZ1bnNwJTJCTE9KVzVXdUpCckNwNHpEbTg0UXF3bjNSbEJUeFkwZTE2UmtSRyUyRkhqR2RNV0pvbG84MDVCb1pWJTJGMjk4VDR2bE5MQ2dJb1JBaG5pYUwyYURqSUVORDByb0lIS0pIa1M5cGVIT1dzTEhjZVVqY2JRJTNEJTNE
//npm install -g json-server
//json-server --watch backend/videos.json

const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json(); // .then((res) => res.json())

        videos.forEach((video) => {
            if (video.categoria == "") { // erro personalizado
                throw new Error('Video não tem categoria');
            }
            containerVideos.innerHTML += `
                <li class ="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>   
                    <div class ="descricao-video">
                        <img class ="img-canal" src="${video.imagem} alt = "logo do canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
        })
        // .catch((error)=>{
        //     containerVideos.innerHTML = `
        //     <p> Houve um erro ao carregar os videos: ${error}</p>
        //     `
        // })
    } catch (error) {
        containerVideos.innerHTML = `
        //     <p> Houve um erro ao carregar os videos: ${error}</p>
        //     `
    }
    // finally {
    //     //alert('isso sempre acontece');
    // }
}

buscarEMostrarVideos();

//Filtro
const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

//filtro por categoria
const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for (let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }

}










// function filtrarPesquisa() {
//     const videos = document.querySelectorAll(".videos__item")

//     if (barraDePesquisa.value != "") {
//         for (let video of videos) {
//             let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();// pega apenas o conteudo em texto do titulo (textContent) e tudo em caixa baixa(toLowerCase).
//             let valorFiltro = barraDePesquisa.value.toLowerCase();

//             if (!titulo.includes(valorFiltro)) { // se os videos não tiverem o titulo de pesquisa então some
//                 video.style.display = "none";
//             } else { // se tiver o titulo que esta sendo pesquisado então mostra
//                 video.style.display = "block";
//             }
//         }
//     } else {
//         video.style.display = "block";
//     }
// }