// ==UserScript==
// @name         PopCat Click Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       HKquiet
// @match        https://popcat.click/
// @icon         https://www.google.com/s2/favicons?domain=popcat.click
// @grant        none
// ==/UserScript==
var div = document.createElement('div');
div.style.position = 'absolute';
div.style.fontSize = '25px';
div.style.height = "300px"
div.style.top = "100px";
div.style.left = '50px';
document.body.appendChild(div);
var count = 0;
var s = 0;
var m = 0;
var h = 0;
var res = null;
var clickmode = true;
const click = new KeyboardEvent("keydown", {
    bubbles: true, cancelable: true, keyCode: 19
});
const click1 = new KeyboardEvent("keyup", {
    bubbles: true, cancelable: true, keyCode: 19
});
(function() {
    if (clickmode) {//change mode
        setInterval(clickLoop, 39);
    } else {
        document.dispatchEvent(click);
        document.dispatchEvent(click1);
        div.innerHTML = "<div>運行時間: "+h+"h"+m+"m"+s+"s</div>";
        setInterval(apiLoop,30000);
    }
    setInterval(timer, 1000);
})();

function timer() {
    s += 1;
    if (s == 60) {
        s = 0;
        m += 1;
        if (m == 60) {
            m = 0;
            h += 1;
        };
    };
    if (!clickmode) {
        if (res == null) {
            div.innerHTML = '<div>運行時間: '+h+'h'+m+'m'+s+'s</div><div style="color:red">第1輪api請求可能會出錯</div>';
        } else if (res == 201) {
            div.innerHTML = '<div>運行時間: '+h+'h'+m+'m'+s+'s</div><div style="color:green">第'+count+'輪api請求:成功</div>';
        } else if (res == 429) {
            div.innerHTML = '<div>運行時間: '+h+'h'+m+'m'+s+'s</div><div style="color:red">第'+count+'輪api請求:失敗</div>';
        } else {
            div.innerHTML = '<div>運行時間: '+h+'h'+m+'m'+s+'s</div><div style="color:grey">第'+count+'輪api請求:'+res+'</div>';
        };
    };
};
function clickLoop() {
    document.dispatchEvent(click);
    document.dispatchEvent(click1);
    count += 1;
    let avg = "";
    if ((count/(s+((m*60)+(h*3600))))>(800/30)) {
        avg = '<div style="color:red">(平均每秒'+Math.round(count/(s+((m*60)+(h*3660))))+'Pops[Overload!!])</div>';
    } else {
        avg = '<div style="color:green">(平均每秒'+Math.round(count/(s+((m*60)+(h*3600))))+'Pops)</div>';
    };
    div.innerHTML = "<div>運行時間: "+h+"h"+m+"m"+s+"s</div><div>Pop次數: " + count + "Pops"+avg+"</div>";
};
function apiLoop() {
    document.dispatchEvent(click);
    document.dispatchEvent(click1);
    fetch('https://stats.popcat.click/pop?pop_count=799&captcha_token=1',{method:'POST'})
        .then(response => {count += 1;res = response.status;});
};
