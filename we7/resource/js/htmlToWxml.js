function t(t) {
    for (var e = {}, r = t.split(","), a = 0; a < r.length; a++) e[r[a]] = !0;
    return e;
}

function e(t) {
    return '"' + t + '"';
}

function r(t) {
    return t.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
}

var a = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, n = /^<\/([-A-Za-z0-9_]+)[^>]*>/, i = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, s = t("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), o = t("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), c = t("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = t("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), d = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), h = t("script,style"), u = function(t, e) {
    function r(t, r) {
        if (r) for (a = m.length - 1; 0 <= a && m[a] != r; a--) ; else var a = 0;
        if (0 <= a) {
            for (var n = m.length - 1; a <= n; n--) e.end && e.end(m[n]);
            m.length = a;
        }
    }
    var u, f, p, m = [], v = t;
    for (m.last = function() {
        return this[this.length - 1];
    }; t; ) {
        if (f = !0, m.last() && h[m.last()]) t = t.replace(new RegExp("([\\s\\S]*?)</" + m.last() + "[^>]*>"), function(t, r) {
            return r = r.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), e.chars && e.chars(r), 
            "";
        }), r(0, m.last()); else if (0 == t.indexOf("\x3c!--") ? 0 <= (u = t.indexOf("--\x3e")) && (e.comment && e.comment(t.substring(4, u)), 
        t = t.substring(u + 3), f = !1) : 0 == t.indexOf("</") ? (p = t.match(n)) && (t = t.substring(p[0].length), 
        p[0].replace(n, r), f = !1) : 0 == t.indexOf("<") && (p = t.match(a)) && (t = t.substring(p[0].length), 
        p[0].replace(a, function(t, a, n, h) {
            if (a = a.toLowerCase(), o[a]) for (;m.last() && c[m.last()]; ) r(0, m.last());
            if (l[a] && m.last() == a && r(0, a), (h = s[a] || !!h) || m.push(a), e.start) {
                var u = [];
                n.replace(i, function(t, e) {
                    var r = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : d[e] ? e : "";
                    u.push({
                        name: e,
                        value: r,
                        escaped: r.replace(/(^|[^\\])"/g, '$1\\"')
                    });
                }), e.start && e.start(a, u, h);
            }
        }), f = !1), f) {
            var g = (u = t.indexOf("<")) < 0 ? t : t.substring(0, u);
            t = u < 0 ? "" : t.substring(u), e.chars && e.chars(g);
        }
        if (t == v) throw "Parse Error: " + t;
        v = t;
    }
    r();
}, f = {}, p = function() {};

f.html2json = function(t) {
    t = r(t);
    var e = [], a = {
        node: "root",
        child: []
    };
    return u(t, {
        start: function(t, r, n) {
            p();
            var i = {
                node: "element",
                tag: t
            };
            if (0 !== r.length && (i.attr = r.reduce(function(t, e) {
                var r = e.name, a = e.value;
                return a.match(/ /) && (a = a.split(" ")), t[r] ? Array.isArray(t[r]) ? t[r].push(a) : t[r] = [ t[r], a ] : t[r] = a, 
                t;
            }, {})), n) {
                var s = e[0] || a;
                void 0 === s.child && (s.child = []), s.child.push(i);
            } else e.unshift(i);
        },
        end: function(t) {
            p();
            var r = e.shift();
            if (r.tag !== t && console.error("invalid state: mismatch end tag"), 0 === e.length) a.child.push(r); else {
                var n = e[0];
                void 0 === n.child && (n.child = []), n.child.push(r);
            }
        },
        chars: function(t) {
            p();
            var r = {
                node: "text",
                text: t
            };
            if (0 === e.length) a.child.push(r); else {
                var n = e[0];
                void 0 === n.child && (n.child = []), n.child.push(r);
            }
        },
        comment: function(t) {
            p();
            var r = {
                node: "comment",
                text: t
            }, a = e[0];
            void 0 === a.child && (a.child = []), a.child.push(r);
        }
    }), a;
}, f.json2html = function t(r) {
    var a = "";
    r.child && (a = r.child.map(function(e) {
        return t(e);
    }).join(""));
    var n = "";
    if (r.attr && "" !== (n = Object.keys(r.attr).map(function(t) {
        var a = r.attr[t];
        return Array.isArray(a) && (a = a.join(" ")), t + "=" + e(a);
    }).join(" ")) && (n = " " + n), "element" === r.node) {
        var i = r.tag;
        return -1 < [ "area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param", "embed" ].indexOf(i) ? "<" + r.tag + n + "/>" : "<" + r.tag + n + ">" + a + "</" + r.tag + ">";
    }
    return "text" === r.node ? r.text : "comment" === r.node ? "\x3c!--" + r.text + "--\x3e" : "root" === r.node ? a : void 0;
};

var m = function(t) {
    for (var e = [], r = [], a = 0, n = t.length; a < n; a++) if (0 == a) {
        if ("view" == t[a].type) continue;
        e.push(t[a]);
    } else if ("view" == t[a].type) {
        if (0 < e.length) {
            var i = {
                type: "view",
                child: e
            };
            r.push(i);
        }
        e = [];
    } else "img" == t[a].type ? (0 < e.length && (i = {
        type: "view",
        child: e
    }, r.push(i)), i = {
        type: "img",
        attr: t[a].attr
    }, r.push(i), e = []) : (e.push(t[a]), a == n - 1 && (i = {
        type: "view",
        child: e
    }, r.push(i)));
    return r;
}, v = function(t) {
    var e = [];
    return function t(r) {
        var a = {};
        if ("root" == r.node) ; else if ("element" == r.node) switch (r.tag) {
          case "a":
            a = {
                type: "a",
                text: r.child[0].text
            };
            break;

          case "img":
            a = {
                type: "img",
                text: r.text
            };
            break;

          case "p":
          case "div":
            a = {
                type: "view",
                text: r.text
            };
        } else "text" == r.node && (a = {
            type: "text",
            text: r.text
        });
        if (r.attr && (a.attr = r.attr), 0 != Object.keys(a).length && e.push(a), "a" != r.tag) {
            var n = r.child;
            if (n) for (var i in n) t(n[i]);
        }
    }(t), e;
};

module.exports = {
    html2json: function(t) {
        var e = f.html2json(t);
        return e = v(e), e = m(e);
    }
};