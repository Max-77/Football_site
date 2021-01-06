import React from "react"
import "../styles/Rpl.scss"

import goal1 from "../../back/assets/public/videos/RPL/video1.webm"
import goal2 from "../../back/assets/public/videos/RPL/video2.webm"
import ico from "../../public/rpl_ico.jpeg"
const videos = [goal1, goal2];
const name_videos=["video1", "video2"]
let str = "/api/rate?name="
const host = "http://localhost:8080/api/getVideo?league=RPL&videoName="

class Rpl extends React.Component{
    constructor(props){
        super(props);
        let arrState=[true,true];
        let i;
        for (i=0;i<2;i++){
            arrState[i]=true
            if(localStorage.getItem(String(i))==="false"){
                arrState[i]=false;
            }
        }
        this.state = {
            rating: ["",""],
            isShow: arrState
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState(state=>{
            const rating = state.rating.map((elem) => {
                elem = event.target.rating;
                return elem;
            });

            return {rating};
        })
    };

    setShow=i=>{
        if (this.state.rating[i] === ""){
            alert("Field can not be empty!")
            return;
        }
        localStorage.setItem(String(i),"false");
    };

    display() {
        return(
                <div className="video">
                    {this.state.isShow.map((item, i) => (
                    <div key={item}>
                    {/*<video src={videos[i]} controls poster={ico}/>*/}
                    <video src={host+name_videos[i]} controls poster={ico} />
                    <form method="POST" action={str+name_videos[i]} id={'form_id_'+i}>
                        <div className="rating">
                            <input type="radio"
                                   id={"star-5-"+i}
                                   name={"user_rating"}
                                   value="5"
                                   onChange={this.handleChange}/>
                            <label htmlFor={"star-5-"+i} title="Оценка «5»"> </label>
                            <input type="radio"
                                   id={"star-4-"+i}
                                   name={"user_rating"}
                                   value="4"
                                   onChange={this.handleChange}/>
                            <label htmlFor={"star-4-"+i} title="Оценка «4»"> </label>
                            <input type="radio"
                                   id={"star-3-"+i}
                                   name={"user_rating"}
                                   value="3"
                                   onChange={this.handleChange}/>
                            <label htmlFor={"star-3-"+i} title="Оценка «3»"> </label>
                            <input type="radio"
                                   id={"star-2-"+i}
                                   name={"user_rating"}
                                   value="2"
                                   onChange={this.handleChange}/>
                            <label htmlFor={"star-2-"+i} title="Оценка «2»"> </label>
                            <input type="radio"
                                   id={"star-1-"+i}
                                   name={"user_rating"}
                                   value="1"
                                   onChange={this.handleChange}/>
                            <label htmlFor={"star-1-"+i} title="Оценка «1»"> </label>
                        </div>
                        {
                            item === true ?
                            <div className="button">
                                <input type="Submit"
                                       id={"sub_id_" + i}
                                       onClick={() => this.setShow(i)}
                                       value="Rate!"/>
                            </div>
                            :null
                        }
                    </form>

                    </div>
                    ))}
                </div>

        )
    }

    render() {
        return(
            <div className="rpl">
                Here, you can see the best goals from Russian Premier League
                {this.display()}
            </div>
        )
    }
}
export default Rpl

