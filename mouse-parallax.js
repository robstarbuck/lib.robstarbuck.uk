/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, V = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), X = /* @__PURE__ */ new WeakMap();
let it = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = X.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && X.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const lt = (r) => new it(typeof r == "string" ? r : r + "", void 0, q), ct = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new it(e, r, q);
}, dt = (r, t) => {
  if (V)
    r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = R.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
    }
}, Y = V ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return lt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: ut, getOwnPropertyDescriptor: $t, getOwnPropertyNames: _t, getOwnPropertySymbols: ft, getPrototypeOf: mt } = Object, f = globalThis, G = f.trustedTypes, gt = G ? G.emptyScript : "", D = f.reactiveElementPolyfillSupport, w = (r, t) => r, N = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? gt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, W = (r, t) => !pt(r, t), J = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: W };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class A extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = J) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ut(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = $t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(n) {
      const a = i == null ? void 0 : i.call(this);
      o.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties")))
      return;
    const t = mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [..._t(e), ...ft(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, i] of e)
          this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(Y(i));
    } else
      t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : N).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : N;
      this._$Em = i, this[i] = a.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? W)(this[t], e))
        return;
      this.P(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep)
          this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [o, n] of i)
          n.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[w("elementProperties")] = /* @__PURE__ */ new Map(), A[w("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: A }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, k = x.trustedTypes, K = k ? k.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, rt = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, nt = "?" + _, yt = `<${nt}>`, v = document, T = () => v.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", ot = Array.isArray, vt = (r) => ot(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", z = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Z = /-->/g, F = />/g, g = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, tt = /"/g, ht = /^(?:script|style|textarea|title)$/i, At = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), Et = At(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), y = v.createTreeWalker(v, 129);
function at(r, t) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return K !== void 0 ? K.createHTML(t) : t;
}
const St = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : "", n = P;
  for (let a = 0; a < e; a++) {
    const h = r[a];
    let c, p, l = -1, u = 0;
    for (; u < h.length && (n.lastIndex = u, p = n.exec(h), p !== null); )
      u = n.lastIndex, n === P ? p[1] === "!--" ? n = Z : p[1] !== void 0 ? n = F : p[2] !== void 0 ? (ht.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = g) : p[3] !== void 0 && (n = g) : n === g ? p[0] === ">" ? (n = i ?? P, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? g : p[3] === '"' ? tt : Q) : n === tt || n === Q ? n = g : n === Z || n === F ? n = P : (n = g, i = void 0);
    const $ = n === g && r[a + 1].startsWith("/>") ? " " : "";
    o += n === P ? h + yt : l >= 0 ? (s.push(c), h.slice(0, l) + rt + h.slice(l) + _ + $) : h + _ + (l === -2 ? a : $);
  }
  return [at(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, h = this.parts, [c, p] = St(t, e);
    if (this.el = O.createElement(c, s), y.currentNode = this.el.content, e === 2) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = y.nextNode()) !== null && h.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const l of i.getAttributeNames())
            if (l.endsWith(rt)) {
              const u = p[n++], $ = i.getAttribute(l).split(_), H = /([.?@])?(.*)/.exec(u);
              h.push({ type: 1, index: o, name: H[2], strings: $, ctor: H[1] === "." ? Pt : H[1] === "?" ? wt : H[1] === "@" ? xt : L }), i.removeAttribute(l);
            } else
              l.startsWith(_) && (h.push({ type: 6, index: o }), i.removeAttribute(l));
        if (ht.test(i.tagName)) {
          const l = i.textContent.split(_), u = l.length - 1;
          if (u > 0) {
            i.textContent = k ? k.emptyScript : "";
            for (let $ = 0; $ < u; $++)
              i.append(l[$], T()), y.nextNode(), h.push({ type: 2, index: ++o });
            i.append(l[u], T());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === nt)
          h.push({ type: 2, index: o });
        else {
          let l = -1;
          for (; (l = i.data.indexOf(_, l + 1)) !== -1; )
            h.push({ type: 7, index: o }), l += _.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(r, t, e = r, s) {
  var n, a;
  if (t === E)
    return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = S(r, i._$AS(r, t.values), i, s)), t;
}
class bt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? v).importNode(e, !0);
    y.currentNode = i;
    let o = y.nextNode(), n = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (n === h.index) {
        let c;
        h.type === 2 ? c = new M(o, o.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && (c = new Ct(o, this, t)), this._$AV.push(c), h = s[++a];
      }
      n !== (h == null ? void 0 : h.index) && (o = y.nextNode(), n++);
    }
    return y.currentNode = v, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vt(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(at(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i)
      this._$AH.p(e);
    else {
      const n = new bt(i, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t)
      i === e.length ? e.push(s = new M(this.S(T()), this.S(T()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = S(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const a = t;
      let h, c;
      for (t = o[0], h = 0; h < o.length - 1; h++)
        c = S(this, a[s + h], e, h), c === E && (c = this._$AH[h]), n || (n = !U(c) || c !== this._$AH[h]), c === d ? t = d : t !== d && (t += (c ?? "") + o[h + 1]), this._$AH[h] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class wt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class xt extends L {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? d) === E)
      return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ct {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const B = x.litHtmlPolyfillSupport;
B == null || B(O, M), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.1.2");
const Tt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new M(t.insertBefore(T(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class C extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Tt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var st;
C._$litElement$ = !0, C.finalized = !0, (st = globalThis.litElementHydrateSupport) == null || st.call(globalThis, { LitElement: C });
const I = globalThis.litElementPolyfillSupport;
I == null || I({ LitElement: C });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: W }, Mt = (r = Ot, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const h = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, h, r);
    }, init(a) {
      return a !== void 0 && this.P(n, void 0, r), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(a) {
      const h = this[n];
      t.call(this, a), this.requestUpdate(n, h, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function j(r) {
  return (t, e) => typeof e == "object" ? Mt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n ? { ...s, wrapped: !0 } : s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Rt(r) {
  return (t, e) => {
    const { slot: s, selector: i } = r ?? {}, o = "slot" + (s ? `[name=${s}]` : ":not([name])");
    return Ht(t, e, { get() {
      var h;
      const n = (h = this.renderRoot) == null ? void 0 : h.querySelector(o), a = (n == null ? void 0 : n.assignedElements(r)) ?? [];
      return i === void 0 ? a : a.filter((c) => c.matches(i));
    } });
  };
}
const Nt = ct`
  :host {
    display: block;
    --set-foreground: translate(
      calc(1px * var(--mouse-x, 0) * var(--speed)),
      calc(1px * var(--mouse-y, 0) * var(--speed))
    );
    --set-middleground: translate(
      calc(0.75px * var(--mouse-x, 0) * var(--speed)),
      calc(0.75px * var(--mouse-y, 0) * var(--speed))
    );
    --set-background: translate(
      calc(0.25px * var(--mouse-x, 0) * var(--speed)),
      calc(0.25px * var(--mouse-y, 0) * var(--speed))
    );
  }
`;
var kt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, b = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Lt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && kt(t, e, i), i;
};
let m = class extends C {
  constructor() {
    super(...arguments), this.speed = 0.25, this.easing = 0, this._calculateTransform = (r, t) => {
      const e = this.svgElements.at(0);
      if (!e)
        return 0;
      const { [r]: s } = e.getBoundingClientRect();
      if (this.svgViewPort) {
        const i = this.svgViewPort[r] / s;
        return (t - s / 2) * i;
      }
      return t - s / 2;
    }, this._calculateXTransform = (r) => this._calculateTransform("width", r), this._calculateYTransform = (r) => this._calculateTransform("height", r), this._preventTransition = () => {
      this.style.setProperty("--animation", "none");
    }, this._addTransition = () => {
      this.style.setProperty("--animation", "transform 500ms");
    }, this._resetPosition = () => {
      this.easing = 0, this._addTransition(), this._Move(0, 0);
    }, this._Move = (r, t) => {
      this.style.setProperty("--mouse-x", `${r}`), this.style.setProperty("--mouse-y", `${t}`);
    }, this.isTouchEvent = (r) => "TouchEvent" in window && r instanceof TouchEvent, this._eventXY = (r) => {
      if (this.isTouchEvent(r)) {
        const { clientX: t, clientY: e } = r.touches[0];
        if (r.target instanceof SVGElement) {
          const s = r.target.closest("svg");
          if (s) {
            const { top: i, left: o } = s.getBoundingClientRect();
            return { x: t - o, y: e - i };
          }
        }
        return { x: t, y: e };
      }
      return { x: r.offsetX, y: r.offsetY };
    }, this._handleMove = (r) => {
      const { x: t, y: e } = this._eventXY(r), s = this._calculateXTransform(t), i = this._calculateYTransform(e), o = s * this.easing, n = i * this.easing;
      this.easing = this.easing < 1 ? this.easing + 0.1 : 1, this._Move(o, n);
    }, this.setTransform = (r, t) => {
      r.forEach((e) => {
        window.getComputedStyle(e).transform === "none" && (e.style.setProperty("transform", t), e.style.setProperty("transition", "var(--animation)"));
      });
    };
  }
  firstUpdated() {
    const r = this.svgElements.at(0);
    r instanceof SVGSVGElement && (this.svgViewPort = r.viewBox.baseVal, (this.foreground || this.middleground || this.background) && this.style.setProperty("--speed", `${this.speed}`), this.foreground && this.setTransform(
      r.querySelectorAll(this.foreground),
      "var(--set-foreground)"
    ), this.middleground && this.setTransform(
      r.querySelectorAll(this.middleground),
      "var(--set-middleground)"
    ), this.background && this.setTransform(
      r.querySelectorAll(this.background),
      "var(--set-background)"
    ), r.addEventListener("mouseenter", this._preventTransition), r.addEventListener("mousemove", this._handleMove), r.addEventListener("mouseleave", this._resetPosition), r.addEventListener("touchstart", this._preventTransition), r.addEventListener("touchmove", this._handleMove), r.addEventListener("touchend", this._resetPosition));
  }
  render() {
    return Et`<slot></slot>`;
  }
};
m.styles = [Nt];
b([
  j({ type: Number })
], m.prototype, "speed", 2);
b([
  j({ type: String })
], m.prototype, "foreground", 2);
b([
  j({ type: String })
], m.prototype, "middleground", 2);
b([
  j({ type: String })
], m.prototype, "background", 2);
b([
  Rt({ selector: "svg" })
], m.prototype, "svgElements", 2);
m = b([
  Ut("lib-mouse-parallax")
], m);
export {
  m as LibMouseParallax
};
