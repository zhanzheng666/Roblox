window.__require = function t(e, i, s) {
function r(o) {
var a = i[o];
if (!a) {
if (!e[o]) {
if (n) return n(o, !0);
throw new Error("No module '" + o + "'");
}
a = i[o] = {
exports: {}
};
e[o].call(a.exports, r, a.exports, a, t, e, i, s);
}
return a.exports;
}
var n = "function" == typeof __require && __require;
r.A = function(t) {
t.__esModule = !0;
};
r.a = Object.defineProperty;
r.b = __importDefault;
r.c = __createBinding;
r.d = function(t, e) {
t.default = e;
};
r.e = __decorate;
r.f = __exportStar;
r.g = __importStar;
r.h = __awaiter;
for (var o = 0; o < s.length; o++) r(s[o]);
return r;
}({
1: function(t, e, i) {
var s, r, n = i.exports = {};
function o() {
throw new Error("setTimeout has not been defined");
}
function a() {
throw new Error("clearTimeout has not been defined");
}
(function() {
try {
s = "function" == typeof setTimeout ? setTimeout : o;
} catch (t) {
s = o;
}
try {
r = "function" == typeof clearTimeout ? clearTimeout : a;
} catch (t) {
r = a;
}
})();
function l(t) {
if (s === setTimeout) return setTimeout(t, 0);
if ((s === o || !s) && setTimeout) {
s = setTimeout;
return setTimeout(t, 0);
}
try {
return s(t, 0);
} catch (e) {
try {
return s.call(null, t, 0);
} catch (e) {
return s.call(this, t, 0);
}
}
}
function h(t) {
if (r === clearTimeout) return clearTimeout(t);
if ((r === a || !r) && clearTimeout) {
r = clearTimeout;
return clearTimeout(t);
}
try {
return r(t);
} catch (e) {
try {
return r.call(null, t);
} catch (e) {
return r.call(this, t);
}
}
}
var c, m = [], u = !1, _ = -1;
function f() {
if (u && c) {
u = !1;
c.length ? m = c.concat(m) : _ = -1;
m.length && d();
}
}
function d() {
if (!u) {
var t = l(f);
u = !0;
for (var e = m.length; e; ) {
c = m;
m = [];
for (;++_ < e; ) c && c[_].run();
_ = -1;
e = m.length;
}
c = null;
u = !1;
h(t);
}
}
n.nextTick = function(t) {
var e = new Array(arguments.length - 1);
if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
m.push(new p(t, e));
1 !== m.length || u || l(d);
};
function p(t, e) {
this.fun = t;
this.array = e;
}
p.prototype.run = function() {
this.fun.apply(null, this.array);
};
n.title = "browser";
n.browser = !0;
n.env = {};
n.argv = [];
n.version = "";
n.versions = {};
function y() {}
n.on = y;
n.addListener = y;
n.once = y;
n.off = y;
n.removeListener = y;
n.removeAllListeners = y;
n.emit = y;
n.prependListener = y;
n.prependOnceListener = y;
n.listeners = function() {
return [];
};
n.binding = function() {
throw new Error("process.binding is not supported");
};
n.cwd = function() {
return "/";
};
n.chdir = function() {
throw new Error("process.chdir is not supported");
};
n.umask = function() {
return 0;
};
},
2: function(t, e) {
"use strict";
t.a(e, "__esModule", {
value: !0
});
t(5);
var i = new TextDecoder(), s = function() {
function e(t) {
this.position = 0;
this.reset(t);
}
var s = e.prototype;
t.a(s, "dataView", {
get: function() {
return this._dataView || (this._dataView = new DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength));
},
enumerable: !1,
configurable: !0
});
s.reset = function(t) {
this.data = t;
this.position = 0;
this._dataView = null;
};
s.validate = function(t) {
if (this.position + t > this.data.length) {
console.error("read eof");
return !1;
}
return !0;
};
s.readUInt8 = function() {
if (this.validate(1)) return this.data[this.position++];
};
s.readInt16 = function() {
if (this.validate(2)) return this.data[this.position++] | this.data[this.position++] << 8;
};
s.readInt32 = function() {
if (this.validate(4)) return this.data[this.position++] | this.data[this.position++] << 8 | this.data[this.position++] << 16 | this.data[this.position++] << 24;
};
s.readInt64 = function() {
var t = this.readInt32();
t < 0 && (t += 4294967296);
return t + 4294967296 * this.readInt32();
};
s.readFloat32 = function() {
if (this.validate(4)) {
var t = this.dataView.getFloat32(this.position, !0);
this.position += 4;
return t;
}
};
s.readFloat64 = function() {
if (this.validate(8)) {
var t = this.dataView.getFloat64(this.position, !0);
this.position += 8;
return t;
}
};
s.read7BitInt = function() {
var t = 0, e = 0, i = 0;
do {
if (35 == i) throw Error("Format_Bad7BitInt32");
e |= (127 & (t = this.readUInt8())) << i;
i += 7;
} while (0 != (128 & t));
return e;
};
s.readUTF = function() {
var t = this.read7BitInt();
return this.readUTFBytes(t);
};
s.readUint8Array = function(t, e) {
void 0 === e && (e = !1);
var i = e ? this.data.slice(this.position, this.position + t) : this.data.subarray(this.position, this.position + t);
this.position += t;
return i;
};
s.readUTFBytes = function(t) {
if (0 === t) return "";
if (this.validate(t)) {
var e = this.decodeUTF8(this.data, this.position, t);
this.position += t;
return e;
}
};
s.decoderError = function(t) {
throw new Error("decode error at " + this.position + ": " + t);
};
s.decodeUTF8 = function(t, e, s) {
var r = ~~e, n = void 0 === s ? t.length : Math.min(t.length, r + s);
return r === n ? "" : i.decode(t.subarray(r, n));
};
return e;
}(), r = new Uint8Array(524288), n = new TextEncoder(), o = function() {
function e() {
this.position = 0;
this.data = r;
}
var i = e.prototype;
t.a(i, "dataView", {
get: function() {
return this._dataView || (this._dataView = new DataView(this.data.buffer, 0, this.data.byteLength));
},
enumerable: !1,
configurable: !0
});
i.reset = function() {
this.data = r;
this._dataView = null;
this.position = 0;
};
i.ensureBuffer = function(t) {
if (this.position + t > r.byteLength) {
var e = r;
this.data = r = new Uint8Array(Math.max(~~(1.2 * r.byteLength), this.position + t));
r.set(e, 0);
this._dataView = null;
}
};
i.writeInt8 = function(t) {
this.ensureBuffer(1);
this.data[this.position++] = ~~t;
};
i.writeInt16 = function(t) {
this.ensureBuffer(2);
this.data[this.position++] = ~~t;
this.data[this.position++] = t >> 8;
};
i.writeInt32 = function(t) {
this.ensureBuffer(4);
this.data[this.position++] = ~~t;
this.data[this.position++] = t >> 8;
this.data[this.position++] = t >> 16;
this.data[this.position++] = t >> 24;
};
i.writeInt64 = function(t) {
this.writeInt32(t);
t < 0 ? this.writeInt32(~(-t / 4294967296)) : this.writeInt32(~~(t / 4294967296));
};
i.writeFloat32 = function(t) {
this.ensureBuffer(4);
this.dataView.setFloat32(this.position, t, !0);
this.position += 4;
};
i.writeFloat64 = function(t) {
this.ensureBuffer(8);
this.dataView.setFloat64(this.position, t, !0);
this.position += 8;
};
i._write7BitInt = function(t) {
for (var e = ~~t; e >= 128; ) {
this.data[this.position++] = 128 | e;
e >>>= 7;
}
this.data[this.position++] = e;
};
i.write7BitInt = function(t) {
this.ensureBuffer(5);
this._write7BitInt(t);
};
i._7BitIntLen = function(t) {
return t < 0 ? 5 : t < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5;
};
i.writeUTF = function(t) {
var e = t.length;
if (0 !== e) {
var i = 6 * e;
this.ensureBuffer(5 + i);
var s = this.position;
this.position += this._7BitIntLen(i);
var r = this.position, n = r - s;
this._writeUTFBytes(t);
var o = this.position, a = o - r;
this.position = s;
this._write7BitInt(a);
var l = this.position - s;
l !== n && this.data.copyWithin(r + l - n, r, o);
this.position += a;
} else this.write7BitInt(0);
};
i.writeUint8Array = function(t, e, i) {
var s = ~~e, r = void 0 === i ? t.byteLength : Math.min(t.byteLength, s + i);
if (!((i = r - s) <= 0)) {
this.ensureBuffer(i);
this.data.set(t.subarray(e, r), this.position);
this.position += i;
}
};
i.encoderError = function(t) {
throw new Error("encode error at " + this.position + ": " + t);
};
i._writeUTFBytes = function(t) {
var e = n.encodeInto(t, this.data.subarray(this.position));
this.position += e.written;
};
i.writeUTFBytes = function(t) {
this.ensureBuffer(6 * t.length);
this._writeUTFBytes(t);
};
i.getBytes = function(t) {
void 0 === t && (t = !1);
return t ? this.data.slice(0, this.position) : this.data.subarray(0, this.position);
};
return e;
}(), a = function(t, e) {
this.high = t;
this.low = e;
}, l = function() {
function t() {
this.dw = new o();
this.strMap = new Map();
}
var e = t.prototype;
e.reset = function() {
this.dw.reset();
this.strMap.clear();
};
e.encodeInt = function(t) {
this.dw.writeInt8(1);
this.dw.writeInt32(t);
};
e.encodeLong = function(t) {
this.dw.writeInt8(2);
if ("number" == typeof t) this.dw.writeInt64(t); else {
this.dw.writeInt32(t.low);
this.dw.writeInt32(t.high);
}
};
e.encodeFloat = function(t) {
this.dw.writeInt8(3);
this.dw.writeFloat32(t);
};
e.encodeDouble = function(t) {
this.dw.writeInt8(4);
this.dw.writeFloat64(t);
};
e.encodeNumber = function(t) {
~~t !== t ? Number.isFinite(t) && Math.floor(t) === t ? this.encodeLong(t) : this.encodeDouble(t) : this.encodeInt(t);
};
e.encodeString = function(t) {
var e = this.strMap.get(t);
if (void 0 !== e) {
this.dw.writeInt8(99);
this.dw.write7BitInt(e);
} else {
this.dw.writeInt8(5);
this.dw.writeUTF(t);
this.strMap.set(t, this.strMap.size);
}
};
e.encodeBoolean = function(t) {
this.dw.writeInt8(6);
this.dw.writeInt8(t ? 1 : 0);
};
e.encodeNull = function() {
this.dw.writeInt8(0);
};
e.encodeDateTime = function(t) {
this.dw.writeInt8(10);
this.dw.writeInt64(t.getTime());
};
e.encodeBinary = function(t) {
this.dw.writeInt8(7);
this.dw.write7BitInt(t.byteLength);
this.dw.writeUint8Array(t);
};
e.encodeArray = function(t) {
this.dw.writeInt8(9);
this.dw.write7BitInt(t.length);
for (var e = t.length, i = 0; i < e; ++i) this.encode(t[i]);
};
e.encodeMap = function(t) {
var e = this;
this.dw.writeInt8(8);
this.dw.write7BitInt(t.size);
t.forEach(function(t, i) {
e.encode(i);
e.encode(t);
});
};
e.encodeObject = function(t) {
this.dw.writeInt8(8);
var e = [];
for (var i in t) if (!i.startsWith("$")) {
switch (typeof t[i]) {
case "function":
case "undefined":
continue;
}
e.push(i);
}
this.dw.write7BitInt(e.length);
for (var s = 0, r = e; s < r.length; s++) {
var n = r[s];
this.encode(n);
this.encode(t[n]);
}
};
e.encode = function(t) {
if (null != t) switch (t.constructor) {
case Number:
this.encodeNumber(t);
return;

case Boolean:
this.encodeBoolean(t);
return;

case String:
this.encodeString(t);
return;

case a:
this.encodeLong(t);
return;

case Array:
this.encodeArray(t);
return;

case Map:
this.encodeMap(t);
return;

case Date:
this.encodeDateTime(t);
return;

case Uint8Array:
this.encodeBinary(t);
return;

default:
if ("object" != typeof t) {
this.encodeNull();
return;
}
this.encodeObject(t);
} else this.encodeNull();
};
e.getBytes = function(t) {
void 0 === t && (t = !1);
return this.dw.getBytes(t);
};
return t;
}(), h = function() {
function t() {
this.dr = new s(null);
this.strArr = [];
}
var e = t.prototype;
e.reset = function(t) {
this.dr.reset(t);
this.strArr.length = 0;
};
e.decode = function() {
switch (this.dr.readUInt8()) {
default:
return null;

case 1:
return this.dr.readInt32();

case 2:
return this.dr.readInt64();

case 3:
return this.dr.readFloat32();

case 4:
return this.dr.readFloat64();

case 5:
var t = this.dr.readUTF();
this.strArr.push(t);
return t;

case 6:
return 1 == this.dr.readUInt8();

case 7:
return this.dr.readUint8Array(this.dr.read7BitInt(), !1);

case 8:
for (var e = this.dr.read7BitInt(), i = {}, s = 0; s < e; s++) {
var r = this.decode(), n = this.decode();
i[r] = n;
}
return i;

case 9:
e = this.dr.read7BitInt();
var o = new Array(e);
for (s = 0; s < e; s++) o[s] = this.decode();
return o;

case 10:
return new Date(this.dr.readInt64());

case 99:
return this.strArr[this.dr.read7BitInt()];
}
};
return t;
}(), c = new l(), m = new h();
try {
globalThis.bon = e;
} catch (t) {}
e.BonDecoder = h;
e.BonEncoder = l;
e.DataReader = s;
e.DataWriter = o;
e.Int64 = a;
e.decode = function(t) {
var e = m;
e.reset(t);
return e.decode();
};
e.encode = function(t, e) {
void 0 === e && (e = !0);
var i = c;
i.reset();
i.encode(t);
return i.getBytes(e);
};
},
3: function(t, e) {
"use strict";
t.a(e, "__esModule", {
value: !0
});
var i = t(4);
t(5);
var s = t(7);
function r(e) {
if (e && e.__esModule) return e;
var i = Object.create(null);
e && Object.keys(e).forEach(function(s) {
if ("default" !== s) {
var r = Object.getOwnPropertyDescriptor(e, s);
t.a(i, s, r.get ? r : {
enumerable: !0,
get: function() {
return e[s];
}
});
}
});
i.default = e;
return Object.freeze(i);
}
var n = r(s), o = "__mobx_render_dispose", a = "__mobx_render", l = "__mobx_render_list";
function h(e) {
var i = e[o];
if (!i) {
t.a(e, o, {
value: new Map(),
enumerable: !1
});
i = e[o];
}
return i;
}
function c(e, i, r) {
e.hasOwnProperty(l) || t.a(e, l, {
value: new Set(e[l]),
enumerable: !1
});
e[l].add(i);
if (!e[a]) {
e[a] = 1;
var n = e.onEnable;
t.a(e, "onEnable", {
value: function() {
var t = this, e = h(this);
this[l].forEach(function(i) {
var r = e.get(i);
r && r();
e.set(i, s.autorun(function() {
t[i]();
}));
});
n && n.call(this);
},
configurable: !0
});
var o = e.onDisable;
t.a(e, "onDisable", {
value: function() {
var t = h(this);
this[l].forEach(function(e) {
var i = t.get(e);
i && i();
t.delete(e);
});
o && o.call(this);
},
configurable: !0
});
}
return r;
}
(function() {
i.addStartBack(function(t) {
t.debug || s.configure({
disableErrorBoundaries: !0
});
return Promise.resolve();
});
s.decorate(i.DelegateBase, {
doReceiveMsg: s.action.bound
});
var e = s.observable.box(i.TimeUtil.syncServerTime);
t.a(i.TimeUtil, "syncServerTime", {
get: function() {
return e.get();
},
set: function(t) {
e.set(t);
}
});
s.decorate(i.TimeUtil, {
serverTime: s.computed
});
i.setIsArray(function(t) {
return Array.isArray(t) || s.isObservableArray(t);
});
i.setIsMap(function(t) {
return t && t.constructor === Map || s.isObservableMap(t);
});
})();
var m = Object.freeze(Object.assign(Object.create(null), n, {
render: c
}));
globalThis.o4e = Object.assign(globalThis.o4e || {}, m);
e.render = c;
Object.keys(s).forEach(function(i) {
"default" === i || e.hasOwnProperty(i) || t.a(e, i, {
enumerable: !0,
get: function() {
return s[i];
}
});
});
},
4: function(t, e) {
"use strict";
t.a(e, "__esModule", {
value: !0
});
t(5);
var i = t(9), s = t(2);
function r(t) {
return t && "object" == typeof t && "default" in t ? t : {
default: t
};
}
var n = r(i), o = {
rpc: {
connectTimeoutTotal: 1e4,
connectTimeoutOnce: 3e3,
connectRetryMinInterval: 1e3,
heartbeatInterval: 5e3,
heartbeatTimeout: 1e4,
httpTimeout: 0,
maxSendOnce: 10,
maxRecvOnce: 10,
networkState: function() {
return 1;
}
}
}, a = [];
function l(t) {
a.push(t);
}
function h(t) {
if (t) {
var e = Object.assign({}, o, t);
e.rpc = Object.assign(o.rpc, t.rpc);
Object.assign(o, e);
}
return a.reduce(function(t, e) {
return t.then(function() {
return e(o);
});
}, Promise.resolve());
}
var c = new TextEncoder(), m = new Uint8Array(100), u = 131;
function _(t) {
for (var e = 0, i = 0; i < t.length; i++) e = ~~(e * u + t[i]);
return 2147483647 & e;
}
function f(t) {
var e = 6 * t.length;
m.length < e && (m = new Uint8Array(e));
var i = c.encodeInto(t, m);
return _(m.subarray(0, i.written));
}
function d(t) {
return _(t.split("").map(function(t) {
return t.codePointAt(0);
}));
}
var p = n.default.compress, y = n.default.decompress, b = function(t) {
t = p(t);
for (var e = 2 + ~~(248 * Math.random()), i = Math.min(t.length, 100); --i >= 0; ) t[i] ^= e;
t[0] = 112;
t[1] = 108;
t[2] = 170 & t[2] | (e >> 7 & 1) << 6 | (e >> 6 & 1) << 4 | (e >> 5 & 1) << 2 | (e >> 4 & 1) << 0;
t[3] = 170 & t[3] | (e >> 3 & 1) << 6 | (e >> 2 & 1) << 4 | (e >> 1 & 1) << 2 | (e >> 0 & 1) << 0;
return t;
}, v = function(t) {
for (var e = (t[2] >> 6 & 1) << 7 | (t[2] >> 4 & 1) << 6 | (t[2] >> 2 & 1) << 5 | (t[2] >> 0 & 1) << 4 | (t[3] >> 6 & 1) << 3 | (t[3] >> 4 & 1) << 2 | (t[3] >> 2 & 1) << 1 | (t[3] >> 0 & 1) << 0, i = Math.min(100, t.length); --i >= 2; ) t[i] ^= e;
t[0] = 4;
t[1] = 34;
t[2] = 77;
t[3] = 24;
return y(t);
}, g = function() {
function t() {
this.states = {};
this.nextState = void 0;
}
var e = t.prototype;
e.register = function(t, e, i, s) {
this.registerState({
state: t,
enter: e,
exit: i,
update: s
});
};
e.registerState = function(t) {
this.states[t.state] = t;
};
e.changeStateNextFrame = function(t) {
this.nextState = t;
};
e.changeState = function(t) {
this.state && this.state.exit && this.state.exit();
this.preState = this.curState;
this.curState = t;
this.state = this.states[t];
this.firstUpdate = !0;
this.state && this.state.enter && this.state.enter();
};
e.update = function() {
if (void 0 !== this.nextState) {
this.changeState(this.nextState);
this.nextState = void 0;
}
this.state && this.state.update && this.state.update();
this.firstUpdate = !1;
};
return t;
}();
function S(t) {
return new Promise(function(e) {
setTimeout(e, t);
});
}
var x = 0, A = 0, B = !1, w = function() {
function e() {}
t.a(e, "serverTime", {
get: function() {
return e.syncServerTime + Date.now() - x;
},
set: function(t) {
if (t) {
e.lastServerTime = t;
if (!B) {
B = !0;
setInterval(function() {
A += 1e3;
Math.abs(A - e.serverTime) < 2e3 && (A = e.serverTime);
}, 1e3);
}
var i = e.serverTime;
if (e.syncServerTime > 0 && t < i && i - t < 1e3) A = i; else {
e.syncServerTime = t;
x = Date.now();
A = t;
}
}
},
enumerable: !1,
configurable: !0
});
t.a(e, "serverTimeIsValid", {
get: function() {
return e.syncServerTime > 0 && Math.abs(A - e.serverTime) < 1e4;
},
enumerable: !1,
configurable: !0
});
e.isServerTimeValidate = function() {
return e.serverTimeIsValid;
};
e.syncServerTime = 0;
e.lastServerTime = 0;
return e;
}(), C = new Uint8Array(524288), V = function(t, e) {
void 0 === e && (e = !0);
var i = ~~(4294967295 * Math.random()), s = t.byteLength + 4;
C.byteLength < s && (C = new Uint8Array(s));
var r = C.subarray(0, s);
r[0] = 255 & i;
r[1] = i >> 8 & 255;
r[2] = i >> 16 & 255;
r[3] = i >> 24 & 255;
r.set(t, 4);
for (var n = 2 + ~~(248 * Math.random()), o = r.length; --o >= 0; ) r[o] ^= n;
r[0] = 112;
r[1] = 120;
r[2] = 170 & r[2] | (n >> 7 & 1) << 6 | (n >> 6 & 1) << 4 | (n >> 5 & 1) << 2 | (n >> 4 & 1) << 0;
r[3] = 170 & r[3] | (n >> 3 & 1) << 6 | (n >> 2 & 1) << 4 | (n >> 1 & 1) << 2 | (n >> 0 & 1) << 0;
return e ? r.slice() : r;
}, M = function(t) {
for (var e = (t[2] >> 6 & 1) << 7 | (t[2] >> 4 & 1) << 6 | (t[2] >> 2 & 1) << 5 | (t[2] >> 0 & 1) << 4 | (t[3] >> 6 & 1) << 3 | (t[3] >> 4 & 1) << 2 | (t[3] >> 2 & 1) << 1 | (t[3] >> 0 & 1) << 0, i = t.length; --i >= 4; ) t[i] ^= e;
return t.subarray(4);
};
function P(t) {
return JSON.stringify(t, function(t, e) {
if (e instanceof Uint8Array) return "binary(" + e.length + ")";
if (e instanceof Map) {
var i = {};
e.forEach(function(t, e) {
i[e] = t;
});
return i;
}
return e;
});
}
e.HttpMethod = void 0;
(function(t) {
t.GET = "GET";
t.POST = "POST";
})(e.HttpMethod || (e.HttpMethod = {}));
e.HttpResponseType = void 0;
(function(t) {
t.TEXT = "text";
t.ARRAY_BUFFER = "arraybuffer";
})(e.HttpResponseType || (e.HttpResponseType = {}));
var I = function() {
function i() {
this.timeout = 0;
this.$responseType = e.HttpResponseType.ARRAY_BUFFER;
this.$url = "";
this.$method = "";
}
var s = i.prototype;
t.a(s, "response", {
get: function() {
return this.$xhr ? null != this.$xhr.response ? this.$xhr.response : "text" == this.$responseType ? this.$xhr.responseText : "arraybuffer" == this.$responseType && /msie 9.0/i.test(navigator.userAgent) ? globalThis.convertResponseBodyToText(this.$xhr.responseBody) : null : null;
},
enumerable: !1,
configurable: !0
});
t.a(s, "responseType", {
get: function() {
return this.$responseType;
},
set: function(t) {
this.$responseType = t;
},
enumerable: !1,
configurable: !0
});
t.a(s, "withCredentials", {
get: function() {
return this.$withCredentials;
},
set: function(t) {
this.$withCredentials = t;
},
enumerable: !1,
configurable: !0
});
s.open = function(t, i) {
var s = this;
void 0 === i && (i = e.HttpMethod.GET);
this.$url = t;
this.$method = i;
if (this.$xhr) {
this.$xhr.abort();
this.$xhr = null;
}
var r = new XMLHttpRequest();
r.addEventListener("load", this.onload.bind(this));
r.addEventListener("error", function(t) {
return s.onError(t && t.type);
});
r.ontimeout = function(t) {
return s.onError(t && t.type);
};
r.open(this.$method, this.$url, !0);
this.$xhr = r;
};
s.send = function(t) {
var e = this;
return new Promise(function(i, s) {
e.resolve = i;
e.reject = s;
null != e.$responseType && (e.$xhr.responseType = e.$responseType);
null != e.$withCredentials && (e.$xhr.withCredentials = e.$withCredentials);
if (e.headerObj) for (var r in e.headerObj) e.$xhr.setRequestHeader(r, e.headerObj[r]);
e.$xhr.timeout = e.timeout;
e.$xhr.send(t);
});
};
s.abort = function() {
this.$xhr && this.$xhr.abort();
};
s.getAllResponseHeaders = function() {
return this.$xhr ? this.$xhr.getAllResponseHeaders() || "" : null;
};
s.setRequestHeader = function(t, e) {
this.headerObj || (this.headerObj = {});
this.headerObj[t] = e;
};
s.getResponseHeader = function(t) {
return this.$xhr ? this.$xhr.getResponseHeader(t) || "" : null;
};
s.onload = function() {
this.$xhr.status >= 400 ? this.onError(this.$xhr.status + "") : this.onSuccess();
};
s.onSuccess = function() {
if (this.resolve) {
this.resolve(this.response);
this.resolve = null;
this.reject = null;
}
};
s.onError = function(t) {
if (this.reject) {
this.reject(t);
this.reject = null;
this.resolve = null;
}
};
return i;
}(), k = function(t, e) {
return (k = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
})(t, e);
};
function D(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
k(t, e);
function i() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
}
var T = function() {
function e() {}
var i = e.prototype;
t.a(i, "isEmpty", {
get: function() {
if (!this.listeners) return !0;
for (var t in this.listeners) if (this.listeners[t] && this.listeners[t].length > 0) return !1;
return !0;
},
enumerable: !1,
configurable: !0
});
i._on = function(t, e, i, s) {
var r = this.listeners || (this.listeners = {});
(r[t] || (r[t] = [])).push({
type: t,
listener: e,
thisObj: i,
once: s
});
};
i.on = function(t, e, i) {
this._on(t, e, i, !1);
};
i.once = function(t, e, i) {
this._on(t, e, i, !0);
};
i.off = function(t, e, i) {
var s = this.listeners && this.listeners[t];
if (s && 0 !== s.length) for (var r = s.length; --r >= 0; ) {
var n = s[r];
n && n.listener === e && n.thisObj === i && (s[r] = null);
}
};
i.emit = function(t, e) {
var i = this.listeners && this.listeners[t];
if (i && 0 !== i.length) for (var s, r = 0; r < i.length; r++) {
var n = i[r];
if (n) {
s || (s = {
target: n.thisObj,
type: t,
data: e
});
n.once && i.splice(r--, 1);
n.listener.call(n.thisObj, s);
if (s.cancel) break;
} else i.splice(r--, 1);
}
};
i.clear = function(t) {
t ? delete this.listeners[t] : this.listeners = void 0;
};
return e;
}(), G = "e_msg", R = "e_preconnect", L = "e_connected", F = function() {
function t() {
this.syncCommands = new Set([ "respsync" ]);
this.syncAllCommand = !0;
}
var e = t.prototype;
e.addSyncCommand = function(t) {
this.syncCommands.add(t.toLowerCase());
};
e.setRoot = function(t) {
this.root = t;
};
return t;
}(), E = new F(), O = function() {
function t() {
this.syncData = E;
this.events = new T();
}
t.prototype.doReceiveMsg = function(t) {
t.time && (w.serverTime = t.time);
var e = this.syncData;
if (e.root && (e.syncAllCommand || e.syncCommands.has(t.cmd))) for (var i in t.rawData) {
var s = e.root[i];
s && s.setValue && s.setValue(t.rawData[i]);
}
try {
this.events.emit(t.cmd, t);
this.events.emit(G, t);
} catch (t) {
console.error(t);
}
};
return t;
}(), j = new Map([ [ Number, "Number" ], [ String, "String" ], [ Boolean, "Bool" ], [ Date, "Date" ], [ Uint8Array, "Bytes" ], [ at, "Any" ] ]), q = "ti", N = new Map(), z = {
next: new Map()
};
function J(t) {
return N.get(t);
}
function U(t) {
return null == t ? X(at) : e.isArray(t) ? X(Array) : e.isMap(t) ? X(Map) : X(t.constructor);
}
var H = [ void 0 ];
function W(t) {
var e = t[q];
return e && e.ctor === t && e.ti;
}
function K(t, e) {
t[q] = {
ctor: t,
ti: e
};
}
function X(t) {
if (!Array.isArray(t)) {
if (t) {
var e = W(t);
if (e) return e;
}
H[0] = t;
t = H;
}
return $(t, 0);
}
function Z(t, e) {
var i = t.next.get(e);
if (!i) {
i = {
next: new Map()
};
t.next.set(e, i);
}
return i;
}
function $(t, e) {
if (!(e >= t.length)) {
var i = t[e] || Object, s = W(i);
if (s) return s;
var r = Z(z, i);
if (i === Map || i === Array) for (var n = e + 1, o = t.length; n < o; n++) r = Z(r, t[n]);
if (r.leaf) return r.leaf;
var a = r.leaf = new Y();
switch (i) {
case Number:
case String:
case Boolean:
case Date:
case Uint8Array:
case at:
a.ctor = r.ctor = i;
a.name = a.typeCode = j.get(i);
K(i, a);
break;

case Map:
a.ctor = r.ctor = Map;
a.typeCode = "Map";
a.eTypes = [ e + 1 >= t.length ? X(at) : $(t, e + 1), e + 2 >= t.length ? X(at) : $(t, e + 2) ];
a.name = "Map<" + a.eTypes[0].name + "," + a.eTypes[1].name + ">";
break;

case Array:
a.ctor = r.ctor = Array;
a.typeCode = "Array";
a.eTypes = [ e + 1 >= t.length ? X(at) : $(t, e + 1) ];
a.name = "Array<" + a.eTypes[0].name + ">";
break;

default:
a.ctor = r.ctor = i;
a.typeCode = "Object";
if (i !== Object) {
a.base = X(Object.getPrototypeOf(r.ctor.prototype).constructor);
if ("Object" === a.typeCode && a.base && "Class" === a.base.typeCode) {
ot(i);
a.typeCode = "Class";
}
}
a.name = i.name;
K(i, a);
}
N.set(a.name, a);
return r.leaf;
}
}
var Y = function() {
function t() {}
var e = t.prototype;
e.addProp = function(t) {
this.ownProperties || (this.ownProperties = new Map());
this.ownProperties.set(t.name, t);
this.allPropertiesList = void 0;
this.allPropertiesMap = void 0;
};
e.getOwnProp = function(t) {
var e;
return null === (e = this.ownProperties) || void 0 === e ? void 0 : e.get(t);
};
e.hasOwnProp = function(t) {
var e;
return null === (e = this.ownProperties) || void 0 === e ? void 0 : e.has(t);
};
e.createInstance = function() {
switch (this.typeCode) {
case "Bool":
return !1;

case "String":
return "";

case "Array":
case "Class":
case "Map":
case "Object":
return new this.ctor();

case "Date":
return new Date(0);

case "Number":
return 0;

default:
return;
}
};
e.ensureAll = function() {
var t;
if (!this.allPropertiesMap) {
var e = this.allPropertiesMap = new Map();
this.base && this.base.getAllProps().forEach(function(t) {
e.set(t.name, t);
});
null === (t = this.ownProperties) || void 0 === t || t.forEach(function(t) {
e.set(t.name, t);
});
}
};
e.getProp = function(t) {
this.ensureAll();
return this.allPropertiesMap.get(t);
};
e.getAllProps = function() {
var t = this.allPropertiesList;
if (t) return t;
this.ensureAll();
this.allPropertiesList = t = [];
this.allPropertiesMap.forEach(function(e) {
return t.push(e);
});
return t;
};
return t;
}(), Q = function() {};
function tt(t) {
return function(e, i) {
var s = it(e.constructor), r = new Q();
r.name = i;
r.type = X(t);
s.addProp(r);
};
}
function et(t, e) {
switch (t) {
case 1:
return tt(e);

case 2:
return tt(lt(e || at));

case 3:
return tt(ht(Number, e || at));

case 5:
return tt(ht(String, e || at));

case 4:
return tt(Date);

default:
return tt(at);
}
}
function it(t) {
var e = X(t);
e.typeCode = "Class";
return e;
}
function st(t) {
return function(e) {
var i = it(e);
if (t) {
e._className = i.name = t;
N.set(t, i);
}
};
}
var rt = new Set([ Object ]);
function nt(t) {
var e;
if (t && !rt.has(t)) {
rt.add(t);
var i = it(t);
nt(null === (e = i.base) || void 0 === e ? void 0 : e.ctor);
var s = new t();
Object.keys(s).filter(function(t) {
return !t.startsWith("$") && !t.startsWith("_");
}).forEach(function(t) {
if (!i.getProp(t)) {
var e = new Q();
e.name = t;
e.type = U(s[t]);
i.addProp(e);
}
});
}
}
function ot(t) {
if (void 0 === t) return function(t) {
nt(t);
};
Array.isArray(t) ? t.forEach(function(t) {
nt(t);
}) : nt(t);
}
function at() {}
function lt(t) {
return Array.isArray(t) ? [ Array ].concat(t) : [ Array, t ];
}
function ht(t, e) {
return Array.isArray(e) ? [ Map, t ].concat(e) : [ Map, t, e ];
}
e.isArray = Array.isArray;
function ct(t) {
e.isArray = t;
}
e.isMap = function(t) {
return t.constructor === Map;
};
function mt(t) {
e.isMap = t;
}
var ut = function() {
function t() {}
var e = t.prototype;
e.toJSON = function() {
return _t(this);
};
e.reset = function() {
ft(this);
};
e.setValue = function(t) {
dt(t, this, U(this));
};
e.setHistoryValue = function(t, e) {
this.$history || (this.$history = new Map());
this.$history.set(t, e);
};
return t;
}();
function _t(t) {
var e = U(t);
switch (e.typeCode) {
default:
return t;

case "Date":
return t.getTime();

case "Array":
var i = [];
t.forEach(function(t) {
i.push(_t(t));
});
return i;

case "Map":
var s = {};
t.forEach(function(t, e) {
s[e + ""] = _t(t);
});
return s;

case "Object":
var r = {};
Object.keys(t).forEach(function(e) {
r[e] = _t(t[e]);
});
return r;

case "Class":
var n = {};
Object.keys(t).forEach(function(i) {
e.getProp(i) && (n[i] = _t(t[i]));
});
return n;
}
}
function ft(t) {
var e = U(t);
switch (e.typeCode) {
default:
return e.createInstance();

case "Map":
t.clear();
return t;

case "Array":
t.length = 0;
return t;

case "Date":
t.setTime(0);
return t;

case "Object":
Object.keys(t).forEach(function(e) {
delete t[e];
});
return t;

case "Class":
e.getAllProps().forEach(function(e) {
var i = t[e.name];
t[e.name] = i ? ft(i) : e.type.createInstance();
});
return t;
}
}
function dt(t, e, i) {
var s;
for (var r in t) {
var n = t[r], o = i.getProp(r);
if (o) {
var a = e[r];
o.recordFlag && (null === (s = e.setHistoryValue) || void 0 === s || s.call(e, r, a));
e[r] = pt(n, a, o.type);
}
}
}
function pt(t, i, s) {
s || (s = U(i));
switch (s.typeCode) {
case "Number":
return +t || 0;

case "Bool":
return !!t;

case "String":
return t + "";

case "Bytes":
return t instanceof Uint8Array ? t : void 0;

case "Date":
return "number" == typeof t ? new Date(t) : t instanceof Date ? t : Array.isArray(t) ? new Date(1e3 * t[0] + t[1] / 1e6) : new Date(0);

case "Array":
if (!Array.isArray(t)) return [];
var r = [], n = s.eTypes[0];
t.forEach(function(t) {
r.push(pt(t, void 0, n));
});
return r;

case "Map":
if (!t) {
if (i && i.constructor === Map) {
i.clear();
return i;
}
return new Map();
}
(c = i) && e.isMap(c) || (c = new Map());
var o = s.eTypes[0], a = s.eTypes[1];
for (var l in t) {
var h = t[l];
l = pt(l, void 0, o);
null == h ? c.delete(l) : c.set(l, pt(h, c.get(l), a));
}
return c;

case "Class":
if (!t) return i ? ft(i) : s.createInstance();
(c = i) && c.constructor === s.ctor ? s.key && t[s.key] && c[s.key] !== t[s.key] && ft(c) : c = new s.ctor();
if ("function" == typeof c.setValue) {
c.setValue(t);
return c;
}
dt(t, c, s);
return c;

case "Object":
if (!t) return s.createInstance();
var c;
(c = i) || (c = new s.ctor());
for (var l in t) c[l] = pt(t[l], c[l]);
return c;

case "Any":
if (null == i) return t;
var m = U(t), u = U(i);
return m.typeCode === u.typeCode || "Object" === m.typeCode && ("Class" === u.typeCode || "Map" == u.typeCode) ? pt(t, i) : t;

default:
return;
}
}
function yt(t) {
return function(e, i) {
var s = X(e.constructor).getOwnProp(i);
s && (s.recordFlag = t);
};
}
function bt(t) {
return function(e) {
X(e).key = t;
};
}
var vt = function() {};
function gt(t, e) {
var i;
return o.debug ? (i = console[t]).bind.apply(i, [ console ].concat(e())) : vt;
}
function St(t) {
return gt("debug", t);
}
var xt = function() {
function e(t) {
this.rtt = 0;
t.cmd = t.cmd && t.cmd.toLowerCase();
this._raw = t;
}
var i = e.prototype;
t.a(i, "seq", {
get: function() {
return this._raw.seq;
},
enumerable: !1,
configurable: !0
});
t.a(i, "resp", {
get: function() {
return this._raw.resp;
},
enumerable: !1,
configurable: !0
});
t.a(i, "ack", {
get: function() {
return this._raw.ack;
},
enumerable: !1,
configurable: !0
});
t.a(i, "cmd", {
get: function() {
return this._raw.cmd && this._raw.cmd.toLowerCase();
},
enumerable: !1,
configurable: !0
});
t.a(i, "code", {
get: function() {
return ~~this._raw.code;
},
enumerable: !1,
configurable: !0
});
t.a(i, "error", {
get: function() {
return this._raw.error;
},
enumerable: !1,
configurable: !0
});
t.a(i, "time", {
get: function() {
return this._raw.time;
},
enumerable: !1,
configurable: !0
});
t.a(i, "body", {
get: function() {
return this._raw.body;
},
enumerable: !1,
configurable: !0
});
t.a(i, "rawData", {
get: function() {
return void 0 !== this._rawData || void 0 === this.body ? this._rawData : this._rawData = s.decode(this.body);
},
enumerable: !1,
configurable: !0
});
i.setDataType = function(t) {
this._t = t && X(t);
return this;
};
i.getData = function(t) {
if (void 0 !== this._data || void 0 === this.rawData) return this._data;
var e = this._t;
t || e || console.error("没有设置响应数据类型");
if (t && e && t.constructor != e.ctor) {
var i = U(t);
gt("error", function() {
return [ "getData type not match, " + i.name + " != " + e.name ];
})();
e = i;
}
this._data = pt(this.rawData, t, e);
return this._data;
};
i.toLogString = function() {
var t = Object.assign({}, this._raw);
delete t.body;
t.data = this.rawData;
t.rtt = this.rtt;
return P(t);
};
return e;
}();
e.Encoding = void 0;
(function(t) {
t.LX = "lx";
t.X = "x";
t.XTM = "xtm";
t.NULL = "";
})(e.Encoding || (e.Encoding = {}));
var At = globalThis.XXTEA && new globalThis.XXTEA();
function Bt(t, i) {
for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
var o = s.encode(t, !1);
switch (i) {
case e.Encoding.LX:
o = b(o);
break;

case e.Encoding.X:
o = V(o, !1);
break;

case e.Encoding.XTM:
if (At) return At.encryptMod({
data: o.buffer,
length: o.byteLength
});
}
return o.buffer.slice(0, o.byteLength);
}
function wt(t, i) {
for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
var o = new Uint8Array(t);
if (i === e.Encoding.LX || o.length > 4 && 112 == o[0] && 108 == o[1]) o = v(o); else if (i === e.Encoding.X || o.length > 4 && 112 == o[0] && 120 == o[1]) o = M(o); else if ((i === e.Encoding.XTM || o.length > 3 && 112 == o[0] && 116 == o[1]) && At) {
var a = At.decryptMod({
data: o.buffer,
length: o.byteLength
});
o = new Uint8Array(a);
}
return new xt(s.decode(o));
}
e.ErrorCode = void 0;
(function(t) {
t[t.TIMEOUT = -2] = "TIMEOUT";
t[t.UNKNOWN = -1] = "UNKNOWN";
t[t.NEED_AUTH = -3] = "NEED_AUTH";
t[t.AUTH_ERROR = -4] = "AUTH_ERROR";
t[t.CANCELED = -5] = "CANCELED";
t[t.SKIP = 6] = "SKIP";
})(e.ErrorCode || (e.ErrorCode = {}));
var Ct = function(i) {
D(s, i);
function s() {
var t = i.call(this) || this;
t.seq = 0;
t.defaultHeaders = {
"O4e-Encoding": e.Encoding.LX,
"Content-Type": "application/octet-stream",
"content-type": "application/octet-stream"
};
s.current = t;
return t;
}
var r = s.prototype;
t.a(r, "token", {
get: function() {
return this.defaultHeaders["O4e-Token"];
},
set: function(t) {
this.defaultHeaders["O4e-Token"] = t;
},
enumerable: !1,
configurable: !0
});
t.a(r, "encoding", {
get: function() {
return this.defaultHeaders["O4e-Encoding"];
},
set: function(t) {
this.defaultHeaders["O4e-Encoding"] = t;
},
enumerable: !1,
configurable: !0
});
t.a(r, "version", {
get: function() {
return this.defaultHeaders["O4e-Version"];
},
set: function(t) {
this.defaultHeaders["O4e-Version"] = t;
},
enumerable: !1,
configurable: !0
});
r.onSendError = function(t) {
console.error(t);
St(function() {
return [ "%c<<<< http recieve error: " + t, "color:#00afaf;font-weight:bold;" ];
})();
var i = new xt({
code: e.ErrorCode.UNKNOWN,
error: t || "unkown"
});
this.doReceiveMsg(i);
return i;
};
r.sendAsync = function(t) {
var i = this;
return new Promise(function(s) {
try {
St(function() {
return [ "%c>>>> http send: " + P(t), "color:#00af00;font-weight:bold;" ];
})();
var r = i._url || o.url, n = new I();
n.responseType = e.HttpResponseType.ARRAY_BUFFER;
for (var a in i.defaultHeaders) i.defaultHeaders[a] && n.setRequestHeader(a, i.defaultHeaders[a]);
if (t.headers) for (var a in t.headers) t.headers[a] && n.setRequestHeader(a, t.headers[a]);
var l = ++i.seq, h = r + "/" + t.cmd.replace("_", "/").toLowerCase() + "?_seq=" + l;
t.hint && (h += "&_hint=" + t.hint);
i.lang && (h += "&_lang=" + i.lang);
var c = Bt(t.params, i.encoding);
n.open(h, e.HttpMethod.POST);
var m = t.timeout || o.rpc.httpTimeout;
m && (n.timeout = m);
var u = Date.now();
n.send(c).then(function() {
var e, r, o = Date.now() - u, a = wt(n.response, i.encoding);
(e = "_resppak" == a.cmd ? a.rawData.map(function(t) {
return new xt(t);
}) : [ a ]).forEach(function(e) {
e.rtt = o;
e.resp && (r = e).setDataType(t.respType);
St(function() {
return [ "%c<<<< http recieve: " + e.toLogString(), "color:#00afaf;font-weight:bold;" ];
})();
i.doReceiveMsg(e);
});
r || (r = e[0]).setDataType(t.respType);
s(r);
}).catch(function(t) {
s(i.onSendError(t));
});
} catch (t) {
s(i.onSendError(t));
}
});
};
return s;
}(O), Vt = function() {
function e(t, e) {
var i = this;
this.raw = t;
this.frameSize = +e;
this.offset = -1;
if (this.frameSize > 0) {
this.header = new DataView(new ArrayBuffer(8));
this.header.setUint32(0, 1836213824, !0);
}
t.onmessage = function(t) {
return i.onMsg(t);
};
}
var i = e.prototype;
t.a(i, "readyState", {
get: function() {
return this.raw.readyState;
},
enumerable: !1,
configurable: !0
});
t.a(i, "binaryType", {
get: function() {
return this.raw.binaryType;
},
set: function(t) {
this.raw.binaryType = t;
},
enumerable: !1,
configurable: !0
});
t.a(i, "onopen", {
get: function() {
return this.raw.onopen;
},
set: function(t) {
this.raw.onopen = t;
},
enumerable: !1,
configurable: !0
});
t.a(i, "onclose", {
get: function() {
return this.raw.onclose;
},
set: function(t) {
this.raw.onclose = t;
},
enumerable: !1,
configurable: !0
});
t.a(i, "onerror", {
get: function() {
return this.raw.onerror;
},
set: function(t) {
this.raw.onerror = t;
},
enumerable: !1,
configurable: !0
});
i.getU32 = function(t) {
return t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24;
};
i.onMsg = function(t) {
var e = new Uint8Array(t.data);
if (this.frameSize <= 0) this.onmessage && this.onmessage(t); else {
if (this.offset < 0 && e.length >= 8 && 1836213824 === this.getU32(e)) {
var i = this.getU32(e.subarray(4));
this.buffer = new Uint8Array(i);
e = e.subarray(8);
this.offset = 0;
}
if (this.offset < 0) this.onmessage && this.onmessage(t); else {
this.buffer.set(e, this.offset);
this.offset += e.length;
var s = this.buffer.length;
if (this.offset < this.buffer.length) this.onframe && this.onframe({
total: s,
loaded: this.offset
}); else if (this.offset != this.buffer.length) {
this.buffer = void 0;
this.offset = -1;
this.onerror && this.onerror(new Event("merge msg error"));
} else {
e = this.buffer;
this.buffer = void 0;
this.offset = -1;
this.onmessage && this.onmessage({
data: e.buffer
});
}
}
}
};
i.send = function(t) {
var e = t.byteLength;
if (this.frameSize <= 0 || e <= this.frameSize) this.raw.send(t); else {
this.header.setUint32(4, e, !0);
this.raw.send(this.header.buffer);
for (var i = 0; i < e; ) {
var s = Math.min(e, i + this.frameSize);
this.raw.send(t.slice(i, s));
i = s;
}
}
};
i.close = function() {
this.raw.close();
};
return e;
}(), Mt = globalThis.requestAnimationFrame || function(t) {
return setTimeout(t, 10);
};
e.WebSocketClientState = void 0;
(function(t) {
t[t.Idle = 0] = "Idle";
t[t.Connecting = 1] = "Connecting";
t[t.Running = 2] = "Running";
t[t.Reconnecting = 3] = "Reconnecting";
t[t.Error = 4] = "Error";
})(e.WebSocketClientState || (e.WebSocketClientState = {}));
var Pt = function() {
function e() {
this._arr = [];
this._idx = 0;
this.seq = 0;
}
var i = e.prototype;
t.a(i, "length", {
get: function() {
return this._arr.length - this._idx;
},
enumerable: !1,
configurable: !0
});
i.enqueue = function(t) {
this._arr.push(t);
};
i.dequeue = function() {
if (!(this._idx >= this._arr.length)) return this._arr[this._idx++];
};
i.confirm = function(t) {
var e = this._arr.length - this.seq + t - 1;
e >= this._idx && (e = this._idx - 1);
if (!(e < 0)) {
this._arr.splice(0, e + 1);
this._idx -= e + 1;
}
};
i.restore = function() {
this._idx = 0;
};
return e;
}(), It = function() {
function e() {
this._arr = [];
this._seq = 0;
}
var i = e.prototype;
t.a(i, "seq", {
get: function() {
return this._seq;
},
enumerable: !1,
configurable: !0
});
t.a(i, "length", {
get: function() {
return this._arr.length;
},
enumerable: !1,
configurable: !0
});
i.enqueue = function(t) {
if (~~t.seq > 0) {
if (t.seq <= this._seq) return;
if (t.seq > this._seq + 1) throw new Error("over seq: " + t);
this._seq = t.seq;
}
this._arr.push(t);
};
i.dequeue = function() {
if (0 !== this._arr.length) return this._arr.shift();
};
return e;
}(), kt = function() {
function e() {
this._last = this._now = Date.now();
}
var i = e.prototype;
i.update = function() {
var t = Date.now();
this._now += Math.max(8, Math.min(t - this._last, 100));
this._last = t;
};
t.a(i, "now", {
get: function() {
return this._now;
},
enumerable: !1,
configurable: !0
});
return e;
}();
function Dt(t, e) {
try {
t.resolve(e);
} catch (t) {
console.error(t);
}
}
var Tt = new ArrayBuffer(1), Gt = {}, Rt = {}, Lt = {
sid: "sid",
sid2: "sid2",
lang: "lang",
frameSize: "fs"
}, Ft = function() {
function i() {
var t = this;
this._destroyed = !1;
this._sendData = {};
this.events = new T();
globalThis.ws = this;
this.networkState = o.rpc.networkState;
this._sm = new g();
this._sm.registerState({
state: e.WebSocketClientState.Running,
enter: function() {
return t.onRunningEnter();
},
update: function() {
return t.onRunningUpdate();
}
});
this._sm.registerState({
state: e.WebSocketClientState.Connecting,
enter: function() {
return t.onConnectingEnter();
},
update: function() {
return t.onConnectingUpdate();
}
});
this._sm.registerState({
state: e.WebSocketClientState.Reconnecting,
enter: function() {
return t.onReconnectingEnter();
},
update: function() {
return t.onReconnectingUpdate();
}
});
this._sm.registerState({
state: e.WebSocketClientState.Error,
enter: function() {
return t.onErrorEnter();
}
});
this._sm.changeState(e.WebSocketClientState.Idle);
this._frameTimer = new kt();
this.reset();
Mt(function() {
return t.update();
});
}
var r = i.prototype;
t.a(r, "isDirect", {
get: function() {
return this.connectOptions && !!this.connectOptions.sid;
},
enumerable: !1,
configurable: !0
});
t.a(r, "connected", {
get: function() {
return this._sm.curState == e.WebSocketClientState.Running;
},
enumerable: !1,
configurable: !0
});
t.a(r, "connectionState", {
get: function() {
return this._sm.curState;
},
enumerable: !1,
configurable: !0
});
r.resetSendData = function() {
var t = this._sendData;
for (var e in t) t[e] = void 0;
return t;
};
r.reset = function() {
if (!this._destroyed) {
this.cleanData();
this.events.emit("e_closed");
this._sm.changeState(e.WebSocketClientState.Idle);
}
};
r.destroy = function() {
this._destroyed = !0;
this.cleanData();
this.events.emit("e_closed");
this.events.clear();
};
r.getAndUseAck = function() {
var t = this._ack;
this._ack = 0;
return t;
};
r.connect = function(t) {
var i = this;
if (this._sm.curState != e.WebSocketClientState.Idle) throw new Error("state error");
this.connectOptions = t;
this._url = t.url || o.url.replace("http://", "ws://").replace("https://", "wss://") + "/agent";
this._connParam.roleToken = t.token;
this._connParam.version = t.version;
var s = new Promise(function(t) {
i._connResolve = t;
});
this._sm.changeStateNextFrame(e.WebSocketClientState.Connecting);
return s;
};
r.onConnectingEnter = function() {
St(function() {
return [ "~~~~~~~~~onConnectingEnter" ];
})();
this.cleanWS();
this._tryConnectTimeoutTotal = this._frameTimer.now + o.rpc.connectTimeoutTotal;
this._tryConnectTimeoutOnce = -1;
this._ws = void 0;
this._connParam.isRestore = 0;
this._nextTryConnectTime = 1;
this._tryConnectTimes = 0;
};
r.onConnectingUpdate = function() {
this.tryConnect();
};
r.tryConnect = function() {
var t = this, i = this._frameTimer.now;
if (this._tryConnectTimeoutTotal > 0 && i > this._tryConnectTimeoutTotal) {
this._tryConnectTimeoutTotal = -1;
this.closeReason = {
code: e.ErrorCode.TIMEOUT,
error: "connect timeout"
};
this._sm.changeState(e.WebSocketClientState.Error);
} else if (0 !== this.networkState()) {
if (this._tryConnectTimeoutOnce > 0 && i > this._tryConnectTimeoutOnce) {
this._tryConnectTimeoutOnce = -1;
this.cleanWS();
this._nextTryConnectTime = i + 100;
this._ws = void 0;
}
if (this._nextTryConnectTime > 0 && i > this._nextTryConnectTime) {
this._tryConnectTimes++;
this._nextTryConnectTime = -1;
this._tryConnectTimeoutOnce = i + o.rpc.connectTimeoutOnce;
this.cleanWS();
this._connParam.connId = Date.now();
var s = JSON.stringify(this._connParam), r = this.connectOptions, n = this._url + "?p=" + encodeURIComponent(s) + "&e=" + r.encoding;
this._connParam.isRestore && (n += "&ack=" + this._recQueue.seq);
for (var a in Lt) {
var l = r[a];
l && (n += "&" + Lt[a] + "=" + encodeURIComponent(l));
}
this._tryConnectTimes > 1 && (n += "&perMessageDeflate=0");
var h = (void 0 !== r.useKcp ? r.useKcp : o.rpc.useKcp) && this._tryConnectTimes < 2 && globalThis.KcpConnection;
Gt.use = h ? "kcp" : "ws";
Gt.url = n;
Gt.times = this._tryConnectTimes;
try {
this.events.emit(R, Gt);
n = Gt.url;
} catch (t) {
console.error(t);
}
var c = (h = "kcp" === Gt.use) && new globalThis.KcpConnection(n) || new WebSocket(n);
c.binaryType = "arraybuffer";
this.use = Gt.use;
gt("log", function() {
return [ "use " + Gt.use ];
})();
+this.connectOptions.frameSize > 0 && ((c = new Vt(c, this.connectOptions.frameSize)).onframe = function() {
t._ws === c && t.resetConnectionTimeout();
});
this._ws = c;
c.onopen = function() {
c !== t._ws || t._sm.curState != e.WebSocketClientState.Connecting && t._sm.curState != e.WebSocketClientState.Reconnecting || t._sm.changeState(e.WebSocketClientState.Running);
};
c.onclose = c.onerror = function() {
c === t._ws && (t._nextTryConnectTime = Math.max(t._frameTimer.now + 100, i + o.rpc.connectRetryMinInterval));
};
c.onmessage = function(e) {
c === t._ws && t.addResp(e.data);
};
}
}
};
r.send = function(t) {
var i = this;
if (this._destroyed || this._sm.curState == e.WebSocketClientState.Error) return null;
var r = this.resetSendData();
r.ack = this.getAndUseAck();
r.body = s.encode(t.params);
r.c = t.c;
r.c || (r.cmd = t.cmd);
r.hint = t.hint;
r.seq = ++this._sndQueue.seq;
r.time = Date.now();
if (o.debug) {
var n = Object.assign({}, r);
delete n.body;
n.data = t.params;
n.cmd = t.cmd;
St(function() {
return [ "%c>>>> " + i.use + " send: " + P(n), "color:#00af00;font-weight:bold;" ];
})();
}
var a = Bt(r, this.connectOptions.encoding);
r.cmd = t.cmd;
this._sndQueue.enqueue(a);
this._sm.curState === e.WebSocketClientState.Running && this.onRunningUpdate();
return r;
};
r.sendAsync = function(t) {
var i = this.send(t);
if (!i) return Promise.resolve({
code: e.ErrorCode.CANCELED,
error: "offline"
});
var s = t;
s.seq = i.seq;
s.time = i.time;
var r = new Promise(function(t) {
return s.resolve = t;
});
this._asyncList.push(s);
return r;
};
r.update = function() {
var t = this;
if (!this._destroyed) {
this._frameTimer.update();
this._sm.update();
Mt(function() {
return t.update();
});
}
};
r.resetHeartbeatTime = function() {
var t = Date.now();
this._nextHeartbeatTime = t + o.rpc.heartbeatInterval;
};
r.resetConnectionTimeout = function() {
var t = this._frameTimer.now;
this._connectionTimeout = t + o.rpc.heartbeatTimeout;
};
r.onRunningEnter = function() {
var t = this;
St(function() {
return [ "~~~~~~~~~onRunningEnter" ];
})();
this.lastNetworkState = this.networkState();
Rt.use = Gt.use;
Rt.url = Gt.url;
try {
this.events.emit(L, Rt);
} catch (t) {
console.error(t);
}
if (this._connResolve) {
this._connResolve(!0);
this._connResolve = void 0;
}
this._sndQueue.restore();
this.resetHeartbeatTime();
this.resetConnectionTimeout();
var e = this._ws;
e.onmessage = function(i) {
e === t._ws && t.addResp(i.data);
};
e.onerror = e.onclose = function() {
e === t._ws && t.changeStateOnError();
};
};
r.addResp = function(t) {
this.resetConnectionTimeout();
try {
if (t.byteLength <= 1) return;
var i = wt(t, this.connectOptions.encoding);
~~i.ack > 0 && this._sndQueue.confirm(~~i.ack);
~~i.seq > this._recQueue.seq && (this._ack = i.seq);
switch (i.cmd) {
case "_sys/error":
if (i.error) console.error(i.error); else try {
console.error(s.decode(i.body));
} catch (t) {}
this.changeStateOnError();
return;

case "_sys/fatal":
if (i.error) console.error(i.error); else try {
console.error(s.decode(i.body));
} catch (t) {}
this.closeReason = i;
this._sm.changeState(e.WebSocketClientState.Error);
return;

default:
this._recQueue.enqueue(i);
this._sm.curState === e.WebSocketClientState.Running && this.onRunningUpdate();
return;
}
} catch (t) {
console.error(t);
this.changeStateOnError();
}
};
r.onRunningUpdate = function() {
var t = Date.now(), i = this._sm;
if (this._frameTimer.now > this._connectionTimeout) this.changeStateOnError(); else {
var s = this.networkState();
if (s != this.lastNetworkState) {
this.lastNetworkState = s;
if (s > 0) {
this._sm.changeState(e.WebSocketClientState.Reconnecting);
return;
}
}
var r = o.rpc;
if (s > 0) {
t > this._nextHeartbeatTime && this.sendHeartbeat();
for (var n = r.maxSendOnce || 100; this._sndQueue.length > 0 && void 0 === i.nextState && n-- > 0; ) this.doSend(this._sndQueue.dequeue());
}
for (var a = r.maxRecvOnce || 100; this._recQueue.length > 0 && void 0 === i.nextState && a-- > 0; ) {
var l = this._recQueue.dequeue();
this.doReceive(l);
}
}
};
r.sendHeartbeat = function() {
this.resetHeartbeatTime();
var t = this.getAndUseAck();
St(function() {
return [ "~~~~~~~~~sendHeartbeat", t ];
})();
if (0 == t) this.doSend(Tt); else {
var e = this.resetSendData();
e.ack = t;
e.cmd = "_sys/ack";
e.time = Date.now();
this.doSend(Bt(e, this.connectOptions.encoding));
}
};
r.doSend = function(t) {
var e = this._ws;
if (1 == e.readyState) try {
e.send(t);
} catch (t) {
this.changeStateOnError();
console.error(t);
} else this.changeStateOnError();
};
r.doReceive = function(t) {
var i = this, s = this._sm, r = Date.now();
try {
var n = this._asyncList, o = -1;
if (~~t.resp > 0) for (var a = 0, l = n.length; a < l; a++) {
var h = n[a];
if (t.resp === h.seq) {
t.rtt = r - h.time;
t.setDataType(h.respType);
o = a;
break;
}
if (t.resp < h.seq) break;
}
St(function() {
return [ "%c<<<< " + i.use + " recieve: " + t.toLogString(), "color:#00afaf;font-weight:bold;" ];
})();
try {
this.events.emit(t.cmd, t);
} catch (t) {
console.error(t);
}
try {
this.events.emit(G, t);
} catch (t) {
console.error(t);
}
if (o >= 0) {
if (o > 0) for (a = 0; a < o; a++) {
h = n[a];
console.warn(h.cmd + " has no response, use send instead");
Dt(h, {
code: e.ErrorCode.SKIP,
error: "skip"
});
}
Dt(n[o], t);
n.splice(0, o + 1);
}
if (t.code < 0) {
this.closeReason = t;
s.changeStateNextFrame(e.WebSocketClientState.Error);
return;
}
} catch (t) {
console.error(t);
this.closeReason = {
code: e.ErrorCode.UNKNOWN,
error: t || "unkown"
};
s.changeStateNextFrame(e.WebSocketClientState.Error);
}
};
r.onReconnectingEnter = function() {
St(function() {
return [ "~~~~~~~~~onReconnectingEnter" ];
})();
this.cleanWS();
this._tryConnectTimeoutTotal = this._frameTimer.now + o.rpc.connectTimeoutTotal;
this._tryConnectTimeoutOnce = -1;
this._connParam.isRestore = 1;
this._nextTryConnectTime = 1;
this._tryConnectTimes = 0;
};
r.onReconnectingUpdate = function() {
this.tryConnect();
};
r.changeStateOnError = function() {
this._sm.changeStateNextFrame(this.isDirect ? e.WebSocketClientState.Error : e.WebSocketClientState.Reconnecting);
};
r.cleanWS = function() {
if (this._ws) {
this._ws.onerror = this._ws.onclose = this._ws.onmessage = this._ws.onopen = this._ws.onframe = void 0;
this._ws.close();
this._ws = void 0;
}
};
r.cleanData = function() {
this.cleanWS();
if (this._connResolve) {
this._connResolve(!1);
this._connResolve = void 0;
}
this._sndQueue = new Pt();
this._asyncList && this._asyncList.forEach(function(t) {
t.resolve({
code: e.ErrorCode.CANCELED,
error: "canceled"
});
});
this._asyncList = [];
this._recQueue = new It();
this._connParam = {
roleToken: "",
sessId: 100 * Date.now() + ~~(100 * Math.random()),
connId: 0,
isRestore: 0
};
this._ack = 0;
};
r.onErrorEnter = function() {
St(function() {
return [ "~~~~~~~~~onErrorEnter" ];
})();
this.cleanData();
this.events.emit("e_closed", this.closeReason);
this.closeReason = void 0;
};
r.interrupt = function() {
this._sm.curState === e.WebSocketClientState.Running && this._sm.changeState(e.WebSocketClientState.Reconnecting);
};
return i;
}(), Et = function(i) {
D(s, i);
function s(t) {
var e = i.call(this) || this;
t || (s.current = e);
return e;
}
var r = s.prototype;
r.connect = function(t) {
var e = this;
this.close();
this.socket = new Ft();
this.socket.events.on(G, this.onReceiveMsg, this);
this.socket.events.once("e_closed", function(t) {
e.events.emit("e_closed", t.data);
});
this.socket.events.on(R, function(t) {
e.events.emit(R, t.data);
});
this.socket.events.on(L, function(t) {
e.events.emit(L, t.data);
});
return this.socket.connect(t);
};
t.a(r, "connected", {
get: function() {
return this.socket && this.socket.connected;
},
enumerable: !1,
configurable: !0
});
t.a(r, "connectionState", {
get: function() {
return this.socket ? this.socket.connectionState : e.WebSocketClientState.Idle;
},
enumerable: !1,
configurable: !0
});
r.close = function() {
this.socket && this.socket.destroy();
};
r.send = function(t) {
this.socket.send(t);
};
r.sendAsync = function(t) {
return this.socket.sendAsync(t);
};
r.onReceiveMsg = function(t) {
this.doReceiveMsg(t.data);
};
r.interrupt = function() {
var t;
null === (t = this.socket) || void 0 === t || t.interrupt();
};
return s;
}(O), Ot = function(e) {
D(i, e);
function i(t) {
var s = e.call(this) || this;
i.ins && i.ins.close();
i.ins = s;
Et.current = s;
s.options = t;
s.socket = new Ft();
s.socket.events.on(G, s.onReceiveMsg, s);
s.socket.events.on(R, function(t) {
s.events.emit(R, t.data);
});
s.socket.events.on(L, function(t) {
s.events.emit(L, t.data);
});
s.autoRecover();
return s;
}
var s = i.prototype;
s.autoRecover = function() {
var t = this;
if (this.socket) {
this.socket.reset();
this.socket.events.once("e_closed", function(e) {
t.events.emit("e_closed", e.data);
Promise.resolve().then(function() {
t.autoRecover();
});
});
this.socket.connect(this.options);
}
};
t.a(s, "connected", {
get: function() {
return this.socket && this.socket.connected;
},
enumerable: !1,
configurable: !0
});
s.close = function() {
this.socket && this.socket.destroy();
};
s.send = function(t) {
this.socket.send(t);
};
s.sendAsync = function(t) {
return this.socket.sendAsync(t);
};
s.onReceiveMsg = function(t) {
this.doReceiveMsg(t.data);
};
return i;
}(O);
Et.current || new Et();
Ct.current || new Ct();
var jt = {
send: function(t) {
return Et.current.send(t);
},
sendAsync: function(t) {
return Et.current.sendAsync(t);
},
sendHttpAsync: function(t) {
return Ct.current.sendAsync(t);
}
}, qt = jt;
function Nt(t) {
qt = t;
}
function zt(t) {
return t.useHttp ? qt.sendHttpAsync(t) : t.respType ? qt.sendAsync(t) : qt.send(t);
}
var Jt = Object.freeze({
__proto__: null,
version: "3.1.47",
options: o,
addStartBack: l,
startup: h,
bkdrHash: _,
bkdrHashStr: f,
bkdrHashStrFast: d,
lz4Encode: p,
lz4Decode: y,
lz4XorEncode: b,
lz4XorDecode: v,
StateMachine: g,
sleep: S,
TimeUtil: w,
xorEncode: V,
xorDecode: M,
toJsonStringSB: P,
get HttpMethod() {
return e.HttpMethod;
},
get HttpResponseType() {
return e.HttpResponseType;
},
HttpRequest: I,
HttpDelegate: Ct,
get WebSocketClientState() {
return e.WebSocketClientState;
},
WebSocketClient: Ft,
WebSocketDelegate: Et,
WebSocketDelegateAutoRecover: Ot,
DelegateBase: O,
get Encoding() {
return e.Encoding;
},
encodeMsg: Bt,
decodeMsg: wt,
get ErrorCode() {
return e.ErrorCode;
},
ReceiveMsgImpl: xt,
defaultSender: jt,
setSender: Nt,
sendAuto: zt,
SyncData: F,
syncData: E,
EVENT_MSG: G,
EVENT_CLOSED: "e_closed",
EVENT_PRECONNECT: R,
EVENT_CONNECTED: L,
EventEmitter: T,
DataBase: ut,
toPlain: _t,
reset: ft,
toTyped: pt,
record: yt,
key: bt,
getTypeInfoByName: J,
getTypeInfoByInstance: U,
getTypeInfo: X,
TypeInfo: Y,
PropInfo: Q,
prop: tt,
type: et,
clazz: st,
autoProp: ot,
any_t: at,
array_t: lt,
map_t: ht,
get isArray() {
return e.isArray;
},
setIsArray: ct,
get isMap() {
return e.isMap;
},
setIsMap: mt
});
globalThis.o4e = Object.assign(globalThis.o4e || {}, Jt);
e.DataBase = ut;
e.DelegateBase = O;
e.EVENT_CLOSED = "e_closed";
e.EVENT_CONNECTED = L;
e.EVENT_MSG = G;
e.EVENT_PRECONNECT = R;
e.EventEmitter = T;
e.HttpDelegate = Ct;
e.HttpRequest = I;
e.PropInfo = Q;
e.ReceiveMsgImpl = xt;
e.StateMachine = g;
e.SyncData = F;
e.TimeUtil = w;
e.TypeInfo = Y;
e.WebSocketClient = Ft;
e.WebSocketDelegate = Et;
e.WebSocketDelegateAutoRecover = Ot;
e.addStartBack = l;
e.any_t = at;
e.array_t = lt;
e.autoProp = ot;
e.bkdrHash = _;
e.bkdrHashStr = f;
e.bkdrHashStrFast = d;
e.clazz = st;
e.decodeMsg = wt;
e.defaultSender = jt;
e.encodeMsg = Bt;
e.getTypeInfo = X;
e.getTypeInfoByInstance = U;
e.getTypeInfoByName = J;
e.key = bt;
e.lz4Decode = y;
e.lz4Encode = p;
e.lz4XorDecode = v;
e.lz4XorEncode = b;
e.map_t = ht;
e.options = o;
e.prop = tt;
e.record = yt;
e.reset = ft;
e.sendAuto = zt;
e.setIsArray = ct;
e.setIsMap = mt;
e.setSender = Nt;
e.sleep = S;
e.startup = h;
e.syncData = E;
e.toJsonStringSB = P;
e.toPlain = _t;
e.toTyped = pt;
e.type = et;
e.version = "3.1.47";
e.xorDecode = M;
e.xorEncode = V;
},
5: function(t) {
(function(e) {
i = function() {
"use strict";
(function() {
var i = "undefined", s = typeof globalThis !== i ? globalThis : typeof window !== i ? window : typeof e !== i ? e : {};
s.globalThis || (s.globalThis = s);
Uint8Array.prototype.slice || t.a(Uint8Array.prototype, "slice", {
value: function(t, e) {
return new Uint8Array(Array.prototype.slice.call(this, t, e));
}
});
Uint8Array.prototype.copyWithin || t.a(Uint8Array.prototype, "copyWithin", {
value: function(t, e, i) {
this.set(this.subarray(e, i || this.length), t);
}
});
s.__spreadArray || (s.__spreadArray = function(t, e) {
for (var i = 0, s = e.length, r = t.length; i < s; i++, r++) t[r] = e[i];
return t;
});
if (typeof TextEncoder === i) {
var r = function() {
function t() {}
t.prototype.encode = function(t) {
if (0 === t.length) return new Uint8Array(0);
var e = new Uint8Array(6 * t.length), i = this.encodeInto(t, e);
return e.subarray(0, i.written);
};
return t;
}();
s.TextEncoder = r;
}
TextEncoder.prototype.encodeInto || t.a(TextEncoder.prototype, "encodeInto", {
configurable: !0,
value: function(t, e) {
for (var i = 0, s = 0; s < t.length; s++) if ((n = t.codePointAt(s)) <= 127) e[i++] = n; else if (n <= 2047) {
e[i++] = n >>> 6 | 192;
e[i++] = n >>> 0 & 63 | 128;
} else if (n <= 65535) {
e[i++] = n >>> 12 | 224;
e[i++] = n >>> 6 & 63 | 128;
e[i++] = n >>> 0 & 63 | 128;
} else if (n <= 2097151) {
e[i++] = n >>> 18 | 240;
e[i++] = n >>> 12 & 63 | 128;
e[i++] = n >>> 6 & 63 | 128;
e[i++] = n >>> 0 & 63 | 128;
s++;
} else if (n <= 67108863) {
e[i++] = n >>> 24 | 248;
e[i++] = n >>> 18 & 63 | 128;
e[i++] = n >>> 12 & 63 | 128;
e[i++] = n >>> 6 & 63 | 128;
e[i++] = n >>> 0 & 63 | 128;
s++;
} else if (n <= 2147483647) {
e[i++] = n >>> 30 | 252;
e[i++] = n >>> 24 & 63 | 128;
e[i++] = n >>> 18 & 63 | 128;
e[i++] = n >>> 12 & 63 | 128;
e[i++] = n >>> 6 & 63 | 128;
e[i++] = n >>> 0 & 63 | 128;
s++;
}
if (i <= e.length) return {
read: s,
written: i
};
i = 0;
s = 0;
for (var r = e.length; s < t.length; s++) {
var n;
if ((n = t.codePointAt(s)) <= 127) {
if (i + 1 > r) break;
} else if (n <= 2047) {
if (i + 2 > r) break;
} else if (n <= 65535) {
if (i + 3 > r) break;
} else if (n <= 2097151) {
if (i + 4 > r) break;
s++;
} else if (n <= 67108863) {
if (i + 5 > r) break;
s++;
} else if (n <= 2147483647) {
if (i + 6 > r) break;
s++;
}
}
return {
read: s,
written: i
};
}
});
if (typeof TextDecoder === i) {
var n = [], o = function() {
function t(t) {
void 0 === t && (t = "utf8");
this.label = t;
}
t.prototype.decode = function(t) {
if (0 === t.length) return "";
if ("utf8" !== this.label) throw new Error("unsupport encoding: " + this.label);
var e = 0, i = t.length, s = "";
n.length = 0;
for (;e < i; ) {
if (n.length >= 3e4) {
s += String.fromCodePoint.apply(String, n);
n.length = 0;
}
var r = t[e++];
if (0 != (128 & r)) if (192 != (224 & r)) if (224 != (240 & r)) if (240 != (248 & r)) if (248 != (252 & r)) {
if (252 != (254 & r)) throw new Error("unsupport utf8 code: " + r + " at " + e);
n.push((1 & r) << 30 | (63 & t[e++]) << 24 | (63 & t[e++]) << 18 | (63 & t[e++]) << 12 | (63 & t[e++]) << 6 | 63 & t[e++]);
} else n.push((3 & r) << 24 | (63 & t[e++]) << 18 | (63 & t[e++]) << 12 | (63 & t[e++]) << 6 | 63 & t[e++]); else n.push((7 & r) << 18 | (63 & t[e++]) << 12 | (63 & t[e++]) << 6 | 63 & t[e++]); else n.push((15 & r) << 12 | (63 & t[e++]) << 6 | 63 & t[e++]); else n.push((31 & r) << 6 | 63 & t[e++]); else n.push(r);
}
s += String.fromCodePoint.apply(String, n);
n.length = 0;
return s;
};
return t;
}();
s.TextDecoder = o;
}
})();
"object" != typeof env && (globalThis.env = Object.create(null));
env.ENV = "dev";
}, "function" == typeof define && define.amd ? define(i) : i();
var i;
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
},
6: function(t, e) {
"use strict";
t.a(e, "__esModule", {
value: !0
});
t(5);
var i = {
exports: {}
};
(function(t) {
var e, i = (e = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0, 
function(t) {
t = t || {};
var i, s, r;
i || (i = "undefined" != typeof t ? t : {});
i.ready = new Promise(function(t, e) {
s = t;
r = e;
});
var n, o = {};
for (n in i) i.hasOwnProperty(n) && (o[n] = i[n]);
var a = "";
"undefined" != typeof document && document.currentScript && (a = document.currentScript.src);
e && (a = e);
a = 0 !== a.indexOf("blob:") ? a.substr(0, a.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
var l, h = i.printErr || console.warn.bind(console);
for (n in o) o.hasOwnProperty(n) && (i[n] = o[n]);
o = null;
i.wasmBinary && (l = i.wasmBinary);
i.noExitRuntime;
function c() {
this.exports = function(t) {
function e(t) {
t.set = function(t, e) {
this[t] = e;
};
t.get = function(t) {
return this[t];
};
return t;
}
for (var i, s = new Uint8Array(123), r = 25; r >= 0; --r) {
s[48 + r] = 52 + r;
s[65 + r] = r;
s[97 + r] = 26 + r;
}
s[43] = 62;
s[47] = 63;
function n(t, e, i) {
for (var r, n, o = 0, a = e, l = i.length, h = e + (3 * l >> 2) - ("=" == i[l - 2]) - ("=" == i[l - 1]); o < l; o += 4) {
r = s[i.charCodeAt(o + 1)];
n = s[i.charCodeAt(o + 2)];
t[a++] = s[i.charCodeAt(o)] << 2 | r >> 4;
a < h && (t[a++] = r << 4 | n >> 2);
a < h && (t[a++] = n << 6 | s[i.charCodeAt(o + 3)]);
}
}
function o() {
n(i, 1024, "LSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweABpa2NwX3JlY3YAaW5wdXQgcHNoOiBzbj0lbHUgdHM9JWx1AHJlY3Ygc249JWx1AGlucHV0IHdpbnM6ICVsdQBpa2NwX291dHB1dABrY3AtPm91dHB1dABbUk9dICVsZCBieXRlcwBbUkldICVkIGJ5dGVzAGtjcABuYW4AaWtjcF9hY2tfcHVzaABzZWcAaW5mAGlrY3BfcGVla3NpemUAbGVuID09IHBlZWtzaXplAGlrY3BfcmVsZWFzZQBpbnB1dCBwcm9iZQBpa2NwX3NlbmQAaW5wdXQgYWNrOiBzbj0lbHUgcnR0PSVsZCBydG89JWxkAC9pbmNsdWRlL2lrY3AuYwBOQU4AYWNrbGlzdCAhPSBOVUxMAElORgBrY3AtPm1zcyA+IDAALgAobnVsbCk=");
n(i, 1368, "AwAAAAQAAAAFAAAAaWlpaWk=");
n(i, 1396, "BgAAAAcAAAAIAAAAaWlpaQ==");
n(i, 1424, "GQAKABkZGQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAAZABEKGRkZAwoHAAEACQsYAAAJBgsAAAsABhkAAAAZGRk=");
n(i, 1505, "DgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAO");
n(i, 1563, "DA==");
n(i, 1575, "EwAAAAATAAAAAAkMAAAAAAAMAAAM");
n(i, 1621, "EA==");
n(i, 1633, "DwAAAAQPAAAAAAkQAAAAAAAQAAAQ");
n(i, 1679, "Eg==");
n(i, 1691, "EQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoa");
n(i, 1746, "GgAAABoaGgAAAAAAAAk=");
n(i, 1795, "FA==");
n(i, 1807, "FwAAAAAXAAAAAAkUAAAAAAAUAAAU");
n(i, 1853, "Fg==");
n(i, 1865, "FQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVG");
n(i, 1904, "cAwQ");
}
var a = new ArrayBuffer(16), l = new Int32Array(a), h = new Float64Array(a);
function c(t) {
return l[t];
}
function m(t, e) {
l[t] = e;
}
function u() {
return h[0];
}
function _(t) {
h[0] = t;
}
return function(t) {
var s = t.a, r = s.buffer;
s.grow = function(t) {
t |= 0;
var e = 0 | Y(), o = e + t | 0;
if (e < o && o < 65536) {
var c = new ArrayBuffer(y(o, 65536));
new Int8Array(c).set(n);
n = new Int8Array(c);
a = new Int16Array(c);
l = new Int32Array(c);
h = new Uint8Array(c);
f = new Uint16Array(c);
d = new Uint32Array(c);
p = new Float64Array(c);
r = c;
s.buffer = r;
i = h;
}
return e;
};
var n = new Int8Array(r), a = new Int16Array(r), l = new Int32Array(r), h = new Uint8Array(r), f = new Uint16Array(r), d = new Uint32Array(r), p = new Float64Array(r), y = Math.imul, b = Math.abs, v = Math.clz32, g = t.abort, S = t.b, x = t.c, A = t.d, B = t.e, w = t.f, C = 1051760, V = 0;
function M(t) {
var e, i = 0, s = 0, r = 0, n = 0, o = 0, a = 0, c = 0, m = 0, u = 0, _ = 0, f = 0, p = 0;
C = e = C - 16 | 0;
t: {
e: {
i: {
s: {
r: {
n: {
o: {
a: {
l: {
h: {
c: {
if ((t |= 0) >>> 0 <= 244) {
if (3 & (i = (n = l[669]) >>> (s = (c = t >>> 0 < 11 ? 16 : t + 11 & -8) >>> 3 | 0) | 0)) {
t = (o = l[2724 + (i = (r = s + (1 & (-1 ^ i)) | 0) << 3) >> 2]) + 8 | 0;
if ((0 | (s = l[o + 8 >> 2])) != (0 | (i = i + 2716 | 0))) {
l[s + 12 >> 2] = i;
l[i + 8 >> 2] = s;
} else f = 2676, p = W(r) & n, l[f >> 2] = p;
i = r << 3;
l[o + 4 >> 2] = 3 | i;
l[4 + (i = i + o | 0) >> 2] = 1 | l[i + 4 >> 2];
break t;
}
if ((_ = l[671]) >>> 0 >= c >>> 0) break c;
if (i) {
s = t = (i = (0 - (t = (0 - (t = 2 << s) | t) & i << s) & t) - 1 | 0) >>> 12 & 16;
s |= t = (i = i >>> t | 0) >>> 5 & 8;
s |= t = (i = i >>> t | 0) >>> 2 & 4;
a = l[2724 + (t = (s = ((s |= t = (i = i >>> t | 0) >>> 1 & 2) | (t = (i = i >>> t | 0) >>> 1 & 1)) + (i >>> t | 0) | 0) << 3) >> 2];
if ((0 | (i = l[a + 8 >> 2])) != (0 | (t = t + 2716 | 0))) {
l[i + 12 >> 2] = t;
l[t + 8 >> 2] = i;
} else {
n = W(s) & n;
l[669] = n;
}
t = a + 8 | 0;
l[a + 4 >> 2] = 3 | c;
o = (i = s << 3) - c | 0;
l[4 + (r = a + c | 0) >> 2] = 1 | o;
l[i + a >> 2] = o;
if (_) {
s = 2716 + ((i = _ >>> 3 | 0) << 3) | 0;
a = l[674];
if ((i = 1 << i) & n) i = l[s + 8 >> 2]; else {
l[669] = i | n;
i = s;
}
l[s + 8 >> 2] = a;
l[i + 12 >> 2] = a;
l[a + 12 >> 2] = s;
l[a + 8 >> 2] = i;
}
l[674] = r;
l[671] = o;
break t;
}
if (!(u = l[670])) break c;
s = t = (i = (u & 0 - u) - 1 | 0) >>> 12 & 16;
s |= t = (i = i >>> t | 0) >>> 5 & 8;
s |= t = (i = i >>> t | 0) >>> 2 & 4;
i = l[2980 + (((s |= t = (i = i >>> t | 0) >>> 1 & 2) | (t = (i = i >>> t | 0) >>> 1 & 1)) + (i >>> t | 0) << 2) >> 2];
r = (-8 & l[i + 4 >> 2]) - c | 0;
s = i;
for (;(t = l[s + 16 >> 2]) || (t = l[s + 20 >> 2]); ) {
r = (o = (s = (-8 & l[t + 4 >> 2]) - c | 0) >>> 0 < r >>> 0) ? s : r;
i = o ? t : i;
s = t;
}
m = l[i + 24 >> 2];
if ((0 | (o = l[i + 12 >> 2])) != (0 | i)) {
t = l[i + 8 >> 2];
l[t + 12 >> 2] = o;
l[o + 8 >> 2] = t;
break e;
}
if (!(t = l[(s = i + 20 | 0) >> 2])) {
if (!(t = l[i + 16 >> 2])) break h;
s = i + 16 | 0;
}
for (;;) {
a = s;
o = t;
if (!(t = l[(s = t + 20 | 0) >> 2])) {
s = o + 16 | 0;
if (!(t = l[o + 16 >> 2])) break;
}
}
l[a >> 2] = 0;
break e;
}
c = -1;
if (!(t >>> 0 > 4294967231)) {
c = -8 & (t = t + 11 | 0);
if (u = l[670]) {
r = 0 - c | 0;
n = 0;
if (!(c >>> 0 < 256)) {
n = 31;
if (!(c >>> 0 > 16777215)) {
t = t >>> 8 | 0;
t <<= a = t + 1048320 >>> 16 & 8;
n = 28 + ((t = ((t <<= s = t + 520192 >>> 16 & 4) << (i = t + 245760 >>> 16 & 2) >>> 15 | 0) - (i | s | a) | 0) << 1 | c >>> t + 21 & 1) | 0;
}
}
m: {
u: {
if (s = l[2980 + (n << 2) >> 2]) {
t = 0;
i = c << (31 == (0 | n) ? 0 : 25 - (n >>> 1 | 0) | 0);
for (;;) {
if (!((a = (-8 & l[s + 4 >> 2]) - c | 0) >>> 0 >= r >>> 0)) {
o = s;
if (!(r = a)) {
r = 0;
t = s;
break u;
}
}
a = l[s + 20 >> 2];
s = l[16 + ((i >>> 29 & 4) + s | 0) >> 2];
t = a ? (0 | a) == (0 | s) ? t : a : t;
i <<= 1;
if (!s) break;
}
} else t = 0;
if (!(t | o)) {
o = 0;
if (!(t = (0 - (t = 2 << n) | t) & u)) break c;
s = t = (i = (t & 0 - t) - 1 | 0) >>> 12 & 16;
s |= t = (i = i >>> t | 0) >>> 5 & 8;
s |= t = (i = i >>> t | 0) >>> 2 & 4;
t = l[2980 + (((s |= t = (i = i >>> t | 0) >>> 1 & 2) | (t = (i = i >>> t | 0) >>> 1 & 1)) + (i >>> t | 0) << 2) >> 2];
}
if (!t) break m;
}
for (;;) {
r = (s = (i = (-8 & l[t + 4 >> 2]) - c | 0) >>> 0 < r >>> 0) ? i : r;
o = s ? t : o;
if (!(t = (i = l[t + 16 >> 2]) || l[t + 20 >> 2])) break;
}
}
if (!(!o | l[671] - c >>> 0 <= r >>> 0)) {
n = l[o + 24 >> 2];
if ((0 | o) != (0 | (i = l[o + 12 >> 2]))) {
t = l[o + 8 >> 2];
l[t + 12 >> 2] = i;
l[i + 8 >> 2] = t;
break i;
}
if (!(t = l[(s = o + 20 | 0) >> 2])) {
if (!(t = l[o + 16 >> 2])) break l;
s = o + 16 | 0;
}
for (;;) {
a = s;
i = t;
if (!(t = l[(s = t + 20 | 0) >> 2])) {
s = i + 16 | 0;
if (!(t = l[i + 16 >> 2])) break;
}
}
l[a >> 2] = 0;
break i;
}
}
}
}
if ((s = l[671]) >>> 0 >= c >>> 0) {
r = l[674];
if ((i = s - c | 0) >>> 0 >= 16) {
l[671] = i;
t = r + c | 0;
l[674] = t;
l[t + 4 >> 2] = 1 | i;
l[s + r >> 2] = i;
l[r + 4 >> 2] = 3 | c;
} else {
l[674] = 0;
l[671] = 0;
l[r + 4 >> 2] = 3 | s;
l[4 + (t = s + r | 0) >> 2] = 1 | l[t + 4 >> 2];
}
t = r + 8 | 0;
break t;
}
if ((m = l[672]) >>> 0 > c >>> 0) {
i = m - c | 0;
l[672] = i;
t = (s = l[675]) + c | 0;
l[675] = t;
l[t + 4 >> 2] = 1 | i;
l[s + 4 >> 2] = 3 | c;
t = s + 8 | 0;
break t;
}
t = 0;
u = c + 47 | 0;
if (l[787]) s = l[789]; else {
l[790] = -1;
l[791] = -1;
l[788] = 4096;
l[789] = 4096;
l[787] = e + 12 & -16 ^ 1431655768;
l[792] = 0;
l[780] = 0;
s = 4096;
}
if ((s = (a = u + s | 0) & (o = 0 - s | 0)) >>> 0 <= c >>> 0) break t;
if ((r = l[779]) && r >>> 0 < (n = (i = l[777]) + s | 0) >>> 0 | i >>> 0 >= n >>> 0) break t;
if (4 & h[3120]) break n;
c: {
m: {
if (r = l[675]) {
t = 3124;
for (;;) {
if ((i = l[t >> 2]) >>> 0 <= r >>> 0 & r >>> 0 < i + l[t + 4 >> 2] >>> 0) break m;
if (!(t = l[t + 8 >> 2])) break;
}
}
if (-1 == (0 | (i = U(0)))) break o;
n = s;
(t = (r = l[788]) - 1 | 0) & i && (n = (s - i | 0) + (t + i & 0 - r) | 0);
if (n >>> 0 <= c >>> 0 | n >>> 0 > 2147483646) break o;
if ((r = l[779]) && r >>> 0 < (o = (t = l[777]) + n | 0) >>> 0 | t >>> 0 >= o >>> 0) break o;
if ((0 | i) != (0 | (t = U(n)))) break c;
break r;
}
if ((n = o & a - m) >>> 0 > 2147483646) break o;
if ((0 | (i = U(n))) == (l[t >> 2] + l[t + 4 >> 2] | 0)) break a;
t = i;
}
if (!(-1 == (0 | t) | c + 48 >>> 0 <= n >>> 0)) {
if ((i = (i = l[789]) + (u - n | 0) & 0 - i) >>> 0 > 2147483646) {
i = t;
break r;
}
if (-1 != (0 | U(i))) {
n = i + n | 0;
i = t;
break r;
}
U(0 - n | 0);
break o;
}
i = t;
if (-1 != (0 | t)) break r;
break o;
}
o = 0;
break e;
}
i = 0;
break i;
}
if (-1 != (0 | i)) break r;
}
l[780] = 4 | l[780];
}
if (s >>> 0 > 2147483646) break s;
if (-1 == (0 | (i = U(s))) | -1 == (0 | (t = U(0))) | t >>> 0 <= i >>> 0) break s;
if ((n = t - i | 0) >>> 0 <= c + 40 >>> 0) break s;
}
t = l[777] + n | 0;
l[777] = t;
t >>> 0 > d[778] && (l[778] = t);
r: {
n: {
o: {
if (a = l[675]) {
t = 3124;
for (;;) {
if (((r = l[t >> 2]) + (s = l[t + 4 >> 2]) | 0) == (0 | i)) break o;
if (!(t = l[t + 8 >> 2])) break;
}
break n;
}
(t = l[673]) >>> 0 <= i >>> 0 && t || (l[673] = i);
t = 0;
l[782] = n;
l[781] = i;
l[677] = -1;
l[678] = l[787];
l[784] = 0;
for (;;) {
s = 2716 + (r = t << 3) | 0;
l[r + 2724 >> 2] = s;
l[r + 2728 >> 2] = s;
if (32 == (0 | (t = t + 1 | 0))) break;
}
s = (r = n - 40 | 0) - (t = i + 8 & 7 ? -8 - i & 7 : 0) | 0;
l[672] = s;
t = t + i | 0;
l[675] = t;
l[t + 4 >> 2] = 1 | s;
l[4 + (i + r | 0) >> 2] = 40;
l[676] = l[791];
break r;
}
if (!(8 & h[t + 12 | 0] | r >>> 0 > a >>> 0 | i >>> 0 <= a >>> 0)) {
l[t + 4 >> 2] = s + n;
s = (t = a + 8 & 7 ? -8 - a & 7 : 0) + a | 0;
l[675] = s;
t = (i = l[672] + n | 0) - t | 0;
l[672] = t;
l[s + 4 >> 2] = 1 | t;
l[4 + (i + a | 0) >> 2] = 40;
l[676] = l[791];
break r;
}
}
d[673] > i >>> 0 && (l[673] = i);
s = i + n | 0;
t = 3124;
n: {
o: {
a: {
l: {
h: {
c: {
for (;;) {
if ((0 | s) != l[t >> 2]) {
if (t = l[t + 8 >> 2]) continue;
break c;
}
break;
}
if (!(8 & h[t + 12 | 0])) break h;
}
t = 3124;
for (;;) {
if ((s = l[t >> 2]) >>> 0 <= a >>> 0 && (o = s + l[t + 4 >> 2] | 0) >>> 0 > a >>> 0) break l;
t = l[t + 8 >> 2];
}
}
l[t >> 2] = i;
l[t + 4 >> 2] = l[t + 4 >> 2] + n;
l[4 + (u = (i + 8 & 7 ? -8 - i & 7 : 0) + i | 0) >> 2] = 3 | c;
s = (n = s + (s + 8 & 7 ? -8 - s & 7 : 0) | 0) - (m = c + u | 0) | 0;
if ((0 | n) == (0 | a)) {
l[675] = m;
t = l[672] + s | 0;
l[672] = t;
l[m + 4 >> 2] = 1 | t;
break o;
}
if (l[674] == (0 | n)) {
l[674] = m;
t = l[671] + s | 0;
l[671] = t;
l[m + 4 >> 2] = 1 | t;
l[t + m >> 2] = t;
break o;
}
if (1 == (3 & (t = l[n + 4 >> 2]))) {
a = -8 & t;
h: if (t >>> 0 <= 255) {
r = l[n + 8 >> 2];
t = t >>> 3 | 0;
if ((0 | (i = l[n + 12 >> 2])) == (0 | r)) {
f = 2676, p = l[669] & W(t), l[f >> 2] = p;
break h;
}
l[r + 12 >> 2] = i;
l[i + 8 >> 2] = r;
} else {
c = l[n + 24 >> 2];
if ((0 | n) == (0 | (i = l[n + 12 >> 2]))) if ((r = l[(t = n + 20 | 0) >> 2]) || (r = l[(t = n + 16 | 0) >> 2])) {
for (;;) {
o = t;
if (!(r = l[(t = (i = r) + 20 | 0) >> 2])) {
t = i + 16 | 0;
if (!(r = l[i + 16 >> 2])) break;
}
}
l[o >> 2] = 0;
} else i = 0; else {
t = l[n + 8 >> 2];
l[t + 12 >> 2] = i;
l[i + 8 >> 2] = t;
}
if (c) {
r = l[n + 28 >> 2];
c: {
if (l[(t = 2980 + (r << 2) | 0) >> 2] == (0 | n)) {
l[t >> 2] = i;
if (i) break c;
f = 2680, p = l[670] & W(r), l[f >> 2] = p;
break h;
}
l[c + (l[c + 16 >> 2] == (0 | n) ? 16 : 20) >> 2] = i;
if (!i) break h;
}
l[i + 24 >> 2] = c;
if (t = l[n + 16 >> 2]) {
l[i + 16 >> 2] = t;
l[t + 24 >> 2] = i;
}
if (t = l[n + 20 >> 2]) {
l[i + 20 >> 2] = t;
l[t + 24 >> 2] = i;
}
}
}
n = n + a | 0;
s = s + a | 0;
}
l[n + 4 >> 2] = -2 & l[n + 4 >> 2];
l[m + 4 >> 2] = 1 | s;
l[s + m >> 2] = s;
if (s >>> 0 <= 255) {
i = 2716 + ((t = s >>> 3 | 0) << 3) | 0;
if ((s = l[669]) & (t = 1 << t)) t = l[i + 8 >> 2]; else {
l[669] = t | s;
t = i;
}
l[i + 8 >> 2] = m;
l[t + 12 >> 2] = m;
l[m + 12 >> 2] = i;
l[m + 8 >> 2] = t;
break o;
}
t = 31;
if (s >>> 0 <= 16777215) {
t = s >>> 8 | 0;
t <<= o = t + 1048320 >>> 16 & 8;
t = 28 + ((t = ((t <<= r = t + 520192 >>> 16 & 4) << (i = t + 245760 >>> 16 & 2) >>> 15 | 0) - (i | r | o) | 0) << 1 | s >>> t + 21 & 1) | 0;
}
l[m + 28 >> 2] = t;
l[m + 16 >> 2] = 0;
l[m + 20 >> 2] = 0;
o = 2980 + (t << 2) | 0;
if ((r = l[670]) & (i = 1 << t)) {
t = s << (31 == (0 | t) ? 0 : 25 - (t >>> 1 | 0) | 0);
i = l[o >> 2];
for (;;) {
r = i;
if ((-8 & l[i + 4 >> 2]) == (0 | s)) break a;
i = t >>> 29 | 0;
t <<= 1;
if (!(i = l[16 + (o = r + (4 & i) | 0) >> 2])) break;
}
l[o + 16 >> 2] = m;
l[m + 24 >> 2] = r;
} else {
l[670] = i | r;
l[o >> 2] = m;
l[m + 24 >> 2] = o;
}
l[m + 12 >> 2] = m;
l[m + 8 >> 2] = m;
break o;
}
s = (r = n - 40 | 0) - (t = i + 8 & 7 ? -8 - i & 7 : 0) | 0;
l[672] = s;
t = t + i | 0;
l[675] = t;
l[t + 4 >> 2] = 1 | s;
l[4 + (i + r | 0) >> 2] = 40;
l[676] = l[791];
l[(s = (t = (o + (o - 39 & 7 ? 39 - o & 7 : 0) | 0) - 47 | 0) >>> 0 < a + 16 >>> 0 ? a : t) + 4 >> 2] = 27;
t = l[784];
l[s + 16 >> 2] = l[783];
l[s + 20 >> 2] = t;
t = l[782];
l[s + 8 >> 2] = l[781];
l[s + 12 >> 2] = t;
l[783] = s + 8;
l[782] = n;
l[781] = i;
l[784] = 0;
t = s + 24 | 0;
for (;;) {
l[t + 4 >> 2] = 7;
i = t + 8 | 0;
t = t + 4 | 0;
if (!(i >>> 0 < o >>> 0)) break;
}
if ((0 | s) == (0 | a)) break r;
l[s + 4 >> 2] = -2 & l[s + 4 >> 2];
o = s - a | 0;
l[a + 4 >> 2] = 1 | o;
l[s >> 2] = o;
if (o >>> 0 <= 255) {
i = 2716 + ((t = o >>> 3 | 0) << 3) | 0;
if ((s = l[669]) & (t = 1 << t)) t = l[i + 8 >> 2]; else {
l[669] = t | s;
t = i;
}
l[i + 8 >> 2] = a;
l[t + 12 >> 2] = a;
l[a + 12 >> 2] = i;
l[a + 8 >> 2] = t;
break r;
}
t = 31;
l[a + 16 >> 2] = 0;
l[a + 20 >> 2] = 0;
if (o >>> 0 <= 16777215) {
t = o >>> 8 | 0;
t <<= r = t + 1048320 >>> 16 & 8;
t = 28 + ((t = ((t <<= s = t + 520192 >>> 16 & 4) << (i = t + 245760 >>> 16 & 2) >>> 15 | 0) - (i | s | r) | 0) << 1 | o >>> t + 21 & 1) | 0;
}
l[a + 28 >> 2] = t;
r = 2980 + (t << 2) | 0;
if ((s = l[670]) & (i = 1 << t)) {
t = o << (31 == (0 | t) ? 0 : 25 - (t >>> 1 | 0) | 0);
i = l[r >> 2];
for (;;) {
s = i;
if ((0 | o) == (-8 & l[i + 4 >> 2])) break n;
i = t >>> 29 | 0;
t <<= 1;
if (!(i = l[16 + (r = s + (4 & i) | 0) >> 2])) break;
}
l[r + 16 >> 2] = a;
l[a + 24 >> 2] = s;
} else {
l[670] = i | s;
l[r >> 2] = a;
l[a + 24 >> 2] = r;
}
l[a + 12 >> 2] = a;
l[a + 8 >> 2] = a;
break r;
}
t = l[r + 8 >> 2];
l[t + 12 >> 2] = m;
l[r + 8 >> 2] = m;
l[m + 24 >> 2] = 0;
l[m + 12 >> 2] = r;
l[m + 8 >> 2] = t;
}
t = u + 8 | 0;
break t;
}
t = l[s + 8 >> 2];
l[t + 12 >> 2] = a;
l[s + 8 >> 2] = a;
l[a + 24 >> 2] = 0;
l[a + 12 >> 2] = s;
l[a + 8 >> 2] = t;
}
if (!((t = l[672]) >>> 0 <= c >>> 0)) {
i = t - c | 0;
l[672] = i;
t = (s = l[675]) + c | 0;
l[675] = t;
l[t + 4 >> 2] = 1 | i;
l[s + 4 >> 2] = 3 | c;
t = s + 8 | 0;
break t;
}
}
l[625] = 48;
t = 0;
break t;
}
i: if (n) {
s = l[o + 28 >> 2];
s: {
if (l[(t = 2980 + (s << 2) | 0) >> 2] == (0 | o)) {
l[t >> 2] = i;
if (i) break s;
u = W(s) & u;
l[670] = u;
break i;
}
l[n + (l[n + 16 >> 2] == (0 | o) ? 16 : 20) >> 2] = i;
if (!i) break i;
}
l[i + 24 >> 2] = n;
if (t = l[o + 16 >> 2]) {
l[i + 16 >> 2] = t;
l[t + 24 >> 2] = i;
}
if (t = l[o + 20 >> 2]) {
l[i + 20 >> 2] = t;
l[t + 24 >> 2] = i;
}
}
i: if (r >>> 0 <= 15) {
t = r + c | 0;
l[o + 4 >> 2] = 3 | t;
l[4 + (t = t + o | 0) >> 2] = 1 | l[t + 4 >> 2];
} else {
l[o + 4 >> 2] = 3 | c;
l[4 + (n = o + c | 0) >> 2] = 1 | r;
l[r + n >> 2] = r;
if (r >>> 0 <= 255) {
i = 2716 + ((t = r >>> 3 | 0) << 3) | 0;
if ((s = l[669]) & (t = 1 << t)) t = l[i + 8 >> 2]; else {
l[669] = t | s;
t = i;
}
l[i + 8 >> 2] = n;
l[t + 12 >> 2] = n;
l[n + 12 >> 2] = i;
l[n + 8 >> 2] = t;
} else {
t = 31;
if (r >>> 0 <= 16777215) {
t = r >>> 8 | 0;
t <<= a = t + 1048320 >>> 16 & 8;
t = 28 + ((t = ((t <<= s = t + 520192 >>> 16 & 4) << (i = t + 245760 >>> 16 & 2) >>> 15 | 0) - (i | s | a) | 0) << 1 | r >>> t + 21 & 1) | 0;
}
l[n + 28 >> 2] = t;
l[n + 16 >> 2] = 0;
l[n + 20 >> 2] = 0;
i = 2980 + (t << 2) | 0;
s: {
if ((s = 1 << t) & u) {
t = r << (31 == (0 | t) ? 0 : 25 - (t >>> 1 | 0) | 0);
c = l[i >> 2];
for (;;) {
if ((-8 & l[(i = c) + 4 >> 2]) == (0 | r)) break s;
s = t >>> 29 | 0;
t <<= 1;
if (!(c = l[16 + (s = (4 & s) + i | 0) >> 2])) break;
}
l[s + 16 >> 2] = n;
} else {
l[670] = s | u;
l[i >> 2] = n;
}
l[n + 24 >> 2] = i;
l[n + 12 >> 2] = n;
l[n + 8 >> 2] = n;
break i;
}
t = l[i + 8 >> 2];
l[t + 12 >> 2] = n;
l[i + 8 >> 2] = n;
l[n + 24 >> 2] = 0;
l[n + 12 >> 2] = i;
l[n + 8 >> 2] = t;
}
}
t = o + 8 | 0;
break t;
}
e: if (m) {
s = l[i + 28 >> 2];
i: {
if (l[(t = 2980 + (s << 2) | 0) >> 2] == (0 | i)) {
l[t >> 2] = o;
if (o) break i;
f = 2680, p = W(s) & u, l[f >> 2] = p;
break e;
}
l[m + (l[m + 16 >> 2] == (0 | i) ? 16 : 20) >> 2] = o;
if (!o) break e;
}
l[o + 24 >> 2] = m;
if (t = l[i + 16 >> 2]) {
l[o + 16 >> 2] = t;
l[t + 24 >> 2] = o;
}
if (t = l[i + 20 >> 2]) {
l[o + 20 >> 2] = t;
l[t + 24 >> 2] = o;
}
}
if (r >>> 0 <= 15) {
t = r + c | 0;
l[i + 4 >> 2] = 3 | t;
l[4 + (t = t + i | 0) >> 2] = 1 | l[t + 4 >> 2];
} else {
l[i + 4 >> 2] = 3 | c;
l[4 + (o = i + c | 0) >> 2] = 1 | r;
l[r + o >> 2] = r;
if (_) {
s = 2716 + ((t = _ >>> 3 | 0) << 3) | 0;
a = l[674];
if ((t = 1 << t) & n) t = l[s + 8 >> 2]; else {
l[669] = t | n;
t = s;
}
l[s + 8 >> 2] = a;
l[t + 12 >> 2] = a;
l[a + 12 >> 2] = s;
l[a + 8 >> 2] = t;
}
l[674] = o;
l[671] = r;
}
t = i + 8 | 0;
}
C = e + 16 | 0;
return 0 | t;
}
function P(t, e, i, s, r) {
var o, c, m, u = 0, _ = 0, f = 0, d = 0, b = 0, v = 0, g = 0, S = 0, x = 0, A = 0, B = 0, w = 0, V = 0, M = 0, P = 0, I = 0;
C = o = C - 80 | 0;
l[o + 76 >> 2] = e;
m = o + 55 | 0;
c = o + 56 | 0;
e = 0;
t: {
e: {
i: {
s: {
r: for (;;) {
if ((2147483647 - g | 0) < (0 | e)) break s;
g = e + g | 0;
n: {
o: {
a: {
v = l[o + 76 >> 2];
if (b = h[0 | (e = v)]) for (;;) {
l: {
h: if (u = 255 & b) {
if (37 != (0 | u)) break l;
b = e;
for (;;) {
if (37 != h[e + 1 | 0]) break h;
u = e + 2 | 0;
l[o + 76 >> 2] = u;
b = b + 1 | 0;
_ = h[e + 2 | 0];
e = u;
if (37 != (0 | _)) break;
}
} else b = e;
if ((0 | (e = b - v | 0)) > (0 | (M = 2147483647 - g | 0))) break s;
t && E(t, v, e);
if (e) continue r;
A = -1;
u = 1;
e = l[o + 76 >> 2];
if (!(n[e + 1 | 0] - 48 >>> 0 >= 10 | 36 != h[e + 2 | 0])) {
A = n[e + 1 | 0] - 48 | 0;
V = 1;
u = 3;
}
e = u + e | 0;
l[o + 76 >> 2] = e;
S = 0;
h: if ((_ = (f = n[0 | e]) - 32 | 0) >>> 0 > 31) u = e; else {
u = e;
if (75913 & (d = 1 << _)) for (;;) {
u = e + 1 | 0;
l[o + 76 >> 2] = u;
S |= d;
if ((_ = (f = n[e + 1 | 0]) - 32 | 0) >>> 0 >= 32) break h;
e = u;
if (!(75913 & (d = 1 << _))) break;
}
}
h: if (42 != (0 | f)) {
if ((0 | (x = q(o + 76 | 0))) < 0) break s;
e = l[o + 76 >> 2];
} else {
c: {
if (!(n[u + 1 | 0] - 48 >>> 0 >= 10)) {
e = l[o + 76 >> 2];
if (36 == h[e + 2 | 0]) {
l[((n[e + 1 | 0] << 2) + r | 0) - 192 >> 2] = 10;
x = l[((n[e + 1 | 0] << 3) + s | 0) - 384 >> 2];
V = 1;
e = e + 3 | 0;
break c;
}
}
if (V) break a;
V = 0;
x = 0;
if (t) {
e = l[i >> 2];
l[i >> 2] = e + 4;
x = l[e >> 2];
}
e = l[o + 76 >> 2] + 1 | 0;
}
l[o + 76 >> 2] = e;
if ((0 | x) >= 0) break h;
x = 0 - x | 0;
S |= 8192;
}
u = 0;
d = -1;
B = 0;
if (46 == h[0 | e]) if (42 != h[e + 1 | 0]) {
l[o + 76 >> 2] = e + 1;
d = q(o + 76 | 0);
e = l[o + 76 >> 2];
B = 1;
} else {
h: {
if (!(n[e + 2 | 0] - 48 >>> 0 >= 10)) {
e = l[o + 76 >> 2];
if (36 == h[e + 3 | 0]) {
l[((n[e + 2 | 0] << 2) + r | 0) - 192 >> 2] = 10;
d = l[((n[e + 2 | 0] << 3) + s | 0) - 384 >> 2];
e = e + 4 | 0;
break h;
}
}
if (V) break a;
if (t) {
e = l[i >> 2];
l[i >> 2] = e + 4;
d = l[e >> 2];
} else d = 0;
e = l[o + 76 >> 2] + 2 | 0;
}
l[o + 76 >> 2] = e;
B = (-1 ^ d) >>> 31 | 0;
}
for (;;) {
w = u;
b = 28;
if (n[0 | e] - 123 >>> 0 < 4294967238) break i;
f = e + 1 | 0;
l[o + 76 >> 2] = f;
u = n[0 | e];
e = f;
if (!((u = h[1359 + (u + y(w, 58) | 0) | 0]) - 1 >>> 0 < 8)) break;
}
h: {
c: {
if (27 != (0 | u)) {
if (!u) break i;
if ((0 | A) >= 0) {
l[(A << 2) + r >> 2] = u;
u = l[4 + (e = (A << 3) + s | 0) >> 2];
l[o + 64 >> 2] = l[e >> 2];
l[o + 68 >> 2] = u;
break c;
}
if (!t) break n;
R(o - -64 | 0, u, i);
f = l[o + 76 >> 2];
break h;
}
if ((0 | A) >= 0) break i;
}
e = 0;
if (!t) continue r;
}
_ = -65537 & S;
u = 8192 & S ? _ : S;
S = 0;
A = 1024;
b = c;
h: {
c: {
m: {
u: {
_: {
f: {
d: {
p: {
y: {
b: {
v: {
g: {
S: {
x: {
A: {
B: {
e = n[f - 1 | 0];
switch ((e = w && 3 == (15 & e) ? -33 & e : e) - 88 | 0) {
case 11:
break h;

case 9:
case 13:
case 14:
case 15:
break c;

case 27:
break d;

case 12:
case 17:
break b;

case 23:
break v;

case 0:
case 32:
break g;

case 24:
break S;

case 22:
break x;

case 29:
break A;

case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
case 8:
case 10:
case 16:
case 18:
case 19:
case 20:
case 21:
case 25:
case 26:
case 28:
case 30:
case 31:
break o;

default:
break B;
}
}
switch (e - 65 | 0) {
case 0:
case 4:
case 5:
case 6:
break c;

case 2:
break _;

case 1:
case 3:
break o;
}
if (83 == (0 | e)) break f;
break o;
}
f = l[o + 64 >> 2];
_ = l[o + 68 >> 2];
A = 1024;
break y;
}
e = 0;
x: switch (255 & w) {
case 0:
case 1:
l[l[o + 64 >> 2] >> 2] = g;
continue r;

case 2:
u = l[o + 64 >> 2];
l[u >> 2] = g;
l[u + 4 >> 2] = g >> 31;
continue r;

case 3:
a[l[o + 64 >> 2] >> 1] = g;
continue r;

case 4:
n[l[o + 64 >> 2]] = g;
continue r;

case 6:
l[l[o + 64 >> 2] >> 2] = g;
continue r;

case 7:
break x;

default:
continue r;
}
u = l[o + 64 >> 2];
l[u >> 2] = g;
l[u + 4 >> 2] = g >> 31;
continue r;
}
d = d >>> 0 > 8 ? d : 8;
u |= 8;
e = 120;
}
v = c;
P = 32 & e;
if ((f = l[o + 64 >> 2]) | (_ = l[o + 68 >> 2])) for (;;) {
n[0 | (v = v - 1 | 0)] = P | h[1888 + (15 & f) | 0];
I = !_ & f >>> 0 > 15 | 0 != (0 | _);
w = _;
_ = _ >>> 4 | 0;
f = (15 & w) << 28 | f >>> 4;
if (!I) break;
}
if (!(l[o + 64 >> 2] | l[o + 68 >> 2]) | !(8 & u)) break p;
A = 1024 + (e >>> 4 | 0) | 0;
S = 2;
break p;
}
e = c;
if ((f = l[o + 64 >> 2]) | (_ = l[o + 68 >> 2])) for (;;) {
n[0 | (e = e - 1 | 0)] = 7 & f | 48;
w = !_ & f >>> 0 > 7 | 0 != (0 | _);
v = _;
_ = _ >>> 3 | 0;
f = (7 & v) << 29 | f >>> 3;
if (!w) break;
}
v = e;
if (!(8 & u)) break p;
d = (0 | (e = c - v | 0)) < (0 | d) ? d : e + 1 | 0;
break p;
}
_ = e = l[o + 68 >> 2];
f = l[o + 64 >> 2];
if ((0 | e) < 0) {
_ = 0 - (_ + (0 != (0 | f)) | 0) | 0;
f = 0 - f | 0;
l[o + 64 >> 2] = f;
l[o + 68 >> 2] = _;
S = 1;
A = 1024;
} else if (2048 & u) {
S = 1;
A = 1025;
} else A = (S = 1 & u) ? 1026 : 1024;
}
v = O(f, _, c);
}
if ((0 | d) < 0 && B) break s;
u = B ? -65537 & u : u;
if (!(d | 0 != ((_ = l[o + 64 >> 2]) | (e = l[o + 68 >> 2])))) {
b = v = c;
d = 0;
break o;
}
d = (0 | (e = !(e | _) + (c - v | 0) | 0)) < (0 | d) ? d : e;
break o;
}
u = 0 != (0 | (f = B = (0 | d) < 0 ? 2147483647 : d));
b = v = (e = l[o + 64 >> 2]) || 1353;
d: {
p: {
y: {
b: if (!(!(3 & (e = v)) | !f)) for (;;) {
if (!h[0 | e]) break y;
u = 0 != (0 | (f = f - 1 | 0));
if (!(3 & (e = e + 1 | 0))) break b;
if (!f) break;
}
if (!u) break p;
}
y: if (!(!h[0 | e] | f >>> 0 < 4)) for (;;) {
if ((-1 ^ (u = l[e >> 2])) & u - 16843009 & -2139062144) break y;
e = e + 4 | 0;
if (!((f = f - 4 | 0) >>> 0 > 3)) break;
}
if (f) for (;;) {
if (!h[0 | e]) break d;
e = e + 1 | 0;
if (!(f = f - 1 | 0)) break;
}
}
e = 0;
}
b = (e = e ? e - b | 0 : B) + v | 0;
if ((0 | d) >= 0) {
u = _;
d = e;
break o;
}
u = _;
d = e;
if (h[0 | b]) break s;
break o;
}
if (d) {
b = l[o + 64 >> 2];
break u;
}
e = 0;
z(t, 32, x, 0, u);
break m;
}
l[o + 12 >> 2] = 0;
l[o + 8 >> 2] = l[o + 64 >> 2];
b = o + 8 | 0;
l[o + 64 >> 2] = b;
d = -1;
}
e = 0;
u: {
for (;;) {
if (!(_ = l[b >> 2])) break u;
if (!((v = (0 | (_ = F(o + 4 | 0, _))) < 0) | _ >>> 0 > d - e >>> 0)) {
b = b + 4 | 0;
if (d >>> 0 > (e = e + _ | 0) >>> 0) continue;
break u;
}
break;
}
if (v) break e;
}
b = 61;
if ((0 | e) < 0) break i;
z(t, 32, x, e, u);
if (e) {
d = 0;
b = l[o + 64 >> 2];
for (;;) {
if (!(_ = l[b >> 2])) break m;
if ((d = (_ = F(o + 4 | 0, _)) + d | 0) >>> 0 > e >>> 0) break m;
E(t, o + 4 | 0, _);
b = b + 4 | 0;
if (!(e >>> 0 > d >>> 0)) break;
}
} else e = 0;
}
z(t, 32, x, e, 8192 ^ u);
e = (0 | e) < (0 | x) ? x : e;
continue r;
}
if ((0 | d) < 0 && B) break s;
b = 61;
if ((0 | (e = 0 | $[9](t, p[o + 64 >> 3], x, d, u, e))) >= 0) continue r;
break i;
}
n[o + 55 | 0] = l[o + 64 >> 2];
d = 1;
v = m;
u = _;
break o;
}
u = e + 1 | 0;
l[o + 76 >> 2] = u;
b = h[e + 1 | 0];
e = u;
}
if (t) break t;
if (!V) break n;
e = 1;
for (;;) {
if (t = l[(e << 2) + r >> 2]) {
R((e << 3) + s | 0, t, i);
g = 1;
if (10 != (0 | (e = e + 1 | 0))) continue;
break t;
}
break;
}
g = 1;
if (e >>> 0 >= 10) break t;
for (;;) {
if (l[(e << 2) + r >> 2]) break a;
if (10 == (0 | (e = e + 1 | 0))) break;
}
break t;
}
b = 28;
break i;
}
if ((0 | (d = (0 | d) < (0 | (f = b - v | 0)) ? f : d)) > (2147483647 - S | 0)) break s;
b = 61;
if ((0 | M) < (0 | (e = (0 | (_ = d + S | 0)) > (0 | x) ? _ : x))) break i;
z(t, 32, e, _, u);
E(t, A, S);
z(t, 48, e, _, 65536 ^ u);
z(t, 48, d, f, 0);
E(t, v, f);
z(t, 32, e, _, 8192 ^ u);
continue;
}
break;
}
g = 0;
break t;
}
b = 61;
}
l[625] = b;
}
g = -1;
}
C = o + 80 | 0;
return g;
}
function I(t) {
var e, i = 0, s = 0, r = 0, o = 0, a = 0, h = 0, c = 0, m = 0, u = 0, _ = 0, f = 0, p = 0, b = 0, v = 0, x = 0, A = 0, B = 0;
C = e = C - 80 | 0;
t: {
e: {
i: if (l[t + 112 >> 2]) {
f = l[t + 76 >> 2];
B = (b = (i = l[t + 60 >> 2]) >>> 0 < (a = i - l[t + 100 >> 2] | 0) >>> 0 ? 0 : a) >>> 8 | 0;
u = (v = l[t + 24 >> 2]) >>> 24 | 0;
_ = v >>> 16 | 0;
p = v >>> 8 | 0;
A = (x = l[t >> 2]) >>> 24 | 0;
h = x >>> 16 | 0;
c = x >>> 8 | 0;
i = a = l[t + 180 >> 2];
if ((0 | (o = l[t + 168 >> 2])) > 0) {
i = a;
for (;;) {
s = i - a | 0;
if (!(l[t + 4 >> 2] >= (s + 24 | 0))) {
if (!l[t + 204 >> 2]) break t;
if (!(!(1 & n[t + 200 | 0]) | !l[t + 208 >> 2])) {
l[e + 64 >> 2] = s;
G(t, 1, 1140, e - -64 | 0);
}
i = a;
s && $[l[t + 204 >> 2]](a, s, t, l[t + 176 >> 2]);
}
s = l[t + 164 >> 2] + (m << 3) | 0;
r = l[s + 4 >> 2];
s = l[s >> 2];
n[i + 20 | 0] = 0;
n[i + 21 | 0] = 0;
n[i + 22 | 0] = 0;
n[i + 23 | 0] = 0;
n[i + 19 | 0] = u;
n[i + 18 | 0] = _;
n[i + 17 | 0] = p;
n[i + 16 | 0] = v;
n[i + 15 | 0] = s >>> 24;
n[i + 14 | 0] = s >>> 16;
n[i + 13 | 0] = s >>> 8;
n[i + 12 | 0] = s;
n[i + 8 | 0] = r;
n[i + 7 | 0] = B;
n[i + 6 | 0] = b;
n[i + 4 | 0] = 82;
n[i + 5 | 0] = 0;
n[i + 3 | 0] = A;
n[i + 2 | 0] = h;
n[i + 1 | 0] = c;
n[0 | i] = x;
n[i + 11 | 0] = r >>> 24;
n[i + 10 | 0] = r >>> 16;
n[i + 9 | 0] = r >>> 8;
i = i + 24 | 0;
if ((0 | o) == (0 | (m = m + 1 | 0))) break;
}
}
l[t + 168 >> 2] = 0;
s: if (l[t + 64 >> 2]) {
l[t + 116 >> 2] = 0;
l[t + 120 >> 2] = 0;
} else {
if (!(o = l[t + 120 >> 2])) {
l[t + 120 >> 2] = 7e3;
l[t + 116 >> 2] = l[t + 76 >> 2] + 7e3;
break s;
}
if (((m = l[t + 76 >> 2]) - l[t + 116 >> 2] | 0) < 0) break s;
l[t + 72 >> 2] = 1 | l[t + 72 >> 2];
o = (o = ((o = o >>> 0 > 7e3 ? o : 7e3) >>> 1 | 0) + o | 0) >>> 0 < 12e4 ? o : 12e4;
l[t + 120 >> 2] = o;
l[t + 116 >> 2] = o + m;
}
if (1 & (m = l[t + 72 >> 2])) {
o = i - a | 0;
if (!(l[t + 4 >> 2] >= (o + 24 | 0))) {
if (!l[t + 204 >> 2]) break t;
if (!(!(1 & n[t + 200 | 0]) | !l[t + 208 >> 2])) {
l[e + 48 >> 2] = o;
G(t, 1, 1140, e + 48 | 0);
}
i = a;
o && $[l[t + 204 >> 2]](a, o, t, l[t + 176 >> 2]);
}
n[i + 20 | 0] = 0;
n[i + 21 | 0] = 0;
n[i + 22 | 0] = 0;
n[i + 23 | 0] = 0;
n[i + 19 | 0] = u;
n[i + 18 | 0] = _;
n[i + 17 | 0] = p;
n[i + 16 | 0] = v;
n[i + 12 | 0] = s;
n[i + 8 | 0] = r;
n[i + 7 | 0] = B;
n[i + 6 | 0] = b;
n[i + 4 | 0] = 83;
n[i + 5 | 0] = 0;
n[i + 3 | 0] = A;
n[i + 2 | 0] = h;
n[i + 1 | 0] = c;
n[0 | i] = x;
n[i + 15 | 0] = s >>> 24;
n[i + 14 | 0] = s >>> 16;
n[i + 13 | 0] = s >>> 8;
n[i + 11 | 0] = r >>> 24;
n[i + 10 | 0] = r >>> 16;
n[i + 9 | 0] = r >>> 8;
m = l[t + 72 >> 2];
i = i + 24 | 0;
}
if (2 & m) {
o = i - a | 0;
if (!(l[t + 4 >> 2] >= (o + 24 | 0))) {
if (!l[t + 204 >> 2]) break t;
if (!(!(1 & n[t + 200 | 0]) | !l[t + 208 >> 2])) {
l[e + 32 >> 2] = o;
G(t, 1, 1140, e + 32 | 0);
}
i = a;
o && $[l[t + 204 >> 2]](a, o, t, l[t + 176 >> 2]);
}
n[i + 20 | 0] = 0;
n[i + 21 | 0] = 0;
n[i + 22 | 0] = 0;
n[i + 23 | 0] = 0;
n[i + 19 | 0] = u;
n[i + 18 | 0] = _;
n[i + 17 | 0] = p;
n[i + 16 | 0] = v;
n[i + 12 | 0] = s;
n[i + 8 | 0] = r;
n[i + 7 | 0] = B;
n[i + 6 | 0] = b;
n[i + 4 | 0] = 84;
n[i + 5 | 0] = 0;
n[i + 3 | 0] = A;
n[i + 2 | 0] = h;
n[i + 1 | 0] = c;
n[0 | i] = x;
n[i + 15 | 0] = s >>> 24;
n[i + 14 | 0] = s >>> 16;
n[i + 13 | 0] = s >>> 8;
n[i + 11 | 0] = r >>> 24;
n[i + 10 | 0] = r >>> 16;
n[i + 9 | 0] = r >>> 8;
i = i + 24 | 0;
}
l[t + 72 >> 2] = 0;
o = l[t + 64 >> 2];
u = (s = l[t + 56 >> 2]) >>> 0 > o >>> 0 ? o : s;
l[t + 192 >> 2] || (u = (s = l[t + 68 >> 2]) >>> 0 > u >>> 0 ? u : s);
p = t + 148 | 0;
s: if (!(((s = l[t + 20 >> 2]) - (m = l[t + 16 >> 2] + u | 0) | 0) >= 0)) {
c = t + 132 | 0;
for (;;) {
if ((0 | (h = l[c >> 2])) == (0 | c)) break s;
o = l[h >> 2];
l[o + 4 >> 2] = l[h + 4 >> 2];
l[l[h + 4 >> 2] >> 2] = o;
o = l[t + 152 >> 2];
l[h >> 2] = p;
l[h + 4 >> 2] = o;
l[o >> 2] = h;
l[t + 152 >> 2] = h;
l[t + 104 >> 2] = l[t + 104 >> 2] - 1;
l[t + 96 >> 2] = l[t + 96 >> 2] + 1;
o = l[t >> 2];
l[h + 24 >> 2] = f;
l[h + 20 >> 2] = b;
l[h + 12 >> 2] = 81;
l[h + 8 >> 2] = o;
o = s + 1 | 0;
l[t + 20 >> 2] = o;
l[h + 28 >> 2] = s;
s = l[t + 24 >> 2];
l[h + 40 >> 2] = f;
l[h + 32 >> 2] = s;
s = l[t + 48 >> 2];
l[h + 48 >> 2] = 0;
l[h + 52 >> 2] = 0;
l[h + 44 >> 2] = s;
if (!(((s = o) - m | 0) < 0)) break;
}
}
o = t + 48 | 0;
A = 0;
s = (0 | (m = l[t + 184 >> 2])) > 0;
c = 0;
c = l[t + 108 >> 2] ? c : l[o >> 2] >> 3;
h = s ? m : -1;
if ((0 | p) != (0 | (r = l[t + 148 >> 2]))) {
m = c + f | 0;
_ = 0;
for (;;) {
s: {
if (c = l[r + 52 >> 2]) if ((f - l[r + 40 >> 2] | 0) >= 0) {
l[r + 52 >> 2] = c + 1;
l[t + 88 >> 2] = l[t + 88 >> 2] + 1;
s = o;
r: {
switch (l[t + 108 >> 2]) {
case 0:
s = ((s = l[o >> 2]) >>> 0 > (c = l[r + 44 >> 2]) >>> 0 ? s : c) + c | 0;
l[r + 44 >> 2] = s;
break r;

case 1:
s = r + 44 | 0;
}
s = l[r + 44 >> 2] + (l[s >> 2] / 2 | 0) | 0;
l[r + 44 >> 2] = s;
}
l[r + 40 >> 2] = s + f;
A = 1;
} else {
if (h >>> 0 > d[r + 48 >> 2]) break s;
if ((0 | (s = l[t + 188 >> 2])) < (0 | c) & (0 | s) > 0) break s;
l[r + 48 >> 2] = 0;
l[r + 52 >> 2] = c + 1;
l[r + 40 >> 2] = l[r + 44 >> 2] + f;
_ = _ + 1 | 0;
} else {
l[r + 52 >> 2] = 1;
s = l[o >> 2];
l[r + 44 >> 2] = s;
l[r + 40 >> 2] = s + m;
}
l[r + 24 >> 2] = f;
l[r + 20 >> 2] = b;
l[r + 32 >> 2] = l[t + 24 >> 2];
s = i - a | 0;
if (!(l[t + 4 >> 2] >= (24 + (s + l[r + 36 >> 2] | 0) | 0))) {
if (!l[t + 204 >> 2]) break t;
if (!(!(1 & n[t + 200 | 0]) | !l[t + 208 >> 2])) {
l[e + 16 >> 2] = s;
G(t, 1, 1140, e + 16 | 0);
}
i = a;
s && $[l[t + 204 >> 2]](a, s, t, l[t + 176 >> 2]);
}
s = l[r + 8 >> 2];
n[0 | i] = s;
n[i + 1 | 0] = s >>> 8;
n[i + 2 | 0] = s >>> 16;
n[i + 3 | 0] = s >>> 24;
n[i + 4 | 0] = l[r + 12 >> 2];
n[i + 5 | 0] = l[r + 16 >> 2];
s = l[r + 20 >> 2];
n[i + 6 | 0] = s;
n[i + 7 | 0] = s >>> 8;
s = l[r + 24 >> 2];
n[i + 8 | 0] = s;
n[i + 9 | 0] = s >>> 8;
n[i + 10 | 0] = s >>> 16;
n[i + 11 | 0] = s >>> 24;
s = l[r + 28 >> 2];
n[i + 12 | 0] = s;
n[i + 13 | 0] = s >>> 8;
n[i + 14 | 0] = s >>> 16;
n[i + 15 | 0] = s >>> 24;
s = l[r + 32 >> 2];
n[i + 16 | 0] = s;
n[i + 17 | 0] = s >>> 8;
n[i + 18 | 0] = s >>> 16;
n[i + 19 | 0] = s >>> 24;
s = l[r + 36 >> 2];
n[i + 20 | 0] = s;
n[i + 21 | 0] = s >>> 8;
n[i + 22 | 0] = s >>> 16;
n[i + 23 | 0] = s >>> 24;
i = i + 24 | 0;
(s = l[r + 36 >> 2]) && (i = D(i, r + 56 | 0, s) + l[r + 36 >> 2] | 0);
d[r + 52 >> 2] < d[t + 124 >> 2] || (l[t + 12 >> 2] = -1);
}
if ((0 | p) == (0 | (r = l[r >> 2]))) break;
}
} else _ = 0;
if ((0 | (i = i - a | 0)) > 0) {
if (!t) break e;
if (!(r = l[t + 204 >> 2])) break t;
if (!(!(1 & n[t + 200 | 0]) | !l[t + 208 >> 2])) {
l[e >> 2] = i;
G(t, 1, 1140, e);
r = l[t + 204 >> 2];
}
$[0 | r](a, i, t, l[t + 176 >> 2]);
}
if (_) {
a = (a = l[t + 20 >> 2] - l[t + 16 >> 2] | 0) >>> 0 < 4 ? 2 : a >>> 1 | 0;
l[t + 36 >> 2] = a;
a = h + a | 0;
l[t + 68 >> 2] = a;
l[t + 128 >> 2] = y(a, l[t + 8 >> 2]);
}
if (A) l[t + 36 >> 2] = u >>> 0 < 4 ? 2 : u >>> 1 | 0; else if (l[t + 68 >> 2]) break i;
l[t + 68 >> 2] = 1;
l[t + 128 >> 2] = l[t + 8 >> 2];
}
C = e + 80 | 0;
return;
}
S(1169, 1298, 206, 1116);
g();
}
S(1128, 1298, 207, 1116);
g();
}
function k(t) {
var e = 0, i = 0, s = 0, r = 0, n = 0, o = 0, a = 0, h = 0, c = 0;
t: if (t |= 0) {
n = (s = t - 8 | 0) + (t = -8 & (e = l[t - 4 >> 2])) | 0;
e: if (!(1 & e)) {
if (!(3 & e)) break t;
if ((s = s - (e = l[s >> 2]) | 0) >>> 0 < d[673]) break t;
t = t + e | 0;
if (l[674] == (0 | s)) {
if (3 == (3 & (e = l[n + 4 >> 2]))) {
l[671] = t;
l[n + 4 >> 2] = -2 & e;
l[s + 4 >> 2] = 1 | t;
l[t + s >> 2] = t;
return;
}
} else {
if (e >>> 0 <= 255) {
r = l[s + 8 >> 2];
e = e >>> 3 | 0;
if ((0 | (i = l[s + 12 >> 2])) == (0 | r)) {
h = 2676, c = l[669] & W(e), l[h >> 2] = c;
break e;
}
l[r + 12 >> 2] = i;
l[i + 8 >> 2] = r;
break e;
}
a = l[s + 24 >> 2];
if ((0 | s) == (0 | (e = l[s + 12 >> 2]))) if ((i = l[(r = s + 20 | 0) >> 2]) || (i = l[(r = s + 16 | 0) >> 2])) {
for (;;) {
o = r;
if (!(i = l[(r = (e = i) + 20 | 0) >> 2])) {
r = e + 16 | 0;
if (!(i = l[e + 16 >> 2])) break;
}
}
l[o >> 2] = 0;
} else e = 0; else {
i = l[s + 8 >> 2];
l[i + 12 >> 2] = e;
l[e + 8 >> 2] = i;
}
if (!a) break e;
r = l[s + 28 >> 2];
i: {
if (l[(i = 2980 + (r << 2) | 0) >> 2] == (0 | s)) {
l[i >> 2] = e;
if (e) break i;
h = 2680, c = l[670] & W(r), l[h >> 2] = c;
break e;
}
l[a + (l[a + 16 >> 2] == (0 | s) ? 16 : 20) >> 2] = e;
if (!e) break e;
}
l[e + 24 >> 2] = a;
if (i = l[s + 16 >> 2]) {
l[e + 16 >> 2] = i;
l[i + 24 >> 2] = e;
}
if (!(i = l[s + 20 >> 2])) break e;
l[e + 20 >> 2] = i;
l[i + 24 >> 2] = e;
}
}
if (!(s >>> 0 >= n >>> 0) && 1 & (e = l[n + 4 >> 2])) {
e: {
if (!(2 & e)) {
if (l[675] == (0 | n)) {
l[675] = s;
t = l[672] + t | 0;
l[672] = t;
l[s + 4 >> 2] = 1 | t;
if (l[674] != (0 | s)) break t;
l[671] = 0;
l[674] = 0;
return;
}
if (l[674] == (0 | n)) {
l[674] = s;
t = l[671] + t | 0;
l[671] = t;
l[s + 4 >> 2] = 1 | t;
l[t + s >> 2] = t;
return;
}
t = (-8 & e) + t | 0;
i: if (e >>> 0 <= 255) {
r = l[n + 8 >> 2];
e = e >>> 3 | 0;
if ((0 | (i = l[n + 12 >> 2])) == (0 | r)) {
h = 2676, c = l[669] & W(e), l[h >> 2] = c;
break i;
}
l[r + 12 >> 2] = i;
l[i + 8 >> 2] = r;
} else {
a = l[n + 24 >> 2];
if ((0 | n) == (0 | (e = l[n + 12 >> 2]))) if ((i = l[(r = n + 20 | 0) >> 2]) || (i = l[(r = n + 16 | 0) >> 2])) {
for (;;) {
o = r;
if (!(i = l[(r = (e = i) + 20 | 0) >> 2])) {
r = e + 16 | 0;
if (!(i = l[e + 16 >> 2])) break;
}
}
l[o >> 2] = 0;
} else e = 0; else {
i = l[n + 8 >> 2];
l[i + 12 >> 2] = e;
l[e + 8 >> 2] = i;
}
if (a) {
r = l[n + 28 >> 2];
s: {
if (l[(i = 2980 + (r << 2) | 0) >> 2] == (0 | n)) {
l[i >> 2] = e;
if (e) break s;
h = 2680, c = l[670] & W(r), l[h >> 2] = c;
break i;
}
l[a + (l[a + 16 >> 2] == (0 | n) ? 16 : 20) >> 2] = e;
if (!e) break i;
}
l[e + 24 >> 2] = a;
if (i = l[n + 16 >> 2]) {
l[e + 16 >> 2] = i;
l[i + 24 >> 2] = e;
}
if (i = l[n + 20 >> 2]) {
l[e + 20 >> 2] = i;
l[i + 24 >> 2] = e;
}
}
}
l[s + 4 >> 2] = 1 | t;
l[t + s >> 2] = t;
if (l[674] != (0 | s)) break e;
l[671] = t;
return;
}
l[n + 4 >> 2] = -2 & e;
l[s + 4 >> 2] = 1 | t;
l[t + s >> 2] = t;
}
if (t >>> 0 <= 255) {
e = 2716 + ((t = t >>> 3 | 0) << 3) | 0;
if ((i = l[669]) & (t = 1 << t)) t = l[e + 8 >> 2]; else {
l[669] = t | i;
t = e;
}
l[e + 8 >> 2] = s;
l[t + 12 >> 2] = s;
l[s + 12 >> 2] = e;
l[s + 8 >> 2] = t;
return;
}
r = 31;
l[s + 16 >> 2] = 0;
l[s + 20 >> 2] = 0;
if (t >>> 0 <= 16777215) {
e = t >>> 8 | 0;
e <<= o = e + 1048320 >>> 16 & 8;
r = 28 + ((e = ((e <<= r = e + 520192 >>> 16 & 4) << (i = e + 245760 >>> 16 & 2) >>> 15 | 0) - (i | r | o) | 0) << 1 | t >>> e + 21 & 1) | 0;
}
l[s + 28 >> 2] = r;
o = 2980 + (r << 2) | 0;
e: {
i: {
if ((i = l[670]) & (e = 1 << r)) {
r = t << (31 == (0 | r) ? 0 : 25 - (r >>> 1 | 0) | 0);
e = l[o >> 2];
for (;;) {
i = e;
if ((-8 & l[e + 4 >> 2]) == (0 | t)) break i;
e = r >>> 29 | 0;
r <<= 1;
if (!(e = l[16 + (o = i + (4 & e) | 0) >> 2])) break;
}
l[o + 16 >> 2] = s;
l[s + 24 >> 2] = i;
} else {
l[670] = e | i;
l[o >> 2] = s;
l[s + 24 >> 2] = o;
}
l[s + 12 >> 2] = s;
l[s + 8 >> 2] = s;
break e;
}
t = l[i + 8 >> 2];
l[t + 12 >> 2] = s;
l[i + 8 >> 2] = s;
l[s + 24 >> 2] = 0;
l[s + 12 >> 2] = i;
l[s + 8 >> 2] = t;
}
t = l[677] - 1 | 0;
l[677] = t || -1;
}
}
}
function D(t, e, i) {
var s, r = 0, o = 0;
if (i >>> 0 >= 512) {
A(0 | t, 0 | e, 0 | i);
return t;
}
s = t + i | 0;
t: if (3 & (t ^ e)) if (s >>> 0 < 4) i = t; else if ((r = s - 4 | 0) >>> 0 < t >>> 0) i = t; else {
i = t;
for (;;) {
n[0 | i] = h[0 | e];
n[i + 1 | 0] = h[e + 1 | 0];
n[i + 2 | 0] = h[e + 2 | 0];
n[i + 3 | 0] = h[e + 3 | 0];
e = e + 4 | 0;
if (!(r >>> 0 >= (i = i + 4 | 0) >>> 0)) break;
}
} else {
e: if (3 & t) if (i) {
i = t;
for (;;) {
n[0 | i] = h[0 | e];
e = e + 1 | 0;
if (!(3 & (i = i + 1 | 0))) break e;
if (!(i >>> 0 < s >>> 0)) break;
}
} else i = t; else i = t;
if (!((r = -4 & s) >>> 0 < 64 || (o = r + -64 | 0) >>> 0 < i >>> 0)) for (;;) {
l[i >> 2] = l[e >> 2];
l[i + 4 >> 2] = l[e + 4 >> 2];
l[i + 8 >> 2] = l[e + 8 >> 2];
l[i + 12 >> 2] = l[e + 12 >> 2];
l[i + 16 >> 2] = l[e + 16 >> 2];
l[i + 20 >> 2] = l[e + 20 >> 2];
l[i + 24 >> 2] = l[e + 24 >> 2];
l[i + 28 >> 2] = l[e + 28 >> 2];
l[i + 32 >> 2] = l[e + 32 >> 2];
l[i + 36 >> 2] = l[e + 36 >> 2];
l[i + 40 >> 2] = l[e + 40 >> 2];
l[i + 44 >> 2] = l[e + 44 >> 2];
l[i + 48 >> 2] = l[e + 48 >> 2];
l[i + 52 >> 2] = l[e + 52 >> 2];
l[i + 56 >> 2] = l[e + 56 >> 2];
l[i + 60 >> 2] = l[e + 60 >> 2];
e = e - -64 | 0;
if (!(o >>> 0 >= (i = i - -64 | 0) >>> 0)) break;
}
if (i >>> 0 >= r >>> 0) break t;
for (;;) {
l[i >> 2] = l[e >> 2];
e = e + 4 | 0;
if (!(r >>> 0 > (i = i + 4 | 0) >>> 0)) break;
}
}
if (i >>> 0 < s >>> 0) for (;;) {
n[0 | i] = h[0 | e];
e = e + 1 | 0;
if ((0 | s) == (0 | (i = i + 1 | 0))) break;
}
return t;
}
function T(t, e, i) {
var s = 0, r = 0, n = 0, o = 0, a = 0, l = 0, h = 0, c = 0, m = 0;
s = t;
t: {
e: {
i: {
s: {
r: {
n: {
o: {
a: {
l: {
h: {
if (e) {
if (!i) break h;
break l;
}
t = (s >>> 0) / (i >>> 0) | 0;
V = 0;
break t;
}
if (!s) break a;
break o;
}
if (!(i - 1 & i)) break n;
r = 0 - (o = (v(i) + 33 | 0) - v(e) | 0) | 0;
break s;
}
t = (e >>> 0) / 0 | 0;
V = 0;
break t;
}
if ((t = 32 - v(e) | 0) >>> 0 < 31) break r;
break i;
}
if (1 == (0 | i)) break e;
i = 31 & (t = i ? 31 - v(i - 1 ^ i) | 0 : 32);
if ((63 & t) >>> 0 >= 32) {
t = 0;
e = e >>> i | 0;
} else {
t = e >>> i | 0;
e = ((1 << i) - 1 & e) << 32 - i | s >>> i;
}
V = t;
t = e;
break t;
}
o = t + 1 | 0;
r = 63 - t | 0;
}
n = 31 & (t = 63 & o);
if (t >>> 0 >= 32) {
t = 0;
l = e >>> n | 0;
} else {
t = e >>> n | 0;
l = ((1 << n) - 1 & e) << 32 - n | s >>> n;
}
n = t;
r = 31 & (t = 63 & r);
if (t >>> 0 >= 32) {
t = s << r;
s = 0;
} else {
t = (1 << r) - 1 & s >>> 32 - r | e << r;
s <<= r;
}
e = t;
if (o) {
c = -1 != (0 | (r = i - 1 | 0)) ? 0 : -1;
for (;;) {
l = (t = l << 1 | e >>> 31) - (h = i & (a = c - ((n = n << 1 | l >>> 31) + (t >>> 0 > r >>> 0) | 0) >> 31)) | 0;
n = n - (t >>> 0 < h >>> 0) | 0;
e = e << 1 | s >>> 31;
s = m | s << 1;
m = a &= 1;
if (!(o = o - 1 | 0)) break;
}
}
V = e << 1 | s >>> 31;
t = a | s << 1;
break t;
}
s = 0;
e = 0;
}
V = e;
t = s;
}
return t;
}
function G(t, e, i, s) {
var r, o = 0, a = 0, h = 0, c = 0;
C = r = C - 1040 | 0;
if (!(!(l[t + 200 >> 2] & e) | !l[t + 208 >> 2])) {
l[r + 12 >> 2] = s;
C = e = C - 160 | 0;
l[e + 148 >> 2] = 2147483646;
h = r + 16 | 0;
l[e + 144 >> 2] = h;
o = L(e, 0, 144);
l[o + 76 >> 2] = -1;
l[o + 36 >> 2] = 11;
l[o + 80 >> 2] = -1;
l[o + 44 >> 2] = o + 159;
l[o + 84 >> 2] = o + 144;
n[0 | h] = 0;
C = a = C - 208 | 0;
l[a + 204 >> 2] = s;
L(e = a + 160 | 0, 0, 40);
l[a + 200 >> 2] = l[a + 204 >> 2];
if (!((0 | P(0, i, a + 200 | 0, a + 80 | 0, e)) < 0)) {
e = l[o + 76 >> 2] >= 0;
s = l[o >> 2];
l[o + 72 >> 2] <= 0 && (l[o >> 2] = -33 & s);
t: {
e: {
if (l[o + 48 >> 2]) {
if (l[o + 16 >> 2]) break e;
} else {
l[o + 48 >> 2] = 80;
l[o + 28 >> 2] = 0;
l[o + 16 >> 2] = 0;
l[o + 20 >> 2] = 0;
c = l[o + 44 >> 2];
l[o + 44 >> 2] = a;
}
if (J(o)) break t;
}
P(o, i, a + 200 | 0, a + 80 | 0, a + 160 | 0);
}
if (c) {
$[l[o + 36 >> 2]](o, 0, 0);
l[o + 48 >> 2] = 0;
l[o + 44 >> 2] = c;
l[o + 28 >> 2] = 0;
l[o + 16 >> 2] = 0;
l[o + 20 >> 2] = 0;
}
l[o >> 2] = l[o >> 2] | 32 & s;
}
C = a + 208 | 0;
C = o + 160 | 0;
$[l[t + 208 >> 2]](h, t, l[t + 176 >> 2]);
}
C = r + 1040 | 0;
}
function R(t, e, i) {
switch (e - 9 | 0) {
case 0:
e = l[i >> 2];
l[i >> 2] = e + 4;
l[t >> 2] = l[e >> 2];
return;

case 6:
e = l[i >> 2];
l[i >> 2] = e + 4;
e = a[e >> 1];
l[t >> 2] = e;
l[t + 4 >> 2] = e >> 31;
return;

case 7:
e = l[i >> 2];
l[i >> 2] = e + 4;
l[t >> 2] = f[e >> 1];
l[t + 4 >> 2] = 0;
return;

case 8:
e = l[i >> 2];
l[i >> 2] = e + 4;
e = n[0 | e];
l[t >> 2] = e;
l[t + 4 >> 2] = e >> 31;
return;

case 9:
e = l[i >> 2];
l[i >> 2] = e + 4;
l[t >> 2] = h[0 | e];
l[t + 4 >> 2] = 0;
return;

case 16:
e = l[i >> 2] + 7 & -8;
l[i >> 2] = e + 8;
p[t >> 3] = p[e >> 3];
return;

case 17:
$[10](t, i);

default:
return;

case 1:
case 4:
case 14:
e = l[i >> 2];
l[i >> 2] = e + 4;
e = l[e >> 2];
l[t >> 2] = e;
l[t + 4 >> 2] = e >> 31;
return;

case 2:
case 5:
case 11:
case 15:
e = l[i >> 2];
l[i >> 2] = e + 4;
l[t >> 2] = l[e >> 2];
l[t + 4 >> 2] = 0;
return;

case 3:
case 10:
case 12:
case 13:
}
e = l[i >> 2] + 7 & -8;
l[i >> 2] = e + 8;
i = l[e + 4 >> 2];
l[t >> 2] = l[e >> 2];
l[t + 4 >> 2] = i;
}
function L(t, e, i) {
var s = 0, r = 0, o = 0;
if (i) {
n[0 | t] = e;
n[(r = t + i | 0) - 1 | 0] = e;
if (!(i >>> 0 < 3)) {
n[t + 2 | 0] = e;
n[t + 1 | 0] = e;
n[r - 3 | 0] = e;
n[r - 2 | 0] = e;
if (!(i >>> 0 < 7)) {
n[t + 3 | 0] = e;
n[r - 4 | 0] = e;
if (!(i >>> 0 < 9)) {
o = (r = 0 - t & 3) + t | 0;
s = y(255 & e, 16843009);
l[o >> 2] = s;
l[(i = (e = i - r & -4) + o | 0) - 4 >> 2] = s;
if (!(e >>> 0 < 9)) {
l[o + 8 >> 2] = s;
l[o + 4 >> 2] = s;
l[i - 8 >> 2] = s;
l[i - 12 >> 2] = s;
if (!(e >>> 0 < 25)) {
l[o + 24 >> 2] = s;
l[o + 20 >> 2] = s;
l[o + 16 >> 2] = s;
l[o + 12 >> 2] = s;
l[i - 16 >> 2] = s;
l[i - 20 >> 2] = s;
l[i - 24 >> 2] = s;
l[i - 28 >> 2] = s;
if (!((i = (i = e) - (e = 4 & o | 24) | 0) >>> 0 < 32)) {
s = N(s, 0, 1, 1);
r = V;
e = e + o | 0;
for (;;) {
l[e + 24 >> 2] = s;
l[e + 28 >> 2] = r;
l[e + 16 >> 2] = s;
l[e + 20 >> 2] = r;
l[e + 8 >> 2] = s;
l[e + 12 >> 2] = r;
l[e >> 2] = s;
l[e + 4 >> 2] = r;
e = e + 32 | 0;
if (!((i = i - 32 | 0) >>> 0 > 31)) break;
}
}
}
}
}
}
}
}
return t;
}
function F(t, e) {
if (!t) return 0;
t: {
e: {
if (t) {
if (e >>> 0 <= 127) break e;
if (l[l[662] >> 2]) {
if (e >>> 0 <= 2047) {
n[t + 1 | 0] = 63 & e | 128;
n[0 | t] = e >>> 6 | 192;
t = 2;
break t;
}
if (!(57344 != (-8192 & e) & e >>> 0 >= 55296)) {
n[t + 2 | 0] = 63 & e | 128;
n[0 | t] = e >>> 12 | 224;
n[t + 1 | 0] = e >>> 6 & 63 | 128;
t = 3;
break t;
}
if (e - 65536 >>> 0 <= 1048575) {
n[t + 3 | 0] = 63 & e | 128;
n[0 | t] = e >>> 18 | 240;
n[t + 2 | 0] = e >>> 6 & 63 | 128;
n[t + 1 | 0] = e >>> 12 & 63 | 128;
t = 4;
break t;
}
} else if (57216 == (-128 & e)) break e;
l[625] = 25;
t = -1;
} else t = 1;
break t;
}
n[0 | t] = e;
t = 1;
}
return t;
}
function E(t, e, i) {
var s = 0, r = 0, n = 0;
if (!(32 & h[0 | t])) t: {
s = e;
e: {
if (!(t = l[(e = t) + 16 >> 2])) {
if (J(e)) break e;
t = l[e + 16 >> 2];
}
if (t - (n = l[e + 20 >> 2]) >>> 0 < i >>> 0) {
$[l[e + 36 >> 2]](e, s, i);
break t;
}
i: if (!(l[e + 80 >> 2] < 0)) {
t = i;
for (;;) {
r = t;
if (!t) break i;
if (10 == h[s + (t = r - 1 | 0) | 0]) break;
}
if ($[l[e + 36 >> 2]](e, s, r) >>> 0 < r >>> 0) break e;
s = s + r | 0;
i = i - r | 0;
n = l[e + 20 >> 2];
}
D(n, s, i);
l[e + 20 >> 2] = l[e + 20 >> 2] + i;
}
}
}
function O(t, e, i) {
var s = 0, r = 0, o = 0;
if (e) for (;;) {
r = N(s = T(t, e, 10), o = V, 10, 0);
n[0 | (i = i - 1 | 0)] = t - r | 48;
r = e >>> 0 > 9;
t = s;
e = o;
if (!r) break;
} else s = t;
if (s) for (;;) {
t = (s >>> 0) / 10 | 0;
n[0 | (i = i - 1 | 0)] = s - y(t, 10) | 48;
e = s >>> 0 > 9;
s = t;
if (!e) break;
}
return i;
}
function j(t, e) {
var i, s, r = 0;
_(+t);
i = 0 | c(1);
s = 0 | c(0);
if (2047 != (0 | (r = i >>> 20 & 2047))) {
if (!r) {
if (0 == t) r = 0; else {
t = j(0x10000000000000000 * t, e);
r = l[e >> 2] + -64 | 0;
}
l[e >> 2] = r;
return t;
}
l[e >> 2] = r - 1022;
m(0, 0 | s);
m(1, -2146435073 & i | 1071644672);
t = +u();
}
return t;
}
function q(t) {
var e = 0, i = 0, s = 0;
if (n[l[t >> 2]] - 48 >>> 0 >= 10) return 0;
for (;;) {
s = l[t >> 2];
i = -1;
e >>> 0 <= 214748364 && (i = (0 | (i = n[0 | s] - 48 | 0)) > (2147483647 - (e = y(e, 10)) | 0) ? -1 : i + e | 0);
l[t >> 2] = s + 1;
e = i;
if (!(n[s + 1 | 0] - 48 >>> 0 < 10)) break;
}
return e;
}
function N(t, e, i, s) {
var r, n, o, a, l = 0, h = 0;
a = y(l = i >>> 16 | 0, h = t >>> 16 | 0);
l = (65535 & (h = ((o = y(r = 65535 & i, n = 65535 & t)) >>> 16 | 0) + y(h, r) | 0)) + y(l, n) | 0;
V = (y(e, i) + a | 0) + y(t, s) + (h >>> 16) + (l >>> 16) | 0;
return 65535 & o | l << 16;
}
function z(t, e, i, s, r) {
var n;
C = n = C - 256 | 0;
if (!(73728 & r | (0 | i) <= (0 | s))) {
L(n, 255 & e, (s = (i = i - s | 0) >>> 0 < 256) ? i : 256);
if (!s) for (;;) {
E(t, n, 256);
if (!((i = i - 256 | 0) >>> 0 > 255)) break;
}
E(t, n, i);
}
C = n + 256 | 0;
}
function J(t) {
var e = 0;
e = l[t + 72 >> 2];
l[t + 72 >> 2] = e - 1 | e;
if (8 & (e = l[t >> 2])) {
l[t >> 2] = 32 | e;
return -1;
}
l[t + 4 >> 2] = 0;
l[t + 8 >> 2] = 0;
e = l[t + 44 >> 2];
l[t + 28 >> 2] = e;
l[t + 20 >> 2] = e;
l[t + 16 >> 2] = e + l[t + 48 >> 2];
return 0;
}
function U(t) {
var e, i;
if (!((t = (e = l[476]) + (i = t + 3 & -4) | 0) >>> 0 <= e >>> 0 && i) && (!(t >>> 0 > Y() << 16 >>> 0) || 0 | B(0 | t))) {
l[476] = t;
return e;
}
l[625] = 48;
return -1;
}
function H(t) {
var e = 0;
t = t || 1;
t: {
for (;;) {
if (e = M(t)) break t;
if (!(e = l[668])) break;
$[0 | e]();
}
w();
g();
}
return e;
}
function W(t) {
var e;
return (-1 >>> (e = 31 & t) & -2) << e | (-1 << (t = 0 - t & 31) & -2) >>> t;
}
function K(t) {
(t |= 0) && $[l[l[t >> 2] + 8 >> 2]](t);
}
function X(t) {
return 0 | t;
}
function Z(t) {
k(t |= 0);
}
i = h;
o();
var $ = e([ null, function(t, e, i, s) {
t |= 0;
e |= 0;
i |= 0;
var r;
i = l[(s |= 0) >> 2];
r = l[i + 4 >> 2];
return 0 | $[l[l[r >> 2] >> 2]](r, t, e, i, l[s + 4 >> 2]);
}, function(t, e, i) {
t |= 0;
e |= 0;
var s;
e = l[(i |= 0) >> 2];
s = l[e + 8 >> 2];
$[l[l[s >> 2] >> 2]](s, t, e, l[i + 4 >> 2]);
}, function(t, e, i, s, r) {
t |= 0;
e |= 0;
i |= 0;
s |= 0;
r |= 0;
var n;
C = n = C - 32 | 0;
l[n + 16 >> 2] = r;
l[n + 12 >> 2] = s;
l[n + 8 >> 2] = i;
l[n + 4 >> 2] = e;
l[n >> 2] = t;
t = 0 | x(2006, 1380, 0 | n);
C = n + 32 | 0;
return 0 | t;
}, X, Z, function(t, e, i, s) {
t |= 0;
e |= 0;
i |= 0;
s |= 0;
var r;
C = r = C - 16 | 0;
l[r + 12 >> 2] = s;
l[r + 8 >> 2] = i;
l[r + 4 >> 2] = e;
l[r >> 2] = t;
t = 0 | x(2250, 1408, 0 | r);
C = r + 16 | 0;
return 0 | t;
}, X, Z, function(t, e, i, s, r, o) {
t |= 0;
e = +e;
i |= 0;
s |= 0;
r |= 0;
o |= 0;
var a, m = 0, u = 0, f = 0, d = 0, p = 0, v = 0, g = 0, S = 0, x = 0, A = 0, B = 0, w = 0, M = 0, P = 0, I = 0, k = 0, D = 0, G = 0;
C = a = C - 560 | 0;
l[a + 44 >> 2] = 0;
_(+e);
m = 0 | c(1);
c(0);
if ((0 | m) < 0) {
w = 1;
I = 1034;
_(+(e = -e));
m = 0 | c(1);
c(0);
} else if (2048 & r) {
w = 1;
I = 1037;
} else {
I = (w = 1 & r) ? 1040 : 1035;
G = !w;
}
t: if (2146435072 != (2146435072 & m)) {
P = a + 16 | 0;
e: {
i: {
s: {
e = j(e, a + 44 | 0);
if (0 != (e += e)) {
m = l[a + 44 >> 2];
l[a + 44 >> 2] = m - 1;
if (97 != (0 | (M = 32 | o))) break s;
break e;
}
if (97 == (0 | (M = 32 | o))) break e;
p = l[a + 44 >> 2];
v = (0 | s) < 0 ? 6 : s;
break i;
}
p = m - 29 | 0;
l[a + 44 >> 2] = p;
e *= 268435456;
v = (0 | s) < 0 ? 6 : s;
}
u = S = (0 | p) < 0 ? a + 48 | 0 : a + 336 | 0;
for (;;) {
s = e < 4294967296 & e >= 0 ? ~~e >>> 0 : 0;
l[u >> 2] = s;
u = u + 4 | 0;
if (0 == (e = 1e9 * (e - +(s >>> 0)))) break;
}
if ((0 | p) <= 0) {
s = p;
m = u;
d = S;
} else {
d = S;
s = p;
for (;;) {
s = s >>> 0 < 29 ? s : 29;
if (!(d >>> 0 > (m = u - 4 | 0) >>> 0)) {
f = 0;
for (;;) {
x = l[m >> 2];
g = 31 & s;
k = f;
if ((63 & s) >>> 0 >= 32) {
f = x << g;
x = 0;
} else {
f = (1 << g) - 1 & x >>> 32 - g;
x <<= g;
}
f = f + D | 0;
x = N(f = T(g = k + x | 0, f = g >>> 0 < x >>> 0 ? f + 1 | 0 : f, 1e9), V, 1e9, 0);
l[m >> 2] = g - x;
if (!(d >>> 0 <= (m = m - 4 | 0) >>> 0)) break;
}
f && (l[(d = d - 4 | 0) >> 2] = f);
}
for (;d >>> 0 < (m = u) >>> 0 && !l[(u = m - 4 | 0) >> 2]; ) ;
s = l[a + 44 >> 2] - s | 0;
l[a + 44 >> 2] = s;
u = m;
if (!((0 | s) > 0)) break;
}
}
u = (v + 25 >>> 0) / 9 | 0;
if ((0 | s) < 0) {
g = u + 1 | 0;
x = 102 == (0 | M);
for (;;) {
f = (s = 0 - s | 0) >>> 0 < 9 ? s : 9;
i: if (m >>> 0 > d >>> 0) {
D = 1e9 >>> f | 0;
A = -1 << f ^ -1;
s = 0;
u = d;
for (;;) {
k = s;
s = l[u >> 2];
l[u >> 2] = k + (s >>> f | 0);
s = y(s & A, D);
if (!((u = u + 4 | 0) >>> 0 < m >>> 0)) break;
}
u = l[d >> 2];
if (!s) break i;
l[m >> 2] = s;
m = m + 4 | 0;
} else u = l[d >> 2];
s = f + l[a + 44 >> 2] | 0;
l[a + 44 >> 2] = s;
d = (!u << 2) + d | 0;
m = (0 | g) < m - (u = x ? S : d) >> 2 ? u + (g << 2) | 0 : m;
if (!((0 | s) < 0)) break;
}
}
s = 0;
if (!(m >>> 0 <= d >>> 0)) {
s = y(S - d >> 2, 9);
u = 10;
if (!((f = l[d >> 2]) >>> 0 < 10)) for (;;) {
s = s + 1 | 0;
if (!(f >>> 0 >= (u = y(u, 10)) >>> 0)) break;
}
}
if ((0 | (u = (v - (102 == (0 | M) ? 0 : s) | 0) - (103 == (0 | M) & 0 != (0 | v)) | 0)) < (y(m - S >> 2, 9) - 9 | 0)) {
p = ((((0 | p) < 0 ? 4 : 292) + a | 0) + ((g = (0 | (f = u + 9216 | 0)) / 9 | 0) << 2) | 0) - 4048 | 0;
u = 10;
if ((0 | (f = f - y(g, 9) | 0)) <= 7) for (;;) {
u = y(u, 10);
if (8 == (0 | (f = f + 1 | 0))) break;
}
if (!(!(f = (g = l[p >> 2]) - y(u, x = (g >>> 0) / (u >>> 0) | 0) | 0) & (0 | (A = p + 4 | 0)) == (0 | m))) {
i: {
if (!(1 & x)) {
e = 9007199254740992;
if (!(1 & n[p - 4 | 0]) | 1e9 != (0 | u) | d >>> 0 >= p >>> 0) break i;
}
e = 9007199254740994;
}
B = (0 | m) == (0 | A) ? 1 : 1.5;
B = f >>> 0 < (A = u >>> 1 | 0) >>> 0 ? .5 : (0 | f) == (0 | A) ? B : 1.5;
if (!(45 != h[0 | I] | G)) {
B = -B;
e = -e;
}
f = g - f | 0;
l[p >> 2] = f;
if (e + B != e) {
s = u + f | 0;
l[p >> 2] = s;
if (s >>> 0 >= 1e9) for (;;) {
l[p >> 2] = 0;
(p = p - 4 | 0) >>> 0 < d >>> 0 && (l[(d = d - 4 | 0) >> 2] = 0);
s = l[p >> 2] + 1 | 0;
l[p >> 2] = s;
if (!(s >>> 0 > 999999999)) break;
}
s = y(S - d >> 2, 9);
u = 10;
if (!((f = l[d >> 2]) >>> 0 < 10)) for (;;) {
s = s + 1 | 0;
if (!(f >>> 0 >= (u = y(u, 10)) >>> 0)) break;
}
}
}
m = m >>> 0 > (u = p + 4 | 0) >>> 0 ? u : m;
}
for (;;) {
u = m;
if ((f = m >>> 0 <= d >>> 0) || l[(m = u - 4 | 0) >> 2]) break;
}
if (103 == (0 | M)) {
v = ((p = (0 | (m = v || 1)) > (0 | s) & (0 | s) > -5) ? -1 ^ s : -1) + m | 0;
o = (p ? -1 : -2) + o | 0;
if (!(p = 8 & r)) {
m = -9;
if (!f && (g = l[u - 4 >> 2])) {
f = 10;
m = 0;
if (!((g >>> 0) % 10 | 0)) {
for (;;) {
p = m;
m = m + 1 | 0;
if ((g >>> 0) % ((f = y(f, 10)) >>> 0) | 0) break;
}
m = -1 ^ p;
}
}
f = y(u - S >> 2, 9);
if (70 != (-33 & o)) {
p = 0;
v = (0 | (m = (0 | (m = ((s + f | 0) + m | 0) - 9 | 0)) > 0 ? m : 0)) > (0 | v) ? v : m;
} else {
p = 0;
v = (0 | (m = (0 | (m = (m + f | 0) - 9 | 0)) > 0 ? m : 0)) > (0 | v) ? v : m;
}
}
} else p = 8 & r;
f = -1;
if ((0 | ((m = p | v) ? 2147483645 : 2147483646)) < (0 | v)) break t;
g = 1 + ((M = 0 != (0 | m)) + v | 0) | 0;
if (70 != (0 | (x = -33 & o))) {
if ((P - (m = O((m = s >> 31) + s ^ m, 0, P)) | 0) <= 1) for (;;) {
n[0 | (m = m - 1 | 0)] = 48;
if (!((P - m | 0) < 2)) break;
}
n[0 | (A = m - 2 | 0)] = o;
n[m - 1 | 0] = (0 | s) < 0 ? 45 : 43;
if ((0 | (m = P - A | 0)) > (2147483647 - g | 0)) break t;
} else {
if ((2147483647 - g | 0) < (0 | s)) break t;
m = (0 | s) > 0 ? s : 0;
}
if ((0 | (s = m + g | 0)) > (2147483647 ^ w)) break t;
z(t, 32, i, o = s + w | 0, r);
E(t, I, w);
z(t, 48, i, o, 65536 ^ r);
i: {
s: {
r: {
if (70 == (0 | x)) {
s = 8 | (m = a + 16 | 0);
p = 9 | m;
d = f = d >>> 0 > S >>> 0 ? S : d;
for (;;) {
m = O(l[d >> 2], 0, p);
n: if ((0 | f) == (0 | d)) {
if ((0 | m) == (0 | p)) {
n[a + 24 | 0] = 48;
m = s;
}
} else {
if (a + 16 >>> 0 >= m >>> 0) break n;
for (;;) {
n[0 | (m = m - 1 | 0)] = 48;
if (!(a + 16 >>> 0 < m >>> 0)) break;
}
}
E(t, m, p - m | 0);
if (!(S >>> 0 >= (d = d + 4 | 0) >>> 0)) break;
}
m = 0;
if (!M) break s;
E(t, 1351, 1);
if ((0 | v) <= 0 | u >>> 0 <= d >>> 0) break r;
for (;;) {
if ((m = O(l[d >> 2], 0, p)) >>> 0 > a + 16 >>> 0) for (;;) {
n[0 | (m = m - 1 | 0)] = 48;
if (!(a + 16 >>> 0 < m >>> 0)) break;
}
E(t, m, (0 | v) < 9 ? v : 9);
m = v - 9 | 0;
if (u >>> 0 <= (d = d + 4 | 0) >>> 0) break s;
s = (0 | v) > 9;
v = m;
if (!s) break;
}
break s;
}
n: if (!((0 | v) < 0)) {
f = u >>> 0 > d >>> 0 ? u : d + 4 | 0;
S = 9 | (s = a + 16 | 0);
s |= 8;
u = d;
for (;;) {
if ((0 | S) == (0 | (m = O(l[u >> 2], 0, S)))) {
n[a + 24 | 0] = 48;
m = s;
}
o: if ((0 | u) == (0 | d)) {
E(t, m, 1);
m = m + 1 | 0;
p | v && E(t, 1351, 1);
} else {
if (a + 16 >>> 0 >= m >>> 0) break o;
for (;;) {
n[0 | (m = m - 1 | 0)] = 48;
if (!(a + 16 >>> 0 < m >>> 0)) break;
}
}
E(t, k = m, (0 | (m = S - m | 0)) < (0 | v) ? m : v);
v = v - m | 0;
if (f >>> 0 <= (u = u + 4 | 0) >>> 0) break n;
if (!((0 | v) >= 0)) break;
}
}
z(t, 48, v + 18 | 0, 18, 0);
E(t, A, P - A | 0);
break i;
}
m = v;
}
z(t, 48, m + 9 | 0, 9, 0);
}
z(t, 32, i, o, 8192 ^ r);
f = (0 | i) > (0 | o) ? i : o;
break t;
}
v = (o << 26 >> 31 & 9) + I | 0;
if (!(s >>> 0 > 11)) {
m = 12 - s | 0;
B = 16;
for (;;) {
B *= 16;
if (!(m = m - 1 | 0)) break;
}
e = 45 != h[0 | v] ? e + B - B : -(B + (-e - B));
}
if ((0 | P) == (0 | (m = O((m = (u = l[a + 44 >> 2]) >> 31) ^ m + u, 0, P)))) {
n[a + 15 | 0] = 48;
m = a + 15 | 0;
}
p = 2 | w;
d = 32 & o;
u = l[a + 44 >> 2];
n[0 | (S = m - 2 | 0)] = o + 15;
n[m - 1 | 0] = (0 | u) < 0 ? 45 : 43;
f = 8 & r;
u = a + 16 | 0;
for (;;) {
o = u;
m = b(e) < 2147483648 ? ~~e : -2147483648;
n[0 | u] = d | h[m + 1888 | 0];
e = 16 * (e - +(0 | m));
if (!(!(f || (0 | s) > 0 | 0 != e) | 1 != ((u = o + 1 | 0) - (a + 16 | 0) | 0))) {
n[o + 1 | 0] = 46;
u = o + 2 | 0;
}
if (0 == e) break;
}
f = -1;
if (!((2147483645 - (o = (g = P - S | 0) + p | 0) | 0) < (0 | s))) {
z(t, 32, i, s = (m = !s || ((d = u - (a + 16 | 0) | 0) - 2 | 0) >= (0 | s) ? d = u - (a + 16 | 0) | 0 : s + 2 | 0) + o | 0, r);
E(t, v, p);
z(t, 48, i, s, 65536 ^ r);
E(t, a + 16 | 0, d);
z(t, 48, m - d | 0, 0, 0);
E(t, S, g);
z(t, 32, i, s, 8192 ^ r);
f = (0 | i) > (0 | s) ? i : s;
}
} else {
z(t, 32, i, s = w + 3 | 0, -65537 & r);
E(t, I, w);
o &= 32;
E(t, e != e ? o ? 1173 : 1314 : o ? 1195 : 1334, 3);
z(t, 32, i, s, 8192 ^ r);
f = (0 | i) > (0 | s) ? i : s;
}
C = a + 560 | 0;
return 0 | f;
}, function(t, e) {
t |= 0;
var i, s, r, n, o, a = 0, h = 0, c = 0, _ = 0, f = 0, d = 0, y = 0, b = 0, v = 0, g = 0, S = 0;
h = e |= 0;
e = l[e >> 2] + 7 & -8;
l[h >> 2] = e + 16;
r = t;
b = l[(t = e) >> 2];
e = l[t + 4 >> 2];
s = c = l[t + 12 >> 2];
C = i = C - 32 | 0;
t: if ((0 | (a = (c &= 2147483647) - 1006698496 | 0)) == (0 | (_ = c - 1140785152 | 0)) & (h = l[t + 8 >> 2]) >>> 0 < h >>> 0 | a >>> 0 < _ >>> 0) {
a = (t = h) << 4 | e >>> 28;
c = h = s << 4 | t >>> 28;
e = t = 268435455 & e;
if (134217728 == (0 | t) & 0 != (0 | b) | t >>> 0 > 134217728) {
t = c + 1073741824 | 0;
t = (e = a + 1 | 0) ? t : t + 1 | 0;
a = e;
break t;
}
t = c + 1073741824 | 0;
if (134217728 ^ e | b) break t;
t = (e = 1 & a) >>> 0 > (a = c = e + a | 0) >>> 0 ? t + 1 | 0 : t;
} else if (!h & 2147418112 == (0 | c) ? !(e | b) : c >>> 0 < 2147418112) {
a = 0;
t = 2146435072;
if (!(c >>> 0 > 1140785151)) {
t = 0;
if (!((g = c >>> 16 | 0) >>> 0 < 15249)) {
a = b;
t = e;
c = _ = 65535 & s | 65536;
v = h;
f = h;
if (64 & (y = g - 15233 | 0)) {
_ = a;
a = 31 & (h = y + -64 | 0);
if ((63 & h) >>> 0 >= 32) {
t = _ << a;
f = 0;
} else {
t = (1 << a) - 1 & _ >>> 32 - a | t << a;
f = _ << a;
}
_ = t;
a = 0;
t = 0;
} else if (y) {
d = 31 & (h = y);
if ((63 & h) >>> 0 >= 32) {
h = f << d;
f = 0;
} else {
h = (1 << d) - 1 & f >>> 32 - d | _ << d;
f <<= d;
}
_ = h;
S = f;
f = a;
d = 31 & (h = 64 - y | 0);
if ((63 & h) >>> 0 >= 32) {
h = 0;
f = t >>> d | 0;
} else {
h = t >>> d | 0;
f = ((1 << d) - 1 & t) << 32 - d | f >>> d;
}
f |= S;
_ |= h;
d = 31 & y;
if ((63 & y) >>> 0 >= 32) {
h = a << d;
a = 0;
} else {
h = (1 << d) - 1 & a >>> 32 - d | t << d;
a <<= d;
}
t = h;
}
l[i + 16 >> 2] = a;
l[i + 20 >> 2] = t;
l[i + 24 >> 2] = f;
l[i + 28 >> 2] = _;
if (64 & (h = 15361 - g | 0)) {
e = v;
_ = 31 & (t = h + -64 | 0);
if ((63 & t) >>> 0 >= 32) {
h = 0;
b = c >>> _ | 0;
} else {
h = c >>> _ | 0;
b = ((1 << _) - 1 & c) << 32 - _ | e >>> _;
}
e = h;
v = 0;
c = 0;
} else if (h) {
_ = v;
a = 31 & (t = 64 - h | 0);
if ((63 & t) >>> 0 >= 32) {
t = _ << a;
a = 0;
} else {
t = (1 << a) - 1 & _ >>> 32 - a | c << a;
a = _ << a;
}
_ = t;
f = a;
a = b;
y = 31 & (t = h);
if ((63 & t) >>> 0 >= 32) {
h = 0;
e = e >>> y | 0;
} else {
h = e >>> y | 0;
e = ((1 << y) - 1 & e) << 32 - y | a >>> y;
}
b = f | e;
e = h | _;
h = v;
_ = 31 & t;
if ((63 & t) >>> 0 >= 32) {
t = 0;
v = c >>> _ | 0;
} else {
t = c >>> _ | 0;
v = ((1 << _) - 1 & c) << 32 - _ | h >>> _;
}
c = t;
}
l[i >> 2] = b;
l[i + 4 >> 2] = e;
l[i + 8 >> 2] = v;
l[i + 12 >> 2] = c;
a = (e = l[i + 8 >> 2]) << 4 | (c = l[i + 4 >> 2]) >>> 28;
t = l[i + 12 >> 2] << 4 | e >>> 28;
if (134217728 == (0 | (c &= 268435455)) & 0 != (0 | (e = l[i >> 2] | 0 != (l[i + 16 >> 2] | l[i + 24 >> 2] | l[i + 20 >> 2] | l[i + 28 >> 2]))) | c >>> 0 > 134217728) {
t = (e = a + 1 | 0) ? t : t + 1 | 0;
a = e;
} else if (!(134217728 ^ c | e)) {
t = (e = a + (1 & a) | 0) >>> 0 < a >>> 0 ? t + 1 | 0 : t;
a = e;
}
}
}
} else {
a = (t = h) << 4 | e >>> 28;
t = 524287 & (h = s << 4 | t >>> 28) | 2146959360;
}
C = i + 32 | 0;
m(0, 0 | a);
m(1, -2147483648 & s | t);
n = r, o = +u(), p[n >> 3] = o;
}, function(t, e, i) {
e |= 0;
i |= 0;
var s, r, o = 0, a = 0;
s = l[84 + (t |= 0) >> 2];
a = l[s + 4 >> 2];
r = l[t + 28 >> 2];
if (o = (o = l[t + 20 >> 2] - r | 0) >>> 0 > a >>> 0 ? a : o) {
D(l[s >> 2], r, o);
l[s >> 2] = o + l[s >> 2];
a = l[s + 4 >> 2] - o | 0;
l[s + 4 >> 2] = a;
}
o = l[s >> 2];
if (a = i >>> 0 > a >>> 0 ? a : i) {
D(o, e, a);
o = a + l[s >> 2] | 0;
l[s >> 2] = o;
l[s + 4 >> 2] = l[s + 4 >> 2] - a;
}
n[0 | o] = 0;
e = l[t + 44 >> 2];
l[t + 28 >> 2] = e;
l[t + 20 >> 2] = e;
return 0 | i;
} ]);
function Y() {
return r.byteLength / 65536 | 0;
}
return {
g: function() {
l[662] = 2536;
l[644] = 42;
},
h: M,
i: k,
j: K,
k: K,
l: function(t) {
(t |= 0) && k(t);
},
m: function() {
var t;
t = H(4);
l[t >> 2] = 1368;
return 0 | t;
},
n: function(t, e, i, s, r) {
e |= 0;
i |= 0;
s |= 0;
r |= 0;
return 0 | $[l[l[(t |= 0) >> 2] >> 2]](t, e, i, s, r);
},
o: K,
p: function() {
var t;
t = H(4);
l[t >> 2] = 1396;
return 0 | t;
},
q: function(t, e, i, s) {
e |= 0;
i |= 0;
s |= 0;
return 0 | $[l[l[(t |= 0) >> 2] >> 2]](t, e, i, s);
},
r: K,
s: function(t, e) {
t |= 0;
e |= 0;
var i, s, r = 0;
i = H(16);
s = H(8);
l[s + 4 >> 2] = e;
l[s >> 2] = i;
l[i + 4 >> 2] = 0;
l[i + 12 >> 2] = s;
r = 0;
t: if (e = (e = l[623]) ? 0 | $[0 | e](212) : M(212)) {
l[e + 176 >> 2] = s;
l[e >> 2] = t;
l[e + 116 >> 2] = 0;
l[e + 120 >> 2] = 0;
l[e + 16 >> 2] = 0;
l[e + 20 >> 2] = 0;
l[e + 128 >> 2] = 0;
l[e + 64 >> 2] = 128;
l[e + 68 >> 2] = 0;
l[e + 56 >> 2] = 32;
l[e + 60 >> 2] = 128;
l[e + 72 >> 2] = 0;
l[e + 196 >> 2] = 0;
l[e + 4 >> 2] = 1400;
l[e + 8 >> 2] = 1376;
l[e + 24 >> 2] = 0;
l[e + 28 >> 2] = 0;
l[e + 32 >> 2] = 0;
t = (t = l[623]) ? 0 | $[0 | t](4272) : M(4272);
l[e + 180 >> 2] = t;
if (t) {
l[e + 172 >> 2] = 0;
l[e + 12 >> 2] = 0;
l[e + 164 >> 2] = 0;
l[e + 168 >> 2] = 0;
l[e + 92 >> 2] = 0;
l[e + 96 >> 2] = 0;
l[e + 40 >> 2] = 0;
l[e + 44 >> 2] = 0;
l[e + 200 >> 2] = 0;
l[e + 108 >> 2] = 0;
l[e + 112 >> 2] = 0;
l[e + 84 >> 2] = 100;
l[e + 76 >> 2] = 0;
l[e + 80 >> 2] = 100;
l[e + 48 >> 2] = 200;
l[e + 52 >> 2] = 100;
t = e + 156 | 0;
l[e + 160 >> 2] = t;
l[e + 156 >> 2] = t;
t = e + 148 | 0;
l[e + 152 >> 2] = t;
l[e + 148 >> 2] = t;
t = e + 140 | 0;
l[e + 144 >> 2] = t;
l[e + 140 >> 2] = t;
t = e + 132 | 0;
l[e + 136 >> 2] = t;
l[e + 132 >> 2] = t;
l[e + 100 >> 2] = 0;
l[e + 104 >> 2] = 0;
l[e + 192 >> 2] = 0;
l[e + 184 >> 2] = 0;
l[e + 188 >> 2] = 5;
l[e + 36 >> 2] = 2;
l[e + 204 >> 2] = 0;
l[e + 208 >> 2] = 0;
l[e + 124 >> 2] = 20;
l[e + 88 >> 2] = 0;
r = e;
} else {
if (t = l[624]) {
$[0 | t](e);
r = 0;
break t;
}
k(e);
r = 0;
}
}
l[i >> 2] = r;
return 0 | i;
},
t: function(t, e) {
e |= 0;
l[l[(t |= 0) >> 2] + 196 >> 2] = e;
},
u: function(t) {
return l[l[(t |= 0) >> 2] + 196 >> 2];
},
v: function(t, e) {
e |= 0;
var i;
(i = l[4 + (t |= 0) >> 2]) && $[l[l[i >> 2] + 8 >> 2]](i);
l[t + 4 >> 2] = e;
l[l[t >> 2] + 204 >> 2] = 1;
},
w: function(t, e) {
e |= 0;
var i;
(i = l[8 + (t |= 0) >> 2]) && $[l[l[i >> 2] + 8 >> 2]](i);
l[t + 8 >> 2] = e;
l[l[t >> 2] + 208 >> 2] = 2;
},
x: function(t, e, i) {
i |= 0;
var s, r = 0, n = 0, o = 0, a = 0, c = 0, m = 0, u = 0, _ = 0, f = 0;
n = e |= 0;
C = s = C - 32 | 0;
t: {
e: {
if (r = l[(t |= 0) >> 2]) {
e = -1;
i: if ((0 | (t = l[r + 140 >> 2])) != (0 | (c = r + 140 | 0))) {
s: if (a = l[t + 16 >> 2]) {
e = -2;
if (d[r + 100 >> 2] < a + 1 >>> 0) break i;
a = l[t + 36 >> 2];
e = t;
for (;;) {
if ((0 | c) == (0 | (e = l[e >> 2]))) break s;
a = l[e + 36 >> 2] + a | 0;
if (!l[e + 16 >> 2]) break;
}
} else a = l[t + 36 >> 2];
e = -2;
if (!((0 | a) < 0)) {
e = -3;
if (!(((o = i >> 31) + i ^ o) < (0 | a))) {
e = 0;
_ = l[r + 60 >> 2];
f = l[r + 100 >> 2];
s: {
if ((0 | i) >= 0) for (;;) {
if ((0 | t) == (0 | c)) break s;
i = l[t >> 2];
if (n) n = (n = D(n, t + 56 | 0, l[t + 36 >> 2])) + (o = l[t + 36 >> 2]) | 0; else {
o = l[t + 36 >> 2];
n = 0;
}
u = l[t + 16 >> 2];
if (!(!(8 & h[r + 200 | 0]) | !l[r + 208 >> 2])) {
l[s >> 2] = l[t + 28 >> 2];
G(r, 8, 1088, s);
}
m = l[t >> 2];
l[m + 4 >> 2] = l[t + 4 >> 2];
l[l[t + 4 >> 2] >> 2] = m;
l[t >> 2] = 0;
l[t + 4 >> 2] = 0;
(m = l[624]) ? $[0 | m](t) : k(t);
e = e + o | 0;
l[r + 100 >> 2] = l[r + 100 >> 2] - 1;
t = i;
if (!u) break s;
}
for (;;) {
if ((0 | t) == (0 | c)) break s;
i = t;
t = l[t >> 2];
if (n) n = (n = D(n, i + 56 | 0, l[i + 36 >> 2])) + (o = l[i + 36 >> 2]) | 0; else {
o = l[i + 36 >> 2];
n = 0;
}
u = l[i + 16 >> 2];
if (!(!(8 & h[r + 200 | 0]) | !l[r + 208 >> 2])) {
l[s + 16 >> 2] = l[i + 28 >> 2];
G(r, 8, 1088, s + 16 | 0);
}
e = e + o | 0;
if (!u) break;
}
}
if ((0 | e) != (0 | a)) break e;
s: if ((0 | (t = l[r + 156 >> 2])) != (0 | (n = r + 156 | 0))) {
e = l[r + 24 >> 2];
for (;;) {
if (l[t + 28 >> 2] != (0 | e)) break s;
if ((o = l[r + 100 >> 2]) >>> 0 >= d[r + 60 >> 2]) break s;
i = l[t >> 2];
l[i + 4 >> 2] = l[t + 4 >> 2];
l[l[t + 4 >> 2] >> 2] = i;
l[r + 92 >> 2] = l[r + 92 >> 2] - 1;
i = l[r + 144 >> 2];
l[t >> 2] = c;
l[t + 4 >> 2] = i;
l[i >> 2] = t;
l[r + 100 >> 2] = o + 1;
l[r + 144 >> 2] = t;
e = e + 1 | 0;
l[r + 24 >> 2] = e;
if ((0 | n) == (0 | (t = l[r + 156 >> 2]))) break;
}
}
_ >>> 0 > f >>> 0 | d[r + 100 >> 2] >= d[r + 60 >> 2] || (l[r + 72 >> 2] = 2 | l[r + 72 >> 2]);
e = a;
}
}
}
C = s + 32 | 0;
break t;
}
S(1169, 1298, 365, 1053);
g();
}
S(1213, 1298, 411, 1053);
g();
}
return 0 | e;
},
y: function(t, e, i) {
e |= 0;
i |= 0;
var s = 0, r = 0, n = 0, o = 0, a = 0, h = 0, c = 0, m = 0;
t: {
e: {
i: {
o = l[(t |= 0) >> 2];
if (r = l[o + 8 >> 2]) {
n = -1;
if ((0 | i) < 0) break t;
if (l[o + 196 >> 2]) {
if ((0 | (a = o + 132 | 0)) != l[o + 132 >> 2]) {
s = l[o + 136 >> 2];
if ((t = l[s + 36 >> 2]) >>> 0 >= r >>> 0) t = e; else {
t = 60 + ((n = t) + (r = (0 | (t = r - t | 0)) > (0 | i) ? i : t) | 0) | 0;
if (!(n = (n = l[623]) ? 0 | $[0 | n](t) : M(t))) break i;
t = l[o + 136 >> 2];
l[n >> 2] = a;
l[n + 4 >> 2] = t;
l[t >> 2] = n;
l[o + 136 >> 2] = n;
D(n + 56 | 0, s + 56 | 0, l[s + 36 >> 2]);
t = 0;
if (e) {
D(56 + (n + l[s + 36 >> 2] | 0) | 0, e, r);
t = e + r | 0;
}
e = l[s + 36 >> 2];
l[n + 16 >> 2] = 0;
l[n + 36 >> 2] = e + r;
e = l[s >> 2];
l[e + 4 >> 2] = l[s + 4 >> 2];
l[l[s + 4 >> 2] >> 2] = e;
l[s + 4 >> 2] = s;
l[s >> 2] = s;
(e = l[624]) ? $[0 | e](s) : k(s);
i = i - r | 0;
}
} else t = e;
n = 0;
if ((0 | i) <= 0) break t;
r = l[o + 8 >> 2];
} else t = e;
e = 1;
if (!((0 | i) <= (0 | r))) {
n = -2;
if ((0 | (s = ((a = (i + r | 0) - 1 | 0) >>> 0) / (r >>> 0) | 0)) > 127) break t;
if (!(r >>> 0 > a >>> 0)) {
e = s;
if (!((0 | s) > 0)) {
n = 0;
break t;
}
}
}
m = o + 132 | 0;
a = 0;
if (!(s = l[623])) for (;;) {
if (!(s = M((h = (0 | i) > (0 | r) ? r : i) + 60 | 0))) break e;
!t | (0 | i) <= 0 || D(s + 56 | 0, t, h);
l[s + 36 >> 2] = h;
n = 0;
l[s + 16 >> 2] = l[o + 196 >> 2] ? 0 : (-1 ^ a) + e | 0;
c = l[o + 136 >> 2];
l[s >> 2] = m;
l[s + 4 >> 2] = c;
l[c >> 2] = s;
l[o + 136 >> 2] = s;
l[o + 104 >> 2] = l[o + 104 >> 2] + 1;
t = t ? t + h | 0 : 0;
i = i - h | 0;
if ((0 | (a = a + 1 | 0)) == (0 | e)) break t;
}
for (;;) {
n = (h = (0 | i) > (0 | r) ? r : i) + 60 | 0;
if (s) {
r = 0 | $[0 | s](n);
s = l[623];
} else {
r = M(n);
s = 0;
}
if (!r) break e;
!t | (0 | i) <= 0 || D(r + 56 | 0, t, h);
l[r + 36 >> 2] = h;
n = 0;
l[r + 16 >> 2] = l[o + 196 >> 2] ? 0 : (-1 ^ a) + e | 0;
c = l[o + 136 >> 2];
l[r >> 2] = m;
l[r + 4 >> 2] = c;
l[c >> 2] = r;
l[o + 136 >> 2] = r;
l[o + 104 >> 2] = l[o + 104 >> 2] + 1;
if ((0 | (a = a + 1 | 0)) == (0 | e)) break t;
t = t ? t + h | 0 : 0;
i = i - h | 0;
r = l[o + 8 >> 2];
}
}
S(1338, 1298, 474, 1254);
g();
}
S(1191, 1298, 485, 1254);
g();
}
S(1191, 1298, 518, 1254);
g();
}
return 0 | n;
},
z: function(t, e) {
e |= 0;
var i, s, r = 0;
i = l[(t |= 0) >> 2];
l[i + 76 >> 2] = e;
t = e;
if (l[i + 112 >> 2]) r = l[i + 84 >> 2]; else {
l[i + 84 >> 2] = e;
l[i + 112 >> 2] = 1;
r = e;
}
t: {
if ((s = e - r | 0) - 1e4 >>> 0 >= 4294947296) {
t = r;
if ((0 | s) < 0) break t;
}
t = (r = l[i + 80 >> 2]) + t | 0;
l[i + 84 >> 2] = (e - t | 0) >= 0 ? e + r | 0 : t;
I(i);
}
},
A: function(t, e) {
e |= 0;
var i, s = 0, r = 0, n = 0, o = 0;
i = l[(t |= 0) >> 2];
t: if (l[i + 112 >> 2] && !((e - (t = (e - (t = l[i + 84 >> 2]) | 0) - 1e4 >>> 0 < 4294947296 ? e : t) | 0) >= 0)) {
n = t - e | 0;
t = 2147483647;
s = o = i + 148 | 0;
for (;;) {
if ((0 | o) != (0 | (s = l[s >> 2]))) {
t = (0 | t) > (0 | (r = l[s + 40 >> 2] - e | 0)) ? r : t;
if ((0 | r) > 0) continue;
break t;
}
break;
}
e = (s = e) + ((t = (0 | t) < (0 | n) ? t : n) >>> 0 < (e = l[i + 80 >> 2]) >>> 0 ? t : e) | 0;
}
return 0 | e;
},
B: function(t, e, i) {
e |= 0;
i |= 0;
var s, r, n, o = 0, a = 0, c = 0, m = 0, u = 0, _ = 0, f = 0, p = 0, b = 0, v = 0, x = 0, A = 0, B = 0, w = 0, V = 0, P = 0;
C = r = C + -64 | 0;
s = l[(t |= 0) >> 2];
n = l[s + 16 >> 2];
if (!(!(2 & h[s + 200 | 0]) | !l[s + 208 >> 2])) {
l[r + 48 >> 2] = i;
G(s, 2, 1155, r + 48 | 0);
}
o = -1;
t: {
e: {
i: if (!(!e | (0 | i) < 24)) {
b = s + 20 | 0;
a = s + 148 | 0;
for (;;) {
if ((0 | (x = h[0 | e] | h[e + 1 | 0] << 8 | h[e + 2 | 0] << 16 | h[e + 3 | 0] << 24)) != l[s >> 2]) {
o = -1;
break i;
}
o = -2;
if ((0 | (_ = h[e + 20 | 0] | h[e + 21 | 0] << 8 | h[e + 22 | 0] << 16 | h[e + 23 | 0] << 24)) > (0 | (A = i - 24 | 0)) | (0 | _) < 0) break i;
o = -3;
if (((u = h[e + 4 | 0]) - 85 & 255) >>> 0 < 252) break i;
B = h[e + 16 | 0] | h[e + 17 | 0] << 8 | h[e + 18 | 0] << 16 | h[e + 19 | 0] << 24;
c = h[e + 12 | 0] | h[e + 13 | 0] << 8 | h[e + 14 | 0] << 16 | h[e + 15 | 0] << 24;
m = h[e + 8 | 0] | h[e + 9 | 0] << 8 | h[e + 10 | 0] << 16 | h[e + 11 | 0] << 24;
P = h[e + 5 | 0];
v = h[e + 6 | 0] | h[e + 7 | 0] << 8;
l[s + 64 >> 2] = v;
if ((0 | (t = a)) != (0 | (i = l[s + 148 >> 2]))) {
for (;;) {
if ((B - l[i + 28 >> 2] | 0) > 0) {
t = l[i >> 2];
l[t + 4 >> 2] = l[i + 4 >> 2];
l[l[i + 4 >> 2] >> 2] = t;
l[i >> 2] = 0;
l[i + 4 >> 2] = 0;
(p = l[624]) ? $[0 | p](i) : k(i);
l[s + 96 >> 2] = l[s + 96 >> 2] - 1;
if ((0 | a) != (0 | (i = t))) continue;
}
break;
}
t = l[a >> 2];
}
p = e + 24 | 0;
w = l[((0 | t) == (0 | a) ? b : t + 28 | 0) >> 2];
l[s + 16 >> 2] = w;
s: {
r: switch (u - 81 | 0) {
case 1:
if ((0 | (i = l[s + 76 >> 2] - m | 0)) >= 0) {
if (e = l[s + 44 >> 2]) {
o = (0 | (o = y(e, 7) + i | 0)) < 8 ? 1 : (0 | o) / 8 | 0;
l[s + 44 >> 2] = o;
e = (i = i - e | 0) >> 31;
e = (y(l[s + 40 >> 2], 3) + (e ^ e + i) | 0) / 4 | 0;
l[s + 40 >> 2] = e;
i = o;
} else {
l[s + 44 >> 2] = i;
e = i >>> 1 | 0;
l[s + 40 >> 2] = e;
}
e = (e = (o = i) + ((e <<= 2) >>> 0 > (i = l[s + 80 >> 2]) >>> 0 ? e : i) | 0) >>> 0 > (i = l[s + 52 >> 2]) >>> 0 ? e : i;
l[s + 48 >> 2] = e >>> 0 < 6e4 ? e : 6e4;
}
n: if (!((c - w | 0) < 0)) {
i = t;
if (!((c - l[b >> 2] | 0) >= 0)) for (;;) {
if ((0 | i) == (0 | a)) break n;
e = l[i >> 2];
if ((0 | (o = l[i + 28 >> 2])) == (0 | c)) {
l[e + 4 >> 2] = l[i + 4 >> 2];
l[l[i + 4 >> 2] >> 2] = e;
l[i >> 2] = 0;
l[i + 4 >> 2] = 0;
(t = l[624]) ? $[0 | t](i) : k(i);
l[s + 96 >> 2] = l[s + 96 >> 2] - 1;
t = l[s + 148 >> 2];
break n;
}
i = e;
if (!((c - o | 0) >= 0)) break;
}
}
l[s + 16 >> 2] = l[((0 | t) == (0 | a) ? b : t + 28 | 0) >> 2];
f = V ? (c - f | 0) > 0 ? c : f : c;
V = 1;
if (!(32 & h[s + 200 | 0]) | !l[s + 208 >> 2]) break s;
t = l[s + 76 >> 2];
l[r + 8 >> 2] = l[s + 48 >> 2];
l[r >> 2] = c;
l[r + 4 >> 2] = t - m;
G(s, 32, 1264, r);
break s;

case 0:
if (!(!(16 & h[s + 200 | 0]) | !l[s + 208 >> 2])) {
l[r + 20 >> 2] = m;
l[r + 16 >> 2] = c;
G(s, 16, 1063, r + 16 | 0);
}
if ((c - (l[s + 24 >> 2] + l[s + 60 >> 2] | 0) | 0) >= 0) break s;
i = 8;
if ((e = (t = l[s + 168 >> 2]) + 1 | 0) >>> 0 <= d[s + 172 >> 2]) o = l[s + 164 >> 2]; else {
for (;;) {
t = i;
i <<= 1;
if (!(t >>> 0 < e >>> 0)) break;
}
e = t << 3;
if (!(o = (i = l[623]) ? 0 | $[0 | i](e) : M(e))) break e;
if (e = l[s + 164 >> 2]) {
i = 0;
if (l[s + 168 >> 2]) for (;;) {
l[(u = i << 3) + o >> 2] = l[e + u >> 2];
l[(u |= 4) + o >> 2] = l[e + u >> 2];
if (!((i = i + 1 | 0) >>> 0 < d[s + 168 >> 2])) break;
}
(i = l[624]) ? $[0 | i](e) : k(e);
}
l[s + 172 >> 2] = t;
l[s + 164 >> 2] = o;
t = l[s + 168 >> 2];
}
l[4 + (t = (t << 3) + o | 0) >> 2] = m;
l[t >> 2] = c;
l[s + 168 >> 2] = l[s + 168 >> 2] + 1;
if ((c - l[s + 24 >> 2] | 0) < 0) break s;
t = _ + 60 | 0;
t = (e = l[623]) ? 0 | $[0 | e](t) : M(t);
l[t + 36 >> 2] = _;
l[t + 32 >> 2] = B;
l[t + 28 >> 2] = c;
l[t + 24 >> 2] = m;
l[t + 20 >> 2] = v;
l[t + 16 >> 2] = P;
l[t + 12 >> 2] = 81;
l[t + 8 >> 2] = x;
_ && D(t + 56 | 0, p, _);
n: if (((i = l[t + 28 >> 2]) - ((e = l[s + 24 >> 2]) + l[s + 60 >> 2] | 0) | 0) < 0 & (i - e | 0) >= 0) {
c = s + 160 | 0;
o = s + 156 | 0;
o: {
a: {
for (;;) {
if ((0 | o) != (0 | (e = l[c >> 2]))) {
if ((0 | (m = l[e + 28 >> 2])) == (0 | i)) break a;
c = e + 4 | 0;
if ((i - m | 0) <= 0) continue;
} else e = o;
break;
}
l[t + 4 >> 2] = e;
l[t >> 2] = t;
l[t >> 2] = l[e >> 2];
l[l[e >> 2] + 4 >> 2] = t;
l[e >> 2] = t;
l[s + 92 >> 2] = l[s + 92 >> 2] + 1;
break o;
}
(e = l[624]) ? $[0 | e](t) : k(t);
}
o: if ((0 | o) != (0 | (e = l[s + 156 >> 2]))) {
c = s + 140 | 0;
i = l[s + 24 >> 2];
for (;;) {
if (l[e + 28 >> 2] != (0 | i)) break o;
if ((m = l[s + 100 >> 2]) >>> 0 >= d[s + 60 >> 2]) break o;
t = l[e >> 2];
l[t + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = t;
l[s + 92 >> 2] = l[s + 92 >> 2] - 1;
t = l[s + 144 >> 2];
l[e >> 2] = c;
l[e + 4 >> 2] = t;
l[t >> 2] = e;
l[s + 100 >> 2] = m + 1;
l[s + 144 >> 2] = e;
i = i + 1 | 0;
l[s + 24 >> 2] = i;
if ((0 | o) == (0 | (e = l[s + 156 >> 2]))) break;
}
}
} else {
if (e = l[624]) {
$[0 | e](t);
break n;
}
k(t);
}
break s;

case 2:
l[s + 72 >> 2] = 2 | l[s + 72 >> 2];
if (!(64 & h[s + 200 | 0]) | !l[s + 208 >> 2]) break s;
G(s, 64, 1242, 0);
break s;

case 3:
break r;

default:
break i;
}
if (!(!(128 & h[s + 200 | 0]) | !l[s + 208 >> 2])) {
l[r + 32 >> 2] = v;
G(s, 128, 1100, r + 32 | 0);
}
}
e = _ + p | 0;
if (!((0 | (i = A - _ | 0)) > 23)) break;
}
s: if (!(!V | (f - (e = l[s + 16 >> 2]) | 0) < 0 | (f - l[b >> 2] | 0) >= 0) && (0 | a) != (0 | (i = l[a >> 2]))) for (;;) {
if ((f - (o = l[i + 28 >> 2]) | 0) < 0) break s;
t = l[i >> 2];
(0 | o) != (0 | f) && (l[i + 48 >> 2] = l[i + 48 >> 2] + 1);
if ((0 | a) == (0 | (i = t))) break;
}
o = 0;
if (!((e - n | 0) <= 0 || (i = l[s + 68 >> 2]) >>> 0 >= (e = l[s + 64 >> 2]) >>> 0)) {
t = l[s + 8 >> 2];
if (d[s + 36 >> 2] > i >>> 0) {
i = i + 1 | 0;
l[s + 68 >> 2] = i;
l[s + 128 >> 2] = t + l[s + 128 >> 2];
} else {
a = ((a = t >>> 0 > (a = l[s + 128 >> 2]) >>> 0 ? t : a) + (t >>> 4 | 0) | 0) + ((y(t, t) >>> 0) / (a >>> 0) | 0) | 0;
l[s + 128 >> 2] = a;
if (!(a >>> 0 < y(t, i + 1 | 0) >>> 0)) {
i = ((t + a | 0) - 1 >>> 0) / ((t || 1) >>> 0) | 0;
l[s + 68 >> 2] = i;
}
}
if (!(e >>> 0 >= i >>> 0)) {
l[s + 68 >> 2] = e;
l[s + 128 >> 2] = y(t, e);
}
}
}
C = r - -64 | 0;
break t;
}
S(1318, 1298, 650, 1177);
g();
}
return 0 | o;
},
C: function(t) {
I(l[(t |= 0) >> 2]);
},
D: function(t) {
var e, i = 0, s = 0, r = 0;
if (e = l[(t |= 0) >> 2]) {
i = -1;
t: if ((0 | (t = l[e + 140 >> 2])) != (0 | (s = e + 140 | 0))) {
if (!(r = l[t + 16 >> 2])) return l[t + 36 >> 2];
if (!(d[e + 100 >> 2] < r + 1 >>> 0)) {
i = l[t + 36 >> 2];
for (;;) {
if ((0 | s) == (0 | (t = l[t >> 2]))) break t;
i = l[t + 36 >> 2] + i | 0;
if (!l[t + 16 >> 2]) break;
}
}
}
return 0 | i;
}
S(1169, 1298, 447, 1199);
g();
},
E: function(t, e) {
t |= 0;
var i = 0, s = 0;
if ((0 | (e |= 0)) >= 50) {
s = l[t >> 2];
t = y(e, 3) + 72 | 0;
if (!(t = (i = l[623]) ? 0 | $[0 | i](t) : M(t))) return -2;
l[s + 4 >> 2] = e;
l[s + 8 >> 2] = e - 24;
e = l[s + 180 >> 2];
(i = l[624]) ? $[0 | i](e) : k(e);
l[s + 180 >> 2] = t;
t = 0;
} else t = -1;
return 0 | t;
},
F: function(t, e, i) {
e |= 0;
i |= 0;
if (t = l[(t |= 0) >> 2]) {
(0 | e) > 0 && (l[t + 56 >> 2] = e);
(0 | i) <= 0 || (l[t + 60 >> 2] = i >>> 0 > 128 ? i : 128);
}
return 0;
},
G: function(t) {
t = l[(t |= 0) >> 2];
return l[t + 104 >> 2] + l[t + 96 >> 2] | 0;
},
H: function(t, e, i, s, r) {
e |= 0;
i |= 0;
s |= 0;
r |= 0;
t = l[(t |= 0) >> 2];
if ((0 | e) >= 0) {
l[t + 108 >> 2] = e;
l[t + 52 >> 2] = e ? 30 : 100;
}
if ((0 | i) >= 0) {
e = i >>> 0 > 10 ? i : 10;
l[t + 80 >> 2] = e >>> 0 < 5e3 ? e : 5e3;
}
(0 | s) >= 0 && (l[t + 184 >> 2] = s);
(0 | r) >= 0 && (l[t + 192 >> 2] = r);
return 0;
},
I: function(t) {
var e = 0, i = 0, s = 0, r = 0, n = 0;
if (t |= 0) {
(i = l[t + 12 >> 2]) && k(i);
t: if (r = l[t >> 2]) {
e: if ((0 | (e = l[r + 148 >> 2])) != (0 | (s = r + 148 | 0))) {
if (i = l[624]) for (;;) {
n = l[e >> 2];
l[n + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = n;
l[e >> 2] = 0;
l[e + 4 >> 2] = 0;
if (i) {
$[0 | i](e);
i = l[624];
} else {
k(e);
i = 0;
}
if ((0 | s) == (0 | (e = l[s >> 2]))) break e;
}
for (;;) {
i = l[e >> 2];
l[i + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = i;
k(e);
if ((0 | s) == (0 | (e = l[s >> 2]))) break;
}
}
e: if ((0 | (e = l[r + 156 >> 2])) != (0 | (s = r + 156 | 0))) {
if (i = l[624]) for (;;) {
n = l[e >> 2];
l[n + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = n;
l[e >> 2] = 0;
l[e + 4 >> 2] = 0;
if (i) {
$[0 | i](e);
i = l[624];
} else {
k(e);
i = 0;
}
if ((0 | s) == (0 | (e = l[s >> 2]))) break e;
}
for (;;) {
i = l[e >> 2];
l[i + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = i;
k(e);
if ((0 | s) == (0 | (e = l[s >> 2]))) break;
}
}
e: if ((0 | (e = l[r + 132 >> 2])) != (0 | (s = r + 132 | 0))) {
if (i = l[624]) for (;;) {
n = l[e >> 2];
l[n + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = n;
l[e >> 2] = 0;
l[e + 4 >> 2] = 0;
if (i) {
$[0 | i](e);
i = l[624];
} else {
k(e);
i = 0;
}
if ((0 | s) == (0 | (e = l[s >> 2]))) break e;
}
for (;;) {
i = l[e >> 2];
l[i + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = i;
k(e);
if ((0 | s) == (0 | (e = l[s >> 2]))) break;
}
}
e: if ((0 | (e = l[r + 140 >> 2])) != (0 | (s = r + 140 | 0))) {
if (i = l[624]) for (;;) {
n = l[e >> 2];
l[n + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = n;
l[e >> 2] = 0;
l[e + 4 >> 2] = 0;
if (i) {
$[0 | i](e);
i = l[624];
} else {
k(e);
i = 0;
}
if ((0 | s) == (0 | (e = l[s >> 2]))) break e;
}
for (;;) {
i = l[e >> 2];
l[i + 4 >> 2] = l[e + 4 >> 2];
l[l[e + 4 >> 2] >> 2] = i;
k(e);
if ((0 | s) == (0 | (e = l[s >> 2]))) break;
}
}
(i = l[r + 180 >> 2]) && ((e = l[624]) ? $[0 | e](i) : k(i));
(i = l[r + 164 >> 2]) && ((e = l[624]) ? $[0 | e](i) : k(i));
l[r + 180 >> 2] = 0;
l[r + 164 >> 2] = 0;
l[r + 168 >> 2] = 0;
l[r + 92 >> 2] = 0;
l[r + 96 >> 2] = 0;
l[r + 100 >> 2] = 0;
l[r + 104 >> 2] = 0;
if (i = l[624]) {
$[0 | i](r);
break t;
}
k(r);
} else {
S(1169, 1298, 303, 1229);
g();
}
k(t);
}
},
J: $
};
}(t);
}(z);
}
var m = Error, u = {};
l = [];
"object" != typeof u && T("no native wasm support detected");
var _, f = !1;
function d(t) {
t || T("Assertion failed: undefined");
}
var p, y, b, v, g, S = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function x(t) {
if (t) {
for (var e = b, i = t + NaN, s = t; e[s] && !(s >= i); ) ++s;
if (16 < s - t && e.subarray && S) t = S.decode(e.subarray(t, s)); else {
for (i = ""; t < s; ) {
var r = e[t++];
if (128 & r) {
var n = 63 & e[t++];
if (192 == (224 & r)) i += String.fromCharCode((31 & r) << 6 | n); else {
var o = 63 & e[t++];
65536 > (r = 224 == (240 & r) ? (15 & r) << 12 | n << 6 | o : (7 & r) << 18 | n << 12 | o << 6 | 63 & e[t++]) ? i += String.fromCharCode(r) : (r -= 65536, 
i += String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r));
}
} else i += String.fromCharCode(r);
}
t = i;
}
} else t = "";
return t;
}
function A(t) {
p = t;
i.HEAP8 = y = new Int8Array(t);
i.HEAP16 = new Int16Array(t);
i.HEAP32 = v = new Int32Array(t);
i.HEAPU8 = b = new Uint8Array(t);
i.HEAPU16 = new Uint16Array(t);
i.HEAPU32 = new Uint32Array(t);
i.HEAPF32 = new Float32Array(t);
i.HEAPF64 = g = new Float64Array(t);
}
var B = i.INITIAL_MEMORY || 4194304;
(_ = i.wasmMemory ? i.wasmMemory : new function() {
this.buffer = new ArrayBuffer(B / 65536 * 65536);
}()) && (p = _.buffer);
B = p.byteLength;
A(p);
var w, C = [], V = [], M = [];
function P() {
var t = i.preRun.shift();
C.unshift(t);
}
var I, k = 0, D = null;
i.preloadedImages = {};
i.preloadedAudios = {};
function T(t) {
i.onAbort && i.onAbort(t);
h(t = "Aborted(" + t + ")");
f = !0;
t = new m(t + ". Build with -s ASSERTIONS=1 for more info.");
r(t);
throw t;
}
function G(t) {
return t.startsWith("data:application/octet-stream;base64,");
}
if (!G(I = "kcp.asm.wasm")) {
var R = I;
I = i.locateFile ? i.locateFile(R, a) : a + R;
}
function L() {
var t = I;
try {
if (t == I && l) return new Uint8Array(l);
if (G(t)) try {
var e = N(t.slice(37)), i = new Uint8Array(e.length);
for (t = 0; t < e.length; ++t) i[t] = e.charCodeAt(t);
var s = i;
} catch (t) {
throw Error("Converting base64 string to bytes failed.");
} else s = void 0;
if (s) return s;
throw "both async and sync fetching of the wasm failed";
} catch (t) {
T(t);
}
}
var F = {
2006: function(t, e, s, r, n) {
if (!(t = i.getCache(i.KcpOutputCallbackImpl)[t]).hasOwnProperty("output")) throw "a JSImplementation must implement all functions, you forgot KcpOutputCallbackImpl::output.";
return t.output(e, s, r, n);
},
2250: function(t, e, s, r) {
if (!(t = i.getCache(i.KcpLogCallbackImpl)[t]).hasOwnProperty("writelog")) throw "a JSImplementation must implement all functions, you forgot KcpLogCallbackImpl::writelog.";
return t.writelog(e, s, r);
}
};
function E(t) {
for (;0 < t.length; ) {
var e = t.shift();
if ("function" == typeof e) e(i); else {
var s = e.O;
"number" == typeof s ? void 0 === e.N ? j(s)() : j(s)(e.N) : s(void 0 === e.N ? null : e.N);
}
}
}
var O = [];
function j(t) {
var e = O[t];
e || (t >= O.length && (O.length = t + 1), O[t] = e = w.get(t));
return e;
}
var q = [], N = "function" == typeof atob ? atob : function(t) {
var e = "", i = 0;
t = t.replace(/[^A-Za-z0-9\+\/=]/g, "");
do {
var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(t.charAt(i++)), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(t.charAt(i++)), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(t.charAt(i++)), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(t.charAt(i++));
s = s << 2 | r >> 4;
r = (15 & r) << 4 | n >> 2;
var a = (3 & n) << 6 | o;
e += String.fromCharCode(s);
64 !== n && (e += String.fromCharCode(r));
64 !== o && (e += String.fromCharCode(a));
} while (i < t.length);
return e;
}, z = {
b: function(t, e, i, s) {
T("Assertion failed: " + x(t) + ", at: " + [ e ? x(e) : "unknown filename", i, s ? x(s) : "unknown function" ]);
},
f: function() {
T("");
},
c: function(t, e, i) {
q.length = 0;
var s;
for (i >>= 2; s = b[e++]; ) (s = 105 > s) && 1 & i && i++, q.push(s ? g[i++ >> 1] : v[i]), 
++i;
return F[t].apply(null, q);
},
d: function(t, e, i) {
b.copyWithin(t, e, e + i);
},
e: function(t) {
var e = b.length;
if (2147483648 < (t >>>= 0)) return !1;
for (var i = 1; 4 >= i; i *= 2) {
var s = e * (1 + .2 / i);
s = Math.min(s, t + 100663296);
0 < (s = Math.max(t, s)) % 65536 && (s += 65536 - s % 65536);
t: {
try {
_.grow(Math.min(2147483648, s) - p.byteLength + 65535 >>> 16);
A(_.buffer);
var r = 1;
break t;
} catch (t) {}
r = void 0;
}
if (r) return !0;
}
return !1;
},
a: _
};
(function() {
function t(t) {
i.asm = t.exports;
w = i.asm.J;
V.unshift(i.asm.g);
k--;
i.monitorRunDependencies && i.monitorRunDependencies(k);
0 == k && D && (t = D, D = null, t());
}
function e(e) {
t(e.instance);
}
function s(t) {
return (l || "function" != typeof fetch ? Promise.resolve().then(function() {
return L();
}) : fetch(I, {
credentials: "same-origin"
}).then(function(t) {
if (!t.ok) throw "failed to load wasm binary file at '" + I + "'";
return t.arrayBuffer();
}).catch(function() {
return L();
})).then(function() {
return {
then: function(t) {
t({
instance: new c()
});
}
};
}).then(function(t) {
return t;
}).then(t, function(t) {
h("failed to asynchronously prepare wasm: " + t);
T(t);
});
}
var n = {
a: z
};
k++;
i.monitorRunDependencies && i.monitorRunDependencies(k);
if (i.instantiateWasm) try {
return i.instantiateWasm(n, t);
} catch (t) {
return h("Module.instantiateWasm callback failed with error: " + t), !1;
}
(l || "function" != typeof u.instantiateStreaming || G(I) || "function" != typeof fetch ? s(e) : fetch(I, {
credentials: "same-origin"
}).then(function(t) {
return u.instantiateStreaming(t, n).then(e, function(t) {
h("wasm streaming compile failed: " + t);
h("falling back to ArrayBuffer instantiation");
return s(e);
});
})).catch(r);
})();
i.___wasm_call_ctors = function() {
return (i.___wasm_call_ctors = i.asm.g).apply(null, arguments);
};
i._malloc = function() {
return (i._malloc = i.asm.h).apply(null, arguments);
};
i._free = function() {
return (i._free = i.asm.i).apply(null, arguments);
};
var J, U = i._emscripten_bind_KcpOutputCallback___destroy___0 = function() {
return (U = i._emscripten_bind_KcpOutputCallback___destroy___0 = i.asm.j).apply(null, arguments);
}, H = i._emscripten_bind_KcpLogCallback___destroy___0 = function() {
return (H = i._emscripten_bind_KcpLogCallback___destroy___0 = i.asm.k).apply(null, arguments);
}, W = i._emscripten_bind_VoidPtr___destroy___0 = function() {
return (W = i._emscripten_bind_VoidPtr___destroy___0 = i.asm.l).apply(null, arguments);
}, K = i._emscripten_bind_KcpOutputCallbackImpl_KcpOutputCallbackImpl_0 = function() {
return (K = i._emscripten_bind_KcpOutputCallbackImpl_KcpOutputCallbackImpl_0 = i.asm.m).apply(null, arguments);
}, X = i._emscripten_bind_KcpOutputCallbackImpl_output_4 = function() {
return (X = i._emscripten_bind_KcpOutputCallbackImpl_output_4 = i.asm.n).apply(null, arguments);
}, Z = i._emscripten_bind_KcpOutputCallbackImpl___destroy___0 = function() {
return (Z = i._emscripten_bind_KcpOutputCallbackImpl___destroy___0 = i.asm.o).apply(null, arguments);
}, $ = i._emscripten_bind_KcpLogCallbackImpl_KcpLogCallbackImpl_0 = function() {
return ($ = i._emscripten_bind_KcpLogCallbackImpl_KcpLogCallbackImpl_0 = i.asm.p).apply(null, arguments);
}, Y = i._emscripten_bind_KcpLogCallbackImpl_writelog_3 = function() {
return (Y = i._emscripten_bind_KcpLogCallbackImpl_writelog_3 = i.asm.q).apply(null, arguments);
}, Q = i._emscripten_bind_KcpLogCallbackImpl___destroy___0 = function() {
return (Q = i._emscripten_bind_KcpLogCallbackImpl___destroy___0 = i.asm.r).apply(null, arguments);
}, tt = i._emscripten_bind_Kcp_Kcp_2 = function() {
return (tt = i._emscripten_bind_Kcp_Kcp_2 = i.asm.s).apply(null, arguments);
}, et = i._emscripten_bind_Kcp_setStream_1 = function() {
return (et = i._emscripten_bind_Kcp_setStream_1 = i.asm.t).apply(null, arguments);
}, it = i._emscripten_bind_Kcp_getStream_0 = function() {
return (it = i._emscripten_bind_Kcp_getStream_0 = i.asm.u).apply(null, arguments);
}, st = i._emscripten_bind_Kcp_setOutput_1 = function() {
return (st = i._emscripten_bind_Kcp_setOutput_1 = i.asm.v).apply(null, arguments);
}, rt = i._emscripten_bind_Kcp_setWritelog_1 = function() {
return (rt = i._emscripten_bind_Kcp_setWritelog_1 = i.asm.w).apply(null, arguments);
}, nt = i._emscripten_bind_Kcp_recv_2 = function() {
return (nt = i._emscripten_bind_Kcp_recv_2 = i.asm.x).apply(null, arguments);
}, ot = i._emscripten_bind_Kcp_send_2 = function() {
return (ot = i._emscripten_bind_Kcp_send_2 = i.asm.y).apply(null, arguments);
}, at = i._emscripten_bind_Kcp_update_1 = function() {
return (at = i._emscripten_bind_Kcp_update_1 = i.asm.z).apply(null, arguments);
}, lt = i._emscripten_bind_Kcp_check_1 = function() {
return (lt = i._emscripten_bind_Kcp_check_1 = i.asm.A).apply(null, arguments);
}, ht = i._emscripten_bind_Kcp_input_2 = function() {
return (ht = i._emscripten_bind_Kcp_input_2 = i.asm.B).apply(null, arguments);
}, ct = i._emscripten_bind_Kcp_flush_0 = function() {
return (ct = i._emscripten_bind_Kcp_flush_0 = i.asm.C).apply(null, arguments);
}, mt = i._emscripten_bind_Kcp_peeksize_0 = function() {
return (mt = i._emscripten_bind_Kcp_peeksize_0 = i.asm.D).apply(null, arguments);
}, ut = i._emscripten_bind_Kcp_setmtu_1 = function() {
return (ut = i._emscripten_bind_Kcp_setmtu_1 = i.asm.E).apply(null, arguments);
}, _t = i._emscripten_bind_Kcp_wndsize_2 = function() {
return (_t = i._emscripten_bind_Kcp_wndsize_2 = i.asm.F).apply(null, arguments);
}, ft = i._emscripten_bind_Kcp_waitsnd_0 = function() {
return (ft = i._emscripten_bind_Kcp_waitsnd_0 = i.asm.G).apply(null, arguments);
}, dt = i._emscripten_bind_Kcp_nodelay_4 = function() {
return (dt = i._emscripten_bind_Kcp_nodelay_4 = i.asm.H).apply(null, arguments);
}, pt = i._emscripten_bind_Kcp___destroy___0 = function() {
return (pt = i._emscripten_bind_Kcp___destroy___0 = i.asm.I).apply(null, arguments);
};
D = function t() {
J || yt();
J || (D = t);
};
function yt() {
function t() {
if (!J && (J = !0, i.calledRun = !0, !f)) {
E(V);
s(i);
i.onRuntimeInitialized && i.onRuntimeInitialized();
if (i.postRun) for ("function" == typeof i.postRun && (i.postRun = [ i.postRun ]); i.postRun.length; ) {
var t = i.postRun.shift();
M.unshift(t);
}
E(M);
}
}
if (!(0 < k)) {
if (i.preRun) for ("function" == typeof i.preRun && (i.preRun = [ i.preRun ]); i.preRun.length; ) P();
E(C);
0 < k || (i.setStatus ? (i.setStatus("Running..."), setTimeout(function() {
setTimeout(function() {
i.setStatus("");
}, 1);
t();
}, 1)) : t());
}
}
i.run = yt;
if (i.preInit) for ("function" == typeof i.preInit && (i.preInit = [ i.preInit ]); 0 < i.preInit.length; ) i.preInit.pop()();
yt();
function bt() {}
(St = bt.prototype).prototype = Object.create(bt.prototype);
St.constructor = bt;
St.L = bt;
bt.M = {};
i.WrapperObject = bt;
function vt(t) {
return (t || bt).M;
}
i.getCache = vt;
function gt(t, e) {
var i = vt(e), s = i[t];
if (s) return s;
(s = Object.create((e || bt).prototype)).K = t;
return i[t] = s;
}
i.wrapPointer = gt;
i.castObject = function(t, e) {
return gt(t.K, e);
};
i.NULL = gt(0);
i.destroy = function(t) {
if (!t.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
t.__destroy__();
delete vt(t.L)[t.K];
};
i.compare = function(t, e) {
return t.K === e.K;
};
i.getPointer = function(t) {
return t.K;
};
i.getClass = function(t) {
return t.L;
};
var St, xt = 0, At = 0, Bt = 0, wt = [], Ct = 0;
function Vt() {
throw "cannot construct a KcpOutputCallback, no constructor in IDL";
}
(St = Vt.prototype).prototype = Object.create(bt.prototype);
St.constructor = Vt;
St.L = Vt;
Vt.M = {};
i.KcpOutputCallback = Vt;
St.__destroy__ = function() {
U(this.K);
};
function Mt() {
throw "cannot construct a KcpLogCallback, no constructor in IDL";
}
(St = Mt.prototype).prototype = Object.create(bt.prototype);
St.constructor = Mt;
St.L = Mt;
Mt.M = {};
i.KcpLogCallback = Mt;
St.__destroy__ = function() {
H(this.K);
};
function Pt() {
throw "cannot construct a VoidPtr, no constructor in IDL";
}
(St = Pt.prototype).prototype = Object.create(bt.prototype);
St.constructor = Pt;
St.L = Pt;
Pt.M = {};
i.VoidPtr = Pt;
St.__destroy__ = function() {
W(this.K);
};
function It() {
this.K = K();
vt(It)[this.K] = this;
}
(St = It.prototype).prototype = Object.create(Vt.prototype);
St.constructor = It;
St.L = It;
It.M = {};
i.KcpOutputCallbackImpl = It;
St.output = function(t, e, i, s) {
var r = this.K;
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
i && "object" == typeof i && (i = i.K);
s && "object" == typeof s && (s = s.K);
return X(r, t, e, i, s);
};
St.__destroy__ = function() {
Z(this.K);
};
function kt() {
this.K = $();
vt(kt)[this.K] = this;
}
(St = kt.prototype).prototype = Object.create(Mt.prototype);
St.constructor = kt;
St.L = kt;
kt.M = {};
i.KcpLogCallbackImpl = kt;
St.writelog = function(t, e, s) {
var r = this.K;
if (Ct) {
for (var n = 0; n < wt.length; n++) i._free(wt[n]);
wt.length = 0;
i._free(xt);
xt = 0;
At += Ct;
Ct = 0;
}
xt || (At += 128, d(xt = i._malloc(At)));
Bt = 0;
if (t && "object" == typeof t) t = t.K; else if ("string" == typeof (n = t)) {
for (var o = t = 0; o < n.length; ++o) {
var a = n.charCodeAt(o);
55296 <= a && 57343 >= a && (a = 65536 + ((1023 & a) << 10) | 1023 & n.charCodeAt(++o));
127 >= a ? ++t : t = 2047 >= a ? t + 2 : 65535 >= a ? t + 3 : t + 4;
}
o = 0;
if (0 < (a = (t = Array(t + 1)).length)) {
a = o + a - 1;
for (var l = 0; l < n.length; ++l) {
var h = n.charCodeAt(l);
55296 <= h && 57343 >= h && (h = 65536 + ((1023 & h) << 10) | 1023 & n.charCodeAt(++l));
if (127 >= h) {
if (o >= a) break;
t[o++] = h;
} else {
if (2047 >= h) {
if (o + 1 >= a) break;
t[o++] = 192 | h >> 6;
} else {
if (65535 >= h) {
if (o + 2 >= a) break;
t[o++] = 224 | h >> 12;
} else {
if (o + 3 >= a) break;
t[o++] = 240 | h >> 18;
t[o++] = 128 | h >> 12 & 63;
}
t[o++] = 128 | h >> 6 & 63;
}
t[o++] = 128 | 63 & h;
}
}
t[o] = 0;
}
n = y;
d(xt);
n = t.length * n.BYTES_PER_ELEMENT;
Bt + (n = n + 7 & -8) >= At ? (d(0 < n), Ct += n, o = i._malloc(n), wt.push(o)) : (o = xt + Bt, 
Bt += n);
o = (n = o) >>> 0;
switch ((a = y).BYTES_PER_ELEMENT) {
case 2:
o >>>= 1;
break;

case 4:
o >>>= 2;
break;

case 8:
o >>>= 3;
}
for (l = 0; l < t.length; l++) a[o + l] = t[l];
t = n;
} else t = n;
e && "object" == typeof e && (e = e.K);
s && "object" == typeof s && (s = s.K);
return Y(r, t, e, s);
};
St.__destroy__ = function() {
Q(this.K);
};
function Dt(t, e) {
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
this.K = tt(t, e);
vt(Dt)[this.K] = this;
}
(St = Dt.prototype).prototype = Object.create(bt.prototype);
St.constructor = Dt;
St.L = Dt;
Dt.M = {};
i.Kcp = Dt;
St.setStream = function(t) {
var e = this.K;
t && "object" == typeof t && (t = t.K);
et(e, t);
};
St.getStream = function() {
return it(this.K);
};
St.setOutput = function(t) {
var e = this.K;
t && "object" == typeof t && (t = t.K);
st(e, t);
};
St.setWritelog = function(t) {
var e = this.K;
t && "object" == typeof t && (t = t.K);
rt(e, t);
};
St.recv = function(t, e) {
var i = this.K;
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
return nt(i, t, e);
};
St.send = Dt.prototype.send = function(t, e) {
var i = this.K;
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
return ot(i, t, e);
};
St.update = Dt.prototype.update = function(t) {
var e = this.K;
t && "object" == typeof t && (t = t.K);
at(e, t);
};
St.check = Dt.prototype.check = function(t) {
var e = this.K;
t && "object" == typeof t && (t = t.K);
return lt(e, t);
};
St.input = Dt.prototype.input = function(t, e) {
var i = this.K;
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
return ht(i, t, e);
};
St.flush = Dt.prototype.flush = function() {
ct(this.K);
};
St.peeksize = function() {
return mt(this.K);
};
St.setmtu = function(t) {
var e = this.K;
t && "object" == typeof t && (t = t.K);
return ut(e, t);
};
St.wndsize = function(t, e) {
var i = this.K;
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
return _t(i, t, e);
};
St.waitsnd = function() {
return ft(this.K);
};
St.nodelay = function(t, e, i, s) {
var r = this.K;
t && "object" == typeof t && (t = t.K);
e && "object" == typeof e && (e = e.K);
i && "object" == typeof i && (i = i.K);
s && "object" == typeof s && (s = s.K);
return dt(r, t, e, i, s);
};
St.__destroy__ = function() {
pt(this.K);
};
return t.ready;
});
t.exports = i;
})(i);
var s, r = i.exports;
(function() {
globalThis.wx && globalThis.wx.createUDPSocket && (s = function() {
return globalThis.wx.createUDPSocket();
});
globalThis.UDPSocket && (s = function() {
return new h(new globalThis.UDPSocket());
});
try {
var e = t("dgram");
e && e.createSocket && (s = function() {
return new l(e.createSocket("udp4"));
});
} catch (t) {}
})();
var n, o, a, l = function() {
function t(t) {
this.funcMap = new Map();
this.udp = t;
}
var e = t.prototype;
e.onMessage = function(t) {
this.udp.on("message", t);
};
e.offMessage = function(t) {
this.udp.off("message", t);
};
e.onError = function(t) {
var e = function(e) {
return t(e.message);
};
this.funcMap.set(t, e);
this.udp.on("error", e);
};
e.offError = function(t) {
var e = this.funcMap.get(t);
this.funcMap.delete(t);
e && this.udp.off("error", e);
};
e.onClose = function(t) {
this.udp.on("close", t);
};
e.offClose = function(t) {
this.udp.off("close", t);
};
e.send = function(t) {
this.udp.send(new Uint8Array(t.message, t.offset, t.length), t.port, t.address);
};
e.bind = function(t) {
this.udp.bind();
return t;
};
e.close = function() {
this.udp.close();
};
return t;
}(), h = function() {
function t(t) {
this.udp = t;
}
var e = t.prototype;
e.bind = function(t) {
this.udp.bind(t);
return t;
};
e.close = function() {
this.udp.close();
};
e.onMessage = function(t) {
this.udp.onMessage = t;
};
e.offMessage = function() {
this.udp.onMessage = void 0;
};
e.onError = function(t) {
this.udp.onError = t;
};
e.offError = function() {
this.udp.onError = void 0;
};
e.onClose = function(t) {
this.udp.onClose = t;
};
e.offClose = function() {
this.udp.onClose = void 0;
};
e.send = function(t) {
this.udp.send(t);
};
return t;
}(), c = globalThis.requestAnimationFrame || function(t) {
return setTimeout(t, 10);
}, m = 1400;
try {
if (globalThis.yasio) {
a = new TextEncoder();
var u = function() {
function t(t) {
this.readyState = -1;
var e = /(\w+):\/\/([^\/:]+):?(\d*)?([^#\?]*)\??([^#]*)/.exec(t);
this.address = e[2];
this.port = ~~e[3] || ("wss" == e[1] || "https" == e[1] ? 443 : 80);
this.query = e[5];
if (!this.address) throw new Error("The url is invalid");
this.connect();
}
var e = t.prototype;
e.fireError = function(t) {
if (!(this.readyState >= 2)) {
this.onerror && this.onerror({
message: t
});
this._close(t);
}
};
e.connect = function() {
var t = this;
if (-1 === this.readyState) {
var e = this.service = new yasio.io_service(1);
e.set_option(yasio.YOPT_C_REMOTE_ENDPOINT, 0, this.address, this.port);
e.set_option(yasio.YOPT_C_KCP_ENABLE_FEC, 0);
e.set_option(yasio.YOPT_C_KCP_CONV, 0, Date.now());
e.set_option(yasio.YOPT_C_LFBFD_IBTS, 0, 4);
e.set_option(yasio.YOPT_C_UNPACK_NO_BSWAP, 0, 1);
e.set_option(yasio.YOPT_C_UNPACK_PARAMS, 0, 33554432, 0, 4, 4);
e.start(function(e) {
var i = e.kind(), s = e.status();
if (i == yasio.YEK_PACKET) {
var r = e.packet(1);
t.doMsg(new Uint8Array(r));
} else if (i == yasio.YEK_CONNECT_RESPONSE) {
if (0 != s) {
t.fireError(s.toString());
return;
}
t.transport = e.transport();
var n = a.encode(t.query);
t._send(n);
} else i == yasio.YEK_CONNECTION_LOST && t.fireError("closed");
});
this.readyState = 0;
e.open(0, yasio.YCK_KCP_CLIENT);
c(function() {
return t.update();
});
}
};
e._send = function(t) {
this.service && this.transport && this.service.is_open(0) && this.service.write(this.transport, t) || this.fireError("send error");
};
e.update = function() {
var t = this;
if (!(this.readyState >= 2)) {
this.service && this.service.dispatch(128);
c(function() {
return t.update();
});
}
};
e.doMsg = function(t) {
switch (this.readyState) {
default:
return;

case 0:
if (!(t.length >= 2 && 111 == t[0] && 107 == t[1])) {
this.fireError("shakehand error");
return;
}
this.readyState = 1;
this.onopen && this.onopen({});
break;

case 1:
this.onmessage && this.onmessage({
data: t
});
}
};
e.send = function(t) {
this._send(new Uint8Array(t));
};
e._close = function(t) {
if (!(this.readyState >= 2)) {
this.readyState = 2;
this.readyState = 3;
this.service.stop();
this.service = this.transport = void 0;
this.onclose && this.onclose({
code: -1,
reason: t
});
}
};
e.close = function() {
if (!(this.readyState >= 2)) {
this._send(void 0);
this._close("user close");
}
};
return t;
}();
globalThis.KcpConnection = u;
} else if (globalThis.KcpSession) {
var _ = function(t) {
__extends(e, t);
function e(e) {
var i = /(\w+):\/\/([^\/:]+):?(\d*)?([^#\?]*)\??([^#]*)/.exec(e), s = i[2], r = ~~i[3] || ("wss" == i[1] || "https" == i[1] ? 443 : 80), n = i[5];
return t.call(this, {
host: s,
port: r,
query: n,
mtu: 1400,
dataShards: 10,
parityShards: 3,
noDelay: [ 1, 10, 2, 1 ],
wndSize: [ 64, 1024 ]
}) || this;
}
return e;
}(globalThis.KcpSession);
globalThis.KcpConnection = _;
} else if (s) {
(o = r()).then(function(t) {
return n = t;
});
a = new TextEncoder();
var f = function() {
function t(t) {
this.inMsg = {};
this.readyState = -1;
var e = /(\w+):\/\/([^\/:]+):?(\d*)?([^#\?]*)\??([^#]*)/.exec(t);
this.address = e[2];
this.port = ~~e[3] || ("wss" == e[1] || "https" == e[1] ? 443 : 80);
this.query = e[5];
this.mss = m - 24;
if (!this.address) throw new Error("The url is invalid");
this.connect();
}
var e = t.prototype;
e.fireError = function(t) {
if (!(this.readyState >= 2)) {
this.onerror && this.onerror({
message: t
});
this._close(t);
}
};
e.connect = function() {
var t = this;
if (-1 === this.readyState) {
this.readyState = 0;
o.then(function() {
if (0 === t.readyState) {
var e = t.udp = s();
e.onError(function(e) {
t.fireError(e.errMsg);
});
e.onMessage(function(e) {
var s = new Uint8Array(e.message);
s.length > m && (s = s.subarray(0, m));
if (s.length >= 32 && (241 === s[4] || 242 === s[4]) && 0 === s[5]) {
if (241 !== s[4]) return;
s = s.subarray(8);
}
var r = t.bufferP;
n.HEAPU8.set(s, r);
i.input(r, s.length);
});
e.bind();
var i = t.kcp = new n.Kcp(Date.now(), 0);
i.nodelay(1, 10, 2, 1);
i.setmtu(m);
t.bufferP = n._malloc(m);
var r = new n.KcpOutputCallbackImpl();
r.output = function(i, s) {
var r = n.HEAPU8, o = r.buffer.slice(r.byteOffset + i, r.byteOffset + i + s);
try {
e.send({
address: t.address,
port: t.port,
message: o,
offset: 0,
length: s
});
} catch (e) {
t.fireError(e);
}
return s;
};
i.setOutput(r);
var o = a.encode(t.query), l = t._send(o);
if (l) t.fireError("shakehand error, code: " + l); else {
t.ts = Date.now();
c(function() {
return t.update();
});
}
}
});
}
};
e._send = function(t) {
var e = t.length, i = this.bufferP, s = i, r = n.HEAPU8;
r[s++] = e;
r[s++] = e >> 8;
r[s++] = e >> 16;
r[s++] = e >> 24;
var o = Math.min(this.mss - 4, e);
r.set(t.subarray(0, o), s);
var a = this.kcp.send(i, o + 4);
if (a) {
this.fireError("send error, code: " + a);
return a;
}
t = t.subarray(o);
for (;t.length > 0; ) {
o = Math.min(this.mss, t.length);
r.set(t.subarray(0, o), i);
if (a = this.kcp.send(i, o)) {
this.fireError("send error, code: " + a);
return a;
}
}
this.kcp.flush();
return 0;
};
e.doMsg = function() {
switch (this.readyState) {
default:
return !1;

case 0:
if (!(t = this.readMsg())) return !1;
if (t.len < 2 || 111 !== t.data[0] || 107 !== t.data[1]) {
this.fireError("shakehand error");
return !1;
}
this.resetMsg();
this.readyState = 1;
this.onopen && this.onopen({});
return !0;

case 1:
var t;
if (!(t = this.readMsg())) return !1;
this.onmessage && this.onmessage({
data: t.data
});
this.resetMsg();
return !0;
}
};
e.update = function() {
var t = this;
if (!(this.readyState >= 2)) {
this.kcp && this.kcp.update(Date.now() - this.ts);
for (;this.doMsg(); ) ;
c(function() {
return t.update();
});
}
};
e.resetMsg = function() {
var t = this.inMsg;
t.pos = 0;
t.dataReady = !1;
t.headerReady = !1;
t.data = void 0;
};
e.readMsg = function() {
var t = this.inMsg, e = this.bufferP, i = n.HEAPU8, s = this.kcp.peeksize();
if (!(s <= 0)) {
var r = this.kcp.recv(e, s);
if (!(r < 0)) {
var o = i.subarray(e, e + s);
if (!t.headerReady) {
if (o.length < 4) {
this.fireError("decode len error");
return;
}
var a = o[0] << 0 | o[1] << 8 | o[2] << 16 | o[3] << 24;
if (a < 0 || a > 2147483648) {
this._close("remote close");
return;
}
o = o.subarray(4);
t.len = a;
t.pos = 0;
t.data = new Uint8Array(a);
t.headerReady = !0;
t.dataReady = 0 == a;
}
if (t.headerReady) for (;!t.dataReady; ) {
t.data.set(o, t.pos);
t.pos += r;
t.dataReady = t.pos >= t.len;
}
return t.dataReady ? t : void 0;
}
this.fireError("receive error, code: " + r);
}
};
e.send = function(t) {
this._send(new Uint8Array(t));
};
e._close = function(t) {
var e = this;
if (!(this.readyState >= 2)) {
if (this.kcp) {
var i = this.bufferP, s = n.HEAPU8;
s[i] = 0;
s[i + 1] = 0;
s[i + 2] = 0;
s[i + 3] = 128;
this.kcp.send(i, 4);
this.kcp.flush();
n.destroy(this.kcp);
this.kcp = null;
n._free(this.bufferP);
}
this.readyState = 2;
this.udp.onClose(function() {
e.readyState = 3;
e.onclose && e.onclose({
code: -1,
reason: t
});
});
this.udp.close();
}
};
e.close = function() {
this._close("user close");
};
return t;
}();
globalThis.KcpConnection = f;
}
} catch (t) {}
},
7: function(t, e, i) {
(function(s, r) {
!function(t, s) {
"object" == typeof e && "undefined" != typeof i ? s(e) : "function" == typeof define && define.amd ? define([ "exports" ], s) : s((t = t || self).mobx = {});
}(this, function(e) {
"use strict";
var i = [];
Object.freeze(i);
var n = {};
Object.freeze(n);
var o = {};
function a() {
return "undefined" != typeof window ? window : "undefined" != typeof r ? r : "undefined" != typeof self ? self : o;
}
function l() {
return ++Ot.mobxGuid;
}
function h(t) {
throw c(!1, t), "X";
}
function c(t, e) {
if (!t) throw new Error("[mobx] " + (e || "An invariant failed, however the error is obfuscated because this is an production build."));
}
function m(t) {
var e = !1;
return function() {
if (!e) return e = !0, t.apply(this, arguments);
};
}
var u = function() {};
function _(t) {
return null !== t && "object" == typeof t;
}
function f(t) {
if (null === t || "object" != typeof t) return !1;
var e = Object.getPrototypeOf(t);
return e === Object.prototype || null === e;
}
function d(e, i, s) {
t.a(e, i, {
enumerable: !1,
writable: !0,
configurable: !0,
value: s
});
}
function p(e, i, s) {
t.a(e, i, {
enumerable: !1,
writable: !1,
configurable: !0,
value: s
});
}
function y(t, e) {
var i = "isMobX" + t;
return e.prototype[i] = !0, function(t) {
return _(t) && !0 === t[i];
};
}
function b(t) {
return void 0 !== a().Map && t instanceof a().Map;
}
function v(t) {
return t instanceof Set;
}
function g(t) {
for (var e = []; ;) {
var i = t.next();
if (i.done) break;
e.push(i.value);
}
return e;
}
function S() {
return "function" == typeof Symbol && Symbol.toPrimitive || "@@toPrimitive";
}
function x(t) {
return null === t ? null : "object" == typeof t ? "" + t : t;
}
function A(t, e) {
for (var i = t.next(); !i.done; ) e(i.value), i = t.next();
}
function B() {
return "function" == typeof Symbol && Symbol.iterator || "@@iterator";
}
function w(t, e) {
p(t, B(), e);
}
function C(t) {
return t[B()] = M, t;
}
function V() {
return "function" == typeof Symbol && Symbol.toStringTag || "@@toStringTag";
}
function M() {
return this;
}
var P = function() {
function t(t) {
void 0 === t && (t = "Atom@" + l()), this.name = t, this.isPendingUnobservation = !1, 
this.isBeingObserved = !1, this.observers = [], this.observersIndexes = {}, this.diffValue = 0, 
this.lastAccessedBy = 0, this.lowestObserverState = e.IDerivationState.NOT_TRACKING;
}
return t.prototype.onBecomeUnobserved = function() {}, t.prototype.onBecomeObserved = function() {}, 
t.prototype.reportObserved = function() {
return Ut(this);
}, t.prototype.reportChanged = function() {
zt(), function(t) {
if (t.lowestObserverState !== e.IDerivationState.STALE) {
t.lowestObserverState = e.IDerivationState.STALE;
for (var i = t.observers, s = i.length; s--; ) {
var r = i[s];
r.dependenciesState === e.IDerivationState.UP_TO_DATE && (r.isTracing !== ot.NONE && Ht(r, t), 
r.onBecomeStale()), r.dependenciesState = e.IDerivationState.STALE;
}
}
}(this), Jt();
}, t.prototype.toString = function() {
return this.name;
}, t;
}(), I = y("Atom", P);
function k(t, e, i) {
void 0 === e && (e = u), void 0 === i && (i = u);
var s = new P(t);
return _e(s, e), fe(s, i), s;
}
function D(t, e) {
return t === e;
}
var T = {
identity: D,
structural: function(t, e) {
return Si(t, e);
},
default: function(t, e) {
return function(t, e) {
return "number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e);
}(t, e) || D(t, e);
},
shallow: function(t, e) {
return Si(t, e, 1);
}
}, G = function(t, e) {
return (G = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
})(t, e);
};
function R(t, e) {
function i() {
this.constructor = t;
}
G(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, 
new i());
}
var L = function() {
return (L = Object.assign || function(t) {
for (var e, i = 1, s = arguments.length; i < s; i++) for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
return t;
}).apply(this, arguments);
};
function F(t, e) {
var i = "function" == typeof Symbol && t[Symbol.iterator];
if (!i) return t;
var s, r, n = i.call(t), o = [];
try {
for (;(void 0 === e || e-- > 0) && !(s = n.next()).done; ) o.push(s.value);
} catch (t) {
r = {
error: t
};
} finally {
try {
s && !s.done && (i = n.return) && i.call(n);
} finally {
if (r) throw r.error;
}
}
return o;
}
function E() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(F(arguments[e]));
return t;
}
var O = {}, j = {};
function q(t, e) {
var i = e ? O : j;
return i[t] || (i[t] = {
configurable: !0,
enumerable: e,
get: function() {
return N(this), this[t];
},
set: function(e) {
N(this), this[t] = e;
}
});
}
function N(t) {
if (!0 !== t.__mobxDidRunLazyInitializers) {
var e = t.__mobxDecorators;
if (e) for (var i in d(t, "__mobxDidRunLazyInitializers", !0), e) {
var s = e[i];
s.propertyCreator(t, s.prop, s.descriptor, s.decoratorTarget, s.decoratorArguments);
}
}
}
function z(t, e) {
return function() {
var s, r = function(i, r, n, o) {
if (!0 === o) return e(i, r, n, i, s), null;
if (!Object.prototype.hasOwnProperty.call(i, "__mobxDecorators")) {
var a = i.__mobxDecorators;
d(i, "__mobxDecorators", L({}, a));
}
return i.__mobxDecorators[r] = {
prop: r,
propertyCreator: e,
descriptor: n,
decoratorTarget: i,
decoratorArguments: s
}, q(r, t);
};
return J(arguments) ? (s = i, r.apply(null, arguments)) : (s = Array.prototype.slice.call(arguments), 
r);
};
}
function J(t) {
return (2 === t.length || 3 === t.length) && "string" == typeof t[1] || 4 === t.length && !0 === t[3];
}
function U(t, e, i) {
return we(t) ? t : Array.isArray(t) ? st.array(t, {
name: i
}) : f(t) ? st.object(t, void 0, {
name: i
}) : b(t) ? st.map(t, {
name: i
}) : v(t) ? st.set(t, {
name: i
}) : t;
}
function H(t) {
return t;
}
function W(t) {
c(t);
var e = z(!0, function(e, i, s) {
mi(e, i, s ? s.initializer ? s.initializer.call(e) : s.value : void 0, t);
}), i = ("undefined" != typeof s && s.env, e);
return i.enhancer = t, i;
}
var K = {
deep: !0,
name: void 0,
defaultDecorator: void 0
}, X = {
deep: !1,
name: void 0,
defaultDecorator: void 0
};
function Z(t) {
return null == t ? K : "string" == typeof t ? {
name: t,
deep: !0
} : t;
}
function $(t) {
return t.defaultDecorator ? t.defaultDecorator.enhancer : !1 === t.deep ? H : U;
}
Object.freeze(K), Object.freeze(X);
var Y = W(U), Q = W(function(t, e, i) {
return null == t ? t : pi(t) || ei(t) || ni(t) || li(t) ? t : Array.isArray(t) ? st.array(t, {
name: i,
deep: !1
}) : f(t) ? st.object(t, void 0, {
name: i,
deep: !1
}) : b(t) ? st.map(t, {
name: i,
deep: !1
}) : v(t) ? st.set(t, {
name: i,
deep: !1
}) : h(!1);
}), tt = W(H), et = W(function(t, e) {
return Si(t, e) ? e : t;
}), it = {
box: function(t, e) {
arguments.length > 2 && rt("box");
var i = Z(e);
return new kt(t, $(i), i.name, !0, i.equals);
},
shallowBox: function(t, e) {
return arguments.length > 2 && rt("shallowBox"), st.box(t, {
name: e,
deep: !1
});
},
array: function(t, e) {
arguments.length > 2 && rt("array");
var i = Z(e);
return new Xe(t, $(i), i.name);
},
shallowArray: function(t, e) {
return arguments.length > 2 && rt("shallowArray"), st.array(t, {
name: e,
deep: !1
});
},
map: function(t, e) {
arguments.length > 2 && rt("map");
var i = Z(e);
return new si(t, $(i), i.name);
},
shallowMap: function(t, e) {
return arguments.length > 2 && rt("shallowMap"), st.map(t, {
name: e,
deep: !1
});
},
set: function(t, e) {
arguments.length > 2 && rt("set");
var i = Z(e);
return new ai(t, $(i), i.name);
},
object: function(t, e, i) {
"string" == typeof arguments[1] && rt("object");
var s = Z(i);
return pe({}, t, e, s);
},
shallowObject: function(t, e) {
return "string" == typeof arguments[1] && rt("shallowObject"), st.object(t, {}, {
name: e,
deep: !1
});
},
ref: tt,
shallow: Q,
deep: Y,
struct: et
}, st = function(t, e, i) {
if ("string" == typeof arguments[1]) return Y.apply(null, arguments);
if (we(t)) return t;
var s = f(t) ? st.object(t, e, i) : Array.isArray(t) ? st.array(t, e) : b(t) ? st.map(t, e) : v(t) ? st.set(t, e) : t;
if (s !== t) return s;
h(!1);
};
function rt(t) {
h("Expected one or two arguments to observable." + t + ". Did you accidentally try to use observable." + t + " as decorator?");
}
Object.keys(it).forEach(function(t) {
return st[t] = it[t];
});
var nt, ot, at = z(!1, function(e, i, s, r, n) {
var o = s.get, a = s.set, l = n[0] || {};
!function(e, i, s) {
var r = ci(e);
s.name = r.name + "." + i, s.context = e, r.values[i] = new Tt(s), t.a(e, i, function(t) {
return _i[t] || (_i[t] = {
configurable: Ot.computedConfigurable,
enumerable: !1,
get: function() {
return fi(this).read(this, t);
},
set: function(e) {
fi(this).write(this, t, e);
}
});
}(i));
}(e, i, L({
get: o,
set: a
}, l));
}), lt = at({
equals: T.structural
}), ht = function(t, e) {
if ("string" == typeof e) return at.apply(null, arguments);
if (null !== t && "object" == typeof t && 1 === arguments.length) return at.apply(null, arguments);
var i = "object" == typeof e ? e : {};
return i.get = t, i.set = "function" == typeof e ? e : i.set, i.name = i.name || t.name || "", 
new Tt(i);
};
ht.struct = lt, (nt = e.IDerivationState || (e.IDerivationState = {}))[nt.NOT_TRACKING = -1] = "NOT_TRACKING", 
nt[nt.UP_TO_DATE = 0] = "UP_TO_DATE", nt[nt.POSSIBLY_STALE = 1] = "POSSIBLY_STALE", 
nt[nt.STALE = 2] = "STALE", function(t) {
t[t.NONE = 0] = "NONE", t[t.LOG = 1] = "LOG", t[t.BREAK = 2] = "BREAK";
}(ot || (ot = {}));
var ct = function(t) {
this.cause = t;
};
function mt(t) {
return t instanceof ct;
}
function ut(t) {
switch (t.dependenciesState) {
case e.IDerivationState.UP_TO_DATE:
return !1;

case e.IDerivationState.NOT_TRACKING:
case e.IDerivationState.STALE:
return !0;

case e.IDerivationState.POSSIBLY_STALE:
for (var i = vt(!0), s = yt(), r = t.observing, n = r.length, o = 0; o < n; o++) {
var a = r[o];
if (Gt(a)) {
if (Ot.disableErrorBoundaries) a.get(); else try {
a.get();
} catch (t) {
return bt(s), gt(i), !0;
}
if (t.dependenciesState === e.IDerivationState.STALE) return bt(s), gt(i), !0;
}
}
return St(t), bt(s), gt(i), !1;
}
}
function _t(t) {
var e = t.observers.length > 0;
Ot.computationDepth > 0 && e && h(!1), Ot.allowStateChanges || !e && "strict" !== Ot.enforceActions || h(!1);
}
function ft(t, i, s) {
var r = vt(!0);
St(t), t.newObserving = new Array(t.observing.length + 100), t.unboundDepsCount = 0, 
t.runId = ++Ot.runId;
var n, o = Ot.trackingDerivation;
if (Ot.trackingDerivation = t, !0 === Ot.disableErrorBoundaries) n = i.call(s); else try {
n = i.call(s);
} catch (t) {
n = new ct(t);
}
return Ot.trackingDerivation = o, function(t) {
for (var i = t.observing, s = t.observing = t.newObserving, r = e.IDerivationState.UP_TO_DATE, n = 0, o = t.unboundDepsCount, a = 0; a < o; a++) 0 === (l = s[a]).diffValue && (l.diffValue = 1, 
n !== a && (s[n] = l), n++), l.dependenciesState > r && (r = l.dependenciesState);
s.length = n, t.newObserving = null, o = i.length;
for (;o--; ) 0 === (l = i[o]).diffValue && qt(l, t), l.diffValue = 0;
for (;n--; ) {
var l;
1 === (l = s[n]).diffValue && (l.diffValue = 0, jt(l, t));
}
r !== e.IDerivationState.UP_TO_DATE && (t.dependenciesState = r, t.onBecomeStale());
}(t), t.observing.length, gt(r), n;
}
function dt(t) {
var i = t.observing;
t.observing = [];
for (var s = i.length; s--; ) qt(i[s], t);
t.dependenciesState = e.IDerivationState.NOT_TRACKING;
}
function pt(t) {
var e = yt(), i = t();
return bt(e), i;
}
function yt() {
var t = Ot.trackingDerivation;
return Ot.trackingDerivation = null, t;
}
function bt(t) {
Ot.trackingDerivation = t;
}
function vt(t) {
var e = Ot.allowStateReads;
return Ot.allowStateReads = t, e;
}
function gt(t) {
Ot.allowStateReads = t;
}
function St(t) {
if (t.dependenciesState !== e.IDerivationState.UP_TO_DATE) {
t.dependenciesState = e.IDerivationState.UP_TO_DATE;
for (var i = t.observing, s = i.length; s--; ) i[s].lowestObserverState = e.IDerivationState.UP_TO_DATE;
}
}
var xt = 0, At = 1, Bt = Object.getOwnPropertyDescriptor(function() {}, "name");
Bt && Bt.configurable;
function wt(t, e) {
var i = function() {
return Ct(t, e, this, arguments);
};
return i.isMobxAction = !0, i;
}
function Ct(t, e, i, s) {
var r = Vt(t, i, s);
try {
return e.apply(i, s);
} catch (t) {
throw r.error = t, t;
} finally {
Mt(r);
}
}
function Vt(t, e, i) {
var s = Qt() && !!t, r = 0;
if (s) {
r = Date.now();
var n = i && i.length || 0, o = new Array(n);
if (n > 0) for (var a = 0; a < n; a++) o[a] = i[a];
ee({
type: "action",
name: t,
object: e,
arguments: o
});
}
var l = yt();
zt();
var h = {
prevDerivation: l,
prevAllowStateChanges: Pt(!0),
prevAllowStateReads: vt(!0),
notifySpy: s,
startTime: r,
actionId: At++,
parentActionId: xt
};
return xt = h.actionId, h;
}
function Mt(t) {
xt !== t.actionId && h("invalid action stack. did you forget to finish an action?"), 
xt = t.parentActionId, void 0 !== t.error && (Ot.suppressReactionErrors = !0), It(t.prevAllowStateChanges), 
gt(t.prevAllowStateReads), Jt(), bt(t.prevDerivation), t.notifySpy && se({
time: Date.now() - t.startTime
}), Ot.suppressReactionErrors = !1;
}
function Pt(t) {
var e = Ot.allowStateChanges;
return Ot.allowStateChanges = t, e;
}
function It(t) {
Ot.allowStateChanges = t;
}
var kt = function(t) {
function e(e, i, s, r, n) {
void 0 === s && (s = "ObservableValue@" + l()), void 0 === r && (r = !0), void 0 === n && (n = T.default);
var o = t.call(this, s) || this;
return o.enhancer = i, o.name = s, o.equals = n, o.hasUnreportedChange = !1, o.value = i(e, void 0, s), 
r && Qt() && te({
type: "create",
name: o.name,
newValue: "" + o.value
}), o;
}
return R(e, t), e.prototype.dehanceValue = function(t) {
return void 0 !== this.dehancer ? this.dehancer(t) : t;
}, e.prototype.set = function(t) {
var e = this.value;
if ((t = this.prepareNewValue(t)) !== Ot.UNCHANGED) {
var i = Qt();
i && ee({
type: "update",
name: this.name,
newValue: t,
oldValue: e
}), this.setNewValue(t), i && se();
}
}, e.prototype.prepareNewValue = function(t) {
if (_t(this), Re(this)) {
var e = Fe(this, {
object: this,
type: "update",
newValue: t
});
if (!e) return Ot.UNCHANGED;
t = e.newValue;
}
return t = this.enhancer(t, this.value, this.name), this.equals(this.value, t) ? Ot.UNCHANGED : t;
}, e.prototype.setNewValue = function(t) {
var e = this.value;
this.value = t, this.reportChanged(), Ee(this) && je(this, {
type: "update",
object: this,
newValue: t,
oldValue: e
});
}, e.prototype.get = function() {
return this.reportObserved(), this.dehanceValue(this.value);
}, e.prototype.intercept = function(t) {
return Le(this, t);
}, e.prototype.observe = function(t, e) {
return e && t({
object: this,
type: "update",
newValue: this.value,
oldValue: void 0
}), Oe(this, t);
}, e.prototype.toJSON = function() {
return this.get();
}, e.prototype.toString = function() {
return this.name + "[" + this.value + "]";
}, e.prototype.valueOf = function() {
return x(this.get());
}, e;
}(P);
kt.prototype[S()] = kt.prototype.valueOf;
var Dt = y("ObservableValue", kt), Tt = function() {
function t(t) {
this.dependenciesState = e.IDerivationState.NOT_TRACKING, this.observing = [], this.newObserving = null, 
this.isBeingObserved = !1, this.isPendingUnobservation = !1, this.observers = [], 
this.observersIndexes = {}, this.diffValue = 0, this.runId = 0, this.lastAccessedBy = 0, 
this.lowestObserverState = e.IDerivationState.UP_TO_DATE, this.unboundDepsCount = 0, 
this.__mapid = "#" + l(), this.value = new ct(null), this.isComputing = !1, this.isRunningSetter = !1, 
this.isTracing = ot.NONE, c(t.get, "missing option for computed: get"), this.derivation = t.get, 
this.name = t.name || "ComputedValue@" + l(), t.set && (this.setter = wt(this.name + "-setter", t.set)), 
this.equals = t.equals || (t.compareStructural || t.struct ? T.structural : T.default), 
this.scope = t.context, this.requiresReaction = !!t.requiresReaction, this.keepAlive = !!t.keepAlive;
}
return t.prototype.onBecomeStale = function() {
!function(t) {
if (t.lowestObserverState === e.IDerivationState.UP_TO_DATE) {
t.lowestObserverState = e.IDerivationState.POSSIBLY_STALE;
for (var i = t.observers, s = i.length; s--; ) {
var r = i[s];
r.dependenciesState === e.IDerivationState.UP_TO_DATE && (r.dependenciesState = e.IDerivationState.POSSIBLY_STALE, 
r.isTracing !== ot.NONE && Ht(r, t), r.onBecomeStale());
}
}
}(this);
}, t.prototype.onBecomeUnobserved = function() {}, t.prototype.onBecomeObserved = function() {}, 
t.prototype.get = function() {
this.isComputing && h("Cycle detected in computation " + this.name + ": " + this.derivation), 
0 !== Ot.inBatch || 0 !== this.observers.length || this.keepAlive ? (Ut(this), ut(this) && this.trackAndCompute() && function(t) {
if (t.lowestObserverState !== e.IDerivationState.STALE) {
t.lowestObserverState = e.IDerivationState.STALE;
for (var i = t.observers, s = i.length; s--; ) {
var r = i[s];
r.dependenciesState === e.IDerivationState.POSSIBLY_STALE ? r.dependenciesState = e.IDerivationState.STALE : r.dependenciesState === e.IDerivationState.UP_TO_DATE && (t.lowestObserverState = e.IDerivationState.UP_TO_DATE);
}
}
}(this)) : ut(this) && (this.warnAboutUntrackedRead(), zt(), this.value = this.computeValue(!1), 
Jt());
var t = this.value;
if (mt(t)) throw t.cause;
return t;
}, t.prototype.peek = function() {
var t = this.computeValue(!1);
if (mt(t)) throw t.cause;
return t;
}, t.prototype.set = function(t) {
if (this.setter) {
c(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?"), 
this.isRunningSetter = !0;
try {
this.setter.call(this.scope, t);
} finally {
this.isRunningSetter = !1;
}
} else c(!1, !1);
}, t.prototype.trackAndCompute = function() {
Qt() && te({
object: this.scope,
type: "compute",
name: this.name
});
var t = this.value, i = this.dependenciesState === e.IDerivationState.NOT_TRACKING, s = this.computeValue(!0), r = i || mt(t) || mt(s) || !this.equals(t, s);
return r && (this.value = s), r;
}, t.prototype.computeValue = function(t) {
var e;
if (this.isComputing = !0, Ot.computationDepth++, t) e = ft(this, this.derivation, this.scope); else if (!0 === Ot.disableErrorBoundaries) e = this.derivation.call(this.scope); else try {
e = this.derivation.call(this.scope);
} catch (t) {
e = new ct(t);
}
return Ot.computationDepth--, this.isComputing = !1, e;
}, t.prototype.suspend = function() {
this.keepAlive || (dt(this), this.value = void 0);
}, t.prototype.observe = function(t, e) {
var i = this, s = !0, r = void 0;
return ce(function() {
var n = i.get();
if (!s || e) {
var o = yt();
t({
type: "update",
object: i,
newValue: n,
oldValue: r
}), bt(o);
}
s = !1, r = n;
});
}, t.prototype.warnAboutUntrackedRead = function() {}, t.prototype.toJSON = function() {
return this.get();
}, t.prototype.toString = function() {
return this.name + "[" + this.derivation.toString() + "]";
}, t.prototype.valueOf = function() {
return x(this.get());
}, t;
}();
Tt.prototype[S()] = Tt.prototype.valueOf;
var Gt = y("ComputedValue", Tt), Rt = [ "mobxGuid", "spyListeners", "enforceActions", "computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "allowStateReads", "disableErrorBoundaries", "runId", "UNCHANGED" ], Lt = function() {
this.version = 5, this.UNCHANGED = {}, this.trackingDerivation = null, this.computationDepth = 0, 
this.runId = 0, this.mobxGuid = 0, this.inBatch = 0, this.pendingUnobservations = [], 
this.pendingReactions = [], this.isRunningReactions = !1, this.allowStateChanges = !0, 
this.allowStateReads = !0, this.enforceActions = !1, this.spyListeners = [], this.globalReactionErrorHandlers = [], 
this.computedRequiresReaction = !1, this.reactionRequiresObservable = !1, this.observableRequiresReaction = !1, 
this.computedConfigurable = !1, this.disableErrorBoundaries = !1, this.suppressReactionErrors = !1;
}, Ft = !0, Et = !1, Ot = function() {
var t = a();
return t.__mobxInstanceCount > 0 && !t.__mobxGlobals && (Ft = !1), t.__mobxGlobals && t.__mobxGlobals.version !== new Lt().version && (Ft = !1), 
Ft ? t.__mobxGlobals ? (t.__mobxInstanceCount += 1, t.__mobxGlobals.UNCHANGED || (t.__mobxGlobals.UNCHANGED = {}), 
t.__mobxGlobals) : (t.__mobxInstanceCount = 1, t.__mobxGlobals = new Lt()) : (setTimeout(function() {
Et || h("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
}, 1), new Lt());
}();
function jt(t, e) {
var i = t.observers.length;
i && (t.observersIndexes[e.__mapid] = i), t.observers[i] = e, t.lowestObserverState > e.dependenciesState && (t.lowestObserverState = e.dependenciesState);
}
function qt(t, e) {
if (1 === t.observers.length) t.observers.length = 0, Nt(t); else {
var i = t.observers, s = t.observersIndexes, r = i.pop();
if (r !== e) {
var n = s[e.__mapid] || 0;
n ? s[r.__mapid] = n : delete s[r.__mapid], i[n] = r;
}
delete s[e.__mapid];
}
}
function Nt(t) {
!1 === t.isPendingUnobservation && (t.isPendingUnobservation = !0, Ot.pendingUnobservations.push(t));
}
function zt() {
Ot.inBatch++;
}
function Jt() {
if (0 == --Ot.inBatch) {
Xt();
for (var t = Ot.pendingUnobservations, e = 0; e < t.length; e++) {
var i = t[e];
i.isPendingUnobservation = !1, 0 === i.observers.length && (i.isBeingObserved && (i.isBeingObserved = !1, 
i.onBecomeUnobserved()), i instanceof Tt && i.suspend());
}
Ot.pendingUnobservations = [];
}
}
function Ut(t) {
var e = Ot.trackingDerivation;
return null !== e ? (e.runId !== t.lastAccessedBy && (t.lastAccessedBy = e.runId, 
e.newObserving[e.unboundDepsCount++] = t, t.isBeingObserved || (t.isBeingObserved = !0, 
t.onBecomeObserved())), !0) : (0 === t.observers.length && Ot.inBatch > 0 && Nt(t), 
!1);
}
function Ht(t, e) {
if (console.log("[mobx.trace] '" + t.name + "' is invalidated due to a change in: '" + e.name + "'"), 
t.isTracing === ot.BREAK) {
var i = [];
!function t(e, i, s) {
i.length >= 1e3 ? i.push("(and many more)") : (i.push("" + new Array(s).join("\t") + e.name), 
e.dependencies && e.dependencies.forEach(function(e) {
return t(e, i, s + 1);
}));
}(ye(t), i, 1), new Function("debugger;\n/*\nTracing '" + t.name + "'\n\nYou are entering this break point because derivation '" + t.name + "' is being traced and '" + e.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (t instanceof Tt ? t.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + i.join("\n") + "\n*/\n    ")();
}
}
var Wt = function() {
function t(t, i, s, r) {
void 0 === t && (t = "Reaction@" + l()), void 0 === r && (r = !1), this.name = t, 
this.onInvalidate = i, this.errorHandler = s, this.requiresObservable = r, this.observing = [], 
this.newObserving = [], this.dependenciesState = e.IDerivationState.NOT_TRACKING, 
this.diffValue = 0, this.runId = 0, this.unboundDepsCount = 0, this.__mapid = "#" + l(), 
this.isDisposed = !1, this._isScheduled = !1, this._isTrackPending = !1, this._isRunning = !1, 
this.isTracing = ot.NONE;
}
return t.prototype.onBecomeStale = function() {
this.schedule();
}, t.prototype.schedule = function() {
this._isScheduled || (this._isScheduled = !0, Ot.pendingReactions.push(this), Xt());
}, t.prototype.isScheduled = function() {
return this._isScheduled;
}, t.prototype.runReaction = function() {
if (!this.isDisposed) {
if (zt(), this._isScheduled = !1, ut(this)) {
this._isTrackPending = !0;
try {
this.onInvalidate(), this._isTrackPending && Qt() && te({
name: this.name,
type: "scheduled-reaction"
});
} catch (t) {
this.reportExceptionInDerivation(t);
}
}
Jt();
}
}, t.prototype.track = function(t) {
zt();
var e, i = Qt();
i && (e = Date.now(), ee({
name: this.name,
type: "reaction"
})), this._isRunning = !0;
var s = ft(this, t, void 0);
this._isRunning = !1, this._isTrackPending = !1, this.isDisposed && dt(this), mt(s) && this.reportExceptionInDerivation(s.cause), 
i && se({
time: Date.now() - e
}), Jt();
}, t.prototype.reportExceptionInDerivation = function(t) {
var e = this;
if (this.errorHandler) this.errorHandler(t, this); else {
if (Ot.disableErrorBoundaries) throw t;
var i = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
Ot.suppressReactionErrors ? console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)") : console.error(i, t), 
Qt() && te({
type: "error",
name: this.name,
message: i,
error: "" + t
}), Ot.globalReactionErrorHandlers.forEach(function(i) {
return i(t, e);
});
}
}, t.prototype.dispose = function() {
this.isDisposed || (this.isDisposed = !0, this._isRunning || (zt(), dt(this), Jt()));
}, t.prototype.getDisposer = function() {
var t = this.dispose.bind(this);
return t.$mobx = this, t;
}, t.prototype.toString = function() {
return "Reaction[" + this.name + "]";
}, t.prototype.trace = function(t) {
void 0 === t && (t = !1), Ie(this, t);
}, t;
}(), Kt = function(t) {
return t();
};
function Xt() {
Ot.inBatch > 0 || Ot.isRunningReactions || Kt(Zt);
}
function Zt() {
Ot.isRunningReactions = !0;
for (var t = Ot.pendingReactions, e = 0; t.length > 0; ) {
100 == ++e && (console.error("Reaction doesn't converge to a stable state after 100 iterations. Probably there is a cycle in the reactive function: " + t[0]), 
t.splice(0));
for (var i = t.splice(0), s = 0, r = i.length; s < r; s++) i[s].runReaction();
}
Ot.isRunningReactions = !1;
}
var $t = y("Reaction", Wt);
function Yt(t) {
var e = Kt;
Kt = function(i) {
return t(function() {
return e(i);
});
};
}
function Qt() {
return !!Ot.spyListeners.length;
}
function te(t) {
if (Ot.spyListeners.length) for (var e = Ot.spyListeners, i = 0, s = e.length; i < s; i++) e[i](t);
}
function ee(t) {
te(L(L({}, t), {
spyReportStart: !0
}));
}
var ie = {
spyReportEnd: !0
};
function se(t) {
te(t ? L(L({}, t), {
spyReportEnd: !0
}) : ie);
}
function re(t) {
return Ot.spyListeners.push(t), m(function() {
Ot.spyListeners = Ot.spyListeners.filter(function(e) {
return e !== t;
});
});
}
function ne() {
h(!1);
}
function oe(t) {
return function(e, i, s) {
if (s) {
if (s.value) return {
value: wt(t, s.value),
enumerable: !1,
configurable: !0,
writable: !0
};
var r = s.initializer;
return {
enumerable: !1,
configurable: !0,
writable: !0,
initializer: function() {
return wt(t, r.call(this));
}
};
}
return ae(t).apply(this, arguments);
};
}
function ae(e) {
return function(i, s) {
t.a(i, s, {
configurable: !0,
enumerable: !1,
get: function() {},
set: function(t) {
d(this, s, le(e, t));
}
});
};
}
var le = function(t, e, i, s) {
return 1 === arguments.length && "function" == typeof t ? wt(t.name || "<unnamed action>", t) : 2 === arguments.length && "function" == typeof e ? wt(t, e) : 1 === arguments.length && "string" == typeof t ? oe(t) : !0 !== s ? oe(e).apply(null, arguments) : void (t[e] = wt(t.name || e, i.value));
};
function he(t, e, i) {
d(t, e, wt(e, i.bind(t)));
}
function ce(t, e) {
void 0 === e && (e = n);
var i, s = e && e.name || t.name || "Autorun@" + l();
if (e.scheduler || e.delay) {
var r = ue(e), o = !1;
i = new Wt(s, function() {
o || (o = !0, r(function() {
o = !1, i.isDisposed || i.track(a);
}));
}, e.onError, e.requiresObservable);
} else i = new Wt(s, function() {
this.track(a);
}, e.onError, e.requiresObservable);
function a() {
t(i);
}
return i.schedule(), i.getDisposer();
}
le.bound = function(t, e, i, s) {
return !0 === s ? (he(t, e, i.value), null) : i ? {
configurable: !0,
enumerable: !1,
get: function() {
return he(this, e, i.value || i.initializer.call(this)), this[e];
},
set: ne
} : {
enumerable: !1,
configurable: !0,
set: function(t) {
he(this, e, t);
},
get: function() {}
};
};
var me = function(t) {
return t();
};
function ue(t) {
return t.scheduler ? t.scheduler : t.delay ? function(e) {
return setTimeout(e, t.delay);
} : me;
}
function _e(t, e, i) {
return de("onBecomeObserved", t, e, i);
}
function fe(t, e, i) {
return de("onBecomeUnobserved", t, e, i);
}
function de(t, e, i, s) {
var r = "function" == typeof s ? yi(e, i) : yi(e), n = "function" == typeof s ? s : i, o = r[t];
return "function" != typeof o ? h(!1) : (r[t] = function() {
o.call(this), n.call(this);
}, function() {
r[t] = o;
});
}
function pe(e, i, s, r) {
var n = (r = Z(r)).defaultDecorator || (!1 === r.deep ? tt : Y);
N(e), ci(e, r.name, n.enhancer), zt();
try {
for (var o = Object.getOwnPropertyNames(i), a = 0, l = o.length; a < l; a++) {
var h = o[a], c = Object.getOwnPropertyDescriptor(i, h), m = (s && h in s ? s[h] : c.get ? at : n)(e, h, c, !0);
m && t.a(e, h, m);
}
} finally {
Jt();
}
return e;
}
function ye(t, e) {
return be(yi(t, e));
}
function be(t) {
var e, i, s = {
name: t.name
};
return t.observing && t.observing.length > 0 && (s.dependencies = (e = t.observing, 
i = [], e.forEach(function(t) {
-1 === i.indexOf(t) && i.push(t);
}), i).map(be)), s;
}
function ve(t) {
var e = {
name: t.name
};
return function(t) {
return t.observers && t.observers.length > 0;
}(t) && (e.observers = function(t) {
return t.observers;
}(t).map(ve)), e;
}
var ge = 0;
function Se() {
this.message = "FLOW_CANCELLED";
}
function xe(t) {
"function" == typeof t.cancel && t.cancel();
}
function Ae(t, e) {
if (null == t) return !1;
if (void 0 !== e) {
if (!1 === pi(t)) return !1;
if (!t.$mobx.values[e]) return !1;
var i = yi(t, e);
return Gt(i);
}
return Gt(t);
}
function Be(t, e) {
if (null == t) return !1;
if (void 0 !== e) {
if (pi(t)) {
var i = t.$mobx;
return i.values && !!i.values[e];
}
return !1;
}
return pi(t) || !!t.$mobx || I(t) || $t(t) || Gt(t);
}
function we(t) {
return 1 !== arguments.length && h(!1), Be(t);
}
function Ce(t) {
return pi(t) ? t.$mobx.getKeys() : ni(t) ? g(t.keys()) : li(t) ? g(t.keys()) : ei(t) ? t.map(function(t, e) {
return e;
}) : h(!1);
}
function Ve(t, e) {
if (pi(t)) {
var i = bi(t);
return i.getKeys(), !!i.values[e];
}
return ni(t) ? t.has(e) : li(t) ? t.has(e) : ei(t) ? e >= 0 && e < t.length : h(!1);
}
Se.prototype = Object.create(Error.prototype);
var Me = {
detectCycles: !0,
exportMapsAsObjects: !0,
recurseEverything: !1
};
function Pe(t, e, i, s) {
return s.detectCycles && t.set(e, i), i;
}
function Ie() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
var i = !1;
"boolean" == typeof t[t.length - 1] && (i = t.pop());
var s = ke(t);
if (!s) return h(!1);
s.isTracing === ot.NONE && console.log("[mobx.trace] '" + s.name + "' tracing enabled"), 
s.isTracing = i ? ot.BREAK : ot.LOG;
}
function ke(t) {
switch (t.length) {
case 0:
return Ot.trackingDerivation;

case 1:
return yi(t[0]);

case 2:
return yi(t[0], t[1]);
}
}
function De(t, e) {
void 0 === e && (e = void 0), zt();
try {
return t.apply(e);
} finally {
Jt();
}
}
function Te(t, e, i) {
var s;
"number" == typeof i.timeout && (s = setTimeout(function() {
if (!n.$mobx.isDisposed) {
n();
var t = new Error("WHEN_TIMEOUT");
if (!i.onError) throw t;
i.onError(t);
}
}, i.timeout)), i.name = i.name || "When@" + l();
var r = wt(i.name + "-effect", e), n = ce(function(e) {
t() && (e.dispose(), s && clearTimeout(s), r());
}, i);
return n;
}
function Ge(t, e) {
var i, s = new Promise(function(s, r) {
var n = Te(t, s, L(L({}, e), {
onError: r
}));
i = function() {
n(), r("WHEN_CANCELLED");
};
});
return s.cancel = i, s;
}
function Re(t) {
return void 0 !== t.interceptors && t.interceptors.length > 0;
}
function Le(t, e) {
var i = t.interceptors || (t.interceptors = []);
return i.push(e), m(function() {
var t = i.indexOf(e);
-1 !== t && i.splice(t, 1);
});
}
function Fe(t, e) {
var i = yt();
try {
var s = t.interceptors;
if (s) for (var r = 0, n = s.length; r < n && (c(!(e = s[r](e)) || e.type, "Intercept handlers should return nothing or a change object"), 
e); r++) ;
return e;
} finally {
bt(i);
}
}
function Ee(t) {
return void 0 !== t.changeListeners && t.changeListeners.length > 0;
}
function Oe(t, e) {
var i = t.changeListeners || (t.changeListeners = []);
return i.push(e), m(function() {
var t = i.indexOf(e);
-1 !== t && i.splice(t, 1);
});
}
function je(t, e) {
var i = yt(), s = t.changeListeners;
if (s) {
for (var r = 0, n = (s = s.slice()).length; r < n; r++) s[r](e);
bt(i);
}
}
var qe, Ne, ze, Je, Ue = (qe = !1, Ne = {}, t.a(Ne, "0", {
set: function() {
qe = !0;
}
}), Object.create(Ne)[0] = 1, !1 === qe), He = 0, We = function() {};
ze = We, Je = Array.prototype, void 0 !== Object.setPrototypeOf ? Object.setPrototypeOf(ze.prototype, Je) : void 0 !== ze.prototype.__proto__ ? ze.prototype.__proto__ = Je : ze.prototype = Je, 
Object.isFrozen(Array) && [ "constructor", "push", "shift", "concat", "pop", "unshift", "replace", "find", "findIndex", "splice", "reverse", "sort" ].forEach(function(e) {
t.a(We.prototype, e, {
configurable: !0,
writable: !0,
value: Array.prototype[e]
});
});
var Ke = function() {
function t(t, e, i, s) {
this.array = i, this.owned = s, this.values = [], this.lastKnownLength = 0, this.atom = new P(t || "ObservableArray@" + l()), 
this.enhancer = function(i, s) {
return e(i, s, t + "[..]");
};
}
return t.prototype.dehanceValue = function(t) {
return void 0 !== this.dehancer ? this.dehancer(t) : t;
}, t.prototype.dehanceValues = function(t) {
return void 0 !== this.dehancer && t.length > 0 ? t.map(this.dehancer) : t;
}, t.prototype.intercept = function(t) {
return Le(this, t);
}, t.prototype.observe = function(t, e) {
return void 0 === e && (e = !1), e && t({
object: this.array,
type: "splice",
index: 0,
added: this.values.slice(),
addedCount: this.values.length,
removed: [],
removedCount: 0
}), Oe(this, t);
}, t.prototype.getArrayLength = function() {
return this.atom.reportObserved(), this.values.length;
}, t.prototype.setArrayLength = function(t) {
if ("number" != typeof t || t < 0) throw new Error("[mobx.array] Out of range: " + t);
var e = this.values.length;
if (t !== e) if (t > e) {
for (var i = new Array(t - e), s = 0; s < t - e; s++) i[s] = void 0;
this.spliceWithArray(e, 0, i);
} else this.spliceWithArray(t, e - t);
}, t.prototype.updateArrayLength = function(t, e) {
if (t !== this.lastKnownLength) throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
this.lastKnownLength += e, e > 0 && t + e + 1 > He && Qe(t + e + 1);
}, t.prototype.spliceWithArray = function(t, e, s) {
var r = this;
_t(this.atom);
var n = this.values.length;
if (void 0 === t ? t = 0 : t > n ? t = n : t < 0 && (t = Math.max(0, n + t)), e = 1 === arguments.length ? n - t : null == e ? 0 : Math.max(0, Math.min(e, n - t)), 
void 0 === s && (s = i), Re(this)) {
var o = Fe(this, {
object: this.array,
type: "splice",
index: t,
removedCount: e,
added: s
});
if (!o) return i;
e = o.removedCount, s = o.added;
}
var a = (s = 0 === s.length ? s : s.map(function(t) {
return r.enhancer(t, void 0);
})).length - e;
this.updateArrayLength(n, a);
var l = this.spliceItemsIntoValues(t, e, s);
return 0 === e && 0 === s.length || this.notifyArraySplice(t, s, l), this.dehanceValues(l);
}, t.prototype.spliceItemsIntoValues = function(t, e, i) {
var s;
if (i.length < 1e4) return (s = this.values).splice.apply(s, E([ t, e ], i));
var r = this.values.slice(t, t + e);
return this.values = this.values.slice(0, t).concat(i, this.values.slice(t + e)), 
r;
}, t.prototype.notifyArrayChildUpdate = function(t, e, i) {
var s = !this.owned && Qt(), r = Ee(this), n = r || s ? {
object: this.array,
type: "update",
index: t,
newValue: e,
oldValue: i
} : null;
s && ee(L(L({}, n), {
name: this.atom.name
})), this.atom.reportChanged(), r && je(this, n), s && se();
}, t.prototype.notifyArraySplice = function(t, e, i) {
var s = !this.owned && Qt(), r = Ee(this), n = r || s ? {
object: this.array,
type: "splice",
index: t,
removed: i,
added: e,
removedCount: i.length,
addedCount: e.length
} : null;
s && ee(L(L({}, n), {
name: this.atom.name
})), this.atom.reportChanged(), r && je(this, n), s && se();
}, t;
}(), Xe = function(e) {
function i(i, s, r, n) {
void 0 === r && (r = "ObservableArray@" + l()), void 0 === n && (n = !1);
var o = e.call(this) || this, a = new Ke(r, s, o, n);
if (p(o, "$mobx", a), i && i.length) {
var h = Pt(!0);
o.spliceWithArray(0, 0, i), It(h);
}
return Ue && t.a(a.array, "0", Ze), o;
}
return R(i, e), i.prototype.intercept = function(t) {
return this.$mobx.intercept(t);
}, i.prototype.observe = function(t, e) {
return void 0 === e && (e = !1), this.$mobx.observe(t, e);
}, i.prototype.clear = function() {
return this.splice(0);
}, i.prototype.concat = function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return this.$mobx.atom.reportObserved(), Array.prototype.concat.apply(this.peek(), t.map(function(t) {
return ei(t) ? t.peek() : t;
}));
}, i.prototype.replace = function(t) {
return this.$mobx.spliceWithArray(0, this.$mobx.values.length, t);
}, i.prototype.toJS = function() {
return this.slice();
}, i.prototype.toJSON = function() {
return this.toJS();
}, i.prototype.peek = function() {
return this.$mobx.atom.reportObserved(), this.$mobx.dehanceValues(this.$mobx.values);
}, i.prototype.find = function(t, e, i) {
void 0 === i && (i = 0);
var s = this.findIndex.apply(this, arguments);
return -1 === s ? void 0 : this.get(s);
}, i.prototype.findIndex = function(t, e, i) {
void 0 === i && (i = 0);
for (var s = this.peek(), r = s.length, n = i; n < r; n++) if (t.call(e, s[n], n, this)) return n;
return -1;
}, i.prototype.splice = function(t, e) {
for (var i = [], s = 2; s < arguments.length; s++) i[s - 2] = arguments[s];
switch (arguments.length) {
case 0:
return [];

case 1:
return this.$mobx.spliceWithArray(t);

case 2:
return this.$mobx.spliceWithArray(t, e);
}
return this.$mobx.spliceWithArray(t, e, i);
}, i.prototype.spliceWithArray = function(t, e, i) {
return this.$mobx.spliceWithArray(t, e, i);
}, i.prototype.push = function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
var i = this.$mobx;
return i.spliceWithArray(i.values.length, 0, t), i.values.length;
}, i.prototype.pop = function() {
return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
}, i.prototype.shift = function() {
return this.splice(0, 1)[0];
}, i.prototype.unshift = function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
var i = this.$mobx;
return i.spliceWithArray(0, 0, t), i.values.length;
}, i.prototype.reverse = function() {
var t = this.slice();
return t.reverse.apply(t, arguments);
}, i.prototype.sort = function(t) {
var e = this.slice();
return e.sort.apply(e, arguments);
}, i.prototype.remove = function(t) {
var e = this.$mobx.dehanceValues(this.$mobx.values).indexOf(t);
return e > -1 && (this.splice(e, 1), !0);
}, i.prototype.move = function(t, e) {
function i(t) {
if (t < 0) throw new Error("[mobx.array] Index out of bounds: " + t + " is negative");
var e = this.$mobx.values.length;
if (t >= e) throw new Error("[mobx.array] Index out of bounds: " + t + " is not smaller than " + e);
}
if (i.call(this, t), i.call(this, e), t !== e) {
var s, r = this.$mobx.values;
s = t < e ? E(r.slice(0, t), r.slice(t + 1, e + 1), [ r[t] ], r.slice(e + 1)) : E(r.slice(0, e), [ r[t] ], r.slice(e, t), r.slice(t + 1)), 
this.replace(s);
}
}, i.prototype.get = function(t) {
var e = this.$mobx;
if (e) {
if (t < e.values.length) return e.atom.reportObserved(), e.dehanceValue(e.values[t]);
console.warn("[mobx.array] Attempt to read an array index (" + t + ") that is out of bounds (" + e.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
}
}, i.prototype.set = function(t, e) {
var i = this.$mobx, s = i.values;
if (t < s.length) {
_t(i.atom);
var r = s[t];
if (Re(i)) {
var n = Fe(i, {
type: "update",
object: this,
index: t,
newValue: e
});
if (!n) return;
e = n.newValue;
}
(e = i.enhancer(e, r)) !== r && (s[t] = e, i.notifyArrayChildUpdate(t, e, r));
} else {
if (t !== s.length) throw new Error("[mobx.array] Index out of bounds, " + t + " is larger than " + s.length);
i.spliceWithArray(t, 0, [ e ]);
}
}, i;
}(We);
w(Xe.prototype, function() {
this.$mobx.atom.reportObserved();
var t = this, e = 0;
return C({
next: function() {
return e < t.length ? {
value: t[e++],
done: !1
} : {
done: !0,
value: void 0
};
}
});
}), t.a(Xe.prototype, "length", {
enumerable: !1,
configurable: !0,
get: function() {
return this.$mobx.getArrayLength();
},
set: function(t) {
this.$mobx.setArrayLength(t);
}
}), d(Xe.prototype, V(), "Array"), [ "indexOf", "join", "lastIndexOf", "slice", "toString", "toLocaleString" ].forEach(function(t) {
var e = Array.prototype[t];
c("function" == typeof e, "Base function not defined on Array prototype: '" + t + "'"), 
d(Xe.prototype, t, function() {
return e.apply(this.peek(), arguments);
});
}), [ "every", "filter", "forEach", "map", "some" ].forEach(function(t) {
c("function" == typeof Array.prototype[t], "Base function not defined on Array prototype: '" + t + "'"), 
d(Xe.prototype, t, function(e, i) {
var s = this, r = this.$mobx;
return r.atom.reportObserved(), r.dehanceValues(r.values)[t](function(t, r) {
return e.call(i, t, r, s);
}, i);
});
}), [ "reduce", "reduceRight" ].forEach(function(t) {
d(Xe.prototype, t, function() {
var e = this, i = this.$mobx;
i.atom.reportObserved();
var s = arguments[0];
return arguments[0] = function(t, r, n) {
return r = i.dehanceValue(r), s(t, r, n, e);
}, i.values[t].apply(i.values, arguments);
});
}), function(t, e) {
for (var i = 0; i < e.length; i++) d(t, e[i], t[e[i]]);
}(Xe.prototype, [ "constructor", "intercept", "observe", "clear", "concat", "get", "replace", "toJS", "toJSON", "peek", "find", "findIndex", "splice", "spliceWithArray", "push", "pop", "set", "shift", "unshift", "reverse", "sort", "remove", "move", "toString", "toLocaleString" ]);
var Ze = $e(0);
function $e(t) {
return {
enumerable: !1,
configurable: !1,
get: function() {
return this.get(t);
},
set: function(e) {
this.set(t, e);
}
};
}
function Ye(e) {
t.a(Xe.prototype, "" + e, $e(e));
}
function Qe(t) {
for (var e = He; e < t; e++) Ye(e);
He = t;
}
Qe(1e3);
var ti = y("ObservableArrayAdministration", Ke);
function ei(t) {
return _(t) && ti(t.$mobx);
}
var ii = {}, si = function() {
function e(t, e, i) {
if (void 0 === e && (e = U), void 0 === i && (i = "ObservableMap@" + l()), this.enhancer = e, 
this.name = i, this.$mobx = ii, this._keysAtom = k(this.name + ".keys()"), "function" != typeof Map) throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
this._data = new Map(), this._hasMap = new Map(), this.merge(t);
}
return e.prototype._has = function(t) {
return this._data.has(t);
}, e.prototype.has = function(t) {
var e = this;
if (!Ot.trackingDerivation) return this._has(t);
var i = this._hasMap.get(t);
if (!i) {
var s = i = new kt(this._has(t), H, this.name + "." + ri(t) + "?", !1);
this._hasMap.set(t, s), fe(s, function() {
return e._hasMap.delete(t);
});
}
return i.get();
}, e.prototype.set = function(t, e) {
var i = this._has(t);
if (Re(this)) {
var s = Fe(this, {
type: i ? "update" : "add",
object: this,
newValue: e,
name: t
});
if (!s) return this;
e = s.newValue;
}
return i ? this._updateValue(t, e) : this._addValue(t, e), this;
}, e.prototype.delete = function(t) {
var e = this;
if ((_t(this._keysAtom), Re(this)) && !(r = Fe(this, {
type: "delete",
object: this,
name: t
}))) return !1;
if (this._has(t)) {
var i = Qt(), s = Ee(this), r = s || i ? {
type: "delete",
object: this,
oldValue: this._data.get(t).value,
name: t
} : null;
return i && ee(L(L({}, r), {
name: this.name,
key: t
})), De(function() {
e._keysAtom.reportChanged(), e._updateHasMapEntry(t, !1), e._data.get(t).setNewValue(void 0), 
e._data.delete(t);
}), s && je(this, r), i && se(), !0;
}
return !1;
}, e.prototype._updateHasMapEntry = function(t, e) {
var i = this._hasMap.get(t);
i && i.setNewValue(e);
}, e.prototype._updateValue = function(t, e) {
var i = this._data.get(t);
if ((e = i.prepareNewValue(e)) !== Ot.UNCHANGED) {
var s = Qt(), r = Ee(this), n = r || s ? {
type: "update",
object: this,
oldValue: i.value,
name: t,
newValue: e
} : null;
s && ee(L(L({}, n), {
name: this.name,
key: t
})), i.setNewValue(e), r && je(this, n), s && se();
}
}, e.prototype._addValue = function(t, e) {
var i = this;
_t(this._keysAtom), De(function() {
var s = new kt(e, i.enhancer, i.name + "." + ri(t), !1);
i._data.set(t, s), e = s.value, i._updateHasMapEntry(t, !0), i._keysAtom.reportChanged();
});
var s = Qt(), r = Ee(this), n = r || s ? {
type: "add",
object: this,
name: t,
newValue: e
} : null;
s && ee(L(L({}, n), {
name: this.name,
key: t
})), r && je(this, n), s && se();
}, e.prototype.get = function(t) {
return this.has(t) ? this.dehanceValue(this._data.get(t).get()) : this.dehanceValue(void 0);
}, e.prototype.dehanceValue = function(t) {
return void 0 !== this.dehancer ? this.dehancer(t) : t;
}, e.prototype.keys = function() {
return this._keysAtom.reportObserved(), this._data.keys();
}, e.prototype.values = function() {
var t = this, e = this.keys();
return C({
next: function() {
var i = e.next(), s = i.done, r = i.value;
return {
done: s,
value: s ? void 0 : t.get(r)
};
}
});
}, e.prototype.entries = function() {
var t = this, e = this.keys();
return C({
next: function() {
var i = e.next(), s = i.done, r = i.value;
return {
done: s,
value: s ? void 0 : [ r, t.get(r) ]
};
}
});
}, e.prototype.forEach = function(t, e) {
var i = this;
this._keysAtom.reportObserved(), this._data.forEach(function(s, r) {
return t.call(e, i.get(r), r, i);
});
}, e.prototype.merge = function(t) {
var e = this;
return ni(t) && (t = t.toJS()), De(function() {
var i = Pt(!0);
try {
f(t) ? Object.keys(t).forEach(function(i) {
return e.set(i, t[i]);
}) : Array.isArray(t) ? t.forEach(function(t) {
var i = F(t, 2), s = i[0], r = i[1];
return e.set(s, r);
}) : b(t) ? t.constructor !== Map ? h("Cannot initialize from classes that inherit from Map: " + t.constructor.name) : t.forEach(function(t, i) {
return e.set(i, t);
}) : null != t && h("Cannot initialize map from " + t);
} finally {
It(i);
}
}), this;
}, e.prototype.clear = function() {
var t = this;
De(function() {
pt(function() {
t._data.forEach(function(e, i) {
return t.delete(i);
});
});
});
}, e.prototype.replace = function(t) {
var e = this;
return De(function() {
var i = function(t) {
if (b(t) || ni(t)) return t;
if (Array.isArray(t)) return new Map(t);
if (f(t)) {
var e = new Map();
for (var i in t) e.set(i, t[i]);
return e;
}
return h("Cannot convert to map from '" + t + "'");
}(t), s = new Map(), r = !1;
if (A(e._data.keys(), function(t) {
if (!i.has(t)) if (e.delete(t)) r = !0; else {
var n = e._data.get(t);
s.set(t, n);
}
}), A(i.entries(), function(t) {
var i = F(t, 2), n = i[0], o = i[1], a = e._data.has(n);
if (e.set(n, o), e._data.has(n)) {
var l = e._data.get(n);
s.set(n, l), a || (r = !0);
}
}), !r) if (e._data.size !== s.size) e._keysAtom.reportChanged(); else for (var n = e._data.keys(), o = s.keys(), a = n.next(), l = o.next(); !a.done; ) {
if (a.value !== l.value) {
e._keysAtom.reportChanged();
break;
}
a = n.next(), l = o.next();
}
e._data = s;
}), this;
}, t.a(e.prototype, "size", {
get: function() {
return this._keysAtom.reportObserved(), this._data.size;
},
enumerable: !0,
configurable: !0
}), e.prototype.toPOJO = function() {
var t = this, e = {};
return this.forEach(function(i, s) {
return e["symbol" == typeof s ? s : ri(s)] = t.get(s);
}), e;
}, e.prototype.toJS = function() {
return new Map(this);
}, e.prototype.toJSON = function() {
return this.toPOJO();
}, e.prototype.toString = function() {
var t = this;
return this.name + "[{ " + g(this.keys()).map(function(e) {
return ri(e) + ": " + t.get(e);
}).join(", ") + " }]";
}, e.prototype.observe = function(t) {
return Oe(this, t);
}, e.prototype.intercept = function(t) {
return Le(this, t);
}, e;
}();
function ri(t) {
return t && t.toString ? t.toString() : new String(t).toString();
}
w(si.prototype, function() {
return this.entries();
}), p(si.prototype, V(), "Map");
var ni = y("ObservableMap", si), oi = {}, ai = function() {
function e(t, e, i) {
if (void 0 === e && (e = U), void 0 === i && (i = "ObservableSet@" + l()), this.name = i, 
this.$mobx = oi, this._data = new Set(), this._atom = k(this.name), "function" != typeof Set) throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
this.enhancer = function(t, s) {
return e(t, s, i);
}, t && this.replace(t);
}
return e.prototype.dehanceValue = function(t) {
return void 0 !== this.dehancer ? this.dehancer(t) : t;
}, e.prototype.clear = function() {
var t = this;
De(function() {
pt(function() {
t._data.forEach(function(e) {
t.delete(e);
});
});
});
}, e.prototype.forEach = function(t, e) {
var i = this;
this._atom.reportObserved(), this._data.forEach(function(s) {
t.call(e, s, s, i);
});
}, t.a(e.prototype, "size", {
get: function() {
return this._atom.reportObserved(), this._data.size;
},
enumerable: !0,
configurable: !0
}), e.prototype.add = function(t) {
var e = this;
if ((_t(this._atom), Re(this)) && !(r = Fe(this, {
type: "add",
object: this,
newValue: t
}))) return this;
if (!this.has(t)) {
De(function() {
e._data.add(e.enhancer(t, void 0)), e._atom.reportChanged();
});
var i = Qt(), s = Ee(this), r = s || i ? {
type: "add",
object: this,
newValue: t
} : null;
s && je(this, r);
}
return this;
}, e.prototype.delete = function(t) {
var e = this;
if (Re(this) && !(r = Fe(this, {
type: "delete",
object: this,
oldValue: t
}))) return !1;
if (this.has(t)) {
var i = Qt(), s = Ee(this), r = s || i ? {
type: "delete",
object: this,
oldValue: t
} : null;
return De(function() {
e._atom.reportChanged(), e._data.delete(t);
}), s && je(this, r), !0;
}
return !1;
}, e.prototype.has = function(t) {
return this._atom.reportObserved(), this._data.has(this.dehanceValue(t));
}, e.prototype.entries = function() {
var t = 0, e = g(this.keys()), i = g(this.values());
return C({
next: function() {
var s = t;
return t += 1, s < i.length ? {
value: [ e[s], i[s] ],
done: !1
} : {
done: !0
};
}
});
}, e.prototype.keys = function() {
return this.values();
}, e.prototype.values = function() {
this._atom.reportObserved();
var t, e = this, i = 0;
return void 0 !== this._data.values ? t = g(this._data.values()) : (t = [], this._data.forEach(function(e) {
return t.push(e);
})), C({
next: function() {
return i < t.length ? {
value: e.dehanceValue(t[i++]),
done: !1
} : {
done: !0
};
}
});
}, e.prototype.replace = function(t) {
var e = this;
return li(t) && (t = t.toJS()), De(function() {
var i = Pt(!0);
try {
Array.isArray(t) ? (e.clear(), t.forEach(function(t) {
return e.add(t);
})) : v(t) ? (e.clear(), t.forEach(function(t) {
return e.add(t);
})) : null != t && h("Cannot initialize set from " + t);
} finally {
It(i);
}
}), this;
}, e.prototype.observe = function(t) {
return Oe(this, t);
}, e.prototype.intercept = function(t) {
return Le(this, t);
}, e.prototype.toJS = function() {
return new Set(this);
}, e.prototype.toString = function() {
return this.name + "[ " + g(this.keys()).join(", ") + " ]";
}, e;
}();
w(ai.prototype, function() {
return this.values();
}), p(ai.prototype, V(), "Set");
var li = y("ObservableSet", ai), hi = function() {
function t(t, e, i) {
this.target = t, this.name = e, this.defaultEnhancer = i, this.values = {};
}
return t.prototype.read = function(t, e) {
if (this.target === t || (this.illegalAccess(t, e), this.values[e])) return this.values[e].get();
}, t.prototype.write = function(t, e, i) {
var s = this.target;
s !== t && this.illegalAccess(t, e);
var r = this.values[e];
if (r instanceof Tt) r.set(i); else {
if (Re(this)) {
if (!(a = Fe(this, {
type: "update",
object: s,
name: e,
newValue: i
}))) return;
i = a.newValue;
}
if ((i = r.prepareNewValue(i)) !== Ot.UNCHANGED) {
var n = Ee(this), o = Qt(), a = n || o ? {
type: "update",
object: s,
oldValue: r.value,
name: e,
newValue: i
} : null;
o && ee(L(L({}, a), {
name: this.name,
key: e
})), r.setNewValue(i), n && je(this, a), o && se();
}
}
}, t.prototype.remove = function(t) {
if (this.values[t]) {
var e = this.target;
if (Re(this) && !(n = Fe(this, {
object: e,
name: t,
type: "remove"
}))) return;
try {
zt();
var i = Ee(this), s = Qt(), r = this.values[t].get();
this.keys && this.keys.remove(t), delete this.values[t], delete this.target[t];
var n = i || s ? {
type: "remove",
object: e,
oldValue: r,
name: t
} : null;
s && ee(L(L({}, n), {
name: this.name,
key: t
})), i && je(this, n), s && se();
} finally {
Jt();
}
}
}, t.prototype.illegalAccess = function(t, e) {
console.warn("Property '" + e + "' of '" + t + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
}, t.prototype.observe = function(t) {
return Oe(this, t);
}, t.prototype.intercept = function(t) {
return Le(this, t);
}, t.prototype.getKeys = function() {
var t = this;
return void 0 === this.keys && (this.keys = new Xe(Object.keys(this.values).filter(function(e) {
return t.values[e] instanceof kt;
}), H, "keys(" + this.name + ")", !0)), this.keys.slice();
}, t;
}();
function ci(t, e, i) {
void 0 === e && (e = ""), void 0 === i && (i = U);
var s = t.$mobx;
return s || (f(t) || (e = (t.constructor.name || "ObservableObject") + "@" + l()), 
e || (e = "ObservableObject@" + l()), p(t, "$mobx", s = new hi(t, e, i)), s);
}
function mi(e, i, s, r) {
var n = ci(e);
if (Re(n)) {
var o = Fe(n, {
object: e,
name: i,
type: "add",
newValue: s
});
if (!o) return;
s = o.newValue;
}
s = (n.values[i] = new kt(s, r, n.name + "." + i, !1)).value, t.a(e, i, function(t) {
return ui[t] || (ui[t] = {
configurable: !0,
enumerable: !0,
get: function() {
return this.$mobx.read(this, t);
},
set: function(e) {
this.$mobx.write(this, t, e);
}
});
}(i)), n.keys && n.keys.push(i), function(t, e, i, s) {
var r = Ee(t), n = Qt(), o = r || n ? {
type: "add",
object: e,
name: i,
newValue: s
} : null;
n && ee(L(L({}, o), {
name: t.name,
key: i
}));
r && je(t, o);
n && se();
}(n, e, i, s);
}
var ui = Object.create(null), _i = Object.create(null);
function fi(t) {
return t.$mobx || (N(t), t.$mobx);
}
var di = y("ObservableObjectAdministration", hi);
function pi(t) {
return !!_(t) && (N(t), di(t.$mobx));
}
function yi(t, e) {
if ("object" == typeof t && null !== t) {
if (ei(t)) return void 0 !== e && h(!1), t.$mobx.atom;
if (li(t)) return t.$mobx;
if (ni(t)) {
var i = t;
return void 0 === e ? i._keysAtom : ((s = i._data.get(e) || i._hasMap.get(e)) || h(!1), 
s);
}
var s;
if (N(t), e && !t.$mobx && t[e], pi(t)) return e ? ((s = t.$mobx.values[e]) || h(!1), 
s) : h(!1);
if (I(t) || Gt(t) || $t(t)) return t;
} else if ("function" == typeof t && $t(t.$mobx)) return t.$mobx;
return h(!1);
}
function bi(t, e) {
return t || h("Expecting some object"), void 0 !== e ? bi(yi(t, e)) : I(t) || Gt(t) || $t(t) ? t : ni(t) || li(t) ? t : (N(t), 
t.$mobx ? t.$mobx : void h(!1));
}
function vi(t, e) {
return (void 0 !== e ? yi(t, e) : pi(t) || ni(t) || li(t) ? bi(t) : yi(t)).name;
}
var gi = Object.prototype.toString;
function Si(t, e, i) {
return void 0 === i && (i = -1), function t(e, i, s, r, n) {
if (e === i) return 0 !== e || 1 / e == 1 / i;
if (null == e || null == i) return !1;
if (e != e) return i != i;
var o = typeof e;
if ("function" !== o && "object" !== o && "object" != typeof i) return !1;
e = xi(e), i = xi(i);
var a = gi.call(e);
if (a !== gi.call(i)) return !1;
switch (a) {
case "[object RegExp]":
case "[object String]":
return "" + e == "" + i;

case "[object Number]":
return +e != +e ? +i != +i : 0 == +e ? 1 / +e == 1 / i : +e == +i;

case "[object Date]":
case "[object Boolean]":
return +e == +i;

case "[object Symbol]":
return "undefined" != typeof Symbol && Symbol.valueOf.call(e) === Symbol.valueOf.call(i);
}
var l = "[object Array]" === a;
if (!l) {
if ("object" != typeof e || "object" != typeof i) return !1;
var h = e.constructor, c = i.constructor;
if (h !== c && !("function" == typeof h && h instanceof h && "function" == typeof c && c instanceof c) && "constructor" in e && "constructor" in i) return !1;
}
if (0 === s) return !1;
s < 0 && (s = -1);
n = n || [];
for (var m = (r = r || []).length; m--; ) if (r[m] === e) return n[m] === i;
if (r.push(e), n.push(i), l) {
if ((m = e.length) !== i.length) return !1;
for (;m--; ) if (!t(e[m], i[m], s - 1, r, n)) return !1;
} else {
var u = Object.keys(e), _ = void 0;
if (m = u.length, Object.keys(i).length !== m) return !1;
for (;m--; ) if (!Ai(i, _ = u[m]) || !t(e[_], i[_], s - 1, r, n)) return !1;
}
return r.pop(), n.pop(), !0;
}(t, e, i);
}
function xi(t) {
return ei(t) ? t.peek() : b(t) || ni(t) ? g(t.entries()) : v(t) || li(t) ? g(t.entries()) : t;
}
function Ai(t, e) {
return Object.prototype.hasOwnProperty.call(t, e);
}
"object" == typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ && __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
spy: re,
extras: {
getDebugName: vi
},
$mobx: "$mobx"
}), e.$mobx = "$mobx", e.FlowCancellationError = Se, e.ObservableMap = si, e.ObservableSet = ai, 
e.Reaction = Wt, e._allowStateChanges = function(t, e) {
var i, s = Pt(t);
try {
i = e();
} finally {
It(s);
}
return i;
}, e._allowStateChangesInsideComputed = function(t) {
var e, i = Ot.computationDepth;
Ot.computationDepth = 0;
try {
e = t();
} finally {
Ot.computationDepth = i;
}
return e;
}, e._allowStateReadsEnd = gt, e._allowStateReadsStart = vt, e._endAction = Mt, 
e._getAdministration = bi, e._getGlobalState = function() {
return Ot;
}, e._interceptReads = function(t, e, i) {
var s;
if (ni(t) || ei(t) || Dt(t)) s = bi(t); else {
if (!pi(t)) return h(!1);
if ("string" != typeof e) return h(!1);
s = bi(t, e);
}
return void 0 !== s.dehancer ? h(!1) : (s.dehancer = "function" == typeof e ? e : i, 
function() {
s.dehancer = void 0;
});
}, e._isComputingDerivation = function() {
return null !== Ot.trackingDerivation;
}, e._resetGlobalState = function() {
var t = new Lt();
for (var e in t) -1 === Rt.indexOf(e) && (Ot[e] = t[e]);
Ot.allowStateChanges = !Ot.enforceActions;
}, e._startAction = Vt, e.action = le, e.autorun = ce, e.comparer = T, e.computed = ht, 
e.configure = function(t) {
var e = t.enforceActions, i = t.computedRequiresReaction, s = t.computedConfigurable, r = t.disableErrorBoundaries, n = t.arrayBuffer, o = t.reactionScheduler, l = t.reactionRequiresObservable, c = t.observableRequiresReaction;
if (!0 === t.isolateGlobalState && ((Ot.pendingReactions.length || Ot.inBatch || Ot.isRunningReactions) && h("isolateGlobalState should be called before MobX is running any reactions"), 
Et = !0, Ft && (0 == --a().__mobxInstanceCount && (a().__mobxGlobals = void 0), 
Ot = new Lt())), void 0 !== e) {
var m = void 0;
switch (e) {
case !0:
case "observed":
m = !0;
break;

case !1:
case "never":
m = !1;
break;

case "strict":
case "always":
m = "strict";
break;

default:
h("Invalid value for 'enforceActions': '" + e + "', expected 'never', 'always' or 'observed'");
}
Ot.enforceActions = m, Ot.allowStateChanges = !0 !== m && "strict" !== m;
}
void 0 !== i && (Ot.computedRequiresReaction = !!i), void 0 !== l && (Ot.reactionRequiresObservable = !!l), 
void 0 !== c && (Ot.observableRequiresReaction = !!c, Ot.allowStateReads = !Ot.observableRequiresReaction), 
void 0 !== s && (Ot.computedConfigurable = !!s), void 0 !== r && (!0 === r && console.warn("WARNING: Debug feature only. MobX will NOT recover from errors if this is on."), 
Ot.disableErrorBoundaries = !!r), "number" == typeof n && Qe(n), o && Yt(o);
}, e.createAtom = k, e.decorate = function(e, i) {
var s = "function" == typeof e ? e.prototype : e, r = function(e) {
var r = i[e];
Array.isArray(r) || (r = [ r ]);
var n = Object.getOwnPropertyDescriptor(s, e), o = r.reduce(function(t, i) {
return i(s, e, t);
}, n);
o && t.a(s, e, o);
};
for (var n in i) r(n);
return e;
}, e.entries = function(t) {
return pi(t) ? Ce(t).map(function(e) {
return [ e, t[e] ];
}) : ni(t) ? Ce(t).map(function(e) {
return [ e, t.get(e) ];
}) : li(t) ? g(t.entries()) : ei(t) ? t.map(function(t, e) {
return [ e, t ];
}) : h(!1);
}, e.extendObservable = pe, e.extendShallowObservable = function(t, e, i) {
return pe(t, e, i, X);
}, e.flow = function(t) {
1 !== arguments.length && h("Flow expects one 1 argument and cannot be used as decorator");
var e = t.name || "<unnamed flow>";
return function() {
var i, s = this, r = arguments, n = ++ge, o = le(e + " - runid: " + n + " - init", t).apply(s, r), a = void 0, l = new Promise(function(t, s) {
var r = 0;
function l(t) {
var i;
a = void 0;
try {
i = le(e + " - runid: " + n + " - yield " + r++, o.next).call(o, t);
} catch (t) {
return s(t);
}
c(i);
}
function h(t) {
var i;
a = void 0;
try {
i = le(e + " - runid: " + n + " - yield " + r++, o.throw).call(o, t);
} catch (t) {
return s(t);
}
c(i);
}
function c(e) {
if (!e || "function" != typeof e.then) return e.done ? t(e.value) : (a = Promise.resolve(e.value)).then(l, h);
e.then(c, s);
}
i = s, l(void 0);
});
return l.cancel = le(e + " - runid: " + n + " - cancel", function() {
try {
a && xe(a);
var t = o.return(void 0), e = Promise.resolve(t.value);
e.then(u, u), xe(e), i(new Se());
} catch (t) {
i(t);
}
}), l;
};
}, e.get = function(t, e) {
if (Ve(t, e)) return pi(t) ? t[e] : ni(t) ? t.get(e) : ei(t) ? t[e] : h(!1);
}, e.getAtom = yi, e.getDebugName = vi, e.getDependencyTree = ye, e.getObserverTree = function(t, e) {
return ve(yi(t, e));
}, e.has = Ve, e.intercept = function(t, e, i) {
return "function" == typeof i ? function(t, e, i) {
return bi(t, e).intercept(i);
}(t, e, i) : function(t, e) {
return bi(t).intercept(e);
}(t, e);
}, e.isAction = function(t) {
return "function" == typeof t && !0 === t.isMobxAction;
}, e.isArrayLike = function(t) {
return Array.isArray(t) || ei(t);
}, e.isBoxedObservable = Dt, e.isComputed = function(t) {
return arguments.length > 1 ? h(!1) : Ae(t);
}, e.isComputedProp = function(t, e) {
return "string" != typeof e ? h(!1) : Ae(t, e);
}, e.isFlowCancellationError = function(t) {
return t instanceof Se;
}, e.isObservable = we, e.isObservableArray = ei, e.isObservableMap = ni, e.isObservableObject = pi, 
e.isObservableProp = function(t, e) {
return "string" != typeof e ? h(!1) : Be(t, e);
}, e.isObservableSet = li, e.keys = Ce, e.observable = st, e.observe = function(t, e, i, s) {
return "function" == typeof i ? function(t, e, i, s) {
return bi(t, e).observe(i, s);
}(t, e, i, s) : function(t, e, i) {
return bi(t).observe(e, i);
}(t, e, i);
}, e.onBecomeObserved = _e, e.onBecomeUnobserved = fe, e.onReactionError = function(t) {
return Ot.globalReactionErrorHandlers.push(t), function() {
var e = Ot.globalReactionErrorHandlers.indexOf(t);
e >= 0 && Ot.globalReactionErrorHandlers.splice(e, 1);
};
}, e.reaction = function(t, e, i) {
void 0 === i && (i = n), "boolean" == typeof i && (i = {
fireImmediately: i
});
var s, r, o, a = i.name || "Reaction@" + l(), h = le(a, i.onError ? (s = i.onError, 
r = e, function() {
try {
return r.apply(this, arguments);
} catch (t) {
s.call(this, t);
}
}) : e), c = !i.scheduler && !i.delay, m = ue(i), u = !0, _ = !1, f = i.compareStructural ? T.structural : i.equals || T.default, d = new Wt(a, function() {
u || c ? p() : _ || (_ = !0, m(p));
}, i.onError, i.requiresObservable);
function p() {
if (_ = !1, !d.isDisposed) {
var e = !1;
d.track(function() {
var i = t(d);
e = u || !f(o, i), o = i;
}), u && i.fireImmediately && h(o, d), u || !0 !== e || h(o, d), u && (u = !1);
}
}
return d.schedule(), d.getDisposer();
}, e.remove = function(t, e) {
if (pi(t)) t.$mobx.remove(e); else if (ni(t)) t.delete(e); else if (li(t)) t.delete(e); else {
if (!ei(t)) return h(!1);
"number" != typeof e && (e = parseInt(e, 10)), c(e >= 0, "Not a valid index: '" + e + "'"), 
t.splice(e, 1);
}
}, e.runInAction = function(t, e) {
return Ct("string" == typeof t ? t : t.name || "<unnamed action>", "function" == typeof t ? t : e, this, void 0);
}, e.set = function t(e, i, s) {
if (2 !== arguments.length || li(e)) if (pi(e)) {
var r = e.$mobx, n = r.values[i];
n ? r.write(e, i, s) : mi(e, i, s, r.defaultEnhancer);
} else if (ni(e)) e.set(i, s); else if (li(e)) e.add(i); else {
if (!ei(e)) return h(!1);
"number" != typeof i && (i = parseInt(i, 10)), c(i >= 0, "Not a valid index: '" + i + "'"), 
zt(), i >= e.length && (e.length = i + 1), e[i] = s, Jt();
} else {
zt();
var o = i;
try {
for (var a in o) t(e, a, o[a]);
} finally {
Jt();
}
}
}, e.spy = re, e.toJS = function(t, e) {
var i;
return "boolean" == typeof e && (e = {
detectCycles: e
}), e || (e = Me), e.detectCycles = void 0 === e.detectCycles ? !0 === e.recurseEverything : !0 === e.detectCycles, 
e.detectCycles && (i = new Map()), function t(e, i, s) {
if (!i.recurseEverything && !we(e)) return e;
if ("object" != typeof e) return e;
if (null === e) return null;
if (e instanceof Date) return e;
if (Dt(e)) return t(e.get(), i, s);
if (we(e) && Ce(e), !0 === i.detectCycles && null !== e && s.has(e)) return s.get(e);
if (ei(e) || Array.isArray(e)) {
var r = Pe(s, e, [], i), n = e.map(function(e) {
return t(e, i, s);
});
r.length = n.length;
for (var o = 0, a = n.length; o < a; o++) r[o] = n[o];
return r;
}
if (li(e) || Object.getPrototypeOf(e) === Set.prototype) {
if (!1 === i.exportMapsAsObjects) {
var l = Pe(s, e, new Set(), i);
return e.forEach(function(e) {
l.add(t(e, i, s));
}), l;
}
var h = Pe(s, e, [], i);
return e.forEach(function(e) {
h.push(t(e, i, s));
}), h;
}
if (ni(e) || Object.getPrototypeOf(e) === Map.prototype) {
if (!1 === i.exportMapsAsObjects) {
var c = Pe(s, e, new Map(), i);
return e.forEach(function(e, r) {
c.set(r, t(e, i, s));
}), c;
}
var m = Pe(s, e, {}, i);
return e.forEach(function(e, r) {
m[r] = t(e, i, s);
}), m;
}
var u = Pe(s, e, {}, i);
for (var _ in e) u[_] = t(e[_], i, s);
return u;
}(t, e, i);
}, e.trace = Ie, e.transaction = De, e.untracked = pt, e.values = function(t) {
return pi(t) ? Ce(t).map(function(e) {
return t[e];
}) : ni(t) ? Ce(t).map(function(e) {
return t.get(e);
}) : li(t) ? g(t.values()) : ei(t) ? t.slice() : h(!1);
}, e.when = function(t, e, i) {
return 1 === arguments.length || e && "object" == typeof e ? Ge(t, e) : Te(t, e, i || {});
}, t.a(e, "__esModule", {
value: !0
});
});
}).call(this, t(1), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
},
8: function(t, e, i) {
(function(t, s) {
"object" == typeof e && "undefined" != typeof i ? s(e) : "function" == typeof define && define.amd ? define([ "exports" ], s) : s(t.box2d = {});
})(this, function(e) {
"use strict";
function i(t, e) {
return void 0 !== t ? t : e;
}
const s = 1e37, r = 1e-5, n = r * r, o = 3.14159265359, a = 2, l = 8, h = .1, c = 2, m = .008, u = 2 / 180 * o, _ = 2 * m, f = 8, d = 32, p = 1, y = .2, b = 8 / 180 * o, v = 2, g = v * v, S = .5 * o, x = S * S, A = .2, B = .75, w = -1, C = .75, V = 1, M = .25, P = .5, I = 4, k = 256, D = 2.5, T = .5, G = .01, R = 2 / 180 * o;
class L {
constructor(t = 0, e = 0, i = 0) {
this.major = 0;
this.minor = 0;
this.revision = 0;
this.major = t;
this.minor = e;
this.revision = i;
}
toString() {
return this.major + "." + this.minor + "." + this.revision;
}
}
const F = new L(2, 3, 2);
function E(t, e) {
const i = [];
for (let s = 0; s < t; ++s) i.push(e(s));
return i;
}
function O(t, e = 0) {
const i = [];
for (let s = 0; s < t; ++s) i.push(e);
return i;
}
const j = o / 180, q = 180 / o, N = 2 * o, z = Math.abs, J = Math.min, U = Math.max;
function H(t, e, i) {
return t < e ? e : t > i ? i : t;
}
const W = isFinite;
function K(t) {
return t * t;
}
function X(t) {
return 1 / Math.sqrt(t);
}
const Z = Math.sqrt, $ = Math.pow, Y = Math.cos, Q = Math.sin, tt = Math.acos, et = Math.asin, it = Math.atan2;
class st {
constructor(t = 0, e = 0) {
this.x = t;
this.y = e;
}
Clone() {
return new st(this.x, this.y);
}
SetZero() {
this.x = 0;
this.y = 0;
return this;
}
Set(t, e) {
this.x = t;
this.y = e;
return this;
}
Copy(t) {
this.x = t.x;
this.y = t.y;
return this;
}
SelfAdd(t) {
this.x += t.x;
this.y += t.y;
return this;
}
SelfAddXY(t, e) {
this.x += t;
this.y += e;
return this;
}
SelfSub(t) {
this.x -= t.x;
this.y -= t.y;
return this;
}
SelfSubXY(t, e) {
this.x -= t;
this.y -= e;
return this;
}
SelfMul(t) {
this.x *= t;
this.y *= t;
return this;
}
SelfMulAdd(t, e) {
this.x += t * e.x;
this.y += t * e.y;
return this;
}
SelfMulSub(t, e) {
this.x -= t * e.x;
this.y -= t * e.y;
return this;
}
Dot(t) {
return this.x * t.x + this.y * t.y;
}
Cross(t) {
return this.x * t.y - this.y * t.x;
}
Length() {
const t = this.x, e = this.y;
return Math.sqrt(t * t + e * e);
}
LengthSquared() {
const t = this.x, e = this.y;
return t * t + e * e;
}
Normalize() {
const t = this.Length();
if (t >= r) {
const e = 1 / t;
this.x *= e;
this.y *= e;
}
return t;
}
SelfNormalize() {
const t = this.Length();
if (t >= r) {
const e = 1 / t;
this.x *= e;
this.y *= e;
}
return this;
}
SelfRotate(t) {
const e = Math.cos(t), i = Math.sin(t), s = this.x;
this.x = e * s - i * this.y;
this.y = i * s + e * this.y;
return this;
}
IsValid() {
return isFinite(this.x) && isFinite(this.y);
}
SelfCrossVS(t) {
const e = this.x;
this.x = t * this.y;
this.y = -t * e;
return this;
}
SelfCrossSV(t) {
const e = this.x;
this.x = -t * this.y;
this.y = t * e;
return this;
}
SelfMinV(t) {
this.x = J(this.x, t.x);
this.y = J(this.y, t.y);
return this;
}
SelfMaxV(t) {
this.x = U(this.x, t.x);
this.y = U(this.y, t.y);
return this;
}
SelfAbs() {
this.x = z(this.x);
this.y = z(this.y);
return this;
}
SelfNeg() {
this.x = -this.x;
this.y = -this.y;
return this;
}
SelfSkew() {
const t = this.x;
this.x = -this.y;
this.y = t;
return this;
}
static MakeArray(t) {
return E(t, () => new st());
}
static AbsV(t, e) {
e.x = z(t.x);
e.y = z(t.y);
return e;
}
static MinV(t, e, i) {
i.x = J(t.x, e.x);
i.y = J(t.y, e.y);
return i;
}
static MaxV(t, e, i) {
i.x = U(t.x, e.x);
i.y = U(t.y, e.y);
return i;
}
static ClampV(t, e, i, s) {
s.x = H(t.x, e.x, i.x);
s.y = H(t.y, e.y, i.y);
return s;
}
static RotateV(t, e, i) {
const s = t.x, r = t.y, n = Math.cos(e), o = Math.sin(e);
i.x = n * s - o * r;
i.y = o * s + n * r;
return i;
}
static DotVV(t, e) {
return t.x * e.x + t.y * e.y;
}
static CrossVV(t, e) {
return t.x * e.y - t.y * e.x;
}
static CrossVS(t, e, i) {
const s = t.x;
i.x = e * t.y;
i.y = -e * s;
return i;
}
static CrossVOne(t, e) {
const i = t.x;
e.x = t.y;
e.y = -i;
return e;
}
static CrossSV(t, e, i) {
const s = e.x;
i.x = -t * e.y;
i.y = t * s;
return i;
}
static CrossOneV(t, e) {
const i = t.x;
e.x = -t.y;
e.y = i;
return e;
}
static AddVV(t, e, i) {
i.x = t.x + e.x;
i.y = t.y + e.y;
return i;
}
static SubVV(t, e, i) {
i.x = t.x - e.x;
i.y = t.y - e.y;
return i;
}
static MulSV(t, e, i) {
i.x = e.x * t;
i.y = e.y * t;
return i;
}
static MulVS(t, e, i) {
i.x = t.x * e;
i.y = t.y * e;
return i;
}
static AddVMulSV(t, e, i, s) {
s.x = t.x + e * i.x;
s.y = t.y + e * i.y;
return s;
}
static SubVMulSV(t, e, i, s) {
s.x = t.x - e * i.x;
s.y = t.y - e * i.y;
return s;
}
static AddVCrossSV(t, e, i, s) {
const r = i.x;
s.x = t.x - e * i.y;
s.y = t.y + e * r;
return s;
}
static MidVV(t, e, i) {
i.x = .5 * (t.x + e.x);
i.y = .5 * (t.y + e.y);
return i;
}
static ExtVV(t, e, i) {
i.x = .5 * (e.x - t.x);
i.y = .5 * (e.y - t.y);
return i;
}
static IsEqualToV(t, e) {
return t.x === e.x && t.y === e.y;
}
static DistanceVV(t, e) {
const i = t.x - e.x, s = t.y - e.y;
return Math.sqrt(i * i + s * s);
}
static DistanceSquaredVV(t, e) {
const i = t.x - e.x, s = t.y - e.y;
return i * i + s * s;
}
static NegV(t, e) {
e.x = -t.x;
e.y = -t.y;
return e;
}
}
st.ZERO = new st(0, 0);
st.UNITX = new st(1, 0);
st.UNITY = new st(0, 1);
st.s_t0 = new st();
st.s_t1 = new st();
st.s_t2 = new st();
st.s_t3 = new st();
const rt = new st(0, 0);
class nt {
constructor(t = 0, e = 0, i = 0) {
this.x = t;
this.y = e;
this.z = i;
}
Clone() {
return new nt(this.x, this.y, this.z);
}
SetZero() {
this.x = 0;
this.y = 0;
this.z = 0;
return this;
}
SetXYZ(t, e, i) {
this.x = t;
this.y = e;
this.z = i;
return this;
}
Copy(t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
return this;
}
SelfNeg() {
this.x = -this.x;
this.y = -this.y;
this.z = -this.z;
return this;
}
SelfAdd(t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
return this;
}
SelfAddXYZ(t, e, i) {
this.x += t;
this.y += e;
this.z += i;
return this;
}
SelfSub(t) {
this.x -= t.x;
this.y -= t.y;
this.z -= t.z;
return this;
}
SelfSubXYZ(t, e, i) {
this.x -= t;
this.y -= e;
this.z -= i;
return this;
}
SelfMul(t) {
this.x *= t;
this.y *= t;
this.z *= t;
return this;
}
static DotV3V3(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z;
}
static CrossV3V3(t, e, i) {
const s = t.x, r = t.y, n = t.z, o = e.x, a = e.y, l = e.z;
i.x = r * l - n * a;
i.y = n * o - s * l;
i.z = s * a - r * o;
return i;
}
}
nt.ZERO = new nt(0, 0, 0);
nt.s_t0 = new nt();
class ot {
constructor() {
this.ex = new st(1, 0);
this.ey = new st(0, 1);
}
Clone() {
return new ot().Copy(this);
}
static FromVV(t, e) {
return new ot().SetVV(t, e);
}
static FromSSSS(t, e, i, s) {
return new ot().SetSSSS(t, e, i, s);
}
static FromAngle(t) {
return new ot().SetAngle(t);
}
SetSSSS(t, e, i, s) {
this.ex.Set(t, i);
this.ey.Set(e, s);
return this;
}
SetVV(t, e) {
this.ex.Copy(t);
this.ey.Copy(e);
return this;
}
SetAngle(t) {
const e = Math.cos(t), i = Math.sin(t);
this.ex.Set(e, i);
this.ey.Set(-i, e);
return this;
}
Copy(t) {
this.ex.Copy(t.ex);
this.ey.Copy(t.ey);
return this;
}
SetIdentity() {
this.ex.Set(1, 0);
this.ey.Set(0, 1);
return this;
}
SetZero() {
this.ex.SetZero();
this.ey.SetZero();
return this;
}
GetAngle() {
return Math.atan2(this.ex.y, this.ex.x);
}
GetInverse(t) {
const e = this.ex.x, i = this.ey.x, s = this.ex.y, r = this.ey.y;
let n = e * r - i * s;
0 !== n && (n = 1 / n);
t.ex.x = n * r;
t.ey.x = -n * i;
t.ex.y = -n * s;
t.ey.y = n * e;
return t;
}
Solve(t, e, i) {
const s = this.ex.x, r = this.ey.x, n = this.ex.y, o = this.ey.y;
let a = s * o - r * n;
0 !== a && (a = 1 / a);
i.x = a * (o * t - r * e);
i.y = a * (s * e - n * t);
return i;
}
SelfAbs() {
this.ex.SelfAbs();
this.ey.SelfAbs();
return this;
}
SelfInv() {
this.GetInverse(this);
return this;
}
SelfAddM(t) {
this.ex.SelfAdd(t.ex);
this.ey.SelfAdd(t.ey);
return this;
}
SelfSubM(t) {
this.ex.SelfSub(t.ex);
this.ey.SelfSub(t.ey);
return this;
}
static AbsM(t, e) {
const i = t.ex, s = t.ey;
e.ex.x = z(i.x);
e.ex.y = z(i.y);
e.ey.x = z(s.x);
e.ey.y = z(s.y);
return e;
}
static MulMV(t, e, i) {
const s = t.ex, r = t.ey, n = e.x, o = e.y;
i.x = s.x * n + r.x * o;
i.y = s.y * n + r.y * o;
return i;
}
static MulTMV(t, e, i) {
const s = t.ex, r = t.ey, n = e.x, o = e.y;
i.x = s.x * n + s.y * o;
i.y = r.x * n + r.y * o;
return i;
}
static AddMM(t, e, i) {
const s = t.ex, r = t.ey, n = e.ex, o = e.ey;
i.ex.x = s.x + n.x;
i.ex.y = s.y + n.y;
i.ey.x = r.x + o.x;
i.ey.y = r.y + o.y;
return i;
}
static MulMM(t, e, i) {
const s = t.ex.x, r = t.ex.y, n = t.ey.x, o = t.ey.y, a = e.ex.x, l = e.ex.y, h = e.ey.x, c = e.ey.y;
i.ex.x = s * a + n * l;
i.ex.y = r * a + o * l;
i.ey.x = s * h + n * c;
i.ey.y = r * h + o * c;
return i;
}
static MulTMM(t, e, i) {
const s = t.ex.x, r = t.ex.y, n = t.ey.x, o = t.ey.y, a = e.ex.x, l = e.ex.y, h = e.ey.x, c = e.ey.y;
i.ex.x = s * a + r * l;
i.ex.y = n * a + o * l;
i.ey.x = s * h + r * c;
i.ey.y = n * h + o * c;
return i;
}
}
ot.IDENTITY = new ot();
class at {
constructor() {
this.ex = new nt(1, 0, 0);
this.ey = new nt(0, 1, 0);
this.ez = new nt(0, 0, 1);
}
Clone() {
return new at().Copy(this);
}
SetVVV(t, e, i) {
this.ex.Copy(t);
this.ey.Copy(e);
this.ez.Copy(i);
return this;
}
Copy(t) {
this.ex.Copy(t.ex);
this.ey.Copy(t.ey);
this.ez.Copy(t.ez);
return this;
}
SetIdentity() {
this.ex.SetXYZ(1, 0, 0);
this.ey.SetXYZ(0, 1, 0);
this.ez.SetXYZ(0, 0, 1);
return this;
}
SetZero() {
this.ex.SetZero();
this.ey.SetZero();
this.ez.SetZero();
return this;
}
SelfAddM(t) {
this.ex.SelfAdd(t.ex);
this.ey.SelfAdd(t.ey);
this.ez.SelfAdd(t.ez);
return this;
}
Solve33(t, e, i, s) {
const r = this.ex.x, n = this.ex.y, o = this.ex.z, a = this.ey.x, l = this.ey.y, h = this.ey.z, c = this.ez.x, m = this.ez.y, u = this.ez.z;
let _ = r * (l * u - h * m) + n * (h * c - a * u) + o * (a * m - l * c);
0 !== _ && (_ = 1 / _);
s.x = _ * (t * (l * u - h * m) + e * (h * c - a * u) + i * (a * m - l * c));
s.y = _ * (r * (e * u - i * m) + n * (i * c - t * u) + o * (t * m - e * c));
s.z = _ * (r * (l * i - h * e) + n * (h * t - a * i) + o * (a * e - l * t));
return s;
}
Solve22(t, e, i) {
const s = this.ex.x, r = this.ey.x, n = this.ex.y, o = this.ey.y;
let a = s * o - r * n;
0 !== a && (a = 1 / a);
i.x = a * (o * t - r * e);
i.y = a * (s * e - n * t);
return i;
}
GetInverse22(t) {
const e = this.ex.x, i = this.ey.x, s = this.ex.y, r = this.ey.y;
let n = e * r - i * s;
0 !== n && (n = 1 / n);
t.ex.x = n * r;
t.ey.x = -n * i;
t.ex.z = 0;
t.ex.y = -n * s;
t.ey.y = n * e;
t.ey.z = 0;
t.ez.x = 0;
t.ez.y = 0;
t.ez.z = 0;
}
GetSymInverse33(t) {
let e = nt.DotV3V3(this.ex, nt.CrossV3V3(this.ey, this.ez, nt.s_t0));
0 !== e && (e = 1 / e);
const i = this.ex.x, s = this.ey.x, r = this.ez.x, n = this.ey.y, o = this.ez.y, a = this.ez.z;
t.ex.x = e * (n * a - o * o);
t.ex.y = e * (r * o - s * a);
t.ex.z = e * (s * o - r * n);
t.ey.x = t.ex.y;
t.ey.y = e * (i * a - r * r);
t.ey.z = e * (r * s - i * o);
t.ez.x = t.ex.z;
t.ez.y = t.ey.z;
t.ez.z = e * (i * n - s * s);
}
static MulM33V3(t, e, i) {
const s = e.x, r = e.y, n = e.z;
i.x = t.ex.x * s + t.ey.x * r + t.ez.x * n;
i.y = t.ex.y * s + t.ey.y * r + t.ez.y * n;
i.z = t.ex.z * s + t.ey.z * r + t.ez.z * n;
return i;
}
static MulM33XYZ(t, e, i, s, r) {
r.x = t.ex.x * e + t.ey.x * i + t.ez.x * s;
r.y = t.ex.y * e + t.ey.y * i + t.ez.y * s;
r.z = t.ex.z * e + t.ey.z * i + t.ez.z * s;
return r;
}
static MulM33V2(t, e, i) {
const s = e.x, r = e.y;
i.x = t.ex.x * s + t.ey.x * r;
i.y = t.ex.y * s + t.ey.y * r;
return i;
}
static MulM33XY(t, e, i, s) {
s.x = t.ex.x * e + t.ey.x * i;
s.y = t.ex.y * e + t.ey.y * i;
return s;
}
}
at.IDENTITY = new at();
class lt {
constructor(t = 0) {
this.s = 0;
this.c = 1;
if (t) {
this.s = Math.sin(t);
this.c = Math.cos(t);
}
}
Clone() {
return new lt().Copy(this);
}
Copy(t) {
this.s = t.s;
this.c = t.c;
return this;
}
SetAngle(t) {
this.s = Math.sin(t);
this.c = Math.cos(t);
return this;
}
SetIdentity() {
this.s = 0;
this.c = 1;
return this;
}
GetAngle() {
return Math.atan2(this.s, this.c);
}
GetXAxis(t) {
t.x = this.c;
t.y = this.s;
return t;
}
GetYAxis(t) {
t.x = -this.s;
t.y = this.c;
return t;
}
static MulRR(t, e, i) {
const s = t.c, r = t.s, n = e.c, o = e.s;
i.s = r * n + s * o;
i.c = s * n - r * o;
return i;
}
static MulTRR(t, e, i) {
const s = t.c, r = t.s, n = e.c, o = e.s;
i.s = s * o - r * n;
i.c = s * n + r * o;
return i;
}
static MulRV(t, e, i) {
const s = t.c, r = t.s, n = e.x, o = e.y;
i.x = s * n - r * o;
i.y = r * n + s * o;
return i;
}
static MulTRV(t, e, i) {
const s = t.c, r = t.s, n = e.x, o = e.y;
i.x = s * n + r * o;
i.y = -r * n + s * o;
return i;
}
}
lt.IDENTITY = new lt();
class ht {
constructor() {
this.p = new st();
this.q = new lt();
}
Clone() {
return new ht().Copy(this);
}
Copy(t) {
this.p.Copy(t.p);
this.q.Copy(t.q);
return this;
}
SetIdentity() {
this.p.SetZero();
this.q.SetIdentity();
return this;
}
SetPositionRotation(t, e) {
this.p.Copy(t);
this.q.Copy(e);
return this;
}
SetPositionAngle(t, e) {
this.p.Copy(t);
this.q.SetAngle(e);
return this;
}
SetPosition(t) {
this.p.Copy(t);
return this;
}
SetPositionXY(t, e) {
this.p.Set(t, e);
return this;
}
SetRotation(t) {
this.q.Copy(t);
return this;
}
SetRotationAngle(t) {
this.q.SetAngle(t);
return this;
}
GetPosition() {
return this.p;
}
GetRotation() {
return this.q;
}
GetRotationAngle() {
return this.q.GetAngle();
}
GetAngle() {
return this.q.GetAngle();
}
static MulXV(t, e, i) {
const s = t.q.c, r = t.q.s, n = e.x, o = e.y;
i.x = s * n - r * o + t.p.x;
i.y = r * n + s * o + t.p.y;
return i;
}
static MulTXV(t, e, i) {
const s = t.q.c, r = t.q.s, n = e.x - t.p.x, o = e.y - t.p.y;
i.x = s * n + r * o;
i.y = -r * n + s * o;
return i;
}
static MulXX(t, e, i) {
lt.MulRR(t.q, e.q, i.q);
st.AddVV(lt.MulRV(t.q, e.p, i.p), t.p, i.p);
return i;
}
static MulTXX(t, e, i) {
lt.MulTRR(t.q, e.q, i.q);
lt.MulTRV(t.q, st.SubVV(e.p, t.p, i.p), i.p);
return i;
}
}
ht.IDENTITY = new ht();
class ct {
constructor() {
this.localCenter = new st();
this.c0 = new st();
this.c = new st();
this.a0 = 0;
this.a = 0;
this.alpha0 = 0;
}
Clone() {
return new ct().Copy(this);
}
Copy(t) {
this.localCenter.Copy(t.localCenter);
this.c0.Copy(t.c0);
this.c.Copy(t.c);
this.a0 = t.a0;
this.a = t.a;
this.alpha0 = t.alpha0;
return this;
}
GetTransform(t, e) {
const i = 1 - e;
t.p.x = i * this.c0.x + e * this.c.x;
t.p.y = i * this.c0.y + e * this.c.y;
const s = i * this.a0 + e * this.a;
t.q.SetAngle(s);
t.p.SelfSub(lt.MulRV(t.q, this.localCenter, st.s_t0));
return t;
}
Advance(t) {
const e = (t - this.alpha0) / (1 - this.alpha0), i = 1 - e;
this.c0.x = i * this.c0.x + e * this.c.x;
this.c0.y = i * this.c0.y + e * this.c.y;
this.a0 = i * this.a0 + e * this.a;
this.alpha0 = t;
}
Normalize() {
const t = N * Math.floor(this.a0 / N);
this.a0 -= t;
this.a -= t;
}
}
class mt {
constructor(t = .5, e = .5, i = .5, s = 1) {
this.r = t;
this.g = e;
this.b = i;
this.a = s;
}
Clone() {
return new mt().Copy(this);
}
Copy(t) {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
return this;
}
IsEqual(t) {
return this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a;
}
IsZero() {
return 0 === this.r && 0 === this.g && 0 === this.b && 0 === this.a;
}
Set(t, e, i, s = this.a) {
this.SetRGBA(t, e, i, s);
}
SetByteRGB(t, e, i) {
this.r = t / 255;
this.g = e / 255;
this.b = i / 255;
return this;
}
SetByteRGBA(t, e, i, s) {
this.r = t / 255;
this.g = e / 255;
this.b = i / 255;
this.a = s / 255;
return this;
}
SetRGB(t, e, i) {
this.r = t;
this.g = e;
this.b = i;
return this;
}
SetRGBA(t, e, i, s) {
this.r = t;
this.g = e;
this.b = i;
this.a = s;
return this;
}
SelfAdd(t) {
this.r += t.r;
this.g += t.g;
this.b += t.b;
this.a += t.a;
return this;
}
Add(t, e) {
e.r = this.r + t.r;
e.g = this.g + t.g;
e.b = this.b + t.b;
e.a = this.a + t.a;
return e;
}
SelfSub(t) {
this.r -= t.r;
this.g -= t.g;
this.b -= t.b;
this.a -= t.a;
return this;
}
Sub(t, e) {
e.r = this.r - t.r;
e.g = this.g - t.g;
e.b = this.b - t.b;
e.a = this.a - t.a;
return e;
}
SelfMul(t) {
this.r *= t;
this.g *= t;
this.b *= t;
this.a *= t;
return this;
}
Mul(t, e) {
e.r = this.r * t;
e.g = this.g * t;
e.b = this.b * t;
e.a = this.a * t;
return e;
}
Mix(t, e) {
mt.MixColors(this, t, e);
}
static MixColors(t, e, i) {
const s = i * (e.r - t.r), r = i * (e.g - t.g), n = i * (e.b - t.b), o = i * (e.a - t.a);
t.r += s;
t.g += r;
t.b += n;
t.a += o;
e.r -= s;
e.g -= r;
e.b -= n;
e.a -= o;
}
MakeStyleString(t = this.a) {
return mt.MakeStyleString(this.r, this.g, this.b, t);
}
static MakeStyleString(t, e, i, s = 1) {
t *= 255;
e *= 255;
i *= 255;
return s < 1 ? `rgba(${t},${e},${i},${s})` : `rgb(${t},${e},${i})`;
}
}
mt.ZERO = new mt(0, 0, 0, 0);
mt.RED = new mt(1, 0, 0);
mt.GREEN = new mt(0, 1, 0);
mt.BLUE = new mt(0, 0, 1);
(function(t) {
t[t.e_none = 0] = "e_none";
t[t.e_shapeBit = 1] = "e_shapeBit";
t[t.e_jointBit = 2] = "e_jointBit";
t[t.e_aabbBit = 4] = "e_aabbBit";
t[t.e_pairBit = 8] = "e_pairBit";
t[t.e_centerOfMassBit = 16] = "e_centerOfMassBit";
t[t.e_particleBit = 32] = "e_particleBit";
t[t.e_controllerBit = 64] = "e_controllerBit";
t[t.e_all = 63] = "e_all";
})(e.b2DrawFlags || (e.b2DrawFlags = {}));
class ut {
constructor() {
this.m_start = Date.now();
}
Reset() {
this.m_start = Date.now();
return this;
}
GetMilliseconds() {
return Date.now() - this.m_start;
}
}
class _t {
constructor(t) {
this.m_stack = [];
this.m_count = 0;
this.m_stack = E(t, () => null);
this.m_count = 0;
}
Reset() {
this.m_count = 0;
return this;
}
Push(t) {
this.m_stack[this.m_count] = t;
this.m_count++;
}
Pop() {
this.m_count--;
const t = this.m_stack[this.m_count];
this.m_stack[this.m_count] = null;
if (null === t) throw new Error();
return t;
}
GetCount() {
return this.m_count;
}
}
class ft {
constructor() {
this.m_buffer = st.MakeArray(2);
this.m_vertices = this.m_buffer;
this.m_count = 0;
this.m_radius = 0;
}
Copy(t) {
if (t.m_vertices === t.m_buffer) {
this.m_vertices = this.m_buffer;
this.m_buffer[0].Copy(t.m_buffer[0]);
this.m_buffer[1].Copy(t.m_buffer[1]);
} else this.m_vertices = t.m_vertices;
this.m_count = t.m_count;
this.m_radius = t.m_radius;
return this;
}
Reset() {
this.m_vertices = this.m_buffer;
this.m_count = 0;
this.m_radius = 0;
return this;
}
SetShape(t, e) {
t.SetupDistanceProxy(this, e);
}
SetVerticesRadius(t, e, i) {
this.m_vertices = t;
this.m_count = e;
this.m_radius = i;
}
GetSupport(t) {
let e = 0, i = st.DotVV(this.m_vertices[0], t);
for (let s = 1; s < this.m_count; ++s) {
const r = st.DotVV(this.m_vertices[s], t);
if (r > i) {
e = s;
i = r;
}
}
return e;
}
GetSupportVertex(t) {
let e = 0, i = st.DotVV(this.m_vertices[0], t);
for (let s = 1; s < this.m_count; ++s) {
const r = st.DotVV(this.m_vertices[s], t);
if (r > i) {
e = s;
i = r;
}
}
return this.m_vertices[e];
}
GetVertexCount() {
return this.m_count;
}
GetVertex(t) {
return this.m_vertices[t];
}
}
class dt {
constructor() {
this.metric = 0;
this.count = 0;
this.indexA = [ 0, 0, 0 ];
this.indexB = [ 0, 0, 0 ];
}
Reset() {
this.metric = 0;
this.count = 0;
return this;
}
}
class pt {
constructor() {
this.proxyA = new ft();
this.proxyB = new ft();
this.transformA = new ht();
this.transformB = new ht();
this.useRadii = !1;
}
Reset() {
this.proxyA.Reset();
this.proxyB.Reset();
this.transformA.SetIdentity();
this.transformB.SetIdentity();
this.useRadii = !1;
return this;
}
}
class yt {
constructor() {
this.pointA = new st();
this.pointB = new st();
this.distance = 0;
this.iterations = 0;
}
Reset() {
this.pointA.SetZero();
this.pointB.SetZero();
this.distance = 0;
this.iterations = 0;
return this;
}
}
e.b2_gjkCalls = 0;
e.b2_gjkIters = 0;
e.b2_gjkMaxIters = 0;
class bt {
constructor() {
this.wA = new st();
this.wB = new st();
this.w = new st();
this.a = 0;
this.indexA = 0;
this.indexB = 0;
}
Copy(t) {
this.wA.Copy(t.wA);
this.wB.Copy(t.wB);
this.w.Copy(t.w);
this.a = t.a;
this.indexA = t.indexA;
this.indexB = t.indexB;
return this;
}
}
class vt {
constructor() {
this.m_v1 = new bt();
this.m_v2 = new bt();
this.m_v3 = new bt();
this.m_vertices = [];
this.m_count = 0;
this.m_vertices[0] = this.m_v1;
this.m_vertices[1] = this.m_v2;
this.m_vertices[2] = this.m_v3;
}
ReadCache(t, e, i, s, n) {
this.m_count = t.count;
const o = this.m_vertices;
for (let r = 0; r < this.m_count; ++r) {
const a = o[r];
a.indexA = t.indexA[r];
a.indexB = t.indexB[r];
const l = e.GetVertex(a.indexA), h = s.GetVertex(a.indexB);
ht.MulXV(i, l, a.wA);
ht.MulXV(n, h, a.wB);
st.SubVV(a.wB, a.wA, a.w);
a.a = 0;
}
if (this.m_count > 1) {
const e = t.metric, i = this.GetMetric();
(i < .5 * e || 2 * e < i || i < r) && (this.m_count = 0);
}
if (0 === this.m_count) {
const t = o[0];
t.indexA = 0;
t.indexB = 0;
const r = e.GetVertex(0), a = s.GetVertex(0);
ht.MulXV(i, r, t.wA);
ht.MulXV(n, a, t.wB);
st.SubVV(t.wB, t.wA, t.w);
t.a = 1;
this.m_count = 1;
}
}
WriteCache(t) {
t.metric = this.GetMetric();
t.count = this.m_count;
const e = this.m_vertices;
for (let i = 0; i < this.m_count; ++i) {
t.indexA[i] = e[i].indexA;
t.indexB[i] = e[i].indexB;
}
}
GetSearchDirection(t) {
switch (this.m_count) {
case 1:
return st.NegV(this.m_v1.w, t);

case 2:
{
const e = st.SubVV(this.m_v2.w, this.m_v1.w, t);
return st.CrossVV(e, st.NegV(this.m_v1.w, st.s_t0)) > 0 ? st.CrossOneV(e, t) : st.CrossVOne(e, t);
}

default:
return t.SetZero();
}
}
GetClosestPoint(t) {
switch (this.m_count) {
case 0:
return t.SetZero();

case 1:
return t.Copy(this.m_v1.w);

case 2:
return t.Set(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);

case 3:
default:
return t.SetZero();
}
}
GetWitnessPoints(t, e) {
switch (this.m_count) {
case 0:
break;

case 1:
t.Copy(this.m_v1.wA);
e.Copy(this.m_v1.wB);
break;

case 2:
t.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
t.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
e.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
e.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
break;

case 3:
e.x = t.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
e.y = t.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
}
}
GetMetric() {
switch (this.m_count) {
case 0:
case 1:
return 0;

case 2:
return st.DistanceVV(this.m_v1.w, this.m_v2.w);

case 3:
return st.CrossVV(st.SubVV(this.m_v2.w, this.m_v1.w, st.s_t0), st.SubVV(this.m_v3.w, this.m_v1.w, st.s_t1));

default:
return 0;
}
}
Solve2() {
const t = this.m_v1.w, e = this.m_v2.w, i = st.SubVV(e, t, vt.s_e12), s = -st.DotVV(t, i);
if (s <= 0) {
this.m_v1.a = 1;
this.m_count = 1;
return;
}
const r = st.DotVV(e, i);
if (r <= 0) {
this.m_v2.a = 1;
this.m_count = 1;
this.m_v1.Copy(this.m_v2);
return;
}
const n = 1 / (r + s);
this.m_v1.a = r * n;
this.m_v2.a = s * n;
this.m_count = 2;
}
Solve3() {
const t = this.m_v1.w, e = this.m_v2.w, i = this.m_v3.w, s = st.SubVV(e, t, vt.s_e12), r = st.DotVV(t, s), n = st.DotVV(e, s), o = -r, a = st.SubVV(i, t, vt.s_e13), l = st.DotVV(t, a), h = st.DotVV(i, a), c = -l, m = st.SubVV(i, e, vt.s_e23), u = st.DotVV(e, m), _ = st.DotVV(i, m), f = -u, d = st.CrossVV(s, a), p = d * st.CrossVV(e, i), y = d * st.CrossVV(i, t), b = d * st.CrossVV(t, e);
if (o <= 0 && c <= 0) {
this.m_v1.a = 1;
this.m_count = 1;
return;
}
if (n > 0 && o > 0 && b <= 0) {
const t = 1 / (n + o);
this.m_v1.a = n * t;
this.m_v2.a = o * t;
this.m_count = 2;
return;
}
if (h > 0 && c > 0 && y <= 0) {
const t = 1 / (h + c);
this.m_v1.a = h * t;
this.m_v3.a = c * t;
this.m_count = 2;
this.m_v2.Copy(this.m_v3);
return;
}
if (n <= 0 && f <= 0) {
this.m_v2.a = 1;
this.m_count = 1;
this.m_v1.Copy(this.m_v2);
return;
}
if (h <= 0 && _ <= 0) {
this.m_v3.a = 1;
this.m_count = 1;
this.m_v1.Copy(this.m_v3);
return;
}
if (_ > 0 && f > 0 && p <= 0) {
const t = 1 / (_ + f);
this.m_v2.a = _ * t;
this.m_v3.a = f * t;
this.m_count = 2;
this.m_v1.Copy(this.m_v3);
return;
}
const v = 1 / (p + y + b);
this.m_v1.a = p * v;
this.m_v2.a = y * v;
this.m_v3.a = b * v;
this.m_count = 3;
}
}
vt.s_e12 = new st();
vt.s_e13 = new st();
vt.s_e23 = new st();
const gt = new vt(), St = [ 0, 0, 0 ], xt = [ 0, 0, 0 ], At = new st(), Bt = new st(), wt = new st(), Ct = new st(), Vt = new st();
function Mt(t, i, s) {
++e.b2_gjkCalls;
const o = s.proxyA, a = s.proxyB, l = s.transformA, h = s.transformB, c = gt;
c.ReadCache(i, o, l, a, h);
const m = c.m_vertices, u = St, _ = xt;
let f = 0, d = 0;
for (;d < 20; ) {
f = c.m_count;
for (let t = 0; t < f; ++t) {
u[t] = m[t].indexA;
_[t] = m[t].indexB;
}
switch (c.m_count) {
case 1:
break;

case 2:
c.Solve2();
break;

case 3:
c.Solve3();
}
if (3 === c.m_count) break;
const t = c.GetSearchDirection(Bt);
if (t.LengthSquared() < n) break;
const i = m[c.m_count];
i.indexA = o.GetSupport(lt.MulTRV(l.q, st.NegV(t, st.s_t0), Ct));
ht.MulXV(l, o.GetVertex(i.indexA), i.wA);
i.indexB = a.GetSupport(lt.MulTRV(h.q, t, Vt));
ht.MulXV(h, a.GetVertex(i.indexB), i.wB);
st.SubVV(i.wB, i.wA, i.w);
++d;
++e.b2_gjkIters;
let s = !1;
for (let t = 0; t < f; ++t) if (i.indexA === u[t] && i.indexB === _[t]) {
s = !0;
break;
}
if (s) break;
++c.m_count;
}
e.b2_gjkMaxIters = U(e.b2_gjkMaxIters, d);
c.GetWitnessPoints(t.pointA, t.pointB);
t.distance = st.DistanceVV(t.pointA, t.pointB);
t.iterations = d;
c.WriteCache(i);
if (s.useRadii) {
const e = o.m_radius, i = a.m_radius;
if (t.distance > e + i && t.distance > r) {
t.distance -= e + i;
const s = st.SubVV(t.pointB, t.pointA, wt);
s.Normalize();
t.pointA.SelfMulAdd(e, s);
t.pointB.SelfMulSub(i, s);
} else {
const e = st.MidVV(t.pointA, t.pointB, At);
t.pointA.Copy(e);
t.pointB.Copy(e);
t.distance = 0;
}
}
}
const Pt = new st(), It = new vt(), kt = new st(), Dt = new st(), Tt = new st(), Gt = new st(), Rt = new st(), Lt = new st();
(function(t) {
t[t.e_vertex = 0] = "e_vertex";
t[t.e_face = 1] = "e_face";
})(e.b2ContactFeatureType || (e.b2ContactFeatureType = {}));
class Ft {
constructor() {
this._key = 0;
this._key_invalid = !1;
this._indexA = 0;
this._indexB = 0;
this._typeA = 0;
this._typeB = 0;
}
get key() {
if (this._key_invalid) {
this._key_invalid = !1;
this._key = this._indexA | this._indexB << 8 | this._typeA << 16 | this._typeB << 24;
}
return this._key;
}
set key(t) {
this._key = t;
this._key_invalid = !1;
this._indexA = 255 & this._key;
this._indexB = this._key >> 8 & 255;
this._typeA = this._key >> 16 & 255;
this._typeB = this._key >> 24 & 255;
}
get indexA() {
return this._indexA;
}
set indexA(t) {
this._indexA = t;
this._key_invalid = !0;
}
get indexB() {
return this._indexB;
}
set indexB(t) {
this._indexB = t;
this._key_invalid = !0;
}
get typeA() {
return this._typeA;
}
set typeA(t) {
this._typeA = t;
this._key_invalid = !0;
}
get typeB() {
return this._typeB;
}
set typeB(t) {
this._typeB = t;
this._key_invalid = !0;
}
}
class Et {
constructor() {
this.cf = new Ft();
}
Copy(t) {
this.key = t.key;
return this;
}
Clone() {
return new Et().Copy(this);
}
get key() {
return this.cf.key;
}
set key(t) {
this.cf.key = t;
}
}
class Ot {
constructor() {
this.localPoint = new st();
this.normalImpulse = 0;
this.tangentImpulse = 0;
this.id = new Et();
}
static MakeArray(t) {
return E(t, () => new Ot());
}
Reset() {
this.localPoint.SetZero();
this.normalImpulse = 0;
this.tangentImpulse = 0;
this.id.key = 0;
}
Copy(t) {
this.localPoint.Copy(t.localPoint);
this.normalImpulse = t.normalImpulse;
this.tangentImpulse = t.tangentImpulse;
this.id.Copy(t.id);
return this;
}
}
(function(t) {
t[t.e_unknown = -1] = "e_unknown";
t[t.e_circles = 0] = "e_circles";
t[t.e_faceA = 1] = "e_faceA";
t[t.e_faceB = 2] = "e_faceB";
})(e.b2ManifoldType || (e.b2ManifoldType = {}));
class jt {
constructor() {
this.points = Ot.MakeArray(a);
this.localNormal = new st();
this.localPoint = new st();
this.type = e.b2ManifoldType.e_unknown;
this.pointCount = 0;
}
Reset() {
for (let t = 0; t < a; ++t) this.points[t].Reset();
this.localNormal.SetZero();
this.localPoint.SetZero();
this.type = e.b2ManifoldType.e_unknown;
this.pointCount = 0;
}
Copy(t) {
this.pointCount = t.pointCount;
for (let e = 0; e < a; ++e) this.points[e].Copy(t.points[e]);
this.localNormal.Copy(t.localNormal);
this.localPoint.Copy(t.localPoint);
this.type = t.type;
return this;
}
Clone() {
return new jt().Copy(this);
}
}
class qt {
constructor() {
this.normal = new st();
this.points = st.MakeArray(a);
this.separations = O(a);
}
Initialize(t, i, s, r, o) {
if (0 !== t.pointCount) switch (t.type) {
case e.b2ManifoldType.e_circles:
{
this.normal.Set(1, 0);
const e = ht.MulXV(i, t.localPoint, qt.Initialize_s_pointA), a = ht.MulXV(r, t.points[0].localPoint, qt.Initialize_s_pointB);
st.DistanceSquaredVV(e, a) > n && st.SubVV(a, e, this.normal).SelfNormalize();
const l = st.AddVMulSV(e, s, this.normal, qt.Initialize_s_cA), h = st.SubVMulSV(a, o, this.normal, qt.Initialize_s_cB);
st.MidVV(l, h, this.points[0]);
this.separations[0] = st.DotVV(st.SubVV(h, l, st.s_t0), this.normal);
break;
}

case e.b2ManifoldType.e_faceA:
{
lt.MulRV(i.q, t.localNormal, this.normal);
const e = ht.MulXV(i, t.localPoint, qt.Initialize_s_planePoint);
for (let i = 0; i < t.pointCount; ++i) {
const n = ht.MulXV(r, t.points[i].localPoint, qt.Initialize_s_clipPoint), a = s - st.DotVV(st.SubVV(n, e, st.s_t0), this.normal), l = st.AddVMulSV(n, a, this.normal, qt.Initialize_s_cA), h = st.SubVMulSV(n, o, this.normal, qt.Initialize_s_cB);
st.MidVV(l, h, this.points[i]);
this.separations[i] = st.DotVV(st.SubVV(h, l, st.s_t0), this.normal);
}
break;
}

case e.b2ManifoldType.e_faceB:
{
lt.MulRV(r.q, t.localNormal, this.normal);
const e = ht.MulXV(r, t.localPoint, qt.Initialize_s_planePoint);
for (let r = 0; r < t.pointCount; ++r) {
const n = ht.MulXV(i, t.points[r].localPoint, qt.Initialize_s_clipPoint), a = o - st.DotVV(st.SubVV(n, e, st.s_t0), this.normal), l = st.AddVMulSV(n, a, this.normal, qt.Initialize_s_cB), h = st.SubVMulSV(n, s, this.normal, qt.Initialize_s_cA);
st.MidVV(h, l, this.points[r]);
this.separations[r] = st.DotVV(st.SubVV(h, l, st.s_t0), this.normal);
}
this.normal.SelfNeg();
break;
}
}
}
}
qt.Initialize_s_pointA = new st();
qt.Initialize_s_pointB = new st();
qt.Initialize_s_cA = new st();
qt.Initialize_s_cB = new st();
qt.Initialize_s_planePoint = new st();
qt.Initialize_s_clipPoint = new st();
(function(t) {
t[t.b2_nullState = 0] = "b2_nullState";
t[t.b2_addState = 1] = "b2_addState";
t[t.b2_persistState = 2] = "b2_persistState";
t[t.b2_removeState = 3] = "b2_removeState";
})(e.b2PointState || (e.b2PointState = {}));
class Nt {
constructor() {
this.v = new st();
this.id = new Et();
}
static MakeArray(t) {
return E(t, () => new Nt());
}
Copy(t) {
this.v.Copy(t.v);
this.id.Copy(t.id);
return this;
}
}
class zt {
constructor() {
this.p1 = new st();
this.p2 = new st();
this.maxFraction = 1;
}
Copy(t) {
this.p1.Copy(t.p1);
this.p2.Copy(t.p2);
this.maxFraction = t.maxFraction;
return this;
}
}
class Jt {
constructor() {
this.normal = new st();
this.fraction = 0;
}
Copy(t) {
this.normal.Copy(t.normal);
this.fraction = t.fraction;
return this;
}
}
class Ut {
constructor() {
this.lowerBound = new st();
this.upperBound = new st();
this.m_cache_center = new st();
this.m_cache_extent = new st();
}
Copy(t) {
this.lowerBound.Copy(t.lowerBound);
this.upperBound.Copy(t.upperBound);
return this;
}
IsValid() {
const t = this.upperBound.x - this.lowerBound.x, e = this.upperBound.y - this.lowerBound.y;
let i = t >= 0 && e >= 0;
return i && this.lowerBound.IsValid() && this.upperBound.IsValid();
}
GetCenter() {
return st.MidVV(this.lowerBound, this.upperBound, this.m_cache_center);
}
GetExtents() {
return st.ExtVV(this.lowerBound, this.upperBound, this.m_cache_extent);
}
GetPerimeter() {
return 2 * (this.upperBound.x - this.lowerBound.x + (this.upperBound.y - this.lowerBound.y));
}
Combine1(t) {
this.lowerBound.x = J(this.lowerBound.x, t.lowerBound.x);
this.lowerBound.y = J(this.lowerBound.y, t.lowerBound.y);
this.upperBound.x = U(this.upperBound.x, t.upperBound.x);
this.upperBound.y = U(this.upperBound.y, t.upperBound.y);
return this;
}
Combine2(t, e) {
this.lowerBound.x = J(t.lowerBound.x, e.lowerBound.x);
this.lowerBound.y = J(t.lowerBound.y, e.lowerBound.y);
this.upperBound.x = U(t.upperBound.x, e.upperBound.x);
this.upperBound.y = U(t.upperBound.y, e.upperBound.y);
return this;
}
static Combine(t, e, i) {
i.Combine2(t, e);
return i;
}
Contains(t) {
let e = !0;
return (e = (e = (e = e && this.lowerBound.x <= t.lowerBound.x) && this.lowerBound.y <= t.lowerBound.y) && t.upperBound.x <= this.upperBound.x) && t.upperBound.y <= this.upperBound.y;
}
RayCast(t, e) {
let i = -s, n = s;
const o = e.p1.x, a = e.p1.y, l = e.p2.x - e.p1.x, h = e.p2.y - e.p1.y, c = z(l), m = z(h), u = t.normal;
if (c < r) {
if (o < this.lowerBound.x || this.upperBound.x < o) return !1;
} else {
const t = 1 / l;
let e = (this.lowerBound.x - o) * t, s = (this.upperBound.x - o) * t, r = -1;
if (e > s) {
const t = e;
e = s;
s = t;
r = 1;
}
if (e > i) {
u.x = r;
u.y = 0;
i = e;
}
if (i > (n = J(n, s))) return !1;
}
if (m < r) {
if (a < this.lowerBound.y || this.upperBound.y < a) return !1;
} else {
const t = 1 / h;
let e = (this.lowerBound.y - a) * t, s = (this.upperBound.y - a) * t, r = -1;
if (e > s) {
const t = e;
e = s;
s = t;
r = 1;
}
if (e > i) {
u.x = 0;
u.y = r;
i = e;
}
if (i > (n = J(n, s))) return !1;
}
if (i < 0 || e.maxFraction < i) return !1;
t.fraction = i;
return !0;
}
TestContain(t) {
return !(t.x < this.lowerBound.x || this.upperBound.x < t.x || t.y < this.lowerBound.y || this.upperBound.y < t.y);
}
TestOverlap(t) {
const e = t.lowerBound.x - this.upperBound.x, i = t.lowerBound.y - this.upperBound.y, s = this.lowerBound.x - t.upperBound.x, r = this.lowerBound.y - t.upperBound.y;
return !(e > 0 || i > 0 || s > 0 || r > 0);
}
}
function Ht(t, e) {
const i = e.lowerBound.x - t.upperBound.x, s = e.lowerBound.y - t.upperBound.y, r = t.lowerBound.x - e.upperBound.x, n = t.lowerBound.y - e.upperBound.y;
return !(i > 0 || s > 0 || r > 0 || n > 0);
}
function Wt(t, i, s, r, n) {
let o = 0;
const a = i[0], l = i[1], h = st.DotVV(s, a.v) - r, c = st.DotVV(s, l.v) - r;
h <= 0 && t[o++].Copy(a);
c <= 0 && t[o++].Copy(l);
if (h * c < 0) {
const i = h / (h - c), s = t[o].v;
s.x = a.v.x + i * (l.v.x - a.v.x);
s.y = a.v.y + i * (l.v.y - a.v.y);
const r = t[o].id;
r.cf.indexA = n;
r.cf.indexB = a.id.cf.indexB;
r.cf.typeA = e.b2ContactFeatureType.e_vertex;
r.cf.typeB = e.b2ContactFeatureType.e_face;
++o;
}
return o;
}
const Kt = new pt(), Xt = new dt(), Zt = new yt();
function $t(t, e, i, s, n, o) {
const a = Kt.Reset();
a.proxyA.SetShape(t, e);
a.proxyB.SetShape(i, s);
a.transformA.Copy(n);
a.transformB.Copy(o);
a.useRadii = !0;
const l = Xt.Reset();
l.count = 0;
const h = Zt.Reset();
Mt(h, l, a);
return h.distance < 10 * r;
}
function Yt(t) {
if (null === t) throw new Error();
return t;
}
class Qt {
constructor(t = 0) {
this.m_id = 0;
this.aabb = new Ut();
this.parent = null;
this.child1 = null;
this.child2 = null;
this.height = 0;
this.m_id = t;
}
IsLeaf() {
return null === this.child1;
}
}
class te {
constructor() {
this.m_root = null;
this.m_freeList = null;
this.m_path = 0;
this.m_insertionCount = 0;
this.m_stack = new _t(256);
}
Query(t, e) {
if (null === this.m_root) return;
const i = this.m_stack.Reset();
i.Push(this.m_root);
for (;i.GetCount() > 0; ) {
const s = i.Pop();
if (s.aabb.TestOverlap(t)) if (s.IsLeaf()) {
if (!e(s)) return;
} else {
i.Push(Yt(s.child1));
i.Push(Yt(s.child2));
}
}
}
QueryPoint(t, e) {
if (null === this.m_root) return;
const i = this.m_stack.Reset();
i.Push(this.m_root);
for (;i.GetCount() > 0; ) {
const s = i.Pop();
if (s.aabb.TestContain(t)) if (s.IsLeaf()) {
if (!e(s)) return;
} else {
i.Push(Yt(s.child1));
i.Push(Yt(s.child2));
}
}
}
RayCast(t, e) {
if (null === this.m_root) return;
const i = t.p1, s = t.p2, r = st.SubVV(s, i, te.s_r);
r.Normalize();
const n = st.CrossOneV(r, te.s_v), o = st.AbsV(n, te.s_abs_v);
let a = t.maxFraction;
const l = te.s_segmentAABB;
let h = i.x + a * (s.x - i.x), c = i.y + a * (s.y - i.y);
l.lowerBound.x = J(i.x, h);
l.lowerBound.y = J(i.y, c);
l.upperBound.x = U(i.x, h);
l.upperBound.y = U(i.y, c);
const m = this.m_stack.Reset();
m.Push(this.m_root);
for (;m.GetCount() > 0; ) {
const r = m.Pop();
if (!Ht(r.aabb, l)) continue;
const u = r.aabb.GetCenter(), _ = r.aabb.GetExtents();
if (!(z(st.DotVV(n, st.SubVV(i, u, st.s_t0))) - st.DotVV(o, _) > 0)) if (r.IsLeaf()) {
const n = te.s_subInput;
n.p1.Copy(t.p1);
n.p2.Copy(t.p2);
n.maxFraction = a;
const o = e(n, r);
if (0 === o) return;
if (o > 0) {
a = o;
h = i.x + a * (s.x - i.x);
c = i.y + a * (s.y - i.y);
l.lowerBound.x = J(i.x, h);
l.lowerBound.y = J(i.y, c);
l.upperBound.x = U(i.x, h);
l.upperBound.y = U(i.y, c);
}
} else {
m.Push(Yt(r.child1));
m.Push(Yt(r.child2));
}
}
}
AllocateNode() {
if (this.m_freeList) {
const t = this.m_freeList;
this.m_freeList = t.parent;
t.parent = null;
t.child1 = null;
t.child2 = null;
t.height = 0;
delete t.userData;
return t;
}
return new Qt(te.s_node_id++);
}
FreeNode(t) {
t.parent = this.m_freeList;
t.child1 = null;
t.child2 = null;
t.height = -1;
delete t.userData;
this.m_freeList = t;
}
CreateProxy(t, e) {
const i = this.AllocateNode(), s = h, r = h;
i.aabb.lowerBound.x = t.lowerBound.x - s;
i.aabb.lowerBound.y = t.lowerBound.y - r;
i.aabb.upperBound.x = t.upperBound.x + s;
i.aabb.upperBound.y = t.upperBound.y + r;
i.userData = e;
i.height = 0;
this.InsertLeaf(i);
return i;
}
DestroyProxy(t) {
this.RemoveLeaf(t);
this.FreeNode(t);
}
MoveProxy(t, e, i) {
if (t.aabb.Contains(e)) return !1;
this.RemoveLeaf(t);
const s = h + c * (i.x > 0 ? i.x : -i.x), r = h + c * (i.y > 0 ? i.y : -i.y);
t.aabb.lowerBound.x = e.lowerBound.x - s;
t.aabb.lowerBound.y = e.lowerBound.y - r;
t.aabb.upperBound.x = e.upperBound.x + s;
t.aabb.upperBound.y = e.upperBound.y + r;
this.InsertLeaf(t);
return !0;
}
InsertLeaf(t) {
++this.m_insertionCount;
if (null === this.m_root) {
this.m_root = t;
this.m_root.parent = null;
return;
}
const e = t.aabb;
let i = this.m_root;
for (;!i.IsLeaf(); ) {
const t = Yt(i.child1), s = Yt(i.child2), r = i.aabb.GetPerimeter(), n = te.s_combinedAABB;
n.Combine2(i.aabb, e);
const o = n.GetPerimeter(), a = 2 * o, l = 2 * (o - r);
let h;
const c = te.s_aabb;
let m, u, _;
if (t.IsLeaf()) {
c.Combine2(e, t.aabb);
h = c.GetPerimeter() + l;
} else {
c.Combine2(e, t.aabb);
m = t.aabb.GetPerimeter();
h = (u = c.GetPerimeter()) - m + l;
}
if (s.IsLeaf()) {
c.Combine2(e, s.aabb);
_ = c.GetPerimeter() + l;
} else {
c.Combine2(e, s.aabb);
m = s.aabb.GetPerimeter();
_ = (u = c.GetPerimeter()) - m + l;
}
if (a < h && a < _) break;
i = h < _ ? t : s;
}
const s = i, r = s.parent, n = this.AllocateNode();
n.parent = r;
delete n.userData;
n.aabb.Combine2(e, s.aabb);
n.height = s.height + 1;
if (r) {
r.child1 === s ? r.child1 = n : r.child2 = n;
n.child1 = s;
n.child2 = t;
s.parent = n;
t.parent = n;
} else {
n.child1 = s;
n.child2 = t;
s.parent = n;
t.parent = n;
this.m_root = n;
}
let o = t.parent;
for (;null !== o; ) {
const t = Yt((o = this.Balance(o)).child1), e = Yt(o.child2);
o.height = 1 + U(t.height, e.height);
o.aabb.Combine2(t.aabb, e.aabb);
o = o.parent;
}
}
RemoveLeaf(t) {
if (t === this.m_root) {
this.m_root = null;
return;
}
const e = Yt(t.parent), i = e && e.parent;
let s;
s = e.child1 === t ? Yt(e.child2) : Yt(e.child1);
if (i) {
i.child1 === e ? i.child1 = s : i.child2 = s;
s.parent = i;
this.FreeNode(e);
let t = i;
for (;t; ) {
const e = Yt((t = this.Balance(t)).child1), i = Yt(t.child2);
t.aabb.Combine2(e.aabb, i.aabb);
t.height = 1 + U(e.height, i.height);
t = t.parent;
}
} else {
this.m_root = s;
s.parent = null;
this.FreeNode(e);
}
}
Balance(t) {
if (t.IsLeaf() || t.height < 2) return t;
const e = Yt(t.child1), i = Yt(t.child2), s = i.height - e.height;
if (s > 1) {
const s = Yt(i.child1), r = Yt(i.child2);
i.child1 = t;
i.parent = t.parent;
t.parent = i;
null !== i.parent ? i.parent.child1 === t ? i.parent.child1 = i : i.parent.child2 = i : this.m_root = i;
if (s.height > r.height) {
i.child2 = s;
t.child2 = r;
r.parent = t;
t.aabb.Combine2(e.aabb, r.aabb);
i.aabb.Combine2(t.aabb, s.aabb);
t.height = 1 + U(e.height, r.height);
i.height = 1 + U(t.height, s.height);
} else {
i.child2 = r;
t.child2 = s;
s.parent = t;
t.aabb.Combine2(e.aabb, s.aabb);
i.aabb.Combine2(t.aabb, r.aabb);
t.height = 1 + U(e.height, s.height);
i.height = 1 + U(t.height, r.height);
}
return i;
}
if (s < -1) {
const s = Yt(e.child1), r = Yt(e.child2);
e.child1 = t;
e.parent = t.parent;
t.parent = e;
null !== e.parent ? e.parent.child1 === t ? e.parent.child1 = e : e.parent.child2 = e : this.m_root = e;
if (s.height > r.height) {
e.child2 = s;
t.child1 = r;
r.parent = t;
t.aabb.Combine2(i.aabb, r.aabb);
e.aabb.Combine2(t.aabb, s.aabb);
t.height = 1 + U(i.height, r.height);
e.height = 1 + U(t.height, s.height);
} else {
e.child2 = r;
t.child1 = s;
s.parent = t;
t.aabb.Combine2(i.aabb, s.aabb);
e.aabb.Combine2(t.aabb, r.aabb);
t.height = 1 + U(i.height, s.height);
e.height = 1 + U(t.height, r.height);
}
return e;
}
return t;
}
GetHeight() {
return null === this.m_root ? 0 : this.m_root.height;
}
static GetAreaNode(t) {
if (null === t) return 0;
if (t.IsLeaf()) return 0;
let e = t.aabb.GetPerimeter();
return (e += te.GetAreaNode(t.child1)) + te.GetAreaNode(t.child2);
}
GetAreaRatio() {
if (null === this.m_root) return 0;
const t = this.m_root.aabb.GetPerimeter();
return te.GetAreaNode(this.m_root) / t;
}
ComputeHeightNode(t) {
if (!t || t.IsLeaf()) return 0;
const e = this.ComputeHeightNode(t.child1), i = this.ComputeHeightNode(t.child2);
return 1 + U(e, i);
}
ComputeHeight() {
return this.ComputeHeightNode(this.m_root);
}
ValidateStructure(t) {
if (null === t) return;
this.m_root;
const e = t;
if (e.IsLeaf()) return;
const i = Yt(e.child1), s = Yt(e.child2);
this.ValidateStructure(i);
this.ValidateStructure(s);
}
ValidateMetrics(t) {
if (null === t) return;
const e = t;
if (e.IsLeaf()) return;
const i = Yt(e.child1), s = Yt(e.child2);
te.s_aabb.Combine2(i.aabb, s.aabb);
this.ValidateMetrics(i);
this.ValidateMetrics(s);
}
Validate() {}
static GetMaxBalanceNode(t, e) {
if (null === t) return e;
if (t.height <= 1) return e;
const i = Yt(t.child1), s = Yt(t.child2), r = z(s.height - i.height);
return U(e, r);
}
GetMaxBalance() {
return te.GetMaxBalanceNode(this.m_root, 0);
}
RebuildBottomUp() {
this.Validate();
}
static ShiftOriginNode(t, e) {
if (null === t) return;
if (t.height <= 1) return;
const i = t.child1, s = t.child2;
te.ShiftOriginNode(i, e);
te.ShiftOriginNode(s, e);
t.aabb.lowerBound.SelfSub(e);
t.aabb.upperBound.SelfSub(e);
}
ShiftOrigin(t) {
te.ShiftOriginNode(this.m_root, t);
}
}
te.s_r = new st();
te.s_v = new st();
te.s_abs_v = new st();
te.s_segmentAABB = new Ut();
te.s_subInput = new zt();
te.s_combinedAABB = new Ut();
te.s_aabb = new Ut();
te.s_node_id = 0;
class ee {
constructor(t, e) {
this.proxyA = t;
this.proxyB = e;
}
}
class ie {
constructor() {
this.m_tree = new te();
this.m_proxyCount = 0;
this.m_moveCount = 0;
this.m_moveBuffer = [];
this.m_pairCount = 0;
this.m_pairBuffer = [];
}
CreateProxy(t, e) {
const i = this.m_tree.CreateProxy(t, e);
++this.m_proxyCount;
this.BufferMove(i);
return i;
}
DestroyProxy(t) {
this.UnBufferMove(t);
--this.m_proxyCount;
this.m_tree.DestroyProxy(t);
}
MoveProxy(t, e, i) {
this.m_tree.MoveProxy(t, e, i) && this.BufferMove(t);
}
TouchProxy(t) {
this.BufferMove(t);
}
GetProxyCount() {
return this.m_proxyCount;
}
UpdatePairs(t) {
this.m_pairCount = 0;
for (let t = 0; t < this.m_moveCount; ++t) {
const e = this.m_moveBuffer[t];
if (null === e) continue;
const i = e.aabb;
this.m_tree.Query(i, t => {
if (t.m_id === e.m_id) return !0;
let i, s;
if (t.m_id < e.m_id) {
i = t;
s = e;
} else {
i = e;
s = t;
}
if (this.m_pairCount === this.m_pairBuffer.length) this.m_pairBuffer[this.m_pairCount] = new ee(i, s); else {
const t = this.m_pairBuffer[this.m_pairCount];
t.proxyA = i;
t.proxyB = s;
}
++this.m_pairCount;
return !0;
});
}
this.m_moveCount = 0;
this.m_pairBuffer.length = this.m_pairCount;
this.m_pairBuffer.sort(se);
let e = 0;
for (;e < this.m_pairCount; ) {
const i = this.m_pairBuffer[e];
t(i.proxyA.userData, i.proxyB.userData);
++e;
for (;e < this.m_pairCount; ) {
const t = this.m_pairBuffer[e];
if (t.proxyA.m_id !== i.proxyA.m_id || t.proxyB.m_id !== i.proxyB.m_id) break;
++e;
}
}
}
Query(t, e) {
this.m_tree.Query(t, e);
}
QueryPoint(t, e) {
this.m_tree.QueryPoint(t, e);
}
RayCast(t, e) {
this.m_tree.RayCast(t, e);
}
GetTreeHeight() {
return this.m_tree.GetHeight();
}
GetTreeBalance() {
return this.m_tree.GetMaxBalance();
}
GetTreeQuality() {
return this.m_tree.GetAreaRatio();
}
ShiftOrigin(t) {
this.m_tree.ShiftOrigin(t);
}
BufferMove(t) {
this.m_moveBuffer[this.m_moveCount] = t;
++this.m_moveCount;
}
UnBufferMove(t) {
const e = this.m_moveBuffer.indexOf(t);
this.m_moveBuffer[e] = null;
}
}
function se(t, e) {
return t.proxyA.m_id === e.proxyA.m_id ? t.proxyB.m_id - e.proxyB.m_id : t.proxyA.m_id - e.proxyA.m_id;
}
e.b2_toiTime = 0;
e.b2_toiMaxTime = 0;
e.b2_toiCalls = 0;
e.b2_toiIters = 0;
e.b2_toiMaxIters = 0;
e.b2_toiRootIters = 0;
e.b2_toiMaxRootIters = 0;
const re = new ht(), ne = new ht(), oe = new st(), ae = new st(), le = new st(), he = new st(), ce = new st();
class me {
constructor() {
this.proxyA = new ft();
this.proxyB = new ft();
this.sweepA = new ct();
this.sweepB = new ct();
this.tMax = 0;
}
}
(function(t) {
t[t.e_unknown = 0] = "e_unknown";
t[t.e_failed = 1] = "e_failed";
t[t.e_overlapped = 2] = "e_overlapped";
t[t.e_touching = 3] = "e_touching";
t[t.e_separated = 4] = "e_separated";
})(e.b2TOIOutputState || (e.b2TOIOutputState = {}));
class ue {
constructor() {
this.state = e.b2TOIOutputState.e_unknown;
this.t = 0;
}
}
(function(t) {
t[t.e_unknown = -1] = "e_unknown";
t[t.e_points = 0] = "e_points";
t[t.e_faceA = 1] = "e_faceA";
t[t.e_faceB = 2] = "e_faceB";
})(e.b2SeparationFunctionType || (e.b2SeparationFunctionType = {}));
class _e {
constructor() {
this.m_sweepA = new ct();
this.m_sweepB = new ct();
this.m_type = e.b2SeparationFunctionType.e_unknown;
this.m_localPoint = new st();
this.m_axis = new st();
}
Initialize(t, i, s, r, n, o) {
this.m_proxyA = i;
this.m_proxyB = r;
const a = t.count;
this.m_sweepA.Copy(s);
this.m_sweepB.Copy(n);
const l = re, h = ne;
this.m_sweepA.GetTransform(l, o);
this.m_sweepB.GetTransform(h, o);
if (1 === a) {
this.m_type = e.b2SeparationFunctionType.e_points;
const i = this.m_proxyA.GetVertex(t.indexA[0]), s = this.m_proxyB.GetVertex(t.indexB[0]), r = ht.MulXV(l, i, oe), n = ht.MulXV(h, s, ae);
st.SubVV(n, r, this.m_axis);
const o = this.m_axis.Normalize();
this.m_localPoint.SetZero();
return o;
}
if (t.indexA[0] === t.indexA[1]) {
this.m_type = e.b2SeparationFunctionType.e_faceB;
const i = this.m_proxyB.GetVertex(t.indexB[0]), s = this.m_proxyB.GetVertex(t.indexB[1]);
st.CrossVOne(st.SubVV(s, i, st.s_t0), this.m_axis).SelfNormalize();
const r = lt.MulRV(h.q, this.m_axis, le);
st.MidVV(i, s, this.m_localPoint);
const n = ht.MulXV(h, this.m_localPoint, ae), o = this.m_proxyA.GetVertex(t.indexA[0]), a = ht.MulXV(l, o, oe);
let c = st.DotVV(st.SubVV(a, n, st.s_t0), r);
if (c < 0) {
this.m_axis.SelfNeg();
c = -c;
}
return c;
}
{
this.m_type = e.b2SeparationFunctionType.e_faceA;
const i = this.m_proxyA.GetVertex(t.indexA[0]), s = this.m_proxyA.GetVertex(t.indexA[1]);
st.CrossVOne(st.SubVV(s, i, st.s_t0), this.m_axis).SelfNormalize();
const r = lt.MulRV(l.q, this.m_axis, le);
st.MidVV(i, s, this.m_localPoint);
const n = ht.MulXV(l, this.m_localPoint, oe), o = this.m_proxyB.GetVertex(t.indexB[0]), a = ht.MulXV(h, o, ae);
let c = st.DotVV(st.SubVV(a, n, st.s_t0), r);
if (c < 0) {
this.m_axis.SelfNeg();
c = -c;
}
return c;
}
}
FindMinSeparation(t, i, s) {
const r = re, n = ne;
this.m_sweepA.GetTransform(r, s);
this.m_sweepB.GetTransform(n, s);
switch (this.m_type) {
case e.b2SeparationFunctionType.e_points:
{
const e = lt.MulTRV(r.q, this.m_axis, he), s = lt.MulTRV(n.q, st.NegV(this.m_axis, st.s_t0), ce);
t[0] = this.m_proxyA.GetSupport(e);
i[0] = this.m_proxyB.GetSupport(s);
const o = this.m_proxyA.GetVertex(t[0]), a = this.m_proxyB.GetVertex(i[0]), l = ht.MulXV(r, o, oe), h = ht.MulXV(n, a, ae);
return st.DotVV(st.SubVV(h, l, st.s_t0), this.m_axis);
}

case e.b2SeparationFunctionType.e_faceA:
{
const e = lt.MulRV(r.q, this.m_axis, le), s = ht.MulXV(r, this.m_localPoint, oe), o = lt.MulTRV(n.q, st.NegV(e, st.s_t0), ce);
t[0] = -1;
i[0] = this.m_proxyB.GetSupport(o);
const a = this.m_proxyB.GetVertex(i[0]), l = ht.MulXV(n, a, ae);
return st.DotVV(st.SubVV(l, s, st.s_t0), e);
}

case e.b2SeparationFunctionType.e_faceB:
{
const e = lt.MulRV(n.q, this.m_axis, le), s = ht.MulXV(n, this.m_localPoint, ae), o = lt.MulTRV(r.q, st.NegV(e, st.s_t0), he);
i[0] = -1;
t[0] = this.m_proxyA.GetSupport(o);
const a = this.m_proxyA.GetVertex(t[0]), l = ht.MulXV(r, a, oe);
return st.DotVV(st.SubVV(l, s, st.s_t0), e);
}

default:
t[0] = -1;
i[0] = -1;
return 0;
}
}
Evaluate(t, i, s) {
const r = re, n = ne;
this.m_sweepA.GetTransform(r, s);
this.m_sweepB.GetTransform(n, s);
switch (this.m_type) {
case e.b2SeparationFunctionType.e_points:
{
const e = this.m_proxyA.GetVertex(t), s = this.m_proxyB.GetVertex(i), o = ht.MulXV(r, e, oe), a = ht.MulXV(n, s, ae);
return st.DotVV(st.SubVV(a, o, st.s_t0), this.m_axis);
}

case e.b2SeparationFunctionType.e_faceA:
{
const t = lt.MulRV(r.q, this.m_axis, le), e = ht.MulXV(r, this.m_localPoint, oe), s = this.m_proxyB.GetVertex(i), o = ht.MulXV(n, s, ae);
return st.DotVV(st.SubVV(o, e, st.s_t0), t);
}

case e.b2SeparationFunctionType.e_faceB:
{
const e = lt.MulRV(n.q, this.m_axis, le), i = ht.MulXV(n, this.m_localPoint, ae), s = this.m_proxyA.GetVertex(t), o = ht.MulXV(r, s, oe);
return st.DotVV(st.SubVV(o, i, st.s_t0), e);
}

default:
return 0;
}
}
}
const fe = new ut(), de = new dt(), pe = new pt(), ye = new yt(), be = new _e(), ve = [ 0 ], ge = [ 0 ], Se = new ct(), xe = new ct();
function Ae(t, i) {
const s = fe.Reset();
++e.b2_toiCalls;
t.state = e.b2TOIOutputState.e_unknown;
t.t = i.tMax;
const r = i.proxyA, n = i.proxyB, o = U(l, r.m_count, n.m_count), a = Se.Copy(i.sweepA), h = xe.Copy(i.sweepB);
a.Normalize();
h.Normalize();
const c = i.tMax, u = r.m_radius + n.m_radius, _ = U(m, u - 3 * m), f = .25 * m;
let d = 0, p = 0;
const y = de;
y.count = 0;
const b = pe;
b.proxyA.Copy(i.proxyA);
b.proxyB.Copy(i.proxyB);
b.useRadii = !1;
for (;;) {
const i = re, s = ne;
a.GetTransform(i, d);
h.GetTransform(s, d);
b.transformA.Copy(i);
b.transformB.Copy(s);
const l = ye;
Mt(l, y, b);
if (l.distance <= 0) {
t.state = e.b2TOIOutputState.e_overlapped;
t.t = 0;
break;
}
if (l.distance < _ + f) {
t.state = e.b2TOIOutputState.e_touching;
t.t = d;
break;
}
const m = be;
m.Initialize(y, r, a, n, h, d);
let u = !1, v = c, g = 0;
for (;;) {
const i = ve, s = ge;
let r = m.FindMinSeparation(i, s, v);
if (r > _ + f) {
t.state = e.b2TOIOutputState.e_separated;
t.t = c;
u = !0;
break;
}
if (r > _ - f) {
d = v;
break;
}
let n = m.Evaluate(i[0], s[0], d);
if (n < _ - f) {
t.state = e.b2TOIOutputState.e_failed;
t.t = d;
u = !0;
break;
}
if (n <= _ + f) {
t.state = e.b2TOIOutputState.e_touching;
t.t = d;
u = !0;
break;
}
let a = 0, l = d, h = v;
for (;;) {
let t = 0;
t = 1 & a ? l + (_ - n) * (h - l) / (r - n) : .5 * (l + h);
++a;
++e.b2_toiRootIters;
const o = m.Evaluate(i[0], s[0], t);
if (z(o - _) < f) {
v = t;
break;
}
if (o > _) {
l = t;
n = o;
} else {
h = t;
r = o;
}
if (50 === a) break;
}
e.b2_toiMaxRootIters = U(e.b2_toiMaxRootIters, a);
if (++g === o) break;
}
++p;
++e.b2_toiIters;
if (u) break;
if (20 === p) {
t.state = e.b2TOIOutputState.e_failed;
t.t = d;
break;
}
}
e.b2_toiMaxIters = U(e.b2_toiMaxIters, p);
const v = s.GetMilliseconds();
e.b2_toiMaxTime = U(e.b2_toiMaxTime, v);
e.b2_toiTime += v;
}
const Be = new st(), we = new st();
function Ce(t, i, s, r, n) {
t.pointCount = 0;
const o = ht.MulXV(s, i.m_p, Be), a = ht.MulXV(n, r.m_p, we), l = st.DistanceSquaredVV(o, a), h = i.m_radius + r.m_radius;
if (!(l > h * h)) {
t.type = e.b2ManifoldType.e_circles;
t.localPoint.Copy(i.m_p);
t.localNormal.SetZero();
t.pointCount = 1;
t.points[0].localPoint.Copy(r.m_p);
t.points[0].id.key = 0;
}
}
const Ve = new st(), Me = new st(), Pe = new st();
function Ie(t, i, n, o, a) {
t.pointCount = 0;
const l = ht.MulXV(a, o.m_p, Ve), h = ht.MulTXV(n, l, Me);
let c = 0, m = -s;
const u = i.m_radius + o.m_radius, _ = i.m_count, f = i.m_vertices, d = i.m_normals;
for (let t = 0; t < _; ++t) {
const e = st.DotVV(d[t], st.SubVV(h, f[t], st.s_t0));
if (e > u) return;
if (e > m) {
m = e;
c = t;
}
}
const p = c, y = (p + 1) % _, b = f[p], v = f[y];
if (m < r) {
t.pointCount = 1;
t.type = e.b2ManifoldType.e_faceA;
t.localNormal.Copy(d[c]);
st.MidVV(b, v, t.localPoint);
t.points[0].localPoint.Copy(o.m_p);
t.points[0].id.key = 0;
return;
}
const g = st.DotVV(st.SubVV(h, b, st.s_t0), st.SubVV(v, b, st.s_t1)), S = st.DotVV(st.SubVV(h, v, st.s_t0), st.SubVV(b, v, st.s_t1));
if (g <= 0) {
if (st.DistanceSquaredVV(h, b) > u * u) return;
t.pointCount = 1;
t.type = e.b2ManifoldType.e_faceA;
st.SubVV(h, b, t.localNormal).SelfNormalize();
t.localPoint.Copy(b);
t.points[0].localPoint.Copy(o.m_p);
t.points[0].id.key = 0;
} else if (S <= 0) {
if (st.DistanceSquaredVV(h, v) > u * u) return;
t.pointCount = 1;
t.type = e.b2ManifoldType.e_faceA;
st.SubVV(h, v, t.localNormal).SelfNormalize();
t.localPoint.Copy(v);
t.points[0].localPoint.Copy(o.m_p);
t.points[0].id.key = 0;
} else {
const i = st.MidVV(b, v, Pe);
if (st.DotVV(st.SubVV(h, i, st.s_t1), d[p]) > u) return;
t.pointCount = 1;
t.type = e.b2ManifoldType.e_faceA;
t.localNormal.Copy(d[p]).SelfNormalize();
t.localPoint.Copy(i);
t.points[0].localPoint.Copy(o.m_p);
t.points[0].id.key = 0;
}
}
const ke = new st(), De = new st(), Te = new st(), Ge = new st();
function Re(t, e, i, r, n) {
const o = t.m_vertices, a = t.m_normals, l = r.m_count, h = r.m_vertices, c = lt.MulRV(e.q, a[i], ke), m = lt.MulTRV(n.q, c, De);
let u = 0, _ = s;
for (let t = 0; t < l; ++t) {
const e = st.DotVV(h[t], m);
if (e < _) {
_ = e;
u = t;
}
}
const f = ht.MulXV(e, o[i], Te), d = ht.MulXV(n, h[u], Ge);
return st.DotVV(st.SubVV(d, f, st.s_t0), c);
}
const Le = new st(), Fe = new st();
function Ee(t, e, i, r, n) {
const o = e.m_count, a = e.m_normals, l = st.SubVV(ht.MulXV(n, r.m_centroid, st.s_t0), ht.MulXV(i, e.m_centroid, st.s_t1), Le), h = lt.MulTRV(i.q, l, Fe);
let c = 0, m = -s;
for (let t = 0; t < o; ++t) {
const e = st.DotVV(a[t], h);
if (e > m) {
m = e;
c = t;
}
}
let u = Re(e, i, c, r, n);
const _ = (c + o - 1) % o, f = Re(e, i, _, r, n), d = (c + 1) % o, p = Re(e, i, d, r, n);
let y = 0, b = 0, v = 0;
if (f > u && f > p) {
v = -1;
y = _;
b = f;
} else {
if (!(p > u)) {
t[0] = c;
return u;
}
v = 1;
y = d;
b = p;
}
for (;(u = Re(e, i, c = -1 === v ? (y + o - 1) % o : (y + 1) % o, r, n)) > b; ) {
y = c;
b = u;
}
t[0] = y;
return b;
}
const Oe = new st();
function je(t, i, r, n, o, a) {
const l = i.m_normals, h = o.m_count, c = o.m_vertices, m = o.m_normals, u = lt.MulTRV(a.q, lt.MulRV(r.q, l[n], st.s_t0), Oe);
let _ = 0, f = s;
for (let t = 0; t < h; ++t) {
const e = st.DotVV(u, m[t]);
if (e < f) {
f = e;
_ = t;
}
}
const d = _, p = (d + 1) % h, y = t[0];
ht.MulXV(a, c[d], y.v);
const b = y.id.cf;
b.indexA = n;
b.indexB = d;
b.typeA = e.b2ContactFeatureType.e_face;
b.typeB = e.b2ContactFeatureType.e_vertex;
const v = t[1];
ht.MulXV(a, c[p], v.v);
const g = v.id.cf;
g.indexA = n;
g.indexB = p;
g.typeA = e.b2ContactFeatureType.e_face;
g.typeB = e.b2ContactFeatureType.e_vertex;
}
const qe = Nt.MakeArray(2), Ne = Nt.MakeArray(2), ze = Nt.MakeArray(2), Je = [ 0 ], Ue = [ 0 ], He = new st(), We = new st(), Ke = new st(), Xe = new st(), Ze = new st(), $e = new st(), Ye = new st(), Qe = new st();
function ti(t, i, s, r, n) {
t.pointCount = 0;
const o = i.m_radius + r.m_radius, l = Je;
l[0] = 0;
const h = Ee(l, i, s, r, n);
if (h > o) return;
const c = Ue;
c[0] = 0;
const m = Ee(c, r, n, i, s);
if (m > o) return;
let u, _, f, d, p = 0, y = 0;
if (m > .98 * h + .001) {
u = r;
_ = i;
f = n;
d = s;
p = c[0];
t.type = e.b2ManifoldType.e_faceB;
y = 1;
} else {
u = i;
_ = r;
f = s;
d = n;
p = l[0];
t.type = e.b2ManifoldType.e_faceA;
y = 0;
}
const b = qe;
je(b, u, f, p, _, d);
const v = u.m_count, g = u.m_vertices, S = p, x = (p + 1) % v, A = g[S], B = g[x], w = st.SubVV(B, A, He);
w.Normalize();
const C = st.CrossVOne(w, We), V = st.MidVV(A, B, Ke), M = lt.MulRV(f.q, w, Ze), P = st.CrossVOne(M, Xe), I = ht.MulXV(f, A, Ye), k = ht.MulXV(f, B, Qe), D = st.DotVV(P, I), T = -st.DotVV(M, I) + o, G = st.DotVV(M, k) + o, R = Ne, L = ze;
let F;
if ((F = Wt(R, b, st.NegV(M, $e), T, S)) < 2) return;
if ((F = Wt(L, R, M, G, x)) < 2) return;
t.localNormal.Copy(C);
t.localPoint.Copy(V);
let E = 0;
for (let e = 0; e < a; ++e) {
const i = L[e];
if (st.DotVV(P, i.v) - D <= o) {
const e = t.points[E];
ht.MulTXV(d, i.v, e.localPoint);
e.id.Copy(i.id);
if (y) {
const t = e.id.cf;
e.id.cf.indexA = t.indexB;
e.id.cf.indexB = t.indexA;
e.id.cf.typeA = t.typeB;
e.id.cf.typeB = t.typeA;
}
++E;
}
}
t.pointCount = E;
}
const ei = new st(), ii = new st(), si = new st(), ri = new st(), ni = new st(), oi = new st(), ai = new st(), li = new Et();
function hi(t, i, s, r, n) {
t.pointCount = 0;
const o = ht.MulTXV(s, ht.MulXV(n, r.m_p, st.s_t0), ei), a = i.m_vertex1, l = i.m_vertex2, h = st.SubVV(l, a, ii), c = st.DotVV(h, st.SubVV(l, o, st.s_t0)), m = st.DotVV(h, st.SubVV(o, a, st.s_t0)), u = i.m_radius + r.m_radius, _ = li;
_.cf.indexB = 0;
_.cf.typeB = e.b2ContactFeatureType.e_vertex;
if (m <= 0) {
const s = a, n = st.SubVV(o, s, si);
if (st.DotVV(n, n) > u * u) return;
if (i.m_hasVertex0) {
const t = i.m_vertex0, e = a, s = st.SubVV(e, t, ri);
if (st.DotVV(s, st.SubVV(e, o, st.s_t0)) > 0) return;
}
_.cf.indexA = 0;
_.cf.typeA = e.b2ContactFeatureType.e_vertex;
t.pointCount = 1;
t.type = e.b2ManifoldType.e_circles;
t.localNormal.SetZero();
t.localPoint.Copy(s);
t.points[0].id.Copy(_);
t.points[0].localPoint.Copy(r.m_p);
return;
}
if (c <= 0) {
const s = l, n = st.SubVV(o, s, si);
if (st.DotVV(n, n) > u * u) return;
if (i.m_hasVertex3) {
const t = i.m_vertex3, e = l, s = st.SubVV(t, e, ni);
if (st.DotVV(s, st.SubVV(o, e, st.s_t0)) > 0) return;
}
_.cf.indexA = 1;
_.cf.typeA = e.b2ContactFeatureType.e_vertex;
t.pointCount = 1;
t.type = e.b2ManifoldType.e_circles;
t.localNormal.SetZero();
t.localPoint.Copy(s);
t.points[0].id.Copy(_);
t.points[0].localPoint.Copy(r.m_p);
return;
}
const f = st.DotVV(h, h), d = oi;
d.x = 1 / f * (c * a.x + m * l.x);
d.y = 1 / f * (c * a.y + m * l.y);
const p = st.SubVV(o, d, si);
if (st.DotVV(p, p) > u * u) return;
const y = ai.Set(-h.y, h.x);
st.DotVV(y, st.SubVV(o, a, st.s_t0)) < 0 && y.Set(-y.x, -y.y);
y.Normalize();
_.cf.indexA = 0;
_.cf.typeA = e.b2ContactFeatureType.e_face;
t.pointCount = 1;
t.type = e.b2ManifoldType.e_faceA;
t.localNormal.Copy(y);
t.localPoint.Copy(a);
t.points[0].id.Copy(_);
t.points[0].localPoint.Copy(r.m_p);
}
class ci {
constructor() {
this.type = 0;
this.index = 0;
this.separation = 0;
}
}
class mi {
constructor() {
this.vertices = [];
this.normals = [];
this.count = 0;
}
}
class ui {
constructor() {
this.m_polygonB = new mi();
this.m_xf = new ht();
this.m_centroidB = new st();
this.m_v0 = new st();
this.m_v1 = new st();
this.m_v2 = new st();
this.m_v3 = new st();
this.m_normal0 = new st();
this.m_normal1 = new st();
this.m_normal2 = new st();
this.m_normal = new st();
this.m_type1 = 0;
this.m_type2 = 0;
this.m_lowerLimit = new st();
this.m_upperLimit = new st();
this.m_radius = 0;
this.m_front = !1;
}
Collide(t, i, s, r, n) {
ht.MulTXX(s, n, this.m_xf);
ht.MulXV(this.m_xf, r.m_centroid, this.m_centroidB);
this.m_v0.Copy(i.m_vertex0);
this.m_v1.Copy(i.m_vertex1);
this.m_v2.Copy(i.m_vertex2);
this.m_v3.Copy(i.m_vertex3);
const o = i.m_hasVertex0, l = i.m_hasVertex3, h = st.SubVV(this.m_v2, this.m_v1, ui.s_edge1);
h.Normalize();
this.m_normal1.Set(h.y, -h.x);
const c = st.DotVV(this.m_normal1, st.SubVV(this.m_centroidB, this.m_v1, st.s_t0));
let m = 0, u = 0, _ = !1, f = !1;
if (o) {
const t = st.SubVV(this.m_v1, this.m_v0, ui.s_edge0);
t.Normalize();
this.m_normal0.Set(t.y, -t.x);
_ = st.CrossVV(t, h) >= 0;
m = st.DotVV(this.m_normal0, st.SubVV(this.m_centroidB, this.m_v0, st.s_t0));
}
if (l) {
const t = st.SubVV(this.m_v3, this.m_v2, ui.s_edge2);
t.Normalize();
this.m_normal2.Set(t.y, -t.x);
f = st.CrossVV(h, t) > 0;
u = st.DotVV(this.m_normal2, st.SubVV(this.m_centroidB, this.m_v2, st.s_t0));
}
if (o && l) if (_ && f) {
this.m_front = m >= 0 || c >= 0 || u >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal0);
this.m_upperLimit.Copy(this.m_normal2);
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
}
} else if (_) {
this.m_front = m >= 0 || c >= 0 && u >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal0);
this.m_upperLimit.Copy(this.m_normal1);
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal2).SelfNeg();
this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
}
} else if (f) {
this.m_front = u >= 0 || m >= 0 && c >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal1);
this.m_upperLimit.Copy(this.m_normal2);
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
this.m_upperLimit.Copy(this.m_normal0).SelfNeg();
}
} else {
this.m_front = m >= 0 && c >= 0 && u >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal1);
this.m_upperLimit.Copy(this.m_normal1);
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal2).SelfNeg();
this.m_upperLimit.Copy(this.m_normal0).SelfNeg();
}
} else if (o) if (_) {
this.m_front = m >= 0 || c >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal0);
this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal1);
this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
}
} else {
this.m_front = m >= 0 && c >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal1);
this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal1);
this.m_upperLimit.Copy(this.m_normal0).SelfNeg();
}
} else if (l) if (f) {
this.m_front = c >= 0 || u >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
this.m_upperLimit.Copy(this.m_normal2);
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
this.m_upperLimit.Copy(this.m_normal1);
}
} else {
this.m_front = c >= 0 && u >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
this.m_upperLimit.Copy(this.m_normal1);
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal2).SelfNeg();
this.m_upperLimit.Copy(this.m_normal1);
}
} else {
this.m_front = c >= 0;
if (this.m_front) {
this.m_normal.Copy(this.m_normal1);
this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
} else {
this.m_normal.Copy(this.m_normal1).SelfNeg();
this.m_lowerLimit.Copy(this.m_normal1);
this.m_upperLimit.Copy(this.m_normal1);
}
}
this.m_polygonB.count = r.m_count;
for (let t = 0; t < r.m_count; ++t) {
this.m_polygonB.vertices.length <= t && this.m_polygonB.vertices.push(new st());
this.m_polygonB.normals.length <= t && this.m_polygonB.normals.push(new st());
ht.MulXV(this.m_xf, r.m_vertices[t], this.m_polygonB.vertices[t]);
lt.MulRV(this.m_xf.q, r.m_normals[t], this.m_polygonB.normals[t]);
}
this.m_radius = r.m_radius + i.m_radius;
t.pointCount = 0;
const d = this.ComputeEdgeSeparation(ui.s_edgeAxis);
if (0 === d.type) return;
if (d.separation > this.m_radius) return;
const p = this.ComputePolygonSeparation(ui.s_polygonAxis);
if (0 !== p.type && p.separation > this.m_radius) return;
let y;
y = 0 === p.type ? d : p.separation > .98 * d.separation + .001 ? p : d;
const b = ui.s_ie, v = ui.s_rf;
if (1 === y.type) {
t.type = e.b2ManifoldType.e_faceA;
let i = 0, s = st.DotVV(this.m_normal, this.m_polygonB.normals[0]);
for (let t = 1; t < this.m_polygonB.count; ++t) {
const e = st.DotVV(this.m_normal, this.m_polygonB.normals[t]);
if (e < s) {
s = e;
i = t;
}
}
const r = i, n = (r + 1) % this.m_polygonB.count, o = b[0];
o.v.Copy(this.m_polygonB.vertices[r]);
o.id.cf.indexA = 0;
o.id.cf.indexB = r;
o.id.cf.typeA = e.b2ContactFeatureType.e_face;
o.id.cf.typeB = e.b2ContactFeatureType.e_vertex;
const a = b[1];
a.v.Copy(this.m_polygonB.vertices[n]);
a.id.cf.indexA = 0;
a.id.cf.indexB = n;
a.id.cf.typeA = e.b2ContactFeatureType.e_face;
a.id.cf.typeB = e.b2ContactFeatureType.e_vertex;
if (this.m_front) {
v.i1 = 0;
v.i2 = 1;
v.v1.Copy(this.m_v1);
v.v2.Copy(this.m_v2);
v.normal.Copy(this.m_normal1);
} else {
v.i1 = 1;
v.i2 = 0;
v.v1.Copy(this.m_v2);
v.v2.Copy(this.m_v1);
v.normal.Copy(this.m_normal1).SelfNeg();
}
} else {
t.type = e.b2ManifoldType.e_faceB;
const i = b[0];
i.v.Copy(this.m_v1);
i.id.cf.indexA = 0;
i.id.cf.indexB = y.index;
i.id.cf.typeA = e.b2ContactFeatureType.e_vertex;
i.id.cf.typeB = e.b2ContactFeatureType.e_face;
const s = b[1];
s.v.Copy(this.m_v2);
s.id.cf.indexA = 0;
s.id.cf.indexB = y.index;
s.id.cf.typeA = e.b2ContactFeatureType.e_vertex;
s.id.cf.typeB = e.b2ContactFeatureType.e_face;
v.i1 = y.index;
v.i2 = (v.i1 + 1) % this.m_polygonB.count;
v.v1.Copy(this.m_polygonB.vertices[v.i1]);
v.v2.Copy(this.m_polygonB.vertices[v.i2]);
v.normal.Copy(this.m_polygonB.normals[v.i1]);
}
v.sideNormal1.Set(v.normal.y, -v.normal.x);
v.sideNormal2.Copy(v.sideNormal1).SelfNeg();
v.sideOffset1 = st.DotVV(v.sideNormal1, v.v1);
v.sideOffset2 = st.DotVV(v.sideNormal2, v.v2);
const g = ui.s_clipPoints1, S = ui.s_clipPoints2;
let x = 0;
if ((x = Wt(g, b, v.sideNormal1, v.sideOffset1, v.i1)) < a) return;
if ((x = Wt(S, g, v.sideNormal2, v.sideOffset2, v.i2)) < a) return;
if (1 === y.type) {
t.localNormal.Copy(v.normal);
t.localPoint.Copy(v.v1);
} else {
t.localNormal.Copy(r.m_normals[v.i1]);
t.localPoint.Copy(r.m_vertices[v.i1]);
}
let A = 0;
for (let e = 0; e < a; ++e) {
let i;
if ((i = st.DotVV(v.normal, st.SubVV(S[e].v, v.v1, st.s_t0))) <= this.m_radius) {
const i = t.points[A];
if (1 === y.type) {
ht.MulTXV(this.m_xf, S[e].v, i.localPoint);
i.id = S[e].id;
} else {
i.localPoint.Copy(S[e].v);
i.id.cf.typeA = S[e].id.cf.typeB;
i.id.cf.typeB = S[e].id.cf.typeA;
i.id.cf.indexA = S[e].id.cf.indexB;
i.id.cf.indexB = S[e].id.cf.indexA;
}
++A;
}
}
t.pointCount = A;
}
ComputeEdgeSeparation(t) {
const e = t;
e.type = 1;
e.index = this.m_front ? 0 : 1;
e.separation = s;
for (let t = 0; t < this.m_polygonB.count; ++t) {
const i = st.DotVV(this.m_normal, st.SubVV(this.m_polygonB.vertices[t], this.m_v1, st.s_t0));
i < e.separation && (e.separation = i);
}
return e;
}
ComputePolygonSeparation(t) {
const e = t;
e.type = 0;
e.index = -1;
e.separation = -s;
const i = ui.s_perp.Set(-this.m_normal.y, this.m_normal.x);
for (let t = 0; t < this.m_polygonB.count; ++t) {
const s = st.NegV(this.m_polygonB.normals[t], ui.s_n), r = st.DotVV(s, st.SubVV(this.m_polygonB.vertices[t], this.m_v1, st.s_t0)), n = st.DotVV(s, st.SubVV(this.m_polygonB.vertices[t], this.m_v2, st.s_t0)), o = J(r, n);
if (o > this.m_radius) {
e.type = 2;
e.index = t;
e.separation = o;
return e;
}
if (st.DotVV(s, i) >= 0) {
if (st.DotVV(st.SubVV(s, this.m_upperLimit, st.s_t0), this.m_normal) < -u) continue;
} else if (st.DotVV(st.SubVV(s, this.m_lowerLimit, st.s_t0), this.m_normal) < -u) continue;
if (o > e.separation) {
e.type = 2;
e.index = t;
e.separation = o;
}
}
return e;
}
}
ui.s_edge1 = new st();
ui.s_edge0 = new st();
ui.s_edge2 = new st();
ui.s_ie = Nt.MakeArray(2);
ui.s_rf = new class {
constructor() {
this.i1 = 0;
this.i2 = 0;
this.v1 = new st();
this.v2 = new st();
this.normal = new st();
this.sideNormal1 = new st();
this.sideOffset1 = 0;
this.sideNormal2 = new st();
this.sideOffset2 = 0;
}
}();
ui.s_clipPoints1 = Nt.MakeArray(2);
ui.s_clipPoints2 = Nt.MakeArray(2);
ui.s_edgeAxis = new ci();
ui.s_polygonAxis = new ci();
ui.s_n = new st();
ui.s_perp = new st();
const _i = new ui();
function fi(t, e, i, s, r) {
_i.Collide(t, e, i, s, r);
}
class di {
constructor() {
this.mass = 0;
this.center = new st(0, 0);
this.I = 0;
}
}
(function(t) {
t[t.e_unknown = -1] = "e_unknown";
t[t.e_circleShape = 0] = "e_circleShape";
t[t.e_edgeShape = 1] = "e_edgeShape";
t[t.e_polygonShape = 2] = "e_polygonShape";
t[t.e_chainShape = 3] = "e_chainShape";
t[t.e_shapeTypeCount = 4] = "e_shapeTypeCount";
})(e.b2ShapeType || (e.b2ShapeType = {}));
class pi {
constructor(t, i) {
this.m_type = e.b2ShapeType.e_unknown;
this.m_radius = 0;
this.m_type = t;
this.m_radius = i;
}
Copy(t) {
this.m_radius = t.m_radius;
return this;
}
GetType() {
return this.m_type;
}
}
class yi extends pi {
constructor(t = 0) {
super(e.b2ShapeType.e_circleShape, t);
this.m_p = new st();
}
Set(t, e = this.m_radius) {
this.m_p.Copy(t);
this.m_radius = e;
return this;
}
Clone() {
return new yi().Copy(this);
}
Copy(t) {
super.Copy(t);
this.m_p.Copy(t.m_p);
return this;
}
GetChildCount() {
return 1;
}
TestPoint(t, e) {
const i = ht.MulXV(t, this.m_p, yi.TestPoint_s_center), s = st.SubVV(e, i, yi.TestPoint_s_d);
return st.DotVV(s, s) <= K(this.m_radius);
}
ComputeDistance(t, e, i, s) {
const r = ht.MulXV(t, this.m_p, yi.ComputeDistance_s_center);
st.SubVV(e, r, i);
return i.Normalize() - this.m_radius;
}
RayCast(t, e, i, s) {
const n = ht.MulXV(i, this.m_p, yi.RayCast_s_position), o = st.SubVV(e.p1, n, yi.RayCast_s_s), a = st.DotVV(o, o) - K(this.m_radius), l = st.SubVV(e.p2, e.p1, yi.RayCast_s_r), h = st.DotVV(o, l), c = st.DotVV(l, l), m = h * h - c * a;
if (m < 0 || c < r) return !1;
let u = -(h + Z(m));
if (0 <= u && u <= e.maxFraction * c) {
u /= c;
t.fraction = u;
st.AddVMulSV(o, u, l, t.normal).SelfNormalize();
return !0;
}
return !1;
}
ComputeAABB(t, e, i) {
const s = ht.MulXV(e, this.m_p, yi.ComputeAABB_s_p);
t.lowerBound.Set(s.x - this.m_radius, s.y - this.m_radius);
t.upperBound.Set(s.x + this.m_radius, s.y + this.m_radius);
}
ComputeMass(t, e) {
const i = K(this.m_radius);
t.mass = e * o * i;
t.center.Copy(this.m_p);
t.I = t.mass * (.5 * i + st.DotVV(this.m_p, this.m_p));
}
SetupDistanceProxy(t, e) {
t.m_vertices = t.m_buffer;
t.m_vertices[0].Copy(this.m_p);
t.m_count = 1;
t.m_radius = this.m_radius;
}
ComputeSubmergedArea(t, e, i, s) {
const n = ht.MulXV(i, this.m_p, new st()), a = -(st.DotVV(t, n) - e);
if (a < -this.m_radius + r) return 0;
if (a > this.m_radius) {
s.Copy(n);
return o * this.m_radius * this.m_radius;
}
const l = this.m_radius * this.m_radius, h = a * a, c = l * (et(a / this.m_radius) + o / 2) + a * Z(l - h), m = -2 / 3 * $(l - h, 1.5) / c;
s.x = n.x + t.x * m;
s.y = n.y + t.y * m;
return c;
}
Dump(t) {
t("    const shape: b2CircleShape = new b2CircleShape();\n");
t("    shape.m_radius = %.15f;\n", this.m_radius);
t("    shape.m_p.Set(%.15f, %.15f);\n", this.m_p.x, this.m_p.y);
}
}
yi.TestPoint_s_center = new st();
yi.TestPoint_s_d = new st();
yi.ComputeDistance_s_center = new st();
yi.RayCast_s_position = new st();
yi.RayCast_s_s = new st();
yi.RayCast_s_r = new st();
yi.ComputeAABB_s_p = new st();
class bi extends pi {
constructor() {
super(e.b2ShapeType.e_polygonShape, _);
this.m_centroid = new st(0, 0);
this.m_vertices = [];
this.m_normals = [];
this.m_count = 0;
}
Clone() {
return new bi().Copy(this);
}
Copy(t) {
super.Copy(t);
this.m_centroid.Copy(t.m_centroid);
this.m_count = t.m_count;
this.m_vertices = st.MakeArray(this.m_count);
this.m_normals = st.MakeArray(this.m_count);
for (let e = 0; e < this.m_count; ++e) {
this.m_vertices[e].Copy(t.m_vertices[e]);
this.m_normals[e].Copy(t.m_normals[e]);
}
return this;
}
GetChildCount() {
return 1;
}
Set(t, e = t.length, i = 0) {
if (e < 3) return this.SetAsBox(1, 1);
let s = e;
const r = [];
for (let e = 0; e < s; ++e) {
const s = t[i + e];
let n = !0;
for (let t = 0; t < r.length; ++t) if (st.DistanceSquaredVV(s, r[t]) < .25 * m * m) {
n = !1;
break;
}
n && r.push(s);
}
if ((s = r.length) < 3) return this.SetAsBox(1, 1);
let n = 0, o = r[0].x;
for (let t = 1; t < s; ++t) {
const e = r[t].x;
if (e > o || e === o && r[t].y < r[n].y) {
n = t;
o = e;
}
}
const a = [];
let l = 0, h = n;
for (;;) {
a[l] = h;
let t = 0;
for (let e = 1; e < s; ++e) {
if (t === h) {
t = e;
continue;
}
const i = st.SubVV(r[t], r[a[l]], bi.Set_s_r), s = st.SubVV(r[e], r[a[l]], bi.Set_s_v), n = st.CrossVV(i, s);
n < 0 && (t = e);
0 === n && s.LengthSquared() > i.LengthSquared() && (t = e);
}
++l;
h = t;
if (t === n) break;
}
this.m_count = l;
this.m_vertices = st.MakeArray(this.m_count);
this.m_normals = st.MakeArray(this.m_count);
for (let t = 0; t < l; ++t) this.m_vertices[t].Copy(r[a[t]]);
for (let t = 0; t < l; ++t) {
const e = this.m_vertices[t], i = this.m_vertices[(t + 1) % l], s = st.SubVV(i, e, st.s_t0);
st.CrossVOne(s, this.m_normals[t]).SelfNormalize();
}
bi.ComputeCentroid(this.m_vertices, l, this.m_centroid);
return this;
}
SetAsArray(t, e = t.length) {
return this.Set(t, e);
}
SetAsBox(t, e, i, s = 0) {
this.m_count = 4;
this.m_vertices = st.MakeArray(this.m_count);
this.m_normals = st.MakeArray(this.m_count);
this.m_vertices[0].Set(-t, -e);
this.m_vertices[1].Set(t, -e);
this.m_vertices[2].Set(t, e);
this.m_vertices[3].Set(-t, e);
this.m_normals[0].Set(0, -1);
this.m_normals[1].Set(1, 0);
this.m_normals[2].Set(0, 1);
this.m_normals[3].Set(-1, 0);
this.m_centroid.SetZero();
if (i) {
this.m_centroid.Copy(i);
const t = new ht();
t.SetPosition(i);
t.SetRotationAngle(s);
for (let e = 0; e < this.m_count; ++e) {
ht.MulXV(t, this.m_vertices[e], this.m_vertices[e]);
lt.MulRV(t.q, this.m_normals[e], this.m_normals[e]);
}
}
return this;
}
TestPoint(t, e) {
const i = ht.MulTXV(t, e, bi.TestPoint_s_pLocal);
for (let t = 0; t < this.m_count; ++t) if (st.DotVV(this.m_normals[t], st.SubVV(i, this.m_vertices[t], st.s_t0)) > 0) return !1;
return !0;
}
ComputeDistance(t, e, i, r) {
const n = ht.MulTXV(t, e, bi.ComputeDistance_s_pLocal);
let o = -s;
const a = bi.ComputeDistance_s_normalForMaxDistance.Copy(n);
for (let t = 0; t < this.m_count; ++t) {
const e = st.DotVV(this.m_normals[t], st.SubVV(n, this.m_vertices[t], st.s_t0));
if (e > o) {
o = e;
a.Copy(this.m_normals[t]);
}
}
if (o > 0) {
const e = bi.ComputeDistance_s_minDistance.Copy(a);
let s = o * o;
for (let t = 0; t < this.m_count; ++t) {
const i = st.SubVV(n, this.m_vertices[t], bi.ComputeDistance_s_distance), r = i.LengthSquared();
if (s > r) {
e.Copy(i);
s = r;
}
}
lt.MulRV(t.q, e, i);
i.Normalize();
return Math.sqrt(s);
}
lt.MulRV(t.q, a, i);
return o;
}
RayCast(t, e, i, s) {
const r = ht.MulTXV(i, e.p1, bi.RayCast_s_p1), n = ht.MulTXV(i, e.p2, bi.RayCast_s_p2), o = st.SubVV(n, r, bi.RayCast_s_d);
let a = 0, l = e.maxFraction, h = -1;
for (let t = 0; t < this.m_count; ++t) {
const e = st.DotVV(this.m_normals[t], st.SubVV(this.m_vertices[t], r, st.s_t0)), i = st.DotVV(this.m_normals[t], o);
if (0 === i) {
if (e < 0) return !1;
} else if (i < 0 && e < a * i) {
a = e / i;
h = t;
} else i > 0 && e < l * i && (l = e / i);
if (l < a) return !1;
}
if (h >= 0) {
t.fraction = a;
lt.MulRV(i.q, this.m_normals[h], t.normal);
return !0;
}
return !1;
}
ComputeAABB(t, e, i) {
const s = ht.MulXV(e, this.m_vertices[0], t.lowerBound), r = t.upperBound.Copy(s);
for (let t = 0; t < this.m_count; ++t) {
const i = ht.MulXV(e, this.m_vertices[t], bi.ComputeAABB_s_v);
st.MinV(i, s, s);
st.MaxV(i, r, r);
}
const n = this.m_radius;
s.SelfSubXY(n, n);
r.SelfAddXY(n, n);
}
ComputeMass(t, e) {
const i = bi.ComputeMass_s_center.SetZero();
let s = 0, r = 0;
const n = bi.ComputeMass_s_s.SetZero();
for (let t = 0; t < this.m_count; ++t) n.SelfAdd(this.m_vertices[t]);
n.SelfMul(1 / this.m_count);
for (let t = 0; t < this.m_count; ++t) {
const e = st.SubVV(this.m_vertices[t], n, bi.ComputeMass_s_e1), o = st.SubVV(this.m_vertices[(t + 1) % this.m_count], n, bi.ComputeMass_s_e2), a = st.CrossVV(e, o), l = .5 * a;
s += l;
i.SelfAdd(st.MulSV(l * (1 / 3), st.AddVV(e, o, st.s_t0), st.s_t1));
const h = e.x, c = e.y, m = o.x, u = o.y;
r += 1 / 3 * .25 * a * (h * h + m * h + m * m + c * c + u * c + u * u);
}
t.mass = e * s;
i.SelfMul(1 / s);
st.AddVV(i, n, t.center);
t.I = e * r;
t.I += t.mass * (st.DotVV(t.center, t.center) - st.DotVV(i, i));
}
Validate() {
for (let t = 0; t < this.m_count; ++t) {
const e = t, i = (t + 1) % this.m_count, s = this.m_vertices[e], r = st.SubVV(this.m_vertices[i], s, bi.Validate_s_e);
for (let t = 0; t < this.m_count; ++t) {
if (t === e || t === i) continue;
const n = st.SubVV(this.m_vertices[t], s, bi.Validate_s_v);
if (st.CrossVV(r, n) < 0) return !1;
}
}
return !0;
}
SetupDistanceProxy(t, e) {
t.m_vertices = this.m_vertices;
t.m_count = this.m_count;
t.m_radius = this.m_radius;
}
ComputeSubmergedArea(t, e, i, s) {
const n = lt.MulTRV(i.q, t, bi.ComputeSubmergedArea_s_normalL), o = e - st.DotVV(t, i.p), a = [];
let l = 0, h = -1, c = -1, m = !1;
for (let t = 0; t < this.m_count; ++t) {
a[t] = st.DotVV(n, this.m_vertices[t]) - o;
const e = a[t] < -r;
if (t > 0) if (e) {
if (!m) {
h = t - 1;
l++;
}
} else if (m) {
c = t - 1;
l++;
}
m = e;
}
switch (l) {
case 0:
if (m) {
const t = bi.ComputeSubmergedArea_s_md;
this.ComputeMass(t, 1);
ht.MulXV(i, t.center, s);
return t.mass;
}
return 0;

case 1:
-1 === h ? h = this.m_count - 1 : c = this.m_count - 1;
}
const u = (h + 1) % this.m_count, _ = (c + 1) % this.m_count, f = (0 - a[h]) / (a[u] - a[h]), d = (0 - a[c]) / (a[_] - a[c]), p = bi.ComputeSubmergedArea_s_intoVec.Set(this.m_vertices[h].x * (1 - f) + this.m_vertices[u].x * f, this.m_vertices[h].y * (1 - f) + this.m_vertices[u].y * f), y = bi.ComputeSubmergedArea_s_outoVec.Set(this.m_vertices[c].x * (1 - d) + this.m_vertices[_].x * d, this.m_vertices[c].y * (1 - d) + this.m_vertices[_].y * d);
let b = 0;
const v = bi.ComputeSubmergedArea_s_center.SetZero();
let g, S = this.m_vertices[u], x = u;
for (;x !== _; ) {
g = (x = (x + 1) % this.m_count) === _ ? y : this.m_vertices[x];
const t = .5 * ((S.x - p.x) * (g.y - p.y) - (S.y - p.y) * (g.x - p.x));
b += t;
v.x += t * (p.x + S.x + g.x) / 3;
v.y += t * (p.y + S.y + g.y) / 3;
S = g;
}
v.SelfMul(1 / b);
ht.MulXV(i, v, s);
return b;
}
Dump(t) {
t("    const shape: b2PolygonShape = new b2PolygonShape();\n");
t("    const vs: b2Vec2[] = [];\n");
for (let e = 0; e < this.m_count; ++e) t("    vs[%d] = new b2Vec2(%.15f, %.15f);\n", e, this.m_vertices[e].x, this.m_vertices[e].y);
t("    shape.Set(vs, %d);\n", this.m_count);
}
static ComputeCentroid(t, e, i) {
const s = i;
s.SetZero();
let r = 0;
const n = bi.ComputeCentroid_s_pRef.SetZero();
for (let i = 0; i < e; ++i) {
const o = n, a = t[i], l = t[(i + 1) % e], h = st.SubVV(a, o, bi.ComputeCentroid_s_e1), c = st.SubVV(l, o, bi.ComputeCentroid_s_e2), m = .5 * st.CrossVV(h, c);
r += m;
s.x += m * (1 / 3) * (o.x + a.x + l.x);
s.y += m * (1 / 3) * (o.y + a.y + l.y);
}
s.SelfMul(1 / r);
return s;
}
}
bi.Set_s_r = new st();
bi.Set_s_v = new st();
bi.TestPoint_s_pLocal = new st();
bi.ComputeDistance_s_pLocal = new st();
bi.ComputeDistance_s_normalForMaxDistance = new st();
bi.ComputeDistance_s_minDistance = new st();
bi.ComputeDistance_s_distance = new st();
bi.RayCast_s_p1 = new st();
bi.RayCast_s_p2 = new st();
bi.RayCast_s_d = new st();
bi.ComputeAABB_s_v = new st();
bi.ComputeMass_s_center = new st();
bi.ComputeMass_s_s = new st();
bi.ComputeMass_s_e1 = new st();
bi.ComputeMass_s_e2 = new st();
bi.Validate_s_e = new st();
bi.Validate_s_v = new st();
bi.ComputeSubmergedArea_s_normalL = new st();
bi.ComputeSubmergedArea_s_md = new di();
bi.ComputeSubmergedArea_s_intoVec = new st();
bi.ComputeSubmergedArea_s_outoVec = new st();
bi.ComputeSubmergedArea_s_center = new st();
bi.ComputeCentroid_s_pRef = new st();
bi.ComputeCentroid_s_e1 = new st();
bi.ComputeCentroid_s_e2 = new st();
class vi extends pi {
constructor() {
super(e.b2ShapeType.e_edgeShape, _);
this.m_vertex1 = new st();
this.m_vertex2 = new st();
this.m_vertex0 = new st();
this.m_vertex3 = new st();
this.m_hasVertex0 = !1;
this.m_hasVertex3 = !1;
}
Set(t, e) {
this.m_vertex1.Copy(t);
this.m_vertex2.Copy(e);
this.m_hasVertex0 = !1;
this.m_hasVertex3 = !1;
return this;
}
Clone() {
return new vi().Copy(this);
}
Copy(t) {
super.Copy(t);
this.m_vertex1.Copy(t.m_vertex1);
this.m_vertex2.Copy(t.m_vertex2);
this.m_vertex0.Copy(t.m_vertex0);
this.m_vertex3.Copy(t.m_vertex3);
this.m_hasVertex0 = t.m_hasVertex0;
this.m_hasVertex3 = t.m_hasVertex3;
return this;
}
GetChildCount() {
return 1;
}
TestPoint(t, e) {
return !1;
}
ComputeDistance(t, e, i, s) {
const r = ht.MulXV(t, this.m_vertex1, vi.ComputeDistance_s_v1), n = ht.MulXV(t, this.m_vertex2, vi.ComputeDistance_s_v2), o = st.SubVV(e, r, vi.ComputeDistance_s_d), a = st.SubVV(n, r, vi.ComputeDistance_s_s), l = st.DotVV(o, a);
if (l > 0) {
const t = st.DotVV(a, a);
l > t ? st.SubVV(e, n, o) : o.SelfMulSub(l / t, a);
}
i.Copy(o);
return i.Normalize();
}
RayCast(t, e, i, s) {
const r = ht.MulTXV(i, e.p1, vi.RayCast_s_p1), n = ht.MulTXV(i, e.p2, vi.RayCast_s_p2), o = st.SubVV(n, r, vi.RayCast_s_d), a = this.m_vertex1, l = this.m_vertex2, h = st.SubVV(l, a, vi.RayCast_s_e), c = t.normal.Set(h.y, -h.x).SelfNormalize(), m = st.DotVV(c, st.SubVV(a, r, st.s_t0)), u = st.DotVV(c, o);
if (0 === u) return !1;
const _ = m / u;
if (_ < 0 || e.maxFraction < _) return !1;
const f = st.AddVMulSV(r, _, o, vi.RayCast_s_q), d = st.SubVV(l, a, vi.RayCast_s_r), p = st.DotVV(d, d);
if (0 === p) return !1;
const y = st.DotVV(st.SubVV(f, a, st.s_t0), d) / p;
if (y < 0 || 1 < y) return !1;
t.fraction = _;
lt.MulRV(i.q, t.normal, t.normal);
m > 0 && t.normal.SelfNeg();
return !0;
}
ComputeAABB(t, e, i) {
const s = ht.MulXV(e, this.m_vertex1, vi.ComputeAABB_s_v1), r = ht.MulXV(e, this.m_vertex2, vi.ComputeAABB_s_v2);
st.MinV(s, r, t.lowerBound);
st.MaxV(s, r, t.upperBound);
const n = this.m_radius;
t.lowerBound.SelfSubXY(n, n);
t.upperBound.SelfAddXY(n, n);
}
ComputeMass(t, e) {
t.mass = 0;
st.MidVV(this.m_vertex1, this.m_vertex2, t.center);
t.I = 0;
}
SetupDistanceProxy(t, e) {
t.m_vertices = t.m_buffer;
t.m_vertices[0].Copy(this.m_vertex1);
t.m_vertices[1].Copy(this.m_vertex2);
t.m_count = 2;
t.m_radius = this.m_radius;
}
ComputeSubmergedArea(t, e, i, s) {
s.SetZero();
return 0;
}
Dump(t) {
t("    const shape: b2EdgeShape = new b2EdgeShape();\n");
t("    shape.m_radius = %.15f;\n", this.m_radius);
t("    shape.m_vertex0.Set(%.15f, %.15f);\n", this.m_vertex0.x, this.m_vertex0.y);
t("    shape.m_vertex1.Set(%.15f, %.15f);\n", this.m_vertex1.x, this.m_vertex1.y);
t("    shape.m_vertex2.Set(%.15f, %.15f);\n", this.m_vertex2.x, this.m_vertex2.y);
t("    shape.m_vertex3.Set(%.15f, %.15f);\n", this.m_vertex3.x, this.m_vertex3.y);
t("    shape.m_hasVertex0 = %s;\n", this.m_hasVertex0);
t("    shape.m_hasVertex3 = %s;\n", this.m_hasVertex3);
}
}
vi.ComputeDistance_s_v1 = new st();
vi.ComputeDistance_s_v2 = new st();
vi.ComputeDistance_s_d = new st();
vi.ComputeDistance_s_s = new st();
vi.RayCast_s_p1 = new st();
vi.RayCast_s_p2 = new st();
vi.RayCast_s_d = new st();
vi.RayCast_s_e = new st();
vi.RayCast_s_q = new st();
vi.RayCast_s_r = new st();
vi.ComputeAABB_s_v1 = new st();
vi.ComputeAABB_s_v2 = new st();
class gi extends pi {
constructor() {
super(e.b2ShapeType.e_chainShape, _);
this.m_vertices = [];
this.m_count = 0;
this.m_prevVertex = new st();
this.m_nextVertex = new st();
this.m_hasPrevVertex = !1;
this.m_hasNextVertex = !1;
}
CreateLoop(t, e = t.length, i = 0) {
if (e < 3) return this;
this.m_count = e + 1;
this.m_vertices = st.MakeArray(this.m_count);
for (let s = 0; s < e; ++s) this.m_vertices[s].Copy(t[i + s]);
this.m_vertices[e].Copy(this.m_vertices[0]);
this.m_prevVertex.Copy(this.m_vertices[this.m_count - 2]);
this.m_nextVertex.Copy(this.m_vertices[1]);
this.m_hasPrevVertex = !0;
this.m_hasNextVertex = !0;
return this;
}
CreateChain(t, e = t.length, i = 0) {
this.m_count = e;
this.m_vertices = st.MakeArray(e);
for (let s = 0; s < e; ++s) this.m_vertices[s].Copy(t[i + s]);
this.m_hasPrevVertex = !1;
this.m_hasNextVertex = !1;
this.m_prevVertex.SetZero();
this.m_nextVertex.SetZero();
return this;
}
SetPrevVertex(t) {
this.m_prevVertex.Copy(t);
this.m_hasPrevVertex = !0;
return this;
}
SetNextVertex(t) {
this.m_nextVertex.Copy(t);
this.m_hasNextVertex = !0;
return this;
}
Clone() {
return new gi().Copy(this);
}
Copy(t) {
super.Copy(t);
this.CreateChain(t.m_vertices, t.m_count);
this.m_prevVertex.Copy(t.m_prevVertex);
this.m_nextVertex.Copy(t.m_nextVertex);
this.m_hasPrevVertex = t.m_hasPrevVertex;
this.m_hasNextVertex = t.m_hasNextVertex;
return this;
}
GetChildCount() {
return this.m_count - 1;
}
GetChildEdge(t, i) {
t.m_type = e.b2ShapeType.e_edgeShape;
t.m_radius = this.m_radius;
t.m_vertex1.Copy(this.m_vertices[i]);
t.m_vertex2.Copy(this.m_vertices[i + 1]);
if (i > 0) {
t.m_vertex0.Copy(this.m_vertices[i - 1]);
t.m_hasVertex0 = !0;
} else {
t.m_vertex0.Copy(this.m_prevVertex);
t.m_hasVertex0 = this.m_hasPrevVertex;
}
if (i < this.m_count - 2) {
t.m_vertex3.Copy(this.m_vertices[i + 2]);
t.m_hasVertex3 = !0;
} else {
t.m_vertex3.Copy(this.m_nextVertex);
t.m_hasVertex3 = this.m_hasNextVertex;
}
}
TestPoint(t, e) {
return !1;
}
ComputeDistance(t, e, i, s) {
const r = gi.ComputeDistance_s_edgeShape;
this.GetChildEdge(r, s);
return r.ComputeDistance(t, e, i, 0);
}
RayCast(t, e, i, s) {
const r = gi.RayCast_s_edgeShape;
r.m_vertex1.Copy(this.m_vertices[s]);
r.m_vertex2.Copy(this.m_vertices[(s + 1) % this.m_count]);
return r.RayCast(t, e, i, 0);
}
ComputeAABB(t, e, i) {
const s = this.m_vertices[i], r = this.m_vertices[(i + 1) % this.m_count], n = ht.MulXV(e, s, gi.ComputeAABB_s_v1), o = ht.MulXV(e, r, gi.ComputeAABB_s_v2);
st.MinV(n, o, t.lowerBound);
st.MaxV(n, o, t.upperBound);
}
ComputeMass(t, e) {
t.mass = 0;
t.center.SetZero();
t.I = 0;
}
SetupDistanceProxy(t, e) {
t.m_vertices = t.m_buffer;
t.m_vertices[0].Copy(this.m_vertices[e]);
e + 1 < this.m_count ? t.m_vertices[1].Copy(this.m_vertices[e + 1]) : t.m_vertices[1].Copy(this.m_vertices[0]);
t.m_count = 2;
t.m_radius = this.m_radius;
}
ComputeSubmergedArea(t, e, i, s) {
s.SetZero();
return 0;
}
Dump(t) {
t("    const shape: b2ChainShape = new b2ChainShape();\n");
t("    const vs: b2Vec2[] = [];\n");
for (let e = 0; e < this.m_count; ++e) t("    vs[%d] = new bVec2(%.15f, %.15f);\n", e, this.m_vertices[e].x, this.m_vertices[e].y);
t("    shape.CreateChain(vs, %d);\n", this.m_count);
t("    shape.m_prevVertex.Set(%.15f, %.15f);\n", this.m_prevVertex.x, this.m_prevVertex.y);
t("    shape.m_nextVertex.Set(%.15f, %.15f);\n", this.m_nextVertex.x, this.m_nextVertex.y);
t("    shape.m_hasPrevVertex = %s;\n", this.m_hasPrevVertex ? "true" : "false");
t("    shape.m_hasNextVertex = %s;\n", this.m_hasNextVertex ? "true" : "false");
}
}
gi.ComputeDistance_s_edgeShape = new vi();
gi.RayCast_s_edgeShape = new vi();
gi.ComputeAABB_s_v1 = new st();
gi.ComputeAABB_s_v2 = new st();
class Si {
constructor() {
this.categoryBits = 1;
this.maskBits = 65535;
this.groupIndex = 0;
}
Clone() {
return new Si().Copy(this);
}
Copy(t) {
this.categoryBits = t.categoryBits;
this.maskBits = t.maskBits;
this.groupIndex = t.groupIndex || 0;
return this;
}
}
Si.DEFAULT = new Si();
class xi {
constructor() {
this.userData = null;
this.friction = .2;
this.restitution = 0;
this.density = 0;
this.isSensor = !1;
this.filter = new Si();
}
}
class Ai {
constructor(t) {
this.aabb = new Ut();
this.childIndex = 0;
this.fixture = t;
}
}
class Bi {
constructor(t, e) {
this.m_density = 0;
this.m_next = null;
this.m_friction = 0;
this.m_restitution = 0;
this.m_proxies = [];
this.m_proxyCount = 0;
this.m_filter = new Si();
this.m_isSensor = !1;
this.m_userData = null;
this.m_body = e;
this.m_shape = t.shape.Clone();
}
GetType() {
return this.m_shape.GetType();
}
GetShape() {
return this.m_shape;
}
SetSensor(t) {
if (t !== this.m_isSensor) {
this.m_body.SetAwake(!0);
this.m_isSensor = t;
}
}
IsSensor() {
return this.m_isSensor;
}
SetFilterData(t) {
this.m_filter.Copy(t);
this.Refilter();
}
GetFilterData() {
return this.m_filter;
}
Refilter() {
let t = this.m_body.GetContactList();
for (;t; ) {
const e = t.contact, i = e.GetFixtureA(), s = e.GetFixtureB();
i !== this && s !== this || e.FlagForFiltering();
t = t.next;
}
const e = this.m_body.GetWorld();
if (null === e) return;
const i = e.m_contactManager.m_broadPhase;
for (let t = 0; t < this.m_proxyCount; ++t) i.TouchProxy(this.m_proxies[t].treeNode);
}
GetBody() {
return this.m_body;
}
GetNext() {
return this.m_next;
}
GetUserData() {
return this.m_userData;
}
SetUserData(t) {
this.m_userData = t;
}
TestPoint(t) {
return this.m_shape.TestPoint(this.m_body.GetTransform(), t);
}
ComputeDistance(t, e, i) {
return this.m_shape.ComputeDistance(this.m_body.GetTransform(), t, e, i);
}
RayCast(t, e, i) {
return this.m_shape.RayCast(t, e, this.m_body.GetTransform(), i);
}
GetMassData(t = new di()) {
this.m_shape.ComputeMass(t, this.m_density);
return t;
}
SetDensity(t) {
this.m_density = t;
}
GetDensity() {
return this.m_density;
}
GetFriction() {
return this.m_friction;
}
SetFriction(t) {
this.m_friction = t;
}
GetRestitution() {
return this.m_restitution;
}
SetRestitution(t) {
this.m_restitution = t;
}
GetAABB(t) {
return this.m_proxies[t].aabb;
}
Dump(t, e) {
t("    const fd: b2FixtureDef = new b2FixtureDef();\n");
t("    fd.friction = %.15f;\n", this.m_friction);
t("    fd.restitution = %.15f;\n", this.m_restitution);
t("    fd.density = %.15f;\n", this.m_density);
t("    fd.isSensor = %s;\n", this.m_isSensor ? "true" : "false");
t("    fd.filter.categoryBits = %d;\n", this.m_filter.categoryBits);
t("    fd.filter.maskBits = %d;\n", this.m_filter.maskBits);
t("    fd.filter.groupIndex = %d;\n", this.m_filter.groupIndex);
this.m_shape.Dump(t);
t("\n");
t("    fd.shape = shape;\n");
t("\n");
t("    bodies[%d].CreateFixture(fd);\n", e);
}
Create(t) {
this.m_userData = t.userData;
this.m_friction = i(t.friction, .2);
this.m_restitution = i(t.restitution, 0);
this.m_next = null;
this.m_filter.Copy(i(t.filter, Si.DEFAULT));
this.m_isSensor = i(t.isSensor, !1);
this.m_proxies = E(this.m_shape.GetChildCount(), () => new Ai(this));
this.m_proxyCount = 0;
this.m_density = i(t.density, 0);
}
Destroy() {}
CreateProxies(t) {
const e = this.m_body.m_world.m_contactManager.m_broadPhase;
this.m_proxyCount = this.m_shape.GetChildCount();
for (let i = 0; i < this.m_proxyCount; ++i) {
const s = this.m_proxies[i] = new Ai(this);
this.m_shape.ComputeAABB(s.aabb, t, i);
s.treeNode = e.CreateProxy(s.aabb, s);
s.childIndex = i;
}
}
DestroyProxies() {
const t = this.m_body.m_world.m_contactManager.m_broadPhase;
for (let e = 0; e < this.m_proxyCount; ++e) {
const i = this.m_proxies[e];
delete i.treeNode.userData;
t.DestroyProxy(i.treeNode);
delete i.treeNode;
}
this.m_proxyCount = 0;
}
TouchProxies() {
const t = this.m_body.m_world.m_contactManager.m_broadPhase, e = this.m_proxyCount;
for (let i = 0; i < e; ++i) t.TouchProxy(this.m_proxies[i].treeNode);
}
Synchronize(t, e) {
if (0 === this.m_proxyCount) return;
const i = this.m_body.m_world.m_contactManager.m_broadPhase;
for (let s = 0; s < this.m_proxyCount; ++s) {
const r = this.m_proxies[s], n = Bi.Synchronize_s_aabb1, o = Bi.Synchronize_s_aabb2;
this.m_shape.ComputeAABB(n, t, s);
this.m_shape.ComputeAABB(o, e, s);
r.aabb.Combine2(n, o);
const a = st.SubVV(e.p, t.p, Bi.Synchronize_s_displacement);
i.MoveProxy(r.treeNode, r.aabb, a);
}
}
}
Bi.Synchronize_s_aabb1 = new Ut();
Bi.Synchronize_s_aabb2 = new Ut();
Bi.Synchronize_s_displacement = new st();
(function(t) {
t[t.b2_unknown = -1] = "b2_unknown";
t[t.b2_staticBody = 0] = "b2_staticBody";
t[t.b2_kinematicBody = 1] = "b2_kinematicBody";
t[t.b2_dynamicBody = 2] = "b2_dynamicBody";
})(e.b2BodyType || (e.b2BodyType = {}));
class wi {
constructor(t, s) {
this.m_type = e.b2BodyType.b2_staticBody;
this.m_islandFlag = !1;
this.m_awakeFlag = !1;
this.m_autoSleepFlag = !1;
this.m_bulletFlag = !1;
this.m_fixedRotationFlag = !1;
this.m_activeFlag = !1;
this.m_toiFlag = !1;
this.m_islandIndex = 0;
this.m_xf = new ht();
this.m_xf0 = new ht();
this.m_sweep = new ct();
this.m_linearVelocity = new st();
this.m_angularVelocity = 0;
this.m_force = new st();
this.m_torque = 0;
this.m_prev = null;
this.m_next = null;
this.m_fixtureList = null;
this.m_fixtureCount = 0;
this.m_jointList = null;
this.m_contactList = null;
this.m_mass = 1;
this.m_invMass = 1;
this.m_I = 0;
this.m_invI = 0;
this.m_linearDamping = 0;
this.m_angularDamping = 0;
this.m_gravityScale = 1;
this.m_sleepTime = 0;
this.m_userData = null;
this.m_controllerList = null;
this.m_controllerCount = 0;
this.m_bulletFlag = i(t.bullet, !1);
this.m_fixedRotationFlag = i(t.fixedRotation, !1);
this.m_autoSleepFlag = i(t.allowSleep, !0);
this.m_awakeFlag = i(t.awake, !0);
this.m_activeFlag = i(t.active, !0);
this.m_world = s;
this.m_xf.p.Copy(i(t.position, st.ZERO));
this.m_xf.q.SetAngle(i(t.angle, 0));
this.m_xf0.Copy(this.m_xf);
this.m_sweep.localCenter.SetZero();
this.m_sweep.c0.Copy(this.m_xf.p);
this.m_sweep.c.Copy(this.m_xf.p);
this.m_sweep.a0 = this.m_sweep.a = this.m_xf.q.GetAngle();
this.m_sweep.alpha0 = 0;
this.m_linearVelocity.Copy(i(t.linearVelocity, st.ZERO));
this.m_angularVelocity = i(t.angularVelocity, 0);
this.m_linearDamping = i(t.linearDamping, 0);
this.m_angularDamping = i(t.angularDamping, 0);
this.m_gravityScale = i(t.gravityScale, 1);
this.m_force.SetZero();
this.m_torque = 0;
this.m_sleepTime = 0;
this.m_type = i(t.type, e.b2BodyType.b2_staticBody);
if (t.type === e.b2BodyType.b2_dynamicBody) {
this.m_mass = 1;
this.m_invMass = 1;
} else {
this.m_mass = 0;
this.m_invMass = 0;
}
this.m_I = 0;
this.m_invI = 0;
this.m_userData = t.userData;
this.m_fixtureList = null;
this.m_fixtureCount = 0;
this.m_controllerList = null;
this.m_controllerCount = 0;
}
CreateFixture(t, e = 0) {
return t instanceof pi ? this.CreateFixtureShapeDensity(t, e) : this.CreateFixtureDef(t);
}
CreateFixtureDef(t) {
if (this.m_world.IsLocked()) throw new Error();
const e = new Bi(t, this);
e.Create(t);
this.m_activeFlag && e.CreateProxies(this.m_xf);
e.m_next = this.m_fixtureList;
this.m_fixtureList = e;
++this.m_fixtureCount;
e.m_density > 0 && this.ResetMassData();
this.m_world.m_newFixture = !0;
return e;
}
CreateFixtureShapeDensity(t, e = 0) {
const i = wi.CreateFixtureShapeDensity_s_def;
i.shape = t;
i.density = e;
return this.CreateFixtureDef(i);
}
DestroyFixture(t) {
if (this.m_world.IsLocked()) throw new Error();
let e = this.m_fixtureList, i = null;
for (;null !== e; ) {
if (e === t) {
i ? i.m_next = t.m_next : this.m_fixtureList = t.m_next;
break;
}
i = e;
e = e.m_next;
}
let s = this.m_contactList;
for (;s; ) {
const e = s.contact;
s = s.next;
const i = e.GetFixtureA(), r = e.GetFixtureB();
t !== i && t !== r || this.m_world.m_contactManager.Destroy(e);
}
this.m_activeFlag && t.DestroyProxies();
t.m_next = null;
t.Destroy();
--this.m_fixtureCount;
this.ResetMassData();
}
SetTransformVec(t, e) {
this.SetTransformXY(t.x, t.y, e);
}
SetTransformXY(t, e, i) {
if (this.m_world.IsLocked()) throw new Error();
this.m_xf.q.SetAngle(i);
this.m_xf.p.Set(t, e);
this.m_xf0.Copy(this.m_xf);
ht.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
this.m_sweep.a = i;
this.m_sweep.c0.Copy(this.m_sweep.c);
this.m_sweep.a0 = i;
for (let t = this.m_fixtureList; t; t = t.m_next) t.Synchronize(this.m_xf, this.m_xf);
this.m_world.m_contactManager.FindNewContacts();
}
SetTransform(t) {
this.SetTransformVec(t.p, t.GetAngle());
}
GetTransform() {
return this.m_xf;
}
GetPosition() {
return this.m_xf.p;
}
SetPosition(t) {
this.SetTransformVec(t, this.GetAngle());
}
SetPositionXY(t, e) {
this.SetTransformXY(t, e, this.GetAngle());
}
GetAngle() {
return this.m_sweep.a;
}
SetAngle(t) {
this.SetTransformVec(this.GetPosition(), t);
}
GetWorldCenter() {
return this.m_sweep.c;
}
GetLocalCenter() {
return this.m_sweep.localCenter;
}
SetLinearVelocity(t) {
if (this.m_type !== e.b2BodyType.b2_staticBody) {
st.DotVV(t, t) > 0 && this.SetAwake(!0);
this.m_linearVelocity.Copy(t);
}
}
GetLinearVelocity() {
return this.m_linearVelocity;
}
SetAngularVelocity(t) {
if (this.m_type !== e.b2BodyType.b2_staticBody) {
t * t > 0 && this.SetAwake(!0);
this.m_angularVelocity = t;
}
}
GetAngularVelocity() {
return this.m_angularVelocity;
}
GetDefinition(t) {
t.type = this.GetType();
t.allowSleep = this.m_autoSleepFlag;
t.angle = this.GetAngle();
t.angularDamping = this.m_angularDamping;
t.gravityScale = this.m_gravityScale;
t.angularVelocity = this.m_angularVelocity;
t.fixedRotation = this.m_fixedRotationFlag;
t.bullet = this.m_bulletFlag;
t.awake = this.m_awakeFlag;
t.linearDamping = this.m_linearDamping;
t.linearVelocity.Copy(this.GetLinearVelocity());
t.position.Copy(this.GetPosition());
t.userData = this.GetUserData();
return t;
}
ApplyForce(t, i, s = !0) {
if (this.m_type === e.b2BodyType.b2_dynamicBody) {
s && !this.m_awakeFlag && this.SetAwake(!0);
if (this.m_awakeFlag) {
this.m_force.x += t.x;
this.m_force.y += t.y;
this.m_torque += (i.x - this.m_sweep.c.x) * t.y - (i.y - this.m_sweep.c.y) * t.x;
}
}
}
ApplyForceToCenter(t, i = !0) {
if (this.m_type === e.b2BodyType.b2_dynamicBody) {
i && !this.m_awakeFlag && this.SetAwake(!0);
if (this.m_awakeFlag) {
this.m_force.x += t.x;
this.m_force.y += t.y;
}
}
}
ApplyTorque(t, i = !0) {
if (this.m_type === e.b2BodyType.b2_dynamicBody) {
i && !this.m_awakeFlag && this.SetAwake(!0);
this.m_awakeFlag && (this.m_torque += t);
}
}
ApplyLinearImpulse(t, i, s = !0) {
if (this.m_type === e.b2BodyType.b2_dynamicBody) {
s && !this.m_awakeFlag && this.SetAwake(!0);
if (this.m_awakeFlag) {
this.m_linearVelocity.x += this.m_invMass * t.x;
this.m_linearVelocity.y += this.m_invMass * t.y;
this.m_angularVelocity += this.m_invI * ((i.x - this.m_sweep.c.x) * t.y - (i.y - this.m_sweep.c.y) * t.x);
}
}
}
ApplyLinearImpulseToCenter(t, i = !0) {
if (this.m_type === e.b2BodyType.b2_dynamicBody) {
i && !this.m_awakeFlag && this.SetAwake(!0);
if (this.m_awakeFlag) {
this.m_linearVelocity.x += this.m_invMass * t.x;
this.m_linearVelocity.y += this.m_invMass * t.y;
}
}
}
ApplyAngularImpulse(t, i = !0) {
if (this.m_type === e.b2BodyType.b2_dynamicBody) {
i && !this.m_awakeFlag && this.SetAwake(!0);
this.m_awakeFlag && (this.m_angularVelocity += this.m_invI * t);
}
}
GetMass() {
return this.m_mass;
}
GetInertia() {
return this.m_I + this.m_mass * st.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter);
}
GetMassData(t) {
t.mass = this.m_mass;
t.I = this.m_I + this.m_mass * st.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter);
t.center.Copy(this.m_sweep.localCenter);
return t;
}
SetMassData(t) {
if (this.m_world.IsLocked()) throw new Error();
if (this.m_type !== e.b2BodyType.b2_dynamicBody) return;
this.m_invMass = 0;
this.m_I = 0;
this.m_invI = 0;
this.m_mass = t.mass;
this.m_mass <= 0 && (this.m_mass = 1);
this.m_invMass = 1 / this.m_mass;
if (t.I > 0 && !this.m_fixedRotationFlag) {
this.m_I = t.I - this.m_mass * st.DotVV(t.center, t.center);
this.m_invI = 1 / this.m_I;
}
const i = wi.SetMassData_s_oldCenter.Copy(this.m_sweep.c);
this.m_sweep.localCenter.Copy(t.center);
ht.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
this.m_sweep.c0.Copy(this.m_sweep.c);
st.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, st.SubVV(this.m_sweep.c, i, st.s_t0), this.m_linearVelocity);
}
ResetMassData() {
this.m_mass = 0;
this.m_invMass = 0;
this.m_I = 0;
this.m_invI = 0;
this.m_sweep.localCenter.SetZero();
if (this.m_type === e.b2BodyType.b2_staticBody || this.m_type === e.b2BodyType.b2_kinematicBody) {
this.m_sweep.c0.Copy(this.m_xf.p);
this.m_sweep.c.Copy(this.m_xf.p);
this.m_sweep.a0 = this.m_sweep.a;
return;
}
const t = wi.ResetMassData_s_localCenter.SetZero();
for (let e = this.m_fixtureList; e; e = e.m_next) {
if (0 === e.m_density) continue;
const i = e.GetMassData(wi.ResetMassData_s_massData);
this.m_mass += i.mass;
t.x += i.center.x * i.mass;
t.y += i.center.y * i.mass;
this.m_I += i.I;
}
if (this.m_mass > 0) {
this.m_invMass = 1 / this.m_mass;
t.x *= this.m_invMass;
t.y *= this.m_invMass;
} else {
this.m_mass = 1;
this.m_invMass = 1;
}
if (this.m_I > 0 && !this.m_fixedRotationFlag) {
this.m_I -= this.m_mass * st.DotVV(t, t);
this.m_invI = 1 / this.m_I;
} else {
this.m_I = 0;
this.m_invI = 0;
}
const i = wi.ResetMassData_s_oldCenter.Copy(this.m_sweep.c);
this.m_sweep.localCenter.Copy(t);
ht.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
this.m_sweep.c0.Copy(this.m_sweep.c);
st.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, st.SubVV(this.m_sweep.c, i, st.s_t0), this.m_linearVelocity);
}
GetWorldPoint(t, e) {
return ht.MulXV(this.m_xf, t, e);
}
GetWorldVector(t, e) {
return lt.MulRV(this.m_xf.q, t, e);
}
GetLocalPoint(t, e) {
return ht.MulTXV(this.m_xf, t, e);
}
GetLocalVector(t, e) {
return lt.MulTRV(this.m_xf.q, t, e);
}
GetLinearVelocityFromWorldPoint(t, e) {
return st.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, st.SubVV(t, this.m_sweep.c, st.s_t0), e);
}
GetLinearVelocityFromLocalPoint(t, e) {
return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(t, e), e);
}
GetLinearDamping() {
return this.m_linearDamping;
}
SetLinearDamping(t) {
this.m_linearDamping = t;
}
GetAngularDamping() {
return this.m_angularDamping;
}
SetAngularDamping(t) {
this.m_angularDamping = t;
}
GetGravityScale() {
return this.m_gravityScale;
}
SetGravityScale(t) {
this.m_gravityScale = t;
}
SetType(t) {
if (this.m_world.IsLocked()) throw new Error();
if (this.m_type === t) return;
this.m_type = t;
this.ResetMassData();
if (this.m_type === e.b2BodyType.b2_staticBody) {
this.m_linearVelocity.SetZero();
this.m_angularVelocity = 0;
this.m_sweep.a0 = this.m_sweep.a;
this.m_sweep.c0.Copy(this.m_sweep.c);
this.SynchronizeFixtures();
}
this.SetAwake(!0);
this.m_force.SetZero();
this.m_torque = 0;
let i = this.m_contactList;
for (;i; ) {
const t = i;
i = i.next;
this.m_world.m_contactManager.Destroy(t.contact);
}
this.m_contactList = null;
for (let t = this.m_fixtureList; t; t = t.m_next) t.TouchProxies();
}
GetType() {
return this.m_type;
}
SetBullet(t) {
this.m_bulletFlag = t;
}
IsBullet() {
return this.m_bulletFlag;
}
SetSleepingAllowed(t) {
this.m_autoSleepFlag = t;
t || this.SetAwake(!0);
}
IsSleepingAllowed() {
return this.m_autoSleepFlag;
}
SetAwake(t) {
if (t) {
this.m_awakeFlag = !0;
this.m_sleepTime = 0;
} else {
this.m_awakeFlag = !1;
this.m_sleepTime = 0;
this.m_linearVelocity.SetZero();
this.m_angularVelocity = 0;
this.m_force.SetZero();
this.m_torque = 0;
}
}
IsAwake() {
return this.m_awakeFlag;
}
SetActive(t) {
if (this.m_world.IsLocked()) throw new Error();
if (t !== this.IsActive()) {
this.m_activeFlag = t;
if (t) for (let t = this.m_fixtureList; t; t = t.m_next) t.CreateProxies(this.m_xf); else {
for (let t = this.m_fixtureList; t; t = t.m_next) t.DestroyProxies();
let t = this.m_contactList;
for (;t; ) {
const e = t;
t = t.next;
this.m_world.m_contactManager.Destroy(e.contact);
}
this.m_contactList = null;
}
}
}
IsActive() {
return this.m_activeFlag;
}
SetFixedRotation(t) {
if (this.m_fixedRotationFlag !== t) {
this.m_fixedRotationFlag = t;
this.m_angularVelocity = 0;
this.ResetMassData();
}
}
IsFixedRotation() {
return this.m_fixedRotationFlag;
}
GetFixtureList() {
return this.m_fixtureList;
}
GetJointList() {
return this.m_jointList;
}
GetContactList() {
return this.m_contactList;
}
GetNext() {
return this.m_next;
}
GetUserData() {
return this.m_userData;
}
SetUserData(t) {
this.m_userData = t;
}
GetWorld() {
return this.m_world;
}
Dump(t) {
const i = this.m_islandIndex;
t("{\n");
t("  const bd: b2BodyDef = new b2BodyDef();\n");
let s = "";
switch (this.m_type) {
case e.b2BodyType.b2_staticBody:
s = "b2BodyType.b2_staticBody";
break;

case e.b2BodyType.b2_kinematicBody:
s = "b2BodyType.b2_kinematicBody";
break;

case e.b2BodyType.b2_dynamicBody:
s = "b2BodyType.b2_dynamicBody";
}
t("  bd.type = %s;\n", s);
t("  bd.position.Set(%.15f, %.15f);\n", this.m_xf.p.x, this.m_xf.p.y);
t("  bd.angle = %.15f;\n", this.m_sweep.a);
t("  bd.linearVelocity.Set(%.15f, %.15f);\n", this.m_linearVelocity.x, this.m_linearVelocity.y);
t("  bd.angularVelocity = %.15f;\n", this.m_angularVelocity);
t("  bd.linearDamping = %.15f;\n", this.m_linearDamping);
t("  bd.angularDamping = %.15f;\n", this.m_angularDamping);
t("  bd.allowSleep = %s;\n", this.m_autoSleepFlag ? "true" : "false");
t("  bd.awake = %s;\n", this.m_awakeFlag ? "true" : "false");
t("  bd.fixedRotation = %s;\n", this.m_fixedRotationFlag ? "true" : "false");
t("  bd.bullet = %s;\n", this.m_bulletFlag ? "true" : "false");
t("  bd.active = %s;\n", this.m_activeFlag ? "true" : "false");
t("  bd.gravityScale = %.15f;\n", this.m_gravityScale);
t("\n");
t("  bodies[%d] = this.m_world.CreateBody(bd);\n", this.m_islandIndex);
t("\n");
for (let e = this.m_fixtureList; e; e = e.m_next) {
t("  {\n");
e.Dump(t, i);
t("  }\n");
}
t("}\n");
}
SynchronizeFixtures() {
const t = wi.SynchronizeFixtures_s_xf1;
t.q.SetAngle(this.m_sweep.a0);
lt.MulRV(t.q, this.m_sweep.localCenter, t.p);
st.SubVV(this.m_sweep.c0, t.p, t.p);
for (let e = this.m_fixtureList; e; e = e.m_next) e.Synchronize(t, this.m_xf);
}
SynchronizeTransform() {
this.m_xf.q.SetAngle(this.m_sweep.a);
lt.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p);
st.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
}
ShouldCollide(t) {
return (this.m_type !== e.b2BodyType.b2_staticBody || t.m_type !== e.b2BodyType.b2_staticBody) && this.ShouldCollideConnected(t);
}
ShouldCollideConnected(t) {
for (let e = this.m_jointList; e; e = e.next) if (e.other === t && !e.joint.m_collideConnected) return !1;
return !0;
}
Advance(t) {
this.m_sweep.Advance(t);
this.m_sweep.c.Copy(this.m_sweep.c0);
this.m_sweep.a = this.m_sweep.a0;
this.m_xf.q.SetAngle(this.m_sweep.a);
lt.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p);
st.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
}
GetControllerList() {
return this.m_controllerList;
}
GetControllerCount() {
return this.m_controllerCount;
}
}
wi.CreateFixtureShapeDensity_s_def = new xi();
wi.SetMassData_s_oldCenter = new st();
wi.ResetMassData_s_localCenter = new st();
wi.ResetMassData_s_oldCenter = new st();
wi.ResetMassData_s_massData = new di();
wi.SynchronizeFixtures_s_xf1 = new ht();
(function(t) {
t[t.e_unknownJoint = 0] = "e_unknownJoint";
t[t.e_revoluteJoint = 1] = "e_revoluteJoint";
t[t.e_prismaticJoint = 2] = "e_prismaticJoint";
t[t.e_distanceJoint = 3] = "e_distanceJoint";
t[t.e_pulleyJoint = 4] = "e_pulleyJoint";
t[t.e_mouseJoint = 5] = "e_mouseJoint";
t[t.e_gearJoint = 6] = "e_gearJoint";
t[t.e_wheelJoint = 7] = "e_wheelJoint";
t[t.e_weldJoint = 8] = "e_weldJoint";
t[t.e_frictionJoint = 9] = "e_frictionJoint";
t[t.e_ropeJoint = 10] = "e_ropeJoint";
t[t.e_motorJoint = 11] = "e_motorJoint";
t[t.e_areaJoint = 12] = "e_areaJoint";
})(e.b2JointType || (e.b2JointType = {}));
(function(t) {
t[t.e_inactiveLimit = 0] = "e_inactiveLimit";
t[t.e_atLowerLimit = 1] = "e_atLowerLimit";
t[t.e_atUpperLimit = 2] = "e_atUpperLimit";
t[t.e_equalLimits = 3] = "e_equalLimits";
})(e.b2LimitState || (e.b2LimitState = {}));
class Ci {
constructor(t, e) {
this.prev = null;
this.next = null;
this.joint = t;
this.other = e;
}
}
class Vi {
constructor(t) {
this.type = e.b2JointType.e_unknownJoint;
this.userData = null;
this.collideConnected = !1;
this.type = t;
}
}
class Mi {
constructor(t) {
this.m_type = e.b2JointType.e_unknownJoint;
this.m_prev = null;
this.m_next = null;
this.m_index = 0;
this.m_islandFlag = !1;
this.m_collideConnected = !1;
this.m_userData = null;
this.m_type = t.type;
this.m_edgeA = new Ci(this, t.bodyB);
this.m_edgeB = new Ci(this, t.bodyA);
this.m_bodyA = t.bodyA;
this.m_bodyB = t.bodyB;
this.m_collideConnected = i(t.collideConnected, !1);
this.m_userData = t.userData;
}
GetType() {
return this.m_type;
}
GetBodyA() {
return this.m_bodyA;
}
GetBodyB() {
return this.m_bodyB;
}
GetNext() {
return this.m_next;
}
GetUserData() {
return this.m_userData;
}
SetUserData(t) {
this.m_userData = t;
}
IsActive() {
return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
}
GetCollideConnected() {
return this.m_collideConnected;
}
Dump(t) {
t("// Dump is not supported for this joint type.\n");
}
ShiftOrigin(t) {}
}
class Pi extends Vi {
constructor() {
super(e.b2JointType.e_distanceJoint);
this.localAnchorA = new st();
this.localAnchorB = new st();
this.length = 1;
this.frequencyHz = 0;
this.dampingRatio = 0;
}
Initialize(t, e, i, s) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(i, this.localAnchorA);
this.bodyB.GetLocalPoint(s, this.localAnchorB);
this.length = st.DistanceVV(i, s);
this.frequencyHz = 0;
this.dampingRatio = 0;
}
}
class Ii extends Mi {
constructor(t) {
super(t);
this.m_frequencyHz = 0;
this.m_dampingRatio = 0;
this.m_bias = 0;
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_gamma = 0;
this.m_impulse = 0;
this.m_length = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_u = new st();
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_mass = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_frequencyHz = i(t.frequencyHz, 0);
this.m_dampingRatio = i(t.dampingRatio, 0);
this.m_localAnchorA.Copy(t.localAnchorA);
this.m_localAnchorB.Copy(t.localAnchorB);
this.m_length = t.length;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * this.m_impulse * this.m_u.x;
e.y = t * this.m_impulse * this.m_u.y;
return e;
}
GetReactionTorque(t) {
return 0;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
SetLength(t) {
this.m_length = t;
}
Length() {
return this.m_length;
}
SetFrequency(t) {
this.m_frequencyHz = t;
}
GetFrequency() {
return this.m_frequencyHz;
}
SetDampingRatio(t) {
this.m_dampingRatio = t;
}
GetDampingRatio() {
return this.m_dampingRatio;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2DistanceJointDef = new b2DistanceJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.length = %.15f;\n", this.m_length);
t("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz);
t("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const e = t.positions[this.m_indexA].c, i = t.positions[this.m_indexA].a, s = t.velocities[this.m_indexA].v;
let r = t.velocities[this.m_indexA].w;
const n = t.positions[this.m_indexB].c, a = t.positions[this.m_indexB].a, l = t.velocities[this.m_indexB].v;
let h = t.velocities[this.m_indexB].w;
const c = this.m_qA.SetAngle(i), u = this.m_qB.SetAngle(a);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
lt.MulRV(c, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
lt.MulRV(u, this.m_lalcB, this.m_rB);
this.m_u.x = n.x + this.m_rB.x - e.x - this.m_rA.x;
this.m_u.y = n.y + this.m_rB.y - e.y - this.m_rA.y;
const _ = this.m_u.Length();
_ > m ? this.m_u.SelfMul(1 / _) : this.m_u.SetZero();
const f = st.CrossVV(this.m_rA, this.m_u), d = st.CrossVV(this.m_rB, this.m_u);
let p = this.m_invMassA + this.m_invIA * f * f + this.m_invMassB + this.m_invIB * d * d;
this.m_mass = 0 !== p ? 1 / p : 0;
if (this.m_frequencyHz > 0) {
const e = _ - this.m_length, i = 2 * o * this.m_frequencyHz, s = 2 * this.m_mass * this.m_dampingRatio * i, r = this.m_mass * i * i, n = t.step.dt;
this.m_gamma = n * (s + n * r);
this.m_gamma = 0 !== this.m_gamma ? 1 / this.m_gamma : 0;
this.m_bias = e * n * r * this.m_gamma;
p += this.m_gamma;
this.m_mass = 0 !== p ? 1 / p : 0;
} else {
this.m_gamma = 0;
this.m_bias = 0;
}
if (t.step.warmStarting) {
this.m_impulse *= t.step.dtRatio;
const e = st.MulSV(this.m_impulse, this.m_u, Ii.InitVelocityConstraints_s_P);
s.SelfMulSub(this.m_invMassA, e);
r -= this.m_invIA * st.CrossVV(this.m_rA, e);
l.SelfMulAdd(this.m_invMassB, e);
h += this.m_invIB * st.CrossVV(this.m_rB, e);
} else this.m_impulse = 0;
t.velocities[this.m_indexA].w = r;
t.velocities[this.m_indexB].w = h;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = st.AddVCrossSV(e, i, this.m_rA, Ii.SolveVelocityConstraints_s_vpA), o = st.AddVCrossSV(s, r, this.m_rB, Ii.SolveVelocityConstraints_s_vpB), a = st.DotVV(this.m_u, st.SubVV(o, n, st.s_t0)), l = -this.m_mass * (a + this.m_bias + this.m_gamma * this.m_impulse);
this.m_impulse += l;
const h = st.MulSV(l, this.m_u, Ii.SolveVelocityConstraints_s_P);
e.SelfMulSub(this.m_invMassA, h);
i -= this.m_invIA * st.CrossVV(this.m_rA, h);
s.SelfMulAdd(this.m_invMassB, h);
r += this.m_invIB * st.CrossVV(this.m_rB, h);
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
}
SolvePositionConstraints(t) {
if (this.m_frequencyHz > 0) return !0;
const e = t.positions[this.m_indexA].c;
let i = t.positions[this.m_indexA].a;
const s = t.positions[this.m_indexB].c;
let r = t.positions[this.m_indexB].a;
const n = this.m_qA.SetAngle(i), o = this.m_qB.SetAngle(r), a = lt.MulRV(n, this.m_lalcA, this.m_rA), l = lt.MulRV(o, this.m_lalcB, this.m_rB), h = this.m_u;
h.x = s.x + l.x - e.x - a.x;
h.y = s.y + l.y - e.y - a.y;
let c = this.m_u.Normalize() - this.m_length;
c = H(c, -y, y);
const u = -this.m_mass * c, _ = st.MulSV(u, h, Ii.SolvePositionConstraints_s_P);
e.SelfMulSub(this.m_invMassA, _);
i -= this.m_invIA * st.CrossVV(a, _);
s.SelfMulAdd(this.m_invMassB, _);
r += this.m_invIB * st.CrossVV(l, _);
t.positions[this.m_indexA].a = i;
t.positions[this.m_indexB].a = r;
return z(c) < m;
}
}
Ii.InitVelocityConstraints_s_P = new st();
Ii.SolveVelocityConstraints_s_vpA = new st();
Ii.SolveVelocityConstraints_s_vpB = new st();
Ii.SolveVelocityConstraints_s_P = new st();
Ii.SolvePositionConstraints_s_P = new st();
class ki extends Mi {
constructor(t) {
super(t);
this.m_frequencyHz = 0;
this.m_dampingRatio = 0;
this.m_impulse = 0;
this.m_targetArea = 0;
this.m_bodies = t.bodies;
this.m_frequencyHz = i(t.frequencyHz, 0);
this.m_dampingRatio = i(t.dampingRatio, 0);
this.m_targetLengths = O(t.bodies.length);
this.m_normals = st.MakeArray(t.bodies.length);
this.m_joints = [];
this.m_deltas = st.MakeArray(t.bodies.length);
this.m_delta = new st();
const e = new Pi();
e.frequencyHz = this.m_frequencyHz;
e.dampingRatio = this.m_dampingRatio;
this.m_targetArea = 0;
for (let t = 0; t < this.m_bodies.length; ++t) {
const i = this.m_bodies[t], s = this.m_bodies[(t + 1) % this.m_bodies.length], r = i.GetWorldCenter(), n = s.GetWorldCenter();
this.m_targetLengths[t] = st.DistanceVV(r, n);
this.m_targetArea += st.CrossVV(r, n);
e.Initialize(i, s, r, n);
this.m_joints[t] = i.GetWorld().CreateJoint(e);
}
this.m_targetArea *= .5;
}
GetAnchorA(t) {
return t;
}
GetAnchorB(t) {
return t;
}
GetReactionForce(t, e) {
return e;
}
GetReactionTorque(t) {
return 0;
}
SetFrequency(t) {
this.m_frequencyHz = t;
for (let e = 0; e < this.m_joints.length; ++e) this.m_joints[e].SetFrequency(t);
}
GetFrequency() {
return this.m_frequencyHz;
}
SetDampingRatio(t) {
this.m_dampingRatio = t;
for (let e = 0; e < this.m_joints.length; ++e) this.m_joints[e].SetDampingRatio(t);
}
GetDampingRatio() {
return this.m_dampingRatio;
}
Dump(t) {
t("Area joint dumping is not supported.\n");
}
InitVelocityConstraints(t) {
for (let e = 0; e < this.m_bodies.length; ++e) {
const i = this.m_bodies[(e + this.m_bodies.length - 1) % this.m_bodies.length], s = this.m_bodies[(e + 1) % this.m_bodies.length], r = t.positions[i.m_islandIndex].c, n = t.positions[s.m_islandIndex].c, o = this.m_deltas[e];
st.SubVV(n, r, o);
}
if (t.step.warmStarting) {
this.m_impulse *= t.step.dtRatio;
for (let e = 0; e < this.m_bodies.length; ++e) {
const i = this.m_bodies[e], s = t.velocities[i.m_islandIndex].v, r = this.m_deltas[e];
s.x += i.m_invMass * r.y * .5 * this.m_impulse;
s.y += i.m_invMass * -r.x * .5 * this.m_impulse;
}
} else this.m_impulse = 0;
}
SolveVelocityConstraints(t) {
let e = 0, i = 0;
for (let s = 0; s < this.m_bodies.length; ++s) {
const r = this.m_bodies[s], n = t.velocities[r.m_islandIndex].v, o = this.m_deltas[s];
e += o.LengthSquared() / r.GetMass();
i += st.CrossVV(n, o);
}
const s = -2 * i / e;
this.m_impulse += s;
for (let e = 0; e < this.m_bodies.length; ++e) {
const i = this.m_bodies[e], r = t.velocities[i.m_islandIndex].v, n = this.m_deltas[e];
r.x += i.m_invMass * n.y * .5 * s;
r.y += i.m_invMass * -n.x * .5 * s;
}
}
SolvePositionConstraints(t) {
let e = 0, i = 0;
for (let s = 0; s < this.m_bodies.length; ++s) {
const n = this.m_bodies[s], o = this.m_bodies[(s + 1) % this.m_bodies.length], a = t.positions[n.m_islandIndex].c, l = t.positions[o.m_islandIndex].c, h = st.SubVV(l, a, this.m_delta);
let c = h.Length();
c < r && (c = 1);
this.m_normals[s].x = h.y / c;
this.m_normals[s].y = -h.x / c;
e += c;
i += st.CrossVV(a, l);
}
i *= .5;
const s = .5 * (this.m_targetArea - i) / e;
let n = !0;
for (let e = 0; e < this.m_bodies.length; ++e) {
const i = this.m_bodies[e], r = t.positions[i.m_islandIndex].c, o = (e + 1) % this.m_bodies.length, a = st.AddVV(this.m_normals[e], this.m_normals[o], this.m_delta);
a.SelfMul(s);
const l = a.LengthSquared();
l > K(y) && a.SelfMul(y / Z(l));
l > K(m) && (n = !1);
r.x += a.x;
r.y += a.y;
}
return n;
}
}
class Di extends Mi {
constructor(t) {
super(t);
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_linearImpulse = new st();
this.m_angularImpulse = 0;
this.m_maxForce = 0;
this.m_maxTorque = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_linearMass = new ot();
this.m_angularMass = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_K = new ot();
this.m_localAnchorA.Copy(t.localAnchorA);
this.m_localAnchorB.Copy(t.localAnchorB);
this.m_linearImpulse.SetZero();
this.m_maxForce = i(t.maxForce, 0);
this.m_maxTorque = i(t.maxTorque, 0);
this.m_linearMass.SetZero();
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const e = t.positions[this.m_indexA].a, i = t.velocities[this.m_indexA].v;
let s = t.velocities[this.m_indexA].w;
const r = t.positions[this.m_indexB].a, n = t.velocities[this.m_indexB].v;
let o = t.velocities[this.m_indexB].w;
const a = this.m_qA.SetAngle(e), l = this.m_qB.SetAngle(r);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const h = lt.MulRV(a, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const c = lt.MulRV(l, this.m_lalcB, this.m_rB), m = this.m_invMassA, u = this.m_invMassB, _ = this.m_invIA, f = this.m_invIB, d = this.m_K;
d.ex.x = m + u + _ * h.y * h.y + f * c.y * c.y;
d.ex.y = -_ * h.x * h.y - f * c.x * c.y;
d.ey.x = d.ex.y;
d.ey.y = m + u + _ * h.x * h.x + f * c.x * c.x;
d.GetInverse(this.m_linearMass);
this.m_angularMass = _ + f;
this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass);
if (t.step.warmStarting) {
this.m_linearImpulse.SelfMul(t.step.dtRatio);
this.m_angularImpulse *= t.step.dtRatio;
const e = this.m_linearImpulse;
i.SelfMulSub(m, e);
s -= _ * (st.CrossVV(this.m_rA, e) + this.m_angularImpulse);
n.SelfMulAdd(u, e);
o += f * (st.CrossVV(this.m_rB, e) + this.m_angularImpulse);
} else {
this.m_linearImpulse.SetZero();
this.m_angularImpulse = 0;
}
t.velocities[this.m_indexA].w = s;
t.velocities[this.m_indexB].w = o;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = this.m_invMassA, o = this.m_invMassB, a = this.m_invIA, l = this.m_invIB, h = t.step.dt;
{
const t = r - i;
let e = -this.m_angularMass * t;
const s = this.m_angularImpulse, n = h * this.m_maxTorque;
this.m_angularImpulse = H(this.m_angularImpulse + e, -n, n);
i -= a * (e = this.m_angularImpulse - s);
r += l * e;
}
{
const t = st.SubVV(st.AddVCrossSV(s, r, this.m_rB, st.s_t0), st.AddVCrossSV(e, i, this.m_rA, st.s_t1), Di.SolveVelocityConstraints_s_Cdot_v2), c = ot.MulMV(this.m_linearMass, t, Di.SolveVelocityConstraints_s_impulseV).SelfNeg(), m = Di.SolveVelocityConstraints_s_oldImpulseV.Copy(this.m_linearImpulse);
this.m_linearImpulse.SelfAdd(c);
const u = h * this.m_maxForce;
if (this.m_linearImpulse.LengthSquared() > u * u) {
this.m_linearImpulse.Normalize();
this.m_linearImpulse.SelfMul(u);
}
st.SubVV(this.m_linearImpulse, m, c);
e.SelfMulSub(n, c);
i -= a * st.CrossVV(this.m_rA, c);
s.SelfMulAdd(o, c);
r += l * st.CrossVV(this.m_rB, c);
}
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
}
SolvePositionConstraints(t) {
return !0;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * this.m_linearImpulse.x;
e.y = t * this.m_linearImpulse.y;
return e;
}
GetReactionTorque(t) {
return t * this.m_angularImpulse;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
SetMaxForce(t) {
this.m_maxForce = t;
}
GetMaxForce() {
return this.m_maxForce;
}
SetMaxTorque(t) {
this.m_maxTorque = t;
}
GetMaxTorque() {
return this.m_maxTorque;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2FrictionJointDef = new b2FrictionJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.maxForce = %.15f;\n", this.m_maxForce);
t("  jd.maxTorque = %.15f;\n", this.m_maxTorque);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
Di.SolveVelocityConstraints_s_Cdot_v2 = new st();
Di.SolveVelocityConstraints_s_impulseV = new st();
Di.SolveVelocityConstraints_s_oldImpulseV = new st();
class Ti extends Mi {
constructor(t) {
super(t);
this.m_typeA = e.b2JointType.e_unknownJoint;
this.m_typeB = e.b2JointType.e_unknownJoint;
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_localAnchorC = new st();
this.m_localAnchorD = new st();
this.m_localAxisC = new st();
this.m_localAxisD = new st();
this.m_referenceAngleA = 0;
this.m_referenceAngleB = 0;
this.m_constant = 0;
this.m_ratio = 0;
this.m_impulse = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_indexC = 0;
this.m_indexD = 0;
this.m_lcA = new st();
this.m_lcB = new st();
this.m_lcC = new st();
this.m_lcD = new st();
this.m_mA = 0;
this.m_mB = 0;
this.m_mC = 0;
this.m_mD = 0;
this.m_iA = 0;
this.m_iB = 0;
this.m_iC = 0;
this.m_iD = 0;
this.m_JvAC = new st();
this.m_JvBD = new st();
this.m_JwA = 0;
this.m_JwB = 0;
this.m_JwC = 0;
this.m_JwD = 0;
this.m_mass = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_qC = new lt();
this.m_qD = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_lalcC = new st();
this.m_lalcD = new st();
this.m_joint1 = t.joint1;
this.m_joint2 = t.joint2;
this.m_typeA = this.m_joint1.GetType();
this.m_typeB = this.m_joint2.GetType();
let s, r;
this.m_bodyC = this.m_joint1.GetBodyA();
this.m_bodyA = this.m_joint1.GetBodyB();
const n = this.m_bodyA.m_xf, o = this.m_bodyA.m_sweep.a, a = this.m_bodyC.m_xf, l = this.m_bodyC.m_sweep.a;
if (this.m_typeA === e.b2JointType.e_revoluteJoint) {
const e = t.joint1;
this.m_localAnchorC.Copy(e.m_localAnchorA);
this.m_localAnchorA.Copy(e.m_localAnchorB);
this.m_referenceAngleA = e.m_referenceAngle;
this.m_localAxisC.SetZero();
s = o - l - this.m_referenceAngleA;
} else {
const e = t.joint1;
this.m_localAnchorC.Copy(e.m_localAnchorA);
this.m_localAnchorA.Copy(e.m_localAnchorB);
this.m_referenceAngleA = e.m_referenceAngle;
this.m_localAxisC.Copy(e.m_localXAxisA);
const i = this.m_localAnchorC, r = lt.MulTRV(a.q, st.AddVV(lt.MulRV(n.q, this.m_localAnchorA, st.s_t0), st.SubVV(n.p, a.p, st.s_t1), st.s_t0), st.s_t0);
s = st.DotVV(st.SubVV(r, i, st.s_t0), this.m_localAxisC);
}
this.m_bodyD = this.m_joint2.GetBodyA();
this.m_bodyB = this.m_joint2.GetBodyB();
const h = this.m_bodyB.m_xf, c = this.m_bodyB.m_sweep.a, m = this.m_bodyD.m_xf, u = this.m_bodyD.m_sweep.a;
if (this.m_typeB === e.b2JointType.e_revoluteJoint) {
const e = t.joint2;
this.m_localAnchorD.Copy(e.m_localAnchorA);
this.m_localAnchorB.Copy(e.m_localAnchorB);
this.m_referenceAngleB = e.m_referenceAngle;
this.m_localAxisD.SetZero();
r = c - u - this.m_referenceAngleB;
} else {
const e = t.joint2;
this.m_localAnchorD.Copy(e.m_localAnchorA);
this.m_localAnchorB.Copy(e.m_localAnchorB);
this.m_referenceAngleB = e.m_referenceAngle;
this.m_localAxisD.Copy(e.m_localXAxisA);
const i = this.m_localAnchorD, s = lt.MulTRV(m.q, st.AddVV(lt.MulRV(h.q, this.m_localAnchorB, st.s_t0), st.SubVV(h.p, m.p, st.s_t1), st.s_t0), st.s_t0);
r = st.DotVV(st.SubVV(s, i, st.s_t0), this.m_localAxisD);
}
this.m_ratio = i(t.ratio, 1);
this.m_constant = s + this.m_ratio * r;
this.m_impulse = 0;
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_indexC = this.m_bodyC.m_islandIndex;
this.m_indexD = this.m_bodyD.m_islandIndex;
this.m_lcA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_lcB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_lcC.Copy(this.m_bodyC.m_sweep.localCenter);
this.m_lcD.Copy(this.m_bodyD.m_sweep.localCenter);
this.m_mA = this.m_bodyA.m_invMass;
this.m_mB = this.m_bodyB.m_invMass;
this.m_mC = this.m_bodyC.m_invMass;
this.m_mD = this.m_bodyD.m_invMass;
this.m_iA = this.m_bodyA.m_invI;
this.m_iB = this.m_bodyB.m_invI;
this.m_iC = this.m_bodyC.m_invI;
this.m_iD = this.m_bodyD.m_invI;
const i = t.positions[this.m_indexA].a, s = t.velocities[this.m_indexA].v;
let r = t.velocities[this.m_indexA].w;
const n = t.positions[this.m_indexB].a, o = t.velocities[this.m_indexB].v;
let a = t.velocities[this.m_indexB].w;
const l = t.positions[this.m_indexC].a, h = t.velocities[this.m_indexC].v;
let c = t.velocities[this.m_indexC].w;
const m = t.positions[this.m_indexD].a, u = t.velocities[this.m_indexD].v;
let _ = t.velocities[this.m_indexD].w;
const f = this.m_qA.SetAngle(i), d = this.m_qB.SetAngle(n), p = this.m_qC.SetAngle(l), y = this.m_qD.SetAngle(m);
this.m_mass = 0;
if (this.m_typeA === e.b2JointType.e_revoluteJoint) {
this.m_JvAC.SetZero();
this.m_JwA = 1;
this.m_JwC = 1;
this.m_mass += this.m_iA + this.m_iC;
} else {
const t = lt.MulRV(p, this.m_localAxisC, Ti.InitVelocityConstraints_s_u);
st.SubVV(this.m_localAnchorC, this.m_lcC, this.m_lalcC);
const e = lt.MulRV(p, this.m_lalcC, Ti.InitVelocityConstraints_s_rC);
st.SubVV(this.m_localAnchorA, this.m_lcA, this.m_lalcA);
const i = lt.MulRV(f, this.m_lalcA, Ti.InitVelocityConstraints_s_rA);
this.m_JvAC.Copy(t);
this.m_JwC = st.CrossVV(e, t);
this.m_JwA = st.CrossVV(i, t);
this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
}
if (this.m_typeB === e.b2JointType.e_revoluteJoint) {
this.m_JvBD.SetZero();
this.m_JwB = this.m_ratio;
this.m_JwD = this.m_ratio;
this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
} else {
const t = lt.MulRV(y, this.m_localAxisD, Ti.InitVelocityConstraints_s_u);
st.SubVV(this.m_localAnchorD, this.m_lcD, this.m_lalcD);
const e = lt.MulRV(y, this.m_lalcD, Ti.InitVelocityConstraints_s_rD);
st.SubVV(this.m_localAnchorB, this.m_lcB, this.m_lalcB);
const i = lt.MulRV(d, this.m_lalcB, Ti.InitVelocityConstraints_s_rB);
st.MulSV(this.m_ratio, t, this.m_JvBD);
this.m_JwD = this.m_ratio * st.CrossVV(e, t);
this.m_JwB = this.m_ratio * st.CrossVV(i, t);
this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
}
this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0;
if (t.step.warmStarting) {
s.SelfMulAdd(this.m_mA * this.m_impulse, this.m_JvAC);
r += this.m_iA * this.m_impulse * this.m_JwA;
o.SelfMulAdd(this.m_mB * this.m_impulse, this.m_JvBD);
a += this.m_iB * this.m_impulse * this.m_JwB;
h.SelfMulSub(this.m_mC * this.m_impulse, this.m_JvAC);
c -= this.m_iC * this.m_impulse * this.m_JwC;
u.SelfMulSub(this.m_mD * this.m_impulse, this.m_JvBD);
_ -= this.m_iD * this.m_impulse * this.m_JwD;
} else this.m_impulse = 0;
t.velocities[this.m_indexA].w = r;
t.velocities[this.m_indexB].w = a;
t.velocities[this.m_indexC].w = c;
t.velocities[this.m_indexD].w = _;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = t.velocities[this.m_indexC].v;
let o = t.velocities[this.m_indexC].w;
const a = t.velocities[this.m_indexD].v;
let l = t.velocities[this.m_indexD].w, h = st.DotVV(this.m_JvAC, st.SubVV(e, n, st.s_t0)) + st.DotVV(this.m_JvBD, st.SubVV(s, a, st.s_t0));
h += this.m_JwA * i - this.m_JwC * o + (this.m_JwB * r - this.m_JwD * l);
const c = -this.m_mass * h;
this.m_impulse += c;
e.SelfMulAdd(this.m_mA * c, this.m_JvAC);
i += this.m_iA * c * this.m_JwA;
s.SelfMulAdd(this.m_mB * c, this.m_JvBD);
r += this.m_iB * c * this.m_JwB;
n.SelfMulSub(this.m_mC * c, this.m_JvAC);
o -= this.m_iC * c * this.m_JwC;
a.SelfMulSub(this.m_mD * c, this.m_JvBD);
l -= this.m_iD * c * this.m_JwD;
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
t.velocities[this.m_indexC].w = o;
t.velocities[this.m_indexD].w = l;
}
SolvePositionConstraints(t) {
const i = t.positions[this.m_indexA].c;
let s = t.positions[this.m_indexA].a;
const r = t.positions[this.m_indexB].c;
let n = t.positions[this.m_indexB].a;
const o = t.positions[this.m_indexC].c;
let a = t.positions[this.m_indexC].a;
const l = t.positions[this.m_indexD].c;
let h = t.positions[this.m_indexD].a;
const c = this.m_qA.SetAngle(s), u = this.m_qB.SetAngle(n), _ = this.m_qC.SetAngle(a), f = this.m_qD.SetAngle(h);
let d, p;
const y = this.m_JvAC, b = this.m_JvBD;
let v, g, S, x, A = 0;
if (this.m_typeA === e.b2JointType.e_revoluteJoint) {
y.SetZero();
v = 1;
S = 1;
A += this.m_iA + this.m_iC;
d = s - a - this.m_referenceAngleA;
} else {
const t = lt.MulRV(_, this.m_localAxisC, Ti.SolvePositionConstraints_s_u), e = lt.MulRV(_, this.m_lalcC, Ti.SolvePositionConstraints_s_rC), s = lt.MulRV(c, this.m_lalcA, Ti.SolvePositionConstraints_s_rA);
y.Copy(t);
S = st.CrossVV(e, t);
v = st.CrossVV(s, t);
A += this.m_mC + this.m_mA + this.m_iC * S * S + this.m_iA * v * v;
const r = this.m_lalcC, n = lt.MulTRV(_, st.AddVV(s, st.SubVV(i, o, st.s_t0), st.s_t0), st.s_t0);
d = st.DotVV(st.SubVV(n, r, st.s_t0), this.m_localAxisC);
}
if (this.m_typeB === e.b2JointType.e_revoluteJoint) {
b.SetZero();
g = this.m_ratio;
x = this.m_ratio;
A += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
p = n - h - this.m_referenceAngleB;
} else {
const t = lt.MulRV(f, this.m_localAxisD, Ti.SolvePositionConstraints_s_u), e = lt.MulRV(f, this.m_lalcD, Ti.SolvePositionConstraints_s_rD), i = lt.MulRV(u, this.m_lalcB, Ti.SolvePositionConstraints_s_rB);
st.MulSV(this.m_ratio, t, b);
x = this.m_ratio * st.CrossVV(e, t);
g = this.m_ratio * st.CrossVV(i, t);
A += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * x * x + this.m_iB * g * g;
const s = this.m_lalcD, n = lt.MulTRV(f, st.AddVV(i, st.SubVV(r, l, st.s_t0), st.s_t0), st.s_t0);
p = st.DotVV(st.SubVV(n, s, st.s_t0), this.m_localAxisD);
}
const B = d + this.m_ratio * p - this.m_constant;
let w = 0;
A > 0 && (w = -B / A);
i.SelfMulAdd(this.m_mA * w, y);
s += this.m_iA * w * v;
r.SelfMulAdd(this.m_mB * w, b);
n += this.m_iB * w * g;
o.SelfMulSub(this.m_mC * w, y);
a -= this.m_iC * w * S;
l.SelfMulSub(this.m_mD * w, b);
h -= this.m_iD * w * x;
t.positions[this.m_indexA].a = s;
t.positions[this.m_indexB].a = n;
t.positions[this.m_indexC].a = a;
t.positions[this.m_indexD].a = h;
return 0 < m;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
return st.MulSV(t * this.m_impulse, this.m_JvAC, e);
}
GetReactionTorque(t) {
return t * this.m_impulse * this.m_JwA;
}
GetJoint1() {
return this.m_joint1;
}
GetJoint2() {
return this.m_joint2;
}
GetRatio() {
return this.m_ratio;
}
SetRatio(t) {
this.m_ratio = t;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex, s = this.m_joint1.m_index, r = this.m_joint2.m_index;
t("  const jd: b2GearJointDef = new b2GearJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.joint1 = joints[%d];\n", s);
t("  jd.joint2 = joints[%d];\n", r);
t("  jd.ratio = %.15f;\n", this.m_ratio);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
Ti.InitVelocityConstraints_s_u = new st();
Ti.InitVelocityConstraints_s_rA = new st();
Ti.InitVelocityConstraints_s_rB = new st();
Ti.InitVelocityConstraints_s_rC = new st();
Ti.InitVelocityConstraints_s_rD = new st();
Ti.SolvePositionConstraints_s_u = new st();
Ti.SolvePositionConstraints_s_rA = new st();
Ti.SolvePositionConstraints_s_rB = new st();
Ti.SolvePositionConstraints_s_rC = new st();
Ti.SolvePositionConstraints_s_rD = new st();
class Gi extends Mi {
constructor(t) {
super(t);
this.m_linearOffset = new st();
this.m_angularOffset = 0;
this.m_linearImpulse = new st();
this.m_angularImpulse = 0;
this.m_maxForce = 0;
this.m_maxTorque = 0;
this.m_correctionFactor = .3;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_linearError = new st();
this.m_angularError = 0;
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_linearMass = new ot();
this.m_angularMass = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_K = new ot();
this.m_linearOffset.Copy(i(t.linearOffset, st.ZERO));
this.m_linearImpulse.SetZero();
this.m_maxForce = i(t.maxForce, 0);
this.m_maxTorque = i(t.maxTorque, 0);
this.m_correctionFactor = i(t.correctionFactor, .3);
}
GetAnchorA(t) {
const e = this.m_bodyA.GetPosition();
t.x = e.x;
t.y = e.y;
return t;
}
GetAnchorB(t) {
const e = this.m_bodyB.GetPosition();
t.x = e.x;
t.y = e.y;
return t;
}
GetReactionForce(t, e) {
return st.MulSV(t, this.m_linearImpulse, e);
}
GetReactionTorque(t) {
return t * this.m_angularImpulse;
}
SetLinearOffset(t) {
if (!st.IsEqualToV(t, this.m_linearOffset)) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_linearOffset.Copy(t);
}
}
GetLinearOffset() {
return this.m_linearOffset;
}
SetAngularOffset(t) {
if (t !== this.m_angularOffset) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_angularOffset = t;
}
}
GetAngularOffset() {
return this.m_angularOffset;
}
SetMaxForce(t) {
this.m_maxForce = t;
}
GetMaxForce() {
return this.m_maxForce;
}
SetMaxTorque(t) {
this.m_maxTorque = t;
}
GetMaxTorque() {
return this.m_maxTorque;
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const e = t.positions[this.m_indexA].c, i = t.positions[this.m_indexA].a, s = t.velocities[this.m_indexA].v;
let r = t.velocities[this.m_indexA].w;
const n = t.positions[this.m_indexB].c, o = t.positions[this.m_indexB].a, a = t.velocities[this.m_indexB].v;
let l = t.velocities[this.m_indexB].w;
const h = this.m_qA.SetAngle(i), c = this.m_qB.SetAngle(o), m = lt.MulRV(h, st.SubVV(this.m_linearOffset, this.m_localCenterA, st.s_t0), this.m_rA), u = lt.MulRV(c, st.NegV(this.m_localCenterB, st.s_t0), this.m_rB), _ = this.m_invMassA, f = this.m_invMassB, d = this.m_invIA, p = this.m_invIB, y = this.m_K;
y.ex.x = _ + f + d * m.y * m.y + p * u.y * u.y;
y.ex.y = -d * m.x * m.y - p * u.x * u.y;
y.ey.x = y.ex.y;
y.ey.y = _ + f + d * m.x * m.x + p * u.x * u.x;
y.GetInverse(this.m_linearMass);
this.m_angularMass = d + p;
this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass);
st.SubVV(st.AddVV(n, u, st.s_t0), st.AddVV(e, m, st.s_t1), this.m_linearError);
this.m_angularError = o - i - this.m_angularOffset;
if (t.step.warmStarting) {
this.m_linearImpulse.SelfMul(t.step.dtRatio);
this.m_angularImpulse *= t.step.dtRatio;
const e = this.m_linearImpulse;
s.SelfMulSub(_, e);
r -= d * (st.CrossVV(m, e) + this.m_angularImpulse);
a.SelfMulAdd(f, e);
l += p * (st.CrossVV(u, e) + this.m_angularImpulse);
} else {
this.m_linearImpulse.SetZero();
this.m_angularImpulse = 0;
}
t.velocities[this.m_indexA].w = r;
t.velocities[this.m_indexB].w = l;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = this.m_invMassA, o = this.m_invMassB, a = this.m_invIA, l = this.m_invIB, h = t.step.dt, c = t.step.inv_dt;
{
const t = r - i + c * this.m_correctionFactor * this.m_angularError;
let e = -this.m_angularMass * t;
const s = this.m_angularImpulse, n = h * this.m_maxTorque;
this.m_angularImpulse = H(this.m_angularImpulse + e, -n, n);
i -= a * (e = this.m_angularImpulse - s);
r += l * e;
}
{
const t = this.m_rA, m = this.m_rB, u = st.AddVV(st.SubVV(st.AddVV(s, st.CrossSV(r, m, st.s_t0), st.s_t0), st.AddVV(e, st.CrossSV(i, t, st.s_t1), st.s_t1), st.s_t2), st.MulSV(c * this.m_correctionFactor, this.m_linearError, st.s_t3), Gi.SolveVelocityConstraints_s_Cdot_v2), _ = ot.MulMV(this.m_linearMass, u, Gi.SolveVelocityConstraints_s_impulse_v2).SelfNeg(), f = Gi.SolveVelocityConstraints_s_oldImpulse_v2.Copy(this.m_linearImpulse);
this.m_linearImpulse.SelfAdd(_);
const d = h * this.m_maxForce;
if (this.m_linearImpulse.LengthSquared() > d * d) {
this.m_linearImpulse.Normalize();
this.m_linearImpulse.SelfMul(d);
}
st.SubVV(this.m_linearImpulse, f, _);
e.SelfMulSub(n, _);
i -= a * st.CrossVV(t, _);
s.SelfMulAdd(o, _);
r += l * st.CrossVV(m, _);
}
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
}
SolvePositionConstraints(t) {
return !0;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2MotorJointDef = new b2MotorJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.linearOffset.Set(%.15f, %.15f);\n", this.m_linearOffset.x, this.m_linearOffset.y);
t("  jd.angularOffset = %.15f;\n", this.m_angularOffset);
t("  jd.maxForce = %.15f;\n", this.m_maxForce);
t("  jd.maxTorque = %.15f;\n", this.m_maxTorque);
t("  jd.correctionFactor = %.15f;\n", this.m_correctionFactor);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
Gi.SolveVelocityConstraints_s_Cdot_v2 = new st();
Gi.SolveVelocityConstraints_s_impulse_v2 = new st();
Gi.SolveVelocityConstraints_s_oldImpulse_v2 = new st();
class Ri extends Mi {
constructor(t) {
super(t);
this.m_localAnchorB = new st();
this.m_targetA = new st();
this.m_frequencyHz = 0;
this.m_dampingRatio = 0;
this.m_beta = 0;
this.m_impulse = new st();
this.m_maxForce = 0;
this.m_gamma = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_rB = new st();
this.m_localCenterB = new st();
this.m_invMassB = 0;
this.m_invIB = 0;
this.m_mass = new ot();
this.m_C = new st();
this.m_qB = new lt();
this.m_lalcB = new st();
this.m_K = new ot();
this.m_targetA.Copy(i(t.target, st.ZERO));
ht.MulTXV(this.m_bodyB.GetTransform(), this.m_targetA, this.m_localAnchorB);
this.m_maxForce = i(t.maxForce, 0);
this.m_impulse.SetZero();
this.m_frequencyHz = i(t.frequencyHz, 0);
this.m_dampingRatio = i(t.dampingRatio, 0);
this.m_beta = 0;
this.m_gamma = 0;
}
SetTarget(t) {
this.m_bodyB.IsAwake() || this.m_bodyB.SetAwake(!0);
this.m_targetA.Copy(t);
}
GetTarget() {
return this.m_targetA;
}
SetMaxForce(t) {
this.m_maxForce = t;
}
GetMaxForce() {
return this.m_maxForce;
}
SetFrequency(t) {
this.m_frequencyHz = t;
}
GetFrequency() {
return this.m_frequencyHz;
}
SetDampingRatio(t) {
this.m_dampingRatio = t;
}
GetDampingRatio() {
return this.m_dampingRatio;
}
InitVelocityConstraints(t) {
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIB = this.m_bodyB.m_invI;
const e = t.positions[this.m_indexB].c, i = t.positions[this.m_indexB].a, s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = this.m_qB.SetAngle(i), a = this.m_bodyB.GetMass(), l = 2 * o * this.m_frequencyHz, h = 2 * a * this.m_dampingRatio * l, c = a * l * l, m = t.step.dt;
this.m_gamma = m * (h + m * c);
0 !== this.m_gamma && (this.m_gamma = 1 / this.m_gamma);
this.m_beta = m * c * this.m_gamma;
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
lt.MulRV(n, this.m_lalcB, this.m_rB);
const u = this.m_K;
u.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
u.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
u.ey.x = u.ex.y;
u.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
u.GetInverse(this.m_mass);
this.m_C.x = e.x + this.m_rB.x - this.m_targetA.x;
this.m_C.y = e.y + this.m_rB.y - this.m_targetA.y;
this.m_C.SelfMul(this.m_beta);
r *= .98;
if (t.step.warmStarting) {
this.m_impulse.SelfMul(t.step.dtRatio);
s.x += this.m_invMassB * this.m_impulse.x;
s.y += this.m_invMassB * this.m_impulse.y;
r += this.m_invIB * st.CrossVV(this.m_rB, this.m_impulse);
} else this.m_impulse.SetZero();
t.velocities[this.m_indexB].w = r;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexB].v;
let i = t.velocities[this.m_indexB].w;
const s = st.AddVCrossSV(e, i, this.m_rB, Ri.SolveVelocityConstraints_s_Cdot), r = ot.MulMV(this.m_mass, st.AddVV(s, st.AddVV(this.m_C, st.MulSV(this.m_gamma, this.m_impulse, st.s_t0), st.s_t0), st.s_t0).SelfNeg(), Ri.SolveVelocityConstraints_s_impulse), n = Ri.SolveVelocityConstraints_s_oldImpulse.Copy(this.m_impulse);
this.m_impulse.SelfAdd(r);
const o = t.step.dt * this.m_maxForce;
this.m_impulse.LengthSquared() > o * o && this.m_impulse.SelfMul(o / this.m_impulse.Length());
st.SubVV(this.m_impulse, n, r);
e.SelfMulAdd(this.m_invMassB, r);
i += this.m_invIB * st.CrossVV(this.m_rB, r);
t.velocities[this.m_indexB].w = i;
}
SolvePositionConstraints(t) {
return !0;
}
GetAnchorA(t) {
t.x = this.m_targetA.x;
t.y = this.m_targetA.y;
return t;
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
return st.MulSV(t, this.m_impulse, e);
}
GetReactionTorque(t) {
return 0;
}
Dump(t) {
t("Mouse joint dumping is not supported.\n");
}
ShiftOrigin(t) {
this.m_targetA.SelfSub(t);
}
}
Ri.SolveVelocityConstraints_s_Cdot = new st();
Ri.SolveVelocityConstraints_s_impulse = new st();
Ri.SolveVelocityConstraints_s_oldImpulse = new st();
class Li extends Mi {
constructor(t) {
super(t);
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_localXAxisA = new st();
this.m_localYAxisA = new st();
this.m_referenceAngle = 0;
this.m_impulse = new nt(0, 0, 0);
this.m_motorImpulse = 0;
this.m_lowerTranslation = 0;
this.m_upperTranslation = 0;
this.m_maxMotorForce = 0;
this.m_motorSpeed = 0;
this.m_enableLimit = !1;
this.m_enableMotor = !1;
this.m_limitState = e.b2LimitState.e_inactiveLimit;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_axis = new st(0, 0);
this.m_perp = new st(0, 0);
this.m_s1 = 0;
this.m_s2 = 0;
this.m_a1 = 0;
this.m_a2 = 0;
this.m_K = new at();
this.m_K3 = new at();
this.m_K2 = new ot();
this.m_motorMass = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_rA = new st();
this.m_rB = new st();
this.m_localAnchorA.Copy(i(t.localAnchorA, st.ZERO));
this.m_localAnchorB.Copy(i(t.localAnchorB, st.ZERO));
this.m_localXAxisA.Copy(i(t.localAxisA, new st(1, 0))).SelfNormalize();
st.CrossOneV(this.m_localXAxisA, this.m_localYAxisA);
this.m_referenceAngle = i(t.referenceAngle, 0);
this.m_lowerTranslation = i(t.lowerTranslation, 0);
this.m_upperTranslation = i(t.upperTranslation, 0);
this.m_maxMotorForce = i(t.maxMotorForce, 0);
this.m_motorSpeed = i(t.motorSpeed, 0);
this.m_enableLimit = i(t.enableLimit, !1);
this.m_enableMotor = i(t.enableMotor, !1);
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const i = t.positions[this.m_indexA].c, s = t.positions[this.m_indexA].a, r = t.velocities[this.m_indexA].v;
let n = t.velocities[this.m_indexA].w;
const o = t.positions[this.m_indexB].c, a = t.positions[this.m_indexB].a, l = t.velocities[this.m_indexB].v;
let h = t.velocities[this.m_indexB].w;
const c = this.m_qA.SetAngle(s), u = this.m_qB.SetAngle(a);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const _ = lt.MulRV(c, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const f = lt.MulRV(u, this.m_lalcB, this.m_rB), d = st.AddVV(st.SubVV(o, i, st.s_t0), st.SubVV(f, _, st.s_t1), Li.InitVelocityConstraints_s_d), p = this.m_invMassA, y = this.m_invMassB, b = this.m_invIA, v = this.m_invIB;
lt.MulRV(c, this.m_localXAxisA, this.m_axis);
this.m_a1 = st.CrossVV(st.AddVV(d, _, st.s_t0), this.m_axis);
this.m_a2 = st.CrossVV(f, this.m_axis);
this.m_motorMass = p + y + b * this.m_a1 * this.m_a1 + v * this.m_a2 * this.m_a2;
this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass);
lt.MulRV(c, this.m_localYAxisA, this.m_perp);
this.m_s1 = st.CrossVV(st.AddVV(d, _, st.s_t0), this.m_perp);
this.m_s2 = st.CrossVV(f, this.m_perp);
this.m_K.ex.x = p + y + b * this.m_s1 * this.m_s1 + v * this.m_s2 * this.m_s2;
this.m_K.ex.y = b * this.m_s1 + v * this.m_s2;
this.m_K.ex.z = b * this.m_s1 * this.m_a1 + v * this.m_s2 * this.m_a2;
this.m_K.ey.x = this.m_K.ex.y;
this.m_K.ey.y = b + v;
0 === this.m_K.ey.y && (this.m_K.ey.y = 1);
this.m_K.ey.z = b * this.m_a1 + v * this.m_a2;
this.m_K.ez.x = this.m_K.ex.z;
this.m_K.ez.y = this.m_K.ey.z;
this.m_K.ez.z = p + y + b * this.m_a1 * this.m_a1 + v * this.m_a2 * this.m_a2;
if (this.m_enableLimit) {
const t = st.DotVV(this.m_axis, d);
if (z(this.m_upperTranslation - this.m_lowerTranslation) < 2 * m) this.m_limitState = e.b2LimitState.e_equalLimits; else if (t <= this.m_lowerTranslation) {
if (this.m_limitState !== e.b2LimitState.e_atLowerLimit) {
this.m_limitState = e.b2LimitState.e_atLowerLimit;
this.m_impulse.z = 0;
}
} else if (t >= this.m_upperTranslation) {
if (this.m_limitState !== e.b2LimitState.e_atUpperLimit) {
this.m_limitState = e.b2LimitState.e_atUpperLimit;
this.m_impulse.z = 0;
}
} else {
this.m_limitState = e.b2LimitState.e_inactiveLimit;
this.m_impulse.z = 0;
}
} else {
this.m_limitState = e.b2LimitState.e_inactiveLimit;
this.m_impulse.z = 0;
}
this.m_enableMotor || (this.m_motorImpulse = 0);
if (t.step.warmStarting) {
this.m_impulse.SelfMul(t.step.dtRatio);
this.m_motorImpulse *= t.step.dtRatio;
const e = st.AddVV(st.MulSV(this.m_impulse.x, this.m_perp, st.s_t0), st.MulSV(this.m_motorImpulse + this.m_impulse.z, this.m_axis, st.s_t1), Li.InitVelocityConstraints_s_P), i = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, s = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
r.SelfMulSub(p, e);
n -= b * i;
l.SelfMulAdd(y, e);
h += v * s;
} else {
this.m_impulse.SetZero();
this.m_motorImpulse = 0;
}
t.velocities[this.m_indexA].w = n;
t.velocities[this.m_indexB].w = h;
}
SolveVelocityConstraints(t) {
const i = t.velocities[this.m_indexA].v;
let s = t.velocities[this.m_indexA].w;
const r = t.velocities[this.m_indexB].v;
let n = t.velocities[this.m_indexB].w;
const o = this.m_invMassA, a = this.m_invMassB, l = this.m_invIA, h = this.m_invIB;
if (this.m_enableMotor && this.m_limitState !== e.b2LimitState.e_equalLimits) {
const e = st.DotVV(this.m_axis, st.SubVV(r, i, st.s_t0)) + this.m_a2 * n - this.m_a1 * s;
let c = this.m_motorMass * (this.m_motorSpeed - e);
const m = this.m_motorImpulse, u = t.step.dt * this.m_maxMotorForce;
this.m_motorImpulse = H(this.m_motorImpulse + c, -u, u);
c = this.m_motorImpulse - m;
const _ = st.MulSV(c, this.m_axis, Li.SolveVelocityConstraints_s_P), f = c * this.m_a1, d = c * this.m_a2;
i.SelfMulSub(o, _);
s -= l * f;
r.SelfMulAdd(a, _);
n += h * d;
}
const c = st.DotVV(this.m_perp, st.SubVV(r, i, st.s_t0)) + this.m_s2 * n - this.m_s1 * s, m = n - s;
if (this.m_enableLimit && this.m_limitState !== e.b2LimitState.e_inactiveLimit) {
const t = st.DotVV(this.m_axis, st.SubVV(r, i, st.s_t0)) + this.m_a2 * n - this.m_a1 * s, u = Li.SolveVelocityConstraints_s_f1.Copy(this.m_impulse), _ = this.m_K.Solve33(-c, -m, -t, Li.SolveVelocityConstraints_s_df3);
this.m_impulse.SelfAdd(_);
this.m_limitState === e.b2LimitState.e_atLowerLimit ? this.m_impulse.z = U(this.m_impulse.z, 0) : this.m_limitState === e.b2LimitState.e_atUpperLimit && (this.m_impulse.z = J(this.m_impulse.z, 0));
const f = -c - (this.m_impulse.z - u.z) * this.m_K.ez.x, d = -m - (this.m_impulse.z - u.z) * this.m_K.ez.y, p = this.m_K.Solve22(f, d, Li.SolveVelocityConstraints_s_f2r);
p.x += u.x;
p.y += u.y;
this.m_impulse.x = p.x;
this.m_impulse.y = p.y;
_.x = this.m_impulse.x - u.x;
_.y = this.m_impulse.y - u.y;
_.z = this.m_impulse.z - u.z;
const y = st.AddVV(st.MulSV(_.x, this.m_perp, st.s_t0), st.MulSV(_.z, this.m_axis, st.s_t1), Li.SolveVelocityConstraints_s_P), b = _.x * this.m_s1 + _.y + _.z * this.m_a1, v = _.x * this.m_s2 + _.y + _.z * this.m_a2;
i.SelfMulSub(o, y);
s -= l * b;
r.SelfMulAdd(a, y);
n += h * v;
} else {
const t = this.m_K.Solve22(-c, -m, Li.SolveVelocityConstraints_s_df2);
this.m_impulse.x += t.x;
this.m_impulse.y += t.y;
const e = st.MulSV(t.x, this.m_perp, Li.SolveVelocityConstraints_s_P), u = t.x * this.m_s1 + t.y, _ = t.x * this.m_s2 + t.y;
i.SelfMulSub(o, e);
s -= l * u;
r.SelfMulAdd(a, e);
n += h * _;
}
t.velocities[this.m_indexA].w = s;
t.velocities[this.m_indexB].w = n;
}
SolvePositionConstraints(t) {
const e = t.positions[this.m_indexA].c;
let i = t.positions[this.m_indexA].a;
const s = t.positions[this.m_indexB].c;
let r = t.positions[this.m_indexB].a;
const n = this.m_qA.SetAngle(i), o = this.m_qB.SetAngle(r), a = this.m_invMassA, l = this.m_invMassB, h = this.m_invIA, c = this.m_invIB, _ = lt.MulRV(n, this.m_lalcA, this.m_rA), f = lt.MulRV(o, this.m_lalcB, this.m_rB), d = st.SubVV(st.AddVV(s, f, st.s_t0), st.AddVV(e, _, st.s_t1), Li.SolvePositionConstraints_s_d), p = lt.MulRV(n, this.m_localXAxisA, this.m_axis), b = st.CrossVV(st.AddVV(d, _, st.s_t0), p), v = st.CrossVV(f, p), g = lt.MulRV(n, this.m_localYAxisA, this.m_perp), S = st.CrossVV(st.AddVV(d, _, st.s_t0), g), x = st.CrossVV(f, g);
let A = Li.SolvePositionConstraints_s_impulse;
const B = st.DotVV(g, d), w = r - i - this.m_referenceAngle;
let C = z(B);
const V = z(w);
let M = !1, P = 0;
if (this.m_enableLimit) {
const t = st.DotVV(p, d);
if (z(this.m_upperTranslation - this.m_lowerTranslation) < 2 * m) {
P = H(t, -y, y);
C = U(C, z(t));
M = !0;
} else if (t <= this.m_lowerTranslation) {
P = H(t - this.m_lowerTranslation + m, -y, 0);
C = U(C, this.m_lowerTranslation - t);
M = !0;
} else if (t >= this.m_upperTranslation) {
P = H(t - this.m_upperTranslation - m, 0, y);
C = U(C, t - this.m_upperTranslation);
M = !0;
}
}
if (M) {
const t = a + l + h * S * S + c * x * x, e = h * S + c * x, i = h * S * b + c * x * v;
let s = h + c;
0 === s && (s = 1);
const r = h * b + c * v, n = a + l + h * b * b + c * v * v, o = this.m_K3;
o.ex.SetXYZ(t, e, i);
o.ey.SetXYZ(e, s, r);
o.ez.SetXYZ(i, r, n);
A = o.Solve33(-B, -w, -P, A);
} else {
const t = a + l + h * S * S + c * x * x, e = h * S + c * x;
let i = h + c;
0 === i && (i = 1);
const s = this.m_K2;
s.ex.Set(t, e);
s.ey.Set(e, i);
const r = s.Solve(-B, -w, Li.SolvePositionConstraints_s_impulse1);
A.x = r.x;
A.y = r.y;
A.z = 0;
}
const I = st.AddVV(st.MulSV(A.x, g, st.s_t0), st.MulSV(A.z, p, st.s_t1), Li.SolvePositionConstraints_s_P), k = A.x * S + A.y + A.z * b, D = A.x * x + A.y + A.z * v;
e.SelfMulSub(a, I);
i -= h * k;
s.SelfMulAdd(l, I);
r += c * D;
t.positions[this.m_indexA].a = i;
t.positions[this.m_indexB].a = r;
return C <= m && V <= u;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x);
e.y = t * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y);
return e;
}
GetReactionTorque(t) {
return t * this.m_impulse.y;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
GetLocalAxisA() {
return this.m_localXAxisA;
}
GetReferenceAngle() {
return this.m_referenceAngle;
}
GetJointTranslation() {
const t = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, Li.GetJointTranslation_s_pA), e = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, Li.GetJointTranslation_s_pB), i = st.SubVV(e, t, Li.GetJointTranslation_s_d), s = this.m_bodyA.GetWorldVector(this.m_localXAxisA, Li.GetJointTranslation_s_axis);
return st.DotVV(i, s);
}
GetJointSpeed() {
const t = this.m_bodyA, e = this.m_bodyB;
st.SubVV(this.m_localAnchorA, t.m_sweep.localCenter, this.m_lalcA);
const i = lt.MulRV(t.m_xf.q, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, e.m_sweep.localCenter, this.m_lalcB);
const s = lt.MulRV(e.m_xf.q, this.m_lalcB, this.m_rB), r = st.AddVV(t.m_sweep.c, i, st.s_t0), n = st.AddVV(e.m_sweep.c, s, st.s_t1), o = st.SubVV(n, r, st.s_t2), a = t.GetWorldVector(this.m_localXAxisA, this.m_axis), l = t.m_linearVelocity, h = e.m_linearVelocity, c = t.m_angularVelocity, m = e.m_angularVelocity;
return st.DotVV(o, st.CrossSV(c, a, st.s_t0)) + st.DotVV(a, st.SubVV(st.AddVCrossSV(h, m, s, st.s_t0), st.AddVCrossSV(l, c, i, st.s_t1), st.s_t0));
}
IsLimitEnabled() {
return this.m_enableLimit;
}
EnableLimit(t) {
if (t !== this.m_enableLimit) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_enableLimit = t;
this.m_impulse.z = 0;
}
}
GetLowerLimit() {
return this.m_lowerTranslation;
}
GetUpperLimit() {
return this.m_upperTranslation;
}
SetLimits(t, e) {
if (t !== this.m_lowerTranslation || e !== this.m_upperTranslation) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_lowerTranslation = t;
this.m_upperTranslation = e;
this.m_impulse.z = 0;
}
}
IsMotorEnabled() {
return this.m_enableMotor;
}
EnableMotor(t) {
if (t !== this.m_enableMotor) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_enableMotor = t;
}
}
SetMotorSpeed(t) {
if (t !== this.m_motorSpeed) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_motorSpeed = t;
}
}
GetMotorSpeed() {
return this.m_motorSpeed;
}
SetMaxMotorForce(t) {
if (t !== this.m_maxMotorForce) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_maxMotorForce = t;
}
}
GetMaxMotorForce() {
return this.m_maxMotorForce;
}
GetMotorForce(t) {
return t * this.m_motorImpulse;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2PrismaticJointDef = new b2PrismaticJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y);
t("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle);
t("  jd.enableLimit = %s;\n", this.m_enableLimit ? "true" : "false");
t("  jd.lowerTranslation = %.15f;\n", this.m_lowerTranslation);
t("  jd.upperTranslation = %.15f;\n", this.m_upperTranslation);
t("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false");
t("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed);
t("  jd.maxMotorForce = %.15f;\n", this.m_maxMotorForce);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
Li.InitVelocityConstraints_s_d = new st();
Li.InitVelocityConstraints_s_P = new st();
Li.SolveVelocityConstraints_s_P = new st();
Li.SolveVelocityConstraints_s_f2r = new st();
Li.SolveVelocityConstraints_s_f1 = new nt();
Li.SolveVelocityConstraints_s_df3 = new nt();
Li.SolveVelocityConstraints_s_df2 = new st();
Li.SolvePositionConstraints_s_d = new st();
Li.SolvePositionConstraints_s_impulse = new nt();
Li.SolvePositionConstraints_s_impulse1 = new st();
Li.SolvePositionConstraints_s_P = new st();
Li.GetJointTranslation_s_pA = new st();
Li.GetJointTranslation_s_pB = new st();
Li.GetJointTranslation_s_d = new st();
Li.GetJointTranslation_s_axis = new st();
class Fi extends Mi {
constructor(t) {
super(t);
this.m_groundAnchorA = new st();
this.m_groundAnchorB = new st();
this.m_lengthA = 0;
this.m_lengthB = 0;
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_constant = 0;
this.m_ratio = 0;
this.m_impulse = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_uA = new st();
this.m_uB = new st();
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_mass = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_groundAnchorA.Copy(i(t.groundAnchorA, new st(-1, 1)));
this.m_groundAnchorB.Copy(i(t.groundAnchorB, new st(1, 0)));
this.m_localAnchorA.Copy(i(t.localAnchorA, new st(-1, 0)));
this.m_localAnchorB.Copy(i(t.localAnchorB, new st(1, 0)));
this.m_lengthA = i(t.lengthA, 0);
this.m_lengthB = i(t.lengthB, 0);
this.m_ratio = i(t.ratio, 1);
this.m_constant = i(t.lengthA, 0) + this.m_ratio * i(t.lengthB, 0);
this.m_impulse = 0;
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const e = t.positions[this.m_indexA].c, i = t.positions[this.m_indexA].a, s = t.velocities[this.m_indexA].v;
let r = t.velocities[this.m_indexA].w;
const n = t.positions[this.m_indexB].c, o = t.positions[this.m_indexB].a, a = t.velocities[this.m_indexB].v;
let l = t.velocities[this.m_indexB].w;
const h = this.m_qA.SetAngle(i), c = this.m_qB.SetAngle(o);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
lt.MulRV(h, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
lt.MulRV(c, this.m_lalcB, this.m_rB);
this.m_uA.Copy(e).SelfAdd(this.m_rA).SelfSub(this.m_groundAnchorA);
this.m_uB.Copy(n).SelfAdd(this.m_rB).SelfSub(this.m_groundAnchorB);
const u = this.m_uA.Length(), _ = this.m_uB.Length();
u > 10 * m ? this.m_uA.SelfMul(1 / u) : this.m_uA.SetZero();
_ > 10 * m ? this.m_uB.SelfMul(1 / _) : this.m_uB.SetZero();
const f = st.CrossVV(this.m_rA, this.m_uA), d = st.CrossVV(this.m_rB, this.m_uB), p = this.m_invMassA + this.m_invIA * f * f, y = this.m_invMassB + this.m_invIB * d * d;
this.m_mass = p + this.m_ratio * this.m_ratio * y;
this.m_mass > 0 && (this.m_mass = 1 / this.m_mass);
if (t.step.warmStarting) {
this.m_impulse *= t.step.dtRatio;
const e = st.MulSV(-this.m_impulse, this.m_uA, Fi.InitVelocityConstraints_s_PA), i = st.MulSV(-this.m_ratio * this.m_impulse, this.m_uB, Fi.InitVelocityConstraints_s_PB);
s.SelfMulAdd(this.m_invMassA, e);
r += this.m_invIA * st.CrossVV(this.m_rA, e);
a.SelfMulAdd(this.m_invMassB, i);
l += this.m_invIB * st.CrossVV(this.m_rB, i);
} else this.m_impulse = 0;
t.velocities[this.m_indexA].w = r;
t.velocities[this.m_indexB].w = l;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = st.AddVCrossSV(e, i, this.m_rA, Fi.SolveVelocityConstraints_s_vpA), o = st.AddVCrossSV(s, r, this.m_rB, Fi.SolveVelocityConstraints_s_vpB), a = -st.DotVV(this.m_uA, n) - this.m_ratio * st.DotVV(this.m_uB, o), l = -this.m_mass * a;
this.m_impulse += l;
const h = st.MulSV(-l, this.m_uA, Fi.SolveVelocityConstraints_s_PA), c = st.MulSV(-this.m_ratio * l, this.m_uB, Fi.SolveVelocityConstraints_s_PB);
e.SelfMulAdd(this.m_invMassA, h);
i += this.m_invIA * st.CrossVV(this.m_rA, h);
s.SelfMulAdd(this.m_invMassB, c);
r += this.m_invIB * st.CrossVV(this.m_rB, c);
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
}
SolvePositionConstraints(t) {
const e = t.positions[this.m_indexA].c;
let i = t.positions[this.m_indexA].a;
const s = t.positions[this.m_indexB].c;
let r = t.positions[this.m_indexB].a;
const n = this.m_qA.SetAngle(i), o = this.m_qB.SetAngle(r);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const a = lt.MulRV(n, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const l = lt.MulRV(o, this.m_lalcB, this.m_rB), h = this.m_uA.Copy(e).SelfAdd(a).SelfSub(this.m_groundAnchorA), c = this.m_uB.Copy(s).SelfAdd(l).SelfSub(this.m_groundAnchorB), u = h.Length(), _ = c.Length();
u > 10 * m ? h.SelfMul(1 / u) : h.SetZero();
_ > 10 * m ? c.SelfMul(1 / _) : c.SetZero();
const f = st.CrossVV(a, h), d = st.CrossVV(l, c), p = this.m_invMassA + this.m_invIA * f * f, y = this.m_invMassB + this.m_invIB * d * d;
let b = p + this.m_ratio * this.m_ratio * y;
b > 0 && (b = 1 / b);
const v = this.m_constant - u - this.m_ratio * _, g = z(v), S = -b * v, x = st.MulSV(-S, h, Fi.SolvePositionConstraints_s_PA), A = st.MulSV(-this.m_ratio * S, c, Fi.SolvePositionConstraints_s_PB);
e.SelfMulAdd(this.m_invMassA, x);
i += this.m_invIA * st.CrossVV(a, x);
s.SelfMulAdd(this.m_invMassB, A);
r += this.m_invIB * st.CrossVV(l, A);
t.positions[this.m_indexA].a = i;
t.positions[this.m_indexB].a = r;
return g < m;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * this.m_impulse * this.m_uB.x;
e.y = t * this.m_impulse * this.m_uB.y;
return e;
}
GetReactionTorque(t) {
return 0;
}
GetGroundAnchorA() {
return this.m_groundAnchorA;
}
GetGroundAnchorB() {
return this.m_groundAnchorB;
}
GetLengthA() {
return this.m_lengthA;
}
GetLengthB() {
return this.m_lengthB;
}
GetRatio() {
return this.m_ratio;
}
GetCurrentLengthA() {
const t = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, Fi.GetCurrentLengthA_s_p), e = this.m_groundAnchorA;
return st.DistanceVV(t, e);
}
GetCurrentLengthB() {
const t = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, Fi.GetCurrentLengthB_s_p), e = this.m_groundAnchorB;
return st.DistanceVV(t, e);
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2PulleyJointDef = new b2PulleyJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.groundAnchorA.Set(%.15f, %.15f);\n", this.m_groundAnchorA.x, this.m_groundAnchorA.y);
t("  jd.groundAnchorB.Set(%.15f, %.15f);\n", this.m_groundAnchorB.x, this.m_groundAnchorB.y);
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.lengthA = %.15f;\n", this.m_lengthA);
t("  jd.lengthB = %.15f;\n", this.m_lengthB);
t("  jd.ratio = %.15f;\n", this.m_ratio);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
ShiftOrigin(t) {
this.m_groundAnchorA.SelfSub(t);
this.m_groundAnchorB.SelfSub(t);
}
}
Fi.InitVelocityConstraints_s_PA = new st();
Fi.InitVelocityConstraints_s_PB = new st();
Fi.SolveVelocityConstraints_s_vpA = new st();
Fi.SolveVelocityConstraints_s_vpB = new st();
Fi.SolveVelocityConstraints_s_PA = new st();
Fi.SolveVelocityConstraints_s_PB = new st();
Fi.SolvePositionConstraints_s_PA = new st();
Fi.SolvePositionConstraints_s_PB = new st();
Fi.GetCurrentLengthA_s_p = new st();
Fi.GetCurrentLengthB_s_p = new st();
class Ei extends Mi {
constructor(t) {
super(t);
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_impulse = new nt();
this.m_motorImpulse = 0;
this.m_enableMotor = !1;
this.m_maxMotorTorque = 0;
this.m_motorSpeed = 0;
this.m_enableLimit = !1;
this.m_referenceAngle = 0;
this.m_lowerAngle = 0;
this.m_upperAngle = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_mass = new at();
this.m_motorMass = 0;
this.m_limitState = e.b2LimitState.e_inactiveLimit;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_K = new ot();
this.m_localAnchorA.Copy(i(t.localAnchorA, st.ZERO));
this.m_localAnchorB.Copy(i(t.localAnchorB, st.ZERO));
this.m_referenceAngle = i(t.referenceAngle, 0);
this.m_impulse.SetZero();
this.m_motorImpulse = 0;
this.m_lowerAngle = i(t.lowerAngle, 0);
this.m_upperAngle = i(t.upperAngle, 0);
this.m_maxMotorTorque = i(t.maxMotorTorque, 0);
this.m_motorSpeed = i(t.motorSpeed, 0);
this.m_enableLimit = i(t.enableLimit, !1);
this.m_enableMotor = i(t.enableMotor, !1);
this.m_limitState = e.b2LimitState.e_inactiveLimit;
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const i = t.positions[this.m_indexA].a, s = t.velocities[this.m_indexA].v;
let r = t.velocities[this.m_indexA].w;
const n = t.positions[this.m_indexB].a, o = t.velocities[this.m_indexB].v;
let a = t.velocities[this.m_indexB].w;
const l = this.m_qA.SetAngle(i), h = this.m_qB.SetAngle(n);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
lt.MulRV(l, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
lt.MulRV(h, this.m_lalcB, this.m_rB);
const c = this.m_invMassA, m = this.m_invMassB, _ = this.m_invIA, f = this.m_invIB, d = _ + f === 0;
this.m_mass.ex.x = c + m + this.m_rA.y * this.m_rA.y * _ + this.m_rB.y * this.m_rB.y * f;
this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * _ - this.m_rB.y * this.m_rB.x * f;
this.m_mass.ez.x = -this.m_rA.y * _ - this.m_rB.y * f;
this.m_mass.ex.y = this.m_mass.ey.x;
this.m_mass.ey.y = c + m + this.m_rA.x * this.m_rA.x * _ + this.m_rB.x * this.m_rB.x * f;
this.m_mass.ez.y = this.m_rA.x * _ + this.m_rB.x * f;
this.m_mass.ex.z = this.m_mass.ez.x;
this.m_mass.ey.z = this.m_mass.ez.y;
this.m_mass.ez.z = _ + f;
this.m_motorMass = _ + f;
this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass);
this.m_enableMotor && !d || (this.m_motorImpulse = 0);
if (this.m_enableLimit && !d) {
const t = n - i - this.m_referenceAngle;
if (z(this.m_upperAngle - this.m_lowerAngle) < 2 * u) this.m_limitState = e.b2LimitState.e_equalLimits; else if (t <= this.m_lowerAngle) {
this.m_limitState !== e.b2LimitState.e_atLowerLimit && (this.m_impulse.z = 0);
this.m_limitState = e.b2LimitState.e_atLowerLimit;
} else if (t >= this.m_upperAngle) {
this.m_limitState !== e.b2LimitState.e_atUpperLimit && (this.m_impulse.z = 0);
this.m_limitState = e.b2LimitState.e_atUpperLimit;
} else {
this.m_limitState = e.b2LimitState.e_inactiveLimit;
this.m_impulse.z = 0;
}
} else this.m_limitState = e.b2LimitState.e_inactiveLimit;
if (t.step.warmStarting) {
this.m_impulse.SelfMul(t.step.dtRatio);
this.m_motorImpulse *= t.step.dtRatio;
const e = Ei.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
s.SelfMulSub(c, e);
r -= _ * (st.CrossVV(this.m_rA, e) + this.m_motorImpulse + this.m_impulse.z);
o.SelfMulAdd(m, e);
a += f * (st.CrossVV(this.m_rB, e) + this.m_motorImpulse + this.m_impulse.z);
} else {
this.m_impulse.SetZero();
this.m_motorImpulse = 0;
}
t.velocities[this.m_indexA].w = r;
t.velocities[this.m_indexB].w = a;
}
SolveVelocityConstraints(t) {
const i = t.velocities[this.m_indexA].v;
let s = t.velocities[this.m_indexA].w;
const r = t.velocities[this.m_indexB].v;
let n = t.velocities[this.m_indexB].w;
const o = this.m_invMassA, a = this.m_invMassB, l = this.m_invIA, h = this.m_invIB, c = l + h === 0;
if (this.m_enableMotor && this.m_limitState !== e.b2LimitState.e_equalLimits && !c) {
const e = n - s - this.m_motorSpeed;
let i = -this.m_motorMass * e;
const r = this.m_motorImpulse, o = t.step.dt * this.m_maxMotorTorque;
this.m_motorImpulse = H(this.m_motorImpulse + i, -o, o);
s -= l * (i = this.m_motorImpulse - r);
n += h * i;
}
if (this.m_enableLimit && this.m_limitState !== e.b2LimitState.e_inactiveLimit && !c) {
const t = st.SubVV(st.AddVCrossSV(r, n, this.m_rB, st.s_t0), st.AddVCrossSV(i, s, this.m_rA, st.s_t1), Ei.SolveVelocityConstraints_s_Cdot1), c = n - s, m = this.m_mass.Solve33(t.x, t.y, c, Ei.SolveVelocityConstraints_s_impulse_v3).SelfNeg();
if (this.m_limitState === e.b2LimitState.e_equalLimits) this.m_impulse.SelfAdd(m); else if (this.m_limitState === e.b2LimitState.e_atLowerLimit) if (this.m_impulse.z + m.z < 0) {
const e = -t.x + this.m_impulse.z * this.m_mass.ez.x, i = -t.y + this.m_impulse.z * this.m_mass.ez.y, s = this.m_mass.Solve22(e, i, Ei.SolveVelocityConstraints_s_reduced_v2);
m.x = s.x;
m.y = s.y;
m.z = -this.m_impulse.z;
this.m_impulse.x += s.x;
this.m_impulse.y += s.y;
this.m_impulse.z = 0;
} else this.m_impulse.SelfAdd(m); else if (this.m_limitState === e.b2LimitState.e_atUpperLimit) if (this.m_impulse.z + m.z > 0) {
const e = -t.x + this.m_impulse.z * this.m_mass.ez.x, i = -t.y + this.m_impulse.z * this.m_mass.ez.y, s = this.m_mass.Solve22(e, i, Ei.SolveVelocityConstraints_s_reduced_v2);
m.x = s.x;
m.y = s.y;
m.z = -this.m_impulse.z;
this.m_impulse.x += s.x;
this.m_impulse.y += s.y;
this.m_impulse.z = 0;
} else this.m_impulse.SelfAdd(m);
const u = Ei.SolveVelocityConstraints_s_P.Set(m.x, m.y);
i.SelfMulSub(o, u);
s -= l * (st.CrossVV(this.m_rA, u) + m.z);
r.SelfMulAdd(a, u);
n += h * (st.CrossVV(this.m_rB, u) + m.z);
} else {
const t = st.SubVV(st.AddVCrossSV(r, n, this.m_rB, st.s_t0), st.AddVCrossSV(i, s, this.m_rA, st.s_t1), Ei.SolveVelocityConstraints_s_Cdot_v2), e = this.m_mass.Solve22(-t.x, -t.y, Ei.SolveVelocityConstraints_s_impulse_v2);
this.m_impulse.x += e.x;
this.m_impulse.y += e.y;
i.SelfMulSub(o, e);
s -= l * st.CrossVV(this.m_rA, e);
r.SelfMulAdd(a, e);
n += h * st.CrossVV(this.m_rB, e);
}
t.velocities[this.m_indexA].w = s;
t.velocities[this.m_indexB].w = n;
}
SolvePositionConstraints(t) {
const i = t.positions[this.m_indexA].c;
let s = t.positions[this.m_indexA].a;
const r = t.positions[this.m_indexB].c;
let n = t.positions[this.m_indexB].a;
const o = this.m_qA.SetAngle(s), a = this.m_qB.SetAngle(n);
let l = 0, h = 0;
const c = this.m_invIA + this.m_invIB === 0;
if (this.m_enableLimit && this.m_limitState !== e.b2LimitState.e_inactiveLimit && !c) {
const t = n - s - this.m_referenceAngle;
let i = 0;
if (this.m_limitState === e.b2LimitState.e_equalLimits) {
const e = H(t - this.m_lowerAngle, -b, b);
i = -this.m_motorMass * e;
l = z(e);
} else if (this.m_limitState === e.b2LimitState.e_atLowerLimit) {
let e = t - this.m_lowerAngle;
l = -e;
e = H(e + u, -b, 0);
i = -this.m_motorMass * e;
} else if (this.m_limitState === e.b2LimitState.e_atUpperLimit) {
let e = t - this.m_upperAngle;
l = e;
e = H(e - u, 0, b);
i = -this.m_motorMass * e;
}
s -= this.m_invIA * i;
n += this.m_invIB * i;
}
{
o.SetAngle(s);
a.SetAngle(n);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const t = lt.MulRV(o, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const e = lt.MulRV(a, this.m_lalcB, this.m_rB), l = st.SubVV(st.AddVV(r, e, st.s_t0), st.AddVV(i, t, st.s_t1), Ei.SolvePositionConstraints_s_C_v2);
h = l.Length();
const c = this.m_invMassA, m = this.m_invMassB, u = this.m_invIA, _ = this.m_invIB, f = this.m_K;
f.ex.x = c + m + u * t.y * t.y + _ * e.y * e.y;
f.ex.y = -u * t.x * t.y - _ * e.x * e.y;
f.ey.x = f.ex.y;
f.ey.y = c + m + u * t.x * t.x + _ * e.x * e.x;
const d = f.Solve(l.x, l.y, Ei.SolvePositionConstraints_s_impulse).SelfNeg();
i.SelfMulSub(c, d);
s -= u * st.CrossVV(t, d);
r.SelfMulAdd(m, d);
n += _ * st.CrossVV(e, d);
}
t.positions[this.m_indexA].a = s;
t.positions[this.m_indexB].a = n;
return h <= m && l <= u;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * this.m_impulse.x;
e.y = t * this.m_impulse.y;
return e;
}
GetReactionTorque(t) {
return t * this.m_impulse.z;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
GetReferenceAngle() {
return this.m_referenceAngle;
}
GetJointAngle() {
return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
}
GetJointSpeed() {
return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
}
IsMotorEnabled() {
return this.m_enableMotor;
}
EnableMotor(t) {
if (t !== this.m_enableMotor) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_enableMotor = t;
}
}
GetMotorTorque(t) {
return t * this.m_motorImpulse;
}
GetMotorSpeed() {
return this.m_motorSpeed;
}
SetMaxMotorTorque(t) {
if (t !== this.m_maxMotorTorque) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_maxMotorTorque = t;
}
}
GetMaxMotorTorque() {
return this.m_maxMotorTorque;
}
IsLimitEnabled() {
return this.m_enableLimit;
}
EnableLimit(t) {
if (t !== this.m_enableLimit) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_enableLimit = t;
this.m_impulse.z = 0;
}
}
GetLowerLimit() {
return this.m_lowerAngle;
}
GetUpperLimit() {
return this.m_upperAngle;
}
SetLimits(t, e) {
if (t !== this.m_lowerAngle || e !== this.m_upperAngle) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_impulse.z = 0;
this.m_lowerAngle = t;
this.m_upperAngle = e;
}
}
SetMotorSpeed(t) {
if (t !== this.m_motorSpeed) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_motorSpeed = t;
}
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2RevoluteJointDef = new b2RevoluteJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle);
t("  jd.enableLimit = %s;\n", this.m_enableLimit ? "true" : "false");
t("  jd.lowerAngle = %.15f;\n", this.m_lowerAngle);
t("  jd.upperAngle = %.15f;\n", this.m_upperAngle);
t("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false");
t("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed);
t("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
Ei.InitVelocityConstraints_s_P = new st();
Ei.SolveVelocityConstraints_s_P = new st();
Ei.SolveVelocityConstraints_s_Cdot_v2 = new st();
Ei.SolveVelocityConstraints_s_Cdot1 = new st();
Ei.SolveVelocityConstraints_s_impulse_v3 = new nt();
Ei.SolveVelocityConstraints_s_reduced_v2 = new st();
Ei.SolveVelocityConstraints_s_impulse_v2 = new st();
Ei.SolvePositionConstraints_s_C_v2 = new st();
Ei.SolvePositionConstraints_s_impulse = new st();
class Oi extends Mi {
constructor(t) {
super(t);
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_maxLength = 0;
this.m_length = 0;
this.m_impulse = 0;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_u = new st();
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_mass = 0;
this.m_state = e.b2LimitState.e_inactiveLimit;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_localAnchorA.Copy(i(t.localAnchorA, new st(-1, 0)));
this.m_localAnchorB.Copy(i(t.localAnchorB, new st(1, 0)));
this.m_maxLength = i(t.maxLength, 0);
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const i = t.positions[this.m_indexA].c, s = t.positions[this.m_indexA].a, r = t.velocities[this.m_indexA].v;
let n = t.velocities[this.m_indexA].w;
const o = t.positions[this.m_indexB].c, a = t.positions[this.m_indexB].a, l = t.velocities[this.m_indexB].v;
let h = t.velocities[this.m_indexB].w;
const c = this.m_qA.SetAngle(s), u = this.m_qB.SetAngle(a);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
lt.MulRV(c, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
lt.MulRV(u, this.m_lalcB, this.m_rB);
this.m_u.Copy(o).SelfAdd(this.m_rB).SelfSub(i).SelfSub(this.m_rA);
this.m_length = this.m_u.Length();
const _ = this.m_length - this.m_maxLength;
this.m_state = _ > 0 ? e.b2LimitState.e_atUpperLimit : e.b2LimitState.e_inactiveLimit;
if (!(this.m_length > m)) {
this.m_u.SetZero();
this.m_mass = 0;
this.m_impulse = 0;
return;
}
this.m_u.SelfMul(1 / this.m_length);
const f = st.CrossVV(this.m_rA, this.m_u), d = st.CrossVV(this.m_rB, this.m_u), p = this.m_invMassA + this.m_invIA * f * f + this.m_invMassB + this.m_invIB * d * d;
this.m_mass = 0 !== p ? 1 / p : 0;
if (t.step.warmStarting) {
this.m_impulse *= t.step.dtRatio;
const e = st.MulSV(this.m_impulse, this.m_u, Oi.InitVelocityConstraints_s_P);
r.SelfMulSub(this.m_invMassA, e);
n -= this.m_invIA * st.CrossVV(this.m_rA, e);
l.SelfMulAdd(this.m_invMassB, e);
h += this.m_invIB * st.CrossVV(this.m_rB, e);
} else this.m_impulse = 0;
t.velocities[this.m_indexA].w = n;
t.velocities[this.m_indexB].w = h;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = st.AddVCrossSV(e, i, this.m_rA, Oi.SolveVelocityConstraints_s_vpA), o = st.AddVCrossSV(s, r, this.m_rB, Oi.SolveVelocityConstraints_s_vpB), a = this.m_length - this.m_maxLength;
let l = st.DotVV(this.m_u, st.SubVV(o, n, st.s_t0));
a < 0 && (l += t.step.inv_dt * a);
let h = -this.m_mass * l;
const c = this.m_impulse;
this.m_impulse = J(0, this.m_impulse + h);
h = this.m_impulse - c;
const m = st.MulSV(h, this.m_u, Oi.SolveVelocityConstraints_s_P);
e.SelfMulSub(this.m_invMassA, m);
i -= this.m_invIA * st.CrossVV(this.m_rA, m);
s.SelfMulAdd(this.m_invMassB, m);
r += this.m_invIB * st.CrossVV(this.m_rB, m);
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
}
SolvePositionConstraints(t) {
const e = t.positions[this.m_indexA].c;
let i = t.positions[this.m_indexA].a;
const s = t.positions[this.m_indexB].c;
let r = t.positions[this.m_indexB].a;
const n = this.m_qA.SetAngle(i), o = this.m_qB.SetAngle(r);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const a = lt.MulRV(n, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const l = lt.MulRV(o, this.m_lalcB, this.m_rB), h = this.m_u.Copy(s).SelfAdd(l).SelfSub(e).SelfSub(a), c = h.Normalize();
let u = c - this.m_maxLength;
u = H(u, 0, y);
const _ = -this.m_mass * u, f = st.MulSV(_, h, Oi.SolvePositionConstraints_s_P);
e.SelfMulSub(this.m_invMassA, f);
i -= this.m_invIA * st.CrossVV(a, f);
s.SelfMulAdd(this.m_invMassB, f);
r += this.m_invIB * st.CrossVV(l, f);
t.positions[this.m_indexA].a = i;
t.positions[this.m_indexB].a = r;
return c - this.m_maxLength < m;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
return st.MulSV(t * this.m_impulse, this.m_u, e);
}
GetReactionTorque(t) {
return 0;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
SetMaxLength(t) {
this.m_maxLength = t;
}
GetMaxLength() {
return this.m_maxLength;
}
GetLimitState() {
return this.m_state;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2RopeJointDef = new b2RopeJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.maxLength = %.15f;\n", this.m_maxLength);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
Oi.InitVelocityConstraints_s_P = new st();
Oi.SolveVelocityConstraints_s_vpA = new st();
Oi.SolveVelocityConstraints_s_vpB = new st();
Oi.SolveVelocityConstraints_s_P = new st();
Oi.SolvePositionConstraints_s_P = new st();
class ji extends Mi {
constructor(t) {
super(t);
this.m_frequencyHz = 0;
this.m_dampingRatio = 0;
this.m_bias = 0;
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_referenceAngle = 0;
this.m_gamma = 0;
this.m_impulse = new nt(0, 0, 0);
this.m_indexA = 0;
this.m_indexB = 0;
this.m_rA = new st();
this.m_rB = new st();
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_mass = new at();
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_K = new at();
this.m_frequencyHz = i(t.frequencyHz, 0);
this.m_dampingRatio = i(t.dampingRatio, 0);
this.m_localAnchorA.Copy(i(t.localAnchorA, st.ZERO));
this.m_localAnchorB.Copy(i(t.localAnchorB, st.ZERO));
this.m_referenceAngle = i(t.referenceAngle, 0);
this.m_impulse.SetZero();
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const e = t.positions[this.m_indexA].a, i = t.velocities[this.m_indexA].v;
let s = t.velocities[this.m_indexA].w;
const r = t.positions[this.m_indexB].a, n = t.velocities[this.m_indexB].v;
let a = t.velocities[this.m_indexB].w;
const l = this.m_qA.SetAngle(e), h = this.m_qB.SetAngle(r);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
lt.MulRV(l, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
lt.MulRV(h, this.m_lalcB, this.m_rB);
const c = this.m_invMassA, m = this.m_invMassB, u = this.m_invIA, _ = this.m_invIB, f = this.m_K;
f.ex.x = c + m + this.m_rA.y * this.m_rA.y * u + this.m_rB.y * this.m_rB.y * _;
f.ey.x = -this.m_rA.y * this.m_rA.x * u - this.m_rB.y * this.m_rB.x * _;
f.ez.x = -this.m_rA.y * u - this.m_rB.y * _;
f.ex.y = f.ey.x;
f.ey.y = c + m + this.m_rA.x * this.m_rA.x * u + this.m_rB.x * this.m_rB.x * _;
f.ez.y = this.m_rA.x * u + this.m_rB.x * _;
f.ex.z = f.ez.x;
f.ey.z = f.ez.y;
f.ez.z = u + _;
if (this.m_frequencyHz > 0) {
f.GetInverse22(this.m_mass);
let i = u + _;
const s = i > 0 ? 1 / i : 0, n = r - e - this.m_referenceAngle, a = 2 * o * this.m_frequencyHz, l = 2 * s * this.m_dampingRatio * a, h = s * a * a, c = t.step.dt;
this.m_gamma = c * (l + c * h);
this.m_gamma = 0 !== this.m_gamma ? 1 / this.m_gamma : 0;
this.m_bias = n * c * h * this.m_gamma;
i += this.m_gamma;
this.m_mass.ez.z = 0 !== i ? 1 / i : 0;
} else {
f.GetSymInverse33(this.m_mass);
this.m_gamma = 0;
this.m_bias = 0;
}
if (t.step.warmStarting) {
this.m_impulse.SelfMul(t.step.dtRatio);
const e = ji.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
i.SelfMulSub(c, e);
s -= u * (st.CrossVV(this.m_rA, e) + this.m_impulse.z);
n.SelfMulAdd(m, e);
a += _ * (st.CrossVV(this.m_rB, e) + this.m_impulse.z);
} else this.m_impulse.SetZero();
t.velocities[this.m_indexA].w = s;
t.velocities[this.m_indexB].w = a;
}
SolveVelocityConstraints(t) {
const e = t.velocities[this.m_indexA].v;
let i = t.velocities[this.m_indexA].w;
const s = t.velocities[this.m_indexB].v;
let r = t.velocities[this.m_indexB].w;
const n = this.m_invMassA, o = this.m_invMassB, a = this.m_invIA, l = this.m_invIB;
if (this.m_frequencyHz > 0) {
const t = r - i, h = -this.m_mass.ez.z * (t + this.m_bias + this.m_gamma * this.m_impulse.z);
this.m_impulse.z += h;
i -= a * h;
r += l * h;
const c = st.SubVV(st.AddVCrossSV(s, r, this.m_rB, st.s_t0), st.AddVCrossSV(e, i, this.m_rA, st.s_t1), ji.SolveVelocityConstraints_s_Cdot1), m = at.MulM33XY(this.m_mass, c.x, c.y, ji.SolveVelocityConstraints_s_impulse1).SelfNeg();
this.m_impulse.x += m.x;
this.m_impulse.y += m.y;
const u = m;
e.SelfMulSub(n, u);
i -= a * st.CrossVV(this.m_rA, u);
s.SelfMulAdd(o, u);
r += l * st.CrossVV(this.m_rB, u);
} else {
const t = st.SubVV(st.AddVCrossSV(s, r, this.m_rB, st.s_t0), st.AddVCrossSV(e, i, this.m_rA, st.s_t1), ji.SolveVelocityConstraints_s_Cdot1), h = r - i, c = at.MulM33XYZ(this.m_mass, t.x, t.y, h, ji.SolveVelocityConstraints_s_impulse).SelfNeg();
this.m_impulse.SelfAdd(c);
const m = ji.SolveVelocityConstraints_s_P.Set(c.x, c.y);
e.SelfMulSub(n, m);
i -= a * (st.CrossVV(this.m_rA, m) + c.z);
s.SelfMulAdd(o, m);
r += l * (st.CrossVV(this.m_rB, m) + c.z);
}
t.velocities[this.m_indexA].w = i;
t.velocities[this.m_indexB].w = r;
}
SolvePositionConstraints(t) {
const e = t.positions[this.m_indexA].c;
let i = t.positions[this.m_indexA].a;
const s = t.positions[this.m_indexB].c;
let r = t.positions[this.m_indexB].a;
const n = this.m_qA.SetAngle(i), o = this.m_qB.SetAngle(r), a = this.m_invMassA, l = this.m_invMassB, h = this.m_invIA, c = this.m_invIB;
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const _ = lt.MulRV(n, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const f = lt.MulRV(o, this.m_lalcB, this.m_rB);
let d, p;
const y = this.m_K;
y.ex.x = a + l + _.y * _.y * h + f.y * f.y * c;
y.ey.x = -_.y * _.x * h - f.y * f.x * c;
y.ez.x = -_.y * h - f.y * c;
y.ex.y = y.ey.x;
y.ey.y = a + l + _.x * _.x * h + f.x * f.x * c;
y.ez.y = _.x * h + f.x * c;
y.ex.z = y.ez.x;
y.ey.z = y.ez.y;
y.ez.z = h + c;
if (this.m_frequencyHz > 0) {
const t = st.SubVV(st.AddVV(s, f, st.s_t0), st.AddVV(e, _, st.s_t1), ji.SolvePositionConstraints_s_C1);
d = t.Length();
p = 0;
const n = y.Solve22(t.x, t.y, ji.SolvePositionConstraints_s_P).SelfNeg();
e.SelfMulSub(a, n);
i -= h * st.CrossVV(_, n);
s.SelfMulAdd(l, n);
r += c * st.CrossVV(f, n);
} else {
const t = st.SubVV(st.AddVV(s, f, st.s_t0), st.AddVV(e, _, st.s_t1), ji.SolvePositionConstraints_s_C1), n = r - i - this.m_referenceAngle;
d = t.Length();
p = z(n);
const o = y.Solve33(t.x, t.y, n, ji.SolvePositionConstraints_s_impulse).SelfNeg(), m = ji.SolvePositionConstraints_s_P.Set(o.x, o.y);
e.SelfMulSub(a, m);
i -= h * (st.CrossVV(this.m_rA, m) + o.z);
s.SelfMulAdd(l, m);
r += c * (st.CrossVV(this.m_rB, m) + o.z);
}
t.positions[this.m_indexA].a = i;
t.positions[this.m_indexB].a = r;
return d <= m && p <= u;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * this.m_impulse.x;
e.y = t * this.m_impulse.y;
return e;
}
GetReactionTorque(t) {
return t * this.m_impulse.z;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
GetReferenceAngle() {
return this.m_referenceAngle;
}
SetFrequency(t) {
this.m_frequencyHz = t;
}
GetFrequency() {
return this.m_frequencyHz;
}
SetDampingRatio(t) {
this.m_dampingRatio = t;
}
GetDampingRatio() {
return this.m_dampingRatio;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2WeldJointDef = new b2WeldJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle);
t("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz);
t("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
ji.InitVelocityConstraints_s_P = new st();
ji.SolveVelocityConstraints_s_Cdot1 = new st();
ji.SolveVelocityConstraints_s_impulse1 = new st();
ji.SolveVelocityConstraints_s_impulse = new nt();
ji.SolveVelocityConstraints_s_P = new st();
ji.SolvePositionConstraints_s_C1 = new st();
ji.SolvePositionConstraints_s_P = new st();
ji.SolvePositionConstraints_s_impulse = new nt();
class qi extends Mi {
constructor(t) {
super(t);
this.m_frequencyHz = 0;
this.m_dampingRatio = 0;
this.m_localAnchorA = new st();
this.m_localAnchorB = new st();
this.m_localXAxisA = new st();
this.m_localYAxisA = new st();
this.m_impulse = 0;
this.m_motorImpulse = 0;
this.m_springImpulse = 0;
this.m_maxMotorTorque = 0;
this.m_motorSpeed = 0;
this.m_enableMotor = !1;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_localCenterA = new st();
this.m_localCenterB = new st();
this.m_invMassA = 0;
this.m_invMassB = 0;
this.m_invIA = 0;
this.m_invIB = 0;
this.m_ax = new st();
this.m_ay = new st();
this.m_sAx = 0;
this.m_sBx = 0;
this.m_sAy = 0;
this.m_sBy = 0;
this.m_mass = 0;
this.m_motorMass = 0;
this.m_springMass = 0;
this.m_bias = 0;
this.m_gamma = 0;
this.m_qA = new lt();
this.m_qB = new lt();
this.m_lalcA = new st();
this.m_lalcB = new st();
this.m_rA = new st();
this.m_rB = new st();
this.m_frequencyHz = i(t.frequencyHz, 2);
this.m_dampingRatio = i(t.dampingRatio, .7);
this.m_localAnchorA.Copy(i(t.localAnchorA, st.ZERO));
this.m_localAnchorB.Copy(i(t.localAnchorB, st.ZERO));
this.m_localXAxisA.Copy(i(t.localAxisA, st.UNITX));
st.CrossOneV(this.m_localXAxisA, this.m_localYAxisA);
this.m_maxMotorTorque = i(t.maxMotorTorque, 0);
this.m_motorSpeed = i(t.motorSpeed, 0);
this.m_enableMotor = i(t.enableMotor, !1);
this.m_ax.SetZero();
this.m_ay.SetZero();
}
GetMotorSpeed() {
return this.m_motorSpeed;
}
GetMaxMotorTorque() {
return this.m_maxMotorTorque;
}
SetSpringFrequencyHz(t) {
this.m_frequencyHz = t;
}
GetSpringFrequencyHz() {
return this.m_frequencyHz;
}
SetSpringDampingRatio(t) {
this.m_dampingRatio = t;
}
GetSpringDampingRatio() {
return this.m_dampingRatio;
}
InitVelocityConstraints(t) {
this.m_indexA = this.m_bodyA.m_islandIndex;
this.m_indexB = this.m_bodyB.m_islandIndex;
this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
this.m_invMassA = this.m_bodyA.m_invMass;
this.m_invMassB = this.m_bodyB.m_invMass;
this.m_invIA = this.m_bodyA.m_invI;
this.m_invIB = this.m_bodyB.m_invI;
const e = this.m_invMassA, i = this.m_invMassB, s = this.m_invIA, r = this.m_invIB, n = t.positions[this.m_indexA].c, a = t.positions[this.m_indexA].a, l = t.velocities[this.m_indexA].v;
let h = t.velocities[this.m_indexA].w;
const c = t.positions[this.m_indexB].c, m = t.positions[this.m_indexB].a, u = t.velocities[this.m_indexB].v;
let _ = t.velocities[this.m_indexB].w;
const f = this.m_qA.SetAngle(a), d = this.m_qB.SetAngle(m);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const p = lt.MulRV(f, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const y = lt.MulRV(d, this.m_lalcB, this.m_rB), b = st.SubVV(st.AddVV(c, y, st.s_t0), st.AddVV(n, p, st.s_t1), qi.InitVelocityConstraints_s_d);
lt.MulRV(f, this.m_localYAxisA, this.m_ay);
this.m_sAy = st.CrossVV(st.AddVV(b, p, st.s_t0), this.m_ay);
this.m_sBy = st.CrossVV(y, this.m_ay);
this.m_mass = e + i + s * this.m_sAy * this.m_sAy + r * this.m_sBy * this.m_sBy;
this.m_mass > 0 && (this.m_mass = 1 / this.m_mass);
this.m_springMass = 0;
this.m_bias = 0;
this.m_gamma = 0;
if (this.m_frequencyHz > 0) {
lt.MulRV(f, this.m_localXAxisA, this.m_ax);
this.m_sAx = st.CrossVV(st.AddVV(b, p, st.s_t0), this.m_ax);
this.m_sBx = st.CrossVV(y, this.m_ax);
const n = e + i + s * this.m_sAx * this.m_sAx + r * this.m_sBx * this.m_sBx;
if (n > 0) {
this.m_springMass = 1 / n;
const e = st.DotVV(b, this.m_ax), i = 2 * o * this.m_frequencyHz, s = 2 * this.m_springMass * this.m_dampingRatio * i, r = this.m_springMass * i * i, a = t.step.dt;
this.m_gamma = a * (s + a * r);
this.m_gamma > 0 && (this.m_gamma = 1 / this.m_gamma);
this.m_bias = e * a * r * this.m_gamma;
this.m_springMass = n + this.m_gamma;
this.m_springMass > 0 && (this.m_springMass = 1 / this.m_springMass);
}
} else this.m_springImpulse = 0;
if (this.m_enableMotor) {
this.m_motorMass = s + r;
this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass);
} else {
this.m_motorMass = 0;
this.m_motorImpulse = 0;
}
if (t.step.warmStarting) {
this.m_impulse *= t.step.dtRatio;
this.m_springImpulse *= t.step.dtRatio;
this.m_motorImpulse *= t.step.dtRatio;
const e = st.AddVV(st.MulSV(this.m_impulse, this.m_ay, st.s_t0), st.MulSV(this.m_springImpulse, this.m_ax, st.s_t1), qi.InitVelocityConstraints_s_P), i = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse, s = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
l.SelfMulSub(this.m_invMassA, e);
h -= this.m_invIA * i;
u.SelfMulAdd(this.m_invMassB, e);
_ += this.m_invIB * s;
} else {
this.m_impulse = 0;
this.m_springImpulse = 0;
this.m_motorImpulse = 0;
}
t.velocities[this.m_indexA].w = h;
t.velocities[this.m_indexB].w = _;
}
SolveVelocityConstraints(t) {
const e = this.m_invMassA, i = this.m_invMassB, s = this.m_invIA, r = this.m_invIB, n = t.velocities[this.m_indexA].v;
let o = t.velocities[this.m_indexA].w;
const a = t.velocities[this.m_indexB].v;
let l = t.velocities[this.m_indexB].w;
{
const t = st.DotVV(this.m_ax, st.SubVV(a, n, st.s_t0)) + this.m_sBx * l - this.m_sAx * o, h = -this.m_springMass * (t + this.m_bias + this.m_gamma * this.m_springImpulse);
this.m_springImpulse += h;
const c = st.MulSV(h, this.m_ax, qi.SolveVelocityConstraints_s_P), m = h * this.m_sAx, u = h * this.m_sBx;
n.SelfMulSub(e, c);
o -= s * m;
a.SelfMulAdd(i, c);
l += r * u;
}
{
const e = l - o - this.m_motorSpeed;
let i = -this.m_motorMass * e;
const n = this.m_motorImpulse, a = t.step.dt * this.m_maxMotorTorque;
this.m_motorImpulse = H(this.m_motorImpulse + i, -a, a);
o -= s * (i = this.m_motorImpulse - n);
l += r * i;
}
{
const t = st.DotVV(this.m_ay, st.SubVV(a, n, st.s_t0)) + this.m_sBy * l - this.m_sAy * o, h = -this.m_mass * t;
this.m_impulse += h;
const c = st.MulSV(h, this.m_ay, qi.SolveVelocityConstraints_s_P), m = h * this.m_sAy, u = h * this.m_sBy;
n.SelfMulSub(e, c);
o -= s * m;
a.SelfMulAdd(i, c);
l += r * u;
}
t.velocities[this.m_indexA].w = o;
t.velocities[this.m_indexB].w = l;
}
SolvePositionConstraints(t) {
const e = t.positions[this.m_indexA].c;
let i = t.positions[this.m_indexA].a;
const s = t.positions[this.m_indexB].c;
let r = t.positions[this.m_indexB].a;
const n = this.m_qA.SetAngle(i), o = this.m_qB.SetAngle(r);
st.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
const a = lt.MulRV(n, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
const l = lt.MulRV(o, this.m_lalcB, this.m_rB), h = st.AddVV(st.SubVV(s, e, st.s_t0), st.SubVV(l, a, st.s_t1), qi.SolvePositionConstraints_s_d), c = lt.MulRV(n, this.m_localYAxisA, this.m_ay), u = st.CrossVV(st.AddVV(h, a, st.s_t0), c), _ = st.CrossVV(l, c), f = st.DotVV(h, this.m_ay), d = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
let p;
p = 0 !== d ? -f / d : 0;
const y = st.MulSV(p, c, qi.SolvePositionConstraints_s_P), b = p * u, v = p * _;
e.SelfMulSub(this.m_invMassA, y);
i -= this.m_invIA * b;
s.SelfMulAdd(this.m_invMassB, y);
r += this.m_invIB * v;
t.positions[this.m_indexA].a = i;
t.positions[this.m_indexB].a = r;
return z(f) <= m;
}
GetDefinition(t) {
return t;
}
GetAnchorA(t) {
return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t);
}
GetAnchorB(t) {
return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t);
}
GetReactionForce(t, e) {
e.x = t * (this.m_impulse * this.m_ay.x + this.m_springImpulse * this.m_ax.x);
e.y = t * (this.m_impulse * this.m_ay.y + this.m_springImpulse * this.m_ax.y);
return e;
}
GetReactionTorque(t) {
return t * this.m_motorImpulse;
}
GetLocalAnchorA() {
return this.m_localAnchorA;
}
GetLocalAnchorB() {
return this.m_localAnchorB;
}
GetLocalAxisA() {
return this.m_localXAxisA;
}
GetJointTranslation() {
return this.GetPrismaticJointTranslation();
}
GetJointLinearSpeed() {
return this.GetPrismaticJointSpeed();
}
GetJointAngle() {
return this.GetRevoluteJointAngle();
}
GetJointAngularSpeed() {
return this.GetRevoluteJointSpeed();
}
GetPrismaticJointTranslation() {
const t = this.m_bodyA, e = this.m_bodyB, i = t.GetWorldPoint(this.m_localAnchorA, new st()), s = e.GetWorldPoint(this.m_localAnchorB, new st()), r = st.SubVV(s, i, new st()), n = t.GetWorldVector(this.m_localXAxisA, new st());
return st.DotVV(r, n);
}
GetPrismaticJointSpeed() {
const t = this.m_bodyA, e = this.m_bodyB;
st.SubVV(this.m_localAnchorA, t.m_sweep.localCenter, this.m_lalcA);
const i = lt.MulRV(t.m_xf.q, this.m_lalcA, this.m_rA);
st.SubVV(this.m_localAnchorB, e.m_sweep.localCenter, this.m_lalcB);
const s = lt.MulRV(e.m_xf.q, this.m_lalcB, this.m_rB), r = st.AddVV(t.m_sweep.c, i, st.s_t0), n = st.AddVV(e.m_sweep.c, s, st.s_t1), o = st.SubVV(n, r, st.s_t2), a = t.GetWorldVector(this.m_localXAxisA, new st()), l = t.m_linearVelocity, h = e.m_linearVelocity, c = t.m_angularVelocity, m = e.m_angularVelocity;
return st.DotVV(o, st.CrossSV(c, a, st.s_t0)) + st.DotVV(a, st.SubVV(st.AddVCrossSV(h, m, s, st.s_t0), st.AddVCrossSV(l, c, i, st.s_t1), st.s_t0));
}
GetRevoluteJointAngle() {
return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a;
}
GetRevoluteJointSpeed() {
const t = this.m_bodyA.m_angularVelocity;
return this.m_bodyB.m_angularVelocity - t;
}
IsMotorEnabled() {
return this.m_enableMotor;
}
EnableMotor(t) {
if (t !== this.m_enableMotor) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_enableMotor = t;
}
}
SetMotorSpeed(t) {
if (t !== this.m_motorSpeed) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_motorSpeed = t;
}
}
SetMaxMotorTorque(t) {
if (t !== this.m_maxMotorTorque) {
this.m_bodyA.SetAwake(!0);
this.m_bodyB.SetAwake(!0);
this.m_maxMotorTorque = t;
}
}
GetMotorTorque(t) {
return t * this.m_motorImpulse;
}
Dump(t) {
const e = this.m_bodyA.m_islandIndex, i = this.m_bodyB.m_islandIndex;
t("  const jd: b2WheelJointDef = new b2WheelJointDef();\n");
t("  jd.bodyA = bodies[%d];\n", e);
t("  jd.bodyB = bodies[%d];\n", i);
t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false");
t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
t("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y);
t("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false");
t("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed);
t("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque);
t("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz);
t("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio);
t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
}
}
qi.InitVelocityConstraints_s_d = new st();
qi.InitVelocityConstraints_s_P = new st();
qi.SolveVelocityConstraints_s_P = new st();
qi.SolvePositionConstraints_s_d = new st();
qi.SolvePositionConstraints_s_P = new st();
function Ni(t, e) {
return Z(t * e);
}
function zi(t, e) {
return t > e ? t : e;
}
class Ji {
constructor(t) {
this.prev = null;
this.next = null;
this.contact = t;
}
}
class Ui {
constructor() {
this.m_islandFlag = !1;
this.m_touchingFlag = !1;
this.m_enabledFlag = !1;
this.m_filterFlag = !1;
this.m_bulletHitFlag = !1;
this.m_toiFlag = !1;
this.m_prev = null;
this.m_next = null;
this.m_indexA = 0;
this.m_indexB = 0;
this.m_manifold = new jt();
this.m_toiCount = 0;
this.m_toi = 0;
this.m_friction = 0;
this.m_restitution = 0;
this.m_tangentSpeed = 0;
this.m_oldManifold = new jt();
this.m_nodeA = new Ji(this);
this.m_nodeB = new Ji(this);
}
GetManifold() {
return this.m_manifold;
}
GetWorldManifold(t) {
const e = this.m_fixtureA.GetBody(), i = this.m_fixtureB.GetBody(), s = this.m_fixtureA.GetShape(), r = this.m_fixtureB.GetShape();
t.Initialize(this.m_manifold, e.GetTransform(), s.m_radius, i.GetTransform(), r.m_radius);
}
IsTouching() {
return this.m_touchingFlag;
}
SetEnabled(t) {
this.m_enabledFlag = t;
}
IsEnabled() {
return this.m_enabledFlag;
}
GetNext() {
return this.m_next;
}
GetFixtureA() {
return this.m_fixtureA;
}
GetChildIndexA() {
return this.m_indexA;
}
GetFixtureB() {
return this.m_fixtureB;
}
GetChildIndexB() {
return this.m_indexB;
}
FlagForFiltering() {
this.m_filterFlag = !0;
}
SetFriction(t) {
this.m_friction = t;
}
GetFriction() {
return this.m_friction;
}
ResetFriction() {
this.m_friction = Ni(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
}
SetRestitution(t) {
this.m_restitution = t;
}
GetRestitution() {
return this.m_restitution;
}
ResetRestitution() {
this.m_restitution = zi(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
}
SetTangentSpeed(t) {
this.m_tangentSpeed = t;
}
GetTangentSpeed() {
return this.m_tangentSpeed;
}
Reset(t, e, i, s) {
this.m_islandFlag = !1;
this.m_touchingFlag = !1;
this.m_enabledFlag = !0;
this.m_filterFlag = !1;
this.m_bulletHitFlag = !1;
this.m_toiFlag = !1;
this.m_fixtureA = t;
this.m_fixtureB = i;
this.m_indexA = e;
this.m_indexB = s;
this.m_manifold.pointCount = 0;
this.m_prev = null;
this.m_next = null;
delete this.m_nodeA.contact;
this.m_nodeA.prev = null;
this.m_nodeA.next = null;
delete this.m_nodeA.other;
delete this.m_nodeB.contact;
this.m_nodeB.prev = null;
this.m_nodeB.next = null;
delete this.m_nodeB.other;
this.m_toiCount = 0;
this.m_friction = Ni(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
this.m_restitution = zi(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
}
Update(t) {
const e = this.m_oldManifold;
this.m_oldManifold = this.m_manifold;
this.m_manifold = e;
this.m_enabledFlag = !0;
let i = !1;
const s = this.m_touchingFlag, r = this.m_fixtureA.IsSensor(), n = this.m_fixtureB.IsSensor(), o = r || n, a = this.m_fixtureA.GetBody(), l = this.m_fixtureB.GetBody(), h = a.GetTransform(), c = l.GetTransform();
if (o) {
const t = this.m_fixtureA.GetShape(), e = this.m_fixtureB.GetShape();
i = $t(t, this.m_indexA, e, this.m_indexB, h, c);
this.m_manifold.pointCount = 0;
} else {
this.Evaluate(this.m_manifold, h, c);
i = this.m_manifold.pointCount > 0;
for (let t = 0; t < this.m_manifold.pointCount; ++t) {
const e = this.m_manifold.points[t];
e.normalImpulse = 0;
e.tangentImpulse = 0;
const i = e.id;
for (let t = 0; t < this.m_oldManifold.pointCount; ++t) {
const s = this.m_oldManifold.points[t];
if (s.id.key === i.key) {
e.normalImpulse = s.normalImpulse;
e.tangentImpulse = s.tangentImpulse;
break;
}
}
}
if (i !== s) {
a.SetAwake(!0);
l.SetAwake(!0);
}
}
this.m_touchingFlag = i;
!s && i && t && t.BeginContact(this);
s && !i && t && t.EndContact(this);
!o && i && t && t.PreSolve(this, this.m_oldManifold);
}
ComputeTOI(t, e) {
const i = Ui.ComputeTOI_s_input;
i.proxyA.SetShape(this.m_fixtureA.GetShape(), this.m_indexA);
i.proxyB.SetShape(this.m_fixtureB.GetShape(), this.m_indexB);
i.sweepA.Copy(t);
i.sweepB.Copy(e);
i.tMax = m;
const s = Ui.ComputeTOI_s_output;
Ae(s, i);
return s.t;
}
}
Ui.ComputeTOI_s_input = new me();
Ui.ComputeTOI_s_output = new ue();
class Hi extends Ui {
constructor() {
super();
}
static Create(t) {
return new Hi();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
Ce(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i);
}
}
class Wi extends Ui {
constructor() {
super();
}
static Create(t) {
return new Wi();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
ti(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i);
}
}
class Ki extends Ui {
constructor() {
super();
}
static Create(t) {
return new Ki();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
Ie(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i);
}
}
class Xi extends Ui {
constructor() {
super();
}
static Create(t) {
return new Xi();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
hi(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i);
}
}
class Zi extends Ui {
constructor() {
super();
}
static Create(t) {
return new Zi();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
fi(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i);
}
}
class $i extends Ui {
constructor() {
super();
}
static Create(t) {
return new $i();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
const s = this.m_fixtureA.GetShape(), r = this.m_fixtureB.GetShape(), n = s, o = $i.Evaluate_s_edge;
n.GetChildEdge(o, this.m_indexA);
hi(t, o, e, r, i);
}
}
$i.Evaluate_s_edge = new vi();
class Yi extends Ui {
constructor() {
super();
}
static Create(t) {
return new Yi();
}
static Destroy(t, e) {}
Reset(t, e, i, s) {
super.Reset(t, e, i, s);
}
Evaluate(t, e, i) {
const s = this.m_fixtureA.GetShape(), r = this.m_fixtureB.GetShape(), n = s, o = Yi.Evaluate_s_edge;
n.GetChildEdge(o, this.m_indexA);
fi(t, o, e, r, i);
}
}
Yi.Evaluate_s_edge = new vi();
class Qi {
constructor() {
this.createFcn = null;
this.destroyFcn = null;
this.primary = !1;
}
}
class ts {
constructor(t) {
this.m_allocator = null;
this.m_allocator = t;
this.InitializeRegisters();
}
AddType(t, e, i, s) {
const r = E(256, () => t(this.m_allocator));
function n(e) {
return r.pop() || t(e);
}
function o(t) {
r.push(t);
}
this.m_registers[i][s].createFcn = n;
this.m_registers[i][s].destroyFcn = o;
this.m_registers[i][s].primary = !0;
if (i !== s) {
this.m_registers[s][i].createFcn = n;
this.m_registers[s][i].destroyFcn = o;
this.m_registers[s][i].primary = !1;
}
}
InitializeRegisters() {
this.m_registers = [];
for (let t = 0; t < e.b2ShapeType.e_shapeTypeCount; t++) {
this.m_registers[t] = [];
for (let i = 0; i < e.b2ShapeType.e_shapeTypeCount; i++) this.m_registers[t][i] = new Qi();
}
this.AddType(Hi.Create, Hi.Destroy, e.b2ShapeType.e_circleShape, e.b2ShapeType.e_circleShape);
this.AddType(Ki.Create, Ki.Destroy, e.b2ShapeType.e_polygonShape, e.b2ShapeType.e_circleShape);
this.AddType(Wi.Create, Wi.Destroy, e.b2ShapeType.e_polygonShape, e.b2ShapeType.e_polygonShape);
this.AddType(Xi.Create, Xi.Destroy, e.b2ShapeType.e_edgeShape, e.b2ShapeType.e_circleShape);
this.AddType(Zi.Create, Zi.Destroy, e.b2ShapeType.e_edgeShape, e.b2ShapeType.e_polygonShape);
this.AddType($i.Create, $i.Destroy, e.b2ShapeType.e_chainShape, e.b2ShapeType.e_circleShape);
this.AddType(Yi.Create, Yi.Destroy, e.b2ShapeType.e_chainShape, e.b2ShapeType.e_polygonShape);
}
Create(t, e, i, s) {
const r = t.GetType(), n = i.GetType(), o = this.m_registers[r][n];
if (o.createFcn) {
const r = o.createFcn(this.m_allocator);
o.primary ? r.Reset(t, e, i, s) : r.Reset(i, s, t, e);
return r;
}
return null;
}
Destroy(t) {
const e = t.m_fixtureA, i = t.m_fixtureB;
if (t.m_manifold.pointCount > 0 && !e.IsSensor() && !i.IsSensor()) {
e.GetBody().SetAwake(!0);
i.GetBody().SetAwake(!0);
}
const s = e.GetType(), r = i.GetType(), n = this.m_registers[s][r];
n.destroyFcn && n.destroyFcn(t, this.m_allocator);
}
}
class es {
ShouldCollide(t, i) {
const s = t.GetBody(), r = i.GetBody();
if (r.GetType() === e.b2BodyType.b2_staticBody && s.GetType() === e.b2BodyType.b2_staticBody) return !1;
if (!r.ShouldCollideConnected(s)) return !1;
const n = t.GetFilterData(), o = i.GetFilterData();
return n.groupIndex === o.groupIndex && 0 !== n.groupIndex ? n.groupIndex > 0 : 0 != (n.maskBits & o.categoryBits) && 0 != (n.categoryBits & o.maskBits);
}
ShouldCollideFixtureParticle(t, e, i) {
return !0;
}
ShouldCollideParticleParticle(t, e, i) {
return !0;
}
}
es.b2_defaultFilter = new es();
class is {
constructor() {
this.normalImpulses = O(a);
this.tangentImpulses = O(a);
this.count = 0;
}
}
class ss {
BeginContact(t) {}
EndContact(t) {}
BeginContactFixtureParticle(t, e) {}
EndContactFixtureParticle(t, e) {}
BeginContactParticleParticle(t, e) {}
EndContactParticleParticle(t, e) {}
PreSolve(t, e) {}
PostSolve(t, e) {}
}
ss.b2_defaultListener = new ss();
class rs {
ReportFixture(t) {
return !0;
}
ReportParticle(t, e) {
return !1;
}
ShouldQueryParticleSystem(t) {
return !0;
}
}
class ns {
constructor() {
this.m_broadPhase = new ie();
this.m_contactList = null;
this.m_contactCount = 0;
this.m_contactFilter = es.b2_defaultFilter;
this.m_contactListener = ss.b2_defaultListener;
this.m_allocator = null;
this.m_contactFactory = new ts(this.m_allocator);
}
AddPair(t, e) {
let i = t.fixture, s = e.fixture, r = t.childIndex, n = e.childIndex, o = i.GetBody(), a = s.GetBody();
if (o === a) return;
let l = a.GetContactList();
for (;l; ) {
if (l.other === o) {
const t = l.contact.GetFixtureA(), e = l.contact.GetFixtureB(), o = l.contact.GetChildIndexA(), a = l.contact.GetChildIndexB();
if (t === i && e === s && o === r && a === n) return;
if (t === s && e === i && o === n && a === r) return;
}
l = l.next;
}
if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(i, s)) return;
const h = this.m_contactFactory.Create(i, r, s, n);
if (null !== h) {
i = h.GetFixtureA();
s = h.GetFixtureB();
r = h.GetChildIndexA();
n = h.GetChildIndexB();
o = i.m_body;
a = s.m_body;
h.m_prev = null;
h.m_next = this.m_contactList;
null !== this.m_contactList && (this.m_contactList.m_prev = h);
this.m_contactList = h;
h.m_nodeA.contact = h;
h.m_nodeA.other = a;
h.m_nodeA.prev = null;
h.m_nodeA.next = o.m_contactList;
null !== o.m_contactList && (o.m_contactList.prev = h.m_nodeA);
o.m_contactList = h.m_nodeA;
h.m_nodeB.contact = h;
h.m_nodeB.other = o;
h.m_nodeB.prev = null;
h.m_nodeB.next = a.m_contactList;
null !== a.m_contactList && (a.m_contactList.prev = h.m_nodeB);
a.m_contactList = h.m_nodeB;
if (!i.IsSensor() && !s.IsSensor()) {
o.SetAwake(!0);
a.SetAwake(!0);
}
++this.m_contactCount;
}
}
FindNewContacts() {
this.m_broadPhase.UpdatePairs((t, e) => {
this.AddPair(t, e);
});
}
Destroy(t) {
const e = t.GetFixtureA(), i = t.GetFixtureB(), s = e.GetBody(), r = i.GetBody();
this.m_contactListener && t.IsTouching() && this.m_contactListener.EndContact(t);
t.m_prev && (t.m_prev.m_next = t.m_next);
t.m_next && (t.m_next.m_prev = t.m_prev);
t === this.m_contactList && (this.m_contactList = t.m_next);
t.m_nodeA.prev && (t.m_nodeA.prev.next = t.m_nodeA.next);
t.m_nodeA.next && (t.m_nodeA.next.prev = t.m_nodeA.prev);
t.m_nodeA === s.m_contactList && (s.m_contactList = t.m_nodeA.next);
t.m_nodeB.prev && (t.m_nodeB.prev.next = t.m_nodeB.next);
t.m_nodeB.next && (t.m_nodeB.next.prev = t.m_nodeB.prev);
t.m_nodeB === r.m_contactList && (r.m_contactList = t.m_nodeB.next);
this.m_contactFactory.Destroy(t);
--this.m_contactCount;
}
Collide() {
let t = this.m_contactList;
for (;t; ) {
const i = t.GetFixtureA(), s = t.GetFixtureB(), r = t.GetChildIndexA(), n = t.GetChildIndexB(), o = i.GetBody(), a = s.GetBody();
if (t.m_filterFlag) {
if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(i, s)) {
const e = t;
t = e.m_next;
this.Destroy(e);
continue;
}
t.m_filterFlag = !1;
}
const l = o.IsAwake() && o.m_type !== e.b2BodyType.b2_staticBody, h = a.IsAwake() && a.m_type !== e.b2BodyType.b2_staticBody;
if (!l && !h) {
t = t.m_next;
continue;
}
const c = i.m_proxies[r].treeNode, m = s.m_proxies[n].treeNode;
if (Ht(c.aabb, m.aabb)) {
t.Update(this.m_contactListener);
t = t.m_next;
} else {
const e = t;
t = e.m_next;
this.Destroy(e);
}
}
}
}
class os {
constructor() {
this.step = 0;
this.collide = 0;
this.solve = 0;
this.solveInit = 0;
this.solveVelocity = 0;
this.solvePosition = 0;
this.broadphase = 0;
this.solveTOI = 0;
}
Reset() {
this.step = 0;
this.collide = 0;
this.solve = 0;
this.solveInit = 0;
this.solveVelocity = 0;
this.solvePosition = 0;
this.broadphase = 0;
this.solveTOI = 0;
return this;
}
}
class as {
constructor() {
this.dt = 0;
this.inv_dt = 0;
this.dtRatio = 0;
this.velocityIterations = 0;
this.positionIterations = 0;
this.particleIterations = 0;
this.warmStarting = !1;
}
Copy(t) {
this.dt = t.dt;
this.inv_dt = t.inv_dt;
this.dtRatio = t.dtRatio;
this.positionIterations = t.positionIterations;
this.velocityIterations = t.velocityIterations;
this.particleIterations = t.particleIterations;
this.warmStarting = t.warmStarting;
return this;
}
}
class ls {
constructor() {
this.c = new st();
this.a = 0;
}
static MakeArray(t) {
return E(t, () => new ls());
}
}
class hs {
constructor() {
this.v = new st();
this.w = 0;
}
static MakeArray(t) {
return E(t, () => new hs());
}
}
class cs {
constructor() {
this.step = new as();
}
}
let ms = !1;
class us {
constructor() {
this.rA = new st();
this.rB = new st();
this.normalImpulse = 0;
this.tangentImpulse = 0;
this.normalMass = 0;
this.tangentMass = 0;
this.velocityBias = 0;
}
static MakeArray(t) {
return E(t, () => new us());
}
}
class _s {
constructor() {
this.points = us.MakeArray(a);
this.normal = new st();
this.tangent = new st();
this.normalMass = new ot();
this.K = new ot();
this.indexA = 0;
this.indexB = 0;
this.invMassA = 0;
this.invMassB = 0;
this.invIA = 0;
this.invIB = 0;
this.friction = 0;
this.restitution = 0;
this.tangentSpeed = 0;
this.pointCount = 0;
this.contactIndex = 0;
}
static MakeArray(t) {
return E(t, () => new _s());
}
}
class fs {
constructor() {
this.localPoints = st.MakeArray(a);
this.localNormal = new st();
this.localPoint = new st();
this.indexA = 0;
this.indexB = 0;
this.invMassA = 0;
this.invMassB = 0;
this.localCenterA = new st();
this.localCenterB = new st();
this.invIA = 0;
this.invIB = 0;
this.type = e.b2ManifoldType.e_unknown;
this.radiusA = 0;
this.radiusB = 0;
this.pointCount = 0;
}
static MakeArray(t) {
return E(t, () => new fs());
}
}
class ds {
constructor() {
this.step = new as();
this.count = 0;
this.allocator = null;
}
}
class ps {
constructor() {
this.normal = new st();
this.point = new st();
this.separation = 0;
}
Initialize(t, i, s, r) {
const n = ps.Initialize_s_pointA, o = ps.Initialize_s_pointB, a = ps.Initialize_s_planePoint, l = ps.Initialize_s_clipPoint;
switch (t.type) {
case e.b2ManifoldType.e_circles:
ht.MulXV(i, t.localPoint, n);
ht.MulXV(s, t.localPoints[0], o);
st.SubVV(o, n, this.normal).SelfNormalize();
st.MidVV(n, o, this.point);
this.separation = st.DotVV(st.SubVV(o, n, st.s_t0), this.normal) - t.radiusA - t.radiusB;
break;

case e.b2ManifoldType.e_faceA:
lt.MulRV(i.q, t.localNormal, this.normal);
ht.MulXV(i, t.localPoint, a);
ht.MulXV(s, t.localPoints[r], l);
this.separation = st.DotVV(st.SubVV(l, a, st.s_t0), this.normal) - t.radiusA - t.radiusB;
this.point.Copy(l);
break;

case e.b2ManifoldType.e_faceB:
lt.MulRV(s.q, t.localNormal, this.normal);
ht.MulXV(s, t.localPoint, a);
ht.MulXV(i, t.localPoints[r], l);
this.separation = st.DotVV(st.SubVV(l, a, st.s_t0), this.normal) - t.radiusA - t.radiusB;
this.point.Copy(l);
this.normal.SelfNeg();
}
}
}
ps.Initialize_s_pointA = new st();
ps.Initialize_s_pointB = new st();
ps.Initialize_s_planePoint = new st();
ps.Initialize_s_clipPoint = new st();
class ys {
constructor() {
this.m_step = new as();
this.m_allocator = null;
this.m_positionConstraints = fs.MakeArray(1024);
this.m_velocityConstraints = _s.MakeArray(1024);
this.m_count = 0;
}
Initialize(t) {
this.m_step.Copy(t.step);
this.m_allocator = t.allocator;
this.m_count = t.count;
if (this.m_positionConstraints.length < this.m_count) {
const t = U(2 * this.m_positionConstraints.length, this.m_count);
for (;this.m_positionConstraints.length < t; ) this.m_positionConstraints[this.m_positionConstraints.length] = new fs();
}
if (this.m_velocityConstraints.length < this.m_count) {
const t = U(2 * this.m_velocityConstraints.length, this.m_count);
for (;this.m_velocityConstraints.length < t; ) this.m_velocityConstraints[this.m_velocityConstraints.length] = new _s();
}
this.m_positions = t.positions;
this.m_velocities = t.velocities;
this.m_contacts = t.contacts;
for (let t = 0; t < this.m_count; ++t) {
const e = this.m_contacts[t], i = e.m_fixtureA, s = e.m_fixtureB, r = i.GetShape(), n = s.GetShape(), o = r.m_radius, a = n.m_radius, l = i.GetBody(), h = s.GetBody(), c = e.GetManifold(), m = c.pointCount, u = this.m_velocityConstraints[t];
u.friction = e.m_friction;
u.restitution = e.m_restitution;
u.tangentSpeed = e.m_tangentSpeed;
u.indexA = l.m_islandIndex;
u.indexB = h.m_islandIndex;
u.invMassA = l.m_invMass;
u.invMassB = h.m_invMass;
u.invIA = l.m_invI;
u.invIB = h.m_invI;
u.contactIndex = t;
u.pointCount = m;
u.K.SetZero();
u.normalMass.SetZero();
const _ = this.m_positionConstraints[t];
_.indexA = l.m_islandIndex;
_.indexB = h.m_islandIndex;
_.invMassA = l.m_invMass;
_.invMassB = h.m_invMass;
_.localCenterA.Copy(l.m_sweep.localCenter);
_.localCenterB.Copy(h.m_sweep.localCenter);
_.invIA = l.m_invI;
_.invIB = h.m_invI;
_.localNormal.Copy(c.localNormal);
_.localPoint.Copy(c.localPoint);
_.pointCount = m;
_.radiusA = o;
_.radiusB = a;
_.type = c.type;
for (let t = 0; t < m; ++t) {
const e = c.points[t], i = u.points[t];
if (this.m_step.warmStarting) {
i.normalImpulse = this.m_step.dtRatio * e.normalImpulse;
i.tangentImpulse = this.m_step.dtRatio * e.tangentImpulse;
} else {
i.normalImpulse = 0;
i.tangentImpulse = 0;
}
i.rA.SetZero();
i.rB.SetZero();
i.normalMass = 0;
i.tangentMass = 0;
i.velocityBias = 0;
_.localPoints[t].Copy(e.localPoint);
}
}
return this;
}
InitializeVelocityConstraints() {
const t = ys.InitializeVelocityConstraints_s_xfA, e = ys.InitializeVelocityConstraints_s_xfB, i = ys.InitializeVelocityConstraints_s_worldManifold;
for (let s = 0; s < this.m_count; ++s) {
const r = this.m_velocityConstraints[s], n = this.m_positionConstraints[s], o = n.radiusA, a = n.radiusB, l = this.m_contacts[r.contactIndex].GetManifold(), h = r.indexA, c = r.indexB, m = r.invMassA, u = r.invMassB, _ = r.invIA, f = r.invIB, d = n.localCenterA, y = n.localCenterB, b = this.m_positions[h].c, v = this.m_positions[h].a, g = this.m_velocities[h].v, S = this.m_velocities[h].w, x = this.m_positions[c].c, A = this.m_positions[c].a, B = this.m_velocities[c].v, w = this.m_velocities[c].w;
t.q.SetAngle(v);
e.q.SetAngle(A);
st.SubVV(b, lt.MulRV(t.q, d, st.s_t0), t.p);
st.SubVV(x, lt.MulRV(e.q, y, st.s_t0), e.p);
i.Initialize(l, t, o, e, a);
r.normal.Copy(i.normal);
st.CrossVOne(r.normal, r.tangent);
const C = r.pointCount;
for (let t = 0; t < C; ++t) {
const e = r.points[t];
st.SubVV(i.points[t], b, e.rA);
st.SubVV(i.points[t], x, e.rB);
const s = st.CrossVV(e.rA, r.normal), n = st.CrossVV(e.rB, r.normal), o = m + u + _ * s * s + f * n * n;
e.normalMass = o > 0 ? 1 / o : 0;
const a = r.tangent, l = st.CrossVV(e.rA, a), h = st.CrossVV(e.rB, a), c = m + u + _ * l * l + f * h * h;
e.tangentMass = c > 0 ? 1 / c : 0;
e.velocityBias = 0;
const d = st.DotVV(r.normal, st.SubVV(st.AddVCrossSV(B, w, e.rB, st.s_t0), st.AddVCrossSV(g, S, e.rA, st.s_t1), st.s_t0));
d < -p && (e.velocityBias += -r.restitution * d);
}
if (2 === r.pointCount && ms) {
const t = r.points[0], e = r.points[1], i = st.CrossVV(t.rA, r.normal), s = st.CrossVV(t.rB, r.normal), n = st.CrossVV(e.rA, r.normal), o = st.CrossVV(e.rB, r.normal), a = m + u + _ * i * i + f * s * s, l = m + u + _ * n * n + f * o * o, h = m + u + _ * i * n + f * s * o;
if (a * a < 1e3 * (a * l - h * h)) {
r.K.ex.Set(a, h);
r.K.ey.Set(h, l);
r.K.GetInverse(r.normalMass);
} else r.pointCount = 1;
}
}
}
WarmStart() {
const t = ys.WarmStart_s_P;
for (let e = 0; e < this.m_count; ++e) {
const i = this.m_velocityConstraints[e], s = i.indexA, r = i.indexB, n = i.invMassA, o = i.invIA, a = i.invMassB, l = i.invIB, h = i.pointCount, c = this.m_velocities[s].v;
let m = this.m_velocities[s].w;
const u = this.m_velocities[r].v;
let _ = this.m_velocities[r].w;
const f = i.normal, d = i.tangent;
for (let e = 0; e < h; ++e) {
const s = i.points[e];
st.AddVV(st.MulSV(s.normalImpulse, f, st.s_t0), st.MulSV(s.tangentImpulse, d, st.s_t1), t);
m -= o * st.CrossVV(s.rA, t);
c.SelfMulSub(n, t);
_ += l * st.CrossVV(s.rB, t);
u.SelfMulAdd(a, t);
}
this.m_velocities[s].w = m;
this.m_velocities[r].w = _;
}
}
SolveVelocityConstraints() {
const t = ys.SolveVelocityConstraints_s_dv, e = ys.SolveVelocityConstraints_s_dv1, i = ys.SolveVelocityConstraints_s_dv2, s = ys.SolveVelocityConstraints_s_P, r = ys.SolveVelocityConstraints_s_a, n = ys.SolveVelocityConstraints_s_b, o = ys.SolveVelocityConstraints_s_x, a = ys.SolveVelocityConstraints_s_d, l = ys.SolveVelocityConstraints_s_P1, h = ys.SolveVelocityConstraints_s_P2, c = ys.SolveVelocityConstraints_s_P1P2;
for (let m = 0; m < this.m_count; ++m) {
const u = this.m_velocityConstraints[m], _ = u.indexA, f = u.indexB, d = u.invMassA, p = u.invIA, y = u.invMassB, b = u.invIB, v = u.pointCount, g = this.m_velocities[_].v;
let S = this.m_velocities[_].w;
const x = this.m_velocities[f].v;
let A = this.m_velocities[f].w;
const B = u.normal, w = u.tangent, C = u.friction;
for (let e = 0; e < v; ++e) {
const i = u.points[e];
st.SubVV(st.AddVCrossSV(x, A, i.rB, st.s_t0), st.AddVCrossSV(g, S, i.rA, st.s_t1), t);
const r = st.DotVV(t, w) - u.tangentSpeed;
let n = i.tangentMass * -r;
const o = C * i.normalImpulse, a = H(i.tangentImpulse + n, -o, o);
n = a - i.tangentImpulse;
i.tangentImpulse = a;
st.MulSV(n, w, s);
g.SelfMulSub(d, s);
S -= p * st.CrossVV(i.rA, s);
x.SelfMulAdd(y, s);
A += b * st.CrossVV(i.rB, s);
}
if (1 === u.pointCount || !1 === ms) for (let e = 0; e < v; ++e) {
const i = u.points[e];
st.SubVV(st.AddVCrossSV(x, A, i.rB, st.s_t0), st.AddVCrossSV(g, S, i.rA, st.s_t1), t);
const r = st.DotVV(t, B);
let n = -i.normalMass * (r - i.velocityBias);
const o = U(i.normalImpulse + n, 0);
n = o - i.normalImpulse;
i.normalImpulse = o;
st.MulSV(n, B, s);
g.SelfMulSub(d, s);
S -= p * st.CrossVV(i.rA, s);
x.SelfMulAdd(y, s);
A += b * st.CrossVV(i.rB, s);
} else {
const t = u.points[0], s = u.points[1];
r.Set(t.normalImpulse, s.normalImpulse);
st.SubVV(st.AddVCrossSV(x, A, t.rB, st.s_t0), st.AddVCrossSV(g, S, t.rA, st.s_t1), e);
st.SubVV(st.AddVCrossSV(x, A, s.rB, st.s_t0), st.AddVCrossSV(g, S, s.rA, st.s_t1), i);
let m = st.DotVV(e, B), _ = st.DotVV(i, B);
n.x = m - t.velocityBias;
n.y = _ - s.velocityBias;
n.SelfSub(ot.MulMV(u.K, r, st.s_t0));
for (;;) {
ot.MulMV(u.normalMass, n, o).SelfNeg();
if (o.x >= 0 && o.y >= 0) {
st.SubVV(o, r, a);
st.MulSV(a.x, B, l);
st.MulSV(a.y, B, h);
st.AddVV(l, h, c);
g.SelfMulSub(d, c);
S -= p * (st.CrossVV(t.rA, l) + st.CrossVV(s.rA, h));
x.SelfMulAdd(y, c);
A += b * (st.CrossVV(t.rB, l) + st.CrossVV(s.rB, h));
t.normalImpulse = o.x;
s.normalImpulse = o.y;
break;
}
o.x = -t.normalMass * n.x;
o.y = 0;
m = 0;
_ = u.K.ex.y * o.x + n.y;
if (o.x >= 0 && _ >= 0) {
st.SubVV(o, r, a);
st.MulSV(a.x, B, l);
st.MulSV(a.y, B, h);
st.AddVV(l, h, c);
g.SelfMulSub(d, c);
S -= p * (st.CrossVV(t.rA, l) + st.CrossVV(s.rA, h));
x.SelfMulAdd(y, c);
A += b * (st.CrossVV(t.rB, l) + st.CrossVV(s.rB, h));
t.normalImpulse = o.x;
s.normalImpulse = o.y;
break;
}
o.x = 0;
o.y = -s.normalMass * n.y;
m = u.K.ey.x * o.y + n.x;
_ = 0;
if (o.y >= 0 && m >= 0) {
st.SubVV(o, r, a);
st.MulSV(a.x, B, l);
st.MulSV(a.y, B, h);
st.AddVV(l, h, c);
g.SelfMulSub(d, c);
S -= p * (st.CrossVV(t.rA, l) + st.CrossVV(s.rA, h));
x.SelfMulAdd(y, c);
A += b * (st.CrossVV(t.rB, l) + st.CrossVV(s.rB, h));
t.normalImpulse = o.x;
s.normalImpulse = o.y;
break;
}
o.x = 0;
o.y = 0;
m = n.x;
_ = n.y;
if (m >= 0 && _ >= 0) {
st.SubVV(o, r, a);
st.MulSV(a.x, B, l);
st.MulSV(a.y, B, h);
st.AddVV(l, h, c);
g.SelfMulSub(d, c);
S -= p * (st.CrossVV(t.rA, l) + st.CrossVV(s.rA, h));
x.SelfMulAdd(y, c);
A += b * (st.CrossVV(t.rB, l) + st.CrossVV(s.rB, h));
t.normalImpulse = o.x;
s.normalImpulse = o.y;
break;
}
break;
}
}
this.m_velocities[_].w = S;
this.m_velocities[f].w = A;
}
}
StoreImpulses() {
for (let t = 0; t < this.m_count; ++t) {
const e = this.m_velocityConstraints[t], i = this.m_contacts[e.contactIndex].GetManifold();
for (let t = 0; t < e.pointCount; ++t) {
i.points[t].normalImpulse = e.points[t].normalImpulse;
i.points[t].tangentImpulse = e.points[t].tangentImpulse;
}
}
}
SolvePositionConstraints() {
const t = ys.SolvePositionConstraints_s_xfA, e = ys.SolvePositionConstraints_s_xfB, i = ys.SolvePositionConstraints_s_psm, s = ys.SolvePositionConstraints_s_rA, r = ys.SolvePositionConstraints_s_rB, n = ys.SolvePositionConstraints_s_P;
let o = 0;
for (let a = 0; a < this.m_count; ++a) {
const l = this.m_positionConstraints[a], h = l.indexA, c = l.indexB, u = l.localCenterA, _ = l.invMassA, f = l.invIA, d = l.localCenterB, p = l.invMassB, b = l.invIB, v = l.pointCount, g = this.m_positions[h].c;
let S = this.m_positions[h].a;
const x = this.m_positions[c].c;
let B = this.m_positions[c].a;
for (let a = 0; a < v; ++a) {
t.q.SetAngle(S);
e.q.SetAngle(B);
st.SubVV(g, lt.MulRV(t.q, u, st.s_t0), t.p);
st.SubVV(x, lt.MulRV(e.q, d, st.s_t0), e.p);
i.Initialize(l, t, e, a);
const h = i.normal, c = i.point, v = i.separation;
st.SubVV(c, g, s);
st.SubVV(c, x, r);
o = J(o, v);
const w = H(A * (v + m), -y, 0), C = st.CrossVV(s, h), V = st.CrossVV(r, h), M = _ + p + f * C * C + b * V * V, P = M > 0 ? -w / M : 0;
st.MulSV(P, h, n);
g.SelfMulSub(_, n);
S -= f * st.CrossVV(s, n);
x.SelfMulAdd(p, n);
B += b * st.CrossVV(r, n);
}
this.m_positions[h].a = S;
this.m_positions[c].a = B;
}
return o > -3 * m;
}
SolveTOIPositionConstraints(t, e) {
const i = ys.SolveTOIPositionConstraints_s_xfA, s = ys.SolveTOIPositionConstraints_s_xfB, r = ys.SolveTOIPositionConstraints_s_psm, n = ys.SolveTOIPositionConstraints_s_rA, o = ys.SolveTOIPositionConstraints_s_rB, a = ys.SolveTOIPositionConstraints_s_P;
let l = 0;
for (let h = 0; h < this.m_count; ++h) {
const c = this.m_positionConstraints[h], u = c.indexA, _ = c.indexB, f = c.localCenterA, d = c.localCenterB, p = c.pointCount;
let b = 0, v = 0;
if (u === t || u === e) {
b = c.invMassA;
v = c.invIA;
}
let g = 0, S = 0;
if (_ === t || _ === e) {
g = c.invMassB;
S = c.invIB;
}
const x = this.m_positions[u].c;
let A = this.m_positions[u].a;
const w = this.m_positions[_].c;
let C = this.m_positions[_].a;
for (let t = 0; t < p; ++t) {
i.q.SetAngle(A);
s.q.SetAngle(C);
st.SubVV(x, lt.MulRV(i.q, f, st.s_t0), i.p);
st.SubVV(w, lt.MulRV(s.q, d, st.s_t0), s.p);
r.Initialize(c, i, s, t);
const e = r.normal, h = r.point, u = r.separation;
st.SubVV(h, x, n);
st.SubVV(h, w, o);
l = J(l, u);
const _ = H(B * (u + m), -y, 0), p = st.CrossVV(n, e), V = st.CrossVV(o, e), M = b + g + v * p * p + S * V * V, P = M > 0 ? -_ / M : 0;
st.MulSV(P, e, a);
x.SelfMulSub(b, a);
A -= v * st.CrossVV(n, a);
w.SelfMulAdd(g, a);
C += S * st.CrossVV(o, a);
}
this.m_positions[u].a = A;
this.m_positions[_].a = C;
}
return l >= -1.5 * m;
}
}
ys.InitializeVelocityConstraints_s_xfA = new ht();
ys.InitializeVelocityConstraints_s_xfB = new ht();
ys.InitializeVelocityConstraints_s_worldManifold = new qt();
ys.WarmStart_s_P = new st();
ys.SolveVelocityConstraints_s_dv = new st();
ys.SolveVelocityConstraints_s_dv1 = new st();
ys.SolveVelocityConstraints_s_dv2 = new st();
ys.SolveVelocityConstraints_s_P = new st();
ys.SolveVelocityConstraints_s_a = new st();
ys.SolveVelocityConstraints_s_b = new st();
ys.SolveVelocityConstraints_s_x = new st();
ys.SolveVelocityConstraints_s_d = new st();
ys.SolveVelocityConstraints_s_P1 = new st();
ys.SolveVelocityConstraints_s_P2 = new st();
ys.SolveVelocityConstraints_s_P1P2 = new st();
ys.SolvePositionConstraints_s_xfA = new ht();
ys.SolvePositionConstraints_s_xfB = new ht();
ys.SolvePositionConstraints_s_psm = new ps();
ys.SolvePositionConstraints_s_rA = new st();
ys.SolvePositionConstraints_s_rB = new st();
ys.SolvePositionConstraints_s_P = new st();
ys.SolveTOIPositionConstraints_s_xfA = new ht();
ys.SolveTOIPositionConstraints_s_xfB = new ht();
ys.SolveTOIPositionConstraints_s_psm = new ps();
ys.SolveTOIPositionConstraints_s_rA = new st();
ys.SolveTOIPositionConstraints_s_rB = new st();
ys.SolveTOIPositionConstraints_s_P = new st();
class bs {
constructor() {
this.m_allocator = null;
this.m_bodies = [];
this.m_contacts = [];
this.m_joints = [];
this.m_positions = ls.MakeArray(1024);
this.m_velocities = hs.MakeArray(1024);
this.m_bodyCount = 0;
this.m_jointCount = 0;
this.m_contactCount = 0;
this.m_bodyCapacity = 0;
this.m_contactCapacity = 0;
this.m_jointCapacity = 0;
}
Initialize(t, e, i, s, r) {
this.m_bodyCapacity = t;
this.m_contactCapacity = e;
this.m_jointCapacity = i;
this.m_bodyCount = 0;
this.m_contactCount = 0;
this.m_jointCount = 0;
this.m_allocator = s;
this.m_listener = r;
if (this.m_positions.length < t) {
const e = U(2 * this.m_positions.length, t);
for (;this.m_positions.length < e; ) this.m_positions[this.m_positions.length] = new ls();
}
if (this.m_velocities.length < t) {
const e = U(2 * this.m_velocities.length, t);
for (;this.m_velocities.length < e; ) this.m_velocities[this.m_velocities.length] = new hs();
}
}
Clear() {
this.m_bodyCount = 0;
this.m_contactCount = 0;
this.m_jointCount = 0;
}
AddBody(t) {
t.m_islandIndex = this.m_bodyCount;
this.m_bodies[this.m_bodyCount++] = t;
}
AddContact(t) {
this.m_contacts[this.m_contactCount++] = t;
}
AddJoint(t) {
this.m_joints[this.m_jointCount++] = t;
}
Solve(t, i, r, n) {
const o = bs.s_timer.Reset(), a = i.dt;
for (let t = 0; t < this.m_bodyCount; ++t) {
const i = this.m_bodies[t];
this.m_positions[t].c.Copy(i.m_sweep.c);
const s = i.m_sweep.a, n = this.m_velocities[t].v.Copy(i.m_linearVelocity);
let o = i.m_angularVelocity;
i.m_sweep.c0.Copy(i.m_sweep.c);
i.m_sweep.a0 = i.m_sweep.a;
if (i.m_type === e.b2BodyType.b2_dynamicBody) {
n.x += a * (i.m_gravityScale * r.x + i.m_invMass * i.m_force.x);
n.y += a * (i.m_gravityScale * r.y + i.m_invMass * i.m_force.y);
o += a * i.m_invI * i.m_torque;
n.SelfMul(1 / (1 + a * i.m_linearDamping));
o *= 1 / (1 + a * i.m_angularDamping);
}
this.m_positions[t].a = s;
this.m_velocities[t].w = o;
}
o.Reset();
const l = bs.s_solverData;
l.step.Copy(i);
l.positions = this.m_positions;
l.velocities = this.m_velocities;
const h = bs.s_contactSolverDef;
h.step.Copy(i);
h.contacts = this.m_contacts;
h.count = this.m_contactCount;
h.positions = this.m_positions;
h.velocities = this.m_velocities;
h.allocator = this.m_allocator;
const c = bs.s_contactSolver.Initialize(h);
c.InitializeVelocityConstraints();
i.warmStarting && c.WarmStart();
for (let t = 0; t < this.m_jointCount; ++t) this.m_joints[t].InitVelocityConstraints(l);
t.solveInit = o.GetMilliseconds();
o.Reset();
for (let t = 0; t < i.velocityIterations; ++t) {
for (let t = 0; t < this.m_jointCount; ++t) this.m_joints[t].SolveVelocityConstraints(l);
c.SolveVelocityConstraints();
}
c.StoreImpulses();
t.solveVelocity = o.GetMilliseconds();
for (let t = 0; t < this.m_bodyCount; ++t) {
const e = this.m_positions[t].c;
let i = this.m_positions[t].a;
const s = this.m_velocities[t].v;
let r = this.m_velocities[t].w;
const n = st.MulSV(a, s, bs.s_translation);
if (st.DotVV(n, n) > g) {
const t = v / n.Length();
s.SelfMul(t);
}
const o = a * r;
o * o > x && (r *= S / z(o));
e.x += a * s.x;
e.y += a * s.y;
i += a * r;
this.m_positions[t].a = i;
this.m_velocities[t].w = r;
}
o.Reset();
let m = !1;
for (let t = 0; t < i.positionIterations; ++t) {
const t = c.SolvePositionConstraints();
let e = !0;
for (let t = 0; t < this.m_jointCount; ++t) {
const i = this.m_joints[t].SolvePositionConstraints(l);
e = e && i;
}
if (t && e) {
m = !0;
break;
}
}
for (let t = 0; t < this.m_bodyCount; ++t) {
const e = this.m_bodies[t];
e.m_sweep.c.Copy(this.m_positions[t].c);
e.m_sweep.a = this.m_positions[t].a;
e.m_linearVelocity.Copy(this.m_velocities[t].v);
e.m_angularVelocity = this.m_velocities[t].w;
e.SynchronizeTransform();
}
t.solvePosition = o.GetMilliseconds();
this.Report(c.m_velocityConstraints);
if (n) {
let t = s;
const i = G * G, r = R * R;
for (let s = 0; s < this.m_bodyCount; ++s) {
const n = this.m_bodies[s];
if (n.GetType() !== e.b2BodyType.b2_staticBody) if (!n.m_autoSleepFlag || n.m_angularVelocity * n.m_angularVelocity > r || st.DotVV(n.m_linearVelocity, n.m_linearVelocity) > i) {
n.m_sleepTime = 0;
t = 0;
} else {
n.m_sleepTime += a;
t = J(t, n.m_sleepTime);
}
}
if (t >= T && m) for (let t = 0; t < this.m_bodyCount; ++t) this.m_bodies[t].SetAwake(!1);
}
}
SolveTOI(t, e, i) {
for (let t = 0; t < this.m_bodyCount; ++t) {
const e = this.m_bodies[t];
this.m_positions[t].c.Copy(e.m_sweep.c);
this.m_positions[t].a = e.m_sweep.a;
this.m_velocities[t].v.Copy(e.m_linearVelocity);
this.m_velocities[t].w = e.m_angularVelocity;
}
const s = bs.s_contactSolverDef;
s.contacts = this.m_contacts;
s.count = this.m_contactCount;
s.allocator = this.m_allocator;
s.step.Copy(t);
s.positions = this.m_positions;
s.velocities = this.m_velocities;
const r = bs.s_contactSolver.Initialize(s);
for (let s = 0; s < t.positionIterations && !r.SolveTOIPositionConstraints(e, i); ++s) ;
this.m_bodies[e].m_sweep.c0.Copy(this.m_positions[e].c);
this.m_bodies[e].m_sweep.a0 = this.m_positions[e].a;
this.m_bodies[i].m_sweep.c0.Copy(this.m_positions[i].c);
this.m_bodies[i].m_sweep.a0 = this.m_positions[i].a;
r.InitializeVelocityConstraints();
for (let e = 0; e < t.velocityIterations; ++e) r.SolveVelocityConstraints();
const n = t.dt;
for (let t = 0; t < this.m_bodyCount; ++t) {
const e = this.m_positions[t].c;
let i = this.m_positions[t].a;
const s = this.m_velocities[t].v;
let r = this.m_velocities[t].w;
const o = st.MulSV(n, s, bs.s_translation);
if (st.DotVV(o, o) > g) {
const t = v / o.Length();
s.SelfMul(t);
}
const a = n * r;
a * a > x && (r *= S / z(a));
e.SelfMulAdd(n, s);
i += n * r;
this.m_positions[t].a = i;
this.m_velocities[t].w = r;
const l = this.m_bodies[t];
l.m_sweep.c.Copy(e);
l.m_sweep.a = i;
l.m_linearVelocity.Copy(s);
l.m_angularVelocity = r;
l.SynchronizeTransform();
}
this.Report(r.m_velocityConstraints);
}
Report(t) {
if (null !== this.m_listener) for (let e = 0; e < this.m_contactCount; ++e) {
const i = this.m_contacts[e];
if (!i) continue;
const s = t[e], r = bs.s_impulse;
r.count = s.pointCount;
for (let t = 0; t < s.pointCount; ++t) {
r.normalImpulses[t] = s.points[t].normalImpulse;
r.tangentImpulses[t] = s.points[t].tangentImpulse;
}
this.m_listener.PostSolve(i, r);
}
}
}
bs.s_timer = new ut();
bs.s_solverData = new cs();
bs.s_contactSolverDef = new ds();
bs.s_contactSolver = new ys();
bs.s_translation = new st();
bs.s_impulse = new is();
(function(t) {
t[t.b2_waterParticle = 0] = "b2_waterParticle";
t[t.b2_zombieParticle = 2] = "b2_zombieParticle";
t[t.b2_wallParticle = 4] = "b2_wallParticle";
t[t.b2_springParticle = 8] = "b2_springParticle";
t[t.b2_elasticParticle = 16] = "b2_elasticParticle";
t[t.b2_viscousParticle = 32] = "b2_viscousParticle";
t[t.b2_powderParticle = 64] = "b2_powderParticle";
t[t.b2_tensileParticle = 128] = "b2_tensileParticle";
t[t.b2_colorMixingParticle = 256] = "b2_colorMixingParticle";
t[t.b2_destructionListenerParticle = 512] = "b2_destructionListenerParticle";
t[t.b2_barrierParticle = 1024] = "b2_barrierParticle";
t[t.b2_staticPressureParticle = 2048] = "b2_staticPressureParticle";
t[t.b2_reactiveParticle = 4096] = "b2_reactiveParticle";
t[t.b2_repulsiveParticle = 8192] = "b2_repulsiveParticle";
t[t.b2_fixtureContactListenerParticle = 16384] = "b2_fixtureContactListenerParticle";
t[t.b2_particleContactListenerParticle = 32768] = "b2_particleContactListenerParticle";
t[t.b2_fixtureContactFilterParticle = 65536] = "b2_fixtureContactFilterParticle";
t[t.b2_particleContactFilterParticle = 131072] = "b2_particleContactFilterParticle";
})(e.b2ParticleFlag || (e.b2ParticleFlag = {}));
class vs {
constructor() {
this.flags = 0;
this.position = new st();
this.velocity = new st();
this.color = new mt(0, 0, 0, 0);
this.lifetime = 0;
this.userData = null;
this.group = null;
}
}
function gs(t, e, i) {
return H(Math.ceil(Math.sqrt(t / (.01 * e)) * i), 1, 8);
}
class Ss {
constructor() {
this.m_index = w;
}
GetIndex() {
return this.m_index;
}
SetIndex(t) {
this.m_index = t;
}
}
(function(t) {
t[t.b2_solidParticleGroup = 1] = "b2_solidParticleGroup";
t[t.b2_rigidParticleGroup = 2] = "b2_rigidParticleGroup";
t[t.b2_particleGroupCanBeEmpty = 4] = "b2_particleGroupCanBeEmpty";
t[t.b2_particleGroupWillBeDestroyed = 8] = "b2_particleGroupWillBeDestroyed";
t[t.b2_particleGroupNeedsUpdateDepth = 16] = "b2_particleGroupNeedsUpdateDepth";
t[t.b2_particleGroupInternalMask = 24] = "b2_particleGroupInternalMask";
})(e.b2ParticleGroupFlag || (e.b2ParticleGroupFlag = {}));
class xs {
constructor() {
this.flags = 0;
this.groupFlags = 0;
this.position = new st();
this.angle = 0;
this.linearVelocity = new st();
this.angularVelocity = 0;
this.color = new mt();
this.strength = 1;
this.shapeCount = 0;
this.stride = 0;
this.particleCount = 0;
this.lifetime = 0;
this.userData = null;
this.group = null;
}
}
class As {
constructor(t) {
this.m_firstIndex = 0;
this.m_lastIndex = 0;
this.m_groupFlags = 0;
this.m_strength = 1;
this.m_prev = null;
this.m_next = null;
this.m_timestamp = -1;
this.m_mass = 0;
this.m_inertia = 0;
this.m_center = new st();
this.m_linearVelocity = new st();
this.m_angularVelocity = 0;
this.m_transform = new ht();
this.m_userData = null;
this.m_system = t;
}
GetNext() {
return this.m_next;
}
GetParticleSystem() {
return this.m_system;
}
GetParticleCount() {
return this.m_lastIndex - this.m_firstIndex;
}
GetBufferIndex() {
return this.m_firstIndex;
}
ContainsParticle(t) {
return this.m_firstIndex <= t && t < this.m_lastIndex;
}
GetAllParticleFlags() {
if (!this.m_system.m_flagsBuffer.data) throw new Error();
let t = 0;
for (let e = this.m_firstIndex; e < this.m_lastIndex; e++) t |= this.m_system.m_flagsBuffer.data[e];
return t;
}
GetGroupFlags() {
return this.m_groupFlags;
}
SetGroupFlags(t) {
t |= this.m_groupFlags & e.b2ParticleGroupFlag.b2_particleGroupInternalMask;
this.m_system.SetGroupFlags(this, t);
}
GetMass() {
this.UpdateStatistics();
return this.m_mass;
}
GetInertia() {
this.UpdateStatistics();
return this.m_inertia;
}
GetCenter() {
this.UpdateStatistics();
return this.m_center;
}
GetLinearVelocity() {
this.UpdateStatistics();
return this.m_linearVelocity;
}
GetAngularVelocity() {
this.UpdateStatistics();
return this.m_angularVelocity;
}
GetTransform() {
return this.m_transform;
}
GetPosition() {
return this.m_transform.p;
}
GetAngle() {
return this.m_transform.q.GetAngle();
}
GetLinearVelocityFromWorldPoint(t, e) {
const i = As.GetLinearVelocityFromWorldPoint_s_t0;
this.UpdateStatistics();
return st.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, st.SubVV(t, this.m_center, i), e);
}
GetUserData() {
return this.m_userData;
}
SetUserData(t) {
this.m_userData = t;
}
ApplyForce(t) {
this.m_system.ApplyForce(this.m_firstIndex, this.m_lastIndex, t);
}
ApplyLinearImpulse(t) {
this.m_system.ApplyLinearImpulse(this.m_firstIndex, this.m_lastIndex, t);
}
DestroyParticles(t) {
if (this.m_system.m_world.IsLocked()) throw new Error();
for (let e = this.m_firstIndex; e < this.m_lastIndex; e++) this.m_system.DestroyParticle(e, t);
}
UpdateStatistics() {
if (!this.m_system.m_positionBuffer.data) throw new Error();
if (!this.m_system.m_velocityBuffer.data) throw new Error();
const t = new st(), e = new st();
if (this.m_timestamp !== this.m_system.m_timestamp) {
const i = this.m_system.GetParticleMass();
this.m_mass = i * (this.m_lastIndex - this.m_firstIndex);
this.m_center.SetZero();
this.m_linearVelocity.SetZero();
for (let t = this.m_firstIndex; t < this.m_lastIndex; t++) {
this.m_center.SelfMulAdd(i, this.m_system.m_positionBuffer.data[t]);
this.m_linearVelocity.SelfMulAdd(i, this.m_system.m_velocityBuffer.data[t]);
}
if (this.m_mass > 0) {
const t = 1 / this.m_mass;
this.m_center.SelfMul(t);
this.m_linearVelocity.SelfMul(t);
}
this.m_inertia = 0;
this.m_angularVelocity = 0;
for (let s = this.m_firstIndex; s < this.m_lastIndex; s++) {
st.SubVV(this.m_system.m_positionBuffer.data[s], this.m_center, t);
st.SubVV(this.m_system.m_velocityBuffer.data[s], this.m_linearVelocity, e);
this.m_inertia += i * st.DotVV(t, t);
this.m_angularVelocity += i * st.CrossVV(t, e);
}
this.m_inertia > 0 && (this.m_angularVelocity *= 1 / this.m_inertia);
this.m_timestamp = this.m_system.m_timestamp;
}
}
}
As.GetLinearVelocityFromWorldPoint_s_t0 = new st();
class Bs {
constructor(t) {
this.m_front = 0;
this.m_back = 0;
this.m_capacity = 0;
this.m_buffer = E(t, () => null);
this.m_capacity = t;
}
Push(t) {
if (this.m_back >= this.m_capacity) {
for (let t = this.m_front; t < this.m_back; t++) this.m_buffer[t - this.m_front] = this.m_buffer[t];
this.m_back -= this.m_front;
this.m_front = 0;
if (this.m_back >= this.m_capacity) if (this.m_capacity > 0) {
this.m_buffer.concat(E(this.m_capacity, () => null));
this.m_capacity *= 2;
} else {
this.m_buffer.concat(E(1, () => null));
this.m_capacity = 1;
}
}
this.m_buffer[this.m_back] = t;
this.m_back++;
}
Pop() {
this.m_buffer[this.m_front] = null;
this.m_front++;
}
Empty() {
return this.m_front === this.m_back;
}
Front() {
const t = this.m_buffer[this.m_front];
if (!t) throw new Error();
return t;
}
}
class ws {
constructor(t) {
this.m_generatorCapacity = 0;
this.m_generatorCount = 0;
this.m_countX = 0;
this.m_countY = 0;
this.m_diagram = [];
this.m_generatorBuffer = E(t, () => new ws.Generator());
this.m_generatorCapacity = t;
}
AddGenerator(t, e, i) {
const s = this.m_generatorBuffer[this.m_generatorCount++];
s.center.Copy(t);
s.tag = e;
s.necessary = i;
}
Generate(t, e) {
const i = 1 / t, r = new st(+s, +s), n = new st(-s, -s);
let o = 0;
for (let t = 0; t < this.m_generatorCount; t++) {
const e = this.m_generatorBuffer[t];
if (e.necessary) {
st.MinV(r, e.center, r);
st.MaxV(n, e.center, n);
++o;
}
}
if (0 === o) {
this.m_countX = 0;
this.m_countY = 0;
return;
}
r.x -= e;
r.y -= e;
n.x += e;
n.y += e;
this.m_countX = 1 + Math.floor(i * (n.x - r.x));
this.m_countY = 1 + Math.floor(i * (n.y - r.y));
this.m_diagram = [];
const a = new Bs(4 * this.m_countX * this.m_countY);
for (let t = 0; t < this.m_generatorCount; t++) {
const e = this.m_generatorBuffer[t];
e.center.SelfSub(r).SelfMul(i);
const s = Math.floor(e.center.x), n = Math.floor(e.center.y);
s >= 0 && n >= 0 && s < this.m_countX && n < this.m_countY && a.Push(new ws.Task(s, n, s + n * this.m_countX, e));
}
for (;!a.Empty(); ) {
const t = a.Front(), e = t.m_x, i = t.m_y, s = t.m_i, r = t.m_generator;
a.Pop();
if (!this.m_diagram[s]) {
this.m_diagram[s] = r;
e > 0 && a.Push(new ws.Task(e - 1, i, s - 1, r));
i > 0 && a.Push(new ws.Task(e, i - 1, s - this.m_countX, r));
e < this.m_countX - 1 && a.Push(new ws.Task(e + 1, i, s + 1, r));
i < this.m_countY - 1 && a.Push(new ws.Task(e, i + 1, s + this.m_countX, r));
}
}
for (let t = 0; t < this.m_countY; t++) for (let e = 0; e < this.m_countX - 1; e++) {
const i = e + t * this.m_countX, s = this.m_diagram[i], r = this.m_diagram[i + 1];
if (s !== r) {
a.Push(new ws.Task(e, t, i, r));
a.Push(new ws.Task(e + 1, t, i + 1, s));
}
}
for (let t = 0; t < this.m_countY - 1; t++) for (let e = 0; e < this.m_countX; e++) {
const i = e + t * this.m_countX, s = this.m_diagram[i], r = this.m_diagram[i + this.m_countX];
if (s !== r) {
a.Push(new ws.Task(e, t, i, r));
a.Push(new ws.Task(e, t + 1, i + this.m_countX, s));
}
}
for (;!a.Empty(); ) {
const t = a.Front(), e = t.m_x, i = t.m_y, s = t.m_i, r = t.m_generator;
a.Pop();
const n = this.m_diagram[s], o = r;
if (n !== o) {
const t = n.center.x - e, r = n.center.y - i, l = o.center.x - e, h = o.center.y - i;
if (t * t + r * r > l * l + h * h) {
this.m_diagram[s] = o;
e > 0 && a.Push(new ws.Task(e - 1, i, s - 1, o));
i > 0 && a.Push(new ws.Task(e, i - 1, s - this.m_countX, o));
e < this.m_countX - 1 && a.Push(new ws.Task(e + 1, i, s + 1, o));
i < this.m_countY - 1 && a.Push(new ws.Task(e, i + 1, s + this.m_countX, o));
}
}
}
}
GetNodes(t) {
for (let e = 0; e < this.m_countY - 1; e++) for (let i = 0; i < this.m_countX - 1; i++) {
const s = i + e * this.m_countX, r = this.m_diagram[s], n = this.m_diagram[s + 1], o = this.m_diagram[s + this.m_countX], a = this.m_diagram[s + 1 + this.m_countX];
if (n !== o) {
r !== n && r !== o && (r.necessary || n.necessary || o.necessary) && t(r.tag, n.tag, o.tag);
a !== n && a !== o && (r.necessary || n.necessary || o.necessary) && t(n.tag, a.tag, o.tag);
}
}
}
}
(function(t) {
t.Generator = class {
constructor() {
this.center = new st();
this.tag = 0;
this.necessary = !1;
}
};
t.Task = class {
constructor(t, e, i, s) {
this.m_x = t;
this.m_y = e;
this.m_i = i;
this.m_generator = s;
}
};
})(ws || (ws = {}));
function Cs(t, e, i) {
const s = t[e];
t[e] = t[i];
t[i] = s;
}
function Vs(t, e) {
return t < e;
}
function Ms(t, e = 0, i = t.length - e, s = Vs) {
let r = e;
const n = [];
let o = 0;
for (;;) {
for (;r + 1 < i; i++) {
const e = t[r + Math.floor(Math.random() * (i - r))];
n[o++] = i;
for (let n = r - 1; ;) {
for (;s(t[++n], e); ) ;
for (;s(e, t[--i]); ) ;
if (n >= i) break;
Cs(t, n, i);
}
}
if (0 === o) break;
r = i;
i = n[--o];
}
return t;
}
function Ps(t, e = 0, i = t.length - e, s = Vs) {
return Ms(t, e, i, s);
}
function Is(t, e, i = t.length) {
let s = 0;
for (let r = 0; r < i; ++r) e(t[r]) || (r !== s ? Cs(t, s++, r) : ++s);
return s;
}
function ks(t, e, i, s, r = Vs) {
let n = i - e;
for (;n > 0; ) {
const i = Math.floor(n / 2);
let o = e + i;
if (r(t[o], s)) {
e = ++o;
n -= i + 1;
} else n = i;
}
return e;
}
function Ds(t, e, i, s, r = Vs) {
let n = i - e;
for (;n > 0; ) {
const i = Math.floor(n / 2);
let o = e + i;
if (r(s, t[o])) n = i; else {
e = ++o;
n -= i + 1;
}
}
return e;
}
function Ts(t, e, i, s) {
let r = i;
for (;e !== r; ) {
Cs(t, e++, r++);
r === s ? r = i : e === i && (i = r);
}
}
function Gs(t, e, i, s) {
if (e === i) return i;
let r = e;
for (;++e !== i; ) s(t[r], t[e]) || Cs(t, ++r, e);
return ++r;
}
class Rs {
constructor(t) {
this.data = [];
this.count = 0;
this.capacity = 0;
this.allocator = t;
}
Append() {
this.count >= this.capacity && this.Grow();
return this.count++;
}
Reserve(t) {
if (!(this.capacity >= t)) {
for (let e = this.capacity; e < t; ++e) this.data[e] = this.allocator();
this.capacity = t;
}
}
Grow() {
const t = this.capacity ? 2 * this.capacity : k;
this.Reserve(t);
}
Free() {
if (0 !== this.data.length) {
this.data = [];
this.capacity = 0;
this.count = 0;
}
}
Shorten(t) {}
Data() {
return this.data;
}
GetCount() {
return this.count;
}
SetCount(t) {
this.count = t;
}
GetCapacity() {
return this.capacity;
}
RemoveIf(t) {
this.count = Is(this.data, t, this.count);
}
Unique(t) {
this.count = Gs(this.data, 0, this.count, t);
}
}
class Ls extends rs {
constructor(t) {
super();
this.m_system = t;
}
ShouldQueryParticleSystem(t) {
return !1;
}
ReportFixture(t) {
if (t.IsSensor()) return !0;
const e = t.GetShape().GetChildCount();
for (let i = 0; i < e; i++) {
const e = t.GetAABB(i), s = this.m_system.GetInsideBoundsEnumerator(e);
let r;
for (;(r = s.GetNext()) >= 0; ) this.ReportFixtureAndParticle(t, i, r);
}
return !0;
}
ReportParticle(t, e) {
return !1;
}
ReportFixtureAndParticle(t, e, i) {}
}
class Fs {
constructor() {
this.indexA = 0;
this.indexB = 0;
this.weight = 0;
this.normal = new st();
this.flags = 0;
}
SetIndices(t, e) {
this.indexA = t;
this.indexB = e;
}
SetWeight(t) {
this.weight = t;
}
SetNormal(t) {
this.normal.Copy(t);
}
SetFlags(t) {
this.flags = t;
}
GetIndexA() {
return this.indexA;
}
GetIndexB() {
return this.indexB;
}
GetWeight() {
return this.weight;
}
GetNormal() {
return this.normal;
}
GetFlags() {
return this.flags;
}
IsEqual(t) {
return this.indexA === t.indexA && this.indexB === t.indexB && this.flags === t.flags && this.weight === t.weight && this.normal.x === t.normal.x && this.normal.y === t.normal.y;
}
IsNotEqual(t) {
return !this.IsEqual(t);
}
ApproximatelyEqual(t) {
return this.indexA === t.indexA && this.indexB === t.indexB && this.flags === t.flags && z(this.weight - t.weight) < .01 && st.DistanceSquaredVV(this.normal, t.normal) < 1e-4;
}
}
class Es {
constructor() {
this.index = 0;
this.weight = 0;
this.normal = new st();
this.mass = 0;
}
}
class Os {
constructor() {
this.indexA = 0;
this.indexB = 0;
this.flags = 0;
this.strength = 0;
this.distance = 0;
}
}
class js {
constructor() {
this.indexA = 0;
this.indexB = 0;
this.indexC = 0;
this.flags = 0;
this.strength = 0;
this.pa = new st(0, 0);
this.pb = new st(0, 0);
this.pc = new st(0, 0);
this.ka = 0;
this.kb = 0;
this.kc = 0;
this.s = 0;
}
}
class qs {
constructor() {
this.strictContactCheck = !1;
this.density = 1;
this.gravityScale = 1;
this.radius = 1;
this.maxCount = 0;
this.pressureStrength = .005;
this.dampingStrength = 1;
this.elasticStrength = .25;
this.springStrength = .25;
this.viscousStrength = .25;
this.surfaceTensionPressureStrength = .2;
this.surfaceTensionNormalStrength = .2;
this.repulsiveStrength = 1;
this.powderStrength = .5;
this.ejectionStrength = .5;
this.staticPressureStrength = .2;
this.staticPressureRelaxation = .2;
this.staticPressureIterations = 8;
this.colorMixingStrength = .5;
this.destroyByAge = !0;
this.lifetimeGranularity = 1 / 60;
}
Copy(t) {
this.strictContactCheck = t.strictContactCheck;
this.density = t.density;
this.gravityScale = t.gravityScale;
this.radius = t.radius;
this.maxCount = t.maxCount;
this.pressureStrength = t.pressureStrength;
this.dampingStrength = t.dampingStrength;
this.elasticStrength = t.elasticStrength;
this.springStrength = t.springStrength;
this.viscousStrength = t.viscousStrength;
this.surfaceTensionPressureStrength = t.surfaceTensionPressureStrength;
this.surfaceTensionNormalStrength = t.surfaceTensionNormalStrength;
this.repulsiveStrength = t.repulsiveStrength;
this.powderStrength = t.powderStrength;
this.ejectionStrength = t.ejectionStrength;
this.staticPressureStrength = t.staticPressureStrength;
this.staticPressureRelaxation = t.staticPressureRelaxation;
this.staticPressureIterations = t.staticPressureIterations;
this.colorMixingStrength = t.colorMixingStrength;
this.destroyByAge = t.destroyByAge;
this.lifetimeGranularity = t.lifetimeGranularity;
return this;
}
Clone() {
return new qs().Copy(this);
}
}
class Ns {
constructor(t, e) {
this.m_paused = !1;
this.m_timestamp = 0;
this.m_allParticleFlags = 0;
this.m_needsUpdateAllParticleFlags = !1;
this.m_allGroupFlags = 0;
this.m_needsUpdateAllGroupFlags = !1;
this.m_hasForce = !1;
this.m_iterationIndex = 0;
this.m_inverseDensity = 0;
this.m_particleDiameter = 0;
this.m_inverseDiameter = 0;
this.m_squaredDiameter = 0;
this.m_count = 0;
this.m_internalAllocatedCapacity = 0;
this.m_handleIndexBuffer = new Ns.UserOverridableBuffer();
this.m_flagsBuffer = new Ns.UserOverridableBuffer();
this.m_positionBuffer = new Ns.UserOverridableBuffer();
this.m_velocityBuffer = new Ns.UserOverridableBuffer();
this.m_forceBuffer = [];
this.m_weightBuffer = [];
this.m_staticPressureBuffer = [];
this.m_accumulationBuffer = [];
this.m_accumulation2Buffer = [];
this.m_depthBuffer = [];
this.m_colorBuffer = new Ns.UserOverridableBuffer();
this.m_groupBuffer = [];
this.m_userDataBuffer = new Ns.UserOverridableBuffer();
this.m_stuckThreshold = 0;
this.m_lastBodyContactStepBuffer = new Ns.UserOverridableBuffer();
this.m_bodyContactCountBuffer = new Ns.UserOverridableBuffer();
this.m_consecutiveContactStepsBuffer = new Ns.UserOverridableBuffer();
this.m_stuckParticleBuffer = new Rs(() => 0);
this.m_proxyBuffer = new Rs(() => new Ns.Proxy());
this.m_contactBuffer = new Rs(() => new Fs());
this.m_bodyContactBuffer = new Rs(() => new Es());
this.m_pairBuffer = new Rs(() => new Os());
this.m_triadBuffer = new Rs(() => new js());
this.m_expirationTimeBuffer = new Ns.UserOverridableBuffer();
this.m_indexByExpirationTimeBuffer = new Ns.UserOverridableBuffer();
this.m_timeElapsed = 0;
this.m_expirationTimeBufferRequiresSorting = !1;
this.m_groupCount = 0;
this.m_groupList = null;
this.m_def = new qs();
this.m_prev = null;
this.m_next = null;
this.SetStrictContactCheck(t.strictContactCheck);
this.SetDensity(t.density);
this.SetGravityScale(t.gravityScale);
this.SetRadius(t.radius);
this.SetMaxParticleCount(t.maxCount);
this.m_def = t.Clone();
this.m_world = e;
this.SetDestructionByAge(this.m_def.destroyByAge);
}
static computeTag(t, e) {
return (e + Ns.yOffset >>> 0 << Ns.yShift) + (Ns.xScale * t + Ns.xOffset >>> 0) >>> 0;
}
static computeRelativeTag(t, e, i) {
return t + (i << Ns.yShift) + (e << Ns.xShift) >>> 0;
}
Drop() {
for (;this.m_groupList; ) this.DestroyParticleGroup(this.m_groupList);
this.FreeUserOverridableBuffer(this.m_handleIndexBuffer);
this.FreeUserOverridableBuffer(this.m_flagsBuffer);
this.FreeUserOverridableBuffer(this.m_lastBodyContactStepBuffer);
this.FreeUserOverridableBuffer(this.m_bodyContactCountBuffer);
this.FreeUserOverridableBuffer(this.m_consecutiveContactStepsBuffer);
this.FreeUserOverridableBuffer(this.m_positionBuffer);
this.FreeUserOverridableBuffer(this.m_velocityBuffer);
this.FreeUserOverridableBuffer(this.m_colorBuffer);
this.FreeUserOverridableBuffer(this.m_userDataBuffer);
this.FreeUserOverridableBuffer(this.m_expirationTimeBuffer);
this.FreeUserOverridableBuffer(this.m_indexByExpirationTimeBuffer);
this.FreeBuffer(this.m_forceBuffer, this.m_internalAllocatedCapacity);
this.FreeBuffer(this.m_weightBuffer, this.m_internalAllocatedCapacity);
this.FreeBuffer(this.m_staticPressureBuffer, this.m_internalAllocatedCapacity);
this.FreeBuffer(this.m_accumulationBuffer, this.m_internalAllocatedCapacity);
this.FreeBuffer(this.m_accumulation2Buffer, this.m_internalAllocatedCapacity);
this.FreeBuffer(this.m_depthBuffer, this.m_internalAllocatedCapacity);
this.FreeBuffer(this.m_groupBuffer, this.m_internalAllocatedCapacity);
}
CreateParticle(t) {
if (this.m_world.IsLocked()) throw new Error();
if (this.m_count >= this.m_internalAllocatedCapacity) {
const t = this.m_count ? 2 * this.m_count : k;
this.ReallocateInternalAllocatedBuffers(t);
}
if (this.m_count >= this.m_internalAllocatedCapacity) {
if (!this.m_def.destroyByAge) return w;
this.DestroyOldestParticle(0, !1);
this.SolveZombie();
}
const e = this.m_count++;
if (!this.m_flagsBuffer.data) throw new Error();
this.m_flagsBuffer.data[e] = 0;
this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[e] = 0);
this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[e] = 0);
this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[e] = 0);
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
this.m_positionBuffer.data[e] = (this.m_positionBuffer.data[e] || new st()).Copy(i(t.position, st.ZERO));
this.m_velocityBuffer.data[e] = (this.m_velocityBuffer.data[e] || new st()).Copy(i(t.velocity, st.ZERO));
this.m_weightBuffer[e] = 0;
this.m_forceBuffer[e] = (this.m_forceBuffer[e] || new st()).SetZero();
this.m_staticPressureBuffer && (this.m_staticPressureBuffer[e] = 0);
this.m_depthBuffer && (this.m_depthBuffer[e] = 0);
const s = new mt().Copy(i(t.color, mt.ZERO));
if (this.m_colorBuffer.data || !s.IsZero()) {
this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data);
this.m_colorBuffer.data[e] = (this.m_colorBuffer.data[e] || new mt()).Copy(s);
}
if (this.m_userDataBuffer.data || t.userData) {
this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data);
this.m_userDataBuffer.data[e] = t.userData;
}
this.m_handleIndexBuffer.data && (this.m_handleIndexBuffer.data[e] = null);
const r = this.m_proxyBuffer.data[this.m_proxyBuffer.Append()], n = i(t.lifetime, 0), o = n > 0;
if (this.m_expirationTimeBuffer.data || o) {
this.SetParticleLifetime(e, o ? n : this.ExpirationTimeToLifetime(-this.GetQuantizedTimeElapsed()));
if (!this.m_indexByExpirationTimeBuffer.data) throw new Error();
this.m_indexByExpirationTimeBuffer.data[e] = e;
}
r.index = e;
const a = i(t.group, null);
this.m_groupBuffer[e] = a;
if (a) if (a.m_firstIndex < a.m_lastIndex) {
this.RotateBuffer(a.m_firstIndex, a.m_lastIndex, e);
a.m_lastIndex = e + 1;
} else {
a.m_firstIndex = e;
a.m_lastIndex = e + 1;
}
this.SetParticleFlags(e, i(t.flags, 0));
return e;
}
GetParticleHandleFromIndex(t) {
this.m_handleIndexBuffer.data = this.RequestBuffer(this.m_handleIndexBuffer.data);
let e = this.m_handleIndexBuffer.data[t];
if (e) return e;
(e = new Ss()).SetIndex(t);
this.m_handleIndexBuffer.data[t] = e;
return e;
}
DestroyParticle(t, i = !1) {
if (!this.m_flagsBuffer.data) throw new Error();
let s = e.b2ParticleFlag.b2_zombieParticle;
i && (s |= e.b2ParticleFlag.b2_destructionListenerParticle);
this.SetParticleFlags(t, this.m_flagsBuffer.data[t] | s);
}
DestroyOldestParticle(t, e = !1) {
const i = this.GetParticleCount();
if (!this.m_indexByExpirationTimeBuffer.data) throw new Error();
if (!this.m_expirationTimeBuffer.data) throw new Error();
const s = this.m_indexByExpirationTimeBuffer.data[i - (t + 1)], r = this.m_indexByExpirationTimeBuffer.data[t];
this.DestroyParticle(this.m_expirationTimeBuffer.data[s] > 0 ? s : r, e);
}
DestroyParticlesInShape(t, e, i = !1) {
const s = Ns.DestroyParticlesInShape_s_aabb;
if (this.m_world.IsLocked()) throw new Error();
const r = new Ns.DestroyParticlesInShapeCallback(this, t, e, i), n = s;
t.ComputeAABB(n, e, 0);
this.m_world.QueryAABB(r, n);
return r.Destroyed();
}
CreateParticleGroup(t) {
const e = Ns.CreateParticleGroup_s_transform;
if (this.m_world.IsLocked()) throw new Error();
const s = e;
s.SetPositionAngle(i(t.position, st.ZERO), i(t.angle, 0));
const r = this.m_count;
t.shape && this.CreateParticlesWithShapeForGroup(t.shape, t, s);
t.shapes && this.CreateParticlesWithShapesForGroup(t.shapes, i(t.shapeCount, t.shapes.length), t, s);
if (t.positionData) {
const e = i(t.particleCount, t.positionData.length);
for (let i = 0; i < e; i++) {
const e = t.positionData[i];
this.CreateParticleForGroup(t, s, e);
}
}
const n = this.m_count;
let o = new As(this);
o.m_firstIndex = r;
o.m_lastIndex = n;
o.m_strength = i(t.strength, 1);
o.m_userData = t.userData;
o.m_transform.Copy(s);
o.m_prev = null;
o.m_next = this.m_groupList;
this.m_groupList && (this.m_groupList.m_prev = o);
this.m_groupList = o;
++this.m_groupCount;
for (let t = r; t < n; t++) this.m_groupBuffer[t] = o;
this.SetGroupFlags(o, i(t.groupFlags, 0));
const a = new Ns.ConnectionFilter();
this.UpdateContacts(!0);
this.UpdatePairsAndTriads(r, n, a);
if (t.group) {
this.JoinParticleGroups(t.group, o);
o = t.group;
}
return o;
}
JoinParticleGroups(t, e) {
if (this.m_world.IsLocked()) throw new Error();
this.RotateBuffer(e.m_firstIndex, e.m_lastIndex, this.m_count);
this.RotateBuffer(t.m_firstIndex, t.m_lastIndex, e.m_firstIndex);
const i = new Ns.JoinParticleGroupsFilter(e.m_firstIndex);
this.UpdateContacts(!0);
this.UpdatePairsAndTriads(t.m_firstIndex, e.m_lastIndex, i);
for (let i = e.m_firstIndex; i < e.m_lastIndex; i++) this.m_groupBuffer[i] = t;
const s = t.m_groupFlags | e.m_groupFlags;
this.SetGroupFlags(t, s);
t.m_lastIndex = e.m_lastIndex;
e.m_firstIndex = e.m_lastIndex;
this.DestroyParticleGroup(e);
}
SplitParticleGroup(t) {
this.UpdateContacts(!0);
const e = E(t.GetParticleCount(), () => new Ns.ParticleListNode());
Ns.InitializeParticleLists(t, e);
this.MergeParticleListsInContact(t, e);
const i = Ns.FindLongestParticleList(t, e);
this.MergeZombieParticleListNodes(t, e, i);
this.CreateParticleGroupsFromParticleList(t, e, i);
this.UpdatePairsAndTriadsWithParticleList(t, e);
}
GetParticleGroupList() {
return this.m_groupList;
}
GetParticleGroupCount() {
return this.m_groupCount;
}
GetParticleCount() {
return this.m_count;
}
GetMaxParticleCount() {
return this.m_def.maxCount;
}
SetMaxParticleCount(t) {
this.m_def.maxCount = t;
}
GetAllParticleFlags() {
return this.m_allParticleFlags;
}
GetAllGroupFlags() {
return this.m_allGroupFlags;
}
SetPaused(t) {
this.m_paused = t;
}
GetPaused() {
return this.m_paused;
}
SetDensity(t) {
this.m_def.density = t;
this.m_inverseDensity = 1 / this.m_def.density;
}
GetDensity() {
return this.m_def.density;
}
SetGravityScale(t) {
this.m_def.gravityScale = t;
}
GetGravityScale() {
return this.m_def.gravityScale;
}
SetDamping(t) {
this.m_def.dampingStrength = t;
}
GetDamping() {
return this.m_def.dampingStrength;
}
SetStaticPressureIterations(t) {
this.m_def.staticPressureIterations = t;
}
GetStaticPressureIterations() {
return this.m_def.staticPressureIterations;
}
SetRadius(t) {
this.m_particleDiameter = 2 * t;
this.m_squaredDiameter = this.m_particleDiameter * this.m_particleDiameter;
this.m_inverseDiameter = 1 / this.m_particleDiameter;
}
GetRadius() {
return this.m_particleDiameter / 2;
}
GetPositionBuffer() {
if (!this.m_positionBuffer.data) throw new Error();
return this.m_positionBuffer.data;
}
GetVelocityBuffer() {
if (!this.m_velocityBuffer.data) throw new Error();
return this.m_velocityBuffer.data;
}
GetColorBuffer() {
this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data);
return this.m_colorBuffer.data;
}
GetGroupBuffer() {
return this.m_groupBuffer;
}
GetWeightBuffer() {
return this.m_weightBuffer;
}
GetUserDataBuffer() {
this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data);
return this.m_userDataBuffer.data;
}
GetFlagsBuffer() {
if (!this.m_flagsBuffer.data) throw new Error();
return this.m_flagsBuffer.data;
}
SetParticleFlags(t, i) {
if (!this.m_flagsBuffer.data) throw new Error();
this.m_flagsBuffer.data[t] & ~i && (this.m_needsUpdateAllParticleFlags = !0);
if (~this.m_allParticleFlags & i) {
i & e.b2ParticleFlag.b2_tensileParticle && (this.m_accumulation2Buffer = this.RequestBuffer(this.m_accumulation2Buffer));
i & e.b2ParticleFlag.b2_colorMixingParticle && (this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data));
this.m_allParticleFlags |= i;
}
this.m_flagsBuffer.data[t] = i;
}
GetParticleFlags(t) {
if (!this.m_flagsBuffer.data) throw new Error();
return this.m_flagsBuffer.data[t];
}
SetFlagsBuffer(t, e) {
this.SetUserOverridableBuffer(this.m_flagsBuffer, t, e);
}
SetPositionBuffer(t, e) {
this.SetUserOverridableBuffer(this.m_positionBuffer, t, e);
}
SetVelocityBuffer(t, e) {
this.SetUserOverridableBuffer(this.m_velocityBuffer, t, e);
}
SetColorBuffer(t, e) {
this.SetUserOverridableBuffer(this.m_colorBuffer, t, e);
}
SetUserDataBuffer(t, e) {
this.SetUserOverridableBuffer(this.m_userDataBuffer, t, e);
}
GetContacts() {
return this.m_contactBuffer.data;
}
GetContactCount() {
return this.m_contactBuffer.count;
}
GetBodyContacts() {
return this.m_bodyContactBuffer.data;
}
GetBodyContactCount() {
return this.m_bodyContactBuffer.count;
}
GetPairs() {
return this.m_pairBuffer.data;
}
GetPairCount() {
return this.m_pairBuffer.count;
}
GetTriads() {
return this.m_triadBuffer.data;
}
GetTriadCount() {
return this.m_triadBuffer.count;
}
SetStuckThreshold(t) {
this.m_stuckThreshold = t;
if (t > 0) {
this.m_lastBodyContactStepBuffer.data = this.RequestBuffer(this.m_lastBodyContactStepBuffer.data);
this.m_bodyContactCountBuffer.data = this.RequestBuffer(this.m_bodyContactCountBuffer.data);
this.m_consecutiveContactStepsBuffer.data = this.RequestBuffer(this.m_consecutiveContactStepsBuffer.data);
}
}
GetStuckCandidates() {
return this.m_stuckParticleBuffer.Data();
}
GetStuckCandidateCount() {
return this.m_stuckParticleBuffer.GetCount();
}
ComputeCollisionEnergy() {
if (!this.m_velocityBuffer.data) throw new Error();
const t = Ns.ComputeCollisionEnergy_s_v, e = this.m_velocityBuffer.data;
let i = 0;
for (let s = 0; s < this.m_contactBuffer.count; s++) {
const r = this.m_contactBuffer.data[s], n = r.indexA, o = r.indexB, a = r.normal, l = st.SubVV(e[o], e[n], t), h = st.DotVV(l, a);
h < 0 && (i += h * h);
}
return .5 * this.GetParticleMass() * i;
}
SetStrictContactCheck(t) {
this.m_def.strictContactCheck = t;
}
GetStrictContactCheck() {
return this.m_def.strictContactCheck;
}
SetParticleLifetime(t, e) {
const i = null === this.m_indexByExpirationTimeBuffer.data;
this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data);
this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data);
if (i) {
const t = this.GetParticleCount();
for (let e = 0; e < t; ++e) this.m_indexByExpirationTimeBuffer.data[e] = e;
}
const s = e / this.m_def.lifetimeGranularity, r = s > 0 ? this.GetQuantizedTimeElapsed() + s : s;
if (r !== this.m_expirationTimeBuffer.data[t]) {
this.m_expirationTimeBuffer.data[t] = r;
this.m_expirationTimeBufferRequiresSorting = !0;
}
}
GetParticleLifetime(t) {
return this.ExpirationTimeToLifetime(this.GetExpirationTimeBuffer()[t]);
}
SetDestructionByAge(t) {
t && this.GetExpirationTimeBuffer();
this.m_def.destroyByAge = t;
}
GetDestructionByAge() {
return this.m_def.destroyByAge;
}
GetExpirationTimeBuffer() {
this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data);
return this.m_expirationTimeBuffer.data;
}
ExpirationTimeToLifetime(t) {
return (t > 0 ? t - this.GetQuantizedTimeElapsed() : t) * this.m_def.lifetimeGranularity;
}
GetIndexByExpirationTimeBuffer() {
this.GetParticleCount() ? this.SetParticleLifetime(0, this.GetParticleLifetime(0)) : this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data);
if (!this.m_indexByExpirationTimeBuffer.data) throw new Error();
return this.m_indexByExpirationTimeBuffer.data;
}
ParticleApplyLinearImpulse(t, e) {
this.ApplyLinearImpulse(t, t + 1, e);
}
ApplyLinearImpulse(t, e, i) {
if (!this.m_velocityBuffer.data) throw new Error();
const s = this.m_velocityBuffer.data, r = (e - t) * this.GetParticleMass(), n = new st().Copy(i).SelfMul(1 / r);
for (let i = t; i < e; i++) s[i].SelfAdd(n);
}
static IsSignificantForce(t) {
return 0 !== t.x || 0 !== t.y;
}
ParticleApplyForce(t, e) {
if (!this.m_flagsBuffer.data) throw new Error();
if (Ns.IsSignificantForce(e) && this.ForceCanBeApplied(this.m_flagsBuffer.data[t])) {
this.PrepareForceBuffer();
this.m_forceBuffer[t].SelfAdd(e);
}
}
ApplyForce(t, e, i) {
const s = new st().Copy(i).SelfMul(1 / (e - t));
if (Ns.IsSignificantForce(s)) {
this.PrepareForceBuffer();
for (let i = t; i < e; i++) this.m_forceBuffer[i].SelfAdd(s);
}
}
GetNext() {
return this.m_next;
}
QueryAABB(t, e) {
if (0 === this.m_proxyBuffer.count) return;
const i = this.m_proxyBuffer.count, s = ks(this.m_proxyBuffer.data, 0, i, Ns.computeTag(this.m_inverseDiameter * e.lowerBound.x, this.m_inverseDiameter * e.lowerBound.y), Ns.Proxy.CompareProxyTag), r = Ds(this.m_proxyBuffer.data, s, i, Ns.computeTag(this.m_inverseDiameter * e.upperBound.x, this.m_inverseDiameter * e.upperBound.y), Ns.Proxy.CompareTagProxy);
if (!this.m_positionBuffer.data) throw new Error();
const n = this.m_positionBuffer.data;
for (let i = s; i < r; ++i) {
const s = this.m_proxyBuffer.data[i].index, r = n[s];
if (e.lowerBound.x < r.x && r.x < e.upperBound.x && e.lowerBound.y < r.y && r.y < e.upperBound.y && !t.ReportParticle(this, s)) break;
}
}
QueryShapeAABB(t, e, i, s = 0) {
const r = Ns.QueryShapeAABB_s_aabb;
e.ComputeAABB(r, i, s);
this.QueryAABB(t, r);
}
QueryPointAABB(t, e, i = m) {
const s = Ns.QueryPointAABB_s_aabb;
s.lowerBound.Set(e.x - i, e.y - i);
s.upperBound.Set(e.x + i, e.y + i);
this.QueryAABB(t, s);
}
RayCast(t, e, i) {
const s = Ns.RayCast_s_aabb, r = Ns.RayCast_s_p, n = Ns.RayCast_s_v, o = Ns.RayCast_s_n, a = Ns.RayCast_s_point;
if (0 === this.m_proxyBuffer.count) return;
if (!this.m_positionBuffer.data) throw new Error();
const l = this.m_positionBuffer.data, h = s;
st.MinV(e, i, h.lowerBound);
st.MaxV(e, i, h.upperBound);
let c = 1;
const m = st.SubVV(i, e, n), u = st.DotVV(m, m), _ = this.GetInsideBoundsEnumerator(h);
let f;
for (;(f = _.GetNext()) >= 0; ) {
const i = st.SubVV(e, l[f], r), s = st.DotVV(i, m), n = s * s - u * (st.DotVV(i, i) - this.m_squaredDiameter);
if (n >= 0) {
const r = Z(n);
let l = (-s - r) / u;
if (l > c) continue;
if (l < 0 && ((l = (-s + r) / u) < 0 || l > c)) continue;
const h = st.AddVMulSV(i, l, m, o);
h.Normalize();
const _ = t.ReportParticle(this, f, st.AddVMulSV(e, l, m, a), h, l);
if ((c = J(c, _)) <= 0) break;
}
}
}
ComputeAABB(t) {
const e = this.GetParticleCount();
t.lowerBound.x = +s;
t.lowerBound.y = +s;
t.upperBound.x = -s;
t.upperBound.y = -s;
if (!this.m_positionBuffer.data) throw new Error();
const i = this.m_positionBuffer.data;
for (let s = 0; s < e; s++) {
const e = i[s];
st.MinV(t.lowerBound, e, t.lowerBound);
st.MaxV(t.upperBound, e, t.upperBound);
}
t.lowerBound.x -= this.m_particleDiameter;
t.lowerBound.y -= this.m_particleDiameter;
t.upperBound.x += this.m_particleDiameter;
t.upperBound.y += this.m_particleDiameter;
}
FreeBuffer(t, e) {
null !== t && (t.length = 0);
}
FreeUserOverridableBuffer(t) {
0 === t.userSuppliedCapacity && this.FreeBuffer(t.data, this.m_internalAllocatedCapacity);
}
ReallocateBuffer3(t, e, i) {
if (i <= e) throw new Error();
const s = t ? t.slice() : [];
s.length = i;
return s;
}
ReallocateBuffer5(t, e, i, s, r) {
if (s <= i) throw new Error();
if (e && !(s <= e)) throw new Error();
r && !t || e || (t = this.ReallocateBuffer3(t, i, s));
return t;
}
ReallocateBuffer4(t, e, i, s) {
return this.ReallocateBuffer5(t.data, t.userSuppliedCapacity, e, i, s);
}
RequestBuffer(t) {
if (!t) {
0 === this.m_internalAllocatedCapacity && this.ReallocateInternalAllocatedBuffers(k);
(t = []).length = this.m_internalAllocatedCapacity;
}
return t;
}
ReallocateHandleBuffers(t) {
this.m_handleIndexBuffer.data = this.ReallocateBuffer4(this.m_handleIndexBuffer, this.m_internalAllocatedCapacity, t, !0);
}
ReallocateInternalAllocatedBuffers(t) {
function e(t, e) {
return e && t > e ? e : t;
}
t = e(t, this.m_def.maxCount);
t = e(t, this.m_flagsBuffer.userSuppliedCapacity);
t = e(t, this.m_positionBuffer.userSuppliedCapacity);
t = e(t, this.m_velocityBuffer.userSuppliedCapacity);
t = e(t, this.m_colorBuffer.userSuppliedCapacity);
t = e(t, this.m_userDataBuffer.userSuppliedCapacity);
if (this.m_internalAllocatedCapacity < t) {
this.ReallocateHandleBuffers(t);
this.m_flagsBuffer.data = this.ReallocateBuffer4(this.m_flagsBuffer, this.m_internalAllocatedCapacity, t, !1);
const e = this.m_stuckThreshold > 0;
this.m_lastBodyContactStepBuffer.data = this.ReallocateBuffer4(this.m_lastBodyContactStepBuffer, this.m_internalAllocatedCapacity, t, e);
this.m_bodyContactCountBuffer.data = this.ReallocateBuffer4(this.m_bodyContactCountBuffer, this.m_internalAllocatedCapacity, t, e);
this.m_consecutiveContactStepsBuffer.data = this.ReallocateBuffer4(this.m_consecutiveContactStepsBuffer, this.m_internalAllocatedCapacity, t, e);
this.m_positionBuffer.data = this.ReallocateBuffer4(this.m_positionBuffer, this.m_internalAllocatedCapacity, t, !1);
this.m_velocityBuffer.data = this.ReallocateBuffer4(this.m_velocityBuffer, this.m_internalAllocatedCapacity, t, !1);
this.m_forceBuffer = this.ReallocateBuffer5(this.m_forceBuffer, 0, this.m_internalAllocatedCapacity, t, !1);
this.m_weightBuffer = this.ReallocateBuffer5(this.m_weightBuffer, 0, this.m_internalAllocatedCapacity, t, !1);
this.m_staticPressureBuffer = this.ReallocateBuffer5(this.m_staticPressureBuffer, 0, this.m_internalAllocatedCapacity, t, !0);
this.m_accumulationBuffer = this.ReallocateBuffer5(this.m_accumulationBuffer, 0, this.m_internalAllocatedCapacity, t, !1);
this.m_accumulation2Buffer = this.ReallocateBuffer5(this.m_accumulation2Buffer, 0, this.m_internalAllocatedCapacity, t, !0);
this.m_depthBuffer = this.ReallocateBuffer5(this.m_depthBuffer, 0, this.m_internalAllocatedCapacity, t, !0);
this.m_colorBuffer.data = this.ReallocateBuffer4(this.m_colorBuffer, this.m_internalAllocatedCapacity, t, !0);
this.m_groupBuffer = this.ReallocateBuffer5(this.m_groupBuffer, 0, this.m_internalAllocatedCapacity, t, !1);
this.m_userDataBuffer.data = this.ReallocateBuffer4(this.m_userDataBuffer, this.m_internalAllocatedCapacity, t, !0);
this.m_expirationTimeBuffer.data = this.ReallocateBuffer4(this.m_expirationTimeBuffer, this.m_internalAllocatedCapacity, t, !0);
this.m_indexByExpirationTimeBuffer.data = this.ReallocateBuffer4(this.m_indexByExpirationTimeBuffer, this.m_internalAllocatedCapacity, t, !1);
this.m_internalAllocatedCapacity = t;
}
}
CreateParticleForGroup(t, e, s) {
const r = new vs();
r.flags = i(t.flags, 0);
ht.MulXV(e, s, r.position);
st.AddVV(i(t.linearVelocity, st.ZERO), st.CrossSV(i(t.angularVelocity, 0), st.SubVV(r.position, i(t.position, st.ZERO), st.s_t0), st.s_t0), r.velocity);
r.color.Copy(i(t.color, mt.ZERO));
r.lifetime = i(t.lifetime, 0);
r.userData = t.userData;
this.CreateParticle(r);
}
CreateParticlesStrokeShapeForGroup(t, s, r) {
const n = Ns.CreateParticlesStrokeShapeForGroup_s_edge, o = Ns.CreateParticlesStrokeShapeForGroup_s_d, a = Ns.CreateParticlesStrokeShapeForGroup_s_p;
let l = i(s.stride, 0);
0 === l && (l = this.GetParticleStride());
let h = 0;
const c = t.GetChildCount();
for (let i = 0; i < c; i++) {
let c = null;
if (t.GetType() === e.b2ShapeType.e_edgeShape) c = t; else {
c = n;
t.GetChildEdge(c, i);
}
const m = st.SubVV(c.m_vertex2, c.m_vertex1, o), u = m.Length();
for (;h < u; ) {
const t = st.AddVMulSV(c.m_vertex1, h / u, m, a);
this.CreateParticleForGroup(s, r, t);
h += l;
}
h -= u;
}
}
CreateParticlesFillShapeForGroup(t, e, s) {
const r = Ns.CreateParticlesFillShapeForGroup_s_aabb, n = Ns.CreateParticlesFillShapeForGroup_s_p;
let o = i(e.stride, 0);
0 === o && (o = this.GetParticleStride());
const a = ht.IDENTITY, l = r;
t.ComputeAABB(l, a, 0);
for (let i = Math.floor(l.lowerBound.y / o) * o; i < l.upperBound.y; i += o) for (let r = Math.floor(l.lowerBound.x / o) * o; r < l.upperBound.x; r += o) {
const o = n.Set(r, i);
t.TestPoint(a, o) && this.CreateParticleForGroup(e, s, o);
}
}
CreateParticlesWithShapeForGroup(t, i, s) {
switch (t.GetType()) {
case e.b2ShapeType.e_edgeShape:
case e.b2ShapeType.e_chainShape:
this.CreateParticlesStrokeShapeForGroup(t, i, s);
break;

case e.b2ShapeType.e_polygonShape:
case e.b2ShapeType.e_circleShape:
this.CreateParticlesFillShapeForGroup(t, i, s);
}
}
CreateParticlesWithShapesForGroup(t, e, i, s) {
const r = new Ns.CompositeShape(t, e);
this.CreateParticlesFillShapeForGroup(r, i, s);
}
CloneParticle(t, e) {
const i = new vs();
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
i.flags = this.m_flagsBuffer.data[t];
i.position.Copy(this.m_positionBuffer.data[t]);
i.velocity.Copy(this.m_velocityBuffer.data[t]);
this.m_colorBuffer.data && i.color.Copy(this.m_colorBuffer.data[t]);
this.m_userDataBuffer.data && (i.userData = this.m_userDataBuffer.data[t]);
i.group = e;
const s = this.CreateParticle(i);
if (this.m_handleIndexBuffer.data) {
const e = this.m_handleIndexBuffer.data[t];
e && e.SetIndex(s);
this.m_handleIndexBuffer.data[s] = e;
this.m_handleIndexBuffer.data[t] = null;
}
this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[s] = this.m_lastBodyContactStepBuffer.data[t]);
this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[s] = this.m_bodyContactCountBuffer.data[t]);
this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[s] = this.m_consecutiveContactStepsBuffer.data[t]);
this.m_hasForce && this.m_forceBuffer[s].Copy(this.m_forceBuffer[t]);
this.m_staticPressureBuffer && (this.m_staticPressureBuffer[s] = this.m_staticPressureBuffer[t]);
this.m_depthBuffer && (this.m_depthBuffer[s] = this.m_depthBuffer[t]);
this.m_expirationTimeBuffer.data && (this.m_expirationTimeBuffer.data[s] = this.m_expirationTimeBuffer.data[t]);
return s;
}
DestroyParticlesInGroup(t, e = !1) {
for (let i = t.m_firstIndex; i < t.m_lastIndex; i++) this.DestroyParticle(i, e);
}
DestroyParticleGroup(t) {
this.m_world.m_destructionListener && this.m_world.m_destructionListener.SayGoodbyeParticleGroup(t);
this.SetGroupFlags(t, 0);
for (let e = t.m_firstIndex; e < t.m_lastIndex; e++) this.m_groupBuffer[e] = null;
t.m_prev && (t.m_prev.m_next = t.m_next);
t.m_next && (t.m_next.m_prev = t.m_prev);
t === this.m_groupList && (this.m_groupList = t.m_next);
--this.m_groupCount;
}
static ParticleCanBeConnected(t, i) {
return 0 != (t & (e.b2ParticleFlag.b2_wallParticle | e.b2ParticleFlag.b2_springParticle | e.b2ParticleFlag.b2_elasticParticle)) || null !== i && 0 != (i.GetGroupFlags() & e.b2ParticleGroupFlag.b2_rigidParticleGroup);
}
UpdatePairsAndTriads(t, i, s) {
const r = Ns.UpdatePairsAndTriads_s_dab, n = Ns.UpdatePairsAndTriads_s_dbc, o = Ns.UpdatePairsAndTriads_s_dca;
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const a = this.m_positionBuffer.data;
let l = 0;
for (let e = t; e < i; e++) l |= this.m_flagsBuffer.data[e];
if (l & Ns.k_pairFlags) for (let r = 0; r < this.m_contactBuffer.count; r++) {
const n = this.m_contactBuffer.data[r], o = n.indexA, l = n.indexB, h = this.m_flagsBuffer.data[o], c = this.m_flagsBuffer.data[l], m = this.m_groupBuffer[o], u = this.m_groupBuffer[l];
if (o >= t && o < i && l >= t && l < i && !((h | c) & e.b2ParticleFlag.b2_zombieParticle) && (h | c) & Ns.k_pairFlags && (s.IsNecessary(o) || s.IsNecessary(l)) && Ns.ParticleCanBeConnected(h, m) && Ns.ParticleCanBeConnected(c, u) && s.ShouldCreatePair(o, l)) {
const t = this.m_pairBuffer.data[this.m_pairBuffer.Append()];
t.indexA = o;
t.indexB = l;
t.flags = n.flags;
t.strength = J(m ? m.m_strength : 1, u ? u.m_strength : 1);
t.distance = st.DistanceVV(a[o], a[l]);
}
Ps(this.m_pairBuffer.data, 0, this.m_pairBuffer.count, Ns.ComparePairIndices);
this.m_pairBuffer.Unique(Ns.MatchPairIndices);
}
if (l & Ns.k_triadFlags) {
const l = new ws(i - t);
for (let r = t; r < i; r++) {
const t = this.m_flagsBuffer.data[r], i = this.m_groupBuffer[r];
t & e.b2ParticleFlag.b2_zombieParticle || !Ns.ParticleCanBeConnected(t, i) || l.AddGenerator(a[r], r, s.IsNecessary(r));
}
const h = this.GetParticleStride();
l.Generate(h / 2, 2 * h);
const c = this, m = (t, e, i) => {
if (!c.m_flagsBuffer.data) throw new Error();
const l = c.m_flagsBuffer.data[t], h = c.m_flagsBuffer.data[e], m = c.m_flagsBuffer.data[i];
if ((l | h | m) & Ns.k_triadFlags && s.ShouldCreateTriad(t, e, i)) {
const s = a[t], u = a[e], _ = a[i], f = st.SubVV(s, u, r), d = st.SubVV(u, _, n), p = st.SubVV(_, s, o), y = I * c.m_squaredDiameter;
if (st.DotVV(f, f) > y || st.DotVV(d, d) > y || st.DotVV(p, p) > y) return;
const b = c.m_groupBuffer[t], v = c.m_groupBuffer[e], g = c.m_groupBuffer[i], S = c.m_triadBuffer.data[c.m_triadBuffer.Append()];
S.indexA = t;
S.indexB = e;
S.indexC = i;
S.flags = l | h | m;
S.strength = J(J(b ? b.m_strength : 1, v ? v.m_strength : 1), g ? g.m_strength : 1);
const x = (s.x + u.x + _.x) / 3, A = (s.y + u.y + _.y) / 3;
S.pa.x = s.x - x;
S.pa.y = s.y - A;
S.pb.x = u.x - x;
S.pb.y = u.y - A;
S.pc.x = _.x - x;
S.pc.y = _.y - A;
S.ka = -st.DotVV(p, f);
S.kb = -st.DotVV(f, d);
S.kc = -st.DotVV(d, p);
S.s = st.CrossVV(s, u) + st.CrossVV(u, _) + st.CrossVV(_, s);
}
};
l.GetNodes(m);
Ps(this.m_triadBuffer.data, 0, this.m_triadBuffer.count, Ns.CompareTriadIndices);
this.m_triadBuffer.Unique(Ns.MatchTriadIndices);
}
}
UpdatePairsAndTriadsWithReactiveParticles() {
const t = new Ns.ReactiveFilter(this.m_flagsBuffer);
this.UpdatePairsAndTriads(0, this.m_count, t);
if (!this.m_flagsBuffer.data) throw new Error();
for (let t = 0; t < this.m_count; t++) this.m_flagsBuffer.data[t] &= ~e.b2ParticleFlag.b2_reactiveParticle;
this.m_allParticleFlags &= ~e.b2ParticleFlag.b2_reactiveParticle;
}
static ComparePairIndices(t, e) {
const i = t.indexA - e.indexA;
return 0 !== i ? i < 0 : t.indexB < e.indexB;
}
static MatchPairIndices(t, e) {
return t.indexA === e.indexA && t.indexB === e.indexB;
}
static CompareTriadIndices(t, e) {
const i = t.indexA - e.indexA;
if (0 !== i) return i < 0;
const s = t.indexB - e.indexB;
return 0 !== s ? s < 0 : t.indexC < e.indexC;
}
static MatchTriadIndices(t, e) {
return t.indexA === e.indexA && t.indexB === e.indexB && t.indexC === e.indexC;
}
static InitializeParticleLists(t, e) {
const i = t.GetBufferIndex(), s = t.GetParticleCount();
for (let t = 0; t < s; t++) {
const s = e[t];
s.list = s;
s.next = null;
s.count = 1;
s.index = t + i;
}
}
MergeParticleListsInContact(t, e) {
const i = t.GetBufferIndex();
for (let s = 0; s < this.m_contactBuffer.count; s++) {
const r = this.m_contactBuffer.data[s], n = r.indexA, o = r.indexB;
if (!t.ContainsParticle(n) || !t.ContainsParticle(o)) continue;
let a = e[n - i].list, l = e[o - i].list;
if (a !== l) {
if (a.count < l.count) {
const t = a;
a = l;
l = t;
}
Ns.MergeParticleLists(a, l);
}
}
}
static MergeParticleLists(t, e) {
for (let i = e; ;) {
i.list = t;
const e = i.next;
if (!e) {
i.next = t.next;
break;
}
i = e;
}
t.next = e;
t.count += e.count;
e.count = 0;
}
static FindLongestParticleList(t, e) {
const i = t.GetParticleCount();
let s = e[0];
for (let t = 0; t < i; t++) {
const i = e[t];
s.count < i.count && (s = i);
}
return s;
}
MergeZombieParticleListNodes(t, i, s) {
if (!this.m_flagsBuffer.data) throw new Error();
const r = t.GetParticleCount();
for (let t = 0; t < r; t++) {
const r = i[t];
r !== s && this.m_flagsBuffer.data[r.index] & e.b2ParticleFlag.b2_zombieParticle && Ns.MergeParticleListAndNode(s, r);
}
}
static MergeParticleListAndNode(t, e) {
e.list = t;
e.next = t.next;
t.next = e;
t.count++;
e.count = 0;
}
CreateParticleGroupsFromParticleList(t, i, s) {
if (!this.m_flagsBuffer.data) throw new Error();
const r = t.GetParticleCount(), n = new xs();
n.groupFlags = t.GetGroupFlags();
n.userData = t.GetUserData();
for (let t = 0; t < r; t++) {
const r = i[t];
if (!r.count || r === s) continue;
const o = this.CreateParticleGroup(n);
for (let t = r; t; t = t.next) {
const i = t.index, s = this.CloneParticle(i, o);
this.m_flagsBuffer.data[i] |= e.b2ParticleFlag.b2_zombieParticle;
t.index = s;
}
}
}
UpdatePairsAndTriadsWithParticleList(t, e) {
const i = t.GetBufferIndex();
for (let s = 0; s < this.m_pairBuffer.count; s++) {
const r = this.m_pairBuffer.data[s], n = r.indexA, o = r.indexB;
t.ContainsParticle(n) && (r.indexA = e[n - i].index);
t.ContainsParticle(o) && (r.indexB = e[o - i].index);
}
for (let s = 0; s < this.m_triadBuffer.count; s++) {
const r = this.m_triadBuffer.data[s], n = r.indexA, o = r.indexB, a = r.indexC;
t.ContainsParticle(n) && (r.indexA = e[n - i].index);
t.ContainsParticle(o) && (r.indexB = e[o - i].index);
t.ContainsParticle(a) && (r.indexC = e[a - i].index);
}
}
ComputeDepth() {
const t = [];
let i = 0;
for (let s = 0; s < this.m_contactBuffer.count; s++) {
const r = this.m_contactBuffer.data[s], n = r.indexA, o = r.indexB, a = this.m_groupBuffer[n], l = this.m_groupBuffer[o];
a && a === l && a.m_groupFlags & e.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth && (t[i++] = r);
}
const r = [];
let n = 0;
for (let t = this.m_groupList; t; t = t.GetNext()) if (t.m_groupFlags & e.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth) {
r[n++] = t;
this.SetGroupFlags(t, t.m_groupFlags & ~e.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth);
for (let e = t.m_firstIndex; e < t.m_lastIndex; e++) this.m_accumulationBuffer[e] = 0;
}
for (let e = 0; e < i; e++) {
const i = t[e], s = i.indexA, r = i.indexB, n = i.weight;
this.m_accumulationBuffer[s] += n;
this.m_accumulationBuffer[r] += n;
}
for (let t = 0; t < n; t++) {
const e = r[t];
for (let t = e.m_firstIndex; t < e.m_lastIndex; t++) {
const e = this.m_accumulationBuffer[t];
this.m_depthBuffer[t] = e < .8 ? 0 : s;
}
}
const o = Z(this.m_count) >> 0;
for (let e = 0; e < o; e++) {
let e = !1;
for (let s = 0; s < i; s++) {
const i = t[s], r = i.indexA, n = i.indexB, o = 1 - i.weight, a = this.m_depthBuffer[r], l = this.m_depthBuffer[n], h = l + o, c = a + o;
if (a > h) {
this.m_depthBuffer[r] = h;
e = !0;
}
if (l > c) {
this.m_depthBuffer[n] = c;
e = !0;
}
}
if (!e) break;
}
for (let t = 0; t < n; t++) {
const e = r[t];
for (let t = e.m_firstIndex; t < e.m_lastIndex; t++) this.m_depthBuffer[t] < s ? this.m_depthBuffer[t] *= this.m_particleDiameter : this.m_depthBuffer[t] = 0;
}
}
GetInsideBoundsEnumerator(t) {
const e = Ns.computeTag(this.m_inverseDiameter * t.lowerBound.x - 1, this.m_inverseDiameter * t.lowerBound.y - 1), i = Ns.computeTag(this.m_inverseDiameter * t.upperBound.x + 1, this.m_inverseDiameter * t.upperBound.y + 1), s = this.m_proxyBuffer.count, r = ks(this.m_proxyBuffer.data, 0, s, e, Ns.Proxy.CompareProxyTag), n = Ds(this.m_proxyBuffer.data, 0, s, i, Ns.Proxy.CompareTagProxy);
return new Ns.InsideBoundsEnumerator(this, e, i, r, n);
}
UpdateAllParticleFlags() {
if (!this.m_flagsBuffer.data) throw new Error();
this.m_allParticleFlags = 0;
for (let t = 0; t < this.m_count; t++) this.m_allParticleFlags |= this.m_flagsBuffer.data[t];
this.m_needsUpdateAllParticleFlags = !1;
}
UpdateAllGroupFlags() {
this.m_allGroupFlags = 0;
for (let t = this.m_groupList; t; t = t.GetNext()) this.m_allGroupFlags |= t.m_groupFlags;
this.m_needsUpdateAllGroupFlags = !1;
}
AddContact(t, e, i) {
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
const s = Ns.AddContact_s_d, r = this.m_positionBuffer.data, n = st.SubVV(r[e], r[t], s), o = st.DotVV(n, n);
if (o < this.m_squaredDiameter) {
let i = X(o);
isFinite(i) || (i = 198177537e11);
const s = this.m_contactBuffer.data[this.m_contactBuffer.Append()];
s.indexA = t;
s.indexB = e;
s.flags = this.m_flagsBuffer.data[t] | this.m_flagsBuffer.data[e];
s.weight = 1 - o * i * this.m_inverseDiameter;
st.MulSV(i, n, s.normal);
}
}
FindContacts_Reference(t) {
const e = this.m_proxyBuffer.count;
this.m_contactBuffer.count = 0;
for (let t = 0, i = 0; t < e; t++) {
const s = Ns.computeRelativeTag(this.m_proxyBuffer.data[t].tag, 1, 0);
for (let i = t + 1; i < e && !(s < this.m_proxyBuffer.data[i].tag); i++) this.AddContact(this.m_proxyBuffer.data[t].index, this.m_proxyBuffer.data[i].index, this.m_contactBuffer);
const r = Ns.computeRelativeTag(this.m_proxyBuffer.data[t].tag, -1, 1);
for (;i < e && !(r <= this.m_proxyBuffer.data[i].tag); i++) ;
const n = Ns.computeRelativeTag(this.m_proxyBuffer.data[t].tag, 1, 1);
for (let s = i; s < e && !(n < this.m_proxyBuffer.data[s].tag); s++) this.AddContact(this.m_proxyBuffer.data[t].index, this.m_proxyBuffer.data[s].index, this.m_contactBuffer);
}
}
FindContacts(t) {
this.FindContacts_Reference(t);
}
UpdateProxies_Reference(t) {
if (!this.m_positionBuffer.data) throw new Error();
const e = this.m_positionBuffer.data, i = this.m_inverseDiameter;
for (let t = 0; t < this.m_proxyBuffer.count; ++t) {
const s = this.m_proxyBuffer.data[t], r = e[s.index];
s.tag = Ns.computeTag(i * r.x, i * r.y);
}
}
UpdateProxies(t) {
this.UpdateProxies_Reference(t);
}
SortProxies(t) {
Ms(this.m_proxyBuffer.data, 0, this.m_proxyBuffer.count, Ns.Proxy.CompareProxyProxy);
}
FilterContacts(t) {
const i = this.GetParticleContactFilter();
if (null === i) return;
const s = this;
this.m_contactBuffer.RemoveIf(t => 0 != (t.flags & e.b2ParticleFlag.b2_particleContactFilterParticle) && !i.ShouldCollideParticleParticle(s, t.indexA, t.indexB));
}
NotifyContactListenerPreContact(t) {
if (null !== this.GetParticleContactListener()) {
t.Initialize(this.m_contactBuffer, this.m_flagsBuffer);
throw new Error();
}
}
NotifyContactListenerPostContact(t) {
const e = this.GetParticleContactListener();
if (null !== e) {
for (let t = 0; t < this.m_contactBuffer.count; ++t) {
const i = this.m_contactBuffer.data[t];
e.BeginContactParticleParticle(this, i);
}
throw new Error();
}
}
static b2ParticleContactIsZombie(t) {
return (t.flags & e.b2ParticleFlag.b2_zombieParticle) === e.b2ParticleFlag.b2_zombieParticle;
}
UpdateContacts(t) {
this.UpdateProxies(this.m_proxyBuffer);
this.SortProxies(this.m_proxyBuffer);
const e = new Ns.b2ParticlePairSet();
this.NotifyContactListenerPreContact(e);
this.FindContacts(this.m_contactBuffer);
this.FilterContacts(this.m_contactBuffer);
this.NotifyContactListenerPostContact(e);
t && this.m_contactBuffer.RemoveIf(Ns.b2ParticleContactIsZombie);
}
NotifyBodyContactListenerPreContact(t) {
if (null !== this.GetFixtureContactListener()) {
t.Initialize(this.m_bodyContactBuffer, this.m_flagsBuffer);
throw new Error();
}
}
NotifyBodyContactListenerPostContact(t) {
const e = this.GetFixtureContactListener();
if (null !== e) {
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const i = this.m_bodyContactBuffer.data[t];
e.BeginContactFixtureParticle(this, i);
}
throw new Error();
}
}
UpdateBodyContacts() {
const t = Ns.UpdateBodyContacts_s_aabb, e = new Ns.FixtureParticleSet();
this.NotifyBodyContactListenerPreContact(e);
if (this.m_stuckThreshold > 0) {
if (!this.m_bodyContactCountBuffer.data) throw new Error();
if (!this.m_lastBodyContactStepBuffer.data) throw new Error();
if (!this.m_consecutiveContactStepsBuffer.data) throw new Error();
const t = this.GetParticleCount();
for (let e = 0; e < t; e++) {
this.m_bodyContactCountBuffer.data[e] = 0;
this.m_timestamp > this.m_lastBodyContactStepBuffer.data[e] + 1 && (this.m_consecutiveContactStepsBuffer.data[e] = 0);
}
}
this.m_bodyContactBuffer.SetCount(0);
this.m_stuckParticleBuffer.SetCount(0);
const i = t;
this.ComputeAABB(i);
const s = new Ns.UpdateBodyContactsCallback(this, this.GetFixtureContactFilter());
this.m_world.QueryAABB(s, i);
this.m_def.strictContactCheck && this.RemoveSpuriousBodyContacts();
this.NotifyBodyContactListenerPostContact(e);
}
Solve(t) {
const i = Ns.Solve_s_subStep;
if (0 !== this.m_count) {
this.m_expirationTimeBuffer.data && this.SolveLifetimes(t);
this.m_allParticleFlags & e.b2ParticleFlag.b2_zombieParticle && this.SolveZombie();
this.m_needsUpdateAllParticleFlags && this.UpdateAllParticleFlags();
this.m_needsUpdateAllGroupFlags && this.UpdateAllGroupFlags();
if (!this.m_paused) for (this.m_iterationIndex = 0; this.m_iterationIndex < t.particleIterations; this.m_iterationIndex++) {
++this.m_timestamp;
const s = i.Copy(t);
s.dt /= t.particleIterations;
s.inv_dt *= t.particleIterations;
this.UpdateContacts(!1);
this.UpdateBodyContacts();
this.ComputeWeight();
this.m_allGroupFlags & e.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth && this.ComputeDepth();
this.m_allParticleFlags & e.b2ParticleFlag.b2_reactiveParticle && this.UpdatePairsAndTriadsWithReactiveParticles();
this.m_hasForce && this.SolveForce(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_viscousParticle && this.SolveViscous();
this.m_allParticleFlags & e.b2ParticleFlag.b2_repulsiveParticle && this.SolveRepulsive(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_powderParticle && this.SolvePowder(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_tensileParticle && this.SolveTensile(s);
this.m_allGroupFlags & e.b2ParticleGroupFlag.b2_solidParticleGroup && this.SolveSolid(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_colorMixingParticle && this.SolveColorMixing();
this.SolveGravity(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_staticPressureParticle && this.SolveStaticPressure(s);
this.SolvePressure(s);
this.SolveDamping(s);
this.m_allParticleFlags & Ns.k_extraDampingFlags && this.SolveExtraDamping();
this.m_allParticleFlags & e.b2ParticleFlag.b2_elasticParticle && this.SolveElastic(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_springParticle && this.SolveSpring(s);
this.LimitVelocity(s);
this.m_allGroupFlags & e.b2ParticleGroupFlag.b2_rigidParticleGroup && this.SolveRigidDamping();
this.m_allParticleFlags & e.b2ParticleFlag.b2_barrierParticle && this.SolveBarrier(s);
this.SolveCollision(s);
this.m_allGroupFlags & e.b2ParticleGroupFlag.b2_rigidParticleGroup && this.SolveRigid(s);
this.m_allParticleFlags & e.b2ParticleFlag.b2_wallParticle && this.SolveWall();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
for (let t = 0; t < this.m_count; t++) this.m_positionBuffer.data[t].SelfMulAdd(s.dt, this.m_velocityBuffer.data[t]);
}
}
}
SolveCollision(t) {
const e = Ns.SolveCollision_s_aabb;
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const i = this.m_positionBuffer.data, r = this.m_velocityBuffer.data, n = e;
n.lowerBound.x = +s;
n.lowerBound.y = +s;
n.upperBound.x = -s;
n.upperBound.y = -s;
for (let e = 0; e < this.m_count; e++) {
const s = r[e], o = i[e], a = o.x + t.dt * s.x, l = o.y + t.dt * s.y;
n.lowerBound.x = J(n.lowerBound.x, J(o.x, a));
n.lowerBound.y = J(n.lowerBound.y, J(o.y, l));
n.upperBound.x = U(n.upperBound.x, U(o.x, a));
n.upperBound.y = U(n.upperBound.y, U(o.y, l));
}
const o = new Ns.SolveCollisionCallback(this, t);
this.m_world.QueryAABB(o, n);
}
LimitVelocity(t) {
if (!this.m_velocityBuffer.data) throw new Error();
const e = this.m_velocityBuffer.data, i = this.GetCriticalVelocitySquared(t);
for (let t = 0; t < this.m_count; t++) {
const s = e[t], r = st.DotVV(s, s);
r > i && s.SelfMul(Z(i / r));
}
}
SolveGravity(t) {
if (!this.m_velocityBuffer.data) throw new Error();
const e = Ns.SolveGravity_s_gravity, i = this.m_velocityBuffer.data, s = st.MulSV(t.dt * this.m_def.gravityScale, this.m_world.GetGravity(), e);
for (let t = 0; t < this.m_count; t++) i[t].SelfAdd(s);
}
SolveBarrier(t) {
const i = Ns.SolveBarrier_s_aabb, s = Ns.SolveBarrier_s_va, r = Ns.SolveBarrier_s_vb, n = Ns.SolveBarrier_s_pba, o = Ns.SolveBarrier_s_vba, a = Ns.SolveBarrier_s_vc, l = Ns.SolveBarrier_s_pca, h = Ns.SolveBarrier_s_vca, c = Ns.SolveBarrier_s_qba, m = Ns.SolveBarrier_s_qca, u = Ns.SolveBarrier_s_dv, _ = Ns.SolveBarrier_s_f;
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const f = this.m_positionBuffer.data, d = this.m_velocityBuffer.data;
for (let t = 0; t < this.m_count; t++) 0 != (this.m_flagsBuffer.data[t] & Ns.k_barrierWallFlags) && d[t].SetZero();
const p = D * t.dt, y = this.GetParticleMass();
for (let b = 0; b < this.m_pairBuffer.count; b++) {
const v = this.m_pairBuffer.data[b];
if (v.flags & e.b2ParticleFlag.b2_barrierParticle) {
const e = v.indexA, b = v.indexB, g = f[e], S = f[b], x = i;
st.MinV(g, S, x.lowerBound);
st.MaxV(g, S, x.upperBound);
const A = this.m_groupBuffer[e], B = this.m_groupBuffer[b], w = this.GetLinearVelocity(A, e, g, s), C = this.GetLinearVelocity(B, b, S, r), V = st.SubVV(S, g, n), M = st.SubVV(C, w, o), P = this.GetInsideBoundsEnumerator(x);
let I;
for (;(I = P.GetNext()) >= 0; ) {
const e = f[I], i = this.m_groupBuffer[I];
if (A !== i && B !== i) {
const s = this.GetLinearVelocity(i, I, e, a), r = st.SubVV(e, g, l), n = st.SubVV(s, w, h), o = st.CrossVV(M, n), f = st.CrossVV(V, n) - st.CrossVV(r, M), b = st.CrossVV(V, r);
let v, S;
const x = c, A = m;
if (0 === o) {
if (0 === f) continue;
if (!((S = -b / f) >= 0 && S < p)) continue;
st.AddVMulSV(V, S, M, x);
st.AddVMulSV(r, S, n, A);
if (!((v = st.DotVV(x, A) / st.DotVV(x, x)) >= 0 && v <= 1)) continue;
} else {
const t = f * f - 4 * b * o;
if (t < 0) continue;
const e = Z(t);
let i = (-f - e) / (2 * o), s = (-f + e) / (2 * o);
if (i > s) {
const t = i;
i = s;
s = t;
}
S = i;
st.AddVMulSV(V, S, M, x);
st.AddVMulSV(r, S, n, A);
v = st.DotVV(x, A) / st.DotVV(x, x);
if (!(S >= 0 && S < p && v >= 0 && v <= 1)) {
if (!((S = s) >= 0 && S < p)) continue;
st.AddVMulSV(V, S, M, x);
st.AddVMulSV(r, S, n, A);
if (!((v = st.DotVV(x, A) / st.DotVV(x, x)) >= 0 && v <= 1)) continue;
}
}
const B = u;
B.x = w.x + v * M.x - s.x;
B.y = w.y + v * M.y - s.y;
const C = st.MulSV(y, B, _);
if (i && this.IsRigidGroup(i)) {
const t = i.GetMass(), s = i.GetInertia();
t > 0 && i.m_linearVelocity.SelfMulAdd(1 / t, C);
s > 0 && (i.m_angularVelocity += st.CrossVV(st.SubVV(e, i.GetCenter(), st.s_t0), C) / s);
} else d[I].SelfAdd(B);
this.ParticleApplyForce(I, C.SelfMul(-t.inv_dt));
}
}
}
}
}
SolveStaticPressure(t) {
if (!this.m_flagsBuffer.data) throw new Error();
this.m_staticPressureBuffer = this.RequestBuffer(this.m_staticPressureBuffer);
const i = this.GetCriticalPressure(t), s = this.m_def.staticPressureStrength * i, r = M * i, n = this.m_def.staticPressureRelaxation;
for (let t = 0; t < this.m_def.staticPressureIterations; t++) {
for (let t = 0; t < this.m_count; t++) this.m_accumulationBuffer[t] = 0;
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const i = this.m_contactBuffer.data[t];
if (i.flags & e.b2ParticleFlag.b2_staticPressureParticle) {
const t = i.indexA, e = i.indexB, s = i.weight;
this.m_accumulationBuffer[t] += s * this.m_staticPressureBuffer[e];
this.m_accumulationBuffer[e] += s * this.m_staticPressureBuffer[t];
}
}
for (let t = 0; t < this.m_count; t++) {
const i = this.m_weightBuffer[t];
if (this.m_flagsBuffer.data[t] & e.b2ParticleFlag.b2_staticPressureParticle) {
const e = (this.m_accumulationBuffer[t] + s * (i - V)) / (i + n);
this.m_staticPressureBuffer[t] = H(e, 0, r);
} else this.m_staticPressureBuffer[t] = 0;
}
}
}
ComputeWeight() {
for (let t = 0; t < this.m_count; t++) this.m_weightBuffer[t] = 0;
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const e = this.m_bodyContactBuffer.data[t], i = e.index, s = e.weight;
this.m_weightBuffer[i] += s;
}
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const e = this.m_contactBuffer.data[t], i = e.indexA, s = e.indexB, r = e.weight;
this.m_weightBuffer[i] += r;
this.m_weightBuffer[s] += r;
}
}
SolvePressure(t) {
const i = Ns.SolvePressure_s_f;
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const s = this.m_positionBuffer.data, r = this.m_velocityBuffer.data, n = this.GetCriticalPressure(t), o = this.m_def.pressureStrength * n, a = M * n;
for (let t = 0; t < this.m_count; t++) {
const e = this.m_weightBuffer[t], i = o * U(0, e - V);
this.m_accumulationBuffer[t] = J(i, a);
}
if (this.m_allParticleFlags & Ns.k_noPressureFlags) for (let t = 0; t < this.m_count; t++) this.m_flagsBuffer.data[t] & Ns.k_noPressureFlags && (this.m_accumulationBuffer[t] = 0);
if (this.m_allParticleFlags & e.b2ParticleFlag.b2_staticPressureParticle) for (let t = 0; t < this.m_count; t++) this.m_flagsBuffer.data[t] & e.b2ParticleFlag.b2_staticPressureParticle && (this.m_accumulationBuffer[t] += this.m_staticPressureBuffer[t]);
const l = t.dt / (this.m_def.density * this.m_particleDiameter), h = this.GetParticleInvMass();
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const e = this.m_bodyContactBuffer.data[t], n = e.index, a = e.body, c = e.weight, m = e.mass, u = e.normal, _ = s[n], f = this.m_accumulationBuffer[n] + o * c, d = st.MulSV(l * c * m * f, u, i);
r[n].SelfMulSub(h, d);
a.ApplyLinearImpulse(d, _, !0);
}
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const e = this.m_contactBuffer.data[t], s = e.indexA, n = e.indexB, o = e.weight, a = e.normal, h = this.m_accumulationBuffer[s] + this.m_accumulationBuffer[n], c = st.MulSV(l * o * h, a, i);
r[s].SelfSub(c);
r[n].SelfAdd(c);
}
}
SolveDamping(t) {
const e = Ns.SolveDamping_s_v, i = Ns.SolveDamping_s_f;
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const s = this.m_positionBuffer.data, r = this.m_velocityBuffer.data, n = this.m_def.dampingStrength, o = 1 / this.GetCriticalVelocity(t), a = this.GetParticleInvMass();
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const l = this.m_bodyContactBuffer.data[t], h = l.index, c = l.body, m = l.weight, u = l.mass, _ = l.normal, f = s[h], d = st.SubVV(c.GetLinearVelocityFromWorldPoint(f, st.s_t0), r[h], e), p = st.DotVV(d, _);
if (p < 0) {
const t = U(n * m, J(-o * p, .5)), e = st.MulSV(t * u * p, _, i);
r[h].SelfMulAdd(a, e);
c.ApplyLinearImpulse(e.SelfNeg(), f, !0);
}
}
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const s = this.m_contactBuffer.data[t], a = s.indexA, l = s.indexB, h = s.weight, c = s.normal, m = st.SubVV(r[l], r[a], e), u = st.DotVV(m, c);
if (u < 0) {
const t = U(n * h, J(-o * u, .5)), e = st.MulSV(t * u, c, i);
r[a].SelfAdd(e);
r[l].SelfSub(e);
}
}
}
SolveRigidDamping() {
const t = Ns.SolveRigidDamping_s_t0, e = Ns.SolveRigidDamping_s_t1, i = Ns.SolveRigidDamping_s_p, s = Ns.SolveRigidDamping_s_v, r = [ 0 ], n = [ 0 ], o = [ 0 ], a = [ 0 ], l = [ 0 ], h = [ 0 ];
if (!this.m_positionBuffer.data) throw new Error();
const c = this.m_positionBuffer.data, m = this.m_def.dampingStrength;
for (let i = 0; i < this.m_bodyContactBuffer.count; i++) {
const u = this.m_bodyContactBuffer.data[i], _ = u.index, f = this.m_groupBuffer[_];
if (f && this.IsRigidGroup(f)) {
const i = u.body, d = u.normal, p = u.weight, y = c[_], b = st.SubVV(i.GetLinearVelocityFromWorldPoint(y, t), f.GetLinearVelocityFromWorldPoint(y, e), s), v = st.DotVV(b, d);
if (v < 0) {
this.InitDampingParameterWithRigidGroupOrParticle(r, n, o, !0, f, _, y, d);
this.InitDampingParameter(a, l, h, i.GetMass(), i.GetInertia() - i.GetMass() * i.GetLocalCenter().LengthSquared(), i.GetWorldCenter(), y, d);
const t = m * J(p, 1) * this.ComputeDampingImpulse(r[0], n[0], o[0], a[0], l[0], h[0], v);
this.ApplyDamping(r[0], n[0], o[0], !0, f, _, t, d);
i.ApplyLinearImpulse(st.MulSV(-t, d, st.s_t0), y, !0);
}
}
}
for (let u = 0; u < this.m_contactBuffer.count; u++) {
const _ = this.m_contactBuffer.data[u], f = _.indexA, d = _.indexB, p = _.normal, y = _.weight, b = this.m_groupBuffer[f], v = this.m_groupBuffer[d], g = this.IsRigidGroup(b), S = this.IsRigidGroup(v);
if (b !== v && (g || S)) {
const u = st.MidVV(c[f], c[d], i), _ = st.SubVV(this.GetLinearVelocity(v, d, u, t), this.GetLinearVelocity(b, f, u, e), s), x = st.DotVV(_, p);
if (x < 0) {
this.InitDampingParameterWithRigidGroupOrParticle(r, n, o, g, b, f, u, p);
this.InitDampingParameterWithRigidGroupOrParticle(a, l, h, S, v, d, u, p);
const t = m * y * this.ComputeDampingImpulse(r[0], n[0], o[0], a[0], l[0], h[0], x);
this.ApplyDamping(r[0], n[0], o[0], g, b, f, t, p);
this.ApplyDamping(a[0], l[0], h[0], S, v, d, -t, p);
}
}
}
}
SolveExtraDamping() {
const t = Ns.SolveExtraDamping_s_v, e = Ns.SolveExtraDamping_s_f;
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const i = this.m_velocityBuffer.data, s = this.m_positionBuffer.data, r = this.GetParticleInvMass();
for (let n = 0; n < this.m_bodyContactBuffer.count; n++) {
const o = this.m_bodyContactBuffer.data[n], a = o.index;
if (this.m_flagsBuffer.data[a] & Ns.k_extraDampingFlags) {
const n = o.body, l = o.mass, h = o.normal, c = s[a], m = st.SubVV(n.GetLinearVelocityFromWorldPoint(c, st.s_t0), i[a], t), u = st.DotVV(m, h);
if (u < 0) {
const t = st.MulSV(.5 * l * u, h, e);
i[a].SelfMulAdd(r, t);
n.ApplyLinearImpulse(t.SelfNeg(), c, !0);
}
}
}
}
SolveWall() {
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const t = this.m_velocityBuffer.data;
for (let i = 0; i < this.m_count; i++) this.m_flagsBuffer.data[i] & e.b2ParticleFlag.b2_wallParticle && t[i].SetZero();
}
SolveRigid(t) {
const i = Ns.SolveRigid_s_position, s = Ns.SolveRigid_s_rotation, r = Ns.SolveRigid_s_transform, n = Ns.SolveRigid_s_velocityTransform;
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const o = this.m_positionBuffer.data, a = this.m_velocityBuffer.data;
for (let l = this.m_groupList; l; l = l.GetNext()) if (l.m_groupFlags & e.b2ParticleGroupFlag.b2_rigidParticleGroup) {
l.UpdateStatistics();
const e = s;
e.SetAngle(t.dt * l.m_angularVelocity);
const h = st.AddVV(l.m_center, st.SubVV(st.MulSV(t.dt, l.m_linearVelocity, st.s_t0), lt.MulRV(e, l.m_center, st.s_t1), st.s_t0), i), c = r;
c.SetPositionRotation(h, e);
ht.MulXX(c, l.m_transform, l.m_transform);
const m = n;
m.p.x = t.inv_dt * c.p.x;
m.p.y = t.inv_dt * c.p.y;
m.q.s = t.inv_dt * c.q.s;
m.q.c = t.inv_dt * (c.q.c - 1);
for (let t = l.m_firstIndex; t < l.m_lastIndex; t++) ht.MulXV(m, o[t], a[t]);
}
}
SolveElastic(t) {
const i = Ns.SolveElastic_s_pa, s = Ns.SolveElastic_s_pb, r = Ns.SolveElastic_s_pc, n = Ns.SolveElastic_s_r, o = Ns.SolveElastic_s_t0;
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const a = this.m_positionBuffer.data, l = this.m_velocityBuffer.data, h = t.inv_dt * this.m_def.elasticStrength;
for (let c = 0; c < this.m_triadBuffer.count; c++) {
const m = this.m_triadBuffer.data[c];
if (m.flags & e.b2ParticleFlag.b2_elasticParticle) {
const e = m.indexA, c = m.indexB, u = m.indexC, _ = m.pa, f = m.pb, d = m.pc, p = i.Copy(a[e]), y = s.Copy(a[c]), b = r.Copy(a[u]), v = l[e], g = l[c], S = l[u];
p.SelfMulAdd(t.dt, v);
y.SelfMulAdd(t.dt, g);
b.SelfMulAdd(t.dt, S);
const x = (p.x + y.x + b.x) / 3, A = (p.y + y.y + b.y) / 3;
p.x -= x;
p.y -= A;
y.x -= x;
y.y -= A;
b.x -= x;
b.y -= A;
const B = n;
B.s = st.CrossVV(_, p) + st.CrossVV(f, y) + st.CrossVV(d, b);
B.c = st.DotVV(_, p) + st.DotVV(f, y) + st.DotVV(d, b);
let w = X(B.s * B.s + B.c * B.c);
isFinite(w) || (w = 198177537e11);
B.s *= w;
B.c *= w;
const C = h * m.strength;
lt.MulRV(B, _, o);
st.SubVV(o, p, o);
st.MulSV(C, o, o);
v.SelfAdd(o);
lt.MulRV(B, f, o);
st.SubVV(o, y, o);
st.MulSV(C, o, o);
g.SelfAdd(o);
lt.MulRV(B, d, o);
st.SubVV(o, b, o);
st.MulSV(C, o, o);
S.SelfAdd(o);
}
}
}
SolveSpring(t) {
const i = Ns.SolveSpring_s_pa, s = Ns.SolveSpring_s_pb, r = Ns.SolveSpring_s_d, n = Ns.SolveSpring_s_f;
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const o = this.m_positionBuffer.data, a = this.m_velocityBuffer.data, l = t.inv_dt * this.m_def.springStrength;
for (let h = 0; h < this.m_pairBuffer.count; h++) {
const c = this.m_pairBuffer.data[h];
if (c.flags & e.b2ParticleFlag.b2_springParticle) {
const e = c.indexA, h = c.indexB, m = i.Copy(o[e]), u = s.Copy(o[h]), _ = a[e], f = a[h];
m.SelfMulAdd(t.dt, _);
u.SelfMulAdd(t.dt, f);
const d = st.SubVV(u, m, r), p = c.distance, y = d.Length(), b = l * c.strength, v = st.MulSV(b * (p - y) / y, d, n);
_.SelfSub(v);
f.SelfAdd(v);
}
}
}
SolveTensile(t) {
const i = Ns.SolveTensile_s_weightedNormal, s = Ns.SolveTensile_s_s, r = Ns.SolveTensile_s_f;
if (!this.m_velocityBuffer.data) throw new Error();
const n = this.m_velocityBuffer.data;
for (let t = 0; t < this.m_count; t++) {
this.m_accumulation2Buffer[t] = new st();
this.m_accumulation2Buffer[t].SetZero();
}
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const s = this.m_contactBuffer.data[t];
if (s.flags & e.b2ParticleFlag.b2_tensileParticle) {
const t = s.indexA, e = s.indexB, r = s.weight, n = s.normal, o = st.MulSV((1 - r) * r, n, i);
this.m_accumulation2Buffer[t].SelfSub(o);
this.m_accumulation2Buffer[e].SelfAdd(o);
}
}
const o = this.GetCriticalVelocity(t), a = this.m_def.surfaceTensionPressureStrength * o, l = this.m_def.surfaceTensionNormalStrength * o, h = P * o;
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const i = this.m_contactBuffer.data[t];
if (i.flags & e.b2ParticleFlag.b2_tensileParticle) {
const t = i.indexA, e = i.indexB, o = i.weight, c = i.normal, m = this.m_weightBuffer[t] + this.m_weightBuffer[e], u = st.SubVV(this.m_accumulation2Buffer[e], this.m_accumulation2Buffer[t], s), _ = J(a * (m - 2) + l * st.DotVV(u, c), h) * o, f = st.MulSV(_, c, r);
n[t].SelfSub(f);
n[e].SelfAdd(f);
}
}
}
SolveViscous() {
const t = Ns.SolveViscous_s_v, i = Ns.SolveViscous_s_f;
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const s = this.m_positionBuffer.data, r = this.m_velocityBuffer.data, n = this.m_def.viscousStrength, o = this.GetParticleInvMass();
for (let a = 0; a < this.m_bodyContactBuffer.count; a++) {
const l = this.m_bodyContactBuffer.data[a], h = l.index;
if (this.m_flagsBuffer.data[h] & e.b2ParticleFlag.b2_viscousParticle) {
const e = l.body, a = l.weight, c = l.mass, m = s[h], u = st.SubVV(e.GetLinearVelocityFromWorldPoint(m, st.s_t0), r[h], t), _ = st.MulSV(n * c * a, u, i);
r[h].SelfMulAdd(o, _);
e.ApplyLinearImpulse(_.SelfNeg(), m, !0);
}
}
for (let s = 0; s < this.m_contactBuffer.count; s++) {
const o = this.m_contactBuffer.data[s];
if (o.flags & e.b2ParticleFlag.b2_viscousParticle) {
const e = o.indexA, s = o.indexB, a = o.weight, l = st.SubVV(r[s], r[e], t), h = st.MulSV(n * a, l, i);
r[e].SelfAdd(h);
r[s].SelfSub(h);
}
}
}
SolveRepulsive(t) {
const i = Ns.SolveRepulsive_s_f;
if (!this.m_velocityBuffer.data) throw new Error();
const s = this.m_velocityBuffer.data, r = this.m_def.repulsiveStrength * this.GetCriticalVelocity(t);
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const n = this.m_contactBuffer.data[t];
if (n.flags & e.b2ParticleFlag.b2_repulsiveParticle) {
const t = n.indexA, e = n.indexB;
if (this.m_groupBuffer[t] !== this.m_groupBuffer[e]) {
const o = n.weight, a = n.normal, l = st.MulSV(r * o, a, i);
s[t].SelfSub(l);
s[e].SelfAdd(l);
}
}
}
}
SolvePowder(t) {
const i = Ns.SolvePowder_s_f;
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
const s = this.m_positionBuffer.data, r = this.m_velocityBuffer.data, n = this.m_def.powderStrength * this.GetCriticalVelocity(t), o = 1 - C, a = this.GetParticleInvMass();
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const l = this.m_bodyContactBuffer.data[t], h = l.index;
if (this.m_flagsBuffer.data[h] & e.b2ParticleFlag.b2_powderParticle) {
const t = l.weight;
if (t > o) {
const e = l.body, c = l.mass, m = s[h], u = l.normal, _ = st.MulSV(n * c * (t - o), u, i);
r[h].SelfMulSub(a, _);
e.ApplyLinearImpulse(_, m, !0);
}
}
}
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const s = this.m_contactBuffer.data[t];
if (s.flags & e.b2ParticleFlag.b2_powderParticle) {
const t = s.weight;
if (t > o) {
const e = s.indexA, a = s.indexB, l = s.normal, h = st.MulSV(n * (t - o), l, i);
r[e].SelfSub(h);
r[a].SelfAdd(h);
}
}
}
}
SolveSolid(t) {
const e = Ns.SolveSolid_s_f;
if (!this.m_velocityBuffer.data) throw new Error();
const i = this.m_velocityBuffer.data;
this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer);
const s = t.inv_dt * this.m_def.ejectionStrength;
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const r = this.m_contactBuffer.data[t], n = r.indexA, o = r.indexB;
if (this.m_groupBuffer[n] !== this.m_groupBuffer[o]) {
const t = r.weight, a = r.normal, l = this.m_depthBuffer[n] + this.m_depthBuffer[o], h = st.MulSV(s * l * t, a, e);
i[n].SelfSub(h);
i[o].SelfAdd(h);
}
}
}
SolveForce(t) {
if (!this.m_velocityBuffer.data) throw new Error();
const e = this.m_velocityBuffer.data, i = t.dt * this.GetParticleInvMass();
for (let t = 0; t < this.m_count; t++) e[t].SelfMulAdd(i, this.m_forceBuffer[t]);
this.m_hasForce = !1;
}
SolveColorMixing() {
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_colorBuffer.data) throw new Error();
const t = .5 * this.m_def.colorMixingStrength;
if (t) for (let i = 0; i < this.m_contactBuffer.count; i++) {
const s = this.m_contactBuffer.data[i], r = s.indexA, n = s.indexB;
if (this.m_flagsBuffer.data[r] & this.m_flagsBuffer.data[n] & e.b2ParticleFlag.b2_colorMixingParticle) {
const e = this.m_colorBuffer.data[r], i = this.m_colorBuffer.data[n];
mt.MixColors(e, i, t);
}
}
}
SolveZombie() {
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
let t = 0;
const i = [];
for (let t = 0; t < this.m_count; t++) i[t] = w;
let s = 0;
for (let r = 0; r < this.m_count; r++) {
const n = this.m_flagsBuffer.data[r];
if (n & e.b2ParticleFlag.b2_zombieParticle) {
const t = this.m_world.m_destructionListener;
n & e.b2ParticleFlag.b2_destructionListenerParticle && t && t.SayGoodbyeParticle(this, r);
if (this.m_handleIndexBuffer.data) {
const t = this.m_handleIndexBuffer.data[r];
if (t) {
t.SetIndex(w);
this.m_handleIndexBuffer.data[r] = null;
}
}
i[r] = w;
} else {
i[r] = t;
if (r !== t) {
if (this.m_handleIndexBuffer.data) {
const e = this.m_handleIndexBuffer.data[r];
e && e.SetIndex(t);
this.m_handleIndexBuffer.data[t] = e;
}
this.m_flagsBuffer.data[t] = this.m_flagsBuffer.data[r];
this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[t] = this.m_lastBodyContactStepBuffer.data[r]);
this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[t] = this.m_bodyContactCountBuffer.data[r]);
this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[t] = this.m_consecutiveContactStepsBuffer.data[r]);
this.m_positionBuffer.data[t].Copy(this.m_positionBuffer.data[r]);
this.m_velocityBuffer.data[t].Copy(this.m_velocityBuffer.data[r]);
this.m_groupBuffer[t] = this.m_groupBuffer[r];
this.m_hasForce && this.m_forceBuffer[t].Copy(this.m_forceBuffer[r]);
this.m_staticPressureBuffer && (this.m_staticPressureBuffer[t] = this.m_staticPressureBuffer[r]);
this.m_depthBuffer && (this.m_depthBuffer[t] = this.m_depthBuffer[r]);
this.m_colorBuffer.data && this.m_colorBuffer.data[t].Copy(this.m_colorBuffer.data[r]);
this.m_userDataBuffer.data && (this.m_userDataBuffer.data[t] = this.m_userDataBuffer.data[r]);
this.m_expirationTimeBuffer.data && (this.m_expirationTimeBuffer.data[t] = this.m_expirationTimeBuffer.data[r]);
}
t++;
s |= n;
}
}
for (let t = 0; t < this.m_proxyBuffer.count; t++) {
const e = this.m_proxyBuffer.data[t];
e.index = i[e.index];
}
this.m_proxyBuffer.RemoveIf(t => t.index < 0);
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const e = this.m_contactBuffer.data[t];
e.indexA = i[e.indexA];
e.indexB = i[e.indexB];
}
this.m_contactBuffer.RemoveIf(t => t.indexA < 0 || t.indexB < 0);
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const e = this.m_bodyContactBuffer.data[t];
e.index = i[e.index];
}
this.m_bodyContactBuffer.RemoveIf(t => t.index < 0);
for (let t = 0; t < this.m_pairBuffer.count; t++) {
const e = this.m_pairBuffer.data[t];
e.indexA = i[e.indexA];
e.indexB = i[e.indexB];
}
this.m_pairBuffer.RemoveIf(t => t.indexA < 0 || t.indexB < 0);
for (let t = 0; t < this.m_triadBuffer.count; t++) {
const e = this.m_triadBuffer.data[t];
e.indexA = i[e.indexA];
e.indexB = i[e.indexB];
e.indexC = i[e.indexC];
}
this.m_triadBuffer.RemoveIf(t => t.indexA < 0 || t.indexB < 0 || t.indexC < 0);
if (this.m_indexByExpirationTimeBuffer.data) {
let t = 0;
for (let e = 0; e < this.m_count; e++) {
const s = i[this.m_indexByExpirationTimeBuffer.data[e]];
s !== w && (this.m_indexByExpirationTimeBuffer.data[t++] = s);
}
}
for (let s = this.m_groupList; s; s = s.GetNext()) {
let r = t, n = 0, o = !1;
for (let t = s.m_firstIndex; t < s.m_lastIndex; t++) {
const e = i[t];
if (e >= 0) {
r = J(r, e);
n = U(n, e + 1);
} else o = !0;
}
if (r < n) {
s.m_firstIndex = r;
s.m_lastIndex = n;
o && s.m_groupFlags & e.b2ParticleGroupFlag.b2_solidParticleGroup && this.SetGroupFlags(s, s.m_groupFlags | e.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth);
} else {
s.m_firstIndex = 0;
s.m_lastIndex = 0;
s.m_groupFlags & e.b2ParticleGroupFlag.b2_particleGroupCanBeEmpty || this.SetGroupFlags(s, s.m_groupFlags | e.b2ParticleGroupFlag.b2_particleGroupWillBeDestroyed);
}
}
this.m_count = t;
this.m_allParticleFlags = s;
this.m_needsUpdateAllParticleFlags = !1;
for (let t = this.m_groupList; t; ) {
const i = t.GetNext();
t.m_groupFlags & e.b2ParticleGroupFlag.b2_particleGroupWillBeDestroyed && this.DestroyParticleGroup(t);
t = i;
}
}
SolveLifetimes(t) {
if (!this.m_expirationTimeBuffer.data) throw new Error();
if (!this.m_indexByExpirationTimeBuffer.data) throw new Error();
this.m_timeElapsed = this.LifetimeToExpirationTime(t.dt);
const e = this.GetQuantizedTimeElapsed(), i = this.m_expirationTimeBuffer.data, s = this.m_indexByExpirationTimeBuffer.data, r = this.GetParticleCount();
if (this.m_expirationTimeBufferRequiresSorting) {
Ms(s, 0, r, (t, e) => {
const s = i[t], r = i[e], n = s <= 0;
return n === r <= 0 ? s > r : n;
});
this.m_expirationTimeBufferRequiresSorting = !1;
}
for (let t = r - 1; t >= 0; --t) {
const r = s[t], n = i[r];
if (e < n || n <= 0) break;
this.DestroyParticle(r);
}
}
RotateBuffer(t, e, i) {
if (t !== e && e !== i) {
if (!this.m_flagsBuffer.data) throw new Error();
if (!this.m_positionBuffer.data) throw new Error();
if (!this.m_velocityBuffer.data) throw new Error();
Ts(this.m_flagsBuffer.data, t, e, i);
this.m_lastBodyContactStepBuffer.data && Ts(this.m_lastBodyContactStepBuffer.data, t, e, i);
this.m_bodyContactCountBuffer.data && Ts(this.m_bodyContactCountBuffer.data, t, e, i);
this.m_consecutiveContactStepsBuffer.data && Ts(this.m_consecutiveContactStepsBuffer.data, t, e, i);
Ts(this.m_positionBuffer.data, t, e, i);
Ts(this.m_velocityBuffer.data, t, e, i);
Ts(this.m_groupBuffer, t, e, i);
this.m_hasForce && Ts(this.m_forceBuffer, t, e, i);
this.m_staticPressureBuffer && Ts(this.m_staticPressureBuffer, t, e, i);
this.m_depthBuffer && Ts(this.m_depthBuffer, t, e, i);
this.m_colorBuffer.data && Ts(this.m_colorBuffer.data, t, e, i);
this.m_userDataBuffer.data && Ts(this.m_userDataBuffer.data, t, e, i);
if (this.m_handleIndexBuffer.data) {
Ts(this.m_handleIndexBuffer.data, t, e, i);
for (let e = t; e < i; ++e) {
const t = this.m_handleIndexBuffer.data[e];
t && t.SetIndex(s(t.GetIndex()));
}
}
if (this.m_expirationTimeBuffer.data) {
Ts(this.m_expirationTimeBuffer.data, t, e, i);
const r = this.GetParticleCount();
if (!this.m_indexByExpirationTimeBuffer.data) throw new Error();
const n = this.m_indexByExpirationTimeBuffer.data;
for (let t = 0; t < r; ++t) n[t] = s(n[t]);
}
for (let t = 0; t < this.m_proxyBuffer.count; t++) {
const e = this.m_proxyBuffer.data[t];
e.index = s(e.index);
}
for (let t = 0; t < this.m_contactBuffer.count; t++) {
const e = this.m_contactBuffer.data[t];
e.indexA = s(e.indexA);
e.indexB = s(e.indexB);
}
for (let t = 0; t < this.m_bodyContactBuffer.count; t++) {
const e = this.m_bodyContactBuffer.data[t];
e.index = s(e.index);
}
for (let t = 0; t < this.m_pairBuffer.count; t++) {
const e = this.m_pairBuffer.data[t];
e.indexA = s(e.indexA);
e.indexB = s(e.indexB);
}
for (let t = 0; t < this.m_triadBuffer.count; t++) {
const e = this.m_triadBuffer.data[t];
e.indexA = s(e.indexA);
e.indexB = s(e.indexB);
e.indexC = s(e.indexC);
}
for (let t = this.m_groupList; t; t = t.GetNext()) {
t.m_firstIndex = s(t.m_firstIndex);
t.m_lastIndex = s(t.m_lastIndex - 1) + 1;
}
}
function s(s) {
return s < t ? s : s < e ? s + i - e : s < i ? s + t - e : s;
}
}
GetCriticalVelocity(t) {
return this.m_particleDiameter * t.inv_dt;
}
GetCriticalVelocitySquared(t) {
const e = this.GetCriticalVelocity(t);
return e * e;
}
GetCriticalPressure(t) {
return this.m_def.density * this.GetCriticalVelocitySquared(t);
}
GetParticleStride() {
return C * this.m_particleDiameter;
}
GetParticleMass() {
const t = this.GetParticleStride();
return this.m_def.density * t * t;
}
GetParticleInvMass() {
const t = this.m_inverseDiameter * (1 / C);
return this.m_inverseDensity * t * t;
}
GetFixtureContactFilter() {
return this.m_allParticleFlags & e.b2ParticleFlag.b2_fixtureContactFilterParticle ? this.m_world.m_contactManager.m_contactFilter : null;
}
GetParticleContactFilter() {
return this.m_allParticleFlags & e.b2ParticleFlag.b2_particleContactFilterParticle ? this.m_world.m_contactManager.m_contactFilter : null;
}
GetFixtureContactListener() {
return this.m_allParticleFlags & e.b2ParticleFlag.b2_fixtureContactListenerParticle ? this.m_world.m_contactManager.m_contactListener : null;
}
GetParticleContactListener() {
return this.m_allParticleFlags & e.b2ParticleFlag.b2_particleContactListenerParticle ? this.m_world.m_contactManager.m_contactListener : null;
}
SetUserOverridableBuffer(t, e, i) {
t.data = e;
t.userSuppliedCapacity = i;
}
SetGroupFlags(t, i) {
const s = t.m_groupFlags;
(s ^ i) & e.b2ParticleGroupFlag.b2_solidParticleGroup && (i |= e.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth);
s & ~i && (this.m_needsUpdateAllGroupFlags = !0);
if (~this.m_allGroupFlags & i) {
i & e.b2ParticleGroupFlag.b2_solidParticleGroup && (this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer));
this.m_allGroupFlags |= i;
}
t.m_groupFlags = i;
}
static BodyContactCompare(t, e) {
return t.index === e.index ? t.weight > e.weight : t.index < e.index;
}
RemoveSpuriousBodyContacts() {
Ms(this.m_bodyContactBuffer.data, 0, this.m_bodyContactBuffer.count, Ns.BodyContactCompare);
const t = Ns.RemoveSpuriousBodyContacts_s_n, e = Ns.RemoveSpuriousBodyContacts_s_pos, i = Ns.RemoveSpuriousBodyContacts_s_normal, s = this;
let r = -1, n = 0;
this.m_bodyContactBuffer.count = Is(this.m_bodyContactBuffer.data, o => {
if (o.index !== r) {
n = 0;
r = o.index;
}
if (n++ > 3) return !0;
const a = t.Copy(o.normal);
a.SelfMul(s.m_particleDiameter * (1 - o.weight));
if (!s.m_positionBuffer.data) throw new Error();
const l = st.AddVV(s.m_positionBuffer.data[o.index], a, e);
if (!o.fixture.TestPoint(l)) {
const t = o.fixture.GetShape().GetChildCount();
for (let e = 0; e < t; e++) {
const t = i;
if (o.fixture.ComputeDistance(l, t, e) < m) return !1;
}
return !0;
}
return !1;
}, this.m_bodyContactBuffer.count);
}
DetectStuckParticle(t) {
if (!(this.m_stuckThreshold <= 0)) {
if (!this.m_bodyContactCountBuffer.data) throw new Error();
if (!this.m_consecutiveContactStepsBuffer.data) throw new Error();
if (!this.m_lastBodyContactStepBuffer.data) throw new Error();
++this.m_bodyContactCountBuffer.data[t];
if (2 === this.m_bodyContactCountBuffer.data[t]) {
++this.m_consecutiveContactStepsBuffer.data[t];
this.m_consecutiveContactStepsBuffer.data[t] > this.m_stuckThreshold && (this.m_stuckParticleBuffer.data[this.m_stuckParticleBuffer.Append()] = t);
}
this.m_lastBodyContactStepBuffer.data[t] = this.m_timestamp;
}
}
ValidateParticleIndex(t) {
return t >= 0 && t < this.GetParticleCount() && t !== w;
}
GetQuantizedTimeElapsed() {
return Math.floor(this.m_timeElapsed / 4294967296);
}
LifetimeToExpirationTime(t) {
return this.m_timeElapsed + Math.floor(t / this.m_def.lifetimeGranularity * 4294967296);
}
ForceCanBeApplied(t) {
return !(t & e.b2ParticleFlag.b2_wallParticle);
}
PrepareForceBuffer() {
if (!this.m_hasForce) {
for (let t = 0; t < this.m_count; t++) this.m_forceBuffer[t].SetZero();
this.m_hasForce = !0;
}
}
IsRigidGroup(t) {
return null !== t && 0 != (t.m_groupFlags & e.b2ParticleGroupFlag.b2_rigidParticleGroup);
}
GetLinearVelocity(t, e, i, s) {
if (t && this.IsRigidGroup(t)) return t.GetLinearVelocityFromWorldPoint(i, s);
if (!this.m_velocityBuffer.data) throw new Error();
return s.Copy(this.m_velocityBuffer.data[e]);
}
InitDampingParameter(t, e, i, s, r, n, o, a) {
t[0] = s > 0 ? 1 / s : 0;
e[0] = r > 0 ? 1 / r : 0;
i[0] = st.CrossVV(st.SubVV(o, n, st.s_t0), a);
}
InitDampingParameterWithRigidGroupOrParticle(t, i, s, r, n, o, a, l) {
if (n && r) this.InitDampingParameter(t, i, s, n.GetMass(), n.GetInertia(), n.GetCenter(), a, l); else {
if (!this.m_flagsBuffer.data) throw new Error();
const r = this.m_flagsBuffer.data[o];
this.InitDampingParameter(t, i, s, r & e.b2ParticleFlag.b2_wallParticle ? 0 : this.GetParticleMass(), 0, a, a, l);
}
}
ComputeDampingImpulse(t, e, i, s, r, n, o) {
const a = t + e * i * i + s + r * n * n;
return a > 0 ? o / a : 0;
}
ApplyDamping(t, e, i, s, r, n, o, a) {
if (r && s) {
r.m_linearVelocity.SelfMulAdd(o * t, a);
r.m_angularVelocity += o * i * e;
} else {
if (!this.m_velocityBuffer.data) throw new Error();
this.m_velocityBuffer.data[n].SelfMulAdd(o * t, a);
}
}
}
Ns.xTruncBits = 12;
Ns.yTruncBits = 12;
Ns.tagBits = 32;
Ns.yOffset = 1 << Ns.yTruncBits - 1;
Ns.yShift = Ns.tagBits - Ns.yTruncBits;
Ns.xShift = Ns.tagBits - Ns.yTruncBits - Ns.xTruncBits;
Ns.xScale = 1 << Ns.xShift;
Ns.xOffset = Ns.xScale * (1 << Ns.xTruncBits - 1);
Ns.yMask = (1 << Ns.yTruncBits) - 1 << Ns.yShift;
Ns.xMask = ~Ns.yMask;
Ns.DestroyParticlesInShape_s_aabb = new Ut();
Ns.CreateParticleGroup_s_transform = new ht();
Ns.ComputeCollisionEnergy_s_v = new st();
Ns.QueryShapeAABB_s_aabb = new Ut();
Ns.QueryPointAABB_s_aabb = new Ut();
Ns.RayCast_s_aabb = new Ut();
Ns.RayCast_s_p = new st();
Ns.RayCast_s_v = new st();
Ns.RayCast_s_n = new st();
Ns.RayCast_s_point = new st();
Ns.k_pairFlags = e.b2ParticleFlag.b2_springParticle;
Ns.k_triadFlags = e.b2ParticleFlag.b2_elasticParticle;
Ns.k_noPressureFlags = e.b2ParticleFlag.b2_powderParticle | e.b2ParticleFlag.b2_tensileParticle;
Ns.k_extraDampingFlags = e.b2ParticleFlag.b2_staticPressureParticle;
Ns.k_barrierWallFlags = e.b2ParticleFlag.b2_barrierParticle | e.b2ParticleFlag.b2_wallParticle;
Ns.CreateParticlesStrokeShapeForGroup_s_edge = new vi();
Ns.CreateParticlesStrokeShapeForGroup_s_d = new st();
Ns.CreateParticlesStrokeShapeForGroup_s_p = new st();
Ns.CreateParticlesFillShapeForGroup_s_aabb = new Ut();
Ns.CreateParticlesFillShapeForGroup_s_p = new st();
Ns.UpdatePairsAndTriads_s_dab = new st();
Ns.UpdatePairsAndTriads_s_dbc = new st();
Ns.UpdatePairsAndTriads_s_dca = new st();
Ns.AddContact_s_d = new st();
Ns.UpdateBodyContacts_s_aabb = new Ut();
Ns.Solve_s_subStep = new as();
Ns.SolveCollision_s_aabb = new Ut();
Ns.SolveGravity_s_gravity = new st();
Ns.SolveBarrier_s_aabb = new Ut();
Ns.SolveBarrier_s_va = new st();
Ns.SolveBarrier_s_vb = new st();
Ns.SolveBarrier_s_pba = new st();
Ns.SolveBarrier_s_vba = new st();
Ns.SolveBarrier_s_vc = new st();
Ns.SolveBarrier_s_pca = new st();
Ns.SolveBarrier_s_vca = new st();
Ns.SolveBarrier_s_qba = new st();
Ns.SolveBarrier_s_qca = new st();
Ns.SolveBarrier_s_dv = new st();
Ns.SolveBarrier_s_f = new st();
Ns.SolvePressure_s_f = new st();
Ns.SolveDamping_s_v = new st();
Ns.SolveDamping_s_f = new st();
Ns.SolveRigidDamping_s_t0 = new st();
Ns.SolveRigidDamping_s_t1 = new st();
Ns.SolveRigidDamping_s_p = new st();
Ns.SolveRigidDamping_s_v = new st();
Ns.SolveExtraDamping_s_v = new st();
Ns.SolveExtraDamping_s_f = new st();
Ns.SolveRigid_s_position = new st();
Ns.SolveRigid_s_rotation = new lt();
Ns.SolveRigid_s_transform = new ht();
Ns.SolveRigid_s_velocityTransform = new ht();
Ns.SolveElastic_s_pa = new st();
Ns.SolveElastic_s_pb = new st();
Ns.SolveElastic_s_pc = new st();
Ns.SolveElastic_s_r = new lt();
Ns.SolveElastic_s_t0 = new st();
Ns.SolveSpring_s_pa = new st();
Ns.SolveSpring_s_pb = new st();
Ns.SolveSpring_s_d = new st();
Ns.SolveSpring_s_f = new st();
Ns.SolveTensile_s_weightedNormal = new st();
Ns.SolveTensile_s_s = new st();
Ns.SolveTensile_s_f = new st();
Ns.SolveViscous_s_v = new st();
Ns.SolveViscous_s_f = new st();
Ns.SolveRepulsive_s_f = new st();
Ns.SolvePowder_s_f = new st();
Ns.SolveSolid_s_f = new st();
Ns.RemoveSpuriousBodyContacts_s_n = new st();
Ns.RemoveSpuriousBodyContacts_s_pos = new st();
Ns.RemoveSpuriousBodyContacts_s_normal = new st();
(function(t) {
t.UserOverridableBuffer = class {
constructor() {
this.data = null;
this.userSuppliedCapacity = 0;
}
};
t.Proxy = class {
constructor() {
this.index = w;
this.tag = 0;
}
static CompareProxyProxy(t, e) {
return t.tag < e.tag;
}
static CompareTagProxy(t, e) {
return t < e.tag;
}
static CompareProxyTag(t, e) {
return t.tag < e;
}
};
t.InsideBoundsEnumerator = class {
constructor(e, i, s, r, n) {
this.m_system = e;
this.m_xLower = (i & t.xMask) >>> 0;
this.m_xUpper = (s & t.xMask) >>> 0;
this.m_yLower = (i & t.yMask) >>> 0;
this.m_yUpper = (s & t.yMask) >>> 0;
this.m_first = r;
this.m_last = n;
}
GetNext() {
for (;this.m_first < this.m_last; ) {
const e = (this.m_system.m_proxyBuffer.data[this.m_first].tag & t.xMask) >>> 0;
if (e >= this.m_xLower && e <= this.m_xUpper) return this.m_system.m_proxyBuffer.data[this.m_first++].index;
this.m_first++;
}
return w;
}
};
t.ParticleListNode = class {
constructor() {
this.next = null;
this.count = 0;
this.index = 0;
}
};
t.FixedSetAllocator = class {
Allocate(t, e) {
return e;
}
Clear() {}
GetCount() {
return 0;
}
Invalidate(t) {}
GetValidBuffer() {
return [];
}
GetBuffer() {
return [];
}
SetCount(t) {}
};
t.FixtureParticle = class {
constructor(t, e) {
this.second = w;
this.first = t;
this.second = e;
}
};
t.FixtureParticleSet = class extends t.FixedSetAllocator {
Initialize(t, e) {}
Find(t) {
return w;
}
};
t.ParticlePair = class {
constructor(t, e) {
this.first = w;
this.second = w;
this.first = t;
this.second = e;
}
};
t.b2ParticlePairSet = class extends t.FixedSetAllocator {
Initialize(t, e) {}
Find(t) {
return w;
}
};
t.ConnectionFilter = class {
IsNecessary(t) {
return !0;
}
ShouldCreatePair(t, e) {
return !0;
}
ShouldCreateTriad(t, e, i) {
return !0;
}
};
t.DestroyParticlesInShapeCallback = class extends rs {
constructor(t, e, i, s) {
super();
this.m_callDestructionListener = !1;
this.m_destroyed = 0;
this.m_system = t;
this.m_shape = e;
this.m_xf = i;
this.m_callDestructionListener = s;
this.m_destroyed = 0;
}
ReportFixture(t) {
return !1;
}
ReportParticle(t, e) {
if (t !== this.m_system) return !1;
if (!this.m_system.m_positionBuffer.data) throw new Error();
if (this.m_shape.TestPoint(this.m_xf, this.m_system.m_positionBuffer.data[e])) {
this.m_system.DestroyParticle(e, this.m_callDestructionListener);
this.m_destroyed++;
}
return !0;
}
Destroyed() {
return this.m_destroyed;
}
};
t.JoinParticleGroupsFilter = class extends t.ConnectionFilter {
constructor(t) {
super();
this.m_threshold = 0;
this.m_threshold = t;
}
ShouldCreatePair(t, e) {
return t < this.m_threshold && this.m_threshold <= e || e < this.m_threshold && this.m_threshold <= t;
}
ShouldCreateTriad(t, e, i) {
return (t < this.m_threshold || e < this.m_threshold || i < this.m_threshold) && (this.m_threshold <= t || this.m_threshold <= e || this.m_threshold <= i);
}
};
t.CompositeShape = class extends pi {
constructor(t, i = t.length) {
super(e.b2ShapeType.e_unknown, 0);
this.m_shapeCount = 0;
this.m_shapes = t;
this.m_shapeCount = i;
}
Clone() {
throw new Error();
}
GetChildCount() {
return 1;
}
TestPoint(t, e) {
for (let i = 0; i < this.m_shapeCount; i++) if (this.m_shapes[i].TestPoint(t, e)) return !0;
return !1;
}
ComputeDistance(t, e, i, s) {
return 0;
}
RayCast(t, e, i, s) {
return !1;
}
ComputeAABB(t, e, i) {
const r = new Ut();
t.lowerBound.x = +s;
t.lowerBound.y = +s;
t.upperBound.x = -s;
t.upperBound.y = -s;
for (let i = 0; i < this.m_shapeCount; i++) {
const s = this.m_shapes[i].GetChildCount();
for (let n = 0; n < s; n++) {
const s = r;
this.m_shapes[i].ComputeAABB(s, e, n);
t.Combine1(s);
}
}
}
ComputeMass(t, e) {}
SetupDistanceProxy(t, e) {}
ComputeSubmergedArea(t, e, i, s) {
return 0;
}
Dump(t) {}
};
t.ReactiveFilter = class extends t.ConnectionFilter {
constructor(t) {
super();
this.m_flagsBuffer = t;
}
IsNecessary(t) {
if (!this.m_flagsBuffer.data) throw new Error();
return 0 != (this.m_flagsBuffer.data[t] & e.b2ParticleFlag.b2_reactiveParticle);
}
};
class i extends Ls {
constructor(t, e) {
super(t);
this.m_contactFilter = e;
}
ShouldCollideFixtureParticle(t, i, s) {
return !(this.m_contactFilter && this.m_system.GetFlagsBuffer()[s] & e.b2ParticleFlag.b2_fixtureContactFilterParticle) || this.m_contactFilter.ShouldCollideFixtureParticle(t, this.m_system, s);
}
ReportFixtureAndParticle(i, s, r) {
const n = t.UpdateBodyContactsCallback.ReportFixtureAndParticle_s_n, o = t.UpdateBodyContactsCallback.ReportFixtureAndParticle_s_rp;
if (!this.m_system.m_flagsBuffer.data) throw new Error();
if (!this.m_system.m_positionBuffer.data) throw new Error();
const a = this.m_system.m_positionBuffer.data[r], l = n, h = i.ComputeDistance(a, l, s);
if (h < this.m_system.m_particleDiameter && this.ShouldCollideFixtureParticle(i, this.m_system, r)) {
const t = i.GetBody(), s = t.GetWorldCenter(), n = t.GetMass(), c = t.GetInertia() - n * t.GetLocalCenter().LengthSquared(), m = n > 0 ? 1 / n : 0, u = c > 0 ? 1 / c : 0, _ = this.m_system.m_flagsBuffer.data[r] & e.b2ParticleFlag.b2_wallParticle ? 0 : this.m_system.GetParticleInvMass(), f = st.SubVV(a, s, o), d = st.CrossVV(f, l), p = _ + m + u * d * d, y = this.m_system.m_bodyContactBuffer.data[this.m_system.m_bodyContactBuffer.Append()];
y.index = r;
y.body = t;
y.fixture = i;
y.weight = 1 - h * this.m_system.m_inverseDiameter;
y.normal.Copy(l.SelfNeg());
y.mass = p > 0 ? 1 / p : 0;
this.m_system.DetectStuckParticle(r);
}
}
}
i.ReportFixtureAndParticle_s_n = new st();
i.ReportFixtureAndParticle_s_rp = new st();
t.UpdateBodyContactsCallback = i;
class r extends Ls {
constructor(t, e) {
super(t);
this.m_step = e;
}
ReportFixtureAndParticle(i, s, r) {
const n = t.SolveCollisionCallback.ReportFixtureAndParticle_s_p1, o = t.SolveCollisionCallback.ReportFixtureAndParticle_s_output, a = t.SolveCollisionCallback.ReportFixtureAndParticle_s_input, l = t.SolveCollisionCallback.ReportFixtureAndParticle_s_p, h = t.SolveCollisionCallback.ReportFixtureAndParticle_s_v, c = t.SolveCollisionCallback.ReportFixtureAndParticle_s_f, u = i.GetBody();
if (!this.m_system.m_positionBuffer.data) throw new Error();
if (!this.m_system.m_velocityBuffer.data) throw new Error();
const _ = this.m_system.m_positionBuffer.data[r], f = this.m_system.m_velocityBuffer.data[r], d = o, p = a;
if (0 === this.m_system.m_iterationIndex) {
const t = ht.MulTXV(u.m_xf0, _, n);
if (i.GetShape().GetType() === e.b2ShapeType.e_circleShape) {
t.SelfSub(u.GetLocalCenter());
lt.MulRV(u.m_xf0.q, t, t);
lt.MulTRV(u.m_xf.q, t, t);
t.SelfAdd(u.GetLocalCenter());
}
ht.MulXV(u.m_xf, t, p.p1);
} else p.p1.Copy(_);
st.AddVMulSV(_, this.m_step.dt, f, p.p2);
p.maxFraction = 1;
if (i.RayCast(d, p, s)) {
const t = d.normal, e = l;
e.x = (1 - d.fraction) * p.p1.x + d.fraction * p.p2.x + m * t.x;
e.y = (1 - d.fraction) * p.p1.y + d.fraction * p.p2.y + m * t.y;
const i = h;
i.x = this.m_step.inv_dt * (e.x - _.x);
i.y = this.m_step.inv_dt * (e.y - _.y);
this.m_system.m_velocityBuffer.data[r].Copy(i);
const s = c;
s.x = this.m_step.inv_dt * this.m_system.GetParticleMass() * (f.x - i.x);
s.y = this.m_step.inv_dt * this.m_system.GetParticleMass() * (f.y - i.y);
this.m_system.ParticleApplyForce(r, s);
}
}
ReportParticle(t, e) {
return !1;
}
}
r.ReportFixtureAndParticle_s_p1 = new st();
r.ReportFixtureAndParticle_s_output = new Jt();
r.ReportFixtureAndParticle_s_input = new zt();
r.ReportFixtureAndParticle_s_p = new st();
r.ReportFixtureAndParticle_s_v = new st();
r.ReportFixtureAndParticle_s_f = new st();
t.SolveCollisionCallback = r;
})(Ns || (Ns = {}));
class zs {
constructor(t) {
this.m_newFixture = !1;
this.m_locked = !1;
this.m_clearForces = !0;
this.m_contactManager = new ns();
this.m_bodyList = null;
this.m_jointList = null;
this.m_particleSystemList = null;
this.m_bodyCount = 0;
this.m_jointCount = 0;
this.m_gravity = new st();
this.m_allowSleep = !0;
this.m_destructionListener = null;
this.m_debugDraw = null;
this.m_inv_dt0 = 0;
this.m_warmStarting = !0;
this.m_continuousPhysics = !0;
this.m_subStepping = !1;
this.m_stepComplete = !0;
this.m_profile = new os();
this.m_island = new bs();
this.s_stack = [];
this.m_controllerList = null;
this.m_controllerCount = 0;
this.m_gravity.Copy(t);
}
SetDestructionListener(t) {
this.m_destructionListener = t;
}
SetContactFilter(t) {
this.m_contactManager.m_contactFilter = t;
}
SetContactListener(t) {
this.m_contactManager.m_contactListener = t;
}
SetDebugDraw(t) {
this.m_debugDraw = t;
}
CreateBody(t = {}) {
if (this.IsLocked()) throw new Error();
const e = new wi(t, this);
e.m_prev = null;
e.m_next = this.m_bodyList;
this.m_bodyList && (this.m_bodyList.m_prev = e);
this.m_bodyList = e;
++this.m_bodyCount;
return e;
}
DestroyBody(t) {
if (this.IsLocked()) throw new Error();
let e = t.m_jointList;
for (;e; ) {
const i = e;
e = e.next;
this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(i.joint);
this.DestroyJoint(i.joint);
t.m_jointList = e;
}
t.m_jointList = null;
let i = t.m_controllerList;
for (;i; ) {
const e = i;
i = i.nextController;
e.controller.RemoveBody(t);
}
let s = t.m_contactList;
for (;s; ) {
const t = s;
s = s.next;
this.m_contactManager.Destroy(t.contact);
}
t.m_contactList = null;
let r = t.m_fixtureList;
for (;r; ) {
const e = r;
r = r.m_next;
this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(e);
e.DestroyProxies();
e.Destroy();
t.m_fixtureList = r;
t.m_fixtureCount -= 1;
}
t.m_fixtureList = null;
t.m_fixtureCount = 0;
t.m_prev && (t.m_prev.m_next = t.m_next);
t.m_next && (t.m_next.m_prev = t.m_prev);
t === this.m_bodyList && (this.m_bodyList = t.m_next);
--this.m_bodyCount;
}
static _Joint_Create(t, i) {
switch (t.type) {
case e.b2JointType.e_distanceJoint:
return new Ii(t);

case e.b2JointType.e_mouseJoint:
return new Ri(t);

case e.b2JointType.e_prismaticJoint:
return new Li(t);

case e.b2JointType.e_revoluteJoint:
return new Ei(t);

case e.b2JointType.e_pulleyJoint:
return new Fi(t);

case e.b2JointType.e_gearJoint:
return new Ti(t);

case e.b2JointType.e_wheelJoint:
return new qi(t);

case e.b2JointType.e_weldJoint:
return new ji(t);

case e.b2JointType.e_frictionJoint:
return new Di(t);

case e.b2JointType.e_ropeJoint:
return new Oi(t);

case e.b2JointType.e_motorJoint:
return new Gi(t);

case e.b2JointType.e_areaJoint:
return new ki(t);
}
throw new Error();
}
static _Joint_Destroy(t, e) {}
CreateJoint(t) {
if (this.IsLocked()) throw new Error();
const e = zs._Joint_Create(t, null);
e.m_prev = null;
e.m_next = this.m_jointList;
this.m_jointList && (this.m_jointList.m_prev = e);
this.m_jointList = e;
++this.m_jointCount;
e.m_edgeA.prev = null;
e.m_edgeA.next = e.m_bodyA.m_jointList;
e.m_bodyA.m_jointList && (e.m_bodyA.m_jointList.prev = e.m_edgeA);
e.m_bodyA.m_jointList = e.m_edgeA;
e.m_edgeB.prev = null;
e.m_edgeB.next = e.m_bodyB.m_jointList;
e.m_bodyB.m_jointList && (e.m_bodyB.m_jointList.prev = e.m_edgeB);
e.m_bodyB.m_jointList = e.m_edgeB;
const i = t.bodyA, s = t.bodyB;
if (!t.collideConnected) {
let t = s.GetContactList();
for (;t; ) {
t.other === i && t.contact.FlagForFiltering();
t = t.next;
}
}
return e;
}
DestroyJoint(t) {
if (this.IsLocked()) throw new Error();
const e = t.m_collideConnected;
t.m_prev && (t.m_prev.m_next = t.m_next);
t.m_next && (t.m_next.m_prev = t.m_prev);
t === this.m_jointList && (this.m_jointList = t.m_next);
const i = t.m_bodyA, s = t.m_bodyB;
i.SetAwake(!0);
s.SetAwake(!0);
t.m_edgeA.prev && (t.m_edgeA.prev.next = t.m_edgeA.next);
t.m_edgeA.next && (t.m_edgeA.next.prev = t.m_edgeA.prev);
t.m_edgeA === i.m_jointList && (i.m_jointList = t.m_edgeA.next);
t.m_edgeA.prev = null;
t.m_edgeA.next = null;
t.m_edgeB.prev && (t.m_edgeB.prev.next = t.m_edgeB.next);
t.m_edgeB.next && (t.m_edgeB.next.prev = t.m_edgeB.prev);
t.m_edgeB === s.m_jointList && (s.m_jointList = t.m_edgeB.next);
t.m_edgeB.prev = null;
t.m_edgeB.next = null;
zs._Joint_Destroy(t, null);
--this.m_jointCount;
if (!e) {
let t = s.GetContactList();
for (;t; ) {
t.other === i && t.contact.FlagForFiltering();
t = t.next;
}
}
}
CreateParticleSystem(t) {
if (this.IsLocked()) throw new Error();
const e = new Ns(t, this);
e.m_prev = null;
e.m_next = this.m_particleSystemList;
this.m_particleSystemList && (this.m_particleSystemList.m_prev = e);
this.m_particleSystemList = e;
return e;
}
DestroyParticleSystem(t) {
if (this.IsLocked()) throw new Error();
t.m_prev && (t.m_prev.m_next = t.m_next);
t.m_next && (t.m_next.m_prev = t.m_prev);
t === this.m_particleSystemList && (this.m_particleSystemList = t.m_next);
}
CalculateReasonableParticleIterations(t) {
return null === this.m_particleSystemList ? 1 : gs(this.m_gravity.Length(), function(t) {
let e = s;
for (let i = t.GetParticleSystemList(); null !== i; i = i.m_next) e = J(e, i.GetRadius());
return e;
}(this), t);
}
Step(t, e, i, s = this.CalculateReasonableParticleIterations(t)) {
const r = zs.Step_s_stepTimer.Reset();
if (this.m_newFixture) {
this.m_contactManager.FindNewContacts();
this.m_newFixture = !1;
}
this.m_locked = !0;
const n = zs.Step_s_step;
n.dt = t;
n.velocityIterations = e;
n.positionIterations = i;
n.particleIterations = s;
n.inv_dt = t > 0 ? 1 / t : 0;
n.dtRatio = this.m_inv_dt0 * t;
n.warmStarting = this.m_warmStarting;
const o = zs.Step_s_timer.Reset();
this.m_contactManager.Collide();
this.m_profile.collide = o.GetMilliseconds();
if (this.m_stepComplete && n.dt > 0) {
const t = zs.Step_s_timer.Reset();
for (let t = this.m_particleSystemList; t; t = t.m_next) t.Solve(n);
this.Solve(n);
this.m_profile.solve = t.GetMilliseconds();
}
if (this.m_continuousPhysics && n.dt > 0) {
const t = zs.Step_s_timer.Reset();
this.SolveTOI(n);
this.m_profile.solveTOI = t.GetMilliseconds();
}
n.dt > 0 && (this.m_inv_dt0 = n.inv_dt);
this.m_clearForces && this.ClearForces();
this.m_locked = !1;
this.m_profile.step = r.GetMilliseconds();
}
ClearForces() {
for (let t = this.m_bodyList; t; t = t.m_next) {
t.m_force.SetZero();
t.m_torque = 0;
}
}
DrawParticleSystem(t) {
if (null === this.m_debugDraw) return;
const e = t.GetParticleCount();
if (e) {
const i = t.GetRadius(), s = t.GetPositionBuffer();
if (t.m_colorBuffer.data) {
const r = t.GetColorBuffer();
this.m_debugDraw.DrawParticles(s, i, r, e);
} else this.m_debugDraw.DrawParticles(s, i, null, e);
}
}
DrawDebugData() {
if (null === this.m_debugDraw) return;
const t = this.m_debugDraw.GetFlags(), i = zs.DrawDebugData_s_color.SetRGB(0, 0, 0);
if (t & e.b2DrawFlags.e_shapeBit) for (let t = this.m_bodyList; t; t = t.m_next) {
const s = t.m_xf;
this.m_debugDraw.PushTransform(s);
for (let s = t.GetFixtureList(); s; s = s.m_next) if (t.IsActive()) if (t.GetType() === e.b2BodyType.b2_staticBody) {
i.SetRGB(.5, .9, .5);
this.DrawShape(s, i);
} else if (t.GetType() === e.b2BodyType.b2_kinematicBody) {
i.SetRGB(.5, .5, .9);
this.DrawShape(s, i);
} else if (t.IsAwake()) {
i.SetRGB(.9, .7, .7);
this.DrawShape(s, i);
} else {
i.SetRGB(.6, .6, .6);
this.DrawShape(s, i);
} else {
i.SetRGB(.5, .5, .3);
this.DrawShape(s, i);
}
this.m_debugDraw.PopTransform(s);
}
if (t & e.b2DrawFlags.e_particleBit) for (let t = this.m_particleSystemList; t; t = t.m_next) this.DrawParticleSystem(t);
if (t & e.b2DrawFlags.e_jointBit) for (let t = this.m_jointList; t; t = t.m_next) this.DrawJoint(t);
if (t & e.b2DrawFlags.e_aabbBit) {
i.SetRGB(.9, .3, .9);
const t = zs.DrawDebugData_s_vs;
for (let e = this.m_bodyList; e; e = e.m_next) if (e.IsActive()) for (let s = e.GetFixtureList(); s; s = s.m_next) for (let e = 0; e < s.m_proxyCount; ++e) {
const r = s.m_proxies[e].treeNode.aabb;
t[0].Set(r.lowerBound.x, r.lowerBound.y);
t[1].Set(r.upperBound.x, r.lowerBound.y);
t[2].Set(r.upperBound.x, r.upperBound.y);
t[3].Set(r.lowerBound.x, r.upperBound.y);
this.m_debugDraw.DrawPolygon(t, 4, i);
}
}
if (t & e.b2DrawFlags.e_centerOfMassBit) for (let t = this.m_bodyList; t; t = t.m_next) {
const e = zs.DrawDebugData_s_xf;
e.q.Copy(t.m_xf.q);
e.p.Copy(t.GetWorldCenter());
this.m_debugDraw.DrawTransform(e);
}
if (t & e.b2DrawFlags.e_controllerBit) for (let t = this.m_controllerList; t; t = t.m_next) t.Draw(this.m_debugDraw);
}
QueryAABB(t, e, i) {
this.m_contactManager.m_broadPhase.Query(e, e => {
const s = e.userData.fixture;
return t ? t.ReportFixture(s) : !i || i(s);
});
if (t instanceof rs) for (let i = this.m_particleSystemList; i; i = i.m_next) t.ShouldQueryParticleSystem(i) && i.QueryAABB(t, e);
}
QueryAllAABB(t, e = []) {
this.QueryAABB(null, t, t => {
e.push(t);
return !0;
});
return e;
}
QueryPointAABB(t, e, i) {
this.m_contactManager.m_broadPhase.QueryPoint(e, e => {
const s = e.userData.fixture;
return t ? t.ReportFixture(s) : !i || i(s);
});
if (t instanceof rs) for (let i = this.m_particleSystemList; i; i = i.m_next) t.ShouldQueryParticleSystem(i) && i.QueryPointAABB(t, e);
}
QueryAllPointAABB(t, e = []) {
this.QueryPointAABB(null, t, t => {
e.push(t);
return !0;
});
return e;
}
QueryFixtureShape(t, e, i, s, r) {
const n = zs.QueryFixtureShape_s_aabb;
e.ComputeAABB(n, s, i);
this.m_contactManager.m_broadPhase.Query(n, n => {
const o = n.userData, a = o.fixture;
if ($t(e, i, a.GetShape(), o.childIndex, s, a.GetBody().GetTransform())) {
if (t) return t.ReportFixture(a);
if (r) return r(a);
}
return !0;
});
if (t instanceof rs) for (let e = this.m_particleSystemList; e; e = e.m_next) t.ShouldQueryParticleSystem(e) && e.QueryAABB(t, n);
}
QueryAllFixtureShape(t, e, i, s = []) {
this.QueryFixtureShape(null, t, e, i, t => {
s.push(t);
return !0;
});
return s;
}
QueryFixturePoint(t, e, i) {
this.m_contactManager.m_broadPhase.QueryPoint(e, s => {
const r = s.userData.fixture;
if (r.TestPoint(e)) {
if (t) return t.ReportFixture(r);
if (i) return i(r);
}
return !0;
});
if (t) for (let i = this.m_particleSystemList; i; i = i.m_next) t.ShouldQueryParticleSystem(i) && i.QueryPointAABB(t, e);
}
QueryAllFixturePoint(t, e = []) {
this.QueryFixturePoint(null, t, t => {
e.push(t);
return !0;
});
return e;
}
RayCast(t, e, i, s) {
const r = zs.RayCast_s_input;
r.maxFraction = 1;
r.p1.Copy(e);
r.p2.Copy(i);
this.m_contactManager.m_broadPhase.RayCast(r, (r, n) => {
const o = n.userData, a = o.fixture, l = o.childIndex, h = zs.RayCast_s_output;
if (a.RayCast(h, r, l)) {
const r = h.fraction, n = zs.RayCast_s_point;
n.Set((1 - r) * e.x + r * i.x, (1 - r) * e.y + r * i.y);
if (t) return t.ReportFixture(a, n, h.normal, r);
if (s) return s(a, n, h.normal, r);
}
return r.maxFraction;
});
if (t) for (let s = this.m_particleSystemList; s; s = s.m_next) t.ShouldQueryParticleSystem(s) && s.RayCast(t, e, i);
}
RayCastOne(t, e) {
let i = null, s = 1;
this.RayCast(null, t, e, (t, e, r, n) => {
if (n < s) {
s = n;
i = t;
}
return s;
});
return i;
}
RayCastAll(t, e, i = []) {
this.RayCast(null, t, e, t => {
i.push(t);
return 1;
});
return i;
}
GetBodyList() {
return this.m_bodyList;
}
GetJointList() {
return this.m_jointList;
}
GetParticleSystemList() {
return this.m_particleSystemList;
}
GetContactList() {
return this.m_contactManager.m_contactList;
}
SetAllowSleeping(t) {
if (t !== this.m_allowSleep) {
this.m_allowSleep = t;
if (!this.m_allowSleep) for (let t = this.m_bodyList; t; t = t.m_next) t.SetAwake(!0);
}
}
GetAllowSleeping() {
return this.m_allowSleep;
}
SetWarmStarting(t) {
this.m_warmStarting = t;
}
GetWarmStarting() {
return this.m_warmStarting;
}
SetContinuousPhysics(t) {
this.m_continuousPhysics = t;
}
GetContinuousPhysics() {
return this.m_continuousPhysics;
}
SetSubStepping(t) {
this.m_subStepping = t;
}
GetSubStepping() {
return this.m_subStepping;
}
GetProxyCount() {
return this.m_contactManager.m_broadPhase.GetProxyCount();
}
GetBodyCount() {
return this.m_bodyCount;
}
GetJointCount() {
return this.m_jointCount;
}
GetContactCount() {
return this.m_contactManager.m_contactCount;
}
GetTreeHeight() {
return this.m_contactManager.m_broadPhase.GetTreeHeight();
}
GetTreeBalance() {
return this.m_contactManager.m_broadPhase.GetTreeBalance();
}
GetTreeQuality() {
return this.m_contactManager.m_broadPhase.GetTreeQuality();
}
SetGravity(t, e = !0) {
if (!st.IsEqualToV(this.m_gravity, t)) {
this.m_gravity.Copy(t);
if (e) for (let t = this.m_bodyList; t; t = t.m_next) t.SetAwake(!0);
}
}
GetGravity() {
return this.m_gravity;
}
IsLocked() {
return this.m_locked;
}
SetAutoClearForces(t) {
this.m_clearForces = t;
}
GetAutoClearForces() {
return this.m_clearForces;
}
ShiftOrigin(t) {
if (this.IsLocked()) throw new Error();
for (let e = this.m_bodyList; e; e = e.m_next) {
e.m_xf.p.SelfSub(t);
e.m_sweep.c0.SelfSub(t);
e.m_sweep.c.SelfSub(t);
}
for (let e = this.m_jointList; e; e = e.m_next) e.ShiftOrigin(t);
this.m_contactManager.m_broadPhase.ShiftOrigin(t);
}
GetContactManager() {
return this.m_contactManager;
}
GetProfile() {
return this.m_profile;
}
Dump(t) {
if (this.m_locked) return;
t("const g: b2Vec2 = new b2Vec2(%.15f, %.15f);\n", this.m_gravity.x, this.m_gravity.y);
t("this.m_world.SetGravity(g);\n");
t("const bodies: b2Body[] = [];\n");
t("const joints: b2Joint[] = [];\n");
let i = 0;
for (let e = this.m_bodyList; e; e = e.m_next) {
e.m_islandIndex = i;
e.Dump(t);
++i;
}
i = 0;
for (let t = this.m_jointList; t; t = t.m_next) {
t.m_index = i;
++i;
}
for (let i = this.m_jointList; i; i = i.m_next) if (i.m_type !== e.b2JointType.e_gearJoint) {
t("{\n");
i.Dump(t);
t("}\n");
}
for (let i = this.m_jointList; i; i = i.m_next) if (i.m_type === e.b2JointType.e_gearJoint) {
t("{\n");
i.Dump(t);
t("}\n");
}
}
DrawJoint(t) {
if (null === this.m_debugDraw) return;
const i = t.GetBodyA(), s = t.GetBodyB(), r = i.m_xf, n = s.m_xf, o = r.p, a = n.p, l = t.GetAnchorA(zs.DrawJoint_s_p1), h = t.GetAnchorB(zs.DrawJoint_s_p2), c = zs.DrawJoint_s_color.SetRGB(.5, .8, .8);
switch (t.m_type) {
case e.b2JointType.e_distanceJoint:
this.m_debugDraw.DrawSegment(l, h, c);
break;

case e.b2JointType.e_pulleyJoint:
{
const e = t, i = e.GetGroundAnchorA(), s = e.GetGroundAnchorB();
this.m_debugDraw.DrawSegment(i, l, c);
this.m_debugDraw.DrawSegment(s, h, c);
this.m_debugDraw.DrawSegment(i, s, c);
break;
}

case e.b2JointType.e_mouseJoint:
{
const t = zs.DrawJoint_s_c;
t.Set(0, 1, 0);
this.m_debugDraw.DrawPoint(l, 4, t);
this.m_debugDraw.DrawPoint(h, 4, t);
t.Set(.8, .8, .8);
this.m_debugDraw.DrawSegment(l, h, t);
break;
}

default:
this.m_debugDraw.DrawSegment(o, l, c);
this.m_debugDraw.DrawSegment(l, h, c);
this.m_debugDraw.DrawSegment(a, h, c);
}
}
DrawShape(t, i) {
if (null === this.m_debugDraw) return;
const s = t.GetShape();
switch (s.m_type) {
case e.b2ShapeType.e_circleShape:
{
const t = s, e = t.m_p, r = t.m_radius, n = st.UNITX;
this.m_debugDraw.DrawSolidCircle(e, r, n, i);
break;
}

case e.b2ShapeType.e_edgeShape:
{
const t = s, e = t.m_vertex1, r = t.m_vertex2;
this.m_debugDraw.DrawSegment(e, r, i);
break;
}

case e.b2ShapeType.e_chainShape:
{
const t = s, e = t.m_count, r = t.m_vertices, n = zs.DrawShape_s_ghostColor.SetRGBA(.75 * i.r, .75 * i.g, .75 * i.b, i.a);
let o = r[0];
this.m_debugDraw.DrawPoint(o, 4, i);
if (t.m_hasPrevVertex) {
const e = t.m_prevVertex;
this.m_debugDraw.DrawSegment(e, o, n);
this.m_debugDraw.DrawCircle(e, .1, n);
}
for (let t = 1; t < e; ++t) {
const e = r[t];
this.m_debugDraw.DrawSegment(o, e, i);
this.m_debugDraw.DrawPoint(e, 4, i);
o = e;
}
if (t.m_hasNextVertex) {
const e = t.m_nextVertex;
this.m_debugDraw.DrawSegment(e, o, n);
this.m_debugDraw.DrawCircle(e, .1, n);
}
break;
}

case e.b2ShapeType.e_polygonShape:
{
const t = s, e = t.m_count, r = t.m_vertices;
this.m_debugDraw.DrawSolidPolygon(r, e, i);
break;
}
}
}
Solve(t) {
for (let t = this.m_bodyList; t; t = t.m_next) t.m_xf0.Copy(t.m_xf);
for (let e = this.m_controllerList; e; e = e.m_next) e.Step(t);
this.m_profile.solveInit = 0;
this.m_profile.solveVelocity = 0;
this.m_profile.solvePosition = 0;
const i = this.m_island;
i.Initialize(this.m_bodyCount, this.m_contactManager.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener);
for (let t = this.m_bodyList; t; t = t.m_next) t.m_islandFlag = !1;
for (let t = this.m_contactManager.m_contactList; t; t = t.m_next) t.m_islandFlag = !1;
for (let t = this.m_jointList; t; t = t.m_next) t.m_islandFlag = !1;
const s = this.s_stack;
for (let r = this.m_bodyList; r; r = r.m_next) {
if (r.m_islandFlag) continue;
if (!r.IsAwake() || !r.IsActive()) continue;
if (r.GetType() === e.b2BodyType.b2_staticBody) continue;
i.Clear();
let n = 0;
s[n++] = r;
r.m_islandFlag = !0;
for (;n > 0; ) {
const t = s[--n];
if (!t) throw new Error();
i.AddBody(t);
t.m_awakeFlag = !0;
if (t.GetType() !== e.b2BodyType.b2_staticBody) {
for (let e = t.m_contactList; e; e = e.next) {
const t = e.contact;
if (t.m_islandFlag) continue;
if (!t.IsEnabled() || !t.IsTouching()) continue;
const r = t.m_fixtureA.m_isSensor, o = t.m_fixtureB.m_isSensor;
if (r || o) continue;
i.AddContact(t);
t.m_islandFlag = !0;
const a = e.other;
if (!a) throw new Error();
if (!a.m_islandFlag) {
s[n++] = a;
a.m_islandFlag = !0;
}
}
for (let e = t.m_jointList; e; e = e.next) {
if (e.joint.m_islandFlag) continue;
const t = e.other;
if (t.IsActive()) {
i.AddJoint(e.joint);
e.joint.m_islandFlag = !0;
if (!t.m_islandFlag) {
s[n++] = t;
t.m_islandFlag = !0;
}
}
}
}
}
const o = new os();
i.Solve(o, t, this.m_gravity, this.m_allowSleep);
this.m_profile.solveInit += o.solveInit;
this.m_profile.solveVelocity += o.solveVelocity;
this.m_profile.solvePosition += o.solvePosition;
for (let t = 0; t < i.m_bodyCount; ++t) {
const s = i.m_bodies[t];
s.GetType() === e.b2BodyType.b2_staticBody && (s.m_islandFlag = !1);
}
}
for (let t = 0; t < s.length && s[t]; ++t) s[t] = null;
const r = new ut();
for (let t = this.m_bodyList; t; t = t.m_next) t.m_islandFlag && t.GetType() !== e.b2BodyType.b2_staticBody && t.SynchronizeFixtures();
this.m_contactManager.FindNewContacts();
this.m_profile.broadphase = r.GetMilliseconds();
}
SolveTOI(t) {
const i = this.m_island;
i.Initialize(2 * d, d, 0, null, this.m_contactManager.m_contactListener);
if (this.m_stepComplete) {
for (let t = this.m_bodyList; t; t = t.m_next) {
t.m_islandFlag = !1;
t.m_sweep.alpha0 = 0;
}
for (let t = this.m_contactManager.m_contactList; t; t = t.m_next) {
t.m_toiFlag = !1;
t.m_islandFlag = !1;
t.m_toiCount = 0;
t.m_toi = 1;
}
}
for (;;) {
let s = null, n = 1;
for (let t = this.m_contactManager.m_contactList; t; t = t.m_next) {
if (!t.IsEnabled()) continue;
if (t.m_toiCount > f) continue;
let i = 1;
if (t.m_toiFlag) i = t.m_toi; else {
const s = t.GetFixtureA(), r = t.GetFixtureB();
if (s.IsSensor() || r.IsSensor()) continue;
const n = s.GetBody(), o = r.GetBody(), a = n.m_type, l = o.m_type, h = n.IsAwake() && a !== e.b2BodyType.b2_staticBody, c = o.IsAwake() && l !== e.b2BodyType.b2_staticBody;
if (!h && !c) continue;
const m = n.IsBullet() || a !== e.b2BodyType.b2_dynamicBody, u = o.IsBullet() || l !== e.b2BodyType.b2_dynamicBody;
if (!m && !u) continue;
let _ = n.m_sweep.alpha0;
if (n.m_sweep.alpha0 < o.m_sweep.alpha0) {
_ = o.m_sweep.alpha0;
n.m_sweep.Advance(_);
} else if (o.m_sweep.alpha0 < n.m_sweep.alpha0) {
_ = n.m_sweep.alpha0;
o.m_sweep.Advance(_);
}
const f = t.GetChildIndexA(), d = t.GetChildIndexB(), p = zs.SolveTOI_s_toi_input;
p.proxyA.SetShape(s.GetShape(), f);
p.proxyB.SetShape(r.GetShape(), d);
p.sweepA.Copy(n.m_sweep);
p.sweepB.Copy(o.m_sweep);
p.tMax = 1;
const y = zs.SolveTOI_s_toi_output;
Ae(y, p);
const b = y.t;
i = y.state === e.b2TOIOutputState.e_touching ? J(_ + (1 - _) * b, 1) : 1;
t.m_toi = i;
t.m_toiFlag = !0;
}
if (i < n) {
s = t;
n = i;
}
}
if (null === s || 1 - 10 * r < n) {
this.m_stepComplete = !0;
break;
}
const o = s.GetFixtureA(), a = s.GetFixtureB(), l = o.GetBody(), h = a.GetBody(), c = zs.SolveTOI_s_backup1.Copy(l.m_sweep), m = zs.SolveTOI_s_backup2.Copy(h.m_sweep);
l.Advance(n);
h.Advance(n);
s.Update(this.m_contactManager.m_contactListener);
s.m_toiFlag = !1;
++s.m_toiCount;
if (!s.IsEnabled() || !s.IsTouching()) {
s.SetEnabled(!1);
l.m_sweep.Copy(c);
h.m_sweep.Copy(m);
l.SynchronizeTransform();
h.SynchronizeTransform();
continue;
}
l.SetAwake(!0);
h.SetAwake(!0);
i.Clear();
i.AddBody(l);
i.AddBody(h);
i.AddContact(s);
l.m_islandFlag = !0;
h.m_islandFlag = !0;
s.m_islandFlag = !0;
for (let t = 0; t < 2; ++t) {
const s = 0 === t ? l : h;
if (s.m_type === e.b2BodyType.b2_dynamicBody) for (let t = s.m_contactList; t && i.m_bodyCount !== i.m_bodyCapacity && i.m_contactCount !== i.m_contactCapacity; t = t.next) {
const r = t.contact;
if (r.m_islandFlag) continue;
const o = t.other;
if (o.m_type === e.b2BodyType.b2_dynamicBody && !s.IsBullet() && !o.IsBullet()) continue;
const a = r.m_fixtureA.m_isSensor, l = r.m_fixtureB.m_isSensor;
if (a || l) continue;
const h = zs.SolveTOI_s_backup.Copy(o.m_sweep);
o.m_islandFlag || o.Advance(n);
r.Update(this.m_contactManager.m_contactListener);
if (r.IsEnabled()) if (r.IsTouching()) {
r.m_islandFlag = !0;
i.AddContact(r);
if (!o.m_islandFlag) {
o.m_islandFlag = !0;
o.m_type !== e.b2BodyType.b2_staticBody && o.SetAwake(!0);
i.AddBody(o);
}
} else {
o.m_sweep.Copy(h);
o.SynchronizeTransform();
} else {
o.m_sweep.Copy(h);
o.SynchronizeTransform();
}
}
}
const u = zs.SolveTOI_s_subStep;
u.dt = (1 - n) * t.dt;
u.inv_dt = 1 / u.dt;
u.dtRatio = 1;
u.positionIterations = 20;
u.velocityIterations = t.velocityIterations;
u.particleIterations = t.particleIterations;
u.warmStarting = !1;
i.SolveTOI(u, l.m_islandIndex, h.m_islandIndex);
for (let t = 0; t < i.m_bodyCount; ++t) {
const s = i.m_bodies[t];
s.m_islandFlag = !1;
if (s.m_type === e.b2BodyType.b2_dynamicBody) {
s.SynchronizeFixtures();
for (let t = s.m_contactList; t; t = t.next) {
t.contact.m_toiFlag = !1;
t.contact.m_islandFlag = !1;
}
}
}
this.m_contactManager.FindNewContacts();
if (this.m_subStepping) {
this.m_stepComplete = !1;
break;
}
}
}
AddController(t) {
t.m_next = this.m_controllerList;
t.m_prev = null;
this.m_controllerList && (this.m_controllerList.m_prev = t);
this.m_controllerList = t;
++this.m_controllerCount;
return t;
}
RemoveController(t) {
t.m_prev && (t.m_prev.m_next = t.m_next);
t.m_next && (t.m_next.m_prev = t.m_prev);
this.m_controllerList === t && (this.m_controllerList = t.m_next);
--this.m_controllerCount;
t.m_prev = null;
t.m_next = null;
return t;
}
}
zs.Step_s_step = new as();
zs.Step_s_stepTimer = new ut();
zs.Step_s_timer = new ut();
zs.DrawDebugData_s_color = new mt(0, 0, 0);
zs.DrawDebugData_s_vs = st.MakeArray(4);
zs.DrawDebugData_s_xf = new ht();
zs.QueryFixtureShape_s_aabb = new Ut();
zs.RayCast_s_input = new zt();
zs.RayCast_s_output = new Jt();
zs.RayCast_s_point = new st();
zs.DrawJoint_s_p1 = new st();
zs.DrawJoint_s_p2 = new st();
zs.DrawJoint_s_color = new mt(.5, .8, .8);
zs.DrawJoint_s_c = new mt();
zs.DrawShape_s_ghostColor = new mt();
zs.SolveTOI_s_subStep = new as();
zs.SolveTOI_s_backup = new ct();
zs.SolveTOI_s_backup1 = new ct();
zs.SolveTOI_s_backup2 = new ct();
zs.SolveTOI_s_toi_input = new me();
zs.SolveTOI_s_toi_output = new ue();
class Js {
constructor(t, e) {
this.prevBody = null;
this.nextBody = null;
this.prevController = null;
this.nextController = null;
this.controller = t;
this.body = e;
}
}
class Us {
constructor() {
this.m_bodyList = null;
this.m_bodyCount = 0;
this.m_prev = null;
this.m_next = null;
}
GetNext() {
return this.m_next;
}
GetPrev() {
return this.m_prev;
}
GetBodyList() {
return this.m_bodyList;
}
AddBody(t) {
const e = new Js(this, t);
e.nextBody = this.m_bodyList;
e.prevBody = null;
this.m_bodyList && (this.m_bodyList.prevBody = e);
this.m_bodyList = e;
++this.m_bodyCount;
e.nextController = t.m_controllerList;
e.prevController = null;
t.m_controllerList && (t.m_controllerList.prevController = e);
t.m_controllerList = e;
++t.m_controllerCount;
}
RemoveBody(t) {
if (this.m_bodyCount <= 0) throw new Error();
let e = this.m_bodyList;
for (;e && e.body !== t; ) e = e.nextBody;
if (null === e) throw new Error();
e.prevBody && (e.prevBody.nextBody = e.nextBody);
e.nextBody && (e.nextBody.prevBody = e.prevBody);
this.m_bodyList === e && (this.m_bodyList = e.nextBody);
--this.m_bodyCount;
e.nextController && (e.nextController.prevController = e.prevController);
e.prevController && (e.prevController.nextController = e.nextController);
t.m_controllerList === e && (t.m_controllerList = e.nextController);
--t.m_controllerCount;
}
Clear() {
for (;this.m_bodyList; ) this.RemoveBody(this.m_bodyList.body);
this.m_bodyCount = 0;
}
}
class Hs extends Us {
constructor() {
super(...arguments);
this.A = new st(0, 0);
}
Step(t) {
const e = st.MulSV(t.dt, this.A, Hs.Step_s_dtA);
for (let t = this.m_bodyList; t; t = t.nextBody) {
const i = t.body;
i.IsAwake() && i.SetLinearVelocity(st.AddVV(i.GetLinearVelocity(), e, st.s_t0));
}
}
Draw(t) {}
}
Hs.Step_s_dtA = new st();
class Ws extends Us {
constructor() {
super(...arguments);
this.G = 1;
this.invSqr = !0;
}
Step(t) {
if (this.invSqr) for (let t = this.m_bodyList; t; t = t.nextBody) {
const e = t.body, i = e.GetWorldCenter(), s = e.GetMass();
for (let n = this.m_bodyList; n && n !== t; n = n.nextBody) {
const t = n.body, o = t.GetWorldCenter(), a = t.GetMass(), l = o.x - i.x, h = o.y - i.y, c = l * l + h * h;
if (c < r) continue;
const m = Ws.Step_s_f.Set(l, h);
m.SelfMul(this.G / c / Z(c) * s * a);
e.IsAwake() && e.ApplyForce(m, i);
t.IsAwake() && t.ApplyForce(m.SelfMul(-1), o);
}
} else for (let t = this.m_bodyList; t; t = t.nextBody) {
const e = t.body, i = e.GetWorldCenter(), s = e.GetMass();
for (let n = this.m_bodyList; n && n !== t; n = n.nextBody) {
const t = n.body, o = t.GetWorldCenter(), a = t.GetMass(), l = o.x - i.x, h = o.y - i.y, c = l * l + h * h;
if (c < r) continue;
const m = Ws.Step_s_f.Set(l, h);
m.SelfMul(this.G / c * s * a);
e.IsAwake() && e.ApplyForce(m, i);
t.IsAwake() && t.ApplyForce(m.SelfMul(-1), o);
}
}
}
Draw(t) {}
}
Ws.Step_s_f = new st();
class Ks extends Us {
constructor() {
super(...arguments);
this.T = new ot();
this.maxTimestep = 0;
}
Step(t) {
let e = t.dt;
if (!(e <= r)) {
e > this.maxTimestep && this.maxTimestep > 0 && (e = this.maxTimestep);
for (let t = this.m_bodyList; t; t = t.nextBody) {
const i = t.body;
if (!i.IsAwake()) continue;
const s = i.GetWorldVector(ot.MulMV(this.T, i.GetLocalVector(i.GetLinearVelocity(), st.s_t0), st.s_t1), Ks.Step_s_damping);
i.SetLinearVelocity(st.AddVV(i.GetLinearVelocity(), st.MulSV(e, s, st.s_t0), st.s_t1));
}
}
}
Draw(t) {}
SetAxisAligned(t, e) {
this.T.ex.x = -t;
this.T.ex.y = 0;
this.T.ey.x = 0;
this.T.ey.y = -e;
this.maxTimestep = t > 0 || e > 0 ? 1 / U(t, e) : 0;
}
}
Ks.Step_s_damping = new st();
class Xs {
constructor() {
this.m_count = 0;
this.m_ps = [];
this.m_p0s = [];
this.m_vs = [];
this.m_ims = [];
this.m_Ls = [];
this.m_as = [];
this.m_gravity = new st();
this.m_damping = 0;
this.m_k2 = 1;
this.m_k3 = .1;
}
GetVertexCount() {
return this.m_count;
}
GetVertices() {
return this.m_ps;
}
Initialize(t) {
this.m_count = t.count;
this.m_ps = st.MakeArray(this.m_count);
this.m_p0s = st.MakeArray(this.m_count);
this.m_vs = st.MakeArray(this.m_count);
this.m_ims = O(this.m_count);
for (let e = 0; e < this.m_count; ++e) {
this.m_ps[e].Copy(t.vertices[e]);
this.m_p0s[e].Copy(t.vertices[e]);
this.m_vs[e].SetZero();
const i = t.masses[e];
this.m_ims[e] = i > 0 ? 1 / i : 0;
}
const e = this.m_count - 1, i = this.m_count - 2;
this.m_Ls = O(e);
this.m_as = O(i);
for (let t = 0; t < e; ++t) {
const e = this.m_ps[t], i = this.m_ps[t + 1];
this.m_Ls[t] = st.DistanceVV(e, i);
}
for (let t = 0; t < i; ++t) {
const e = this.m_ps[t], i = this.m_ps[t + 1], s = this.m_ps[t + 2], r = st.SubVV(i, e, st.s_t0), n = st.SubVV(s, i, st.s_t1), o = st.CrossVV(r, n), a = st.DotVV(r, n);
this.m_as[t] = it(o, a);
}
this.m_gravity.Copy(t.gravity);
this.m_damping = t.damping;
this.m_k2 = t.k2;
this.m_k3 = t.k3;
}
Step(t, e) {
if (0 === t) return;
const i = Math.exp(-t * this.m_damping);
for (let e = 0; e < this.m_count; ++e) {
this.m_p0s[e].Copy(this.m_ps[e]);
this.m_ims[e] > 0 && this.m_vs[e].SelfMulAdd(t, this.m_gravity);
this.m_vs[e].SelfMul(i);
this.m_ps[e].SelfMulAdd(t, this.m_vs[e]);
}
for (let t = 0; t < e; ++t) {
this.SolveC2();
this.SolveC3();
this.SolveC2();
}
const s = 1 / t;
for (let t = 0; t < this.m_count; ++t) st.MulSV(s, st.SubVV(this.m_ps[t], this.m_p0s[t], st.s_t0), this.m_vs[t]);
}
SolveC2() {
const t = this.m_count - 1;
for (let e = 0; e < t; ++e) {
const t = this.m_ps[e], i = this.m_ps[e + 1], s = st.SubVV(i, t, Xs.s_d), r = s.Normalize(), n = this.m_ims[e], o = this.m_ims[e + 1];
if (n + o === 0) continue;
const a = n / (n + o), l = o / (n + o);
t.SelfMulSub(this.m_k2 * a * (this.m_Ls[e] - r), s);
i.SelfMulAdd(this.m_k2 * l * (this.m_Ls[e] - r), s);
}
}
SetAngle(t) {
const e = this.m_count - 2;
for (let i = 0; i < e; ++i) this.m_as[i] = t;
}
SolveC3() {
const t = this.m_count - 2;
for (let e = 0; e < t; ++e) {
const t = this.m_ps[e], i = this.m_ps[e + 1], s = this.m_ps[e + 2], r = this.m_ims[e], n = this.m_ims[e + 1], a = this.m_ims[e + 2], l = st.SubVV(i, t, Xs.s_d1), h = st.SubVV(s, i, Xs.s_d2), c = l.LengthSquared(), m = h.LengthSquared();
if (c * m == 0) continue;
const u = st.CrossVV(l, h), _ = st.DotVV(l, h);
let f = it(u, _);
const d = st.MulSV(-1 / c, l.SelfSkew(), Xs.s_Jd1), p = st.MulSV(1 / m, h.SelfSkew(), Xs.s_Jd2), y = st.NegV(d, Xs.s_J1), b = st.SubVV(d, p, Xs.s_J2), v = p;
let g = r * st.DotVV(y, y) + n * st.DotVV(b, b) + a * st.DotVV(v, v);
if (0 === g) continue;
g = 1 / g;
let S = f - this.m_as[e];
for (;S > o; ) S = (f -= 2 * o) - this.m_as[e];
for (;S < -o; ) S = (f += 2 * o) - this.m_as[e];
const x = -this.m_k3 * g * S;
t.SelfMulAdd(r * x, y);
i.SelfMulAdd(n * x, b);
s.SelfMulAdd(a * x, v);
}
}
Draw(t) {
const e = new mt(.4, .5, .7);
for (let i = 0; i < this.m_count - 1; ++i) t.DrawSegment(this.m_ps[i], this.m_ps[i + 1], e);
}
}
Xs.s_d = new st();
Xs.s_d1 = new st();
Xs.s_d2 = new st();
Xs.s_Jd1 = new st();
Xs.s_Jd2 = new st();
Xs.s_J1 = new st();
Xs.s_J2 = new st();
e.b2Assert = function(t, ...e) {
if (!t) throw new Error(...e);
};
e.b2Maybe = i;
e.b2_maxFloat = s;
e.b2_epsilon = r;
e.b2_epsilon_sq = n;
e.b2_pi = o;
e.b2_maxManifoldPoints = a;
e.b2_maxPolygonVertices = l;
e.b2_aabbExtension = h;
e.b2_aabbMultiplier = c;
e.b2_linearSlop = m;
e.b2_angularSlop = u;
e.b2_polygonRadius = _;
e.b2_maxSubSteps = f;
e.b2_maxTOIContacts = d;
e.b2_velocityThreshold = p;
e.b2_maxLinearCorrection = y;
e.b2_maxAngularCorrection = b;
e.b2_maxTranslation = v;
e.b2_maxTranslationSquared = g;
e.b2_maxRotation = S;
e.b2_maxRotationSquared = x;
e.b2_baumgarte = A;
e.b2_toiBaumgarte = B;
e.b2_invalidParticleIndex = w;
e.b2_maxParticleIndex = 2147483647;
e.b2_particleStride = C;
e.b2_minParticleWeight = V;
e.b2_maxParticlePressure = M;
e.b2_maxParticleForce = P;
e.b2_maxTriadDistance = 2;
e.b2_maxTriadDistanceSquared = I;
e.b2_minParticleSystemBufferCapacity = k;
e.b2_barrierCollisionTime = D;
e.b2_timeToSleep = T;
e.b2_linearSleepTolerance = G;
e.b2_angularSleepTolerance = R;
e.b2Alloc = function() {
return null;
};
e.b2Free = function() {};
e.b2Log = function() {};
e.b2Version = L;
e.b2_version = F;
e.b2_branch = "master";
e.b2_commit = "fbf51801d80fc389d43dc46524520e89043b6faf";
e.b2ParseInt = function(t) {
return parseInt(t, 10);
};
e.b2ParseUInt = function(t) {
return Math.abs(parseInt(t, 10));
};
e.b2MakeArray = E;
e.b2MakeNullArray = function(t) {
const e = [];
for (let i = 0; i < t; ++i) e.push(null);
return e;
};
e.b2MakeNumberArray = O;
e.b2_pi_over_180 = j;
e.b2_180_over_pi = q;
e.b2_two_pi = N;
e.b2Abs = z;
e.b2Min = J;
e.b2Max = U;
e.b2Clamp = H;
e.b2Swap = function(t, e) {
const i = t[0];
t[0] = e[0];
e[0] = i;
};
e.b2IsValid = W;
e.b2Sq = K;
e.b2InvSqrt = X;
e.b2Sqrt = Z;
e.b2Pow = $;
e.b2DegToRad = function(t) {
return t * j;
};
e.b2RadToDeg = function(t) {
return t * q;
};
e.b2Cos = Y;
e.b2Sin = Q;
e.b2Acos = tt;
e.b2Asin = et;
e.b2Atan2 = it;
e.b2NextPowerOfTwo = function(t) {
t |= t >> 1 & 2147483647;
t |= t >> 2 & 1073741823;
t |= t >> 4 & 268435455;
t |= t >> 8 & 16777215;
return 1 + (t |= t >> 16 & 65535);
};
e.b2IsPowerOfTwo = function(t) {
return t > 0 && 0 == (t & t - 1);
};
e.b2Random = function() {
return 2 * Math.random() - 1;
};
e.b2RandomRange = function(t, e) {
return (e - t) * Math.random() + t;
};
e.b2Vec2 = st;
e.b2Vec2_zero = rt;
e.b2Vec3 = nt;
e.b2Mat22 = ot;
e.b2Mat33 = at;
e.b2Rot = lt;
e.b2Transform = ht;
e.b2Sweep = ct;
e.b2Color = mt;
e.b2Draw = class {
constructor() {
this.m_drawFlags = 0;
}
SetFlags(t) {
this.m_drawFlags = t;
}
GetFlags() {
return this.m_drawFlags;
}
AppendFlags(t) {
this.m_drawFlags |= t;
}
ClearFlags(t) {
this.m_drawFlags &= ~t;
}
};
e.b2Timer = ut;
e.b2Counter = class {
constructor() {
this.m_count = 0;
this.m_min_count = 0;
this.m_max_count = 0;
}
GetCount() {
return this.m_count;
}
GetMinCount() {
return this.m_min_count;
}
GetMaxCount() {
return this.m_max_count;
}
ResetCount() {
const t = this.m_count;
this.m_count = 0;
return t;
}
ResetMinCount() {
this.m_min_count = 0;
}
ResetMaxCount() {
this.m_max_count = 0;
}
Increment() {
this.m_count++;
this.m_max_count < this.m_count && (this.m_max_count = this.m_count);
}
Decrement() {
this.m_count--;
this.m_min_count > this.m_count && (this.m_min_count = this.m_count);
}
};
e.b2GrowableStack = _t;
e.b2BlockAllocator = class {};
e.b2StackAllocator = class {};
e.b2ContactFeature = Ft;
e.b2ContactID = Et;
e.b2ManifoldPoint = Ot;
e.b2Manifold = jt;
e.b2WorldManifold = qt;
e.b2GetPointStates = function(t, i, s, r) {
let n;
for (n = 0; n < s.pointCount; ++n) {
const i = s.points[n].id.key;
t[n] = e.b2PointState.b2_removeState;
for (let s = 0, o = r.pointCount; s < o; ++s) if (r.points[s].id.key === i) {
t[n] = e.b2PointState.b2_persistState;
break;
}
}
for (;n < a; ++n) t[n] = e.b2PointState.b2_nullState;
for (n = 0; n < r.pointCount; ++n) {
const t = r.points[n].id.key;
i[n] = e.b2PointState.b2_addState;
for (let r = 0, o = s.pointCount; r < o; ++r) if (s.points[r].id.key === t) {
i[n] = e.b2PointState.b2_persistState;
break;
}
}
for (;n < a; ++n) i[n] = e.b2PointState.b2_nullState;
};
e.b2ClipVertex = Nt;
e.b2RayCastInput = zt;
e.b2RayCastOutput = Jt;
e.b2AABB = Ut;
e.b2TestOverlapAABB = Ht;
e.b2ClipSegmentToLine = Wt;
e.b2TestOverlapShape = $t;
e.b2DistanceProxy = ft;
e.b2SimplexCache = dt;
e.b2DistanceInput = pt;
e.b2DistanceOutput = yt;
e.b2ShapeCastInput = class {
constructor() {
this.proxyA = new ft();
this.proxyB = new ft();
this.transformA = new ht();
this.transformB = new ht();
this.translationB = new st();
}
};
e.b2ShapeCastOutput = class {
constructor() {
this.point = new st();
this.normal = new st();
this.lambda = 0;
this.iterations = 0;
}
};
e.b2_gjk_reset = function() {
e.b2_gjkCalls = 0;
e.b2_gjkIters = 0;
e.b2_gjkMaxIters = 0;
};
e.b2SimplexVertex = bt;
e.b2Simplex = vt;
e.b2Distance = Mt;
e.b2ShapeCast = function(t, e) {
t.iterations = 0;
t.lambda = 1;
t.normal.SetZero();
t.point.SetZero();
const i = e.proxyA, s = e.proxyB, r = U(i.m_radius, _) + U(s.m_radius, _), n = e.transformA, o = e.transformB, a = e.translationB, l = Pt.Set(0, 0);
let h = 0;
const c = It;
c.m_count = 0;
const u = c.m_vertices;
let f = i.GetSupport(lt.MulTRV(n.q, st.NegV(a, st.s_t1), st.s_t0)), d = ht.MulXV(n, i.GetVertex(f), kt), p = s.GetSupport(lt.MulTRV(o.q, a, st.s_t0)), y = ht.MulXV(o, s.GetVertex(p), Dt);
const b = st.SubVV(d, y, Tt), v = U(_, r - _), g = .5 * m;
let S = 0;
for (;S < 20 && z(b.Length() - v) > g; ) {
t.iterations += 1;
f = i.GetSupport(lt.MulTRV(n.q, st.NegV(b, st.s_t1), st.s_t0));
d = ht.MulXV(n, i.GetVertex(f), kt);
p = s.GetSupport(lt.MulTRV(o.q, b, st.s_t0));
y = ht.MulXV(o, s.GetVertex(p), Dt);
const e = st.SubVV(d, y, Gt);
b.Normalize();
const r = st.DotVV(b, e), m = st.DotVV(b, a);
if (r - v > h * m) {
if (m <= 0) return !1;
if ((h = (r - v) / m) > 1) return !1;
l.Copy(b).SelfNeg();
c.m_count = 0;
}
const _ = u[c.m_count];
_.indexA = p;
_.wA.Copy(y).SelfMulAdd(h, a);
_.indexB = f;
_.wB.Copy(d);
_.w.Copy(_.wB).SelfSub(_.wA);
_.a = 1;
c.m_count += 1;
switch (c.m_count) {
case 1:
break;

case 2:
c.Solve2();
break;

case 3:
c.Solve3();
}
if (3 === c.m_count) return !1;
c.GetClosestPoint(b);
++S;
}
const x = Rt, A = Lt;
c.GetWitnessPoints(x, A);
if (b.LengthSquared() > 0) {
l.Copy(b).SelfNeg();
l.Normalize();
}
t.normal.Copy(l);
t.lambda = h;
t.iterations = S;
return !0;
};
e.b2Pair = ee;
e.b2BroadPhase = ie;
e.b2PairLessThan = se;
e.b2TreeNode = Qt;
e.b2DynamicTree = te;
e.b2_toi_reset = function() {
e.b2_toiTime = 0;
e.b2_toiMaxTime = 0;
e.b2_toiCalls = 0;
e.b2_toiIters = 0;
e.b2_toiMaxIters = 0;
e.b2_toiRootIters = 0;
e.b2_toiMaxRootIters = 0;
};
e.b2TOIInput = me;
e.b2TOIOutput = ue;
e.b2SeparationFunction = _e;
e.b2TimeOfImpact = Ae;
e.b2CollideCircles = Ce;
e.b2CollidePolygonAndCircle = Ie;
e.b2CollidePolygons = ti;
e.b2CollideEdgeAndCircle = hi;
e.b2CollideEdgeAndPolygon = fi;
e.b2MassData = di;
e.b2Shape = pi;
e.b2CircleShape = yi;
e.b2PolygonShape = bi;
e.b2EdgeShape = vi;
e.b2ChainShape = gi;
e.b2Filter = Si;
e.b2FixtureDef = xi;
e.b2FixtureProxy = Ai;
e.b2Fixture = Bi;
e.b2BodyDef = class {
constructor() {
this.type = e.b2BodyType.b2_staticBody;
this.position = new st(0, 0);
this.angle = 0;
this.linearVelocity = new st(0, 0);
this.angularVelocity = 0;
this.linearDamping = 0;
this.angularDamping = 0;
this.allowSleep = !0;
this.awake = !0;
this.fixedRotation = !1;
this.bullet = !1;
this.active = !0;
this.userData = null;
this.gravityScale = 1;
}
};
e.b2Body = wi;
e.b2World = zs;
e.b2DestructionListener = class {
SayGoodbyeJoint(t) {}
SayGoodbyeFixture(t) {}
SayGoodbyeParticleGroup(t) {}
SayGoodbyeParticle(t, e) {}
};
e.b2ContactFilter = es;
e.b2ContactImpulse = is;
e.b2ContactListener = ss;
e.b2QueryCallback = rs;
e.b2RayCastCallback = class {
ReportFixture(t, e, i, s) {
return s;
}
ReportParticle(t, e, i, s, r) {
return 0;
}
ShouldQueryParticleSystem(t) {
return !0;
}
};
e.b2Island = bs;
e.b2Profile = os;
e.b2TimeStep = as;
e.b2Position = ls;
e.b2Velocity = hs;
e.b2SolverData = cs;
e.b2ContactManager = ns;
e.b2MixFriction = Ni;
e.b2MixRestitution = zi;
e.b2ContactEdge = Ji;
e.b2Contact = Ui;
e.b2ContactRegister = Qi;
e.b2ContactFactory = ts;
e.g_blockSolve = ms;
e.b2VelocityConstraintPoint = us;
e.b2ContactVelocityConstraint = _s;
e.b2ContactPositionConstraint = fs;
e.b2ContactSolverDef = ds;
e.b2PositionSolverManifold = ps;
e.b2ContactSolver = ys;
e.b2CircleContact = Hi;
e.b2PolygonContact = Wi;
e.b2PolygonAndCircleContact = Ki;
e.b2EdgeAndCircleContact = Xi;
e.b2EdgeAndPolygonContact = Zi;
e.b2ChainAndCircleContact = $i;
e.b2ChainAndPolygonContact = Yi;
e.b2Jacobian = class {
constructor() {
this.linear = new st();
this.angularA = 0;
this.angularB = 0;
}
SetZero() {
this.linear.SetZero();
this.angularA = 0;
this.angularB = 0;
return this;
}
Set(t, e, i) {
this.linear.Copy(t);
this.angularA = e;
this.angularB = i;
return this;
}
};
e.b2JointEdge = Ci;
e.b2JointDef = Vi;
e.b2Joint = Mi;
e.b2AreaJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_areaJoint);
this.bodies = [];
this.frequencyHz = 0;
this.dampingRatio = 0;
}
AddBody(t) {
this.bodies.push(t);
1 === this.bodies.length ? this.bodyA = t : 2 === this.bodies.length && (this.bodyB = t);
}
};
e.b2AreaJoint = ki;
e.b2DistanceJointDef = Pi;
e.b2DistanceJoint = Ii;
e.b2FrictionJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_frictionJoint);
this.localAnchorA = new st();
this.localAnchorB = new st();
this.maxForce = 0;
this.maxTorque = 0;
}
Initialize(t, e, i) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(i, this.localAnchorA);
this.bodyB.GetLocalPoint(i, this.localAnchorB);
}
};
e.b2FrictionJoint = Di;
e.b2GearJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_gearJoint);
this.ratio = 1;
}
};
e.b2GearJoint = Ti;
e.b2MotorJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_motorJoint);
this.linearOffset = new st(0, 0);
this.angularOffset = 0;
this.maxForce = 1;
this.maxTorque = 1;
this.correctionFactor = .3;
}
Initialize(t, e) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(this.bodyB.GetPosition(), this.linearOffset);
const i = this.bodyA.GetAngle(), s = this.bodyB.GetAngle();
this.angularOffset = s - i;
}
};
e.b2MotorJoint = Gi;
e.b2MouseJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_mouseJoint);
this.target = new st();
this.maxForce = 0;
this.frequencyHz = 5;
this.dampingRatio = .7;
}
};
e.b2MouseJoint = Ri;
e.b2PrismaticJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_prismaticJoint);
this.localAnchorA = new st();
this.localAnchorB = new st();
this.localAxisA = new st(1, 0);
this.referenceAngle = 0;
this.enableLimit = !1;
this.lowerTranslation = 0;
this.upperTranslation = 0;
this.enableMotor = !1;
this.maxMotorForce = 0;
this.motorSpeed = 0;
}
Initialize(t, e, i, s) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(i, this.localAnchorA);
this.bodyB.GetLocalPoint(i, this.localAnchorB);
this.bodyA.GetLocalVector(s, this.localAxisA);
this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
}
};
e.b2PrismaticJoint = Li;
e.b2_minPulleyLength = 2;
e.b2PulleyJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_pulleyJoint);
this.groundAnchorA = new st(-1, 1);
this.groundAnchorB = new st(1, 1);
this.localAnchorA = new st(-1, 0);
this.localAnchorB = new st(1, 0);
this.lengthA = 0;
this.lengthB = 0;
this.ratio = 1;
this.collideConnected = !0;
}
Initialize(t, e, i, s, r, n, o) {
this.bodyA = t;
this.bodyB = e;
this.groundAnchorA.Copy(i);
this.groundAnchorB.Copy(s);
this.bodyA.GetLocalPoint(r, this.localAnchorA);
this.bodyB.GetLocalPoint(n, this.localAnchorB);
this.lengthA = st.DistanceVV(r, i);
this.lengthB = st.DistanceVV(n, s);
this.ratio = o;
}
};
e.b2PulleyJoint = Fi;
e.b2RevoluteJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_revoluteJoint);
this.localAnchorA = new st(0, 0);
this.localAnchorB = new st(0, 0);
this.referenceAngle = 0;
this.enableLimit = !1;
this.lowerAngle = 0;
this.upperAngle = 0;
this.enableMotor = !1;
this.motorSpeed = 0;
this.maxMotorTorque = 0;
}
Initialize(t, e, i) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(i, this.localAnchorA);
this.bodyB.GetLocalPoint(i, this.localAnchorB);
this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
}
};
e.b2RevoluteJoint = Ei;
e.b2RopeJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_ropeJoint);
this.localAnchorA = new st(-1, 0);
this.localAnchorB = new st(1, 0);
this.maxLength = 0;
}
};
e.b2RopeJoint = Oi;
e.b2WeldJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_weldJoint);
this.localAnchorA = new st();
this.localAnchorB = new st();
this.referenceAngle = 0;
this.frequencyHz = 0;
this.dampingRatio = 0;
}
Initialize(t, e, i) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(i, this.localAnchorA);
this.bodyB.GetLocalPoint(i, this.localAnchorB);
this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
}
};
e.b2WeldJoint = ji;
e.b2WheelJointDef = class extends Vi {
constructor() {
super(e.b2JointType.e_wheelJoint);
this.localAnchorA = new st(0, 0);
this.localAnchorB = new st(0, 0);
this.localAxisA = new st(1, 0);
this.enableMotor = !1;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.frequencyHz = 2;
this.dampingRatio = .7;
}
Initialize(t, e, i, s) {
this.bodyA = t;
this.bodyB = e;
this.bodyA.GetLocalPoint(i, this.localAnchorA);
this.bodyB.GetLocalPoint(i, this.localAnchorB);
this.bodyA.GetLocalVector(s, this.localAxisA);
}
};
e.b2WheelJoint = qi;
e.b2ControllerEdge = Js;
e.b2Controller = Us;
e.b2BuoyancyController = class extends Us {
constructor() {
super(...arguments);
this.normal = new st(0, 1);
this.offset = 0;
this.density = 0;
this.velocity = new st(0, 0);
this.linearDrag = 0;
this.angularDrag = 0;
this.useDensity = !1;
this.useWorldGravity = !0;
this.gravity = new st(0, 0);
}
Step(t) {
if (this.m_bodyList) {
this.useWorldGravity && this.gravity.Copy(this.m_bodyList.body.GetWorld().GetGravity());
for (let t = this.m_bodyList; t; t = t.nextBody) {
const e = t.body;
if (!e.IsAwake()) continue;
const i = new st(), s = new st();
let n = 0, o = 0;
for (let t = e.GetFixtureList(); t; t = t.m_next) {
const r = new st(), a = t.GetShape().ComputeSubmergedArea(this.normal, this.offset, e.GetTransform(), r);
n += a;
i.x += a * r.x;
i.y += a * r.y;
let l = 0;
o += a * (l = this.useDensity ? t.GetDensity() : 1);
s.x += a * r.x * l;
s.y += a * r.y * l;
}
i.x /= n;
i.y /= n;
s.x /= o;
s.y /= o;
if (n < r) continue;
const a = this.gravity.Clone().SelfNeg();
a.SelfMul(this.density * n);
e.ApplyForce(a, s);
const l = e.GetLinearVelocityFromWorldPoint(i, new st());
l.SelfSub(this.velocity);
l.SelfMul(-this.linearDrag * n);
e.ApplyForce(l, i);
e.ApplyTorque(-e.GetInertia() / e.GetMass() * n * e.GetAngularVelocity() * this.angularDrag);
}
}
}
Draw(t) {
const e = 100, i = new st(), s = new st();
i.x = this.normal.x * this.offset + this.normal.y * e;
i.y = this.normal.y * this.offset - this.normal.x * e;
s.x = this.normal.x * this.offset - this.normal.y * e;
s.y = this.normal.y * this.offset + this.normal.x * e;
const r = new mt(0, 0, .8);
t.DrawSegment(i, s, r);
}
};
e.b2ConstantAccelController = Hs;
e.b2ConstantForceController = class extends Us {
constructor() {
super(...arguments);
this.F = new st(0, 0);
}
Step(t) {
for (let t = this.m_bodyList; t; t = t.nextBody) {
const e = t.body;
e.IsAwake() && e.ApplyForce(this.F, e.GetWorldCenter());
}
}
Draw(t) {}
};
e.b2GravityController = Ws;
e.b2TensorDampingController = Ks;
e.b2ParticleDef = vs;
e.b2CalculateParticleIterations = gs;
e.b2ParticleHandle = Ss;
e.b2ParticleGroupDef = xs;
e.b2ParticleGroup = As;
e.b2GrowableBuffer = Rs;
e.b2FixtureParticleQueryCallback = Ls;
e.b2ParticleContact = Fs;
e.b2ParticleBodyContact = Es;
e.b2ParticlePair = Os;
e.b2ParticleTriad = js;
e.b2ParticleSystemDef = qs;
e.b2ParticleSystem = Ns;
e.b2RopeDef = class {
constructor() {
this.vertices = [];
this.count = 0;
this.masses = [];
this.gravity = new st(0, 0);
this.damping = .1;
this.k2 = .9;
this.k3 = .1;
}
};
e.b2Rope = Xs;
t.a(e, "__esModule", {
value: !0
});
});
},
9: function(t, e) {
var i = t(11), s = t(10), r = 65536, n = h(5 << 20), o = function() {
try {
return new Uint32Array(r);
} catch (i) {
for (var t = new Array(r), e = 0; e < r; e++) t[e] = 0;
return t;
}
}(), a = {
4: 65536,
5: 262144,
6: 1048576,
7: 4194304
};
function l() {
for (var t = 0; t < r; t++) o[t] = 0;
}
function h(t) {
try {
return new Uint8Array(t);
} catch (s) {
for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0;
return e;
}
}
function c(t, e, i) {
if (void 0 !== typeof t.buffer) {
if (Uint8Array.prototype.slice) return t.slice(e, i);
var s = t.length;
e = (e |= 0) < 0 ? Math.max(s + e, 0) : Math.min(e, s);
i = (i = void 0 === i ? s : 0 | i) < 0 ? Math.max(s + i, 0) : Math.min(i, s);
for (var r = new Uint8Array(i - e), n = e, o = 0; n < i; ) r[o++] = t[n++];
return r;
}
return t.slice(e, i);
}
e.compressBound = function(t) {
return t + t / 255 + 16 | 0;
};
e.decompressBound = function(t) {
var e = 0;
if (407708164 !== s.readU32(t, e)) throw new Error("invalid magic number");
e += 4;
var i = t[e++];
if (64 != (192 & i)) throw new Error("incompatible descriptor version " + (192 & i));
var r = 0 != (16 & i), n = 0 != (8 & i), o = t[e++] >> 4 & 7;
if (void 0 === a[o]) throw new Error("invalid block size " + o);
var l = a[o];
if (n) return s.readU64(t, e);
e++;
for (var h = 0; ;) {
var c = s.readU32(t, e);
e += 4;
h += 2147483648 & c ? c &= 2147483647 : l;
if (0 === c) return h;
r && (e += 4);
e += c;
}
};
e.makeBuffer = h;
e.decompressBlock = function(t, e, i, s, r) {
var n, o, a, l, h;
a = i + s;
for (;i < a; ) {
var c = t[i++], m = c >> 4;
if (m > 0) {
if (15 === m) for (;;) {
m += t[i];
if (255 !== t[i++]) break;
}
for (l = i + m; i < l; ) e[r++] = t[i++];
}
if (i >= a) break;
n = 15 & c;
o = t[i++] | t[i++] << 8;
if (15 === n) for (;;) {
n += t[i];
if (255 !== t[i++]) break;
}
for (l = (h = r - o) + (n += 4); h < l; ) e[r++] = 0 | e[h++];
}
return r;
};
e.compressBlock = function(t, e, i, r, n) {
var o, a, l, h, c, m, u, _;
m = 0;
u = r + i;
a = i;
if (r >= 13) for (var f = 67; i + 4 < u - 5; ) {
var d = s.readU32(t, i), p = s.hashU32(d) >>> 0;
o = n[p = (p >> 16 ^ p) >>> 0 & 65535] - 1;
n[p] = i + 1;
if (o < 0 || i - o >>> 16 > 0 || s.readU32(t, o) !== d) i += f++ >> 6; else {
f = 67;
c = i - a;
h = i - o;
o += 4;
l = i += 4;
for (;i < u - 5 && t[i] === t[o]; ) {
i++;
o++;
}
var y = (l = i - l) < 15 ? l : 15;
if (c >= 15) {
e[m++] = 240 + y;
for (_ = c - 15; _ >= 255; _ -= 255) e[m++] = 255;
e[m++] = _;
} else e[m++] = (c << 4) + y;
for (var b = 0; b < c; b++) e[m++] = t[a + b];
e[m++] = h;
e[m++] = h >> 8;
if (l >= 15) {
for (_ = l - 15; _ >= 255; _ -= 255) e[m++] = 255;
e[m++] = _;
}
a = i;
}
}
if (0 === a) return 0;
if ((c = u - a) >= 15) {
e[m++] = 240;
for (_ = c - 15; _ >= 255; _ -= 255) e[m++] = 255;
e[m++] = _;
} else e[m++] = c << 4;
i = a;
for (;i < u; ) e[m++] = t[i++];
return m;
};
e.decompressFrame = function(t, i) {
var r, n, o, l, h = 0, c = 0;
if (407708164 !== s.readU32(t, h)) throw new Error("invalid magic number");
h += 4;
if (64 != (192 & (l = t[h++]))) throw new Error("incompatible descriptor version");
r = 0 != (16 & l);
n = 0 != (4 & l);
o = 0 != (8 & l);
var m = t[h++] >> 4 & 7;
if (void 0 === a[m]) throw new Error("invalid block size");
o && (h += 8);
h++;
for (;;) {
var u;
u = s.readU32(t, h);
h += 4;
if (0 === u) break;
r && (h += 4);
if (0 != (2147483648 & u)) {
u &= 2147483647;
for (var _ = 0; _ < u; _++) i[c++] = t[h++];
} else {
c = e.decompressBlock(t, i, h, u, c);
h += u;
}
}
n && (h += 4);
return c;
};
e.compressFrame = function(t, r) {
var h = 0;
s.writeU32(r, h, 407708164);
h += 4;
r[h++] = 64;
r[h++] = 112;
r[h] = i.hash(0, r, 4, h - 4) >> 8;
h++;
var c = a[7], m = t.length, u = 0;
l();
for (;m > 0; ) {
var _, f = m > c ? c : m;
if ((_ = e.compressBlock(t, n, u, f, o)) > f || 0 === _) {
s.writeU32(r, h, 2147483648 | f);
h += 4;
for (var d = u + f; u < d; ) r[h++] = t[u++];
m -= f;
} else {
s.writeU32(r, h, _);
h += 4;
for (var p = 0; p < _; ) r[h++] = n[p++];
u += f;
m -= f;
}
}
s.writeU32(r, h, 0);
return h + 4;
};
e.decompress = function(t, i) {
var s, r;
void 0 === i && (i = e.decompressBound(t));
s = e.makeBuffer(i);
(r = e.decompressFrame(t, s)) !== i && (s = c(s, 0, r));
return s;
};
e.compress = function(t, i) {
var s, r;
void 0 === i && (i = e.compressBound(t.length));
s = e.makeBuffer(i);
(r = e.compressFrame(t, s)) !== i && (s = c(s, 0, r));
return s;
};
},
10: function(t, e) {
e.hashU32 = function(t) {
return -1252372727 ^ (t = (t = (t = 374761393 + (t = -949894596 ^ (t = 2127912214 + (t |= 0) + (t << 12) | 0) ^ t >>> 19) + (t << 5) | 0) - 744332180 ^ t << 9) - 42973499 + (t << 3) | 0) ^ t >>> 16 | 0;
};
e.readU64 = function(t, e) {
var i = 0;
i |= t[e++] << 0;
i |= t[e++] << 8;
i |= t[e++] << 16;
i |= t[e++] << 24;
i |= t[e++] << 32;
i |= t[e++] << 40;
return (i |= t[e++] << 48) | t[e++] << 56;
};
e.readU32 = function(t, e) {
var i = 0;
i |= t[e++] << 0;
i |= t[e++] << 8;
return (i |= t[e++] << 16) | t[e++] << 24;
};
e.writeU32 = function(t, e, i) {
t[e++] = i >> 0 & 255;
t[e++] = i >> 8 & 255;
t[e++] = i >> 16 & 255;
t[e++] = i >> 24 & 255;
};
e.imul = function(t, e) {
var i = 65535 & t, s = 65535 & e;
return i * s + ((t >>> 16) * s + i * (e >>> 16) << 16) | 0;
};
},
11: function(t, e) {
var i = t(10), s = 2654435761, r = 2246822519, n = 3266489917, o = 668265263, a = 374761393;
function l(t, e) {
return (t |= 0) >>> (32 - (e |= 0) | 0) | t << e | 0;
}
function h(t, e, s) {
t |= 0;
e |= 0;
s |= 0;
return 0 | i.imul(t >>> (32 - e | 0) | t << e, s);
}
function c(t, e) {
return (t |= 0) >>> (e |= 0) ^ t | 0;
}
function m(t, e, s, r, n) {
return h(i.imul(e, s) + t, r, n);
}
function u(t, e, r) {
return h(t + i.imul(e[r], a), 11, s);
}
function _(t, e, s) {
return m(t, i.readU32(e, s), n, 17, o);
}
function f(t, e, n) {
return [ m(t[0], i.readU32(e, n + 0), r, 13, s), m(t[1], i.readU32(e, n + 4), r, 13, s), m(t[2], i.readU32(e, n + 8), r, 13, s), m(t[3], i.readU32(e, n + 12), r, 13, s) ];
}
e.hash = function(t, e, o, h) {
var m, d;
d = h;
if (h >= 16) {
m = [ t + s + r, t + r, t, t - s ];
for (;h >= 16; ) {
m = f(m, e, o);
o += 16;
h -= 16;
}
m = l(m[0], 1) + l(m[1], 7) + l(m[2], 12) + l(m[3], 18) + d;
} else m = t + a + h >>> 0;
for (;h >= 4; ) {
m = _(m, e, o);
o += 4;
h -= 4;
}
for (;h > 0; ) {
m = u(m, e, o);
o++;
h--;
}
return (m = c(i.imul(c(i.imul(c(m, 15), r), 13), n), 16)) >>> 0;
};
},
HortorJsb: function(t, e) {
"use strict";
t.A(e);
const i = cc.sys.os === cc.sys.OS_IOS, s = cc.sys.os === cc.sys.OS_ANDROID;
let r;
class n {
static setup(t) {
r = t;
}
static fireImage(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireImage:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireImage", "(Ljava/lang/String;)V", t);
}
static fireAnimation(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireAnimation:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireAnimation", "(Ljava/lang/String;)V", t);
}
static fireRefresh() {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireRefresh");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireRefresh", "()V");
}
static fireScreenshot(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireScreenshot:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireScreenshot", "(Ljava/lang/String;)V", t);
}
static fireScreenVideo(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireScreenVideo:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireScreenVideo", "(Ljava/lang/String;)V", t);
}
static firePlayHistory(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "firePlayHistory:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "firePlayHistory", "(Ljava/lang/String;)V", t);
}
static fireEditGameHistory(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireEditGameHistory:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireEditGameHistory", "(Ljava/lang/String;)V", t);
}
static fireError(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireError:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireError", "(Ljava/lang/String;)V", t);
}
static fireErrorParticular(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireErrorParticular:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireErrorParticular", "(Ljava/lang/String;)V", t);
}
static firePublishGame(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "firePublishGame:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "firePublishGame", "(Ljava/lang/String;)V", t);
}
static fireBugReport(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireBugReport:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireBugReport", "(Ljava/lang/String;)V", t);
}
static fireDrawAvatar(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireDrawAvatar:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireDrawAvatar", "(Ljava/lang/String;)V", t);
}
static ready() {
i && jsb.reflection.callStaticMethod("HortorJsb", "ready");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "ready", "()V");
}
static quitGame() {
i && jsb.reflection.callStaticMethod("HortorJsb", "quitGame");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "quitGame", "()V");
}
static readMemory(t) {
return i ? jsb.reflection.callStaticMethod("HortorJsb", "readMemory:", t) : s ? jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "readMemory", "(Ljava/lang/String;)Ljava/lang/String;", t) : void 0;
}
static writeMemory(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "writeMemory:content:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "writeMemory", "(Ljava/lang/String;Ljava/lang/String;)V", t, e);
}
static showRewardAds(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "showRewardAds:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "showRewardAds", "(Ljava/lang/String;)V", t);
}
static trackEvent(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "trackEvent:info:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "trackEvent", "(Ljava/lang/String;Ljava/lang/String;)V", t, e);
}
static makeLog(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "makeLog:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "makeLog", "(Ljava/lang/String;)V", t);
}
static onRewardAdsResult(t) {
r && r.onRewardAdsResult(t);
}
static onRewardAdsResultV2(t, e) {
r && r.onRewardAdsResultV2(t, e);
}
static onTakeScreenshot() {
r && r.onTakeScreenshot();
}
static setVolume(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "setVolume:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "setVolume", "(F)V", t);
}
static playAudio(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "playAudio:sessionId:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "playAudio", "(Ljava/lang/String;Ljava/lang/String;)V", t, e);
}
static playAudioV2(t, e, r) {
i && jsb.reflection.callStaticMethod("HortorJsb", "playAudioV2:sessionId:volume:", t, e, r);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "playAudioV2", "(Ljava/lang/String;Ljava/lang/String;F)V", t, e, r);
}
static onAudioFinish(t) {
r && r.onAudioFinish(t);
}
static playAudioLoop(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "playAudioLoop:sessionId:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "playAudioLoop", "(Ljava/lang/String;Ljava/lang/String;)V", t, e);
}
static stopAudio(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "stopAudio:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "stopAudio", "(Ljava/lang/String;)V", t);
}
static playBGM(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "playBGM:loop:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "playBGM", "(Ljava/lang/String;Z)V", t, e);
}
static playBGMV2(t, e, r) {
i && jsb.reflection.callStaticMethod("HortorJsb", "playBGMV2:loop:volume:", t, e, r);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "playBGMV2", "(Ljava/lang/String;ZF)V", t, e, r);
}
static pauseBGM() {
i && jsb.reflection.callStaticMethod("HortorJsb", "pauseBGM");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "pauseBGM", "()V");
}
static resumeBGM() {
i && jsb.reflection.callStaticMethod("HortorJsb", "resumeBGM");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "resumeBGM", "()V");
}
static stopBGM() {
i && jsb.reflection.callStaticMethod("HortorJsb", "stopBGM");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "stopBGM", "()V");
}
static stopAllSounds() {
i && jsb.reflection.callStaticMethod("HortorJsb", "stopAllSounds");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "stopAllSounds", "()V");
}
static setAppOrientation(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "setAppOrientation:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "setAppOrientation", "(F)V", t);
}
static isTablet() {
return i ? jsb.reflection.callStaticMethod("HortorJsb", "isTablet") : s ? jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "isTablet", "()Z") : void 0;
}
static shareRoom(t, e, r) {
i && jsb.reflection.callStaticMethod("HortorJsb", "shareRoom:gameId:channelCode:", t, e, r);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "shareRoom", "(Ljava/lang/String;Ljava/lang/String;F)V", t, e, r);
}
static shareGame(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "shareGame:channelCode:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "shareGame", "(Ljava/lang/String;F)V", t, e);
}
static shareGameV2(t, e, r) {
i && jsb.reflection.callStaticMethod("HortorJsb", "shareGameV2:channelCode:isCmd:", t, e, r);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "shareGameV2", "(Ljava/lang/String;FZ)V", t, e, r);
}
static shareGameV3(t, e, r, n) {
i && jsb.reflection.callStaticMethod("HortorJsb", "shareGameV3:channelCode:isCmd:imagePath:", t, e, r, n);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "shareGameV3", "(Ljava/lang/String;FZLjava/lang/String;)V", t, e, r, n);
}
static onShareResult(t, e, i) {
r && r.onShareResult(t, e, i);
}
static startRecordScreen() {
i && jsb.reflection.callStaticMethod("HortorJsb", "startRecordScreen");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "startRecordScreen", "()V");
}
static stopRecordScreen() {
i && jsb.reflection.callStaticMethod("HortorJsb", "stopRecordScreen");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "stopRecordScreen", "()V");
}
static onRecordScreenStarted() {
r && r.onRecordScreenStarted();
}
static onRecordScreenStopped(t, e) {
r && r.onRecordScreenStopped(t, e);
}
static openPhotoAlbum(t, e, r = 0, n = 0) {
i && jsb.reflection.callStaticMethod("HortorJsb", "openPhotoAlbum:type:min:max:", t, e, r, n);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "openPhotoAlbum", "(Ljava/lang/String;Ljava/lang/String;FF)V", t, e, r, n);
}
static onOpenPhotoAlbumResult(t, e, i) {
r && r.onOpenPhotoAlbumResult(t, e, i);
}
static openPhotoAlbumList(t, e = 1, r = !0) {
i && jsb.reflection.callStaticMethod("HortorJsb", "openPhotoAlbumList:maxAssets:gifEnable:", t, e, r);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "openPhotoAlbumList", "(Ljava/lang/String;FZ)V", t, e, r);
}
static onOpenPhotoAlbumListResult(t, e) {
r && r.onOpenPhotoAlbumListResult(t, e);
}
static editBGM(t, e, r, n, o, a, l, h) {
i && jsb.reflection.callStaticMethod("HortorJsb", "editBGM:mp3Path:duration:name:type:uuid:startTime:cutDuration:", t, e, r, n, o, a, l, h);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "editBGM", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", t, e, r, n, o, a, l, h);
}
static onEditBGMResult(t, e, i, s, n) {
r && r.onEditBGMResult(t, e, i, s, n);
}
static onNetworkEvent(t, e) {
r && r.onNetworkEvent(t, e);
}
static onAppEvent(t, e) {
r && r.onAppEvent(t, e);
}
static gameLoadProcess(t, e) {
i && jsb.reflection.callStaticMethod("HortorJsb", "gameLoadProcess:finish:", t, e);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "gameLoadProcess", "(FZ)V", t, e);
}
static getCopyBoard() {
return i ? jsb.reflection.callStaticMethod("HortorJsb", "getCopyBoard") : s ? jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "getCopyBoard", "()Ljava/lang/String;") : void 0;
}
static registerAngleSensor() {
i && jsb.reflection.callStaticMethod("HortorJsb", "registerAngleSensor");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "registerAngleSensor", "()V");
}
static onAngleChanged(t, e, i) {
r && r.onAngleChanged(t, e, i);
}
static unregisterAngleSensor() {
i && jsb.reflection.callStaticMethod("HortorJsb", "unregisterAngleSensor");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "unregisterAngleSensor", "()V");
}
static registerAccelerationSensor() {
i && jsb.reflection.callStaticMethod("HortorJsb", "registerAccelerationSensor");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "registerAccelerationSensor", "()V");
}
static onSpeedChanged(t, e, i) {
r && r.onSpeedChanged(t, e, i);
}
static unregisterAccelerationSensor() {
i && jsb.reflection.callStaticMethod("HortorJsb", "unregisterAccelerationSensor");
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "unregisterAccelerationSensor", "()V");
}
static vibrate() {
i && jsb.reflection.callStaticMethod("HortorJsb", "vibrate");
}
static getNativeChannel() {
return i ? jsb.reflection.callStaticMethod("HortorJsb", "getNativeChannel") : s ? jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "getNativeChannel", "()Ljava/lang/String;") : void 0;
}
static openHelpCenter(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "openHelpCenter:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "openHelpCenter", "(Ljava/lang/String;)V", t);
}
static openInGameWeb(t, e, r) {
i && jsb.reflection.callStaticMethod("HortorJsb", "openInGameWeb:title:fullScreen:", t, e, r);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "openInGameWeb", "(Ljava/lang/String;Ljava/lang/String;Z)V", t, e, r);
}
static fireRestoreImage(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireRestoreImage:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireRestoreImage", "(Ljava/lang/String;)V", t);
}
static fireRestoreAnimation(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireRestoreAnimation:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireRestoreAnimation", "(Ljava/lang/String;)V", t);
}
static fireRestoreAvatar(t) {
i && jsb.reflection.callStaticMethod("HortorJsb", "fireRestoreAvatar:", t);
s && jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "fireRestoreAvatar", "(Ljava/lang/String;)V", t);
}
static openFlutterPage(t, e) {
return i ? jsb.reflection.callStaticMethod("HortorJsb", "openFlutterPage:arguments:", t, e) : s ? jsb.reflection.callStaticMethod("com/hortor/creator/bind/HortorJsb", "openFlutterPage", "(Ljava/lang/String;Ljava/lang/String;)Z", t, e) : void 0;
}
}
e.default = n;
window.HortorJsb = n;
},
HortorNative: function(t, e) {
"use strict";
var i = t.b;
t.A(e);
e.NativeRoot = e.RecordHandler = void 0;
const s = i(t("HortorJsb"));
e.RecordHandler = class {};
class r {
constructor() {
this.bridger = null;
this.waitingCon = null;
this.isHandling = !1;
this.ver = "";
this.recoderHandler = null;
this._startLis = !1;
this._startYaw = 0;
this.deviceAngleX = 0;
this.deviceAngleY = 0;
this.deviceAngleZ = 0;
this.deviceAccX = 0;
this.deviceAccY = 0;
this.deviceAccZ = 0;
}
init() {
console.log("init native");
this.initCacthErrors();
}
initCacthErrors() {
window.__errorHandler = function(t, e, i, r) {
let n = {
errMsg: r,
file: t,
line: e,
msg: i
}, o = {
tsCore: window.coreCode,
detail: JSON.stringify(n).slice(0, 2e3)
}, a = JSON.stringify(o);
s.default.fireErrorParticular(a);
};
}
attchBridge(t) {
this.bridger = t;
}
isHolding() {
return null != this.waitingCon || this.isHandling;
}
playRewardAds() {
return new Promise(t => {
let e = this.getRewardAdsID();
if (e && "" != e) {
s.default.showRewardAds(e);
this.onRewardAdsResult = t;
} else t(!1);
});
}
playRewardAdsV2() {
return new Promise(t => {
let e = this.getRewardAdsID();
if (e && "" != e) {
s.default.showRewardAds(e);
this.onRewardAdsResultV2 = t;
} else t({
success: !1,
transId: ""
});
});
}
shareGame(t, e) {
return new Promise(i => {
s.default.shareGame(t, e);
this.onShareResult = i;
});
}
shareGameV2(t, e, i, r = "") {
return new Promise(n => {
s.default.shareGameV3 ? s.default.shareGameV3(t, e, i, r) : s.default.shareGameV2(t, e, i);
this.onShareResult = n;
});
}
getRewardAdsID() {
return s.default.readMemory("_adsId");
}
setRecordHandler(t) {
this.recoderHandler = t;
}
}
e.NativeRoot = r;
const n = new r();
n.init();
const o = {
onTakeScreenshot() {
if (!n.bridger) return;
var t = window.capture();
let e = jsb.fileUtils.getWritablePath() + "temp/screenshot.png";
jsb.saveImageData(t.readPixels(), t.width, t.height, e);
var i = {
filePath: e,
staffId: n.bridger.getStaffId()
};
s.default.fireScreenshot(JSON.stringify(i));
},
onRewardAdsResult: function(t) {
if (!n.bridger) return;
if (!n.onRewardAdsResult) return;
let e = n.onRewardAdsResult;
n.onRewardAdsResult = null;
setTimeout(() => {
e(t);
}, 500);
},
onRewardAdsResultV2: function(t, e) {
if (!n.bridger) return;
if (!n.onRewardAdsResultV2) return;
let i = n.onRewardAdsResultV2;
n.onRewardAdsResultV2 = null;
setTimeout(() => {
i({
success: t,
transId: e
});
}, 500);
},
onShareResult(t, e, i) {
if (!n.bridger) return;
if (!n.onShareResult) return;
let s = n.onShareResult;
n.onShareResult = null;
setTimeout(() => {
s({
success: t,
channel: e,
extra: i
});
}, 500);
},
onAudioFinish: function(t) {
n.bridger && n.bridger.soundFinish(t);
},
onRecordScreenStarted() {
n.recoderHandler && n.recoderHandler.onStart();
},
onRecordScreenStopped(t, e) {
n.recoderHandler && n.recoderHandler.onStop(t, e);
},
onOpenPhotoAlbumResult: function(t, e, i) {
cc.game.emit("onOpenPhotoAlbumResult", t, e, i);
},
onOpenPhotoAlbumListResult(t, e) {
cc.game.emit("onOpenPhotoAlbumListResult", t, e);
},
onEditBGMResult: function(t, e, i, s, r) {
cc.game.emit("onEditBGMResult", t, e, i, s, r);
},
onNetworkEvent(t, e) {
cc.game.emit("onNetworkEvent", t, e);
},
onAppEvent(t, e) {
cc.game.emit("onAppEvent", t, e);
},
onAngleChanged(t, e, i) {
if (!n._startLis && 0 !== i) {
n._startLis = !0;
Math.abs(i) < 1 || Math.abs(360 - i) < 1 ? n._startYaw = 0 : n._startYaw = i;
}
n.deviceAngleX = t;
n.deviceAngleY = e;
n.deviceAngleZ = (i - n._startYaw + 360) % 360;
},
onSpeedChanged(t, e, i) {
n.deviceAccX = t;
n.deviceAccY = e;
n.deviceAccZ = i;
}
};
s.default.setup(o);
window.connector = n;
window.capture = () => {
let t = cc.Camera.cameras;
t.sort((t, e) => t.depth - e.depth);
let e = cc.view.getVisibleSize(), i = [];
t.forEach(t => {
let s = new cc.RenderTexture();
s.initWithSize(e.width, e.height, 36168);
t.targetTexture = s;
t.render();
t.targetTexture = null;
i.push(s);
});
let s = new cc.RenderTexture();
s.initWithSize(e.width, e.height, 36168);
s.setFlipY(!0);
let r = new cc.Node(), n = r.addComponent(cc.Camera);
n.backgroundColor = cc.Color.TRANSPARENT;
n.clearFlags = 5;
n.cullingMask = 1 << cc.game.groupList.groupIndex;
n.targetTexture = s;
cc.director.getScene().addChild(r);
r.width = e.width;
r.height = e.height;
r.x = e.width / 2;
r.y = e.height / 2;
i.forEach(t => {
let e = new cc.Node();
e.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
e.width = 100;
e.height = 100;
r.addChild(e);
});
n.render(r);
r.removeFromParent();
r.destroy();
return s;
};
},
ModImports: function(t, e) {
"use strict";
t.c, t.d;
var i = t.f, s = t.g;
t.A(e);
e.decode = e.encode = e.Int64 = e.DataWriter = e.DataReader = e.BonEncoder = e.BonDecoder = void 0;
i(t(4), e);
i(t(5), e);
i(t(7), e);
i(t(3), e);
i(t(6), e);
const r = s(t(2));
jsb.BonDecoder.encode && (r.encode = function(t) {
return jsb.BonDecoder.encode(t, r.Int64, 0);
});
r.decode = jsb.BonDecoder.decode;
e.BonDecoder = r.BonDecoder;
e.BonEncoder = r.BonEncoder;
e.DataReader = r.DataReader;
e.DataWriter = r.DataWriter;
e.Int64 = r.Int64;
e.encode = r.encode;
e.decode = r.decode;
i(t(8), e);
},
NativeDefines: function(t, e) {
"use strict";
t.A(e);
e.isNativeBgmFixed = void 0;
e.isNativeBgmFixed = !0;
},
Prepares: function(t, e, i) {
"use strict";
cc._RF.push(i, "7442cVyx15OYZo/5D0cJ2FB", "Prepares");
var s = t.e, r = t.h, n = t.b;
t.A(e);
const o = n(t("HortorJsb")), a = n(t("ProgressLabel")), {ccclass: l, property: h} = cc._decorator, c = [ "localBundle", "remoteBundle", "codeBundle" ];
let m = class extends cc.Component {
constructor() {
super(...arguments);
this.wechatNode = null;
}
start() {
this.wechatNode.active = !1;
o.default.ready();
this.scheduleOnce(this._preprare);
}
_preprare() {
return r(this, void 0, void 0, function*() {
o.default.gameLoadProcess(Math.floor(6 * Math.random()) + 10, !1);
if (yield this._prepareBundles()) {
o.default.gameLoadProcess(Math.floor(11 * Math.random()) + 20, !1);
console.log("prepare end");
this.scheduleOnce(() => {
cc.director.loadScene("Game");
});
} else {
console.log("quit by bundle");
o.default.quitGame();
}
});
}
_prepareBundles() {
return r(this, void 0, void 0, function*() {
let t = this._getBundlePath(), e = this._getBundleHash();
cc.log("bundle path: " + t);
cc.log("write path: " + jsb.fileUtils.getWritablePath());
for (let i = 0; i < c.length; ++i) {
let s = e.get(c[i]), r = yield this._loadBundle(t + c[i], s);
if (!r) return !1;
if (0 == i) {
window.localBundle = r;
console.log("set localBundle");
} else if (1 == i) {
window.remoteBundle = r;
console.log("set remoteBundle");
}
}
window.connector.ver = this._getBundleVersion();
return !0;
});
}
_loadBundle(t, e) {
return new Promise(i => {
let s = {};
e && "" != e && (s = {
version: e
});
cc.assetManager.loadBundle(t, s, (t, e) => {
if (t) {
cc.error(t);
i(null);
} else i(e);
});
});
}
_getBundlePath() {
var t = o.default.readMemory("_bundlePath");
t || (t = "");
return t + "/";
}
_getBundleVersion() {
var t = o.default.readMemory("_bundleVersion");
t || (t = "");
return t;
}
_getBundleHash() {
var t = o.default.readMemory("_bundleHash");
t || (t = "{}");
return new Map(Object.entries(JSON.parse(t)));
}
_loadBundleMiniGame() {
return r(this, void 0, void 0, function*() {
let t = [], e = this.wechatNode.getComponentInChildren(a.default);
e.prefix = "加载中...";
let i = Math.floor(100 / c.length);
for (let s = 0; s < c.length; ++s) t.push(new Promise(t => r(this, void 0, void 0, function*() {
e.max += i;
yield this._loadBundle(c[s], null);
t(null);
})));
yield Promise.all(t);
cc.director.loadScene("Game");
});
}
};
s([ h(cc.Node) ], m.prototype, "wechatNode", void 0);
m = s([ l ], m);
e.default = m;
cc._RF.pop();
},
ProgressLabel: function(t, e, i) {
"use strict";
cc._RF.push(i, "a1938gyWVtAXJzMwRzVN3fH", "ProgressLabel");
var s = t.e;
t.A(e);
const {ccclass: r, property: n} = cc._decorator;
let o = class extends cc.Component {
constructor() {
super(...arguments);
this.prefix = "";
this.max = 0;
this._step = 0;
this._label = null;
}
start() {
this._label = this.getComponent(cc.Label);
}
update(t) {
if (this._label && !(this._step >= this.max)) {
this._step += 1;
this._label.string = `${this.prefix}${this._step.toFixed(0)}%`;
}
}
};
o = s([ r ], o);
e.default = o;
cc._RF.pop();
},
ScaleFit: function(t, e, i) {
"use strict";
cc._RF.push(i, "3017bkRW+1NUo+wI7MNs7WD", "ScaleFit");
var s = t.e;
t.A(e);
const {ccclass: r, property: n} = cc._decorator;
let o = class extends cc.Component {
start() {
if (!window.wx || !window.wx.getWindowInfo) return;
let t = window.wx.getWindowInfo(), e = (t.windowWidth, t.windowHeitht);
e > 1334 && (this.node.scale = e / 1334);
}
};
o = s([ r ], o);
e.default = o;
cc._RF.pop();
},
ScreenRectRoot: function(t, e, i) {
"use strict";
cc._RF.push(i, "766a2c09UxOCb21600sjnrK", "ScreenRectRoot");
var s = t.e;
t.A(e);
const {ccclass: r, property: n} = cc._decorator;
let o = class extends cc.Component {
onLoad() {
this._updateRect();
}
_updateRect() {
let t = cc.view.getCanvasSize().width, e = cc.view.getCanvasSize().height, i = cc.view.getScaleX(), s = t / 750;
e / t <= 1136 / 750 && (s *= .5);
t /= s;
e /= s;
i /= s;
this.node.scale = 1 / i;
this.node.width = t;
this.node.height = e;
}
};
o = s([ r ], o);
e.default = o;
cc._RF.pop();
},
fix: function(t) {
(function() {
Array.prototype.includes || t.a(Array.prototype, "includes", {
enumerable: !1,
value: function(t) {
return -1 !== this.indexOf(t);
}
});
Array.prototype.delete || t.a(Array.prototype, "delete", {
enumerable: !1,
value: function(t) {
var e = this.indexOf(t);
if (e > -1) {
this.splice(e, 1);
return !0;
}
return !1;
}
});
})();
(function() {
if (cc.WXSubContextView) {
let t = cc.WXSubContextView.prototype.onLoad;
cc.WXSubContextView.prototype.onLoad = function() {
this._tex.initWithData(new Uint8Array(new ArrayBuffer(4)), 16, 1, 1);
t.call(this);
};
}
})();
}
}, {}, [ "fix", "HortorJsb", "HortorNative", "ModImports", "NativeDefines", "ProgressLabel", "ScaleFit", "ScreenRectRoot", "Prepares" ]);