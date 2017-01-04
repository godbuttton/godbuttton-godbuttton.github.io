/**
 * Created by Administrator on 2016/10/22.
 */
var game = {
    CSIZE: 26,
    OFFSET: 15,
    pg: null,//保存游戏容器元素
    shape: null,
    interval: 300,
    timer: null,
    RN: 20,
    CN: 10,
    wall: null,
    shape: null,
    nextshape: null,
    lines: 0,//删除行数
    score: 0,//总得分
    state:1,//游戏状态
    GAMEOVER:0,
    RUNNING:1,
    PAUSE:2,
    Scores: [0, 10, 30, 60, 100],
    start: function () {
        this.state=this.RUNNING;
        this.score = 0;
        this.lines = 0;
        this.wall = [];
        for (var r = 0; r < this.RN; r++) {
            this.wall[r] = new Array(this.CN);
        }
        this.pg = document.querySelector(".playground");
        this.shape = new T();
        this.shape = this.randomShape();
        this.nextshape = this.randomShape();
        this.paint();
        this.timer = setInterval(this.moveDown.bind(this), this.interval);
        document.onkeydown = (function (ev) {
            switch (ev.keyCode) {
                case 37:
                    this.state==this.RUNNING&&this.moveLeft();
                    break;
                case 39:
                    this.state==this.RUNNING&&this.moveRight();
                    break;
                case 40:
                    this.state==this.RUNNING&&this.hardDrop();
                    break;
                case 38:
                    this.state==this.RUNNING&&this.rotateR();
                    break;
                case 90:
                    this.state==this.RUNNING&&this.rotateL();
                    break;
                case 83:
                    this.state==this.GAMEOVER&&this.start();break;
                case 81:
                    this.state!=this.GAMEOVER&&this.quit();break;
                case 80:  //p
                    this.state==this.RUNNING&&this.pause();break;
                case 67:
                    this.state==this.PAUSE&&this.myContinue();break;
            }
        }).bind(this);
    },
    myContinue:function(){
        this.state=this.RUNNING;
        this.timer = setInterval(this.moveDown.bind(this), this.interval);
        this.paint();
    },
    pause:function(){
        this.state=this.PAUSE;
        clearInterval(this.timer);
        this.timer=null;
        this.paint();
        var img=new Image();
        img.src="img/pause.png";
        img.style.width="525px";
        img.className="state"

        this.pg.appendChild(img);

    },
    quit:function(){
        this.state=this.GAMEOVER;
        clearInterval(this.timer);
        this.timer=null;
        this.paint();
    },
    canRotate: function () {//判断是否越界
        for (var i = 0; i < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            if (cell.r >= this.RN || cell.r < 0
                || cell.c >= this.CN || cell.c < 0)
                debugger;
                return false;
            else if (this.wall[cell.r][cell.c])
                return false;
        }
        return true;
    },
    rotateR: function () {
        this.shape.rotateR();
        if (!this.canRotate())//如果旋转后越界，再转回来
            this.shape.rotateL();
    },
    rotateL: function () {
        this.shape.rotateL();
        if (!this.canRotate())
            this.shape.rotateR();
    },
    hardDrop: function () {//直接降下来

        while (this.canDown()) {
            this.moveDown();
        }
    },
    canLeft: function () {//判断能否左移动
        for (var i = 0; i < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            if (cell.c == 0) {
                return false;
            }
            else if (this.wall[cell.r][cell.c - 1]) {
                return false;
            }
        }
        return true;
    },
    moveLeft: function () {//左移

        if (this.canLeft()) {
            this.shape.moveLeft();
            this.paint();
        }
    },
    canRight: function () {//判断能否右移动
        for (i = 0; i < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            if (cell.c == this.CN - 1) {
                return false;
            }
            else if (this.wall[cell.r][cell.c + 1]) {
                return false;
            }
        }
        return true;
    },
    moveRight: function () {//右移

        if (this.canRight()) {
            this.shape.moveRight();
            this.paint();
        }
    },

    paintShape: function () {//绘制主图形//未删存在的
        var frag = document.createDocumentFragment();
        for (var i = 0; i < 4; i++) {
            var cell = this.shape.cells[i];
            frag.appendChild(this.paintCell(cell));
        }
        this.pg.appendChild(frag);
    },
    moveDown: function () {  //下移动
        if (this.canDown()) {
            this.shape.moveDown();
        }
        else {   //到底了 替换
            this.landIntoWall();
            var ln=this.deleteRows();//删除行,计分
            this.lines+=ln;
            this.score+=this.Scores[ln];

            if(!this.isGameover()){
            this.shape = this.nextshape;
            this.nextshape = this.randomShape();}
            else{
                this.state=this.GAMEOVER;
                clearInterval(this.timer);
                this.timer=null;
            }
        }
        this.paint();
    },
    isGameover:function(){
      for( var i=0;i<this.nextshape.cells.length;i++){
          var cell=this.nextshape.cells[i];
          if(this.wall[cell.r][cell.c]){
              return true;
          }
      }
        return false;
    },
    paintState:function(){
        if(this.state==this.GAMEOVER){
        var img=new Image();
        img.src="img/game-over.png";
        img.style.width="525px";
        img.className="state"

        this.pg.appendChild(img);

        }
    },
    paintScore:function(){
      var score=document.getElementById("score");
        score.innerHTML=this.score;
        var lines=document.getElementById("lines");
        lines.innerHTML=this.lines;
    },
    paint: function () {//总的画
        this.pg.innerHTML = this.pg.innerHTML.replace(/<img\s[^>]*>/g, "");
        this.paintShape();
        this.painWall();
        this.painNext();
        this.paintScore();
        this.paintState();
    },
    canDown: function () { //能否下
        for (var i = 0; i < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            if (cell.r == this.RN - 1) {
                return false;
            }
            else if (this.wall[cell.r + 1][cell.c]) {
                return false;
            }
        }
        return true;
    },
    landIntoWall: function () {//保存在墙数组中
        for (var i = 0; i < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            this.wall[cell.r][cell.c] = cell;
        }
    },
    painWall: function () {//画墙
        var frag = document.createDocumentFragment();
        for (var r = this.RN - 1; r > 0; r--) {
            if (this.wall[r].join("") == "") break;
            else
                for (var c = 0; c < this.CN; c++) {
                    if (this.wall[r][c]) {
                        frag.appendChild(this.paintCell(this.wall[r][c]))
                    }
                    ;
                }
        }
        this.pg.appendChild(frag);
    },
    paintCell: function (cell) {//画单元
        var img = new Image();
        img.style.left = cell.c * this.CSIZE + this.OFFSET + 'px';
        img.style.top = cell.r * this.CSIZE + this.OFFSET + 'px';
        img.src = cell.src;
        return img;
    },
    randomShape: function () {//随机生成一个shape
        var r = Math.floor(Math.random() * 6);
        switch (r) {
            case 0:
                return new O();
            case 1:
                return new T();
            case 2:
                return new I();
            case 3:
                return new L();
            case 4:
                return new J();
            case 5:
                return new S();
            case 6:
                return new Z();
        }
    },
    painNext: function () { //画nextShape
        var frag = document.createDocumentFragment();
        for (var i = 0; i < this.nextshape.cells.length; i++) {
            var img = this.paintCell(this.nextshape.cells[i]);
            img.style.left = parseFloat(img.style.left) + 10 * this.CSIZE + "px";
            img.style.top = parseFloat(img.style.top) + this.CSIZE + "px";
            var cell = this.nextshape.cells[i];
            frag.appendChild(img);
        }
        this.pg.appendChild(frag);
    },
    deleteRow: function (r) {//删除行
        for (; r >= 0; r--) {
            this.wall[r] = this.wall[r - 1];
            this.wall[r - 1] = [];
            for (var j = 0; j < this.CN; j++) {
                if (this.wall[r][j]) {//如过有格子
                    this.wall[r][j].r++;
                }
            }
            if (this.wall[r - 2].join("") == "") {
                break;
            }
        }

    },

    isFullRow: function (r) {//判断满格
        return (String(this.wall[r]).search(/^,|,,|,$/) == -1);


    },
    deleteRows: function () {
        for (var i = this.RN - 1, ln = 0; i > 0; i--) {
            if (this.isFullRow(i)) {
                this.deleteRow(i);
                ln ++;
                if (this.wall[i].join("") == "" || ln == 4) {
                    break;
                }
                i++;
            }

        }
        return ln;
    }

}
game.start();