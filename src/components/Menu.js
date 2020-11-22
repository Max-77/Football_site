import React from "react"
import {BrowserRouter as Router,
        Switch,
        Route,
        Link} from "react-router-dom";

import '../styles/Menu.scss'
import Mainpage from "./Mainpage"

class Menu extends React.Component{
    render(){
        return(
            <Router>
                <div class="menu">
                    <nav>
                        <Link to="/"><a>Main page</a></Link>
                        <Link to="/rpl"><a>Russian Premier League</a></Link>
                        <Link to="/epl"><a>English Premier League</a></Link>
                        <Link to="/laliga"><a>LaLiga</a></Link>
                        <Link to="/legaseriea"><a>Lega Serie A</a></Link>
                    </nav>
                </div>
                <Switch>
                    <Route path="/">
                        <Mainpage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Menu