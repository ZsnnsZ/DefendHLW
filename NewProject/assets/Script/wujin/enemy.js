var state = cc.Enum({
    NONE:0,
    WALK:1,
    SLOW:2,
    FREEZE:3,
    DEAD:4,
});

cc.Class({
    extends: cc.Component,

    properties: {
        is_debug: true,
    },

    // use this for initialization
    onLoad: function () {

    },

    start: function() {
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
