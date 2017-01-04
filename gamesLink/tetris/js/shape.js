/**
 * Created by Administrator on 2016/10/22.
 */
//定义cell类型：3个属性：r,c,src
function cell(r,c,src){
    this.r=r;
    this.c=c;
    this.src=src;
}

function State(arr){//创建状态对象  把相对坐标数据封装进去
    for(var i=0;i<4;i++){
        this["r"+i]=arr[2*i];
        this["c"+i]=arr[2*i+1];
    }
}

function shape(rcs,src,states,orgi) {
    this.cells =[];
    for (i = 0;i<4;i++){
        this.cells.push(new cell(rcs[2*i],rcs[2*i+1],src));
    }
    this.states=states;//状态数组
    this.orgCell=this.cells[orgi];//旋转参照的格子对象
    this.statei=0;
}

shape.prototype={
    IMGS:{
        T:"img/T.png",
        O:"img/O.png",
        I:"img/I.png",
        S:"img/S.png",
        Z:"img/Z.png",
        L:"img/L.png",
        J:"img/J.png"
    },
    moveDown:function(){
     for(i=0;i<this.cells.length;i++){
         this.cells[i].r++;
     }
 },
 moveLeft:function(){
    for(i=0;i<this.cells.length;i++){
        this.cells[i].c= this.cells[i].c-1;
    }
},
moveRight:function(){
    for(i=0;i<this.cells.length;i++){
        this.cells[i].c++;
    }
},
    rotateR:function(){//右旋转
        this.statei++;
        if(this.statei==this.states.length){
            this.statei=0;
        }
        this.rotate();
    },
    rotate:function(){
        var state=this.states[this.statei];
        for(i=0;i< this.cells.length;i++){
            if(this.cells[i]!=this.orgCell){
                if(this.cells[i]!=this.orgCell){   //使用状态数据修改当前shape里面格子坐标
                    this.cells[i].r=this.orgCell.r+state["r"+i];
                    this.cells[i].c=this.orgCell.c+state["c"+i];
                }
            }
        }
    },
    rotateL:function(){
        this.statei--;
        if(this.statei==-1){
            this.statei=3;
        }
        this.rotate();
    }

};
function T(){
    shape.call(this,[0,3,0,4,0,5,1,4],this.IMGS.T,[
        new State([0,-1,0,0,0,+1,+1,0]),     //封装状态数据传进去
        new State([-1,0,0,0,+1,0,0,-1]),
        new State([0,+1,0,0,0,-1,-1,0]),
        new State([+1,0,0,0,-1,0,0,+1])
        ],1);
};
Object.setPrototypeOf(T.prototype,shape.prototype);
function O(){
    shape.call(this,[0,3,0,4,1,3,1,4],this.IMGS.O,[],1);
};
Object.setPrototypeOf(O.prototype,shape.prototype);
function I(){
    shape.call(this,[0,3,0,4,0,5,0,6],this.IMGS.I,[
        new State([0,-1, 0,0, 0,+1, 0,+2]),
        new State([-1,0, 0,0, +1,0, +2,0])
        ],1);
};
Object.setPrototypeOf(I.prototype,shape.prototype);
function S(){
    shape.call(this,[0,4,0,5,1,3,1,4],this.IMGS.S,[
        new State([-1,0, -1,+1, 0,-1, 0,0]),
        new State([0,+1, +1,+1, -1,0, 0,0])
        ],3);
};
Object.setPrototypeOf(S.prototype,shape.prototype);
function Z(){
    shape.call(this,[0,3,0,4,1,4,1,5],this.IMGS.Z,[
        new State([-1,+1, 0,+1, 0,0, +1,0]),
        new State([-1,-1, -1,0, 0,0, 0,+1])
        ],2);
};
Object.setPrototypeOf(Z.prototype,shape.prototype);
function L(){
    shape.call(this,[0,3,0,4,0,5,1,3],this.IMGS.L,[
        new State([0,-1, 0,0, 0,+1, -1,+1]),
        new State([-1,0, 0,0, +1,0, -1,-1]),
        new State([0,-1, 0,0, 0,+1, +1,-1]),
        new State([+1,0, 0,0, -1,0, +1,+1]),
        ],1);
};
Object.setPrototypeOf(L.prototype,shape.prototype);
function J(){
    shape.call(this,[0,3,0,4,0,5,1,5],this.IMGS.J,[
        new State([-1,0, 0,0, +1,0, +1,-1]),
        new State([0,+1, 0,0, 0,-1, -1,-1]),
        new State([+1,0, 0,0, -1,0, -1,+1]),
        new State([0,-1, 0,0, 0,+1, +1,+1])
        ],1);
};
Object.setPrototypeOf(J.prototype,shape.prototype);