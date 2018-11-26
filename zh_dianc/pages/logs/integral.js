var o = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = wx.getStorageSync("bqxx");
        if ("1" == e.more) var n = wx.getStorageSync("bqxx").color;
        "2" == e.more && (n = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n
        });
        var a = this, r = wx.getStorageSync("users").id;
        console.log(r), o.util.request({
            url: "entry/wxapp/Jfmx",
            cachetime: "0",
            data: {
                user_id: r
            },
            success: function(o) {
                console.log(o);
                var t = o.data;
                a.setData({
                    score: t
                });
            }
        }), o.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: r
            },
            success: function(o) {
                console.log(o), a.setData({
                    integral: o.data.total_score
                });
            }
        });
    },
    tzjfsc: function() {
        wx.redirectTo({
            url: "../integral/integral"
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