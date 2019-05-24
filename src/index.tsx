import React, { Fragment, useContext } from 'react';
import ReactDom from 'react-dom';
import { StoreProvider } from './Store';
import { Store } from './Store';

export default function App(): JSX.Element {
    const URL = 'http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'

    const { state, dispatch } = React.useContext(Store);

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction();
    })

    const fetchDataAction = async () => {
        const data = await fetch(URL);
        const dataJSON = await data.json();
        dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON._embedded.episodes
        });
    }

    console.log('from inside component', state)

    return (
        <React.Fragment>
            <h1>Rick and Morty</h1>
            <p>Pick your favourite episode!!!</p>
            <section>
                {state.episodes.map(episode => {
                    return (
                        <section key={episode.id}>
                            {console.log('from inside map', episode)}
                            <img src={episode.image ? episode.image.medium : null} alt={`Rick and Mort ${episode.name}`} />
                            <div>{episode.name}</div>
                            <section>
                                Seasion: {episode.season} Number: {episode.number}
                            </section>
                        </section>
                    )
                })}
            </section>
        </React.Fragment>
    )
}

const root = document.getElementById('app-root');

ReactDom.render(
    <StoreProvider>

        <App />
    </StoreProvider >,
    root);