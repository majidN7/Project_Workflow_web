/*! For license information, please see app/admin/camunda-admin-bootstrap.js.LICENSE.txt */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports["app/admin/camunda-admin-bootstrap"] = e())
    : (t["app/admin/camunda-admin-bootstrap"] = e());
})(self, function () {
  return (self.webpackChunkcamunda_bpm_webapp =
    self.webpackChunkcamunda_bpm_webapp || []).push([
    [591],
    {
      1023: function (t, e, n) {
        "use strict";
        t.exports = n(83359);
      },
      12338: function (module, __unused_webpack_exports, __webpack_require__) {
        "use strict";
        var CamundaForm = __webpack_require__(21299),
          angular = __webpack_require__(30336),
          $ = CamundaForm.$,
          constants = __webpack_require__(99842),
          CamundaFormAngular = CamundaForm.extend({
            renderForm: function () {
              var t = this;
              function e(t, e) {
                var n = $(e);
                if (!n.attr("ng-model")) {
                  var a = n.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
                  a && n.attr("ng-model", a);
                }
              }
              (this.formElement = angular.element(this.formElement)),
                CamundaForm.prototype.renderForm.apply(this, arguments);
              for (var n = 0; n < this.formFieldHandlers.length; n++) {
                var a = this.formFieldHandlers[n].selector;
                $(a, t.formElement).each(e);
              }
              this.formElement = angular.element(this.formElement);
              var r = t.formElement.injector();
              if (r) {
                var i = t.formElement.scope();
                r.invoke([
                  "$compile",
                  function (e) {
                    e(t.formElement)(i);
                  },
                ]),
                  (i.camForm = this);
              }
            },
            executeFormScript: function executeFormScript(script) {
              this.formElement = angular.element(this.formElement);
              var moment = __webpack_require__(98024),
                injector = this.formElement.injector(),
                scope = this.formElement.scope();
              (function (camForm, $scope, moment) {
                var inject = function (t) {
                  if (!angular.isFunction(t) && !angular.isArray(t))
                    throw new Error("Must call inject(array|fn)");
                  injector.instantiate(t, { $scope: scope });
                };
                eval(script);
              })(this, scope, moment);
            },
            fireEvent: function () {
              this.formElement = angular.element(this.formElement);
              var t = this,
                e = arguments,
                n = this.formElement.scope(),
                a = function () {
                  CamundaForm.prototype.fireEvent.apply(t, e);
                },
                r = t.formElement.injector();
              r &&
                r.invoke([
                  "$rootScope",
                  function (t) {
                    var e = t.$$phase;
                    "$apply" !== e && "$digest" !== e
                      ? n.$apply(function () {
                          a();
                        })
                      : a();
                  },
                ]);
            },
          });
        module.exports = CamundaFormAngular;
      },
      99325: function (t, e, n) {
        "use strict";
        var a = n(30336),
          r = n(12338),
          i = n(59084).isType,
          o = a.module("cam.embedded.forms", []);
        o.directive("camVariableName", [
          "$rootScope",
          function (t) {
            return {
              require: "ngModel",
              link: function (e, n, a, r) {
                n.on("camFormVariableApplied", function (n, a) {
                  var i = t.$$phase;
                  "$apply" !== i && "$digest" !== i
                    ? e.$apply(function () {
                        r.$setViewValue(a);
                      })
                    : r.$setViewValue(a);
                });
              },
            };
          },
        ]),
          o.directive("camVariableType", [
            function () {
              return {
                require: "ngModel",
                link: function (t, e, n, a) {
                  var r = function (t) {
                    var r = n.camVariableType;
                    return (
                      a.$setValidity("camVariableType", !0),
                      (t || !1 === t || "Bytes" === r) &&
                        (-1 !== ["Boolean", "String", "Bytes"].indexOf(r) ||
                          i(t, r) ||
                          a.$setValidity("camVariableType", !1),
                        "file" === n.type &&
                          "Bytes" === r &&
                          e[0].files &&
                          e[0].files[0] &&
                          e[0].files[0].size > (n.camMaxFilesize || 5e6) &&
                          a.$setValidity("camVariableType", !1)),
                      t
                    );
                  };
                  a.$parsers.unshift(r),
                    a.$formatters.push(r),
                    n.$observe("camVariableType", function () {
                      return r(a.$viewValue);
                    }),
                    e.bind("change", function () {
                      r(a.$viewValue), t.$apply();
                    });
                },
              };
            },
          ]),
          (t.exports = r);
      },
      59721: function (t, e, n) {
        "use strict";
        t.exports = { Client: n(12444), Form: n(99325), utils: n(37914) };
      },
      10123: function (t, e, n) {
        "use strict";
        var a = n(60314),
          r = n(32278);
        function i() {}
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
            list: function (t, e) {
              "function" == typeof t && ((e = t), (t = {})),
                (t = t || {}),
                (e = e || i);
              var n = this,
                r = { count: 0, items: [] },
                o = a.defer(),
                s = !1,
                c = !1,
                l = function () {
                  c && s && (n.trigger("loaded", r), o.resolve(r), e(null, r));
                };
              return (
                n.count(t, function (t, a) {
                  t
                    ? (n.trigger("error", t), o.reject(t), e(t))
                    : ((r.count = a), (s = !0), l());
                }),
                n.http.get(n.path, {
                  data: t,
                  done: function (a, i) {
                    a
                      ? (n.trigger("error", a), o.reject(a), e(a))
                      : ((r.items = i),
                        (r.firstResult = parseInt(t.firstResult || 0, 10)),
                        (r.maxResults =
                          r.firstResult + parseInt(t.maxResults || 10, 10)),
                        (c = !0),
                        l());
                  },
                }),
                o.promise
              );
            },
            count: function (t, e) {
              "function" == typeof t && ((e = t), (t = {})),
                (t = t || {}),
                (e = e || i);
              var n = this,
                r = a.defer();
              return (
                this.http.get(this.path + "/count", {
                  data: t,
                  done: function (t, a) {
                    t
                      ? (n.trigger("error", t), r.reject(t), e(t))
                      : (r.resolve(a.count), e(null, a.count));
                  },
                }),
                r.promise
              );
            },
            update: function () {},
            delete: function () {},
          }
        );
        r.attach(o), (t.exports = o);
      },
      34873: function (t, e) {
        "use strict";
        e.createSimpleGetQueryFunction = function (t) {
          return function (e, n) {
            var a = this.path + t;
            return (
              "function" == typeof e && ((n = e), (e = {})),
              this.http.get(a, { data: e, done: n })
            );
          };
        };
      },
      2160: function (t, e, n) {
        "use strict";
        n(67559), n(85541), n(84392), n(66893);
        var a = n(77707),
          r = n(60314),
          i = n(32278),
          o = n(37914);
        function s() {}
        var c = function (t) {
          if (
            (((t = t || {}).headers = t.headers || {}),
            t.headers.Accept ||
              (t.headers.Accept =
                "application/hal+json, application/json; q=0.5"),
            !t.baseUrl)
          )
            throw new Error(
              "HttpClient needs a `baseUrl` configuration property."
            );
          i.attach(this), (this.config = t);
        };
        function l(t, e, n) {
          return (
            (e = e || s),
            function (a, r) {
              if (a || (!r.ok && !r.noContent))
                return (
                  (a =
                    a ||
                    r.error ||
                    new Error(
                      "The " +
                        r.req.method +
                        " request on " +
                        r.req.url +
                        " failed"
                    )),
                  r && r.body && r.body.message && (a.message = r.body.message),
                  t.trigger("error", a),
                  n && n.reject(a),
                  e(a, null, r.headers)
                );
              "application/hal+json" === r.type &&
                ((r.body && 0 !== Object.keys(r.body).length) ||
                  (r.body = JSON.parse(r.text)),
                (r.body = o.solveHALEmbedded(r.body))),
                n && n.resolve(r.body ? r.body : r.text ? r.text : ""),
                e(null, r.body ? r.body : r.text ? r.text : "", r.headers);
            }
          );
        }
        (c.prototype.post = function (t, e) {
          var n = (e = e || {}).done || s,
            i = r.defer(),
            o = this.config.baseUrl + (t ? "/" + t : ""),
            c = a.post(o),
            u = e.headers || this.config.headers;
          u.Accept = u.Accept || this.config.headers.Accept;
          var d = !1;
          if ("undefined" != typeof Buffer)
            Object.keys(e.fields || {}).forEach(function (t) {
              c.field(t, e.fields[t]), (d = !0);
            }),
              (e.attachments || []).forEach(function (t, e) {
                c.attach("data_" + e, new Buffer(t.content), t.name), (d = !0);
              });
          else if (e.fields || e.attachments) {
            var p = new Error(
              "Multipart request is only supported in node.js environement."
            );
            return n(p), i.reject(p);
          }
          return (
            d || c.send(e.data || {}),
            c.set(u).query(e.query || {}),
            c.end(l(this, n, i)),
            i.promise
          );
        }),
          (c.prototype.get = function (t, e) {
            var n = this.config.baseUrl + (t ? "/" + t : "");
            return this.load(n, e);
          }),
          (c.prototype.load = function (t, e) {
            var n = (e = e || {}).done || s,
              i = r.defer(),
              o = e.headers || this.config.headers,
              c = e.accept || o.Accept || this.config.headers.Accept;
            return (
              a
                .get(t)
                .set(o)
                .set("Accept", c)
                .query(e.data || {})
                .end(l(this, n, i)),
              i.promise
            );
          }),
          (c.prototype.put = function (t, e) {
            var n = (e = e || {}).done || s,
              i = r.defer(),
              o = this.config.baseUrl + (t ? "/" + t : ""),
              c = e.headers || this.config.headers;
            return (
              (c.Accept = c.Accept || this.config.headers.Accept),
              a
                .put(o)
                .set(c)
                .send(e.data || {})
                .end(l(this, n, i)),
              i.promise
            );
          }),
          (c.prototype.del = function (t, e) {
            var n = (e = e || {}).done || s,
              i = r.defer(),
              o = this.config.baseUrl + (t ? "/" + t : ""),
              c = e.headers || this.config.headers;
            return (
              (c.Accept = c.Accept || this.config.headers.Accept),
              a
                .del(o)
                .set(c)
                .send(e.data || {})
                .end(l(this, n, i)),
              i.promise
            );
          }),
          (c.prototype.options = function (t, e) {
            var n = (e = e || {}).done || s,
              i = r.defer(),
              o = this.config.baseUrl + (t ? "/" + t : ""),
              c = e.headers || this.config.headers;
            return (
              (c.Accept = c.Accept || this.config.headers.Accept),
              a("OPTIONS", o).set(c).end(l(this, n, i)),
              i.promise
            );
          }),
          (t.exports = c);
      },
      12444: function (t, e, n) {
        "use strict";
        n(72595), n(84392);
        var a = n(32278);
        function r(t) {
          if (!t) throw new Error("Needs configuration");
          if (!t.apiUri) throw new Error("An apiUri is required");
          a.attach(this),
            (t.engine = void 0 !== t.engine ? t.engine : "default"),
            (t.mock = void 0 === t.mock || t.mock),
            (t.resources = t.resources || {}),
            (this.HttpClient = t.HttpClient || r.HttpClient),
            (this.baseUrl = t.apiUri),
            t.engine &&
              ((this.baseUrl += "/" !== this.baseUrl.slice(-1) ? "/" : ""),
              (this.baseUrl += "engine/" + t.engine)),
            (this.config = t),
            this.initialize();
        }
        (r.HttpClient = n(2160)),
          (function (t) {
            t.config = {};
            var e = {};
            (t.initialize = function () {
              (e.authorization = n(51323)),
                (e.batch = n(6414)),
                (e.deployment = n(25755)),
                (e["external-task"] = n(82625)),
                (e.filter = n(43158)),
                (e.history = n(2094)),
                (e["process-definition"] = n(19901)),
                (e["process-instance"] = n(88659)),
                (e.task = n(50901)),
                (e["task-report"] = n(74928)),
                (e.telemetry = n(27033)),
                (e.variable = n(73420)),
                (e["case-execution"] = n(87259)),
                (e["case-instance"] = n(39690)),
                (e["case-definition"] = n(97268)),
                (e.user = n(23575)),
                (e.group = n(26805)),
                (e.tenant = n(77840)),
                (e.incident = n(74938)),
                (e["job-definition"] = n(68975)),
                (e.job = n(76453)),
                (e.metrics = n(89555)),
                (e["decision-definition"] = n(54742)),
                (e.execution = n(97224)),
                (e.migration = n(30766)),
                (e.drd = n(96712)),
                (e.modification = n(70460)),
                (e.message = n(5709)),
                (e["password-policy"] = n(95364));
              var t,
                a,
                r,
                i,
                o = this;
              function s(t) {
                o.trigger("error", t);
              }
              for (t in ((this.http = new this.HttpClient({
                baseUrl: this.baseUrl,
                headers: this.config.headers,
              })),
              e)) {
                for (i in ((a = {
                  name: t,
                  mock: this.config.mock,
                  baseUrl: this.baseUrl,
                  headers: this.config.headers,
                }),
                (r = this.config.resources[t] || {})))
                  a[i] = r[i];
                (e[t].http = new this.HttpClient(a)), e[t].http.on("error", s);
              }
            }),
              (t.resource = function (t) {
                return e[t];
              });
          })(r.prototype),
          (t.exports = r);
      },
      51323: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "authorization"),
          (a.list = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (a.create = function (t, e) {
            return this.http.post(this.path + "/create", { data: t, done: e });
          }),
          (a.update = function (t, e) {
            return this.http.put(this.path + "/" + t.id, { data: t, done: e });
          }),
          (a.save = function (t, e) {
            return a[t.id ? "update" : "create"](t, e);
          }),
          (a.delete = function (t, e) {
            return this.http.del(this.path + "/" + t, { done: e });
          }),
          (a.check = function (t, e) {
            return this.http.get(this.path + "/check", { data: t, done: e });
          }),
          (t.exports = a);
      },
      6414: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "batch"),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (a.suspended = function (t, e) {
            return this.http.put(this.path + "/" + t.id + "/suspended", {
              data: { suspended: !!t.suspended },
              done: e,
            });
          }),
          (a.statistics = function (t, e) {
            return this.http.get(this.path + "/statistics/", {
              data: t,
              done: e,
            });
          }),
          (a.statisticsCount = function (t, e) {
            return this.http.get(this.path + "/statistics/count", {
              data: t,
              done: e,
            });
          }),
          (a.delete = function (t, e) {
            var n = this.path + "/" + t.id;
            return (
              t.cascade && (n += "?cascade=true"), this.http.del(n, { done: e })
            );
          }),
          (t.exports = a);
      },
      97268: function (t, e, n) {
        "use strict";
        function a() {}
        var r = n(10123).extend();
        (r.path = "case-definition"),
          (r.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (r.getByKey = function (t, e) {
            return this.http.get(this.path + "/key/" + t, { done: e });
          }),
          (r.list = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (r.create = function (t, e) {
            var n = this.path + "/";
            return (
              t.id
                ? (n += t.id)
                : ((n = n + "key/" + t.key),
                  t.tenantId && (n = n + "/tenant-id/" + t.tenantId)),
              this.http.post(n + "/create", { data: t, done: e })
            );
          }),
          (r.xml = function (t, e) {
            var n = this.path + "/" + (t.id ? t.id : "key/" + t.key) + "/xml";
            return this.http.get(n, { done: e || a });
          }),
          (r.updateHistoryTimeToLive = function (t, e, n) {
            var a = this.path + "/" + t + "/history-time-to-live";
            return this.http.put(a, { data: e, done: n });
          }),
          (t.exports = r);
      },
      87259: function (t, e, n) {
        "use strict";
        var a = n(10123),
          r = n(37914);
        function i() {}
        var o = a.extend();
        (o.path = "case-execution"),
          (o.list = function (t, e) {
            return (e = e || i), this.http.get(this.path, { data: t, done: e });
          }),
          (o.disable = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/disable", {
              data: e,
              done: n,
            });
          }),
          (o.reenable = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/reenable", {
              data: e,
              done: n,
            });
          }),
          (o.manualStart = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/manual-start", {
              data: e,
              done: n,
            });
          }),
          (o.complete = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/complete", {
              data: e,
              done: n,
            });
          }),
          (o.deleteVariable = function (t, e) {
            return this.http.del(
              this.path +
                "/" +
                t.id +
                "/localVariables/" +
                r.escapeUrl(t.varId),
              { done: e }
            );
          }),
          (o.modifyVariables = function (t, e) {
            return this.http.post(this.path + "/" + t.id + "/localVariables", {
              data: t,
              done: e,
            });
          }),
          (t.exports = o);
      },
      39690: function (t, e, n) {
        "use strict";
        n(67559);
        var a = n(10123),
          r = n(37914),
          i = a.extend();
        (i.path = "case-instance"),
          (i.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (i.list = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (i.close = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/close", {
              data: e,
              done: n,
            });
          }),
          (i.terminate = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/terminate", {
              data: e,
              done: n,
            });
          }),
          (i.setVariable = function (t, e, n) {
            var a = this.path + "/" + t + "/variables/" + r.escapeUrl(e.name);
            return this.http.put(a, { data: e, done: n });
          }),
          (t.exports = i);
      },
      54742: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "decision-definition"),
          (a.list = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (a.getXml = function (t, e) {
            return this.http.get(this.path + "/" + t + "/xml", { done: e });
          }),
          (a.evaluate = function (t, e) {
            return this.http.post(
              this.path + "/" + (t.id ? t.id : "key/" + t.key) + "/evaluate",
              { data: t, done: e }
            );
          }),
          (a.updateHistoryTimeToLive = function (t, e, n) {
            var a = this.path + "/" + t + "/history-time-to-live";
            return this.http.put(a, { data: e, done: n });
          }),
          (t.exports = a);
      },
      25755: function (t, e, n) {
        "use strict";
        n(45477);
        var a = n(10123),
          r = a.extend();
        (r.path = "deployment"),
          (r.create = function (t, e) {
            var n = { "deployment-name": t.deploymentName },
              a = Array.isArray(t.files) ? t.files : [t.files];
            return (
              t.deploymentSource &&
                (n["deployment-source"] = t.deploymentSource),
              t.enableDuplicateFiltering &&
                (n["enable-duplicate-filtering"] = "true"),
              t.deployChangedOnly && (n["deploy-changed-only"] = "true"),
              t.tenantId && (n["tenant-id"] = t.tenantId),
              this.http.post(this.path + "/create", {
                data: {},
                fields: n,
                attachments: a,
                done: e,
              })
            );
          }),
          (r.delete = function (t, e, n) {
            var a = this.path + "/" + t;
            if (e) {
              var r = [];
              for (var i in e) {
                var o = e[i];
                r.push(i + "=" + o);
              }
              r.length && (a += "?" + r.join("&"));
            }
            return this.http.del(a, { done: n });
          }),
          (r.list = function () {
            return a.list.apply(this, arguments);
          }),
          (r.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (r.getResources = function (t, e) {
            return this.http.get(this.path + "/" + t + "/resources", {
              done: e,
            });
          }),
          (r.getResource = function (t, e, n) {
            return this.http.get(this.path + "/" + t + "/resources/" + e, {
              done: n,
            });
          }),
          (r.getResourceData = function (t, e, n) {
            return this.http.get(
              this.path + "/" + t + "/resources/" + e + "/data",
              { accept: "*/*", done: n }
            );
          }),
          (r.redeploy = function (t, e) {
            var n = t.id;
            return (
              delete t.id,
              this.http.post(this.path + "/" + n + "/redeploy", {
                data: t,
                done: e || function () {},
              })
            );
          }),
          (t.exports = r);
      },
      96712: function (t, e, n) {
        "use strict";
        var a = n(10123),
          r = n(37914),
          i = a.extend();
        function o(t, e) {
          return t + "/" + r.escapeUrl(e);
        }
        function s(t, e, n) {
          var a = t + "/key/" + r.escapeUrl(e);
          return (
            "function" != typeof n && (a += "/tenant-id/" + r.escapeUrl(n)), a
          );
        }
        (i.path = "decision-requirements-definition"),
          (i.count = function (t, e) {
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(this.path + "/count", { data: t, done: e })
            );
          }),
          (i.list = function (t, e) {
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(this.path, { data: t, done: e })
            );
          }),
          (i.get = function (t, e) {
            return this.http.get(o(this.path, t), { done: e });
          }),
          (i.getByKey = function (t, e, n) {
            var a = s(this.path, t, e);
            return (
              "function" == typeof e && (n = e), this.http.get(a, { done: n })
            );
          }),
          (i.getXML = function (t, e) {
            return this.http.get(o(this.path, t) + "/xml", { done: e });
          }),
          (i.getXMLByKey = function (t, e, n) {
            var a = s(this.path, t, e) + "/xml";
            return (
              "function" == typeof e && (n = e), this.http.get(a, { done: n })
            );
          }),
          (t.exports = i);
      },
      97224: function (t, e, n) {
        "use strict";
        var a = n(10123),
          r = n(37914),
          i = a.extend();
        (i.path = "execution"),
          (i.deleteVariable = function (t, e) {
            return this.http.del(
              this.path +
                "/" +
                t.id +
                "/localVariables/" +
                r.escapeUrl(t.varId),
              { done: e }
            );
          }),
          (i.modifyVariables = function (t, e) {
            return this.http.post(this.path + "/" + t.id + "/localVariables", {
              data: t,
              done: e,
            });
          }),
          (t.exports = i);
      },
      82625: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "external-task"),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t.id, { data: t, done: e });
          }),
          (a.list = function (t, e) {
            var n = this.path + "/";
            return (
              (n += "?firstResult=" + (t.firstResult || 0)),
              (n += "&maxResults=" + (t.maxResults || 15)),
              this.http.post(n, { data: t, done: e })
            );
          }),
          (a.count = function (t, e) {
            return this.http.post(this.path + "/count", { data: t, done: e });
          }),
          (a.fetchAndLock = function (t, e) {
            return this.http.post(this.path + "/fetchAndLock", {
              data: t,
              done: e,
            });
          }),
          (a.complete = function (t, e) {
            return this.http.post(this.path + "/" + t.id + "/complete", {
              data: t,
              done: e,
            });
          }),
          (a.failure = function (t, e) {
            return this.http.post(this.path + "/" + t.id + "/failure", {
              data: t,
              done: e,
            });
          }),
          (a.unlock = function (t, e) {
            return this.http.post(this.path + "/" + t.id + "/unlock", {
              data: t,
              done: e,
            });
          }),
          (a.retries = function (t, e) {
            return this.http.put(this.path + "/" + t.id + "/retries", {
              data: t,
              done: e,
            });
          }),
          (a.retriesAsync = function (t, e) {
            return this.http.post(this.path + "/retries-async", {
              data: t,
              done: e,
            });
          }),
          (t.exports = a);
      },
      43158: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "filter"),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (a.list = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (a.getTasks = function (t, e) {
            var n = this.path + "/";
            return (
              "string" == typeof t
                ? ((n = n + t + "/list"), (t = {}))
                : ((n = n + t.id + "/list"), delete t.id),
              (n += "?firstResult=" + (t.firstResult || 0)),
              (n += "&maxResults=" + (t.maxResults || 15)),
              this.http.post(n, { data: t, done: e })
            );
          }),
          (a.create = function (t, e) {
            return this.http.post(this.path + "/create", { data: t, done: e });
          }),
          (a.update = function (t, e) {
            return this.http.put(this.path + "/" + t.id, { data: t, done: e });
          }),
          (a.save = function (t, e) {
            return a[t.id ? "update" : "create"](t, e);
          }),
          (a.delete = function (t, e) {
            return this.http.del(this.path + "/" + t, { done: e });
          }),
          (a.authorizations = function (t, e) {
            return "function" == typeof t
              ? this.http.options(this.path, {
                  done: t,
                  headers: { Accept: "application/json" },
                })
              : this.http.options(this.path + "/" + t, {
                  done: e,
                  headers: { Accept: "application/json" },
                });
          }),
          (t.exports = a);
      },
      26805: function (t, e, n) {
        "use strict";
        var a = n(10123),
          r = n(37914);
        function i() {}
        var o = a.extend();
        (o.path = "group"),
          (o.options = function (t, e) {
            var n;
            return (
              "function" == typeof t
                ? ((e = t), (n = ""))
                : void 0 === (n = "string" == typeof t ? t : t.id) && (n = ""),
              this.http.options(this.path + "/" + r.escapeUrl(n), {
                done: e || i,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (o.create = function (t, e) {
            return this.http.post(this.path + "/create", {
              data: t,
              done: e || i,
            });
          }),
          (o.count = function (t, e) {
            return (
              "function" == typeof t ? ((e = t), (t = {})) : (t = t || {}),
              this.http.get(this.path + "/count", { data: t, done: e || i })
            );
          }),
          (o.get = function (t, e) {
            var n = "string" == typeof t ? t : t.id;
            return this.http.get(this.path + "/" + r.escapeUrl(n), {
              data: t,
              done: e || i,
            });
          }),
          (o.list = function (t, e) {
            "function" == typeof t ? ((e = t), (t = {})) : (t = t || {});
            var n = {};
            return (
              t.maxResults &&
                ((n.maxResults = t.maxResults),
                (n.firstResult = t.firstResult)),
              this.http.post(this.path, { data: t, query: n, done: e || i })
            );
          }),
          (o.createMember = function (t, e) {
            return this.http.put(
              this.path +
                "/" +
                r.escapeUrl(t.id) +
                "/members/" +
                r.escapeUrl(t.userId),
              { data: t, done: e || i }
            );
          }),
          (o.deleteMember = function (t, e) {
            return this.http.del(
              this.path +
                "/" +
                r.escapeUrl(t.id) +
                "/members/" +
                r.escapeUrl(t.userId),
              { data: t, done: e || i }
            );
          }),
          (o.update = function (t, e) {
            return this.http.put(this.path + "/" + r.escapeUrl(t.id), {
              data: t,
              done: e || i,
            });
          }),
          (o.delete = function (t, e) {
            return this.http.del(this.path + "/" + r.escapeUrl(t.id), {
              data: t,
              done: e || i,
            });
          }),
          (t.exports = o);
      },
      2094: function (t, e, n) {
        "use strict";
        var a = n(10123),
          r = n(34873),
          i = a.extend();
        (i.path = "history"),
          (i.userOperationCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/user-operation/count", {
                data: t,
                done: e,
              })
            );
          }),
          (i.userOperation = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/user-operation", { data: t, done: e })
            );
          }),
          (i.setUserOperationAnnotation = function (t, e) {
            return this.http.put(
              this.path + "/user-operation/" + t.id + "/set-annotation",
              { data: t, done: e }
            );
          }),
          (i.clearUserOperationAnnotation = function (t, e) {
            return this.http.put(
              this.path + "/user-operation/" + t + "/clear-annotation",
              { done: e }
            );
          }),
          (i.processInstance = function (t, e) {
            "function" == typeof t && ((e = arguments[0]), (t = {}));
            var n = {},
              a = {},
              r = ["firstResult", "maxResults"];
            for (var i in t) r.indexOf(i) > -1 ? (a[i] = t[i]) : (n[i] = t[i]);
            return this.http.post(this.path + "/process-instance", {
              data: n,
              query: a,
              done: e,
            });
          }),
          (i.processInstanceCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/process-instance/count", {
                data: t,
                done: e,
              })
            );
          }),
          (i.deleteProcessInstancesAsync = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/process-instance/delete", {
                data: t,
                done: e,
              })
            );
          }),
          (i.setRemovalTimeToHistoricProcessInstancesAsync = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/process-instance/set-removal-time", {
                data: t,
                done: e,
              })
            );
          }),
          (i.setRemovalTimeToHistoricDecisionInstancesAsync = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(
                this.path + "/decision-instance/set-removal-time",
                { data: t, done: e }
              )
            );
          }),
          (i.setRemovalTimeToHistoricBatchesAsync = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/batch/set-removal-time", {
                data: t,
                done: e,
              })
            );
          }),
          (i.decisionInstance = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/decision-instance", {
                data: t,
                done: e,
              })
            );
          }),
          (i.decisionInstanceCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/decision-instance/count", {
                data: t,
                done: e,
              })
            );
          }),
          (i.deleteDecisionInstancesAsync = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/decision-instance/delete", {
                data: t,
                done: e,
              })
            );
          }),
          (i.batch = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/batch", { data: t, done: e })
            );
          }),
          (i.singleBatch = function (t, e) {
            return this.http.get(this.path + "/batch/" + t, { done: e });
          }),
          (i.batchCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/batch/count", { data: t, done: e })
            );
          }),
          (i.batchDelete = function (t, e) {
            var n = this.path + "/batch/" + t;
            return this.http.del(n, { done: e });
          }),
          (i.report = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              (t.reportType = t.reportType || "duration"),
              (t.periodUnit = t.periodUnit || "month"),
              this.http.get(this.path + "/process-instance/report", {
                data: t,
                done: e,
              })
            );
          }),
          (i.reportAsCsv = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              (t.reportType = t.reportType || "duration"),
              (t.periodUnit = t.periodUnit || "month"),
              this.http.get(this.path + "/process-instance/report", {
                data: t,
                accept: "text/csv",
                done: e,
              })
            );
          }),
          (i.task = function (t, e) {
            "function" == typeof t && ((e = arguments[0]), (t = {}));
            var n = {},
              a = {},
              r = ["firstResult", "maxResults"];
            for (var i in t) r.indexOf(i) > -1 ? (a[i] = t[i]) : (n[i] = t[i]);
            return this.http.post(this.path + "/task", {
              data: n,
              query: a,
              done: e,
            });
          }),
          (i.taskCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/task/count", { data: t, done: e })
            );
          }),
          (i.taskDurationReport = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              (t.reportType = t.reportType || "duration"),
              (t.periodUnit = t.periodUnit || "month"),
              this.http.get(this.path + "/task/report", { data: t, done: e })
            );
          }),
          (i.taskReport = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              (t.reportType = t.reportType || "count"),
              this.http.get(this.path + "/task/report", { data: t, done: e })
            );
          }),
          (i.caseInstance = function (t, e) {
            "function" == typeof t && ((e = arguments[0]), (t = {}));
            var n = {},
              a = {},
              r = ["firstResult", "maxResults"];
            for (var i in t) r.indexOf(i) > -1 ? (a[i] = t[i]) : (n[i] = t[i]);
            return this.http.post(this.path + "/case-instance", {
              data: n,
              query: a,
              done: e,
            });
          }),
          (i.caseInstanceCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/case-instance/count", {
                data: t,
                done: e,
              })
            );
          }),
          (i.caseActivityInstance = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/case-activity-instance", {
                data: t,
                done: e,
              })
            );
          }),
          (i.caseActivityInstanceCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/case-activity-instance/count", {
                data: t,
                done: e,
              })
            );
          }),
          (i.activityInstance = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/activity-instance", {
                data: t,
                done: e,
              })
            );
          }),
          (i.incident = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.get(this.path + "/incident", { data: t, done: e })
            );
          }),
          (i.variableInstance = function (t, e) {
            "function" == typeof t && ((e = arguments[0]), (t = {}));
            var n = {},
              a = {},
              r = ["firstResult", "maxResults", "deserializeValues"];
            for (var i in t) r.indexOf(i) > -1 ? (a[i] = t[i]) : (n[i] = t[i]);
            return this.http.post(this.path + "/variable-instance", {
              data: n,
              query: a,
              done: e,
            });
          }),
          (i.variableInstanceCount = function (t, e) {
            return (
              "function" == typeof t && ((e = arguments[0]), (t = {})),
              this.http.post(this.path + "/variable-instance/count", {
                data: t,
                done: e,
              })
            );
          }),
          (i.caseActivityStatistics = function (t, e) {
            var n = t.id || t;
            return this.http.get(
              this.path + "/case-definition/" + n + "/statistics",
              { done: e }
            );
          }),
          (i.drdStatistics = function (t, e, n) {
            var a =
              this.path +
              "/decision-requirements-definition/" +
              t +
              "/statistics";
            return (
              "function" == typeof e && ((n = e), (e = {})),
              this.http.get(a, { data: e, done: n })
            );
          }),
          (i.cleanupConfiguration = function (t, e) {
            var n = this.path + "/cleanup/configuration";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.deleteVariable = function (t, e) {
            var n = this.path + "/variable-instance/" + t;
            return this.http.del(n, { done: e });
          }),
          (i.deleteAllVariables = function (t, e) {
            var n =
              this.path + "/process-instance/" + t + "/variable-instances";
            return this.http.del(n, { done: e });
          }),
          (i.cleanupJobs = function (t, e) {
            var n = this.path + "/cleanup/jobs";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanup = function (t, e) {
            var n = this.path + "/cleanup";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.post(n, { data: t, done: e })
            );
          }),
          (i.cleanableProcessCount = function (t, e) {
            var n =
              this.path +
              "/process-definition/cleanable-process-instance-report/count";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableProcess = function (t, e) {
            var n =
              this.path +
              "/process-definition/cleanable-process-instance-report";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableCaseCount = function (t, e) {
            var n =
              this.path +
              "/case-definition/cleanable-case-instance-report/count";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableCase = function (t, e) {
            var n =
              this.path + "/case-definition/cleanable-case-instance-report";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableDecisionCount = function (t, e) {
            var n =
              this.path +
              "/decision-definition/cleanable-decision-instance-report/count";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableDecision = function (t, e) {
            var n =
              this.path +
              "/decision-definition/cleanable-decision-instance-report";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableBatchCount = function (t, e) {
            var n = this.path + "/batch/cleanable-batch-report/count";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.cleanableBatch = function (t, e) {
            var n = this.path + "/batch/cleanable-batch-report";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.jobLogList = function (t, e) {
            var n = this.path + "/job-log";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.jobLogCount = function (t, e) {
            var n = this.path + "/job-log/count";
            return (
              "function" == typeof t && ((e = t), (t = {})),
              this.http.get(n, { data: t, done: e })
            );
          }),
          (i.externalTaskLogList =
            r.createSimpleGetQueryFunction("/external-task-log")),
          (i.externalTaskLogCount = r.createSimpleGetQueryFunction(
            "/external-task-log/count"
          )),
          (t.exports = i);
      },
      74938: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "incident"),
          (a.get = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (a.count = function (t, e) {
            return this.http.get(this.path + "/count", { data: t, done: e });
          }),
          (a.setAnnotation = function (t, e) {
            return this.http.put(this.path + "/" + t.id + "/annotation", {
              data: t,
              done: e,
            });
          }),
          (a.clearAnnotation = function (t, e) {
            return this.http.delete(this.path + "/" + t + "/annotation", {
              done: e,
            });
          }),
          (t.exports = a);
      },
      68975: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "job-definition"),
          (a.setRetries = function (t, e) {
            return this.http.put(this.path + "/" + t.id + "/retries", {
              data: t,
              done: e,
            });
          }),
          (a.list = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (t.exports = a);
      },
      76453: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "job"),
          (a.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (a.list = function (t, e) {
            var n = this.path;
            return (
              (n += "?firstResult=" + (t.firstResult || 0)),
              t.maxResults && (n += "&maxResults=" + t.maxResults),
              this.http.post(n, { data: t, done: e })
            );
          }),
          (a.setRetries = function (t, e) {
            return this.http.put(this.path + "/" + t.id + "/retries", {
              data: t,
              done: e,
            });
          }),
          (a.delete = function (t, e) {
            return this.http.del(this.path + "/" + t, { done: e });
          }),
          (a.stacktrace = function (t, e) {
            var n = this.path + "/" + t + "/stacktrace";
            return this.http.get(n, { accept: "text/plain", done: e });
          }),
          (a.recalculateDuedate = function (t, e) {
            var n = this.path + "/" + t.id + "/duedate/recalculate";
            return (
              0 == t.creationDateBased &&
                (n += "?creationDateBased=" + t.creationDateBased),
              this.http.post(n, { done: e })
            );
          }),
          (a.setDuedate = function (t, e) {
            var n = this.path + "/" + t.id + "/duedate";
            return this.http.put(n, { data: t, done: e });
          }),
          (a.suspended = function (t, e) {
            return this.http.put(this.path + "/" + t.id + "/suspended", {
              data: { suspended: !!t.suspended },
              done: e,
            });
          }),
          (t.exports = a);
      },
      5709: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "message"),
          (a.correlate = function (t, e) {
            var n = this.path + "/";
            return this.http.post(n, { data: t, done: e });
          }),
          (t.exports = a);
      },
      89555: function (t, e, n) {
        "use strict";
        n(67559);
        var a = n(10123).extend();
        (a.path = "metrics"),
          (a.sum = function (t, e) {
            var n = this.path + "/" + t.name + "/sum";
            return delete t.name, this.http.get(n, { data: t, done: e });
          }),
          (a.byInterval = function (t, e) {
            return this.http.get(this.path, { data: t, done: e });
          }),
          (t.exports = a);
      },
      30766: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "migration"),
          (a.generate = function (t, e) {
            var n = this.path + "/generate";
            return this.http.post(n, { data: t, done: e });
          }),
          (a.execute = function (t, e) {
            var n = this.path + "/execute";
            return this.http.post(n, { data: t, done: e });
          }),
          (a.executeAsync = function (t, e) {
            var n = this.path + "/executeAsync";
            return this.http.post(n, { data: t, done: e });
          }),
          (a.validate = function (t, e) {
            var n = this.path + "/validate";
            return this.http.post(n, { data: t, done: e });
          }),
          (t.exports = a);
      },
      70460: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "modification"),
          (a.execute = function (t, e) {
            var n = this.path + "/execute";
            return this.http.post(n, { data: t, done: e });
          }),
          (a.executeAsync = function (t, e) {
            var n = this.path + "/executeAsync";
            return this.http.post(n, { data: t, done: e });
          }),
          (t.exports = a);
      },
      95364: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "identity/password-policy"),
          (a.get = function (t) {
            return this.http.get(this.path, { done: t });
          }),
          (a.validate = function (t, e) {
            return (
              "string" == typeof t && (t = { password: t }),
              this.http.post(this.path, { data: t, done: e })
            );
          }),
          (t.exports = a);
      },
      19901: function (t, e, n) {
        "use strict";
        n(7089), n(45477);
        var a = n(60314),
          r = n(10123);
        function i() {}
        var o = r.extend(
          {
            suspend: function (t, e) {
              return (
                "function" == typeof t && ((e = t), (t = {})),
                (t = t || {}),
                (e = e || i),
                this.http.post(this.path, { done: e })
              );
            },
            stats: function (t) {
              return this.http.post(this.path, { done: t || i });
            },
            start: function (t) {
              return this.http.post(this.path, { data: {}, done: t });
            },
          },
          {
            path: "process-definition",
            get: function (t, e) {
              return this.http.get(this.path + "/" + t, { done: e });
            },
            getByKey: function (t, e) {
              return this.http.get(this.path + "/key/" + t, { done: e });
            },
            list: function () {
              return r.list.apply(this, arguments);
            },
            count: function () {
              return r.count.apply(this, arguments);
            },
            formVariables: function (t, e) {
              var n = "";
              if (((e = e || i), t.key)) n = "key/" + t.key;
              else {
                if (!t.id) {
                  var r = new Error(
                    "Process definition task variables needs either a key or an id."
                  );
                  return e(r), a.reject(r);
                }
                n = t.id;
              }
              var o = { deserializeValues: t.deserializeValues };
              return (
                t.names && (o.variableNames = (t.names || []).join(",")),
                this.http.get(this.path + "/" + n + "/form-variables", {
                  data: o,
                  done: e,
                })
              );
            },
            submitForm: function (t, e) {
              var n = "";
              if (((e = e || i), t.key))
                (n = "key/" + t.key),
                  t.tenantId && (n += "/tenant-id/" + t.tenantId);
              else {
                if (!t.id)
                  return e(
                    new Error(
                      "Process definition task variables needs either a key or an id."
                    )
                  );
                n = t.id;
              }
              return this.http.post(this.path + "/" + n + "/submit-form", {
                data: { businessKey: t.businessKey, variables: t.variables },
                done: e,
              });
            },
            delete: function (t, e) {
              e = e || i;
              var n = "";
              if (t.key)
                (n = "key/" + t.key),
                  t.tenantId && (n += "/tenant-id/" + t.tenantId),
                  (n += "/delete");
              else {
                if (!t.id)
                  return e(
                    new Error(
                      "Process definition deletion needs either a key or an id."
                    )
                  );
                n = t.id;
              }
              var a = "?",
                r = "cascade";
              return (
                "boolean" == typeof t[r] && (a += r + "=" + t[r]),
                "boolean" == typeof t[(r = "skipCustomListeners")] &&
                  (a.length > 1 && (a += "&"), (a += r + "=" + t[r])),
                "boolean" == typeof t[(r = "skipIoMappings")] &&
                  (a.length > 1 && (a += "&"), (a += r + "=" + t[r])),
                this.http.del(this.path + "/" + n + a, { done: e })
              );
            },
            startForm: function (t, e) {
              var n =
                this.path +
                "/" +
                (t.key ? "key/" + t.key : t.id) +
                "/startForm";
              return this.http.get(n, { done: e || i });
            },
            xml: function (t, e) {
              var n = this.path + "/" + (t.id ? t.id : "key/" + t.key) + "/xml";
              return this.http.get(n, { done: e || i });
            },
            statistics: function (t, e) {
              var n = this.path;
              return (
                t.id ? (n += "/" + t.id) : t.key && (n += "/key/" + t.key),
                (n += "/statistics"),
                this.http.get(n, { data: t, done: e || i })
              );
            },
            submit: function (t, e) {
              var n = this.path;
              return (
                t.key ? (n += "/key/" + t.key) : (n += "/" + t.id),
                (n += "/submit-form"),
                this.http.post(n, { data: t, done: e })
              );
            },
            suspend: function (t, e, n) {
              return (
                "function" == typeof e && ((n = e), (e = {})),
                (e = e || {}),
                (n = n || i),
                (t = Array.isArray(t) ? t : [t]),
                this.http.post(this.path, { done: n })
              );
            },
            start: function (t, e) {
              var n = this.path + "/";
              return (
                t.id
                  ? (n += t.id)
                  : ((n = n + "key/" + t.key),
                    t.tenantId && (n = n + "/tenant-id/" + t.tenantId)),
                this.http.post(n + "/start", { data: t, done: e })
              );
            },
            updateHistoryTimeToLive: function (t, e, n) {
              var a = this.path + "/" + t + "/history-time-to-live";
              return this.http.put(a, { data: e, done: n });
            },
            restart: function (t, e, n) {
              var a = this.path + "/" + t + "/restart";
              return this.http.post(a, { data: e, done: n });
            },
            restartAsync: function (t, e, n) {
              var a = this.path + "/" + t + "/restart-async";
              return this.http.post(a, { data: e, done: n });
            },
            staticCalledProcessDefinitions: function (t, e) {
              var n = ""
                .concat(this.path, "/")
                .concat(t, "/static-called-process-definitions");
              return this.http.get(n, { done: e });
            },
          }
        );
        t.exports = o;
      },
      88659: function (t, e, n) {
        "use strict";
        n(67559);
        var a = n(10123),
          r = n(37914),
          i = a.extend(
            {},
            {
              path: "process-instance",
              get: function (t, e) {
                return this.http.get(this.path + "/" + t, { done: e });
              },
              create: function (t, e) {
                return this.http.post(t, e);
              },
              list: function (t, e) {
                var n = this.path;
                return (
                  (n += "?firstResult=" + (t.firstResult || 0)),
                  (n += "&maxResults=" + (t.maxResults || 15)),
                  this.http.post(n, { data: t, done: e })
                );
              },
              count: function (t, e) {
                var n = this.path + "/count";
                return this.http.post(n, { data: t, done: e });
              },
              getActivityInstances: function (t, e) {
                return this.http.get(
                  this.path + "/" + t + "/activity-instances",
                  { done: e }
                );
              },
              modify: function (t, e) {
                return this.http.post(
                  this.path + "/" + t.id + "/modification",
                  { data: t, done: e }
                );
              },
              modifyAsync: function (t, e) {
                return this.http.post(
                  this.path + "/" + t.id + "/modification-async",
                  { data: t, done: e }
                );
              },
              deleteAsync: function (t, e) {
                return this.http.post(this.path + "/delete", {
                  data: t,
                  done: e,
                });
              },
              deleteAsyncHistoricQueryBased: function (t, e) {
                return this.http.post(
                  this.path + "/delete-historic-query-based",
                  { data: t, done: e }
                );
              },
              setJobsRetriesAsync: function (t, e) {
                return this.http.post(this.path + "/job-retries", {
                  data: t,
                  done: e,
                });
              },
              setJobsRetriesAsyncHistoricQueryBased: function (t, e) {
                return this.http.post(
                  this.path + "/job-retries-historic-query-based",
                  { data: t, done: e }
                );
              },
              suspendAsync: function (t, e) {
                return this.http.post(this.path + "/suspended-async", {
                  data: t,
                  done: e,
                });
              },
              setVariablesAsync: function (t, e) {
                return this.http.post(this.path + "/variables-async", {
                  data: t,
                  done: e,
                });
              },
              correlateMessageAsync: function (t, e) {
                return this.http.post(this.path + "/message-async", {
                  data: t,
                  done: e,
                });
              },
              setVariable: function (t, e, n) {
                var a =
                  this.path + "/" + t + "/variables/" + r.escapeUrl(e.name);
                return this.http.put(a, { data: e, done: n });
              },
            }
          );
        t.exports = i;
      },
      74928: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "task/report"),
          (a.countByCandidateGroup = function (t) {
            return this.http.get(this.path + "/candidate-group-count", {
              done: t,
            });
          }),
          (a.countByCandidateGroupAsCsv = function (t) {
            return this.http.get(this.path + "/candidate-group-count", {
              accept: "text/csv",
              done: t,
            });
          }),
          (t.exports = a);
      },
      50901: function (t, e, n) {
        "use strict";
        n(45477);
        var a = n(60314),
          r = n(10123),
          i = n(37914);
        function o() {}
        var s = r.extend();
        (s.path = "task"),
          (s.list = function (t, e) {
            e = e || o;
            var n = a.defer();
            return (
              this.http.get(this.path, {
                data: t,
                done: function (t, a) {
                  if (t) return e(t), n.reject(t);
                  if (a._embedded) {
                    var r = a._embedded.task || a._embedded.tasks,
                      i = a._embedded.processDefinition;
                    for (var o in r) {
                      var s = r[o];
                      for (var c in ((s._embedded = s._embedded || {}), i))
                        if (i[c].id === s.processDefinitionId) {
                          s._embedded.processDefinition = [i[c]];
                          break;
                        }
                    }
                  }
                  e(null, a), n.resolve(a);
                },
              }),
              n.promise
            );
          }),
          (s.get = function (t, e) {
            return this.http.get(this.path + "/" + t, { done: e });
          }),
          (s.comments = function (t, e) {
            return this.http.get(this.path + "/" + t + "/comment", { done: e });
          }),
          (s.identityLinks = function (t, e) {
            return this.http.get(this.path + "/" + t + "/identity-links", {
              done: e,
            });
          }),
          (s.identityLinksAdd = function (t, e, n) {
            return (
              2 === arguments.length &&
                ((n = arguments[1]), (t = (e = arguments[0]).id)),
              this.http.post(this.path + "/" + t + "/identity-links", {
                data: e,
                done: n,
              })
            );
          }),
          (s.identityLinksDelete = function (t, e, n) {
            return (
              2 === arguments.length &&
                ((n = arguments[1]), (t = (e = arguments[0]).id)),
              this.http.post(this.path + "/" + t + "/identity-links/delete", {
                data: e,
                done: n,
              })
            );
          }),
          (s.createComment = function (t, e, n) {
            return this.http.post(this.path + "/" + t + "/comment/create", {
              data: "string" == typeof e ? { message: e } : e,
              done: n,
            });
          }),
          (s.create = function (t, e) {
            return this.http.post(this.path + "/create", { data: t, done: e });
          }),
          (s.update = function (t, e) {
            return this.http.put(this.path + "/" + t.id, { data: t, done: e });
          }),
          (s.assignee = function (t, e, n) {
            var a = { userId: e };
            return (
              2 === arguments.length &&
                ((t = arguments[0].taskId),
                (a.userId = arguments[0].userId),
                (n = arguments[1])),
              this.http.post(this.path + "/" + t + "/assignee", {
                data: a,
                done: n,
              })
            );
          }),
          (s.delegate = function (t, e, n) {
            var a = { userId: e };
            return (
              2 === arguments.length &&
                ((t = arguments[0].taskId),
                (a.userId = arguments[0].userId),
                (n = arguments[1])),
              this.http.post(this.path + "/" + t + "/delegate", {
                data: a,
                done: n,
              })
            );
          }),
          (s.claim = function (t, e, n) {
            var a = { userId: e };
            return (
              2 === arguments.length &&
                ((t = arguments[0].taskId),
                (a.userId = arguments[0].userId),
                (n = arguments[1])),
              this.http.post(this.path + "/" + t + "/claim", {
                data: a,
                done: n,
              })
            );
          }),
          (s.unclaim = function (t, e) {
            return (
              "string" != typeof t && (t = t.taskId),
              this.http.post(this.path + "/" + t + "/unclaim", { done: e })
            );
          }),
          (s.submitForm = function (t, e) {
            if (((e = e || o), !t.id)) {
              var n = new Error("Task submitForm needs a task id.");
              return e(n), a.reject(n);
            }
            return this.http.post(this.path + "/" + t.id + "/submit-form", {
              data: { variables: t.variables },
              done: e,
            });
          }),
          (s.complete = function (t, e) {
            if (((e = e || o), !t.id)) {
              var n = new Error("Task complete needs a task id.");
              return e(n), a.reject(n);
            }
            return this.http.post(this.path + "/" + t.id + "/complete", {
              data: { variables: t.variables },
              done: e,
            });
          }),
          (s.bpmnEscalation = function (t, e) {
            if (((e = e || o), !t.id || !t.escalationCode)) {
              var n = new Error(
                "Task bpmnEscalation needs a task id and escalation code."
              );
              return e(n), a.reject(n);
            }
            return this.http.post(this.path + "/" + t.id + "/bpmnEscalation", {
              data: {
                escalationCode: t.escalationCode,
                variables: t.variables,
              },
              done: e,
            });
          }),
          (s.bpmnError = function (t, e) {
            if (((e = e || o), !t.id || !t.errorCode)) {
              var n = new Error(
                "Task bpmnError needs a task id and error code."
              );
              return e(n), a.reject(n);
            }
            return this.http.post(this.path + "/" + t.id + "/bpmnError", {
              data: {
                variables: t.variables,
                errorCode: t.errorCode,
                errorMessage: t.errorMessage,
              },
              done: e,
            });
          }),
          (s.formVariables = function (t, e) {
            e = e || o;
            var n = "";
            if (t.key) n = "key/" + t.key;
            else {
              if (!t.id) {
                var r = new Error(
                  "Task variables needs either a key or an id."
                );
                return e(r), a.reject(r);
              }
              n = t.id;
            }
            var i = { deserializeValues: t.deserializeValues };
            return (
              t.names && (i.variableNames = t.names.join(",")),
              this.http.get(this.path + "/" + n + "/form-variables", {
                data: i,
                done: e,
              })
            );
          }),
          (s.form = function (t, e) {
            return this.http.get(this.path + "/" + t + "/form", { done: e });
          }),
          (s.localVariable = function (t, e) {
            return this.http.put(
              this.path + "/" + t.id + "/localVariables/" + t.varId,
              { data: t, done: e }
            );
          }),
          (s.localVariables = function (t, e) {
            return this.http.get(this.path + "/" + t + "/localVariables", {
              done: e,
            });
          }),
          (s.modifyVariables = function (t, e) {
            return this.http.post(this.path + "/" + t.id + "/localVariables", {
              data: t,
              done: e,
            });
          }),
          (s.deleteVariable = function (t, e) {
            return this.http.del(
              this.path +
                "/" +
                t.id +
                "/localVariables/" +
                i.escapeUrl(t.varId),
              { done: e }
            );
          }),
          (t.exports = s);
      },
      27033: function (t, e, n) {
        "use strict";
        function a() {}
        var r = n(10123).extend();
        (r.path = "telemetry"),
          (r.get = function (t) {
            return this.http.get(this.path + "/configuration", { done: t });
          }),
          (r.configure = function (t, e) {
            return (
              "boolean" == typeof t && (t = { enableTelemetry: t }),
              this.http.post(this.path + "/configuration", { data: t, done: e })
            );
          }),
          (r.fetchData = function (t, e) {
            return (
              "function" == typeof t && ((e = t), (t = {})),
              (t = t || {}),
              (e = e || a),
              this.http.get(this.path + "/data", { data: t, done: e })
            );
          }),
          (t.exports = r);
      },
      77840: function (t, e, n) {
        "use strict";
        var a = n(10123),
          r = n(37914);
        function i() {}
        var o = a.extend();
        (o.path = "tenant"),
          (o.create = function (t, e) {
            return this.http.post(this.path + "/create", {
              data: t,
              done: e || i,
            });
          }),
          (o.count = function (t, e) {
            return (
              "function" == typeof t ? ((e = t), (t = {})) : (t = t || {}),
              this.http.get(this.path + "/count", { data: t, done: e || i })
            );
          }),
          (o.get = function (t, e) {
            var n;
            return (
              "string" == typeof t
                ? ((n = t), (t = {}))
                : ((n = t.id), delete t.id),
              this.http.get(this.path + "/" + r.escapeUrl(n), {
                data: t,
                done: e || i,
              })
            );
          }),
          (o.list = function (t, e) {
            return (
              "function" == typeof t ? ((e = t), (t = {})) : (t = t || {}),
              this.http.get(this.path, { data: t, done: e || i })
            );
          }),
          (o.createUserMember = function (t, e) {
            return this.http.put(
              this.path +
                "/" +
                r.escapeUrl(t.id) +
                "/user-members/" +
                r.escapeUrl(t.userId),
              { data: t, done: e || i }
            );
          }),
          (o.createGroupMember = function (t, e) {
            return this.http.put(
              this.path +
                "/" +
                r.escapeUrl(t.id) +
                "/group-members/" +
                r.escapeUrl(t.groupId),
              { data: t, done: e || i }
            );
          }),
          (o.deleteUserMember = function (t, e) {
            return this.http.del(
              this.path +
                "/" +
                r.escapeUrl(t.id) +
                "/user-members/" +
                r.escapeUrl(t.userId),
              { data: t, done: e || i }
            );
          }),
          (o.deleteGroupMember = function (t, e) {
            return this.http.del(
              this.path +
                "/" +
                r.escapeUrl(t.id) +
                "/group-members/" +
                r.escapeUrl(t.groupId),
              { data: t, done: e || i }
            );
          }),
          (o.update = function (t, e) {
            return this.http.put(this.path + "/" + r.escapeUrl(t.id), {
              data: t,
              done: e || i,
            });
          }),
          (o.delete = function (t, e) {
            return this.http.del(this.path + "/" + r.escapeUrl(t.id), {
              data: t,
              done: e || i,
            });
          }),
          (o.options = function (t, e) {
            var n;
            return (
              "function" == typeof t
                ? ((e = t), (n = ""))
                : void 0 === (n = "string" == typeof t ? t : t.id) && (n = ""),
              this.http.options(this.path + "/" + r.escapeUrl(n), {
                done: e || i,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (t.exports = o);
      },
      23575: function (t, e, n) {
        "use strict";
        var a = n(60314),
          r = n(10123),
          i = n(37914);
        function o() {}
        var s = r.extend();
        (s.path = "user"),
          (s.options = function (t, e) {
            var n;
            return (
              "function" == typeof t
                ? ((e = t), (n = ""))
                : void 0 === (n = "string" == typeof t ? t : t.id) && (n = ""),
              this.http.options(this.path + "/" + i.escapeUrl(n), {
                done: e || o,
                headers: { Accept: "application/json" },
              })
            );
          }),
          (s.create = function (t, e) {
            (t = t || {}), (e = e || o);
            var n = ["id", "firstName", "lastName", "password"];
            for (var r in n) {
              var i = n[r];
              if (!t[i]) {
                var s = new Error("Missing " + i + " option to create user");
                return e(s), a.reject(s);
              }
            }
            var c = {
              profile: {
                id: t.id,
                firstName: t.firstName,
                lastName: t.lastName,
              },
              credentials: { password: t.password },
            };
            return (
              t.email && (c.profile.email = t.email),
              this.http.post(this.path + "/create", { data: c, done: e })
            );
          }),
          (s.list = function (t, e) {
            return (
              "function" == typeof t ? ((e = t), (t = {})) : (t = t || {}),
              this.http.get(this.path, { data: t, done: e || o })
            );
          }),
          (s.count = function (t, e) {
            return (
              "function" == typeof t ? ((e = t), (t = {})) : (t = t || {}),
              this.http.get(this.path + "/count", { data: t, done: e || o })
            );
          }),
          (s.profile = function (t, e) {
            var n = "string" == typeof t ? t : t.id;
            return this.http.get(
              this.path + "/" + i.escapeUrl(n) + "/profile",
              { done: e || o }
            );
          }),
          (s.updateProfile = function (t, e) {
            if (((e = e || o), !(t = t || {}).id)) {
              var n = new Error("Missing id option to update user profile");
              return e(n), a.reject(n);
            }
            return this.http.put(
              this.path + "/" + i.escapeUrl(t.id) + "/profile",
              { data: t, done: e }
            );
          }),
          (s.updateCredentials = function (t, e) {
            var n;
            if (((e = e || o), !(t = t || {}).id))
              return (
                e(
                  (n = new Error(
                    "Missing id option to update user credentials"
                  ))
                ),
                a.reject(n)
              );
            if (!t.password)
              return (
                e(
                  (n = new Error(
                    "Missing password option to update user credentials"
                  ))
                ),
                a.reject(n)
              );
            var r = { password: t.password };
            return (
              t.authenticatedUserPassword &&
                (r.authenticatedUserPassword = t.authenticatedUserPassword),
              this.http.put(
                this.path + "/" + i.escapeUrl(t.id) + "/credentials",
                { data: r, done: e }
              )
            );
          }),
          (s.delete = function (t, e) {
            var n = "string" == typeof t ? t : t.id;
            return this.http.del(this.path + "/" + i.escapeUrl(n), {
              done: e || o,
            });
          }),
          (s.unlock = function (t, e) {
            var n = "string" == typeof t ? t : t.id;
            return this.http.post(
              this.path + "/" + i.escapeUrl(n) + "/unlock",
              { done: e || o }
            );
          }),
          (t.exports = s);
      },
      73420: function (t, e, n) {
        "use strict";
        var a = n(10123).extend();
        (a.path = "variable-instance"),
          (a.instances = function (t, e) {
            var n = {},
              a = {},
              r = ["firstResult", "maxResults", "deserializeValues"];
            for (var i in t) r.indexOf(i) > -1 ? (a[i] = t[i]) : (n[i] = t[i]);
            return this.http.post(this.path, { data: n, query: a, done: e });
          }),
          (a.count = function (t, e) {
            var n = this.path + "/count";
            return this.http.post(n, { data: t, done: e });
          }),
          (t.exports = a);
      },
      99099: function (t, e, n) {
        "use strict";
        var a = n(32278);
        function r() {
          this.initialize();
        }
        (r.extend = function (t, e) {
          (t = t || {}), (e = e || {});
          var n,
            a,
            r,
            i,
            o = this;
          for (r in ((n =
            t && Object.hasOwnProperty.call(o, "constructor")
              ? t.constructor
              : function () {
                  return o.apply(this, arguments);
                }),
          o))
            n[r] = o[r];
          for (r in e) n[r] = e[r];
          for (i in (((a = function () {
            this.constructor = n;
          }).prototype = o.prototype),
          (n.prototype = new a()),
          t))
            n.prototype[i] = t[i];
          return n;
        }),
          (r.prototype.initialize = function () {}),
          a.attach(r),
          (t.exports = r);
      },
      32278: function (t) {
        "use strict";
        var e = {};
        function n(t) {
          var e,
            n = !1;
          return function () {
            return (
              n || ((n = !0), (e = t.apply(this, arguments)), (t = null)), e
            );
          };
        }
        function a(t, e) {
          (t._events = t._events || {}), (t._events[e] = t._events[e] || []);
        }
        (e.attach = function (t) {
          (t.on = this.on),
            (t.once = this.once),
            (t.off = this.off),
            (t.trigger = this.trigger),
            (t._events = {});
        }),
          (e.on = function (t, e) {
            return a(this, t), this._events[t].push(e), this;
          }),
          (e.once = function (t, e) {
            var a = this,
              r = n(function () {
                a.off(t, n), e.apply(this, arguments);
              });
            return (r._callback = e), this.on(t, r);
          }),
          (e.off = function (t, e) {
            if ((a(this, t), !e)) return delete this._events[t], this;
            var n,
              r = [];
            for (n in this._events[t])
              this._events[t][n] !== e && r.push(this._events[t][n]);
            return (this._events[t] = r), this;
          }),
          (e.trigger = function () {
            var t,
              e = (function (t) {
                var e,
                  n = [];
                for (e in t) n.push(t[e]);
                return n;
              })(arguments),
              n = e.shift();
            for (t in (a(this, n), this._events[n]))
              this._events[n][t](this, e);
            return this;
          }),
          (t.exports = e);
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
        function extend(t, e) {
          for (var n in e) t[n] = e[n];
          return t;
        }
        function CamundaForm(t) {
          if (!t)
            throw new Error("CamundaForm need to be initialized with options.");
          var e = (t.done =
            t.done ||
            function (t) {
              if (t) throw t;
            });
          return (
            t.client
              ? (this.client = t.client)
              : (this.client = new CamSDK.Client(t.clientConfig || {})),
            t.taskId || t.processDefinitionId || t.processDefinitionKey
              ? ((this.taskId = t.taskId),
                this.taskId &&
                  (this.taskBasePath =
                    this.client.baseUrl + "/task/" + this.taskId),
                (this.processDefinitionId = t.processDefinitionId),
                (this.processDefinitionKey = t.processDefinitionKey),
                (this.formElement = t.formElement),
                (this.containerElement = t.containerElement),
                (this.formUrl = t.formUrl),
                this.formElement || this.containerElement
                  ? this.formElement || this.formUrl
                    ? ((this.variableManager = new VariableManager({
                        client: this.client,
                      })),
                      (this.formFieldHandlers = t.formFieldHandlers || [
                        InputFieldHandler,
                        ChoicesFieldHandler,
                        FileDownloadHandler,
                        ErrorButtonHandler,
                        EscalationButtonHandler,
                      ]),
                      (this.businessKey = null),
                      (this.fields = []),
                      (this.scripts = []),
                      (this.options = t),
                      Events.attach(this),
                      void this.initialize(e))
                    : e(
                        new Error(
                          "Camunda form needs to be intialized with either 'formElement' or 'formUrl'"
                        )
                      )
                  : e(
                      new Error(
                        "CamundaForm needs to be initilized with either 'formElement' or 'containerElement'"
                      )
                    ))
              : e(
                  new Error(
                    "Cannot initialize Taskform: either 'taskId' or 'processDefinitionId' or 'processDefinitionKey' must be provided"
                  )
                )
          );
        }
        (CamundaForm.prototype.initializeHandler = function (t) {
          var e = this,
            n = t.selector;
          $(n, e.formElement).each(function () {
            e.fields.push(new t(this, e.variableManager, e));
          });
        }),
          (CamundaForm.prototype.initialize = function (t) {
            t =
              t ||
              function (t) {
                if (t) throw t;
              };
            var e = this;
            if (this.formUrl)
              this.client.http.load(this.formUrl, {
                accept: "*/*",
                done: function (n, a) {
                  if (n) return t(n);
                  try {
                    e.renderForm(a), e.initializeForm(t);
                  } catch (e) {
                    t(e);
                  }
                },
                data: extend(
                  { noCache: Date.now() },
                  this.options.urlParams || {}
                ),
              });
            else
              try {
                this.initializeForm(t);
              } catch (e) {
                t(e);
              }
          }),
          (CamundaForm.prototype.renderForm = function (t) {
            $(this.containerElement)
              .html("")
              .append('<div class="injected-form-wrapper">' + t + "</div>");
            var e = (this.formElement = $("form", this.containerElement));
            if (1 !== e.length)
              throw new Error(
                "Form must provide exactly one element <form ..>"
              );
            e.attr("name") || e.attr("name", "$$camForm");
          }),
          (CamundaForm.prototype.initializeForm = function (t) {
            var e = this;
            this.initializeFormScripts(),
              this.initializeFieldHandlers(),
              this.executeFormScripts(),
              this.fireEvent("form-loaded"),
              this.fetchVariables(function (n, a) {
                if (n) throw n;
                e.mergeVariables(a),
                  e.storeOriginalValues(a),
                  e.fireEvent("variables-fetched"),
                  e.restore(),
                  e.fireEvent("variables-restored"),
                  e.applyVariables(),
                  e.fireEvent("variables-applied"),
                  t(null, e);
              });
          }),
          (CamundaForm.prototype.initializeFieldHandlers = function () {
            for (var t in this.formFieldHandlers)
              this.initializeHandler(this.formFieldHandlers[t]);
          }),
          (CamundaForm.prototype.initializeFormScripts = function () {
            for (
              var t = $(
                  "script[" + constants.DIRECTIVE_CAM_SCRIPT + "]",
                  this.formElement
                ),
                e = 0;
              e < t.length;
              e++
            )
              this.scripts.push(t[e].text);
          }),
          (CamundaForm.prototype.executeFormScripts = function () {
            for (var t = 0; t < this.scripts.length; t++)
              this.executeFormScript(this.scripts[t]);
          }),
          (CamundaForm.prototype.executeFormScript = function (script) {
            (function (camForm) {
              eval(script);
            })(this);
          }),
          (CamundaForm.prototype.store = function (t) {
            var e =
              this.taskId || this.processDefinitionId || this.caseInstanceId;
            if (!e) {
              if ("function" == typeof t)
                return t(new Error("Cannot determine the storage ID"));
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
                for (var a in this.variableManager.variables)
                  ["Bytes", "File"].includes(
                    this.variableManager.variables[a].type
                  ) || (n.vars[a] = this.variableManager.variables[a].value);
                localStorage.setItem("camForm:" + e, JSON.stringify(n));
              } catch (e) {
                if ("function" == typeof t) return t(e);
                throw e;
              }
              this.fireEvent("variables-stored"), "function" == typeof t && t();
            }
          }),
          (CamundaForm.prototype.isRestorable = function () {
            var t =
              this.taskId || this.processDefinitionId || this.caseInstanceId;
            if (!t) throw new Error("Cannot determine the storage ID");
            if (!localStorage.getItem("camForm:" + t)) return !1;
            var e = localStorage.getItem("camForm:" + t);
            try {
              e = JSON.parse(e);
            } catch (t) {
              return !1;
            }
            return !(!e || !Object.keys(e).length);
          }),
          (CamundaForm.prototype.restore = function (t) {
            var e,
              n = this.variableManager.variables,
              a =
                this.taskId ||
                this.processDefinitionId ||
                this.caseDefinitionId;
            if (!a) {
              if ("function" == typeof t)
                return t(new Error("Cannot determine the storage ID"));
              throw new Error("Cannot determine the storage ID");
            }
            if (!this.isRestorable())
              return "function" == typeof t ? t() : void 0;
            try {
              (e = localStorage.getItem("camForm:" + a)),
                (e = JSON.parse(e).vars);
            } catch (e) {
              if ("function" == typeof t) return t(e);
              throw e;
            }
            for (var r in e)
              n[r] ? (n[r].value = e[r]) : (n[r] = { name: r, value: e[r] });
            "function" == typeof t && t();
          }),
          (CamundaForm.prototype.submit = function (t) {
            var e = this.taskId || this.processDefinitionId;
            if (
              ((this.submitPrevented = !1),
              this.fireEvent("submit"),
              this.submitPrevented)
            ) {
              var n = new Error("camForm submission prevented");
              return this.fireEvent("submit-failed", n), t && t(n);
            }
            try {
              this.retrieveVariables();
            } catch (e) {
              return t && t(e);
            }
            var a = this;
            this.transformFiles(function () {
              a.submitVariables(function (n, r) {
                return n
                  ? (a.fireEvent("submit-failed", n), t && t(n))
                  : (localStorage.removeItem("camForm:" + e),
                    a.fireEvent("submit-success"),
                    t && t(null, r));
              });
            });
          }),
          (CamundaForm.prototype.error = function (t, e, n) {
            var a = this.taskId || this.processDefinitionId;
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
            } catch (t) {
              return n && n(t);
            }
            var i = this;
            this.transformFiles(function () {
              var r = {
                variables: i.parseVariables(),
                id: i.taskId,
                errorCode: t,
                errorMessage: e,
              };
              i.client.resource("task").bpmnError(r, function (t, e) {
                return t
                  ? (i.fireEvent("error-failed", t), n && n(t))
                  : (localStorage.removeItem("camForm:" + a),
                    i.fireEvent("error-success"),
                    n && n(null, e));
              });
            });
          }),
          (CamundaForm.prototype.escalate = function (t, e) {
            var n = this.taskId || this.processDefinitionId;
            if (
              ((this.escalationPrevented = !1),
              this.fireEvent("escalation"),
              this.escalationPrevented)
            ) {
              var a = new Error("camForm escalation prevented");
              return this.fireEvent("escalation-failed", a), e && e(a);
            }
            try {
              this.retrieveVariables();
            } catch (t) {
              return e && e(t);
            }
            var r = this;
            this.transformFiles(function () {
              var a = {
                variables: r.parseVariables(),
                id: r.taskId,
                escalationCode: t,
              };
              r.client.resource("task").bpmnEscalation(a, function (t, a) {
                return t
                  ? (r.fireEvent("escalation-failed", t), e && e(t))
                  : (localStorage.removeItem("camForm:" + n),
                    r.fireEvent("escalation-success"),
                    e && e(null, a));
              });
            });
          }),
          (CamundaForm.prototype.transformFiles = function (t) {
            var e = 1,
              n = function () {
                0 == --e && t();
              },
              a = function (t) {
                if (0 === t) return "0 Byte";
                var e = Math.floor(Math.log(t) / Math.log(1e3));
                return (
                  (t / Math.pow(1e3, e)).toPrecision(3) +
                  " " +
                  ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][e]
                );
              };
            for (var r in this.fields) {
              var i = this.fields[r].element[0];
              if ("file" === i.getAttribute("type")) {
                var o =
                  this.variableManager.variables[this.fields[r].variableName];
                if ("function" == typeof FileReader && i.files.length > 0) {
                  if (
                    i.files[0].size >
                    (parseInt(i.getAttribute("cam-max-filesize"), 10) || 5e6)
                  )
                    throw new Error(
                      "Maximum file size of " +
                        a(
                          parseInt(i.getAttribute("cam-max-filesize"), 10) ||
                            5e6
                        ) +
                        " exceeded."
                    );
                  var s = new FileReader();
                  (s.onloadend = (function (t, e, a) {
                    return function (t) {
                      for (
                        var r = "",
                          i = new Uint8Array(t.target.result),
                          o = i.byteLength,
                          s = 0;
                        s < o;
                        s++
                      )
                        r += String.fromCharCode(i[s]);
                      (a.value = btoa(r)),
                        "file" === a.type.toLowerCase() &&
                          (a.valueInfo = {
                            filename: e.files[0].name,
                            mimeType: e.files[0].type,
                          }),
                        n();
                    };
                  })(0, i, o)),
                    s.readAsArrayBuffer(i.files[0]),
                    e++;
                } else (o.value = ""), (o.valueInfo = { filename: "" });
              }
            }
            n();
          }),
          (CamundaForm.prototype.fetchVariables = function (t) {
            t = t || function () {};
            var e = this.variableManager.variableNames();
            if (e.length) {
              var n = { names: e, deserializeValues: !1 };
              this.taskId
                ? ((n.id = this.taskId),
                  this.client.resource("task").formVariables(n, t))
                : ((n.id = this.processDefinitionId),
                  (n.key = this.processDefinitionKey),
                  this.client
                    .resource("process-definition")
                    .formVariables(n, t));
            } else t();
          }),
          (CamundaForm.prototype.parseVariables = function () {
            var t = this.variableManager,
              e = t.variables;
            this.fields.forEach(function (t) {
              e[t.variableName] &&
                ((e[t.variableName].defaultValue = t.originalValue),
                ("" !== t.originalValue && void 0 !== t.originalValue) ||
                  (e[t.variableName].defaultValue = e[t.variableName].value));
            });
            var n = {};
            for (var a in e) {
              var r = e[a].value;
              (t.isDirty(a) || e[a].defaultValue != r) &&
                (t.isJsonVariable(a) && (r = JSON.stringify(r)),
                r &&
                  t.isDateVariable(a) &&
                  (r = moment(r, moment.ISO_8601).format(
                    "YYYY-MM-DDTHH:mm:ss.SSSZZ"
                  )),
                (n[a] = {
                  value: r,
                  type: e[a].type,
                  valueInfo: e[a].valueInfo,
                }));
            }
            return n;
          }),
          (CamundaForm.prototype.submitVariables = function (t) {
            t = t || function () {};
            var e = { variables: this.parseVariables() };
            if (this.taskId)
              (e.id = this.taskId),
                this.client.resource("task").submitForm(e, t);
            else {
              var n =
                this.businessKey ||
                this.formElement
                  .find('input[type="text"][cam-business-key]')
                  .val();
              n && (e.businessKey = n),
                (e.id = this.processDefinitionId),
                (e.key = this.processDefinitionKey),
                this.client.resource("process-definition").submitForm(e, t);
            }
          }),
          (CamundaForm.prototype.storeOriginalValues = function (t) {
            for (var e in t)
              this.variableManager.setOriginalValue(e, t[e].value);
          }),
          (CamundaForm.prototype.mergeVariables = function (t) {
            var e = this.variableManager.variables;
            for (var n in t) {
              if (e[n]) for (var a in t[n]) e[n][a] = e[n][a] || t[n][a];
              else e[n] = t[n];
              this.variableManager.isJsonVariable(n) &&
                (e[n].value = JSON.parse(t[n].value));
              var r = e[n].type;
              !this.taskBasePath ||
                ("Bytes" !== r && "File" !== r) ||
                (e[n].contentUrl =
                  this.taskBasePath + "/variables/" + e[n].name + "/data"),
                (this.variableManager.isVariablesFetched = !0);
            }
          }),
          (CamundaForm.prototype.applyVariables = function () {
            for (var t in this.fields) this.fields[t].applyValue();
          }),
          (CamundaForm.prototype.retrieveVariables = function () {
            for (var t in this.fields) this.fields[t].getValue();
          }),
          (CamundaForm.prototype.fireEvent = function (t, e) {
            this.trigger(t, e);
          }),
          (CamundaForm.$ = $),
          (CamundaForm.VariableManager = VariableManager),
          (CamundaForm.fields = {}),
          (CamundaForm.fields.InputFieldHandler = InputFieldHandler),
          (CamundaForm.fields.ChoicesFieldHandler = ChoicesFieldHandler),
          (CamundaForm.cleanLocalStorage = function (t) {
            for (var e = 0; e < localStorage.length; e++) {
              var n = localStorage.key(e);
              if (0 === n.indexOf("camForm:"))
                JSON.parse(localStorage.getItem(n)).date < t &&
                  (localStorage.removeItem(n), e--);
            }
          }),
          (CamundaForm.extend = BaseClass.extend),
          (module.exports = CamundaForm);
      },
      99842: function (t) {
        "use strict";
        t.exports = {
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
      32684: function (t, e, n) {
        "use strict";
        var a = n(99099),
          r = n(79129);
        function i() {}
        function o(t, e, n) {
          (this.element = r(t)),
            (this.variableManager = e),
            (this.form = n),
            (this.variableName = null),
            this.initialize();
        }
        (o.selector = null),
          (o.extend = a.extend),
          (o.prototype.initialize = i),
          (o.prototype.applyValue = i),
          (o.prototype.getValue = i),
          (t.exports = o);
      },
      38986: function (t, e, n) {
        "use strict";
        n(67762), n(84392);
        var a = n(99842),
          r = n(32684),
          i = n(79129),
          o = r.extend(
            {
              initialize: function () {
                var t = (this.variableName = this.element.attr(
                    a.DIRECTIVE_CAM_VARIABLE_NAME
                  )),
                  e = (this.variableType = this.element.attr(
                    a.DIRECTIVE_CAM_VARIABLE_TYPE
                  )),
                  n = (this.choicesVariableName = this.element.attr(
                    a.DIRECTIVE_CAM_CHOICES
                  ));
                this.variableManager.createVariable({ name: t, type: e }),
                  n && this.variableManager.fetchVariable(n),
                  (this.previousValue = this.originalValue = ""),
                  (this.variableName = t);
              },
              applyValue: function () {
                var t = this.element[0].selectedIndex;
                if (this.choicesVariableName) {
                  var e = this.variableManager.variableValue(
                    this.choicesVariableName
                  );
                  if (e)
                    if (e instanceof Array)
                      for (var n = 0; n < e.length; n++) {
                        var a = e[n];
                        this.element.find('option[text="' + a + '"]').length ||
                          this.element.append(
                            i("<option>", { value: a, text: a })
                          );
                      }
                    else
                      for (var r in e)
                        this.element.find('option[value="' + r + '"]').length ||
                          this.element.append(
                            i("<option>", { value: r, text: e[r] })
                          );
                }
                (this.element[0].selectedIndex = t),
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
                var t;
                return (
                  this.element.prop("multiple")
                    ? ((t = []),
                      this.element.find("option:selected").each(function () {
                        t.push(i(this).val());
                      }))
                    : (t = this.element.find("option:selected").attr("value")),
                  this.variableManager.variableValue(this.variableName, t),
                  t
                );
              },
            },
            { selector: "select[" + a.DIRECTIVE_CAM_VARIABLE_NAME + "]" }
          );
        t.exports = o;
      },
      81864: function (t, e, n) {
        "use strict";
        var a = n(99842),
          r = n(32684).extend(
            {
              initialize: function () {
                (this.errorCode = this.element.attr(
                  a.DIRECTIVE_CAM_ERROR_CODE
                )),
                  (this.errorMessage = this.element.attr(
                    a.DIRECTIVE_CAM_ERROR_MESSAGE
                  ));
              },
              applyValue: function () {
                var t = this;
                return (
                  this.element.on("click", function () {
                    t.form.error(t.errorCode, t.errorMessage);
                  }),
                  this
                );
              },
            },
            { selector: "button[" + a.DIRECTIVE_CAM_ERROR_CODE + "]" }
          );
        t.exports = r;
      },
      22907: function (t, e, n) {
        "use strict";
        var a = n(99842),
          r = n(32684).extend(
            {
              initialize: function () {
                this.escalationCode = this.element.attr(
                  a.DIRECTIVE_CAM_ESCALATION_CODE
                );
              },
              applyValue: function () {
                var t = this;
                return (
                  this.element.on("click", function () {
                    t.form.escalate(t.escalationCode);
                  }),
                  this
                );
              },
            },
            { selector: "button[" + a.DIRECTIVE_CAM_ESCALATION_CODE + "]" }
          );
        t.exports = r;
      },
      42122: function (t, e, n) {
        "use strict";
        n(42919);
        var a = n(99842),
          r = n(32684).extend(
            {
              initialize: function () {
                (this.variableName = this.element.attr(
                  a.DIRECTIVE_CAM_FILE_DOWNLOAD
                )),
                  this.variableManager.fetchVariable(this.variableName);
              },
              applyValue: function () {
                var t = this.variableManager.variable(this.variableName);
                return (
                  this.element.attr("href", t.contentUrl),
                  0 === this.element.text().trim().length &&
                    this.element.text(t.valueInfo.filename),
                  this
                );
              },
            },
            { selector: "a[" + a.DIRECTIVE_CAM_FILE_DOWNLOAD + "]" }
          );
        t.exports = r;
      },
      47162: function (t, e, n) {
        "use strict";
        var a = n(99842),
          r = n(32684),
          i = n(59084).convertToType,
          o = function (t) {
            return (
              "checkbox" === t.attr("type") &&
              "Boolean" === t.attr(a.DIRECTIVE_CAM_VARIABLE_TYPE)
            );
          },
          s = r.extend(
            {
              initialize: function () {
                var t = this.element.attr(a.DIRECTIVE_CAM_VARIABLE_NAME),
                  e = this.element.attr(a.DIRECTIVE_CAM_VARIABLE_TYPE);
                this.variableManager.createVariable({ name: t, type: e }),
                  (this.originalValue = o(this.element)
                    ? this.element.checked
                    : this.element.val()),
                  (this.previousValue = this.originalValue),
                  (this.variableName = t),
                  this.getValue();
              },
              applyValue: function () {
                this.previousValue = this.getValueFromHtmlControl() || "";
                var t = this.variableManager.variableValue(this.variableName);
                if (
                  t &&
                  this.variableManager.isDateVariable(this.variableName)
                ) {
                  var e = new Date(t);
                  t = i(e, "Date");
                }
                return (
                  t !== this.previousValue &&
                    (this.applyValueToHtmlControl(t),
                    this.element.trigger("camFormVariableApplied", t)),
                  this
                );
              },
              getValue: function () {
                var t = this.getValueFromHtmlControl();
                return (
                  this.variableManager.variableValue(this.variableName, t), t
                );
              },
              getValueFromHtmlControl: function () {
                return o(this.element)
                  ? this.element.prop("checked")
                  : this.element.val();
              },
              applyValueToHtmlControl: function (t) {
                o(this.element)
                  ? this.element.prop("checked", t)
                  : "file" !== this.element[0].type && this.element.val(t);
              },
            },
            {
              selector:
                "input[" +
                a.DIRECTIVE_CAM_VARIABLE_NAME +
                "],textarea[" +
                a.DIRECTIVE_CAM_VARIABLE_NAME +
                "]",
            }
          );
        t.exports = s;
      },
      79129: function (t, e, n) {
        "use strict";
        var a;
        (a = (a = "undefined" != typeof window ? window : n.g) || {}),
          (t.exports =
            a.jQuery || (!!a.angular && a.angular.element) || a.Zepto);
      },
      59084: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          i = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/,
          o = /^(true|false)$/,
          s =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/,
          c = n(26219).validate,
          l = function (t, e) {
            switch (e) {
              case "Integer":
              case "Long":
              case "Short":
                return r.test(t);
              case "Float":
              case "Double":
                return i.test(t);
              case "Boolean":
                return o.test(t);
              case "Date":
                return s.test(d(t));
              case "Xml":
                return (function (t) {
                  return !!t && !0 === c(t);
                })(t);
              case "Json":
                return (function (t) {
                  try {
                    return JSON.parse(t), !0;
                  } catch (t) {
                    return !1;
                  }
                })(t);
            }
          },
          u = function (t) {
            return t < 10 ? "0" + t : t;
          },
          d = function (t) {
            return "object" === a(t) && "function" == typeof t.getFullYear
              ? t.getFullYear() +
                  "-" +
                  u(t.getMonth() + 1) +
                  "-" +
                  u(t.getDate()) +
                  "T" +
                  u(t.getHours()) +
                  ":" +
                  u(t.getMinutes()) +
                  ":" +
                  u(t.getSeconds())
              : t;
          };
        t.exports = {
          convertToType: function (t, e) {
            if (
              ("string" == typeof t && (t = t.trim()),
              "String" === e || "Bytes" === e || "File" === e)
            )
              return t;
            if (!l(t, e))
              throw new Error("Value '" + t + "' is not of type " + e);
            switch (e) {
              case "Integer":
              case "Long":
              case "Short":
                return parseInt(t, 10);
              case "Float":
              case "Double":
                return parseFloat(t);
              case "Boolean":
                return "true" === t;
              case "Date":
                return d(t);
            }
          },
          isType: l,
          dateToString: d,
        };
      },
      9669: function (t, e, n) {
        "use strict";
        n(67559), n(85541);
        var a = n(98024),
          r = n(59084).convertToType;
        function i() {
          (this.variables = {}), (this.isVariablesFetched = !1);
        }
        (i.prototype.fetchVariable = function (t) {
          if (this.isVariablesFetched)
            throw new Error(
              "Illegal State: cannot call fetchVariable(), variables already fetched."
            );
          this.createVariable({ name: t });
        }),
          (i.prototype.createVariable = function (t) {
            if (this.variables[t.name])
              throw new Error(
                "Cannot add variable with name " + t.name + ": already exists."
              );
            this.variables[t.name] = t;
          }),
          (i.prototype.destroyVariable = function (t) {
            if (!this.variables[t])
              throw new Error(
                "Cannot remove variable with name " +
                  t +
                  ": variable does not exist."
              );
            delete this.variables[t];
          }),
          (i.prototype.setOriginalValue = function (t, e) {
            if (!this.variables[t])
              throw new Error(
                "Cannot set original value of variable with name " +
                  t +
                  ": variable does not exist."
              );
            this.variables[t].originalValue = e;
          }),
          (i.prototype.variable = function (t) {
            return this.variables[t];
          }),
          (i.prototype.variableValue = function (t, e) {
            var n = this.variable(t);
            return (
              null == e || ("" === e && "String" !== n.type)
                ? (e = null)
                : "string" == typeof e &&
                  "String" !== n.type &&
                  (e = r(e, n.type)),
              2 === arguments.length && (n.value = e),
              n.value
            );
          }),
          (i.prototype.isDirty = function (t) {
            var e = this.variable(t);
            return this.isJsonVariable(t)
              ? e.originalValue !== JSON.stringify(e.value)
              : this.isDateVariable(t) && e.originalValue && e.value
              ? !a(e.originalValue, a.ISO_8601).isSame(e.value)
              : e.originalValue !== e.value || "Object" === e.type;
          }),
          (i.prototype.isJsonVariable = function (t) {
            var e = this.variable(t),
              n = e.type,
              a = ["Object", "json", "Json"].indexOf(n);
            return 0 === a
              ? -1 !==
                  e.valueInfo.serializationDataFormat.indexOf(
                    "application/json"
                  )
              : -1 !== a;
          }),
          (i.prototype.isDateVariable = function (t) {
            return "Date" === this.variable(t).type;
          }),
          (i.prototype.variableNames = function () {
            return Object.keys(this.variables);
          }),
          (t.exports = i);
      },
      83359: function (t, e, n) {
        "use strict";
        t.exports = { Client: n(12444), utils: n(37914) };
      },
      37914: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function r() {
          r = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            i = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            l = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function d(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            d({}, "");
          } catch (t) {
            d = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function p(t, e, n, a) {
            var r = e && e.prototype instanceof y ? e : y,
              i = Object.create(r.prototype),
              s = new L(a || []);
            return o(i, "_invoke", { value: O(t, n, s) }), i;
          }
          function h(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = p;
          var f = "suspendedStart",
            m = "suspendedYield",
            g = "executing",
            v = "completed",
            b = {};
          function y() {}
          function E() {}
          function _() {}
          var S = {};
          d(S, c, function () {
            return this;
          });
          var T = Object.getPrototypeOf,
            A = T && T(T(U([])));
          A && A !== n && i.call(A, c) && (S = A);
          var I = (_.prototype = y.prototype = Object.create(S));
          function w(t) {
            ["next", "throw", "return"].forEach(function (e) {
              d(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function C(t, e) {
            function n(r, o, s, c) {
              var l = h(t[r], t, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  d = u.value;
                return d && "object" == a(d) && i.call(d, "__await")
                  ? e.resolve(d.__await).then(
                      function (t) {
                        n("next", t, s, c);
                      },
                      function (t) {
                        n("throw", t, s, c);
                      }
                    )
                  : e.resolve(d).then(
                      function (t) {
                        (u.value = t), s(u);
                      },
                      function (t) {
                        return n("throw", t, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function (t, a) {
                function i() {
                  return new e(function (e, r) {
                    n(t, a, e, r);
                  });
                }
                return (r = r ? r.then(i, i) : i());
              },
            });
          }
          function O(e, n, a) {
            var r = f;
            return function (i, o) {
              if (r === g) throw new Error("Generator is already running");
              if (r === v) {
                if ("throw" === i) throw o;
                return { value: t, done: !0 };
              }
              for (a.method = i, a.arg = o; ; ) {
                var s = a.delegate;
                if (s) {
                  var c = x(s, a);
                  if (c) {
                    if (c === b) continue;
                    return c;
                  }
                }
                if ("next" === a.method) a.sent = a._sent = a.arg;
                else if ("throw" === a.method) {
                  if (r === f) throw ((r = v), a.arg);
                  a.dispatchException(a.arg);
                } else "return" === a.method && a.abrupt("return", a.arg);
                r = g;
                var l = h(e, n, a);
                if ("normal" === l.type) {
                  if (((r = a.done ? v : m), l.arg === b)) continue;
                  return { value: l.arg, done: a.done };
                }
                "throw" === l.type &&
                  ((r = v), (a.method = "throw"), (a.arg = l.arg));
              }
            };
          }
          function x(e, n) {
            var a = n.method,
              r = e.iterator[a];
            if (r === t)
              return (
                (n.delegate = null),
                ("throw" === a &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  x(e, n),
                  "throw" === n.method)) ||
                  ("return" !== a &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + a + "' method"
                    )))),
                b
              );
            var i = h(r, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), b
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((n[e.resultName] = o.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  b)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                b);
          }
          function N(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function R(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function L(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(N, this),
              this.reset(!0);
          }
          function U(e) {
            if (e || "" === e) {
              var n = e[c];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var r = -1,
                  o = function n() {
                    for (; ++r < e.length; )
                      if (i.call(e, r))
                        return (n.value = e[r]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(a(e) + " is not iterable");
          }
          return (
            (E.prototype = _),
            o(I, "constructor", { value: _, configurable: !0 }),
            o(_, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(_, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === E || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, _)
                  : ((t.__proto__ = _), d(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            w(C.prototype),
            d(C.prototype, l, function () {
              return this;
            }),
            (e.AsyncIterator = C),
            (e.async = function (t, n, a, r, i) {
              void 0 === i && (i = Promise);
              var o = new C(p(t, n, a, r), i);
              return e.isGeneratorFunction(n)
                ? o
                : o.next().then(function (t) {
                    return t.done ? t.value : o.next();
                  });
            }),
            w(I),
            d(I, u, "Generator"),
            d(I, c, function () {
              return this;
            }),
            d(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var a in e) n.push(a);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var a = n.pop();
                    if (a in e) return (t.value = a), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = U),
            (L.prototype = {
              constructor: L,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(R),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      i.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function a(a, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = e),
                    (n.next = a),
                    r && ((n.method = "next"), (n.arg = t)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return a("end");
                  if (o.tryLoc <= this.prev) {
                    var c = i.call(o, "catchLoc"),
                      l = i.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var a = this.tryEntries[n];
                  if (
                    a.tryLoc <= this.prev &&
                    i.call(a, "finallyLoc") &&
                    this.prev < a.finallyLoc
                  ) {
                    var r = a;
                    break;
                  }
                }
                r &&
                  ("break" === t || "continue" === t) &&
                  r.tryLoc <= e &&
                  e <= r.finallyLoc &&
                  (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = t),
                  (o.arg = e),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), b)
                    : this.complete(o)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  b
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), R(n), b;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var a = n.completion;
                    if ("throw" === a.type) {
                      var r = a.arg;
                      R(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, n, a) {
                return (
                  (this.delegate = {
                    iterator: U(e),
                    resultName: n,
                    nextLoc: a,
                  }),
                  "next" === this.method && (this.arg = t),
                  b
                );
              },
            }),
            e
          );
        }
        function i(t, e, n, a, r, i, o) {
          try {
            var s = t[i](o),
              c = s.value;
          } catch (t) {
            return void n(t);
          }
          s.done ? e(c) : Promise.resolve(c).then(a, r);
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
        var o = (t.exports = { typeUtils: n(59084) });
        (o.solveHALEmbedded = function (t) {
          function e(e) {
            if ("Id" !== e.slice(-2)) return !1;
            var n = e.slice(0, -2),
              a = t._embedded;
            return !(!a[n] || !a[n].length);
          }
          function n(t) {
            var n = Object.keys(t);
            for (var a in n) ("_" !== n[a][0] && e(n[a])) || n.splice(a, 1);
            return n;
          }
          var a = Object.keys(t._embedded || {});
          for (var r in a) {
            var i = a[r];
            for (var o in t._embedded[i]) {
              t._embedded[i][o]._embedded = t._embedded[i][o]._embedded || {};
              var s = n(t._embedded[i][o]);
              for (var c in s) {
                var l = s[c];
                if (t._embedded[i][o][l]) {
                  var u = t._embedded[l.slice(0, -2)];
                  for (var d in u)
                    u[d].id === t._embedded[i][o][l] &&
                      (t._embedded[i][o]._embedded[l.slice(0, -2)] = [u[d]]);
                }
              }
            }
          }
          return t;
        }),
          (o.series = function (t, e) {
            return new Promise(function (n, a) {
              e = e || function () {};
              var r = {};
              !(function (t, e, n) {
                if (((n = n || function () {}), !t.length)) return n();
                var a = 0;
                !(function r() {
                  e(t[a], function (e) {
                    e
                      ? (n(e), (n = function () {}))
                      : (a += 1) >= t.length
                      ? n()
                      : r();
                  });
                })();
              })(
                Object.keys(t),
                function (e, n) {
                  t[e](function (t) {
                    var a = Array.prototype.slice.call(arguments, 1);
                    a.length <= 1 && (a = a[0]), (r[e] = a), n(t);
                  });
                },
                function (t) {
                  t ? a(t) : n(r), e(t, r);
                }
              );
            });
          }),
          (o.escapeUrl = function (t) {
            return encodeURIComponent(t)
              .replace(/\//g, "%2F")
              .replace(/%2F/g, "%252F")
              .replace(/\*/g, "%2A")
              .replace(/%5C/g, "%255C");
          }),
          (o.debouncePromiseFactory = function () {
            var t = null;
            return (function () {
              var e,
                n =
                  ((e = r().mark(function e(n) {
                    var a;
                    return r().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (t = n), (e.next = 3), n;
                          case 3:
                            if (((a = e.sent), t !== n)) {
                              e.next = 8;
                              break;
                            }
                            return e.abrupt("return", a);
                          case 8:
                            return (e.next = 10), new Promise(function () {});
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })),
                  function () {
                    var t = this,
                      n = arguments;
                    return new Promise(function (a, r) {
                      var o = e.apply(t, n);
                      function s(t) {
                        i(o, a, r, s, c, "next", t);
                      }
                      function c(t) {
                        i(o, a, r, s, c, "throw", t);
                      }
                      s(void 0);
                    });
                  });
              return function (t) {
                return n.apply(this, arguments);
              };
            })();
          });
      },
      1792: function (t, e, n) {
        "use strict";
        t.exports = n(30336);
      },
      92620: function (t, e, n) {
        "use strict";
        t.exports = n(98024);
      },
      45288: function (t, e, n) {
        "use strict";
        var a = n(30430);
        t.exports = {
          utils: { _: a },
          requirejs: function (t) {
            void 0 === (t = t || {}).pathPrefix &&
              (t.pathPrefix = "camunda-commons-ui");
            var e = {
              stubModules: ["text"],
              paths: {
                "camunda-commons-ui": "lib",
                "angular-data-depend":
                  "node_modules/angular-data-depend/src/dataDepend",
                "angular-translate":
                  "node_modules/angular-translate/dist/angular-translate",
                "angular-moment": "node_modules/angular-moment/angular-moment",
                "camunda-bpm-sdk-js":
                  "node_modules/camunda-bpm-sdk-js/dist/camunda-bpm-sdk-angular",
                "camunda-bpm-sdk-js-type-utils":
                  "node_modules/camunda-bpm-sdk-js/dist/camunda-bpm-sdk-type-utils",
                jquery: "node_modules/jquery/dist/jquery",
                moment: "node_modules/moment/moment",
                requirejs: "node_modules/requirejs/require",
                ngDefine: "node_modules/requirejs-angular-define/dist/ngDefine",
                text: "node_modules/requirejs-text/text",
                lodash: "node_modules/lodash/lodash",
                angular: "node_modules/angular/angular",
                "angular-animate":
                  "node_modules/angular-animate/angular-animate",
                "angular-cookies":
                  "node_modules/angular-cookies/angular-cookies",
                "angular-loader": "node_modules/angular-loader/angular-loader",
                "angular-resource":
                  "node_modules/angular-resource/angular-resource",
                "angular-route": "node_modules/angular-route/angular-route",
                "angular-sanitize":
                  "node_modules/angular-sanitize/angular-sanitize",
                "angular-touch": "node_modules/angular-touch/angular-touch",
                "angular-bootstrap": "angular-ui-bootstrap",
                prismjs: "vendor/prism",
                "bpmn-io":
                  "node_modules/bower-bpmn-js/dist/bpmn-navigated-viewer",
                "dmn-io": "node_modules/camunda-dmn-js",
              },
              shim: {
                angular: { deps: ["jquery"], exports: "angular" },
                "camunda-commons-ui": [
                  "angular",
                  "angular-resource",
                  "angular-route",
                  "angular-sanitize",
                  "angular-translate",
                  "angular-bootstrap",
                  "moment",
                  "placeholders-js",
                ],
                "angular-animate": ["angular"],
                "angular-cookies": ["angular"],
                "angular-loader": ["angular"],
                "angular-mocks": ["angular"],
                "angular-resource": ["angular"],
                "angular-route": ["angular"],
                "angular-sanitize": ["angular"],
                "angular-touch": ["angular"],
                "angular-bootstrap": ["angular"],
                "angular-translate": ["angular"],
              },
              packages: [
                { name: "camunda-commons-ui", location: "lib", main: "index" },
                {
                  name: "camunda-commons-ui/util",
                  location: "lib/util",
                  main: "index",
                },
              ],
            };
            return (
              a.each(e.paths, function (n, a) {
                e.paths[a] = t.pathPrefix + "/" + n;
              }),
              a.each(e.packages, function (n, a) {
                e.packages[a].location &&
                  (e.packages[a].location =
                    t.pathPrefix + "/" + e.packages[a].location);
              }),
              e
            );
          },
        };
      },
      61663: function (t) {
        "use strict";
        t.exports = [
          "$animate",
          "$rootScope",
          function (t, e) {
            return {
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              restrict: "A",
              compile: function (n, a, r) {
                return function (n, a) {
                  var i, o;
                  function s(e) {
                    i && (t.leave(i), (i = void 0)),
                      o && (o.$destroy(), (o = void 0)),
                      e &&
                        ((o = n.$new()),
                        r(o, function (e) {
                          (i = e), t.enter(e, a.parent(), a);
                        }));
                  }
                  n.$on("authentication.changed", function (t, e) {
                    s(e);
                  }),
                    s(e.authentication);
                };
              },
            };
          },
        ];
      },
      9886: function (t) {
        "use strict";
        t.exports = [
          "$animate",
          "$rootScope",
          function (t, e) {
            return {
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              restrict: "A",
              compile: function (n, a, r) {
                return function (n, a) {
                  var i, o;
                  function s(e) {
                    i && (t.leave(i), (i = void 0)),
                      o && (o.$destroy(), (o = void 0)),
                      e &&
                        ((o = n.$new()),
                        r(o, function (e) {
                          (i = e), t.enter(e, a.parent(), a);
                        }));
                  }
                  n.$on("authentication.changed", function (t, e) {
                    s(!e);
                  }),
                    s(!e.authentication);
                };
              },
            };
          },
        ];
      },
      72599: function (t, e, n) {
        "use strict";
        n(67559), n(56806), n(31083);
        var a = n(1792);
        n(91660), n(18551), n(61893);
        var r = n(90517),
          i = n(85358),
          o = n(61663),
          s = n(9886),
          c = n(36628),
          l = a.module("cam.commons.auth", [
            a.module("ngRoute").name,
            r.name,
            "pascalprecht.translate",
            "webapps.plugin",
            "camunda.common.services",
          ]);
        l
          .config([
            "ViewsProvider",
            "canonicalAppNameProvider",
            function (t, e) {
              var a = e.$get;
              t.registerDefaultView("".concat(a(), ".login"), {
                id: "default-login-form",
                controller: n(41601),
                template: n(83263),
                priority: 0,
              });
            },
          ])
          .config(i)
          .run([
            "$rootScope",
            "$location",
            function (t, e) {
              var n;
              t.$on("authentication.login.required", function (a) {
                t.$evalAsync(function () {
                  var t = e.url();
                  "/login" === t ||
                    a.defaultPrevented ||
                    ((n = t), e.url("/login"));
                });
              }),
                t.$on("authentication.login.success", function (a) {
                  t.$evalAsync(function () {
                    a.defaultPrevented ||
                      (e.url(n || "/").replace(), (n = null));
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
            function (t, e, n, a, r, i) {
              e.$on("authentication.logout.success", function (o) {
                e.$evalAsync(function () {
                  o.defaultPrevented ||
                    (t.get("$http").removeAll(), n.url("/login"));
                }),
                  a(function () {
                    r.addMessage({
                      status: i.instant("AUTH_LOGOUT_SUCCESSFUL"),
                      message: i.instant("AUTH_LOGOUT_THANKS", {
                        dayContext: i.instant(
                          (function () {
                            var t = new Date();
                            if (t.getDay() >= 5)
                              return "AUTH_DAY_CONTEXT_WEEKEND";
                            var e = t.getHours();
                            switch (!0) {
                              case e >= 4 && e < 7:
                                return "AUTH_DAY_CONTEXT_MORNING";
                              case e >= 7 && e < 12:
                                return "AUTH_DAY_CONTEXT_DAY";
                              case e >= 12 && e < 17:
                                return "AUTH_DAY_CONTEXT_AFTERNOON";
                              case e >= 17 && e < 22:
                                return "AUTH_DAY_CONTEXT_EVENING";
                              case e >= 22 || e < 4:
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
            function (t, e, n, a) {
              t.$on("authentication.login.required", function () {
                a() &&
                  e.addError({
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
          (t.exports = l);
      },
      41601: function (t, e, n) {
        "use strict";
        n(84392), n(66893);
        var a = n(25447);
        t.exports = [
          "$scope",
          "AuthenticationService",
          "Notifications",
          "$translate",
          "Views",
          "canonicalAppName",
          function (t, e, n, r, i, o) {
            t.status = "INIT";
            var s = a('form[name="signinForm"] [autofocus]')[0];
            s && s.focus();
            var c = i.getProviders({ component: "".concat(o, ".login.data") });
            t.login = function () {
              t.status = "LOADING";
              var a = e.login(t.username, t.password);
              return (
                c.forEach(function (e) {
                  e.result && e.result(a, t);
                }),
                a
                  .then(function () {
                    (t.status = "DONE"),
                      n.clearAll(),
                      t.$root.$broadcast("first-visit-info-box-dismissed");
                  })
                  .catch(function (e) {
                    (t.status = "ERROR"),
                      delete t.username,
                      delete t.password,
                      n.addError({
                        status: r.instant("PAGE_LOGIN_FAILED"),
                        message:
                          (e.data && e.data.message) ||
                          r.instant("PAGE_LOGIN_ERROR_MSG"),
                        scope: t,
                        exclusive: !0,
                      });
                  })
              );
            };
          },
        ];
      },
      85358: function (t, e, n) {
        "use strict";
        var a = n(15222),
          r = n(24820),
          i = [
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
            function (t, e, n, a, i, o, s, c, l, u, d) {
              if (
                ((t.logo = s.trustAsHtml(r)),
                (t.status = "INIT"),
                (t.appName = c.getAppName()),
                (t.loginPlugins = u.getProviders({
                  component: "".concat(d, ".login"),
                })),
                e.authentication)
              )
                return a.path("/");
              (e.showBreadcrumbs = !1),
                (t.showFirstLogin = !1),
                !c.getDisableWelcomeMessage() &&
                  o.get("firstVisit", !0) &&
                  l({ method: "GET", url: "/camunda-welcome" })
                    .then(function (e) {
                      if (200 === e.status) {
                        o.set("firstVisit", !0), (t.showFirstLogin = !0);
                        var n = t.$on(
                          "first-visit-info-box-dismissed",
                          t.dismissInfoBox
                        );
                        t.$on("$destroy", function () {
                          n();
                        });
                      } else t.dismissInfoBox();
                    })
                    .catch(t.dismissInfoBox),
                i("FIRST_LOGIN_INFO").then(function (e) {
                  t.FirstLoginMessage = s.trustAsHtml(e);
                }),
                (t.dismissInfoBox = function () {
                  (t.showFirstLogin = !1), o.set("firstVisit", !1);
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/login", { template: a, controller: i });
          },
        ];
      },
      36628: function (t, e, n) {
        "use strict";
        n(1792);
        var a = n(25447),
          r = n(8986);
        t.exports = [
          "$rootScope",
          "$q",
          "$http",
          "Uri",
          "$route",
          function (t, e, n, i, o) {
            function s(e, n, a) {
              t.$broadcast(e, n, a);
            }
            function c(t) {
              if (200 !== t.status) return e.reject(t);
              var n = t.data;
              return new r({
                name: n.userId,
                authorizedApps: n.authorizedApps,
              });
            }
            function l(e) {
              (t.authentication = e), s("authentication.changed", e);
            }
            var u;
            (this.updateAuthentication = l),
              (this.login = function (t, r) {
                var o = a.param({ username: t, password: r });
                return n
                  .get(i.appUri("engine://engine/"))
                  .then(function () {
                    return n({
                      method: "POST",
                      url: i.appUri("admin://auth/user/:engine/login/:appName"),
                      data: o,
                      headers: {
                        "Content-Type":
                          "application/x-www-form-urlencoded;charset=UTF-8",
                      },
                    });
                  })
                  .then(c)
                  .then(
                    function (t) {
                      return (
                        n.get(i.appUri("engine://engine/")).then(function () {
                          l(t), s("authentication.login.success", t);
                        }),
                        t
                      );
                    },
                    function (t) {
                      return s("authentication.login.failure", t), e.reject(t);
                    }
                  );
              }),
              (this.logout = function (t) {
                return n
                  .post(
                    i.appUri(
                      "admin://auth/user/" + (t || ":engine") + "/logout"
                    )
                  )
                  .then(
                    function (t) {
                      l(null), s("authentication.logout.success", t);
                    },
                    function (t) {
                      return s("authentication.logout.failure", t), e.reject(t);
                    }
                  );
              }),
              t.$on("authentication.changed", function (t, n) {
                (u = e[n ? "when" : "reject"](n)), n || o.reload();
              }),
              (this.getAuthentication = function () {
                return (
                  u ||
                    (u = t.authentication
                      ? e.when(t.authentication)
                      : n
                          .get(i.appUri("admin://auth/user/:engine"))
                          .then(c)
                          .then(function (t) {
                            return l(t), t;
                          })),
                  u
                );
              }),
              t.$on("$routeChangeStart", function (t, n) {
                n.authentication &&
                  (n.resolve || (n.resolve = {}),
                  n.resolve.authentication ||
                    (n.resolve.authentication = [
                      "AuthenticationService",
                      function (t) {
                        return t.getAuthentication().catch(function (t) {
                          return "optional" === n.authentication
                            ? null
                            : (s("authentication.login.required", n),
                              e.reject(t));
                        });
                      },
                    ]));
              });
          },
        ];
      },
      8986: function (t, e, n) {
        "use strict";
        var a = n(1792);
        function r(t) {
          a.extend(this, t);
        }
        (r.prototype.canAccess = function (t) {
          return this.authorizedApps && -1 !== this.authorizedApps.indexOf(t);
        }),
          (t.exports = r);
      },
      60589: function (t, e, n) {
        "use strict";
        function a(t, e) {
          var n = Math.ceil(t / e),
            a = "" + n;
          return (
            (n = (parseInt(a[0], 10) + 1) * Math.pow(10, a.length - 1)) * e
          );
        }
        function r() {}
        function i(t) {
          return Math.log(t) / Math.log(10);
        }
        function o(t) {
          (this.moment = t.moment),
            (this.abbreviateNumber = t.abbreviateNumber),
            this.resize(t.width, t.height, t.disableSelection),
            (this.lineColors = t.lineColors),
            (this.rulersColor = t.rulersColor || "#666"),
            (this.selectingColor = t.selectingColor || "rgba(0,0,64,0.1)"),
            (this.unselectedColor = t.unselectedColor || "rgba(0,0,0,0.1)"),
            (this.handleColorHover = t.handleColorHover || "#999"),
            (this.handleColor = t.handleColor || "#aaa"),
            (this.fontSize = t.fontSize || 12),
            (this.fontFamily = t.fontFamily || "Arial"),
            (this.lineWidth = t.lineWidth || 1),
            (this.isLogScale = t.isLogScale || !1),
            (this.valueLabelsCount = t.valueLabelsCount || 8),
            (this.timespan = t.timespan || "day"),
            (this.interval = t.interval || 900),
            (this.handleWidth = t.handleWidth || 4),
            (this.timestampFormat = t.timestampFormat || "YYYY-MM-DDTHH:mm:ss"),
            (this.timeLabelFormats = t.timeLabelFormats || {
              day: "HH:mm",
              week: "dd DD",
              month: "DD MMM",
            }),
            (this.tickSize = t.tickSize || 10),
            (this.textPadding = t.textPadding || 3),
            (this.onselection = t.onselection || r);
        }
        n(79880), n(84735), n(85541), n(84392), n(66893), (t.exports = o);
        var s = o.prototype;
        (s._mouseIsDown = !1),
          (s._selectedIn = null),
          (s._selectedOut = null),
          (s._eventHandlers = {}),
          (s._eventHandlers.mouseout = function (t) {
            this.drawMouseHint().drawSelection(t);
          }),
          (s._eventHandlers.mousemove = function (t) {
            var e = this.cursorPosition(t);
            (this._hoveredSelectionHandle = this.hoveredSelectionHandle(t)),
              (this.canvas.style.cursor = this._hoveredSelectionHandle
                ? "ew-resize"
                : "default"),
              "in" === this._grabbedSelectionHandle
                ? (this._selectedIn = e.left)
                : "out" === this._grabbedSelectionHandle &&
                  (this._selectedOut = e.left),
              this.drawMouseHint(e.left, e.top).drawSelection(t);
          }),
          (s._eventHandlers.mousedown = function (t) {
            var e = this.cursorPosition(t),
              n = this.verticalScaleX(),
              a = this.innerW();
            (this._hoveredSelectionHandle = this.hoveredSelectionHandle(t)),
              (this.canvas.style.cursor = this._hoveredSelectionHandle
                ? "ew-resize"
                : "default"),
              this._hoveredSelectionHandle
                ? (this._grabbedSelectionHandle = this._hoveredSelectionHandle)
                : (this._mouseIsDown ||
                    ((this._selectedIn = Math.min(Math.max(e.left, n), n + a)),
                    (this._selectedOut = null)),
                  (this._mouseIsDown = !0)),
              this.drawMouseHint(e.left, e.top).drawSelection(t);
          }),
          (s._eventHandlers.mouseup = function (t) {
            var e = this.cursorPosition(t),
              n = this.verticalScaleX(),
              a = this.innerW();
            this._grabbedSelectionHandle && (this._grabbedSelectionHandle = !1),
              this._mouseIsDown &&
                (this._selectedOut = Math.max(Math.min(e.left, n + a), n)),
              (this._mouseIsDown = !1),
              Math.abs(this._selectedIn - this._selectedOut) <= 1 &&
                ((this._selectedIn = this._selectedOut = null),
                this.onselection({
                  start: null,
                  end: null,
                  in: null,
                  out: null,
                })),
              this.drawMouseHint(e.left, e.top).drawSelection(t),
              this._selectedIn &&
                this._selectedOut &&
                this.onselection({
                  start: this.momentAtX(this._selectedIn),
                  end: this.momentAtX(this._selectedOut),
                  in: this._selectedIn,
                  out: this._selectedOut,
                });
          }),
          (s._eventHandlers.wheel = function (t) {
            if (this._selectedIn && this._selectedOut) {
              t.preventDefault();
              var e = this.cursorPosition(t);
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              var n = Math.max(
                Math.round(Math.abs(this._selectedOut - this._selectedIn) / 10),
                1
              );
              t.deltaY > 0
                ? ((this._selectedIn += n), (this._selectedOut -= n))
                : ((this._selectedIn -= n), (this._selectedOut += n)),
                this.drawMouseHint(e.left, e.top).drawSelection(t),
                this.onselection({
                  start: this.momentAtX(this._selectedIn),
                  end: this.momentAtX(this._selectedOut),
                  in: this._selectedIn,
                  out: this._selectedOut,
                });
            }
          }),
          (s.cursorPosition = function (t) {
            var e = this.canvas.getBoundingClientRect();
            return { left: t.clientX - e.left, top: t.clientY - e.top };
          }),
          (s.bindEvents = function () {
            return (
              Object.keys(s._eventHandlers).forEach(function (t) {
                this.canvas.addEventListener(
                  t,
                  s._eventHandlers[t].bind(this),
                  !1
                );
              }, this),
              this
            );
          }),
          (s.unbindEvents = function () {
            return (
              Object.keys(s._eventHandlers).forEach(function (t) {
                this.canvas.removeEventListener(
                  t,
                  s._eventHandlers[t].bind(this),
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
          (s.resize = function (t, e, n) {
            return (
              this._clearCache(),
              this.canvas ||
                ((this.canvas = document.createElement("canvas")),
                (this.offCanvas = document.createElement("canvas")),
                !n && this.bindEvents()),
              (this.canvas.width = this.offCanvas.width = t),
              (this.canvas.height = this.offCanvas.height = e),
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
          (s.max = function (t) {
            var e = 0;
            return arguments.length
              ? ((this.data[t] || []).forEach(function (t) {
                  e = Math.max(t.value, e);
                }, this),
                e)
              : ((this.data || []).forEach(function (t, n) {
                  e = Math.max(e, this.max(n));
                }, this),
                e);
          }),
          (s.min = function (t) {
            var e = this.max();
            return arguments.length
              ? ((e = this.max(t)),
                (this.data[t] || []).forEach(function (t) {
                  e = Math.min(t.value, e);
                }, this),
                e)
              : ((this.data || []).forEach(function (t, n) {
                  e = Math.min(e, this.min(n));
                }, this),
                e);
          }),
          (s.momentAtX = function (t) {
            var e = this.moment,
              n = this.labelFrom,
              a = (this.labelTo - n) / this.innerW();
            return e(
              new Date(a * (t - this.verticalScaleX()) + this.labelFrom),
              e.ISO_8601
            );
          }),
          (s.valueAtY = function (t) {
            return t;
          }),
          (s.setData = function (t, e, n) {
            this._clearCache();
            var r = this.moment,
              i = this.abbreviateNumber;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
              this.offCtx.clearRect(
                0,
                0,
                this.offCanvas.width,
                this.offCanvas.height
              ),
              e && (this.timespan = e),
              n && (this.interval = n);
            var o = [[{ value: 0, timestamp: r().format(this.dateformat) }]];
            (t && t.length && t[0]) || (t = o), (this.data = t);
            var s,
              c = this.timespan,
              l = this.timestampFormat,
              u = a(this.max(), this.valueLabelsCount),
              d = this.timeLabelFormats;
            this.isLogScale && (this.valueLabelsCount = this.maxLog() + 1),
              (this.valueLabels = []);
            for (var p = this.valueLabelsCount; p >= 0; p--)
              (s = this.isLogScale
                ? p && Math.pow(10, p - 1)
                : i((p * u) / this.valueLabelsCount) || 0),
                this.valueLabels.push(s);
            if (
              ((this.timeLabels = []),
              t.length && t[0] && t[0].length && t[0][0].timestamp)
            ) {
              var h = r(),
                f = (this.labelTo = h.clone());
              "day" === c
                ? f.startOf("hour").add(1, "hour")
                : "week" === c
                ? f.startOf("day").add(1, "day")
                : "month" === c && f.startOf("week").add(1, "week");
              var m,
                g,
                v = (this.labelFrom = f.clone().subtract(1, c)),
                b = 1;
              "day" === c
                ? ((m = 12), (g = "hour"), (b = 2))
                : "week" === c
                ? ((m = 7), (g = "day"))
                : "month" === c && ((m = 4), (g = "week"));
              for (var y = 0; y <= m; y++)
                this.timeLabels.push(
                  v
                    .clone()
                    .add(y * b, g)
                    .format(d[c])
                );
            }
            return (
              (this.data = t.map(function (t) {
                (t && t.length) || (t = [{ value: 0 }]),
                  1 === t.length && (t = [t[0], t[0]]);
                var e = r(t[t.length - 1].timestamp, l),
                  n = e - undefined;
                return t.map(function (t) {
                  var a = r(t.timestamp, l);
                  return (t.positionPercent = (e - a) / n), t;
                });
              })),
              this.draw()
            );
          }),
          (s._verticalLabels = null),
          (s.verticalLabels = function () {
            if (this._verticalLabels) return this._verticalLabels;
            var t = this.ctx,
              e = this.timeLabels,
              n = this.textPadding,
              a = 0,
              r = this.innerW();
            return (
              e.forEach(function (e) {
                a += t.measureText(e).width + 2 * n;
              }),
              (this._verticalLabels = a > r),
              this._verticalLabels
            );
          }),
          (s._innerW = null),
          (s.innerW = function () {
            if (this._innerW) return this._innerW;
            var t = this.lineWidth,
              e = Math.max(2 * t, 10),
              n = this.ctx,
              a = n.canvas.width,
              r = 0,
              i = this.textPadding;
            return (
              this.timeLabels.forEach(function (t) {
                r = Math.max(r, n.measureText(t).width + 2 * i);
              }),
              (this._innerW = a - (e + this.verticalScaleX())),
              this.verticalLabels() || (this._innerW -= r / 2),
              this._innerW
            );
          }),
          (s._innerH = null),
          (s.innerH = function () {
            if (this._innerH) return this._innerH;
            var t = this.lineWidth,
              e = Math.max(2 * t, 10),
              n = this.ctx.canvas.height;
            return (
              (this._innerH = n - (e + this.horizontalScaleY())), this._innerH
            );
          }),
          (s._verticalScaleX = null),
          (s.verticalScaleX = function () {
            if (this._verticalScaleX) return this._verticalScaleX;
            var t = 0,
              e = this.ctx,
              n = this.valueLabels,
              a = this.textPadding,
              r = this.tickSize;
            return (
              n.forEach(function (n) {
                t = Math.max(t, e.measureText(n || "0").width + 4 * a + r);
              }),
              (t = Math.round(Math.max(t, r + a)) + 0.5),
              (this._verticalScaleX = t),
              t
            );
          }),
          (s._horizontalScaleY = null),
          (s.horizontalScaleY = function () {
            if (this._horizontalScaleY) return this._horizontalScaleY;
            var t = this.ctx,
              e = this.timeLabels,
              n = this.fontSize,
              a = this.tickSize,
              r = this.textPadding,
              i = this.verticalLabels(),
              o = 0;
            return (
              i
                ? (e.forEach(function (e) {
                    o = Math.max(o, t.measureText(e).width + 4 * r + a);
                  }),
                  (o = Math.round(Math.max(o, a + r))))
                : (o = n + 2 * r + a),
              (this._horizontalScaleY = o),
              o
            );
          }),
          (s.drawMouseHint = function (t, e) {
            var n = this.ctx,
              a = this.innerW(),
              r = n.canvas.height,
              i = n.canvas.width,
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
              n.clearRect(0, 0, i, r),
              n.drawImage(this.offCanvas, 0, 0, i, r, 0, 0, i, r),
              t && t > s && t <= s + a)
            ) {
              var u = this.momentAtX(t).format(this.timestampFormat),
                d = n.measureText(u).width + 2 * o,
                p = t + d > i - o ? i - (o + d) : t,
                h = e > o ? e : o;
              n.fillText(u, p, h),
                n.beginPath(),
                n.moveTo(t + 0.5, r - (c + l)),
                n.lineTo(t + 0.5, r - c),
                n.stroke(),
                n.closePath();
            }
            return this;
          }),
          (s.drawSelection = function (t) {
            var e = this.ctx,
              n = this.innerH(),
              a = this.innerW(),
              r = this.verticalScaleX(),
              i = Math.max(2 * this.lineWidth, 10),
              o = this.cursorPosition(t),
              s = this.handleWidth,
              c = this.selectingColor,
              l = this.unselectedColor,
              u = e.fillStyle;
            if (this._mouseIsDown)
              return (
                (e.fillStyle = c),
                this._selectedIn < o.left
                  ? e.fillRect(
                      this._selectedIn,
                      i,
                      Math.min(
                        o.left - this._selectedIn,
                        r + a - this._selectedIn
                      ),
                      n
                    )
                  : e.fillRect(
                      Math.max(o.left, r),
                      i,
                      Math.min(this._selectedIn - o.left, a),
                      n
                    ),
                (e.fillStyle = u),
                this
              );
            if (this._selectedIn && this._selectedOut) {
              var d = e.lineWidth,
                p = e.strokeStyle;
              if (
                (this._selectedIn < r && (this._selectedIn = r),
                this._selectedOut > r + a && (this._selectedOut = r + a),
                (e.fillStyle = l),
                this._selectedOut && this._selectedIn > this._selectedOut)
              ) {
                var h = this._selectedOut;
                (this._selectedOut = this._selectedIn), (this._selectedIn = h);
              }
              e.fillRect(r, i, this._selectedIn - r, n),
                e.fillRect(this._selectedOut, i, a + r - this._selectedOut, n),
                e.beginPath(),
                e.moveTo(this._selectedIn + 0.5, n + i),
                e.lineTo(this._selectedIn + 0.5, i + 0.5),
                e.lineTo(this._selectedOut + 0.5, i + 0.5),
                e.lineTo(this._selectedOut + 0.5, n + i),
                e.stroke(),
                (e.lineWidth = s + 2),
                (e.strokeStyle = this.rulersColor),
                e.beginPath(),
                e.moveTo(this._selectedIn, i + 10),
                e.lineTo(this._selectedIn, 80),
                e.stroke(),
                e.closePath(),
                (e.lineWidth = s),
                (e.strokeStyle =
                  "in" === this._hoveredSelectionHandle
                    ? this.handleColorHover
                    : this.handleColor),
                e.beginPath(),
                e.moveTo(this._selectedIn, i + 10),
                e.lineTo(this._selectedIn, 80),
                e.stroke(),
                (e.lineWidth = s + 2),
                (e.strokeStyle = "#333"),
                e.beginPath(),
                e.moveTo(this._selectedOut, i + 10),
                e.lineTo(this._selectedOut, 80),
                e.stroke(),
                e.closePath(),
                (e.lineWidth = s),
                (e.strokeStyle =
                  "out" === this._hoveredSelectionHandle
                    ? this.handleColorHover
                    : this.handleColor),
                e.beginPath(),
                e.moveTo(this._selectedOut, i + 10),
                e.lineTo(this._selectedOut, 80),
                e.stroke(),
                (e.lineWidth = d),
                (e.fillStyle = u),
                (e.strokeStyle = p);
            }
            return this;
          }),
          (s.hoveredSelectionHandle = function (t) {
            if (!this._selectedIn || !this._selectedOut) return !1;
            var e = this.cursorPosition(t),
              n = this.ctx,
              a = Math.max(2 * this.lineWidth, 10),
              r = !1,
              i = this.handleWidth + 4,
              o = n.lineWidth,
              s = n.strokeStyle;
            return (
              (n.lineWidth = 1),
              (n.strokeStyle = "rgba(0,0,0,0)"),
              n.beginPath(),
              n.rect(this._selectedIn - i / 2, a + 10, i, 80),
              n.stroke(),
              n.closePath(),
              n.isPointInPath(e.left, e.top) && (r = "in"),
              n.beginPath(),
              n.rect(this._selectedOut - i / 2, a + 10, i, 80),
              n.stroke(),
              n.closePath(),
              n.isPointInPath(e.left, e.top) && (r = "out"),
              (n.lineWidth = o),
              (n.strokeStyle = s),
              r
            );
          }),
          (s.maxLog = function () {
            var t = this.max() || 1;
            return Math.ceil(i(t));
          }),
          (s.drawRulers = function () {
            var t,
              e,
              n,
              a,
              r,
              o = this.offCtx,
              s = this.lineWidth,
              c = Math.max(2 * s, 10),
              l = this.abbreviateNumber,
              u = this.timeLabels,
              d = this.valueLabels,
              p = o.canvas.height,
              h = this.textPadding,
              f = this.tickSize,
              m = this.verticalScaleX(),
              g = this.horizontalScaleY(),
              v = this.innerW(),
              b = this.innerH(),
              y = this.verticalLabels();
            (o.strokeStyle = this.rulersColor),
              (o.fillStyle = this.rulersColor),
              (o.lineWidth = 1),
              (o.lineCap = "round"),
              (o.lineJoin = "round"),
              (o.font = this.fontSize + "px " + this.fontFamily);
            var E = p - g + 0.5;
            for (
              o.beginPath(),
                o.moveTo(m - f, E),
                o.lineTo(m + v, E),
                o.stroke(),
                o.beginPath(),
                o.moveTo(m, c),
                o.lineTo(m, E + f),
                o.stroke(),
                y
                  ? ((o.textAlign = "right"), (o.textBaseline = "middle"))
                  : ((o.textAlign = "center"), (o.textBaseline = "top")),
                u.forEach(function (t, e) {
                  var n = m + e * (v / (u.length - 1));
                  o.beginPath(),
                    o.moveTo(n, E),
                    o.lineTo(n, E + f),
                    o.stroke(),
                    y
                      ? (o.save(),
                        o.translate(n, p - (g - (f + h))),
                        o.rotate(-Math.PI / 2),
                        o.fillText(u[e], 0, 0),
                        o.restore())
                      : o.fillText(u[e], n, p - (g - (f + h)));
                }),
                t = b / (d.length - 1),
                a = this.maxLog(),
                o.textAlign = "right",
                o.textBaseline = "middle",
                e = 0;
              e < d.length;
              e++
            )
              (n = d[e]),
                (r = this.isLogScale
                  ? b - (n && (b / (a + 1)) * (i(n) + 1)) + c
                  : Math.round(c + t * e) - 0.5),
                o.fillText(l(n) || 0, m - (f + h), r),
                e < d.length - 1 &&
                  (o.beginPath(),
                  o.moveTo(m - f, r),
                  o.lineTo(m, r),
                  o.stroke());
            return this;
          }),
          (s.draw = function () {
            var t = this.offCtx,
              e = this.lineWidth,
              n = Math.max(2 * e, 10),
              r = t.canvas.width,
              o = t.canvas.height,
              s = this.verticalScaleX(),
              c = this.horizontalScaleY(),
              l = this.innerW(),
              u = this.innerH();
            t.clearRect(0, 0, r, o);
            var d = this.labelFrom,
              p = this.labelTo - d,
              h = this.interval,
              f = o - c + 0.5,
              m = this.isLogScale,
              g = this.max(),
              v = this.maxLog(),
              b = a(g, this.valueLabelsCount);
            function y(t) {
              if (!t) return f;
              var e = t && (u / (v + 1)) * (i(t) + 1);
              return m ? u - e + n : u - (u / b) * t + n;
            }
            function E(t) {
              return s + ((t - d) / p) * l;
            }
            return (
              this.data.forEach(function (n, a) {
                var r,
                  i,
                  l,
                  u,
                  p = this.moment,
                  f = this.lineColors[a];
                (t.lineWidth = e),
                  (t.strokeStyle = f),
                  t.beginPath(),
                  n.forEach(function (e, n) {
                    (l = p(e.timestamp, p.ISO_8601)) <= d
                      ? (u = e)
                      : (0 === n &&
                          l > d &&
                          (t.moveTo(s, o - c),
                          t.lineTo(E(l.clone().subtract(h, "seconds")), o - c)),
                        u &&
                          ((r = s),
                          (i = y(u.value)),
                          t.lineTo(r, i),
                          (u = null)),
                        (r = E(l)),
                        (i = y(e.value)),
                        t.lineTo(r, i));
                  }),
                  p() - l >= 1e3 * h &&
                    ((r = E(l.clone().add(h, "seconds"))),
                    (i = o - c),
                    t.lineTo(r, i),
                    (r = E(p())),
                    t.lineTo(r, i)),
                  t.stroke(),
                  t.closePath(),
                  n.length >= 1 &&
                    (t.beginPath(),
                    (t.fillStyle = f),
                    t.arc(r, i, 2 * e, 0, 2 * Math.PI),
                    t.fill(),
                    t.closePath());
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
      42401: function (t) {
        "use strict";
        t.exports = [
          "$interval",
          function (t) {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (e, n, a, r) {
                var i = t(function () {
                  var e = n.val();
                  e !== r.$viewValue && (r.$setViewValue(e), r.$setPristine()),
                    "function" != typeof document.contains ||
                    document.contains(n[0])
                      ? "function" != typeof document.contains && t.cancel(i)
                      : t.cancel(i);
                }, 500);
              },
            };
          },
        ];
      },
      36143: function (t, e, n) {
        "use strict";
        n(56806),
          (t.exports = function () {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (t, e, n, a) {
                var r =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                a.$parsers.unshift(function (t) {
                  return r.test(t) || !t
                    ? (a.$setValidity("email", !0), t)
                    : (a.$setValidity("email", !1), null);
                });
              },
            };
          });
      },
      66957: function (t, e, n) {
        "use strict";
        n(67559), n(84392), n(66893);
        var a = n(1792),
          r = n(82701),
          i = n(25447),
          o = [
            "$scope",
            "$http",
            "$location",
            "$window",
            "Uri",
            "Notifications",
            "$translate",
            function (t, e, n, r, i, o, s) {
              var c = i.appUri(":engine"),
                l = {};
              e.get(i.appUri("engine://engine/"))
                .then(function (e) {
                  (t.engines = e.data),
                    a.forEach(t.engines, function (t) {
                      l[t.name] = t;
                    }),
                    (t.currentEngine = l[c]),
                    t.currentEngine ||
                      (o.addError({
                        status: s.instant(
                          "DIRECTIVE_ENGINE_SELECT_STATUS_NOT_FOUND"
                        ),
                        message: s.instant(
                          "DIRECTIVE_ENGINE_SELECT_MESSAGE_NOT_FOUND"
                        ),
                        scope: t,
                      }),
                      n.path("/dashboard"));
                })
                .catch(a.noop);
            },
          ];
        t.exports = function () {
          return {
            template: r,
            replace: !0,
            controller: o,
            link: function (t, e, n) {
              var a;
              t.$watch(n.ngShow, function (t) {
                t &&
                  !a &&
                  (a = i('<li class="divider-vertical"></li>').insertAfter(e)),
                  !t && a && (a.remove(), (a = null));
              }),
                t.$on("$destroy", function () {
                  a && a.remove();
                });
            },
          };
        };
      },
      43188: function (t, e, n) {
        "use strict";
        var a = n(1792),
          r = n(69064);
        t.exports = [
          "$translate",
          function (t) {
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
              link: function (e, n, r) {
                if (
                  ((e.isRequired =
                    null !== r.required && void 0 !== r.required),
                  !e.property)
                )
                  throw new Error(
                    t.instant("DIRECTIVE_INPLACE_TEXTFIELD_ERROR_MSG")
                  );
                (e.initializeCallback
                  ? e.$parent[e.initializeCallback]
                  : function (t, e) {
                      e();
                    })(e, function () {
                  !(function (t) {
                    (t.value = t.context[t.property] || t.defaultValue || null),
                      (t.enter = function () {
                        (t.editing = !0), (t.value = t.context[t.property]);
                      }),
                      (t.submit = function () {
                        var e = this;
                        t.context[t.property] !== e.value
                          ? ((t.context[t.property] = e.value),
                            a.isFunction(t.$parent[t.submitCallback]) &&
                              t.$parent[t.submitCallback](e),
                            t.leave())
                          : t.leave();
                      }),
                      (t.leave = function () {
                        t.editing = !1;
                      });
                  })(e);
                });
              },
            };
          },
        ];
      },
      66011: function (t, e, n) {
        "use strict";
        n(67559);
        var a = n(1792),
          r = n(36143),
          i = n(66957),
          o = n(42401),
          s = n(43188),
          c = n(80013),
          l = n(77337),
          u = n(25512),
          d = n(89155),
          p = n(5085),
          h = n(90517);
        n(6978);
        var f = a.module("camunda.common.directives", ["ui.bootstrap", h.name]);
        f.directive("email", r),
          f.directive("autoFill", o),
          f.directive("engineSelect", i),
          f.directive("camInPlaceTextField", s),
          f.directive("notificationsPanel", c),
          f.directive("passwordRepeat", l),
          f.directive("showIfAuthorized", u),
          f.directive("nl2br", d),
          f.directive("instantTypeahead", p),
          f.config([
            "$uibModalProvider",
            "$uibTooltipProvider",
            function (t, e) {
              (t.options = { animation: !0, backdrop: !0, keyboard: !0 }),
                e.options({ animation: !0, popupDelay: 100, appendToBody: !0 });
            },
          ]),
          (t.exports = f);
      },
      5085: function (t) {
        "use strict";
        var e = "[$empty$]";
        t.exports = [
          function () {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (t, n, a, r) {
                r.$parsers.unshift(function (t) {
                  var n = t || e;
                  return (r.$viewValue = n), n;
                }),
                  r.$parsers.push(function (t) {
                    return t === e ? "" : t;
                  }),
                  (t.instantTypeahead = function (t, n) {
                    return (
                      n === e ||
                      ("" + t).toLowerCase().indexOf(("" + n).toLowerCase()) >
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
      89155: function (t, e, n) {
        "use strict";
        n(56806),
          n(31083),
          (t.exports = [
            function () {
              return {
                scope: { original: "=nl2br" },
                link: function (t, e) {
                  e.text(t.original || "");
                  var n = e.html().replace(/\n/g, "<br/>");
                  e.html(n);
                },
              };
            },
          ]);
      },
      80013: function (t, e, n) {
        "use strict";
        n(82447), n(27473), n(84392), n(25208);
        t.exports = [
          "Notifications",
          "$filter",
          "$sce",
          function (t, e, n) {
            return {
              restrict: "EA",
              scope: { filter: "=notificationsFilter" },
              template:
                '<div class="notifications">  <div uib-alert ng-repeat="notification in notifications" class="alert" ng-class="notificationClass(notification)">    <button type="button" class="close" ng-click="removeNotification(notification)">&times;</button>    <strong class="status" ng-bind-html="trustHTML(notification.status)"></strong>     <strong ng-if="notification.message">:</strong>    <span class="message" ng-bind-html="trustHTML(notification.message)"></span>  </div></div>',
              link: function (a) {
                var r = a.filter;
                var i = (a.notifications = []),
                  o = {
                    add: function (t) {
                      return (
                        !!(function (t) {
                          return !r || !!e("filter")([t], r).length;
                        })(t) && (i.push(t), !0)
                      );
                    },
                    remove: function (t) {
                      var e = i.indexOf(t);
                      -1 != e && i.splice(e, 1);
                    },
                  };
                t.registerConsumer(o),
                  (a.removeNotification = function (t) {
                    i.splice(i.indexOf(t), 1);
                  }),
                  (a.notificationClass = function (t) {
                    var e = "info";
                    return (
                      ["danger", "error", "success", "warning", "info"].indexOf(
                        t.type
                      ) > -1 && (e = t.type),
                      "alert-" + e
                    );
                  }),
                  (a.trustHTML = function (t) {
                    return n.trustAsHtml(t);
                  }),
                  a.$on("$destroy", function () {
                    t.unregisterConsumer(o);
                  });
              },
            };
          },
        ];
      },
      77337: function (t) {
        "use strict";
        t.exports = function () {
          return {
            restrict: "A",
            require: "ngModel",
            link: function (t, e, n, a) {
              var r = n.passwordRepeat;
              a.$parsers.unshift(function (e) {
                var n = e == t.$eval(r);
                return a.$setValidity("passwordRepeat", n), e;
              }),
                t.$watch(r, function (t) {
                  var e = t == a.$viewValue;
                  a.$setValidity("passwordRepeat", e),
                    e || a.$setViewValue(a.$viewValue);
                });
            },
          };
        };
      },
      25512: function (t) {
        "use strict";
        var e = {
          application: 0,
          user: 1,
          group: 2,
          "group membership": 3,
          authorization: 4,
        };
        t.exports = [
          "$animate",
          "AuthorizationResource",
          function (t, n) {
            return {
              transclude: "element",
              priority: 1e3,
              terminal: !0,
              restrict: "A",
              compile: function (a, r, i) {
                return function (a, o) {
                  var s,
                    c,
                    l = r.authPermission,
                    u = r.authResourceName,
                    d = a.$eval(r.authResourceId),
                    p = "true" === r.authInverse;
                  n.check(
                    (function (t, n, a) {
                      var r = {};
                      return (
                        (r.permissionName = t),
                        (r.resourceName = n),
                        (r.resourceType = e[n]),
                        a && (r.resourceId = a),
                        r
                      );
                    })(l, u, d)
                  )
                    .$promise.then(function (e) {
                      s && (t.leave(s), (s = void 0)),
                        c && (c.$destroy(), (c = void 0)),
                        ((e.authorized && !p) || (!e.authorized && p)) &&
                          ((c = a.$new()),
                          i(c, function (e) {
                            (s = e), t.enter(e, o.parent(), o);
                          }));
                    })
                    .catch(function () {});
                };
              },
            };
          },
        ];
      },
      35107: function (t) {
        "use strict";
        t.exports = function () {
          return function (t, e) {
            if (t)
              return t < 950
                ? t
                : (e || (e = 1),
                  (function (t, e) {
                    e = Math.pow(10, e);
                    for (
                      var n = ["k", "M", "G", "T", "P", "E", "Z", "Y"],
                        a = n.length - 1;
                      a >= 0;
                      a--
                    ) {
                      var r = Math.pow(10, 3 * (a + 1));
                      if (r <= t)
                        return (
                          1e3 == (t = Math.round((t * e) / r) / e) &&
                            a < n.length - 1 &&
                            ((t = 1), a++),
                          (t += n[a])
                        );
                    }
                    return t;
                  })(t, e));
          };
        };
      },
      68416: function (t, e, n) {
        "use strict";
        var a = n(1792),
          r = n(92620);
        n(61893);
        var i = a.module("cam.commons.filter.date", ["pascalprecht.translate"]);
        i.provider("camDateFormat", function () {
          var t = { normal: "LLL", short: "LL", long: "LLLL" };
          (this.setDateFormat = function (e, n) {
            t[(n = n || "normal")] = e;
          }),
            (this.$get = function () {
              return function (e) {
                return t[(e = e || "normal")];
              };
            });
        }),
          i.config([
            "$filterProvider",
            function (t) {
              t.register("camDate", [
                "$translate",
                "camDateFormat",
                function (t, e) {
                  return function (t, n) {
                    return t
                      ? ("number" == typeof t && (t = new Date(t)),
                        r(t, r.ISO_8601).format(e(n)))
                      : "";
                  };
                },
              ]);
            },
          ]),
          (t.exports = i);
      },
      40932: function (t, e, n) {
        "use strict";
        n(67559);
        var a = n(1792),
          r = n(72599),
          i = n(90517),
          o = n(40263),
          s = n(45386),
          c = n(66011),
          l = n(7154),
          u = n(92773),
          d = n(38025),
          p = n(16386),
          h = n(68416);
        n(6978),
          n(61893),
          n(82298),
          n(27110),
          (t.exports = a.module("cam.commons", [
            r.name,
            i.name,
            o.name,
            s.name,
            c.name,
            l.name,
            u.name,
            d.name,
            p.name,
            h.name,
            "ui.bootstrap",
            "pascalprecht.translate",
            "ngCookies",
            "ngAnimate",
          ]));
      },
      40263: function (t, e, n) {
        "use strict";
        n(45477), n(84735), n(67559), n(84392), n(66893);
        var a = n(1792);
        n(91660);
        var r = n(25447),
          i = a.module("camunda.common.pages", ["ngRoute"]),
          o = [
            "$rootScope",
            "$location",
            "Notifications",
            "AuthenticationService",
            "shouldDisplayAuthenticationError",
            "$translate",
            "configuration",
            function (t, e, n, a, i, o, s) {
              function c(t) {
                (t.http = !0), (t.exclusive = ["http"]), n.addError(t);
              }
              t.$on("httpError", function (n, l) {
                var u,
                  d = l.status,
                  p = l.data,
                  h = l.response.config;
                if ("GET" !== h.method || "/camunda-welcome" !== h.url)
                  switch (d) {
                    case 500:
                      p && p.message
                        ? c({
                            status: o.instant("PAGES_STATUS_SERVER_ERROR"),
                            message: p.message,
                            exceptionType: p.exceptionType,
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
                      -1 !== e.absUrl().indexOf("/setup/#")
                        ? e.path("/setup")
                        : (e.absUrl(),
                          (u = s.getAppVendor() + " " + s.getAppName()),
                          r("head title").text(u),
                          a.updateAuthentication(null),
                          t.$broadcast("authentication.login.required"));
                      break;
                    case 403:
                      if ("AuthorizationException" == p.type) {
                        var f;
                        if (p.resourceId)
                          f = o.instant("PAGES_MSG_ACCESS_DENIED_RESOURCE_ID", {
                            permissionName: p.permissionName.toLowerCase(),
                            resourceName: p.resourceName.toLowerCase(),
                            resourceId: p.resourceId,
                          });
                        else {
                          var m = p.missingAuthorizations.map(function (t) {
                            return (
                              "'" +
                              t.permissionName +
                              "' " +
                              t.resourceName +
                              "s"
                            );
                          });
                          f = o.instant("PAGES_MSG_ACCESS_DENIED", {
                            missingAuths: m.join(),
                          });
                        }
                        c({
                          status: o.instant("PAGES_STATUS_ACCESS_DENIED"),
                          message: f,
                        });
                      } else
                        c({
                          status: o.instant("PAGES_STATUS_ACCESS_DENIED"),
                          message: o.instant("PAGES_MSG_ACTION_DENIED"),
                        });
                      break;
                    case 404:
                      i() &&
                        c({
                          status: o.instant("PAGES_STATUS_NOT_FOUND"),
                          message: o.instant("PAGES_MSG_NOT_FOUND"),
                        });
                      break;
                    default:
                      c({
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
            function (t, e, n, r, i, o, s) {
              var c = i.appUri(":engine"),
                l = {};
              e
                .get(i.appUri("engine://engine/"))
                .then(function (e) {
                  (t.engines = e.data),
                    a.forEach(t.engines, function (t) {
                      l[t.name] = t;
                    }),
                    (t.currentEngine = l[c]),
                    t.currentEngine ||
                      (o.addError({
                        status: s.instant("PAGES_STATUS_NOT_FOUND"),
                        message: s.instant("PAGES_MSG_ENGINE_NOT_EXISTS"),
                        scope: t,
                      }),
                      n.path("/"));
                })
                .catch(a.noop),
                t.$watch("currentEngine", function (t) {
                  t &&
                    c !== t.name &&
                    (r.location.href = i.appUri("app://../" + t.name + "/"));
                });
            },
          ];
        t.exports = i
          .run(o)
          .controller("ProcessEngineSelectionController", s)
          .controller("AuthenticationController", [
            "$scope",
            "$window",
            "$cacheFactory",
            "$location",
            "Notifications",
            "AuthenticationService",
            function (t, e, n, a, r, i) {
              t.logout = function () {
                i.logout();
              };
            },
          ])
          .controller("NavigationController", [
            "$scope",
            "$location",
            function (t, e) {
              t.activeClass = function (t) {
                return -1 != e.absUrl().indexOf(t) ? "active" : "";
              };
            },
          ]);
      },
      45386: function (t, e, n) {
        "use strict";
        var a = n(1792),
          r = n(57537),
          i = n(69353),
          o = a.module("webapps.plugin", []);
        r(o), i(o), (t.exports = o);
      },
      69353: function (t, e, n) {
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
        var a = n(1792),
          r = n(25447);
        t.exports = function (t) {
          var e;
          t._camPlugins = {};
          var n = [],
            i = r("base").attr("cam-exclude-plugins") || "";
          function o(t) {
            return String.prototype.trim
              ? t.trim()
              : t.replace(/^\s+|\s+$/g, "");
          }
          i &&
            (a.forEach(i.split(","), function (t) {
              var e = "*";
              (t = t.split(":")).length >= 2 && o(t[1]) && (e = o(t.pop())),
                (t = o(t.shift())) && n.push(t + ":" + e);
            }),
            (e = new RegExp("(" + n.join("|") + ")", "i")));
          var s = [
            function () {
              var n = {};
              (this.registerPlugin = function (a, r, i) {
                ((t._camPlugins[r + ":" + i.id] = !1),
                e && e.test(r + ":" + i.id)) ||
                  ((t._camPlugins[r + ":" + i.id] = !0),
                  (function (t, e, n) {
                    !(function (t, e) {
                      for (
                        var n,
                          a = void 0 !== e.priority ? e.priority : -1 / 0,
                          r = 0;
                        (n = t[r]);
                        r++
                      )
                        if (void 0 === n.priority || n.priority < a)
                          return void t.splice(r, 0, e);
                      t.push(e);
                    })((n[t] = n[t] || []), e);
                  })(r, i, (n[a] = n[a] || {})));
              }),
                (this.$get = [
                  "$filter",
                  function (t) {
                    return {
                      getAllProviders: function (t) {
                        return n[t] || {};
                      },
                      getProviders: function (e, a) {
                        if (!e) throw new Error("No type given");
                        var r = a.component;
                        if (!r) throw new Error("No component given");
                        var i = (n[e] || {})[r];
                        return (
                          a.id && (i = t("filter")(i, { id: a.id })), i || []
                        );
                      },
                      getProvider: function (t, e) {
                        return (this.getProviders(t, e) || [])[0];
                      },
                    };
                  },
                ]);
            },
          ];
          t.provider("Plugins", s);
          var c = [
            "PluginsProvider",
            function (t) {
              (this.registerDefaultView = function (n, a) {
                (e && e.test(n + ":" + a.id)) || t.registerPlugin("view", n, a);
              }),
                (this.registerView = function (e, n) {
                  t.registerPlugin("view", e, n);
                }),
                (this.$get = [
                  "Uri",
                  "Plugins",
                  function (t, e) {
                    var n = !1;
                    function r() {
                      var r;
                      n ||
                        ((r = e.getAllProviders("view")),
                        a.forEach(r, function (e) {
                          a.forEach(e, function (e) {
                            e.url && (e.url = t.appUri(e.url));
                          });
                        }),
                        (n = !0));
                    }
                    return {
                      getProviders: function (t) {
                        return r(), e.getProviders("view", t);
                      },
                      getProvider: function (t) {
                        return (this.getProviders(t) || [])[0];
                      },
                    };
                  },
                ]);
            },
          ];
          t.provider("Views", c);
          var l = [
            "PluginsProvider",
            function (t) {
              (this.registerData = function (e, n) {
                t.registerPlugin("data", e, n);
              }),
                (this.$get = [
                  "Plugins",
                  "$injector",
                  function (t, e) {
                    return {
                      getProviders: function (e) {
                        return t.getProviders("data", e);
                      },
                      getProvider: function (t) {
                        return (this.getProviders(t) || [])[0];
                      },
                      instantiateProviders: function (t, n) {
                        var r = this.getProviders({ component: t });
                        a.forEach(r, function (t) {
                          e.instantiate(t.controller, n);
                        });
                      },
                    };
                  },
                ]);
            },
          ];
          t.provider("Data", l);
        };
      },
      57537: function (t, e, n) {
        "use strict";
        n(84392), n(66893);
        var a = n(1792);
        t.exports = function (t) {
          t.directive("view", [
            "$q",
            "$http",
            "$templateCache",
            "$anchorScroll",
            "$compile",
            "$controller",
            function (t, e, n, r, i, o) {
              return {
                restrict: "ECA",
                terminal: !0,
                link: function (s, c, l) {
                  var u;
                  function d() {
                    u && (u.$destroy(), (u = null));
                  }
                  function p() {
                    c.html(""), d();
                  }
                  s.$watch(l.provider, function () {
                    var h = s.$eval(l.provider),
                      f = s.$eval(l.vars) || {};
                    if (!h) return void p();
                    t.when(
                      (function (t) {
                        var r = t.template;
                        if (r) return r;
                        var i = t.url;
                        return e
                          .get(i, { cache: n })
                          .then(function (t) {
                            return t.data;
                          })
                          .catch(a.noop);
                      })(h)
                    ).then(
                      function (t) {
                        c.html(t), d();
                        var e,
                          n = i(c.contents()),
                          l = {};
                        (u = s.$new(!0)),
                          f &&
                            (f.read &&
                              a.forEach(f.read, function (t) {
                                (u[t] = s[t]),
                                  s.$watch(t, function (e) {
                                    u[t] = e;
                                  });
                              }),
                            f.write &&
                              a.forEach(f.write, function (t) {
                                u.$watch(t, function (e) {
                                  s[t] = e;
                                });
                              })),
                          h.controller &&
                            ((l.$scope = u),
                            (e = o(h.controller, l)),
                            c.children().data("$ngControllerController", e)),
                          n(u),
                          u.$emit("$pluginContentLoaded"),
                          r();
                      },
                      function (t) {
                        throw (p(), t);
                      }
                    );
                  });
                },
              };
            },
          ]);
        };
      },
      91071: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri("engine://engine/:engine/authorization/:action"),
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
      7154: function (t, e, n) {
        "use strict";
        var a = n(1792),
          r = n(91071),
          i = a.module("camunda.common.resources", []);
        i.factory("AuthorizationResource", r), (t.exports = i);
      },
      92773: function (t, e, n) {
        "use strict";
        n(84392), n(56806), n(31083), n(92695), n(66893);
        var a = n(1792),
          r = [
            "$location",
            "$rootScope",
            function (t, e) {
              var n = !1;
              e.$on("$routeUpdate", function (t, a) {
                n ? (n = !1) : e.$broadcast("$routeChanged", a);
              }),
                e.$on("$routeChangeSuccess", function () {
                  n = !1;
                });
              var r = function () {
                return t.search.apply(t, arguments);
              };
              return (
                (r.updateSilently = function (e, r) {
                  var i = t.absUrl();
                  a.forEach(e, function (e, n) {
                    t.search(n, e);
                  }),
                    t.absUrl() != i && (n = !0),
                    r && t.replace();
                }),
                r
              );
            },
          ],
          i = a.module("camunda.common.search", []);
        i.factory("search", r), (t.exports = i);
      },
      35914: function (t, e, n) {
        "use strict";
        n(84392), n(66893);
        var a = n(1792),
          r = n(59721);
        t.exports = [
          "$rootScope",
          "$timeout",
          "$q",
          "$cookies",
          "configuration",
          "ifUnauthorizedForwardToWelcomeApp",
          function (t, e, n, i, o, s) {
            function c(t) {
              this._wrapped = new r.Client.HttpClient(t);
            }
            return (
              a.forEach(
                ["post", "get", "load", "put", "del", "options", "head"],
                function (r) {
                  c.prototype[r] = function (c, l) {
                    var u = e(function () {}, 1e5);
                    !(function (t) {
                      var e = (t.headers = t.headers || {}),
                        n = i.get(o.getCsrfCookieName());
                      n && (e["X-XSRF-TOKEN"] = n);
                    })(l);
                    var d = a.isFunction(l.done) ? l.done : a.noop;
                    return (
                      (l.done = function (n, a, r) {
                        function i() {
                          if ((s(r), n && 401 === n.status))
                            return (
                              t.$broadcast("authentication.changed", null),
                              (t.authentication = null),
                              void t.$broadcast("authentication.login.required")
                            );
                          d(n, a);
                        }
                        var o = t.$$phase;
                        "$apply" !== o && "$digest" !== o ? t.$apply(i) : i(),
                          e.cancel(u);
                      }),
                      n.when(this._wrapped[r](c, l))
                    );
                  };
                }
              ),
              a.forEach(["on", "once", "off", "trigger"], function (t) {
                c.prototype[t] = function () {
                  this._wrapped[t].apply(this, arguments);
                };
              }),
              c
            );
          },
        ];
      },
      81236: function (t) {
        "use strict";
        t.exports = [
          "$rootScope",
          function (t) {
            var e = 0;
            return {
              logStarted: function () {
                e || t.$broadcast("requestStarted"), e++;
              },
              logFinished: function () {
                --e || t.$broadcast("requestFinished");
              },
            };
          },
        ];
      },
      74791: function (t, e, n) {
        "use strict";
        n(67559),
          n(56806),
          n(31083),
          (t.exports = [
            "$route",
            "$q",
            "$location",
            "Notifications",
            "$translate",
            function (t, e, n, a, r) {
              return {
                getByRouteParam: function (i, o) {
                  var s = e.defer(),
                    c = t.current.params[i],
                    l = o.resolve,
                    u = o.name || "entity";
                  function d(t) {
                    s.resolve(t);
                  }
                  function p(t) {
                    var e,
                      i,
                      l,
                      d = !1;
                    404 === t.status
                      ? ((e = r.instant(
                          "SERVICES_RESOURCE_RESOLVER_ID_NOT_FOUND",
                          { resourceName: u, id: c }
                        )),
                        (i = !0),
                        "function" ==
                          typeof (l = o.redirectTo || "/dashboard") &&
                          ((d = !0), l(t)))
                      : 401 === t.status
                      ? ((e = r.instant(
                          "SERVICES_RESOURCE_RESOLVER_AUTH_FAILED"
                        )),
                        (l = "/login"))
                      : ((e = r.instant(
                          "SERVICES_RESOURCE_RESOLVER_RECEIVED_STATUS",
                          { status: t.status }
                        )),
                        (l = "/dashboard")),
                      d ||
                        (n.path(l),
                        i && n.replace(),
                        a.addError({
                          status: r.instant(
                            "SERVICES_RESOURCE_RESOLVER_DISPLAY_FAILED",
                            { resourceName: u }
                          ),
                          message: e,
                          http: !0,
                          exclusive: ["http"],
                        })),
                      s.reject(e);
                  }
                  var h = l(c);
                  if (h.$promise && h.$promise.then)
                    h = h.$promise.then(function (t) {
                      d(t);
                    }, p);
                  else {
                    if (!h.then)
                      throw new Error(
                        r.instant("SERVICES_RESOURCE_RESOLVER_NO_PROMISE")
                      );
                    h = h.then(d, p);
                  }
                  return s.promise;
                },
              };
            },
          ]);
      },
      93059: function (t, e, n) {
        "use strict";
        n(85541),
          (t.exports = [
            "$window",
            function (t) {
              var e = t.localStorage,
                n = JSON.parse(e.getItem("camunda") || "{}");
              return {
                get: function (t, e) {
                  return void 0 !== n[t] ? n[t] : e;
                },
                set: function (t, a) {
                  (n[t] = a), e.setItem("camunda", JSON.stringify(n));
                },
                remove: function (t) {
                  delete n[t], e.setItem("camunda", JSON.stringify(n));
                },
              };
            },
          ]);
      },
      68587: function (t) {
        "use strict";
        var e = document.querySelector("base").getAttribute("app-name");
        t.exports = function () {
          this.$get = function () {
            return e;
          };
        };
      },
      86374: function (t) {
        "use strict";
        t.exports = [
          "$timeout",
          function (t) {
            return function (e, n) {
              var a;
              return function r() {
                var i = this,
                  o = arguments;
                (r.$loading = !0),
                  a && t.cancel(a),
                  (a = t(function () {
                    (a = null), (r.$loading = !1), e.apply(i, o);
                  }, n));
              };
            };
          },
        ];
      },
      61230: function (t, e, n) {
        "use strict";
        n(56806),
          n(31083),
          (t.exports = function () {
            return function (t) {
              return encodeURIComponent(t)
                .replace(/%2F/g, "%252F")
                .replace(/\*/g, "%2A")
                .replace(/%5C/g, "%255C");
            };
          });
      },
      13826: function (t, e, n) {
        "use strict";
        var a = n(92620);
        t.exports = function () {
          return function (t) {
            return t ? a(t, a.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : t;
          };
        };
      },
      48597: function (t, e, n) {
        "use strict";
        n(34820),
          n(76474),
          (t.exports = [
            "Uri",
            function (t) {
              return function (e) {
                if (e) {
                  var n,
                    a =
                      null === (n = e["x-authorized-apps"]) || void 0 === n
                        ? void 0
                        : n.split(",");
                  if (a) {
                    var r = t.appUri(":appName");
                    "welcome" === r ||
                      a.includes(r) ||
                      (window.location.href = t.appUri(
                        "app://../../welcome/:engine/"
                      ));
                  }
                }
              };
            },
          ]);
      },
      38025: function (t, e, n) {
        "use strict";
        n(82447), n(67559), n(84392), n(56806), n(54062);
        var a = n(1792),
          r = n(90517),
          i = n(61230),
          o = n(86374),
          s = n(81236),
          c = n(74791),
          l = n(35914),
          u = n(48877),
          d = n(13826),
          p = n(48597),
          h = n(47215),
          f = n(61262),
          m = n(68587),
          g = a.module("camunda.common.services", [r.name]);
        g.filter("escape", i),
          g.factory("debounce", o),
          g.factory("RequestLogger", s),
          g.factory("ResourceResolver", c),
          g.factory("camAPIHttpClient", l),
          g.factory("unescape", u),
          g.factory("fixDate", d),
          g.factory("ifUnauthorizedForwardToWelcomeApp", p),
          g.factory("unfixDate", h),
          g.factory("shouldDisplayAuthenticationError", f),
          g.provider("canonicalAppName", m),
          g.config([
            "$httpProvider",
            function (t) {
              t.interceptors.push([
                "$rootScope",
                "$q",
                "RequestLogger",
                "ifUnauthorizedForwardToWelcomeApp",
                function (t, e, n, a) {
                  return (
                    n.logStarted(),
                    {
                      response: function (t) {
                        return n.logFinished(), a(t.headers()), t;
                      },
                      responseError: function (a) {
                        n.logFinished();
                        var r = {
                          status: parseInt(a.status),
                          response: a,
                          data: a.data,
                        };
                        return t.$broadcast("httpError", r), e.reject(a);
                      },
                    }
                  );
                },
              ]);
            },
          ]),
          g.config([
            "$httpProvider",
            "$windowProvider",
            function (t, e) {
              var n = e
                .$get()
                .location.href.match(
                  /\/(?:app)(?!.*\/app\/)\/([\w-]+)\/([\w-]+)/
                );
              if (!n) throw new Error("no process engine selected");
              t.defaults.headers.get = { "X-Authorized-Engine": n[2] };
            },
          ]),
          (t.exports = g);
      },
      61262: function (t) {
        "use strict";
        t.exports = [
          "$location",
          function (t) {
            return function () {
              var e = t.path();
              return (
                "/login" !== e &&
                "/dashboard" !== e &&
                "/" !== e &&
                "/welcome" !== e
              );
            };
          },
        ];
      },
      48877: function (t, e, n) {
        "use strict";
        n(56806),
          n(31083),
          (t.exports = function () {
            return function (t) {
              var e = t
                .replace(/%252F/g, "%2F")
                .replace(/%255C/g, "%5C")
                .replace(/%2A/g, "*");
              return decodeURIComponent(e);
            };
          });
      },
      47215: function (t, e, n) {
        "use strict";
        var a = n(92620);
        t.exports = function () {
          return function (t) {
            return t ? a(t, a.ISO_8601).format("YYYY-MM-DDTHH:mm:ss") : t;
          };
        };
      },
      18585: function (t, e, n) {
        "use strict";
        n(84392), n(56806), n(31083);
        var a = ["http://www.omg.org/spec/DMN/20151101/dmn11.xsd"];
        function r(t, e) {
          return t.replace(
            'xmlns="' + e + '"',
            'xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"'
          );
        }
        t.exports = function (t) {
          return a.reduce(r, t);
        };
      },
      90517: function (t, e, n) {
        "use strict";
        n(82447), n(84392);
        var a = n(1792),
          r = n(83845),
          i = n(15806),
          o = n(62197);
        t.exports = a
          .module("cam.commons.util", [])
          .filter("uri", r)
          .provider("Uri", i)
          .service("Notifications", o);
      },
      67110: function (t) {
        "use strict";
        t.exports = {
          load: function () {
            return requirejs.s.contexts._.defined;
          },
        };
      },
      62197: function (t, e, n) {
        "use strict";
        n(27473), n(84392), n(66893);
        var a = n(1792);
        function r(t) {
          var e = document.createTextNode(t),
            n = document.createElement("div");
          return n.appendChild(e), n.innerHTML;
        }
        t.exports = [
          "$filter",
          "$timeout",
          function (t, e) {
            return {
              notifications: [],
              consumers: [],
              addError: function (t) {
                t.type || (t.type = "danger"), this.add(t);
              },
              addMessage: function (t) {
                t.type || (t.type = "info"), this.add(t);
              },
              add: function (t) {
                var n = this,
                  i = this.notifications,
                  o = this.consumers,
                  s = t.exclusive;
                if (
                  (t.unsafe ||
                    ((t.status = r(t.status)),
                    (t.message = r(t.message || ""))),
                  s)
                )
                  if ("boolean" == typeof s) this.clearAll();
                  else {
                    var c = {};
                    a.forEach(s, function (e) {
                      c[e] = t[e];
                    }),
                      n.clear(c);
                  }
                i.push(t);
                for (var l, u = o.length - 1; (l = o[u]) && !l.add(t); u--);
                t.duration &&
                  e(function () {
                    t.scope && delete t.scope, n.clear(t);
                  }, t.duration),
                  t.scope &&
                    t.scope.$on("$destroy", function () {
                      delete t.scope, n.clear(t);
                    });
              },
              clear: function (e) {
                var n = this.notifications,
                  r = this.consumers,
                  i = [];
                "string" == typeof e && (e = { status: e }),
                  (i = t("filter")(n, e)).push(e),
                  a.forEach(i, function (t) {
                    var e = n.indexOf(t);
                    -1 != e && n.splice(e, 1),
                      a.forEach(r, function (e) {
                        e.remove(t);
                      });
                  });
              },
              clearAll: function () {
                for (var t = this.notifications; t.length; ) {
                  var e = t.pop();
                  this.clear(e);
                }
              },
              registerConsumer: function (t) {
                this.consumers.push(t);
              },
              unregisterConsumer: function (t) {
                var e = this.consumers,
                  n = e.indexOf(t);
                -1 != n && e.splice(n, 1);
              },
            };
          },
        ];
      },
      83845: function (t) {
        "use strict";
        t.exports = [
          "Uri",
          function (t) {
            return function (e) {
              return t.appUri(e);
            };
          },
        ];
      },
      15806: function (t, e, n) {
        "use strict";
        n(56806), n(31083);
        var a = n(1792);
        t.exports = function () {
          var t = /[\w]+:\/\/|:[\w]+/g,
            e = {};
          (this.replace = function (t, n) {
            e[t] = n;
          }),
            (this.$get = [
              "$injector",
              function (n) {
                return {
                  appUri: function (r) {
                    return r.replace(t, function (t) {
                      var r = e[t];
                      return void 0 === r
                        ? t
                        : ((a.isFunction(r) || a.isArray(r)) &&
                            (r = n.invoke(r)),
                          r);
                    });
                  },
                };
              },
            ]);
        };
      },
      70555: function (t, e, n) {
        "use strict";
        n(85174);
        var a = n(82236).A,
          r = {};
        t.exports = {
          generateViewer: function (t) {
            var e = a;
            t.disableNavigation &&
              (e = Object.getPrototypeOf(a.prototype).constructor);
            return new e(t);
          },
          cacheViewer: function (t) {
            return t.key && (r[t.key] = t.viewer);
          },
        };
      },
      38284: function (t, e, n) {
        "use strict";
        var a = n(54834),
          r = n(18107);
        t.exports = [
          "$uibModal",
          function (t) {
            return {
              scope: { annotation: "<", readonly: "=?", onSubmit: "&" },
              template: a,
              link: function (e) {
                e.openModal = function () {
                  t.open(
                    r(e.annotation, !!e.readonly, e.onSubmit())
                  ).result.then(function (t) {
                    e.annotation = t;
                  });
                };
              },
            };
          },
        ];
      },
      18107: function (t, e, n) {
        "use strict";
        n(84392), n(17003), n(61794);
        var a = n(13919);
        t.exports = function (t, e, n) {
          return {
            template: a,
            controller: [
              "$scope",
              "Notifications",
              "configuration",
              "camAPI",
              "$translate",
              function (a, r, i, o, s) {
                (a.readOnly = e),
                  (a.maxAnnotationLength =
                    i.getUserOperationLogAnnotationLength()),
                  (a.text = t || ""),
                  (a.dirty = !1),
                  (a.valid = !0),
                  (a.loadingState = "INITIAL"),
                  (a.updateAnnotation = function () {
                    n(a.text)
                      .then(function () {
                        r.addMessage({
                          status: s.instant("SUCCESS"),
                          message: s.instant(
                            "PLGN_AUDIT_EDIT_NOTIFICATION_SUCCESS"
                          ),
                          exclusive: !0,
                        }),
                          (a.dirty = !1);
                      })
                      .catch(function (e) {
                        r.addError({
                          status: s.instant("ERROR"),
                          message:
                            s.instant("PLGN_AUDIT_EDIT_NOTIFICATION_FAILURE") +
                            e,
                          exclusive: !0,
                        }),
                          (a.text = t);
                      })
                      .finally(function () {
                        a.loadingState = "DONE";
                      });
                  });
              },
            ],
          };
        };
      },
      1634: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function r(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return i(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return i(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return i(t, e);
            })(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function i(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
          return a;
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
        t.exports = [
          "$q",
          "$document",
          "$compile",
          "$location",
          "$rootScope",
          "search",
          "debounce",
          function (t, e, n, i, u, d, p) {
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
              link: function (l, h) {
                var f,
                  m = null,
                  g = null,
                  v = [],
                  b = h[0].querySelector(".diagram-holder");
                function y() {
                  b.appendChild(m._container);
                }
                (l.grabbing = !1),
                  (l.disableNavigation = l.$eval(l.disableNavigation)),
                  (l.control = l.control || {}),
                  (l.control.highlight = function (t) {
                    g.addMarker(t, "highlight"),
                      h
                        .find('[data-element-id="' + t + '"]>.djs-outline')
                        .attr({ rx: "14px", ry: "14px" });
                  }),
                  (l.control.clearHighlight = function (t) {
                    g.removeMarker(t, "highlight");
                  }),
                  (l.control.isHighlighted = function (t) {
                    return g.hasMarker(t, "highlight");
                  }),
                  (l.control.createBadge = function (t, e) {
                    var a,
                      r = m.get("overlays");
                    e.html
                      ? (a = e.html)
                      : ((a = document.createElement("span")),
                        e.color && (a.style["background-color"] = e.color),
                        e.tooltip &&
                          (a.setAttribute("tooltip", e.tooltip),
                          a.setAttribute("tooltip-placement", "top")),
                        e.text &&
                          a.appendChild(document.createTextNode(e.text)));
                    var i = r.add(t, {
                      position: e.position || { bottom: 0, right: 0 },
                      show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                      html: a,
                    });
                    return n(a)(l), i;
                  }),
                  (l.control.removeBadges = function (t) {
                    m.get("overlays").remove({ element: t });
                  }),
                  (l.control.removeBadge = function (t) {
                    m.get("overlays").remove(t);
                  }),
                  (l.control.getViewer = function () {
                    return m;
                  }),
                  (l.control.scrollToElement = function (t) {
                    var e = l.control.getElement(t);
                    g.scrollToElement(e);
                  }),
                  (l.control.getElement = function (t) {
                    return m.get("elementRegistry").get(t);
                  }),
                  (l.control.getElements = function (t) {
                    return m.get("elementRegistry").filter(t);
                  }),
                  (l.loaded = !1),
                  (l.control.isLoaded = function () {
                    return l.loaded;
                  }),
                  (l.control.addAction = function (t) {
                    var e = h.find(".actions"),
                      a = t.html;
                    e.append(a), n(a)(l);
                  }),
                  (l.control.addImage = function (n, a, r) {
                    return ((i = n),
                    (o = e[0].body),
                    (c = t.defer()),
                    (l = s
                      .element("<img>")
                      .css("position", "absolute")
                      .css("left", "-9999em")
                      .css("top", "-9999em")
                      .attr("src", i)[0]),
                    (l.onload = function () {
                      c.resolve(l);
                    }),
                    (l.onerror = function () {
                      c.reject(l);
                    }),
                    o.appendChild(l),
                    c.promise).then(
                      function (t) {
                        var i = t.offsetWidth,
                          o = t.offsetHeight,
                          c = e[0].createElementNS(
                            "http://www.w3.org/2000/svg",
                            "image"
                          );
                        return (
                          c.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            n
                          ),
                          c.setAttributeNS(null, "width", i),
                          c.setAttributeNS(null, "height", o),
                          c.setAttributeNS(null, "x", a),
                          c.setAttributeNS(null, "y", r),
                          e[0].body.removeChild(t),
                          g._viewport.appendChild(c),
                          s.element(c)
                        );
                      },
                      function (t) {
                        e[0].body.removeChild(t);
                      }
                    );
                    var i, o, c, l;
                  });
                var E = l.bpmnJsConf,
                  _ = [];
                E &&
                  E.additionalModules &&
                  !Array.isArray(E.additionalModules) &&
                  s.forEach(o.load(), function (t, e) {
                    E.additionalModules[e] && _.push(t);
                  }),
                  Array.isArray(null == E ? void 0 : E.additionalModules) &&
                    _.push.apply(_, r(E.additionalModules)),
                  (m = c.generateViewer({
                    width: "100%",
                    height: "100%",
                    canvas: { deferUpdate: !1 },
                    key: l.key,
                    disableNavigation: l.disableNavigation,
                    additionalModules: _,
                    moddleExtensions: window.bpmnJsModdleExtensions || {},
                  })).cached || y();
                var S = m.get("overlays").show.bind(m.get("overlays"));
                m.get("overlays").show = function () {
                  m.get("eventBus").fire("overlays.show"), S();
                };
                var T = m.get("overlays").hide.bind(m.get("overlays"));
                m.get("overlays").hide = function () {
                  m.get("eventBus").fire("overlays.hide"), T();
                };
                var A = p(function () {
                    m.get("overlays").show();
                  }, 300),
                  I = m.get("canvas")._viewboxChanged.bind(m.get("canvas")),
                  w = p(function () {
                    I(), m.get("overlays").hide(), A();
                  }, 0);
                m.get("canvas")._viewboxChanged = function () {
                  w();
                };
                var C = null;
                function O() {
                  var t;
                  (g = m.get("canvas")),
                    (f = m._definitions),
                    (t = m.get("eventBus")).on("element.click", N),
                    t.on("element.hover", R),
                    t.on("element.out", L),
                    t.on("element.mousedown", U),
                    t.on("canvas.viewbox.changed", P),
                    t.on("root.set", D),
                    (function () {
                      if (g) {
                        var t = JSON.parse((i.search() || {}).viewbox || "{}")[
                            f.id
                          ],
                          e = (i.search() || {}).rootElement;
                        if (e) {
                          var n = g.findRoot(e);
                          g.setRootElement(n);
                        }
                        t ? g.viewbox(t) : g.zoom("fit-viewport", "auto");
                      }
                    })(),
                    (l.loaded = !0);
                }
                l.$watch("diagramData", function (t) {
                  t &&
                    ((C = t),
                    (function () {
                      if (m.cached) return y(), O(), l.onLoad();
                      if (C) {
                        l.loaded = !1;
                        var t = "object" === a(C),
                          e = (t ? m.open : m.importXML).bind(m),
                          n = C;
                        t &&
                          (m._setDefinitions(C),
                          (n = void 0),
                          m.on("import.render.complete", function () {
                            m.get("eventBus").fire("import.done");
                          })),
                          e(n)
                            .then(function (e) {
                              var n = e.warnings;
                              (t
                                ? function (t) {
                                    t();
                                  }
                                : l.$apply.bind(l))(function () {
                                return (l.warn = n), O(), l.onLoad();
                              });
                            })
                            .catch(function (t) {
                              l.error = t;
                            });
                      }
                    })());
                });
                var x = function t() {
                  (l.grabbing = !1),
                    document.removeEventListener("mouseup", t),
                    l.$apply();
                };
                function N(t) {
                  l.onClick({ element: t.element, $event: t.originalEvent });
                }
                function R(t) {
                  l.onMouseEnter({
                    element: t.element,
                    $event: t.originalEvent,
                  });
                }
                function L(t) {
                  l.onMouseLeave({
                    element: t.element,
                    $event: t.originalEvent,
                  });
                }
                function U() {
                  (l.grabbing = !0),
                    document.addEventListener("mouseup", x),
                    l.$apply();
                }
                var P = p(function (t) {
                    var e = JSON.parse((i.search() || {}).viewbox || "{}");
                    (e[f.id] = {
                      x: t.viewbox.x,
                      y: t.viewbox.y,
                      width: t.viewbox.width,
                      height: t.viewbox.height,
                    }),
                      d.updateSilently({ viewbox: JSON.stringify(e) });
                    var n = u.$$phase;
                    "$apply" !== n && "$digest" !== n
                      ? l.$apply(function () {
                          i.replace();
                        })
                      : i.replace();
                  }, 500),
                  D = function (t, e) {
                    var n = e.element;
                    l.onRootChange(),
                      n &&
                        (d.updateSilently({ rootElement: n.id }),
                        v.includes(n) ||
                          (g.zoom("fit-viewport", "auto"), v.push(n)));
                  };
                (l.zoomIn = function () {
                  m.get("zoomScroll").zoom(1, {
                    x: h[0].offsetWidth / 2,
                    y: h[0].offsetHeight / 2,
                  });
                }),
                  (l.zoomOut = function () {
                    m.get("zoomScroll").zoom(-1, {
                      x: h[0].offsetWidth / 2,
                      y: h[0].offsetHeight / 2,
                    });
                  }),
                  (l.resetZoom = function () {
                    g.resized(), g.zoom("fit-viewport", "auto");
                  }),
                  (l.control.resetZoom = l.resetZoom),
                  (l.control.refreshZoom = function () {
                    g.resized(), g.zoom(g.zoom(), "auto");
                  }),
                  l.$on("$destroy", function () {
                    var t;
                    b.removeChild(m._container),
                      (t = m.get("eventBus")).off("element.click", N),
                      t.off("element.hover", R),
                      t.off("element.out", L),
                      t.off("element.mousedown", U),
                      t.off("canvas.viewbox.changed", P),
                      t.off("root.set", D),
                      d.updateSilently({ rootElement: null }),
                      m.get("overlays").clear(),
                      c.cacheViewer({ key: l.key, viewer: m });
                  });
              },
            };
          },
        ];
      },
      14203: function (t, e, n) {
        "use strict";
        var a = n(5831);
        t.exports = [
          "$location",
          function (t) {
            return {
              restrict: "A",
              template: a,
              link: function (e) {
                e.getLink = t.absUrl.bind(t);
              },
            };
          },
        ];
      },
      97234: function (t, e, n) {
        "use strict";
        n(57507), n(84392), n(56806), n(31083), n(19824);
        var a = n(30430).throttle,
          r = n(60589),
          i = n(92620),
          o = n(35107)();
        t.exports = [
          "$window",
          function (t) {
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
              link: function (e, n) {
                var s = n[0],
                  c = t.getComputedStyle(s);
                function l() {
                  return Math.min(Math.max(0.75 * s.clientWidth, 180), 300);
                }
                (e.timespan = e.timespan || "day"),
                  (e.interval = e.interval || 900);
                var u = (e.chart = new r({
                  moment: i,
                  abbreviateNumber: o,
                  onselection: function (t) {
                    e.$apply(function () {
                      e.selection({ info: t });
                    });
                  },
                  width: s.clientWidth,
                  height: l(),
                  fontFamily: e.fontFamily || c.fontFamily,
                  fontSize: e.fontSize,
                  handleColor: e.handleColor,
                  handleColorHover: e.handleColorHover,
                  handleWidth: e.handleWidth,
                  lineColors: e.lineColors,
                  lineWidth: e.lineWidth,
                  rulersColor: e.rulersColor || c.color,
                  selectingColor: e.selectingColor,
                  textPadding: e.textPadding,
                  tickSize: e.tickSize,
                  timeLabelFormats: e.timeLabelFormats,
                  timestampFormat: e.timestampFormat,
                  unselectedColor: e.unselectedColor,
                  valueLabelsCount: e.valueLabelsCount,
                  disableSelection: e.disableSelection,
                  isLogScale: e.isLogScale,
                }));
                e.$watch("values", function () {
                  var t = s.className.replace("no-data", "");
                  e.values &&
                  e.values.length &&
                  e.values[0] &&
                  e.values[0].length
                    ? u.setData(e.values, e.timespan, e.interval)
                    : ((t += " no-data"),
                      u.setData([[]], e.timespan, e.interval)),
                    (s.className = t);
                }),
                  s.appendChild(u.canvas);
                var d = a(function () {
                  u.resize(s.clientWidth, l()).draw();
                }, 100);
                t.addEventListener("resize", d),
                  e.$on("$destroy", function () {
                    t.removeEventListener("resize", d);
                  });
              },
              template: "\x3c!-- keule!! pech jehabt! --\x3e",
            };
          },
        ];
      },
      95470: function (t, e, n) {
        "use strict";
        n(56806), n(31083);
        var a = n(44247),
          r = n(31324);
        t.exports = [
          "$timeout",
          "$translate",
          function (t, e) {
            return {
              transclude: !0,
              template: r,
              scope: { value: "=camWidgetClipboard", leftSide: "=?" },
              link: function (n, r, i) {
                var o, s;
                function c() {
                  n.$apply(),
                    (s = t(
                      function () {
                        n.copyStatus = null;
                      },
                      1200,
                      !0
                    ));
                }
                function l() {
                  var t = r[0].querySelector("[ng-transclude]"),
                    e = r[0].querySelector("a.glyphicon-copy"),
                    n = window.getComputedStyle(r[0]),
                    a = 1,
                    i = 0;
                  t &&
                    e &&
                    ((a = t.offsetWidth + e.offsetWidth),
                    (i =
                      parseInt(n.width) -
                      parseInt(n.paddingRight) -
                      parseInt(n.paddingLeft))),
                    a - i > 0
                      ? -1 === t.className.indexOf("resize") &&
                        (t.className += " resize")
                      : (t.className = t.className.replace(" resize", ""));
                }
                (n.noTooltip = void 0 !== i.noTooltip),
                  (n.copyStatus = null),
                  (n.icon = i.icon || "glyphicon-copy"),
                  n.$watch("value", function () {
                    n.tooltipText =
                      i.tooltipText ||
                      e.instant("CAM_WIDGET_COPY", { value: n.value });
                  }),
                  t(function () {
                    var t = r[0].querySelector("a." + n.icon);
                    t &&
                      (window.addEventListener("resize", l),
                      l(),
                      (o = new a(t, {
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
                      s && t.cancel(s);
                  });
              },
            };
          },
        ];
      },
      18686: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          i = n(89192);
        t.exports = [
          "$compile",
          "$location",
          "$rootScope",
          "search",
          "debounce",
          function (t, e, n, o, s) {
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
              template: i,
              link: function (i, c) {
                var l;
                (i.grabbing = !1),
                  (i.disableNavigation = i.$eval(i.disableNavigation)),
                  (i.control = i.control || {}),
                  (i.control.highlight = function (t) {
                    i.control.addMarker(t, "highlight");
                    var e = t.id || t;
                    c.find('[data-element-id="' + e + '"]>.djs-outline').attr({
                      rx: "14px",
                      ry: "14px",
                    });
                  }),
                  (i.control.clearHighlight = function (t) {
                    i.control.removeMarker(t, "highlight");
                  }),
                  (i.control.isHighlighted = function (t) {
                    return i.control.hasMarker(t, "highlight");
                  }),
                  (i.control.addMarker = function (t, e) {
                    b.addMarker(t, e);
                  }),
                  (i.control.removeMarker = function (t, e) {
                    b.removeMarker(t, e);
                  }),
                  (i.control.hasMarker = function (t, e) {
                    return b.hasMarker(t, e);
                  }),
                  (i.control.createBadge = function (e, n) {
                    var a,
                      r = d.get("overlays");
                    n.html
                      ? (a = n.html)
                      : ((a = document.createElement("span")),
                        n.color && (a.style["background-color"] = n.color),
                        n.tooltip &&
                          (a.setAttribute("tooltip", n.tooltip),
                          a.setAttribute("tooltip-placement", "top")),
                        n.text &&
                          a.appendChild(document.createTextNode(n.text)));
                    var o = r.add(e, {
                      position: n.position || { bottom: 0, right: 0 },
                      show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                      html: a,
                    });
                    return t(a)(i), o;
                  }),
                  (i.control.removeBadges = function (t) {
                    d.get("overlays").remove({ element: t });
                  }),
                  (i.control.removeBadge = function (t) {
                    d.get("overlays").remove(t);
                  }),
                  (i.control.getViewer = function () {
                    return d;
                  }),
                  (i.control.scrollToElement = function (t) {
                    var e,
                      n,
                      a,
                      r,
                      i = d.get("elementRegistry").get(t),
                      o = b.viewbox();
                    (e = Math.max(o.height, i.height)),
                      (n = Math.max(o.width, i.width)),
                      (a = Math.min(
                        Math.max(o.x, i.x - o.width + i.width),
                        i.x
                      )),
                      (r = Math.min(
                        Math.max(o.y, i.y - o.height + i.height),
                        i.y
                      )),
                      b.viewbox({ x: a, y: r, width: n, height: e });
                  }),
                  (i.control.getElement = function (t) {
                    return d.get("elementRegistry").get(t);
                  }),
                  (i.control.getElements = function (t) {
                    return d.get("elementRegistry").filter(t);
                  }),
                  (i.loaded = !1),
                  (i.control.isLoaded = function () {
                    return i.loaded;
                  }),
                  (i.control.addAction = function (e) {
                    var n = c.find(".actions"),
                      a = e.html;
                    n.append(a), t(a)(i);
                  }),
                  (i.control.addImage = function (t, e, n) {
                    return b._viewport.image(t, e, n);
                  });
                var u = r;
                i.disableNavigation &&
                  (u = Object.getPrototypeOf(r.prototype).constructor);
                var d = new u({
                    container: c[0].querySelector(".diagram-holder"),
                    width: "100%",
                    height: "100%",
                    canvas: { deferUpdate: !1 },
                  }),
                  p = d.get("overlays").show.bind(d.get("overlays"));
                d.get("overlays").show = function () {
                  d.get("eventBus").fire("overlays.show"), p();
                };
                var h = d.get("overlays").hide.bind(d.get("overlays"));
                d.get("overlays").hide = function () {
                  d.get("eventBus").fire("overlays.hide"), h();
                };
                var f = s(function () {
                    d.get("overlays").show();
                  }, 300),
                  m = d.get("canvas")._viewboxChanged.bind(d.get("canvas")),
                  g = s(function () {
                    m(), d.get("overlays").hide(), f();
                  }, 0);
                d.get("canvas")._viewboxChanged = function () {
                  g();
                };
                var v = null,
                  b = null;
                i.$watch("diagramData", function (t) {
                  t &&
                    ((v = t),
                    (function () {
                      if (v) {
                        i.loaded = !1;
                        var t = "object" === a(v);
                        (t ? d.importDefinitions : d.importXML).bind(d)(
                          v,
                          function (a, r) {
                            (t
                              ? function (t) {
                                  t();
                                }
                              : i.$apply.bind(i))(function () {
                              var t;
                              a
                                ? (i.error = a)
                                : ((i.warn = r),
                                  (b = d.get("canvas")),
                                  (l = d._definitions),
                                  (function () {
                                    if (b) {
                                      var t = JSON.parse(
                                        (e.search() || {}).viewbox || "{}"
                                      )[l.id];
                                      t
                                        ? b.viewbox(t)
                                        : b.zoom("fit-viewport", "auto");
                                    }
                                  })(),
                                  (t = d.get("eventBus")).on(
                                    "element.click",
                                    function (t) {
                                      i.onClick({
                                        element: t.element,
                                        $event: t.originalEvent,
                                      });
                                    }
                                  ),
                                  t.on("element.hover", function (t) {
                                    i.onMouseEnter({
                                      element: t.element,
                                      $event: t.originalEvent,
                                    });
                                  }),
                                  t.on("element.out", function (t) {
                                    i.onMouseLeave({
                                      element: t.element,
                                      $event: t.originalEvent,
                                    });
                                  }),
                                  t.on("element.mousedown", function () {
                                    (i.grabbing = !0),
                                      document.addEventListener("mouseup", y),
                                      i.$apply();
                                  }),
                                  t.on(
                                    "canvas.viewbox.changed",
                                    s(function (t) {
                                      var a = JSON.parse(
                                        (e.search() || {}).viewbox || "{}"
                                      );
                                      (a[l.id] = {
                                        x: t.viewbox.x,
                                        y: t.viewbox.y,
                                        width: t.viewbox.width,
                                        height: t.viewbox.height,
                                      }),
                                        o.updateSilently({
                                          viewbox: JSON.stringify(a),
                                        });
                                      var r = n.$$phase;
                                      "$apply" !== r && "$digest" !== r
                                        ? i.$apply(function () {
                                            e.replace();
                                          })
                                        : e.replace();
                                    }, 500)
                                  ),
                                  (i.loaded = !0),
                                  i.onLoad());
                            });
                          }
                        );
                      }
                    })());
                });
                var y = function t() {
                  (i.grabbing = !1),
                    document.removeEventListener("mouseup", t),
                    i.$apply();
                };
                (i.zoomIn = function () {
                  d.get("zoomScroll").zoom(1, {
                    x: c[0].offsetWidth / 2,
                    y: c[0].offsetHeight / 2,
                  });
                }),
                  (i.zoomOut = function () {
                    d.get("zoomScroll").zoom(-1, {
                      x: c[0].offsetWidth / 2,
                      y: c[0].offsetHeight / 2,
                    });
                  }),
                  (i.resetZoom = function () {
                    b.resized(), b.zoom("fit-viewport", "auto");
                  }),
                  (i.control.resetZoom = i.resetZoom),
                  (i.control.refreshZoom = function () {
                    b.resized(), b.zoom(b.zoom(), "auto");
                  });
              },
            };
          },
        ];
      },
      81240: function (t, e, n) {
        "use strict";
        var a = n(19142);
        t.exports = [
          function () {
            return {
              template: a,
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
              link: function (t, e, n) {
                (t.varName = n.displayName || n.debugged),
                  (t.extended = void 0 !== n.extended),
                  (t.toggleOpen = function () {
                    t.open = !t.open;
                  });
              },
            };
          },
        ];
      },
      85562: function (t, e, n) {
        "use strict";
        n(82447), n(67762), n(67559), n(84392), n(56806), n(66893);
        var a = n(94993).V,
          r = n(1792),
          i = n(49404).A,
          o = n(79572).f8,
          s = n(18585),
          c = n(89496),
          l = document.addEventListener;
        (document.addEventListener = function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          if ("focusin" !== e[0]) return l.apply(document, e);
        }),
          (t.exports = [
            "$window",
            function (t) {
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
                link: function (e, n) {
                  var c,
                    l = t.document;
                  (e.isDrd = !1),
                    (e.grabbing = !1),
                    (e.control = e.control || {}),
                    (e.control.getViewer = function () {
                      return u;
                    }),
                    (e.control.getElement = function (t) {
                      return u.getActiveViewer().get("elementRegistry").get(t);
                    }),
                    (e.loaded = !1),
                    (e.control.isLoaded = function () {
                      return e.loaded;
                    }),
                    (e.control.highlightRow = function (t, e) {
                      var n = "[data-row-id = " + t + "]";
                      r.element(n).parent().addClass(e);
                    }),
                    (e.control.highlightElement = function (t) {
                      c &&
                        u.getActiveViewer().get("elementRegistry").get(t) &&
                        (c.addMarker(t, "highlight"),
                        n
                          .find('[data-element-id="' + t + '"]>.djs-outline')
                          .attr({ rx: "14px", ry: "14px" }));
                    }),
                    (e.control.clearAllElementsHighlight = function () {
                      c &&
                        c.getRootElement().children.forEach(function (t) {
                          var e = t.id;
                          c.hasMarker(e, "highlight") &&
                            c.removeMarker(e, "highlight");
                        });
                    }),
                    (e.control.clearElementHighlight = function (t) {
                      c && c.removeMarker(t, "highlight");
                    }),
                    (e.control.isElementHighlighted = function (t) {
                      if (c) return c.hasMarker(t, "highlight");
                    }),
                    (e.control.getElements = function (t) {
                      if (c)
                        return u
                          .getActiveViewer()
                          .get("elementRegistry")
                          .filter(t);
                    }),
                    (e.control.createBadge = function (t, e) {
                      c &&
                        (function (t, e) {
                          var n = u
                            .getActiveViewer()
                            .get("overlays")
                            .add(t, {
                              position: e.position || { bottom: 10, right: 10 },
                              show: { minZoom: -1 / 0, maxZoom: 1 / 0 },
                              html: e.html,
                            });
                        })(t, e);
                    }),
                    (e.control.resetZoom = f),
                    (e.control.refreshZoom = function () {
                      c.resized(), c.zoom(c.zoom(), "auto");
                    });
                  var u = new (e.editMode ? o : i)({
                      container: n[0].querySelector(".table-holder"),
                      width: e.width,
                      height: e.height,
                      hideDetails: !e.showDetails,
                      tableViewOnly: e.table,
                      drd: { drillDown: { enabled: e.enableDrdNavigation } },
                    }),
                    d = null;
                  e.$watch("xml", function (t) {
                    t &&
                      a(t).then(function (t) {
                        (d = t),
                          (function () {
                            if (d) {
                              var t = s(d);
                              (e.loaded = !1),
                                u.importXML(t, function (t) {
                                  var n = function () {
                                    return r.isDefined(e.table);
                                  };
                                  (e.isDrd =
                                    u.getDefinitions().drgElement.length > 1 &&
                                    !n()),
                                    e.isDrd &&
                                      ((c = u
                                        .getActiveViewer()
                                        .get("canvas")).zoom(
                                        "fit-viewport",
                                        "auto"
                                      ),
                                      e.control
                                        .getElements(function (t) {
                                          return "dmn:Decision" === t.type;
                                        })
                                        .forEach(function (t) {
                                          c.addMarker(t.id, "decision-element");
                                        })),
                                    e.$apply(h),
                                    e.$apply(function () {
                                      t
                                        ? (e.error = t)
                                        : (e.isDrd && e.onLoad(),
                                          (e.loaded = !0));
                                    });
                                });
                            }
                          })();
                      });
                  }),
                    u.on("import.done", function () {
                      u.getActiveViewer().on("element.click", function (t) {
                        e.$apply(function () {
                          e.onClick({
                            element: t.element,
                            $event: t.originalEvent,
                          });
                        });
                      }),
                        u
                          .getActiveViewer()
                          .on("element.dblclick", function (t) {
                            e.$apply(function () {
                              e.onDblClick({
                                element: t.element,
                                $event: t.originalEvent,
                              });
                            });
                          });
                    });
                  var p = e.$apply.bind(e, function () {
                    (e.grabbing = !1), l.removeEventListener("mouseup", p);
                  });
                  function h() {
                    if (e.table) {
                      var t = /^[0-9]+$/.test(e.table);
                      e.table = t ? +e.table : e.table;
                      var n = u.getViews().filter(function (t) {
                        return (
                          (r.isString(e.table) && t.element.id === e.table) ||
                          t.element.name === e.table
                        );
                      })[0];
                      u.open(n, function () {
                        e.onLoad();
                      });
                    } else
                      var a = e.$watch("table", function (t) {
                        t && (a(), h());
                      });
                  }
                  function f() {
                    c && (c.resized(), c.zoom("fit-viewport", "auto"));
                  }
                  u.on(
                    "element.mousedown",
                    e.$apply.bind(e, function () {
                      (e.grabbing = !0), l.addEventListener("mouseup", p);
                    })
                  ),
                    (e.zoomIn = function () {
                      u.getActiveViewer()
                        .get("zoomScroll")
                        .zoom(1, {
                          x: n[0].offsetWidth / 2,
                          y: n[0].offsetHeight / 2,
                        });
                    }),
                    (e.zoomOut = function () {
                      u.getActiveViewer()
                        .get("zoomScroll")
                        .zoom(-1, {
                          x: n[0].offsetWidth / 2,
                          y: n[0].offsetHeight / 2,
                        });
                    }),
                    (e.resetZoom = f),
                    t.addEventListener("resize", e.resetZoom),
                    e.$on("destroy", function () {
                      t.removeEventListener("resize", e.resetZoom),
                        l.removeEventListener("mouseup", p);
                    });
                },
              };
            },
          ]);
      },
      49404: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          (e.A = void 0),
          n(17922);
        var r = u(n(17238)),
          i = u(n(32950)),
          o = u(n(27201)),
          s = u(n(65049)),
          c = n(52037),
          l = n(99705);
        function u(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function d(t, e) {
          for (var n = 0; n < e.length; n++) {
            var a = e[n];
            (a.enumerable = a.enumerable || !1),
              (a.configurable = !0),
              "value" in a && (a.writable = !0),
              Object.defineProperty(t, p(a.key), a);
          }
        }
        function p(t) {
          var e = (function (t, e) {
            if ("object" != a(t) || !t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
              var r = n.call(t, e || "default");
              if ("object" != a(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == a(e) ? e : String(e);
        }
        function h(t, e, n) {
          return (
            (e = m(e)),
            (function (t, e) {
              if (e && ("object" === a(e) || "function" == typeof e)) return e;
              if (void 0 !== e)
                throw new TypeError(
                  "Derived constructors may only return object or undefined"
                );
              return (function (t) {
                if (void 0 === t)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return t;
              })(t);
            })(
              t,
              f()
                ? Reflect.construct(e, n || [], m(t).constructor)
                : e.apply(t, n)
            )
          );
        }
        function f() {
          try {
            var t = !Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
          } catch (t) {}
          return (f = function () {
            return !!t;
          })();
        }
        function m(t) {
          return (
            (m = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
                }),
            m(t)
          );
        }
        function g(t, e) {
          return (
            (g = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
            g(t, e)
          );
        }
        e.A = (function (t) {
          function e() {
            var t,
              n =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              ((t = h(this, e, [n])).options = n),
              t
            );
          }
          var n, a, r;
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                e && g(t, e);
            })(e, t),
            (n = e),
            (a = [
              {
                key: "_getViewProviders",
                value: function () {
                  var t = [
                    {
                      id: "literalExpression",
                      constructor: s.default,
                      opens: function (t) {
                        return (
                          (0, c.is)(t, "dmn:Decision") &&
                          (0, c.is)(t.decisionLogic, "dmn:LiteralExpression")
                        );
                      },
                    },
                    {
                      id: "decisionTable",
                      constructor: o.default,
                      opens: function (t) {
                        return (
                          (0, c.is)(t, "dmn:Decision") &&
                          (0, c.is)(t.decisionLogic, "dmn:DecisionTable")
                        );
                      },
                    },
                  ];
                  return (
                    this.options.tableViewOnly ||
                      t.push({
                        id: "drd",
                        constructor: i.default,
                        opens: function (t) {
                          return (
                            (0, c.is)(t, "dmn:Definitions") &&
                            (0, l.containsDi)(t)
                          );
                        },
                      }),
                    t
                  );
                },
              },
            ]) && d(n.prototype, a),
            r && d(n, r),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            e
          );
        })(r.default);
      },
      98934: function (t, e, n) {
        "use strict";
        var a = n(70044);
        t.exports = [
          function () {
            return {
              template: a,
              scope: { version: "@" },
              link: function (t) {
                t.timezoneName =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
              },
            };
          },
        ];
      },
      74690: function (t, e, n) {
        "use strict";
        n(67559), n(85541), n(84392), n(66893);
        var a = n(25447),
          r = n(1792),
          i = n(57752),
          o = n(46152),
          s = {
            welcome: { label: "Welcome" },
            admin: { label: "Admin" },
            cockpit: { label: "Cockpit" },
            tasklist: { label: "Tasklist" },
          };
        t.exports = function () {
          return {
            transclude: !0,
            template: i,
            scope: {
              authentication: "=",
              userName: "=?",
              currentApp: "@",
              signOut: "@?",
              toggleNavigation: "@?",
              myProfile: "@?",
              smallScreenWarning: "@?",
            },
            compile: function (t, e) {
              e.toggleNavigation ||
                (e.toggleNavigation = "CAM_WIDGET_HEADER_TOGGLE_NAVIGATION"),
                e.myProfile || (e.myProfile = "CAM_WIDGET_HEADER_MY_PROFILE"),
                e.signOut || (e.signOut = "CAM_WIDGET_HEADER_SIGN_OUT"),
                e.smallScreenWarning ||
                  (e.smallScreenWarning =
                    "CAM_WIDGET_HEADER_SMALL_SCREEN_WARNING");
            },
            controller: [
              "$scope",
              "AuthenticationService",
              "$sce",
              "configuration",
              function (t, e, n, i) {
                function c() {
                  var e = r.copy(s);
                  t.currentApp &&
                    ("welcome" === t.currentApp && t.authentication
                      ? (e = {})
                      : delete e[t.currentApp]),
                    t.authentication &&
                      t.authentication.name &&
                      (delete e.welcome,
                      Object.keys(e).forEach(function (n) {
                        t.authentication.authorizedApps.indexOf(n) < 0 &&
                          delete e[n];
                      })),
                    (t.showAppDropDown = Object.keys(e).length > 0),
                    (t.apps = e);
                }
                (t.logo = n.trustAsHtml(o)),
                  (t.brandName = i.getAppVendor() + " " + i.getAppName()),
                  a("head title").text(t.brandName),
                  (t.trustAsHtml = n.trustAsHtml),
                  (t.isCommunityEdition = !0),
                  (t.logout = e.logout),
                  (t.getTargetRoute = function () {
                    return t.authentication ? "" : "#/login";
                  }),
                  t.$watch("currentApp", c),
                  t.$watch("authentication", c);
              },
            ],
          };
        };
      },
      16386: function (t, e, n) {
        "use strict";
        n(82447), n(67559), n(84392);
        var a = n(1792),
          r = n(38284),
          i = n(33030),
          o = n(17502),
          s = n(46569),
          c = n(74690),
          l = n(98934),
          u = n(1574),
          d = n(97234),
          p = n(81240),
          h = n(95470),
          f = n(38862),
          m = n(65214),
          g = n(71746),
          v = n(18974),
          b = n(1634),
          y = n(18686),
          E = n(85562),
          _ = n(68416),
          S = n(66011),
          T = n(92773),
          A = n(20386),
          I = n(93059),
          w = n(14203),
          C = n(19182),
          O = n(170);
        n(6978);
        var x = a.module("camunda.common.widgets", [
          _.name,
          S.name,
          T.name,
          "ui.bootstrap",
        ]);
        x.factory("widgetLocalConf", I),
          x.directive("camWidgetInlineField", i),
          x.directive("camWidgetSearchPill", o),
          x.directive("camWidgetHeader", c),
          x.directive("camWidgetFooter", l),
          x.directive("camWidgetLoader", u),
          x.directive("camWidgetChartLine", d),
          x.directive("camWidgetDebug", p),
          x.directive("camWidgetClipboard", h),
          x.directive("camWidgetVariable", f),
          x.directive("camWidgetVariablesTable", m),
          x.directive("camRenderVarTemplate", g),
          x.directive("camWidgetSearch", v),
          x.directive("camWidgetBpmnViewer", b),
          x.directive("camWidgetCmmnViewer", y),
          x.directive("camWidgetDmnViewer", E),
          x.directive("camShareLink", w),
          x.directive("camWidgetPassword", C),
          x.directive("camVariableValidator", A),
          x.directive("camAnnotationEdit", r),
          x.directive("camWidgetSelectionType", O),
          x.filter("camQueryComponent", s),
          (t.exports = x);
      },
      33030: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          i = n(25447),
          o = n(85364),
          s = n(67050),
          c = n(61166);
        t.exports = [
          "$timeout",
          "$filter",
          "$document",
          "$uibModal",
          function (t, e, n, l) {
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
                  h = i(
                    (function (t) {
                      var e = getComputedStyle(t),
                        n = "absolute" === e.position,
                        a = /(auto|scroll)/;
                      if ("fixed" === e.position) return document.body;
                      for (var r = t; (r = r.parentElement); )
                        if (
                          ((e = getComputedStyle(r)),
                          (!n || "static" !== e.position) &&
                            a.test(e.overflow + e.overflowY + e.overflowX))
                        )
                          return r;
                      return document.body;
                    })(u[0])
                  ),
                  f = e("date"),
                  m =
                    /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
                function g() {
                  return ["datetime", "date", "time"].indexOf(o.varType) > -1;
                }
                function v() {
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
                function b() {
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
                    (o.simpleField = v()),
                    g())
                  ) {
                    var t = o.varValue,
                      e = null;
                    (e = t
                      ? (function (t) {
                          var e,
                            n,
                            a,
                            r,
                            i,
                            o,
                            s,
                            c = m.exec(t);
                          if (c)
                            return (
                              (e = parseInt(c[1] || 0, 10)),
                              (n = parseInt(c[2] || 0, 10) - 1),
                              (a = parseInt(c[3] || 0, 10)),
                              (r = parseInt(c[4] || 0, 10)),
                              (i = parseInt(c[5] || 0, 10)),
                              (o = parseInt(c[6] || 0, 10)),
                              (s = parseInt(c[7] || 0, 10)),
                              new Date(e, n, a, r, i, o, s)
                            );
                        })(t)
                      : new Date().setSeconds(0, 0)),
                      (o.formData.dateValue = e);
                  }
                }
                function y(t) {
                  if (!t || !t.length) return !1;
                  var e = t.parent();
                  return (
                    !(!e || !e.length) && "body" === e[0].tagName.toLowerCase()
                  );
                }
                function E() {
                  var t = {
                      left: i(u).offset().left - h.offset().left,
                      top: i(u).offset().top - h.offset().top,
                    },
                    e = p.outerWidth() + t.left;
                  if (
                    (e > h.prop("clientWidth") &&
                      (t.left -= e + 5 - h.prop("clientWidth")),
                    g()
                      ? d
                          .addClass("datepicker-control")
                          .show()
                          .css({
                            left: t.left + (p.outerWidth() - d.outerWidth()),
                            top: t.top + p.outerHeight(),
                          })
                      : d
                          .removeClass("datepicker-control")
                          .show()
                          .css({
                            left: t.left + (i(u).outerWidth() - d.outerWidth()),
                            top: t.top - d.outerHeight(),
                          }),
                    p
                      .show()
                      .css({ left: t.left, top: t.top + i(u).outerHeight() }),
                    g())
                  ) {
                    var n = p[0].querySelector(".uib-daypicker");
                    n && n.focus();
                  }
                }
                function _(e) {
                  t(function () {
                    (o.editing && !e) ||
                      (d && d.remove && d.remove(),
                      (d = null),
                      p && p.remove && p.remove(),
                      (p = null));
                  }, 50);
                }
                function S(t) {
                  if (
                    o.editing &&
                    !(function (t) {
                      return (
                        u[0].contains(t.target) ||
                        (d && d.length && d[0].contains(t.target)) ||
                        (p && p.length && p[0].contains(t.target))
                      );
                    })(t)
                  ) {
                    var e = i(t.target),
                      n = "ng-binding text-muted";
                    if (!e.hasClass(n))
                      e.children().hasClass(n) || o.$apply(o.cancelChange);
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
                  o.$watch("editing", function (e, n) {
                    e !== n &&
                      (o.editing
                        ? (y(
                            (p = (
                              p && p.length
                                ? p
                                : i(u[0].querySelector(".field-control"))
                            ).hide())
                          ) || h.append(p),
                          y(
                            (d = (
                              d && d.length
                                ? d
                                : i(u[0].querySelector(".btn-group"))
                            ).hide())
                          ) || h.append(d),
                          t(E, 50),
                          u.addClass("inline-editing"))
                        : (_(), u.removeClass("inline-editing")));
                  }),
                  (o.changeType = function () {
                    "text" !== o.varType
                      ? (o.varType = "text")
                      : (o.varType = o.varTypeOriginal),
                      b(),
                      (o.editing = !0),
                      (u[0].attributes.type.value = o.varType),
                      (o.simpleField = v());
                  }),
                  (o.startEditing = function () {
                    if (!o.editing) {
                      b(), (o.editing = !0), o.onStart(o);
                      var e = o.formData.editValue;
                      o.simpleField || (o.formData.editValue = ""),
                        t(function () {
                          t(function () {
                            if (((o.formData.editValue = e), e)) {
                              var n = "object" === a(e);
                              n &&
                                r
                                  .element(
                                    u[0].querySelector(
                                      '[ng-model="formData.editValue"]'
                                    )
                                  )
                                  .val(e.value),
                                t(function () {
                                  for (
                                    var t = i(
                                        u[0].querySelector("li[ng-mouseenter]")
                                      ),
                                      a = n ? e.value : e,
                                      r = 0;
                                    r < t.length;
                                    r++
                                  ) {
                                    var o = t[r];
                                    if (0 === o.innerText.indexOf(a))
                                      return void i(o).trigger("mouseenter");
                                  }
                                });
                            }
                          });
                        }),
                        t(function () {
                          r
                            .element(
                              u[0].querySelector(
                                '[ng-model="formData.editValue"]'
                              )
                            )
                            .triggerHandler("click"),
                            t(function () {
                              i('[ng-model="formData.editValue"]').focus(),
                                i('[ng-model="formData.editValue"]').select(),
                                n.bind("click", S);
                            }, 50);
                        });
                    }
                  }),
                  (o.applyChange = function (t, e) {
                    if (((o.invalid = o.validator(o)), !o.invalid)) {
                      if (o.simpleField)
                        (o.formData.editValue = (function (t) {
                          if ("number" === o.varType)
                            return t.length > 0 ? +t : null;
                          return t;
                        })(i('[ng-model="formData.editValue"]').val())),
                          (o.varValue = o.formData.editValue);
                      else if ("option" === o.varType) {
                        if (-1 === o.options.indexOf(t) && !o.allowNonOptions)
                          return void o.cancelChange();
                        (o.formData.editValue =
                          t || i('[ng-model="formData.editValue"]').val()),
                          (o.varValue = o.formData.editValue);
                      } else
                        g() &&
                          (o.varValue = f(o.formData.dateValue, o.dateFormat));
                      (o.$event = e),
                        o.change(o),
                        (o.editing = !1),
                        n.unbind("click", S);
                    }
                  }),
                  (o.cancelChange = function () {
                    o.editing &&
                      ((o.editing = !1), o.onCancel(o), n.unbind("click", S));
                  }),
                  (o.changeDate = function (t) {
                    var e = t.formData.dateValue;
                    o.hasCustomDateFormat &&
                      (e = f(t.formData.dateValue, o.dateFormat)),
                      (o.formData.editValue = o.formData.dateValue = e);
                  }),
                  (o.selectNextInlineField = function (e) {
                    for (
                      var n = i(
                          "[cam-widget-inline-field][type='text'], [cam-widget-inline-field][type='option']"
                        ),
                        a = e * (n.length - 1);
                      a !== !e * (n.length - 1);
                      a += 2 * !e - 1
                    )
                      if (n[a] === u[0])
                        return void t(function () {
                          var r = i(n[a + 2 * !e - 1]);
                          r.find(".view-value").click(),
                            t(function () {
                              r.find("input").select();
                            });
                        });
                    t(function () {
                      i(n[e * n.length - 1])
                        .find(".view-value")
                        .click();
                    });
                  }),
                  (o.trapKeyboard = function (t, e) {
                    g() &&
                      9 === t.keyCode &&
                      (e || t.shiftKey
                        ? e &&
                          t.shiftKey &&
                          (i(
                            '.cam-widget-inline-field.btn-group > button[ng-click="cancelChange($event)"]'
                          )[0].focus(),
                          t.preventDefault())
                        : (i(
                            ".cam-widget-inline-field.field-control > .datepicker > table"
                          )[0].focus(),
                          t.preventDefault()));
                  }),
                  (o.cancelOnEsc = function (t) {
                    g() && 27 === t.keyCode && o.cancelChange();
                  }),
                  (o.handleKeydown = function (t) {
                    13 === t.keyCode
                      ? (o.applyChange(o.selection, t), t.preventDefault())
                      : 27 === t.keyCode
                      ? (o.cancelChange(t), t.preventDefault())
                      : 9 === t.keyCode &&
                        (o.applyChange(o.selection, t),
                        o.selectNextInlineField(t.shiftKey),
                        t.preventDefault()),
                      (o.selection = null);
                  }),
                  (o.selection = null),
                  (o.saveSelection = function (e) {
                    (o.selection = e),
                      t(function () {
                        o.selection === e && o.applyChange(e);
                      });
                  }),
                  (o.expandValue = function () {
                    var e = function () {
                      return t(function () {
                        i('[ng-model="formData.editValue"]').focus().select(),
                          n.bind("click", S);
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
                      .result.then(e)
                      .catch(e),
                      n.unbind("click", S);
                  });
              },
              transclude: !0,
            };
          },
        ];
      },
      67050: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function r(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e &&
              (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        function i(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? r(Object(n), !0).forEach(function (e) {
                  o(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : r(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function o(t, e, n) {
          var r;
          return (
            (r = (function (t, e) {
              if ("object" != a(t) || !t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(t, e || "default");
                if ("object" != a(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == a(r) ? r : String(r)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
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
          (t.exports = [
            "$scope",
            "$location",
            "formData",
            function (t, e, n) {
              (t.formData = i(
                i({}, n),
                {},
                { editValue: n.editValue.replace(/,/g, "\n") }
              )),
                (t.changeValue = function () {
                  (n.editValue = t.formData.editValue
                    .split("\n")
                    .map(function (t) {
                      return t.replace(/^\s*,+\s*|\s*,+\s*$/g, "");
                    })
                    .join(",")),
                    t.$dismiss();
                });
            },
          ]);
      },
      1574: function (t, e, n) {
        "use strict";
        var a = n(1792),
          r = n(64556);
        t.exports = [
          "$translate",
          function (t) {
            return {
              transclude: !0,
              template: r,
              scope: {
                loadingState: "@",
                textEmpty: "@",
                textError: "@",
                textLoading: "@",
              },
              compile: function (e, n) {
                a.isDefined(n.textLoading) ||
                  (n.textLoading = t.instant("LOADING")),
                  a.isDefined(n.loadingState) || (n.loadingState = "INITIAL");
              },
            };
          },
        ];
      },
      19182: function (t, e, n) {
        "use strict";
        var a = n(1792),
          r = n(37628);
        t.exports = [
          "camAPI",
          "debounce",
          "$timeout",
          function (t, e, n) {
            return {
              scope: {
                profile: "=camWidgetPasswordProfile",
                password: "=camWidgetPasswordPassword",
                isValid: "=?camWidgetPasswordValid",
              },
              link: function (r) {
                var i = t.resource("password-policy"),
                  o = !1;
                (r.loadingState = "DEACTIVATED"),
                  i.get().then(function (t) {
                    if (!t)
                      return (
                        (o = !1),
                        (r.isValid = !0),
                        void (r.loadingState = "DEACTIVATED")
                      );
                    (o = !0),
                      (r.tooltip = "PASSWORD_POLICY_TOOLTIP"),
                      (r.rules = t.rules),
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
                    function (t) {
                      t && ((c = t), s());
                    },
                    !0
                  );
                });
                var l = function (t) {
                    return t || "";
                  },
                  u = e(function () {
                    r.password &&
                      i
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
                          function (t, e) {
                            if (t)
                              return (
                                (r.loadingState = "NOT_OK"),
                                void (r.tooltip =
                                  "PASSWORD_POLICY_TOOLTIP_ERROR")
                              );
                            e.valid
                              ? ((r.loadingState = "OK"), (r.isValid = !0))
                              : ((r.loadingState = "NOT_OK"),
                                (r.isValid = !1),
                                (r.tooltip = "PASSWORD_POLICY_TOOLTIP_PARTIAL"),
                                (r.rules = e.rules));
                          }
                        )
                        .catch(a.noop);
                  }, 1e3);
                r.$watch("[password]", s, !0);
              },
              template: r,
            };
          },
        ];
      },
      46569: function (t, e, n) {
        "use strict";
        n(56806),
          n(54062),
          (t.exports = [
            "$filter",
            function (t) {
              var e =
                /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
              var n = t("camDate");
              return function (t) {
                return t && t.match(e) ? n(t) : t || "??";
              };
            },
          ]);
      },
      17502: function (t, e, n) {
        "use strict";
        n(67762), n(57507), n(84392), n(19824);
        var a = n(25447),
          r = n(77376);
        t.exports = [
          "$timeout",
          function (t) {
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
              link: function (e, n) {
                (e.valueType = i()),
                  (e.potentialNames = e.potentialNames || []),
                  (e.changeSearch = function (t, n, a) {
                    var r = e[t].value;
                    (e[t].value = n),
                      (e[t].inEdit = !1),
                      "function" == typeof e.onChange &&
                        e.onChange({
                          field: t,
                          before: r,
                          value: n,
                          $event: a,
                        });
                  }),
                  (e.clearEditTrigger = function (t) {
                    e[t].inEdit = !1;
                  }),
                  (e.onKeydown = function (t, n) {
                    13 === t.keyCode &&
                      t.target === t.currentTarget &&
                      (e[n].inEdit = !0);
                  }),
                  e.$watch("allowDates", function (t) {
                    t || (e.valueType = i());
                  }),
                  e.$watch("enforceDates", function (t) {
                    t && (e.valueType = i());
                  }),
                  e.$watch("enforceString", function (t) {
                    t && (e.valueType = i());
                  });
                var r = function (e) {
                  t(function () {
                    a(
                      n[0].querySelectorAll(
                        "[cam-widget-inline-field][value='" + e + ".value']"
                      )
                    )
                      .find(".view-value")
                      .click();
                  });
                };
                function i() {
                  return e.options
                    ? "option"
                    : e.enforceDates
                    ? "datetime"
                    : "text";
                }
                e.$watch(
                  "value",
                  function (t) {
                    return t && t.inEdit && r("value");
                  },
                  !0
                ),
                  e.$watch(
                    "name",
                    function (t) {
                      return t && t.inEdit && r("name");
                    },
                    !0
                  ),
                  e.$watch(
                    "type",
                    function (t) {
                      return t && t.inEdit && r("type");
                    },
                    !0
                  ),
                  e.$watch(
                    "operator",
                    function (t) {
                      return (
                        t &&
                          !t.value &&
                          1 === t.values.length &&
                          (t.value = t.values[0]),
                        t && t.inEdit && r("operator")
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
      18974: function (t, e, n) {
        "use strict";
        function a(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e &&
              (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        function r(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? a(Object(n), !0).forEach(function (e) {
                  i(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : a(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function i(t, e, n) {
          var a;
          return (
            (a = (function (t, e) {
              if ("object" != o(t) || !t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 !== n) {
                var a = n.call(t, e || "default");
                if ("object" != o(a)) return a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == o(a) ? a : String(a)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function o(t) {
          return (
            (o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            o(t)
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
          d = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:.(\d\d\d)| )?$/;
        function p(t) {
          return t && "string" == typeof t && t.match(d) ? "date" : o(t);
        }
        var h = function (t) {
            return (
              t.type.value &&
              (!t.extended || t.name.value) &&
              (t.basic || t.operator.value) &&
              (t.basic || t.value.value) &&
              ("date" === p(t.value.value) || !t.enforceDates)
            );
          },
          f = function (t) {
            if (t.value) {
              var e = t.values
                .map(function (t) {
                  return t.key;
                })
                .indexOf(t.value.key);
              t.value = t.values[-1 === e ? 0 : e];
            } else t.value = t.values[0];
          },
          m = !1;
        t.exports = [
          "$timeout",
          "$location",
          "search",
          "widgetLocalConf",
          "$translate",
          function (t, e, n, a, i) {
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
                s.forEach(u.translations, function (t, e) {
                  u.translations[e] = i.instant(t);
                }),
                  u.types.map(function (t) {
                    return (
                      (t.id.value = i.instant(t.id.value)),
                      t.operators &&
                        (t.operators = t.operators.map(function (t) {
                          return (t.value = i.instant(t.value)), t;
                        })),
                      t.options &&
                        "object" === o(t.options[0]) &&
                        ((t.mappedOptions = t.options.map(function (t) {
                          var e = t.key,
                            n = t.value;
                          return { key: e, value: i.instant(n) };
                        })),
                        (t.options = t.mappedOptions.map(function (t) {
                          return t.value;
                        }))),
                      t
                    );
                  }),
                  s.forEach(u.operators, function (t) {
                    s.forEach(t, function (t) {
                      t.value = i.instant(t.value);
                    });
                  }),
                  (u.isMatchAnyActive = void 0 !== u.matchAny),
                  (u.caseHandeling = {}),
                  (u.switchMatchType = function () {
                    u.isMatchAnyActive && (u.matchAny = !u.matchAny);
                  }),
                  (u.focused = !1);
                var g = s.element(d).find("form")[0];
                g.addEventListener(
                  "focus",
                  function () {
                    t(function () {
                      u.focused = !0;
                    });
                  },
                  !0
                ),
                  g.addEventListener(
                    "blur",
                    function () {
                      t(function () {
                        u.focused = !1;
                      });
                    },
                    !0
                  );
                var v,
                  b = function () {
                    return (u.searches || []).some(function (t) {
                      return t.caseOptions;
                    });
                  };
                (u.searchHasVariableQuery = b()),
                  (v = function (t) {
                    if (t) {
                      var e = document.createElement("div");
                      (e.textContent = u.translations.inputPlaceholder + ":"),
                        d[0].insertBefore(e, d[0].firstChild),
                        u.$root.$broadcast("plugin:search:change");
                    } else
                      d[0]
                        .querySelector("input.main-field")
                        .setAttribute(
                          "placeholder",
                          u.translations.inputPlaceholder
                        );
                  }),
                  t(
                    function () {
                      var e = document.createElement("input");
                      e.setAttribute("type", "text"),
                        e.setAttribute("placeholder", "set");
                      var n = !1;
                      e.addEventListener("input", function () {
                        n = !0;
                      }),
                        document.body.appendChild(e),
                        e.focus(),
                        document.body.removeChild(e),
                        t(function () {
                          v(n);
                        });
                    },
                    0,
                    !1
                  ),
                  (u.searchTypes = u.types.map(function (t) {
                    return t.id;
                  })),
                  (u.getRightPadding = function () {
                    return d.width() > 400 ? "125px" : "12px";
                  });
                var y = u.types.reduce(function (t, e) {
                    return t || (e.default ? e : null);
                  }, null),
                  E = function () {
                    var t = u.searches
                      .map(function (t) {
                        return t.type.value.key;
                      })
                      .reduce(function (t, e) {
                        return -1 === t.indexOf(e) && t.push(e), t;
                      }, [])
                      .map(function (t) {
                        return _(t) ? _(t).groups : null;
                      })
                      .filter(function (t) {
                        return !!t;
                      })
                      .reduce(function (t, e) {
                        if (t) {
                          if (0 === t.length) return s.copy(e);
                          for (var n = 0; n < t.length; n++)
                            -1 === e.indexOf(t[n]) && (t.splice(n, 1), n--);
                          return 0 === t.length ? null : t;
                        }
                        return null;
                      }, []);
                    return null === t
                      ? []
                      : 0 === t.length
                      ? u.searchTypes
                      : u.searchTypes.filter(function (e) {
                          var n = _(e.key).groups;
                          if (!n) return !0;
                          for (var a = 0; a < n.length; a++)
                            if (t.indexOf(n[a]) > -1) return !0;
                          return !1;
                        });
                  },
                  _ = function (t) {
                    return u.types.reduce(function (e, n) {
                      return e || (n.id.key === t ? n : null);
                    }, null);
                  },
                  S = function (t, e) {
                    return (
                      t.operators ||
                      u.operators[
                        p(
                          (function (t, e) {
                            return e
                              ? "" + t
                              : isNaN(t) || "" === t.trim()
                              ? "true" === t ||
                                ("false" !== t && ("NULL" === t ? null : t))
                              : +t;
                          })(e, t.enforceString)
                        )
                      ]
                    );
                  },
                  T = function (t) {
                    var e = function (t, e) {
                      var n = null,
                        a = null,
                        r = "In" === e.operator;
                      if (t) {
                        var i = t.filter(function (t) {
                          return r && e.value.includes(t.key);
                        });
                        if (r) {
                          var o = i.map(function (t) {
                            return t.key;
                          });
                          o.length && (n = o),
                            (a = i
                              .map(function (t) {
                                return t.value;
                              })
                              .join(", "));
                        } else {
                          var s = (t || []).find(function (t) {
                            return t.key === e.value;
                          });
                          (n = null == s ? void 0 : s.key),
                            (a = null == s ? void 0 : s.value);
                        }
                      } else r && (a = e.value.join(","));
                      return a || (a = e.value), { key: n, value: a };
                    };
                    return t
                      .map(function (t) {
                        var n = _(t.type);
                        if (n) {
                          var a = {
                            extended: n.extended,
                            basic: n.basic,
                            type: {
                              values: E(),
                              value: E().reduce(function (e, n) {
                                return e || (n.key === t.type ? n : null);
                              }, null),
                              tooltip: u.translations.type,
                            },
                            name: {
                              value: t.name,
                              tooltip: u.translations.name,
                            },
                            options: n.options,
                            operator: { tooltip: u.translations.operator },
                            value: r(
                              r({}, e(n.mappedOptions, t)),
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
                            (a.operator.values = S(n, a.value.value)),
                            (a.operator.value = a.operator.values.reduce(
                              function (e, n) {
                                return e || (n.key === t.operator ? n : null);
                              },
                              null
                            )),
                            (a.valid = h(a)),
                            a
                          );
                        }
                        "variableNamesIgnoreCase" === t.type &&
                          (u.caseHandeling.ignoreNames = !0),
                          "variableValuesIgnoreCase" === t.type &&
                            (u.caseHandeling.ignoreValues = !0);
                      })
                      .filter(function (t) {
                        return t;
                      });
                  },
                  A = u.searchId || "search",
                  I = function () {
                    var t = JSON.parse((e.search() || {})[A + "Query"] || "[]");
                    return T(t);
                  };
                (u.searches = u.searches || []),
                  (u.searches = I()),
                  (u.validSearchesBuffer = u.searches.reduce(function (t, e) {
                    return e.valid && t.push(e), t;
                  }, [])),
                  (u.validSearches = s.copy(u.validSearchesBuffer));
                (u.createSearch = function (e) {
                  if (e || u.inputQuery) {
                    var n = e ? "" : u.inputQuery;
                    e = (e && _(e.key)) || y;
                    var a = S(e, n);
                    u.searches.push({
                      extended: e.extended,
                      basic: e.basic,
                      type: {
                        values: E(),
                        value: e.id,
                        tooltip: u.translations.type,
                      },
                      name: {
                        value: "",
                        inEdit: e.extended,
                        tooltip: u.translations.name,
                      },
                      operator: {
                        value: a[0],
                        values: a,
                        tooltip: u.translations.operator,
                      },
                      options: e.options,
                      value: {
                        value: n,
                        inEdit: !e.extended && !n,
                        tooltip: u.translations.value,
                      },
                      allowDates: e.allowDates,
                      enforceDates: e.enforceDates,
                      potentialNames: e.potentialNames,
                      enforceString: e.enforceString,
                      caseOptions: e.caseOptions,
                    });
                    var r = u.searches[u.searches.length - 1];
                    (r.valid = h(r)),
                      n
                        ? (u.inputQuery = "")
                        : t(function () {
                            t(function () {
                              (u.inputQuery = ""),
                                l(
                                  d[0].querySelector(
                                    ".search-container > input"
                                  )
                                ).blur();
                            });
                          });
                  }
                }),
                  (u.deleteSearch = function (e) {
                    u.searches.splice(e, 1),
                      t(function () {
                        l(
                          d[0].querySelector(".search-container > input")
                        ).focus();
                      });
                  });
                var w = function (t, e) {
                  return t
                    .toUpperCase()
                    .split(",")
                    .map(function (t) {
                      return t.trim();
                    })
                    .includes(e.toUpperCase());
                };
                (u.handleChange = function (e, n, a, r, i) {
                  var o,
                    s,
                    c = u.searches[e];
                  "type" === n
                    ? ((s = _(r.key)),
                      (c.extended = s.extended),
                      (c.basic = s.basic),
                      (c.allowDates = s.allowDates),
                      !c.enforceDates && s.enforceDates && (c.value.value = ""),
                      (c.enforceDates = s.enforceDates),
                      (c.operator.values = S(s, c.value.value)),
                      f(c.operator))
                    : "value" === n &&
                      (e === u.searches.length - 1 &&
                        t(function () {
                          l(
                            d[0].querySelector(".search-container > input")
                          ).focus();
                        }),
                      (s = _(c.type.value.key)).operators ||
                        ((c.operator.values = S(s, c.value.value)),
                        f(c.operator))),
                    (c.valid = h(c)),
                    i &&
                      13 === i.keyCode &&
                      (function (t, e) {
                        var n = u.searches[t];
                        if (!n.valid) {
                          if (n.extended && !n.name.value && "name" !== e)
                            return void (n.name.inEdit = !0);
                          if ("value" !== e) return void (n.value.inEdit = !0);
                        }
                        for (var a = 1; a < u.searches.length; a++) {
                          var r = (a + t) % u.searches.length;
                          if (!(n = u.searches[r]).valid)
                            return void (n.extended && !n.name.value
                              ? (n.name.inEdit = !0)
                              : (n.value.inEdit = !0));
                        }
                      })(e, n);
                  var p =
                    null ===
                      (o = u.types.find(function (t) {
                        return t.id.key === c.type.value.key;
                      })) || void 0 === o
                      ? void 0
                      : o.mappedOptions;
                  if (p)
                    if ("In" === c.operator.value.key) {
                      var m = p
                        .filter(function (t) {
                          return w(c.value.value, t.value);
                        })
                        .map(function (t) {
                          return t.key;
                        });
                      c.value.key = m.length ? m : void 0;
                    } else {
                      var g;
                      c.value.key =
                        null ===
                          (g = p.find(function (t) {
                            return c.value.value === t.value;
                          })) || void 0 === g
                          ? void 0
                          : g.key;
                    }
                  else
                    "In" === c.operator.value.key
                      ? (c.value.key = c.value.value
                          .split(",")
                          .map(function (t) {
                            return t.trim();
                          }))
                      : (c.value.key = c.value.value);
                }),
                  (u.onKeydown = function (e) {
                    -1 !== [38, 40, 13].indexOf(e.keyCode) &&
                      0 ===
                        l(
                          d[0].querySelectorAll(
                            '.dropdown-menu[id^="typeahead"]'
                          )
                        ).length &&
                      t(function () {
                        s.element(e.target).triggerHandler("input");
                      });
                  });
                var C,
                  O = function (t) {
                    var e = function (t) {
                        var e,
                          n =
                            null ===
                              (e = u.types.find(function (e) {
                                return e.id.key === t.type.value.key;
                              })) || void 0 === e
                              ? void 0
                              : e.mappedOptions,
                          a = null;
                        if (n)
                          if ("In" === t.operator.value.key) {
                            var r = n
                              .filter(function (e) {
                                return w(t.value.value, e.value);
                              })
                              .map(function (t) {
                                return t.key;
                              });
                            r.length && (a = r);
                          } else {
                            var i;
                            a =
                              null ===
                                (i = n.find(function (e) {
                                  return t.value.value === e.value;
                                })) || void 0 === i
                                ? void 0
                                : i.key;
                          }
                        else
                          "In" === t.operator.value.key &&
                            (a = t.value.value.split(",").map(function (t) {
                              return t.trim();
                            }));
                        return a || (a = t.value.value), a;
                      },
                      n = [];
                    return (
                      s.forEach(t, function (t) {
                        n.push({
                          type: t.type.value.key,
                          operator: t.operator.value.key,
                          value: e(t),
                          name: t.name.value,
                        });
                      }),
                      n
                    );
                  },
                  x = {
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
                  N = function () {
                    var a = u.searches;
                    if (
                      (s.forEach(a, function (t) {
                        t.valid &&
                          -1 === u.validSearchesBuffer.indexOf(t) &&
                          u.validSearchesBuffer.push(t);
                      }),
                      (u.validSearchesBuffer = u.validSearchesBuffer.filter(
                        function (t) {
                          return t.valid && -1 !== a.indexOf(t);
                        }
                      )),
                      u.searchHasVariableQuery)
                    ) {
                      if (u.caseHandeling.ignoreNames) {
                        var r = s.copy(x);
                        (r.type.value.key = "variableNamesIgnoreCase"),
                          u.validSearchesBuffer.push(r);
                      }
                      if (u.caseHandeling.ignoreValues) {
                        var i = s.copy(x);
                        (i.type.value.key = "variableValuesIgnoreCase"),
                          u.validSearchesBuffer.push(i);
                      }
                    }
                    var o,
                      c = {};
                    ((c[A + "Query"] = JSON.stringify(
                      O(u.validSearchesBuffer)
                    )),
                    u.isMatchAnyActive) &&
                      (u.matchAny && !e.search().hasOwnProperty(A + "OrQuery")
                        ? (o = e.url() + "&" + A + "OrQuery")
                        : u.matchAny ||
                          (o = e.url().replace("&" + A + "OrQuery", "")),
                      e.url(o),
                      e.replace());
                    (u.searchHasVariableQuery = b()),
                      (m = !0),
                      n.updateSilently(c, !e.search()[A + "Query"]),
                      t(function () {
                        m = !1;
                      }),
                      R();
                  };
                u.$watch("[searches, matchAny, caseHandeling]", N, !0),
                  u.$on("$locationChangeSuccess", function () {
                    if (
                      ((u.matchAny = e.search().hasOwnProperty(A + "OrQuery")),
                      !m && e.search().hasOwnProperty(A + "Query"))
                    ) {
                      var t = I(),
                        n = u.validSearchesBuffer.filter(function (t) {
                          return t.valid;
                        });
                      s.equals(t, n) ||
                        (s.forEach(u.searches, function (e) {
                          e.valid || t.push(e);
                        }),
                        (u.validSearchesBuffer = []),
                        (u.searches = t));
                    }
                  }),
                  u.$watch(
                    "validSearchesBuffer",
                    function () {
                      t.cancel(C),
                        (C = t(function () {
                          u.validSearches = s.copy(u.validSearchesBuffer);
                        }));
                    },
                    !0
                  );
                var R = function () {
                  var t = E();
                  u.dropdownTypes = t;
                  for (var e = 0; e < u.searches.length; e++)
                    u.searches[e].type.values = t;
                };
                u.$watch(
                  "types",
                  function () {
                    (u.searchTypes = u.types.map(function (t) {
                      return t.id;
                    })),
                      (u.dropdownTypes = E()),
                      s.forEach(u.searches, function (t) {
                        t.potentialNames = _(t.type.value.key)
                          ? _(t.type.value.key).potentialNames || []
                          : null;
                      });
                  },
                  !0
                ),
                  (u.dropdownTypes = E());
                for (
                  var L = (u.searchCriteriaStorage = {
                      group: null,
                      nameInput: "",
                      available: {},
                    }),
                    U = {},
                    P = u.storageGroup
                      ? [u.storageGroup]
                      : u.types
                          .map(function (t) {
                            return t.groups;
                          })
                          .reduce(function (t, e) {
                            return (t || []).concat(e);
                          })
                          .filter(function (t) {
                            return t;
                          }),
                    D = [],
                    k = 0;
                  k < P.length;
                  k++
                )
                  D.indexOf(P[k]) < 0 && P[k] && D.push(P[k]);
                function M() {
                  if (((L.available = {}), L.group))
                    return (
                      (u.isSearchCriteriaStorageGrouped = !1),
                      void (L.available = c(U[L.group]))
                    );
                  (u.isSearchCriteriaStorageGrouped = !0),
                    D.forEach(function (t) {
                      L.available[t] = c(U[t] || {});
                    });
                }
                function $(t, e) {
                  return e
                    ? { group: e, name: t }
                    : L.group
                    ? { group: L.group, name: t }
                    : void 0;
                }
                !D.length && u.storageGroup && D.push(u.storageGroup),
                  D.forEach(function (t) {
                    U[t] = {};
                  }),
                  u.$watch(
                    "validSearches",
                    function () {
                      if (u.storageGroup)
                        return (L.group = u.storageGroup), void M();
                      var t = null;
                      u.validSearches.forEach(function (e) {
                        if (!t) {
                          var n = e.type.value.key;
                          u.types.forEach(function (e) {
                            t ||
                              (e.id.key === n &&
                                1 === (e.groups || []).length &&
                                (t = (e.groups || [])[0]));
                          });
                        }
                      }),
                        (L.group = t),
                        M();
                    },
                    !0
                  ),
                  (U = a.get("searchCriteria", U)),
                  M(),
                  u.$watch("storageGroup", function () {
                    (u.storageGroup && D.indexOf(u.storageGroup) < 0) ||
                      ((L.group = u.storageGroup), M());
                  }),
                  (u.storedCriteriaInputClick = function (t) {
                    t.stopPropagation();
                  }),
                  (u.searchCriteriaInputKeydown = function (t) {
                    if (13 === t.keyCode) return u.storedCriteriaSaveClick(t);
                  }),
                  (u.hasCriteriaSets = function () {
                    if (D.length > 1) {
                      for (var t in L.available)
                        if (Object.keys(L.available[t]).length > 0) return !0;
                      return !1;
                    }
                    return !!Object.keys(L.available || {}).length;
                  }),
                  (u.loadCriteriaSet = function (t, e, n) {
                    u.caseHandeling = { ignoreNames: !1, ignoreValues: !1 };
                    var a = $(e, n);
                    if (a) {
                      var r = U[a.group][a.name];
                      (u.searches = T(r)),
                        u.isMatchAnyActive &&
                          (u.matchAny = r[r.length - 1].matchAny),
                        N();
                    }
                  }),
                  (u.dropCriteriaSet = function (t, e, n) {
                    t.stopPropagation();
                    var r = $(e, n);
                    r &&
                      (delete U[r.group][r.name],
                      a.set("searchCriteria", U),
                      M());
                  }),
                  (u.storedCriteriaSaveClick = function (t) {
                    t.stopPropagation();
                    var e = L.nameInput;
                    e &&
                      ((U[L.group] = U[L.group] || {}),
                      (U[L.group][e] = O(u.validSearchesBuffer)),
                      u.isMatchAnyActive &&
                        U[L.group][e].push({ matchAny: u.matchAny }),
                      U[L.group][e].push({
                        caseHandeling: s.copy(u.caseHandeling),
                      }),
                      a.set("searchCriteria", U),
                      M(),
                      (L.nameInput = ""));
                  });
              },
              template: u,
            };
          },
        ];
      },
      170: function (t, e, n) {
        "use strict";
        n(34820), n(76474);
        var a = n(24864);
        t.exports = [
          "$location",
          function (t) {
            return {
              template: a,
              scope: {
                selectedInstancesCount: "@",
                totalInstancesCount: "@",
                toggleState: "@",
                pageSize: "@",
              },
              link: function (e) {
                (e.selectionType = "INSTANCE"),
                  (e.isBatchOperationPage = t
                    .path()
                    .includes("batch/operation"));
                var n = (e.updateSelectionType = function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : e.selectionType;
                  t !== e.selectionType && (e.selectionType = t),
                    e.$emit("selection.type.updated", t);
                });
                e.$watch("selectionType", n);
              },
            };
          },
        ];
      },
      70449: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          i = n(59084),
          o = n(3907),
          s = n(57848),
          c = {};
        function l(t) {
          return (t = t || new Date()).toISOString().slice(0, -5);
        }
        (c.camundaFormattedDate = l),
          (c.templateDialog = o),
          (c.templateStringDialog = s),
          (c.modalCtrl = [
            "$scope",
            "variable",
            "readonly",
            function (t, e, n) {
              (t.hovered = !1),
                (t.toggleHover = function (e) {
                  t.hovered = e;
                }),
                (t.variable = e),
                (t.readonly = n);
              var a = r.copy(e);
              t.hasChanged = function () {
                return (
                  (a.valueInfo = a.valueInfo || {}),
                  (e.valueInfo = e.valueInfo || {}),
                  a.value !== e.value ||
                    a.valueInfo.serializationDataFormat !==
                      e.valueInfo.serializationDataFormat ||
                    a.valueInfo.objectTypeName !== e.valueInfo.objectTypeName
                );
              };
            },
          ]),
          (c.typeUtils = i),
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
          (c.isPrimitive = function (t) {
            return function (e) {
              return (
                (!e && !t.variable) ||
                !(e = e || t.variable.type) ||
                [
                  "Boolean",
                  "Date",
                  "Double",
                  "Integer",
                  "Long",
                  "Short",
                  "String",
                ].indexOf(e) >= 0
              );
            };
          }),
          (c.isBinary = function (t) {
            return function (e) {
              return (
                !(!e && !t.variable) &&
                !!(e = e || t.variable.type) &&
                ["Bytes", "File"].indexOf(e) >= 0
              );
            };
          }),
          (c.useCheckbox = function (t) {
            return function (e) {
              return (
                !(!e && !t.variable) && "Boolean" === (e = e || t.variable.type)
              );
            };
          }),
          (c.validate = function (t) {
            return function () {
              var e;
              (t.variable.name && t.variable.type
                ? null === t.variable.value ||
                  ["String", "Object", "Null"].indexOf(t.variable.type) > -1
                  ? (t.valid = !0)
                  : (t.valid = i.isType(t.variable.value, t.variable.type))
                : (t.valid = !1),
              t.valid) &&
                t.variable.type &&
                null !== t.variable.value &&
                t.isPrimitive(t.variable.type) &&
                ((e =
                  "Boolean" !== t.variable.type
                    ? i.convertToType(t.variable.value, t.variable.type)
                    : !!t.variable.value && "false" !== t.variable.value),
                a(t.variable.value) !== a(e) && (t.variable.value = e));
            };
          }),
          (t.exports = c);
      },
      20386: function (t, e, n) {
        "use strict";
        var a = n(59084);
        t.exports = [
          function () {
            return {
              require: "ngModel",
              link: function (t, e, n, r) {
                var i = function (t) {
                  var e = n.camVariableValidator;
                  return (
                    -1 !== ["String", "Object", "Null"].indexOf(e)
                      ? r.$setValidity("camVariableValidator", !0)
                      : r.$setValidity(
                          "camVariableValidator",
                          !!a.isType(t, e)
                        ),
                    t
                  );
                };
                r.$parsers.unshift(i),
                  r.$formatters.push(i),
                  n.$observe("camVariableValidator", function () {
                    return i(r.$viewValue);
                  });
              },
            };
          },
        ];
      },
      38862: function (t, e, n) {
        "use strict";
        n(82447), n(45477), n(84735), n(84392);
        var a = n(1792),
          r = n(70449),
          i = n(91740),
          o = r.types,
          s = r.modalCtrl;
        t.exports = [
          "$uibModal",
          function (t) {
            return {
              template: i,
              scope: {
                variable: "=camVariable",
                display: "@?",
                shown: "=?",
                disabled: "=?",
                hiddenTypes: "=?",
              },
              link: function (e, n) {
                e.variableTypes = o.filter(function (t) {
                  return (
                    !Array.isArray(e.hiddenTypes) ||
                    !e.hiddenTypes.length ||
                    -1 === e.hiddenTypes.indexOf(t)
                  );
                });
                var i = r.defaultValues;
                (e.isPrimitive = r.isPrimitive(e)),
                  (e.useCheckbox = r.useCheckbox(e)),
                  (e.isShown = function (t) {
                    return (
                      !Array.isArray(e.shown) ||
                      !e.shown.length ||
                      e.shown.indexOf(t) > -1
                    );
                  }),
                  (e.isDisabled = function (t) {
                    return (
                      !(!Array.isArray(e.disabled) || !e.disabled.length) &&
                      e.disabled.indexOf(t) > -1
                    );
                  }),
                  (e.shownClasses = function () {
                    return Array.isArray(e.shown) && e.shown.length
                      ? e.shown
                          .map(function (t) {
                            return "show-" + t;
                          })
                          .join(" ")
                      : "";
                  }),
                  e.$watch("shown", function () {
                    n.removeClass("show-type show-name show-value").addClass(
                      e.shownClasses()
                    );
                  });
                var c = r.validate(e);
                (e.valid = !0),
                  e.$watch("variable.value", c),
                  e.$watch("variable.name", c),
                  e.$watch("variable.type", c),
                  c();
                var l = e.variable.value;
                e.$watch("variable.type", function (t, a) {
                  "Boolean" === t
                    ? null !== e.variable.value &&
                      ((l = e.variable.value),
                      (e.variable.value =
                        "false" !== e.variable.value && !!e.variable.value))
                    : "Boolean" === a && (e.variable.value = l);
                  var r = n[0].classList;
                  a && r.remove("var-type-" + a.toLowerCase()),
                    t && r.add("var-type-" + t.toLowerCase());
                }),
                  (e.isNull = function () {
                    return null === e.variable.value;
                  }),
                  (e.setNonNull = function () {
                    e.variable.value = l || i[e.variable.type];
                  }),
                  (e.setNull = function () {
                    (l = e.variable.value), (e.variable.value = null);
                  }),
                  (e.editVariableValue = function () {
                    t.open({
                      template: r.templateDialog,
                      controller: s,
                      windowClass: "cam-widget-variable-dialog",
                      resolve: {
                        variable: function () {
                          return a.copy(e.variable);
                        },
                        readonly: function () {
                          return e.display;
                        },
                      },
                    })
                      .result.then(function (t) {
                        (e.variable.value = t.value),
                          (e.variable.valueInfo = t.valueInfo);
                      })
                      .catch(a.noop);
                  });
              },
            };
          },
        ];
      },
      71746: function (t, e, n) {
        "use strict";
        var a = n(25447);
        t.exports = [
          "$compile",
          function (t) {
            return {
              template: "<div></div>",
              scope: { info: "=", headerName: "=" },
              link: function (e, n) {
                var r = e.info.additions[e.headerName] || {};
                for (var i in ((r.scopeVariables = r.scopeVariables || {}),
                r.scopeVariables))
                  e[i] = r.scopeVariables[i];
                (e.variable = e.info.variable),
                  n.html("<div>" + r.html + "</div>"),
                  t(a("div", n)[0])(e);
              },
            };
          },
        ];
      },
      65214: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          i = n(70449),
          o = n(93136),
          s = n(64529),
          c = i.typeUtils,
          l = {
            variable: { name: null, type: null, value: null, valueInfo: {} },
            additions: {},
          };
        function u(t) {
          return {
            then: function (e) {
              e(r.copy(t.variable));
            },
          };
        }
        t.exports = [
          "$uibModal",
          "$translate",
          "$document",
          function (t, e, n) {
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
                  ((o.asString = function (t) {
                    return t + "";
                  }),
                  o.validatable)
                ) {
                  var d = function (t) {
                    var e = r.element(".modal"),
                      n = r.element(".modal-backdrop");
                    ((0 === e.length && 0 === n.length) ||
                      (e !== t.target &&
                        n !== t.target &&
                        !e[0].contains(t.target) &&
                        !n[0].contains(t.target))) &&
                      o.$apply(function () {
                        o.variables.forEach(function (t) {
                          return (t.showFailures = !1);
                        });
                      });
                  };
                  n.on("click", d),
                    o.$on("$destroy", function () {
                      return n.off("click", d);
                    });
                }
                var p = [];
                function h(t) {
                  return (o.variables[t] || {}).variable;
                }
                (o.headerClasses = []),
                  o.headers.forEach(function (t) {
                    o.headerClasses.push(t.class);
                  }),
                  (o.editable = o.editable || o.headerClasses),
                  (o.variableTypes = r.copy(i.types)),
                  (o.variableTypes = o.ignoreTypes
                    ? o.variableTypes.filter(function (t) {
                        return !o.ignoreTypes.includes(t);
                      })
                    : o.variableTypes),
                  (o.defaultValues = i.defaultValues),
                  (o.isPrimitive = i.isPrimitive(o)),
                  (o.isBinary = i.isBinary(o)),
                  (o.useCheckbox = i.useCheckbox(o)),
                  ["uploadVar", "deleteVar", "saveVar"].forEach(function (t) {
                    o[t] = r.isFunction(o[t]) ? o[t] : u;
                  }),
                  (o.sortObj = o.defaultSort),
                  (o.orderClass = function (t) {
                    return (
                      "glyphicon-" +
                      {
                        none: "minus",
                        desc: "chevron-down",
                        asc: "chevron-up",
                      }[
                        (t = t || o.sortObj.sortBy) === o.sortObj.sortBy
                          ? o.sortObj.sortOrder
                          : "none"
                      ]
                    );
                  }),
                  (o.changeOrder = function (t) {
                    (o.sortObj.sortBy = t),
                      (o.sortObj.sortOrder =
                        "desc" === o.sortObj.sortOrder ? "asc" : "desc"),
                      o.onSortChange({ sortObj: o.sortObj });
                  });
                var f = function (t, e, n) {
                  return {
                    template: e,
                    controller: i.modalCtrl,
                    windowClass: "cam-widget-variable-dialog",
                    resolve: {
                      variable: function () {
                        return r.copy(h(t));
                      },
                      readonly: n,
                    },
                  };
                };
                function m(t, e) {
                  var n;
                  (t.variable.name && t.variable.type
                    ? null === t.variable.value ||
                      ["String", "Object", "Null"].indexOf(t.variable.type) > -1
                      ? (t.valid = !0)
                      : (t.valid = c.isType(t.variable.value, t.variable.type))
                    : (t.valid = !1),
                  t.valid) &&
                    t.variable.type &&
                    null !== t.variable.value &&
                    o.isPrimitive(t.variable.type) &&
                    ((n =
                      "Boolean" !== t.variable.type
                        ? c.convertToType(t.variable.value, t.variable.type)
                        : !!t.variable.value && "false" !== t.variable.value),
                    a(t.variable.value) !== a(n) && (t.variable.value = n));
                  t.changed = (function (t) {
                    if (
                      !o.variables ||
                      !o.variables[t] ||
                      !o.variables[t]._copy
                    )
                      return !1;
                    var e = h(t),
                      n = o.variables[t]._copy;
                    return (
                      !e ||
                      !n ||
                      e.name !== n.name ||
                      e.type !== n.type ||
                      e.value !== n.value
                    );
                  })(e);
                }
                function g() {
                  (o.variables || []).forEach(function (t, e) {
                    t.valid = !0;
                    var n = "variables[" + e + "].variable";
                    function a() {
                      m(t, e);
                    }
                    o.$watch(n + ".value", a),
                      o.$watch(n + ".name", a),
                      o.$watch(n + ".type", a),
                      o.$watch(
                        "variables[" + e + "].editMode",
                        function (e, n) {
                          var a;
                          r.isUndefined(e) ||
                            (!0 === e
                              ? (t._copy =
                                  ((a = t.variable),
                                  JSON.parse(JSON.stringify(a))))
                              : !1 === e &&
                                !0 === n &&
                                t._copy &&
                                ((t.variable.type = t._copy.type),
                                (t.variable.name = t._copy.name),
                                (t.variable.value = t._copy.value),
                                delete t._copy));
                        }
                      ),
                      m(t, e),
                      (p[e] = t.variable.value);
                  });
                }
                (o.editVar = r.isFunction(o.editVar)
                  ? o.editVar
                  : function (e, n) {
                      var a = t.open(
                        f(n, i.templateDialog, function () {
                          return !o.isEditable("value", o.variables[n]);
                        })
                      ).result;
                      return (
                        a
                          .then(function () {
                            return (e.changed = !0);
                          })
                          .catch(r.noop),
                        a
                      );
                    }),
                  (o.readStringVar = r.isFunction(o.readStringVar)
                    ? o.readStringVar
                    : function (e) {
                        return t.open(
                          f(e, i.templateStringDialog, function () {
                            return !0;
                          })
                        ).result;
                      }),
                  (o.downloadLink = r.isFunction(o.downloadVar)
                    ? o.downloadVar
                    : function (t) {
                        return (
                          "/camunda/api/engine/engine/default/variable-instance/" +
                          t.variable.id +
                          "/data"
                        );
                      }),
                  o.$watch("variables", g),
                  o.$on("variable.added", function () {
                    return g();
                  }),
                  g(),
                  (o.canEditVariable = r.isFunction(o.isVariableEditable)
                    ? o.isVariableEditable
                    : function () {
                        return !0;
                      }),
                  (o.isEditable = function (t, e) {
                    return e.editMode && o.editable.indexOf(t) > -1;
                  }),
                  (o.hasEditDialog = function (t) {
                    return (
                      t &&
                      ["object", "string", "json", "xml"].indexOf(
                        t.toLowerCase()
                      ) > -1
                    );
                  }),
                  (o.rowClasses = function (t) {
                    return [
                      t.editMode ? "editing" : null,
                      t.valid ? null : "ng-invalid",
                      t.valid ? null : "ng-invalid-cam-variable-validator",
                    ];
                  }),
                  (o.colClasses = function (t, e) {
                    return [
                      o.isEditable(e, t) ? "editable" : null,
                      "type-" + (t.variable.type || "").toLowerCase(),
                      "col-" + e,
                    ];
                  }),
                  (o.isNull = function (t) {
                    return null === o.variables[t].variable.value;
                  }),
                  (o.setNull = function (t) {
                    var e = h(t);
                    (p[t] = e.value), (e.value = null);
                  }),
                  (o.setNonNull = function (t) {
                    var e = h(t);
                    e.value = p[t] || o.defaultValues[e.type];
                  }),
                  (o.editVariableValue = function (t) {
                    var e = o.variables[t];
                    o.editVar(e, t)
                      .then(function (e) {
                        (h(t).value = e.value), (h(t).valueInfo = e.valueInfo);
                      })
                      .catch(r.noop);
                  }),
                  (o.addVariable = function () {
                    o.variables.push(r.copy(l));
                  }),
                  (o.deleteVariable = function (n) {
                    var a = o.variables[n];
                    t.open({
                      controller: [
                        "$scope",
                        function (t) {
                          (t.body = e.instant(
                            "CAM_WIDGET_VARIABLES_TABLE_DIALOGUE",
                            { name: a.variable.name }
                          )),
                            (t.submit = function () {
                              t.$close(), v(n);
                            }),
                            (t.dismiss = function () {
                              t.$close();
                            });
                        },
                      ],
                      template: s,
                    }).result.catch(r.noop);
                  });
                var v = function (t) {
                  var e = o.variables[t];
                  o.deleteVar(e, t).then(
                    function () {
                      o.variables.splice(o.variables.indexOf(e), 1);
                    },
                    function () {}
                  );
                };
                (o.saveVariable = function (t) {
                  var e = o.variables[t];
                  o.enableEditMode(e, !1),
                    o.saveVar(e, t).then(
                      function (n) {
                        e.variable.name = n.name;
                        var a = (e.variable.type = n.type);
                        (e.variable.value = n.value),
                          delete e._copy,
                          "Object" !== a
                            ? delete e.variable.valueInfo
                            : (e.variable.valueInfo = n.valueInfo),
                          o.onSaved && o.onSaved(t, e);
                      },
                      function () {
                        o.enableEditMode(e, !0);
                      }
                    );
                }),
                  (o.uploadVariable = function (t) {
                    var e = o.variables[t];
                    o.uploadVar(e, t).then(
                      function () {
                        delete e._copy, o.enableEditMode(e, !1);
                      },
                      function () {
                        o.enableEditMode(e, !1);
                      }
                    );
                  }),
                  (o.enableEditMode = function (t, e) {
                    if (
                      (o.onToggleEditMode && o.onToggleEditMode(t, e),
                      (t.editMode = e),
                      e)
                    ) {
                      var n = 0;
                      o.variables.forEach(function (t) {
                        t.editMode && n++;
                      }),
                        1 === n && o.onChangeStart();
                    } else {
                      var a = 0;
                      o.variables.forEach(function (t) {
                        t.editMode || a++;
                      }),
                        a === o.variables.length && o.onChangeEnd();
                    }
                  });
              },
            };
          },
        ];
      },
      43909: function (t, e, n) {
        "use strict";
        t.exports = n(1792);
      },
      19214: function (t, e, n) {
        "use strict";
        t.exports = n(30430);
      },
      40271: function (t, e, n) {
        "use strict";
        t.exports = n(92620);
      },
      38930: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
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
          n(97715);
        var r = n(1703);
        function i(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e &&
              (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        function o(t, e, n) {
          var r;
          return (
            (r = (function (t, e) {
              if ("object" != a(t) || !t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(t, e || "default");
                if ("object" != a(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == a(r) ? r : String(r)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function s() {
          s = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            i =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            c = o.iterator || "@@iterator",
            l = o.asyncIterator || "@@asyncIterator",
            u = o.toStringTag || "@@toStringTag";
          function d(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            d({}, "");
          } catch (t) {
            d = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function p(t, e, n, a) {
            var r = e && e.prototype instanceof y ? e : y,
              o = Object.create(r.prototype),
              s = new L(a || []);
            return i(o, "_invoke", { value: O(t, n, s) }), o;
          }
          function h(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = p;
          var f = "suspendedStart",
            m = "suspendedYield",
            g = "executing",
            v = "completed",
            b = {};
          function y() {}
          function E() {}
          function _() {}
          var S = {};
          d(S, c, function () {
            return this;
          });
          var T = Object.getPrototypeOf,
            A = T && T(T(U([])));
          A && A !== n && r.call(A, c) && (S = A);
          var I = (_.prototype = y.prototype = Object.create(S));
          function w(t) {
            ["next", "throw", "return"].forEach(function (e) {
              d(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function C(t, e) {
            function n(i, o, s, c) {
              var l = h(t[i], t, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  d = u.value;
                return d && "object" == a(d) && r.call(d, "__await")
                  ? e.resolve(d.__await).then(
                      function (t) {
                        n("next", t, s, c);
                      },
                      function (t) {
                        n("throw", t, s, c);
                      }
                    )
                  : e.resolve(d).then(
                      function (t) {
                        (u.value = t), s(u);
                      },
                      function (t) {
                        return n("throw", t, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var o;
            i(this, "_invoke", {
              value: function (t, a) {
                function r() {
                  return new e(function (e, r) {
                    n(t, a, e, r);
                  });
                }
                return (o = o ? o.then(r, r) : r());
              },
            });
          }
          function O(e, n, a) {
            var r = f;
            return function (i, o) {
              if (r === g) throw new Error("Generator is already running");
              if (r === v) {
                if ("throw" === i) throw o;
                return { value: t, done: !0 };
              }
              for (a.method = i, a.arg = o; ; ) {
                var s = a.delegate;
                if (s) {
                  var c = x(s, a);
                  if (c) {
                    if (c === b) continue;
                    return c;
                  }
                }
                if ("next" === a.method) a.sent = a._sent = a.arg;
                else if ("throw" === a.method) {
                  if (r === f) throw ((r = v), a.arg);
                  a.dispatchException(a.arg);
                } else "return" === a.method && a.abrupt("return", a.arg);
                r = g;
                var l = h(e, n, a);
                if ("normal" === l.type) {
                  if (((r = a.done ? v : m), l.arg === b)) continue;
                  return { value: l.arg, done: a.done };
                }
                "throw" === l.type &&
                  ((r = v), (a.method = "throw"), (a.arg = l.arg));
              }
            };
          }
          function x(e, n) {
            var a = n.method,
              r = e.iterator[a];
            if (r === t)
              return (
                (n.delegate = null),
                ("throw" === a &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  x(e, n),
                  "throw" === n.method)) ||
                  ("return" !== a &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + a + "' method"
                    )))),
                b
              );
            var i = h(r, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), b
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((n[e.resultName] = o.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  b)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                b);
          }
          function N(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function R(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function L(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(N, this),
              this.reset(!0);
          }
          function U(e) {
            if (e || "" === e) {
              var n = e[c];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var i = -1,
                  o = function n() {
                    for (; ++i < e.length; )
                      if (r.call(e, i))
                        return (n.value = e[i]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(a(e) + " is not iterable");
          }
          return (
            (E.prototype = _),
            i(I, "constructor", { value: _, configurable: !0 }),
            i(_, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(_, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === E || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, _)
                  : ((t.__proto__ = _), d(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            w(C.prototype),
            d(C.prototype, l, function () {
              return this;
            }),
            (e.AsyncIterator = C),
            (e.async = function (t, n, a, r, i) {
              void 0 === i && (i = Promise);
              var o = new C(p(t, n, a, r), i);
              return e.isGeneratorFunction(n)
                ? o
                : o.next().then(function (t) {
                    return t.done ? t.value : o.next();
                  });
            }),
            w(I),
            d(I, u, "Generator"),
            d(I, c, function () {
              return this;
            }),
            d(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var a in e) n.push(a);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var a = n.pop();
                    if (a in e) return (t.value = a), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = U),
            (L.prototype = {
              constructor: L,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(R),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function a(a, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = e),
                    (n.next = a),
                    r && ((n.method = "next"), (n.arg = t)),
                    !!r
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var o = this.tryEntries[i],
                    s = o.completion;
                  if ("root" === o.tryLoc) return a("end");
                  if (o.tryLoc <= this.prev) {
                    var c = r.call(o, "catchLoc"),
                      l = r.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var a = this.tryEntries[n];
                  if (
                    a.tryLoc <= this.prev &&
                    r.call(a, "finallyLoc") &&
                    this.prev < a.finallyLoc
                  ) {
                    var i = a;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var o = i ? i.completion : {};
                return (
                  (o.type = t),
                  (o.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), b)
                    : this.complete(o)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  b
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), R(n), b;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var a = n.completion;
                    if ("throw" === a.type) {
                      var r = a.arg;
                      R(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, n, a) {
                return (
                  (this.delegate = {
                    iterator: U(e),
                    resultName: n,
                    nextLoc: a,
                  }),
                  "next" === this.method && (this.arg = t),
                  b
                );
              },
            }),
            e
          );
        }
        function c(t, e, n, a, r, i, o) {
          try {
            var s = t[i](o),
              c = s.value;
          } catch (t) {
            return void n(t);
          }
          s.done ? e(c) : Promise.resolve(c).then(a, r);
        }
        (window.$ = window.jQuery = n(25447)),
          (window.define = r.define),
          (window.require = r.require),
          (window.bust = "7.23.0-alpha4"),
          (window.DOMPurify = n(631));
        var l = document.querySelector("base").getAttribute("app-root"),
          u = "".concat(l, "/app/admin/");
        r.requirejs.config({
          baseUrl: u,
          urlArgs: "bust=".concat("7.23.0-alpha4"),
        });
        var d,
          p = ((d = s().mark(function t() {
            var e, n;
            return s().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (e =
                        u + "scripts/config.js?bust=" + new Date().getTime()),
                      (t.next = 3),
                      import(e)
                    );
                  case 3:
                    return (
                      (n = t.sent.default),
                      (window.camAdminConf = n),
                      t.abrupt("return", n)
                    );
                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t);
          })),
          function () {
            var t = this,
              e = arguments;
            return new Promise(function (n, a) {
              var r = d.apply(t, e);
              function i(t) {
                c(r, n, a, i, o, "next", t);
              }
              function o(t) {
                c(r, n, a, i, o, "throw", t);
              }
              i(void 0);
            });
          })();
        (0, r.define)("camunda-admin-bootstrap", function () {
          var t = function (t) {
            r.requirejs.config({ baseUrl: "../../../lib" });
            var e = n(99744);
            e.exposePackages(window),
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
                    ],
                    window
                  );
                  var a = window.PLUGIN_PACKAGES || [],
                    s = window.PLUGIN_DEPENDENCIES || [];
                  (a = a.filter(function (t) {
                    return (
                      "admin-plugin-adminPlugins" === t.name ||
                      "admin-plugin-adminEE" === t.name ||
                      t.name.startsWith("admin-plugin-legacy")
                    );
                  })),
                    (s = s.filter(function (t) {
                      return (
                        "admin-plugin-adminPlugins" === t.requirePackageName ||
                        "admin-plugin-adminEE" === t.requirePackageName ||
                        t.requirePackageName.startsWith("admin-plugin-legacy")
                      );
                    })),
                    a.forEach(function (t) {
                      var e = document.createElement("link");
                      e.setAttribute("rel", "stylesheet"),
                        e.setAttribute(
                          "href",
                          t.location +
                            "/plugin.css?bust=".concat("7.23.0-alpha4")
                        ),
                        document.head.appendChild(e);
                    }),
                    r.requirejs.config({
                      packages: a,
                      baseUrl: "./",
                      paths: { ngDefine: "".concat(l, "/lib/ngDefine") },
                    });
                  var c = ["angular", "ngDefine"].concat(
                    s.map(function (t) {
                      return t.requirePackageName;
                    })
                  );
                  (0, r.requirejs)(c, function (n) {
                    if (
                      (t &&
                        t.csrfCookieName &&
                        n.module("cam.commons").config([
                          "$httpProvider",
                          function (e) {
                            e.defaults.xsrfCookieName = t.csrfCookieName;
                          },
                        ]),
                      void 0 !== t && t.requireJsConfig)
                    ) {
                      var a = t.requireJsConfig || {},
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
                      ].forEach(function (t) {
                        a[t] && (c[t] = a[t]);
                      }),
                        r.requirejs.config(
                          (function (t) {
                            for (var e = 1; e < arguments.length; e++) {
                              var n = null != arguments[e] ? arguments[e] : {};
                              e % 2
                                ? i(Object(n), !0).forEach(function (e) {
                                    o(t, e, n[e]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(
                                    t,
                                    Object.getOwnPropertyDescriptors(n)
                                  )
                                : i(Object(n)).forEach(function (e) {
                                    Object.defineProperty(
                                      t,
                                      e,
                                      Object.getOwnPropertyDescriptor(n, e)
                                    );
                                  });
                            }
                            return t;
                          })({ baseUrl: "../" }, c)
                        ),
                        (0, r.requirejs)(a.deps || [], function () {
                          n.module("cam.admin.custom", a.ngDeps),
                            l(),
                            e.init(s);
                        });
                    } else
                      n.module("cam.admin.custom", []),
                        (0, r.require)([], function () {
                          l(), e.init(s);
                        });
                    function l() {
                      (window.define = void 0), (window.require = void 0);
                    }
                  });
                }
              );
          };
          p.then(function (e) {
            t(e);
          });
        }),
          (0, r.requirejs)(["camunda-admin-bootstrap"], function () {});
      },
      99744: function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.exposePackages = function (t) {
            (t.angular = d),
              (t.jquery = a),
              (t["camunda-commons-ui"] = l),
              (t["camunda-bpm-sdk-js"] = u),
              (t["cam-common"] = p),
              (t.lodash = h),
              (t.moment = f);
          }),
          (e.init = function (t) {
            var e = [
                "ng",
                "ngResource",
                "pascalprecht.translate",
                l.name,
                i.name,
                o.name,
                r.name,
                c.name,
                s.name,
              ].concat(
                t.map(function (t) {
                  return t.ngModuleName;
                })
              ),
              u = d.module(g, e);
            function p(t) {
              var e = a("base").attr(t);
              if (!t)
                throw new Error("Uri base for " + t + " could not be resolved");
              return e;
            }
            var h = [
              "$routeProvider",
              "UriProvider",
              "$uibModalProvider",
              "$uibTooltipProvider",
              "$locationProvider",
              "$animateProvider",
              "$qProvider",
              "$provide",
              function (t, e, n, a, r, i, o, s) {
                m(s),
                  t.otherwise({ redirectTo: "/" }),
                  e.replace(":appRoot", p("app-root")),
                  e.replace(":appName", "admin"),
                  e.replace("app://", p("href")),
                  e.replace("cockpitbase://", p("app-root") + "/app/cockpit/"),
                  e.replace("admin://", p("admin-api")),
                  e.replace("plugin://", p("admin-api") + "plugin/"),
                  e.replace("engine://", p("engine-api")),
                  e.replace(":engine", [
                    "$window",
                    function (t) {
                      var e = t.location.href.match(
                        /\/app\/admin\/([\w-]+)(|\/)/
                      );
                      if (e) return e[1];
                      throw new Error("no process engine selected");
                    },
                  ]),
                  (n.options = { animation: !0, backdrop: !0, keyboard: !0 }),
                  a.options({
                    animation: !0,
                    popupDelay: 100,
                    appendToBody: !0,
                  }),
                  r.hashPrefix(""),
                  i.classNameFilter(/angular-animate/),
                  o.errorOnUnhandledRejections(!1);
              },
            ];
            u.provider("configuration", n(65015)(window.camAdminConf, "Admin")),
              u.config(h),
              n(86244)(u, p("app-root"), "admin"),
              u.controller("camAdminAppCtrl", [
                "$scope",
                "$route",
                "camAPI",
                function (t, e, n) {
                  var a = n.resource("user");
                  function r(e) {
                    e && e.name
                      ? a.profile(e.name, function (e, n) {
                          e ||
                            (t.userFullName = n.firstName + " " + n.lastName);
                        })
                      : (t.userFullName = null);
                  }
                  t.$on("authentication.changed", function (t, n) {
                    n ? r(n) : e.reload();
                  }),
                    r(t.authentication);
                },
              ]),
              n(96079)(window.camAdminConf, u, "admin").then(function () {
                a(document).ready(function () {
                  d.bootstrap(document.documentElement, [
                    u.name,
                    "cam.admin.custom",
                  ]),
                    top !== window &&
                      window.parent.postMessage({ type: "loadamd" }, "*");
                });
              });
          }),
          n(7089),
          n(84735),
          n(67559),
          n(56806),
          n(54062),
          n(31083),
          n(27217);
        var a = (window.jQuery = window.$ = n(25447)),
          r = n(9202),
          i = n(33910),
          o = n(43623),
          s = n(30488),
          c = n(92149),
          l = n(40932),
          u = n(59721),
          d = n(43909),
          p = n(91847),
          h = n(19214),
          f = n(40271),
          m = n(21605),
          g = "cam.admin";
      },
      33910: function (t, e, n) {
        "use strict";
        var a = n(43909),
          r = n(26495),
          i = n(96101),
          o = (t.exports = a.module("cam.admin.directives", []));
        o.directive("camBreadcrumbsPanel", r), o.directive("date", i);
      },
      43623: function (t, e, n) {
        "use strict";
        var a = n(43909);
        t.exports = a.module("admin.filters", []);
      },
      11558: function (t, e, n) {
        "use strict";
        n(82447), n(27473), n(54363), n(84392), n(95234), n(66893);
        var a = n(43909);
        t.exports = [
          "$scope",
          "$q",
          "$location",
          "Uri",
          "Notifications",
          "camAPI",
          "$translate",
          function (t, e, n, r, i, o, s) {
            var c = o.resource("authorization");
            (t.addNewAuthorization = function () {
              t.authorizations.push({
                inUpdate: !0,
                type: "1",
                resourceType: Number(t.selectedResourceType),
                resourceId: "*",
                permissions: ["ALL"],
                identityId: "",
                identityType: "Group",
              });
            }),
              (t.updateAuthorization = function (e) {
                (e.original = a.copy(e)),
                  (e.inUpdate = !0),
                  (e.identityId = t.getIdentityId(e)),
                  (e.identityType = e.userId ? "User" : "Group");
              }),
              (t.setIdentityTypeFor = function (t, e) {
                e.identityType = t;
              }),
              (t.getIdentityTypeFor = function (t) {
                return t.identityType;
              }),
              (t.addAllPermissionsTo = function (t) {
                t.permissions = ["ALL"];
              }),
              (t.addNonePermissionsTo = function (t) {
                t.permissions = ["NONE"];
              }),
              (t.availablePermissionsFor = function () {
                return t.getPermissionsForResource().filter(function (t) {
                  return "ALL" !== t && "NONE" !== t;
                });
              }),
              (t.changePermissionOf = function (e, n) {
                n.permissions.indexOf(e) > -1 ||
                n.permissions.indexOf("ALL") > -1
                  ? t.removePermissionFrom(e, n)
                  : t.addPermissionTo(e, n);
              }),
              (t.removePermissionFrom = function (e, n) {
                -1 != n.permissions.indexOf("ALL") &&
                  (n.permissions = t.getPermissionsForResource()),
                  (n.permissions = n.permissions.filter(function (t) {
                    return t !== e;
                  })),
                  0 === n.permissions.length && n.permissions.push("NONE");
              }),
              (t.addPermissionTo = function (e, n) {
                -1 != n.permissions.indexOf("NONE") && (n.permissions = []),
                  n.permissions.push(e),
                  n.permissions.length ===
                    t.getPermissionsForResource().length &&
                    (n.permissions = ["ALL"]);
              }),
              (t.confirmUpdateAuthorization = function (e) {
                delete e.inUpdate,
                  delete e.groupId,
                  delete e.userId,
                  (e["Group" === e.identityType ? "groupId" : "userId"] =
                    e.identityId);
                var n = {
                  permissions: e.permissions,
                  resourceType: e.resourceType,
                  resourceId: e.resourceId,
                  type: e.type,
                };
                (n["Group" === e.identityType ? "groupId" : "userId"] =
                  e.identityId),
                  e.id && (n.id = e.id),
                  delete e.identityId,
                  delete e.identityType,
                  c.save(n, function (a, r) {
                    if (a) {
                      i.addError({
                        status: n.id
                          ? s.instant("AUTHORIZATION_UPDATE")
                          : s.instant("AUTHORIZATION_CREATE"),
                        message: a.toString(),
                      }),
                        t.cancelUpdateAuthorization(e);
                      var o = t.$root.$$phase;
                      "$apply" !== o && "$digest" !== o && t.$apply();
                    }
                    r && (e.id = r.id);
                  });
              }),
              (t.cancelUpdateAuthorization = function (e) {
                e.id
                  ? (delete e.userId,
                    delete e.groupId,
                    a.forEach(e.original, function (t, n) {
                      e[n] = t;
                    }),
                    delete e.original,
                    delete e.inUpdate)
                  : t.authorizations.splice(t.authorizations.indexOf(e), 1);
              }),
              (t.isAuthorizationValid = function (t) {
                return !!t.identityId && !!t.resourceId;
              }),
              (t.isIdentityIdDisabledFor = function (t) {
                return "0" === t.type;
              }),
              (t.ensureValidUser = function (t) {
                "0" === t.type &&
                  ((t.identityId = "*"), (t.identityType = "User"));
              });
          },
        ];
      },
      94525: function (t) {
        "use strict";
        t.exports = [
          "$scope",
          "$q",
          "$location",
          "Uri",
          "Notifications",
          "AuthorizationResource",
          "$uibModalInstance",
          "authorizationToDelete",
          "formatPermissions",
          "getResource",
          "getType",
          function (t, e, n, a, r, i, o, s, c, l, u) {
            (t.authorizationToDelete = s),
              (t.formatPermissions = c),
              (t.getResource = l),
              (t.getType = u),
              t.$on("$routeChangeStart", function () {
                o.close(t.status);
              }),
              (t.close = function (t) {
                o.close(t);
              }),
              (t.performDelete = function () {
                i.delete({ action: s.id })
                  .$promise.then(function () {
                    t.status = "SUCCESS";
                  })
                  .catch(function () {});
              });
          },
        ];
      },
      48637: function (t, e, n) {
        "use strict";
        n(27473), n(56806), n(31083), n(92695);
        var a = n(34485),
          r = n(33131);
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/authorization", {
              template: a,
              controller: [
                "$scope",
                "page",
                "$routeParams",
                "$uibModal",
                "AuthorizationResource",
                "Notifications",
                "$location",
                "$translate",
                function (t, e, n, a, i, o, s, c) {
                  (t.$root.showBreadcrumbs = !0),
                    e.titleSet(c.instant("AUTHORIZATION_AUTHORIZATIONS")),
                    e.breadcrumbsClear(),
                    (t.allPermissionsValue = 2147483647),
                    (t.resourceMap = {
                      0: c.instant("AUTHORIZATION_APPLICATION"),
                      1: c.instant("AUTHORIZATION_USER"),
                      2: c.instant("AUTHORIZATION_GROUP"),
                      3: c.instant("AUTHORIZATION_GROUP_MEMBERSHIP"),
                      4: c.instant("AUTHORIZATION_AUTHORIZATION"),
                      5: c.instant("AUTHORIZATION_FILTER"),
                      6: c.instant("AUTHORIZATION_PROCESS_DEFINITION"),
                      7: c.instant("AUTHORIZATION_TASK"),
                      8: c.instant("AUTHORIZATION_PROCESS_INSTANCE"),
                      9: c.instant("AUTHORIZATION_DEPLOYMENT"),
                      10: c.instant("AUTHORIZATION_DECISION_DEFINITION"),
                      11: c.instant("AUTHORIZATION_TENANT"),
                      12: c.instant("AUTHORIZATION_TENANT_MEMBERSHIP"),
                      13: c.instant("AUTHORIZATION_BATCH"),
                      14: c.instant(
                        "AUTHORIZATION_DECISION_REQUIREMENTS_DEFINITION"
                      ),
                      17: c.instant("AUTHORIZATION_OPERATION_LOG"),
                      19: c.instant("AUTHORIZATION_HISTORIC_TASK"),
                      20: c.instant("AUTHORIZATION_HISTORIC_PROCESS_INSTANCE"),
                      21: c.instant("AUTHORIZATION_SYSTEM"),
                    }),
                    e.breadcrumbsAdd([
                      {
                        label: c.instant("AUTHORIZATION_AUTHORIZATIONS"),
                        href: "#/authorization",
                      },
                    ]),
                    (t.permissionMap = {
                      0: ["ACCESS"],
                      1: ["READ", "UPDATE", "CREATE", "DELETE"],
                      2: ["READ", "UPDATE", "CREATE", "DELETE"],
                      3: ["CREATE", "DELETE"],
                      4: ["READ", "UPDATE", "CREATE", "DELETE"],
                      5: ["CREATE", "READ", "UPDATE", "DELETE"],
                      6: [
                        "READ",
                        "UPDATE",
                        "DELETE",
                        "SUSPEND",
                        "CREATE_INSTANCE",
                        "READ_INSTANCE",
                        "UPDATE_INSTANCE",
                        "RETRY_JOB",
                        "SUSPEND_INSTANCE",
                        "DELETE_INSTANCE",
                        "MIGRATE_INSTANCE",
                        "READ_TASK",
                        "UPDATE_TASK",
                        "TASK_ASSIGN",
                        "TASK_WORK",
                        "READ_TASK_VARIABLE",
                        "READ_HISTORY",
                        "READ_HISTORY_VARIABLE",
                        "DELETE_HISTORY",
                        "READ_INSTANCE_VARIABLE",
                        "UPDATE_INSTANCE_VARIABLE",
                        "UPDATE_TASK_VARIABLE",
                        "UPDATE_HISTORY",
                      ],
                      7: [
                        "CREATE",
                        "READ",
                        "UPDATE",
                        "DELETE",
                        "TASK_ASSIGN",
                        "TASK_WORK",
                        "UPDATE_VARIABLE",
                        "READ_VARIABLE",
                      ],
                      8: [
                        "CREATE",
                        "READ",
                        "UPDATE",
                        "DELETE",
                        "RETRY_JOB",
                        "SUSPEND",
                        "UPDATE_VARIABLE",
                      ],
                      9: ["CREATE", "READ", "DELETE"],
                      10: [
                        "READ",
                        "UPDATE",
                        "CREATE_INSTANCE",
                        "READ_HISTORY",
                        "DELETE_HISTORY",
                      ],
                      11: ["READ", "UPDATE", "CREATE", "DELETE"],
                      12: ["CREATE", "DELETE"],
                      13: [
                        "READ",
                        "UPDATE",
                        "CREATE",
                        "DELETE",
                        "READ_HISTORY",
                        "DELETE_HISTORY",
                        "CREATE_BATCH_MIGRATE_PROCESS_INSTANCES",
                        "CREATE_BATCH_MODIFY_PROCESS_INSTANCES",
                        "CREATE_BATCH_RESTART_PROCESS_INSTANCES",
                        "CREATE_BATCH_DELETE_RUNNING_PROCESS_INSTANCES",
                        "CREATE_BATCH_DELETE_FINISHED_PROCESS_INSTANCES",
                        "CREATE_BATCH_DELETE_DECISION_INSTANCES",
                        "CREATE_BATCH_SET_JOB_RETRIES",
                        "CREATE_BATCH_SET_REMOVAL_TIME",
                        "CREATE_BATCH_SET_EXTERNAL_TASK_RETRIES",
                        "CREATE_BATCH_UPDATE_PROCESS_INSTANCES_SUSPEND",
                        "CREATE_BATCH_SET_VARIABLES",
                      ],
                      14: ["READ"],
                      17: ["READ", "DELETE", "UPDATE"],
                      19: ["READ", "READ_VARIABLE"],
                      20: ["READ"],
                      21: ["READ", "SET", "DELETE"],
                    }),
                    (t.typeMap = {
                      0: c.instant("AUTHORIZATION_GLOBAL"),
                      1: c.instant("AUTHORIZATION_ALLOW"),
                      2: c.instant("AUTHORIZATION_DENY"),
                    }),
                    (t.getIdentityId = function (t) {
                      return t.userId ? t.userId : t.groupId;
                    });
                  var l = (t.getType = function (e) {
                      return t.typeMap[e.type];
                    }),
                    u = (t.getResource = function (e) {
                      return t.resourceMap[e];
                    }),
                    d = (t.formatPermissions = function (t) {
                      var e = t.indexOf("NONE");
                      if (
                        (e > -1 && (t = t.splice(e, 1)), t.indexOf("ALL") > -1)
                      )
                        return "ALL";
                      for (var n = "", a = 0; a < t.length; a++)
                        a > 0 && (n += ", "), (n += t[a]);
                      return "" === n ? "NONE" : n;
                    });
                  (t.deleteAuthorization = function (t) {
                    a.open({
                      controller: "ConfirmDeleteAuthorizationController",
                      template: r,
                      resolve: {
                        authorizationToDelete: function () {
                          return t;
                        },
                        formatPermissions: function () {
                          return d;
                        },
                        getResource: function () {
                          return u;
                        },
                        getType: function () {
                          return l;
                        },
                      },
                    }).result.then(
                      function (t) {
                        "SUCCESS" == t && p();
                      },
                      function () {
                        p();
                      }
                    );
                  }),
                    (t.pages = t.pages || { total: 0, size: 25, current: 1 });
                  var p = (t.loadAuthorizations = function () {
                    function e() {
                      t.loadingState = "ERROR";
                    }
                    (t.loadingState = "LOADING"),
                      i
                        .count({ resourceType: t.selectedResourceType })
                        .$promise.then(function (e) {
                          t.pages.total = e.count;
                        }, e),
                      i
                        .query({
                          resourceType: t.selectedResourceType,
                          firstResult: (t.pages.current - 1) * t.pages.size,
                          maxResults: t.pages.size,
                        })
                        .$promise.then(function (e) {
                          (t.authorizations = e),
                            (t.loadingState = e.length ? "LOADED" : "EMPTY");
                        }, e);
                  });
                  t.$watch("pages.current", p),
                    (t.getPermissionsForResource = function () {
                      return t.selectedResourceType
                        ? t.permissionMap[t.selectedResourceType]
                        : [];
                    }),
                    (t.show = function (t) {
                      return t == s.search().tab;
                    }),
                    (t.activeClass = function (t) {
                      return s.absUrl().split("?").pop() === t ? "active" : "";
                    }),
                    (function () {
                      for (var e in ((t.resourceList = []), t.resourceMap))
                        t.resourceList.push({ id: e, name: t.resourceMap[e] });
                    })(),
                    s.search().resource
                      ? ((t.title = t.getResource(n.resource)),
                        (t.selectedResourceType = n.resource))
                      : (s.search({ resource: 0 }),
                        s.replace(),
                        (t.title = t.getResource(0)),
                        (t.selectedResourceType = "0"));
                },
              ],
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      71999: function (t, e, n) {
        "use strict";
        n(84735);
        var a = n(84585),
          r = n(43909).isArray,
          i = [
            "$scope",
            "Views",
            "page",
            "$injector",
            "$translate",
            function (t, e, n, a, i) {
              var o = t.$root;
              (t.dashboardPlugins = e
                .getProviders({ component: "admin.dashboard.section" })
                .map(function (t) {
                  r(t.access)
                    ? a.invoke(t.access)(function (e, n) {
                        if (e) throw e;
                        t.accessible = n;
                      })
                    : (t.accessible = !0);
                  return t;
                })),
                (o.showBreadcrumbs = !1),
                n.breadcrumbsClear(),
                n.titleSet(i.instant("DASHBOARD_DASHBOARD"));
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/", {
              template: a,
              controller: i,
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      98271: function (t, e, n) {
        "use strict";
        var a = n(65493),
          r = [
            "$scope",
            "camAPI",
            "Notifications",
            "$translate",
            function (t, e, n, a) {
              e.resource("telemetry").fetchData(function (e, r) {
                if (e) {
                  var i = e.message;
                  n.addError({
                    status: a.instant("ERROR"),
                    message: a.instant("DIAGNOSTICS_FETCH_DATA_ERROR_MESSAGE", {
                      msg: i,
                    }),
                  });
                } else t.data = r;
              });
            },
          ];
        t.exports = [
          "ViewsProvider",
          function (t) {
            t.registerDefaultView("admin.system", {
              id: "diagnostics-system-settings",
              label: "DIAGNOSTICS",
              template: a,
              controller: r,
              priority: 950,
            });
          },
        ];
      },
      30729: function (t, e, n) {
        "use strict";
        function a(t, e) {
          var n =
            ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
          if (!n) {
            if (
              Array.isArray(t) ||
              (n = (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return r(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if (
                  "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                )
                  return r(t, e);
              })(t)) ||
              (e && t && "number" == typeof t.length)
            ) {
              n && (t = n);
              var a = 0,
                i = function () {};
              return {
                s: i,
                n: function () {
                  return a >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[a++] };
                },
                e: function (t) {
                  throw t;
                },
                f: i,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var o,
            s = !0,
            c = !1;
          return {
            s: function () {
              n = n.call(t);
            },
            n: function () {
              var t = n.next();
              return (s = t.done), t;
            },
            e: function (t) {
              (c = !0), (o = t);
            },
            f: function () {
              try {
                s || null == n.return || n.return();
              } finally {
                if (c) throw o;
              }
            },
          };
        }
        function r(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
          return a;
        }
        n(36180),
          n(51980),
          n(28186),
          n(67559),
          n(56806),
          n(7089),
          n(95453),
          n(57507),
          n(84735),
          n(72595),
          n(30225),
          n(85541),
          n(84392),
          n(65603),
          n(17003),
          n(95234),
          n(30129),
          n(91663),
          n(66893),
          n(19824);
        var i = n(73483),
          o = n(98024),
          s = n(30336),
          c = n(88969),
          l = n(1023).utils.debouncePromiseFactory,
          u = l(),
          d = l(),
          p = "MMMM YYYY",
          h = "DD/MM/YYYY",
          f = "yyyy-MM-dd",
          m = "YYYY-MM-DD",
          g = {
            PI: "process-instances",
            DI: "decision-instances",
            TU: "task-users",
            FNI: "flow-node-instances",
            EDE: "executed-decision-elements",
          },
          v = "metricsContractStartDate",
          b = {
            PI: "hsl(230, 70%, 41%)",
            DI: "hsl(302, 70%, 41%)",
            TU: "hsl(14, 70%, 41%)",
            FNI: "hsl(86, 70%, 41%)",
            EDE: "hsl(158, 70%, 41%)",
          },
          y = [
            "$scope",
            "$filter",
            "camAPI",
            "configuration",
            "localConf",
            "PluginMetricsResource",
            "$translate",
            function (t, e, n, r, i, l, y) {
              var E = n.resource("telemetry"),
                _ = e("date");
              t.fmtDatePicker = f;
              var S = i.get(v);
              S ? (t.startDate = S) : (S = o().startOf("year").toDate()),
                (t.startDate = _(S, f)),
                (t.loadingStateMonthly = "INITIAL"),
                (t.loadingStateAnnual = "INITIAL"),
                (t.metrics = {});
              var T = {},
                A = {};
              (t.monthlyMetrics = []),
                (t.annualMetrics = []),
                (t.displayLegacyMetrics = !1),
                (t.datePickerOptions = { maxDate: o().toDate() }),
                E.fetchData(function (e, n) {
                  e
                    ? (t.telemetryData = y.instant(
                        "DIAGNOSTICS_FETCH_DATA_ERROR_MESSAGE",
                        { err: e }
                      ))
                    : ((t.telemetryData = n),
                      delete t.telemetryData.product.internals.commands,
                      delete t.telemetryData.product.internals.metrics);
                });
              var I = function () {
                var e;
                if (o(t.startDate, m, !0).isValid())
                  return i.set(v, t.startDate), R(), D();
                (e = "Invalid Date Value. Supported pattern '".concat(m, "'.")),
                  (t.loadingStateMonthly = t.loadingStateAnnual = "ERROR"),
                  (t.loadingErrorMonthly = t.loadingErrorAnnual = e);
              };
              t.getSubscriptionMonthStyle = function (t) {
                return t.activeYear ? {} : { opacity: 0.7 };
              };
              var w = function (e) {
                  var n = o(t.startDate).year(e),
                    a = n.clone().add(1, "years"),
                    r = a.isAfter(o())
                      ? "EXECUTION_METRICS_ANNUAL_FORMAT_CURRENT"
                      : "EXECUTION_METRICS_ANNUAL_FORMAT";
                  return y.instant(r, { from: n.format(h), to: a.format(h) });
                },
                C = function (t, e) {
                  return e
                    ? "".concat(t, ".").concat(String(e).padStart(2, "0"))
                    : t;
                },
                O = function (t, e) {
                  var n,
                    r =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {},
                    i = a(t);
                  try {
                    for (i.s(); !(n = i.n()).done; ) {
                      var c = n.value,
                        l = C(c.subscriptionYear, c.subscriptionMonth),
                        u = void 0;
                      s.isFunction(e) && (u = e(l)),
                        s.isString(e) && (u = o(l, "YYYY.MM").format(e)),
                        r[l] ||
                          ((r[l] = {}), (r[l].label = l), (r[l].labelFmt = u)),
                        (r[l][c.metric] = {
                          sum: c.sum,
                          sumFmt: c.sum.toLocaleString() || 0,
                        });
                    }
                  } catch (t) {
                    i.e(t);
                  } finally {
                    i.f();
                  }
                  return r;
                },
                x = function (t) {
                  return Object.values(t).sort(function (t, e) {
                    return e.label - t.label;
                  });
                },
                N = function (e, n, a) {
                  return new Promise(function (r, i) {
                    l.getAggregated({
                      subscriptionStartDate: t.startDate,
                      groupBy: "month",
                      metrics: Array.from(e).toString(),
                      startDate: n,
                      endDate: a,
                    }).$promise.then(
                      function (t) {
                        O(t, p, T), r();
                      },
                      function (t) {
                        return i(t);
                      }
                    );
                  });
                },
                R = function () {
                  for (
                    var e = o(t.startDate).startOf("day");
                    e.clone().add(1, "month").isBefore(o());

                  )
                    e.add(1, "month");
                  t.activeMonth = e;
                  for (
                    var n = o(t.startDate).startOf("day");
                    n.clone().add(1, "year").isBefore(o());

                  )
                    n.add(1, "year");
                  t.activeYear = n;
                },
                L = function () {
                  (t.loadingStateMonthly = "LOADING"),
                    (function () {
                      T = {};
                      for (
                        var e = t.activeMonth.clone(),
                          n = function () {
                            var n = C(e.year(), e.month() + 1);
                            (T[n] = {
                              label: n,
                              labelFmt: e.format(p),
                              activeYear: !e.isBefore(t.activeYear),
                            }),
                              Object.values(g).forEach(function (t) {
                                T[n][t] = { sum: 0, sumFmt: 0 };
                              }),
                              (e = e.subtract(1, "months"));
                          },
                          a = 0;
                        a < 24;
                        a++
                      )
                        n();
                    })();
                  var e = t.activeYear.clone().subtract(1, "year").format(m),
                    n = t.activeYear.format(m),
                    r = [g.PI, g.DI];
                  t.displayLegacyMetrics && r.push(g.FNI, g.EDE);
                  var i = [N(r, e), N([g.TU], n), N([g.TU], e, n)];
                  u(Promise.all(i))
                    .then(function () {
                      for (var e = (A = x(T)).length - 1; e >= 0; e--) {
                        var n = A[e];
                        if (e - 1 >= 0) {
                          var r = A[e - 1];
                          if (n.activeYear === r.activeYear) {
                            var i = n[g.TU].sum + r[g.TU].sum;
                            (r[g.TU].sum = i),
                              (r[g.TU].sumFmt = i.toLocaleString());
                          }
                        }
                      }
                      var o, c, l;
                      (t.monthlyMetrics = s.copy(A)),
                        (t.monthlyMetrics = t.monthlyMetrics.slice(0, 12)),
                        (o = t.monthlyMetrics.reverse()),
                        (l = []).push(
                          (c = function (t) {
                            var e,
                              n = [],
                              r = a(o);
                            try {
                              for (r.s(); !(e = r.n()).done; ) {
                                var i,
                                  s = e.value;
                                n.push(
                                  (null === (i = s[g[t]]) || void 0 === i
                                    ? void 0
                                    : i.sum) || 0
                                );
                              }
                            } catch (t) {
                              r.e(t);
                            } finally {
                              r.f();
                            }
                            return { label: t, data: n, backgroundColor: b[t] };
                          })("PI")
                        ),
                        l.push(c("DI")),
                        l.push(c("TU")),
                        t.displayLegacyMetrics &&
                          (l.push(c("FNI")), l.push(c("EDE"))),
                        (t.chart.data.labels = o.map(function (t) {
                          return t.labelFmt;
                        })),
                        (t.chart.data.datasets = l),
                        t.chart.update(),
                        (t.loadingStateMonthly = "LOADED"),
                        t.$apply();
                    })
                    .catch(function (e) {
                      (t.loadingStateMonthly = "ERROR"),
                        (t.loadingErrorMonthly = U(e));
                    });
                },
                U = function (t) {
                  var e, n;
                  return (
                    null !== (e = t.data) && void 0 !== e && e.type
                      ? ((n = t.data.type),
                        t.data.message && (n += ": " + t.data.message))
                      : (n = t.statusText),
                    y.instant("EXECUTION_METRICS_FETCH_DATA_ERROR_MESSAGE", {
                      msg: n,
                    })
                  );
                };
              t.getClipboardText = function (e) {
                var n = "";
                return (
                  (n += "".concat(e.labelFmt, "\n")),
                  Object.keys(g).forEach(function (t) {
                    n += "- ".concat(t, ": ").concat(e[g[t]].sumFmt, "\n");
                  }),
                  (n += "\n"),
                  (n += JSON.stringify(t.telemetryData, null, 2))
                );
              };
              var P,
                D = (t.load = function () {
                  L(),
                    (t.loadingStateAnnual = "LOADING"),
                    d(
                      l.getAggregated({
                        subscriptionStartDate: t.startDate,
                        groupBy: "year",
                      }).$promise
                    )
                      .then(function (e) {
                        var n = O(e, w),
                          a = function (t) {
                            Object.values(g).forEach(function (e) {
                              n[t][e] || (n[t][e] = { sum: 0, sumFmt: 0 });
                            });
                          };
                        for (var r in n) a(r);
                        (t.annualMetrics = x(n)),
                          (t.loadingStateAnnual =
                            0 === t.annualMetrics.length ? "EMPTY" : "LOADED"),
                          t.$apply();
                      })
                      .catch(function (e) {
                        (t.loadingStateAnnual = "ERROR"),
                          (t.loadingErrorAnnual = U(e));
                      });
                });
              t.$watch("startDate", function (t, e) {
                t !== e && I();
              }),
                t.$watch("displayLegacyMetrics", function (t, e) {
                  t !== e && L();
                }),
                (P = s
                  .element("canvas#monthly-metrics-chart-canvas")[0]
                  .getContext("2d")),
                c.Chart.register(
                  c.BarController,
                  c.BarElement,
                  c.LinearScale,
                  c.CategoryScale,
                  c.Legend,
                  c.Tooltip
                ),
                (t.chart = new c.Chart(P, {
                  type: "bar",
                  data: { labels: [], datasets: [] },
                  options: {
                    responsive: !0,
                    maintainAspectRatio: !1,
                    interaction: { mode: "index", intersect: !1 },
                  },
                })),
                R(),
                D();
            },
          ];
        t.exports = [
          "ViewsProvider",
          function (t) {
            t.registerDefaultView("admin.system", {
              id: "system-settings-metrics",
              label: "EXECUTION_METRICS",
              template: i,
              controller: y,
              priority: 900,
            });
          },
        ];
      },
      31676: function (t, e, n) {
        "use strict";
        var a = n(29758),
          r = [
            "$scope",
            "page",
            "GroupResource",
            "Notifications",
            "$location",
            "$translate",
            function (t, e, n, a, r, i) {
              (t.$root.showBreadcrumbs = !0),
                e.titleSet(i.instant("GROUP_CREATE_NEW_GROUP")),
                e.breadcrumbsClear(),
                e.breadcrumbsAdd([
                  {
                    label: i.instant("GROUP_CREATE_LABEL_GROUP"),
                    href: "#/groups",
                  },
                  {
                    label: i.instant("GROUP_CREATE_LABEL_NEW_GROUP"),
                    href: "#/group-create",
                  },
                ]),
                (t.group = { id: "", name: "", type: "" }),
                (t.createGroup = function () {
                  var e = t.group;
                  n.createGroup(e).$promise.then(
                    function () {
                      a.addMessage({
                        type: "success",
                        status: i.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                        message: i.instant("GROUP_CREATE_MESSAGE_SUCCESS", {
                          group: e.id,
                        }),
                      }),
                        r.path("/groups");
                    },
                    function (t) {
                      var n = t.data.message;
                      a.addError({
                        status: i.instant("NOTIFICATIONS_STATUS_FAILED"),
                        message: i.instant("GROUP_CREATE_MESSAGE_ERROR", {
                          group: e.id,
                          message: n,
                        }),
                        exclusive: !0,
                      });
                    }
                  );
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/group-create", {
              template: a,
              controller: r,
              authentication: "required",
            });
          },
        ];
      },
      70304: function (t, e, n) {
        "use strict";
        n(67559), n(84392), n(56806), n(31083), n(92695), n(66893);
        var a = n(5566),
          r = n(83099),
          i = n(50898),
          o = n(43909),
          s = [
            "$scope",
            "page",
            "$routeParams",
            "search",
            "camAPI",
            "Notifications",
            "$location",
            "$uibModal",
            "unescape",
            "$translate",
            function (t, e, n, a, s, c, l, u, d, p) {
              var h = s.resource("group"),
                f = s.resource("tenant"),
                m = s.resource("user"),
                g = function () {
                  e.breadcrumbsClear(),
                    e.breadcrumbsAdd({
                      label: p.instant("GROUP_EDIT_GROUPS"),
                      href: "#/groups/",
                    });
                };
              (t.$root.showBreadcrumbs = !0),
                e.titleSet(p.instant("GROUP_EDIT_GROUP")),
                g(),
                (t.group = null),
                (t.groupName = null),
                (t.decodedGroupId = d(encodeURIComponent(n.groupId))),
                (t.groupUserList = null),
                (t.tenantList = null);
              var v = (t.groupUserPages = { size: 25, total: 0, current: 1 }),
                b = (t.groupTenantPages = { size: 25, total: 0, current: 1 }),
                y = (t.tenantsSorting = null),
                E = null;
              t.canSubmit = function (e, n) {
                return (
                  e.$valid &&
                  !e.$pristine &&
                  (!n || !o.equals(t[n], t[n + "Copy"]))
                );
              };
              var _ = (t.loadGroup = function () {
                (t.groupLoadingState = "LOADING"),
                  h.get(
                    { id: t.decodedGroupId },
                    function (n, a) {
                      (t.groupLoadingState = "LOADED"),
                        (t.group = a),
                        (t.groupName = a.name ? a.name : a.id),
                        (t.groupCopy = o.copy(a)),
                        e.titleSet(
                          p.instant("GROUP_EDIT_GROUP", { group: t.groupName })
                        ),
                        g(),
                        e.breadcrumbsAdd({
                          label: t.groupName,
                          href: "#/groups/" + t.group.id,
                        });
                    },
                    function () {
                      t.groupLoadingState = "ERROR";
                    }
                  );
              });
              (t.onTenantsSortingChanged = function (e) {
                ((y = t.tenantsSorting = t.tenantsSorting || {}).sortBy =
                  e.sortBy),
                  (y.sortOrder = e.sortOrder),
                  A();
              }),
                (t.onUsersSortingInitialized = function (t) {
                  E = t;
                }),
                (t.onUsersSortingChanged = function (t) {
                  (E = t), T();
                }),
                t.$watch(
                  function () {
                    return (
                      "users" === l.search().tab &&
                      E &&
                      parseInt((l.search() || {}).page || "1")
                    );
                  },
                  function (t) {
                    t && ((v.current = t), T());
                  }
                ),
                t.$watch(
                  function () {
                    return (
                      "tenants" === l.search().tab &&
                      y &&
                      parseInt((l.search() || {}).page || "1")
                    );
                  },
                  function (t) {
                    t && ((b.current = t), A());
                  }
                ),
                (t.pageChange = function (t) {
                  a.updateSilently({ page: t && 1 !== t ? t : null });
                });
              var S = function (t) {
                var e = t.current,
                  n = t.size;
                return { firstResult: (e - 1) * n, maxResults: n };
              };
              t.canSortUserEntries = !0;
              var T = function () {
                  var e = S(v),
                    n = { memberOfGroup: t.decodedGroupId };
                  (t.userLoadingState = "LOADING"),
                    m.list(o.extend({}, n, e, E), function (a, r) {
                      null === a
                        ? ((t.groupUserList = r),
                          (t.userLoadingState = r.length ? "LOADED" : "EMPTY"))
                        : m
                            .list(o.extend({}, n, e))
                            .then(function (e) {
                              (t.canSortUserEntries = !1),
                                (t.groupUserList = e),
                                (t.userLoadingState = e.length
                                  ? "LOADED"
                                  : "EMPTY"),
                                c.addMessage({
                                  status: p.instant("USERS_NO_SORTING_HEADER"),
                                  message: p.instant("USERS_NO_SORTING_BODY"),
                                  exclusive: !0,
                                });
                            })
                            .catch(function () {
                              t.userLoadingState = "ERROR";
                            });
                    }),
                    m.count(n, function (t, e) {
                      v.total = e.count;
                    });
                },
                A = (t.updateGroupTenantView = function () {
                  var e = S(b),
                    n = { groupMember: t.decodedGroupId };
                  (t.tenantLoadingState = "LOADING"),
                    f.list(o.extend({}, n, e, y), function (e, n) {
                      null === e
                        ? ((t.tenantList = n),
                          (t.idList = []),
                          o.forEach(t.tenantList, function (e) {
                            t.idList.push(e.id);
                          }),
                          (t.tenantLoadingState = n.length
                            ? "LOADED"
                            : "EMPTY"))
                        : (t.tenantLoadingState = "ERROR");
                    }),
                    f.count(n, function (t, e) {
                      b.total = e.count;
                    });
                });
              (t.removeTenant = function (e) {
                f.deleteGroupMember(
                  { groupId: t.decodedGroupId, id: e },
                  function (e) {
                    if (null === e)
                      c.addMessage({
                        type: "success",
                        status: p.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                        message: p.instant("GROUP_EDIT_REMOVED_FROM_TENANT", {
                          group: t.group.id,
                        }),
                      }),
                        A();
                    else {
                      var n = e.response.body.message;
                      c.addError({
                        status: p.instant("NOTIFICATIONS_STATUS_FAILED"),
                        message: p.instant(
                          "GROUP_EDIT_REMOVED_FROM_TENANT_FAILED",
                          { group: t.group.id, message: n }
                        ),
                      });
                    }
                  }
                );
              }),
                (t.updateGroup = function () {
                  h.update(
                    o.extend({}, { groupId: t.decodedGroupId }, t.group),
                    function (t) {
                      if (null === t)
                        c.addMessage({
                          type: "success",
                          status: p.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                          message: p.instant("GROUP_EDIT_UPDATE_SUCCESS"),
                        }),
                          _();
                      else {
                        var e = t.response.body.message;
                        c.addError({
                          status: p.instant("NOTIFICATIONS_STATUS_FAILED"),
                          message: p.instant("GROUP_EDIT_UPDATE_FAILED", {
                            message: e,
                          }),
                        });
                      }
                    }
                  );
                }),
                (t.deleteGroup = function () {
                  u.open({
                    template: i,
                    controller: [
                      "$scope",
                      "$timeout",
                      function (e, n) {
                        (e.question = p.instant("GROUP_EDIT_DELETE_CONFIRM", {
                          group: t.group.id,
                        })),
                          (e.delete = function () {
                            h.delete({ id: t.decodedGroupId }, function (a) {
                              if (null === a)
                                n(function () {
                                  c.addMessage({
                                    type: "success",
                                    status: p.instant(
                                      "NOTIFICATIONS_STATUS_SUCCESS"
                                    ),
                                    message: p.instant(
                                      "GROUP_EDIT_DELETE_SUCCESS",
                                      { group: t.group.id }
                                    ),
                                  });
                                }, 200),
                                  l.path("/groups"),
                                  e.$close();
                              else {
                                var r = a.response.body.message;
                                c.addError({
                                  status: p.instant(
                                    "NOTIFICATIONS_STATUS_FAILED"
                                  ),
                                  message: p.instant(
                                    "GROUP_EDIT_DELETE_FAILED",
                                    { message: r }
                                  ),
                                });
                              }
                            });
                          });
                      },
                    ],
                  }).catch(o.noop);
                });
              (t.openCreateTenantMembershipDialog = function () {
                var e,
                  n,
                  a = {
                    ctrl: "TenantMembershipDialogController",
                    template: r,
                    callback: A,
                    resolve:
                      ((e = {
                        idList: function () {
                          return t.idList;
                        },
                      }),
                      o.extend(
                        {},
                        {
                          member: function () {
                            return t.group;
                          },
                          memberId: function () {
                            return t.decodedGroupId;
                          },
                        },
                        e
                      )),
                  };
                (n = a),
                  u
                    .open({
                      controller: n.ctrl,
                      template: n.template,
                      resolve: n.resolve,
                    })
                    .result.then(function (t) {
                      "SUCCESS" === t && n.callback();
                    })
                    .catch(o.noop);
              }),
                (t.show = function (t) {
                  return t === l.search().tab;
                }),
                (t.activeClass = function (t) {
                  return -1 !== l.absUrl().indexOf(t) ? "active" : "";
                }),
                _(),
                l.search().tab || (l.search({ tab: "group" }), l.replace()),
                (t.translate = function (t, e) {
                  return p.instant(t, e);
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/groups/:groupId", {
              template: a,
              controller: s,
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      37351: function (t, e, n) {
        "use strict";
        n(27473), n(84392), n(66893);
        var a = n(43909);
        t.exports = [
          "$scope",
          "$q",
          "$location",
          "Uri",
          "Notifications",
          "camAPI",
          "$uibModalInstance",
          "member",
          "memberId",
          "idList",
          "$translate",
          function (t, e, n, r, i, o, s, c, l, u, d) {
            var p = o.resource("group");
            (t.user = c),
              (t.groupIdList = u),
              (t.userId = l),
              t.$on("$routeChangeStart", function () {
                s.close(t.status);
              });
            var h = (t.pages = { current: 1, size: 50, total: 0 }),
              f = [];
            p.count().then(function (t) {
              h.total = t.count;
            });
            var m = (t.sorting = {});
            (t.onSortingChanged = function (e) {
              ((m = t.sorting = t.sorting || {}).sortBy = e.sortBy),
                (m.sortOrder = e.sortOrder),
                g();
            }),
              (t.onPaginationChange = function () {
                g();
              });
            var g = function () {
              var n;
              e.all([
                ((n = e.defer()),
                p.list(
                  a.extend(
                    {},
                    {
                      maxResults: h.size,
                      firstResult: (h.current - 1) * h.size,
                    },
                    m
                  ),
                  function (t, e) {
                    null === t ? n.resolve(e) : n.reject(t.data);
                  }
                ),
                n.promise),
              ]).then(
                function (e) {
                  var n = e[0];
                  (t.availableGroups = []),
                    a.forEach(n, function (e) {
                      -1 == t.groupIdList.indexOf(e.id) &&
                        (-1 !== f.indexOf(e.id) && (e.checked = !0),
                        t.availableGroups.push(e));
                    }),
                    (t.status = "beforeCreate");
                },
                function (e) {
                  (t.status = "loadingFailed"),
                    i.addError({
                      status: "Failed",
                      message: d.instant(
                        "GROUP_MEMBERSHIP_CREATE_LOAD_FAILED",
                        { message: e.message }
                      ),
                      exclusive: ["type"],
                    });
                }
              );
            };
            g(),
              (t.selectGroup = function (t) {
                var e = f.indexOf(t.id);
                -1 === e ? f.push(t.id) : f.splice(e, 1);
              }),
              (t.createGroupMemberships = function () {
                t.status = "performCancel";
                var n = 0,
                  r = e.defer();
                a.forEach(f, function (e) {
                  p.createMember({ id: e, userId: t.userId }, function (t) {
                    n++,
                      null === t
                        ? n == f.length && r.resolve()
                        : n == f.length && r.reject(t);
                  });
                }),
                  r.promise.then(
                    function () {
                      t.status = "SUCCESS";
                    },
                    function (e) {
                      (t.status = "FAILED"),
                        i.addError({
                          status: "Failed",
                          message: d.instant(
                            "GROUP_MEMBERSHIP_CREATE_CREATE_FAILED",
                            { message: e.message }
                          ),
                          exclusive: ["type"],
                        });
                    }
                  );
              }),
              (t.close = function (t) {
                s.close(t);
              });
          },
        ];
      },
      97315: function (t, e, n) {
        "use strict";
        var a = n(19563),
          r = n(17743),
          i = n(43909),
          o = n(1023).utils.debouncePromiseFactory,
          s = o(),
          c = o(),
          l = [
            "$scope",
            "page",
            "$location",
            "search",
            "GroupResource",
            "$translate",
            function (t, e, n, a, o, l) {
              var u;
              function d(e, n) {
                e && n && ((t.query = e), (t.pages = n));
                var a = t.pages.current,
                  r = t.pages.size,
                  l = {
                    firstResult: (a - 1) * r,
                    maxResults: r,
                    sortBy: u.sortBy,
                    sortOrder: u.sortOrder,
                  };
                return (
                  (t.groupList = null),
                  (t.loadingState = "LOADING"),
                  c(o.count(i.extend({}, t.query)).$promise)
                    .then(function (e) {
                      var n = e.count;
                      return s(o.query(i.extend({}, t.query, l)).$promise)
                        .then(function (e) {
                          return (
                            (t.groupList = e),
                            (t.loadingState = e.length ? "LOADED" : "EMPTY"),
                            setTimeout(function () {
                              t.$apply();
                            }, 0),
                            n
                          );
                        })
                        .catch(i.noop);
                    })
                    .catch(i.noop)
                );
              }
              (t.searchConfig = i.copy(r)),
                (t.blocked = !0),
                (t.onSearchChange = d),
                (t.query = t.pages = null),
                (t.onSortInitialized = function (e) {
                  (u = e), (t.blocked = !1);
                }),
                (t.onSortChanged = function (t) {
                  (u = t), d();
                }),
                (t.$root.showBreadcrumbs = !0),
                e.titleSet(l.instant("GROUPS_GROUP")),
                e.breadcrumbsClear(),
                e.breadcrumbsAdd({
                  label: l.instant("GROUPS_GROUP"),
                  href: "#/groups",
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/groups", {
              template: a,
              controller: l,
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      9202: function (t, e, n) {
        "use strict";
        var a = n(43909);
        n(91660), n(45288);
        var r = n(48637),
          i = n(11558),
          o = n(94525),
          s = n(30819),
          c = n(71999),
          l = n(96092),
          u = n(98400),
          d = n(97315),
          p = n(31676),
          h = n(70304),
          f = n(37351),
          m = n(49346),
          g = n(66734),
          v = n(16943),
          b = n(2494),
          y = n(10663),
          E = n(77031),
          _ = n(87702),
          S = n(30729),
          T = n(98271),
          A = a.module("cam.admin.pages", ["ngRoute", "cam.commons"]);
        A.config(r),
          A.controller("AuthorizationCreateController", i),
          A.controller("ConfirmDeleteAuthorizationController", o),
          A.config(c),
          A.config(s),
          A.config(l),
          A.config(u),
          A.config(d),
          A.config(p),
          A.config(h),
          A.controller("GroupMembershipDialogController", f),
          A.config(m),
          A.config(g),
          A.config(v),
          A.config(b),
          A.config(y),
          A.config(E),
          A.controller("TenantMembershipDialogController", _),
          A.config(S),
          A.config(T),
          (t.exports = A);
      },
      49346: function (t, e, n) {
        "use strict";
        n(56806);
        var a = n(25060),
          r = [
            "$scope",
            "InitialUserResource",
            "Notifications",
            "$location",
            "Uri",
            "$translate",
            function (t, e, n, a, r, i) {
              /.*\/app\/admin\/([\w-]+)\/setup\/.*/.test(a.absUrl())
                ? ((t.engineName = r.appUri(":engine")),
                  (t.profile = {
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                  }),
                  (t.created = !1),
                  (t.credentials = { password: "", password2: "", valid: !0 }),
                  (t.createUser = function () {
                    var a = {
                      profile: t.profile,
                      credentials: { password: t.credentials.password },
                    };
                    e.create(a)
                      .$promise.then(
                        function () {
                          t.created = !0;
                        },
                        function () {
                          n.addError({
                            status: i.instant("NOTIFICATIONS_STATUS_ERROR"),
                            message: i.instant("SETUP_COULD_NOT_CREATE_USER"),
                          });
                        }
                      )
                      .catch(function () {});
                  }))
                : a.path("/");
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/setup", { template: a, controller: r });
          },
        ];
      },
      66734: function (t, e, n) {
        "use strict";
        n(84735);
        var a = n(10354),
          r = n(30336),
          i = [
            "$scope",
            "page",
            "$location",
            "$routeParams",
            "Views",
            "$translate",
            "$injector",
            function (t, e, n, a, i, o, s) {
              (t.$root.showBreadcrumbs = !0),
                e.titleSet(o.instant("SYSTEM_SYSTEM_SETTINGS")),
                e.breadcrumbsClear(),
                e.breadcrumbsAdd([
                  {
                    label: o.instant("SYSTEM_SYSTEM_SETTINGS"),
                    href: "#/system",
                  },
                ]),
                (t.systemSettingsProviders = i
                  .getProviders({ component: "admin.system" })
                  .map(function (t) {
                    r.isArray(t.access)
                      ? s.invoke(t.access)(function (e, n) {
                          if (e) throw e;
                          t.accessible = n;
                        })
                      : (t.accessible = !0);
                    return t;
                  })),
                a.section &&
                  (t.activeSettingsProvier = i.getProviders({
                    component: "admin.system",
                    id: a.section,
                  })[0]),
                (t.activeClass = function (t) {
                  return -1 != n.absUrl().indexOf(t) ? "active" : "";
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/system", {
              template: a,
              controller: i,
              authentication: "required",
            });
          },
        ];
      },
      16943: function (t, e, n) {
        "use strict";
        var a = n(19109),
          r = [
            "$scope",
            "Uri",
            function (t, e) {
              t.processEngineName = e.appUri(":engine");
            },
          ];
        t.exports = [
          "ViewsProvider",
          function (t) {
            t.registerDefaultView("admin.system", {
              id: "system-settings-general",
              label: "SYSTEM_GENERAL",
              template: a,
              controller: r,
              priority: 1e3,
            });
          },
        ];
      },
      10663: function (t, e, n) {
        "use strict";
        var a = n(74851),
          r = [
            "$scope",
            "page",
            "camAPI",
            "Notifications",
            "$location",
            "$translate",
            function (t, e, n, a, r, i) {
              var o = n.resource("tenant");
              (t.$root.showBreadcrumbs = !0),
                e.titleSet(i.instant("TENANTS_CREATE_TENANT")),
                e.breadcrumbsClear(),
                e.breadcrumbsAdd([
                  { label: i.instant("TENANTS_TENANTS"), href: "#/tenants/" },
                  {
                    label: i.instant("TENANTS_CREATE_NEW"),
                    href: "#/tenants-create",
                  },
                ]),
                (t.tenant = { id: "", name: "" }),
                (t.createTenant = function () {
                  var e = t.tenant;
                  o.create(e, function (t) {
                    if (null === t)
                      a.addMessage({
                        type: "success",
                        status: i.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                        message: i.instant("TENANTS_CREATE_TENANT_SUCCESS", {
                          tenant: e.id,
                        }),
                      }),
                        r.path("/tenants");
                    else {
                      var n = t.response.body.message;
                      a.addError({
                        status: i.instant("NOTIFICATIONS_STATUS_FAILED"),
                        message: i.instant("TENANTS_CREATE_TENANT_FAILED", {
                          message: n,
                        }),
                      });
                    }
                  });
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/tenant-create", {
              template: a,
              controller: r,
              authentication: "required",
            });
          },
        ];
      },
      77031: function (t, e, n) {
        "use strict";
        n(67559), n(56806), n(31083), n(92695);
        var a = n(67703),
          r = n(50898),
          i = n(43909),
          o = [
            "$scope",
            "page",
            "$routeParams",
            "search",
            "camAPI",
            "Notifications",
            "$location",
            "$uibModal",
            "unescape",
            "$translate",
            function (t, e, n, a, o, s, c, l, u, d) {
              var p = o.resource("tenant"),
                h = o.resource("group"),
                f = o.resource("user");
              function m() {
                e.breadcrumbsClear(),
                  e.breadcrumbsAdd([
                    { label: d.instant("TENANTS_TENANTS"), href: "#/tenants" },
                  ]);
              }
              (t.$root.showBreadcrumbs = !0),
                e.titleSet(d.instant("TENANTS_TENANT")),
                m(),
                (t.tenant = null),
                (t.tenantName = null),
                (t.decodedTenantId = u(encodeURIComponent(n.tenantId))),
                (t.tenantGroupList = null),
                (t.tenantUserList = null);
              var g = (t.tenantGroupPages = { size: 25, total: 0 }),
                v = (t.tenantUserPages = { size: 25, total: 0 }),
                b = null,
                y = null;
              t.canSubmit = function (e, n) {
                return (
                  e.$valid &&
                  !e.$pristine &&
                  (!n || !i.equals(t[n], t[n + "Copy"]))
                );
              };
              var E = (t.loadTenant = function () {
                (t.tenantLoadingState = "LOADING"),
                  p.get(
                    t.decodedTenantId,
                    function (n, a) {
                      (t.tenantLoadingState = "LOADED"),
                        (t.tenant = a),
                        (t.tenantName = a.name ? a.name : a.id),
                        (t.tenantCopy = i.copy(a)),
                        e.titleSet(
                          d.instant("TENANTS_TENANT_TITLE", {
                            tenant: t.tenantName,
                          })
                        ),
                        m(),
                        e.breadcrumbsAdd([
                          {
                            label: t.tenantName,
                            href: "#/tenants/" + t.tenant.id,
                          },
                        ]);
                    },
                    function () {
                      t.tenantLoadingState = "ERROR";
                    }
                  );
              });
              function _(e) {
                var n = e.current,
                  a = e.size,
                  r = (n - 1) * a;
                return {
                  searchParams: { memberOfTenant: t.decodedTenantId },
                  pagingParams: { firstResult: r, maxResults: a },
                };
              }
              function S() {
                var e = _(g);
                (t.groupLoadingState = "LOADING"),
                  h.list(
                    i.extend({}, e.searchParams, e.pagingParams, b),
                    function (e, n) {
                      null === e
                        ? ((t.tenantGroupList = n),
                          (t.groupLoadingState = n.length ? "LOADED" : "EMPTY"))
                        : (t.groupLoadingState = "ERROR");
                    }
                  ),
                  h.count(e.searchParams, function (t, e) {
                    g.total = e.count;
                  });
              }
              function T() {
                var e = _(v);
                (t.userLoadingState = "LOADING"),
                  f.list(
                    i.extend({}, e.searchParams, e.pagingParams, y),
                    function (n, a) {
                      null === n
                        ? ((t.tenantUserList = a),
                          (t.userLoadingState = a.length ? "LOADED" : "EMPTY"))
                        : f
                            .list(i.extend({}, e.searchParams, e.pagingParams))
                            .then(function (e) {
                              (t.canSortUserEntries = !1),
                                (t.tenantUserList = e),
                                (t.userLoadingState = e.length
                                  ? "LOADED"
                                  : "EMPTY"),
                                s.addMessage({
                                  status: d.instant("USERS_NO_SORTING_HEADER"),
                                  message: d.instant("USERS_NO_SORTING_BODY"),
                                  exclusive: !0,
                                });
                            })
                            .catch(function () {
                              t.userLoadingState = "ERROR";
                            });
                    }
                  ),
                  f.count(e.searchParams, function (t, e) {
                    v.total = e.count;
                  });
              }
              (t.onUsersSortingInitialized = function (t) {
                y = t;
              }),
                (t.onUsersSortingChanged = function (t) {
                  (y = t), T();
                }),
                t.$watch(
                  function () {
                    return (
                      "users" === c.search().tab &&
                      y &&
                      parseInt((c.search() || {}).page || "1")
                    );
                  },
                  function (t) {
                    t && ((v.current = t), T());
                  }
                ),
                (t.onGroupsSortingInitialized = function (t) {
                  b = t;
                }),
                (t.onGroupsSortingChanged = function (t) {
                  (b = t), S();
                }),
                t.$watch(
                  function () {
                    return (
                      "groups" === c.search().tab &&
                      b &&
                      parseInt((c.search() || {}).page || "1")
                    );
                  },
                  function (t) {
                    t && ((g.current = t), S());
                  }
                ),
                (t.pageChange = function (t) {
                  a.updateSilently({ page: t && 1 !== t ? t : null });
                }),
                (t.canSortUserEntries = !0),
                (t.updateTenant = function () {
                  var e = { id: t.decodedTenantId, name: t.tenant.name };
                  p.update(e, function (t) {
                    if (null === t)
                      s.addMessage({
                        type: "success",
                        status: d.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                        message: d.instant("TENANTS_TENANT_UPDATE_SUCCESS"),
                      }),
                        E();
                    else {
                      var e = t.response.body.message;
                      s.addError({
                        status: d.instant("NOTIFICATIONS_STATUS_FAILED"),
                        message: d.instant("TENANTS_TENANT_UPDATE_FAILED", {
                          message: e,
                        }),
                      });
                    }
                  });
                }),
                (t.deleteTenant = function () {
                  l.open({
                    template: r,
                    controller: [
                      "$scope",
                      "$timeout",
                      function (e, n) {
                        (e.question = d.instant(
                          "TENANTS_TENANT_DELETE_CONFIRM",
                          { tenant: t.tenant.id }
                        )),
                          (e.delete = function () {
                            p.delete({ id: t.decodedTenantId }, function (a) {
                              if (null === a)
                                n(function () {
                                  s.addMessage({
                                    type: "success",
                                    status: d.instant(
                                      "NOTIFICATIONS_STATUS_SUCCESS"
                                    ),
                                    message: d.instant(
                                      "TENANTS_TENANT_DELETE_SUCCESS",
                                      { tenant: t.tenant.id }
                                    ),
                                  });
                                }, 200),
                                  c.path("/tenants"),
                                  e.$close();
                              else {
                                var r = a.response.body.message;
                                s.addError({
                                  status: d.instant(
                                    "NOTIFICATIONS_STATUS_FAILED"
                                  ),
                                  message: d.instant(
                                    "TENANTS_TENANT_DELETE_FAILED",
                                    { tenant: t.tenant.id, message: r }
                                  ),
                                });
                              }
                            });
                          });
                      },
                    ],
                  });
                }),
                (t.show = function (t) {
                  return t === c.search().tab;
                }),
                (t.activeClass = function (t) {
                  return -1 !== c.absUrl().indexOf(t) ? "active" : "";
                }),
                E(),
                c.search().tab || (c.search({ tab: "tenant" }), c.replace()),
                (t.translate = function (t, e) {
                  return d.instant(t, e);
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/tenants/:tenantId", {
              template: a,
              controller: o,
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      87702: function (t, e, n) {
        "use strict";
        n(27473), n(84392), n(56806), n(92695), n(66893);
        var a = n(43909);
        t.exports = [
          "$scope",
          "$q",
          "$location",
          "search",
          "Uri",
          "Notifications",
          "camAPI",
          "$uibModalInstance",
          "member",
          "memberId",
          "idList",
          "$translate",
          function (t, e, n, r, i, o, s, c, l, u, d, p) {
            var h,
              f = (t.modalPages = { size: 20, total: 0, current: 1 }),
              m = (t.checkedItems = []);
            t.checkedItemsCount = 0;
            t.$watch(
              function () {
                return parseInt((n.search() || {}).modalPage || "1");
              },
              function (e) {
                var n;
                (f.current = e),
                  (t.availableTenants = void 0),
                  (n = f.current),
                  void 0 === m[n] && (m[n] = []),
                  y();
              }
            ),
              (t.onSortChanged = function (t) {
                (h = t), y();
              }),
              (t.pageChange = function (t) {
                r.updateSilently({ modalPage: t && 1 != t ? t : null });
              });
            var g = s.resource("tenant"),
              v = "beforeCreate",
              b = "loadingFailed";
            function y() {
              var e = f.current,
                n = f.size,
                r = {
                  firstResult: (e - 1) * n,
                  maxResults: n,
                  sortBy: h.sortBy,
                  sortOrder: h.sortOrder,
                };
              g.list(r, function (e, n) {
                null === e
                  ? ((t.availableTenants = []),
                    a.forEach(n, function (e) {
                      var n = e.id;
                      -1 == t.idList.indexOf(n) &&
                        (!(function (t, e, n) {
                          -1 !== m[e].indexOf(t) && n();
                        })(n, f.current, function () {
                          e.checked = !0;
                        }),
                        t.availableTenants.push(e));
                    }),
                    (t.status = v))
                  : ((t.status = b),
                    o.addError({
                      status: p.instant("NOTIFICATIONS_STATUS_FAILED"),
                      message: p.instant("TENANTS_TENANT_LOAD_FAILED", {
                        message: e.data.message,
                      }),
                      exclusive: ["type"],
                    }));
              }),
                g.count(function (t, e) {
                  null === t && (f.total = e.count);
                });
            }
            (t.member = l),
              (t.idList = d),
              (t.memberId = u),
              t.$on("$routeChangeStart", function () {
                c.close(t.status);
              });
            var E = (t.allTenantsChecked = function () {
              if (void 0 !== t.availableTenants) {
                var e = 0;
                return (
                  a.forEach(t.availableTenants, function (n) {
                    var a = n.id;
                    n.checked
                      ? (e++,
                        (function (e, n) {
                          -1 === m[n].indexOf(e) &&
                            (m[n].push(e), t.checkedItemsCount++);
                        })(a, f.current))
                      : (function (e, n) {
                          var a = m[n].indexOf(e);
                          -1 !== a &&
                            (m[n].splice(a, 1), t.checkedItemsCount--);
                        })(a, f.current);
                  }),
                  e === t.availableTenants.length
                );
              }
              return !1;
            });
            t.checkAllTenants = function () {
              E()
                ? a.forEach(t.availableTenants, function (t) {
                    t.checked = !1;
                  })
                : a.forEach(t.availableTenants, function (t) {
                    t.checked = !0;
                  });
            };
            var _ = function (n) {
              var r = e.defer(),
                i = (function () {
                  t.status = "performCancel";
                  var e = [];
                  return (
                    a.forEach(m, function (t) {
                      a.forEach(t, function (t) {
                        -1 === e.indexOf(t) && e.push(t);
                      });
                    }),
                    e
                  );
                })(),
                s = 0,
                c = function (t, e) {
                  s++,
                    null === t
                      ? s === i.length && r.resolve(e)
                      : s === i.length && r.reject(t);
                };
              a.forEach(i, function (e) {
                (n.id = e),
                  "string" == typeof n.userId
                    ? g.createUserMember(n, c)
                    : g.createGroupMember(n, c),
                  (function (e) {
                    e.promise.then(
                      function () {
                        t.status = "SUCCESS";
                      },
                      function (e) {
                        (t.status = "FAILED"),
                          o.addError({
                            status: "Failed",
                            message: p.instant("TENANTS_TENANT_CREATE_FAILED", {
                              message: e.message,
                            }),
                            exclusive: ["type"],
                          });
                      }
                    );
                  })(r);
              });
            };
            (t.createUserMemberships = function () {
              var e = { userId: t.memberId };
              _(e);
            }),
              (t.createGroupMemberships = function () {
                var e = { groupId: t.memberId };
                _(e);
              }),
              (t.close = function (t) {
                c.close(t);
              });
          },
        ];
      },
      2494: function (t, e, n) {
        "use strict";
        n(84392), n(17003), n(61794);
        var a = n(69952),
          r = n(75710),
          i = n(1023).utils.debouncePromiseFactory,
          o = i(),
          s = i(),
          c = n(43909),
          l = [
            "$scope",
            "$location",
            "search",
            "TenantResource",
            "camAPI",
            "page",
            "$translate",
            function (t, e, n, a, i, l, u) {
              var d;
              function p(e, n) {
                e && n && ((t.query = e), (t.pages = n));
                var r = t.pages.current,
                  i = t.pages.size,
                  l = {
                    firstResult: (r - 1) * i,
                    maxResults: i,
                    sortBy: d.sortBy,
                    sortOrder: d.sortOrder,
                  };
                return (
                  (t.tenantList = null),
                  (t.loadingState = "LOADING"),
                  s(a.count(c.extend({}, t.query)).$promise)
                    .then(function (e) {
                      var n = e.count;
                      return o(a.query(c.extend({}, t.query, l)).$promise)
                        .then(function (e) {
                          return (
                            (t.tenantList = e),
                            (t.loadingState = e.length ? "LOADED" : "EMPTY"),
                            n
                          );
                        })
                        .catch(c.noop);
                    })
                    .catch(c.noop)
                    .finally(function () {
                      setTimeout(function () {
                        t.$apply();
                      }, 0);
                    })
                );
              }
              (t.searchConfig = c.copy(r)),
                (t.blocked = !0),
                (t.onSearchChange = p),
                (t.query = t.pages = null),
                (t.onSortInitialized = function (e) {
                  (d = e), (t.blocked = !1);
                }),
                (t.onSortChanged = function (t) {
                  (d = t), p();
                }),
                (t.$root.showBreadcrumbs = !0),
                l.titleSet(u.instant("TENANTS_TENANTS")),
                l.breadcrumbsClear(),
                l.breadcrumbsAdd({
                  label: u.instant("TENANTS_TENANTS"),
                  href: "#/tenants/",
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/tenants", {
              template: a,
              controller: l,
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      96092: function (t, e, n) {
        "use strict";
        var a = n(65052),
          r = [
            "$scope",
            "page",
            "UserResource",
            "Notifications",
            "$location",
            "$translate",
            function (t, e, n, a, r, i) {
              (t.$root.showBreadcrumbs = !0),
                e.titleSet(i.instant("USERS_CREATE_USER")),
                e.breadcrumbsClear(),
                e.breadcrumbsAdd([
                  { label: i.instant("USERS_USERS"), href: "#/users/" },
                  { label: i.instant("USERS_CREATE"), href: "#/users-create" },
                ]),
                (t.profile = {
                  id: "",
                  firstName: "",
                  lastName: "",
                  email: "",
                }),
                (t.credentials = { password: "", password2: "", valid: !0 }),
                (t.createUser = function () {
                  var e = {
                    profile: t.profile,
                    credentials: { password: t.credentials.password },
                  };
                  n.createUser(e).$promise.then(
                    function () {
                      a.addMessage({
                        type: "success",
                        status: i.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                        message: i.instant("USERS_CREATE_SUCCESS", {
                          user: e.profile.id,
                        }),
                      }),
                        r.path("/users");
                    },
                    function (t) {
                      a.addError({
                        status: i.instant("NOTIFICATIONS_STATUS_FAILED"),
                        message: i.instant("USERS_CREATE_FAILED", {
                          message: t.data.message,
                        }),
                        exclusive: !0,
                      });
                    }
                  );
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/user-create", {
              template: a,
              controller: r,
              authentication: "required",
            });
          },
        ];
      },
      98400: function (t, e, n) {
        "use strict";
        n(82447),
          n(45477),
          n(67559),
          n(84392),
          n(56806),
          n(31083),
          n(92695),
          n(66893);
        var a = n(36868),
          r = n(76196),
          i = n(5993),
          o = n(50898),
          s = n(43909);
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/users/:userId", {
              template: a,
              controller: [
                "$scope",
                "page",
                "$routeParams",
                "camAPI",
                "Notifications",
                "$location",
                "$uibModal",
                "authentication",
                "unescape",
                "$translate",
                "AuthenticationService",
                "$http",
                "Uri",
                function (t, e, n, a, c, l, u, d, p, h, f, m, g) {
                  var v = a.resource("group"),
                    b = a.resource("tenant"),
                    y = a.resource("user"),
                    E = function () {
                      e.breadcrumbsClear(),
                        e.breadcrumbsAdd({
                          label: h.instant("USERS_USERS"),
                          href: "#/users/",
                        });
                    };
                  t.$root.$watch("userFullName", function (e) {
                    e &&
                      (t.currentUserPassword = h.instant("USERS_MY_PASSWORD", {
                        name: t.$root.userFullName,
                      }));
                  }),
                    (t.decodedUserId = p(encodeURIComponent(n.userId))),
                    (t.authenticatedUser = d),
                    (t.profile = null),
                    (t.profile = null),
                    (t.profileCopy = null),
                    (t.credentials = {
                      authenticatedUserPassword: "",
                      password: "",
                      password2: "",
                      valid: !0,
                    }),
                    (t.groupList = null),
                    (t.groupIdList = null),
                    (t.canSubmit = function (e, n) {
                      return (
                        e.$valid &&
                        !e.$pristine &&
                        t.credentials.valid &&
                        (null == n || !s.equals(t[n], t[n + "Copy"]))
                      );
                    });
                  var _ = (t.loadProfile = function () {
                    y.profile({ id: t.decodedUserId }, function (n, a) {
                      (t.user = a),
                        (t.persistedProfile = a),
                        (t.profile = s.copy(a)),
                        (t.profileCopy = s.copy(a));
                      var r = [t.user.firstName, t.user.lastName]
                        .filter(function (t) {
                          return !!t;
                        })
                        .join(" ");
                      e.titleSet(h.instant("USERS_EDIT_USER", { user: r })),
                        E(),
                        e.breadcrumbsAdd({
                          label: r,
                          href: "#/users/" + t.user.id,
                        });
                    });
                  });
                  t.updateProfile = function () {
                    var e = s.extend({}, { id: t.decodedUserId }, t.profile);
                    y.updateProfile(e, function (n) {
                      if (null === n)
                        (t.persistedProfile = e),
                          c.addMessage({
                            type: "success",
                            status: h.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                            message: h.instant("USERS_EDIT_SUCCESS_MSN"),
                          }),
                          _();
                      else {
                        var a = n.response.body.message;
                        c.addError({
                          status: h.instant("NOTIFICATIONS_STATUS_FAILED"),
                          message: h.instant("USERS_EDIT_FAILED", {
                            message: a,
                          }),
                        });
                      }
                    });
                  };
                  (t.updateCredentials = function (e) {
                    var n = {
                        authenticatedUserPassword:
                          t.credentials.authenticatedUserPassword,
                        password: t.credentials.password,
                      },
                      a = s.extend({}, { id: t.decodedUserId }, n);
                    y.updateCredentials(a, function (n) {
                      if (null === n)
                        c.addMessage({
                          type: "success",
                          status: h.instant("NOTIFICATIONS_STATUS_PASSWORD"),
                          message: h.instant("USERS_PASSWORD_CHANGED"),
                          duration: 5e3,
                          exclusive: !0,
                        }),
                          (function (e) {
                            (t.credentials.authenticatedUserPassword = ""),
                              (t.credentials.password = ""),
                              (t.credentials.password2 = ""),
                              e.$setPristine();
                          })(e);
                      else if (400 === n.status)
                        t.decodedUserId === t.authenticatedUser
                          ? c.addError({
                              status: h.instant(
                                "NOTIFICATIONS_STATUS_PASSWORD"
                              ),
                              message: h.instant(
                                "USERS_OLD_PASSWORD_NOT_VALID"
                              ),
                              exclusive: !0,
                            })
                          : c.addError({
                              status: h.instant(
                                "NOTIFICATIONS_STATUS_PASSWORD"
                              ),
                              message: h.instant("USERS_PASSWORD_NOT_VALID"),
                              exclusive: !0,
                            });
                      else {
                        var a = n.response.body.message;
                        c.addError({
                          status: h.instant("NOTIFICATIONS_STATUS_PASSWORD"),
                          message: h.instant(
                            "USERS_PASSWORD_COULD_NOT_CHANGE",
                            { message: a }
                          ),
                        });
                      }
                    });
                  }),
                    (t.deleteUser = function () {
                      u.open({
                        template: o,
                        controller: [
                          "$scope",
                          "$timeout",
                          function (e, n) {
                            (e.question = h.instant(
                              "USERS_USER_DELETE_CONFIRM",
                              { user: t.user.id }
                            )),
                              (e.delete = function () {
                                y.delete({ id: t.decodedUserId }, function (a) {
                                  if (null === a)
                                    t.authenticatedUser.name !== t.user.id
                                      ? (n(function () {
                                          c.addMessage({
                                            type: "success",
                                            status: h.instant(
                                              "NOTIFICATIONS_STATUS_SUCCESS"
                                            ),
                                            message: h.instant(
                                              "USERS_USER_DELETE_SUCCESS",
                                              { user: t.user.id }
                                            ),
                                          });
                                        }, 200),
                                        l.path("/users"))
                                      : m
                                          .get(g.appUri("engine://engine/"))
                                          .then(function (t) {
                                            t.data.forEach(function (t) {
                                              f.logout(t.name);
                                            });
                                          })
                                          .catch(s.noop),
                                      e.$close();
                                  else {
                                    var r = a.response.body.message;
                                    c.addError({
                                      status: h.instant(
                                        "NOTIFICATIONS_STATUS_ERROR"
                                      ),
                                      message: h.instant(
                                        "USERS_USER_DELETE_FAILED",
                                        { user: t.user.id, message: r }
                                      ),
                                    });
                                  }
                                });
                              }),
                              n(function () {
                                return c.addMessage({
                                  type: "info",
                                  status: h.instant("USERS_WARNING"),
                                  unsafe: !0,
                                  message: h.instant("USERS_USER_DELETE_INFO"),
                                });
                              });
                          },
                        ],
                      });
                    }),
                    (t.unlockUser = function () {
                      y.unlock({ id: t.decodedUserId })
                        .then(function () {
                          c.addMessage({
                            type: "success",
                            status: h.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                            message: h.instant("USERS_USER_UNLOCK_SUCCESS", {
                              user: t.user.id,
                            }),
                          }),
                            l.path("/users");
                        })
                        .catch(function (t) {
                          c.addError({
                            status: h.instant("NOTIFICATIONS_STATUS_FAILED"),
                            message: h.instant(t.message),
                          });
                        });
                    });
                  var S = (t.groupsSorting = {});
                  (t.onGroupsSortingChanged = function (e) {
                    ((S = t.groupsSorting = t.groupsSorting || {}).sortBy =
                      e.sortBy),
                      (S.sortOrder = e.sortOrder),
                      A();
                  }),
                    t.$watch(
                      function () {
                        return "groups" === l.search().tab;
                      },
                      function (e) {
                        e &&
                          v
                            .count({ member: t.decodedUserId })
                            .then(function (t) {
                              T.total = t.count;
                            });
                      }
                    );
                  var T = (t.pages = { size: 50, total: 0, current: 1 });
                  t.onPaginationChange = function (e) {
                    (t.pages.current = e.current), A();
                  };
                  var A = (t.loadGroups = function () {
                    (t.groupLoadingState = "LOADING"),
                      v.list(
                        s.extend(
                          {},
                          {
                            member: t.decodedUserId,
                            firstResult: (T.current - 1) * T.size,
                            maxResults: T.size,
                          },
                          S
                        ),
                        function (e, n) {
                          (t.groupLoadingState = n.length ? "LOADED" : "EMPTY"),
                            (t.groupList = n),
                            (t.groupIdList = []),
                            s.forEach(t.groupList, function (e) {
                              t.groupIdList.push(e.id);
                            });
                        }
                      );
                  });
                  (t.removeGroup = function (e) {
                    v.deleteMember(
                      { userId: t.decodedUserId, id: e },
                      function (e) {
                        if (null === e)
                          c.addMessage({
                            type: "success",
                            status: h.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                            message: h.instant("USERS_USER_DELETE_FROM_GROUP", {
                              user: t.user.id,
                            }),
                          }),
                            A();
                        else {
                          var n = e.response.body.message;
                          c.addError({
                            status: h.instant("NOTIFICATIONS_STATUS_FAILED"),
                            message: h.instant(
                              "USERS_USER_DELETE_FROM_GROUP_FAILED",
                              { user: t.user.id, message: n }
                            ),
                          });
                        }
                      }
                    );
                  }),
                    (t.openCreateGroupMembershipDialog = function () {
                      var e = {
                        ctrl: "GroupMembershipDialogController",
                        template: r,
                        callback: t.loadGroups,
                        resolve: N({
                          idList: function () {
                            return t.groupIdList;
                          },
                        }),
                      };
                      x(e);
                    });
                  var I = (t.tenantsSorting = {});
                  (t.onTenantsSortingChanged = function (e) {
                    ((I = t.tenantsSorting = t.tenantsSorting || {}).sortBy =
                      e.sortBy),
                      (I.sortOrder = e.sortOrder),
                      O();
                  }),
                    t.$watch(
                      function () {
                        return "tenants" === l.search().tab && I;
                      },
                      function (t) {
                        return t && (O() || C());
                      }
                    );
                  var w = (t.tenantPages = { size: 50, total: 0, current: 1 }),
                    C = function () {
                      b.count({ userMember: t.decodedUserId }).then(function (
                        t
                      ) {
                        w.total = t.count;
                      });
                    },
                    O = (t.loadTenants = function () {
                      (t.tenantLoadingState = "LOADING"),
                        b.list(
                          s.extend(
                            {},
                            {
                              userMember: t.decodedUserId,
                              maxResults: w.size,
                              firstResult: (w.current - 1) * w.size,
                            },
                            I
                          ),
                          function (e, n) {
                            (t.tenantLoadingState = n.length
                              ? "LOADED"
                              : "EMPTY"),
                              (t.tenantList = n),
                              (t.idList = []),
                              s.forEach(t.tenantList, function (e) {
                                t.idList.push(e.id);
                              });
                          }
                        );
                    });
                  (t.removeTenant = function (e) {
                    b.deleteUserMember(
                      { userId: t.decodedUserId, id: e },
                      function (e) {
                        if (null === e)
                          c.addMessage({
                            type: "success",
                            status: h.instant("NOTIFICATIONS_STATUS_SUCCESS"),
                            message: h.instant(
                              "USERS_USER_DELETE_FROM_TENANT",
                              { user: t.user.id }
                            ),
                          }),
                            O();
                        else {
                          var n = e.response.body.message;
                          c.addError({
                            status: h.instant("NOTIFICATIONS_STATUS_FAILED"),
                            message: h.instant(
                              "USERS_USER_DELETE_FROM_TENANT_FAILED",
                              { user: t.user.id, message: n }
                            ),
                          });
                        }
                      }
                    );
                  }),
                    (t.openCreateTenantMembershipDialog = function () {
                      var e = {
                        ctrl: "TenantMembershipDialogController",
                        template: i,
                        callback: t.loadTenants,
                        resolve: N({
                          idList: function () {
                            return t.idList;
                          },
                        }),
                      };
                      x(e);
                    });
                  var x = function (t) {
                      u.open({
                        controller: t.ctrl,
                        template: t.template,
                        resolve: t.resolve,
                      })
                        .result.then(function (e) {
                          "SUCCESS" === e && t.callback();
                        })
                        .catch(s.noop);
                    },
                    N = function (e) {
                      return s.extend(
                        {},
                        {
                          member: function () {
                            return t.user;
                          },
                          memberId: function () {
                            return t.decodedUserId;
                          },
                        },
                        e
                      );
                    };
                  (t.show = function (t) {
                    return t === l.search().tab;
                  }),
                    (t.activeClass = function (t) {
                      return -1 !== l.absUrl().indexOf(t) ? "active" : "";
                    }),
                    (t.$root.showBreadcrumbs = !0),
                    e.titleSet(h.instant("USERS_EDIT_USER")),
                    E(),
                    _(),
                    l.search().tab ||
                      (l.search({ tab: "profile" }), l.replace()),
                    (t.translate = function (t, e) {
                      return h.instant(t, e);
                    });
                },
              ],
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      30819: function (t, e, n) {
        "use strict";
        n(84392), n(17003), n(61794);
        var a = n(94249),
          r = n(24309),
          i = n(1023).utils.debouncePromiseFactory,
          o = i(),
          s = i(),
          c = n(43909),
          l = [
            "$scope",
            "$location",
            "search",
            "UserResource",
            "page",
            "$translate",
            "Notifications",
            function (t, e, n, a, i, l, u) {
              var d;
              function p(e, n) {
                e && n && ((t.query = e), (t.pages = n));
                var r = t.pages.current,
                  i = t.pages.size,
                  p = {
                    firstResult: (r - 1) * i,
                    maxResults: i,
                    sortBy: d.sortBy,
                    sortOrder: d.sortOrder,
                  };
                return (
                  (t.userList = null),
                  (t.loadingState = "LOADING"),
                  s(a.count(c.extend({}, t.query)).$promise)
                    .then(function (e) {
                      var n = e.count;
                      return o(a.query(c.extend({}, t.query, p)).$promise)
                        .then(function (e) {
                          return (
                            (t.userList = e),
                            (t.loadingState = e.length ? "LOADED" : "EMPTY"),
                            n
                          );
                        })
                        .catch(function () {
                          return (
                            delete p.sortBy,
                            delete p.sortOrder,
                            o(a.query(c.extend({}, t.query, p)).$promise)
                              .then(function (e) {
                                return (
                                  (t.canSortEntries = !1),
                                  (t.userList = e),
                                  (t.loadingState = e.length
                                    ? "LOADED"
                                    : "EMPTY"),
                                  u.addMessage({
                                    status: l.instant(
                                      "USERS_NO_SORTING_HEADER"
                                    ),
                                    message: l.instant("USERS_NO_SORTING_BODY"),
                                    exclusive: !0,
                                  }),
                                  n
                                );
                              })
                              .catch(function () {
                                t.loadingState = "EMPTY";
                              })
                          );
                        });
                    })
                    .catch(c.noop)
                    .finally(function () {
                      setTimeout(function () {
                        t.$apply();
                      }, 0);
                    })
                );
              }
              (t.searchConfig = c.copy(r)),
                (t.blocked = !0),
                (t.onSearchChange = p),
                (t.canSortEntries = !0),
                (t.query = t.pages = null),
                (t.onSortInitialized = function (e) {
                  (d = e), (t.blocked = !1);
                }),
                (t.onSortChanged = function (t) {
                  (d = t), p();
                }),
                (t.$root.showBreadcrumbs = !0),
                i.titleSet(l.instant("USERS_USERS")),
                i.breadcrumbsClear(),
                i.breadcrumbsAdd({
                  label: l.instant("USERS_USERS"),
                  href: "#/users/",
                });
            },
          ];
        t.exports = [
          "$routeProvider",
          function (t) {
            t.when("/users", {
              template: a,
              controller: l,
              authentication: "required",
              reloadOnSearch: !1,
            });
          },
        ];
      },
      20929: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri(
                "engine://engine/:engine/group/:groupId/members/:userId"
              ),
              { groupId: "@groupId", userId: "@userId" },
              { create: { method: "PUT" } }
            );
          },
        ];
      },
      54405: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri("engine://engine/:engine/group/:groupId/:action"),
              { groupId: "@id" },
              {
                createGroup: { method: "POST", params: { groupId: "create" } },
                update: { method: "PUT" },
                OPTIONS: { method: "OPTIONS", params: {} },
                count: { method: "GET", params: { groupId: "count" } },
              }
            );
          },
        ];
      },
      41281: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri("admin://setup/:engine/user/:action"),
              { action: "@action" },
              { create: { method: "POST", params: { action: "create" } } }
            );
          },
        ];
      },
      92149: function (t, e, n) {
        "use strict";
        var a = n(43909),
          r = n(62331),
          i = n(54405),
          o = n(20929),
          s = n(41281),
          c = n(86183),
          l = n(22204),
          u = a.module("admin.resources", []);
        u.factory("UserResource", r),
          u.factory("GroupResource", i),
          u.factory("GroupMembershipResource", o),
          u.factory("InitialUserResource", s),
          u.factory("MetricsResource", c),
          u.factory("TenantResource", l),
          (t.exports = u);
      },
      86183: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri("engine://engine/:engine/metrics/:name/:action"),
              { name: "@name", action: "@action" },
              { sum: { method: "GET", params: { action: "sum" } } }
            );
          },
        ];
      },
      22204: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri("engine://engine/:engine/tenant/:tenantId/:action"),
              { tenantId: "@id" },
              {
                createTenant: {
                  method: "POST",
                  params: { tenantId: "create" },
                },
                update: { method: "PUT" },
                OPTIONS: { method: "OPTIONS", params: {} },
                count: { method: "GET", params: { tenantId: "count" } },
              }
            );
          },
        ];
      },
      62331: function (t) {
        "use strict";
        t.exports = [
          "$resource",
          "Uri",
          function (t, e) {
            return t(
              e.appUri("engine://engine/:engine/user/:userId/:action"),
              { userId: "@id" },
              {
                profile: { method: "GET", params: { action: "profile" } },
                updateProfile: { method: "PUT", params: { action: "profile" } },
                updateCredentials: {
                  method: "PUT",
                  params: { action: "credentials" },
                },
                createUser: { method: "POST", params: { userId: "create" } },
                OPTIONS: { method: "OPTIONS", params: {} },
                count: { method: "GET", params: { userId: "count" } },
              }
            );
          },
        ];
      },
      30488: function (t, e, n) {
        "use strict";
        var a = n(43909),
          r = n(17550),
          i = n(99908),
          o = n(10505),
          s = n(93059),
          c = (t.exports = a.module("cam.admin.services", []));
        c.service("page", i),
          c.factory("routeUtil", r),
          c.factory("camAPI", o),
          c.factory("localConf", s);
      },
      26495: function (t, e, n) {
        "use strict";
        n(30225), n(84392), n(56806), n(92695), n(66893);
        var a = n(92219);
        t.exports = [
          "$location",
          "routeUtil",
          function (t, e) {
            return {
              scope: { divider: "@" },
              restrict: "A",
              template: a,
              link: function (n) {
                n.$on("page.breadcrumbs.changed", function (t, e) {
                  n.breadcrumbs = e;
                }),
                  (n.getHref = function (n) {
                    return e.redirectTo(n.href, t.search(), n.keepSearchParams);
                  }),
                  (n.selectChoice = function (e, n) {
                    e.preventDefault(), t.path(n.href.substr(1));
                  }),
                  (n.getActiveChoice = function (t) {
                    var e;
                    return (
                      t.forEach(function (t) {
                        t.active && (e = t.label);
                      }),
                      e || "Options"
                    );
                  }),
                  (n.sortedChoices = function (t) {
                    return t.sort(function (t, e) {
                      return t.active ? -1 : e.active ? 1 : 0;
                    });
                  });
              },
              controller: [
                "$scope",
                "page",
                function (t, e) {
                  t.breadcrumbs = e.breadcrumbsGet();
                },
              ],
            };
          },
        ];
      },
      96101: function (t, e, n) {
        "use strict";
        n(56806),
          (t.exports = function () {
            return {
              restrict: "A",
              require: "ngModel",
              link: function (t, e, n, a) {
                var r =
                  /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/;
                a.$parsers.push(function (t) {
                  var e = r.test(t),
                    n = !e || !isNaN(new Date(t).getTime());
                  return (
                    a.$setValidity("datePattern", e),
                    a.$setValidity("dateValue", n),
                    t
                  );
                });
                a.$formatters.push(function (t) {
                  if (t) {
                    var n = !isNaN(new Date(t).getTime()),
                      i = r.test(t),
                      o = n && i;
                    return (
                      a.$setValidity("datePattern", i),
                      a.$setValidity("dateValue", n),
                      o ||
                        ((a.$pristine = !1),
                        (a.$dirty = !0),
                        e.addClass("ng-dirty")),
                      t
                    );
                  }
                });
              },
            };
          });
      },
      66372: function (t, e, n) {
        "use strict";
        var a = n(76624);
        t.exports = function () {
          return {
            restrict: "A",
            template: a,
            controller: "CamPaginationController as Pagination",
            scope: { total: "=", onPaginationChange: "&camPagination" },
          };
        };
      },
      28232: function (t, e, n) {
        "use strict";
        var a = n(70390);
        t.exports = function () {
          return {
            restrict: "A",
            transclude: !0,
            template: a,
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
      32640: function (t, e, n) {
        "use strict";
        var a = n(96468);
        t.exports = function () {
          return {
            restrict: "A",
            template: a,
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
      78693: function (t, e, n) {
        "use strict";
        var a = n(70367);
        t.exports = function () {
          return {
            restrict: "A",
            template: a,
            scope: { providers: "=camToolbar", vars: "=?" },
          };
        };
      },
      71679: function (t, e, n) {
        "use strict";
        n(84735), n(67559), n(56806), n(92695);
        var a = n(43909);
        function r(t, e, n, r, i) {
          var o = this;
          (this.searchId = t.searchId || "search"),
            (this.paginationId = t.paginationId || "page"),
            (this.searchWidgetUtils = n),
            (this.search = r),
            (this.lastSearchQueryString = null),
            (this.locationChange = !0),
            t.$on("$destroy", function () {
              (t.config.searches = null), r(o.paginationId, null);
            }),
            i(t, this, [
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
            (this.arrayTypes = a.isArray(this.arrayTypes)
              ? this.arrayTypes
              : []),
            (this.variableTypes = a.isArray(this.variableTypes)
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
          t.$watch(s, this.onPageChange.bind(this)),
            t.$on("$locationChangeSuccess", this.onLocationChange.bind(this)),
            t.$watch("config.searches", this.updateQuery.bind(this), !0),
            t.$watch("blocked", this.onBlockedChange.bind(this));
          var c = e.$on(
            "cam-common:cam-searchable:query-force-change",
            this.onForcedRefresh.bind(this)
          );
          t.$on("$destroy", function () {
            c();
          });
        }
        function i(t) {
          return (
            t &&
            t.map(function (t) {
              return (function (t) {
                var e = t.value && t.value.value,
                  n = t.type && t.type.value.value,
                  a = t.operator && t.operator.value.key,
                  r = t.name && t.name.value;
                return { value: e, type: n, operator: a, name: r };
              })(t);
            })
          );
        }
        (t.exports = [
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
          (r.prototype.onBlockedChange = function (t, e) {
            !t && e && this.query && this.executeQueries();
          }),
          (r.prototype.getSearchQueryString = function () {
            return this.search()[this.searchId + "Query"];
          }),
          (r.prototype.hasSearchQueryStringChanged = function () {
            var t = this.getSearchQueryString();
            return (
              t !== this.lastSearchQueryString &&
              (this.lastSearchQueryString || "[]" !== t)
            );
          }),
          (r.prototype.onPageChange = function (t, e) {
            var n = this.getCurrentPageFromSearch();
            t != e &&
              t !== n &&
              (this.search(this.paginationId, t && 1 != t ? t : null),
              this.hasSearchQueryStringChanged() || this.executeQueries());
          }),
          (r.prototype.onLocationChange = function () {
            var t = this.getCurrentPageFromSearch();
            +this.pages.current != +t &&
              ((this.pages.current = t),
              this.hasSearchQueryStringChanged()
                ? (this.locationChange = !0)
                : this.executeQueries());
          }),
          (r.prototype.getCurrentPageFromSearch = function () {
            return +this.search()[this.paginationId] || 1;
          }),
          (r.prototype.updateQuery = function (t, e) {
            this.areSearchesDifferent(t, e) &&
              ((this.query =
                (this.buildCustomQuery && this.buildCustomQuery(t)) ||
                this.createQuery(t)),
              this.locationChange || this.resetPage(),
              (this.lastSearchQueryString = this.getSearchQueryString()),
              this.executeQueries());
          }),
          (r.prototype.resetPage = function () {
            var t = this.search();
            (this.pages.current = 1),
              (t[this.paginationId] = 1),
              this.search.updateSilently(t, !0);
          }),
          (r.prototype.executeQueries = function () {
            this.query &&
              !this.blocked &&
              ((this.locationChange = !1),
              this.onSearchChange({
                query: a.copy(this.query),
                pages: a.copy(this.pages),
              }).then(
                function (t) {
                  this.pages.total = t;
                }.bind(this)
              ));
          }),
          (r.prototype.createQuery = function (t) {
            return this.searchWidgetUtils.createSearchQueryForSearchWidget(
              t,
              this.arrayTypes,
              this.variableTypes
            );
          }),
          (r.prototype.areSearchesDifferent = function (t, e) {
            var n = i(t),
              r = i(e);
            return !a.equals(n, r);
          });
      },
      49783: function (t) {
        "use strict";
        t.exports = [
          "$scope",
          "search",
          "paginationUtils",
          "exposeScopeProperties",
          function (t, e, n, a) {
            n.initializePaginationInController(t, e, function () {
              t.onPaginationChange({ pages: t.pages });
            }),
              a(t, this, ["total", "pages"]),
              t.onPaginationChange({ pages: t.pages });
          },
        ];
      },
      71995: function (t, e, n) {
        "use strict";
        n(82447), n(30225), n(84392), n(56806), n(92695);
        var a = n(43909);
        function r(t, e, n) {
          (this.providers = this.getProviders(n, t)),
            (this.selected = this.providers[0]),
            (this.search = e),
            this.initializeVars(t),
            t.$on("$locationChangeSuccess", this.onLocationChange.bind(this)),
            this.onLocationChange();
        }
        function i(t, e) {
          return (e.priority || 0) - (t.priority || 0);
        }
        (t.exports = ["$scope", "search", "Views", r]),
          (r.prototype.initializeVars = function (t) {
            (this.vars = t.vars || { read: ["tabsApi"] }),
              t.varsValues && a.extend(t, t.varsValues);
          }),
          (r.prototype.getProviders = function (t, e) {
            return t.getProviders(e.providerParams).sort(i);
          }),
          (r.prototype.onLocationChange = function () {
            var t = this.search();
            this.isTabSelectionChangedInUrl(t)
              ? (this.selected = this.providers.filter(function (e) {
                  return e.id === t.tab;
                })[0])
              : t.tab || (this.selected = this.providers[0]);
          }),
          (r.prototype.isTabSelectionChangedInUrl = function (t) {
            return (
              a.isString(t.tab) &&
              (!this.selected || t.tab !== this.selected.id)
            );
          }),
          (r.prototype.selectTab = function (t) {
            var e = this.search(),
              n = { tab: t.id };
            (this.selected = t), this.search.updateSilently(a.extend(e, n));
          }),
          (r.prototype.isSelected = function (t) {
            return this.selected === t;
          });
      },
      24621: function (t, e, n) {
        "use strict";
        function a() {
          (this._hovered = null), (this._listeners = []);
        }
        n(82447),
          n(84392),
          n(66893),
          (t.exports = a),
          (a.prototype.hoverTitle = function (t) {
            (this._hovered = t), this._fireListeners();
          }),
          (a.prototype.cleanHover = function () {
            (this._hovered = null), this._fireListeners();
          }),
          (a.prototype.addHoverListener = function (t, e) {
            var n = { title: t, listener: e };
            return (
              this._listeners.push(n),
              this._fireEntry(n),
              function () {
                this._listeners = this._listeners.filter(function (t) {
                  return t.listener !== e;
                });
              }.bind(this)
            );
          }),
          (a.prototype._fireListeners = function () {
            this._listeners.forEach(this._fireEntry.bind(this));
          }),
          (a.prototype._fireEntry = function (t) {
            t.listener(t.title === this._hovered);
          });
      },
      83128: function (t) {
        "use strict";
        t.exports = [
          "readFiles",
          function (t) {
            return {
              restrict: "A",
              scope: { onChange: "&camFile" },
              link: function (e, n) {
                n[0].addEventListener("change", function (a) {
                  e.$apply(function () {
                    t(n[0].files).then(function (t) {
                      e.onChange({ $event: a, files: t });
                    });
                  });
                });
              },
            };
          },
        ];
      },
      26994: function (t) {
        "use strict";
        t.exports = function () {
          return {
            restrict: "A",
            transclude: !0,
            scope: !0,
            controller: "HoverAreaController as HoverArea",
            link: function (t, e, n, a, r) {
              r(function (t) {
                e.empty(), e.append(t);
              });
            },
          };
        };
      },
      33939: function (t) {
        "use strict";
        t.exports = function () {
          return {
            restrict: "A",
            require: "^camHoverArea",
            link: function (t, e, n, a) {
              e.on("mouseenter", function () {
                t.$apply(function () {
                  a.hoverTitle(n.camHoverTrigger);
                });
              }),
                e.on("mouseleave", function () {
                  t.$apply(a.cleanHover.bind(a));
                });
            },
          };
        };
      },
      50001: function (t) {
        "use strict";
        t.exports = function () {
          return {
            restrict: "A",
            require: "^camHoverArea",
            link: function (t, e, n, a) {
              var r,
                i = n.hoverClass || "hovered";
              function o() {
                r && r();
              }
              n.$observe("camHoverableTitle", function (t) {
                o(),
                  (r = a.addHoverListener(t, function (t) {
                    t ? e.addClass(i) : e.removeClass(i);
                  }));
              }),
                e.on("$destroy", o);
            },
          };
        };
      },
      26142: function (t, e, n) {
        "use strict";
        var a = n(86368);
        t.exports = function () {
          return {
            replace: !1,
            restrict: "A",
            scope: { column: "@sortByProperty" },
            transclude: !0,
            require: "^^camSortableTableHeader",
            template: a,
            link: function (t, e, n, a) {
              (t.orderClass = function (t) {
                var e = a.getSorting();
                return (
                  "glyphicon-" +
                  { none: "minus", desc: "chevron-down", asc: "chevron-up" }[
                    (t = t || e.sortBy) === e.sortBy ? e.sortOrder : "none"
                  ]
                );
              }),
                (t.changeOrder = function (t) {
                  a.changeOrder(t);
                });
            },
          };
        };
      },
      88497: function (t) {
        "use strict";
        function e() {}
        t.exports = function () {
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
              function (t, n) {
                var a = t.sortingId,
                  r = { sortBy: t.sortBy, sortOrder: t.sortOrder },
                  i = t.onSortInitialized || e,
                  o = t.onSortChange || e,
                  s = n.get(a, r);
                i({ sorting: s }),
                  (this.changeOrder = function (t) {
                    (s.sortBy = t),
                      (s.sortOrder = "desc" === s.sortOrder ? "asc" : "desc"),
                      (function (t) {
                        n.set(a, t);
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
      68141: function (t, e, n) {
        "use strict";
        var a = n(13871);
        t.exports = function () {
          return {
            restrict: "A",
            template: a,
            controller: "ExternalTaskActivityLinkController as Link",
            scope: {
              activityId: "=externalTaskActivityLink",
              bpmnElements: "=",
              searchQueryType: "=?",
            },
          };
        };
      },
      24174: function (t, e, n) {
        "use strict";
        var a = n(68754);
        t.exports = function () {
          return {
            restrict: "A",
            template: a,
            transclude: !0,
            controller: "ExternalTaskErrorMessageLinkController as Link",
            scope: { taskId: "=externalTaskErrorMessageLink", historic: "=?" },
          };
        };
      },
      17685: function (t, e, n) {
        "use strict";
        var a = n(93293);
        t.exports = function () {
          return {
            restrict: "A",
            template: a,
            transclude: !0,
            controller: "ExternalTasksTabController as TasksTab",
            scope: { onLoad: "&externalTasksTab", processData: "=" },
          };
        };
      },
      76411: function (t, e, n) {
        "use strict";
        n(67559), n(85541), n(56806), n(92695);
        var a = n(43909);
        function r(t, e, n, a, r, i) {
          e(t, this, ["activityId", "bpmnElements", "searchQueryType"]),
            (this.search = n),
            (this.params = r),
            (this.path = a.path()),
            (this.searchWidgetUtils = i);
        }
        (t.exports = [
          "$scope",
          "exposeScopeProperties",
          "search",
          "$location",
          "params",
          "searchWidgetUtils",
          r,
        ]),
          (r.prototype.getLink = function () {
            var t = a.copy(this.search()),
              e = JSON.parse(t.searchQuery || "[]");
            return (
              this.searchQueryType
                ? (t.searchQuery = JSON.stringify(
                    this.searchWidgetUtils.replaceActivitiesInSearchQuery(
                      e,
                      this.searchQueryType,
                      [this.activityId]
                    )
                  ))
                : (t.activityIds = this.activityId),
              "#" + this.path + "?" + this.params(t)
            );
          }),
          (r.prototype.getActivityName = function () {
            var t = this.activityId;
            return this.bpmnElements[t] && this.bpmnElements[t].name
              ? this.bpmnElements[t].name
              : t;
          });
      },
      28252: function (t) {
        "use strict";
        function e(t, e, n) {
          n(t, this, ["taskId", "historic"]), (this.Uri = e);
        }
        (t.exports = ["$scope", "Uri", "exposeScopeProperties", e]),
          (e.prototype.getStacktraceUrl = function () {
            var t =
              "engine://engine/:engine/external-task/" +
              this.taskId +
              "/errorDetails";
            return (
              this.historic &&
                (t =
                  "engine://engine/:engine/history/external-task-log/" +
                  this.taskId +
                  "/error-details"),
              this.Uri.appUri(t)
            );
          });
      },
      69577: function (t, e, n) {
        "use strict";
        n(82447), n(84392);
        var a = n(43909);
        function r(t, e, n) {
          e(t, this, ["onLoad"]),
            t.$on("$destroy", function () {
              n("page", null);
            }),
            t.processData
              .newChild(t)
              .observe("filter", this.onFilterChanged.bind(this));
        }
        function i(t) {
          return t && t.activityIds && t.activityIds.length
            ? t.activityIds
            : null;
        }
        (t.exports = ["$scope", "exposeScopeProperties", "search", r]),
          (t.exports.ExternalTasksTabController = r),
          (r.prototype.onFilterChanged = function (t) {
            this.isFilterChanged(t) &&
              ((this.filter = t), this.pages && this.loadTasks());
          }),
          (r.prototype.isFilterChanged = function (t) {
            var e = i(this.filter),
              n = i(t);
            return !this.filter || !a.equals(e, n);
          }),
          (r.prototype.onPaginationChange = function (t) {
            (this.pages = t), this.filter && this.loadTasks();
          }),
          (r.prototype.loadTasks = function () {
            (this.loadingState = "LOADING"),
              this.onLoad({
                pages: a.copy(this.pages),
                activityIds: i(this.filter),
              }).then(
                function (t) {
                  (this.total = t.count),
                    t.list
                      ? (this.loadingState = "LOADED")
                      : (this.loadingState = "EMPTY");
                }.bind(this)
              );
          });
      },
      65526: function (t, e, n) {
        "use strict";
        var a = n(43909),
          r = n(33203),
          i = n(68141),
          o = n(17685),
          s = n(24174),
          c = n(76411),
          l = n(69577),
          u = n(28252),
          d = a.module("cam-common.external-tasks-common", []);
        d.factory("observeBpmnElements", r),
          d.directive("externalTaskActivityLink", i),
          d.directive("externalTasksTab", o),
          d.directive("externalTaskErrorMessageLink", s),
          d.controller("ExternalTaskActivityLinkController", c),
          d.controller("ExternalTasksTabController", l),
          d.controller("ExternalTaskErrorMessageLinkController", u),
          (t.exports = d);
      },
      33203: function (t) {
        "use strict";
        t.exports = function () {
          return function (t, e) {
            e.processData.newChild(t).observe("bpmnElements", function (t) {
              e.bpmnElements = t;
            });
          };
        };
      },
      91847: function (t, e, n) {
        "use strict";
        n(67559);
        var a = n(43909),
          r = n(52637),
          i = n(52041),
          o = n(63524),
          s = n(56076),
          c = n(95028),
          l = n(92075),
          u = n(69661),
          d = n(93872),
          p = n(57711),
          h = n(96270),
          f = n(43700),
          m = n(21280),
          g = n(34863),
          v = n(78693),
          b = n(66372),
          y = n(28232),
          E = n(32640),
          _ = n(26994),
          S = n(33939),
          T = n(50001),
          A = n(83128),
          I = n(88497),
          w = n(26142),
          C = n(24621),
          O = n(49783),
          x = n(71995),
          N = n(71679),
          R = n(92758),
          L = n(50947),
          U = n(51344),
          P = n(65526),
          D = a.module("cam-common", [P.name]);
        D.factory("isModuleAvailable", r),
          D.factory("exposeScopeProperties", i),
          D.factory("Loaders", o),
          D.factory("integrateActivityInstanceFilter", s),
          D.factory("params", c),
          D.factory("createListQueryFunction", l),
          D.factory("createIsSearchQueryChangedFunction", u),
          D.factory("readFiles", d),
          D.factory("upload", p),
          D.factory("getDeploymentUrl", h),
          D.factory("isFileUploadSupported", f),
          D.factory("get", m),
          D.factory("getPluginApiAttributes", function () {
            return g;
          }),
          D.directive("camToolbar", v),
          D.directive("camPagination", b),
          D.directive("camSearchableArea", y),
          D.directive("camTabs", E),
          D.directive("camHoverArea", _),
          D.directive("camHoverTrigger", S),
          D.directive("camHoverableTitle", T),
          D.directive("camFile", A),
          D.directive("camSortableTableHeader", I),
          D.directive("camSortableTableColumn", w),
          D.controller("HoverAreaController", C),
          D.controller("CamPaginationController", O),
          D.controller("CamTabsController", x),
          D.controller("CamPaginationSearchIntegrationController", N),
          D.value("routeUtil", R),
          D.value("paginationUtils", L),
          D.value("searchWidgetUtils", U),
          (t.exports = D);
      },
      69661: function (t) {
        "use strict";
        t.exports = [
          "search",
          function (t) {
            return function () {
              var e = null;
              return function () {
                var n = t().searchQuery;
                if (n !== e && (e || "[]" !== n)) return (e = n), !0;
              };
            };
          },
        ];
      },
      92075: function (t, e, n) {
        "use strict";
        var a = n(43909);
        t.exports = [
          "$q",
          function (t) {
            return function (e, n) {
              return function (r, i, o) {
                return e(r).then(function (e) {
                  var s = (i.current - 1) * i.size,
                    c = e.count,
                    l = a.extend(
                      {},
                      r,
                      { firstResult: s, maxResults: i.size },
                      o
                    );
                  return c > s ? t.all({ count: c, list: n(l) }) : e;
                });
              };
            };
          },
        ];
      },
      52041: function (t, e, n) {
        "use strict";
        n(84392),
          (t.exports = function () {
            return function (t, e, n) {
              var a = n.reduce(function (e, n) {
                return (
                  (e[n] = {
                    get: function () {
                      return t[n];
                    },
                    set: function (e) {
                      t[n] = e;
                    },
                  }),
                  e
                );
              }, {});
              Object.defineProperties(e, a);
            };
          });
      },
      96270: function (t, e, n) {
        "use strict";
        n(67559),
          n(56806),
          n(92695),
          (t.exports = [
            "$location",
            "routeUtil",
            function (t, e) {
              return function (n, a) {
                var r = {
                  deployment: n.id,
                  deploymentsQuery: JSON.stringify([
                    { type: "id", operator: "eq", value: n.id },
                  ]),
                };
                a && (r.resourceName = a.name);
                var i = t.search() || {};
                return (
                  i.deploymentsSortBy &&
                    (r.deploymentsSortBy = i.deploymentsSortBy),
                  i.deploymentsSortOrder &&
                    (r.deploymentsSortOrder = i.deploymentsSortOrder),
                  e.redirectTo("#/repository", r, [
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
      21280: function (t) {
        "use strict";
        t.exports = function () {
          return function (t, e, n) {
            for (var a, r = t, i = 0; i < e.length; i++) {
              if (((a = e[i]), !r || !r[a])) return n;
              r = r[a];
            }
            return r;
          };
        };
      },
      56076: function (t, e, n) {
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
        var a = n(43909);
        t.exports = [
          "search",
          "$location",
          "searchWidgetUtils",
          function (t, e, n) {
            return function (r, i, o) {
              var s = r.processData,
                c = r.processInstance;
              function l(e) {
                var r = t(),
                  i = n.getActivityIdsFromUrlParams("activityInstanceIdIn", r),
                  o = r.activityIds ? r.activityIds.split(",") : [],
                  s = (function (t, e, n) {
                    return (
                      t &&
                      a.equals(e, t.activityIds) &&
                      !a.equals(n, t.activityInstanceIds)
                    );
                  })(e, o, i);
                return (
                  s && (o = []),
                  {
                    activityIds: o,
                    activityInstanceIds: i,
                    page: parseInt(r.page, 10) || void 0,
                    replace: s || !e,
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
                  function (e, i, c) {
                    var l,
                      u = e.activityIds || [],
                      d = e.activityInstanceIds || [],
                      p = parseInt(e.page, 10) || null,
                      h = e.scrollToBpmnElement,
                      f = e !== r.filter,
                      m = e.replace;
                    if (
                      (delete e.replace,
                      a.forEach(d, function (t) {
                        var e = i[t] || {},
                          n = e.activityId || e.targetActivityId;
                        -1 === u.indexOf(n) && n && u.push(n);
                      }),
                      a.forEach(u, function (t) {
                        var e = c[t],
                          n = !1,
                          a = [];
                        if (e) {
                          for (var r, i = 0; (r = e[i]); i++) {
                            if (-1 !== d.indexOf(r.id)) {
                              n = !0;
                              break;
                            }
                            a.push(r.id);
                          }
                          n || (d = d.concat(a));
                        }
                      }),
                      o.shouldRemoveActivityIds)
                    )
                      for (var g = 0; g < u.length; g++)
                        c[u[g]] || (u.splice(g, 1), g--);
                    for (g = 0; g < d.length; g++)
                      i[d[g]] || (d.splice(g, 1), g--);
                    if (u.length > 0) {
                      var v = u[u.length - 1];
                      v !== h && (h = v);
                    }
                    (l = {
                      activityIds: u,
                      activityInstanceIds: d,
                      scrollToBpmnElement: h,
                      page: p,
                    }),
                      a.equals(l, r.filter) ||
                        ((r.filter = l), s.set("filter", r.filter));
                    f &&
                      r.filter &&
                      (function (e, i) {
                        var o = a.isArray(e.activityInstanceIds)
                            ? e.activityInstanceIds
                            : [],
                          s = a.isArray(e.activityIds) ? e.activityIds : [],
                          c = t(),
                          l = JSON.parse(c.searchQuery || "[]");
                        l =
                          c.searchQuery || o.length || s.length
                            ? n.replaceActivitiesInSearchQuery(
                                l,
                                "activityInstanceIdIn",
                                o
                              )
                            : null;
                        t.updateSilently(
                          {
                            searchQuery: l ? JSON.stringify(l) : null,
                            activityIds: s.length ? s.join(",") : null,
                          },
                          i
                        ),
                          (r.filter = e);
                      })(r.filter, m);
                  }
                ),
                r.$on("$locationChangeSuccess", function () {
                  var t = l(r.filter);
                  e.path().indexOf(c.id) > -1 &&
                    (n.shouldUpdateFilter(t, r.filter, [
                      "activityIds",
                      "activityInstanceIds",
                      "page",
                    ]) && s.set("filter", t),
                    i(r.processInstanceTabs));
                });
            };
          },
        ];
      },
      43700: function (t) {
        "use strict";
        t.exports = [
          "$window",
          function (t) {
            return function () {
              var e = t.FileReader;
              return (
                "function" == typeof e &&
                "function" == typeof e.prototype.readAsText
              );
            };
          },
        ];
      },
      52637: function (t, e, n) {
        "use strict";
        var a = n(43909);
        t.exports = function () {
          return function (t) {
            try {
              return !!a.module(t);
            } catch (t) {
              return !1;
            }
          };
        };
      },
      63524: function (t, e, n) {
        "use strict";
        n(82447),
          n(84392),
          (t.exports = [
            "$rootScope",
            function (t) {
              var e = [],
                n = "LoaderService:active-loaders-changed";
              return {
                startLoading: function () {
                  var t = function t() {
                    (e = e.filter(function (e) {
                      return e !== t;
                    })),
                      a();
                  };
                  return e.push(t), a(), t;
                },
                addStatusListener: function (t, e) {
                  return (
                    e(r()),
                    t.$on(n, function () {
                      var t = r();
                      e(t);
                    })
                  );
                },
              };
              function a() {
                t.$broadcast(n);
              }
              function r() {
                return 0 === e.length ? "LOADED" : "LOADING";
              }
            },
          ]);
      },
      95028: function (t, e, n) {
        "use strict";
        n(85541),
          n(84392),
          (t.exports = function () {
            return function (t) {
              return Object.keys(t).reduce(function (e, n) {
                var a = t[n],
                  r = n + "=" + encodeURIComponent(a);
                return e.length ? e + "&" + r : r;
              }, "");
            };
          });
      },
      93872: function (t, e, n) {
        "use strict";
        n(84735),
          (t.exports = [
            "$q",
            "$window",
            function (t, e) {
              return function (e) {
                return t.all(Array.prototype.map.call(e, n));
              };
              function n(n) {
                var a = t.defer(),
                  r = new e.FileReader();
                return (
                  (r.onload = function (t) {
                    a.resolve({ file: n, content: t.target.result });
                  }),
                  (r.onerror = function (t) {
                    a.reject(t);
                  }),
                  r.readAsText(n),
                  a.promise
                );
              }
            },
          ]);
      },
      57711: function (t, e, n) {
        "use strict";
        n(7089), n(45477), n(84735), n(67559), n(85541), n(84392), n(95234);
        var a = n(43909);
        t.exports = [
          "$window",
          "$q",
          "$rootScope",
          "$cookies",
          "$http",
          function (t, e, n, r, i) {
            return function (t, r, o) {
              var s = e.defer();
              a.isArray(r) || (r = [r]), (o = o || {});
              var c = r.map(function (t, e) {
                return (
                  'Content-Disposition: form-data; name="data' +
                  e +
                  '"; filename="' +
                  t.file.name +
                  '"\r\nContent-Type: text/xml\r\n\r\n' +
                  t.content +
                  "\r\n"
                );
              });
              c = c.concat(
                Object.keys(o).map(function (t) {
                  return (
                    'Content-Disposition: form-data; name="' +
                    t +
                    '"\r\n\r\n' +
                    o[t] +
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
                i
                  .post(t, u, {
                    transformRequest: a.identity,
                    headers: {
                      "Content-Type": "multipart/form-data; boundary=" + l,
                    },
                  })
                  .then(function (t) {
                    s.resolve(t.data);
                  })
                  .catch(function (t) {
                    401 === t.status &&
                      (n.$broadcast("authentication.changed", null),
                      (n.authentication = null),
                      n.$broadcast("authentication.login.required")),
                      s.reject(t);
                  }),
                s.promise
              );
            };
          },
        ];
      },
      10505: function (t, e, n) {
        "use strict";
        var a = n(59721);
        t.exports = [
          "Uri",
          "camAPIHttpClient",
          function (t, e) {
            return new a.Client({
              HttpClient: e,
              apiUri: t.appUri("engine://"),
              engine: t.appUri(":engine"),
            });
          },
        ];
      },
      65015: function (t, e, n) {
        "use strict";
        n(34820), n(67559), n(85541), n(76474);
        var a = n(30336),
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
        t.exports = function (t, e) {
          return [
            function () {
              var n = window.localStorage,
                i = JSON.parse(n.getItem("camunda-web") || "{}");
              (this.get = function (t, e) {
                return void 0 !== i[t] ? i[t] : e;
              }),
                (this.set = function (t, e) {
                  (i[t] = e), n.setItem("camunda-web", JSON.stringify(i));
                }),
                (this.clearTranslationData = function () {
                  for (var t in i)
                    t.includes("_locales_data_") &&
                      !t.includes(window.bust) &&
                      delete i[t];
                  window.localStorage.setItem("camunda-web", JSON.stringify(i));
                }),
                (this.getDateFormat = function (e) {
                  return (t.dateFormat || r.dateFormat)[e] || r.dateFormat[e];
                }),
                (this.getFallbackLocale = function () {
                  return t.locales && t.locales.fallbackLocale
                    ? t.locales.fallbackLocale
                    : r.locales.fallbackLocale;
                }),
                (this.getAvailableLocales = function () {
                  return t.locales && t.locales.availableLocales
                    ? t.locales.availableLocales
                    : r.locales.availableLocales;
                }),
                (this.getDateLocales = function () {
                  return t.camDateLocales;
                }),
                (this.getAppVendor = function () {
                  return t.app && t.app.vendor ? t.app.vendor : "Camunda";
                }),
                (this.getAppName = function () {
                  return t.app && t.app.name ? t.app.name : e;
                }),
                (this.getSkipCustomListeners = function () {
                  return a.extend(
                    {},
                    r.skipCustomListeners,
                    t.skipCustomListeners
                  );
                }),
                (this.getSkipIoMappings = function () {
                  return a.extend({}, r.skipIoMappings, t.skipIoMappings);
                }),
                (this.getCascade = function () {
                  return a.extend({}, r.cascade, t.cascade);
                }),
                (this.getRuntimeActivityInstanceMetrics = function () {
                  var e = "runtimeActivityInstanceMetrics";
                  return a.extend({}, r[e], t[e]).display;
                }),
                (this.getActivityInstancePeriod = function () {
                  var e = "historicActivityInstanceMetrics";
                  return t[e] && t[e].period ? t[e].period : r[e].period;
                }),
                (this.getActivityInstanceAdjustable = function () {
                  var e = "historicActivityInstanceMetrics";
                  return t[e] && void 0 !== t[e].adjustablePeriod
                    ? t[e].adjustablePeriod
                    : r[e].adjustablePeriod;
                }),
                (this.getBatchOperationMode = function () {
                  var e = "batchOperation";
                  return (t[e] && t[e].mode) || r[e].mode;
                }),
                (this.getBatchOperationAutoLoadEnded = function () {
                  var e = "batchOperation";
                  return t[e] && void 0 !== t[e].autoLoadEnded
                    ? t[e].autoLoadEnded
                    : r[e].autoLoadEnded;
                }),
                (this.getBpmnJs = function () {
                  return t.bpmnJs;
                }),
                (this.getHistoricProcessInstancesSearch = function () {
                  return (t.defaultFilter || {})
                    .historicProcessDefinitionInstancesSearch;
                }),
                (this.getCsrfCookieName = function () {
                  var e = "csrfCookieName";
                  return t[e] || r[e];
                }),
                (this.getDisableWelcomeMessage = function () {
                  var e = "disableWelcomeMessage";
                  return t[e] || r[e];
                }),
                (this.getUserOperationLogAnnotationLength = function () {
                  var e = "userOperationLogAnnotationLength";
                  return t[e] || r[e];
                }),
                (this.getPreviewHtml = function () {
                  var e = "previewHtml";
                  return void 0 !== t[e] ? t[e] : r[e];
                }),
                (this.getAssignProcessInstanceIdToTaskComment = function () {
                  var e = "assignProcessInstanceIdToTaskComment";
                  return void 0 !== t[e] ? t[e] : r[e];
                }),
                (this.$get = function () {
                  return this;
                });
            },
          ];
        };
      },
      86244: function (t, e, n) {
        "use strict";
        n(45477), n(85541);
        var a = n(40271),
          r = n(43909);
        t.exports = function (t, e, n) {
          t.factory("sanitizeMissingTranslationKey", [
            "$translateSanitization",
            function (t) {
              return function (e) {
                return t.sanitize(e, "text", "escape");
              };
            },
          ]),
            t.factory("localeLoader", [
              "$q",
              "$http",
              "Notifications",
              "configuration",
              function (t, e, n, a) {
                return function (i) {
                  if (!i || !r.isString(i.prefix) || !r.isString(i.suffix))
                    throw new Error(
                      "Couldn't load static files, no prefix or suffix specified!"
                    );
                  var o = t.defer(),
                    s = i.prefix + "_locales_data_" + i.key + "_" + window.bust,
                    c = a.get(s);
                  return (
                    c &&
                      ((c = JSON.parse(c)),
                      "function" == typeof i.callback &&
                        i.callback(null, c, i.key),
                      o.resolve(c.labels)),
                    e(
                      r.extend(
                        {
                          url: [i.prefix, i.key, i.suffix].join(""),
                          method: "GET",
                          params: { bust: "7.23.0-alpha4" },
                        },
                        i.$http
                      )
                    )
                      .then(function (t) {
                        a.clearTranslationData(),
                          a.set(s, JSON.stringify(t.data)),
                          c ||
                            ("function" == typeof i.callback &&
                              i.callback(null, t.data, i.key),
                            o.resolve(t.data.labels));
                      })
                      .catch(function (t) {
                        n.addError({
                          status: "Error in localization configuration",
                          message:
                            '"' +
                            i.key +
                            '" is declared as available locale, but no such locale file exists.',
                        }),
                          c ||
                            ("function" == typeof i.callback &&
                              i.callback(t.data, null, i.key),
                            o.reject(i.key));
                      }),
                    o.promise
                  );
                };
              },
            ]),
            t.config([
              "$translateProvider",
              "configurationProvider",
              function (t, i) {
                t.useMissingTranslationHandler("sanitizeMissingTranslationKey");
                var o = i.getAvailableLocales(),
                  s = i.getFallbackLocale();
                t.useLoader("localeLoader", {
                  prefix: e + "/app/" + n + "/locales/",
                  suffix: ".json",
                  callback: function (t, e, n) {
                    if (!t && e && e.dateLocales) {
                      var r = n || s;
                      a.locales().indexOf(r) > -1
                        ? a.updateLocale(r, e.dateLocales)
                        : a.defineLocale(r, e.dateLocales);
                    }
                  },
                }),
                  t.registerAvailableLanguageKeys(o),
                  t.fallbackLanguage(s),
                  t.useSanitizeValueStrategy("escapeParameters"),
                  t.determinePreferredLanguage(function () {
                    var t = window.navigator,
                      e = (
                        (r.isArray(t.languages)
                          ? t.languages[0]
                          : t.language ||
                            t.browserLanguage ||
                            t.systemLanguage ||
                            t.userLanguage) || ""
                      ).split("-"),
                      n = o.indexOf(e[0].toLowerCase());
                    return n > -1 ? o[n] : s;
                  });
              },
            ]);
        };
      },
      99908: function (t, e, n) {
        "use strict";
        n(7089), n(45477), n(72595), n(67559), n(84392), n(66893);
        var a = n(43909);
        t.exports = [
          "$rootScope",
          "$location",
          "camAPI",
          function (t, e, n) {
            var r = { title: "Camunda", breadcrumbs: [] },
              i = a.element(document.querySelector("head title")),
              o = i[0].textContent || "Camunda Cockpit";
            function s(e) {
              e && e.name
                ? n.resource("user").profile(e.name, function (e, n) {
                    if (e) throw ((t.userFullName = null), e);
                    t.userFullName = n.firstName + " " + n.lastName;
                  })
                : (t.userFullName = null);
            }
            return (
              t.$on("page.title.changed", function () {
                i.text([o, r.title].join(" | "));
              }),
              (t.isActivePage = function (t) {
                return 0 === e.path().indexOf("/" + t) ? "active" : "";
              }),
              t.$on("authentication.changed", function (t, e) {
                s(e);
              }),
              s(t.authentication),
              {
                titleSet: function (e) {
                  return (
                    (r.title = e),
                    t.$broadcast("page.title.changed", r.title),
                    this
                  );
                },
                titleGet: function () {
                  return r.title;
                },
                breadcrumbsAdd: function (e) {
                  if (a.isArray(e)) return a.forEach(e, this.breadcrumbsAdd);
                  a.isFunction(e) && (e = { callback: e });
                  return (
                    (e.label = e.label || "…"),
                    r.breadcrumbs.push(e),
                    t.$broadcast("page.breadcrumbs.changed", r.breadcrumbs),
                    this
                  );
                },
                breadcrumbsInsertAt: function (e, n) {
                  return (
                    (r.breadcrumbs = r.breadcrumbs
                      .slice(0, e)
                      .concat(a.isArray(n) ? n : [n])
                      .concat(r.breadcrumbs.slice(e + 1))),
                    t.$broadcast("page.breadcrumbs.changed", r.breadcrumbs),
                    this
                  );
                },
                breadcrumbsGet: function (t) {
                  return t
                    ? ("last" === t && (t = r.length - 1), r.breadcrumbs[t])
                    : r.breadcrumbs;
                },
                breadcrumbsClear: function () {
                  return (
                    (r.breadcrumbs = []),
                    t.$broadcast("page.breadcrumbs.changed", r.breadcrumbs),
                    this
                  );
                },
              }
            );
          },
        ];
      },
      96079: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function r() {
          r = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            i = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            l = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function d(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            d({}, "");
          } catch (t) {
            d = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function p(t, e, n, a) {
            var r = e && e.prototype instanceof y ? e : y,
              i = Object.create(r.prototype),
              s = new L(a || []);
            return o(i, "_invoke", { value: O(t, n, s) }), i;
          }
          function h(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = p;
          var f = "suspendedStart",
            m = "suspendedYield",
            g = "executing",
            v = "completed",
            b = {};
          function y() {}
          function E() {}
          function _() {}
          var S = {};
          d(S, c, function () {
            return this;
          });
          var T = Object.getPrototypeOf,
            A = T && T(T(U([])));
          A && A !== n && i.call(A, c) && (S = A);
          var I = (_.prototype = y.prototype = Object.create(S));
          function w(t) {
            ["next", "throw", "return"].forEach(function (e) {
              d(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function C(t, e) {
            function n(r, o, s, c) {
              var l = h(t[r], t, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  d = u.value;
                return d && "object" == a(d) && i.call(d, "__await")
                  ? e.resolve(d.__await).then(
                      function (t) {
                        n("next", t, s, c);
                      },
                      function (t) {
                        n("throw", t, s, c);
                      }
                    )
                  : e.resolve(d).then(
                      function (t) {
                        (u.value = t), s(u);
                      },
                      function (t) {
                        return n("throw", t, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function (t, a) {
                function i() {
                  return new e(function (e, r) {
                    n(t, a, e, r);
                  });
                }
                return (r = r ? r.then(i, i) : i());
              },
            });
          }
          function O(e, n, a) {
            var r = f;
            return function (i, o) {
              if (r === g) throw new Error("Generator is already running");
              if (r === v) {
                if ("throw" === i) throw o;
                return { value: t, done: !0 };
              }
              for (a.method = i, a.arg = o; ; ) {
                var s = a.delegate;
                if (s) {
                  var c = x(s, a);
                  if (c) {
                    if (c === b) continue;
                    return c;
                  }
                }
                if ("next" === a.method) a.sent = a._sent = a.arg;
                else if ("throw" === a.method) {
                  if (r === f) throw ((r = v), a.arg);
                  a.dispatchException(a.arg);
                } else "return" === a.method && a.abrupt("return", a.arg);
                r = g;
                var l = h(e, n, a);
                if ("normal" === l.type) {
                  if (((r = a.done ? v : m), l.arg === b)) continue;
                  return { value: l.arg, done: a.done };
                }
                "throw" === l.type &&
                  ((r = v), (a.method = "throw"), (a.arg = l.arg));
              }
            };
          }
          function x(e, n) {
            var a = n.method,
              r = e.iterator[a];
            if (r === t)
              return (
                (n.delegate = null),
                ("throw" === a &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  x(e, n),
                  "throw" === n.method)) ||
                  ("return" !== a &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + a + "' method"
                    )))),
                b
              );
            var i = h(r, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), b
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((n[e.resultName] = o.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  b)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                b);
          }
          function N(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function R(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function L(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(N, this),
              this.reset(!0);
          }
          function U(e) {
            if (e || "" === e) {
              var n = e[c];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var r = -1,
                  o = function n() {
                    for (; ++r < e.length; )
                      if (i.call(e, r))
                        return (n.value = e[r]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(a(e) + " is not iterable");
          }
          return (
            (E.prototype = _),
            o(I, "constructor", { value: _, configurable: !0 }),
            o(_, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(_, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === E || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, _)
                  : ((t.__proto__ = _), d(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            w(C.prototype),
            d(C.prototype, l, function () {
              return this;
            }),
            (e.AsyncIterator = C),
            (e.async = function (t, n, a, r, i) {
              void 0 === i && (i = Promise);
              var o = new C(p(t, n, a, r), i);
              return e.isGeneratorFunction(n)
                ? o
                : o.next().then(function (t) {
                    return t.done ? t.value : o.next();
                  });
            }),
            w(I),
            d(I, u, "Generator"),
            d(I, c, function () {
              return this;
            }),
            d(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var a in e) n.push(a);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var a = n.pop();
                    if (a in e) return (t.value = a), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = U),
            (L.prototype = {
              constructor: L,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(R),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      i.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function a(a, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = e),
                    (n.next = a),
                    r && ((n.method = "next"), (n.arg = t)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return a("end");
                  if (o.tryLoc <= this.prev) {
                    var c = i.call(o, "catchLoc"),
                      l = i.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var a = this.tryEntries[n];
                  if (
                    a.tryLoc <= this.prev &&
                    i.call(a, "finallyLoc") &&
                    this.prev < a.finallyLoc
                  ) {
                    var r = a;
                    break;
                  }
                }
                r &&
                  ("break" === t || "continue" === t) &&
                  r.tryLoc <= e &&
                  e <= r.finallyLoc &&
                  (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = t),
                  (o.arg = e),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), b)
                    : this.complete(o)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  b
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), R(n), b;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var a = n.completion;
                    if ("throw" === a.type) {
                      var r = a.arg;
                      R(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, n, a) {
                return (
                  (this.delegate = {
                    iterator: U(e),
                    resultName: n,
                    nextLoc: a,
                  }),
                  "next" === this.method && (this.arg = t),
                  b
                );
              },
            }),
            e
          );
        }
        function i(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e &&
              (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        function o(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? i(Object(n), !0).forEach(function (e) {
                  s(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : i(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function s(t, e, n) {
          var r;
          return (
            (r = (function (t, e) {
              if ("object" != a(t) || !t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(t, e || "default");
                if ("object" != a(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == a(r) ? r : String(r)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function c(t, e, n, a, r, i, o) {
          try {
            var s = t[i](o),
              c = s.value;
          } catch (t) {
            return void n(t);
          }
          s.done ? e(c) : Promise.resolve(c).then(a, r);
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
          d = n(75184);
        t.exports = (function () {
          var t,
            e =
              ((t = r().mark(function t(e, n, a) {
                return r().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), d(e, a);
                      case 2:
                        t.sent.forEach(function (t) {
                          var r = Math.random().toString(36).substring(2);
                          (t.overlay = [
                            "control",
                            "$scope",
                            function (n, r) {
                              var i = n.getViewer;
                              t.render(
                                i(),
                                l(u(t.pluginPoint, r, a), e.csrfCookieName),
                                r
                              ),
                                r.$on("$destroy", function () {
                                  t.unmount && t.unmount();
                                });
                            },
                          ]),
                            n.directive("pluginBridge" + r, [
                              function () {
                                return {
                                  link: function (n, r) {
                                    var i = document.createElement("div");
                                    t.render(
                                      i,
                                      l(
                                        u(t.pluginPoint, n, a),
                                        e.csrfCookieName,
                                        a
                                      ),
                                      n
                                    ),
                                      r[0].appendChild(i),
                                      n.$on("$destroy", function () {
                                        t.unmount && t.unmount();
                                      });
                                  },
                                };
                              },
                            ]),
                            n.config([
                              "ViewsProvider",
                              function (e) {
                                e.registerDefaultView(
                                  t.pluginPoint,
                                  o(
                                    o(o({}, t.properties), t),
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
                            t.pluginPoint === "".concat(a, ".route") &&
                              n.config([
                                "$routeProvider",
                                function (e) {
                                  e.when(t.properties.path, {
                                    template: "<div plugin-bridge".concat(
                                      r,
                                      " />"
                                    ),
                                    controller: [
                                      "$scope",
                                      function (t) {
                                        t.$root.showBreadcrumbs = !1;
                                      },
                                    ],
                                    authentication: "required",
                                  });
                                },
                              ]);
                        });
                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })),
              function () {
                var e = this,
                  n = arguments;
                return new Promise(function (a, r) {
                  var i = t.apply(e, n);
                  function o(t) {
                    c(i, a, r, o, s, "next", t);
                  }
                  function s(t) {
                    c(i, a, r, o, s, "throw", t);
                  }
                  o(void 0);
                });
              });
          return function (t, n, a) {
            return e.apply(this, arguments);
          };
        })();
      },
      34863: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function r(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e &&
              (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        function i(t, e, n) {
          var r;
          return (
            (r = (function (t, e) {
              if ("object" != a(t) || !t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(t, e || "default");
                if ("object" != a(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === e ? String : Number)(t);
            })(e, "string")),
            (e = "symbol" == a(r) ? r : String(r)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function o(t) {
          return document.cookie.replace(
            new RegExp("(?:(?:^|.*;*)".concat(t, "*=*([^;]*).*$)|^.*$")),
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
          (t.exports = function (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "XSRF-TOKEN",
              n = arguments.length > 2 ? arguments[2] : void 0,
              a = document.querySelector("base"),
              s = new RegExp(".*".concat(n, "/([^/]*).*")),
              c = window.location.href.replace(s, "$1");
            return (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2
                  ? r(Object(n), !0).forEach(function (e) {
                      i(t, e, n[e]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      t,
                      Object.getOwnPropertyDescriptors(n)
                    )
                  : r(Object(n)).forEach(function (e) {
                      Object.defineProperty(
                        t,
                        e,
                        Object.getOwnPropertyDescriptor(n, e)
                      );
                    });
              }
              return t;
            })(
              {
                api: {
                  adminApi: a.getAttribute("admin-api").slice(0, -1),
                  baseApi: a.getAttribute("engine-api").slice(0, -1),
                  cockpitApi: a.getAttribute("cockpit-api").slice(0, -1),
                  tasklistApi: a.getAttribute("tasklist-api").slice(0, -1),
                  engineApi: a.getAttribute("engine-api") + "engine/" + c,
                  engine: c,
                  CSRFToken: o(e),
                },
              },
              t
            );
          });
      },
      83178: function (t) {
        "use strict";
        t.exports = function (t, e) {
          var n = {};
          switch (t) {
            case "cockpit.processDefinition.runtime.tab":
            case "cockpit.processDefinition.runtime.action":
            case "cockpit.processDefinition.history.action":
            case "cockpit.processDefinition.history.tab":
              n.processDefinitionId = e.processDefinition.id;
              break;
            case "cockpit.processInstance.runtime.tab":
            case "cockpit.processInstance.runtime.action":
            case "cockpit.processInstance.history.tab":
            case "cockpit.processInstance.history.action":
              n.processInstanceId = e.processInstance.id;
              break;
            case "cockpit.processDefinition.diagram.plugin":
            case "cockpit.processDefinition.history.diagram.plugin":
              n.processDefinitionId = e.key;
              break;
            case "cockpit.processInstance.diagram.plugin":
            case "cockpit.processInstance.history.diagram.plugin":
              n.processInstanceId = window.location.hash.split("/")[2];
              break;
            case "cockpit.jobDefinition.action":
              n.jobDefinitionId = e.jobDefinition.id;
              break;
            case "cockpit.decisionDefinition.tab":
            case "cockpit.decisionDefinition.action":
              n.decisionDefinitionId = e.decisionDefinition.id;
              break;
            case "cockpit.decisionInstance.tab":
            case "cockpit.decisionInstance.action":
              n.decisionInstanceId = e.decisionInstance.id;
              break;
            case "cockpit.caseDefinition.tab":
            case "cockpit.caseDefinition.action":
              n.caseDefinitionId = e.definition.id;
              break;
            case "cockpit.caseInstance.tab":
            case "cockpit.caseInstance.action":
              n.caseInstanceId = e.instance.id;
              break;
            case "cockpit.repository.resource.action":
              (n.deploymentId = e.deployment.id),
                (n.resourceId = e.resource.id);
              break;
            case "cockpit.incident.action":
              n.incidentId = e.incident.id;
              break;
            case "cockpit.drd.definition.tab":
              n.drdDefinitionId = e.tabsApi.getDefinition().id;
              break;
            case "cockpit.drd.instance.tab":
              n.rootDecisionInstanceId = e.tabsApi.processParams(
                {}
              ).rootDecisionInstanceId;
              break;
            case "cockpit.processDefinition.diagram.action":
            case "cockpit.processDefinition.history.diagram.action":
              (n.viewer = e.viewer),
                (n.processDefinitionId = window.location.hash.split("/")[2]);
              break;
            case "cockpit.processes.action":
              n.processDefinitionId = e.pd.id;
              break;
            case "cockpit.repository.deployment.action":
              n.deploymentId = e.deployment.id;
              break;
            default:
              n = {};
          }
          return n;
        };
      },
      55939: function (t, e, n) {
        "use strict";
        t.exports = function (t, e, a) {
          switch (a) {
            case "cockpit":
              return n(83178)(t, e);
            case "tasklist":
              return n(56246)(t, e);
            default:
              return {};
          }
        };
      },
      56246: function (t) {
        "use strict";
        t.exports = function (t, e) {
          var n = {};
          switch (t) {
            case "tasklist.task.detail":
            case "tasklist.card":
              n.taskId = e.task.id;
              break;
            default:
              n = {};
          }
          return n;
        };
      },
      75184: function (t, e, n) {
        "use strict";
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function r() {
          r = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            i = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            l = s.asyncIterator || "@@asyncIterator",
            u = s.toStringTag || "@@toStringTag";
          function d(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            d({}, "");
          } catch (t) {
            d = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function p(t, e, n, a) {
            var r = e && e.prototype instanceof y ? e : y,
              i = Object.create(r.prototype),
              s = new L(a || []);
            return o(i, "_invoke", { value: O(t, n, s) }), i;
          }
          function h(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = p;
          var f = "suspendedStart",
            m = "suspendedYield",
            g = "executing",
            v = "completed",
            b = {};
          function y() {}
          function E() {}
          function _() {}
          var S = {};
          d(S, c, function () {
            return this;
          });
          var T = Object.getPrototypeOf,
            A = T && T(T(U([])));
          A && A !== n && i.call(A, c) && (S = A);
          var I = (_.prototype = y.prototype = Object.create(S));
          function w(t) {
            ["next", "throw", "return"].forEach(function (e) {
              d(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function C(t, e) {
            function n(r, o, s, c) {
              var l = h(t[r], t, o);
              if ("throw" !== l.type) {
                var u = l.arg,
                  d = u.value;
                return d && "object" == a(d) && i.call(d, "__await")
                  ? e.resolve(d.__await).then(
                      function (t) {
                        n("next", t, s, c);
                      },
                      function (t) {
                        n("throw", t, s, c);
                      }
                    )
                  : e.resolve(d).then(
                      function (t) {
                        (u.value = t), s(u);
                      },
                      function (t) {
                        return n("throw", t, s, c);
                      }
                    );
              }
              c(l.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function (t, a) {
                function i() {
                  return new e(function (e, r) {
                    n(t, a, e, r);
                  });
                }
                return (r = r ? r.then(i, i) : i());
              },
            });
          }
          function O(e, n, a) {
            var r = f;
            return function (i, o) {
              if (r === g) throw new Error("Generator is already running");
              if (r === v) {
                if ("throw" === i) throw o;
                return { value: t, done: !0 };
              }
              for (a.method = i, a.arg = o; ; ) {
                var s = a.delegate;
                if (s) {
                  var c = x(s, a);
                  if (c) {
                    if (c === b) continue;
                    return c;
                  }
                }
                if ("next" === a.method) a.sent = a._sent = a.arg;
                else if ("throw" === a.method) {
                  if (r === f) throw ((r = v), a.arg);
                  a.dispatchException(a.arg);
                } else "return" === a.method && a.abrupt("return", a.arg);
                r = g;
                var l = h(e, n, a);
                if ("normal" === l.type) {
                  if (((r = a.done ? v : m), l.arg === b)) continue;
                  return { value: l.arg, done: a.done };
                }
                "throw" === l.type &&
                  ((r = v), (a.method = "throw"), (a.arg = l.arg));
              }
            };
          }
          function x(e, n) {
            var a = n.method,
              r = e.iterator[a];
            if (r === t)
              return (
                (n.delegate = null),
                ("throw" === a &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  x(e, n),
                  "throw" === n.method)) ||
                  ("return" !== a &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + a + "' method"
                    )))),
                b
              );
            var i = h(r, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), b
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((n[e.resultName] = o.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  b)
                : o
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                b);
          }
          function N(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function R(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function L(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(N, this),
              this.reset(!0);
          }
          function U(e) {
            if (e || "" === e) {
              var n = e[c];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var r = -1,
                  o = function n() {
                    for (; ++r < e.length; )
                      if (i.call(e, r))
                        return (n.value = e[r]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (o.next = o);
              }
            }
            throw new TypeError(a(e) + " is not iterable");
          }
          return (
            (E.prototype = _),
            o(I, "constructor", { value: _, configurable: !0 }),
            o(_, "constructor", { value: E, configurable: !0 }),
            (E.displayName = d(_, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === E || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, _)
                  : ((t.__proto__ = _), d(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            w(C.prototype),
            d(C.prototype, l, function () {
              return this;
            }),
            (e.AsyncIterator = C),
            (e.async = function (t, n, a, r, i) {
              void 0 === i && (i = Promise);
              var o = new C(p(t, n, a, r), i);
              return e.isGeneratorFunction(n)
                ? o
                : o.next().then(function (t) {
                    return t.done ? t.value : o.next();
                  });
            }),
            w(I),
            d(I, u, "Generator"),
            d(I, c, function () {
              return this;
            }),
            d(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var a in e) n.push(a);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var a = n.pop();
                    if (a in e) return (t.value = a), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = U),
            (L.prototype = {
              constructor: L,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(R),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      i.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function a(a, r) {
                  return (
                    (s.type = "throw"),
                    (s.arg = e),
                    (n.next = a),
                    r && ((n.method = "next"), (n.arg = t)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    s = o.completion;
                  if ("root" === o.tryLoc) return a("end");
                  if (o.tryLoc <= this.prev) {
                    var c = i.call(o, "catchLoc"),
                      l = i.call(o, "finallyLoc");
                    if (c && l) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var a = this.tryEntries[n];
                  if (
                    a.tryLoc <= this.prev &&
                    i.call(a, "finallyLoc") &&
                    this.prev < a.finallyLoc
                  ) {
                    var r = a;
                    break;
                  }
                }
                r &&
                  ("break" === t || "continue" === t) &&
                  r.tryLoc <= e &&
                  e <= r.finallyLoc &&
                  (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = t),
                  (o.arg = e),
                  r
                    ? ((this.method = "next"), (this.next = r.finallyLoc), b)
                    : this.complete(o)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  b
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), R(n), b;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var a = n.completion;
                    if ("throw" === a.type) {
                      var r = a.arg;
                      R(n);
                    }
                    return r;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, n, a) {
                return (
                  (this.delegate = {
                    iterator: U(e),
                    resultName: n,
                    nextLoc: a,
                  }),
                  "next" === this.method && (this.arg = t),
                  b
                );
              },
            }),
            e
          );
        }
        function i(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return o(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return o(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return o(t, e);
            })(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function o(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
          return a;
        }
        function s(t, e, n, a, r, i, o) {
          try {
            var s = t[i](o),
              c = s.value;
          } catch (t) {
            return void n(t);
          }
          s.done ? e(c) : Promise.resolve(c).then(a, r);
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
        t.exports = (function () {
          var t,
            e =
              ((t = r().mark(function t(e, n) {
                var a, o, s, u;
                return r().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (a = e.customScripts || []),
                          (o = window.PLUGIN_PACKAGES.filter(function (t) {
                            return (
                              !l.includes(t.name) &&
                              !t.name.startsWith("".concat(n, "-plugin-legacy"))
                            );
                          }).map(function (t) {
                            var e, n;
                            return (
                              (e = ""
                                .concat(t.location, "/plugin.css?bust=")
                                .concat("7.23.0-alpha4")),
                              ((n = document.createElement("link")).rel =
                                "stylesheet"),
                              (n.type = "text/css"),
                              (n.href = e),
                              document.head.appendChild(n),
                              ""
                                .concat(t.location, "/")
                                .concat(t.main, "?bust=")
                                .concat("7.23.0-alpha4")
                            );
                          })),
                          (s = "".concat(c, "/app/").concat(n, "/")),
                          (u = a.map(function (t) {
                            return ((e =
                              s +
                              ((n = t),
                              (a = ".js"),
                              n.endsWith(a) ? n : n + a) +
                              "?bust=".concat("7.23.0-alpha4")),
                            import(e)).catch(function (t) {
                              return console.error(t);
                            });
                            var e, n, a;
                          })).push.apply(
                            u,
                            i(
                              o.map(function (t) {
                                return ((e = t), import(e)).catch(function (t) {
                                  return console.error(t);
                                });
                                var e;
                              })
                            )
                          ),
                          (t.next = 7),
                          Promise.all(u)
                        );
                      case 7:
                        return t.abrupt(
                          "return",
                          t.sent.reduce(function (t, e) {
                            var n = e.default;
                            return n
                              ? (Array.isArray(n)
                                  ? t.push.apply(t, i(n))
                                  : t.push(n),
                                t)
                              : t;
                          }, [])
                        );
                      case 8:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })),
              function () {
                var e = this,
                  n = arguments;
                return new Promise(function (a, r) {
                  var i = t.apply(e, n);
                  function o(t) {
                    s(i, a, r, o, c, "next", t);
                  }
                  function c(t) {
                    s(i, a, r, o, c, "throw", t);
                  }
                  o(void 0);
                });
              });
          return function (t, n) {
            return e.apply(this, arguments);
          };
        })();
      },
      17550: function (t, e, n) {
        "use strict";
        var a = n(92758);
        t.exports = [
          function () {
            return {
              redirectToRuntime: function (t, e, n) {
                return a.redirectToRuntime(t, e, n);
              },
              replaceLastPathFragment: function (t, e, n, r) {
                return a.replaceLastPathFragment(t, e, n, r);
              },
              redirectTo: function (t, e, n) {
                return a.redirectTo(t, e, n);
              },
            };
          },
        ];
      },
      65650: function (t) {
        "use strict";
        t.exports = function (t, e) {
          return -1 !== t.indexOf(e);
        };
      },
      50947: function (t, e, n) {
        "use strict";
        var a = n(43909),
          r = { size: 50, total: 0, current: 1 };
        function i(t) {
          return t().page || 1;
        }
        t.exports = {
          initializePaginationInController: function (t, e, n) {
            var o = (t.pages = a.copy(r));
            return (
              (o.current = i(e)),
              t.$watch("pages.current", function (t, a) {
                var r = i(e);
                t != a &&
                  t !== r &&
                  (e("page", t && 1 != t ? t : null), n(t, a));
              }),
              t.$on("$locationChangeSuccess", function () {
                var t = i(e);
                if (+o.current != +t) {
                  var a = o.current;
                  (o.current = t), n(o.current, a);
                }
              }),
              t.$on("$destroy", function () {
                e("page", null);
              }),
              o
            );
          },
        };
      },
      92758: function (t, e, n) {
        "use strict";
        n(45477), n(84392), n(56806), n(95234), n(31083);
        var a = {
          redirectToRuntime: function (t, e, n) {
            var r = e + "/runtime";
            return a.redirectTo(r, n, !0);
          },
          replaceLastPathFragment: function (t, e, n, r) {
            var i = e.replace(/[^/]*$/, t);
            return a.redirectTo(i, n, r);
          },
          redirectTo: function (t, e, n) {
            var a,
              r = [];
            if (e && n) {
              var i = "[object Array]" === Object.prototype.toString.call(n);
              for (a in e)
                (i && -1 === n.indexOf(a)) ||
                  r.push(a + "=" + encodeURIComponent(e[a]));
            }
            return t + (r.length ? "?" + r.join("&") : "");
          },
        };
        t.exports = a;
      },
      51344: function (t, e, n) {
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
        var a = n(43909),
          r = n(40271),
          i = n(65650);
        function o(t) {
          return encodeURI(t).replace(/#/g, "%23");
        }
        function s(t, e) {
          return a.isObject(t)
            ? (function (t) {
                return Object.keys(t).reduce(function (e, n) {
                  var a = t[n];
                  return null != a && (e[n] = a), e;
                }, {});
              })(
                (function (t, e) {
                  return Object.keys(t).reduce(function (n, a) {
                    var r = t[a];
                    return i(e, a) && (n[a] = r), n;
                  }, {});
                })(t, e)
              )
            : t;
        }
        function c(t, e) {
          return e.map(l.bind(null, t));
        }
        function l(t, e) {
          return { type: t, operator: "eq", value: e };
        }
        function u(t, e, n, o) {
          var s = (function (t, e) {
              var n = t.type.value.key,
                a = t.operator.value.key;
              (function (t) {
                return -1 !== t.indexOf("Date");
              })(n) && (n = n.slice(0, -4));
              (function (t) {
                return i(["After", "Before", "Like"], t);
              })(a) &&
                !i(e, n) &&
                (n += a);
              return n;
            })(o, e),
            c = (function (t) {
              if (t.basic) return !0;
              return (function (t, e, n) {
                var a = /(\\%)|(\\_)/g,
                  i = /(%)|(_)/;
                if (
                  !(
                    ("like" !== n.toLowerCase() &&
                      "notlike" !== n.toLowerCase()) ||
                    i.test(e.replace(a, ""))
                  )
                )
                  return "%" + e + "%";
                if (d.test(e))
                  return r(e, r.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
                return t || e;
              })(t.value.key, t.value.value, t.operator.value.key);
            })(o);
          return (
            i(e, s) &&
              (c = (function (t, e) {
                return {
                  name: t.name.value,
                  operator: t.operator.value.key,
                  value: p(e),
                };
              })(o, c)),
            i(t, s)
              ? (n[s] = (function (t, e, n) {
                  return a.isArray(t[e]) ? t[e].concat([n]) : [n];
                })(n, s, c))
              : (n[s] = c),
            n
          );
        }
        t.exports = {
          getSearchQueryForSearchType: function (t, e) {
            return (
              (e = [].concat(e)), o("searchQuery=" + JSON.stringify(c(t, e)))
            );
          },
          getActivityIdsFromUrlParams: function (t, e) {
            var n = JSON.parse(e.searchQuery || "[]");
            return (function (t, e) {
              return e
                .filter(function (e) {
                  return e.type === t;
                })
                .map(function (t) {
                  return t.value;
                });
            })(t, n);
          },
          replaceActivitiesInSearchQuery: function (t, e, n) {
            return (function (t, e) {
              return e.filter(function (e) {
                return e.type !== t;
              });
            })(e, t).concat(c(e, n));
          },
          createSearchQueryForSearchWidget: function (t, e, n) {
            return (
              (t = a.isArray(t) ? t : []),
              (e = a.isArray(e) ? e : []),
              (n = a.isArray(n) ? n : ["variables"]),
              (e = e.concat(n)),
              t.reduce(u.bind(null, e, n), {})
            );
          },
          shouldUpdateFilter: function (t, e, n) {
            return (n = a.isArray(n) ? n : []), !a.equals(s(t, n), s(e, n));
          },
          createSearchesForActivityIds: c,
          encodeQuery: o,
          updateSearchValuesForTypeInCtrlMode: function (t, e, n) {
            var a = (function (t, e, n) {
                return t.filter(function (t) {
                  return t.type !== n || !i(e, t.value);
                });
              })(t, n, e),
              r = (function (t, e, n) {
                var a = e
                  .filter(function (t) {
                    return t.type === n;
                  })
                  .map(function (t) {
                    return t.value;
                  });
                return t.filter(function (t) {
                  return !i(a, t);
                });
              })(n, t, e);
            return a.concat(c(e, r));
          },
        };
        var d =
          /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})$/;
        function p(t) {
          return isNaN(t) || "" === t.trim()
            ? "true" === t ||
                ("false" !== t &&
                  ("NULL" === t
                    ? null
                    : 0 === t.indexOf("'") &&
                      t.lastIndexOf("'") === t.length - 1
                    ? t.substr(1, t.length - 2)
                    : t))
            : +t;
        }
      },
      21605: function (t) {
        "use strict";
        t.exports = function (t) {
          t.decorator("uibPaginationDirective", [
            "$delegate",
            "uibPaginationConfig",
            "$translate",
            function (t, e, n) {
              return (
                (e.firstText = n.instant("PAGINATION_FIRST")),
                (e.lastText = n.instant("PAGINATION_LAST")),
                (e.previousText = n.instant("PAGINATION_PREVIOUS")),
                (e.nextText = n.instant("PAGINATION_NEXT")),
                t
              );
            },
          ]);
        };
      },
      97715: function (t, e, n) {
        "use strict";
        n.r(e);
      },
      35358: function (t, e, n) {
        var a = {
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
        function r(t) {
          var e = i(t);
          return n(e);
        }
        function i(t) {
          if (!n.o(a, t)) {
            var e = new Error("Cannot find module '" + t + "'");
            throw ((e.code = "MODULE_NOT_FOUND"), e);
          }
          return a[t];
        }
        (r.keys = function () {
          return Object.keys(a);
        }),
          (r.resolve = i),
          (t.exports = r),
          (r.id = 35358);
      },
      24820: function (t) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42"/><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42"/><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42"/><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF"/></svg>';
      },
      83263: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/auth/page/form.html --\x3e\n<form ng-submit="login()"\n      name="signinForm"\n      request-aware>\n\n  <input autofocus\n         tabindex="1"\n         type="text"\n         class="form-control"\n         placeholder="{{ \'PAGE_LOGIN_USERNAME\' | translate }}"\n         auto-fill\n         required\n         ng-model="username"></input>\n  <input tabindex="2"\n         type="password"\n         class="form-control"\n         placeholder="{{ \'PAGE_LOGIN_PASSWORD\' | translate }}"\n         auto-fill\n         required\n         ng-model="password"></input>\n  <button tabindex="3"\n          class="btn btn-lg btn-primary"\n          type="submit"\n          ng-disabled="status === \'LOADING\'">{{ \'PAGE_LOGIN_SIGN_IN_ACTION\' | translate }}\n  </button>\n</form>\n\x3c!-- / CE - camunda-commons-ui/lib/auth/page/form.html --\x3e\n';
      },
      15222: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/auth/page/login.html --\x3e\n<div class="form-signin-container">\n  <div class="form-signin">\n\n    <div class="login-header">\n      <div class="login-logo" ng-bind-html="logo"></div>\n\n      <div class="app-name">\n        {{ appName }}\n      </div>\n    </div>\n\n    <div notifications-panel\n         ng-if="signinForm.$dirty"\n         class="notifications-panel"></div>\n\n    <view\n      ng-repeat="plugin in loginPlugins"\n      data-plugin-id="{{ plugin.id }}"\n      provider="plugin"></view>\n\n    <div ng-if="showFirstLogin"\n         class="alert-info alert">\n      <div>\n        <button type="button" class="close" ng-click="dismissInfoBox()">×</button>\n        <strong class="status">{{ \'FIRST_LOGIN_HEADING\' | translate }}</strong>\n        <span class="message" ng-bind-html="FirstLoginMessage"></span>\n      </div>\n    </div>\n  </div>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/auth/page/login.html --\x3e\n';
      },
      82701: function (t) {
        "use strict";
        t.exports =
          '<li class="dropdown engine-select"\n    ng-show="engines.length > 1 && currentEngine"\n    uib-dropdown>\n\x3c!-- # CE - camunda-commons-ui/lib/directives/engineSelect.html --\x3e\n  <a href\n     class="dropdown-toggle"\n     uib-dropdown-toggle>\n    <span class="glyphicon glyphicon-info-sign glyphicon glyphicon-info-sign "\n          uib-tooltip="{{ \'DIRECTIVE_ENGINE_SELECT_TOOLTIP\' | translate }}"\n          tooltip-placement="bottom"></span>\n    {{ currentEngine.name }}\n  </a>\n  <ul uib-dropdown-menu class="dropdown-menu dropdown-menu-right">\n    <li ng-repeat="(id, engine) in engines"\n        ng-class="{ active: currentEngine.name === engine.name }">\n      <a ng-href="{{ \'app://../\' + engine.name + \'/\' | uri }}">\n        {{ engine.name }}\n      </a>\n    </li>\n  </ul>\n\x3c!-- / CE - camunda-commons-ui/lib/directives/engineSelect.html --\x3e\n</li>\n';
      },
      69064: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/directives/inPlaceTextField.html --\x3e\n<div in-place-text-field-root>\n  <div ng-if="!editing">\n    {{ context[property] }}\n    <span class="edit-toggle"\n          ng-click="enter()">\n      <span class="glyphicon glyphicon-pencil"></span>\n    </span>\n  </div>\n\n  <form ng-if="editing"\n        ng-submit="submit()"\n        class="inline-edit"\n        name="inPlaceTextFieldForm"\n        novalidate\n        request-aware>\n\n    <fieldset>\n      \x3c!-- {{ value }} --\x3e\n      <input name="value"\n             ng-model="value"\n             type="text"\n             class="in-place-edit form-control"\n             placeholder="{{ placeholder }}"\n             autofocus\n             ng-required="isRequired">\n    </fieldset>\n\n    <div class="inline-edit-footer">\n\n      <p class="error" ng-show="error">\n        {{ error.message }}\n      </p>\n\n      <div class="btn-group">\n        <button type="submit"\n                class="btn btn-sm btn-primary"\n                ng-disabled="inPlaceTextFieldForm.$invalid">\n          <span class="glyphicon glyphicon-ok "></span>\n        </button>\n        <button type="button"\n                class="btn btn-sm btn-default"\n                ng-click="leave()">\n          <span class="glyphicon glyphicon-ban-circle"></span>\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/directives/inPlaceTextField.html --\x3e\n';
      },
      54834: function (t) {
        "use strict";
        t.exports =
          '<span ng-if="annotation" cam-widget-clipboard="annotation">\n  <span ng-click="openModal()" uib-tooltip="{{ readonly ? \'PLGN_AUDIT_SHOW_ANNOTATION\' : \'PLGN_AUDIT_EDIT_ANNOTATION\' | translate}}" tooltip-placement="top-left">\n    {{annotation}}\n  </span>\n</span>\n\n<a class="edit" ng-click="openModal()" ng-if="!annotation && !readonly" uib-tooltip="{{\'PLGN_AUDIT_ADD_ANNOTATION\' | translate}}">\n  <span class="glyphicon glyphicon-pencil"></span>\n</a>\n';
      },
      13919: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - ui/cockpit/client/scripts/directives/incidents-tab-annotation.html --\x3e\n<div class="modal-header">\n  <h3 ng-if="!readOnly" translate="PLGN_AUDIT_EDIT_MODAL_HEADER"></h3>\n  <h3 ng-if="readOnly" translate="PLGN_AUDIT_VIEW_MODAL_HEADER"></h3>\n</div>\n\n<div class="modal-body annotation-edit">\n    <div notifications-panel></div>\n  <div class="form-group"\n       ng-show="loadingState === \'INITIAL\'">\n    <div class="textarea-container">\n      <textarea ng-model="text"\n                id="value"\n                rows="10"\n                class="form-control cam-string-variable"\n                ng-change="dirty = true"\n                ng-class="{\'ng-invalid\': text.length > maxAnnotationLength}"\n                ng-readonly="readOnly"></textarea>\n\n      <span class="pull-right label label-default character-count">{{text.length}}/{{maxAnnotationLength}}</span>\n    </div>\n  </div>\n</div>\n\n<div class="modal-footer" ng-if="loadingState === \'INITIAL\'">\n  <button class="btn btn-link"\n          ng-click="$dismiss(\'close\')">\n    {{ \'CLOSE\' | translate }}\n  </button>\n  <button class="btn btn-primary"\n          ng-show="!readOnly"\n          ng-disabled="!dirty || text.length > maxAnnotationLength"\n          ng-click="updateAnnotation()">\n    {{ \'SAVE\' | translate }}\n  </button>\n</div>\n\n<div class="modal-footer" ng-if="loadingState !== \'INITIAL\'">\n  <button class="btn btn-primary"\n          ng-click="$close(text)">\n    {{ \'OK\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - ui/cockpit/client/scripts/directives/incidents-tab-annotation.html --\x3e\n';
      },
      86188: function (t) {
        "use strict";
        t.exports =
          '<div uib-alert class="alert alert-danger"\n     ng-if="error">\n  <span>\n    <strong>{{ \'CAM_WIDGET_BPMN_VIEWER_ERROR\' | translate }}</strong>\n  </span>\n  <span>\n   {{ error.message }}\n  </span>\n</div>\n\n<div ng-show="!error">\n\n  <div ng-if="!loaded" class="placeholder-container">\n    <div class="placeholder-content">\n      <span class="glyphicon glyphicon-refresh animate-spin"></span>\n      <span class="loading-text">{{ \'CAM_WIDGET_BPMN_VIEWER_LOADING\' | translate }}</span>\n    </div>\n  </div>\n\n  <div class="diagram-holder" ng-class=\'{"diagram-holder": true, "grab-cursor": !disableNavigation && !grabbing, "djs-cursor-move": !disableNavigation && grabbing}\'></div>\n\n  <div class="actions"></div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n';
      },
      5831: function (t) {
        "use strict";
        t.exports =
          '<div cam-widget-clipboard="getLink()" icon="glyphicon-link" tooltip-text="{{ \'CAM_WIDGET_COPY_LINK\' | translate }}">\n</div>\n';
      },
      31324: function (t) {
        "use strict";
        t.exports =
          '<span ng-if="!leftSide" ng-transclude></span>\n<a ng-if="!noTooltip"\n   uib-tooltip="{{ tooltipText }}"\n   tooltip-append-to-body="true"\n   ng-class="{\'copy-ok\': copyStatus === true, \'copy-error\': copyStatus === false}"\n   class="glyphicon {{icon}}"></a>\n<a ng-if="noTooltip"\n   ng-class="{\'copy-ok\': copyStatus === true, \'copy-error\': copyStatus === false}"\n   class="glyphicon {{icon}}"></a>\n<span ng-if="leftSide" ng-transclude></span>\n';
      },
      89192: function (t) {
        "use strict";
        t.exports =
          '<div uib-alert class="alert alert-danger"\n     ng-if="error">\n  <span>\n    <strong>{{ \'CAM_WIDGET_CMMN_VIEWER_ERROR\' | translate }}</strong>\n  </span>\n  <span>\n   {{ error.message }}\n  </span>\n</div>\n\n<div ng-show="!error">\n\n  <div ng-if="!loaded" class="placeholder-container">\n    <div class="placeholder-content">\n      <span class="glyphicon glyphicon-refresh animate-spin"></span>\n      <span class="loading-text">{{ \'CAM_WIDGET_CMMN_VIEWER_LOADING\' | translate }}</span>\n    </div>\n  </div>\n\n  <div class="diagram-holder" ng-class=\'{"diagram-holder": true, "grab-cursor": !disableNavigation && !grabbing, "djs-cursor-move": !disableNavigation && grabbing}\'></div>\n\n  <div class="actions"></div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div ng-if="!disableNavigation"\n       class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n';
      },
      19142: function (t) {
        "use strict";
        t.exports =
          '<div class="debug">\n  <div class="col-xs-2"\n        ng-if="!disableToggleButton">\n    <button class="btn btn-default btn-round"\n            ng-click="toggleOpen()"\n            uib-tooltip="{{tooltip}}"\n            tooltip-placement="{{tooltipPlacement}}">\n      <span class="glyphicon"\n            ng-class="{\'glyphicon-eye-open\': !open, \'glyphicon-eye-close\': open}"></span>\n    </button>\n  </div>\n  <div class="col-xs-10"\n       ng-show="open || disableToggleButton"\n       cam-hover-area>\n    <span ng-show="extended" cam-widget-clipboard="extendedInfo"\n          no-tooltip>\n      <code>{{ extensionName }}</code>\n    </span>\n    <pre ng-show="extended">{{ extendedInfo }}</pre>\n    <span cam-widget-clipboard="debugged | json "\n          no-tooltip\n          cam-hoverable-title="data-id">\n      <code>{{ varName }}</code>\n    </span>\n    <pre cam-hover-trigger="data-id">{{ debugged | json }}</pre>\n  </div>\n</div>\n';
      },
      89496: function (t) {
        "use strict";
        t.exports =
          '<div uib-alert class="alert alert-danger"\n     ng-if="error">\n  <strong>{{ \'CAM_WIDGET_DMN_VIEWER_ERROR\' | translate }}</strong><br/>\n  {{ error.message }}\n</div>\n\n<div ng-show="!error"\n     ng-if="!loaded && !disableLoader"\n     class="placeholder-container">\n  <div class="placeholder-content">\n    {{ \'CAM_WIDGET_DMN_VIEWER_LOADING\' | translate }}<br />\n    <span class="glyphicon glyphicon-refresh animate-spin"></span>\n  </div>\n</div>\n\n<div ng-show="!error"\n     ng-class="{\n      \'grab-cursor\': isDrd && !grabbing,\n      \'cursor-move\': isDrd && grabbing\n     }"\n     class="table-holder">\n</div>\n\n<div ng-if="!error && !disableNavigation && isDrd">\n  <div class="navigation zoom">\n    <button class="btn btn-default in"\n            title="zoom in"\n            ng-click="zoomIn()">\n      <span class="glyphicon glyphicon-plus"></span>\n    </button>\n    <button class="btn btn-default out"\n            title="zoom out"\n            ng-click="zoomOut()">\n      <span class="glyphicon glyphicon-minus"></span>\n    </button>\n  </div>\n\n  <div class="navigation reset">\n    <button class="btn btn-default"\n            title="reset zoom"\n            ng-click="resetZoom()">\n      <span class="glyphicon glyphicon-screenshot"></span>\n    </button>\n  </div>\n</div>\n';
      },
      70044: function (t) {
        "use strict";
        t.exports =
          '<div class="container-fluid">\n  <div class="row">\n    <div id="footer-timezone" class="col-xs-6">\n      {{ \'CAM_WIDGET_FOOTER_TIMEZONE\' | translate }} <i>{{timezoneName}}</i>\n    </div>\n    <div class="col-xs-6">\n      {{ \'CAM_WIDGET_FOOTER_POWERED_BY\' | translate }} <a href="https://www.clevercouncil.com">Celever Platform</a> /\n      <span class="version">{{version}}</span>\n    </div>\n  </div>\n</div>\n';
      },
      57752: function (t) {
        "use strict";
        t.exports =
          '<div ng-if="isEntrepriseEdition" class="ce-eol-banner"\n     ng-bind-html="trustAsHtml(\'BANNER_CE_EOL_TEXT\' | translate)">\n</div>\n\n<div class="navbar-header">\n  <button type="button"\n          class="navbar-toggle"\n          ng-class="{open: !!navbarOpen}"\n          ng-click="navbarOpen = !navbarOpen">\n    <em class="sr-only">{{ toggleNavigation }}</em>\n    <span></span>\n    <span></span>\n    <span></span>\n  </button>\n\n  <a class="navbar-brand app-banner"\n     ng-if="authentication.name"\n     href="#/"\n     title="{{ brandName }} {{ appName }}">\n     <span ng-bind-html="logo" class="brand-logo"></span>\n     <span class="brand-name" ng-cloak>{{ brandName }}</span>\n  </a>\n\n  <div class="small-screen-warning">\n    <span class="glyphicon glyphicon-exclamation-sign"\n          uib-tooltip="{{ smallScreenWarning | translate }}"\n          tooltip-placement="bottom"></span>\n  </div>\n</div>\n\n<nav class="cam-nav app-menu">\n  <ul ng-class="{collapse: !navbarOpen}">\n\n    <li engine-select></li>\n\n    <li class="account dropdown"\n        ng-if="authentication.name"\n        ng-cloak\n        uib-dropdown>\n      <a href\n         class="dropdown-toggle"\n         uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-user "></span>\n        {{ (userName || authentication.name) }}\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li class="profile"\n            ng-if="currentApp !== \'welcome\'">\n          <a ng-href="{{ \'../../welcome/:engine/\' | uri }}">\n            {{ myProfile | translate }}\n          </a>\n        </li>\n\n        <li class="divider"\n            ng-if="currentApp !== \'welcome\'"></li>\n\n        <li class="logout">\n          <a href\n             ng-click="logout()">\n            {{ signOut | translate }}\n          </a>\n        </li>\n      </ul>\n    </li>\n\n    <li class="divider-vertical"\n        ng-if="authentication.name"\n        ng-cloak></li>\n\n    <li class="app-switch dropdown"\n        ng-if="showAppDropDown"\n        uib-dropdown>\n      <a href\n         class="dropdown-toggle"\n         uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-home"></span>\n        <span class="caret"></span>\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li ng-repeat="(appName, app) in apps"\n            ng-class="appName">\n          <a ng-href="{{ (\':appRoot/app/\' + appName + \'/:engine/\' | uri) + getTargetRoute() }}">\n            {{ app.label }}\n          </a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n</nav>\n\n<div ng-transclude\n     class="sections-menu"\n     ng-class="{collapse: !navbarOpen}"></div>\n';
      },
      46152: function (t) {
        "use strict";
        t.exports =
          ' <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42"/><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42"/><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42"/><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF"/></svg>';
      },
      85364: function (t) {
        "use strict";
        t.exports =
          '<span ng-show="!editing"\n      ng-click="startEditing()"\n      ng-transclude\n      class="view-value">\n</span>\n\n<span ng-if="editing && (varType === \'datetime\' || varType === \'date\' || varType === \'time\')"\n      class="preview">\n  <span ng-if="!hasCustomDateFormat">\n    {{ formData.dateValue | camDate }}\n  </span>\n  <span ng-if="hasCustomDateFormat">\n    {{ formData.dateValue }}\n  </span>\n</span>\n\n<span ng-if="editing"\n      ng-form\n      name="inlineForm"\n      class="edit">\n\n  <input ng-if="simpleField && !isNumber"\n         class="form-control"\n         type="{{ varType }}"\n         ng-model="formData.editValue"\n         ng-keydown="handleKeydown($event)"\n         placeholder="{{ placeholder }}" />\n\n   <input ng-if="isNumber"\n          name="numberField"\n          class="form-control"\n          ng-pattern="/^[0-9]{1,7}$/"\n          ng-model="formData.editValue"\n          ng-keydown="handleKeydown($event)"\n          placeholder="{{ placeholder }}" />\n\n\n  <span ng-show="varType === \'datetime\' || varType === \'date\' || varType === \'time\'"\n        class="cam-widget-inline-field field-control datepicker">\n\n    <div class="datepicker"\n                uib-datepicker\n                ng-if="varType === \'datetime\' || varType === \'date\'"\n                type="text"\n                ng-required="true"\n                is-open="datePickerOptions.isOpen"\n                show-button-bar="false"\n                datepicker-options="datePickerOptions"\n                ng-click="$event.stopPropagation()"\n                ng-keydown="trapKeyboard($event, true); cancelOnEsc($event);"\n\n                ng-model="formData.dateValue"\n                ng-change="changeDate(this)"></div>\n\n    <div class="timepicker"\n                uib-timepicker\n                ng-if="varType === \'datetime\' || varType === \'time\'"\n                show-meridian="false"\n\n                ng-model="formData.dateValue"\n                ng-keydown="cancelOnEsc($event);"\n                ng-change="changeDate(this)"></div>\n  </span>\n\n  <input ng-if="varType === \'option\' && options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="formData.editValue"\n         ng-keydown="handleKeydown($event)"\n         uib-typeahead="option as option.value for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         typeahead-focus-first="!disableAutoselect"\n         instant-typeahead />\n  <input ng-if="varType === \'option\' && !options[0].value"\n         class="form-control"\n         type="text"\n         ng-model="formData.editValue"\n         ng-keydown="handleKeydown($event)"\n         uib-typeahead="option for option in options | filter:$viewValue:instantTypeahead"\n         typeahead-on-select="saveSelection($item)"\n         typeahead-focus-first="!disableAutoselect"\n         instant-typeahead />\n\n  <span ng-show="varType !== \'option\'"\n        class="cam-widget-inline-field btn-group">\n    <button type="button"\n                ng-if="(inOperator || notInOperator) && !(varType === \'datetime\' || varType === \'date\' || varType === \'time\')"\n                class="btn btn-xs btn-default"\n                ng-click="expandValue()">\n      <span class="glyphicon glyphicon-resize-full"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="changeType()"\n            ng-if="flexible">\n      <span class="glyphicon"\n            ng-class="\'glyphicon-\' + (varType === \'text\' ? \'calendar\' : \'pencil\')"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-style="{visibility: !isNumber || inlineForm.numberField.$valid ? \'visible\' : \'hidden\'}"\n            ng-click="applyChange($event);"\n            ng-keydown="cancelOnEsc($event);">\n      <span class="glyphicon glyphicon-ok"></span>\n    </button>\n\n    <button type="button"\n            class="btn btn-xs btn-default"\n            ng-click="cancelChange($event)"\n            ng-keydown="trapKeyboard($event); cancelOnEsc($event);">\n      <span class="glyphicon glyphicon-remove"></span>\n    </button>\n  </span>\n</span>\n';
      },
      61166: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/widgets/inline-field/dialog/template.html --\x3e\n<div class="modal-header">\n  <h3 class="modal-title">{{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE\' | translate }}</h3>\n</div>\n\n<div class="modal-body">\n  <div class="inline-field-dialog">\n    <p>{{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE_CHANGE\' | translate }}</p>\n    <form class="form-horizontal">\n      <textarea ng-model="formData.editValue"\n                rows="10"\n                class="form-control"></textarea>\n    </form>\n  </div>\n</div>\n\n\n<div class="modal-footer">\n  <button class="btn btn-link"\n          ng-click="$dismiss()">\n    {{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE_BTN_CLOSE\' | translate }}\n  </button>\n\n  <button type="submit"\n          class="btn btn-primary"\n          ng-click="changeValue()">\n    {{ \'CAM_WIDGET_INLINE_FIELD_CRIT_VALUE_BTN_CHANGE\' | translate}}\n  </button>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/widgets/inline-field/dialog/template.html --\x3e';
      },
      64556: function (t) {
        "use strict";
        t.exports =
          '<div class="loader-state loaded"\n     ng-show="loadingState === \'LOADED\'"\n     ng-transclude></div>\n\n<div class="loader-state loading"\n     ng-if="loadingState === \'LOADING\'">\n  <span class="glyphicon glyphicon-refresh animate-spin"></span>\n  {{ textLoading }}\n</div>\n\n<div class="loader-state empty"\n     ng-if="loadingState === \'EMPTY\'">\n  {{ textEmpty }}\n</div>\n\n<div uib-alert class="loader-state alert alert-danger"\n     ng-if="loadingState === \'ERROR\'">\n  {{ textError }}\n</div>\n';
      },
      37628: function (t) {
        "use strict";
        t.exports =
          '<div class="password-input right-addon">\n  <script type="text/ng-template" id="popover">\n      <p>{{ tooltip | translate }}</p>\n\n      <ul>\n        <li ng-repeat="rule in rules"\n            translate="{{ rule.placeholder }}"\n            translate-values="{{ rule.parameter }}"\n            ng-if="!rule.valid">\n        </li>\n      </ul>\n  </script>\n\n  <i ng-if="loadingState === \'NOT_OK\' && password.length > 0" class="glyphicon glyphicon-remove-circle"></i>\n  <i ng-if="loadingState === \'OK\'" class="glyphicon glyphicon-ok-circle"></i>\n  <i ng-if="loadingState === \'LOADING\'" class="glyphicon glyphicon-refresh animate-spin"></i>\n  <input id="inputPassword"\n    name="inputPassword"\n    class="form-control"\n    type="password"\n    ng-model="password"\n    ng-invalid="true"\n    uib-popover-template="\'popover\'"\n    popover-enable="loadingState === \'NOT_OK\'"\n    popover-is-open="loadingState === \'NOT_OK\' && password.length > 0"\n    popover-trigger="\'focus\'"\n    required></input>\n</div>\n';
      },
      77376: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- CE # camunda-commons-ui/lib/widgets/search-pill/search-pill.html --\x3e\n<span class="search-label"\n      ng-class="{\'invalid\': !valid}">\n  <a href\n     ng-click="onDelete()"\n     tooltip-placement="top"\n     uib-tooltip="{{ deleteText | translate }}"\n     class="remove-search glyphicon glyphicon-remove">\n  </a>\n\n  <span cam-widget-inline-field\n        class="set-value type-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'type\')"\n        type="option"\n        options="type.values"\n        change="changeSearch(\'type\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'type\')"\n        value="type.value">\n    <span ng-if="type.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{ type.tooltip | translate }}">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!type.tooltip">\n      {{ type.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="extended">:</span>\n\n  <span ng-if="extended && potentialNames.length <= 0 && !!name.value.value"\n        cam-widget-inline-field\n        class="set-value name-field"\n        type="text"\n        tabindex="0"\n        ng-keydown="onKeydown($event,\'name\')"\n        change="changeSearch(\'name\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'name\')"\n        value="name.value.value">\n    <span ng-if="name.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{name.tooltip | translate }}">\n        {{ name.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!name.tooltip">\n        {{ name.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="extended && potentialNames.length <= 0 && !name.value.value"\n        cam-widget-inline-field\n        class="set-value name-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'name\')"\n        type="text"\n        change="changeSearch(\'name\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'name\')"\n        value="name.value">\n    <span ng-if="name.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{name.tooltip | translate }}">\n        {{ name.value | camQueryComponent }}\n    </span>\n    <span ng-if="!name.tooltip">\n        {{ name.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="extended && potentialNames.length > 0"\n        cam-widget-inline-field\n        class="set-value name-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'name\')"\n        type="option"\n        options="potentialNames"\n        allow-non-options="true"\n        disable-autoselect="disableTypeaheadAutoselect"\n        change="changeSearch(\'name\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'name\')"\n        value="name.value">\n    <span ng-if="extended && name.tooltip && name.value.key">\n      {{ name.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="extended && name.tooltip && !name.value.key">\n      {{ name.value | camQueryComponent }}\n    </span>\n    <span ng-if="extended && !name.tooltip && name.value.key">\n      {{ name.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="extended && !name.tooltip && !name.value.key">\n      {{ name.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="!basic && operator.values.length > 1"\n        cam-widget-inline-field\n        class="set-value operator-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'operator\')"\n        type="option"\n        options="operator.values"\n        change="changeSearch(\'operator\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'operator\')"\n        value="operator.value">\n    <span ng-if="operator.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{operator.tooltip | translate }}">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n    <span ng-if="!operator.tooltip">\n      {{ operator.value.value | camQueryComponent }}\n    </span>\n  </span>\n\n  <span ng-if="operator.values.length < 2 && operator.tooltip"\n        tooltip-placement="top"\n        uib-tooltip="{{operator.tooltip | translate }}"\n        class="operator-field">\n    {{ operator.value.value | camQueryComponent }}\n  </span>\n  <span ng-if="operator.values.length < 2 && !operator.tooltip"\n        class="operator-field">\n    {{ operator.value.value | camQueryComponent }}\n  </span>\n\n  <span cam-widget-inline-field\n        class="set-value value-field"\n        tabindex="0"\n        ng-keydown="onKeydown($event, \'value\')"\n        type="{{ valueType }}"\n        in-operator="operator.value.key === \'In\'"\n        not-in-operator="operator.value.key === \'NotIn\'"\n        change="changeSearch(\'value\', varValue, $event)"\n        on-start-editing="clearEditTrigger(\'value\')"\n        ng-if="!basic"\n        options="options"\n        allow-non-options="allowNonOptions"\n        value="value.value"\n        flexible="{{ allowDates }}">\n    <span class="visible-whitespace"\n          ng-if="value.tooltip"\n          tooltip-placement="top"\n          uib-tooltip="{{value.tooltip | translate }}">{{ value.value | camQueryComponent }}</span>\n    <span class="visible-whitespace"\n          ng-if="!value.tooltip">{{ value.value | camQueryComponent }}</span>\n  </span>\n</span>\n\x3c!-- CE / camunda-commons-ui/lib/widgets/search-pill/search-pill.html --\x3e\n';
      },
      91804: function (t) {
        "use strict";
        t.exports =
          '<div class="search-field">\n  <form ng-submit="createSearch()"\n        ng-class="{\'has-search\': searches.length, \'focused\': focused}">\n\n    <div class="form-container search-container"\n         ng-style="{\'padding-right\': getRightPadding()}"\n         ng-class="{\'has-icon\': !!mode}">\n      <div ng-if="isMatchAnyActive && searches.length > 0"\n           class="match-any">\n        <button ng-click="switchMatchType()"\n                type="button"\n                class="btn btn-default btn-xs"\n                ng-disabled="searches.length < 2">\n          {{ (matchAny ? \'CAM_WIDGET_SEARCH_MATCH_TYPE_ANY\' : \'CAM_WIDGET_SEARCH_MATCH_TYPE_ALL\') | translate }}\n        </button>\n        <span ng-disabled="searches.length < 2">{{ \'CAM_WIDGET_SEARCH_MATCH_TYPE\' | translate }}</span>\n        </div>\n        <span ng-if="mode" class="search-type glyphicon" ng-class="\'glyphicon-\' + mode"></span>\n      <span cam-widget-search-pill\n            ng-repeat="search in searches"\n            extended="search.extended"\n            basic="search.basic"\n            allow-dates="search.allowDates"\n            enforce-dates="search.enforceDates"\n            valid="search.valid"\n            name="search.name"\n            potential-names="search.potentialNames"\n            type="search.type"\n            operator="search.operator"\n            value="search.value"\n            options="search.options"\n            allow-non-values="search.allowNonValues"\n            invalid-text="{{ translations.invalid }}"\n            delete-text="{{ translations.deleteSearch }}"\n            on-change="handleChange($index, field, before, value, $event)"\n            on-delete="deleteSearch($index)"\n            disable-typeahead-autoselect="disableTypeaheadAutoselect"></span>\n\n      <input class="form-control main-field"\n             type="text"\n             ng-model="inputQuery"\n             ng-keydown="onKeydown($event)"\n             uib-typeahead="type as type.value for type in dropdownTypes | filter:$viewValue:instantTypeahead"\n             typeahead-on-select="createSearch($item)"\n             instant-typeahead />\n\n      <div class="ignore-case" ng-if="searchHasVariableQuery">\n        {{\'CAM_WIDGET_SEARCH_VARIABLE_CASE_ATTRIBUTE\' | translate }}\n          <label>\n            <input type="checkbox" ng-model="caseHandeling.ignoreNames" >\n            {{\'CAM_WIDGET_SEARCH_VARIABLE_CASE_NAME\' | translate}}\n          </label>\n          <label>\n            <input type="checkbox" ng-model="caseHandeling.ignoreValues">\n            {{\'CAM_WIDGET_SEARCH_VARIABLE_CASE_VALUE\' | translate}}.\n          </label>\n      </div>\n\n\n\n    </div>\n  </form>\n  <div class="controls">\n    <span ng-if="total"\n          class="total-results"\n          uib-tooltip="{{ \'CAM_WIDGET_SEARCH_TOTAL_NUMBER_RESULTS\' | translate }}">\n      {{total}}\n    </span>\n\n    <span cam-share-link></span>\n\n    <span class="dropdown stored-criteria" uib-dropdown>\n      <button ng-disabled="!searches.length && !hasCriteriaSets()"\n              class="dropdown-toggle btn btn-default" uib-dropdown-toggle>\n        <span class="glyphicon glyphicon-floppy-disk"></span>\n        <span class="caret"></span>\n      </button>\n\n      <ul class="dropdown-menu dropdown-menu-right"\n          ng-if="searchCriteriaStorage.group || hasCriteriaSets()" uib-dropdown-menu>\n        <li ng-if="searchCriteriaStorage.group">\n          <div class="input-group input-group-sm">\n            <input type="text"\n                   class="form-control"\n                   ng-model="searchCriteriaStorage.nameInput"\n                   ng-click="storedCriteriaInputClick($event)"\n                   ng-keydown="searchCriteriaInputKeydown($event)" />\n            <span class="input-group-btn">\n              <button ng-disabled="!searchCriteriaStorage.nameInput"\n                      ng-click="storedCriteriaSaveClick($event)"\n                      class="btn btn-default"\n                      type="button">\n                <span class="glyphicon glyphicon-ok"></span>\n              </button>\n            </span>\n          </div>\n        </li>\n\n        <li role="separator"\n            class="divider"\n            ng-if="searchCriteriaStorage.group && hasCriteriaSets()"></li>\n\n        <li class="stored-criteria-set"\n            ng-if="hasCriteriaSets() && !isSearchCriteriaStorageGrouped"\n            ng-repeat="(key, value) in searchCriteriaStorage.available">\n          <div>\n            <a class="glyphicon glyphicon-remove-sign"\n              ng-click="dropCriteriaSet($event, key)"\n              href></a>\n\n            <a href\n              ng-click="loadCriteriaSet($event, key)">{{ key }}</a>\n          </div>\n        </li>\n\n        <li class="stored-criteria-set"\n            ng-if="hasCriteriaSets() && isSearchCriteriaStorageGrouped"\n            ng-repeat="(group, values) in searchCriteriaStorage.available">\n          <div ng-repeat="(name, value) in values">\n            <a class="glyphicon glyphicon-remove-sign"\n              ng-click="dropCriteriaSet($event, name, group)"\n              href></a>\n\n            <a href\n              ng-click="loadCriteriaSet($event, name, group)">{{ group }} : {{ name }}</a>\n          </div>\n        </li>\n\n      </ul>\n    </span>\n  </div>\n</div>\n';
      },
      24864: function (t) {
        "use strict";
        t.exports =
          '<div class="form-inline operation-details"\n     ng-class="{\'selection-wrap\': !isBatchOperationPage}">\n  <div ng-class="{row: isBatchOperationPage, \'selection-type\': !isBatchOperationPage}">\n    <label class="form-control-static"\n           for="instance"\n           ng-class="{\'col-xs-4 col-sm-3 text-right\': isBatchOperationPage, \'selection-label\': !isBatchOperationPage}">\n      {{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE\' | translate }}\n      <span class="glyphicon glyphicon-question-sign"\n            uib-tooltip="{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE_TOOLTIP\' | translate }}"\n            tooltip-placement="right"></span>\n    </label>\n    <span ng-class="{\'col-xs-6 col-sm-9\': isBatchOperationPage}">\n      <input type="radio"\n             name="selection_type"\n             id="instance"\n             class="form-control operation-radio"\n             ng-class="{\'selection-input\': !isBatchOperationPage}"\n             ng-model="selectionType"\n             value="INSTANCE" />\n    </span>\n  </div>\n  <div ng-class="{row: isBatchOperationPage, \'selection-type\': !isBatchOperationPage}">\n    <label class="form-control-static"\n           for="query"\n           ng-class="{\'col-xs-4 col-sm-3 text-right\': isBatchOperationPage, \'selection-label\': !isBatchOperationPage}">\n           {{ \'CAM_WIDGET_SELECTION_TYPE_QUERY\' | translate }}\n      <span class="glyphicon glyphicon-question-sign"\n            uib-tooltip="{{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_TOOLTIP\' | translate }}"\n            tooltip-placement="right"></span>\n    </label>\n    <span ng-class="{\'col-xs-6 col-sm-9\': isBatchOperationPage}">\n      <input type="radio"\n             name="selection_type"\n             id="query"\n             class="form-control operation-radio"\n             ng-class="{\'selection-input\': !isBatchOperationPage}"\n             ng-model="selectionType"\n             value="QUERY" />\n    </span>\n  </div>   \n</div>\n\n<div class="instance"\n     ng-if="selectionType === \'INSTANCE\' && toggleState === \'on\' && totalInstancesCount > pageSize">\n  <div class="alert alert-info">\n    <p>{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE_INTRO\' | translate }} {{ selectedInstancesCount }} {{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCES\' | translate }}. </p><br />\n    <p>\n      <a ng-click="updateSelectionType(\'QUERY\')">{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE_LINK\' | translate }}</a>\n    </p>\n  </div>\n</div>\n\n<div class="query"\n     ng-if="selectionType === \'QUERY\'">\n  <div class="alert alert-warning">\n    <p><strong>{{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_INTRO\' | translate }}</strong></p><br />\n    <p>\n      <strong>{{ \'CAM_WIDGET_SELECTION_TYPE_WARNING\' | translate }}</strong> {{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_WARNING\' | translate }}\n    </p><br />\n    <p>\n      <a ng-click="updateSelectionType(\'INSTANCE\')">{{ \'CAM_WIDGET_SELECTION_TYPE_QUERY_LINK\' | translate }} <strong>{{ \'CAM_WIDGET_SELECTION_TYPE_INSTANCE\' | translate }}</strong></a>\n    </p>\n  </div>\n</div>\n';
      },
      57848: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n<div class="modal-header">\n  <h3 translate="CAM_WIDGET_STRING_DIALOG_TITLE"\n      translate-values="{name: variable.name}"></h3>\n</div>\n\n<div class="modal-body">\n  <div class="form-group">\n    <label for="value"\n           cam-widget-clipboard="variable.value"\n           no-tooltip\n           ng-class="{hovered: hovered === \'var-value\'}">\n      {{ \'CAM_WIDGET_STRING_DIALOG_LABEL_VALUE\' | translate }}\n    </label>\n    <textarea ng-model="variable.value"\n              id="value"\n              rows="10"\n              class="form-control cam-string-variable"\n              ng-readonly="readonly"\n              ng-mouseenter="toggleHover(\'var-value\')"\n              ng-mouseleave="toggleHover()"></textarea>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss(\'close\')">\n    {{ \'CAM_WIDGET_STRING_DIALOG_LABEL_CLOSE\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n';
      },
      3907: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n<div class="modal-header">\n  <h3 translate="CAM_WIDGET_VARIABLE_DIALOG_INSPECT"\n      translate-values="{name: variable.name}"></h3>\n</div>\n\n<div class="modal-body">\n  <div ng-if="readonly"\n       class="form-group">\n    <label>{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_OBJECT_TYPE\' | translate }}</label>\n    <code class="form-control-static"\n          cam-widget-clipboard="variable.valueInfo.objectTypeName">{{ variable.valueInfo.objectTypeName }}</code>\n  </div>\n\n  <div ng-if="readonly"\n       class="form-group">\n    <label>{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZATION\' | translate }}</label>\n    <code class="form-control-static"\n          cam-widget-clipboard="variable.valueInfo.serializationDataFormat">{{ variable.valueInfo.serializationDataFormat }}</code>\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="object-type-name"\n           cam-widget-clipboard="variable.valueInfo.objectTypeName">{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_OBJECT_TYPE\' | translate }}</label>\n    <input type="text"\n           id="object-type-name"\n           class="form-control"\n           ng-model="variable.valueInfo.objectTypeName" />\n  </div>\n\n  <div ng-if="!readonly"\n       class="form-group">\n    <label for="serialization-data-format"\n           cam-widget-clipboard="variable.valueInfo.serializationDataFormat">{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZATION\' | translate }}</label>\n    <input type="text"\n           id="serialization-data-format"\n           class="form-control"\n           ng-model="variable.valueInfo.serializationDataFormat" />\n  </div>\n\n  <div class="form-group">\n    <label for="serialized-value"\n           cam-widget-clipboard="variable.value"\n           no-tooltip\n           ng-class="{hovered: hovered === \'var-value\'}">{{ \'CAM_WIDGET_VARIABLE_DIALOG_LABEL_SERIALIZED_VALUE\' | translate }}</label>\n    <textarea ng-model="variable.value"\n              id="serialized-value"\n              rows="10"\n              class="form-control"\n              ng-readonly="readonly"\n              ng-mouseenter="toggleHover(\'var-value\')"\n              ng-mouseleave="toggleHover()"></textarea>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="$dismiss(\'close\')">\n    {{ \'CAM_WIDGET_VARIABLE_DIALOG_BTN_CLOSE\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-if="!readonly"\n          ng-readonly="!hasChanged(\'serialized\')"\n          ng-click="$close(variable)">\n    {{ \'CAM_WIDGET_VARIABLE_DIALOG_BTN_CHANGE\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - camunda-commons-ui/lib/widgets/variable/cam-widget-variable-dialog.html --\x3e\n';
      },
      91740: function (t) {
        "use strict";
        t.exports =
          '<div ng-if="display && isShown(\'type\')"\n     class="type">{{ variable.type }}</div>\n<div ng-if="display && isShown(\'name\')"\n     class="name">{{ variable.name }}</div>\n<div ng-if="display && isShown(\'value\') && isPrimitive()"\n     ng-class="{null: isNull()}"\n     class="value">\n  <span ng-if="isNull()"\n        class="null-symbol">{{ \'CAM_WIDGET_VARIABLE_NULL\' | translate }}</span>\n  {{ (variable.value === null ? \'\' : variable.value.toString()) }}\n</div>\n<div ng-if="display && isShown(\'value\') && variable.type === \'Object\'"\n     ng-class="{null: isNull()}"\n     class="value">\n  <a ng-click="editVariableValue()">\n    {{ variable.valueInfo.objectTypeName }}\n  </a>\n</div>\n\n\n<div ng-if="!display"\n     class="input-group editing">\n  <div ng-if="isShown(\'type\')"\n       class="input-group-btn type">\n    <select class="form-control"\n            ng-model="variable.type"\n            ng-options="variableType for variableType in variableTypes track by variableType"\n            ng-disabled="isDisabled(\'type\')"\n            required>\n    </select>\n  </div>\x3c!-- /btn-group --\x3e\n\n  <input ng-if="isShown(\'name\')"\n         type="text"\n         class="form-control name"\n         ng-model="variable.name"\n         placeholder="varName"\n         ng-disabled="isDisabled(\'name\')"\n         required />\n\n  <div ng-if="isShown(\'value\') && !isNull()"\n       class="value-wrapper input-group"\n       ng-class="{checkbox: useCheckbox()}">\n    <div ng-if="variable.type !== \'Null\'"\n         class="input-group-btn">\n      <a ng-click="setNull()"\n         class="btn btn-default set-null"\n         ng-disabled="isDisabled(\'value\')"\n         uib-tooltip="{{ \'CAM_WIDGET_VARIABLE_SET_VALUE_NULL\' | translate }}">\n        <span class="glyphicon glyphicon-remove"></span>\n      </a>\n    </div>\n\n    <input ng-if="isPrimitive() && !useCheckbox()"\n           type="text"\n           class="form-control value"\n           ng-model="variable.value"\n           ng-disabled="isDisabled(\'value\')"\n           placeholder="{{ \'CAM_WIDGET_VARIABLE_VALUE\' | translate }}"\n           cam-variable-validator="{{variable.type}}" />\n\n    <input ng-if="useCheckbox()"\n           type="checkbox"\n           class="value"\n           ng-model="variable.value"\n           ng-disabled="isDisabled(\'value\')"\n           placeholder="{{ \'CAM_WIDGET_VARIABLE_VALUE\' | translate }}"\n           cam-variable-validator="{{variable.type}}" />\n\n    <div ng-if="variable.type === \'Object\'"\n         class="value form-control-static">\n      <a ng-click="editVariableValue()" ng-disabled="isDisabled(\'value\')">\n        {{ (variable.valueInfo.objectTypeName || \'CAM_WIDGET_VARIABLE_UNDEFINED\') | translate }}\n      </a>\n    </div>\n  </div>\n\n  <div ng-if="variable.type !== \'Null\' && isShown(\'value\') && isNull()"\n       ng-click="setNonNull()"\n       class="value-wrapper value null-value btn btn-default"\n       ng-disabled="isDisabled(\'value\')"\n       uib-tooltip="{{ \'CAM_WIDGET_VARIABLE_RESET\' | translate }}">\n    <span class="null-symbol">{{ \'CAM_WIDGET_VARIABLE_NULL\' | translate }}</span>\n  </div>\n\n  <div ng-if="variable.type === \'Null\'"\n       ng-disabled="isDisabled(\'value\')"\n       class="value-wrapper value btn no-click null-value">\n    <span class="null-symbol">{{ \'CAM_WIDGET_VARIABLE_NULL\' | translate }}</span>\n  </div>\n</div>\n';
      },
      64529: function (t) {
        "use strict";
        t.exports =
          '<div class="modal-header">\n    <h3 class="modal-title">{{ \'CAM_WIDGET_VARIABLES_TABLE_DELETE\' | translate  }}</h3>\n</div>\n\n<div class="modal-body">\n  {{ body }}\n</div>\n\n<div class="modal-footer">\n    <button ng-click="dismiss()"\n          class="btn btn-default">\n    {{ \'CAM_WIDGET_VARIABLES_TABLE_ABORT\' | translate }}\n  </button>\n  <button ng-click="submit()"\n          class="btn btn-primary"\n          ng-hide="status === \'DONE\'">\n    \n    {{ \'CAM_WIDGET_VARIABLES_TABLE_DELETE\' | translate }} \n  </button> \n</div>\n\n';
      },
      93136: function (t) {
        "use strict";
        t.exports =
          '<table class="cam-table">\n  <thead>\n  <tr>\n    <td ng-repeat="column in headers" ng-class="col-{{column.class}}">\n      <span class="{{column.class}}">{{column.content}}</span>\n      <a ng-if="column.sortable === true"\n         ng-click="changeOrder(column.request)">\n        <span class="glyphicon" ng-class="orderClass(column.request)"></span>\n      </a>\n    </td>\n    <td class="valid"\n        ng-if="validatable">\n      {{ \'CAM_WIDGET_VARIABLES_TABLE_VALID\' | translate }}\n    </td>\n    <td class="actions"\n        ng-if="editable.length">\n      Actions\n    </td>\n  </tr>\n  </thead>\n\n  <tbody>\n    <tr ng-repeat="(v, info) in variables"\n        ng-class="rowClasses(info, v)">\n      <td ng-repeat="headerClass in headerClasses track by $index"\n          ng-init="variable=info.variable"\n          ng-class="colClasses(info, headerClass, v)"\n          ng-switch on="headerClass">\n        \x3c!-- ................................................................................... --\x3e\n        <div ng-switch-when="type"\n             ng-if="!isEditable(\'type\', info)">\n          {{ variable.type }}\n        </div>\n        <select class="form-control"\n                ng-switch-when="type"\n                ng-if="isEditable(\'type\', info)"\n                ng-model="variable.type"\n                ng-options="variableType for variableType in variableTypes track by variableType"\n                required>\n        </select>\n        \x3c!-- ................................................................................... --\x3e\n\n\n        \x3c!-- ................................................................................... --\x3e\n        <div ng-switch-when="name"\n             ng-if="!isEditable(\'name\', info)">\n          <span cam-widget-clipboard="variable.name">{{ variable.name }}</span>\n        </div>\n\n        <input class="form-control"\n               ng-switch-when="name"\n               ng-model="variable.name"\n               ng-if="isEditable(\'name\', info)" />\n        \x3c!-- ................................................................................... --\x3e\n\n\n        \x3c!-- ................................................................................... --\x3e\n        <a ng-switch-when="value"\n           ng-if="!isEditable(\'value\', info) && isBinary(variable.type)"\n           ng-href="{{ downloadLink(info) }}"\n           download="{{ variable.name }}-data">\n          Download\n        </a>\n\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && variable.type === \'Object\'"\n             class="read-only value-wrapper">\n          <span ng-if="variable.valueInfo.objectTypeName"\n                cam-widget-clipboard="variable.valueInfo.objectTypeName">\n            <a ng-click="editVariableValue(v)"\n               href>{{ variable.valueInfo.objectTypeName }}</a>\n          </span>\n          <a ng-if="!variable.valueInfo.objectTypeName"\n             ng-click="editVariableValue(v)"\n             href>&lt;undefined&gt;</a>\n        </div>\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && (variable.type === \'Json\' || variable.type === \'Xml\')"\n             class="read-only value-wrapper">\n          <span cam-widget-clipboard="variable.value">\n            <a ng-click="editVariableValue(v)"\n               href>{{ variable.value }}</a>\n          </span>\n        </div>\n\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && variable.type === \'String\'"\n             class="read-only value-wrapper">\n          <span cam-widget-clipboard="variable.value">\n            <span ng-click="readStringVar(v)">{{ variable.value }}</span>\n          </span>\n        </div>\n\n        <div ng-switch-when="value"\n             ng-if="!isEditable(\'value\', info) && !hasEditDialog(variable.type)"\n             class="read-only value-wrapper">\n          <span ng-if="variable.type !== \'Bytes\' && variable.type !== \'Date\'"\n                cam-widget-clipboard="asString(variable.value)">{{ variable.value }}</span>\n          <span ng-if="variable.type === \'Bytes\'">{{ variable.value }}</span>\n          <span ng-if="variable.type === \'Date\'"\n                cam-widget-clipboard="variable.value">{{ variable.value | camDate }}</span>\n        </div>\n\n        <div class="value-wrapper"\n             ng-switch-when="value"\n             ng-if="isEditable(\'value\', info)">\n          <a ng-click="setNull(v)"\n             ng-if="!isNull(v)"\n             class="set-null"\n             tooltip-append-to-body="true"\n             uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_SET_NULL\' | translate }}">\n            <span class="glyphicon glyphicon-remove"></span>\n          </a>\n\n          <input ng-if="isPrimitive(variable.type) && !useCheckbox(variable.type) && !isNull(v)"\n                 type="text"\n                 class="form-control"\n                 ng-model="variable.value"\n                 placeholder="{{ \'CAM_WIDGET_VARIABLES_TABLE_PLACEHOLDER_VALUE\' | translate }}" />\n\n          <input ng-if="useCheckbox(variable.type)"\n                 type="checkbox"\n                 ng-model="variable.value"\n                 placeholder="{{ \'CAM_WIDGET_VARIABLES_TABLE_PLACEHOLDER_VALUE\' | translate }}" />\n\n          <a ng-if="variable.type === \'Object\' && !isNull(v)"\n             ng-click="editVariableValue(v)">\n            {{ variable.valueInfo.objectTypeName || \'&lt;undefined&gt;\' }}\n          </a>\n\n          <a ng-if="(variable.type === \'Json\' || variable.type === \'Xml\') && !isNull(v)"\n             ng-click="editVariableValue(v)">\n            {{ variable.value || \'&lt;undefined&gt;\' }}\n          </a>\n\n          <a ng-if="variable.type !== \'Null\' && !isBinary(variable.type) && isNull(v)"\n             ng-click="setNonNull(v)"\n             class="null-value"\n             tooltip-append-to-body="true"\n             uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_DEFAULT_VALUE\' | translate }}">\n            <span class="null-symbol">&lt;null&gt;</span>\n          </a>\n\n          <a ng-if="isBinary(variable.type)"\n             ng-click="uploadVariable(v)"\n             tooltip-append-to-body="true"\n             uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_UPLOAD\' | translate }}">\n            Upload\n          </a>\n\n          <span ng-if="variable.type === \'Null\'"\n                class="null-value">\n            <span class="null-symbol">{{ \'CAM_WIDGET_VARIABLES_TABLE_NULL\' | translate }}</span>\n          </span>\n        </div>\x3c!-- / value-wrapper --\x3e\n        \x3c!-- ................................................................................... --\x3e\n\n\n        <div ng-switch-default\n             cam-render-var-template\n             info="info"\n             header-name="headerClass">\n        </div>\n      </td>\n\n      <td class="valid"\n          ng-if="validatable">\n        <script type="text/ng-template" id="validation-error-popover">\n          <ul ng-if="info.failures.length > 0">\n            <li ng-repeat="failure in info.failures">\n              {{failure}}\n            </li>\n          </ul>\n        </script>\n        <button ng-if="info.failures.length > 0 && !info.editMode"\n                ng-click="info.showFailures = true"\n                class="btn btn-link"\n                type="button"\n                uib-popover-template="\'validation-error-popover\'"\n                popover-title="{{ \'CAM_WIDGET_VARIABLES_TABLE_VALIDATION_ERRORS\' | translate }}"\n                popover-class="cam-widget-variables-popover"\n                popover-trigger="\'none\'"\n                popover-is-open="info.showFailures"\n                popover-enable="true">\n          \x3c!-- use glyphicon-error when CAM-13580 is fixed --\x3e\n          <span class="error-sign"></span>\n        </button>\n        <span ng-if="info.failures.length === 0 && !info.editMode"\n              class="glyphicon glyphicon-ok"\n              uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_VALID\' | translate }}"></span>\n        <span ng-if="info.editMode"\n              class="glyphicon glyphicon-question-sign"\n              uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_TOOLTIP_VALID_PENDING\' | translate }}"></span>\n      </td>\n      <td class="actions"\n          ng-if="editable.length">\n        <div ng-if="!info.editMode"\n             class="btn-group">\n          <button class="btn btn-xs btn-primary"\n                  ng-disabled="!canEditVariable(info, v)"\n                  ng-click="enableEditMode(info, true)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_EDIT_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon-pencil"></span>\n          </button>\n          <button class="btn btn-xs btn-default"\n                  ng-disabled="!canEditVariable(info, v)"\n                  ng-click="deleteVariable(v)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_DELETE_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon glyphicon-trash"></span>\n          </button>\n        </div>\n\n        <div ng-if="info.editMode"\n             class="btn-group">\n          <button class="btn btn-xs btn-primary"\n                  ng-disabled="!info.valid || !info.changed"\n                  ng-click="saveVariable(v)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_SAVE_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon-ok"></span>\n          </button>\n          <button class="btn btn-xs btn-default"\n                  ng-click="enableEditMode(info, false)"\n                  tooltip-append-to-body="true"\n                  uib-tooltip="{{ \'CAM_WIDGET_VARIABLES_TABLE_REVERT_VARIABLE\' | translate }}">\n            <span class="glyphicon glyphicon-remove"></span>\n          </button>\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n';
      },
      34485: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/authorizations.html --\x3e\n<section>\n  <aside>\n    <ul>\n      <li ng-class="activeClass(\'resource=\'+res.id)"\n          ng-repeat="res in resourceList | orderBy:\'name\':false">\n        <a href="#/authorization/?resource={{res.id}}">{{res.name}}</a>\n      </li>\n    </ul>\n  </aside>\n\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{title}} {{\'AUTHORIZATION_AUTHORIZATIONS\' | translate}}</h3>\n      </div>\n      <div class="col-xs-4 text-right"\n           ng-controller="AuthorizationCreateController">\n        <a ng-click="addNewAuthorization()"\n           class="btn btn-default"\n           ng-hide="loadingState === \'LOADING\'">\n          {{ \'AUTHORIZATION_CREATE_NEW_AUTHORIZATION\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </div>\n    </header>\n    <div class="loader-state empty"\n         ng-if="loadingState === \'EMPTY\'">\n      {{ \'AUTHORIZATION_EMPTY\' | translate }}\n    </div>\n    <form class="form-horizontal"\n          name="createAuthForm"\n          ng-controller="AuthorizationCreateController"\n          ng-if="authorizations.length > 0">\n      <table class="cam-table">\n        <thead>\n          <tr>\n            <th class="authorization-type">{{ \'AUTHORIZATION_TYPE\' | translate }}</th>\n            <th class="user group">{{ \'AUTHORIZATION_USER_GROUP\' | translate }}</th>\n            <th class="permissions">{{ \'AUTHORIZATION_PERMISSIONS\' | translate }}</th>\n            <th class="resource-id">{{ \'AUTHORIZATION_RESOURCE_ID\' | translate }}</th>\n            <th class="action">{{ \'AUTHORIZATION_ACTION\' | translate }}</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="authorization in authorizations | orderBy:getIdentityId:false"\n              ng-class="{editing: !!authorization.inUpdate}">\n            <td class="authorization-type"\n                ng-if="!authorization.inUpdate || !!authorization.id">\n              {{getType(authorization)}}\n            </td>\n            <td class="authorization-type"\n                ng-if="!!authorization.inUpdate && !authorization.id">\n              <select ng-model="authorization.type"\n                      class="select-auth-type form-control"\n                      ng-change="ensureValidUser(authorization)">\n                <option value="0">{{ \'AUTHORIZATION_GLOBAL\' | translate }}</option>\n                <option value="1">{{ \'AUTHORIZATION_ALLOW\' | translate }}</option>\n                <option value="2">{{ \'AUTHORIZATION_DENY\' | translate }}</option>\n              </select>\n            </td>\n\n            <td class="user group"\n                ng-if="!authorization.inUpdate">\n              <span ng-show="!!authorization.userId"\n                    uib-tooltip="{{ \'AUTHORIZATION_USER\' | translate }}">\n                <span class="glyphicon glyphicon-user"></span>\n                {{authorization.userId}}\n              </span>\n\n              <span ng-show="!!authorization.groupId"\n                    uib-tooltip="{{ \'AUTHORIZATION_GROUP\' | translate }}">\n                <span class="glyphicon glyphicon-th"></span>\n                {{authorization.groupId}}\n              </span>\n            </td>\n            <td class="identity-id"\n                ng-if="!!authorization.inUpdate">\n              <div class="input-group">\n                <a class="input-group-addon"\n                   ng-disabled="isIdentityIdDisabledFor(authorization)"\n                   ng-click="setIdentityTypeFor(getIdentityTypeFor(authorization) == \'Group\' ? \'User\' : \'Group\', authorization)"\n                   uib-tooltip="{{ getIdentityTypeFor(authorization) == \'Group\' ? \'AUTHORIZATION_GROUP\' : \'AUTHORIZATION_USER\' | translate }}">\n                  <span class="glyphicon"\n                        ng-class="{\'glyphicon-th\': getIdentityTypeFor(authorization) == \'Group\', \'glyphicon-user\': getIdentityTypeFor(authorization) == \'User\'}"></span>\n                </a>\n\n                <input type="text"\n                       class="input-auth-name form-control"\n                       placeholder="{{ (getIdentityTypeFor(authorization) == \'Group\' ? \'AUTHORIZATION_GROUP_ID\' : \'AUTHORIZATION_USER_ID\') | translate }}"\n                       ng-disabled="isIdentityIdDisabledFor(authorization)"\n                       ng-class="{\'ng-invalid\': !authorization.identityId}"\n                       ng-model="authorization.identityId"/>\n              </div>\n            </td>\n\n            <td class="permissions"\n                ng-if="!authorization.inUpdate">\n              {{formatPermissions(authorization.permissions)}}\n            </td>\n            <td class="permissions"\n                ng-if="!!authorization.inUpdate">\n              <div class="input-group">\n\n                <div class="form-control-static"\n                     ng-click="addAllPermissionsTo(authorization)">\n                  {{ formatPermissions(authorization.permissions) }}\n                </div>\n\n                <div class="input-group-btn dropdown" uib-dropdown auto-close="outsideClick">\n                  <button type="button"\n                          class="btn btn-default dropdown-toggle"\n                          uib-dropdown-toggle\n                          aria-expanded="false">\n                    <span class="glyphicon glyphicon-pencil"></span>\n                    <span class="caret"></span>\n                  </button>\n\n                  <ul uib-dropdown-menu class="dropdown-menu dropdown-menu-right" auto-close="outsideClick">\n                    <div class="selection"\n                         ng-if="availablePermissionsFor().length > 1">\n                      <span ng-show="authorization.permissions != \'ALL\'"\n                            ng-click="addAllPermissionsTo(authorization)">\n                        <button\n                          class="btn btn-primary btn-xs"\n                          type="button">\n                          <span class="glyphicon glyphicon-unchecked"></span>\n                        </button> Select all\n                      </span>\n                      <span ng-hide="authorization.permissions != \'ALL\'"\n                            ng-click="addNonePermissionsTo(authorization)">\n                        <button\n                          class="btn btn-primary btn-xs"\n                          type="button">\n                          <span class="glyphicon glyphicon-check"></span>\n                        </button> Unselect all\n                      </span>\n                    </div>\n                    <li ng-repeat="perm in availablePermissionsFor()">\n                      <label>\n                        <input type="checkbox" ng-click="changePermissionOf(perm, authorization)" ng-checked="authorization.permissions.indexOf(perm) > -1 || authorization.permissions.indexOf(\'ALL\') > -1">\n                        {{perm}}\n                      </label>\n                    </li>\n                  </ul>\n                </div>\x3c!-- /input-btn-group --\x3e\n              </div>\x3c!-- /input-group --\x3e\n            </td>\n\n            <td class="resource-id"\n                ng-if="!authorization.inUpdate">\n              {{authorization.resourceId}}\n            </td>\n            <td class="resource-id"\n                ng-if="!!authorization.inUpdate">\n              <input type="text"\n                     id="inputResourceId"\n                     ng-model="authorization.resourceId"\n                     ng-class="{\'ng-invalid\': !authorization.resourceId}"\n                     class="in-place-edit form-control"\n                        />\n\n              <span ng-show="selectedResourceType==0"\n                    class="text-muted">{{ \'AUTHORIZATION_COCKPIT_OR_TASKLIST\' | translate }}</span>\n            </td>\n\n            <td class="action"\n                ng-if="!authorization.inUpdate">\n              <a ng-click="updateAuthorization(authorization)">\n                {{ \'AUTHORIZATION_EDIT\' | translate }}\n              </a>\n              <a ng-click="deleteAuthorization(authorization)">\n                {{ \'AUTHORIZATION_DELETE\' | translate }}\n              </a>\n            </td>\n            <td class="action"\n                ng-if="!!authorization.inUpdate">\n              <div class="btn-group">\n                <button type="submit"\n                        class="btn btn-primary"\n                        ng-disabled="!isAuthorizationValid(authorization)"\n                        ng-click="confirmUpdateAuthorization(authorization)">\n                  <span class="glyphicon glyphicon-ok "></span>\n                </button>\n\n                <a class="btn btn-default"\n                   ng-click="cancelUpdateAuthorization(authorization)">\n                  <span class="glyphicon glyphicon-ban-circle"></span>\n                </a>\n              </div>\n            </td>\n            <td class="info">\n              <span class="glyphicon glyphicon-exclamation-sign"\n                    ng-if="authorization.userId"\n                    uib-tooltip="{{ \'AUTHORIZATION_USER_AUTH_INFO\' | translate }}"\n                    tooltip-placement="left" />\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n      <ul uib-pagination ng-if="pages.total > pages.size"\n                  class="pagination-sm"\n\n                  page="pages.current"\n                  ng-model="pages.current"\n\n                  total-items="pages.total"\n                  items-per-page="pages.size"\n\n                  max-size="7"\n                  boundary-links="true"></ul>\n\n    </form>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/authorizations.html --\x3e\n';
      },
      33131: function (t) {
        "use strict";
        t.exports =
          "\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/confirm-delete-authorization.html --\x3e\n<div class=\"modal-header\">\n  <h3>{{ 'AUTHORIZATION_CONFIRM_DELETE_TITLE' | translate }}</h3>\n</div>\n\n<div class=\"confirm-delete-authorization modal-body\">\n  <div notifications-panel></div>\n\n  <div ng-hide=\"status === 'SUCCESS' || status === 'FAILED'\">\n    <p>{{ 'AUTHORIZATION_CONFIRM_DELETE_MESSAGE' | translate }}</p>\n\n    <dl class=\"dl-horizontal\">\n      <dt>{{ 'AUTHORIZATION_TYPE' | translate }}</dt>\n      <dd>{{getType(authorizationToDelete)}}</dd>\n      <dt>{{ 'AUTHORIZATION_USER' | translate }}</dt>\n      <dd>\n        {{authorizationToDelete.userId}} &nbsp;\n      </dd>\n      <dt>{{ 'AUTHORIZATION_GROUP' | translate }}</dt>\n      <dd>\n        {{authorizationToDelete.groupId}} &nbsp;\n      </dd>\n      <dt>{{ 'AUTHORIZATION_PERMISSIONS' | translate }}</dt>\n      <dd>{{formatPermissions(authorizationToDelete.permissions)}}</dd>\n      <dt>{{ 'AUTHORIZATION_RESOURCE' | translate }}</dt>\n      <dd>{{getResource(authorizationToDelete.resourceType)}}</dd>\n      <dt>{{ 'AUTHORIZATION_RESOURCE_ID' | translate }}</dt>\n      <dd>{{authorizationToDelete.resourceId}}</dd>\n    </dl>\n  </div>\n\n  <div ng-show=\"status === 'SUCCESS'\">\n    <p>{{ 'AUTHORIZATION_DELETE_MESSAGE' | translate }}</p>\n  </div>\n\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-default\"\n          ng-click=\"close()\"\n          ng-disabled=\"status === 'performCreate'\"\n          ng-hide=\"status === 'SUCCESS' || status === 'FAILED'\">\n    {{ 'AUTHORIZATION_DELETE_CLOSE' | translate }}\n  </button>\n\n  <button class=\"btn btn-primary\"\n          ng-click=\"close(status)\"\n          ng-show=\"status === 'SUCCESS' || status === 'FAILED'\">\n    {{ 'AUTHORIZATION_DELETE_OK' | translate }}\n  </button>\n\n  <button class=\"btn btn-primary\"\n          ng-click=\"performDelete()\"\n          ng-hide=\"status === 'SUCCESS' || status === 'FAILED'\">\n    {{ 'AUTHORIZATION_DELETE_DELETE' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/confirm-delete-authorization.html --\x3e\n";
      },
      76196: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/create-group-membership.html --\x3e\n<div class="modal-header">\n  <h3>{{ \'GROUP_MEMBERSHIP_GROUP_SELECT_GROUPS\' | translate }}</h3>\n</div>\n\n<div class="create-group-membership modal-body">\n  <div notifications-panel></div>\n\n  <table class="cam-table group"\n         ng-hide="status !== \'beforeCreate\' || availableGroups.length == 0">\n    <thead cam-sortable-table-header\n           default-sort-by="id"\n           default-sort-order="asc"\n           sorting-id="admin-sorting-users-edit-groups"\n           on-sort-change="onSortingChanged(sorting)"\n           on-sort-initialized="onSortingChanged(sorting)">\n      <tr>\n        <th class="select"></th>\n        <th class="group-id"\n            cam-sortable-table-column\n            sort-by-property="id">{{ \'GROUP_MEMBERSHIP_GROUP_GROUP_ID\' | translate }}</th>\n        <th class="group-name"\n            cam-sortable-table-column\n            sort-by-property="name">{{ \'GROUP_MEMBERSHIP_GROUP_GROUP_NAME\' | translate }}</th>\n        <th class="group-type"\n            cam-sortable-table-column\n            sort-by-property="type">{{ \'GROUP_MEMBERSHIP_GROUP_GROUP_TYPE\' | translate }}</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="group in availableGroups">\n        <td class="row-select">\n          <input type="checkbox"\n                 ng-model="group.checked"\n                 ng-change="selectGroup(group)" />\n        </td>\n\n        <td class="group-id">\n          <a href="#/groups/{{group.id | escape}}">{{group.id}}</a>\n        </td>\n\n        <td class="group-name">\n          {{group.name}}\n        </td>\n\n        <td class="group-type">\n          {{group.type}}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <p ng-show="availableGroups.length == 0 && pages.total <= 1">\n  \t{{ \'GROUP_MEMBERSHIP_GROUP_MESSAGE_AVAILABLE_GROUPS\' | translate }} <a href="#/group-create" ng-click="close">{{ \'GROUP_MEMBERSHIP_GROUP_MESSAGE_HERE\' | translate }}</a>.\n  </p>\n  <p ng-show="availableGroups.length == 0 && pages.total > 1">\n  \t{{ \'GROUP_MEMBERSHIP_GROUP_MESSAGE_AVAILABLE_GROUPS_PAGE\' | translate }}</a>.\n  </p>\n\n\n  <ul uib-pagination\n      ng-if="pages.total > pages.size && status === \'beforeCreate\'"\n      class="pagination-sm"\n\n      page="pages.current"\n      ng-model="pages.current"\n      ng-change="onPaginationChange()"\n\n      total-items="pages.total"\n      items-per-page="pages.size"\n\n      max-size="7"\n      boundary-links="true"></ul>\n\n\n  <p ng-show="status === \'SUCCESS\'">\n    {{ \'GROUP_MEMBERSHIP_GROUP_MESSAGE_SUCCESS\' | translate }}\n  </p>\n\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close()"\n          ng-disabled="status === \'performCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    {{ \'GROUP_MEMBERSHIP_GROUP_CLOSE\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    {{ \'GROUP_MEMBERSHIP_GROUP_OK\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="createGroupMemberships()"\n          ng-disabled="status !== \'beforeCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\' || availableGroups.length == 0">\n    {{ \'GROUP_MEMBERSHIP_GROUP_ADD_GROUPS\' | translate }}\n  </button>\n</div>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/create-group-membership.html --\x3e\n';
      },
      83099: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/create-group-membership.html --\x3e\n<div class="modal-header">\n  <h3>{{ \'GROUP_MEMBERSHIP_TENANT_SELECT_TENANTS\' | translate }}</h3>\n</div>\n\n<div class="create-tenant-membership modal-body">\n  <div notifications-panel></div>\n\n  <table class="cam-table tenant"\n         ng-hide="status !== \'beforeCreate\' || availableTenants.length == 0">\n    <thead cam-sortable-table-header\n           default-sort-by="id"\n           default-sort-order="asc"\n           sorting-id="admin-sorting-groups-edit-tenants"\n           on-sort-change="onSortChanged(sorting)"\n           on-sort-initialized="onSortChanged(sorting)">\n      <tr>\n        <th class="select">\n          <input type="checkbox"\n                 ng-checked="allTenantsChecked()"\n                 ng-click="checkAllTenants()"  />\n        </th>\n        <th class="tenant-id"\n            cam-sortable-table-column\n            sort-by-property="id">{{ \'GROUP_MEMBERSHIP_TENANT_TENANT_ID\' | translate }}</th>\n        <th class="tenant-name"\n            cam-sortable-table-column\n            sort-by-property="name">{{ \'GROUP_MEMBERSHIP_TENANT_TENANT_NAME\' | translate }}</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="tenant in availableTenants">\n        <td class="select">\n          <input type="checkbox"\n                 ng-model="tenant.checked" />\n        </td>\n\n        <td class="tenant-id">\n          <a href="#/tenants/{{ tenant.id | escape }}">{{ tenant.id }}</a>\n        </td>\n\n        <td class="tenant-name">\n          {{ tenant.name }}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <ul uib-pagination ng-if="modalPages.total > modalPages.size && status !== \'SUCCESS\'"\n              class="pagination-sm"\n\n              ng-model="modalPages.current"\n              ng-change="pageChange(modalPages.current)"\n\n              total-items="modalPages.total"\n              items-per-page="modalPages.size"\n              max-size="7"\n\n              boundary-links="true"\n\n              next-text="&rsaquo;"\n              last-text="&raquo;"\n              previous-text="&lsaquo;"\n              first-text="&laquo;"></ul>\n\n  <p ng-show="availableTenants.length == 0">\n    {{ \'GROUP_MEMBERSHIP_TENANT_MESSAGE_AVAILABLE_TENANTS\' | translate }} <a href="#/tenant-create" ng-click="close">{{ \'GROUP_MEMBERSHIP_TENANT_MESSAGE_HERE\' | translate }}</a>.\n  </p>\n\n  <p ng-show="status === \'SUCCESS\'">\n    {{ \'GROUP_MEMBERSHIP_TENANT_MESSAGE_SUCCESS\' | translate }}\n  </p>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close()"\n          ng-disabled="status === \'performCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    {{ \'GROUP_MEMBERSHIP_TENANT_CLOSE\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    {{ \'GROUP_MEMBERSHIP_TENANT_OK\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="createGroupMemberships()"\n          ng-disabled="status !== \'beforeCreate\' || checkedItemsCount === 0"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\' || availableTenants.length == 0"\n          translate="GROUP_MEMBERSHIP_TENANT_ADD"\n          translate-values="{ itemsCount: checkedItemsCount }">\n  </button>\n</div>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/create-group-membership.html --\x3e\n';
      },
      5993: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/create-group-membership.html --\x3e\n<div class="modal-header">\n  <h3>{{ \'USER_MEMBERSHIP_TENANT_SELECT_TENANTS\' | translate }}</h3>\n</div>\n\n<div class="create-tenant-membership modal-body">\n  <div notifications-panel></div>\n\n  <table class="cam-table tenant"\n         ng-hide="status !== \'beforeCreate\' || availableTenants.length == 0">\n    <thead cam-sortable-table-header\n           default-sort-by="id"\n           default-sort-order="asc"\n           sorting-id="admin-sorting-users-edit-tenants"\n           on-sort-change="onSortChanged(sorting)"\n           on-sort-initialized="onSortChanged(sorting)">\n      <tr>\n        <th class="select">\n          <input type="checkbox"\n                 ng-checked="allTenantsChecked()"\n                 ng-click="checkAllTenants()"  />\n        </th>\n        <th class="tenant-id"\n            cam-sortable-table-column\n            sort-by-property="id">{{ \'USER_MEMBERSHIP_TENANT_TENANT_ID\' | translate }}</th>\n        <th class="tenant-name"\n            cam-sortable-table-column\n            sort-by-property="name">{{ \'USER_MEMBERSHIP_TENANT_TENANT_NAME\' | translate }}</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr ng-repeat="tenant in availableTenants">\n        <td class="select">\n          <input type="checkbox"\n                 ng-model="tenant.checked"/>\n        </td>\n\n        <td class="tenant-id">\n          <a href="#/tenants/{{ tenant.id | escape }}">{{ tenant.id }}</a>\n        </td>\n\n        <td class="tenant-name">\n          {{ tenant.name }}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <ul uib-pagination ng-if="modalPages.total > modalPages.size && status !== \'SUCCESS\'"\n              class="pagination-sm"\n\n              ng-model="modalPages.current"\n              ng-change="pageChange(modalPages.current)"\n\n              total-items="modalPages.total"\n              items-per-page="modalPages.size"\n              max-size="7"\n\n              boundary-links="true"\n\n              next-text="&rsaquo;"\n              last-text="&raquo;"\n              previous-text="&lsaquo;"\n              first-text="&laquo;"></ul>\n\n  <p ng-show="availableTenants.length == 0">\n    {{ \'USER_MEMBERSHIP_TENANT_MESSAGE_AVAILABLE_TENANTS\' | translate }} <a href="#/tenant-create" ng-click="close">{{ \'USER_MEMBERSHIP_TENANT_MESSAGE_HERE\' | translate }}</a>.\n  </p>\n\n  <p ng-show="status === \'SUCCESS\'">\n    {{ \'USER_MEMBERSHIP_TENANT_MESSAGE_SUCCESS\' | translate }}\n  </p>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn btn-default"\n          ng-click="close()"\n          ng-disabled="status === \'performCreate\'"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    {{ \'USER_MEMBERSHIP_TENANT_CLOSE\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="close(status)"\n          ng-show="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\'">\n    {{ \'USER_MEMBERSHIP_TENANT_OK\' | translate }}\n  </button>\n\n  <button class="btn btn-primary"\n          ng-click="createUserMemberships()"\n          ng-disabled="status !== \'beforeCreate\' || checkedItemsCount === 0"\n          ng-hide="status === \'SUCCESS\' || status === \'FAILED\' || status === \'loadingFailed\' || availableTenants.length == 0"\n          translate="USER_MEMBERSHIP_TENANT_ADD"\n          translate-values="{ itemsCount: checkedItemsCount }">\n  </button>\n</div>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/create-group-membership.html --\x3e\n';
      },
      84585: function (t) {
        "use strict";
        t.exports =
          '<div class="dashboard">\n  <div class="section-content sections">\n    <section ng-repeat="plugin in dashboardPlugins"\n             ng-if="!plugin.noDashboardSection && !!plugin.accessible"\n             class="col-sm-4">\n      <div class="inner">\n        <header>\n          <h1 class="section-title">\n            <a ng-if="plugin.pagePath"\n               ng-href="{{ plugin.pagePath }}">{{ plugin.label | translate}}</a>\n            <span ng-if="!plugin.pagePath">{{ plugin.label | translate}}</span>\n          </h1>\n        </header>\n        <div class="stats">\n          <view data-plugin-id="{{ plugin.id }}"\n                provider="plugin"></view>\n        </div>\n      </div>\n    </section>\n  </div>\n</div>\n';
      },
      65493: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/diagnostics.html --\x3e\n<form class="statisticsTab">\n  <h3>{{ \'DIAGNOSTICS\' | translate }}</h3>\n\n  <div uib-alert class="alert alert-info">\n    {{ \'DIAGNOSTICS_INTRODUCTION\' | translate}}\n  </div>\n\n  <div notifications-panel></div>\n  \n  <div cam-widget-debug\n       display-name="{{ \'DIAGNOSTICS_DATA\' | translate }}"\n       debugged="data"\n       disable-toggle-button="true"\n       ng-if="data"></div>\n</form>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/diagnostics.html --\x3e';
      },
      73483: function (t) {
        "use strict";
        t.exports =
          '<form class="execution-metrics" name="form">\n\n  <div class="row">\n    <div class="col-xs-12">\n      <h3>{{ \'EXECUTION_METRICS\' | translate }}</h3>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-12">\n      <div uib-alert class="alert alert-info">\n        <p>\n          {{ \'EXECUTION_METRICS_INFO_1\' | translate }}\n          <strong>{{ \'EXECUTION_METRICS_FNI\' | translate }}</strong>,\n          <strong>{{ \'EXECUTION_METRICS_EDE\' | translate }}</strong>,\n          <strong>{{ \'EXECUTION_METRICS_RPI\' | translate }}</strong>\n          {{ \'EXECUTION_METRICS_AND\' | translate }}\n          <strong>{{ \'EXECUTION_METRICS_DI\' | translate }}</strong>\n          {{ \'EXECUTION_METRICS_INFO_2\' | translate }}\n          {{ \'EXECUTION_METRICS_AND\' | translate }}\n          <strong>{{ \'EXECUTION_METRICS_TW\' | translate }}</strong>\n          {{ \'EXECUTION_METRICS_INFO_3\' | translate }}\n          {{ \'EXECUTION_METRICS_INFO_4\' | translate }}\n        </p>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="form-group col-xs-12">\n      <label for="startDate">\n        {{ \'EXECUTION_METRICS_START_DATE\' | translate }}\n      </label>\n      <div>\n        <span cam-widget-inline-field\n              id="startDate"\n              class="form-control-static"\n              type="date"\n              value="startDate"\n              date-format="fmtDatePicker"\n              date-picker-options="datePickerOptions"\n              flexible="true">\n                <a class="form-control-static">{{startDate}}</a>\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-8">\n      <h4 class="pull-left">\n        {{ \'EXECUTION_METRICS_MONTHLY_TABLE_TITLE\' | translate }}\n      </h4>\n    </div>\n    <div class="col-xs-4">\n      <div class="pull-right">\n        <label class="checkbox">\n          <input type="checkbox" ng-model="displayLegacyMetrics">\n          {{ \'EXECUTION_METRICS_SHOW_LEGACY\' | translate }}\n        </label>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-12 monthly-metrics-chart"\n         ng-style="{display: loadingStateMonthly === \'LOADED\' ? \'block\' : \'none\'}">\n      <canvas id="monthly-metrics-chart-canvas"></canvas>\n    </div>\n    <div class="col-xs-12">\n      <div cam-widget-loader\n           loading-state="{{ loadingStateMonthly }}"\n           text-error="{{ loadingErrorMonthly }}">\n        <table class="cam-table metrics-monthly"\n               ng-class="{\'without-legacy\': !displayLegacyMetrics}">\n          <thead>\n          <tr>\n            <th></th>\n            <th class="metric-header">PI</th>\n            <th class="metric-header">DI</th>\n            <th class="metric-header">TU\n              <span class="glyphicon glyphicon-question-sign"\n                    uib-tooltip="{{ \'EXECUTION_METRICS_TU_TOOLTIP\' | translate }}"\n                    tooltip-placement="left"></span>\n            </th>\n            <th class="metric-header" ng-show="displayLegacyMetrics">FNI</th>\n            <th class="metric-header" ng-show="displayLegacyMetrics">EDE</th>\n          </tr>\n          </thead>\n          <tbody>\n          <tr ng-repeat="metric in monthlyMetrics" ng-style="getSubscriptionMonthStyle(metric)">\n            <td>{{metric.labelFmt}}</td>\n            <td class="metric-row">{{metric[\'process-instances\'].sumFmt}}</td>\n            <td class="metric-row">{{metric[\'decision-instances\'].sumFmt}}</td>\n            <td class="metric-row">{{metric[\'task-users\'].sumFmt}}</td>\n            <td class="metric-row" ng-show="displayLegacyMetrics">{{metric[\'flow-node-instances\'].sumFmt}}</td>\n            <td class="metric-row" ng-show="displayLegacyMetrics">{{metric[\'executed-decision-elements\'].sumFmt}}</td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-12">\n      <h4>{{ \'EXECUTION_METRICS_ANNUAL_TABLE_TITLE\' | translate }}</h4>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-xs-12">\n      <div cam-widget-loader\n           loading-state="{{ loadingStateAnnual }}"\n           text-error="{{ loadingErrorAnnual }}"\n           text-empty="{{ \'EXECUTION_METRICS_ANNUAL_TABLE_EMPTY\' | translate }}">\n        <table class="cam-table metrics-annual">\n          <thead>\n          <tr>\n            <th></th>\n            <th class="metric-header">PI</th>\n            <th class="metric-header">DI</th>\n            <th class="metric-header">TU</th>\n            <th class="metric-header">FNI</th>\n            <th class="metric-header">EDE</th>\n            <th class="metric-action-header">{{ \'EXECUTION_METRICS_COPY_HEADER\' | translate }}</th>\n          </tr>\n          </thead>\n          <tbody>\n          <tr ng-repeat="metric in annualMetrics">\n            <td>{{metric.labelFmt}}</td>\n            <td class="metric-row">\n              <span cam-widget-clipboard="metric[\'process-instances\'].sum.toString()"\n                    left-side="true">{{metric[\'process-instances\'].sumFmt}}</span>\n            </td>\n            <td class="metric-row">\n              <span cam-widget-clipboard="metric[\'decision-instances\'].sum.toString()"\n                    left-side="true">{{metric[\'decision-instances\'].sumFmt}}</span>\n            </td>\n            <td class="metric-row">\n              <span cam-widget-clipboard="metric[\'task-users\'].sum.toString()"\n                    left-side="true">{{metric[\'task-users\'].sumFmt}}</span>\n            </td>\n            <td class="metric-row">\n              <span cam-widget-clipboard="metric[\'flow-node-instances\'].sum.toString()"\n                    left-side="true">{{metric[\'flow-node-instances\'].sumFmt}}</span>\n            </td>\n            <td class="metric-row">\n              <span cam-widget-clipboard="metric[\'executed-decision-elements\'].sum.toString()"\n                    left-side="true">{{metric[\'executed-decision-elements\'].sumFmt}}</span>\n            </td>\n            <td class="metric-action-value">\n              <span class="hovered" cam-widget-clipboard="getClipboardText(metric)"\n                    tooltip-text="{{ \'EXECUTION_METRICS_COPY_TOOLTIP\' | translate }}"></span>\n            </td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n\n</form>\n';
      },
      50898: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/generic-confirmation.html --\x3e\n<div class="modal-header"><h3>{{ \'GENERIC_CONFIRMATION_TITLE\' | translate }}</h3></div>\n<div class="modal-body">\n  <div notifications-panel></div>\n  {{ question }}\n</div>\n<div class="modal-footer">\n  <div class="row">\n    <div class="col-xs-6 text-left">\n      <button class="btn btn-link"\n              ng-click="$dismiss()">{{ \'GENERIC_CONFIRMATION_CANCEL\' | translate }}</button>\n    </div>\n    <div class="col-xs-6 text-right">\n      <button class="btn btn-primary"\n              ng-click="delete()">{{ \'GENERIC_CONFIRMATION_PROCEED\' | translate }}</button>\n    </div>\n  </div>\n</div>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/generic-confirmation.html --\x3e\n';
      },
      29758: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/groupCreate.html --\x3e\n<section>\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{ \'GROUP_CREATE_NEW_GROUP\' | translate }}</h3>\n      </div>\n    </header>\n\n    <form class="form-horizontal"\n          name="createGroupForm">\n      <div class="col-xs-12">\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputGroupId">{{ \'GROUP_CREATE_GROUP_ID\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputGroupId"\n                   name="groupId"\n                   class="form-control"\n                   type="text"\n                   ng-model="group.id"\n                   novalidate required />\n            <span class="help-inline"\n                ng-show="createGroupForm.groupId.$error.required">{{ \'GROUP_CREATE_ID_REQUIRED\' | translate }}</span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputName">{{ \'GROUP_CREATE_GROUP_NAME\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputName"\n                   name="groupName"\n                   type="text"\n                   class="form-control"\n                   ng-model="group.name"\n                   novalidate required />\n            <span class="help-inline"\n                  ng-show="createGroupForm.groupName.$error.required">{{ \'GROUP_CREATE_NAME_REQUIRED\' | translate }}</span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputType">{{ \'GROUP_GROUP_TYPE\' | translate }}</label>\n          <div class="col-sm-8 col-md-10">\n            <input id="inputType"\n                   name="groupType"\n                   class="form-control"\n                   type="text"\n                   ng-model="group.type" />\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n            <a class="btn btn-link"\n               href="#/groups">\n              {{ \'GROUP_CREATE_CANCEL\' | translate }}\n            </a>\n\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!createGroupForm.$valid"\n                    ng-click="createGroup()">\n              {{ \'GROUP_CREATE_NEW_GROUP\' | translate }}\n            </button>\n          </div>\n        </div>\n\n      </div>\n    </form>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/groupCreate.html --\x3e\n';
      },
      5566: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/groupEdit.html --\x3e\n<section ng-cloak>\n  <aside>\n    <ul>\n      <li ng-class="activeClass(\'tab=group\')">\n        <a href="#/groups/{{group.id | escape}}?tab=group">{{ \'GROUP_EDIT_INFORMATION\' | translate }}</a>\n      </li>\n      <li ng-class="activeClass(\'tab=tenants\')">\n        <a href="#/groups/{{ group.id | escape }}?tab=tenants">{{ \'GROUP_EDIT_TENANTS_LINK\' | translate }}</a>\n      </li>\n      <li ng-class="activeClass(\'tab=users\')">\n        <a href="#/groups/{{group.id | escape}}?tab=users">{{ \'GROUP_EDIT_USERS\' | translate }}</a>\n      </li>\n    </ul>\n  </aside>\n\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3 translate="GROUP_EDIT_EDIT_GROUP"\n            translate-values="{ group: group.name }"></h3>\n      </div>\n      <div class="col-xs-4 text-right">\n        <a class="btn btn-default"\n           ng-if="show(\'tenants\')"\n           ng-click="openCreateTenantMembershipDialog()">\n           {{ \'GROUP_EDIT_ADD_TO_TENANT\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </div>\n    </header>\n\n    <form ng-show="show(\'group\')"\n          class="form-horizontal"\n          name="editGroupForm"\n          cam-widget-loader\n          loading-state="{{ groupLoadingState }}">\n      <div class="h4">{{ \'GROUP_EDIT_GROUP_DETAILS\' | translate }}</div>\n\n      <div class="form-group">\n        <label class="control-label col-sm-4 col-md-2"\n               for="inputName">{{ \'GROUP_EDIT_GROUP_NAME\' | translate }}</label>\n\n        <div class="col-sm-8 col-md-10">\n          <input id="inputName"\n                 name="groupName"\n                 class="form-control"\n                 type="text"\n                 ng-model="group.name"\n                 novalidate\n                 required />\n\n          <p class="text-danger"\n             ng-show="createGroupForm.groupName.$error.required">\n            {{ \'GROUP_EDIT_NAME_REQUIRED\' | translate }}.\n          </p>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label class="control-label col-sm-4 col-md-2"\n               for="inputType">{{ \'GROUP_EDIT_GROUP_TYPE\' | translate }}</label>\n\n        <div class="col-sm-8 col-md-10">\n          <input id="inputType"\n                 name="groupType"\n                 class="form-control"\n                 type="text"\n                 ng-model="group.type" />\n        </div>\n      </div>\n\n      <div class="form-group">\n        <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n          <button type="submit"\n                  class="btn btn-primary"\n                  ng-disabled="!canSubmit(editGroupForm, \'group\')"\n                  ng-click="updateGroup()">{{ \'GROUP_EDIT_UPDATE_GROUP\' | translate }}</button>\n        </div>\n      </div>\n    </form>\n\n    <form class="form-horizontal"\n          ng-show="show(\'group\')">\n      <div class="h4">{{ \'GROUP_EDIT_DELETE_GROUP\' | translate }}</div>\n\n      <div uib-alert class="alert alert-danger">\n        <strong>{{ \'GROUP_EDIT_WARNING\' | translate }}:</strong> {{ \'GROUP_EDIT_WARNING_DELETE\' | translate }}\n      </div>\n\n      <div class="text-right">\n        <button type="submit"\n                class="btn btn-danger"\n                ng-click="deleteGroup()">\n          {{ \'GROUP_EDIT_DELETE_GROUP\' | translate }}\n        </button>\n      </div>\n    </form>\n\n    <div ng-if="show(\'tenants\')">\n      <form class="form-horizontal"\n            name="updateTenantMemberships">\n\n        <div class="h4"\n             translate="GROUP_EDIT_TENANTS"\n             translate-values="{ group: group.name }">\n        </div>\n\n        <div cam-widget-loader\n             loading-state="{{ tenantLoadingState }}"\n             text-empty="{{ translate(\'GROUP_EDIT_MESSAGE_GROUP\', { group: group.name }) }}">\n          <table class="cam-table"\n                 ng-hide="tenantList.length == 0">\n            <thead cam-sortable-table-header\n                   default-sort-by="id"\n                   default-sort-order="asc"\n                   sorting-id="admin-sorting-groups-tenants"\n                   on-sort-change="onTenantsSortingChanged(sorting)"\n                   on-sort-initialized="onTenantsSortingChanged(sorting)">\n            <tr>\n              <th class="tenant-id"\n                  cam-sortable-table-column\n                  sort-by-property="id">{{ \'GROUP_EDIT_TENANT_ID\' | translate }}</th>\n              <th class="tenant-name"\n                  cam-sortable-table-column\n                  sort-by-property="name">{{ \'GROUP_EDIT_TENANT_NAME\' | translate }}</th>\n              <th class="action">\n                {{ \'GROUP_EDIT_ACTION\' | translate }}\n              </th>\n            </tr>\n            </thead>\n\n            <tbody>\n            <tr ng-repeat="tenant in tenantList">\n              <td class="tenant-id">\n                <a href="#/tenants/{{ tenant.id | escape }}?tab=tenant">{{ tenant.id }}</a>\n              </td>\n\n              <td class="tenant-name">\n                {{ tenant.name }}\n              </td>\n\n              <td class="action">\n                <a ng-click="removeTenant(tenant.id)">{{ \'GROUP_EDIT_REMOVE\' | translate }}</a>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n\n          <ul uib-pagination ng-if="groupTenantPages.total > groupTenantPages.size"\n            class="pagination-sm"\n\n            ng-model="groupTenantPages.current"\n            ng-change="updateGroupTenantView()"\n\n            total-items="groupTenantPages.total"\n            items-per-page="groupTenantPages.size"\n            max-size="7"\n\n            boundary-links="true"></ul>\n\n        </div>\n\n      </form>\n    </div>\n\n    <div ng-show="show(\'users\')">\n      <div class="h3">{{ \'GROUP_EDIT_GROUP_USERS\' | translate }}</div>\n\n      <div cam-widget-loader\n           loading-state="{{ userLoadingState }}"\n           text-empty="{{ translate(\'GROUP_EDIT_MESSAGE_USERS\', {group: group.name}) }}">\n        <table class="cam-table">\n          <thead cam-sortable-table-header\n                 default-sort-by="userId"\n                 default-sort-order="asc"\n                 sorting-id="admin-sorting-groups-users"\n                 on-sort-change="onUsersSortingChanged(sorting)"\n                 on-sort-initialized="onUsersSortingInitialized(sorting)">\n            <tr ng-if="canSortUserEntries">\n              <th cam-sortable-table-column\n                  sort-by-property="userId">{{ \'USERS_ID\' | translate }}</th>\n              <th cam-sortable-table-column\n                  sort-by-property="firstName">{{ \'USERS_FIRSTNAME\' | translate }}</th>\n              <th cam-sortable-table-column\n                  sort-by-property="lastName">{{ \'USERS_LASTNAME\' | translate }}</th>\n            </tr>\n            <tr ng-if="!canSortUserEntries">\n              <th>{{ \'USERS_ID\' | translate }}</th>\n              <th>{{ \'USERS_FIRSTNAME\' | translate }}</th>\n              <th>{{ \'USERS_LASTNAME\' | translate }}</th>\n            </tr>\n\n          </thead>\n          <tbody>\n            <tr ng-repeat="user in groupUserList">\n              <td><a ng-href="#/users/{{user.id | escape}}">{{ user.id }}</a></td>\n              <td>{{ user.firstName }}</td>\n              <td>{{ user.lastName }}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\x3c!-- /cam-widget-loader --\x3e\n\n      <ul uib-pagination ng-if="groupUserPages.total > groupUserPages.size"\n                  class="pagination-sm"\n\n                  ng-model="groupUserPages.current"\n                  ng-change="pageChange(groupUserPages.current)"\n\n                  total-items="groupUserPages.total"\n                  items-per-page="groupUserPages.size"\n                  max-size="7"\n\n                  boundary-links="true"\n\n                  next-text="&rsaquo;"\n                  last-text="&raquo;"\n                  previous-text="&lsaquo;"\n                  first-text="&laquo;"></ul>\n\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/groupEdit.html --\x3e\n';
      },
      19563: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/groups.html --\x3e\n<section ng-cloak>\n  \x3c!-- <aside></aside> --\x3e\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{ \'GROUPS_LIST_GROUPS\' | translate }}</h3>\n      </div>\n      <div class="col-xs-4 text-right">\n        <a href="#/group-create"\n           class="btn btn-default">\n          {{ \'GROUPS_CREATE_GROUP\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </div>\n    </header>\n\n    <div cam-searchable-area\n         config="searchConfig"\n         on-search-change="onSearchChange(query, pages)"\n         loading-state="loadingState"\n         text-empty="{{ \'GROUPS_NO_GROUPS\' | translate }}"\n         toolips="translations"\n         storage-group="\'ANG\'"\n         blocked="blocked">\n      <table class="cam-table group">\n        <thead cam-sortable-table-header\n               default-sort-by="id"\n               default-sort-order="asc"\n               sorting-id="admin-sorting-groups"\n               on-sort-change="onSortChanged(sorting)"\n               on-sort-initialized="onSortInitialized(sorting)">\n          <tr>\n            <th class="group-id"\n                cam-sortable-table-column\n                sort-by-property="id">{{ \'GROUPS_GROUP_ID\' | translate }}\n            </th>\n            <th class="group-name"\n                cam-sortable-table-column\n                sort-by-property="name">{{ \'GROUPS_GROUP_NAME\' | translate }}\n            </th>\n            <th class="group-type"\n                cam-sortable-table-column\n                sort-by-property="type">{{ \'GROUPS_GROUP_TYPE\' | translate }}\n            </th>\n            <th class="action">{{ \'GROUPS_ACTION\' | translate }}</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="group in groupList">\n            <td class="group-id">\n              <a href="#/groups/{{group.id | escape}}">{{group.id}}</a>\n            </td>\n\n            <td class="group-name">\n              {{group.name}}\n            </td>\n\n            <td class="group-type">\n              {{group.type}}\n            </td>\n\n            <td class="action">\n              <a href="#/groups/{{group.id | escape}}">{{ \'GROUPS_ACTION_EDIT\' | translate }}</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/groups.html --\x3e\n';
      },
      25060: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/setup.html --\x3e\n<section>\n  \x3c!-- <aside></aside> --\x3e\n  <div class="section-content"\n       id="users"\n       ng-switch on="created">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{ \'SETUP_SETUP\' | translate }}</h3>\n      </div>\n      <div class="col-xs-4 text-right">\n      </div>\n    </header>\n\n    <div class="row"\n         ng-switch-when="true">\n      <div class="col-md-12">\n\n        <div uib-alert class="alert alert-success">\n          <strong>{{ \'SETUP_USER_CREATED\' | translate }}</strong>\n          {{ \'SETUP_USER_INITIAL\' | translate }}\n        </div>\n\n        {{ \'SETUP_USER_REDIRECT_1\' | translate }} <a href="./#/login">{{ \'SETUP_USER_REDIRECT_2\' | translate }}</a> {{ \'SETUP_USER_REDIRECT_3\' | translate }}\n      </div>\n    </div>\n\n    <div class="row"\n         ng-switch-when="false">\n      <div class="col-md-8 box">\n\n        <div notifications-panel\n             class="notifications-panel"></div>\n\n        <form class="form-horizontal"\n              name="createUserForm">\n          <div class="h4">{{ \'SETUP_USER_ACCOUNT\' | translate }}</div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                   for="inputUserId">{{ \'SETUP_USER_ID\' | translate }}</label>\n\n            <div class="col-sm-8">\n              <input id="inputUserId"\n                     name="userId"\n                     class="form-control"\n                     type="text"\n                     ng-model="profile.id"\n                     novalidate required></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.userId.$error.required">\n                {{ \'SETUP_USER_ID_REQUIRED\' | translate }}\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                   for="inputPassword">{{ \'SETUP_USER_PASSWORD\' | translate }}</label>\n\n            <div class="col-sm-8">\n              <div cam-widget-password\n                   cam-widget-password-profile="profile"\n                   cam-widget-password-password="credentials.password"\n                   cam-widget-password-valid="credentials.valid"></div>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.inputPassword.$error.password">\n                {{ \'SETUP_USER_PASSWORD_LENGTH\' | translate }}\n              </span>\n              <span class="help-inline"\n                    ng-show="createUserForm.inputPassword.$error.required">\n                {{ \'SETUP_USER_PASSWORD_REQUIRED\' | translate }}\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                   for="inputPasswordRepeat">{{ \'SETUP_USER_PASSWORD_REPEAT\' | translate }}</label>\n\n            <div class="col-sm-8">\n              <input id="inputPasswordRepeat"\n                  name="inputPasswordRepeat"\n                  class="form-control"\n                  type="password"\n                  ng-model="credentials.password2"\n                  data-password-repeat="credentials.password"></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.inputPasswordRepeat.$error.passwordRepeat">\n                {{ \'SETUP_USER_PASSWORD_MUST_MATCH\' | translate }}\n              </span>\n            </div>\n          </div>\n\n          <div class="h4">{{ \'SETUP_USER_PROFILE\' | translate }}</div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                for="inputFirstname">{{ \'SETUP_USER_FIRSTNAME\' | translate }}</label>\n\n            <div class="col-sm-8">\n              <input id="inputFirstname"\n                     name="firstname"\n                     type="text"\n                     class="form-control"\n                     ng-model="profile.firstName"\n                     novalidate\n                     required></input>\n\n              <span class="help-inline text-danger"\n                    ng-show="createUserForm.firstname.$error.required">\n                {{ \'SETUP_USER_FIRSTNAME_REQUIRED\' | translate }}\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                for="inputLastname">{{ \'SETUP_USER_LASTNAME\' | translate }}</label>\n\n            <div class="col-sm-8">\n              <input id="inputLastname"\n                  type="text"\n                  class="form-control"\n                  ng-model="profile.lastName"\n                  novalidate\n                  required></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.firstname.$error.required">\n                {{ \'SETUP_USER_LASTNAME_REQUIRED\' | translate }}\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <label class="control-label col-sm-4"\n                for="inputEmail">{{ \'SETUP_USER_EMAIL\' | translate }}</label>\n\n            <div class="col-sm-8">\n              <input id="inputEmail"\n                  name="email"\n                  type="text"\n                  class="form-control"\n                  ng-model="profile.email"\n                  data-email></input>\n\n              <span class="help-inline"\n                    ng-show="createUserForm.email.$error.email">\n                {{ \'SETUP_USER_EMAIL_NOT_VALID\' | translate }}\n              </span>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <div class="col-sm-8 col-sm-offset-4">\n              <button type="submit"\n                      class="btn btn-primary"\n                      ng-disabled="!createUserForm.$valid || !credentials.valid"\n                      ng-click="createUser()">{{ \'SETUP_USER_NEW_USER\' | translate }}</button>\n            </div>\n          </div>\n\n        </form>\n      </div>\n\n      <div class="col-md-4">\n        <div class="well">\n          <div class="h4">{{ \'SETUP_USER_MESSAGE_1\' | translate }}</div>\n          <p>{{ \'SETUP_USER_MESSAGE_2\' | translate }}<strong>{{ engineName }}</strong>\n          {{ \'SETUP_USER_MESSAGE_3\' | translate }}\n          {{ \'SETUP_USER_MESSAGE_4\' | translate }}</p>\n          <p>\n            <a href="https://docs.camunda.org/manual/installation/"\n               class="btn btn-success">\n              {{ \'SETUP_USER_MESSAGE_5\' | translate }}\n            </a>\n          </p>\n        </div>\n        </div>\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/setup.html --\x3e\n';
      },
      10354: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/system.html --\x3e\n<section ng-cloak>\n  <aside>\n    <ul>\n      <li ng-class="activeClass(\'section=\'+systemSettingsProvider.id)"\n          ng-if="!!systemSettingsProvider.accessible"\n          ng-repeat="systemSettingsProvider in systemSettingsProviders">\n        <a href="#/system/?section={{systemSettingsProvider.id}}">\n          {{systemSettingsProvider.label | translate}}\n        </a>\n      </li>\n    </ul>\n  </aside>\n\n  <div class="section-content">\n    <view provider="activeSettingsProvier" />\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/system.html --\x3e\n';
      },
      19109: function (t) {
        "use strict";
        t.exports =
          "\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/systemSettingsGeneral.html --\x3e\n<form>\n  <h3>{{ 'SYSTEM_GENERAL_SETTINGS' | translate }}</h3>\n\n  <div uib-alert class=\"alert alert-success\">\n    <span class=\"glyphicon glyphicon-thumbs-up\"></span>\n    <strong>{{ 'SYSTEM_PROCESS_ENGINE' | translate }}</strong> <code>{{processEngineName}}</code> {{ 'SYSTEM_PROCESS_RUNNING' | translate }}\n  </div>\n\n</form>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/systemSettingsGeneral.html --\x3e\n";
      },
      74851: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-admin-ui/client/scripts/pages/tenantCreate.html --\x3e\n<section>\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3> {{ \'TENANTS_CREATE_TENANT\' | translate }}</h3>\n      </div>\n    </header>\n\n    <form class="form-horizontal"\n          name="createTenantForm">\n      <div class="col-xs-12">\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputTenantId">{{ \'TENANTS_TENANT_ID\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputTenantId"\n                   name="tenantId"\n                   class="form-control"\n                   type="text"\n                   ng-model="tenant.id"\n                   novalidate required />\n            <span class="help-inline"\n                ng-show="createTenantForm.tenantId.$error.required">{{ \'TENANTS_ID_REQUIRED\' | translate }}</span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputName">{{ \'TENANTS_TENANT_NAME\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputTenantName"\n                   name="name"\n                   type="text"\n                   class="form-control"\n                   ng-model="tenant.name"\n                   novalidate required />\n            <span class="help-inline"\n                ng-show="createTenantForm.name.$error.required">{{ \'TENANTS_NAME_REQUIRED\' | translate }}</span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n            <a class="btn btn-link"\n               href="#/tenants">\n              {{ \'TENANTS_CANCEL\' | translate }}\n            </a>\n\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!createTenantForm.$valid"\n                    ng-click="createTenant()">\n              {{ \'TENANTS_CREATE_TENANT\' | translate }}\n            </button>\n          </div>\n        </div>\n\n      </div>\n    </form>\n  </div>\n</section>\n\x3c!-- / CE - camunda-admin-ui/client/scripts/pages/tenantCreate.html --\x3e\n';
      },
      67703: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-admin-ui/client/scripts/pages/tenantEdit.html --\x3e\n<section ng-cloak>\n  <aside>\n    <ul>\n      <li ng-class="activeClass(\'tab=tenant\')">\n        <a href="#/tenants/{{ tenant.id | escape }}?tab=tenant">{{ \'TENANTS_INFORMATION\' | translate }}</a>\n      </li>\n      <li ng-class="activeClass(\'tab=groups\')">\n        <a href="#/tenants/{{ tenant.id | escape }}?tab=groups">{{ \'TENANTS_GROUPS\' | translate }}</a>\n      </li>\n      <li ng-class="activeClass(\'tab=users\')">\n        <a href="#/tenants/{{ tenant.id | escape }}?tab=users">{{ \'TENANTS_USERS\' | translate }}</a>\n      </li>\n    </ul>\n  </aside>\n\n  <div class="section-content">\n    <form ng-show="show(\'tenant\')"\n          class="form-horizontal"\n          name="editTenantForm"\n          cam-widget-loader\n          loading-state="{{ tenantLoadingState }}">\n      <div class="h3">{{ tenant.name }}</div>\n\n      <div class="form-group">\n        <label class="control-label col-sm-4 col-md-2"\n               for="inputName">{{ \'TENANTS_TENANT_NAME\' | translate }}</label>\n\n        <div class="col-sm-8 col-md-10">\n          <input id="inputName"\n                 name="tenantName"\n                 class="form-control"\n                 type="text"\n                 ng-model="tenant.name"\n                 novalidate\n                 required />\n\n          <p class="text-danger"\n             ng-show="editTenantForm.tenantName.$error.required">\n            {{ \'TENANTS_NAME_REQUIRED\' | translate }}\n          </p>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n          <button type="submit"\n                  class="btn btn-primary"\n                  ng-disabled="!canSubmit(editTenantForm, \'tenant\')"\n                  ng-click="updateTenant()">{{ \'TENANTS_UPDATE_TENANT\' | translate }}</button>\n        </div>\n      </div>\n    </form>\n\n    <form class="form-horizontal"\n          ng-show="show(\'tenant\')">\n      <div class="h4">{{ \'TENANTS_DELETE_TENANT\' | translate }}</div>\n\n      <div uib-alert class="alert alert-danger">\n        <strong>{{ \'TENANTS_WARNING\' | translate }}</strong> {{ \'TENANTS_DELETING_TENANT_UNDONE\' | translate }}\n      </div>\n\n      <div class="text-right">\n        <button type="submit"\n                class="btn btn-danger"\n                ng-click="deleteTenant()">\n          {{ \'TENANTS_DELETE_TENANT\' | translate }}\n        </button>\n      </div>\n    </form>\n\n    <div ng-show="show(\'users\')">\n      <div class="h4">{{ \'TENANTS_TENANT_USERS\' | translate }}</div>\n\n      <div cam-widget-loader\n           loading-state="{{ userLoadingState }}"\n           text-empty="{{ translate(\'TENANTS_NO_USERS\', { tenant: tenant.name }) }}">\n        <table class="cam-table">\n          <thead cam-sortable-table-header\n                 default-sort-by="userId"\n                 default-sort-order="asc"\n                 sorting-id="admin-sorting-tenants-users"\n                 on-sort-change="onUsersSortingChanged(sorting)"\n                 on-sort-initialized="onUsersSortingInitialized(sorting)">\n            <tr ng-if="canSortUserEntries">\n              <th cam-sortable-table-column\n                  sort-by-property="userId">{{ \'USERS_ID\' | translate }}</th>\n              <th cam-sortable-table-column\n                  sort-by-property="firstName">{{ \'USERS_FIRSTNAME\' | translate }}</th>\n              <th cam-sortable-table-column\n                  sort-by-property="lastName">{{ \'USERS_LASTNAME\' | translate }}</th>\n            </tr>\n            <tr ng-if="!canSortUserEntries">\n              <th>{{ \'USERS_ID\' | translate }}</th>\n              <th>{{ \'USERS_FIRSTNAME\' | translate }}</th>\n              <th>{{ \'USERS_LASTNAME\' | translate }}</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr ng-repeat="user in tenantUserList">\n              <td><a ng-href="#/users/{{ user.id | escape }}">{{ user.id }}</a></td>\n              <td>{{ user.firstName }}</td>\n              <td>{{ user.lastName }}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\x3c!-- /cam-widget-loader --\x3e\n\n      <ul uib-pagination ng-if="tenantUserPages.total > tenantUserPages.size"\n                  class="pagination-sm"\n\n                  ng-model="tenantUserPages.current"\n                  ng-change="pageChange(tenantUserPages.current)"\n\n                  total-items="tenantUserPages.total"\n                  items-per-page="tenantUserPages.size"\n                  max-size="7"\n\n                  boundary-links="true"\n\n                  next-text="&rsaquo;"\n                  last-text="&raquo;"\n                  previous-text="&lsaquo;"\n                  first-text="&laquo;"></ul>\n\n    </div>\n\n    <div ng-show="show(\'groups\')">\n      <div class="h4">{{ \'TENANTS_TENANT_GROUPS\' | translate }}</div>\n\n      <div cam-widget-loader\n           loading-state="{{ groupLoadingState }}"\n           text-empty="{{ translate(\'TENANTS_NO_GROUPS\', { tenant: tenant.name }) }}">\n        <table class="cam-table">\n          <thead cam-sortable-table-header\n                 default-sort-by="name"\n                 default-sort-order="asc"\n                 sorting-id="admin-sorting-tenants-groups"\n                 on-sort-change="onGroupsSortingChanged(sorting)"\n                 on-sort-initialized="onGroupsSortingInitialized(sorting)">\n            <tr>\n              <th cam-sortable-table-column\n                  sort-by-property="name">{{ \'TENANTS_NAME\' | translate }}</th>\n            </tr>\n          </thead>\n          <tbody>\n          <tr ng-repeat="group in tenantGroupList">\n            <td><a ng-href="#/groups/{{ group.id | escape }}">{{ group.name }}</a></td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\x3c!-- /cam-widget-loader --\x3e\n\n      <ul uib-pagination ng-if="tenantGroupPages.total > tenantGroupPages.size"\n                  class="pagination-sm"\n\n                  ng-model="tenantGroupPages.current"\n                  ng-change="pageChange(tenantGroupPages.current)"\n\n                  total-items="tenantGroupPages.total"\n                  items-per-page="tenantGroupPages.size"\n                  max-size="7"\n\n                  boundary-links="true"\n\n                  next-text="&rsaquo;"\n                  last-text="&raquo;"\n                  previous-text="&lsaquo;"\n                  first-text="&laquo;"></ul>\n\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-admin-ui/client/scripts/pages/tenantEdit.html --\x3e\n';
      },
      69952: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-admin-ui/client/scripts/pages/tenant.html --\x3e\n<section ng-cloak>\n  \x3c!-- <aside></aside> --\x3e\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{ \'TENANTS_LIST_OF_TENANTS\' | translate }}</h3>\n      </div>\n      <div class="col-xs-4 text-right">\n        <a href="#/tenant-create"\n           class="btn btn-default">\n          {{ \'TENANTS_CREATE_TENANT\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </div>\n    </header>\n\n    <div cam-searchable-area\n         config="searchConfig"\n         on-search-change="onSearchChange(query, pages)"\n         loading-state="loadingState"\n         text-empty="{{ \'TENANTS_NO_TENANTS\' | translate }}"\n         storage-group="\'ANT\'"\n         blocked="blocked">\n      <table class="cam-table tenant">\n        <thead cam-sortable-table-header\n               default-sort-by="id"\n               default-sort-order="asc"\n               sorting-id="admin-sorting-tenants"\n               on-sort-change="onSortChanged(sorting)"\n               on-sort-initialized="onSortInitialized(sorting)">\n          <tr>\n            <th class="tenant-id"\n                cam-sortable-table-column\n                sort-by-property="id">{{ \'TENANTS_TENANT_ID\' | translate }}\n            </th>\n            <th class="tenant-name"\n                cam-sortable-table-column\n                sort-by-property="name">{{ \'TENANTS_TENANT_NAME\' | translate }}\n            </th>\n            <th class="action">{{ \'TENANTS_ACTION\' | translate }}</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="tenant in tenantList">\n            <td class="tenant-id">\n              <a ng-href="#/tenants/{{ tenant.id | escape }}">{{ tenant.id }}</a>\n            </td>\n\n            <td class="tenant-name">\n              {{ tenant.name }}\n            </td>\n\n            <td class="action">\n              <a ng-href="#/tenants/{{ tenant.id | escape }}">{{ \'TENANTS_EDIT\' | translate }}</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-admin-ui/client/scripts/pages/tenant.html --\x3e\n';
      },
      65052: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/userCreate.html --\x3e\n<section ng-cloak>\n  \x3c!-- <aside></aside> --\x3e\n  <div class="section-content">\n    <form class="form-horizontal"\n          name="createUserForm">\n      <div class="col-xs-12">\n        <div class="h3">{{ \'USERS_USER_ACCOUNT\' | translate }}</div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputUserId">{{ \'USERS_USER_ID\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputUserId"\n                   name="userId"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.id"\n                   novalidate\n                   required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.userId.$error.required">\n              {{ \'USERS_USER_ID_REQUIRED\' | translate }}\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputPassword">{{ \'USERS_PASSWORD\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n              <div cam-widget-password\n                   cam-widget-password-profile="profile"\n                   cam-widget-password-password="credentials.password"\n                   cam-widget-password-valid="credentials.valid"></div>\n\n            <span class="help-inline"\n                  ng-show="createUserForm.inputPassword.$error.password">\n              {{ \'USERS_PASSWORD_INVALID\' | translate }}\n            </span>\n\n            <span class="help-inline"\n                  ng-show="createUserForm.inputPassword.$error.required">\n              {{ \'USERS_PASSWORD_REQUIRED\' | translate }}\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputPasswordRepeat">{{ \'USERS_PASSWORD_REPEAT\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputPasswordRepeat"\n                   name="inputPasswordRepeat"\n                   class="form-control"\n                   type="password"\n                   ng-model="credentials.password2"\n                   data-password-repeat="credentials.password" />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.inputPasswordRepeat.$error.passwordRepeat">\n              {{ \'USERS_PASSWORDS_NOT_EQUAL\' | translate }}\n            </span>\n          </div>\n        </div>\n\n        <div class="h3">{{ \'USERS_USER_PROFILE\' | translate }}</div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputFirstname">{{ \'USERS_FIRSTNAME\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputFirstname"\n                   name="firstname"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.firstName"\n                   novalidate\n                   required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.firstname.$error.required">\n              {{ \'USERS_FIRSTNAME_REQUIRED\' | translate }}\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputLastname">{{ \'USERS_LASTNAME\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputLastname"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.lastName"\n                   novalidate\n                   required />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.firstname.$error.required">\n              {{ \'USERS_LASTNAME_REQUIRED\' | translate }}\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n              for="inputEmail">{{ \'USERS_EMAIL\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputEmail"\n                   name="email"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.email"\n                   data-email />\n\n            <span class="help-inline"\n                  ng-show="createUserForm.email.$error.email">\n              {{ \'USERS_EMAIL_INVALID\' | translate }}\n            </span>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n            <a class="btn btn-link"\n               href="#/users">{{ \'USERS_CANCEL\' | translate }}</a>\n\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!createUserForm.$valid || !credentials.valid"\n                    ng-click="createUser()">{{ \'USERS_CREATE_NEW_USER\' | translate }}</button>\n          </div>\n        </div>\n\n      </div>\n    </form>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/userCreate.html --\x3e\n';
      },
      36868: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/userEdit.html --\x3e\n<section>\n  <aside>\n    <ul>\n      <li ng-class="activeClass(\'profile\')">\n        <a href="#/users/{{user.id | escape}}?tab=profile">{{ \'USERS_PROFILE\' | translate }}</a>\n      </li>\n\n      <li ng-class="activeClass(\'account\')">\n        <a href="#/users/{{user.id | escape}}?tab=account">{{ \'USERS_ACCOUNT\' | translate }}</a>\n      </li>\n\n      <li ng-class="activeClass(\'groups\')">\n        <a href="#/users/{{user.id | escape}}?tab=groups">{{ \'USERS_GROUPS\' | translate }}</a>\n      </li>\n\n      <li ng-class="activeClass(\'tenants\')">\n        <a href="#/users/{{user.id | escape}}?tab=tenants">{{ \'USERS_TENANTS\' | translate }}</a>\n      </li>\n    </ul>\n  </aside>\n\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{ \'USERS_EDIT_USER\' | translate }} {{user.firstName}} {{user.lastName}}</h3>\n      </div>\n      <div class="col-xs-4 text-right">\n        <a class="btn btn-default"\n           ng-if="show(\'groups\')"\n           ng-click="openCreateGroupMembershipDialog()">\n          {{ \'USERS_ADD_TO_A_GROUP\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n\n        <a class="btn btn-default"\n           ng-if="show(\'tenants\')"\n           ng-click="openCreateTenantMembershipDialog()">\n          {{ \'USERS_ADD_TO_A_TENANT\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </div>\n    </header>\n\n    <div ng-if="show(\'profile\')">\n      <p ng-if="!profile">\n        <span class="glyphicon glyphicon-loading"></span>\n        {{ \'USERS_LOADING_PROFILE\' | translate }}\n      </p>\n\n      <form class="form-horizontal"\n            name="editProfileForm"\n            ng-if="profile">\n        <div class="h4">{{ \'USERS_PROFILE\' | translate }}</div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputFirstname">{{ \'USERS_FIRSTNAME\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputFirstname"\n                   name="firstname"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.firstName"\n                   novalidate\n                   required/>\n\n            <p class="help-block"\n               ng-show="editProfileForm.firstname.$error.required">\n              {{ \'USERS_FIRSTNAME_REQUIRED\' | translate }}\n            </p>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputLastname">{{ \'USERS_LASTNAME\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputLastname"\n                   type="text"\n                   class="form-control"\n                   ng-model="profile.lastName"\n                   novalidate\n                   required />\n\n            <p class="help-block"\n               ng-show="editProfileForm.firstname.$error.required">\n              {{ \'USERS_LASTNAME_REQUIRED\' | translate }}\n            </p>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputEmail">{{ \'USERS_EMAIL\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputEmail"\n                   name="email"\n                   class="form-control"\n                   type="text"\n                   ng-model="profile.email"\n                   data-email />\n\n            <p class="help-block"\n               ng-show="editProfileForm.email.$error.email">\n              {{ \'USERS_EMAIL_INVALID\' | translate }}\n            </p>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!canSubmit(editProfileForm, \'profile\')"\n                    ng-click="updateProfile()">\n              {{ \'USERS_UPDATE_PROFILE\' | translate }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </div>\n\n    <div ng-if="show(\'account\')">\n      <form class="form-horizontal"\n            name="updateCredentialsForm">\n\n        <div class="h4">{{ \'USERS_CHANGE_PASSWORD\' | translate }}</div>\n\n        <p>{{ \'USERS_TYPE_NEW_PASSWORD\' | translate }}</p>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputAuthenticationUserPassword"\n                 ng-if="userId === authenticatedUser">\n            {{ \'USERS_OLD_PASSWORD\' | translate }}\n          </label>\n\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputAuthenticationUserPassword"\n                 ng-if="userId !== authenticatedUser">\n            {{ currentUserPassword }}\n          </label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputAuthenticationUserPassword"\n                   name="inputAuthenticationUserPassword"\n                   class="form-control"\n                   type="password"\n                   ng-model="credentials.authenticatedUserPassword"\n                   required />\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n                 for="inputPassword">{{ \'USERS_NEW_PASSWORD\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <div cam-widget-password\n                 cam-widget-password-profile="persistedProfile"\n                 cam-widget-password-password="credentials.password"\n                 cam-widget-password-valid="credentials.valid"></div>\n\n            <p class="text-danger"\n               ng-show="updateCredentialsForm.inputPassword.$error.password">\n              {{ \'USERS_PASSWORD_INVALID\' | translate }}\n            </p>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label class="control-label col-sm-4 col-md-2"\n              for="inputPasswordRepeat">{{ \'USERS_NEW_PASSWORD_REPEAT\' | translate }}</label>\n\n          <div class="col-sm-8 col-md-10">\n            <input id="inputPasswordRepeat"\n                   name="inputPasswordRepeat"\n                   class="form-control"\n                   type="password"\n                   ng-model="credentials.password2"\n                   data-password-repeat="credentials.password" />\n\n            <p class="text-danger"\n               ng-show="updateCredentialsForm.inputPasswordRepeat.$error.passwordRepeat">\n              {{ \'USERS_PASSWORDS_NOT_EQUAL\' | translate }}\n            </p>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <div class="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-2 text-right">\n            <button type="submit"\n                    class="btn btn-primary"\n                    ng-disabled="!canSubmit(updateCredentialsForm)"\n                    ng-click="updateCredentials(updateCredentialsForm)">{{ \'USERS_CHANGE_PASSWORD\' | translate }}</button>\n          </div>\n        </div>\n      </form>\n\n\n      <form class="form-horizontal">\n\n        <div class="h4">{{ \'USERS_DELETE_USER\' | translate }}</div>\n\n        <div uib-alert class="alert alert-danger">\n          <strong>{{ \'USERS_WARNING\' | translate }}</strong> {{ \'USERS_DELETING_UNDONE\' | translate }}\n        </div>\n\n        <div class="text-right">\n          <button type="submit"\n                  class="btn btn-danger"\n                  ng-click="deleteUser()">\n            {{ \'USERS_DELETE_USER\' | translate }}\n          </button>\n        </div>\n      </form>\n      <form class="form-horizontal">\n        <div class="h4">{{ \'USERS_UNLOCK_USER\' | translate }}</div>\n        <div uib-alert class="alert alert-info">\n          <strong>{{ \'USERS_NOTICE\' | translate }}</strong> {{ \'USERS_UNLOCKING_USER\' | translate }}\n        </div>\n        <div class="text-right">\n          <button type="submit"\n                  class="btn btn-primary"\n                  ng-click="unlockUser()">\n            <span class="glyphicon glyphicon-lock"></span>\n            {{ \'USERS_UNLOCK_USER\' | translate }}\n          </button>\n        </div>\n      </form>\n    </div>\n\n    <div ng-if="show(\'groups\')">\n      <form class="form-horizontal"\n            name="updateGroupMemberships">\n\n        <div class="h4"\n             translate="USERS_FIRSTNAME_LASTNAME_GROUPS"\n             translate-values=\'{firstname: user.firstName, lastname: user.lastName}\'>\n        </div>\n\n        <div cam-widget-loader\n             loading-state="{{ groupLoadingState }}"\n             text-empty="{{ translate(\'USERS_NOT_MEMBER_GROUP\', { firstname: user.firstName, lastname: user.lastName }) }}">\n          <table class="cam-table"\n                 ng-hide="groupList.length == 0">\n            <thead cam-sortable-table-header\n                   default-sort-by="id"\n                   default-sort-order="asc"\n                   sorting-id="admin-sorting-users-groups"\n                   on-sort-change="onGroupsSortingChanged(sorting)">\n              <tr>\n                <th class="group-id"\n                    cam-sortable-table-column\n                    sort-by-property="id">{{ \'USERS_GROUP_ID\' | translate }}</th>\n                <th class="group-name"\n                    cam-sortable-table-column\n                    sort-by-property="name">{{ \'USERS_GROUP_NAME\' | translate }}</th>\n                <th class="group-type"\n                    cam-sortable-table-column\n                    sort-by-property="type">{{ \'USERS_GROUP_TYPE\' | translate }}</th>\n                <th class="action">\n                  {{ \'USERS_ACTION\' | translate }}\n                </th>\n              </tr>\n            </thead>\n\n            <tbody>\n              <tr ng-repeat="group in groupList">\n                <td class="group-id">\n                  <a href="#/groups/{{group.id | escape}}?tab=group">{{group.id}}</a>\n                </td>\n\n                <td class="group-name">\n                  {{group.name}}\n                </td>\n\n                <td class="group-type">\n                  {{group.type}}\n                </td>\n\n                <td class="action">\n                  <a ng-click="removeGroup(group.id)">{{ \'USERS_REMOVE\' | translate }}</a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <div cam-pagination="onPaginationChange(pages)" total="pages.total"></div>\n        </div>\n\n      </form>\n    </div>\n\n    <div ng-if="show(\'tenants\')">\n      <form class="form-horizontal"\n            name="updateTenantMemberships">\n\n        <div class="h4"\n             translate="USERS_FIRSTNAME_LASTNAME_TENANTS"\n             translate-values=\'{firstname: user.firstName, lastname: user.lastName}\'>\n        </div>\n\n        <div cam-widget-loader\n             loading-state="{{ tenantLoadingState }}"\n             text-empty="{{ translate(\'USERS_NOT_MEMBER_TENTANT\', { firstname: user.firstName, lastname: user.lastName }) }}">\n          <table class="cam-table"\n                 ng-hide="tenantList.length == 0">\n            <thead cam-sortable-table-header\n                   default-sort-by="id"\n                   default-sort-order="asc"\n                   sorting-id="admin-sorting-users-tenants"\n                   on-sort-change="onTenantsSortingChanged(sorting)"\n                   on-sort-initialized="onTenantsSortingChanged(sorting)">\n            <tr>\n              <th class="tenant-id"\n                    cam-sortable-table-column\n                    sort-by-property="id">{{ \'USERS_TENANT_ID\' | translate }}</th>\n              <th class="tenant-name"\n                    cam-sortable-table-column\n                    sort-by-property="name">{{ \'USERS_TENANT_NAME\' | translate }}</th>\n              <th class="action">\n                {{ \'USERS_ACTION\' | translate }}\n              </th>\n            </tr>\n            </thead>\n\n            <tbody>\n            <tr ng-repeat="tenant in tenantList">\n              <td class="tenant-id">\n                <a href="#/tenants/{{ tenant.id | escape }}?tab=tenant">{{ tenant.id }}</a>\n              </td>\n\n              <td class="tenant-name">\n                {{ tenant.name }}\n              </td>\n\n              <td class="action">\n                <a ng-click="removeTenant(tenant.id)">{{ \'USERS_REMOVE\' | translate }}</a>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n      </form>\n      <ul uib-pagination\n          ng-if="tenantPages.total > tenantPages.size"\n          class="pagination-sm"\n\n          page="tenantPages.current"\n          ng-model="tenantPages.current"\n          ng-change="loadTenants()"\n\n          total-items="tenantPages.total"\n          items-per-page="tenantPages.size"\n\n          max-size="7"\n          boundary-links="true"></ul>\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/userEdit.html --\x3e\n';
      },
      94249: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/users.html --\x3e\n<section ng-cloak>\n  \x3c!-- <aside></aside> --\x3e\n  <div class="section-content">\n    <header class="row">\n      <div class="col-xs-8">\n        <h3>{{ \'USERS_LIST_OF_USERS\' | translate }}</h3>\n      </div>\n      <div class="col-xs-4 text-right">\n        <a class="btn btn-default"\n           href="#/user-create">\n          {{ \'USERS_ADD_USER\' | translate }}\n          <span class="glyphicon glyphicon-plus-sign"></span>\n        </a>\n      </div>\n    </header>\n\n    <div cam-searchable-area\n         config="searchConfig"\n         on-search-change="onSearchChange(query, pages)"\n         loading-state="loadingState"\n         text-empty="{{ \'USERS_NOT_FOUND\' | translate }}"\n         storage-group="\'ANU\'"\n         blocked="blocked">\n      <table class="cam-table">\n        <thead cam-sortable-table-header\n               default-sort-by="userId"\n               default-sort-order="asc"\n               sorting-id="admin-sorting-users"\n               on-sort-change="onSortChanged(sorting)"\n               on-sort-initialized="onSortInitialized(sorting)">\n          <tr ng-if="canSortEntries">\n            <th class="username"\n                cam-sortable-table-column\n                sort-by-property="userId">{{ \'USERS_ID\' | translate }}\n            </th>\n            <th class="firstname"\n                cam-sortable-table-column\n                sort-by-property="firstName">{{ \'USERS_FIRSTNAME\' | translate }}\n            </th>\n            <th class="lastname"\n                cam-sortable-table-column\n                sort-by-property="lastName">{{ \'USERS_LASTNAME\' | translate }}\n            </th>\n            <th class="email"\n                cam-sortable-table-column\n                sort-by-property="email">{{ \'USERS_EMAIL\' | translate }}\n            </th>\n            <th class="action">{{ \'USERS_ACTION\' | translate }}</th>\n          </tr>\n          <tr ng-if="!canSortEntries">\n            <th class="username">{{ \'USERS_ID\' | translate }}</th>\n            <th class="firstname">{{ \'USERS_FIRSTNAME\' | translate }}</th>\n            <th class="lastname">{{ \'USERS_LASTNAME\' | translate }}</th>\n            <th class="email">{{ \'USERS_EMAIL\' | translate }}</th>\n            <th class="action">{{ \'USERS_ACTION\' | translate }}</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr ng-repeat="user in userList">\n            <td class="username">\n              <a href="#/users/{{user.id | escape}}">{{user.id}}</a>\n            </td>\n\n            <td class="firstname">\n              {{user.firstName}}\n            </td>\n\n            <td class="lastname">\n              {{user.lastName}}\n            </td>\n\n            <td class="email">\n              {{user.email}}\n            </td>\n\n            <td class="action">\n              <a ng-href="#/users/{{user.id | escape}}">{{ \'USERS_EDIT\' | translate }}</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</section>\n\x3c!-- / CE - camunda-bpm-webapp/ui/admin/client/scripts/pages/users.html --\x3e\n';
      },
      92219: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - camunda-bpm-webapp/ui/common/scripts/directives/breadcrumbs.html --\x3e\n<ul class="cam-breadcrumb">\n  <li ng-class="{ active: !breadcrumbs || !breadcrumbs.length }">\n    <a href="#/"\n       class="text">{{ \'DASHBOARD_DASHBOARD\' | translate }}</a>\n  </li>\n\n  <li ng-repeat="(index, crumb) in breadcrumbs"\n      ng-class="{ active: !!$last }"\n      data-index="{{ index }}">\n    <span class="divider" ng-click="crumb.hidden = !crumb.hidden">{{ crumb.divider || divider }}</span>\n\n    \x3c!-- using ng-show to separate logic of creating breadcrumbs elements from\n         logic of dynamically showing and hidding them --\x3e\n    <a ng-if="!!crumb.href && !$last"\n       ng-show="!crumb.hidden"\n       href="{{ getHref(crumb) }}"\n       class="text">{{ crumb.label | translate }}</a>\n\n    <span ng-if="!!crumb.href && !!$last"\n          ng-show="!crumb.hidden"\n          class="text">{{ crumb.label }}</span>\n\n    <a ng-if="!crumb.href && !!crumb.callback"\n       ng-show="!crumb.hidden"\n       ng-click="crumb.callback(index, breadcrumbs)"\n       href\n       class="text">{{ crumb.label }}</a>\n\n    <span ng-if="!crumb.href && !crumb.callback"\n          ng-show="!crumb.hidden"\n          class="text">{{ crumb.label | translate }}</span>\n\n    <span ng-if="(crumb.type === \'processDefinition\' && crumb.processDefinition.suspended) || (crumb.type === \'processInstance\' && crumb.processInstance.suspended)"\n          ng-show="!crumb.hidden"\n          class="badge badge-warning badge-suspended"\n          uib-tooltip="{{ \'BREAD_CRUMBS_CURRENTLY_SUSPENDED\' | translate }}"\n          tooltip-placement="bottom">\n      <span class="glyphicon glyphicon-pause white"></span>\n    </span>\n\n    <span ng-if="!!crumb.choices && crumb.choices.length === 1" ng-show="!crumb.hidden">\n      <span class="divider">:</span>\n      {{ getActiveChoice(crumb.choices) | translate }}\n    </span>\n\n    <span ng-if="!!crumb.choices && crumb.choices.length === 2"\n          class="switcher"\n          ng-show="!crumb.hidden"\n          ng-init="choices = sortedChoices(crumb.choices)">\n      <span class="divider">:</span>\n\n      <span class="current">{{ choices[0].label | translate}}</span>\n      <span class="divider">|</span>\n      <a href ng-click="selectChoice($event, choices[1])">{{ choices[1].label | translate}}</a>\n    </span>\n\n    <span ng-if="!!crumb.choices && crumb.choices.length > 2"\n          ng-show="!crumb.hidden"\n          class="dropdown"\n          uib-dropdown>\n      <span class="divider">:</span>\n\n      <a class="dropdown-toggle"\n         uib-dropdown-toggle\n         ng-show="!crumb.hidden"\n         href>\n        {{ getActiveChoice(crumb.choices) }}\n        <span class="caret"></span>\n      </a>\n\n      <ul class="dropdown-menu dropdown-menu-right" ng-show="!crumb.hidden" uib-dropdown-menu>\n        <li ng-repeat="choice in crumb.choices"\n            ng-class="{active: choice.active}">\n          <a href ng-click="selectChoice($event, choice)">{{ choice.label }}</a>\n        </li>\n      </ul>\n    </span>\n  </li>\n</ul>\n\x3c!-- / CE - camunda-bpm-webapp/ui/common/scripts/directives/breadcrumbs.html --\x3e\n';
      },
      76624: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- CE # camunda-bpm-webapp/ui/common/scripts/module/components/cam-pagination.html --\x3e\n<ul uib-pagination ng-if="Pagination.total > Pagination.pages.size"\n            class="pagination-sm"\n\n            page="Pagination.pages.current"\n            ng-model="Pagination.pages.current"\n\n            total-items="Pagination.total"\n            items-per-page="Pagination.pages.size"\n\n            max-size="7"\n            boundary-links="true"></ul>\n\x3c!-- CE / camunda-bpm-webapp/ui/common/scripts/module/components/cam-pagination.html --\x3e\n';
      },
      70390: function (t) {
        "use strict";
        t.exports =
          '<div cam-widget-search\n     cam-widget-search-total="Searchable.pages.total"\n     cam-widget-search-size="Searchable.pages.size"\n     cam-widget-search-valid-searches="Searchable.config.searches"\n     cam-widget-search-translations="Searchable.config.tooltips"\n     cam-widget-search-types="Searchable.config.types"\n     cam-widget-search-id="{{searchId}}"\n     cam-widget-search-operators="Searchable.config.operators"\n     cam-widget-search-storage-group="Searchable.storageGroup"\n     cam-widget-search-mode="filter">\n</div>\n<div cam-widget-loader\n     text-error="{{Searchable.loadingError}}"\n     text-empty="{{Searchable.textEmpty}}"\n     loading-state="{{Searchable.loadingState}}">\n\n  <div ng-transclude></div>\n\n  <ul uib-pagination ng-if="Searchable.pages.total > Searchable.pages.size"\n              class="pagination-sm"\n              page="Searchable.pages.current"\n              ng-model="Searchable.pages.current"\n              total-items="Searchable.pages.total"\n              items-per-page="Searchable.pages.size"\n              max-size="7"\n              boundary-links="true">\n  </ul>\n</div>\n';
      },
      96468: function (t) {
        "use strict";
        t.exports =
          '<ul class="nav nav-tabs"\n    ng-if="Tabs.providers.length > 1">\n  <li ng-repeat="tabProvider in Tabs.providers"\n      ng-class="{ active: Tabs.isSelected(tabProvider) }">\n    <a href ng-click="Tabs.selectTab(tabProvider)">{{ tabProvider.label | translate }}</a>\n  </li>\n</ul>\n\n<h4 ng-if="Tabs.providers.length === 1">{{ Tabs.providers[0].label | translate }}:</h4>\n\n<div class="ctn-tabbed-content ctn-scroll"\n     ng-if="Tabs.providers.length">\n  <view provider="Tabs.selected"\n        vars="Tabs.vars" />\n</div>\n';
      },
      70367: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # CE - ui/common/scripts/module/components/cam-toolbar.html --\x3e\n<div class="ctn-toolbar">\n  \x3c!-- Toolbar actions are provided by plugins --\x3e\n  <span ng-repeat="provider in providers">\n    <view provider="provider"\n          vars="vars" />\n  </span>\n</div>\n\x3c!-- / CE - ui/common/scripts/module/components/cam-toolbar.html --\x3e\n';
      },
      86368: function (t) {
        "use strict";
        t.exports =
          '<span  ng-transclude></span>\n<a ng-click="changeOrder(column)">\n  <span class="glyphicon" ng-class="orderClass(column)"></span>\n</a>';
      },
      13871: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- CE ui/common/scripts/module/external-tasks-common/components/external-task-activity-link.html --\x3e\n<a ng-href="{{Link.getLink()}}">\n  {{Link.getActivityName()}}\n</a>\n\x3c!-- / CE ui/common/scripts/module/external-tasks-common/components/external-task-activity-link.html --\x3e\n';
      },
      68754: function (t) {
        "use strict";
        t.exports =
          '<a ng-href="{{Link.getStacktraceUrl()}}" target="_blank" ng-transclude></a>\n';
      },
      93293: function (t) {
        "use strict";
        t.exports =
          '\x3c!-- # EE - ui/common/scripts/module/external-tasks-common/components/external-tasks-tab.html --\x3e\n<div cam-widget-loader\n     loading-state="{{ TasksTab.loadingState }}"\n     text-empty="{{ \'PLUGIN_EXTERNAL_TASK_NO_EXTERNAL_TASK_FOR_THIS_PROCESS\' | translate }}">\n\n  \x3c!-- transclustion target --\x3e\n  <div ng-transclude></div>\n  \x3c!-- / transclustion target --\x3e\n\n  <div cam-pagination="TasksTab.onPaginationChange(pages)" total="TasksTab.total" >\n  </div>\n</div>\n\x3c!-- / EE - ui/common/scripts/module/external-tasks-common/components/external-tasks-tab.html --\x3e\n';
      },
      42634: function () {},
      22623: function () {},
      17743: function (t) {
        "use strict";
        t.exports = JSON.parse(
          '{"types":[{"id":{"key":"id","value":"PLUGIN_SEARCH_GROUPS_ID"},"default":true,"operators":[{"key":"eq","value":"="}]},{"id":{"key":"name","value":"PLUGIN_SEARCH_GROUPS_NAME"},"operators":[{"key":"eq","value":"="},{"key":"Like","value":"PLUGIN_SEARCH_GROUPS_LIKE"}]},{"id":{"key":"type","value":"PLUGIN_SEARCH_GROUPS_TYPE"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"member","value":"PLUGIN_SEARCH_GROUPS_USER_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"memberOfTenant","value":"PLUGIN_SEARCH_GROUPS_TENANT_ID"},"operators":[{"key":"eq","value":"="}]}],"tooltips":{"inputPlaceholder":"SEARCH_PLACEHOLDER","invalid":"INVALID_SEARCH","deleteSearch":"DELETE_SEARCH","type":"TYPE","name":"PROPERTY","operator":"OPERATOR","value":"VALUE"}}'
        );
      },
      75710: function (t) {
        "use strict";
        t.exports = JSON.parse(
          '{"types":[{"id":{"key":"id","value":"PLUGIN_SEARCH_TENANTS_ID"},"default":true,"operators":[{"key":"eq","value":"="}]},{"id":{"key":"name","value":"PLUGIN_SEARCH_TENANTS_NAME"},"operators":[{"key":"eq","value":"="},{"key":"Like","value":"PLUGIN_SEARCH_TENANTS_LIKE"}]},{"id":{"key":"userMember","value":"PLUGIN_SEARCH_TENANTS_USER_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"groupMember","value":"PLUGIN_SEARCH_TENANTS_GROUP_ID"},"operators":[{"key":"eq","value":"="}]}],"tooltips":{"inputPlaceholder":"SEARCH_PLACEHOLDER","invalid":"INVALID_SEARCH","deleteSearch":"DELETE_SEARCH","type":"TYPE","name":"PROPERTY","operator":"OPERATOR","value":"VALUE"}}'
        );
      },
      24309: function (t) {
        "use strict";
        t.exports = JSON.parse(
          '{"types":[{"id":{"key":"id","value":"PLUGIN_SEARCH_USER_ID"},"default":true,"operators":[{"key":"eq","value":"="}]},{"id":{"key":"firstName","value":"PLUGIN_SEARCH_USER_FIRSTNAME"},"operators":[{"key":"eq","value":"="},{"key":"Like","value":"PLUGIN_SEARCH_USER_LIKE"}]},{"id":{"key":"lastName","value":"PLUGIN_SEARCH_USER_LASTNAME"},"operators":[{"key":"eq","value":"="},{"key":"Like","value":"PLUGIN_SEARCH_USER_LIKE"}]},{"id":{"key":"email","value":"PLUGIN_SEARCH_USER_EMAIL"},"operators":[{"key":"eq","value":"="},{"key":"Like","value":"PLUGIN_SEARCH_USER_LIKE"}]},{"id":{"key":"memberOfGroup","value":"PLUGIN_SEARCH_USER_GROUP_ID"},"operators":[{"key":"eq","value":"="}]},{"id":{"key":"memberOfTenant","value":"PLUGIN_SEARCH_USER_TENANT_ID"},"operators":[{"key":"eq","value":"="}]}],"tooltips":{"inputPlaceholder":"SEARCH_PLACEHOLDER","invalid":"INVALID_SEARCH","deleteSearch":"DELETE_SEARCH","type":"TYPE","name":"PROPERTY","operator":"OPERATOR","value":"VALUE"}}'
        );
      },
    },
    function (t) {
      return (
        t.O(0, [881], function () {
          return (e = 38930), t((t.s = e));
          var e;
        }),
        t.O()
      );
    },
  ]);
});
