/**
 * Created by jiadongyu on 16/7/6.
 */

function InputManger(){
    this.functionMap=[];
    this.listen();
}
InputManger.prototype.registerFunction=function(functionName, callback){
    this.functionMap[functionName]=callback;
}

InputManger.prototype.callFunction=function (functionName,data) {
    console.log(data);
    this.functionMap[functionName](data);
}

InputManger.prototype.listen=function(){
    var self=this;
    var keymap={
        'ArrowUp': 0, // Up
        'ArrowRight': 1, // Right
        'ArrowDown': 2, // Down
        'ArrowLeft': 3, // Left
    }
    document.addEventListener("keydown",function (event) {
        console.log("event key:"+event.key);
        var direction=keymap[event.key];
        console.log("listen",direction)
        if(direction){
            self.callFunction("move", direction);
        }
    })
}