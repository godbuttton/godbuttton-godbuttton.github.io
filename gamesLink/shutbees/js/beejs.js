

//window加载
window.onload=function(){
	var oBtn=document.getElementById("gameBtn");
	var beginpic=document.getElementById("begin")
	oBtn.onclick=function(){
		this.style.display="none";
		Game.init("div1");
		beginpic.style.display="none";
	};
};
var Game={
	oEnemy:{//敌人数据
		e1:{style:'enemy',blood:1,speed:2,score:1},
		e2:{style:'enemy',blood:2,speed:2,score:2},
	},
	gk:[ //关卡数据
		{
			eMap:['e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
			],
			colNum:10,
			isSpeedX:10,
			isSpeedY:10,
			times:2000
		},
		{
			eMap:['e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
			],
			colNum:10,
			isSpeedX:15,
			isSpeedY:15,
			times:2000
		},
		{
			eMap:['e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
			],
			colNum:10,
			isSpeedX:15,
			isSpeedY:15,
			times:1500
		},
		{
			eMap:['e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
			],
			colNum:10,
			isSpeedX:10,
			isSpeedY:10,
			times:2000
		},
		{
			eMap:['e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
					'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
			],
			colNum:10,
			isSpeedX:10,
			isSpeedY:10,
			times:2000
		}
	],
	
	air:{//飞机的 数据
		  style:'air1',
		  bulletStyle:'bullet',
	},
	init:function(id){
		//初始化
		this.oParent=document.getElementById(id)
		this.createScore();
		this.createEnemy(0);
		this.createAir();	  
	},
	 
	 createScore:function(){//创建积分
	 	var oS=document.createElement("div")
	 	oS.id="score";
	 	oS.innerHTML="积分：<span>0</span>";
	 	this.oParent.appendChild(oS);
	 	this.oSNum=oS.getElementsByTagName('span')[0];
	 },
	 createEnemy:function(iNow){//创建敌人
	 	
	 	if(this.oUl){
	 		clearInterval(this.oUl.timer);
	 		this.oParent.removeChild(this.oUl);
	 	}
	 	document.title='第'+iNow+'关';
	 	this.gknum=iNow;
	 	var gk=this.gk[iNow];
	 	var oUl=document.createElement('ul');
	 	oUl.id='bee';
	 	var arr=[];
	 	oUl.style.width=gk.colNum*24+'px';
	 	this.oParent.appendChild(oUl);
	 	oUl.style.left=(this.oParent.offsetWidth-oUl.offsetWidth)/2+"px";
	  this.oUl=oUl;
	 
	    for(var i=0;i<gk.eMap.length;i++)
	     {
	    	var oLi=document.createElement('li');
	    	oLi.className=this.oEnemy[gk.eMap[i]].style;
	    	oLi.blood=this.oEnemy[gk.eMap[i]].blood;
	    	oLi.speed=this.oEnemy[gk.eMap[i]].speed;
	    	oLi.score=this.oEnemy[gk.eMap[i]].score;
	    	oUl.appendChild(oLi);
	    }
	     this.aLi=oUl.getElementsByTagName('li');
	     for(var i=0;i<this.aLi.length;i++)//提取每个li位置
	     {
	     	arr.push([this.aLi[i].offsetLeft,this.aLi[i].offsetTop]);
	     }
	     for(var i=0;i<this.aLi.length;i++)//改绝对定位，以及给lsft和top值
	     {
	      this.aLi[i].style.position='absolute';
	      this.aLi[i].style.left=arr[i][0]+'px';
	      this.aLi[i].style.top=arr[i][1]+'px';
	     }
	     
	     this.runEnemy(gk);
	 },
	 runEnemy:function(gk)
		{//移动敌人
			var This=this;
			var L=0;
			var R=this.oParent.offsetWidth-this.oUl.offsetWidth;
	 		this.oUl.timer=setInterval(function(){
	 			if (This.oUl.offsetLeft>R||This.oUl.offsetLeft<L) {
	 				  gk.isSpeedX*=-1;
	 			    This.oUl.style.top=This.oUl.offsetTop+10+'px';
	 			} 
	 			This.oUl.style.left=This.oUl.offsetLeft+gk.isSpeedX+'px';
	 		},200);
	 		setInterval(function(){
	 			This.oneMove();
	 		},gk.times)
	 },
	  oneMove:function(){//飞蜂
	  	var nowLi=this.aLi[Math.floor(Math.random()*this.aLi.length)];
	  	var This=this;
	  	nowLi.timer=setInterval(function(){
	  	var   a=(This.OA.offsetLeft+This.OA.offsetWidth/2)-(nowLi.offsetLeft+nowLi.parentNode.offsetLeft+This.OA.offsetWidth/2);
	  	var   b=(This.OA.offsetTop+This.OA.offsetHeight/2)-(nowLi.offsetTop+nowLi.parentNode.offsetTop+This.OA.offsetHeight/2);
	  	var c=Math.sqrt(a*a+b*b);
	  	var isX=nowLi.speed*a/c;
	  	var isY=nowLi.speed*b/c;
	  	nowLi.style.left=nowLi.offsetLeft+isX+'px';
	  	nowLi.style.top=nowLi.offsetTop+isY+'px';
	  	if(This.pz(This.OA,nowLi)){
	  		alert('游戏结束');
	  		window.location.reload();
	  	}
	  	},30)
	  
	  }, 
	  
	 createAir:function(){
	 	//飞机的 创建
	 	var OA=document.createElement('div');
	 	this.OA=OA;
	 	OA.className=this.air.style;
	 	this.oParent.appendChild(OA);
	 	OA.style.left=(this.oParent.offsetWidth-OA.offsetWidth)/2+'px';
	 	OA.style.top=(this.oParent.offsetHeight-OA.offsetHeight)+'px';
	 	this.blindAir();
	 },
	 
	 blindAir:function(){
	 	//操作飞机
	 	var timer=null;
	 	var inum=0;
	 	var This=this;
	 	document.onkeydown=function(ev){
	 		var ev=ev||window.event;
	 	
	 		if(!timer){
	 			timer=setInterval(show,30);
	 		}
	 		if (ev.keyCode==37) {
	 			  inum=1;
	 		} else if(ev.keyCode==39){
	 			  inum=2;
	 		}
	 		document.onkeyup=function(ev){
	 			var ev=ev||window.event;
	 			clearInterval(timer);
	 			timer=null;
	 			inum=0;
	 			if(ev.keyCode==32)
	 			{
	 				This.creatBullet();
	 			};
	 		}
	 	};
			function show(){
				if(inum==1){
					This.OA.style.left=This.OA.offsetLeft-10+'px';
				}
				if(inum==2){
					This.OA.style.left=This.OA.offsetLeft+10+'px';
				}
			};
	 },
	 creatBullet:function(){//子弹
	 	var OB=document.createElement('div');
	 	OB.className=this.air.bulletStyle;
	 	this.oParent.appendChild(OB);
	 	OB.style.left=this.OA.offsetLeft+this.OA.offsetWidth/2+'px';
	 	OB.style.top=this.OA.offsetTop-10+'px';
	 	this.runBullet(OB);
	 },
	 runBullet:function(OB){//子弹运行
	 	var This=this;
	 	OB.timer=setInterval(function(){
	 		if(OB.offsetTop<=-10){
	 			clearInterval(OB.timer);
	 			This.oParent.removeChild(OB);
	 			
	 		}
	 		else
	 		{OB.style.top=OB.offsetTop-10+'px';}
	 	  for(i=0;i<This.aLi.length;i++)	
	 	{
	 		if(This.pz(OB,This.aLi[i])){
	 			
	 			if (This.aLi[i].blood==1) {
	 				
	 				clearInterval(This.aLi[i].timer);
	 				This.oSNum.innerHTML=parseInt(This.oSNum.innerHTML)+This.aLi[i].score;
	 				This.oUl.removeChild(This.aLi[i]);
	 		
	 			} else{
	 				This.aLi[i].blood--;
	 			}
	 			clearInterval(OB.timer);
	 			This.oParent.removeChild(OB);
	 		}
	 	}
	 	if(!This.aLi.length){
	 		This.createEnemy(This.gknum+1);
	 	}
	 	},30)
	 	
	 },
	 pz:function (obj1,obj2){//碰撞检测
	 	 var L1=obj1.offsetLeft;
	 	 var R1=obj1.offsetLeft+obj1.offsetWidth;
	 	 var T1=obj1.offsetTop;
	 	 var B1=obj1.offsetTop+obj1.offsetHeight;
	 	 var L2=obj2.offsetLeft+obj2.parentNode.offsetLeft;
	 	 var R2=obj2.offsetLeft+obj2.offsetWidth+obj2.parentNode.offsetLeft;
	 	 var T2=obj2.offsetTop+obj2.parentNode.offsetTop;
	 	 var B2=obj2.offsetTop+obj2.offsetHeight+obj2.parentNode.offsetTop;
	 	 if(R1<L2||L1>R2||B1<T2||T1>B2){
	 	 	return false;
	 	 }
	 	 else{
	 	 	return true;
	 	 }
	 }
};
