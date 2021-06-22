import React, { useRef, useState } from "react";
import Try from './Try';

function getNumbers() {     //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수 
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++) {
        const choosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(choosen);
    }
    console.log(array);
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputEl = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}]
            });
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        } else {    //답 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { //10번 넘게 틀렸을 때
                setResult(`시도 횟수 10번 초과! 답은 ${answer.join(',')}였습니다~`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputEl.current.focus();
            } else {
                for (let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}]
                });
                setValue('');
                inputEl.current.focus();
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} ref={inputEl} value={value} onChange={onChangeInput} /> {/* value와 onChange는 항상 쌍으로. onChange 안 쓰면 defaultValue로 써야 함.*/}
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
                    )
                })}
            </ul>
        </>
    )
}

export default NumberBaseball; //import 쓸때는 export default