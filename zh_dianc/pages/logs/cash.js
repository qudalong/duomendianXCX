var e = getApp();

Page({
    data: {
        open: !1,
        kong: !0
    },
    onLoad: function(t) {
        var a = this, n = wx.getStorageSync("users").id;
        e.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                console.log(e), a.setData({
                    wallet: e.data.wallet
                });
            }
        }), e.util.request({
            url: "entry/wxapp/Czhd",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    czhd: e.data
                });
            }
        });
    },
    jsmj: function(e, t) {
        for (var a, n = 0; n < t.length; n++) if (Number(e) >= Number(t[n].full)) {
            a = n;
            break;
        }
        return a;
    },
    bindInput: function(e) {
        console.log(e.detail.value), this.setData({
            czje: e.detail.value
        }), "" != e.detail.value ? this.setData({
            kong: !1
        }) : this.setData({
            kong: !0
        });
    },
    tradeinfo: function() {
        this.setData({
            open: !this.data.open
        });
    },
    formSubmit: function(t) {
        var a = t.detail.formId;
        console.log("form发生了submit事件，携带数据为：", t.detail, t.detail.formId);
        var n = wx.getStorageSync("openid"), o = t.detail.value.czje, s = this.data.czhd, i = wx.getStorageSync("users").id;
        if (console.log(s), 0 == s.length) var c = o; else if (Number(o) >= Number(this.data.czhd[s.length - 1].full)) {
            var l = this.jsmj(o, s);
            console.log(l), c = Number(o) + Number(s[l].reduction);
        } else c = o;
        console.log(n, o, i, c), e.util.request({
            url: "entry/wxapp/AddCzorder",
            cachetime: "0",
            data: {
                user_id: i,
                money: c,
                form_id: a
            },
            success: function(t) {
                console.log(t);
                var a = t.data;
                e.util.request({
                    url: "entry/wxapp/pay4",
                    cachetime: "0",
                    data: {
                        openid: n,
                        money: o,
                        order_id: a
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log(e);
                            },
                            complete: function(e) {
                                console.log(e), "requestPayment:fail cancel" == e.errMsg && wx.showToast({
                                    title: "取消支付"
                                }), "requestPayment:ok" == e.errMsg && (wx.showModal({
                                    title: "提示",
                                    content: "支付成功",
                                    showCancel: !1
                                }), setTimeout(function() {
                                    wx.navigateBack({});
                                }, 1e3));
                            }
                        });
                    }
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