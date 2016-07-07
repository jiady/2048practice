/**
 * Created by jiadongyu on 16/7/6.
 */
function Tile(value,x,y){
    this.value=value;
    this.position={};
    this.position.x=x;
    this.position.y=y;
};

function GameManager(size,InputManager,AnimationManger){
    this.score=0;
    this.size=size;
    this.InputManager=InputManager;
    this.AnimationManger=AnimationManger;
    this.InputManager.registerFunction("move",GameManager.prototype.move.bind(this));
    this.initBoard();

    console.log("init finish");
};


GameManager.prototype.initBoard=function(){
    this.gameBoard=new Array(this.size);
    for(var i=0;i<this.size;i++){
        this.gameBoard[i]=new Array(this.size);
        for(var j=0;j<this.size;j++){
            this.gameBoard[i][j]=0;
        }
    }
    this.addRandom();
};



GameManager.prototype.addRandom=function () {
    var tile={};
    tile.position=this.generate();
    tile.value=Math.random()>0.9?4:2;
    this.gameBoard[tile.position.y][tile.position.x]=tile.value;
    this.AnimationManger.addTile(tile);
    return tile;
};

GameManager.prototype.generate=function(){
    var positions=this.getAvailableCell();
    positions.forEach(function (p) {
        //console.log(p.x,p.y);
    });

    return positions[Math.floor(Math.random() * positions.length)];
};

GameManager.prototype.getAvailableCell=function(){
    var positions=[];

    for(var i=0;i<this.size*this.size;i++){
        var x=Math.floor(i/this.size);
        var y=i%this.size;
        if(this.gameBoard[y][x]==0){
            positions.push({x:x,y:y});
        }
    }
    return positions;
};


GameManager.prototype.getDirection=function(key){
    switch (key){
        case 0:return [0,-1];
        case 1:return [1,0];
        case 2:return [0,1];
        case 3:return [-1,0];
    }
    return [0,1];
};

GameManager.prototype.move=function(key){

    var direction=this.getDirection(key);
    var traversal=this.Traversal(direction);
    var self=this;
    traversal.x.forEach(function(x){
        traversal.y.forEach(function (y) {
            console.log(self.gameBoard[y][x])
            if(self.gameBoard[y][x]!=0) {
                var next = self.GoOnDirection([x, y], direction);
                var tile = new Tile(self.gameBoard[y][x],x,y);
                self.gameBoardMove(tile,{x:next[0],y:next[1]});
                self.AnimationManger.moveTile(tile,{x:next[0],y:next[1]});
            }
        });
    });
};

GameManager.prototype.gameBoardMove=function(tile,position){
    this.gameBoard[tile.position.y][tile.position.x]=0;
    this.gameBoard[position.y][position.x]=tile.value;
}

GameManager.prototype.Traversal=function(direction){
    var traversal={x:[],y:[]};
    for(var i=0;i<this.size;i++){
        traversal.x.push(i);
        traversal.y.push(i);
    }
    if(direction[0]==1) traversal.x.reverse();
    if(direction[1]==1) traversal.y.reverse();
    return traversal;
};

GameManager.prototype.GoOnDirection=function(origin, direction){
    var next=origin;
    var tmp=this.add(next,direction);
    while(this.inside(tmp)){
        next=tmp;
        tmp=this.add(next,direction);
    }
    return next;
};

GameManager.prototype.inside=function(point){
    if(point[0]>=0 && point[0]<this.size && point[1]>=0 && point[1]<this.size){
        if(this.gameBoard[point[1]][point[0]]==0)
            return true;
    }
    return false;
};

GameManager.prototype.add=function(origin,direction){
    return [origin[0]+direction[0], origin[1]+direction[1]];
};




