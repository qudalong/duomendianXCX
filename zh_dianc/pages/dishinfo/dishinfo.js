var o = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var n = wx.getStorageSync("nbcolor");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n
        });
        var a = this;
        console.log(t);
        var e = t.id;
        a.setData({
            id: t.id,
            types: t.types
        }), o.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(o) {
                a.setData({
                    url: o.data
                });
            }
        }), o.util.request({
            url: "entry/wxapp/DishesInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(o) {
                console.log(o.data), a.setData({
                    dishesinfo: o.data
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