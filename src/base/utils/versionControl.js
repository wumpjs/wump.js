import fetch from "node-fetch";




const versionControl = async(warnMessage) => {
    const thisVersion = require("../../../package.json").version
    const latestVersion = await fetch("https://registry.npmjs.com/wump.js").then((data) => data["dist-tags"].latest)
    if(thisVersion !== latestVersion){
        console.log(warnMessage)
    } else {
        return;
    }
}


export default versionControl
