/**
 * Created by jiadongyu on 16/7/6.
 */
function AnimationManger(){
    this.tileContainer=document.querySelector(".tile-container");
    this.tileBoard={};
}


AnimationManger.prototype.addTile=function(tile){

    var wrapper=document.createElement("div");
    var classes=['tile'];
    classes.push(this.positionClass(tile.position));

    this.setClass(wrapper,classes);
    wrapper.innerHTML=tile.value;

    this.tileContainer.appendChild(wrapper);
    this.tileBoard[tile.id]=wrapper;
    console.log("tile id added:"+tile.id);
};

AnimationManger.prototype.removeTile=function(id){
    this.tileContainer.removeChild(this.tileBoard[id]);
    delete this.tileBoard[id];
}


AnimationManger.prototype.moveTile=function(id,position){
    console.log("move tile id: "+id+" x: "+position.x+" y: "+position.y);
    var classes=['tile'];
    classes.push(this.positionClass(position));
    this.setClass( this.tileBoard[id],classes);
};


AnimationManger.prototype.positionClass=function (position){
    return "tile-position-"+(position.x+1)+"-"+(position.y+1);
};

AnimationManger.prototype.setClass=function(ele,classes){
    ele.setAttribute("class",classes.join(' '));
};