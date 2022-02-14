import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="app">
            <div className="game">
                <header className="title">
                    1025
                </header>

                <div className="board">

                    <div className="row title">
                        <div className="col title">
                        </div>
                        <div className="col round">
                            <span>Rd. 1</span>
                        </div>
                        <div className="col round">
                            <span>Rd. 2</span>
                        </div>
                        <div className="col round">
                            <span>Rd. 3</span>
                        </div>
                    </div>

                    <div className="row distance">
                        <div className="col title">
                            <span>10 <span className="unit">ft</span></span>
                        </div>
                        <div className="col round">
                            <div className="putt miss bonus"></div>
                            <div className="putt hit"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty bonus"></div>
                        </div>
                    </div>

                    <div className="row distance">
                        <div className="col title">
                            <span>15 <span className="unit">ft</span></span>
                        </div>
                        <div className="col round">
                            <div className="putt hit bonus"></div>
                            <div className="putt hit"></div>
                        </div>
                        <div className="col round">
                            <div className="putt miss"></div>
                            <div className="putt empty"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty bonus"></div>
                        </div>
                    </div>

                    <div className="row distance completed">
                        <div className="col title">
                            <span>20 <span className="unit">ft</span></span>
                        </div>
                        <div className="col round">
                            <div className="putt hit bonus"></div>
                            <div className="putt hit"></div>
                        </div>
                        <div className="col round">
                            <div className="putt hit"></div>
                            <div className="putt hit"></div>
                        </div>
                        <div className="col round">
                            <div className="putt hit"></div>
                            <div className="putt hit bonus"></div>
                        </div>
                    </div>

                    <div className="row distance">
                        <div className="col title">
                            <span>25 <span className="unit">ft</span></span>
                        </div>
                        <div className="col round">
                            <div className="putt miss bonus"></div>
                            <div className="putt hit"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty bonus"></div>
                        </div>
                    </div>

                    <div className="row distance">
                        <div className="col title">
                            <span>30 <span className="unit">ft</span></span>
                        </div>
                        <div className="col round">
                            <div className="putt hit bonus"></div>
                            <div className="putt hit"></div>
                        </div>
                        <div className="col round">
                            <div className="putt miss"></div>
                            <div className="putt empty"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty bonus"></div>
                        </div>
                    </div>

                    <div className="row distance">
                        <div className="col title">
                            <span>35 <span className="unit">ft</span></span>
                        </div>
                        <div className="col round">
                            <div className="putt empty bonus"></div>
                            <div className="putt empty"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty"></div>
                        </div>
                        <div className="col round">
                            <div className="putt empty"></div>
                            <div className="putt empty bonus"></div>
                        </div>
                    </div>

                    <div className="row score">
                        <div className="col">
                            <span>SCORE:</span>
                            <span className="score">290</span>
                        </div>
                    </div>
                </div>

                <div className="controls">
                    <a href="#" className="button red left">New Game</a>
                    <a href="#" className="button green right">Finish</a>
                </div>
            </div>
        </div>
    );
}

export default App;
