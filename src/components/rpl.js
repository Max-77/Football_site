import React from "react"
import "../styles/Rpl.scss"
const mainPath = '../public/video/RPL/'

import goal1 from "../../public/video/RPL/video1.webm"
import goal2 from "../../public/video/RPL/video2.webm"

const videos = [goal1, goal2];
const name_videos=["video1", "video2"]
let i = 0;
let str = "/rate?name="
const list = videos.map((video) =>
    <div class="video">
    <video src={video} controls/>
    <form method="POST" action={str+name_videos[i]}>
        <div className={"rating"+i}>
            <input type="radio" id="star-5" name="user_rating" value="5"/>
            <label htmlFor="star-5" title="Оценка «5»"></label>
            <input type="radio" id="star-4" name="user_rating" value="4"/>
            <label htmlFor="star-4" title="Оценка «4»"></label>
            <input type="radio" id="star-3" name="user_rating" value="3"/>
            <label htmlFor="star-3" title="Оценка «3»"></label>
            <input type="radio" id="star-2" name="user_rating" value="2"/>
            <label htmlFor="star-2" title="Оценка «2»"></label>
            <input type="radio" id="star-1" name="user_rating" value="1"/>
            <label htmlFor="star-1" title="Оценка «1»"></label>
        </div>
        <div class="button">
            <input type="Submit"/>
        </div>
    </form>
        {i++}
    </div>
)

class Rpl extends React.Component{
    render() {
        return(
            <div class="rpl">
                Here, you can see the best goals from Russian Premier League
               {list}
            </div>
        )
    }
}
export default Rpl