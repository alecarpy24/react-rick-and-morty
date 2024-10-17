import { useEffect, useState } from 'react'
import { Character } from './Character';

function NavPage(props) {
    return (
        <header className='d-flex justify-content-between align-items-center'>
            <p>Page: {props.page}</p>
            <button 
                className='btn btn-primary btn-sm'
                onClick={() => {
                    if (props.page < props.charactersLimit) {
                        props.setPage(props.page + 1);
                    }
                }}
                disabled={props.page >= props.charactersLimit}
            >
                {props.page >= props.charactersLimit ? "No more pages" : `Page ${props.page + 1}`}
            </button>
        </header>
    );
}



function CharacterList() {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [charactersLimit, setCharactersLimit] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            const data = await response.json();
            setLoading(false);
            setCharacters(data.results);
            setCharactersLimit(data.info.pages);


        }
        fetchData();
    }, [page]);

    return (
        <div className='container'>
            <NavPage charactersLimit={charactersLimit} page={page} setPage={setPage} />

            {
                loading ? (<h1>Loading</h1>)
                    : (
                        <div className="row">
                            {characters.map((character) => {
                                return (

                                    <div className='col-md-4' key={character.id} >
                                        <Character character={character} /></div>


                                );
                            })}
                        </div>
                    )}
            <NavPage charactersLimit={charactersLimit} page={page} setPage={setPage} />
        </div>
    )
}

export { CharacterList }
