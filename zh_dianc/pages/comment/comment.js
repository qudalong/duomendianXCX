var t = getApp(), e = 0;

Page({
    data: {
        stars: [ 0, 1, 2, 3, 4 ],
        normalSrc: "../images/no-star.png",
        selectedSrc: "../images/full-star.png",
        key: 0,
        count: 0,
        url: ""
    },
    onLoad: function(a) {
        t.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.util.request({
                    url: "entry/wxapp/OrderInfo",
                    cachetime: "0",
                    data: {
                        id: a.wmddid
                    },
                    success: function(t) {
                        console.log(t.data), o.setData({
                            order: t.data,
                            seller: t.data.store
                        }), "2" == e.data.is_jf ? o.setData({
                            integral: 0
                        }) : "2" != t.data.store.is_jf ? "0" != t.data.store.integral ? o.setData({
                            integral: t.data.store.integral
                        }) : o.setData({
                            integral: e.data.integral
                        }) : o.setData({
                            integral: 0
                        });
                    }
                });
                var r = e.data;
                if (console.log(r), "1" == r.more) var n = wx.getStorageSync("bqxx").color;
                "2" == r.more && (n = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: n
                });
            }
        }), e = 0;
        var o = this;
        wx.getStorageSync("users").id, console.log(a.wmddid), o.setData({
            wmddid: a.wmddid
        }), t.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                o.setData({
                    url: t.data
                });
            }
        });
    },
    selectLeft: function(t) {
        console.log("111111");
        var a = t.currentTarget.dataset.key;
        1 == this.data.key && 1 == t.currentTarget.dataset.key && (a = 0), e = a, this.setData({
            key: a,
            count: e
        });
    },
    formSubmit: function(a) {
        var o = this;
        console.log(o.data), console.log("form发生了submit事件，携带数据为：", a.detail.value);
        var r = a.detail.value.content, n = wx.getStorageSync("users").id, s = o.data.seller.id, l = o.data.order.order.order_num, c = o.data.order.order.id, d = o.data.integral;
        console.log(l), console.log(e + "分--内容是：" + r + "---用户user_id是：" + n + "order_id是：" + c + "积分" + d);
        var i = "", u = !0;
        0 == e ? i = "请选择评分！" : "" == r ? i = "请填写您的评论内容" : (u = !1, t.util.request({
            url: "entry/wxapp/pl",
            header: {
                "Content-Type": "application/xml"
            },
            method: "GET",
            cachetime: "0",
            data: {
                score: e,
                content: r,
                user_id: n,
                seller_id: s,
                order_id: c,
                order_num: l,
                total_score: d
            },
            success: function(t) {
                console.log(t), o.setData({
                    url: t.data
                });
            }
        }), wx.navigateTo({
            url: "../comsuc/comsuc"
        })), 1 == u && wx.showModal({
            title: "提示",
            content: i
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