var e, t, a = getApp(), o = require("../../utils/qqmap-wx-jssdk.js"), s = require("../../utils/util.js");

Page({
    data: {
        totalPrice: 0,
        distance: "0",
        form_id: "",
        beizhu: "",
        dnzt: !1,
        qlq: !0,
        sdindex: 0,
        qzf: !1,
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
    jsmj: function(e, t) {
        for (var a, o = 0; o < t.length; o++) if (Number(e) >= Number(t[o].full)) {
            a = o;
            break;
        }
        return a;
    },
    onLoad: function(s) {
        console.log(s);
        var n = this;
        if (null == s.preferential) var l = 0; else l = Number(s.preferential);
        var i = wx.getStorageSync("users"), c = wx.getStorageSync("new_user");
        n.setData({
            coupons_id: s.coupons_id,
            pre: l,
            new_user: c,
            users: i,
            vouchers_id: s.vouchers_id
        }), a.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), t = new o({
                    key: e.data.map_key
                }), n.setData({
                    ptxx: e.data,
                    jf_proportion: e.data.jf_proportion
                }), "1" == e.data.is_yue ? n.setData({
                    ptkqyue: !0
                }) : n.setData({
                    ptkqyue: !1
                }), "1" == e.data.is_jfpay ? n.setData({
                    ptkqjf: !0
                }) : n.setData({
                    ptkqjf: !1
                });
            }
        });
        var r = wx.getStorageSync("users").id;
        a.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: r
            },
            success: function(e) {
                console.log(e), n.setData({
                    wallet: e.data.wallet,
                    total_score: e.data.total_score
                });
            }
        }), a.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(t) {
                console.log(t), "1" == t.data.is_yue ? n.setData({
                    sjkqyue: !0
                }) : n.setData({
                    sjkqyue: !1
                }), "1" == t.data.is_jfpay ? n.setData({
                    sjkqjf: !0
                }) : n.setData({
                    sjkqjf: !1
                }), console.log(t.data.coordinates.split(","));
                var o = t.data.coordinates.split(","), s = {
                    lng: Number(o[1]),
                    lat: Number(o[0])
                };
                console.log(s), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.color
                }), n.setData({
                    color: t.data.color,
                    sd_time: t.data.sd_time,
                    start: s
                }), a.util.request({
                    url: "entry/wxapp/Reduction",
                    cachetime: "0",
                    data: {
                        id: getApp().sjid
                    },
                    success: function(e) {
                        console.log(e);
                        for (var a = [], o = 0; o < e.data.length; o++) "1" != e.data[o].type && "3" != e.data[o].type || a.push(e.data[o]);
                        console.log(a);
                        var s = Number(t.data.freight);
                        if (0 == a.length) var i = [ {
                            full: "1000000"
                        } ]; else i = a;
                        var r, u = i.length - 1, d = wx.getStorageSync("order");
                        console.log(d);
                        for (var f = 0, g = 0, m = 0; m < d.length; m++) f += Number(d[m].money) * d[m].num + Number(d[m].box_fee) * d[m].num, 
                        g += Number(d[m].box_fee) * d[m].num;
                        console.log(f, i);
                        var p = Number(t.data.freight);
                        console.log("配送费为" + p), p = 0 < p ? Number(t.data.freight) : 0;
                        var h = Number(t.data.xyh_open), w = Number(t.data.xyh_money);
                        if (1 == h) if (1 == c) console.log("这是一个新用户"), (y = f - w + p) <= 0 && (y = .01), 
                        console.log("商家开启了下单立减优惠，而且用户是一个新用户，不享受满减活动以及优惠券，支付的金额为" + y); else if (Number(f) >= Number(i[i.length - 1].full)) if (console.log(n.jsmj(f, i)), 
                        u = n.jsmj(f, i), r = Number(i[u].reduction), console.log(r), 0 == l) {
                            var y = f + p - r;
                            console.log("商家开启了下单立减优惠，而且用户是一老用户，没有使用优惠券，支付的金额为" + y);
                        } else f + p - r - l <= 0 ? (y = .01, console.log("商家开启了下单立减优惠，而且用户是一老用户，使用了优惠券并且优惠超出总价，支付的金额为" + y)) : (y = f + p - r - l, 
                        console.log("商家开启了下单立减优惠，而且用户是一老用户，使用了优惠券并且总价大于优惠，支付的金额为" + y)); else y = 0 == l ? f + p : f + p - l <= 0 ? .01 : f + p - l, 
                        console.log("用户是一个老用户，不享受新用户下单立减活动，订单的金额小于满减的金额" + y, i); else Number(f) >= Number(i[i.length - 1].full) ? (console.log(n.jsmj(f, i)), 
                        u = n.jsmj(f, i), r = Number(i[u].reduction), console.log(r), y = 0 == l ? f + p - r : f + p - r - l <= 0 ? .01 : f + p - r - l, 
                        console.log("商家没有开启新用户立减，而且用户是一个老用户，订单的金额大于满减的金额，用户支付的金额为" + y)) : (y = 0 == l ? f + p : f + p - l <= 0 ? .01 : f + p - l, 
                        console.log("商家没有开启开启新用户立减，而且用户是一个老用户，订单的金额小于满减的金额，用户支付的金额为" + y, i));
                        n.setData({
                            xyh_open: h,
                            xyh_money: w,
                            store: t.data,
                            money: y.toFixed(2),
                            money1: y.toFixed(2),
                            totalPrice: f,
                            totalbox: g,
                            freight: p,
                            fre: s,
                            order: d,
                            con: i,
                            yh: Number(i[u].full),
                            cut: r,
                            seller_id: t.data.id
                        }), console.log(n.data);
                    }
                }), e = 1e3 * Number(t.data.distance);
            }
        });
        var u = wx.getStorageSync("openid");
        console.log(u), r = wx.getStorageSync("users").id, n.setData({
            openid: u,
            user_id: r
        });
    },
    reload: function(e) {},
    distance: function(e, a, o) {
        var s;
        t.calculateDistance({
            mode: "driving",
            from: {
                latitude: e.lat,
                longitude: e.lng
            },
            to: [ {
                latitude: a.lat,
                longitude: a.lng
            } ],
            success: function(e) {
                console.log(e), 0 == e.status && (s = Math.round(e.result.elements[0].distance), 
                o(s));
            },
            fail: function(e) {
                console.log(e), 373 == e.status && (s = 15e3, o(s));
            },
            complete: function(e) {
                console.log(e);
            }
        });
    },
    ddbz: function(e) {
        console.log(e.detail.value), this.setData({
            beizhu: e.detail.value
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
    onReady: function() {},
    onShow: function() {
        var e = s.formatTime(new Date()), t = s.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"), a = s.formatTime(new Date()).substring(11, 16);
        console.log(e, t.toString(), a.toString()), this.setData({
            datestart: t,
            timestart: a,
            date: t,
            time: a
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    map: function(e) {
        var t = this, o = wx.getStorageSync("users").id;
        wx.chooseAddress({
            success: function(e) {
                console.log(e.userName), console.log(e.postalCode), console.log(e.provinceName), 
                console.log(e.cityName), console.log(e.countyName), console.log(e.detailInfo), console.log(e.nationalCode), 
                console.log(e.telNumber);
                var s = e.telNumber, n = e.provinceName + e.cityName + e.countyName + e.detailInfo, l = e.userName;
                console.log(n), t.setData({
                    user_tel: s,
                    user_address: n,
                    user_name: l
                }), a.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: o,
                        user_tel: s,
                        user_address: n,
                        user_name: l
                    },
                    success: function(e) {
                        console.log(e);
                    }
                });
            },
            fail: function(e) {
                console.log(e), wx.showModal({
                    title: "警告",
                    content: "您点击了拒绝授权,无法获取您的地址信息,点击确定重新获取授权。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.address"] && t.map();
                            },
                            fail: function(e) {}
                        });
                    }
                });
            }
        });
    },
    jksd: function() {
        this.setData({
            sdindex: 0,
            qlq: !0
        });
    },
    xzsj: function() {
        this.setData({
            sdindex: 1,
            qlq: !0
        });
    },
    qlq: function() {
        this.setData({
            qlq: !1
        });
    },
    qdzz: function() {
        this.setData({
            qlq: !0
        });
    },
    bindDateChange: function(e) {
        console.log("date 发生 change 事件，携带值为", e.detail.value, this.data.datestart), this.setData({
            date: e.detail.value
        }), e.detail.value == this.data.datestart ? console.log("日期没有修改") : (console.log("修改了日期"), 
        this.setData({
            timestart: "00:01"
        }));
    },
    bindTimeChange: function(e) {
        console.log("time 发生 change 事件，携带值为", e.detail.value), this.setData({
            time: e.detail.value
        });
    },
    switch1Change: function(e) {
        var t = this;
        console.log("switch1 发生 change 事件，携带值为", e.detail.value), t.setData({
            dnzt: e.detail.value
        }), e.detail.value ? t.setData({
            money: (t.data.money1 - t.data.freight).toFixed(2)
        }) : t.setData({
            money: t.data.money1
        });
    },
    formSubmit: function(o) {
        if (console.log("form发生了submit事件，携带数据为：", o.detail.value.radiogroup), "yezf" == o.detail.value.radiogroup) {
            var s = Number(this.data.wallet), n = Number(this.data.money);
            if (console.log(s, n), s < n) return void wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            });
        }
        var l = 0;
        if ("jfzf" == o.detail.value.radiogroup) {
            var i = Number(this.data.total_score) / Number(this.data.jf_proportion);
            if (n = Number(this.data.money), l = n * Number(this.data.jf_proportion), console.log(i, n, l), 
            i < n) return void wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            });
        }
        if ("yezf" == o.detail.value.radiogroup) var c = 1;
        "wxzf" == o.detail.value.radiogroup && (c = 2), "jfzf" == o.detail.value.radiogroup && (c = 3), 
        console.log("是否余额", c);
        var r = this, u = r.data.freight;
        if (r.data.dnzt) {
            var d = 1, f = r.data.date + "日" + r.data.time + "分";
            u = 0;
        } else d = 2, f = 0 == r.data.sdindex ? "尽快送达,预计" + r.data.sd_time + "内送达" : r.data.date + "日" + r.data.time + "分";
        if (console.log(r.data, "自提", d, "送达时间", f, "配送费", u, "总计费用", r.data.money, "pre", r.data.pre, "cut", r.data.cut), 
        r.data.totalPrice, n = r.data.money, 1 == r.data.xyh_open) {
            if (1 == r.data.new_user) var g = r.data.xyh_money;
            2 == r.data.new_user && r.data.totalPrice >= r.data.yh && (g = r.data.cut + r.data.pre), 
            2 == r.data.new_user && r.data.totalPrice < r.data.yh && (g = r.data.pre);
        }
        2 == r.data.xyh_open && (r.data.totalPrice >= r.data.yh && (g = r.data.cut + r.data.pre), 
        r.data.totalPrice < r.data.yh && (g = r.data.pre)), console.log(g);
        var m = r.data.beizhu, p = r.data.order;
        console.log(p);
        var h = [];
        if (p.map(function(e) {
            if (0 < e.num) {
                var t = {};
                t.name = e.name, t.img = e.icon, t.num = e.num, t.money = e.money, t.dishes_id = e.id, 
                h.push(t);
            }
        }), console.log(h), r.data.con, r.data.cut, null == r.data.coupons_id) {
            console.log("用户没有选择优惠券");
            var w = "";
        } else console.log("用户选择了优惠券"), w = r.data.coupons_id;
        if (null == r.data.vouchers_id) {
            console.log("用户没有选择代金券");
            var y = "";
        } else console.log("用户选择了代金券"), y = r.data.vouchers_id;
        console.log("代金券id" + y), console.log("优惠券id" + w), r.data.xyh_open, r.data.xyh_money, 
        r.data.new_user;
        var _ = o.detail.formId, x = r.data.user_id, v = r.data.openid;
        if (null != r.data.user_name) var b = r.data.user_name; else b = r.data.users.user_name;
        if (null != r.data.user_address) var q = r.data.user_address; else q = r.data.users.user_address;
        if (null != r.data.user_tel) var z = r.data.user_tel; else z = r.data.users.user_tel;
        console.log("用户的名字为" + b), console.log("用户的地址为" + q), console.log("用户的电话号码为" + z);
        var D = r.data.totalbox, N = r.data.seller_id;
        if (console.log(N), "" == v) wx.showToast({
            title: "id为空",
            icon: "",
            image: "",
            duration: 500,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else if ("" != q || this.data.dnzt) {
            "" == q && this.data.dnzt && (q = this.data.store.address), this.setData({
                zfz: !0
            });
            var j = q.replace(" ", "");
            console.log(j);
            var S = j.indexOf("市");
            console.log(j.substring(0, S));
            var k = j.substring(0, S);
            t.geocoder({
                address: j,
                success: function(t) {
                    console.log(t), console.log("终点:", t.result.location), console.log(t.result.location.lat + "," + t.result.location.lng);
                    var s = t.result.location.lat, i = t.result.location.lng, p = t.result.location;
                    console.log(s, i), r.distance(r.data.start, p, function(t) {
                        console.log(t, e), e < t && 2 == d ? (wx.showModal({
                            title: "提示",
                            content: "超出商家配送距离",
                            showCancel: !1
                        }), r.setData({
                            zfz: !1,
                            showModal: !1
                        })) : "" == _ ? (wx.showToast({
                            title: "网络不好",
                            icon: "",
                            image: "",
                            duration: 500,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), r.setData({
                            zfz: !1
                        })) : a.util.request({
                            url: "entry/wxapp/AddOrder",
                            cachetime: "0",
                            data: {
                                type: 1,
                                seller_id: N,
                                money: n,
                                user_id: x,
                                preferential: g,
                                freight: u,
                                name: b,
                                address: q,
                                tel: z,
                                box_fee: D,
                                sz: h,
                                coupons_id: w,
                                voucher_id: y,
                                note: m,
                                area: k,
                                lat: s,
                                lng: i,
                                is_take: d,
                                delivery_time: f,
                                is_yue: c,
                                form_id: _,
                                jf: l
                            },
                            success: function(e) {
                                console.log(e);
                                var t = e.data;
                                console.log("本次的订单id为" + t), "下单失败" != t ? (r.setData({
                                    zfz: !1,
                                    showModal: !1
                                }), "yezf" == o.detail.value.radiogroup ? (console.log("余额支付流程"), console.log(r.data.store), 
                                a.util.request({
                                    url: "entry/wxapp/PayOrder",
                                    cachetime: "0",
                                    data: {
                                        user_id: x,
                                        order_id: t,
                                        coupons_id: w,
                                        voucher_id: y
                                    },
                                    success: function(e) {
                                        console.log(e), wx.showModal({
                                            title: "提示",
                                            content: "支付成功",
                                            showCancel: !1
                                        }), setTimeout(function() {
                                            wx.switchTab({
                                                url: "../list/list"
                                            });
                                        }, 1e3), console.log(_), "1" != r.data.store.ps_mode || r.data.dnzt || a.util.request({
                                            url: "entry/wxapp/dada",
                                            cachetime: "0",
                                            data: {
                                                area: k,
                                                order_id: t,
                                                lat: s,
                                                lng: i
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), "1" == r.data.ptxx.is_email && a.util.request({
                                            url: "entry/wxapp/email",
                                            cachetime: "0",
                                            data: {
                                                store_id: N,
                                                type: "外卖"
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/Print",
                                            cachetime: "0",
                                            data: {
                                                order_id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/Print2",
                                            cachetime: "0",
                                            data: {
                                                order_id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/message",
                                            cachetime: "0",
                                            data: {
                                                openid: v,
                                                form_id: _,
                                                id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/moban",
                                            cachetime: "0",
                                            data: {
                                                id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/SmsSet",
                                            cachetime: "0",
                                            data: {
                                                store_id: N
                                            },
                                            success: function(e) {
                                                console.log(e), "1" == e.data.is_wmsms && a.util.request({
                                                    url: "entry/wxapp/sms",
                                                    cachetime: "0",
                                                    data: {
                                                        store_id: N
                                                    },
                                                    success: function(e) {
                                                        console.log(e);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })) : "jfzf" == o.detail.value.radiogroup ? (console.log("积分支付流程"), console.log(r.data.store), 
                                a.util.request({
                                    url: "entry/wxapp/PayOrder",
                                    cachetime: "0",
                                    data: {
                                        user_id: x,
                                        order_id: t,
                                        coupons_id: w,
                                        voucher_id: y
                                    },
                                    success: function(e) {
                                        console.log(e), wx.showModal({
                                            title: "提示",
                                            content: "支付成功",
                                            showCancel: !1
                                        }), setTimeout(function() {
                                            wx.switchTab({
                                                url: "../list/list"
                                            });
                                        }, 1e3), console.log(_), "1" != r.data.store.ps_mode || r.data.dnzt || a.util.request({
                                            url: "entry/wxapp/dada",
                                            cachetime: "0",
                                            data: {
                                                area: k,
                                                order_id: t,
                                                lat: s,
                                                lng: i
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), "1" == r.data.ptxx.is_email && a.util.request({
                                            url: "entry/wxapp/email",
                                            cachetime: "0",
                                            data: {
                                                store_id: N,
                                                type: "外卖"
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/Print",
                                            cachetime: "0",
                                            data: {
                                                order_id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/Print2",
                                            cachetime: "0",
                                            data: {
                                                order_id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/message",
                                            cachetime: "0",
                                            data: {
                                                openid: v,
                                                form_id: _,
                                                id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/moban",
                                            cachetime: "0",
                                            data: {
                                                id: t
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), a.util.request({
                                            url: "entry/wxapp/SmsSet",
                                            cachetime: "0",
                                            data: {
                                                store_id: N
                                            },
                                            success: function(e) {
                                                console.log(e), "1" == e.data.is_wmsms && a.util.request({
                                                    url: "entry/wxapp/sms",
                                                    cachetime: "0",
                                                    data: {
                                                        store_id: N
                                                    },
                                                    success: function(e) {
                                                        console.log(e);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })) : (console.log("微信支付流程"), a.util.request({
                                    url: "entry/wxapp/pay",
                                    cachetime: "0",
                                    data: {
                                        openid: v,
                                        order_id: t,
                                        money: n
                                    },
                                    success: function(e) {
                                        console.log(e), wx.hideLoading(), wx.requestPayment({
                                            timeStamp: e.data.timeStamp,
                                            nonceStr: e.data.nonceStr,
                                            package: e.data.package,
                                            signType: e.data.signType,
                                            paySign: e.data.paySign,
                                            success: function(e) {
                                                console.log("支付成功", e), wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1
                                                });
                                            },
                                            complete: function(e) {
                                                console.log("支付完成", e), "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                                    title: "取消支付",
                                                    icon: "loading",
                                                    duration: 1e3
                                                }), setTimeout(function() {
                                                    wx.switchTab({
                                                        url: "../list/list"
                                                    });
                                                }, 1e3)), "requestPayment:ok" == e.errMsg && setTimeout(function() {
                                                    wx.switchTab({
                                                        url: "../list/list"
                                                    });
                                                }, 1e3);
                                            }
                                        });
                                    }
                                }))) : wx.showToast({
                                    title: "下单失败"
                                });
                            }
                        });
                    });
                },
                fail: function(e) {
                    console.log(e);
                },
                complete: function(e) {
                    console.log(e);
                }
            });
        } else wx.showToast({
            title: "请先选择地址",
            icon: "",
            image: "",
            duration: 1e3,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    coupon: function(e) {
        console.log(this.data), wx.navigateTo({
            url: "../coupons/mine_coupons?totalPrice=" + this.data.totalPrice + "&state=1",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    }
});