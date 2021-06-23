import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState =  { //최초의 state 생성. 이후 state 변경은 직접 말고 reducer로 하는 거!!
    winner: '',
    turn: 'O',
    tableData: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell: [-1, -1],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'SET_TURN'
export const RESET_GAME = 'RESET_GAME'

const reducer = (state, action) => {    //어떤 action일 때 어떤 동작을 수행할지 기술. 보통 type은 상수로 빼놓음.
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,   //state를 직접 바꾸면 안됨. (state.winner = action.winner NO!!)
                winner: action.winner,
            };
        case CLICK_CELL: {  //중괄호 지워도 됨. 가독성 위해 쓴 거
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell: [-1, -1],
            }
        }
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);    //세번째 인자도 있긴 함. useReducer는 비동기적으로 state가 바뀜. 리덕스는 동기적
    const { tableData, turn, winner, recentCell } = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableDate, setTableDate] = useState([['','',''], ['','',''], ['','','']]);

    // const onClickTable = useCallback(() => {
    //     dispatch({type: SET_WINNER, winner: 'O'})
    // }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
        win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
        win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
        win = true;
        }
        if (win) {  //승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME }); //dispatch 안에 있는게 action 객체고, dispatch는 action 객체를 실행하는 거. dispatch 할 때마다 reducer가 실행됨.
        } else {
            //무승부 검사
            let all = true;     //칸이 다 차있다는 것은 무승부하는 뜻
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell) {
                        all = false;
                    }
                })
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({type: CHANGE_TURN});  //턴 변경
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    )

}

export default TicTacToe;