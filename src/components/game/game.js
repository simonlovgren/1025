import './game.css';
import React from 'react';


const PUTTSTATE = {
    tbd : 0,
    hit : 1,
    miss : 2
};

function freshState( config, puttState = PUTTSTATE.tbd ){
    return {
        timestamp : (new Date()).toISOString(),
        boardState : [...Array(config.distances.length)].map(() => Array(config.putts*config.rounds).fill(puttState)),
        totalScore : 0
    }
}

export class Game extends React.Component {

    constructor(props) {
        super(props);

        this.config = props.config;

        // Get / Set up state
        let savedState = JSON.parse(localStorage.getItem('gamestate'));
        if (savedState){
            // Need to check that the board size (i.e. config) has not changed in a
            // breaking way.
            if ((savedState.boardState.length == this.config.distances.length) && (savedState.boardState[0].length == (this.config.putts*this.config.rounds))){
                this.state = savedState;
            }
        }
        this.state = this.state || freshState(this.config);
    }

    updateGameState = (newState) => {
        localStorage.setItem('gamestate', JSON.stringify(newState));
        newState.timestamp = (new Date()).toISOString();
        this.setState(newState);
    };

    clickPutt = (event) => {
        const distanceIndex = event.target.dataset.puttindex.split(',')[0];
        const puttIndex = event.target.dataset.puttindex.split(',')[1];
        const puttState = this.state.boardState[distanceIndex][puttIndex];

        switch(puttState)
        {
            case PUTTSTATE.hit:
                this.state.boardState[distanceIndex][puttIndex] = PUTTSTATE.miss;
                break;
            case PUTTSTATE.miss:
                this.state.boardState[distanceIndex][puttIndex] = PUTTSTATE.tbd;
                break;
            default:
                this.state.boardState[distanceIndex][puttIndex] = PUTTSTATE.hit;
                break;
        }
        this.state.totalScore = this.CalculatePoints(this.state);
        this.updateGameState(this.state);
    }

    ResetGame = () => {
        this.updateGameState(freshState(this.config));
    }

    CheckAll = () => {
        let newState = freshState(this.config, PUTTSTATE.hit);
        newState.totalScore = this.CalculatePoints(newState);
        this.updateGameState(newState);
    }

    CalculatePoints = (state) => {
        let sum = 0;
        state.boardState.forEach( (e, distanceIndex) => {
            const distance = this.config.distances[distanceIndex]
            const completeRow = state.boardState[distanceIndex].every(e => e === PUTTSTATE.hit);
            sum += completeRow? distance.distance : 0;

            let bonusPutts = [];
            distance.bonuses.putts.map((index) => {
                bonusPutts.push((index>=0?index:(this.config.rounds*this.config.putts)+index));
            });

            e.forEach((p,index)=>{
                if(p===PUTTSTATE.hit){
                    sum += distance.distance;
                    sum += bonusPutts.includes(index) ? distance.bonuses.value : 0;
                }
            })
        })

        return sum;
    }

    DistanceRow = (props) => {
        const completeRow = this.state.boardState[props.index].every(e => e === PUTTSTATE.hit);
        let rounds = [];
        let puttCount = 0;
        let bonusPutts = [];

        props.distance.bonuses.putts.map((index) => {
            bonusPutts.push((index>=0?index:(props.rounds*props.putts)+index));
        });

        for (let round = 0; round < props.rounds; ++round)
        {
            let putts = []
            for (let putt = 0; putt < props.putts; ++putt)
            {
                let puttIndex = [props.index, puttCount];
                let puttBonus = bonusPutts.includes(puttCount) ? props.distance.bonuses.value : 0;
                let puttClasses = ['putt']
                if (puttBonus > 0)
                {
                    puttClasses.push('bonus');
                }
                let puttState = this.state.boardState[puttIndex[0]][puttIndex[1]];
                switch(puttState){
                    case PUTTSTATE.hit:
                        puttClasses.push('hit');
                        break;
                    case PUTTSTATE.miss:
                        puttClasses.push('miss');
                    default:
                        break;
                }
                putts.push(<div className={puttClasses.join(' ')} data-puttindex={puttIndex} data-puttbonus={puttBonus} onClick={this.clickPutt} key={`putt-${props.index}-${round}-${putt}`}></div>)
                ++puttCount;
            }
            rounds.push(
                <div className="col round" key={`roundcol-${props.index}-${round}`}>
                    {putts}
                </div>
            )
        }
        return (
            <div className={`row distance ${completeRow && 'completed'}`}>
                <div className="col title">
                    <span>{props.distance.distance} <span className="unit">ft</span></span>
                </div>
                {rounds}
            </div>
        )
    }

    render() {

        let rounds = [];
        for (let i = 0; i < this.config.rounds; ++i)
        {
            rounds.push(
                <div className="col round" key={`round-${i}`}>
                    <span>Rd. {i+1}</span>
                </div>
            );
        }

        return (
            <div className="game">
                <div className="board">
                    <div className="row title">
                        <div className="col title">
                        </div>
                        {rounds}
                    </div>

                    {this.config.distances.map((distance, index) => (
                        <this.DistanceRow index={index} key={index} distance={distance} rounds={this.config.rounds} putts={this.config.putts} />
                    ))}

                    <div className="row score">
                        <div className="col">
                            <span>SCORE:</span>
                            <span className="score">{this.state.totalScore}</span>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <a href="#" className="button green" onClick={this.CheckAll}>Check all</a>
                    <a href="#" className="button red" onClick={this.ResetGame}>Reset</a>
                    {/* <a href="#" className="button green">Finish</a> */}
                </div>
            </div>
        )
    }
}
