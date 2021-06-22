import React, {Component} from 'react';

//클래스의 경우
//constructor -> render -> ref -> componentDidMount -> 
//(setState/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
//부모가 나를 없앨 때 componenetWillUnmount -> 소멸

const rspCoords = {
    바위: '0px',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: rspCoords.바위,
    };

    interval;

    componentDidMount() {   //첫 render가 성공적으로 실행되면 실행됨. rerendering이 일어날 때는 실행되지 않음. 주로 비동기 요청 많이
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() {            //컴포넌트가 제거되기 직전에 수행(부모가 나를 없앨 때). DidMount가 하던 것을 제거. 비동기 요청 정리
        clearInterval(this.interval);
    }

    // componentDidUpdate() {}          //rerendering 후에는 DidUpdate가 실행됨.

    //손 바뀌는 함수
    changeHand = () => {
        const {imgCoord} = this.state;          //비동기 함수가 밖에 있는 변수를 참조하면 클로저 문제 발생
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    //버튼 클릭했을 때 함수
    onClickBtn = (choice) => () => {    //고차함수 패턴
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1,
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1,
                }
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2500);
    };

    render() {
        const { result, score, imgCoord } = this.state
        return(
            <>
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;