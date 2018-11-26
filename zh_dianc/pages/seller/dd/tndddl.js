var t = getApp(), e = require("../../../utils/util.js");

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
    onLoad: function(a) {
        console.log(a);
        var n = wx.getStorageSync("imglink"), o = this, r = a.ddid;
        console.log(r, n), t.util.request({
            url: "entry/wxapp/OrderInfo",
            cachetime: "0",
            data: {
                id: r
            },
            success: function(t) {
                console.log(t), "0" != t.data.order.pay_time && (t.data.order.pay_time = e.ormatDate(t.data.order.pay_time)), 
                o.setData({
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