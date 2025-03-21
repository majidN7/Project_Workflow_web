/*! For license information, please see app/welcome/camunda-welcome-bootstrap.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports["app/welcome/camunda-welcome-bootstrap"] = t())
    : (e["app/welcome/camunda-welcome-bootstrap"] = t());
})(self, function () {
  return (self.webpackChunkcamunda_bpm_webapp =
    self.webpackChunkcamunda_bpm_webapp || []).push([
    [459],
    {
      12338: function (module, __unused_webpack_exports, __webpack_require__) {
        "use strict";
        var CamundaForm = __webpack_require__(21299),
          angular = __webpack_require__(30336),
          $ = CamundaForm.$,
          constants = __webpack_require__(99842),
          CamundaFormAngular = CamundaForm.extend({
            renderForm: function () {
              var e = this;
              function t(e, t) {
                var n = $(t);
                if (!n.attr("ng-model")) {
                  var i = n.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
                  i && n.attr("ng-model", i);
                }
              }
              (this.formElement = angular.element(this.formElement)),
                CamundaForm.prototype.renderForm.apply(this, arguments);
              for (var n = 0; n < this.formFieldHandlers.length; n++) {
                var i = this.formFieldHandlers[n].selector;
                $(i, e.formElement).each(t);
              }
              this.formElement = angular.element(this.formElement);
              var r = e.formElement.injector();
              if (r) {
                var a = e.formElement.scope();
                r.invoke([
                  "$compile",
                  function (t) {
                    t(e.formElement)(a);
                  },
                ]),
                  (a.camForm = this);
              }
            },
            executeFormScript: function executeFormScript(script) {
              this.formElement = angular.element(this.formElement);
              var moment = __webpack_require__(98024),
                injector = this.formElement.injector(),
                scope = this.formElement.scope();
              (function (camForm, $scope, moment) {
                var inject = function (e) {
                  if (!angular.isFunction(e) && !angular.isArray(e))
                    throw new Error("Must call inject(array|fn)");
                  injector.instantiate(e, { $scope: scope });
                };
                eval(script);
              })(this, scope, moment);
            },
            fireEvent: function () {
              this.formElement = angular.element(this.formElement);
              var e = this,
                t = arguments,
                n = this.formElement.scope(),
                i = function () {
                  CamundaForm.prototype.fireEvent.apply(e, t);
                },
                r = e.formElement.injector();
              r &&
                r.invoke([
                  "$rootScope",
                  function (e) {
                    var t = e.$$phase;
                    "$apply" !== t && "$digest" !== t
                      ? n.$apply(function () {
                          i();
                        })
                      : i();
                  },
                ]);
            },
          });
        module.exports = CamundaFormAngular;
      },
      99325: function (e, t, n) {
        "use strict";
        var i = n(30336),
          r = n(12338),
          a = n(59084).isType,
          o = i.module("cam.embedded.forms", []);
        o.directive("camVariableName", [
          "$rootScope",
          function (e) {
            return {
              require: "ngModel",
              link: function (t, n, i, r) {
                n.on("camFormVariableApplied", function (n, i) {
                  var a = e.$$phase;
                  "$apply" !== a && "$digest" !== a
                    ? t.$apply(function () {
                        r.$setViewValue(i);
                      })
                    : r.$setViewValue(i);
                });
              },
            };
          },
        ]),
          o.directive("camVariableType", [
            function () {
              return {
                require: "ngModel",
                link: function (e, t, n, i) {
                  var r = function (e) {
                    var r = n.camVariableType;
                    return (
                      i.$setValidity("camVariableType", !0),
                      (e || !1 === e || "Bytes" === r) &&
                        (-1 !== ["Boolean", "String", "Bytes"].indexOf(r) ||
                          a(e, r) ||
                          i.$setValidity("camVariableType", !1),
                        "file" === n.type &&
                          "Bytes" === r &&
                          t[0].files &&
                          t[0].files[0] &&
                          t[0].files[0].size > (n.camMaxFilesize || 5e6) &&
                          i.$setValidity("camVariableType", !1)),
                      e
                    );
                  };
                  i.$parsers.unshift(r),
                    i.$formatters.push(r),
                    n.$observe("camVariableType", function () {
                      return r(i.$viewValue);
                    }),
                    t.bind("change", function () {
                      r(i.$viewValue), e.$apply();
                    });
                },
              };
            },
          ]),
          (e.exports = r);
      },
      59721: function (e, t, n) {
        "use strict";
        e.exports = { Client: n(12444), Form: n(99325), utils: n(37914) };
      },
      10123: function (e, t, n) {
        "use strict";
        var i = n(60314),
          r = n(32278);
        function a() {}
        var o = n(99099).extend(
          {
            initialize: function () {
              this.http = this.constructor.http;
            },
          },
          {
            path: "",
            http: {},
            create: function () {},
            list: function (e, t) {
              "function" == typeof e && ((t = e), (e = {})),
                (e = e || {}),
                (t = t || a);
              var n = this,
                r = { count: 0, items: [] },
                o = i.defer(),
                s = !1,
                c = !1,
                l = function () {
                  c && s && (n.trigger("loaded", r), o.resolve(r), t(null, r));
                };
              return (
                n.count(e, function (e, i) {
                  e
                    ? (n.trigger("error", e), o.reject(e), t(e))
                    : ((r.count = i), (s = !0), l());
                }),
                n.http.get(n.path, {
                  data: e,
                  done: function (i, a) {
                    i
                      ? (n.trigger("error", i), o.reject(i), t(i))
                      : ((r.items = a),
                        (r.firstResult = parseInt(e.firstResult || 0, 10)),
                        (r.maxResults =
                          r.firstResult + parseInt(e.maxResults || 10, 10)),
                        (c = !0),
                        l());
                  },
                }),
                o.promise
              );
            },
            count: function (e, t) {
              "function" == typeof e && ((t = e), (e = {})),
                (e = e || {}),
                (t = t || a);
              var n = this,
                r = i.defer();
              return (
                this.http.get(this.path + "/count", {
                  data: e,
                  done: function (e, i) {
                    e
                      ? (n.trigger("error", e), r.reject(e), t(e))
                      : (r.resolve(i.count), t(null, i.count));
                  },
                }),
                r.promise
              );
            },
            update: function () {},
            delete: function () {},
          }
        );
        r.attach(o), (e.exports = o);
      },
      34873: function (e, t) {
        "use strict";
        t.createSimpleGetQueryFunction = function (e) {
          return function (t, n) {
            var i = this.path + e;
            return (
              "function" == typeof t && ((n = t), (t = {})),
              this.http.get(i, { data: t, done: n })
            );
          };
        };
      },
      2160: function (e, t, n) {
        "use strict";
        n(67559), n(85541), n(84392), n(66893);
        var i = n(77707),
          r = n(60314),
          a = n(32278),
          o = n(37914);
        function s() {}
        var c = function (e) {
          if (
            (((e = e || {}).headers = e.headers || {}),
            e.headers.Accept ||
              (e.headers.Accept =
                "application/hal+json, application/json; q=0.5"),
            !e.baseUrl)
          )
            throw new Error(
              "HttpClient needs a `baseUrl` configuration property."
            );
          a.attach(this), (this.config = e);
        };
        function l(e, t, n) {
          return (
            (t = t || s),
            function (i, r) {
              if (i || (!r.ok && !r.noContent))
                return (
                  (i =
                    i ||
                    r.error ||
                    new Error(
                      "The " +
                        r.req.method +
                        " request on " +
                        r.req.url +
                        " failed"
                    )),
                  r && r.body && r.body.message && (i.message = r.body.message),
                  e.trigger("error", i),
                  n && n.reject(i),
                  t(i, null, r.headers)
                );
              "application/hal+json" === r.type &&
                ((r.body && 0 !== Object.keys(r.body).length) ||
                  (r.body = JSON.parse(r.text)),
                (r.body = o.solveHALEmbedded(r.body))),
                n && n.resolve(r.body ? r.body : r.text ? r.text : ""),
                t(null, r.body ? r.body : r.text ? r.text : "", r.headers);
            }
          );
        }
        (c.prototype.post = function (e, t) {
          var n = (t = t || {}).done || s,
            a = r.defer(),
            o = this.config.baseUrl + (e ? "/" + e : ""),
            c = i.post(o),
            u = t.headers || this.config.headers;
          u.Accept = u.Accept || this.config.headers.Accept;
          var p = !1;
          if ("undefined" != typeof Buffer)
            Object.keys(t.fields || {}).forEach(function (e) {
              c.field(e, t.fields[e]), (p = !0);
            }),
              (t.attachments || []).forEach(function (e, t) {
                c.attach("data_" + t, new Buffer(e.content), e.name), (p = !0);
              });
          else if (t.fields || t.attachments) {
            var d = new Error(
              "Multipart request is only supported in node.js environement."
            );
            return n(d), a.reject(d);
          }
          return (
            p || c.send(t.data || {}),
            c.set(u).query(t.query || {}),
            c.end(l(this, n, a)),
            a.promise
          );
        }),
          (c.prototype.get = function (e, t) {
            var n = this.config.baseUrl + (e ? "/" + e : "");
            return this.load(n, t);
          }),
          (c.prototype.load = function (e, t) {
            var n = (t = t || {}).done || s,
              a = r.defer(),
              o = t.headers || this.config.headers,
              c = t.accept || o.Accept || this.config.headers.Accept;
            return (
              i
                .get(e)
                .set(o)
                .set("Accept", c)
                .query(t.data || {})
                .end(l(this, n, a)),
              a.promise
            );
          }),
          (c.prototype.put = function (e, t) {
            var n = (t = t || {}).done || s,
              a = r.defer(),
              o = this.config.baseUrl + (e ? "/" + e : ""),
              c = t.headers || this.config.headers;
            return (
              (c.Accept = c.Accept || this.config.headers.Accept),
              i
                .put(o)
                .set(c)
                .send(t.data || {})
                .end(l(this, n, a)),
              a.promise
            );
          }),
          (c.prototype.del = function (e, t) {
            var n = (t = t || {}).done || s,
              a = r.defer(),
              o = this.config.baseUrl + (e ? "/" + e : ""),
              c = t.headers || this.config.headers;
            return (
              (c.Accept = c.Accept || this.config.headers.Accept),
              i
                .del(o)
                .set(c)
                .send(t.data || {})
                .end(l(this, n, a)),
              a.promise
            );
          }),
          (c.prototype.options = function (e, t) {
            var n = (t = t || {}).done || s,
              a = r.defer(),
              o = this.config.baseUrl + (e ? "/" + e : ""),
              c = t.headers || this.config.headers;
            return (
              (c.Accept = c.Accept || this.config.headers.Accept),
              i("OPTIONS", o).set(c).end(l(this, n, a)),
              a.promise
            );
          }),
          (e.exports = c);
      },
      12444: function (e, t, n) {
        "use strict";
        n(72595), n(84392);
        var i = n(32278);
        function r(e) {
          if (!e) throw new Error("Needs configuration");
          if (!e.apiUri) throw new Error("An apiUri is required");
          i.attach(this),
            (e.engine = void 0 !== e.engine ? e.engine : "default"),
            (e.mock = void 0 === e.mock || e.mock),
            (e.resources = e.resources || {}),
            (this.HttpClient = e.HttpClient || r.HttpClient),
            (this.baseUrl = e.apiUri),
            e.engine &&
              ((this.baseUrl += "/" !== this.baseUrl.slice(-1) ? "/" : ""),
              (this.baseUrl += "engine/" + e.engine)),
            (this.config = e),
            this.initialize();
        }
        (r.HttpClient = n(2160)),
          (function (e) {
            e.config = {};
            var t = {};
            (e.initialize = function () {
              (t.authorization = n(51323)),
                (t.batch = n(6414)),
                (t.deployment = n(25755)),
                (t["external-task"] = n(82625)),
                (t.filter = n(43158)),
                (t.history = n(2094)),
                (t["process-definition"] = n(19901)),
                (t["process-instance"] = n(88659)),
                (t.task = n(50901)),
                (t["task-report"] = n(74928)),
                (t.telemetry = n(27033)),
                (t.variable = n(73420)),
                (t["case-execution"] = n(87259)),
                (t["case-instance"] = n(39690)),
                (t["case-definition"] = n(97268)),
                (t.user = n(23575)),
                (t.group = n(26805)),
                (t.tenant = n(77840)),
                (t.incident = n(74938)),
                (t["job-definition"] = n(68975)),
                (t.job = n(76453)),
                (t.metrics = n(89555)),
                (t["decision-definition"] = n(54742)),
                (t.execution = n(97224)),
                (t.migration = n(30766)),
                (t.drd = n(96712)),
                (t.modification = n(70460)),
                (t.message = n(5709)),
                (t["password-policy"] = n(95364));
              var e,
                i,
                r,
                a,
                o = this;
              function s(e) {
                o.trigger("error", e);
              }
              for (e in ((this.http = new this.HttpClient({
                baseUrl: this.baseUrl,
                headers: this.config.headers,
              })),
              t)) {
                for (a in ((i = {
                  name: e,
                  mock: this.config.mock,
                  baseUrl: this.baseUrl,
                  headers: this.config.headers,
                }),
                (r = this.config.resources[e] || {})))
                  i[a] = r[a];
                (t[e].http = new this.HttpClient(i)), t[e].http.on("error", s);
              }
            }),
              (e.resource = function (e) {
                return t[e];
              });
          })(r.prototype),
          (e.exports = r);
      },
      51323: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "authorization"),
          (i.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (i.create = function (e, t) {
            return this.http.post(this.path + "/create", { data: e, done: t });
          }),
          (i.update = function (e, t) {
            return this.http.put(this.path + "/" + e.id, { data: e, done: t });
          }),
          (i.save = function (e, t) {
            return i[e.id ? "update" : "create"](e, t);
          }),
          (i.delete = function (e, t) {
            return this.http.del(this.path + "/" + e, { done: t });
          }),
          (i.check = function (e, t) {
            return this.http.get(this.path + "/check", { data: e, done: t });
          }),
          (e.exports = i);
      },
      6414: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "batch"),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (i.suspended = function (e, t) {
            return this.http.put(this.path + "/" + e.id + "/suspended", {
              data: { suspended: !!e.suspended },
              done: t,
            });
          }),
          (i.statistics = function (e, t) {
            return this.http.get(this.path + "/statistics/", {
              data: e,
              done: t,
            });
          }),
          (i.statisticsCount = function (e, t) {
            return this.http.get(this.path + "/statistics/count", {
              data: e,
              done: t,
            });
          }),
          (i.delete = function (e, t) {
            var n = this.path + "/" + e.id;
            return (
              e.cascade && (n += "?cascade=true"), this.http.del(n, { done: t })
            );
          }),
          (e.exports = i);
      },
      97268: function (e, t, n) {
        "use strict";
        function i() {}
        var r = n(10123).extend();
        (r.path = "case-definition"),
          (r.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (r.getByKey = function (e, t) {
            return this.http.get(this.path + "/key/" + e, { done: t });
          }),
          (r.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (r.create = function (e, t) {
            var n = this.path + "/";
            return (
              e.id
                ? (n += e.id)
                : ((n = n + "key/" + e.key),
                  e.tenantId && (n = n + "/tenant-id/" + e.tenantId)),
              this.http.post(n + "/create", { data: e, done: t })
            );
          }),
          (r.xml = function (e, t) {
            var n = this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/xml";
            return this.http.get(n, { done: t || i });
          }),
          (r.updateHistoryTimeToLive = function (e, t, n) {
            var i = this.path + "/" + e + "/history-time-to-live";
            return this.http.put(i, { data: t, done: n });
          }),
          (e.exports = r);
      },
      87259: function (e, t, n) {
        "use strict";
        var i = n(10123),
          r = n(37914);
        function a() {}
        var o = i.extend();
        (o.path = "case-execution"),
          (o.list = function (e, t) {
            return (t = t || a), this.http.get(this.path, { data: e, done: t });
          }),
          (o.disable = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/disable", {
              data: t,
              done: n,
            });
          }),
          (o.reenable = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/reenable", {
              data: t,
              done: n,
            });
          }),
          (o.manualStart = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/manual-start", {
              data: t,
              done: n,
            });
          }),
          (o.complete = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/complete", {
              data: t,
              done: n,
            });
          }),
          (o.deleteVariable = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                e.id +
                "/localVariables/" +
                r.escapeUrl(e.varId),
              { done: t }
            );
          }),
          (o.modifyVariables = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/localVariables", {
              data: e,
              done: t,
            });
          }),
          (e.exports = o);
      },
      39690: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(10123),
          r = n(37914),
          a = i.extend();
        (a.path = "case-instance"),
          (a.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (a.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (a.close = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/close", {
              data: t,
              done: n,
            });
          }),
          (a.terminate = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/terminate", {
              data: t,
              done: n,
            });
          }),
          (a.setVariable = function (e, t, n) {
            var i = this.path + "/" + e + "/variables/" + r.escapeUrl(t.name);
            return this.http.put(i, { data: t, done: n });
          }),
          (e.exports = a);
      },
      54742: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "decision-definition"),
          (i.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (i.getXml = function (e, t) {
            return this.http.get(this.path + "/" + e + "/xml", { done: t });
          }),
          (i.evaluate = function (e, t) {
            return this.http.post(
              this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/evaluate",
              { data: e, done: t }
            );
          }),
          (i.updateHistoryTimeToLive = function (e, t, n) {
            var i = this.path + "/" + e + "/history-time-to-live";
            return this.http.put(i, { data: t, done: n });
          }),
          (e.exports = i);
      },
      25755: function (e, t, n) {
        "use strict";
        n(45477);
        var i = n(10123),
          r = i.extend();
        (r.path = "deployment"),
          (r.create = function (e, t) {
            var n = { "deployment-name": e.deploymentName },
              i = Array.isArray(e.files) ? e.files : [e.files];
            return (
              e.deploymentSource &&
                (n["deployment-source"] = e.deploymentSource),
              e.enableDuplicateFiltering &&
                (n["enable-duplicate-filtering"] = "true"),
              e.deployChangedOnly && (n["deploy-changed-only"] = "true"),
              e.tenantId && (n["tenant-id"] = e.tenantId),
              this.http.post(this.path + "/create", {
                data: {},
                fields: n,
                attachments: i,
                done: t,
              })
            );
          }),
          (r.delete = function (e, t, n) {
            var i = this.path + "/" + e;
            if (t) {
              var r = [];
              for (var a in t) {
                var o = t[a];
                r.push(a + "=" + o);
              }
              r.length && (i += "?" + r.join("&"));
            }
            return this.http.del(i, { done: n });
          }),
          (r.list = function () {
            return i.list.apply(this, arguments);
          }),
          (r.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (r.getResources = function (e, t) {
            return this.http.get(this.path + "/" + e + "/resources", {
              done: t,
            });
          }),
          (r.getResource = function (e, t, n) {
            return this.http.get(this.path + "/" + e + "/resources/" + t, {
              done: n,
            });
          }),
          (r.getResourceData = function (e, t, n) {
            return this.http.get(
              this.path + "/" + e + "/resources/" + t + "/data",
              { accept: "*/*", done: n }
            );
          }),
          (r.redeploy = function (e, t) {
            var n = e.id;
            return (
              delete e.id,
              this.http.post(this.path + "/" + n + "/redeploy", {
                data: e,
                done: t || function () {},
              })
            );
          }),
          (e.exports = r);
      },
      96712: function (e, t, n) {
        "use strict";
        var i = n(10123),
          r = n(37914),
          a = i.extend();
        function o(e, t) {
          return e + "/" + r.escapeUrl(t);
        }
        function s(e, t, n) {
          var i = e + "/key/" + r.escapeUrl(t);
          return (
            "function" != typeof n && (i += "/tenant-id/" + r.escapeUrl(n)), i
          );
        }
        (a.path = "decision-requirements-definition"),
          (a.count = function (e, t) {
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(this.path + "/count", { data: e, done: t })
            );
          }),
          (a.list = function (e, t) {
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(this.path, { data: e, done: t })
            );
          }),
          (a.get = function (e, t) {
            return this.http.get(o(this.path, e), { done: t });
          }),
          (a.getByKey = function (e, t, n) {
            var i = s(this.path, e, t);
            return (
              "function" == typeof t && (n = t), this.http.get(i, { done: n })
            );
          }),
          (a.getXML = function (e, t) {
            return this.http.get(o(this.path, e) + "/xml", { done: t });
          }),
          (a.getXMLByKey = function (e, t, n) {
            var i = s(this.path, e, t) + "/xml";
            return (
              "function" == typeof t && (n = t), this.http.get(i, { done: n })
            );
          }),
          (e.exports = a);
      },
      97224: function (e, t, n) {
        "use strict";
        var i = n(10123),
          r = n(37914),
          a = i.extend();
        (a.path = "execution"),
          (a.deleteVariable = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                e.id +
                "/localVariables/" +
                r.escapeUrl(e.varId),
              { done: t }
            );
          }),
          (a.modifyVariables = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/localVariables", {
              data: e,
              done: t,
            });
          }),
          (e.exports = a);
      },
      82625: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "external-task"),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e.id, { data: e, done: t });
          }),
          (i.list = function (e, t) {
            var n = this.path + "/";
            return (
              (n += "?firstResult=" + (e.firstResult || 0)),
              (n += "&maxResults=" + (e.maxResults || 15)),
              this.http.post(n, { data: e, done: t })
            );
          }),
          (i.count = function (e, t) {
            return this.http.post(this.path + "/count", { data: e, done: t });
          }),
          (i.fetchAndLock = function (e, t) {
            return this.http.post(this.path + "/fetchAndLock", {
              data: e,
              done: t,
            });
          }),
          (i.complete = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/complete", {
              data: e,
              done: t,
            });
          }),
          (i.failure = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/failure", {
              data: e,
              done: t,
            });
          }),
          (i.unlock = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/unlock", {
              data: e,
              done: t,
            });
          }),
          (i.retries = function (e, t) {
            return this.http.put(this.path + "/" + e.id + "/retries", {
              data: e,
              done: t,
            });
          }),
          (i.retriesAsync = function (e, t) {
            return this.http.post(this.path + "/retries-async", {
              data: e,
              done: t,
            });
          }),
          (e.exports = i);
      },
      43158: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "filter"),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (i.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (i.getTasks = function (e, t) {
            var n = this.path + "/";
            return (
              "string" == typeof e
                ? ((n = n + e + "/list"), (e = {}))
                : ((n = n + e.id + "/list"), delete e.id),
              (n += "?firstResult=" + (e.firstResult || 0)),
              (n += "&maxResults=" + (e.maxResults || 15)),
              this.http.post(n, { data: e, done: t })
            );
          }),
          (i.create = function (e, t) {
            return this.http.post(this.path + "/create", { data: e, done: t });
          }),
          (i.update = function (e, t) {
            return this.http.put(this.path + "/" + e.id, { data: e, done: t });
          }),
          (i.save = function (e, t) {
            return i[e.id ? "update" : "create"](e, t);
          }),
          (i.delete = function (e, t) {
            return this.http.del(this.path + "/" + e, { done: t });
          }),
          (i.authorizations = function (e, t) {
            return "function" == typeof e
              ? this.http.options(this.path, {
                  done: e,
                  headers: { Accept: "application/json" },
                })
              : this.http.options(this.path + "/" + e, {
                  done: t,
                  headers: { Accept: "application/json" },
                });
          }),
          (e.exports = i);
      },
      26805: function (e, t, n) {
        "use strict";
        var i = n(10123),
          r = n(37914);
        function a() {}
        var o = i.extend();
        (o.path = "group"),
          (o.options = function (e, t) {
            var n;
            return (
              "function" == typeof e
                ? ((t = e), (n = ""))
                : void 0 === (n = "string" == typeof e ? e : e.id) && (n = ""),
              this.http.options(this.path + "/" + r.escapeUrl(n), {
                done: t || a,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (o.create = function (e, t) {
            return this.http.post(this.path + "/create", {
              data: e,
              done: t || a,
            });
          }),
          (o.count = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path + "/count", { data: e, done: t || a })
            );
          }),
          (o.get = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.get(this.path + "/" + r.escapeUrl(n), {
              data: e,
              done: t || a,
            });
          }),
          (o.list = function (e, t) {
            "function" == typeof e ? ((t = e), (e = {})) : (e = e || {});
            var n = {};
            return (
              e.maxResults &&
                ((n.maxResults = e.maxResults),
                (n.firstResult = e.firstResult)),
              this.http.post(this.path, { data: e, query: n, done: t || a })
            );
          }),
          (o.createMember = function (e, t) {
            return this.http.put(
              this.path +
                "/" +
                r.escapeUrl(e.id) +
                "/members/" +
                r.escapeUrl(e.userId),
              { data: e, done: t || a }
            );
          }),
          (o.deleteMember = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                r.escapeUrl(e.id) +
                "/members/" +
                r.escapeUrl(e.userId),
              { data: e, done: t || a }
            );
          }),
          (o.update = function (e, t) {
            return this.http.put(this.path + "/" + r.escapeUrl(e.id), {
              data: e,
              done: t || a,
            });
          }),
          (o.delete = function (e, t) {
            return this.http.del(this.path + "/" + r.escapeUrl(e.id), {
              data: e,
              done: t || a,
            });
          }),
          (e.exports = o);
      },
      2094: function (e, t, n) {
        "use strict";
        var i = n(10123),
          r = n(34873),
          a = i.extend();
        (a.path = "history"),
          (a.userOperationCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/user-operation/count", {
                data: e,
                done: t,
              })
            );
          }),
          (a.userOperation = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/user-operation", { data: e, done: t })
            );
          }),
          (a.setUserOperationAnnotation = function (e, t) {
            return this.http.put(
              this.path + "/user-operation/" + e.id + "/set-annotation",
              { data: e, done: t }
            );
          }),
          (a.clearUserOperationAnnotation = function (e, t) {
            return this.http.put(
              this.path + "/user-operation/" + e + "/clear-annotation",
              { done: t }
            );
          }),
          (a.processInstance = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              r = ["firstResult", "maxResults"];
            for (var a in e) r.indexOf(a) > -1 ? (i[a] = e[a]) : (n[a] = e[a]);
            return this.http.post(this.path + "/process-instance", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (a.processInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/process-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (a.deleteProcessInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/process-instance/delete", {
                data: e,
                done: t,
              })
            );
          }),
          (a.setRemovalTimeToHistoricProcessInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/process-instance/set-removal-time", {
                data: e,
                done: t,
              })
            );
          }),
          (a.setRemovalTimeToHistoricDecisionInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(
                this.path + "/decision-instance/set-removal-time",
                { data: e, done: t }
              )
            );
          }),
          (a.setRemovalTimeToHistoricBatchesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/batch/set-removal-time", {
                data: e,
                done: t,
              })
            );
          }),
          (a.decisionInstance = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/decision-instance", {
                data: e,
                done: t,
              })
            );
          }),
          (a.decisionInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/decision-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (a.deleteDecisionInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/decision-instance/delete", {
                data: e,
                done: t,
              })
            );
          }),
          (a.batch = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/batch", { data: e, done: t })
            );
          }),
          (a.singleBatch = function (e, t) {
            return this.http.get(this.path + "/batch/" + e, { done: t });
          }),
          (a.batchCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/batch/count", { data: e, done: t })
            );
          }),
          (a.batchDelete = function (e, t) {
            var n = this.path + "/batch/" + e;
            return this.http.del(n, { done: t });
          }),
          (a.report = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              (e.reportType = e.reportType || "duration"),
              (e.periodUnit = e.periodUnit || "month"),
              this.http.get(this.path + "/process-instance/report", {
                data: e,
                done: t,
              })
            );
          }),
          (a.reportAsCsv = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              (e.reportType = e.reportType || "duration"),
              (e.periodUnit = e.periodUnit || "month"),
              this.http.get(this.path + "/process-instance/report", {
                data: e,
                accept: "text/csv",
                done: t,
              })
            );
          }),
          (a.task = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              r = ["firstResult", "maxResults"];
            for (var a in e) r.indexOf(a) > -1 ? (i[a] = e[a]) : (n[a] = e[a]);
            return this.http.post(this.path + "/task", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (a.taskCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/task/count", { data: e, done: t })
            );
          }),
          (a.taskDurationReport = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              (e.reportType = e.reportType || "duration"),
              (e.periodUnit = e.periodUnit || "month"),
              this.http.get(this.path + "/task/report", { data: e, done: t })
            );
          }),
          (a.taskReport = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              (e.reportType = e.reportType || "count"),
              this.http.get(this.path + "/task/report", { data: e, done: t })
            );
          }),
          (a.caseInstance = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              r = ["firstResult", "maxResults"];
            for (var a in e) r.indexOf(a) > -1 ? (i[a] = e[a]) : (n[a] = e[a]);
            return this.http.post(this.path + "/case-instance", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (a.caseInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/case-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (a.caseActivityInstance = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/case-activity-instance", {
                data: e,
                done: t,
              })
            );
          }),
          (a.caseActivityInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/case-activity-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (a.activityInstance = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/activity-instance", {
                data: e,
                done: t,
              })
            );
          }),
          (a.incident = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/incident", { data: e, done: t })
            );
          }),
          (a.variableInstance = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              r = ["firstResult", "maxResults", "deserializeValues"];
            for (var a in e) r.indexOf(a) > -1 ? (i[a] = e[a]) : (n[a] = e[a]);
            return this.http.post(this.path + "/variable-instance", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (a.variableInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/variable-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (a.caseActivityStatistics = function (e, t) {
            var n = e.id || e;
            return this.http.get(
              this.path + "/case-definition/" + n + "/statistics",
              { done: t }
            );
          }),
          (a.drdStatistics = function (e, t, n) {
            var i =
              this.path +
              "/decision-requirements-definition/" +
              e +
              "/statistics";
            return (
              "function" == typeof t && ((n = t), (t = {})),
              this.http.get(i, { data: t, done: n })
            );
          }),
          (a.cleanupConfiguration = function (e, t) {
            var n = this.path + "/cleanup/configuration";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.deleteVariable = function (e, t) {
            var n = this.path + "/variable-instance/" + e;
            return this.http.del(n, { done: t });
          }),
          (a.deleteAllVariables = function (e, t) {
            var n =
              this.path + "/process-instance/" + e + "/variable-instances";
            return this.http.del(n, { done: t });
          }),
          (a.cleanupJobs = function (e, t) {
            var n = this.path + "/cleanup/jobs";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanup = function (e, t) {
            var n = this.path + "/cleanup";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.post(n, { data: e, done: t })
            );
          }),
          (a.cleanableProcessCount = function (e, t) {
            var n =
              this.path +
              "/process-definition/cleanable-process-instance-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableProcess = function (e, t) {
            var n =
              this.path +
              "/process-definition/cleanable-process-instance-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableCaseCount = function (e, t) {
            var n =
              this.path +
              "/case-definition/cleanable-case-instance-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableCase = function (e, t) {
            var n =
              this.path + "/case-definition/cleanable-case-instance-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableDecisionCount = function (e, t) {
            var n =
              this.path +
              "/decision-definition/cleanable-decision-instance-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableDecision = function (e, t) {
            var n =
              this.path +
              "/decision-definition/cleanable-decision-instance-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableBatchCount = function (e, t) {
            var n = this.path + "/batch/cleanable-batch-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.cleanableBatch = function (e, t) {
            var n = this.path + "/batch/cleanable-batch-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.jobLogList = function (e, t) {
            var n = this.path + "/job-log";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.jobLogCount = function (e, t) {
            var n = this.path + "/job-log/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (a.externalTaskLogList =
            r.createSimpleGetQueryFunction("/external-task-log")),
          (a.externalTaskLogCount = r.createSimpleGetQueryFunction(
            "/external-task-log/count"
          )),
          (e.exports = a);
      },
      74938: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "incident"),
          (i.get = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (i.count = function (e, t) {
            return this.http.get(this.path + "/count", { data: e, done: t });
          }),
          (i.setAnnotation = function (e, t) {
            return this.http.put(this.path + "/" + e.id + "/annotation", {
              data: e,
              done: t,
            });
          }),
          (i.clearAnnotation = function (e, t) {
            return this.http.delete(this.path + "/" + e + "/annotation", {
              done: t,
            });
          }),
          (e.exports = i);
      },
      68975: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "job-definition"),
          (i.setRetries = function (e, t) {
            return this.http.put(this.path + "/" + e.id + "/retries", {
              data: e,
              done: t,
            });
          }),
          (i.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (e.exports = i);
      },
      76453: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "job"),
          (i.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (i.list = function (e, t) {
            var n = this.path;
            return (
              (n += "?firstResult=" + (e.firstResult || 0)),
              e.maxResults && (n += "&maxResults=" + e.maxResults),
              this.http.post(n, { data: e, done: t })
            );
          }),
          (i.setRetries = function (e, t) {
            return this.http.put(this.path + "/" + e.id + "/retries", {
              data: e,
              done: t,
            });
          }),
          (i.delete = function (e, t) {
            return this.http.del(this.path + "/" + e, { done: t });
          }),
          (i.stacktrace = function (e, t) {
            var n = this.path + "/" + e + "/stacktrace";
            return this.http.get(n, { accept: "text/plain", done: t });
          }),
          (i.recalculateDuedate = function (e, t) {
            var n = this.path + "/" + e.id + "/duedate/recalculate";
            return (
              0 == e.creationDateBased &&
                (n += "?creationDateBased=" + e.creationDateBased),
              this.http.post(n, { done: t })
            );
          }),
          (i.setDuedate = function (e, t) {
            var n = this.path + "/" + e.id + "/duedate";
            return this.http.put(n, { data: e, done: t });
          }),
          (i.suspended = function (e, t) {
            return this.http.put(this.path + "/" + e.id + "/suspended", {
              data: { suspended: !!e.suspended },
              done: t,
            });
          }),
          (e.exports = i);
      },
      5709: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "message"),
          (i.correlate = function (e, t) {
            var n = this.path + "/";
            return this.http.post(n, { data: e, done: t });
          }),
          (e.exports = i);
      },
      89555: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(10123).extend();
        (i.path = "metrics"),
          (i.sum = function (e, t) {
            var n = this.path + "/" + e.name + "/sum";
            return delete e.name, this.http.get(n, { data: e, done: t });
          }),
          (i.byInterval = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (e.exports = i);
      },
      30766: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "migration"),
          (i.generate = function (e, t) {
            var n = this.path + "/generate";
            return this.http.post(n, { data: e, done: t });
          }),
          (i.execute = function (e, t) {
            var n = this.path + "/execute";
            return this.http.post(n, { data: e, done: t });
          }),
          (i.executeAsync = function (e, t) {
            var n = this.path + "/executeAsync";
            return this.http.post(n, { data: e, done: t });
          }),
          (i.validate = function (e, t) {
            var n = this.path + "/validate";
            return this.http.post(n, { data: e, done: t });
          }),
          (e.exports = i);
      },
      70460: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "modification"),
          (i.execute = function (e, t) {
            var n = this.path + "/execute";
            return this.http.post(n, { data: e, done: t });
          }),
          (i.executeAsync = function (e, t) {
            var n = this.path + "/executeAsync";
            return this.http.post(n, { data: e, done: t });
          }),
          (e.exports = i);
      },
      95364: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "identity/password-policy"),
          (i.get = function (e) {
            return this.http.get(this.path, { done: e });
          }),
          (i.validate = function (e, t) {
            return (
              "string" == typeof e && (e = { password: e }),
              this.http.post(this.path, { data: e, done: t })
            );
          }),
          (e.exports = i);
      },
      19901: function (e, t, n) {
        "use strict";
        n(7089), n(45477);
        var i = n(60314),
          r = n(10123);
        function a() {}
        var o = r.extend(
          {
            suspend: function (e, t) {
              return (
                "function" == typeof e && ((t = e), (e = {})),
                (e = e || {}),
                (t = t || a),
                this.http.post(this.path, { done: t })
              );
            },
            stats: function (e) {
              return this.http.post(this.path, { done: e || a });
            },
            start: function (e) {
              return this.http.post(this.path, { data: {}, done: e });
            },
          },
          {
            path: "process-definition",
            get: function (e, t) {
              return this.http.get(this.path + "/" + e, { done: t });
            },
            getByKey: function (e, t) {
              return this.http.get(this.path + "/key/" + e, { done: t });
            },
            list: function () {
              return r.list.apply(this, arguments);
            },
            count: function () {
              return r.count.apply(this, arguments);
            },
            formVariables: function (e, t) {
              var n = "";
              if (((t = t || a), e.key)) n = "key/" + e.key;
              else {
                if (!e.id) {
                  var r = new Error(
                    "Process definition task variables needs either a key or an id."
                  );
                  return t(r), i.reject(r);
                }
                n = e.id;
              }
              var o = { deserializeValues: e.deserializeValues };
              return (
                e.names && (o.variableNames = (e.names || []).join(",")),
                this.http.get(this.path + "/" + n + "/form-variables", {
                  data: o,
                  done: t,
                })
              );
            },
            submitForm: function (e, t) {
              var n = "";
              if (((t = t || a), e.key))
                (n = "key/" + e.key),
                  e.tenantId && (n += "/tenant-id/" + e.tenantId);
              else {
                if (!e.id)
                  return t(
                    new Error(
                      "Process definition task variables needs either a key or an id."
                    )
                  );
                n = e.id;
              }
              return this.http.post(this.path + "/" + n + "/submit-form", {
                data: { businessKey: e.businessKey, variables: e.variables },
                done: t,
              });
            },
            delete: function (e, t) {
              t = t || a;
              var n = "";
              if (e.key)
                (n = "key/" + e.key),
                  e.tenantId && (n += "/tenant-id/" + e.tenantId),
                  (n += "/delete");
              else {
                if (!e.id)
                  return t(
                    new Error(
                      "Process definition deletion needs either a key or an id."
                    )
                  );
                n = e.id;
              }
              var i = "?",
                r = "cascade";
              return (
                "boolean" == typeof e[r] && (i += r + "=" + e[r]),
                "boolean" == typeof e[(r = "skipCustomListeners")] &&
                  (i.length > 1 && (i += "&"), (i += r + "=" + e[r])),
                "boolean" == typeof e[(r = "skipIoMappings")] &&
                  (i.length > 1 && (i += "&"), (i += r + "=" + e[r])),
                this.http.del(this.path + "/" + n + i, { done: t })
              );
            },
            startForm: function (e, t) {
              var n =
                this.path +
                "/" +
                (e.key ? "key/" + e.key : e.id) +
                "/startForm";
              return this.http.get(n, { done: t || a });
            },
            xml: function (e, t) {
              var n = this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/xml";
              return this.http.get(n, { done: t || a });
            },
            statistics: function (e, t) {
              var n = this.path;
              return (
                e.id ? (n += "/" + e.id) : e.key && (n += "/key/" + e.key),
                (n += "/statistics"),
                this.http.get(n, { data: e, done: t || a })
              );
            },
            submit: function (e, t) {
              var n = this.path;
              return (
                e.key ? (n += "/key/" + e.key) : (n += "/" + e.id),
                (n += "/submit-form"),
                this.http.post(n, { data: e, done: t })
              );
            },
            suspend: function (e, t, n) {
              return (
                "function" == typeof t && ((n = t), (t = {})),
                (t = t || {}),
                (n = n || a),
                (e = Array.isArray(e) ? e : [e]),
                this.http.post(this.path, { done: n })
              );
            },
            start: function (e, t) {
              var n = this.path + "/";
              return (
                e.id
                  ? (n += e.id)
                  : ((n = n + "key/" + e.key),
                    e.tenantId && (n = n + "/tenant-id/" + e.tenantId)),
                this.http.post(n + "/start", { data: e, done: t })
              );
            },
            updateHistoryTimeToLive: function (e, t, n) {
              var i = this.path + "/" + e + "/history-time-to-live";
              return this.http.put(i, { data: t, done: n });
            },
            restart: function (e, t, n) {
              var i = this.path + "/" + e + "/restart";
              return this.http.post(i, { data: t, done: n });
            },
            restartAsync: function (e, t, n) {
              var i = this.path + "/" + e + "/restart-async";
              return this.http.post(i, { data: t, done: n });
            },
            staticCalledProcessDefinitions: function (e, t) {
              var n = ""
                .concat(this.path, "/")
                .concat(e, "/static-called-process-definitions");
              return this.http.get(n, { done: t });
            },
          }
        );
        e.exports = o;
      },
      88659: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(10123),
          r = n(37914),
          a = i.extend(
            {},
            {
              path: "process-instance",
              get: function (e, t) {
                return this.http.get(this.path + "/" + e, { done: t });
              },
              create: function (e, t) {
                return this.http.post(e, t);
              },
              list: function (e, t) {
                var n = this.path;
                return (
                  (n += "?firstResult=" + (e.firstResult || 0)),
                  (n += "&maxResults=" + (e.maxResults || 15)),
                  this.http.post(n, { data: e, done: t })
                );
              },
              count: function (e, t) {
                var n = this.path + "/count";
                return this.http.post(n, { data: e, done: t });
              },
              getActivityInstances: function (e, t) {
                return this.http.get(
                  this.path + "/" + e + "/activity-instances",
                  { done: t }
                );
              },
              modify: function (e, t) {
                return this.http.post(
                  this.path + "/" + e.id + "/modification",
                  { data: e, done: t }
                );
              },
              modifyAsync: function (e, t) {
                return this.http.post(
                  this.path + "/" + e.id + "/modification-async",
                  { data: e, done: t }
                );
              },
              deleteAsync: function (e, t) {
                return this.http.post(this.path + "/delete", {
                  data: e,
                  done: t,
                });
              },
              deleteAsyncHistoricQueryBased: function (e, t) {
                return this.http.post(
                  this.path + "/delete-historic-query-based",
                  { data: e, done: t }
                );
              },
              setJobsRetriesAsync: function (e, t) {
                return this.http.post(this.path + "/job-retries", {
                  data: e,
                  done: t,
                });
              },
              setJobsRetriesAsyncHistoricQueryBased: function (e, t) {
                return this.http.post(
                  this.path + "/job-retries-historic-query-based",
                  { data: e, done: t }
                );
              },
              suspendAsync: function (e, t) {
                return this.http.post(this.path + "/suspended-async", {
                  data: e,
                  done: t,
                });
              },
              setVariablesAsync: function (e, t) {
                return this.http.post(this.path + "/variables-async", {
                  data: e,
                  done: t,
                });
              },
              correlateMessageAsync: function (e, t) {
                return this.http.post(this.path + "/message-async", {
                  data: e,
                  done: t,
                });
              },
              setVariable: function (e, t, n) {
                var i =
                  this.path + "/" + e + "/variables/" + r.escapeUrl(t.name);
                return this.http.put(i, { data: t, done: n });
              },
            }
          );
        e.exports = a;
      },
      74928: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "task/report"),
          (i.countByCandidateGroup = function (e) {
            return this.http.get(this.path + "/candidate-group-count", {
              done: e,
            });
          }),
          (i.countByCandidateGroupAsCsv = function (e) {
            return this.http.get(this.path + "/candidate-group-count", {
              accept: "text/csv",
              done: e,
            });
          }),
          (e.exports = i);
      },
      50901: function (e, t, n) {
        "use strict";
        n(45477);
        var i = n(60314),
          r = n(10123),
          a = n(37914);
        function o() {}
        var s = r.extend();
        (s.path = "task"),
          (s.list = function (e, t) {
            t = t || o;
            var n = i.defer();
            return (
              this.http.get(this.path, {
                data: e,
                done: function (e, i) {
                  if (e) return t(e), n.reject(e);
                  if (i._embedded) {
                    var r = i._embedded.task || i._embedded.tasks,
                      a = i._embedded.processDefinition;
                    for (var o in r) {
                      var s = r[o];
                      for (var c in ((s._embedded = s._embedded || {}), a))
                        if (a[c].id === s.processDefinitionId) {
                          s._embedded.processDefinition = [a[c]];
                          break;
                        }
                    }
                  }
                  t(null, i), n.resolve(i);
                },
              }),
              n.promise
            );
          }),
          (s.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (s.comments = function (e, t) {
            return this.http.get(this.path + "/" + e + "/comment", { done: t });
          }),
          (s.identityLinks = function (e, t) {
            return this.http.get(this.path + "/" + e + "/identity-links", {
              done: t,
            });
          }),
          (s.identityLinksAdd = function (e, t, n) {
            return (
              2 === arguments.length &&
                ((n = arguments[1]), (e = (t = arguments[0]).id)),
              this.http.post(this.path + "/" + e + "/identity-links", {
                data: t,
                done: n,
              })
            );
          }),
          (s.identityLinksDelete = function (e, t, n) {
            return (
              2 === arguments.length &&
                ((n = arguments[1]), (e = (t = arguments[0]).id)),
              this.http.post(this.path + "/" + e + "/identity-links/delete", {
                data: t,
                done: n,
              })
            );
          }),
          (s.createComment = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/comment/create", {
              data: "string" == typeof t ? { message: t } : t,
              done: n,
            });
          }),
          (s.create = function (e, t) {
            return this.http.post(this.path + "/create", { data: e, done: t });
          }),
          (s.update = function (e, t) {
            return this.http.put(this.path + "/" + e.id, { data: e, done: t });
          }),
          (s.assignee = function (e, t, n) {
            var i = { userId: t };
            return (
              2 === arguments.length &&
                ((e = arguments[0].taskId),
                (i.userId = arguments[0].userId),
                (n = arguments[1])),
              this.http.post(this.path + "/" + e + "/assignee", {
                data: i,
                done: n,
              })
            );
          }),
          (s.delegate = function (e, t, n) {
            var i = { userId: t };
            return (
              2 === arguments.length &&
                ((e = arguments[0].taskId),
                (i.userId = arguments[0].userId),
                (n = arguments[1])),
              this.http.post(this.path + "/" + e + "/delegate", {
                data: i,
                done: n,
              })
            );
          }),
          (s.claim = function (e, t, n) {
            var i = { userId: t };
            return (
              2 === arguments.length &&
                ((e = arguments[0].taskId),
                (i.userId = arguments[0].userId),
                (n = arguments[1])),
              this.http.post(this.path + "/" + e + "/claim", {
                data: i,
                done: n,
              })
            );
          }),
          (s.unclaim = function (e, t) {
            return (
              "string" != typeof e && (e = e.taskId),
              this.http.post(this.path + "/" + e + "/unclaim", { done: t })
            );
          }),
          (s.submitForm = function (e, t) {
            if (((t = t || o), !e.id)) {
              var n = new Error("Task submitForm needs a task id.");
              return t(n), i.reject(n);
            }
            return this.http.post(this.path + "/" + e.id + "/submit-form", {
              data: { variables: e.variables },
              done: t,
            });
          }),
          (s.complete = function (e, t) {
            if (((t = t || o), !e.id)) {
              var n = new Error("Task complete needs a task id.");
              return t(n), i.reject(n);
            }
            return this.http.post(this.path + "/" + e.id + "/complete", {
              data: { variables: e.variables },
              done: t,
            });
          }),
          (s.bpmnEscalation = function (e, t) {
            if (((t = t || o), !e.id || !e.escalationCode)) {
              var n = new Error(
                "Task bpmnEscalation needs a task id and escalation code."
              );
              return t(n), i.reject(n);
            }
            return this.http.post(this.path + "/" + e.id + "/bpmnEscalation", {
              data: {
                escalationCode: e.escalationCode,
                variables: e.variables,
              },
              done: t,
            });
          }),
          (s.bpmnError = function (e, t) {
            if (((t = t || o), !e.id || !e.errorCode)) {
              var n = new Error(
                "Task bpmnError needs a task id and error code."
              );
              return t(n), i.reject(n);
            }
            return this.http.post(this.path + "/" + e.id + "/bpmnError", {
              data: {
                variables: e.variables,
                errorCode: e.errorCode,
                errorMessage: e.errorMessage,
              },
              done: t,
            });
          }),
          (s.formVariables = function (e, t) {
            t = t || o;
            var n = "";
            if (e.key) n = "key/" + e.key;
            else {
              if (!e.id) {
                var r = new Error(
                  "Task variables needs either a key or an id."
                );
                return t(r), i.reject(r);
              }
              n = e.id;
            }
            var a = { deserializeValues: e.deserializeValues };
            return (
              e.names && (a.variableNames = e.names.join(",")),
              this.http.get(this.path + "/" + n + "/form-variables", {
                data: a,
                done: t,
              })
            );
          }),
          (s.form = function (e, t) {
            return this.http.get(this.path + "/" + e + "/form", { done: t });
          }),
          (s.localVariable = function (e, t) {
            return this.http.put(
              this.path + "/" + e.id + "/localVariables/" + e.varId,
              { data: e, done: t }
            );
          }),
          (s.localVariables = function (e, t) {
            return this.http.get(this.path + "/" + e + "/localVariables", {
              done: t,
            });
          }),
          (s.modifyVariables = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/localVariables", {
              data: e,
              done: t,
            });
          }),
          (s.deleteVariable = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                e.id +
                "/localVariables/" +
                a.escapeUrl(e.varId),
              { done: t }
            );
          }),
          (e.exports = s);
      },
      27033: function (e, t, n) {
        "use strict";
        function i() {}
        var r = n(10123).extend();
        (r.path = "telemetry"),
          (r.get = function (e) {
            return this.http.get(this.path + "/configuration", { done: e });
          }),
          (r.configure = function (e, t) {
            return (
              "boolean" == typeof e && (e = { enableTelemetry: e }),
              this.http.post(this.path + "/configuration", { data: e, done: t })
            );
          }),
          (r.fetchData = function (e, t) {
            return (
              "function" == typeof e && ((t = e), (e = {})),
              (e = e || {}),
              (t = t || i),
              this.http.get(this.path + "/data", { data: e, done: t })
            );
          }),
          (e.exports = r);
      },
      77840: function (e, t, n) {
        "use strict";
        var i = n(10123),
          r = n(37914);
        function a() {}
        var o = i.extend();
        (o.path = "tenant"),
          (o.create = function (e, t) {
            return this.http.post(this.path + "/create", {
              data: e,
              done: t || a,
            });
          }),
          (o.count = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path + "/count", { data: e, done: t || a })
            );
          }),
          (o.get = function (e, t) {
            var n;
            return (
              "string" == typeof e
                ? ((n = e), (e = {}))
                : ((n = e.id), delete e.id),
              this.http.get(this.path + "/" + r.escapeUrl(n), {
                data: e,
                done: t || a,
              })
            );
          }),
          (o.list = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path, { data: e, done: t || a })
            );
          }),
          (o.createUserMember = function (e, t) {
            return this.http.put(
              this.path +
                "/" +
                r.escapeUrl(e.id) +
                "/user-members/" +
                r.escapeUrl(e.userId),
              { data: e, done: t || a }
            );
          }),
          (o.createGroupMember = function (e, t) {
            return this.http.put(
              this.path +
                "/" +
                r.escapeUrl(e.id) +
                "/group-members/" +
                r.escapeUrl(e.groupId),
              { data: e, done: t || a }
            );
          }),
          (o.deleteUserMember = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                r.escapeUrl(e.id) +
                "/user-members/" +
                r.escapeUrl(e.userId),
              { data: e, done: t || a }
            );
          }),
          (o.deleteGroupMember = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                r.escapeUrl(e.id) +
                "/group-members/" +
                r.escapeUrl(e.groupId),
              { data: e, done: t || a }
            );
          }),
          (o.update = function (e, t) {
            return this.http.put(this.path + "/" + r.escapeUrl(e.id), {
              data: e,
              done: t || a,
            });
          }),
          (o.delete = function (e, t) {
            return this.http.del(this.path + "/" + r.escapeUrl(e.id), {
              data: e,
              done: t || a,
            });
          }),
          (o.options = function (e, t) {
            var n;
            return (
              "function" == typeof e
                ? ((t = e), (n = ""))
                : void 0 === (n = "string" == typeof e ? e : e.id) && (n = ""),
              this.http.options(this.path + "/" + r.escapeUrl(n), {
                done: t || a,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (e.exports = o);
      },
      23575: function (e, t, n) {
        "use strict";
        var i = n(60314),
          r = n(10123),
          a = n(37914);
        function o() {}
        var s = r.extend();
        (s.path = "user"),
          (s.options = function (e, t) {
            var n;
            return (
              "function" == typeof e
                ? ((t = e), (n = ""))
                : void 0 === (n = "string" == typeof e ? e : e.id) && (n = ""),
              this.http.options(this.path + "/" + a.escapeUrl(n), {
                done: t || o,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (s.create = function (e, t) {
            (e = e || {}), (t = t || o);
            var n = ["id", "firstName", "lastName", "password"];
            for (var r in n) {
              var a = n[r];
              if (!e[a]) {
                var s = new Error("Missing " + a + " option to create user");
                return t(s), i.reject(s);
              }
            }
            var c = {
              profile: {
                id: e.id,
                firstName: e.firstName,
                lastName: e.lastName,
              },
              credentials: { password: e.password },
            };
            return (
              e.email && (c.profile.email = e.email),
              this.http.post(this.path + "/create", { data: c, done: t })
            );
          }),
          (s.list = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path, { data: e, done: t || o })
            );
          }),
          (s.count = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path + "/count", { data: e, done: t || o })
            );
          }),
          (s.profile = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.get(
              this.path + "/" + a.escapeUrl(n) + "/profile",
              { done: t || o }
            );
          }),
          (s.updateProfile = function (e, t) {
            if (((t = t || o), !(e = e || {}).id)) {
              var n = new Error("Missing id option to update user profile");
              return t(n), i.reject(n);
            }
            return this.http.put(
              this.path + "/" + a.escapeUrl(e.id) + "/profile",
              { data: e, done: t }
            );
          }),
          (s.updateCredentials = function (e, t) {
            var n;
            if (((t = t || o), !(e = e || {}).id))
              return (
                t(
                  (n = new Error(
                    "Missing id option to update user credentials"
                  ))
                ),
                i.reject(n)
              );
            if (!e.password)
              return (
                t(
                  (n = new Error(
                    "Missing password option to update user credentials"
                  ))
                ),
                i.reject(n)
              );
            var r = { password: e.password };
            return (
              e.authenticatedUserPassword &&
                (r.authenticatedUserPassword = e.authenticatedUserPassword),
              this.http.put(
                this.path + "/" + a.escapeUrl(e.id) + "/credentials",
                { data: r, done: t }
              )
            );
          }),
          (s.delete = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.del(this.path + "/" + a.escapeUrl(n), {
              done: t || o,
            });
          }),
          (s.unlock = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.post(
              this.path + "/" + a.escapeUrl(n) + "/unlock",
              { done: t || o }
            );
          }),
          (e.exports = s);
      },
      73420: function (e, t, n) {
        "use strict";
        var i = n(10123).extend();
        (i.path = "variable-instance"),
          (i.instances = function (e, t) {
            var n = {},
              i = {},
              r = ["firstResult", "maxResults", "deserializeValues"];
            for (var a in e) r.indexOf(a) > -1 ? (i[a] = e[a]) : (n[a] = e[a]);
            return this.http.post(this.path, { data: n, query: i, done: t });
          }),
          (i.count = function (e, t) {
            var n = this.path + "/count";
            return this.http.post(n, { data: e, done: t });
          }),
          (e.exports = i);
      },
      99099: function (e, t, n) {
        "use strict";
        var i = n(32278);
        function r() {
          this.initialize();
        }
        (r.extend = function (e, t) {
          (e = e || {}), (t = t || {});
          var n,
            i,
            r,
            a,
            o = this;
          for (r in ((n =
            e && Object.hasOwnProperty.call(o, "constructor")
              ? e.constructor
              : function () {
                  return o.apply(this, arguments);
                }),
          o))
            n[r] = o[r];
          for (r in t) n[r] = t[r];
          for (a in (((i = function () {
            this.constructor = n;
          }).prototype = o.prototype),
          (n.prototype = new i()),
          e))
            n.prototype[a] = e[a];
          return n;
        }),
          (r.prototype.initialize = function () {}),
          i.attach(r),
          (e.exports = r);
      },
      32278: function (e) {
        "use strict";
        var t = {};
        function n(e) {
          var t,
            n = !1;
          return function () {
            return (
              n || ((n = !0), (t = e.apply(this, arguments)), (e = null)), t
            );
          };
        }
        function i(e, t) {
          (e._events = e._events || {}), (e._events[t] = e._events[t] || []);
        }
        (t.attach = function (e) {
          (e.on = this.on),
            (e.once = this.once),
            (e.off = this.off),
            (e.trigger = this.trigger),
            (e._events = {});
        }),
          (t.on = function (e, t) {
            return i(this, e), this._events[e].push(t), this;
          }),
          (t.once = function (e, t) {
            var i = this,
              r = n(function () {
                i.off(e, n), t.apply(this, arguments);
              });
            return (r._callback = t), this.on(e, r);
          }),
          (t.off = function (e, t) {
            if ((i(this, e), !t)) return delete this._events[e], this;
            var n,
              r = [];
            for (n in this._events[e])
              this._events[e][n] !== t && r.push(this._events[e][n]);
            return (this._events[e] = r), this;
          }),
          (t.trigger = function () {
            var e,
              t = (function (e) {
                var t,
                  n = [];
                for (t in e) n.push(e[t]);
                return n;
              })(arguments),
              n = t.shift();
            for (e in (i(this, n), this._events[n]))
              this._events[n][e](this, t);
            return this;
          }),
          (e.exports = t);
      },
      21299: function (module, __unused_webpack_exports, __webpack_require__) {
        "use strict";
        __webpack_require__(67762),
          __webpack_require__(34820),
          __webpack_require__(57507),
          __webpack_require__(36434),
          __webpack_require__(67559),
          __webpack_require__(85541),
          __webpack_require__(84392),
          __webpack_require__(70520),
          __webpack_require__(16007),
          __webpack_require__(14627),
          __webpack_require__(72199),
          __webpack_require__(61340),
          __webpack_require__(3117),
          __webpack_require__(85824),
          __webpack_require__(51073),
          __webpack_require__(15635),
          __webpack_require__(64240),
          __webpack_require__(55204),
          __webpack_require__(62490),
          __webpack_require__(51645),
          __webpack_require__(10770),
          __webpack_require__(74108),
          __webpack_require__(10779),
          __webpack_require__(31046),
          __webpack_require__(1384),
          __webpack_require__(93786),
          __webpack_require__(71482),
          __webpack_require__(93234),
          __webpack_require__(59601),
          __webpack_require__(41218),
          __webpack_require__(66505),
          __webpack_require__(66893);
        var moment = __webpack_require__(98024),
          $ = __webpack_require__(79129),
          VariableManager = __webpack_require__(9669),
          InputFieldHandler = __webpack_require__(47162),
          ChoicesFieldHandler = __webpack_require__(38986),
          FileDownloadHandler = __webpack_require__(42122),
          ErrorButtonHandler = __webpack_require__(81864),
          EscalationButtonHandler = __webpack_require__(22907),
          BaseClass = __webpack_require__(99099),
          constants = __webpack_require__(99842),
          Events = __webpack_require__(32278);
        function extend(e, t) {
          for (var n in t) e[n] = t[n];
          return e;
        }
        function CamundaForm(e) {
          if (!e)
            throw new Error("CamundaForm need to be initialized with options.");
          var t = (e.done =
            e.done ||
            function (e) {
              if (e) throw e;
            });
          return (
            e.client
              ? (this.client = e.client)
              : (this.client = new CamSDK.Client(e.clientConfig || {})),
            e.taskId || e.processDefinitionId || e.processDefinitionKey
              ? ((this.taskId = e.taskId),
                this.taskId &&
                  (this.taskBasePath =
                    this.client.baseUrl + "/task/" + this.taskId),
                (this.processDefinitionId = e.processDefinitionId),
                (this.processDefinitionKey = e.processDefinitionKey),
                (this.formElement = e.formElement),
                (this.containerElement = e.containerElement),
                (this.formUrl = e.formUrl),
                this.formElement || this.containerElement
                  ? this.formElement || this.formUrl
                    ? ((this.variableManager = new VariableManager({
                        client: this.client,
                      })),
                      (this.formFieldHandlers = e.formFieldHandlers || [
                        InputFieldHandler,
                        ChoicesFieldHandler,
                        FileDownloadHandler,
                        ErrorButtonHandler,
                        EscalationButtonHandler,
                      ]),
                      (this.businessKey = null),
                      (this.fields = []),
                      (this.scripts = []),
                      (this.options = e),
                      Events.attach(this),
                      void this.initialize(t))
                    : t(
                        new Error(
                          "Camunda form needs to be intialized with either 'formElement' or 'formUrl'"
                        )
                      )
                  : t(
                      new Error(
                        "CamundaForm needs to be initilized with either 'formElement' or 'containerElement'"
                      )
                    ))
              : t(
                  new Error(
                    "Cannot initialize Taskform: either 'taskId' or 'processDefinitionId' or 'processDefinitionKey' must be provided"
                  )
                )
          );
        }
        (CamundaForm.prototype.initializeHandler = function (e) {
          var t = this,
            n = e.selector;
          $(n, t.formElement).each(function () {
            t.fields.push(new e(this, t.variableManager, t));
          });
        }),
          (CamundaForm.prototype.initialize = function (e) {
            e =
              e ||
              function (e) {
                if (e) throw e;
              };
            var t = this;
            if (this.formUrl)
              this.client.http.load(this.formUrl, {
                accept: "*/*",
                done: function (n, i) {
                  if (n) return e(n);
                  try {
                    t.renderForm(i), t.initializeForm(e);
                  } catch (t) {
                    e(t);
                  }
                },
                data: extend(
                  { noCache: Date.now() },
                  this.options.urlParams || {}
                ),
              });
            else
              try {
                this.initializeForm(e);
              } catch (t) {
                e(t);
              }
          }),
          (CamundaForm.prototype.renderForm = function (e) {
            $(this.containerElement)
              .html("")
              .append('<div class="injected-form-wrapper">' + e + "</div>");
            var t = (this.formElement = $("form", this.containerElement));
            if (1 !== t.length)
              throw new Error(
                "Form must provide exactly one element <form ..>"
              );
            t.attr("name") || t.attr("name", "$$camForm");
          }),
          (CamundaForm.prototype.initializeForm = function (e) {
            var t = this;
            this.initializeFormScripts(),
              this.initializeFieldHandlers(),
              this.executeFormScripts(),
              this.fireEvent("form-loaded"),
              this.fetchVariables(function (n, i) {
                if (n) throw n;
                t.mergeVariables(i),
                  t.storeOriginalValues(i),
                  t.fireEvent("variables-fetched"),
                  t.restore(),
                  t.fireEvent("variables-restored"),
                  t.applyVariables(),
                  t.fireEvent("variables-applied"),
                  e(null, t);
              });
          }),
          (CamundaForm.prototype.initializeFieldHandlers = function () {
            for (var e in this.formFieldHandlers)
              this.initializeHandler(this.formFieldHandlers[e]);
          }),
          (CamundaForm.prototype.initializeFormScripts = function () {
            for (
              var e = $(
                  "script[" + constants.DIRECTIVE_CAM_SCRIPT + "]",
                  this.formElement
                ),
                t = 0;
              t < e.length;
              t++
            )
              this.scripts.push(e[t].text);
          }),
          (CamundaForm.prototype.executeFormScripts = function () {
            for (var e = 0; e < this.scripts.length; e++)
              this.executeFormScript(this.scripts[e]);
          }),
          (CamundaForm.prototype.executeFormScript = function (script) {
            (function (camForm) {
              eval(script);
            })(this);
          }),
          (CamundaForm.prototype.store = function (e) {
            var t =
              this.taskId || this.processDefinitionId || this.caseInstanceId;
            if (!t) {
              if ("function" == typeof e)
                return e(new Error("Cannot determine the storage ID"));
              throw new Error("Cannot determine the storage ID");
            }
            if (
              ((this.storePrevented = !1),
              this.fireEvent("store"),
              !this.storePrevented)
            ) {
              try {
                this.retrieveVariables();
                var n = { date: Date.now(), vars: {} };
                for (var i in this.variableManager.variables)
                  ["Bytes", "File"].includes(
                    this.variableManager.variables[i].type
                  ) || (n.vars[i] = this.variableManager.variables[i].value);
                localStorage.setItem("camForm:" + t, JSON.stringify(n));
              } catch (t) {
                if ("function" == typeof e) return e(t);
                throw t;
              }
              this.fireEvent("variables-stored"), "function" == typeof e && e();
            }
          }),
          (CamundaForm.prototype.isRestorable = function () {
            var e =
              this.taskId || this.processDefinitionId || this.caseInstanceId;
            if (!e) throw new Error("Cannot determine the storage ID");
            if (!localStorage.getItem("camForm:" + e)) return !1;
            var t = localStorage.getItem("camForm:" + e);
            try {
              t = JSON.parse(t);
            } catch (e) {
              return !1;
            }
            return !(!t || !Object.keys(t).length);
          }),
          (CamundaForm.prototype.restore = function (e) {
            var t,
              n = this.variableManager.variables,
              i =
                this.taskId ||
                this.processDefinitionId ||
                this.caseDefinitionId;
            if (!i) {
              if ("function" == typeof e)
                return e(new Error("Cannot determine the storage ID"));
              throw new Error("Cannot determine the storage ID");
            }
            if (!this.isRestorable())
              return "function" == typeof e ? e() : void 0;
            try {
              (t = localStorage.getItem("camForm:" + i)),
                (t = JSON.parse(t).vars);
            } catch (t) {
              if ("function" == typeof e) return e(t);
              throw t;
            }
            for (var r in t)
              n[r] ? (n[r].value = t[r]) : (n[r] = { name: r, value: t[r] });
            "function" == typeof e && e();
          }),
          (CamundaForm.prototype.submit = function (e) {
            var t = this.taskId || this.processDefinitionId;
            if (
              ((this.submitPrevented = !1),
              this.fireEvent("submit"),
              this.submitPrevented)
            ) {
              var n = new Error("camForm submission prevented");
              return this.fireEvent("submit-failed", n), e && e(n);
            }
            try {
              this.retrieveVariables();
            } catch (t) {
              return e && e(t);
            }
            var i = this;
            this.transformFiles(function () {
              i.submitVariables(function (n, r) {
                return n
                  ? (i.fireEvent("submit-failed", n), e && e(n))
                  : (localStorage.removeItem("camForm:" + t),
                    i.fireEvent("submit-success"),
                    e && e(null, r));
              });
            });
          }),
          (CamundaForm.prototype.error = function (e, t, n) {
            var i = this.taskId || this.processDefinitionId;
            if (
              ((this.errorPrevented = !1),
              this.fireEvent("error"),
              this.errorPrevented)
            ) {
              var r = new Error("camForm error prevented");
              return this.fireEvent("error-failed", r), n && n(r);
            }
            try {
              this.retrieveVariables();
            } catch (e) {
              return n && n(e);
            }
            var a = this;
            this.transformFiles(function () {
              var r = {
                variables: a.parseVariables(),
                id: a.taskId,
                errorCode: e,
                errorMessage: t,
              };
              a.client.resource("task").bpmnError(r, function (e, t) {
                return e
                  ? (a.fireEvent("error-failed", e), n && n(e))
                  : (localStorage.removeItem("camForm:" + i),
                    a.fireEvent("error-success"),
                    n && n(null, t));
              });
            });
          }),
          (CamundaForm.prototype.escalate = function (e, t) {
            var n = this.taskId || this.processDefinitionId;
            if (
              ((this.escalationPrevented = !1),
              this.fireEvent("escalation"),
              this.escalationPrevented)
            ) {
              var i = new Error("camForm escalation prevented");
              return this.fireEvent("escalation-failed", i), t && t(i);
            }
            try {
              this.retrieveVariables();
            } catch (e) {
              return t && t(e);
            }
            var r = this;
            this.transformFiles(function () {
              var i = {
                variables: r.parseVariables(),
                id: r.taskId,
                escalationCode: e,
              };
              r.client.resource("task").bpmnEscalation(i, function (e, i) {
                return e
                  ? (r.fireEvent("escalation-failed", e), t && t(e))
                  : (localStorage.removeItem("camForm:" + n),
                    r.fireEvent("escalation-success"),
                    t && t(null, i));
              });
            });
          }),
          (CamundaForm.prototype.transformFiles = function (e) {
            var t = 1,
              n = function () {
                0 == --t && e();
              },
              i = function (e) {
                if (0 === e) return "0 Byte";
                var t = Math.floor(Math.log(e) / Math.log(1e3));
                return (
                  (e / Math.pow(1e3, t)).toPrecision(3) +
                  " " +
                  ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][t]
                );
              };
            for (var r in this.fields) {
              var a = this.fields[r].element[0];
              if ("file" === a.getAttribute("type")) {
                var o =
                  this.variableManager.variables[this.fields[r].variableName];
                if ("function" == typeof FileReader && a.files.length > 0) {
                  if (
                    a.files[0].size >
                    (parseInt(a.getAttribute("cam-max-filesize"), 10) || 5e6)
                  )
                    throw new Error(
                      "Maximum file size of " +
                        i(
                          parseInt(a.getAttribute("cam-max-filesize"), 10) ||
                            5e6
                        ) +
                        " exceeded."
                    );
                  var s = new FileReader();
                  (s.onloadend = (function (e, t, i) {
                    return function (e) {
                      for (
                        var r = "",
                          a = new Uint8Array(e.target.result),
                          o = a.byteLength,
                          s = 0;
                        s < o;
                        s++
                      )
                        r += String.fromCharCode(a[s]);
                      (i.value = btoa(r)),
                        "file" === i.type.toLowerCase() &&
                          (i.valueInfo = {
                            filename: t.files[0].name,
                            mimeType: t.files[0].type,
                          }),
                        n();
                    };
                  })(0, a, o)),
                    s.readAsArrayBuffer(a.files[0]),
                    t++;
                } else (o.value = ""), (o.valueInfo = { filename: "" });
              }
            }
            n();
          }),
          (CamundaForm.prototype.fetchVariables = function (e) {
            e = e || function () {};
            var t = this.variableManager.variableNames();
            if (t.length) {
              var n = { names: t, deserializeValues: !1 };
              this.taskId
                ? ((n.id = this.taskId),
                  this.client.resource("task").formVariables(n, e))
                : ((n.id = this.processDefinitionId),
                  (n.key = this.processDefinitionKey),
                  this.client
                    .resource("process-definition")
                    .formVariables(n, e));
            } else e();
          }),
          (CamundaForm.prototype.parseVariables = function () {
            var e = this.variableManager,
              t = e.variables;
            this.fields.forEach(function (e) {
              t[e.variableName] &&
                ((t[e.variableName].defaultValue = e.originalValue),
                ("" !== e.originalValue && void 0 !== e.originalValue) ||
                  (t[e.variableName].defaultValue = t[e.variableName].value));
            });
            var n = {};
            for (var i in t) {
              var r = t[i].value;
              (e.isDirty(i) || t[i].defaultValue != r) &&
                (e.isJsonVariable(i) && (r = JSON.stringify(r)),
                r &&
                  e.isDateVariable(i) &&
                  (r = moment(r, moment.ISO_8601).format(
                    "YYYY-MM-DDTHH:mm:ss.SSSZZ"
                  )),
                (n[i] = {
                  value: r,
                  type: t[i].type,
                  valueInfo: t[i].valueInfo,
                }));
            }
            return n;
          }),
          (CamundaForm.prototype.submitVariables = function (e) {
            e = e || function () {};
            var t = { variables: this.parseVariables() };
            if (this.taskId)
              (t.id = this.taskId),
                this.client.resource("task").submitForm(t, e);
            else {
              var n =
                this.businessKey ||
                this.formElement
                  .find('input[type="text"][cam-business-key]')
                  .val();
              n && (t.businessKey = n),
                (t.id = this.processDefinitionId),
                (t.key = this.processDefinitionKey),
                this.client.resource("process-definition").submitForm(t, e);
            }
          }),
          (CamundaForm.prototype.storeOriginalValues = function (e) {
            for (var t in e)
              this.variableManager.setOriginalValue(t, e[t].value);
          }),
          (CamundaForm.prototype.mergeVariables = function (e) {
            var t = this.variableManager.variables;
            for (var n in e) {
              if (t[n]) for (var i in e[n]) t[n][i] = t[n][i] || e[n][i];
              else t[n] = e[n];
              this.variableManager.isJsonVariable(n) &&
                (t[n].value = JSON.parse(e[n].value));
              var r = t[n].type;
              !this.taskBasePath ||
                ("Bytes" !== r && "File" !== r) ||
                (t[n].contentUrl =
                  this.taskBasePath + "/variables/" + t[n].name + "/data"),
                (this.variableManager.isVariablesFetched = !0);
            }
          }),
          (CamundaForm.prototype.applyVariables = function () {
            for (var e in this.fields) this.fields[e].applyValue();
          }),
          (CamundaForm.prototype.retrieveVariables = function () {
            for (var e in this.fields) this.fields[e].getValue();
          }),
          (CamundaForm.prototype.fireEvent = function (e, t) {
            this.trigger(e, t);
          }),
          (CamundaForm.$ = $),
          (CamundaForm.VariableManager = VariableManager),
          (CamundaForm.fields = {}),
          (CamundaForm.fields.InputFieldHandler = InputFieldHandler),
          (CamundaForm.fields.ChoicesFieldHandler = ChoicesFieldHandler),
          (CamundaForm.cleanLocalStorage = function (e) {
            for (var t = 0; t < localStorage.length; t++) {
              var n = localStorage.key(t);
              if (0 === n.indexOf("camForm:"))
                JSON.parse(localStorage.getItem(n)).date < e &&
                  (localStorage.removeItem(n), t--);
            }
          }),
          (CamundaForm.extend = BaseClass.extend),
          (module.exports = CamundaForm);
      },
      99842: function (e) {
        "use strict";
        e.exports = {
          DIRECTIVE_CAM_FORM: "cam-form",
          DIRECTIVE_CAM_VARIABLE_NAME: "cam-variable-name",
          DIRECTIVE_CAM_VARIABLE_TYPE: "cam-variable-type",
          DIRECTIVE_CAM_FILE_DOWNLOAD: "cam-file-download",
          DIRECTIVE_CAM_CHOICES: "cam-choices",
          DIRECTIVE_CAM_SCRIPT: "cam-script",
          DIRECTIVE_CAM_ERROR_CODE: "cam-error-code",
          DIRECTIVE_CAM_ERROR_MESSAGE: "cam-error-message",
          DIRECTIVE_CAM_ESCALATION_CODE: "cam-escalation-code",
        };
      },
      32684: function (e, t, n) {
        "use strict";
        var i = n(99099),
          r = n(79129);
        function a() {}
        function o(e, t, n) {
          (this.element = r(e)),
            (this.variableManager = t),
            (this.form = n),
            (this.variableName = null),
            this.initialize();
        }
        (o.selector = null),
          (o.extend = i.extend),
          (o.prototype.initialize = a),
          (o.prototype.applyValue = a),
          (o.prototype.getValue = a),
          (e.exports = o);
      },
      38986: function (e, t, n) {
        "use strict";
        n(67762), n(84392);
        var i = n(99842),
          r = n(32684),
          a = n(79129),
          o = r.extend(
            {
              initialize: function () {
                var e = (this.variableName = this.element.attr(
                    i.DIRECTIVE_CAM_VARIABLE_NAME
                  )),
                  t = (this.variableType = this.element.attr(
                    i.DIRECTIVE_CAM_VARIABLE_TYPE
                  )),
                  n = (this.choicesVariableName = this.element.attr(
                    i.DIRECTIVE_CAM_CHOICES
                  ));
                this.variableManager.createVariable({ name: e, type: t }),
                  n && this.variableManager.fetchVariable(n),
                  (this.previousValue = this.originalValue = ""),
                  (this.variableName = e);
              },
              applyValue: function () {
                var e = this.element[0].selectedIndex;
                if (this.choicesVariableName) {
                  var t = this.variableManager.variableValue(
                    this.choicesVariableName
                  );
                  if (t)
                    if (t instanceof Array)
                      for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        this.element.find('option[text="' + i + '"]').length ||
                          this.element.append(
                            a("<option>", { value: i, text: i })
                          );
                      }
                    else
                      for (var r in t)
                        this.element.find('option[value="' + r + '"]').length ||
                          this.element.append(
                            a("<option>", { value: r, text: t[r] })
                          );
                }
                (this.element[0].selectedIndex = e),
                  (this.previousValue = this.element.val() || "");
                var o = this.variableManager.variableValue(this.variableName);
                if ((o = null === o ? "" : o) !== this.previousValue) {
                  this.element.val(o),
                    this.element.trigger("camFormVariableApplied", o);
                  var s = this;
                  window.setTimeout(function () {
                    s.element.change();
                  }, 0);
                }
                return this;
              },
              getValue: function () {
                var e;
                return (
                  this.element.prop("multiple")
                    ? ((e = []),
                      this.element.find("option:selected").each(function () {
                        e.push(a(this).val());
                      }))
                    : (e = this.element.find("option:selected").attr("value")),
                  this.variableManager.variableValue(this.variableName, e),
                  e
                );
              },
            },
            { selector: "select[" + i.DIRECTIVE_CAM_VARIABLE_NAME + "]" }
          );
        e.exports = o;
      },
      81864: function (e, t, n) {
        "use strict";
        var i = n(99842),
          r = n(32684).extend(
            {
              initialize: function () {
                (this.errorCode = this.element.attr(
                  i.DIRECTIVE_CAM_ERROR_CODE
                )),
                  (this.errorMessage = this.element.attr(
                    i.DIRECTIVE_CAM_ERROR_MESSAGE
                  ));
              },
              applyValue: function () {
                var e = this;
                return (
                  this.element.on("click", function () {
                    e.form.error(e.errorCode, e.errorMessage);
                  }),
                  this
                );
              },
            },
            { selector: "button[" + i.DIRECTIVE_CAM_ERROR_CODE + "]" }
          );
        e.exports = r;
      },
      22907: function (e, t, n) {
        "use strict";
        var i = n(99842),
          r = n(32684).extend(
            {
              initialize: function () {
                this.escalationCode = this.element.attr(
                  i.DIRECTIVE_CAM_ESCALATION_CODE
                );
              },
              applyValue: function () {
                var e = this;
                return (
                  this.element.on("click", function () {
                    e.form.escalate(e.escalationCode);
                  }),
                  this
                );
              },
            },
            { selector: "button[" + i.DIRECTIVE_CAM_ESCALATION_CODE + "]" }
          );
        e.exports = r;
      },
      42122: function (e, t, n) {
        "use strict";
        n(42919);
        var i = n(99842),
          r = n(32684).extend(
            {
              initialize: function () {
                (this.variableName = this.element.attr(
                  i.DIRECTIVE_CAM_FILE_DOWNLOAD
                )),
                  this.variableManager.fetchVariable(this.variableName);
              },
              applyValue: function () {
                var e = this.variableManager.variable(this.variableName);
                return (
                  this.element.attr("href", e.contentUrl),
                  0 === this.element.text().trim().length &&
                    this.element.text(e.valueInfo.filename),
                  this
                );
              },
            },
            { selector: "a[" + i.DIRECTIVE_CAM_FILE_DOWNLOAD + "]" }
          );
        e.exports = r;
      },
      47162: function (e, t, n) {
        "use strict";
        var i = n(99842),
          r = n(32684),
          a = n(59084).convertToType,
          o = function (e) {
            return (
              "checkbox" === e.attr("type") &&
              "Boolean" === e.attr(i.DIRECTIVE_CAM_VARIABLE_TYPE)
            );
          },
          s = r.extend(
            {
              initialize: function () {
                var e = this.element.attr(i.DIRECTIVE_CAM_VARIABLE_NAME),
                  t = this.element.attr(i.DIRECTIVE_CAM_VARIABLE_TYPE);
                this.variableManager.createVariable({ name: e, type: t }),
                  (this.originalValue = o(this.element)
                    ? this.element.checked
                    : this.element.val()),
                  (this.previousValue = this.originalValue),
                  (this.variableName = e),
                  this.getValue();
              },
              applyValue: function () {
                this.previousValue = this.getValueFromHtmlControl() || "";
                var e = this.variableManager.variableValue(this.variableName);
                if (
                  e &&
                  this.variableManager.isDateVariable(this.variableName)
                ) {
                  var t = new Date(e);
                  e = a(t, "Date");
                }
                return (
                  e !== this.previousValue &&
                    (this.applyValueToHtmlControl(e),
                    this.element.trigger("camFormVariableApplied", e)),
                  this
                );
              },
              getValue: function () {
                var e = this.getValueFromHtmlControl();
                return (
                  this.variableManager.variableValue(this.variableName, e), e
                );
              },
              getValueFromHtmlControl: function () {
                return o(this.element)
                  ? this.element.prop("checked")
                  : this.element.val();
              },
              applyValueToHtmlControl: function (e) {
                o(this.element)
                  ? this.element.prop("checked", e)
                  : "file" !== this.element[0].type && this.element.val(e);
              },
            },
            {
              selector:
                "input[" +
                i.DIRECTIVE_CAM_VARIABLE_NAME +
                "],textarea[" +
                i.DIRECTIVE_CAM_VARIABLE_NAME +
                "]",
            }
          );
        e.exports = s;
      },
      79129: function (e, t, n) {
        "use strict";
        var i;
        (i = (i = "undefined" != typeof window ? window : n.g) || {}),
          (e.exports =
            i.jQuery || (!!i.angular && i.angular.element) || i.Zepto);
      },
      59084: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(57507),
          n(84392),
          n(30129),
          n(19824),
          n(85541),
          n(56806),
          n(42919);
        var r = /^-?[\d]+$/,
          a = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/,
          o = /^(true|false)$/,
          s =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/,
          c = n(26219).validate,
          l = function (e, t) {
            switch (t) {
              case "Integer":
              case "Long":
              case "Short":
                return r.test(e);
              case "Float":
              case "Double":
                return a.test(e);
              case "Boolean":
                return o.test(e);
              case "Date":
                return s.test(p(e));
              case "Xml":
                return (function (e) {
                  return !!e && !0 === c(e);
                })(e);
              case "Json":
                return (function (e) {
                  try {
                    return JSON.parse(e), !0;
                  } catch (e) {
                    return !1;
                  }
                })(e);
            }
          },
          u = function (e) {
            return e < 10 ? "0" + e : e;
          },
          p = function (e) {
            return "object" === i(e) && "function" == typeof e.getFullYear
              ? e.getFullYear() +
                  "-" +
                  u(e.getMonth() + 1) +
                  "-" +
                  u(e.getDate()) +
                  "T" +
                  u(e.getHours()) +
                  ":" +
                  u(e.getMinutes()) +
                  ":" +
                  u(e.getSeconds())
              : e;
          };
        e.exports = {
          convertToType: function (e, t) {
            if (
              ("string" == typeof e && (e = e.trim()),
              "String" === t || "Bytes" === t || "File" === t)
            )
              return e;
            if (!l(e, t))
              throw new Error("Value '" + e + "' is not of type " + t);
            switch (t) {
              case "Integer":
              case "Long":
              case "Short":
                return parseInt(e, 10);
              case "Float":
              case "Double":
                return parseFloat(e);
              case "Boolean":
                return "true" === e;
              case "Date":
                return p(e);
            }
          },
          isType: l,
          dateToString: p,
        };
      },
      9669: function (e, t, n) {
        "use strict";
        n(67559), n(85541);
        var i = n(98024),
          r = n(59084).convertToType;
        function a() {
          (this.variables = {}), (this.isVariablesFetched = !1);
        }
        (a.prototype.fetchVariable = function (e) {
          if (this.isVariablesFetched)
            throw new Error(
              "Illegal State: cannot call fetchVariable(), variables already fetched."
            );
          this.createVariable({ name: e });
        }),
          (a.prototype.createVariable = function (e) {
            if (this.variables[e.name])
              throw new Error(
                "Cannot add variable with name " + e.name + ": already exists."
              );
            this.variables[e.name] = e;
          }),
          (a.prototype.destroyVariable = function (e) {
            if (!this.variables[e])
              throw new Error(
                "Cannot remove variable with name " +
                  e +
                  ": variable does not exist."
              );
            delete this.variables[e];
          }),
          (a.prototype.setOriginalValue = function (e, t) {
            if (!this.variables[e])
              throw new Error(
                "Cannot set original value of variable with name " +
                  e +
                  ": variable does not exist."
              );
            this.variables[e].originalValue = t;
          }),
          (a.prototype.variable = function (e) {
            return this.variables[e];
          }),
          (a.prototype.variableValue = function (e, t) {
            var n = this.variable(e);
            return (
              null == t || ("" === t && "String" !== n.type)
                ? (t = null)
                : "string" == typeof t &&
                  "String" !== n.type &&
                  (t = r(t, n.type)),
              2 === arguments.length && (n.value = t),
              n.value
            );
          }),
          (a.prototype.isDirty = function (e) {
            var t = this.variable(e);
            return this.isJsonVariable(e)
              ? t.originalValue !== JSON.stringify(t.value)
              : this.isDateVariable(e) && t.originalValue && t.value
              ? !i(t.originalValue, i.ISO_8601).isSame(t.value)
              : t.originalValue !== t.value || "Object" === t.type;
          }),
          (a.prototype.isJsonVariable = function (e) {
            var t = this.variable(e),
              n = t.type,
              i = ["Object", "json", "Json"].indexOf(n);
            return 0 === i
              ? -1 !==
                  t.valueInfo.serializationDataFormat.indexOf(
                    "application/json"
                  )
              : -1 !== i;
          }),
          (a.prototype.isDateVariable = function (e) {
            return "Date" === this.variable(e).type;
          }),
          (a.prototype.variableNames = function () {
            return Object.keys(this.variables);
          }),
          (e.exports = a);
      },
      37914: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        function r() {
          r = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            a = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            l = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function p(e, t, n) {
            return (
              Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[t]
            );
          }
          try {
            p({}, "");
          } catch (e) {
            p = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function d(e, t, n, i) {
            var r = t && t.prototype instanceof b ? t : b,
              a = Object.create(r.prototype),
              s = new N(i || []);
            return o(a, "_invoke", { value: k(e, n, s) }), a;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = d;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function w() {}
          function _() {}
          var E = {};
          p(E, c, function () {
            return this;
          });
          var x = Object.getPrototypeOf,
            S = x && x(x(D([])));
          S && S !== n && a.call(S, c) && (E = S);
          var I = (_.prototype = b.prototype = Object.create(E));
          function A(e) {
            ["next", "throw", "return"].forEach(function (t) {
              p(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function C(e, t) {
            function n(r, o, s, c) {
              var l = f(e[r], e, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  p = u.value;
                return p && "object" == i(p) && a.call(p, "__await")
                  ? t.resolve(p.__await).then(
                      function (e) {
                        n("next", e, s, c);
                      },
                      function (e) {
                        n("throw", e, s, c);
                      }
                    )
                  : t.resolve(p).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function (e, i) {
                function a() {
                  return new t(function (t, r) {
                    n(e, i, t, r);
                  });
                }
                return (r = r ? r.then(a, a) : a());
              },
            });
          }
          function k(t, n, i) {
            var r = h;
            return function (a, o) {
              if (r === m) throw new Error("Generator is already running");
              if (r === g) {
                if ("throw" === a) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = a, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var c = T(s, i);
                  if (c) {
                    if (c === y) continue;
                    return c;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (r === h) throw ((r = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                r = m;
                var l = f(t, n, i);
                if ("normal" === l.type) {
                  if (((r = i.done ? g : v), l.arg === y)) continue;
                  return { value: l.arg, done: i.done };
                }
                "throw" === l.type &&
                  ((r = g), (i.method = "throw"), (i.arg = l.arg));
              }
            };
          }
          function T(t, n) {
            var i = n.method,
              r = t.iterator[i];
            if (r === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  T(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var a = f(r, t.iterator, n.arg);
            if ("throw" === a.type)
              return (
                (n.method = "throw"), (n.arg = a.arg), (n.delegate = null), y
              );
            var o = a.arg;
            return o
              ? o.done
                ? ((n[t.resultName] = o.value),
                  (n.next = t.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = e)),
                  (n.delegate = null),
                  y)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                y);
          }
          function L(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function O(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function N(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function D(t) {
            if (t || "" === t) {
              var n = t[c];
              if (n) return n.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var r = -1,
                  o = function n() {
                    for (; ++r < t.length; )
                      if (a.call(t, r))
                        return (n.value = t[r]), (n.done = !1), n;
                    return (n.value = e), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(i(t) + " is not iterable");
          }
          return (
            (w.prototype = _),
            o(I, "constructor", { value: _, configurable: !0 }),
            o(_, "constructor", { value: w, configurable: !0 }),
            (w.displayName = p(_, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === w || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, _)
                  : ((e.__proto__ = _), p(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(I)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            A(C.prototype),
            p(C.prototype, l, function () {
              return this;
            }),
            (t.AsyncIterator = C),
            (t.async = function (e, n, i, r, a) {
              void 0 === a && (a = Promise);
              var o = new C(d(e, n, i, r), a);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            A(I),
            p(I, u, "Generator"),
            p(I, c, function () {
              return this;
            }),
            p(I, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (e) {
              var t = Object(e),
                n = [];
              for (var i in t) n.push(i);
              return (
                n.reverse(),
                function e() {
                  for (; n.length; ) {
                    var i = n.pop();
                    if (i in t) return (e.value = i), (e.done = !1), e;
                  }
                  return (e.done = !0), e;
                }
              );
            }),
            (t.values = D),
            (N.prototype = {
              constructor: N,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      a.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = e);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var n = this;
                function i(i, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    r && ((n.method = "next"), (n.arg = e)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var c = a.call(o, "catchLoc"),
                      l = a.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    a.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var r = i;
                    break;
                  }
                }
                r &&
                  ("break" === e || "continue" === e) &&
                  r.tryLoc <= t &&
                  t <= r.finallyLoc &&
                  (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = e),
                  (o.arg = t),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), y)
                    : this.complete(o)
                );
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && t && (this.next = t),
                  y
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.finallyLoc === e)
                    return this.complete(n.completion, n.afterLoc), O(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var r = i.arg;
                      O(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: D(t),
                    resultName: n,
                    nextLoc: i,
                  }),
                  "next" === this.method && (this.arg = e),
                  y
                );
              },
            }),
            t
          );
        }
        function a(e, t, n, i, r, a, o) {
          try {
            var s = e[a](o),
              c = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(c) : Promise.resolve(c).then(i, r);
        }
        n(36180),
          n(51980),
          n(32157),
          n(28186),
          n(77674),
          n(57507),
          n(67559),
          n(27216),
          n(2108),
          n(85174),
          n(17922),
          n(30129),
          n(66893),
          n(19824),
          n(72595),
          n(27473),
          n(85541),
          n(84392),
          n(17003),
          n(56806),
          n(31083);
        var o = (e.exports = { typeUtils: n(59084) });
        (o.solveHALEmbedded = function (e) {
          function t(t) {
            if ("Id" !== t.slice(-2)) return !1;
            var n = t.slice(0, -2),
              i = e._embedded;
            return !(!i[n] || !i[n].length);
          }
          function n(e) {
            var n = Object.keys(e);
            for (var i in n) ("_" !== n[i][0] && t(n[i])) || n.splice(i, 1);
            return n;
          }
          var i = Object.keys(e._embedded || {});
          for (var r in i) {
            var a = i[r];
            for (var o in e._embedded[a]) {
              e._embedded[a][o]._embedded = e._embedded[a][o]._embedded || {};
              var s = n(e._embedded[a][o]);
              for (var c in s) {
                var l = s[c];
                if (e._embedded[a][o][l]) {
                  var u = e._embedded[l.slice(0, -2)];
                  for (var p in u)
                    u[p].id === e._embedded[a][o][l] &&
                      (e._embedded[a][o]._embedded[l.slice(0, -2)] = [u[p]]);
                }
              }
            }
          }
          return e;
        }),
          (o.series = function (e, t) {
            return new Promise(function (n, i) {
              t = t || function () {};
              var r = {};
              !(function (e, t, n) {
                if (((n = n || function () {}), !e.length)) return n();
                var i = 0;
                !(function r() {
                  t(e[i], function (t) {
                    t
                      ? (n(t), (n = function () {}))
                      : (i += 1) >= e.length
                      ? n()
                      : r();
                  });
                })();
              })(
                Object.keys(e),
                function (t, n) {
                  e[t](function (e) {
                    var i = Array.prototype.slice.call(arguments, 1);
                    i.length <= 1 && (i = i[0]), (r[t] = i), n(e);
                  });
                },
                function (e) {
                  e ? i(e) : n(r), t(e, r);
                }
              );
            });
          }),
          (o.escapeUrl = function (e) {
            return encodeURIComponent(e)
              .replace(/\//g, "%2F")
              .replace(/%2F/g, "%252F")
              .replace(/\*/g, "%2A")
              .replace(/%5C/g, "%255C");
          }),
          (o.debouncePromiseFactory = function () {
            var e = null;
            return (function () {
              var t,
                n =
                  ((t = r().mark(function t(n) {
                    var i;
                    return r().wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (e = n), (t.next = 3), n;
                          case 3:
                            if (((i = t.sent), e !== n)) {
                              t.next = 8;
                              break;
                            }
                            return t.abrupt("return", i);
                          case 8:
                            return (t.next = 10), new Promise(function () {});
                          case 10:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })),
                  function () {
                    var e = this,
                      n = arguments;
                    return new Promise(function (i, r) {
                      var o = t.apply(e, n);
                      function s(e) {
                        a(o, i, r, s, c, "next", e);
                      }
                      function c(e) {
                        a(o, i, r, s, c, "throw", e);
                      }
                      s(void 0);
                    });
                  });
              return function (e) {
                return n.apply(this, arguments);
              };
            })();
          });
      },
      1792: function (e, t, n) {
        "use strict";
        e.exports = n(30336);
      },
      92620: function (e, t, n) {
        "use strict";
        e.exports = n(98024);
      },
      61663: function (e) {
        "use strict";
        e.exports = [
          "$animate",
          "$rootScope",
          function (e, t) {
            return {
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              restrict: "A",
              compile: function (n, i, r) {
                return function (n, i) {
                  var a, o;
                  function s(t) {
                    a && (e.leave(a), (a = void 0)),
                      o && (o.$destroy(), (o = void 0)),
                      t &&
                        ((o = n.$new()),
                        r(o, function (t) {
                          (a = t), e.enter(t, i.parent(), i);
                        }));
                  }
                  n.$on("authentication.changed", function (e, t) {
                    s(t);
                  }),
                    s(t.authentication);
                };
              },
            };
          },
        ];
      },
      9886: function (e) {
        "use strict";
        e.exports = [
          "$animate",
          "$rootScope",
          function (e, t) {
            return {
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              restrict: "A",
              compile: function (n, i, r) {
                return function (n, i) {
                  var a, o;
                  function s(t) {
                    a && (e.leave(a), (a = void 0)),
                      o && (o.$destroy(), (o = void 0)),
                      t &&
                        ((o = n.$new()),
                        r(o, function (t) {
                          (a = t), e.enter(t, i.parent(), i);
                        }));
                  }
                  n.$on("authentication.changed", function (e, t) {
                    s(!t);
                  }),
                    s(!t.authentication);
                };
              },
            };
          },
        ];
      },
      72599: function (e, t, n) {
        "use strict";
        n(67559), n(56806), n(31083);
        var i = n(1792);
        n(91660), n(18551), n(61893);
        var r = n(90517),
          a = n(85358),
          o = n(61663),
          s = n(9886),
          c = n(36628),
          l = i.module("cam.commons.auth", [
            i.module("ngRoute").name,
            r.name,
            "pascalprecht.translate",
            "webapps.plugin",
            "camunda.common.services",
          ]);
        l
          .config([
            "ViewsProvider",
            "canonicalAppNameProvider",
            function (e, t) {
              var i = t.$get;
              e.registerDefaultView("".concat(i(), ".login"), {
                id: "default-login-form",
                controller: n(41601),
                template: n(83263),
                priority: 0,
              });
            },
          ])
          .config(a)
          .run([
            "$rootScope",
            "$location",
            function (e, t) {
              var n;
              e.$on("authentication.login.required", function (i) {
                e.$evalAsync(function () {
                  var e = t.url();
                  "/login" === e ||
                    i.defaultPrevented ||
                    ((n = e), t.url("/login"));
                });
              }),
                e.$on("authentication.login.success", function (i) {
                  e.$evalAsync(function () {
                    i.defaultPrevented ||
                      (t.url(n || "/").replace(), (n = null));
                  });
                });
            },
          ])
          .run([
            "$cacheFactory",
            "$rootScope",
            "$location",
            "$timeout",
            "Notifications",
            "$translate",
            function (e, t, n, i, r, a) {
              t.$on("authentication.logout.success", function (o) {
                t.$evalAsync(function () {
                  o.defaultPrevented ||
                    (e.get("$http").removeAll(), n.url("/login"));
                }),
                  i(function () {
                    r.addMessage({
                      status: a.instant("AUTH_LOGOUT_SUCCESSFUL"),
                      message: a.instant("AUTH_LOGOUT_THANKS", {
                        dayContext: a.instant(
                          (function () {
                            var e = new Date();
                            if (e.getDay() >= 5)
                              return "AUTH_DAY_CONTEXT_WEEKEND";
                            var t = e.getHours();
                            switch (!0) {
                              case t >= 4 && t < 7:
                                return "AUTH_DAY_CONTEXT_MORNING";
                              case t >= 7 && t < 12:
                                return "AUTH_DAY_CONTEXT_DAY";
                              case t >= 12 && t < 17:
                                return "AUTH_DAY_CONTEXT_AFTERNOON";
                              case t >= 17 && t < 22:
                                return "AUTH_DAY_CONTEXT_EVENING";
                              case t >= 22 || t < 4:
                                return "AUTH_DAY_CONTEXT_NIGHT";
                            }
                            return "AUTH_DAY_CONTEXT_DAY";
                          })()
                        ),
                      }),
                      exclusive: !0,
                    });
                  });
              });
            },
          ])
          .run([
            "$rootScope",
            "Notifications",
            "$translate",
            "shouldDisplayAuthenticationError",
            function (e, t, n, i) {
              e.$on("authentication.login.required", function () {
                i() &&
                  t.addError({
                    status: n.instant("AUTH_FAILED_TO_DISPLAY_RESOURCE"),
                    message: n.instant("AUTH_AUTHENTICATION_FAILED"),
                    http: !0,
                    exclusive: ["http"],
                  });
              });
            },
          ])
          .run(["AuthenticationService", function () {}])
          .directive("camIfLoggedIn", o)
          .directive("camIfLoggedOut", s)
          .service("AuthenticationService", c),
          (e.exports = l);
      },
      41601: function (e, t, n) {
        "use strict";
        n(84392), n(66893);
        var i = n(25447);
        e.exports = [
          "$scope",
          "AuthenticationService",
          "Notifications",
          "$translate",
          "Views",
          "canonicalAppName",
          function (e, t, n, r, a, o) {
            e.status = "INIT";
            var s = i('form[name="signinForm"] [autofocus]')[0];
            s && s.focus();
            var c = a.getProviders({ component: "".concat(o, ".login.data") });
            e.login = function () {
              e.status = "LOADING";
              var i = t.login(e.username, e.password);
              return (
                c.forEach(function (t) {
                  t.result && t.result(i, e);
                }),
                i
                  .then(function () {
                    (e.status = "DONE"),
                      n.clearAll(),
                      e.$root.$broadcast("first-visit-info-box-dismissed");
                  })
                  .catch(function (t) {
                    (e.status = "ERROR"),
                      delete e.username,
                      delete e.password,
                      n.addError({
                        status: r.instant("PAGE_LOGIN_FAILED"),
                        message:
                          (t.data && t.data.message) ||
                          r.instant("PAGE_LOGIN_ERROR_MSG"),
                        scope: e,
                        exclusive: !0,
                      });
                  })
              );
            };
          },
        ];
      },
      85358: function (e, t, n) {
        "use strict";
        var i = n(15222),
          r = n(24820),
          a = [
            "$scope",
            "$rootScope",
            "Notifications",
            "$location",
            "$translate",
            "widgetLocalConf",
            "$sce",
            "configuration",
            "$http",
            "Views",
            "canonicalAppName",
            function (e, t, n, i, a, o, s, c, l, u, p) {
              if (
                ((e.logo = s.trustAsHtml(r)),
                (e.status = "INIT"),
                (e.appName = c.getAppName()),
                (e.loginPlugins = u.getProviders({
                  component: "".concat(p, ".login"),
                })),
                t.authentication)
              )
                return i.path("/");
              (t.showBreadcrumbs = !1),
                (e.showFirstLogin = !1),
                !c.getDisableWelcomeMessage() &&
                  o.get("firstVisit", !0) &&
                  l({ method: "GET", url: "/camunda-welcome" })
                    .then(function (t) {
                      if (200 === t.status) {
                        o.set("firstVisit", !0), (e.showFirstLogin = !0);
                        var n = e.$on(
                          "first-visit-info-box-dismissed",
                          e.dismissInfoBox
                        );
                        e.$on("$destroy", function () {
                          n();
                        });
                      } else e.dismissInfoBox();
                    })
                    .catch(e.dismissInfoBox),
                a("FIRST_LOGIN_INFO").then(function (t) {
                  e.FirstLoginMessage = s.trustAsHtml(t);
                }),
                (e.dismissInfoBox = function () {
                  (e.showFirstLogin = !1), o.set("firstVisit", !1);
                });
            },
          ];
        e.exports = [
          "$routeProvider",
          function (e) {
            e.when("/login", { template: i, controller: a });
          },
        ];
      },
      36628: function (e, t, n) {
        "use strict";
        n(1792);
        var i = n(25447),
          r = n(8986);
        e.exports = [
          "$rootScope",
          "$q",
          "$http",
          "Uri",
          "$route",
          function (e, t, n, a, o) {
            function s(t, n, i) {
              e.$broadcast(t, n, i);
            }
            function c(e) {
              if (200 !== e.status) return t.reject(e);
              var n = e.data;
              return new r({
                name: n.userId,
                authorizedApps: n.authorizedApps,
              });
            }
            function l(t) {
              (e.authentication = t), s("authentication.changed", t);
            }
            var u;
            (this.updateAuthentication = l),
              (this.login = function (e, r) {
                var o = i.param({ username: e, password: r });
                return n
                  .get(a.appUri("engine://engine/"))
                  .then(function () {
                    return n({
                      method: "POST",
                      url: a.appUri("admin://auth/user/:engine/login/:appName"),
                      data: o,
                      headers: {
                        "Content-Type":
                          "application/x-www-form-urlencoded;charset=UTF-8",
                      },
                    });
                  })
                  .then(c)
                  .then(
                    function (e) {
                      return (
                        n.get(a.appUri("engine://engine/")).then(function () {
                          l(e), s("authentication.login.success", e);
                        }),
                        e
                      );
                    },
                    function (e) {
                      return s("authentication.login.failure", e), t.reject(e);
                    }
                  );
              }),
              (this.logout = function (e) {
                return n
                  .post(
                    a.appUri(
                      "admin://auth/user/" + (e || ":engine") + "/logout"
                    )
                  )
                  .then(
                    function (e) {
                      l(null), s("authentication.logout.success", e);
                    },
                    function (e) {
                      return s("authentication.logout.failure", e), t.reject(e);
                    }
                  );
              }),
              e.$on("authentication.changed", function (e, n) {
                (u = t[n ? "when" : "reject"](n)), n || o.reload();
              }),
              (this.getAuthentication = function () {
                return (
                  u ||
                    (u = e.authentication
                      ? t.when(e.authentication)
                      : n
                          .get(a.appUri("admin://auth/user/:engine"))
                          .then(c)
                          .then(function (e) {
                            return l(e), e;
                          })),
                  u
                );
              }),
              e.$on("$routeChangeStart", function (e, n) {
                n.authentication &&
                  (n.resolve || (n.resolve = {}),
                  n.resolve.authentication ||
                    (n.resolve.authentication = [
                      "AuthenticationService",
                      function (e) {
                        return e.getAuthentication().catch(function (e) {
                          return "optional" === n.authentication
                            ? null
                            : (s("authentication.login.required", n),
                              t.reject(e));
                        });
                      },
                    ]));
              });
          },
        ];
      },
      8986: function (e, t, n) {
        "use strict";
        var i = n(1792);
        function r(e) {
          i.extend(this, e);
        }
        (r.prototype.canAccess = function (e) {
          return this.authorizedApps && -1 !== this.authorizedApps.indexOf(e);
        }),
          (e.exports = r);
      },
      60589: function (e, t, n) {
        "use strict";
        function i(e, t) {
          var n = Math.ceil(e / t),
            i = "" + n;
          return (
            (n = (parseInt(i[0], 10) + 1) * Math.pow(10, i.length - 1)) * t
          );
        }
        function r() {}
        function a(e) {
          return Math.log(e) / Math.log(10);
        }
        function o(e) {
          (this.moment = e.moment),
            (this.abbreviateNumber = e.abbreviateNumber),
            this.resize(e.width, e.height, e.disableSelection),
            (this.lineColors = e.lineColors),
            (this.rulersColor = e.rulersColor || "#666"),
            (this.selectingColor = e.selectingColor || "rgba(0,0,64,0.1)"),
            (this.unselectedColor = e.unselectedColor || "rgba(0,0,0,0.1)"),
            (this.handleColorHover = e.handleColorHover || "#999"),
            (this.handleColor = e.handleColor || "#aaa"),
            (this.fontSize = e.fontSize || 12),
            (this.fontFamily = e.fontFamily || "Arial"),
            (this.lineWidth = e.lineWidth || 1),
            (this.isLogScale = e.isLogScale || !1),
            (this.valueLabelsCount = e.valueLabelsCount || 8),
            (this.timespan = e.timespan || "day"),
            (this.interval = e.interval || 900),
            (this.handleWidth = e.handleWidth || 4),
            (this.timestampFormat = e.timestampFormat || "YYYY-MM-DDTHH:mm:ss"),
            (this.timeLabelFormats = e.timeLabelFormats || {
              day: "HH:mm",
              week: "dd DD",
              month: "DD MMM",
            }),
            (this.tickSize = e.tickSize || 10),
            (this.textPadding = e.textPadding || 3),
            (this.onselection = e.onselection || r);
        }
        n(79880), n(84735), n(85541), n(84392), n(66893), (e.exports = o);
        var s = o.prototype;
        (s._mouseIsDown = !1),
          (s._selectedIn = null),
          (s._selectedOut = null),
          (s._eventHandlers = {}),
          (s._eventHandlers.mouseout = function (e) {
            this.drawMouseHint().drawSelection(e);
          }),
          (s._eventHandlers.mousemove = function (e) {
            var t = this.cursorPosition(e);
            (this._hoveredSelectionHandle = this.hoveredSelectionHandle(e)),
              (this.canvas.style.cursor = this._hoveredSelectionHandle
                ? "ew-resize"
                : "default"),
              "in" === this._grabbedSelectionHandle
                ? (this._selectedIn = t.left)
                : "out" === this._grabbedSelectionHandle &&
                  (this._selectedOut = t.left),
              this.drawMouseHint(t.left, t.top).drawSelection(e);
          }),
          (s._eventHandlers.mousedown = function (e) {
            var t = this.cursorPosition(e),
              n = this.verticalScaleX(),
              i = this.innerW();
            (this._hoveredSelectionHandle = this.hoveredSelectionHandle(e)),
              (this.canvas.style.cursor = this._hoveredSelectionHandle
                ? "ew-resize"
                : "default"),
              this._hoveredSelectionHandle
                ? (this._grabbedSelectionHandle = this._hoveredSelectionHandle)
                : (this._mouseIsDown ||
                    ((this._selectedIn = Math.min(Math.max(t.left, n), n + i)),
                    (this._selectedOut = null)),
                  (this._mouseIsDown = !0)),
              this.drawMouseHint(t.left, t.top).drawSelection(e);
          }),
          (s._eventHandlers.mouseup = function (e) {
            var t = this.cursorPosition(e),
              n = this.verticalScaleX(),
              i = this.innerW();
            this._grabbedSelectionHandle && (this._grabbedSelectionHandle = !1),
              this._mouseIsDown &&
                (this._selectedOut = Math.max(Math.min(t.left, n + i), n)),
              (this._mouseIsDown = !1),
              Math.abs(this._selectedIn - this._selectedOut) <= 1 &&
                ((this._selectedIn = this._selectedOut = null),
                this.onselection({
                  start: null,
                  end: null,
                  in: null,
                  out: null,
                })),
              this.drawMouseHint(t.left, t.top).drawSelection(e),
              this._selectedIn &&
                this._selectedOut &&
                this.onselection({
                  start: this.momentAtX(this._selectedIn),
                  end: this.momentAtX(this._selectedOut),
                  in: this._selectedIn,
                  out: this._selectedOut,
                });
          }),
          (s._eventHandlers.wheel = function (e) {
            if (this._selectedIn && this._selectedOut) {
              e.preventDefault();
              var t = this.cursorPosition(e);
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              var n = Math.max(
                Math.round(Math.abs(this._selectedOut - this._selectedIn) / 10),
                1
              );
              e.deltaY > 0
                ? ((this._selectedIn += n), (this._selectedOut -= n))
                : ((this._selectedIn -= n), (this._selectedOut += n)),
                this.drawMouseHint(t.left, t.top).drawSelection(e),
                this.onselection({
                  start: this.momentAtX(this._selectedIn),
                  end: this.momentAtX(this._selectedOut),
                  in: this._selectedIn,
                  out: this._selectedOut,
                });
            }
          }),
          (s.cursorPosition = function (e) {
            var t = this.canvas.getBoundingClientRect();
            return { left: e.clientX - t.left, top: e.clientY - t.top };
          }),
          (s.bindEvents = function () {
            return (
              Object.keys(s._eventHandlers).forEach(function (e) {
                this.canvas.addEventListener(
                  e,
                  s._eventHandlers[e].bind(this),
                  !1
                );
              }, this),
              this
            );
          }),
          (s.unbindEvents = function () {
            return (
              Object.keys(s._eventHandlers).forEach(function (e) {
                this.canvas.removeEventListener(
                  e,
                  s._eventHandlers[e].bind(this),
                  !1
                );
              }, this),
              this
            );
          }),
          (s._clearCache = function () {
            (this._verticalLabels = null),
              (this._verticalScaleX = null),
              (this._horizontalScaleY = null),
              (this._innerW = null),
              (this._innerH = null),
              (this._selectedIn = null),
              (this._selectedOut = null);
          }),
          (s.resize = function (e, t, n) {
            return (
              this._clearCache(),
              this.canvas ||
                ((this.canvas = document.createElement("canvas")),
                (this.offCanvas = document.createElement("canvas")),
                !n && this.bindEvents()),
              (this.canvas.width = this.offCanvas.width = e),
              (this.canvas.height = this.offCanvas.height = t),
              (this.ctx = this.canvas.getContext("2d")),
              (this.offCtx = this.offCanvas.getContext("2d")),
              (this._selectedIn = null),
              (this._selectedOut = null),
              "function" == typeof this.onselection &&
                this.onselection({
                  start: null,
                  end: null,
                  in: null,
                  out: null,
                }),
              this
            );
          }),
          (s.max = function (e) {
            var t = 0;
            return arguments.length
              ? ((this.data[e] || []).forEach(function (e) {
                  t = Math.max(e.value, t);
                }, this),
                t)
              : ((this.data || []).forEach(function (e, n) {
                  t = Math.max(t, this.max(n));
                }, this),
                t);
          }),
          (s.min = function (e) {
            var t = this.max();
            return arguments.length
              ? ((t = this.max(e)),
                (this.data[e] || []).forEach(function (e) {
                  t = Math.min(e.value, t);
                }, this),
                t)
              : ((this.data || []).forEach(function (e, n) {
                  t = Math.min(t, this.min(n));
                }, this),
                t);
          }),
          (s.momentAtX = function (e) {
            var t = this.moment,
              n = this.labelFrom,
              i = (this.labelTo - n) / this.innerW();
            return t(
              new Date(i * (e - this.verticalScaleX()) + this.labelFrom),
              t.ISO_8601
            );
          }),
          (s.valueAtY = function (e) {
            return e;
          }),
          (s.setData = function (e, t, n) {
            this._clearCache();
            var r = this.moment,
              a = this.abbreviateNumber;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
              this.offCtx.clearRect(
                0,
                0,
                this.offCanvas.width,
                this.offCanvas.height
              ),
              t && (this.timespan = t),
              n && (this.interval = n);
            var o = [[{ value: 0, timestamp: r().format(this.dateformat) }]];
            (e && e.length && e[0]) || (e = o), (this.data = e);
            var s,
              c = this.timespan,
              l = this.timestampFormat,
              u = i(this.max(), this.valueLabelsCount),
              p = this.timeLabelFormats;
            this.isLogScale && (this.valueLabelsCount = this.maxLog() + 1),
              (this.valueLabels = []);
            for (var d = this.valueLabelsCount; d >= 0; d--)
              (s = this.isLogScale
                ? d && Math.pow(10, d - 1)
                : a((d * u) / this.valueLabelsCount) || 0),
                this.valueLabels.push(s);
            if (
              ((this.timeLabels = []),
              e.length && e[0] && e[0].length && e[0][0].timestamp)
            ) {
              var f = r(),
                h = (this.labelTo = f.clone());
              "day" === c
                ? h.startOf("hour").add(1, "hour")
                : "week" === c
                ? h.startOf("day").add(1, "day")
                : "month" === c && h.startOf("week").add(1, "week");
              var v,
                m,
                g = (this.labelFrom = h.clone().subtract(1, c)),
                y = 1;
              "day" === c
                ? ((v = 12), (m = "hour"), (y = 2))
                : "week" === c
                ? ((v = 7), (m = "day"))
                : "month" === c && ((v = 4), (m = "week"));
              for (var b = 0; b <= v; b++)
                this.timeLabels.push(
                  g
                    .clone()
                    .add(b * y, m)
                    .format(p[c])
                );
            }
            return (
              (this.data = e.map(function (e) {
                (e && e.length) || (e = [{ value: 0 }]),
                  1 === e.length && (e = [e[0], e[0]]);
                var t = r(e[e.length - 1].timestamp, l),
                  n = t - undefined;
                return e.map(function (e) {
                  var i = r(e.timestamp, l);
                  return (e.positionPercent = (t - i) / n), e;
                });
              })),
              this.draw()
            );
          }),
          (s._verticalLabels = null),
          (s.verticalLabels = function () {
            if (this._verticalLabels) return this._verticalLabels;
            var e = this.ctx,
              t = this.timeLabels,
              n = this.textPadding,
              i = 0,
              r = this.innerW();
            return (
              t.forEach(function (t) {
                i += e.measureText(t).width + 2 * n;
              }),
              (this._verticalLabels = i > r),
              this._verticalLabels
            );
          }),
          (s._innerW = null),
          (s.innerW = function () {
            if (this._innerW) return this._innerW;
            var e = this.lineWidth,
              t = Math.max(2 * e, 10),
              n = this.ctx,
              i = n.canvas.width,
              r = 0,
              a = this.textPadding;
            return (
              this.timeLabels.forEach(function (e) {
                r = Math.max(r, n.measureText(e).width + 2 * a);
              }),
              (this._innerW = i - (t + this.verticalScaleX())),
              this.verticalLabels() || (this._innerW -= r / 2),
              this._innerW
            );
          }),
          (s._innerH = null),
          (s.innerH = function () {
            if (this._innerH) return this._innerH;
            var e = this.lineWidth,
              t = Math.max(2 * e, 10),
              n = this.ctx.canvas.height;
            return (
              (this._innerH = n - (t + this.horizontalScaleY())), this._innerH
            );
          }),
          (s._verticalScaleX = null),
          (s.verticalScaleX = function () {
            if (this._verticalScaleX) return this._verticalScaleX;
            var e = 0,
              t = this.ctx,
              n = this.valueLabels,
              i = this.textPadding,
              r = this.tickSize;
            return (
              n.forEach(function (n) {
                e = Math.max(e, t.measureText(n || "0").width + 4 * i + r);
              }),
              (e = Math.round(Math.max(e, r + i)) + 0.5),
              (this._verticalScaleX = e),
              e
            );
          }),
          (s._horizontalScaleY = null),
          (s.horizontalScaleY = function () {
            if (this._horizontalScaleY) return this._horizontalScaleY;
            var e = this.ctx,
              t = this.timeLabels,
              n = this.fontSize,
              i = this.tickSize,
              r = this.textPadding,
              a = this.verticalLabels(),
              o = 0;
            return (
              a
                ? (t.forEach(function (t) {
                    o = Math.max(o, e.measureText(t).width + 4 * r + i);
                  }),
                  (o = Math.round(Math.max(o, i + r))))
                : (o = n + 2 * r + i),
              (this._horizontalScaleY = o),
              o
            );
          }),
          (s.drawMouseHint = function (e, t) {
            var n = this.ctx,
              i = this.innerW(),
              r = n.canvas.height,
              a = n.canvas.width,
              o = Math.max(2 * this.lineWidth, 10),
              s = this.verticalScaleX(),
              c = this.horizontalScaleY(),
              l = this.tickSize;
            if (
              ((n.strokeStyle = this.rulersColor),
              (n.fillStyle = this.rulersColor),
              (n.lineWidth = 1),
              (n.lineCap = "round"),
              (n.lineJoin = "round"),
              (n.font = this.fontSize + "px " + this.fontFamily),
              n.clearRect(0, 0, a, r),
              n.drawImage(this.offCanvas, 0, 0, a, r, 0, 0, a, r),
              e && e > s && e <= s + i)
            ) {
              var u = this.momentAtX(e).format(this.timestampFormat),
                p = n.measureText(u).width + 2 * o,
                d = e + p > a - o ? a - (o + p) : e,
                f = t > o ? t : o;
              n.fillText(u, d, f),
                n.beginPath(),
                n.moveTo(e + 0.5, r - (c + l)),
                n.lineTo(e + 0.5, r - c),
                n.stroke(),
                n.closePath();
            }
            return this;
          }),
          (s.drawSelection = function (e) {
            var t = this.ctx,
              n = this.innerH(),
              i = this.innerW(),
              r = this.verticalScaleX(),
              a = Math.max(2 * this.lineWidth, 10),
              o = this.cursorPosition(e),
              s = this.handleWidth,
              c = this.selectingColor,
              l = this.unselectedColor,
              u = t.fillStyle;
            if (this._mouseIsDown)
              return (
                (t.fillStyle = c),
                this._selectedIn < o.left
                  ? t.fillRect(
                      this._selectedIn,
                      a,
                      Math.min(
                        o.left - this._selectedIn,
                        r + i - this._selectedIn
                      ),
                      n
                    )
                  : t.fillRect(
                      Math.max(o.left, r),
                      a,
                      Math.min(this._selectedIn - o.left, i),
                      n
                    ),
                (t.fillStyle = u),
                this
              );
            if (this._selectedIn && this._selectedOut) {
              var p = t.lineWidth,
                d = t.strokeStyle;
              if (
                (this._selectedIn < r && (this._selectedIn = r),
                this._selectedOut > r + i && (this._selectedOut = r + i),
                (t.fillStyle = l),
                this._selectedOut && this._selectedIn > this._selectedOut)
              ) {
                var f = this._selectedOut;
                (this._selectedOut = this._selectedIn), (this._selectedIn = f);
              }
              t.fillRect(r, a, this._selectedIn - r, n),
                t.fillRect(this._selectedOut, a, i + r - this._selectedOut, n),
                t.beginPath(),
                t.moveTo(this._selectedIn + 0.5, n + a),
                t.lineTo(this._selectedIn + 0.5, a + 0.5),
                t.lineTo(this._selectedOut + 0.5, a + 0.5),
                t.lineTo(this._selectedOut + 0.5, n + a),
                t.stroke(),
                (t.lineWidth = s + 2),
                (t.strokeStyle = this.rulersColor),
                t.beginPath(),
                t.moveTo(this._selectedIn, a + 10),
                t.lineTo(this._selectedIn, 80),
                t.stroke(),
                t.closePath(),
                (t.lineWidth = s),
                (t.strokeStyle =
                  "in" === this._hoveredSelectionHandle
                    ? this.handleColorHover
                    : this.handleColor),
                t.beginPath(),
                t.moveTo(this._selectedIn, a + 10),
                t.lineTo(this._selectedIn, 80),
                t.stroke(),
                (t.lineWidth = s + 2),
                (t.strokeStyle = "#333"),
                t.beginPath(),
                t.moveTo(this._selectedOut, a + 10),
                t.lineTo(this._selectedOut, 80),
                t.stroke(),
                t.closePath(),
                (t.lineWidth = s),
                (t.strokeStyle =
                  "out" === this._hoveredSelectionHandle
                    ? this.handleColorHover
                    : this.handleColor),
                t.beginPath(),
                t.moveTo(this._selectedOut, a + 10),
                t.lineTo(this._selectedOut, 80),
                t.stroke(),
                (t.lineWidth = p),
                (t.fillStyle = u),
                (t.strokeStyle = d);
            }
            return this;
          }),
          (s.hoveredSelectionHandle = function (e) {
            if (!this._selectedIn || !this._selectedOut) return !1;
            var t = this.cursorPosition(e),
              n = this.ctx,
              i = Math.max(2 * this.lineWidth, 10),
              r = !1,
              a = this.handleWidth + 4,
              o = n.lineWidth,
              s = n.strokeStyle;
            return (
              (n.lineWidth = 1),
              (n.strokeStyle = "rgba(0,0,0,0)"),
              n.beginPath(),
              n.rect(this._selectedIn - a / 2, i + 10, a, 80),
              n.stroke(),
              n.closePath(),
              n.isPointInPath(t.left, t.top) && (r = "in"),
              n.beginPath(),
              n.rect(this._selectedOut - a / 2, i + 10, a, 80),
              n.stroke(),
              n.closePath(),
              n.isPointInPath(t.left, t.top) && (r = "out"),
              (n.lineWidth = o),
              (n.strokeStyle = s),
              r
            );
          }),
          (s.maxLog = function () {
            var e = this.max() || 1;
            return Math.ceil(a(e));
          }),
          (s.drawRulers = function () {
            var e,
              t,
              n,
              i,
              r,
              o = this.offCtx,
              s = this.lineWidth,
              c = Math.max(2 * s, 10),
              l = this.abbreviateNumber,
              u = this.timeLabels,
              p = this.valueLabels,
              d = o.canvas.height,
              f = this.textPadding,
              h = this.tickSize,
              v = this.verticalScaleX(),
              m = this.horizontalScaleY(),
              g = this.innerW(),
              y = this.innerH(),
              b = this.verticalLabels();
            (o.strokeStyle = this.rulersColor),
              (o.fillStyle = this.rulersColor),
              (o.lineWidth = 1),
              (o.lineCap = "round"),
              (o.lineJoin = "round"),
              (o.font = this.fontSize + "px " + this.fontFamily);
            var w = d - m + 0.5;
            for (
              o.beginPath(),
                o.moveTo(v - h, w),
                o.lineTo(v + g, w),
                o.stroke(),
                o.beginPath(),
                o.moveTo(v, c),
                o.lineTo(v, w + h),
                o.stroke(),
                b
                  ? ((o.textAlign = "right"), (o.textBaseline = "middle"))
                  : ((o.textAlign = "center"), (o.textBaseline = "top")),
                u.forEach(function (e, t) {
                  var n = v + t * (g / (u.length - 1));
                  o.beginPath(),
                    o.moveTo(n, w),
                    o.lineTo(n, w + h),
                    o.stroke(),
                    b
                      ? (o.save(),
                        o.translate(n, d - (m - (h + f))),
                        o.rotate(-Math.PI / 2),
                        o.fillText(u[t], 0, 0),
                        o.restore())
                      : o.fillText(u[t], n, d - (m - (h + f)));
                }),
                e = y / (p.length - 1),
                i = this.maxLog(),
                o.textAlign = "right",
                o.textBaseline = "middle",
                t = 0;
              t < p.length;
              t++
            )
              (n = p[t]),
                (r = this.isLogScale
                  ? y - (n && (y / (i + 1)) * (a(n) + 1)) + c
                  : Math.round(c + e * t) - 0.5),
                o.fillText(l(n) || 0, v - (h + f), r),
                t < p.length - 1 &&
                  (o.beginPath(),
                  o.moveTo(v - h, r),
                  o.lineTo(v, r),
                  o.stroke());
            return this;
          }),
          (s.draw = function () {
            var e = this.offCtx,
              t = this.lineWidth,
              n = Math.max(2 * t, 10),
              r = e.canvas.width,
              o = e.canvas.height,
              s = this.verticalScaleX(),
              c = this.horizontalScaleY(),
              l = this.innerW(),
              u = this.innerH();
            e.clearRect(0, 0, r, o);
            var p = this.labelFrom,
              d = this.labelTo - p,
              f = this.interval,
              h = o - c + 0.5,
              v = this.isLogScale,
              m = this.max(),
              g = this.maxLog(),
              y = i(m, this.valueLabelsCount);
            function b(e) {
              if (!e) return h;
              var t = e && (u / (g + 1)) * (a(e) + 1);
              return v ? u - t + n : u - (u / y) * e + n;
            }
            function w(e) {
              return s + ((e - p) / d) * l;
            }
            return (
              this.data.forEach(function (n, i) {
                var r,
                  a,
                  l,
                  u,
                  d = this.moment,
                  h = this.lineColors[i];
                (e.lineWidth = t),
                  (e.strokeStyle = h),
                  e.beginPath(),
                  n.forEach(function (t, n) {
                    (l = d(t.timestamp, d.ISO_8601)) <= p
                      ? (u = t)
                      : (0 === n &&
                          l > p &&
                          (e.moveTo(s, o - c),
                          e.lineTo(w(l.clone().subtract(f, "seconds")), o - c)),
                        u &&
                          ((r = s),
                          (a = b(u.value)),
                          e.lineTo(r, a),
                          (u = null)),
                        (r = w(l)),
                        (a = b(t.value)),
                        e.lineTo(r, a));
                  }),
                  d() - l >= 1e3 * f &&
                    ((r = w(l.clone().add(f, "seconds"))),
                    (a = o - c),
                    e.lineTo(r, a),
                    (r = w(d())),
                    e.lineTo(r, a)),
                  e.stroke(),
                  e.closePath(),
                  n.length >= 1 &&
                    (e.beginPath(),
                    (e.fillStyle = h),
                    e.arc(r, a, 2 * t, 0, 2 * Math.PI),
                    e.fill(),
                    e.closePath());
              }, this),
              this.ctx.drawImage(this.offCanvas, 0, 0, r, o, 0, 0, r, o),
              this.drawRulers().drawMouseHint()
            );
          }),
          (s.remove = function () {
            this.unbindEvents(),
              this.canvas.parentNode.removeChild(this.canvas);
          });
      },
      42401: function (e) {
        "use strict";
        e.exports = [
          "$interval",
          function (e) {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (t, n, i, r) {
                var a = e(function () {
                  var t = n.val();
                  t !== r.$viewValue && (r.$setViewValue(t), r.$setPristine()),
                    "function" != typeof document.contains ||
                    document.contains(n[0])
                      ? "function" != typeof document.contains && e.cancel(a)
                      : e.cancel(a);
                }, 500);
              },
            };
          },
        ];
      },
      36143: function (e, t, n) {
        "use strict";
        n(56806),
          (e.exports = function () {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (e, t, n, i) {
                var r =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                i.$parsers.unshift(function (e) {
                  return r.test(e) || !e
                    ? (i.$setValidity("email", !0), e)
                    : (i.$setValidity("email", !1), null);
                });
              },
            };
          });
      },
      66957: function (e, t, n) {
        "use strict";
        n(67559), n(84392), n(66893);
        var i = n(1792),
          r = n(82701),
          a = n(25447),
          o = [
            "$scope",
            "$http",
            "$location",
            "$window",
            "Uri",
            "Notifications",
            "$translate",
            function (e, t, n, r, a, o, s) {
              var c = a.appUri(":engine"),
                l = {};
              t.get(a.appUri("engine://engine/"))
                .then(function (t) {
                  (e.engines = t.data),
                    i.forEach(e.engines, function (e) {
                      l[e.name] = e;
                    }),
                    (e.currentEngine = l[c]),
                    e.currentEngine ||
                      (o.addError({
                        status: s.instant(
                          "DIRECTIVE_ENGINE_SELECT_STATUS_NOT_FOUND"
                        ),
                        message: s.instant(
                          "DIRECTIVE_ENGINE_SELECT_MESSAGE_NOT_FOUND"
                        ),
                        scope: e,
                      }),
                      n.path("/dashboard"));
                })
                .catch(i.noop);
            },
          ];
        e.exports = function () {
          return {
            template: r,
            replace: !0,
            controller: o,
            link: function (e, t, n) {
              var i;
              e.$watch(n.ngShow, function (e) {
                e &&
                  !i &&
                  (i = a('<li class="divider-vertical"></li>').insertAfter(t)),
                  !e && i && (i.remove(), (i = null));
              }),
                e.$on("$destroy", function () {
                  i && i.remove();
                });
            },
          };
        };
      },
      43188: function (e, t, n) {
        "use strict";
        var i = n(1792),
          r = n(69064);
        e.exports = [
          "$translate",
          function (e) {
            return {
              restrict: "E",
              scope: {
                unserializeCallback: "@unserialize",
                serializeCallback: "@serialize",
                initializeCallback: "@initialize",
                enterCallback: "@enter",
                validateCallback: "@validate",
                submitCallback: "@submit",
                successCallback: "@success",
                errorCallback: "@error",
                leaveCallback: "@leave",
                context: "=",
                property: "@",
                defaultValue: "@default",
              },
              template: r,
              link: function (t, n, r) {
                if (
                  ((t.isRequired =
                    null !== r.required && void 0 !== r.required),
                  !t.property)
                )
                  throw new Error(
                    e.instant("DIRECTIVE_INPLACE_TEXTFIELD_ERROR_MSG")
                  );
                (t.initializeCallback
                  ? t.$parent[t.initializeCallback]
                  : function (e, t) {
                      t();
                    })(t, function () {
                  !(function (e) {
                    (e.value = e.context[e.property] || e.defaultValue || null),
                      (e.enter = function () {
                        (e.editing = !0), (e.value = e.context[e.property]);
                      }),
                      (e.submit = function () {
                        var t = this;
                        e.context[e.property] !== t.value
                          ? ((e.context[e.property] = t.value),
                            i.isFunction(e.$parent[e.submitCallback]) &&
                              e.$parent[e.submitCallback](t),
                            e.leave())
                          : e.leave();
                      }),
                      (e.leave = function () {
                        e.editing = !1;
                      });
                  })(t);
                });
              },
            };
          },
        ];
      },
      66011: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(1792),
          r = n(36143),
          a = n(66957),
          o = n(42401),
          s = n(43188),
          c = n(80013),
          l = n(77337),
          u = n(25512),
          p = n(89155),
          d = n(5085),
          f = n(90517);
        n(6978);
        var h = i.module("camunda.common.directives", ["ui.bootstrap", f.name]);
        h.directive("email", r),
          h.directive("autoFill", o),
          h.directive("engineSelect", a),
          h.directive("camInPlaceTextField", s),
          h.directive("notificationsPanel", c),
          h.directive("passwordRepeat", l),
          h.directive("showIfAuthorized", u),
          h.directive("nl2br", p),
          h.directive("instantTypeahead", d),
          h.config([
            "$uibModalProvider",
            "$uibTooltipProvider",
            function (e, t) {
              (e.options = { animation: !0, backdrop: !0, keyboard: !0 }),
                t.options({ animation: !0, popupDelay: 100, appendToBody: !0 });
            },
          ]),
          (e.exports = h);
      },
      5085: function (e) {
        "use strict";
        var t = "[$empty$]";
        e.exports = [
          function () {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (e, n, i, r) {
                r.$parsers.unshift(function (e) {
                  var n = e || t;
                  return (r.$viewValue = n), n;
                }),
                  r.$parsers.push(function (e) {
                    return e === t ? "" : e;
                  }),
                  (e.instantTypeahead = function (e, n) {
                    return (
                      n === t ||
                      ("" + e).toLowerCase().indexOf(("" + n).toLowerCase()) >
                        -1
                    );
                  }),
                  n.bind("click", function () {
                    r.$setViewValue(" " === r.$viewValue ? "" : " "),
                      n.triggerHandler("input");
                  }),
                  n.bind("input", function () {
                    r.$setViewValue(r.$viewValue);
                  });
              },
            };
          },
        ];
      },
      89155: function (e, t, n) {
        "use strict";
        n(56806),
          n(31083),
          (e.exports = [
            function () {
              return {
                scope: { original: "=nl2br" },
                link: function (e, t) {
                  t.text(e.original || "");
                  var n = t.html().replace(/\n/g, "<br/>");
                  t.html(n);
                },
              };
            },
          ]);
      },
      80013: function (e, t, n) {
        "use strict";
        n(82447), n(27473), n(84392), n(25208);
        e.exports = [
          "Notifications",
          "$filter",
          "$sce",
          function (e, t, n) {
            return {
              restrict: "EA",
              scope: { filter: "=notificationsFilter" },
              template:
                '<div class="notifications">  <div uib-alert ng-repeat="notification in notifications" class="alert" ng-class="notificationClass(notification)">    <button type="button" class="close" ng-click="removeNotification(notification)">&times;</button>    <strong class="status" ng-bind-html="trustHTML(notification.status)"></strong>     <strong ng-if="notification.message">:</strong>    <span class="message" ng-bind-html="trustHTML(notification.message)"></span>  </div></div>',
              link: function (i) {
                var r = i.filter;
                var a = (i.notifications = []),
                  o = {
                    add: function (e) {
                      return (
                        !!(function (e) {
                          return !r || !!t("filter")([e], r).length;
                        })(e) && (a.push(e), !0)
                      );
                    },
                    remove: function (e) {
                      var t = a.indexOf(e);
                      -1 != t && a.splice(t, 1);
                    },
                  };
                e.registerConsumer(o),
                  (i.removeNotification = function (e) {
                    a.splice(a.indexOf(e), 1);
                  }),
                  (i.notificationClass = function (e) {
                    var t = "info";
                    return (
                      ["danger", "error", "success", "warning", "info"].indexOf(
                        e.type
                      ) > -1 && (t = e.type),
                      "alert-" + t
                    );
                  }),
                  (i.trustHTML = function (e) {
                    return n.trustAsHtml(e);
                  }),
                  i.$on("$destroy", function () {
                    e.unregisterConsumer(o);
                  });
              },
            };
          },
        ];
      },
      77337: function (e) {
        "use strict";
        e.exports = function () {
          return {
            restrict: "A",
            require: "ngModel",
            link: function (e, t, n, i) {
              var r = n.passwordRepeat;
              i.$parsers.unshift(function (t) {
                var n = t == e.$eval(r);
                return i.$setValidity("passwordRepeat", n), t;
              }),
                e.$watch(r, function (e) {
                  var t = e == i.$viewValue;
                  i.$setValidity("passwordRepeat", t),
                    t || i.$setViewValue(i.$viewValue);
                });
            },
          };
        };
      },
      25512: function (e) {
        "use strict";
        var t = {
          application: 0,
          user: 1,
          group: 2,
          "group membership": 3,
          authorization: 4,
        };
        e.exports = [
          "$animate",
          "AuthorizationResource",
          function (e, n) {
            return {
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              restrict: "A",
              compile: function (i, r, a) {
                return function (i, o) {
                  var s,
                    c,
                    l = r.authPermission,
                    u = r.authResourceName,
                    p = i.$eval(r.authResourceId),
                    d = "true" === r.authInverse;
                  n.check(
                    (function (e, n, i) {
                      var r = {};
                      return (
                        (r.permissionName = e),
                        (r.resourceName = n),
                        (r.resourceType = t[n]),
                        i && (r.resourceId = i),
                        r
                      );
                    })(l, u, p)
                  )
                    .$promise.then(function (t) {
                      s && (e.leave(s), (s = void 0)),
                        c && (c.$destroy(), (c = void 0)),
                        ((t.authorized && !d) || (!t.authorized && d)) &&
                          ((c = i.$new()),
                          a(c, function (t) {
                            (s = t), e.enter(t, o.parent(), o);
                          }));
                    })
                    .catch(function () {});
                };
              },
            };
          },
        ];
      },
      35107: function (e) {
        "use strict";
        e.exports = function () {
          return function (e, t) {
            if (e)
              return e < 950
                ? e
                : (t || (t = 1),
                  (function (e, t) {
                    t = Math.pow(10, t);
                    for (
                      var n = ["k", "M", "G", "T", "P", "E", "Z", "Y"],
                        i = n.length - 1;
                      i >= 0;
                      i--
                    ) {
                      var r = Math.pow(10, 3 * (i + 1));
                      if (r <= e)
                        return (
                          1e3 == (e = Math.round((e * t) / r) / t) &&
                            i < n.length - 1 &&
                            ((e = 1), i++),
                          (e += n[i])
                        );
                    }
                    return e;
                  })(e, t));
          };
        };
      },
      68416: function (e, t, n) {
        "use strict";
        var i = n(1792),
          r = n(92620);
        n(61893);
        var a = i.module("cam.commons.filter.date", ["pascalprecht.translate"]);
        a.provider("camDateFormat", function () {
          var e = { normal: "LLL", short: "LL", long: "LLLL" };
          (this.setDateFormat = function (t, n) {
            e[(n = n || "normal")] = t;
          }),
            (this.$get = function () {
              return function (t) {
                return e[(t = t || "normal")];
              };
            });
        }),
          a.config([
            "$filterProvider",
            function (e) {
              e.register("camDate", [
                "$translate",
                "camDateFormat",
                function (e, t) {
                  return function (e, n) {
                    return e
                      ? ("number" == typeof e && (e = new Date(e)),
                        r(e, r.ISO_8601).format(t(n)))
                      : "";
                  };
                },
              ]);
            },
          ]),
          (e.exports = a);
      },
      40932: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(1792),
          r = n(72599),
          a = n(90517),
          o = n(40263),
          s = n(45386),
          c = n(66011),
          l = n(7154),
          u = n(92773),
          p = n(38025),
          d = n(16386),
          f = n(68416);
        n(6978),
          n(61893),
          n(82298),
          n(27110),
          (e.exports = i.module("cam.commons", [
            r.name,
            a.name,
            o.name,
            s.name,
            c.name,
            l.name,
            u.name,
            p.name,
            d.name,
            f.name,
            "ui.bootstrap",
            "pascalprecht.translate",
            "ngCookies",
            "ngAnimate",
          ]));
      },
      40263: function (e, t, n) {
        "use strict";
        n(45477), n(84735), n(67559), n(84392), n(66893);
        var i = n(1792);
        n(91660);
        var r = n(25447),
          a = i.module("camunda.common.pages", ["ngRoute"]),
          o = [
            "$rootScope",
            "$location",
            "Notifications",
            "AuthenticationService",
            "shouldDisplayAuthenticationError",
            "$translate",
            "configuration",
            function (e, t, n, i, a, o, s) {
              function c(e) {
                (e.http = !0), (e.exclusive = ["http"]), n.addError(e);
              }
              e.$on("httpError", function (n, l) {
                var u,
                  p = l.status,
                  d = l.data,
                  f = l.response.config;
                if ("GET" !== f.method || "/camunda-welcome" !== f.url)
                  switch (p) {
                    case 500:
                      d && d.message
                        ? c({
                            status: o.instant("PAGES_STATUS_SERVER_ERROR"),
                            message: d.message,
                            exceptionType: d.exceptionType,
                          })
                        : c({
                            status: o.instant("PAGES_STATUS_SERVER_ERROR"),
                            message: o.instant("PAGES_MSG_SERVER_ERROR"),
                          });
                      break;
                    case 0:
                      c({
                        status: o.instant("PAGES_STATUS_REQUEST_TIMEOUT"),
                        message: o.instant("PAGES_MSG_REQUEST_TIMEOUT"),
                      });
                      break;
                    case 401:
                      -1 !== t.absUrl().indexOf("/setup/#")
                        ? t.path("/setup")
                        : (t.absUrl(),
                          (u = s.getAppVendor() + " " + s.getAppName()),
                          r("head title").text(u),
                          i.updateAuthentication(null),
                          e.$broadcast("authentication.login.required"));
                      break;
                    case 403:
                      if ("AuthorizationException" == d.type) {
                        var h;
                        if (d.resourceId)
                          h = o.instant("PAGES_MSG_ACCESS_DENIED_RESOURCE_ID", {
                            permissionName: d.permissionName.toLowerCase(),
                            resourceName: d.resourceName.toLowerCase(),
                            resourceId: d.resourceId,
                          });
                        else {
                          var v = d.missingAuthorizations.map(function (e) {
                            return (
                              "'" +
                              e.permissionName +
                              "' " +
                              e.resourceName +
                              "s"
                            );
                          });
                          h = o.instant("PAGES_MSG_ACCESS_DENIED", {
                            missingAuths: v.join(),
                          });
                        }
                        c({
                          status: o.instant("PAGES_STATUS_ACCESS_DENIED"),
                          message: h,
                        });
                      } else
                        c({
                          status: o.instant("PAGES_STATUS_ACCESS_DENIED"),
                          message: o.instant("PAGES_MSG_ACTION_DENIED"),
                        });
                      break;
                    case 404:
                      a() &&
                        c({
                          status: o.instant("PAGES_STATUS_NOT_FOUND"),
                          message: o.instant("PAGES_MSG_NOT_FOUND"),
                        });
                      break;
                    default:
                      c({
                        status: o.instant("PAGES_STATUS_COMMUNICATION_ERROR"),
                        message: o.instant("PAGES_MSG_COMMUNICATION_ERROR", {
                          status: p,
                        }),
                      });
                  }
              });
            },
          ],
          s = [
            "$scope",
            "$http",
            "$location",
            "$window",
            "Uri",
            "Notifications",
            "$translate",
            function (e, t, n, r, a, o, s) {
              var c = a.appUri(":engine"),
                l = {};
              t
                .get(a.appUri("engine://engine/"))
                .then(function (t) {
                  (e.engines = t.data),
                    i.forEach(e.engines, function (e) {
                      l[e.name] = e;
                    }),
                    (e.currentEngine = l[c]),
                    e.currentEngine ||
                      (o.addError({
                        status: s.instant("PAGES_STATUS_NOT_FOUND"),
                        message: s.instant("PAGES_MSG_ENGINE_NOT_EXISTS"),
                        scope: e,
                      }),
                      n.path("/"));
                })
                .catch(i.noop),
                e.$watch("currentEngine", function (e) {
                  e &&
                    c !== e.name &&
                    (r.location.href = a.appUri("app://../" + e.name + "/"));
                });
            },
          ];
        e.exports = a
          .run(o)
          .controller("ProcessEngineSelectionController", s)
          .controller("AuthenticationController", [
            "$scope",
            "$window",
            "$cacheFactory",
            "$location",
            "Notifications",
            "AuthenticationService",
            function (e, t, n, i, r, a) {
              e.logout = function () {
                a.logout();
              };
            },
          ])
          .controller("NavigationController", [
            "$scope",
            "$location",
            function (e, t) {
              e.activeClass = function (e) {
                return -1 != t.absUrl().indexOf(e) ? "active" : "";
              };
            },
          ]);
      },
      45386: function (e, t, n) {
        "use strict";
        var i = n(1792),
          r = n(57537),
          a = n(69353),
          o = i.module("webapps.plugin", []);
        r(o), a(o), (e.exports = o);
      },
      69353: function (e, t, n) {
        "use strict";
        n(45477),
          n(27473),
          n(84392),
          n(14943),
          n(56806),
          n(95234),
          n(31083),
          n(42919),
          n(66893);
        var i = n(1792),
          r = n(25447);
        e.exports = function (e) {
          var t;
          e._camPlugins = {};
          var n = [],
            a = r("base").attr("cam-exclude-plugins") || "";
          function o(e) {
            return String.prototype.trim
              ? e.trim()
              : e.replace(/^\s+|\s+$/g, "");
          }
          a &&
            (i.forEach(a.split(","), function (e) {
              var t = "*";
              (e = e.split(":")).length >= 2 && o(e[1]) && (t = o(e.pop())),
                (e = o(e.shift())) && n.push(e + ":" + t);
            }),
            (t = new RegExp("(" + n.join("|") + ")", "i")));
          var s = [
            function () {
              var n = {};
              (this.registerPlugin = function (i, r, a) {
                ((e._camPlugins[r + ":" + a.id] = !1),
                t && t.test(r + ":" + a.id)) ||
                  ((e._camPlugins[r + ":" + a.id] = !0),
                  (function (e, t, n) {
                    !(function (e, t) {
                      for (
                        var n,
                          i = void 0 !== t.priority ? t.priority : -1 / 0,
                          r = 0;
                        (n = e[r]);
                        r++
                      )
                        if (void 0 === n.priority || n.priority < i)
                          return void e.splice(r, 0, t);
                      e.push(t);
                    })((n[e] = n[e] || []), t);
                  })(r, a, (n[i] = n[i] || {})));
              }),
                (this.$get = [
                  "$filter",
                  function (e) {
                    return {
                      getAllProviders: function (e) {
                        return n[e] || {};
                      },
                      getProviders: function (t, i) {
                        if (!t) throw new Error("No type given");
                        var r = i.component;
                        if (!r) throw new Error("No component given");
                        var a = (n[t] || {})[r];
                        return (
                          i.id && (a = e("filter")(a, { id: i.id })), a || []
                        );
                      },
                      getProvider: function (e, t) {
                        return (this.getProviders(e, t) || [])[0];
                      },
                    };
                  },
                ]);
            },
          ];
          e.provider("Plugins", s);
          var c = [
            "PluginsProvider",
            function (e) {
              (this.registerDefaultView = function (n, i) {
                (t && t.test(n + ":" + i.id)) || e.registerPlugin("view", n, i);
              }),
                (this.registerView = function (t, n) {
                  e.registerPlugin("view", t, n);
                }),
                (this.$get = [
                  "Uri",
                  "Plugins",
                  function (e, t) {
                    var n = !1;
                    function r() {
                      var r;
                      n ||
                        ((r = t.getAllProviders("view")),
                        i.forEach(r, function (t) {
                          i.forEach(t, function (t) {
                            t.url && (t.url = e.appUri(t.url));
                          });
                        }),
                        (n = !0));
                    }
                    return {
                      getProviders: function (e) {
                        return r(), t.getProviders("view", e);
                      },
                      getProvider: function (e) {
                        return (this.getProviders(e) || [])[0];
                      },
                    };
                  },
                ]);
            },
          ];
          e.provider("Views", c);
          var l = [
            "PluginsProvider",
            function (e) {
              (this.registerData = function (t, n) {
                e.registerPlugin("data", t, n);
              }),
                (this.$get = [
                  "Plugins",
                  "$injector",
                  function (e, t) {
                    return {
                      getProviders: function (t) {
                        return e.getProviders("data", t);
                      },
                      getProvider: function (e) {
                        return (this.getProviders(e) || [])[0];
                      },
                      instantiateProviders: function (e, n) {
                        var r = this.getProviders({ component: e });
                        i.forEach(r, function (e) {
                          t.instantiate(e.controller, n);
                        });
                      },
                    };
                  },
                ]);
            },
          ];
          e.provider("Data", l);
        };
      },
      57537: function (e, t, n) {
        "use strict";
        n(84392), n(66893);
        var i = n(1792);
        e.exports = function (e) {
          e.directive("view", [
            "$q",
            "$http",
            "$templateCache",
            "$anchorScroll",
            "$compile",
            "$controller",
            function (e, t, n, r, a, o) {
              return {
                restrict: "ECA",
                terminal: !0,
                link: function (s, c, l) {
                  var u;
                  function p() {
                    u && (u.$destroy(), (u = null));
                  }
                  function d() {
                    c.html(""), p();
                  }
                  s.$watch(l.provider, function () {
                    var f = s.$eval(l.provider),
                      h = s.$eval(l.vars) || {};
                    if (!f) return void d();
                    e.when(
                      (function (e) {
                        var r = e.template;
                        if (r) return r;
                        var a = e.url;
                        return t
                          .get(a, { cache: n })
                          .then(function (e) {
                            return e.data;
                          })
                          .catch(i.noop);
                      })(f)
                    ).then(
                      function (e) {
                        c.html(e), p();
                        var t,
                          n = a(c.contents()),
                          l = {};
                        (u = s.$new(!0)),
                          h &&
                            (h.read &&
                              i.forEach(h.read, function (e) {
                                (u[e] = s[e]),
                                  s.$watch(e, function (t) {
                                    u[e] = t;
                                  });
                              }),
                            h.write &&
                              i.forEach(h.write, function (e) {
                                u.$watch(e, function (t) {
                                  s[e] = t;
                                });
                              })),
                          f.controller &&
                            ((l.$scope = u),
                            (t = o(f.controller, l)),
                            c.children().data("$ngControllerController", t)),
                          n(u),
                          u.$emit("$pluginContentLoaded"),
                          r();
                      },
                      function (e) {
                        throw (d(), e);
                      }
                    );
                  });
                },
              };
            },
          ]);
        };
      },
      91071: function (e) {
        "use strict";
        e.exports = [
          "$resource",
          "Uri",
          function (e, t) {
            return e(
              t.appUri("engine://engine/:engine/authorization/:action"),
              { action: "@action" },
              {
                check: {
                  method: "GET",
                  params: { action: "check" },
                  cache: !0,
                },
                count: { method: "GET", params: { action: "count" } },
                create: { method: "POST", params: { action: "create" } },
              }
            );
          },
        ];
      },
      7154: function (e, t, n) {
        "use strict";
        var i = n(1792),
          r = n(91071),
          a = i.module("camunda.common.resources", []);
        a.factory("AuthorizationResource", r), (e.exports = a);
      },
      92773: function (e, t, n) {
        "use strict";
        n(84392), n(56806), n(31083), n(92695), n(66893);
        var i = n(1792),
          r = [
            "$location",
            "$rootScope",
            function (e, t) {
              var n = !1;
              t.$on("$routeUpdate", function (e, i) {
                n ? (n = !1) : t.$broadcast("$routeChanged", i);
              }),
                t.$on("$routeChangeSuccess", function () {
                  n = !1;
                });
              var r = function () {
                return e.search.apply(e, arguments);
              };
              return (
                (r.updateSilently = function (t, r) {
                  var a = e.absUrl();
                  i.forEach(t, function (t, n) {
                    e.search(n, t);
                  }),
                    e.absUrl() != a && (n = !0),
                    r && e.replace();
                }),
                r
              );
            },
          ],
          a = i.module("camunda.common.search", []);
        a.factory("search", r), (e.exports = a);
      },
      35914: function (e, t, n) {
        "use strict";
        n(84392), n(66893);
        var i = n(1792),
          r = n(59721);
        e.exports = [
          "$rootScope",
          "$timeout",
          "$q",
          "$cookies",
          "configuration",
          "ifUnauthorizedForwardToWelcomeApp",
          function (e, t, n, a, o, s) {
            function c(e) {
              this._wrapped = new r.Client.HttpClient(e);
            }
            return (
              i.forEach(
                ["post", "get", "load", "put", "del", "options", "head"],
                function (r) {
                  c.prototype[r] = function (c, l) {
                    var u = t(function () {}, 1e5);
                    !(function (e) {
                      var t = (e.headers = e.headers || {}),
                        n = a.get(o.getCsrfCookieName());
                      n && (t["X-XSRF-TOKEN"] = n);
                    })(l);
                    var p = i.isFunction(l.done) ? l.done : i.noop;
                    return (
                      (l.done = function (n, i, r) {
                        function a() {
                          if ((s(r), n && 401 === n.status))
                            return (
                              e.$broadcast("authentication.changed", null),
                              (e.authentication = null),
                              void e.$broadcast("authentication.login.required")
                            );
                          p(n, i);
                        }
                        var o = e.$$phase;
                        "$apply" !== o && "$digest" !== o ? e.$apply(a) : a(),
                          t.cancel(u);
                      }),
                      n.when(this._wrapped[r](c, l))
                    );
                  };
                }
              ),
              i.forEach(["on", "once", "off", "trigger"], function (e) {
                c.prototype[e] = function () {
                  this._wrapped[e].apply(this, arguments);
                };
              }),
              c
            );
          },
        ];
      },
      81236: function (e) {
        "use strict";
        e.exports = [
          "$rootScope",
          function (e) {
            var t = 0;
            return {
              logStarted: function () {
                t || e.$broadcast("requestStarted"), t++;
              },
              logFinished: function () {
                --t || e.$broadcast("requestFinished");
              },
            };
          },
        ];
      },
      74791: function (e, t, n) {
        "use strict";
        n(67559),
          n(56806),
          n(31083),
          (e.exports = [
            "$route",
            "$q",
            "$location",
            "Notifications",
            "$translate",
            function (e, t, n, i, r) {
              return {
                getByRouteParam: function (a, o) {
                  var s = t.defer(),
                    c = e.current.params[a],
                    l = o.resolve,
                    u = o.name || "entity";
                  function p(e) {
                    s.resolve(e);
                  }
                  function d(e) {
                    var t,
                      a,
                      l,
                      p = !1;
                    404 === e.status
                      ? ((t = r.instant(
                          "SERVICES_RESOURCE_RESOLVER_ID_NOT_FOUND",
                          { resourceName: u, id: c }
                        )),
                        (a = !0),
                        "function" ==
                          typeof (l = o.redirectTo || "/dashboard") &&
                          ((p = !0), l(e)))
                      : 401 === e.status
                      ? ((t = r.instant(
                          "SERVICES_RESOURCE_RESOLVER_AUTH_FAILED"
                        )),
                        (l = "/login"))
                      : ((t = r.instant(
                          "SERVICES_RESOURCE_RESOLVER_RECEIVED_STATUS",
                          { status: e.status }
                        )),
                        (l = "/dashboard")),
                      p ||
                        (n.path(l),
                        a && n.replace(),
                        i.addError({
                          status: r.instant(
                            "SERVICES_RESOURCE_RESOLVER_DISPLAY_FAILED",
                            { resourceName: u }
                          ),
                          message: t,
                          http: !0,
                          exclusive: ["http"],
                        })),
                      s.reject(t);
                  }
                  var f = l(c);
                  if (f.$promise && f.$promise.then)
                    f = f.$promise.then(function (e) {
                      p(e);
                    }, d);
                  else {
                    if (!f.then)
                      throw new Error(
                        r.instant("SERVICES_RESOURCE_RESOLVER_NO_PROMISE")
                      );
                    f = f.then(p, d);
                  }
                  return s.promise;
                },
              };
            },
          ]);
      },
      93059: function (e, t, n) {
        "use strict";
        n(85541),
          (e.exports = [
            "$window",
            function (e) {
              var t = e.localStorage,
                n = JSON.parse(t.getItem("camunda") || "{}");
              return {
                get: function (e, t) {
                  return void 0 !== n[e] ? n[e] : t;
                },
                set: function (e, i) {
                  (n[e] = i), t.setItem("camunda", JSON.stringify(n));
                },
                remove: function (e) {
                  delete n[e], t.setItem("camunda", JSON.stringify(n));
                },
              };
            },
          ]);
      },
      68587: function (e) {
        "use strict";
        var t = document.querySelector("base").getAttribute("app-name");
        e.exports = function () {
          this.$get = function () {
            return t;
          };
        };
      },
      86374: function (e) {
        "use strict";
        e.exports = [
          "$timeout",
          function (e) {
            return function (t, n) {
              var i;
              return function r() {
                var a = this,
                  o = arguments;
                (r.$loading = !0),
                  i && e.cancel(i),
                  (i = e(function () {
                    (i = null), (r.$loading = !1), t.apply(a, o);
                  }, n));
              };
            };
          },
        ];
      },
      61230: function (e, t, n) {
        "use strict";
        n(56806),
          n(31083),
          (e.exports = function () {
            return function (e) {
              return encodeURIComponent(e)
                .replace(/%2F/g, "%252F")
                .replace(/\*/g, "%2A")
                .replace(/%5C/g, "%255C");
            };
          });
      },
      13826: function (e, t, n) {
        "use strict";
        var i = n(92620);
        e.exports = function () {
          return function (e) {
            return e ? i(e, i.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : e;
          };
        };
      },
      48597: function (e, t, n) {
        "use strict";
        n(34820),
          n(76474),
          (e.exports = [
            "Uri",
            function (e) {
              return function (t) {
                if (t) {
                  var n,
                    i =
                      null === (n = t["x-authorized-apps"]) || void 0 === n
                        ? void 0
                        : n.split(",");
                  if (i) {
                    var r = e.appUri(":appName");
                    "welcome" === r ||
                      i.includes(r) ||
                      (window.location.href = e.appUri(
                        "app://../../welcome/:engine/"
                      ));
                  }
                }
              };
            },
          ]);
      },
      38025: function (e, t, n) {
        "use strict";
        n(82447), n(67559), n(84392), n(56806), n(54062);
        var i = n(1792),
          r = n(90517),
          a = n(61230),
          o = n(86374),
          s = n(81236),
          c = n(74791),
          l = n(35914),
          u = n(48877),
          p = n(13826),
          d = n(48597),
          f = n(47215),
          h = n(61262),
          v = n(68587),
          m = i.module("camunda.common.services", [r.name]);
        m.filter("escape", a),
          m.factory("debounce", o),
          m.factory("RequestLogger", s),
          m.factory("ResourceResolver", c),
          m.factory("camAPIHttpClient", l),
          m.factory("unescape", u),
          m.factory("fixDate", p),
          m.factory("ifUnauthorizedForwardToWelcomeApp", d),
          m.factory("unfixDate", f),
          m.factory("shouldDisplayAuthenticationError", h),
          m.provider("canonicalAppName", v),
          m.config([
            "$httpProvider",
            function (e) {
              e.interceptors.push([
                "$rootScope",
                "$q",
                "RequestLogger",
                "ifUnauthorizedForwardToWelcomeApp",
                function (e, t, n, i) {
                  return (
                    n.logStarted(),
                    {
                      response: function (e) {
                        return n.logFinished(), i(e.headers()), e;
                      },
                      responseError: function (i) {
                        n.logFinished();
                        var r = {
                          status: parseInt(i.status),
                          response: i,
                          data: i.data,
                        };
                        return e.$broadcast("httpError", r), t.reject(i);
                      },
                    }
                  );
                },
              ]);
            },
          ]),
          m.config([
            "$httpProvider",
            "$windowProvider",
            function (e, t) {
              var n = t
                .$get()
                .location.href.match(
                  /\/(?:app)(?!.*\/app\/)\/([\w-]+)\/([\w-]+)/
                );
              if (!n) throw new Error("no process engine selected");
              e.defaults.headers.get = { "X-Authorized-Engine": n[2] };
            },
          ]),
          (e.exports = m);
      },
      61262: function (e) {
        "use strict";
        e.exports = [
          "$location",
          function (e) {
            return function () {
              var t = e.path();
              return (
                "/login" !== t &&
                "/dashboard" !== t &&
                "/" !== t &&
                "/welcome" !== t
              );
            };
          },
        ];
      },
      48877: function (e, t, n) {
        "use strict";
        n(56806),
          n(31083),
          (e.exports = function () {
            return function (e) {
              var t = e
                .replace(/%252F/g, "%2F")
                .replace(/%255C/g, "%5C")
                .replace(/%2A/g, "*");
              return decodeURIComponent(t);
            };
          });
      },
      47215: function (e, t, n) {
        "use strict";
        var i = n(92620);
        e.exports = function () {
          return function (e) {
            return e ? i(e, i.ISO_8601).format("YYYY-MM-DDTHH:mm:ss") : e;
          };
        };
      },
      18585: function (e, t, n) {
        "use strict";
        n(84392), n(56806), n(31083);
        var i = ["http://www.omg.org/spec/DMN/20151101/dmn11.xsd"];
        function r(e, t) {
          return e.replace(
            'xmlns="' + t + '"',
            'xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"'
          );
        }
        e.exports = function (e) {
          return i.reduce(r, e);
        };
      },
      90517: function (e, t, n) {
        "use strict";
        n(82447), n(84392);
        var i = n(1792),
          r = n(83845),
          a = n(15806),
          o = n(62197);
        e.exports = i
          .module("cam.commons.util", [])
          .filter("uri", r)
          .provider("Uri", a)
          .service("Notifications", o);
      },
      67110: function (e) {
        "use strict";
        e.exports = {
          load: function () {
            return requirejs.s.contexts._.defined;
          },
        };
      },
      62197: function (e, t, n) {
        "use strict";
        n(27473), n(84392), n(66893);
        var i = n(1792);
        function r(e) {
          var t = document.createTextNode(e),
            n = document.createElement("div");
          return n.appendChild(t), n.innerHTML;
        }
        e.exports = [
          "$filter",
          "$timeout",
          function (e, t) {
            return {
              notifications: [],
              consumers: [],
              addError: function (e) {
                e.type || (e.type = "danger"), this.add(e);
              },
              addMessage: function (e) {
                e.type || (e.type = "info"), this.add(e);
              },
              add: function (e) {
                var n = this,
                  a = this.notifications,
                  o = this.consumers,
                  s = e.exclusive;
                if (
                  (e.unsafe ||
                    ((e.status = r(e.status)),
                    (e.message = r(e.message || ""))),
                  s)
                )
                  if ("boolean" == typeof s) this.clearAll();
                  else {
                    var c = {};
                    i.forEach(s, function (t) {
                      c[t] = e[t];
                    }),
                      n.clear(c);
                  }
                a.push(e);
                for (var l, u = o.length - 1; (l = o[u]) && !l.add(e); u--);
                e.duration &&
                  t(function () {
                    e.scope && delete e.scope, n.clear(e);
                  }, e.duration),
                  e.scope &&
                    e.scope.$on("$destroy", function () {
                      delete e.scope, n.clear(e);
                    });
              },
              clear: function (t) {
                var n = this.notifications,
                  r = this.consumers,
                  a = [];
                "string" == typeof t && (t = { status: t }),
                  (a = e("filter")(n, t)).push(t),
                  i.forEach(a, function (e) {
                    var t = n.indexOf(e);
                    -1 != t && n.splice(t, 1),
                      i.forEach(r, function (t) {
                        t.remove(e);
                      });
                  });
              },
              clearAll: function () {
                for (var e = this.notifications; e.length; ) {
                  var t = e.pop();
                  this.clear(t);
                }
              },
              registerConsumer: function (e) {
                this.consumers.push(e);
              },
              unregisterConsumer: function (e) {
                var t = this.consumers,
                  n = t.indexOf(e);
                -1 != n && t.splice(n, 1);
              },
            };
          },
        ];
      },
      83845: function (e) {
        "use strict";
        e.exports = [
          "Uri",
          function (e) {
            return function (t) {
              return e.appUri(t);
            };
          },
        ];
      },
      15806: function (e, t, n) {
        "use strict";
        n(56806), n(31083);
        var i = n(1792);
        e.exports = function () {
          var e = /[\w]+:\/\/|:[\w]+/g,
            t = {};
          (this.replace = function (e, n) {
            t[e] = n;
          }),
            (this.$get = [
              "$injector",
              function (n) {
                return {
                  appUri: function (r) {
                    return r.replace(e, function (e) {
                      var r = t[e];
                      return void 0 === r
                        ? e
                        : ((i.isFunction(r) || i.isArray(r)) &&
                            (r = n.invoke(r)),
                          r);
                    });
                  },
                };
              },
            ]);
        };
      },
      70555: function (e, t, n) {
        "use strict";
        n(85174);
        var i = n(82236).A,
          r = {};
        e.exports = {
          generateViewer: function (e) {
            var t = i;
            e.disableNavigation &&
              (t = Object.getPrototypeOf(i.prototype).constructor);
            return new t(e);
          },
          cacheViewer: function (e) {
            return e.key && (r[e.key] = e.viewer);
          },
        };
      },
      38284: function (e, t, n) {
        "use strict";
        var i = n(54834),
          r = n(18107);
        e.exports = [
          "$uibModal",
          function (e) {
            return {
              scope: { annotation: "<", readonly: "=?", onSubmit: "&" },
              template: i,
              link: function (t) {
                t.openModal = function () {
                  e.open(
                    r(t.annotation, !!t.readonly, t.onSubmit())
                  ).result.then(function (e) {
                    t.annotation = e;
                  });
                };
              },
            };
          },
        ];
      },
      18107: function (e, t, n) {
        "use strict";
        n(84392), n(17003), n(61794);
        var i = n(13919);
        e.exports = function (e, t, n) {
          return {
            template: i,
            controller: [
              "$scope",
              "Notifications",
              "configuration",
              "camAPI",
              "$translate",
              function (i, r, a, o, s) {
                (i.readOnly = t),
                  (i.maxAnnotationLength =
                    a.getUserOperationLogAnnotationLength()),
                  (i.text = e || ""),
                  (i.dirty = !1),
                  (i.valid = !0),
                  (i.loadingState = "INITIAL"),
                  (i.updateAnnotation = function () {
                    n(i.text)
                      .then(function () {
                        r.addMessage({
                          status: s.instant("SUCCESS"),
                          message: s.instant(
                            "PLGN_AUDIT_EDIT_NOTIFICATION_SUCCESS"
                          ),
                          exclusive: !0,
                        }),
                          (i.dirty = !1);
                      })
                      .catch(function (t) {
                        r.addError({
                          status: s.instant("ERROR"),
                          message:
                            s.instant("PLGN_AUDIT_EDIT_NOTIFICATION_FAILURE") +
                            t,
                          exclusive: !0,
                        }),
                          (i.text = e);
                      })
                      .finally(function () {
                        i.loadingState = "DONE";
                      });
                  });
              },
            ],
          };
        };
      },
      1634: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        function r(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return a(e);
            })(e) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(e) ||
            (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return a(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === n && e.constructor && (n = e.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(e);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return a(e, t);
            })(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function a(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
          return i;
        }
        n(36180),
          n(51980),
          n(28186),
          n(95453),
          n(57507),
          n(72595),
          n(67559),
          n(95234),
          n(30129),
          n(19824),
          n(82447),
          n(67762),
          n(34820),
          n(85541),
          n(84392),
          n(56806),
          n(31083),
          n(92695),
          n(66893);
        var o = n(67110),
          s = n(1792),
          c = n(70555),
          l = n(86188);
        e.exports = [
          "$q",
          "$document",
          "$compile",
          "$location",
          "$rootScope",
          "search",
          "debounce",
          function (e, t, n, a, u, p, d) {
            return {
              scope: {
                diagramData: "=",
                key: "@",
                control: "=?",
                disableNavigation: "&",
                onLoad: "&",
                onClick: "&",
                onRootChange: "&",
                onMouseEnter: "&",
                onMouseLeave: "&",
                bpmnJsConf: "=?",
              },
              template: l,
              link: function (l, f) {
                var h,
                  v = null,
                  m = null,
                  g = [],
                  y = f[0].querySelector(".diagram-holder");
                function b() {
                  y.appendChild(v._container);
                }
                (l.grabbing = !1),
                  (l.disableNavigation = l.$eval(l.disableNavigation)),
                  (l.control = l.control || {}),
                  (l.control.highlight = function (e) {
                    m.addMarker(e, "highlight"),
                      f
                        .find('[data-element-id="' + e + '"]>.djs-outline')
                        .attr({ rx: "14px", ry: "14px" });
                  }),
                  (l.control.clearHighlight = function (e) {
                    m.removeMarker(e, "highlight");
                  }),
                  (l.control.isHighlighted = function (e) {
                    return m.hasMarker(e, "highlight");
                  }),
                  (l.control.createBadge = function (e, t) {
                    var i,
                      r = v.get("overlays");
                    t.html
                      ? (i = t.html)
                      : ((i = document.createElement("span")),
                        t.color && (i.style["background-color"] = t.color),
                        t.tooltip &&
                          (i.setAttribute("tooltip", t.tooltip),
                          i.setAttribute("tooltip-placement", "top")),
                        t.text &&
                          i.appendChild(document.createTextNode(t.text)));
                    var a = r.add(e, {
                      position: t.position || { bottom: 0, right: 0 },
                      show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                      html: i,
                    });
                    return n(i)(l), a;
                  }),
                  (l.control.removeBadges = function (e) {
                    v.get("overlays").remove({ element: e });
                  }),
                  (l.control.removeBadge = function (e) {
                    v.get("overlays").remove(e);
                  }),
                  (l.control.getViewer = function () {
                    return v;
                  }),
                  (l.control.scrollToElement = function (e) {
                    var t = l.control.getElement(e);
                    m.scrollToElement(t);
                  }),
                  (l.control.getElement = function (e) {
                    return v.get("elementRegistry").get(e);
                  }),
                  (l.control.getElements = function (e) {
                    return v.get("elementRegistry").filter(e);
                  }),
                  (l.loaded = !1),
                  (l.control.isLoaded = function () {
                    return l.loaded;
                  }),
                  (l.control.addAction = function (e) {
                    var t = f.find(".actions"),
                      i = e.html;
                    t.append(i), n(i)(l);
                  }),
                  (l.control.addImage = function (n, i, r) {
                    return ((a = n),
                    (o = t[0].body),
                    (c = e.defer()),
                    (l = s
                      .element("<img>")
                      .css("position", "absolute")
                      .css("left", "-9999em")
                      .css("top", "-9999em")
                      .attr("src", a)[0]),
                    (l.onload = function () {
                      c.resolve(l);
                    }),
                    (l.onerror = function () {
                      c.reject(l);
                    }),
                    o.appendChild(l),
                    c.promise).then(
                      function (e) {
                        var a = e.offsetWidth,
                          o = e.offsetHeight,
                          c = t[0].createElementNS(
                            "http://www.w3.org/2000/svg",
                            "image"
                          );
                        return (
                          c.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            n
                          ),
                          c.setAttributeNS(null, "width", a),
                          c.setAttributeNS(null, "height", o),
                          c.setAttributeNS(null, "x", i),
                          c.setAttributeNS(null, "y", r),
                          t[0].body.removeChild(e),
                          m._viewport.appendChild(c),
                          s.element(c)
                        );
                      },
                      function (e) {
                        t[0].body.removeChild(e);
                      }
                    );
                    var a, o, c, l;
                  });
                var w = l.bpmnJsConf,
                  _ = [];
                w &&
                  w.additionalModules &&
                  !Array.isArray(w.additionalModules) &&
                  s.forEach(o.load(), function (e, t) {
                    w.additionalModules[t] && _.push(e);
                  }),
                  Array.isArray(null == w ? void 0 : w.additionalModules) &&
                    _.push.apply(_, r(w.additionalModules)),
                  (v = c.generateViewer({
                    width: "100%",
                    height: "100%",
                    canvas: { deferUpdate: !1 },
                    key: l.key,
                    disableNavigation: l.disableNavigation,
                    additionalModules: _,
                    moddleExtensions: window.bpmnJsModdleExtensions || {},
                  })).cached || b();
                var E = v.get("overlays").show.bind(v.get("overlays"));
                v.get("overlays").show = function () {
                  v.get("eventBus").fire("overlays.show"), E();
                };
                var x = v.get("overlays").hide.bind(v.get("overlays"));
                v.get("overlays").hide = function () {
                  v.get("eventBus").fire("overlays.hide"), x();
                };
                var S = d(function () {
                    v.get("overlays").show();
                  }, 300),
                  I = v.get("canvas")._viewboxChanged.bind(v.get("canvas")),
                  A = d(function () {
                    I(), v.get("overlays").hide(), S();
                  }, 0);
                v.get("canvas")._viewboxChanged = function () {
                  A();
                };
                var C = null;
                function k() {
                  var e;
                  (m = v.get("canvas")),
                    (h = v._definitions),
                    (e = v.get("eventBus")).on("element.click", L),
                    e.on("element.hover", O),
                    e.on("element.out", N),
                    e.on("element.mousedown", D),
                    e.on("canvas.viewbox.changed", P),
                    e.on("root.set", $),
                    (function () {
                      if (m) {
                        var e = JSON.parse((a.search() || {}).viewbox || "{}")[
                            h.id
                          ],
                          t = (a.search() || {}).rootElement;
                        if (t) {
                          var n = m.findRoot(t);
                          m.setRootElement(n);
                        }
                        e ? m.viewbox(e) : m.zoom("fit-viewport", "auto");
                      }
                    })(),
                    (l.loaded = !0);
                }
                l.$watch("diagramData", function (e) {
                  e &&
                    ((C = e),
                    (function () {
                      if (v.cached) return b(), k(), l.onLoad();
                      if (C) {
                        l.loaded = !1;
                        var e = "object" === i(C),
                          t = (e ? v.open : v.importXML).bind(v),
                          n = C;
                        e &&
                          (v._setDefinitions(C),
                          (n = void 0),
                          v.on("import.render.complete", function () {
                            v.get("eventBus").fire("import.done");
                          })),
                          t(n)
                            .then(function (t) {
                              var n = t.warnings;
                              (e
                                ? function (e) {
                                    e();
                                  }
                                : l.$apply.bind(l))(function () {
                                return (l.warn = n), k(), l.onLoad();
                              });
                            })
                            .catch(function (e) {
                              l.error = e;
                            });
                      }
                    })());
                });
                var T = function e() {
                  (l.grabbing = !1),
                    document.removeEventListener("mouseup", e),
                    l.$apply();
                };
                function L(e) {
                  l.onClick({ element: e.element, $event: e.originalEvent });
                }
                function O(e) {
                  l.onMouseEnter({
                    element: e.element,
                    $event: e.originalEvent,
                  });
                }
                function N(e) {
                  l.onMouseLeave({
                    element: e.element,
                    $event: e.originalEvent,
                  });
                }
                function D() {
                  (l.grabbing = !0),
                    document.addEventListener("mouseup", T),
                    l.$apply();
                }
                var P = d(function (e) {
                    var t = JSON.parse((a.search() || {}).viewbox || "{}");
                    (t[h.id] = {
                      x: e.viewbox.x,
                      y: e.viewbox.y,
                      width: e.viewbox.width,
                      height: e.viewbox.height,
                    }),
                      p.updateSilently({ viewbox: JSON.stringify(t) });
                    var n = u.$$phase;
                    "$apply" !== n && "$digest" !== n
                      ? l.$apply(function () {
                          a.replace();
                        })
                      : a.replace();
                  }, 500),
                  $ = function (e, t) {
                    var n = t.element;
                    l.onRootChange(),
                      n &&
                        (p.updateSilently({ rootElement: n.id }),
                        g.includes(n) ||
                          (m.zoom("fit-viewport", "auto"), g.push(n)));
                  };
                (l.zoomIn = function () {
                  v.get("zoomScroll").zoom(1, {
                    x: f[0].offsetWidth / 2,
                    y: f[0].offsetHeight / 2,
                  });
                }),
                  (l.zoomOut = function () {
                    v.get("zoomScroll").zoom(-1, {
                      x: f[0].offsetWidth / 2,
                      y: f[0].offsetHeight / 2,
                    });
                  }),
                  (l.resetZoom = function () {
                    m.resized(), m.zoom("fit-viewport", "auto");
                  }),
                  (l.control.resetZoom = l.resetZoom),
                  (l.control.refreshZoom = function () {
                    m.resized(), m.zoom(m.zoom(), "auto");
                  }),
                  l.$on("$destroy", function () {
                    var e;
                    y.removeChild(v._container),
                      (e = v.get("eventBus")).off("element.click", L),
                      e.off("element.hover", O),
                      e.off("element.out", N),
                      e.off("element.mousedown", D),
                      e.off("canvas.viewbox.changed", P),
                      e.off("root.set", $),
                      p.updateSilently({ rootElement: null }),
                      v.get("overlays").clear(),
                      c.cacheViewer({ key: l.key, viewer: v });
                  });
              },
            };
          },
        ];
      },
      14203: function (e, t, n) {
        "use strict";
        var i = n(5831);
        e.exports = [
          "$location",
          function (e) {
            return {
              restrict: "A",
              template: i,
              link: function (t) {
                t.getLink = e.absUrl.bind(e);
              },
            };
          },
        ];
      },
      97234: function (e, t, n) {
        "use strict";
        n(57507), n(84392), n(56806), n(31083), n(19824);
        var i = n(30430).throttle,
          r = n(60589),
          a = n(92620),
          o = n(35107)();
        e.exports = [
          "$window",
          function (e) {
            return {
              restrict: "A",
              scope: {
                fontFamily: "=?",
                fontSize: "=?",
                handleColor: "=?",
                handleColorHover: "=?",
                handleWidth: "=?",
                interval: "=?",
                lineColors: "=?",
                lineWidth: "=?",
                rulersColor: "=?",
                selectingColor: "=?",
                selection: "&onSelection",
                textPadding: "=?",
                tickSize: "=?",
                timeLabelFormats: "=?",
                timespan: "=?",
                timestampFormat: "=?",
                unselectedColor: "=?",
                valueLabelsCount: "=?",
                values: "=",
                disableSelection: "=",
                isLogScale: "=",
              },
              link: function (t, n) {
                var s = n[0],
                  c = e.getComputedStyle(s);
                function l() {
                  return Math.min(Math.max(0.75 * s.clientWidth, 180), 300);
                }
                (t.timespan = t.timespan || "day"),
                  (t.interval = t.interval || 900);
                var u = (t.chart = new r({
                  moment: a,
                  abbreviateNumber: o,
                  onselection: function (e) {
                    t.$apply(function () {
                      t.selection({ info: e });
                    });
                  },
                  width: s.clientWidth,
                  height: l(),
                  fontFamily: t.fontFamily || c.fontFamily,
                  fontSize: t.fontSize,
                  handleColor: t.handleColor,
                  handleColorHover: t.handleColorHover,
                  handleWidth: t.handleWidth,
                  lineColors: t.lineColors,
                  lineWidth: t.lineWidth,
                  rulersColor: t.rulersColor || c.color,
                  selectingColor: t.selectingColor,
                  textPadding: t.textPadding,
                  tickSize: t.tickSize,
                  timeLabelFormats: t.timeLabelFormats,
                  timestampFormat: t.timestampFormat,
                  unselectedColor: t.unselectedColor,
                  valueLabelsCount: t.valueLabelsCount,
                  disableSelection: t.disableSelection,
                  isLogScale: t.isLogScale,
                }));
                t.$watch("values", function () {
                  var e = s.className.replace("no-data", "");
                  t.values &&
                  t.values.length &&
                  t.values[0] &&
                  t.values[0].length
                    ? u.setData(t.values, t.timespan, t.interval)
                    : ((e += " no-data"),
                      u.setData([[]], t.timespan, t.interval)),
                    (s.className = e);
                }),
                  s.appendChild(u.canvas);
                var p = i(function () {
                  u.resize(s.clientWidth, l()).draw();
                }, 100);
                e.addEventListener("resize", p),
                  t.$on("$destroy", function () {
                    e.removeEventListener("resize", p);
                  });
              },
              template: "\x3c!-- keule!! pech jehabt! --\x3e",
            };
          },
        ];
      },
      95470: function (e, t, n) {
        "use strict";
        n(56806), n(31083);
        var i = n(44247),
          r = n(31324);
        e.exports = [
          "$timeout",
          "$translate",
          function (e, t) {
            return {
              transclude: !0,
              template: r,
              scope: { value: "=camWidgetClipboard", leftSide: "=?" },
              link: function (n, r, a) {
                var o, s;
                function c() {
                  n.$apply(),
                    (s = e(
                      function () {
                        n.copyStatus = null;
                      },
                      1200,
                      !0
                    ));
                }
                function l() {
                  var e = r[0].querySelector("[ng-transclude]"),
                    t = r[0].querySelector("a.glyphicon-copy"),
                    n = window.getComputedStyle(r[0]),
                    i = 1,
                    a = 0;
                  e &&
                    t &&
                    ((i = e.offsetWidth + t.offsetWidth),
                    (a =
                      parseInt(n.width) -
                      parseInt(n.paddingRight) -
                      parseInt(n.paddingLeft))),
                    i - a > 0
                      ? -1 === e.className.indexOf("resize") &&
                        (e.className += " resize")
                      : (e.className = e.className.replace(" resize", ""));
                }
                (n.noTooltip = void 0 !== a.noTooltip),
                  (n.copyStatus = null),
                  (n.icon = a.icon || "glyphicon-copy"),
                  n.$watch("value", function () {
                    n.tooltipText =
                      a.tooltipText ||
                      t.instant("CAM_WIDGET_COPY", { value: n.value });
                  }),
                  e(function () {
                    var e = r[0].querySelector("a." + n.icon);
                    e &&
                      (window.addEventListener("resize", l),
                      l(),
                      (o = new i(e, {
                        text: function () {
                          return n.value;
                        },
                      })).on("success", function () {
                        (n.copyStatus = !0), c();
                      }),
                      o.on("error", function () {
                        (n.copyStatus = !1), c();
                      }));
                  }),
                  n.$on("$destroy", function () {
                    window.removeEventListener("resize", l),
                      o && o.destroy && o.destroy(),
                      s && e.cancel(s);
                  });
              },
            };
          },
        ];
      },
      18686: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(57507),
          n(30129),
          n(19824),
          n(82447),
          n(67762),
          n(85174),
          n(85541),
          n(84392),
          n(56806),
          n(31083),
          n(92695);
        var r = n(64672),
          a = n(89192);
        e.exports = [
          "$compile",
          "$location",
          "$rootScope",
          "search",
          "debounce",
          function (e, t, n, o, s) {
            return {
              scope: {
                diagramData: "=",
                control: "=?",
                disableNavigation: "&",
                onLoad: "&",
                onClick: "&",
                onMouseEnter: "&",
                onMouseLeave: "&",
              },
              template: a,
              link: function (a, c) {
                var l;
                (a.grabbing = !1),
                  (a.disableNavigation = a.$eval(a.disableNavigation)),
                  (a.control = a.control || {}),
                  (a.control.highlight = function (e) {
                    a.control.addMarker(e, "highlight");
                    var t = e.id || e;
                    c.find('[data-element-id="' + t + '"]>.djs-outline').attr({
                      rx: "14px",
                      ry: "14px",
                    });
                  }),
                  (a.control.clearHighlight = function (e) {
                    a.control.removeMarker(e, "highlight");
                  }),
                  (a.control.isHighlighted = function (e) {
                    return a.control.hasMarker(e, "highlight");
                  }),
                  (a.control.addMarker = function (e, t) {
                    y.addMarker(e, t);
                  }),
                  (a.control.removeMarker = function (e, t) {
                    y.removeMarker(e, t);
                  }),
                  (a.control.hasMarker = function (e, t) {
                    return y.hasMarker(e, t);
                  }),
                  (a.control.createBadge = function (t, n) {
                    var i,
                      r = p.get("overlays");
                    n.html
                      ? (i = n.html)
                      : ((i = document.createElement("span")),
                        n.color && (i.style["background-color"] = n.color),
                        n.tooltip &&
                          (i.setAttribute("tooltip", n.tooltip),
                          i.setAttribute("tooltip-placement", "top")),
                        n.text &&
                          i.appendChild(document.createTextNode(n.text)));
                    var o = r.add(t, {
                      position: n.position || { bottom: 0, right: 0 },
                      show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                      html: i,
                    });
                    return e(i)(a), o;
                  }),
                  (a.control.removeBadges = function (e) {
                    p.get("overlays").remove({ element: e });
                  }),
                  (a.control.removeBadge = function (e) {
                    p.get("overlays").remove(e);
                  }),
                  (a.control.getViewer = function () {
                    return p;
                  }),
                  (a.control.scrollToElement = function (e) {
                    var t,
                      n,
                      i,
                      r,
                      a = p.get("elementRegistry").get(e),
                      o = y.viewbox();
                    (t = Math.max(o.height, a.height)),
                      (n = Math.max(o.width, a.width)),
                      (i = Math.min(
                        Math.max(o.x, a.x - o.width + a.width),
                        a.x
                      )),
                      (r = Math.min(
                        Math.max(o.y, a.y - o.height + a.height),
                        a.y
                      )),
                      y.viewbox({ x: i, y: r, width: n, height: t });
                  }),
                  (a.control.getElement = function (e) {
                    return p.get("elementRegistry").get(e);
                  }),
                  (a.control.getElements = function (e) {
                    return p.get("elementRegistry").filter(e);
                  }),
                  (a.loaded = !1),
                  (a.control.isLoaded = function () {
                    return a.loaded;
                  }),
                  (a.control.addAction = function (t) {
                    var n = c.find(".actions"),
                      i = t.html;
                    n.append(i), e(i)(a);
                  }),
                  (a.control.addImage = function (e, t, n) {
                    return y._viewport.image(e, t, n);
                  });
                var u = r;
                a.disableNavigation &&
                  (u = Object.getPrototypeOf(r.prototype).constructor);
                var p = new u({
                    container: c[0].querySelector(".diagram-holder"),
                    width: "100%",
                    height: "100%",
                    canvas: { deferUpdate: !1 },
                  }),
                  d = p.get("overlays").show.bind(p.get("overlays"));
                p.get("overlays").show = function () {
                  p.get("eventBus").fire("overlays.show"), d();
                };
                var f = p.get("overlays").hide.bind(p.get("overlays"));
                p.get("overlays").hide = function () {
                  p.get("eventBus").fire("overlays.hide"), f();
                };
                var h = s(function () {
                    p.get("overlays").show();
                  }, 300),
                  v = p.get("canvas")._viewboxChanged.bind(p.get("canvas")),
                  m = s(function () {
                    v(), p.get("overlays").hide(), h();
                  }, 0);
                p.get("canvas")._viewboxChanged = function () {
                  m();
                };
                var g = null,
                  y = null;
                a.$watch("diagramData", function (e) {
                  e &&
                    ((g = e),
                    (function () {
                      if (g) {
                        a.loaded = !1;
                        var e = "object" === i(g);
                        (e ? p.importDefinitions : p.importXML).bind(p)(
                          g,
                          function (i, r) {
                            (e
                              ? function (e) {
                                  e();
                                }
                              : a.$apply.bind(a))(function () {
                              var e;
                              i
                                ? (a.error = i)
                                : ((a.warn = r),
                                  (y = p.get("canvas")),
                                  (l = p._definitions),
                                  (function () {
                                    if (y) {
                                      var e = JSON.parse(
                                        (t.search() || {}).viewbox || "{}"
                                      )[l.id];
                                      e
                                        ? y.viewbox(e)
                                        : y.zoom("fit-viewport", "auto");
                                    }
                                  })(),
                                  (e = p.get("eventBus")).on(
                                    "element.click",
                                    function (e) {
                                      a.onClick({
                                        element: e.element,
                                        $event: e.originalEvent,
                                      });
                                    }
                                  ),
                                  e.on("element.hover", function (e) {
                                    a.onMouseEnter({
                                      element: e.element,
                                      $event: e.originalEvent,
                                    });
                                  }),
                                  e.on("element.out", function (e) {
                                    a.onMouseLeave({
                                      element: e.element,
                                      $event: e.originalEvent,
                                    });
                                  }),
                                  e.on("element.mousedown", function () {
                                    (a.grabbing = !0),
                                      document.addEventListener("mouseup", b),
                                      a.$apply();
                                  }),
                                  e.on(
                                    "canvas.viewbox.changed",
                                    s(function (e) {
                                      var i = JSON.parse(
                                        (t.search() || {}).viewbox || "{}"
                                      );
                                      (i[l.id] = {
                                        x: e.viewbox.x,
                                        y: e.viewbox.y,
                                        width: e.viewbox.width,
                                        height: e.viewbox.height,
                                      }),
                                        o.updateSilently({
                                          viewbox: JSON.stringify(i),
                                        });
                                      var r = n.$$phase;
                                      "$apply" !== r && "$digest" !== r
                                        ? a.$apply(function () {
                                            t.replace();
                                          })
                                        : t.replace();
                                    }, 500)
                                  ),
                                  (a.loaded = !0),
                                  a.onLoad());
                            });
                          }
                        );
                      }
                    })());
                });
                var b = function e() {
                  (a.grabbing = !1),
                    document.removeEventListener("mouseup", e),
                    a.$apply();
                };
                (a.zoomIn = function () {
                  p.get("zoomScroll").zoom(1, {
                    x: c[0].offsetWidth / 2,
                    y: c[0].offsetHeight / 2,
                  });
                }),
                  (a.zoomOut = function () {
                    p.get("zoomScroll").zoom(-1, {
                      x: c[0].offsetWidth / 2,
                      y: c[0].offsetHeight / 2,
                    });
                  }),
                  (a.resetZoom = function () {
                    y.resized(), y.zoom("fit-viewport", "auto");
                  }),
                  (a.control.resetZoom = a.resetZoom),
                  (a.control.refreshZoom = function () {
                    y.resized(), y.zoom(y.zoom(), "auto");
                  });
              },
            };
          },
        ];
      },
      81240: function (e, t, n) {
        "use strict";
        var i = n(19142);
        e.exports = [
          function () {
            return {
              template: i,
              scope: {
                debugged: "=",
                displayName: "@displayName",
                extensionName: "@extensionName",
                open: "@",
                extendedInfo: "=",
                tooltip: "@camWidgetDebugTooltip",
                tooltipPlacement: "@camWidgetDebugTooltipPlacement",
                disableToggleButton: "=",
              },
              link: function (e, t, n) {
                (e.varName = n.displayName || n.debugged),
                  (e.extended = void 0 !== n.extended),
                  (e.toggleOpen = function () {
                    e.open = !e.open;
                  });
              },
            };
          },
        ];
      },
      85562: function (e, t, n) {
        "use strict";
        n(82447), n(67762), n(67559), n(84392), n(56806), n(66893);
        var i = n(94993).V,
          r = n(1792),
          a = n(49404).A,
          o = n(79572).f8,
          s = n(18585),
          c = n(89496),
          l = document.addEventListener;
        (document.addEventListener = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          if ("focusin" !== t[0]) return l.apply(document, t);
        }),
          (e.exports = [
            "$window",
            function (e) {
              return {
                scope: {
                  xml: "=",
                  table: "@",
                  width: "=",
                  height: "=",
                  control: "=?",
                  editMode: "=",
                  showDetails: "=",
                  disableNavigation: "=",
                  enableDrdNavigation: "=",
                  disableLoader: "=",
                  onLoad: "&",
                  onClick: "&",
                  onDblClick: "&",
                },
                template: c,
                link: function (t, n) {
                  var c,
                    l = e.document;
                  (t.isDrd = !1),
                    (t.grabbing = !1),
                    (t.control = t.control || {}),
                    (t.control.getViewer = function () {
                      return u;
                    }),
                    (t.control.getElement = function (e) {
                      return u.getActiveViewer().get("elementRegistry").get(e);
                    }),
                    (t.loaded = !1),
                    (t.control.isLoaded = function () {
                      return t.loaded;
                    }),
                    (t.control.highlightRow = function (e, t) {
                      var n = "[data-row-id = " + e + "]";
                      r.element(n).parent().addClass(t);
                    }),
                    (t.control.highlightElement = function (e) {
                      c &&
                        u.getActiveViewer().get("elementRegistry").get(e) &&
                        (c.addMarker(e, "highlight"),
                        n
                          .find('[data-element-id="' + e + '"]>.djs-outline')
                          .attr({ rx: "14px", ry: "14px" }));
                    }),
                    (t.control.clearAllElementsHighlight = function () {
                      c &&
                        c.getRootElement().children.forEach(function (e) {
                          var t = e.id;
                          c.hasMarker(t, "highlight") &&
                            c.removeMarker(t, "highlight");
                        });
                    }),
                    (t.control.clearElementHighlight = function (e) {
                      c && c.removeMarker(e, "highlight");
                    }),
                    (t.control.isElementHighlighted = function (e) {
                      if (c) return c.hasMarker(e, "highlight");
                    }),
                    (t.control.getElements = function (e) {
                      if (c)
                        return u
                          .getActiveViewer()
                          .get("elementRegistry")
                          .filter(e);
                    }),
                    (t.control.createBadge = function (e, t) {
                      c &&
                        (function (e, t) {
                          var n = u
                            .getActiveViewer()
                            .get("overlays")
                            .add(e, {
                              position: t.position || { bottom: 10, right: 10 },
                              show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                              html: t.html,
                            });
                        })(e, t);
                    }),
                    (t.control.resetZoom = h),
                    (t.control.refreshZoom = function () {
                      c.resized(), c.zoom(c.zoom(), "auto");
                    });
                  var u = new (t.editMode ? o : a)({
                      container: n[0].querySelector(".table-holder"),
                      width: t.width,
                      height: t.height,
                      hideDetails: !t.showDetails,
                      tableViewOnly: t.table,
                      drd: { drillDown: { enabled: t.enableDrdNavigation } },
                    }),
                    p = null;
                  t.$watch("xml", function (e) {
                    e &&
                      i(e).then(function (e) {
                        (p = e),
                          (function () {
                            if (p) {
                              var e = s(p);
                              (t.loaded = !1),
                                u.importXML(e, function (e) {
                                  var n = function () {
                                    return r.isDefined(t.table);
                                  };
                                  (t.isDrd =
                                    u.getDefinitions().drgElement.length > 1 &&
                                    !n()),
                                    t.isDrd &&
                                      ((c = u
                                        .getActiveViewer()
                                        .get("canvas")).zoom(
                                        "fit-viewport",
                                        "auto"
                                      ),
                                      t.control
                                        .getElements(function (e) {
                                          return "dmn:Decision" === e.type;
                                        })
                                        .forEach(function (e) {
                                          c.addMarker(e.id, "decision-element");
                                        })),
                                    t.$apply(f),
                                    t.$apply(function () {
                                      e
                                        ? (t.error = e)
                                        : (t.isDrd && t.onLoad(),
                                          (t.loaded = !0));
                                    });
                                });
                            }
                          })();
                      });
                  }),
                    u.on("import.done", function () {
                      u.getActiveViewer().on("element.click", function (e) {
                        t.$apply(function () {
                          t.onClick({
                            element: e.element,
                            $event: e.originalEvent,
                          });
                        });
                      }),
                        u
                          .getActiveViewer()
                          .on("element.dblclick", function (e) {
                            t.$apply(function () {
                              t.onDblClick({
                                element: e.element,
                                $event: e.originalEvent,
                              });
                            });
                          });
                    });
                  var d = t.$apply.bind(t, function () {
                    (t.grabbing = !1), l.removeEventListener("mouseup", d);
                  });
                  function f() {
                    if (t.table) {
                      var e = /^[0-9]+$/.test(t.table);
                      t.table = e ? +t.table : t.table;
                      var n = u.getViews().filter(function (e) {
                        return (
                          (r.isString(t.table) && e.element.id === t.table) ||
                          e.element.name === t.table
                        );
                      })[0];
                      u.open(n, function () {
                        t.onLoad();
                      });
                    } else
                      var i = t.$watch("table", function (e) {
                        e && (i(), f());
                      });
                  }
                  function h() {
                    c && (c.resized(), c.zoom("fit-viewport", "auto"));
                  }
                  u.on(
                    "element.mousedown",
                    t.$apply.bind(t, function () {
                      (t.grabbing = !0), l.addEventListener("mouseup", d);
                    })
                  ),
                    (t.zoomIn = function () {
                      u.getActiveViewer()
                        .get("zoomScroll")
                        .zoom(1, {
                          x: n[0].offsetWidth / 2,
                          y: n[0].offsetHeight / 2,
                        });
                    }),
                    (t.zoomOut = function () {
                      u.getActiveViewer()
                        .get("zoomScroll")
                        .zoom(-1, {
                          x: n[0].offsetWidth / 2,
                          y: n[0].offsetHeight / 2,
                        });
                    }),
                    (t.resetZoom = h),
                    e.addEventListener("resize", t.resetZoom),
                    t.$on("destroy", function () {
                      e.removeEventListener("resize", t.resetZoom),
                        l.removeEventListener("mouseup", d);
                    });
                },
              };
            },
          ]);
      },
      49404: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(24421),
          n(57507),
          n(553),
          n(54363),
          n(85174),
          n(84392),
          n(10020),
          n(30129),
          n(19824),
          (t.A = void 0),
          n(17922);
        var r = u(n(17238)),
          a = u(n(32950)),
          o = u(n(27201)),
          s = u(n(65049)),
          c = n(52037),
          l = n(99705);
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function p(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, d(i.key), i);
          }
        }
        function d(e) {
          var t = (function (e, t) {
            if ("object" != i(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var r = n.call(e, t || "default");
              if ("object" != i(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === t ? String : Number)(e);
          })(e, "string");
          return "symbol" == i(t) ? t : String(t);
        }
        function f(e, t, n) {
          return (
            (t = v(t)),
            (function (e, t) {
              if (t && ("object" === i(t) || "function" == typeof t)) return t;
              if (void 0 !== t)
                throw new TypeError(
                  "Derived constructors may only return object or undefined"
                );
              return (function (e) {
                if (void 0 === e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return e;
              })(e);
            })(
              e,
              h()
                ? Reflect.construct(t, n || [], v(e).constructor)
                : t.apply(e, n)
            )
          );
        }
        function h() {
          try {
            var e = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
          } catch (e) {}
          return (h = function () {
            return !!e;
          })();
        }
        function v(e) {
          return (
            (v = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            v(e)
          );
        }
        function m(e, t) {
          return (
            (m = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                }),
            m(e, t)
          );
        }
        t.A = (function (e) {
          function t() {
            var e,
              n =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
            return (
              (function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
              ((e = f(this, t, [n])).options = n),
              e
            );
          }
          var n, i, r;
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(e, "prototype", { writable: !1 }),
                t && m(e, t);
            })(t, e),
            (n = t),
            (i = [
              {
                key: "_getViewProviders",
                value: function () {
                  var e = [
                    {
                      id: "literalExpression",
                      constructor: s.default,
                      opens: function (e) {
                        return (
                          (0, c.is)(e, "dmn:Decision") &&
                          (0, c.is)(e.decisionLogic, "dmn:LiteralExpression")
                        );
                      },
                    },
                    {
                      id: "decisionTable",
                      constructor: o.default,
                      opens: function (e) {
                        return (
                          (0, c.is)(e, "dmn:Decision") &&
                          (0, c.is)(e.decisionLogic, "dmn:DecisionTable")
                        );
                      },
                    },
                  ];
                  return (
                    this.options.tableViewOnly ||
                      e.push({
                        id: "drd",
                        constructor: a.default,
                        opens: function (e) {
                          return (
                            (0, c.is)(e, "dmn:Definitions") &&
                            (0, l.containsDi)(e)
                          );
                        },
                      }),
                    e
                  );
                },
              },
            ]) && p(n.prototype, i),
            r && p(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t
          );
        })(r.default);
      },
      98934: function (e, t, n) {
        "use strict";
        var i = n(70044);
        e.exports = [
          function () {
            return {
              template: i,
              scope: { version: "@" },
              link: function (e) {
                e.timezoneName =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
              },
            };
          },
        ];
      },
      74690: function (e, t, n) {
        "use strict";
        n(67559), n(85541), n(84392), n(66893);
        var i = n(25447),
          r = n(1792),
          a = n(57752),
          o = n(46152),
          s = {
            welcome: { label: "Welcome" },
            admin: { label: "Admin" },
            cockpit: { label: "Cockpit" },
            tasklist: { label: "Tasklist" },
          };
        e.exports = function () {
          return {
            transclude: !0,
            template: a,
            scope: {
              authentication: "=",
              userName: "=?",
              currentApp: "@",
              signOut: "@?",
              toggleNavigation: "@?",
              myProfile: "@?",
              smallScreenWarning: "@?",
            },
            compile: function (e, t) {
              t.toggleNavigation ||
                (t.toggleNavigation = "CAM_WIDGET_HEADER_TOGGLE_NAVIGATION"),
                t.myProfile || (t.myProfile = "CAM_WIDGET_HEADER_MY_PROFILE"),
                t.signOut || (t.signOut = "CAM_WIDGET_HEADER_SIGN_OUT"),
                t.smallScreenWarning ||
                  (t.smallScreenWarning =
                    "CAM_WIDGET_HEADER_SMALL_SCREEN_WARNING");
            },
            controller: [
              "$scope",
              "AuthenticationService",
              "$sce",
              "configuration",
              function (e, t, n, a) {
                function c() {
                  var t = r.copy(s);
                  e.currentApp &&
                    ("welcome" === e.currentApp && e.authentication
                      ? (t = {})
                      : delete t[e.currentApp]),
                    e.authentication &&
                      e.authentication.name &&
                      (delete t.welcome,
                      Object.keys(t).forEach(function (n) {
                        e.authentication.authorizedApps.indexOf(n) < 0 &&
                          delete t[n];
                      })),
                    (e.showAppDropDown = Object.keys(t).length > 0),
                    (e.apps = t);
                }
                (e.logo = n.trustAsHtml(o)),
                  (e.brandName = a.getAppVendor() + " " + a.getAppName()),
                  i("head title").text(e.brandName),
                  (e.trustAsHtml = n.trustAsHtml),
                  (e.isCommunityEdition = !0),
                  (e.logout = t.logout),
                  (e.getTargetRoute = function () {
                    return e.authentication ? "" : "#/login";
                  }),
                  e.$watch("currentApp", c),
                  e.$watch("authentication", c);
              },
            ],
          };
        };
      },
      16386: function (e, t, n) {
        "use strict";
        n(82447), n(67559), n(84392);
        var i = n(1792),
          r = n(38284),
          a = n(33030),
          o = n(17502),
          s = n(46569),
          c = n(74690),
          l = n(98934),
          u = n(1574),
          p = n(97234),
          d = n(81240),
          f = n(95470),
          h = n(38862),
          v = n(65214),
          m = n(71746),
          g = n(18974),
          y = n(1634),
          b = n(18686),
          w = n(85562),
          _ = n(68416),
          E = n(66011),
          x = n(92773),
          S = n(20386),
          I = n(93059),
          A = n(14203),
          C = n(19182),
          k = n(170);
        n(6978);
        var T = i.module("camunda.common.widgets", [
          _.name,
          E.name,
          x.name,
          "ui.bootstrap",
        ]);
        T.factory("widgetLocalConf", I),
          T.directive("camWidgetInlineField", a),
          T.directive("camWidgetSearchPill", o),
          T.directive("camWidgetHeader", c),
          T.directive("camWidgetFooter", l),
          T.directive("camWidgetLoader", u),
          T.directive("camWidgetChartLine", p),
          T.directive("camWidgetDebug", d),
          T.directive("camWidgetClipboard", f),
          T.directive("camWidgetVariable", h),
          T.directive("camWidgetVariablesTable", v),
          T.directive("camRenderVarTemplate", m),
          T.directive("camWidgetSearch", g),
          T.directive("camWidgetBpmnViewer", y),
          T.directive("camWidgetCmmnViewer", b),
          T.directive("camWidgetDmnViewer", w),
          T.directive("camShareLink", A),
          T.directive("camWidgetPassword", C),
          T.directive("camVariableValidator", S),
          T.directive("camAnnotationEdit", r),
          T.directive("camWidgetSelectionType", k),
          T.filter("camQueryComponent", s),
          (e.exports = T);
      },
      33030: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(57507),
          n(30129),
          n(19824),
          n(67762),
          n(84392),
          n(56806);
        var r = n(1792),
          a = n(25447),
          o = n(85364),
          s = n(67050),
          c = n(61166);
        e.exports = [
          "$timeout",
          "$filter",
          "$document",
          "$uibModal",
          function (e, t, n, l) {
            return {
              scope: {
                varValue: "=value",
                varType: "@type",
                inOperator: "=?",
                notInOperator: "=?",
                validator: "&validate",
                change: "&",
                onStart: "&onStartEditing",
                onCancel: "&onCancelEditing",
                placeholder: "@",
                options: "=?",
                allowNonOptions: "@",
                flexible: "@",
                dateFormat: "=?",
                datePickerOptions: "=?",
                disableAutoselect: "=?",
              },
              template: o,
              link: function (o, u) {
                o.formData = {};
                var p,
                  d,
                  f = a(
                    (function (e) {
                      var t = getComputedStyle(e),
                        n = "absolute" === t.position,
                        i = /(auto|scroll)/;
                      if ("fixed" === t.position) return document.body;
                      for (var r = e; (r = r.parentElement); )
                        if (
                          ((t = getComputedStyle(r)),
                          (!n || "static" !== t.position) &&
                            i.test(t.overflow + t.overflowY + t.overflowX))
                        )
                          return r;
                      return document.body;
                    })(u[0])
                  ),
                  h = t("date"),
                  v =
                    /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
                function m() {
                  return ["datetime", "date", "time"].indexOf(o.varType) > -1;
                }
                function g() {
                  return (
                    [
                      "color",
                      "email",
                      "month",
                      "number",
                      "range",
                      "tel",
                      "text",
                      "time",
                      "url",
                      "week",
                    ].indexOf(o.varType) > -1
                  );
                }
                function y() {
                  if (
                    ((o.inOperator = o.inOperator || !1),
                    (o.editing = !1),
                    (o.invalid = !1),
                    (o.formData.editValue = o.varValue),
                    (o.validator = o.validator || function () {}),
                    (o.onStart = o.onStart || function () {}),
                    (o.onCancel = o.onCancel || function () {}),
                    (o.change = o.change || function () {}),
                    (o.options = o.options || []),
                    (o.allowNonOptions = o.allowNonOptions || !1),
                    (o.flexible = o.flexible || !1),
                    (o.dateFormat = o.dateFormat || "yyyy-MM-dd'T'HH:mm:ss"),
                    (o.datePickerOptions = o.datePickerOptions || {}),
                    (o.varType = o.varType ? o.varType : "text"),
                    (o.simpleField = g()),
                    m())
                  ) {
                    var e = o.varValue,
                      t = null;
                    (t = e
                      ? (function (e) {
                          var t,
                            n,
                            i,
                            r,
                            a,
                            o,
                            s,
                            c = v.exec(e);
                          if (c)
                            return (
                              (t = parseInt(c[1] || 0, 10)),
                              (n = parseInt(c[2] || 0, 10) - 1),
                              (i = parseInt(c[3] || 0, 10)),
                              (r = parseInt(c[4] || 0, 10)),
                              (a = parseInt(c[5] || 0, 10)),
                              (o = parseInt(c[6] || 0, 10)),
                              (s = parseInt(c[7] || 0, 10)),
                              new Date(t, n, i, r, a, o, s)
                            );
                        })(e)
                      : new Date().setSeconds(0, 0)),
                      (o.formData.dateValue = t);
                  }
                }
                function b(e) {
                  if (!e || !e.length) return !1;
                  var t = e.parent();
                  return (
                    !(!t || !t.length) && "body" === t[0].tagName.toLowerCase()
                  );
                }
                function w() {
                  var e = {
                      left: a(u).offset().left - f.offset().left,
                      top: a(u).offset().top - f.offset().top,
                    },
                    t = d.outerWidth() + e.left;
                  if (
                    (t > f.prop("clientWidth") &&
                      (e.left -= t + 5 - f.prop("clientWidth")),
                    m()
                      ? p
                          .addClass("datepicker-control")
                          .show()
                          .css({
                            left: e.left + (d.outerWidth() - p.outerWidth()),
                            top: e.top + d.outerHeight(),
                          })
                      : p
                          .removeClass("datepicker-control")
                          .show()
                          .css({
                            left: e.left + (a(u).outerWidth() - p.outerWidth()),
                            top: e.top - p.outerHeight(),
                          }),
                    d
                      .show()
                      .css({ left: e.left, top: e.top + a(u).outerHeight() }),
                    m())
                  ) {
                    var n = d[0].querySelector(".uib-daypicker");
                    n && n.focus();
                  }
                }
                function _(t) {
                  e(function () {
                    (o.editing && !t) ||
                      (p && p.remove && p.remove(),
                      (p = null),
                      d && d.remove && d.remove(),
                      (d = null));
                  }, 50);
                }
                function E(e) {
                  if (
                    o.editing &&
                    !(function (e) {
                      return (
                        u[0].contains(e.target) ||
                        (p && p.length && p[0].contains(e.target)) ||
                        (d && d.length && d[0].contains(e.target))
                      );
                    })(e)
                  ) {
                    var t = a(e.target),
                      n = "ng-binding text-muted";
                    if (!t.hasClass(n))
                      t.children().hasClass(n) || o.$apply(o.cancelChange);
                  }
                }
                (o.editing = !1),
                  (o.varTypeOriginal = o.varType),
                  (o.isNumber = "number" === o.varType),
                  (o.hasCustomDateFormat = !!o.dateFormat),
                  (o.dateFormat = o.dateFormat || "yyyy-MM-dd'T'HH:mm:ss"),
                  o.$on("$locationChangeSuccess", function () {
                    o.cancelChange();
                  }),
                  o.$on("$destroy", function () {
                    _(!0);
                  }),
                  o.$watch("editing", function (t, n) {
                    t !== n &&
                      (o.editing
                        ? (b(
                            (d = (
                              d && d.length
                                ? d
                                : a(u[0].querySelector(".field-control"))
                            ).hide())
                          ) || f.append(d),
                          b(
                            (p = (
                              p && p.length
                                ? p
                                : a(u[0].querySelector(".btn-group"))
                            ).hide())
                          ) || f.append(p),
                          e(w, 50),
                          u.addClass("inline-editing"))
                        : (_(), u.removeClass("inline-editing")));
                  }),
                  (o.changeType = function () {
                    "text" !== o.varType
                      ? (o.varType = "text")
                      : (o.varType = o.varTypeOriginal),
                      y(),
                      (o.editing = !0),
                      (u[0].attributes.type.value = o.varType),
                      (o.simpleField = g());
                  }),
                  (o.startEditing = function () {
                    if (!o.editing) {
                      y(), (o.editing = !0), o.onStart(o);
                      var t = o.formData.editValue;
                      o.simpleField || (o.formData.editValue = ""),
                        e(function () {
                          e(function () {
                            if (((o.formData.editValue = t), t)) {
                              var n = "object" === i(t);
                              n &&
                                r
                                  .element(
                                    u[0].querySelector(
                                      '[ng-model="formData.editValue"]'
                                    )
                                  )
                                  .val(t.value),
                                e(function () {
                                  for (
                                    var e = a(
                                        u[0].querySelector("li[ng-mouseenter]")
                                      ),
                                      i = n ? t.value : t,
                                      r = 0;
                                    r < e.length;
                                    r++
                                  ) {
                                    var o = e[r];
                                    if (0 === o.innerText.indexOf(i))
                                      return void a(o).trigger("mouseenter");
                                  }
                                });
                            }
                          });
                        }),
                        e(function () {
                          r
                            .element(
                              u[0].querySelector(
                                '[ng-model="formData.editValue"]'
                              )
                            )
                            .triggerHandler("click"),
                            e(function () {
                              a('[ng-model="formData.editValue"]').focus(),
                                a('[ng-model="formData.editValue"]').select(),
                                n.bind("click", E);
                            }, 50);
                        });
                    }
                  }),
                  (o.applyChange = function (e, t) {
                    if (((o.invalid = o.validator(o)), !o.invalid)) {
                      if (o.simpleField)
                        (o.formData.editValue = (function (e) {
                          if ("number" === o.varType)
                            return e.length > 0 ? +e : null;
                          return e;
                        })(a('[ng-model="formData.editValue"]').val())),
                          (o.varValue = o.formData.editValue);
                      else if ("option" === o.varType) {
                        if (-1 === o.options.indexOf(e) && !o.allowNonOptions)
                          return void o.cancelChange();
                        (o.formData.editValue =
                          e || a('[ng-model="formData.editValue"]').val()),
                          (o.varValue = o.formData.editValue);
                      } else
                        m() &&
                          (o.varValue = h(o.formData.dateValue, o.dateFormat));
                      (o.$event = t),
                        o.change(o),
                        (o.editing = !1),
                        n.unbind("click", E);
                    }
                  }),
                  (o.cancelChange = function () {
                    o.editing &&
                      ((o.editing = !1), o.onCancel(o), n.unbind("click", E));
                  }),
                  (o.changeDate = function (e) {
                    var t = e.formData.dateValue;
                    o.hasCustomDateFormat &&
                      (t = h(e.formData.dateValue, o.dateFormat)),
                      (o.formData.editValue = o.formData.dateValue = t);
                  }),
                  (o.selectNextInlineField = function (t) {
                    for (
                      var n = a(
                          "[cam-widget-inline-field][type='text'], [cam-widget-inline-field][type='option']"
                        ),
                        i = t * (n.length - 1);
                      i !== !t * (n.length - 1);
                      i += 2 * !t - 1
                    )
                      if (n[i] === u[0])
                        return void e(function () {
                          var r = a(n[i + 2 * !t - 1]);
                          r.find(".view-value").click(),
                            e(function () {
                              r.find("input").select();
                            });
                        });
                    e(function () {
                      a(n[t * n.length - 1])
                        .find(".view-value")
                        .click();
                    });
                  }),
                  (o.trapKeyboard = function (e, t) {
                    m() &&
                      9 === e.keyCode &&
                      (t || e.shiftKey
                        ? t &&
                          e.shiftKey &&
                          (a(
                            '.cam-widget-inline-field.btn-group > button[ng-click="cancelChange($event)"]'
                          )[0].focus(),
                          e.preventDefault())
                        : (a(
                            ".cam-widget-inline-field.field-control > .datepicker > table"
                          )[0].focus(),
                          e.preventDefault()));
                  }),
                  (o.cancelOnEsc = function (e) {
                    m() && 27 === e.keyCode && o.cancelChange();
                  }),
                  (o.handleKeydown = function (e) {
                    13 === e.keyCode
                      ? (o.applyChange(o.selection, e), e.preventDefault())
                      : 27 === e.keyCode
                      ? (o.cancelChange(e), e.preventDefault())
                      : 9 === e.keyCode &&
                        (o.applyChange(o.selection, e),
                        o.selectNextInlineField(e.shiftKey),
                        e.preventDefault()),
                      (o.selection = null);
                  }),
                  (o.selection = null),
                  (o.saveSelection = function (t) {
                    (o.selection = t),
                      e(function () {
                        o.selection === t && o.applyChange(t);
                      });
                  }),
                  (o.expandValue = function () {
                    var t = function () {
                      return e(function () {
                        a('[ng-model="formData.editValue"]').focus().select(),
                          n.bind("click", E);
                      });
                    };
                    l
                      .open({
                        resolve: {
                          formData: function () {
                            return o.formData;
                          },
                        },
                        controller: s,
                        template: c,
                      })
                      .result.then(t)
                      .catch(t),
                      n.unbind("click", E);
                  });
              },
              transclude: !0,
            };
          },
        ];
      },
      67050: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        function r(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function a(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? r(Object(n), !0).forEach(function (t) {
                  o(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : r(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function o(e, t, n) {
          var r;
          return (
            (r = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" != i(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(r) ? r : String(r)) in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        n(28186),
          n(82447),
          n(57507),
          n(1164),
          n(38179),
          n(85541),
          n(30129),
          n(66893),
          n(19824),
          n(36180),
          n(51980),
          n(24421),
          n(45477),
          n(84735),
          n(553),
          n(54363),
          n(84392),
          n(56806),
          n(31083),
          (e.exports = [
            "$scope",
            "$location",
            "formData",
            function (e, t, n) {
              (e.formData = a(
                a({}, n),
                {},
                { editValue: n.editValue.replace(/,/g, "\n") }
              )),
                (e.changeValue = function () {
                  (n.editValue = e.formData.editValue
                    .split("\n")
                    .map(function (e) {
                      return e.replace(/^\s*,+\s*|\s*,+\s*$/g, "");
                    })
                    .join(",")),
                    e.$dismiss();
                });
            },
          ]);
      },
      1574: function (e, t, n) {
        "use strict";
        var i = n(1792),
          r = n(64556);
        e.exports = [
          "$translate",
          function (e) {
            return {
              transclude: !0,
              template: r,
              scope: {
                loadingState: "@",
                textEmpty: "@",
                textError: "@",
                textLoading: "@",
              },
              compile: function (t, n) {
                i.isDefined(n.textLoading) ||
                  (n.textLoading = e.instant("LOADING")),
                  i.isDefined(n.loadingState) || (n.loadingState = "INITIAL");
              },
            };
          },
        ];
      },
      19182: function (e, t, n) {
        "use strict";
        var i = n(1792),
          r = n(37628);
        e.exports = [
          "camAPI",
          "debounce",
          "$timeout",
          function (e, t, n) {
            return {
              scope: {
                profile: "=camWidgetPasswordProfile",
                password: "=camWidgetPasswordPassword",
                isValid: "=?camWidgetPasswordValid",
              },
              link: function (r) {
                var a = e.resource("password-policy"),
                  o = !1;
                (r.loadingState = "DEACTIVATED"),
                  a.get().then(function (e) {
                    if (!e)
                      return (
                        (o = !1),
                        (r.isValid = !0),
                        void (r.loadingState = "DEACTIVATED")
                      );
                    (o = !0),
                      (r.tooltip = "PASSWORD_POLICY_TOOLTIP"),
                      (r.rules = e.rules),
                      s();
                  });
                var s = function () {
                    o &&
                      ((r.isValid = !1),
                      r.password
                        ? ((r.loadingState = "LOADING"), u())
                        : (r.loadingState = "NOT_OK"));
                  },
                  c = null;
                n(function () {
                  r.$watch(
                    "profile",
                    function (e) {
                      e && ((c = e), s());
                    },
                    !0
                  );
                });
                var l = function (e) {
                    return e || "";
                  },
                  u = t(function () {
                    r.password &&
                      a
                        .validate(
                          {
                            password: r.password,
                            profile: {
                              id: l(c.id),
                              firstName: l(c.firstName),
                              lastName: l(c.lastName),
                              email: l(c.email),
                            },
                          },
                          function (e, t) {
                            if (e)
                              return (
                                (r.loadingState = "NOT_OK"),
                                void (r.tooltip =
                                  "PASSWORD_POLICY_TOOLTIP_ERROR")
                              );
                            t.valid
                              ? ((r.loadingState = "OK"), (r.isValid = !0))
                              : ((r.loadingState = "NOT_OK"),
                                (r.isValid = !1),
                                (r.tooltip = "PASSWORD_POLICY_TOOLTIP_PARTIAL"),
                                (r.rules = t.rules));
                          }
                        )
                        .catch(i.noop);
                  }, 1e3);
                r.$watch("[password]", s, !0);
              },
              template: r,
            };
          },
        ];
      },
      46569: function (e, t, n) {
        "use strict";
        n(56806),
          n(54062),
          (e.exports = [
            "$filter",
            function (e) {
              var t =
                /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
              var n = e("camDate");
              return function (e) {
                return e && e.match(t) ? n(e) : e || "??";
              };
            },
          ]);
      },
      17502: function (e, t, n) {
        "use strict";
        n(67762), n(57507), n(84392), n(19824);
        var i = n(25447),
          r = n(77376);
        e.exports = [
          "$timeout",
          function (e) {
            return {
              restrict: "A",
              scope: {
                valid: "=",
                extended: "=",
                basic: "=",
                allowDates: "=",
                enforceDates: "=",
                enforceString: "=",
                options: "=",
                invalidText: "@",
                deleteText: "@",
                type: "=",
                name: "=",
                potentialNames: "=?",
                operator: "=",
                value: "=",
                onChange: "&",
                onDelete: "&",
                disableTypeaheadAutoselect: "=?",
                allowNonOptions: "@?",
              },
              link: function (t, n) {
                (t.valueType = a()),
                  (t.potentialNames = t.potentialNames || []),
                  (t.changeSearch = function (e, n, i) {
                    var r = t[e].value;
                    (t[e].value = n),
                      (t[e].inEdit = !1),
                      "function" == typeof t.onChange &&
                        t.onChange({
                          field: e,
                          before: r,
                          value: n,
                          $event: i,
                        });
                  }),
                  (t.clearEditTrigger = function (e) {
                    t[e].inEdit = !1;
                  }),
                  (t.onKeydown = function (e, n) {
                    13 === e.keyCode &&
                      e.target === e.currentTarget &&
                      (t[n].inEdit = !0);
                  }),
                  t.$watch("allowDates", function (e) {
                    e || (t.valueType = a());
                  }),
                  t.$watch("enforceDates", function (e) {
                    e && (t.valueType = a());
                  }),
                  t.$watch("enforceString", function (e) {
                    e && (t.valueType = a());
                  });
                var r = function (t) {
                  e(function () {
                    i(
                      n[0].querySelectorAll(
                        "[cam-widget-inline-field][value='" + t + ".value']"
                      )
                    )
                      .find(".view-value")
                      .click();
                  });
                };
                function a() {
                  return t.options
                    ? "option"
                    : t.enforceDates
                    ? "datetime"
                    : "text";
                }
                t.$watch(
                  "value",
                  function (e) {
                    return e && e.inEdit && r("value");
                  },
                  !0
                ),
                  t.$watch(
                    "name",
                    function (e) {
                      return e && e.inEdit && r("name");
                    },
                    !0
                  ),
                  t.$watch(
                    "type",
                    function (e) {
                      return e && e.inEdit && r("type");
                    },
                    !0
                  ),
                  t.$watch(
                    "operator",
                    function (e) {
                      return (
                        e &&
                          !e.value &&
                          1 === e.values.length &&
                          (e.value = e.values[0]),
                        e && e.inEdit && r("operator")
                      );
                    },
                    !0
                  );
              },
              template: r,
            };
          },
        ];
      },
      18974: function (e, t, n) {
        "use strict";
        function i(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function r(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? i(Object(n), !0).forEach(function (t) {
                  a(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : i(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function a(e, t, n) {
          var i;
          return (
            (i = (function (e, t) {
              if ("object" != o(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var i = n.call(e, t || "default");
                if ("object" != o(i)) return i;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == o(i) ? i : String(i)) in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function o(e) {
          return (
            (o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            o(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(24421),
          n(553),
          n(54363),
          n(1164),
          n(38179),
          n(30129),
          n(7089),
          n(82447),
          n(67762),
          n(34820),
          n(57507),
          n(45477),
          n(84735),
          n(27473),
          n(67559),
          n(85541),
          n(84392),
          n(56806),
          n(76474),
          n(54062),
          n(31083),
          n(92695),
          n(42919),
          n(66893),
          n(19824);
        var s = n(1792),
          c = s.copy,
          l = n(25447),
          u = n(91804),
          p = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
        function d(e) {
          return e && "string" == typeof e && e.match(p) ? "date" : o(e);
        }
        var f = function (e) {
            return (
              e.type.value &&
              (!e.extended || e.name.value) &&
              (e.basic || e.operator.value) &&
              (e.basic || e.value.value) &&
              ("date" === d(e.value.value) || !e.enforceDates)
            );
          },
          h = function (e) {
            if (e.value) {
              var t = e.values
                .map(function (e) {
                  return e.key;
                })
                .indexOf(e.value.key);
              e.value = e.values[-1 === t ? 0 : t];
            } else e.value = e.values[0];
          },
          v = !1;
        e.exports = [
          "$timeout",
          "$location",
          "search",
          "widgetLocalConf",
          "$translate",
          function (e, t, n, i, a) {
            return {
              restrict: "A",
              scope: {
                types: "=camWidgetSearchTypes",
                translations: "=camWidgetSearchTranslations",
                operators: "=camWidgetSearchOperators",
                searches: "=?camWidgetSearchSearches",
                validSearches: "=?camWidgetSearchValidSearches",
                storageGroup: "=?camWidgetSearchStorageGroup",
                searchId: "@camWidgetSearchId",
                total: "=?camWidgetSearchTotal",
                matchAny: "=?camWidgetSearchMatchAny",
                disableTypeaheadAutoselect:
                  "=?camWidgetSearchDisableTypeaheadAutoselect",
              },
              link: function (u, p) {
                s.forEach(u.translations, function (e, t) {
                  u.translations[t] = a.instant(e);
                }),
                  u.types.map(function (e) {
                    return (
                      (e.id.value = a.instant(e.id.value)),
                      e.operators &&
                        (e.operators = e.operators.map(function (e) {
                          return (e.value = a.instant(e.value)), e;
                        })),
                      e.options &&
                        "object" === o(e.options[0]) &&
                        ((e.mappedOptions = e.options.map(function (e) {
                          var t = e.key,
                            n = e.value;
                          return { key: t, value: a.instant(n) };
                        })),
                        (e.options = e.mappedOptions.map(function (e) {
                          return e.value;
                        }))),
                      e
                    );
                  }),
                  s.forEach(u.operators, function (e) {
                    s.forEach(e, function (e) {
                      e.value = a.instant(e.value);
                    });
                  }),
                  (u.isMatchAnyActive = void 0 !== u.matchAny),
                  (u.caseHandeling = {}),
                  (u.switchMatchType = function () {
                    u.isMatchAnyActive && (u.matchAny = !u.matchAny);
                  }),
                  (u.focused = !1);
                var m = s.element(p).find("form")[0];
                m.addEventListener(
                  "focus",
                  function () {
                    e(function () {
                      u.focused = !0;
                    });
                  },
                  !0
                ),
                  m.addEventListener(
                    "blur",
                    function () {
                      e(function () {
                        u.focused = !1;
                      });
                    },
                    !0
                  );
                var g,
                  y = function () {
                    return (u.searches || []).some(function (e) {
                      return e.caseOptions;
                    });
                  };
                (u.searchHasVariableQuery = y()),
                  (g = function (e) {
                    if (e) {
                      var t = document.createElement("div");
                      (t.textContent = u.translations.inputPlaceholder + ":"),
                        p[0].insertBefore(t, p[0].firstChild),
                        u.$root.$broadcast("plugin:search:change");
                    } else
                      p[0]
                        .querySelector("input.main-field")
                        .setAttribute(
                          "placeholder",
                          u.translations.inputPlaceholder
                        );
                  }),
                  e(
                    function () {
                      var t = document.createElement("input");
                      t.setAttribute("type", "text"),
                        t.setAttribute("placeholder", "set");
                      var n = !1;
                      t.addEventListener("input", function () {
                        n = !0;
                      }),
                        document.body.appendChild(t),
                        t.focus(),
                        document.body.removeChild(t),
                        e(function () {
                          g(n);
                        });
                    },
                    0,
                    !1
                  ),
                  (u.searchTypes = u.types.map(function (e) {
                    return e.id;
                  })),
                  (u.getRightPadding = function () {
                    return p.width() > 400 ? "125px" : "12px";
                  });
                var b = u.types.reduce(function (e, t) {
                    return e || (t.default ? t : null);
                  }, null),
                  w = function () {
                    var e = u.searches
                      .map(function (e) {
                        return e.type.value.key;
                      })
                      .reduce(function (e, t) {
                        return -1 === e.indexOf(t) && e.push(t), e;
                      }, [])
                      .map(function (e) {
                        return _(e) ? _(e).groups : null;
                      })
                      .filter(function (e) {
                        return !!e;
                      })
                      .reduce(function (e, t) {
                        if (e) {
                          if (0 === e.length) return s.copy(t);
                          for (var n = 0; n < e.length; n++)
                            -1 === t.indexOf(e[n]) && (e.splice(n, 1), n--);
                          return 0 === e.length ? null : e;
                        }
                        return null;
                      }, []);
                    return null === e
                      ? []
                      : 0 === e.length
                      ? u.searchTypes
                      : u.searchTypes.filter(function (t) {
                          var n = _(t.key).groups;
                          if (!n) return !0;
                          for (var i = 0; i < n.length; i++)
                            if (e.indexOf(n[i]) > -1) return !0;
                          return !1;
                        });
                  },
                  _ = function (e) {
                    return u.types.reduce(function (t, n) {
                      return t || (n.id.key === e ? n : null);
                    }, null);
                  },
                  E = function (e, t) {
                    return (
                      e.operators ||
                      u.operators[
                        d(
                          (function (e, t) {
                            return t
                              ? "" + e
                              : isNaN(e) || "" === e.trim()
                              ? "true" === e ||
                                ("false" !== e && ("NULL" === e ? null : e))
                              : +e;
                          })(t, e.enforceString)
                        )
                      ]
                    );
                  },
                  x = function (e) {
                    var t = function (e, t) {
                      var n = null,
                        i = null,
                        r = "In" === t.operator;
                      if (e) {
                        var a = e.filter(function (e) {
                          return r && t.value.includes(e.key);
                        });
                        if (r) {
                          var o = a.map(function (e) {
                            return e.key;
                          });
                          o.length && (n = o),
                            (i = a
                              .map(function (e) {
                                return e.value;
                              })
                              .join(", "));
                        } else {
                          var s = (e || []).find(function (e) {
                            return e.key === t.value;
                          });
                          (n = null == s ? void 0 : s.key),
                            (i = null == s ? void 0 : s.value);
                        }
                      } else r && (i = t.value.join(","));
                      return i || (i = t.value), { key: n, value: i };
                    };
                    return e
                      .map(function (e) {
                        var n = _(e.type);
                        if (n) {
                          var i = {
                            extended: n.extended,
                            basic: n.basic,
                            type: {
                              values: w(),
                              value: w().reduce(function (t, n) {
                                return t || (n.key === e.type ? n : null);
                              }, null),
                              tooltip: u.translations.type,
                            },
                            name: {
                              value: e.name,
                              tooltip: u.translations.name,
                            },
                            options: n.options,
                            operator: { tooltip: u.translations.operator },
                            value: r(
                              r({}, t(n.mappedOptions, e)),
                              {},
                              { tooltip: u.translations.value }
                            ),
                            allowDates: n.allowDates,
                            enforceDates: n.enforceDates,
                            potentialNames: n.potentialNames || [],
                            enforceString: n.enforceString,
                            caseOptions: n.caseOptions,
                          };
                          return (
                            (i.operator.values = E(n, i.value.value)),
                            (i.operator.value = i.operator.values.reduce(
                              function (t, n) {
                                return t || (n.key === e.operator ? n : null);
                              },
                              null
                            )),
                            (i.valid = f(i)),
                            i
                          );
                        }
                        "variableNamesIgnoreCase" === e.type &&
                          (u.caseHandeling.ignoreNames = !0),
                          "variableValuesIgnoreCase" === e.type &&
                            (u.caseHandeling.ignoreValues = !0);
                      })
                      .filter(function (e) {
                        return e;
                      });
                  },
                  S = u.searchId || "search",
                  I = function () {
                    var e = JSON.parse((t.search() || {})[S + "Query"] || "[]");
                    return x(e);
                  };
                (u.searches = u.searches || []),
                  (u.searches = I()),
                  (u.validSearchesBuffer = u.searches.reduce(function (e, t) {
                    return t.valid && e.push(t), e;
                  }, [])),
                  (u.validSearches = s.copy(u.validSearchesBuffer));
                (u.createSearch = function (t) {
                  if (t || u.inputQuery) {
                    var n = t ? "" : u.inputQuery;
                    t = (t && _(t.key)) || b;
                    var i = E(t, n);
                    u.searches.push({
                      extended: t.extended,
                      basic: t.basic,
                      type: {
                        values: w(),
                        value: t.id,
                        tooltip: u.translations.type,
                      },
                      name: {
                        value: "",
                        inEdit: t.extended,
                        tooltip: u.translations.name,
                      },
                      operator: {
                        value: i[0],
                        values: i,
                        tooltip: u.translations.operator,
                      },
                      options: t.options,
                      value: {
                        value: n,
                        inEdit: !t.extended && !n,
                        tooltip: u.translations.value,
                      },
                      allowDates: t.allowDates,
                      enforceDates: t.enforceDates,
                      potentialNames: t.potentialNames,
                      enforceString: t.enforceString,
                      caseOptions: t.caseOptions,
                    });
                    var r = u.searches[u.searches.length - 1];
                    (r.valid = f(r)),
                      n
                        ? (u.inputQuery = "")
                        : e(function () {
                            e(function () {
                              (u.inputQuery = ""),
                                l(
                                  p[0].querySelector(
                                    ".search-container > input"
                                  )
                                ).blur();
                            });
                          });
                  }
                }),
                  (u.deleteSearch = function (t) {
                    u.searches.splice(t, 1),
                      e(function () {
                        l(
                          p[0].querySelector(".search-container > input")
                        ).focus();
                      });
                  });
                var A = function (e, t) {
                  return e
                    .toUpperCase()
                    .split(",")
                    .map(function (e) {
                      return e.trim();
                    })
                    .includes(t.toUpperCase());
                };
                (u.handleChange = function (t, n, i, r, a) {
                  var o,
                    s,
                    c = u.searches[t];
                  "type" === n
                    ? ((s = _(r.key)),
                      (c.extended = s.extended),
                      (c.basic = s.basic),
                      (c.allowDates = s.allowDates),
                      !c.enforceDates && s.enforceDates && (c.value.value = ""),
                      (c.enforceDates = s.enforceDates),
                      (c.operator.values = E(s, c.value.value)),
                      h(c.operator))
                    : "value" === n &&
                      (t === u.searches.length - 1 &&
                        e(function () {
                          l(
                            p[0].querySelector(".search-container > input")
                          ).focus();
                        }),
                      (s = _(c.type.value.key)).operators ||
                        ((c.operator.values = E(s, c.value.value)),
                        h(c.operator))),
                    (c.valid = f(c)),
                    a &&
                      13 === a.keyCode &&
                      (function (e, t) {
                        var n = u.searches[e];
                        if (!n.valid) {
                          if (n.extended && !n.name.value && "name" !== t)
                            return void (n.name.inEdit = !0);
                          if ("value" !== t) return void (n.value.inEdit = !0);
                        }
                        for (var i = 1; i < u.searches.length; i++) {
                          var r = (i + e) % u.searches.length;
                          if (!(n = u.searches[r]).valid)
                            return void (n.extended && !n.name.value
                              ? (n.name.inEdit = !0)
                              : (n.value.inEdit = !0));
                        }
                      })(t, n);
                  var d =
                    null ===
                      (o = u.types.find(function (e) {
                        return e.id.key === c.type.value.key;
                      })) || void 0 === o
                      ? void 0
                      : o.mappedOptions;
                  if (d)
                    if ("In" === c.operator.value.key) {
                      var v = d
                        .filter(function (e) {
                          return A(c.value.value, e.value);
                        })
                        .map(function (e) {
                          return e.key;
                        });
                      c.value.key = v.length ? v : void 0;
                    } else {
                      var m;
                      c.value.key =
                        null ===
                          (m = d.find(function (e) {
                            return c.value.value === e.value;
                          })) || void 0 === m
                          ? void 0
                          : m.key;
                    }
                  else
                    "In" === c.operator.value.key
                      ? (c.value.key = c.value.value
                          .split(",")
                          .map(function (e) {
                            return e.trim();
                          }))
                      : (c.value.key = c.value.value);
                }),
                  (u.onKeydown = function (t) {
                    -1 !== [38, 40, 13].indexOf(t.keyCode) &&
                      0 ===
                        l(
                          p[0].querySelectorAll(
                            '.dropdown-menu[id^="typeahead"]'
                          )
                        ).length &&
                      e(function () {
                        s.element(t.target).triggerHandler("input");
                      });
                  });
                var C,
                  k = function (e) {
                    var t = function (e) {
                        var t,
                          n =
                            null ===
                              (t = u.types.find(function (t) {
                                return t.id.key === e.type.value.key;
                              })) || void 0 === t
                              ? void 0
                              : t.mappedOptions,
                          i = null;
                        if (n)
                          if ("In" === e.operator.value.key) {
                            var r = n
                              .filter(function (t) {
                                return A(e.value.value, t.value);
                              })
                              .map(function (e) {
                                return e.key;
                              });
                            r.length && (i = r);
                          } else {
                            var a;
                            i =
                              null ===
                                (a = n.find(function (t) {
                                  return e.value.value === t.value;
                                })) || void 0 === a
                                ? void 0
                                : a.key;
                          }
                        else
                          "In" === e.operator.value.key &&
                            (i = e.value.value.split(",").map(function (e) {
                              return e.trim();
                            }));
                        return i || (i = e.value.value), i;
                      },
                      n = [];
                    return (
                      s.forEach(e, function (e) {
                        n.push({
                          type: e.type.value.key,
                          operator: e.operator.value.key,
                          value: t(e),
                          name: e.name.value,
                        });
                      }),
                      n
                    );
                  },
                  T = {
                    basic: !0,
                    type: { values: w(), value: {}, tooltip: "" },
                    name: { value: "", inEdit: "", tooltip: "" },
                    operator: {
                      value: { key: "eq", value: "=" },
                      values: [],
                      tooltip: u.translations.operator,
                    },
                    value: {
                      value: "",
                      inEdit: !1,
                      tooltip: u.translations.value,
                    },
                    valid: !1,
                  },
                  L = function () {
                    var i = u.searches;
                    if (
                      (s.forEach(i, function (e) {
                        e.valid &&
                          -1 === u.validSearchesBuffer.indexOf(e) &&
                          u.validSearchesBuffer.push(e);
                      }),
                      (u.validSearchesBuffer = u.validSearchesBuffer.filter(
                        function (e) {
                          return e.valid && -1 !== i.indexOf(e);
                        }
                      )),
                      u.searchHasVariableQuery)
                    ) {
                      if (u.caseHandeling.ignoreNames) {
                        var r = s.copy(T);
                        (r.type.value.key = "variableNamesIgnoreCase"),
                          u.validSearchesBuffer.push(r);
                      }
                      if (u.caseHandeling.ignoreValues) {
                        var a = s.copy(T);
                        (a.type.value.key = "variableValuesIgnoreCase"),
                          u.validSearchesBuffer.push(a);
                      }
                    }
                    var o,
                      c = {};
                    ((c[S + "Query"] = JSON.stringify(
                      k(u.validSearchesBuffer)
                    )),
                    u.isMatchAnyActive) &&
                      (u.matchAny && !t.search().hasOwnProperty(S + "OrQuery")
                        ? (o = t.url() + "&" + S + "OrQuery")
                        : u.matchAny ||
                          (o = t.url().replace("&" + S + "OrQuery", "")),
                      t.url(o),
                      t.replace());
                    (u.searchHasVariableQuery = y()),
                      (v = !0),
                      n.updateSilently(c, !t.search()[S + "Query"]),
                      e(function () {
                        v = !1;
                      }),
                      O();
                  };
                u.$watch("[searches, matchAny, caseHandeling]", L, !0),
                  u.$on("$locationChangeSuccess", function () {
                    if (
                      ((u.matchAny = t.search().hasOwnProperty(S + "OrQuery")),
                      !v && t.search().hasOwnProperty(S + "Query"))
                    ) {
                      var e = I(),
                        n = u.validSearchesBuffer.filter(function (e) {
                          return e.valid;
                        });
                      s.equals(e, n) ||
                        (s.forEach(u.searches, function (t) {
                          t.valid || e.push(t);
                        }),
                        (u.validSearchesBuffer = []),
                        (u.searches = e));
                    }
                  }),
                  u.$watch(
                    "validSearchesBuffer",
                    function () {
                      e.cancel(C),
                        (C = e(function () {
                          u.validSearches = s.copy(u.validSearchesBuffer);
                        }));
                    },
                    !0
                  );
                var O = function () {
                  var e = w();
                  u.dropdownTypes = e;
                  for (var t = 0; t < u.searches.length; t++)
                    u.searches[t].type.values = e;
                };
                u.$watch(
                  "types",
                  function () {
                    (u.searchTypes = u.types.map(function (e) {
                      return e.id;
                    })),
                      (u.dropdownTypes = w()),
                      s.forEach(u.searches, function (e) {
                        e.potentialNames = _(e.type.value.key)
                          ? _(e.type.value.key).potentialNames || []
                          : null;
                      });
                  },
                  !0
                ),
                  (u.dropdownTypes = w());
                for (
                  var N = (u.searchCriteriaStorage = {
                      group: null,
                      nameInput: "",
                      available: {},
                    }),
                    D = {},
                    P = u.storageGroup
                      ? [u.storageGroup]
                      : u.types
                          .map(function (e) {
                            return e.groups;
                          })
                          .reduce(function (e, t) {
                            return (e || []).concat(t);
                          })
                          .filter(function (e) {
                            return e;
                          }),
                    $ = [],
                    V = 0;
                  V < P.length;
                  V++
                )
                  $.indexOf(P[V]) < 0 && P[V] && $.push(P[V]);
                function j() {
                  if (((N.available = {}), N.group))
                    return (
                      (u.isSearchCriteriaStorageGrouped = !1),
                      void (N.available = c(D[N.group]))
                    );
                  (u.isSearchCriteriaStorageGrouped = !0),
                    $.forEach(function (e) {
                      N.available[e] = c(D[e] || {});
                    });
                }
                function M(e, t) {
                  return t
                    ? { group: t, name: e }
                    : N.group
                    ? { group: N.group, name: e }
                    : void 0;
                }
                !$.length && u.storageGroup && $.push(u.storageGroup),
                  $.forEach(function (e) {
                    D[e] = {};
                  }),
                  u.$watch(
                    "validSearches",
                    function () {
                      if (u.storageGroup)
                        return (N.group = u.storageGroup), void j();
                      var e = null;
                      u.validSearches.forEach(function (t) {
                        if (!e) {
                          var n = t.type.value.key;
                          u.types.forEach(function (t) {
                            e ||
                              (t.id.key === n &&
                                1 === (t.groups || []).length &&
                                (e = (t.groups || [])[0]));
                          });
                        }
                      }),
                        (N.group = e),
                        j();
                    },
                    !0
                  ),
                  (D = i.get("searchCriteria", D)),
                  j(),
                  u.$watch("storageGroup", function () {
                    (u.storageGroup && $.indexOf(u.storageGroup) < 0) ||
                      ((N.group = u.storageGroup), j());
                  }),
                  (u.storedCriteriaInputClick = function (e) {
                    e.stopPropagation();
                  }),
                  (u.searchCriteriaInputKeydown = function (e) {
                    if (13 === e.keyCode) return u.storedCriteriaSaveClick(e);
                  }),
                  (u.hasCriteriaSets = function () {
                    if ($.length > 1) {
                      for (var e in N.available)
                        if (Object.keys(N.available[e]).length > 0) return !0;
                      return !1;
                    }
                    return !!Object.keys(N.available || {}).length;
                  }),
                  (u.loadCriteriaSet = function (e, t, n) {
                    u.caseHandeling = { ignoreNames: !1, ignoreValues: !1 };
                    var i = M(t, n);
                    if (i) {
                      var r = D[i.group][i.name];
                      (u.searches = x(r)),
                        u.isMatchAnyActive &&
                          (u.matchAny = r[r.length - 1].matchAny),
                        L();
                    }
                  }),
                  (u.dropCriteriaSet = function (e, t, n) {
                    e.stopPropagation();
                    var r = M(t, n);
                    r &&
                      (delete D[r.group][r.name],
                      i.set("searchCriteria", D),
                      j());
                  }),
                  (u.storedCriteriaSaveClick = function (e) {
                    e.stopPropagation();
                    var t = N.nameInput;
                    t &&
                      ((D[N.group] = D[N.group] || {}),
                      (D[N.group][t] = k(u.validSearchesBuffer)),
                      u.isMatchAnyActive &&
                        D[N.group][t].push({ matchAny: u.matchAny }),
                      D[N.group][t].push({
                        caseHandeling: s.copy(u.caseHandeling),
                      }),
                      i.set("searchCriteria", D),
                      j(),
                      (N.nameInput = ""));
                  });
              },
              template: u,
            };
          },
        ];
      },
      170: function (e, t, n) {
        "use strict";
        n(34820), n(76474);
        var i = n(24864);
        e.exports = [
          "$location",
          function (e) {
            return {
              template: i,
              scope: {
                selectedInstancesCount: "@",
                totalInstancesCount: "@",
                toggleState: "@",
                pageSize: "@",
              },
              link: function (t) {
                (t.selectionType = "INSTANCE"),
                  (t.isBatchOperationPage = e
                    .path()
                    .includes("batch/operation"));
                var n = (t.updateSelectionType = function () {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : t.selectionType;
                  e !== t.selectionType && (t.selectionType = e),
                    t.$emit("selection.type.updated", e);
                });
                t.$watch("selectionType", n);
              },
            };
          },
        ];
      },
      70449: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(57507),
          n(84392),
          n(30129),
          n(19824),
          n(72595),
          n(67559);
        var r = n(1792),
          a = n(59084),
          o = n(3907),
          s = n(57848),
          c = {};
        function l(e) {
          return (e = e || new Date()).toISOString().slice(0, -5);
        }
        (c.camundaFormattedDate = l),
          (c.templateDialog = o),
          (c.templateStringDialog = s),
          (c.modalCtrl = [
            "$scope",
            "variable",
            "readonly",
            function (e, t, n) {
              (e.hovered = !1),
                (e.toggleHover = function (t) {
                  e.hovered = t;
                }),
                (e.variable = t),
                (e.readonly = n);
              var i = r.copy(t);
              e.hasChanged = function () {
                return (
                  (i.valueInfo = i.valueInfo || {}),
                  (t.valueInfo = t.valueInfo || {}),
                  i.value !== t.value ||
                    i.valueInfo.serializationDataFormat !==
                      t.valueInfo.serializationDataFormat ||
                    i.valueInfo.objectTypeName !== t.valueInfo.objectTypeName
                );
              };
            },
          ]),
          (c.typeUtils = a),
          (c.types = [
            "Boolean",
            "Bytes",
            "File",
            "Date",
            "Double",
            "Integer",
            "Long",
            "Null",
            "Object",
            "Short",
            "String",
            "Json",
            "Xml",
          ]),
          (c.defaultValues = {
            Boolean: !1,
            Bytes: null,
            File: null,
            Date: l(),
            Double: 0,
            Integer: 0,
            Long: 0,
            Null: "",
            Short: 0,
            String: "",
            Object: {},
            Json: "",
            Xml: "",
          }),
          (c.isPrimitive = function (e) {
            return function (t) {
              return (
                (!t && !e.variable) ||
                !(t = t || e.variable.type) ||
                [
                  "Boolean",
                  "Date",
                  "Double",
                  "Integer",
                  "Long",
                  "Short",
                  "String",
                ].indexOf(t) >= 0
              );
            };
          }),
          (c.isBinary = function (e) {
            return function (t) {
              return (
                !(!t && !e.variable) &&
                !!(t = t || e.variable.type) &&
                ["Bytes", "File"].indexOf(t) >= 0
              );
            };
          }),
          (c.useCheckbox = function (e) {
            return function (t) {
              return (
                !(!t && !e.variable) && "Boolean" === (t = t || e.variable.type)
              );
            };
          }),
          (c.validate = function (e) {
            return function () {
              var t;
              (e.variable.name && e.variable.type
                ? null === e.variable.value ||
                  ["String", "Object", "Null"].indexOf(e.variable.type) > -1
                  ? (e.valid = !0)
                  : (e.valid = a.isType(e.variable.value, e.variable.type))
                : (e.valid = !1),
              e.valid) &&
                e.variable.type &&
                null !== e.variable.value &&
                e.isPrimitive(e.variable.type) &&
                ((t =
                  "Boolean" !== e.variable.type
                    ? a.convertToType(e.variable.value, e.variable.type)
                    : !!e.variable.value && "false" !== e.variable.value),
                i(e.variable.value) !== i(t) && (e.variable.value = t));
            };
          }),
          (e.exports = c);
      },
      20386: function (e, t, n) {
        "use strict";
        var i = n(59084);
        e.exports = [
          function () {
            return {
              require: "ngModel",
              link: function (e, t, n, r) {
                var a = function (e) {
                  var t = n.camVariableValidator;
                  return (
                    -1 !== ["String", "Object", "Null"].indexOf(t)
                      ? r.$setValidity("camVariableValidator", !0)
                      : r.$setValidity(
                          "camVariableValidator",
                          !!i.isType(e, t)
                        ),
                    e
                  );
                };
                r.$parsers.unshift(a),
                  r.$formatters.push(a),
                  n.$observe("camVariableValidator", function () {
                    return a(r.$viewValue);
                  });
              },
            };
          },
        ];
      },
      38862: function (e, t, n) {
        "use strict";
        n(82447), n(45477), n(84735), n(84392);
        var i = n(1792),
          r = n(70449),
          a = n(91740),
          o = r.types,
          s = r.modalCtrl;
        e.exports = [
          "$uibModal",
          function (e) {
            return {
              template: a,
              scope: {
                variable: "=camVariable",
                display: "@?",
                shown: "=?",
                disabled: "=?",
                hiddenTypes: "=?",
              },
              link: function (t, n) {
                t.variableTypes = o.filter(function (e) {
                  return (
                    !Array.isArray(t.hiddenTypes) ||
                    !t.hiddenTypes.length ||
                    -1 === t.hiddenTypes.indexOf(e)
                  );
                });
                var a = r.defaultValues;
                (t.isPrimitive = r.isPrimitive(t)),
                  (t.useCheckbox = r.useCheckbox(t)),
                  (t.isShown = function (e) {
                    return (
                      !Array.isArray(t.shown) ||
                      !t.shown.length ||
                      t.shown.indexOf(e) > -1
                    );
                  }),
                  (t.isDisabled = function (e) {
                    return (
                      !(!Array.isArray(t.disabled) || !t.disabled.length) &&
                      t.disabled.indexOf(e) > -1
                    );
                  }),
                  (t.shownClasses = function () {
                    return Array.isArray(t.shown) && t.shown.length
                      ? t.shown
                          .map(function (e) {
                            return "show-" + e;
                          })
                          .join(" ")
                      : "";
                  }),
                  t.$watch("shown", function () {
                    n.removeClass("show-type show-name show-value").addClass(
                      t.shownClasses()
                    );
                  });
                var c = r.validate(t);
                (t.valid = !0),
                  t.$watch("variable.value", c),
                  t.$watch("variable.name", c),
                  t.$watch("variable.type", c),
                  c();
                var l = t.variable.value;
                t.$watch("variable.type", function (e, i) {
                  "Boolean" === e
                    ? null !== t.variable.value &&
                      ((l = t.variable.value),
                      (t.variable.value =
                        "false" !== t.variable.value && !!t.variable.value))
                    : "Boolean" === i && (t.variable.value = l);
                  var r = n[0].classList;
                  i && r.remove("var-type-" + i.toLowerCase()),
                    e && r.add("var-type-" + e.toLowerCase());
                }),
                  (t.isNull = function () {
                    return null === t.variable.value;
                  }),
                  (t.setNonNull = function () {
                    t.variable.value = l || a[t.variable.type];
                  }),
                  (t.setNull = function () {
                    (l = t.variable.value), (t.variable.value = null);
                  }),
                  (t.editVariableValue = function () {
                    e.open({
                      template: r.templateDialog,
                      controller: s,
                      windowClass: "cam-widget-variable-dialog",
                      resolve: {
                        variable: function () {
                          return i.copy(t.variable);
                        },
                        readonly: function () {
                          return t.display;
                        },
                      },
                    })
                      .result.then(function (e) {
                        (t.variable.value = e.value),
                          (t.variable.valueInfo = e.valueInfo);
                      })
                      .catch(i.noop);
                  });
              },
            };
          },
        ];
      },
      71746: function (e, t, n) {
        "use strict";
        var i = n(25447);
        e.exports = [
          "$compile",
          function (e) {
            return {
              template: "<div></div>",
              scope: { info: "=", headerName: "=" },
              link: function (t, n) {
                var r = t.info.additions[t.headerName] || {};
                for (var a in ((r.scopeVariables = r.scopeVariables || {}),
                r.scopeVariables))
                  t[a] = r.scopeVariables[a];
                (t.variable = t.info.variable),
                  n.html("<div>" + r.html + "</div>"),
                  e(i("div", n)[0])(t);
              },
            };
          },
        ];
      },
      65214: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(57507),
          n(30129),
          n(19824),
          n(82447),
          n(34820),
          n(27473),
          n(67559),
          n(85541),
          n(84392),
          n(76474),
          n(66893);
        var r = n(1792),
          a = n(70449),
          o = n(93136),
          s = n(64529),
          c = a.typeUtils,
          l = {
            variable: { name: null, type: null, value: null, valueInfo: {} },
            additions: {},
          };
        function u(e) {
          return {
            then: function (t) {
              t(r.copy(e.variable));
            },
          };
        }
        e.exports = [
          "$uibModal",
          "$translate",
          "$document",
          function (e, t, n) {
            return {
              template: o,
              scope: {
                variables: "=?camVariables",
                headers: "=?camHeaders",
                editable: "=?camEditable",
                validatable: "@",
                isVariableEditable: "=?",
                deleteVar: "=?onDelete",
                saveVar: "=?onSave",
                onSaved: "=?",
                editVar: "=?onEdit",
                downloadVar: "=?onDownload",
                uploadVar: "=?onUpload",
                onSortChange: "&",
                onValidation: "&",
                onChangeStart: "&",
                onChangeEnd: "&",
                onToggleEditMode: "=?",
                defaultSort: "=?",
                ignoreTypes: "=?",
              },
              link: function (o) {
                if (
                  ((o.asString = function (e) {
                    return e + "";
                  }),
                  o.validatable)
                ) {
                  var p = function (e) {
                    var t = r.element(".modal"),
                      n = r.element(".modal-backdrop");
                    ((0 === t.length && 0 === n.length) ||
                      (t !== e.target &&
                        n !== e.target &&
                        !t[0].contains(e.target) &&
                        !n[0].contains(e.target))) &&
                      o.$apply(function () {
                        o.variables.forEach(function (e) {
                          return (e.showFailures = !1);
                        });
                      });
                  };
                  n.on("click", p),
                    o.$on("$destroy", function () {
                      return n.off("click", p);
                    });
                }
                var d = [];
                function f(e) {
                  return (o.variables[e] || {}).variable;
                }
                (o.headerClasses = []),
                  o.headers.forEach(function (e) {
                    o.headerClasses.push(e.class);
                  }),
                  (o.editable = o.editable || o.headerClasses),
                  (o.variableTypes = r.copy(a.types)),
                  (o.variableTypes = o.ignoreTypes
                    ? o.variableTypes.filter(function (e) {
                        return !o.ignoreTypes.includes(e);
                      })
                    : o.variableTypes),
                  (o.defaultValues = a.defaultValues),
                  (o.isPrimitive = a.isPrimitive(o)),
                  (o.isBinary = a.isBinary(o)),
                  (o.useCheckbox = a.useCheckbox(o)),
                  ["uploadVar", "deleteVar", "saveVar"].forEach(function (e) {
                    o[e] = r.isFunction(o[e]) ? o[e] : u;
                  }),
                  (o.sortObj = o.defaultSort),
                  (o.orderClass = function (e) {
                    return (
                      "glyphicon-" +
                      {
                        none: "minus",
                        desc: "chevron-down",
                        asc: "chevron-up",
                      }[
                        (e = e || o.sortObj.sortBy) === o.sortObj.sortBy
                          ? o.sortObj.sortOrder
                          : "none"
                      ]
                    );
                  }),
                  (o.changeOrder = function (e) {
                    (o.sortObj.sortBy = e),
                      (o.sortObj.sortOrder =
                        "desc" === o.sortObj.sortOrder ? "asc" : "desc"),
                      o.onSortChange({ sortObj: o.sortObj });
                  });
                var h = function (e, t, n) {
                  return {
                    template: t,
                    controller: a.modalCtrl,
                    windowClass: "cam-widget-variable-dialog",
                    resolve: {
                      variable: function () {
                        return r.copy(f(e));
                      },
                      readonly: n,
                    },
                  };
                };
                function v(e, t) {
                  var n;
                  (e.variable.name && e.variable.type
                    ? null === e.variable.value ||
                      ["String", "Object", "Null"].indexOf(e.variable.type) > -1
                      ? (e.valid = !0)
                      : (e.valid = c.isType(e.variable.value, e.variable.type))
                    : (e.valid = !1),
                  e.valid) &&
                    e.variable.type &&
                    null !== e.variable.value &&
                    o.isPrimitive(e.variable.type) &&
                    ((n =
                      "Boolean" !== e.variable.type
                        ? c.convertToType(e.variable.value, e.variable.type)
                        : !!e.variable.value && "false" !== e.variable.value),
                    i(e.variable.value) !== i(n) && (e.variable.value = n));
                  e.changed = (function (e) {
                    if (
                      !o.variables ||
                      !o.variables[e] ||
                      !o.variables[e]._copy
                    )
                      return !1;
                    var t = f(e),
                      n = o.variables[e]._copy;
                    return (
                      !t ||
                      !n ||
                      t.name !== n.name ||
                      t.type !== n.type ||
                      t.value !== n.value
                    );
                  })(t);
                }
                function m() {
                  (o.variables || []).forEach(function (e, t) {
                    e.valid = !0;
                    var n = "variables[" + t + "].variable";
                    function i() {
                      v(e, t);
                    }
                    o.$watch(n + ".value", i),
                      o.$watch(n + ".name", i),
                      o.$watch(n + ".type", i),
                      o.$watch(
                        "variables[" + t + "].editMode",
                        function (t, n) {
                          var i;
                          r.isUndefined(t) ||
                            (!0 === t
                              ? (e._copy =
                                  ((i = e.variable),
                                  JSON.parse(JSON.stringify(i))))
                              : !1 === t &&
                                !0 === n &&
                                e._copy &&
                                ((e.variable.type = e._copy.type),
                                (e.variable.name = e._copy.name),
                                (e.variable.value = e._copy.value),
                                delete e._copy));
                        }
                      ),
                      v(e, t),
                      (d[t] = e.variable.value);
                  });
                }
                (o.editVar = r.isFunction(o.editVar)
                  ? o.editVar
                  : function (t, n) {
                      var i = e.open(
                        h(n, a.templateDialog, function () {
                          return !o.isEditable("value", o.variables[n]);
                        })
                      ).result;
                      return (
                        i
                          .then(function () {
                            return (t.changed = !0);
                          })
                          .catch(r.noop),
                        i
                      );
                    }),
                  (o.readStringVar = r.isFunction(o.readStringVar)
                    ? o.readStringVar
                    : function (t) {
                        return e.open(
                          h(t, a.templateStringDialog, function () {
                            return !0;
                          })
                        ).result;
                      }),
                  (o.downloadLink = r.isFunction(o.downloadVar)
                    ? o.downloadVar
                    : function (e) {
                        return (
                          "/camunda/api/engine/engine/default/variable-instance/" +
                          e.variable.id +
                          "/data"
                        );
                      }),
                  o.$watch("variables", m),
                  o.$on("variable.added", function () {
                    return m();
                  }),
                  m(),
                  (o.canEditVariable = r.isFunction(o.isVariableEditable)
                    ? o.isVariableEditable
                    : function () {
                        return !0;
                      }),
                  (o.isEditable = function (e, t) {
                    return t.editMode && o.editable.indexOf(e) > -1;
                  }),
                  (o.hasEditDialog = function (e) {
                    return (
                      e &&
                      ["object", "string", "json", "xml"].indexOf(
                        e.toLowerCase()
                      ) > -1
                    );
                  }),
                  (o.rowClasses = function (e) {
                    return [
                      e.editMode ? "editing" : null,
                      e.valid ? null : "ng-invalid",
                      e.valid ? null : "ng-invalid-cam-variable-validator",
                    ];
                  }),
                  (o.colClasses = function (e, t) {
                    return [
                      o.isEditable(t, e) ? "editable" : null,
                      "type-" + (e.variable.type || "").toLowerCase(),
                      "col-" + t,
                    ];
                  }),
                  (o.isNull = function (e) {
                    return null === o.variables[e].variable.value;
                  }),
                  (o.setNull = function (e) {
                    var t = f(e);
                    (d[e] = t.value), (t.value = null);
                  }),
                  (o.setNonNull = function (e) {
                    var t = f(e);
                    t.value = d[e] || o.defaultValues[t.type];
                  }),
                  (o.editVariableValue = function (e) {
                    var t = o.variables[e];
                    o.editVar(t, e)
                      .then(function (t) {
                        (f(e).value = t.value), (f(e).valueInfo = t.valueInfo);
                      })
                      .catch(r.noop);
                  }),
                  (o.addVariable = function () {
                    o.variables.push(r.copy(l));
                  }),
                  (o.deleteVariable = function (n) {
                    var i = o.variables[n];
                    e.open({
                      controller: [
                        "$scope",
                        function (e) {
                          (e.body = t.instant(
                            "CAM_WIDGET_VARIABLES_TABLE_DIALOGUE",
                            { name: i.variable.name }
                          )),
                            (e.submit = function () {
                              e.$close(), g(n);
                            }),
                            (e.dismiss = function () {
                              e.$close();
                            });
                        },
                      ],
                      template: s,
                    }).result.catch(r.noop);
                  });
                var g = function (e) {
                  var t = o.variables[e];
                  o.deleteVar(t, e).then(
                    function () {
                      o.variables.splice(o.variables.indexOf(t), 1);
                    },
                    function () {}
                  );
                };
                (o.saveVariable = function (e) {
                  var t = o.variables[e];
                  o.enableEditMode(t, !1),
                    o.saveVar(t, e).then(
                      function (n) {
                        t.variable.name = n.name;
                        var i = (t.variable.type = n.type);
                        (t.variable.value = n.value),
                          delete t._copy,
                          "Object" !== i
                            ? delete t.variable.valueInfo
                            : (t.variable.valueInfo = n.valueInfo),
                          o.onSaved && o.onSaved(e, t);
                      },
                      function () {
                        o.enableEditMode(t, !0);
                      }
                    );
                }),
                  (o.uploadVariable = function (e) {
                    var t = o.variables[e];
                    o.uploadVar(t, e).then(
                      function () {
                        delete t._copy, o.enableEditMode(t, !1);
                      },
                      function () {
                        o.enableEditMode(t, !1);
                      }
                    );
                  }),
                  (o.enableEditMode = function (e, t) {
                    if (
                      (o.onToggleEditMode && o.onToggleEditMode(e, t),
                      (e.editMode = t),
                      t)
                    ) {
                      var n = 0;
                      o.variables.forEach(function (e) {
                        e.editMode && n++;
                      }),
                        1 === n && o.onChangeStart();
                    } else {
                      var i = 0;
                      o.variables.forEach(function (e) {
                        e.editMode || i++;
                      }),
                        i === o.variables.length && o.onChangeEnd();
                    }
                  });
              },
            };
          },
        ];
      },
      43909: function (e, t, n) {
        "use strict";
        e.exports = n(1792);
      },
      19214: function (e, t, n) {
        "use strict";
        e.exports = n(30430);
      },
      40271: function (e, t, n) {
        "use strict";
        e.exports = n(92620);
      },
      66372: function (e, t, n) {
        "use strict";
        var i = n(76624);
        e.exports = function () {
          return {
            restrict: "A",
            template: i,
            controller: "CamPaginationController as Pagination",
            scope: { total: "=", onPaginationChange: "&camPagination" },
          };
        };
      },
      28232: function (e, t, n) {
        "use strict";
        var i = n(70390);
        e.exports = function () {
          return {
            restrict: "A",
            transclude: !0,
            template: i,
            controller:
              "CamPaginationSearchIntegrationController as Searchable",
            scope: {
              config: "=",
              loadingState: "=",
              loadingError: "@",
              arrayTypes: "=?",
              variableTypes: "=?",
              buildCustomQuery: "&",
              onSearchChange: "&",
              textEmpty: "@",
              storageGroup: "=",
              searchId: "@?",
              blocked: "=",
            },
          };
        };
      },
      32640: function (e, t, n) {
        "use strict";
        var i = n(96468);
        e.exports = function () {
          return {
            restrict: "A",
            template: i,
            controller: "CamTabsController as Tabs",
            scope: {
              providerParams: "=camTabs",
              tabsApi: "=?",
              vars: "=?",
              varsValues: "=?",
            },
          };
        };
      },
      78693: function (e, t, n) {
        "use strict";
        var i = n(70367);
        e.exports = function () {
          return {
            restrict: "A",
            template: i,
            scope: { providers: "=camToolbar", vars: "=?" },
          };
        };
      },
      71679: function (e, t, n) {
        "use strict";
        n(84735), n(67559), n(56806), n(92695);
        var i = n(43909);
        function r(e, t, n, r, a) {
          var o = this;
          (this.searchId = e.searchId || "search"),
            (this.paginationId = e.paginationId || "page"),
            (this.searchWidgetUtils = n),
            (this.search = r),
            (this.lastSearchQueryString = null),
            (this.locationChange = !0),
            e.$on("$destroy", function () {
              (e.config.searches = null), r(o.paginationId, null);
            }),
            a(e, this, [
              "config",
              "arrayTypes",
              "variableTypes",
              "onSearchChange",
              "buildCustomQuery",
              "loadingError",
              "loadingState",
              "textEmpty",
              "storageGroup",
              "blocked",
            ]),
            (this.arrayTypes = i.isArray(this.arrayTypes)
              ? this.arrayTypes
              : []),
            (this.variableTypes = i.isArray(this.variableTypes)
              ? this.variableTypes
              : []),
            (this.pages = {
              size: 50,
              total: 0,
              current: this.getCurrentPageFromSearch(),
            });
          var s = function () {
            return this.pages.current;
          }.bind(this);
          e.$watch(s, this.onPageChange.bind(this)),
            e.$on("$locationChangeSuccess", this.onLocationChange.bind(this)),
            e.$watch("config.searches", this.updateQuery.bind(this), !0),
            e.$watch("blocked", this.onBlockedChange.bind(this));
          var c = t.$on(
            "cam-common:cam-searchable:query-force-change",
            this.onForcedRefresh.bind(this)
          );
          e.$on("$destroy", function () {
            c();
          });
        }
        function a(e) {
          return (
            e &&
            e.map(function (e) {
              return (function (e) {
                var t = e.value && e.value.value,
                  n = e.type && e.type.value.value,
                  i = e.operator && e.operator.value.key,
                  r = e.name && e.name.value;
                return { value: t, type: n, operator: i, name: r };
              })(e);
            })
          );
        }
        (e.exports = [
          "$scope",
          "$rootScope",
          "searchWidgetUtils",
          "search",
          "exposeScopeProperties",
          r,
        ]),
          (r.prototype.onForcedRefresh = function () {
            this.resetPage(), this.executeQueries();
          }),
          (r.prototype.onBlockedChange = function (e, t) {
            !e && t && this.query && this.executeQueries();
          }),
          (r.prototype.getSearchQueryString = function () {
            return this.search()[this.searchId + "Query"];
          }),
          (r.prototype.hasSearchQueryStringChanged = function () {
            var e = this.getSearchQueryString();
            return (
              e !== this.lastSearchQueryString &&
              (this.lastSearchQueryString || "[]" !== e)
            );
          }),
          (r.prototype.onPageChange = function (e, t) {
            var n = this.getCurrentPageFromSearch();
            e != t &&
              e !== n &&
              (this.search(this.paginationId, e && 1 != e ? e : null),
              this.hasSearchQueryStringChanged() || this.executeQueries());
          }),
          (r.prototype.onLocationChange = function () {
            var e = this.getCurrentPageFromSearch();
            +this.pages.current != +e &&
              ((this.pages.current = e),
              this.hasSearchQueryStringChanged()
                ? (this.locationChange = !0)
                : this.executeQueries());
          }),
          (r.prototype.getCurrentPageFromSearch = function () {
            return +this.search()[this.paginationId] || 1;
          }),
          (r.prototype.updateQuery = function (e, t) {
            this.areSearchesDifferent(e, t) &&
              ((this.query =
                (this.buildCustomQuery && this.buildCustomQuery(e)) ||
                this.createQuery(e)),
              this.locationChange || this.resetPage(),
              (this.lastSearchQueryString = this.getSearchQueryString()),
              this.executeQueries());
          }),
          (r.prototype.resetPage = function () {
            var e = this.search();
            (this.pages.current = 1),
              (e[this.paginationId] = 1),
              this.search.updateSilently(e, !0);
          }),
          (r.prototype.executeQueries = function () {
            this.query &&
              !this.blocked &&
              ((this.locationChange = !1),
              this.onSearchChange({
                query: i.copy(this.query),
                pages: i.copy(this.pages),
              }).then(
                function (e) {
                  this.pages.total = e;
                }.bind(this)
              ));
          }),
          (r.prototype.createQuery = function (e) {
            return this.searchWidgetUtils.createSearchQueryForSearchWidget(
              e,
              this.arrayTypes,
              this.variableTypes
            );
          }),
          (r.prototype.areSearchesDifferent = function (e, t) {
            var n = a(e),
              r = a(t);
            return !i.equals(n, r);
          });
      },
      49783: function (e) {
        "use strict";
        e.exports = [
          "$scope",
          "search",
          "paginationUtils",
          "exposeScopeProperties",
          function (e, t, n, i) {
            n.initializePaginationInController(e, t, function () {
              e.onPaginationChange({ pages: e.pages });
            }),
              i(e, this, ["total", "pages"]),
              e.onPaginationChange({ pages: e.pages });
          },
        ];
      },
      71995: function (e, t, n) {
        "use strict";
        n(82447), n(30225), n(84392), n(56806), n(92695);
        var i = n(43909);
        function r(e, t, n) {
          (this.providers = this.getProviders(n, e)),
            (this.selected = this.providers[0]),
            (this.search = t),
            this.initializeVars(e),
            e.$on("$locationChangeSuccess", this.onLocationChange.bind(this)),
            this.onLocationChange();
        }
        function a(e, t) {
          return (t.priority || 0) - (e.priority || 0);
        }
        (e.exports = ["$scope", "search", "Views", r]),
          (r.prototype.initializeVars = function (e) {
            (this.vars = e.vars || { read: ["tabsApi"] }),
              e.varsValues && i.extend(e, e.varsValues);
          }),
          (r.prototype.getProviders = function (e, t) {
            return e.getProviders(t.providerParams).sort(a);
          }),
          (r.prototype.onLocationChange = function () {
            var e = this.search();
            this.isTabSelectionChangedInUrl(e)
              ? (this.selected = this.providers.filter(function (t) {
                  return t.id === e.tab;
                })[0])
              : e.tab || (this.selected = this.providers[0]);
          }),
          (r.prototype.isTabSelectionChangedInUrl = function (e) {
            return (
              i.isString(e.tab) &&
              (!this.selected || e.tab !== this.selected.id)
            );
          }),
          (r.prototype.selectTab = function (e) {
            var t = this.search(),
              n = { tab: e.id };
            (this.selected = e), this.search.updateSilently(i.extend(t, n));
          }),
          (r.prototype.isSelected = function (e) {
            return this.selected === e;
          });
      },
      24621: function (e, t, n) {
        "use strict";
        function i() {
          (this._hovered = null), (this._listeners = []);
        }
        n(82447),
          n(84392),
          n(66893),
          (e.exports = i),
          (i.prototype.hoverTitle = function (e) {
            (this._hovered = e), this._fireListeners();
          }),
          (i.prototype.cleanHover = function () {
            (this._hovered = null), this._fireListeners();
          }),
          (i.prototype.addHoverListener = function (e, t) {
            var n = { title: e, listener: t };
            return (
              this._listeners.push(n),
              this._fireEntry(n),
              function () {
                this._listeners = this._listeners.filter(function (e) {
                  return e.listener !== t;
                });
              }.bind(this)
            );
          }),
          (i.prototype._fireListeners = function () {
            this._listeners.forEach(this._fireEntry.bind(this));
          }),
          (i.prototype._fireEntry = function (e) {
            e.listener(e.title === this._hovered);
          });
      },
      83128: function (e) {
        "use strict";
        e.exports = [
          "readFiles",
          function (e) {
            return {
              restrict: "A",
              scope: { onChange: "&camFile" },
              link: function (t, n) {
                n[0].addEventListener("change", function (i) {
                  t.$apply(function () {
                    e(n[0].files).then(function (e) {
                      t.onChange({ $event: i, files: e });
                    });
                  });
                });
              },
            };
          },
        ];
      },
      26994: function (e) {
        "use strict";
        e.exports = function () {
          return {
            restrict: "A",
            transclude: !0,
            scope: !0,
            controller: "HoverAreaController as HoverArea",
            link: function (e, t, n, i, r) {
              r(function (e) {
                t.empty(), t.append(e);
              });
            },
          };
        };
      },
      33939: function (e) {
        "use strict";
        e.exports = function () {
          return {
            restrict: "A",
            require: "^camHoverArea",
            link: function (e, t, n, i) {
              t.on("mouseenter", function () {
                e.$apply(function () {
                  i.hoverTitle(n.camHoverTrigger);
                });
              }),
                t.on("mouseleave", function () {
                  e.$apply(i.cleanHover.bind(i));
                });
            },
          };
        };
      },
      50001: function (e) {
        "use strict";
        e.exports = function () {
          return {
            restrict: "A",
            require: "^camHoverArea",
            link: function (e, t, n, i) {
              var r,
                a = n.hoverClass || "hovered";
              function o() {
                r && r();
              }
              n.$observe("camHoverableTitle", function (e) {
                o(),
                  (r = i.addHoverListener(e, function (e) {
                    e ? t.addClass(a) : t.removeClass(a);
                  }));
              }),
                t.on("$destroy", o);
            },
          };
        };
      },
      26142: function (e, t, n) {
        "use strict";
        var i = n(86368);
        e.exports = function () {
          return {
            replace: !1,
            restrict: "A",
            scope: { column: "@sortByProperty" },
            transclude: !0,
            require: "^^camSortableTableHeader",
            template: i,
            link: function (e, t, n, i) {
              (e.orderClass = function (e) {
                var t = i.getSorting();
                return (
                  "glyphicon-" +
                  { none: "minus", desc: "chevron-down", asc: "chevron-up" }[
                    (e = e || t.sortBy) === t.sortBy ? t.sortOrder : "none"
                  ]
                );
              }),
                (e.changeOrder = function (e) {
                  i.changeOrder(e);
                });
            },
          };
        };
      },
      88497: function (e) {
        "use strict";
        function t() {}
        e.exports = function () {
          return {
            replace: !1,
            restrict: "A",
            scope: {
              onSortInitialized: "&",
              onSortChange: "&",
              sortBy: "@defaultSortBy",
              sortOrder: "@defaultSortOrder",
              sortingId: "@",
            },
            controller: [
              "$scope",
              "localConf",
              function (e, n) {
                var i = e.sortingId,
                  r = { sortBy: e.sortBy, sortOrder: e.sortOrder },
                  a = e.onSortInitialized || t,
                  o = e.onSortChange || t,
                  s = n.get(i, r);
                a({ sorting: s }),
                  (this.changeOrder = function (e) {
                    (s.sortBy = e),
                      (s.sortOrder = "desc" === s.sortOrder ? "asc" : "desc"),
                      (function (e) {
                        n.set(i, e);
                      })(s),
                      o({ sorting: s });
                  }),
                  (this.getSorting = function () {
                    return s;
                  });
              },
            ],
          };
        };
      },
      68141: function (e, t, n) {
        "use strict";
        var i = n(13871);
        e.exports = function () {
          return {
            restrict: "A",
            template: i,
            controller: "ExternalTaskActivityLinkController as Link",
            scope: {
              activityId: "=externalTaskActivityLink",
              bpmnElements: "=",
              searchQueryType: "=?",
            },
          };
        };
      },
      24174: function (e, t, n) {
        "use strict";
        var i = n(68754);
        e.exports = function () {
          return {
            restrict: "A",
            template: i,
            transclude: !0,
            controller: "ExternalTaskErrorMessageLinkController as Link",
            scope: { taskId: "=externalTaskErrorMessageLink", historic: "=?" },
          };
        };
      },
      17685: function (e, t, n) {
        "use strict";
        var i = n(93293);
        e.exports = function () {
          return {
            restrict: "A",
            template: i,
            transclude: !0,
            controller: "ExternalTasksTabController as TasksTab",
            scope: { onLoad: "&externalTasksTab", processData: "=" },
          };
        };
      },
      76411: function (e, t, n) {
        "use strict";
        n(67559), n(85541), n(56806), n(92695);
        var i = n(43909);
        function r(e, t, n, i, r, a) {
          t(e, this, ["activityId", "bpmnElements", "searchQueryType"]),
            (this.search = n),
            (this.params = r),
            (this.path = i.path()),
            (this.searchWidgetUtils = a);
        }
        (e.exports = [
          "$scope",
          "exposeScopeProperties",
          "search",
          "$location",
          "params",
          "searchWidgetUtils",
          r,
        ]),
          (r.prototype.getLink = function () {
            var e = i.copy(this.search()),
              t = JSON.parse(e.searchQuery || "[]");
            return (
              this.searchQueryType
                ? (e.searchQuery = JSON.stringify(
                    this.searchWidgetUtils.replaceActivitiesInSearchQuery(
                      t,
                      this.searchQueryType,
                      [this.activityId]
                    )
                  ))
                : (e.activityIds = this.activityId),
              "#" + this.path + "?" + this.params(e)
            );
          }),
          (r.prototype.getActivityName = function () {
            var e = this.activityId;
            return this.bpmnElements[e] && this.bpmnElements[e].name
              ? this.bpmnElements[e].name
              : e;
          });
      },
      28252: function (e) {
        "use strict";
        function t(e, t, n) {
          n(e, this, ["taskId", "historic"]), (this.Uri = t);
        }
        (e.exports = ["$scope", "Uri", "exposeScopeProperties", t]),
          (t.prototype.getStacktraceUrl = function () {
            var e =
              "engine://engine/:engine/external-task/" +
              this.taskId +
              "/errorDetails";
            return (
              this.historic &&
                (e =
                  "engine://engine/:engine/history/external-task-log/" +
                  this.taskId +
                  "/error-details"),
              this.Uri.appUri(e)
            );
          });
      },
      69577: function (e, t, n) {
        "use strict";
        n(82447), n(84392);
        var i = n(43909);
        function r(e, t, n) {
          t(e, this, ["onLoad"]),
            e.$on("$destroy", function () {
              n("page", null);
            }),
            e.processData
              .newChild(e)
              .observe("filter", this.onFilterChanged.bind(this));
        }
        function a(e) {
          return e && e.activityIds && e.activityIds.length
            ? e.activityIds
            : null;
        }
        (e.exports = ["$scope", "exposeScopeProperties", "search", r]),
          (e.exports.ExternalTasksTabController = r),
          (r.prototype.onFilterChanged = function (e) {
            this.isFilterChanged(e) &&
              ((this.filter = e), this.pages && this.loadTasks());
          }),
          (r.prototype.isFilterChanged = function (e) {
            var t = a(this.filter),
              n = a(e);
            return !this.filter || !i.equals(t, n);
          }),
          (r.prototype.onPaginationChange = function (e) {
            (this.pages = e), this.filter && this.loadTasks();
          }),
          (r.prototype.loadTasks = function () {
            (this.loadingState = "LOADING"),
              this.onLoad({
                pages: i.copy(this.pages),
                activityIds: a(this.filter),
              }).then(
                function (e) {
                  (this.total = e.count),
                    e.list
                      ? (this.loadingState = "LOADED")
                      : (this.loadingState = "EMPTY");
                }.bind(this)
              );
          });
      },
      65526: function (e, t, n) {
        "use strict";
        var i = n(43909),
          r = n(33203),
          a = n(68141),
          o = n(17685),
          s = n(24174),
          c = n(76411),
          l = n(69577),
          u = n(28252),
          p = i.module("cam-common.external-tasks-common", []);
        p.factory("observeBpmnElements", r),
          p.directive("externalTaskActivityLink", a),
          p.directive("externalTasksTab", o),
          p.directive("externalTaskErrorMessageLink", s),
          p.controller("ExternalTaskActivityLinkController", c),
          p.controller("ExternalTasksTabController", l),
          p.controller("ExternalTaskErrorMessageLinkController", u),
          (e.exports = p);
      },
      33203: function (e) {
        "use strict";
        e.exports = function () {
          return function (e, t) {
            t.processData.newChild(e).observe("bpmnElements", function (e) {
              t.bpmnElements = e;
            });
          };
        };
      },
      91847: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(43909),
          r = n(52637),
          a = n(52041),
          o = n(63524),
          s = n(56076),
          c = n(95028),
          l = n(92075),
          u = n(69661),
          p = n(93872),
          d = n(57711),
          f = n(96270),
          h = n(43700),
          v = n(21280),
          m = n(34863),
          g = n(78693),
          y = n(66372),
          b = n(28232),
          w = n(32640),
          _ = n(26994),
          E = n(33939),
          x = n(50001),
          S = n(83128),
          I = n(88497),
          A = n(26142),
          C = n(24621),
          k = n(49783),
          T = n(71995),
          L = n(71679),
          O = n(92758),
          N = n(50947),
          D = n(51344),
          P = n(65526),
          $ = i.module("cam-common", [P.name]);
        $.factory("isModuleAvailable", r),
          $.factory("exposeScopeProperties", a),
          $.factory("Loaders", o),
          $.factory("integrateActivityInstanceFilter", s),
          $.factory("params", c),
          $.factory("createListQueryFunction", l),
          $.factory("createIsSearchQueryChangedFunction", u),
          $.factory("readFiles", p),
          $.factory("upload", d),
          $.factory("getDeploymentUrl", f),
          $.factory("isFileUploadSupported", h),
          $.factory("get", v),
          $.factory("getPluginApiAttributes", function () {
            return m;
          }),
          $.directive("camToolbar", g),
          $.directive("camPagination", y),
          $.directive("camSearchableArea", b),
          $.directive("camTabs", w),
          $.directive("camHoverArea", _),
          $.directive("camHoverTrigger", E),
          $.directive("camHoverableTitle", x),
          $.directive("camFile", S),
          $.directive("camSortableTableHeader", I),
          $.directive("camSortableTableColumn", A),
          $.controller("HoverAreaController", C),
          $.controller("CamPaginationController", k),
          $.controller("CamTabsController", T),
          $.controller("CamPaginationSearchIntegrationController", L),
          $.value("routeUtil", O),
          $.value("paginationUtils", N),
          $.value("searchWidgetUtils", D),
          (e.exports = $);
      },
      69661: function (e) {
        "use strict";
        e.exports = [
          "search",
          function (e) {
            return function () {
              var t = null;
              return function () {
                var n = e().searchQuery;
                if (n !== t && (t || "[]" !== n)) return (t = n), !0;
              };
            };
          },
        ];
      },
      92075: function (e, t, n) {
        "use strict";
        var i = n(43909);
        e.exports = [
          "$q",
          function (e) {
            return function (t, n) {
              return function (r, a, o) {
                return t(r).then(function (t) {
                  var s = (a.current - 1) * a.size,
                    c = t.count,
                    l = i.extend(
                      {},
                      r,
                      { firstResult: s, maxResults: a.size },
                      o
                    );
                  return c > s ? e.all({ count: c, list: n(l) }) : t;
                });
              };
            };
          },
        ];
      },
      52041: function (e, t, n) {
        "use strict";
        n(84392),
          (e.exports = function () {
            return function (e, t, n) {
              var i = n.reduce(function (t, n) {
                return (
                  (t[n] = {
                    get: function () {
                      return e[n];
                    },
                    set: function (t) {
                      e[n] = t;
                    },
                  }),
                  t
                );
              }, {});
              Object.defineProperties(t, i);
            };
          });
      },
      96270: function (e, t, n) {
        "use strict";
        n(67559),
          n(56806),
          n(92695),
          (e.exports = [
            "$location",
            "routeUtil",
            function (e, t) {
              return function (n, i) {
                var r = {
                  deployment: n.id,
                  deploymentsQuery: JSON.stringify([
                    { type: "id", operator: "eq", value: n.id },
                  ]),
                };
                i && (r.resourceName = i.name);
                var a = e.search() || {};
                return (
                  a.deploymentsSortBy &&
                    (r.deploymentsSortBy = a.deploymentsSortBy),
                  a.deploymentsSortOrder &&
                    (r.deploymentsSortOrder = a.deploymentsSortOrder),
                  t.redirectTo("#/repository", r, [
                    "deployment",
                    "resourceName",
                    "deploymentsQuery",
                    "deploymentsSortOrder",
                    "deploymentsSortBy",
                  ])
                );
              };
            },
          ]);
      },
      21280: function (e) {
        "use strict";
        e.exports = function () {
          return function (e, t, n) {
            for (var i, r = e, a = 0; a < t.length; a++) {
              if (((i = t[a]), !r || !r[i])) return n;
              r = r[i];
            }
            return r;
          };
        };
      },
      56076: function (e, t, n) {
        "use strict";
        n(7089),
          n(82447),
          n(45477),
          n(27473),
          n(85541),
          n(84392),
          n(56806),
          n(31083),
          n(66893);
        var i = n(43909);
        e.exports = [
          "search",
          "$location",
          "searchWidgetUtils",
          function (e, t, n) {
            return function (r, a, o) {
              var s = r.processData,
                c = r.processInstance;
              function l(t) {
                var r = e(),
                  a = n.getActivityIdsFromUrlParams("activityInstanceIdIn", r),
                  o = r.activityIds ? r.activityIds.split(",") : [],
                  s = (function (e, t, n) {
                    return (
                      e &&
                      i.equals(t, e.activityIds) &&
                      !i.equals(n, e.activityInstanceIds)
                    );
                  })(t, o, a);
                return (
                  s && (o = []),
                  {
                    activityIds: o,
                    activityInstanceIds: a,
                    page: parseInt(r.page, 10) || void 0,
                    replace: s || !t,
                  }
                );
              }
              (o = o || {}),
                (r.filter = l()),
                s.provide("filter", l()),
                s.observe(
                  [
                    "filter",
                    "instanceIdToInstanceMap",
                    "activityIdToInstancesMap",
                  ],
                  function (t, a, c) {
                    var l,
                      u = t.activityIds || [],
                      p = t.activityInstanceIds || [],
                      d = parseInt(t.page, 10) || null,
                      f = t.scrollToBpmnElement,
                      h = t !== r.filter,
                      v = t.replace;
                    if (
                      (delete t.replace,
                      i.forEach(p, function (e) {
                        var t = a[e] || {},
                          n = t.activityId || t.targetActivityId;
                        -1 === u.indexOf(n) && n && u.push(n);
                      }),
                      i.forEach(u, function (e) {
                        var t = c[e],
                          n = !1,
                          i = [];
                        if (t) {
                          for (var r, a = 0; (r = t[a]); a++) {
                            if (-1 !== p.indexOf(r.id)) {
                              n = !0;
                              break;
                            }
                            i.push(r.id);
                          }
                          n || (p = p.concat(i));
                        }
                      }),
                      o.shouldRemoveActivityIds)
                    )
                      for (var m = 0; m < u.length; m++)
                        c[u[m]] || (u.splice(m, 1), m--);
                    for (m = 0; m < p.length; m++)
                      a[p[m]] || (p.splice(m, 1), m--);
                    if (u.length > 0) {
                      var g = u[u.length - 1];
                      g !== f && (f = g);
                    }
                    (l = {
                      activityIds: u,
                      activityInstanceIds: p,
                      scrollToBpmnElement: f,
                      page: d,
                    }),
                      i.equals(l, r.filter) ||
                        ((r.filter = l), s.set("filter", r.filter));
                    h &&
                      r.filter &&
                      (function (t, a) {
                        var o = i.isArray(t.activityInstanceIds)
                            ? t.activityInstanceIds
                            : [],
                          s = i.isArray(t.activityIds) ? t.activityIds : [],
                          c = e(),
                          l = JSON.parse(c.searchQuery || "[]");
                        l =
                          c.searchQuery || o.length || s.length
                            ? n.replaceActivitiesInSearchQuery(
                                l,
                                "activityInstanceIdIn",
                                o
                              )
                            : null;
                        e.updateSilently(
                          {
                            searchQuery: l ? JSON.stringify(l) : null,
                            activityIds: s.length ? s.join(",") : null,
                          },
                          a
                        ),
                          (r.filter = t);
                      })(r.filter, v);
                  }
                ),
                r.$on("$locationChangeSuccess", function () {
                  var e = l(r.filter);
                  t.path().indexOf(c.id) > -1 &&
                    (n.shouldUpdateFilter(e, r.filter, [
                      "activityIds",
                      "activityInstanceIds",
                      "page",
                    ]) && s.set("filter", e),
                    a(r.processInstanceTabs));
                });
            };
          },
        ];
      },
      43700: function (e) {
        "use strict";
        e.exports = [
          "$window",
          function (e) {
            return function () {
              var t = e.FileReader;
              return (
                "function" == typeof t &&
                "function" == typeof t.prototype.readAsText
              );
            };
          },
        ];
      },
      52637: function (e, t, n) {
        "use strict";
        var i = n(43909);
        e.exports = function () {
          return function (e) {
            try {
              return !!i.module(e);
            } catch (e) {
              return !1;
            }
          };
        };
      },
      63524: function (e, t, n) {
        "use strict";
        n(82447),
          n(84392),
          (e.exports = [
            "$rootScope",
            function (e) {
              var t = [],
                n = "LoaderService:active-loaders-changed";
              return {
                startLoading: function () {
                  var e = function e() {
                    (t = t.filter(function (t) {
                      return t !== e;
                    })),
                      i();
                  };
                  return t.push(e), i(), e;
                },
                addStatusListener: function (e, t) {
                  return (
                    t(r()),
                    e.$on(n, function () {
                      var e = r();
                      t(e);
                    })
                  );
                },
              };
              function i() {
                e.$broadcast(n);
              }
              function r() {
                return 0 === t.length ? "LOADED" : "LOADING";
              }
            },
          ]);
      },
      95028: function (e, t, n) {
        "use strict";
        n(85541),
          n(84392),
          (e.exports = function () {
            return function (e) {
              return Object.keys(e).reduce(function (t, n) {
                var i = e[n],
                  r = n + "=" + encodeURIComponent(i);
                return t.length ? t + "&" + r : r;
              }, "");
            };
          });
      },
      93872: function (e, t, n) {
        "use strict";
        n(84735),
          (e.exports = [
            "$q",
            "$window",
            function (e, t) {
              return function (t) {
                return e.all(Array.prototype.map.call(t, n));
              };
              function n(n) {
                var i = e.defer(),
                  r = new t.FileReader();
                return (
                  (r.onload = function (e) {
                    i.resolve({ file: n, content: e.target.result });
                  }),
                  (r.onerror = function (e) {
                    i.reject(e);
                  }),
                  r.readAsText(n),
                  i.promise
                );
              }
            },
          ]);
      },
      57711: function (e, t, n) {
        "use strict";
        n(7089), n(45477), n(84735), n(67559), n(85541), n(84392), n(95234);
        var i = n(43909);
        e.exports = [
          "$window",
          "$q",
          "$rootScope",
          "$cookies",
          "$http",
          function (e, t, n, r, a) {
            return function (e, r, o) {
              var s = t.defer();
              i.isArray(r) || (r = [r]), (o = o || {});
              var c = r.map(function (e, t) {
                return (
                  'Content-Disposition: form-data; name="data' +
                  t +
                  '"; filename="' +
                  e.file.name +
                  '"\r\nContent-Type: text/xml\r\n\r\n' +
                  e.content +
                  "\r\n"
                );
              });
              c = c.concat(
                Object.keys(o).map(function (e) {
                  return (
                    'Content-Disposition: form-data; name="' +
                    e +
                    '"\r\n\r\n' +
                    o[e] +
                    "\r\n"
                  );
                })
              );
              var l = "---------------------------" + Date.now().toString(16),
                u =
                  "--" +
                  l +
                  "\r\n" +
                  c.join("--" + l + "\r\n") +
                  "--" +
                  l +
                  "--\r\n";
              return (
                a
                  .post(e, u, {
                    transformRequest: i.identity,
                    headers: {
                      "Content-Type": "multipart/form-data; boundary=" + l,
                    },
                  })
                  .then(function (e) {
                    s.resolve(e.data);
                  })
                  .catch(function (e) {
                    401 === e.status &&
                      (n.$broadcast("authentication.changed", null),
                      (n.authentication = null),
                      n.$broadcast("authentication.login.required")),
                      s.reject(e);
                  }),
                s.promise
              );
            };
          },
        ];
      },
      10505: function (e, t, n) {
        "use strict";
        var i = n(59721);
        e.exports = [
          "Uri",
          "camAPIHttpClient",
          function (e, t) {
            return new i.Client({
              HttpClient: t,
              apiUri: e.appUri("engine://"),
              engine: e.appUri(":engine"),
            });
          },
        ];
      },
      65015: function (e, t, n) {
        "use strict";
        n(34820), n(67559), n(85541), n(76474);
        var i = n(30336),
          r = {
            dateFormat: {
              monthName: "MMMM",
              day: "DD",
              abbr: "lll",
              normal: "LLL",
              long: "LLLL",
              short: "LL",
            },
            locales: { availableLocales: ["en"], fallbackLocale: "en" },
            skipCustomListeners: { default: !0, hidden: !1 },
            skipIoMappings: { default: !0, hidden: !1 },
            cascade: { default: !1 },
            runtimeActivityInstanceMetrics: { display: !0 },
            historicActivityInstanceMetrics: {
              adjustablePeriod: !0,
              period: { unit: "day" },
            },
            batchOperation: { mode: "filter", autoLoadEnded: !0 },
            csrfCookieName: "XSRF-TOKEN",
            disableWelcomeMessage: !1,
            userOperationLogAnnotationLength: 4e3,
            previewHtml: !0,
            assignProcessInstanceIdToTaskComment: !1,
          };
        e.exports = function (e, t) {
          return [
            function () {
              var n = window.localStorage,
                a = JSON.parse(n.getItem("camunda-web") || "{}");
              (this.get = function (e, t) {
                return void 0 !== a[e] ? a[e] : t;
              }),
                (this.set = function (e, t) {
                  (a[e] = t), n.setItem("camunda-web", JSON.stringify(a));
                }),
                (this.clearTranslationData = function () {
                  for (var e in a)
                    e.includes("_locales_data_") &&
                      !e.includes(window.bust) &&
                      delete a[e];
                  window.localStorage.setItem("camunda-web", JSON.stringify(a));
                }),
                (this.getDateFormat = function (t) {
                  return (e.dateFormat || r.dateFormat)[t] || r.dateFormat[t];
                }),
                (this.getFallbackLocale = function () {
                  return e.locales && e.locales.fallbackLocale
                    ? e.locales.fallbackLocale
                    : r.locales.fallbackLocale;
                }),
                (this.getAvailableLocales = function () {
                  return e.locales && e.locales.availableLocales
                    ? e.locales.availableLocales
                    : r.locales.availableLocales;
                }),
                (this.getDateLocales = function () {
                  return e.camDateLocales;
                }),
                (this.getAppVendor = function () {
                  return e.app && e.app.vendor ? e.app.vendor : "Camunda";
                }),
                (this.getAppName = function () {
                  return e.app && e.app.name ? e.app.name : t;
                }),
                (this.getSkipCustomListeners = function () {
                  return i.extend(
                    {},
                    r.skipCustomListeners,
                    e.skipCustomListeners
                  );
                }),
                (this.getSkipIoMappings = function () {
                  return i.extend({}, r.skipIoMappings, e.skipIoMappings);
                }),
                (this.getCascade = function () {
                  return i.extend({}, r.cascade, e.cascade);
                }),
                (this.getRuntimeActivityInstanceMetrics = function () {
                  var t = "runtimeActivityInstanceMetrics";
                  return i.extend({}, r[t], e[t]).display;
                }),
                (this.getActivityInstancePeriod = function () {
                  var t = "historicActivityInstanceMetrics";
                  return e[t] && e[t].period ? e[t].period : r[t].period;
                }),
                (this.getActivityInstanceAdjustable = function () {
                  var t = "historicActivityInstanceMetrics";
                  return e[t] && void 0 !== e[t].adjustablePeriod
                    ? e[t].adjustablePeriod
                    : r[t].adjustablePeriod;
                }),
                (this.getBatchOperationMode = function () {
                  var t = "batchOperation";
                  return (e[t] && e[t].mode) || r[t].mode;
                }),
                (this.getBatchOperationAutoLoadEnded = function () {
                  var t = "batchOperation";
                  return e[t] && void 0 !== e[t].autoLoadEnded
                    ? e[t].autoLoadEnded
                    : r[t].autoLoadEnded;
                }),
                (this.getBpmnJs = function () {
                  return e.bpmnJs;
                }),
                (this.getHistoricProcessInstancesSearch = function () {
                  return (e.defaultFilter || {})
                    .historicProcessDefinitionInstancesSearch;
                }),
                (this.getCsrfCookieName = function () {
                  var t = "csrfCookieName";
                  return e[t] || r[t];
                }),
                (this.getDisableWelcomeMessage = function () {
                  var t = "disableWelcomeMessage";
                  return e[t] || r[t];
                }),
                (this.getUserOperationLogAnnotationLength = function () {
                  var t = "userOperationLogAnnotationLength";
                  return e[t] || r[t];
                }),
                (this.getPreviewHtml = function () {
                  var t = "previewHtml";
                  return void 0 !== e[t] ? e[t] : r[t];
                }),
                (this.getAssignProcessInstanceIdToTaskComment = function () {
                  var t = "assignProcessInstanceIdToTaskComment";
                  return void 0 !== e[t] ? e[t] : r[t];
                }),
                (this.$get = function () {
                  return this;
                });
            },
          ];
        };
      },
      86244: function (e, t, n) {
        "use strict";
        n(45477), n(85541);
        var i = n(40271),
          r = n(43909);
        e.exports = function (e, t, n) {
          e.factory("sanitizeMissingTranslationKey", [
            "$translateSanitization",
            function (e) {
              return function (t) {
                return e.sanitize(t, "text", "escape");
              };
            },
          ]),
            e.factory("localeLoader", [
              "$q",
              "$http",
              "Notifications",
              "configuration",
              function (e, t, n, i) {
                return function (a) {
                  if (!a || !r.isString(a.prefix) || !r.isString(a.suffix))
                    throw new Error(
                      "Couldn't load static files, no prefix or suffix specified!"
                    );
                  var o = e.defer(),
                    s = a.prefix + "_locales_data_" + a.key + "_" + window.bust,
                    c = i.get(s);
                  return (
                    c &&
                      ((c = JSON.parse(c)),
                      "function" == typeof a.callback &&
                        a.callback(null, c, a.key),
                      o.resolve(c.labels)),
                    t(
                      r.extend(
                        {
                          url: [a.prefix, a.key, a.suffix].join(""),
                          method: "GET",
                          params: { bust: "7.23.0-alpha4" },
                        },
                        a.$http
                      )
                    )
                      .then(function (e) {
                        i.clearTranslationData(),
                          i.set(s, JSON.stringify(e.data)),
                          c ||
                            ("function" == typeof a.callback &&
                              a.callback(null, e.data, a.key),
                            o.resolve(e.data.labels));
                      })
                      .catch(function (e) {
                        n.addError({
                          status: "Error in localization configuration",
                          message:
                            '"' +
                            a.key +
                            '" is declared as available locale, but no such locale file exists.',
                        }),
                          c ||
                            ("function" == typeof a.callback &&
                              a.callback(e.data, null, a.key),
                            o.reject(a.key));
                      }),
                    o.promise
                  );
                };
              },
            ]),
            e.config([
              "$translateProvider",
              "configurationProvider",
              function (e, a) {
                e.useMissingTranslationHandler("sanitizeMissingTranslationKey");
                var o = a.getAvailableLocales(),
                  s = a.getFallbackLocale();
                e.useLoader("localeLoader", {
                  prefix: t + "/app/" + n + "/locales/",
                  suffix: ".json",
                  callback: function (e, t, n) {
                    if (!e && t && t.dateLocales) {
                      var r = n || s;
                      i.locales().indexOf(r) > -1
                        ? i.updateLocale(r, t.dateLocales)
                        : i.defineLocale(r, t.dateLocales);
                    }
                  },
                }),
                  e.registerAvailableLanguageKeys(o),
                  e.fallbackLanguage(s),
                  e.useSanitizeValueStrategy("escapeParameters"),
                  e.determinePreferredLanguage(function () {
                    var e = window.navigator,
                      t = (
                        (r.isArray(e.languages)
                          ? e.languages[0]
                          : e.language ||
                            e.browserLanguage ||
                            e.systemLanguage ||
                            e.userLanguage) || ""
                      ).split("-"),
                      n = o.indexOf(t[0].toLowerCase());
                    return n > -1 ? o[n] : s;
                  });
              },
            ]);
        };
      },
      96079: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        function r() {
          r = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            a = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            l = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function p(e, t, n) {
            return (
              Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[t]
            );
          }
          try {
            p({}, "");
          } catch (e) {
            p = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function d(e, t, n, i) {
            var r = t && t.prototype instanceof b ? t : b,
              a = Object.create(r.prototype),
              s = new N(i || []);
            return o(a, "_invoke", { value: k(e, n, s) }), a;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = d;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function w() {}
          function _() {}
          var E = {};
          p(E, c, function () {
            return this;
          });
          var x = Object.getPrototypeOf,
            S = x && x(x(D([])));
          S && S !== n && a.call(S, c) && (E = S);
          var I = (_.prototype = b.prototype = Object.create(E));
          function A(e) {
            ["next", "throw", "return"].forEach(function (t) {
              p(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function C(e, t) {
            function n(r, o, s, c) {
              var l = f(e[r], e, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  p = u.value;
                return p && "object" == i(p) && a.call(p, "__await")
                  ? t.resolve(p.__await).then(
                      function (e) {
                        n("next", e, s, c);
                      },
                      function (e) {
                        n("throw", e, s, c);
                      }
                    )
                  : t.resolve(p).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function (e, i) {
                function a() {
                  return new t(function (t, r) {
                    n(e, i, t, r);
                  });
                }
                return (r = r ? r.then(a, a) : a());
              },
            });
          }
          function k(t, n, i) {
            var r = h;
            return function (a, o) {
              if (r === m) throw new Error("Generator is already running");
              if (r === g) {
                if ("throw" === a) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = a, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var c = T(s, i);
                  if (c) {
                    if (c === y) continue;
                    return c;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (r === h) throw ((r = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                r = m;
                var l = f(t, n, i);
                if ("normal" === l.type) {
                  if (((r = i.done ? g : v), l.arg === y)) continue;
                  return { value: l.arg, done: i.done };
                }
                "throw" === l.type &&
                  ((r = g), (i.method = "throw"), (i.arg = l.arg));
              }
            };
          }
          function T(t, n) {
            var i = n.method,
              r = t.iterator[i];
            if (r === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  T(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var a = f(r, t.iterator, n.arg);
            if ("throw" === a.type)
              return (
                (n.method = "throw"), (n.arg = a.arg), (n.delegate = null), y
              );
            var o = a.arg;
            return o
              ? o.done
                ? ((n[t.resultName] = o.value),
                  (n.next = t.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = e)),
                  (n.delegate = null),
                  y)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                y);
          }
          function L(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function O(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function N(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function D(t) {
            if (t || "" === t) {
              var n = t[c];
              if (n) return n.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var r = -1,
                  o = function n() {
                    for (; ++r < t.length; )
                      if (a.call(t, r))
                        return (n.value = t[r]), (n.done = !1), n;
                    return (n.value = e), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(i(t) + " is not iterable");
          }
          return (
            (w.prototype = _),
            o(I, "constructor", { value: _, configurable: !0 }),
            o(_, "constructor", { value: w, configurable: !0 }),
            (w.displayName = p(_, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === w || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, _)
                  : ((e.__proto__ = _), p(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(I)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            A(C.prototype),
            p(C.prototype, l, function () {
              return this;
            }),
            (t.AsyncIterator = C),
            (t.async = function (e, n, i, r, a) {
              void 0 === a && (a = Promise);
              var o = new C(d(e, n, i, r), a);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            A(I),
            p(I, u, "Generator"),
            p(I, c, function () {
              return this;
            }),
            p(I, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (e) {
              var t = Object(e),
                n = [];
              for (var i in t) n.push(i);
              return (
                n.reverse(),
                function e() {
                  for (; n.length; ) {
                    var i = n.pop();
                    if (i in t) return (e.value = i), (e.done = !1), e;
                  }
                  return (e.done = !0), e;
                }
              );
            }),
            (t.values = D),
            (N.prototype = {
              constructor: N,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      a.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = e);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var n = this;
                function i(i, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    r && ((n.method = "next"), (n.arg = e)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var c = a.call(o, "catchLoc"),
                      l = a.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    a.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var r = i;
                    break;
                  }
                }
                r &&
                  ("break" === e || "continue" === e) &&
                  r.tryLoc <= t &&
                  t <= r.finallyLoc &&
                  (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = e),
                  (o.arg = t),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), y)
                    : this.complete(o)
                );
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && t && (this.next = t),
                  y
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.finallyLoc === e)
                    return this.complete(n.completion, n.afterLoc), O(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var r = i.arg;
                      O(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: D(t),
                    resultName: n,
                    nextLoc: i,
                  }),
                  "next" === this.method && (this.arg = e),
                  y
                );
              },
            }),
            t
          );
        }
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function o(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  s(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : a(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function s(e, t, n) {
          var r;
          return (
            (r = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" != i(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(r) ? r : String(r)) in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function c(e, t, n, i, r, a, o) {
          try {
            var s = e[a](o),
              c = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(c) : Promise.resolve(c).then(i, r);
        }
        n(36180),
          n(51980),
          n(32157),
          n(28186),
          n(24421),
          n(77674),
          n(82447),
          n(57507),
          n(72595),
          n(553),
          n(67559),
          n(27216),
          n(2108),
          n(54363),
          n(1164),
          n(38179),
          n(85174),
          n(85541),
          n(17922),
          n(30129),
          n(19824),
          n(84392),
          n(17003),
          n(95234),
          n(66893);
        var l = n(34863),
          u = n(55939),
          p = n(75184);
        e.exports = (function () {
          var e,
            t =
              ((e = r().mark(function e(t, n, i) {
                return r().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), p(t, i);
                      case 2:
                        e.sent.forEach(function (e) {
                          var r = Math.random().toString(36).substring(2);
                          (e.overlay = [
                            "control",
                            "$scope",
                            function (n, r) {
                              var a = n.getViewer;
                              e.render(
                                a(),
                                l(u(e.pluginPoint, r, i), t.csrfCookieName),
                                r
                              ),
                                r.$on("$destroy", function () {
                                  e.unmount && e.unmount();
                                });
                            },
                          ]),
                            n.directive("pluginBridge" + r, [
                              function () {
                                return {
                                  link: function (n, r) {
                                    var a = document.createElement("div");
                                    e.render(
                                      a,
                                      l(
                                        u(e.pluginPoint, n, i),
                                        t.csrfCookieName,
                                        i
                                      ),
                                      n
                                    ),
                                      r[0].appendChild(a),
                                      n.$on("$destroy", function () {
                                        e.unmount && e.unmount();
                                      });
                                  },
                                };
                              },
                            ]),
                            n.config([
                              "ViewsProvider",
                              function (t) {
                                t.registerDefaultView(
                                  e.pluginPoint,
                                  o(
                                    o(o({}, e.properties), e),
                                    {},
                                    {
                                      template: "<div plugin-bridge".concat(
                                        r,
                                        " />"
                                      ),
                                    }
                                  )
                                );
                              },
                            ]),
                            e.pluginPoint === "".concat(i, ".route") &&
                              n.config([
                                "$routeProvider",
                                function (t) {
                                  t.when(e.properties.path, {
                                    template: "<div plugin-bridge".concat(
                                      r,
                                      " />"
                                    ),
                                    controller: [
                                      "$scope",
                                      function (e) {
                                        e.$root.showBreadcrumbs = !1;
                                      },
                                    ],
                                    authentication: "required",
                                  });
                                },
                              ]);
                        });
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })),
              function () {
                var t = this,
                  n = arguments;
                return new Promise(function (i, r) {
                  var a = e.apply(t, n);
                  function o(e) {
                    c(a, i, r, o, s, "next", e);
                  }
                  function s(e) {
                    c(a, i, r, o, s, "throw", e);
                  }
                  o(void 0);
                });
              });
          return function (e, n, i) {
            return t.apply(this, arguments);
          };
        })();
      },
      34863: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        function r(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function a(e, t, n) {
          var r;
          return (
            (r = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" != i(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(r) ? r : String(r)) in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function o(e) {
          return document.cookie.replace(
            new RegExp("(?:(?:^|.*;*)".concat(e, "*=*([^;]*).*$)|^.*$")),
            "$1"
          );
        }
        n(36180),
          n(51980),
          n(28186),
          n(24421),
          n(82447),
          n(57507),
          n(553),
          n(54363),
          n(1164),
          n(38179),
          n(85541),
          n(84392),
          n(30129),
          n(66893),
          n(19824),
          n(72595),
          n(14943),
          n(56806),
          n(95234),
          n(31083),
          (e.exports = function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "XSRF-TOKEN",
              n = arguments.length > 2 ? arguments[2] : void 0,
              i = document.querySelector("base"),
              s = new RegExp(".*".concat(n, "/([^/]*).*")),
              c = window.location.href.replace(s, "$1");
            return (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? r(Object(n), !0).forEach(function (t) {
                      a(e, t, n[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(n)
                    )
                  : r(Object(n)).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(n, t)
                      );
                    });
              }
              return e;
            })(
              {
                api: {
                  adminApi: i.getAttribute("admin-api").slice(0, -1),
                  baseApi: i.getAttribute("engine-api").slice(0, -1),
                  cockpitApi: i.getAttribute("cockpit-api").slice(0, -1),
                  tasklistApi: i.getAttribute("tasklist-api").slice(0, -1),
                  engineApi: i.getAttribute("engine-api") + "engine/" + c,
                  engine: c,
                  CSRFToken: o(t),
                },
              },
              e
            );
          });
      },
      83178: function (e) {
        "use strict";
        e.exports = function (e, t) {
          var n = {};
          switch (e) {
            case "cockpit.processDefinition.runtime.tab":
            case "cockpit.processDefinition.runtime.action":
            case "cockpit.processDefinition.history.action":
            case "cockpit.processDefinition.history.tab":
              n.processDefinitionId = t.processDefinition.id;
              break;
            case "cockpit.processInstance.runtime.tab":
            case "cockpit.processInstance.runtime.action":
            case "cockpit.processInstance.history.tab":
            case "cockpit.processInstance.history.action":
              n.processInstanceId = t.processInstance.id;
              break;
            case "cockpit.processDefinition.diagram.plugin":
            case "cockpit.processDefinition.history.diagram.plugin":
              n.processDefinitionId = t.key;
              break;
            case "cockpit.processInstance.diagram.plugin":
            case "cockpit.processInstance.history.diagram.plugin":
              n.processInstanceId = window.location.hash.split("/")[2];
              break;
            case "cockpit.jobDefinition.action":
              n.jobDefinitionId = t.jobDefinition.id;
              break;
            case "cockpit.decisionDefinition.tab":
            case "cockpit.decisionDefinition.action":
              n.decisionDefinitionId = t.decisionDefinition.id;
              break;
            case "cockpit.decisionInstance.tab":
            case "cockpit.decisionInstance.action":
              n.decisionInstanceId = t.decisionInstance.id;
              break;
            case "cockpit.caseDefinition.tab":
            case "cockpit.caseDefinition.action":
              n.caseDefinitionId = t.definition.id;
              break;
            case "cockpit.caseInstance.tab":
            case "cockpit.caseInstance.action":
              n.caseInstanceId = t.instance.id;
              break;
            case "cockpit.repository.resource.action":
              (n.deploymentId = t.deployment.id),
                (n.resourceId = t.resource.id);
              break;
            case "cockpit.incident.action":
              n.incidentId = t.incident.id;
              break;
            case "cockpit.drd.definition.tab":
              n.drdDefinitionId = t.tabsApi.getDefinition().id;
              break;
            case "cockpit.drd.instance.tab":
              n.rootDecisionInstanceId = t.tabsApi.processParams(
                {}
              ).rootDecisionInstanceId;
              break;
            case "cockpit.processDefinition.diagram.action":
            case "cockpit.processDefinition.history.diagram.action":
              (n.viewer = t.viewer),
                (n.processDefinitionId = window.location.hash.split("/")[2]);
              break;
            case "cockpit.processes.action":
              n.processDefinitionId = t.pd.id;
              break;
            case "cockpit.repository.deployment.action":
              n.deploymentId = t.deployment.id;
              break;
            default:
              n = {};
          }
          return n;
        };
      },
      55939: function (e, t, n) {
        "use strict";
        e.exports = function (e, t, i) {
          switch (i) {
            case "cockpit":
              return n(83178)(e, t);
            case "tasklist":
              return n(56246)(e, t);
            default:
              return {};
          }
        };
      },
      56246: function (e) {
        "use strict";
        e.exports = function (e, t) {
          var n = {};
          switch (e) {
            case "tasklist.task.detail":
            case "tasklist.card":
              n.taskId = t.task.id;
              break;
            default:
              n = {};
          }
          return n;
        };
      },
      75184: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        function r() {
          r = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            a = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            l = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function p(e, t, n) {
            return (
              Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[t]
            );
          }
          try {
            p({}, "");
          } catch (e) {
            p = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function d(e, t, n, i) {
            var r = t && t.prototype instanceof b ? t : b,
              a = Object.create(r.prototype),
              s = new N(i || []);
            return o(a, "_invoke", { value: k(e, n, s) }), a;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = d;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function w() {}
          function _() {}
          var E = {};
          p(E, c, function () {
            return this;
          });
          var x = Object.getPrototypeOf,
            S = x && x(x(D([])));
          S && S !== n && a.call(S, c) && (E = S);
          var I = (_.prototype = b.prototype = Object.create(E));
          function A(e) {
            ["next", "throw", "return"].forEach(function (t) {
              p(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function C(e, t) {
            function n(r, o, s, c) {
              var l = f(e[r], e, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  p = u.value;
                return p && "object" == i(p) && a.call(p, "__await")
                  ? t.resolve(p.__await).then(
                      function (e) {
                        n("next", e, s, c);
                      },
                      function (e) {
                        n("throw", e, s, c);
                      }
                    )
                  : t.resolve(p).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function (e, i) {
                function a() {
                  return new t(function (t, r) {
                    n(e, i, t, r);
                  });
                }
                return (r = r ? r.then(a, a) : a());
              },
            });
          }
          function k(t, n, i) {
            var r = h;
            return function (a, o) {
              if (r === m) throw new Error("Generator is already running");
              if (r === g) {
                if ("throw" === a) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = a, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var c = T(s, i);
                  if (c) {
                    if (c === y) continue;
                    return c;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (r === h) throw ((r = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                r = m;
                var l = f(t, n, i);
                if ("normal" === l.type) {
                  if (((r = i.done ? g : v), l.arg === y)) continue;
                  return { value: l.arg, done: i.done };
                }
                "throw" === l.type &&
                  ((r = g), (i.method = "throw"), (i.arg = l.arg));
              }
            };
          }
          function T(t, n) {
            var i = n.method,
              r = t.iterator[i];
            if (r === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  T(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var a = f(r, t.iterator, n.arg);
            if ("throw" === a.type)
              return (
                (n.method = "throw"), (n.arg = a.arg), (n.delegate = null), y
              );
            var o = a.arg;
            return o
              ? o.done
                ? ((n[t.resultName] = o.value),
                  (n.next = t.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = e)),
                  (n.delegate = null),
                  y)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                y);
          }
          function L(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function O(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function N(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function D(t) {
            if (t || "" === t) {
              var n = t[c];
              if (n) return n.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var r = -1,
                  o = function n() {
                    for (; ++r < t.length; )
                      if (a.call(t, r))
                        return (n.value = t[r]), (n.done = !1), n;
                    return (n.value = e), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(i(t) + " is not iterable");
          }
          return (
            (w.prototype = _),
            o(I, "constructor", { value: _, configurable: !0 }),
            o(_, "constructor", { value: w, configurable: !0 }),
            (w.displayName = p(_, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === w || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, _)
                  : ((e.__proto__ = _), p(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(I)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            A(C.prototype),
            p(C.prototype, l, function () {
              return this;
            }),
            (t.AsyncIterator = C),
            (t.async = function (e, n, i, r, a) {
              void 0 === a && (a = Promise);
              var o = new C(d(e, n, i, r), a);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            A(I),
            p(I, u, "Generator"),
            p(I, c, function () {
              return this;
            }),
            p(I, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (e) {
              var t = Object(e),
                n = [];
              for (var i in t) n.push(i);
              return (
                n.reverse(),
                function e() {
                  for (; n.length; ) {
                    var i = n.pop();
                    if (i in t) return (e.value = i), (e.done = !1), e;
                  }
                  return (e.done = !0), e;
                }
              );
            }),
            (t.values = D),
            (N.prototype = {
              constructor: N,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      a.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = e);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var n = this;
                function i(i, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    r && ((n.method = "next"), (n.arg = e)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var c = a.call(o, "catchLoc"),
                      l = a.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    a.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var r = i;
                    break;
                  }
                }
                r &&
                  ("break" === e || "continue" === e) &&
                  r.tryLoc <= t &&
                  t <= r.finallyLoc &&
                  (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = e),
                  (o.arg = t),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), y)
                    : this.complete(o)
                );
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && t && (this.next = t),
                  y
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.finallyLoc === e)
                    return this.complete(n.completion, n.afterLoc), O(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var r = i.arg;
                      O(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: D(t),
                    resultName: n,
                    nextLoc: i,
                  }),
                  "next" === this.method && (this.arg = e),
                  y
                );
              },
            }),
            t
          );
        }
        function a(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return o(e);
            })(e) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(e) ||
            (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return o(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === n && e.constructor && (n = e.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(e);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return o(e, t);
            })(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function o(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
          return i;
        }
        function s(e, t, n, i, r, a, o) {
          try {
            var s = e[a](o),
              c = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(c) : Promise.resolve(c).then(i, r);
        }
        n(36180),
          n(51980),
          n(32157),
          n(28186),
          n(77674),
          n(95453),
          n(72595),
          n(27216),
          n(2108),
          n(85174),
          n(17922),
          n(56806),
          n(95234),
          n(66893),
          n(7089),
          n(82447),
          n(34820),
          n(57507),
          n(84735),
          n(67559),
          n(84392),
          n(17003),
          n(39950),
          n(30129),
          n(43387),
          n(19824);
        var c = document.querySelector("base").getAttribute("app-root"),
          l = [
            "admin-plugin-adminPlugins",
            "admin-plugin-adminEE",
            "cockpit-plugin-cockpitPlugins",
            "cockpit-plugin-cockpitEE",
            "tasklist-plugin-tasklistPlugins",
          ];
        e.exports = (function () {
          var e,
            t =
              ((e = r().mark(function e(t, n) {
                var i, o, s, u;
                return r().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (i = t.customScripts || []),
                          (o = window.PLUGIN_PACKAGES.filter(function (e) {
                            return (
                              !l.includes(e.name) &&
                              !e.name.startsWith("".concat(n, "-plugin-legacy"))
                            );
                          }).map(function (e) {
                            var t, n;
                            return (
                              (t = ""
                                .concat(e.location, "/plugin.css?bust=")
                                .concat("7.23.0-alpha4")),
                              ((n = document.createElement("link")).rel =
                                "stylesheet"),
                              (n.type = "text/css"),
                              (n.href = t),
                              document.head.appendChild(n),
                              ""
                                .concat(e.location, "/")
                                .concat(e.main, "?bust=")
                                .concat("7.23.0-alpha4")
                            );
                          })),
                          (s = "".concat(c, "/app/").concat(n, "/")),
                          (u = i.map(function (e) {
                            return ((t =
                              s +
                              ((n = e),
                              (i = ".js"),
                              n.endsWith(i) ? n : n + i) +
                              "?bust=".concat("7.23.0-alpha4")),
                            import(t)).catch(function (e) {
                              return console.error(e);
                            });
                            var t, n, i;
                          })).push.apply(
                            u,
                            a(
                              o.map(function (e) {
                                return ((t = e), import(t)).catch(function (e) {
                                  return console.error(e);
                                });
                                var t;
                              })
                            )
                          ),
                          (e.next = 7),
                          Promise.all(u)
                        );
                      case 7:
                        return e.abrupt(
                          "return",
                          e.sent.reduce(function (e, t) {
                            var n = t.default;
                            return n
                              ? (Array.isArray(n)
                                  ? e.push.apply(e, a(n))
                                  : e.push(n),
                                e)
                              : e;
                          }, [])
                        );
                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })),
              function () {
                var t = this,
                  n = arguments;
                return new Promise(function (i, r) {
                  var a = e.apply(t, n);
                  function o(e) {
                    s(a, i, r, o, c, "next", e);
                  }
                  function c(e) {
                    s(a, i, r, o, c, "throw", e);
                  }
                  o(void 0);
                });
              });
          return function (e, n) {
            return t.apply(this, arguments);
          };
        })();
      },
      65650: function (e) {
        "use strict";
        e.exports = function (e, t) {
          return -1 !== e.indexOf(t);
        };
      },
      50947: function (e, t, n) {
        "use strict";
        var i = n(43909),
          r = { size: 50, total: 0, current: 1 };
        function a(e) {
          return e().page || 1;
        }
        e.exports = {
          initializePaginationInController: function (e, t, n) {
            var o = (e.pages = i.copy(r));
            return (
              (o.current = a(t)),
              e.$watch("pages.current", function (e, i) {
                var r = a(t);
                e != i &&
                  e !== r &&
                  (t("page", e && 1 != e ? e : null), n(e, i));
              }),
              e.$on("$locationChangeSuccess", function () {
                var e = a(t);
                if (+o.current != +e) {
                  var i = o.current;
                  (o.current = e), n(o.current, i);
                }
              }),
              e.$on("$destroy", function () {
                t("page", null);
              }),
              o
            );
          },
        };
      },
      92758: function (e, t, n) {
        "use strict";
        n(45477), n(84392), n(56806), n(95234), n(31083);
        var i = {
          redirectToRuntime: function (e, t, n) {
            var r = t + "/runtime";
            return i.redirectTo(r, n, !0);
          },
          replaceLastPathFragment: function (e, t, n, r) {
            var a = t.replace(/[^/]*$/, e);
            return i.redirectTo(a, n, r);
          },
          redirectTo: function (e, t, n) {
            var i,
              r = [];
            if (t && n) {
              var a = "[object Array]" === Object.prototype.toString.call(n);
              for (i in t)
                (a && -1 === n.indexOf(i)) ||
                  r.push(i + "=" + encodeURIComponent(t[i]));
            }
            return e + (r.length ? "?" + r.join("&") : "");
          },
        };
        e.exports = i;
      },
      51344: function (e, t, n) {
        "use strict";
        n(7089),
          n(82447),
          n(84735),
          n(72595),
          n(67559),
          n(85541),
          n(84392),
          n(56806),
          n(31083),
          n(42919);
        var i = n(43909),
          r = n(40271),
          a = n(65650);
        function o(e) {
          return encodeURI(e).replace(/#/g, "%23");
        }
        function s(e, t) {
          return i.isObject(e)
            ? (function (e) {
                return Object.keys(e).reduce(function (t, n) {
                  var i = e[n];
                  return null != i && (t[n] = i), t;
                }, {});
              })(
                (function (e, t) {
                  return Object.keys(e).reduce(function (n, i) {
                    var r = e[i];
                    return a(t, i) && (n[i] = r), n;
                  }, {});
                })(e, t)
              )
            : e;
        }
        function c(e, t) {
          return t.map(l.bind(null, e));
        }
        function l(e, t) {
          return { type: e, operator: "eq", value: t };
        }
        function u(e, t, n, o) {
          var s = (function (e, t) {
              var n = e.type.value.key,
                i = e.operator.value.key;
              (function (e) {
                return -1 !== e.indexOf("Date");
              })(n) && (n = n.slice(0, -4));
              (function (e) {
                return a(["After", "Before", "Like"], e);
              })(i) &&
                !a(t, n) &&
                (n += i);
              return n;
            })(o, t),
            c = (function (e) {
              if (e.basic) return !0;
              return (function (e, t, n) {
                var i = /(\\%)|(\\_)/g,
                  a = /(%)|(_)/;
                if (
                  !(
                    ("like" !== n.toLowerCase() &&
                      "notlike" !== n.toLowerCase()) ||
                    a.test(t.replace(i, ""))
                  )
                )
                  return "%" + t + "%";
                if (p.test(t))
                  return r(t, r.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
                return e || t;
              })(e.value.key, e.value.value, e.operator.value.key);
            })(o);
          return (
            a(t, s) &&
              (c = (function (e, t) {
                return {
                  name: e.name.value,
                  operator: e.operator.value.key,
                  value: d(t),
                };
              })(o, c)),
            a(e, s)
              ? (n[s] = (function (e, t, n) {
                  return i.isArray(e[t]) ? e[t].concat([n]) : [n];
                })(n, s, c))
              : (n[s] = c),
            n
          );
        }
        e.exports = {
          getSearchQueryForSearchType: function (e, t) {
            return (
              (t = [].concat(t)), o("searchQuery=" + JSON.stringify(c(e, t)))
            );
          },
          getActivityIdsFromUrlParams: function (e, t) {
            var n = JSON.parse(t.searchQuery || "[]");
            return (function (e, t) {
              return t
                .filter(function (t) {
                  return t.type === e;
                })
                .map(function (e) {
                  return e.value;
                });
            })(e, n);
          },
          replaceActivitiesInSearchQuery: function (e, t, n) {
            return (function (e, t) {
              return t.filter(function (t) {
                return t.type !== e;
              });
            })(t, e).concat(c(t, n));
          },
          createSearchQueryForSearchWidget: function (e, t, n) {
            return (
              (e = i.isArray(e) ? e : []),
              (t = i.isArray(t) ? t : []),
              (n = i.isArray(n) ? n : ["variables"]),
              (t = t.concat(n)),
              e.reduce(u.bind(null, t, n), {})
            );
          },
          shouldUpdateFilter: function (e, t, n) {
            return (n = i.isArray(n) ? n : []), !i.equals(s(e, n), s(t, n));
          },
          createSearchesForActivityIds: c,
          encodeQuery: o,
          updateSearchValuesForTypeInCtrlMode: function (e, t, n) {
            var i = (function (e, t, n) {
                return e.filter(function (e) {
                  return e.type !== n || !a(t, e.value);
                });
              })(e, n, t),
              r = (function (e, t, n) {
                var i = t
                  .filter(function (e) {
                    return e.type === n;
                  })
                  .map(function (e) {
                    return e.value;
                  });
                return e.filter(function (e) {
                  return !a(i, e);
                });
              })(n, e, t);
            return i.concat(c(t, r));
          },
        };
        var p =
          /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/;
        function d(e) {
          return isNaN(e) || "" === e.trim()
            ? "true" === e ||
                ("false" !== e &&
                  ("NULL" === e
                    ? null
                    : 0 === e.indexOf("'") &&
                      e.lastIndexOf("'") === e.length - 1
                    ? e.substr(1, e.length - 2)
                    : e))
            : +e;
        }
      },
      21605: function (e) {
        "use strict";
        e.exports = function (e) {
          e.decorator("uibPaginationDirective", [
            "$delegate",
            "uibPaginationConfig",
            "$translate",
            function (e, t, n) {
              return (
                (t.firstText = n.instant("PAGINATION_FIRST")),
                (t.lastText = n.instant("PAGINATION_LAST")),
                (t.previousText = n.instant("PAGINATION_PREVIOUS")),
                (t.nextText = n.instant("PAGINATION_NEXT")),
                e
              );
            },
          ]);
        };
      },
      96776: function (e, t, n) {
        "use strict";
        function i(e) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            i(e)
          );
        }
        n(36180),
          n(51980),
          n(32157),
          n(28186),
          n(24421),
          n(77674),
          n(57507),
          n(72595),
          n(553),
          n(27216),
          n(2108),
          n(54363),
          n(1164),
          n(38179),
          n(85174),
          n(85541),
          n(17922),
          n(30129),
          n(19824),
          n(7089),
          n(82447),
          n(84735),
          n(67559),
          n(84392),
          n(17003),
          n(43387),
          n(66893),
          n(98602);
        var r = n(1703);
        function a(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function o(e, t, n) {
          var r;
          return (
            (r = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" != i(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(r) ? r : String(r)) in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function s() {
          s = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            a =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            c = o.iterator || "@@iterator",
            l = o.asyncIterator || "@@asyncIterator",
            u = o.toStringTag || "@@toStringTag";
          function p(e, t, n) {
            return (
              Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[t]
            );
          }
          try {
            p({}, "");
          } catch (e) {
            p = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function d(e, t, n, i) {
            var r = t && t.prototype instanceof b ? t : b,
              o = Object.create(r.prototype),
              s = new N(i || []);
            return a(o, "_invoke", { value: k(e, n, s) }), o;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = d;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function w() {}
          function _() {}
          var E = {};
          p(E, c, function () {
            return this;
          });
          var x = Object.getPrototypeOf,
            S = x && x(x(D([])));
          S && S !== n && r.call(S, c) && (E = S);
          var I = (_.prototype = b.prototype = Object.create(E));
          function A(e) {
            ["next", "throw", "return"].forEach(function (t) {
              p(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function C(e, t) {
            function n(a, o, s, c) {
              var l = f(e[a], e, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  p = u.value;
                return p && "object" == i(p) && r.call(p, "__await")
                  ? t.resolve(p.__await).then(
                      function (e) {
                        n("next", e, s, c);
                      },
                      function (e) {
                        n("throw", e, s, c);
                      }
                    )
                  : t.resolve(p).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var o;
            a(this, "_invoke", {
              value: function (e, i) {
                function r() {
                  return new t(function (t, r) {
                    n(e, i, t, r);
                  });
                }
                return (o = o ? o.then(r, r) : r());
              },
            });
          }
          function k(t, n, i) {
            var r = h;
            return function (a, o) {
              if (r === m) throw new Error("Generator is already running");
              if (r === g) {
                if ("throw" === a) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = a, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var c = T(s, i);
                  if (c) {
                    if (c === y) continue;
                    return c;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (r === h) throw ((r = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                r = m;
                var l = f(t, n, i);
                if ("normal" === l.type) {
                  if (((r = i.done ? g : v), l.arg === y)) continue;
                  return { value: l.arg, done: i.done };
                }
                "throw" === l.type &&
                  ((r = g), (i.method = "throw"), (i.arg = l.arg));
              }
            };
          }
          function T(t, n) {
            var i = n.method,
              r = t.iterator[i];
            if (r === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  T(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var a = f(r, t.iterator, n.arg);
            if ("throw" === a.type)
              return (
                (n.method = "throw"), (n.arg = a.arg), (n.delegate = null), y
              );
            var o = a.arg;
            return o
              ? o.done
                ? ((n[t.resultName] = o.value),
                  (n.next = t.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = e)),
                  (n.delegate = null),
                  y)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                y);
          }
          function L(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function O(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function N(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function D(t) {
            if (t || "" === t) {
              var n = t[c];
              if (n) return n.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var a = -1,
                  o = function n() {
                    for (; ++a < t.length; )
                      if (r.call(t, a))
                        return (n.value = t[a]), (n.done = !1), n;
                    return (n.value = e), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(i(t) + " is not iterable");
          }
          return (
            (w.prototype = _),
            a(I, "constructor", { value: _, configurable: !0 }),
            a(_, "constructor", { value: w, configurable: !0 }),
            (w.displayName = p(_, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === w || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, _)
                  : ((e.__proto__ = _), p(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(I)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            A(C.prototype),
            p(C.prototype, l, function () {
              return this;
            }),
            (t.AsyncIterator = C),
            (t.async = function (e, n, i, r, a) {
              void 0 === a && (a = Promise);
              var o = new C(d(e, n, i, r), a);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            A(I),
            p(I, u, "Generator"),
            p(I, c, function () {
              return this;
            }),
            p(I, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (e) {
              var t = Object(e),
                n = [];
              for (var i in t) n.push(i);
              return (
                n.reverse(),
                function e() {
                  for (; n.length; ) {
                    var i = n.pop();
                    if (i in t) return (e.value = i), (e.done = !1), e;
                  }
                  return (e.done = !0), e;
                }
              );
            }),
            (t.values = D),
            (N.prototype = {
              constructor: N,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = e);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var n = this;
                function i(i, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    r && ((n.method = "next"), (n.arg = e)),
                    !!r
                  );
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var o = this.tryEntries[a],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var c = r.call(o, "catchLoc"),
                      l = r.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    r.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var a = i;
                    break;
                  }
                }
                a &&
                  ("break" === e || "continue" === e) &&
                  a.tryLoc <= t &&
                  t <= a.finallyLoc &&
                  (a = null);
                var o = a ? a.completion : {};
                return (
                  (o.type = e),
                  (o.arg = t),
                  a
                    ? ((this.method = "next"), (this.next = a.finallyLoc), y)
                    : this.complete(o)
                );
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && t && (this.next = t),
                  y
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.finallyLoc === e)
                    return this.complete(n.completion, n.afterLoc), O(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var r = i.arg;
                      O(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: D(t),
                    resultName: n,
                    nextLoc: i,
                  }),
                  "next" === this.method && (this.arg = e),
                  y
                );
              },
            }),
            t
          );
        }
        function c(e, t, n, i, r, a, o) {
          try {
            var s = e[a](o),
              c = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(c) : Promise.resolve(c).then(i, r);
        }
        (window.$ = window.jQuery = n(25447)),
          (window.define = r.define),
          (window.require = r.require),
          (window.bust = "7.23.0-alpha4"),
          (window.DOMPurify = n(631));
        var l = document.querySelector("base").getAttribute("app-root"),
          u = "".concat(l, "/app/welcome/");
        r.requirejs.config({
          baseUrl: u,
          urlArgs: "bust=".concat("7.23.0-alpha4"),
        });
        var p,
          d = ((p = s().mark(function e() {
            var t, n;
            return s().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (t =
                        u + "scripts/config.js?bust=" + new Date().getTime()),
                      (e.next = 3),
                      import(t)
                    );
                  case 3:
                    return (
                      (n = e.sent.default),
                      (window.camWelcomeConf = n),
                      e.abrupt("return", n)
                    );
                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e);
          })),
          function () {
            var e = this,
              t = arguments;
            return new Promise(function (n, i) {
              var r = p.apply(e, t);
              function a(e) {
                c(r, n, i, a, o, "next", e);
              }
              function o(e) {
                c(r, n, i, a, o, "throw", e);
              }
              a(void 0);
            });
          })();
        (0, r.define)("camunda-welcome-bootstrap", function () {
          var e = function (e) {
            r.requirejs.config({ baseUrl: "../../../lib" });
            var t = n(38966);
            t.exposePackages(window),
              (0, r.requirejs)(
                ["".concat(l, "/lib/globalize.js")],
                function (n) {
                  n(
                    r.requirejs,
                    [
                      "angular",
                      "camunda-commons-ui",
                      "camunda-bpm-sdk-js",
                      "jquery",
                      "angular-data-depend",
                      "moment",
                      "events",
                    ],
                    window
                  );
                  var i = window.PLUGIN_PACKAGES || [],
                    s = window.PLUGIN_DEPENDENCIES || [];
                  (i = i.filter(function (e) {
                    return e.name.startsWith("welcome-plugin-legacy");
                  })),
                    (s = s.filter(function (e) {
                      return e.requirePackageName.startsWith(
                        "welcome-plugin-legacy"
                      );
                    })),
                    i.forEach(function (e) {
                      var t = document.createElement("link");
                      t.setAttribute("rel", "stylesheet"),
                        t.setAttribute(
                          "href",
                          e.location +
                            "/plugin.css?bust=".concat("7.23.0-alpha4")
                        ),
                        document.head.appendChild(t);
                    }),
                    r.requirejs.config({
                      packages: i,
                      baseUrl: "./",
                      paths: { ngDefine: "".concat(l, "/lib/ngDefine") },
                    });
                  var c = ["angular", "ngDefine"].concat(
                    s.map(function (e) {
                      return e.requirePackageName;
                    })
                  );
                  (0, r.requirejs)(c, function (n) {
                    if (
                      (e &&
                        e.csrfCookieName &&
                        n.module("cam.commons").config([
                          "$httpProvider",
                          function (t) {
                            t.defaults.xsrfCookieName = e.csrfCookieName;
                          },
                        ]),
                      void 0 !== e && e.requireJsConfig)
                    ) {
                      var i = e.requireJsConfig || {},
                        c = {};
                      [
                        "baseUrl",
                        "paths",
                        "bundles",
                        "shim",
                        "map",
                        "config",
                        "packages",
                        "waitSeconds",
                        "context",
                        "callback",
                        "enforceDefine",
                        "xhtml",
                        "urlArgs",
                        "scriptType",
                      ].forEach(function (e) {
                        i[e] && (c[e] = i[e]);
                      }),
                        r.requirejs.config(
                          (function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var n = null != arguments[t] ? arguments[t] : {};
                              t % 2
                                ? a(Object(n), !0).forEach(function (t) {
                                    o(e, t, n[t]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(
                                    e,
                                    Object.getOwnPropertyDescriptors(n)
                                  )
                                : a(Object(n)).forEach(function (t) {
                                    Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                    );
                                  });
                            }
                            return e;
                          })({ baseUrl: "../" }, c)
                        ),
                        (0, r.requirejs)(i.deps || [], function () {
                          n.module("cam.welcome.custom", i.ngDeps),
                            l(),
                            t.init(s);
                        });
                    } else
                      n.module("cam.welcome.custom", []),
                        (0, r.require)([], function () {
                          l(), t.init(s);
                        });
                    function l() {
                      (window.define = void 0), (window.require = void 0);
                    }
                  });
                }
              );
          };
          d.then(function (t) {
            return e(t);
          });
        }),
          (0, r.requirejs)(["camunda-welcome-bootstrap"], function () {});
      },
      38966: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.exposePackages = function (e) {
            (e.angular = l),
              (e.jquery = i),
              (e["camunda-commons-ui"] = r),
              (e["camunda-bpm-sdk-js"] = a),
              (e["cam-common"] = o),
              (e.lodash = s);
          }),
          (t.init = function (e) {
            var t = [
                "ng",
                "ngResource",
                "pascalprecht.translate",
                r.name,
                u.name,
                p.name,
                d.name,
                f.name,
              ].concat(
                e.map(function (e) {
                  return e.ngModuleName;
                })
              ),
              a = l.module(c, t);
            function o(e) {
              var t = i("base").attr(e);
              if (!e)
                throw new Error("Uri base for " + e + " could not be resolved");
              return t;
            }
            var s = [
              "$routeProvider",
              "UriProvider",
              "$animateProvider",
              "$qProvider",
              "$provide",
              function (e, t, n, i, r) {
                h(r),
                  e.otherwise({ redirectTo: "/welcome" }),
                  t.replace(":appRoot", o("app-root")),
                  t.replace(":appName", "welcome"),
                  t.replace("app://", o("href")),
                  t.replace("adminbase://", o("app-root") + "/app/admin/"),
                  t.replace("welcome://", o("welcome-api")),
                  t.replace("admin://", o("admin-api") + "../admin/"),
                  t.replace("plugin://", o("welcome-api") + "plugin/"),
                  t.replace("engine://", o("engine-api")),
                  t.replace(":engine", [
                    "$window",
                    function (e) {
                      var t = e.location.href.match(
                        /\/app\/welcome\/([\w-]+)(|\/)/
                      );
                      if (t) return t[1];
                      throw new Error("no process engine selected");
                    },
                  ]),
                  n.classNameFilter(/angular-animate/),
                  i.errorOnUnhandledRejections(!1);
              },
            ];
            a.provider(
              "configuration",
              n(65015)(window.camWelcomeConf, "Welcome")
            ),
              a.controller("WelcomePage", n(18135)),
              a.config(s),
              n(86244)(a, o("app-root"), "welcome"),
              n(96079)(window.camWelcomeConf, a, "welcome").then(function () {
                l.bootstrap(document.documentElement, [
                  a.name,
                  "cam.welcome.custom",
                ]),
                  top !== window &&
                    window.parent.postMessage({ type: "loadamd" }, "*");
              });
          }),
          n(7089),
          n(84735),
          n(67559),
          n(56806),
          n(54062),
          n(31083);
        var i = window.jQuery;
        n(27217);
        var r = n(40932),
          a = n(59721),
          o = n(91847),
          s = n(19214),
          c = "cam.welcome",
          l = n(43909),
          u = n(95057),
          p = n(19535),
          d = n(33809),
          f = n(37317),
          h = n(21605);
      },
      18135: function (e) {
        "use strict";
        e.exports = [
          "configuration",
          function (e) {
            (this.appVendor = e.getAppVendor()),
              (this.appName = e.getAppName());
          },
        ];
      },
      18957: function (e, t, n) {
        "use strict";
        var i = n(41487);
        e.exports = [
          "customLinks",
          function (e) {
            return {
              restrict: "A",
              template: i,
              replace: !0,
              link: function (t) {
                t.links = e;
              },
            };
          },
        ];
      },
      19535: function (e, t, n) {
        "use strict";
        var i = n(43909),
          r = n(77217),
          a = n(18957),
          o = i.module("cam.welcome.directives", []);
        o.directive("userProfile", r),
          o.directive("customLinks", a),
          (e.exports = o);
      },
      77217: function (e, t, n) {
        "use strict";
        var i = n(67375),
          r = n(43909);
        e.exports = [
          "camAPI",
          "Notifications",
          "$translate",
          function (e, t, n) {
            return {
              restrict: "A",
              template: i,
              scope: { username: "=" },
              replace: !0,
              link: function (i) {
                (i.visibleForm = null),
                  (i.showForm = function (e) {
                    i.visibleForm = e || null;
                  }),
                  (i.processing = !1),
                  (i.user = { id: i.username }),
                  (i.password = {
                    current: null,
                    new: null,
                    confirmation: null,
                    valid: !0,
                  });
                var a = (i.groupPages = { current: 1, size: 25, total: 0 }),
                  o = e.resource("group");
                o.count({ member: i.user.id }).then(function (e) {
                  a.total = e.count;
                }),
                  (i.loadGroups = function () {
                    o.list(
                      {
                        firstResult: a.size * (a.current - 1),
                        maxResults: a.size,
                        member: i.user.id,
                      },
                      function (e, t) {
                        if (e) throw e;
                        i.user.groups = t;
                      }
                    );
                  }),
                  i.loadGroups();
                var s = e.resource("user");
                function c() {
                  (i.passwordsMismatch =
                    i.changePassword.confirmation.$dirty &&
                    i.password.new !== i.password.confirmation),
                    i.changePassword.confirmation.$setValidity(
                      "mismatch",
                      !i.passwordsMismatch
                    );
                }
                s.profile({ id: i.user.id }, function (e, t) {
                  (i.persistedProfile = t),
                    r.extend(i.user, t),
                    (i.$root.userFullName = t.firstName + " " + t.lastName);
                }),
                  (i.submitProfile = function () {
                    (i.processing = !0),
                      s.updateProfile(i.user, function (e) {
                        (i.processing = !1),
                          e
                            ? t.addMessage({
                                status: n.instant("ERROR_WHILE_SAVING"),
                                message: e.message,
                                http: !0,
                                exclusive: ["http"],
                                duration: 5e3,
                              })
                            : (i.userProfile.$setPristine(),
                              (i.persistedProfile = r.copy(i.user)),
                              t.addMessage({
                                status: n.instant("CHANGES_SAVED"),
                                message: "",
                                http: !0,
                                exclusive: ["http"],
                                duration: 5e3,
                              }),
                              i.showForm());
                      });
                  }),
                  i.$watch("password.new", c),
                  i.$watch("password.confirmation", c),
                  i.$watch("changePassword.new.$dirty", c),
                  i.$watch("changePassword.confirmation.$dirty", c),
                  (i.submitPassword = function () {
                    (i.processing = !0),
                      s.updateCredentials(
                        {
                          id: i.user.id,
                          password: i.password.confirmation,
                          authenticatedUserPassword: i.password.current,
                        },
                        function (e) {
                          (i.processing = !1),
                            e
                              ? t.addMessage({
                                  status: n.instant(
                                    "ERROR_WHILE_CHANGING_PASSWORD"
                                  ),
                                  message: e.message,
                                  http: !0,
                                  exclusive: ["http"],
                                  duration: 5e3,
                                })
                              : (i.changePassword.$setPristine(),
                                (i.password = {
                                  current: null,
                                  new: null,
                                  confirmation: null,
                                }),
                                t.addMessage({
                                  status: n.instant("PASSWORD_CHANGED"),
                                  message: "",
                                  http: !0,
                                  exclusive: ["http"],
                                  duration: 5e3,
                                }),
                                i.showForm());
                        }
                      );
                  }),
                  (i.translate = function (e, t) {
                    return n.instant(e, t);
                  });
              },
            };
          },
        ];
      },
      95057: function (e, t, n) {
        "use strict";
        var i = n(43909),
          r = n(55398),
          a = i.module("cam.welcome.pages", []);
        a.config(r), (e.exports = a);
      },
      55398: function (e, t, n) {
        "use strict";
        var i = n(24904),
          r = [
            "$routeProvider",
            function (e) {
              e.when("/welcome", {
                template: i,
                controller: [
                  "$scope",
                  "Views",
                  "Uri",
                  function (e, t, n) {
                    var i = e.$root.authentication;
                    (e.canAccessApp = function (e) {
                      return i.authorizedApps.indexOf(e) > -1;
                    }),
                      (e.columnWidth = function () {
                        return 12 / (i.authorizedApps.length - 1);
                      }),
                      (e.profilePlugins = t.getProviders({
                        component: "welcome.profile",
                      })),
                      (e.plugins = t.getProviders({
                        component: "welcome.dashboard",
                      })),
                      (e.currentEngine = n.appUri(":engine"));
                  },
                ],
                authentication: "required",
                reloadOnSearch: !1,
              });
            },
          ];
        e.exports = r;
      },
      37317: function (e, t, n) {
        "use strict";
        var i = n(43909),
          r = n(5013),
          a = i.module("cam.welcome.plugins", []);
        a.config(r), (e.exports = a);
      },
      5013: function (e) {
        "use strict";
        var t = function (e) {
          e.registerDefaultView("welcome.profile", {
            id: "user-profile",
            template:
              '<div user-profile username="$root.authentication.name"></div>',
            controller: function () {},
            priority: 200,
          });
        };
        (t.$inject = ["ViewsProvider"]), (e.exports = t);
      },
      87376: function (e) {
        "use strict";
        var t = [
          {
            label: "DOCUMENTATION",
            href: "https://docs.camunda.org/manual/latest/webapps/",
            description: "DOCUMENTATION_DESCRIPTION",
          },
        ];
        e.exports = [
          "$window",
          function (e) {
            return e.camWelcomeConf && e.camWelcomeConf.links
              ? e.camWelcomeConf.links
              : t;
          },
        ];
      },
      33809: function (e, t, n) {
        "use strict";
        var i = n(43909),
          r = n(10505),
          a = n(87376),
          o = i.module("cam.welcome.services", []);
        o.factory("camAPI", r), o.factory("customLinks", a), (e.exports = o);
      },
      98602: function (e, t, n) {
        "use strict";
        n.r(t);
      },
      35358: function (e, t, n) {
        var i = {
          "./af": 88866,
          "./af.js": 88866,
          "./ar": 28894,
          "./ar-dz": 67629,
          "./ar-dz.js": 67629,
          "./ar-kw": 83965,
          "./ar-kw.js": 83965,
          "./ar-ly": 98348,
          "./ar-ly.js": 98348,
          "./ar-ma": 73021,
          "./ar-ma.js": 73021,
          "./ar-ps": 54530,
          "./ar-ps.js": 54530,
          "./ar-sa": 29031,
          "./ar-sa.js": 29031,
          "./ar-tn": 93361,
          "./ar-tn.js": 93361,
          "./ar.js": 28894,
          "./az": 9590,
          "./az.js": 9590,
          "./be": 23312,
          "./be.js": 23312,
          "./bg": 3162,
          "./bg.js": 3162,
          "./bm": 7928,
          "./bm.js": 7928,
          "./bn": 22257,
          "./bn-bd": 97164,
          "./bn-bd.js": 97164,
          "./bn.js": 22257,
          "./bo": 54370,
          "./bo.js": 54370,
          "./br": 32981,
          "./br.js": 32981,
          "./bs": 40918,
          "./bs.js": 40918,
          "./ca": 63669,
          "./ca.js": 63669,
          "./cs": 91587,
          "./cs.js": 91587,
          "./cv": 71267,
          "./cv.js": 71267,
          "./cy": 27629,
          "./cy.js": 27629,
          "./da": 74838,
          "./da.js": 74838,
          "./de": 52061,
          "./de-at": 17058,
          "./de-at.js": 17058,
          "./de-ch": 24276,
          "./de-ch.js": 24276,
          "./de.js": 52061,
          "./dv": 64103,
          "./dv.js": 64103,
          "./el": 79300,
          "./el.js": 79300,
          "./en-au": 5597,
          "./en-au.js": 5597,
          "./en-ca": 615,
          "./en-ca.js": 615,
          "./en-gb": 22862,
          "./en-gb.js": 22862,
          "./en-ie": 4229,
          "./en-ie.js": 4229,
          "./en-il": 5294,
          "./en-il.js": 5294,
          "./en-in": 90372,
          "./en-in.js": 90372,
          "./en-nz": 51591,
          "./en-nz.js": 51591,
          "./en-sg": 57045,
          "./en-sg.js": 57045,
          "./eo": 27181,
          "./eo.js": 27181,
          "./es": 14297,
          "./es-do": 90567,
          "./es-do.js": 90567,
          "./es-mx": 99867,
          "./es-mx.js": 99867,
          "./es-us": 6398,
          "./es-us.js": 6398,
          "./es.js": 14297,
          "./et": 16332,
          "./et.js": 16332,
          "./eu": 21555,
          "./eu.js": 21555,
          "./fa": 49736,
          "./fa.js": 49736,
          "./fi": 46240,
          "./fi.js": 46240,
          "./fil": 1446,
          "./fil.js": 1446,
          "./fo": 77430,
          "./fo.js": 77430,
          "./fr": 75665,
          "./fr-ca": 11814,
          "./fr-ca.js": 11814,
          "./fr-ch": 76557,
          "./fr-ch.js": 76557,
          "./fr.js": 75665,
          "./fy": 16368,
          "./fy.js": 16368,
          "./ga": 45265,
          "./ga.js": 45265,
          "./gd": 19598,
          "./gd.js": 19598,
          "./gl": 16614,
          "./gl.js": 16614,
          "./gom-deva": 74007,
          "./gom-deva.js": 74007,
          "./gom-latn": 98632,
          "./gom-latn.js": 98632,
          "./gu": 99037,
          "./gu.js": 99037,
          "./he": 49278,
          "./he.js": 49278,
          "./hi": 80618,
          "./hi.js": 80618,
          "./hr": 17615,
          "./hr.js": 17615,
          "./hu": 79758,
          "./hu.js": 79758,
          "./hy-am": 22761,
          "./hy-am.js": 22761,
          "./id": 59728,
          "./id.js": 59728,
          "./is": 46101,
          "./is.js": 46101,
          "./it": 3072,
          "./it-ch": 45626,
          "./it-ch.js": 45626,
          "./it.js": 3072,
          "./ja": 89076,
          "./ja.js": 89076,
          "./jv": 65489,
          "./jv.js": 65489,
          "./ka": 52845,
          "./ka.js": 52845,
          "./kk": 93507,
          "./kk.js": 93507,
          "./km": 86505,
          "./km.js": 86505,
          "./kn": 36144,
          "./kn.js": 36144,
          "./ko": 43015,
          "./ko.js": 43015,
          "./ku": 56193,
          "./ku-kmr": 94330,
          "./ku-kmr.js": 94330,
          "./ku.js": 56193,
          "./ky": 45813,
          "./ky.js": 45813,
          "./lb": 33643,
          "./lb.js": 33643,
          "./lo": 82448,
          "./lo.js": 82448,
          "./lt": 85089,
          "./lt.js": 85089,
          "./lv": 24255,
          "./lv.js": 24255,
          "./me": 75771,
          "./me.js": 75771,
          "./mi": 80887,
          "./mi.js": 80887,
          "./mk": 57529,
          "./mk.js": 57529,
          "./ml": 75916,
          "./ml.js": 75916,
          "./mn": 71318,
          "./mn.js": 71318,
          "./mr": 84770,
          "./mr.js": 84770,
          "./ms": 52657,
          "./ms-my": 16844,
          "./ms-my.js": 16844,
          "./ms.js": 52657,
          "./mt": 22532,
          "./mt.js": 22532,
          "./my": 76935,
          "./my.js": 76935,
          "./nb": 51161,
          "./nb.js": 51161,
          "./ne": 33964,
          "./ne.js": 33964,
          "./nl": 26875,
          "./nl-be": 33269,
          "./nl-be.js": 33269,
          "./nl.js": 26875,
          "./nn": 91293,
          "./nn.js": 91293,
          "./oc-lnc": 11805,
          "./oc-lnc.js": 11805,
          "./pa-in": 45432,
          "./pa-in.js": 45432,
          "./pl": 20125,
          "./pl.js": 20125,
          "./pt": 39621,
          "./pt-br": 65550,
          "./pt-br.js": 65550,
          "./pt.js": 39621,
          "./ro": 79218,
          "./ro.js": 79218,
          "./ru": 78896,
          "./ru.js": 78896,
          "./sd": 85818,
          "./sd.js": 85818,
          "./se": 33033,
          "./se.js": 33033,
          "./si": 83021,
          "./si.js": 83021,
          "./sk": 6635,
          "./sk.js": 6635,
          "./sl": 63202,
          "./sl.js": 63202,
          "./sq": 18517,
          "./sq.js": 18517,
          "./sr": 11820,
          "./sr-cyrl": 59203,
          "./sr-cyrl.js": 59203,
          "./sr.js": 11820,
          "./ss": 19923,
          "./ss.js": 19923,
          "./sv": 1664,
          "./sv.js": 1664,
          "./sw": 16791,
          "./sw.js": 16791,
          "./ta": 59622,
          "./ta.js": 59622,
          "./te": 75578,
          "./te.js": 75578,
          "./tet": 68764,
          "./tet.js": 68764,
          "./tg": 55152,
          "./tg.js": 55152,
          "./th": 89133,
          "./th.js": 89133,
          "./tk": 64548,
          "./tk.js": 64548,
          "./tl-ph": 38970,
          "./tl-ph.js": 38970,
          "./tlh": 51381,
          "./tlh.js": 51381,
          "./tr": 67155,
          "./tr.js": 67155,
          "./tzl": 29591,
          "./tzl.js": 29591,
          "./tzm": 30816,
          "./tzm-latn": 3904,
          "./tzm-latn.js": 3904,
          "./tzm.js": 30816,
          "./ug-cn": 26443,
          "./ug-cn.js": 26443,
          "./uk": 20289,
          "./uk.js": 20289,
          "./ur": 3386,
          "./ur.js": 3386,
          "./uz": 97122,
          "./uz-latn": 47554,
          "./uz-latn.js": 47554,
          "./uz.js": 97122,
          "./vi": 31568,
          "./vi.js": 31568,
          "./x-pseudo": 56644,
          "./x-pseudo.js": 56644,
          "./yo": 89825,
          "./yo.js": 89825,
          "./zh-cn": 42917,
          "./zh-cn.js": 42917,
          "./zh-hk": 26185,
          "./zh-hk.js": 26185,
          "./zh-mo": 80124,
          "./zh-mo.js": 80124,
          "./zh-tw": 37281,
          "./zh-tw.js": 37281,
        };
        function r(e) {
          var t = a(e);
          return n(t);
        }
        function a(e) {
          if (!n.o(i, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          }
          return i[e];
        }
        (r.keys = function () {
          return Object.keys(i);
        }),
          (r.resolve = a),
          (e.exports = r),
          (r.id = 35358);
      },
      24820: function (e) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42"/><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42"/><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42"/><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF"/></svg>';
      },
      83263: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/auth/page/form.html --\x3e\n<form ng-submit="login()"\n      name="signinForm"\n      request-aware>\n\n  <input autofocus\n         tabindex="1"\n         type="text"\n         class="form-control"\n         placeholder="{{ \'PAGE_LOGIN_USERNAME\' | translate }}"\n         auto-fill\n         required\n         ng-model="username"></input>\n  <input tabindex="2"\n         type="password"\n         class="form-control"\n         placeholder="{{ \'PAGE_LOGIN_PASSWORD\' | translate }}"\n         auto-fill\n         required\n         ng-model="password"></input>\n  <button tabindex="3"\n          class="btn btn-lg btn-primary"\n          type="submit"\n          ng-disabled="status === \'LOADING\'">{{ \'PAGE_LOGIN_SIGN_IN_ACTION\' | translate }}\n  </button>\n</form>\n\x3c!-- / CE - camunda-commons-ui/lib/auth/page/form.html --\x3e\n';
      },
      15222: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/auth/page/login.html --\x3e\n<div class="form-signin-container">\n  <div class="form-signin">\n\n    <div class="login-header">\n      <div class="login-logo" ng-bind-html="logo"></div>\n\n      <div class="app-name">\n        {{ appName }}\n      </div>\n    </div>\n\n    <div notifications-panel\n         ng-if="signinForm.$dirty"\n         class="notifications-panel"></div>\n\n    <view\n      ng-repeat="plugin in loginPlugins"\n      data-plugin-id="{{ plugin.id }}"\n      provider="plugin"></view>\n\n    <div ng-if="showFirstLogin"\n         class="alert-info alert">\n      <div>\n        <button type="button" class="close" ng-click="dismissInfoBox()">×</button>\n        <strong class="status">{{ \'FIRST_LOGIN_HEADING\' | translate }}</strong>\n        <span class="message" ng-bind-html="FirstLoginMessage"></span>\n      </div>\n    </div>\n  </div>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/auth/page/login.html --\x3e\n';
      },
      82701: function (e) {
        "use strict";
        e.exports =
          '<li class="dropdown engine-select"\n    ng-show="engines.length > 1 && currentEngine"\n    uib-dropdown>\n\x3c!-- # CE - camunda-commons-ui/lib/directives/engineSelect.html --\x3e\n  <a href\n     class="dropdown-toggle"\n     uib-dropdown-toggle>\n    <span class="glyphicon glyphicon-info-sign glyphicon glyphicon-info-sign "\n          uib-tooltip="{{ \'DIRECTIVE_ENGINE_SELECT_TOOLTIP\' | translate }}"\n          tooltip-placement="bottom"></span>\n    {{ currentEngine.name }}\n  </a>\n  <ul uib-dropdown-menu class="dropdown-menu dropdown-menu-right">\n    <li ng-repeat="(id, engine) in engines"\n        ng-class="{ active: currentEngine.name === engine.name }">\n      <a ng-href="{{ \'app://../\' + engine.name + \'/\' | uri }}">\n        {{ engine.name }}\n      </a>\n    </li>\n  </ul>\n\x3c!-- / CE - camunda-commons-ui/lib/directives/engineSelect.html --\x3e\n</li>\n';
      },
      69064: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/directives/inPlaceTextField.html --\x3e\n<div in-place-text-field-root>\n  <div ng-if="!editing">\n    {{ context[property] }}\n    <span class="edit-toggle"\n          ng-click="enter()">\n      <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n  </div>\n\n  <form ng-if="editing"\n        ng-submit="submit()"\n        class="inline-edit"\n        name="inPlaceTextFieldForm"\n        novalidate\n        request-aware>\n\n    <fieldset>\n      \x3c!-- {{ value }} --\x3e\n      <input name="value"\n             ng-model="value"\n             type="text"\n             class="in-place-edit form-control"\n             placeholder="{{ placeholder }}"\n             autofocus\n             ng-required="isRequired">\n    </fieldset>\n\n    <div class="inline-edit-footer">\n\n      <p class="error" ng-show="error">\n        {{ error.message }}\n      </p>\n\n      <div class="btn-group">\n        <button type="submit"\n                class="btn btn-sm btn-primary"\n                ng-disabled="inPlaceTextFieldForm.$invalid">\n          <span class="glyphicon glyphicon-ok "></span>\n        </button>\n        <button type="button"\n                class="btn btn-sm btn-default"\n                ng-click="leave()">\n          <span class="glyphicon glyphicon-ban-circle"></span>\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/directives/inPlaceTextField.html --\x3e\n';
      },
      54834: function (e) {
        "use strict";
        e.exports =
          '<span ng-if="annotation" cam-widget-clipboard="annotation">\n  <span ng-click="openModal()" uib-tooltip="{{ readonly ? \'PLGN_AUDIT_SHOW_ANNOTATION\' : \'PLGN_AUDIT_EDIT_ANNOTATION\' | translate}}" tooltip-placement="top-left">\n    {{annotation}}\n  </span>\n</span>\n\n<a class="edit" ng-click="openModal()" ng-if="!annotation && !readonly" uib-tooltip="{{\'PLGN_AUDIT_ADD_ANNOTATION\' | translate}}">\n  <span class="glyphicon glyphicon-pencil"></span>\n</a>\n';
      },
      13919: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - ui/cockpit/client/scripts/directives/incidents-tab-annotation.html --\x3e\n<div class="modal-header">\n  <h3 ng-if="!readOnly" translate="PLGN_AUDIT_EDIT_MODAL_HEADER"></h3>\n  <h3 ng-if="readOnly" translate="PLGN_AUDIT_VIEW_MODAL_HEADER"></h3>\n</div>\n\n<div class="modal-body annotation-edit">\n    <div notifications-panel></div>\n  <div class="form-group"\n       ng-show="loadingState === \'INITIAL\'">\n    <div class="textarea-container">\n      <textarea ng-model="text"\n                id="value"\n                rows="10"\n                class="form-control cam-string-variable"\n                ng-change="dirty = true"\n                ng-class="{\'ng-invalid\': text.length > maxAnnotationLength}"\n                ng-readonly="readOnly"></textarea>\n\n      <span class="pull-right label label-default character-count">{{text.length}}/{{maxAnnotationLength}}</span>\n    </div>\n  </div>\n</div>\n\n<div class="modal-footer" ng-if="loadingState === \'INITIAL\'">\n  <button class="btn btn-link"\n          ng-click="$dismiss(\'close\')">\n    {{ \'CLOSE\' | translate }}\n  </button>\n  <button class="btn btn-primary"\n          ng-show="!readOnly"\n          ng-disabled="!dirty || text.length > maxAnnotationLength"\n          ng-click="updateAnnotation()">\n    {{ \'SAVE\' | translate }}\n  </button>\n</div>\n\n<div class="modal-footer" ng-if="loadingState !== \'INITIAL\'">\n  <button class="btn btn-primary"\n          ng-click="$close(text)">\n    {{ \'OK\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - ui/cockpit/client/scripts/directives/incidents-tab-annotation.html --\x3e\n';
      },
      86188: function (e) {
        "use strict";
        e.exports =
          '<div uib-alert class="alert alert-danger"\n     ng-if="error">\n  <span>\n    <strong>{{ \'CAM_WIDGET_BPMN_VIEWER_ERROR\' | translate }}</strong>\n  </span>\n  <span>\n   {{ error.message }}\n  </span>\n</div>\n\n<div ng-show="!error">\n\n  <div ng-if="!loaded" class="placeholder-container">\n    <div class="placeholder-content">\n      <span class="glyphicon glyphicon-refresh animate-spin"></span>\n      <span class="loading-text">{{ \'CAM_WIDGET_BPMN_VIEWER_LOADING\' | translate }}</span>\n    </div>\n  </div>\n\n  <div class="diagram-holder" ng-class=\'{"diagram-holder": true, "grab-cursor": !disableNavigation && !grabbing, "djs-cursor-move": !disableNavigation && grabbing}\'></div>\n\n  <div class="actions"></div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n';
      },
      5831: function (e) {
        "use strict";
        e.exports =
          '<div cam-widget-clipboard="getLink()" icon="glyphicon-link" tooltip-text="{{ \'CAM_WIDGET_COPY_LINK\' | translate }}">\n</div>\n';
      },
      31324: function (e) {
        "use strict";
        e.exports =
          '<span ng-if="!leftSide" ng-transclude></span>\n<a ng-if="!noTooltip"\n   uib-tooltip="{{ tooltipText }}"\n   tooltip-append-to-body="true"\n   ng-class="{\'copy-ok\': copyStatus === true, \'copy-error\': copyStatus === false}"\n   class="glyphicon {{icon}}"></a>\n<a ng-if="noTooltip"\n   ng-class="{\'copy-ok\': copyStatus === true, \'copy-error\': copyStatus === false}"\n   class="glyphicon {{icon}}"></a>\n<span ng-if="leftSide" ng-transclude></span>\n';
      },
      89192: function (e) {
        "use strict";
        e.exports =
          '<div uib-alert class="alert alert-danger"\n     ng-if="error">\n  <span>\n    <strong>{{ \'CAM_WIDGET_CMMN_VIEWER_ERROR\' | translate }}</strong>\n  </span>\n  <span>\n   {{ error.message }}\n  </span>\n</div>\n\n<div ng-show="!error">\n\n  <div ng-if="!loaded" class="placeholder-container">\n    <div class="placeholder-content">\n      <span class="glyphicon glyphicon-refresh animate-spin"></span>\n      <span class="loading-text">{{ \'CAM_WIDGET_CMMN_VIEWER_LOADING\' | translate }}</span>\n    </div>\n  </div>\n\n  <div class="diagram-holder" ng-class=\'{"diagram-holder": true, "grab-cursor": !disableNavigation && !grabbing, "djs-cursor-move": !disableNavigation && grabbing}\'></div>\n\n  <div class="actions"></div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n';
      },
      19142: function (e) {
        "use strict";
        e.exports =
          '<div class="debug">\n  <div class="col-xs-2"\n        ng-if="!disableToggleButton">\n    <button class="btn btn-default btn-round"\n            ng-click="toggleOpen()"\n            uib-tooltip="{{tooltip}}"\n            tooltip-placement="{{tooltipPlacement}}">\n      <span class="glyphicon"\n            ng-class="{\'glyphicon-eye-open\': !open, \'glyphicon-eye-close\': open}"></span>\n    </button>\n  </div>\n  <div class="col-xs-10"\n       ng-show="open || disableToggleButton"\n       cam-hover-area>\n    <span ng-show="extended" cam-widget-clipboard="extendedInfo"\n          no-tooltip>\n      <code>{{ extensionName }}</code>\n    </span>\n    <pre ng-show="extended">{{ extendedInfo }}</pre>\n    <span cam-widget-clipboard="debugged | json "\n          no-tooltip\n          cam-hoverable-title="data-id">\n      <code>{{ varName }}</code>\n    </span>\n    <pre cam-hover-trigger="data-id">{{ debugged | json }}</pre>\n  </div>\n</div>\n';
      },
      89496: function (e) {
        "use strict";
        e.exports =
          '<div uib-alert class="alert alert-danger"\n     ng-if="error">\n  <strong>{{ \'CAM_WIDGET_DMN_VIEWER_ERROR\' | translate }}</strong><br/>\n  {{ error.message }}\n</div>\n\n<div ng-show="!error"\n     ng-if="!loaded && !disableLoader"\n     class="placeholder-container">\n  <div class="placeholder-content">\n    {{ \'CAM_WIDGET_DMN_VIEWER_LOADING\' | translate }}<br />\n    <span class="glyphicon glyphicon-refresh animate-spin"></span>\n  </div>\n</div>\n\n<div ng-show="!error"\n     ng-class="{\n      \'grab-cursor\': isDrd && !grabbing,\n      \'cursor-move\': isDrd && grabbing\n     }"\n     class="table-holder">\n</div>\n\n<div ng-if="!error && !disableNavigation && isDrd">\n  <div class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n';
      },
      70044: function (e) {
        "use strict";
        e.exports =
          '<div class="container-fluid">\n  <div class="row">\n    <div id="footer-timezone" class="col-xs-6">\n      {{ \'CAM_WIDGET_FOOTER_TIMEZONE\' | translate }} <i>{{timezoneName}}</i>\n    </div>\n    <div class="col-xs-6">\n      {{ \'CAM_WIDGET_FOOTER_POWERED_BY\' | translate }} <a href="http://camunda.org">Celever Platform</a> /\n      <span class="version">{{version}}</span>\n    </div>\n  </div>\n</div>\n';
      },
      57752: function (e) {
        "use strict";
        e.exports =
          '<div ng-if="isEntrepriseEdition" class="ce-eol-banner"\n     ng-bind-html="trustAsHtml(\'BANNER_CE_EOL_TEXT\' | translate)">\n</div>\n\n<div class="navbar-header">\n  <button type="button"\n          class="navbar-toggle"\n          ng-class="{open: !!navbarOpen}"\n          ng-click="navbarOpen = !navbarOpen">\n    <em class="sr-only">{{ toggleNavigation }}</em>\n    <span></span>\n    <span></span>\n    <span></span>\n  </button>\n\n  <a class="navbar-brand app-banner"\n     ng-if="authentication.name"\n     href="#/"\n     title="{{ brandName }} {{ appName }}">\n     <span ng-bind-html="logo" class="brand-logo"></span>\n     <span class="brand-name" ng-cloak>{{ brandName }}</span>\n  </a>\n\n  <div class="small-screen-warning">\n    <span class="glyphicon glyphicon-exclamation-sign"\n          uib-tooltip="{{ smallScreenWarning | translate }}"\n          tooltip-placement="bottom"></span>\n  </div>\n</div>\n\n<nav class="cam-nav app-menu">\n  <ul ng-class="{collapse: !navbarOpen}">\n\n    <li engine-select></li>\n\n    <li class="account dropdown"\n        ng-if="authentication.name"\n        ng-cloak\n        uib-dropdown>\n      <a href\n         class="dropdown-toggle"\n         uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-user "></span>\n        {{ (userName || authentication.name) }}\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li class="profile"\n            ng-if="currentApp !== \'welcome\'">\n          <a ng-href="{{ \'../../welcome/:engine/\' | uri }}">\n            {{ myProfile | translate }}\n          </a>\n        </li>\n\n        <li class="divider"\n            ng-if="currentApp !== \'welcome\'"></li>\n\n        <li class="logout">\n          <a href\n             ng-click="logout()">\n            {{ signOut | translate }}\n          </a>\n        </li>\n      </ul>\n    </li>\n\n    <li class="divider-vertical"\n        ng-if="authentication.name"\n        ng-cloak></li>\n\n    <li class="app-switch dropdown"\n        ng-if="showAppDropDown"\n        uib-dropdown>\n      <a href\n         class="dropdown-toggle"\n         uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-home"></span>\n        <span class="caret"></span>\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li ng-repeat="(appName, app) in apps"\n            ng-class="appName">\n          <a ng-href="{{ (\':appRoot/app/\' + appName + \'/:engine/\' | uri) + getTargetRoute() }}">\n            {{ app.label }}\n          </a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n</nav>\n\n<div ng-transclude\n     class="sections-menu"\n     ng-class="{collapse: !navbarOpen}"></div>\n';
      },
      46152: function (e) {
        "use strict";
        e.exports =
          ' <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42"/><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42"/><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42"/><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF"/></svg>';
      },
      85364: function (e) {
        "use strict";
        e.exports =
          '<span ng-show="!editing"\n      ng-click="startEditing()"\n      ng-transclude\n      class="view-value">\n</span>\n\n<span ng-if="editing && (varType === \'datetime\' || varType === \'date\' || varType === \'time\')"\n      class="preview">\n  <span ng-if="!hasCustomDateFormat">\n    {{ formData.dateValue | camDate }}\n  </span>\n  <span ng-if="hasCustomDateFormat">\n    {{ formData.dateValue }}\n  </span>\n</span>\n\n<span ng-if="editing"\n      ng-form\n      name="inlineForm"\n      class="edit">\n\n  <input ng-if="simpleField && !isNumber"\n         class="form-control"\n         type="{{ varType }}"\n         ng-model="formData.editValue"\n         ng-keydown="handleKeydown($event)"\n         placeholder="{{ placeholder }}" />\n\n   <input ng-if="isNumber"\n          name="numberField"\n          class="form-control"\n          ng-pattern="/^[0-9]{1,7}$/"\n          ng-model="formData.editValue"\n          ng-keydown="handleKeydown($event)"\n          placeholder="{{ placeholder }}" />\n\n\n  <span ng-show="varType === \'datetime\' || varType === \'date\' || varType === \'time\'"\n        class="cam-widget-inline-field field-control datepicker">\n\n    <div class="datepicker"\n                uib-datepicker\n                ng-if="varType === \'datetime\' || varType === \'date\'"\n                type="text"\n                ng-required="true"\n                is-open="datePickerOptions.isOpen"\n                show-button-bar="false"\n                datepicker-options="datePickerOptions"\n                ng-click="$event.stopPropagation()"\n                ng-keydown="trapKeyboard($event, true); cancelOnEsc($event);"\n\n                ng-model="formData.dateValue"\n                ng-change="changeDate(this)"></div>\n\n    <div class="timepicker"\n                uib-timepicker\n                ng-if="varType === \'datetime\' || varType === \'time\'"\n                show-meridian="false"\n\n                ng-model="formData.dateValue"\n                ng-keydown="cancelOnEsc($event);"\n                ng-change="changeDate(this)"></div>\n  </span>\n\n  <input ng-if="varType === \'option\' && options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="formData.editValue"\n         ng-keydown="handleKeydown($event)"\n         uib-typeahead="option as option.value for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         typeahead-focus-first="!disableAutoselect"\n         instant-typeahead />\n  <input ng-if="varType === \'option\' && !options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="formData.editValue"\n         ng-keydown="handleKeydown($event)"\n         uib-typeahead="option for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         typeahead-focus-first="!disableAutoselect"\n         instant-typeahead />\n\n  <span ng-show="varType !== \'option\'"\n        class="cam-widget-inline-field btn-group">\n    <button type="button"\n                ng-if="(inOperator || notInOperator) && !(varType === \'datetime\' || varType === \'date\' || varType === \'time\')"\n                class="btn btn-xs btn-default"\n                ng-click="expandValue()">\n      <span class="glyphicon glyphicon-resize-full"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="changeType()"\n            ng-if="flexible">\n      <span class="glyphicon"\n            ng-class="\'glyphicon-\' + (varType === \'text\' ? \'calendar\' : \'pencil\')"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-style="{visibility: !isNumber || inlineForm.numberField.$valid ? \'visible\' : \'hidden\'}"\n            ng-click="applyChange($event);"\n            ng-keydown="cancelOnEsc($event);">\n      <span class="glyphicon glyphicon-ok"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="cancelChange($event)"\n            ng-keydown="trapKeyboard($event); cancelOnEsc($event);">\n      <span class="glyphicon glyphicon-remove"></span>\n    </button>\n  </span>\n</span>\n';
      },
      61166: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/widgets/inline-field/dialog/template.html --\x3e\n<div class="modal-header">\n  <h3 class="modal-title">{{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE\' | translate }}</h3>\n</div>\n\n<div class="modal-body">\n  <div class="inline-field-dialog">\n    <p>{{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE_CHANGE\' | translate }}</p>\n    <form class="form-horizontal">\n      <textarea ng-model="formData.editValue"\n                rows="10"\n                class="form-control"></textarea>\n    </form>\n  </div>\n</div>\n\n\n<div class="modal-footer">\n  <button class="btn btn-link"\n          ng-click="$dismiss()">\n    {{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE_BTN_CLOSE\' | translate }}\n  </button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="changeValue()">\n    {{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE_BTN_CHANGE\' | translate}}\n  </button>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/widgets/inline-field/dialog/template.html --\x3e';
      },
      64556: function (e) {
        "use strict";
        e.exports =
          '<div class="loader-state loaded"\n     ng-show="loadingState === \'LOADED\'"\n     ng-transclude></div>\n\n<div class="loader-state loading"\n     ng-if="loadingState === \'LOADING\'">\n  <span class="glyphicon glyphicon-refresh animate-spin"></span>\n  {{ textLoading }}\n</div>\n\n<div class="loader-state empty"\n     ng-if="loadingState === \'EMPTY\'">\n  {{ textEmpty }}\n</div>\n\n<div uib-alert class="loader-state alert alert-danger"\n     ng-if="loadingState === \'ERROR\'">\n  {{ textError }}\n</div>\n';
      },
      37628: function (e) {
        "use strict";
        e.exports =
          '<div class="password-input right-addon">\n  <script type="text/ng-template" id="popover">\n      <p>{{ tooltip | translate }}</p>\n\n      <ul>\n        <li ng-repeat="rule in rules"\n            translate="{{ rule.placeholder }}"\n            translate-values="{{ rule.parameter }}"\n            ng-if="!rule.valid">\n        </li>\n      </ul>\n  </script>\n\n  <i ng-if="loadingState === \'NOT_OK\' && password.length > 0" class="glyphicon glyphicon-remove-circle"></i>\n  <i ng-if="loadingState === \'OK\'" class="glyphicon glyphicon-ok-circle"></i>\n  <i ng-if="loadingState === \'LOADING\'" class="glyphicon glyphicon-refresh animate-spin"></i>\n  <input id="inputPassword"\n    name="inputPassword"\n    class="form-control"\n    type="password"\n    ng-model="password"\n    ng-invalid="true"\n    uib-popover-template="\'popover\'"\n    popover-enable="loadingState === \'NOT_OK\'"\n    popover-is-open="loadingState === \'NOT_OK\' && password.length > 0"\n    popover-trigger="\'focus\'"\n    required></input>\n</div>\n';
      },
      77376: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- CE # camunda-commons-ui/lib/widgets/search-pill/search-pill.html --\x3e\n<span class="search-label"\n      ng-class="{\'invalid\': !valid}">\n  <a href\n     ng-click="onDelete()"\n     tooltip-placement="top"\n     uib-tooltip="{{ deleteText | translate }}"\n     class="remove-search glyphicon glyphicon-remove">\n  </a>\n\n  <span cam-widget-inline-field\n        class="set-value type-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'type\')"\n        type="option"\n        options="type.values"\n        change="changeSearch(\'type\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'type\')"\n        value="type.value">\n    <span ng-if="type.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{ type.tooltip | translate }}">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!type.tooltip">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="extended">:</span>\n\n  <span ng-if="extended && potentialNames.length <= 0 && !!name.value.value"\n        cam-widget-inline-field\n        class="set-value name-field"\n        type="text"\n        tabindex="0"\n        ng-keydown="onKeydown($event,\'name\')"\n        change="changeSearch(\'name\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'name\')"\n        value="name.value.value">\n    <span ng-if="name.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{name.tooltip | translate }}">\n        {{ name.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!name.tooltip">\n        {{ name.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="extended && potentialNames.length <= 0 && !name.value.value"\n        cam-widget-inline-field\n        class="set-value name-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'name\')"\n        type="text"\n        change="changeSearch(\'name\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'name\')"\n        value="name.value">\n    <span ng-if="name.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{name.tooltip | translate }}">\n        {{ name.value | camQueryComponent }}\n    </span>\n    <span ng-if="!name.tooltip">\n        {{ name.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="extended && potentialNames.length > 0"\n        cam-widget-inline-field\n        class="set-value name-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'name\')"\n        type="option"\n        options="potentialNames"\n        allow-non-options="true"\n        disable-autoselect="disableTypeaheadAutoselect"\n        change="changeSearch(\'name\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'name\')"\n        value="name.value">\n    <span ng-if="extended && name.tooltip && name.value.key">\n      {{ name.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="extended && name.tooltip && !name.value.key">\n      {{ name.value | camQueryComponent }}\n    </span>\n    <span ng-if="extended && !name.tooltip && name.value.key">\n      {{ name.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="extended && !name.tooltip && !name.value.key">\n      {{ name.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="!basic && operator.values.length > 1"\n        cam-widget-inline-field\n        class="set-value operator-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'operator\')"\n        type="option"\n        options="operator.values"\n        change="changeSearch(\'operator\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'operator\')"\n        value="operator.value">\n    <span ng-if="operator.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{operator.tooltip | translate }}">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!operator.tooltip">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="operator.values.length < 2 && operator.tooltip"\n        tooltip-placement="top"\n        uib-tooltip="{{operator.tooltip | translate }}"\n        class="operator-field">\n    {{ operator.value.value | camQueryComponent }}\n  </span>\n  <span ng-if="operator.values.length < 2 && !operator.tooltip"\n        class="operator-field">\n    {{ operator.value.value | camQueryComponent }}\n  </span>\n\n  <span cam-widget-inline-field\n        class="set-value value-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'value\')"\n        type="{{ valueType }}"\n        in-operator="operator.value.key === \'In\'"\n        not-in-operator="operator.value.key === \'NotIn\'"\n        change="changeSearch(\'value\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'value\')"\n        ng-if="!basic"\n        options="options"\n        allow-non-options="allowNonOptions"\n        value="value.value"\n        flexible="{{ allowDates }}">\n    <span class="visible-whitespace"\n          ng-if="value.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{value.tooltip | translate }}">{{ value.value | camQueryComponent }}</span>\n    <span class="visible-whitespace"\n          ng-if="!value.tooltip">{{ value.value | camQueryComponent }}</span>\n  </span>\n</span>\n\x3c!-- CE / camunda-commons-ui/lib/widgets/search-pill/search-pill.html --\x3e\n';
      },
      91804: function (e) {
        "use strict";
        e.exports =
          '<div class="search-field">\n  <form ng-submit="createSearch()"\n        ng-class="{\'has-search\': searches.length, \'focused\': focused}">\n\n    <div class="form-container search-container"\n         ng-style="{\'padding-right\': getRightPadding()}"\n         ng-class="{\'has-icon\': !!mode}">\n      <div ng-if="isMatchAnyActive && searches.length > 0"\n           class="match-any">\n        <button ng-click="switchMatchType()"\n                type="button"\n                class="btn btn-default btn-xs"\n                ng-disabled="searches.length < 2">\n          {{ (matchAny ? \'CAM_WIDGET_SEARCH_MATCH_TYPE_ANY\' : \'CAM_WIDGET_SEARCH_MATCH_TYPE_ALL\') | translate }}\n        </button>\n        <span ng-disabled="searches.length < 2">{{ \'CAM_WIDGET_SEARCH_MATCH_TYPE\' | translate }}</span>\n        </div>\n        <span ng-if="mode" class="search-type glyphicon" ng-class="\'glyphicon-\' + mode"></span>\n      <span cam-widget-search-pill\n            ng-repeat="search in searches"\n            extended="search.extended"\n            basic="search.basic"\n            allow-dates="search.allowDates"\n            enforce-dates="search.enforceDates"\n            valid="search.valid"\n            name="search.name"\n            potential-names="search.potentialNames"\n            type="search.type"\n            operator="search.operator"\n            value="search.value"\n            options="search.options"\n            allow-non-values="search.allowNonValues"\n            invalid-text="{{ translations.invalid }}"\n            delete-text="{{ translations.deleteSearch }}"\n            on-change="handleChange($index, field, before, value, $event)"\n            on-delete="deleteSearch($index)"\n            disable-typeahead-autoselect="disableTypeaheadAutoselect"></span>\n\n      <input class="form-control main-field"\n             type="text"\n             ng-model="inputQuery"\n             ng-keydown="onKeydown($event)"\n             uib-typeahead="type as type.value for type in dropdownTypes | filter:$viewValue:instantTypeahead"\n             typeahead-on-select="createSearch($item)"\n             instant-typeahead />\n\n      <div class="ignore-case" ng-if="searchHasVariableQuery">\n        {{\'CAM_WIDGET_SEARCH_VARIABLE_CASE_ATTRIBUTE\' | translate }}\n          <label>\n            <input type="checkbox" ng-model="caseHandeling.ignoreNames" >\n            {{\'CAM_WIDGET_SEARCH_VARIABLE_CASE_NAME\' | translate}}\n          </label>\n          <label>\n            <input type="checkbox" ng-model="caseHandeling.ignoreValues">\n            {{\'CAM_WIDGET_SEARCH_VARIABLE_CASE_VALUE\' | translate}}.\n          </label>\n      </div>\n\n\n\n    </div>\n  </form>\n  <div class="controls">\n    <span ng-if="total"\n          class="total-results"\n          uib-tooltip="{{ \'CAM_WIDGET_SEARCH_TOTAL_NUMBER_RESULTS\' | translate }}">\n      {{total}}\n    </span>\n\n    <span cam-share-link></span>\n\n    <span class="dropdown stored-criteria" uib-dropdown>\n      <button ng-disabled="!searches.length && !hasCriteriaSets()"\n              class="dropdown-toggle btn btn-default" uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-floppy-disk"></span>\n        <span class="caret"></span>\n      </button>\n\n      <ul class="dropdown-menu dropdown-menu-right"\n          ng-if="searchCriteriaStorage.group || hasCriteriaSets()" uib-dropdown-menu>\n        <li ng-if="searchCriteriaStorage.group">\n          <div class="input-group input-group-sm">\n            <input type="text"\n                   class="form-control"\n                   ng-model="searchCriteriaStorage.nameInput"\n                   ng-click="storedCriteriaInputClick($event)"\n                   ng-keydown="searchCriteriaInputKeydown($event)" />\n            <span class="input-group-btn">\n              <button ng-disabled="!searchCriteriaStorage.nameInput"\n                      ng-click="storedCriteriaSaveClick($event)"\n                      class="btn btn-default"\n                      type="button">\n                <span class="glyphicon glyphicon-ok"></span>\n              </button>\n            </span>\n          </div>\n        </li>\n\n        <li role="separator"\n            class="divider"\n            ng-if="searchCriteriaStorage.group && hasCriteriaSets()"></li>\n\n        <li class="stored-criteria-set"\n            ng-if="hasCriteriaSets() && !isSearchCriteriaStorageGrouped"\n            ng-repeat="(key, value) in searchCriteriaStorage.available">\n          <div>\n            <a class="glyphicon glyphicon-remove-sign"\n              ng-click="dropCriteriaSet($event, key)"\n              href></a>\n\n            <a href\n              ng-click="loadCriteriaSet($event, key)">{{ key }}</a>\n          </div>\n        </li>\n\n        <li class="stored-criteria-set"\n            ng-if="hasCriteriaSets() && isSearchCriteriaStorageGrouped"\n            ng-repeat="(group, values) in searchCriteriaStorage.available">\n          <div ng-repeat="(name, value) in values">\n            <a class="glyphicon glyphicon-remove-sign"\n              ng-click="dropCriteriaSet($event, name, group)"\n              href></a>\n\n            <a href\n              ng-click="loadCriteriaSet($event, name, group)">{{ group }} : {{ name }}</a>\n          </div>\n        </li>\n\n      </ul>\n    </span>\n  </div>\n</div>\n';
      },
      24864: function (e) {
        "use strict";
        e.exports =
          '<div class="form-inline operation-details"\n     ng-class="{\'selection-wrap\': !isBatchOperationPage}">\n  <div ng-class="{row: isBatchOperationPage, \'selection-type\': !isBatchOperationPage}">\n    <label class="form-control-static"\n           for="instance"\n           ng-class="{\'col-xs-4 col-sm-3 text-right\': isBatchOperationPage, \'selection-label\': !isBatchOperationPage}">\n      {{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE\' | translate }}\n      <span class="glyphicon glyphicon-question-sign"\n            uib-tooltip="{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE_TOOLTIP\' | translate }}"\n            tooltip-placement="right"></span>\n    </label>\n    <span ng-class="{\'col-xs-6 col-sm-9\': isBatchOperationPage}">\n      <input type="radio"\n             name="selection_type"\n             id="instance"\n             class="form-control operation-radio"\n             ng-class="{\'selection-input\': !isBatchOperationPage}"\n             ng-model="selectionType"\n             value="INSTANCE" />\n    </span>\n  </div>\n  <div ng-class="{row: isBatchOperationPage, \'selection-type\': !isBatchOperationPage}">\n    <label class="form-control-static"\n           for="query"\n           ng-class="{\'col-xs-4 col-sm-3 text-right\': isBatchOperationPage, \'selection-label\': !isBatchOperationPage}">\n           {{ \'CAM_WIDGET_SELECTION_TYPE_QUERY\' | translate }}\n      <span class="glyphicon glyphicon-question-sign"\n            uib-tooltip="{{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_TOOLTIP\' | translate }}"\n            tooltip-placement="right"></span>\n    </label>\n    <span ng-class="{\'col-xs-6 col-sm-9\': isBatchOperationPage}">\n      <input type="radio"\n             name="selection_type"\n             id="query"\n             class="form-control operation-radio"\n             ng-class="{\'selection-input\': !isBatchOperationPage}"\n             ng-model="selectionType"\n             value="QUERY" />\n    </span>\n  </div>   \n</div>\n\n<div class="instance"\n     ng-if="selectionType === \'INSTANCE\' && toggleState === \'on\' && totalInstancesCount > pageSize">\n  <div class="alert alert-info">\n    <p>{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE_INTRO\' | translate }} {{ selectedInstancesCount }} {{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCES\' | translate }}. </p><br />\n    <p>\n      <a ng-click="updateSelectionType(\'QUERY\')">{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE_LINK\' | translate }}</a>\n    </p>\n  </div>\n</div>\n\n<div class="query"\n     ng-if="selectionType === \'QUERY\'">\n  <div class="alert alert-warning">\n    <p><strong>{{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_INTRO\' | translate }}</strong></p><br />\n    <p>\n      <strong>{{ \'CAM_WIDGET_SELECTION_TYPE_WARNING\' | translate }}</strong> {{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_WARNING\' | translate }}\n    </p><br />\n    <p>\n      <a ng-click="updateSelectionType(\'INSTANCE\')">{{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_LINK\' | translate }} <strong>{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE\' | translate }}</strong></a>\n    </p>\n  </div>\n</div>\n';
      },
      57848: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n<div class="modal-header">\n  <h3 translate="CAM_WIDGET_STRING_DIALOG_TITLE"\n      translate-values="{name: variable.name}"></h3>\n</div>\n\n<div class="modal-body">\n  <div class="form-group">\n    <label for="value"\n           cam-widget-clipboard="variable.value"\n           no-tooltip\n           ng-class="{hovered: hovered === \'var-value\'}">\n      {{ \'CAM_WIDGET_STRING_DIALOG_LABEL_VALUE\' | translate }}\n    </label>\n    <textarea ng-model="variable.value"\n              id="value"\n              rows="10"\n              class="form-control cam-string-variable"\n              ng-readonly="readonly"\n              ng-mouseenter="toggleHover(\'var-value\')"\n              ng-mouseleave="toggleHover()"></textarea>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss(\'close\')">\n    {{ \'CAM_WIDGET_STRING_DIALOG_LABEL_CLOSE\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n';
      },
      3907: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n<div class="modal-header">\n  <h3 translate="CAM_WIDGET_VARIABLE_DIALOG_INSPECT"\n      translate-values="{name: variable.name}"></h3>\n</div>\n\n<div class="modal-body">\n  <div ng-if="readonly"\n       class="form-group">\n    <label>{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_OBJECT_TYPE\' | translate }}</label>\n    <code class="form-control-static"\n          cam-widget-clipboard="variable.valueInfo.objectTypeName">{{ variable.valueInfo.objectTypeName }}</code>\n  </div>\n\n  <div ng-if="readonly"\n       class="form-group">\n    <label>{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZATION\' | translate }}</label>\n    <code class="form-control-static"\n          cam-widget-clipboard="variable.valueInfo.serializationDataFormat">{{ variable.valueInfo.serializationDataFormat }}</code>\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="object-type-name"\n           cam-widget-clipboard="variable.valueInfo.objectTypeName">{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_OBJECT_TYPE\' | translate }}</label>\n    <input type="text"\n           id="object-type-name"\n           class="form-control"\n           ng-model="variable.valueInfo.objectTypeName" />\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="serialization-data-format"\n           cam-widget-clipboard="variable.valueInfo.serializationDataFormat">{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZATION\' | translate }}</label>\n    <input type="text"\n           id="serialization-data-format"\n           class="form-control"\n           ng-model="variable.valueInfo.serializationDataFormat" />\n  </div>\n\n  <div class="form-group">\n    <label for="serialized-value"\n           cam-widget-clipboard="variable.value"\n           no-tooltip\n           ng-class="{hovered: hovered === \'var-value\'}">{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZED_VALUE\' | translate }}</label>\n    <textarea ng-model="variable.value"\n              id="serialized-value"\n              rows="10"\n              class="form-control"\n              ng-readonly="readonly"\n              ng-mouseenter="toggleHover(\'var-value\')"\n              ng-mouseleave="toggleHover()"></textarea>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss(\'close\')">\n    {{ \'CAM_WIDGET_VARIABLE_DIALOG_BTN_CLOSE\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-if="!readonly"\n          ng-readonly="!hasChanged(\'serialized\')"\n          ng-click="$close(variable)">\n    {{ \'CAM_WIDGET_VARIABLE_DIALOG_BTN_CHANGE\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n';
      },
      91740: function (e) {
        "use strict";
        e.exports =
          '<div ng-if="display && isShown(\'type\')"\n     class="type">{{ variable.type }}</div>\n<div ng-if="display && isShown(\'name\')"\n     class="name">{{ variable.name }}</div>\n<div ng-if="display && isShown(\'value\') && isPrimitive()"\n     ng-class="{null: isNull()}"\n     class="value">\n  <span ng-if="isNull()"\n        class="null-symbol">{{ \'CAM_WIDGET_VARIABLE_NULL\' | translate }}</span>\n  {{ (variable.value === null ? \'\' : variable.value.toString()) }}\n</div>\n<div ng-if="display && isShown(\'value\') && variable.type === \'Object\'"\n     ng-class="{null: isNull()}"\n     class="value">\n  <a ng-click="editVariableValue()">\n    {{ variable.valueInfo.objectTypeName }}\n  </a>\n</div>\n\n\n<div ng-if="!display"\n     class="input-group editing">\n  <div ng-if="isShown(\'type\')"\n       class="input-group-btn type">\n    <select class="form-control"\n            ng-model="variable.type"\n            ng-options="variableType for variableType in variableTypes track by variableType"\n            ng-disabled="isDisabled(\'type\')"\n            required>\n    </select>\n  </div>\x3c!-- /btn-group --\x3e\n\n  <input ng-if="isShown(\'name\')"\n         type="text"\n         class="form-control name"\n         ng-model="variable.name"\n         placeholder="varName"\n         ng-disabled="isDisabled(\'name\')"\n         required />\n\n  <div ng-if="isShown(\'value\') && !isNull()"\n       class="value-wrapper input-group"\n       ng-class="{checkbox: useCheckbox()}">\n    <div ng-if="variable.type !== \'Null\'"\n         class="input-group-btn">\n      <a ng-click="setNull()"\n         class="btn btn-default set-null"\n         ng-disabled="isDisabled(\'value\')"\n         uib-tooltip="{{ \'CAM_WIDGET_VARIABLE_SET_VALUE_NULL\' | translate }}">\n        <span class="glyphicon glyphicon-remove"></span>\n      </a>\n    </div>\n\n    <input ng-if="isPrimitive() && !useCheckbox()"\n           type="text"\n           class="form-control value"\n           ng-model="variable.value"\n           ng-disabled="isDisabled(\'value\')"\n           placeholder="{{ \'CAM_WIDGET_VARIABLE_VALUE\' | translate }}"\n           cam-variable-validator="{{variable.type}}" />\n\n    <input ng-if="useCheckbox()"\n           type="checkbox"\n           class="value"\n           ng-model="variable.value"\n           ng-disabled="isDisabled(\'value\')"\n           placeholder="{{ \'CAM_WIDGET_VARIABLE_VALUE\' | translate }}"\n           cam-variable-validator="{{variable.type}}" />\n\n    <div ng-if="variable.type === \'Object\'"\n         class="value form-control-static">\n      <a ng-click="editVariableValue()" ng-disabled="isDisabled(\'value\')">\n        {{ (variable.valueInfo.objectTypeName || \'CAM_WIDGET_VARIABLE_UNDEFINED\') | translate }}\n      </a>\n    </div>\n  </div>\n\n  <div ng-if="variable.type !== \'Null\' && isShown(\'value\') && isNull()"\n       ng-click="setNonNull()"\n       class="value-wrapper value null-value btn btn-default"\n       ng-disabled="isDisabled(\'value\')"\n       uib-tooltip="{{ \'CAM_WIDGET_VARIABLE_RESET\' | translate }}">\n    <span class="null-symbol">{{ \'CAM_WIDGET_VARIABLE_NULL\' | translate }}</span>\n  </div>\n\n  <div ng-if="variable.type === \'Null\'"\n       ng-disabled="isDisabled(\'value\')"\n       class="value-wrapper value btn no-click null-value">\n    <span class="null-symbol">{{ \'CAM_WIDGET_VARIABLE_NULL\' | translate }}</span>\n  </div>\n</div>\n';
      },
      64529: function (e) {
        "use strict";
        e.exports =
          '<div class="modal-header">\n    <h3 class="modal-title">{{ \'CAM_WIDGET_VARIABLES_TABLE_DELETE\' | translate  }}</h3>\n</div>\n\n<div class="modal-body">\n  {{ body }}\n</div>\n\n<div class="modal-footer">\n    <button ng-click="dismiss()"\n          class="btn btn-default">\n    {{ \'CAM_WIDGET_VARIABLES_TABLE_ABORT\' | translate }}\n  </button>\n  <button ng-click="submit()"\n          class="btn btn-primary"\n          ng-hide="status === \'DONE\'">\n    \n    {{ \'CAM_WIDGET_VARIABLES_TABLE_DELETE\' | translate }} \n  </button> \n</div>\n\n';
      },
      93136: function (e) {
        "use strict";
        e.exports =
          '<table class="cam-table">\n  <thead>\n  <tr>\n    <td ng-repeat="column in headers" ng-class="col-{{column.class}}">\n      <span class="{{column.class}}">{{column.content}}</span>\n      <a ng-if="column.sortable === true"\n         ng-click="changeOrder(column.request)">\n        <span class="glyphicon" ng-class="orderClass(column.request)"></span>\n      </a>\n    </td>\n    <td class="valid"\n        ng-if="validatable">\n      {{ \'CAM_WIDGET_VARIABLES_TABLE_VALID\' | translate }}\n    </td>\n    <td class="actions"\n        ng-if="editable.length">\n      Actions\n    </td>\n  </tr>\n  </thead>\n\n  <tbody>\n    <tr ng-repeat="(v, info) in variables"\n        ng-class="rowClasses(info, v)">\n      <td ng-repeat="headerClass in headerClasses track by $index"\n          ng-init="variable=info.variable"\n          ng-class="colClasses(info, headerClass, v)"\n          ng-switch on="headerClass">\n        \x3c!-- ................................................................................... --\x3e\n        <div ng-switch-when="type"\n             ng-if="!isEditable(\'type\', info)">\n          {{ variable.type }}\n        </div>\n        <select class="form-control"\n                ng-switch-when="type"\n                ng-if="isEditable(\'type\', info)"\n                ng-model="variable.type"\n                ng-options="variableType for variableType in variableTypes track by variableType"\n                required>\n        </select>\n        \x3c!-- ................................................................................... --\x3e\n\n\n        \x3c!-- ................................................................................... --\x3e\n        <div ng-switch-when="name"\n             ng-if="!isEditable(\'name\', info)">\n          <span cam-widget-clipboard="variable.name">{{ variable.name }}</span>\n        </div>\n\n        <input class="form-control"\n               ng-switch-when="name"\n               ng-model="variable.name"\n               ng-if="isEditable(\'name\', info)" />\n        \x3c!-- ................................................................................... --\x3e\n\n\n        \x3c!-- ................................................................................... --\x3e\n        <a ng-switch-when="value"\n           ng-if="!isEditable(\'value\', info) && isBinary(variable.type)"\n           ng-href="{{ downloadLink(info) }}"\n           download="{{ variable.name }}-data">\n          Download\n        </a>\n\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && variable.type === \'Object\'"\n             class="read-only value-wrapper">\n          <span ng-if="variable.valueInfo.objectTypeName"\n                cam-widget-clipboard="variable.valueInfo.objectTypeName">\n            <a ng-click="editVariableValue(v)"\n               href>{{ variable.valueInfo.objectTypeName }}</a>\n          </span>\n          <a ng-if="!variable.valueInfo.objectTypeName"\n             ng-click="editVariableValue(v)"\n             href>&lt;undefined&gt;</a>\n        </div>\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && (variable.type === \'Json\' || variable.type === \'Xml\')"\n             class="read-only value-wrapper">\n          <span cam-widget-clipboard="variable.value">\n            <a ng-click="editVariableValue(v)"\n               href>{{ variable.value }}</a>\n          </span>\n        </div>\n\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && variable.type === \'String\'"\n             class="read-only value-wrapper">\n          <span cam-widget-clipboard="variable.value">\n            <span ng-click="readStringVar(v)">{{ variable.value }}</span>\n          </span>\n        </div>\n\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && !hasEditDialog(variable.type)"\n             class="read-only value-wrapper">\n          <span ng-if="variable.type !== \'Bytes\' && variable.type !== \'Date\'"\n                cam-widget-clipboard="asString(variable.value)">{{ variable.value }}</span>\n          <span ng-if="variable.type === \'Bytes\'">{{ variable.value }}</span>\n          <span ng-if="variable.type === \'Date\'"\n                cam-widget-clipboard="variable.value">{{ variable.value | camDate }}</span>\n        </div>\n\n        <div class="value-wrapper"\n             ng-switch-when="value"\n             ng-if="isEditable(\'value\', info)">\n          <a ng-click="setNull(v)"\n             ng-if="!isNull(v)"\n             class="set-null"\n             tooltip-append-to-body="true"\n             uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_SET_NULL\' | translate }}">\n            <span class="glyphicon glyphicon-remove"></span>\n          </a>\n\n          <input ng-if="isPrimitive(variable.type) && !useCheckbox(variable.type) && !isNull(v)"\n                 type="text"\n                 class="form-control"\n                 ng-model="variable.value"\n                 placeholder="{{ \'CAM_WIDGET_VARIABLES_TABLE_PLACEHOLDER_VALUE\' | translate }}" />\n\n          <input ng-if="useCheckbox(variable.type)"\n                 type="checkbox"\n                 ng-model="variable.value"\n                 placeholder="{{ \'CAM_WIDGET_VARIABLES_TABLE_PLACEHOLDER_VALUE\' | translate }}" />\n\n          <a ng-if="variable.type === \'Object\' && !isNull(v)"\n             ng-click="editVariableValue(v)">\n            {{ variable.valueInfo.objectTypeName || \'&lt;undefined&gt;\' }}\n          </a>\n\n          <a ng-if="(variable.type === \'Json\' || variable.type === \'Xml\') && !isNull(v)"\n             ng-click="editVariableValue(v)">\n            {{ variable.value || \'&lt;undefined&gt;\' }}\n          </a>\n\n          <a ng-if="variable.type !== \'Null\' && !isBinary(variable.type) && isNull(v)"\n             ng-click="setNonNull(v)"\n             class="null-value"\n             tooltip-append-to-body="true"\n             uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_DEFAULT_VALUE\' | translate }}">\n            <span class="null-symbol">&lt;null&gt;</span>\n          </a>\n\n          <a ng-if="isBinary(variable.type)"\n             ng-click="uploadVariable(v)"\n             tooltip-append-to-body="true"\n             uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_UPLOAD\' | translate }}">\n            Upload\n          </a>\n\n          <span ng-if="variable.type === \'Null\'"\n                class="null-value">\n            <span class="null-symbol">{{ \'CAM_WIDGET_VARIABLES_TABLE_NULL\' | translate }}</span>\n          </span>\n        </div>\x3c!-- / value-wrapper --\x3e\n        \x3c!-- ................................................................................... --\x3e\n\n\n        <div ng-switch-default\n             cam-render-var-template\n             info="info"\n             header-name="headerClass">\n        </div>\n      </td>\n\n      <td class="valid"\n          ng-if="validatable">\n        <script type="text/ng-template" id="validation-error-popover">\n          <ul ng-if="info.failures.length > 0">\n            <li ng-repeat="failure in info.failures">\n              {{failure}}\n            </li>\n          </ul>\n        </script>\n        <button ng-if="info.failures.length > 0 && !info.editMode"\n                ng-click="info.showFailures = true"\n                class="btn btn-link"\n                type="button"\n                uib-popover-template="\'validation-error-popover\'"\n                popover-title="{{ \'CAM_WIDGET_VARIABLES_TABLE_VALIDATION_ERRORS\' | translate }}"\n                popover-class="cam-widget-variables-popover"\n                popover-trigger="\'none\'"\n                popover-is-open="info.showFailures"\n                popover-enable="true">\n          \x3c!-- use glyphicon-error when CAM-13580 is fixed --\x3e\n          <span class="error-sign"></span>\n        </button>\n        <span ng-if="info.failures.length === 0 && !info.editMode"\n              class="glyphicon glyphicon-ok"\n              uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_VALID\' | translate }}"></span>\n        <span ng-if="info.editMode"\n              class="glyphicon glyphicon-question-sign"\n              uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_VALID_PENDING\' | translate }}"></span>\n      </td>\n      <td class="actions"\n          ng-if="editable.length">\n        <div ng-if="!info.editMode"\n             class="btn-group">\n          <button class="btn btn-xs btn-primary"\n                  ng-disabled="!canEditVariable(info, v)"\n                  ng-click="enableEditMode(info, true)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_EDIT_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon-pencil"></span>\n          </button>\n          <button class="btn btn-xs btn-default"\n                  ng-disabled="!canEditVariable(info, v)"\n                  ng-click="deleteVariable(v)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_DELETE_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon glyphicon-trash"></span>\n          </button>\n        </div>\n\n        <div ng-if="info.editMode"\n             class="btn-group">\n          <button class="btn btn-xs btn-primary"\n                  ng-disabled="!info.valid || !info.changed"\n                  ng-click="saveVariable(v)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_SAVE_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon-ok"></span>\n          </button>\n          <button class="btn btn-xs btn-default"\n                  ng-click="enableEditMode(info, false)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_REVERT_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon-remove"></span>\n          </button>\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n';
      },
      76624: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- CE # camunda-bpm-webapp/ui/common/scripts/module/components/cam-pagination.html --\x3e\n<ul uib-pagination ng-if="Pagination.total > Pagination.pages.size"\n            class="pagination-sm"\n\n            page="Pagination.pages.current"\n            ng-model="Pagination.pages.current"\n\n            total-items="Pagination.total"\n            items-per-page="Pagination.pages.size"\n\n            max-size="7"\n            boundary-links="true"></ul>\n\x3c!-- CE / camunda-bpm-webapp/ui/common/scripts/module/components/cam-pagination.html --\x3e\n';
      },
      70390: function (e) {
        "use strict";
        e.exports =
          '<div cam-widget-search\n     cam-widget-search-total="Searchable.pages.total"\n     cam-widget-search-size="Searchable.pages.size"\n     cam-widget-search-valid-searches="Searchable.config.searches"\n     cam-widget-search-translations="Searchable.config.tooltips"\n     cam-widget-search-types="Searchable.config.types"\n     cam-widget-search-id="{{searchId}}"\n     cam-widget-search-operators="Searchable.config.operators"\n     cam-widget-search-storage-group="Searchable.storageGroup"\n     cam-widget-search-mode="filter">\n</div>\n<div cam-widget-loader\n     text-error="{{Searchable.loadingError}}"\n     text-empty="{{Searchable.textEmpty}}"\n     loading-state="{{Searchable.loadingState}}">\n\n  <div ng-transclude></div>\n\n  <ul uib-pagination ng-if="Searchable.pages.total > Searchable.pages.size"\n              class="pagination-sm"\n              page="Searchable.pages.current"\n              ng-model="Searchable.pages.current"\n              total-items="Searchable.pages.total"\n              items-per-page="Searchable.pages.size"\n              max-size="7"\n              boundary-links="true">\n  </ul>\n</div>\n';
      },
      96468: function (e) {
        "use strict";
        e.exports =
          '<ul class="nav nav-tabs"\n    ng-if="Tabs.providers.length > 1">\n  <li ng-repeat="tabProvider in Tabs.providers"\n      ng-class="{ active: Tabs.isSelected(tabProvider) }">\n    <a href ng-click="Tabs.selectTab(tabProvider)">{{ tabProvider.label | translate }}</a>\n  </li>\n</ul>\n\n<h4 ng-if="Tabs.providers.length === 1">{{ Tabs.providers[0].label | translate }}:</h4>\n\n<div class="ctn-tabbed-content ctn-scroll"\n     ng-if="Tabs.providers.length">\n  <view provider="Tabs.selected"\n        vars="Tabs.vars" />\n</div>\n';
      },
      70367: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # CE - ui/common/scripts/module/components/cam-toolbar.html --\x3e\n<div class="ctn-toolbar">\n  \x3c!-- Toolbar actions are provided by plugins --\x3e\n  <span ng-repeat="provider in providers">\n    <view provider="provider"\n          vars="vars" />\n  </span>\n</div>\n\x3c!-- / CE - ui/common/scripts/module/components/cam-toolbar.html --\x3e\n';
      },
      86368: function (e) {
        "use strict";
        e.exports =
          '<span  ng-transclude></span>\n<a ng-click="changeOrder(column)">\n  <span class="glyphicon" ng-class="orderClass(column)"></span>\n</a>';
      },
      13871: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- CE ui/common/scripts/module/external-tasks-common/components/external-task-activity-link.html --\x3e\n<a ng-href="{{Link.getLink()}}">\n  {{Link.getActivityName()}}\n</a>\n\x3c!-- / CE ui/common/scripts/module/external-tasks-common/components/external-task-activity-link.html --\x3e\n';
      },
      68754: function (e) {
        "use strict";
        e.exports =
          '<a ng-href="{{Link.getStacktraceUrl()}}" target="_blank" ng-transclude></a>\n';
      },
      93293: function (e) {
        "use strict";
        e.exports =
          '\x3c!-- # EE - ui/common/scripts/module/external-tasks-common/components/external-tasks-tab.html --\x3e\n<div cam-widget-loader\n     loading-state="{{ TasksTab.loadingState }}"\n     text-empty="{{ \'PLUGIN_EXTERNAL_TASK_NO_EXTERNAL_TASK_FOR_THIS_PROCESS\' | translate }}">\n\n  \x3c!-- transclustion target --\x3e\n  <div ng-transclude></div>\n  \x3c!-- / transclustion target --\x3e\n\n  <div cam-pagination="TasksTab.onPaginationChange(pages)" total="TasksTab.total" >\n  </div>\n</div>\n\x3c!-- / EE - ui/common/scripts/module/external-tasks-common/components/external-tasks-tab.html --\x3e\n';
      },
      41487: function (e) {
        "use strict";
        e.exports =
          '<div class="custom-links"\n     ng-if="links.length">\n  <h3 class="section-title">{{\'LINKS\' | translate}}</h3>\n  <div class="row">\n    <div ng-repeat="link in links"\n         class="col-xs-6 col-md-4 custom-link-wrapper">\n      <a ng-href="{{ link.href }}">\n        <span class="h4">{{ link.label | translate }}</span>\n      </a>\n      <span ng-if="link.description"\n            class="custom-link-description">{{ link.description | translate }}</span>\n    </div>\n  </div>\n</div>\n';
      },
      67375: function (e) {
        "use strict";
        e.exports =
          '<div class="user-profile">\n  <div class="user-profile-display"\n       ng-if="!visibleForm">\n    <h3 class="section-title">\n      {{\'PROFILE\' | translate}}\n    </h3>\n\n    <div class="user-profile-info">\n      <h4 class="user-profile-name"\n          ng-if="user.firstName || user.lastName"\n          uib-tooltip="{{ translate(\'USERNAME_FOR_AUTHENTICATION\', { username: user.id }) }}">{{ user.firstName }} {{ user.lastName }}</h4>\n      <h4 class="user-profile-name"\n          ng-if="!user.firstName && !user.lastName">{{ user.id }}</h4>\n      <div class="user-profile-email">{{ user.email }}</div>\n    </div>\n\n    <ul class="action-links list-inline">\n      <li><a ng-click="showForm(\'profile\')">{{\'EDIT_PROFILE\' | translate}}</a></li>\n      <li><a ng-click="showForm(\'password\')">{{\'CHANGE_PASSWORD\' | translate}}</a></li>\n    </ul>\n\n    <hr class="narrow"\n        ng-if="user.groups.length">\n\n    <div ng-if="user.groups.length">\n      <h4>{{\'GROUPS\' | translate}}</h4>\n      <ul class="user-profile-groups">\n        <li ng-repeat="group in user.groups"\n            ng-class="\'group-\' + group.id + \' type-\' + group.type.toLowerCase()">{{ group.name }}</li>\n      </ul>\n\n      <ul uib-pagination\n        class="pagination-sm"\n\n        page="groupPages.current"\n        ng-model="groupPages.current"\n        ng-change="loadGroups()"\n        ng-if="groupPages.total > groupPages.size"\n\n        total-items="groupPages.total"\n        items-per-page="groupPages.size"\n\n        max-size="7"\n        boundary-links="false"></ul>\n    </div>\n  </div>\n\n  <form name="userProfile"\n        class="user-profile"\n        ng-submit="submitProfile()"\n        ng-show="visibleForm === \'profile\'">\n    <h3 class="section-title">{{\'EDIT_YOUR_PROFILE\' | translate}}</h3>\n\n    <div class="form-group">\n      <label>{{\'USERNAME\' | translate}}</label>\n      <div class="form-control-static">{{ user.id }}</div>\n    </div>\n\n    <div class="form-group">\n      <label for="user-profile-firstname">{{\'FIRST_NAME\' | translate}}</label>\n      <input class="form-control"\n             id="user-profile-firstname"\n             type="text"\n             name="firstName"\n             required\n             ng-model="user.firstName"\n             placeholder="Jonny" />\n    </div>\n\n    <div class="form-group">\n      <label for="user-profile-lastname">{{\'LAST_NAME\' | translate}}</label>\n      <input class="form-control"\n             id="user-profile-lastname"\n             type="text"\n             name="lastName"\n             required\n             ng-model="user.lastName"\n             placeholder="Prosciutto" />\n    </div>\n\n    <div class="form-group">\n      <label for="user-profile-email">{{\'EMAIL\' | translate}}</label>\n      <input class="form-control"\n             id="user-profile-email"\n             type="text"\n             name="email"\n             ng-model="user.email"\n             placeholder="j.prosciutto@acme.org" />\n    </div>\n\n    <div class="form-group actions row">\n      <div class="col-xs-6">\n        <button type="button"\n                class="btn btn-link"\n                ng-click="showForm()">{{\'CANCEL\' | translate}}</button>\n      </div>\n      <div class="col-xs-6 text-right">\n        <button type="submit"\n                ng-disabled="userProfile.$invalid || userProfile.$pristine || processing"\n                class="btn btn-primary">{{\'UPDATE\' | translate}}</button>\n      </div>\n    </div>\n  </form>\n\n\n\n  <form name="changePassword"\n        class="change-password"\n        ng-submit="submitPassword()"\n        ng-show="visibleForm === \'password\'">\n    <h3 class="section-title">{{\'CHANGE_YOUR_PASSWORD\' | translate}}</h3>\n\n    <div class="form-group">\n      <label for="user-password-current">{{\'CURRENT_PASSWORD\' | translate}}</label>\n      <input class="form-control"\n             id="user-password-current"\n             type="password"\n             name="current"\n             required\n             ng-model="password.current" />\n    </div>\n\n    <div class="form-group">\n      <label for="user-password-new">{{\'NEW_PASSWORD\' | translate}}</label>\n      <div cam-widget-password\n           cam-widget-password-profile="persistedProfile"\n           cam-widget-password-password="password.new"\n           cam-widget-password-valid="password.valid"></div>\n    </div>\n\n    <div class="form-group">\n      <label for="user-password-confirmation">{{\'CONFIRM_NEW_PASSWORD\' | translate}}</label>\n      <input class="form-control"\n             id="user-password-confirmation"\n             type="password"\n             name="confirmation"\n             required\n             ng-model="password.confirmation" />\n      <div ng-if="passwordsMismatch"\n           class="help-block error">{{\'PASSWORD_NOT_MATCHING\' | translate}}</div>\n    </div>\n\n    <div class="form-group actions row">\n      <div class="col-xs-6">\n        <button type="button"\n                class="btn btn-link"\n                ng-click="showForm()">{{\'CANCEL\' | translate}}</button>\n      </div>\n      <div class="col-xs-6 text-right">\n        <button type="submit"\n                ng-disabled="changePassword.$invalid || changePassword.$pristine || processing || passwordsMismatch || !password.valid"\n                class="btn btn-primary">{{\'CHANGE_PASSWORD\' | translate}}</button>\n      </div>\n    </div>\n  </form>\n</div>\n';
      },
      24904: function (e) {
        "use strict";
        e.exports =
          '<div class="row welcome-page">\n  <div class="col-sm-8 col-xs-12">\n    <section ng-init="authorized = $root.authentication.authorizedApps"\n             class="webapps">\n      <div class="inner"\n           ng-init="cols = columnWidth()">\n        <div class="row">\n          <div class="col-xs-12">\n            <h3 class="section-title">{{\'APPLICATIONS\' | translate}}</h3>\n          </div>\n        </div>\n\n        <div class="row">\n          <div ng-if="canAccessApp(\'cockpit\')"\n               ng-class="\'col-xs-\' + cols"\n               class="cockpit-app">\n            <a class="app-label-wrapper"\n               ng-href="{{ (\':appRoot/app/cockpit/:engine/\') | uri }}">\n            </a>\n            <h3 class="app-name">\n              <a ng-href="{{ (\':appRoot/app/cockpit/:engine/\') | uri }}">{{\'COCKPIT\' | translate}}</a>\n            </h3>\n          </div>\n\n\n          <div ng-if="canAccessApp(\'tasklist\')"\n               ng-class="\'col-xs-\' + cols"\n               class="tasklist-app">\n            <a class="app-label-wrapper"\n               ng-href="{{ (\':appRoot/app/tasklist/:engine/\') | uri }}">\n            </a>\n            <h3 class="app-name">\n              <a ng-href="{{ (\':appRoot/app/tasklist/:engine/\') | uri }}">{{\'TASKLIST\' | translate}}</a>\n            </h3>\n          </div>\n\n\n          <div ng-if="canAccessApp(\'admin\')"\n               ng-class="\'col-xs-\' + cols"\n               class="admin-app">\n            <a class="app-label-wrapper"\n               ng-href="{{ (\':appRoot/app/admin/:engine/\') | uri }}">\n            </a>\n            <h3 class="app-name">\n              <a ng-href="{{ (\':appRoot/app/admin/:engine/\') | uri }}">{{\'ADMIN\' | translate}}</a>\n            </h3>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <section>\n      <div class="inner" custom-links></div>\n    </section>\n  </div>\n\n\n  <section ng-if="profilePlugins.length"\n           class="col-sm-4 col-xs-12"\n           id="user-profile">\n    <div class="inner">\n      <view ng-repeat="plugin in profilePlugins"\n            class="plugin"\n            ng-class="plugin.id"\n            data-plugin-id="{{ plugin.id }}"\n            provider="plugin"></view>\n    </div>\n  </section>\n\n  <div ng-if="plugins.length"\n       class="col-xs-12 plugins">\n    <div class="row">\n      <view ng-repeat="plugin in plugins"\n            class="plugin"\n            ng-class="plugin.id"\n            data-plugin-id="{{ plugin.id }}"\n            provider="plugin"></view>\n    </div>\n  </div>\n</div>\n';
      },
      42634: function () {},
      22623: function () {},
    },
    function (e) {
      return (
        e.O(0, [881], function () {
          return (t = 96776), e((e.s = t));
          var t;
        }),
        e.O()
      );
    },
  ]);
});
