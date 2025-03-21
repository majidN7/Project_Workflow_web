/*! For license information, please see app/tasklist/camunda-tasklist-bootstrap.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports["app/tasklist/camunda-tasklist-bootstrap"] = t())
    : (e["app/tasklist/camunda-tasklist-bootstrap"] = t());
})(self, function () {
  return (self.webpackChunkcamunda_bpm_webapp =
    self.webpackChunkcamunda_bpm_webapp || []).push([
    [19],
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
              var a = e.formElement.injector();
              if (a) {
                var r = e.formElement.scope();
                a.invoke([
                  "$compile",
                  function (t) {
                    t(e.formElement)(r);
                  },
                ]),
                  (r.camForm = this);
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
                a = e.formElement.injector();
              a &&
                a.invoke([
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
          a = n(12338),
          r = n(59084).isType,
          o = i.module("cam.embedded.forms", []);
        o.directive("camVariableName", [
          "$rootScope",
          function (e) {
            return {
              require: "ngModel",
              link: function (t, n, i, a) {
                n.on("camFormVariableApplied", function (n, i) {
                  var r = e.$$phase;
                  "$apply" !== r && "$digest" !== r
                    ? t.$apply(function () {
                        a.$setViewValue(i);
                      })
                    : a.$setViewValue(i);
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
                  var a = function (e) {
                    var a = n.camVariableType;
                    return (
                      i.$setValidity("camVariableType", !0),
                      (e || !1 === e || "Bytes" === a) &&
                        (-1 !== ["Boolean", "String", "Bytes"].indexOf(a) ||
                          r(e, a) ||
                          i.$setValidity("camVariableType", !1),
                        "file" === n.type &&
                          "Bytes" === a &&
                          t[0].files &&
                          t[0].files[0] &&
                          t[0].files[0].size > (n.camMaxFilesize || 5e6) &&
                          i.$setValidity("camVariableType", !1)),
                      e
                    );
                  };
                  i.$parsers.unshift(a),
                    i.$formatters.push(a),
                    n.$observe("camVariableType", function () {
                      return a(i.$viewValue);
                    }),
                    t.bind("change", function () {
                      a(i.$viewValue), e.$apply();
                    });
                },
              };
            },
          ]),
          (e.exports = a);
      },
      59721: function (e, t, n) {
        "use strict";
        e.exports = { Client: n(12444), Form: n(99325), utils: n(37914) };
      },
      10123: function (e, t, n) {
        "use strict";
        var i = n(60314),
          a = n(32278);
        function r() {}
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
                (t = t || r);
              var n = this,
                a = { count: 0, items: [] },
                o = i.defer(),
                s = !1,
                l = !1,
                c = function () {
                  l && s && (n.trigger("loaded", a), o.resolve(a), t(null, a));
                };
              return (
                n.count(e, function (e, i) {
                  e
                    ? (n.trigger("error", e), o.reject(e), t(e))
                    : ((a.count = i), (s = !0), c());
                }),
                n.http.get(n.path, {
                  data: e,
                  done: function (i, r) {
                    i
                      ? (n.trigger("error", i), o.reject(i), t(i))
                      : ((a.items = r),
                        (a.firstResult = parseInt(e.firstResult || 0, 10)),
                        (a.maxResults =
                          a.firstResult + parseInt(e.maxResults || 10, 10)),
                        (l = !0),
                        c());
                  },
                }),
                o.promise
              );
            },
            count: function (e, t) {
              "function" == typeof e && ((t = e), (e = {})),
                (e = e || {}),
                (t = t || r);
              var n = this,
                a = i.defer();
              return (
                this.http.get(this.path + "/count", {
                  data: e,
                  done: function (e, i) {
                    e
                      ? (n.trigger("error", e), a.reject(e), t(e))
                      : (a.resolve(i.count), t(null, i.count));
                  },
                }),
                a.promise
              );
            },
            update: function () {},
            delete: function () {},
          }
        );
        a.attach(o), (e.exports = o);
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
          a = n(60314),
          r = n(32278),
          o = n(37914);
        function s() {}
        var l = function (e) {
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
          r.attach(this), (this.config = e);
        };
        function c(e, t, n) {
          return (
            (t = t || s),
            function (i, a) {
              if (i || (!a.ok && !a.noContent))
                return (
                  (i =
                    i ||
                    a.error ||
                    new Error(
                      "The " +
                        a.req.method +
                        " request on " +
                        a.req.url +
                        " failed"
                    )),
                  a && a.body && a.body.message && (i.message = a.body.message),
                  e.trigger("error", i),
                  n && n.reject(i),
                  t(i, null, a.headers)
                );
              "application/hal+json" === a.type &&
                ((a.body && 0 !== Object.keys(a.body).length) ||
                  (a.body = JSON.parse(a.text)),
                (a.body = o.solveHALEmbedded(a.body))),
                n && n.resolve(a.body ? a.body : a.text ? a.text : ""),
                t(null, a.body ? a.body : a.text ? a.text : "", a.headers);
            }
          );
        }
        (l.prototype.post = function (e, t) {
          var n = (t = t || {}).done || s,
            r = a.defer(),
            o = this.config.baseUrl + (e ? "/" + e : ""),
            l = i.post(o),
            u = t.headers || this.config.headers;
          u.Accept = u.Accept || this.config.headers.Accept;
          var d = !1;
          if ("undefined" != typeof Buffer)
            Object.keys(t.fields || {}).forEach(function (e) {
              l.field(e, t.fields[e]), (d = !0);
            }),
              (t.attachments || []).forEach(function (e, t) {
                l.attach("data_" + t, new Buffer(e.content), e.name), (d = !0);
              });
          else if (t.fields || t.attachments) {
            var p = new Error(
              "Multipart request is only supported in node.js environement."
            );
            return n(p), r.reject(p);
          }
          return (
            d || l.send(t.data || {}),
            l.set(u).query(t.query || {}),
            l.end(c(this, n, r)),
            r.promise
          );
        }),
          (l.prototype.get = function (e, t) {
            var n = this.config.baseUrl + (e ? "/" + e : "");
            return this.load(n, t);
          }),
          (l.prototype.load = function (e, t) {
            var n = (t = t || {}).done || s,
              r = a.defer(),
              o = t.headers || this.config.headers,
              l = t.accept || o.Accept || this.config.headers.Accept;
            return (
              i
                .get(e)
                .set(o)
                .set("Accept", l)
                .query(t.data || {})
                .end(c(this, n, r)),
              r.promise
            );
          }),
          (l.prototype.put = function (e, t) {
            var n = (t = t || {}).done || s,
              r = a.defer(),
              o = this.config.baseUrl + (e ? "/" + e : ""),
              l = t.headers || this.config.headers;
            return (
              (l.Accept = l.Accept || this.config.headers.Accept),
              i
                .put(o)
                .set(l)
                .send(t.data || {})
                .end(c(this, n, r)),
              r.promise
            );
          }),
          (l.prototype.del = function (e, t) {
            var n = (t = t || {}).done || s,
              r = a.defer(),
              o = this.config.baseUrl + (e ? "/" + e : ""),
              l = t.headers || this.config.headers;
            return (
              (l.Accept = l.Accept || this.config.headers.Accept),
              i
                .del(o)
                .set(l)
                .send(t.data || {})
                .end(c(this, n, r)),
              r.promise
            );
          }),
          (l.prototype.options = function (e, t) {
            var n = (t = t || {}).done || s,
              r = a.defer(),
              o = this.config.baseUrl + (e ? "/" + e : ""),
              l = t.headers || this.config.headers;
            return (
              (l.Accept = l.Accept || this.config.headers.Accept),
              i("OPTIONS", o).set(l).end(c(this, n, r)),
              r.promise
            );
          }),
          (e.exports = l);
      },
      12444: function (e, t, n) {
        "use strict";
        n(72595), n(84392);
        var i = n(32278);
        function a(e) {
          if (!e) throw new Error("Needs configuration");
          if (!e.apiUri) throw new Error("An apiUri is required");
          i.attach(this),
            (e.engine = void 0 !== e.engine ? e.engine : "default"),
            (e.mock = void 0 === e.mock || e.mock),
            (e.resources = e.resources || {}),
            (this.HttpClient = e.HttpClient || a.HttpClient),
            (this.baseUrl = e.apiUri),
            e.engine &&
              ((this.baseUrl += "/" !== this.baseUrl.slice(-1) ? "/" : ""),
              (this.baseUrl += "engine/" + e.engine)),
            (this.config = e),
            this.initialize();
        }
        (a.HttpClient = n(2160)),
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
                a,
                r,
                o = this;
              function s(e) {
                o.trigger("error", e);
              }
              for (e in ((this.http = new this.HttpClient({
                baseUrl: this.baseUrl,
                headers: this.config.headers,
              })),
              t)) {
                for (r in ((i = {
                  name: e,
                  mock: this.config.mock,
                  baseUrl: this.baseUrl,
                  headers: this.config.headers,
                }),
                (a = this.config.resources[e] || {})))
                  i[r] = a[r];
                (t[e].http = new this.HttpClient(i)), t[e].http.on("error", s);
              }
            }),
              (e.resource = function (e) {
                return t[e];
              });
          })(a.prototype),
          (e.exports = a);
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
        var a = n(10123).extend();
        (a.path = "case-definition"),
          (a.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (a.getByKey = function (e, t) {
            return this.http.get(this.path + "/key/" + e, { done: t });
          }),
          (a.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (a.create = function (e, t) {
            var n = this.path + "/";
            return (
              e.id
                ? (n += e.id)
                : ((n = n + "key/" + e.key),
                  e.tenantId && (n = n + "/tenant-id/" + e.tenantId)),
              this.http.post(n + "/create", { data: e, done: t })
            );
          }),
          (a.xml = function (e, t) {
            var n = this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/xml";
            return this.http.get(n, { done: t || i });
          }),
          (a.updateHistoryTimeToLive = function (e, t, n) {
            var i = this.path + "/" + e + "/history-time-to-live";
            return this.http.put(i, { data: t, done: n });
          }),
          (e.exports = a);
      },
      87259: function (e, t, n) {
        "use strict";
        var i = n(10123),
          a = n(37914);
        function r() {}
        var o = i.extend();
        (o.path = "case-execution"),
          (o.list = function (e, t) {
            return (t = t || r), this.http.get(this.path, { data: e, done: t });
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
                a.escapeUrl(e.varId),
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
          a = n(37914),
          r = i.extend();
        (r.path = "case-instance"),
          (r.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (r.list = function (e, t) {
            return this.http.get(this.path, { data: e, done: t });
          }),
          (r.close = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/close", {
              data: t,
              done: n,
            });
          }),
          (r.terminate = function (e, t, n) {
            return this.http.post(this.path + "/" + e + "/terminate", {
              data: t,
              done: n,
            });
          }),
          (r.setVariable = function (e, t, n) {
            var i = this.path + "/" + e + "/variables/" + a.escapeUrl(t.name);
            return this.http.put(i, { data: t, done: n });
          }),
          (e.exports = r);
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
          a = i.extend();
        (a.path = "deployment"),
          (a.create = function (e, t) {
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
          (a.delete = function (e, t, n) {
            var i = this.path + "/" + e;
            if (t) {
              var a = [];
              for (var r in t) {
                var o = t[r];
                a.push(r + "=" + o);
              }
              a.length && (i += "?" + a.join("&"));
            }
            return this.http.del(i, { done: n });
          }),
          (a.list = function () {
            return i.list.apply(this, arguments);
          }),
          (a.get = function (e, t) {
            return this.http.get(this.path + "/" + e, { done: t });
          }),
          (a.getResources = function (e, t) {
            return this.http.get(this.path + "/" + e + "/resources", {
              done: t,
            });
          }),
          (a.getResource = function (e, t, n) {
            return this.http.get(this.path + "/" + e + "/resources/" + t, {
              done: n,
            });
          }),
          (a.getResourceData = function (e, t, n) {
            return this.http.get(
              this.path + "/" + e + "/resources/" + t + "/data",
              { accept: "*/*", done: n }
            );
          }),
          (a.redeploy = function (e, t) {
            var n = e.id;
            return (
              delete e.id,
              this.http.post(this.path + "/" + n + "/redeploy", {
                data: e,
                done: t || function () {},
              })
            );
          }),
          (e.exports = a);
      },
      96712: function (e, t, n) {
        "use strict";
        var i = n(10123),
          a = n(37914),
          r = i.extend();
        function o(e, t) {
          return e + "/" + a.escapeUrl(t);
        }
        function s(e, t, n) {
          var i = e + "/key/" + a.escapeUrl(t);
          return (
            "function" != typeof n && (i += "/tenant-id/" + a.escapeUrl(n)), i
          );
        }
        (r.path = "decision-requirements-definition"),
          (r.count = function (e, t) {
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(this.path + "/count", { data: e, done: t })
            );
          }),
          (r.list = function (e, t) {
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(this.path, { data: e, done: t })
            );
          }),
          (r.get = function (e, t) {
            return this.http.get(o(this.path, e), { done: t });
          }),
          (r.getByKey = function (e, t, n) {
            var i = s(this.path, e, t);
            return (
              "function" == typeof t && (n = t), this.http.get(i, { done: n })
            );
          }),
          (r.getXML = function (e, t) {
            return this.http.get(o(this.path, e) + "/xml", { done: t });
          }),
          (r.getXMLByKey = function (e, t, n) {
            var i = s(this.path, e, t) + "/xml";
            return (
              "function" == typeof t && (n = t), this.http.get(i, { done: n })
            );
          }),
          (e.exports = r);
      },
      97224: function (e, t, n) {
        "use strict";
        var i = n(10123),
          a = n(37914),
          r = i.extend();
        (r.path = "execution"),
          (r.deleteVariable = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                e.id +
                "/localVariables/" +
                a.escapeUrl(e.varId),
              { done: t }
            );
          }),
          (r.modifyVariables = function (e, t) {
            return this.http.post(this.path + "/" + e.id + "/localVariables", {
              data: e,
              done: t,
            });
          }),
          (e.exports = r);
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
          a = n(37914);
        function r() {}
        var o = i.extend();
        (o.path = "group"),
          (o.options = function (e, t) {
            var n;
            return (
              "function" == typeof e
                ? ((t = e), (n = ""))
                : void 0 === (n = "string" == typeof e ? e : e.id) && (n = ""),
              this.http.options(this.path + "/" + a.escapeUrl(n), {
                done: t || r,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (o.create = function (e, t) {
            return this.http.post(this.path + "/create", {
              data: e,
              done: t || r,
            });
          }),
          (o.count = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path + "/count", { data: e, done: t || r })
            );
          }),
          (o.get = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.get(this.path + "/" + a.escapeUrl(n), {
              data: e,
              done: t || r,
            });
          }),
          (o.list = function (e, t) {
            "function" == typeof e ? ((t = e), (e = {})) : (e = e || {});
            var n = {};
            return (
              e.maxResults &&
                ((n.maxResults = e.maxResults),
                (n.firstResult = e.firstResult)),
              this.http.post(this.path, { data: e, query: n, done: t || r })
            );
          }),
          (o.createMember = function (e, t) {
            return this.http.put(
              this.path +
                "/" +
                a.escapeUrl(e.id) +
                "/members/" +
                a.escapeUrl(e.userId),
              { data: e, done: t || r }
            );
          }),
          (o.deleteMember = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                a.escapeUrl(e.id) +
                "/members/" +
                a.escapeUrl(e.userId),
              { data: e, done: t || r }
            );
          }),
          (o.update = function (e, t) {
            return this.http.put(this.path + "/" + a.escapeUrl(e.id), {
              data: e,
              done: t || r,
            });
          }),
          (o.delete = function (e, t) {
            return this.http.del(this.path + "/" + a.escapeUrl(e.id), {
              data: e,
              done: t || r,
            });
          }),
          (e.exports = o);
      },
      2094: function (e, t, n) {
        "use strict";
        var i = n(10123),
          a = n(34873),
          r = i.extend();
        (r.path = "history"),
          (r.userOperationCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/user-operation/count", {
                data: e,
                done: t,
              })
            );
          }),
          (r.userOperation = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/user-operation", { data: e, done: t })
            );
          }),
          (r.setUserOperationAnnotation = function (e, t) {
            return this.http.put(
              this.path + "/user-operation/" + e.id + "/set-annotation",
              { data: e, done: t }
            );
          }),
          (r.clearUserOperationAnnotation = function (e, t) {
            return this.http.put(
              this.path + "/user-operation/" + e + "/clear-annotation",
              { done: t }
            );
          }),
          (r.processInstance = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              a = ["firstResult", "maxResults"];
            for (var r in e) a.indexOf(r) > -1 ? (i[r] = e[r]) : (n[r] = e[r]);
            return this.http.post(this.path + "/process-instance", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (r.processInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/process-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (r.deleteProcessInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/process-instance/delete", {
                data: e,
                done: t,
              })
            );
          }),
          (r.setRemovalTimeToHistoricProcessInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/process-instance/set-removal-time", {
                data: e,
                done: t,
              })
            );
          }),
          (r.setRemovalTimeToHistoricDecisionInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(
                this.path + "/decision-instance/set-removal-time",
                { data: e, done: t }
              )
            );
          }),
          (r.setRemovalTimeToHistoricBatchesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/batch/set-removal-time", {
                data: e,
                done: t,
              })
            );
          }),
          (r.decisionInstance = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/decision-instance", {
                data: e,
                done: t,
              })
            );
          }),
          (r.decisionInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/decision-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (r.deleteDecisionInstancesAsync = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/decision-instance/delete", {
                data: e,
                done: t,
              })
            );
          }),
          (r.batch = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/batch", { data: e, done: t })
            );
          }),
          (r.singleBatch = function (e, t) {
            return this.http.get(this.path + "/batch/" + e, { done: t });
          }),
          (r.batchCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/batch/count", { data: e, done: t })
            );
          }),
          (r.batchDelete = function (e, t) {
            var n = this.path + "/batch/" + e;
            return this.http.del(n, { done: t });
          }),
          (r.report = function (e, t) {
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
          (r.reportAsCsv = function (e, t) {
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
          (r.task = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              a = ["firstResult", "maxResults"];
            for (var r in e) a.indexOf(r) > -1 ? (i[r] = e[r]) : (n[r] = e[r]);
            return this.http.post(this.path + "/task", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (r.taskCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/task/count", { data: e, done: t })
            );
          }),
          (r.taskDurationReport = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              (e.reportType = e.reportType || "duration"),
              (e.periodUnit = e.periodUnit || "month"),
              this.http.get(this.path + "/task/report", { data: e, done: t })
            );
          }),
          (r.taskReport = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              (e.reportType = e.reportType || "count"),
              this.http.get(this.path + "/task/report", { data: e, done: t })
            );
          }),
          (r.caseInstance = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              a = ["firstResult", "maxResults"];
            for (var r in e) a.indexOf(r) > -1 ? (i[r] = e[r]) : (n[r] = e[r]);
            return this.http.post(this.path + "/case-instance", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (r.caseInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/case-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (r.caseActivityInstance = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/case-activity-instance", {
                data: e,
                done: t,
              })
            );
          }),
          (r.caseActivityInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/case-activity-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (r.activityInstance = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/activity-instance", {
                data: e,
                done: t,
              })
            );
          }),
          (r.incident = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.get(this.path + "/incident", { data: e, done: t })
            );
          }),
          (r.variableInstance = function (e, t) {
            "function" == typeof e && ((t = arguments[0]), (e = {}));
            var n = {},
              i = {},
              a = ["firstResult", "maxResults", "deserializeValues"];
            for (var r in e) a.indexOf(r) > -1 ? (i[r] = e[r]) : (n[r] = e[r]);
            return this.http.post(this.path + "/variable-instance", {
              data: n,
              query: i,
              done: t,
            });
          }),
          (r.variableInstanceCount = function (e, t) {
            return (
              "function" == typeof e && ((t = arguments[0]), (e = {})),
              this.http.post(this.path + "/variable-instance/count", {
                data: e,
                done: t,
              })
            );
          }),
          (r.caseActivityStatistics = function (e, t) {
            var n = e.id || e;
            return this.http.get(
              this.path + "/case-definition/" + n + "/statistics",
              { done: t }
            );
          }),
          (r.drdStatistics = function (e, t, n) {
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
          (r.cleanupConfiguration = function (e, t) {
            var n = this.path + "/cleanup/configuration";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.deleteVariable = function (e, t) {
            var n = this.path + "/variable-instance/" + e;
            return this.http.del(n, { done: t });
          }),
          (r.deleteAllVariables = function (e, t) {
            var n =
              this.path + "/process-instance/" + e + "/variable-instances";
            return this.http.del(n, { done: t });
          }),
          (r.cleanupJobs = function (e, t) {
            var n = this.path + "/cleanup/jobs";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanup = function (e, t) {
            var n = this.path + "/cleanup";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.post(n, { data: e, done: t })
            );
          }),
          (r.cleanableProcessCount = function (e, t) {
            var n =
              this.path +
              "/process-definition/cleanable-process-instance-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableProcess = function (e, t) {
            var n =
              this.path +
              "/process-definition/cleanable-process-instance-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableCaseCount = function (e, t) {
            var n =
              this.path +
              "/case-definition/cleanable-case-instance-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableCase = function (e, t) {
            var n =
              this.path + "/case-definition/cleanable-case-instance-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableDecisionCount = function (e, t) {
            var n =
              this.path +
              "/decision-definition/cleanable-decision-instance-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableDecision = function (e, t) {
            var n =
              this.path +
              "/decision-definition/cleanable-decision-instance-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableBatchCount = function (e, t) {
            var n = this.path + "/batch/cleanable-batch-report/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.cleanableBatch = function (e, t) {
            var n = this.path + "/batch/cleanable-batch-report";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.jobLogList = function (e, t) {
            var n = this.path + "/job-log";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.jobLogCount = function (e, t) {
            var n = this.path + "/job-log/count";
            return (
              "function" == typeof e && ((t = e), (e = {})),
              this.http.get(n, { data: e, done: t })
            );
          }),
          (r.externalTaskLogList =
            a.createSimpleGetQueryFunction("/external-task-log")),
          (r.externalTaskLogCount = a.createSimpleGetQueryFunction(
            "/external-task-log/count"
          )),
          (e.exports = r);
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
          a = n(10123);
        function r() {}
        var o = a.extend(
          {
            suspend: function (e, t) {
              return (
                "function" == typeof e && ((t = e), (e = {})),
                (e = e || {}),
                (t = t || r),
                this.http.post(this.path, { done: t })
              );
            },
            stats: function (e) {
              return this.http.post(this.path, { done: e || r });
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
              return a.list.apply(this, arguments);
            },
            count: function () {
              return a.count.apply(this, arguments);
            },
            formVariables: function (e, t) {
              var n = "";
              if (((t = t || r), e.key)) n = "key/" + e.key;
              else {
                if (!e.id) {
                  var a = new Error(
                    "Process definition task variables needs either a key or an id."
                  );
                  return t(a), i.reject(a);
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
              if (((t = t || r), e.key))
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
              t = t || r;
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
                a = "cascade";
              return (
                "boolean" == typeof e[a] && (i += a + "=" + e[a]),
                "boolean" == typeof e[(a = "skipCustomListeners")] &&
                  (i.length > 1 && (i += "&"), (i += a + "=" + e[a])),
                "boolean" == typeof e[(a = "skipIoMappings")] &&
                  (i.length > 1 && (i += "&"), (i += a + "=" + e[a])),
                this.http.del(this.path + "/" + n + i, { done: t })
              );
            },
            startForm: function (e, t) {
              var n =
                this.path +
                "/" +
                (e.key ? "key/" + e.key : e.id) +
                "/startForm";
              return this.http.get(n, { done: t || r });
            },
            xml: function (e, t) {
              var n = this.path + "/" + (e.id ? e.id : "key/" + e.key) + "/xml";
              return this.http.get(n, { done: t || r });
            },
            statistics: function (e, t) {
              var n = this.path;
              return (
                e.id ? (n += "/" + e.id) : e.key && (n += "/key/" + e.key),
                (n += "/statistics"),
                this.http.get(n, { data: e, done: t || r })
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
                (n = n || r),
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
          a = n(37914),
          r = i.extend(
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
                  this.path + "/" + e + "/variables/" + a.escapeUrl(t.name);
                return this.http.put(i, { data: t, done: n });
              },
            }
          );
        e.exports = r;
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
          a = n(10123),
          r = n(37914);
        function o() {}
        var s = a.extend();
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
                    var a = i._embedded.task || i._embedded.tasks,
                      r = i._embedded.processDefinition;
                    for (var o in a) {
                      var s = a[o];
                      for (var l in ((s._embedded = s._embedded || {}), r))
                        if (r[l].id === s.processDefinitionId) {
                          s._embedded.processDefinition = [r[l]];
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
                var a = new Error(
                  "Task variables needs either a key or an id."
                );
                return t(a), i.reject(a);
              }
              n = e.id;
            }
            var r = { deserializeValues: e.deserializeValues };
            return (
              e.names && (r.variableNames = e.names.join(",")),
              this.http.get(this.path + "/" + n + "/form-variables", {
                data: r,
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
                r.escapeUrl(e.varId),
              { done: t }
            );
          }),
          (e.exports = s);
      },
      27033: function (e, t, n) {
        "use strict";
        function i() {}
        var a = n(10123).extend();
        (a.path = "telemetry"),
          (a.get = function (e) {
            return this.http.get(this.path + "/configuration", { done: e });
          }),
          (a.configure = function (e, t) {
            return (
              "boolean" == typeof e && (e = { enableTelemetry: e }),
              this.http.post(this.path + "/configuration", { data: e, done: t })
            );
          }),
          (a.fetchData = function (e, t) {
            return (
              "function" == typeof e && ((t = e), (e = {})),
              (e = e || {}),
              (t = t || i),
              this.http.get(this.path + "/data", { data: e, done: t })
            );
          }),
          (e.exports = a);
      },
      77840: function (e, t, n) {
        "use strict";
        var i = n(10123),
          a = n(37914);
        function r() {}
        var o = i.extend();
        (o.path = "tenant"),
          (o.create = function (e, t) {
            return this.http.post(this.path + "/create", {
              data: e,
              done: t || r,
            });
          }),
          (o.count = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path + "/count", { data: e, done: t || r })
            );
          }),
          (o.get = function (e, t) {
            var n;
            return (
              "string" == typeof e
                ? ((n = e), (e = {}))
                : ((n = e.id), delete e.id),
              this.http.get(this.path + "/" + a.escapeUrl(n), {
                data: e,
                done: t || r,
              })
            );
          }),
          (o.list = function (e, t) {
            return (
              "function" == typeof e ? ((t = e), (e = {})) : (e = e || {}),
              this.http.get(this.path, { data: e, done: t || r })
            );
          }),
          (o.createUserMember = function (e, t) {
            return this.http.put(
              this.path +
                "/" +
                a.escapeUrl(e.id) +
                "/user-members/" +
                a.escapeUrl(e.userId),
              { data: e, done: t || r }
            );
          }),
          (o.createGroupMember = function (e, t) {
            return this.http.put(
              this.path +
                "/" +
                a.escapeUrl(e.id) +
                "/group-members/" +
                a.escapeUrl(e.groupId),
              { data: e, done: t || r }
            );
          }),
          (o.deleteUserMember = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                a.escapeUrl(e.id) +
                "/user-members/" +
                a.escapeUrl(e.userId),
              { data: e, done: t || r }
            );
          }),
          (o.deleteGroupMember = function (e, t) {
            return this.http.del(
              this.path +
                "/" +
                a.escapeUrl(e.id) +
                "/group-members/" +
                a.escapeUrl(e.groupId),
              { data: e, done: t || r }
            );
          }),
          (o.update = function (e, t) {
            return this.http.put(this.path + "/" + a.escapeUrl(e.id), {
              data: e,
              done: t || r,
            });
          }),
          (o.delete = function (e, t) {
            return this.http.del(this.path + "/" + a.escapeUrl(e.id), {
              data: e,
              done: t || r,
            });
          }),
          (o.options = function (e, t) {
            var n;
            return (
              "function" == typeof e
                ? ((t = e), (n = ""))
                : void 0 === (n = "string" == typeof e ? e : e.id) && (n = ""),
              this.http.options(this.path + "/" + a.escapeUrl(n), {
                done: t || r,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (e.exports = o);
      },
      23575: function (e, t, n) {
        "use strict";
        var i = n(60314),
          a = n(10123),
          r = n(37914);
        function o() {}
        var s = a.extend();
        (s.path = "user"),
          (s.options = function (e, t) {
            var n;
            return (
              "function" == typeof e
                ? ((t = e), (n = ""))
                : void 0 === (n = "string" == typeof e ? e : e.id) && (n = ""),
              this.http.options(this.path + "/" + r.escapeUrl(n), {
                done: t || o,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (s.create = function (e, t) {
            (e = e || {}), (t = t || o);
            var n = ["id", "firstName", "lastName", "password"];
            for (var a in n) {
              var r = n[a];
              if (!e[r]) {
                var s = new Error("Missing " + r + " option to create user");
                return t(s), i.reject(s);
              }
            }
            var l = {
              profile: {
                id: e.id,
                firstName: e.firstName,
                lastName: e.lastName,
              },
              credentials: { password: e.password },
            };
            return (
              e.email && (l.profile.email = e.email),
              this.http.post(this.path + "/create", { data: l, done: t })
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
              this.path + "/" + r.escapeUrl(n) + "/profile",
              { done: t || o }
            );
          }),
          (s.updateProfile = function (e, t) {
            if (((t = t || o), !(e = e || {}).id)) {
              var n = new Error("Missing id option to update user profile");
              return t(n), i.reject(n);
            }
            return this.http.put(
              this.path + "/" + r.escapeUrl(e.id) + "/profile",
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
            var a = { password: e.password };
            return (
              e.authenticatedUserPassword &&
                (a.authenticatedUserPassword = e.authenticatedUserPassword),
              this.http.put(
                this.path + "/" + r.escapeUrl(e.id) + "/credentials",
                { data: a, done: t }
              )
            );
          }),
          (s.delete = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.del(this.path + "/" + r.escapeUrl(n), {
              done: t || o,
            });
          }),
          (s.unlock = function (e, t) {
            var n = "string" == typeof e ? e : e.id;
            return this.http.post(
              this.path + "/" + r.escapeUrl(n) + "/unlock",
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
              a = ["firstResult", "maxResults", "deserializeValues"];
            for (var r in e) a.indexOf(r) > -1 ? (i[r] = e[r]) : (n[r] = e[r]);
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
        function a() {
          this.initialize();
        }
        (a.extend = function (e, t) {
          (e = e || {}), (t = t || {});
          var n,
            i,
            a,
            r,
            o = this;
          for (a in ((n =
            e && Object.hasOwnProperty.call(o, "constructor")
              ? e.constructor
              : function () {
                  return o.apply(this, arguments);
                }),
          o))
            n[a] = o[a];
          for (a in t) n[a] = t[a];
          for (r in (((i = function () {
            this.constructor = n;
          }).prototype = o.prototype),
          (n.prototype = new i()),
          e))
            n.prototype[r] = e[r];
          return n;
        }),
          (a.prototype.initialize = function () {}),
          i.attach(a),
          (e.exports = a);
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
              a = n(function () {
                i.off(e, n), t.apply(this, arguments);
              });
            return (a._callback = t), this.on(e, a);
          }),
          (t.off = function (e, t) {
            if ((i(this, e), !t)) return delete this._events[e], this;
            var n,
              a = [];
            for (n in this._events[e])
              this._events[e][n] !== t && a.push(this._events[e][n]);
            return (this._events[e] = a), this;
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
            for (var a in t)
              n[a] ? (n[a].value = t[a]) : (n[a] = { name: a, value: t[a] });
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
              i.submitVariables(function (n, a) {
                return n
                  ? (i.fireEvent("submit-failed", n), e && e(n))
                  : (localStorage.removeItem("camForm:" + t),
                    i.fireEvent("submit-success"),
                    e && e(null, a));
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
              var a = new Error("camForm error prevented");
              return this.fireEvent("error-failed", a), n && n(a);
            }
            try {
              this.retrieveVariables();
            } catch (e) {
              return n && n(e);
            }
            var r = this;
            this.transformFiles(function () {
              var a = {
                variables: r.parseVariables(),
                id: r.taskId,
                errorCode: e,
                errorMessage: t,
              };
              r.client.resource("task").bpmnError(a, function (e, t) {
                return e
                  ? (r.fireEvent("error-failed", e), n && n(e))
                  : (localStorage.removeItem("camForm:" + i),
                    r.fireEvent("error-success"),
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
            var a = this;
            this.transformFiles(function () {
              var i = {
                variables: a.parseVariables(),
                id: a.taskId,
                escalationCode: e,
              };
              a.client.resource("task").bpmnEscalation(i, function (e, i) {
                return e
                  ? (a.fireEvent("escalation-failed", e), t && t(e))
                  : (localStorage.removeItem("camForm:" + n),
                    a.fireEvent("escalation-success"),
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
            for (var a in this.fields) {
              var r = this.fields[a].element[0];
              if ("file" === r.getAttribute("type")) {
                var o =
                  this.variableManager.variables[this.fields[a].variableName];
                if ("function" == typeof FileReader && r.files.length > 0) {
                  if (
                    r.files[0].size >
                    (parseInt(r.getAttribute("cam-max-filesize"), 10) || 5e6)
                  )
                    throw new Error(
                      "Maximum file size of " +
                        i(
                          parseInt(r.getAttribute("cam-max-filesize"), 10) ||
                            5e6
                        ) +
                        " exceeded."
                    );
                  var s = new FileReader();
                  (s.onloadend = (function (e, t, i) {
                    return function (e) {
                      for (
                        var a = "",
                          r = new Uint8Array(e.target.result),
                          o = r.byteLength,
                          s = 0;
                        s < o;
                        s++
                      )
                        a += String.fromCharCode(r[s]);
                      (i.value = btoa(a)),
                        "file" === i.type.toLowerCase() &&
                          (i.valueInfo = {
                            filename: t.files[0].name,
                            mimeType: t.files[0].type,
                          }),
                        n();
                    };
                  })(0, r, o)),
                    s.readAsArrayBuffer(r.files[0]),
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
              var a = t[i].value;
              (e.isDirty(i) || t[i].defaultValue != a) &&
                (e.isJsonVariable(i) && (a = JSON.stringify(a)),
                a &&
                  e.isDateVariable(i) &&
                  (a = moment(a, moment.ISO_8601).format(
                    "YYYY-MM-DDTHH:mm:ss.SSSZZ"
                  )),
                (n[i] = {
                  value: a,
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
              var a = t[n].type;
              !this.taskBasePath ||
                ("Bytes" !== a && "File" !== a) ||
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
          a = n(79129);
        function r() {}
        function o(e, t, n) {
          (this.element = a(e)),
            (this.variableManager = t),
            (this.form = n),
            (this.variableName = null),
            this.initialize();
        }
        (o.selector = null),
          (o.extend = i.extend),
          (o.prototype.initialize = r),
          (o.prototype.applyValue = r),
          (o.prototype.getValue = r),
          (e.exports = o);
      },
      38986: function (e, t, n) {
        "use strict";
        n(67762), n(84392);
        var i = n(99842),
          a = n(32684),
          r = n(79129),
          o = a.extend(
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
                            r("<option>", { value: i, text: i })
                          );
                      }
                    else
                      for (var a in t)
                        this.element.find('option[value="' + a + '"]').length ||
                          this.element.append(
                            r("<option>", { value: a, text: t[a] })
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
                        e.push(r(this).val());
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
          a = n(32684).extend(
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
        e.exports = a;
      },
      22907: function (e, t, n) {
        "use strict";
        var i = n(99842),
          a = n(32684).extend(
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
        e.exports = a;
      },
      42122: function (e, t, n) {
        "use strict";
        n(42919);
        var i = n(99842),
          a = n(32684).extend(
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
        e.exports = a;
      },
      47162: function (e, t, n) {
        "use strict";
        var i = n(99842),
          a = n(32684),
          r = n(59084).convertToType,
          o = function (e) {
            return (
              "checkbox" === e.attr("type") &&
              "Boolean" === e.attr(i.DIRECTIVE_CAM_VARIABLE_TYPE)
            );
          },
          s = a.extend(
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
                  e = r(t, "Date");
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
        var a = /^-?[\d]+$/,
          r = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/,
          o = /^(true|false)$/,
          s =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/,
          l = n(26219).validate,
          c = function (e, t) {
            switch (t) {
              case "Integer":
              case "Long":
              case "Short":
                return a.test(e);
              case "Float":
              case "Double":
                return r.test(e);
              case "Boolean":
                return o.test(e);
              case "Date":
                return s.test(d(e));
              case "Xml":
                return (function (e) {
                  return !!e && !0 === l(e);
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
          d = function (e) {
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
            if (!c(e, t))
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
                return d(e);
            }
          },
          isType: c,
          dateToString: d,
        };
      },
      9669: function (e, t, n) {
        "use strict";
        n(67559), n(85541);
        var i = n(98024),
          a = n(59084).convertToType;
        function r() {
          (this.variables = {}), (this.isVariablesFetched = !1);
        }
        (r.prototype.fetchVariable = function (e) {
          if (this.isVariablesFetched)
            throw new Error(
              "Illegal State: cannot call fetchVariable(), variables already fetched."
            );
          this.createVariable({ name: e });
        }),
          (r.prototype.createVariable = function (e) {
            if (this.variables[e.name])
              throw new Error(
                "Cannot add variable with name " + e.name + ": already exists."
              );
            this.variables[e.name] = e;
          }),
          (r.prototype.destroyVariable = function (e) {
            if (!this.variables[e])
              throw new Error(
                "Cannot remove variable with name " +
                  e +
                  ": variable does not exist."
              );
            delete this.variables[e];
          }),
          (r.prototype.setOriginalValue = function (e, t) {
            if (!this.variables[e])
              throw new Error(
                "Cannot set original value of variable with name " +
                  e +
                  ": variable does not exist."
              );
            this.variables[e].originalValue = t;
          }),
          (r.prototype.variable = function (e) {
            return this.variables[e];
          }),
          (r.prototype.variableValue = function (e, t) {
            var n = this.variable(e);
            return (
              null == t || ("" === t && "String" !== n.type)
                ? (t = null)
                : "string" == typeof t &&
                  "String" !== n.type &&
                  (t = a(t, n.type)),
              2 === arguments.length && (n.value = t),
              n.value
            );
          }),
          (r.prototype.isDirty = function (e) {
            var t = this.variable(e);
            return this.isJsonVariable(e)
              ? t.originalValue !== JSON.stringify(t.value)
              : this.isDateVariable(e) && t.originalValue && t.value
              ? !i(t.originalValue, i.ISO_8601).isSame(t.value)
              : t.originalValue !== t.value || "Object" === t.type;
          }),
          (r.prototype.isJsonVariable = function (e) {
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
          (r.prototype.isDateVariable = function (e) {
            return "Date" === this.variable(e).type;
          }),
          (r.prototype.variableNames = function () {
            return Object.keys(this.variables);
          }),
          (e.exports = r);
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
        function a() {
          a = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            l = s.iterator || "@@iterator",
            c = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function d(e, t, n) {
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
            d({}, "");
          } catch (e) {
            d = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function p(e, t, n, i) {
            var a = t && t.prototype instanceof b ? t : b,
              r = Object.create(a.prototype),
              s = new O(i || []);
            return o(r, "_invoke", { value: T(e, n, s) }), r;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = p;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function E() {}
          function k() {}
          var w = {};
          d(w, l, function () {
            return this;
          });
          var _ = Object.getPrototypeOf,
            I = _ && _(_(N([])));
          I && I !== n && r.call(I, l) && (w = I);
          var S = (k.prototype = b.prototype = Object.create(w));
          function x(e) {
            ["next", "throw", "return"].forEach(function (t) {
              d(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function A(e, t) {
            function n(a, o, s, l) {
              var c = f(e[a], e, o);
              if ("throw" !== c.type) {
                var u = c.arg,
                  d = u.value;
                return d && "object" == i(d) && r.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        n("next", e, s, l);
                      },
                      function (e) {
                        n("throw", e, s, l);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, l);
                      }
                    );
              }
              l(c.arg);
            }
            var a;
            o(this, "_invoke", {
              value: function (e, i) {
                function r() {
                  return new t(function (t, a) {
                    n(e, i, t, a);
                  });
                }
                return (a = a ? a.then(r, r) : r());
              },
            });
          }
          function T(t, n, i) {
            var a = h;
            return function (r, o) {
              if (a === m) throw new Error("Generator is already running");
              if (a === g) {
                if ("throw" === r) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = r, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var l = C(s, i);
                  if (l) {
                    if (l === y) continue;
                    return l;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (a === h) throw ((a = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                a = m;
                var c = f(t, n, i);
                if ("normal" === c.type) {
                  if (((a = i.done ? g : v), c.arg === y)) continue;
                  return { value: c.arg, done: i.done };
                }
                "throw" === c.type &&
                  ((a = g), (i.method = "throw"), (i.arg = c.arg));
              }
            };
          }
          function C(t, n) {
            var i = n.method,
              a = t.iterator[i];
            if (a === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  C(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var r = f(a, t.iterator, n.arg);
            if ("throw" === r.type)
              return (
                (n.method = "throw"), (n.arg = r.arg), (n.delegate = null), y
              );
            var o = r.arg;
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
          function D(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function O(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function N(t) {
            if (t || "" === t) {
              var n = t[l];
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
            (E.prototype = k),
            o(S, "constructor", { value: k, configurable: !0 }),
            o(k, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(k, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === E || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, k)
                  : ((e.__proto__ = k), d(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(S)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            x(A.prototype),
            d(A.prototype, c, function () {
              return this;
            }),
            (t.AsyncIterator = A),
            (t.async = function (e, n, i, a, r) {
              void 0 === r && (r = Promise);
              var o = new A(p(e, n, i, a), r);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            x(S),
            d(S, u, "Generator"),
            d(S, l, function () {
              return this;
            }),
            d(S, "toString", function () {
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
            (t.values = N),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(D),
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
                function i(i, a) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    a && ((n.method = "next"), (n.arg = e)),
                    !!a
                  );
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var o = this.tryEntries[a],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var l = r.call(o, "catchLoc"),
                      c = r.call(o, "finallyLoc");
                    if (l && c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!c)
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
                    return this.complete(n.completion, n.afterLoc), D(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var a = i.arg;
                      D(n);
                    }
                    return a;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: N(t),
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
        function r(e, t, n, i, a, r, o) {
          try {
            var s = e[r](o),
              l = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(l) : Promise.resolve(l).then(i, a);
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
          for (var a in i) {
            var r = i[a];
            for (var o in e._embedded[r]) {
              e._embedded[r][o]._embedded = e._embedded[r][o]._embedded || {};
              var s = n(e._embedded[r][o]);
              for (var l in s) {
                var c = s[l];
                if (e._embedded[r][o][c]) {
                  var u = e._embedded[c.slice(0, -2)];
                  for (var d in u)
                    u[d].id === e._embedded[r][o][c] &&
                      (e._embedded[r][o]._embedded[c.slice(0, -2)] = [u[d]]);
                }
              }
            }
          }
          return e;
        }),
          (o.series = function (e, t) {
            return new Promise(function (n, i) {
              t = t || function () {};
              var a = {};
              !(function (e, t, n) {
                if (((n = n || function () {}), !e.length)) return n();
                var i = 0;
                !(function a() {
                  t(e[i], function (t) {
                    t
                      ? (n(t), (n = function () {}))
                      : (i += 1) >= e.length
                      ? n()
                      : a();
                  });
                })();
              })(
                Object.keys(e),
                function (t, n) {
                  e[t](function (e) {
                    var i = Array.prototype.slice.call(arguments, 1);
                    i.length <= 1 && (i = i[0]), (a[t] = i), n(e);
                  });
                },
                function (e) {
                  e ? i(e) : n(a), t(e, a);
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
                  ((t = a().mark(function t(n) {
                    var i;
                    return a().wrap(function (t) {
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
                    return new Promise(function (i, a) {
                      var o = t.apply(e, n);
                      function s(e) {
                        r(o, i, a, s, l, "next", e);
                      }
                      function l(e) {
                        r(o, i, a, s, l, "throw", e);
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
              compile: function (n, i, a) {
                return function (n, i) {
                  var r, o;
                  function s(t) {
                    r && (e.leave(r), (r = void 0)),
                      o && (o.$destroy(), (o = void 0)),
                      t &&
                        ((o = n.$new()),
                        a(o, function (t) {
                          (r = t), e.enter(t, i.parent(), i);
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
              compile: function (n, i, a) {
                return function (n, i) {
                  var r, o;
                  function s(t) {
                    r && (e.leave(r), (r = void 0)),
                      o && (o.$destroy(), (o = void 0)),
                      t &&
                        ((o = n.$new()),
                        a(o, function (t) {
                          (r = t), e.enter(t, i.parent(), i);
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
        var a = n(90517),
          r = n(85358),
          o = n(61663),
          s = n(9886),
          l = n(36628),
          c = i.module("cam.commons.auth", [
            i.module("ngRoute").name,
            a.name,
            "pascalprecht.translate",
            "webapps.plugin",
            "camunda.common.services",
          ]);
        c
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
          .config(r)
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
            function (e, t, n, i, a, r) {
              t.$on("authentication.logout.success", function (o) {
                t.$evalAsync(function () {
                  o.defaultPrevented ||
                    (e.get("$http").removeAll(), n.url("/login"));
                }),
                  i(function () {
                    a.addMessage({
                      status: r.instant("AUTH_LOGOUT_SUCCESSFUL"),
                      message: r.instant("AUTH_LOGOUT_THANKS", {
                        dayContext: r.instant(
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
          .service("AuthenticationService", l),
          (e.exports = c);
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
          function (e, t, n, a, r, o) {
            e.status = "INIT";
            var s = i('form[name="signinForm"] [autofocus]')[0];
            s && s.focus();
            var l = r.getProviders({ component: "".concat(o, ".login.data") });
            e.login = function () {
              e.status = "LOADING";
              var i = t.login(e.username, e.password);
              return (
                l.forEach(function (t) {
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
                        status: a.instant("PAGE_LOGIN_FAILED"),
                        message:
                          (t.data && t.data.message) ||
                          a.instant("PAGE_LOGIN_ERROR_MSG"),
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
          a = n(24820),
          r = [
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
            function (e, t, n, i, r, o, s, l, c, u, d) {
              if (
                ((e.logo = s.trustAsHtml(a)),
                (e.status = "INIT"),
                (e.appName = l.getAppName()),
                (e.loginPlugins = u.getProviders({
                  component: "".concat(d, ".login"),
                })),
                t.authentication)
              )
                return i.path("/");
              (t.showBreadcrumbs = !1),
                (e.showFirstLogin = !1),
                !l.getDisableWelcomeMessage() &&
                  o.get("firstVisit", !0) &&
                  c({ method: "GET", url: "/camunda-welcome" })
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
                r("FIRST_LOGIN_INFO").then(function (t) {
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
            e.when("/login", { template: i, controller: r });
          },
        ];
      },
      36628: function (e, t, n) {
        "use strict";
        n(1792);
        var i = n(25447),
          a = n(8986);
        e.exports = [
          "$rootScope",
          "$q",
          "$http",
          "Uri",
          "$route",
          function (e, t, n, r, o) {
            function s(t, n, i) {
              e.$broadcast(t, n, i);
            }
            function l(e) {
              if (200 !== e.status) return t.reject(e);
              var n = e.data;
              return new a({
                name: n.userId,
                authorizedApps: n.authorizedApps,
              });
            }
            function c(t) {
              (e.authentication = t), s("authentication.changed", t);
            }
            var u;
            (this.updateAuthentication = c),
              (this.login = function (e, a) {
                var o = i.param({ username: e, password: a });
                return n
                  .get(r.appUri("engine://engine/"))
                  .then(function () {
                    return n({
                      method: "POST",
                      url: r.appUri("admin://auth/user/:engine/login/:appName"),
                      data: o,
                      headers: {
                        "Content-Type":
                          "application/x-www-form-urlencoded;charset=UTF-8",
                      },
                    });
                  })
                  .then(l)
                  .then(
                    function (e) {
                      return (
                        n.get(r.appUri("engine://engine/")).then(function () {
                          c(e), s("authentication.login.success", e);
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
                    r.appUri(
                      "admin://auth/user/" + (e || ":engine") + "/logout"
                    )
                  )
                  .then(
                    function (e) {
                      c(null), s("authentication.logout.success", e);
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
                          .get(r.appUri("admin://auth/user/:engine"))
                          .then(l)
                          .then(function (e) {
                            return c(e), e;
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
        function a(e) {
          i.extend(this, e);
        }
        (a.prototype.canAccess = function (e) {
          return this.authorizedApps && -1 !== this.authorizedApps.indexOf(e);
        }),
          (e.exports = a);
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
        function a() {}
        function r(e) {
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
            (this.onselection = e.onselection || a);
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
            var a = this.moment,
              r = this.abbreviateNumber;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
              this.offCtx.clearRect(
                0,
                0,
                this.offCanvas.width,
                this.offCanvas.height
              ),
              t && (this.timespan = t),
              n && (this.interval = n);
            var o = [[{ value: 0, timestamp: a().format(this.dateformat) }]];
            (e && e.length && e[0]) || (e = o), (this.data = e);
            var s,
              l = this.timespan,
              c = this.timestampFormat,
              u = i(this.max(), this.valueLabelsCount),
              d = this.timeLabelFormats;
            this.isLogScale && (this.valueLabelsCount = this.maxLog() + 1),
              (this.valueLabels = []);
            for (var p = this.valueLabelsCount; p >= 0; p--)
              (s = this.isLogScale
                ? p && Math.pow(10, p - 1)
                : r((p * u) / this.valueLabelsCount) || 0),
                this.valueLabels.push(s);
            if (
              ((this.timeLabels = []),
              e.length && e[0] && e[0].length && e[0][0].timestamp)
            ) {
              var f = a(),
                h = (this.labelTo = f.clone());
              "day" === l
                ? h.startOf("hour").add(1, "hour")
                : "week" === l
                ? h.startOf("day").add(1, "day")
                : "month" === l && h.startOf("week").add(1, "week");
              var v,
                m,
                g = (this.labelFrom = h.clone().subtract(1, l)),
                y = 1;
              "day" === l
                ? ((v = 12), (m = "hour"), (y = 2))
                : "week" === l
                ? ((v = 7), (m = "day"))
                : "month" === l && ((v = 4), (m = "week"));
              for (var b = 0; b <= v; b++)
                this.timeLabels.push(
                  g
                    .clone()
                    .add(b * y, m)
                    .format(d[l])
                );
            }
            return (
              (this.data = e.map(function (e) {
                (e && e.length) || (e = [{ value: 0 }]),
                  1 === e.length && (e = [e[0], e[0]]);
                var t = a(e[e.length - 1].timestamp, c),
                  n = t - undefined;
                return e.map(function (e) {
                  var i = a(e.timestamp, c);
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
              a = this.innerW();
            return (
              t.forEach(function (t) {
                i += e.measureText(t).width + 2 * n;
              }),
              (this._verticalLabels = i > a),
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
              a = 0,
              r = this.textPadding;
            return (
              this.timeLabels.forEach(function (e) {
                a = Math.max(a, n.measureText(e).width + 2 * r);
              }),
              (this._innerW = i - (t + this.verticalScaleX())),
              this.verticalLabels() || (this._innerW -= a / 2),
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
              a = this.tickSize;
            return (
              n.forEach(function (n) {
                e = Math.max(e, t.measureText(n || "0").width + 4 * i + a);
              }),
              (e = Math.round(Math.max(e, a + i)) + 0.5),
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
              a = this.textPadding,
              r = this.verticalLabels(),
              o = 0;
            return (
              r
                ? (t.forEach(function (t) {
                    o = Math.max(o, e.measureText(t).width + 4 * a + i);
                  }),
                  (o = Math.round(Math.max(o, i + a))))
                : (o = n + 2 * a + i),
              (this._horizontalScaleY = o),
              o
            );
          }),
          (s.drawMouseHint = function (e, t) {
            var n = this.ctx,
              i = this.innerW(),
              a = n.canvas.height,
              r = n.canvas.width,
              o = Math.max(2 * this.lineWidth, 10),
              s = this.verticalScaleX(),
              l = this.horizontalScaleY(),
              c = this.tickSize;
            if (
              ((n.strokeStyle = this.rulersColor),
              (n.fillStyle = this.rulersColor),
              (n.lineWidth = 1),
              (n.lineCap = "round"),
              (n.lineJoin = "round"),
              (n.font = this.fontSize + "px " + this.fontFamily),
              n.clearRect(0, 0, r, a),
              n.drawImage(this.offCanvas, 0, 0, r, a, 0, 0, r, a),
              e && e > s && e <= s + i)
            ) {
              var u = this.momentAtX(e).format(this.timestampFormat),
                d = n.measureText(u).width + 2 * o,
                p = e + d > r - o ? r - (o + d) : e,
                f = t > o ? t : o;
              n.fillText(u, p, f),
                n.beginPath(),
                n.moveTo(e + 0.5, a - (l + c)),
                n.lineTo(e + 0.5, a - l),
                n.stroke(),
                n.closePath();
            }
            return this;
          }),
          (s.drawSelection = function (e) {
            var t = this.ctx,
              n = this.innerH(),
              i = this.innerW(),
              a = this.verticalScaleX(),
              r = Math.max(2 * this.lineWidth, 10),
              o = this.cursorPosition(e),
              s = this.handleWidth,
              l = this.selectingColor,
              c = this.unselectedColor,
              u = t.fillStyle;
            if (this._mouseIsDown)
              return (
                (t.fillStyle = l),
                this._selectedIn < o.left
                  ? t.fillRect(
                      this._selectedIn,
                      r,
                      Math.min(
                        o.left - this._selectedIn,
                        a + i - this._selectedIn
                      ),
                      n
                    )
                  : t.fillRect(
                      Math.max(o.left, a),
                      r,
                      Math.min(this._selectedIn - o.left, i),
                      n
                    ),
                (t.fillStyle = u),
                this
              );
            if (this._selectedIn && this._selectedOut) {
              var d = t.lineWidth,
                p = t.strokeStyle;
              if (
                (this._selectedIn < a && (this._selectedIn = a),
                this._selectedOut > a + i && (this._selectedOut = a + i),
                (t.fillStyle = c),
                this._selectedOut && this._selectedIn > this._selectedOut)
              ) {
                var f = this._selectedOut;
                (this._selectedOut = this._selectedIn), (this._selectedIn = f);
              }
              t.fillRect(a, r, this._selectedIn - a, n),
                t.fillRect(this._selectedOut, r, i + a - this._selectedOut, n),
                t.beginPath(),
                t.moveTo(this._selectedIn + 0.5, n + r),
                t.lineTo(this._selectedIn + 0.5, r + 0.5),
                t.lineTo(this._selectedOut + 0.5, r + 0.5),
                t.lineTo(this._selectedOut + 0.5, n + r),
                t.stroke(),
                (t.lineWidth = s + 2),
                (t.strokeStyle = this.rulersColor),
                t.beginPath(),
                t.moveTo(this._selectedIn, r + 10),
                t.lineTo(this._selectedIn, 80),
                t.stroke(),
                t.closePath(),
                (t.lineWidth = s),
                (t.strokeStyle =
                  "in" === this._hoveredSelectionHandle
                    ? this.handleColorHover
                    : this.handleColor),
                t.beginPath(),
                t.moveTo(this._selectedIn, r + 10),
                t.lineTo(this._selectedIn, 80),
                t.stroke(),
                (t.lineWidth = s + 2),
                (t.strokeStyle = "#333"),
                t.beginPath(),
                t.moveTo(this._selectedOut, r + 10),
                t.lineTo(this._selectedOut, 80),
                t.stroke(),
                t.closePath(),
                (t.lineWidth = s),
                (t.strokeStyle =
                  "out" === this._hoveredSelectionHandle
                    ? this.handleColorHover
                    : this.handleColor),
                t.beginPath(),
                t.moveTo(this._selectedOut, r + 10),
                t.lineTo(this._selectedOut, 80),
                t.stroke(),
                (t.lineWidth = d),
                (t.fillStyle = u),
                (t.strokeStyle = p);
            }
            return this;
          }),
          (s.hoveredSelectionHandle = function (e) {
            if (!this._selectedIn || !this._selectedOut) return !1;
            var t = this.cursorPosition(e),
              n = this.ctx,
              i = Math.max(2 * this.lineWidth, 10),
              a = !1,
              r = this.handleWidth + 4,
              o = n.lineWidth,
              s = n.strokeStyle;
            return (
              (n.lineWidth = 1),
              (n.strokeStyle = "rgba(0,0,0,0)"),
              n.beginPath(),
              n.rect(this._selectedIn - r / 2, i + 10, r, 80),
              n.stroke(),
              n.closePath(),
              n.isPointInPath(t.left, t.top) && (a = "in"),
              n.beginPath(),
              n.rect(this._selectedOut - r / 2, i + 10, r, 80),
              n.stroke(),
              n.closePath(),
              n.isPointInPath(t.left, t.top) && (a = "out"),
              (n.lineWidth = o),
              (n.strokeStyle = s),
              a
            );
          }),
          (s.maxLog = function () {
            var e = this.max() || 1;
            return Math.ceil(r(e));
          }),
          (s.drawRulers = function () {
            var e,
              t,
              n,
              i,
              a,
              o = this.offCtx,
              s = this.lineWidth,
              l = Math.max(2 * s, 10),
              c = this.abbreviateNumber,
              u = this.timeLabels,
              d = this.valueLabels,
              p = o.canvas.height,
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
            var E = p - m + 0.5;
            for (
              o.beginPath(),
                o.moveTo(v - h, E),
                o.lineTo(v + g, E),
                o.stroke(),
                o.beginPath(),
                o.moveTo(v, l),
                o.lineTo(v, E + h),
                o.stroke(),
                b
                  ? ((o.textAlign = "right"), (o.textBaseline = "middle"))
                  : ((o.textAlign = "center"), (o.textBaseline = "top")),
                u.forEach(function (e, t) {
                  var n = v + t * (g / (u.length - 1));
                  o.beginPath(),
                    o.moveTo(n, E),
                    o.lineTo(n, E + h),
                    o.stroke(),
                    b
                      ? (o.save(),
                        o.translate(n, p - (m - (h + f))),
                        o.rotate(-Math.PI / 2),
                        o.fillText(u[t], 0, 0),
                        o.restore())
                      : o.fillText(u[t], n, p - (m - (h + f)));
                }),
                e = y / (d.length - 1),
                i = this.maxLog(),
                o.textAlign = "right",
                o.textBaseline = "middle",
                t = 0;
              t < d.length;
              t++
            )
              (n = d[t]),
                (a = this.isLogScale
                  ? y - (n && (y / (i + 1)) * (r(n) + 1)) + l
                  : Math.round(l + e * t) - 0.5),
                o.fillText(c(n) || 0, v - (h + f), a),
                t < d.length - 1 &&
                  (o.beginPath(),
                  o.moveTo(v - h, a),
                  o.lineTo(v, a),
                  o.stroke());
            return this;
          }),
          (s.draw = function () {
            var e = this.offCtx,
              t = this.lineWidth,
              n = Math.max(2 * t, 10),
              a = e.canvas.width,
              o = e.canvas.height,
              s = this.verticalScaleX(),
              l = this.horizontalScaleY(),
              c = this.innerW(),
              u = this.innerH();
            e.clearRect(0, 0, a, o);
            var d = this.labelFrom,
              p = this.labelTo - d,
              f = this.interval,
              h = o - l + 0.5,
              v = this.isLogScale,
              m = this.max(),
              g = this.maxLog(),
              y = i(m, this.valueLabelsCount);
            function b(e) {
              if (!e) return h;
              var t = e && (u / (g + 1)) * (r(e) + 1);
              return v ? u - t + n : u - (u / y) * e + n;
            }
            function E(e) {
              return s + ((e - d) / p) * c;
            }
            return (
              this.data.forEach(function (n, i) {
                var a,
                  r,
                  c,
                  u,
                  p = this.moment,
                  h = this.lineColors[i];
                (e.lineWidth = t),
                  (e.strokeStyle = h),
                  e.beginPath(),
                  n.forEach(function (t, n) {
                    (c = p(t.timestamp, p.ISO_8601)) <= d
                      ? (u = t)
                      : (0 === n &&
                          c > d &&
                          (e.moveTo(s, o - l),
                          e.lineTo(E(c.clone().subtract(f, "seconds")), o - l)),
                        u &&
                          ((a = s),
                          (r = b(u.value)),
                          e.lineTo(a, r),
                          (u = null)),
                        (a = E(c)),
                        (r = b(t.value)),
                        e.lineTo(a, r));
                  }),
                  p() - c >= 1e3 * f &&
                    ((a = E(c.clone().add(f, "seconds"))),
                    (r = o - l),
                    e.lineTo(a, r),
                    (a = E(p())),
                    e.lineTo(a, r)),
                  e.stroke(),
                  e.closePath(),
                  n.length >= 1 &&
                    (e.beginPath(),
                    (e.fillStyle = h),
                    e.arc(a, r, 2 * t, 0, 2 * Math.PI),
                    e.fill(),
                    e.closePath());
              }, this),
              this.ctx.drawImage(this.offCanvas, 0, 0, a, o, 0, 0, a, o),
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
              link: function (t, n, i, a) {
                var r = e(function () {
                  var t = n.val();
                  t !== a.$viewValue && (a.$setViewValue(t), a.$setPristine()),
                    "function" != typeof document.contains ||
                    document.contains(n[0])
                      ? "function" != typeof document.contains && e.cancel(r)
                      : e.cancel(r);
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
                var a =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                i.$parsers.unshift(function (e) {
                  return a.test(e) || !e
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
          a = n(82701),
          r = n(25447),
          o = [
            "$scope",
            "$http",
            "$location",
            "$window",
            "Uri",
            "Notifications",
            "$translate",
            function (e, t, n, a, r, o, s) {
              var l = r.appUri(":engine"),
                c = {};
              t.get(r.appUri("engine://engine/"))
                .then(function (t) {
                  (e.engines = t.data),
                    i.forEach(e.engines, function (e) {
                      c[e.name] = e;
                    }),
                    (e.currentEngine = c[l]),
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
            template: a,
            replace: !0,
            controller: o,
            link: function (e, t, n) {
              var i;
              e.$watch(n.ngShow, function (e) {
                e &&
                  !i &&
                  (i = r('<li class="divider-vertical"></li>').insertAfter(t)),
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
          a = n(69064);
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
              template: a,
              link: function (t, n, a) {
                if (
                  ((t.isRequired =
                    null !== a.required && void 0 !== a.required),
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
          a = n(36143),
          r = n(66957),
          o = n(42401),
          s = n(43188),
          l = n(80013),
          c = n(77337),
          u = n(25512),
          d = n(89155),
          p = n(5085),
          f = n(90517);
        n(6978);
        var h = i.module("camunda.common.directives", ["ui.bootstrap", f.name]);
        h.directive("email", a),
          h.directive("autoFill", o),
          h.directive("engineSelect", r),
          h.directive("camInPlaceTextField", s),
          h.directive("notificationsPanel", l),
          h.directive("passwordRepeat", c),
          h.directive("showIfAuthorized", u),
          h.directive("nl2br", d),
          h.directive("instantTypeahead", p),
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
              link: function (e, n, i, a) {
                a.$parsers.unshift(function (e) {
                  var n = e || t;
                  return (a.$viewValue = n), n;
                }),
                  a.$parsers.push(function (e) {
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
                    a.$setViewValue(" " === a.$viewValue ? "" : " "),
                      n.triggerHandler("input");
                  }),
                  n.bind("input", function () {
                    a.$setViewValue(a.$viewValue);
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
                var a = i.filter;
                var r = (i.notifications = []),
                  o = {
                    add: function (e) {
                      return (
                        !!(function (e) {
                          return !a || !!t("filter")([e], a).length;
                        })(e) && (r.push(e), !0)
                      );
                    },
                    remove: function (e) {
                      var t = r.indexOf(e);
                      -1 != t && r.splice(t, 1);
                    },
                  };
                e.registerConsumer(o),
                  (i.removeNotification = function (e) {
                    r.splice(r.indexOf(e), 1);
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
              var a = n.passwordRepeat;
              i.$parsers.unshift(function (t) {
                var n = t == e.$eval(a);
                return i.$setValidity("passwordRepeat", n), t;
              }),
                e.$watch(a, function (e) {
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
              compile: function (i, a, r) {
                return function (i, o) {
                  var s,
                    l,
                    c = a.authPermission,
                    u = a.authResourceName,
                    d = i.$eval(a.authResourceId),
                    p = "true" === a.authInverse;
                  n.check(
                    (function (e, n, i) {
                      var a = {};
                      return (
                        (a.permissionName = e),
                        (a.resourceName = n),
                        (a.resourceType = t[n]),
                        i && (a.resourceId = i),
                        a
                      );
                    })(c, u, d)
                  )
                    .$promise.then(function (t) {
                      s && (e.leave(s), (s = void 0)),
                        l && (l.$destroy(), (l = void 0)),
                        ((t.authorized && !p) || (!t.authorized && p)) &&
                          ((l = i.$new()),
                          r(l, function (t) {
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
                      var a = Math.pow(10, 3 * (i + 1));
                      if (a <= e)
                        return (
                          1e3 == (e = Math.round((e * t) / a) / t) &&
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
          a = n(92620);
        n(61893);
        var r = i.module("cam.commons.filter.date", ["pascalprecht.translate"]);
        r.provider("camDateFormat", function () {
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
          r.config([
            "$filterProvider",
            function (e) {
              e.register("camDate", [
                "$translate",
                "camDateFormat",
                function (e, t) {
                  return function (e, n) {
                    return e
                      ? ("number" == typeof e && (e = new Date(e)),
                        a(e, a.ISO_8601).format(t(n)))
                      : "";
                  };
                },
              ]);
            },
          ]),
          (e.exports = r);
      },
      40932: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(1792),
          a = n(72599),
          r = n(90517),
          o = n(40263),
          s = n(45386),
          l = n(66011),
          c = n(7154),
          u = n(92773),
          d = n(38025),
          p = n(16386),
          f = n(68416);
        n(6978),
          n(61893),
          n(82298),
          n(27110),
          (e.exports = i.module("cam.commons", [
            a.name,
            r.name,
            o.name,
            s.name,
            l.name,
            c.name,
            u.name,
            d.name,
            p.name,
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
        var a = n(25447),
          r = i.module("camunda.common.pages", ["ngRoute"]),
          o = [
            "$rootScope",
            "$location",
            "Notifications",
            "AuthenticationService",
            "shouldDisplayAuthenticationError",
            "$translate",
            "configuration",
            function (e, t, n, i, r, o, s) {
              function l(e) {
                (e.http = !0), (e.exclusive = ["http"]), n.addError(e);
              }
              e.$on("httpError", function (n, c) {
                var u,
                  d = c.status,
                  p = c.data,
                  f = c.response.config;
                if ("GET" !== f.method || "/camunda-welcome" !== f.url)
                  switch (d) {
                    case 500:
                      p && p.message
                        ? l({
                            status: o.instant("PAGES_STATUS_SERVER_ERROR"),
                            message: p.message,
                            exceptionType: p.exceptionType,
                          })
                        : l({
                            status: o.instant("PAGES_STATUS_SERVER_ERROR"),
                            message: o.instant("PAGES_MSG_SERVER_ERROR"),
                          });
                      break;
                    case 0:
                      l({
                        status: o.instant("PAGES_STATUS_REQUEST_TIMEOUT"),
                        message: o.instant("PAGES_MSG_REQUEST_TIMEOUT"),
                      });
                      break;
                    case 401:
                      -1 !== t.absUrl().indexOf("/setup/#")
                        ? t.path("/setup")
                        : (t.absUrl(),
                          (u = s.getAppVendor() + " " + s.getAppName()),
                          a("head title").text(u),
                          i.updateAuthentication(null),
                          e.$broadcast("authentication.login.required"));
                      break;
                    case 403:
                      if ("AuthorizationException" == p.type) {
                        var h;
                        if (p.resourceId)
                          h = o.instant("PAGES_MSG_ACCESS_DENIED_RESOURCE_ID", {
                            permissionName: p.permissionName.toLowerCase(),
                            resourceName: p.resourceName.toLowerCase(),
                            resourceId: p.resourceId,
                          });
                        else {
                          var v = p.missingAuthorizations.map(function (e) {
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
                        l({
                          status: o.instant("PAGES_STATUS_ACCESS_DENIED"),
                          message: h,
                        });
                      } else
                        l({
                          status: o.instant("PAGES_STATUS_ACCESS_DENIED"),
                          message: o.instant("PAGES_MSG_ACTION_DENIED"),
                        });
                      break;
                    case 404:
                      r() &&
                        l({
                          status: o.instant("PAGES_STATUS_NOT_FOUND"),
                          message: o.instant("PAGES_MSG_NOT_FOUND"),
                        });
                      break;
                    default:
                      l({
                        status: o.instant("PAGES_STATUS_COMMUNICATION_ERROR"),
                        message: o.instant("PAGES_MSG_COMMUNICATION_ERROR", {
                          status: d,
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
            function (e, t, n, a, r, o, s) {
              var l = r.appUri(":engine"),
                c = {};
              t
                .get(r.appUri("engine://engine/"))
                .then(function (t) {
                  (e.engines = t.data),
                    i.forEach(e.engines, function (e) {
                      c[e.name] = e;
                    }),
                    (e.currentEngine = c[l]),
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
                    l !== e.name &&
                    (a.location.href = r.appUri("app://../" + e.name + "/"));
                });
            },
          ];
        e.exports = r
          .run(o)
          .controller("ProcessEngineSelectionController", s)
          .controller("AuthenticationController", [
            "$scope",
            "$window",
            "$cacheFactory",
            "$location",
            "Notifications",
            "AuthenticationService",
            function (e, t, n, i, a, r) {
              e.logout = function () {
                r.logout();
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
          a = n(57537),
          r = n(69353),
          o = i.module("webapps.plugin", []);
        a(o), r(o), (e.exports = o);
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
          a = n(25447);
        e.exports = function (e) {
          var t;
          e._camPlugins = {};
          var n = [],
            r = a("base").attr("cam-exclude-plugins") || "";
          function o(e) {
            return String.prototype.trim
              ? e.trim()
              : e.replace(/^\s+|\s+$/g, "");
          }
          r &&
            (i.forEach(r.split(","), function (e) {
              var t = "*";
              (e = e.split(":")).length >= 2 && o(e[1]) && (t = o(e.pop())),
                (e = o(e.shift())) && n.push(e + ":" + t);
            }),
            (t = new RegExp("(" + n.join("|") + ")", "i")));
          var s = [
            function () {
              var n = {};
              (this.registerPlugin = function (i, a, r) {
                ((e._camPlugins[a + ":" + r.id] = !1),
                t && t.test(a + ":" + r.id)) ||
                  ((e._camPlugins[a + ":" + r.id] = !0),
                  (function (e, t, n) {
                    !(function (e, t) {
                      for (
                        var n,
                          i = void 0 !== t.priority ? t.priority : -1 / 0,
                          a = 0;
                        (n = e[a]);
                        a++
                      )
                        if (void 0 === n.priority || n.priority < i)
                          return void e.splice(a, 0, t);
                      e.push(t);
                    })((n[e] = n[e] || []), t);
                  })(a, r, (n[i] = n[i] || {})));
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
                        var a = i.component;
                        if (!a) throw new Error("No component given");
                        var r = (n[t] || {})[a];
                        return (
                          i.id && (r = e("filter")(r, { id: i.id })), r || []
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
          var l = [
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
                    function a() {
                      var a;
                      n ||
                        ((a = t.getAllProviders("view")),
                        i.forEach(a, function (t) {
                          i.forEach(t, function (t) {
                            t.url && (t.url = e.appUri(t.url));
                          });
                        }),
                        (n = !0));
                    }
                    return {
                      getProviders: function (e) {
                        return a(), t.getProviders("view", e);
                      },
                      getProvider: function (e) {
                        return (this.getProviders(e) || [])[0];
                      },
                    };
                  },
                ]);
            },
          ];
          e.provider("Views", l);
          var c = [
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
                        var a = this.getProviders({ component: e });
                        i.forEach(a, function (e) {
                          t.instantiate(e.controller, n);
                        });
                      },
                    };
                  },
                ]);
            },
          ];
          e.provider("Data", c);
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
            function (e, t, n, a, r, o) {
              return {
                restrict: "ECA",
                terminal: !0,
                link: function (s, l, c) {
                  var u;
                  function d() {
                    u && (u.$destroy(), (u = null));
                  }
                  function p() {
                    l.html(""), d();
                  }
                  s.$watch(c.provider, function () {
                    var f = s.$eval(c.provider),
                      h = s.$eval(c.vars) || {};
                    if (!f) return void p();
                    e.when(
                      (function (e) {
                        var a = e.template;
                        if (a) return a;
                        var r = e.url;
                        return t
                          .get(r, { cache: n })
                          .then(function (e) {
                            return e.data;
                          })
                          .catch(i.noop);
                      })(f)
                    ).then(
                      function (e) {
                        l.html(e), d();
                        var t,
                          n = r(l.contents()),
                          c = {};
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
                            ((c.$scope = u),
                            (t = o(f.controller, c)),
                            l.children().data("$ngControllerController", t)),
                          n(u),
                          u.$emit("$pluginContentLoaded"),
                          a();
                      },
                      function (e) {
                        throw (p(), e);
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
          a = n(91071),
          r = i.module("camunda.common.resources", []);
        r.factory("AuthorizationResource", a), (e.exports = r);
      },
      92773: function (e, t, n) {
        "use strict";
        n(84392), n(56806), n(31083), n(92695), n(66893);
        var i = n(1792),
          a = [
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
              var a = function () {
                return e.search.apply(e, arguments);
              };
              return (
                (a.updateSilently = function (t, a) {
                  var r = e.absUrl();
                  i.forEach(t, function (t, n) {
                    e.search(n, t);
                  }),
                    e.absUrl() != r && (n = !0),
                    a && e.replace();
                }),
                a
              );
            },
          ],
          r = i.module("camunda.common.search", []);
        r.factory("search", a), (e.exports = r);
      },
      35914: function (e, t, n) {
        "use strict";
        n(84392), n(66893);
        var i = n(1792),
          a = n(59721);
        e.exports = [
          "$rootScope",
          "$timeout",
          "$q",
          "$cookies",
          "configuration",
          "ifUnauthorizedForwardToWelcomeApp",
          function (e, t, n, r, o, s) {
            function l(e) {
              this._wrapped = new a.Client.HttpClient(e);
            }
            return (
              i.forEach(
                ["post", "get", "load", "put", "del", "options", "head"],
                function (a) {
                  l.prototype[a] = function (l, c) {
                    var u = t(function () {}, 1e5);
                    !(function (e) {
                      var t = (e.headers = e.headers || {}),
                        n = r.get(o.getCsrfCookieName());
                      n && (t["X-XSRF-TOKEN"] = n);
                    })(c);
                    var d = i.isFunction(c.done) ? c.done : i.noop;
                    return (
                      (c.done = function (n, i, a) {
                        function r() {
                          if ((s(a), n && 401 === n.status))
                            return (
                              e.$broadcast("authentication.changed", null),
                              (e.authentication = null),
                              void e.$broadcast("authentication.login.required")
                            );
                          d(n, i);
                        }
                        var o = e.$$phase;
                        "$apply" !== o && "$digest" !== o ? e.$apply(r) : r(),
                          t.cancel(u);
                      }),
                      n.when(this._wrapped[a](l, c))
                    );
                  };
                }
              ),
              i.forEach(["on", "once", "off", "trigger"], function (e) {
                l.prototype[e] = function () {
                  this._wrapped[e].apply(this, arguments);
                };
              }),
              l
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
            function (e, t, n, i, a) {
              return {
                getByRouteParam: function (r, o) {
                  var s = t.defer(),
                    l = e.current.params[r],
                    c = o.resolve,
                    u = o.name || "entity";
                  function d(e) {
                    s.resolve(e);
                  }
                  function p(e) {
                    var t,
                      r,
                      c,
                      d = !1;
                    404 === e.status
                      ? ((t = a.instant(
                          "SERVICES_RESOURCE_RESOLVER_ID_NOT_FOUND",
                          { resourceName: u, id: l }
                        )),
                        (r = !0),
                        "function" ==
                          typeof (c = o.redirectTo || "/dashboard") &&
                          ((d = !0), c(e)))
                      : 401 === e.status
                      ? ((t = a.instant(
                          "SERVICES_RESOURCE_RESOLVER_AUTH_FAILED"
                        )),
                        (c = "/login"))
                      : ((t = a.instant(
                          "SERVICES_RESOURCE_RESOLVER_RECEIVED_STATUS",
                          { status: e.status }
                        )),
                        (c = "/dashboard")),
                      d ||
                        (n.path(c),
                        r && n.replace(),
                        i.addError({
                          status: a.instant(
                            "SERVICES_RESOURCE_RESOLVER_DISPLAY_FAILED",
                            { resourceName: u }
                          ),
                          message: t,
                          http: !0,
                          exclusive: ["http"],
                        })),
                      s.reject(t);
                  }
                  var f = c(l);
                  if (f.$promise && f.$promise.then)
                    f = f.$promise.then(function (e) {
                      d(e);
                    }, p);
                  else {
                    if (!f.then)
                      throw new Error(
                        a.instant("SERVICES_RESOURCE_RESOLVER_NO_PROMISE")
                      );
                    f = f.then(d, p);
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
              return function a() {
                var r = this,
                  o = arguments;
                (a.$loading = !0),
                  i && e.cancel(i),
                  (i = e(function () {
                    (i = null), (a.$loading = !1), t.apply(r, o);
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
                    var a = e.appUri(":appName");
                    "welcome" === a ||
                      i.includes(a) ||
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
          a = n(90517),
          r = n(61230),
          o = n(86374),
          s = n(81236),
          l = n(74791),
          c = n(35914),
          u = n(48877),
          d = n(13826),
          p = n(48597),
          f = n(47215),
          h = n(61262),
          v = n(68587),
          m = i.module("camunda.common.services", [a.name]);
        m.filter("escape", r),
          m.factory("debounce", o),
          m.factory("RequestLogger", s),
          m.factory("ResourceResolver", l),
          m.factory("camAPIHttpClient", c),
          m.factory("unescape", u),
          m.factory("fixDate", d),
          m.factory("ifUnauthorizedForwardToWelcomeApp", p),
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
                        var a = {
                          status: parseInt(i.status),
                          response: i,
                          data: i.data,
                        };
                        return e.$broadcast("httpError", a), t.reject(i);
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
        function a(e, t) {
          return e.replace(
            'xmlns="' + t + '"',
            'xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"'
          );
        }
        e.exports = function (e) {
          return i.reduce(a, e);
        };
      },
      90517: function (e, t, n) {
        "use strict";
        n(82447), n(84392);
        var i = n(1792),
          a = n(83845),
          r = n(15806),
          o = n(62197);
        e.exports = i
          .module("cam.commons.util", [])
          .filter("uri", a)
          .provider("Uri", r)
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
        function a(e) {
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
                  r = this.notifications,
                  o = this.consumers,
                  s = e.exclusive;
                if (
                  (e.unsafe ||
                    ((e.status = a(e.status)),
                    (e.message = a(e.message || ""))),
                  s)
                )
                  if ("boolean" == typeof s) this.clearAll();
                  else {
                    var l = {};
                    i.forEach(s, function (t) {
                      l[t] = e[t];
                    }),
                      n.clear(l);
                  }
                r.push(e);
                for (var c, u = o.length - 1; (c = o[u]) && !c.add(e); u--);
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
                  a = this.consumers,
                  r = [];
                "string" == typeof t && (t = { status: t }),
                  (r = e("filter")(n, t)).push(t),
                  i.forEach(r, function (e) {
                    var t = n.indexOf(e);
                    -1 != t && n.splice(t, 1),
                      i.forEach(a, function (t) {
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
                  appUri: function (a) {
                    return a.replace(e, function (e) {
                      var a = t[e];
                      return void 0 === a
                        ? e
                        : ((i.isFunction(a) || i.isArray(a)) &&
                            (a = n.invoke(a)),
                          a);
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
          a = {};
        e.exports = {
          generateViewer: function (e) {
            var t = i;
            e.disableNavigation &&
              (t = Object.getPrototypeOf(i.prototype).constructor);
            return new t(e);
          },
          cacheViewer: function (e) {
            return e.key && (a[e.key] = e.viewer);
          },
        };
      },
      38284: function (e, t, n) {
        "use strict";
        var i = n(54834),
          a = n(18107);
        e.exports = [
          "$uibModal",
          function (e) {
            return {
              scope: { annotation: "<", readonly: "=?", onSubmit: "&" },
              template: i,
              link: function (t) {
                t.openModal = function () {
                  e.open(
                    a(t.annotation, !!t.readonly, t.onSubmit())
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
              function (i, a, r, o, s) {
                (i.readOnly = t),
                  (i.maxAnnotationLength =
                    r.getUserOperationLogAnnotationLength()),
                  (i.text = e || ""),
                  (i.dirty = !1),
                  (i.valid = !0),
                  (i.loadingState = "INITIAL"),
                  (i.updateAnnotation = function () {
                    n(i.text)
                      .then(function () {
                        a.addMessage({
                          status: s.instant("SUCCESS"),
                          message: s.instant(
                            "PLGN_AUDIT_EDIT_NOTIFICATION_SUCCESS"
                          ),
                          exclusive: !0,
                        }),
                          (i.dirty = !1);
                      })
                      .catch(function (t) {
                        a.addError({
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
        function a(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return r(e);
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
              if ("string" == typeof e) return r(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === n && e.constructor && (n = e.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(e);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return r(e, t);
            })(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function r(e, t) {
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
          l = n(70555),
          c = n(86188);
        e.exports = [
          "$q",
          "$document",
          "$compile",
          "$location",
          "$rootScope",
          "search",
          "debounce",
          function (e, t, n, r, u, d, p) {
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
              template: c,
              link: function (c, f) {
                var h,
                  v = null,
                  m = null,
                  g = [],
                  y = f[0].querySelector(".diagram-holder");
                function b() {
                  y.appendChild(v._container);
                }
                (c.grabbing = !1),
                  (c.disableNavigation = c.$eval(c.disableNavigation)),
                  (c.control = c.control || {}),
                  (c.control.highlight = function (e) {
                    m.addMarker(e, "highlight"),
                      f
                        .find('[data-element-id="' + e + '"]>.djs-outline')
                        .attr({ rx: "14px", ry: "14px" });
                  }),
                  (c.control.clearHighlight = function (e) {
                    m.removeMarker(e, "highlight");
                  }),
                  (c.control.isHighlighted = function (e) {
                    return m.hasMarker(e, "highlight");
                  }),
                  (c.control.createBadge = function (e, t) {
                    var i,
                      a = v.get("overlays");
                    t.html
                      ? (i = t.html)
                      : ((i = document.createElement("span")),
                        t.color && (i.style["background-color"] = t.color),
                        t.tooltip &&
                          (i.setAttribute("tooltip", t.tooltip),
                          i.setAttribute("tooltip-placement", "top")),
                        t.text &&
                          i.appendChild(document.createTextNode(t.text)));
                    var r = a.add(e, {
                      position: t.position || { bottom: 0, right: 0 },
                      show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                      html: i,
                    });
                    return n(i)(c), r;
                  }),
                  (c.control.removeBadges = function (e) {
                    v.get("overlays").remove({ element: e });
                  }),
                  (c.control.removeBadge = function (e) {
                    v.get("overlays").remove(e);
                  }),
                  (c.control.getViewer = function () {
                    return v;
                  }),
                  (c.control.scrollToElement = function (e) {
                    var t = c.control.getElement(e);
                    m.scrollToElement(t);
                  }),
                  (c.control.getElement = function (e) {
                    return v.get("elementRegistry").get(e);
                  }),
                  (c.control.getElements = function (e) {
                    return v.get("elementRegistry").filter(e);
                  }),
                  (c.loaded = !1),
                  (c.control.isLoaded = function () {
                    return c.loaded;
                  }),
                  (c.control.addAction = function (e) {
                    var t = f.find(".actions"),
                      i = e.html;
                    t.append(i), n(i)(c);
                  }),
                  (c.control.addImage = function (n, i, a) {
                    return ((r = n),
                    (o = t[0].body),
                    (l = e.defer()),
                    (c = s
                      .element("<img>")
                      .css("position", "absolute")
                      .css("left", "-9999em")
                      .css("top", "-9999em")
                      .attr("src", r)[0]),
                    (c.onload = function () {
                      l.resolve(c);
                    }),
                    (c.onerror = function () {
                      l.reject(c);
                    }),
                    o.appendChild(c),
                    l.promise).then(
                      function (e) {
                        var r = e.offsetWidth,
                          o = e.offsetHeight,
                          l = t[0].createElementNS(
                            "http://www.w3.org/2000/svg",
                            "image"
                          );
                        return (
                          l.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            n
                          ),
                          l.setAttributeNS(null, "width", r),
                          l.setAttributeNS(null, "height", o),
                          l.setAttributeNS(null, "x", i),
                          l.setAttributeNS(null, "y", a),
                          t[0].body.removeChild(e),
                          m._viewport.appendChild(l),
                          s.element(l)
                        );
                      },
                      function (e) {
                        t[0].body.removeChild(e);
                      }
                    );
                    var r, o, l, c;
                  });
                var E = c.bpmnJsConf,
                  k = [];
                E &&
                  E.additionalModules &&
                  !Array.isArray(E.additionalModules) &&
                  s.forEach(o.load(), function (e, t) {
                    E.additionalModules[t] && k.push(e);
                  }),
                  Array.isArray(null == E ? void 0 : E.additionalModules) &&
                    k.push.apply(k, a(E.additionalModules)),
                  (v = l.generateViewer({
                    width: "100%",
                    height: "100%",
                    canvas: { deferUpdate: !1 },
                    key: c.key,
                    disableNavigation: c.disableNavigation,
                    additionalModules: k,
                    moddleExtensions: window.bpmnJsModdleExtensions || {},
                  })).cached || b();
                var w = v.get("overlays").show.bind(v.get("overlays"));
                v.get("overlays").show = function () {
                  v.get("eventBus").fire("overlays.show"), w();
                };
                var _ = v.get("overlays").hide.bind(v.get("overlays"));
                v.get("overlays").hide = function () {
                  v.get("eventBus").fire("overlays.hide"), _();
                };
                var I = p(function () {
                    v.get("overlays").show();
                  }, 300),
                  S = v.get("canvas")._viewboxChanged.bind(v.get("canvas")),
                  x = p(function () {
                    S(), v.get("overlays").hide(), I();
                  }, 0);
                v.get("canvas")._viewboxChanged = function () {
                  x();
                };
                var A = null;
                function T() {
                  var e;
                  (m = v.get("canvas")),
                    (h = v._definitions),
                    (e = v.get("eventBus")).on("element.click", L),
                    e.on("element.hover", D),
                    e.on("element.out", O),
                    e.on("element.mousedown", N),
                    e.on("canvas.viewbox.changed", P),
                    e.on("root.set", R),
                    (function () {
                      if (m) {
                        var e = JSON.parse((r.search() || {}).viewbox || "{}")[
                            h.id
                          ],
                          t = (r.search() || {}).rootElement;
                        if (t) {
                          var n = m.findRoot(t);
                          m.setRootElement(n);
                        }
                        e ? m.viewbox(e) : m.zoom("fit-viewport", "auto");
                      }
                    })(),
                    (c.loaded = !0);
                }
                c.$watch("diagramData", function (e) {
                  e &&
                    ((A = e),
                    (function () {
                      if (v.cached) return b(), T(), c.onLoad();
                      if (A) {
                        c.loaded = !1;
                        var e = "object" === i(A),
                          t = (e ? v.open : v.importXML).bind(v),
                          n = A;
                        e &&
                          (v._setDefinitions(A),
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
                                : c.$apply.bind(c))(function () {
                                return (c.warn = n), T(), c.onLoad();
                              });
                            })
                            .catch(function (e) {
                              c.error = e;
                            });
                      }
                    })());
                });
                var C = function e() {
                  (c.grabbing = !1),
                    document.removeEventListener("mouseup", e),
                    c.$apply();
                };
                function L(e) {
                  c.onClick({ element: e.element, $event: e.originalEvent });
                }
                function D(e) {
                  c.onMouseEnter({
                    element: e.element,
                    $event: e.originalEvent,
                  });
                }
                function O(e) {
                  c.onMouseLeave({
                    element: e.element,
                    $event: e.originalEvent,
                  });
                }
                function N() {
                  (c.grabbing = !0),
                    document.addEventListener("mouseup", C),
                    c.$apply();
                }
                var P = p(function (e) {
                    var t = JSON.parse((r.search() || {}).viewbox || "{}");
                    (t[h.id] = {
                      x: e.viewbox.x,
                      y: e.viewbox.y,
                      width: e.viewbox.width,
                      height: e.viewbox.height,
                    }),
                      d.updateSilently({ viewbox: JSON.stringify(t) });
                    var n = u.$$phase;
                    "$apply" !== n && "$digest" !== n
                      ? c.$apply(function () {
                          r.replace();
                        })
                      : r.replace();
                  }, 500),
                  R = function (e, t) {
                    var n = t.element;
                    c.onRootChange(),
                      n &&
                        (d.updateSilently({ rootElement: n.id }),
                        g.includes(n) ||
                          (m.zoom("fit-viewport", "auto"), g.push(n)));
                  };
                (c.zoomIn = function () {
                  v.get("zoomScroll").zoom(1, {
                    x: f[0].offsetWidth / 2,
                    y: f[0].offsetHeight / 2,
                  });
                }),
                  (c.zoomOut = function () {
                    v.get("zoomScroll").zoom(-1, {
                      x: f[0].offsetWidth / 2,
                      y: f[0].offsetHeight / 2,
                    });
                  }),
                  (c.resetZoom = function () {
                    m.resized(), m.zoom("fit-viewport", "auto");
                  }),
                  (c.control.resetZoom = c.resetZoom),
                  (c.control.refreshZoom = function () {
                    m.resized(), m.zoom(m.zoom(), "auto");
                  }),
                  c.$on("$destroy", function () {
                    var e;
                    y.removeChild(v._container),
                      (e = v.get("eventBus")).off("element.click", L),
                      e.off("element.hover", D),
                      e.off("element.out", O),
                      e.off("element.mousedown", N),
                      e.off("canvas.viewbox.changed", P),
                      e.off("root.set", R),
                      d.updateSilently({ rootElement: null }),
                      v.get("overlays").clear(),
                      l.cacheViewer({ key: c.key, viewer: v });
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
          a = n(60589),
          r = n(92620),
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
                  l = e.getComputedStyle(s);
                function c() {
                  return Math.min(Math.max(0.75 * s.clientWidth, 180), 300);
                }
                (t.timespan = t.timespan || "day"),
                  (t.interval = t.interval || 900);
                var u = (t.chart = new a({
                  moment: r,
                  abbreviateNumber: o,
                  onselection: function (e) {
                    t.$apply(function () {
                      t.selection({ info: e });
                    });
                  },
                  width: s.clientWidth,
                  height: c(),
                  fontFamily: t.fontFamily || l.fontFamily,
                  fontSize: t.fontSize,
                  handleColor: t.handleColor,
                  handleColorHover: t.handleColorHover,
                  handleWidth: t.handleWidth,
                  lineColors: t.lineColors,
                  lineWidth: t.lineWidth,
                  rulersColor: t.rulersColor || l.color,
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
                var d = i(function () {
                  u.resize(s.clientWidth, c()).draw();
                }, 100);
                e.addEventListener("resize", d),
                  t.$on("$destroy", function () {
                    e.removeEventListener("resize", d);
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
          a = n(31324);
        e.exports = [
          "$timeout",
          "$translate",
          function (e, t) {
            return {
              transclude: !0,
              template: a,
              scope: { value: "=camWidgetClipboard", leftSide: "=?" },
              link: function (n, a, r) {
                var o, s;
                function l() {
                  n.$apply(),
                    (s = e(
                      function () {
                        n.copyStatus = null;
                      },
                      1200,
                      !0
                    ));
                }
                function c() {
                  var e = a[0].querySelector("[ng-transclude]"),
                    t = a[0].querySelector("a.glyphicon-copy"),
                    n = window.getComputedStyle(a[0]),
                    i = 1,
                    r = 0;
                  e &&
                    t &&
                    ((i = e.offsetWidth + t.offsetWidth),
                    (r =
                      parseInt(n.width) -
                      parseInt(n.paddingRight) -
                      parseInt(n.paddingLeft))),
                    i - r > 0
                      ? -1 === e.className.indexOf("resize") &&
                        (e.className += " resize")
                      : (e.className = e.className.replace(" resize", ""));
                }
                (n.noTooltip = void 0 !== r.noTooltip),
                  (n.copyStatus = null),
                  (n.icon = r.icon || "glyphicon-copy"),
                  n.$watch("value", function () {
                    n.tooltipText =
                      r.tooltipText ||
                      t.instant("CAM_WIDGET_COPY", { value: n.value });
                  }),
                  e(function () {
                    var e = a[0].querySelector("a." + n.icon);
                    e &&
                      (window.addEventListener("resize", c),
                      c(),
                      (o = new i(e, {
                        text: function () {
                          return n.value;
                        },
                      })).on("success", function () {
                        (n.copyStatus = !0), l();
                      }),
                      o.on("error", function () {
                        (n.copyStatus = !1), l();
                      }));
                  }),
                  n.$on("$destroy", function () {
                    window.removeEventListener("resize", c),
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
        var a = n(64672),
          r = n(89192);
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
              template: r,
              link: function (r, l) {
                var c;
                (r.grabbing = !1),
                  (r.disableNavigation = r.$eval(r.disableNavigation)),
                  (r.control = r.control || {}),
                  (r.control.highlight = function (e) {
                    r.control.addMarker(e, "highlight");
                    var t = e.id || e;
                    l.find('[data-element-id="' + t + '"]>.djs-outline').attr({
                      rx: "14px",
                      ry: "14px",
                    });
                  }),
                  (r.control.clearHighlight = function (e) {
                    r.control.removeMarker(e, "highlight");
                  }),
                  (r.control.isHighlighted = function (e) {
                    return r.control.hasMarker(e, "highlight");
                  }),
                  (r.control.addMarker = function (e, t) {
                    y.addMarker(e, t);
                  }),
                  (r.control.removeMarker = function (e, t) {
                    y.removeMarker(e, t);
                  }),
                  (r.control.hasMarker = function (e, t) {
                    return y.hasMarker(e, t);
                  }),
                  (r.control.createBadge = function (t, n) {
                    var i,
                      a = d.get("overlays");
                    n.html
                      ? (i = n.html)
                      : ((i = document.createElement("span")),
                        n.color && (i.style["background-color"] = n.color),
                        n.tooltip &&
                          (i.setAttribute("tooltip", n.tooltip),
                          i.setAttribute("tooltip-placement", "top")),
                        n.text &&
                          i.appendChild(document.createTextNode(n.text)));
                    var o = a.add(t, {
                      position: n.position || { bottom: 0, right: 0 },
                      show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                      html: i,
                    });
                    return e(i)(r), o;
                  }),
                  (r.control.removeBadges = function (e) {
                    d.get("overlays").remove({ element: e });
                  }),
                  (r.control.removeBadge = function (e) {
                    d.get("overlays").remove(e);
                  }),
                  (r.control.getViewer = function () {
                    return d;
                  }),
                  (r.control.scrollToElement = function (e) {
                    var t,
                      n,
                      i,
                      a,
                      r = d.get("elementRegistry").get(e),
                      o = y.viewbox();
                    (t = Math.max(o.height, r.height)),
                      (n = Math.max(o.width, r.width)),
                      (i = Math.min(
                        Math.max(o.x, r.x - o.width + r.width),
                        r.x
                      )),
                      (a = Math.min(
                        Math.max(o.y, r.y - o.height + r.height),
                        r.y
                      )),
                      y.viewbox({ x: i, y: a, width: n, height: t });
                  }),
                  (r.control.getElement = function (e) {
                    return d.get("elementRegistry").get(e);
                  }),
                  (r.control.getElements = function (e) {
                    return d.get("elementRegistry").filter(e);
                  }),
                  (r.loaded = !1),
                  (r.control.isLoaded = function () {
                    return r.loaded;
                  }),
                  (r.control.addAction = function (t) {
                    var n = l.find(".actions"),
                      i = t.html;
                    n.append(i), e(i)(r);
                  }),
                  (r.control.addImage = function (e, t, n) {
                    return y._viewport.image(e, t, n);
                  });
                var u = a;
                r.disableNavigation &&
                  (u = Object.getPrototypeOf(a.prototype).constructor);
                var d = new u({
                    container: l[0].querySelector(".diagram-holder"),
                    width: "100%",
                    height: "100%",
                    canvas: { deferUpdate: !1 },
                  }),
                  p = d.get("overlays").show.bind(d.get("overlays"));
                d.get("overlays").show = function () {
                  d.get("eventBus").fire("overlays.show"), p();
                };
                var f = d.get("overlays").hide.bind(d.get("overlays"));
                d.get("overlays").hide = function () {
                  d.get("eventBus").fire("overlays.hide"), f();
                };
                var h = s(function () {
                    d.get("overlays").show();
                  }, 300),
                  v = d.get("canvas")._viewboxChanged.bind(d.get("canvas")),
                  m = s(function () {
                    v(), d.get("overlays").hide(), h();
                  }, 0);
                d.get("canvas")._viewboxChanged = function () {
                  m();
                };
                var g = null,
                  y = null;
                r.$watch("diagramData", function (e) {
                  e &&
                    ((g = e),
                    (function () {
                      if (g) {
                        r.loaded = !1;
                        var e = "object" === i(g);
                        (e ? d.importDefinitions : d.importXML).bind(d)(
                          g,
                          function (i, a) {
                            (e
                              ? function (e) {
                                  e();
                                }
                              : r.$apply.bind(r))(function () {
                              var e;
                              i
                                ? (r.error = i)
                                : ((r.warn = a),
                                  (y = d.get("canvas")),
                                  (c = d._definitions),
                                  (function () {
                                    if (y) {
                                      var e = JSON.parse(
                                        (t.search() || {}).viewbox || "{}"
                                      )[c.id];
                                      e
                                        ? y.viewbox(e)
                                        : y.zoom("fit-viewport", "auto");
                                    }
                                  })(),
                                  (e = d.get("eventBus")).on(
                                    "element.click",
                                    function (e) {
                                      r.onClick({
                                        element: e.element,
                                        $event: e.originalEvent,
                                      });
                                    }
                                  ),
                                  e.on("element.hover", function (e) {
                                    r.onMouseEnter({
                                      element: e.element,
                                      $event: e.originalEvent,
                                    });
                                  }),
                                  e.on("element.out", function (e) {
                                    r.onMouseLeave({
                                      element: e.element,
                                      $event: e.originalEvent,
                                    });
                                  }),
                                  e.on("element.mousedown", function () {
                                    (r.grabbing = !0),
                                      document.addEventListener("mouseup", b),
                                      r.$apply();
                                  }),
                                  e.on(
                                    "canvas.viewbox.changed",
                                    s(function (e) {
                                      var i = JSON.parse(
                                        (t.search() || {}).viewbox || "{}"
                                      );
                                      (i[c.id] = {
                                        x: e.viewbox.x,
                                        y: e.viewbox.y,
                                        width: e.viewbox.width,
                                        height: e.viewbox.height,
                                      }),
                                        o.updateSilently({
                                          viewbox: JSON.stringify(i),
                                        });
                                      var a = n.$$phase;
                                      "$apply" !== a && "$digest" !== a
                                        ? r.$apply(function () {
                                            t.replace();
                                          })
                                        : t.replace();
                                    }, 500)
                                  ),
                                  (r.loaded = !0),
                                  r.onLoad());
                            });
                          }
                        );
                      }
                    })());
                });
                var b = function e() {
                  (r.grabbing = !1),
                    document.removeEventListener("mouseup", e),
                    r.$apply();
                };
                (r.zoomIn = function () {
                  d.get("zoomScroll").zoom(1, {
                    x: l[0].offsetWidth / 2,
                    y: l[0].offsetHeight / 2,
                  });
                }),
                  (r.zoomOut = function () {
                    d.get("zoomScroll").zoom(-1, {
                      x: l[0].offsetWidth / 2,
                      y: l[0].offsetHeight / 2,
                    });
                  }),
                  (r.resetZoom = function () {
                    y.resized(), y.zoom("fit-viewport", "auto");
                  }),
                  (r.control.resetZoom = r.resetZoom),
                  (r.control.refreshZoom = function () {
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
          a = n(1792),
          r = n(49404).A,
          o = n(79572).f8,
          s = n(18585),
          l = n(89496),
          c = document.addEventListener;
        (document.addEventListener = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          if ("focusin" !== t[0]) return c.apply(document, t);
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
                template: l,
                link: function (t, n) {
                  var l,
                    c = e.document;
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
                      a.element(n).parent().addClass(t);
                    }),
                    (t.control.highlightElement = function (e) {
                      l &&
                        u.getActiveViewer().get("elementRegistry").get(e) &&
                        (l.addMarker(e, "highlight"),
                        n
                          .find('[data-element-id="' + e + '"]>.djs-outline')
                          .attr({ rx: "14px", ry: "14px" }));
                    }),
                    (t.control.clearAllElementsHighlight = function () {
                      l &&
                        l.getRootElement().children.forEach(function (e) {
                          var t = e.id;
                          l.hasMarker(t, "highlight") &&
                            l.removeMarker(t, "highlight");
                        });
                    }),
                    (t.control.clearElementHighlight = function (e) {
                      l && l.removeMarker(e, "highlight");
                    }),
                    (t.control.isElementHighlighted = function (e) {
                      if (l) return l.hasMarker(e, "highlight");
                    }),
                    (t.control.getElements = function (e) {
                      if (l)
                        return u
                          .getActiveViewer()
                          .get("elementRegistry")
                          .filter(e);
                    }),
                    (t.control.createBadge = function (e, t) {
                      l &&
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
                      l.resized(), l.zoom(l.zoom(), "auto");
                    });
                  var u = new (t.editMode ? o : r)({
                      container: n[0].querySelector(".table-holder"),
                      width: t.width,
                      height: t.height,
                      hideDetails: !t.showDetails,
                      tableViewOnly: t.table,
                      drd: { drillDown: { enabled: t.enableDrdNavigation } },
                    }),
                    d = null;
                  t.$watch("xml", function (e) {
                    e &&
                      i(e).then(function (e) {
                        (d = e),
                          (function () {
                            if (d) {
                              var e = s(d);
                              (t.loaded = !1),
                                u.importXML(e, function (e) {
                                  var n = function () {
                                    return a.isDefined(t.table);
                                  };
                                  (t.isDrd =
                                    u.getDefinitions().drgElement.length > 1 &&
                                    !n()),
                                    t.isDrd &&
                                      ((l = u
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
                                          l.addMarker(e.id, "decision-element");
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
                  var p = t.$apply.bind(t, function () {
                    (t.grabbing = !1), c.removeEventListener("mouseup", p);
                  });
                  function f() {
                    if (t.table) {
                      var e = /^[0-9]+$/.test(t.table);
                      t.table = e ? +t.table : t.table;
                      var n = u.getViews().filter(function (e) {
                        return (
                          (a.isString(t.table) && e.element.id === t.table) ||
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
                    l && (l.resized(), l.zoom("fit-viewport", "auto"));
                  }
                  u.on(
                    "element.mousedown",
                    t.$apply.bind(t, function () {
                      (t.grabbing = !0), c.addEventListener("mouseup", p);
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
                        c.removeEventListener("mouseup", p);
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
        var a = u(n(17238)),
          r = u(n(32950)),
          o = u(n(27201)),
          s = u(n(65049)),
          l = n(52037),
          c = n(99705);
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function d(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, p(i.key), i);
          }
        }
        function p(e) {
          var t = (function (e, t) {
            if ("object" != i(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var a = n.call(e, t || "default");
              if ("object" != i(a)) return a;
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
          var n, i, a;
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
                          (0, l.is)(e, "dmn:Decision") &&
                          (0, l.is)(e.decisionLogic, "dmn:LiteralExpression")
                        );
                      },
                    },
                    {
                      id: "decisionTable",
                      constructor: o.default,
                      opens: function (e) {
                        return (
                          (0, l.is)(e, "dmn:Decision") &&
                          (0, l.is)(e.decisionLogic, "dmn:DecisionTable")
                        );
                      },
                    },
                  ];
                  return (
                    this.options.tableViewOnly ||
                      e.push({
                        id: "drd",
                        constructor: r.default,
                        opens: function (e) {
                          return (
                            (0, l.is)(e, "dmn:Definitions") &&
                            (0, c.containsDi)(e)
                          );
                        },
                      }),
                    e
                  );
                },
              },
            ]) && d(n.prototype, i),
            a && d(n, a),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t
          );
        })(a.default);
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
          a = n(1792),
          r = n(57752),
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
            template: r,
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
              function (e, t, n, r) {
                function l() {
                  var t = a.copy(s);
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
                  (e.brandName = r.getAppVendor() + " " + r.getAppName()),
                  i("head title").text(e.brandName),
                  (e.trustAsHtml = n.trustAsHtml),
                  (e.isCommunityEdition = !0),
                  (e.logout = t.logout),
                  (e.getTargetRoute = function () {
                    return e.authentication ? "" : "#/login";
                  }),
                  e.$watch("currentApp", l),
                  e.$watch("authentication", l);
              },
            ],
          };
        };
      },
      16386: function (e, t, n) {
        "use strict";
        n(82447), n(67559), n(84392);
        var i = n(1792),
          a = n(38284),
          r = n(33030),
          o = n(17502),
          s = n(46569),
          l = n(74690),
          c = n(98934),
          u = n(1574),
          d = n(97234),
          p = n(81240),
          f = n(95470),
          h = n(38862),
          v = n(65214),
          m = n(71746),
          g = n(18974),
          y = n(1634),
          b = n(18686),
          E = n(85562),
          k = n(68416),
          w = n(66011),
          _ = n(92773),
          I = n(20386),
          S = n(93059),
          x = n(14203),
          A = n(19182),
          T = n(170);
        n(6978);
        var C = i.module("camunda.common.widgets", [
          k.name,
          w.name,
          _.name,
          "ui.bootstrap",
        ]);
        C.factory("widgetLocalConf", S),
          C.directive("camWidgetInlineField", r),
          C.directive("camWidgetSearchPill", o),
          C.directive("camWidgetHeader", l),
          C.directive("camWidgetFooter", c),
          C.directive("camWidgetLoader", u),
          C.directive("camWidgetChartLine", d),
          C.directive("camWidgetDebug", p),
          C.directive("camWidgetClipboard", f),
          C.directive("camWidgetVariable", h),
          C.directive("camWidgetVariablesTable", v),
          C.directive("camRenderVarTemplate", m),
          C.directive("camWidgetSearch", g),
          C.directive("camWidgetBpmnViewer", y),
          C.directive("camWidgetCmmnViewer", b),
          C.directive("camWidgetDmnViewer", E),
          C.directive("camShareLink", x),
          C.directive("camWidgetPassword", A),
          C.directive("camVariableValidator", I),
          C.directive("camAnnotationEdit", a),
          C.directive("camWidgetSelectionType", T),
          C.filter("camQueryComponent", s),
          (e.exports = C);
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
        var a = n(1792),
          r = n(25447),
          o = n(85364),
          s = n(67050),
          l = n(61166);
        e.exports = [
          "$timeout",
          "$filter",
          "$document",
          "$uibModal",
          function (e, t, n, c) {
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
                var d,
                  p,
                  f = r(
                    (function (e) {
                      var t = getComputedStyle(e),
                        n = "absolute" === t.position,
                        i = /(auto|scroll)/;
                      if ("fixed" === t.position) return document.body;
                      for (var a = e; (a = a.parentElement); )
                        if (
                          ((t = getComputedStyle(a)),
                          (!n || "static" !== t.position) &&
                            i.test(t.overflow + t.overflowY + t.overflowX))
                        )
                          return a;
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
                            a,
                            r,
                            o,
                            s,
                            l = v.exec(e);
                          if (l)
                            return (
                              (t = parseInt(l[1] || 0, 10)),
                              (n = parseInt(l[2] || 0, 10) - 1),
                              (i = parseInt(l[3] || 0, 10)),
                              (a = parseInt(l[4] || 0, 10)),
                              (r = parseInt(l[5] || 0, 10)),
                              (o = parseInt(l[6] || 0, 10)),
                              (s = parseInt(l[7] || 0, 10)),
                              new Date(t, n, i, a, r, o, s)
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
                function E() {
                  var e = {
                      left: r(u).offset().left - f.offset().left,
                      top: r(u).offset().top - f.offset().top,
                    },
                    t = p.outerWidth() + e.left;
                  if (
                    (t > f.prop("clientWidth") &&
                      (e.left -= t + 5 - f.prop("clientWidth")),
                    m()
                      ? d
                          .addClass("datepicker-control")
                          .show()
                          .css({
                            left: e.left + (p.outerWidth() - d.outerWidth()),
                            top: e.top + p.outerHeight(),
                          })
                      : d
                          .removeClass("datepicker-control")
                          .show()
                          .css({
                            left: e.left + (r(u).outerWidth() - d.outerWidth()),
                            top: e.top - d.outerHeight(),
                          }),
                    p
                      .show()
                      .css({ left: e.left, top: e.top + r(u).outerHeight() }),
                    m())
                  ) {
                    var n = p[0].querySelector(".uib-daypicker");
                    n && n.focus();
                  }
                }
                function k(t) {
                  e(function () {
                    (o.editing && !t) ||
                      (d && d.remove && d.remove(),
                      (d = null),
                      p && p.remove && p.remove(),
                      (p = null));
                  }, 50);
                }
                function w(e) {
                  if (
                    o.editing &&
                    !(function (e) {
                      return (
                        u[0].contains(e.target) ||
                        (d && d.length && d[0].contains(e.target)) ||
                        (p && p.length && p[0].contains(e.target))
                      );
                    })(e)
                  ) {
                    var t = r(e.target),
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
                    k(!0);
                  }),
                  o.$watch("editing", function (t, n) {
                    t !== n &&
                      (o.editing
                        ? (b(
                            (p = (
                              p && p.length
                                ? p
                                : r(u[0].querySelector(".field-control"))
                            ).hide())
                          ) || f.append(p),
                          b(
                            (d = (
                              d && d.length
                                ? d
                                : r(u[0].querySelector(".btn-group"))
                            ).hide())
                          ) || f.append(d),
                          e(E, 50),
                          u.addClass("inline-editing"))
                        : (k(), u.removeClass("inline-editing")));
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
                                a
                                  .element(
                                    u[0].querySelector(
                                      '[ng-model="formData.editValue"]'
                                    )
                                  )
                                  .val(t.value),
                                e(function () {
                                  for (
                                    var e = r(
                                        u[0].querySelector("li[ng-mouseenter]")
                                      ),
                                      i = n ? t.value : t,
                                      a = 0;
                                    a < e.length;
                                    a++
                                  ) {
                                    var o = e[a];
                                    if (0 === o.innerText.indexOf(i))
                                      return void r(o).trigger("mouseenter");
                                  }
                                });
                            }
                          });
                        }),
                        e(function () {
                          a
                            .element(
                              u[0].querySelector(
                                '[ng-model="formData.editValue"]'
                              )
                            )
                            .triggerHandler("click"),
                            e(function () {
                              r('[ng-model="formData.editValue"]').focus(),
                                r('[ng-model="formData.editValue"]').select(),
                                n.bind("click", w);
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
                        })(r('[ng-model="formData.editValue"]').val())),
                          (o.varValue = o.formData.editValue);
                      else if ("option" === o.varType) {
                        if (-1 === o.options.indexOf(e) && !o.allowNonOptions)
                          return void o.cancelChange();
                        (o.formData.editValue =
                          e || r('[ng-model="formData.editValue"]').val()),
                          (o.varValue = o.formData.editValue);
                      } else
                        m() &&
                          (o.varValue = h(o.formData.dateValue, o.dateFormat));
                      (o.$event = t),
                        o.change(o),
                        (o.editing = !1),
                        n.unbind("click", w);
                    }
                  }),
                  (o.cancelChange = function () {
                    o.editing &&
                      ((o.editing = !1), o.onCancel(o), n.unbind("click", w));
                  }),
                  (o.changeDate = function (e) {
                    var t = e.formData.dateValue;
                    o.hasCustomDateFormat &&
                      (t = h(e.formData.dateValue, o.dateFormat)),
                      (o.formData.editValue = o.formData.dateValue = t);
                  }),
                  (o.selectNextInlineField = function (t) {
                    for (
                      var n = r(
                          "[cam-widget-inline-field][type='text'], [cam-widget-inline-field][type='option']"
                        ),
                        i = t * (n.length - 1);
                      i !== !t * (n.length - 1);
                      i += 2 * !t - 1
                    )
                      if (n[i] === u[0])
                        return void e(function () {
                          var a = r(n[i + 2 * !t - 1]);
                          a.find(".view-value").click(),
                            e(function () {
                              a.find("input").select();
                            });
                        });
                    e(function () {
                      r(n[t * n.length - 1])
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
                          (r(
                            '.cam-widget-inline-field.btn-group > button[ng-click="cancelChange($event)"]'
                          )[0].focus(),
                          e.preventDefault())
                        : (r(
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
                        r('[ng-model="formData.editValue"]').focus().select(),
                          n.bind("click", w);
                      });
                    };
                    c
                      .open({
                        resolve: {
                          formData: function () {
                            return o.formData;
                          },
                        },
                        controller: s,
                        template: l,
                      })
                      .result.then(t)
                      .catch(t),
                      n.unbind("click", w);
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
        function r(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  o(e, t, n[t]);
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
        function o(e, t, n) {
          var a;
          return (
            (a = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(e, t || "default");
                if ("object" != i(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(a) ? a : String(a)) in e
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
              (e.formData = r(
                r({}, n),
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
          a = n(64556);
        e.exports = [
          "$translate",
          function (e) {
            return {
              transclude: !0,
              template: a,
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
          a = n(37628);
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
              link: function (a) {
                var r = e.resource("password-policy"),
                  o = !1;
                (a.loadingState = "DEACTIVATED"),
                  r.get().then(function (e) {
                    if (!e)
                      return (
                        (o = !1),
                        (a.isValid = !0),
                        void (a.loadingState = "DEACTIVATED")
                      );
                    (o = !0),
                      (a.tooltip = "PASSWORD_POLICY_TOOLTIP"),
                      (a.rules = e.rules),
                      s();
                  });
                var s = function () {
                    o &&
                      ((a.isValid = !1),
                      a.password
                        ? ((a.loadingState = "LOADING"), u())
                        : (a.loadingState = "NOT_OK"));
                  },
                  l = null;
                n(function () {
                  a.$watch(
                    "profile",
                    function (e) {
                      e && ((l = e), s());
                    },
                    !0
                  );
                });
                var c = function (e) {
                    return e || "";
                  },
                  u = t(function () {
                    a.password &&
                      r
                        .validate(
                          {
                            password: a.password,
                            profile: {
                              id: c(l.id),
                              firstName: c(l.firstName),
                              lastName: c(l.lastName),
                              email: c(l.email),
                            },
                          },
                          function (e, t) {
                            if (e)
                              return (
                                (a.loadingState = "NOT_OK"),
                                void (a.tooltip =
                                  "PASSWORD_POLICY_TOOLTIP_ERROR")
                              );
                            t.valid
                              ? ((a.loadingState = "OK"), (a.isValid = !0))
                              : ((a.loadingState = "NOT_OK"),
                                (a.isValid = !1),
                                (a.tooltip = "PASSWORD_POLICY_TOOLTIP_PARTIAL"),
                                (a.rules = t.rules));
                          }
                        )
                        .catch(i.noop);
                  }, 1e3);
                a.$watch("[password]", s, !0);
              },
              template: a,
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
          a = n(77376);
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
                (t.valueType = r()),
                  (t.potentialNames = t.potentialNames || []),
                  (t.changeSearch = function (e, n, i) {
                    var a = t[e].value;
                    (t[e].value = n),
                      (t[e].inEdit = !1),
                      "function" == typeof t.onChange &&
                        t.onChange({
                          field: e,
                          before: a,
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
                    e || (t.valueType = r());
                  }),
                  t.$watch("enforceDates", function (e) {
                    e && (t.valueType = r());
                  }),
                  t.$watch("enforceString", function (e) {
                    e && (t.valueType = r());
                  });
                var a = function (t) {
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
                function r() {
                  return t.options
                    ? "option"
                    : t.enforceDates
                    ? "datetime"
                    : "text";
                }
                t.$watch(
                  "value",
                  function (e) {
                    return e && e.inEdit && a("value");
                  },
                  !0
                ),
                  t.$watch(
                    "name",
                    function (e) {
                      return e && e.inEdit && a("name");
                    },
                    !0
                  ),
                  t.$watch(
                    "type",
                    function (e) {
                      return e && e.inEdit && a("type");
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
                        e && e.inEdit && a("operator")
                      );
                    },
                    !0
                  );
              },
              template: a,
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
        function a(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? i(Object(n), !0).forEach(function (t) {
                  r(e, t, n[t]);
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
        function r(e, t, n) {
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
          l = s.copy,
          c = n(25447),
          u = n(91804),
          d = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
        function p(e) {
          return e && "string" == typeof e && e.match(d) ? "date" : o(e);
        }
        var f = function (e) {
            return (
              e.type.value &&
              (!e.extended || e.name.value) &&
              (e.basic || e.operator.value) &&
              (e.basic || e.value.value) &&
              ("date" === p(e.value.value) || !e.enforceDates)
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
          function (e, t, n, i, r) {
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
              link: function (u, d) {
                s.forEach(u.translations, function (e, t) {
                  u.translations[t] = r.instant(e);
                }),
                  u.types.map(function (e) {
                    return (
                      (e.id.value = r.instant(e.id.value)),
                      e.operators &&
                        (e.operators = e.operators.map(function (e) {
                          return (e.value = r.instant(e.value)), e;
                        })),
                      e.options &&
                        "object" === o(e.options[0]) &&
                        ((e.mappedOptions = e.options.map(function (e) {
                          var t = e.key,
                            n = e.value;
                          return { key: t, value: r.instant(n) };
                        })),
                        (e.options = e.mappedOptions.map(function (e) {
                          return e.value;
                        }))),
                      e
                    );
                  }),
                  s.forEach(u.operators, function (e) {
                    s.forEach(e, function (e) {
                      e.value = r.instant(e.value);
                    });
                  }),
                  (u.isMatchAnyActive = void 0 !== u.matchAny),
                  (u.caseHandeling = {}),
                  (u.switchMatchType = function () {
                    u.isMatchAnyActive && (u.matchAny = !u.matchAny);
                  }),
                  (u.focused = !1);
                var m = s.element(d).find("form")[0];
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
                        d[0].insertBefore(t, d[0].firstChild),
                        u.$root.$broadcast("plugin:search:change");
                    } else
                      d[0]
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
                    return d.width() > 400 ? "125px" : "12px";
                  });
                var b = u.types.reduce(function (e, t) {
                    return e || (t.default ? t : null);
                  }, null),
                  E = function () {
                    var e = u.searches
                      .map(function (e) {
                        return e.type.value.key;
                      })
                      .reduce(function (e, t) {
                        return -1 === e.indexOf(t) && e.push(t), e;
                      }, [])
                      .map(function (e) {
                        return k(e) ? k(e).groups : null;
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
                          var n = k(t.key).groups;
                          if (!n) return !0;
                          for (var i = 0; i < n.length; i++)
                            if (e.indexOf(n[i]) > -1) return !0;
                          return !1;
                        });
                  },
                  k = function (e) {
                    return u.types.reduce(function (t, n) {
                      return t || (n.id.key === e ? n : null);
                    }, null);
                  },
                  w = function (e, t) {
                    return (
                      e.operators ||
                      u.operators[
                        p(
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
                  _ = function (e) {
                    var t = function (e, t) {
                      var n = null,
                        i = null,
                        a = "In" === t.operator;
                      if (e) {
                        var r = e.filter(function (e) {
                          return a && t.value.includes(e.key);
                        });
                        if (a) {
                          var o = r.map(function (e) {
                            return e.key;
                          });
                          o.length && (n = o),
                            (i = r
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
                      } else a && (i = t.value.join(","));
                      return i || (i = t.value), { key: n, value: i };
                    };
                    return e
                      .map(function (e) {
                        var n = k(e.type);
                        if (n) {
                          var i = {
                            extended: n.extended,
                            basic: n.basic,
                            type: {
                              values: E(),
                              value: E().reduce(function (t, n) {
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
                            value: a(
                              a({}, t(n.mappedOptions, e)),
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
                            (i.operator.values = w(n, i.value.value)),
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
                  I = u.searchId || "search",
                  S = function () {
                    var e = JSON.parse((t.search() || {})[I + "Query"] || "[]");
                    return _(e);
                  };
                (u.searches = u.searches || []),
                  (u.searches = S()),
                  (u.validSearchesBuffer = u.searches.reduce(function (e, t) {
                    return t.valid && e.push(t), e;
                  }, [])),
                  (u.validSearches = s.copy(u.validSearchesBuffer));
                (u.createSearch = function (t) {
                  if (t || u.inputQuery) {
                    var n = t ? "" : u.inputQuery;
                    t = (t && k(t.key)) || b;
                    var i = w(t, n);
                    u.searches.push({
                      extended: t.extended,
                      basic: t.basic,
                      type: {
                        values: E(),
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
                    var a = u.searches[u.searches.length - 1];
                    (a.valid = f(a)),
                      n
                        ? (u.inputQuery = "")
                        : e(function () {
                            e(function () {
                              (u.inputQuery = ""),
                                c(
                                  d[0].querySelector(
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
                        c(
                          d[0].querySelector(".search-container > input")
                        ).focus();
                      });
                  });
                var x = function (e, t) {
                  return e
                    .toUpperCase()
                    .split(",")
                    .map(function (e) {
                      return e.trim();
                    })
                    .includes(t.toUpperCase());
                };
                (u.handleChange = function (t, n, i, a, r) {
                  var o,
                    s,
                    l = u.searches[t];
                  "type" === n
                    ? ((s = k(a.key)),
                      (l.extended = s.extended),
                      (l.basic = s.basic),
                      (l.allowDates = s.allowDates),
                      !l.enforceDates && s.enforceDates && (l.value.value = ""),
                      (l.enforceDates = s.enforceDates),
                      (l.operator.values = w(s, l.value.value)),
                      h(l.operator))
                    : "value" === n &&
                      (t === u.searches.length - 1 &&
                        e(function () {
                          c(
                            d[0].querySelector(".search-container > input")
                          ).focus();
                        }),
                      (s = k(l.type.value.key)).operators ||
                        ((l.operator.values = w(s, l.value.value)),
                        h(l.operator))),
                    (l.valid = f(l)),
                    r &&
                      13 === r.keyCode &&
                      (function (e, t) {
                        var n = u.searches[e];
                        if (!n.valid) {
                          if (n.extended && !n.name.value && "name" !== t)
                            return void (n.name.inEdit = !0);
                          if ("value" !== t) return void (n.value.inEdit = !0);
                        }
                        for (var i = 1; i < u.searches.length; i++) {
                          var a = (i + e) % u.searches.length;
                          if (!(n = u.searches[a]).valid)
                            return void (n.extended && !n.name.value
                              ? (n.name.inEdit = !0)
                              : (n.value.inEdit = !0));
                        }
                      })(t, n);
                  var p =
                    null ===
                      (o = u.types.find(function (e) {
                        return e.id.key === l.type.value.key;
                      })) || void 0 === o
                      ? void 0
                      : o.mappedOptions;
                  if (p)
                    if ("In" === l.operator.value.key) {
                      var v = p
                        .filter(function (e) {
                          return x(l.value.value, e.value);
                        })
                        .map(function (e) {
                          return e.key;
                        });
                      l.value.key = v.length ? v : void 0;
                    } else {
                      var m;
                      l.value.key =
                        null ===
                          (m = p.find(function (e) {
                            return l.value.value === e.value;
                          })) || void 0 === m
                          ? void 0
                          : m.key;
                    }
                  else
                    "In" === l.operator.value.key
                      ? (l.value.key = l.value.value
                          .split(",")
                          .map(function (e) {
                            return e.trim();
                          }))
                      : (l.value.key = l.value.value);
                }),
                  (u.onKeydown = function (t) {
                    -1 !== [38, 40, 13].indexOf(t.keyCode) &&
                      0 ===
                        c(
                          d[0].querySelectorAll(
                            '.dropdown-menu[id^="typeahead"]'
                          )
                        ).length &&
                      e(function () {
                        s.element(t.target).triggerHandler("input");
                      });
                  });
                var A,
                  T = function (e) {
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
                            var a = n
                              .filter(function (t) {
                                return x(e.value.value, t.value);
                              })
                              .map(function (e) {
                                return e.key;
                              });
                            a.length && (i = a);
                          } else {
                            var r;
                            i =
                              null ===
                                (r = n.find(function (t) {
                                  return e.value.value === t.value;
                                })) || void 0 === r
                                ? void 0
                                : r.key;
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
                  C = {
                    basic: !0,
                    type: { values: E(), value: {}, tooltip: "" },
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
                        var a = s.copy(C);
                        (a.type.value.key = "variableNamesIgnoreCase"),
                          u.validSearchesBuffer.push(a);
                      }
                      if (u.caseHandeling.ignoreValues) {
                        var r = s.copy(C);
                        (r.type.value.key = "variableValuesIgnoreCase"),
                          u.validSearchesBuffer.push(r);
                      }
                    }
                    var o,
                      l = {};
                    ((l[I + "Query"] = JSON.stringify(
                      T(u.validSearchesBuffer)
                    )),
                    u.isMatchAnyActive) &&
                      (u.matchAny && !t.search().hasOwnProperty(I + "OrQuery")
                        ? (o = t.url() + "&" + I + "OrQuery")
                        : u.matchAny ||
                          (o = t.url().replace("&" + I + "OrQuery", "")),
                      t.url(o),
                      t.replace());
                    (u.searchHasVariableQuery = y()),
                      (v = !0),
                      n.updateSilently(l, !t.search()[I + "Query"]),
                      e(function () {
                        v = !1;
                      }),
                      D();
                  };
                u.$watch("[searches, matchAny, caseHandeling]", L, !0),
                  u.$on("$locationChangeSuccess", function () {
                    if (
                      ((u.matchAny = t.search().hasOwnProperty(I + "OrQuery")),
                      !v && t.search().hasOwnProperty(I + "Query"))
                    ) {
                      var e = S(),
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
                      e.cancel(A),
                        (A = e(function () {
                          u.validSearches = s.copy(u.validSearchesBuffer);
                        }));
                    },
                    !0
                  );
                var D = function () {
                  var e = E();
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
                      (u.dropdownTypes = E()),
                      s.forEach(u.searches, function (e) {
                        e.potentialNames = k(e.type.value.key)
                          ? k(e.type.value.key).potentialNames || []
                          : null;
                      });
                  },
                  !0
                ),
                  (u.dropdownTypes = E());
                for (
                  var O = (u.searchCriteriaStorage = {
                      group: null,
                      nameInput: "",
                      available: {},
                    }),
                    N = {},
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
                    R = [],
                    $ = 0;
                  $ < P.length;
                  $++
                )
                  R.indexOf(P[$]) < 0 && P[$] && R.push(P[$]);
                function F() {
                  if (((O.available = {}), O.group))
                    return (
                      (u.isSearchCriteriaStorageGrouped = !1),
                      void (O.available = l(N[O.group]))
                    );
                  (u.isSearchCriteriaStorageGrouped = !0),
                    R.forEach(function (e) {
                      O.available[e] = l(N[e] || {});
                    });
                }
                function V(e, t) {
                  return t
                    ? { group: t, name: e }
                    : O.group
                    ? { group: O.group, name: e }
                    : void 0;
                }
                !R.length && u.storageGroup && R.push(u.storageGroup),
                  R.forEach(function (e) {
                    N[e] = {};
                  }),
                  u.$watch(
                    "validSearches",
                    function () {
                      if (u.storageGroup)
                        return (O.group = u.storageGroup), void F();
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
                        (O.group = e),
                        F();
                    },
                    !0
                  ),
                  (N = i.get("searchCriteria", N)),
                  F(),
                  u.$watch("storageGroup", function () {
                    (u.storageGroup && R.indexOf(u.storageGroup) < 0) ||
                      ((O.group = u.storageGroup), F());
                  }),
                  (u.storedCriteriaInputClick = function (e) {
                    e.stopPropagation();
                  }),
                  (u.searchCriteriaInputKeydown = function (e) {
                    if (13 === e.keyCode) return u.storedCriteriaSaveClick(e);
                  }),
                  (u.hasCriteriaSets = function () {
                    if (R.length > 1) {
                      for (var e in O.available)
                        if (Object.keys(O.available[e]).length > 0) return !0;
                      return !1;
                    }
                    return !!Object.keys(O.available || {}).length;
                  }),
                  (u.loadCriteriaSet = function (e, t, n) {
                    u.caseHandeling = { ignoreNames: !1, ignoreValues: !1 };
                    var i = V(t, n);
                    if (i) {
                      var a = N[i.group][i.name];
                      (u.searches = _(a)),
                        u.isMatchAnyActive &&
                          (u.matchAny = a[a.length - 1].matchAny),
                        L();
                    }
                  }),
                  (u.dropCriteriaSet = function (e, t, n) {
                    e.stopPropagation();
                    var a = V(t, n);
                    a &&
                      (delete N[a.group][a.name],
                      i.set("searchCriteria", N),
                      F());
                  }),
                  (u.storedCriteriaSaveClick = function (e) {
                    e.stopPropagation();
                    var t = O.nameInput;
                    t &&
                      ((N[O.group] = N[O.group] || {}),
                      (N[O.group][t] = T(u.validSearchesBuffer)),
                      u.isMatchAnyActive &&
                        N[O.group][t].push({ matchAny: u.matchAny }),
                      N[O.group][t].push({
                        caseHandeling: s.copy(u.caseHandeling),
                      }),
                      i.set("searchCriteria", N),
                      F(),
                      (O.nameInput = ""));
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
        var a = n(1792),
          r = n(59084),
          o = n(3907),
          s = n(57848),
          l = {};
        function c(e) {
          return (e = e || new Date()).toISOString().slice(0, -5);
        }
        (l.camundaFormattedDate = c),
          (l.templateDialog = o),
          (l.templateStringDialog = s),
          (l.modalCtrl = [
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
              var i = a.copy(t);
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
          (l.typeUtils = r),
          (l.types = [
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
          (l.defaultValues = {
            Boolean: !1,
            Bytes: null,
            File: null,
            Date: c(),
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
          (l.isPrimitive = function (e) {
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
          (l.isBinary = function (e) {
            return function (t) {
              return (
                !(!t && !e.variable) &&
                !!(t = t || e.variable.type) &&
                ["Bytes", "File"].indexOf(t) >= 0
              );
            };
          }),
          (l.useCheckbox = function (e) {
            return function (t) {
              return (
                !(!t && !e.variable) && "Boolean" === (t = t || e.variable.type)
              );
            };
          }),
          (l.validate = function (e) {
            return function () {
              var t;
              (e.variable.name && e.variable.type
                ? null === e.variable.value ||
                  ["String", "Object", "Null"].indexOf(e.variable.type) > -1
                  ? (e.valid = !0)
                  : (e.valid = r.isType(e.variable.value, e.variable.type))
                : (e.valid = !1),
              e.valid) &&
                e.variable.type &&
                null !== e.variable.value &&
                e.isPrimitive(e.variable.type) &&
                ((t =
                  "Boolean" !== e.variable.type
                    ? r.convertToType(e.variable.value, e.variable.type)
                    : !!e.variable.value && "false" !== e.variable.value),
                i(e.variable.value) !== i(t) && (e.variable.value = t));
            };
          }),
          (e.exports = l);
      },
      20386: function (e, t, n) {
        "use strict";
        var i = n(59084);
        e.exports = [
          function () {
            return {
              require: "ngModel",
              link: function (e, t, n, a) {
                var r = function (e) {
                  var t = n.camVariableValidator;
                  return (
                    -1 !== ["String", "Object", "Null"].indexOf(t)
                      ? a.$setValidity("camVariableValidator", !0)
                      : a.$setValidity(
                          "camVariableValidator",
                          !!i.isType(e, t)
                        ),
                    e
                  );
                };
                a.$parsers.unshift(r),
                  a.$formatters.push(r),
                  n.$observe("camVariableValidator", function () {
                    return r(a.$viewValue);
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
          a = n(70449),
          r = n(91740),
          o = a.types,
          s = a.modalCtrl;
        e.exports = [
          "$uibModal",
          function (e) {
            return {
              template: r,
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
                var r = a.defaultValues;
                (t.isPrimitive = a.isPrimitive(t)),
                  (t.useCheckbox = a.useCheckbox(t)),
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
                var l = a.validate(t);
                (t.valid = !0),
                  t.$watch("variable.value", l),
                  t.$watch("variable.name", l),
                  t.$watch("variable.type", l),
                  l();
                var c = t.variable.value;
                t.$watch("variable.type", function (e, i) {
                  "Boolean" === e
                    ? null !== t.variable.value &&
                      ((c = t.variable.value),
                      (t.variable.value =
                        "false" !== t.variable.value && !!t.variable.value))
                    : "Boolean" === i && (t.variable.value = c);
                  var a = n[0].classList;
                  i && a.remove("var-type-" + i.toLowerCase()),
                    e && a.add("var-type-" + e.toLowerCase());
                }),
                  (t.isNull = function () {
                    return null === t.variable.value;
                  }),
                  (t.setNonNull = function () {
                    t.variable.value = c || r[t.variable.type];
                  }),
                  (t.setNull = function () {
                    (c = t.variable.value), (t.variable.value = null);
                  }),
                  (t.editVariableValue = function () {
                    e.open({
                      template: a.templateDialog,
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
                var a = t.info.additions[t.headerName] || {};
                for (var r in ((a.scopeVariables = a.scopeVariables || {}),
                a.scopeVariables))
                  t[r] = a.scopeVariables[r];
                (t.variable = t.info.variable),
                  n.html("<div>" + a.html + "</div>"),
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
        var a = n(1792),
          r = n(70449),
          o = n(93136),
          s = n(64529),
          l = r.typeUtils,
          c = {
            variable: { name: null, type: null, value: null, valueInfo: {} },
            additions: {},
          };
        function u(e) {
          return {
            then: function (t) {
              t(a.copy(e.variable));
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
                  var d = function (e) {
                    var t = a.element(".modal"),
                      n = a.element(".modal-backdrop");
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
                  n.on("click", d),
                    o.$on("$destroy", function () {
                      return n.off("click", d);
                    });
                }
                var p = [];
                function f(e) {
                  return (o.variables[e] || {}).variable;
                }
                (o.headerClasses = []),
                  o.headers.forEach(function (e) {
                    o.headerClasses.push(e.class);
                  }),
                  (o.editable = o.editable || o.headerClasses),
                  (o.variableTypes = a.copy(r.types)),
                  (o.variableTypes = o.ignoreTypes
                    ? o.variableTypes.filter(function (e) {
                        return !o.ignoreTypes.includes(e);
                      })
                    : o.variableTypes),
                  (o.defaultValues = r.defaultValues),
                  (o.isPrimitive = r.isPrimitive(o)),
                  (o.isBinary = r.isBinary(o)),
                  (o.useCheckbox = r.useCheckbox(o)),
                  ["uploadVar", "deleteVar", "saveVar"].forEach(function (e) {
                    o[e] = a.isFunction(o[e]) ? o[e] : u;
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
                    controller: r.modalCtrl,
                    windowClass: "cam-widget-variable-dialog",
                    resolve: {
                      variable: function () {
                        return a.copy(f(e));
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
                      : (e.valid = l.isType(e.variable.value, e.variable.type))
                    : (e.valid = !1),
                  e.valid) &&
                    e.variable.type &&
                    null !== e.variable.value &&
                    o.isPrimitive(e.variable.type) &&
                    ((n =
                      "Boolean" !== e.variable.type
                        ? l.convertToType(e.variable.value, e.variable.type)
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
                          a.isUndefined(t) ||
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
                      (p[t] = e.variable.value);
                  });
                }
                (o.editVar = a.isFunction(o.editVar)
                  ? o.editVar
                  : function (t, n) {
                      var i = e.open(
                        h(n, r.templateDialog, function () {
                          return !o.isEditable("value", o.variables[n]);
                        })
                      ).result;
                      return (
                        i
                          .then(function () {
                            return (t.changed = !0);
                          })
                          .catch(a.noop),
                        i
                      );
                    }),
                  (o.readStringVar = a.isFunction(o.readStringVar)
                    ? o.readStringVar
                    : function (t) {
                        return e.open(
                          h(t, r.templateStringDialog, function () {
                            return !0;
                          })
                        ).result;
                      }),
                  (o.downloadLink = a.isFunction(o.downloadVar)
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
                  (o.canEditVariable = a.isFunction(o.isVariableEditable)
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
                    (p[e] = t.value), (t.value = null);
                  }),
                  (o.setNonNull = function (e) {
                    var t = f(e);
                    t.value = p[e] || o.defaultValues[t.type];
                  }),
                  (o.editVariableValue = function (e) {
                    var t = o.variables[e];
                    o.editVar(t, e)
                      .then(function (t) {
                        (f(e).value = t.value), (f(e).valueInfo = t.valueInfo);
                      })
                      .catch(a.noop);
                  }),
                  (o.addVariable = function () {
                    o.variables.push(a.copy(c));
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
                    }).result.catch(a.noop);
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
        function a(e, t, n, a, r) {
          var o = this;
          (this.searchId = e.searchId || "search"),
            (this.paginationId = e.paginationId || "page"),
            (this.searchWidgetUtils = n),
            (this.search = a),
            (this.lastSearchQueryString = null),
            (this.locationChange = !0),
            e.$on("$destroy", function () {
              (e.config.searches = null), a(o.paginationId, null);
            }),
            r(e, this, [
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
          var l = t.$on(
            "cam-common:cam-searchable:query-force-change",
            this.onForcedRefresh.bind(this)
          );
          e.$on("$destroy", function () {
            l();
          });
        }
        function r(e) {
          return (
            e &&
            e.map(function (e) {
              return (function (e) {
                var t = e.value && e.value.value,
                  n = e.type && e.type.value.value,
                  i = e.operator && e.operator.value.key,
                  a = e.name && e.name.value;
                return { value: t, type: n, operator: i, name: a };
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
          a,
        ]),
          (a.prototype.onForcedRefresh = function () {
            this.resetPage(), this.executeQueries();
          }),
          (a.prototype.onBlockedChange = function (e, t) {
            !e && t && this.query && this.executeQueries();
          }),
          (a.prototype.getSearchQueryString = function () {
            return this.search()[this.searchId + "Query"];
          }),
          (a.prototype.hasSearchQueryStringChanged = function () {
            var e = this.getSearchQueryString();
            return (
              e !== this.lastSearchQueryString &&
              (this.lastSearchQueryString || "[]" !== e)
            );
          }),
          (a.prototype.onPageChange = function (e, t) {
            var n = this.getCurrentPageFromSearch();
            e != t &&
              e !== n &&
              (this.search(this.paginationId, e && 1 != e ? e : null),
              this.hasSearchQueryStringChanged() || this.executeQueries());
          }),
          (a.prototype.onLocationChange = function () {
            var e = this.getCurrentPageFromSearch();
            +this.pages.current != +e &&
              ((this.pages.current = e),
              this.hasSearchQueryStringChanged()
                ? (this.locationChange = !0)
                : this.executeQueries());
          }),
          (a.prototype.getCurrentPageFromSearch = function () {
            return +this.search()[this.paginationId] || 1;
          }),
          (a.prototype.updateQuery = function (e, t) {
            this.areSearchesDifferent(e, t) &&
              ((this.query =
                (this.buildCustomQuery && this.buildCustomQuery(e)) ||
                this.createQuery(e)),
              this.locationChange || this.resetPage(),
              (this.lastSearchQueryString = this.getSearchQueryString()),
              this.executeQueries());
          }),
          (a.prototype.resetPage = function () {
            var e = this.search();
            (this.pages.current = 1),
              (e[this.paginationId] = 1),
              this.search.updateSilently(e, !0);
          }),
          (a.prototype.executeQueries = function () {
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
          (a.prototype.createQuery = function (e) {
            return this.searchWidgetUtils.createSearchQueryForSearchWidget(
              e,
              this.arrayTypes,
              this.variableTypes
            );
          }),
          (a.prototype.areSearchesDifferent = function (e, t) {
            var n = r(e),
              a = r(t);
            return !i.equals(n, a);
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
        function a(e, t, n) {
          (this.providers = this.getProviders(n, e)),
            (this.selected = this.providers[0]),
            (this.search = t),
            this.initializeVars(e),
            e.$on("$locationChangeSuccess", this.onLocationChange.bind(this)),
            this.onLocationChange();
        }
        function r(e, t) {
          return (t.priority || 0) - (e.priority || 0);
        }
        (e.exports = ["$scope", "search", "Views", a]),
          (a.prototype.initializeVars = function (e) {
            (this.vars = e.vars || { read: ["tabsApi"] }),
              e.varsValues && i.extend(e, e.varsValues);
          }),
          (a.prototype.getProviders = function (e, t) {
            return e.getProviders(t.providerParams).sort(r);
          }),
          (a.prototype.onLocationChange = function () {
            var e = this.search();
            this.isTabSelectionChangedInUrl(e)
              ? (this.selected = this.providers.filter(function (t) {
                  return t.id === e.tab;
                })[0])
              : e.tab || (this.selected = this.providers[0]);
          }),
          (a.prototype.isTabSelectionChangedInUrl = function (e) {
            return (
              i.isString(e.tab) &&
              (!this.selected || e.tab !== this.selected.id)
            );
          }),
          (a.prototype.selectTab = function (e) {
            var t = this.search(),
              n = { tab: e.id };
            (this.selected = e), this.search.updateSilently(i.extend(t, n));
          }),
          (a.prototype.isSelected = function (e) {
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
            link: function (e, t, n, i, a) {
              a(function (e) {
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
              var a,
                r = n.hoverClass || "hovered";
              function o() {
                a && a();
              }
              n.$observe("camHoverableTitle", function (e) {
                o(),
                  (a = i.addHoverListener(e, function (e) {
                    e ? t.addClass(r) : t.removeClass(r);
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
                  a = { sortBy: e.sortBy, sortOrder: e.sortOrder },
                  r = e.onSortInitialized || t,
                  o = e.onSortChange || t,
                  s = n.get(i, a);
                r({ sorting: s }),
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
        function a(e, t, n, i, a, r) {
          t(e, this, ["activityId", "bpmnElements", "searchQueryType"]),
            (this.search = n),
            (this.params = a),
            (this.path = i.path()),
            (this.searchWidgetUtils = r);
        }
        (e.exports = [
          "$scope",
          "exposeScopeProperties",
          "search",
          "$location",
          "params",
          "searchWidgetUtils",
          a,
        ]),
          (a.prototype.getLink = function () {
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
          (a.prototype.getActivityName = function () {
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
        function a(e, t, n) {
          t(e, this, ["onLoad"]),
            e.$on("$destroy", function () {
              n("page", null);
            }),
            e.processData
              .newChild(e)
              .observe("filter", this.onFilterChanged.bind(this));
        }
        function r(e) {
          return e && e.activityIds && e.activityIds.length
            ? e.activityIds
            : null;
        }
        (e.exports = ["$scope", "exposeScopeProperties", "search", a]),
          (e.exports.ExternalTasksTabController = a),
          (a.prototype.onFilterChanged = function (e) {
            this.isFilterChanged(e) &&
              ((this.filter = e), this.pages && this.loadTasks());
          }),
          (a.prototype.isFilterChanged = function (e) {
            var t = r(this.filter),
              n = r(e);
            return !this.filter || !i.equals(t, n);
          }),
          (a.prototype.onPaginationChange = function (e) {
            (this.pages = e), this.filter && this.loadTasks();
          }),
          (a.prototype.loadTasks = function () {
            (this.loadingState = "LOADING"),
              this.onLoad({
                pages: i.copy(this.pages),
                activityIds: r(this.filter),
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
          a = n(33203),
          r = n(68141),
          o = n(17685),
          s = n(24174),
          l = n(76411),
          c = n(69577),
          u = n(28252),
          d = i.module("cam-common.external-tasks-common", []);
        d.factory("observeBpmnElements", a),
          d.directive("externalTaskActivityLink", r),
          d.directive("externalTasksTab", o),
          d.directive("externalTaskErrorMessageLink", s),
          d.controller("ExternalTaskActivityLinkController", l),
          d.controller("ExternalTasksTabController", c),
          d.controller("ExternalTaskErrorMessageLinkController", u),
          (e.exports = d);
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
          a = n(52637),
          r = n(52041),
          o = n(63524),
          s = n(56076),
          l = n(95028),
          c = n(92075),
          u = n(69661),
          d = n(93872),
          p = n(57711),
          f = n(96270),
          h = n(43700),
          v = n(21280),
          m = n(34863),
          g = n(78693),
          y = n(66372),
          b = n(28232),
          E = n(32640),
          k = n(26994),
          w = n(33939),
          _ = n(50001),
          I = n(83128),
          S = n(88497),
          x = n(26142),
          A = n(24621),
          T = n(49783),
          C = n(71995),
          L = n(71679),
          D = n(92758),
          O = n(50947),
          N = n(51344),
          P = n(65526),
          R = i.module("cam-common", [P.name]);
        R.factory("isModuleAvailable", a),
          R.factory("exposeScopeProperties", r),
          R.factory("Loaders", o),
          R.factory("integrateActivityInstanceFilter", s),
          R.factory("params", l),
          R.factory("createListQueryFunction", c),
          R.factory("createIsSearchQueryChangedFunction", u),
          R.factory("readFiles", d),
          R.factory("upload", p),
          R.factory("getDeploymentUrl", f),
          R.factory("isFileUploadSupported", h),
          R.factory("get", v),
          R.factory("getPluginApiAttributes", function () {
            return m;
          }),
          R.directive("camToolbar", g),
          R.directive("camPagination", y),
          R.directive("camSearchableArea", b),
          R.directive("camTabs", E),
          R.directive("camHoverArea", k),
          R.directive("camHoverTrigger", w),
          R.directive("camHoverableTitle", _),
          R.directive("camFile", I),
          R.directive("camSortableTableHeader", S),
          R.directive("camSortableTableColumn", x),
          R.controller("HoverAreaController", A),
          R.controller("CamPaginationController", T),
          R.controller("CamTabsController", C),
          R.controller("CamPaginationSearchIntegrationController", L),
          R.value("routeUtil", D),
          R.value("paginationUtils", O),
          R.value("searchWidgetUtils", N),
          (e.exports = R);
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
              return function (a, r, o) {
                return t(a).then(function (t) {
                  var s = (r.current - 1) * r.size,
                    l = t.count,
                    c = i.extend(
                      {},
                      a,
                      { firstResult: s, maxResults: r.size },
                      o
                    );
                  return l > s ? e.all({ count: l, list: n(c) }) : t;
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
                var a = {
                  deployment: n.id,
                  deploymentsQuery: JSON.stringify([
                    { type: "id", operator: "eq", value: n.id },
                  ]),
                };
                i && (a.resourceName = i.name);
                var r = e.search() || {};
                return (
                  r.deploymentsSortBy &&
                    (a.deploymentsSortBy = r.deploymentsSortBy),
                  r.deploymentsSortOrder &&
                    (a.deploymentsSortOrder = r.deploymentsSortOrder),
                  t.redirectTo("#/repository", a, [
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
            for (var i, a = e, r = 0; r < t.length; r++) {
              if (((i = t[r]), !a || !a[i])) return n;
              a = a[i];
            }
            return a;
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
            return function (a, r, o) {
              var s = a.processData,
                l = a.processInstance;
              function c(t) {
                var a = e(),
                  r = n.getActivityIdsFromUrlParams("activityInstanceIdIn", a),
                  o = a.activityIds ? a.activityIds.split(",") : [],
                  s = (function (e, t, n) {
                    return (
                      e &&
                      i.equals(t, e.activityIds) &&
                      !i.equals(n, e.activityInstanceIds)
                    );
                  })(t, o, r);
                return (
                  s && (o = []),
                  {
                    activityIds: o,
                    activityInstanceIds: r,
                    page: parseInt(a.page, 10) || void 0,
                    replace: s || !t,
                  }
                );
              }
              (o = o || {}),
                (a.filter = c()),
                s.provide("filter", c()),
                s.observe(
                  [
                    "filter",
                    "instanceIdToInstanceMap",
                    "activityIdToInstancesMap",
                  ],
                  function (t, r, l) {
                    var c,
                      u = t.activityIds || [],
                      d = t.activityInstanceIds || [],
                      p = parseInt(t.page, 10) || null,
                      f = t.scrollToBpmnElement,
                      h = t !== a.filter,
                      v = t.replace;
                    if (
                      (delete t.replace,
                      i.forEach(d, function (e) {
                        var t = r[e] || {},
                          n = t.activityId || t.targetActivityId;
                        -1 === u.indexOf(n) && n && u.push(n);
                      }),
                      i.forEach(u, function (e) {
                        var t = l[e],
                          n = !1,
                          i = [];
                        if (t) {
                          for (var a, r = 0; (a = t[r]); r++) {
                            if (-1 !== d.indexOf(a.id)) {
                              n = !0;
                              break;
                            }
                            i.push(a.id);
                          }
                          n || (d = d.concat(i));
                        }
                      }),
                      o.shouldRemoveActivityIds)
                    )
                      for (var m = 0; m < u.length; m++)
                        l[u[m]] || (u.splice(m, 1), m--);
                    for (m = 0; m < d.length; m++)
                      r[d[m]] || (d.splice(m, 1), m--);
                    if (u.length > 0) {
                      var g = u[u.length - 1];
                      g !== f && (f = g);
                    }
                    (c = {
                      activityIds: u,
                      activityInstanceIds: d,
                      scrollToBpmnElement: f,
                      page: p,
                    }),
                      i.equals(c, a.filter) ||
                        ((a.filter = c), s.set("filter", a.filter));
                    h &&
                      a.filter &&
                      (function (t, r) {
                        var o = i.isArray(t.activityInstanceIds)
                            ? t.activityInstanceIds
                            : [],
                          s = i.isArray(t.activityIds) ? t.activityIds : [],
                          l = e(),
                          c = JSON.parse(l.searchQuery || "[]");
                        c =
                          l.searchQuery || o.length || s.length
                            ? n.replaceActivitiesInSearchQuery(
                                c,
                                "activityInstanceIdIn",
                                o
                              )
                            : null;
                        e.updateSilently(
                          {
                            searchQuery: c ? JSON.stringify(c) : null,
                            activityIds: s.length ? s.join(",") : null,
                          },
                          r
                        ),
                          (a.filter = t);
                      })(a.filter, v);
                  }
                ),
                a.$on("$locationChangeSuccess", function () {
                  var e = c(a.filter);
                  t.path().indexOf(l.id) > -1 &&
                    (n.shouldUpdateFilter(e, a.filter, [
                      "activityIds",
                      "activityInstanceIds",
                      "page",
                    ]) && s.set("filter", e),
                    r(a.processInstanceTabs));
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
                    t(a()),
                    e.$on(n, function () {
                      var e = a();
                      t(e);
                    })
                  );
                },
              };
              function i() {
                e.$broadcast(n);
              }
              function a() {
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
                  a = n + "=" + encodeURIComponent(i);
                return t.length ? t + "&" + a : a;
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
                  a = new t.FileReader();
                return (
                  (a.onload = function (e) {
                    i.resolve({ file: n, content: e.target.result });
                  }),
                  (a.onerror = function (e) {
                    i.reject(e);
                  }),
                  a.readAsText(n),
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
          function (e, t, n, a, r) {
            return function (e, a, o) {
              var s = t.defer();
              i.isArray(a) || (a = [a]), (o = o || {});
              var l = a.map(function (e, t) {
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
              l = l.concat(
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
              var c = "---------------------------" + Date.now().toString(16),
                u =
                  "--" +
                  c +
                  "\r\n" +
                  l.join("--" + c + "\r\n") +
                  "--" +
                  c +
                  "--\r\n";
              return (
                r
                  .post(e, u, {
                    transformRequest: i.identity,
                    headers: {
                      "Content-Type": "multipart/form-data; boundary=" + c,
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
      65015: function (e, t, n) {
        "use strict";
        n(34820), n(67559), n(85541), n(76474);
        var i = n(30336),
          a = {
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
                r = JSON.parse(n.getItem("camunda-web") || "{}");
              (this.get = function (e, t) {
                return void 0 !== r[e] ? r[e] : t;
              }),
                (this.set = function (e, t) {
                  (r[e] = t), n.setItem("camunda-web", JSON.stringify(r));
                }),
                (this.clearTranslationData = function () {
                  for (var e in r)
                    e.includes("_locales_data_") &&
                      !e.includes(window.bust) &&
                      delete r[e];
                  window.localStorage.setItem("camunda-web", JSON.stringify(r));
                }),
                (this.getDateFormat = function (t) {
                  return (e.dateFormat || a.dateFormat)[t] || a.dateFormat[t];
                }),
                (this.getFallbackLocale = function () {
                  return e.locales && e.locales.fallbackLocale
                    ? e.locales.fallbackLocale
                    : a.locales.fallbackLocale;
                }),
                (this.getAvailableLocales = function () {
                  return e.locales && e.locales.availableLocales
                    ? e.locales.availableLocales
                    : a.locales.availableLocales;
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
                    a.skipCustomListeners,
                    e.skipCustomListeners
                  );
                }),
                (this.getSkipIoMappings = function () {
                  return i.extend({}, a.skipIoMappings, e.skipIoMappings);
                }),
                (this.getCascade = function () {
                  return i.extend({}, a.cascade, e.cascade);
                }),
                (this.getRuntimeActivityInstanceMetrics = function () {
                  var t = "runtimeActivityInstanceMetrics";
                  return i.extend({}, a[t], e[t]).display;
                }),
                (this.getActivityInstancePeriod = function () {
                  var t = "historicActivityInstanceMetrics";
                  return e[t] && e[t].period ? e[t].period : a[t].period;
                }),
                (this.getActivityInstanceAdjustable = function () {
                  var t = "historicActivityInstanceMetrics";
                  return e[t] && void 0 !== e[t].adjustablePeriod
                    ? e[t].adjustablePeriod
                    : a[t].adjustablePeriod;
                }),
                (this.getBatchOperationMode = function () {
                  var t = "batchOperation";
                  return (e[t] && e[t].mode) || a[t].mode;
                }),
                (this.getBatchOperationAutoLoadEnded = function () {
                  var t = "batchOperation";
                  return e[t] && void 0 !== e[t].autoLoadEnded
                    ? e[t].autoLoadEnded
                    : a[t].autoLoadEnded;
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
                  return e[t] || a[t];
                }),
                (this.getDisableWelcomeMessage = function () {
                  var t = "disableWelcomeMessage";
                  return e[t] || a[t];
                }),
                (this.getUserOperationLogAnnotationLength = function () {
                  var t = "userOperationLogAnnotationLength";
                  return e[t] || a[t];
                }),
                (this.getPreviewHtml = function () {
                  var t = "previewHtml";
                  return void 0 !== e[t] ? e[t] : a[t];
                }),
                (this.getAssignProcessInstanceIdToTaskComment = function () {
                  var t = "assignProcessInstanceIdToTaskComment";
                  return void 0 !== e[t] ? e[t] : a[t];
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
          a = n(43909);
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
                return function (r) {
                  if (!r || !a.isString(r.prefix) || !a.isString(r.suffix))
                    throw new Error(
                      "Couldn't load static files, no prefix or suffix specified!"
                    );
                  var o = e.defer(),
                    s = r.prefix + "_locales_data_" + r.key + "_" + window.bust,
                    l = i.get(s);
                  return (
                    l &&
                      ((l = JSON.parse(l)),
                      "function" == typeof r.callback &&
                        r.callback(null, l, r.key),
                      o.resolve(l.labels)),
                    t(
                      a.extend(
                        {
                          url: [r.prefix, r.key, r.suffix].join(""),
                          method: "GET",
                          params: { bust: "7.23.0-alpha4" },
                        },
                        r.$http
                      )
                    )
                      .then(function (e) {
                        i.clearTranslationData(),
                          i.set(s, JSON.stringify(e.data)),
                          l ||
                            ("function" == typeof r.callback &&
                              r.callback(null, e.data, r.key),
                            o.resolve(e.data.labels));
                      })
                      .catch(function (e) {
                        n.addError({
                          status: "Error in localization configuration",
                          message:
                            '"' +
                            r.key +
                            '" is declared as available locale, but no such locale file exists.',
                        }),
                          l ||
                            ("function" == typeof r.callback &&
                              r.callback(e.data, null, r.key),
                            o.reject(r.key));
                      }),
                    o.promise
                  );
                };
              },
            ]),
            e.config([
              "$translateProvider",
              "configurationProvider",
              function (e, r) {
                e.useMissingTranslationHandler("sanitizeMissingTranslationKey");
                var o = r.getAvailableLocales(),
                  s = r.getFallbackLocale();
                e.useLoader("localeLoader", {
                  prefix: t + "/app/" + n + "/locales/",
                  suffix: ".json",
                  callback: function (e, t, n) {
                    if (!e && t && t.dateLocales) {
                      var a = n || s;
                      i.locales().indexOf(a) > -1
                        ? i.updateLocale(a, t.dateLocales)
                        : i.defineLocale(a, t.dateLocales);
                    }
                  },
                }),
                  e.registerAvailableLanguageKeys(o),
                  e.fallbackLanguage(s),
                  e.useSanitizeValueStrategy("escapeParameters"),
                  e.determinePreferredLanguage(function () {
                    var e = window.navigator,
                      t = (
                        (a.isArray(e.languages)
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
        function a() {
          a = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            l = s.iterator || "@@iterator",
            c = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function d(e, t, n) {
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
            d({}, "");
          } catch (e) {
            d = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function p(e, t, n, i) {
            var a = t && t.prototype instanceof b ? t : b,
              r = Object.create(a.prototype),
              s = new O(i || []);
            return o(r, "_invoke", { value: T(e, n, s) }), r;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = p;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function E() {}
          function k() {}
          var w = {};
          d(w, l, function () {
            return this;
          });
          var _ = Object.getPrototypeOf,
            I = _ && _(_(N([])));
          I && I !== n && r.call(I, l) && (w = I);
          var S = (k.prototype = b.prototype = Object.create(w));
          function x(e) {
            ["next", "throw", "return"].forEach(function (t) {
              d(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function A(e, t) {
            function n(a, o, s, l) {
              var c = f(e[a], e, o);
              if ("throw" !== c.type) {
                var u = c.arg,
                  d = u.value;
                return d && "object" == i(d) && r.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        n("next", e, s, l);
                      },
                      function (e) {
                        n("throw", e, s, l);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, l);
                      }
                    );
              }
              l(c.arg);
            }
            var a;
            o(this, "_invoke", {
              value: function (e, i) {
                function r() {
                  return new t(function (t, a) {
                    n(e, i, t, a);
                  });
                }
                return (a = a ? a.then(r, r) : r());
              },
            });
          }
          function T(t, n, i) {
            var a = h;
            return function (r, o) {
              if (a === m) throw new Error("Generator is already running");
              if (a === g) {
                if ("throw" === r) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = r, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var l = C(s, i);
                  if (l) {
                    if (l === y) continue;
                    return l;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (a === h) throw ((a = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                a = m;
                var c = f(t, n, i);
                if ("normal" === c.type) {
                  if (((a = i.done ? g : v), c.arg === y)) continue;
                  return { value: c.arg, done: i.done };
                }
                "throw" === c.type &&
                  ((a = g), (i.method = "throw"), (i.arg = c.arg));
              }
            };
          }
          function C(t, n) {
            var i = n.method,
              a = t.iterator[i];
            if (a === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  C(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var r = f(a, t.iterator, n.arg);
            if ("throw" === r.type)
              return (
                (n.method = "throw"), (n.arg = r.arg), (n.delegate = null), y
              );
            var o = r.arg;
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
          function D(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function O(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function N(t) {
            if (t || "" === t) {
              var n = t[l];
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
            (E.prototype = k),
            o(S, "constructor", { value: k, configurable: !0 }),
            o(k, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(k, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === E || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, k)
                  : ((e.__proto__ = k), d(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(S)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            x(A.prototype),
            d(A.prototype, c, function () {
              return this;
            }),
            (t.AsyncIterator = A),
            (t.async = function (e, n, i, a, r) {
              void 0 === r && (r = Promise);
              var o = new A(p(e, n, i, a), r);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            x(S),
            d(S, u, "Generator"),
            d(S, l, function () {
              return this;
            }),
            d(S, "toString", function () {
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
            (t.values = N),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(D),
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
                function i(i, a) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    a && ((n.method = "next"), (n.arg = e)),
                    !!a
                  );
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var o = this.tryEntries[a],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var l = r.call(o, "catchLoc"),
                      c = r.call(o, "finallyLoc");
                    if (l && c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!c)
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
                    return this.complete(n.completion, n.afterLoc), D(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var a = i.arg;
                      D(n);
                    }
                    return a;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: N(t),
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
        function o(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? r(Object(n), !0).forEach(function (t) {
                  s(e, t, n[t]);
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
        function s(e, t, n) {
          var a;
          return (
            (a = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(e, t || "default");
                if ("object" != i(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(a) ? a : String(a)) in e
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
        function l(e, t, n, i, a, r, o) {
          try {
            var s = e[r](o),
              l = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(l) : Promise.resolve(l).then(i, a);
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
        var c = n(34863),
          u = n(55939),
          d = n(75184);
        e.exports = (function () {
          var e,
            t =
              ((e = a().mark(function e(t, n, i) {
                return a().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), d(t, i);
                      case 2:
                        e.sent.forEach(function (e) {
                          var a = Math.random().toString(36).substring(2);
                          (e.overlay = [
                            "control",
                            "$scope",
                            function (n, a) {
                              var r = n.getViewer;
                              e.render(
                                r(),
                                c(u(e.pluginPoint, a, i), t.csrfCookieName),
                                a
                              ),
                                a.$on("$destroy", function () {
                                  e.unmount && e.unmount();
                                });
                            },
                          ]),
                            n.directive("pluginBridge" + a, [
                              function () {
                                return {
                                  link: function (n, a) {
                                    var r = document.createElement("div");
                                    e.render(
                                      r,
                                      c(
                                        u(e.pluginPoint, n, i),
                                        t.csrfCookieName,
                                        i
                                      ),
                                      n
                                    ),
                                      a[0].appendChild(r),
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
                                        a,
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
                                      a,
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
                return new Promise(function (i, a) {
                  var r = e.apply(t, n);
                  function o(e) {
                    l(r, i, a, o, s, "next", e);
                  }
                  function s(e) {
                    l(r, i, a, o, s, "throw", e);
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
        function r(e, t, n) {
          var a;
          return (
            (a = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(e, t || "default");
                if ("object" != i(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(a) ? a : String(a)) in e
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
              l = window.location.href.replace(s, "$1");
            return (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? a(Object(n), !0).forEach(function (t) {
                      r(e, t, n[t]);
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
            })(
              {
                api: {
                  adminApi: i.getAttribute("admin-api").slice(0, -1),
                  baseApi: i.getAttribute("engine-api").slice(0, -1),
                  cockpitApi: i.getAttribute("cockpit-api").slice(0, -1),
                  tasklistApi: i.getAttribute("tasklist-api").slice(0, -1),
                  engineApi: i.getAttribute("engine-api") + "engine/" + l,
                  engine: l,
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
        function a() {
          a = function () {
            return t;
          };
          var e,
            t = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            l = s.iterator || "@@iterator",
            c = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function d(e, t, n) {
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
            d({}, "");
          } catch (e) {
            d = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function p(e, t, n, i) {
            var a = t && t.prototype instanceof b ? t : b,
              r = Object.create(a.prototype),
              s = new O(i || []);
            return o(r, "_invoke", { value: T(e, n, s) }), r;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = p;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function E() {}
          function k() {}
          var w = {};
          d(w, l, function () {
            return this;
          });
          var _ = Object.getPrototypeOf,
            I = _ && _(_(N([])));
          I && I !== n && r.call(I, l) && (w = I);
          var S = (k.prototype = b.prototype = Object.create(w));
          function x(e) {
            ["next", "throw", "return"].forEach(function (t) {
              d(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function A(e, t) {
            function n(a, o, s, l) {
              var c = f(e[a], e, o);
              if ("throw" !== c.type) {
                var u = c.arg,
                  d = u.value;
                return d && "object" == i(d) && r.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        n("next", e, s, l);
                      },
                      function (e) {
                        n("throw", e, s, l);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, l);
                      }
                    );
              }
              l(c.arg);
            }
            var a;
            o(this, "_invoke", {
              value: function (e, i) {
                function r() {
                  return new t(function (t, a) {
                    n(e, i, t, a);
                  });
                }
                return (a = a ? a.then(r, r) : r());
              },
            });
          }
          function T(t, n, i) {
            var a = h;
            return function (r, o) {
              if (a === m) throw new Error("Generator is already running");
              if (a === g) {
                if ("throw" === r) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = r, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var l = C(s, i);
                  if (l) {
                    if (l === y) continue;
                    return l;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (a === h) throw ((a = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                a = m;
                var c = f(t, n, i);
                if ("normal" === c.type) {
                  if (((a = i.done ? g : v), c.arg === y)) continue;
                  return { value: c.arg, done: i.done };
                }
                "throw" === c.type &&
                  ((a = g), (i.method = "throw"), (i.arg = c.arg));
              }
            };
          }
          function C(t, n) {
            var i = n.method,
              a = t.iterator[i];
            if (a === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  C(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var r = f(a, t.iterator, n.arg);
            if ("throw" === r.type)
              return (
                (n.method = "throw"), (n.arg = r.arg), (n.delegate = null), y
              );
            var o = r.arg;
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
          function D(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function O(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function N(t) {
            if (t || "" === t) {
              var n = t[l];
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
            (E.prototype = k),
            o(S, "constructor", { value: k, configurable: !0 }),
            o(k, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(k, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === E || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, k)
                  : ((e.__proto__ = k), d(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(S)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            x(A.prototype),
            d(A.prototype, c, function () {
              return this;
            }),
            (t.AsyncIterator = A),
            (t.async = function (e, n, i, a, r) {
              void 0 === r && (r = Promise);
              var o = new A(p(e, n, i, a), r);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            x(S),
            d(S, u, "Generator"),
            d(S, l, function () {
              return this;
            }),
            d(S, "toString", function () {
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
            (t.values = N),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(D),
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
                function i(i, a) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    a && ((n.method = "next"), (n.arg = e)),
                    !!a
                  );
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var o = this.tryEntries[a],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var l = r.call(o, "catchLoc"),
                      c = r.call(o, "finallyLoc");
                    if (l && c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!c)
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
                    return this.complete(n.completion, n.afterLoc), D(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var a = i.arg;
                      D(n);
                    }
                    return a;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: N(t),
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
        function r(e) {
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
        function s(e, t, n, i, a, r, o) {
          try {
            var s = e[r](o),
              l = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(l) : Promise.resolve(l).then(i, a);
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
        var l = document.querySelector("base").getAttribute("app-root"),
          c = [
            "admin-plugin-adminPlugins",
            "admin-plugin-adminEE",
            "cockpit-plugin-cockpitPlugins",
            "cockpit-plugin-cockpitEE",
            "tasklist-plugin-tasklistPlugins",
          ];
        e.exports = (function () {
          var e,
            t =
              ((e = a().mark(function e(t, n) {
                var i, o, s, u;
                return a().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (i = t.customScripts || []),
                          (o = window.PLUGIN_PACKAGES.filter(function (e) {
                            return (
                              !c.includes(e.name) &&
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
                          (s = "".concat(l, "/app/").concat(n, "/")),
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
                            r(
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
                                  ? e.push.apply(e, r(n))
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
                return new Promise(function (i, a) {
                  var r = e.apply(t, n);
                  function o(e) {
                    s(r, i, a, o, l, "next", e);
                  }
                  function l(e) {
                    s(r, i, a, o, l, "throw", e);
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
          a = { size: 50, total: 0, current: 1 };
        function r(e) {
          return e().page || 1;
        }
        e.exports = {
          initializePaginationInController: function (e, t, n) {
            var o = (e.pages = i.copy(a));
            return (
              (o.current = r(t)),
              e.$watch("pages.current", function (e, i) {
                var a = r(t);
                e != i &&
                  e !== a &&
                  (t("page", e && 1 != e ? e : null), n(e, i));
              }),
              e.$on("$locationChangeSuccess", function () {
                var e = r(t);
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
            var a = t + "/runtime";
            return i.redirectTo(a, n, !0);
          },
          replaceLastPathFragment: function (e, t, n, a) {
            var r = t.replace(/[^/]*$/, e);
            return i.redirectTo(r, n, a);
          },
          redirectTo: function (e, t, n) {
            var i,
              a = [];
            if (t && n) {
              var r = "[object Array]" === Object.prototype.toString.call(n);
              for (i in t)
                (r && -1 === n.indexOf(i)) ||
                  a.push(i + "=" + encodeURIComponent(t[i]));
            }
            return e + (a.length ? "?" + a.join("&") : "");
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
          a = n(40271),
          r = n(65650);
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
                    var a = e[i];
                    return r(t, i) && (n[i] = a), n;
                  }, {});
                })(e, t)
              )
            : e;
        }
        function l(e, t) {
          return t.map(c.bind(null, e));
        }
        function c(e, t) {
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
                return r(["After", "Before", "Like"], e);
              })(i) &&
                !r(t, n) &&
                (n += i);
              return n;
            })(o, t),
            l = (function (e) {
              if (e.basic) return !0;
              return (function (e, t, n) {
                var i = /(\\%)|(\\_)/g,
                  r = /(%)|(_)/;
                if (
                  !(
                    ("like" !== n.toLowerCase() &&
                      "notlike" !== n.toLowerCase()) ||
                    r.test(t.replace(i, ""))
                  )
                )
                  return "%" + t + "%";
                if (d.test(t))
                  return a(t, a.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
                return e || t;
              })(e.value.key, e.value.value, e.operator.value.key);
            })(o);
          return (
            r(t, s) &&
              (l = (function (e, t) {
                return {
                  name: e.name.value,
                  operator: e.operator.value.key,
                  value: p(t),
                };
              })(o, l)),
            r(e, s)
              ? (n[s] = (function (e, t, n) {
                  return i.isArray(e[t]) ? e[t].concat([n]) : [n];
                })(n, s, l))
              : (n[s] = l),
            n
          );
        }
        e.exports = {
          getSearchQueryForSearchType: function (e, t) {
            return (
              (t = [].concat(t)), o("searchQuery=" + JSON.stringify(l(e, t)))
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
            })(t, e).concat(l(t, n));
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
          createSearchesForActivityIds: l,
          encodeQuery: o,
          updateSearchValuesForTypeInCtrlMode: function (e, t, n) {
            var i = (function (e, t, n) {
                return e.filter(function (e) {
                  return e.type !== n || !r(t, e.value);
                });
              })(e, n, t),
              a = (function (e, t, n) {
                var i = t
                  .filter(function (e) {
                    return e.type === n;
                  })
                  .map(function (e) {
                    return e.value;
                  });
                return e.filter(function (e) {
                  return !r(i, e);
                });
              })(n, e, t);
            return i.concat(l(t, a));
          },
        };
        var d =
          /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/;
        function p(e) {
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
      39965: function (e, t, n) {
        "use strict";
        var i = n(43909),
          a = n(59721),
          r = i.module("cam.tasklist.client", []);
        r.value("HttpClient", a.Client),
          r.value("CamForm", a.Form),
          r.factory("camAPI", [
            "camAPIHttpClient",
            "$window",
            "Uri",
            function (e, t, n) {
              var i = {
                apiUri: "engine-rest/api/engine",
                HttpClient: e,
                engine: n.appUri(":engine"),
              };
              if (t.tasklistConf)
                for (var r in t.tasklistConf) i[r] = t.tasklistConf[r];
              return new a.Client(i);
            },
          ]),
          (e.exports = r);
      },
      76176: function (e, t, n) {
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
          n(1871);
        var a = n(1703);
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
        function o(e, t, n) {
          var a;
          return (
            (a = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(e, t || "default");
                if ("object" != i(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(a) ? a : String(a)) in e
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
            a = n.hasOwnProperty,
            r =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            l = o.iterator || "@@iterator",
            c = o.asyncIterator || "@@asyncIterator",
            u = o.toStringTag || "@@toStringTag";
          function d(e, t, n) {
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
            d({}, "");
          } catch (e) {
            d = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function p(e, t, n, i) {
            var a = t && t.prototype instanceof b ? t : b,
              o = Object.create(a.prototype),
              s = new O(i || []);
            return r(o, "_invoke", { value: T(e, n, s) }), o;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = p;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function E() {}
          function k() {}
          var w = {};
          d(w, l, function () {
            return this;
          });
          var _ = Object.getPrototypeOf,
            I = _ && _(_(N([])));
          I && I !== n && a.call(I, l) && (w = I);
          var S = (k.prototype = b.prototype = Object.create(w));
          function x(e) {
            ["next", "throw", "return"].forEach(function (t) {
              d(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function A(e, t) {
            function n(r, o, s, l) {
              var c = f(e[r], e, o);
              if ("throw" !== c.type) {
                var u = c.arg,
                  d = u.value;
                return d && "object" == i(d) && a.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        n("next", e, s, l);
                      },
                      function (e) {
                        n("throw", e, s, l);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, l);
                      }
                    );
              }
              l(c.arg);
            }
            var o;
            r(this, "_invoke", {
              value: function (e, i) {
                function a() {
                  return new t(function (t, a) {
                    n(e, i, t, a);
                  });
                }
                return (o = o ? o.then(a, a) : a());
              },
            });
          }
          function T(t, n, i) {
            var a = h;
            return function (r, o) {
              if (a === m) throw new Error("Generator is already running");
              if (a === g) {
                if ("throw" === r) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = r, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var l = C(s, i);
                  if (l) {
                    if (l === y) continue;
                    return l;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (a === h) throw ((a = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                a = m;
                var c = f(t, n, i);
                if ("normal" === c.type) {
                  if (((a = i.done ? g : v), c.arg === y)) continue;
                  return { value: c.arg, done: i.done };
                }
                "throw" === c.type &&
                  ((a = g), (i.method = "throw"), (i.arg = c.arg));
              }
            };
          }
          function C(t, n) {
            var i = n.method,
              a = t.iterator[i];
            if (a === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  C(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var r = f(a, t.iterator, n.arg);
            if ("throw" === r.type)
              return (
                (n.method = "throw"), (n.arg = r.arg), (n.delegate = null), y
              );
            var o = r.arg;
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
          function D(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function O(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function N(t) {
            if (t || "" === t) {
              var n = t[l];
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
            (E.prototype = k),
            r(S, "constructor", { value: k, configurable: !0 }),
            r(k, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(k, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === E || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, k)
                  : ((e.__proto__ = k), d(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(S)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            x(A.prototype),
            d(A.prototype, c, function () {
              return this;
            }),
            (t.AsyncIterator = A),
            (t.async = function (e, n, i, a, r) {
              void 0 === r && (r = Promise);
              var o = new A(p(e, n, i, a), r);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            x(S),
            d(S, u, "Generator"),
            d(S, l, function () {
              return this;
            }),
            d(S, "toString", function () {
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
            (t.values = N),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(D),
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
                function i(i, a) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    a && ((n.method = "next"), (n.arg = e)),
                    !!a
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var l = a.call(o, "catchLoc"),
                      c = a.call(o, "finallyLoc");
                    if (l && c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!c)
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
                    return this.complete(n.completion, n.afterLoc), D(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var a = i.arg;
                      D(n);
                    }
                    return a;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: N(t),
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
        function l(e, t, n, i, a, r, o) {
          try {
            var s = e[r](o),
              l = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(l) : Promise.resolve(l).then(i, a);
        }
        (window.$ = window.jQuery = n(25447)),
          (window.define = a.define),
          (window.require = a.require),
          (window.bust = "7.23.0-alpha4"),
          (window.DOMPurify = n(631));
        var c = document.querySelector("base").getAttribute("app-root"),
          u = "".concat(c, "/app/tasklist/");
        a.requirejs.config({
          baseUrl: u,
          urlArgs: "bust=".concat("7.23.0-alpha4"),
        });
        var d,
          p = ((d = s().mark(function e() {
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
                      (window.camTasklistConf = n),
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
              var a = d.apply(e, t);
              function r(e) {
                l(a, n, i, r, o, "next", e);
              }
              function o(e) {
                l(a, n, i, r, o, "throw", e);
              }
              r(void 0);
            });
          })();
        (0, a.define)("camunda-tasklist-bootstrap", function () {
          var e = function (e) {
            a.requirejs.config({ baseUrl: "../../../lib" });
            var t = n(926);
            t.exposePackages(window),
              (0, a.requirejs)(
                ["".concat(c, "/lib/globalize.js")],
                function (n) {
                  n(
                    a.requirejs,
                    [
                      "angular",
                      "camunda-commons-ui",
                      "camunda-bpm-sdk-js",
                      "jquery",
                      "angular-data-depend",
                    ],
                    window
                  );
                  var i = window.PLUGIN_PACKAGES || [],
                    s = window.PLUGIN_DEPENDENCIES || [];
                  (i = i.filter(function (e) {
                    return (
                      "tasklist-plugin-tasklistPlugins" === e.name ||
                      e.name.startsWith("tasklist-plugin-legacy")
                    );
                  })),
                    (s = s.filter(function (e) {
                      return (
                        "tasklist-plugin-tasklistPlugins" ===
                          e.requirePackageName ||
                        e.requirePackageName.startsWith(
                          "tasklist-plugin-legacy"
                        )
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
                    a.requirejs.config({
                      packages: i,
                      baseUrl: "./",
                      paths: { ngDefine: "".concat(c, "/lib/ngDefine") },
                    });
                  var l = ["angular", "ngDefine"].concat(
                    s.map(function (e) {
                      return e.requirePackageName;
                    })
                  );
                  (0, a.requirejs)(l, function (n) {
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
                        l = {};
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
                        i[e] && (l[e] = i[e]);
                      }),
                        a.requirejs.config(
                          (function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var n = null != arguments[t] ? arguments[t] : {};
                              t % 2
                                ? r(Object(n), !0).forEach(function (t) {
                                    o(e, t, n[t]);
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
                          })({ baseUrl: "../" }, l)
                        ),
                        (0, a.requirejs)(i.deps || [], function () {
                          n.module("cam.tasklist.custom", i.ngDeps),
                            c(),
                            t.init(s);
                        });
                    } else
                      n.module("cam.tasklist.custom", []),
                        (0, a.require)([], function () {
                          c(), t.init(s);
                        });
                    function c() {
                      (window.define = void 0), (window.require = void 0);
                    }
                  });
                }
              );
          };
          p.then(function (t) {
            e(t);
          });
        }),
          (0, a.requirejs)(["camunda-tasklist-bootstrap"], function () {});
      },
      926: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.exposePackages = function (e) {
            (e.angular = o),
              (e.jquery = i),
              (e["camunda-commons-ui"] = a),
              (e["camunda-bpm-sdk-js"] = r),
              (e["angular-data-depend"] = s),
              (e["cam-common"] = l),
              (e.lodash = c);
          }),
          (t.init = function (e) {
            var t = [
              a.name,
              "pascalprecht.translate",
              "ngRoute",
              "dataDepend",
              n(98342).name,
              n(22322).name,
              n(40660).name,
              n(4057).name,
              n(77789).name,
              n(66545).name,
              n(39965).name,
              n(74917).name,
            ].concat(
              e.map(function (e) {
                return e.ngModuleName;
              })
            );
            var r = (function () {
                for (
                  var e = i("base"),
                    t = {},
                    n = [
                      "href",
                      "app-root",
                      "admin-api",
                      "tasklist-api",
                      "engine-api",
                    ],
                    a = 0;
                  a < n.length;
                  a++
                )
                  t[n[a]] = e.attr(n[a]);
                return t;
              })(),
              s = o.module("cam.tasklist", t),
              l = [
                "$uibModalProvider",
                "$uibTooltipProvider",
                "$locationProvider",
                "$animateProvider",
                "$qProvider",
                "$provide",
                function (e, t, n, i, a, r) {
                  u(r),
                    (e.options = { animation: !0, backdrop: !0, keyboard: !0 }),
                    t.options({
                      animation: !0,
                      popupDelay: 100,
                      appendToBody: !0,
                    }),
                    n.hashPrefix(""),
                    i.classNameFilter(/angular-animate/),
                    a.errorOnUnhandledRejections(!1);
                },
              ];
            s.config(l),
              s.factory("assignNotification", n(24934)),
              s.provider(
                "configuration",
                n(65015)(window.camTasklistConf, "Tasklist")
              ),
              n(86244)(s, r["app-root"], "tasklist"),
              n(91858)(s, r),
              s.config(n(42491)),
              s.config(n(14093)),
              s.config(n(68078)),
              s.controller("camTasklistAppCtrl", n(94618)),
              s.controller("camTasklistViewCtrl", n(93244)),
              n(96079)(window.camTasklistConf, s, "tasklist").then(d);
          }),
          n(7089),
          n(84735),
          n(67559);
        var i = window.jQuery;
        n(27217);
        var a = n(40932),
          r = n(59721);
        n(14131);
        var o = n(43909),
          s = n(14131),
          l = n(91847),
          c = n(19214),
          u = n(21605);
        function d() {
          i(document).ready(function () {
            o.bootstrap(document.documentElement, [
              "cam.tasklist",
              "cam.embedded.forms",
              "cam.tasklist.custom",
            ]),
              setTimeout(function () {
                var e = i("[autofocus]");
                e.length && e[0].focus();
              }, 300);
          });
        }
      },
      14093: function (e) {
        "use strict";
        e.exports = [
          "camDateFormatProvider",
          "configurationProvider",
          function (e, t) {
            for (
              var n = ["monthName", "day", "abbr", "normal", "long", "short"],
                i = 0;
              i < n.length;
              i++
            )
              e.setDateFormat(t.getDateFormat(n[i]), n[i]);
          },
        ];
      },
      42491: function (e, t, n) {
        "use strict";
        var i = n(90206);
        e.exports = [
          "$routeProvider",
          function (e) {
            e.when("/", {
              template: i,
              controller: "camTasklistViewCtrl",
              authentication: "required",
              reloadOnSearch: !1,
            }).otherwise({ redirectTo: "/" });
          },
        ];
      },
      68078: function (e) {
        "use strict";
        e.exports = [
          "$uibTooltipProvider",
          function (e) {
            e.options({ appendToBody: !0, popupDelay: 500 });
          },
        ];
      },
      91858: function (e, t, n) {
        "use strict";
        n(56806),
          n(54062),
          n(31083),
          (e.exports = function (e, t) {
            e.config([
              "UriProvider",
              function (e) {
                e.replace(":appRoot", t["app-root"]),
                  e.replace(":appName", "tasklist"),
                  e.replace("app://", t.href),
                  e.replace("adminbase://", t["app-root"] + "/app/admin/"),
                  e.replace(
                    "tasklistbase://",
                    t["app-root"] + "/app/tasklist/"
                  ),
                  e.replace("cockpitbase://", t["app-root"] + "/app/cockpit/"),
                  e.replace("admin://", t["admin-api"]),
                  e.replace("plugin://", t["tasklist-api"] + "plugin/"),
                  e.replace("engine://", t["engine-api"]),
                  e.replace(":engine", [
                    "$window",
                    function (e) {
                      var t = e.location.href.match(
                        /\/app\/tasklist\/([\w-]+)(|\/)/
                      );
                      if (t) return t[1];
                      throw new Error("no process engine selected");
                    },
                  ]);
              },
            ]);
          });
      },
      94618: function (e, t, n) {
        "use strict";
        n(67559);
        var i = function () {
          this.refreshProvider = null;
        };
        e.exports = [
          "camAPI",
          "configuration",
          "$window",
          "$interval",
          "$scope",
          function (e, t, n, a, r) {
            function o(t) {
              t && t.name
                ? e.resource("user").profile(t.name, function (e, t) {
                    if (e) throw ((r.userFullName = null), e);
                    r.userFullName = t.firstName + " " + t.lastName;
                  })
                : (r.userFullName = null);
            }
            (r.tasklistApp = new i()),
              (r.appVendor = t.getAppVendor()),
              (r.appName = t.getAppName()),
              (document.querySelector("head > title").textContent =
                r.appVendor + " " + r.appName),
              r.$on("authentication.changed", function (e, t) {
                o(t);
              }),
              o(r.authentication);
            var s = a(function () {
              r.$root.$broadcast("refresh");
            }, 1e4);
            r.$on("$destroy", function () {
              a.cancel(s);
            });
          },
        ];
      },
      93244: function (e, t, n) {
        "use strict";
        n(72274), n(10209), n(85541), n(56806), n(92695);
        var i = n(43909);
        e.exports = [
          "$scope",
          "$q",
          "$location",
          "$interval",
          "search",
          "dataDepend",
          "camAPI",
          function (e, t, n, a, r, o, s) {
            function l(e) {
              return (n.search() || {})[e] || null;
            }
            function c(e) {
              r.updateSilently(e);
            }
            var u,
              d = (e.tasklistData = o.create(e)),
              p = l("task"),
              f = l("detailsTab"),
              h = s.resource("filter"),
              v = s.resource("task");
            d.provide("filters", function () {
              var e = t.defer();
              return (
                h
                  .count({ itemCount: !1, resourceType: "Task" })
                  .then(function (e) {
                    for (
                      var n = 2e3, i = Math.ceil(e / n), a = [], r = 0;
                      r < i;
                      r++
                    )
                      a.push(
                        h.list({
                          firstResult: r * n,
                          maxResults: n,
                          itemCount: !1,
                          resourceType: "Task",
                        })
                      );
                    return t.all(a);
                  })
                  .then(function (t) {
                    e.resolve(t.flat(2));
                  })
                  .catch(function (t) {
                    e.reject(t);
                  }),
                e.promise
              );
            }),
              d.provide("currentFilter", [
                "filters",
                function (e) {
                  for (var t, n, a = l("filter"), r = 0; (n = e[r]); r++) {
                    if (a === n.id) {
                      t = n;
                      break;
                    }
                    (!t || n.properties.priority < t.properties.priority) &&
                      (t = n);
                  }
                  u && t && u.id !== t.id && l("page") && c({ page: "1" });
                  return t && t.id !== a && c({ filter: t.id }), i.copy(t);
                },
              ]),
              d.provide("searchQuery", {
                processVariables: [],
                taskVariables: [],
                caseInstanceVariables: [],
              }),
              d.provide("taskListQuery", [
                "currentFilter",
                "searchQuery",
                function (e, t) {
                  if (!e) return null;
                  var n = i.copy(t),
                    a = 15 * ((l("page") || 1) - 1),
                    r = l("sorting");
                  try {
                    r = JSON.parse(r);
                  } catch (e) {
                    r = [{}];
                  }
                  return (
                    ((r =
                      Array.isArray(r) && r.length ? r : [{}])[0].sortOrder =
                      r[0].sortOrder || "desc"),
                    (r[0].sortBy = r[0].sortBy || "created"),
                    (n.id = e.id),
                    (n.firstResult = a),
                    (n.maxResults = 15),
                    (n.sorting = r),
                    (n.active = !0),
                    n
                  );
                },
              ]);
            var m = t.defer(),
              g = {};
            d.observe("taskListQuery", function (e) {
              0 === m.promise.$$state.status &&
                JSON.stringify(e) !== JSON.stringify(g) &&
                d.changed("taskList");
            }),
              d.provide("taskList", [
                "taskListQuery",
                function (e) {
                  if (
                    0 === m.promise.$$state.status &&
                    JSON.stringify(e) === JSON.stringify(g)
                  )
                    return m.promise;
                  var n = t.defer();
                  return (
                    (m = n),
                    (g = e),
                    e && null !== e.id
                      ? h.getTasks(i.copy(e), function (e, t) {
                          e ? n.resolve(e) : n.resolve(t);
                        })
                      : n.resolve({ count: 0, _embedded: {} }),
                    n.promise
                  );
                },
              ]),
              d.provide("taskId", { taskId: p }),
              d.provide("task", [
                "taskId",
                function (e) {
                  var n = t.defer(),
                    i = e.taskId;
                  return (
                    "string" != typeof i
                      ? n.resolve(null)
                      : v.get(i, function (e, t) {
                          e ? n.reject(e) : n.resolve(t);
                        }),
                    n.promise
                  );
                },
              ]),
              d.observe("currentFilter", function (e) {
                u = e;
              }),
              e.$on("refresh", function () {
                u && u.properties.refresh && d.changed("taskList");
              }),
              e.$on("$routeChanged", function () {
                var e = p,
                  t = f;
                (p = l("task")),
                  (f = l("detailsTab")),
                  (e === p && t !== f) || d.set("taskId", { taskId: p }),
                  (u = null),
                  d.changed("currentFilter");
              });
          },
        ];
      },
      37038: function (e, t, n) {
        "use strict";
        n(84392), n(66893);
        var i = n(25447),
          a = n(88696);
        e.exports = [
          "$scope",
          "$uibModal",
          "$q",
          "camAPI",
          "$timeout",
          function (e, t, n, r, o) {
            var s = (e.filtersData = e.tasklistData.newChild(e)),
              l = r.resource("filter");
            (e.userCanCreateFilter = !1),
              s.provide("filterAuthorizations", function () {
                var e = n.defer();
                return (
                  l.authorizations(function (t, n) {
                    t ? e.reject(t) : e.resolve(n);
                  }),
                  e.promise
                );
              }),
              s.provide("userCanCreateFilter", [
                "filterAuthorizations",
                function (e) {
                  for (
                    var t, n = (e = e || {}).links || [], i = 0;
                    (t = n[i]);
                    i++
                  )
                    if ("create" === t.rel) return !0;
                  return !1;
                },
              ]),
              s.observe("userCanCreateFilter", function (t) {
                e.userCanCreateFilter = t;
              });
            var c = [];
            s.observe("filters", function (e) {
              c.forEach(function (t) {
                t(e);
              }),
                (c = []);
            });
            e.$on("shortcut:focusFilter", function () {
              i(".task-filters .content h4 a")[0].focus();
            }),
              (e.openModal = function (e, n) {
                e.stopPropagation();
                var r = function () {
                  o(function () {
                    s.changed("filters"),
                      n
                        ? c.push(function () {
                            o(function () {
                              var e = i(
                                ".task-filters .content div.item.active .actions a"
                              )[0];
                              e && e.focus();
                            });
                          })
                        : document
                            .querySelector(
                              ".task-filters header button.btn-link"
                            )
                            .focus();
                  }, 20);
                };
                t.open({
                  windowClass: "filter-modal",
                  size: "lg",
                  controller: "camFilterModalCtrl",
                  template: a,
                  resolve: {
                    filter: function () {
                      return n;
                    },
                    filtersData: function () {
                      return s;
                    },
                  },
                }).result.then(r, r);
              });
          },
        ];
      },
      94188: function (e, t, n) {
        "use strict";
        n(84735), n(67559), n(56806), n(31083);
        var i =
            "E.g.: `${ now() }`, `${ dateTime() }` or `${ dateTime().plusWeeks(2) }`",
          a = "E.g.: `${ currentUser() }`",
          r = "List of values seperated by comma. E.g.: `keyC, keyA, keyB`",
          o = /^[\s]*([#$]){/,
          s = /^-?[\d]+$/;
        function l(e, t, n) {
          return function (i) {
            if (n && o.test(i)) return { valid: !0 };
            if (e.test(i)) {
              if ("date" === t)
                if (!!isNaN(new Date(i).getTime()))
                  return { valid: !1, error: "dateValue" };
              return { valid: !0 };
            }
            return { valid: !1, error: t || "format" };
          };
        }
        var c = [
          {
            group: "Process Instance",
            options: [
              { name: "processInstanceId", label: "ID" },
              {
                name: "processInstanceBusinessKey",
                label: "Business Key",
                expressionSupport: !0,
                help: a,
              },
              {
                name: "processInstanceBusinessKeyLike",
                label: "Business Key Like",
                expressionSupport: !0,
                help: a,
              },
            ],
          },
          {
            group: "Process definition",
            options: [
              { name: "processDefinitionId", label: "ID" },
              { name: "processDefinitionKey", label: "Key" },
              { name: "processDefinitionKeyIn", label: "Key In", help: r },
              { name: "processDefinitionName", label: "Name" },
              { name: "processDefinitionNameLike", label: "Name Like" },
            ],
          },
          {
            group: "Case Instance",
            options: [
              { name: "caseInstanceId", label: "ID" },
              { name: "caseInstanceBusinessKey", label: "Business Key" },
              {
                name: "caseInstanceBusinessKeyLike",
                label: "Business Key Like",
              },
            ],
          },
          {
            group: "Case definition",
            options: [
              { name: "caseDefinitionId", label: "ID" },
              { name: "caseDefinitionKey", label: "Key" },
              { name: "caseDefinitionName", label: "Name" },
              { name: "caseDefinitionNameLike", label: "Name Like" },
            ],
          },
          {
            group: "Other",
            options: [
              { name: "active", label: "Active", bool: !0 },
              {
                name: "activityInstanceIdIn",
                label: "Activity Instance ID In",
                help: r,
              },
              { name: "executionId", label: "Execution ID" },
            ],
          },
          {
            group: "User / Group",
            options: [
              {
                name: "assignee",
                label: "Assignee",
                expressionSupport: !0,
                help: a,
              },
              { name: "assigneeIn", label: "Assignee in", help: r },
              {
                name: "assigneeLike",
                label: "Assignee Like",
                expressionSupport: !0,
                help: a,
              },
              { name: "owner", label: "Owner", expressionSupport: !0, help: a },
              {
                name: "candidateGroup",
                label: "Candidate Group",
                expressionSupport: !0,
                includeAssignedTasksSupport: !0,
              },
              {
                name: "candidateGroups",
                label: "Candidate Groups",
                expressionSupport: !0,
                help: "List of values separated by comma or an expression which evaluates to a list. E.g.: `camunda-admin, accounting` or `${ currentUserGroups() }`",
                includeAssignedTasksSupport: !0,
              },
              {
                name: "candidateUser",
                label: "Candidate User",
                expressionSupport: !0,
                help: a,
                includeAssignedTasksSupport: !0,
              },
              {
                name: "involvedUser",
                label: "Involved User",
                expressionSupport: !0,
                help: a,
              },
              { name: "assigned", label: "Assigned", bool: !0 },
              { name: "unassigned", label: "Unassigned", bool: !0 },
              { name: "delegationState", label: "Delegation State" },
            ],
          },
          {
            group: "Task",
            options: [
              { name: "taskDefinitionKey", label: "Definition Key" },
              {
                name: "taskDefinitionKeyIn",
                label: "Definition Key In",
                help: r,
              },
              { name: "taskDefinitionKeyLike", label: "Definition Key Like" },
              { name: "name", label: "Name" },
              { name: "nameLike", label: "Name Like" },
              { name: "description", label: "Description" },
              { name: "descriptionLike", label: "Description Like" },
              { name: "priority", label: "Priority", validate: l(s, "number") },
              {
                name: "maxPriority",
                label: "Priority Max",
                validate: l(s, "number"),
              },
              {
                name: "minPriority",
                label: "Priority Min",
                validate: l(s, "number"),
              },
              { name: "tenantIdIn", label: "Tenant ID In", help: r },
              { name: "withoutTenantId", label: "Without Tenant ID", bool: !0 },
              { name: "withoutDueDate", label: "Without Due Date", bool: !0 },
            ],
          },
          {
            group: "Dates",
            validate: l(
              /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/,
              "date",
              !0
            ),
            options: [
              {
                name: "createdBefore",
                label: "Created Before",
                expressionSupport: !0,
                help: i,
              },
              {
                name: "createdAfter",
                label: "Created After",
                expressionSupport: !0,
                help: i,
              },
              {
                name: "dueBefore",
                label: "Due Before",
                expressionSupport: !0,
                help: i,
              },
              {
                name: "dueAfter",
                label: "Due After",
                expressionSupport: !0,
                help: i,
              },
              {
                name: "followUpAfter",
                label: "Follow Up After",
                expressionSupport: !0,
                help: i,
              },
              {
                name: "followUpBefore",
                label: "Follow Up Before",
                expressionSupport: !0,
                help: i,
              },
              {
                name: "followUpBeforeOrNotExistent",
                label: "Follow Up Before or Not Existent",
                expressionSupport: !0,
                help: i,
              },
            ],
          },
        ];
        e.exports = c.map(function (e) {
          return (
            (e.name = e.group.toLowerCase().replace(/[^a-z0-9-]+/g, "-")), e
          );
        });
      },
      40637: function (e, t, n) {
        "use strict";
        n(82447), n(67559), n(84392), n(56806), n(31083), n(66893);
        var i = n(93113),
          a = n(43909),
          r = n(94188),
          o = a.forEach,
          s = a.copy,
          l = {},
          c = {},
          u = {},
          d = {},
          p = {},
          f = function () {
            return { valid: !0 };
          };
        o(r, function (e) {
          o(e.options, function (t) {
            (l[t.name] = t.includeAssignedTasksSupport),
              l[t.name] && (l[t.name + "Expression"] = !0),
              t.bool && (c[t.name] = !0),
              (u[t.name] = t.expressionSupport),
              (d[t.name] = t.help || e.help),
              (p[t.name] = t.validate || e.validate || f);
          });
        }),
          (e.exports = [
            function () {
              return {
                restrict: "A",
                require: "^camTasklistFilterModalForm",
                scope: { filter: "=", accesses: "=" },
                template: i,
                link: function (e, t, n, i) {
                  e.switchMatchType = function () {
                    "any" === e.filter.matchType
                      ? (e.filter.matchType = "all")
                      : (e.filter.matchType = "any");
                  };
                  var a = { key: "", value: "" };
                  (e.criteria = r),
                    (e.criteriaExpressionSupport = u),
                    (e.criteriaHelp = d),
                    (e.booleanCriterion = c),
                    (e.query = e.filter.query = e.filter.query || []),
                    (e.query = e.filter.query =
                      e.query.filter(function (t) {
                        return (
                          "includeAssignedTasks" === t.key &&
                            (e.includeAssignedTasks =
                              e.filter.includeAssignedTasks =
                                t.value),
                          (!c[t.key] || !1 !== t.value) &&
                            "includeAssignedTasks" !== t.key
                        );
                      })),
                    (e.isQueryParameter = function (e) {
                      return "sorting" !== e.key;
                    }),
                    (e.canIncludeAssignedTasks = function () {
                      for (var t = 0; t < e.query.length; t++)
                        if (l[e.query[t].key]) return !0;
                      return !1;
                    }),
                    e.$watch(
                      "query",
                      function () {
                        e.includeAssignedTasks = e.filter.includeAssignedTasks =
                          e.canIncludeAssignedTasks() &&
                          e.filter.includeAssignedTasks;
                      },
                      !0
                    );
                  i.registerHintProvider("filterCriteriaForm", function () {
                    for (var e, t = 0; (e = o[t]); t++) {
                      var n = e.queryParamKey,
                        i = e.queryParamValue;
                      if (n.$dirty && n.$invalid) return !0;
                      if (i.$dirty && i.$invalid) return !0;
                    }
                    return !1;
                  });
                  var o = [];
                  (e.addForm = function (e) {
                    o.push(e);
                  }),
                    (e.clearKey = function (e) {
                      e.key = f(e.key);
                    }),
                    (e.addCriterion = function () {
                      var t = s(a);
                      e.query.push(t);
                    }),
                    (e.removeCriterion = function (t) {
                      (e.filter.query = e.query =
                        i.removeArrayItem(e.query, t)),
                        (o = i.removeArrayItem(o, t));
                    }),
                    (e.valueChanged = function (e, t) {
                      if (
                        (t.$setValidity("number", !0),
                        t.$setValidity("date", !0),
                        t.$setValidity("dateValue", !0),
                        c[e.key])
                      )
                        e.value = !0;
                      else if (e.value) {
                        t.$pristine && t.$setViewValue(e.value);
                        var n = f(e.key),
                          i = p[n](e.value);
                        i.valid || t.$setValidity(i.error, !1);
                      }
                    }),
                    (e.getQueryParamKeys = function () {
                      for (var t, n = [], i = 0; (t = e.query[i]); i++) {
                        var a = f(t.key);
                        n.push(a), u[a] && n.push(a + "Expression");
                      }
                      return n;
                    });
                  var f = (e.getCriterionName = function (e) {
                      return e ? e.replace("Expression", "") : e;
                    }),
                    h = (e.getCriteriaHelp = function (e) {
                      return (e = f(e)), d[e];
                    });
                  e.isCriteriaHelpAvailable = function (e) {
                    return !!h(e);
                  };
                },
              };
            },
          ]);
      },
      45758: function (e, t, n) {
        "use strict";
        var i = n(74800);
        e.exports = [
          function () {
            return {
              restrict: "A",
              require: "^camTasklistFilterModalForm",
              scope: { filter: "=", accesses: "=" },
              template: i,
              link: function (e, t, n, i) {
                var a = e.filterGeneralForm,
                  r = [];
                r.push(a.filterColor),
                  r.push(a.filterName),
                  r.push(a.filterPriority),
                  r.push(a.filterDescription),
                  r.push(a.filterRefresh);
                i.registerHintProvider("filterGeneralForm", function () {
                  for (var e, t = 0; (e = r[t]); t++)
                    if (e.$dirty && e.$invalid) return !0;
                  return !1;
                });
              },
            };
          },
        ];
      },
      64759: function (e, t, n) {
        "use strict";
        n(7089);
        var i = n(27904),
          a = n(43909),
          r = a.copy;
        e.exports = [
          "camAPI",
          "$q",
          "$timeout",
          function (e, t, n) {
            return {
              restrict: "A",
              require: "^camTasklistFilterModalForm",
              scope: {
                filter: "=",
                accesses: "=",
                filterModalFormData: "=",
                isOpen: "=",
              },
              template: i,
              link: function (i, o, s, l) {
                (i.showNewPermissionFields = !1),
                  i.$watch("isOpen", function (e, t) {
                    i.disableAddButton() || e || !t || i.addReadPermission(),
                      (i.showNewPermissionFields = !1);
                  }),
                  i.$on("pre-submit", function () {
                    i.disableAddButton() || i.addReadPermission(),
                      (i.showNewPermissionFields = !1);
                  });
                var c = e.resource("authorization"),
                  u = i.filterModalFormData.newChild(i);
                i.onPaginationChange = function (e) {
                  (i.authorizations = []),
                    (i.pages.current = e.current),
                    u.changed("authorizations");
                };
                var d = (i.pages = a.copy({ size: 50, total: 0, current: 1 })),
                  p = i.filterPermissionForm,
                  f = null,
                  h = null,
                  v = null,
                  m = null,
                  g = { resourceType: 5, permissions: ["READ"] },
                  y = (i.newPermission = r({ type: "user", id: null }));
                l.registerHintProvider("filterPermissionForm", function () {
                  var e = w();
                  return e && e.$error && e.$error.duplicate;
                }),
                  u.provide("authorizations", [
                    "filter",
                    function (e) {
                      var n = t.defer();
                      return (
                        e && e.id
                          ? (c.count(
                              { resourceType: 5, resourceId: e.id },
                              function (e, t) {
                                e ? n.reject(e) : (d.total = t);
                              }
                            ),
                            c.list(
                              {
                                resourceType: 5,
                                resourceId: e.id,
                                maxResults: d.size,
                                firstResult: d.size * (d.current - 1),
                              },
                              function (e, t) {
                                e ? n.reject(e) : n.resolve(t);
                              }
                            ))
                          : n.resolve([]),
                        n.promise
                      );
                    },
                  ]),
                  (i.authorizationState = u.observe(
                    "authorizations",
                    function (e) {
                      (function (e) {
                        for (var t, n = 0; (t = e[n]); n++)
                          t.$permissions = r(t.permissions || []);
                      })((f = i.authorizations = r(e) || [])),
                        (h = (function (e) {
                          for (var t, n = 0; (t = e[n]); n++)
                            if (_(t)) return t;
                        })(f)),
                        (i.isGlobalReadAuthorization = A(h)),
                        (v = T(f, "groupId")),
                        (m = T(f, "userId"));
                    }
                  )),
                  (i.globalReadAuthorizationChanged = function () {
                    i.isGlobalReadAuthorization
                      ? (h
                          ? C(h)
                          : ((h = a.extend({ userId: "*", type: 0 }, g)),
                            f.push(h)),
                        (y.id = null),
                        b())
                      : h && L(h);
                  }),
                  (i.switchType = function () {
                    (y.type = "user" === y.type ? "group" : "user"), b();
                  }),
                  (i.getReadAuthorizations = function (e) {
                    if (e)
                      return (function (e) {
                        for (var t, n = [], i = 0; (t = e[i]); i++)
                          I(t) && !S(t) && A(t) && n.push(t);
                        return n;
                      })(e);
                  });
                var b = (i.validateNewPermission = function () {
                  var e = w();
                  if (e) {
                    e.$setValidity("authorization", !0),
                      e.$setValidity("duplicate", !0);
                    var t = y.id;
                    if (t) {
                      var n = ("user" === y.type ? m : v)[t];
                      if (n && A(n)) return e.$setValidity("duplicate", !1);
                    }
                  }
                });
                i.disableAddButton = function () {
                  if (!i.showNewPermissionFields) return !1;
                  var e = w();
                  return (
                    i.isGlobalReadAuthorization ||
                    !y.id ||
                    (e && e.$error && e.$error.duplicate)
                  );
                };
                var E = (i.addReadPermission = function () {
                  if (!i.showNewPermissionFields)
                    return (
                      (i.showNewPermissionFields = !0),
                      void n(function () {
                        var e = o[0].querySelector(".new-permission button");
                        e && e.focus();
                      })
                    );
                  var e = w(),
                    t = y.id,
                    r = "user" === y.type ? m : v,
                    s = r[t];
                  if (s) {
                    C(s);
                    var l = f;
                    f = i.authorizations = [];
                    for (var c, u = 0; (c = l[u]); u++) c !== s && f.push(c);
                    f.push(s);
                  } else {
                    ((s = { type: 1 })[
                      "user" === y.type ? "userId" : "groupId"
                    ] = t),
                      a.extend(s, g),
                      f.push(s),
                      (r[t] = s);
                  }
                  (y.id = null),
                    e.$setValidity("authorization", !0),
                    e.$setPristine(),
                    n(function () {
                      var e = o[0].querySelector(".new-permission button");
                      e && e.focus();
                    });
                });
                (i.keyPressed = function (e) {
                  if (13 === e.keyCode) {
                    e.preventDefault && e.preventDefault();
                    var t = w();
                    return (
                      y.id && t && (!t.$error || !t.$error.duplicate) && E()
                    );
                  }
                }),
                  (i.removeReadPermission = function (e) {
                    L(e),
                      b(),
                      o[0].querySelector(".global-access input").focus();
                  });
                var k = [];
                function w() {
                  return p.newPermission;
                }
                function _(e) {
                  return e && 0 === e.type;
                }
                function I(e) {
                  return e && 1 === e.type;
                }
                function S(e) {
                  return "*" === ((e = e || {}).userId || e.groupId);
                }
                function x(e, t) {
                  return !!e[t];
                }
                function A(e) {
                  if (e && e.permissions)
                    for (var t, n = e.permissions, i = 0; (t = n[i]); i++)
                      if ("READ" === t || "ALL" === t) return !0;
                  return !1;
                }
                function T(e, t) {
                  for (
                    var n,
                      i = (function (e, t) {
                        for (var n, i = [], a = 0; (n = e[a]); a++)
                          I(n) && x(n, t) && !S(n) && i.push(n);
                        return i;
                      })(e, t),
                      a = {},
                      r = 0;
                    (n = i[r]);
                    r++
                  ) {
                    a[n[t]] = n;
                  }
                  return a;
                }
                function C(e) {
                  if (e) {
                    var t = e.permissions;
                    t && t.length
                      ? t && 1 === t.length
                        ? (e.permissions = e.permissions.concat(["READ"]))
                        : (e.permissions = ["ALL"])
                      : (e.permissions = ["READ"]);
                  }
                }
                function L(e) {
                  if (e) {
                    var t = e.permissions;
                    if (t && 1 === t.length) {
                      var n = t[0];
                      "ALL" === n
                        ? (e.permissions = ["UPDATE", "DELETE"])
                        : "READ" === n && (e.permissions = []);
                    } else {
                      e.permissions = [];
                      for (var i, a = 0; (i = t[a]); a++)
                        "READ" !== i && e.permissions.push(i);
                    }
                  }
                }
                l.registerPostFilterSavedProvider(function (e, n) {
                  var o = [];
                  if (((k = []), i.isGlobalReadAuthorization))
                    for (var s, l = 0; (s = f[l]); l++) I(s) && A(s) && L(s);
                  for (var u, d = 0; (u = f[d]); d++) {
                    var p = u.permissions,
                      h = u.$permissions;
                    (I(u) || _(u)) &&
                      (u.id
                        ? !p.length && h.length
                          ? o.push({ type: "delete", authorization: u })
                          : p.length !== h.length &&
                            o.push({ type: "update", authorization: u })
                        : p.length &&
                          o.push({ type: "create", authorization: u }));
                  }
                  (function (e, n) {
                    var i = t.defer();
                    e = e || [];
                    var a = e.length;
                    function o(e, t) {
                      var o = t.$permissions;
                      delete t.$permissions,
                        delete t.$$hashKey,
                        (t.resourceId = t.resourceId || n.id);
                      var s = function (n, s) {
                        (a -= 1),
                          n
                            ? (k.push({
                                status: "FILTER_FORM_PERMISSIONS_SAVE_ERROR",
                                error: n,
                              }),
                              (t.$permissions = o))
                            : "create" === e
                            ? ((t.id = s.id),
                              (t.permissions = r(s.permissions || [])),
                              (t.$permissions = r(s.permissions || [])))
                            : ("delete" === e && (t.id = null),
                              (t.permissions = r(t.permissions || [])),
                              (t.$permissions = r(t.permissions || []))),
                          0 === a && i.resolve();
                      };
                      "create" === e
                        ? c.create(t, s)
                        : "update" === e
                        ? c.update(t, s)
                        : "delete" === e && c.delete(t.id, s);
                    }
                    0 === a && i.resolve();
                    for (var s, l = 0; (s = e[l]); l++) {
                      o(s.type, s.authorization);
                    }
                    return i.promise;
                  })(o, e)
                    .then(function () {
                      if (
                        ((k && k.length) || (k = null), "function" == typeof n)
                      )
                        return n(k);
                    })
                    .catch(a.noop);
                });
              },
            };
          },
        ];
      },
      23448: function (e, t, n) {
        "use strict";
        n(82447), n(84392);
        var i = n(39156),
          a = n(43909).copy;
        e.exports = [
          function () {
            return {
              restrict: "A",
              require: "^camTasklistFilterModalForm",
              scope: { filter: "=", accesses: "=" },
              template: i,
              link: function (e, t, n, i) {
                var r = { name: "", label: "" };
                (e.filter.properties.showUndefinedVariable =
                  e.filter.properties.showUndefinedVariable || !1),
                  (e.variables = e.filter.properties.variables =
                    e.filter.properties.variables || []);
                i.registerHintProvider("filterVariableForm", function () {
                  for (var e, t = 0; (e = o[t]); t++) {
                    var n = e.variableName,
                      i = e.variableLabel;
                    if (n.$dirty && n.$invalid) return !0;
                    if (i.$dirty && i.$invalid) return !0;
                  }
                  return !1;
                });
                var o = [];
                (e.addForm = function (e) {
                  o.push(e);
                }),
                  (e.addVariable = function () {
                    var t = a(r);
                    e.variables.push(t);
                  }),
                  (e.removeVariable = function (t) {
                    (e.filter.properties.variables = e.variables =
                      i.removeArrayItem(e.variables, t)),
                      (o = i.removeArrayItem(o, t));
                  });
              },
            };
          },
        ];
      },
      43823: function (e, t, n) {
        "use strict";
        n(7089);
        var i = n(82993),
          a = n(43909).isArray,
          r = function () {};
        e.exports = [
          function () {
            return {
              restrict: "A",
              scope: {
                filter: "=",
                filterModalData: "=",
                registerIsValidProvider: "&",
                registerPostFilterSavedProvider: "&",
              },
              template: i,
              controller: [
                "$scope",
                function (e) {
                  var t = (e.filterModalFormData =
                    e.filterModalData.newChild(e));
                  (e.registerIsValidProvider =
                    e.registerIsValidProvider() || r),
                    (e.registerPostFilterSavedProvider =
                      e.registerPostFilterSavedProvider() || r);
                  (e.group = {
                    general: !0,
                    permission: !1,
                    criteria: !1,
                    variable: !1,
                  }),
                    t.observe("accesses", function (t) {
                      e.accesses = t;
                    });
                  e.registerIsValidProvider(function () {
                    return e.filterForm.$valid;
                  });
                  var n = {};
                  (this.registerHintProvider = function (e, t) {
                    (t = t || r), (n[e] = t);
                  }),
                    (e.showHint = function (e) {
                      var t = n[e];
                      return t && t();
                    });
                  var i = [];
                  this.registerPostFilterSavedProvider = function (e) {
                    i.push(
                      e ||
                        function (e, t) {
                          return t();
                        }
                    );
                  };
                  e.registerPostFilterSavedProvider(function (e, t) {
                    var n = i.length;
                    if (0 === n) return t();
                    for (
                      var r,
                        o = [],
                        s = function (e) {
                          if (
                            ((n -= 1),
                            e &&
                              (a(e)
                                ? e.length && (o = o.concat(e))
                                : o.push(e)),
                            0 === n)
                          ) {
                            if (1 === o.length) return t(o[0]);
                            if (o.length) return t(o);
                            t();
                          }
                        },
                        l = 0;
                      (r = i[l]);
                      l++
                    )
                      r(e, s);
                  }),
                    (this.removeArrayItem = function (e, t) {
                      var n = [];
                      for (var i in e) i != t && n.push(e[i]);
                      return n;
                    });
                },
              ],
            };
          },
        ];
      },
      57131: function (e, t, n) {
        "use strict";
        n(72595), n(30225);
        var i = n(18481),
          a = function () {};
        e.exports = [
          function () {
            return {
              restrict: "A",
              scope: {
                filtersData: "=",
                openModal: "&",
                userCanCreateFilter: "=",
              },
              template: i,
              controller: [
                "$scope",
                "search",
                "camAPI",
                "Uri",
                "Notifications",
                "$translate",
                function (e, t, n, i, r, o) {
                  var s = (e.filtersData = e.filtersData.newChild(e)),
                    l = (e.page = {
                      total: 0,
                      current: t().filterPage || 1,
                      size: 50,
                    });
                  function c() {
                    (e.filters = e.allFilters.slice(
                      (l.current - 1) * l.size,
                      l.current * l.size
                    )),
                      t.updateSilently({
                        filterPage: 1 === l.current ? null : l.current,
                      });
                  }
                  e.openModal = e.openModal() || a;
                  var u = n.resource("filter");
                  e.$on("$locationChangeSuccess", function () {
                    var e = t();
                    e &&
                      e.filterPage &&
                      e.filterPage !== l.current &&
                      ((l.current = e.filterPage), c());
                  }),
                    s.observe("taskList", function (t) {
                      e.filterCount = t.count;
                    }),
                    (e.state = s.observe("filters", function (t) {
                      l.total = e.totalItems = t.length;
                      for (var n, i = 0; (n = t[i]); i++)
                        n.style = { "z-index": t.length + 10 - i };
                      (e.allFilters = t.sort(function (e, t) {
                        return (
                          (e.properties.priority || 0) -
                          (t.properties.priority || 0)
                        );
                      })),
                        c();
                    })),
                    (e.onPaginationchange = function () {
                      c();
                    }),
                    s.observe("currentFilter", function (t) {
                      e.currentFilter = t;
                    }),
                    (e.focus = function (n) {
                      (e.filterCount = void 0),
                        t.updateSilently({ filter: n.id }),
                        s.changed("currentFilter");
                    }),
                    (e.isFocused = function (t) {
                      return t.id === e.currentFilter.id;
                    }),
                    (e.addAllFilter = function () {
                      return o("ALL_TASKS")
                        .then(function (e) {
                          var t = {
                            name: e,
                            resourceType: "Task",
                            query: {},
                            properties: {
                              description: "Unfiltered Tasks",
                              priority: 1,
                              color: "#555555",
                              refresh: !1,
                              howUndefinedVariable: !1,
                            },
                          };
                          return u.create(t);
                        })
                        .then(function () {
                          e.filtersData.changed("filters");
                        })
                        .catch(function (e) {
                          return o("FILTER_SAVE_ERROR")
                            .then(function (t) {
                              r.addError({
                                status: t,
                                message: e.message || "",
                              });
                            })
                            .catch(function () {});
                        });
                    });
                },
              ],
            };
          },
        ];
      },
      66545: function (e, t, n) {
        "use strict";
        var i = n(43909),
          a = n(57131),
          r = n(43823),
          o = n(45758),
          s = n(40637),
          l = n(23448),
          c = n(64759),
          u = n(37038),
          d = n(7024),
          p = i.module("cam.tasklist.filter", ["ui.bootstrap"]);
        p.directive("camTasklistFilters", a),
          p.directive("camTasklistFilterModalForm", r),
          p.directive("camTasklistFilterModalFormGeneral", o),
          p.directive("camTasklistFilterModalFormCriteria", s),
          p.directive("camTasklistFilterModalFormVariable", l),
          p.directive("camTasklistFilterModalFormPermission", c),
          p.controller("camFiltersCtrl", u),
          p.controller("camFilterModalCtrl", d),
          (e.exports = p);
      },
      7024: function (e, t, n) {
        "use strict";
        n(36180),
          n(51980),
          n(7089),
          n(82447),
          n(72595),
          n(67559),
          n(85541),
          n(84392),
          n(56806),
          n(42919),
          n(66893);
        var i = n(43909),
          a = i.copy,
          r = i.forEach,
          o = i.isArray,
          s = i.isObject,
          l = "#555555",
          c = /Like$/;
        function u(e, t) {
          c.test(e) &&
            ("%" !== t[0] && (t = "%" + t),
            "%" !== t[t.length - 1] && (t += "%"));
          return t;
        }
        function d(e, t) {
          return (
            c.test(e) &&
              ("%" === t[0] && (t = t.slice(1, t.length)),
              "%" === t.slice(-1) && (t = t.slice(0, -1))),
            t
          );
        }
        var p = [
            "createdBefore",
            "createdAfter",
            "dueBefore",
            "dueAfter",
            "followUpBefore",
            "followUpAfter",
          ],
          f =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})([+-][0-9]{4}|Z)$/,
          h =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/,
          v = /Variables$/;
        function m(e) {
          return v.test(e);
        }
        var g = /^[\s]*([#$]){/;
        function y(e) {
          return g.test(e);
        }
        function b(e) {
          return (
            r(Object.keys(e), function (t) {
              "$" === t[0] || (o(e[t]) && !e[t].length)
                ? delete e[t]
                : (s(e[t]) || o(e[t])) && (e[t] = b(e[t]));
            }),
            e
          );
        }
        e.exports = [
          "$scope",
          "$translate",
          "$q",
          "Notifications",
          "camAPI",
          "filter",
          "filtersData",
          "fixDate",
          "unfixDate",
          function (e, t, n, s, c, v, g, E, k) {
            var w = c.resource("filter"),
              _ = (e.filterModalData = g.newChild(e));
            e.$on("$locationChangeStart", function () {
              e.$dismiss();
            }),
              (e.deletion = !1),
              (e.filter = a(v || {})),
              (e.filter.name = e.filter.name),
              (e.filter.matchType = e.filter.matchType),
              (e.filter.properties = e.filter.properties || {}),
              (e.filter.properties.description =
                e.filter.properties.description),
              (e.filter.properties.priority = parseInt(
                e.filter.properties.priority || 0,
                10
              )),
              (e.filter.properties.color = e.filter.properties.color || l),
              (e.filter.properties.refresh = e.filter.properties.refresh || !1),
              (e.filter.properties.showUndefinedVariable =
                e.filter.properties.showUndefinedVariable || !1);
            var I = e.filter.id;
            e.filter.properties.variables = e.filter.properties.variables || [];
            var S = (e.filter.query = e.filter.query || {});
            S.orQueries && S.orQueries.length > 0
              ? ((S = S.orQueries[0]), (e.filter.matchType = "any"))
              : (delete S.orQueries, (e.filter.matchType = "all"));
            var x = [],
              A = [];
            for (var T in S) {
              var C = S[T];
              m(T)
                ? A.push({ key: T, value: C })
                : ((C = d(T, C)),
                  -1 !== p.indexOf(T) && f.test(C) && (C = k(C)),
                  x.push({ key: T, value: C }));
            }
            (e.filter.query = x),
              _.provide("filter", e.filter),
              _.provide("userFilterAccess", [
                "filter",
                function (e) {
                  var t = n.defer();
                  return (
                    e && e.id
                      ? w.authorizations(e.id, function (e, n) {
                          e ? t.reject(e) : t.resolve(n);
                        })
                      : t.resolve({ links: [] }),
                    t.promise
                  );
                },
              ]),
              _.provide("accesses", [
                "userFilterAccess",
                function (e) {
                  var t = {};
                  return (
                    r(e.links, function (e) {
                      t[e.rel] = !0;
                    }),
                    t
                  );
                },
              ]),
              _.observe("accesses", function (t) {
                e.accesses = t;
              });
            var L = function () {
              return !1;
            };
            (e.isValid = L),
              (e.registerValidationProvider = function (t) {
                e.isValid = t || L;
              });
            var D = function (e, t) {
              return t();
            };
            function O(n, a, r) {
              t(n)
                .then(function (t) {
                  s.addError({
                    status: t,
                    message: a ? a.message : "",
                    exclusive: r,
                    scope: e,
                  });
                })
                .catch(i.noop);
            }
            (e.registerPostFilterSavedProvider = function (e) {
              D = e || D;
            }),
              (e.submit = function () {
                (e.submitInProgress = !0), e.$broadcast("pre-submit");
                for (
                  var t, n = (e.filter.query || []).concat(A), i = {}, a = 0;
                  (t = n[a]);
                  a++
                ) {
                  var r = t.key,
                    s = t.value;
                  if (!m(r) && "sorting" !== r)
                    if (
                      ((s = u(r, s)),
                      -1 !== p.indexOf(r) && h.test(s) && (s = E(s)),
                      y(s)
                        ? -1 === r.indexOf("Expression") && (r += "Expression")
                        : -1 !== r.indexOf("Expression") &&
                          (r = r.slice(0, r.indexOf("Expression"))),
                      "candidateGroups" === r || "In" === r.slice(-2))
                    ) {
                      if ("string" == typeof s) {
                        s = s.split(",");
                        for (var c = 0; c < s.length; c++)
                          s[c] && (s[c] = s[c].trim());
                      }
                    } else s = "" + s;
                  i[r] = s;
                }
                e.filter.includeAssignedTasks && (i.includeAssignedTasks = !0),
                  "any" === e.filter.matchType && (i = { orQueries: [i] });
                var d = {
                  id: I,
                  name: e.filter.name,
                  resourceType: "Task",
                  query: i,
                  properties: {
                    description: e.filter.properties.description,
                    priority: parseInt(e.filter.properties.priority || 0, 10),
                    color: e.filter.properties.color || l,
                    refresh: e.filter.properties.refresh,
                    variables: e.filter.properties.variables,
                    showUndefinedVariable:
                      e.filter.properties.showUndefinedVariable,
                  },
                };
                b(d),
                  w.save(d, function (t, n) {
                    if (((e.submitInProgress = !1), t))
                      return O("FILTER_SAVE_ERROR", t, !0);
                    (d.id = I = I || n.id),
                      D(d, function (t) {
                        if (t)
                          if (o(t) && t.length)
                            for (var n, i = 0; (n = t[i]); i++)
                              O(n.status, n.error, 0 === i);
                          else O(t.status, t.error, !0);
                        else e.$close();
                      });
                  });
              }),
              (e.abortDeletion = function () {
                e.deletion = !1;
              }),
              (e.confirmDeletion = function () {
                e.deletion = !0;
              }),
              (e.delete = function () {
                (e.submitInProgress = !0),
                  w.delete(e.filter.id, function (t) {
                    if (((e.submitInProgress = !1), t))
                      return O("FILTER_DELETION_ERROR", t, !0);
                    e.$close();
                  });
              });
          },
        ];
      },
      76622: function (e, t, n) {
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
        function r(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  o(e, t, n[t]);
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
        function o(e, t, n) {
          var a;
          return (
            (a = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(e, t || "default");
                if ("object" != i(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(a) ? a : String(a)) in e
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
            a = n.hasOwnProperty,
            r =
              Object.defineProperty ||
              function (e, t, n) {
                e[t] = n.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            l = o.iterator || "@@iterator",
            c = o.asyncIterator || "@@asyncIterator",
            u = o.toStringTag || "@@toStringTag";
          function d(e, t, n) {
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
            d({}, "");
          } catch (e) {
            d = function (e, t, n) {
              return (e[t] = n);
            };
          }
          function p(e, t, n, i) {
            var a = t && t.prototype instanceof b ? t : b,
              o = Object.create(a.prototype),
              s = new O(i || []);
            return r(o, "_invoke", { value: T(e, n, s) }), o;
          }
          function f(e, t, n) {
            try {
              return { type: "normal", arg: e.call(t, n) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          t.wrap = p;
          var h = "suspendedStart",
            v = "suspendedYield",
            m = "executing",
            g = "completed",
            y = {};
          function b() {}
          function E() {}
          function k() {}
          var w = {};
          d(w, l, function () {
            return this;
          });
          var _ = Object.getPrototypeOf,
            I = _ && _(_(N([])));
          I && I !== n && a.call(I, l) && (w = I);
          var S = (k.prototype = b.prototype = Object.create(w));
          function x(e) {
            ["next", "throw", "return"].forEach(function (t) {
              d(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function A(e, t) {
            function n(r, o, s, l) {
              var c = f(e[r], e, o);
              if ("throw" !== c.type) {
                var u = c.arg,
                  d = u.value;
                return d && "object" == i(d) && a.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        n("next", e, s, l);
                      },
                      function (e) {
                        n("throw", e, s, l);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), s(u);
                      },
                      function (e) {
                        return n("throw", e, s, l);
                      }
                    );
              }
              l(c.arg);
            }
            var o;
            r(this, "_invoke", {
              value: function (e, i) {
                function a() {
                  return new t(function (t, a) {
                    n(e, i, t, a);
                  });
                }
                return (o = o ? o.then(a, a) : a());
              },
            });
          }
          function T(t, n, i) {
            var a = h;
            return function (r, o) {
              if (a === m) throw new Error("Generator is already running");
              if (a === g) {
                if ("throw" === r) throw o;
                return { value: e, done: !0 };
              }
              for (i.method = r, i.arg = o; ; ) {
                var s = i.delegate;
                if (s) {
                  var l = C(s, i);
                  if (l) {
                    if (l === y) continue;
                    return l;
                  }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                  if (a === h) throw ((a = g), i.arg);
                  i.dispatchException(i.arg);
                } else "return" === i.method && i.abrupt("return", i.arg);
                a = m;
                var c = f(t, n, i);
                if ("normal" === c.type) {
                  if (((a = i.done ? g : v), c.arg === y)) continue;
                  return { value: c.arg, done: i.done };
                }
                "throw" === c.type &&
                  ((a = g), (i.method = "throw"), (i.arg = c.arg));
              }
            };
          }
          function C(t, n) {
            var i = n.method,
              a = t.iterator[i];
            if (a === e)
              return (
                (n.delegate = null),
                ("throw" === i &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  C(t, n),
                  "throw" === n.method)) ||
                  ("return" !== i &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + i + "' method"
                    )))),
                y
              );
            var r = f(a, t.iterator, n.arg);
            if ("throw" === r.type)
              return (
                (n.method = "throw"), (n.arg = r.arg), (n.delegate = null), y
              );
            var o = r.arg;
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
          function D(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function O(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(L, this),
              this.reset(!0);
          }
          function N(t) {
            if (t || "" === t) {
              var n = t[l];
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
            (E.prototype = k),
            r(S, "constructor", { value: k, configurable: !0 }),
            r(k, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(k, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === E || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, k)
                  : ((e.__proto__ = k), d(e, u, "GeneratorFunction")),
                (e.prototype = Object.create(S)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            x(A.prototype),
            d(A.prototype, c, function () {
              return this;
            }),
            (t.AsyncIterator = A),
            (t.async = function (e, n, i, a, r) {
              void 0 === r && (r = Promise);
              var o = new A(p(e, n, i, a), r);
              return t.isGeneratorFunction(n)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            x(S),
            d(S, u, "Generator"),
            d(S, l, function () {
              return this;
            }),
            d(S, "toString", function () {
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
            (t.values = N),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(D),
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
                function i(i, a) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (n.next = i),
                    a && ((n.method = "next"), (n.arg = e)),
                    !!a
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var l = a.call(o, "catchLoc"),
                      c = a.call(o, "finallyLoc");
                    if (l && c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                    } else if (l) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    } else {
                      if (!c)
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
                    return this.complete(n.completion, n.afterLoc), D(n), y;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var i = n.completion;
                    if ("throw" === i.type) {
                      var a = i.arg;
                      D(n);
                    }
                    return a;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, i) {
                return (
                  (this.delegate = {
                    iterator: N(t),
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
        function l(e, t, n, i, a, r, o) {
          try {
            var s = e[r](o),
              l = s.value;
          } catch (e) {
            return void n(e);
          }
          s.done ? t(l) : Promise.resolve(l).then(i, a);
        }
        function c(e) {
          return function () {
            var t = this,
              n = arguments;
            return new Promise(function (i, a) {
              var r = e.apply(t, n);
              function o(e) {
                l(r, i, a, o, s, "next", e);
              }
              function s(e) {
                l(r, i, a, o, s, "throw", e);
              }
              o(void 0);
            });
          };
        }
        function u(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != n) {
                var i,
                  a,
                  r,
                  o,
                  s = [],
                  l = !0,
                  c = !1;
                try {
                  if (((r = (n = n.call(e)).next), 0 === t)) {
                    if (Object(n) !== n) return;
                    l = !1;
                  } else
                    for (
                      ;
                      !(l = (i = r.call(n)).done) &&
                      (s.push(i.value), s.length !== t);
                      l = !0
                    );
                } catch (e) {
                  (c = !0), (a = e);
                } finally {
                  try {
                    if (
                      !l &&
                      null != n.return &&
                      ((o = n.return()), Object(o) !== o)
                    )
                      return;
                  } finally {
                    if (c) throw a;
                  }
                }
                return s;
              }
            })(e, t) ||
            (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return d(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === n && e.constructor && (n = e.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(e);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return d(e, t);
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function d(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
          return i;
        }
        n(36180),
          n(51980),
          n(32157),
          n(28186),
          n(24421),
          n(77674),
          n(82447),
          n(72595),
          n(553),
          n(67559),
          n(27216),
          n(2108),
          n(54363),
          n(1164),
          n(38179),
          n(85174),
          n(17922),
          n(56806),
          n(95234),
          n(95453),
          n(34820),
          n(57507),
          n(84735),
          n(91945),
          n(85541),
          n(84392),
          n(17003),
          n(6950),
          n(76474),
          n(30129),
          n(66893),
          n(19824);
        var p = n(57661).Form,
          f = n(43909);
        e.exports = [
          "camAPI",
          "$translate",
          "Notifications",
          "unfixDate",
          function (e, t, n, a) {
            return {
              restrict: "A",
              require: "^camTasklistForm",
              scope: !0,
              template: "",
              link: function (o, l, d, h) {
                var v,
                  m = e.resource("task"),
                  g = e.resource("process-definition"),
                  y = h.getParams().taskId,
                  b = JSON.parse(
                    localStorage.getItem("camunda-form:".concat(y)) || "{}"
                  ),
                  E = [],
                  k = !0;
                h.notifyFormValidated(!1);
                var w = function () {
                    if (y)
                      return m
                        .formVariables({ id: y, deserializeValues: !1 })
                        .then(function (e) {
                          E = e;
                        })
                        .catch(function (e) {
                          return t("LOAD_VARIABLES_FAILURE")
                            .then(function (t) {
                              n.addError({
                                status: t,
                                message: e.message,
                                scope: o,
                              });
                            })
                            .catch(f.noop);
                        });
                  },
                  _ = function (e) {
                    var t = new Set(
                      e.components.map(function (e) {
                        var t = e.valuesKey;
                        if (t) return t;
                      })
                    );
                    Object.entries(E).forEach(function (e) {
                      var n = u(e, 2),
                        i = n[0],
                        r = n[1];
                      "Date" === r.type
                        ? (r.value = a(r.value))
                        : (function (e) {
                            var t;
                            return (
                              "Json" === e.type ||
                              "application/json" ===
                                (null == e ||
                                null === (t = e.valueInfo) ||
                                void 0 === t
                                  ? void 0
                                  : t.serializationDataFormat)
                            );
                          })(r) &&
                          ((r.value = JSON.parse(r.value)),
                          (function (e, t, n) {
                            Array.from(e).includes(n) &&
                              t.value.every(function (e) {
                                return "string" == typeof e;
                              }) &&
                              (t.value = t.value.map(function (e) {
                                return { label: e, value: e };
                              }));
                          })(t, r, i));
                    });
                  },
                  I = null;
                function S(e) {
                  return x.apply(this, arguments);
                }
                function x() {
                  return (x = c(
                    s().mark(function e(t) {
                      var n;
                      return s().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (I = t.components.reduce(function (e, t) {
                                  var n = t.key,
                                    i = t.valuesKey;
                                  return (e[n] = i), e;
                                }, {})),
                                _(t),
                                (n = Object.keys(E).reduce(function (e, t) {
                                  return (e[t] = E[t].value), e;
                                }, {})),
                                (v = new p({ container: l[0] })),
                                (e.next = 6),
                                v.importSchema(t, r(r({}, n), b))
                              );
                            case 6:
                              h.notifyFormInitialized(),
                                v.on("submit", function () {
                                  k && h.attemptComplete();
                                }),
                                v.on("changed", function (e) {
                                  h.notifyFormDirty(!0);
                                  var t = !!Object.keys(e.errors).length;
                                  h.notifyFormValidated(t);
                                });
                            case 9:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  )).apply(this, arguments);
                }
                function A() {
                  k = !1;
                  var e = v.submit();
                  return (k = !0), e;
                }
                function T() {
                  var e = A().data;
                  localStorage.setItem(
                    "camunda-form:".concat(y),
                    JSON.stringify(e)
                  ),
                    h.notifyFormDirty(!1);
                }
                function C() {
                  return L.apply(this, arguments);
                }
                function L() {
                  return (L = c(
                    s().mark(function e() {
                      var t, n, a, r;
                      return s().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((t = A()),
                                (n = t.data),
                                (a = t.errors),
                                !Object.keys(a).length)
                              ) {
                                e.next = 3;
                                break;
                              }
                              throw a;
                            case 3:
                              if (
                                ((r = Object.entries(n).reduce(function (e, t) {
                                  var n = u(t, 2),
                                    a = n[0],
                                    r = n[1];
                                  if (null !== r && "object" === i(r)) {
                                    var o = E[a],
                                      s = null,
                                      l = null;
                                    if (o) (s = o.type), (l = o.valueInfo);
                                    else {
                                      var c = I[a];
                                      if (c) {
                                        var d = E[c];
                                        d
                                          ? ((s = d.type), (l = d.valueInfo))
                                          : (s = "Json");
                                      } else s = "Json";
                                    }
                                    e[a] = {
                                      type: s,
                                      valueInfo: l,
                                      value: JSON.stringify(r),
                                    };
                                  } else e[a] = { value: r };
                                  return e;
                                }, {})),
                                !y)
                              ) {
                                e.next = 10;
                                break;
                              }
                              return (
                                (e.next = 7),
                                m.submitForm({ id: y, variables: r })
                              );
                            case 7:
                            case 12:
                              return e.abrupt("return", e.sent);
                            case 10:
                              return (
                                (e.next = 12),
                                g.submitForm({
                                  id: h.getParams().processDefinitionId,
                                  variables: r,
                                })
                              );
                            case 13:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  )).apply(this, arguments);
                }
                h.registerSaveHandler(T),
                  o.$on("authentication.login.required", T),
                  h.registerCompletionHandler(
                    (function () {
                      var e = c(
                        s().mark(function e(t) {
                          var n;
                          return s().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (e.prev = 0), (e.next = 3), C();
                                  case 3:
                                    (n = e.sent),
                                      localStorage.removeItem(
                                        "camunda-form:".concat(y)
                                      ),
                                      t(null, n),
                                      (e.next = 11);
                                    break;
                                  case 8:
                                    (e.prev = 8), (e.t0 = e.catch(0)), t(e.t0);
                                  case 11:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            null,
                            [[0, 8]]
                          );
                        })
                      );
                      return function (t) {
                        return e.apply(this, arguments);
                      };
                    })()
                  ),
                  o.$watch(
                    "asynchronousFormKey",
                    function (e) {
                      fetch(e.key + "?noCache=".concat(Date.now()))
                        .then(
                          (function () {
                            var e = c(
                              s().mark(function e(t) {
                                var n;
                                return s().wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        if (200 === t.status) {
                                          e.next = 2;
                                          break;
                                        }
                                        throw new Error(t.statusText);
                                      case 2:
                                        return (e.next = 4), t.json();
                                      case 4:
                                        return (n = e.sent), (e.next = 7), w();
                                      case 7:
                                        return (e.next = 9), S(n);
                                      case 9:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e);
                              })
                            );
                            return function (t) {
                              return e.apply(this, arguments);
                            };
                          })()
                        )
                        .catch(function (e) {
                          h.notifyFormInitializationFailed(e);
                        });
                    },
                    !0
                  );
              },
            };
          },
        ];
      },
      89743: function (e, t, n) {
        "use strict";
        n(67762), n(67559), n(84392);
        var i = n(4669),
          a = n(43909),
          r = n(25447);
        e.exports = [
          "CamForm",
          "camAPI",
          "$timeout",
          "Uri",
          function (e, t, n, o) {
            return {
              restrict: "A",
              require: "^camTasklistForm",
              scope: !0,
              template: i,
              link: function (i, s, l, c) {
                var u = r(s[0]).find(".form-container"),
                  d = null,
                  p = null,
                  f = (i.form = { $valid: !1, $invalid: !0 });
                i.$watch(
                  "asynchronousFormKey",
                  function (n) {
                    n &&
                      n.loaded &&
                      (function (n, r, s) {
                        var l = r.key;
                        delete (s = a.copy(s)).processDefinitionKey,
                          a.extend(s, {
                            urlParams: {
                              userId: i.$root.authentication.name,
                              engineName: o.appUri(":engine"),
                            },
                            containerElement: n,
                            client: t,
                            formUrl: l,
                            done: h,
                          }),
                          s.taskId && (s.urlParams.taskId = s.taskId);
                        d = new e(s);
                      })(u, n, c.getParams()),
                      n &&
                        n.failure &&
                        c.notifyFormInitializationFailed(n.error);
                  },
                  !0
                ),
                  i.$watch(
                    function () {
                      return f && f.$valid;
                    },
                    function (e) {
                      c.notifyFormValidated(!e);
                    }
                  ),
                  i.$watch(
                    function () {
                      return f && f.$dirty;
                    },
                    function (e) {
                      c.notifyFormDirty(e);
                    }
                  );
                var h = function (e, t) {
                  if (e) return c.notifyFormInitializationFailed(e);
                  (d = t), (p = a.copy(d.variableManager.variables));
                  var n = t.formElement.attr("name"),
                    r = t.formElement.scope();
                  r &&
                    ((f = r[n]).$setPristine(),
                    c.notifyFormInitialized(),
                    i.$root.$broadcast("embedded.form.rendered"));
                };
                i.$on("shortcut:focusForm", function () {
                  if (d) {
                    var e = d.formElement[0].querySelectorAll("input")[0];
                    e && e.focus();
                  }
                }),
                  (i.formKeyPressed = function (e) {
                    if (e.ctrlKey && (13 === e.keyCode || 10 === e.keyCode))
                      return c.attemptComplete();
                  });
                var v = function (e) {
                    return function (t, n) {
                      return (
                        t &&
                          (function () {
                            var e = d.variableManager.variables;
                            for (var t in e)
                              d.variableManager.destroyVariable(t);
                            d.variableManager.variables = a.copy(p);
                          })(),
                        e(t, n)
                      );
                    };
                  },
                  m = function (e) {
                    f.$setPristine(),
                      d.store(),
                      e &&
                        n(function () {
                          a.element(e.target).triggerHandler(
                            r.Event("mouseleave")
                          );
                        });
                  };
                c.registerCompletionHandler(function (e) {
                  d.submit(v(e));
                }),
                  c.registerSaveHandler(m),
                  i.$on("authentication.login.required", function () {
                    m();
                  });
              },
            };
          },
        ];
      },
      82506: function (e, t, n) {
        "use strict";
        n(56806), n(31083);
        var i = n(19272);
        e.exports = [
          "$location",
          function (e) {
            return {
              restrict: "A",
              require: "^camTasklistForm",
              scope: !0,
              template: i,
              link: function (t, n, i, a) {
                a.notifyFormValidated(!0),
                  (t.externalFormUrl = null),
                  (t.EXTERNAL_FORM_NOTE = null),
                  t.$watch(
                    function () {
                      return a.getTasklistForm() && a.getParams();
                    },
                    function (n) {
                      if (n) {
                        var i = a.getTasklistForm(),
                          r = a.getParams(),
                          o = i.key,
                          s = r.taskId,
                          l = r.processDefinitionKey,
                          c = null;
                        if (s)
                          (c = "taskId=" + s),
                            (t.EXTERNAL_FORM_NOTE = "TASK_EXTERNAL_FORM_NOTE");
                        else {
                          if (!l)
                            return a.notifyFormInitializationFailed({
                              message: "INIT_EXTERNAL_FORM_FAILED",
                            });
                          (c = "processDefinitionKey=" + l),
                            (t.EXTERNAL_FORM_NOTE =
                              "PROCESS_EXTERNAL_FORM_NOTE");
                        }
                        var u = e.absUrl(),
                          d = e.url();
                        (u = u.replace(d, "/")),
                          (t.externalFormUrl = encodeURI(
                            o + "?" + c + "&callbackUrl=" + u
                          )),
                          a.notifyFormInitialized();
                      }
                    }
                  ),
                  t.$watch(
                    function () {
                      return a.getOptions();
                    },
                    function (e) {
                      e && (e.hideCompleteButton = !0);
                    }
                  );
              },
            };
          },
        ];
      },
      49428: function (e, t, n) {
        "use strict";
        n(84735), n(67559), n(84392), n(66893);
        var i = n(25776),
          a = n(43909);
        e.exports = [
          "camAPI",
          "Notifications",
          "$translate",
          "unfixDate",
          "Uri",
          function (e, t, n, r, o) {
            return {
              restrict: "A",
              require: "^camTasklistForm",
              template: i,
              link: function (i, s, l, c) {
                var u = e.resource("task"),
                  d = e.resource("process-instance"),
                  p = e.resource("case-instance");
                i.showBusinessKey = !1;
                var f = { name: "", value: "", type: "" },
                  h = (i.variableTypes = {
                    Boolean: "checkbox",
                    Integer: "text",
                    Long: "text",
                    Short: "text",
                    Double: "text",
                    String: "text",
                    Date: "text",
                  }),
                  v = c.getParams(),
                  m = v.processInstanceId || v.caseInstanceId;
                if (v.processDefinitionId || v.caseDefinitionId)
                  if (m) {
                    (i.readonly = !0),
                      (v.processInstanceId ? d : p)
                        .get(m)
                        .then(function (e) {
                          e.businessKey &&
                            ((i.showBusinessKey = !0),
                            (i.businessKey = e.businessKey));
                        })
                        .catch(a.noop);
                  } else i.showBusinessKey = !0;
                else i.showBusinessKey = !1;
                i.$watch("tasklistForm", function () {
                  i.variablesLoaded = !1;
                }),
                  (i.addVariable = function () {
                    var e = a.copy(f);
                    i.variables.push(e);
                  }),
                  (i.removeVariable = function (e) {
                    var t = [];
                    a.forEach(i.variables, function (n, i) {
                      i != e && t.push(n);
                    }),
                      (i.variables = t);
                  }),
                  (i.getVariableNames = function () {
                    return i.variables.map(function (e) {
                      return e.name;
                    });
                  }),
                  (i.loadVariables = function () {
                    (i.variablesLoaded = !0),
                      u.formVariables(
                        { id: c.getParams().taskId, deserializeValues: !1 },
                        function (e, s) {
                          if (e)
                            return (
                              (i.variablesLoaded = !1),
                              n("LOAD_VARIABLES_FAILURE")
                                .then(function (n) {
                                  t.addError({
                                    status: n,
                                    message: e.message,
                                    scope: i,
                                  });
                                })
                                .catch(a.noop)
                            );
                          var l = !1;
                          a.forEach(s, function (e, t) {
                            if (h[e.type]) {
                              var n = e.value;
                              "Date" === e.type && (n = r(n)),
                                i.variables.push({
                                  name: t,
                                  value: n,
                                  type: e.type,
                                  fixedName: !0,
                                }),
                                (l = !0);
                            }
                            "Object" === e.type &&
                              (i.variables.push({
                                name: t,
                                value: e.value,
                                type: e.type,
                                valueInfo: e.valueInfo,
                              }),
                              (l = !0)),
                              "File" === e.type &&
                                ((l = !0),
                                i.variables.push({
                                  name: t,
                                  type: e.type,
                                  downloadUrl: o.appUri(
                                    "engine://engine/:engine/task/" +
                                      c.getParams().taskId +
                                      "/variables/" +
                                      t +
                                      "/data"
                                  ),
                                  readonly: !0,
                                }));
                          }),
                            l ||
                              n("NO_TASK_VARIABLES")
                                .then(function (e) {
                                  t.addMessage({
                                    duration: 5e3,
                                    status: e,
                                    scope: i,
                                  });
                                })
                                .catch(a.noop);
                        }
                      );
                  });
              },
            };
          },
        ];
      },
      3128: function (e, t, n) {
        "use strict";
        n(82447), n(67762), n(67559), n(84392), n(66893);
        var i = n(43544),
          a = n(43909),
          r = n(25447);
        e.exports = [
          "CamForm",
          "camAPI",
          "$timeout",
          function (e, t, n) {
            return {
              restrict: "A",
              require: "^camTasklistForm",
              scope: !0,
              template: i,
              link: function (i, o, s, l) {
                var c = r(o[0]).find("form"),
                  u = (i.camForm = null),
                  d = { $valid: !1, $invalid: !0 },
                  p = !1;
                i.$watch(
                  function () {
                    return p;
                  },
                  function (n) {
                    var r;
                    n &&
                      ((r = l.getParams()),
                      delete (r = a.copy(r)).processDefinitionKey,
                      a.extend(r, { client: t, formElement: c, done: f }),
                      (i.camForm = u = new e(r)),
                      (p = !1));
                  }
                ),
                  i.$watch(
                    function () {
                      return l.getTasklistForm();
                    },
                    function (e) {
                      e && ((p = !0), (i.variables = []));
                    }
                  ),
                  i.$watch(
                    function () {
                      return d && d.$valid;
                    },
                    function (e) {
                      l.notifyFormValidated(!e);
                    }
                  );
                var f = function (e, t) {
                  if (e) return l.notifyFormInitializationFailed(e);
                  u = t;
                  var a = t.formElement.attr("name"),
                    r = t.formElement.scope();
                  r &&
                    ((d = r[a]),
                    l.notifyFormInitialized(),
                    i.options.autoFocus &&
                      n(function () {
                        var e = t.formElement[0].querySelectorAll("input")[0];
                        e && e.focus();
                      }));
                };
                l.registerCompletionHandler(function (e) {
                  function t(t, n) {
                    return (
                      (function () {
                        var e = u.variableManager.variables;
                        for (var t in e) u.variableManager.destroyVariable(t);
                      })(),
                      (u.fields = []),
                      e(t, n)
                    );
                  }
                  try {
                    u.initializeFieldHandlers();
                  } catch (e) {
                    return t(e);
                  }
                  var n = u.variableManager.variables;
                  for (var a in n) n[a].value = null;
                  i.variables
                    .filter(function (e) {
                      return "Object" === e.type;
                    })
                    .forEach(function (e) {
                      u.variableManager.createVariable({
                        name: e.name,
                        type: "Object",
                        value: e.value,
                        valueInfo: e.valueInfo,
                      });
                    }),
                    u.submit(t);
                });
              },
            };
          },
        ];
      },
      33728: function (e, t, n) {
        "use strict";
        n(45477), n(56806), n(31083);
        var i = n(23744),
          a = "embedded:",
          r = "app:",
          o = "engine:",
          s = "deployment:",
          l = "camunda-forms:";
        var c = function () {};
        e.exports = function () {
          return {
            restrict: "A",
            scope: {
              tasklistForm: "=",
              options: "=",
              params: "=",
              onFormCompletionCallback: "&",
              onFormCompletion: "&",
              onFormValidation: "&",
            },
            template: i,
            controller: [
              "$scope",
              "Uri",
              function (e, t) {
                (e.taskRemoved = !1),
                  e.$on("taskremoved", function () {
                    e.taskRemoved = !0;
                  });
                var n = function () {
                  var t = e.$root.$$phase;
                  "$apply" !== t && "$digest" !== t && e.$apply();
                };
                (e.onFormCompletionCallback =
                  e.onFormCompletionCallback() || c),
                  (e.onFormCompletion = e.onFormCompletion() || c),
                  (e.onFormValidation = e.onFormValidation() || c),
                  (e.completionHandler = c),
                  (e.saveHandler = c),
                  (e.$loaded = !1),
                  (e.completeInProgress = !1),
                  e.$watch("tasklistForm", function (n) {
                    (e.$loaded = !1),
                      n &&
                        (!(function (n) {
                          if (n.type) return void u(n.key);
                          var c = n.key,
                            d = n.camundaFormRef,
                            p = n.contextPath;
                          if (!c && !d) return void (n.type = "generic");
                          if (d)
                            return (
                              (n.type = "camunda-forms"),
                              u(
                                (c = e.params.taskId
                                  ? t.appUri(
                                      "engine://engine/:engine/task/" +
                                        e.params.taskId +
                                        "/deployed-form"
                                    )
                                  : t.appUri(
                                      "engine://engine/:engine/process-definition/" +
                                        e.params.processDefinitionId +
                                        "/deployed-start-form"
                                    ))
                              ),
                              void (n.key = c)
                            );
                          0 === c.indexOf(a)
                            ? ((c = c.substring(9)), (n.type = "embedded"))
                            : 0 === c.indexOf(l)
                            ? ((c = c.substring(14)),
                              (n.type = "camunda-forms"))
                            : (n.type = "external");
                          0 === c.indexOf(r)
                            ? p
                              ? u(
                                  (c = (function (e) {
                                    var t = [];
                                    for (var n in e) e[n] && t.push(e[n]);
                                    return t;
                                  })([p, c.substring(4)])
                                    .join("/")
                                    .replace(/\/([/]+)/, "/"))
                                )
                              : i.notifyFormInitializationFailed({
                                  message: "EMPTY_CONTEXT_PATH",
                                })
                            : 0 === c.indexOf(s)
                            ? u(
                                (c = e.params.taskId
                                  ? t.appUri(
                                      "engine://engine/:engine/task/" +
                                        e.params.taskId +
                                        "/deployed-form"
                                    )
                                  : t.appUri(
                                      "engine://engine/:engine/process-definition/" +
                                        e.params.processDefinitionId +
                                        "/deployed-start-form"
                                    ))
                              )
                            : 0 === c.indexOf(o)
                            ? u((c = t.appUri(c)))
                            : u(c);
                          n.key = c;
                        })(n),
                        (e.taskRemoved = !1));
                  }),
                  (e.asynchronousFormKey = { loaded: !1, failure: !1 });
                var i = this;
                function u(t) {
                  (e.asynchronousFormKey.key = t),
                    (e.asynchronousFormKey.loaded = !0);
                }
                var d = function (t, n) {
                    e.onFormCompletionCallback(t, n),
                      (e.completeInProgress = !1);
                  },
                  p = (e.complete = function () {
                    (e.completeInProgress = !0), e.completionHandler(d);
                  });
                e.onFormCompletion(p),
                  (e.showCompleteButton = function () {
                    return (
                      e.options && !e.options.hideCompleteButton && e.$loaded
                    );
                  });
                var f = (e.disableCompleteButton = function () {
                  return (
                    e.taskRemoved ||
                    e.completeInProgress ||
                    e.$invalid ||
                    (e.options && e.options.disableCompleteButton)
                  );
                });
                (e.save = function (t) {
                  e.saveHandler(t);
                }),
                  (this.notifyFormInitialized = function () {
                    (e.$loaded = !0), n();
                  }),
                  (this.notifyFormInitializationFailed = function (t) {
                    (e.tasklistForm.$error = t),
                      this.notifyFormInitialized(),
                      this.notifyFormValidated(!0);
                  }),
                  (this.notifyFormCompleted = function (t) {
                    e.onFormCompletion(t);
                  }),
                  (this.notifyFormValidated = function (t) {
                    (e.$invalid = t), e.onFormValidation(t), n();
                  }),
                  (this.notifyFormDirty = function (t) {
                    (e.$dirty = t), n();
                  }),
                  (this.getOptions = function () {
                    return e.options || {};
                  }),
                  (this.getTasklistForm = function () {
                    return e.tasklistForm;
                  }),
                  (this.getParams = function () {
                    return e.params || {};
                  }),
                  (this.registerCompletionHandler = function (t) {
                    e.completionHandler = t || c;
                  }),
                  (this.registerSaveHandler = function (t) {
                    e.saveHandler = t || c;
                  }),
                  (this.attemptComplete = function () {
                    return !f() && p();
                  });
              },
            ],
          };
        };
      },
      95973: function (e, t, n) {
        "use strict";
        n(85541),
          (e.exports = [
            function () {
              return {
                require: "ngModel",
                link: function (e, t, n, i) {
                  var a = function (e) {
                    var a = JSON.parse(n.camUniqueValue);
                    if ((i.$setValidity("camUniqueValue", !0), e)) {
                      i.$pristine &&
                        ((i.$pristine = !1),
                        (i.$dirty = !0),
                        t.addClass("ng-dirty"),
                        t.removeClass("ng-pristine"));
                      for (var r = !1, o = 0; o < a.length; o++)
                        if (a[o] === e) {
                          if (r) {
                            i.$setValidity("camUniqueValue", !1);
                            break;
                          }
                          r = !0;
                        }
                    }
                    return e;
                  };
                  i.$parsers.unshift(a),
                    i.$formatters.push(a),
                    n.$observe("camUniqueValue", function () {
                      return a(i.$viewValue);
                    });
                },
              };
            },
          ]);
      },
      77789: function (e, t, n) {
        "use strict";
        var i = n(43909),
          a = n(33728),
          r = n(3128),
          o = n(49428),
          s = n(89743),
          l = n(82506),
          c = n(76622),
          u = n(95973),
          d = i.module("cam.tasklist.form", ["ui.bootstrap"]);
        d.directive("camTasklistForm", a),
          d.directive("camTasklistFormGeneric", r),
          d.directive("camTasklistFormGenericVariables", o),
          d.directive("camTasklistFormEmbedded", s),
          d.directive("camTasklistFormExternal", l),
          d.directive("camTasklistFormCamunda", c),
          d.directive("camUniqueValue", u),
          (e.exports = d);
      },
      97177: function (e) {
        "use strict";
        e.exports = [
          "$scope",
          "Views",
          function (e, t) {
            (e.navbarVars = { read: ["tasklistApp"] }),
              (e.navbarActions = t.getProviders({
                component: "tasklist.navbar.action",
              }));
          },
        ];
      },
      75917: function (e, t, n) {
        "use strict";
        var i = n(25447),
          a = i("body");
        e.exports = [
          "$scope",
          "$timeout",
          function (e, t) {
            function n(e) {
              return a.hasClass(e + "-column-close");
            }
            function r(e) {
              return a.removeClass(e + "-column-close");
            }
            function o(e) {
              return a.addClass(e + "-column-close");
            }
            (e.toggleVariableSearch = function (e) {
              e && e.preventDefault && e.preventDefault(),
                i(".tasks-list").toggleClass("show-search");
            }),
              (e.toggleRegion = function (o) {
                o && o.preventDefault && o.preventDefault();
                var s = (function (e) {
                  return i(e.currentTarget).attr("data-region");
                })(o);
                "task" === s
                  ? n("list") && !n("task") && r("list")
                  : "list" === s && n("task") && !n("list") && r("task"),
                  a.toggleClass(s + "-column-close"),
                  t(function () {
                    e.$root.$broadcast("layout:change");
                  }, 600);
              }),
              (e.maximizeRegion = function (e) {
                e && e.preventDefault && e.preventDefault(),
                  o("filters"),
                  o("list"),
                  r("task"),
                  document.querySelector(".reset-regions").focus();
              }),
              (e.resetRegions = function (e) {
                e && e.preventDefault && e.preventDefault(),
                  r("filters"),
                  r("list"),
                  r("task"),
                  document.querySelector(".maximize").focus();
              });
          },
        ];
      },
      4057: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(43909),
          a = n(75917),
          r = n(97177);
        n(90517);
        var o = i.module("cam.tasklist.navigation", [
          n(90517).name,
          "ui.bootstrap",
        ]);
        o.controller("camHeaderViewsCtrl", r),
          o.controller("camLayoutCtrl", a),
          (e.exports = o);
      },
      40660: function (e, t, n) {
        "use strict";
        var i = n(43909),
          a = n(99654),
          r = n(32227),
          o = i.module("cam.tasklist.process", [
            "cam.tasklist.client",
            "cam.tasklist.form",
            "ui.bootstrap",
          ]);
        o.config(a),
          o.controller("camProcessStartModalCtrl", r),
          (e.exports = o);
      },
      99654: function (e, t, n) {
        "use strict";
        n(56806), n(92695);
        var i = n(43909),
          a = n(5664),
          r = n(30709),
          o = [
            "$scope",
            "$uibModal",
            "$q",
            "camAPI",
            "dataDepend",
            "$location",
            "search",
            function (e, t, n, a, o, s, l) {
              var c = a.resource("process-definition"),
                u = (e.processData = o.create(e)),
                d = {
                  latest: !0,
                  active: !0,
                  startableInTasklist: !0,
                  startablePermissionCheck: !0,
                  firstResult: 0,
                  maxResults: 15,
                };
              u.provide("processDefinitionQuery", d),
                u.provide("processDefinitions", [
                  "processDefinitionQuery",
                  function (e) {
                    var t = n.defer();
                    return (
                      c.list(e, function (e, n) {
                        e ? t.reject(e) : t.resolve(n);
                      }),
                      t.promise
                    );
                  },
                ]),
                u.provide("currentProcessDefinitionId", { id: null }),
                u.provide("startForm", [
                  "currentProcessDefinitionId",
                  function (e) {
                    var t = n.defer();
                    return (
                      e.id
                        ? c.startForm(e, function (e, n) {
                            e ? t.reject(e) : t.resolve(n);
                          })
                        : t.resolve(null),
                      t.promise
                    );
                  },
                ]);
              var p = !0;
              e.open = function (n) {
                p &&
                  (n || l.updateSilently({ processStart: !0 }),
                  u.set("processDefinitionQuery", i.copy(d)),
                  (p = !1),
                  t
                    .open({
                      size: "lg",
                      controller: "camProcessStartModalCtrl",
                      template: r,
                      resolve: {
                        processData: function () {
                          return u;
                        },
                      },
                    })
                    .result.then(
                      function () {
                        l.updateSilently({
                          processStart: null,
                          processTenant: null,
                        }),
                          (p = !0),
                          e.$root.$broadcast("refresh"),
                          document
                            .querySelector(".start-process-action a")
                            .focus();
                      },
                      function () {
                        l.updateSilently({
                          processStart: null,
                          processTenant: null,
                        }),
                          (p = !0),
                          document
                            .querySelector(".start-process-action a")
                            .focus();
                      }
                    ));
              };
              var f = function () {
                p && s.search().processStart && e.open(!0);
              };
              e.$on("$locationChangeSuccess", f),
                e.$on("shortcut:startProcess", e.open),
                f();
            },
          ],
          s = function (e) {
            e.registerDefaultView("tasklist.navbar.action", {
              id: "start-process-action",
              template: a,
              controller: o,
              priority: 100,
            });
          };
        (s.$inject = ["ViewsProvider"]), (e.exports = s);
      },
      32227: function (e, t, n) {
        "use strict";
        n(30225), n(67559), n(56806), n(92695);
        var i = n(43909),
          a = {
            hideCompleteButton: !0,
            hideStartButton: !1,
            hideLoadVariablesButton: !0,
            autoFocus: !0,
            disableForm: !1,
            disableAddVariableButton: !1,
          };
        e.exports = [
          "$rootScope",
          "$scope",
          "$translate",
          "$timeout",
          "debounce",
          "Notifications",
          "processData",
          "assignNotification",
          "$location",
          "search",
          "camAPI",
          function (e, t, n, r, o, s, l, c, u, d, p) {
            t.$on("authentication.login.required", function () {
              t.$dismiss();
            });
            var f = l.newChild(t);
            f.set("currentProcessDefinitionId", { id: null }),
              (t.options = i.copy(a)),
              (t.PROCESS_TO_START_SELECTED = !1);
            var h = null,
              v = (t.page = { total: 0, current: 1, searchValue: null });
            (t.triggerOnStart = function () {}),
              f.observe("processDefinitionQuery", function (e) {
                (h = i.copy(e)),
                  (v.size = e.maxResults),
                  (v.current = e.firstResult / v.size + 1);
              }),
              (t.startFormState = f.observe("startForm", function (e) {
                t.startForm = i.copy(e);
              })),
              (t.processDefinitionState = f.observe(
                "processDefinitions",
                function (e) {
                  (v.total = e.count),
                    (t.processDefinitions = e.items.sort(function (e, t) {
                      var n = (e.name || e.key).toLowerCase(),
                        i = (t.name || t.key).toLowerCase(),
                        a = e.tenantId ? e.tenantId.toLowerCase() : "",
                        r = t.tenantId ? t.tenantId.toLowerCase() : "";
                      return n < i
                        ? -1
                        : n > i
                        ? 1
                        : a < r
                        ? -1
                        : a > r
                        ? 1
                        : 0;
                    })),
                    v.total > 0 &&
                      r(function () {
                        var e = document.querySelectorAll(
                          "div.modal-content ul.processes a"
                        )[0];
                        e && e.focus();
                      });
                }
              )),
              (t.pageChange = function () {
                (h.firstResult = v.size * (v.current - 1)),
                  f.set("processDefinitionQuery", h);
              }),
              (t.lookupProcessDefinitionByName = o(function () {
                var e = v.searchValue;
                e ? (h.nameLike = "%" + e + "%") : delete h.nameLike,
                  (h.firstResult = 0),
                  f.set("processDefinitionQuery", h);
              }, 2e3)),
              (t.selectProcessDefinition = function (e) {
                t.PROCESS_TO_START_SELECTED = !0;
                var n = e.id,
                  r = e.key,
                  o = e.deploymentId,
                  s = e.name;
                (t.options = i.copy(a)),
                  (t.params = {
                    processDefinitionId: n,
                    processDefinitionKey: r,
                    deploymentId: o,
                    processDefinitionName: s,
                  });
                var l = { processStart: r };
                e.tenantId && (l.processTenant = e.tenantId),
                  d.updateSilently(l),
                  f.set("currentProcessDefinitionId", { id: n });
              });
            var m = u.search().processStart;
            if (m && "string" == typeof m) {
              var g = {
                  key: m,
                  latest: !0,
                  active: !0,
                  startableInTasklist: !0,
                  startablePermissionCheck: !0,
                  maxResults: 1,
                },
                y = u.search().processTenant;
              y && (g.tenantIdIn = y),
                p.resource("process-definition").list(g, function (e, n) {
                  if (e || 0 === n.items.length) return e;
                  t.selectProcessDefinition(n.items[0]);
                });
            }
            (t.$invalid = !0),
              (t.requestInProgress = !1),
              t.$on("embedded.form.rendered", function () {
                r(function () {
                  var e = document.querySelectorAll(
                    ".modal-body .form-container input"
                  )[0];
                  e && e.focus();
                });
              }),
              (t.back = function () {
                (t.$invalid = !0),
                  (t.requestInProgress = !1),
                  (t.PROCESS_TO_START_SELECTED = !1),
                  (t.options = a),
                  f.set("currentProcessDefinitionId", { id: null }),
                  r(function () {
                    var e = document.querySelectorAll(
                      "div.modal-content ul.processes a"
                    )[0];
                    e && e.focus();
                  });
              });
            var b = [];
            t.$on("$destroy", function () {
              for (var e; (e = b.pop()); ) "function" == typeof e && e();
            }),
              (t.completionCallback = function (a, r) {
                if (a)
                  return (
                    (t.requestInProgress = !1),
                    void (
                      "camForm submission prevented" !== a.message &&
                      (function (e, a) {
                        n(e)
                          .then(function (e) {
                            s.addError({
                              status: e,
                              message: a ? a.message : "",
                              scope: t,
                            });
                          })
                          .catch(i.noop);
                      })("PROCESS_START_ERROR", a)
                    )
                  );
                b.push(function () {
                  n("PROCESS_START_OK")
                    .then(function (e) {
                      s.addMessage({ duration: 3e3, status: e });
                    })
                    .catch(i.noop),
                    c({
                      assignee: e.authentication.name,
                      processInstanceId: r.id,
                      maxResults: 15,
                    });
                }),
                  t.$close();
              }),
              (t.registerCompletionHandler = function (e) {
                t.triggerOnStart = e || function () {};
              }),
              (t.startProcessInstance = function () {
                (t.requestInProgress = !0), t.triggerOnStart();
              }),
              (t.notifyFormValidation = function (e) {
                t.$invalid = e;
              });
          },
        ];
      },
      24934: function (e, t, n) {
        "use strict";
        n(72595),
          n(67559),
          (e.exports = [
            "camAPI",
            "Notifications",
            "$translate",
            function (e, t, n) {
              var i = e.resource("task");
              return function (e) {
                e.assignee &&
                  (e.processInstanceId || e.caseInstanceId) &&
                  i.list(e, function (i, a) {
                    if (a._embedded.task.length > 0) {
                      for (var r, o = "", s = 0; (r = a._embedded.task[s]); s++)
                        o +=
                          '<a href="#/?forceDisplayTask=true&task=' +
                          r.id +
                          '">' +
                          ((l = r.name || r.taskDefinitionKey),
                          (c = void 0),
                          (u = void 0),
                          (c = document.createTextNode(l)),
                          (u = document.createElement("div")).appendChild(c),
                          u.innerHTML + "</a>, ");
                      n(
                        e.processInstanceId
                          ? "ASSIGN_NOTE_PROCESS"
                          : "ASSIGN_NOTE_CASE"
                      )
                        .then(function (e) {
                          t.addMessage({
                            duration: 16e3,
                            status: e,
                            unsafe: !0,
                            message: o.slice(0, -2),
                          });
                        })
                        .catch(function () {});
                    }
                    var l, c, u;
                  });
              };
            },
          ]);
      },
      33680: function (e, t, n) {
        "use strict";
        n(96822);
        var i = n(20122),
          a = n(3877),
          r = [
            "$scope",
            "$uibModal",
            function (e, t) {
              var i = n(96822);
              if (
                void 0 !== window.camTasklistConf &&
                window.camTasklistConf.shortcuts
              )
                for (var r in ((e.shortcuts = window.camTasklistConf.shortcuts),
                window.camTasklistConf.shortcuts)) {
                  var o = window.camTasklistConf.shortcuts[r];
                  i.bind(
                    o.key,
                    (function (t) {
                      return function () {
                        e.$root.$broadcast("shortcut:" + t);
                      };
                    })(r)
                  );
                }
              e.showHelp = function () {
                t.open({
                  scope: e,
                  windowClass: "shortcut-modal",
                  size: "lg",
                  template: a,
                }).result.then(
                  function () {
                    document.querySelector("a.showShortcutHelp").focus();
                  },
                  function () {
                    document.querySelector("a.showShortcutHelp").focus();
                  }
                );
              };
            },
          ],
          o = function (e) {
            e.registerDefaultView("tasklist.navbar.action", {
              id: "shortcut-help",
              template: i,
              controller: r,
              priority: 300,
            });
          };
        (o.$inject = ["ViewsProvider"]), (e.exports = o);
      },
      74917: function (e, t, n) {
        "use strict";
        var i = n(43909),
          a = n(33680),
          r = i.module("cam.tasklist.shortcuts", []);
        r.config(a), (e.exports = r);
      },
      57741: function (e) {
        "use strict";
        e.exports = [
          "$scope",
          "Views",
          "CamForm",
          function (e, t, n) {
            (e.taskData = e.tasklistData.newChild(e)).observe(
              "task",
              function (t) {
                e.task = t;
              }
            ),
              n.cleanLocalStorage(Date.now() - 6048e5),
              (e.taskVars = { read: ["task", "taskData"] }),
              (e.taskActions = t.getProviders({
                component: "tasklist.task.action",
              }));
          },
        ];
      },
      29791: function (e, t, n) {
        "use strict";
        n(27473);
        var i = n(43909),
          a = "candidate";
        e.exports = [
          "$scope",
          "$translate",
          "$q",
          "Notifications",
          "camAPI",
          function (e, t, n, r, o) {
            var s = o.resource("task"),
              l = null,
              c = { groupId: null, type: a },
              u = (e.newGroup = i.copy(c)),
              d = e.taskGroupsData,
              p = e.groupsChanged,
              f = e.errorHandler();
            e._groups = [];
            var h = {};
            t([
              "FAILURE",
              "INIT_GROUPS_FAILURE",
              "ADD_GROUP_FAILED",
              "REMOVE_GROUP_FAILED",
            ])
              .then(function (e) {
                (h.failure = e.FAILURE),
                  (h.initGroupsFailed = e.INIT_GROUPS_FAILURE),
                  (h.addGroupFailed = e.ADD_GROUP_FAILED),
                  (h.removeGroupFailed = e.REMOVE_GROUP_FAILED);
              })
              .catch(i.noop),
              (e.modalGroupsState = d.observe("groups", function (t) {
                (e._groups = i.copy(t) || []), e.validateNewGroup();
              })),
              d.observe("task", function (e) {
                l = e;
              }),
              e.$watch("modalGroupsState.$error", function (t) {
                t &&
                  r.addError({
                    status: h.failure,
                    message: h.initGroupsFailed,
                    exclusive: !0,
                    scope: e,
                  });
              }),
              (e.addGroup = function () {
                var t = l.id;
                p(),
                  delete u.error,
                  (e.loading = !0),
                  s.identityLinksAdd(t, u, function (t) {
                    if (((e.loading = !1), t)) return f("TASK_UPDATE_ERROR", t);
                    e.taskGroupForm.$setPristine(),
                      e._groups.push({ id: u.groupId }),
                      (u = e.newGroup = i.copy(c));
                  });
              }),
              (e.removeGroup = function (t, n) {
                var i = l.id;
                p(),
                  s.identityLinksDelete(
                    i,
                    { type: a, groupId: t.id },
                    function (t) {
                      if (t)
                        return r.addError({
                          status: h.failure,
                          message: h.removeGroupFailed,
                          exclusive: !0,
                          scope: e,
                        });
                      e._groups.splice(n, 1);
                    }
                  );
              }),
              (e.validateNewGroup = function () {
                if (
                  (delete u.error, e.taskGroupForm && e.taskGroupForm.newGroup)
                ) {
                  e.taskGroupForm.newGroup.$setValidity("duplicate", !0);
                  var t = u.groupId;
                  if (t)
                    for (var n, i = 0; (n = e._groups[i]); i++)
                      t === n.id &&
                        ((u.error = { message: "DUPLICATE_GROUP" }),
                        e.taskGroupForm.newGroup.$setValidity("duplicate", !1));
                }
              }),
              (e.isEnabled = function () {
                return !e.loading && e.isValid();
              }),
              (e.isValid = function () {
                return !(!u.groupId || u.error);
              });
          },
        ];
      },
      36686: function (e, t, n) {
        "use strict";
        n(67762), n(67559), n(84392), n(42919), n(66893), n(8703);
        var i = n(31484),
          a = n(92443),
          r = n(43909);
        e.exports = [
          "$uibModal",
          "$timeout",
          "camAPI",
          "fixDate",
          "unfixDate",
          function (e, t, n, o, s) {
            var l = n.resource("task");
            return {
              scope: { taskData: "=", successHandler: "&", errorHandler: "&" },
              template: i,
              link: function (i, c) {
                var u = i.taskData.newChild(i);
                i.successHandler();
                var d = i.errorHandler() || function () {};
                function p() {
                  u.changed("task"), u.changed("taskList");
                }
                function f(e) {
                  return function (t) {
                    b(e, !1),
                      (i.task[e] = t),
                      v(),
                      document
                        .querySelector(
                          "[cam-widget-inline-field]." +
                            e.toLowerCase() +
                            "-date"
                        )
                        .focus();
                  };
                }
                function h(e) {
                  return function () {
                    (i.task[e] = null),
                      v(),
                      document
                        .querySelector(
                          "[cam-widget-inline-field]." +
                            e.toLowerCase() +
                            "-date"
                        )
                        .focus();
                  };
                }
                function v() {
                  var e = i.task;
                  delete e._embedded,
                    delete e._links,
                    (e.due = o(e.due)),
                    (e.followUp = o(e.followUp)),
                    l.update(e, function (e) {
                      if ((p(), e)) return d("TASK_UPDATE_ERROR", e);
                    });
                }
                function m() {
                  var e = document.querySelector(
                    '[cam-tasklist-task-meta] [cam-widget-inline-field][value="assignee.id"]'
                  );
                  (e ||
                    (e = document.querySelector(
                      "[cam-tasklist-task-meta] .claim"
                    ))) &&
                    e.focus();
                }
                function g(e) {
                  return function () {
                    if ("assignee" === e)
                      return w(i.assignee.id, function () {
                        b(e, !0);
                      });
                    b(e, !0);
                  };
                }
                function y(e) {
                  return function () {
                    var t;
                    b(e, !1),
                      (t =
                        "assignee" === e
                          ? document.querySelector(
                              '[cam-tasklist-task-meta] [cam-widget-inline-field][value="assignee.id"]'
                            )
                          : document.querySelector(
                              "[cam-widget-inline-field]." +
                                e.toLowerCase() +
                                "-date"
                            )) && t.focus();
                  };
                }
                function b(e, t) {
                  i.editingState[e] = t;
                }
                u.observe("task", function (e) {
                  (i.task = r.copy(e)),
                    i.task &&
                      ((i.task.followUp = s(i.task.followUp)),
                      (i.task.due = s(i.task.due)));
                }),
                  u.observe("assignee", function (e) {
                    i.assignee = r.copy(e);
                  }),
                  u.observe("isAssignee", function (e) {
                    i.isAssignee = e;
                  }),
                  u.observe("groups", function (e) {
                    e = e || [];
                    for (var t, n = [], a = 0; (t = e[a]); a++)
                      n.push(t.name || t.id);
                    i.groupNames = n;
                  }),
                  (i.saveFollowUpDate = f("followUp")),
                  (i.resetFollowUpDate = h("followUp")),
                  (i.startEditingFollowUpDate = g("followUp")),
                  (i.cancelEditingFollowUpDate = y("followUp")),
                  (i.saveDueDate = f("due")),
                  (i.resetDueDate = h("due")),
                  (i.startEditingDueDate = g("due")),
                  (i.cancelEditingDueDate = y("due")),
                  (i.editingState = { followUp: !1, due: !1, assignee: !1 }),
                  (i.now = new Date().toJSON()),
                  (i.openDatepicker = function (e) {
                    13 === e.keyCode &&
                      e.target === e.currentTarget &&
                      t(function () {
                        e.target.firstChild.click();
                      });
                  });
                var E,
                  k = n.resource("user");
                function w(e, t) {
                  t = t || r.noop;
                  var n = e.value;
                  return i.validationInProgress || E === n
                    ? t()
                    : n
                    ? ((E = n),
                      (i.validAssignee = !1),
                      (i.validationInProgress = !0),
                      void k.list({ maxResults: 1, id: n }, function (a, r) {
                        if (n !== e.value)
                          return (i.validationInProgress = !1), w(e, t);
                        (i.validAssignee = !a && r.length),
                          (i.validationInProgress = !1),
                          t();
                      }))
                    : ((i.validAssignee = !0),
                      (i.validationInProgress = !1),
                      t());
                }
                (i.validAssignee = !0),
                  (i.validationInProgress = !1),
                  (i.isInvalidUser = function () {
                    return i.validationInProgress || !i.validAssignee;
                  }),
                  (i.editAssignee = function (e) {
                    t(function () {
                      w(e.target, function () {
                        13 === e.keyCode &&
                          e.target === e.currentTarget &&
                          e.target.firstChild.click();
                      });
                    });
                  });
                var _ = {
                  assigned: { error: "ASSIGNED_ERROR" },
                  assigneeReseted: { error: "ASSIGNEE_RESET_ERROR" },
                  claimed: { error: "CLAIM_ERROR" },
                  unclaimed: { error: "UNCLAIM_ERROR" },
                };
                (i.startEditingAssignee = g("assignee")),
                  (i.cancelEditingAssignee = y("assignee")),
                  (i.assign = function (e) {
                    var t = i.assignee ? i.assignee.id : "";
                    w(c.find(".assignee input")[0], function () {
                      if (!i.validAssignee)
                        return (e = t), void (i.validAssignee = !0);
                      b("assignee", !1);
                      var n = e.trim();
                      n ? x(n) : i.isAssignee ? S() : A();
                    });
                  });
                var I = (i.claim = function () {
                  var e = i.$root.authentication.name;
                  (i.submitInProgress = !0),
                    l.claim(i.task.id, e, function (e) {
                      C.push(m),
                        C.push(function () {
                          return (i.submitInProgress = !1);
                        }),
                        L("claimed")(e);
                    });
                });
                i.$on("shortcut:claimTask", I);
                var S = (i.unclaim = function () {
                    (i.submitInProgress = !0),
                      l.unclaim(i.task.id, function (e) {
                        C.push(m),
                          C.push(function () {
                            return (i.submitInProgress = !1);
                          }),
                          L("unclaimed")(e);
                      });
                  }),
                  x = (i.setAssignee = function (e) {
                    l.assignee(i.task.id, e, function (e) {
                      C.push(m), L("assigned")(e);
                    });
                  }),
                  A = (i.resetAssignee = function () {
                    l.assignee(i.task.id, null, function (e) {
                      C.push(m), L("assigneeReseted")(e);
                    });
                  });
                (i.hasAssignee = function () {
                  var e;
                  return (
                    null !=
                    (null === (e = i.task) || void 0 === e
                      ? void 0
                      : e.assignee)
                  );
                }),
                  (i.editGroups = function () {
                    var n;
                    function r() {
                      n
                        ? (u.set("taskId", { taskId: i.task.id }),
                          u.changed("taskList"),
                          T.push(function () {
                            t(function () {
                              document.querySelector(".meta .groups a").focus();
                            });
                          }))
                        : document.querySelector(".meta .groups a").focus();
                    }
                    e.open({
                      scope: i,
                      windowClass: "filter-edit-modal",
                      template: a,
                      controller: "camGroupEditModalCtrl",
                      resolve: {
                        taskMetaData: function () {
                          return u;
                        },
                        groupsChanged: function () {
                          return function () {
                            n = !0;
                          };
                        },
                        errorHandler: function () {
                          return i.errorHandler;
                        },
                      },
                    }).result.then(r, r);
                  });
                var T = [];
                i.$watch("groupNames", function () {
                  T.forEach(function (e) {
                    e();
                  }),
                    (T = []);
                });
                var C = [];
                function L(e) {
                  var t = _[e];
                  return function (e) {
                    if (e) return d(t.error, e);
                    p();
                  };
                }
                i.$watch("assignee", function () {
                  C.forEach(function (e) {
                    t(e);
                  }),
                    (C = []);
                });
              },
            };
          },
        ];
      },
      15505: function (e, t, n) {
        "use strict";
        n(67559), n(56806), n(92695);
        var i = n(11250),
          a = n(43909);
        e.exports = [
          function () {
            return {
              restrict: "A",
              scope: { tasklistData: "=" },
              template: i,
              controller: [
                "$scope",
                "$q",
                "$location",
                "$translate",
                "$interval",
                "camAPI",
                "Notifications",
                "Views",
                "search",
                "Uri",
                function (e, t, n, i, r, o, s, l, c, u) {
                  var d = (e.taskData = e.tasklistData.newChild(e));
                  function p(t) {
                    var i;
                    if (t) {
                      var a = "",
                        r = "",
                        o =
                          null === (i = n.search()) || void 0 === i
                            ? void 0
                            : i.rootElement;
                      if (t.processInstanceId)
                        (a = "process-instance"), (r = t.processInstanceId);
                      else {
                        if (!t.caseInstanceId)
                          return void (e.instanceLink = void 0);
                        (a = "case-instance"), (r = t.caseInstanceId);
                      }
                      var s = u.appUri(
                        "cockpitbase://:engine/#/" + a + "/" + r
                      );
                      o && (s += "/runtime?rootElement=" + o),
                        (e.instanceLink = s);
                    } else e.instanceLink = void 0;
                  }
                  function f(t, n) {
                    i(t)
                      .then(function (t) {
                        s.addError({
                          status: t,
                          message: n ? n.message : "",
                          exclusive: !0,
                          scope: e,
                        });
                      })
                      .catch(a.noop);
                  }
                  function h(e) {
                    if (e) {
                      if (
                        -1 !== e.indexOf("task is null") ||
                        -1 !== e.indexOf("No matching task")
                      )
                        return "TASK_NOT_EXIST";
                      if (-1 !== e.indexOf("is suspended"))
                        return "INSTANCE_SUSPENDED";
                      if (-1 !== e.indexOf("submission prevented"))
                        return "SUBMISSION_PREVENTED";
                    }
                    return e;
                  }
                  function v(e) {
                    if (e) {
                      var t = n.search() || {};
                      delete t.task, delete t.detailsTab, n.search(a.copy(t));
                    } else d.set("taskId", { taskId: null });
                    d.changed("taskList");
                  }
                  function m(t) {
                    var n = c().detailsTab;
                    if (t && t.length) {
                      if (n) {
                        var i = l.getProvider({
                          component: "tasklist.task.detail",
                          id: n,
                        });
                        if (i && -1 != t.indexOf(i))
                          return void (e.selectedTaskDetailTab = i);
                      }
                      c.updateSilently({ detailsTab: null }),
                        (e.selectedTaskDetailTab = t[0]);
                    }
                  }
                  (e.errorHandler = function (e, t) {
                    var n = h(t.message);
                    if ("TASK_NOT_EXIST" === n || "INSTANCE_SUSPENDED" === n)
                      return i(n)
                        .then(function (n) {
                          (t.message = n), f(e, t), v(!0);
                        })
                        .catch(a.noop);
                    "SUBMISSION_PREVENTED" !== n && f(e, t);
                  }),
                    e.$watch("taskState.$error", function (e) {
                      e && (f(h(e.message), e), v(!1));
                    }),
                    d.provide("assignee", [
                      "task",
                      function (e) {
                        if (e && e._embedded && e._embedded.identityLink)
                          for (
                            var t = 0;
                            t < e._embedded.identityLink.length;
                            t++
                          )
                            if ("assignee" === e._embedded.identityLink[t].type)
                              return e._embedded.identityLink[t]._embedded.user
                                ? e._embedded.identityLink[t]._embedded.user[0]
                                : { id: e._embedded.identityLink[t].userId };
                        return null;
                      },
                    ]),
                    d.provide("groups", [
                      "task",
                      function (e) {
                        var t = [];
                        if (e && e._embedded && e._embedded.identityLink)
                          for (
                            var n = 0;
                            n < e._embedded.identityLink.length;
                            n++
                          )
                            "candidate" === e._embedded.identityLink[n].type &&
                              null !== e._embedded.identityLink[n].groupId &&
                              (e._embedded.identityLink[n]._embedded.group
                                ? t.push(
                                    e._embedded.identityLink[n]._embedded
                                      .group[0]
                                  )
                                : t.push({
                                    id: e._embedded.identityLink[n].groupId,
                                  }));
                        return t;
                      },
                    ]),
                    d.provide("isAssignee", [
                      "assignee",
                      function (t) {
                        return !!t && t.id === e.$root.authentication.name;
                      },
                    ]),
                    d.provide("processDefinition", [
                      "task",
                      function (e) {
                        return e && e._embedded && e._embedded.processDefinition
                          ? e._embedded.processDefinition[0]
                          : null;
                      },
                    ]),
                    d.provide("caseDefinition", [
                      "task",
                      function (e) {
                        return e && e._embedded && e._embedded.caseDefinition
                          ? e._embedded.caseDefinition[0]
                          : null;
                      },
                    ]),
                    (e.taskState = d.observe("task", function (t) {
                      var n = e.task;
                      (e.task = t), t && p(t);
                      var i = e.selectedTaskDetailTab;
                      (null == n ? void 0 : n.id) !==
                        (null == t ? void 0 : t.id) &&
                        i.pluginPoint &&
                        e.selectTaskDetailTab(a.copy(i));
                    })),
                    e.$on("$locationChangeSuccess", function () {
                      p(e.task);
                    }),
                    d.observe("isAssignee", function (t) {
                      e.isAssignee = t;
                    }),
                    (e.taskVars = {
                      read: ["task", "taskData", "errorHandler"],
                    }),
                    (e.taskDetailTabs = l.getProviders({
                      component: "tasklist.task.detail",
                    })),
                    (e.selectedTaskDetailTab = e.taskDetailTabs[0]),
                    (e.selectTaskDetailTab = function (t) {
                      e.taskExists &&
                        ((e.selectedTaskDetailTab = t),
                        c.updateSilently({ detailsTab: t.id }));
                    }),
                    m(e.taskDetailTabs),
                    e.$on("$routeChanged", function () {
                      m(e.taskDetailTabs);
                    });
                  var g = o.resource("task");
                  (e.taskExists = !1),
                    e.$watch("task.id", function (t) {
                      e.taskExists = !!t;
                    }),
                    (e.dismissTask = function () {
                      v(!0);
                    }),
                    e.$on("refresh", function () {
                      e.task &&
                        e.taskExists &&
                        g.get(e.task.id, function (t) {
                          t &&
                            404 === t.status &&
                            ((e.taskExists = !1), e.$broadcast("taskremoved"));
                        });
                    });
                },
              ],
            };
          },
        ];
      },
      22322: function (e, t, n) {
        "use strict";
        n(67559);
        var i = n(43909),
          a = n(15505),
          r = n(36686),
          o = n(57741),
          s = n(29791),
          l = n(49807),
          c = n(24101),
          u = n(36030),
          d = n(69671),
          p = n(75800),
          f = n(87111),
          h = n(74067),
          v = n(39965);
        n(6978), n(3154);
        var m = i.module("cam.tasklist.task", [
          v.name,
          "ui.bootstrap",
          "cam.tasklist.form",
          "angularMoment",
        ]);
        m.directive("camTasklistTask", a),
          m.directive("camTasklistTaskMeta", r),
          m.controller("camTaskActionCtrl", o),
          m.controller("camTaskGroupsCtrl", s),
          m.config(l),
          m.config(c),
          m.config(u),
          m.config(d),
          m.config(p),
          m.controller("camCommentCreateModalCtrl", f),
          m.controller("camGroupEditModalCtrl", h),
          (e.exports = m);
      },
      74067: function (e) {
        "use strict";
        e.exports = [
          "$scope",
          "taskMetaData",
          "groupsChanged",
          function (e, t, n) {
            (e.taskGroupsData = t.newChild(e)),
              (e.groupsChanged = n || function () {}),
              e.$on("$locationChangeSuccess", function () {
                e.$dismiss();
              });
          },
        ];
      },
      75800: function (e, t, n) {
        "use strict";
        var i = n(47728),
          a = n(40145),
          r = [
            "$scope",
            "$uibModal",
            function (e, t) {
              var n = e.taskData.newChild(e);
              n.observe("task", function (t) {
                e.task = t;
              }),
                (e.createComment = function () {
                  t.open({
                    scope: e,
                    windowClass: "filter-edit-modal",
                    size: "lg",
                    template: a,
                    controller: "camCommentCreateModalCtrl",
                    resolve: {
                      task: function () {
                        return e.task;
                      },
                    },
                  }).result.then(
                    function () {
                      n.changed("task"),
                        document.querySelector(".createCommentLink").focus();
                    },
                    function () {
                      document.querySelector(".createCommentLink").focus();
                    }
                  );
                });
            },
          ],
          o = function (e) {
            e.registerDefaultView("tasklist.task.action", {
              id: "task-action-comment",
              template: i,
              controller: r,
              priority: 100,
            });
          };
        (o.$inject = ["ViewsProvider"]), (e.exports = o);
      },
      87111: function (e, t, n) {
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
        function r(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? a(Object(n), !0).forEach(function (t) {
                  o(e, t, n[t]);
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
        function o(e, t, n) {
          var a;
          return (
            (a = (function (e, t) {
              if ("object" != i(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(e, t || "default");
                if ("object" != i(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string")),
            (t = "symbol" == i(a) ? a : String(a)) in e
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
          n(553),
          n(54363),
          n(84392),
          (e.exports = [
            "$scope",
            "$translate",
            "Notifications",
            "camAPI",
            "task",
            "configuration",
            function (e, t, n, i, a, o) {
              var s = i.resource("task");
              (e.comment = { message: "" }),
                e.$on("$locationChangeSuccess", function () {
                  e.$dismiss();
                }),
                (e.submit = function () {
                  var i = { message: e.comment.message };
                  o.getAssignProcessInstanceIdToTaskComment() &&
                    a.processInstanceId &&
                    (i = r(
                      r({}, i),
                      {},
                      { processInstanceId: a.processInstanceId }
                    )),
                    s.createComment(a.id, i, function (i) {
                      if (i)
                        return (function (i, a) {
                          t(i)
                            .then(function (t) {
                              n.addError({
                                status: t,
                                message: a ? a.message : "",
                                exclusive: !0,
                                scope: e,
                              });
                            })
                            .catch(function () {});
                        })("COMMENT_SAVE_ERROR", i);
                      e.$close();
                    });
                });
            },
          ]);
      },
      69671: function (e, t, n) {
        "use strict";
        var i = n(69836),
          a = ["$scope", function () {}],
          r = function (e) {
            e.registerDefaultView("tasklist.task.detail", {
              id: "task-detail-description",
              label: "DESCRIPTION",
              template: i,
              controller: a,
              priority: 100,
            });
          };
        (r.$inject = ["ViewsProvider"]), (e.exports = r);
      },
      36030: function (e, t, n) {
        "use strict";
        var i = n(47322),
          a = [
            "$scope",
            "$q",
            "camAPI",
            function (e, t, n) {
              var i = n.resource("process-definition"),
                a = n.resource("case-definition"),
                o = e.taskData.newChild(e);
              o.provide("xml", [
                "processDefinition",
                "caseDefinition",
                function (e, n) {
                  return e || n
                    ? e
                      ? r(t, i, e)
                          .then(function (e) {
                            return e.bpmn20Xml;
                          })
                          .catch(function () {})
                      : r(t, a, n)
                          .then(function (e) {
                            return e.cmmnXml;
                          })
                          .catch(function () {})
                    : t.when(null);
                },
              ]),
                o.provide("diagram", [
                  "xml",
                  "task",
                  "caseDefinition",
                  "processDefinition",
                  function (e, t, n, i) {
                    return { xml: e, task: t, definition: i || n };
                  },
                ]),
                o.observe("processDefinition", function (t) {
                  e.processDefinition = t;
                }),
                o.observe("caseDefinition", function (t) {
                  e.caseDefinition = t;
                }),
                (e.diagramState = o.observe("diagram", function (t) {
                  e.diagram = t;
                })),
                (e.control = {}),
                (e.highlightTask = function () {
                  e.control.scrollToElement(e.diagram.task.taskDefinitionKey),
                    e.control.highlight(e.diagram.task.taskDefinitionKey);
                });
            },
          ];
        function r(e, t, n) {
          var i = e.defer();
          return (
            t.xml(n, function (e, t) {
              e ? i.reject(e) : i.resolve(t);
            }),
            i.promise
          );
        }
        var o = function (e) {
          e.registerDefaultView("tasklist.task.detail", {
            id: "task-detail-diagram",
            label: "DIAGRAM",
            template: i,
            controller: a,
            priority: 600,
          });
        };
        (o.$inject = ["ViewsProvider"]), (e.exports = o);
      },
      49807: function (e, t, n) {
        "use strict";
        n(56806), n(92695);
        var i = n(13901),
          a = n(43909),
          r = {
            hideCompleteButton: !1,
            hideLoadVariablesButton: !1,
            disableCompleteButton: !1,
            disableForm: !1,
            disableAddVariableButton: !1,
          },
          o = [
            "$scope",
            "$location",
            "$q",
            "camAPI",
            "assignNotification",
            function (e, t, n, i, o) {
              e.loadingState = "LOADING";
              var s = i.resource("task"),
                l = e.errorHandler;
              e.options = a.copy(r);
              var c = e.taskData.newChild(e);
              c.provide("taskForm", [
                "task",
                function (t) {
                  var i = n.defer();
                  return t.id === e.task.id && e.taskForm
                    ? (i.resolve(a.copy(e.taskForm)), i.promise)
                    : ((e.loadingState = "LOADING"),
                      t && t.id
                        ? (s.form(t.id, function (t, n) {
                            t
                              ? ((e.loadingState = "ERROR"), i.reject(t))
                              : ((e.loadingState = "DONE"), i.resolve(n));
                          }),
                          i.promise)
                        : ((e.loadingState = "ERROR"), i.resolve(null)));
                },
              ]),
                c.observe([
                  "task",
                  "isAssignee",
                  function (t, n) {
                    t && t.id
                      ? (t.id !== e.task.id && (e.options = a.copy(r)),
                        (e.params = {
                          taskId: t.id,
                          caseDefinitionId: t.caseDefinitionId,
                          caseInstanceId: t.caseInstanceId,
                          processDefinitionId: t.processDefinitionId,
                          processInstanceId: t.processInstanceId,
                        }))
                      : (e.params = null),
                      (e.options.disableCompleteButton = !n),
                      (e.options.disableForm = !n),
                      (e.options.disableAddVariableButton = !n);
                  },
                ]),
                c.observe("taskForm", function (t) {
                  a.equals(t, e.taskForm) || (e.taskForm = a.copy(t));
                }),
                (e.completionCallback = function (n) {
                  if (n) return l("COMPLETE_ERROR", n);
                  var i;
                  e.task.processInstanceId
                    ? o({
                        assignee: e.task.assignee,
                        processInstanceId: e.task.processInstanceId,
                        maxResults: 15,
                      })
                    : e.task.caseInstanceId &&
                      o({
                        assignee: e.task.assignee,
                        caseInstanceId: e.task.caseInstanceId,
                        maxResults: 15,
                      }),
                    delete (i = t.search()).task,
                    delete i.detailsTab,
                    t.search(i),
                    c.changed("taskList");
                });
            },
          ],
          s = function (e) {
            e.registerDefaultView("tasklist.task.detail", {
              id: "task-detail-form",
              label: "FORM",
              template: i,
              controller: o,
              priority: 1e3,
            });
          };
        (s.$inject = ["ViewsProvider"]), (e.exports = s);
      },
      24101: function (e, t, n) {
        "use strict";
        var i = n(66905),
          a = n(25447),
          r = n(40271),
          o = function (e, t) {
            var n = a.grep(e, function (e) {
              return (
                r(e.date, r.ISO_8601).format("YYYY-MM-DD") ===
                r(t, r.ISO_8601).format("YYYY-MM-DD")
              );
            });
            return n.length > 0
              ? n[0]
              : ((n = { date: t, events: [] }), e.push(n), n);
          },
          s = function (e, t) {
            var n = a.grep(e, function (e) {
              return e.operationId === t.operationId;
            });
            return n.length > 0
              ? n[0]
              : ((n = {
                  time: t.timestamp,
                  type: t.operationType,
                  operationId: t.operationId,
                  userId: t.userId,
                  subEvents: [],
                }),
                e.push(n),
                n);
          };
        var l = [
            "$scope",
            "camAPI",
            "$q",
            function (e, t, n) {
              var i = t.resource("history"),
                a = t.resource("task"),
                r = e.taskData.newChild(e),
                l = (e.pages = { size: 50, total: 0, current: 1 });
              (e.onPaginationChange = function () {
                r.changed("history");
              }),
                r.provide("history", [
                  "task",
                  function (e) {
                    var t = n.defer();
                    return e
                      ? (i.userOperationCount(
                          { taskId: e.id },
                          function (e, t) {
                            if (e) throw e;
                            l.total = t.count;
                          }
                        ),
                        i.userOperation(
                          {
                            taskId: e.id,
                            maxResults: l.size,
                            firstResult: l.size * (l.current - 1),
                          },
                          function (e, n) {
                            e ? t.reject(e) : t.resolve(n);
                          }
                        ),
                        t.promise)
                      : t.resolve(null);
                  },
                ]),
                r.provide("comments", [
                  "task",
                  function (e) {
                    var t = n.defer();
                    return e
                      ? a.comments(e.id).catch(function () {})
                      : t.resolve(null);
                  },
                ]),
                r.provide("orderedHistoryAndCommentsByDay", [
                  "history",
                  "comments",
                  function (e, t) {
                    (e = e || {}), (t = t || {});
                    for (var n, i, a, r, l = [], c = 0; (i = e[c]); c++) {
                      n = o(l, i.timestamp);
                      var u = s(n.events, i);
                      (a = i.property),
                        -1 !== ["dueDate", "followUpDate"].indexOf(a) &&
                          ((i.propertyIsDate = !0),
                          (i.newValue = i.newValue
                            ? parseInt(i.newValue, 10)
                            : null),
                          (i.orgValue = i.orgValue
                            ? parseInt(i.orgValue, 10)
                            : null)),
                        u.subEvents.push(i);
                    }
                    for (c = 0, n = null; (r = t[c]); c++)
                      (n = o(l, r.time)),
                        (r.type = "Comment"),
                        n.events.push(r);
                    return l;
                  },
                ]),
                (e.state = r.observe(
                  "orderedHistoryAndCommentsByDay",
                  function (t) {
                    e.days = t;
                  }
                ));
            },
          ],
          c = function (e) {
            e.registerDefaultView("tasklist.task.detail", {
              id: "task-detail-history",
              label: "HISTORY",
              template: i,
              controller: l,
              priority: 800,
            });
          };
        (c.$inject = ["ViewsProvider"]), (e.exports = c);
      },
      66771: function (e) {
        "use strict";
        e.exports = [
          "$scope",
          "Views",
          function (e, t) {
            (e.tasklistVars = { read: ["tasklistData"] }),
              (e.tasklistPlugins = t.getProviders({
                component: "tasklist.list",
              })),
              (e.tasklistHeaderPlugins = t.getProviders({
                component: "tasklist.header",
              }));
          },
        ];
      },
      32505: function (e, t, n) {
        "use strict";
        n(67762), n(84392), n(56806), n(92695), n(66893), n(8703);
        var i = n(15311),
          a = n(43909),
          r = n(25447);
        e.exports = [
          function () {
            return {
              restrict: "A",
              scope: { tasklistData: "=" },
              template: i,
              controller: [
                "$element",
                "$scope",
                "$location",
                "search",
                "Views",
                "$timeout",
                "Notifications",
                function (e, t, n, i, o, s, l) {
                  function c(e) {
                    i.updateSilently(e);
                  }
                  function u() {
                    d.set("taskId", { taskId: null });
                    var e = n.search() || {};
                    (e.task = null), c(e);
                  }
                  (t.expanded = {}),
                    (t.toggle = function (e, n) {
                      (t.expanded[e] = !t.expanded[e]),
                        n && n.preventDefault && n.preventDefault(),
                        n.stopPropagation();
                    }),
                    (t.pageNum = 1),
                    (t.pageSize = null),
                    (t.totalItems = 0),
                    (t.now = new Date().toJSON()),
                    (t.filterProperties = null);
                  var d = t.tasklistData.newChild(t);
                  t.query = {};
                  var p = (t.assignees = {});
                  function f() {
                    r(".task-card-details").each(function () {
                      var e = 0;
                      r("view", this).each(function () {
                        e += this.clientHeight;
                      }),
                        e <= 20 && r(this).addClass("no-shutter");
                    });
                  }
                  var h = [];
                  (t.state = d.observe("taskList", function (e) {
                    if (e instanceof Error) throw ((t.error = e), e);
                    (t.totalItems = e.count),
                      (t.tasks = e._embedded.task),
                      e._embedded.assignee &&
                        (function (e) {
                          for (var n = 0; n < e.length; n++)
                            t.assignees[e[n].id] = e[n];
                        })(e._embedded.assignee),
                      h.push(function () {
                        s(f);
                      }),
                      h.forEach(function (e) {
                        e();
                      }),
                      (h = []),
                      (t.expanded = {});
                  })),
                    t.$on("shortcut:focusList", function () {
                      var e = document.querySelector(
                        "[cam-tasks] .tasks-list li:first-child a"
                      );
                      e && e.focus();
                    }),
                    (t.assigneeDisplayedName = function (e) {
                      var t = p[e.assignee] || {},
                        n = t.firstName || t.lastName;
                      return n
                        ? (t.firstName || "") + " " + (t.lastName || "")
                        : p[e.assignee] && n
                        ? "&lt;nobody&gt;"
                        : e.assignee;
                    }),
                    (t.hasAssignee = function (e) {
                      return null != e.assignee;
                    }),
                    d.observe("taskListQuery", function (e) {
                      var r = t.query;
                      if (e) {
                        var o = n.search() || {},
                          s = o.forceDisplayTask;
                        if (
                          ((t.query = a.copy(e)),
                          (t.pageSize = t.query.maxResults),
                          (t.pageNum = t.query.firstResult / t.pageSize + 1),
                          s)
                        )
                          return (
                            l.clearAll(),
                            delete o.forceDisplayTask,
                            i.updateSilently(o)
                          );
                        r.id && r.id !== e.id && u();
                      } else a.equals(r, {}) || u();
                    }),
                    d.observe("taskId", function (e) {
                      t.currentTaskId = e.taskId;
                    }),
                    d.observe([
                      "currentFilter",
                      function (e) {
                        e &&
                          (t.filterProperties =
                            null !== e ? e.properties : null);
                      },
                    ]),
                    (t.focus = function (e, i) {
                      e && e.preventDefault();
                      var a = i.id;
                      d.set("taskId", { taskId: a }), (t.currentTaskId = a);
                      var r = n.search() || {};
                      (r.task = a), c(r);
                      var o = document.querySelector(
                        '[cam-tasks] .tasks-list .task [href*="#/?task=' +
                          a +
                          '"]'
                      );
                      o && o.focus();
                    });
                  (t.handleKeydown = function (e) {
                    40 === e.keyCode
                      ? (e.preventDefault(),
                        (function () {
                          for (var e = 0; e < t.tasks.length - 1; e++)
                            if (t.tasks[e].id === t.currentTaskId)
                              return t.focus(null, t.tasks[e + 1]);
                          t.pageNum < Math.ceil(t.totalItems / t.pageSize) &&
                            (t.pageNum++,
                            t.pageChange(),
                            h.push(function () {
                              s(function () {
                                t.focus(null, t.tasks[0]);
                              });
                            }));
                        })())
                      : 38 === e.keyCode &&
                        (e.preventDefault(),
                        (function () {
                          for (var e = 1; e < t.tasks.length; e++)
                            if (t.tasks[e].id === t.currentTaskId)
                              return t.focus(null, t.tasks[e - 1]);
                          t.pageNum > 1 &&
                            (t.pageNum--,
                            t.pageChange(),
                            h.push(function () {
                              s(function () {
                                t.focus(null, t.tasks[t.tasks.length - 1]);
                              });
                            }));
                        })()),
                      s(function () {
                        var t = r(e.target).find("li.active")[0];
                        t && t.scrollIntoView(!1);
                      });
                  }),
                    (t.getHrefUrl = function (e) {
                      var t = "#/?task=" + e.id,
                        i = n.search().detailsTab;
                      return i && (t = t + "&detailsTab=" + i), t;
                    }),
                    (t.cardPluginVars = { read: ["task", "filterProperties"] }),
                    (t.cardPlugins = o.getProviders({
                      component: "tasklist.card",
                    })),
                    (t.pageChange = function () {
                      c({ page: t.pageNum }), d.changed("taskListQuery");
                    }),
                    (t.resetPage = function () {
                      c({ page: 1 }), d.changed("taskListQuery");
                    });
                },
              ],
            };
          },
        ];
      },
      98342: function (e, t, n) {
        "use strict";
        var i = n(43909),
          a = n(66771),
          r = n(32505),
          o = n(88800),
          s = i.module("cam.tasklist.tasklist", ["ui.bootstrap"]);
        s.controller("camListCtrl", a),
          s.directive("camTasks", r),
          s.config(o),
          (e.exports = s);
      },
      88800: function (e, t, n) {
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
          n(67559),
          n(84392),
          n(56806),
          n(31083),
          n(92695),
          n(42919),
          n(66893);
        var a = n(29443),
          r = n(23972),
          o = n(43909),
          s = n(40271),
          l = /^[\s]*([#$]){/,
          c =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/,
          u = r,
          d = function (e) {
            return (
              !!e.basic ||
              (function (e, t, n) {
                return ("like" !== t.toLowerCase() &&
                  "notlike" !== t.toLowerCase()) ||
                  /(%)|(_)/.test(e.replace(/(\\%)|(\\_)/g, ""))
                  ? "In" === t
                    ? e.split(",")
                    : n.allowDates && c.test(e)
                    ? s(e, s.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
                    : e
                  : "%" + e + "%";
              })(
                ((t = e.value.value),
                e.enforceString
                  ? "" + t
                  : isNaN(t) || "" === t.trim()
                  ? "true" === t ||
                    ("false" !== t &&
                      ("NULL" === t
                        ? null
                        : 0 === t.indexOf("'") &&
                          t.lastIndexOf("'") === t.length - 1
                        ? t.substr(1, t.length - 2)
                        : t))
                  : +t),
                e.operator.value.key,
                e
              )
            );
            var t;
          },
          p = [
            "$scope",
            "$translate",
            "$location",
            function (e, t, n) {
              (e.searches = []),
                (e.translations = {}),
                (e.matchAny = n.search().searchOrQuery || !1),
                (e.translations = u.tooltips),
                (e.types = u.types),
                (e.operators = u.operators);
              var a = e.tasklistData.newChild(e);
              e.$watch(
                "[searches, matchAny]",
                function () {
                  var t,
                    n = {};
                  !0 === e.matchAny
                    ? ((n.orQueries = [{}]),
                      ((t = n.orQueries[0]).processVariables = []),
                      (t.taskVariables = []),
                      (t.caseInstanceVariables = []))
                    : ((n.processVariables = []),
                      (n.taskVariables = []),
                      (n.caseInstanceVariables = []),
                      (t = n)),
                    o.forEach(e.searches, function (e) {
                      var n, a, r, o;
                      "object" === i(t[e.type.value.key])
                        ? t[e.type.value.key].push({
                            name:
                              "object" === i(e.name.value)
                                ? e.name.value.key
                                : e.name.value,
                            operator: e.operator.value.key,
                            value: d(e),
                          })
                        : (t[
                            ((n = e.type.value.key),
                            (a = e.operator.value.key),
                            (r = e.value.value),
                            (o = n),
                            -1 !== ["Like", "Before", "After"].indexOf(a) &&
                              (o += a),
                            l.test(r) &&
                              -1 !==
                                [
                                  "assignee",
                                  "owner",
                                  "candidateGroup",
                                  "candidateUser",
                                  "involvedUser",
                                  "processInstanceBusinessKey",
                                ].indexOf(n) &&
                              (o += "Expression"),
                            "priority" === n &&
                              "eq" !== a &&
                              (o = a + "Priority"),
                            o)
                          ] = d(e));
                    }),
                    !1 === e.matchAny && delete n.orQueries,
                    a.set("searchQuery", n);
                },
                !0
              ),
                a.observe("currentFilter", function (t) {
                  o.forEach(e.types, function (e) {
                    e.potentialNames = [];
                    for (
                      var n = 0;
                      n <
                      (t &&
                        t.properties &&
                        t.properties.variables &&
                        t.properties.variables.length);
                      n++
                    ) {
                      var i = t.properties.variables[n];
                      e.potentialNames.push({
                        key: i.name,
                        value: i.label + " (" + i.name + ")",
                      });
                    }
                  }),
                    o.forEach(e.searches, function (t) {
                      t.potentialNames = e.types.filter(function (e) {
                        return e.id.key === t.type.value.key;
                      })[0].potentialNames;
                    });
                }),
                a.observe("taskList", function (t) {
                  e.totalItems = t.count;
                });
            },
          ],
          f = function (e) {
            e.registerDefaultView("tasklist.list", {
              id: "task-search",
              template: a,
              controller: p,
              priority: 100,
            });
          };
        (f.$inject = ["ViewsProvider"]), (e.exports = f);
      },
      1871: function (e, t, n) {
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
        function a(e) {
          var t = r(e);
          return n(t);
        }
        function r(e) {
          if (!n.o(i, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          }
          return i[e];
        }
        (a.keys = function () {
          return Object.keys(i);
        }),
          (a.resolve = r),
          (e.exports = a),
          (a.id = 35358);
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
          '<div class="container-fluid">\n  <div class="row">\n    <div id="footer-timezone" class="col-xs-6">\n      {{ \'CAM_WIDGET_FOOTER_TIMEZONE\' | translate }} <i>{{timezoneName}}</i>\n    </div>\n    <div class="col-xs-6">\n      {{ \'CAM_WIDGET_FOOTER_POWERED_BY\' | translate }} <a href="https://www.clevercouncil.com/">Celever Platform</a> /\n      <span class="version">{{version}}</span>\n    </div>\n  </div>\n</div>\n';
      },
      57752: function (e) {
        "use strict";
        e.exports =
          '<div ng-if="isEntrepriseEdition" class="ce-eol-banner"\n     ng-bind-html="trustAsHtml(\'BANNER_CE_EOL_TEXT\' | translate)">\n</div>\n\n<div class="navbar-header">\n  <button type="button"\n          class="navbar-toggle"\n          ng-class="{open: !!navbarOpen}"\n          ng-click="navbarOpen = !navbarOpen">\n    <em class="sr-only">{{ toggleNavigation }}</em>\n    <span></span>\n    <span></span>\n    <span></span>\n  </button>\n\n  <a class="navbar-brand app-banner"\n     ng-if="authentication.name"\n     href="#/"\n     title="{{ brandName }} {{ appName }}">\n     <span ng-bind-html="logo" class="brand-logo"></span>\n     <span class="brand-name" ng-cloak>{{ brandName }}</span>\n  </a>\n\n  <div class="small-screen-warning">\n    <span class="glyphicon glyphicon-exclamation-sign"\n          uib-tooltip="{{ smallScreenWarning | translate }}"\n          tooltip-placement="bottom"></span>\n  </div>\n</div>\n\n<nav class="cam-nav app-menu">\n  <ul ng-class="{collapse: !navbarOpen}">\n\n    <li engine-select></li>\n\n    <li class="account dropdown"\n        ng-if="authentication.name"\n        ng-cloak\n        uib-dropdown>\n      <a href\n         class="dropdown-toggle"\n         uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-user "></span>\n        {{ (userName || authentication.name) }}\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li class="profile"\n            ng-if="currentApp !== \'welcome\'">\n          <a ng-href="{{ \'../../welcome/:engine/\' | uri }}">\n            {{ myProfile | translate }}\n          </a>\n        </li>\n\n        <li class="divider"\n            ng-if="currentApp !== \'welcome\'"></li>\n\n        <li class="logout">\n          <a href\n             ng-click="logout()">\n            {{ signOut | translate }}\n          </a>\n        </li>\n      </ul>\n    </li>\n\n    <li class="divider-vertical"\n        ng-if="authentication.name"\n        ng-cloak></li>\n\n    <li class="app-switch dropdown"\n        ng-if="showAppDropDown"\n        uib-dropdown>\n      <a href\n         class="dropdown-toggle"\n         uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-home"></span>\n        <span class="caret"></span>\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li ng-repeat="(appName, app) in apps"\n            ng-class="appName">\n          <a ng-href="{{ (\':appRoot/app/\' + appName + \'/:engine/\' | uri) + getTargetRoute() }}">\n            {{ app.label }}\n          </a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n</nav>\n\n<div ng-transclude\n     class="sections-menu"\n     ng-class="{collapse: !navbarOpen}"></div>\n';
      },
      46152: function (e) {
        "use strict";
        e.exports =
          ' <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42"/><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42"/><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42"/><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF"/></svg>';
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
      93113: function (e) {
        "use strict";
        e.exports =
          '<div ng-form class="form-horizontal" name="filterCriteriaForm" role="form">\n\n  <div class="row labels-left">\n    <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n      <a ng-click="addCriterion()"\n         href>\n        <span class="hidden-sm hidden-xs">{{ \'FILTER_ADD_CRITERION\' | translate }}</span>\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </a>\n    </div>\n\n    <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n      <div class="form-group" ng-show="query.length">\n        <label class="col-xs-6 control-label"\n               translate="FILTER_CRITERIA_KEY">Key</label>\n        <label class="col-xs-6 control-label"\n               translate="FILTER_CRITERIA_VALUE">Value</label>\n      </div>\n    </div>\n  </div>\n\n  <div ng-repeat="(delta, queryParam) in query" class="row" ng-if="isQueryParameter(queryParam)" ng-init="clearKey(queryParam)">\n\n    <div ng-form name="criteriaFieldForm">\n      <div ng-init="addForm(this.criteriaFieldForm)"></div>\n\n      <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n        <a ng-click="removeCriterion(delta)"\n           href>\n          <span class="hidden-sm hidden-xs">{{ \'FILTER_REMOVE_CRITERION\' | translate }}</span>\n          <span class="glyphicon glyphicon-remove-sign"></span>\n        </a>\n      </div>\n\n      <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n        <div class="form-group">\n\n          <div class="col-xs-6">\n\n            <select class="form-control"\n                    ng-model="queryParam.key"\n                    name="queryParamKey"\n                    ng-change="valueChanged(queryParam, this.criteriaFieldForm.queryParamValue)"\n                    cam-unique-value="{{ getQueryParamKeys() }}"\n                    required\n                    ng-disabled="filter.id && !accesses.update">\n              <optgroup ng-repeat="criteriaGroup in criteria"\n                        label="{{ criteriaGroup.group | translate }}">\n\n                <option ng-repeat="criterion in criteriaGroup.options"\n                        ng-selected="criterion.name === getCriterionName(queryParam.key)"\n                        ng-value="criterion.name">\n\n                  {{ criterion.label | translate }}\n                  {{ (criterion.expressionSupport ? \'*\' : \'\') }}\n\n                </option>\n              </optgroup>\n\n            </select>\n            <div ng-if="this.criteriaFieldForm.queryParamKey.$invalid && this.criteriaFieldForm.queryParamKey.$dirty"\n                    class="has-error">\n                <span ng-show="this.criteriaFieldForm.queryParamKey.$error.required" class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamKey.$error.camUniqueValue" class="help-block">\n                  {{ \'REQUIRE_UNIQUE_KEY\' | translate }}\n                </span>\n            </div>\n          </div>\n\n          <div class="col-xs-6">\n\n            <div ng-if="!booleanCriterion[getCriterionName(queryParam.key)]">\n              <input class="form-control"\n                     name="queryParamValue"\n                     type="text"\n                     ng-model="queryParam.value"\n                     ng-change="valueChanged(queryParam, this.criteriaFieldForm.queryParamValue)"\n                     required\n                     ng-readonly="filter.id && !accesses.update"\n                     ng-disabled="filter.id && !accesses.update" />\n              <span class="help-block text-help"\n                    ng-show="isCriteriaHelpAvailable(queryParam.key)">\n                {{ getCriteriaHelp(queryParam.key) | translate }}\n              </span>\n\n              <div ng-if="this.criteriaFieldForm.queryParamValue.$invalid && this.criteriaFieldForm.queryParamValue.$dirty"\n                   class="has-error">\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.required"\n                      class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.number"\n                      class="help-block">\n                  {{ \'REQUIRED_INTEGER_FIELD\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.date"\n                      class="help-block">\n                  {{ \'INVALID_DATE\' | translate }}\n                </span>\n                <span ng-show="this.criteriaFieldForm.queryParamValue.$error.dateValue"\n                      class="help-block">\n                  {{ \'INVALID_DATE_VALUE\' | translate }}\n                </span>\n              </div>\n            </div>\n\n            <div ng-if="booleanCriterion[getCriterionName(queryParam.key)]"\n                 class="form-control-static">\n              <span class="glyphicon glyphicon-ok"></span>\n              <input type="hidden"\n                     name="queryParamValue"\n                     ng-model="queryParam.value" />\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n\n  <div ng-if="canIncludeAssignedTasks()"\n       class="row">\n    <div class="col-xs-10 col-xs-offset-2 checkbox">\n      <label>\n        <input type="checkbox"\n               class="form-control"\n               ng-model="filter.includeAssignedTasks" />\n        {{ \'FILTER_CRITERIA_INCLUDE_ASSIGNED_TASKS\' | translate }}\n      </label>\n      <div class="help-block"\n           translate="FILTER_CRITERIA_INCLUDE_ASSIGNED_TASKS_HINT"></div>\n    </div>\n  </div>\n\n  <div ng-if="query.length > 0"\n       class="row match-type">\n    <div class="col-xs-10 col-xs-offset-2">\n      <button ng-click="switchMatchType()"\n              class="btn btn-default btn-xs"\n              ng-disabled="query.length < 2"\n              type="button">\n        {{ (filter.matchType === \'all\' ? \'MATCH_TYPE_ALL\' : \'MATCH_TYPE_ANY\') | translate }}\n      </button>\n      <span ng-disabled="query.length < 2">{{ \'MATCH_TYPE\' | translate }}</span>\n    </div>\n  </div>\n</div>\n';
      },
      74800: function (e) {
        "use strict";
        e.exports =
          '<div ng-form class="form-horizontal" role="form" name="filterGeneralForm">\n\n  <div class="row">\n    <div class="col-xs-8">\n      <div class="form-group">\n\n        <label for="filterName"\n               class="col-xs-3 control-label"\n               translate="FILTER_NAME_LABEL">Name</label>\n\n        <div class="col-xs-9">\n          <input class="form-control"\n                 name="filterName"\n                 ng-model="filter.name"\n                 type="text"\n                 required\n                 placeholder="{{ \'FILTER_NAME_PLACEHOLDER\' | translate }}"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n\n          <span ng-if="this.filterGeneralForm.filterName.$invalid && this.filterGeneralForm.filterName.$dirty"\n                class="has-error">\n            <span ng-show="this.filterGeneralForm.filterName.$error.required" class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n          </span>\n\n        </div>\n\n      </div>\n    </div>\n\n    <div class="col-xs-4">\n\n      <div class="form-group">\n\n        <label for="filter-form-color"\n               class="col-xs-6 control-label"\n               translate="FILTER_COLOR_LABEL">Color</label>\n\n        <div class="col-xs-6">\n\n          <input class="form-control"\n                 name="filterColor"\n                 ng-model="filter.properties.color"\n                 ng-pattern="/^#([0-9a-f]{6}|[0-9a-f]{3})$/i"\n                 type="color"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n\n          <span ng-if="this.filterGeneralForm.filterColor.$invalid && this.filterGeneralForm.filterColor.$dirty"\n                class="has-error">\n            <span ng-show="this.filterGeneralForm.filterColor.$error.pattern" class="help-block">\n              {{ \'REQUIRED_HEX_COLOR_FIELD\' | translate }}\n            </span>\n          </span>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-8">\n      <div class="form-group">\n\n        <label for="filter-form-description"\n               class="col-xs-3 control-label"\n               translate="FILTER_DESCRIPTION_LABEL">Description</label>\n\n        <div class="col-xs-9">\n          <input class="col-xs-9 form-control"\n                 name="filterDescription"\n                 ng-model="filter.properties.description"\n                 type="text"\n                 placeholder="{{ \'FILTER_DESCRIPTION_PLACEHOLDER\' | translate }}"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n        </div>\n\n      </div>\n    </div>\n\n    <div class="col-xs-4">\n      <div class="form-group">\n\n        <label for="filter-form-priority"\n               class="col-xs-6 control-label"\n               translate="FILTER_PRIORITY_LABEL">Priority</label>\n\n        <div class="col-xs-6">\n          <input class="form-control"\n                 name="filterPriority"\n                 ng-model="filter.properties.priority"\n                 ng-pattern="/^-?[\\d]+$/"\n                 type="text"\n                 ng-readonly="filter.id && !accesses.update"\n                 ng-disabled="filter.id && !accesses.update" />\n\n\n          <span ng-if="this.filterGeneralForm.filterPriority.$invalid && this.filterGeneralForm.filterPriority.$dirty"\n                class="has-error">\n            <span ng-show="this.filterGeneralForm.filterPriority.$error.pattern" class="help-block">\n              {{ \'REQUIRED_INTEGER_FIELD\' | translate }}\n            </span>\n          </span>\n\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-offset-2 col-md-offset-10 col-xs-4 col-md-2 checkbox">\n      <label>\n        <input class="form-control"\n               name="filterRefresh"\n               ng-model="filter.properties.refresh"\n               type="checkbox"\n               tooltip-append-to-body="false"\n               uib-tooltip="{{ \'FILTER_REFRESH_TOOLTIP\' | translate }}"\n               ng-disabled="filter.id && !accesses.update" />\n        {{ \'FILTER_REFRESH_LABEL\' | translate }}\n      </label>\n    </div>\n  </div>\n\n</div>\n';
      },
      27904: function (e) {
        "use strict";
        e.exports =
          '<div ng-form class="form-horizontal" name="filterPermissionForm" role="form">\n\n  <div ng-show="!authorizationState.$loaded && !authorizationState.$error"\n       class="loader">\n    <span class="animate-spin glyphicon glyphicon-refresh"></span>\n    {{ \'LOADING\' | translate }}\n  </div>\n\n  <div ng-show="authorizationState.$error" uib-alert class="alert alert-danger" role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <strong class="status">{{ \'FAILURE\' | translate }}:</strong>\n    <span class="message">{{ \'FILTER_FORM_PERMISSIONS_LOADING_FAILURE\' | translate }}</span>\n  </div>\n\n  <div ng-show="authorizationState.$loaded && !authorizationState.$error">\n\n    <div uib-alert class="alert alert-warning">\n      <span class="glyphicon glyphicon-exclamation-sign"></span>\n      <span>{{ \'FILTER_FORM_PERMISSIONS_EDIT_HINT\' | translate }}</span>\n    </div>\n\n    <div class="global-access checkbox form-control-static"\n         ng-show="!filter.id || (filter.id && accesses.update)">\n      <label>\n        <input type="checkbox"\n               class="form-control"\n               ng-model="isGlobalReadAuthorization"\n               ng-change="globalReadAuthorizationChanged()"\n               ng-disabled="filter.id && !accesses.update" />\n         {{ \'FILTER_FORM_PERMISSIONS_GLOBAL\' | translate }}\n      </label>\n    </div>\n\n    <div class="user-read-permissions"\n         ng-show="(!filter.id || (filter.id && accesses.update)) && !isGlobalReadAuthorization">\n      <div class="form-group labels-left">\n        <div class="col-xs-2 align-right">\n          <button class="btn btn-link"\n                  ng-click="addReadPermission()"\n                  type="button"\n                  ng-disabled="disableAddButton()">\n            <span class="hidden-sm hidden-xs">{{ \'ADD_PERMISSION\' | translate }}</span>\n            <span class="glyphicon glyphicon-plus-sign"></span>\n          </button>\n        </div>\n\n        <label class="col-xs-2 control-label">\n          {{ \'FILTER_FORM_PERMISSION_GROUP_USER\' | translate }}\n        </label>\n        <label class="col-xs-8 control-label">\n          {{ \'FILTER_FORM_PERMISSION_IDENTIFIER\' | translate }}\n        </label>\n      </div>\n\n      <div class="form-group"\n           ng-repeat="auth in getReadAuthorizations(authorizations)">\n        <div class="col-xs-2 row-action"\n             ng-show="!filter.id || (filter.id && accesses.update)">\n          <button class="btn btn-link btn-remove"\n                  ng-if="!isGlobalReadAuthorization"\n                  ng-click="removeReadPermission(auth)">\n            <span class="hidden-sm hidden-xs">\n              {{ \'FILTER_FORM_PERMISSIONS_REMOVE\' | translate }}\n            </span>\n            <span class="glyphicon glyphicon-remove-sign"></span>\n          </button>\n        </div>\n\n        <div class="col-xs-2">\n          <span class="fake-button">\n            <span class="glyphicon"\n                  ng-class="\'glyphicon-\' + (!!auth.userId ? \'user\' : \'th\')"></span>\n          </span>\n        </div>\n\n        <div class="form-control-static"\n             ng-class="{ \'col-xs-8\': !filter.id || (filter.id && accesses.update) , \'col-xs-10\': !(!filter.id || (filter.id && accesses.update)) }">\n\n          {{ (auth.userId || auth.groupId) }}\n        </div>\n      </div>\x3c!-- repeat auth --\x3e\n\n      <div class="form-group new-permission"\n           ng-if="showNewPermissionFields">\n        <div class="col-xs-2 col-xs-offset-2">\n          <button class="btn btn-default"\n                  type="button"\n                  tooltip-append-to-body="false"\n                  uib-tooltip="{{ \'FILTER_FORM_PERMISSIONS_IDENTITY_TYPE_TOOLTIP\' | translate }}: {{ (newPermission.type === \'user\' ? \'FILTER_FORM_PERMISSIONS_IDENTITY_TYPE_USER\' : \'FILTER_FORM_PERMISSIONS_IDENTITY_TYPE_GROUP\') | translate }}"\n                  ng-click="switchType()"\n                  ng-disabled="isGlobalReadAuthorization">\n            <span class="glyphicon"\n                  ng-class="newPermission.type === \'user\' ? \'glyphicon-user\' : \'glyphicon-th\'"></span>\n          </button>\n        </div>\n\n        <div class="col-xs-8">\n          <input type="text"\n                 name="newPermission"\n                 placeholder="{{ (newPermission.type === \'user\' ? \'FILTER_FORM_PERMISSIONS_USER_ID\' : \'FILTER_FORM_PERMISSIONS_GROUP_ID\') | translate }}"\n                 class="form-control"\n                 ng-model="newPermission.id"\n                 ng-change="validateNewPermission()"\n                 ng-keydown="keyPressed($event)"\n                 ng-readonly="isGlobalReadAuthorization"\n                 ng-disabled="filter.id && !accesses.update" />\n\n          <div ng-if="this.filterPermissionForm.newPermission.$invalid && this.filterPermissionForm.newPermission.$dirty"\n               class="has-error">\n            <span ng-show="this.filterPermissionForm.newPermission.$error.required"\n                  class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n            <span ng-show="this.filterPermissionForm.newPermission.$error.duplicate && newPermission.type === \'user\'"\n                  class="help-block">\n              {{ \'FILTER_FORM_PERMISSIONS_DUPLICATE_USER\' | translate }}\n            </span>\n            <span ng-show="this.filterPermissionForm.newPermission.$error.duplicate && newPermission.type === \'group\'"\n                  class="help-block">\n              {{ \'FILTER_FORM_PERMISSIONS_DUPLICATE_GROUP\' | translate }}\n            </span>\n          </div>\n        </div>\n      </div>\x3c!-- new perm --\x3e\n\n      <ul uib-pagination\n\n        class="pagination-sm"\n        ng-if="pages.total > pages.size"\n\n        page="pages.current"\n        ng-model="pages.current"\n        ng-change="onPaginationChange(pages)"\n\n        total-items="pages.total"\n        items-per-page="pages.size"\n\n        max-size="7"\n        boundary-links="true"></ul>\n    </div>\n\n  </div>\n\n</div>\n';
      },
      39156: function (e) {
        "use strict";
        e.exports =
          '<div ng-form class="form-horizontal" name="filterVariableForm" role="form">\n\n  <div ng-show="variables.length > 5"\n       uib-alert class="alert alert-warning"\n       role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    {{ \'FILTER_VARIABLES_AMOUNT_WARNING\' | translate }}\n  </div>\n\n\n  <div class="row labels-left">\n    <div class="col-xs-12">\n      <div class="undefined-variable checkbox">\n        <label>\n          <input type="checkbox"\n                 class="form-control"\n                 ng-model="filter.properties.showUndefinedVariable" />\n          {{ \'FILTER_FORM_VARIABLES_SHOW_UNDEFINED\' | translate }}\n        </label>\n      </div>\n    </div>\n\n    <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n      <a ng-click="addVariable()"\n         href>\n        <span class="hidden-sm hidden-xs">{{ \'FILTER_ADD_VARIABLE\' | translate }}</span>\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </a>\n    </div>\n\n    <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n      <div class="form-group" ng-show="variables.length">\n        <label class="col-xs-6 control-label"\n               translate="FILTER_VARIABLE_NAME">Name</label>\n        <label class="col-xs-6 control-label"\n               translate="FILTER_VARIABLE_LABEL">Label</label>\n      </div>\n    </div>\n  </div>\n\n  <div ng-repeat="(delta, variable) in variables" class="row">\n\n    <div ng-form name="variableFieldForm">\n      <div ng-init="addForm(this.variableFieldForm)"></div>\n\n      <div class="col-xs-2 row-action" ng-show="!filter.id || (filter.id && accesses.update)">\n        <a ng-click="removeVariable(delta)"\n           href>\n          <span class="hidden-sm hidden-xs">{{ \'FILTER_REMOVE_VARIABLE\' | translate }}</span>\n          <span class="glyphicon glyphicon-remove-sign"></span>\n        </a>\n      </div>\n\n\n      <div ng-class="{ \'col-xs-10\': !filter.id || (filter.id && accesses.update) , \'col-xs-12\': !(!filter.id || (filter.id && accesses.update)) }">\n        <div class="form-group">\n\n          <div class="col-xs-6">\n\n            <input class="form-control"\n                   type="text"\n                   name="variableName"\n                   ng-model="variable.name"\n                   placeholder="{{ \'FILTER_VARIABLE_NAME_PLACEHOLDER\' | translate }}"\n                   required\n                   ng-readonly="filter.id && !accesses.update"\n                   ng-disabled="filter.id && !accesses.update" />\n\n              <div ng-if="this.variableFieldForm.variableName.$invalid && this.variableFieldForm.variableName.$dirty"\n                    class="has-error">\n                <span ng-show="this.variableFieldForm.variableName.$error.required" class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n              </div>\n\n          </div>\n\n          <div class="col-xs-6">\n            <input class="form-control"\n                   type="text"\n                   name="variableLabel"\n                   ng-model="variable.label"\n                   placeholder="{{ \'FILTER_VARIABLE_LABEL_PLACEHOLDER\' | translate }}"\n                   required\n                   ng-readonly="filter.id && !accesses.update"\n                   ng-disabled="filter.id && !accesses.update" />\n              <div ng-if="this.variableFieldForm.variableLabel.$invalid && this.variableFieldForm.variableLabel.$dirty"\n                    class="has-error">\n                <span ng-show="this.variableFieldForm.variableLabel.$error.required" class="help-block">\n                  {{ \'REQUIRED_FIELD\' | translate }}\n                </span>\n              </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n';
      },
      82993: function (e) {
        "use strict";
        e.exports =
          '<form name="filterForm" role="form">\n\n  <uib-accordion close-others="true">\n\n    <div uib-accordion-group is-open="group.general" class="panel-default">\n\n      <uib-accordion-heading>\n        {{ \'FILTER_FORM_BASICS\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterGeneralForm\')"></span>\n      </uib-accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_BASICS_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-general\n           filter="filter"\n           accesses="accesses">\n      </div>\n\n    </div>\n\n    <div uib-accordion-group is-open="group.criteria" class="panel-default">\n      <uib-accordion-heading>\n        {{ \'FILTER_FORM_CRITERIA\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterCriteriaForm\')"></span>\n      </uib-accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_CRITERIA_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-criteria\n           filter="filter"\n           accesses="accesses">\n      </div>\n\n    </div>\n\n    <div uib-accordion-group is-open="group.permission" class="panel-default">\n      <uib-accordion-heading>\n        {{ \'FILTER_FORM_PERMISSIONS\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterPermissionForm\')"></span>\n      </uib-accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_PERMISSIONS_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-permission\n           filter="filter"\n           accesses="accesses"\n           filter-modal-form-data="filterModalFormData"\n           is-open="group.permission">\n      </div>\n\n    </div>\n\n    <div uib-accordion-group is-open="group.variable" class="panel-default">\n      <uib-accordion-heading>\n        {{ \'FILTER_FORM_VARIABLES\' | translate }}\n        <span class="glyphicon glyphicon-exclamation-sign"\n              ng-show="showHint(\'filterVariableForm\')"></span>\n      </uib-accordion-heading>\n\n      <div class="task-filter-hint text-help">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'FILTER_FORM_VARIABLES_HINT\' | translate }}\n      </div>\n\n      <div cam-tasklist-filter-modal-form-variable\n           filter="filter"\n           accesses="accesses">\n      </div>\n\n    </div>\n\n  </uib-accordion>\n\n</form>\n\n';
      },
      18481: function (e) {
        "use strict";
        e.exports =
          '<div ng-show="!state.$loaded && !state.$error"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-show="state.$error" uib-alert class="alert alert-danger" role="alert">\n  <span class="glyphicon glyphicon-exclamation-sign"></span>\n  <strong class="status">{{ \'FAILURE\' | translate }}:</strong>\n  <span class="message">{{ \'FILTERS_LOADING_FAILURE\' | translate }}</span>\n</div>\n\n<div ng-show="state.$loaded && !state.$error"\n     class="list-unstyled">\n\n  <div ng-hide="totalItems"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_AVAILABLE_FILTER\' | translate }}\n    <div class="add-initial-filter" ng-if="userCanCreateFilter">\n      <a class="filter-hint"\n         ng-click="addAllFilter()">\n        <span class="glyphicon glyphicon-plus"></span>\n        {{ \'ADD_FILTER_HINT\' | translate }}\n      </a>\n    </div>\n  </div>\n\n  <div ng-show="totalItems"\n       ng-repeat="(delta, filter) in filters"\n       class="item task-filter cells-wrapper"\n       ng-class="{active: isFocused(filter)}"\n       ng-style="filter.style"\n       ng-click="focus(filter)">\n\n    <h4 class="name"\n        uib-tooltip="{{ filter.properties.description }}"\n        tooltip-placement="top">\n      <a href\n         ng-style="{color: filter.properties.color}">\n        {{ filter.name }}\n\n        <span ng-show="isFocused(filter)"\n              class="counter">{{ filterCount }}</span>\n      </a>\n    </h4>\n\n    <div class="actions"\n         ng-style="{visibility: isFocused(filter) ? \'visible\' : \'hidden\'}">\n      <a ng-click="openModal($event, filter)"\n         uib-tooltip="{{ \'FILTER_DETAILS\' | translate }}"\n         tooltip-placement="top"\n         href>\n        <span class="glyphicon glyphicon-pencil"></span>\n      </a>\n    </div>\n  </div>\n\n  <ul uib-pagination\n    ng-if="page.total > page.size"\n    class="pagination-sm"\n\n    page="page.current"\n    ng-model="page.current"\n    ng-change="onPaginationchange(page)"\n\n    total-items="page.total"\n    items-per-page="page.size"\n\n    max-size="3"\n    boundary-links="false"></ul>\n</div>\n';
      },
      88696: function (e) {
        "use strict";
        e.exports =
          '<div class="modal-header">\n  <h3 class="modal-title">\n    {{ (\n      filter.id && !deletion ?\n      (accesses.update ? \'FILTER_EDIT\' : \'FILTER_DETAILS\') :\n      (deletion ? \'FILTER_DELETE\' : \'FILTER_CREATE\')\n    ) | translate }}\n  </h3>\n</div>\n\n\n\n<div class="modal-body">\n\n  <div notifications-panel></div>\n\n  <div ng-show="!deletion"\n       cam-tasklist-filter-modal-form\n       filter="filter"\n       filter-modal-data="filterModalData"\n       register-is-valid-provider="registerValidationProvider"\n       register-post-filter-saved-provider="registerPostFilterSavedProvider">\n  </div>\n\n  <div ng-show="deletion"\n       uib-alert class="alert alert-warning"\n       role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    {{ \'FILTER_DELETION_WARNING\' | translate }}\n  </div>\n\n</div>\n\n\n<div class="modal-footer">\n\n  <div class="row row-action">\n\n    <div class="col-xs-4 align-left">\n\n      <button ng-show="!deletion && filter.id && accesses.delete"\n              class="btn btn-link"\n              type="button"\n              ng-click="confirmDeletion()"\n              translate="FILTER_DELETE">Delete filter</button>\n\n\n      <button ng-show="deletion"\n              class="btn btn-link"\n              type="button"\n              ng-click="abortDeletion()"\n              translate="FILTER_EDIT">Edit filter</button>\n    </div>\n\n    <div class="col-xs-8">\n      <div class="row">\n        <div class="col-xs-12">\n\n          <button class="btn btn-link"\n                  type="button"\n                  ng-click="$dismiss()"\n                  translate="CLOSE">Close</button>\n\n          <button ng-if="!deletion && (!filter.id || (filter.id && accesses.update))"\n                  class="btn btn-primary"\n                  type="submit"\n                  ng-disabled="!isValid() || submitInProgress"\n                  ng-click="submit()"\n                  translate="SAVE">Save</button>\n\n\n          <button ng-if="deletion"\n                  class="btn btn-primary"\n                  type="submit"\n                  ng-disabled="submitInProgress"\n                  ng-click="delete()"\n                  translate="DELETE">Delete</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
      },
      4669: function (e) {
        "use strict";
        e.exports =
          '<div class="form-container" ng-keypress="formKeyPressed($event)">\n</div>\n';
      },
      19272: function (e) {
        "use strict";
        e.exports =
          '<div class="text-help">\n  <span class="glyphicon glyphicon-info-sign"></span>\n  {{ EXTERNAL_FORM_NOTE | translate }}\n</div>\n\n<a ng-href="{{ externalFormUrl  }}"\n   class="external-form">\n  {{ \'EXTERNAL_FORM_LINK\' |translate }}\n  <span class="glyphicon glyphicon-folder-open"></span>\n</a>\n';
      },
      25776: function (e) {
        "use strict";
        e.exports =
          '<form name="genericForm"\n      class="form-horizontal">\n\n  <div class="form-group"\n       ng-if="showBusinessKey">\n    <label for="business-key-field"\n           translate="BUSINESS_KEY"\n           class="control-label col-xs-2">Business key</label>\n    <div class="col-xs-10">\n      <input type="text"\n            ng-readonly="readonly"\n            ng-model="businessKey"\n             id="business-key-field"\n             cam-business-key\n             class="form-control" />\n    </div>\n  </div>\n\n  <div class="form-group labels-left">\n    <div class="col-xs-2 row-action">\n      <a href\n         ng-click="addVariable()"\n         ng-disabled="options.disableAddVariableButton">\n        <span class="hidden-xs hidden-sm"\n              translate="ADD_VARIABLE">Add variable</span>\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </a>\n    </div>\n\n\n\n    <div class="col-xs-10"\n         ng-if="variables.length">\n      <div class="row">\n        <label class="control-label col-xs-4"\n               translate="NAME">Name</label>\n\n\n\n        <label class="control-label col-xs-4"\n               translate="TYPE">Type</label>\n\n\n\n        <label class="control-label col-xs-4"\n               translate="VALUE">Value</label>\n      </div>\n    </div>\n  </div>\n\n\n\n  <div ng-if="variables.length"\n       ng-repeat="(delta, variable) in variables"\n       class="form-group"\n       ng-form="repeatForm">\n\n    <div class="col-xs-2 row-action">\n      <a href\n         ng-click="removeVariable(delta)"\n         ng-if="!variable.fixedName">\n        <span class="hidden-sm hidden-xs"\n              translate="REMOVE">Remove</span>\n        <span class="glyphicon glyphicon-remove-sign"></span>\n      </a>\n    </div>\n\n\n\n    <div class="col-xs-10">\n      <div class="row">\n        <div class="col-xs-4">\n          <input required\n                 type="text"\n                 class="form-control"\n                 placeholder="{{ \'VARIABLE_NAME\' | translate }}"\n                 ng-model="variable.name"\n                 name="name"\n                 cam-unique-value="{{ getVariableNames() }}"\n                 ng-readonly="variable.fixedName || variable.readonly" />\n          <span ng-if="repeatForm.name.$invalid && repeatForm.name.$dirty" class="has-error">\n            <span ng-if="repeatForm.name.$error.required"\n                  class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n            <span ng-if="repeatForm.name.$error.camUniqueValue"\n                  class="help-block">\n              {{ \'REQUIRE_UNIQUE_NAME\' | translate }}\n            </span>\n          </span>\n        </div>\n\n\n\n        <div class="col-xs-4">\n          <select ng-disabled="!variable.name || variable.readonly"\n                  class="form-control"\n                  ng-model="variable.type">\n\n            <option disabled\n                    value=""\n                    translate="VARIABLE_TYPE">Type</option>\n\n            <option value="Boolean">Boolean</option>\n            <option value="Short">Short</option>\n            <option value="Integer">Integer</option>\n            <option value="Long">Long</option>\n            <option value="Double">Double</option>\n            <option value="String">String</option>\n            <option value="Date">Date</option>\n            <option value="Object">Object</option>\n            <option value="File">File</option>\n          </select>\n        </div>\n\n\n\n        <div class="col-xs-4"\n             ng-switch="variable.type">\n\n          <div ng-switch-when="Object">\n            <label class="control-label object-type">{{ "CAM_WIDGET_VARIABLE_DIALOG_LABEL_OBJECT_TYPE" | translate }}</label>\n            <input class="form-control"\n                   required\n                   ng-model="variable.valueInfo.objectTypeName"\n                   name="objectTypeName" />\n\n            <span ng-if="repeatForm.objectTypeName.$invalid && repeatForm.objectTypeName.$dirty" class="has-error">\n              <span ng-if="repeatForm.objectTypeName.$error.required"\n                    class="help-block">\n                {{ \'REQUIRED_FIELD\' | translate }}\n              </span>\n            </span>\n\n            <label class="control-label">{{ "CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZATION" | translate }}</label>\n            <input class="form-control"\n                   required\n                   ng-model="variable.valueInfo.serializationDataFormat"\n                   name="serializationDataFormat" />\n\n            <span ng-if="repeatForm.serializationDataFormat.$invalid && repeatForm.serializationDataFormat.$dirty" class="has-error">\n              <span ng-if="repeatForm.serializationDataFormat.$error.required"\n                    class="help-block">\n                {{ \'REQUIRED_FIELD\' | translate }}\n              </span>\n            </span>\n\n            <label class="control-label">{{ "CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZED_VALUE" | translate }}</label>\n            <textarea class="form-control"\n                   required\n                   ng-model="variable.value"\n                   name="value">\n            </textarea>\n          </div>\n\n          <input ng-switch-when="Boolean"\n                 class="form-control"\n                 type="checkbox"\n                 ng-model="variable.value"\n                 ng-checked="variable.value"\n                 cam-variable-name="{{ variable.name }}"\n                 cam-variable-type="{{ variable.type }}" />\n\n          <input ng-switch-when="File"\n                 ng-if="!variable.readonly"\n                 class="form-control"\n                 type="file"                 \n                 cam-variable-name="{{ variable.name }}"\n                 cam-variable-type="File"\n                 ng-model="variable.file" />\n\n          <a ng-switch-when="File"\n             ng-if="variable.readonly"\n             href="{{variable.downloadUrl}}"\n             class="form-control-static">\n                {{ \'DOWNLOAD\' | translate }}\n          </a>\n\n          <input ng-switch-default\n                 class="form-control"\n                 type="{{ variableTypes[variable.type] }}"\n                 required\n                 ng-model="variable.value"\n                 ng-readonly="!variable.type"\n                 name="value"\n                 cam-variable-name="{{ variable.name }}"\n                 cam-variable-type="{{ variable.type }}"\n                 placeholder="{{ \'VARIABLE_VALUE\' | translate }}" />\n\n          <span ng-if="repeatForm.value.$invalid && repeatForm.value.$dirty" class="has-error">\n            <span ng-if="repeatForm.value.$error.required"\n                  class="help-block">\n              {{ \'REQUIRED_FIELD\' | translate }}\n            </span>\n            <span ng-if="repeatForm.value.$error.camVariableType"\n                  class="help-block">\n              Only a {{ variable.type }} value is allowed\n            </span>\n          </span>\n\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="form-group"\n       ng-if="!options.hideLoadVariablesButton && !variablesLoaded">\n    <div class="col-xs-2 row-action">\n      <a href\n         ng-click="loadVariables()">\n        <span class="hidden-sm hidden-xs"\n              translate="LOAD_VARIABLES">Load Variables</span>\n        <span class="glyphicon glyphicon-download"></span>\n      </a>\n    </div>\n  </div>\n\n</form>\n';
      },
      43544: function (e) {
        "use strict";
        e.exports =
          '<div class="generic-form-fields">\n\n  <div class="text-help">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'USE_GENERIC_FORM\' | translate }}\n  </div>\n\n  <div cam-tasklist-form-generic-variables>\n  </div>\n\n</div>\n';
      },
      23744: function (e) {
        "use strict";
        e.exports =
          '<div ng-show="tasklistForm && !$loaded"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-if="tasklistForm.type"\n     ng-show="tasklistForm && $loaded"\n     ng-class="{ \'disabled-form\': options.disableForm, \'task-removed\': taskRemoved}">\n\n  <div ng-show="tasklistForm.$error" uib-alert class="alert alert-danger" role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <strong class="status">{{ \'FORM_FAILURE\' | translate }}</strong>\n    <span class="message">{{ tasklistForm.$error.message | translate }}</span>\n  </div>\n\n  <div ng-switch="tasklistForm.type"\n       ng-show="!tasklistForm.$error">\n\n    <div ng-switch-when="embedded">\n      <div cam-tasklist-form-embedded>\n      </div>\n    </div>\n\n    <div ng-switch-when="camunda-forms">\n      <div cam-tasklist-form-camunda></div>\n    </div>\n\n    <div ng-switch-when="external">\n      <div cam-tasklist-form-external>\n      </div>\n    </div>\n\n    <div ng-switch-default>\n      <div cam-tasklist-form-generic>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="form-actions" ng-show="showCompleteButton()">\n    <button class="btn btn-default"\n            type="submit"\n            ng-click="save($event)"\n            ng-hide="tasklistForm.type === \'generic\'"\n            tooltip-placement="top"\n            uib-tooltip="{{ \'SAVE_HINT\' | translate }}"\n            ng-disabled="!$dirty">\n      {{ \'SAVE\' | translate }}\n    </button>\n    <button class="btn btn-primary"\n            type="submit"\n            ng-click="complete()"\n            ng-disabled="disableCompleteButton()">\n      {{ \'COMPLETE\' | translate }}\n    </button>\n  </div>\n\n</div>\n';
      },
      90206: function (e) {
        "use strict";
        e.exports =
          '<div class="three-cols-layout-columns"\n     ng-controller="camLayoutCtrl">\n\n  \x3c!-- # filters column --\x3e\n  <section class="column column-left task-filters"\n           ng-controller="camFiltersCtrl">\n    <header class="three-cols-layout-cell top">\n      <button class="btn btn-link"\n              ng-show="userCanCreateFilter"\n              ng-click="openModal($event)">\n        {{ \'FILTER_CREATE\' | translate }}\n        <span class="glyphicon glyphicon-plus-sign"></span>\n      </button>\n\n      <button ng-click="toggleRegion($event)"\n              data-region="filters"\n              class="region-toggle btn btn-link">\n        <span class="glyphicon"></span>\n      </button>\n    </header>\n\n    <div class="three-cols-layout-cell content">\n      <div cam-tasklist-filters\n           filters-data="filtersData"\n           open-modal="openModal"\n           user-can-create-filter="userCanCreateFilter"></div>\n    </div>\n  </section>\n  \x3c!-- / filters column --\x3e\n\n\n\n\n\n  \x3c!-- # list column --\x3e\n  <section class="column column-center tasks-list"\n           ng-controller="camListCtrl">\n    <header class="three-cols-layout-cell top">\n      <view ng-repeat="tasklistHeaderPlugin in tasklistHeaderPlugins"\n            provider="tasklistHeaderPlugin"\n            vars="tasklistVars"></view>\n\n      <button ng-click="toggleRegion($event)"\n              data-region="list"\n              class="region-toggle btn btn-link">\n        <span class="glyphicon"></span>\n      </button>\n    </header>\n\n    <div class="three-cols-layout-cell content">\n      <view ng-repeat="tasklistPlugin in tasklistPlugins"\n            provider="tasklistPlugin"\n            vars="tasklistVars"></view>\n\n      <div cam-tasks\n           tasklist-data="tasklistData"></div>\n    </div>\n  </section>\n  \x3c!-- / list column --\x3e\n\n\n\n\n\n  \x3c!-- # task column --\x3e\n  <section class="column column-right task-details"\n           ng-controller="camTaskActionCtrl">\n    <header class="three-cols-layout-cell top">\n      <button ng-click="toggleRegion($event)"\n              data-region="task"\n              class="region-toggle btn btn-link">\n        <span class="glyphicon"></span>\n      </button>\n\n      <button ng-click="maximizeRegion($event)"\n              data-region="task"\n              class="btn btn-link maximize">\n        <span class="glyphicon glyphicon-resize-full"></span>\n      </button>\n\n      <button ng-click="resetRegions($event)"\n              class="btn btn-link reset-regions">\n        <span class="glyphicon glyphicon-resize-small"></span>\n      </button>\n\n      <div class="task-actions"\n           ng-show="task"\n           ng-repeat="taskAction in taskActions">\n        <view provider="taskAction" vars="taskVars">\n      </div>\n    </header>\n\n    <div class="three-cols-layout-cell content">\n      <div cam-tasklist-task\n           tasklist-data="tasklistData"></div>\n    </div>\n  </section>\n  \x3c!-- # task column --\x3e\n\n</div>\n';
      },
      5664: function (e) {
        "use strict";
        e.exports =
          '<a ng-click="open()"\n   href>\n  <span class="glyphicon glyphicon-list-alt"></span>\n  {{ \'START_PROCESS\' | translate }}\n</a>\n';
      },
      30709: function (e) {
        "use strict";
        e.exports =
          '<div class="modal-header">\n  <div class="row">\n    <div class="col-xs-6"\n         ng-if="!PROCESS_TO_START_SELECTED">\n      <h3 class="modal-title">{{ \'START_PROCESS\' | translate }}</h3>\n    </div>\n\n    <div class="col-xs-6">\n      <form>\n        <div class="form-group has-feedback"\n             ng-if="!PROCESS_TO_START_SELECTED">\n          <input type="text"\n                 ng-model="page.searchValue"\n                 placeholder="{{ \'SEARCH_PROCESS_BY_NAME\' | translate }}"\n                 ng-change="lookupProcessDefinitionByName()"\n                 class="form-control">\n        </div>\n      </form>\n    </div>\n  </div>\n  <div ng-if="PROCESS_TO_START_SELECTED">\n    <h3 class="modal-title">{{ \'START_PROCESS\' | translate }}: {{ params.processDefinitionName }}</h3>\n  </div>\n</div>\n\n<div class="modal-body">\n\n  <div notifications-panel></div>\n\n  <div ng-if="!PROCESS_TO_START_SELECTED">\n\n    <div ng-if="!processDefinitionState.$loaded || lookupProcessDefinitionByName.$loading"\n       class="loader">\n      <span class="animate-spin glyphicon glyphicon-refresh"></span>\n      {{ \'LOADING\' | translate }}\n    </div>\n\n    <div ng-hide="!processDefinitionState.$loaded || lookupProcessDefinitionByName.$loading">\n\n      <div ng-hide="page.total"\n           class="well">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'NO_PROCESS_DEFINITION_AVAILABLE\' | translate }}\n      </div>\n\n      <div ng-if="page.total" class="available-processes">\n\n        <div class="text-help">\n          <span class="glyphicon glyphicon-info-sign"></span>\n          {{ \'CLICK_PROCESS_TO_START\' | translate }}\n        </div>\n\n        <ul class="processes">\n          <li ng-repeat="processDefinition in processDefinitions">\n            <a href\n               ng-click="selectProcessDefinition(processDefinition)">\n              {{ processDefinition.name || processDefinition.key }}\n            </a>\n            <span ng-if="processDefinition.tenantId"\n                  class="tenant-id">\n              {{ processDefinition.tenantId }}\n            </span>\n          </li>\n        </ul>\n\n      </div>\n\n      <ul uib-pagination ng-if="page.total > page.size"\n                  total-items="page.total"\n                  items-per-page="page.size"\n                  max-size="5"\n                  class="pagination-sm"\n                  boundary-links="true"\n                  ng-model="page.current"\n                  ng-change="pageChange()"\n                  next-text="&rsaquo;"\n                  last-text="&raquo;"\n                  previous-text="&lsaquo;"\n                  first-text="&laquo;"></ul>\n    </div>\n  </div>\n\n  <div ng-if="PROCESS_TO_START_SELECTED">\n\n    <div ng-if="startFormState.$error" uib-alert class="alert alert-danger" role="alert">\n      <span class="glyphicon glyphicon-exclamation-sign"></span>\n      <strong class="status">{{ \'FORM_FAILURE\' | translate }}</strong>\n      <span class="message">{{ startFormState.$error.message }}</span>\n    </div>\n\n    <div ng-if="startFormState.$loaded && !startFormState.$error"\n         cam-tasklist-form\n         tasklist-form="startForm"\n         on-form-completion-callback="completionCallback"\n         on-form-completion="registerCompletionHandler"\n         on-form-validation="notifyFormValidation"\n         options="options"\n         params="params" >\n    </div>\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <div ng-if="!PROCESS_TO_START_SELECTED"\n       class="row row-action">\n\n    <div class="col-xs-12">\n      <button class="btn btn-link"\n              type="button"\n              ng-click="$dismiss()">\n        {{ \'CLOSE\' | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div ng-if="PROCESS_TO_START_SELECTED"\n       class="row">\n\n    <div class="col-xs-4 align-left">\n      <button class="btn btn-link"\n              type="button"\n              ng-click="back()">\n        {{ \'BACK\' | translate }}\n      </button>\n    </div>\n\n    <div class="col-xs-8">\n      <button class="btn btn-link"\n              type="button"\n              ng-click="$dismiss()">\n        {{ \'CLOSE\' | translate }}\n      </button>\n\n      <button class="btn btn-primary"\n              type="submit"\n              ng-disabled="$invalid || requestInProgress"\n              ng-click="startProcessInstance()"\n              ng-hide="options.hideStartButton">\n        {{ \'START\' | translate }}\n      </button>\n    </div>\n\n  </div>\n\n</div>\n';
      },
      20122: function (e) {
        "use strict";
        e.exports =
          '<a href\n   class="showShortcutHelp"\n   ng-click="showHelp()">\n  {{ \'SHORTCUT_HELP\' | translate }}\n</a>\n';
      },
      3877: function (e) {
        "use strict";
        e.exports =
          '<div class="modal-header">\n  <h3 class="modal-title">\n    {{ \'SHORTCUT_HELP\' | translate }}\n  </h3>\n</div>\n\n<div class="modal-body">\n    <table class="cam-table">\n      <thead>\n        <tr>\n          <th>{{ \'SHORTCUT\' | translate }}</th>\n          <th>{{ \'DESCRIPTION\' | translate }}</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr ng-repeat="shortcut in shortcuts">\n          <td>{{shortcut.key}}</td>\n          <td>{{shortcut.description}}</td>\n        </tr>\n      </tbody>\n    </table>\n</div>\n\n<div class="modal-footer">\n  <div class="row row-action">\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="$dismiss()"\n              translate="CLOSE">Close</button>\n    </div>\n  </div>\n</div>\n';
      },
      31484: function (e) {
        "use strict";
        e.exports =
          '<ul class="meta list-inline dates times">\n\n  <li>\n\n    <span cam-widget-inline-field\n          tabindex="0"\n          ng-keydown="openDatepicker($event)"\n          class="followup-date"\n          ng-class="{overdue: task.followUp && (task.followUp < now) }"\n          type="datetime"\n          change="saveFollowUpDate(varValue)"\n          on-start-editing="startEditingFollowUpDate(this)"\n          on-cancel-editing="cancelEditingFollowUpDate(this)"\n          value="task.followUp">\n      <span tooltip-placement="top"\n            uib-tooltip="{{ \'FOLLOW_UP_DATE\' | translate }}"\n            class="glyphicon glyphicon-calendar"></span>\n\n      <span ng-if="task.followUp"\n            tooltip-placement="top"\n            uib-tooltip="{{ task.followUp | camDate:\'long\' }}"\n            am-time-ago="task.followUp">{{ task.followUp }}</span>\n      <a ng-if="!task.followUp"\n         translate="SET_FOLLOW_UP_DATE">Set follow up</a>\n    </span>\n\n    <a href\n       ng-if="task.followUp && !editingState.followUp"\n       tooltip-placement="top"\n       uib-tooltip="{{ \'RESET_FOLLOW_UP_DATE\' | translate }}"\n       ng-click="resetFollowUpDate()"\n       class="reset-follow-up-date glyphicon glyphicon-remove">\n    </a>\n\n  </li>\n\n  <li>\n\n    <span cam-widget-inline-field\n          tabindex="0"\n          ng-keydown="openDatepicker($event)"\n          class="due-date"\n          ng-class="{overdue: task.due && (task.due < now) }"\n          type="datetime"\n          change="saveDueDate(varValue)"\n          on-start-editing="startEditingDueDate(this)"\n          on-cancel-editing="cancelEditingDueDate(this)"\n          value="task.due">\n\n      <span tooltip-placement="top"\n            uib-tooltip="{{ \'DUE_DATE\' | translate }}"\n            class="glyphicon glyphicon-bell"></span>\n\n      <span ng-if="task.due"\n            tooltip-placement="top"\n            uib-tooltip="{{ task.due | camDate:\'long\' }}"\n            am-time-ago="task.due">{{ task.due }}</span>\n\n      <a ng-if="!task.due"\n         translate="SET_DUE_DATE">Set due date</a>\n    </span>\n\n    <a href\n       ng-if="task.due && !editingState.due"\n       tooltip-placement="top"\n       uib-tooltip="{{ \'RESET_DUE_DATE\' | translate }}"\n       ng-click="resetDueDate()"\n       class="reset-due-date glyphicon glyphicon-remove">\n    </a>\n  </li>\n</ul>\n\n\n<ul class="meta list-inline actors">\n  <li class="groups">\n    <span ng-click="editGroups()">\n      <span tooltip-placement="top"\n            uib-tooltip="{{ \'GROUPS\' | translate }}"\n            class="glyphicon glyphicon-th"></span>\n\n      <a href ng-if="groupNames.length > 0">\n        {{ groupNames.join(\', \') }}\n      </a>\n\n      <a href ng-if="groupNames.length === 0"\n         translate="ADD_GROUPS">\n        Add groups\n      </a>\n    </span>\n  </li>\n\n  <li class="assignee set-value"\n      ng-if="!hasAssignee()">\n    <span tooltip-placement="top"\n          uib-tooltip="{{ \'ASSIGNEE\' | translate }}"\n          class="glyphicon glyphicon-user"></span>\n\n    <button\n       class="claim btn-link"\n       ng-click="claim()"\n       translate="CLAIM_TASK"\n       ng-disabled="submitInProgress">Claim</button>\n  </li>\n\n  <li class="assignee"\n      ng-if="hasAssignee()">\n    <span cam-widget-inline-field\n          tabindex="0"\n          ng-keydown="editAssignee($event)"\n          ng-paste="editAssignee($event)"\n          ng-class="{\'has-error\': !validAssignee, \'validating\': validationInProgress}"\n          class="set-value"\n          type="text"\n          validate="isInvalidUser(this)"\n          change="assign(varValue)"\n          on-start-editing="startEditingAssignee(this)"\n          on-cancel-editing="cancelEditingAssignee(this)"\n          value="assignee.id">\n\n      <span tooltip-placement="top"\n            uib-tooltip="{{ \'ASSIGNEE\' | translate }}"\n            class="glyphicon glyphicon-user"></span>\n      <span ng-if="assignee.firstName || assignee.lastName">{{ assignee.firstName }} {{ assignee.lastName }}</span>\n      <span ng-if="!(assignee.firstName || assignee.lastName)">{{ assignee.id }}</span>\n    </span>\n\n    <button\n       ng-if="isAssignee && !editingState.assignee"\n       tooltip-placement="top"\n       uib-tooltip="{{ \'UNCLAIM_TASK\' | translate }}"\n       ng-click="unclaim()"\n       ng-disabled="submitInProgress"\n       class="unclaim glyphicon glyphicon-remove btn-link">\n    </button>\n\n    <a href\n       ng-if="!isAssignee && !editingState.assignee"\n       tooltip-placement="top"\n       uib-tooltip="{{ \'RESET_TASK_ASSIGNEE\' | translate }}"\n       ng-click="resetAssignee()"\n       class="reset-assignee glyphicon glyphicon-remove">\n    </a>\n\n  </li>\n\n</ul>\n';
      },
      11250: function (e) {
        "use strict";
        e.exports =
          '<div ng-show="!taskState.$loaded"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-show="taskState.$loaded">\n  <div ng-hide="task">\n    <div class="no-task well">\n      <span class="glyphicon glyphicon-info-sign"></span>\n      {{ \'SELECT_TASK_IN_LIST\' | translate }}\n    </div>\n  </div>\n\n  <section ng-if="task"\n           class="task-card"\n           ng-class="{\'task-removed\': !taskExists}">\n    <header class="row">\n      <div class="col-xs-12">\n        <div class="tenant-id"\n             ng-if="task.tenantId"\n             uib-tooltip="{{ task.tenantId }}">\n          {{ task.tenantId }}\n        </div>\n\n        <div class="names">\n          <h2 class="task">{{ task.name || task.taskDefinitionKey || task.id }} </h2>\n          <div class="definition-name">\n          <h4 class="process-definition"\n              ng-if="task.processDefinitionId">\n            {{ task._embedded.processDefinition[0].name || task._embedded.processDefinition[0].key }}\n              <span ng-if="task._embedded.processDefinition[0].versionTag">(v. {{ task._embedded.processDefinition[0].versionTag }})</span>\n            </h4>\n          <h4 class="case-definition"\n              ng-if="task.caseDefinitionId">\n            {{ task._embedded.caseDefinition[0].name || task._embedded.caseDefinition[0].key }}\n          </h4>\n          <a class="instance-link"  ng-if="instanceLink"\n            ng-href="{{instanceLink}}" class="ng-binding" href="{{instanceLink}}">\n            <span tooltip-placement="top"\n                  uib-tooltip="{{ \'INSTANCE_LINK\' | translate }}"\n                  class="glyphicon glyphicon-new-window">\n              </span>\n          </a>\n          </div>\n        </div>\n\n        <div cam-tasklist-task-meta\n             task-data="taskData"\n             error-handler="errorHandler"></div>\n      </div>\n    </header>\n\n    <div class="task-removed-alert">\n      <div uib-alert class="alert alert-info row">\n        <div class="col-xs-8 text-padded">\n          {{ \'TASK_HAS_BEEN_REMOVED\' | translate }}\n        </div>\n        <div class="col-xs-4 text-right">\n          <button class="btn btn-default"\n                  ng-click="dismissTask()">{{ \'CLOSE_TASK\' | translate }}</button>\n        </div>\n      </div>\n    </div>\n\n    <div class="row tabbed-content">\n\n      <div ng-show="taskDetailTabs.length" class="col-xs-12">\n        <ul class="nav nav-tabs">\n          <li ng-class="{ active: selectedTaskDetailTab.id === taskDetailTab.id }" ng-repeat="taskDetailTab in taskDetailTabs">\n            <a href ng-click="selectTaskDetailTab(taskDetailTab)">{{ taskDetailTab.label | translate }}</a>\n          </li>\n        </ul>\n\n        <div class="tab-content">\n          <view provider="selectedTaskDetailTab" vars="taskVars"></view>\n        </div>\n\n      </div>\n    </div>\n\n  </section>\n\n</div>\n\n\n';
      },
      92443: function (e) {
        "use strict";
        e.exports =
          '<div class="modal-header">\n  <h3 class="modal-title">\n    {{ \'MANAGE_GROUPS\' | translate }}\n  </h3>\n</div>\n\n<div class="modal-body groups-modal">\n\n  <div notifications-panel></div>\n\n  <form name="taskGroupForm"\n        class="form-horizontal"\n        ng-controller="camTaskGroupsCtrl"\n        ng-hide="!modalGroupsState.$loaded || modalGroupsState.$error"\n        ng-submit="(isValid() && addGroup())">\n\n  <div ng-show="!modalGroupsState.$loaded && !modalGroupsState.$error"\n       class="loader">\n    <span class="animate-spin glyphicon glyphicon-refresh"></span>\n    {{ \'LOADING\' | translate }}\n  </div>\n\n  <div class="text-help">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'USE_ADD_GROUP\' | translate }}\n  </div>\n\n    <div class="form-group">\n      <div class="col-xs-4 align-right">\n        <button class="btn btn-link"\n                ng-click="addGroup()"\n                type="button"\n                ng-disabled="!isEnabled()">\n          <span class="hidden-sm hidden-xs">{{ \'GROUP_ADD\' | translate }}</span>\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </button>\n      </div>\n\n      <div class="col-xs-8"\n           ng-class="{\'has-error\': newGroup.error }">\n        <input type="text"\n               name="newGroup"\n               required\n               ng-disabled="loading"\n               placeholder="{{ \'GROUP_ID\' | translate }}"\n               class="form-control"\n               ng-model="newGroup.groupId"\n               ng-change="validateNewGroup()"/>\n\n        <span ng-if="newGroup.error"\n              class="help-block">\n          {{ newGroup.error.message | translate }}\n        </span>\n      </div>\n    </div>\n\n    <div class="form-group values"\n         ng-repeat="group in _groups">\n      <div class="col-xs-4 row-action">\n        <a href\n           ng-click="removeGroup(group, $index)"\n           class="glyphicon glyphicon-remove-sign"></a>\n      </div>\n\n      <div class="col-xs-8 value">\n        {{ group.id }}\n      </div>\n    </div>\n\n  </form>\n\n</div>\n\n<div class="modal-footer">\n  <div class="row row-action">\n    <div class="col-xs-12">\n      <button class="btn btn-xs btn-link"\n              type="button"\n              ng-click="$dismiss()"\n              translate="CLOSE">Close</button>\n    </div>\n  </div>\n</div>\n';
      },
      47728: function (e) {
        "use strict";
        e.exports =
          '<a href\n   class="createCommentLink"\n   ng-click="createComment()">\n  {{ \'COMMENT_CREATE\' | translate }}\n  <span class="glyphicon glyphicon-plus-sign"></span>\n</a>\n';
      },
      40145: function (e) {
        "use strict";
        e.exports =
          '<form class="form form-horizontal"\n      name="newComment"\n      role="form">\n\n  <div class="modal-header">\n    <h3 class="modal-title">\n      {{ \'COMMENT_CREATE\' | translate }}\n    </h3>\n  </div>\n\n  <div class="modal-body">\n      <textarea class="form-control"\n             id="comment-form-message"\n             ng-model="comment.message"\n             placeholder="{{ \'COMMENT_MESSAGE_PLACEHOLDER\' | translate }}">\n      </textarea>\n  </div>\n\n  <div class="modal-footer">\n    <div class="row row-action">\n      <div class="col-xs-12">\n        <button class="btn btn-xs btn-link"\n                type="button"\n                ng-click="$dismiss()"\n                translate="CLOSE">Close</button>\n\n        <button class="btn btn-primary"\n                type="submit"\n                ng-disabled="!comment.message"\n                ng-click="submit()"\n                translate="SAVE">Save</button>\n\n      </div>\n    </div>\n  </div>\n</form>\n';
      },
      69836: function (e) {
        "use strict";
        e.exports =
          '<div class="description-pane">\n  <div ng-hide="task.description"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_DESCRIPTION\' | translate }}\n  </div>\n  <div ng-show="task.description">\n    {{ task.description }}\n  </div>\n</div>\n';
      },
      47322: function (e) {
        "use strict";
        e.exports =
          '<div ng-show="!diagramState.$loaded"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-if="diagramState.$loaded">\n  <div ng-hide="diagram.definition && diagram.xml"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_DIAGRAM\' | translate }}\n  </div>\n\n  <div ng-if="processDefinition && diagram.xml">\n    <div class="diagram-pane"\n         cam-widget-bpmn-viewer\n         diagram-data="diagram.xml"\n         on-load="highlightTask()"\n         control="control">\n    </div>\n  </div>\n\n  <div ng-if="caseDefinition && diagram.xml">\n    <div class="diagram-pane"\n         cam-widget-cmmn-viewer\n         diagram-data="diagram.xml"\n         on-load="highlightTask()"\n         control="control">\n    </div>\n  </div>\n\n</div>\n';
      },
      13901: function (e) {
        "use strict";
        e.exports =
          '<div class="form-pane">\n\n  <div ng-if="loadingState === \'ERROR\'" uib-alert class="alert alert-danger" role="alert">\n    <span class="glyphicon glyphicon-exclamation-sign"></span>\n    <strong class="status">{{ \'FORM_FAILURE\' | translate }}</strong>\n    <span class="message">{{ taskFormState.$error.message }}</span>\n  </div>\n\n  <div ng-if="loadingState === \'DONE\'"\n       cam-tasklist-form\n       tasklist-form="taskForm"\n       on-form-completion-callback="completionCallback"\n       options="options"\n       params="params" >\n  </div>\n\n</div>';
      },
      66905: function (e) {
        "use strict";
        e.exports =
          '<div class="history-pane">\n\n  <div ng-show="!state.$loaded"\n       class="loader">\n    <span class="animate-spin glyphicon glyphicon-refresh"></span>\n    {{ \'LOADING\' | translate }}\n  </div>\n\n  <div ng-hide="!state.$loaded">\n    <div ng-if="!days.length">\n      <div class="well">\n        <span class="glyphicon glyphicon-info-sign"></span>\n        {{ \'NO_HISTORY\' | translate }}\n      </div>\n    </div>\n\n    <div ng-if="days.length"\n         class="day row"\n         ng-repeat="day in days | orderBy:\'-date\'">\n      <div class="col-xs-2">\n        <div class="date-badge">\n          <div>\n            <span class="day">{{ day.date | camDate:\'day\' }}</span>\n            <span class="month">{{ day.date | camDate:\'monthName\' }}</span>\n            <span class="year">{{ day.date | date:\'yyyy\' }}</span>\n          </div>\n        </div>\n      </div>\n\n      <div class="col-xs-10">\n        <div class="instant row"\n             ng-repeat="event in day.events | orderBy:\'-time\'">\n          <div class="col-xs-2 operation-meta">\n            <div class="operation-time"\n                 tooltip-placement="left"\n                 uib-tooltip="{{ event.time | camDate:\'long\' }}">{{ event.time | date:\'HH:mm\' }}</div>\n            <div class="operation-user"\n                 tooltip-placement="top"\n                 uib-tooltip="{{ event.userId }}">{{ event.userId }}</div>\n          </div>\n\n          <div class="col-xs-10 operation-detail">\n            <div class="row">\n              <h4 class="col-xs-12">{{ event.type | translate }}</h4>\n            </div>\n\n            <div class="row event-body">\n              <div class="line"\n                   ng-repeat="subEvent in event.subEvents"\n                   ng-if="event.type !== \'Comment\'">\n                <h5 class="col-sm-12 col-md-3 event-property">{{ subEvent.property | translate }}</h5>\n\n                <div class="col-sm-12 col-md-9">\n                  <div class="new-value" ng-if="subEvent.newValue">\n                    <span ng-if="subEvent.propertyIsDate">{{ subEvent.newValue | camDate }}</span>\n                    <span ng-if="!subEvent.propertyIsDate">{{ subEvent.newValue }}</span>\n                  </div>\n\n                  <div class="original-value"\n                       ng-if="subEvent.orgValue">\n                    <span ng-if="subEvent.propertyIsDate">{{ subEvent.orgValue | camDate }}</span>\n                    <span ng-if="!subEvent.propertyIsDate">{{ subEvent.orgValue }}</span>\n                  </div>\n                </div>\n              </div>\n              <div class="col-xs-12"\n                   ng-if="event.type === \'Comment\'"\n                   nl2br="event.message"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <ul uib-pagination\n    ng-if="pages.total > pages.size"\n    class="pagination-sm"\n\n    page="pages.current"\n    ng-model="pages.current"\n    ng-change="onPaginationChange()"\n\n    total-items="pages.total"\n    items-per-page="pages.size"\n\n    max-size="7"\n    boundary-links="true"></ul>\n\n  </div>\n</div>\n';
      },
      15311: function (e) {
        "use strict";
        e.exports =
          '<div ng-show="!state.$loaded && !state.$error"\n     class="loader">\n  <span class="animate-spin glyphicon glyphicon-refresh"></span>\n  {{ \'LOADING\' | translate }}\n</div>\n\n<div ng-show="state.$error"\n     uib-alert class="alert alert-danger"\n     role="alert">\n  <span class="glyphicon glyphicon-exclamation-sign"></span>\n  <strong class="status">{{ \'FAILURE\' | translate }}:</strong>\n  <span class="message">{{ error.message }}</span>\n</div>\n\n<div ng-if="state.$loaded && !state.$error">\n  <div ng-if="!totalItems"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'NO_MATCHING_TASK\' | translate }}\n  </div>\n\n  <div ng-if="totalItems && !tasks"\n       class="well">\n    <span class="glyphicon glyphicon-info-sign"></span>\n    {{ \'RESTRICTION_NOTICE\' | translate }}\n    <a ng-click="resetPage()">{{ \'RESET_PAGE\' | translate }}</a>\n  </div>\n\n  <div ng-if="totalItems"\n       ng-keydown="handleKeydown($event)">\n    <ol class="tasks-list list-unstyled">\n      <li class="task"\n          ng-repeat="(delta, task) in tasks"\n          ng-class="{active: currentTaskId === task.id}">\n\n        <div class="clickable"\n             ng-click="focus($event, task)">\n          <div class="names">\n            <h4 class="task">\n              <a ng-href="{{ getHrefUrl(task) }}"\n                 ng-click="focus($event, task)">\n                {{ task.name || task.taskDefinitionKey || task.id }}\n              </a>\n            </h4>\n\n            <h6 class="process-definition"\n                ng-if="task.processDefinitionId">\n              {{ task._embedded.processDefinition[0].name || task._embedded.processDefinition[0].key }}\n            </h6>\n\n            <h6 class="case-definition"\n                ng-if="task.caseDefinitionId">\n              {{ task._embedded.caseDefinition[0].name || task._embedded.caseDefinition[0].key }}\n            </h6>\n\n            <h5 class="assignee"\n                ng-if="hasAssignee(task)"\n                uib-tooltip="task.assignee">\n              {{ assigneeDisplayedName(task); }}\n            </h5>\n          </div>\n\n          <div class="cells-wrapper">\n            <div class="dates"\n                 ng-click="focus($event, task)">\n              <span class="due-date"\n                    ng-if="!!task.due"\n                    ng-class="{overdue: task.due && (task.due < now) }">\n                {{ \'DUE\' | translate }}\n                <span tooltip-placement="top"\n                      uib-tooltip="{{ task.due | camDate:\'long\' }}"\n                      am-time-ago="task.due">{{ task.due }}</span>\n              </span>\n\n              <span class="followup-date"\n                    ng-if="!!task.followUp"\n                    ng-class="{overdue: task.followUp && (task.followUp < now) }">\n                {{ \'FOLLOW_UP\' | translate }}\n                <span tooltip-placement="top"\n                      uib-tooltip="{{ task.followUp | camDate:\'long\' }}"\n                      am-time-ago="task.followUp">{{ task.followUp }}</span>\n              </span>\n\n              <span class="creation-date">\n                {{ \'CREATION\' | translate }}\n                <span tooltip-placement="top"\n                      uib-tooltip="{{ task.created | camDate:\'long\' }}"\n                      am-time-ago="task.created">{{ task.created }}</span>\n              </span>\n            </div>\n\n            <div class="priority"\n                 tooltip-placement="right"\n                 uib-tooltip="{{ \'PRIORITY\' | translate }}">\n              {{ task.priority }}\n            </div>\n          </div>\n\n          <div class="task-card-details"\n               ng-class="{expanded: !!expanded[delta]}">\n            <view ng-repeat="plugin in cardPlugins"\n                  data-plugin-id="{{ plugin.id }}"\n                  class="tasklist-card-plugin"\n                  vars="cardPluginVars"\n                  provider="plugin"></view>\n\n            <div class="shutter actions"\n                 ng-click="toggle(delta, $event)"\n                 tooltip-placement="bottom"\n                 uib-tooltip="{{ (!!expanded[delta] ? \'SHOW_LESS\' : \'SHOW_MORE\') | translate }}">\n              <a class="glyphicon"\n                 ng-class="{\'glyphicon-menu-up\': expanded[delta], \'glyphicon-menu-down\': !expanded[delta]}"\n                 href>\n              </a>\n            </div>\n          </div>\x3c!-- / details --\x3e\n        </div>\n      </li>\n    </ol>\n  </div>\n</div>\n\n<ul uib-pagination ng-show="state.$loaded && totalItems > pageSize"\n            total-items="totalItems"\n            items-per-page="pageSize"\n            max-size="5"\n            class="pagination-sm"\n            boundary-links="true"\n            ng-model="pageNum"\n            ng-change="pageChange()"\n            next-text="&rsaquo;"\n            last-text="&raquo;"\n            previous-text="&lsaquo;"\n            first-text="&laquo;"></ul>\n';
      },
      29443: function (e) {
        "use strict";
        e.exports =
          '<div cam-widget-search\n     cam-widget-search-total="totalItems"\n     cam-widget-search-valid-searches="searches"\n     cam-widget-search-match-any="matchAny"\n     cam-widget-search-disable-typeahead-autoselect="true"\n     cam-widget-search-translations="translations"\n     cam-widget-search-types="types"\n     cam-widget-search-operators="operators"\n     cam-widget-search-mode="filter"\n     cam-widget-search-storage-group="\'TLT\'"\n     class="multiline-pills"></div>\n';
      },
      42634: function () {},
      22623: function () {},
      23972: function (e) {
        "use strict";
        e.exports = JSON.parse(
          '{"types":[{"id":{"key":"processVariables","value":"PROCESS_VARIABLE"},"operators":[{"key":"eq","value":"="},{"key":"neq","value":"!="},{"key":"gt","value":"SEARCH_GREATER_THAN"},{"key":"gteq","value":"SEARCH_GREATER_THAN_EQUALS"},{"key":"lt","value":"SEARCH_LESS_THAN"},{"key":"lteq","value":"SEARCH_LESS_THAN_EQUALS"},{"key":"like","value":"like"},{"key":"notLike","value":"not like"}],"extended":true,"caseOptions":true,"allowDates":true},{"id":{"key":"taskVariables","value":"TASK_VARIABLE"},"extended":true,"caseOptions":true,"allowDates":true},{"id":{"key":"caseInstanceVariables","value":"CASE_VARIABLE"},"extended":true,"caseOptions":true,"allowDates":true},{"id":{"key":"processInstanceIdIn","value":"PROCESS_INSTANCE_ID"},"operators":[{"key":"In","value":"in"}]},{"id":{"key":"processInstanceBusinessKey","value":"PROCESS_INSTANCE_BUSINESS_KEY"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}],"enforceString":true},{"id":{"key":"processDefinitionId","value":"PROCESS_DEFINITION_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"processDefinitionKey","value":"PROCESS_DEFINITION_KEY"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"processDefinitionName","value":"PROCESS_DEFINITION_NAME"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}]},{"id":{"key":"executionId","value":"EXECUTION_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"caseInstanceId","value":"CASE_INSTANCE_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"caseInstanceBusinessKey","value":"CASE_INSTANCE_BUSINESS_KEY"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}]},{"id":{"key":"caseDefinitionId","value":"CASE_DEFINITION_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"caseDefinitionKey","value":"CASE_DEFINITION_KEY"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"caseDefinitionName","value":"CASE_DEFINITION_NAME"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}]},{"id":{"key":"caseExecutionId","value":"CASE_EXECUTION_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"assignee","value":"ASSIGNEE"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}]},{"id":{"key":"owner","value":"OWNER"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"candidateGroup","value":"CANDIDATE_GROUP"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"candidateUser","value":"CANDIDATE_USER"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"involvedUser","value":"INVOLVED_USER"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"taskDefinitionKey","value":"TASK_DEFINITION_KEY"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}]},{"id":{"key":"name","value":"NAME"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}],"default":true},{"id":{"key":"description","value":"DESCRIPTION"},"operators":[{"key":"Like","value":"LIKE"},{"key":"eq","value":"="}]},{"id":{"key":"priority","value":"PRIORITY"},"operators":[{"key":"eq","value":"="},{"key":"max","value":"SEARCH_LESS_THAN_EQUALS"},{"key":"min","value":"SEARCH_GREATER_THAN_EQUALS"}]},{"id":{"key":"due","value":"DUE_DATE"},"operators":[{"key":"Before","value":"BEFORE"},{"key":"After","value":"AFTER"}],"allowDates":true,"enforceDates":true},{"id":{"key":"withoutDueDate","value":"WITHOUT_DUE_DATE"},"basic":true},{"id":{"key":"followUp","value":"FOLLOW_UP_DATE"},"operators":[{"key":"Before","value":"BEFORE"},{"key":"After","value":"AFTER"}],"allowDates":true,"enforceDates":true},{"id":{"key":"created","value":"CREATION_DATE"},"operators":[{"key":"Before","value":"BEFORE"},{"key":"After","value":"AFTER"}],"allowDates":true,"enforceDates":true},{"id":{"key":"delegationState","value":"DELEGATION_STATE"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"tenantIdIn","value":"TENANT_ID"},"operators":[{"key":"In","value":"in"}]},{"id":{"key":"withoutTenantId","value":"WITHOUT_TENANT_ID"},"basic":true}],"operators":{"date":[{"key":"lteq","value":"BEFORE"},{"key":"gteq","value":"AFTER"}],"boolean":[{"key":"eq","value":"="},{"key":"neq","value":"!="}],"object":[{"key":"eq","value":"="},{"key":"neq","value":"!="}],"number":[{"key":"eq","value":"="},{"key":"neq","value":"!="},{"key":"gt","value":"SEARCH_GREATER_THAN"},{"key":"gteq","value":"SEARCH_GREATER_THAN_EQUALS"},{"key":"lt","value":"SEARCH_LESS_THAN"},{"key":"lteq","value":"SEARCH_LESS_THAN_EQUALS"}],"string":[{"key":"eq","value":"="},{"key":"neq","value":"!="},{"key":"gt","value":"SEARCH_GREATER_THAN"},{"key":"gteq","value":"SEARCH_GREATER_THAN_EQUALS"},{"key":"lt","value":"SEARCH_LESS_THAN"},{"key":"lteq","value":"SEARCH_LESS_THAN_EQUALS"},{"key":"like","value":"like"}],"undefined":[{"key":"eq","value":"="},{"key":"neq","value":"!="},{"key":"gt","value":"SEARCH_GREATER_THAN"},{"key":"gteq","value":"SEARCH_GREATER_THAN_EQUALS"},{"key":"lt","value":"SEARCH_LESS_THAN"},{"key":"lteq","value":"SEARCH_LESS_THAN_EQUALS"},{"key":"like","value":"like"}]},"tooltips":{"inputPlaceholder":"SEARCH_PLACEHOLDER","invalid":"INVALID_SEARCH","deleteSearch":"DELETE_SEARCH","type":"TYPE","name":"PROPERTY","operator":"OPERATOR","value":"VALUE"}}'
        );
      },
    },
    function (e) {
      return (
        e.O(0, [881], function () {
          return (t = 76176), e((e.s = t));
          var t;
        }),
        e.O()
      );
    },
  ]);
});
