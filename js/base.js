var g = function(id){ return document.getElementById(id);}
var getBodyW = function(){ return document.body.offsetWidth; };
var getBodyH = function(){ return document.body.offsetHeight; };
var getElTop = function(el){ return el.offsetTop+170; };




var list = {};  

data.sort(function(a,b){
    return new Date(a.date).getTime() > new Date(b.date).getTime();
})

for (var i = data.length - 1; i >= 0; i--) {

    var date = new Date(data[i].date);
    var year  = date.getFullYear();
    var month = date.getMonth()+1;
    var lunar = GetLunarDateString( date );

    if( !list[year] ){ list[year] = {}; }
    if( !list[year][month] ){ list[year][month] = []; }

    var item = data[i];
    item.lunar = lunar[0]+'<br>&nbsp;&nbsp;&nbsp;'+lunar[1];
    

    list[year][month].push( item );
};



var html_scrubber = [];
var html_content  = [];


var tplsyear = g('tplsyear').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
var tplsmonth = g('tplsmonth').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');

var tplcyear = g('tplcyear').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
var tplcmonth = g('tplcmonth').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');


for (year in list) {

    var scrubber_month = [];
    var content_month = [];

    var isLeft = 0;

    for (month in list[year]) {
        scrubber_month.unshift(  tplsmonth.replace(/\{year\}/g,year).replace(/\{month\}/g,month) );

        for (var i = list[year][month].length - 1; i >= 0; i--) {
            var item = list[year][month][i];

            isLeft = isLeft ^ 1;
            content_month.unshift(
                ( (i==0) ?  '<div class="clear c_month" id="c_month_'+year+'_'+month+'"></div>'   : '' ) + tplcmonth.replace(/\{year\}/g,year).replace(/\{month\}/g,month)
                    .replace(/\{lunar\}/g,item.lunar)
                    .replace(/\{date\}/g,item.date)
                    .replace(/\{intro\}/g,item.intro)
                    .replace(/\{media\}/g,item.media)
                    .replace(/\{like\}/g,item.like)
                    .replace(/\{comment\}/g,item.comment)
                   
            ) ;
        };

    };
    html_scrubber.unshift( tplsyear.replace(/\{year\}/g,year).replace(/\{list\}/g,scrubber_month.join('') ) );

    html_content.unshift( tplcyear.replace(/\{year\}/g,year).replace(/\{list\}/g,content_month.join('') )  );
};


g('scrubber').innerHTML = '<a href="javascript:;" onclick="scrollTopTo(0)">现在</a>'+html_scrubber.join('')+'<a href="javascript:;" onclick="scrollTopTo(getBodyH())">开始</a>';
g('content').innerHTML = html_content.join('')+ tplcyear.replace(/\{year\}/g,'开始').replace(/\{list\}/g,'')+'<div class="clear c_month" id="c_month_0_0"></div>'  ;



var  scrollTopTo = function( to ){
    var start =  document.body.scrollTop;
    fx( function( now , type ){  window.scroll(0,now); },start ,to );
}



var expandScrubber = function( year,elem ){

    var years  = document.getElementsByClassName('s_year');
    var months = document.getElementsByClassName('s_month');

    var year_months = document.getElementsByClassName(year+'_month');

  
    for (var i = years.length - 1; i >= 0; i--) {
        years[i].className = 's_year';
    };

   
    for (var i = months.length - 1; i >= 0; i--) {
        months[i].style.display = 'none';
    };

   
    for (var i = year_months.length - 1; i >= 0; i--) {
        year_months[i].style.display = 'block';
    };

   
    elem.className = 's_year cur';
}


var highlightMonth = function( year , month , elem ){

    var months = document.getElementsByClassName(year+'_month');
    for (var i = months.length - 1; i >= 0; i--) {
        months[i].className = months[i].className.replace('cur','');

    };
    elem.className = elem.className+' cur';
}


var showYear = function(year,elem){
    expandScrubber(year ,elem);
    var top = getElTop( g('contentyear'+year) );
    scrollTopTo( top );
    
}


var showMonth = function( year , month ,elem ){
    var top = getElTop( document.getElementsByClassName('content_date_'+year+''+month)[0] );
    highlightMonth( year , month , elem );
    scrollTopTo( top );
}



var updateScrubberOnTop = function( top ){

    var years  = g('content').getElementsByClassName('c_year');
    var tops = [];

    for (var i = 0; i <years.length ; i++) {
        tops.push( years[i].offsetTop );
    };

    for(var i = 1; i <tops.length ; i++){

        if( top > tops[i-1] && top < tops[i] ){

            var year = years[i-1].innerHTML;

            expandScrubber(year,g('sc'+year));
            return ;
        }
    }

}


var updateMonthOnTop = function( top ){

    var months  = g('content').getElementsByClassName('c_month');
    var tops = [];

    for (var i = 0; i <months.length ; i++) {
        tops.push( months[i].offsetTop );
    };

    for(var i = 1; i <tops.length ; i++){

        if( top > tops[i-1] && top < tops[i] ){

            var info  = months[i-1].id.split('_');
            var year  = info[2];
            var month = info[3];
            highlightMonth( year , month , g('scrubber_month_'+year+month) );

            return ;
        }
    }
}

//  滚动条事件处理; 定位时间
window.onscroll = function(){

    var top = document.body.scrollTop ;

    if( top > 200){
        g('scrubber').style.position = 'fixed';
        g('scrubber').style.left = (getBodyW()-960)/2+ 'px';
        g('scrubber').style.top  = '60px';
    }else{
        g('scrubber').style.position = '';
        g('scrubber').style.left =     '';
        g('scrubber').style.top  =     '';
    }

 
    updateScrubberOnTop( top );
    updateMonthOnTop( top );
}

//  窗口改变事件处理; 保持时序列表的位置
window.onresize = function(){
    window.onscroll();
}

//  动画函数
var fx = function( fn , begin , end ){

   
    fx.easeOut = function(t,b,c,d){
        return -c *(t /= d)*(t-2) + b;
    }

    var options = arguments[3] || {};
    var duration = options.duration || 500;
    var ease = options.ease || fx.easeOut;

    startTime = new Date().getTime();

    (function(){
        setTimeout(function(){
            timestamp = new Date().getTime() - startTime;
            fn( ease( timestamp,begin, ( end - begin),duration) , 'step' );

            if(duration <= timestamp){
                fn( end , 'end' );
            }else{
                setTimeout(arguments.callee,25);
            }
        },25)
    })();
}