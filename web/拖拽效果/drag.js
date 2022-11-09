 //不考虑滚动条的拖拽
 function drag1(parentId,title){
     let oParent=document.getElementById(parentId);
     let oTitle=oParent.querySelector(title);
     oTitle.onmousedown=function(e){
         let ev=e||Event;
          //clientX,clientY只发生一次，即按下时获取，后就不改变
         let disX=ev.clientX-oParent.offsetLeft;
         let disY=ev.clientY-oParent.offsetTop;
         document.onmousemove=function(e){
            let ev=e||Event;
        //clientX,clientY发生多次，即鼠标移动时获取后就一直改变
            let winWidth=document.documentElement.clientWidth;
            let winHeight=document.documentElement.clientHeight;
            let left=e.pageX-disX;
            let top=e.pageY-disY;
             left=Math.min(Math.max(0,left),winWidth-oParent.offsetWidth);
          top =Math.min(Math.max(top,0),winHeight-oParent.offsetHeight);
            oParent.style.left=left+'px';
            oParent.style.top=top+'px';
        }
        document.onmouseup=function(){
            //鼠标松开
            this.onmouseup=null;
            this.onmousemove=null;
        }
     }

 }
 //考虑滚动条的拖拽
 function drag2(parentId,title){
    let json={scrollLeft:0,scrollTop:0};
    let oParent=document.getElementById(parentId);
    let oTitle=oParent.querySelector(title);
    let winWidth=document.documentElement.clientWidth;
    let winHeight=document.documentElement.clientHeight;
    oTitle.onmousedown=function(e){
        let ev=e||Event;
         //clientX,clientY只发生一次，即按下时获取，后就不改变
        let disX=ev.pageX-oParent.offsetLeft;
        let disY=ev.pageY-oParent.offsetTop;
        document.onmousemove=function(e){
           let ev=e||Event;
       //clientX,clientY发生多次，即鼠标移动时获取后就一直改变
           let left=ev.pageX-disX;
           let top=ev.pageY-disY;
            left=Math.min(Math.max(json.scrollLeft,left),winWidth+json.scrollLeft-oParent.offsetWidth);
         top =Math.min(Math.max(top,json.scrollTop),winHeight+json.scrollTop-oParent.offsetHeight);
           oParent.style.left=left+'px';
           oParent.style.top=top+'px';
 
       }
       document.onmouseup=function(){
           //鼠标松开
           this.onmouseup=null;
           this.onmousemove=null;
       }
    }
document.onscroll=function(){
    let scrollLeft=document.documentElement.scrollLeft;
    let scrollTop=document.documentElement.scrollTop;
    oParent.style.left=(winWidth-oParent.offsetWidth)/2+scrollLeft+'px';
    oParent.style.top=(winHeight-oParent.offsetHeight)/2+scrollTop+'px';
 
     json={scrollLeft,scrollTop};
}
}
//固定定位的拖拽
function drag3(parentId,title){
    
    let oParent=document.getElementById(parentId);
    let oTitle=oParent.querySelector(title);
    let winWidth=document.documentElement.clientWidth;
    let winHeight=document.documentElement.clientHeight;
    oTitle.onmousedown=function(e){
        let ev=e||Event;
         //clientX,clientY只发生一次，即按下时获取，后就不改变
        let disX=ev.pageX-oParent.offsetLeft;
        let disY=ev.pageY-oParent.offsetTop;
        document.onmousemove=function(e){
           let ev=e||Event;
       //clientX,clientY发生多次，即鼠标移动时获取后就一直改变
           let left=ev.pageX-disX;
           left=Math.min(Math.max(0,left),winWidth-oParent.offsetWidth);
           let top=ev.pageY-disY;
           
         top =Math.min(Math.max(top,0),winHeight-oParent.offsetHeight);
           oParent.style.left=left+'px';
           oParent.style.top=top+'px';
       }
       document.onmouseup=function(){
           //鼠标松开
           this.onmouseup=null;
           this.onmousemove=null;
       }
       
    }
    

}
//框内拖拽
function drag4(winId,parentId,title){
    
    let oWin=document.getElementById(winId);
    let oParent=document.getElementById(parentId);
    let oTitle=oParent.querySelector(title);
    let winWidth=oWin.offsetWidth;//外界框
    let winHeight=oWin.offsetHeight;
    oTitle.onmousedown=function(e){
        let ev=e||Event;
         //clientX,clientY只发生一次，即按下时获取，后就不改变
        let disX=ev.clientX-oParent.offsetLeft;
        let disY=ev.clientY-oParent.offsetTop;
        document.onmousemove=function(e){
           let ev=e||Event;
       //clientX,clientY发生多次，即鼠标移动时获取后就一直改变
         
           let left=e.pageX-disX;
           left=Math.min(Math.max(0,left),winWidth-oParent.offsetWidth);
           let top=e.pageY-disY;
           
         top =Math.min(Math.max(top,0),winHeight-oParent.offsetHeight);
           oParent.style.left=left+'px';
           oParent.style.top=top+'px';
       }
       document.onmouseup=function(){
           //鼠标松开
           this.onmouseup=null;
           this.onmousemove=null;
       }
    }

}
//带虚框的拖拽
function drag5(parentId,title){
    let oParent=document.getElementById(parentId);
    let oTitle=oParent.querySelector(title);
    let winWidth=document.documentElement.clientWidth;
    let winHeight=document.documentElement.clientHeight;
    oTitle.onmousedown=function(e){
        let ev=e||Event;
        let disX=ev.clientX-oParent.offsetLeft;
        let disY=ev.clientY-oParent.offsetTop;
        let oBox=document.createElement('div');
        oBox.style.position='absolute';
        oBox.style.width=oParent.offsetWidth+'px';
        oBox.style.height=oParent.offsetHeight+'px';
        oBox.style.left=oParent.offsetLeft+'px';
        oBox.style.top=oParent.offsetTop+'px';
        oBox.style.border='1px dashed red';
        console.log(oParent.offsetLeft)
        document.body.appendChild(oBox);
        document.onmousemove=function(e){
           let ev=e||Event;
           let left=e.pageX-disX;
           left=Math.min(Math.max(0,left),winWidth-oParent.offsetWidth);
           let top=e.pageY-disY;
           
         top =Math.min(Math.max(top,0),winHeight-oParent.offsetHeight);
           oBox.style.left=left+'px';
           oBox.style.top=top+'px';
           return false;
       }
       document.onmouseup=function(){
           //鼠标松开
           oParent.style.left=oBox.offsetLeft+'px';
           oParent.style.top=oBox.offsetTop+'px';
           document.body.removeChild(oBox)
           this.onmouseup=null;
           this.onmousemove=null;
       }
    }

}
 
