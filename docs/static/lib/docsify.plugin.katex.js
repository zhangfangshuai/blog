! function (t) {
    var e = {};

    function r(a) {
        if (e[a]) return e[a].exports;
        var n = e[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }
    r.m = t, r.c = e, r.d = function (t, e, a) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: a
        })
    }, r.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function (t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var a = Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) r.d(a, n, function (e) {
                return t[e]
            }.bind(null, n));
        return a
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 1)
}([function (t, e, r) {
            var a;
            "undefined" != typeof self && self, a = function () {
                return function (t) {
                    var e = {};

                    function r(a) {
                        if (e[a]) return e[a].exports;
                        var n = e[a] = {
                            i: a,
                            l: !1,
                            exports: {}
                        };
                        return t[a].call(n.exports, n, n.exports, r), n.l = !0, n.exports
                    }
                    return r.m = t, r.c = e, r.d = function (t, e, a) {
                        r.o(t, e) || Object.defineProperty(t, e, {
                            enumerable: !0,
                            get: a
                        })
                    }, r.r = function (t) {
                        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                            value: "Module"
                        }), Object.defineProperty(t, "__esModule", {
                            value: !0
                        })
                    }, r.t = function (t, e) {
                        if (1 & e && (t = r(t)), 8 & e) return t;
                        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                        var a = Object.create(null);
                        if (r.r(a), Object.defineProperty(a, "default", {
                                enumerable: !0,
                                value: t
                            }), 2 & e && "string" != typeof t)
                            for (var n in t) r.d(a, n, function (e) {
                                return t[e]
                            }.bind(null, n));
                        return a
                    }, r.n = function (t) {
                        var e = t && t.__esModule ? function () {
                            return t.default
                        } : function () {
                            return t
                        };
                        return r.d(e, "a", e), e
                    }, r.o = function (t, e) {
                        return Object.prototype.hasOwnProperty.call(t, e)
                    }, r.p = "", r(r.s = 1)
                }([function (t, e, r) {}, function (t, e, r) {
                    "use strict";
                    r.r(e), r(0);
                    var a = function () {
                            function t(t, e, r) {
                                this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = t, this.start = e, this.end = r
                            }
                            return t.range = function (e, r) {
                                return r ? e && e.loc && r.loc && e.loc.lexer === r.loc.lexer ? new t(e.loc.lexer, e.loc.start, r.loc.end) : null : e && e.loc
                            }, t
                        }(),
                        n = function () {
                            function t(t, e) {
                                this.text = void 0, this.loc = void 0, this.text = t, this.loc = e
                            }
                            return t.prototype.range = function (e, r) {
                                return new t(r, a.range(this, e))
                            }, t
                        }(),
                        o = function t(e, r) {
                            this.position = void 0;
                            var a, n = "KaTeX parse error: " + e,
                                o = r && r.loc;
                            if (o && o.start <= o.end) {
                                var i = o.lexer.input;
                                a = o.start;
                                var s = o.end;
                                a === i.length ? n += " at end of input: " : n += " at position " + (a + 1) + ": ";
                                var l = i.slice(a, s).replace(/[^]/g, "$&̲");
                                n += (a > 15 ? "…" + i.slice(a - 15, a) : i.slice(0, a)) + l + (s + 15 < i.length ? i.slice(s, s + 15) + "…" : i.slice(s))
                            }
                            var h = new Error(n);
                            return h.name = "ParseError", h.__proto__ = t.prototype, h.position = a, h
                        };
                    o.prototype.__proto__ = Error.prototype;
                    var i = o,
                        s = /([A-Z])/g,
                        l = {
                            "&": "&amp;",
                            ">": "&gt;",
                            "<": "&lt;",
                            '"': "&quot;",
                            "'": "&#x27;"
                        },
                        h = /[&><"']/g,
                        m = function t(e) {
                            return "ordgroup" === e.type || "color" === e.type ? 1 === e.body.length ? t(e.body[0]) : e : "font" === e.type ? t(e.body) : e
                        },
                        c = {
                            contains: function (t, e) {
                                return -1 !== t.indexOf(e)
                            },
                            deflt: function (t, e) {
                                return void 0 === t ? e : t
                            },
                            escape: function (t) {
                                return String(t).replace(h, (function (t) {
                                    return l[t]
                                }))
                            },
                            hyphenate: function (t) {
                                return t.replace(s, "-$1").toLowerCase()
                            },
                            getBaseElem: m,
                            isCharacterBox: function (t) {
                                var e = m(t);
                                return "mathord" === e.type || "textord" === e.type || "atom" === e.type
                            },
                            protocolFromUrl: function (t) {
                                var e = /^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(t);
                                return null != e ? e[1] : "_relative"
                            }
                        },
                        u = function () {
                            function t(t) {
                                this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, t = t || {}, this.displayMode = c.deflt(t.displayMode, !1), this.output = c.deflt(t.output, "htmlAndMathml"), this.leqno = c.deflt(t.leqno, !1), this.fleqn = c.deflt(t.fleqn, !1), this.throwOnError = c.deflt(t.throwOnError, !0), this.errorColor = c.deflt(t.errorColor, "#cc0000"), this.macros = t.macros || {}, this.minRuleThickness = Math.max(0, c.deflt(t.minRuleThickness, 0)), this.colorIsTextColor = c.deflt(t.colorIsTextColor, !1), this.strict = c.deflt(t.strict, "warn"), this.trust = c.deflt(t.trust, !1), this.maxSize = Math.max(0, c.deflt(t.maxSize, 1 / 0)), this.maxExpand = Math.max(0, c.deflt(t.maxExpand, 1e3))
                            }
                            var e = t.prototype;
                            return e.reportNonstrict = function (t, e, r) {
                                var a = this.strict;
                                if ("function" == typeof a && (a = a(t, e, r)), a && "ignore" !== a) {
                                    if (!0 === a || "error" === a) throw new i("LaTeX-incompatible input and strict mode is set to 'error': " + e + " [" + t + "]", r);
                                    "warn" === a ? "undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + e + " [" + t + "]") : "undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '" + a + "': " + e + " [" + t + "]")
                                }
                            }, e.useStrictBehavior = function (t, e, r) {
                                var a = this.strict;
                                if ("function" == typeof a) try {
                                    a = a(t, e, r)
                                } catch (t) {
                                    a = "error"
                                }
                                return !(!a || "ignore" === a || !0 !== a && "error" !== a && ("warn" === a ? ("undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + e + " [" + t + "]"), 1) : ("undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '" + a + "': " + e + " [" + t + "]"), 1)))
                            }, e.isTrusted = function (t) {
                                t.url && !t.protocol && (t.protocol = c.protocolFromUrl(t.url));
                                var e = "function" == typeof this.trust ? this.trust(t) : this.trust;
                                return Boolean(e)
                            }, t
                        }(),
                        p = function () {
                            function t(t, e, r) {
                                this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = t, this.size = e, this.cramped = r
                            }
                            var e = t.prototype;
                            return e.sup = function () {
                                return d[f[this.id]]
                            }, e.sub = function () {
                                return d[g[this.id]]
                            }, e.fracNum = function () {
                                return d[x[this.id]]
                            }, e.fracDen = function () {
                                return d[v[this.id]]
                            }, e.cramp = function () {
                                return d[b[this.id]]
                            }, e.text = function () {
                                return d[y[this.id]]
                            }, e.isTight = function () {
                                return this.size >= 2
                            }, t
                        }(),
                        d = [new p(0, 0, !1), new p(1, 0, !0), new p(2, 1, !1), new p(3, 1, !0), new p(4, 2, !1), new p(5, 2, !0), new p(6, 3, !1), new p(7, 3, !0)],
                        f = [4, 5, 4, 5, 6, 7, 6, 7],
                        g = [5, 5, 5, 5, 7, 7, 7, 7],
                        x = [2, 3, 4, 5, 6, 7, 6, 7],
                        v = [3, 3, 5, 5, 7, 7, 7, 7],
                        b = [1, 1, 3, 3, 5, 5, 7, 7],
                        y = [0, 1, 2, 3, 2, 3, 2, 3],
                        w = {
                            DISPLAY: d[0],
                            TEXT: d[2],
                            SCRIPT: d[4],
                            SCRIPTSCRIPT: d[6]
                        },
                        k = [{
                            name: "latin",
                            blocks: [
                                [256, 591],
                                [768, 879]
                            ]
                        }, {
                            name: "cyrillic",
                            blocks: [
                                [1024, 1279]
                            ]
                        }, {
                            name: "brahmic",
                            blocks: [
                                [2304, 4255]
                            ]
                        }, {
                            name: "georgian",
                            blocks: [
                                [4256, 4351]
                            ]
                        }, {
                            name: "cjk",
                            blocks: [
                                [12288, 12543],
                                [19968, 40879],
                                [65280, 65376]
                            ]
                        }, {
                            name: "hangul",
                            blocks: [
                                [44032, 55215]
                            ]
                        }],
                        S = [];

                    function z(t) {
                        for (var e = 0; e < S.length; e += 2)
                            if (t >= S[e] && t <= S[e + 1]) return !0;
                        return !1
                    }
                    k.forEach((function (t) {
                        return t.blocks.forEach((function (t) {
                            return S.push.apply(S, t)
                        }))
                    }));
                    var M = {
                            doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
                            doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
                            leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
                            leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
                            leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
                            leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
                            leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
                            leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
                            leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
                            leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
                            leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
                            lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
                            leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
                            leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
                            leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
                            longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
                            midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
                            midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
                            oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
                            oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
                            oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
                            oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
                            rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
                            rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
                            rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
                            rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
                            rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
                            rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
                            rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
                            rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
                            rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
                            righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
                            rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
                            rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
                            twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
                            twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
                            tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
                            tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
                            tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
                            tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
                            vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
                            widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
                            widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                            widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                            widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
                            widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
                            widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                            widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                            widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
                            baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
                            rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
                            baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
                            rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
                            shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
                            shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
                        },
                        _ = function () {
                            function t(t) {
                                this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = t, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {}
                            }
                            var e = t.prototype;
                            return e.hasClass = function (t) {
                                return c.contains(this.classes, t)
                            }, e.toNode = function () {
                                for (var t = document.createDocumentFragment(), e = 0; e < this.children.length; e++) t.appendChild(this.children[e].toNode());
                                return t
                            }, e.toMarkup = function () {
                                for (var t = "", e = 0; e < this.children.length; e++) t += this.children[e].toMarkup();
                                return t
                            }, e.toText = function () {
                                var t = function (t) {
                                    return t.toText()
                                };
                                return this.children.map(t).join("")
                            }, t
                        }(),
                        A = function (t) {
                            return t.filter((function (t) {
                                return t
                            })).join(" ")
                        },
                        T = function (t, e, r) {
                            if (this.classes = t || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = r || {}, e) {
                                e.style.isTight() && this.classes.push("mtight");
                                var a = e.getColor();
                                a && (this.style.color = a)
                            }
                        },
                        q = function (t) {
                            var e = document.createElement(t);
                            for (var r in e.className = A(this.classes), this.style) this.style.hasOwnProperty(r) && (e.style[r] = this.style[r]);
                            for (var a in this.attributes) this.attributes.hasOwnProperty(a) && e.setAttribute(a, this.attributes[a]);
                            for (var n = 0; n < this.children.length; n++) e.appendChild(this.children[n].toNode());
                            return e
                        },
                        B = function (t) {
                            var e = "<" + t;
                            this.classes.length && (e += ' class="' + c.escape(A(this.classes)) + '"');
                            var r = "";
                            for (var a in this.style) this.style.hasOwnProperty(a) && (r += c.hyphenate(a) + ":" + this.style[a] + ";");
                            for (var n in r && (e += ' style="' + c.escape(r) + '"'), this.attributes) this.attributes.hasOwnProperty(n) && (e += " " + n + '="' + c.escape(this.attributes[n]) + '"');
                            e += ">";
                            for (var o = 0; o < this.children.length; o++) e += this.children[o].toMarkup();
                            return e += "</" + t + ">"
                        },
                        C = function () {
                            function t(t, e, r, a) {
                                this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, T.call(this, t, r, a), this.children = e || []
                            }
                            var e = t.prototype;
                            return e.setAttribute = function (t, e) {
                                this.attributes[t] = e
                            }, e.hasClass = function (t) {
                                return c.contains(this.classes, t)
                            }, e.toNode = function () {
                                return q.call(this, "span")
                            }, e.toMarkup = function () {
                                return B.call(this, "span")
                            }, t
                        }(),
                        N = function () {
                            function t(t, e, r, a) {
                                this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, T.call(this, e, a), this.children = r || [], this.setAttribute("href", t)
                            }
                            var e = t.prototype;
                            return e.setAttribute = function (t, e) {
                                this.attributes[t] = e
                            }, e.hasClass = function (t) {
                                return c.contains(this.classes, t)
                            }, e.toNode = function () {
                                return q.call(this, "a")
                            }, e.toMarkup = function () {
                                return B.call(this, "a")
                            }, t
                        }(),
                        O = function () {
                            function t(t, e, r) {
                                this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = e, this.src = t, this.classes = ["mord"], this.style = r
                            }
                            var e = t.prototype;
                            return e.hasClass = function (t) {
                                return c.contains(this.classes, t)
                            }, e.toNode = function () {
                                var t = document.createElement("img");
                                for (var e in t.src = this.src, t.alt = this.alt, t.className = "mord", this.style) this.style.hasOwnProperty(e) && (t.style[e] = this.style[e]);
                                return t
                            }, e.toMarkup = function () {
                                var t = "<img  src='" + this.src + " 'alt='" + this.alt + "' ",
                                    e = "";
                                for (var r in this.style) this.style.hasOwnProperty(r) && (e += c.hyphenate(r) + ":" + this.style[r] + ";");
                                return e && (t += ' style="' + c.escape(e) + '"'), t += "'/>"
                            }, t
                        }(),
                        I = {
                            "î": "ı̂",
                            "ï": "ı̈",
                            "í": "ı́",
                            "ì": "ı̀"
                        },
                        $ = function () {
                            function t(t, e, r, a, n, o, i, s) {
                                this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = t, this.height = e || 0, this.depth = r || 0, this.italic = a || 0, this.skew = n || 0, this.width = o || 0, this.classes = i || [], this.style = s || {}, this.maxFontSize = 0;
                                var l = function (t) {
                                    for (var e = 0; e < k.length; e++)
                                        for (var r = k[e], a = 0; a < r.blocks.length; a++) {
                                            var n = r.blocks[a];
                                            if (t >= n[0] && t <= n[1]) return r.name
                                        }
                                    return null
                                }(this.text.charCodeAt(0));
                                l && this.classes.push(l + "_fallback"), /[îïíì]/.test(this.text) && (this.text = I[this.text])
                            }
                            var e = t.prototype;
                            return e.hasClass = function (t) {
                                return c.contains(this.classes, t)
                            }, e.toNode = function () {
                                var t = document.createTextNode(this.text),
                                    e = null;
                                for (var r in this.italic > 0 && ((e = document.createElement("span")).style.marginRight = this.italic + "em"), this.classes.length > 0 && ((e = e || document.createElement("span")).className = A(this.classes)), this.style) this.style.hasOwnProperty(r) && ((e = e || document.createElement("span")).style[r] = this.style[r]);
                                return e ? (e.appendChild(t), e) : t
                            }, e.toMarkup = function () {
                                var t = !1,
                                    e = "<span";
                                this.classes.length && (t = !0, e += ' class="', e += c.escape(A(this.classes)), e += '"');
                                var r = "";
                                for (var a in this.italic > 0 && (r += "margin-right:" + this.italic + "em;"), this.style) this.style.hasOwnProperty(a) && (r += c.hyphenate(a) + ":" + this.style[a] + ";");
                                r && (t = !0, e += ' style="' + c.escape(r) + '"');
                                var n = c.escape(this.text);
                                return t ? (e += ">", e += n, e += "</span>") : n
                            }, t
                        }(),
                        E = function () {
                            function t(t, e) {
                                this.children = void 0, this.attributes = void 0, this.children = t || [], this.attributes = e || {}
                            }
                            var e = t.prototype;
                            return e.toNode = function () {
                                var t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                for (var e in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e) && t.setAttribute(e, this.attributes[e]);
                                for (var r = 0; r < this.children.length; r++) t.appendChild(this.children[r].toNode());
                                return t
                            }, e.toMarkup = function () {
                                var t = "<svg";
                                for (var e in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e) && (t += " " + e + "='" + this.attributes[e] + "'");
                                t += ">";
                                for (var r = 0; r < this.children.length; r++) t += this.children[r].toMarkup();
                                return t += "</svg>"
                            }, t
                        }(),
                        R = function () {
                            function t(t, e) {
                                this.pathName = void 0, this.alternate = void 0, this.pathName = t, this.alternate = e
                            }
                            var e = t.prototype;
                            return e.toNode = function () {
                                var t = document.createElementNS("http://www.w3.org/2000/svg", "path");
                                return this.alternate ? t.setAttribute("d", this.alternate) : t.setAttribute("d", M[this.pathName]), t
                            }, e.toMarkup = function () {
                                return this.alternate ? "<path d='" + this.alternate + "'/>" : "<path d='" + M[this.pathName] + "'/>"
                            }, t
                        }(),
                        D = function () {
                            function t(t) {
                                this.attributes = void 0, this.attributes = t || {}
                            }
                            var e = t.prototype;
                            return e.toNode = function () {
                                var t = document.createElementNS("http://www.w3.org/2000/svg", "line");
                                for (var e in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e) && t.setAttribute(e, this.attributes[e]);
                                return t
                            }, e.toMarkup = function () {
                                var t = "<line";
                                for (var e in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e) && (t += " " + e + "='" + this.attributes[e] + "'");
                                return t += "/>"
                            }, t
                        }();

                    function L(t) {
                        if (t instanceof $) return t;
                        throw new Error("Expected symbolNode but got " + String(t) + ".")
                    }
                    var P = {
                            "AMS-Regular": {
                                65: [0, .68889, 0, 0, .72222],
                                66: [0, .68889, 0, 0, .66667],
                                67: [0, .68889, 0, 0, .72222],
                                68: [0, .68889, 0, 0, .72222],
                                69: [0, .68889, 0, 0, .66667],
                                70: [0, .68889, 0, 0, .61111],
                                71: [0, .68889, 0, 0, .77778],
                                72: [0, .68889, 0, 0, .77778],
                                73: [0, .68889, 0, 0, .38889],
                                74: [.16667, .68889, 0, 0, .5],
                                75: [0, .68889, 0, 0, .77778],
                                76: [0, .68889, 0, 0, .66667],
                                77: [0, .68889, 0, 0, .94445],
                                78: [0, .68889, 0, 0, .72222],
                                79: [.16667, .68889, 0, 0, .77778],
                                80: [0, .68889, 0, 0, .61111],
                                81: [.16667, .68889, 0, 0, .77778],
                                82: [0, .68889, 0, 0, .72222],
                                83: [0, .68889, 0, 0, .55556],
                                84: [0, .68889, 0, 0, .66667],
                                85: [0, .68889, 0, 0, .72222],
                                86: [0, .68889, 0, 0, .72222],
                                87: [0, .68889, 0, 0, 1],
                                88: [0, .68889, 0, 0, .72222],
                                89: [0, .68889, 0, 0, .72222],
                                90: [0, .68889, 0, 0, .66667],
                                107: [0, .68889, 0, 0, .55556],
                                165: [0, .675, .025, 0, .75],
                                174: [.15559, .69224, 0, 0, .94666],
                                240: [0, .68889, 0, 0, .55556],
                                295: [0, .68889, 0, 0, .54028],
                                710: [0, .825, 0, 0, 2.33334],
                                732: [0, .9, 0, 0, 2.33334],
                                770: [0, .825, 0, 0, 2.33334],
                                771: [0, .9, 0, 0, 2.33334],
                                989: [.08167, .58167, 0, 0, .77778],
                                1008: [0, .43056, .04028, 0, .66667],
                                8245: [0, .54986, 0, 0, .275],
                                8463: [0, .68889, 0, 0, .54028],
                                8487: [0, .68889, 0, 0, .72222],
                                8498: [0, .68889, 0, 0, .55556],
                                8502: [0, .68889, 0, 0, .66667],
                                8503: [0, .68889, 0, 0, .44445],
                                8504: [0, .68889, 0, 0, .66667],
                                8513: [0, .68889, 0, 0, .63889],
                                8592: [-.03598, .46402, 0, 0, .5],
                                8594: [-.03598, .46402, 0, 0, .5],
                                8602: [-.13313, .36687, 0, 0, 1],
                                8603: [-.13313, .36687, 0, 0, 1],
                                8606: [.01354, .52239, 0, 0, 1],
                                8608: [.01354, .52239, 0, 0, 1],
                                8610: [.01354, .52239, 0, 0, 1.11111],
                                8611: [.01354, .52239, 0, 0, 1.11111],
                                8619: [0, .54986, 0, 0, 1],
                                8620: [0, .54986, 0, 0, 1],
                                8621: [-.13313, .37788, 0, 0, 1.38889],
                                8622: [-.13313, .36687, 0, 0, 1],
                                8624: [0, .69224, 0, 0, .5],
                                8625: [0, .69224, 0, 0, .5],
                                8630: [0, .43056, 0, 0, 1],
                                8631: [0, .43056, 0, 0, 1],
                                8634: [.08198, .58198, 0, 0, .77778],
                                8635: [.08198, .58198, 0, 0, .77778],
                                8638: [.19444, .69224, 0, 0, .41667],
                                8639: [.19444, .69224, 0, 0, .41667],
                                8642: [.19444, .69224, 0, 0, .41667],
                                8643: [.19444, .69224, 0, 0, .41667],
                                8644: [.1808, .675, 0, 0, 1],
                                8646: [.1808, .675, 0, 0, 1],
                                8647: [.1808, .675, 0, 0, 1],
                                8648: [.19444, .69224, 0, 0, .83334],
                                8649: [.1808, .675, 0, 0, 1],
                                8650: [.19444, .69224, 0, 0, .83334],
                                8651: [.01354, .52239, 0, 0, 1],
                                8652: [.01354, .52239, 0, 0, 1],
                                8653: [-.13313, .36687, 0, 0, 1],
                                8654: [-.13313, .36687, 0, 0, 1],
                                8655: [-.13313, .36687, 0, 0, 1],
                                8666: [.13667, .63667, 0, 0, 1],
                                8667: [.13667, .63667, 0, 0, 1],
                                8669: [-.13313, .37788, 0, 0, 1],
                                8672: [-.064, .437, 0, 0, 1.334],
                                8674: [-.064, .437, 0, 0, 1.334],
                                8705: [0, .825, 0, 0, .5],
                                8708: [0, .68889, 0, 0, .55556],
                                8709: [.08167, .58167, 0, 0, .77778],
                                8717: [0, .43056, 0, 0, .42917],
                                8722: [-.03598, .46402, 0, 0, .5],
                                8724: [.08198, .69224, 0, 0, .77778],
                                8726: [.08167, .58167, 0, 0, .77778],
                                8733: [0, .69224, 0, 0, .77778],
                                8736: [0, .69224, 0, 0, .72222],
                                8737: [0, .69224, 0, 0, .72222],
                                8738: [.03517, .52239, 0, 0, .72222],
                                8739: [.08167, .58167, 0, 0, .22222],
                                8740: [.25142, .74111, 0, 0, .27778],
                                8741: [.08167, .58167, 0, 0, .38889],
                                8742: [.25142, .74111, 0, 0, .5],
                                8756: [0, .69224, 0, 0, .66667],
                                8757: [0, .69224, 0, 0, .66667],
                                8764: [-.13313, .36687, 0, 0, .77778],
                                8765: [-.13313, .37788, 0, 0, .77778],
                                8769: [-.13313, .36687, 0, 0, .77778],
                                8770: [-.03625, .46375, 0, 0, .77778],
                                8774: [.30274, .79383, 0, 0, .77778],
                                8776: [-.01688, .48312, 0, 0, .77778],
                                8778: [.08167, .58167, 0, 0, .77778],
                                8782: [.06062, .54986, 0, 0, .77778],
                                8783: [.06062, .54986, 0, 0, .77778],
                                8785: [.08198, .58198, 0, 0, .77778],
                                8786: [.08198, .58198, 0, 0, .77778],
                                8787: [.08198, .58198, 0, 0, .77778],
                                8790: [0, .69224, 0, 0, .77778],
                                8791: [.22958, .72958, 0, 0, .77778],
                                8796: [.08198, .91667, 0, 0, .77778],
                                8806: [.25583, .75583, 0, 0, .77778],
                                8807: [.25583, .75583, 0, 0, .77778],
                                8808: [.25142, .75726, 0, 0, .77778],
                                8809: [.25142, .75726, 0, 0, .77778],
                                8812: [.25583, .75583, 0, 0, .5],
                                8814: [.20576, .70576, 0, 0, .77778],
                                8815: [.20576, .70576, 0, 0, .77778],
                                8816: [.30274, .79383, 0, 0, .77778],
                                8817: [.30274, .79383, 0, 0, .77778],
                                8818: [.22958, .72958, 0, 0, .77778],
                                8819: [.22958, .72958, 0, 0, .77778],
                                8822: [.1808, .675, 0, 0, .77778],
                                8823: [.1808, .675, 0, 0, .77778],
                                8828: [.13667, .63667, 0, 0, .77778],
                                8829: [.13667, .63667, 0, 0, .77778],
                                8830: [.22958, .72958, 0, 0, .77778],
                                8831: [.22958, .72958, 0, 0, .77778],
                                8832: [.20576, .70576, 0, 0, .77778],
                                8833: [.20576, .70576, 0, 0, .77778],
                                8840: [.30274, .79383, 0, 0, .77778],
                                8841: [.30274, .79383, 0, 0, .77778],
                                8842: [.13597, .63597, 0, 0, .77778],
                                8843: [.13597, .63597, 0, 0, .77778],
                                8847: [.03517, .54986, 0, 0, .77778],
                                8848: [.03517, .54986, 0, 0, .77778],
                                8858: [.08198, .58198, 0, 0, .77778],
                                8859: [.08198, .58198, 0, 0, .77778],
                                8861: [.08198, .58198, 0, 0, .77778],
                                8862: [0, .675, 0, 0, .77778],
                                8863: [0, .675, 0, 0, .77778],
                                8864: [0, .675, 0, 0, .77778],
                                8865: [0, .675, 0, 0, .77778],
                                8872: [0, .69224, 0, 0, .61111],
                                8873: [0, .69224, 0, 0, .72222],
                                8874: [0, .69224, 0, 0, .88889],
                                8876: [0, .68889, 0, 0, .61111],
                                8877: [0, .68889, 0, 0, .61111],
                                8878: [0, .68889, 0, 0, .72222],
                                8879: [0, .68889, 0, 0, .72222],
                                8882: [.03517, .54986, 0, 0, .77778],
                                8883: [.03517, .54986, 0, 0, .77778],
                                8884: [.13667, .63667, 0, 0, .77778],
                                8885: [.13667, .63667, 0, 0, .77778],
                                8888: [0, .54986, 0, 0, 1.11111],
                                8890: [.19444, .43056, 0, 0, .55556],
                                8891: [.19444, .69224, 0, 0, .61111],
                                8892: [.19444, .69224, 0, 0, .61111],
                                8901: [0, .54986, 0, 0, .27778],
                                8903: [.08167, .58167, 0, 0, .77778],
                                8905: [.08167, .58167, 0, 0, .77778],
                                8906: [.08167, .58167, 0, 0, .77778],
                                8907: [0, .69224, 0, 0, .77778],
                                8908: [0, .69224, 0, 0, .77778],
                                8909: [-.03598, .46402, 0, 0, .77778],
                                8910: [0, .54986, 0, 0, .76042],
                                8911: [0, .54986, 0, 0, .76042],
                                8912: [.03517, .54986, 0, 0, .77778],
                                8913: [.03517, .54986, 0, 0, .77778],
                                8914: [0, .54986, 0, 0, .66667],
                                8915: [0, .54986, 0, 0, .66667],
                                8916: [0, .69224, 0, 0, .66667],
                                8918: [.0391, .5391, 0, 0, .77778],
                                8919: [.0391, .5391, 0, 0, .77778],
                                8920: [.03517, .54986, 0, 0, 1.33334],
                                8921: [.03517, .54986, 0, 0, 1.33334],
                                8922: [.38569, .88569, 0, 0, .77778],
                                8923: [.38569, .88569, 0, 0, .77778],
                                8926: [.13667, .63667, 0, 0, .77778],
                                8927: [.13667, .63667, 0, 0, .77778],
                                8928: [.30274, .79383, 0, 0, .77778],
                                8929: [.30274, .79383, 0, 0, .77778],
                                8934: [.23222, .74111, 0, 0, .77778],
                                8935: [.23222, .74111, 0, 0, .77778],
                                8936: [.23222, .74111, 0, 0, .77778],
                                8937: [.23222, .74111, 0, 0, .77778],
                                8938: [.20576, .70576, 0, 0, .77778],
                                8939: [.20576, .70576, 0, 0, .77778],
                                8940: [.30274, .79383, 0, 0, .77778],
                                8941: [.30274, .79383, 0, 0, .77778],
                                8994: [.19444, .69224, 0, 0, .77778],
                                8995: [.19444, .69224, 0, 0, .77778],
                                9416: [.15559, .69224, 0, 0, .90222],
                                9484: [0, .69224, 0, 0, .5],
                                9488: [0, .69224, 0, 0, .5],
                                9492: [0, .37788, 0, 0, .5],
                                9496: [0, .37788, 0, 0, .5],
                                9585: [.19444, .68889, 0, 0, .88889],
                                9586: [.19444, .74111, 0, 0, .88889],
                                9632: [0, .675, 0, 0, .77778],
                                9633: [0, .675, 0, 0, .77778],
                                9650: [0, .54986, 0, 0, .72222],
                                9651: [0, .54986, 0, 0, .72222],
                                9654: [.03517, .54986, 0, 0, .77778],
                                9660: [0, .54986, 0, 0, .72222],
                                9661: [0, .54986, 0, 0, .72222],
                                9664: [.03517, .54986, 0, 0, .77778],
                                9674: [.11111, .69224, 0, 0, .66667],
                                9733: [.19444, .69224, 0, 0, .94445],
                                10003: [0, .69224, 0, 0, .83334],
                                10016: [0, .69224, 0, 0, .83334],
                                10731: [.11111, .69224, 0, 0, .66667],
                                10846: [.19444, .75583, 0, 0, .61111],
                                10877: [.13667, .63667, 0, 0, .77778],
                                10878: [.13667, .63667, 0, 0, .77778],
                                10885: [.25583, .75583, 0, 0, .77778],
                                10886: [.25583, .75583, 0, 0, .77778],
                                10887: [.13597, .63597, 0, 0, .77778],
                                10888: [.13597, .63597, 0, 0, .77778],
                                10889: [.26167, .75726, 0, 0, .77778],
                                10890: [.26167, .75726, 0, 0, .77778],
                                10891: [.48256, .98256, 0, 0, .77778],
                                10892: [.48256, .98256, 0, 0, .77778],
                                10901: [.13667, .63667, 0, 0, .77778],
                                10902: [.13667, .63667, 0, 0, .77778],
                                10933: [.25142, .75726, 0, 0, .77778],
                                10934: [.25142, .75726, 0, 0, .77778],
                                10935: [.26167, .75726, 0, 0, .77778],
                                10936: [.26167, .75726, 0, 0, .77778],
                                10937: [.26167, .75726, 0, 0, .77778],
                                10938: [.26167, .75726, 0, 0, .77778],
                                10949: [.25583, .75583, 0, 0, .77778],
                                10950: [.25583, .75583, 0, 0, .77778],
                                10955: [.28481, .79383, 0, 0, .77778],
                                10956: [.28481, .79383, 0, 0, .77778],
                                57350: [.08167, .58167, 0, 0, .22222],
                                57351: [.08167, .58167, 0, 0, .38889],
                                57352: [.08167, .58167, 0, 0, .77778],
                                57353: [0, .43056, .04028, 0, .66667],
                                57356: [.25142, .75726, 0, 0, .77778],
                                57357: [.25142, .75726, 0, 0, .77778],
                                57358: [.41951, .91951, 0, 0, .77778],
                                57359: [.30274, .79383, 0, 0, .77778],
                                57360: [.30274, .79383, 0, 0, .77778],
                                57361: [.41951, .91951, 0, 0, .77778],
                                57366: [.25142, .75726, 0, 0, .77778],
                                57367: [.25142, .75726, 0, 0, .77778],
                                57368: [.25142, .75726, 0, 0, .77778],
                                57369: [.25142, .75726, 0, 0, .77778],
                                57370: [.13597, .63597, 0, 0, .77778],
                                57371: [.13597, .63597, 0, 0, .77778]
                            },
                            "Caligraphic-Regular": {
                                48: [0, .43056, 0, 0, .5],
                                49: [0, .43056, 0, 0, .5],
                                50: [0, .43056, 0, 0, .5],
                                51: [.19444, .43056, 0, 0, .5],
                                52: [.19444, .43056, 0, 0, .5],
                                53: [.19444, .43056, 0, 0, .5],
                                54: [0, .64444, 0, 0, .5],
                                55: [.19444, .43056, 0, 0, .5],
                                56: [0, .64444, 0, 0, .5],
                                57: [.19444, .43056, 0, 0, .5],
                                65: [0, .68333, 0, .19445, .79847],
                                66: [0, .68333, .03041, .13889, .65681],
                                67: [0, .68333, .05834, .13889, .52653],
                                68: [0, .68333, .02778, .08334, .77139],
                                69: [0, .68333, .08944, .11111, .52778],
                                70: [0, .68333, .09931, .11111, .71875],
                                71: [.09722, .68333, .0593, .11111, .59487],
                                72: [0, .68333, .00965, .11111, .84452],
                                73: [0, .68333, .07382, 0, .54452],
                                74: [.09722, .68333, .18472, .16667, .67778],
                                75: [0, .68333, .01445, .05556, .76195],
                                76: [0, .68333, 0, .13889, .68972],
                                77: [0, .68333, 0, .13889, 1.2009],
                                78: [0, .68333, .14736, .08334, .82049],
                                79: [0, .68333, .02778, .11111, .79611],
                                80: [0, .68333, .08222, .08334, .69556],
                                81: [.09722, .68333, 0, .11111, .81667],
                                82: [0, .68333, 0, .08334, .8475],
                                83: [0, .68333, .075, .13889, .60556],
                                84: [0, .68333, .25417, 0, .54464],
                                85: [0, .68333, .09931, .08334, .62583],
                                86: [0, .68333, .08222, 0, .61278],
                                87: [0, .68333, .08222, .08334, .98778],
                                88: [0, .68333, .14643, .13889, .7133],
                                89: [.09722, .68333, .08222, .08334, .66834],
                                90: [0, .68333, .07944, .13889, .72473]
                            },
                            "Fraktur-Regular": {
                                33: [0, .69141, 0, 0, .29574],
                                34: [0, .69141, 0, 0, .21471],
                                38: [0, .69141, 0, 0, .73786],
                                39: [0, .69141, 0, 0, .21201],
                                40: [.24982, .74947, 0, 0, .38865],
                                41: [.24982, .74947, 0, 0, .38865],
                                42: [0, .62119, 0, 0, .27764],
                                43: [.08319, .58283, 0, 0, .75623],
                                44: [0, .10803, 0, 0, .27764],
                                45: [.08319, .58283, 0, 0, .75623],
                                46: [0, .10803, 0, 0, .27764],
                                47: [.24982, .74947, 0, 0, .50181],
                                48: [0, .47534, 0, 0, .50181],
                                49: [0, .47534, 0, 0, .50181],
                                50: [0, .47534, 0, 0, .50181],
                                51: [.18906, .47534, 0, 0, .50181],
                                52: [.18906, .47534, 0, 0, .50181],
                                53: [.18906, .47534, 0, 0, .50181],
                                54: [0, .69141, 0, 0, .50181],
                                55: [.18906, .47534, 0, 0, .50181],
                                56: [0, .69141, 0, 0, .50181],
                                57: [.18906, .47534, 0, 0, .50181],
                                58: [0, .47534, 0, 0, .21606],
                                59: [.12604, .47534, 0, 0, .21606],
                                61: [-.13099, .36866, 0, 0, .75623],
                                63: [0, .69141, 0, 0, .36245],
                                65: [0, .69141, 0, 0, .7176],
                                66: [0, .69141, 0, 0, .88397],
                                67: [0, .69141, 0, 0, .61254],
                                68: [0, .69141, 0, 0, .83158],
                                69: [0, .69141, 0, 0, .66278],
                                70: [.12604, .69141, 0, 0, .61119],
                                71: [0, .69141, 0, 0, .78539],
                                72: [.06302, .69141, 0, 0, .7203],
                                73: [0, .69141, 0, 0, .55448],
                                74: [.12604, .69141, 0, 0, .55231],
                                75: [0, .69141, 0, 0, .66845],
                                76: [0, .69141, 0, 0, .66602],
                                77: [0, .69141, 0, 0, 1.04953],
                                78: [0, .69141, 0, 0, .83212],
                                79: [0, .69141, 0, 0, .82699],
                                80: [.18906, .69141, 0, 0, .82753],
                                81: [.03781, .69141, 0, 0, .82699],
                                82: [0, .69141, 0, 0, .82807],
                                83: [0, .69141, 0, 0, .82861],
                                84: [0, .69141, 0, 0, .66899],
                                85: [0, .69141, 0, 0, .64576],
                                86: [0, .69141, 0, 0, .83131],
                                87: [0, .69141, 0, 0, 1.04602],
                                88: [0, .69141, 0, 0, .71922],
                                89: [.18906, .69141, 0, 0, .83293],
                                90: [.12604, .69141, 0, 0, .60201],
                                91: [.24982, .74947, 0, 0, .27764],
                                93: [.24982, .74947, 0, 0, .27764],
                                94: [0, .69141, 0, 0, .49965],
                                97: [0, .47534, 0, 0, .50046],
                                98: [0, .69141, 0, 0, .51315],
                                99: [0, .47534, 0, 0, .38946],
                                100: [0, .62119, 0, 0, .49857],
                                101: [0, .47534, 0, 0, .40053],
                                102: [.18906, .69141, 0, 0, .32626],
                                103: [.18906, .47534, 0, 0, .5037],
                                104: [.18906, .69141, 0, 0, .52126],
                                105: [0, .69141, 0, 0, .27899],
                                106: [0, .69141, 0, 0, .28088],
                                107: [0, .69141, 0, 0, .38946],
                                108: [0, .69141, 0, 0, .27953],
                                109: [0, .47534, 0, 0, .76676],
                                110: [0, .47534, 0, 0, .52666],
                                111: [0, .47534, 0, 0, .48885],
                                112: [.18906, .52396, 0, 0, .50046],
                                113: [.18906, .47534, 0, 0, .48912],
                                114: [0, .47534, 0, 0, .38919],
                                115: [0, .47534, 0, 0, .44266],
                                116: [0, .62119, 0, 0, .33301],
                                117: [0, .47534, 0, 0, .5172],
                                118: [0, .52396, 0, 0, .5118],
                                119: [0, .52396, 0, 0, .77351],
                                120: [.18906, .47534, 0, 0, .38865],
                                121: [.18906, .47534, 0, 0, .49884],
                                122: [.18906, .47534, 0, 0, .39054],
                                8216: [0, .69141, 0, 0, .21471],
                                8217: [0, .69141, 0, 0, .21471],
                                58112: [0, .62119, 0, 0, .49749],
                                58113: [0, .62119, 0, 0, .4983],
                                58114: [.18906, .69141, 0, 0, .33328],
                                58115: [.18906, .69141, 0, 0, .32923],
                                58116: [.18906, .47534, 0, 0, .50343],
                                58117: [0, .69141, 0, 0, .33301],
                                58118: [0, .62119, 0, 0, .33409],
                                58119: [0, .47534, 0, 0, .50073]
                            },
                            "Main-Bold": {
                                33: [0, .69444, 0, 0, .35],
                                34: [0, .69444, 0, 0, .60278],
                                35: [.19444, .69444, 0, 0, .95833],
                                36: [.05556, .75, 0, 0, .575],
                                37: [.05556, .75, 0, 0, .95833],
                                38: [0, .69444, 0, 0, .89444],
                                39: [0, .69444, 0, 0, .31944],
                                40: [.25, .75, 0, 0, .44722],
                                41: [.25, .75, 0, 0, .44722],
                                42: [0, .75, 0, 0, .575],
                                43: [.13333, .63333, 0, 0, .89444],
                                44: [.19444, .15556, 0, 0, .31944],
                                45: [0, .44444, 0, 0, .38333],
                                46: [0, .15556, 0, 0, .31944],
                                47: [.25, .75, 0, 0, .575],
                                48: [0, .64444, 0, 0, .575],
                                49: [0, .64444, 0, 0, .575],
                                50: [0, .64444, 0, 0, .575],
                                51: [0, .64444, 0, 0, .575],
                                52: [0, .64444, 0, 0, .575],
                                53: [0, .64444, 0, 0, .575],
                                54: [0, .64444, 0, 0, .575],
                                55: [0, .64444, 0, 0, .575],
                                56: [0, .64444, 0, 0, .575],
                                57: [0, .64444, 0, 0, .575],
                                58: [0, .44444, 0, 0, .31944],
                                59: [.19444, .44444, 0, 0, .31944],
                                60: [.08556, .58556, 0, 0, .89444],
                                61: [-.10889, .39111, 0, 0, .89444],
                                62: [.08556, .58556, 0, 0, .89444],
                                63: [0, .69444, 0, 0, .54305],
                                64: [0, .69444, 0, 0, .89444],
                                65: [0, .68611, 0, 0, .86944],
                                66: [0, .68611, 0, 0, .81805],
                                67: [0, .68611, 0, 0, .83055],
                                68: [0, .68611, 0, 0, .88194],
                                69: [0, .68611, 0, 0, .75555],
                                70: [0, .68611, 0, 0, .72361],
                                71: [0, .68611, 0, 0, .90416],
                                72: [0, .68611, 0, 0, .9],
                                73: [0, .68611, 0, 0, .43611],
                                74: [0, .68611, 0, 0, .59444],
                                75: [0, .68611, 0, 0, .90138],
                                76: [0, .68611, 0, 0, .69166],
                                77: [0, .68611, 0, 0, 1.09166],
                                78: [0, .68611, 0, 0, .9],
                                79: [0, .68611, 0, 0, .86388],
                                80: [0, .68611, 0, 0, .78611],
                                81: [.19444, .68611, 0, 0, .86388],
                                82: [0, .68611, 0, 0, .8625],
                                83: [0, .68611, 0, 0, .63889],
                                84: [0, .68611, 0, 0, .8],
                                85: [0, .68611, 0, 0, .88472],
                                86: [0, .68611, .01597, 0, .86944],
                                87: [0, .68611, .01597, 0, 1.18888],
                                88: [0, .68611, 0, 0, .86944],
                                89: [0, .68611, .02875, 0, .86944],
                                90: [0, .68611, 0, 0, .70277],
                                91: [.25, .75, 0, 0, .31944],
                                92: [.25, .75, 0, 0, .575],
                                93: [.25, .75, 0, 0, .31944],
                                94: [0, .69444, 0, 0, .575],
                                95: [.31, .13444, .03194, 0, .575],
                                97: [0, .44444, 0, 0, .55902],
                                98: [0, .69444, 0, 0, .63889],
                                99: [0, .44444, 0, 0, .51111],
                                100: [0, .69444, 0, 0, .63889],
                                101: [0, .44444, 0, 0, .52708],
                                102: [0, .69444, .10903, 0, .35139],
                                103: [.19444, .44444, .01597, 0, .575],
                                104: [0, .69444, 0, 0, .63889],
                                105: [0, .69444, 0, 0, .31944],
                                106: [.19444, .69444, 0, 0, .35139],
                                107: [0, .69444, 0, 0, .60694],
                                108: [0, .69444, 0, 0, .31944],
                                109: [0, .44444, 0, 0, .95833],
                                110: [0, .44444, 0, 0, .63889],
                                111: [0, .44444, 0, 0, .575],
                                112: [.19444, .44444, 0, 0, .63889],
                                113: [.19444, .44444, 0, 0, .60694],
                                114: [0, .44444, 0, 0, .47361],
                                115: [0, .44444, 0, 0, .45361],
                                116: [0, .63492, 0, 0, .44722],
                                117: [0, .44444, 0, 0, .63889],
                                118: [0, .44444, .01597, 0, .60694],
                                119: [0, .44444, .01597, 0, .83055],
                                120: [0, .44444, 0, 0, .60694],
                                121: [.19444, .44444, .01597, 0, .60694],
                                122: [0, .44444, 0, 0, .51111],
                                123: [.25, .75, 0, 0, .575],
                                124: [.25, .75, 0, 0, .31944],
                                125: [.25, .75, 0, 0, .575],
                                126: [.35, .34444, 0, 0, .575],
                                168: [0, .69444, 0, 0, .575],
                                172: [0, .44444, 0, 0, .76666],
                                176: [0, .69444, 0, 0, .86944],
                                177: [.13333, .63333, 0, 0, .89444],
                                184: [.17014, 0, 0, 0, .51111],
                                198: [0, .68611, 0, 0, 1.04166],
                                215: [.13333, .63333, 0, 0, .89444],
                                216: [.04861, .73472, 0, 0, .89444],
                                223: [0, .69444, 0, 0, .59722],
                                230: [0, .44444, 0, 0, .83055],
                                247: [.13333, .63333, 0, 0, .89444],
                                248: [.09722, .54167, 0, 0, .575],
                                305: [0, .44444, 0, 0, .31944],
                                338: [0, .68611, 0, 0, 1.16944],
                                339: [0, .44444, 0, 0, .89444],
                                567: [.19444, .44444, 0, 0, .35139],
                                710: [0, .69444, 0, 0, .575],
                                711: [0, .63194, 0, 0, .575],
                                713: [0, .59611, 0, 0, .575],
                                714: [0, .69444, 0, 0, .575],
                                715: [0, .69444, 0, 0, .575],
                                728: [0, .69444, 0, 0, .575],
                                729: [0, .69444, 0, 0, .31944],
                                730: [0, .69444, 0, 0, .86944],
                                732: [0, .69444, 0, 0, .575],
                                733: [0, .69444, 0, 0, .575],
                                915: [0, .68611, 0, 0, .69166],
                                916: [0, .68611, 0, 0, .95833],
                                920: [0, .68611, 0, 0, .89444],
                                923: [0, .68611, 0, 0, .80555],
                                926: [0, .68611, 0, 0, .76666],
                                928: [0, .68611, 0, 0, .9],
                                931: [0, .68611, 0, 0, .83055],
                                933: [0, .68611, 0, 0, .89444],
                                934: [0, .68611, 0, 0, .83055],
                                936: [0, .68611, 0, 0, .89444],
                                937: [0, .68611, 0, 0, .83055],
                                8211: [0, .44444, .03194, 0, .575],
                                8212: [0, .44444, .03194, 0, 1.14999],
                                8216: [0, .69444, 0, 0, .31944],
                                8217: [0, .69444, 0, 0, .31944],
                                8220: [0, .69444, 0, 0, .60278],
                                8221: [0, .69444, 0, 0, .60278],
                                8224: [.19444, .69444, 0, 0, .51111],
                                8225: [.19444, .69444, 0, 0, .51111],
                                8242: [0, .55556, 0, 0, .34444],
                                8407: [0, .72444, .15486, 0, .575],
                                8463: [0, .69444, 0, 0, .66759],
                                8465: [0, .69444, 0, 0, .83055],
                                8467: [0, .69444, 0, 0, .47361],
                                8472: [.19444, .44444, 0, 0, .74027],
                                8476: [0, .69444, 0, 0, .83055],
                                8501: [0, .69444, 0, 0, .70277],
                                8592: [-.10889, .39111, 0, 0, 1.14999],
                                8593: [.19444, .69444, 0, 0, .575],
                                8594: [-.10889, .39111, 0, 0, 1.14999],
                                8595: [.19444, .69444, 0, 0, .575],
                                8596: [-.10889, .39111, 0, 0, 1.14999],
                                8597: [.25, .75, 0, 0, .575],
                                8598: [.19444, .69444, 0, 0, 1.14999],
                                8599: [.19444, .69444, 0, 0, 1.14999],
                                8600: [.19444, .69444, 0, 0, 1.14999],
                                8601: [.19444, .69444, 0, 0, 1.14999],
                                8636: [-.10889, .39111, 0, 0, 1.14999],
                                8637: [-.10889, .39111, 0, 0, 1.14999],
                                8640: [-.10889, .39111, 0, 0, 1.14999],
                                8641: [-.10889, .39111, 0, 0, 1.14999],
                                8656: [-.10889, .39111, 0, 0, 1.14999],
                                8657: [.19444, .69444, 0, 0, .70277],
                                8658: [-.10889, .39111, 0, 0, 1.14999],
                                8659: [.19444, .69444, 0, 0, .70277],
                                8660: [-.10889, .39111, 0, 0, 1.14999],
                                8661: [.25, .75, 0, 0, .70277],
                                8704: [0, .69444, 0, 0, .63889],
                                8706: [0, .69444, .06389, 0, .62847],
                                8707: [0, .69444, 0, 0, .63889],
                                8709: [.05556, .75, 0, 0, .575],
                                8711: [0, .68611, 0, 0, .95833],
                                8712: [.08556, .58556, 0, 0, .76666],
                                8715: [.08556, .58556, 0, 0, .76666],
                                8722: [.13333, .63333, 0, 0, .89444],
                                8723: [.13333, .63333, 0, 0, .89444],
                                8725: [.25, .75, 0, 0, .575],
                                8726: [.25, .75, 0, 0, .575],
                                8727: [-.02778, .47222, 0, 0, .575],
                                8728: [-.02639, .47361, 0, 0, .575],
                                8729: [-.02639, .47361, 0, 0, .575],
                                8730: [.18, .82, 0, 0, .95833],
                                8733: [0, .44444, 0, 0, .89444],
                                8734: [0, .44444, 0, 0, 1.14999],
                                8736: [0, .69224, 0, 0, .72222],
                                8739: [.25, .75, 0, 0, .31944],
                                8741: [.25, .75, 0, 0, .575],
                                8743: [0, .55556, 0, 0, .76666],
                                8744: [0, .55556, 0, 0, .76666],
                                8745: [0, .55556, 0, 0, .76666],
                                8746: [0, .55556, 0, 0, .76666],
                                8747: [.19444, .69444, .12778, 0, .56875],
                                8764: [-.10889, .39111, 0, 0, .89444],
                                8768: [.19444, .69444, 0, 0, .31944],
                                8771: [.00222, .50222, 0, 0, .89444],
                                8776: [.02444, .52444, 0, 0, .89444],
                                8781: [.00222, .50222, 0, 0, .89444],
                                8801: [.00222, .50222, 0, 0, .89444],
                                8804: [.19667, .69667, 0, 0, .89444],
                                8805: [.19667, .69667, 0, 0, .89444],
                                8810: [.08556, .58556, 0, 0, 1.14999],
                                8811: [.08556, .58556, 0, 0, 1.14999],
                                8826: [.08556, .58556, 0, 0, .89444],
                                8827: [.08556, .58556, 0, 0, .89444],
                                8834: [.08556, .58556, 0, 0, .89444],
                                8835: [.08556, .58556, 0, 0, .89444],
                                8838: [.19667, .69667, 0, 0, .89444],
                                8839: [.19667, .69667, 0, 0, .89444],
                                8846: [0, .55556, 0, 0, .76666],
                                8849: [.19667, .69667, 0, 0, .89444],
                                8850: [.19667, .69667, 0, 0, .89444],
                                8851: [0, .55556, 0, 0, .76666],
                                8852: [0, .55556, 0, 0, .76666],
                                8853: [.13333, .63333, 0, 0, .89444],
                                8854: [.13333, .63333, 0, 0, .89444],
                                8855: [.13333, .63333, 0, 0, .89444],
                                8856: [.13333, .63333, 0, 0, .89444],
                                8857: [.13333, .63333, 0, 0, .89444],
                                8866: [0, .69444, 0, 0, .70277],
                                8867: [0, .69444, 0, 0, .70277],
                                8868: [0, .69444, 0, 0, .89444],
                                8869: [0, .69444, 0, 0, .89444],
                                8900: [-.02639, .47361, 0, 0, .575],
                                8901: [-.02639, .47361, 0, 0, .31944],
                                8902: [-.02778, .47222, 0, 0, .575],
                                8968: [.25, .75, 0, 0, .51111],
                                8969: [.25, .75, 0, 0, .51111],
                                8970: [.25, .75, 0, 0, .51111],
                                8971: [.25, .75, 0, 0, .51111],
                                8994: [-.13889, .36111, 0, 0, 1.14999],
                                8995: [-.13889, .36111, 0, 0, 1.14999],
                                9651: [.19444, .69444, 0, 0, 1.02222],
                                9657: [-.02778, .47222, 0, 0, .575],
                                9661: [.19444, .69444, 0, 0, 1.02222],
                                9667: [-.02778, .47222, 0, 0, .575],
                                9711: [.19444, .69444, 0, 0, 1.14999],
                                9824: [.12963, .69444, 0, 0, .89444],
                                9825: [.12963, .69444, 0, 0, .89444],
                                9826: [.12963, .69444, 0, 0, .89444],
                                9827: [.12963, .69444, 0, 0, .89444],
                                9837: [0, .75, 0, 0, .44722],
                                9838: [.19444, .69444, 0, 0, .44722],
                                9839: [.19444, .69444, 0, 0, .44722],
                                10216: [.25, .75, 0, 0, .44722],
                                10217: [.25, .75, 0, 0, .44722],
                                10815: [0, .68611, 0, 0, .9],
                                10927: [.19667, .69667, 0, 0, .89444],
                                10928: [.19667, .69667, 0, 0, .89444],
                                57376: [.19444, .69444, 0, 0, 0]
                            },
                            "Main-BoldItalic": {
                                33: [0, .69444, .11417, 0, .38611],
                                34: [0, .69444, .07939, 0, .62055],
                                35: [.19444, .69444, .06833, 0, .94444],
                                37: [.05556, .75, .12861, 0, .94444],
                                38: [0, .69444, .08528, 0, .88555],
                                39: [0, .69444, .12945, 0, .35555],
                                40: [.25, .75, .15806, 0, .47333],
                                41: [.25, .75, .03306, 0, .47333],
                                42: [0, .75, .14333, 0, .59111],
                                43: [.10333, .60333, .03306, 0, .88555],
                                44: [.19444, .14722, 0, 0, .35555],
                                45: [0, .44444, .02611, 0, .41444],
                                46: [0, .14722, 0, 0, .35555],
                                47: [.25, .75, .15806, 0, .59111],
                                48: [0, .64444, .13167, 0, .59111],
                                49: [0, .64444, .13167, 0, .59111],
                                50: [0, .64444, .13167, 0, .59111],
                                51: [0, .64444, .13167, 0, .59111],
                                52: [.19444, .64444, .13167, 0, .59111],
                                53: [0, .64444, .13167, 0, .59111],
                                54: [0, .64444, .13167, 0, .59111],
                                55: [.19444, .64444, .13167, 0, .59111],
                                56: [0, .64444, .13167, 0, .59111],
                                57: [0, .64444, .13167, 0, .59111],
                                58: [0, .44444, .06695, 0, .35555],
                                59: [.19444, .44444, .06695, 0, .35555],
                                61: [-.10889, .39111, .06833, 0, .88555],
                                63: [0, .69444, .11472, 0, .59111],
                                64: [0, .69444, .09208, 0, .88555],
                                65: [0, .68611, 0, 0, .86555],
                                66: [0, .68611, .0992, 0, .81666],
                                67: [0, .68611, .14208, 0, .82666],
                                68: [0, .68611, .09062, 0, .87555],
                                69: [0, .68611, .11431, 0, .75666],
                                70: [0, .68611, .12903, 0, .72722],
                                71: [0, .68611, .07347, 0, .89527],
                                72: [0, .68611, .17208, 0, .8961],
                                73: [0, .68611, .15681, 0, .47166],
                                74: [0, .68611, .145, 0, .61055],
                                75: [0, .68611, .14208, 0, .89499],
                                76: [0, .68611, 0, 0, .69777],
                                77: [0, .68611, .17208, 0, 1.07277],
                                78: [0, .68611, .17208, 0, .8961],
                                79: [0, .68611, .09062, 0, .85499],
                                80: [0, .68611, .0992, 0, .78721],
                                81: [.19444, .68611, .09062, 0, .85499],
                                82: [0, .68611, .02559, 0, .85944],
                                83: [0, .68611, .11264, 0, .64999],
                                84: [0, .68611, .12903, 0, .7961],
                                85: [0, .68611, .17208, 0, .88083],
                                86: [0, .68611, .18625, 0, .86555],
                                87: [0, .68611, .18625, 0, 1.15999],
                                88: [0, .68611, .15681, 0, .86555],
                                89: [0, .68611, .19803, 0, .86555],
                                90: [0, .68611, .14208, 0, .70888],
                                91: [.25, .75, .1875, 0, .35611],
                                93: [.25, .75, .09972, 0, .35611],
                                94: [0, .69444, .06709, 0, .59111],
                                95: [.31, .13444, .09811, 0, .59111],
                                97: [0, .44444, .09426, 0, .59111],
                                98: [0, .69444, .07861, 0, .53222],
                                99: [0, .44444, .05222, 0, .53222],
                                100: [0, .69444, .10861, 0, .59111],
                                101: [0, .44444, .085, 0, .53222],
                                102: [.19444, .69444, .21778, 0, .4],
                                103: [.19444, .44444, .105, 0, .53222],
                                104: [0, .69444, .09426, 0, .59111],
                                105: [0, .69326, .11387, 0, .35555],
                                106: [.19444, .69326, .1672, 0, .35555],
                                107: [0, .69444, .11111, 0, .53222],
                                108: [0, .69444, .10861, 0, .29666],
                                109: [0, .44444, .09426, 0, .94444],
                                110: [0, .44444, .09426, 0, .64999],
                                111: [0, .44444, .07861, 0, .59111],
                                112: [.19444, .44444, .07861, 0, .59111],
                                113: [.19444, .44444, .105, 0, .53222],
                                114: [0, .44444, .11111, 0, .50167],
                                115: [0, .44444, .08167, 0, .48694],
                                116: [0, .63492, .09639, 0, .385],
                                117: [0, .44444, .09426, 0, .62055],
                                118: [0, .44444, .11111, 0, .53222],
                                119: [0, .44444, .11111, 0, .76777],
                                120: [0, .44444, .12583, 0, .56055],
                                121: [.19444, .44444, .105, 0, .56166],
                                122: [0, .44444, .13889, 0, .49055],
                                126: [.35, .34444, .11472, 0, .59111],
                                163: [0, .69444, 0, 0, .86853],
                                168: [0, .69444, .11473, 0, .59111],
                                176: [0, .69444, 0, 0, .94888],
                                184: [.17014, 0, 0, 0, .53222],
                                198: [0, .68611, .11431, 0, 1.02277],
                                216: [.04861, .73472, .09062, 0, .88555],
                                223: [.19444, .69444, .09736, 0, .665],
                                230: [0, .44444, .085, 0, .82666],
                                248: [.09722, .54167, .09458, 0, .59111],
                                305: [0, .44444, .09426, 0, .35555],
                                338: [0, .68611, .11431, 0, 1.14054],
                                339: [0, .44444, .085, 0, .82666],
                                567: [.19444, .44444, .04611, 0, .385],
                                710: [0, .69444, .06709, 0, .59111],
                                711: [0, .63194, .08271, 0, .59111],
                                713: [0, .59444, .10444, 0, .59111],
                                714: [0, .69444, .08528, 0, .59111],
                                715: [0, .69444, 0, 0, .59111],
                                728: [0, .69444, .10333, 0, .59111],
                                729: [0, .69444, .12945, 0, .35555],
                                730: [0, .69444, 0, 0, .94888],
                                732: [0, .69444, .11472, 0, .59111],
                                733: [0, .69444, .11472, 0, .59111],
                                915: [0, .68611, .12903, 0, .69777],
                                916: [0, .68611, 0, 0, .94444],
                                920: [0, .68611, .09062, 0, .88555],
                                923: [0, .68611, 0, 0, .80666],
                                926: [0, .68611, .15092, 0, .76777],
                                928: [0, .68611, .17208, 0, .8961],
                                931: [0, .68611, .11431, 0, .82666],
                                933: [0, .68611, .10778, 0, .88555],
                                934: [0, .68611, .05632, 0, .82666],
                                936: [0, .68611, .10778, 0, .88555],
                                937: [0, .68611, .0992, 0, .82666],
                                8211: [0, .44444, .09811, 0, .59111],
                                8212: [0, .44444, .09811, 0, 1.18221],
                                8216: [0, .69444, .12945, 0, .35555],
                                8217: [0, .69444, .12945, 0, .35555],
                                8220: [0, .69444, .16772, 0, .62055],
                                8221: [0, .69444, .07939, 0, .62055]
                            },
                            "Main-Italic": {
                                33: [0, .69444, .12417, 0, .30667],
                                34: [0, .69444, .06961, 0, .51444],
                                35: [.19444, .69444, .06616, 0, .81777],
                                37: [.05556, .75, .13639, 0, .81777],
                                38: [0, .69444, .09694, 0, .76666],
                                39: [0, .69444, .12417, 0, .30667],
                                40: [.25, .75, .16194, 0, .40889],
                                41: [.25, .75, .03694, 0, .40889],
                                42: [0, .75, .14917, 0, .51111],
                                43: [.05667, .56167, .03694, 0, .76666],
                                44: [.19444, .10556, 0, 0, .30667],
                                45: [0, .43056, .02826, 0, .35778],
                                46: [0, .10556, 0, 0, .30667],
                                47: [.25, .75, .16194, 0, .51111],
                                48: [0, .64444, .13556, 0, .51111],
                                49: [0, .64444, .13556, 0, .51111],
                                50: [0, .64444, .13556, 0, .51111],
                                51: [0, .64444, .13556, 0, .51111],
                                52: [.19444, .64444, .13556, 0, .51111],
                                53: [0, .64444, .13556, 0, .51111],
                                54: [0, .64444, .13556, 0, .51111],
                                55: [.19444, .64444, .13556, 0, .51111],
                                56: [0, .64444, .13556, 0, .51111],
                                57: [0, .64444, .13556, 0, .51111],
                                58: [0, .43056, .0582, 0, .30667],
                                59: [.19444, .43056, .0582, 0, .30667],
                                61: [-.13313, .36687, .06616, 0, .76666],
                                63: [0, .69444, .1225, 0, .51111],
                                64: [0, .69444, .09597, 0, .76666],
                                65: [0, .68333, 0, 0, .74333],
                                66: [0, .68333, .10257, 0, .70389],
                                67: [0, .68333, .14528, 0, .71555],
                                68: [0, .68333, .09403, 0, .755],
                                69: [0, .68333, .12028, 0, .67833],
                                70: [0, .68333, .13305, 0, .65277],
                                71: [0, .68333, .08722, 0, .77361],
                                72: [0, .68333, .16389, 0, .74333],
                                73: [0, .68333, .15806, 0, .38555],
                                74: [0, .68333, .14028, 0, .525],
                                75: [0, .68333, .14528, 0, .76888],
                                76: [0, .68333, 0, 0, .62722],
                                77: [0, .68333, .16389, 0, .89666],
                                78: [0, .68333, .16389, 0, .74333],
                                79: [0, .68333, .09403, 0, .76666],
                                80: [0, .68333, .10257, 0, .67833],
                                81: [.19444, .68333, .09403, 0, .76666],
                                82: [0, .68333, .03868, 0, .72944],
                                83: [0, .68333, .11972, 0, .56222],
                                84: [0, .68333, .13305, 0, .71555],
                                85: [0, .68333, .16389, 0, .74333],
                                86: [0, .68333, .18361, 0, .74333],
                                87: [0, .68333, .18361, 0, .99888],
                                88: [0, .68333, .15806, 0, .74333],
                                89: [0, .68333, .19383, 0, .74333],
                                90: [0, .68333, .14528, 0, .61333],
                                91: [.25, .75, .1875, 0, .30667],
                                93: [.25, .75, .10528, 0, .30667],
                                94: [0, .69444, .06646, 0, .51111],
                                95: [.31, .12056, .09208, 0, .51111],
                                97: [0, .43056, .07671, 0, .51111],
                                98: [0, .69444, .06312, 0, .46],
                                99: [0, .43056, .05653, 0, .46],
                                100: [0, .69444, .10333, 0, .51111],
                                101: [0, .43056, .07514, 0, .46],
                                102: [.19444, .69444, .21194, 0, .30667],
                                103: [.19444, .43056, .08847, 0, .46],
                                104: [0, .69444, .07671, 0, .51111],
                                105: [0, .65536, .1019, 0, .30667],
                                106: [.19444, .65536, .14467, 0, .30667],
                                107: [0, .69444, .10764, 0, .46],
                                108: [0, .69444, .10333, 0, .25555],
                                109: [0, .43056, .07671, 0, .81777],
                                110: [0, .43056, .07671, 0, .56222],
                                111: [0, .43056, .06312, 0, .51111],
                                112: [.19444, .43056, .06312, 0, .51111],
                                113: [.19444, .43056, .08847, 0, .46],
                                114: [0, .43056, .10764, 0, .42166],
                                115: [0, .43056, .08208, 0, .40889],
                                116: [0, .61508, .09486, 0, .33222],
                                117: [0, .43056, .07671, 0, .53666],
                                118: [0, .43056, .10764, 0, .46],
                                119: [0, .43056, .10764, 0, .66444],
                                120: [0, .43056, .12042, 0, .46389],
                                121: [.19444, .43056, .08847, 0, .48555],
                                122: [0, .43056, .12292, 0, .40889],
                                126: [.35, .31786, .11585, 0, .51111],
                                163: [0, .69444, 0, 0, .76909],
                                168: [0, .66786, .10474, 0, .51111],
                                176: [0, .69444, 0, 0, .83129],
                                184: [.17014, 0, 0, 0, .46],
                                198: [0, .68333, .12028, 0, .88277],
                                216: [.04861, .73194, .09403, 0, .76666],
                                223: [.19444, .69444, .10514, 0, .53666],
                                230: [0, .43056, .07514, 0, .71555],
                                248: [.09722, .52778, .09194, 0, .51111],
                                305: [0, .43056, 0, .02778, .32246],
                                338: [0, .68333, .12028, 0, .98499],
                                339: [0, .43056, .07514, 0, .71555],
                                567: [.19444, .43056, 0, .08334, .38403],
                                710: [0, .69444, .06646, 0, .51111],
                                711: [0, .62847, .08295, 0, .51111],
                                713: [0, .56167, .10333, 0, .51111],
                                714: [0, .69444, .09694, 0, .51111],
                                715: [0, .69444, 0, 0, .51111],
                                728: [0, .69444, .10806, 0, .51111],
                                729: [0, .66786, .11752, 0, .30667],
                                730: [0, .69444, 0, 0, .83129],
                                732: [0, .66786, .11585, 0, .51111],
                                733: [0, .69444, .1225, 0, .51111],
                                915: [0, .68333, .13305, 0, .62722],
                                916: [0, .68333, 0, 0, .81777],
                                920: [0, .68333, .09403, 0, .76666],
                                923: [0, .68333, 0, 0, .69222],
                                926: [0, .68333, .15294, 0, .66444],
                                928: [0, .68333, .16389, 0, .74333],
                                931: [0, .68333, .12028, 0, .71555],
                                933: [0, .68333, .11111, 0, .76666],
                                934: [0, .68333, .05986, 0, .71555],
                                936: [0, .68333, .11111, 0, .76666],
                                937: [0, .68333, .10257, 0, .71555],
                                8211: [0, .43056, .09208, 0, .51111],
                                8212: [0, .43056, .09208, 0, 1.02222],
                                8216: [0, .69444, .12417, 0, .30667],
                                8217: [0, .69444, .12417, 0, .30667],
                                8220: [0, .69444, .1685, 0, .51444],
                                8221: [0, .69444, .06961, 0, .51444],
                                8463: [0, .68889, 0, 0, .54028]
                            },
                            "Main-Regular": {
                                32: [0, 0, 0, 0, .25],
                                33: [0, .69444, 0, 0, .27778],
                                34: [0, .69444, 0, 0, .5],
                                35: [.19444, .69444, 0, 0, .83334],
                                36: [.05556, .75, 0, 0, .5],
                                37: [.05556, .75, 0, 0, .83334],
                                38: [0, .69444, 0, 0, .77778],
                                39: [0, .69444, 0, 0, .27778],
                                40: [.25, .75, 0, 0, .38889],
                                41: [.25, .75, 0, 0, .38889],
                                42: [0, .75, 0, 0, .5],
                                43: [.08333, .58333, 0, 0, .77778],
                                44: [.19444, .10556, 0, 0, .27778],
                                45: [0, .43056, 0, 0, .33333],
                                46: [0, .10556, 0, 0, .27778],
                                47: [.25, .75, 0, 0, .5],
                                48: [0, .64444, 0, 0, .5],
                                49: [0, .64444, 0, 0, .5],
                                50: [0, .64444, 0, 0, .5],
                                51: [0, .64444, 0, 0, .5],
                                52: [0, .64444, 0, 0, .5],
                                53: [0, .64444, 0, 0, .5],
                                54: [0, .64444, 0, 0, .5],
                                55: [0, .64444, 0, 0, .5],
                                56: [0, .64444, 0, 0, .5],
                                57: [0, .64444, 0, 0, .5],
                                58: [0, .43056, 0, 0, .27778],
                                59: [.19444, .43056, 0, 0, .27778],
                                60: [.0391, .5391, 0, 0, .77778],
                                61: [-.13313, .36687, 0, 0, .77778],
                                62: [.0391, .5391, 0, 0, .77778],
                                63: [0, .69444, 0, 0, .47222],
                                64: [0, .69444, 0, 0, .77778],
                                65: [0, .68333, 0, 0, .75],
                                66: [0, .68333, 0, 0, .70834],
                                67: [0, .68333, 0, 0, .72222],
                                68: [0, .68333, 0, 0, .76389],
                                69: [0, .68333, 0, 0, .68056],
                                70: [0, .68333, 0, 0, .65278],
                                71: [0, .68333, 0, 0, .78472],
                                72: [0, .68333, 0, 0, .75],
                                73: [0, .68333, 0, 0, .36111],
                                74: [0, .68333, 0, 0, .51389],
                                75: [0, .68333, 0, 0, .77778],
                                76: [0, .68333, 0, 0, .625],
                                77: [0, .68333, 0, 0, .91667],
                                78: [0, .68333, 0, 0, .75],
                                79: [0, .68333, 0, 0, .77778],
                                80: [0, .68333, 0, 0, .68056],
                                81: [.19444, .68333, 0, 0, .77778],
                                82: [0, .68333, 0, 0, .73611],
                                83: [0, .68333, 0, 0, .55556],
                                84: [0, .68333, 0, 0, .72222],
                                85: [0, .68333, 0, 0, .75],
                                86: [0, .68333, .01389, 0, .75],
                                87: [0, .68333, .01389, 0, 1.02778],
                                88: [0, .68333, 0, 0, .75],
                                89: [0, .68333, .025, 0, .75],
                                90: [0, .68333, 0, 0, .61111],
                                91: [.25, .75, 0, 0, .27778],
                                92: [.25, .75, 0, 0, .5],
                                93: [.25, .75, 0, 0, .27778],
                                94: [0, .69444, 0, 0, .5],
                                95: [.31, .12056, .02778, 0, .5],
                                97: [0, .43056, 0, 0, .5],
                                98: [0, .69444, 0, 0, .55556],
                                99: [0, .43056, 0, 0, .44445],
                                100: [0, .69444, 0, 0, .55556],
                                101: [0, .43056, 0, 0, .44445],
                                102: [0, .69444, .07778, 0, .30556],
                                103: [.19444, .43056, .01389, 0, .5],
                                104: [0, .69444, 0, 0, .55556],
                                105: [0, .66786, 0, 0, .27778],
                                106: [.19444, .66786, 0, 0, .30556],
                                107: [0, .69444, 0, 0, .52778],
                                108: [0, .69444, 0, 0, .27778],
                                109: [0, .43056, 0, 0, .83334],
                                110: [0, .43056, 0, 0, .55556],
                                111: [0, .43056, 0, 0, .5],
                                112: [.19444, .43056, 0, 0, .55556],
                                113: [.19444, .43056, 0, 0, .52778],
                                114: [0, .43056, 0, 0, .39167],
                                115: [0, .43056, 0, 0, .39445],
                                116: [0, .61508, 0, 0, .38889],
                                117: [0, .43056, 0, 0, .55556],
                                118: [0, .43056, .01389, 0, .52778],
                                119: [0, .43056, .01389, 0, .72222],
                                120: [0, .43056, 0, 0, .52778],
                                121: [.19444, .43056, .01389, 0, .52778],
                                122: [0, .43056, 0, 0, .44445],
                                123: [.25, .75, 0, 0, .5],
                                124: [.25, .75, 0, 0, .27778],
                                125: [.25, .75, 0, 0, .5],
                                126: [.35, .31786, 0, 0, .5],
                                160: [0, 0, 0, 0, .25],
                                167: [.19444, .69444, 0, 0, .44445],
                                168: [0, .66786, 0, 0, .5],
                                172: [0, .43056, 0, 0, .66667],
                                176: [0, .69444, 0, 0, .75],
                                177: [.08333, .58333, 0, 0, .77778],
                                182: [.19444, .69444, 0, 0, .61111],
                                184: [.17014, 0, 0, 0, .44445],
                                198: [0, .68333, 0, 0, .90278],
                                215: [.08333, .58333, 0, 0, .77778],
                                216: [.04861, .73194, 0, 0, .77778],
                                223: [0, .69444, 0, 0, .5],
                                230: [0, .43056, 0, 0, .72222],
                                247: [.08333, .58333, 0, 0, .77778],
                                248: [.09722, .52778, 0, 0, .5],
                                305: [0, .43056, 0, 0, .27778],
                                338: [0, .68333, 0, 0, 1.01389],
                                339: [0, .43056, 0, 0, .77778],
                                567: [.19444, .43056, 0, 0, .30556],
                                710: [0, .69444, 0, 0, .5],
                                711: [0, .62847, 0, 0, .5],
                                713: [0, .56778, 0, 0, .5],
                                714: [0, .69444, 0, 0, .5],
                                715: [0, .69444, 0, 0, .5],
                                728: [0, .69444, 0, 0, .5],
                                729: [0, .66786, 0, 0, .27778],
                                730: [0, .69444, 0, 0, .75],
                                732: [0, .66786, 0, 0, .5],
                                733: [0, .69444, 0, 0, .5],
                                915: [0, .68333, 0, 0, .625],
                                916: [0, .68333, 0, 0, .83334],
                                920: [0, .68333, 0, 0, .77778],
                                923: [0, .68333, 0, 0, .69445],
                                926: [0, .68333, 0, 0, .66667],
                                928: [0, .68333, 0, 0, .75],
                                931: [0, .68333, 0, 0, .72222],
                                933: [0, .68333, 0, 0, .77778],
                                934: [0, .68333, 0, 0, .72222],
                                936: [0, .68333, 0, 0, .77778],
                                937: [0, .68333, 0, 0, .72222],
                                8211: [0, .43056, .02778, 0, .5],
                                8212: [0, .43056, .02778, 0, 1],
                                8216: [0, .69444, 0, 0, .27778],
                                8217: [0, .69444, 0, 0, .27778],
                                8220: [0, .69444, 0, 0, .5],
                                8221: [0, .69444, 0, 0, .5],
                                8224: [.19444, .69444, 0, 0, .44445],
                                8225: [.19444, .69444, 0, 0, .44445],
                                8230: [0, .12, 0, 0, 1.172],
                                8242: [0, .55556, 0, 0, .275],
                                8407: [0, .71444, .15382, 0, .5],
                                8463: [0, .68889, 0, 0, .54028],
                                8465: [0, .69444, 0, 0, .72222],
                                8467: [0, .69444, 0, .11111, .41667],
                                8472: [.19444, .43056, 0, .11111, .63646],
                                8476: [0, .69444, 0, 0, .72222],
                                8501: [0, .69444, 0, 0, .61111],
                                8592: [-.13313, .36687, 0, 0, 1],
                                8593: [.19444, .69444, 0, 0, .5],
                                8594: [-.13313, .36687, 0, 0, 1],
                                8595: [.19444, .69444, 0, 0, .5],
                                8596: [-.13313, .36687, 0, 0, 1],
                                8597: [.25, .75, 0, 0, .5],
                                8598: [.19444, .69444, 0, 0, 1],
                                8599: [.19444, .69444, 0, 0, 1],
                                8600: [.19444, .69444, 0, 0, 1],
                                8601: [.19444, .69444, 0, 0, 1],
                                8614: [.011, .511, 0, 0, 1],
                                8617: [.011, .511, 0, 0, 1.126],
                                8618: [.011, .511, 0, 0, 1.126],
                                8636: [-.13313, .36687, 0, 0, 1],
                                8637: [-.13313, .36687, 0, 0, 1],
                                8640: [-.13313, .36687, 0, 0, 1],
                                8641: [-.13313, .36687, 0, 0, 1],
                                8652: [.011, .671, 0, 0, 1],
                                8656: [-.13313, .36687, 0, 0, 1],
                                8657: [.19444, .69444, 0, 0, .61111],
                                8658: [-.13313, .36687, 0, 0, 1],
                                8659: [.19444, .69444, 0, 0, .61111],
                                8660: [-.13313, .36687, 0, 0, 1],
                                8661: [.25, .75, 0, 0, .61111],
                                8704: [0, .69444, 0, 0, .55556],
                                8706: [0, .69444, .05556, .08334, .5309],
                                8707: [0, .69444, 0, 0, .55556],
                                8709: [.05556, .75, 0, 0, .5],
                                8711: [0, .68333, 0, 0, .83334],
                                8712: [.0391, .5391, 0, 0, .66667],
                                8715: [.0391, .5391, 0, 0, .66667],
                                8722: [.08333, .58333, 0, 0, .77778],
                                8723: [.08333, .58333, 0, 0, .77778],
                                8725: [.25, .75, 0, 0, .5],
                                8726: [.25, .75, 0, 0, .5],
                                8727: [-.03472, .46528, 0, 0, .5],
                                8728: [-.05555, .44445, 0, 0, .5],
                                8729: [-.05555, .44445, 0, 0, .5],
                                8730: [.2, .8, 0, 0, .83334],
                                8733: [0, .43056, 0, 0, .77778],
                                8734: [0, .43056, 0, 0, 1],
                                8736: [0, .69224, 0, 0, .72222],
                                8739: [.25, .75, 0, 0, .27778],
                                8741: [.25, .75, 0, 0, .5],
                                8743: [0, .55556, 0, 0, .66667],
                                8744: [0, .55556, 0, 0, .66667],
                                8745: [0, .55556, 0, 0, .66667],
                                8746: [0, .55556, 0, 0, .66667],
                                8747: [.19444, .69444, .11111, 0, .41667],
                                8764: [-.13313, .36687, 0, 0, .77778],
                                8768: [.19444, .69444, 0, 0, .27778],
                                8771: [-.03625, .46375, 0, 0, .77778],
                                8773: [-.022, .589, 0, 0, 1],
                                8776: [-.01688, .48312, 0, 0, .77778],
                                8781: [-.03625, .46375, 0, 0, .77778],
                                8784: [-.133, .67, 0, 0, .778],
                                8801: [-.03625, .46375, 0, 0, .77778],
                                8804: [.13597, .63597, 0, 0, .77778],
                                8805: [.13597, .63597, 0, 0, .77778],
                                8810: [.0391, .5391, 0, 0, 1],
                                8811: [.0391, .5391, 0, 0, 1],
                                8826: [.0391, .5391, 0, 0, .77778],
                                8827: [.0391, .5391, 0, 0, .77778],
                                8834: [.0391, .5391, 0, 0, .77778],
                                8835: [.0391, .5391, 0, 0, .77778],
                                8838: [.13597, .63597, 0, 0, .77778],
                                8839: [.13597, .63597, 0, 0, .77778],
                                8846: [0, .55556, 0, 0, .66667],
                                8849: [.13597, .63597, 0, 0, .77778],
                                8850: [.13597, .63597, 0, 0, .77778],
                                8851: [0, .55556, 0, 0, .66667],
                                8852: [0, .55556, 0, 0, .66667],
                                8853: [.08333, .58333, 0, 0, .77778],
                                8854: [.08333, .58333, 0, 0, .77778],
                                8855: [.08333, .58333, 0, 0, .77778],
                                8856: [.08333, .58333, 0, 0, .77778],
                                8857: [.08333, .58333, 0, 0, .77778],
                                8866: [0, .69444, 0, 0, .61111],
                                8867: [0, .69444, 0, 0, .61111],
                                8868: [0, .69444, 0, 0, .77778],
                                8869: [0, .69444, 0, 0, .77778],
                                8872: [.249, .75, 0, 0, .867],
                                8900: [-.05555, .44445, 0, 0, .5],
                                8901: [-.05555, .44445, 0, 0, .27778],
                                8902: [-.03472, .46528, 0, 0, .5],
                                8904: [.005, .505, 0, 0, .9],
                                8942: [.03, .9, 0, 0, .278],
                                8943: [-.19, .31, 0, 0, 1.172],
                                8945: [-.1, .82, 0, 0, 1.282],
                                8968: [.25, .75, 0, 0, .44445],
                                8969: [.25, .75, 0, 0, .44445],
                                8970: [.25, .75, 0, 0, .44445],
                                8971: [.25, .75, 0, 0, .44445],
                                8994: [-.14236, .35764, 0, 0, 1],
                                8995: [-.14236, .35764, 0, 0, 1],
                                9136: [.244, .744, 0, 0, .412],
                                9137: [.244, .744, 0, 0, .412],
                                9651: [.19444, .69444, 0, 0, .88889],
                                9657: [-.03472, .46528, 0, 0, .5],
                                9661: [.19444, .69444, 0, 0, .88889],
                                9667: [-.03472, .46528, 0, 0, .5],
                                9711: [.19444, .69444, 0, 0, 1],
                                9824: [.12963, .69444, 0, 0, .77778],
                                9825: [.12963, .69444, 0, 0, .77778],
                                9826: [.12963, .69444, 0, 0, .77778],
                                9827: [.12963, .69444, 0, 0, .77778],
                                9837: [0, .75, 0, 0, .38889],
                                9838: [.19444, .69444, 0, 0, .38889],
                                9839: [.19444, .69444, 0, 0, .38889],
                                10216: [.25, .75, 0, 0, .38889],
                                10217: [.25, .75, 0, 0, .38889],
                                10222: [.244, .744, 0, 0, .412],
                                10223: [.244, .744, 0, 0, .412],
                                10229: [.011, .511, 0, 0, 1.609],
                                10230: [.011, .511, 0, 0, 1.638],
                                10231: [.011, .511, 0, 0, 1.859],
                                10232: [.024, .525, 0, 0, 1.609],
                                10233: [.024, .525, 0, 0, 1.638],
                                10234: [.024, .525, 0, 0, 1.858],
                                10236: [.011, .511, 0, 0, 1.638],
                                10815: [0, .68333, 0, 0, .75],
                                10927: [.13597, .63597, 0, 0, .77778],
                                10928: [.13597, .63597, 0, 0, .77778],
                                57376: [.19444, .69444, 0, 0, 0]
                            },
                            "Math-BoldItalic": {
                                65: [0, .68611, 0, 0, .86944],
                                66: [0, .68611, .04835, 0, .8664],
                                67: [0, .68611, .06979, 0, .81694],
                                68: [0, .68611, .03194, 0, .93812],
                                69: [0, .68611, .05451, 0, .81007],
                                70: [0, .68611, .15972, 0, .68889],
                                71: [0, .68611, 0, 0, .88673],
                                72: [0, .68611, .08229, 0, .98229],
                                73: [0, .68611, .07778, 0, .51111],
                                74: [0, .68611, .10069, 0, .63125],
                                75: [0, .68611, .06979, 0, .97118],
                                76: [0, .68611, 0, 0, .75555],
                                77: [0, .68611, .11424, 0, 1.14201],
                                78: [0, .68611, .11424, 0, .95034],
                                79: [0, .68611, .03194, 0, .83666],
                                80: [0, .68611, .15972, 0, .72309],
                                81: [.19444, .68611, 0, 0, .86861],
                                82: [0, .68611, .00421, 0, .87235],
                                83: [0, .68611, .05382, 0, .69271],
                                84: [0, .68611, .15972, 0, .63663],
                                85: [0, .68611, .11424, 0, .80027],
                                86: [0, .68611, .25555, 0, .67778],
                                87: [0, .68611, .15972, 0, 1.09305],
                                88: [0, .68611, .07778, 0, .94722],
                                89: [0, .68611, .25555, 0, .67458],
                                90: [0, .68611, .06979, 0, .77257],
                                97: [0, .44444, 0, 0, .63287],
                                98: [0, .69444, 0, 0, .52083],
                                99: [0, .44444, 0, 0, .51342],
                                100: [0, .69444, 0, 0, .60972],
                                101: [0, .44444, 0, 0, .55361],
                                102: [.19444, .69444, .11042, 0, .56806],
                                103: [.19444, .44444, .03704, 0, .5449],
                                104: [0, .69444, 0, 0, .66759],
                                105: [0, .69326, 0, 0, .4048],
                                106: [.19444, .69326, .0622, 0, .47083],
                                107: [0, .69444, .01852, 0, .6037],
                                108: [0, .69444, .0088, 0, .34815],
                                109: [0, .44444, 0, 0, 1.0324],
                                110: [0, .44444, 0, 0, .71296],
                                111: [0, .44444, 0, 0, .58472],
                                112: [.19444, .44444, 0, 0, .60092],
                                113: [.19444, .44444, .03704, 0, .54213],
                                114: [0, .44444, .03194, 0, .5287],
                                115: [0, .44444, 0, 0, .53125],
                                116: [0, .63492, 0, 0, .41528],
                                117: [0, .44444, 0, 0, .68102],
                                118: [0, .44444, .03704, 0, .56666],
                                119: [0, .44444, .02778, 0, .83148],
                                120: [0, .44444, 0, 0, .65903],
                                121: [.19444, .44444, .03704, 0, .59028],
                                122: [0, .44444, .04213, 0, .55509],
                                915: [0, .68611, .15972, 0, .65694],
                                916: [0, .68611, 0, 0, .95833],
                                920: [0, .68611, .03194, 0, .86722],
                                923: [0, .68611, 0, 0, .80555],
                                926: [0, .68611, .07458, 0, .84125],
                                928: [0, .68611, .08229, 0, .98229],
                                931: [0, .68611, .05451, 0, .88507],
                                933: [0, .68611, .15972, 0, .67083],
                                934: [0, .68611, 0, 0, .76666],
                                936: [0, .68611, .11653, 0, .71402],
                                937: [0, .68611, .04835, 0, .8789],
                                945: [0, .44444, 0, 0, .76064],
                                946: [.19444, .69444, .03403, 0, .65972],
                                947: [.19444, .44444, .06389, 0, .59003],
                                948: [0, .69444, .03819, 0, .52222],
                                949: [0, .44444, 0, 0, .52882],
                                950: [.19444, .69444, .06215, 0, .50833],
                                951: [.19444, .44444, .03704, 0, .6],
                                952: [0, .69444, .03194, 0, .5618],
                                953: [0, .44444, 0, 0, .41204],
                                954: [0, .44444, 0, 0, .66759],
                                955: [0, .69444, 0, 0, .67083],
                                956: [.19444, .44444, 0, 0, .70787],
                                957: [0, .44444, .06898, 0, .57685],
                                958: [.19444, .69444, .03021, 0, .50833],
                                959: [0, .44444, 0, 0, .58472],
                                960: [0, .44444, .03704, 0, .68241],
                                961: [.19444, .44444, 0, 0, .6118],
                                962: [.09722, .44444, .07917, 0, .42361],
                                963: [0, .44444, .03704, 0, .68588],
                                964: [0, .44444, .13472, 0, .52083],
                                965: [0, .44444, .03704, 0, .63055],
                                966: [.19444, .44444, 0, 0, .74722],
                                967: [.19444, .44444, 0, 0, .71805],
                                968: [.19444, .69444, .03704, 0, .75833],
                                969: [0, .44444, .03704, 0, .71782],
                                977: [0, .69444, 0, 0, .69155],
                                981: [.19444, .69444, 0, 0, .7125],
                                982: [0, .44444, .03194, 0, .975],
                                1009: [.19444, .44444, 0, 0, .6118],
                                1013: [0, .44444, 0, 0, .48333]
                            },
                            "Math-Italic": {
                                65: [0, .68333, 0, .13889, .75],
                                66: [0, .68333, .05017, .08334, .75851],
                                67: [0, .68333, .07153, .08334, .71472],
                                68: [0, .68333, .02778, .05556, .82792],
                                69: [0, .68333, .05764, .08334, .7382],
                                70: [0, .68333, .13889, .08334, .64306],
                                71: [0, .68333, 0, .08334, .78625],
                                72: [0, .68333, .08125, .05556, .83125],
                                73: [0, .68333, .07847, .11111, .43958],
                                74: [0, .68333, .09618, .16667, .55451],
                                75: [0, .68333, .07153, .05556, .84931],
                                76: [0, .68333, 0, .02778, .68056],
                                77: [0, .68333, .10903, .08334, .97014],
                                78: [0, .68333, .10903, .08334, .80347],
                                79: [0, .68333, .02778, .08334, .76278],
                                80: [0, .68333, .13889, .08334, .64201],
                                81: [.19444, .68333, 0, .08334, .79056],
                                82: [0, .68333, .00773, .08334, .75929],
                                83: [0, .68333, .05764, .08334, .6132],
                                84: [0, .68333, .13889, .08334, .58438],
                                85: [0, .68333, .10903, .02778, .68278],
                                86: [0, .68333, .22222, 0, .58333],
                                87: [0, .68333, .13889, 0, .94445],
                                88: [0, .68333, .07847, .08334, .82847],
                                89: [0, .68333, .22222, 0, .58056],
                                90: [0, .68333, .07153, .08334, .68264],
                                97: [0, .43056, 0, 0, .52859],
                                98: [0, .69444, 0, 0, .42917],
                                99: [0, .43056, 0, .05556, .43276],
                                100: [0, .69444, 0, .16667, .52049],
                                101: [0, .43056, 0, .05556, .46563],
                                102: [.19444, .69444, .10764, .16667, .48959],
                                103: [.19444, .43056, .03588, .02778, .47697],
                                104: [0, .69444, 0, 0, .57616],
                                105: [0, .65952, 0, 0, .34451],
                                106: [.19444, .65952, .05724, 0, .41181],
                                107: [0, .69444, .03148, 0, .5206],
                                108: [0, .69444, .01968, .08334, .29838],
                                109: [0, .43056, 0, 0, .87801],
                                110: [0, .43056, 0, 0, .60023],
                                111: [0, .43056, 0, .05556, .48472],
                                112: [.19444, .43056, 0, .08334, .50313],
                                113: [.19444, .43056, .03588, .08334, .44641],
                                114: [0, .43056, .02778, .05556, .45116],
                                115: [0, .43056, 0, .05556, .46875],
                                116: [0, .61508, 0, .08334, .36111],
                                117: [0, .43056, 0, .02778, .57246],
                                118: [0, .43056, .03588, .02778, .48472],
                                119: [0, .43056, .02691, .08334, .71592],
                                120: [0, .43056, 0, .02778, .57153],
                                121: [.19444, .43056, .03588, .05556, .49028],
                                122: [0, .43056, .04398, .05556, .46505],
                                915: [0, .68333, .13889, .08334, .61528],
                                916: [0, .68333, 0, .16667, .83334],
                                920: [0, .68333, .02778, .08334, .76278],
                                923: [0, .68333, 0, .16667, .69445],
                                926: [0, .68333, .07569, .08334, .74236],
                                928: [0, .68333, .08125, .05556, .83125],
                                931: [0, .68333, .05764, .08334, .77986],
                                933: [0, .68333, .13889, .05556, .58333],
                                934: [0, .68333, 0, .08334, .66667],
                                936: [0, .68333, .11, .05556, .61222],
                                937: [0, .68333, .05017, .08334, .7724],
                                945: [0, .43056, .0037, .02778, .6397],
                                946: [.19444, .69444, .05278, .08334, .56563],
                                947: [.19444, .43056, .05556, 0, .51773],
                                948: [0, .69444, .03785, .05556, .44444],
                                949: [0, .43056, 0, .08334, .46632],
                                950: [.19444, .69444, .07378, .08334, .4375],
                                951: [.19444, .43056, .03588, .05556, .49653],
                                952: [0, .69444, .02778, .08334, .46944],
                                953: [0, .43056, 0, .05556, .35394],
                                954: [0, .43056, 0, 0, .57616],
                                955: [0, .69444, 0, 0, .58334],
                                956: [.19444, .43056, 0, .02778, .60255],
                                957: [0, .43056, .06366, .02778, .49398],
                                958: [.19444, .69444, .04601, .11111, .4375],
                                959: [0, .43056, 0, .05556, .48472],
                                960: [0, .43056, .03588, 0, .57003],
                                961: [.19444, .43056, 0, .08334, .51702],
                                962: [.09722, .43056, .07986, .08334, .36285],
                                963: [0, .43056, .03588, 0, .57141],
                                964: [0, .43056, .1132, .02778, .43715],
                                965: [0, .43056, .03588, .02778, .54028],
                                966: [.19444, .43056, 0, .08334, .65417],
                                967: [.19444, .43056, 0, .05556, .62569],
                                968: [.19444, .69444, .03588, .11111, .65139],
                                969: [0, .43056, .03588, 0, .62245],
                                977: [0, .69444, 0, .08334, .59144],
                                981: [.19444, .69444, 0, .08334, .59583],
                                982: [0, .43056, .02778, 0, .82813],
                                1009: [.19444, .43056, 0, .08334, .51702],
                                1013: [0, .43056, 0, .05556, .4059]
                            },
                            "Math-Regular": {
                                65: [0, .68333, 0, .13889, .75],
                                66: [0, .68333, .05017, .08334, .75851],
                                67: [0, .68333, .07153, .08334, .71472],
                                68: [0, .68333, .02778, .05556, .82792],
                                69: [0, .68333, .05764, .08334, .7382],
                                70: [0, .68333, .13889, .08334, .64306],
                                71: [0, .68333, 0, .08334, .78625],
                                72: [0, .68333, .08125, .05556, .83125],
                                73: [0, .68333, .07847, .11111, .43958],
                                74: [0, .68333, .09618, .16667, .55451],
                                75: [0, .68333, .07153, .05556, .84931],
                                76: [0, .68333, 0, .02778, .68056],
                                77: [0, .68333, .10903, .08334, .97014],
                                78: [0, .68333, .10903, .08334, .80347],
                                79: [0, .68333, .02778, .08334, .76278],
                                80: [0, .68333, .13889, .08334, .64201],
                                81: [.19444, .68333, 0, .08334, .79056],
                                82: [0, .68333, .00773, .08334, .75929],
                                83: [0, .68333, .05764, .08334, .6132],
                                84: [0, .68333, .13889, .08334, .58438],
                                85: [0, .68333, .10903, .02778, .68278],
                                86: [0, .68333, .22222, 0, .58333],
                                87: [0, .68333, .13889, 0, .94445],
                                88: [0, .68333, .07847, .08334, .82847],
                                89: [0, .68333, .22222, 0, .58056],
                                90: [0, .68333, .07153, .08334, .68264],
                                97: [0, .43056, 0, 0, .52859],
                                98: [0, .69444, 0, 0, .42917],
                                99: [0, .43056, 0, .05556, .43276],
                                100: [0, .69444, 0, .16667, .52049],
                                101: [0, .43056, 0, .05556, .46563],
                                102: [.19444, .69444, .10764, .16667, .48959],
                                103: [.19444, .43056, .03588, .02778, .47697],
                                104: [0, .69444, 0, 0, .57616],
                                105: [0, .65952, 0, 0, .34451],
                                106: [.19444, .65952, .05724, 0, .41181],
                                107: [0, .69444, .03148, 0, .5206],
                                108: [0, .69444, .01968, .08334, .29838],
                                109: [0, .43056, 0, 0, .87801],
                                110: [0, .43056, 0, 0, .60023],
                                111: [0, .43056, 0, .05556, .48472],
                                112: [.19444, .43056, 0, .08334, .50313],
                                113: [.19444, .43056, .03588, .08334, .44641],
                                114: [0, .43056, .02778, .05556, .45116],
                                115: [0, .43056, 0, .05556, .46875],
                                116: [0, .61508, 0, .08334, .36111],
                                117: [0, .43056, 0, .02778, .57246],
                                118: [0, .43056, .03588, .02778, .48472],
                                119: [0, .43056, .02691, .08334, .71592],
                                120: [0, .43056, 0, .02778, .57153],
                                121: [.19444, .43056, .03588, .05556, .49028],
                                122: [0, .43056, .04398, .05556, .46505],
                                915: [0, .68333, .13889, .08334, .61528],
                                916: [0, .68333, 0, .16667, .83334],
                                920: [0, .68333, .02778, .08334, .76278],
                                923: [0, .68333, 0, .16667, .69445],
                                926: [0, .68333, .07569, .08334, .74236],
                                928: [0, .68333, .08125, .05556, .83125],
                                931: [0, .68333, .05764, .08334, .77986],
                                933: [0, .68333, .13889, .05556, .58333],
                                934: [0, .68333, 0, .08334, .66667],
                                936: [0, .68333, .11, .05556, .61222],
                                937: [0, .68333, .05017, .08334, .7724],
                                945: [0, .43056, .0037, .02778, .6397],
                                946: [.19444, .69444, .05278, .08334, .56563],
                                947: [.19444, .43056, .05556, 0, .51773],
                                948: [0, .69444, .03785, .05556, .44444],
                                949: [0, .43056, 0, .08334, .46632],
                                950: [.19444, .69444, .07378, .08334, .4375],
                                951: [.19444, .43056, .03588, .05556, .49653],
                                952: [0, .69444, .02778, .08334, .46944],
                                953: [0, .43056, 0, .05556, .35394],
                                954: [0, .43056, 0, 0, .57616],
                                955: [0, .69444, 0, 0, .58334],
                                956: [.19444, .43056, 0, .02778, .60255],
                                957: [0, .43056, .06366, .02778, .49398],
                                958: [.19444, .69444, .04601, .11111, .4375],
                                959: [0, .43056, 0, .05556, .48472],
                                960: [0, .43056, .03588, 0, .57003],
                                961: [.19444, .43056, 0, .08334, .51702],
                                962: [.09722, .43056, .07986, .08334, .36285],
                                963: [0, .43056, .03588, 0, .57141],
                                964: [0, .43056, .1132, .02778, .43715],
                                965: [0, .43056, .03588, .02778, .54028],
                                966: [.19444, .43056, 0, .08334, .65417],
                                967: [.19444, .43056, 0, .05556, .62569],
                                968: [.19444, .69444, .03588, .11111, .65139],
                                969: [0, .43056, .03588, 0, .62245],
                                977: [0, .69444, 0, .08334, .59144],
                                981: [.19444, .69444, 0, .08334, .59583],
                                982: [0, .43056, .02778, 0, .82813],
                                1009: [.19444, .43056, 0, .08334, .51702],
                                1013: [0, .43056, 0, .05556, .4059]
                            },
                            "SansSerif-Bold": {
                                33: [0, .69444, 0, 0, .36667],
                                34: [0, .69444, 0, 0, .55834],
                                35: [.19444, .69444, 0, 0, .91667],
                                36: [.05556, .75, 0, 0, .55],
                                37: [.05556, .75, 0, 0, 1.02912],
                                38: [0, .69444, 0, 0, .83056],
                                39: [0, .69444, 0, 0, .30556],
                                40: [.25, .75, 0, 0, .42778],
                                41: [.25, .75, 0, 0, .42778],
                                42: [0, .75, 0, 0, .55],
                                43: [.11667, .61667, 0, 0, .85556],
                                44: [.10556, .13056, 0, 0, .30556],
                                45: [0, .45833, 0, 0, .36667],
                                46: [0, .13056, 0, 0, .30556],
                                47: [.25, .75, 0, 0, .55],
                                48: [0, .69444, 0, 0, .55],
                                49: [0, .69444, 0, 0, .55],
                                50: [0, .69444, 0, 0, .55],
                                51: [0, .69444, 0, 0, .55],
                                52: [0, .69444, 0, 0, .55],
                                53: [0, .69444, 0, 0, .55],
                                54: [0, .69444, 0, 0, .55],
                                55: [0, .69444, 0, 0, .55],
                                56: [0, .69444, 0, 0, .55],
                                57: [0, .69444, 0, 0, .55],
                                58: [0, .45833, 0, 0, .30556],
                                59: [.10556, .45833, 0, 0, .30556],
                                61: [-.09375, .40625, 0, 0, .85556],
                                63: [0, .69444, 0, 0, .51945],
                                64: [0, .69444, 0, 0, .73334],
                                65: [0, .69444, 0, 0, .73334],
                                66: [0, .69444, 0, 0, .73334],
                                67: [0, .69444, 0, 0, .70278],
                                68: [0, .69444, 0, 0, .79445],
                                69: [0, .69444, 0, 0, .64167],
                                70: [0, .69444, 0, 0, .61111],
                                71: [0, .69444, 0, 0, .73334],
                                72: [0, .69444, 0, 0, .79445],
                                73: [0, .69444, 0, 0, .33056],
                                74: [0, .69444, 0, 0, .51945],
                                75: [0, .69444, 0, 0, .76389],
                                76: [0, .69444, 0, 0, .58056],
                                77: [0, .69444, 0, 0, .97778],
                                78: [0, .69444, 0, 0, .79445],
                                79: [0, .69444, 0, 0, .79445],
                                80: [0, .69444, 0, 0, .70278],
                                81: [.10556, .69444, 0, 0, .79445],
                                82: [0, .69444, 0, 0, .70278],
                                83: [0, .69444, 0, 0, .61111],
                                84: [0, .69444, 0, 0, .73334],
                                85: [0, .69444, 0, 0, .76389],
                                86: [0, .69444, .01528, 0, .73334],
                                87: [0, .69444, .01528, 0, 1.03889],
                                88: [0, .69444, 0, 0, .73334],
                                89: [0, .69444, .0275, 0, .73334],
                                90: [0, .69444, 0, 0, .67223],
                                91: [.25, .75, 0, 0, .34306],
                                93: [.25, .75, 0, 0, .34306],
                                94: [0, .69444, 0, 0, .55],
                                95: [.35, .10833, .03056, 0, .55],
                                97: [0, .45833, 0, 0, .525],
                                98: [0, .69444, 0, 0, .56111],
                                99: [0, .45833, 0, 0, .48889],
                                100: [0, .69444, 0, 0, .56111],
                                101: [0, .45833, 0, 0, .51111],
                                102: [0, .69444, .07639, 0, .33611],
                                103: [.19444, .45833, .01528, 0, .55],
                                104: [0, .69444, 0, 0, .56111],
                                105: [0, .69444, 0, 0, .25556],
                                106: [.19444, .69444, 0, 0, .28611],
                                107: [0, .69444, 0, 0, .53056],
                                108: [0, .69444, 0, 0, .25556],
                                109: [0, .45833, 0, 0, .86667],
                                110: [0, .45833, 0, 0, .56111],
                                111: [0, .45833, 0, 0, .55],
                                112: [.19444, .45833, 0, 0, .56111],
                                113: [.19444, .45833, 0, 0, .56111],
                                114: [0, .45833, .01528, 0, .37222],
                                115: [0, .45833, 0, 0, .42167],
                                116: [0, .58929, 0, 0, .40417],
                                117: [0, .45833, 0, 0, .56111],
                                118: [0, .45833, .01528, 0, .5],
                                119: [0, .45833, .01528, 0, .74445],
                                120: [0, .45833, 0, 0, .5],
                                121: [.19444, .45833, .01528, 0, .5],
                                122: [0, .45833, 0, 0, .47639],
                                126: [.35, .34444, 0, 0, .55],
                                168: [0, .69444, 0, 0, .55],
                                176: [0, .69444, 0, 0, .73334],
                                180: [0, .69444, 0, 0, .55],
                                184: [.17014, 0, 0, 0, .48889],
                                305: [0, .45833, 0, 0, .25556],
                                567: [.19444, .45833, 0, 0, .28611],
                                710: [0, .69444, 0, 0, .55],
                                711: [0, .63542, 0, 0, .55],
                                713: [0, .63778, 0, 0, .55],
                                728: [0, .69444, 0, 0, .55],
                                729: [0, .69444, 0, 0, .30556],
                                730: [0, .69444, 0, 0, .73334],
                                732: [0, .69444, 0, 0, .55],
                                733: [0, .69444, 0, 0, .55],
                                915: [0, .69444, 0, 0, .58056],
                                916: [0, .69444, 0, 0, .91667],
                                920: [0, .69444, 0, 0, .85556],
                                923: [0, .69444, 0, 0, .67223],
                                926: [0, .69444, 0, 0, .73334],
                                928: [0, .69444, 0, 0, .79445],
                                931: [0, .69444, 0, 0, .79445],
                                933: [0, .69444, 0, 0, .85556],
                                934: [0, .69444, 0, 0, .79445],
                                936: [0, .69444, 0, 0, .85556],
                                937: [0, .69444, 0, 0, .79445],
                                8211: [0, .45833, .03056, 0, .55],
                                8212: [0, .45833, .03056, 0, 1.10001],
                                8216: [0, .69444, 0, 0, .30556],
                                8217: [0, .69444, 0, 0, .30556],
                                8220: [0, .69444, 0, 0, .55834],
                                8221: [0, .69444, 0, 0, .55834]
                            },
                            "SansSerif-Italic": {
                                33: [0, .69444, .05733, 0, .31945],
                                34: [0, .69444, .00316, 0, .5],
                                35: [.19444, .69444, .05087, 0, .83334],
                                36: [.05556, .75, .11156, 0, .5],
                                37: [.05556, .75, .03126, 0, .83334],
                                38: [0, .69444, .03058, 0, .75834],
                                39: [0, .69444, .07816, 0, .27778],
                                40: [.25, .75, .13164, 0, .38889],
                                41: [.25, .75, .02536, 0, .38889],
                                42: [0, .75, .11775, 0, .5],
                                43: [.08333, .58333, .02536, 0, .77778],
                                44: [.125, .08333, 0, 0, .27778],
                                45: [0, .44444, .01946, 0, .33333],
                                46: [0, .08333, 0, 0, .27778],
                                47: [.25, .75, .13164, 0, .5],
                                48: [0, .65556, .11156, 0, .5],
                                49: [0, .65556, .11156, 0, .5],
                                50: [0, .65556, .11156, 0, .5],
                                51: [0, .65556, .11156, 0, .5],
                                52: [0, .65556, .11156, 0, .5],
                                53: [0, .65556, .11156, 0, .5],
                                54: [0, .65556, .11156, 0, .5],
                                55: [0, .65556, .11156, 0, .5],
                                56: [0, .65556, .11156, 0, .5],
                                57: [0, .65556, .11156, 0, .5],
                                58: [0, .44444, .02502, 0, .27778],
                                59: [.125, .44444, .02502, 0, .27778],
                                61: [-.13, .37, .05087, 0, .77778],
                                63: [0, .69444, .11809, 0, .47222],
                                64: [0, .69444, .07555, 0, .66667],
                                65: [0, .69444, 0, 0, .66667],
                                66: [0, .69444, .08293, 0, .66667],
                                67: [0, .69444, .11983, 0, .63889],
                                68: [0, .69444, .07555, 0, .72223],
                                69: [0, .69444, .11983, 0, .59722],
                                70: [0, .69444, .13372, 0, .56945],
                                71: [0, .69444, .11983, 0, .66667],
                                72: [0, .69444, .08094, 0, .70834],
                                73: [0, .69444, .13372, 0, .27778],
                                74: [0, .69444, .08094, 0, .47222],
                                75: [0, .69444, .11983, 0, .69445],
                                76: [0, .69444, 0, 0, .54167],
                                77: [0, .69444, .08094, 0, .875],
                                78: [0, .69444, .08094, 0, .70834],
                                79: [0, .69444, .07555, 0, .73611],
                                80: [0, .69444, .08293, 0, .63889],
                                81: [.125, .69444, .07555, 0, .73611],
                                82: [0, .69444, .08293, 0, .64584],
                                83: [0, .69444, .09205, 0, .55556],
                                84: [0, .69444, .13372, 0, .68056],
                                85: [0, .69444, .08094, 0, .6875],
                                86: [0, .69444, .1615, 0, .66667],
                                87: [0, .69444, .1615, 0, .94445],
                                88: [0, .69444, .13372, 0, .66667],
                                89: [0, .69444, .17261, 0, .66667],
                                90: [0, .69444, .11983, 0, .61111],
                                91: [.25, .75, .15942, 0, .28889],
                                93: [.25, .75, .08719, 0, .28889],
                                94: [0, .69444, .0799, 0, .5],
                                95: [.35, .09444, .08616, 0, .5],
                                97: [0, .44444, .00981, 0, .48056],
                                98: [0, .69444, .03057, 0, .51667],
                                99: [0, .44444, .08336, 0, .44445],
                                100: [0, .69444, .09483, 0, .51667],
                                101: [0, .44444, .06778, 0, .44445],
                                102: [0, .69444, .21705, 0, .30556],
                                103: [.19444, .44444, .10836, 0, .5],
                                104: [0, .69444, .01778, 0, .51667],
                                105: [0, .67937, .09718, 0, .23889],
                                106: [.19444, .67937, .09162, 0, .26667],
                                107: [0, .69444, .08336, 0, .48889],
                                108: [0, .69444, .09483, 0, .23889],
                                109: [0, .44444, .01778, 0, .79445],
                                110: [0, .44444, .01778, 0, .51667],
                                111: [0, .44444, .06613, 0, .5],
                                112: [.19444, .44444, .0389, 0, .51667],
                                113: [.19444, .44444, .04169, 0, .51667],
                                114: [0, .44444, .10836, 0, .34167],
                                115: [0, .44444, .0778, 0, .38333],
                                116: [0, .57143, .07225, 0, .36111],
                                117: [0, .44444, .04169, 0, .51667],
                                118: [0, .44444, .10836, 0, .46111],
                                119: [0, .44444, .10836, 0, .68334],
                                120: [0, .44444, .09169, 0, .46111],
                                121: [.19444, .44444, .10836, 0, .46111],
                                122: [0, .44444, .08752, 0, .43472],
                                126: [.35, .32659, .08826, 0, .5],
                                168: [0, .67937, .06385, 0, .5],
                                176: [0, .69444, 0, 0, .73752],
                                184: [.17014, 0, 0, 0, .44445],
                                305: [0, .44444, .04169, 0, .23889],
                                567: [.19444, .44444, .04169, 0, .26667],
                                710: [0, .69444, .0799, 0, .5],
                                711: [0, .63194, .08432, 0, .5],
                                713: [0, .60889, .08776, 0, .5],
                                714: [0, .69444, .09205, 0, .5],
                                715: [0, .69444, 0, 0, .5],
                                728: [0, .69444, .09483, 0, .5],
                                729: [0, .67937, .07774, 0, .27778],
                                730: [0, .69444, 0, 0, .73752],
                                732: [0, .67659, .08826, 0, .5],
                                733: [0, .69444, .09205, 0, .5],
                                915: [0, .69444, .13372, 0, .54167],
                                916: [0, .69444, 0, 0, .83334],
                                920: [0, .69444, .07555, 0, .77778],
                                923: [0, .69444, 0, 0, .61111],
                                926: [0, .69444, .12816, 0, .66667],
                                928: [0, .69444, .08094, 0, .70834],
                                931: [0, .69444, .11983, 0, .72222],
                                933: [0, .69444, .09031, 0, .77778],
                                934: [0, .69444, .04603, 0, .72222],
                                936: [0, .69444, .09031, 0, .77778],
                                937: [0, .69444, .08293, 0, .72222],
                                8211: [0, .44444, .08616, 0, .5],
                                8212: [0, .44444, .08616, 0, 1],
                                8216: [0, .69444, .07816, 0, .27778],
                                8217: [0, .69444, .07816, 0, .27778],
                                8220: [0, .69444, .14205, 0, .5],
                                8221: [0, .69444, .00316, 0, .5]
                            },
                            "SansSerif-Regular": {
                                33: [0, .69444, 0, 0, .31945],
                                34: [0, .69444, 0, 0, .5],
                                35: [.19444, .69444, 0, 0, .83334],
                                36: [.05556, .75, 0, 0, .5],
                                37: [.05556, .75, 0, 0, .83334],
                                38: [0, .69444, 0, 0, .75834],
                                39: [0, .69444, 0, 0, .27778],
                                40: [.25, .75, 0, 0, .38889],
                                41: [.25, .75, 0, 0, .38889],
                                42: [0, .75, 0, 0, .5],
                                43: [.08333, .58333, 0, 0, .77778],
                                44: [.125, .08333, 0, 0, .27778],
                                45: [0, .44444, 0, 0, .33333],
                                46: [0, .08333, 0, 0, .27778],
                                47: [.25, .75, 0, 0, .5],
                                48: [0, .65556, 0, 0, .5],
                                49: [0, .65556, 0, 0, .5],
                                50: [0, .65556, 0, 0, .5],
                                51: [0, .65556, 0, 0, .5],
                                52: [0, .65556, 0, 0, .5],
                                53: [0, .65556, 0, 0, .5],
                                54: [0, .65556, 0, 0, .5],
                                55: [0, .65556, 0, 0, .5],
                                56: [0, .65556, 0, 0, .5],
                                57: [0, .65556, 0, 0, .5],
                                58: [0, .44444, 0, 0, .27778],
                                59: [.125, .44444, 0, 0, .27778],
                                61: [-.13, .37, 0, 0, .77778],
                                63: [0, .69444, 0, 0, .47222],
                                64: [0, .69444, 0, 0, .66667],
                                65: [0, .69444, 0, 0, .66667],
                                66: [0, .69444, 0, 0, .66667],
                                67: [0, .69444, 0, 0, .63889],
                                68: [0, .69444, 0, 0, .72223],
                                69: [0, .69444, 0, 0, .59722],
                                70: [0, .69444, 0, 0, .56945],
                                71: [0, .69444, 0, 0, .66667],
                                72: [0, .69444, 0, 0, .70834],
                                73: [0, .69444, 0, 0, .27778],
                                74: [0, .69444, 0, 0, .47222],
                                75: [0, .69444, 0, 0, .69445],
                                76: [0, .69444, 0, 0, .54167],
                                77: [0, .69444, 0, 0, .875],
                                78: [0, .69444, 0, 0, .70834],
                                79: [0, .69444, 0, 0, .73611],
                                80: [0, .69444, 0, 0, .63889],
                                81: [.125, .69444, 0, 0, .73611],
                                82: [0, .69444, 0, 0, .64584],
                                83: [0, .69444, 0, 0, .55556],
                                84: [0, .69444, 0, 0, .68056],
                                85: [0, .69444, 0, 0, .6875],
                                86: [0, .69444, .01389, 0, .66667],
                                87: [0, .69444, .01389, 0, .94445],
                                88: [0, .69444, 0, 0, .66667],
                                89: [0, .69444, .025, 0, .66667],
                                90: [0, .69444, 0, 0, .61111],
                                91: [.25, .75, 0, 0, .28889],
                                93: [.25, .75, 0, 0, .28889],
                                94: [0, .69444, 0, 0, .5],
                                95: [.35, .09444, .02778, 0, .5],
                                97: [0, .44444, 0, 0, .48056],
                                98: [0, .69444, 0, 0, .51667],
                                99: [0, .44444, 0, 0, .44445],
                                100: [0, .69444, 0, 0, .51667],
                                101: [0, .44444, 0, 0, .44445],
                                102: [0, .69444, .06944, 0, .30556],
                                103: [.19444, .44444, .01389, 0, .5],
                                104: [0, .69444, 0, 0, .51667],
                                105: [0, .67937, 0, 0, .23889],
                                106: [.19444, .67937, 0, 0, .26667],
                                107: [0, .69444, 0, 0, .48889],
                                108: [0, .69444, 0, 0, .23889],
                                109: [0, .44444, 0, 0, .79445],
                                110: [0, .44444, 0, 0, .51667],
                                111: [0, .44444, 0, 0, .5],
                                112: [.19444, .44444, 0, 0, .51667],
                                113: [.19444, .44444, 0, 0, .51667],
                                114: [0, .44444, .01389, 0, .34167],
                                115: [0, .44444, 0, 0, .38333],
                                116: [0, .57143, 0, 0, .36111],
                                117: [0, .44444, 0, 0, .51667],
                                118: [0, .44444, .01389, 0, .46111],
                                119: [0, .44444, .01389, 0, .68334],
                                120: [0, .44444, 0, 0, .46111],
                                121: [.19444, .44444, .01389, 0, .46111],
                                122: [0, .44444, 0, 0, .43472],
                                126: [.35, .32659, 0, 0, .5],
                                168: [0, .67937, 0, 0, .5],
                                176: [0, .69444, 0, 0, .66667],
                                184: [.17014, 0, 0, 0, .44445],
                                305: [0, .44444, 0, 0, .23889],
                                567: [.19444, .44444, 0, 0, .26667],
                                710: [0, .69444, 0, 0, .5],
                                711: [0, .63194, 0, 0, .5],
                                713: [0, .60889, 0, 0, .5],
                                714: [0, .69444, 0, 0, .5],
                                715: [0, .69444, 0, 0, .5],
                                728: [0, .69444, 0, 0, .5],
                                729: [0, .67937, 0, 0, .27778],
                                730: [0, .69444, 0, 0, .66667],
                                732: [0, .67659, 0, 0, .5],
                                733: [0, .69444, 0, 0, .5],
                                915: [0, .69444, 0, 0, .54167],
                                916: [0, .69444, 0, 0, .83334],
                                920: [0, .69444, 0, 0, .77778],
                                923: [0, .69444, 0, 0, .61111],
                                926: [0, .69444, 0, 0, .66667],
                                928: [0, .69444, 0, 0, .70834],
                                931: [0, .69444, 0, 0, .72222],
                                933: [0, .69444, 0, 0, .77778],
                                934: [0, .69444, 0, 0, .72222],
                                936: [0, .69444, 0, 0, .77778],
                                937: [0, .69444, 0, 0, .72222],
                                8211: [0, .44444, .02778, 0, .5],
                                8212: [0, .44444, .02778, 0, 1],
                                8216: [0, .69444, 0, 0, .27778],
                                8217: [0, .69444, 0, 0, .27778],
                                8220: [0, .69444, 0, 0, .5],
                                8221: [0, .69444, 0, 0, .5]
                            },
                            "Script-Regular": {
                                65: [0, .7, .22925, 0, .80253],
                                66: [0, .7, .04087, 0, .90757],
                                67: [0, .7, .1689, 0, .66619],
                                68: [0, .7, .09371, 0, .77443],
                                69: [0, .7, .18583, 0, .56162],
                                70: [0, .7, .13634, 0, .89544],
                                71: [0, .7, .17322, 0, .60961],
                                72: [0, .7, .29694, 0, .96919],
                                73: [0, .7, .19189, 0, .80907],
                                74: [.27778, .7, .19189, 0, 1.05159],
                                75: [0, .7, .31259, 0, .91364],
                                76: [0, .7, .19189, 0, .87373],
                                77: [0, .7, .15981, 0, 1.08031],
                                78: [0, .7, .3525, 0, .9015],
                                79: [0, .7, .08078, 0, .73787],
                                80: [0, .7, .08078, 0, 1.01262],
                                81: [0, .7, .03305, 0, .88282],
                                82: [0, .7, .06259, 0, .85],
                                83: [0, .7, .19189, 0, .86767],
                                84: [0, .7, .29087, 0, .74697],
                                85: [0, .7, .25815, 0, .79996],
                                86: [0, .7, .27523, 0, .62204],
                                87: [0, .7, .27523, 0, .80532],
                                88: [0, .7, .26006, 0, .94445],
                                89: [0, .7, .2939, 0, .70961],
                                90: [0, .7, .24037, 0, .8212]
                            },
                            "Size1-Regular": {
                                40: [.35001, .85, 0, 0, .45834],
                                41: [.35001, .85, 0, 0, .45834],
                                47: [.35001, .85, 0, 0, .57778],
                                91: [.35001, .85, 0, 0, .41667],
                                92: [.35001, .85, 0, 0, .57778],
                                93: [.35001, .85, 0, 0, .41667],
                                123: [.35001, .85, 0, 0, .58334],
                                125: [.35001, .85, 0, 0, .58334],
                                710: [0, .72222, 0, 0, .55556],
                                732: [0, .72222, 0, 0, .55556],
                                770: [0, .72222, 0, 0, .55556],
                                771: [0, .72222, 0, 0, .55556],
                                8214: [-99e-5, .601, 0, 0, .77778],
                                8593: [1e-5, .6, 0, 0, .66667],
                                8595: [1e-5, .6, 0, 0, .66667],
                                8657: [1e-5, .6, 0, 0, .77778],
                                8659: [1e-5, .6, 0, 0, .77778],
                                8719: [.25001, .75, 0, 0, .94445],
                                8720: [.25001, .75, 0, 0, .94445],
                                8721: [.25001, .75, 0, 0, 1.05556],
                                8730: [.35001, .85, 0, 0, 1],
                                8739: [-.00599, .606, 0, 0, .33333],
                                8741: [-.00599, .606, 0, 0, .55556],
                                8747: [.30612, .805, .19445, 0, .47222],
                                8748: [.306, .805, .19445, 0, .47222],
                                8749: [.306, .805, .19445, 0, .47222],
                                8750: [.30612, .805, .19445, 0, .47222],
                                8896: [.25001, .75, 0, 0, .83334],
                                8897: [.25001, .75, 0, 0, .83334],
                                8898: [.25001, .75, 0, 0, .83334],
                                8899: [.25001, .75, 0, 0, .83334],
                                8968: [.35001, .85, 0, 0, .47222],
                                8969: [.35001, .85, 0, 0, .47222],
                                8970: [.35001, .85, 0, 0, .47222],
                                8971: [.35001, .85, 0, 0, .47222],
                                9168: [-99e-5, .601, 0, 0, .66667],
                                10216: [.35001, .85, 0, 0, .47222],
                                10217: [.35001, .85, 0, 0, .47222],
                                10752: [.25001, .75, 0, 0, 1.11111],
                                10753: [.25001, .75, 0, 0, 1.11111],
                                10754: [.25001, .75, 0, 0, 1.11111],
                                10756: [.25001, .75, 0, 0, .83334],
                                10758: [.25001, .75, 0, 0, .83334]
                            },
                            "Size2-Regular": {
                                40: [.65002, 1.15, 0, 0, .59722],
                                41: [.65002, 1.15, 0, 0, .59722],
                                47: [.65002, 1.15, 0, 0, .81111],
                                91: [.65002, 1.15, 0, 0, .47222],
                                92: [.65002, 1.15, 0, 0, .81111],
                                93: [.65002, 1.15, 0, 0, .47222],
                                123: [.65002, 1.15, 0, 0, .66667],
                                125: [.65002, 1.15, 0, 0, .66667],
                                710: [0, .75, 0, 0, 1],
                                732: [0, .75, 0, 0, 1],
                                770: [0, .75, 0, 0, 1],
                                771: [0, .75, 0, 0, 1],
                                8719: [.55001, 1.05, 0, 0, 1.27778],
                                8720: [.55001, 1.05, 0, 0, 1.27778],
                                8721: [.55001, 1.05, 0, 0, 1.44445],
                                8730: [.65002, 1.15, 0, 0, 1],
                                8747: [.86225, 1.36, .44445, 0, .55556],
                                8748: [.862, 1.36, .44445, 0, .55556],
                                8749: [.862, 1.36, .44445, 0, .55556],
                                8750: [.86225, 1.36, .44445, 0, .55556],
                                8896: [.55001, 1.05, 0, 0, 1.11111],
                                8897: [.55001, 1.05, 0, 0, 1.11111],
                                8898: [.55001, 1.05, 0, 0, 1.11111],
                                8899: [.55001, 1.05, 0, 0, 1.11111],
                                8968: [.65002, 1.15, 0, 0, .52778],
                                8969: [.65002, 1.15, 0, 0, .52778],
                                8970: [.65002, 1.15, 0, 0, .52778],
                                8971: [.65002, 1.15, 0, 0, .52778],
                                10216: [.65002, 1.15, 0, 0, .61111],
                                10217: [.65002, 1.15, 0, 0, .61111],
                                10752: [.55001, 1.05, 0, 0, 1.51112],
                                10753: [.55001, 1.05, 0, 0, 1.51112],
                                10754: [.55001, 1.05, 0, 0, 1.51112],
                                10756: [.55001, 1.05, 0, 0, 1.11111],
                                10758: [.55001, 1.05, 0, 0, 1.11111]
                            },
                            "Size3-Regular": {
                                40: [.95003, 1.45, 0, 0, .73611],
                                41: [.95003, 1.45, 0, 0, .73611],
                                47: [.95003, 1.45, 0, 0, 1.04445],
                                91: [.95003, 1.45, 0, 0, .52778],
                                92: [.95003, 1.45, 0, 0, 1.04445],
                                93: [.95003, 1.45, 0, 0, .52778],
                                123: [.95003, 1.45, 0, 0, .75],
                                125: [.95003, 1.45, 0, 0, .75],
                                710: [0, .75, 0, 0, 1.44445],
                                732: [0, .75, 0, 0, 1.44445],
                                770: [0, .75, 0, 0, 1.44445],
                                771: [0, .75, 0, 0, 1.44445],
                                8730: [.95003, 1.45, 0, 0, 1],
                                8968: [.95003, 1.45, 0, 0, .58334],
                                8969: [.95003, 1.45, 0, 0, .58334],
                                8970: [.95003, 1.45, 0, 0, .58334],
                                8971: [.95003, 1.45, 0, 0, .58334],
                                10216: [.95003, 1.45, 0, 0, .75],
                                10217: [.95003, 1.45, 0, 0, .75]
                            },
                            "Size4-Regular": {
                                40: [1.25003, 1.75, 0, 0, .79167],
                                41: [1.25003, 1.75, 0, 0, .79167],
                                47: [1.25003, 1.75, 0, 0, 1.27778],
                                91: [1.25003, 1.75, 0, 0, .58334],
                                92: [1.25003, 1.75, 0, 0, 1.27778],
                                93: [1.25003, 1.75, 0, 0, .58334],
                                123: [1.25003, 1.75, 0, 0, .80556],
                                125: [1.25003, 1.75, 0, 0, .80556],
                                710: [0, .825, 0, 0, 1.8889],
                                732: [0, .825, 0, 0, 1.8889],
                                770: [0, .825, 0, 0, 1.8889],
                                771: [0, .825, 0, 0, 1.8889],
                                8730: [1.25003, 1.75, 0, 0, 1],
                                8968: [1.25003, 1.75, 0, 0, .63889],
                                8969: [1.25003, 1.75, 0, 0, .63889],
                                8970: [1.25003, 1.75, 0, 0, .63889],
                                8971: [1.25003, 1.75, 0, 0, .63889],
                                9115: [.64502, 1.155, 0, 0, .875],
                                9116: [1e-5, .6, 0, 0, .875],
                                9117: [.64502, 1.155, 0, 0, .875],
                                9118: [.64502, 1.155, 0, 0, .875],
                                9119: [1e-5, .6, 0, 0, .875],
                                9120: [.64502, 1.155, 0, 0, .875],
                                9121: [.64502, 1.155, 0, 0, .66667],
                                9122: [-99e-5, .601, 0, 0, .66667],
                                9123: [.64502, 1.155, 0, 0, .66667],
                                9124: [.64502, 1.155, 0, 0, .66667],
                                9125: [-99e-5, .601, 0, 0, .66667],
                                9126: [.64502, 1.155, 0, 0, .66667],
                                9127: [1e-5, .9, 0, 0, .88889],
                                9128: [.65002, 1.15, 0, 0, .88889],
                                9129: [.90001, 0, 0, 0, .88889],
                                9130: [0, .3, 0, 0, .88889],
                                9131: [1e-5, .9, 0, 0, .88889],
                                9132: [.65002, 1.15, 0, 0, .88889],
                                9133: [.90001, 0, 0, 0, .88889],
                                9143: [.88502, .915, 0, 0, 1.05556],
                                10216: [1.25003, 1.75, 0, 0, .80556],
                                10217: [1.25003, 1.75, 0, 0, .80556],
                                57344: [-.00499, .605, 0, 0, 1.05556],
                                57345: [-.00499, .605, 0, 0, 1.05556],
                                57680: [0, .12, 0, 0, .45],
                                57681: [0, .12, 0, 0, .45],
                                57682: [0, .12, 0, 0, .45],
                                57683: [0, .12, 0, 0, .45]
                            },
                            "Typewriter-Regular": {
                                32: [0, 0, 0, 0, .525],
                                33: [0, .61111, 0, 0, .525],
                                34: [0, .61111, 0, 0, .525],
                                35: [0, .61111, 0, 0, .525],
                                36: [.08333, .69444, 0, 0, .525],
                                37: [.08333, .69444, 0, 0, .525],
                                38: [0, .61111, 0, 0, .525],
                                39: [0, .61111, 0, 0, .525],
                                40: [.08333, .69444, 0, 0, .525],
                                41: [.08333, .69444, 0, 0, .525],
                                42: [0, .52083, 0, 0, .525],
                                43: [-.08056, .53055, 0, 0, .525],
                                44: [.13889, .125, 0, 0, .525],
                                45: [-.08056, .53055, 0, 0, .525],
                                46: [0, .125, 0, 0, .525],
                                47: [.08333, .69444, 0, 0, .525],
                                48: [0, .61111, 0, 0, .525],
                                49: [0, .61111, 0, 0, .525],
                                50: [0, .61111, 0, 0, .525],
                                51: [0, .61111, 0, 0, .525],
                                52: [0, .61111, 0, 0, .525],
                                53: [0, .61111, 0, 0, .525],
                                54: [0, .61111, 0, 0, .525],
                                55: [0, .61111, 0, 0, .525],
                                56: [0, .61111, 0, 0, .525],
                                57: [0, .61111, 0, 0, .525],
                                58: [0, .43056, 0, 0, .525],
                                59: [.13889, .43056, 0, 0, .525],
                                60: [-.05556, .55556, 0, 0, .525],
                                61: [-.19549, .41562, 0, 0, .525],
                                62: [-.05556, .55556, 0, 0, .525],
                                63: [0, .61111, 0, 0, .525],
                                64: [0, .61111, 0, 0, .525],
                                65: [0, .61111, 0, 0, .525],
                                66: [0, .61111, 0, 0, .525],
                                67: [0, .61111, 0, 0, .525],
                                68: [0, .61111, 0, 0, .525],
                                69: [0, .61111, 0, 0, .525],
                                70: [0, .61111, 0, 0, .525],
                                71: [0, .61111, 0, 0, .525],
                                72: [0, .61111, 0, 0, .525],
                                73: [0, .61111, 0, 0, .525],
                                74: [0, .61111, 0, 0, .525],
                                75: [0, .61111, 0, 0, .525],
                                76: [0, .61111, 0, 0, .525],
                                77: [0, .61111, 0, 0, .525],
                                78: [0, .61111, 0, 0, .525],
                                79: [0, .61111, 0, 0, .525],
                                80: [0, .61111, 0, 0, .525],
                                81: [.13889, .61111, 0, 0, .525],
                                82: [0, .61111, 0, 0, .525],
                                83: [0, .61111, 0, 0, .525],
                                84: [0, .61111, 0, 0, .525],
                                85: [0, .61111, 0, 0, .525],
                                86: [0, .61111, 0, 0, .525],
                                87: [0, .61111, 0, 0, .525],
                                88: [0, .61111, 0, 0, .525],
                                89: [0, .61111, 0, 0, .525],
                                90: [0, .61111, 0, 0, .525],
                                91: [.08333, .69444, 0, 0, .525],
                                92: [.08333, .69444, 0, 0, .525],
                                93: [.08333, .69444, 0, 0, .525],
                                94: [0, .61111, 0, 0, .525],
                                95: [.09514, 0, 0, 0, .525],
                                96: [0, .61111, 0, 0, .525],
                                97: [0, .43056, 0, 0, .525],
                                98: [0, .61111, 0, 0, .525],
                                99: [0, .43056, 0, 0, .525],
                                100: [0, .61111, 0, 0, .525],
                                101: [0, .43056, 0, 0, .525],
                                102: [0, .61111, 0, 0, .525],
                                103: [.22222, .43056, 0, 0, .525],
                                104: [0, .61111, 0, 0, .525],
                                105: [0, .61111, 0, 0, .525],
                                106: [.22222, .61111, 0, 0, .525],
                                107: [0, .61111, 0, 0, .525],
                                108: [0, .61111, 0, 0, .525],
                                109: [0, .43056, 0, 0, .525],
                                110: [0, .43056, 0, 0, .525],
                                111: [0, .43056, 0, 0, .525],
                                112: [.22222, .43056, 0, 0, .525],
                                113: [.22222, .43056, 0, 0, .525],
                                114: [0, .43056, 0, 0, .525],
                                115: [0, .43056, 0, 0, .525],
                                116: [0, .55358, 0, 0, .525],
                                117: [0, .43056, 0, 0, .525],
                                118: [0, .43056, 0, 0, .525],
                                119: [0, .43056, 0, 0, .525],
                                120: [0, .43056, 0, 0, .525],
                                121: [.22222, .43056, 0, 0, .525],
                                122: [0, .43056, 0, 0, .525],
                                123: [.08333, .69444, 0, 0, .525],
                                124: [.08333, .69444, 0, 0, .525],
                                125: [.08333, .69444, 0, 0, .525],
                                126: [0, .61111, 0, 0, .525],
                                127: [0, .61111, 0, 0, .525],
                                160: [0, 0, 0, 0, .525],
                                176: [0, .61111, 0, 0, .525],
                                184: [.19445, 0, 0, 0, .525],
                                305: [0, .43056, 0, 0, .525],
                                567: [.22222, .43056, 0, 0, .525],
                                711: [0, .56597, 0, 0, .525],
                                713: [0, .56555, 0, 0, .525],
                                714: [0, .61111, 0, 0, .525],
                                715: [0, .61111, 0, 0, .525],
                                728: [0, .61111, 0, 0, .525],
                                730: [0, .61111, 0, 0, .525],
                                770: [0, .61111, 0, 0, .525],
                                771: [0, .61111, 0, 0, .525],
                                776: [0, .61111, 0, 0, .525],
                                915: [0, .61111, 0, 0, .525],
                                916: [0, .61111, 0, 0, .525],
                                920: [0, .61111, 0, 0, .525],
                                923: [0, .61111, 0, 0, .525],
                                926: [0, .61111, 0, 0, .525],
                                928: [0, .61111, 0, 0, .525],
                                931: [0, .61111, 0, 0, .525],
                                933: [0, .61111, 0, 0, .525],
                                934: [0, .61111, 0, 0, .525],
                                936: [0, .61111, 0, 0, .525],
                                937: [0, .61111, 0, 0, .525],
                                8216: [0, .61111, 0, 0, .525],
                                8217: [0, .61111, 0, 0, .525],
                                8242: [0, .61111, 0, 0, .525],
                                9251: [.11111, .21944, 0, 0, .525]
                            }
                        },
                        H = {
                            slant: [.25, .25, .25],
                            space: [0, 0, 0],
                            stretch: [0, 0, 0],
                            shrink: [0, 0, 0],
                            xHeight: [.431, .431, .431],
                            quad: [1, 1.171, 1.472],
                            extraSpace: [0, 0, 0],
                            num1: [.677, .732, .925],
                            num2: [.394, .384, .387],
                            num3: [.444, .471, .504],
                            denom1: [.686, .752, 1.025],
                            denom2: [.345, .344, .532],
                            sup1: [.413, .503, .504],
                            sup2: [.363, .431, .404],
                            sup3: [.289, .286, .294],
                            sub1: [.15, .143, .2],
                            sub2: [.247, .286, .4],
                            supDrop: [.386, .353, .494],
                            subDrop: [.05, .071, .1],
                            delim1: [2.39, 1.7, 1.98],
                            delim2: [1.01, 1.157, 1.42],
                            axisHeight: [.25, .25, .25],
                            defaultRuleThickness: [.04, .049, .049],
                            bigOpSpacing1: [.111, .111, .111],
                            bigOpSpacing2: [.166, .166, .166],
                            bigOpSpacing3: [.2, .2, .2],
                            bigOpSpacing4: [.6, .611, .611],
                            bigOpSpacing5: [.1, .143, .143],
                            sqrtRuleThickness: [.04, .04, .04],
                            ptPerEm: [10, 10, 10],
                            doubleRuleSep: [.2, .2, .2],
                            arrayRuleWidth: [.04, .04, .04],
                            fboxsep: [.3, .3, .3],
                            fboxrule: [.04, .04, .04]
                        },
                        F = {
                            "Å": "A",
                            "Ç": "C",
                            "Ð": "D",
                            "Þ": "o",
                            "å": "a",
                            "ç": "c",
                            "ð": "d",
                            "þ": "o",
                            "А": "A",
                            "Б": "B",
                            "В": "B",
                            "Г": "F",
                            "Д": "A",
                            "Е": "E",
                            "Ж": "K",
                            "З": "3",
                            "И": "N",
                            "Й": "N",
                            "К": "K",
                            "Л": "N",
                            "М": "M",
                            "Н": "H",
                            "О": "O",
                            "П": "N",
                            "Р": "P",
                            "С": "C",
                            "Т": "T",
                            "У": "y",
                            "Ф": "O",
                            "Х": "X",
                            "Ц": "U",
                            "Ч": "h",
                            "Ш": "W",
                            "Щ": "W",
                            "Ъ": "B",
                            "Ы": "X",
                            "Ь": "B",
                            "Э": "3",
                            "Ю": "X",
                            "Я": "R",
                            "а": "a",
                            "б": "b",
                            "в": "a",
                            "г": "r",
                            "д": "y",
                            "е": "e",
                            "ж": "m",
                            "з": "e",
                            "и": "n",
                            "й": "n",
                            "к": "n",
                            "л": "n",
                            "м": "m",
                            "н": "n",
                            "о": "o",
                            "п": "n",
                            "р": "p",
                            "с": "c",
                            "т": "o",
                            "у": "y",
                            "ф": "b",
                            "х": "x",
                            "ц": "n",
                            "ч": "n",
                            "ш": "w",
                            "щ": "w",
                            "ъ": "a",
                            "ы": "m",
                            "ь": "a",
                            "э": "e",
                            "ю": "m",
                            "я": "r"
                        };

                    function G(t, e, r) {
                        if (!P[e]) throw new Error("Font metrics not found for font: " + e + ".");
                        var a = t.charCodeAt(0),
                            n = P[e][a];
                        if (!n && t[0] in F && (a = F[t[0]].charCodeAt(0), n = P[e][a]), n || "text" !== r || z(a) && (n = P[e][77]), n) return {
                            depth: n[0],
                            height: n[1],
                            italic: n[2],
                            skew: n[3],
                            width: n[4]
                        }
                    }
                    var V = {},
                        U = {
                            bin: 1,
                            close: 1,
                            inner: 1,
                            open: 1,
                            punct: 1,
                            rel: 1
                        },
                        X = {
                            "accent-token": 1,
                            mathord: 1,
                            "op-token": 1,
                            spacing: 1,
                            textord: 1
                        },
                        W = {
                            math: {},
                            text: {}
                        },
                        Y = W;

                    function Z(t, e, r, a, n, o) {
                        W[t][n] = {
                            font: e,
                            group: r,
                            replace: a
                        }, o && a && (W[t][a] = W[t][n])
                    }
                    var j = "main",
                        K = "ams",
                        J = "bin",
                        Q = "mathord",
                        tt = "op-token",
                        et = "rel";
                    Z("math", j, et, "≡", "\\equiv", !0), Z("math", j, et, "≺", "\\prec", !0), Z("math", j, et, "≻", "\\succ", !0), Z("math", j, et, "∼", "\\sim", !0), Z("math", j, et, "⊥", "\\perp"), Z("math", j, et, "⪯", "\\preceq", !0), Z("math", j, et, "⪰", "\\succeq", !0), Z("math", j, et, "≃", "\\simeq", !0), Z("math", j, et, "∣", "\\mid", !0), Z("math", j, et, "≪", "\\ll", !0), Z("math", j, et, "≫", "\\gg", !0), Z("math", j, et, "≍", "\\asymp", !0), Z("math", j, et, "∥", "\\parallel"), Z("math", j, et, "⋈", "\\bowtie", !0), Z("math", j, et, "⌣", "\\smile", !0), Z("math", j, et, "⊑", "\\sqsubseteq", !0), Z("math", j, et, "⊒", "\\sqsupseteq", !0), Z("math", j, et, "≐", "\\doteq", !0), Z("math", j, et, "⌢", "\\frown", !0), Z("math", j, et, "∋", "\\ni", !0), Z("math", j, et, "∝", "\\propto", !0), Z("math", j, et, "⊢", "\\vdash", !0), Z("math", j, et, "⊣", "\\dashv", !0), Z("math", j, et, "∋", "\\owns"), Z("math", j, "punct", ".", "\\ldotp"), Z("math", j, "punct", "⋅", "\\cdotp"), Z("math", j, "textord", "#", "\\#"), Z("text", j, "textord", "#", "\\#"), Z("math", j, "textord", "&", "\\&"), Z("text", j, "textord", "&", "\\&"), Z("math", j, "textord", "ℵ", "\\aleph", !0), Z("math", j, "textord", "∀", "\\forall", !0), Z("math", j, "textord", "ℏ", "\\hbar", !0), Z("math", j, "textord", "∃", "\\exists", !0), Z("math", j, "textord", "∇", "\\nabla", !0), Z("math", j, "textord", "♭", "\\flat", !0), Z("math", j, "textord", "ℓ", "\\ell", !0), Z("math", j, "textord", "♮", "\\natural", !0), Z("math", j, "textord", "♣", "\\clubsuit", !0), Z("math", j, "textord", "℘", "\\wp", !0), Z("math", j, "textord", "♯", "\\sharp", !0), Z("math", j, "textord", "♢", "\\diamondsuit", !0), Z("math", j, "textord", "ℜ", "\\Re", !0), Z("math", j, "textord", "♡", "\\heartsuit", !0), Z("math", j, "textord", "ℑ", "\\Im", !0), Z("math", j, "textord", "♠", "\\spadesuit", !0), Z("text", j, "textord", "§", "\\S", !0), Z("text", j, "textord", "¶", "\\P", !0), Z("math", j, "textord", "†", "\\dag"), Z("text", j, "textord", "†", "\\dag"), Z("text", j, "textord", "†", "\\textdagger"), Z("math", j, "textord", "‡", "\\ddag"), Z("text", j, "textord", "‡", "\\ddag"), Z("text", j, "textord", "‡", "\\textdaggerdbl"), Z("math", j, "close", "⎱", "\\rmoustache", !0), Z("math", j, "open", "⎰", "\\lmoustache", !0), Z("math", j, "close", "⟯", "\\rgroup", !0), Z("math", j, "open", "⟮", "\\lgroup", !0), Z("math", j, J, "∓", "\\mp", !0), Z("math", j, J, "⊖", "\\ominus", !0), Z("math", j, J, "⊎", "\\uplus", !0), Z("math", j, J, "⊓", "\\sqcap", !0), Z("math", j, J, "∗", "\\ast"), Z("math", j, J, "⊔", "\\sqcup", !0), Z("math", j, J, "◯", "\\bigcirc"), Z("math", j, J, "∙", "\\bullet"), Z("math", j, J, "‡", "\\ddagger"), Z("math", j, J, "≀", "\\wr", !0), Z("math", j, J, "⨿", "\\amalg"), Z("math", j, J, "&", "\\And"), Z("math", j, et, "⟵", "\\longleftarrow", !0), Z("math", j, et, "⇐", "\\Leftarrow", !0), Z("math", j, et, "⟸", "\\Longleftarrow", !0), Z("math", j, et, "⟶", "\\longrightarrow", !0), Z("math", j, et, "⇒", "\\Rightarrow", !0), Z("math", j, et, "⟹", "\\Longrightarrow", !0), Z("math", j, et, "↔", "\\leftrightarrow", !0), Z("math", j, et, "⟷", "\\longleftrightarrow", !0), Z("math", j, et, "⇔", "\\Leftrightarrow", !0), Z("math", j, et, "⟺", "\\Longleftrightarrow", !0), Z("math", j, et, "↦", "\\mapsto", !0), Z("math", j, et, "⟼", "\\longmapsto", !0), Z("math", j, et, "↗", "\\nearrow", !0), Z("math", j, et, "↩", "\\hookleftarrow", !0), Z("math", j, et, "↪", "\\hookrightarrow", !0), Z("math", j, et, "↘", "\\searrow", !0), Z("math", j, et, "↼", "\\leftharpoonup", !0), Z("math", j, et, "⇀", "\\rightharpoonup", !0), Z("math", j, et, "↙", "\\swarrow", !0), Z("math", j, et, "↽", "\\leftharpoondown", !0), Z("math", j, et, "⇁", "\\rightharpoondown", !0), Z("math", j, et, "↖", "\\nwarrow", !0), Z("math", j, et, "⇌", "\\rightleftharpoons", !0), Z("math", K, et, "≮", "\\nless", !0), Z("math", K, et, "", "\\@nleqslant"), Z("math", K, et, "", "\\@nleqq"), Z("math", K, et, "⪇", "\\lneq", !0), Z("math", K, et, "≨", "\\lneqq", !0), Z("math", K, et, "", "\\@lvertneqq"), Z("math", K, et, "⋦", "\\lnsim", !0), Z("math", K, et, "⪉", "\\lnapprox", !0), Z("math", K, et, "⊀", "\\nprec", !0), Z("math", K, et, "⋠", "\\npreceq", !0), Z("math", K, et, "⋨", "\\precnsim", !0), Z("math", K, et, "⪹", "\\precnapprox", !0), Z("math", K, et, "≁", "\\nsim", !0), Z("math", K, et, "", "\\@nshortmid"), Z("math", K, et, "∤", "\\nmid", !0), Z("math", K, et, "⊬", "\\nvdash", !0), Z("math", K, et, "⊭", "\\nvDash", !0), Z("math", K, et, "⋪", "\\ntriangleleft"), Z("math", K, et, "⋬", "\\ntrianglelefteq", !0), Z("math", K, et, "⊊", "\\subsetneq", !0), Z("math", K, et, "", "\\@varsubsetneq"), Z("math", K, et, "⫋", "\\subsetneqq", !0), Z("math", K, et, "", "\\@varsubsetneqq"), Z("math", K, et, "≯", "\\ngtr", !0), Z("math", K, et, "", "\\@ngeqslant"), Z("math", K, et, "", "\\@ngeqq"), Z("math", K, et, "⪈", "\\gneq", !0), Z("math", K, et, "≩", "\\gneqq", !0), Z("math", K, et, "", "\\@gvertneqq"), Z("math", K, et, "⋧", "\\gnsim", !0), Z("math", K, et, "⪊", "\\gnapprox", !0), Z("math", K, et, "⊁", "\\nsucc", !0), Z("math", K, et, "⋡", "\\nsucceq", !0), Z("math", K, et, "⋩", "\\succnsim", !0), Z("math", K, et, "⪺", "\\succnapprox", !0), Z("math", K, et, "≆", "\\ncong", !0), Z("math", K, et, "", "\\@nshortparallel"), Z("math", K, et, "∦", "\\nparallel", !0), Z("math", K, et, "⊯", "\\nVDash", !0), Z("math", K, et, "⋫", "\\ntriangleright"), Z("math", K, et, "⋭", "\\ntrianglerighteq", !0), Z("math", K, et, "", "\\@nsupseteqq"), Z("math", K, et, "⊋", "\\supsetneq", !0), Z("math", K, et, "", "\\@varsupsetneq"), Z("math", K, et, "⫌", "\\supsetneqq", !0), Z("math", K, et, "", "\\@varsupsetneqq"), Z("math", K, et, "⊮", "\\nVdash", !0), Z("math", K, et, "⪵", "\\precneqq", !0), Z("math", K, et, "⪶", "\\succneqq", !0), Z("math", K, et, "", "\\@nsubseteqq"), Z("math", K, J, "⊴", "\\unlhd"), Z("math", K, J, "⊵", "\\unrhd"), Z("math", K, et, "↚", "\\nleftarrow", !0), Z("math", K, et, "↛", "\\nrightarrow", !0), Z("math", K, et, "⇍", "\\nLeftarrow", !0), Z("math", K, et, "⇏", "\\nRightarrow", !0), Z("math", K, et, "↮", "\\nleftrightarrow", !0), Z("math", K, et, "⇎", "\\nLeftrightarrow", !0), Z("math", K, et, "△", "\\vartriangle"), Z("math", K, "textord", "ℏ", "\\hslash"), Z("math", K, "textord", "▽", "\\triangledown"), Z("math", K, "textord", "◊", "\\lozenge"), Z("math", K, "textord", "Ⓢ", "\\circledS"), Z("math", K, "textord", "®", "\\circledR"), Z("text", K, "textord", "®", "\\circledR"), Z("math", K, "textord", "∡", "\\measuredangle", !0), Z("math", K, "textord", "∄", "\\nexists"), Z("math", K, "textord", "℧", "\\mho"), Z("math", K, "textord", "Ⅎ", "\\Finv", !0), Z("math", K, "textord", "⅁", "\\Game", !0), Z("math", K, "textord", "‵", "\\backprime"), Z("math", K, "textord", "▲", "\\blacktriangle"), Z("math", K, "textord", "▼", "\\blacktriangledown"), Z("math", K, "textord", "■", "\\blacksquare"), Z("math", K, "textord", "⧫", "\\blacklozenge"), Z("math", K, "textord", "★", "\\bigstar"), Z("math", K, "textord", "∢", "\\sphericalangle", !0), Z("math", K, "textord", "∁", "\\complement", !0), Z("math", K, "textord", "ð", "\\eth", !0), Z("math", K, "textord", "╱", "\\diagup"), Z("math", K, "textord", "╲", "\\diagdown"), Z("math", K, "textord", "□", "\\square"), Z("math", K, "textord", "□", "\\Box"), Z("math", K, "textord", "◊", "\\Diamond"), Z("math", K, "textord", "¥", "\\yen", !0), Z("text", K, "textord", "¥", "\\yen", !0), Z("math", K, "textord", "✓", "\\checkmark", !0), Z("text", K, "textord", "✓", "\\checkmark"), Z("math", K, "textord", "ℶ", "\\beth", !0), Z("math", K, "textord", "ℸ", "\\daleth", !0), Z("math", K, "textord", "ℷ", "\\gimel", !0), Z("math", K, "textord", "ϝ", "\\digamma", !0), Z("math", K, "textord", "ϰ", "\\varkappa"), Z("math", K, "open", "┌", "\\ulcorner", !0), Z("math", K, "close", "┐", "\\urcorner", !0), Z("math", K, "open", "└", "\\llcorner", !0), Z("math", K, "close", "┘", "\\lrcorner", !0), Z("math", K, et, "≦", "\\leqq", !0), Z("math", K, et, "⩽", "\\leqslant", !0), Z("math", K, et, "⪕", "\\eqslantless", !0), Z("math", K, et, "≲", "\\lesssim", !0), Z("math", K, et, "⪅", "\\lessapprox", !0), Z("math", K, et, "≊", "\\approxeq", !0), Z("math", K, J, "⋖", "\\lessdot"), Z("math", K, et, "⋘", "\\lll", !0), Z("math", K, et, "≶", "\\lessgtr", !0), Z("math", K, et, "⋚", "\\lesseqgtr", !0), Z("math", K, et, "⪋", "\\lesseqqgtr", !0), Z("math", K, et, "≑", "\\doteqdot"), Z("math", K, et, "≓", "\\risingdotseq", !0), Z("math", K, et, "≒", "\\fallingdotseq", !0), Z("math", K, et, "∽", "\\backsim", !0), Z("math", K, et, "⋍", "\\backsimeq", !0), Z("math", K, et, "⫅", "\\subseteqq", !0), Z("math", K, et, "⋐", "\\Subset", !0), Z("math", K, et, "⊏", "\\sqsubset", !0), Z("math", K, et, "≼", "\\preccurlyeq", !0), Z("math", K, et, "⋞", "\\curlyeqprec", !0), Z("math", K, et, "≾", "\\precsim", !0), Z("math", K, et, "⪷", "\\precapprox", !0), Z("math", K, et, "⊲", "\\vartriangleleft"), Z("math", K, et, "⊴", "\\trianglelefteq"), Z("math", K, et, "⊨", "\\vDash", !0), Z("math", K, et, "⊪", "\\Vvdash", !0), Z("math", K, et, "⌣", "\\smallsmile"), Z("math", K, et, "⌢", "\\smallfrown"), Z("math", K, et, "≏", "\\bumpeq", !0), Z("math", K, et, "≎", "\\Bumpeq", !0), Z("math", K, et, "≧", "\\geqq", !0), Z("math", K, et, "⩾", "\\geqslant", !0), Z("math", K, et, "⪖", "\\eqslantgtr", !0), Z("math", K, et, "≳", "\\gtrsim", !0), Z("math", K, et, "⪆", "\\gtrapprox", !0), Z("math", K, J, "⋗", "\\gtrdot"), Z("math", K, et, "⋙", "\\ggg", !0), Z("math", K, et, "≷", "\\gtrless", !0), Z("math", K, et, "⋛", "\\gtreqless", !0), Z("math", K, et, "⪌", "\\gtreqqless", !0), Z("math", K, et, "≖", "\\eqcirc", !0), Z("math", K, et, "≗", "\\circeq", !0), Z("math", K, et, "≜", "\\triangleq", !0), Z("math", K, et, "∼", "\\thicksim"), Z("math", K, et, "≈", "\\thickapprox"), Z("math", K, et, "⫆", "\\supseteqq", !0), Z("math", K, et, "⋑", "\\Supset", !0), Z("math", K, et, "⊐", "\\sqsupset", !0), Z("math", K, et, "≽", "\\succcurlyeq", !0), Z("math", K, et, "⋟", "\\curlyeqsucc", !0), Z("math", K, et, "≿", "\\succsim", !0), Z("math", K, et, "⪸", "\\succapprox", !0), Z("math", K, et, "⊳", "\\vartriangleright"), Z("math", K, et, "⊵", "\\trianglerighteq"), Z("math", K, et, "⊩", "\\Vdash", !0), Z("math", K, et, "∣", "\\shortmid"), Z("math", K, et, "∥", "\\shortparallel"), Z("math", K, et, "≬", "\\between", !0), Z("math", K, et, "⋔", "\\pitchfork", !0), Z("math", K, et, "∝", "\\varpropto"), Z("math", K, et, "◀", "\\blacktriangleleft"), Z("math", K, et, "∴", "\\therefore", !0), Z("math", K, et, "∍", "\\backepsilon"), Z("math", K, et, "▶", "\\blacktriangleright"), Z("math", K, et, "∵", "\\because", !0), Z("math", K, et, "⋘", "\\llless"), Z("math", K, et, "⋙", "\\gggtr"), Z("math", K, J, "⊲", "\\lhd"), Z("math", K, J, "⊳", "\\rhd"), Z("math", K, et, "≂", "\\eqsim", !0), Z("math", j, et, "⋈", "\\Join"), Z("math", K, et, "≑", "\\Doteq", !0), Z("math", K, J, "∔", "\\dotplus", !0), Z("math", K, J, "∖", "\\smallsetminus"), Z("math", K, J, "⋒", "\\Cap", !0), Z("math", K, J, "⋓", "\\Cup", !0), Z("math", K, J, "⩞", "\\doublebarwedge", !0), Z("math", K, J, "⊟", "\\boxminus", !0), Z("math", K, J, "⊞", "\\boxplus", !0), Z("math", K, J, "⋇", "\\divideontimes", !0), Z("math", K, J, "⋉", "\\ltimes", !0), Z("math", K, J, "⋊", "\\rtimes", !0), Z("math", K, J, "⋋", "\\leftthreetimes", !0), Z("math", K, J, "⋌", "\\rightthreetimes", !0), Z("math", K, J, "⋏", "\\curlywedge", !0), Z("math", K, J, "⋎", "\\curlyvee", !0), Z("math", K, J, "⊝", "\\circleddash", !0), Z("math", K, J, "⊛", "\\circledast", !0), Z("math", K, J, "⋅", "\\centerdot"), Z("math", K, J, "⊺", "\\intercal", !0), Z("math", K, J, "⋒", "\\doublecap"), Z("math", K, J, "⋓", "\\doublecup"), Z("math", K, J, "⊠", "\\boxtimes", !0), Z("math", K, et, "⇢", "\\dashrightarrow", !0), Z("math", K, et, "⇠", "\\dashleftarrow", !0), Z("math", K, et, "⇇", "\\leftleftarrows", !0), Z("math", K, et, "⇆", "\\leftrightarrows", !0), Z("math", K, et, "⇚", "\\Lleftarrow", !0), Z("math", K, et, "↞", "\\twoheadleftarrow", !0), Z("math", K, et, "↢", "\\leftarrowtail", !0), Z("math", K, et, "↫", "\\looparrowleft", !0), Z("math", K, et, "⇋", "\\leftrightharpoons", !0), Z("math", K, et, "↶", "\\curvearrowleft", !0), Z("math", K, et, "↺", "\\circlearrowleft", !0), Z("math", K, et, "↰", "\\Lsh", !0), Z("math", K, et, "⇈", "\\upuparrows", !0), Z("math", K, et, "↿", "\\upharpoonleft", !0), Z("math", K, et, "⇃", "\\downharpoonleft", !0), Z("math", K, et, "⊸", "\\multimap", !0), Z("math", K, et, "↭", "\\leftrightsquigarrow", !0), Z("math", K, et, "⇉", "\\rightrightarrows", !0), Z("math", K, et, "⇄", "\\rightleftarrows", !0), Z("math", K, et, "↠", "\\twoheadrightarrow", !0), Z("math", K, et, "↣", "\\rightarrowtail", !0), Z("math", K, et, "↬", "\\looparrowright", !0), Z("math", K, et, "↷", "\\curvearrowright", !0), Z("math", K, et, "↻", "\\circlearrowright", !0), Z("math", K, et, "↱", "\\Rsh", !0), Z("math", K, et, "⇊", "\\downdownarrows", !0), Z("math", K, et, "↾", "\\upharpoonright", !0), Z("math", K, et, "⇂", "\\downharpoonright", !0), Z("math", K, et, "⇝", "\\rightsquigarrow", !0), Z("math", K, et, "⇝", "\\leadsto"), Z("math", K, et, "⇛", "\\Rrightarrow", !0), Z("math", K, et, "↾", "\\restriction"), Z("math", j, "textord", "‘", "`"), Z("math", j, "textord", "$", "\\$"), Z("text", j, "textord", "$", "\\$"), Z("text", j, "textord", "$", "\\textdollar"), Z("math", j, "textord", "%", "\\%"), Z("text", j, "textord", "%", "\\%"), Z("math", j, "textord", "_", "\\_"), Z("text", j, "textord", "_", "\\_"), Z("text", j, "textord", "_", "\\textunderscore"), Z("math", j, "textord", "∠", "\\angle", !0), Z("math", j, "textord", "∞", "\\infty", !0), Z("math", j, "textord", "′", "\\prime"), Z("math", j, "textord", "△", "\\triangle"), Z("math", j, "textord", "Γ", "\\Gamma", !0), Z("math", j, "textord", "Δ", "\\Delta", !0), Z("math", j, "textord", "Θ", "\\Theta", !0), Z("math", j, "textord", "Λ", "\\Lambda", !0), Z("math", j, "textord", "Ξ", "\\Xi", !0), Z("math", j, "textord", "Π", "\\Pi", !0), Z("math", j, "textord", "Σ", "\\Sigma", !0), Z("math", j, "textord", "Υ", "\\Upsilon", !0), Z("math", j, "textord", "Φ", "\\Phi", !0), Z("math", j, "textord", "Ψ", "\\Psi", !0), Z("math", j, "textord", "Ω", "\\Omega", !0), Z("math", j, "textord", "A", "Α"), Z("math", j, "textord", "B", "Β"), Z("math", j, "textord", "E", "Ε"), Z("math", j, "textord", "Z", "Ζ"), Z("math", j, "textord", "H", "Η"), Z("math", j, "textord", "I", "Ι"), Z("math", j, "textord", "K", "Κ"), Z("math", j, "textord", "M", "Μ"), Z("math", j, "textord", "N", "Ν"), Z("math", j, "textord", "O", "Ο"), Z("math", j, "textord", "P", "Ρ"), Z("math", j, "textord", "T", "Τ"), Z("math", j, "textord", "X", "Χ"), Z("math", j, "textord", "¬", "\\neg", !0), Z("math", j, "textord", "¬", "\\lnot"), Z("math", j, "textord", "⊤", "\\top"), Z("math", j, "textord", "⊥", "\\bot"), Z("math", j, "textord", "∅", "\\emptyset"), Z("math", K, "textord", "∅", "\\varnothing"), Z("math", j, Q, "α", "\\alpha", !0), Z("math", j, Q, "β", "\\beta", !0), Z("math", j, Q, "γ", "\\gamma", !0), Z("math", j, Q, "δ", "\\delta", !0), Z("math", j, Q, "ϵ", "\\epsilon", !0), Z("math", j, Q, "ζ", "\\zeta", !0), Z("math", j, Q, "η", "\\eta", !0), Z("math", j, Q, "θ", "\\theta", !0), Z("math", j, Q, "ι", "\\iota", !0), Z("math", j, Q, "κ", "\\kappa", !0), Z("math", j, Q, "λ", "\\lambda", !0), Z("math", j, Q, "μ", "\\mu", !0), Z("math", j, Q, "ν", "\\nu", !0), Z("math", j, Q, "ξ", "\\xi", !0), Z("math", j, Q, "ο", "\\omicron", !0), Z("math", j, Q, "π", "\\pi", !0), Z("math", j, Q, "ρ", "\\rho", !0), Z("math", j, Q, "σ", "\\sigma", !0), Z("math", j, Q, "τ", "\\tau", !0), Z("math", j, Q, "υ", "\\upsilon", !0), Z("math", j, Q, "ϕ", "\\phi", !0), Z("math", j, Q, "χ", "\\chi", !0), Z("math", j, Q, "ψ", "\\psi", !0), Z("math", j, Q, "ω", "\\omega", !0), Z("math", j, Q, "ε", "\\varepsilon", !0), Z("math", j, Q, "ϑ", "\\vartheta", !0), Z("math", j, Q, "ϖ", "\\varpi", !0), Z("math", j, Q, "ϱ", "\\varrho", !0), Z("math", j, Q, "ς", "\\varsigma", !0), Z("math", j, Q, "φ", "\\varphi", !0), Z("math", j, J, "∗", "*"), Z("math", j, J, "+", "+"), Z("math", j, J, "−", "-"), Z("math", j, J, "⋅", "\\cdot", !0), Z("math", j, J, "∘", "\\circ"), Z("math", j, J, "÷", "\\div", !0), Z("math", j, J, "±", "\\pm", !0), Z("math", j, J, "×", "\\times", !0), Z("math", j, J, "∩", "\\cap", !0), Z("math", j, J, "∪", "\\cup", !0), Z("math", j, J, "∖", "\\setminus"), Z("math", j, J, "∧", "\\land"), Z("math", j, J, "∨", "\\lor"), Z("math", j, J, "∧", "\\wedge", !0), Z("math", j, J, "∨", "\\vee", !0), Z("math", j, "textord", "√", "\\surd"), Z("math", j, "open", "(", "("), Z("math", j, "open", "[", "["), Z("math", j, "open", "⟨", "\\langle", !0), Z("math", j, "open", "∣", "\\lvert"), Z("math", j, "open", "∥", "\\lVert"), Z("math", j, "close", ")", ")"), Z("math", j, "close", "]", "]"), Z("math", j, "close", "?", "?"), Z("math", j, "close", "!", "!"), Z("math", j, "close", "⟩", "\\rangle", !0), Z("math", j, "close", "∣", "\\rvert"), Z("math", j, "close", "∥", "\\rVert"), Z("math", j, et, "=", "="), Z("math", j, et, "<", "<"), Z("math", j, et, ">", ">"), Z("math", j, et, ":", ":"), Z("math", j, et, "≈", "\\approx", !0), Z("math", j, et, "≅", "\\cong", !0), Z("math", j, et, "≥", "\\ge"), Z("math", j, et, "≥", "\\geq", !0), Z("math", j, et, "←", "\\gets"), Z("math", j, et, ">", "\\gt"), Z("math", j, et, "∈", "\\in", !0), Z("math", j, et, "", "\\@not"), Z("math", j, et, "⊂", "\\subset", !0), Z("math", j, et, "⊃", "\\supset", !0), Z("math", j, et, "⊆", "\\subseteq", !0), Z("math", j, et, "⊇", "\\supseteq", !0), Z("math", K, et, "⊈", "\\nsubseteq", !0), Z("math", K, et, "⊉", "\\nsupseteq", !0), Z("math", j, et, "⊨", "\\models"), Z("math", j, et, "←", "\\leftarrow", !0), Z("math", j, et, "≤", "\\le"), Z("math", j, et, "≤", "\\leq", !0), Z("math", j, et, "<", "\\lt"), Z("math", j, et, "→", "\\rightarrow", !0), Z("math", j, et, "→", "\\to"), Z("math", K, et, "≱", "\\ngeq", !0), Z("math", K, et, "≰", "\\nleq", !0), Z("math", j, "spacing", " ", "\\ "), Z("math", j, "spacing", " ", "~"), Z("math", j, "spacing", " ", "\\space"), Z("math", j, "spacing", " ", "\\nobreakspace"), Z("text", j, "spacing", " ", "\\ "), Z("text", j, "spacing", " ", "~"), Z("text", j, "spacing", " ", "\\space"), Z("text", j, "spacing", " ", "\\nobreakspace"), Z("math", j, "spacing", null, "\\nobreak"), Z("math", j, "spacing", null, "\\allowbreak"), Z("math", j, "punct", ",", ","), Z("math", j, "punct", ";", ";"), Z("math", K, J, "⊼", "\\barwedge", !0), Z("math", K, J, "⊻", "\\veebar", !0), Z("math", j, J, "⊙", "\\odot", !0), Z("math", j, J, "⊕", "\\oplus", !0), Z("math", j, J, "⊗", "\\otimes", !0), Z("math", j, "textord", "∂", "\\partial", !0), Z("math", j, J, "⊘", "\\oslash", !0), Z("math", K, J, "⊚", "\\circledcirc", !0), Z("math", K, J, "⊡", "\\boxdot", !0), Z("math", j, J, "△", "\\bigtriangleup"), Z("math", j, J, "▽", "\\bigtriangledown"), Z("math", j, J, "†", "\\dagger"), Z("math", j, J, "⋄", "\\diamond"), Z("math", j, J, "⋆", "\\star"), Z("math", j, J, "◃", "\\triangleleft"), Z("math", j, J, "▹", "\\triangleright"), Z("math", j, "open", "{", "\\{"), Z("text", j, "textord", "{", "\\{"), Z("text", j, "textord", "{", "\\textbraceleft"), Z("math", j, "close", "}", "\\}"), Z("text", j, "textord", "}", "\\}"), Z("text", j, "textord", "}", "\\textbraceright"), Z("math", j, "open", "{", "\\lbrace"), Z("math", j, "close", "}", "\\rbrace"), Z("math", j, "open", "[", "\\lbrack"), Z("text", j, "textord", "[", "\\lbrack"), Z("math", j, "close", "]", "\\rbrack"), Z("text", j, "textord", "]", "\\rbrack"), Z("math", j, "open", "(", "\\lparen"), Z("math", j, "close", ")", "\\rparen"), Z("text", j, "textord", "<", "\\textless"), Z("text", j, "textord", ">", "\\textgreater"), Z("math", j, "open", "⌊", "\\lfloor", !0), Z("math", j, "close", "⌋", "\\rfloor", !0), Z("math", j, "open", "⌈", "\\lceil", !0), Z("math", j, "close", "⌉", "\\rceil", !0), Z("math", j, "textord", "\\", "\\backslash"), Z("math", j, "textord", "∣", "|"), Z("math", j, "textord", "∣", "\\vert"), Z("text", j, "textord", "|", "\\textbar"), Z("math", j, "textord", "∥", "\\|"), Z("math", j, "textord", "∥", "\\Vert"), Z("text", j, "textord", "∥", "\\textbardbl"), Z("text", j, "textord", "~", "\\textasciitilde"), Z("text", j, "textord", "\\", "\\textbackslash"), Z("text", j, "textord", "^", "\\textasciicircum"), Z("math", j, et, "↑", "\\uparrow", !0), Z("math", j, et, "⇑", "\\Uparrow", !0), Z("math", j, et, "↓", "\\downarrow", !0), Z("math", j, et, "⇓", "\\Downarrow", !0), Z("math", j, et, "↕", "\\updownarrow", !0), Z("math", j, et, "⇕", "\\Updownarrow", !0), Z("math", j, tt, "∐", "\\coprod"), Z("math", j, tt, "⋁", "\\bigvee"), Z("math", j, tt, "⋀", "\\bigwedge"), Z("math", j, tt, "⨄", "\\biguplus"), Z("math", j, tt, "⋂", "\\bigcap"), Z("math", j, tt, "⋃", "\\bigcup"), Z("math", j, tt, "∫", "\\int"), Z("math", j, tt, "∫", "\\intop"), Z("math", j, tt, "∬", "\\iint"), Z("math", j, tt, "∭", "\\iiint"), Z("math", j, tt, "∏", "\\prod"), Z("math", j, tt, "∑", "\\sum"), Z("math", j, tt, "⨂", "\\bigotimes"), Z("math", j, tt, "⨁", "\\bigoplus"), Z("math", j, tt, "⨀", "\\bigodot"), Z("math", j, tt, "∮", "\\oint"), Z("math", j, tt, "∯", "\\oiint"), Z("math", j, tt, "∰", "\\oiiint"), Z("math", j, tt, "⨆", "\\bigsqcup"), Z("math", j, tt, "∫", "\\smallint"), Z("text", j, "inner", "…", "\\textellipsis"), Z("math", j, "inner", "…", "\\mathellipsis"), Z("text", j, "inner", "…", "\\ldots", !0), Z("math", j, "inner", "…", "\\ldots", !0), Z("math", j, "inner", "⋯", "\\@cdots", !0), Z("math", j, "inner", "⋱", "\\ddots", !0), Z("math", j, "textord", "⋮", "\\varvdots"), Z("math", j, "accent-token", "ˊ", "\\acute"), Z("math", j, "accent-token", "ˋ", "\\grave"), Z("math", j, "accent-token", "¨", "\\ddot"), Z("math", j, "accent-token", "~", "\\tilde"), Z("math", j, "accent-token", "ˉ", "\\bar"), Z("math", j, "accent-token", "˘", "\\breve"), Z("math", j, "accent-token", "ˇ", "\\check"), Z("math", j, "accent-token", "^", "\\hat"), Z("math", j, "accent-token", "⃗", "\\vec"), Z("math", j, "accent-token", "˙", "\\dot"), Z("math", j, "accent-token", "˚", "\\mathring"), Z("math", j, Q, "ı", "\\imath", !0), Z("math", j, Q, "ȷ", "\\jmath", !0), Z("text", j, "textord", "ı", "\\i", !0), Z("text", j, "textord", "ȷ", "\\j", !0), Z("text", j, "textord", "ß", "\\ss", !0), Z("text", j, "textord", "æ", "\\ae", !0), Z("text", j, "textord", "æ", "\\ae", !0), Z("text", j, "textord", "œ", "\\oe", !0), Z("text", j, "textord", "ø", "\\o", !0), Z("text", j, "textord", "Æ", "\\AE", !0), Z("text", j, "textord", "Œ", "\\OE", !0), Z("text", j, "textord", "Ø", "\\O", !0), Z("text", j, "accent-token", "ˊ", "\\'"), Z("text", j, "accent-token", "ˋ", "\\`"), Z("text", j, "accent-token", "ˆ", "\\^"), Z("text", j, "accent-token", "˜", "\\~"), Z("text", j, "accent-token", "ˉ", "\\="), Z("text", j, "accent-token", "˘", "\\u"), Z("text", j, "accent-token", "˙", "\\."), Z("text", j, "accent-token", "˚", "\\r"), Z("text", j, "accent-token", "ˇ", "\\v"), Z("text", j, "accent-token", "¨", '\\"'), Z("text", j, "accent-token", "˝", "\\H"), Z("text", j, "accent-token", "◯", "\\textcircled");
                    var rt = {
                        "--": !0,
                        "---": !0,
                        "``": !0,
                        "''": !0
                    };
                    Z("text", j, "textord", "–", "--"), Z("text", j, "textord", "–", "\\textendash"), Z("text", j, "textord", "—", "---"), Z("text", j, "textord", "—", "\\textemdash"), Z("text", j, "textord", "‘", "`"), Z("text", j, "textord", "‘", "\\textquoteleft"), Z("text", j, "textord", "’", "'"), Z("text", j, "textord", "’", "\\textquoteright"), Z("text", j, "textord", "“", "``"), Z("text", j, "textord", "“", "\\textquotedblleft"), Z("text", j, "textord", "”", "''"), Z("text", j, "textord", "”", "\\textquotedblright"), Z("math", j, "textord", "°", "\\degree", !0), Z("text", j, "textord", "°", "\\degree"), Z("text", j, "textord", "°", "\\textdegree", !0), Z("math", j, Q, "£", "\\pounds"), Z("math", j, Q, "£", "\\mathsterling", !0), Z("text", j, Q, "£", "\\pounds"), Z("text", j, Q, "£", "\\textsterling", !0), Z("math", K, "textord", "✠", "\\maltese"), Z("text", K, "textord", "✠", "\\maltese"), Z("text", j, "spacing", " ", "\\ "), Z("text", j, "spacing", " ", " "), Z("text", j, "spacing", " ", "~");
                    for (var at = 0; at < '0123456789/@."'.length; at++) {
                        var nt = '0123456789/@."'.charAt(at);
                        Z("math", j, "textord", nt, nt)
                    }
                    for (var ot = 0; ot < '0123456789!@*()-=+[]<>|";:?/.,'.length; ot++) {
                        var it = '0123456789!@*()-=+[]<>|";:?/.,'.charAt(ot);
                        Z("text", j, "textord", it, it)
                    }
                    for (var st = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", lt = 0; lt < st.length; lt++) {
                        var ht = st.charAt(lt);
                        Z("math", j, Q, ht, ht), Z("text", j, "textord", ht, ht)
                    }
                    Z("math", K, "textord", "C", "ℂ"), Z("text", K, "textord", "C", "ℂ"), Z("math", K, "textord", "H", "ℍ"), Z("text", K, "textord", "H", "ℍ"), Z("math", K, "textord", "N", "ℕ"), Z("text", K, "textord", "N", "ℕ"), Z("math", K, "textord", "P", "ℙ"), Z("text", K, "textord", "P", "ℙ"), Z("math", K, "textord", "Q", "ℚ"), Z("text", K, "textord", "Q", "ℚ"), Z("math", K, "textord", "R", "ℝ"), Z("text", K, "textord", "R", "ℝ"), Z("math", K, "textord", "Z", "ℤ"), Z("text", K, "textord", "Z", "ℤ"), Z("math", j, Q, "h", "ℎ"), Z("text", j, Q, "h", "ℎ");
                    for (var mt = "", ct = 0; ct < st.length; ct++) {
                        var ut = st.charAt(ct);
                        Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56320 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56372 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56424 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56580 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56736 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56788 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56840 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56944 + ct)), Z("text", j, "textord", ut, mt), ct < 26 && (Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56632 + ct)), Z("text", j, "textord", ut, mt), Z("math", j, Q, ut, mt = String.fromCharCode(55349, 56476 + ct)), Z("text", j, "textord", ut, mt))
                    }
                    Z("math", j, Q, "k", mt = String.fromCharCode(55349, 56668)), Z("text", j, "textord", "k", mt);
                    for (var pt = 0; pt < 10; pt++) {
                        var dt = pt.toString();
                        Z("math", j, Q, dt, mt = String.fromCharCode(55349, 57294 + pt)), Z("text", j, "textord", dt, mt), Z("math", j, Q, dt, mt = String.fromCharCode(55349, 57314 + pt)), Z("text", j, "textord", dt, mt), Z("math", j, Q, dt, mt = String.fromCharCode(55349, 57324 + pt)), Z("text", j, "textord", dt, mt), Z("math", j, Q, dt, mt = String.fromCharCode(55349, 57334 + pt)), Z("text", j, "textord", dt, mt)
                    }
                    for (var ft = 0; ft < "ÇÐÞçþ".length; ft++) {
                        var gt = "ÇÐÞçþ".charAt(ft);
                        Z("math", j, Q, gt, gt), Z("text", j, "textord", gt, gt)
                    }
                    Z("text", j, "textord", "ð", "ð"), Z("text", j, "textord", "–", "–"), Z("text", j, "textord", "—", "—"), Z("text", j, "textord", "‘", "‘"), Z("text", j, "textord", "’", "’"), Z("text", j, "textord", "“", "“"), Z("text", j, "textord", "”", "”");
                    var xt = [
                            ["mathbf", "textbf", "Main-Bold"],
                            ["mathbf", "textbf", "Main-Bold"],
                            ["mathdefault", "textit", "Math-Italic"],
                            ["mathdefault", "textit", "Math-Italic"],
                            ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
                            ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
                            ["mathscr", "textscr", "Script-Regular"],
                            ["", "", ""],
                            ["", "", ""],
                            ["", "", ""],
                            ["mathfrak", "textfrak", "Fraktur-Regular"],
                            ["mathfrak", "textfrak", "Fraktur-Regular"],
                            ["mathbb", "textbb", "AMS-Regular"],
                            ["mathbb", "textbb", "AMS-Regular"],
                            ["", "", ""],
                            ["", "", ""],
                            ["mathsf", "textsf", "SansSerif-Regular"],
                            ["mathsf", "textsf", "SansSerif-Regular"],
                            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
                            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
                            ["mathitsf", "textitsf", "SansSerif-Italic"],
                            ["mathitsf", "textitsf", "SansSerif-Italic"],
                            ["", "", ""],
                            ["", "", ""],
                            ["mathtt", "texttt", "Typewriter-Regular"],
                            ["mathtt", "texttt", "Typewriter-Regular"]
                        ],
                        vt = [
                            ["mathbf", "textbf", "Main-Bold"],
                            ["", "", ""],
                            ["mathsf", "textsf", "SansSerif-Regular"],
                            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
                            ["mathtt", "texttt", "Typewriter-Regular"]
                        ],
                        bt = [
                            [1, 1, 1],
                            [2, 1, 1],
                            [3, 1, 1],
                            [4, 2, 1],
                            [5, 2, 1],
                            [6, 3, 1],
                            [7, 4, 2],
                            [8, 6, 3],
                            [9, 7, 6],
                            [10, 8, 7],
                            [11, 10, 9]
                        ],
                        yt = [.5, .6, .7, .8, .9, 1, 1.2, 1.44, 1.728, 2.074, 2.488],
                        wt = function (t, e) {
                            return e.size < 2 ? t : bt[t - 1][e.size - 1]
                        },
                        kt = function () {
                            function t(e) {
                                this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || t.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = yt[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0
                            }
                            var e = t.prototype;
                            return e.extend = function (e) {
                                var r = {
                                    style: this.style,
                                    size: this.size,
                                    textSize: this.textSize,
                                    color: this.color,
                                    phantom: this.phantom,
                                    font: this.font,
                                    fontFamily: this.fontFamily,
                                    fontWeight: this.fontWeight,
                                    fontShape: this.fontShape,
                                    maxSize: this.maxSize,
                                    minRuleThickness: this.minRuleThickness
                                };
                                for (var a in e) e.hasOwnProperty(a) && (r[a] = e[a]);
                                return new t(r)
                            }, e.havingStyle = function (t) {
                                return this.style === t ? this : this.extend({
                                    style: t,
                                    size: wt(this.textSize, t)
                                })
                            }, e.havingCrampedStyle = function () {
                                return this.havingStyle(this.style.cramp())
                            }, e.havingSize = function (t) {
                                return this.size === t && this.textSize === t ? this : this.extend({
                                    style: this.style.text(),
                                    size: t,
                                    textSize: t,
                                    sizeMultiplier: yt[t - 1]
                                })
                            }, e.havingBaseStyle = function (e) {
                                e = e || this.style.text();
                                var r = wt(t.BASESIZE, e);
                                return this.size === r && this.textSize === t.BASESIZE && this.style === e ? this : this.extend({
                                    style: e,
                                    size: r
                                })
                            }, e.havingBaseSizing = function () {
                                var t;
                                switch (this.style.id) {
                                    case 4:
                                    case 5:
                                        t = 3;
                                        break;
                                    case 6:
                                    case 7:
                                        t = 1;
                                        break;
                                    default:
                                        t = 6
                                }
                                return this.extend({
                                    style: this.style.text(),
                                    size: t
                                })
                            }, e.withColor = function (t) {
                                return this.extend({
                                    color: t
                                })
                            }, e.withPhantom = function () {
                                return this.extend({
                                    phantom: !0
                                })
                            }, e.withFont = function (t) {
                                return this.extend({
                                    font: t
                                })
                            }, e.withTextFontFamily = function (t) {
                                return this.extend({
                                    fontFamily: t,
                                    font: ""
                                })
                            }, e.withTextFontWeight = function (t) {
                                return this.extend({
                                    fontWeight: t,
                                    font: ""
                                })
                            }, e.withTextFontShape = function (t) {
                                return this.extend({
                                    fontShape: t,
                                    font: ""
                                })
                            }, e.sizingClasses = function (t) {
                                return t.size !== this.size ? ["sizing", "reset-size" + t.size, "size" + this.size] : []
                            }, e.baseSizingClasses = function () {
                                return this.size !== t.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + t.BASESIZE] : []
                            }, e.fontMetrics = function () {
                                return this._fontMetrics || (this._fontMetrics = function (t) {
                                    var e;
                                    if (!V[e = t >= 5 ? 0 : t >= 3 ? 1 : 2]) {
                                        var r = V[e] = {
                                            cssEmPerMu: H.quad[e] / 18
                                        };
                                        for (var a in H) H.hasOwnProperty(a) && (r[a] = H[a][e])
                                    }
                                    return V[e]
                                }(this.size)), this._fontMetrics
                            }, e.getColor = function () {
                                return this.phantom ? "transparent" : this.color
                            }, t
                        }();
                    kt.BASESIZE = 6;
                    var St = kt,
                        zt = {
                            pt: 1,
                            mm: 7227 / 2540,
                            cm: 7227 / 254,
                            in: 72.27,
                            bp: 1.00375,
                            pc: 12,
                            dd: 1238 / 1157,
                            cc: 14856 / 1157,
                            nd: 685 / 642,
                            nc: 1370 / 107,
                            sp: 1 / 65536,
                            px: 1.00375
                        },
                        Mt = {
                            ex: !0,
                            em: !0,
                            mu: !0
                        },
                        _t = function (t) {
                            return "string" != typeof t && (t = t.unit), t in zt || t in Mt || "ex" === t
                        },
                        At = function (t, e) {
                            var r;
                            if (t.unit in zt) r = zt[t.unit] / e.fontMetrics().ptPerEm / e.sizeMultiplier;
                            else if ("mu" === t.unit) r = e.fontMetrics().cssEmPerMu;
                            else {
                                var a;
                                if (a = e.style.isTight() ? e.havingStyle(e.style.text()) : e, "ex" === t.unit) r = a.fontMetrics().xHeight;
                                else {
                                    if ("em" !== t.unit) throw new i("Invalid unit: '" + t.unit + "'");
                                    r = a.fontMetrics().quad
                                }
                                a !== e && (r *= a.sizeMultiplier / e.sizeMultiplier)
                            }
                            return Math.min(t.number * r, e.maxSize)
                        },
                        Tt = ["\\imath", "ı", "\\jmath", "ȷ", "\\pounds", "\\mathsterling", "\\textsterling", "£"],
                        qt = function (t, e, r) {
                            return Y[r][t] && Y[r][t].replace && (t = Y[r][t].replace), {
                                value: t,
                                metrics: G(t, e, r)
                            }
                        },
                        Bt = function (t, e, r, a, n) {
                            var o, i = qt(t, e, r),
                                s = i.metrics;
                            if (t = i.value, s) {
                                var l = s.italic;
                                ("text" === r || a && "mathit" === a.font) && (l = 0), o = new $(t, s.height, s.depth, l, s.skew, s.width, n)
                            } else "undefined" != typeof console && console.warn("No character metrics for '" + t + "' in style '" + e + "' and mode '" + r + "'"), o = new $(t, 0, 0, 0, 0, 0, n);
                            if (a) {
                                o.maxFontSize = a.sizeMultiplier, a.style.isTight() && o.classes.push("mtight");
                                var h = a.getColor();
                                h && (o.style.color = h)
                            }
                            return o
                        },
                        Ct = function (t, e) {
                            if (A(t.classes) !== A(e.classes) || t.skew !== e.skew || t.maxFontSize !== e.maxFontSize) return !1;
                            for (var r in t.style)
                                if (t.style.hasOwnProperty(r) && t.style[r] !== e.style[r]) return !1;
                            for (var a in e.style)
                                if (e.style.hasOwnProperty(a) && t.style[a] !== e.style[a]) return !1;
                            return !0
                        },
                        Nt = function (t) {
                            for (var e = 0, r = 0, a = 0, n = 0; n < t.children.length; n++) {
                                var o = t.children[n];
                                o.height > e && (e = o.height), o.depth > r && (r = o.depth), o.maxFontSize > a && (a = o.maxFontSize)
                            }
                            t.height = e, t.depth = r, t.maxFontSize = a
                        },
                        Ot = function (t, e, r, a) {
                            var n = new C(t, e, r, a);
                            return Nt(n), n
                        },
                        It = function (t, e, r, a) {
                            return new C(t, e, r, a)
                        },
                        $t = function (t) {
                            var e = new _(t);
                            return Nt(e), e
                        },
                        Et = function (t, e, r) {
                            var a = "";
                            switch (t) {
                                case "amsrm":
                                    a = "AMS";
                                    break;
                                case "textrm":
                                    a = "Main";
                                    break;
                                case "textsf":
                                    a = "SansSerif";
                                    break;
                                case "texttt":
                                    a = "Typewriter";
                                    break;
                                default:
                                    a = t
                            }
                            return a + "-" + ("textbf" === e && "textit" === r ? "BoldItalic" : "textbf" === e ? "Bold" : "textit" === e ? "Italic" : "Regular")
                        },
                        Rt = {
                            mathbf: {
                                variant: "bold",
                                fontName: "Main-Bold"
                            },
                            mathrm: {
                                variant: "normal",
                                fontName: "Main-Regular"
                            },
                            textit: {
                                variant: "italic",
                                fontName: "Main-Italic"
                            },
                            mathit: {
                                variant: "italic",
                                fontName: "Main-Italic"
                            },
                            mathbb: {
                                variant: "double-struck",
                                fontName: "AMS-Regular"
                            },
                            mathcal: {
                                variant: "script",
                                fontName: "Caligraphic-Regular"
                            },
                            mathfrak: {
                                variant: "fraktur",
                                fontName: "Fraktur-Regular"
                            },
                            mathscr: {
                                variant: "script",
                                fontName: "Script-Regular"
                            },
                            mathsf: {
                                variant: "sans-serif",
                                fontName: "SansSerif-Regular"
                            },
                            mathtt: {
                                variant: "monospace",
                                fontName: "Typewriter-Regular"
                            }
                        },
                        Dt = {
                            vec: ["vec", .471, .714],
                            oiintSize1: ["oiintSize1", .957, .499],
                            oiintSize2: ["oiintSize2", 1.472, .659],
                            oiiintSize1: ["oiiintSize1", 1.304, .499],
                            oiiintSize2: ["oiiintSize2", 1.98, .659]
                        },
                        Lt = {
                            fontMap: Rt,
                            makeSymbol: Bt,
                            mathsym: function (t, e, r, a) {
                                return void 0 === a && (a = []), "boldsymbol" === r.font && qt(t, "Main-Bold", e).metrics ? Bt(t, "Main-Bold", e, r, a.concat(["mathbf"])) : "\\" === t || "main" === Y[e][t].font ? Bt(t, "Main-Regular", e, r, a) : Bt(t, "AMS-Regular", e, r, a.concat(["amsrm"]))
                            },
                            makeSpan: Ot,
                            makeSvgSpan: It,
                            makeLineSpan: function (t, e, r) {
                                var a = Ot([t], [], e);
                                return a.height = Math.max(r || e.fontMetrics().defaultRuleThickness, e.minRuleThickness), a.style.borderBottomWidth = a.height + "em", a.maxFontSize = 1, a
                            },
                            makeAnchor: function (t, e, r, a) {
                                var n = new N(t, e, r, a);
                                return Nt(n), n
                            },
                            makeFragment: $t,
                            wrapFragment: function (t, e) {
                                return t instanceof _ ? Ot([], [t], e) : t
                            },
                            makeVList: function (t, e) {
                                for (var r = function (t) {
                                        if ("individualShift" === t.positionType) {
                                            for (var e = t.children, r = [e[0]], a = -e[0].shift - e[0].elem.depth, n = a, o = 1; o < e.length; o++) {
                                                var i = -e[o].shift - n - e[o].elem.depth,
                                                    s = i - (e[o - 1].elem.height + e[o - 1].elem.depth);
                                                n += i, r.push({
                                                    type: "kern",
                                                    size: s
                                                }), r.push(e[o])
                                            }
                                            return {
                                                children: r,
                                                depth: a
                                            }
                                        }
                                        var l;
                                        if ("top" === t.positionType) {
                                            for (var h = t.positionData, m = 0; m < t.children.length; m++) {
                                                var c = t.children[m];
                                                h -= "kern" === c.type ? c.size : c.elem.height + c.elem.depth
                                            }
                                            l = h
                                        } else if ("bottom" === t.positionType) l = -t.positionData;
                                        else {
                                            var u = t.children[0];
                                            if ("elem" !== u.type) throw new Error('First child must have type "elem".');
                                            if ("shift" === t.positionType) l = -u.elem.depth - t.positionData;
                                            else {
                                                if ("firstBaseline" !== t.positionType) throw new Error("Invalid positionType " + t.positionType + ".");
                                                l = -u.elem.depth
                                            }
                                        }
                                        return {
                                            children: t.children,
                                            depth: l
                                        }
                                    }(t), a = r.children, n = r.depth, o = 0, i = 0; i < a.length; i++) {
                                    var s = a[i];
                                    if ("elem" === s.type) {
                                        var l = s.elem;
                                        o = Math.max(o, l.maxFontSize, l.height)
                                    }
                                }
                                o += 2;
                                var h = Ot(["pstrut"], []);
                                h.style.height = o + "em";
                                for (var m = [], c = n, u = n, p = n, d = 0; d < a.length; d++) {
                                    var f = a[d];
                                    if ("kern" === f.type) p += f.size;
                                    else {
                                        var g = f.elem,
                                            x = f.wrapperClasses || [],
                                            v = f.wrapperStyle || {},
                                            b = Ot(x, [h, g], void 0, v);
                                        b.style.top = -o - p - g.depth + "em", f.marginLeft && (b.style.marginLeft = f.marginLeft), f.marginRight && (b.style.marginRight = f.marginRight), m.push(b), p += g.height + g.depth
                                    }
                                    c = Math.min(c, p), u = Math.max(u, p)
                                }
                                var y, w = Ot(["vlist"], m);
                                if (w.style.height = u + "em", c < 0) {
                                    var k = Ot([], []),
                                        S = Ot(["vlist"], [k]);
                                    S.style.height = -c + "em";
                                    var z = Ot(["vlist-s"], [new $("​")]);
                                    y = [Ot(["vlist-r"], [w, z]), Ot(["vlist-r"], [S])]
                                } else y = [Ot(["vlist-r"], [w])];
                                var M = Ot(["vlist-t"], y);
                                return 2 === y.length && M.classes.push("vlist-t2"), M.height = u, M.depth = -c, M
                            },
                            makeOrd: function (t, e, r) {
                                var a, n = t.mode,
                                    o = t.text,
                                    s = ["mord"],
                                    l = "math" === n || "text" === n && e.font,
                                    h = l ? e.font : e.fontFamily;
                                if (55349 === o.charCodeAt(0)) {
                                    var m = function (t, e) {
                                            var r = 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536,
                                                a = "math" === e ? 0 : 1;
                                            if (119808 <= r && r < 120484) {
                                                var n = Math.floor((r - 119808) / 26);
                                                return [xt[n][2], xt[n][a]]
                                            }
                                            if (120782 <= r && r <= 120831) {
                                                var o = Math.floor((r - 120782) / 10);
                                                return [vt[o][2], vt[o][a]]
                                            }
                                            if (120485 === r || 120486 === r) return [xt[0][2], xt[0][a]];
                                            if (120486 < r && r < 120782) return ["", ""];
                                            throw new i("Unsupported character: " + t)
                                        }(o, n),
                                        u = m[0],
                                        p = m[1];
                                    return Bt(o, u, n, e, s.concat(p))
                                }
                                if (h) {
                                    var d, f;
                                    if ("boldsymbol" === h || "mathnormal" === h) {
                                        var g = "boldsymbol" === h ? function (t, e, r, a) {
                                            return qt(t, "Math-BoldItalic", e).metrics ? {
                                                fontName: "Math-BoldItalic",
                                                fontClass: "boldsymbol"
                                            } : {
                                                fontName: "Main-Bold",
                                                fontClass: "mathbf"
                                            }
                                        }(o, n) : (a = o, c.contains(Tt, a) ? {
                                            fontName: "Main-Italic",
                                            fontClass: "mathit"
                                        } : /[0-9]/.test(a.charAt(0)) ? {
                                            fontName: "Caligraphic-Regular",
                                            fontClass: "mathcal"
                                        } : {
                                            fontName: "Math-Italic",
                                            fontClass: "mathdefault"
                                        });
                                        d = g.fontName, f = [g.fontClass]
                                    } else c.contains(Tt, o) ? (d = "Main-Italic", f = ["mathit"]) : l ? (d = Rt[h].fontName, f = [h]) : (d = Et(h, e.fontWeight, e.fontShape), f = [h, e.fontWeight, e.fontShape]);
                                    if (qt(o, d, n).metrics) return Bt(o, d, n, e, s.concat(f));
                                    if (rt.hasOwnProperty(o) && "Typewriter" === d.substr(0, 10)) {
                                        for (var x = [], v = 0; v < o.length; v++) x.push(Bt(o[v], d, n, e, s.concat(f)));
                                        return $t(x)
                                    }
                                }
                                if ("mathord" === r) {
                                    var b = function (t, e, r, a) {
                                        return /[0-9]/.test(t.charAt(0)) || c.contains(Tt, t) ? {
                                            fontName: "Main-Italic",
                                            fontClass: "mathit"
                                        } : {
                                            fontName: "Math-Italic",
                                            fontClass: "mathdefault"
                                        }
                                    }(o);
                                    return Bt(o, b.fontName, n, e, s.concat([b.fontClass]))
                                }
                                if ("textord" === r) {
                                    var y = Y[n][o] && Y[n][o].font;
                                    if ("ams" === y) {
                                        var w = Et("amsrm", e.fontWeight, e.fontShape);
                                        return Bt(o, w, n, e, s.concat("amsrm", e.fontWeight, e.fontShape))
                                    }
                                    if ("main" !== y && y) {
                                        var k = Et(y, e.fontWeight, e.fontShape);
                                        return Bt(o, k, n, e, s.concat(k, e.fontWeight, e.fontShape))
                                    }
                                    var S = Et("textrm", e.fontWeight, e.fontShape);
                                    return Bt(o, S, n, e, s.concat(e.fontWeight, e.fontShape))
                                }
                                throw new Error("unexpected type: " + r + " in makeOrd")
                            },
                            makeGlue: function (t, e) {
                                var r = Ot(["mspace"], [], e),
                                    a = At(t, e);
                                return r.style.marginRight = a + "em", r
                            },
                            staticSvg: function (t, e) {
                                var r = Dt[t],
                                    a = r[0],
                                    n = r[1],
                                    o = r[2],
                                    i = new R(a),
                                    s = new E([i], {
                                        width: n + "em",
                                        height: o + "em",
                                        style: "width:" + n + "em",
                                        viewBox: "0 0 " + 1e3 * n + " " + 1e3 * o,
                                        preserveAspectRatio: "xMinYMin"
                                    }),
                                    l = It(["overlay"], [s], e);
                                return l.height = o, l.style.height = o + "em", l.style.width = n + "em", l
                            },
                            svgData: Dt,
                            tryCombineChars: function (t) {
                                for (var e = 0; e < t.length - 1; e++) {
                                    var r = t[e],
                                        a = t[e + 1];
                                    r instanceof $ && a instanceof $ && Ct(r, a) && (r.text += a.text, r.height = Math.max(r.height, a.height), r.depth = Math.max(r.depth, a.depth), r.italic = a.italic, t.splice(e + 1, 1), e--)
                                }
                                return t
                            }
                        };

                    function Pt(t, e) {
                        var r = Ht(t, e);
                        if (!r) throw new Error("Expected node of type " + e + ", but got " + (t ? "node of type " + t.type : String(t)));
                        return r
                    }

                    function Ht(t, e) {
                        return t && t.type === e ? t : null
                    }

                    function Ft(t, e) {
                        var r = function (t, e) {
                            return t && "atom" === t.type && t.family === e ? t : null
                        }(t, e);
                        if (!r) throw new Error('Expected node of type "atom" and family "' + e + '", but got ' + (t ? "atom" === t.type ? "atom of family " + t.family : "node of type " + t.type : String(t)));
                        return r
                    }

                    function Gt(t) {
                        var e = Vt(t);
                        if (!e) throw new Error("Expected node of symbol group type, but got " + (t ? "node of type " + t.type : String(t)));
                        return e
                    }

                    function Vt(t) {
                        return t && ("atom" === t.type || X.hasOwnProperty(t.type)) ? t : null
                    }
                    var Ut = {
                            number: 3,
                            unit: "mu"
                        },
                        Xt = {
                            number: 4,
                            unit: "mu"
                        },
                        Wt = {
                            number: 5,
                            unit: "mu"
                        },
                        Yt = {
                            mord: {
                                mop: Ut,
                                mbin: Xt,
                                mrel: Wt,
                                minner: Ut
                            },
                            mop: {
                                mord: Ut,
                                mop: Ut,
                                mrel: Wt,
                                minner: Ut
                            },
                            mbin: {
                                mord: Xt,
                                mop: Xt,
                                mopen: Xt,
                                minner: Xt
                            },
                            mrel: {
                                mord: Wt,
                                mop: Wt,
                                mopen: Wt,
                                minner: Wt
                            },
                            mopen: {},
                            mclose: {
                                mop: Ut,
                                mbin: Xt,
                                mrel: Wt,
                                minner: Ut
                            },
                            mpunct: {
                                mord: Ut,
                                mop: Ut,
                                mrel: Wt,
                                mopen: Ut,
                                mclose: Ut,
                                mpunct: Ut,
                                minner: Ut
                            },
                            minner: {
                                mord: Ut,
                                mop: Ut,
                                mbin: Xt,
                                mrel: Wt,
                                mopen: Ut,
                                mpunct: Ut,
                                minner: Ut
                            }
                        },
                        Zt = {
                            mord: {
                                mop: Ut
                            },
                            mop: {
                                mord: Ut,
                                mop: Ut
                            },
                            mbin: {},
                            mrel: {},
                            mopen: {},
                            mclose: {
                                mop: Ut
                            },
                            mpunct: {},
                            minner: {
                                mop: Ut
                            }
                        },
                        jt = {},
                        Kt = {},
                        Jt = {};

                    function Qt(t) {
                        for (var e = t.type, r = t.names, a = t.props, n = t.handler, o = t.htmlBuilder, i = t.mathmlBuilder, s = {
                                type: e,
                                numArgs: a.numArgs,
                                argTypes: a.argTypes,
                                greediness: void 0 === a.greediness ? 1 : a.greediness,
                                allowedInText: !!a.allowedInText,
                                allowedInMath: void 0 === a.allowedInMath || a.allowedInMath,
                                numOptionalArgs: a.numOptionalArgs || 0,
                                infix: !!a.infix,
                                handler: n
                            }, l = 0; l < r.length; ++l) jt[r[l]] = s;
                        e && (o && (Kt[e] = o), i && (Jt[e] = i))
                    }

                    function te(t) {
                        Qt({
                            type: t.type,
                            names: [],
                            props: {
                                numArgs: 0
                            },
                            handler: function () {
                                throw new Error("Should never be called.")
                            },
                            htmlBuilder: t.htmlBuilder,
                            mathmlBuilder: t.mathmlBuilder
                        })
                    }
                    var ee = function (t) {
                            var e = Ht(t, "ordgroup");
                            return e ? e.body : [t]
                        },
                        re = Lt.makeSpan,
                        ae = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"],
                        ne = ["rightmost", "mrel", "mclose", "mpunct"],
                        oe = {
                            display: w.DISPLAY,
                            text: w.TEXT,
                            script: w.SCRIPT,
                            scriptscript: w.SCRIPTSCRIPT
                        },
                        ie = {
                            mord: "mord",
                            mop: "mop",
                            mbin: "mbin",
                            mrel: "mrel",
                            mopen: "mopen",
                            mclose: "mclose",
                            mpunct: "mpunct",
                            minner: "minner"
                        },
                        se = function (t, e, r, a) {
                            void 0 === a && (a = [null, null]);
                            for (var n = [], o = 0; o < t.length; o++) {
                                var i = ue(t[o], e);
                                if (i instanceof _) {
                                    var s = i.children;
                                    n.push.apply(n, s)
                                } else n.push(i)
                            }
                            if (!r) return n;
                            var l = e;
                            if (1 === t.length) {
                                var h = Ht(t[0], "sizing") || Ht(t[0], "styling");
                                h && ("sizing" === h.type ? l = e.havingSize(h.size) : "styling" === h.type && (l = e.havingStyle(oe[h.style])))
                            }
                            var m = re([a[0] || "leftmost"], [], e),
                                u = re([a[1] || "rightmost"], [], e);
                            return le(n, (function (t, e) {
                                var r = e.classes[0],
                                    a = t.classes[0];
                                "mbin" === r && c.contains(ne, a) ? e.classes[0] = "mord" : "mbin" === a && c.contains(ae, r) && (t.classes[0] = "mord")
                            }), {
                                node: m
                            }, u), le(n, (function (t, e) {
                                var r = me(e),
                                    a = me(t),
                                    n = r && a ? t.hasClass("mtight") ? Zt[r][a] : Yt[r][a] : null;
                                if (n) return Lt.makeGlue(n, l)
                            }), {
                                node: m
                            }, u), n
                        },
                        le = function t(e, r, a, n) {
                            n && e.push(n);
                            for (var o = 0; o < e.length; o++) {
                                var i = e[o],
                                    s = he(i);
                                if (s) t(s.children, r, a);
                                else if ("mspace" !== i.classes[0]) {
                                    var l = r(i, a.node);
                                    l && (a.insertAfter ? a.insertAfter(l) : (e.unshift(l), o++)), a.node = i, a.insertAfter = function (t) {
                                        return function (r) {
                                            e.splice(t + 1, 0, r), o++
                                        }
                                    }(o)
                                }
                            }
                            n && e.pop()
                        },
                        he = function (t) {
                            return t instanceof _ || t instanceof N ? t : null
                        },
                        me = function (t, e) {
                            return t ? (e && (t = function t(e, r) {
                                var a = he(e);
                                if (a) {
                                    var n = a.children;
                                    if (n.length) {
                                        if ("right" === r) return t(n[n.length - 1], "right");
                                        if ("left" === r) return t(n[0], "left")
                                    }
                                }
                                return e
                            }(t, e)), ie[t.classes[0]] || null) : null
                        },
                        ce = function (t, e) {
                            var r = ["nulldelimiter"].concat(t.baseSizingClasses());
                            return re(e.concat(r))
                        },
                        ue = function (t, e, r) {
                            if (!t) return re();
                            if (Kt[t.type]) {
                                var a = Kt[t.type](t, e);
                                if (r && e.size !== r.size) {
                                    a = re(e.sizingClasses(r), [a], e);
                                    var n = e.sizeMultiplier / r.sizeMultiplier;
                                    a.height *= n, a.depth *= n
                                }
                                return a
                            }
                            throw new i("Got group of unknown type: '" + t.type + "'")
                        };

                    function pe(t, e) {
                        var r = re(["base"], t, e),
                            a = re(["strut"]);
                        return a.style.height = r.height + r.depth + "em", a.style.verticalAlign = -r.depth + "em", r.children.unshift(a), r
                    }

                    function de(t, e) {
                        var r = null;
                        1 === t.length && "tag" === t[0].type && (r = t[0].tag, t = t[0].body);
                        for (var a, n = se(t, e, !0), o = [], i = [], s = 0; s < n.length; s++)
                            if (i.push(n[s]), n[s].hasClass("mbin") || n[s].hasClass("mrel") || n[s].hasClass("allowbreak")) {
                                for (var l = !1; s < n.length - 1 && n[s + 1].hasClass("mspace") && !n[s + 1].hasClass("newline");) s++, i.push(n[s]), n[s].hasClass("nobreak") && (l = !0);
                                l || (o.push(pe(i, e)), i = [])
                            } else n[s].hasClass("newline") && (i.pop(), i.length > 0 && (o.push(pe(i, e)), i = []), o.push(n[s]));
                        i.length > 0 && o.push(pe(i, e)), r && ((a = pe(se(r, e, !0))).classes = ["tag"], o.push(a));
                        var h = re(["katex-html"], o);
                        if (h.setAttribute("aria-hidden", "true"), a) {
                            var m = a.children[0];
                            m.style.height = h.height + h.depth + "em", m.style.verticalAlign = -h.depth + "em"
                        }
                        return h
                    }

                    function fe(t) {
                        return new _(t)
                    }
                    var ge = function () {
                            function t(t, e) {
                                this.type = void 0, this.attributes = void 0, this.children = void 0, this.type = t, this.attributes = {}, this.children = e || []
                            }
                            var e = t.prototype;
                            return e.setAttribute = function (t, e) {
                                this.attributes[t] = e
                            }, e.getAttribute = function (t) {
                                return this.attributes[t]
                            }, e.toNode = function () {
                                var t = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
                                for (var e in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e) && t.setAttribute(e, this.attributes[e]);
                                for (var r = 0; r < this.children.length; r++) t.appendChild(this.children[r].toNode());
                                return t
                            }, e.toMarkup = function () {
                                var t = "<" + this.type;
                                for (var e in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, e) && (t += " " + e + '="', t += c.escape(this.attributes[e]), t += '"');
                                t += ">";
                                for (var r = 0; r < this.children.length; r++) t += this.children[r].toMarkup();
                                return t += "</" + this.type + ">"
                            }, e.toText = function () {
                                return this.children.map((function (t) {
                                    return t.toText()
                                })).join("")
                            }, t
                        }(),
                        xe = function () {
                            function t(t) {
                                this.text = void 0, this.text = t
                            }
                            var e = t.prototype;
                            return e.toNode = function () {
                                return document.createTextNode(this.text)
                            }, e.toMarkup = function () {
                                return c.escape(this.toText())
                            }, e.toText = function () {
                                return this.text
                            }, t
                        }(),
                        ve = {
                            MathNode: ge,
                            TextNode: xe,
                            SpaceNode: function () {
                                function t(t) {
                                    this.width = void 0, this.character = void 0, this.width = t, this.character = t >= .05555 && t <= .05556 ? " " : t >= .1666 && t <= .1667 ? " " : t >= .2222 && t <= .2223 ? " " : t >= .2777 && t <= .2778 ? "  " : t >= -.05556 && t <= -.05555 ? " ⁣" : t >= -.1667 && t <= -.1666 ? " ⁣" : t >= -.2223 && t <= -.2222 ? " ⁣" : t >= -.2778 && t <= -.2777 ? " ⁣" : null
                                }
                                var e = t.prototype;
                                return e.toNode = function () {
                                    if (this.character) return document.createTextNode(this.character);
                                    var t = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
                                    return t.setAttribute("width", this.width + "em"), t
                                }, e.toMarkup = function () {
                                    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + this.width + 'em"/>'
                                }, e.toText = function () {
                                    return this.character ? this.character : " "
                                }, t
                            }(),
                            newDocumentFragment: fe
                        },
                        be = function (t, e, r) {
                            return !Y[e][t] || !Y[e][t].replace || 55349 === t.charCodeAt(0) || rt.hasOwnProperty(t) && r && (r.fontFamily && "tt" === r.fontFamily.substr(4, 2) || r.font && "tt" === r.font.substr(4, 2)) || (t = Y[e][t].replace), new ve.TextNode(t)
                        },
                        ye = function (t) {
                            return 1 === t.length ? t[0] : new ve.MathNode("mrow", t)
                        },
                        we = function (t, e) {
                            if ("texttt" === e.fontFamily) return "monospace";
                            if ("textsf" === e.fontFamily) return "textit" === e.fontShape && "textbf" === e.fontWeight ? "sans-serif-bold-italic" : "textit" === e.fontShape ? "sans-serif-italic" : "textbf" === e.fontWeight ? "bold-sans-serif" : "sans-serif";
                            if ("textit" === e.fontShape && "textbf" === e.fontWeight) return "bold-italic";
                            if ("textit" === e.fontShape) return "italic";
                            if ("textbf" === e.fontWeight) return "bold";
                            var r = e.font;
                            if (!r || "mathnormal" === r) return null;
                            var a = t.mode;
                            if ("mathit" === r) return "italic";
                            if ("boldsymbol" === r) return "bold-italic";
                            if ("mathbf" === r) return "bold";
                            if ("mathbb" === r) return "double-struck";
                            if ("mathfrak" === r) return "fraktur";
                            if ("mathscr" === r || "mathcal" === r) return "script";
                            if ("mathsf" === r) return "sans-serif";
                            if ("mathtt" === r) return "monospace";
                            var n = t.text;
                            return c.contains(["\\imath", "\\jmath"], n) ? null : (Y[a][n] && Y[a][n].replace && (n = Y[a][n].replace), G(n, Lt.fontMap[r].fontName, a) ? Lt.fontMap[r].variant : null)
                        },
                        ke = function (t, e, r) {
                            if (1 === t.length) {
                                var a = ze(t[0], e);
                                return r && a instanceof ge && "mo" === a.type && (a.setAttribute("lspace", "0em"), a.setAttribute("rspace", "0em")), [a]
                            }
                            for (var n, o = [], i = 0; i < t.length; i++) {
                                var s = ze(t[i], e);
                                if (s instanceof ge && n instanceof ge) {
                                    if ("mtext" === s.type && "mtext" === n.type && s.getAttribute("mathvariant") === n.getAttribute("mathvariant")) {
                                        var l;
                                        (l = n.children).push.apply(l, s.children);
                                        continue
                                    }
                                    if ("mn" === s.type && "mn" === n.type) {
                                        var h;
                                        (h = n.children).push.apply(h, s.children);
                                        continue
                                    }
                                    if ("mi" === s.type && 1 === s.children.length && "mn" === n.type) {
                                        var m = s.children[0];
                                        if (m instanceof xe && "." === m.text) {
                                            var c;
                                            (c = n.children).push.apply(c, s.children);
                                            continue
                                        }
                                    } else if ("mi" === n.type && 1 === n.children.length) {
                                        var u = n.children[0];
                                        if (u instanceof xe && "̸" === u.text && ("mo" === s.type || "mi" === s.type || "mn" === s.type)) {
                                            var p = s.children[0];
                                            p instanceof xe && p.text.length > 0 && (p.text = p.text.slice(0, 1) + "̸" + p.text.slice(1), o.pop())
                                        }
                                    }
                                }
                                o.push(s), n = s
                            }
                            return o
                        },
                        Se = function (t, e, r) {
                            return ye(ke(t, e, r))
                        },
                        ze = function (t, e) {
                            if (!t) return new ve.MathNode("mrow");
                            if (Jt[t.type]) return Jt[t.type](t, e);
                            throw new i("Got group of unknown type: '" + t.type + "'")
                        };

                    function Me(t, e, r, a) {
                        var n, o = ke(t, r);
                        n = 1 === o.length && o[0] instanceof ge && c.contains(["mrow", "mtable"], o[0].type) ? o[0] : new ve.MathNode("mrow", o);
                        var i = new ve.MathNode("annotation", [new ve.TextNode(e)]);
                        i.setAttribute("encoding", "application/x-tex");
                        var s = new ve.MathNode("semantics", [n, i]),
                            l = new ve.MathNode("math", [s]);
                        l.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
                        var h = a ? "katex" : "katex-mathml";
                        return Lt.makeSpan([h], [l])
                    }
                    var _e = function (t) {
                            return new St({
                                style: t.displayMode ? w.DISPLAY : w.TEXT,
                                maxSize: t.maxSize,
                                minRuleThickness: t.minRuleThickness
                            })
                        },
                        Ae = function (t, e) {
                            if (e.displayMode) {
                                var r = ["katex-display"];
                                e.leqno && r.push("leqno"), e.fleqn && r.push("fleqn"), t = Lt.makeSpan(r, [t])
                            }
                            return t
                        },
                        Te = function (t, e, r) {
                            var a, n = _e(r);
                            if ("mathml" === r.output) return Me(t, e, n, !0);
                            if ("html" === r.output) {
                                var o = de(t, n);
                                a = Lt.makeSpan(["katex"], [o])
                            } else {
                                var i = Me(t, e, n, !1),
                                    s = de(t, n);
                                a = Lt.makeSpan(["katex"], [i, s])
                            }
                            return Ae(a, r)
                        },
                        qe = {
                            widehat: "^",
                            widecheck: "ˇ",
                            widetilde: "~",
                            utilde: "~",
                            overleftarrow: "←",
                            underleftarrow: "←",
                            xleftarrow: "←",
                            overrightarrow: "→",
                            underrightarrow: "→",
                            xrightarrow: "→",
                            underbrace: "⏟",
                            overbrace: "⏞",
                            overgroup: "⏠",
                            undergroup: "⏡",
                            overleftrightarrow: "↔",
                            underleftrightarrow: "↔",
                            xleftrightarrow: "↔",
                            Overrightarrow: "⇒",
                            xRightarrow: "⇒",
                            overleftharpoon: "↼",
                            xleftharpoonup: "↼",
                            overrightharpoon: "⇀",
                            xrightharpoonup: "⇀",
                            xLeftarrow: "⇐",
                            xLeftrightarrow: "⇔",
                            xhookleftarrow: "↩",
                            xhookrightarrow: "↪",
                            xmapsto: "↦",
                            xrightharpoondown: "⇁",
                            xleftharpoondown: "↽",
                            xrightleftharpoons: "⇌",
                            xleftrightharpoons: "⇋",
                            xtwoheadleftarrow: "↞",
                            xtwoheadrightarrow: "↠",
                            xlongequal: "=",
                            xtofrom: "⇄",
                            xrightleftarrows: "⇄",
                            xrightequilibrium: "⇌",
                            xleftequilibrium: "⇋"
                        },
                        Be = {
                            overrightarrow: [
                                ["rightarrow"], .888, 522, "xMaxYMin"
                            ],
                            overleftarrow: [
                                ["leftarrow"], .888, 522, "xMinYMin"
                            ],
                            underrightarrow: [
                                ["rightarrow"], .888, 522, "xMaxYMin"
                            ],
                            underleftarrow: [
                                ["leftarrow"], .888, 522, "xMinYMin"
                            ],
                            xrightarrow: [
                                ["rightarrow"], 1.469, 522, "xMaxYMin"
                            ],
                            xleftarrow: [
                                ["leftarrow"], 1.469, 522, "xMinYMin"
                            ],
                            Overrightarrow: [
                                ["doublerightarrow"], .888, 560, "xMaxYMin"
                            ],
                            xRightarrow: [
                                ["doublerightarrow"], 1.526, 560, "xMaxYMin"
                            ],
                            xLeftarrow: [
                                ["doubleleftarrow"], 1.526, 560, "xMinYMin"
                            ],
                            overleftharpoon: [
                                ["leftharpoon"], .888, 522, "xMinYMin"
                            ],
                            xleftharpoonup: [
                                ["leftharpoon"], .888, 522, "xMinYMin"
                            ],
                            xleftharpoondown: [
                                ["leftharpoondown"], .888, 522, "xMinYMin"
                            ],
                            overrightharpoon: [
                                ["rightharpoon"], .888, 522, "xMaxYMin"
                            ],
                            xrightharpoonup: [
                                ["rightharpoon"], .888, 522, "xMaxYMin"
                            ],
                            xrightharpoondown: [
                                ["rightharpoondown"], .888, 522, "xMaxYMin"
                            ],
                            xlongequal: [
                                ["longequal"], .888, 334, "xMinYMin"
                            ],
                            xtwoheadleftarrow: [
                                ["twoheadleftarrow"], .888, 334, "xMinYMin"
                            ],
                            xtwoheadrightarrow: [
                                ["twoheadrightarrow"], .888, 334, "xMaxYMin"
                            ],
                            overleftrightarrow: [
                                ["leftarrow", "rightarrow"], .888, 522
                            ],
                            overbrace: [
                                ["leftbrace", "midbrace", "rightbrace"], 1.6, 548
                            ],
                            underbrace: [
                                ["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548
                            ],
                            underleftrightarrow: [
                                ["leftarrow", "rightarrow"], .888, 522
                            ],
                            xleftrightarrow: [
                                ["leftarrow", "rightarrow"], 1.75, 522
                            ],
                            xLeftrightarrow: [
                                ["doubleleftarrow", "doublerightarrow"], 1.75, 560
                            ],
                            xrightleftharpoons: [
                                ["leftharpoondownplus", "rightharpoonplus"], 1.75, 716
                            ],
                            xleftrightharpoons: [
                                ["leftharpoonplus", "rightharpoondownplus"], 1.75, 716
                            ],
                            xhookleftarrow: [
                                ["leftarrow", "righthook"], 1.08, 522
                            ],
                            xhookrightarrow: [
                                ["lefthook", "rightarrow"], 1.08, 522
                            ],
                            overlinesegment: [
                                ["leftlinesegment", "rightlinesegment"], .888, 522
                            ],
                            underlinesegment: [
                                ["leftlinesegment", "rightlinesegment"], .888, 522
                            ],
                            overgroup: [
                                ["leftgroup", "rightgroup"], .888, 342
                            ],
                            undergroup: [
                                ["leftgroupunder", "rightgroupunder"], .888, 342
                            ],
                            xmapsto: [
                                ["leftmapsto", "rightarrow"], 1.5, 522
                            ],
                            xtofrom: [
                                ["leftToFrom", "rightToFrom"], 1.75, 528
                            ],
                            xrightleftarrows: [
                                ["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901
                            ],
                            xrightequilibrium: [
                                ["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716
                            ],
                            xleftequilibrium: [
                                ["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716
                            ]
                        },
                        Ce = function (t, e, r, a) {
                            var n, o = t.height + t.depth + 2 * r;
                            if (/fbox|color/.test(e)) {
                                if (n = Lt.makeSpan(["stretchy", e], [], a), "fbox" === e) {
                                    var i = a.color && a.getColor();
                                    i && (n.style.borderColor = i)
                                }
                            } else {
                                var s = [];
                                /^[bx]cancel$/.test(e) && s.push(new D({
                                    x1: "0",
                                    y1: "0",
                                    x2: "100%",
                                    y2: "100%",
                                    "stroke-width": "0.046em"
                                })), /^x?cancel$/.test(e) && s.push(new D({
                                    x1: "0",
                                    y1: "100%",
                                    x2: "100%",
                                    y2: "0",
                                    "stroke-width": "0.046em"
                                }));
                                var l = new E(s, {
                                    width: "100%",
                                    height: o + "em"
                                });
                                n = Lt.makeSvgSpan([], [l], a)
                            }
                            return n.height = o, n.style.height = o + "em", n
                        },
                        Ne = function (t) {
                            var e = new ve.MathNode("mo", [new ve.TextNode(qe[t.substr(1)])]);
                            return e.setAttribute("stretchy", "true"), e
                        },
                        Oe = function (t, e) {
                            var r = function () {
                                    var r = 4e5,
                                        a = t.label.substr(1);
                                    if (c.contains(["widehat", "widecheck", "widetilde", "utilde"], a)) {
                                        var n, o, i, s = "ordgroup" === (d = t.base).type ? d.body.length : 1;
                                        if (s > 5) "widehat" === a || "widecheck" === a ? (n = 420, r = 2364, i = .42, o = a + "4") : (n = 312, r = 2340, i = .34, o = "tilde4");
                                        else {
                                            var l = [1, 1, 2, 2, 3, 3][s];
                                            "widehat" === a || "widecheck" === a ? (r = [0, 1062, 2364, 2364, 2364][l], n = [0, 239, 300, 360, 420][l], i = [0, .24, .3, .3, .36, .42][l], o = a + l) : (r = [0, 600, 1033, 2339, 2340][l], n = [0, 260, 286, 306, 312][l], i = [0, .26, .286, .3, .306, .34][l], o = "tilde" + l)
                                        }
                                        var h = new R(o),
                                            m = new E([h], {
                                                width: "100%",
                                                height: i + "em",
                                                viewBox: "0 0 " + r + " " + n,
                                                preserveAspectRatio: "none"
                                            });
                                        return {
                                            span: Lt.makeSvgSpan([], [m], e),
                                            minWidth: 0,
                                            height: i
                                        }
                                    }
                                    var u, p, d, f = [],
                                        g = Be[a],
                                        x = g[0],
                                        v = g[1],
                                        b = g[2],
                                        y = b / 1e3,
                                        w = x.length;
                                    if (1 === w) u = ["hide-tail"], p = [g[3]];
                                    else if (2 === w) u = ["halfarrow-left", "halfarrow-right"], p = ["xMinYMin", "xMaxYMin"];
                                    else {
                                        if (3 !== w) throw new Error("Correct katexImagesData or update code here to support\n                    " + w + " children.");
                                        u = ["brace-left", "brace-center", "brace-right"], p = ["xMinYMin", "xMidYMin", "xMaxYMin"]
                                    }
                                    for (var k = 0; k < w; k++) {
                                        var S = new R(x[k]),
                                            z = new E([S], {
                                                width: "400em",
                                                height: y + "em",
                                                viewBox: "0 0 " + r + " " + b,
                                                preserveAspectRatio: p[k] + " slice"
                                            }),
                                            M = Lt.makeSvgSpan([u[k]], [z], e);
                                        if (1 === w) return {
                                            span: M,
                                            minWidth: v,
                                            height: y
                                        };
                                        M.style.height = y + "em", f.push(M)
                                    }
                                    return {
                                        span: Lt.makeSpan(["stretchy"], f, e),
                                        minWidth: v,
                                        height: y
                                    }
                                }(),
                                a = r.span,
                                n = r.minWidth,
                                o = r.height;
                            return a.height = o, a.style.height = o + "em", n > 0 && (a.style.minWidth = n + "em"), a
                        },
                        Ie = function (t, e) {
                            var r, a, n, o = Ht(t, "supsub");
                            o ? (r = (a = Pt(o.base, "accent")).base, o.base = r, n = function (t) {
                                if (t instanceof C) return t;
                                throw new Error("Expected span<HtmlDomNode> but got " + String(t) + ".")
                            }(ue(o, e)), o.base = a) : r = (a = Pt(t, "accent")).base;
                            var i = ue(r, e.havingCrampedStyle()),
                                s = 0;
                            if (a.isShifty && c.isCharacterBox(r)) {
                                var l = c.getBaseElem(r);
                                s = L(ue(l, e.havingCrampedStyle())).skew
                            }
                            var h, m = Math.min(i.height, e.fontMetrics().xHeight);
                            if (a.isStretchy) h = Oe(a, e), h = Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: i
                                }, {
                                    type: "elem",
                                    elem: h,
                                    wrapperClasses: ["svg-align"],
                                    wrapperStyle: s > 0 ? {
                                        width: "calc(100% - " + 2 * s + "em)",
                                        marginLeft: 2 * s + "em"
                                    } : void 0
                                }]
                            }, e);
                            else {
                                var u, p;
                                "\\vec" === a.label ? (u = Lt.staticSvg("vec", e), p = Lt.svgData.vec[1]) : ((u = L(u = Lt.makeOrd({
                                    mode: a.mode,
                                    text: a.label
                                }, e, "textord"))).italic = 0, p = u.width), h = Lt.makeSpan(["accent-body"], [u]);
                                var d = "\\textcircled" === a.label;
                                d && (h.classes.push("accent-full"), m = i.height);
                                var f = s;
                                d || (f -= p / 2), h.style.left = f + "em", "\\textcircled" === a.label && (h.style.top = ".2em"), h = Lt.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: i
                                    }, {
                                        type: "kern",
                                        size: -m
                                    }, {
                                        type: "elem",
                                        elem: h
                                    }]
                                }, e)
                            }
                            var g = Lt.makeSpan(["mord", "accent"], [h], e);
                            return n ? (n.children[0] = g, n.height = Math.max(g.height, n.height), n.classes[0] = "mord", n) : g
                        },
                        $e = function (t, e) {
                            var r = t.isStretchy ? Ne(t.label) : new ve.MathNode("mo", [be(t.label, t.mode)]),
                                a = new ve.MathNode("mover", [ze(t.base, e), r]);
                            return a.setAttribute("accent", "true"), a
                        },
                        Ee = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((function (t) {
                            return "\\" + t
                        })).join("|"));
                    Qt({
                        type: "accent",
                        names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = e[0],
                                a = !Ee.test(t.funcName),
                                n = !a || "\\widehat" === t.funcName || "\\widetilde" === t.funcName || "\\widecheck" === t.funcName;
                            return {
                                type: "accent",
                                mode: t.parser.mode,
                                label: t.funcName,
                                isStretchy: a,
                                isShifty: n,
                                base: r
                            }
                        },
                        htmlBuilder: Ie,
                        mathmlBuilder: $e
                    }), Qt({
                        type: "accent",
                        names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v", "\\textcircled"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0,
                            allowedInMath: !1
                        },
                        handler: function (t, e) {
                            var r = e[0];
                            return {
                                type: "accent",
                                mode: t.parser.mode,
                                label: t.funcName,
                                isStretchy: !1,
                                isShifty: !0,
                                base: r
                            }
                        },
                        htmlBuilder: Ie,
                        mathmlBuilder: $e
                    }), Qt({
                        type: "accentUnder",
                        names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0];
                            return {
                                type: "accentUnder",
                                mode: r.mode,
                                label: a,
                                base: n
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = ue(t.base, e),
                                a = Oe(t, e),
                                n = "\\utilde" === t.label ? .12 : 0,
                                o = Lt.makeVList({
                                    positionType: "bottom",
                                    positionData: a.height + n,
                                    children: [{
                                        type: "elem",
                                        elem: a,
                                        wrapperClasses: ["svg-align"]
                                    }, {
                                        type: "kern",
                                        size: n
                                    }, {
                                        type: "elem",
                                        elem: r
                                    }]
                                }, e);
                            return Lt.makeSpan(["mord", "accentunder"], [o], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = Ne(t.label),
                                a = new ve.MathNode("munder", [ze(t.base, e), r]);
                            return a.setAttribute("accentunder", "true"), a
                        }
                    });
                    var Re = function (t) {
                        var e = new ve.MathNode("mpadded", t ? [t] : []);
                        return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e
                    };
                    Qt({
                        type: "xArrow",
                        names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium"],
                        props: {
                            numArgs: 1,
                            numOptionalArgs: 1
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = t.funcName;
                            return {
                                type: "xArrow",
                                mode: a.mode,
                                label: n,
                                body: e[0],
                                below: r[0]
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r, a = e.style,
                                n = e.havingStyle(a.sup()),
                                o = Lt.wrapFragment(ue(t.body, n, e), e);
                            o.classes.push("x-arrow-pad"), t.below && (n = e.havingStyle(a.sub()), (r = Lt.wrapFragment(ue(t.below, n, e), e)).classes.push("x-arrow-pad"));
                            var i, s = Oe(t, e),
                                l = -e.fontMetrics().axisHeight + .5 * s.height,
                                h = -e.fontMetrics().axisHeight - .5 * s.height - .111;
                            if ((o.depth > .25 || "\\xleftequilibrium" === t.label) && (h -= o.depth), r) {
                                var m = -e.fontMetrics().axisHeight + r.height + .5 * s.height + .111;
                                i = Lt.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: o,
                                        shift: h
                                    }, {
                                        type: "elem",
                                        elem: s,
                                        shift: l
                                    }, {
                                        type: "elem",
                                        elem: r,
                                        shift: m
                                    }]
                                }, e)
                            } else i = Lt.makeVList({
                                positionType: "individualShift",
                                children: [{
                                    type: "elem",
                                    elem: o,
                                    shift: h
                                }, {
                                    type: "elem",
                                    elem: s,
                                    shift: l
                                }]
                            }, e);
                            return i.children[0].children[0].children[1].classes.push("svg-align"), Lt.makeSpan(["mrel", "x-arrow"], [i], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r, a = Ne(t.label);
                            if (t.body) {
                                var n = Re(ze(t.body, e));
                                if (t.below) {
                                    var o = Re(ze(t.below, e));
                                    r = new ve.MathNode("munderover", [a, o, n])
                                } else r = new ve.MathNode("mover", [a, n])
                            } else if (t.below) {
                                var i = Re(ze(t.below, e));
                                r = new ve.MathNode("munder", [a, i])
                            } else r = Re(), r = new ve.MathNode("mover", [a, r]);
                            return r
                        }
                    }), Qt({
                        type: "textord",
                        names: ["\\@char"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            for (var r = t.parser, a = Pt(e[0], "ordgroup").body, n = "", o = 0; o < a.length; o++) n += Pt(a[o], "textord").text;
                            var s = parseInt(n);
                            if (isNaN(s)) throw new i("\\@char has non-numeric argument " + n);
                            return {
                                type: "textord",
                                mode: r.mode,
                                text: String.fromCharCode(s)
                            }
                        }
                    });
                    var De = function (t, e) {
                            var r = se(t.body, e.withColor(t.color), !1);
                            return Lt.makeFragment(r)
                        },
                        Le = function (t, e) {
                            var r = ke(t.body, e.withColor(t.color)),
                                a = new ve.MathNode("mstyle", r);
                            return a.setAttribute("mathcolor", t.color), a
                        };
                    Qt({
                        type: "color",
                        names: ["\\textcolor"],
                        props: {
                            numArgs: 2,
                            allowedInText: !0,
                            greediness: 3,
                            argTypes: ["color", "original"]
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = Pt(e[0], "color-token").color,
                                n = e[1];
                            return {
                                type: "color",
                                mode: r.mode,
                                color: a,
                                body: ee(n)
                            }
                        },
                        htmlBuilder: De,
                        mathmlBuilder: Le
                    }), Qt({
                        type: "color",
                        names: ["\\color"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0,
                            greediness: 3,
                            argTypes: ["color"]
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.breakOnTokenText,
                                n = Pt(e[0], "color-token").color;
                            r.gullet.macros.set("\\current@color", n);
                            var o = r.parseExpression(!0, a);
                            return {
                                type: "color",
                                mode: r.mode,
                                color: n,
                                body: o
                            }
                        },
                        htmlBuilder: De,
                        mathmlBuilder: Le
                    }), Qt({
                        type: "cr",
                        names: ["\\cr", "\\newline"],
                        props: {
                            numArgs: 0,
                            numOptionalArgs: 1,
                            argTypes: ["size"],
                            allowedInText: !0
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = t.funcName,
                                o = r[0],
                                i = "\\cr" === n,
                                s = !1;
                            return i || (s = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode")), {
                                type: "cr",
                                mode: a.mode,
                                newLine: s,
                                newRow: i,
                                size: o && Pt(o, "size").value
                            }
                        },
                        htmlBuilder: function (t, e) {
                            if (t.newRow) throw new i("\\cr valid only within a tabular/array environment");
                            var r = Lt.makeSpan(["mspace"], [], e);
                            return t.newLine && (r.classes.push("newline"), t.size && (r.style.marginTop = At(t.size, e) + "em")), r
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mspace");
                            return t.newLine && (r.setAttribute("linebreak", "newline"), t.size && r.setAttribute("height", At(t.size, e) + "em")), r
                        }
                    });
                    var Pe = function (t, e, r) {
                            var a = G(Y.math[t] && Y.math[t].replace || t, e, r);
                            if (!a) throw new Error("Unsupported symbol " + t + " and font size " + e + ".");
                            return a
                        },
                        He = function (t, e, r, a) {
                            var n = r.havingBaseStyle(e),
                                o = Lt.makeSpan(a.concat(n.sizingClasses(r)), [t], r),
                                i = n.sizeMultiplier / r.sizeMultiplier;
                            return o.height *= i, o.depth *= i, o.maxFontSize = n.sizeMultiplier, o
                        },
                        Fe = function (t, e, r) {
                            var a = e.havingBaseStyle(r),
                                n = (1 - e.sizeMultiplier / a.sizeMultiplier) * e.fontMetrics().axisHeight;
                            t.classes.push("delimcenter"), t.style.top = n + "em", t.height -= n, t.depth += n
                        },
                        Ge = function (t, e, r, a, n, o) {
                            var i = function (t, e, r, a) {
                                    return Lt.makeSymbol(t, "Size" + e + "-Regular", r, a)
                                }(t, e, n, a),
                                s = He(Lt.makeSpan(["delimsizing", "size" + e], [i], a), w.TEXT, a, o);
                            return r && Fe(s, a, w.TEXT), s
                        },
                        Ve = function (t, e, r) {
                            var a;
                            return a = "Size1-Regular" === e ? "delim-size1" : "delim-size4", {
                                type: "elem",
                                elem: Lt.makeSpan(["delimsizinginner", a], [Lt.makeSpan([], [Lt.makeSymbol(t, e, r)])])
                            }
                        },
                        Ue = {
                            type: "kern",
                            size: -.005
                        },
                        Xe = function (t, e, r, a, n, o) {
                            var i, s, l, h;
                            i = l = h = t, s = null;
                            var m = "Size1-Regular";
                            "\\uparrow" === t ? l = h = "⏐" : "\\Uparrow" === t ? l = h = "‖" : "\\downarrow" === t ? i = l = "⏐" : "\\Downarrow" === t ? i = l = "‖" : "\\updownarrow" === t ? (i = "\\uparrow", l = "⏐", h = "\\downarrow") : "\\Updownarrow" === t ? (i = "\\Uparrow", l = "‖", h = "\\Downarrow") : "[" === t || "\\lbrack" === t ? (i = "⎡", l = "⎢", h = "⎣", m = "Size4-Regular") : "]" === t || "\\rbrack" === t ? (i = "⎤", l = "⎥", h = "⎦", m = "Size4-Regular") : "\\lfloor" === t || "⌊" === t ? (l = i = "⎢", h = "⎣", m = "Size4-Regular") : "\\lceil" === t || "⌈" === t ? (i = "⎡", l = h = "⎢", m = "Size4-Regular") : "\\rfloor" === t || "⌋" === t ? (l = i = "⎥", h = "⎦", m = "Size4-Regular") : "\\rceil" === t || "⌉" === t ? (i = "⎤", l = h = "⎥", m = "Size4-Regular") : "(" === t || "\\lparen" === t ? (i = "⎛", l = "⎜", h = "⎝", m = "Size4-Regular") : ")" === t || "\\rparen" === t ? (i = "⎞", l = "⎟", h = "⎠", m = "Size4-Regular") : "\\{" === t || "\\lbrace" === t ? (i = "⎧", s = "⎨", h = "⎩", l = "⎪", m = "Size4-Regular") : "\\}" === t || "\\rbrace" === t ? (i = "⎫", s = "⎬", h = "⎭", l = "⎪", m = "Size4-Regular") : "\\lgroup" === t || "⟮" === t ? (i = "⎧", h = "⎩", l = "⎪", m = "Size4-Regular") : "\\rgroup" === t || "⟯" === t ? (i = "⎫", h = "⎭", l = "⎪", m = "Size4-Regular") : "\\lmoustache" === t || "⎰" === t ? (i = "⎧", h = "⎭", l = "⎪", m = "Size4-Regular") : "\\rmoustache" !== t && "⎱" !== t || (i = "⎫", h = "⎩", l = "⎪", m = "Size4-Regular");
                            var c = Pe(i, m, n),
                                u = c.height + c.depth,
                                p = Pe(l, m, n),
                                d = p.height + p.depth,
                                f = Pe(h, m, n),
                                g = f.height + f.depth,
                                x = 0,
                                v = 1;
                            if (null !== s) {
                                var b = Pe(s, m, n);
                                x = b.height + b.depth, v = 2
                            }
                            var y = u + g + x,
                                k = Math.max(0, Math.ceil((e - y) / (v * d))),
                                S = y + k * v * d,
                                z = a.fontMetrics().axisHeight;
                            r && (z *= a.sizeMultiplier);
                            var M = S / 2 - z,
                                _ = .005 * (k + 1) - d,
                                A = [];
                            if (A.push(Ve(h, m, n)), null === s)
                                for (var T = 0; T < k; T++) A.push(Ue), A.push(Ve(l, m, n));
                            else {
                                for (var q = 0; q < k; q++) A.push(Ue), A.push(Ve(l, m, n));
                                A.push({
                                    type: "kern",
                                    size: _
                                }), A.push(Ve(l, m, n)), A.push(Ue), A.push(Ve(s, m, n));
                                for (var B = 0; B < k; B++) A.push(Ue), A.push(Ve(l, m, n))
                            }
                            A.push({
                                type: "kern",
                                size: _
                            }), A.push(Ve(l, m, n)), A.push(Ue), A.push(Ve(i, m, n));
                            var C = a.havingBaseStyle(w.TEXT),
                                N = Lt.makeVList({
                                    positionType: "bottom",
                                    positionData: M,
                                    children: A
                                }, C);
                            return He(Lt.makeSpan(["delimsizing", "mult"], [N], C), w.TEXT, a, o)
                        },
                        We = function (t, e, r, a, n) {
                            var o = function (t, e, r) {
                                    e *= 1e3;
                                    var a = "";
                                    switch (t) {
                                        case "sqrtMain":
                                            a = function (t, e) {
                                                return "M95," + (622 + t + e) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + t / 2.075 + " -" + t + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + t) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + t) + " " + e + "h400000v" + (40 + t) + "h-400000z"
                                            }(e, 80);
                                            break;
                                        case "sqrtSize1":
                                            a = function (t, e) {
                                                return "M263," + (601 + t + e) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + t / 2.084 + " -" + t + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + t) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + t) + " " + e + "h400000v" + (40 + t) + "h-400000z"
                                            }(e, 80);
                                            break;
                                        case "sqrtSize2":
                                            a = function (t, e) {
                                                return "M983 " + (10 + t + e) + "\nl" + t / 3.13 + " -" + t + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + t) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + t) + " " + e + "h400000v" + (40 + t) + "h-400000z"
                                            }(e, 80);
                                            break;
                                        case "sqrtSize3":
                                            a = function (t, e) {
                                                return "M424," + (2398 + t + e) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + t / 4.223 + " -" + t + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + t) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + t) + " " + e + "\nh400000v" + (40 + t) + "h-400000z"
                                            }(e, 80);
                                            break;
                                        case "sqrtSize4":
                                            a = function (t, e) {
                                                return "M473," + (2713 + t + e) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + t / 5.298 + " -" + t + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + t) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + t) + " " + e + "h400000v" + (40 + t) + "H1017.7z"
                                            }(e, 80);
                                            break;
                                        case "sqrtTall":
                                            a = function (t, e, r) {
                                                return "M702 " + (t + e) + "H400000" + (40 + t) + "\nH742v" + (r - 54 - e - t) + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + e + "H400000v" + (40 + t) + "H742z"
                                            }(e, 80, r)
                                    }
                                    return a
                                }(t, a, r),
                                i = new R(t, o),
                                s = new E([i], {
                                    width: "400em",
                                    height: e + "em",
                                    viewBox: "0 0 400000 " + r,
                                    preserveAspectRatio: "xMinYMin slice"
                                });
                            return Lt.makeSvgSpan(["hide-tail"], [s], n)
                        },
                        Ye = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"],
                        Ze = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"],
                        je = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"],
                        Ke = [0, 1.2, 1.8, 2.4, 3],
                        Je = [{
                            type: "small",
                            style: w.SCRIPTSCRIPT
                        }, {
                            type: "small",
                            style: w.SCRIPT
                        }, {
                            type: "small",
                            style: w.TEXT
                        }, {
                            type: "large",
                            size: 1
                        }, {
                            type: "large",
                            size: 2
                        }, {
                            type: "large",
                            size: 3
                        }, {
                            type: "large",
                            size: 4
                        }],
                        Qe = [{
                            type: "small",
                            style: w.SCRIPTSCRIPT
                        }, {
                            type: "small",
                            style: w.SCRIPT
                        }, {
                            type: "small",
                            style: w.TEXT
                        }, {
                            type: "stack"
                        }],
                        tr = [{
                            type: "small",
                            style: w.SCRIPTSCRIPT
                        }, {
                            type: "small",
                            style: w.SCRIPT
                        }, {
                            type: "small",
                            style: w.TEXT
                        }, {
                            type: "large",
                            size: 1
                        }, {
                            type: "large",
                            size: 2
                        }, {
                            type: "large",
                            size: 3
                        }, {
                            type: "large",
                            size: 4
                        }, {
                            type: "stack"
                        }],
                        er = function (t) {
                            if ("small" === t.type) return "Main-Regular";
                            if ("large" === t.type) return "Size" + t.size + "-Regular";
                            if ("stack" === t.type) return "Size4-Regular";
                            throw new Error("Add support for delim type '" + t.type + "' here.")
                        },
                        rr = function (t, e, r, a) {
                            for (var n = Math.min(2, 3 - a.style.size); n < r.length && "stack" !== r[n].type; n++) {
                                var o = Pe(t, er(r[n]), "math"),
                                    i = o.height + o.depth;
                                if ("small" === r[n].type && (i *= a.havingBaseStyle(r[n].style).sizeMultiplier), i > e) return r[n]
                            }
                            return r[r.length - 1]
                        },
                        ar = function (t, e, r, a, n, o) {
                            var i;
                            "<" === t || "\\lt" === t || "⟨" === t ? t = "\\langle" : ">" !== t && "\\gt" !== t && "⟩" !== t || (t = "\\rangle"), i = c.contains(je, t) ? Je : c.contains(Ye, t) ? tr : Qe;
                            var s = rr(t, e, i, a);
                            return "small" === s.type ? function (t, e, r, a, n, o) {
                                var i = Lt.makeSymbol(t, "Main-Regular", n, a),
                                    s = He(i, e, a, o);
                                return r && Fe(s, a, e), s
                            }(t, s.style, r, a, n, o) : "large" === s.type ? Ge(t, s.size, r, a, n, o) : Xe(t, e, r, a, n, o)
                        },
                        nr = function (t, e) {
                            var r, a, n = e.havingBaseSizing(),
                                o = rr("\\surd", t * n.sizeMultiplier, tr, n),
                                i = n.sizeMultiplier,
                                s = Math.max(0, e.minRuleThickness - e.fontMetrics().sqrtRuleThickness),
                                l = 0,
                                h = 0,
                                m = 0;
                            return "small" === o.type ? (t < 1 ? i = 1 : t < 1.4 && (i = .7), h = (1 + s) / i, (r = We("sqrtMain", l = (1 + s + .08) / i, m = 1e3 + 1e3 * s + 80, s, e)).style.minWidth = "0.853em", a = .833 / i) : "large" === o.type ? (m = 1080 * Ke[o.size], h = (Ke[o.size] + s) / i, l = (Ke[o.size] + s + .08) / i, (r = We("sqrtSize" + o.size, l, m, s, e)).style.minWidth = "1.02em", a = 1 / i) : (l = t + s + .08, h = t + s, m = Math.floor(1e3 * t + s) + 80, (r = We("sqrtTall", l, m, s, e)).style.minWidth = "0.742em", a = 1.056), r.height = h, r.style.height = l + "em", {
                                span: r,
                                advanceWidth: a,
                                ruleWidth: (e.fontMetrics().sqrtRuleThickness + s) * i
                            }
                        },
                        or = function (t, e, r, a, n) {
                            if ("<" === t || "\\lt" === t || "⟨" === t ? t = "\\langle" : ">" !== t && "\\gt" !== t && "⟩" !== t || (t = "\\rangle"), c.contains(Ye, t) || c.contains(je, t)) return Ge(t, e, !1, r, a, n);
                            if (c.contains(Ze, t)) return Xe(t, Ke[e], !1, r, a, n);
                            throw new i("Illegal delimiter: '" + t + "'")
                        },
                        ir = ar,
                        sr = function (t, e, r, a, n, o) {
                            var i = a.fontMetrics().axisHeight * a.sizeMultiplier,
                                s = 5 / a.fontMetrics().ptPerEm,
                                l = Math.max(e - i, r + i),
                                h = Math.max(l / 500 * 901, 2 * l - s);
                            return ar(t, h, !0, a, n, o)
                        },
                        lr = {
                            "\\bigl": {
                                mclass: "mopen",
                                size: 1
                            },
                            "\\Bigl": {
                                mclass: "mopen",
                                size: 2
                            },
                            "\\biggl": {
                                mclass: "mopen",
                                size: 3
                            },
                            "\\Biggl": {
                                mclass: "mopen",
                                size: 4
                            },
                            "\\bigr": {
                                mclass: "mclose",
                                size: 1
                            },
                            "\\Bigr": {
                                mclass: "mclose",
                                size: 2
                            },
                            "\\biggr": {
                                mclass: "mclose",
                                size: 3
                            },
                            "\\Biggr": {
                                mclass: "mclose",
                                size: 4
                            },
                            "\\bigm": {
                                mclass: "mrel",
                                size: 1
                            },
                            "\\Bigm": {
                                mclass: "mrel",
                                size: 2
                            },
                            "\\biggm": {
                                mclass: "mrel",
                                size: 3
                            },
                            "\\Biggm": {
                                mclass: "mrel",
                                size: 4
                            },
                            "\\big": {
                                mclass: "mord",
                                size: 1
                            },
                            "\\Big": {
                                mclass: "mord",
                                size: 2
                            },
                            "\\bigg": {
                                mclass: "mord",
                                size: 3
                            },
                            "\\Bigg": {
                                mclass: "mord",
                                size: 4
                            }
                        },
                        hr = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];

                    function mr(t, e) {
                        var r = Vt(t);
                        if (r && c.contains(hr, r.text)) return r;
                        throw new i("Invalid delimiter: '" + (r ? r.text : JSON.stringify(t)) + "' after '" + e.funcName + "'", t)
                    }

                    function cr(t) {
                        if (!t.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.")
                    }
                    Qt({
                        type: "delimsizing",
                        names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = mr(e[0], t);
                            return {
                                type: "delimsizing",
                                mode: t.parser.mode,
                                size: lr[t.funcName].size,
                                mclass: lr[t.funcName].mclass,
                                delim: r.text
                            }
                        },
                        htmlBuilder: function (t, e) {
                            return "." === t.delim ? Lt.makeSpan([t.mclass]) : or(t.delim, t.size, e, t.mode, [t.mclass])
                        },
                        mathmlBuilder: function (t) {
                            var e = [];
                            "." !== t.delim && e.push(be(t.delim, t.mode));
                            var r = new ve.MathNode("mo", e);
                            return "mopen" === t.mclass || "mclose" === t.mclass ? r.setAttribute("fence", "true") : r.setAttribute("fence", "false"), r
                        }
                    }), Qt({
                        type: "leftright-right",
                        names: ["\\right"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser.gullet.macros.get("\\current@color");
                            if (r && "string" != typeof r) throw new i("\\current@color set to non-string in \\right");
                            return {
                                type: "leftright-right",
                                mode: t.parser.mode,
                                delim: mr(e[0], t).text,
                                color: r
                            }
                        }
                    }), Qt({
                        type: "leftright",
                        names: ["\\left"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = mr(e[0], t),
                                a = t.parser;
                            ++a.leftrightDepth;
                            var n = a.parseExpression(!1);
                            --a.leftrightDepth, a.expect("\\right", !1);
                            var o = Pt(a.parseFunction(), "leftright-right");
                            return {
                                type: "leftright",
                                mode: a.mode,
                                body: n,
                                left: r.text,
                                right: o.delim,
                                rightColor: o.color
                            }
                        },
                        htmlBuilder: function (t, e) {
                            cr(t);
                            for (var r, a, n = se(t.body, e, !0, ["mopen", "mclose"]), o = 0, i = 0, s = !1, l = 0; l < n.length; l++) n[l].isMiddle ? s = !0 : (o = Math.max(n[l].height, o), i = Math.max(n[l].depth, i));
                            if (o *= e.sizeMultiplier, i *= e.sizeMultiplier, r = "." === t.left ? ce(e, ["mopen"]) : sr(t.left, o, i, e, t.mode, ["mopen"]), n.unshift(r), s)
                                for (var h = 1; h < n.length; h++) {
                                    var m = n[h].isMiddle;
                                    m && (n[h] = sr(m.delim, o, i, m.options, t.mode, []))
                                }
                            if ("." === t.right) a = ce(e, ["mclose"]);
                            else {
                                var c = t.rightColor ? e.withColor(t.rightColor) : e;
                                a = sr(t.right, o, i, c, t.mode, ["mclose"])
                            }
                            return n.push(a), Lt.makeSpan(["minner"], n, e)
                        },
                        mathmlBuilder: function (t, e) {
                            cr(t);
                            var r = ke(t.body, e);
                            if ("." !== t.left) {
                                var a = new ve.MathNode("mo", [be(t.left, t.mode)]);
                                a.setAttribute("fence", "true"), r.unshift(a)
                            }
                            if ("." !== t.right) {
                                var n = new ve.MathNode("mo", [be(t.right, t.mode)]);
                                n.setAttribute("fence", "true"), t.rightColor && n.setAttribute("mathcolor", t.rightColor), r.push(n)
                            }
                            return ye(r)
                        }
                    }), Qt({
                        type: "middle",
                        names: ["\\middle"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = mr(e[0], t);
                            if (!t.parser.leftrightDepth) throw new i("\\middle without preceding \\left", r);
                            return {
                                type: "middle",
                                mode: t.parser.mode,
                                delim: r.text
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r;
                            if ("." === t.delim) r = ce(e, []);
                            else {
                                r = or(t.delim, 1, e, t.mode, []);
                                var a = {
                                    delim: t.delim,
                                    options: e
                                };
                                r.isMiddle = a
                            }
                            return r
                        },
                        mathmlBuilder: function (t, e) {
                            var r = "\\vert" === t.delim || "|" === t.delim ? be("|", "text") : be(t.delim, t.mode),
                                a = new ve.MathNode("mo", [r]);
                            return a.setAttribute("fence", "true"), a.setAttribute("lspace", "0.05em"), a.setAttribute("rspace", "0.05em"), a
                        }
                    });
                    var ur = function (t, e) {
                            var r, a, n = Lt.wrapFragment(ue(t.body, e), e),
                                o = t.label.substr(1),
                                i = e.sizeMultiplier,
                                s = 0,
                                l = c.isCharacterBox(t.body);
                            if ("sout" === o)(r = Lt.makeSpan(["stretchy", "sout"])).height = e.fontMetrics().defaultRuleThickness / i, s = -.5 * e.fontMetrics().xHeight;
                            else {
                                /cancel/.test(o) ? l || n.classes.push("cancel-pad") : n.classes.push("boxpad");
                                var h = 0,
                                    m = 0;
                                /box/.test(o) ? (m = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness), h = e.fontMetrics().fboxsep + ("colorbox" === o ? 0 : m)) : h = l ? .2 : 0, r = Ce(n, o, h, e), /fbox|boxed|fcolorbox/.test(o) && (r.style.borderStyle = "solid", r.style.borderWidth = m + "em"), s = n.depth + h, t.backgroundColor && (r.style.backgroundColor = t.backgroundColor, t.borderColor && (r.style.borderColor = t.borderColor))
                            }
                            return a = t.backgroundColor ? Lt.makeVList({
                                positionType: "individualShift",
                                children: [{
                                    type: "elem",
                                    elem: r,
                                    shift: s
                                }, {
                                    type: "elem",
                                    elem: n,
                                    shift: 0
                                }]
                            }, e) : Lt.makeVList({
                                positionType: "individualShift",
                                children: [{
                                    type: "elem",
                                    elem: n,
                                    shift: 0
                                }, {
                                    type: "elem",
                                    elem: r,
                                    shift: s,
                                    wrapperClasses: /cancel/.test(o) ? ["svg-align"] : []
                                }]
                            }, e), /cancel/.test(o) && (a.height = n.height, a.depth = n.depth), /cancel/.test(o) && !l ? Lt.makeSpan(["mord", "cancel-lap"], [a], e) : Lt.makeSpan(["mord"], [a], e)
                        },
                        pr = function (t, e) {
                            var r = 0,
                                a = new ve.MathNode(t.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [ze(t.body, e)]);
                            switch (t.label) {
                                case "\\cancel":
                                    a.setAttribute("notation", "updiagonalstrike");
                                    break;
                                case "\\bcancel":
                                    a.setAttribute("notation", "downdiagonalstrike");
                                    break;
                                case "\\sout":
                                    a.setAttribute("notation", "horizontalstrike");
                                    break;
                                case "\\fbox":
                                    a.setAttribute("notation", "box");
                                    break;
                                case "\\fcolorbox":
                                case "\\colorbox":
                                    if (r = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, a.setAttribute("width", "+" + 2 * r + "pt"), a.setAttribute("height", "+" + 2 * r + "pt"), a.setAttribute("lspace", r + "pt"), a.setAttribute("voffset", r + "pt"), "\\fcolorbox" === t.label) {
                                        var n = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness);
                                        a.setAttribute("style", "border: " + n + "em solid " + String(t.borderColor))
                                    }
                                    break;
                                case "\\xcancel":
                                    a.setAttribute("notation", "updiagonalstrike downdiagonalstrike")
                            }
                            return t.backgroundColor && a.setAttribute("mathbackground", t.backgroundColor), a
                        };
                    Qt({
                        type: "enclose",
                        names: ["\\colorbox"],
                        props: {
                            numArgs: 2,
                            allowedInText: !0,
                            greediness: 3,
                            argTypes: ["color", "text"]
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = t.funcName,
                                o = Pt(e[0], "color-token").color,
                                i = e[1];
                            return {
                                type: "enclose",
                                mode: a.mode,
                                label: n,
                                backgroundColor: o,
                                body: i
                            }
                        },
                        htmlBuilder: ur,
                        mathmlBuilder: pr
                    }), Qt({
                        type: "enclose",
                        names: ["\\fcolorbox"],
                        props: {
                            numArgs: 3,
                            allowedInText: !0,
                            greediness: 3,
                            argTypes: ["color", "color", "text"]
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = t.funcName,
                                o = Pt(e[0], "color-token").color,
                                i = Pt(e[1], "color-token").color,
                                s = e[2];
                            return {
                                type: "enclose",
                                mode: a.mode,
                                label: n,
                                backgroundColor: i,
                                borderColor: o,
                                body: s
                            }
                        },
                        htmlBuilder: ur,
                        mathmlBuilder: pr
                    }), Qt({
                        type: "enclose",
                        names: ["\\fbox"],
                        props: {
                            numArgs: 1,
                            argTypes: ["hbox"],
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            return {
                                type: "enclose",
                                mode: t.parser.mode,
                                label: "\\fbox",
                                body: e[0]
                            }
                        }
                    }), Qt({
                        type: "enclose",
                        names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = t.funcName,
                                o = e[0];
                            return {
                                type: "enclose",
                                mode: a.mode,
                                label: n,
                                body: o
                            }
                        },
                        htmlBuilder: ur,
                        mathmlBuilder: pr
                    });
                    var dr = {};

                    function fr(t) {
                        for (var e = t.type, r = t.names, a = t.props, n = t.handler, o = t.htmlBuilder, i = t.mathmlBuilder, s = {
                                type: e,
                                numArgs: a.numArgs || 0,
                                greediness: 1,
                                allowedInText: !1,
                                numOptionalArgs: 0,
                                handler: n
                            }, l = 0; l < r.length; ++l) dr[r[l]] = s;
                        o && (Kt[e] = o), i && (Jt[e] = i)
                    }

                    function gr(t) {
                        var e = [];
                        t.consumeSpaces();
                        for (var r = t.fetch().text;
                            "\\hline" === r || "\\hdashline" === r;) t.consume(), e.push("\\hdashline" === r), t.consumeSpaces(), r = t.fetch().text;
                        return e
                    }

                    function xr(t, e, r) {
                        var a = e.hskipBeforeAndAfter,
                            n = e.addJot,
                            o = e.cols,
                            s = e.arraystretch,
                            l = e.colSeparationType;
                        if (t.gullet.beginGroup(), t.gullet.macros.set("\\\\", "\\cr"), !s) {
                            var h = t.gullet.expandMacroAsText("\\arraystretch");
                            if (null == h) s = 1;
                            else if (!(s = parseFloat(h)) || s < 0) throw new i("Invalid \\arraystretch: " + h)
                        }
                        t.gullet.beginGroup();
                        var m = [],
                            c = [m],
                            u = [],
                            p = [];
                        for (p.push(gr(t));;) {
                            var d = t.parseExpression(!1, "\\cr");
                            t.gullet.endGroup(), t.gullet.beginGroup(), d = {
                                type: "ordgroup",
                                mode: t.mode,
                                body: d
                            }, r && (d = {
                                type: "styling",
                                mode: t.mode,
                                style: r,
                                body: [d]
                            }), m.push(d);
                            var f = t.fetch().text;
                            if ("&" === f) t.consume();
                            else {
                                if ("\\end" === f) {
                                    1 === m.length && "styling" === d.type && 0 === d.body[0].body.length && c.pop(), p.length < c.length + 1 && p.push([]);
                                    break
                                }
                                if ("\\cr" !== f) throw new i("Expected & or \\\\ or \\cr or \\end", t.nextToken);
                                var g = Pt(t.parseFunction(), "cr");
                                u.push(g.size), p.push(gr(t)), m = [], c.push(m)
                            }
                        }
                        return t.gullet.endGroup(), t.gullet.endGroup(), {
                            type: "array",
                            mode: t.mode,
                            addJot: n,
                            arraystretch: s,
                            body: c,
                            cols: o,
                            rowGaps: u,
                            hskipBeforeAndAfter: a,
                            hLinesBeforeRow: p,
                            colSeparationType: l
                        }
                    }

                    function vr(t) {
                        return "d" === t.substr(0, 1) ? "display" : "text"
                    }
                    var br = function (t, e) {
                            var r, a, n = t.body.length,
                                o = t.hLinesBeforeRow,
                                s = 0,
                                l = new Array(n),
                                h = [],
                                m = Math.max(e.fontMetrics().arrayRuleWidth, e.minRuleThickness),
                                u = 1 / e.fontMetrics().ptPerEm,
                                p = 5 * u;
                            t.colSeparationType && "small" === t.colSeparationType && (p = e.havingStyle(w.SCRIPT).sizeMultiplier / e.sizeMultiplier * .2778);
                            var d = 12 * u,
                                f = 3 * u,
                                g = t.arraystretch * d,
                                x = .7 * g,
                                v = .3 * g,
                                b = 0;

                            function y(t) {
                                for (var e = 0; e < t.length; ++e) e > 0 && (b += .25), h.push({
                                    pos: b,
                                    isDashed: t[e]
                                })
                            }
                            for (y(o[0]), r = 0; r < t.body.length; ++r) {
                                var k = t.body[r],
                                    S = x,
                                    z = v;
                                s < k.length && (s = k.length);
                                var M = new Array(k.length);
                                for (a = 0; a < k.length; ++a) {
                                    var _ = ue(k[a], e);
                                    z < _.depth && (z = _.depth), S < _.height && (S = _.height), M[a] = _
                                }
                                var A = t.rowGaps[r],
                                    T = 0;
                                A && (T = At(A, e)) > 0 && (z < (T += v) && (z = T), T = 0), t.addJot && (z += f), M.height = S, M.depth = z, b += S, M.pos = b, b += z + T, l[r] = M, y(o[r + 1])
                            }
                            var q, B, C = b / 2 + e.fontMetrics().axisHeight,
                                N = t.cols || [],
                                O = [];
                            for (a = 0, B = 0; a < s || B < N.length; ++a, ++B) {
                                for (var I = N[B] || {}, $ = !0;
                                    "separator" === I.type;) {
                                    if ($ || ((q = Lt.makeSpan(["arraycolsep"], [])).style.width = e.fontMetrics().doubleRuleSep + "em", O.push(q)), "|" !== I.separator && ":" !== I.separator) throw new i("Invalid separator type: " + I.separator);
                                    var E = "|" === I.separator ? "solid" : "dashed",
                                        R = Lt.makeSpan(["vertical-separator"], [], e);
                                    R.style.height = b + "em", R.style.borderRightWidth = m + "em", R.style.borderRightStyle = E, R.style.margin = "0 -" + m / 2 + "em", R.style.verticalAlign = -(b - C) + "em", O.push(R), I = N[++B] || {}, $ = !1
                                }
                                if (!(a >= s)) {
                                    var D = void 0;
                                    (a > 0 || t.hskipBeforeAndAfter) && 0 !== (D = c.deflt(I.pregap, p)) && ((q = Lt.makeSpan(["arraycolsep"], [])).style.width = D + "em", O.push(q));
                                    var L = [];
                                    for (r = 0; r < n; ++r) {
                                        var P = l[r],
                                            H = P[a];
                                        if (H) {
                                            var F = P.pos - C;
                                            H.depth = P.depth, H.height = P.height, L.push({
                                                type: "elem",
                                                elem: H,
                                                shift: F
                                            })
                                        }
                                    }
                                    L = Lt.makeVList({
                                        positionType: "individualShift",
                                        children: L
                                    }, e), L = Lt.makeSpan(["col-align-" + (I.align || "c")], [L]), O.push(L), (a < s - 1 || t.hskipBeforeAndAfter) && 0 !== (D = c.deflt(I.postgap, p)) && ((q = Lt.makeSpan(["arraycolsep"], [])).style.width = D + "em", O.push(q))
                                }
                            }
                            if (l = Lt.makeSpan(["mtable"], O), h.length > 0) {
                                for (var G = Lt.makeLineSpan("hline", e, m), V = Lt.makeLineSpan("hdashline", e, m), U = [{
                                        type: "elem",
                                        elem: l,
                                        shift: 0
                                    }]; h.length > 0;) {
                                    var X = h.pop(),
                                        W = X.pos - C;
                                    X.isDashed ? U.push({
                                        type: "elem",
                                        elem: V,
                                        shift: W
                                    }) : U.push({
                                        type: "elem",
                                        elem: G,
                                        shift: W
                                    })
                                }
                                l = Lt.makeVList({
                                    positionType: "individualShift",
                                    children: U
                                }, e)
                            }
                            return Lt.makeSpan(["mord"], [l], e)
                        },
                        yr = {
                            c: "center ",
                            l: "left ",
                            r: "right "
                        },
                        wr = function (t, e) {
                            var r = new ve.MathNode("mtable", t.body.map((function (t) {
                                    return new ve.MathNode("mtr", t.map((function (t) {
                                        return new ve.MathNode("mtd", [ze(t, e)])
                                    })))
                                }))),
                                a = .5 === t.arraystretch ? .1 : .16 + t.arraystretch - 1 + (t.addJot ? .09 : 0);
                            r.setAttribute("rowspacing", a + "em");
                            var n = "",
                                o = "";
                            if (t.cols) {
                                var i = t.cols,
                                    s = "",
                                    l = !1,
                                    h = 0,
                                    m = i.length;
                                "separator" === i[0].type && (n += "top ", h = 1), "separator" === i[i.length - 1].type && (n += "bottom ", m -= 1);
                                for (var c = h; c < m; c++) "align" === i[c].type ? (o += yr[i[c].align], l && (s += "none "), l = !0) : "separator" === i[c].type && l && (s += "|" === i[c].separator ? "solid " : "dashed ", l = !1);
                                r.setAttribute("columnalign", o.trim()), /[sd]/.test(s) && r.setAttribute("columnlines", s.trim())
                            }
                            if ("align" === t.colSeparationType) {
                                for (var u = t.cols || [], p = "", d = 1; d < u.length; d++) p += d % 2 ? "0em " : "1em ";
                                r.setAttribute("columnspacing", p.trim())
                            } else "alignat" === t.colSeparationType ? r.setAttribute("columnspacing", "0em") : "small" === t.colSeparationType ? r.setAttribute("columnspacing", "0.2778em") : r.setAttribute("columnspacing", "1em");
                            var f = "",
                                g = t.hLinesBeforeRow;
                            n += g[0].length > 0 ? "left " : "", n += g[g.length - 1].length > 0 ? "right " : "";
                            for (var x = 1; x < g.length - 1; x++) f += 0 === g[x].length ? "none " : g[x][0] ? "dashed " : "solid ";
                            return /[sd]/.test(f) && r.setAttribute("rowlines", f.trim()), "" !== n && (r = new ve.MathNode("menclose", [r])).setAttribute("notation", n.trim()), t.arraystretch && t.arraystretch < 1 && (r = new ve.MathNode("mstyle", [r])).setAttribute("scriptlevel", "1"), r
                        },
                        kr = function (t, e) {
                            var r, a = [],
                                n = xr(t.parser, {
                                    cols: a,
                                    addJot: !0
                                }, "display"),
                                o = 0,
                                s = {
                                    type: "ordgroup",
                                    mode: t.mode,
                                    body: []
                                },
                                l = Ht(e[0], "ordgroup");
                            if (l) {
                                for (var h = "", m = 0; m < l.body.length; m++) h += Pt(l.body[m], "textord").text;
                                r = Number(h), o = 2 * r
                            }
                            var c = !o;
                            n.body.forEach((function (t) {
                                for (var e = 1; e < t.length; e += 2) {
                                    var a = Pt(t[e], "styling");
                                    Pt(a.body[0], "ordgroup").body.unshift(s)
                                }
                                if (c) o < t.length && (o = t.length);
                                else {
                                    var n = t.length / 2;
                                    if (r < n) throw new i("Too many math in a row: expected " + r + ", but got " + n, t[0])
                                }
                            }));
                            for (var u = 0; u < o; ++u) {
                                var p = "r",
                                    d = 0;
                                u % 2 == 1 ? p = "l" : u > 0 && c && (d = 1), a[u] = {
                                    type: "align",
                                    align: p,
                                    pregap: d,
                                    postgap: 0
                                }
                            }
                            return n.colSeparationType = c ? "align" : "alignat", n
                        };
                    fr({
                        type: "array",
                        names: ["array", "darray"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = {
                                cols: (Vt(e[0]) ? [e[0]] : Pt(e[0], "ordgroup").body).map((function (t) {
                                    var e = Gt(t).text;
                                    if (-1 !== "lcr".indexOf(e)) return {
                                        type: "align",
                                        align: e
                                    };
                                    if ("|" === e) return {
                                        type: "separator",
                                        separator: "|"
                                    };
                                    if (":" === e) return {
                                        type: "separator",
                                        separator: ":"
                                    };
                                    throw new i("Unknown column alignment: " + e, t)
                                })),
                                hskipBeforeAndAfter: !0
                            };
                            return xr(t.parser, r, vr(t.envName))
                        },
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            var e = {
                                    matrix: null,
                                    pmatrix: ["(", ")"],
                                    bmatrix: ["[", "]"],
                                    Bmatrix: ["\\{", "\\}"],
                                    vmatrix: ["|", "|"],
                                    Vmatrix: ["\\Vert", "\\Vert"]
                                } [t.envName],
                                r = xr(t.parser, {
                                    hskipBeforeAndAfter: !1
                                }, vr(t.envName));
                            return e ? {
                                type: "leftright",
                                mode: t.mode,
                                body: [r],
                                left: e[0],
                                right: e[1],
                                rightColor: void 0
                            } : r
                        },
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["smallmatrix"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            var e = xr(t.parser, {
                                arraystretch: .5
                            }, "script");
                            return e.colSeparationType = "small", e
                        },
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["subarray"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = (Vt(e[0]) ? [e[0]] : Pt(e[0], "ordgroup").body).map((function (t) {
                                var e = Gt(t).text;
                                if (-1 !== "lc".indexOf(e)) return {
                                    type: "align",
                                    align: e
                                };
                                throw new i("Unknown column alignment: " + e, t)
                            }));
                            if (r.length > 1) throw new i("{subarray} can contain only one column");
                            var a = {
                                cols: r,
                                hskipBeforeAndAfter: !1,
                                arraystretch: .5
                            };
                            if ((a = xr(t.parser, a, "script")).body[0].length > 1) throw new i("{subarray} can contain only one column");
                            return a
                        },
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["cases", "dcases"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            var e = xr(t.parser, {
                                arraystretch: 1.2,
                                cols: [{
                                    type: "align",
                                    align: "l",
                                    pregap: 0,
                                    postgap: 1
                                }, {
                                    type: "align",
                                    align: "l",
                                    pregap: 0,
                                    postgap: 0
                                }]
                            }, vr(t.envName));
                            return {
                                type: "leftright",
                                mode: t.mode,
                                body: [e],
                                left: "\\{",
                                right: ".",
                                rightColor: void 0
                            }
                        },
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["aligned"],
                        props: {
                            numArgs: 0
                        },
                        handler: kr,
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["gathered"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            return xr(t.parser, {
                                cols: [{
                                    type: "align",
                                    align: "c"
                                }],
                                addJot: !0
                            }, "display")
                        },
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), fr({
                        type: "array",
                        names: ["alignedat"],
                        props: {
                            numArgs: 1
                        },
                        handler: kr,
                        htmlBuilder: br,
                        mathmlBuilder: wr
                    }), Qt({
                        type: "text",
                        names: ["\\hline", "\\hdashline"],
                        props: {
                            numArgs: 0,
                            allowedInText: !0,
                            allowedInMath: !0
                        },
                        handler: function (t, e) {
                            throw new i(t.funcName + " valid only within array environment")
                        }
                    });
                    var Sr = dr;
                    Qt({
                        type: "environment",
                        names: ["\\begin", "\\end"],
                        props: {
                            numArgs: 1,
                            argTypes: ["text"]
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0];
                            if ("ordgroup" !== n.type) throw new i("Invalid environment name", n);
                            for (var o = "", s = 0; s < n.body.length; ++s) o += Pt(n.body[s], "textord").text;
                            if ("\\begin" === a) {
                                if (!Sr.hasOwnProperty(o)) throw new i("No such environment: " + o, n);
                                var l = Sr[o],
                                    h = r.parseArguments("\\begin{" + o + "}", l),
                                    m = h.args,
                                    c = h.optArgs,
                                    u = {
                                        mode: r.mode,
                                        envName: o,
                                        parser: r
                                    },
                                    p = l.handler(u, m, c);
                                r.expect("\\end", !1);
                                var d = r.nextToken,
                                    f = Pt(r.parseFunction(), "environment");
                                if (f.name !== o) throw new i("Mismatch: \\begin{" + o + "} matched by \\end{" + f.name + "}", d);
                                return p
                            }
                            return {
                                type: "environment",
                                mode: r.mode,
                                name: o,
                                nameGroup: n
                            }
                        }
                    });
                    var zr = Lt.makeSpan;

                    function Mr(t, e) {
                        var r = se(t.body, e, !0);
                        return zr([t.mclass], r, e)
                    }

                    function _r(t, e) {
                        var r, a = ke(t.body, e);
                        return "minner" === t.mclass ? ve.newDocumentFragment(a) : ("mord" === t.mclass ? t.isCharacterBox ? (r = a[0]).type = "mi" : r = new ve.MathNode("mi", a) : (t.isCharacterBox ? (r = a[0]).type = "mo" : r = new ve.MathNode("mo", a), "mbin" === t.mclass ? (r.attributes.lspace = "0.22em", r.attributes.rspace = "0.22em") : "mpunct" === t.mclass ? (r.attributes.lspace = "0em", r.attributes.rspace = "0.17em") : "mopen" !== t.mclass && "mclose" !== t.mclass || (r.attributes.lspace = "0em", r.attributes.rspace = "0em")), r)
                    }
                    Qt({
                        type: "mclass",
                        names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0];
                            return {
                                type: "mclass",
                                mode: r.mode,
                                mclass: "m" + a.substr(5),
                                body: ee(n),
                                isCharacterBox: c.isCharacterBox(n)
                            }
                        },
                        htmlBuilder: Mr,
                        mathmlBuilder: _r
                    });
                    var Ar = function (t) {
                        var e = "ordgroup" === t.type && t.body.length ? t.body[0] : t;
                        return "atom" !== e.type || "bin" !== e.family && "rel" !== e.family ? "mord" : "m" + e.family
                    };
                    Qt({
                        type: "mclass",
                        names: ["\\@binrel"],
                        props: {
                            numArgs: 2
                        },
                        handler: function (t, e) {
                            return {
                                type: "mclass",
                                mode: t.parser.mode,
                                mclass: Ar(e[0]),
                                body: [e[1]],
                                isCharacterBox: c.isCharacterBox(e[1])
                            }
                        }
                    }), Qt({
                        type: "mclass",
                        names: ["\\stackrel", "\\overset", "\\underset"],
                        props: {
                            numArgs: 2
                        },
                        handler: function (t, e) {
                            var r, a = t.parser,
                                n = t.funcName,
                                o = e[1],
                                i = e[0];
                            r = "\\stackrel" !== n ? Ar(o) : "mrel";
                            var s = {
                                    type: "op",
                                    mode: o.mode,
                                    limits: !0,
                                    alwaysHandleSupSub: !0,
                                    parentIsSupSub: !1,
                                    symbol: !1,
                                    suppressBaseShift: "\\stackrel" !== n,
                                    body: ee(o)
                                },
                                l = {
                                    type: "supsub",
                                    mode: i.mode,
                                    base: s,
                                    sup: "\\underset" === n ? null : i,
                                    sub: "\\underset" === n ? i : null
                                };
                            return {
                                type: "mclass",
                                mode: a.mode,
                                mclass: r,
                                body: [l],
                                isCharacterBox: c.isCharacterBox(l)
                            }
                        },
                        htmlBuilder: Mr,
                        mathmlBuilder: _r
                    });
                    var Tr = function (t, e) {
                            var r = t.font,
                                a = e.withFont(r);
                            return ue(t.body, a)
                        },
                        qr = function (t, e) {
                            var r = t.font,
                                a = e.withFont(r);
                            return ze(t.body, a)
                        },
                        Br = {
                            "\\Bbb": "\\mathbb",
                            "\\bold": "\\mathbf",
                            "\\frak": "\\mathfrak",
                            "\\bm": "\\boldsymbol"
                        };
                    Qt({
                        type: "font",
                        names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"],
                        props: {
                            numArgs: 1,
                            greediness: 2
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0],
                                o = a;
                            return o in Br && (o = Br[o]), {
                                type: "font",
                                mode: r.mode,
                                font: o.slice(1),
                                body: n
                            }
                        },
                        htmlBuilder: Tr,
                        mathmlBuilder: qr
                    }), Qt({
                        type: "mclass",
                        names: ["\\boldsymbol", "\\bm"],
                        props: {
                            numArgs: 1,
                            greediness: 2
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[0],
                                n = c.isCharacterBox(a);
                            return {
                                type: "mclass",
                                mode: r.mode,
                                mclass: Ar(a),
                                body: [{
                                    type: "font",
                                    mode: r.mode,
                                    font: "boldsymbol",
                                    body: a
                                }],
                                isCharacterBox: n
                            }
                        }
                    }), Qt({
                        type: "font",
                        names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it"],
                        props: {
                            numArgs: 0,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = t.breakOnTokenText,
                                o = r.mode,
                                i = r.parseExpression(!0, n);
                            return {
                                type: "font",
                                mode: o,
                                font: "math" + a.slice(1),
                                body: {
                                    type: "ordgroup",
                                    mode: r.mode,
                                    body: i
                                }
                            }
                        },
                        htmlBuilder: Tr,
                        mathmlBuilder: qr
                    });
                    var Cr = function (t, e) {
                            var r = e;
                            return "display" === t ? r = r.id >= w.SCRIPT.id ? r.text() : w.DISPLAY : "text" === t && r.size === w.DISPLAY.size ? r = w.TEXT : "script" === t ? r = w.SCRIPT : "scriptscript" === t && (r = w.SCRIPTSCRIPT), r
                        },
                        Nr = function (t, e) {
                            var r, a = Cr(t.size, e.style),
                                n = a.fracNum(),
                                o = a.fracDen();
                            r = e.havingStyle(n);
                            var i = ue(t.numer, r, e);
                            if (t.continued) {
                                var s = 8.5 / e.fontMetrics().ptPerEm,
                                    l = 3.5 / e.fontMetrics().ptPerEm;
                                i.height = i.height < s ? s : i.height, i.depth = i.depth < l ? l : i.depth
                            }
                            r = e.havingStyle(o);
                            var h, m, c, u, p, d, f, g, x, v, b = ue(t.denom, r, e);
                            if (t.hasBarLine ? (t.barSize ? (m = At(t.barSize, e), h = Lt.makeLineSpan("frac-line", e, m)) : h = Lt.makeLineSpan("frac-line", e), m = h.height, c = h.height) : (h = null, m = 0, c = e.fontMetrics().defaultRuleThickness), a.size === w.DISPLAY.size || "display" === t.size ? (u = e.fontMetrics().num1, p = m > 0 ? 3 * c : 7 * c, d = e.fontMetrics().denom1) : (m > 0 ? (u = e.fontMetrics().num2, p = c) : (u = e.fontMetrics().num3, p = 3 * c), d = e.fontMetrics().denom2), h) {
                                var y = e.fontMetrics().axisHeight;
                                u - i.depth - (y + .5 * m) < p && (u += p - (u - i.depth - (y + .5 * m))), y - .5 * m - (b.height - d) < p && (d += p - (y - .5 * m - (b.height - d)));
                                var k = -(y - .5 * m);
                                f = Lt.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: b,
                                        shift: d
                                    }, {
                                        type: "elem",
                                        elem: h,
                                        shift: k
                                    }, {
                                        type: "elem",
                                        elem: i,
                                        shift: -u
                                    }]
                                }, e)
                            } else {
                                var S = u - i.depth - (b.height - d);
                                S < p && (u += .5 * (p - S), d += .5 * (p - S)), f = Lt.makeVList({
                                    positionType: "individualShift",
                                    children: [{
                                        type: "elem",
                                        elem: b,
                                        shift: d
                                    }, {
                                        type: "elem",
                                        elem: i,
                                        shift: -u
                                    }]
                                }, e)
                            }
                            return r = e.havingStyle(a), f.height *= r.sizeMultiplier / e.sizeMultiplier, f.depth *= r.sizeMultiplier / e.sizeMultiplier, g = a.size === w.DISPLAY.size ? e.fontMetrics().delim1 : e.fontMetrics().delim2, x = null == t.leftDelim ? ce(e, ["mopen"]) : ir(t.leftDelim, g, !0, e.havingStyle(a), t.mode, ["mopen"]), v = t.continued ? Lt.makeSpan([]) : null == t.rightDelim ? ce(e, ["mclose"]) : ir(t.rightDelim, g, !0, e.havingStyle(a), t.mode, ["mclose"]), Lt.makeSpan(["mord"].concat(r.sizingClasses(e)), [x, Lt.makeSpan(["mfrac"], [f]), v], e)
                        },
                        Or = function (t, e) {
                            var r = new ve.MathNode("mfrac", [ze(t.numer, e), ze(t.denom, e)]);
                            if (t.hasBarLine) {
                                if (t.barSize) {
                                    var a = At(t.barSize, e);
                                    r.setAttribute("linethickness", a + "em")
                                }
                            } else r.setAttribute("linethickness", "0px");
                            var n = Cr(t.size, e.style);
                            if (n.size !== e.style.size) {
                                r = new ve.MathNode("mstyle", [r]);
                                var o = n.size === w.DISPLAY.size ? "true" : "false";
                                r.setAttribute("displaystyle", o), r.setAttribute("scriptlevel", "0")
                            }
                            if (null != t.leftDelim || null != t.rightDelim) {
                                var i = [];
                                if (null != t.leftDelim) {
                                    var s = new ve.MathNode("mo", [new ve.TextNode(t.leftDelim.replace("\\", ""))]);
                                    s.setAttribute("fence", "true"), i.push(s)
                                }
                                if (i.push(r), null != t.rightDelim) {
                                    var l = new ve.MathNode("mo", [new ve.TextNode(t.rightDelim.replace("\\", ""))]);
                                    l.setAttribute("fence", "true"), i.push(l)
                                }
                                return ye(i)
                            }
                            return r
                        };
                    Qt({
                        type: "genfrac",
                        names: ["\\cfrac", "\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"],
                        props: {
                            numArgs: 2,
                            greediness: 2
                        },
                        handler: function (t, e) {
                            var r, a = t.parser,
                                n = t.funcName,
                                o = e[0],
                                i = e[1],
                                s = null,
                                l = null,
                                h = "auto";
                            switch (n) {
                                case "\\cfrac":
                                case "\\dfrac":
                                case "\\frac":
                                case "\\tfrac":
                                    r = !0;
                                    break;
                                case "\\\\atopfrac":
                                    r = !1;
                                    break;
                                case "\\dbinom":
                                case "\\binom":
                                case "\\tbinom":
                                    r = !1, s = "(", l = ")";
                                    break;
                                case "\\\\bracefrac":
                                    r = !1, s = "\\{", l = "\\}";
                                    break;
                                case "\\\\brackfrac":
                                    r = !1, s = "[", l = "]";
                                    break;
                                default:
                                    throw new Error("Unrecognized genfrac command")
                            }
                            switch (n) {
                                case "\\cfrac":
                                case "\\dfrac":
                                case "\\dbinom":
                                    h = "display";
                                    break;
                                case "\\tfrac":
                                case "\\tbinom":
                                    h = "text"
                            }
                            return {
                                type: "genfrac",
                                mode: a.mode,
                                continued: "\\cfrac" === n,
                                numer: o,
                                denom: i,
                                hasBarLine: r,
                                leftDelim: s,
                                rightDelim: l,
                                size: h,
                                barSize: null
                            }
                        },
                        htmlBuilder: Nr,
                        mathmlBuilder: Or
                    }), Qt({
                        type: "infix",
                        names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
                        props: {
                            numArgs: 0,
                            infix: !0
                        },
                        handler: function (t) {
                            var e, r = t.parser,
                                a = t.funcName,
                                n = t.token;
                            switch (a) {
                                case "\\over":
                                    e = "\\frac";
                                    break;
                                case "\\choose":
                                    e = "\\binom";
                                    break;
                                case "\\atop":
                                    e = "\\\\atopfrac";
                                    break;
                                case "\\brace":
                                    e = "\\\\bracefrac";
                                    break;
                                case "\\brack":
                                    e = "\\\\brackfrac";
                                    break;
                                default:
                                    throw new Error("Unrecognized infix genfrac command")
                            }
                            return {
                                type: "infix",
                                mode: r.mode,
                                replaceWith: e,
                                token: n
                            }
                        }
                    });
                    var Ir = ["display", "text", "script", "scriptscript"],
                        $r = function (t) {
                            var e = null;
                            return t.length > 0 && (e = "." === (e = t) ? null : e), e
                        };
                    Qt({
                        type: "genfrac",
                        names: ["\\genfrac"],
                        props: {
                            numArgs: 6,
                            greediness: 6,
                            argTypes: ["math", "math", "size", "text", "math", "math"]
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[4],
                                n = e[5],
                                o = Ht(e[0], "atom");
                            o && (o = Ft(e[0], "open"));
                            var i = o ? $r(o.text) : null,
                                s = Ht(e[1], "atom");
                            s && (s = Ft(e[1], "close"));
                            var l, h = s ? $r(s.text) : null,
                                m = Pt(e[2], "size"),
                                c = null;
                            l = !!m.isBlank || (c = m.value).number > 0;
                            var u = "auto",
                                p = Ht(e[3], "ordgroup");
                            if (p) {
                                if (p.body.length > 0) {
                                    var d = Pt(p.body[0], "textord");
                                    u = Ir[Number(d.text)]
                                }
                            } else p = Pt(e[3], "textord"), u = Ir[Number(p.text)];
                            return {
                                type: "genfrac",
                                mode: r.mode,
                                numer: a,
                                denom: n,
                                continued: !1,
                                hasBarLine: l,
                                barSize: c,
                                leftDelim: i,
                                rightDelim: h,
                                size: u
                            }
                        },
                        htmlBuilder: Nr,
                        mathmlBuilder: Or
                    }), Qt({
                        type: "infix",
                        names: ["\\above"],
                        props: {
                            numArgs: 1,
                            argTypes: ["size"],
                            infix: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = (t.funcName, t.token);
                            return {
                                type: "infix",
                                mode: r.mode,
                                replaceWith: "\\\\abovefrac",
                                size: Pt(e[0], "size").value,
                                token: a
                            }
                        }
                    }), Qt({
                        type: "genfrac",
                        names: ["\\\\abovefrac"],
                        props: {
                            numArgs: 3,
                            argTypes: ["math", "size", "math"]
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = (t.funcName, e[0]),
                                n = function (t) {
                                    if (!t) throw new Error("Expected non-null, but got " + String(t));
                                    return t
                                }(Pt(e[1], "infix").size),
                                o = e[2],
                                i = n.number > 0;
                            return {
                                type: "genfrac",
                                mode: r.mode,
                                numer: a,
                                denom: o,
                                continued: !1,
                                hasBarLine: i,
                                barSize: n,
                                leftDelim: null,
                                rightDelim: null,
                                size: "auto"
                            }
                        },
                        htmlBuilder: Nr,
                        mathmlBuilder: Or
                    });
                    var Er = function (t, e) {
                        var r, a, n = e.style,
                            o = Ht(t, "supsub");
                        o ? (r = o.sup ? ue(o.sup, e.havingStyle(n.sup()), e) : ue(o.sub, e.havingStyle(n.sub()), e), a = Pt(o.base, "horizBrace")) : a = Pt(t, "horizBrace");
                        var i, s = ue(a.base, e.havingBaseStyle(w.DISPLAY)),
                            l = Oe(a, e);
                        if (a.isOver ? (i = Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: s
                                }, {
                                    type: "kern",
                                    size: .1
                                }, {
                                    type: "elem",
                                    elem: l
                                }]
                            }, e)).children[0].children[0].children[1].classes.push("svg-align") : (i = Lt.makeVList({
                                positionType: "bottom",
                                positionData: s.depth + .1 + l.height,
                                children: [{
                                    type: "elem",
                                    elem: l
                                }, {
                                    type: "kern",
                                    size: .1
                                }, {
                                    type: "elem",
                                    elem: s
                                }]
                            }, e)).children[0].children[0].children[0].classes.push("svg-align"), r) {
                            var h = Lt.makeSpan(["mord", a.isOver ? "mover" : "munder"], [i], e);
                            i = a.isOver ? Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: h
                                }, {
                                    type: "kern",
                                    size: .2
                                }, {
                                    type: "elem",
                                    elem: r
                                }]
                            }, e) : Lt.makeVList({
                                positionType: "bottom",
                                positionData: h.depth + .2 + r.height + r.depth,
                                children: [{
                                    type: "elem",
                                    elem: r
                                }, {
                                    type: "kern",
                                    size: .2
                                }, {
                                    type: "elem",
                                    elem: h
                                }]
                            }, e)
                        }
                        return Lt.makeSpan(["mord", a.isOver ? "mover" : "munder"], [i], e)
                    };
                    Qt({
                        type: "horizBrace",
                        names: ["\\overbrace", "\\underbrace"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName;
                            return {
                                type: "horizBrace",
                                mode: r.mode,
                                label: a,
                                isOver: /^\\over/.test(a),
                                base: e[0]
                            }
                        },
                        htmlBuilder: Er,
                        mathmlBuilder: function (t, e) {
                            var r = Ne(t.label);
                            return new ve.MathNode(t.isOver ? "mover" : "munder", [ze(t.base, e), r])
                        }
                    }), Qt({
                        type: "href",
                        names: ["\\href"],
                        props: {
                            numArgs: 2,
                            argTypes: ["url", "original"],
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[1],
                                n = Pt(e[0], "url").url;
                            return r.settings.isTrusted({
                                command: "\\href",
                                url: n
                            }) ? {
                                type: "href",
                                mode: r.mode,
                                href: n,
                                body: ee(a)
                            } : r.formatUnsupportedCmd("\\href")
                        },
                        htmlBuilder: function (t, e) {
                            var r = se(t.body, e, !1);
                            return Lt.makeAnchor(t.href, [], r, e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = Se(t.body, e);
                            return r instanceof ge || (r = new ge("mrow", [r])), r.setAttribute("href", t.href), r
                        }
                    }), Qt({
                        type: "href",
                        names: ["\\url"],
                        props: {
                            numArgs: 1,
                            argTypes: ["url"],
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = Pt(e[0], "url").url;
                            if (!r.settings.isTrusted({
                                    command: "\\url",
                                    url: a
                                })) return r.formatUnsupportedCmd("\\url");
                            for (var n = [], o = 0; o < a.length; o++) {
                                var i = a[o];
                                "~" === i && (i = "\\textasciitilde"), n.push({
                                    type: "textord",
                                    mode: "text",
                                    text: i
                                })
                            }
                            var s = {
                                type: "text",
                                mode: r.mode,
                                font: "\\texttt",
                                body: n
                            };
                            return {
                                type: "href",
                                mode: r.mode,
                                href: a,
                                body: ee(s)
                            }
                        }
                    }), Qt({
                        type: "htmlmathml",
                        names: ["\\html@mathml"],
                        props: {
                            numArgs: 2,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            return {
                                type: "htmlmathml",
                                mode: t.parser.mode,
                                html: ee(e[0]),
                                mathml: ee(e[1])
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = se(t.html, e, !1);
                            return Lt.makeFragment(r)
                        },
                        mathmlBuilder: function (t, e) {
                            return Se(t.mathml, e)
                        }
                    });
                    var Rr = function (t) {
                        if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(t)) return {
                            number: +t,
                            unit: "bp"
                        };
                        var e = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t);
                        if (!e) throw new i("Invalid size: '" + t + "' in \\includegraphics");
                        var r = {
                            number: +(e[1] + e[2]),
                            unit: e[3]
                        };
                        if (!_t(r)) throw new i("Invalid unit: '" + r.unit + "' in \\includegraphics.");
                        return r
                    };
                    Qt({
                        type: "includegraphics",
                        names: ["\\includegraphics"],
                        props: {
                            numArgs: 1,
                            numOptionalArgs: 1,
                            argTypes: ["raw", "url"],
                            allowedInText: !1
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = {
                                    number: 0,
                                    unit: "em"
                                },
                                o = {
                                    number: .9,
                                    unit: "em"
                                },
                                s = {
                                    number: 0,
                                    unit: "em"
                                },
                                l = "";
                            if (r[0])
                                for (var h = Pt(r[0], "raw").string.split(","), m = 0; m < h.length; m++) {
                                    var c = h[m].split("=");
                                    if (2 === c.length) {
                                        var u = c[1].trim();
                                        switch (c[0].trim()) {
                                            case "alt":
                                                l = u;
                                                break;
                                            case "width":
                                                n = Rr(u);
                                                break;
                                            case "height":
                                                o = Rr(u);
                                                break;
                                            case "totalheight":
                                                s = Rr(u);
                                                break;
                                            default:
                                                throw new i("Invalid key: '" + c[0] + "' in \\includegraphics.")
                                        }
                                    }
                                }
                            var p = Pt(e[0], "url").url;
                            return "" === l && (l = (l = (l = p).replace(/^.*[\\/]/, "")).substring(0, l.lastIndexOf("."))), a.settings.isTrusted({
                                command: "\\includegraphics",
                                url: p
                            }) ? {
                                type: "includegraphics",
                                mode: a.mode,
                                alt: l,
                                width: n,
                                height: o,
                                totalheight: s,
                                src: p
                            } : a.formatUnsupportedCmd("\\includegraphics")
                        },
                        htmlBuilder: function (t, e) {
                            var r = At(t.height, e),
                                a = 0;
                            t.totalheight.number > 0 && (a = At(t.totalheight, e) - r, a = Number(a.toFixed(2)));
                            var n = 0;
                            t.width.number > 0 && (n = At(t.width, e));
                            var o = {
                                height: r + a + "em"
                            };
                            n > 0 && (o.width = n + "em"), a > 0 && (o.verticalAlign = -a + "em");
                            var i = new O(t.src, t.alt, o);
                            return i.height = r, i.depth = a, i
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mglyph", []);
                            r.setAttribute("alt", t.alt);
                            var a = At(t.height, e),
                                n = 0;
                            if (t.totalheight.number > 0 && (n = (n = At(t.totalheight, e) - a).toFixed(2), r.setAttribute("valign", "-" + n + "em")), r.setAttribute("height", a + n + "em"), t.width.number > 0) {
                                var o = At(t.width, e);
                                r.setAttribute("width", o + "em")
                            }
                            return r.setAttribute("src", t.src), r
                        }
                    }), Qt({
                        type: "kern",
                        names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
                        props: {
                            numArgs: 1,
                            argTypes: ["size"],
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = Pt(e[0], "size");
                            if (r.settings.strict) {
                                var o = "m" === a[1],
                                    i = "mu" === n.value.unit;
                                o ? (i || r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, not " + n.value.unit + " units"), "math" !== r.mode && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : i && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units")
                            }
                            return {
                                type: "kern",
                                mode: r.mode,
                                dimension: n.value
                            }
                        },
                        htmlBuilder: function (t, e) {
                            return Lt.makeGlue(t.dimension, e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = At(t.dimension, e);
                            return new ve.SpaceNode(r)
                        }
                    }), Qt({
                        type: "lap",
                        names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0];
                            return {
                                type: "lap",
                                mode: r.mode,
                                alignment: a.slice(5),
                                body: n
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r;
                            "clap" === t.alignment ? (r = Lt.makeSpan([], [ue(t.body, e)]), r = Lt.makeSpan(["inner"], [r], e)) : r = Lt.makeSpan(["inner"], [ue(t.body, e)]);
                            var a = Lt.makeSpan(["fix"], []),
                                n = Lt.makeSpan([t.alignment], [r, a], e),
                                o = Lt.makeSpan(["strut"]);
                            return o.style.height = n.height + n.depth + "em", o.style.verticalAlign = -n.depth + "em", n.children.unshift(o), n = Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: n
                                }]
                            }, e), Lt.makeSpan(["mord"], [n], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mpadded", [ze(t.body, e)]);
                            if ("rlap" !== t.alignment) {
                                var a = "llap" === t.alignment ? "-1" : "-0.5";
                                r.setAttribute("lspace", a + "width")
                            }
                            return r.setAttribute("width", "0px"), r
                        }
                    }), Qt({
                        type: "styling",
                        names: ["\\(", "$"],
                        props: {
                            numArgs: 0,
                            allowedInText: !0,
                            allowedInMath: !1
                        },
                        handler: function (t, e) {
                            var r = t.funcName,
                                a = t.parser,
                                n = a.mode;
                            a.switchMode("math");
                            var o = "\\(" === r ? "\\)" : "$",
                                i = a.parseExpression(!1, o);
                            return a.expect(o), a.switchMode(n), {
                                type: "styling",
                                mode: a.mode,
                                style: "text",
                                body: i
                            }
                        }
                    }), Qt({
                        type: "text",
                        names: ["\\)", "\\]"],
                        props: {
                            numArgs: 0,
                            allowedInText: !0,
                            allowedInMath: !1
                        },
                        handler: function (t, e) {
                            throw new i("Mismatched " + t.funcName)
                        }
                    });
                    var Dr = function (t, e) {
                        switch (e.style.size) {
                            case w.DISPLAY.size:
                                return t.display;
                            case w.TEXT.size:
                                return t.text;
                            case w.SCRIPT.size:
                                return t.script;
                            case w.SCRIPTSCRIPT.size:
                                return t.scriptscript;
                            default:
                                return t.text
                        }
                    };
                    Qt({
                        type: "mathchoice",
                        names: ["\\mathchoice"],
                        props: {
                            numArgs: 4
                        },
                        handler: function (t, e) {
                            return {
                                type: "mathchoice",
                                mode: t.parser.mode,
                                display: ee(e[0]),
                                text: ee(e[1]),
                                script: ee(e[2]),
                                scriptscript: ee(e[3])
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = Dr(t, e),
                                a = se(r, e, !1);
                            return Lt.makeFragment(a)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = Dr(t, e);
                            return Se(r, e)
                        }
                    });
                    var Lr = function (t, e, r, a, n, o, i) {
                            var s, l, h;
                            if (t = Lt.makeSpan([], [t]), e) {
                                var m = ue(e, a.havingStyle(n.sup()), a);
                                l = {
                                    elem: m,
                                    kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - m.depth)
                                }
                            }
                            if (r) {
                                var c = ue(r, a.havingStyle(n.sub()), a);
                                s = {
                                    elem: c,
                                    kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - c.height)
                                }
                            }
                            if (l && s) {
                                var u = a.fontMetrics().bigOpSpacing5 + s.elem.height + s.elem.depth + s.kern + t.depth + i;
                                h = Lt.makeVList({
                                    positionType: "bottom",
                                    positionData: u,
                                    children: [{
                                        type: "kern",
                                        size: a.fontMetrics().bigOpSpacing5
                                    }, {
                                        type: "elem",
                                        elem: s.elem,
                                        marginLeft: -o + "em"
                                    }, {
                                        type: "kern",
                                        size: s.kern
                                    }, {
                                        type: "elem",
                                        elem: t
                                    }, {
                                        type: "kern",
                                        size: l.kern
                                    }, {
                                        type: "elem",
                                        elem: l.elem,
                                        marginLeft: o + "em"
                                    }, {
                                        type: "kern",
                                        size: a.fontMetrics().bigOpSpacing5
                                    }]
                                }, a)
                            } else if (s) {
                                var p = t.height - i;
                                h = Lt.makeVList({
                                    positionType: "top",
                                    positionData: p,
                                    children: [{
                                        type: "kern",
                                        size: a.fontMetrics().bigOpSpacing5
                                    }, {
                                        type: "elem",
                                        elem: s.elem,
                                        marginLeft: -o + "em"
                                    }, {
                                        type: "kern",
                                        size: s.kern
                                    }, {
                                        type: "elem",
                                        elem: t
                                    }]
                                }, a)
                            } else {
                                if (!l) return t;
                                var d = t.depth + i;
                                h = Lt.makeVList({
                                    positionType: "bottom",
                                    positionData: d,
                                    children: [{
                                        type: "elem",
                                        elem: t
                                    }, {
                                        type: "kern",
                                        size: l.kern
                                    }, {
                                        type: "elem",
                                        elem: l.elem,
                                        marginLeft: o + "em"
                                    }, {
                                        type: "kern",
                                        size: a.fontMetrics().bigOpSpacing5
                                    }]
                                }, a)
                            }
                            return Lt.makeSpan(["mop", "op-limits"], [h], a)
                        },
                        Pr = ["\\smallint"],
                        Hr = function (t, e) {
                            var r, a, n, o = !1,
                                i = Ht(t, "supsub");
                            i ? (r = i.sup, a = i.sub, n = Pt(i.base, "op"), o = !0) : n = Pt(t, "op");
                            var s, l = e.style,
                                h = !1;
                            if (l.size === w.DISPLAY.size && n.symbol && !c.contains(Pr, n.name) && (h = !0), n.symbol) {
                                var m = h ? "Size2-Regular" : "Size1-Regular",
                                    u = "";
                                if ("\\oiint" !== n.name && "\\oiiint" !== n.name || (u = n.name.substr(1), n.name = "oiint" === u ? "\\iint" : "\\iiint"), s = Lt.makeSymbol(n.name, m, "math", e, ["mop", "op-symbol", h ? "large-op" : "small-op"]), u.length > 0) {
                                    var p = s.italic,
                                        d = Lt.staticSvg(u + "Size" + (h ? "2" : "1"), e);
                                    s = Lt.makeVList({
                                        positionType: "individualShift",
                                        children: [{
                                            type: "elem",
                                            elem: s,
                                            shift: 0
                                        }, {
                                            type: "elem",
                                            elem: d,
                                            shift: h ? .08 : 0
                                        }]
                                    }, e), n.name = "\\" + u, s.classes.unshift("mop"), s.italic = p
                                }
                            } else if (n.body) {
                                var f = se(n.body, e, !0);
                                1 === f.length && f[0] instanceof $ ? (s = f[0]).classes[0] = "mop" : s = Lt.makeSpan(["mop"], Lt.tryCombineChars(f), e)
                            } else {
                                for (var g = [], x = 1; x < n.name.length; x++) g.push(Lt.mathsym(n.name[x], n.mode, e));
                                s = Lt.makeSpan(["mop"], g, e)
                            }
                            var v = 0,
                                b = 0;
                            return (s instanceof $ || "\\oiint" === n.name || "\\oiiint" === n.name) && !n.suppressBaseShift && (v = (s.height - s.depth) / 2 - e.fontMetrics().axisHeight, b = s.italic), o ? Lr(s, r, a, e, l, b, v) : (v && (s.style.position = "relative", s.style.top = v + "em"), s)
                        },
                        Fr = function (t, e) {
                            var r;
                            if (t.symbol) r = new ge("mo", [be(t.name, t.mode)]), c.contains(Pr, t.name) && r.setAttribute("largeop", "false");
                            else if (t.body) r = new ge("mo", ke(t.body, e));
                            else {
                                r = new ge("mi", [new xe(t.name.slice(1))]);
                                var a = new ge("mo", [be("⁡", "text")]);
                                r = t.parentIsSupSub ? new ge("mo", [r, a]) : fe([r, a])
                            }
                            return r
                        },
                        Gr = {
                            "∏": "\\prod",
                            "∐": "\\coprod",
                            "∑": "\\sum",
                            "⋀": "\\bigwedge",
                            "⋁": "\\bigvee",
                            "⋂": "\\bigcap",
                            "⋃": "\\bigcup",
                            "⨀": "\\bigodot",
                            "⨁": "\\bigoplus",
                            "⨂": "\\bigotimes",
                            "⨄": "\\biguplus",
                            "⨆": "\\bigsqcup"
                        };
                    Qt({
                        type: "op",
                        names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName;
                            return 1 === a.length && (a = Gr[a]), {
                                type: "op",
                                mode: r.mode,
                                limits: !0,
                                parentIsSupSub: !1,
                                symbol: !0,
                                name: a
                            }
                        },
                        htmlBuilder: Hr,
                        mathmlBuilder: Fr
                    }), Qt({
                        type: "op",
                        names: ["\\mathop"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[0];
                            return {
                                type: "op",
                                mode: r.mode,
                                limits: !1,
                                parentIsSupSub: !1,
                                symbol: !1,
                                body: ee(a)
                            }
                        },
                        htmlBuilder: Hr,
                        mathmlBuilder: Fr
                    });
                    var Vr = {
                        "∫": "\\int",
                        "∬": "\\iint",
                        "∭": "\\iiint",
                        "∮": "\\oint",
                        "∯": "\\oiint",
                        "∰": "\\oiiint"
                    };
                    Qt({
                        type: "op",
                        names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            var e = t.parser,
                                r = t.funcName;
                            return {
                                type: "op",
                                mode: e.mode,
                                limits: !1,
                                parentIsSupSub: !1,
                                symbol: !1,
                                name: r
                            }
                        },
                        htmlBuilder: Hr,
                        mathmlBuilder: Fr
                    }), Qt({
                        type: "op",
                        names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            var e = t.parser,
                                r = t.funcName;
                            return {
                                type: "op",
                                mode: e.mode,
                                limits: !0,
                                parentIsSupSub: !1,
                                symbol: !1,
                                name: r
                            }
                        },
                        htmlBuilder: Hr,
                        mathmlBuilder: Fr
                    }), Qt({
                        type: "op",
                        names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
                        props: {
                            numArgs: 0
                        },
                        handler: function (t) {
                            var e = t.parser,
                                r = t.funcName;
                            return 1 === r.length && (r = Vr[r]), {
                                type: "op",
                                mode: e.mode,
                                limits: !1,
                                parentIsSupSub: !1,
                                symbol: !0,
                                name: r
                            }
                        },
                        htmlBuilder: Hr,
                        mathmlBuilder: Fr
                    });
                    var Ur = function (t, e) {
                        var r, a, n, o, i = !1,
                            s = Ht(t, "supsub");
                        if (s ? (r = s.sup, a = s.sub, n = Pt(s.base, "operatorname"), i = !0) : n = Pt(t, "operatorname"), n.body.length > 0) {
                            for (var l = n.body.map((function (t) {
                                    var e = t.text;
                                    return "string" == typeof e ? {
                                        type: "textord",
                                        mode: t.mode,
                                        text: e
                                    } : t
                                })), h = se(l, e.withFont("mathrm"), !0), m = 0; m < h.length; m++) {
                                var c = h[m];
                                c instanceof $ && (c.text = c.text.replace(/\u2212/, "-").replace(/\u2217/, "*"))
                            }
                            o = Lt.makeSpan(["mop"], h, e)
                        } else o = Lt.makeSpan(["mop"], [], e);
                        return i ? Lr(o, r, a, e, e.style, 0, 0) : o
                    };

                    function Xr(t, e, r) {
                        for (var a = se(t, e, !1), n = e.sizeMultiplier / r.sizeMultiplier, o = 0; o < a.length; o++) {
                            var i = a[o].classes.indexOf("sizing");
                            i < 0 ? Array.prototype.push.apply(a[o].classes, e.sizingClasses(r)) : a[o].classes[i + 1] === "reset-size" + e.size && (a[o].classes[i + 1] = "reset-size" + r.size), a[o].height *= n, a[o].depth *= n
                        }
                        return Lt.makeFragment(a)
                    }
                    Qt({
                        type: "operatorname",
                        names: ["\\operatorname", "\\operatorname*"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0];
                            return {
                                type: "operatorname",
                                mode: r.mode,
                                body: ee(n),
                                alwaysHandleSupSub: "\\operatorname*" === a,
                                limits: !1,
                                parentIsSupSub: !1
                            }
                        },
                        htmlBuilder: Ur,
                        mathmlBuilder: function (t, e) {
                            for (var r = ke(t.body, e.withFont("mathrm")), a = !0, n = 0; n < r.length; n++) {
                                var o = r[n];
                                if (o instanceof ve.SpaceNode);
                                else if (o instanceof ve.MathNode) switch (o.type) {
                                    case "mi":
                                    case "mn":
                                    case "ms":
                                    case "mspace":
                                    case "mtext":
                                        break;
                                    case "mo":
                                        var i = o.children[0];
                                        1 === o.children.length && i instanceof ve.TextNode ? i.text = i.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = !1;
                                        break;
                                    default:
                                        a = !1
                                } else a = !1
                            }
                            if (a) {
                                var s = r.map((function (t) {
                                    return t.toText()
                                })).join("");
                                r = [new ve.TextNode(s)]
                            }
                            var l = new ve.MathNode("mi", r);
                            l.setAttribute("mathvariant", "normal");
                            var h = new ve.MathNode("mo", [be("⁡", "text")]);
                            return t.parentIsSupSub ? new ve.MathNode("mo", [l, h]) : ve.newDocumentFragment([l, h])
                        }
                    }), te({
                        type: "ordgroup",
                        htmlBuilder: function (t, e) {
                            return t.semisimple ? Lt.makeFragment(se(t.body, e, !1)) : Lt.makeSpan(["mord"], se(t.body, e, !0), e)
                        },
                        mathmlBuilder: function (t, e) {
                            return Se(t.body, e, !0)
                        }
                    }), Qt({
                        type: "overline",
                        names: ["\\overline"],
                        props: {
                            numArgs: 1
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[0];
                            return {
                                type: "overline",
                                mode: r.mode,
                                body: a
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = ue(t.body, e.havingCrampedStyle()),
                                a = Lt.makeLineSpan("overline-line", e),
                                n = e.fontMetrics().defaultRuleThickness,
                                o = Lt.makeVList({
                                    positionType: "firstBaseline",
                                    children: [{
                                        type: "elem",
                                        elem: r
                                    }, {
                                        type: "kern",
                                        size: 3 * n
                                    }, {
                                        type: "elem",
                                        elem: a
                                    }, {
                                        type: "kern",
                                        size: n
                                    }]
                                }, e);
                            return Lt.makeSpan(["mord", "overline"], [o], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mo", [new ve.TextNode("‾")]);
                            r.setAttribute("stretchy", "true");
                            var a = new ve.MathNode("mover", [ze(t.body, e), r]);
                            return a.setAttribute("accent", "true"), a
                        }
                    }), Qt({
                        type: "phantom",
                        names: ["\\phantom"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[0];
                            return {
                                type: "phantom",
                                mode: r.mode,
                                body: ee(a)
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = se(t.body, e.withPhantom(), !1);
                            return Lt.makeFragment(r)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = ke(t.body, e);
                            return new ve.MathNode("mphantom", r)
                        }
                    }), Qt({
                        type: "hphantom",
                        names: ["\\hphantom"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[0];
                            return {
                                type: "hphantom",
                                mode: r.mode,
                                body: a
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = Lt.makeSpan([], [ue(t.body, e.withPhantom())]);
                            if (r.height = 0, r.depth = 0, r.children)
                                for (var a = 0; a < r.children.length; a++) r.children[a].height = 0, r.children[a].depth = 0;
                            return r = Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: r
                                }]
                            }, e), Lt.makeSpan(["mord"], [r], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = ke(ee(t.body), e),
                                a = new ve.MathNode("mphantom", r),
                                n = new ve.MathNode("mpadded", [a]);
                            return n.setAttribute("height", "0px"), n.setAttribute("depth", "0px"), n
                        }
                    }), Qt({
                        type: "vphantom",
                        names: ["\\vphantom"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = e[0];
                            return {
                                type: "vphantom",
                                mode: r.mode,
                                body: a
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = Lt.makeSpan(["inner"], [ue(t.body, e.withPhantom())]),
                                a = Lt.makeSpan(["fix"], []);
                            return Lt.makeSpan(["mord", "rlap"], [r, a], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = ke(ee(t.body), e),
                                a = new ve.MathNode("mphantom", r),
                                n = new ve.MathNode("mpadded", [a]);
                            return n.setAttribute("width", "0px"), n
                        }
                    }), Qt({
                        type: "raisebox",
                        names: ["\\raisebox"],
                        props: {
                            numArgs: 2,
                            argTypes: ["size", "hbox"],
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = Pt(e[0], "size").value,
                                n = e[1];
                            return {
                                type: "raisebox",
                                mode: r.mode,
                                dy: a,
                                body: n
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = ue(t.body, e),
                                a = At(t.dy, e);
                            return Lt.makeVList({
                                positionType: "shift",
                                positionData: -a,
                                children: [{
                                    type: "elem",
                                    elem: r
                                }]
                            }, e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mpadded", [ze(t.body, e)]),
                                a = t.dy.number + t.dy.unit;
                            return r.setAttribute("voffset", a), r
                        }
                    }), Qt({
                        type: "rule",
                        names: ["\\rule"],
                        props: {
                            numArgs: 2,
                            numOptionalArgs: 1,
                            argTypes: ["size", "size", "size"]
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = r[0],
                                o = Pt(e[0], "size"),
                                i = Pt(e[1], "size");
                            return {
                                type: "rule",
                                mode: a.mode,
                                shift: n && Pt(n, "size").value,
                                width: o.value,
                                height: i.value
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = Lt.makeSpan(["mord", "rule"], [], e),
                                a = At(t.width, e),
                                n = At(t.height, e),
                                o = t.shift ? At(t.shift, e) : 0;
                            return r.style.borderRightWidth = a + "em", r.style.borderTopWidth = n + "em", r.style.bottom = o + "em", r.width = a, r.height = n + o, r.depth = -o, r.maxFontSize = 1.125 * n * e.sizeMultiplier, r
                        },
                        mathmlBuilder: function (t, e) {
                            var r = At(t.width, e),
                                a = At(t.height, e),
                                n = t.shift ? At(t.shift, e) : 0,
                                o = e.color && e.getColor() || "black",
                                i = new ve.MathNode("mspace");
                            i.setAttribute("mathbackground", o), i.setAttribute("width", r + "em"), i.setAttribute("height", a + "em");
                            var s = new ve.MathNode("mpadded", [i]);
                            return n >= 0 ? s.setAttribute("height", "+" + n + "em") : (s.setAttribute("height", n + "em"), s.setAttribute("depth", "+" + -n + "em")), s.setAttribute("voffset", n + "em"), s
                        }
                    });
                    var Wr = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
                    Qt({
                        type: "sizing",
                        names: Wr,
                        props: {
                            numArgs: 0,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.breakOnTokenText,
                                a = t.funcName,
                                n = t.parser,
                                o = n.parseExpression(!1, r);
                            return {
                                type: "sizing",
                                mode: n.mode,
                                size: Wr.indexOf(a) + 1,
                                body: o
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = e.havingSize(t.size);
                            return Xr(t.body, r, e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = e.havingSize(t.size),
                                a = ke(t.body, r),
                                n = new ve.MathNode("mstyle", a);
                            return n.setAttribute("mathsize", r.sizeMultiplier + "em"), n
                        }
                    }), Qt({
                        type: "smash",
                        names: ["\\smash"],
                        props: {
                            numArgs: 1,
                            numOptionalArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = !1,
                                o = !1,
                                i = r[0] && Pt(r[0], "ordgroup");
                            if (i)
                                for (var s = "", l = 0; l < i.body.length; ++l)
                                    if ("t" === (s = i.body[l].text)) n = !0;
                                    else {
                                        if ("b" !== s) {
                                            n = !1, o = !1;
                                            break
                                        }
                                        o = !0
                                    }
                            else n = !0, o = !0;
                            var h = e[0];
                            return {
                                type: "smash",
                                mode: a.mode,
                                body: h,
                                smashHeight: n,
                                smashDepth: o
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = Lt.makeSpan([], [ue(t.body, e)]);
                            if (!t.smashHeight && !t.smashDepth) return r;
                            if (t.smashHeight && (r.height = 0, r.children))
                                for (var a = 0; a < r.children.length; a++) r.children[a].height = 0;
                            if (t.smashDepth && (r.depth = 0, r.children))
                                for (var n = 0; n < r.children.length; n++) r.children[n].depth = 0;
                            var o = Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: r
                                }]
                            }, e);
                            return Lt.makeSpan(["mord"], [o], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mpadded", [ze(t.body, e)]);
                            return t.smashHeight && r.setAttribute("height", "0px"), t.smashDepth && r.setAttribute("depth", "0px"), r
                        }
                    }), Qt({
                        type: "sqrt",
                        names: ["\\sqrt"],
                        props: {
                            numArgs: 1,
                            numOptionalArgs: 1
                        },
                        handler: function (t, e, r) {
                            var a = t.parser,
                                n = r[0],
                                o = e[0];
                            return {
                                type: "sqrt",
                                mode: a.mode,
                                body: o,
                                index: n
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = ue(t.body, e.havingCrampedStyle());
                            0 === r.height && (r.height = e.fontMetrics().xHeight), r = Lt.wrapFragment(r, e);
                            var a = e.fontMetrics().defaultRuleThickness,
                                n = a;
                            e.style.id < w.TEXT.id && (n = e.fontMetrics().xHeight);
                            var o = a + n / 4,
                                i = r.height + r.depth + o + a,
                                s = nr(i, e),
                                l = s.span,
                                h = s.ruleWidth,
                                m = s.advanceWidth,
                                c = l.height - h;
                            c > r.height + r.depth + o && (o = (o + c - r.height - r.depth) / 2);
                            var u = l.height - r.height - o - h;
                            r.style.paddingLeft = m + "em";
                            var p = Lt.makeVList({
                                positionType: "firstBaseline",
                                children: [{
                                    type: "elem",
                                    elem: r,
                                    wrapperClasses: ["svg-align"]
                                }, {
                                    type: "kern",
                                    size: -(r.height + u)
                                }, {
                                    type: "elem",
                                    elem: l
                                }, {
                                    type: "kern",
                                    size: h
                                }]
                            }, e);
                            if (t.index) {
                                var d = e.havingStyle(w.SCRIPTSCRIPT),
                                    f = ue(t.index, d, e),
                                    g = .6 * (p.height - p.depth),
                                    x = Lt.makeVList({
                                        positionType: "shift",
                                        positionData: -g,
                                        children: [{
                                            type: "elem",
                                            elem: f
                                        }]
                                    }, e),
                                    v = Lt.makeSpan(["root"], [x]);
                                return Lt.makeSpan(["mord", "sqrt"], [v, p], e)
                            }
                            return Lt.makeSpan(["mord", "sqrt"], [p], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = t.body,
                                a = t.index;
                            return a ? new ve.MathNode("mroot", [ze(r, e), ze(a, e)]) : new ve.MathNode("msqrt", [ze(r, e)])
                        }
                    });
                    var Yr = {
                        display: w.DISPLAY,
                        text: w.TEXT,
                        script: w.SCRIPT,
                        scriptscript: w.SCRIPTSCRIPT
                    };
                    Qt({
                        type: "styling",
                        names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
                        props: {
                            numArgs: 0,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.breakOnTokenText,
                                a = t.funcName,
                                n = t.parser,
                                o = n.parseExpression(!0, r),
                                i = a.slice(1, a.length - 5);
                            return {
                                type: "styling",
                                mode: n.mode,
                                style: i,
                                body: o
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = Yr[t.style],
                                a = e.havingStyle(r).withFont("");
                            return Xr(t.body, a, e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = Yr[t.style],
                                a = e.havingStyle(r),
                                n = ke(t.body, a),
                                o = new ve.MathNode("mstyle", n),
                                i = {
                                    display: ["0", "true"],
                                    text: ["0", "false"],
                                    script: ["1", "false"],
                                    scriptscript: ["2", "false"]
                                } [t.style];
                            return o.setAttribute("scriptlevel", i[0]), o.setAttribute("displaystyle", i[1]), o
                        }
                    }), te({
                        type: "supsub",
                        htmlBuilder: function (t, e) {
                            var r = function (t, e) {
                                var r = t.base;
                                return r ? "op" === r.type ? r.limits && (e.style.size === w.DISPLAY.size || r.alwaysHandleSupSub) ? Hr : null : "operatorname" === r.type ? r.alwaysHandleSupSub && (e.style.size === w.DISPLAY.size || r.limits) ? Ur : null : "accent" === r.type ? c.isCharacterBox(r.base) ? Ie : null : "horizBrace" === r.type && !t.sub === r.isOver ? Er : null : null
                            }(t, e);
                            if (r) return r(t, e);
                            var a, n, o, i = t.base,
                                s = t.sup,
                                l = t.sub,
                                h = ue(i, e),
                                m = e.fontMetrics(),
                                u = 0,
                                p = 0,
                                d = i && c.isCharacterBox(i);
                            if (s) {
                                var f = e.havingStyle(e.style.sup());
                                a = ue(s, f, e), d || (u = h.height - f.fontMetrics().supDrop * f.sizeMultiplier / e.sizeMultiplier)
                            }
                            if (l) {
                                var g = e.havingStyle(e.style.sub());
                                n = ue(l, g, e), d || (p = h.depth + g.fontMetrics().subDrop * g.sizeMultiplier / e.sizeMultiplier)
                            }
                            o = e.style === w.DISPLAY ? m.sup1 : e.style.cramped ? m.sup3 : m.sup2;
                            var x, v = e.sizeMultiplier,
                                b = .5 / m.ptPerEm / v + "em",
                                y = null;
                            if (n) {
                                var k = t.base && "op" === t.base.type && t.base.name && ("\\oiint" === t.base.name || "\\oiiint" === t.base.name);
                                (h instanceof $ || k) && (y = -h.italic + "em")
                            }
                            if (a && n) {
                                u = Math.max(u, o, a.depth + .25 * m.xHeight), p = Math.max(p, m.sub2);
                                var S = 4 * m.defaultRuleThickness;
                                if (u - a.depth - (n.height - p) < S) {
                                    p = S - (u - a.depth) + n.height;
                                    var z = .8 * m.xHeight - (u - a.depth);
                                    z > 0 && (u += z, p -= z)
                                }
                                var M = [{
                                    type: "elem",
                                    elem: n,
                                    shift: p,
                                    marginRight: b,
                                    marginLeft: y
                                }, {
                                    type: "elem",
                                    elem: a,
                                    shift: -u,
                                    marginRight: b
                                }];
                                x = Lt.makeVList({
                                    positionType: "individualShift",
                                    children: M
                                }, e)
                            } else if (n) {
                                p = Math.max(p, m.sub1, n.height - .8 * m.xHeight);
                                var _ = [{
                                    type: "elem",
                                    elem: n,
                                    marginLeft: y,
                                    marginRight: b
                                }];
                                x = Lt.makeVList({
                                    positionType: "shift",
                                    positionData: p,
                                    children: _
                                }, e)
                            } else {
                                if (!a) throw new Error("supsub must have either sup or sub.");
                                u = Math.max(u, o, a.depth + .25 * m.xHeight), x = Lt.makeVList({
                                    positionType: "shift",
                                    positionData: -u,
                                    children: [{
                                        type: "elem",
                                        elem: a,
                                        marginRight: b
                                    }]
                                }, e)
                            }
                            var A = me(h, "right") || "mord";
                            return Lt.makeSpan([A], [h, Lt.makeSpan(["msupsub"], [x])], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r, a = !1,
                                n = Ht(t.base, "horizBrace");
                            n && !!t.sup === n.isOver && (a = !0, r = n.isOver), !t.base || "op" !== t.base.type && "operatorname" !== t.base.type || (t.base.parentIsSupSub = !0);
                            var o, i = [ze(t.base, e)];
                            if (t.sub && i.push(ze(t.sub, e)), t.sup && i.push(ze(t.sup, e)), a) o = r ? "mover" : "munder";
                            else if (t.sub)
                                if (t.sup) {
                                    var s = t.base;
                                    o = s && "op" === s.type && s.limits && e.style === w.DISPLAY || s && "operatorname" === s.type && s.alwaysHandleSupSub && (e.style === w.DISPLAY || s.limits) ? "munderover" : "msubsup"
                                } else {
                                    var l = t.base;
                                    o = l && "op" === l.type && l.limits && (e.style === w.DISPLAY || l.alwaysHandleSupSub) || l && "operatorname" === l.type && l.alwaysHandleSupSub && (l.limits || e.style === w.DISPLAY) ? "munder" : "msub"
                                }
                            else {
                                var h = t.base;
                                o = h && "op" === h.type && h.limits && (e.style === w.DISPLAY || h.alwaysHandleSupSub) || h && "operatorname" === h.type && h.alwaysHandleSupSub && (h.limits || e.style === w.DISPLAY) ? "mover" : "msup"
                            }
                            return new ve.MathNode(o, i)
                        }
                    }), te({
                        type: "atom",
                        htmlBuilder: function (t, e) {
                            return Lt.mathsym(t.text, t.mode, e, ["m" + t.family])
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mo", [be(t.text, t.mode)]);
                            if ("bin" === t.family) {
                                var a = we(t, e);
                                "bold-italic" === a && r.setAttribute("mathvariant", a)
                            } else "punct" === t.family ? r.setAttribute("separator", "true") : "open" !== t.family && "close" !== t.family || r.setAttribute("stretchy", "false");
                            return r
                        }
                    });
                    var Zr = {
                        mi: "italic",
                        mn: "normal",
                        mtext: "normal"
                    };
                    te({
                        type: "mathord",
                        htmlBuilder: function (t, e) {
                            return Lt.makeOrd(t, e, "mathord")
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mi", [be(t.text, t.mode, e)]),
                                a = we(t, e) || "italic";
                            return a !== Zr[r.type] && r.setAttribute("mathvariant", a), r
                        }
                    }), te({
                        type: "textord",
                        htmlBuilder: function (t, e) {
                            return Lt.makeOrd(t, e, "textord")
                        },
                        mathmlBuilder: function (t, e) {
                            var r, a = be(t.text, t.mode, e),
                                n = we(t, e) || "normal";
                            return r = "text" === t.mode ? new ve.MathNode("mtext", [a]) : /[0-9]/.test(t.text) ? new ve.MathNode("mn", [a]) : "\\prime" === t.text ? new ve.MathNode("mo", [a]) : new ve.MathNode("mi", [a]), n !== Zr[r.type] && r.setAttribute("mathvariant", n), r
                        }
                    });
                    var jr = {
                            "\\nobreak": "nobreak",
                            "\\allowbreak": "allowbreak"
                        },
                        Kr = {
                            " ": {},
                            "\\ ": {},
                            "~": {
                                className: "nobreak"
                            },
                            "\\space": {},
                            "\\nobreakspace": {
                                className: "nobreak"
                            }
                        };
                    te({
                        type: "spacing",
                        htmlBuilder: function (t, e) {
                            if (Kr.hasOwnProperty(t.text)) {
                                var r = Kr[t.text].className || "";
                                if ("text" === t.mode) {
                                    var a = Lt.makeOrd(t, e, "textord");
                                    return a.classes.push(r), a
                                }
                                return Lt.makeSpan(["mspace", r], [Lt.mathsym(t.text, t.mode, e)], e)
                            }
                            if (jr.hasOwnProperty(t.text)) return Lt.makeSpan(["mspace", jr[t.text]], [], e);
                            throw new i('Unknown type of space "' + t.text + '"')
                        },
                        mathmlBuilder: function (t, e) {
                            if (!Kr.hasOwnProperty(t.text)) {
                                if (jr.hasOwnProperty(t.text)) return new ve.MathNode("mspace");
                                throw new i('Unknown type of space "' + t.text + '"')
                            }
                            return new ve.MathNode("mtext", [new ve.TextNode(" ")])
                        }
                    });
                    var Jr = function () {
                        var t = new ve.MathNode("mtd", []);
                        return t.setAttribute("width", "50%"), t
                    };
                    te({
                        type: "tag",
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mtable", [new ve.MathNode("mtr", [Jr(), new ve.MathNode("mtd", [Se(t.body, e)]), Jr(), new ve.MathNode("mtd", [Se(t.tag, e)])])]);
                            return r.setAttribute("width", "100%"), r
                        }
                    });
                    var Qr = {
                            "\\text": void 0,
                            "\\textrm": "textrm",
                            "\\textsf": "textsf",
                            "\\texttt": "texttt",
                            "\\textnormal": "textrm"
                        },
                        ta = {
                            "\\textbf": "textbf",
                            "\\textmd": "textmd"
                        },
                        ea = {
                            "\\textit": "textit",
                            "\\textup": "textup"
                        },
                        ra = function (t, e) {
                            var r = t.font;
                            return r ? Qr[r] ? e.withTextFontFamily(Qr[r]) : ta[r] ? e.withTextFontWeight(ta[r]) : e.withTextFontShape(ea[r]) : e
                        };
                    Qt({
                        type: "text",
                        names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textmd", "\\textit", "\\textup"],
                        props: {
                            numArgs: 1,
                            argTypes: ["text"],
                            greediness: 2,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            var r = t.parser,
                                a = t.funcName,
                                n = e[0];
                            return {
                                type: "text",
                                mode: r.mode,
                                body: ee(n),
                                font: a
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = ra(t, e),
                                a = se(t.body, r, !0);
                            return Lt.makeSpan(["mord", "text"], Lt.tryCombineChars(a), r)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = ra(t, e);
                            return Se(t.body, r)
                        }
                    }), Qt({
                        type: "underline",
                        names: ["\\underline"],
                        props: {
                            numArgs: 1,
                            allowedInText: !0
                        },
                        handler: function (t, e) {
                            return {
                                type: "underline",
                                mode: t.parser.mode,
                                body: e[0]
                            }
                        },
                        htmlBuilder: function (t, e) {
                            var r = ue(t.body, e),
                                a = Lt.makeLineSpan("underline-line", e),
                                n = e.fontMetrics().defaultRuleThickness,
                                o = Lt.makeVList({
                                    positionType: "top",
                                    positionData: r.height,
                                    children: [{
                                        type: "kern",
                                        size: n
                                    }, {
                                        type: "elem",
                                        elem: a
                                    }, {
                                        type: "kern",
                                        size: 3 * n
                                    }, {
                                        type: "elem",
                                        elem: r
                                    }]
                                }, e);
                            return Lt.makeSpan(["mord", "underline"], [o], e)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.MathNode("mo", [new ve.TextNode("‾")]);
                            r.setAttribute("stretchy", "true");
                            var a = new ve.MathNode("munder", [ze(t.body, e), r]);
                            return a.setAttribute("accentunder", "true"), a
                        }
                    }), Qt({
                        type: "verb",
                        names: ["\\verb"],
                        props: {
                            numArgs: 0,
                            allowedInText: !0
                        },
                        handler: function (t, e, r) {
                            throw new i("\\verb ended by end of line instead of matching delimiter")
                        },
                        htmlBuilder: function (t, e) {
                            for (var r = aa(t), a = [], n = e.havingStyle(e.style.text()), o = 0; o < r.length; o++) {
                                var i = r[o];
                                "~" === i && (i = "\\textasciitilde"), a.push(Lt.makeSymbol(i, "Typewriter-Regular", t.mode, n, ["mord", "texttt"]))
                            }
                            return Lt.makeSpan(["mord", "text"].concat(n.sizingClasses(e)), Lt.tryCombineChars(a), n)
                        },
                        mathmlBuilder: function (t, e) {
                            var r = new ve.TextNode(aa(t)),
                                a = new ve.MathNode("mtext", [r]);
                            return a.setAttribute("mathvariant", "monospace"), a
                        }
                    });
                    var aa = function (t) {
                            return t.body.replace(/ /g, t.star ? "␣" : " ")
                        },
                        na = jt,
                        oa = new RegExp("^(\\\\[a-zA-Z@]+)[ \r\n\t]*$"),
                        ia = new RegExp("[̀-ͯ]+$"),
                        sa = function () {
                            function t(t, e) {
                                this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = t, this.settings = e, this.tokenRegex = new RegExp("([ \r\n\t]+)|([!-\\[\\]-‧‪-퟿豈-￿][̀-ͯ]*|[\ud800-\udbff][\udc00-\udfff][̀-ͯ]*|\\\\verb\\*([^]).*?\\3|\\\\verb([^*a-zA-Z]).*?\\4|\\\\operatorname\\*|\\\\[a-zA-Z@]+[ \r\n\t]*|\\\\[^\ud800-\udfff])", "g"), this.catcodes = {
                                    "%": 14
                                }
                            }
                            var e = t.prototype;
                            return e.setCatcode = function (t, e) {
                                this.catcodes[t] = e
                            }, e.lex = function () {
                                var t = this.input,
                                    e = this.tokenRegex.lastIndex;
                                if (e === t.length) return new n("EOF", new a(this, e, e));
                                var r = this.tokenRegex.exec(t);
                                if (null === r || r.index !== e) throw new i("Unexpected character: '" + t[e] + "'", new n(t[e], new a(this, e, e + 1)));
                                var o = r[2] || " ";
                                if (14 === this.catcodes[o]) {
                                    var s = t.indexOf("\n", this.tokenRegex.lastIndex);
                                    return -1 === s ? (this.tokenRegex.lastIndex = t.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = s + 1, this.lex()
                                }
                                var l = o.match(oa);
                                return l && (o = l[1]), new n(o, new a(this, e, this.tokenRegex.lastIndex))
                            }, t
                        }(),
                        la = function () {
                            function t(t, e) {
                                void 0 === t && (t = {}), void 0 === e && (e = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = e, this.builtins = t, this.undefStack = []
                            }
                            var e = t.prototype;
                            return e.beginGroup = function () {
                                this.undefStack.push({})
                            }, e.endGroup = function () {
                                if (0 === this.undefStack.length) throw new i("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
                                var t = this.undefStack.pop();
                                for (var e in t) t.hasOwnProperty(e) && (void 0 === t[e] ? delete this.current[e] : this.current[e] = t[e])
                            }, e.has = function (t) {
                                return this.current.hasOwnProperty(t) || this.builtins.hasOwnProperty(t)
                            }, e.get = function (t) {
                                return this.current.hasOwnProperty(t) ? this.current[t] : this.builtins[t]
                            }, e.set = function (t, e, r) {
                                if (void 0 === r && (r = !1), r) {
                                    for (var a = 0; a < this.undefStack.length; a++) delete this.undefStack[a][t];
                                    this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][t] = e)
                                } else {
                                    var n = this.undefStack[this.undefStack.length - 1];
                                    n && !n.hasOwnProperty(t) && (n[t] = this.current[t])
                                }
                                this.current[t] = e
                            }, t
                        }(),
                        ha = {},
                        ma = ha;

                    function ca(t, e) {
                        ha[t] = e
                    }
                    ca("\\@firstoftwo", (function (t) {
                        return {
                            tokens: t.consumeArgs(2)[0],
                            numArgs: 0
                        }
                    })), ca("\\@secondoftwo", (function (t) {
                        return {
                            tokens: t.consumeArgs(2)[1],
                            numArgs: 0
                        }
                    })), ca("\\@ifnextchar", (function (t) {
                        var e = t.consumeArgs(3),
                            r = t.future();
                        return 1 === e[0].length && e[0][0].text === r.text ? {
                            tokens: e[1],
                            numArgs: 0
                        } : {
                            tokens: e[2],
                            numArgs: 0
                        }
                    })), ca("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}"), ca("\\TextOrMath", (function (t) {
                        var e = t.consumeArgs(2);
                        return "text" === t.mode ? {
                            tokens: e[0],
                            numArgs: 0
                        } : {
                            tokens: e[1],
                            numArgs: 0
                        }
                    }));
                    var ua = {
                        0: 0,
                        1: 1,
                        2: 2,
                        3: 3,
                        4: 4,
                        5: 5,
                        6: 6,
                        7: 7,
                        8: 8,
                        9: 9,
                        a: 10,
                        A: 10,
                        b: 11,
                        B: 11,
                        c: 12,
                        C: 12,
                        d: 13,
                        D: 13,
                        e: 14,
                        E: 14,
                        f: 15,
                        F: 15
                    };
                    ca("\\char", (function (t) {
                        var e, r = t.popToken(),
                            a = "";
                        if ("'" === r.text) e = 8, r = t.popToken();
                        else if ('"' === r.text) e = 16, r = t.popToken();
                        else if ("`" === r.text)
                            if ("\\" === (r = t.popToken()).text[0]) a = r.text.charCodeAt(1);
                            else {
                                if ("EOF" === r.text) throw new i("\\char` missing argument");
                                a = r.text.charCodeAt(0)
                            }
                        else e = 10;
                        if (e) {
                            if (null == (a = ua[r.text]) || a >= e) throw new i("Invalid base-" + e + " digit " + r.text);
                            for (var n; null != (n = ua[t.future().text]) && n < e;) a *= e, a += n, t.popToken()
                        }
                        return "\\@char{" + a + "}"
                    }));
                    var pa = function (t, e) {
                        var r = t.consumeArgs(1)[0];
                        if (1 !== r.length) throw new i("\\gdef's first argument must be a macro name");
                        var a = r[0].text,
                            n = 0;
                        for (r = t.consumeArgs(1)[0]; 1 === r.length && "#" === r[0].text;) {
                            if (1 !== (r = t.consumeArgs(1)[0]).length) throw new i('Invalid argument number length "' + r.length + '"');
                            if (!/^[1-9]$/.test(r[0].text)) throw new i('Invalid argument number "' + r[0].text + '"');
                            if (n++, parseInt(r[0].text) !== n) throw new i('Argument number "' + r[0].text + '" out of order');
                            r = t.consumeArgs(1)[0]
                        }
                        return t.macros.set(a, {
                            tokens: r,
                            numArgs: n
                        }, e), ""
                    };
                    ca("\\gdef", (function (t) {
                        return pa(t, !0)
                    })), ca("\\def", (function (t) {
                        return pa(t, !1)
                    })), ca("\\global", (function (t) {
                        var e = t.consumeArgs(1)[0];
                        if (1 !== e.length) throw new i("Invalid command after \\global");
                        var r = e[0].text;
                        if ("\\def" === r) return pa(t, !0);
                        throw new i("Invalid command '" + r + "' after \\global")
                    }));
                    var da = function (t, e, r) {
                        var a = t.consumeArgs(1)[0];
                        if (1 !== a.length) throw new i("\\newcommand's first argument must be a macro name");
                        var n = a[0].text,
                            o = t.isDefined(n);
                        if (o && !e) throw new i("\\newcommand{" + n + "} attempting to redefine " + n + "; use \\renewcommand");
                        if (!o && !r) throw new i("\\renewcommand{" + n + "} when command " + n + " does not yet exist; use \\newcommand");
                        var s = 0;
                        if (1 === (a = t.consumeArgs(1)[0]).length && "[" === a[0].text) {
                            for (var l = "", h = t.expandNextToken();
                                "]" !== h.text && "EOF" !== h.text;) l += h.text, h = t.expandNextToken();
                            if (!l.match(/^\s*[0-9]+\s*$/)) throw new i("Invalid number of arguments: " + l);
                            s = parseInt(l), a = t.consumeArgs(1)[0]
                        }
                        return t.macros.set(n, {
                            tokens: a,
                            numArgs: s
                        }), ""
                    };
                    ca("\\newcommand", (function (t) {
                        return da(t, !1, !0)
                    })), ca("\\renewcommand", (function (t) {
                        return da(t, !0, !1)
                    })), ca("\\providecommand", (function (t) {
                        return da(t, !0, !0)
                    })), ca("\\bgroup", "{"), ca("\\egroup", "}"), ca("\\lq", "`"), ca("\\rq", "'"), ca("\\aa", "\\r a"), ca("\\AA", "\\r A"), ca("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}"), ca("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}"), ca("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}"), ca("ℬ", "\\mathscr{B}"), ca("ℰ", "\\mathscr{E}"), ca("ℱ", "\\mathscr{F}"), ca("ℋ", "\\mathscr{H}"), ca("ℐ", "\\mathscr{I}"), ca("ℒ", "\\mathscr{L}"), ca("ℳ", "\\mathscr{M}"), ca("ℛ", "\\mathscr{R}"), ca("ℭ", "\\mathfrak{C}"), ca("ℌ", "\\mathfrak{H}"), ca("ℨ", "\\mathfrak{Z}"), ca("\\Bbbk", "\\Bbb{k}"), ca("·", "\\cdotp"), ca("\\llap", "\\mathllap{\\textrm{#1}}"), ca("\\rlap", "\\mathrlap{\\textrm{#1}}"), ca("\\clap", "\\mathclap{\\textrm{#1}}"), ca("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}'), ca("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}"), ca("\\ne", "\\neq"), ca("≠", "\\neq"), ca("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"), ca("∉", "\\notin"), ca("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"), ca("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}"), ca("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}"), ca("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}"), ca("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"), ca("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}"), ca("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}"), ca("⟂", "\\perp"), ca("‼", "\\mathclose{!\\mkern-0.8mu!}"), ca("∌", "\\notni"), ca("⌜", "\\ulcorner"), ca("⌝", "\\urcorner"), ca("⌞", "\\llcorner"), ca("⌟", "\\lrcorner"), ca("©", "\\copyright"), ca("®", "\\textregistered"), ca("️", "\\textregistered"), ca("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}"), ca("⋮", "\\vdots"), ca("\\varGamma", "\\mathit{\\Gamma}"), ca("\\varDelta", "\\mathit{\\Delta}"), ca("\\varTheta", "\\mathit{\\Theta}"), ca("\\varLambda", "\\mathit{\\Lambda}"), ca("\\varXi", "\\mathit{\\Xi}"), ca("\\varPi", "\\mathit{\\Pi}"), ca("\\varSigma", "\\mathit{\\Sigma}"), ca("\\varUpsilon", "\\mathit{\\Upsilon}"), ca("\\varPhi", "\\mathit{\\Phi}"), ca("\\varPsi", "\\mathit{\\Psi}"), ca("\\varOmega", "\\mathit{\\Omega}"), ca("\\substack", "\\begin{subarray}{c}#1\\end{subarray}"), ca("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu"), ca("\\boxed", "\\fbox{$\\displaystyle{#1}$}"), ca("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;"), ca("\\implies", "\\DOTSB\\;\\Longrightarrow\\;"), ca("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
                    var fa = {
                        ",": "\\dotsc",
                        "\\not": "\\dotsb",
                        "+": "\\dotsb",
                        "=": "\\dotsb",
                        "<": "\\dotsb",
                        ">": "\\dotsb",
                        "-": "\\dotsb",
                        "*": "\\dotsb",
                        ":": "\\dotsb",
                        "\\DOTSB": "\\dotsb",
                        "\\coprod": "\\dotsb",
                        "\\bigvee": "\\dotsb",
                        "\\bigwedge": "\\dotsb",
                        "\\biguplus": "\\dotsb",
                        "\\bigcap": "\\dotsb",
                        "\\bigcup": "\\dotsb",
                        "\\prod": "\\dotsb",
                        "\\sum": "\\dotsb",
                        "\\bigotimes": "\\dotsb",
                        "\\bigoplus": "\\dotsb",
                        "\\bigodot": "\\dotsb",
                        "\\bigsqcup": "\\dotsb",
                        "\\And": "\\dotsb",
                        "\\longrightarrow": "\\dotsb",
                        "\\Longrightarrow": "\\dotsb",
                        "\\longleftarrow": "\\dotsb",
                        "\\Longleftarrow": "\\dotsb",
                        "\\longleftrightarrow": "\\dotsb",
                        "\\Longleftrightarrow": "\\dotsb",
                        "\\mapsto": "\\dotsb",
                        "\\longmapsto": "\\dotsb",
                        "\\hookrightarrow": "\\dotsb",
                        "\\doteq": "\\dotsb",
                        "\\mathbin": "\\dotsb",
                        "\\mathrel": "\\dotsb",
                        "\\relbar": "\\dotsb",
                        "\\Relbar": "\\dotsb",
                        "\\xrightarrow": "\\dotsb",
                        "\\xleftarrow": "\\dotsb",
                        "\\DOTSI": "\\dotsi",
                        "\\int": "\\dotsi",
                        "\\oint": "\\dotsi",
                        "\\iint": "\\dotsi",
                        "\\iiint": "\\dotsi",
                        "\\iiiint": "\\dotsi",
                        "\\idotsint": "\\dotsi",
                        "\\DOTSX": "\\dotsx"
                    };
                    ca("\\dots", (function (t) {
                        var e = "\\dotso",
                            r = t.expandAfterFuture().text;
                        return r in fa ? e = fa[r] : ("\\not" === r.substr(0, 4) || r in Y.math && c.contains(["bin", "rel"], Y.math[r].group)) && (e = "\\dotsb"), e
                    }));
                    var ga = {
                        ")": !0,
                        "]": !0,
                        "\\rbrack": !0,
                        "\\}": !0,
                        "\\rbrace": !0,
                        "\\rangle": !0,
                        "\\rceil": !0,
                        "\\rfloor": !0,
                        "\\rgroup": !0,
                        "\\rmoustache": !0,
                        "\\right": !0,
                        "\\bigr": !0,
                        "\\biggr": !0,
                        "\\Bigr": !0,
                        "\\Biggr": !0,
                        $: !0,
                        ";": !0,
                        ".": !0,
                        ",": !0
                    };
                    ca("\\dotso", (function (t) {
                        return t.future().text in ga ? "\\ldots\\," : "\\ldots"
                    })), ca("\\dotsc", (function (t) {
                        var e = t.future().text;
                        return e in ga && "," !== e ? "\\ldots\\," : "\\ldots"
                    })), ca("\\cdots", (function (t) {
                        return t.future().text in ga ? "\\@cdots\\," : "\\@cdots"
                    })), ca("\\dotsb", "\\cdots"), ca("\\dotsm", "\\cdots"), ca("\\dotsi", "\\!\\cdots"), ca("\\dotsx", "\\ldots\\,"), ca("\\DOTSI", "\\relax"), ca("\\DOTSB", "\\relax"), ca("\\DOTSX", "\\relax"), ca("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"), ca("\\,", "\\tmspace+{3mu}{.1667em}"), ca("\\thinspace", "\\,"), ca("\\>", "\\mskip{4mu}"), ca("\\:", "\\tmspace+{4mu}{.2222em}"), ca("\\medspace", "\\:"), ca("\\;", "\\tmspace+{5mu}{.2777em}"), ca("\\thickspace", "\\;"), ca("\\!", "\\tmspace-{3mu}{.1667em}"), ca("\\negthinspace", "\\!"), ca("\\negmedspace", "\\tmspace-{4mu}{.2222em}"), ca("\\negthickspace", "\\tmspace-{5mu}{.277em}"), ca("\\enspace", "\\kern.5em "), ca("\\enskip", "\\hskip.5em\\relax"), ca("\\quad", "\\hskip1em\\relax"), ca("\\qquad", "\\hskip2em\\relax"), ca("\\tag", "\\@ifstar\\tag@literal\\tag@paren"), ca("\\tag@paren", "\\tag@literal{({#1})}"), ca("\\tag@literal", (function (t) {
                        if (t.macros.get("\\df@tag")) throw new i("Multiple \\tag");
                        return "\\gdef\\df@tag{\\text{#1}}"
                    })), ca("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"), ca("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"), ca("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}"), ca("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"), ca("\\pmb", "\\html@mathml{\\@binrel{#1}{\\mathrlap{#1}\\kern0.5px#1}}{\\mathbf{#1}}"), ca("\\\\", "\\newline"), ca("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
                    var xa = P["Main-Regular"]["T".charCodeAt(0)][1] - .7 * P["Main-Regular"]["A".charCodeAt(0)][1] + "em";
                    ca("\\LaTeX", "\\textrm{\\html@mathml{L\\kern-.36em\\raisebox{" + xa + "}{\\scriptstyle A}\\kern-.15em\\TeX}{LaTeX}}"), ca("\\KaTeX", "\\textrm{\\html@mathml{K\\kern-.17em\\raisebox{" + xa + "}{\\scriptstyle A}\\kern-.15em\\TeX}{KaTeX}}"), ca("\\hspace", "\\@ifstar\\@hspacer\\@hspace"), ca("\\@hspace", "\\hskip #1\\relax"), ca("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax"), ca("\\ordinarycolon", ":"), ca("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}"), ca("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'), ca("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'), ca("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'), ca("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'), ca("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'), ca("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'), ca("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'), ca("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'), ca("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'), ca("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'), ca("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'), ca("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'), ca("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'), ca("∷", "\\dblcolon"), ca("∹", "\\eqcolon"), ca("≔", "\\coloneqq"), ca("≕", "\\eqqcolon"), ca("⩴", "\\Coloneqq"), ca("\\ratio", "\\vcentcolon"), ca("\\coloncolon", "\\dblcolon"), ca("\\colonequals", "\\coloneqq"), ca("\\coloncolonequals", "\\Coloneqq"), ca("\\equalscolon", "\\eqqcolon"), ca("\\equalscoloncolon", "\\Eqqcolon"), ca("\\colonminus", "\\coloneq"), ca("\\coloncolonminus", "\\Coloneq"), ca("\\minuscolon", "\\eqcolon"), ca("\\minuscoloncolon", "\\Eqcolon"), ca("\\coloncolonapprox", "\\Colonapprox"), ca("\\coloncolonsim", "\\Colonsim"), ca("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}"), ca("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}"), ca("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}"), ca("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"), ca("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}"), ca("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}"), ca("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}"), ca("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}"), ca("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}"), ca("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}"), ca("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}"), ca("\\nleqq", "\\html@mathml{\\@nleqq}{≰}"), ca("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}"), ca("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}"), ca("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}"), ca("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}"), ca("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}"), ca("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}"), ca("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}"), ca("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}"), ca("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}"), ca("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"), ca("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"), ca("⟦", "\\llbracket"), ca("⟧", "\\rrbracket"), ca("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"), ca("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"), ca("⦃", "\\lBrace"), ca("⦄", "\\rBrace"), ca("\\darr", "\\downarrow"), ca("\\dArr", "\\Downarrow"), ca("\\Darr", "\\Downarrow"), ca("\\lang", "\\langle"), ca("\\rang", "\\rangle"), ca("\\uarr", "\\uparrow"), ca("\\uArr", "\\Uparrow"), ca("\\Uarr", "\\Uparrow"), ca("\\N", "\\mathbb{N}"), ca("\\R", "\\mathbb{R}"), ca("\\Z", "\\mathbb{Z}"), ca("\\alef", "\\aleph"), ca("\\alefsym", "\\aleph"), ca("\\Alpha", "\\mathrm{A}"), ca("\\Beta", "\\mathrm{B}"), ca("\\bull", "\\bullet"), ca("\\Chi", "\\mathrm{X}"), ca("\\clubs", "\\clubsuit"), ca("\\cnums", "\\mathbb{C}"), ca("\\Complex", "\\mathbb{C}"), ca("\\Dagger", "\\ddagger"), ca("\\diamonds", "\\diamondsuit"), ca("\\empty", "\\emptyset"), ca("\\Epsilon", "\\mathrm{E}"), ca("\\Eta", "\\mathrm{H}"), ca("\\exist", "\\exists"), ca("\\harr", "\\leftrightarrow"), ca("\\hArr", "\\Leftrightarrow"), ca("\\Harr", "\\Leftrightarrow"), ca("\\hearts", "\\heartsuit"), ca("\\image", "\\Im"), ca("\\infin", "\\infty"), ca("\\Iota", "\\mathrm{I}"), ca("\\isin", "\\in"), ca("\\Kappa", "\\mathrm{K}"), ca("\\larr", "\\leftarrow"), ca("\\lArr", "\\Leftarrow"), ca("\\Larr", "\\Leftarrow"), ca("\\lrarr", "\\leftrightarrow"), ca("\\lrArr", "\\Leftrightarrow"), ca("\\Lrarr", "\\Leftrightarrow"), ca("\\Mu", "\\mathrm{M}"), ca("\\natnums", "\\mathbb{N}"), ca("\\Nu", "\\mathrm{N}"), ca("\\Omicron", "\\mathrm{O}"), ca("\\plusmn", "\\pm"), ca("\\rarr", "\\rightarrow"), ca("\\rArr", "\\Rightarrow"), ca("\\Rarr", "\\Rightarrow"), ca("\\real", "\\Re"), ca("\\reals", "\\mathbb{R}"), ca("\\Reals", "\\mathbb{R}"), ca("\\Rho", "\\mathrm{P}"), ca("\\sdot", "\\cdot"), ca("\\sect", "\\S"), ca("\\spades", "\\spadesuit"), ca("\\sub", "\\subset"), ca("\\sube", "\\subseteq"), ca("\\supe", "\\supseteq"), ca("\\Tau", "\\mathrm{T}"), ca("\\thetasym", "\\vartheta"), ca("\\weierp", "\\wp"), ca("\\Zeta", "\\mathrm{Z}"), ca("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}"), ca("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}"), ca("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits"), ca("\\blue", "\\textcolor{##6495ed}{#1}"), ca("\\orange", "\\textcolor{##ffa500}{#1}"), ca("\\pink", "\\textcolor{##ff00af}{#1}"), ca("\\red", "\\textcolor{##df0030}{#1}"), ca("\\green", "\\textcolor{##28ae7b}{#1}"), ca("\\gray", "\\textcolor{gray}{#1}"), ca("\\purple", "\\textcolor{##9d38bd}{#1}"), ca("\\blueA", "\\textcolor{##ccfaff}{#1}"), ca("\\blueB", "\\textcolor{##80f6ff}{#1}"), ca("\\blueC", "\\textcolor{##63d9ea}{#1}"), ca("\\blueD", "\\textcolor{##11accd}{#1}"), ca("\\blueE", "\\textcolor{##0c7f99}{#1}"), ca("\\tealA", "\\textcolor{##94fff5}{#1}"), ca("\\tealB", "\\textcolor{##26edd5}{#1}"), ca("\\tealC", "\\textcolor{##01d1c1}{#1}"), ca("\\tealD", "\\textcolor{##01a995}{#1}"), ca("\\tealE", "\\textcolor{##208170}{#1}"), ca("\\greenA", "\\textcolor{##b6ffb0}{#1}"), ca("\\greenB", "\\textcolor{##8af281}{#1}"), ca("\\greenC", "\\textcolor{##74cf70}{#1}"), ca("\\greenD", "\\textcolor{##1fab54}{#1}"), ca("\\greenE", "\\textcolor{##0d923f}{#1}"), ca("\\goldA", "\\textcolor{##ffd0a9}{#1}"), ca("\\goldB", "\\textcolor{##ffbb71}{#1}"), ca("\\goldC", "\\textcolor{##ff9c39}{#1}"), ca("\\goldD", "\\textcolor{##e07d10}{#1}"), ca("\\goldE", "\\textcolor{##a75a05}{#1}"), ca("\\redA", "\\textcolor{##fca9a9}{#1}"), ca("\\redB", "\\textcolor{##ff8482}{#1}"), ca("\\redC", "\\textcolor{##f9685d}{#1}"), ca("\\redD", "\\textcolor{##e84d39}{#1}"), ca("\\redE", "\\textcolor{##bc2612}{#1}"), ca("\\maroonA", "\\textcolor{##ffbde0}{#1}"), ca("\\maroonB", "\\textcolor{##ff92c6}{#1}"), ca("\\maroonC", "\\textcolor{##ed5fa6}{#1}"), ca("\\maroonD", "\\textcolor{##ca337c}{#1}"), ca("\\maroonE", "\\textcolor{##9e034e}{#1}"), ca("\\purpleA", "\\textcolor{##ddd7ff}{#1}"), ca("\\purpleB", "\\textcolor{##c6b9fc}{#1}"), ca("\\purpleC", "\\textcolor{##aa87ff}{#1}"), ca("\\purpleD", "\\textcolor{##7854ab}{#1}"), ca("\\purpleE", "\\textcolor{##543b78}{#1}"), ca("\\mintA", "\\textcolor{##f5f9e8}{#1}"), ca("\\mintB", "\\textcolor{##edf2df}{#1}"), ca("\\mintC", "\\textcolor{##e0e5cc}{#1}"), ca("\\grayA", "\\textcolor{##f6f7f7}{#1}"), ca("\\grayB", "\\textcolor{##f0f1f2}{#1}"), ca("\\grayC", "\\textcolor{##e3e5e6}{#1}"), ca("\\grayD", "\\textcolor{##d6d8da}{#1}"), ca("\\grayE", "\\textcolor{##babec2}{#1}"), ca("\\grayF", "\\textcolor{##888d93}{#1}"), ca("\\grayG", "\\textcolor{##626569}{#1}"), ca("\\grayH", "\\textcolor{##3b3e40}{#1}"), ca("\\grayI", "\\textcolor{##21242c}{#1}"), ca("\\kaBlue", "\\textcolor{##314453}{#1}"), ca("\\kaGreen", "\\textcolor{##71B307}{#1}");
                    var va = {
                            "\\relax": !0,
                            "^": !0,
                            _: !0,
                            "\\limits": !0,
                            "\\nolimits": !0
                        },
                        ba = function () {
                            function t(t, e, r) {
                                this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = e, this.expansionCount = 0, this.feed(t), this.macros = new la(ma, e.macros), this.mode = r, this.stack = []
                            }
                            var e = t.prototype;
                            return e.feed = function (t) {
                                this.lexer = new sa(t, this.settings)
                            }, e.switchMode = function (t) {
                                this.mode = t
                            }, e.beginGroup = function () {
                                this.macros.beginGroup()
                            }, e.endGroup = function () {
                                this.macros.endGroup()
                            }, e.future = function () {
                                return 0 === this.stack.length && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1]
                            }, e.popToken = function () {
                                return this.future(), this.stack.pop()
                            }, e.pushToken = function (t) {
                                this.stack.push(t)
                            }, e.pushTokens = function (t) {
                                var e;
                                (e = this.stack).push.apply(e, t)
                            }, e.consumeSpaces = function () {
                                for (;
                                    " " === this.future().text;) this.stack.pop()
                            }, e.consumeArgs = function (t) {
                                for (var e = [], r = 0; r < t; ++r) {
                                    this.consumeSpaces();
                                    var a = this.popToken();
                                    if ("{" === a.text) {
                                        for (var n = [], o = 1; 0 !== o;) {
                                            var s = this.popToken();
                                            if (n.push(s), "{" === s.text) ++o;
                                            else if ("}" === s.text) --o;
                                            else if ("EOF" === s.text) throw new i("End of input in macro argument", a)
                                        }
                                        n.pop(), n.reverse(), e[r] = n
                                    } else {
                                        if ("EOF" === a.text) throw new i("End of input expecting macro argument");
                                        e[r] = [a]
                                    }
                                }
                                return e
                            }, e.expandOnce = function () {
                                var t = this.popToken(),
                                    e = t.text,
                                    r = this._getExpansion(e);
                                if (null == r) return this.pushToken(t), t;
                                if (this.expansionCount++, this.expansionCount > this.settings.maxExpand) throw new i("Too many expansions: infinite loop or need to increase maxExpand setting");
                                var a = r.tokens;
                                if (r.numArgs)
                                    for (var n = this.consumeArgs(r.numArgs), o = (a = a.slice()).length - 1; o >= 0; --o) {
                                        var s = a[o];
                                        if ("#" === s.text) {
                                            if (0 === o) throw new i("Incomplete placeholder at end of macro body", s);
                                            if ("#" === (s = a[--o]).text) a.splice(o + 1, 1);
                                            else {
                                                if (!/^[1-9]$/.test(s.text)) throw new i("Not a valid argument number", s);
                                                var l;
                                                (l = a).splice.apply(l, [o, 2].concat(n[+s.text - 1]))
                                            }
                                        }
                                    }
                                return this.pushTokens(a), a
                            }, e.expandAfterFuture = function () {
                                return this.expandOnce(), this.future()
                            }, e.expandNextToken = function () {
                                for (;;) {
                                    var t = this.expandOnce();
                                    if (t instanceof n) {
                                        if ("\\relax" !== t.text) return this.stack.pop();
                                        this.stack.pop()
                                    }
                                }
                                throw new Error
                            }, e.expandMacro = function (t) {
                                if (this.macros.get(t)) {
                                    var e = [],
                                        r = this.stack.length;
                                    for (this.pushToken(new n(t)); this.stack.length > r;) this.expandOnce() instanceof n && e.push(this.stack.pop());
                                    return e
                                }
                            }, e.expandMacroAsText = function (t) {
                                var e = this.expandMacro(t);
                                return e ? e.map((function (t) {
                                    return t.text
                                })).join("") : e
                            }, e._getExpansion = function (t) {
                                var e = this.macros.get(t);
                                if (null == e) return e;
                                var r = "function" == typeof e ? e(this) : e;
                                if ("string" == typeof r) {
                                    var a = 0;
                                    if (-1 !== r.indexOf("#"))
                                        for (var n = r.replace(/##/g, ""); - 1 !== n.indexOf("#" + (a + 1));) ++a;
                                    for (var o = new sa(r, this.settings), i = [], s = o.lex();
                                        "EOF" !== s.text;) i.push(s), s = o.lex();
                                    return i.reverse(), {
                                        tokens: i,
                                        numArgs: a
                                    }
                                }
                                return r
                            }, e.isDefined = function (t) {
                                return this.macros.has(t) || na.hasOwnProperty(t) || Y.math.hasOwnProperty(t) || Y.text.hasOwnProperty(t) || va.hasOwnProperty(t)
                            }, t
                        }(),
                        ya = {
                            "́": {
                                text: "\\'",
                                math: "\\acute"
                            },
                            "̀": {
                                text: "\\`",
                                math: "\\grave"
                            },
                            "̈": {
                                text: '\\"',
                                math: "\\ddot"
                            },
                            "̃": {
                                text: "\\~",
                                math: "\\tilde"
                            },
                            "̄": {
                                text: "\\=",
                                math: "\\bar"
                            },
                            "̆": {
                                text: "\\u",
                                math: "\\breve"
                            },
                            "̌": {
                                text: "\\v",
                                math: "\\check"
                            },
                            "̂": {
                                text: "\\^",
                                math: "\\hat"
                            },
                            "̇": {
                                text: "\\.",
                                math: "\\dot"
                            },
                            "̊": {
                                text: "\\r",
                                math: "\\mathring"
                            },
                            "̋": {
                                text: "\\H"
                            }
                        },
                        wa = {
                            "á": "á",
                            "à": "à",
                            "ä": "ä",
                            "ǟ": "ǟ",
                            "ã": "ã",
                            "ā": "ā",
                            "ă": "ă",
                            "ắ": "ắ",
                            "ằ": "ằ",
                            "ẵ": "ẵ",
                            "ǎ": "ǎ",
                            "â": "â",
                            "ấ": "ấ",
                            "ầ": "ầ",
                            "ẫ": "ẫ",
                            "ȧ": "ȧ",
                            "ǡ": "ǡ",
                            "å": "å",
                            "ǻ": "ǻ",
                            "ḃ": "ḃ",
                            "ć": "ć",
                            "č": "č",
                            "ĉ": "ĉ",
                            "ċ": "ċ",
                            "ď": "ď",
                            "ḋ": "ḋ",
                            "é": "é",
                            "è": "è",
                            "ë": "ë",
                            "ẽ": "ẽ",
                            "ē": "ē",
                            "ḗ": "ḗ",
                            "ḕ": "ḕ",
                            "ĕ": "ĕ",
                            "ě": "ě",
                            "ê": "ê",
                            "ế": "ế",
                            "ề": "ề",
                            "ễ": "ễ",
                            "ė": "ė",
                            "ḟ": "ḟ",
                            "ǵ": "ǵ",
                            "ḡ": "ḡ",
                            "ğ": "ğ",
                            "ǧ": "ǧ",
                            "ĝ": "ĝ",
                            "ġ": "ġ",
                            "ḧ": "ḧ",
                            "ȟ": "ȟ",
                            "ĥ": "ĥ",
                            "ḣ": "ḣ",
                            "í": "í",
                            "ì": "ì",
                            "ï": "ï",
                            "ḯ": "ḯ",
                            "ĩ": "ĩ",
                            "ī": "ī",
                            "ĭ": "ĭ",
                            "ǐ": "ǐ",
                            "î": "î",
                            "ǰ": "ǰ",
                            "ĵ": "ĵ",
                            "ḱ": "ḱ",
                            "ǩ": "ǩ",
                            "ĺ": "ĺ",
                            "ľ": "ľ",
                            "ḿ": "ḿ",
                            "ṁ": "ṁ",
                            "ń": "ń",
                            "ǹ": "ǹ",
                            "ñ": "ñ",
                            "ň": "ň",
                            "ṅ": "ṅ",
                            "ó": "ó",
                            "ò": "ò",
                            "ö": "ö",
                            "ȫ": "ȫ",
                            "õ": "õ",
                            "ṍ": "ṍ",
                            "ṏ": "ṏ",
                            "ȭ": "ȭ",
                            "ō": "ō",
                            "ṓ": "ṓ",
                            "ṑ": "ṑ",
                            "ŏ": "ŏ",
                            "ǒ": "ǒ",
                            "ô": "ô",
                            "ố": "ố",
                            "ồ": "ồ",
                            "ỗ": "ỗ",
                            "ȯ": "ȯ",
                            "ȱ": "ȱ",
                            "ő": "ő",
                            "ṕ": "ṕ",
                            "ṗ": "ṗ",
                            "ŕ": "ŕ",
                            "ř": "ř",
                            "ṙ": "ṙ",
                            "ś": "ś",
                            "ṥ": "ṥ",
                            "š": "š",
                            "ṧ": "ṧ",
                            "ŝ": "ŝ",
                            "ṡ": "ṡ",
                            "ẗ": "ẗ",
                            "ť": "ť",
                            "ṫ": "ṫ",
                            "ú": "ú",
                            "ù": "ù",
                            "ü": "ü",
                            "ǘ": "ǘ",
                            "ǜ": "ǜ",
                            "ǖ": "ǖ",
                            "ǚ": "ǚ",
                            "ũ": "ũ",
                            "ṹ": "ṹ",
                            "ū": "ū",
                            "ṻ": "ṻ",
                            "ŭ": "ŭ",
                            "ǔ": "ǔ",
                            "û": "û",
                            "ů": "ů",
                            "ű": "ű",
                            "ṽ": "ṽ",
                            "ẃ": "ẃ",
                            "ẁ": "ẁ",
                            "ẅ": "ẅ",
                            "ŵ": "ŵ",
                            "ẇ": "ẇ",
                            "ẘ": "ẘ",
                            "ẍ": "ẍ",
                            "ẋ": "ẋ",
                            "ý": "ý",
                            "ỳ": "ỳ",
                            "ÿ": "ÿ",
                            "ỹ": "ỹ",
                            "ȳ": "ȳ",
                            "ŷ": "ŷ",
                            "ẏ": "ẏ",
                            "ẙ": "ẙ",
                            "ź": "ź",
                            "ž": "ž",
                            "ẑ": "ẑ",
                            "ż": "ż",
                            "Á": "Á",
                            "À": "À",
                            "Ä": "Ä",
                            "Ǟ": "Ǟ",
                            "Ã": "Ã",
                            "Ā": "Ā",
                            "Ă": "Ă",
                            "Ắ": "Ắ",
                            "Ằ": "Ằ",
                            "Ẵ": "Ẵ",
                            "Ǎ": "Ǎ",
                            "Â": "Â",
                            "Ấ": "Ấ",
                            "Ầ": "Ầ",
                            "Ẫ": "Ẫ",
                            "Ȧ": "Ȧ",
                            "Ǡ": "Ǡ",
                            "Å": "Å",
                            "Ǻ": "Ǻ",
                            "Ḃ": "Ḃ",
                            "Ć": "Ć",
                            "Č": "Č",
                            "Ĉ": "Ĉ",
                            "Ċ": "Ċ",
                            "Ď": "Ď",
                            "Ḋ": "Ḋ",
                            "É": "É",
                            "È": "È",
                            "Ë": "Ë",
                            "Ẽ": "Ẽ",
                            "Ē": "Ē",
                            "Ḗ": "Ḗ",
                            "Ḕ": "Ḕ",
                            "Ĕ": "Ĕ",
                            "Ě": "Ě",
                            "Ê": "Ê",
                            "Ế": "Ế",
                            "Ề": "Ề",
                            "Ễ": "Ễ",
                            "Ė": "Ė",
                            "Ḟ": "Ḟ",
                            "Ǵ": "Ǵ",
                            "Ḡ": "Ḡ",
                            "Ğ": "Ğ",
                            "Ǧ": "Ǧ",
                            "Ĝ": "Ĝ",
                            "Ġ": "Ġ",
                            "Ḧ": "Ḧ",
                            "Ȟ": "Ȟ",
                            "Ĥ": "Ĥ",
                            "Ḣ": "Ḣ",
                            "Í": "Í",
                            "Ì": "Ì",
                            "Ï": "Ï",
                            "Ḯ": "Ḯ",
                            "Ĩ": "Ĩ",
                            "Ī": "Ī",
                            "Ĭ": "Ĭ",
                            "Ǐ": "Ǐ",
                            "Î": "Î",
                            "İ": "İ",
                            "Ĵ": "Ĵ",
                            "Ḱ": "Ḱ",
                            "Ǩ": "Ǩ",
                            "Ĺ": "Ĺ",
                            "Ľ": "Ľ",
                            "Ḿ": "Ḿ",
                            "Ṁ": "Ṁ",
                            "Ń": "Ń",
                            "Ǹ": "Ǹ",
                            "Ñ": "Ñ",
                            "Ň": "Ň",
                            "Ṅ": "Ṅ",
                            "Ó": "Ó",
                            "Ò": "Ò",
                            "Ö": "Ö",
                            "Ȫ": "Ȫ",
                            "Õ": "Õ",
                            "Ṍ": "Ṍ",
                            "Ṏ": "Ṏ",
                            "Ȭ": "Ȭ",
                            "Ō": "Ō",
                            "Ṓ": "Ṓ",
                            "Ṑ": "Ṑ",
                            "Ŏ": "Ŏ",
                            "Ǒ": "Ǒ",
                            "Ô": "Ô",
                            "Ố": "Ố",
                            "Ồ": "Ồ",
                            "Ỗ": "Ỗ",
                            "Ȯ": "Ȯ",
                            "Ȱ": "Ȱ",
                            "Ő": "Ő",
                            "Ṕ": "Ṕ",
                            "Ṗ": "Ṗ",
                            "Ŕ": "Ŕ",
                            "Ř": "Ř",
                            "Ṙ": "Ṙ",
                            "Ś": "Ś",
                            "Ṥ": "Ṥ",
                            "Š": "Š",
                            "Ṧ": "Ṧ",
                            "Ŝ": "Ŝ",
                            "Ṡ": "Ṡ",
                            "Ť": "Ť",
                            "Ṫ": "Ṫ",
                            "Ú": "Ú",
                            "Ù": "Ù",
                            "Ü": "Ü",
                            "Ǘ": "Ǘ",
                            "Ǜ": "Ǜ",
                            "Ǖ": "Ǖ",
                            "Ǚ": "Ǚ",
                            "Ũ": "Ũ",
                            "Ṹ": "Ṹ",
                            "Ū": "Ū",
                            "Ṻ": "Ṻ",
                            "Ŭ": "Ŭ",
                            "Ǔ": "Ǔ",
                            "Û": "Û",
                            "Ů": "Ů",
                            "Ű": "Ű",
                            "Ṽ": "Ṽ",
                            "Ẃ": "Ẃ",
                            "Ẁ": "Ẁ",
                            "Ẅ": "Ẅ",
                            "Ŵ": "Ŵ",
                            "Ẇ": "Ẇ",
                            "Ẍ": "Ẍ",
                            "Ẋ": "Ẋ",
                            "Ý": "Ý",
                            "Ỳ": "Ỳ",
                            "Ÿ": "Ÿ",
                            "Ỹ": "Ỹ",
                            "Ȳ": "Ȳ",
                            "Ŷ": "Ŷ",
                            "Ẏ": "Ẏ",
                            "Ź": "Ź",
                            "Ž": "Ž",
                            "Ẑ": "Ẑ",
                            "Ż": "Ż",
                            "ά": "ά",
                            "ὰ": "ὰ",
                            "ᾱ": "ᾱ",
                            "ᾰ": "ᾰ",
                            "έ": "έ",
                            "ὲ": "ὲ",
                            "ή": "ή",
                            "ὴ": "ὴ",
                            "ί": "ί",
                            "ὶ": "ὶ",
                            "ϊ": "ϊ",
                            "ΐ": "ΐ",
                            "ῒ": "ῒ",
                            "ῑ": "ῑ",
                            "ῐ": "ῐ",
                            "ό": "ό",
                            "ὸ": "ὸ",
                            "ύ": "ύ",
                            "ὺ": "ὺ",
                            "ϋ": "ϋ",
                            "ΰ": "ΰ",
                            "ῢ": "ῢ",
                            "ῡ": "ῡ",
                            "ῠ": "ῠ",
                            "ώ": "ώ",
                            "ὼ": "ὼ",
                            "Ύ": "Ύ",
                            "Ὺ": "Ὺ",
                            "Ϋ": "Ϋ",
                            "Ῡ": "Ῡ",
                            "Ῠ": "Ῠ",
                            "Ώ": "Ώ",
                            "Ὼ": "Ὼ"
                        },
                        ka = function () {
                            function t(t, e) {
                                this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new ba(t, e, this.mode), this.settings = e, this.leftrightDepth = 0
                            }
                            var e = t.prototype;
                            return e.expect = function (t, e) {
                                if (void 0 === e && (e = !0), this.fetch().text !== t) throw new i("Expected '" + t + "', got '" + this.fetch().text + "'", this.fetch());
                                e && this.consume()
                            }, e.consume = function () {
                                this.nextToken = null
                            }, e.fetch = function () {
                                return null == this.nextToken && (this.nextToken = this.gullet.expandNextToken()), this.nextToken
                            }, e.switchMode = function (t) {
                                this.mode = t, this.gullet.switchMode(t)
                            }, e.parse = function () {
                                this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
                                var t = this.parseExpression(!1);
                                return this.expect("EOF"), this.gullet.endGroup(), t
                            }, e.parseExpression = function (e, r) {
                                for (var a = [];;) {
                                    "math" === this.mode && this.consumeSpaces();
                                    var n = this.fetch();
                                    if (-1 !== t.endOfExpression.indexOf(n.text)) break;
                                    if (r && n.text === r) break;
                                    if (e && na[n.text] && na[n.text].infix) break;
                                    var o = this.parseAtom(r);
                                    if (!o) break;
                                    a.push(o)
                                }
                                return "text" === this.mode && this.formLigatures(a), this.handleInfixNodes(a)
                            }, e.handleInfixNodes = function (t) {
                                for (var e, r = -1, a = 0; a < t.length; a++) {
                                    var n = Ht(t[a], "infix");
                                    if (n) {
                                        if (-1 !== r) throw new i("only one infix operator per group", n.token);
                                        r = a, e = n.replaceWith
                                    }
                                }
                                if (-1 !== r && e) {
                                    var o, s, l = t.slice(0, r),
                                        h = t.slice(r + 1);
                                    return o = 1 === l.length && "ordgroup" === l[0].type ? l[0] : {
                                        type: "ordgroup",
                                        mode: this.mode,
                                        body: l
                                    }, s = 1 === h.length && "ordgroup" === h[0].type ? h[0] : {
                                        type: "ordgroup",
                                        mode: this.mode,
                                        body: h
                                    }, ["\\\\abovefrac" === e ? this.callFunction(e, [o, t[r], s], []) : this.callFunction(e, [o, s], [])]
                                }
                                return t
                            }, e.handleSupSubscript = function (e) {
                                var r = this.fetch(),
                                    a = r.text;
                                this.consume();
                                var n = this.parseGroup(e, !1, t.SUPSUB_GREEDINESS, void 0, void 0, !0);
                                if (!n) throw new i("Expected group after '" + a + "'", r);
                                return n
                            }, e.formatUnsupportedCmd = function (t) {
                                for (var e = [], r = 0; r < t.length; r++) e.push({
                                    type: "textord",
                                    mode: "text",
                                    text: t[r]
                                });
                                var a = {
                                    type: "text",
                                    mode: this.mode,
                                    body: e
                                };
                                return {
                                    type: "color",
                                    mode: this.mode,
                                    color: this.settings.errorColor,
                                    body: [a]
                                }
                            }, e.parseAtom = function (t) {
                                var e, r, a = this.parseGroup("atom", !1, null, t);
                                if ("text" === this.mode) return a;
                                for (;;) {
                                    this.consumeSpaces();
                                    var n = this.fetch();
                                    if ("\\limits" === n.text || "\\nolimits" === n.text) {
                                        var o = Ht(a, "op");
                                        if (o) {
                                            var s = "\\limits" === n.text;
                                            o.limits = s, o.alwaysHandleSupSub = !0
                                        } else {
                                            if (!(o = Ht(a, "operatorname")) || !o.alwaysHandleSupSub) throw new i("Limit controls must follow a math operator", n);
                                            var l = "\\limits" === n.text;
                                            o.limits = l
                                        }
                                        this.consume()
                                    } else if ("^" === n.text) {
                                        if (e) throw new i("Double superscript", n);
                                        e = this.handleSupSubscript("superscript")
                                    } else if ("_" === n.text) {
                                        if (r) throw new i("Double subscript", n);
                                        r = this.handleSupSubscript("subscript")
                                    } else {
                                        if ("'" !== n.text) break;
                                        if (e) throw new i("Double superscript", n);
                                        var h = {
                                                type: "textord",
                                                mode: this.mode,
                                                text: "\\prime"
                                            },
                                            m = [h];
                                        for (this.consume();
                                            "'" === this.fetch().text;) m.push(h), this.consume();
                                        "^" === this.fetch().text && m.push(this.handleSupSubscript("superscript")), e = {
                                            type: "ordgroup",
                                            mode: this.mode,
                                            body: m
                                        }
                                    }
                                }
                                return e || r ? {
                                    type: "supsub",
                                    mode: this.mode,
                                    base: a,
                                    sup: e,
                                    sub: r
                                } : a
                            }, e.parseFunction = function (t, e, r) {
                                var a = this.fetch(),
                                    n = a.text,
                                    o = na[n];
                                if (!o) return null;
                                if (this.consume(), null != r && o.greediness <= r) throw new i("Got function '" + n + "' with no arguments" + (e ? " as " + e : ""), a);
                                if ("text" === this.mode && !o.allowedInText) throw new i("Can't use function '" + n + "' in text mode", a);
                                if ("math" === this.mode && !1 === o.allowedInMath) throw new i("Can't use function '" + n + "' in math mode", a);
                                var s = this.parseArguments(n, o),
                                    l = s.args,
                                    h = s.optArgs;
                                return this.callFunction(n, l, h, a, t)
                            }, e.callFunction = function (t, e, r, a, n) {
                                var o = {
                                        funcName: t,
                                        parser: this,
                                        token: a,
                                        breakOnTokenText: n
                                    },
                                    s = na[t];
                                if (s && s.handler) return s.handler(o, e, r);
                                throw new i("No function handler for " + t)
                            }, e.parseArguments = function (t, e) {
                                var r = e.numArgs + e.numOptionalArgs;
                                if (0 === r) return {
                                    args: [],
                                    optArgs: []
                                };
                                for (var a = e.greediness, n = [], o = [], s = 0; s < r; s++) {
                                    var l = e.argTypes && e.argTypes[s],
                                        h = s < e.numOptionalArgs,
                                        m = s > 0 && !h || 0 === s && !h && "math" === this.mode,
                                        c = this.parseGroupOfType("argument to '" + t + "'", l, h, a, m);
                                    if (!c) {
                                        if (h) {
                                            o.push(null);
                                            continue
                                        }
                                        throw new i("Expected group after '" + t + "'", this.fetch())
                                    }(h ? o : n).push(c)
                                }
                                return {
                                    args: n,
                                    optArgs: o
                                }
                            }, e.parseGroupOfType = function (t, e, r, a, n) {
                                switch (e) {
                                    case "color":
                                        return n && this.consumeSpaces(), this.parseColorGroup(r);
                                    case "size":
                                        return n && this.consumeSpaces(), this.parseSizeGroup(r);
                                    case "url":
                                        return this.parseUrlGroup(r, n);
                                    case "math":
                                    case "text":
                                        return this.parseGroup(t, r, a, void 0, e, n);
                                    case "hbox":
                                        var o = this.parseGroup(t, r, a, void 0, "text", n);
                                        return o ? {
                                            type: "styling",
                                            mode: o.mode,
                                            body: [o],
                                            style: "text"
                                        } : o;
                                    case "raw":
                                        if (n && this.consumeSpaces(), r && "{" === this.fetch().text) return null;
                                        var s = this.parseStringGroup("raw", r, !0);
                                        if (s) return {
                                            type: "raw",
                                            mode: "text",
                                            string: s.text
                                        };
                                        throw new i("Expected raw group", this.fetch());
                                    case "original":
                                    case null:
                                    case void 0:
                                        return this.parseGroup(t, r, a, void 0, void 0, n);
                                    default:
                                        throw new i("Unknown group type as " + t, this.fetch())
                                }
                            }, e.consumeSpaces = function () {
                                for (;
                                    " " === this.fetch().text;) this.consume()
                            }, e.parseStringGroup = function (t, e, r) {
                                var a = e ? "[" : "{",
                                    n = e ? "]" : "}",
                                    o = this.fetch();
                                if (o.text !== a) {
                                    if (e) return null;
                                    if (r && "EOF" !== o.text && /[^{}[\]]/.test(o.text)) return this.consume(), o
                                }
                                var s = this.mode;
                                this.mode = "text", this.expect(a);
                                for (var l, h = "", m = this.fetch(), c = 0, u = m;
                                    (l = this.fetch()).text !== n || r && c > 0;) {
                                    switch (l.text) {
                                        case "EOF":
                                            throw new i("Unexpected end of input in " + t, m.range(u, h));
                                        case a:
                                            c++;
                                            break;
                                        case n:
                                            c--
                                    }
                                    h += (u = l).text, this.consume()
                                }
                                return this.expect(n), this.mode = s, m.range(u, h)
                            }, e.parseRegexGroup = function (t, e) {
                                var r = this.mode;
                                this.mode = "text";
                                for (var a, n = this.fetch(), o = n, s = "";
                                    "EOF" !== (a = this.fetch()).text && t.test(s + a.text);) s += (o = a).text, this.consume();
                                if ("" === s) throw new i("Invalid " + e + ": '" + n.text + "'", n);
                                return this.mode = r, n.range(o, s)
                            }, e.parseColorGroup = function (t) {
                                var e = this.parseStringGroup("color", t);
                                if (!e) return null;
                                var r = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(e.text);
                                if (!r) throw new i("Invalid color: '" + e.text + "'", e);
                                var a = r[0];
                                return /^[0-9a-f]{6}$/i.test(a) && (a = "#" + a), {
                                    type: "color-token",
                                    mode: this.mode,
                                    color: a
                                }
                            }, e.parseSizeGroup = function (t) {
                                var e, r = !1;
                                if (!(e = t || "{" === this.fetch().text ? this.parseStringGroup("size", t) : this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size"))) return null;
                                t || 0 !== e.text.length || (e.text = "0pt", r = !0);
                                var a = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e.text);
                                if (!a) throw new i("Invalid size: '" + e.text + "'", e);
                                var n = {
                                    number: +(a[1] + a[2]),
                                    unit: a[3]
                                };
                                if (!_t(n)) throw new i("Invalid unit: '" + n.unit + "'", e);
                                return {
                                    type: "size",
                                    mode: this.mode,
                                    value: n,
                                    isBlank: r
                                }
                            }, e.parseUrlGroup = function (t, e) {
                                this.gullet.lexer.setCatcode("%", 13);
                                var r = this.parseStringGroup("url", t, !0);
                                if (this.gullet.lexer.setCatcode("%", 14), !r) return null;
                                var a = r.text.replace(/\\([#$%&~_^{}])/g, "$1");
                                return {
                                    type: "url",
                                    mode: this.mode,
                                    url: a
                                }
                            }, e.parseGroup = function (e, r, n, o, s, l) {
                                var h = this.mode;
                                s && this.switchMode(s), l && this.consumeSpaces();
                                var m, c = this.fetch(),
                                    u = c.text;
                                if (r ? "[" === u : "{" === u || "\\begingroup" === u) {
                                    this.consume();
                                    var p = t.endOfGroup[u];
                                    this.gullet.beginGroup();
                                    var d = this.parseExpression(!1, p),
                                        f = this.fetch();
                                    this.expect(p), this.gullet.endGroup(), m = {
                                        type: "ordgroup",
                                        mode: this.mode,
                                        loc: a.range(c, f),
                                        body: d,
                                        semisimple: "\\begingroup" === u || void 0
                                    }
                                } else if (r) m = null;
                                else if (null == (m = this.parseFunction(o, e, n) || this.parseSymbol()) && "\\" === u[0] && !va.hasOwnProperty(u)) {
                                    if (this.settings.throwOnError) throw new i("Undefined control sequence: " + u, c);
                                    m = this.formatUnsupportedCmd(u), this.consume()
                                }
                                return s && this.switchMode(h), m
                            }, e.formLigatures = function (t) {
                                for (var e = t.length - 1, r = 0; r < e; ++r) {
                                    var n = t[r],
                                        o = n.text;
                                    "-" === o && "-" === t[r + 1].text && (r + 1 < e && "-" === t[r + 2].text ? (t.splice(r, 3, {
                                        type: "textord",
                                        mode: "text",
                                        loc: a.range(n, t[r + 2]),
                                        text: "---"
                                    }), e -= 2) : (t.splice(r, 2, {
                                        type: "textord",
                                        mode: "text",
                                        loc: a.range(n, t[r + 1]),
                                        text: "--"
                                    }), e -= 1)), "'" !== o && "`" !== o || t[r + 1].text !== o || (t.splice(r, 2, {
                                        type: "textord",
                                        mode: "text",
                                        loc: a.range(n, t[r + 1]),
                                        text: o + o
                                    }), e -= 1)
                                }
                            }, e.parseSymbol = function () {
                                var t = this.fetch(),
                                    e = t.text;
                                if (/^\\verb[^a-zA-Z]/.test(e)) {
                                    this.consume();
                                    var r = e.slice(5),
                                        n = "*" === r.charAt(0);
                                    if (n && (r = r.slice(1)), r.length < 2 || r.charAt(0) !== r.slice(-1)) throw new i("\\verb assertion failed --\n                    please report what input caused this bug");
                                    return {
                                        type: "verb",
                                        mode: "text",
                                        body: r = r.slice(1, -1),
                                        star: n
                                    }
                                }
                                wa.hasOwnProperty(e[0]) && !Y[this.mode][e[0]] && (this.settings.strict && "math" === this.mode && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + e[0] + '" used in math mode', t), e = wa[e[0]] + e.substr(1));
                                var o, s = ia.exec(e);
                                if (s && ("i" === (e = e.substring(0, s.index)) ? e = "ı" : "j" === e && (e = "ȷ")), Y[this.mode][e]) {
                                    this.settings.strict && "math" === this.mode && "ÇÐÞçþ".indexOf(e) >= 0 && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + e[0] + '" used in math mode', t);
                                    var l, h = Y[this.mode][e].group,
                                        m = a.range(t);
                                    if (U.hasOwnProperty(h)) {
                                        var c = h;
                                        l = {
                                            type: "atom",
                                            mode: this.mode,
                                            family: c,
                                            loc: m,
                                            text: e
                                        }
                                    } else l = {
                                        type: h,
                                        mode: this.mode,
                                        loc: m,
                                        text: e
                                    };
                                    o = l
                                } else {
                                    if (!(e.charCodeAt(0) >= 128)) return null;
                                    this.settings.strict && (z(e.charCodeAt(0)) ? "math" === this.mode && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + e[0] + '" used in math mode', t) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + e[0] + '" (' + e.charCodeAt(0) + ")", t)), o = {
                                        type: "textord",
                                        mode: "text",
                                        loc: a.range(t),
                                        text: e
                                    }
                                }
                                if (this.consume(), s)
                                    for (var u = 0; u < s[0].length; u++) {
                                        var p = s[0][u];
                                        if (!ya[p]) throw new i("Unknown accent ' " + p + "'", t);
                                        var d = ya[p][this.mode];
                                        if (!d) throw new i("Accent " + p + " unsupported in " + this.mode + " mode", t);
                                        o = {
                                            type: "accent",
                                            mode: this.mode,
                                            loc: a.range(t),
                                            label: d,
                                            isStretchy: !1,
                                            isShifty: !0,
                                            base: o
                                        }
                                    }
                                return o
                            }, t
                        }();
                    ka.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"], ka.endOfGroup = {
                        "[": "]",
                        "{": "}",
                        "\\begingroup": "\\endgroup"
                    }, ka.SUPSUB_GREEDINESS = 1;
                    var Sa = function (t, e) {
                            if (!("string" == typeof t || t instanceof String)) throw new TypeError("KaTeX can only parse string typed expression");
                            var r = new ka(t, e);
                            delete r.gullet.macros.current["\\df@tag"];
                            var a = r.parse();
                            if (r.gullet.macros.get("\\df@tag")) {
                                if (!e.displayMode) throw new i("\\tag works only in display equations");
                                r.gullet.feed("\\df@tag"), a = [{
                                    type: "tag",
                                    mode: "text",
                                    body: a,
                                    tag: r.parse()
                                }]
                            }
                            return a
                        },
                        za = function (t, e, r) {
                            e.textContent = "";
                            var a = _a(t, r).toNode();
                            e.appendChild(a)
                        };
                    "undefined" != typeof document && "CSS1Compat" !== document.compatMode && ("undefined" != typeof console && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), za = function () {
                        throw new i("KaTeX doesn't work in quirks mode.")
                    });
                    var Ma = function (t, e, r) {
                            if (r.throwOnError || !(t instanceof i)) throw t;
                            var a = Lt.makeSpan(["katex-error"], [new $(e)]);
                            return a.setAttribute("title", t.toString()), a.setAttribute("style", "color:" + r.errorColor), a
                        },
                        _a = function (t, e) {
                            var r = new u(e);
                            try {
                                var a = Sa(t, r);
                                return Te(a, t, r)
                            } catch (e) {
                                return Ma(e, t, r)
                            }
                        },
                        Aa = {
                            version: "0.11.1",
                            render: za,
                            renderToString: function (t, e) {
                                return _a(t, e).toMarkup()
                            },
                            ParseError: i,
                            __parse: function (t, e) {
                                var r = new u(e);
                                return Sa(t, r)
                            },
                            __renderToDomTree: _a,
                            __renderToHTMLTree: function (t, e) {
                                var r = new u(e);
                                try {
                                    return function (t, e, r) {
                                        var a = de(t, _e(r)),
                                            n = Lt.makeSpan(["katex"], [a]);
                                        return Ae(n, r)
                                    }(Sa(t, r), 0, r)
                                } catch (e) {
                                    return Ma(e, t, r)
                                }
                            },
                            __setFontMetrics: function (t, e) {
                                P[t] = e
                            },
                            __defineSymbol: Z,
                            __defineMacro: ca,
                            __domTree: {
                                Span: C,
                                Anchor: N,
                                SymbolNode: $,
                                SvgNode: E,
                                PathNode: R,
                                LineNode: D
                            }
                        };
                    e.default = Aa
                }]).default
            }, t.exports = a()
        }, function (t, e, r) {
            "use strict";
            r.r(e);
            var a = r(0),
                n = r.n(a);
            n.a.__defineMacro("\\ce", (function (t) {
                return o(t.consumeArgs(1)[0], "ce")
            })), n.a.__defineMacro("\\pu", (function (t) {
                return o(t.consumeArgs(1)[0], "pu")
            })), n.a.__defineMacro("\\tripledash", "{\\vphantom{-}\\raisebox{2.56mu}{$\\mkern2mu\\tiny\\text{-}\\mkern1mu\\text{-}\\mkern1mu\\text{-}\\mkern2mu$}}");
            var o = function (t, e) {
                    for (var r = "", a = t[t.length - 1].loc.start, n = t.length - 1; n >= 0; n--) t[n].loc.start > a && (r += " ", a = t[n].loc.start), r += t[n].text, a += t[n].text.length;
                    return s.go(i.go(r, e))
                },
                i = {
                    go: function (t, e) {
                        if (!t) return [];
                        void 0 === e && (e = "ce");
                        var r, a = "0",
                            n = {};
                        n.parenthesisLevel = 0, t = (t = (t = t.replace(/\n/g, " ")).replace(/[\u2212\u2013\u2014\u2010]/g, "-")).replace(/[\u2026]/g, "...");
                        for (var o = 10, s = [];;) {
                            r !== t ? (o = 10, r = t) : o--;
                            var l = i.stateMachines[e],
                                h = l.transitions[a] || l.transitions["*"];
                            t: for (var m = 0; m < h.length; m++) {
                                var c = i.patterns.match_(h[m].pattern, t);
                                if (c) {
                                    for (var u = h[m].task, p = 0; p < u.action_.length; p++) {
                                        var d;
                                        if (l.actions[u.action_[p].type_]) d = l.actions[u.action_[p].type_](n, c.match_, u.action_[p].option);
                                        else {
                                            if (!i.actions[u.action_[p].type_]) throw ["MhchemBugA", "mhchem bug A. Please report. (" + u.action_[p].type_ + ")"];
                                            d = i.actions[u.action_[p].type_](n, c.match_, u.action_[p].option)
                                        }
                                        i.concatArray(s, d)
                                    }
                                    if (a = u.nextState || a, !(t.length > 0)) return s;
                                    if (u.revisit || (t = c.remainder), !u.toContinue) break t
                                }
                            }
                            if (o <= 0) throw ["MhchemBugU", "mhchem bug U. Please report."]
                        }
                    },
                    concatArray: function (t, e) {
                        if (e)
                            if (Array.isArray(e))
                                for (var r = 0; r < e.length; r++) t.push(e[r]);
                            else t.push(e)
                    },
                    patterns: {
                        patterns: {
                            empty: /^$/,
                            else: /^./,
                            else2: /^./,
                            space: /^\s/,
                            "space A": /^\s(?=[A-Z\\$])/,
                            space$: /^\s$/,
                            "a-z": /^[a-z]/,
                            x: /^x/,
                            x$: /^x$/,
                            i$: /^i$/,
                            letters: /^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))))+/,
                            "\\greek": /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))/,
                            "one lowercase latin letter $": /^(?:([a-z])(?:$|[^a-zA-Z]))$/,
                            "$one lowercase latin letter$ $": /^\$(?:([a-z])(?:$|[^a-zA-Z]))\$$/,
                            "one lowercase greek letter $": /^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\s*\$?)(?:\s+|\{\}|(?![a-zA-Z]))$/,
                            digits: /^[0-9]+/,
                            "-9.,9": /^[+\-]?(?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))/,
                            "-9.,9 no missing 0": /^[+\-]?[0-9]+(?:[.,][0-9]+)?/,
                            "(-)(9.,9)(e)(99)": function (t) {
                                var e = t.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))?(\((?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))\))?(?:([eE]|\s*(\*|x|\\times|\u00D7)\s*10\^)([+\-]?[0-9]+|\{[+\-]?[0-9]+\}))?/);
                                return e && e[0] ? {
                                    match_: e.splice(1),
                                    remainder: t.substr(e[0].length)
                                } : null
                            },
                            "(-)(9)^(-9)": function (t) {
                                var e = t.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+)?)\^([+\-]?[0-9]+|\{[+\-]?[0-9]+\})/);
                                return e && e[0] ? {
                                    match_: e.splice(1),
                                    remainder: t.substr(e[0].length)
                                } : null
                            },
                            "state of aggregation $": function (t) {
                                var e = i.patterns.findObserveGroups(t, "", /^\([a-z]{1,3}(?=[\),])/, ")", "");
                                if (e && e.remainder.match(/^($|[\s,;\)\]\}])/)) return e;
                                var r = t.match(/^(?:\((?:\\ca\s?)?\$[amothc]\$\))/);
                                return r ? {
                                    match_: r[0],
                                    remainder: t.substr(r[0].length)
                                } : null
                            },
                            "_{(state of aggregation)}$": /^_\{(\([a-z]{1,3}\))\}/,
                            "{[(": /^(?:\\\{|\[|\()/,
                            ")]}": /^(?:\)|\]|\\\})/,
                            ", ": /^[,;]\s*/,
                            ",": /^[,;]/,
                            ".": /^[.]/,
                            ". ": /^([.\u22C5\u00B7\u2022])\s*/,
                            "...": /^\.\.\.(?=$|[^.])/,
                            "* ": /^([*])\s*/,
                            "^{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "^{", "", "", "}")
                            },
                            "^($...$)": function (t) {
                                return i.patterns.findObserveGroups(t, "^", "$", "$", "")
                            },
                            "^a": /^\^([0-9]+|[^\\_])/,
                            "^\\x{}{}": function (t) {
                                return i.patterns.findObserveGroups(t, "^", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", !0)
                            },
                            "^\\x{}": function (t) {
                                return i.patterns.findObserveGroups(t, "^", /^\\[a-zA-Z]+\{/, "}", "")
                            },
                            "^\\x": /^\^(\\[a-zA-Z]+)\s*/,
                            "^(-1)": /^\^(-?\d+)/,
                            "'": /^'/,
                            "_{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "_{", "", "", "}")
                            },
                            "_($...$)": function (t) {
                                return i.patterns.findObserveGroups(t, "_", "$", "$", "")
                            },
                            _9: /^_([+\-]?[0-9]+|[^\\])/,
                            "_\\x{}{}": function (t) {
                                return i.patterns.findObserveGroups(t, "_", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", !0)
                            },
                            "_\\x{}": function (t) {
                                return i.patterns.findObserveGroups(t, "_", /^\\[a-zA-Z]+\{/, "}", "")
                            },
                            "_\\x": /^_(\\[a-zA-Z]+)\s*/,
                            "^_": /^(?:\^(?=_)|\_(?=\^)|[\^_]$)/,
                            "{}": /^\{\}/,
                            "{...}": function (t) {
                                return i.patterns.findObserveGroups(t, "", "{", "}", "")
                            },
                            "{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "{", "", "", "}")
                            },
                            "$...$": function (t) {
                                return i.patterns.findObserveGroups(t, "", "$", "$", "")
                            },
                            "${(...)}$": function (t) {
                                return i.patterns.findObserveGroups(t, "${", "", "", "}$")
                            },
                            "$(...)$": function (t) {
                                return i.patterns.findObserveGroups(t, "$", "", "", "$")
                            },
                            "=<>": /^[=<>]/,
                            "#": /^[#\u2261]/,
                            "+": /^\+/,
                            "-$": /^-(?=[\s_},;\]/]|$|\([a-z]+\))/,
                            "-9": /^-(?=[0-9])/,
                            "- orbital overlap": /^-(?=(?:[spd]|sp)(?:$|[\s,;\)\]\}]))/,
                            "-": /^-/,
                            "pm-operator": /^(?:\\pm|\$\\pm\$|\+-|\+\/-)/,
                            operator: /^(?:\+|(?:[\-=<>]|<<|>>|\\approx|\$\\approx\$)(?=\s|$|-?[0-9]))/,
                            arrowUpDown: /^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;\)\]\}])/,
                            "\\bond{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "\\bond{", "", "", "}")
                            },
                            "->": /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/,
                            CMT: /^[CMT](?=\[)/,
                            "[(...)]": function (t) {
                                return i.patterns.findObserveGroups(t, "[", "", "", "]")
                            },
                            "1st-level escape": /^(&|\\\\|\\hline)\s*/,
                            "\\,": /^(?:\\[,\ ;:])/,
                            "\\x{}{}": function (t) {
                                return i.patterns.findObserveGroups(t, "", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", !0)
                            },
                            "\\x{}": function (t) {
                                return i.patterns.findObserveGroups(t, "", /^\\[a-zA-Z]+\{/, "}", "")
                            },
                            "\\ca": /^\\ca(?:\s+|(?![a-zA-Z]))/,
                            "\\x": /^(?:\\[a-zA-Z]+\s*|\\[_&{}%])/,
                            orbital: /^(?:[0-9]{1,2}[spdfgh]|[0-9]{0,2}sp)(?=$|[^a-zA-Z])/,
                            others: /^[\/~|]/,
                            "\\frac{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "\\frac{", "", "", "}", "{", "", "", "}")
                            },
                            "\\overset{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "\\overset{", "", "", "}", "{", "", "", "}")
                            },
                            "\\underset{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "\\underset{", "", "", "}", "{", "", "", "}")
                            },
                            "\\underbrace{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "\\underbrace{", "", "", "}_", "{", "", "", "}")
                            },
                            "\\color{(...)}0": function (t) {
                                return i.patterns.findObserveGroups(t, "\\color{", "", "", "}")
                            },
                            "\\color{(...)}{(...)}1": function (t) {
                                return i.patterns.findObserveGroups(t, "\\color{", "", "", "}", "{", "", "", "}")
                            },
                            "\\color(...){(...)}2": function (t) {
                                return i.patterns.findObserveGroups(t, "\\color", "\\", "", /^(?=\{)/, "{", "", "", "}")
                            },
                            "\\ce{(...)}": function (t) {
                                return i.patterns.findObserveGroups(t, "\\ce{", "", "", "}")
                            },
                            oxidation$: /^(?:[+-][IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,
                            "d-oxidation$": /^(?:[+-]?\s?[IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,
                            "roman numeral": /^[IVX]+/,
                            "1/2$": /^[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+(?:\$[a-z]\$|[a-z])?$/,
                            amount: function (t) {
                                var e;
                                if (e = t.match(/^(?:(?:(?:\([+\-]?[0-9]+\/[0-9]+\)|[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+|[+\-]?[0-9]+[.,][0-9]+|[+\-]?\.[0-9]+|[+\-]?[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[+\-]?[a-z](?=\s*[A-Z])|\+(?!\s))/)) return {
                                    match_: e[0],
                                    remainder: t.substr(e[0].length)
                                };
                                var r = i.patterns.findObserveGroups(t, "", "$", "$", "");
                                return r && (e = r.match_.match(/^\$(?:\(?[+\-]?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?|\+|-)\$$/)) ? {
                                    match_: e[0],
                                    remainder: t.substr(e[0].length)
                                } : null
                            },
                            amount2: function (t) {
                                return this.amount(t)
                            },
                            "(KV letters),": /^(?:[A-Z][a-z]{0,2}|i)(?=,)/,
                            formula$: function (t) {
                                if (t.match(/^\([a-z]+\)$/)) return null;
                                var e = t.match(/^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/);
                                return e ? {
                                    match_: e[0],
                                    remainder: t.substr(e[0].length)
                                } : null
                            },
                            uprightEntities: /^(?:pH|pOH|pC|pK|iPr|iBu)(?=$|[^a-zA-Z])/,
                            "/": /^\s*(\/)\s*/,
                            "//": /^\s*(\/\/)\s*/,
                            "*": /^\s*[*.]\s*/
                        },
                        findObserveGroups: function (t, e, r, a, n, o, i, s, l, h) {
                            var m = function (t, e) {
                                    if ("string" == typeof e) return 0 !== t.indexOf(e) ? null : e;
                                    var r = t.match(e);
                                    return r ? r[0] : null
                                },
                                c = m(t, e);
                            if (null === c) return null;
                            if (t = t.substr(c.length), null === (c = m(t, r))) return null;
                            var u = function (t, e, r) {
                                for (var a = 0; e < t.length;) {
                                    var n = t.charAt(e),
                                        o = m(t.substr(e), r);
                                    if (null !== o && 0 === a) return {
                                        endMatchBegin: e,
                                        endMatchEnd: e + o.length
                                    };
                                    if ("{" === n) a++;
                                    else if ("}" === n) {
                                        if (0 === a) throw ["ExtraCloseMissingOpen", "Extra close brace or missing open brace"];
                                        a--
                                    }
                                    e++
                                }
                                return null
                            }(t, c.length, a || n);
                            if (null === u) return null;
                            var p = t.substring(0, a ? u.endMatchEnd : u.endMatchBegin);
                            if (o || i) {
                                var d = this.findObserveGroups(t.substr(u.endMatchEnd), o, i, s, l);
                                if (null === d) return null;
                                var f = [p, d.match_];
                                return {
                                    match_: h ? f.join("") : f,
                                    remainder: d.remainder
                                }
                            }
                            return {
                                match_: p,
                                remainder: t.substr(u.endMatchEnd)
                            }
                        },
                        match_: function (t, e) {
                            var r = i.patterns.patterns[t];
                            if (void 0 === r) throw ["MhchemBugP", "mhchem bug P. Please report. (" + t + ")"];
                            if ("function" == typeof r) return i.patterns.patterns[t](e);
                            var a = e.match(r);
                            return a ? {
                                match_: a[2] ? [a[1], a[2]] : a[1] ? a[1] : a[0],
                                remainder: e.substr(a[0].length)
                            } : null
                        }
                    },
                    actions: {
                        "a=": function (t, e) {
                            t.a = (t.a || "") + e
                        },
                        "b=": function (t, e) {
                            t.b = (t.b || "") + e
                        },
                        "p=": function (t, e) {
                            t.p = (t.p || "") + e
                        },
                        "o=": function (t, e) {
                            t.o = (t.o || "") + e
                        },
                        "q=": function (t, e) {
                            t.q = (t.q || "") + e
                        },
                        "d=": function (t, e) {
                            t.d = (t.d || "") + e
                        },
                        "rm=": function (t, e) {
                            t.rm = (t.rm || "") + e
                        },
                        "text=": function (t, e) {
                            t.text_ = (t.text_ || "") + e
                        },
                        insert: function (t, e, r) {
                            return {
                                type_: r
                            }
                        },
                        "insert+p1": function (t, e, r) {
                            return {
                                type_: r,
                                p1: e
                            }
                        },
                        "insert+p1+p2": function (t, e, r) {
                            return {
                                type_: r,
                                p1: e[0],
                                p2: e[1]
                            }
                        },
                        copy: function (t, e) {
                            return e
                        },
                        rm: function (t, e) {
                            return {
                                type_: "rm",
                                p1: e || ""
                            }
                        },
                        text: function (t, e) {
                            return i.go(e, "text")
                        },
                        "{text}": function (t, e) {
                            var r = ["{"];
                            return i.concatArray(r, i.go(e, "text")), r.push("}"), r
                        },
                        "tex-math": function (t, e) {
                            return i.go(e, "tex-math")
                        },
                        "tex-math tight": function (t, e) {
                            return i.go(e, "tex-math tight")
                        },
                        bond: function (t, e, r) {
                            return {
                                type_: "bond",
                                kind_: r || e
                            }
                        },
                        "color0-output": function (t, e) {
                            return {
                                type_: "color0",
                                color: e[0]
                            }
                        },
                        ce: function (t, e) {
                            return i.go(e)
                        },
                        "1/2": function (t, e) {
                            var r = [];
                            e.match(/^[+\-]/) && (r.push(e.substr(0, 1)), e = e.substr(1));
                            var a = e.match(/^([0-9]+|\$[a-z]\$|[a-z])\/([0-9]+)(\$[a-z]\$|[a-z])?$/);
                            return a[1] = a[1].replace(/\$/g, ""), r.push({
                                type_: "frac",
                                p1: a[1],
                                p2: a[2]
                            }), a[3] && (a[3] = a[3].replace(/\$/g, ""), r.push({
                                type_: "tex-math",
                                p1: a[3]
                            })), r
                        },
                        "9,9": function (t, e) {
                            return i.go(e, "9,9")
                        }
                    },
                    createTransitions: function (t) {
                        var e, r, a, n, o = {};
                        for (e in t)
                            for (r in t[e])
                                for (a = r.split("|"), t[e][r].stateArray = a, n = 0; n < a.length; n++) o[a[n]] = [];
                        for (e in t)
                            for (r in t[e])
                                for (a = t[e][r].stateArray || [], n = 0; n < a.length; n++) {
                                    var i = t[e][r];
                                    if (i.action_) {
                                        i.action_ = [].concat(i.action_);
                                        for (var s = 0; s < i.action_.length; s++) "string" == typeof i.action_[s] && (i.action_[s] = {
                                            type_: i.action_[s]
                                        })
                                    } else i.action_ = [];
                                    for (var l = e.split("|"), h = 0; h < l.length; h++)
                                        if ("*" === a[n])
                                            for (var m in o) o[m].push({
                                                pattern: l[h],
                                                task: i
                                            });
                                        else o[a[n]].push({
                                            pattern: l[h],
                                            task: i
                                        })
                                }
                        return o
                    },
                    stateMachines: {}
                };
            i.stateMachines = {
                ce: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {
                                action_: "output"
                            }
                        },
                        else: {
                            "0|1|2": {
                                action_: "beginsWithBond=false",
                                revisit: !0,
                                toContinue: !0
                            }
                        },
                        oxidation$: {
                            0: {
                                action_: "oxidation-output"
                            }
                        },
                        CMT: {
                            r: {
                                action_: "rdt=",
                                nextState: "rt"
                            },
                            rd: {
                                action_: "rqt=",
                                nextState: "rdt"
                            }
                        },
                        arrowUpDown: {
                            "0|1|2|as": {
                                action_: ["sb=false", "output", "operator"],
                                nextState: "1"
                            }
                        },
                        uprightEntities: {
                            "0|1|2": {
                                action_: ["o=", "output"],
                                nextState: "1"
                            }
                        },
                        orbital: {
                            "0|1|2|3": {
                                action_: "o=",
                                nextState: "o"
                            }
                        },
                        "->": {
                            "0|1|2|3": {
                                action_: "r=",
                                nextState: "r"
                            },
                            "a|as": {
                                action_: ["output", "r="],
                                nextState: "r"
                            },
                            "*": {
                                action_: ["output", "r="],
                                nextState: "r"
                            }
                        },
                        "+": {
                            o: {
                                action_: "d= kv",
                                nextState: "d"
                            },
                            "d|D": {
                                action_: "d=",
                                nextState: "d"
                            },
                            q: {
                                action_: "d=",
                                nextState: "qd"
                            },
                            "qd|qD": {
                                action_: "d=",
                                nextState: "qd"
                            },
                            dq: {
                                action_: ["output", "d="],
                                nextState: "d"
                            },
                            3: {
                                action_: ["sb=false", "output", "operator"],
                                nextState: "0"
                            }
                        },
                        amount: {
                            "0|2": {
                                action_: "a=",
                                nextState: "a"
                            }
                        },
                        "pm-operator": {
                            "0|1|2|a|as": {
                                action_: ["sb=false", "output", {
                                    type_: "operator",
                                    option: "\\pm"
                                }],
                                nextState: "0"
                            }
                        },
                        operator: {
                            "0|1|2|a|as": {
                                action_: ["sb=false", "output", "operator"],
                                nextState: "0"
                            }
                        },
                        "-$": {
                            "o|q": {
                                action_: ["charge or bond", "output"],
                                nextState: "qd"
                            },
                            d: {
                                action_: "d=",
                                nextState: "d"
                            },
                            D: {
                                action_: ["output", {
                                    type_: "bond",
                                    option: "-"
                                }],
                                nextState: "3"
                            },
                            q: {
                                action_: "d=",
                                nextState: "qd"
                            },
                            qd: {
                                action_: "d=",
                                nextState: "qd"
                            },
                            "qD|dq": {
                                action_: ["output", {
                                    type_: "bond",
                                    option: "-"
                                }],
                                nextState: "3"
                            }
                        },
                        "-9": {
                            "3|o": {
                                action_: ["output", {
                                    type_: "insert",
                                    option: "hyphen"
                                }],
                                nextState: "3"
                            }
                        },
                        "- orbital overlap": {
                            o: {
                                action_: ["output", {
                                    type_: "insert",
                                    option: "hyphen"
                                }],
                                nextState: "2"
                            },
                            d: {
                                action_: ["output", {
                                    type_: "insert",
                                    option: "hyphen"
                                }],
                                nextState: "2"
                            }
                        },
                        "-": {
                            "0|1|2": {
                                action_: [{
                                    type_: "output",
                                    option: 1
                                }, "beginsWithBond=true", {
                                    type_: "bond",
                                    option: "-"
                                }],
                                nextState: "3"
                            },
                            3: {
                                action_: {
                                    type_: "bond",
                                    option: "-"
                                }
                            },
                            a: {
                                action_: ["output", {
                                    type_: "insert",
                                    option: "hyphen"
                                }],
                                nextState: "2"
                            },
                            as: {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, {
                                    type_: "bond",
                                    option: "-"
                                }],
                                nextState: "3"
                            },
                            b: {
                                action_: "b="
                            },
                            o: {
                                action_: {
                                    type_: "- after o/d",
                                    option: !1
                                },
                                nextState: "2"
                            },
                            q: {
                                action_: {
                                    type_: "- after o/d",
                                    option: !1
                                },
                                nextState: "2"
                            },
                            "d|qd|dq": {
                                action_: {
                                    type_: "- after o/d",
                                    option: !0
                                },
                                nextState: "2"
                            },
                            "D|qD|p": {
                                action_: ["output", {
                                    type_: "bond",
                                    option: "-"
                                }],
                                nextState: "3"
                            }
                        },
                        amount2: {
                            "1|3": {
                                action_: "a=",
                                nextState: "a"
                            }
                        },
                        letters: {
                            "0|1|2|3|a|as|b|p|bp|o": {
                                action_: "o=",
                                nextState: "o"
                            },
                            "q|dq": {
                                action_: ["output", "o="],
                                nextState: "o"
                            },
                            "d|D|qd|qD": {
                                action_: "o after d",
                                nextState: "o"
                            }
                        },
                        digits: {
                            o: {
                                action_: "q=",
                                nextState: "q"
                            },
                            "d|D": {
                                action_: "q=",
                                nextState: "dq"
                            },
                            q: {
                                action_: ["output", "o="],
                                nextState: "o"
                            },
                            a: {
                                action_: "o=",
                                nextState: "o"
                            }
                        },
                        "space A": {
                            "b|p|bp": {}
                        },
                        space: {
                            a: {
                                nextState: "as"
                            },
                            0: {
                                action_: "sb=false"
                            },
                            "1|2": {
                                action_: "sb=true"
                            },
                            "r|rt|rd|rdt|rdq": {
                                action_: "output",
                                nextState: "0"
                            },
                            "*": {
                                action_: ["output", "sb=true"],
                                nextState: "1"
                            }
                        },
                        "1st-level escape": {
                            "1|2": {
                                action_: ["output", {
                                    type_: "insert+p1",
                                    option: "1st-level escape"
                                }]
                            },
                            "*": {
                                action_: ["output", {
                                    type_: "insert+p1",
                                    option: "1st-level escape"
                                }],
                                nextState: "0"
                            }
                        },
                        "[(...)]": {
                            "r|rt": {
                                action_: "rd=",
                                nextState: "rd"
                            },
                            "rd|rdt": {
                                action_: "rq=",
                                nextState: "rdq"
                            }
                        },
                        "...": {
                            "o|d|D|dq|qd|qD": {
                                action_: ["output", {
                                    type_: "bond",
                                    option: "..."
                                }],
                                nextState: "3"
                            },
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 1
                                }, {
                                    type_: "insert",
                                    option: "ellipsis"
                                }],
                                nextState: "1"
                            }
                        },
                        ". |* ": {
                            "*": {
                                action_: ["output", {
                                    type_: "insert",
                                    option: "addition compound"
                                }],
                                nextState: "1"
                            }
                        },
                        "state of aggregation $": {
                            "*": {
                                action_: ["output", "state of aggregation"],
                                nextState: "1"
                            }
                        },
                        "{[(": {
                            "a|as|o": {
                                action_: ["o=", "output", "parenthesisLevel++"],
                                nextState: "2"
                            },
                            "0|1|2|3": {
                                action_: ["o=", "output", "parenthesisLevel++"],
                                nextState: "2"
                            },
                            "*": {
                                action_: ["output", "o=", "output", "parenthesisLevel++"],
                                nextState: "2"
                            }
                        },
                        ")]}": {
                            "0|1|2|3|b|p|bp|o": {
                                action_: ["o=", "parenthesisLevel--"],
                                nextState: "o"
                            },
                            "a|as|d|D|q|qd|qD|dq": {
                                action_: ["output", "o=", "parenthesisLevel--"],
                                nextState: "o"
                            }
                        },
                        ", ": {
                            "*": {
                                action_: ["output", "comma"],
                                nextState: "0"
                            }
                        },
                        "^_": {
                            "*": {}
                        },
                        "^{(...)}|^($...$)": {
                            "0|1|2|as": {
                                action_: "b=",
                                nextState: "b"
                            },
                            p: {
                                action_: "b=",
                                nextState: "bp"
                            },
                            "3|o": {
                                action_: "d= kv",
                                nextState: "D"
                            },
                            q: {
                                action_: "d=",
                                nextState: "qD"
                            },
                            "d|D|qd|qD|dq": {
                                action_: ["output", "d="],
                                nextState: "D"
                            }
                        },
                        "^a|^\\x{}{}|^\\x{}|^\\x|'": {
                            "0|1|2|as": {
                                action_: "b=",
                                nextState: "b"
                            },
                            p: {
                                action_: "b=",
                                nextState: "bp"
                            },
                            "3|o": {
                                action_: "d= kv",
                                nextState: "d"
                            },
                            q: {
                                action_: "d=",
                                nextState: "qd"
                            },
                            "d|qd|D|qD": {
                                action_: "d="
                            },
                            dq: {
                                action_: ["output", "d="],
                                nextState: "d"
                            }
                        },
                        "_{(state of aggregation)}$": {
                            "d|D|q|qd|qD|dq": {
                                action_: ["output", "q="],
                                nextState: "q"
                            }
                        },
                        "_{(...)}|_($...$)|_9|_\\x{}{}|_\\x{}|_\\x": {
                            "0|1|2|as": {
                                action_: "p=",
                                nextState: "p"
                            },
                            b: {
                                action_: "p=",
                                nextState: "bp"
                            },
                            "3|o": {
                                action_: "q=",
                                nextState: "q"
                            },
                            "d|D": {
                                action_: "q=",
                                nextState: "dq"
                            },
                            "q|qd|qD|dq": {
                                action_: ["output", "q="],
                                nextState: "q"
                            }
                        },
                        "=<>": {
                            "0|1|2|3|a|as|o|q|d|D|qd|qD|dq": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "bond"],
                                nextState: "3"
                            }
                        },
                        "#": {
                            "0|1|2|3|a|as|o": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, {
                                    type_: "bond",
                                    option: "#"
                                }],
                                nextState: "3"
                            }
                        },
                        "{}": {
                            "*": {
                                action_: {
                                    type_: "output",
                                    option: 1
                                },
                                nextState: "1"
                            }
                        },
                        "{...}": {
                            "0|1|2|3|a|as|b|p|bp": {
                                action_: "o=",
                                nextState: "o"
                            },
                            "o|d|D|q|qd|qD|dq": {
                                action_: ["output", "o="],
                                nextState: "o"
                            }
                        },
                        "$...$": {
                            a: {
                                action_: "a="
                            },
                            "0|1|2|3|as|b|p|bp|o": {
                                action_: "o=",
                                nextState: "o"
                            },
                            "as|o": {
                                action_: "o="
                            },
                            "q|d|D|qd|qD|dq": {
                                action_: ["output", "o="],
                                nextState: "o"
                            }
                        },
                        "\\bond{(...)}": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "bond"],
                                nextState: "3"
                            }
                        },
                        "\\frac{(...)}": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 1
                                }, "frac-output"],
                                nextState: "3"
                            }
                        },
                        "\\overset{(...)}": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "overset-output"],
                                nextState: "3"
                            }
                        },
                        "\\underset{(...)}": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "underset-output"],
                                nextState: "3"
                            }
                        },
                        "\\underbrace{(...)}": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "underbrace-output"],
                                nextState: "3"
                            }
                        },
                        "\\color{(...)}{(...)}1|\\color(...){(...)}2": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "color-output"],
                                nextState: "3"
                            }
                        },
                        "\\color{(...)}0": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "color0-output"]
                            }
                        },
                        "\\ce{(...)}": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 2
                                }, "ce"],
                                nextState: "3"
                            }
                        },
                        "\\,": {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 1
                                }, "copy"],
                                nextState: "1"
                            }
                        },
                        "\\x{}{}|\\x{}|\\x": {
                            "0|1|2|3|a|as|b|p|bp|o|c0": {
                                action_: ["o=", "output"],
                                nextState: "3"
                            },
                            "*": {
                                action_: ["output", "o=", "output"],
                                nextState: "3"
                            }
                        },
                        others: {
                            "*": {
                                action_: [{
                                    type_: "output",
                                    option: 1
                                }, "copy"],
                                nextState: "3"
                            }
                        },
                        else2: {
                            a: {
                                action_: "a to o",
                                nextState: "o",
                                revisit: !0
                            },
                            as: {
                                action_: ["output", "sb=true"],
                                nextState: "1",
                                revisit: !0
                            },
                            "r|rt|rd|rdt|rdq": {
                                action_: ["output"],
                                nextState: "0",
                                revisit: !0
                            },
                            "*": {
                                action_: ["output", "copy"],
                                nextState: "3"
                            }
                        }
                    }),
                    actions: {
                        "o after d": function (t, e) {
                            var r;
                            if ((t.d || "").match(/^[0-9]+$/)) {
                                var a = t.d;
                                t.d = void 0, r = this.output(t), t.b = a
                            } else r = this.output(t);
                            return i.actions["o="](t, e), r
                        },
                        "d= kv": function (t, e) {
                            t.d = e, t.dType = "kv"
                        },
                        "charge or bond": function (t, e) {
                            if (t.beginsWithBond) {
                                var r = [];
                                return i.concatArray(r, this.output(t)), i.concatArray(r, i.actions.bond(t, e, "-")), r
                            }
                            t.d = e
                        },
                        "- after o/d": function (t, e, r) {
                            var a = i.patterns.match_("orbital", t.o || ""),
                                n = i.patterns.match_("one lowercase greek letter $", t.o || ""),
                                o = i.patterns.match_("one lowercase latin letter $", t.o || ""),
                                s = i.patterns.match_("$one lowercase latin letter$ $", t.o || ""),
                                l = "-" === e && (a && "" === a.remainder || n || o || s);
                            !l || t.a || t.b || t.p || t.d || t.q || a || !o || (t.o = "$" + t.o + "$");
                            var h = [];
                            return l ? (i.concatArray(h, this.output(t)), h.push({
                                type_: "hyphen"
                            })) : (a = i.patterns.match_("digits", t.d || ""), r && a && "" === a.remainder ? (i.concatArray(h, i.actions["d="](t, e)), i.concatArray(h, this.output(t))) : (i.concatArray(h, this.output(t)), i.concatArray(h, i.actions.bond(t, e, "-")))), h
                        },
                        "a to o": function (t) {
                            t.o = t.a, t.a = void 0
                        },
                        "sb=true": function (t) {
                            t.sb = !0
                        },
                        "sb=false": function (t) {
                            t.sb = !1
                        },
                        "beginsWithBond=true": function (t) {
                            t.beginsWithBond = !0
                        },
                        "beginsWithBond=false": function (t) {
                            t.beginsWithBond = !1
                        },
                        "parenthesisLevel++": function (t) {
                            t.parenthesisLevel++
                        },
                        "parenthesisLevel--": function (t) {
                            t.parenthesisLevel--
                        },
                        "state of aggregation": function (t, e) {
                            return {
                                type_: "state of aggregation",
                                p1: i.go(e, "o")
                            }
                        },
                        comma: function (t, e) {
                            var r = e.replace(/\s*$/, "");
                            return r !== e && 0 === t.parenthesisLevel ? {
                                type_: "comma enumeration L",
                                p1: r
                            } : {
                                type_: "comma enumeration M",
                                p1: r
                            }
                        },
                        output: function (t, e, r) {
                            var a, n, o;
                            t.r ? (n = "M" === t.rdt ? i.go(t.rd, "tex-math") : "T" === t.rdt ? [{
                                type_: "text",
                                p1: t.rd || ""
                            }] : i.go(t.rd), o = "M" === t.rqt ? i.go(t.rq, "tex-math") : "T" === t.rqt ? [{
                                type_: "text",
                                p1: t.rq || ""
                            }] : i.go(t.rq), a = {
                                type_: "arrow",
                                r: t.r,
                                rd: n,
                                rq: o
                            }) : (a = [], (t.a || t.b || t.p || t.o || t.q || t.d || r) && (t.sb && a.push({
                                type_: "entitySkip"
                            }), t.o || t.q || t.d || t.b || t.p || 2 === r ? t.o || t.q || t.d || !t.b && !t.p ? t.o && "kv" === t.dType && i.patterns.match_("d-oxidation$", t.d || "") ? t.dType = "oxidation" : t.o && "kv" === t.dType && !t.q && (t.dType = void 0) : (t.o = t.a, t.d = t.b, t.q = t.p, t.a = t.b = t.p = void 0) : (t.o = t.a, t.a = void 0), a.push({
                                type_: "chemfive",
                                a: i.go(t.a, "a"),
                                b: i.go(t.b, "bd"),
                                p: i.go(t.p, "pq"),
                                o: i.go(t.o, "o"),
                                q: i.go(t.q, "pq"),
                                d: i.go(t.d, "oxidation" === t.dType ? "oxidation" : "bd"),
                                dType: t.dType
                            })));
                            for (var s in t) "parenthesisLevel" !== s && "beginsWithBond" !== s && delete t[s];
                            return a
                        },
                        "oxidation-output": function (t, e) {
                            var r = ["{"];
                            return i.concatArray(r, i.go(e, "oxidation")), r.push("}"), r
                        },
                        "frac-output": function (t, e) {
                            return {
                                type_: "frac-ce",
                                p1: i.go(e[0]),
                                p2: i.go(e[1])
                            }
                        },
                        "overset-output": function (t, e) {
                            return {
                                type_: "overset",
                                p1: i.go(e[0]),
                                p2: i.go(e[1])
                            }
                        },
                        "underset-output": function (t, e) {
                            return {
                                type_: "underset",
                                p1: i.go(e[0]),
                                p2: i.go(e[1])
                            }
                        },
                        "underbrace-output": function (t, e) {
                            return {
                                type_: "underbrace",
                                p1: i.go(e[0]),
                                p2: i.go(e[1])
                            }
                        },
                        "color-output": function (t, e) {
                            return {
                                type_: "color",
                                color1: e[0],
                                color2: i.go(e[1])
                            }
                        },
                        "r=": function (t, e) {
                            t.r = e
                        },
                        "rdt=": function (t, e) {
                            t.rdt = e
                        },
                        "rd=": function (t, e) {
                            t.rd = e
                        },
                        "rqt=": function (t, e) {
                            t.rqt = e
                        },
                        "rq=": function (t, e) {
                            t.rq = e
                        },
                        operator: function (t, e, r) {
                            return {
                                type_: "operator",
                                kind_: r || e
                            }
                        }
                    }
                },
                a: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {}
                        },
                        "1/2$": {
                            0: {
                                action_: "1/2"
                            }
                        },
                        else: {
                            0: {
                                nextState: "1",
                                revisit: !0
                            }
                        },
                        "$(...)$": {
                            "*": {
                                action_: "tex-math tight",
                                nextState: "1"
                            }
                        },
                        ",": {
                            "*": {
                                action_: {
                                    type_: "insert",
                                    option: "commaDecimal"
                                }
                            }
                        },
                        else2: {
                            "*": {
                                action_: "copy"
                            }
                        }
                    }),
                    actions: {}
                },
                o: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {}
                        },
                        "1/2$": {
                            0: {
                                action_: "1/2"
                            }
                        },
                        else: {
                            0: {
                                nextState: "1",
                                revisit: !0
                            }
                        },
                        letters: {
                            "*": {
                                action_: "rm"
                            }
                        },
                        "\\ca": {
                            "*": {
                                action_: {
                                    type_: "insert",
                                    option: "circa"
                                }
                            }
                        },
                        "\\x{}{}|\\x{}|\\x": {
                            "*": {
                                action_: "copy"
                            }
                        },
                        "${(...)}$|$(...)$": {
                            "*": {
                                action_: "tex-math"
                            }
                        },
                        "{(...)}": {
                            "*": {
                                action_: "{text}"
                            }
                        },
                        else2: {
                            "*": {
                                action_: "copy"
                            }
                        }
                    }),
                    actions: {}
                },
                text: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {
                                action_: "output"
                            }
                        },
                        "{...}": {
                            "*": {
                                action_: "text="
                            }
                        },
                        "${(...)}$|$(...)$": {
                            "*": {
                                action_: "tex-math"
                            }
                        },
                        "\\greek": {
                            "*": {
                                action_: ["output", "rm"]
                            }
                        },
                        "\\,|\\x{}{}|\\x{}|\\x": {
                            "*": {
                                action_: ["output", "copy"]
                            }
                        },
                        else: {
                            "*": {
                                action_: "text="
                            }
                        }
                    }),
                    actions: {
                        output: function (t) {
                            if (t.text_) {
                                var e = {
                                    type_: "text",
                                    p1: t.text_
                                };
                                for (var r in t) delete t[r];
                                return e
                            }
                        }
                    }
                },
                pq: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {}
                        },
                        "state of aggregation $": {
                            "*": {
                                action_: "state of aggregation"
                            }
                        },
                        i$: {
                            0: {
                                nextState: "!f",
                                revisit: !0
                            }
                        },
                        "(KV letters),": {
                            0: {
                                action_: "rm",
                                nextState: "0"
                            }
                        },
                        formula$: {
                            0: {
                                nextState: "f",
                                revisit: !0
                            }
                        },
                        "1/2$": {
                            0: {
                                action_: "1/2"
                            }
                        },
                        else: {
                            0: {
                                nextState: "!f",
                                revisit: !0
                            }
                        },
                        "${(...)}$|$(...)$": {
                            "*": {
                                action_: "tex-math"
                            }
                        },
                        "{(...)}": {
                            "*": {
                                action_: "text"
                            }
                        },
                        "a-z": {
                            f: {
                                action_: "tex-math"
                            }
                        },
                        letters: {
                            "*": {
                                action_: "rm"
                            }
                        },
                        "-9.,9": {
                            "*": {
                                action_: "9,9"
                            }
                        },
                        ",": {
                            "*": {
                                action_: {
                                    type_: "insert+p1",
                                    option: "comma enumeration S"
                                }
                            }
                        },
                        "\\color{(...)}{(...)}1|\\color(...){(...)}2": {
                            "*": {
                                action_: "color-output"
                            }
                        },
                        "\\color{(...)}0": {
                            "*": {
                                action_: "color0-output"
                            }
                        },
                        "\\ce{(...)}": {
                            "*": {
                                action_: "ce"
                            }
                        },
                        "\\,|\\x{}{}|\\x{}|\\x": {
                            "*": {
                                action_: "copy"
                            }
                        },
                        else2: {
                            "*": {
                                action_: "copy"
                            }
                        }
                    }),
                    actions: {
                        "state of aggregation": function (t, e) {
                            return {
                                type_: "state of aggregation subscript",
                                p1: i.go(e, "o")
                            }
                        },
                        "color-output": function (t, e) {
                            return {
                                type_: "color",
                                color1: e[0],
                                color2: i.go(e[1], "pq")
                            }
                        }
                    }
                },
                bd: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {}
                        },
                        x$: {
                            0: {
                                nextState: "!f",
                                revisit: !0
                            }
                        },
                        formula$: {
                            0: {
                                nextState: "f",
                                revisit: !0
                            }
                        },
                        else: {
                            0: {
                                nextState: "!f",
                                revisit: !0
                            }
                        },
                        "-9.,9 no missing 0": {
                            "*": {
                                action_: "9,9"
                            }
                        },
                        ".": {
                            "*": {
                                action_: {
                                    type_: "insert",
                                    option: "electron dot"
                                }
                            }
                        },
                        "a-z": {
                            f: {
                                action_: "tex-math"
                            }
                        },
                        x: {
                            "*": {
                                action_: {
                                    type_: "insert",
                                    option: "KV x"
                                }
                            }
                        },
                        letters: {
                            "*": {
                                action_: "rm"
                            }
                        },
                        "'": {
                            "*": {
                                action_: {
                                    type_: "insert",
                                    option: "prime"
                                }
                            }
                        },
                        "${(...)}$|$(...)$": {
                            "*": {
                                action_: "tex-math"
                            }
                        },
                        "{(...)}": {
                            "*": {
                                action_: "text"
                            }
                        },
                        "\\color{(...)}{(...)}1|\\color(...){(...)}2": {
                            "*": {
                                action_: "color-output"
                            }
                        },
                        "\\color{(...)}0": {
                            "*": {
                                action_: "color0-output"
                            }
                        },
                        "\\ce{(...)}": {
                            "*": {
                                action_: "ce"
                            }
                        },
                        "\\,|\\x{}{}|\\x{}|\\x": {
                            "*": {
                                action_: "copy"
                            }
                        },
                        else2: {
                            "*": {
                                action_: "copy"
                            }
                        }
                    }),
                    actions: {
                        "color-output": function (t, e) {
                            return {
                                type_: "color",
                                color1: e[0],
                                color2: i.go(e[1], "bd")
                            }
                        }
                    }
                },
                oxidation: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {}
                        },
                        "roman numeral": {
                            "*": {
                                action_: "roman-numeral"
                            }
                        },
                        "${(...)}$|$(...)$": {
                            "*": {
                                action_: "tex-math"
                            }
                        },
                        else: {
                            "*": {
                                action_: "copy"
                            }
                        }
                    }),
                    actions: {
                        "roman-numeral": function (t, e) {
                            return {
                                type_: "roman numeral",
                                p1: e || ""
                            }
                        }
                    }
                },
                "tex-math": {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {
                                action_: "output"
                            }
                        },
                        "\\ce{(...)}": {
                            "*": {
                                action_: ["output", "ce"]
                            }
                        },
                        "{...}|\\,|\\x{}{}|\\x{}|\\x": {
                            "*": {
                                action_: "o="
                            }
                        },
                        else: {
                            "*": {
                                action_: "o="
                            }
                        }
                    }),
                    actions: {
                        output: function (t) {
                            if (t.o) {
                                var e = {
                                    type_: "tex-math",
                                    p1: t.o
                                };
                                for (var r in t) delete t[r];
                                return e
                            }
                        }
                    }
                },
                "tex-math tight": {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {
                                action_: "output"
                            }
                        },
                        "\\ce{(...)}": {
                            "*": {
                                action_: ["output", "ce"]
                            }
                        },
                        "{...}|\\,|\\x{}{}|\\x{}|\\x": {
                            "*": {
                                action_: "o="
                            }
                        },
                        "-|+": {
                            "*": {
                                action_: "tight operator"
                            }
                        },
                        else: {
                            "*": {
                                action_: "o="
                            }
                        }
                    }),
                    actions: {
                        "tight operator": function (t, e) {
                            t.o = (t.o || "") + "{" + e + "}"
                        },
                        output: function (t) {
                            if (t.o) {
                                var e = {
                                    type_: "tex-math",
                                    p1: t.o
                                };
                                for (var r in t) delete t[r];
                                return e
                            }
                        }
                    }
                },
                "9,9": {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {}
                        },
                        ",": {
                            "*": {
                                action_: "comma"
                            }
                        },
                        else: {
                            "*": {
                                action_: "copy"
                            }
                        }
                    }),
                    actions: {
                        comma: function () {
                            return {
                                type_: "commaDecimal"
                            }
                        }
                    }
                },
                pu: {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {
                                action_: "output"
                            }
                        },
                        space$: {
                            "*": {
                                action_: ["output", "space"]
                            }
                        },
                        "{[(|)]}": {
                            "0|a": {
                                action_: "copy"
                            }
                        },
                        "(-)(9)^(-9)": {
                            0: {
                                action_: "number^",
                                nextState: "a"
                            }
                        },
                        "(-)(9.,9)(e)(99)": {
                            0: {
                                action_: "enumber",
                                nextState: "a"
                            }
                        },
                        space: {
                            "0|a": {}
                        },
                        "pm-operator": {
                            "0|a": {
                                action_: {
                                    type_: "operator",
                                    option: "\\pm"
                                },
                                nextState: "0"
                            }
                        },
                        operator: {
                            "0|a": {
                                action_: "copy",
                                nextState: "0"
                            }
                        },
                        "//": {
                            d: {
                                action_: "o=",
                                nextState: "/"
                            }
                        },
                        "/": {
                            d: {
                                action_: "o=",
                                nextState: "/"
                            }
                        },
                        "{...}|else": {
                            "0|d": {
                                action_: "d=",
                                nextState: "d"
                            },
                            a: {
                                action_: ["space", "d="],
                                nextState: "d"
                            },
                            "/|q": {
                                action_: "q=",
                                nextState: "q"
                            }
                        }
                    }),
                    actions: {
                        enumber: function (t, e) {
                            var r = [];
                            return "+-" === e[0] || "+/-" === e[0] ? r.push("\\pm ") : e[0] && r.push(e[0]), e[1] && (i.concatArray(r, i.go(e[1], "pu-9,9")), e[2] && (e[2].match(/[,.]/) ? i.concatArray(r, i.go(e[2], "pu-9,9")) : r.push(e[2])), e[3] = e[4] || e[3], e[3] && (e[3] = e[3].trim(), "e" === e[3] || "*" === e[3].substr(0, 1) ? r.push({
                                type_: "cdot"
                            }) : r.push({
                                type_: "times"
                            }))), e[3] && r.push("10^{" + e[5] + "}"), r
                        },
                        "number^": function (t, e) {
                            var r = [];
                            return "+-" === e[0] || "+/-" === e[0] ? r.push("\\pm ") : e[0] && r.push(e[0]), i.concatArray(r, i.go(e[1], "pu-9,9")), r.push("^{" + e[2] + "}"), r
                        },
                        operator: function (t, e, r) {
                            return {
                                type_: "operator",
                                kind_: r || e
                            }
                        },
                        space: function () {
                            return {
                                type_: "pu-space-1"
                            }
                        },
                        output: function (t) {
                            var e, r = i.patterns.match_("{(...)}", t.d || "");
                            r && "" === r.remainder && (t.d = r.match_);
                            var a = i.patterns.match_("{(...)}", t.q || "");
                            if (a && "" === a.remainder && (t.q = a.match_), t.d && (t.d = t.d.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C"), t.d = t.d.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F")), t.q) {
                                t.q = t.q.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C"), t.q = t.q.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F");
                                var n = {
                                    d: i.go(t.d, "pu"),
                                    q: i.go(t.q, "pu")
                                };
                                "//" === t.o ? e = {
                                    type_: "pu-frac",
                                    p1: n.d,
                                    p2: n.q
                                } : (e = n.d, n.d.length > 1 || n.q.length > 1 ? e.push({
                                    type_: " / "
                                }) : e.push({
                                    type_: "/"
                                }), i.concatArray(e, n.q))
                            } else e = i.go(t.d, "pu-2");
                            for (var o in t) delete t[o];
                            return e
                        }
                    }
                },
                "pu-2": {
                    transitions: i.createTransitions({
                        empty: {
                            "*": {
                                action_: "output"
                            }
                        },
                        "*": {
                            "*": {
                                action_: ["output", "cdot"],
                                nextState: "0"
                            }
                        },
                        "\\x": {
                            "*": {
                                action_: "rm="
                            }
                        },
                        space: {
                            "*": {
                                action_: ["output", "space"],
                                nextState: "0"
                            }
                        },
                        "^{(...)}|^(-1)": {
                            1: {
                                action_: "^(-1)"
                            }
                        },
                        "-9.,9": {
                            0: {
                                action_: "rm=",
                                nextState: "0"
                            },
                            1: {
                                action_: "^(-1)",
                                nextState: "0"
                            }
                        },
                        "{...}|else": {
                            "*": {
                                action_: "rm=",
                                nextState: "1"
                            }
                        }
                    }),
                    actions: {
                        cdot: function () {
                            return {
                                type_: "tight cdot"
                            }
                        },
                        "^(-1)": function (t, e) {
                            t.rm += "^{" + e + "}"
                        },
                        space: function () {
                            return {
                                type_: "pu-space-2"
                            }
                        },
                        output: function (t) {
                            var e = [];
                            if (t.rm) {
                                var r = i.patterns.match_("{(...)}", t.rm || "");
                                e = r && "" === r.remainder ? i.go(r.match_, "pu") : {
                                    type_: "rm",
                                    p1: t.rm
                                }
                            }
                            for (var a in t) delete t[a];
                            return e
                        }
                    }
                },
                "pu-9,9": {
                    transitions: i.createTransitions({
                        empty: {
                            0: {
                                action_: "output-0"
                            },
                            o: {
                                action_: "output-o"
                            }
                        },
                        ",": {
                            0: {
                                action_: ["output-0", "comma"],
                                nextState: "o"
                            }
                        },
                        ".": {
                            0: {
                                action_: ["output-0", "copy"],
                                nextState: "o"
                            }
                        },
                        else: {
                            "*": {
                                action_: "text="
                            }
                        }
                    }),
                    actions: {
                        comma: function () {
                            return {
                                type_: "commaDecimal"
                            }
                        },
                        "output-0": function (t) {
                            var e = [];
                            if (t.text_ = t.text_ || "", t.text_.length > 4) {
                                var r = t.text_.length % 3;
                                0 === r && (r = 3);
                                for (var a = t.text_.length - 3; a > 0; a -= 3) e.push(t.text_.substr(a, 3)), e.push({
                                    type_: "1000 separator"
                                });
                                e.push(t.text_.substr(0, r)), e.reverse()
                            } else e.push(t.text_);
                            for (var n in t) delete t[n];
                            return e
                        },
                        "output-o": function (t) {
                            var e = [];
                            if (t.text_ = t.text_ || "", t.text_.length > 4) {
                                for (var r = t.text_.length - 3, a = 0; a < r; a += 3) e.push(t.text_.substr(a, 3)), e.push({
                                    type_: "1000 separator"
                                });
                                e.push(t.text_.substr(a))
                            } else e.push(t.text_);
                            for (var n in t) delete t[n];
                            return e
                        }
                    }
                }
            };
            var s = {
                go: function (t, e) {
                    if (!t) return "";
                    for (var r = "", a = !1, n = 0; n < t.length; n++) {
                        var o = t[n];
                        "string" == typeof o ? r += o : (r += s._go2(o), "1st-level escape" === o.type_ && (a = !0))
                    }
                    return e || a || !r || (r = "{" + r + "}"), r
                },
                _goInner: function (t) {
                    return t ? s.go(t, !0) : t
                },
                _go2: function (t) {
                    var e;
                    switch (t.type_) {
                        case "chemfive":
                            e = "";
                            var r = {
                                a: s._goInner(t.a),
                                b: s._goInner(t.b),
                                p: s._goInner(t.p),
                                o: s._goInner(t.o),
                                q: s._goInner(t.q),
                                d: s._goInner(t.d)
                            };
                            r.a && (r.a.match(/^[+\-]/) && (r.a = "{" + r.a + "}"), e += r.a + "\\,"), (r.b || r.p) && (e += "{\\vphantom{X}}", e += "^{\\hphantom{" + (r.b || "") + "}}_{\\hphantom{" + (r.p || "") + "}}", e += "{\\vphantom{X}}", e += "^{\\smash[t]{\\vphantom{2}}\\mathllap{" + (r.b || "") + "}}", e += "_{\\vphantom{2}\\mathllap{\\smash[t]{" + (r.p || "") + "}}}"), r.o && (r.o.match(/^[+\-]/) && (r.o = "{" + r.o + "}"), e += r.o), "kv" === t.dType ? ((r.d || r.q) && (e += "{\\vphantom{X}}"), r.d && (e += "^{" + r.d + "}"), r.q && (e += "_{\\smash[t]{" + r.q + "}}")) : "oxidation" === t.dType ? (r.d && (e += "{\\vphantom{X}}", e += "^{" + r.d + "}"), r.q && (e += "{\\vphantom{X}}", e += "_{\\smash[t]{" + r.q + "}}")) : (r.q && (e += "{\\vphantom{X}}", e += "_{\\smash[t]{" + r.q + "}}"), r.d && (e += "{\\vphantom{X}}", e += "^{" + r.d + "}"));
                            break;
                        case "rm":
                            e = "\\mathrm{" + t.p1 + "}";
                            break;
                        case "text":
                            t.p1.match(/[\^_]/) ? (t.p1 = t.p1.replace(" ", "~").replace("-", "\\text{-}"), e = "\\mathrm{" + t.p1 + "}") : e = "\\text{" + t.p1 + "}";
                            break;
                        case "roman numeral":
                            e = "\\mathrm{" + t.p1 + "}";
                            break;
                        case "state of aggregation":
                            e = "\\mskip2mu " + s._goInner(t.p1);
                            break;
                        case "state of aggregation subscript":
                            e = "\\mskip1mu " + s._goInner(t.p1);
                            break;
                        case "bond":
                            if (!(e = s._getBond(t.kind_))) throw ["MhchemErrorBond", "mhchem Error. Unknown bond type (" + t.kind_ + ")"];
                            break;
                        case "frac":
                            var a = "\\frac{" + t.p1 + "}{" + t.p2 + "}";
                            e = "\\mathchoice{\\textstyle" + a + "}{" + a + "}{" + a + "}{" + a + "}";
                            break;
                        case "pu-frac":
                            var n = "\\frac{" + s._goInner(t.p1) + "}{" + s._goInner(t.p2) + "}";
                            e = "\\mathchoice{\\textstyle" + n + "}{" + n + "}{" + n + "}{" + n + "}";
                            break;
                        case "tex-math":
                            e = t.p1 + " ";
                            break;
                        case "frac-ce":
                            e = "\\frac{" + s._goInner(t.p1) + "}{" + s._goInner(t.p2) + "}";
                            break;
                        case "overset":
                            e = "\\overset{" + s._goInner(t.p1) + "}{" + s._goInner(t.p2) + "}";
                            break;
                        case "underset":
                            e = "\\underset{" + s._goInner(t.p1) + "}{" + s._goInner(t.p2) + "}";
                            break;
                        case "underbrace":
                            e = "\\underbrace{" + s._goInner(t.p1) + "}_{" + s._goInner(t.p2) + "}";
                            break;
                        case "color":
                            e = "{\\color{" + t.color1 + "}{" + s._goInner(t.color2) + "}}";
                            break;
                        case "color0":
                            e = "\\color{" + t.color + "}";
                            break;
                        case "arrow":
                            var o = {
                                    rd: s._goInner(t.rd),
                                    rq: s._goInner(t.rq)
                                },
                                i = "\\x" + s._getArrow(t.r);
                            o.rq && (i += "[{" + o.rq + "}]"), e = i += o.rd ? "{" + o.rd + "}" : "{}";
                            break;
                        case "operator":
                            e = s._getOperator(t.kind_);
                            break;
                        case "1st-level escape":
                            e = t.p1 + " ";
                            break;
                        case "space":
                            e = " ";
                            break;
                        case "entitySkip":
                        case "pu-space-1":
                            e = "~";
                            break;
                        case "pu-space-2":
                            e = "\\mkern3mu ";
                            break;
                        case "1000 separator":
                            e = "\\mkern2mu ";
                            break;
                        case "commaDecimal":
                            e = "{,}";
                            break;
                        case "comma enumeration L":
                            e = "{" + t.p1 + "}\\mkern6mu ";
                            break;
                        case "comma enumeration M":
                            e = "{" + t.p1 + "}\\mkern3mu ";
                            break;
                        case "comma enumeration S":
                            e = "{" + t.p1 + "}\\mkern1mu ";
                            break;
                        case "hyphen":
                            e = "\\text{-}";
                            break;
                        case "addition compound":
                            e = "\\,{\\cdot}\\,";
                            break;
                        case "electron dot":
                            e = "\\mkern1mu \\bullet\\mkern1mu ";
                            break;
                        case "KV x":
                            e = "{\\times}";
                            break;
                        case "prime":
                            e = "\\prime ";
                            break;
                        case "cdot":
                            e = "\\cdot ";
                            break;
                        case "tight cdot":
                            e = "\\mkern1mu{\\cdot}\\mkern1mu ";
                            break;
                        case "times":
                            e = "\\times ";
                            break;
                        case "circa":
                            e = "{\\sim}";
                            break;
                        case "^":
                            e = "uparrow";
                            break;
                        case "v":
                            e = "downarrow";
                            break;
                        case "ellipsis":
                            e = "\\ldots ";
                            break;
                        case "/":
                            e = "/";
                            break;
                        case " / ":
                            e = "\\,/\\,";
                            break;
                        default:
                            throw ["MhchemBugT", "mhchem bug T. Please report."]
                    }
                    return e
                },
                _getArrow: function (t) {
                    switch (t) {
                        case "->":
                        case "→":
                        case "⟶":
                            return "rightarrow";
                        case "<-":
                            return "leftarrow";
                        case "<->":
                            return "leftrightarrow";
                        case "<--\x3e":
                            return "rightleftarrows";
                        case "<=>":
                        case "⇌":
                            return "rightleftharpoons";
                        case "<=>>":
                            return "rightequilibrium";
                        case "<<=>":
                            return "leftequilibrium";
                        default:
                            throw ["MhchemBugT", "mhchem bug T. Please report."]
                    }
                },
                _getBond: function (t) {
                    switch (t) {
                        case "-":
                        case "1":
                            return "{-}";
                        case "=":
                        case "2":
                            return "{=}";
                        case "#":
                        case "3":
                            return "{\\equiv}";
                        case "~":
                            return "{\\tripledash}";
                        case "~-":
                            return "{\\mathrlap{\\raisebox{-.1em}{$-$}}\\raisebox{.1em}{$\\tripledash$}}";
                        case "~=":
                        case "~--":
                            return "{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$\\tripledash$}}-}";
                        case "-~-":
                            return "{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$-$}}\\tripledash}";
                        case "...":
                            return "{{\\cdot}{\\cdot}{\\cdot}}";
                        case "....":
                            return "{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}";
                        case "->":
                            return "{\\rightarrow}";
                        case "<-":
                            return "{\\leftarrow}";
                        case "<":
                            return "{<}";
                        case ">":
                            return "{>}";
                        default:
                            throw ["MhchemBugT", "mhchem bug T. Please report."]
                    }
                },
                _getOperator: function (t) {
                    switch (t) {
                        case "+":
                            return " {}+{} ";
                        case "-":
                            return " {}-{} ";
                        case "=":
                            return " {}={} ";
                        case "<":
                            return " {}<{} ";
                        case ">":
                            return " {}>{} ";
                        case "<<":
                            return " {}\\ll{} ";
                        case ">>":
                            return " {}\\gg{} ";
                        case "\\pm":
                            return " {}\\pm{} ";
                        case "\\approx":
                        case "$\\approx$":
                            return " {}\\approx{} ";
                        case "v":
                        case "(v)":
                            return " \\downarrow{} ";
                        case "^":
                        case "(^)":
                            return " \\uparrow{} ";
                        default:
                            throw ["MhchemBugT", "mhchem bug T. Please report."]
                    }
                }
            };
            let l = {
                    throwOnError: !1,
                    displayMode: !1
                },
                h = {
                    throwOnError: !1,
                    displayMode: !0
                };
            const m = /c194a9eb/g,
                c = /c194a9ec/g,
                u = /c194a9ed/g,
                p = /c194a9ee/g,
                d = /c194a9ef/g,
                f = /c194a9eg<!-- begin-inline-katex([\s\S]*?)end-inline-katex-->/g,
                g = /<!-- begin-block-katex([\s\S]*?)end-block-katex-->/g,
                x = /!!blockDollar!!/g;
            $docsify.plugins = [].concat((function (t) {
                    t.beforeEach(t => {
                        let e = t.replace(/<code>(.*)<\/code>/g, (function (t, e) {
                                    return `<code>${e.replace(/`/g,"c194a9ec")}</code>`})).replace(/\$`\
                                    $ / g, "c194a9ed").replace(/\\`\{/g, "c194a9ee").replace(/\\\$/g, "c194a9eb").replace(/(`{1,})([\s\S]*?)\1/g, (function (t) {
                                    return t.replace(/\$/g, "c194a9ef")
                                })).replace(c, "`");
                                return e = e.replace(u, "$ `$").replace(p, "\\`{"), e = e.replace(/(\$\$)([\s\S]*?)(\$\$)/g, (function (t, e, r) {
                                    return "\x3c!-- begin-block-katex" + r.replace(/\$/g, "!!blockDollar!!") + "end-block-katex--\x3e"
                                })).replace(/(\$)([\s\S]*?)(\$)/g, (function (t, e, r) {
                                    return "c194a9eg\x3c!-- begin-inline-katex" + r.replace(m, "\\$") + "end-inline-katex--\x3e"
                                })).replace(m, "\\$"), e
                            }),
                            t.afterEach((function (t, e) {
                                let r = t.replace(f, (function (t, e) {
                                    return n.a.renderToString(e, l)
                                }));
                                r = r.replace(g, (function (t, e) {
                                    return e = e.replace(x, "$"), n.a.renderToString(e, h)
                                })), e(r.replace(d, "$"))
                            }))
                    }), $docsify.plugins)
            }]);
            