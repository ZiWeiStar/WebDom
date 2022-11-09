//获取属性
function getstyle(obj,attr){
    if(obj.currenstyle){
        return obj.currenstyle[attr];

    }
    else{
        return getComputedStyle(obj,false)[attr]
    }
}
//匀速运动

function moveTo1(obj,attr,iTarget,step){
    clearInterval(obj.timer);
    let now=parseInt(getstyle(obj,attr));
    if (iTarget-now<0)step=-step;
    obj.timer=setInterval(function(){
        
        now=parseInt(getstyle(obj,attr));
        if(Math.abs(now-iTarget)<Math.abs(step)){
            console.log(now-iTarget);
            obj.style[attr]=iTarget+'px';
            clearInterval(obj.timer)
        }
        else{
            obj.style[attr]=now+step+'px';
        }
    },30)
}
function moveTo2(obj,iTarget){
    clearInterval(obj.timer);
    let step=0.01;
    let curopacity=parseFloat(getstyle(obj,'opacity'));
    if(iTarget-curopacity<0)step=-step;
    obj.timer=setInterval(function(){
        curopacity=parseFloat(getstyle(obj,'opacity'));
    
    if(Math.abs(iTarget-curopacity)<Math.abs(step)){
        obj.style.opacity=iTarget;
        clearInterval(obj.timer);
    }
    else{
        obj.style.opacity=curopacity+step;
    }
},30)
}
//缓冲运动
function moveTo3(obj,attr,iTarget,sudu,fun){
    clearInterval(obj.timer);
    let now;
    obj.timer=setInterval(function(){
    now=parseInt(getstyle(obj,attr));
    let step=(iTarget-now)/sudu;
    step=step>0?Math.ceil(step):Math.floor(step);
    if(now==iTarget){
        clearInterval(obj.timer);
        if(fun)fun();//如果函数存在就执行；

        
    }
    else{
        obj.style[attr]=now+step+'px';
    }
},30)
}
//缓冲运动透明度
function moveTo4(obj,iTarget,sudu,fun){
    clearInterval(obj.timer);
    let now;
    obj.timer=setInterval(function(){
    now=parseInt(getstyle(obj,'opacity')*100);
    let step=(iTarget-now)/sudu;
    step=step>0?Math.ceil(step):Math.floor(step);
    if(now==iTarget){
        clearInterval(obj.timer);
        if(fun)fun();//如果函数存在就执行；

        
    }
    else{
        obj.style.opacity=(now+step)/100;
    }
},30)
}
//缓冲运动多值非透明度
function moveTo5(obj,many,sudu,fun){
    clearInterval(obj.timer);
   
    let now;
    obj.timer=setInterval(function(){
        let biaozi=true;
        for(let attr in many){
            if(attr=='opacity'){
                now=getstyle(obj,'opacity')*100;
                 let step=(many.opacity*100-now)/sudu;
                 step=step>0?Math.ceil(step):Math.floor(step);
                 if(now!==many.opacity*100){
         
                     biaozi=false;
                     obj.style.opacity=((now+step)/100).toFixed(2);
                     
    }
            }
            else{
                now=parseInt(getstyle(obj,attr));
                let step=(many[attr]-now)/sudu;
                step=step>0?Math.ceil(step):Math.floor(step);
                if(now!==many[attr]){
                    biaozi=false; 
                    obj.style[attr]=now+step+'px';
                }
            }
        
            //now=parseInt(getstyle(obj,attr));
   
    
    }
        if(biaozi){
        clearInterval(obj.timer);
        if(fun)fun();//如果函数存在就执行； 
    }
     
},30)
}

   