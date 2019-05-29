/**
|--------------------------------------------------
| All the interfaces!!
|--------------------------------------------------
*/

export type Dispatch = React.Dispatch<IAction>

export interface IState {
    episodes: Array<any>,
    favourites: Array<any>,
}


export interface IAction {
    type: string,
    payload: any[]
}

export interface IEpisodeProps {
    episodes: any[],
    store: { state: IState, dispatch: Dispatch },
    toggleFavAction: (state: IState, dispatch: Dispatch, episode: any) => IAction,
    favourites: any[]
}