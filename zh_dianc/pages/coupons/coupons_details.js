var o = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var t = wx.getStorageSync("bqxx");
        if ("1" == t.more) var n = wx.getStorageSync("bqxx").color;
        "2" == t.more && (n = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n
        }), this.setData({
            color: n
        });
        var a = this, c = wx.getStorageSync("users").id;
        console.log(e);
        var s = e.type, r = e.id;
        1 == e.state ? (o.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: c
            },
            success: function(o) {
                console.log(o);
                for (var e = o.data.all, t = 0; t < e.length; t++) if (r == e[t].id) {
                    console.log(e[t]);
                    var n = e[t].coupons_type;
                    1 == s && a.setData({
                        coupons: e[t],
                        coupons_type: n
                    });
                }
            }
        }), o.util.request({
            url: "entry/wxapp/Voucher",
            cachetime: "0",
            data: {
                user_id: c
            },
            success: function(o) {
                console.log(o);
                for (var e = o.data.all, t = 0; t < e.length; t++) if (r == e[t].id) {
                    console.log(e[t]);
                    var n = e[t].voucher_type;
                    2 == s && a.setData({
                        coupons: e[t],
                        coupons_type: n
                    });
                }
            }
        })) : (o.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: c
            },
            success: function(o) {
                console.log(o);
                for (var e = o.data.ok, t = 0; t < e.length; t++) if (r == e[t].id) {
                    console.log(e[t]);
                    var n = e[t].coupons_type;
                    1 == s && a.setData({
                        coupons: e[t],
                        coupons_type: n
                    });
                }
            }
        }), o.util.request({
            url: "entry/wxapp/Voucher",
            cachetime: "0",
            data: {
                user_id: c
            },
            success: function(o) {
                console.log(o);
                for (var e = o.data.ok, t = 0; t < e.length; t++) if (r == e[t].id) {
                    console.log(e[t]);
                    var n = e[t].voucher_type;
                    2 == s && a.setData({
                        coupons: e[t],
                        coupons_type: n
                    });
                }
            }
        }));
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});