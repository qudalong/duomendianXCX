var t, e = getApp(), a = require("../../utils/qqmap-wx-jssdk.js"), o = require("../../utils/amap-wx.js"), s = require("../../utils/util.js");

Page({
    data: {
        huise: !1,
        huangse: !0,
        hdnum: 0,
        kpgg: !0,
        slider: [],
        currentTab: 0,
        swiperCurrent: 0,
        listarr: [ "距离", "推荐", "销量", "评分" ],
        activeIndex: 0,
        qqsj: !1,
        scrollHeight: 0,
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0,
        jzwb: !1,
        bjyylb: "laba"
    },
    onLoad: function(n) {
        console.log(n);
        var i = decodeURIComponent(n.scene);
        if (console.log("scene", i), "undefined" != i) var c = i;
        null != n.userid && (console.log("转发获取到的userid:", n.userid), c = n.userid), console.log("fxzuid", c);
        var l = s.formatTime(new Date()).slice(11, 16);
        console.log(l), this.setData({
            current_time: l
        });
        var r = this;
        new o.AMapWX({
            key: "d03d1ecd781de95397abc7c9f60273e2"
        }).getWeather({
            success: function(t) {
                console.log(t), r.setData({
                    tianqi: t
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.getSystemInfo({
            success: function(t) {
                r.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), e.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e), t = new a({
                    key: e.data.map_key
                }), r.setData({
                    mdxx: e.data
                }), "1" == e.data.more && (r.dwreLoad(), wx.setNavigationBarTitle({
                    title: e.data.pt_name
                })), "2" == e.data.more && r.danreLoad(), wx.setStorageSync("bqxx", e.data);
            }
        }), e.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("imglink", t.data), r.setData({
                    url: t.data
                });
            }
        }), e.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), r.setData({
                    url2: t.data
                });
            }
        }), e.util.request({
            url: "entry/wxapp/ad2",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                for (var e = [], a = [], o = 0; o < t.data.length; o++) "1" == t.data[o].type && e.push(t.data[o]), 
                "2" == t.data[o].type && a.push(t.data[o]);
                console.log(e, a), r.setData({
                    slider: e
                }), 0 != a.length && r.setData({
                    kpgg: !1,
                    kpggimg: a
                });
            }
        }), e.util.request({
            url: "entry/wxapp/storetype",
            cachetime: "0",
            success: function(t) {
                console.log(t.data);
                for (var e = [], a = 0, o = t.data.length; a < o; a += 8) e.push(t.data.slice(a, a + 8));
                console.log(e), r.setData({
                    navs: e
                });
            }
        }), wx.login({
            success: function(t) {
                var a = t.code;
                wx.setStorageSync("code", t.code), e.util.request({
                    url: "entry/wxapp/openid",
                    cachetime: "0",
                    data: {
                        code: a
                    },
                    success: function(t) {
                        console.log(t), wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                        var a = t.data.openid;
                        console.log(a), "" == a ? wx.showToast({
                            title: "没有获取到openid",
                            icon: "",
                            image: "",
                            duration: 1e3,
                            mask: !0,
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        }) : e.util.request({
                            url: "entry/wxapp/Login",
                            cachetime: "0",
                            data: {
                                openid: a
                            },
                            success: function(t) {
                                console.log(t), wx.setStorageSync("users", t.data), e.util.request({
                                    url: "entry/wxapp/New",
                                    cachetime: "0",
                                    data: {
                                        user_id: t.data.id,
                                        store_id: r.data.mdxx.default_store
                                    },
                                    success: function(t) {
                                        console.log(t), wx.setStorageSync("new_user", t.data);
                                    }
                                }), null != c && e.util.request({
                                    url: "entry/wxapp/Binding",
                                    cachetime: "0",
                                    data: {
                                        fx_user: t.data.id,
                                        user_id: c
                                    },
                                    success: function(t) {
                                        console.log(t);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    dwreLoad: function() {
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var o = a.latitude, s = a.longitude, n = o + "," + s;
                console.log(n), t.reverseGeocoder({
                    location: {
                        latitude: o,
                        longitude: s
                    },
                    coord_type: 1,
                    success: function(t) {
                        var a = t.result.ad_info.location;
                        console.log(t), console.log(t.result.formatted_addresses.recommend), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), 
                        e.setData({
                            weizhi: t.result.formatted_addresses.recommend,
                            startjwd: a
                        }), e.duoreLoad(a);
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
                    success: function(a) {
                        a.confirm && wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.userLocation"] ? wx.getLocation({
                                    type: "wgs84",
                                    success: function(a) {
                                        var o = a.latitude, s = a.longitude, n = o + "," + s;
                                        console.log(n), t.reverseGeocoder({
                                            location: {
                                                latitude: o,
                                                longitude: s
                                            },
                                            coord_type: 1,
                                            success: function(t) {
                                                var a = t.result.ad_info.location;
                                                console.log(t), console.log(t.result.formatted_addresses.recommend), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), 
                                                e.setData({
                                                    weizhi: t.result.formatted_addresses.recommend,
                                                    startjwd: a
                                                }), e.duoreLoad(a);
                                            },
                                            fail: function(t) {
                                                console.log(t);
                                            },
                                            complete: function(t) {
                                                console.log(t);
                                            }
                                        });
                                    }
                                }) : e.dwreLoad();
                            },
                            fail: function(t) {}
                        });
                    }
                });
            },
            complete: function(t) {}
        });
    },
    closekpgg: function() {
        this.setData({
            kpgg: !0
        });
    },
    duoreLoad: function(t) {
        console.log(t);
        var a = this;
        e.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                lat: t.lat,
                lng: t.lng,
                page: a.data.pagenum,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回的商家列表数据", t.data), t.data.length < 10 ? a.setData({
                    mygd: !0,
                    jzgd: !0,
                    jzwb: !0
                }) : a.setData({
                    jzgd: !0,
                    pagenum: a.data.pagenum + 1
                });
                var e = a.data.storelist;
                e = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(e = e.concat(t.data));
                for (var o = 0; o < t.data.length; o++) {
                    "0.0" == t.data[o].score && (t.data[o].score = "5.0");
                    var s = parseFloat(t.data[o].juli);
                    console.log(s), console.log(), t.data[o].aa = s < 1e3 ? s + "m" : (s / 1e3).toFixed(2) + "km", 
                    t.data[o].aa1 = s, a.setData({
                        jlstorelist: e,
                        tjpx: e,
                        xlpx: e,
                        pfpx: e,
                        storelist: e,
                        qqsj: !0
                    }), a.setData({
                        tjstorelist: a.data.tjpx.sort(a.comparesx("number")),
                        xlstorelist: a.data.xlpx.sort(a.comparejx("sales")),
                        pfstorelist: a.data.pfpx.sort(a.comparejx("score"))
                    });
                }
                console.log(e);
            }
        });
    },
    tabClick: function(t) {
        var e = this, a = t.currentTarget.id;
        console.log(a), this.setData({
            activeIndex: t.currentTarget.id
        }), "1" == a && e.setData({
            tjstorelist: e.data.tjpx.sort(e.comparesx("number")),
            qqsj: !0
        }), "2" == a && (console.log(e.data.xlpx), e.setData({
            xlstorelist: e.data.xlpx.sort(e.comparejx("sales")),
            qqsj: !0
        })), "3" == a && (console.log(e.data.pfpx), e.setData({
            pfstorelist: e.data.pfpx.sort(e.comparejx("score")),
            qqsj: !0
        })), "0" == a && e.setData({
            qqsj: !0
        });
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    comparesx: function(t) {
        return function(e, a) {
            var o = e[t], s = a[t];
            return isNaN(Number(o)) || isNaN(Number(s)) || (o = Number(o), s = Number(s)), o < s ? -1 : s < o ? 1 : 0;
        };
    },
    comparejx: function(t) {
        return function(e, a) {
            var o = e[t], s = a[t];
            return isNaN(Number(o)) || isNaN(Number(s)) || (o = Number(o), s = Number(s)), o < s ? 1 : s < o ? -1 : 0;
        };
    },
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
            success: function(t) {
                console.log(t), 0 == t.status && (s = Math.round(t.result.elements[0].distance), 
                o(s));
            },
            fail: function(t) {
                console.log(t), 373 == t.status && (s = 15e3, o(s));
            },
            complete: function(t) {
                console.log(t);
            }
        });
    },
    changejwd: function(e, a, o) {
        var s;
        t.reverseGeocoder({
            location: {
                latitude: e,
                longitude: a
            },
            coord_type: 3,
            success: function(t) {
                console.log(t), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), s = t.result.ad_info.location, 
                o(s);
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
    tzfl: function(t) {
        console.log(t.currentTarget.dataset.flinfo), wx.navigateTo({
            url: "sjfl?flid=" + t.currentTarget.dataset.flinfo.id + "&flname=" + t.currentTarget.dataset.flinfo.type_name
        });
    },
    danreLoad: function() {
        this.setData({
            hdnum: 0
        });
        var t = this, a = s.formatTime(new Date()).slice(11, 16);
        console.log(a), console.log(t.data);
        var o = t.data.current_time;
        e.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: t.data.mdxx.default_store,
                user_id: wx.getStorageSync("users").id
            },
            success: function(a) {
                console.log(a), "" != a.data.store_mp3 && "1" == a.data.is_mp3 && (wx.playBackgroundAudio({
                    dataUrl: a.data.store_mp3
                }), wx.getBackgroundAudioPlayerState({
                    success: function(t) {
                        console.log(t), t.status, t.dataUrl, t.currentPosition, t.duration, t.downloadPercent;
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                })), wx.setStorageSync("nbcolor", a.data.color), getApp().sjid = a.data.id, wx.setNavigationBarTitle({
                    title: a.data.name
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.color
                }), t.setData({
                    color: a.data.color
                }), e.util.request({
                    url: "entry/wxapp/Reduction",
                    cachetime: "0",
                    data: {
                        id: getApp().sjid
                    },
                    success: function(e) {
                        console.log(e), t.setData({
                            mj: e.data
                        }), 0 != e.data.length && "1" == a.data.xyh_open ? t.setData({
                            hdnum: 2
                        }) : 0 != e.data.length && "1" != a.data.xyh_open || 0 == e.data.length && "1" == a.data.xyh_open ? t.setData({
                            hdnum: 1
                        }) : t.setData({
                            hdnum: 0
                        });
                    }
                });
                var s = a.data.time, n = a.data.time2, i = a.data.time3, c = a.data.time4, l = a.data.is_rest;
                console.log("当前的系统时间为" + o), console.log("商家的营业时间从" + s + "至" + n, i + "至" + c), 
                t.setData({
                    rest: a.data.is_rest
                }), 1 == l ? console.log("商家正在休息") : (console.log("商家没有休息"), s < c ? s < o && o < n || i < o && o < c ? (console.log("商家正常营业"), 
                t.setData({
                    time: 1
                })) : o < s || n < o && o < i ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), t.setData({
                    time: 2
                })) : c < o && (console.log("商家以及关店啦，明天再来吧"), t.setData({
                    time: 3
                })) : c < s && (s < o && o < n || i < o && c < o || o < i && o < c ? (console.log("商家正常营业"), 
                t.setData({
                    time: 1
                })) : o < s || n < o && o < i ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), t.setData({
                    time: 2
                })) : c < o && (console.log("商家以及关店啦，明天再来吧"), t.setData({
                    time: 3
                }))));
                var r = Number(a.data.distance);
                t.setData({
                    store: a.data,
                    distance: r
                }), t.setData({
                    sjdzlat: Number(a.data.coordinates.split(",")[0]),
                    sjdzlng: Number(a.data.coordinates.split(",")[1])
                });
            }
        });
    },
    facing: function(t) {
        wx.navigateTo({
            url: "../fukuan/fukuan"
        });
    },
    breakout: function(t) {
        wx.scanCode({
            success: function(t) {
                console.log(t);
                var e = "../" + t.path.substring(15);
                wx.navigateTo({
                    url: e
                });
            },
            fail: function(t) {
                console.log("扫码fail");
            }
        });
    },
    takeOut: function(t) {
        wx.navigateTo({
            url: "../index/index?type=2"
        });
    },
    call_phone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.store.tel
        });
    },
    tomap: function(t) {
        wx.openLocation({
            latitude: this.data.sjdzlat,
            longitude: this.data.sjdzlng,
            name: this.data.store.name,
            address: this.data.store.address
        });
    },
    tzsjhj: function(t) {
        console.log(t.currentTarget.dataset.sjid), wx.navigateTo({
            url: "../info/sjhj"
        });
    },
    tzxcx: function(t) {
        console.log(t.currentTarget.dataset.appid), wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    tzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.slider);
        var e = this.data.slider[t.currentTarget.dataset.index];
        console.log(e), "1" == e.item && wx.navigateTo({
            url: e.src
        }), "2" == e.item && wx.navigateTo({
            url: "webhtml?weburl=" + e.id
        }), "3" == e.item && wx.navigateToMiniProgram({
            appId: e.tz_appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    ggtzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.kpggimg);
        var e = this.data.kpggimg[t.currentTarget.dataset.index];
        console.log(e), "1" == e.item && wx.navigateTo({
            url: e.src
        }), "2" == e.item && wx.navigateTo({
            url: "webhtml?weburl=" + e.id
        }), "3" == e.item && wx.navigateToMiniProgram({
            appId: e.tz_appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    showShareModal: function() {
        this.setData({
            share_modal_active: "active",
            no_scroll: !0
        });
    },
    shareModalClose: function() {
        this.setData({
            share_modal_active: "",
            no_scroll: !1
        });
    },
    getGoodsQrcode: function() {
        var t = this;
        t.setData({
            goods_qrcode_active: "active",
            share_modal_active: ""
        }), e.util.request({
            url: "entry/wxapp/StoreCode",
            cachetime: "0",
            data: {
                store_id: getApp().sjid
            },
            success: function(e) {
                t.setData({
                    goods_qrcode: t.data.url2 + e.data
                });
            }
        });
    },
    goodsQrcodeClose: function() {
        this.setData({
            goods_qrcode_active: "",
            no_scroll: !1
        });
    },
    goodsQrcodeClick: function(t) {
        var e = t.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ e ]
        });
    },
    saveGoodsQrcode: function() {
        var t = this;
        wx.saveImageToPhotosAlbum ? (wx.showLoading({
            title: "正在保存图片",
            mask: !1
        }), console.log(t.data.goods_qrcode), wx.downloadFile({
            url: t.data.goods_qrcode,
            success: function(e) {
                console.log(e), wx.showLoading({
                    title: "正在保存图片",
                    mask: !1
                }), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function() {
                        t.goodsQrcodeClose(), wx.showModal({
                            title: "提示",
                            content: "商家海报保存成功",
                            showCancel: !1
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,无法正常保存图片,点击确定重新获取授权。",
                            showCancel: !1,
                            success: function(a) {
                                a.confirm ? wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.writePhotosAlbum"] && t.saveGoodsQrcode();
                                    },
                                    fail: function(t) {}
                                }) : wx.showModal({
                                    title: "图片保存失败",
                                    content: e.errMsg,
                                    showCancel: !1
                                });
                            }
                        });
                    },
                    complete: function(t) {
                        console.log(t), wx.hideLoading();
                    }
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "图片下载失败",
                    content: e.errMsg + ";" + t.data.goods_qrcode,
                    showCancel: !1
                });
            },
            complete: function(t) {
                console.log(t), wx.hideLoading();
            }
        })) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("bqxx");
        if ("1" == t.more) var e = wx.getStorageSync("bqxx").color;
        "2" == t.more && (e = wx.getStorageSync("nbcolor")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e
        }), this.setData({
            color: e
        });
    },
    onHide: function() {
        this.setData({
            kpgg: !0
        }), wx.stopBackgroundAudio();
    },
    gbbjyy: function() {
        var t = this.data.bjyylb;
        "laba" == t && (wx.stopBackgroundAudio(), this.setData({
            bjyylb: "laba1"
        }), wx.showToast({
            title: "音乐已关闭"
        })), "laba1" == t && (wx.playBackgroundAudio({
            dataUrl: this.data.store.store_mp3
        }), this.setData({
            bjyylb: "laba"
        }), wx.showToast({
            title: "音乐已开启"
        }));
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        "1" == this.data.mdxx.more && (this.setData({
            activeIndex: 0,
            pagenum: 1,
            storelist: [],
            qqsj: !1,
            jzgd: !0,
            jzwb: !1,
            mygd: !1
        }), console.log("下拉刷新", this.data.pagenum), this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.dwreLoad())), "2" == this.data.mdxx.more && this.danreLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum), !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.duoreLoad(this.data.startjwd));
    },
    onShareAppMessage: function() {}
});