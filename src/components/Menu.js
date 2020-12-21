import React from "react"
import {HashRouter as Router,
        Switch,
        Route,
        Link} from "react-router-dom";

import '../styles/Menu.scss'
import Mainpage from "./Mainpage"
import Rpl from "./rpl"
import Best from "./Best"

class Menu extends React.Component{
    render(){
        return(
            <Router>
                <div class="menu">
                    <nav>
                        <Link to="/"><a>Main&nbsp;page</a></Link>
                        <Link to="/rpl"><a>Russian&nbsp;Premier&nbsp;League</a></Link>
                        <Link to="/epl"><a>English&nbsp;Premier&nbsp;League</a></Link>
                        <Link to="/laliga"><a>LaLiga</a> </Link>
                        <Link to="/legaseriea"><a>Lega&nbsp;Serie&nbsp;A </a></Link>
                        <Link to="/best"><a>See&nbsp;best&nbsp;rated&nbsp;goals</a></Link>
                    </nav>
                </div>
                <Switch>
                    <Route path="/rpl">
                        <Rpl />
                    </Route>
                    <Route path="/best">
                        <Best />
                    </Route>
                    <Route path="/">
                        <Mainpage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Menu