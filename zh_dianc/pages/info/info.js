var t = getApp(), o = require("../../utils/util.js");

Page({
    data: {
        currentTab: 0,
        swiperCurrent: 0,
        huise: !1,
        huangse: !0,
        hdnum: 0,
        kpgg: !0,
        bjyylb: "laba"
    },
    onLoad: function(t) {
        console.log(t);
        var e = decodeURIComponent(t.scene);
        console.log("scene", e), "undefined" != e && (getApp().sjid = e), null != t.id && (console.log("转发获取到的sjid:", t.id), 
        getApp().sjid = t.id);
        var a = wx.getStorageSync("bqxx");
        console.log(a), this.setData({
            bqxx: a
        });
        var s = o.formatTime(new Date()).slice(11, 16);
        console.log(s), this.setData({
            current_time: s
        }), this.reLoad();
    },
    reLoad: function() {
        this.setData({
            hdnum: 0
        });
        var e = this, a = o.formatTime(new Date()).slice(11, 16);
        console.log(a), wx.login({
            success: function(o) {
                var e = o.code;
                wx.setStorageSync("code", o.code), t.util.request({
                    url: "entry/wxapp/openid",
                    cachetime: "0",
                    data: {
                        code: e
                    },
                    success: function(o) {
                        console.log(o), wx.setStorageSync("key", o.data.session_key), wx.setStorageSync("openid", o.data.openid);
                        var e = o.data.openid;
                        console.log(e), "" == e ? wx.showToast({
                            title: "没有获取到openid",
                            icon: "",
                            image: "",
                            duration: 1e3,
                            mask: !0,
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        }) : t.util.request({
                            url: "entry/wxapp/Login",
                            cachetime: "0",
                            data: {
                                openid: e
                            },
                            success: function(o) {
                                console.log(o), wx.setStorageSync("users", o.data), t.util.request({
                                    url: "entry/wxapp/New",
                                    cachetime: "0",
                                    data: {
                                        user_id: o.data.id,
                                        store_id: getApp().sjid
                                    },
                                    success: function(t) {
                                        console.log(t), wx.setStorageSync("new_user", t.data);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }), console.log(e.data);
        var s = e.data.current_time;
        t.util.request({
            url: "entry/wxapp/Store",
            cachetime: "0",
            data: {
                id: getApp().sjid,
                user_id: wx.getStorageSync("users").id
            },
            success: function(o) {
                console.log(o), "" != o.data.store_mp3 && "1" == o.data.is_mp3 && (wx.playBackgroundAudio({
                    dataUrl: o.data.store_mp3
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
                })), wx.setStorageSync("nbcolor", o.data.color), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.data.color
                }), e.setData({
                    color: o.data.color
                }), t.util.request({
                    url: "entry/wxapp/Reduction",
                    cachetime: "0",
                    data: {
                        id: getApp().sjid
                    },
                    success: function(t) {
                        console.log(t), e.setData({
                            mj: t.data
                        }), 0 != t.data.length && "1" == o.data.xyh_open ? e.setData({
                            hdnum: 2
                        }) : 0 != t.data.length && "1" != o.data.xyh_open || 0 == t.data.length && "1" == o.data.xyh_open ? e.setData({
                            hdnum: 1
                        }) : e.setData({
                            hdnum: 0
                        });
                    }
                });
                var a = o.data.time, n = o.data.time2, c = o.data.time3, i = o.data.time4, l = o.data.is_rest;
                console.log("当前的系统时间为" + s), console.log("商家的营业时间从" + a + "至" + n, c + "至" + i), 
                e.setData({
                    rest: o.data.is_rest
                }), 1 == l ? console.log("商家正在休息") : (console.log("商家没有休息"), a < i ? a < s && s < n || c < s && s < i ? (console.log("商家正常营业"), 
                e.setData({
                    time: 1
                })) : s < a || n < s && s < c ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), e.setData({
                    time: 2
                })) : i < s && (console.log("商家以及关店啦，明天再来吧"), e.setData({
                    time: 3
                })) : i < a && (a < s && s < n || c < s && i < s || s < c && s < i ? (console.log("商家正常营业"), 
                e.setData({
                    time: 1
                })) : s < a || n < s && s < c ? (console.log("商家还没开店呐，稍等一会儿可以吗？"), e.setData({
                    time: 2
                })) : i < s && (console.log("商家以及关店啦，明天再来吧"), e.setData({
                    time: 3
                }))));
                var d = Number(o.data.distance);
                e.setData({
                    store: o.data,
                    distance: d
                }), e.setData({
                    sjdzlat: Number(o.data.coordinates.split(",")[0]),
                    sjdzlng: Number(o.data.coordinates.split(",")[1])
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), wx.setStorageSync("imglink", t.data), e.setData({
                    url: t.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    url2: t.data
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
                var o = "../" + t.path.substring(15);
                wx.navigateTo({
                    url: o
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
            url: "sjhj"
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
        var o = this;
        o.setData({
            goods_qrcode_active: "active",
            share_modal_active: ""
        }), t.util.request({
            url: "entry/wxapp/StoreCode",
            cachetime: "0",
            data: {
                store_id: getApp().sjid
            },
            success: function(t) {
                o.setData({
                    goods_qrcode: o.data.url2 + t.data
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
        var o = t.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ o ]
        });
    },
    saveGoodsQrcode: function() {
        var t = this;
        wx.saveImageToPhotosAlbum ? (wx.showLoading({
            title: "正在保存图片",
            mask: !1
        }), console.log(t.data.goods_qrcode), wx.downloadFile({
            url: t.data.goods_qrcode,
            success: function(o) {
                console.log(o), wx.showLoading({
                    title: "正在保存图片",
                    mask: !1
                }), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function() {
                        t.goodsQrcodeClose(), wx.showModal({
                            title: "提示",
                            content: "商家海报保存成功",
                            showCancel: !1
                        });
                    },
                    fail: function(o) {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,无法正常保存图片,点击确定重新获取授权。",
                            showCancel: !1,
                            success: function(e) {
                                e.confirm ? wx.openSetting({
                                    success: function(o) {
                                        o.authSetting["scope.writePhotosAlbum"] && t.saveGoodsQrcode();
                                    },
                                    fail: function(t) {}
                                }) : wx.showModal({
                                    title: "图片保存失败",
                                    content: o.errMsg,
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
            fail: function(o) {
                wx.showModal({
                    title: "图片下载失败",
                    content: o.errMsg + ";" + t.data.goods_qrcode,
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
    onShow: function() {},
    onHide: function() {},
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
    onUnload: function() {
        wx.stopBackgroundAudio();
    },
    onPullDownRefresh: function() {
        this.reLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
        return t.setData({
            share_modal_active: "",
            no_scroll: !1
        }), {
            title: t.data.store.name,
            path: "/zh_dianc/pages/info/info?id=" + getApp().sjid,
            success: function(o) {
                t.setData({
                    share_modal_active: ""
                }), wx.showToast({
                    title: "转发成功"
                });
            },
            fail: function(t) {}
        };
    },
    closekpgg: function() {
        this.setData({
            kpgg: !0
        });
    }
});