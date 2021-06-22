import React, { useRef, useState } from "react";

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);       //state는 바뀌면 render가 다시 되지만 ref는 바뀌어도 render 되지 않음.
    const startTime = useRef();         //화면이 바뀔 필요는 없지만 값은 바뀌는 것들은 ref에 넣음. (Hooks에서만)
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.')
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);    //2~3초 사이 랜덤
        } else if (state === 'ready') { //성급하게 클릭한 경우
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {return [...prevResult, endTime.current - startTime.current]});
        }
    }

    const onReset = () => setResult([]);

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>{message}</div>
            {
                result.length === 0 ? 
                null : 
                <>
                    <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                    <button onClick={onReset}>리셋</button>
                </>
            }
            {/* {(() => {})()} {}안에 즉시 실행 함수를 써서 if,for 사용할 수 있긴 함.*/}
            {/* 배열 안에 jsx나 태그를 담아서 return 해도 화면에 그려짐. 잘 쓰지는 않음.*/}
        </>
    )

}

export default ResponseCheck;