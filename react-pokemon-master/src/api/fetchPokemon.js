import axios from "axios"

export const fetchPokemon = async (name) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return res.data
}

export const fetchAllPokemons = async (from, till) => {

    const result = []
    for (let i = from; i <= till; i++) {
       const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
       result.push(data.data)
    }

    return result
}


const obj = {
    John: 19,
    Smith: 20,
    Islam: 20,
}

// [ {name: Islam, age: 20}, ...]