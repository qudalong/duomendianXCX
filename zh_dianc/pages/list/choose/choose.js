var o, n = getApp();

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
            phoneNumber: "02750661298"
        });
    },
    onLoad: function(o) {
        var e = wx.getStorageSync("bqxx");
        if ("1" == e.more) var t = wx.getStorageSync("bqxx").color;
        "2" == e.more && (t = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        }), (d = this).setData({
            color: t
        });
        var a = wx.getStorageSync("imglink"), d = this, i = o.dnddid;
        console.log(i), n.util.request({
            url: "entry/wxapp/OrderInfo",
            cachetime: "0",
            data: {
                id: i
            },
            success: function(o) {
                console.log(o.data), d.setData({
                    dnddinfo: o.data,
                    imglink: a
                });
            }
        }), n.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(o) {
                console.log(o), d.setData({
                    ptxx: o.data
                });
            }
        });
    },
    formSubmit: function(n) {
        o = n.detail.formId, console.log(o);
    },
    onPay: function() {
        var e = wx.getStorageSync("users").id, t = wx.getStorageSync("openid"), a = this.data.dnddinfo.order.money, d = this.data.dnddinfo.order.id, i = this.data.dnddinfo.order.coupons_id, c = this.data.dnddinfo.order.voucher_id;
        console.log(e, t, a, d, i, c), "" == o ? wx.showToast({
            title: "网络不好",
            icon: "loading"
        }) : n.util.request({
            url: "entry/wxapp/pay",
            cachetime: "0",
            data: {
                openid: t,
                order_id: d,
                money: a
            },
            success: function(o) {
                console.log(o), wx.requestPayment({
                    timeStamp: o.data.timeStamp,
                    nonceStr: o.data.nonceStr,
                    package: o.data.package,
                    signType: o.data.signType,
                    paySign: o.data.paySign,
                    success: function(o) {
                        console.log(o.data), console.log(o);
                    },
                    complete: function(o) {
                        console.log(o.errMsg), "requestPayment:fail cancel" == o.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == o.errMsg && (wx.showToast({
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
    lxsj: function(o) {
        console.log("联系商家" + o.currentTarget.dataset.dnddtel), wx.makePhoneCall({
            phoneNumber: o.currentTarget.dataset.dnddtel
        });
    },
    zlyd: function(o) {
        console.log("再来一单" + o.currentTarget.dataset.dnddid), wx.switchTab({
            url: "../../home/home"
        });
    },
    pingjia: function(o) {
        console.log("评价" + o.currentTarget.dataset.dnddid), wx.navigateTo({
            url: "../../comment/comment?wmddid=" + o.currentTarget.dataset.dnddid
        });
    },
    chzf: function() {
        wx.showModal({
            title: "提示",
            content: "请用餐结束后到前台付款",
            showCancel: !1
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