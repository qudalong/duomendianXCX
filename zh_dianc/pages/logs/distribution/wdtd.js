var t = getApp(), e = require("../../../utils/util.js");

Page({
    data: {
        tabs: [ "一级", "二级" ],
        activeIndex: 0,
        djd: []
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    onLoad: function(n) {
        var a = this, o = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/MyTeam",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t);
                var n = [], o = [];
                n = t.data.one, o = t.data.two;
                for (var i = 0; i < n.length; i++) n[i].time = e.ormatDate(n[i].time);
                for (i = 0; i < o.length; i++) o[i].time = e.ormatDate(o[i].time);
                a.setData({
                    yj: n,
                    ej: o
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