//根据标签名称进行事件代理
function agent1(parentId,eventType,label,fun){
  let oParent=document.getElementById(parentId);
  label=label.toUpperCase();
    oParent['on'+eventType]=function(ev){
        let e=ev || Event;
        e.stopPropagation();
        let child=e.targe || e.srcElement;
        while(child.nodeName!==label && child.nodeName!==oParent.nodeName){
            child=child.parentNode;
        }
        if(child.nodeName===label){
            fun.call(child);
        }
    }
}
//根据className进行事件代理
function agent2(parentId,eventType,className,fun){
    let oParent=document.getElementById(parentId);
    oParent['on'+eventType]=function(ev){
        let e=ev||Event;
        let child=e.targe||e.srcElement;
        while(child.className!==className&& child.nodeName!==oParent.nodeName){
            child=child.parentNode;
        }
        // console.log(oTarget.nodeName);
        if(child.className===className){
            fun.call(child);
        }
    }
}
//根据classList进行事件代理
// function agent3(parentId,eventType,className,fun){
//     let oParent=document.getElementById(parentId);
//     oParent['on'+eventType]=function(ev){
//         let e=ev||Event;
//         let child=e.targe||e.srcElement;
//         while(child.classList.contains(className)&& child.nodeName!==oParent.nodeName){
//             child=child.parentNode;
//         }
//         // console.log(oTarget.nodeName);
//         if(child.classList.contains(className)){
//             fun.call(child);
//         }
//     }
// }
function agent3(parentId,eventType,className,fun){
    let oParent=document.getElementById(parentId);
    
    oParent['on'+eventType]=function(ev)
    {
        let e=ev||Event;
        let child=e.target||e.srcElement;
        while(!child.classList.contains(className)&&child.nodeName!==oParent.nodeName){
            child=child.parentNode;
        }
        if(child.classList.contains(className)){
            fun.call(child)
        }

    }
}
function clearCls(parentId,label,className){
    let oParent=document.getElementById(parentId);
    let aLabel=oParent.querySelectorAll(label);
    for(let i=0;i<aLabel.length;i++){
        if(aLabel[i].className===className){
            aLabel[i].className="";
            break;
        }
    }
}