var t = getApp(), e = (require("../../../utils/util.js"), new Date()), a = e.getFullYear(), s = e.getMonth() + 1, n = e.getDate(), o = (e.getDay(), 
[ a, s, n ]), r = [ {
    value: "日",
    class: "weekend"
}, {
    value: "一",
    class: ""
}, {
    value: "二",
    class: ""
}, {
    value: "三",
    class: ""
}, {
    value: "四",
    class: ""
}, {
    value: "五",
    class: ""
}, {
    value: "六",
    class: "weekend"
} ], l = function(t) {
    return t % 400 == 0 || t % 4 == 0 && t % 100 != 0;
}, i = function(t, e, o) {
    return t == a && e == s && o == n;
}, c = function(t, e) {
    return (t + e) % 7 == 0 || (t + e - 1) % 7 == 0;
}, d = function(t, e) {
    return new Date(t + "/" + e + "/02 00:00:00").getUTCDay();
}, u = function(t, e) {
    var a = l(t);
    return 2 == s && a ? 29 : 2 != s || a ? [ 4, 6, 9, 11 ].includes(e) ? 30 : 31 : 28;
}, g = function(t, e) {
    return new Date(t, e, 0).getDate();
}, q = function(t, e) {
    for (var a = g(t, e), s = d(t, e), n = [], r = 1; r <= a; r++) {
        var l = i(t, e, r), q = o[0] == t && o[1] == e && o[2] == r, h = l ? "today" : "", f = q ? "selected" : "", w = {
            value: r,
            date: [ t, e, r ],
            class: "date-bg " + (c(s, r) ? "weekend" : "") + " " + h + " " + f + " " + (l && q ? "today-selected" : "")
        };
        n.push(w);
    }
    return n.slice(0, u(t, e));
};

