var o = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var t = wx.getStorageSync("bqxx");
        if ("1" == t.more) var e = wx.getStorageSync("bqxx").color;
        "2" == t.more && (e = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e
        });
        var r = this, a = wx.getStorageSync("users").id;
        o.util.request({
            url: "entry/wxapp/Qbmx",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(o) {
                console.log(o), r.setData({
                    score: o.data
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