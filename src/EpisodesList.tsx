import React from 'react'
import { Store } from './Store'

export default function EpisodesList(props: any): Array<JSX.Element> {
    // const { state, dispatch } = React.useContext(Store)
    const { episodes, favourites, toggleFavAction } = props

    return (


        episodes.map(episode => {
            return episode.image ?
                (
                    <section key={episode.id} className="episode-box">
                        <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
                        <div>{episode.name}</div>
                        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Seasion: {episode.season} Number: {episode.number}</div>
                            <button type="button" onClick={() => toggleFavAction(episode)} style={{ backgroundColor: favourites.includes(episode) ? "RED" : "GREEN" }}> {favourites.includes(episode) ? "Delete FAV" : "ADD FAV"}</button>
                        </section>
                    </section>
                ) :
                (
                    <div key={episode.id}></div>
                )
        })


    )

}
