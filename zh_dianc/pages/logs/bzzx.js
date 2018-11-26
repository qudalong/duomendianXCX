var n = getApp();

Page({
    data: {
        list: [ {
            id: "form",
            name: "优惠券的帮助中心",
            open: !1,
            pages: "优惠券的帮助中心主要显示用户可能回碰到的问题,正在开发中，敬请期待"
        }, {
            id: "form",
            name: "优惠券的帮助中心",
            open: !1,
            pages: "优惠券的帮助中心主要显示用户可能回碰到的问题,正在开发中，敬请期待"
        }, {
            id: "form",
            name: "优惠券的帮助中心",
            open: !1,
            pages: "优惠券的帮助中心主要显示用户可能回碰到的问题,正在开发中，敬请期待"
        } ]
    },
    kindToggle: function(n) {
        var o = n.currentTarget.id, e = this.data.list;
        console.log(o);
        for (var t = 0, a = e.length; t < a; ++t) e[t].open = t == o && !e[t].open;
        this.setData({
            list: e
        });
    },
    onLoad: function(o) {
        var e = this;
        console.log(this), n.util.request({
            url: "entry/wxapp/GetHelp",
            cachetime: "0",
            success: function(n) {
                console.log(n.data), e.setData({
                    list: n.data
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