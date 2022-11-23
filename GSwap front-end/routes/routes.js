import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from "../App";
import Lottery from "../pages/Lottery";
// import App from "../App";

export default function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={Lottery}/>
            <Route path="/pot" exact component={Lottery}/>
            {/* <Route path="/bio" exact component={Bio}/> */}
                
        </Switch>
    )
}