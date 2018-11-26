var n = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this, e = wx.getStorageSync("users").id;
        n.util.request({
            url: "entry/wxapp/userinfo",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log("user", t), a.setData({
                    userinfo: t.data
                }), n.util.request({
                    url: "entry/wxapp/Rank",
                    cachetime: "0",
                    success: function(n) {
                        console.log("rank", n), a.setData({
                            rank: n.data
                        });
                        for (var e = 0; e < n.data.length; e++) t.data.id == n.data[e].id && a.setData({
                            pm: e + 1
                        });
                    }
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