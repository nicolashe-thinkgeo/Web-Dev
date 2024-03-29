/*
 AngularJS v1.3.4-build.3576+sha.d5968c7
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (M, f, S) {
    'use strict'; f.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", function () { return function (T, B, k) { k = k.ngAnimateChildren; f.isString(k) && 0 === k.length ? B.data("$$ngAnimateChildren", !0) : T.$watch(k, function (f) { B.data("$$ngAnimateChildren", !!f) }) } }).factory("$$animateReflow", ["$$rAF", "$document", function (f, B) { return function (k) { return f(function () { k() }) } }]).config(["$provide", "$animateProvider", function (T, B) {
        function k(f) { for (var g = 0; g < f.length; g++) { var k = f[g]; if (1 == k.nodeType) return k } }
        function N(f, g) { return k(f) == k(g) } var s = f.noop, g = f.forEach, ba = B.$$selectors, $ = f.isArray, ca = f.isString, da = f.isObject, t = { running: !0 }; T.decorator("$animate", ["$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", function (O, M, I, U, x, C, P, S, V) {
            function A(a, c) { var b = a.data("$$ngAnimateState") || {}; c && (b.running = !0, b.structural = !0, a.data("$$ngAnimateState", b)); return b.disabled || b.running && b.structural } function z(a) {
                var c, b = M.defer(); b.promise.$$cancelFn =
                function () { c && c() }; P.$$postDigest(function () { c = a(function () { b.resolve() }) }); return b.promise
            } function J(a) { if (da(a)) return a.tempClasses && ca(a.tempClasses) && (a.tempClasses = a.tempClasses.split(/\s+/)), a } function W(a, c, b) {
                b = b || {}; var e = {}; g(b, function (a, d) { g(d.split(" "), function (d) { e[d] = a }) }); var m = Object.create(null); g((a.attr("class") || "").split(/\s+/), function (a) { m[a] = !0 }); var f = [], k = []; g(c && c.classes || [], function (a, d) {
                    var b = m[d], c = e[d] || {}; !1 === a ? (b || "addClass" == c.event) && k.push(d) : !0 === a && (b &&
                    "removeClass" != c.event || f.push(d))
                }); return 0 < f.length + k.length && [f.join(" "), k.join(" ")]
            } function Q(a) { if (a) { var c = [], b = {}; a = a.substr(1).split("."); (U.transitions || U.animations) && c.push(I.get(ba[""])); for (var e = 0; e < a.length; e++) { var f = a[e], k = ba[f]; k && !b[f] && (c.push(I.get(k)), b[f] = !0) } return c } } function R(a, c, b, e) {
                function m(a, d) { var b = a[d], c = a["before" + d.charAt(0).toUpperCase() + d.substr(1)]; if (b || c) return "leave" == d && (c = b, b = null), l.push({ event: d, fn: b }), H.push({ event: d, fn: c }), !0 } function k(c, h, G) {
                    var w =
                    []; g(c, function (a) { a.fn && w.push(a) }); var f = 0; g(w, function (c, n) { var u = function () { a: { if (h) { (h[n] || s)(); if (++f < w.length) break a; h = null } G() } }; switch (c.event) { case "setClass": h.push(c.fn(a, F, d, u, e)); break; case "animate": h.push(c.fn(a, b, e.from, e.to, u)); break; case "addClass": h.push(c.fn(a, F || b, u, e)); break; case "removeClass": h.push(c.fn(a, d || b, u, e)); break; default: h.push(c.fn(a, u, e)) } }); h && 0 === h.length && G()
                } var p = a[0]; if (p) {
                    e && (e.to = e.to || {}, e.from = e.from || {}); var F, d; $(b) && (F = b[0], d = b[1], F ? d ? b = F + " " + d : (b =
                    F, c = "addClass") : (b = d, c = "removeClass")); var h = "setClass" == c, G = h || "addClass" == c || "removeClass" == c || "animate" == c, w = a.attr("class") + " " + b; if (X(w)) {
                        var u = s, n = [], H = [], q = s, r = [], l = [], w = (" " + w).replace(/\s+/g, "."); g(Q(w), function (a) { !m(a, c) && h && (m(a, "addClass"), m(a, "removeClass")) }); return {
                            node: p, event: c, className: b, isClassBased: G, isSetClassOperation: h, applyStyles: function () { e && a.css(f.extend(e.from || {}, e.to || {})) }, before: function (a) { u = a; k(H, n, function () { u = s; a() }) }, after: function (a) {
                                q = a; k(l, r, function () {
                                    q =
                                    s; a()
                                })
                            }, cancel: function () { n && (g(n, function (a) { (a || s)(!0) }), u(!0)); r && (g(r, function (a) { (a || s)(!0) }), q(!0)) }
                        }
                    }
                }
            } function y(a, c, b, e, m, k, p, F) {
                function d(d) { var h = "$animate:" + d; H && H[h] && 0 < H[h].length && C(function () { b.triggerHandler(h, { event: a, className: c }) }) } function h() { d("before") } function G() { d("after") } function w() { w.hasBeenRun || (w.hasBeenRun = !0, k()) } function u() {
                    if (!u.hasBeenRun) {
                        n && n.applyStyles(); u.hasBeenRun = !0; p && p.tempClasses && g(p.tempClasses, function (a) { b.removeClass(a) }); var h = b.data("$$ngAnimateState");
                        h && (n && n.isClassBased ? l(b, c) : (C(function () { var d = b.data("$$ngAnimateState") || {}; v == d.index && l(b, c, a) }), b.data("$$ngAnimateState", h))); d("close"); F()
                    }
                } var n = R(b, a, c, p); if (!n) return w(), h(), G(), u(), s; a = n.event; c = n.className; var H = f.element._data(n.node), H = H && H.events; e || (e = m ? m.parent() : b.parent()); if (Y(b, e)) return w(), h(), G(), u(), s; e = b.data("$$ngAnimateState") || {}; var q = e.active || {}, r = e.totalActive || 0, t = e.last; m = !1; if (0 < r) {
                    r = []; if (n.isClassBased) "setClass" == t.event ? (r.push(t), l(b, c)) : q[c] && (aa = q[c],
                    aa.event == a ? m = !0 : (r.push(aa), l(b, c))); else if ("leave" == a && q["ng-leave"]) m = !0; else { for (var aa in q) r.push(q[aa]); e = {}; l(b, !0) } 0 < r.length && g(r, function (a) { a.cancel() })
                } !n.isClassBased || n.isSetClassOperation || "animate" == a || m || (m = "addClass" == a == b.hasClass(c)); if (m) return w(), h(), G(), d("close"), F(), s; q = e.active || {}; r = e.totalActive || 0; if ("leave" == a) b.one("$destroy", function (a) { a = f.element(this); var d = a.data("$$ngAnimateState"); d && (d = d.active["ng-leave"]) && (d.cancel(), l(a, "ng-leave")) }); b.addClass("ng-animate");
                p && p.tempClasses && g(p.tempClasses, function (a) { b.addClass(a) }); var v = Z++; r++; q[c] = n; b.data("$$ngAnimateState", { last: n, active: q, index: v, totalActive: r }); h(); n.before(function (d) { var h = b.data("$$ngAnimateState"); d = d || !h || !h.active[c] || n.isClassBased && h.active[c].event != a; w(); !0 === d ? u() : (G(), n.after(u)) }); return n.cancel
            } function K(a) {
                if (a = k(a)) a = f.isFunction(a.getElementsByClassName) ? a.getElementsByClassName("ng-animate") : a.querySelectorAll(".ng-animate"), g(a, function (a) {
                    a = f.element(a); (a = a.data("$$ngAnimateState")) &&
                    a.active && g(a.active, function (a) { a.cancel() })
                })
            } function l(a, c) { if (N(a, x)) t.disabled || (t.running = !1, t.structural = !1); else if (c) { var b = a.data("$$ngAnimateState") || {}, e = !0 === c; !e && b.active && b.active[c] && (b.totalActive--, delete b.active[c]); if (e || !b.totalActive) a.removeClass("ng-animate"), a.removeData("$$ngAnimateState") } } function Y(a, c) {
                if (t.disabled) return !0; if (N(a, x)) return t.running; var b, e, k; do {
                    if (0 === c.length) break; var g = N(c, x), p = g ? t : c.data("$$ngAnimateState") || {}; if (p.disabled) return !0; g && (k =
                    !0); !1 !== b && (g = c.data("$$ngAnimateChildren"), f.isDefined(g) && (b = g)); e = e || p.running || p.last && !p.last.isClassBased
                } while (c = c.parent()); return !k || !b && e
            } x.data("$$ngAnimateState", t); var L = P.$watch(function () { return V.totalPendingRequests }, function (a, c) { 0 === a && (L(), P.$$postDigest(function () { P.$$postDigest(function () { t.running = !1 }) })) }), Z = 0, E = B.classNameFilter(), X = E ? function (a) { return E.test(a) } : function () { return !0 }; return {
                animate: function (a, c, b, e, g) {
                    e = e || "ng-inline-animate"; g = J(g) || {}; g.from = b ? c : null;
                    g.to = b ? b : c; return z(function (b) { return y("animate", e, f.element(k(a)), null, null, s, g, b) })
                }, enter: function (a, c, b, e) { e = J(e); a = f.element(a); c = c && f.element(c); b = b && f.element(b); A(a, !0); O.enter(a, c, b); return z(function (g) { return y("enter", "ng-enter", f.element(k(a)), c, b, s, e, g) }) }, leave: function (a, c) { c = J(c); a = f.element(a); K(a); A(a, !0); return z(function (b) { return y("leave", "ng-leave", f.element(k(a)), null, null, function () { O.leave(a) }, c, b) }) }, move: function (a, c, b, e) {
                    e = J(e); a = f.element(a); c = c && f.element(c); b = b &&
                    f.element(b); K(a); A(a, !0); O.move(a, c, b); return z(function (g) { return y("move", "ng-move", f.element(k(a)), c, b, s, e, g) })
                }, addClass: function (a, c, b) { return this.setClass(a, c, [], b) }, removeClass: function (a, c, b) { return this.setClass(a, [], c, b) }, setClass: function (a, c, b, e) {
                    e = J(e); a = f.element(a); a = f.element(k(a)); if (A(a)) return O.$$setClassImmediately(a, c, b, e); var m, l = a.data("$$animateClasses"), p = !!l; l || (l = { classes: {} }); m = l.classes; c = $(c) ? c : c.split(" "); g(c, function (a) { a && a.length && (m[a] = !0) }); b = $(b) ? b : b.split(" ");
                    g(b, function (a) { a && a.length && (m[a] = !1) }); if (p) return e && l.options && (l.options = f.extend(l.options || {}, e)), l.promise; a.data("$$animateClasses", l = { classes: m, options: e }); return l.promise = z(function (b) {
                        var d = a.parent(), h = k(a), c = h.parentNode; if (!c || c.$$NG_REMOVED || h.$$NG_REMOVED) b(); else {
                            h = a.data("$$animateClasses"); a.removeData("$$animateClasses"); var c = a.data("$$ngAnimateState") || {}, e = W(a, h, c.active); return e ? y("setClass", e, a, d, null, function () {
                                e[0] && O.$$addClassImmediately(a, e[0]); e[1] && O.$$removeClassImmediately(a,
                                e[1])
                            }, h.options, b) : b()
                        }
                    })
                }, cancel: function (a) { a.$$cancelFn() }, enabled: function (a, c) { switch (arguments.length) { case 2: if (a) l(c); else { var b = c.data("$$ngAnimateState") || {}; b.disabled = !0; c.data("$$ngAnimateState", b) } break; case 1: t.disabled = !a; break; default: a = !t.disabled } return !!a }
            }
        }]); B.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function (t, B, I, U) {
            function x() { e || (e = U(function () { b = []; e = null; a = {} })) } function C(c, d) {
                e && e(); b.push(d); e = U(function () {
                    g(b, function (a) { a() }); b = []; e = null; a =
                    {}
                })
            } function P(a, d) { var h = k(a); a = f.element(h); p.push(a); h = Date.now() + d; h <= N || (I.cancel(m), N = h, m = I(function () { T(p); p = [] }, d, !1)) } function T(a) { g(a, function (a) { (a = a.data("$$ngAnimateCSS3Data")) && g(a.closeAnimationFns, function (a) { a() }) }) } function V(b, d) {
                var h = d ? a[d] : null; if (!h) {
                    var c = 0, e = 0, f = 0, k = 0; g(b, function (a) {
                        if (1 == a.nodeType) {
                            a = t.getComputedStyle(a) || {}; c = Math.max(A(a[L + "Duration"]), c); e = Math.max(A(a[L + "Delay"]), e); k = Math.max(A(a[E + "Delay"]), k); var d = A(a[E + "Duration"]); 0 < d && (d *= parseInt(a[E + "IterationCount"],
                            10) || 1); f = Math.max(d, f)
                        }
                    }); h = { total: 0, transitionDelay: e, transitionDuration: c, animationDelay: k, animationDuration: f }; d && (a[d] = h)
                } return h
            } function A(a) { var d = 0; a = ca(a) ? a.split(/\s*,\s*/) : []; g(a, function (a) { d = Math.max(parseFloat(a) || 0, d) }); return d } function z(b, d, h, e) {
                b = 0 <= ["ng-enter", "ng-leave", "ng-move"].indexOf(h); var f, g = d.parent(), n = g.data("$$ngAnimateKey"); n || (g.data("$$ngAnimateKey", ++c), n = c); f = n + "-" + k(d).getAttribute("class"); var g = f + " " + h, n = a[g] ? ++a[g].total : 0, l = {}; if (0 < n) {
                    var q = h + "-stagger",
                    l = f + " " + q; (f = !a[l]) && d.addClass(q); l = V(d, l); f && d.removeClass(q)
                } d.addClass(h); var q = d.data("$$ngAnimateCSS3Data") || {}, r = V(d, g); f = r.transitionDuration; r = r.animationDuration; if (b && 0 === f && 0 === r) return d.removeClass(h), !1; h = e || b && 0 < f; b = 0 < r && 0 < l.animationDelay && 0 === l.animationDuration; d.data("$$ngAnimateCSS3Data", { stagger: l, cacheKey: g, running: q.running || 0, itemIndex: n, blockTransition: h, closeAnimationFns: q.closeAnimationFns || [] }); g = k(d); h && (W(g, !0), e && d.css(e)); b && (g.style[E + "PlayState"] = "paused"); return !0
            }
            function J(a, d, b, c, e) {
                function f() { d.off(C, l); d.removeClass(q); d.removeClass(r); z && I.cancel(z); K(d, b); var a = k(d), c; for (c in p) a.style.removeProperty(p[c]) } function l(a) { a.stopPropagation(); var d = a.originalEvent || a; a = d.$manualTimeStamp || d.timeStamp || Date.now(); d = parseFloat(d.elapsedTime.toFixed(3)); Math.max(a - B, 0) >= A && d >= x && c() } var m = k(d); a = d.data("$$ngAnimateCSS3Data"); if (-1 != m.getAttribute("class").indexOf(b) && a) {
                    var q = "", r = ""; g(b.split(" "), function (a, d) {
                        var b = (0 < d ? " " : "") + a; q += b + "-active"; r += b +
                        "-pending"
                    }); var p = [], t = a.itemIndex, v = a.stagger, s = 0; if (0 < t) { s = 0; 0 < v.transitionDelay && 0 === v.transitionDuration && (s = v.transitionDelay * t); var y = 0; 0 < v.animationDelay && 0 === v.animationDuration && (y = v.animationDelay * t, p.push(Y + "animation-play-state")); s = Math.round(100 * Math.max(s, y)) / 100 } s || (d.addClass(q), a.blockTransition && W(m, !1)); var D = V(d, a.cacheKey + " " + q), x = Math.max(D.transitionDuration, D.animationDuration); if (0 === x) d.removeClass(q), K(d, b), c(); else {
                        !s && e && (D.transitionDuration || (d.css("transition", D.animationDuration +
                        "s linear all"), p.push("transition")), d.css(e)); var t = Math.max(D.transitionDelay, D.animationDelay), A = 1E3 * t; 0 < p.length && (v = m.getAttribute("style") || "", ";" !== v.charAt(v.length - 1) && (v += ";"), m.setAttribute("style", v + " ")); var B = Date.now(), C = X + " " + Z, t = 1E3 * (s + 1.5 * (t + x)), z; 0 < s && (d.addClass(r), z = I(function () {
                            z = null; 0 < D.transitionDuration && W(m, !1); 0 < D.animationDuration && (m.style[E + "PlayState"] = ""); d.addClass(q); d.removeClass(r); e && (0 === D.transitionDuration && d.css("transition", D.animationDuration + "s linear all"),
                            d.css(e), p.push("transition"))
                        }, 1E3 * s, !1)); d.on(C, l); a.closeAnimationFns.push(function () { f(); c() }); a.running++; P(d, t); return f
                    }
                } else c()
            } function W(a, d) { a.style[L + "Property"] = d ? "none" : "" } function Q(a, d, b, c) { if (z(a, d, b, c)) return function (a) { a && K(d, b) } } function R(a, d, b, c, e) { if (d.data("$$ngAnimateCSS3Data")) return J(a, d, b, c, e); K(d, b); c() } function y(a, d, b, c, e) { var f = Q(a, d, b, e.from); if (f) { var g = f; C(d, function () { g = R(a, d, b, c, e.to) }); return function (a) { (g || s)(a) } } x(); c() } function K(a, d) {
                a.removeClass(d);
                var b = a.data("$$ngAnimateCSS3Data"); b && (b.running && b.running--, b.running && 0 !== b.running || a.removeData("$$ngAnimateCSS3Data"))
            } function l(a, d) { var b = ""; a = $(a) ? a : a.split(/\s+/); g(a, function (a, c) { a && 0 < a.length && (b += (0 < c ? " " : "") + a + d) }); return b } var Y = "", L, Z, E, X; M.ontransitionend === S && M.onwebkittransitionend !== S ? (Y = "-webkit-", L = "WebkitTransition", Z = "webkitTransitionEnd transitionend") : (L = "transition", Z = "transitionend"); M.onanimationend === S && M.onwebkitanimationend !== S ? (Y = "-webkit-", E = "WebkitAnimation",
            X = "webkitAnimationEnd animationend") : (E = "animation", X = "animationend"); var a = {}, c = 0, b = [], e, m = null, N = 0, p = []; return {
                animate: function (a, d, b, c, e, f) { f = f || {}; f.from = b; f.to = c; return y("animate", a, d, e, f) }, enter: function (a, b, c) { c = c || {}; return y("enter", a, "ng-enter", b, c) }, leave: function (a, b, c) { c = c || {}; return y("leave", a, "ng-leave", b, c) }, move: function (a, b, c) { c = c || {}; return y("move", a, "ng-move", b, c) }, beforeSetClass: function (a, b, c, e, f) {
                    f = f || {}; b = l(c, "-remove") + " " + l(b, "-add"); if (f = Q("setClass", a, b, f.from)) return C(a,
                    e), f; x(); e()
                }, beforeAddClass: function (a, b, c, e) { e = e || {}; if (b = Q("addClass", a, l(b, "-add"), e.from)) return C(a, c), b; x(); c() }, beforeRemoveClass: function (a, b, c, e) { e = e || {}; if (b = Q("removeClass", a, l(b, "-remove"), e.from)) return C(a, c), b; x(); c() }, setClass: function (a, b, c, e, f) { f = f || {}; c = l(c, "-remove"); b = l(b, "-add"); return R("setClass", a, c + " " + b, e, f.to) }, addClass: function (a, b, c, e) { e = e || {}; return R("addClass", a, l(b, "-add"), c, e.to) }, removeClass: function (a, b, c, e) { e = e || {}; return R("removeClass", a, l(b, "-remove"), c, e.to) }
            }
        }])
    }])
})(window,
window.angular);
//# sourceMappingURL=angular-animate.min.js.map