var n = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = this, a = wx.getStorageSync("users").id;
        n.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(n) {
                console.log(n), t.setData({
                    wallet: n.data.wallet
                });
            }
        });
    },
    cash: function(n) {
        wx.navigateTo({
            url: "cash"
        });
    },
    tradeinfo: function(n) {
        wx.navigateTo({
            url: "walletmx"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.onLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});