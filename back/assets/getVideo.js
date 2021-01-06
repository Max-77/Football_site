const {Router} = require('express')
const getVideo = Router();

const fs = require("fs");
const path = require("path");

// example of request: /api/getVideo?league=[RPL/..]&videoName=[video0..video9]
getVideo.get('/api/getVideo', (req,res)=>{
    let leagueName = req.query.league;
    let videoName = req.query.videoName;
    res.sendFile("public/videos/"+leagueName+"/"+videoName+".webm", { root: __dirname })
})

module.exports = getVideo;