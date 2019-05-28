import React, { Fragment, useContext } from 'react';
import ReactDom from 'react-dom';
import { StoreProvider, Store } from './Store';
import { IAction } from './interfaces';
import './index.css';
// import EpisodeList from './EpisodesList';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));



export default function App(): JSX.Element {
    const URL = 'http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'

    const { state, dispatch } = React.useContext(Store);


    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction();
    })

    const fetchDataAction = async () => {
        const data = await fetch(URL);
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON._embedded.episodes
        });
    }

    const toggleFavAction = (episode): IAction => {
        const episodeInFav = state.favourites.includes(episode);
        let dispatchObj = {
            type: 'ADD_FAV',
            payload: episode
        }
        if (episodeInFav) {
            const favWithoutEpisode = state.favourites.filter(fav => fav.id !== episode.id);
            dispatchObj = {
                type: 'REMOVE_FAV',
                payload: favWithoutEpisode
            }
        }
        return dispatch(dispatchObj);
    }


    const props = {
        episodes: state.episodes,
        toggleFavAction,
        favourites: state.favourites
    }

    console.log(state)

    return (
        <React.Fragment>
            <header className="header">
                <div>
                    <h1 className="text">Rick and Morty</h1>
                    <p>Pick your favourite episode!!!</p>
                </div>
                <div>
                    Favourite(s): {state.favourites.length}
                </div>
            </header>
            <React.Suspense fallback={<div>...loading</div>}>
                <section className="episode-layout">
                    <EpisodeList {...props} />
                </section>
            </React.Suspense>
        </React.Fragment>
    )
}

const root = document.getElementById('app-root');

ReactDom.render(
    <StoreProvider>

        <App />
    </StoreProvider >,
    root);