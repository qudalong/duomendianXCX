var t = getApp(), a = require("../../../utils/util.js");

Page({
    data: {
        tabs: [ "待审核", "已通过", "已拒绝" ],
        activeIndex: 0,
        djd: [],
        score: [ {
            note: "支付宝提现",
            time: "2017-10-18 12：11：25",
            money: "2.00",
            type: "1"
        }, {
            note: "银行卡提现",
            time: "2017-10-18 12：11：25",
            money: "5.00",
            type: "1"
        } ]
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    reLoad: function() {
        var e = this, n = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/YjtxList",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                console.log(t.data);
                for (var n = 0; n < t.data.length; n++) t.data[n].time = a.ormatDate(t.data[n].time), 
                t.data[n].sh_time = a.ormatDate(t.data[n].sh_time);
                var o = [], i = [], s = [];
                for (n = 0; n < t.data.length; n++) "1" == t.data[n].state && o.push(t.data[n]), 
                "2" == t.data[n].state && i.push(t.data[n]), "3" == t.data[n].state && s.push(t.data[n]);
                console.log(o, i, s), e.setData({
                    dsh: o,
                    ytg: i,
                    yjj: s
                });
            }
        });
    },
    onLoad: function(t) {
        this.reLoad();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad();
    },
    onReachBottom: function() {}
});