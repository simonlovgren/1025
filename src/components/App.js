import './App.css';
import React from 'react';

// Components
import {Game} from './game/game';
import {History} from './history/history';

// Game configs
import configRegular from '../config/c1.json';

/** Entrypoint */

class App extends React.Component {
    state = {
        view: '1025'
    };

    setView = (view) => {
        this.state.view = view;
        this.setState(this.state);
    };

    renderView(view){
        switch(view){
            case 'history':
                return <History/>;
            case '1025':
            default:
                return <Game config={configRegular}/>;
        }
    }

    render(){
        return (
            <div className="app">
                <div className="main">
                    <header className="title">
                        1025
                    </header>
                    {this.renderView(this.state.view)}
                    <div className="linklist">
                        <a href="https://www.jbdg.se/1025putt/" target="_blank">You can find the rules by clicking me!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
