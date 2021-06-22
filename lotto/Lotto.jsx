import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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

//Hooks에서는 순서 중요!!
//Hooks는 조건문안에 절·대 넣으면 안됨!!(조건에 따라 순서가 바뀌므로) 웬만하면 함수나 반복문에도 넣으면 안됨!! Hooks안에 Hooks를 넣는 것도 NO!
const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);    //useMemo도 마찬가지로 배열안에 있는 값이 바뀌면 다시 실행. 없으면 처음 한 번만
    //useMemo는 복잡한 함수 결과값을 기억, useRef는 일반 값을 기억
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    //componentDidUpdate만 하고 싶은 경우 꼼수
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if (!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         //하고 싶은 동작
    //     }
    // }, [변하는 값]);

    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 700);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7 * 700)
        return () => {
            timeouts.current.forEach((t) => {
                clearTimeout(t);
            });
        };
    }, [timeouts.current]);     //여기가 빈 배열이면 componentDidMount와 동일. 배열에 요소가 있으면 DidMount랑 DidUpdate 둘 다 실행되는 거
                                //꼭 state가 아니어도 괜찮음.

    //다시하기 버튼 클릭 시 초기 state로 초기화
    const onClickRedo = useCallback(() => {     //useCallback은 함수 자체를 기억해서 rerendering 될 때 함수 재생성 막아줌.
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);
    //여기도 마찬가지로 배열 안의 요소가 바꾸면 함수 갱신.
    //너무 기억을 잘해서 안에 state를 쓰면 state(여기서는 winNumbers)가 바뀌어도 적용이 안됨. 따라서 배열 안에 바뀌는 값을 넣어줘야 함.

    //만약 함수를 자식 컴포넌트에게 props로 전달한다면 반드시 useCallBack으로 감싸줘야 함.
    //render될 때 마다 새 함수가 생성되는데 이러면 자식 컴포넌트에 새로운 함수가 전달되고 자식 컴포넌트도 rerendering되기 때문. 
    
    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">{winBalls.map((v) => <Ball key={v} number={v} />)}</div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}

export default Lotto;