import React from "react"
import "../styles/Best.scss"
const leagueNames = ['Russian Premier League']

import ico_rpl from "../public/rpl_ico.jpeg"
const host = "http://localhost:3000/api/getVideo?league="

class Best extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bestRpl: {name: "video1",
                      rating: "0",
                      count: "0"},
            arrRpl: [0,0,0,0,0]
        }
    }
    componentDidMount() {
        fetch("/api/getMaxRpl")
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
                        <video src={host+"RPL&videoName="+this.state.bestRpl.name} poster={ico_rpl} controls/>
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
}
export default Best