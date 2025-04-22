const tela = document.querySelector(".pokeDex_tela")
const nome = document.querySelector(".pokeDex_nome")
const exibirHabilidades = document.querySelector(".pokeDex_habilidade")
const btnProximo = document.querySelector(".pokeDex__btn-proximo")
const btnAnterio = document.querySelector(".pokeDex__btn-anterior")
let numeroDeId = 1;
async function proximo(numeroDeId) {
    try {
        const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroDeId}`);
        const dados = await poke.json();

        nome.textContent = `${dados.name}`;
        tela.innerHTML = `<img src="./img/pokemons/poke_${numeroDeId}.gif"/>`;
        exibirHabilidades.innerHTML = '';
        habilidesPokemon(numeroDeId)

    } catch (error) {
        nome.textContent = `${error}:pokemon nao pode ser exibido`;
        console.log(error)
    }
}

async function habilidesPokemon(idHabilidade) {
    const habilidades = await fetch(`https://pokeapi.co/api/v2/pokemon/${idHabilidade}`)
    const habilidadesUrl = await habilidades.json()
    try {
        habilidadesUrl.abilities.forEach((pokemonAbilites) => {
            const criaP = document.createElement("p")
            exibirHabilidades.appendChild(criaP)
            criaP.innerHTML = `<h3>Habilidade</h3>${pokemonAbilites.ability.name}`

        })
    } catch (error) {
        console.log(`${error}:Habilidades nao podem ser exibidas`)
    }
}

btnProximo.addEventListener("click", () => {
    if (numeroDeId < 706) {
        numeroDeId++
        proximo(numeroDeId)
    }
})

btnAnterio.addEventListener("click", () => {
    if (numeroDeId > 1) {
        numeroDeId--
        proximo(numeroDeId)
    }
})
proximo(numeroDeId)








