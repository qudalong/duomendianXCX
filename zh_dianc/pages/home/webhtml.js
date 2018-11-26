var n = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log(o);
        var t = this;
        n.util.request({
            url: "entry/wxapp/AdInfo",
            cachetime: "0",
            data: {
                id: o.weburl
            },
            success: function(n) {
                console.log(n), t.setData({
                    vr: n.data.src
                }), console.log(t.data.vr);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});