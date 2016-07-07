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
    this.tileHash={};
    for(var i=0;i<this.size;i++){
        this.gameBoard[i]=new Array(this.size);
        for(var j=0;j<this.size;j++){
            this.gameBoard[i][j]=0;
        }
    }
    this.addRandomSize(2);
};

GameManager.prototype.addRandomSize=function (size){
    for(var i=0;i<size;i++){
        this.addRandom();
    }
}

GameManager.prototype.addRandom=function () {
    var tile={};
    tile.position=this.generate();
    tile.value=Math.random()>0.9?4:2;
    this.addTile(tile);
};

GameManager.prototype.addTile=(function() {
    var id=0;
    return function (tile) {
        id++;
        tile.id=id;
        this.gameBoard[tile.position.y][tile.position.x] = tile.id;
        this.tileHash[tile.id]=tile;
        this.AnimationManger.addTile(tile);
    }
})();

GameManager.prototype.generate=function(){
    var positions=this.getAvailableCell();
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
        case 0:return {x:0,y:-1};
        case 1:return {x:1,y:0};
        case 2:return {x:0,y:1};
        case 3:return {x:-1,y:0};
    }
    return {x:0,y:1};
};



GameManager.prototype.move=function(key){
    var direction=this.getDirection(key);
    var traversal=this.Traversal(direction);
    var self=this;
    traversal.x.forEach(function(x){
        traversal.y.forEach(function (y) {
            //console.log(self.gameBoard[y][x])
            var not;
            if(self.gameBoard[y][x]!=0) {
                var next = self.GoOnDirection({x:x, y:y}, direction);
                self.AnimationManger.moveTile(self.gameBoard[y][x],next);
                if(next.x!=x || next.y!=y)
                 self.gameBoardMove({x:x,y:y},next);
            }
        });
    });
};

GameManager.prototype.gameBoardMove=function(positionFrom,position){
    //assume position and positionFrom are not equal
    this.gameBoard[position.y][position.x]=this.gameBoard[positionFrom.y][positionFrom.x];
    if(position.y!=positionFrom.y || position.x !=positionFrom.x)
        this.gameBoard[positionFrom.y][positionFrom.x]=0;
}

GameManager.prototype.removeTile=function(position){
    this.AnimationManger.removeTile(this.gameBoard[position.y][position.x]);
    this.gameBoard[position.y][position.x]=0;
}

GameManager.prototype.Traversal=function(direction){
    var traversal={x:[],y:[]};
    for(var i=0;i<this.size;i++){
        traversal.x.push(i);
        traversal.y.push(i);
    }
    if(direction.x==1) traversal.x.reverse();
    if(direction.y==1) traversal.y.reverse();
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
    if(point.x>=0 && point.x<this.size && point.y>=0 && point.y<this.size){
        if(this.gameBoard[point.y][point.x]==0)
            return true;
    }
    return false;
};

GameManager.prototype.add=function(origin,direction){
    return {x:origin.x+direction.x, y:origin.y+direction.y};
};




