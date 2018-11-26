function t(t) {
    this.key = t.key, this.requestConfig = {
        key: t.key,
        s: "rsx",
        platform: "WXJS",
        appname: t.key,
        sdkversion: "1.2.0",
        logversion: "2.0"
    };
}

t.prototype.getWxLocation = function(t, e) {
    wx.getLocation({
        type: "gcj02",
        success: function(t) {
            var o = t.longitude + "," + t.latitude;
            wx.setStorage({
                key: "userLocation",
                data: o
            }), e(o);
        },
        fail: function(o) {
            wx.getStorage({
                key: "userLocation",
                success: function(t) {
                    t.data && e(t.data);
                }
            }), t.fail({
                errCode: "0",
                errMsg: o.errMsg || ""
            });
        }
    });
}, t.prototype.getRegeo = function(t) {
    function e(e) {
        var a = o.requestConfig;
        wx.request({
            url: "https://api.ifonyo.com/amap/v3/geocode/regeo",
            data: {
                key: o.key,
                location: e,
                extensions: "all",
                s: a.s,
                platform: a.platform,
                appname: o.key,
                sdkversion: a.sdkversion,
                logversion: a.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var a, s, i, r, n, p, c, d, u;
                o.data.status && "1" == o.data.status ? (s = (a = o.data.regeocode).addressComponent, 
                i = [], r = "", a && a.roads[0] && a.roads[0].name && (r = a.roads[0].name + "附近"), 
                n = e.split(",")[0], p = e.split(",")[1], a.pois && a.pois[0] && (r = a.pois[0].name + "附近", 
                (c = a.pois[0].location) && (n = parseFloat(c.split(",")[0]), p = parseFloat(c.split(",")[1]))), 
                s.provice && i.push(s.provice), s.city && i.push(s.city), s.district && i.push(s.district), 
                s.streetNumber && s.streetNumber.street && s.streetNumber.number ? (i.push(s.streetNumber.street), 
                i.push(s.streetNumber.number)) : (d = "", a && a.roads[0] && a.roads[0].name && (d = a.roads[0].name), 
                i.push(d)), i = i.join(""), u = [ {
                    iconPath: t.iconPath,
                    width: t.iconWidth,
                    height: t.iconHeight,
                    name: i,
                    desc: r,
                    longitude: n,
                    latitude: p,
                    id: 0,
                    regeocodeData: a
                } ], t.success(u)) : t.fail({
                    errCode: o.data.infocode,
                    errMsg: o.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    var o = this;
    t.location ? e(t.location) : o.getWxLocation(t, function(t) {
        e(t);
    });
}, t.prototype.getWeather = function(t) {
    function e(e) {
        var s = "base";
        t.type && "forecast" == t.type && (s = "all"), wx.request({
            url: "https://api.ifonyo.com/amap/v3/weather/weatherInfo",
            data: {
                key: o.key,
                city: e,
                extensions: s,
                s: a.s,
                platform: a.platform,
                appname: o.key,
                sdkversion: a.sdkversion,
                logversion: a.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var o, a, s;
                e.data.status && "1" == e.data.status ? e.data.lives ? (o = e.data.lives) && 0 < o.length && (o = o[0], 
                (a = {
                    city: {
                        text: "城市",
                        data: (s = o).city
                    },
                    weather: {
                        text: "天气",
                        data: s.weather
                    },
                    temperature: {
                        text: "温度",
                        data: s.temperature
                    },
                    winddirection: {
                        text: "风向",
                        data: s.winddirection + "风"
                    },
                    windpower: {
                        text: "风力",
                        data: s.windpower + "级"
                    },
                    humidity: {
                        text: "湿度",
                        data: s.humidity + "%"
                    }
                }).liveData = o, t.success(a)) : e.data.forecasts && e.data.forecasts[0] && t.success({
                    forecast: e.data.forecasts[0]
                }) : t.fail({
                    errCode: e.data.infocode,
                    errMsg: e.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    var o = this, a = o.requestConfig;
    t.city ? e(t.city) : o.getWxLocation(t, function(s) {
        var i;
        i = s, wx.request({
            url: "https://api.ifonyo.com/amap/v3/geocode/regeo",
            data: {
                key: o.key,
                location: i,
                extensions: "all",
                s: a.s,
                platform: a.platform,
                appname: o.key,
                sdkversion: a.sdkversion,
                logversion: a.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var a, s;
                o.data.status && "1" == o.data.status ? ((s = o.data.regeocode).addressComponent ? a = s.addressComponent.adcode : s.aois && 0 < s.aois.length && (a = s.aois[0].adcode), 
                e(a)) : t.fail({
                    errCode: o.data.infocode,
                    errMsg: o.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    });
}, t.prototype.getPoiAround = function(t) {
    function e(e) {
        var s = {
            key: o.key,
            location: e,
            s: a.s,
            platform: a.platform,
            appname: o.key,
            sdkversion: a.sdkversion,
            logversion: a.logversion
        };
        t.querytypes && (s.types = t.querytypes), t.querykeywords && (s.keywords = t.querykeywords), 
        wx.request({
            url: "https://api.ifonyo.com/amap/v3/place/around",
            data: s,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var o, a, s, i;
                if (e.data.status && "1" == e.data.status) {
                    if ((e = e.data) && e.pois) {
                        for (o = [], a = 0; a < e.pois.length; a++) s = 0 == a ? t.iconPathSelected : t.iconPath, 
                        o.push({
                            latitude: parseFloat(e.pois[a].location.split(",")[1]),
                            longitude: parseFloat(e.pois[a].location.split(",")[0]),
                            iconPath: s,
                            width: 22,
                            height: 32,
                            id: a,
                            name: e.pois[a].name,
                            address: e.pois[a].address
                        });
                        i = {
                            markers: o,
                            poisData: e.pois
                        }, t.success(i);
                    }
                } else t.fail({
                    errCode: e.data.infocode,
                    errMsg: e.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    var o = this, a = o.requestConfig;
    t.location ? e(t.location) : o.getWxLocation(t, function(t) {
        e(t);
    });
}, t.prototype.getStaticmap = function(t) {
    function e(e) {
        a.push("location=" + e), t.zoom && a.push("zoom=" + t.zoom), t.size && a.push("size=" + t.size), 
        t.scale && a.push("scale=" + t.scale), t.markers && a.push("markers=" + t.markers), 
        t.labels && a.push("labels=" + t.labels), t.paths && a.push("paths=" + t.paths), 
        t.traffic && a.push("traffic=" + t.traffic);
        var o = s + a.join("&");
        t.success({
            url: o
        });
    }
    var o, a = [], s = "https://api.ifonyo.com/amap/v3/staticmap?";
    a.push("key=" + this.key), o = this.requestConfig, a.push("s=" + o.s), a.push("platform=" + o.platform), 
    a.push("appname=" + o.appname), a.push("sdkversion=" + o.sdkversion), a.push("logversion=" + o.logversion), 
    t.location ? e(t.location) : this.getWxLocation(t, function(t) {
        e(t);
    });
}, t.prototype.getInputtips = function(t) {
    var e = this.requestConfig, o = {
        key: this.key,
        s: e.s,
        platform: e.platform,
        appname: this.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
    };
    t.location && (o.location = t.location), t.keywords && (o.keywords = t.keywords), 
    t.type && (o.type = t.type), t.city && (o.city = t.city), t.citylimit && (o.citylimit = t.citylimit), 
    wx.request({
        url: "https://api.ifonyo.com/amap/v3/assistant/inputtips",
        data: o,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.tips && t.success({
                tips: e.data.tips
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getDrivingRoute = function(t) {
    var e = this.requestConfig, o = {
        key: this.key,
        s: e.s,
        platform: e.platform,
        appname: this.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
    };
    t.origin && (o.origin = t.origin), t.destination && (o.destination = t.destination), 
    t.strategy && (o.strategy = t.strategy), t.waypoints && (o.waypoints = t.waypoints), 
    t.avoidpolygons && (o.avoidpolygons = t.avoidpolygons), t.avoidroad && (o.avoidroad = t.avoidroad), 
    wx.request({
        url: "https://api.ifonyo.com/amap/v3/direction/driving",
        data: o,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.route && t.success({
                paths: e.data.route.paths,
                taxi_cost: e.data.route.taxi_cost || ""
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getWalkingRoute = function(t) {
    var e = this.requestConfig, o = {
        key: this.key,
        s: e.s,
        platform: e.platform,
        appname: this.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
    };
    t.origin && (o.origin = t.origin), t.destination && (o.destination = t.destination), 
    wx.request({
        url: "https://api.ifonyo.com/amap/v3/direction/walking",
        data: o,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.route && t.success({
                paths: e.data.route.paths
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getTransitRoute = function(t) {
    var e = this.requestConfig, o = {
        key: this.key,
        s: e.s,
        platform: e.platform,
        appname: this.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
    };
    t.origin && (o.origin = t.origin), t.destination && (o.destination = t.destination), 
    t.strategy && (o.strategy = t.strategy), t.city && (o.city = t.city), t.cityd && (o.cityd = t.cityd), 
    wx.request({
        url: "https://api.ifonyo.com/amap/v3/direction/transit/integrated",
        data: o,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (e && e.data && e.data.route) {
                var o = e.data.route;
                t.success({
                    distance: o.distance || "",
                    taxi_cost: o.taxi_cost || "",
                    transits: o.transits
                });
            }
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getRidingRoute = function(t) {
    var e = this.requestConfig, o = {
        key: this.key,
        s: e.s,
        platform: e.platform,
        appname: this.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
    };
    t.origin && (o.origin = t.origin), t.destination && (o.destination = t.destination), 
    wx.request({
        url: "https://api.ifonyo.com/amap/v4/direction/bicycling",
        data: o,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.data && t.success({
                paths: e.data.data.paths
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, module.exports.AMapWX = t;