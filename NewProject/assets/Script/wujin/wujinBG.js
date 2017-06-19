cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.road_path = [(125,0),(125,110),(355,110),(355,240),(125,240),(125,375),(275,375),(275,440),(680,440),(680,375),(840,375),(840,240),(605,240),(605,110),(960,110)];
    },

    get_road_set: function () {
        return this.road_path;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
