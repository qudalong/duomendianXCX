function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e, t = getApp();

Page((o(e = {
    data: {
        close: !1,
        current_time: ""
    },
    onLoad: function(o) {
        var e = wx.getStorageSync("bqxx");
        if ("1" == e.more) var n = wx.getStorageSync("bqxx").color;
        "2" == e.more && (n = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n
        }), this.setData({
            color: n,
            options: o
        }), console.log(o);
        var a = this;
        if (null == o.totalPrice) var r = 0; else r = Number(o.totalPrice);
        if (null == o.state) {
            console.log("状态是空的");
            var s = 0;
        } else {
            console.log("有状态");
            var i = o.state;
        }
        console.log(i), a.setData({
            state: i,
            states: s,
            totalPrice: r
        });
        var l = wx.getStorageSync("users").id, c = function() {
            var o = new Date(), e = o.getMonth() + 1, t = o.getDate();
            return 1 <= e && e <= 9 && (e = "0" + e), 0 <= t && t <= 9 && (t = "0" + t), o.getFullYear() + "-" + e + "-" + t + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds();
        }().slice(0, 10);
        console.log(c), a.setData({
            current_time: c
        }), t.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: l
            },
            success: function(e) {
                console.log(e);
                for (var t = e.data.ok, n = [], r = 0; r < t.length; r++) t[r].conditions = Number(t[r].conditions), 
                c <= t[r].end_time && 2 == t[r].state && n.push(t[r]);
                if (null == o.dnjr && null == o.state) console.log("从个人中心进入"), a.setData({
                    coupon: n
                }); else {
                    console.log("从门店进入");
                    for (var s = [], i = 0; i < n.length; i++) n[i].store_id == getApp().sjid && s.push(n[i]);
                    a.setData({
                        coupon: s
                    });
                }
            }
        }), t.util.request({
            url: "entry/wxapp/Voucher",
            cachetime: "0",
            data: {
                user_id: l
            },
            success: function(e) {
                console.log(e);
                for (var t = e.data.ok, n = [], r = 0; r < t.length; r++) t[r].conditions = Number(t[r].conditions), 
                c <= t[r].end_time && 2 == t[r].state && (console.log(), n.push(t[r]));
                if (null == o.dnjr && null == o.state) console.log("从个人中心进入"), a.setData({
                    Vouchers: n
                }); else {
                    console.log("从门店进入");
                    for (var s = [], i = 0; i < n.length; i++) n[i].store_id == getApp().sjid && s.push(n[i]);
                    a.setData({
                        Vouchers: s
                    });
                }
            }
        });
    },
    select: function(o) {
        "2" == this.data.state ? wx.redirectTo({
            url: "../order/order?&tableid=" + this.data.options.tableid,
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        }) : wx.redirectTo({
            url: "../pay/pay",
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    use: function(o) {
        var e = this, t = o.currentTarget.id;
        console.log(o), console.log(e.data);
        for (var n = e.data.coupon, a = 0; a < n.length; a++) if (t == n[a].id) {
            console.log(n[a]);
            var r = n[a];
            "2" == e.data.state ? wx.redirectTo({
                url: "../order/order?coupons_id=" + r.coupons_id + "&preferential=" + r.preferential + "&tableid=" + e.data.options.tableid,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            }) : wx.redirectTo({
                url: "../pay/pay?coupons_id=" + r.coupons_id + "&preferential=" + r.preferential,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            });
        }
        console.log(o), console.log(e.data);
    },
    user: function(o) {
        var e = this;
        console.log(e.data);
        for (var t = o.currentTarget.id, n = e.data.Vouchers, a = 0; a < n.length; a++) if (t == n[a].id) {
            console.log(n[a]);
            var r = n[a];
            "2" == e.data.state ? wx.redirectTo({
                url: "../order/order?vouchers_id=" + r.vouchers_id + "&preferential=" + r.preferential + "&tableid=" + e.data.options.tableid,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            }) : wx.redirectTo({
                url: "../pay/pay?vouchers_id=" + r.vouchers_id + "&preferential=" + r.preferential,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            });
        }
        console.log(o), console.log(e.data);
    },
    tzsj: function(o) {
        var e = o.currentTarget.dataset.sjid;
        console.log(e, this.data.options), null == this.data.options.dnjr ? (console.log("从个人中心进入"), 
        wx.switchTab({
            url: "../home/home"
        })) : (console.log("从门店进入"), wx.navigateBack({
            delta: 1
        }));
    },
    details: function(o) {
        console.log(o);
        var e = o.currentTarget.id;
        wx.navigateTo({
            url: "coupons_details?id=" + e + "&type=1&state=2"
        });
    },
    detail: function(o) {
        console.log(o);
        var e = o.currentTarget.id;
        wx.navigateTo({
            url: "coupons_details?id=" + e + "&type=2&state=2"
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
}, "onPullDownRefresh", function() {
    this.onLoad(), wx.stopPullDownRefresh();
}), o(e, "onReachBottom", function() {}), o(e, "onShareAppMessage", function() {}), 
e));