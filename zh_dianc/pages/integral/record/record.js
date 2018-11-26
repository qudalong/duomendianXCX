var n = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = this, e = wx.getStorageSync("users").id, a = wx.getStorageSync("imglink");
        n.util.request({
            url: "entry/wxapp/Dhmx",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(n) {
                console.log(n), t.setData({
                    score: n.data,
                    url: a
                });
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