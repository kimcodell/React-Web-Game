import React, {Component} from "react";
import Ball from "./Ball"

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);   //오름차순 정렬
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),    //당첨 숫자들
        winBalls: [],
        bonus: null,    //보너스 공
        redo: false,
    }

    timeouts = [];

    //타임아웃 실행 함수
    runTimeouts = () => {
        const {winNumbers} = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 700);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7 * 700)
    }

    componentDidMount() {
        this.runTimeouts();
    }

    //만약 부모 컴포넌트에 의해 제거되는 경우 타임아웃 제거
    componentWillUnmount() {
        this.timeouts.forEach(t => clearTimeout(t));
    }

    //다시하기 버튼 클릭 시 다시 setTimeout 실행
    componentDidUpdate(prevProps, prevState) {
        if (this.winBalls.length === 0) {   //
            this.runTimeouts();
        }
    }

    //다시하기 버튼 클릭 시 초기 state로 초기화
    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        })
        this.timeouts = [];
    };

    render () {
        const {winBalls, bonus, redo} = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">{winBalls.map((v) => <Ball key={v} number={v} />)}</div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;