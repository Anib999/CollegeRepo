"remove" in Element.prototype || (Element.prototype.remove = function() {
    this.parentNode && (alert(this.innerHTML), this.parentNode.removeChild(this))
}), jQuery(function(m) {
    m.widget("flowchart.flowchart", {
        options: {
            canUserEditLinks: !0,
            canUserMoveOperators: !0,
            data: {},
            distanceFromArrow: 3,
            defaultOperatorClass: "flowchart-default-operator",
            defaultLinkColor: "#3366ff",
            defaultSelectedLinkColor: "black",
            linkWidth: 10,
            grid: 20,
            multipleLinksOnOutput: !1,
            multipleLinksOnInput: !1,
            linkVerticalDecal: 0,
            verticalConnection: !1,
            onOperatorSelect: function(t) {
                return !0
            },
            onOperatorUnselect: function() {
                return !0
            },
            onOperatorMouseOver: function(t) {
                return !0
            },
            onOperatorMouseOut: function(t) {
                return !0
            },
            onLinkSelect: function(t) {
                return !0
            },
            onLinkUnselect: function() {
                return !0
            },
            onOperatorCreate: function(t, e, o) {
                return !0
            },
            onLinkCreate: function(t, e) {
                return !0
            },
            onOperatorDelete: function(t) {
                return !0
            },
            onLinkDelete: function(t, e) {
                return !0
            },
            onOperatorMoved: function(t, e) {},
            onAfterChange: function(t) {}
        },
        data: null,
        objs: null,
        maskNum: 0,
        linkNum: 0,
        operatorNum: 0,
        lastOutputConnectorClicked: null,
        selectedOperatorId: null,
        selectedLinkId: null,
        positionRatio: 1,
        globalId: null,
        _create: function() {
            void 0 === document.__flowchartNumber ? document.__flowchartNumber = 0 : document.__flowchartNumber++, this.globalId = document.__flowchartNumber, this._unitVariables(), this.element.addClass("flowchart-container"), this.options.verticalConnection && this.element.addClass("flowchart-vertical"), this.objs.layers.links = m('<svg class="flowchart-links-layer"></svg>'), this.objs.layers.links.appendTo(this.element), this.objs.layers.operators = m('<div class="flowchart-operators-layer unselectable"></div>'), this.objs.layers.operators.appendTo(this.element), this.objs.layers.temporaryLink = m('<svg class="flowchart-temporary-link-layer"></svg>'), this.objs.layers.temporaryLink.appendTo(this.element);
            var t = document.createElementNS("http://www.w3.org/2000/svg", "line");
            t.setAttribute("x1", "0"), t.setAttribute("y1", "0"), t.setAttribute("x2", "0"), t.setAttribute("y2", "0"), t.setAttribute("stroke-dasharray", "6,6"), t.setAttribute("stroke-width", "4"), t.setAttribute("stroke", "black"), t.setAttribute("fill", "none"), this.objs.layers.temporaryLink[0].appendChild(t), this.objs.temporaryLink = t, this._initEvents(), void 0 !== this.options.data && this.setData(this.options.data)
        },
        _unitVariables: function() {
            this.data = {
                operators: {},
                links: {}
            }, this.objs = {
                layers: {
                    operators: null,
                    temporaryLink: null,
                    links: null
                },
                linksContext: null,
                temporaryLink: null
            }
        },
        _initEvents: function() {
            var o = this;
            this.element.mousemove(function(t) {
                var e = m(this).offset();
                o._mousemove((t.pageX - e.left) / o.positionRatio, (t.pageY - e.top) / o.positionRatio, t)
            }), this.element.click(function(t) {
                var e = m(this).offset();
                o._click((t.pageX - e.left) / o.positionRatio, (t.pageY - e.top) / o.positionRatio, t)
            }), this.objs.layers.operators.on("pointerdown mousedown touchstart", ".flowchart-operator", function(t) {
                t.stopImmediatePropagation()
            }), this.objs.layers.operators.on("click", ".flowchart-operator", function(t) {
                0 == m(t.target).closest(".flowchart-operator-connector").length && o.selectOperator(m(this).data("operator_id"))
            }), this.objs.layers.operators.on("click", ".flowchart-operator-connector", function() {
                var t = m(this);
                o.options.canUserEditLinks && o._connectorClicked(t.closest(".flowchart-operator").data("operator_id"), t.data("connector"), t.data("sub_connector"), t.closest(".flowchart-operator-connector-set").data("connector_type"))
            }), this.objs.layers.links.on("mousedown touchstart", ".flowchart-link", function(t) {
                t.stopImmediatePropagation()
            }), this.objs.layers.links.on("mouseover", ".flowchart-link", function() {
                o._connecterMouseOver(m(this).data("link_id"))
            }), this.objs.layers.links.on("mouseout", ".flowchart-link", function() {
                o._connecterMouseOut(m(this).data("link_id"))
            }), this.objs.layers.links.on("click", ".flowchart-link", function() {
                o.selectLink(m(this).data("link_id"))
            }), this.objs.layers.operators.on("mouseover", ".flowchart-operator", function(t) {
                o._operatorMouseOver(m(this).data("operator_id"))
            }), this.objs.layers.operators.on("mouseout", ".flowchart-operator", function(t) {
                o._operatorMouseOut(m(this).data("operator_id"))
            })
        },
        setData: function(t) {
            for (var e in this._clearOperatorsLayer(), this.data.operatorTypes = {}, void 0 !== t.operatorTypes && (this.data.operatorTypes = t.operatorTypes), this.data.operators = {}, t.operators) t.operators.hasOwnProperty(e) && this.createOperator(e, t.operators[e]);
            for (var o in this.data.links = {}, t.links) t.links.hasOwnProperty(o) && this.createLink(o, t.links[o]);
            this.redrawLinksLayer()
        },
        addLink: function(t) {
            for (; void 0 !== this.data.links[this.linkNum];) this.linkNum++;
            return this.createLink(this.linkNum, t), this.linkNum
        },
        createLink: function(t, e) {
            var o = m.extend(!0, {}, e);
            if (this.callbackEvent("linkCreate", [t, o])) {
                var r = this._getSubConnectors(o),
                    n = r[0],
                    a = r[1],
                    i = this.options.multipleLinksOnOutput,
                    s = this.options.multipleLinksOnInput;
                if (!i || !s)
                    for (var l in this.data.links)
                        if (this.data.links.hasOwnProperty(l)) {
                            var p = this.data.links[l],
                                c = this._getSubConnectors(p),
                                h = c[0],
                                u = c[1];
                            if (!i && !this.data.operators[o.fromOperator].properties.outputs[o.fromConnector].multipleLinks && p.fromOperator == o.fromOperator && p.fromConnector == o.fromConnector && h == n) {
                                this.deleteLink(l);
                                continue
                            }
                            s || this.data.operators[o.toOperator].properties.inputs[o.toConnector].multipleLinks || p.toOperator != o.toOperator || p.toConnector != o.toConnector || u != a || this.deleteLink(l)
                        } this._autoCreateSubConnector(o.fromOperator, o.fromConnector, "outputs", n), this._autoCreateSubConnector(o.toOperator, o.toConnector, "inputs", a), this.data.links[t] = o, this._drawLink(t), this.callbackEvent("afterChange", ["link_create"])
            }
        },
        _autoCreateSubConnector: function(t, e, o, r) {
            var n = this.data.operators[t].internal.properties[o][e];
            if (n.multiple)
                for (var a = this.data.operators[t].internal.els, i = this.data.operators[t].internal.els.connectors[e].length; i < r + 2; i++) this._createSubConnector(e, n, a)
        },
        _refreshOperatorConnectors: function(t) {
            for (var e in this.data.links)
                if (this.data.links.hasOwnProperty(e)) {
                    var o = this.data.links[e];
                    if (o.fromOperator == t || o.toOperator == t) {
                        var r = this._getSubConnectors(o),
                            n = r[0],
                            a = r[1];
                        this._autoCreateSubConnector(o.fromOperator, o.fromConnector, "outputs", n), this._autoCreateSubConnector(o.toOperator, o.toConnector, "inputs", a)
                    }
                }
        },
        redrawLinksLayer: function() {
            for (var t in this._clearLinksLayer(), this.data.links) this.data.links.hasOwnProperty(t) && this._drawLink(t)
        },
        _clearLinksLayer: function() {
            this.objs.layers.links.empty(), this.options.verticalConnection ? this.objs.layers.operators.find(".flowchart-operator-connector-small-arrow").css("border-top-color", "transparent") : this.objs.layers.operators.find(".flowchart-operator-connector-small-arrow").css("border-left-color", "transparent")
        },
        _clearOperatorsLayer: function() {
            this.objs.layers.operators.empty()
        },
        getConnectorPosition: function(t, e, o) {
            var r = this.data.operators[t].internal.els.connectorArrows[e][o],
                n = r.offset(),
                a = this.element.offset();
            return {
                x: (n.left - a.left) / this.positionRatio,
                width: parseInt(r.css("border-top-width"), 10),
                y: (n.top - a.top - 1) / this.positionRatio + parseInt(r.css("border-left-width"), 10)
            }
        },
        getLinkMainColor: function(t) {
            var e = this.options.defaultLinkColor,
                o = this.data.links[t];
            return void 0 !== o.color && (e = o.color), e
        },
        setLinkMainColor: function(t, e) {
            this.data.links[t].color = e, this.callbackEvent("afterChange", ["link_change_main_color"])
        },
        _drawLink: function(t) {
            var e = this.data.links[t];
            void 0 === e.internal && (e.internal = {}), e.internal.els = {};
            var o = e.fromOperator,
                r = e.fromConnector,
                n = e.toOperator,
                a = e.toConnector,
                i = this._getSubConnectors(e),
                s = i[0],
                l = i[1],
                p = (this.getLinkMainColor(t), this.data.operators[o]),
                c = this.data.operators[n],
                h = p.internal.els.connectorSmallArrows[r][s],
                u = c.internal.els.connectorSmallArrows[a][l];
            e.internal.els.fromSmallConnector = h, e.internal.els.toSmallConnector = u;
            var d = document.createElementNS("http://www.w3.org/2000/svg", "g");
            this.objs.layers.links[0].appendChild(d), e.internal.els.overallGroup = d;
            var f = document.createElementNS("http://www.w3.org/2000/svg", "mask"),
                k = "fc_mask_" + this.globalId + "_" + this.maskNum;
            this.maskNum++, f.setAttribute("id", k), d.appendChild(f);
            var v = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            v.setAttribute("x", "0"), v.setAttribute("y", "0"), v.setAttribute("width", "100%"), v.setAttribute("height", "100%"), v.setAttribute("stroke", "none"), v.setAttribute("fill", "white"), f.appendChild(v);
            var m = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            m.setAttribute("stroke", "none"), m.setAttribute("fill", "black"), f.appendChild(m), e.internal.els.mask = m;
            var C = document.createElementNS("http://www.w3.org/2000/svg", "g");
            C.setAttribute("class", "flowchart-link"), C.setAttribute("data-link_id", t), d.appendChild(C);
            var b = document.createElementNS("http://www.w3.org/2000/svg", "path");
            b.setAttribute("stroke-width", this.options.linkWidth.toString()), b.setAttribute("fill", "none"), C.appendChild(b), e.internal.els.path = b;
            var O = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            O.setAttribute("stroke", "none"), O.setAttribute("mask", "url(#" + k + ")"), C.appendChild(O), e.internal.els.rect = O, this._refreshLinkPositions(t), this.uncolorizeLink(t)
        },
        _getSubConnectors: function(t) {
            var e = 0;
            void 0 !== t.fromSubConnector && (e = t.fromSubConnector);
            var o = 0;
            return void 0 !== t.toSubConnector && (o = t.toSubConnector), [e, o]
        },
        _refreshLinkPositions: function(t) {
            var e = this.data.links[t],
                o = this._getSubConnectors(e),
                r = o[0],
                n = o[1],
                a = this.getConnectorPosition(e.fromOperator, e.fromConnector, r),
                i = this.getConnectorPosition(e.toOperator, e.toConnector, n),
                s = a.x,
                l = a.width,
                p = a.y,
                c = i.x,
                h = i.y;
            p += this.options.linkVerticalDecal, h += this.options.linkVerticalDecal;
            var u, d, f, k = this.options.distanceFromArrow;
            e.internal.els.mask.setAttribute("points", s + "," + (p - l - k) + " " + (s + l + k) + "," + p + " " + s + "," + (p + l + k)), this.options.verticalConnection ? (p -= 10, h -= 10, u = s + l + k - 3, d = c + l + k - 3, f = Math.min(100, Math.max(Math.abs(u - d) / 2, Math.abs(p - h))), e.internal.els.path.setAttribute("d", "M" + u + "," + p + " C" + u + "," + (p + f) + " " + d + "," + (h - f) + " " + d + "," + h), e.internal.els.rect.setAttribute("x", s - 1 + this.options.linkWidth / 2)) : (u = s + l + k, d = c + 1, f = Math.min(100, Math.max(Math.abs(u - d) / 2, Math.abs(p - h))), e.internal.els.path.setAttribute("d", "M" + u + "," + p + " C" + (s + l + k + f) + "," + p + " " + (c - f) + "," + h + " " + d + "," + h), e.internal.els.rect.setAttribute("x", s)), e.internal.els.rect.setAttribute("y", p - this.options.linkWidth / 2), e.internal.els.rect.setAttribute("width", l + k + 1), e.internal.els.rect.setAttribute("height", this.options.linkWidth)
        },
        getOperatorCompleteData: function(t) {
            void 0 === t.internal && (t.internal = {}), this._refreshInternalProperties(t);
            var e = m.extend(!0, {}, t.internal.properties);
            for (var o in e.inputs) e.inputs.hasOwnProperty(o) && null == e.inputs[o] && delete e.inputs[o];
            for (var r in e.outputs) e.outputs.hasOwnProperty(r) && null == e.outputs[r] && delete e.outputs[r];
            return void 0 === e.class && (e.class = this.options.defaultOperatorClass), e
        },
        _getOperatorFullElement: function(t) {
            var e = this.getOperatorCompleteData(t),
                o = m('<div class="flowchart-operator"></div>');
            o.addClass(e.class);
            var r = m('<div class="flowchart-operator-title"></div>');
            r.html(e.title), r.appendTo(o);
            var n = m('<div class="flowchart-operator-body"></div>');
            n.html(e.body), e.body && n.appendTo(o);
            var a = m('<div class="flowchart-operator-inputs-outputs"></div>'),
                i = m('<div class="flowchart-operator-inputs"></div>'),
                s = m('<div class="flowchart-operator-outputs"></div>');
            this.options.verticalConnection ? (i.prependTo(o), s.appendTo(o)) : (a.appendTo(o), i.appendTo(a), s.appendTo(a));
            var l = this,
                p = {},
                c = {},
                h = {},
                u = {},
                d = {
                    operator: o,
                    title: r,
                    body: n,
                    connectorSets: h,
                    connectors: u,
                    connectorArrows: p,
                    connectorSmallArrows: c
                };

            function f(t, e, o, r) {
                var n = m('<div class="flowchart-operator-connector-set"></div>');
                if (n.data("connector_type", r), n.appendTo(o), p[t] = [], c[t] = [], u[t] = [], h[t] = n, m.isArray(e.label))
                    for (var a = 0; a < e.label.length; a++) l._createSubConnector(t, e.label[a], d);
                else l._createSubConnector(t, e, d)
            }
            for (var k in e.inputs) e.inputs.hasOwnProperty(k) && f(k, e.inputs[k], i, "inputs");
            for (var v in e.outputs) e.outputs.hasOwnProperty(v) && f(v, e.outputs[v], s, "outputs");
            return d
        },
        _createSubConnector: function(t, e, o) {
            var r = o.connectorSets[t],
                n = o.connectors[t].length,
                a = m('<div class="flowchart-operator-connector"></div>');
            a.appendTo(r), a.data("connector", t), a.data("sub_connector", n);
            var i = m('<div class="flowchart-operator-connector-label"></div>');
            i.text(e.label.replace("(:i)", n + 1)), i.appendTo(a);
            var s = m('<div class="flowchart-operator-connector-arrow"></div>');
            s.appendTo(a);
            var l = m('<div class="flowchart-operator-connector-small-arrow"></div>');
            l.appendTo(a), o.connectors[t].push(a), o.connectorArrows[t].push(s), o.connectorSmallArrows[t].push(l)
        },
        getOperatorElement: function(t) {
            return this._getOperatorFullElement(t).operator
        },
        addOperator: function(t) {
            for (; void 0 !== this.data.operators[this.operatorNum];) this.operatorNum++;
            return this.createOperator(this.operatorNum, t), this.operatorNum
        },
        createOperator: function(t, a) {
            a.internal = {}, this._refreshInternalProperties(a);
            var i = this._getOperatorFullElement(a);
            if (!this.callbackEvent("operatorCreate", [t, a, i])) return !1;
            var e = this.options.grid;
            e && (a.top = Math.round(a.top / e) * e, a.left = Math.round(a.left / e) * e), i.operator.appendTo(this.objs.layers.operators), i.operator.css({
                top: a.top,
                left: a.left
            }), i.operator.data("operator_id", t), this.data.operators[t] = a, this.data.operators[t].internal.els = i, t == this.selectedOperatorId && this._addSelectedClass(t);
            var s, l, p = this;

            function c(t, e) {
                for (var o in a.top = e.top, a.left = e.left, p.data.links)
                    if (p.data.links.hasOwnProperty(o)) {
                        var r = p.data.links[o];
                        r.fromOperator != t && r.toOperator != t || p._refreshLinkPositions(o)
                    }
            }
            this.options.canUserMoveOperators && i.operator.draggable({
                containment: !a.internal.properties.uncontained && this.element,
                handle: ".flowchart-operator-title, .flowchart-operator-body",
                start: function(t, e) {
                    if (null == p.lastOutputConnectorClicked) {
                        var o = p.element.offset();
                        s = (t.pageX - o.left) / p.positionRatio - parseInt(m(t.target).css("left"), 10), l = (t.pageY - o.top) / p.positionRatio - parseInt(m(t.target).css("top"), 10)
                    } else t.preventDefault()
                },
                drag: function(t, e) {
                    if (p.options.grid) {
                        var o = p.options.grid,
                            r = p.element.offset();
                        if (e.position.left = Math.round(((t.pageX - r.left) / p.positionRatio - s) / o) * o, e.position.top = Math.round(((t.pageY - r.top) / p.positionRatio - l) / o) * o, !a.internal.properties.uncontained) {
                            var n = m(this);
                            e.position.left = Math.min(Math.max(e.position.left, 0), p.element.width() - n.outerWidth()), e.position.top = Math.min(Math.max(e.position.top, 0), p.element.height() - n.outerHeight())
                        }
                        e.offset.left = Math.round(e.position.left + r.left), e.offset.top = Math.round(e.position.top + r.top), i.operator.css({
                            left: e.position.left,
                            top: e.position.top
                        })
                    }
                    c(m(this).data("operator_id"), e.position)
                },
                stop: function(t, e) {
                    p._unsetTemporaryLink();
                    var o = m(this).data("operator_id");
                    c(o, e.position), i.operator.css({
                        height: "auto"
                    }), p.callbackEvent("operatorMoved", [o, e.position]), p.callbackEvent("afterChange", ["operator_moved"])
                }
            });
            this.callbackEvent("afterChange", ["operator_create"])
        },
        _connectorClicked: function(t, e, o, r) {
            if ("outputs" == r) {
                new Date;
                this.lastOutputConnectorClicked = {
                    operator: t,
                    connector: e,
                    subConnector: o
                }, this.objs.layers.temporaryLink.show();
                var n = this.getConnectorPosition(t, e, o),
                    a = n.x + n.width,
                    i = n.y;
                this.objs.temporaryLink.setAttribute("x1", a.toString()), this.objs.temporaryLink.setAttribute("y1", i.toString()), this._mousemove(a, i)
            }
            if ("inputs" == r && null != this.lastOutputConnectorClicked) {
                var s = {
                    fromOperator: this.lastOutputConnectorClicked.operator,
                    fromConnector: this.lastOutputConnectorClicked.connector,
                    fromSubConnector: this.lastOutputConnectorClicked.subConnector,
                    toOperator: t,
                    toConnector: e,
                    toSubConnector: o
                };
                this.addLink(s), this._unsetTemporaryLink()
            }
        },
        _unsetTemporaryLink: function() {
            this.lastOutputConnectorClicked = null, this.objs.layers.temporaryLink.hide()
        },
        _mousemove: function(t, e, o) {
            null != this.lastOutputConnectorClicked && (this.objs.temporaryLink.setAttribute("x2", t), this.objs.temporaryLink.setAttribute("y2", e))
        },
        _click: function(t, e, o) {
            var r = m(o.target);
            0 == r.closest(".flowchart-operator-connector").length && this._unsetTemporaryLink(), 0 == r.closest(".flowchart-operator").length && this.unselectOperator(), 0 == r.closest(".flowchart-link").length && this.unselectLink()
        },
        _removeSelectedClassOperators: function() {
            this.objs.layers.operators.find(".flowchart-operator").removeClass("selected")
        },
        unselectOperator: function() {
            if (null != this.selectedOperatorId) {
                if (!this.callbackEvent("operatorUnselect", [])) return;
                this._removeSelectedClassOperators(), this.selectedOperatorId = null
            }
        },
        _addSelectedClass: function(t) {
            this.data.operators[t].internal.els.operator.addClass("selected")
        },
        callbackEvent: function(t, e) {
            var o = "on" + t.charAt(0).toUpperCase() + t.slice(1),
                r = this.options[o].apply(this, e);
            if (!1 !== r) {
                var n = {
                    result: r
                };
                this.element.trigger(t, e.concat([n])), r = n.result
            }
            return r
        },
        selectOperator: function(t) {
            this.callbackEvent("operatorSelect", [t]) && (this.unselectLink(), this._removeSelectedClassOperators(), this._addSelectedClass(t), this.selectedOperatorId = t)
        },
        addClassOperator: function(t, e) {
            this.data.operators[t].internal.els.operator.addClass(e)
        },
        removeClassOperator: function(t, e) {
            this.data.operators[t].internal.els.operator.removeClass(e)
        },
        removeClassOperators: function(t) {
            this.objs.layers.operators.find(".flowchart-operator").removeClass(t)
        },
        _addHoverClassOperator: function(t) {
            this.data.operators[t].internal.els.operator.addClass("hover")
        },
        _removeHoverClassOperators: function() {
            this.objs.layers.operators.find(".flowchart-operator").removeClass("hover")
        },
        _operatorMouseOver: function(t) {
            this.callbackEvent("operatorMouseOver", [t]) && this._addHoverClassOperator(t)
        },
        _operatorMouseOut: function(t) {
            this.callbackEvent("operatorMouseOut", [t]) && this._removeHoverClassOperators()
        },
        getSelectedOperatorId: function() {
            return this.selectedOperatorId
        },
        getSelectedLinkId: function() {
            return this.selectedLinkId
        },
        _shadeColor: function(t, e) {
            var o = parseInt(t.slice(1), 16),
                r = e < 0 ? 0 : 255,
                n = e < 0 ? -1 * e : e,
                a = o >> 16,
                i = o >> 8 & 255,
                s = 255 & o;
            return "#" + (16777216 + 65536 * (Math.round((r - a) * n) + a) + 256 * (Math.round((r - i) * n) + i) + (Math.round((r - s) * n) + s)).toString(16).slice(1)
        },
        colorizeLink: function(t, e) {
            var o = this.data.links[t];
            o.internal.els.path.setAttribute("stroke", e), o.internal.els.rect.setAttribute("fill", e), this.options.verticalConnection ? (o.internal.els.fromSmallConnector.css("border-top-color", e), o.internal.els.toSmallConnector.css("border-top-color", e)) : (o.internal.els.fromSmallConnector.css("border-left-color", e), o.internal.els.toSmallConnector.css("border-left-color", e))
        },
        uncolorizeLink: function(t) {
            this.colorizeLink(t, this.getLinkMainColor(t))
        },
        _connecterMouseOver: function(t) {
            this.selectedLinkId != t && this.colorizeLink(t, this._shadeColor(this.getLinkMainColor(t), -.4))
        },
        _connecterMouseOut: function(t) {
            this.selectedLinkId != t && this.uncolorizeLink(t)
        },
        unselectLink: function() {
            if (null != this.selectedLinkId) {
                if (!this.callbackEvent("linkUnselect", [])) return;
                this.uncolorizeLink(this.selectedLinkId, this.options.defaultSelectedLinkColor), this.selectedLinkId = null
            }
        },
        selectLink: function(t) {
            this.unselectLink(), this.callbackEvent("linkSelect", [t]) && (this.unselectOperator(), this.selectedLinkId = t, this.colorizeLink(t, this.options.defaultSelectedLinkColor))
        },
        deleteOperator: function(t) {
            this._deleteOperator(t, !1)
        },
        _deleteOperator: function(t, e) {
            if (!this.callbackEvent("operatorDelete", [t, e])) return !1;
            if (!e)
                for (var o in this.data.links)
                    if (this.data.links.hasOwnProperty(o)) {
                        var r = this.data.links[o];
                        r.fromOperator != t && r.toOperator != t || this._deleteLink(o, !0)
                    } e || t != this.selectedOperatorId || this.unselectOperator(), this.data.operators[t].internal.els.operator.remove(), delete this.data.operators[t], this.callbackEvent("afterChange", ["operator_delete"])
        },
        deleteLink: function(t) {
            this._deleteLink(t, !1)
        },
        _deleteLink: function(t, e) {
            if (this.selectedLinkId == t && this.unselectLink(), this.callbackEvent("linkDelete", [t, e]) || e) {
                this.colorizeLink(t, "transparent");
                var o = this.data.links[t],
                    r = o.fromOperator,
                    n = o.fromConnector,
                    a = o.toOperator,
                    i = o.toConnector,
                    s = o.internal.els.overallGroup;
                s.remove ? s.remove() : s.parentNode.removeChild(s), delete this.data.links[t], this._cleanMultipleConnectors(r, n, "from"), this._cleanMultipleConnectors(a, i, "to"), this.callbackEvent("afterChange", ["link_delete"])
            }
        },
        _cleanMultipleConnectors: function(t, e, o) {
            if (this.data.operators[t].internal.properties["from" == o ? "outputs" : "inputs"][e].multiple) {
                var r = -1,
                    n = o + "Operator",
                    a = o + "Connector",
                    i = o + "SubConnector",
                    s = this.data.operators[t].internal.els,
                    l = s.connectors[e],
                    p = l.length;
                for (var c in this.data.links)
                    if (this.data.links.hasOwnProperty(c)) {
                        var h = this.data.links[c];
                        h[n] == t && h[a] == e && r < h[i] && (r = h[i])
                    } for (var u = Math.min(p - r - 2, p - 1), d = 0; d < u; d++) l[l.length - 1].remove(), l.pop(), s.connectorArrows[e].pop(), s.connectorSmallArrows[e].pop()
            }
        },
        deleteSelected: function() {
            null != this.selectedLinkId && this.deleteLink(this.selectedLinkId), null != this.selectedOperatorId && this.deleteOperator(this.selectedOperatorId)
        },
        setPositionRatio: function(t) {
            this.positionRatio = t
        },
        getPositionRatio: function() {
            return this.positionRatio
        },
        getData: function() {
            var t = ["operators", "links"],
                e = {};
            for (var o in e.operators = m.extend(!0, {}, this.data.operators), e.links = m.extend(!0, {}, this.data.links), t)
                if (t.hasOwnProperty(o)) {
                    var r = t[o];
                    for (var n in e[r]) e[r].hasOwnProperty(n) && delete e[r][n].internal
                } return e.operatorTypes = this.data.operatorTypes, e
        },
        getDataRef: function() {
            return this.data
        },
        setOperatorTitle: function(t, e) {
            this.data.operators[t].internal.els.title.html(e), void 0 === this.data.operators[t].properties && (this.data.operators[t].properties = {}), this.data.operators[t].properties.title = e, this._refreshInternalProperties(this.data.operators[t]), this.callbackEvent("afterChange", ["operator_title_change"])
        },
        setOperatorBody: function(t, e) {
            this.data.operators[t].internal.els.body.html(e), void 0 === this.data.operators[t].properties && (this.data.operators[t].properties = {}), this.data.operators[t].properties.body = e, this._refreshInternalProperties(this.data.operators[t]), this.callbackEvent("afterChange", ["operator_body_change"])
        },
        getOperatorTitle: function(t) {
            return this.data.operators[t].internal.properties.title
        },
        getOperatorBody: function(t) {
            return this.data.operators[t].internal.properties.body
        },
        setOperatorData: function(t, e) {
            var o = this.getOperatorCompleteData(e);
            for (var r in this.data.links)
                if (this.data.links.hasOwnProperty(r)) {
                    var n = this.data.links[r];
                    (n.fromOperator == t && void 0 === o.outputs[n.fromConnector] || n.toOperator == t && void 0 === o.inputs[n.toConnector]) && this._deleteLink(r, !0)
                } this._deleteOperator(t, !0), this.createOperator(t, e), this._refreshOperatorConnectors(t), this.redrawLinksLayer(), this.callbackEvent("afterChange", ["operator_data_change"])
        },
        doesOperatorExists: function(t) {
            return void 0 !== this.data.operators[t]
        },
        getOperatorData: function(t) {
            var e = m.extend(!0, {}, this.data.operators[t]);
            return delete e.internal, e
        },
        getLinksFrom: function(t) {
            var e = [];
            for (var o in this.data.links)
                if (this.data.links.hasOwnProperty(o)) {
                    var r = this.data.links[o];
                    r.fromOperator === t && e.push(r)
                } return e
        },
        getLinksTo: function(t) {
            var e = [];
            for (var o in this.data.links)
                if (this.data.links.hasOwnProperty(o)) {
                    var r = this.data.links[o];
                    r.toOperator === t && e.push(r)
                } return e
        },
        getOperatorFullProperties: function(t) {
            if (void 0 === t.type) return t.properties;
            var e = this.data.operatorTypes[t.type],
                o = {};
            return void 0 !== t.properties && (o = t.properties), m.extend({}, e, o)
        },
        _refreshInternalProperties: function(t) {
            t.internal.properties = this.getOperatorFullProperties(t)
        }
    })
});
