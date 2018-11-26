var e, t = getApp();

Page({
    data: {
        money: 0,
        qzf: !0,
        showModal: !1,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1"
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), "wxzf" == e.detail.value && this.setData({
            zffs: 1,
            zfwz: "微信支付",
            btntype: "btn_ok1"
        }), "yezf" == e.detail.value && this.setData({
            zffs: 2,
            zfwz: "余额支付",
            btntype: "btn_ok2"
        }), "jfzf" == e.detail.value && this.setData({
            zffs: 3,
            zfwz: "积分支付",
            btntype: "btn_ok3"
        });
    },
    xszz: function() {
        this.setData({
            showModal: !0
        });
    },
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    money: function(e) {
        var t;
        console.log(e.detail.value), t = "" != e.detail.value ? e.detail.value : 0, this.setData({
            money: parseFloat(t).toFixed(2)
        });
    },
    formSubmit: function(o) {
        var a = this;
        e = o.detail.formId, a.setData({
            form_id: e
        });
        var s = wx.getStorageSync("openid"), n = wx.getStorageSync("users").id, i = this.data.money, c = this.data.store.name, r = this.data.store.id;
        if (console.log(s, i, c, r), 0 == i) return wx.showModal({
            title: "提示",
            content: "付款金额不能等于0"
        }), !1;
        if (console.log("form发生了submit事件，携带数据为：", o.detail.value.radiogroup), "yezf" == o.detail.value.radiogroup) {
            var l = Number(this.data.wallet);
            if (i = Number(this.data.money), console.log(l, i), l < i) return void wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            });
        }
        var u = 0;
        if ("jfzf" == o.detail.value.radiogroup) {
            var d = Number(this.data.total_score) / Number(this.data.jf_proportion);
            if (i = Number(this.data.money), u = i * Number(this.data.jf_proportion), console.log(d, i, u), 
            d < i) return void wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            });
        }
        if ("yezf" == o.detail.value.radiogroup) var f = 1;
        "wxzf" == o.detail.value.radiogroup && (f = 2), "jfzf" == o.detail.value.radiogroup && (f = 3), 
        console.log("是否余额", f), "" == e ? wx.showToast({
            title: "网络不好",
            icon: "loading",
            duration: 500,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (this.setData({
            zfz: !0
        }), "yezf" == o.detail.value.radiogroup ? (console.log("余额支付流程"), t.util.request({
            url: "entry/wxapp/DmOrder",
            cachetime: "0",
            data: {
                money: i,
                store_id: r,
                user_id: n,
                is_yue: f,
                form_id: e
            },
            success: function(o) {
                a.setData({
                    zfz: !1,
                    showModal: !1
                }), console.log(o);
                var n = o.data;
                "下单失败" != o.data && t.util.request({
                    url: "entry/wxapp/dmpay",
                    cachetime: "0",
                    data: {
                        order_id: n
                    },
                    success: function(o) {
                        console.log(o), a.onShow1(), t.util.request({
                            url: "entry/wxapp/dmPrint",
                            cachetime: "0",
                            data: {
                                order_id: n
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), t.util.request({
                            url: "entry/wxapp/dmPrint2",
                            cachetime: "0",
                            data: {
                                order_id: n
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), t.util.request({
                            url: "entry/wxapp/Message2",
                            cachetime: "0",
                            data: {
                                openid: s,
                                form_id: e,
                                name: c,
                                money: i + "元"
                            },
                            success: function(e) {
                                console.log(e), wx.showModal({
                                    title: "提示",
                                    content: "支付成功"
                                });
                            }
                        });
                    }
                });
            }
        })) : "jfzf" == o.detail.value.radiogroup ? (console.log("积分支付流程"), t.util.request({
            url: "entry/wxapp/DmOrder",
            cachetime: "0",
            data: {
                money: i,
                store_id: r,
                user_id: n,
                is_yue: f,
                form_id: e
            },
            success: function(o) {
                a.setData({
                    zfz: !1,
                    showModal: !1
                }), console.log(o);
                var n = o.data;
                "下单失败" != o.data && t.util.request({
                    url: "entry/wxapp/dmpay",
                    cachetime: "0",
                    data: {
                        order_id: n,
                        jf: u
                    },
                    success: function(o) {
                        console.log(o), a.onShow1(), t.util.request({
                            url: "entry/wxapp/dmPrint",
                            cachetime: "0",
                            data: {
                                order_id: n
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), t.util.request({
                            url: "entry/wxapp/dmPrint2",
                            cachetime: "0",
                            data: {
                                order_id: n
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), t.util.request({
                            url: "entry/wxapp/Message2",
                            cachetime: "0",
                            data: {
                                openid: s,
                                form_id: e,
                                name: c,
                                money: i + "元"
                            },
                            success: function(e) {
                                console.log(e), wx.showModal({
                                    title: "提示",
                                    content: "支付成功"
                                });
                            }
                        });
                    }
                });
            }
        })) : (console.log("微信支付流程"), t.util.request({
            url: "entry/wxapp/DmOrder",
            cachetime: "0",
            data: {
                money: i,
                store_id: r,
                user_id: n,
                is_yue: f,
                form_id: e
            },
            success: function(o) {
                a.setData({
                    zfz: !1,
                    showModal: !1
                }), console.log(o), "下单失败" != o.data && (a.onShow(), t.util.request({
                    url: "entry/wxapp/pay3",
                    cachetime: "0",
                    data: {
                        openid: s,
                        money: i,
                        order_id: o.data
                    },
                    success: function(t) {
                        console.log(t), wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log(t.data), console.log(t), console.log(e);
                            },
                            complete: function(e) {
                                console.log(e), "requestPayment:fail cancel" == e.errMsg && wx.showToast({
                                    title: "取消支付",
                                    icon: "loading",
                                    duration: 1e3
                                }), "requestPayment:ok" == e.errMsg && (a.onShow1(), wx.showModal({
                                    title: "提示",
                                    content: "支付成功"
                                }));
                            }
                        });
                    }
                }));
            }
        })));
    },
    onLoad: function(e) {
        var o = wx.getStorageSync("nbcolor");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: o
        }), this.setData({
            money: parseFloat(0).toFixed(2)
        });
        var a = this;
        console.log(e);
        var s = decodeURIComponent(e.scene);
        if ("undefined" != s) {
            console.log("扫码进入");
            var n = s;
        } else n = getApp().sjid;
        console.log("scene", s, n), wx.login({
            success: function(e) {
                var o = e.code;
                wx.setStorageSync("code", e.code), t.util.request({
                    url: "entry/wxapp/openid",
                    cachetime: "0",
                    data: {
                        code: o
                    },
                    success: function(e) {
                        console.log(e), wx.setStorageSync("key", e.data.session_key), wx.setStorageSync("openid", e.data.openid);
                        var o = e.data.openid;
                        console.log(o), "" == o ? wx.showToast({
                            title: "没有获取到openid",
                            icon: "",
                            image: "",
                            duration: 1e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }) : t.util.request({
                            url: "entry/wxapp/Login",
                            cachetime: "0",
                            data: {
                                openid: o
                            },
                            success: function(e) {
                                console.log(e), wx.setStorageSync("users", e.data), a.onShow1();
                            }
                        });
                    }
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: n
            },
            success: function(e) {
                console.log(e), a.setData({
                    store: e.data,
                    color: e.data.color
                }), "1" == e.data.is_yue ? a.setData({
                    sjkqyue: !0
                }) : a.setData({
                    sjkqyue: !1
                }), "1" == e.data.is_jfpay ? a.setData({
                    sjkqjf: !0
                }) : a.setData({
                    sjkqjf: !1
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                a.setData({
                    url: e.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    ptxx: e.data,
                    jf_proportion: e.data.jf_proportion
                }), "1" == e.data.is_yue ? a.setData({
                    ptkqyue: !0
                }) : a.setData({
                    ptkqyue: !1
                }), "1" == e.data.is_jfpay ? a.setData({
                    ptkqjf: !0
                }) : a.setData({
                    ptkqjf: !1
                });
            }
        });
    },
    onReady: function() {},
    onShow1: function() {
        var e = this, o = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), e.setData({
                    wallet: t.data.wallet,
                    total_score: t.data.total_score
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});