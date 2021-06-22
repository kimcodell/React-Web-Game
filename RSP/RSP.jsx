import React, { useState, useRef, useEffect } from 'react';

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

//                      result    imgCoord    score
// componentDidMount  
// componentDidUnmount
// componentWillUpdate

const RSP = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const interval = useRef();

    useEffect(() => {   //componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님.)
        interval.current = setInterval(changeHand, 100);
        return () => {  //이 안의 return 함수는 componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]); //이 배열에 넣은 값들이 바뀔 때 useEffect가 실행됨.

    //손 바뀌는 함수
    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
          setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
          setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
          setImgCoord(rspCoords.바위);
        }
    };

    //버튼 클릭할 때 실행 함수
    const onClickBtn = (choice) => () => {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
          const myScore = scores[choice];
          const cpuScore = scores[computerChoice(imgCoord)];
          const diff = myScore - cpuScore;
          if (diff === 0) {
            setResult('비겼습니다!');
          } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
          } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
          }
          setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
          }, 1500);
        }
      };

    return (
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
}

export default RSP;