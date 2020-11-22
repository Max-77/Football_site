import React from "react"
import '../styles/Mainpage.scss'

const imagesArr = ['Alliance.jpg', 'borr.jpg', 'campnou.jpg', 'Web.jpg'];

class Mainpage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            image: this.generatePath()
        }
    }
    generatePath(){
        return '../public/' + imagesArr[Math.floor(Math.random()*4)]
    }
    render(){
        let str = this.generatePath();
        return(

            <div class="main">
                Hello, welcome to footgoals! Here you can watch the best goals and rate them, choose a league to start!
                <div class="arena">
                    <img src={this.state.image}/>
                    <div className="picture">
                        <img src="../public/player.jpg"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Mainpage