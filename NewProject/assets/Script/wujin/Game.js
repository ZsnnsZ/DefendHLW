var EnemyPrefabManager = require("enemyPrefabManager");
cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefabManager: EnemyPrefabManager,
    },

    // use this for initialization
    onLoad: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if(keyCode == cc.KEY.back){
                    cc.director.loadScene('Menu');
                }
            }
        }, this.node);
        this.startGame();
    },

    startGame: function() {
        cc.director.getCollisionManager().enabled = true;
        this.enemyPrefabManager.init(this);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
