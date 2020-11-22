import React, {Component} from "react";

import Menu from './Menu'
import '../styles/App.scss'
class App extends Component{
    render() {
        return(
            <div class="app">
                <Menu />
            </div>
        );
    }
}

export default App;