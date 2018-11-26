var a = getApp(), t = require("../../utils/util.js");

Page({
    data: {
        xzggindex: "0",
        showModal: !1,
        boxfre: !0,
        changeHidden1: !0,
        changeHidden: !0,
        toastHidden: !0,
        selected1: !0,
        selected2: !1,
        selected3: !1,
        showview: !0,
        hidden1: !1,
        hidden2: !0,
        hidden3: !0,
        catalogSelect: 0,
        store: [],
        http: [],
        showView: !1,
        close: !1,
        login: [],
        rest: "",
        start_at: "",
        conditions: "",
        preferential: "",
        dishes: [],
        link: "",
        toView: "0",
        store_name: "",
        scrollTop: 100,
        totalPrice: 0,
        totalCount: 0,
        carArray: [],
        freight: 0,
        payDesc: 0,
        userInfo: {},
        parentIndex: 0,
        url: "",
        hidden: !1,
        curNav: 1,
        curIndex: 0,
        cart: [],
        cartTotal: 0,
        one: 1,
        ping: "",
        hdnum: 0,
        star1: [ {
            url: "../images/full-star.png"
        }, {
            url: "../images/no-star.png"
        }, {
            url: "../images/no-star.png"
        }, {
            url: "../images/no-star.png"
        }, {
            url: "../images/no-star.png"
        } ],
        star2: [ {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/no-star.png"
        }, {
            url: "../images/no-star.png"
        }, {
            url: "../images/no-star.png"
        } ],
        star3: [ {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/no-star.png"
        }, {
            url: "../images/no-star.png"
        } ],
        star4: [ {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/no-star.png"
        } ],
        star5: [ {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        }, {
            url: "../images/full-star.png"
        } ]
    },
    ycgg: function() {
        this.setData({
            showModal: !1
        });
    },
    onLoad: function(t) {
        var e = this, s = wx.getStorageSync("bqxx");
        console.log(s), this.setData({
            bqxx: s
        }), wx.getSystemInfo({
            success: function(a) {
                console.log(a.windowWidth), console.log(a.windowHeight), e.setData({
                    height: a.windowHeight / a.windowWidth * 750 - 500
                });
            }
        }), wx.login({
            success: function(t) {
                var s = t.code;
                wx.setStorageSync("code", t.code), a.util.request({
                    url: "entry/wxapp/openid",
                    cachetime: "0",
                    data: {
                        code: s
                    },
                    success: function(t) {
                        console.log(t), wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                        var s = t.data.openid;
                        console.log(s), "" == s ? wx.showToast({
                            title: "没有获取到openid",
                            icon: "",
                            image: "",
                            duration: 1e3,
                            mask: !0,
                            success: function(a) {},
                            fail: function(a) {},
                            complete: function(a) {}
                        }) : a.util.request({
                            url: "entry/wxapp/Login",
                            cachetime: "0",
                            data: {
                                openid: s
                            },
                            success: function(t) {
                                console.log(t), e.setData({
                                    userinfo: t.data
                                }), wx.setStorageSync("users", t.data), a.util.request({
                                    url: "entry/wxapp/New",
                                    cachetime: "0",
                                    data: {
                                        user_id: t.data.id,
                                        store_id: getApp().sjid
                                    },
                                    success: function(a) {
                                        console.log(a), wx.setStorageSync("new_user", a.data);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }), console.log(t);
        var o = Number(t.type);
        1 == o ? console.log("用户选择的是店内点餐") : console.log("用户选择的是外卖点餐"), e.setData({
            types: o
        });
        var d = decodeURIComponent(t.scene).split(",");
        console.log(d), "undefined" != d && (getApp().sjid = d[1], this.setData({
            types: 1,
            tableid: d[0]
        }), a.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(t) {
                console.log(t), "1" == t.data.is_czztpd ? a.util.request({
                    url: "entry/wxapp/Zhuohao",
                    cachetime: "0",
                    data: {
                        id: d[0]
                    },
                    success: function(a) {
                        console.log(a), "0" == a.data.status ? (wx.showModal({
                            title: "提示",
                            content: "桌位信息：" + a.data.type_name + "--" + a.data.table_name,
                            showCancel: !1,
                            success: function(a) {},
                            fail: function(a) {},
                            complete: function(a) {}
                        }), e.setData({
                            kt: !1
                        })) : (wx.showModal({
                            title: "提示",
                            content: "此桌已开台暂不能点餐,请选择其他座位",
                            showCancel: !1,
                            success: function(a) {},
                            fail: function(a) {},
                            complete: function(a) {}
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3), e.setData({
                            kt: !0
                        }));
                    }
                }) : a.util.request({
                    url: "entry/wxapp/Zhuohao",
                    cachetime: "0",
                    data: {
                        id: d[0]
                    },
                    success: function(a) {
                        console.log(a), wx.showModal({
                            title: "提示",
                            content: "桌位信息：" + a.data.type_name + "--" + a.data.table_name,
                            showCancel: !1,
                            success: function(a) {},
                            fail: function(a) {},
                            complete: function(a) {}
                        }), e.setData({
                            kt: !1
                        });
                    }
                });
            }
        })), t.showview, t.showView, e.reload();
    },
    reload: function(e) {
        var s = this, o = t.formatTime(new Date()).slice(11, 16);
        this.data.store_name, wx.showShareMenu({
            withShareTicket: !0
        }), a.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid
            },
            success: function(t) {
                "" != t.data.wm_name && 2 == s.data.types && wx.setNavigationBarTitle({
                    title: t.data.wm_name
                }), "" != t.data.dn_name && 1 == s.data.types && wx.setNavigationBarTitle({
                    title: t.data.dn_name
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.color
                }), a.util.request({
                    url: "entry/wxapp/zhuanh",
                    cachetime: "0",
                    data: {
                        op: t.data.coordinates
                    },
                    success: function(a) {
                        console.log(a), console.log(a.data.locations[0].lat + "," + a.data.locations[0].lng), 
                        s.setData({
                            sjdzlat: a.data.locations[0].lat,
                            sjdzlng: a.data.locations[0].lng
                        });
                    }
                }), console.log(t), a.util.request({
                    url: "entry/wxapp/Reduction",
                    cachetime: "0",
                    data: {
                        id: getApp().sjid
                    },
                    success: function(a) {
                        console.log(a);
                        for (var e = [], o = [], d = 0; d < a.data.length; d++) "2" != a.data[d].type && "3" != a.data[d].type || e.push(a.data[d]), 
                        "1" != a.data[d].type && "3" != a.data[d].type || o.push(a.data[d]);
                        if (1 == s.data.types) {
                            var i = e;
                            s.setData({
                                mj: e
                            });
                        }
                        2 == s.data.types && (i = o, s.setData({
                            mj: o
                        })), 0 != i.length && "1" == t.data.xyh_open ? s.setData({
                            hdnum: 2
                        }) : 0 != i.length && "1" != t.data.xyh_open || 0 == i.length && "1" == t.data.xyh_open ? s.setData({
                            hdnum: 1
                        }) : s.setData({
                            hdnum: 0
                        });
                    }
                });
                var e = t.data.id, d = t.data.time, i = t.data.time2, n = t.data.time3, r = t.data.time4, l = t.data.is_rest;
                console.log("当前的系统时间为" + o), console.log("商家的营业时间从" + d + "至" + i, n + "至" + r), 
                1 == l ? console.log("商家正在休息" + l) : console.log("商家正在营业" + l), d < r ? d < o && o < i || n < o && o < r ? (console.log("商家正常营业"), 
                s.setData({
                    time: 1
                })) : o < d || i < o && o < n ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), s.setData({
                    time: 2
                })) : r < o && (console.log("商家以及关店啦，明天再来吧"), s.setData({
                    time: 3
                })) : r < d && (d < o && o < i || n < o && r < o || o < n && o < r ? (console.log("商家正常营业"), 
                s.setData({
                    time: 1
                })) : o < d || i < o && o < n ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), s.setData({
                    time: 2
                })) : r < o && (console.log("商家以及关店啦，明天再来吧"), s.setData({
                    time: 3
                }))), console.log("商家的id为" + e), a.util.request({
                    url: "entry/wxapp/Score",
                    cachetime: "0",
                    data: {
                        seller_id: e
                    },
                    success: function(a) {
                        console.log(a);
                        var t = a.data;
                        t = t.toFixed(1), console.log(t), s.setData({
                            score: t
                        });
                    }
                }), a.util.request({
                    url: "entry/wxapp/StorePl",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    cachetime: "0",
                    data: {
                        id: e
                    },
                    success: function(a) {
                        console.log(a.data);
                        var t = a.data.length;
                        console.log(t);
                        for (var e = 0; e < a.data.length; e++) a.data[e].score = a.data[e].score.slice(0, 2);
                        console.log(a.data), s.setData({
                            ping: a.data
                        });
                    }
                }), s.setData({
                    store: t.data,
                    rest: l,
                    color: t.data.color,
                    seller_id: e,
                    start_at: t.data.start_at
                });
            }
        }), a.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(a) {
                s.setData({
                    url: a.data
                });
            }
        });
        var d = (s = this).data.types;
        console.log(d), a.util.request({
            url: "entry/wxapp/Dishes",
            cachetime: "0",
            data: {
                id: getApp().sjid,
                dishes_type: d
            },
            success: function(a) {
                for (var t = 0; t < a.data.length; t++) for (var e = 0; e < a.data[t].goods.length; e++) a.data[t].goods[e].xs_num = Number(a.data[t].goods[e].xs_num), 
                a.data[t].goods[e].sit_ys_num = Number(a.data[t].goods[e].sit_ys_num);
                console.log(a.data), s.setData({
                    dishes: a.data
                });
            }
        });
    },
    selected1: function(a) {
        this.setData({
            selected2: !1,
            selected3: !1,
            selected1: !0,
            hidden1: !1,
            hidden2: !0,
            hidden3: !0
        });
    },
    selected2: function(a) {
        this.setData({
            selected1: !1,
            selected2: !0,
            selected3: !1,
            hidden1: !0,
            hidden2: !1,
            hidden3: !0
        });
    },
    selected3: function(a) {
        this.setData({
            selected1: !1,
            selected2: !1,
            selected3: !0,
            hidden1: !0,
            hidden2: !0,
            hidden3: !1
        });
    },
    onReady: function() {
        console.log(this.data.types);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    call_phone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.store.tel
        });
    },
    tomap: function(a) {
        wx.openLocation({
            latitude: this.data.sjdzlat,
            longitude: this.data.sjdzlng,
            name: this.data.store.name,
            address: this.data.store.address
        });
    },
    tzsjhj: function(a) {
        console.log(a.currentTarget.dataset.sjid), wx.navigateTo({
            url: "../info/sjhj"
        });
    },
    selectMenu: function(a) {
        var t = a.currentTarget.dataset.itemIndex;
        this.setData({
            toView: "order" + t.toString(),
            catalogSelect: a.currentTarget.dataset.itemIndex
        }), console.log("order" + t.toString());
    },
    close: function() {
        this.setData({
            showView: !this.data.showView
        });
    },
    zwkc: function() {
        wx.showToast({
            title: "没有库存了"
        });
    },
    addShopCart: function(a) {
        var t = this;
        console.log(this.data.dishes), console.log(this.data.carArray), console.log(a.currentTarget.dataset);
        var e = a.currentTarget.dataset.itemIndex, s = a.currentTarget.dataset.parentindex, o = a.currentTarget.dataset.gwcindex, d = a.currentTarget.dataset.ggindex;
        if (null != d) {
            this.data.dishes[s].goods[e].one++, this.data.dishes[s].goods[e].gg[d].num++;
            var i = "a" + e + "b" + s + "c" + this.data.dishes[s].goods[e].gg[d].id;
            if (2 == this.data.types) var n = this.data.dishes[s].goods[e].gg[d].cost; else n = this.data.dishes[s].goods[e].gg[d].cost;
            var r = this.data.dishes[s].goods[e].box_fee;
            console.log("餐盒费是：" + r);
            var l = Number(t.data.dishes[s].goods[e].num), c = this.data.dishes[s].goods[e].gg[d].num, g = this.data.dishes[s].goods[e].name + this.data.dishes[s].goods[e].gg[d].name, h = this.data.dishes[s].goods[e].id, u = this.data.dishes[s].goods[e].img, m = this.data.store, p = {
                ggindex: d,
                money: n,
                num: c,
                kc: l,
                id: h,
                mark: i,
                name: g,
                index: e,
                parentIndex: s,
                icon: u,
                store: m,
                box_fee: r,
                allmoney: (n * c).toFixed(2)
            };
            (f = this.data.carArray.filter(function(a) {
                return a.mark != i;
            })).splice(o, 0, p), console.log(f), this.setData({
                shop_cart: f,
                carArray: f,
                dishes: this.data.dishes
            }), console.log(this.data.carArray), this.calTotalPrice(), this.setData({
                payDesc: this.payDesc()
            });
        } else {
            console.log(d), t.data.dishes[s].goods[e].one++, i = "a" + e + "b" + s, n = 2 == t.data.types ? t.data.dishes[s].goods[e].wm_money : t.data.dishes[s].goods[e].money, 
            r = t.data.dishes[s].goods[e].box_fee, console.log("餐盒费是：" + r);
            var f;
            l = Number(t.data.dishes[s].goods[e].num), c = t.data.dishes[s].goods[e].one, g = t.data.dishes[s].goods[e].name, 
            h = t.data.dishes[s].goods[e].id, u = t.data.dishes[s].goods[e].img, m = t.data.store, 
            p = {
                money: n,
                num: c,
                kc: l,
                id: h,
                mark: i,
                name: g,
                index: e,
                parentIndex: s,
                icon: u,
                store: m,
                box_fee: r,
                allmoney: (n * c).toFixed(2)
            }, (f = t.data.carArray.filter(function(a) {
                return a.mark != i;
            })).splice(o, 0, p), console.log(f), t.setData({
                shop_cart: f,
                carArray: f,
                dishes: t.data.dishes
            }), console.log(t.data.dishes), t.calTotalPrice(), t.setData({
                payDesc: t.payDesc()
            });
        }
    },
    decreaseShopCart: function(a) {
        var t = this;
        console.log(this.data.dishes), console.log(this.data.carArray), console.log(a.currentTarget.dataset);
        var e = a.currentTarget.dataset.itemIndex, s = a.currentTarget.dataset.parentindex, o = a.currentTarget.dataset.gwcindex, d = a.currentTarget.dataset.ggindex;
        if (null != d) {
            this.data.dishes[s].goods[e].one--, this.data.dishes[s].goods[e].gg[d].num--;
            var i = "a" + e + "b" + s + "c" + this.data.dishes[s].goods[e].gg[d].id;
            if (2 == this.data.types) var n = this.data.dishes[s].goods[e].gg[d].cost; else n = this.data.dishes[s].goods[e].gg[d].cost;
            var r = this.data.dishes[s].goods[e].box_fee;
            console.log("餐盒费是：" + r);
            var l = Number(t.data.dishes[s].goods[e].num), c = this.data.dishes[s].goods[e].gg[d].num, g = this.data.dishes[s].goods[e].name + this.data.dishes[s].goods[e].gg[d].name, h = this.data.dishes[s].goods[e].id, u = this.data.dishes[s].goods[e].img, m = this.data.store, p = {
                ggindex: d,
                money: n,
                num: c,
                kc: l,
                id: h,
                mark: i,
                name: g,
                index: e,
                parentIndex: s,
                icon: u,
                store: m,
                box_fee: r,
                allmoney: (n * c).toFixed(2)
            };
            (f = this.data.carArray.filter(function(a) {
                return a.mark != i;
            })).splice(o, 0, p), console.log(f), this.setData({
                shop_cart: f,
                carArray: f,
                dishes: this.data.dishes
            }), console.log(this.data.carArray), this.calTotalPrice(), this.setData({
                payDesc: this.payDesc()
            });
        } else {
            console.log(d), t.data.dishes[s].goods[e].one--, i = "a" + e + "b" + s, n = 2 == t.data.types ? t.data.dishes[s].goods[e].wm_money : t.data.dishes[s].goods[e].money, 
            r = t.data.dishes[s].goods[e].box_fee, console.log("餐盒费是：" + r);
            var f;
            l = Number(t.data.dishes[s].goods[e].num), c = t.data.dishes[s].goods[e].one, g = t.data.dishes[s].goods[e].name, 
            h = t.data.dishes[s].goods[e].id, u = t.data.dishes[s].goods[e].img, m = t.data.store, 
            p = {
                money: n,
                num: c,
                kc: l,
                id: h,
                mark: i,
                name: g,
                index: e,
                parentIndex: s,
                icon: u,
                store: m,
                box_fee: r,
                allmoney: (n * c).toFixed(2)
            }, (f = t.data.carArray.filter(function(a) {
                return a.mark != i;
            })).splice(o, 0, p), t.setData({
                shop_cart: f,
                carArray: f,
                dishes: t.data.dishes
            }), t.calTotalPrice(), t.setData({
                payDesc: t.payDesc()
            }), console.log(t.data.dishes);
        }
    },
    decreaseCart: function(t) {
        console.log("你点击了减号");
        var e = this;
        console.log(this.data);
        var s = t.currentTarget.dataset.itemIndex, o = t.currentTarget.dataset.parentindex;
        console.log(s, o), console.log(o, e.data.dishes[o].goods[s].id), a.util.request({
            url: "entry/wxapp/DishesGg",
            cachetime: "0",
            data: {
                dishes_id: e.data.dishes[o].goods[s].id
            },
            success: function(a) {
                if (console.log(a), 0 != a.data.length) wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: "多规格商品只能在购物车删除哦"
                }); else {
                    e.data.dishes[o].goods[s].one--;
                    var t = "a" + s + "b" + o;
                    if (2 == e.data.types) var d = e.data.dishes[o].goods[s].wm_money; else d = e.data.dishes[o].goods[s].money;
                    var i = e.data.dishes[o].goods[s].box_fee;
                    console.log("餐盒费是：" + i);
                    var n = Number(e.data.dishes[o].goods[s].num), r = e.data.dishes[o].goods[s].one, l = e.data.dishes[o].goods[s].name, c = e.data.dishes[o].goods[s].id, g = e.data.dishes[o].goods[s].img, h = e.data.store, u = {
                        money: d,
                        num: r,
                        kc: n,
                        id: c,
                        mark: t,
                        name: l,
                        index: s,
                        parentIndex: o,
                        icon: g,
                        store: h,
                        box_fee: i,
                        allmoney: (d * r).toFixed(2)
                    }, m = e.data.carArray.filter(function(a) {
                        return a.mark != t;
                    });
                    m.splice(s, 0, u), e.setData({
                        shop_cart: m,
                        carArray: m,
                        dishes: e.data.dishes
                    }), e.calTotalPrice(), e.setData({
                        payDesc: e.payDesc()
                    }), console.log(e.data.dishes);
                }
            }
        });
    },
    xzggClick: function(a) {
        this.setData({
            xzggindex: a.currentTarget.id
        });
    },
    xhl: function() {
        var a = this.data.zindex, t = this.data.findex;
        console.log(this.data.zindex, this.data.findex), console.log(this.data.dishes), 
        this.data.dishes[t].goods[a].one++, this.data.dishes[t].goods[a].gg[this.data.xzggindex].num++;
        var e = "a" + a + "b" + t + "c" + this.data.gg[this.data.xzggindex].id, s = this.data.xzggindex;
        if (2 == this.data.types) var o = this.data.gg[this.data.xzggindex].cost; else o = this.data.gg[this.data.xzggindex].cost;
        var d = this.data.dishes[t].goods[a].box_fee;
        console.log("餐盒费是：" + d);
        var i = Number(this.data.dishes[t].goods[a].num), n = this.data.dishes[t].goods[a].gg[this.data.xzggindex].num, r = this.data.ggbt + this.data.gg[this.data.xzggindex].name, l = this.data.dishes[t].goods[a].id, c = this.data.dishes[t].goods[a].img, g = this.data.store, h = {
            ggindex: s,
            money: o,
            num: n,
            kc: i,
            id: l,
            mark: e,
            name: r,
            index: a,
            parentIndex: t,
            icon: c,
            store: g,
            box_fee: d,
            allmoney: (o * n).toFixed(2)
        }, u = this.data.carArray.filter(function(a) {
            return a.mark != e;
        });
        u.splice(a, 0, h), console.log(u), this.setData({
            shop_cart: u,
            carArray: u,
            dishes: this.data.dishes
        }), this.calTotalPrice(), this.setData({
            payDesc: this.payDesc()
        }), this.setData({
            showModal: !1,
            xzggindex: 0
        });
    },
    addCart: function(t) {
        console.log(this.data);
        var e = this, s = t.currentTarget.dataset.itemIndex, o = t.currentTarget.dataset.parentindex;
        this.setData({
            zindex: s,
            findex: o
        }), console.log(o, e.data.dishes[o].goods[s].id), a.util.request({
            url: "entry/wxapp/DishesGg",
            cachetime: "0",
            data: {
                dishes_id: e.data.dishes[o].goods[s].id
            },
            success: function(a) {
                if (console.log(a), 0 != a.data.length) null == e.data.dishes[o].goods[s].gg ? (e.setData({
                    showModal: !0,
                    gg: a.data,
                    ggbt: e.data.dishes[o].goods[s].name
                }), e.data.dishes[o].goods[s].gg = a.data, e.setData({
                    dishes: e.data.dishes
                })) : e.setData({
                    showModal: !0,
                    gg: a.data,
                    ggbt: e.data.dishes[o].goods[s].name
                }), console.log(e.data.dishes); else {
                    e.data.dishes[o].goods[s].one++;
                    var t = "a" + s + "b" + o;
                    if (2 == e.data.types) var d = e.data.dishes[o].goods[s].wm_money; else d = e.data.dishes[o].goods[s].money;
                    var i = e.data.dishes[o].goods[s].box_fee;
                    console.log("餐盒费是：" + i);
                    var n = Number(e.data.dishes[o].goods[s].num), r = e.data.dishes[o].goods[s].one, l = e.data.dishes[o].goods[s].name, c = e.data.dishes[o].goods[s].id, g = e.data.dishes[o].goods[s].img, h = e.data.store, u = {
                        money: d,
                        num: r,
                        kc: n,
                        id: c,
                        mark: t,
                        name: l,
                        index: s,
                        parentIndex: o,
                        icon: g,
                        store: h,
                        box_fee: i,
                        allmoney: (d * r).toFixed(2)
                    }, m = e.data.carArray.filter(function(a) {
                        return a.mark != t;
                    });
                    m.splice(s, 0, u), console.log(m), e.setData({
                        shop_cart: m,
                        carArray: m,
                        dishes: e.data.dishes
                    }), console.log(e.data.dishes), e.calTotalPrice(), e.setData({
                        payDesc: e.payDesc()
                    });
                }
            }
        });
    },
    calTotalPrice: function() {
        for (var a = this.data.carArray, t = 0, e = 0, s = 0, o = 0; o < a.length; o++) 2 == this.data.types ? (t += a[o].money * a[o].num + a[o].box_fee * a[o].num, 
        s += a[o].num, e += a[o].box_fee * a[o].num) : (t += a[o].money * a[o].num, s += a[o].num), 
        console.log(t);
        this.setData({
            shop_cart: a,
            totalPrice: t.toFixed(2),
            totalCount: s,
            totalbox: e
        });
    },
    payDesc: function() {
        console.log(this.data);
        var a = parseFloat(this.data.totalPrice), t = parseFloat(this.data.start_at);
        return 2 == this.data.types ? 0 == this.data.totalPrice ? "￥" + this.data.start_at + "元起送" : this.data.totalPrice <= 0 ? "￥" + this.data.start_at + "元起送" : a < t ? (console.log(this.data.totalPrice), 
        "还差" + (t - a).toFixed(2) + "元起送") : (console.log(a), "去结算") : 0 <= this.data.totalPrice ? "去下单" : void 0;
    },
    clear: function(a) {
        this.setData({
            shop_cart: [],
            carArray: [],
            carArray1: [],
            changeHidden: !0
        }), this.calTotalPrice(), this.reload();
    },
    clickImage: function(t) {
        var e = this;
        console.log(t), console.log(e.data), e.data.url;
        var s = t.target.dataset.id;
        console.log(s);
        for (var o = [], d = 0; d < e.data.dishes.length; d++) for (var i = 0; i < e.data.dishes[d].goods.length; i++) if (console.log(e.data.dishes[d].goods[i].id), 
        e.data.dishes[d].goods[i].id == s) {
            o.splice(s, 0, e.data.dishes[d].goods[i].img);
            var n = e.data.dishes[d].goods[i];
            a.util.request({
                url: "entry/wxapp/DishesInfo",
                cachetime: "0",
                data: {
                    id: n.id
                },
                success: function(a) {
                    console.log(a.data), wx.navigateTo({
                        url: "../dishinfo/dishinfo?id=" + n.id + "&types=" + e.data.types
                    });
                }
            });
        }
    },
    bomb: function(a) {
        for (var t = a.currentTarget.id, e = this.data.dishes, s = 0, o = e.length; s < o; ++s) for (var d = e[s].goods, i = 0; i < d.length; i++) d[i].id == t ? d[i].open = !d[i].open : d[i].open = !1;
        this.setData({
            dishes: e,
            id: a.currentTarget.id
        });
    },
    jcgwc: function(a) {
        var t = 0;
        for (var e in a) 0 != a[e].num && t++;
        return t;
    },
    pay: function(a) {
        console.log(this.data.types), console.log(this.data.shop_cart);
        var t = this.data.userinfo;
        if (console.log(t), "" != t.img && "" != t.name) if (2 == this.data.types) {
            if (s = this.data.shop_cart, console.log(this.data.shop_cart), console.log(this.jcgwc(s)), 
            console.log(this.data), wx.setStorageSync("store", this.data.store), wx.setStorageSync("order", this.data.shop_cart), 
            null == s || 0 == s.length) return void wx.showModal({
                title: "提示",
                showCancel: !1,
                content: "请选择菜品"
            });
            if (0 == this.jcgwc(s)) return void wx.showModal({
                title: "提示",
                showCancel: !1,
                content: "请选择菜品"
            });
            if (parseFloat(this.data.totalPrice) < parseFloat(this.data.start_at)) return;
            wx.navigateTo({
                url: "../pay/pay?types=" + this.data.types
            });
        } else {
            var e = this.data.tableid, s = this.data.shop_cart;
            console.log(this.data.shop_cart), console.log(this.data), wx.setStorageSync("store", this.data.store), 
            wx.setStorageSync("order", this.data.shop_cart), wx.navigateTo({
                url: "../order/order?types=" + this.data.types + "&tableid=" + e
            });
        } else wx.navigateTo({
            url: "getdl"
        });
    },
    navInfo: function(a) {
        wx.switchTab({
            url: "../info/info",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    change: function(a) {
        console.log("1111"), this.setData({
            changeHidden: !0
        });
    },
    toastChange: function(a) {
        this.setData({
            toastHidden: !0
        });
    },
    change1: function(a) {
        console.log("1111"), this.setData({
            changeHidden: !1
        });
    },
    ktpay: function() {
        wx.showModal({
            title: "提示",
            content: "此桌已开台不能点菜"
        });
    }
});