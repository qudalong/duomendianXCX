var t = getApp();

require("../../utils/util.js");

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
        var a = this, e = wx.getStorageSync("sjdsjid");
        t.util.request({
            url: "entry/wxapp/StoreTxList",
            cachetime: "0",
            data: {
                store_id: e
            },
            success: function(t) {
                console.log(t.data);
                for (var e = [], n = [], o = [], i = 0; i < t.data.length; i++) "1" == t.data[i].state && e.push(t.data[i]), 
                "2" == t.data[i].state && n.push(t.data[i]), "3" == t.data[i].state && o.push(t.data[i]);
                console.log(e, n, o), a.setData({
                    dsh: e,
                    ytg: n,
                    yjj: o
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