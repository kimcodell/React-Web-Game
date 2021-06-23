import React, { useRef, useEffect, useCallback, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {

    //어디가 변해서 rerendering 되는지 알 수 있는 방법
    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3] );
    //     console.log(cellData, ref.current[3]);
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});  //action은 맘대로 만들어도 됨. reducer에서 처리만 잘 해주면 됨.
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
})

export default Td;