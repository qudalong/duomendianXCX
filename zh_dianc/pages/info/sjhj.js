var o = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = wx.getStorageSync("nbcolor");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        }), this.reLoad();
    },
    reLoad: function() {
        var t = this, e = wx.getStorageSync("imglink");
        console.log(e), o.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(o) {
                for (var n = o.data.environment, r = o.data.yyzz, a = 0; a < n.length; a++) n[a] = e + n[a];
                for (a = 0; a < r.length; a++) r[a] = e + r[a];
                console.log(o), t.setData({
                    store: o.data,
                    storeimg: n,
                    storeyyzz: r
                });
            }
        });
    },
    previewImage: function(o) {
        wx.previewImage({
            current: o.currentTarget.id,
            urls: o.currentTarget.dataset.urls
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});