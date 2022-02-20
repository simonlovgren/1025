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
        view: '1025',
        cbMode: false
    };

    constructor(props) {
        super(props);

        let savedState = JSON.parse(localStorage.getItem('appstate'));
        this.state = savedState || this.state;
    }

    saveState = (newState) => {
        localStorage.setItem('appstate', JSON.stringify(newState));
        this.setState(newState);
    }

    toggleCBMode = (event) => {
        this.state.cbMode = !this.state.cbMode;
        this.saveState(this.state);
    }

    setView = (event) => {
        this.state.view = event.target.dataset.view;
        this.saveState(this.state);
    };

    renderView(view){
        switch(view){
            case '1025':
            default:
                return <Game config={configRegular} />;
        }
    }

    render(){
        return (
            <div className={`app ${this.state.cbMode && 'cb-mode'}`}>
                <div className="main">
                    <header className="title">
                        <span>1025</span>
                    </header>
                    {this.renderView(this.state.view)}
                    <div className="linklist">
                        <a href="https://www.jbdg.se/1025putt/" target="_blank">You can find the rules by clicking me!</a>
                    </div>
                </div>
                <div id="cb-mode" className={`${this.state.cbMode && 'active'}`} onClick={this.toggleCBMode}/>
            </div>
        );
    }
}

export default App;
