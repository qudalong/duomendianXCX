var e, t = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        date: "",
        index: 0,
        jindex: 0,
        time: "12:00",
        array: [],
        jcrsarray: [ "1人", "2人", "3人", "4人", "5人", "6人", "7人", "8人", "9人", "10人", "10人以上" ],
        showModal: !1,
        zftype: !0,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1"
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
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), this.setData({
            zflx: e.detail.value
        }), "wxzf" == e.detail.value && this.setData({
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
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index: e.detail.value
        });
    },
    bindDateChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            date: e.detail.value
        });
    },
    bindTimeChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            time: e.detail.value
        });
    },
    bindjcrsChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            jindex: e.detail.value
        });
    },
    formSubmit: function(a) {
        var o = this;
        e = a.detail.formId, o.setData({
            form_id: e
        }), console.log("form发生了submit事件，携带数据为：", a.detail.value);
        var s = this.data.array;
        if (console.log(s), 0 != s.length) {
            var i = wx.getStorageSync("openid"), n = this.data.store.name, l = wx.getStorageSync("users").id, c = this.data.store.id, r = a.detail.value.datepicker, d = a.detail.value.timepicker, u = a.detail.value.zwpicker.name, p = a.detail.value.zwpicker.id, f = a.detail.value.zwpicker.zd_cost, m = a.detail.value.lxr, _ = a.detail.value.jcrs, y = a.detail.value.tel, w = parseFloat(a.detail.value.zwpicker.yd_cost), h = a.detail.value.beizhu;
            console.log(i, n, l, c, r, d, u, p, m, _, y, w, h), o.setData({
                ydcost: w,
                forminfo: a.detail.value
            });
            var g = "", x = !0;
            "" == m ? g = "请填写您的姓名！" : "" == _ ? g = "请选择您的就惨人数" : "" == y ? g = "请填写您的手机号！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(y) ? (x = !1, 
            "" == e ? wx.showToast({
                title: "网络不好",
                icon: "loading",
                duration: 500,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            }) : 0 < w ? o.setData({
                showModal: !0
            }) : t.util.request({
                url: "entry/wxapp/Reservation",
                cachetime: "0",
                data: {
                    store_id: c,
                    user_id: l,
                    xz_date: r,
                    yjdd_date: d,
                    table_type_id: p,
                    table_type_name: u,
                    zd_cost: f,
                    link_name: m,
                    link_tel: y,
                    jc_num: _,
                    remark: h,
                    money: w,
                    ydcode: ""
                },
                success: function(a) {
                    console.log(a);
                    var s = a.data;
                    "预定失败" != a.data ? (wx.showModal({
                        title: "提示",
                        content: "预约成功等待审核",
                        showCancel: !1
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "reserveinfo?ydid=" + a.data
                        });
                    }, 1e3), "1" == o.data.ptxx.is_email && t.util.request({
                        url: "entry/wxapp/email",
                        cachetime: "0",
                        data: {
                            store_id: c,
                            type: "预约"
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    }), t.util.request({
                        url: "entry/wxapp/moban2",
                        cachetime: "0",
                        data: {
                            id: s
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    }), t.util.request({
                        url: "entry/wxapp/SmsSet",
                        cachetime: "0",
                        data: {
                            store_id: c
                        },
                        success: function(e) {
                            console.log(e), "1" == e.data.is_yysms && t.util.request({
                                url: "entry/wxapp/sms2",
                                cachetime: "0",
                                data: {
                                    store_id: c
                                },
                                success: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                    }), t.util.request({
                        url: "entry/wxapp/Message3",
                        cachetime: "0",
                        data: {
                            openid: i,
                            form_id: e,
                            xz_date: r,
                            store_name: n,
                            yjdd_date: d,
                            link_name: m,
                            link_tel: y,
                            jc_num: _,
                            remark: h
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    })) : wx.showToast({
                        title: "请重试",
                        icon: "loading",
                        duration: 1e3
                    });
                }
            })) : g = "手机号格式不正确", 1 == x && wx.showModal({
                title: "提示",
                content: g
            });
        } else wx.showModal({
            title: "提示",
            content: "商家暂未添加桌位类型，暂时不能预定"
        });
    },
    qdzf: function() {
        this.setData({
            zfz: !0
        });
        var a = this, o = this.data.forminfo, s = this.data.zffs, i = wx.getStorageSync("openid"), n = this.data.store.name, l = wx.getStorageSync("users").id, c = this.data.store.id, r = o.datepicker, d = o.timepicker, u = o.zwpicker.name, p = o.zwpicker.id, f = o.zwpicker.zd_cost, m = o.lxr, _ = o.jcrs, y = o.tel, w = parseFloat(o.zwpicker.yd_cost), h = o.beizhu;
        if (console.log(i, n, l, c, r, d, u, p, m, _, y, w, h), console.log(o, e, s), 2 == s) {
            var g = Number(this.data.wallet), x = Number(this.data.ydcost);
            if (console.log(g, x), g < x) return wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            }), void a.setData({
                zfz: !1
            });
            console.log("余额支付流程"), t.util.request({
                url: "entry/wxapp/Reservation",
                cachetime: "0",
                data: {
                    store_id: c,
                    user_id: l,
                    xz_date: r,
                    yjdd_date: d,
                    table_type_id: p,
                    table_type_name: u,
                    zd_cost: f,
                    link_name: m,
                    link_tel: y,
                    jc_num: _,
                    remark: h,
                    money: w,
                    is_yue: 1,
                    jf: 0
                },
                success: function(o) {
                    console.log(o);
                    var s = o.data;
                    "预定失败" != o.data ? (wx.showModal({
                        title: "提示",
                        content: "预约成功等待审核",
                        showCancel: !1
                    }), a.setData({
                        showModal: !1
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "reserveinfo?ydid=" + o.data
                        });
                    }, 1e3), "1" == a.data.ptxx.is_email && t.util.request({
                        url: "entry/wxapp/email",
                        cachetime: "0",
                        data: {
                            store_id: c,
                            type: "预约"
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    }), t.util.request({
                        url: "entry/wxapp/moban2",
                        cachetime: "0",
                        data: {
                            id: s
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    }), t.util.request({
                        url: "entry/wxapp/SmsSet",
                        cachetime: "0",
                        data: {
                            store_id: c
                        },
                        success: function(e) {
                            console.log(e), "1" == e.data.is_yysms && t.util.request({
                                url: "entry/wxapp/sms2",
                                cachetime: "0",
                                data: {
                                    store_id: c
                                },
                                success: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                    }), t.util.request({
                        url: "entry/wxapp/Message3",
                        cachetime: "0",
                        data: {
                            openid: i,
                            form_id: e,
                            xz_date: r,
                            store_name: n,
                            yjdd_date: d,
                            link_name: m,
                            link_tel: y,
                            jc_num: _,
                            remark: h
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    })) : wx.showToast({
                        title: "请重试",
                        icon: "loading",
                        duration: 1e3
                    });
                }
            });
        }
        if (3 == s) {
            var z = Number(this.data.total_score) / Number(this.data.jf_proportion), k = (x = Number(this.data.ydcost)) * Number(this.data.jf_proportion);
            if (console.log(z, x, k), z < x) return wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            }), void a.setData({
                zfz: !1
            });
            console.log("积分支付流程"), t.util.request({
                url: "entry/wxapp/Reservation",
                cachetime: "0",
                data: {
                    store_id: c,
                    user_id: l,
                    xz_date: r,
                    yjdd_date: d,
                    table_type_id: p,
                    table_type_name: u,
                    zd_cost: f,
                    link_name: m,
                    link_tel: y,
                    jc_num: _,
                    remark: h,
                    money: w,
                    is_yue: 3,
                    jf: k
                },
                success: function(o) {
                    console.log(o);
                    var s = o.data;
                    "预定失败" != o.data ? (wx.showModal({
                        title: "提示",
                        content: "预约成功等待审核",
                        showCancel: !1
                    }), a.setData({
                        showModal: !1
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "reserveinfo?ydid=" + o.data
                        });
                    }, 1e3), "1" == a.data.ptxx.is_email && t.util.request({
                        url: "entry/wxapp/email",
                        cachetime: "0",
                        data: {
                            store_id: c,
                            type: "预约"
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    }), t.util.request({
                        url: "entry/wxapp/moban2",
                        cachetime: "0",
                        data: {
                            id: s
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    }), t.util.request({
                        url: "entry/wxapp/SmsSet",
                        cachetime: "0",
                        data: {
                            store_id: c
                        },
                        success: function(e) {
                            console.log(e), "1" == e.data.is_yysms && t.util.request({
                                url: "entry/wxapp/sms2",
                                cachetime: "0",
                                data: {
                                    store_id: c
                                },
                                success: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                    }), t.util.request({
                        url: "entry/wxapp/Message3",
                        cachetime: "0",
                        data: {
                            openid: i,
                            form_id: e,
                            xz_date: r,
                            store_name: n,
                            yjdd_date: d,
                            link_name: m,
                            link_tel: y,
                            jc_num: _,
                            remark: h
                        },
                        success: function(e) {
                            console.log(e);
                        }
                    })) : wx.showToast({
                        title: "请重试",
                        icon: "loading",
                        duration: 1e3
                    });
                }
            });
        }
        1 == s && (console.log("微信支付流程"), t.util.request({
            url: "entry/wxapp/Reservation",
            cachetime: "0",
            data: {
                store_id: c,
                user_id: l,
                xz_date: r,
                yjdd_date: d,
                table_type_id: p,
                table_type_name: u,
                zd_cost: f,
                link_name: m,
                link_tel: y,
                jc_num: _,
                remark: h,
                money: w,
                is_yue: 2,
                form_id: e
            },
            success: function(e) {
                console.log(e);
                var o = e.data;
                "预定失败" != e.data ? (a.setData({
                    showModal: !1
                }), t.util.request({
                    url: "entry/wxapp/pay2",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: w,
                        order_id: o
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log(e), wx.showToast({
                                    title: "支付成功",
                                    duration: 1e3
                                }), console.log(a.data.store);
                            },
                            complete: function(e) {
                                console.log(e), "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                    title: "取消支付",
                                    icon: "loading"
                                }), a.setData({
                                    zfz: !1
                                })), "requestPayment:ok" == e.errMsg && (wx.showModal({
                                    title: "提示",
                                    content: "预约成功等待审核",
                                    showCancel: !1
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "reserveinfo?ydid=" + o
                                    });
                                }, 1e3));
                            }
                        });
                    }
                })) : wx.showToast({
                    title: "请重试",
                    icon: "loading",
                    duration: 1e3
                });
            }
        }));
    },
    onLoad: function(e) {
        var o = this, s = a.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(s.toString()), this.setData({
            date: s
        }), t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), o.setData({
                    ptxx: e.data,
                    jf_proportion: e.data.jf_proportion
                }), "1" == e.data.is_yue ? o.setData({
                    ptkqyue: !0
                }) : o.setData({
                    ptkqyue: !1
                }), "1" == e.data.is_jfpay ? o.setData({
                    ptkqjf: !0
                }) : o.setData({
                    ptkqjf: !1
                });
            }
        });
        var i = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: i
            },
            success: function(e) {
                console.log(e), o.setData({
                    wallet: e.data.wallet,
                    total_score: e.data.total_score
                });
            }
        }), t.util.request({
            url: "entry/wxapp/TableType",
            cachetime: "0",
            data: {
                store_id: getApp().sjid
            },
            success: function(e) {
                console.log(e), o.setData({
                    array: e.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(e) {
                console.log(e), "1" == e.data.is_yue ? o.setData({
                    sjkqyue: !0
                }) : o.setData({
                    sjkqyue: !1
                }), "1" == e.data.is_jfpay ? o.setData({
                    sjkqjf: !0
                }) : o.setData({
                    sjkqjf: !1
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color
                }), o.setData({
                    store: e.data,
                    color: e.data.color
                });
            }
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