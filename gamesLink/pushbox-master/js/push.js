
//加载
window.onload=function(){
	var game=document.getElementById('game');
	var gameBtn=document.getElementById('gameBtn');
	gameBtn.onclick=function(){
		gameBtn.style.display='none';
		Game.init();
	}
}
var Game={
	level:[
	[
	[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,3,2,0,0,0,1],[1,0,0,0,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,3,0,2,4,1],[1,0,0,1,0,0,0,0,0,1],[1,0,3,0,0,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]
	],//地图数据，0是可移动区域 1是墙 2是目的地，3箱子默认区域，4是人
	],

	init:function(){//创建ul li
	var mapUl=document.createElement('ul');
	mapUl.style.width=740+'px';
	mapUl.style.height=592+'px';
	game.appendChild(mapUl);
	for( var i=0;i<8;i++){//创捷li，即地图单元
			for(var j=0;j<10;j++){
				var temp=document.createElement('li');
				mapUl.appendChild(temp);
				temp.style.width=74+'px';
				temp.style.height=74+'px';
				temp.style.float='left';
				
			}
	}
	var liArr=mapUl.getElementsByTagName('li');//传全局函数
	this.liArr=liArr;
	this.creatMap(this.level[0]);
	this.arr=this.level[0];
	this.arrHref=this.hre(this.arr);//提取目标地区坐标
	this.checkKey();
	
	},
	
	creatMap:function(arr){//根据数组，生成对应的地图
		var currenti;
		var currentj;
		for(var i=0;i<8;i++){
			for(var j=0;j<10;j++){
				if(arr[i][j]==1)
				this.liArr[i*10+j].style.background="url(img/wall.png) -6px -4px";
			  else if(arr[i][j]==0)
				this.liArr[i*10+j].style.background="url(img/wall.png) -498px -87px no-repeat";
				else if(arr[i][j]==2)
				this.liArr[i*10+j].style.background="url(img/wall.png) -741px -0px no-repeat";
				else if(arr[i][j]==3)
				this.liArr[i*10+j].style.background="url(img/wall.png) -171px -166px no-repeat";
				else if(arr[i][j]==4){
				this.currenti=i;
				this.currentj=j;
				this.liArr[i*10+j].style.background="url(img/people.png) -128px 2px";
				}
			}
		}
	},
		checkKey:function(){//检测按键值
			 	var that=this;
				document.onkeydown=function(ev){
		 		var ev=ev||window.event;
		 		that.overlevel();
		 	 if(ev.keyCode==37) {
		 			  inum=1;//向left
		 		} else if(ev.keyCode==39){
		 			  inum=2;//向right 
		 		}
		 		else if(ev.keyCode==38){
		 				inum=3;//向up
		 		}
		 		else if(ev.keyCode==40){
		 			 inum=4;//向down
		 		}
		 	switch (inum.toString()){
		 			case '1':that.liArr[that.currenti*10+that.currentj].style.background="url(img/people.png) 2px 3px "; 
		 			that.checkAround(that.currenti,that.currentj,1);
		 			if(that.ispOnPointl()){//人在点左边一个单元
		 				that.recHref1(that.arrHref);
		 			}
		 			break;
		 			case '2':that.liArr[that.currenti*10+that.currentj].style.background="url(img/people.png) -64px 3px";
		 			that.checkAround(that.currenti,that.currentj,2);
		 			if(that.ispOnPointr()){//人在点左边一个单元
		 				that.recHref2(that.arrHref);
		 			}
		 			break;
		 			case '3':that.liArr[that.currenti*10+that.currentj].style.background="url(img/people.png) -187px 3px"; 
		 			that.checkAround(that.currenti,that.currentj,3);
		 			if(that.ispOnPointu()){//人在点左边一个单元
		 				that.recHref3(that.arrHref);
		 			}
		 			break;
		 			case '4':that.liArr[that.currenti*10+that.currentj].style.background="url(img/people.png) -128px 2px"; 
		 			that.checkAround(that.currenti,that.currentj,4);
		 			if(that.ispOnPointd()){//人在点左边一个单元
		 				that.recHref4(that.arrHref);
		 			}
		 			break;
		 	}
		
		}
	},
	/*move:function(i,j,inum){//传入人所在坐标的位置
		//检测4个方向是否可移动 检测规则 1维数组坐标i<10时候，up不行，坐标大于69时候down不行
		//坐标为10的倍数时left不行，坐标余数为9时候right不行
	
	}*/
	checkAround:function (i,j,inum){//检查指定方向的目标状态
	
		console.log('行'+i+'列'+j);
		switch (inum.toString()){
		case '1'://左
			if(i%10==0||this.arr[i][j-1]==1||(this.arr[i][j-1]==3&&this.arr[i][j-2]==1));//第一列不做任何事，或者前面一个单元格为墙，不做任何事
			else if(this.arr[i][j-1]==3&&this.arr[i][j-2]!=1&&this.arr[i][j-2]!=2)//若为箱子，且箱子上一格不是墙，箱子所在和上一格交换，上一格和人交换
				this.jiaohuan(this.arr,i,j-1,i,j,i,j-2);
			else if(this.arr[i][j-1]==2){//如果是点
				this.arr[i][j-1]=4; 
				this.arr[i][j]=0;}
			else if(this.arr[i][j-2]==2&&this.arr[i][j-1]==3)
		        {this.jiaohuan(this.arr,i,j-1,i,j,i,j-2); 
		        this.arr[i][j]=0;}
		        //为箱子
			else
			   {
			   	this.jiaohuan22(this.arr,i,j,i,j-1);
			   }
		break;
		case '2'://右
			if(i%10==9||this.arr[i][j+1]==1||(this.arr[i][j+1]==3&&this.arr[i][j+2]==1));//第一列不做任何事，或者前面一个单元格为墙，不做任何事
			else if(this.arr[i][j+1]==3&&this.arr[i][j+2]!=1&&this.arr[i][j+2]!=2)//若为箱子，且箱子上一格不是墙，箱子所在和上一格交换，上一格和人交换
				this.jiaohuan(this.arr,i,j+1,i,j,i,j+2);
			else if(this.arr[i][j+1]==2){
				this.arr[i][j+1]=4; 
				this.arr[i][j]=0;}
			else if(this.arr[i][j+2]==2&&this.arr[i][j+1]==3)
		        {this.jiaohuan(this.arr,i,j+1,i,j,i,j+2); 
		        this.arr[i][j]=0;}
		        //为箱子
				else//
				 this.jiaohuan22(this.arr,i,j,i,j+1);
		break;
		case '3'://上
	if(i%10==0||this.arr[i-1][j]==1||(this.arr[i-1][j]==3&&this.arr[i-2][j]==1));//第一列不做任何事，或者前面一个单元格为墙，不做任何事
			else if(this.arr[i-1][j]==3&&this.arr[i-2][j]!=1&&this.arr[i-2][j]!=2)//若为箱子，且箱子上一格不是墙，箱子所在和上一格交换，上一格和人交换
				this.jiaohuan(this.arr,i-1,j,i,j,i-2,j);
			else if(this.arr[i-1][j]==2){
				this.arr[i-1][j]=4; 
				this.arr[i][j]=0;}
			else if(this.arr[i-2][j]==2&&this.arr[i-1][j]==3)
		        {this.jiaohuan(this.arr,i-1,j,i,j,i-2,j); 
		        this.arr[i][j]=0;}
		else//和上一行交换
		 this.jiaohuan22(this.arr,i,j,i-1,j);
			break;
		case '4'://下
		if(i%10==0||this.arr[i+1][j]==1||(this.arr[i+1][j]==3&&this.arr[i+2][j]==1));//第一列不做任何事，或者前面一个单元格为墙，不做任何事
			else if(this.arr[i+1][j]==3&&this.arr[i+2][j]!=1&&this.arr[i+2][j]!=2)//若为箱子，且箱子上一格不是墙，箱子所在和上一格交换，上一格和人交换
				this.jiaohuan(this.arr,i+1,j,i,j,i+2,j);
			else if(this.arr[i+1][j]==2){
				this.arr[i+1][j]=4; 
				this.arr[i][j]=0;}
			else if(this.arr[i+2][j]==2&&this.arr[i+1][j]==3)
		        {this.jiaohuan(this.arr,i+1,j,i,j,i+2,j); 
		        this.arr[i][j]=0;}
		else//和上一行交换
		 	this.jiaohuan22(this.arr,i,j,i+1,j);
			break;
		default:
			break;
		}
		console.log('行'+i+'列'+j)
		this.creatMap(this.arr);
		 
	},
	jiaohuan:function(arr,a,a1,b,b1,c,c1){//数组类型的引用交换
		var temp=arr[a][a1];
		arr[a][a1]=arr[b][b1];
		arr[b][b1]=arr[c][c1];
		arr[c][c1]=temp;
	},
		jiaohuan2:function(arr,a,b){
			var temp=arr[a];
			arr[a]=arr[b];
			arr[b]=temp;
		},
		jiaohuan22:function(arr,a,a1,b,b1){
			var temp=arr[a][a1];
			arr[a][a1]=arr[b][b1];
			arr[b][b1]=temp;
		},
	  hre: function(arr){//将靶标位置找出来，存进数组中返回
	   	var hrfe=[];
	   	for (var i=0;i<8;i++){
				for(var j=0;j<10;j++){
					if(arr[i][j]==2)
					{var temp=[[i],[j]
					];
					 hrfe.push(temp);
					}
				}
	   	}
	   	return hrfe;
	   	console.log(hrfe);
	   },
	  recHref1:function(arr1){ //目标区域复原 
	  	this.arr[this.currenti][this.currentj+1]=2;
	  	this.creatMap(this.arr);
	  },
	    recHref2:function(arr1){ //目标区域复原 右边
	  	this.arr[this.currenti][this.currentj-1]=2;
	  	this.creatMap(this.arr);
	  },
	   recHref3:function(arr1){ //目标区域复原 右边
	  	this.arr[this.currenti+1][this.currentj]=2;
	  	this.creatMap(this.arr);
	  },
	  recHref4:function(arr1){ //目标区域复原 右边
	  	this.arr[this.currenti-1][this.currentj]=2;
	  	this.creatMap(this.arr);
	  },
	  ispOnPointl:function(){//判断人是否在目标点左边一点
	  	var hrea=this.arrHref;
	  	console.log(hrea);
	  	for(var i=0;i<hrea.length;i++){
	  		if((hrea[i][0]==this.currenti)&&(hrea[i][1]==this.currentj+1))
	  		return true;
	  	}
	  	return false;
	  },
	  ispOnPointr:function(){//判断人是否在目标点右边一点
	  	var hrea=this.arrHref;
	  	console.log(hrea);
	  	for(var i=0;i<hrea.length;i++){
	  		if((hrea[i][0]==this.currenti)&&(hrea[i][1]==this.currentj-1))
	  		return true;
	  	}
	  	return false;
	  },
	  ispOnPointu:function(){//判断人是否在目标点上边一点
	  	var hrea=this.arrHref;
	  	console.log(hrea);
	  	for(var i=0;i<hrea.length;i++){
	  		if((hrea[i][0]==this.currenti+1)&&(hrea[i][1]==this.currentj))
	  		return true;
	  	}
	  	return false;
	  },
	  ispOnPointd:function(){//判断人是否在目标点下边一点
	  	var hrea=this.arrHref;
	  	console.log(hrea);
	  	for(var i=0;i<hrea.length;i++){
	  		if((hrea[i][0]==this.currenti-1)&&(hrea[i][1]==this.currentj))
	  		return true;
	  	}
	  	return false;
	  },
	  
	  
	  overlevel:function(){//判断过关
	   console.log(this.arr);
	  	if(!this.isPrototypeOf())//人不在箱子上
	  	{
	  		for(var i=0;i<8;i++)
	  			for(var j=0;j<10;j++)
	  			{ 
	  				if(this.arr[i][j]==2)
	  				return null;
	  			}
	  			alert('恭喜过关');
	  			window.location.reload();
	  	}
	  },
	   
	}
 
 

