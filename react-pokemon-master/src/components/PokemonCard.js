

const PokemonCard = ({ pokemon }) => {

    if (!pokemon.hasOwnProperty('name')) {
        return <div>There is no data</div>
    }

    return ( 
        <div className="pokemon_card">
            <img className="img" src={pokemon.sprites.other.dream_world.front_default} alt='icon'/>
            <h1 className="title">{pokemon.name}</h1>

            <div className="flex-stat">
                {pokemon.stats.map((item, i) =>
                    <div key={i} className='flex-item'>
                        <span>{item.stat.name}</span>
                        <span>{item.base_stat}</span>
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default PokemonCard;