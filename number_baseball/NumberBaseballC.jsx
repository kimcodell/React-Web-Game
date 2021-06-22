import React, { Component, createRef } from "react";
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

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        const {result, value, tries} = this.state;
        e.preventDefault();
        if(value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: value, result: '홈런!'}],
                }
            })
            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
            this.inputRef.current.focus();
        } else {    //답 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { //10번 넘게 틀렸을 때 
                this.setState({
                    result: `시도 횟수 10번 초과! 답은 ${answer.join(',')}였습니다~`,
                })
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
            } else {
                for (let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}],
                        value: '',
                    }
                });
                this.inputRef.current.focus();
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({value: e.target.value})
    };

    inputRef = createRef();

    render() {
        const {result, value, tries} = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} ref={this.inputRef} value={value} onChange={this.onChangeInput} /> {/* value와 onChange는 항상 쌍으로. onChange 안 쓰면 defaultValue로 써야 함.*/}
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
}

export default NumberBaseball; //import 쓸때는 export default