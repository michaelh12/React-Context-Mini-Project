import React, { Fragment, useContext } from 'react';
import ReactDom from 'react-dom';
import { StoreProvider, Store } from './Store';
import './index.css';
import { Link, Router, RouteComponentProps } from '@reach/router';
import HomePage from './HomePage';
import FavPage from './FavPage';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent

export default function App(props: any): JSX.Element {

    const { state } = React.useContext(Store);


    return (
        <React.Fragment>
            <header className="header">
                <div>
                    <h1 className="text">Rick and Morty</h1>
                    <p>Pick your favourite episode!!!</p>
                </div>
                <div id="link-head-container">
                    <Link to='/' id="home-link">Home</Link>
                    <Link to='/faves' id="faves-link">Favourite(s): {state.favourites.length} </Link>
                </div>
            </header>

            {props.children}

        </React.Fragment>
    )
}

const root = document.getElementById('app-root');

ReactDom.render(
    <StoreProvider>
        <Router>
            <App path='/' >
                <RouterPage pageComponent={< HomePage />} path='/' />
                <RouterPage pageComponent={<FavPage />} path='/faves' />
            </App>
        </Router>
    </StoreProvider >,
    root);