var e = getApp(), t = require("../../utils/util.js");

Page({
    data: {
        form_id: "",
        index: 0,
        inde: 0,
        array: [],
        showModal: !1,
        zftype: !0,
        zfz: !1,
        chzf: !1,
        zffs: 1,
        zfwz: "微信支付",
        btntype: "btn_ok1",
        beizhu: ""
    },
    ddbz: function(e) {
        console.log(e.detail.value), this.setData({
            beizhu: e.detail.value
        });
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), "wxzf" == e.detail.value && this.setData({
            zftype: !0,
            chzf: !1,
            zffs: 1,
            zfwz: "微信支付",
            btntype: "btn_ok1"
        }), "yezf" == e.detail.value && this.setData({
            zftype: !1,
            chzf: !1,
            zffs: 2,
            zfwz: "余额支付",
            btntype: "btn_ok2"
        }), "jfzf" == e.detail.value && this.setData({
            chzf: !1,
            zffs: 3,
            zfwz: "积分支付",
            btntype: "btn_ok3"
        }), "chzf" == e.detail.value && this.setData({
            chzf: !0,
            zffs: 4,
            zfwz: "餐后支付"
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
    qdzf: function() {
        console.log("确定支付");
    },
    jsmj: function(e, t) {
        for (var a, o = 0; o < t.length; o++) if (Number(e) >= Number(t[o].full)) {
            a = o;
            break;
        }
        return a;
    },
    onLoad: function(a) {
        var o = a.tableid;
        console.log(o);
        var s = this;
        e.util.request({
            url: "entry/wxapp/Zhuohao",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(e) {
                console.log(e), s.setData({
                    tabletypename: e.data.type_name,
                    tablename: e.data.table_name,
                    table_id: o
                });
            }
        }), e.util.request({
            url: "entry/wxapp/TableType",
            cachetime: "0",
            success: function(e) {
                console.log(e), s.setData({
                    array: e.data
                });
            }
        }), e.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), s.setData({
                    jf_proportion: e.data.jf_proportion
                }), "1" == e.data.is_yue ? s.setData({
                    ptkqyue: !0
                }) : s.setData({
                    ptkqyue: !1
                }), "1" == e.data.is_jfpay ? s.setData({
                    ptkqjf: !0
                }) : s.setData({
                    ptkqjf: !1
                });
            }
        });
        var i = wx.getStorageSync("users").id;
        if (e.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: i
            },
            success: function(e) {
                console.log(e), s.setData({
                    wallet: e.data.wallet,
                    total_score: e.data.total_score
                });
            }
        }), e.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                s.setData({
                    url: e.data
                });
            }
        }), null == a.preferential) var n = 0; else n = Number(a.preferential);
        console.log(n);
        var l = t.formatTime(new Date()), c = wx.getStorageSync("order"), r = wx.getStorageSync("store");
        console.log(c), console.log(r), "1" == r.is_yue ? s.setData({
            sjkqyue: !0
        }) : s.setData({
            sjkqyue: !1
        }), "1" == r.is_jfpay ? s.setData({
            sjkqjf: !0
        }) : s.setData({
            sjkqjf: !1
        });
        for (var u, d = 0, f = 0; f < c.length; f++) d += Number(c[f].money) * c[f].num;
        e.util.request({
            url: "entry/wxapp/Reduction",
            cachetime: "0",
            data: {
                id: r.id
            },
            success: function(e) {
                console.log(e);
                for (var t = [], a = 0; a < e.data.length; a++) "2" != e.data[a].type && "3" != e.data[a].type || t.push(e.data[a]);
                console.log(t);
                var o = 0;
                if (0 == t.length) u = Number(d) - n - o, console.log(o); else if (Number(d) >= Number(t[t.length - 1].full)) {
                    console.log(s.jsmj(d, t));
                    var i = s.jsmj(d, t);
                    o = Number(t[i].reduction), console.log(o), u = Number(d) - n - o;
                } else u = Number(d) - n - o, console.log(o);
                u <= 0 && (u = .01), s.setData({
                    zfmoney: u.toFixed(2),
                    cut: o
                }), console.log(u);
            }
        }), s.setData({
            order: c,
            store: r,
            color: r.color,
            types: a.types,
            totalPrice: d,
            time: l,
            pre: n,
            coupons_id: a.coupons_id,
            vouchers_id: a.vouchers_id
        });
    },
    coupon: function(e) {
        var t = this;
        console.log(t.data), wx.navigateTo({
            url: "../coupons/mine_coupons?totalPrice=" + t.data.totalPrice + "&state=2&tableid=" + t.data.table_id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    formSubmit: function(t) {
        var a = this.data.beizhu;
        if (console.log("form发生了submit事件，携带数据为：", t.detail.value), "wxzf" == t.detail.value.radiogroup) var o = 2;
        "yezf" == t.detail.value.radiogroup && (o = 1), "chzf" == t.detail.value.radiogroup && (o = 0), 
        "jfzf" == t.detail.value.radiogroup && (o = 3);
        var s = this;
        console.log(s.data);
        var i = s.data.store.id;
        console.log(i);
        var n = s.data.order, l = wx.getStorageSync("openid"), c = t.detail.formId;
        console.log(c);
        var r = wx.getStorageSync("users").id;
        if (null == s.data.coupons_id) {
            console.log("用户没有选择优惠券");
            var u = "";
        } else console.log("用户选择了优惠券"), u = s.data.coupons_id;
        if (null == s.data.vouchers_id) {
            console.log("用户没有选择代金券");
            var d = "";
        } else console.log("用户选择了代金券"), d = s.data.vouchers_id;
        console.log("代金券id" + d), console.log("优惠券id" + u);
        var f = s.data.pre + Number(s.data.cut), p = (Number(s.data.totalPrice), Number(s.data.zfmoney));
        if (console.log(p), "yezf" == t.detail.value.radiogroup) {
            var g = Number(this.data.wallet);
            if (console.log(g, p), g < p) return void wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            });
        }
        var m = 0;
        if ("jfzf" == t.detail.value.radiogroup) {
            var h = Number(this.data.total_score) / Number(this.data.jf_proportion);
            if (m = p * Number(this.data.jf_proportion), console.log(h, p, m), h < p) return void wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            });
        }
        console.log(2);
        var y = s.data.table_id;
        console.log("桌号" + y);
        var w = s.data.tabletype_id;
        console.log("桌子类型" + w);
        var _ = [];
        n.map(function(e) {
            if (0 < e.num) {
                var t = {};
                t.name = e.name, t.img = e.icon, t.num = e.num, t.money = e.money, t.dishes_id = e.id, 
                _.push(t);
            }
        }), console.log(_), p <= 0 ? wx.showToast({
            title: "金额不能为0",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (this.setData({
            zfz: !0
        }), e.util.request({
            url: "entry/wxapp/AddOrder",
            cachetime: "0",
            data: {
                type: 2,
                money: p,
                user_id: r,
                table_id: y,
                seller_id: i,
                coupons_id: u,
                voucher_id: d,
                preferential: f,
                sz: _,
                is_yue: o,
                note: a,
                form_id: c,
                jf: m
            },
            success: function(a) {
                var o = a.data;
                console.log("本次的订单id为" + o), "下单失败" != o && (s.setData({
                    zfz: !1,
                    showModal: !1
                }), "yezf" == t.detail.value.radiogroup && (console.log("用户选择余额支付"), e.util.request({
                    url: "entry/wxapp/PayOrder",
                    cachetime: "0",
                    data: {
                        user_id: r,
                        order_id: o,
                        coupons_id: u,
                        voucher_id: d
                    },
                    success: function(t) {
                        console.log(t), wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        }), setTimeout(function() {
                            wx.switchTab({
                                url: "../list/list"
                            });
                        }, 1e3), e.util.request({
                            url: "entry/wxapp/DnPrint",
                            cachetime: "0",
                            data: {
                                order_id: o,
                                pay_type: "余额支付"
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), e.util.request({
                            url: "entry/wxapp/DnPrint2",
                            cachetime: "0",
                            data: {
                                order_id: o,
                                pay_type: "余额支付"
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), e.util.request({
                            url: "entry/wxapp/SmsSet",
                            cachetime: "0",
                            data: {
                                store_id: i
                            },
                            success: function(t) {
                                console.log(t), "1" == t.data.is_dnsms && e.util.request({
                                    url: "entry/wxapp/sms",
                                    cachetime: "0",
                                    data: {
                                        store_id: i
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                });
                            }
                        });
                    }
                })), "jfzf" == t.detail.value.radiogroup && (console.log("用户选择积分支付"), e.util.request({
                    url: "entry/wxapp/PayOrder",
                    cachetime: "0",
                    data: {
                        user_id: r,
                        order_id: o,
                        coupons_id: u,
                        voucher_id: d
                    },
                    success: function(t) {
                        console.log(t), wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        }), setTimeout(function() {
                            wx.switchTab({
                                url: "../list/list"
                            });
                        }, 1e3), e.util.request({
                            url: "entry/wxapp/DnPrint",
                            cachetime: "0",
                            data: {
                                order_id: o,
                                pay_type: "积分支付"
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), e.util.request({
                            url: "entry/wxapp/DnPrint2",
                            cachetime: "0",
                            data: {
                                order_id: o,
                                pay_type: "积分支付"
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), e.util.request({
                            url: "entry/wxapp/SmsSet",
                            cachetime: "0",
                            data: {
                                store_id: i
                            },
                            success: function(t) {
                                console.log(t), "1" == t.data.is_dnsms && e.util.request({
                                    url: "entry/wxapp/sms",
                                    cachetime: "0",
                                    data: {
                                        store_id: i
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                });
                            }
                        });
                    }
                })), "wxzf" == t.detail.value.radiogroup && (console.log("用户选择微信支付"), e.util.request({
                    url: "entry/wxapp/pay",
                    cachetime: "0",
                    data: {
                        openid: l,
                        order_id: o,
                        money: p
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log(e.data), console.log(e);
                            },
                            complete: function(e) {
                                "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                    title: "取消支付"
                                }), setTimeout(function() {
                                    wx.switchTab({
                                        url: "../list/list"
                                    });
                                }, 1e3)), "requestPayment:ok" == e.errMsg && (wx.showModal({
                                    title: "提示",
                                    content: "支付成功",
                                    showCancel: !1
                                }), setTimeout(function() {
                                    wx.switchTab({
                                        url: "../list/list"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                })), "chzf" == t.detail.value.radiogroup && (console.log("用户选择餐后支付"), wx.showModal({
                    title: "提示",
                    content: "下单成功",
                    showCancel: !1
                }), e.util.request({
                    url: "entry/wxapp/DnPrint",
                    cachetime: "0",
                    data: {
                        order_id: o,
                        pay_type: "餐后支付"
                    },
                    success: function(e) {
                        console.log(e);
                    }
                }), e.util.request({
                    url: "entry/wxapp/DnPrint2",
                    cachetime: "0",
                    data: {
                        order_id: o,
                        pay_type: "餐后支付"
                    },
                    success: function(e) {
                        console.log(e);
                    }
                }), e.util.request({
                    url: "entry/wxapp/SmsSet",
                    cachetime: "0",
                    data: {
                        store_id: i
                    },
                    success: function(t) {
                        console.log(t), "1" == t.data.is_dnsms && e.util.request({
                            url: "entry/wxapp/sms",
                            cachetime: "0",
                            data: {
                                store_id: i
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        });
                    }
                }), wx.switchTab({
                    url: "../list/list"
                })));
            }
        }));
    },
    bindPickerChange: function(t) {
        var a = this;
        console.log("picker发送选择改变，携带值为", t.detail.value);
        var o = t.detail.value;
        a.setData({
            index: o,
            inde: 0
        }), console.log(a.data), e.util.request({
            url: "entry/wxapp/TableType",
            cachetime: "0",
            success: function(t) {
                var s = t.data[o].id;
                e.util.request({
                    url: "entry/wxapp/Table",
                    cachetime: "0",
                    data: {
                        type_id: s
                    },
                    success: function(e) {
                        console.log(e), a.setData({
                            not_use: e.data,
                            tabletype_id: s,
                            table_id: e.data[a.data.inde].id
                        });
                    }
                });
            }
        });
    },
    bindPickerChange_one: function(t) {
        var a = this;
        console.log(a.data), a.data.index;
        var o = a.data.tabletype_id;
        e.util.request({
            url: "entry/wxapp/Table",
            cachetime: "0",
            data: {
                type_id: o
            },
            success: function(e) {
                console.log(e), a.setData({
                    not_use: e.data,
                    table_id: e.data[a.data.inde].id
                });
            }
        }), console.log("picker发送选择改变，携带值为", t.detail.value), a.setData({
            inde: t.detail.value,
            value: t.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {
        e.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(e) {
                console.log(e), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});