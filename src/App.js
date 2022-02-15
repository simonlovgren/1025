import './App.css';
import React from 'react';

// Components
import {Game} from './components/game/game';
import {History} from './components/history/history';

/** Entrypoint */

class App extends React.Component {
    state = {
        view: 'game'
    };

    setView = (view) => {
        this.state.view = view;
        this.setState(this.state);
    };

    renderView(view){
        switch(view){
            case 'history':
                return <History/>;
            case 'game':
                default:
                return <Game/>;
        }
    }

    render(){
        return (
            <div className="app">
                <div className="main">
                    <header className="title">
                        1025
                    </header>
                    {this.renderView(this.view)}
                </div>
            </div>
        );
    }
}

export default App;
