// ==UserScript==
// @name         Browsing Under Management (BUM)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Browsing Under Management, add password restriction to websites in an array.
// @author       GSRHackZ
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes
// @icon        https://image.flaticon.com/icons/svg/1022/1022331.svg
// @license                  MIT
// @compatible               chrome
// @compatible               firefox
// @compatible               opera
// @compatible               safari
// ==/UserScript==

let on=true,
    restrictAll=false,
    admin="GSRHackZ",
    url=location.href.toLowerCase(),
    body=document.body,
    head=document.head,
    name=location.hostname.charAt(0).toUpperCase()+location.hostname.slice(1),
    unblocked=localStorage.getItem("unblocked")

const restricted=[];


let lowerRestrict=restricted.map(each => {
    return each.toLowerCase();
})

if(on){
    if(restrictAll){
        if(unblocked==null){
            block();
        }
    }

    for(let i=0;i<lowerRestrict.length;i++){
        if(lowerRestrict[i].includes(url)||url.includes(lowerRestrict[i])){
            if(unblocked==null){
                block();

            }
            else{
                if(name.includes("google")){
                    name="This search result"
                }
                let block=confirm(`${admin} please click ok to block ${name} again...`);
                if(block==1){
                    localStorage.removeItem("unblocked");
                    location.reload();
                }
            }
        }
    }
}
function block(){
    body.innerHTML="";
    head.innerHTML=`<title>🚫 Blocked By ${admin} 🚫</title><link href="https://www.flaticon.com/svg/vstatic/svg/3306/3306641.svg?token=exp=1612305826~hmac=b14f3e4182da48258f0eaa5f0a9af5ec" type="image/png">`;
    if(name.includes("google")){
        name="This search result"
    }
    let pwd=prompt(`🚫 ${name} has been blocked by ${admin}...🚫`);
    if(pwd===null||pwd.trim().length==0||pwd!==admin+"Pass"){
        location.reload();
    }
    else if(pwd==admin+"Pass"){
        localStorage.setItem("unblocked",true);
        location.reload();
    }
}


