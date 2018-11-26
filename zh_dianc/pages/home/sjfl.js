var t, e = getApp(), o = require("../../utils/qqmap-wx-jssdk.js"), a = require("../../utils/util.js");

Page({
    data: {
        listarr: [ "推荐排序", "销量", "评分", "距离" ],
        activeIndex: 0,
        qqsj: !1,
        scrollHeight: 0,
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0,
        jzwb: !1
    },
    onLoad: function(e) {
        var a = wx.getStorageSync("bqxx");
        if ("1" == a.more) var s = wx.getStorageSync("bqxx").color;
        "2" == a.more && (s = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: s
        }), console.log(e), wx.setNavigationBarTitle({
            title: e.flname
        });
        var n = wx.getStorageSync("imglink");
        this.setData({
            flid: e.flid,
            url: n
        }), console.log(this.data.flid);
        var i = this;
        t = new o({
            key: a.map_key
        }), wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), this.reLoad();
    },
    tabClick: function(t) {
        var e = this, o = t.currentTarget.id;
        console.log(o), this.setData({
            activeIndex: t.currentTarget.id,
            qqsj: !1
        }), "0" == o && e.setData({
            tjstorelist: e.data.tjpx.sort(e.comparesx("number")),
            qqsj: !0
        }), "1" == o && (console.log(e.data.xlpx), e.setData({
            xlstorelist: e.data.xlpx.sort(e.comparejx("sales")),
            qqsj: !0
        })), "2" == o && (console.log(e.data.pfpx), e.setData({
            pfstorelist: e.data.pfpx.sort(e.comparejx("score")),
            qqsj: !0
        })), "3" == o && e.setData({
            qqsj: !0
        });
    },
    comparesx: function(t) {
        return function(e, o) {
            var a = e[t], s = o[t];
            return isNaN(Number(a)) || isNaN(Number(s)) || (a = Number(a), s = Number(s)), a < s ? -1 : s < a ? 1 : 0;
        };
    },
    comparejx: function(t) {
        return function(e, o) {
            var a = e[t], s = o[t];
            return isNaN(Number(a)) || isNaN(Number(s)) || (a = Number(a), s = Number(s)), a < s ? 1 : s < a ? -1 : 0;
        };
    },
    sljz: function() {
        console.log("上拉加载", this.data.pagenum), !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad());
    },
    reLoad: function() {
        console.log(this.data.flid);
        var o = this;
        wx.getLocation({
            type: "wgs84",
            success: function(s) {
                var n = s.latitude, i = s.longitude, l = n + "," + i;
                console.log(l), t.reverseGeocoder({
                    location: {
                        latitude: n,
                        longitude: i
                    },
                    coord_type: 1,
                    success: function(t) {
                        var s = t.result.ad_info.location;
                        console.log(t), console.log(t.result.formatted_addresses.recommend), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), 
                        o.setData({
                            weizhi: t.result.formatted_addresses.recommend
                        }), e.util.request({
                            url: "entry/wxapp/StoreList",
                            cachetime: "0",
                            data: {
                                lat: s.lat,
                                lng: s.lng,
                                type_id: o.data.flid,
                                page: o.data.pagenum,
                                pagesize: 10
                            },
                            success: function(t) {
                                console.log("分页返回的商家列表数据", t.data), t.data.length < 10 && (o.setData({
                                    mygd: !0,
                                    jzwb: !0
                                }), wx.showToast({
                                    title: "没有更多了",
                                    icon: "loading",
                                    duration: 1e3
                                })), o.setData({
                                    jzgd: !0,
                                    pagenum: o.data.pagenum + 1
                                });
                                var e = o.data.storelist;
                                if (e = e.concat(t.data), 0 == t.data.length) o.setData({
                                    tjstorelist: e,
                                    jlpx: e,
                                    xlpx: e,
                                    pfpx: e,
                                    qqsj: !0
                                }); else for (var n = 0; n < e.length; n++) {
                                    "0.0" == e[n].score && (e[n].score = "5.0");
                                    var i = e[n].coordinates.split(",");
                                    console.log(i, s);
                                    var l = a.getDistance(s.lat, s.lng, i[0], i[1]).toFixed(1);
                                    console.log(l), e[n].aa = l < 1e3 ? l + "m" : (l / 1e3).toFixed(2) + "km", e[n].aa1 = l, 
                                    o.setData({
                                        jlstorelist: e,
                                        tjpx: e,
                                        xlpx: e,
                                        pfpx: e,
                                        storelist: e,
                                        qqsj: !0
                                    }), o.setData({
                                        tjstorelist: o.data.tjpx.sort(o.comparesx("number")),
                                        xlstorelist: o.data.xlpx.sort(o.comparejx("sales")),
                                        pfstorelist: o.data.pfpx.sort(o.comparejx("score"))
                                    });
                                }
                                console.log(e);
                            }
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    title: "警告",
                    content: "您点击了拒绝授权,无法正常使用功能，点击确定重新获取授权。",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.userLocation"], o.reLoad();
                            },
                            fail: function(t) {}
                        });
                    }
                });
            },
            complete: function(t) {}
        });
    },
    distance: function(e, o, a) {
        var s;
        t.calculateDistance({
            mode: "driving",
            from: {
                latitude: e.lat,
                longitude: e.lng
            },
            to: [ {
                latitude: o.lat,
                longitude: o.lng
            } ],
            success: function(t) {
                console.log(t), 0 == t.status && (s = Math.round(t.result.elements[0].distance), 
                a(s));
            },
            fail: function(t) {
                console.log(t), 373 == t.status && (s = 15e3, a(s));
            },
            complete: function(t) {
                console.log(t);
            }
        });
    },
    changejwd: function(e, o, a) {
        var s;
        t.reverseGeocoder({
            location: {
                latitude: e,
                longitude: o
            },
            coord_type: 3,
            success: function(t) {
                console.log(t), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), s = t.result.ad_info.location, 
                a(s);
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function(t) {
                console.log(t);
            }
        });
    },
    tzsj: function(t) {
        console.log(t.currentTarget.dataset.sjid);
        var e = t.currentTarget.dataset.sjid;
        getApp().sjid = t.currentTarget.dataset.sjid.id, "0" == e.is_dn && "0" == e.is_pd && "0" == e.is_yy && "1" == e.is_wm && "0" == e.is_sy ? wx.navigateTo({
            url: "../index/index?type=2"
        }) : wx.navigateTo({
            url: "../info/info"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            activeIndex: 0,
            qqsj: !1,
            pagenum: 1,
            storelist: [],
            mygd: !1,
            jzgd: !0,
            jzwb: !1
        }), this.reLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});