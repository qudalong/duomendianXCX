var t = getApp();

Page({
    data: {},
    dw: function(t) {
        console.log(t.currentTarget.dataset), wx.openLocation({
            latitude: Number(t.currentTarget.dataset.lat),
            longitude: Number(t.currentTarget.dataset.lng),
            scale: 28,
            address: t.currentTarget.dataset.wz
        });
    },
    tel: function(t) {
        console.log(t.currentTarget.dataset.tel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    onLoad: function(e) {
        console.log(e);
        var n = wx.getStorageSync("imglink"), o = this, a = e.ddid;
        console.log(a, n), t.util.request({
            url: "entry/wxapp/OrderInfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(t) {
                console.log(t), o.setData({
                    wmdd: t.data,
                    url: n
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