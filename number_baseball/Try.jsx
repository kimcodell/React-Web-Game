import React, {memo} from "react";

const Try = memo(({tryInfo}) => {   //props는 직접 바꾸면 안됨. 부모가 바꾸거나 state 에 넣어서 setState로 바꿔줘야 함.
    return (
        <>
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        </>
    )
});

export default Try;