Page({
    data: {
        currYear: a,
        currMonth: s,
        week: r,
        emptyGrids: d(a, s),
        days: q(a, s),
        selected: o,
        disabled: !1,
        logintext: "点击签到",
        lxts: 0,
        isbq: !1,
        bqtext: "点击补签"
    },
    onLoad: function() {
        function e() {
            var t = new Date(), e = t.getMonth() + 1, a = t.getDate();
            return [ t.getFullYear(), e, a ];
        }
        console.log(this.data.days, this.data.selected), console.log(e()), this.setData({
            nowtime: e()
        });
        var a = this;
        t.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(t) {
                console.log("签到设置", t), a.setData({
                    qdset: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/ContinuousList",
            cachetime: "0",
            success: function(t) {
                console.log("查看连签奖励", t), a.setData({
                    jl: t.data
                });
            }
        }), this.reLoad(), this.lqts();
    },
    in_array: function(t, e) {
        for (var a = 0; a < e.length; a++) if (e[a].toString() == t) return !0;
        return !1;
    },
    lqts: function() {
        this.setData({
            isbq: !1
        });
        var e = this, a = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/Continuous",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log("查看连续签到天数", t), e.setData({
                    lxts: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Isbq",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log("isbq", t), e.setData({
                    havebq: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/userinfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log("个人信息", t), e.setData({
                    grjf: t.data.total_score
                });
            }
        });
    },
    reLoad: function() {
        var e = this, a = wx.getStorageSync("users").id;
        t.util.request({
            url: "entry/wxapp/MySign",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(a) {
                console.log("我的签到", a), e.setData({
                    wdqd: a.data
                });
                for (var s = [], n = e.data.days, o = 0; o < a.data.length; o++) s.push(a.data[o].time);
                console.log(s, n), e.in_array(e.data.nowtime.toString(), s) ? (console.log("今日已签到"), 
                e.setData({
                    disabled: !0,
                    logintext: "今日已签到"
                })) : (console.log("今日未签到"), e.setData({
                    disabled: !1,
                    logintext: "点击签到"
                }));
                for (var r = 0; r < n.length; r++) e.in_array(n[r].date.toString(), s) && (n[r].isqd = 1);
                t.util.request({
                    url: "entry/wxapp/Special",
                    cachetime: "0",
                    success: function(t) {
                        console.log("Special", t);
                        for (var a = t.data, s = 0; s < a.length; s++) {
                            a[s].day = a[s].day.split("-");
                            var o = new Date(a[s].day[0], a[s].day[1] - 1, a[s].day[2]), r = o.getFullYear(), l = o.getMonth() + 1, i = o.getDate();
                            a[s].day = r + "," + l + "," + i;
                        }
                        console.log(a), e.setData({
                            special: a
                        });
                        for (var c = 0; c < n.length; c++) for (var d = 0; d < a.length; d++) n[c].date.toString() == a[d].day && (n[c].tsrq = a[d]);
                        e.setData({
                            days: n
                        });
                    }
                });
            }
        });
    },
    qd: function() {
        var e = this, a = wx.getStorageSync("users").id, s = this.data.wdqd;
        console.log(e.data.nowtime, e.data.special, e.data.qdset, s);
        for (var n = e.data.qdset[0].integral, o = 0; o < e.data.special.length; o++) e.data.nowtime.toString() == e.data.special[o].day && (n = e.data.special[o].integral);
        if (0 == s.length) var r = e.data.qdset[0].one; else r = 0;
        console.log(n, r), t.util.request({
            url: "entry/wxapp/Sign",
            cachetime: "0",
            data: {
                user_id: a,
                time: e.data.nowtime.toString(),
                integral: n,
                one: r
            },
            success: function(t) {
                console.log(t), e.reLoad(), e.lqts();
            }
        });
    },
    bq: function() {
        var e = this, a = wx.getStorageSync("users").id, s = this.data.wdqd, n = Number(this.data.grjf);
        console.log(e.data.bqtime, e.data.special, e.data.qdset, s, n);
        for (var o = e.data.qdset[0].integral, r = 0; r < e.data.special.length; r++) e.data.bqtime.toString() == e.data.special[r].day && (o = e.data.special[r].integral);
        if (0 == s.length) var l = e.data.qdset[0].one; else l = 0;
        console.log(o, l), wx.showModal({
            title: "温馨提示",
            content: "补签将会扣除您" + e.data.qdset[0].bq_integral + "积分哦",
            success: function(s) {
                s.confirm ? (console.log("用户点击确定"), Number(e.data.qdset[0].bq_integral) > n ? wx.showModal({
                    title: "提示",
                    content: "您的积分为" + n + ",不足补签扣除"
                }) : t.util.request({
                    url: "entry/wxapp/Sign2",
                    cachetime: "0",
                    data: {
                        user_id: a,
                        time: e.data.bqtime.toString(),
                        integral: o,
                        one: l
                    },
                    success: function(t) {
                        console.log(t), e.reLoad(), e.lqts();
                    }
                })) : s.cancel && console.log("用户点击取消");
            }
        });
    },
    changeMonth: function(t) {
        var e = t.target.id, a = this.data.currYear, s = this.data.currMonth;
        s = "prev" == e ? s - 1 : s + 1, "prev" == e && s < 1 && (a -= 1, s = 12), "next" == e && 12 < s && (a += 1, 
        s = 1), this.setData({
            currYear: a,
            currMonth: s,
            emptyGrids: d(a, s),
            days: q(a, s)
        }), this.reLoad();
    },
    selectDate: function(t) {
        var e = this, a = this.data.havebq, s = e.data.nowtime, n = t.currentTarget.dataset.selected, o = t.currentTarget.dataset.tsrq;
        console.log(s, n, o), e.setData({
            bqtime: n
        });
        var r = new Date(s[0], s[1], s[2]), l = new Date(n[0], n[1], n[2]), i = r.getTime(), c = l.getTime();
        console.log(i, c, a), c < i ? (console.log("以前"), 2 == a ? e.setData({
            bqdisabled: !1,
            bqtext: "点击补签"
        }) : e.setData({
            bqdisabled: !0,
            bqtext: "今日已补签一次"
        }), e.setData({
            isbq: !0
        }), null != o.tsrq && wx.showModal({
            title: o.tsrq.day + "是" + o.tsrq.title,
            content: "本日签到特殊奖励" + o.tsrq.integral + "积分"
        })) : (i == c ? (null != o.tsrq && wx.showModal({
            title: o.tsrq.day + "是" + o.tsrq.title,
            content: "本日签到特殊奖励" + o.tsrq.integral + "积分"
        }), console.log("今日")) : (null != o.tsrq && wx.showModal({
            title: o.tsrq.day + "是" + o.tsrq.title,
            content: "本日签到特殊奖励" + o.tsrq.integral + "积分"
        }), console.log("以后")), e.setData({
            isbq: !1
        }));
        var d = o.value;
        this.setData({
            xz: d
        });
    },
    onPullDownRefresh: function() {
        this.reLoad(), this.lqts(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    }
});