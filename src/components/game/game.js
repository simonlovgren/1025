import './game.css';
import React from 'react';

const config = {
    putts : 2,
    rounds : 3,
    distances : [
        {
            distance : 10,
            bonuses : {
                value: 5,
                putts: [0, -1]
            }
        },
        {
            distance : 15,
            bonuses : {
                value: 5,
                putts: [0, -1]
            }
        },
        {
            distance : 20,
            bonuses : {
                value: 5,
                putts: [0, -1]
            }
        },
        {
            distance : 25,
            bonuses : {
                value: 5,
                putts: [0, -1]
            }
        },
        {
            distance : 30,
            bonuses : {
                value: 10,
                putts: [0, -1]
            }
        },
        {
            distance : 35,
            bonuses : {
                value: 10,
                putts: [0, -1]
            }
        }
    ]
}

const PUTTSTATE = {
    tbd : 0,
    hit : 1,
    miss : 2
};

export class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boardState : [...Array(config.distances.length)].map(() => Array(config.putts*config.rounds).fill(PUTTSTATE.tbd)),
            totalScore : 0
        }
        console.log(this.state.boardState);
        console.log(this.state);
    }

    clickPutt = (event) => {
        const distanceIndex = event.target.dataset.puttindex.split(',')[0];
        const puttIndex = event.target.dataset.puttindex.split(',')[1];
        const puttState = this.state.boardState[distanceIndex][puttIndex];

        console.log(distanceIndex);
        console.log(puttIndex);
        console.log(puttState);
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
        console.log(this.state);
        this.setState(this.state);
        this.CalculatePoints()
    }

    ResetGame =() => {
        
        this.state = {
            boardState : [...Array(config.distances.length)].map(() => Array(config.putts*config.rounds).fill(PUTTSTATE.tbd)),
            totalScore : 0
        }
        this.setState(this.state);
    }
    CalculatePoints = () => {
        
        let sum = 0;
        this.state.boardState.forEach( (e, distanceIndex) => {
            const distance = config.distances[distanceIndex]
            const completeRow = this.state.boardState[distanceIndex].every(e => e === PUTTSTATE.hit);            
            sum += completeRow? distance.distance : 0;            
            
            let bonusPutts = [];        
            distance.bonuses.putts.map((index) => {
                bonusPutts.push((index>=0?index:(config.rounds*config.putts)+index));
            });
            
            e.forEach((p,index)=>{
                if(p===PUTTSTATE.hit){
                    sum += distance.distance;
                    sum += bonusPutts.includes(index) ? distance.bonuses.value : 0;
                }
            })
        })

        this.state.totalScore = sum;
        this.setState(this.state);
        //Kolla på alla i griden, calculera.
        //Kalla på efter klick.
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
                putts.push(<div className={puttClasses.join(' ')} data-puttindex={puttIndex} data-puttbonus={puttBonus} onClick={this.clickPutt}></div>)
                ++puttCount;
            }
            rounds.push(
                <div className="col round">
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
        for (let i = 0; i < config.rounds; ++i)
        {
            rounds.push(
                <div className="col round">
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

                    {config.distances.map((distance, index) => (
                        <this.DistanceRow index={index} key={index} distance={distance} rounds={config.rounds} putts={config.putts} />
                    ))}

                    <div className="row score">
                        <div className="col">
                            <span>SCORE:</span>
                            <span className="score">{this.state.totalScore}</span>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <a href="#" className="button red" onClick={this.ResetGame}>New Game</a>
                    {/* <a href="#" className="button green">Finish</a> */}
                </div>
            </div>
        )
    }
}
