var e = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = wx.getStorageSync("bqxx");
        if ("1" == t.more) var a = wx.getStorageSync("bqxx").color;
        "2" == t.more && (a = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a
        }), console.log(o);
        var n = this;
        n.setData({
            color: a,
            options: o
        });
        var s = wx.getStorageSync("users").id;
        console.log(s), e.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: s
            },
            success: function(e) {
                console.log(e);
                var o = n.getIdDataSet(e.data.ok);
                n.classify(e.data.all, o);
            }
        }), e.util.request({
            url: "entry/wxapp/Voucher",
            cachetime: "0",
            data: {
                user_id: s
            },
            success: function(e) {
                console.log(e);
                var o = n.cash(e.data.ok);
                n.again(e.data.all, o);
            }
        });
    },
    getIdDataSet: function(e) {
        for (var o = new Array(), t = e.length, a = 0; a < t; a++) o.push(e[a].coupons_id);
        return o;
    },
    classify: function(e, o) {
        for (var t = new Array(), a = new Array(), n = e.length, s = 0; s < n; s++) -1 === o.indexOf(e[s].id) ? a.push(e[s]) : t.push(e[s]);
        if (console.log(t), console.log(a), console.log(this.data.options), null == this.data.options.dnjr) console.log("从个人中心进入"), 
        this.setData({
            received: t,
            unreceive: a
        }); else {
            console.log("从店铺优惠券进入");
            for (var r = [], i = [], c = 0; c < a.length; c++) a[c].store_id == getApp().sjid && r.push(a[c]);
            this.setData({
                unreceive: r
            });
            for (var u = 0; u < t.length; u++) t[u].store_id == getApp().sjid && i.push(t[u]);
            this.setData({
                unreceive: r,
                received: i
            });
        }
    },
    cash: function(e) {
        for (var o = new Array(), t = e.length, a = 0; a < t; a++) o.push(e[a].vouchers_id);
        return o;
    },
    again: function(e, o) {
        for (var t = new Array(), a = new Array(), n = e.length, s = 0; s < n; s++) -1 === o.indexOf(e[s].id) ? a.push(e[s]) : t.push(e[s]);
        if (console.log(t), console.log(a), null == this.data.options.dnjr) console.log("从个人中心进入"), 
        this.setData({
            draw: t,
            undraw: a
        }); else {
            console.log("从店铺优惠券进入");
            for (var r = [], i = [], c = 0; c < a.length; c++) a[c].store_id == getApp().sjid && r.push(a[c]);
            this.setData({
                undraw: r
            });
            for (var u = 0; u < t.length; u++) t[u].store_id == getApp().sjid && i.push(t[u]);
            this.setData({
                undraw: r,
                draw: i
            });
        }
    },
    use: function() {
        wx.navigateBack({});
    },
    details: function(e) {
        console.log(e);
        var o = e.currentTarget.id;
        wx.navigateTo({
            url: "coupons_details?id=" + o + "&type=1&state=1"
        });
    },
    detail: function(e) {
        console.log(e);
        var o = e.currentTarget.id;
        wx.navigateTo({
            url: "coupons_details?id=" + o + "&type=2&state=1"
        });
    },
    draws: function(o) {
        var t = o.currentTarget.dataset.index, a = wx.getStorageSync("users").id, n = this.data.undraw[t].id;
        console.log(n);
        var s = this;
        e.util.request({
            url: "entry/wxapp/AddVoucher",
            cachetime: "0",
            data: {
                user_id: a,
                vouchers_id: n
            },
            success: function(e) {
                if (console.log(e), 1 == e.data) {
                    wx.showToast({
                        title: "领取成功",
                        icon: "success",
                        duration: 1e3
                    });
                    var o = s.data.undraw, a = s.data.draw;
                    a.push(o[t]), o.splice(t, 1), console.log(a), console.log(o), setTimeout(function() {
                        s.setData({
                            draw: a,
                            undraw: o
                        });
                    }, 1e3);
                }
            }
        });
    },
    receive: function(o) {
        var t = o.currentTarget.dataset.index, a = wx.getStorageSync("users").id, n = this.data.unreceive[t].id;
        console.log(n);
        var s = this;
        e.util.request({
            url: "entry/wxapp/AddCoupons",
            cachetime: "0",
            data: {
                user_id: a,
                coupons_id: n
            },
            success: function(e) {
                if (console.log(e), 1 == e.data) {
                    wx.showToast({
                        title: "领取成功",
                        icon: "success",
                        duration: 1e3
                    });
                    var o = s.data.unreceive, a = s.data.received;
                    a.push(o[t]), o.splice(t, 1), console.log(a), console.log(o), setTimeout(function() {
                        s.setData({
                            received: a,
                            unreceive: o
                        });
                    }, 1e3);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onUnload: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});