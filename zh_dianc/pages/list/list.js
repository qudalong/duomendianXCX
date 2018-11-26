var t = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        tabs: [ "外卖", "点餐", "预定" ],
        wm: "外卖",
        dc: "点餐",
        yd: "预定",
        activeIndex: 0,
        dndd: [],
        wmdd: []
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("imglink"), o = t.activeindex;
        this.setData({
            activeIndex: o,
            imglink: e
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = wx.getStorageSync("bqxx");
        console.log(e);
        var o = this;
        if (t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), "" != t.data.wm_name && o.setData({
                    wm: t.data.wm_name
                }), "" != t.data.dc_name && o.setData({
                    dc: t.data.dc_name
                }), "" != t.data.yd_name && o.setData({
                    yd: t.data.yd_name
                });
                var e = Number(t.data.day);
                console.log(e), 0 == e && (e = 1), o.setData({
                    day: e
                });
            }
        }), "1" == e.more) var a = wx.getStorageSync("bqxx").color;
        "2" == e.more && (a = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a
        }), this.setData({
            color: a
        }), console.log("ddonShow"), this.reLoad();
    },
    reLoad: function() {
        var o = wx.getStorageSync("users").id, a = this;
        t.util.request({
            url: "entry/wxapp/MyReservation",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), a.setData({
                    ydlist: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/myorder",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(o) {
                console.log(o);
                for (var n = [], c = [], s = 0; s < o.data.length; s++) "1" == o.data[s].type ? c.push(o.data[s]) : n.push(o.data[s]), 
                a.setData({
                    dndd: n,
                    wmdd: c
                });
                for (var d = 0; d < c.length; d++) if ("3" == c[d].state) {
                    var i = e.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"), r = c[d].time.substring(0, 10);
                    console.log(r, i);
                    var l = e.DateDiff(r, i);
                    console.log(l, a.data.day), l >= a.data.day && t.util.request({
                        url: "entry/wxapp/Complete",
                        cachetime: "0",
                        data: {
                            id: c[d].id
                        },
                        success: function(t) {
                            console.log(t.data), "1" == t.data && (console.log("自动确认收货"), a.reLoad());
                        }
                    });
                }
                console.log(n, c);
            }
        });
    },
    qxyy: function(e) {
        var o = this;
        console.log("取消预约" + e.currentTarget.dataset.yyid), wx.showModal({
            title: "提示",
            content: "确定取消预约么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/CancelReservation",
                    cachetime: "0",
                    data: {
                        id: e.currentTarget.dataset.yyid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    ckxq: function(t) {
        console.log("查看详情" + t.currentTarget.dataset.yyid), wx.navigateTo({
            url: "reserveinfo/reserveinfo?yyid=" + t.currentTarget.dataset.yyid
        });
    },
    qxdd: function(e) {
        var o = this;
        console.log("取消订单" + e.currentTarget.dataset.wmddid), wx.showModal({
            title: "提示",
            content: "确定取消订单么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/CancelOrder",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    ljzf: function(t) {
        console.log("立即支付" + t.currentTarget.dataset.wmddid), wx.navigateTo({
            url: "waim/waim?wmddid=" + t.currentTarget.dataset.wmddid
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
    qrsh: function(e) {
        var o = this;
        console.log("确认收货" + e.currentTarget.dataset.wmddid), wx.showModal({
            title: "提示",
            content: "确定收货么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/Complete",
                    cachetime: "0",
                    data: {
                        id: e.currentTarget.dataset.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "收货成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    scdd: function(e) {
        var o = this;
        console.log("删除订单" + e.currentTarget.dataset.wmddid), wx.showModal({
            title: "提示",
            content: "删除订单么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/DelOrder",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    scyy: function(e) {
        var o = this;
        console.log("删除订单" + e.currentTarget.dataset.yyid), wx.showModal({
            title: "提示",
            content: "删除订单么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/DelYd",
                    cachetime: "0",
                    data: {
                        id: e.currentTarget.dataset.yyid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    sqtk: function(e) {
        var o = this;
        console.log("申请退款" + e.currentTarget.dataset.wmddid), wx.showModal({
            title: "提示",
            content: "申请退款么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/Tuik",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "申请成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    yysqtk: function(e) {
        var o = this;
        console.log("预约申请退款" + e.currentTarget.dataset.yyid), wx.showModal({
            title: "提示",
            content: "申请退款么",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/YdRefund",
                    cachetime: "0",
                    data: {
                        id: e.currentTarget.dataset.yyid
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "申请成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    zlyd: function(t) {
        wx.switchTab({
            url: "../home/home"
        });
    },
    pingjia: function(t) {
        console.log("评价" + t.currentTarget.dataset.wmddid), wx.navigateTo({
            url: "../comment/comment?wmddid=" + t.currentTarget.dataset.wmddid
        });
    },
    dnljzf: function(t) {
        console.log("立即支付" + t.currentTarget.dataset.dnddid), wx.navigateTo({
            url: "choose/choose?dnddid=" + t.currentTarget.dataset.dnddid
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});