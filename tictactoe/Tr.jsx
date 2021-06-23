import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>)}
        </tr>           /* useMemo로 컴포넌트를 감싸서 컴포넌트를 기억해버릴 수도 있음. */
    );
})

export default Tr;