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
    wrapper.innerHTML=2;
    this.tileContainer.appendChild(wrapper);
    this.tileBoard[tile.position]=wrapper;
}

AnimationManger.prototype.moveTile=function(tile,position){

    var classes=['tile'];
    classes.push(this.positionClass(position));
    this.setClass(this.tileBoard[tile.position],classes);

}


AnimationManger.prototype.positionClass=function (position){
    return "tile-position-"+(position.x+1)+"-"+(position.y+1);
}

AnimationManger.prototype.setClass=function(ele,classes){
    ele.setAttribute("class",classes.join(' '));
}