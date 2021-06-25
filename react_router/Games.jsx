import React, {} from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
//해쉬 라우터는 # 뒷부분에 대해 서버가 전혀 모름. 그래서 새로고침을 해도 정상적으로 출력이 되긴하지만 서버가 모르기 때문에 SEO에 좋지 않음.

import NumberBaseball from '../number_baseball/NumberBaseball';
import WordRelay from '../word_relay/WordRelay';
// import RSP from '../RSP/RSP';
// hooks에서는 컴포넌트를 불러올 때 해당 컴포넌트와 메인 컴포넌트에 import React가 둘 다 존재하면 충돌이 남.

const Games = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/word-relay">끝말잇기</Link>  {/*이 주소는 가상의 주소이므로 직접 주소창에 입력하면 cannot get 뜸. 해결 꼼수: 웹팩 config의 devServer안에 historyApiFallback: true 넣기 */}
                &nbsp;
                <Link to="/numbber-baseball">숫자야구</Link>
            </div>
            <div>
                <Route path="/word-relay" component={WordRelay}></Route>
                <Route path="/number-baseball" component={NumberBaseball}></Route>
                {/* <Route path="/lotto" component={Lotto}></Route> */}
                <Route path="/game/:name" component={GameMatcher}></Route>
                {/* 라우트가 연결되어 있으면 컴포넌트로 props(history, match, location)가 전달됨. 
                    라우트가 연결 안되있을 때는 withRouter를 쓰면 props 얻을 수 있음.
                    history는 이전 페이지 등에 대한 정보가 있음. 리액트는 페이지 하나로 눈속임하는 것이기 때문에 기본 브라우저 api가 아닌 history를 이용해야.
                    
                    switch 
                */}

            </div>
        </BrowserRouter>
    );
}

export default Games;