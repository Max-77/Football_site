import React from "react"
import "../styles/Best.scss"
const leagueNames = ['Russian Premier League']

import goal1 from "../../public/video/RPL/video1.webm"
import goal2 from "../../public/video/RPL/video2.webm"
import ico_rpl from "../../public/rpl_ico.jpeg"
const videos = [goal1, goal2];
const name_videos=["video1", "video2"]

class Best extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bestRpl: {name: "",
                      rating: "",
                      count: ""},
            arrRpl: [0,0,0,0,0]
        }
    }
    componentDidMount() {
        fetch("/maxrpl")
            .then(res=>res.json())
            .then((result)=>{
                let tmp_arr = [0,0,0,0,0];
                let num = Math.round(Number(result.rating));
                let i=0;
                while(num){
                    tmp_arr[i]=1
                    i++
                    num--
                }
                this.setState({
                    bestRpl: {name: result.name,
                        rating: result.rating,
                        count: result.count},
                    arrRpl: tmp_arr
                })
            },
            (err)=>{this.setState({name:"video1", rating:"0"})
        })
    }

    render() {
        return(
            <div className="best">
                Here, you can see best rated goals!
                {leagueNames.map((item,index)=>(
                    <div key={item}>
                        {index+1} - {item}
                        <div className="video">
                        <video src={this.getVideoRpl(this.state.bestRpl.name)} poster={ico_rpl} controls/>
                        <div className="counts">This video was voted by {this.state.bestRpl.count} people</div>
                        <div className="stars">And has rating {Math.floor(Number(this.state.bestRpl.rating)*10)/10}
                            <div className="rating-result">
                                {this.state.arrRpl[0] ? <span class="active"> </span> : <span> </span>}
                                {this.state.arrRpl[1] ? <span class="active"> </span> : <span> </span>}
                                {this.state.arrRpl[2] ? <span class="active"> </span> : <span> </span>}
                                {this.state.arrRpl[3] ? <span class="active"> </span> : <span> </span>}
                                {this.state.arrRpl[4] ? <span class="active"> </span> : <span> </span>}

                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    getVideoRpl(str){
        if (str.match(/video/)) {
            let i
            for (i=0;i<2;i++){
                if (name_videos[i]===str)
                    break;
            }
            return videos[i];
        }
    }
};
export default Best