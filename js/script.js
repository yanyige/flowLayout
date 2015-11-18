/**
 * Created by yyg on 2015/11/18.
 */
window.onload = function(){

    waterfall();
    var dataInt = {data:[{"src":"1.jpg"} , {"src":"2.jpg"} , {"src":"3.jpg"} , {"src":"4.jpg"} , {"src":"5.jpg"} , {"src":"6.jpg"}, {"src":"7.jpg"} , {"src":"8.jpg"}]};

    window.onscroll = function(){
        if(checkScorllTop()){
            var wrapper = document.getElementById("wrapper");
            for(var i = 0 ; i < dataInt.data.length ; i ++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                var oImg = document.createElement('div');
                oImg.className = 'img';
                var img = document.createElement('img');
                img.setAttribute('src', 'image/' + dataInt.data[i].src);
                oBox.appendChild(oImg);
                oImg.appendChild(img);
                wrapper.appendChild(oBox);
                waterfall();
            }
        }
    }

    function waterfall(){
        var wrap = document.getElementById("wrapper");
        var boxs = getElementByClass(wrap , 'box');//获取父元素内部名为box的元素
        var viewWidth = document.documentElement.clientWidth;//获取视口宽度
        var bWidth = boxs[0].offsetWidth;//获取一个box的宽度
        var cols = Math.floor(viewWidth / bWidth);//得到一行有多少列
        var harr = [];

        wrap.style.cssText = "width:"+bWidth*cols+"px;margin: 0 auto;"

        for(var i = 0 ; i < boxs.length ; i ++){
            if(i < cols){
                harr.push(boxs[i].offsetHeight);
            }
            else{
                var minHeight = getMinHeight(harr);
                var index = getIndex(harr , minHeight);
                boxs[i].style.cssText = "position:absolute";
                boxs[i].style.top = minHeight + "px";
                boxs[i].style.left = boxs[index].offsetLeft + "px";
                harr[index] += boxs[i].offsetHeight;
            }
        }
        console.log(harr);
    }

    function getElementByClass(parent , className){
        var oBox = parent.children;
        var temparr = new Array();
        for(var i = 0 ;i < oBox.length ; i ++){
            if(oBox[i].className == className){
                temparr.push(oBox[i]);
            }
        }
        return temparr;
    }

    function getMinHeight(arr){
        return Math.min.apply(null , arr);
    }
    function getIndex(arr , val){
        for(var i in arr){
            if(arr[i] === val) return i;
        }
    }

    function checkScorllTop(){
        var wrap = document.getElementById("wrapper");
        var boxs = getElementByClass(wrap , 'box');


        var lastBoxHeight = boxs[boxs.length - 1].offsetTop + Math.floor(boxs[boxs.length - 1].offsetHeight / 2);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var documentHeight = scrollTop + document.documentElement.clientHeight;
        return lastBoxHeight<documentHeight?true:false;
    }

}