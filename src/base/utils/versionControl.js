import { fetch, FetchResultTypes } from '@sapphire/fetch';




const versionControl = async(warnMessage) => {
    const thisVersion = require("../../../package.json").version
    const latestVersion = await fetch("https://registry.npmjs.com/wump.js", FetchResultTypes.JSON).then((data) => data["dist-tags"].latest)
    if(thisVersion !== latestVersion){
        console.log(warnMessage)
    } else {
        return;
    }
}


export default versionControl
