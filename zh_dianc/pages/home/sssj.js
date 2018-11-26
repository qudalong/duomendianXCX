var t, e = getApp(), o = require("../../utils/qqmap-wx-jssdk.js"), a = require("../../utils/util.js"), s = "";

Page({
    data: {
        qqsj: !0,
        msgList: [],
        searchLogList: [],
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        searchLogShowed: !0
    },
    onLoad: function(a) {
        var s = this, n = wx.getStorageSync("imglink");
        wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth,
                    searchLogList: wx.getStorageSync("searchLog") || [],
                    url: n
                });
            }
        }), e.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), t = new o({
                    key: e.data.map_key
                }), s.setData({
                    mdxx: e.data
                });
            }
        });
    },
    reLoad: function(o) {
        this.setData({
            qqsj: !1
        });
        var s = this;
        wx.getLocation({
            type: "wgs84",
            success: function(n) {
                var i = n.latitude, c = n.longitude, l = i + "," + c;
                console.log(l), t.reverseGeocoder({
                    location: {
                        latitude: i,
                        longitude: c
                    },
                    coord_type: 1,
                    success: function(t) {
                        var n = t.result.ad_info.location;
                        console.log(t), console.log(t.result.formatted_addresses.recommend), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), 
                        s.setData({
                            weizhi: t.result.formatted_addresses.recommend
                        }), e.util.request({
                            url: "entry/wxapp/SearchStore",
                            cachetime: "0",
                            data: {
                                key: o
                            },
                            success: function(t) {
                                console.log(t.data), s.setData({
                                    qqsj: !0
                                }), 0 == t.data.length && s.setData({
                                    tjstorelist: []
                                });
                                for (var e = t.data, o = 0; o < e.length; o++) {
                                    var i = e[o].coordinates.split(",");
                                    console.log(i, n);
                                    var c = a.getDistance(n.lat, n.lng, i[0], i[1]).toFixed(1);
                                    console.log(c), e[o].aa = c < 1e3 ? c + "m" : (c / 1e3).toFixed(2) + "km", e[o].aa1 = c, 
                                    s.setData({
                                        tjstorelist: e
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
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    showInput: function() {
        "" != wx.getStorageSync("searchLog") ? this.setData({
            inputShowed: !0,
            searchLogShowed: !0,
            searchLogList: wx.getStorageSync("searchLog")
        }) : this.setData({
            inputShowed: !0,
            searchLogShowed: !0
        });
    },
    searchData: function() {
        console.log(s);
        var t = this;
        if (t.setData({
            msgList: [],
            scrollTop: 0
        }), "" != s) {
            var e = t.data.searchLogList;
            -1 === e.indexOf(s) && (e.unshift(s), wx.setStorageSync("searchLog", e), t.setData({
                searchLogList: wx.getStorageSync("searchLog")
            })), t.reLoad(s);
        } else wx.showToast({
            title: "搜索内容为空",
            icon: "loading",
            duration: 1e3
        });
    },
    clearInput: function() {
        this.setData({
            msgList: [],
            scrollTop: 0,
            inputVal: ""
        }), s = "";
    },
    inputTyping: function(t) {
        "" != wx.getStorageSync("searchLog") ? this.setData({
            inputVal: t.detail.value,
            searchLogList: wx.getStorageSync("searchLog")
        }) : this.setData({
            inputVal: t.detail.value,
            searchLogShowed: !0
        }), s = t.detail.value;
    },
    searchDataByLog: function(t) {
        s = t.target.dataset.log, console.log(t.target.dataset.log), this.setData({
            msgList: [],
            scrollTop: 0,
            inputShowed: !0,
            inputVal: s
        }), this.searchData();
    },
    clearSearchLog: function() {
        this.setData({
            hidden: !1
        }), wx.removeStorageSync("searchLog"), this.setData({
            scrollTop: 0,
            hidden: !0,
            searchLogList: []
        });
    },
    onHide: function() {},
    onUnload: function() {}
});