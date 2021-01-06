import React from "react"
import '../styles/Mainpage.scss'

import Alliance from "../../public/Alliance.jpg"
import Web from "../../public/Web.jpg"
import CampNou from "../../public/campnou.jpg"
import Borr from "../../public/borr.jpg"

const imagesArr = [Alliance, Web, CampNou, Borr];

class Mainpage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            image: this.generatePath()
        }
    }
    generatePath(){
        return imagesArr[Math.floor(Math.random()*4)]
    }
    render(){
        // let str = this.generatePath();
        return(
            <div class="main">
                Hello, welcome to footgoals! Here you can watch the best goals and rate them, choose a league to start!
                <div class="arena">
                    <img src={this.state.image} alt="Can't load image"/>
                </div>
            </div>
        )
    }
}
export default Mainpage