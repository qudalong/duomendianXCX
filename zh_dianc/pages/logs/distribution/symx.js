var t = getApp(), e = require("../../../utils/util.js");

Page({
    data: {
        score: [ {
            note: "张三",
            time: "2017-10-18 12：11：25",
            money: "2.00",
            type: "1"
        }, {
            note: "张三",
            time: "2017-10-18 12：11：25",
            money: "5.00",
            type: "1"
        } ]
    },
    onLoad: function(n) {
        var o = this, a = wx.getStorageSync("users").id, i = wx.getStorageSync("imglink");
        t.util.request({
            url: "entry/wxapp/Earnings",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t);
                for (var n = 0; n < t.data.length; n++) t.data[n].time = e.ormatDate(t.data[n].time);
                o.setData({
                    symx: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), o.setData({
                    link_logo: t.data.link_logo,
                    pt_name: t.data.pt_name,
                    url: i
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