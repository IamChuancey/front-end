var d=new Array(10);
//游戏成功时各个位置上盒子的ID值，如果值为0的表示这个位置上是空白的
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
//各个位置可以到达的位置
var d_direct=new Array(10);
d_direct[1]=[2,4];d_direct[2]=[1,3,5];d_direct[3]=[2,6];d_direct[4]=[1,5,7];
d_direct[5]=[2,4,6,8];d_direct[6]=[3,5,9];d_direct[7]=[4,8];d_direct[8]=[5,7,9];
d_direct[9]=[6,8];
//各个位置的top和left值
var d_pos=new Array(10);
d_pos[1]=[0,0];d_pos[2]=[0,150];d_pos[3]=[0,300];d_pos[4]=[150,0];
d_pos[5]=[150,150];d_pos[6]=[150,300];d_pos[7]=[300,0];d_pos[8]=[300,150];
d_pos[9]=[300,300];

//第一步，找出指定ID的盒子的位置，通过left和top确定
function getPostion(id) {
  var top=document.getElementById(id).offsetTop;
  //alert(top);
  var left=document.getElementById(id).offsetLeft;
  //alert(left);
  var postion=(top/150)*3+left/150+1;
  //alert(postion);
  return postion;
}
//第二步，找出这个ID的盒子可以移动的位置，并判断在这些位置中是否存在可以移动的位置，如果可移动，返回相应的位置值

function whereCanGet(pos){
  //如果某个位置pos上对应的d[pos]为0，即为可以移动的位置
    for(var i=0;i<d_direct[pos].length;i++){
      if(d[d_direct[pos][i]]==0){
        return d_direct[pos][i];
      }
    }
   return 0;
}

//第三步，进行移动
function moveToTarget(id){
  //得到指定ID的位置
  var postion=getPostion(id);
  //alert(postion);
  //得到可以移动的位置
  var target=whereCanGet(postion);
  //alert(target);
  //如果返回值不为0，则可以移动 
  if(target!=0){
    document.getElementById(id).style.top=d_pos[target][0]+"px";
    document.getElementById(id).style.left=d_pos[target][1]+"px";
    d[postion]=0;
    d[target]=parseInt(id);
  }
  //游戏是否完成
  var finish_flag=true;
  for(var i=1;i<9;i++)
  {
    if(d[i]!=i){
    finish_flag=false;
    break;
  }
    }

  if(finish_flag==true){
    alert("Congratulations! You make it!");
  }
}


//随机打乱函数
function random(){
//生成一个随机数组
var arr=new Array(9);
for (var i = 0; i < arr.length; i++) {
  arr[i]=i;
}
arr.sort(function(){ return 0.5 - Math.random() });
//把这个数组的数赋值给d[1]~d[9] 达到打乱数组d的目的
for(var j=0;j<arr.length;j++)
{
  d[j+1]=arr[j];
  //alert(d[j+1]);
}
//d[i]=x 表示把盒子x放到第i个位置上，并成功打乱盒子的排列顺序
for(var k=1;k<d.length;k++)
{
  //alert(d[k]);
  if(d[k]!=0)
  {
    document.getElementById("box"+d[k]).style.top=d_pos[k][0]+"px";
    document.getElementById("box"+d[k]).style.left=d_pos[k][1]+"px";
  }
}

}

function move(){
  //为各个盒子添加事件函数
  var div=document.getElementById("box");
  var boxs=div.getElementsByTagName('div');
  for (var i = 0; i < boxs.length; i++) {
    boxs[i].onclick=function(){
      //alert(this.getAttribute("id"));
      moveToTarget(this.getAttribute("id"));
    }
  }

  var start_bt=document.getElementById("start");
  var reset_bt=document.getElementById("reset");
  start_bt.onclick=function(){
    start();
  }
  reset_bt.onclick=function(){
    reset();
  }
}


var time=0;
//保存定时时间
var pause=true;
//设置是否暂停标志
var set_timer;
//设置定时函数

//定时函数，每一秒执行一次
function timer(){
    time+=1;//一秒钟加一，单位是秒
    var min=parseInt(time/60);//把秒转换为分钟，一分钟60秒，取商就是分钟
    var sec=time%60;//取余就是秒
    document.getElementById("time").innerHTML=min+"分"+sec+"秒";//然后把时间更新显示出来
}

//开始暂停函数
function start(){
    if(pause){
        document.getElementById("start").innerHTML="暂停";//把按钮文字设置为暂停
        pause=false;//接下来暂停表示设置为false
        set_timer=setInterval(timer,1000);//启动定时
        //如果当前是暂停，则开始
    }else{
        document.getElementById("start").innerHTML="开始";
        pause=true;
        clearInterval(set_timer);
    }
}

//重置函数
function reset(){
    time=0;//把时间设置为0
    random();//把方块随机打乱函数
    if(pause)//如果暂停，则开始计时
      {
        start();
      }  
}

function addLoadEvent(func){
  var oldload=window.onload;
  //alert(typeof window.onload);
  if(typeof window.onload == "function")
    {
    window.onload=function(){
      oldload();
      func();
        }
    }
  else {
  window.onload=func; 
}
}

addLoadEvent(reset);
addLoadEvent(move);

