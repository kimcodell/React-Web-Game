const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('시작');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value.length < 2) {
            setResult('두글자 이상 단어를 입력하세요.');
            setValue('');
            inputRef.current.focus();
        } else {
            if (word[word.length - 1] === value[0]) {
                setResult('딩동댕~');
                setWord((prevWord) => {
                    return value;
                })
                setValue('');
                inputRef.current.focus();
            } else {
                setResult('땡!');
                setValue('');
                inputRef.current.focus();
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }
    
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" value={value} ref={inputRef} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;