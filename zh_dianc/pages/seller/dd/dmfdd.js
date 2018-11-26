var t = getApp();

Page({
    data: {
        date: "",
        pagenum: 1,
        ddlist: [],
        mygd: !1,
        jzgd: !0,
        jzwb: !1
    },
    bindDateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    sousuo: function() {
        this.setData({
            pagenum: 1,
            ddlist: [],
            mygd: !1,
            jzgd: !0,
            jzwb: !1
        }), this.reLoad(this.data.date);
    },
    onLoad: function(t) {
        this.reLoad(this.data.date);
    },
    reLoad: function(a) {
        var d = wx.getStorageSync("sjdsjid");
        console.log(d);
        var e = this;
        t.util.request({
            url: "entry/wxapp/AppDmOrder",
            cachetime: "0",
            data: {
                store_id: d,
                page: e.data.pagenum,
                time: a
            },
            success: function(t) {
                console.log("分页返回的数据", t.data), 0 == t.data.length ? e.setData({
                    mygd: !0,
                    jzgd: !0,
                    jzwb: !0
                }) : e.setData({
                    jzgd: !0,
                    pagenum: e.data.pagenum + 1
                });
                var a = e.data.ddlist;
                a = a.concat(t.data), e.setData({
                    dmfdd: a,
                    ddlist: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            date: "",
            pagenum: 1,
            ddlist: [],
            mygd: !1,
            jzgd: !0,
            jzwb: !1
        }), this.reLoad(this.data.date), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum), !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad(this.data.date));
    },
    onShareAppMessage: function() {}
});