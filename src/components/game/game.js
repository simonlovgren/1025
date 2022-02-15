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

export class Game extends React.Component {

    constructor(props) {
        super(props);
    }


    DistanceRow(props){
        let rounds = [];
        let puttCount = 0;

        let bonusPutts = [];
        props.distance.bonuses.putts.map((index) => {
            console.log(index);
            bonusPutts.push((index>=0?index:(props.rounds*props.putts)+index));
        });
        console.log(bonusPutts);

        for (let round = 0; round < props.rounds; ++round)
        {
            let putts = []
            for (let putt = 0; putt < props.putts; ++putt)
            {
                let puttIndex = [props.index, puttCount];
                let puttBonus = bonusPutts.includes(puttCount) ? props.distance.bonuses.value : 0;
                putts.push(<div className={`putt ${puttBonus>0?"bonus":""}`} data-putt-index={puttIndex} data-putt-bonus={puttBonus}></div>)
                ++puttCount;
            }
            rounds.push(
                <div className="col round">
                    {putts}
                </div>
            )
        }
        return (
            <div className="row distance">
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
                        <this.DistanceRow index={index} distance={distance} rounds={config.rounds} putts={config.putts} />
                    ))}

                    <div className="row score">
                        <div className="col">
                            <span>SCORE:</span>
                            <span className="score">290</span>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <a href="#" className="button red">New Game</a>
                    <a href="#" className="button green">Finish</a>
                </div>
            </div>
        )
    }
}
