var t, o = getApp();

Page({
    data: {
        list: [ {
            name: "回锅肉",
            num: 1,
            money: "23.8"
        }, {
            name: "番茄鸡蛋",
            num: 1,
            money: "18"
        } ]
    },
    call_phone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.wmddinfo.store.tel
        });
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("bqxx");
        if ("1" == e.more) var n = wx.getStorageSync("bqxx").color;
        "2" == e.more && (n = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n
        });
        var a = wx.getStorageSync("imglink"), i = this, d = t.wmddid;
        console.log(d), o.util.request({
            url: "entry/wxapp/OrderInfo",
            cachetime: "0",
            data: {
                id: d
            },
            success: function(t) {
                console.log(t), i.setData({
                    wmddinfo: t.data,
                    imglink: a
                });
            }
        }), o.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), i.setData({
                    ptxx: t.data
                });
            }
        });
    },
    formSubmit: function(o) {
        t = o.detail.formId, console.log(t);
    },
    onPay: function() {
        var e = this.data.wmddinfo.store.id, n = wx.getStorageSync("users").id, a = wx.getStorageSync("openid"), i = this.data.wmddinfo.order.money, d = this.data.wmddinfo.order.id, c = this.data.wmddinfo.order.coupons_id, s = this.data.wmddinfo.order.voucher_id;
        this.data.wmddinfo.order.area, this.data.wmddinfo.order.lat, this.data.wmddinfo.order.lng, 
        this.data.wmddinfo.store.ps_mode, console.log(e, n, a, i, d, c, s), "" == t ? wx.showToast({
            title: "网络不好",
            icon: "loading"
        }) : o.util.request({
            url: "entry/wxapp/pay",
            cachetime: "0",
            data: {
                openid: a,
                order_id: d,
                money: i
            },
            success: function(t) {
                console.log(t), wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        console.log(t.data), console.log(t);
                    },
                    complete: function(t) {
                        console.log(t.errMsg), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == t.errMsg && (wx.showToast({
                            title: "支付成功",
                            icon: "loading",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3));
                    }
                });
            }
        });
    },
    qxdd: function(t) {
        console.log("取消订单" + t.currentTarget.dataset.wmddid), wx.showModal({
            title: "提示",
            content: "确定取消订单么",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), o.util.request({
                    url: "entry/wxapp/CancelOrder",
                    cachetime: "0",
                    data: {
                        order_id: t.currentTarget.dataset.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    txsj: function(t) {
        console.log("提醒商家" + t.currentTarget.dataset.wmddtel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.wmddtel
        });
    },
    lxsj: function(t) {
        console.log("联系商家" + t.currentTarget.dataset.wmddtel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.wmddtel
        });
    },
    qrsh: function(t) {
        console.log("确认收货" + t.currentTarget.dataset.wmddid), wx.showModal({
            title: "提示",
            content: "确定收货么",
            success: function(e) {
                e.confirm ? (console.log("用户点击确定"), o.util.request({
                    url: "entry/wxapp/Complete",
                    cachetime: "0",
                    data: {
                        id: t.currentTarget.dataset.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "收货成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    zlyd: function(t) {
        wx.switchTab({
            url: "../../home/home"
        });
    },
    pingjia: function(t) {
        console.log("评价" + t.currentTarget.dataset.wmddid), wx.navigateTo({
            url: "../../comment/comment?wmddid=" + t.currentTarget.dataset.wmddid
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});