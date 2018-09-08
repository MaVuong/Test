// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("-----add touch listener");
        this.addTouchListenEvent();
    },
    actionSC:function () {
      this.node.scale=0.3;
    },


    checkTouchAtLabel:function (pos) {
        //cc.log("--------pos=%s | %s ",pos.x,pos.y);

        var ww_max=this.node.width/2;
        var ww_min=-ww_max;
        var yy_max=this.node.height/2;
        var yy_min=-yy_max;
        if(pos.x>=ww_min&&pos.x<ww_max){
            if(pos.y>=yy_min&&pos.y<yy_max){
                cc.log("-----touch in rect");
                this.node.stopAllActions();
                this.node.runAction(cc.sequence(cc.scaleTo(0.2,1.2),cc.scaleTo(0.2,1.0)));
            }
        }

    },
    
    addTouchListenEvent:function(){

        this.touchListen=cc.eventManager.addListener({event: cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches: false,
            onTouchBegan: function(touch, event) {

                var touchLoc = touch.getLocation();
                this.begintouch = this.node.convertToNodeSpaceAR(touchLoc);

                return true;
            }.bind(this),


            onTouchMoved: function(touch, event) {

            }.bind(this),

            onTouchEnded: function(touch, event) {
                var touchLoc = touch.getLocation();
                var endtouch = this.node.convertToNodeSpaceAR(touchLoc);
                if(cc.pDistance(endtouch,this.begintouch)<30){
                    this.checkTouchAtLabel(endtouch);
                }else{
                    //cc.log("----is touch move= true");
                }
            }.bind(this),
        }, this.node);



    },
});
