function hua(){
    console.log(0);
let oDiv=document.createElement('div');
oDiv.id='hua';
for(let i=0;i<20;i++){
    let oSection=document.createElement('section');
    oDiv.appendChild(oSection)
}
document.body.appendChild(oDiv);
let aSection=oDiv.querySelectorAll('section');
document.onmousemove=function(ev){
    let e=ev || Event
    for(let i=aSection.length-1;i>0;i--){
        aSection[i-1].style.width=aSection[i].offsetWidth+1+'px';
        aSection[i-1].style.height=aSection[i].offsetHeight+1+'px';
        aSection[i].style.left=aSection[i-1].offsetLeft+'px';
        aSection[i].style.top=aSection[i-1].offsetTop+50+'px';

    }
    aSection[0].style.left=e.pageX+'px';
    aSection[0].style.top=e.pageY+20+'px';
    }
}