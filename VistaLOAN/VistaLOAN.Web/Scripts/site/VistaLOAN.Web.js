var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../_q/_q.d.ts" />
var _Ext;
(function (_Ext) {
    var GridBase = (function (_super) {
        __extends(GridBase, _super);
        function GridBase(container, options) {
            var _this = _super.call(this, container, options) || this;
            _this.isAutosized = false;
            _this.isChildGrid = false;
            _this.nextRowNumber = 1;
            _this.slickContainer.fadeTo(0, 0);
            return _this;
        }
        GridBase.prototype.get_ExtGridOptions = function () { return q.DefaultMainGridOptions; };
        GridBase.prototype.markupReady = function () {
            var _this = this;
            _super.prototype.markupReady.call(this);
            setTimeout(function () {
                if (_this.isAutosized == false) {
                    if (_this.get_ExtGridOptions().AutoColumnSize == true) {
                        _this.resizeAllCulumn();
                    }
                    _this.slickContainer.fadeTo(100, 1);
                }
            }, 100);
        };
        GridBase.prototype.getButtons = function () {
            var _this = this;
            var buttons = _super.prototype.getButtons.call(this);
            var reportRequest = this.getReportRequest();
            if (reportRequest.ListExcelServiceMethodName) {
                buttons.push(_Ext.ExcelExportHelper.createToolButton({
                    grid: this,
                    service: this.getService() + '/' + reportRequest.ListExcelServiceMethodName,
                    onViewSubmit: function () { return _this.onViewSubmit(); },
                    separator: true
                }));
            }
            if (reportRequest.ReportKey) {
                buttons.push({
                    title: 'Export to PDF',
                    icon: 'fa fa-file-pdf-o',
                    onClick: function () {
                        _Ext.ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: _this.getReportRequest() } });
                    }
                });
                buttons.push({
                    title: 'View as Report',
                    icon: 'fa fa-html5',
                    onClick: function () {
                        _Ext.ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: _this.getReportRequest() }, extension: 'html' });
                    }
                });
            }
            else if (reportRequest.ReportServiceMethodName) {
                buttons.push({
                    title: 'View as Report',
                    icon: 'fa fa-eye',
                    onClick: function () {
                        Q.postToService({ service: Q.resolveUrl(_this.getService() + '/' + reportRequest.ReportServiceMethodName), request: _this.getReportRequest(), target: '_blank' });
                    }
                });
            }
            else {
                buttons.push(_Ext.PdfExportHelper.createToolButton({
                    grid: this,
                    tableOptions: { theme: 'grid' },
                    onViewSubmit: function () { return _this.onViewSubmit(); }
                }));
            }
            return buttons;
        };
        GridBase.prototype.getReportRequest = function () {
            var view = this.getView();
            var request = Q.deepClone(view ? view.params : {}); //as _Ext.ReportRequest;
            request.ReportServiceMethodName = null; // if some value found in this property then "view as report" button will appear
            request.ReportKey = null; // if some value found in this property then "export to pdf" button will appear
            request.ListExcelServiceMethodName = null; // if some value found in this property then "export to xls" button will appear
            request.EqualityFilterWithTextValue = {};
            if (view) {
                var quickFilters = this.getQuickFilters();
                for (var _i = 0, quickFilters_1 = quickFilters; _i < quickFilters_1.length; _i++) {
                    var quickFilter = quickFilters_1[_i];
                    var filterValue = request.EqualityFilter[quickFilter.field];
                    if (filterValue) {
                        if (quickFilter.options.lookupKey) {
                            var lookup = Q.getLookup(quickFilter.options.lookupKey);
                            request.EqualityFilterWithTextValue[quickFilter.title] = lookup.itemById[filterValue][lookup.textField];
                        }
                        else if (quickFilter.options.enumKey) {
                            var enumKey = quickFilter.options.enumKey;
                            var enumValue = Q.toId(filterValue);
                            request.EqualityFilterWithTextValue[quickFilter.title] = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), enumValue);
                        }
                        else {
                            request.EqualityFilterWithTextValue[quickFilter.title] = filterValue;
                        }
                    }
                    else if (quickFilter.type == Serenity.DateEditor) {
                        var qf = this.findQuickFilter(Serenity.DateEditor, quickFilter.field);
                        var dateFrom = qf.element.val();
                        var dateTo = qf.element.siblings('input').val();
                        var filterText = '';
                        if (!Q.isEmptyOrNull(dateFrom))
                            filterText = 'From ' + dateFrom;
                        if (!Q.isEmptyOrNull(dateTo))
                            filterText = filterText + ' To ' + dateTo;
                        if (!Q.isEmptyOrNull(filterText)) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = filterText;
                        }
                        else if (this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = 'all';
                        }
                    }
                    else if (this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                        request.EqualityFilterWithTextValue[quickFilter.title] = 'all';
                    }
                }
            }
            return request;
        };
        GridBase.prototype.getColumns = function () {
            var _this = this;
            var columns = _super.prototype.getColumns.call(this);
            var isEditable = this.getSlickOptions().editable;
            var extOptions = this.get_ExtGridOptions();
            columns.forEach(function (c) {
                if (extOptions.AutoColumnSize == true) {
                    c.width = c.minWidth || c.width || 50;
                    c.cssClass = c.cssClass || '';
                    if (c.sourceItem) {
                        if (c.sourceItem.filteringType == "Lookup") {
                            c.cssClass += ' align-left';
                            if (c.sourceItem.editorType == "Lookup" && !c.sourceItem.editorParams.autoComplete) {
                                c.lookup = Q.getLookup(c.sourceItem.editorParams.lookupKey);
                                c.formatter = function (row, cell, value, columnDef, dataContext) {
                                    var item = columnDef.lookup.itemById[value];
                                    if (item)
                                        return item[columnDef.lookup.textField];
                                    else
                                        return '-';
                                };
                            }
                            c.width = c.minWidth > 100 ? c.minWidth : 100;
                        }
                        else if (c.sourceItem.formatterType == "Enum") {
                            //c.cssClass += ' align-center';
                            c.formatter = function (row, cell, value, columnDef, dataContext) {
                                var enumKey = columnDef.sourceItem.editorParams.enumKey;
                                var text = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), Q.toId(value));
                                if (text)
                                    return text;
                                else
                                    return '-';
                            };
                        }
                        else if (c.sourceItem.formatterType == "Date") {
                            c.cssClass += ' align-center';
                            c.width = c.minWidth > 99 ? c.minWidth : 99;
                        }
                        else if (c.sourceItem.formatterType == "DateTime") {
                            c.cssClass += ' align-center';
                            c.width = c.minWidth > 140 ? c.minWidth : 140;
                        }
                        else if (c.sourceItem.formatterType == "Number") {
                            c.cssClass += ' align-right';
                            if (c.sourceItem.editorType == "Decimal") {
                                var formatSrt_1 = '#,##0.00';
                                if (c.sourceItem.editorParams) {
                                    var decimals = c.sourceItem.editorParams['decimals'];
                                    if (decimals) {
                                        formatSrt_1 = '#,##0.';
                                        for (var i = 0; i < decimals; i++) {
                                            formatSrt_1 += '0';
                                        }
                                    }
                                    else if (c.sourceItem.editorParams['minValue']) {
                                        var splitedMinValue = c.sourceItem.editorParams['minValue'].split('.');
                                        if (splitedMinValue.length > 1) {
                                            formatSrt_1 = '#,##0.' + splitedMinValue[1];
                                        }
                                        else {
                                            formatSrt_1 = '#,##0';
                                        }
                                    }
                                }
                                c.format = function (ctx) { return Serenity.NumberFormatter.format(ctx.value, formatSrt_1); };
                            }
                        }
                        else if (c.sourceItem.formatterType == "Checkbox") {
                            c.cssClass += ' align-center';
                        }
                        else {
                            c.cssClass += ' align-left';
                            c.width = c.minWidth > 99 ? c.minWidth : 99;
                        }
                    }
                    else {
                        c.cssClass += ' align-left';
                        c.width = c.minWidth > 99 ? c.minWidth : 99;
                    }
                }
                //editor
                if (isEditable == true && c.sourceItem && c.sourceItem.readOnly != true) {
                    usingSlickGridEditors();
                    if (q.useSerenityInlineEditors) {
                        c.editor = SerenityInlineEditor;
                    }
                    else {
                        if (c.sourceItem.editorType == "Lookup" || c.sourceItem.editorType == "Enum") {
                            c.editor = Slick['Editors']['Select2'];
                            c.width = c.minWidth > 160 ? c.minWidth : 160;
                        }
                        else if (c.sourceItem.editorType == "Date") {
                            c.editor = Slick['Editors']['Date'];
                        }
                        else if (c.sourceItem.editorType == "Boolean") {
                            c.editor = Slick['Editors']['Checkbox'];
                        }
                        else if (c.sourceItem.editorType == "Integer") {
                            c.editor = Slick['Editors']['Integer'];
                        }
                        else if (c.sourceItem.editorType == "Decimal") {
                            c.editor = Slick['Editors']['Float'];
                        }
                        else if (c.sourceItem.editorType == "YesNoSelect") {
                            c.editor = Slick['Editors']['YesNoSelect'];
                        }
                        else if (c.sourceItem.editorType == "PercentComplete") {
                            c.editor = Slick['Editors']['PercentComplete'];
                        }
                        else if (c.sourceItem.editorType == "LongText") {
                            c.editor = Slick['Editors']['LongText'];
                        }
                        else {
                            c.editor = Slick['Editors']['Text'];
                        }
                    }
                }
            });
            columns.unshift({
                field: 'RowNum',
                name: '#',
                cssClass: 'rownum-column',
                headerCssClass: 'align-center',
                width: 40,
                minWidth: 40,
                maxWidth: 40,
                visible: extOptions.ShowRowNumberColumn,
                format: function (ctx) {
                    if (!ctx.item.RowNum) {
                        ctx.item.RowNum = _this.nextRowNumber++;
                    }
                    return String(ctx.item.RowNum);
                }
            });
            if (extOptions.ShowInlineActionsColumn == true) {
                var inlineActionsColumnWidth = 0;
                var inlineActionsColumnContent_1 = '';
                if (extOptions.ShowEditInlineButtun == true) {
                    inlineActionsColumnWidth += 25;
                    inlineActionsColumnContent_1 += '<a class="inline-actions view-details" title="edit/view details" style="padding-right: 10px;"><i class="view-details fa fa-pencil-square-o"></i></a>';
                }
                if (extOptions.ShowDeleteInlineButtun == true) {
                    inlineActionsColumnWidth += 25;
                    inlineActionsColumnContent_1 += '<a class="inline-actions delete-row" title="delete"><i class="delete-row fa fa-trash-o text-red"></i></a>';
                }
                columns.unshift({
                    field: 'inline-actions',
                    name: '',
                    cssClass: 'inline-actions-column',
                    width: inlineActionsColumnWidth,
                    minWidth: inlineActionsColumnWidth,
                    maxWidth: inlineActionsColumnWidth,
                    format: function (ctx) { return inlineActionsColumnContent_1; }
                });
            }
            return columns;
        };
        GridBase.prototype.createSlickGrid = function () {
            var grid = _super.prototype.createSlickGrid.call(this);
            usingSlickAutoColumnSize();
            if (Slick.AutoColumnSize) {
                this.autoColumnSizePlugin = new Slick.AutoColumnSize();
                grid.registerPlugin(this.autoColumnSizePlugin);
            }
            grid.registerPlugin(new Slick.Data.GroupItemMetadataProvider());
            return grid;
        };
        GridBase.prototype.resetColumns = function (columns) {
            var _this = this;
            this.slickContainer.fadeTo(0, 0);
            this.slickGrid.setColumns(columns);
            setTimeout(function () {
                if (_this.get_ExtGridOptions().AutoColumnSize == true) {
                    _this.resizeAllCulumn();
                }
                _this.slickContainer.fadeTo(100, 1);
            }, 100);
        };
        GridBase.prototype.resizeAllCulumn = function () {
            this.isAutosized = true;
            var gridContainerWidth = this.slickContainer.width();
            if (gridContainerWidth == 0) {
                gridContainerWidth = this.element.closest('.s-Dialog').width() - 55;
            }
            this.slickGrid.setOptions({ forceFitColumns: false });
            var allVisibleColumns = this.autoColumnSizePlugin.resizeAllColumns().filter(function (f) { return f.visible != false; }); // this.allColumns;
            var allVisibleColumnWidth = 0;
            allVisibleColumns.map(function (m) { return m.width; }).forEach(function (e) { return allVisibleColumnWidth += e; });
            if (allVisibleColumnWidth > gridContainerWidth) {
                this.autoColumnSizePlugin.resizeAllColumns();
            }
            else if (allVisibleColumnWidth < gridContainerWidth) {
                this.autoColumnSizePlugin.resizeAllColumns();
                var fixedSizeColumns_1 = [];
                var resizableColumns_1 = [];
                allVisibleColumns.forEach(function (c) {
                    if (c.minWidth == c.maxWidth) {
                        fixedSizeColumns_1.push(c);
                        c.width = c.maxWidth;
                    }
                    else if (c.sourceItem) {
                        if (c.sourceItem.formatterType == String("Number")) {
                            fixedSizeColumns_1.push(c);
                        }
                        else if (c.sourceItem.filteringType == String("Enum")) {
                            fixedSizeColumns_1.push(c);
                            if (c.width < 80)
                                c.width = 80;
                        }
                        else if (c.sourceItem.formatterType == String("Date")) {
                            fixedSizeColumns_1.push(c);
                            if (c.width < 80)
                                c.width = 80;
                        }
                        else if (c.sourceItem.formatterType == String("DateTime")) {
                            fixedSizeColumns_1.push(c);
                            if (c.width < 140)
                                c.width = 140;
                        }
                        else if (c.sourceItem.formatterType == String("Checkbox")) {
                            fixedSizeColumns_1.push(c);
                        }
                        else {
                            resizableColumns_1.push(c);
                        }
                    }
                    else {
                        resizableColumns_1.push(c);
                    }
                });
                if (resizableColumns_1.length == 0) {
                    fixedSizeColumns_1 = [];
                    resizableColumns_1 = [];
                    allVisibleColumns.forEach(function (c) {
                        if (c.minWidth == c.maxWidth) {
                            fixedSizeColumns_1.push(c);
                            c.width = c.maxWidth;
                        }
                        else {
                            resizableColumns_1.push(c);
                        }
                    });
                }
                var fixedSizeColumnsWidth_1 = 0;
                fixedSizeColumns_1.map(function (m) { return m.width; }).forEach(function (e) { return fixedSizeColumnsWidth_1 += e; });
                var stretchableGridAreaWidth_1 = gridContainerWidth - fixedSizeColumnsWidth_1 - 18;
                var resizableColumnsWidth_1 = 0;
                resizableColumns_1
                    .map(function (m) { return m.width; })
                    .forEach(function (e) { return resizableColumnsWidth_1 += e; });
                resizableColumns_1.forEach(function (c) {
                    c.width = c.width * (stretchableGridAreaWidth_1 / resizableColumnsWidth_1);
                });
                this.slickGrid.setColumns(allVisibleColumns);
                this.slickGrid.onColumnsResized.notify();
            }
            this.setItems(this.getItems());
        };
        GridBase.prototype.getSlickOptions = function () {
            var opt = _super.prototype.getSlickOptions.call(this);
            if (this.get_ExtGridOptions().AutoColumnSize == true) {
                opt.forceFitColumns = true;
            }
            opt.enableTextSelectionOnCells = true;
            opt.enableCellNavigation = true;
            opt.asyncEditorLoading = false;
            opt.autoEdit = true;
            return opt;
        };
        GridBase.prototype.getViewOptions = function () {
            var opt = _super.prototype.getViewOptions.call(this);
            opt.rowsPerPage = q.DefaultMainGridOptions.RowsPerPage;
            return opt;
        };
        GridBase.prototype.onClick = function (e, row, cell) {
            _super.prototype.onClick.call(this, e, row, cell);
            if (e.isDefaultPrevented())
                return;
            var item = this.itemAt(row);
            var recordId = item[this.getIdProperty()];
            var target = $(e.target);
            // if user clicks "i" element, e.g. icon
            if (target.parent().hasClass('inline-action') || target.parent().hasClass('inline-actions') || target.parent().hasClass('inline-btn'))
                target = target.parent();
            if (target.hasClass('inline-action') || target.hasClass('inline-actions') || target.hasClass('inline-btn')) {
                //e.preventDefault();
                this.onInlineActionClick(target, recordId, item);
            }
        };
        GridBase.prototype.onInlineActionClick = function (target, recordId, item) {
            var _this = this;
            if (target.hasClass('delete-row')) {
                if (this.isReadOnly == true) {
                    Q.notifyWarning('Read only records could not be deleted!');
                }
                else {
                    Q.confirm('Delete record?', function () {
                        var o = _this;
                        if (o.deleteEntity) {
                            o.deleteEntity(recordId);
                        }
                        else {
                            Q.serviceRequest(_this.getService() + '/Delete', { EntityId: recordId }, function (response) {
                                _this.refresh();
                            });
                        }
                    });
                }
            }
            else if (target.hasClass('view-details')) {
                this.editItem(recordId);
            }
        };
        GridBase.prototype.resetRowNumber = function () {
            this.nextRowNumber = 1;
            var items = this.getItems();
            var grouping_fields = this.view.getGrouping();
            if (grouping_fields.length == 0) {
                for (var i = 0; i < items.length; i++) {
                    items[i].RowNum = i + 1;
                }
            }
            else if (grouping_fields.length > 0) {
                var generateRowNumber_1 = function (groups) {
                    for (var gi = 0; gi < groups.length; gi++) {
                        var subGroups = groups[gi].groups;
                        if (subGroups) {
                            generateRowNumber_1(subGroups);
                        }
                        else {
                            var rows = groups[gi].rows;
                            for (var i = 0; i < rows.length; i++) {
                                rows[i].RowNum = i + 1;
                            }
                        }
                    }
                };
                var groups = this.view.getGroups();
                generateRowNumber_1(groups);
            }
            this.setItems(items);
        };
        GridBase.prototype.setGrouping = function (groupInfo) {
            this.view.setGrouping(groupInfo);
            this.resetRowNumber();
        };
        GridBase.prototype.onViewProcessData = function (response) {
            var _this = this;
            var r = _super.prototype.onViewProcessData.call(this, response);
            if (this.get_ExtGridOptions().ShowRowNumberColumn == true) {
                setTimeout(function () { _this.resetRowNumber(); });
            }
            return r;
        };
        GridBase = __decorate([
            Serenity.Decorators.filterable()
        ], GridBase);
        return GridBase;
    }(Serenity.EntityGrid));
    _Ext.GridBase = GridBase;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var DialogBase = (function (_super) {
        __extends(DialogBase, _super);
        function DialogBase(opt) {
            var _this = _super.call(this, opt) || this;
            _this.isReadOnly = false;
            _this.element.fadeTo(0, 0);
            if (_this.get_ExtDialogOptions().PendingChangesConfirmation == true) {
                _Ext.DialogUtils.pendingChangesConfirmation(_this.element, function () { return _this.getSaveState() != _this.loadedState; });
            }
            return _this;
        }
        DialogBase.prototype.get_ExtDialogOptions = function () { return q.DefaultEntityDialogOptions; };
        DialogBase.prototype.updateInterface = function () {
            _super.prototype.updateInterface.call(this);
            this.setReadOnly(this.isReadOnly);
            if (this.get_ExtDialogOptions().HideCategoyLinksBar == true) {
                this.element.find('.category-links').hide();
            }
        };
        DialogBase.prototype.onDialogOpen = function () {
            var _this = this;
            _super.prototype.onDialogOpen.call(this);
            if (this.get_ExtDialogOptions().AutoFitContentArea == true) {
                this.fullContentArea();
            }
            //temporary fix for set grid editor height
            setTimeout(function () { _this.onAfterSetDialogSize(); }, 200);
            this.element.fadeTo(100, 1);
        };
        DialogBase.prototype.onDialogClose = function () {
            _super.prototype.onDialogClose.call(this);
            this.onAfterDialogClose(this.entity);
        };
        DialogBase.prototype.setReadOnly = function (value) {
            this.isReadOnly = value;
            if (this.isReadOnly == true) {
                this.saveAndCloseButton.toggleClass('disabled', this.isReadOnly);
                this.applyChangesButton.toggleClass('disabled', this.isReadOnly);
                this.deleteButton.toggleClass('disabled', this.isReadOnly);
                this.cloneButton.toggleClass('disabled', this.isReadOnly);
                this.undeleteButton.toggleClass('disabled', this.isReadOnly);
                this.toolbar.findButton('btn-replace-row').addClass('disabled');
                // remove required asterisk (*)
                this.element.find('sup').toggle(this.isReadOnly);
                for (var editor in this.form) {
                    if (this.form[editor].widgetName) {
                        Serenity.EditorUtils.setReadOnly(this.form[editor], this.isReadOnly);
                    }
                }
            }
        };
        DialogBase.prototype.getToolbarButtons = function () {
            var _this = this;
            var buttons = _super.prototype.getToolbarButtons.call(this);
            var extOptions = this.get_ExtDialogOptions();
            if (extOptions.ShowCloseButtonInToolbar == true)
                buttons.push({
                    title: 'Close',
                    icon: 'fa fa-close',
                    onClick: function () {
                        _this.dialogClose();
                    }
                });
            if (extOptions.ShowRefreshButtonInToolbar == true)
                buttons.push({
                    title: 'Refresh',
                    icon: 'fa fa-refresh',
                    onClick: function () {
                        _this.onRefreshClick();
                    }
                });
            try {
                if (extOptions.ShowReplaceRowButtonInToolbar == true && Q.Authorization.hasPermission('Administration:ReplaceRow')) {
                    if (Q.isEmptyOrNull(this.getService()) == false) {
                        buttons.push({
                            title: 'Replace',
                            icon: 'fa fa-trash-o',
                            cssClass: 'btn-replace-row',
                            onClick: function () {
                                var idProperty = _this.getIdProperty();
                                var nameProperty = _this.getNameProperty();
                                var entityId = _this.entity[idProperty];
                                var entityName = _this.entity[nameProperty];
                                if (entityId) {
                                    Q.serviceRequest(_this.getService() + '/List', {}, function (response) {
                                        var entityList = response.Entities;
                                        var dlg = new _Ext.ReplaceRowDialog({
                                            FormKey: _this.getFormKey(),
                                            IdProperty: idProperty,
                                            NameProperty: nameProperty,
                                            EntityTypeTitle: _this.getEntitySingular(),
                                            DeletedEntityName: entityName,
                                            DeletedEntityId: entityId,
                                        }, entityList);
                                        dlg.dialogOpen();
                                        _this.dialogClose();
                                    });
                                }
                            }
                        });
                    }
                }
                if (extOptions.ShowChangeLogButtonInToolbar == true && Q.Authorization.hasPermission('Administration:AuditLog')) {
                    buttons.push({
                        title: 'Change Log',
                        icon: 'fa fa-history',
                        onClick: function () {
                            var entityId = _this.entity[_this.getIdProperty()];
                            if (entityId) {
                                var dlg = new _Ext.AuditLogViewerDialog({ FormKey: _this.getFormKey(), EntityId: entityId });
                                dlg.dialogOpen();
                            }
                            else {
                                Q.alert('No change log found for this entity.');
                            }
                        }
                    });
                }
            }
            catch (e) { }
            return buttons;
        };
        DialogBase.prototype.onRefreshClick = function () {
            this.reloadById();
        };
        DialogBase.prototype.getSaveState = function () {
            try {
                return $.toJSON(this.getSaveEntity());
            }
            catch (e) {
                return null;
            }
        };
        DialogBase.prototype.onSaveSuccess = function (response) {
            _super.prototype.onSaveSuccess.call(this, response);
            isPageRefreshRequired = true;
            //Q.reloadLookup(this.getLookupKey());
        };
        DialogBase.prototype.loadResponse = function (data) {
            _super.prototype.loadResponse.call(this, data);
            if (this.get_ExtDialogOptions().PendingChangesConfirmation == true) {
                this.loadedState = this.getSaveState();
            }
        };
        DialogBase.prototype.maximize = function () {
            var _this = this;
            this.element.closest(".ui-dialog").find(".ui-dialog-titlebar-maximize").click();
            setTimeout(function () {
                var dialogElement = _this.element ? _this.element.closest(".ui-dialog") : $(".ui-dialog");
                var dialogHeight = dialogElement.height();
                var titleBarHeight = dialogElement.find('.ui-dialog-title').height() || 20;
                var toolBarHeight = dialogElement.find('.s-DialogToolbar.s-Toolbar').height() || 0;
                var tabBarHeight = dialogElement.find('.nav.nav-tabs.property-tabs').height() || 0;
                var categoryLinkHeight = dialogElement.find('.category-links').height() || 0;
                _this.element.find('.categories').height(dialogHeight - titleBarHeight - toolBarHeight - tabBarHeight - categoryLinkHeight - 40);
            }, 100);
        };
        DialogBase.prototype.fullContentArea = function () {
            this.setDialogSize();
        };
        // set the dialog size relative to content area (to shrink use negative value)
        DialogBase.prototype.setDialogSize = function (width, height, top, left, $content) {
            var _this = this;
            if (!$content) {
                $content = $('section.content');
            }
            if ($content.length == 0) {
                $content = $('.content-wrapper');
            }
            var dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");
            if ($content.length > 0 && dialogElement.length > 0) {
                var dialogWidth = $content.width() + 30 + (width || 0);
                var dialogHeight = $content.height() + (height || 30);
                this.element.dialog("option", "width", dialogWidth);
                this.element.dialog("option", "height", dialogHeight);
                var titleBarHeight = dialogElement.find('.ui-dialog-title').height() || 20;
                var toolBarHeight = dialogElement.find('.s-DialogToolbar.s-Toolbar').height() || 0;
                var tabBarHeight = dialogElement.find('.nav.nav-tabs.property-tabs').height() || 0;
                var categoryLinkHeight = dialogElement.find('.category-links').height() || 0;
                this.element.find('.categories').height(dialogHeight - titleBarHeight - toolBarHeight - tabBarHeight - categoryLinkHeight - 40);
                dialogElement.css({
                    left: $content.position().left + (left || 0),
                    top: (top || 50),
                });
            }
            setTimeout(function () {
                _this.onAfterSetDialogSize();
            }, 200);
        };
        DialogBase.prototype.onAfterSetDialogSize = function () { };
        DialogBase.prototype.onAfterDialogClose = function (entity) { };
        DialogBase = __decorate([
            Serenity.Decorators.responsive(),
            Serenity.Decorators.maximizable()
        ], DialogBase);
        return DialogBase;
    }(Serenity.EntityDialog));
    _Ext.DialogBase = DialogBase;
})(_Ext || (_Ext = {}));
/// <reference path="../Bases/DialogBase.ts" />
var _Ext;
(function (_Ext) {
    var EditorDialogBase = (function (_super) {
        __extends(EditorDialogBase, _super);
        function EditorDialogBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditorDialogBase.prototype.get_ExtDialogOptions = function () { return q.DefaultEditorDialogOptions; };
        EditorDialogBase.prototype.getIdProperty = function () { return "__id"; };
        EditorDialogBase.prototype.destroy = function () {
            this.onSave = null;
            this.onDelete = null;
            _super.prototype.destroy.call(this);
        };
        EditorDialogBase.prototype.updateInterface = function () {
            _super.prototype.updateInterface.call(this);
            this.saveAndCloseButton.find('.button-inner').text(this.isNew() ? 'Add' : 'Apply');
            // apply changes button doesn't work properly with in-memory grids yet
            if (this.applyChangesButton) {
                this.applyChangesButton.hide();
            }
            if (this.parentEditor.isReadOnly == true) {
                this.saveAndCloseButton.addClass('disabled');
                this.deleteButton.addClass('disabled');
                Serenity.EditorUtils.setReadonly(this.element.find('.editor'), true);
                // remove required asterisk (*)
                this.element.find('sup').hide();
            }
        };
        EditorDialogBase.prototype.saveHandler = function (options, callback) {
            this.onSave && this.onSave(options, callback);
        };
        EditorDialogBase.prototype.deleteHandler = function (options, callback) {
            this.onDelete && this.onDelete(options, callback);
        };
        EditorDialogBase = __decorate([
            Serenity.Decorators.registerClass()
        ], EditorDialogBase);
        return EditorDialogBase;
    }(_Ext.DialogBase));
    _Ext.EditorDialogBase = EditorDialogBase;
})(_Ext || (_Ext = {}));
/// <reference path="../Bases/GridBase.ts" />
var _Ext;
(function (_Ext) {
    var GridEditorBase = (function (_super) {
        __extends(GridEditorBase, _super);
        function GridEditorBase(container) {
            var _this = _super.call(this, container) || this;
            _this.nextId = 1;
            _this.slickGrid.onSort.subscribe(function (e, args) {
                _this.sortGridFunction(args.grid, args.sortCols[0], args.sortCols[0].sortCol.field);
                //(args.grid as Slick.Grid).init();
                args.grid.invalidateAllRows();
                args.grid.invalidate();
                args.grid.render();
                args.grid.resizeCanvas();
            });
            return _this;
        }
        GridEditorBase.prototype.get_ExtGridOptions = function () { return q.DefaultEditorGridOptions; };
        GridEditorBase.prototype.getIdProperty = function () { return "__id"; };
        GridEditorBase.prototype.sortGridFunction = function (grid, column, field) {
            grid.getData().sort(function (a, b) {
                var result = a[field] > b[field] ? 1 :
                    a[field] < b[field] ? -1 :
                        0;
                return column.sortAsc ? result : -result;
            });
        };
        GridEditorBase.prototype.getQuickFilters = function () {
            return [];
        };
        GridEditorBase.prototype.id = function (entity) {
            return entity[this.getIdProperty()];
        };
        GridEditorBase.prototype.save = function (opt, callback) {
            var _this = this;
            var request = opt.request;
            var row = Q.deepClone(request.Entity);
            var id = this.id(row);
            if (id == null) {
                row[this.getIdProperty()] = "`" + this.nextId++;
            }
            if (!this.validateEntity(row, id)) {
                return;
            }
            var items = this.view.getItems().slice();
            if (id == null) {
                items.push(row);
            }
            else {
                var index = Q.indexOf(items, function (x) { return _this.id(x) === id; });
                items[index] = Q.deepClone({}, items[index], row);
            }
            this.value = items;
            callback({});
        };
        GridEditorBase.prototype.deleteEntity = function (id) {
            var _this = this;
            this.view.deleteItem(id);
            setTimeout(function () { _this.onItemsChanged(); });
            return true;
        };
        GridEditorBase.prototype.validateEntity = function (row, id) {
            return true;
        };
        GridEditorBase.prototype.getNewEntity = function () {
            return {};
        };
        GridEditorBase.prototype.getButtons = function () {
            var _this = this;
            return [{
                    title: 'Add ' + this.getItemName(),
                    cssClass: 'add-button',
                    onClick: function () { _this.addButtonClick(); }
                }];
        };
        GridEditorBase.prototype.addButtonClick = function () {
            var _this = this;
            this.createEntityDialog(this.getItemType(), function (dlg) {
                var dialog = dlg;
                dialog.parentEditor = _this;
                dialog.onSave = function (opt, callback) { return _this.save(opt, callback); };
                dialog.loadEntityAndOpenDialog(_this.getNewEntity());
            });
        };
        GridEditorBase.prototype.editItem = function (entityOrId) {
            var _this = this;
            var id = entityOrId;
            var item = this.view.getItemById(id);
            this.createEntityDialog(this.getItemType(), function (dlg) {
                var dialog = dlg;
                dialog.onDelete = function (opt, callback) {
                    if (!_this.deleteEntity(id)) {
                        return;
                    }
                    callback({});
                };
                dialog.parentEditor = _this;
                dialog.onSave = function (opt, callback) { return _this.save(opt, callback); };
                dialog.loadEntityAndOpenDialog(item);
            });
            ;
        };
        GridEditorBase.prototype.getEditValue = function (property, target) {
            target[property.name] = this.value;
        };
        GridEditorBase.prototype.setEditValue = function (source, property) {
            this.value = source[property.name];
        };
        Object.defineProperty(GridEditorBase.prototype, "value", {
            get: function () {
                var p = this.getIdProperty();
                this.slickGrid.getEditController().commitCurrentEdit();
                var items = this.view.getItems();
                this.onBeforeGetValue(items);
                return items.map(function (x) {
                    var y = Q.deepClone(x);
                    var id = y[p];
                    if (id && id.toString().charAt(0) == '`')
                        delete y[p];
                    if (y['RowNum'])
                        delete y['RowNum'];
                    return y;
                });
            },
            set: function (value) {
                var _this = this;
                var id = this.getIdProperty();
                var val = value || [];
                var items = val.map(function (x) {
                    var y = Q.deepClone(x);
                    if (y[id] == null) {
                        y[id] = "`" + _this.nextId++;
                    }
                    return y;
                });
                var r = this.onViewProcessData({ Entities: items });
                this.view.setItems(r.Entities, true);
                setTimeout(function () { _this.onItemsChanged(); });
                this.resetRowNumber(); // to generate serial no.
            },
            enumerable: true,
            configurable: true
        });
        GridEditorBase.prototype.getGridCanLoad = function () {
            return false;
        };
        GridEditorBase.prototype.usePager = function () {
            return false;
        };
        GridEditorBase.prototype.getInitialTitle = function () {
            return null;
        };
        GridEditorBase.prototype.createToolbarExtensions = function () {
            var _this = this;
            //super.createToolbarExtensions();
            Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, function (field, text) {
                _this.searchText = Select2.util.stripDiacritics(Q.trimToNull(text) || '').toLowerCase();
                _this.view.setItems(_this.view.getItems(), true);
            });
        };
        GridEditorBase.prototype.onViewFilter = function (row) {
            if (!_super.prototype.onViewFilter.call(this, row)) {
                return false;
            }
            if (this.searchText) {
                return this.matchContains(row);
            }
            return true;
        };
        GridEditorBase.prototype.matchContains = function (item) {
            var result = false;
            for (var prop in item) {
                result = Select2.util.stripDiacritics(String(item[prop] || '')).toLowerCase().indexOf(this.searchText) >= 0;
                if (result == true) {
                    return result;
                }
            }
            return result;
        };
        GridEditorBase.prototype.enableFiltering = function () { return false; };
        GridEditorBase.prototype.onViewSubmit = function () { return false; };
        GridEditorBase.prototype.get_readOnly = function () {
            return this.isReadOnly;
        };
        GridEditorBase.prototype.set_readOnly = function (value) {
            this.isReadOnly = value;
            if (value == true) {
                this.element.find('.add-button').addClass('disabled');
                var opt = this.slickGrid.getOptions();
                opt.editable = false;
                this.slickGrid.setOptions(opt);
            }
            else {
                this.element.find('.add-button').removeClass('disabled');
            }
        };
        GridEditorBase.prototype.getSlickOptions = function () {
            var opt = _super.prototype.getSlickOptions.call(this);
            opt.forceFitColumns = false;
            //opt.autoHeight = true; // If you need to show footer, you have to do opt.autoHeight = false
            return opt;
        };
        //custom events
        GridEditorBase.prototype.onItemsChanged = function () {
        };
        GridEditorBase.prototype.onBeforeGetValue = function (items) {
        };
        GridEditorBase = __decorate([
            Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly]),
            Serenity.Decorators.editor(),
            Serenity.Decorators.element("<div/>")
        ], GridEditorBase);
        return GridEditorBase;
    }(_Ext.GridBase));
    _Ext.GridEditorBase = GridEditorBase;
})(_Ext || (_Ext = {}));
/// <reference path="../Scripts/typings/serenity/Serenity.CoreLib.d.ts" />
/// <reference path="../Scripts/typings/jspdf/jspdf.autotable.d.ts" />
/// <reference path="../Modules/_Ext/Bases/GridBase.ts" />
/// <reference path="../Modules/_Ext/Bases/DialogBase.ts" />
/// <reference path="../Modules/_Ext/Editors/EditorDialogBase.ts" />
/// <reference path="../Modules/_Ext/Editors/GridEditorBase.ts" />
///reference path="../Modules/_Ext/Bases/DialogBase.ts" />
/// <reference path="../Modules/_Ext/Editors/EditorDialogBase.ts" />
/// <reference path="../Modules/_Ext/Editors/GridEditorBase.ts" />
var _Ext;
(function (_Ext) {
    var AuditActionType;
    (function (AuditActionType) {
        AuditActionType[AuditActionType["Insert"] = 1] = "Insert";
        AuditActionType[AuditActionType["Update"] = 2] = "Update";
        AuditActionType[AuditActionType["Delete"] = 3] = "Delete";
    })(AuditActionType = _Ext.AuditActionType || (_Ext.AuditActionType = {}));
    Serenity.Decorators.registerEnumType(AuditActionType, '_Ext.AuditActionType', 'Enum.Audit.AuditActionType');
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AuditLogForm = (function (_super) {
        __extends(AuditLogForm, _super);
        function AuditLogForm(prefix) {
            var _this = _super.call(this, prefix) || this;
            if (!AuditLogForm.init) {
                AuditLogForm.init = true;
                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.IntegerEditor;
                var w2 = s.LookupEditor;
                var w3 = s.EnumEditor;
                var w4 = s.DateTimeEditor;
                var w5 = _Ext.StaticTextBlock;
                Q.initFormType(AuditLogForm, [
                    'EntityTableName', w0,
                    'VersionNo', w1,
                    'UserId', w2,
                    'ActionType', w3,
                    'ActionDate', w4,
                    'EntityId', w1,
                    'OldEntity', w0,
                    'NewEntity', w0,
                    'Differences', w5,
                    'IpAddress', w0,
                    'SessionId', w0
                ]);
            }
            return _this;
        }
        AuditLogForm.formKey = '_Ext.AuditLog';
        return AuditLogForm;
    }(Serenity.PrefixedContext));
    _Ext.AuditLogForm = AuditLogForm;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AuditLogRow;
    (function (AuditLogRow) {
        AuditLogRow.idProperty = 'Id';
        AuditLogRow.nameProperty = 'EntityTableName';
        AuditLogRow.localTextPrefix = '_Ext.AuditLog';
    })(AuditLogRow = _Ext.AuditLogRow || (_Ext.AuditLogRow = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AuditLogService;
    (function (AuditLogService) {
        AuditLogService.baseUrl = '_Ext/AuditLog';
        [
            'Create',
            'Update',
            'Delete',
            'Retrieve',
            'List'
        ].forEach(function (x) {
            AuditLogService[x] = function (r, s, o) {
                return Q.serviceRequest(AuditLogService.baseUrl + '/' + x, r, s, o);
            };
        });
    })(AuditLogService = _Ext.AuditLogService || (_Ext.AuditLogService = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AuditLogViewerService;
    (function (AuditLogViewerService) {
        AuditLogViewerService.baseUrl = 'AuditLogViewer';
        [
            'List'
        ].forEach(function (x) {
            AuditLogViewerService[x] = function (r, s, o) {
                return Q.serviceRequest(AuditLogViewerService.baseUrl + '/' + x, r, s, o);
            };
        });
    })(AuditLogViewerService = _Ext.AuditLogViewerService || (_Ext.AuditLogViewerService = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var DevTools;
    (function (DevTools) {
        var SergenService;
        (function (SergenService) {
            SergenService.baseUrl = 'DevTools/Sergen';
            [
                'ListConnections',
                'ListTables',
                'Generate'
            ].forEach(function (x) {
                SergenService[x] = function (r, s, o) {
                    return Q.serviceRequest(SergenService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(SergenService = DevTools.SergenService || (DevTools.SergenService = {}));
    })(DevTools = _Ext.DevTools || (_Ext.DevTools = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var Months;
    (function (Months) {
        Months[Months["January"] = 0] = "January";
        Months[Months["February"] = 1] = "February";
        Months[Months["March"] = 2] = "March";
        Months[Months["April"] = 3] = "April";
        Months[Months["May"] = 4] = "May";
        Months[Months["June"] = 5] = "June";
        Months[Months["July"] = 6] = "July";
        Months[Months["August"] = 7] = "August";
        Months[Months["September"] = 8] = "September";
        Months[Months["October"] = 9] = "October";
        Months[Months["November"] = 10] = "November";
        Months[Months["December"] = 11] = "December";
    })(Months = _Ext.Months || (_Ext.Months = {}));
    Serenity.Decorators.registerEnumType(Months, '_Ext.Months', 'Months');
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ReplaceRowForm = (function (_super) {
        __extends(ReplaceRowForm, _super);
        function ReplaceRowForm(prefix) {
            var _this = _super.call(this, prefix) || this;
            if (!ReplaceRowForm.init) {
                ReplaceRowForm.init = true;
                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = _Ext.EmptyLookupEditor;
                Q.initFormType(ReplaceRowForm, [
                    'DeletedEntityName', w0,
                    'ReplaceWithEntityId', w1
                ]);
            }
            return _this;
        }
        ReplaceRowForm.formKey = '_Ext.ReplaceRow';
        return ReplaceRowForm;
    }(Serenity.PrefixedContext));
    _Ext.ReplaceRowForm = ReplaceRowForm;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ReplaceRowService;
    (function (ReplaceRowService) {
        ReplaceRowService.baseUrl = 'ReplaceRow';
        [
            'Replace'
        ].forEach(function (x) {
            ReplaceRowService[x] = function (r, s, o) {
                return Q.serviceRequest(ReplaceRowService.baseUrl + '/' + x, r, s, o);
            };
        });
    })(ReplaceRowService = _Ext.ReplaceRowService || (_Ext.ReplaceRowService = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var TimeUoM;
    (function (TimeUoM) {
        TimeUoM[TimeUoM["Hour"] = 1] = "Hour";
        TimeUoM[TimeUoM["Day"] = 2] = "Day";
        TimeUoM[TimeUoM["Week"] = 3] = "Week";
        TimeUoM[TimeUoM["Month"] = 4] = "Month";
        TimeUoM[TimeUoM["CalenderMonth"] = 5] = "CalenderMonth";
        TimeUoM[TimeUoM["Year"] = 6] = "Year";
    })(TimeUoM = _Ext.TimeUoM || (_Ext.TimeUoM = {}));
    Serenity.Decorators.registerEnumType(TimeUoM, '_Ext.TimeUoM', 'TimeUoM');
})(_Ext || (_Ext = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var LanguageForm = (function (_super) {
            __extends(LanguageForm, _super);
            function LanguageForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LanguageForm.init) {
                    LanguageForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    Q.initFormType(LanguageForm, [
                        'LanguageId', w0,
                        'LanguageName', w0
                    ]);
                }
                return _this;
            }
            LanguageForm.formKey = 'Administration.Language';
            return LanguageForm;
        }(Serenity.PrefixedContext));
        Administration.LanguageForm = LanguageForm;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var LanguageRow;
        (function (LanguageRow) {
            LanguageRow.idProperty = 'Id';
            LanguageRow.nameProperty = 'LanguageName';
            LanguageRow.localTextPrefix = 'Administration.Language';
            LanguageRow.lookupKey = 'Administration.Language';
            function getLookup() {
                return Q.getLookup('Administration.Language');
            }
            LanguageRow.getLookup = getLookup;
        })(LanguageRow = Administration.LanguageRow || (Administration.LanguageRow = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var LanguageService;
        (function (LanguageService) {
            LanguageService.baseUrl = 'Administration/Language';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LanguageService[x] = function (r, s, o) {
                    return Q.serviceRequest(LanguageService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LanguageService = Administration.LanguageService || (Administration.LanguageService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RoleForm = (function (_super) {
            __extends(RoleForm, _super);
            function RoleForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!RoleForm.init) {
                    RoleForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    Q.initFormType(RoleForm, [
                        'RoleName', w0
                    ]);
                }
                return _this;
            }
            RoleForm.formKey = 'Administration.Role';
            return RoleForm;
        }(Serenity.PrefixedContext));
        Administration.RoleForm = RoleForm;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RolePermissionRow;
        (function (RolePermissionRow) {
            RolePermissionRow.idProperty = 'RolePermissionId';
            RolePermissionRow.nameProperty = 'PermissionKey';
            RolePermissionRow.localTextPrefix = 'Administration.RolePermission';
        })(RolePermissionRow = Administration.RolePermissionRow || (Administration.RolePermissionRow = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RolePermissionService;
        (function (RolePermissionService) {
            RolePermissionService.baseUrl = 'Administration/RolePermission';
            [
                'Update',
                'List'
            ].forEach(function (x) {
                RolePermissionService[x] = function (r, s, o) {
                    return Q.serviceRequest(RolePermissionService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(RolePermissionService = Administration.RolePermissionService || (Administration.RolePermissionService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RoleRow;
        (function (RoleRow) {
            RoleRow.idProperty = 'RoleId';
            RoleRow.nameProperty = 'RoleName';
            RoleRow.localTextPrefix = 'Administration.Role';
            RoleRow.lookupKey = 'Administration.Role';
            function getLookup() {
                return Q.getLookup('Administration.Role');
            }
            RoleRow.getLookup = getLookup;
        })(RoleRow = Administration.RoleRow || (Administration.RoleRow = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RoleService;
        (function (RoleService) {
            RoleService.baseUrl = 'Administration/Role';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                RoleService[x] = function (r, s, o) {
                    return Q.serviceRequest(RoleService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(RoleService = Administration.RoleService || (Administration.RoleService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var TranslationService;
        (function (TranslationService) {
            TranslationService.baseUrl = 'Administration/Translation';
            [
                'List',
                'Update'
            ].forEach(function (x) {
                TranslationService[x] = function (r, s, o) {
                    return Q.serviceRequest(TranslationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(TranslationService = Administration.TranslationService || (Administration.TranslationService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserForm = (function (_super) {
            __extends(UserForm, _super);
            function UserForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!UserForm.init) {
                    UserForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.EmailEditor;
                    var w2 = s.ImageUploadEditor;
                    var w3 = s.PasswordEditor;
                    Q.initFormType(UserForm, [
                        'Username', w0,
                        'DisplayName', w0,
                        'Email', w1,
                        'UserImage', w2,
                        'Password', w3,
                        'PasswordConfirm', w3,
                        'Source', w0
                    ]);
                }
                return _this;
            }
            UserForm.formKey = 'Administration.User';
            return UserForm;
        }(Serenity.PrefixedContext));
        Administration.UserForm = UserForm;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserPermissionRow;
        (function (UserPermissionRow) {
            UserPermissionRow.idProperty = 'UserPermissionId';
            UserPermissionRow.nameProperty = 'PermissionKey';
            UserPermissionRow.localTextPrefix = 'Administration.UserPermission';
        })(UserPermissionRow = Administration.UserPermissionRow || (Administration.UserPermissionRow = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserPermissionService;
        (function (UserPermissionService) {
            UserPermissionService.baseUrl = 'Administration/UserPermission';
            [
                'Update',
                'List',
                'ListRolePermissions',
                'ListPermissionKeys'
            ].forEach(function (x) {
                UserPermissionService[x] = function (r, s, o) {
                    return Q.serviceRequest(UserPermissionService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(UserPermissionService = Administration.UserPermissionService || (Administration.UserPermissionService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserRoleRow;
        (function (UserRoleRow) {
            UserRoleRow.idProperty = 'UserRoleId';
            UserRoleRow.localTextPrefix = 'Administration.UserRole';
        })(UserRoleRow = Administration.UserRoleRow || (Administration.UserRoleRow = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserRoleService;
        (function (UserRoleService) {
            UserRoleService.baseUrl = 'Administration/UserRole';
            [
                'Update',
                'List'
            ].forEach(function (x) {
                UserRoleService[x] = function (r, s, o) {
                    return Q.serviceRequest(UserRoleService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(UserRoleService = Administration.UserRoleService || (Administration.UserRoleService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserRow;
        (function (UserRow) {
            UserRow.idProperty = 'UserId';
            UserRow.isActiveProperty = 'IsActive';
            UserRow.nameProperty = 'Username';
            UserRow.localTextPrefix = 'Administration.User';
        })(UserRow = Administration.UserRow || (Administration.UserRow = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserService;
        (function (UserService) {
            UserService.baseUrl = 'Administration/User';
            [
                'Create',
                'Update',
                'Delete',
                'Undelete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                UserService[x] = function (r, s, o) {
                    return Q.serviceRequest(UserService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(UserService = Administration.UserService || (Administration.UserService = {}));
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var ApprovalStatus;
    (function (ApprovalStatus) {
        ApprovalStatus[ApprovalStatus["Draft"] = 1] = "Draft";
        ApprovalStatus[ApprovalStatus["Cancel"] = 2] = "Cancel";
        ApprovalStatus[ApprovalStatus["Submit"] = 3] = "Submit";
        ApprovalStatus[ApprovalStatus["Regret"] = 4] = "Regret";
        ApprovalStatus[ApprovalStatus["Recommend"] = 5] = "Recommend";
        ApprovalStatus[ApprovalStatus["Approved"] = 6] = "Approved";
    })(ApprovalStatus = VistaLOAN.ApprovalStatus || (VistaLOAN.ApprovalStatus = {}));
    Serenity.Decorators.registerEnumType(ApprovalStatus, 'VistaLOAN.ApprovalStatus', 'ApprovalStatus');
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var CollectionType;
    (function (CollectionType) {
        CollectionType[CollectionType["Loan_Installment"] = 1] = "Loan_Installment";
        CollectionType[CollectionType["PF_Contribution"] = 2] = "PF_Contribution";
    })(CollectionType = VistaLOAN.CollectionType || (VistaLOAN.CollectionType = {}));
    Serenity.Decorators.registerEnumType(CollectionType, 'VistaLOAN.CollectionType', 'CollectionType');
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var UserPreferenceRow;
        (function (UserPreferenceRow) {
            UserPreferenceRow.idProperty = 'UserPreferenceId';
            UserPreferenceRow.nameProperty = 'Name';
            UserPreferenceRow.localTextPrefix = 'Common.UserPreference';
        })(UserPreferenceRow = Common.UserPreferenceRow || (Common.UserPreferenceRow = {}));
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var UserPreferenceService;
        (function (UserPreferenceService) {
            UserPreferenceService.baseUrl = 'Common/UserPreference';
            [
                'Update',
                'Retrieve'
            ].forEach(function (x) {
                UserPreferenceService[x] = function (r, s, o) {
                    return Q.serviceRequest(UserPreferenceService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(UserPreferenceService = Common.UserPreferenceService || (Common.UserPreferenceService = {}));
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var AccAccountingPeriodInformationRow;
        (function (AccAccountingPeriodInformationRow) {
            AccAccountingPeriodInformationRow.idProperty = 'Id';
            AccAccountingPeriodInformationRow.nameProperty = 'YearName';
            AccAccountingPeriodInformationRow.localTextPrefix = 'Configurations.AccAccountingPeriodInformation';
            AccAccountingPeriodInformationRow.lookupKey = 'Configurations.AccAccountingPeriodInformation';
            function getLookup() {
                return Q.getLookup('Configurations.AccAccountingPeriodInformation');
            }
            AccAccountingPeriodInformationRow.getLookup = getLookup;
        })(AccAccountingPeriodInformationRow = Configurations.AccAccountingPeriodInformationRow || (Configurations.AccAccountingPeriodInformationRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var AccAccountingPeriodInformationService;
        (function (AccAccountingPeriodInformationService) {
            AccAccountingPeriodInformationService.baseUrl = 'Configurations/AccAccountingPeriodInformation';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                AccAccountingPeriodInformationService[x] = function (r, s, o) {
                    return Q.serviceRequest(AccAccountingPeriodInformationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(AccAccountingPeriodInformationService = Configurations.AccAccountingPeriodInformationService || (Configurations.AccAccountingPeriodInformationService = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var ApvApprovalStatusRow;
        (function (ApvApprovalStatusRow) {
            ApvApprovalStatusRow.idProperty = 'Id';
            ApvApprovalStatusRow.nameProperty = 'StatusName';
            ApvApprovalStatusRow.localTextPrefix = 'Configurations.ApvApprovalStatus';
            ApvApprovalStatusRow.lookupKey = 'Configurations.ApvApprovalStatus';
            function getLookup() {
                return Q.getLookup('Configurations.ApvApprovalStatus');
            }
            ApvApprovalStatusRow.getLookup = getLookup;
        })(ApvApprovalStatusRow = Configurations.ApvApprovalStatusRow || (Configurations.ApvApprovalStatusRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var ApvApprovalStatusService;
        (function (ApvApprovalStatusService) {
            ApvApprovalStatusService.baseUrl = 'Configurations/ApvApprovalStatus';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                ApvApprovalStatusService[x] = function (r, s, o) {
                    return Q.serviceRequest(ApvApprovalStatusService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(ApvApprovalStatusService = Configurations.ApvApprovalStatusService || (Configurations.ApvApprovalStatusService = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmEmploymentInfoRow;
        (function (PrmEmploymentInfoRow) {
            PrmEmploymentInfoRow.idProperty = 'Id';
            PrmEmploymentInfoRow.nameProperty = 'FullName';
            PrmEmploymentInfoRow.localTextPrefix = 'Configurations.PrmEmploymentInfo';
            PrmEmploymentInfoRow.lookupKey = 'Configurations.PrmEmploymentInfo';
            function getLookup() {
                return Q.getLookup('Configurations.PrmEmploymentInfo');
            }
            PrmEmploymentInfoRow.getLookup = getLookup;
        })(PrmEmploymentInfoRow = Configurations.PrmEmploymentInfoRow || (Configurations.PrmEmploymentInfoRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmEmploymentInfoService;
        (function (PrmEmploymentInfoService) {
            PrmEmploymentInfoService.baseUrl = 'Configurations/PrmEmploymentInfo';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                PrmEmploymentInfoService[x] = function (r, s, o) {
                    return Q.serviceRequest(PrmEmploymentInfoService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(PrmEmploymentInfoService = Configurations.PrmEmploymentInfoService || (Configurations.PrmEmploymentInfoService = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmEmploymentTypeRow;
        (function (PrmEmploymentTypeRow) {
            PrmEmploymentTypeRow.idProperty = 'Id';
            PrmEmploymentTypeRow.nameProperty = 'Name';
            PrmEmploymentTypeRow.localTextPrefix = 'Configurations.PrmEmploymentType';
            PrmEmploymentTypeRow.lookupKey = 'Configurations.PrmEmploymentType';
            function getLookup() {
                return Q.getLookup('Configurations.PrmEmploymentType');
            }
            PrmEmploymentTypeRow.getLookup = getLookup;
        })(PrmEmploymentTypeRow = Configurations.PrmEmploymentTypeRow || (Configurations.PrmEmploymentTypeRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmJobGradeRow;
        (function (PrmJobGradeRow) {
            PrmJobGradeRow.idProperty = 'Id';
            PrmJobGradeRow.nameProperty = 'GradeName';
            PrmJobGradeRow.localTextPrefix = 'Configurations.PrmJobGrade';
            PrmJobGradeRow.lookupKey = 'Configurations.PrmJobGrade';
            function getLookup() {
                return Q.getLookup('Configurations.PrmJobGrade');
            }
            PrmJobGradeRow.getLookup = getLookup;
        })(PrmJobGradeRow = Configurations.PrmJobGradeRow || (Configurations.PrmJobGradeRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmSalaryHeadRow;
        (function (PrmSalaryHeadRow) {
            PrmSalaryHeadRow.idProperty = 'Id';
            PrmSalaryHeadRow.nameProperty = 'HeadName';
            PrmSalaryHeadRow.localTextPrefix = 'Configurations.PrmSalaryHead';
            PrmSalaryHeadRow.lookupKey = 'Configurations.PrmSalaryHead';
            function getLookup() {
                return Q.getLookup('Configurations.PrmSalaryHead');
            }
            PrmSalaryHeadRow.getLookup = getLookup;
        })(PrmSalaryHeadRow = Configurations.PrmSalaryHeadRow || (Configurations.PrmSalaryHeadRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmSalaryScaleRow;
        (function (PrmSalaryScaleRow) {
            PrmSalaryScaleRow.idProperty = 'Id';
            PrmSalaryScaleRow.nameProperty = 'SalaryScaleName';
            PrmSalaryScaleRow.localTextPrefix = 'Configurations.PrmSalaryScale';
            PrmSalaryScaleRow.lookupKey = 'Configurations.PrmSalaryScale';
            function getLookup() {
                return Q.getLookup('Configurations.PrmSalaryScale');
            }
            PrmSalaryScaleRow.getLookup = getLookup;
        })(PrmSalaryScaleRow = Configurations.PrmSalaryScaleRow || (Configurations.PrmSalaryScaleRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Configurations;
    (function (Configurations) {
        var PrmZoneInfoRow;
        (function (PrmZoneInfoRow) {
            PrmZoneInfoRow.idProperty = 'Id';
            PrmZoneInfoRow.nameProperty = 'ZoneName';
            PrmZoneInfoRow.localTextPrefix = 'Configurations.PrmZoneInfo';
            PrmZoneInfoRow.lookupKey = 'Configurations.PrmZoneInfoRow';
            function getLookup() {
                return Q.getLookup('Configurations.PrmZoneInfoRow');
            }
            PrmZoneInfoRow.getLookup = getLookup;
        })(PrmZoneInfoRow = Configurations.PrmZoneInfoRow || (Configurations.PrmZoneInfoRow = {}));
    })(Configurations = VistaLOAN.Configurations || (VistaLOAN.Configurations = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var EffectinCashFlow;
    (function (EffectinCashFlow) {
        EffectinCashFlow[EffectinCashFlow["Investing"] = 0] = "Investing";
        EffectinCashFlow[EffectinCashFlow["Operating"] = 1] = "Operating";
        EffectinCashFlow[EffectinCashFlow["Financing"] = 2] = "Financing";
    })(EffectinCashFlow = VistaLOAN.EffectinCashFlow || (VistaLOAN.EffectinCashFlow = {}));
    Serenity.Decorators.registerEnumType(EffectinCashFlow, 'VistaLOAN.EffectinCashFlow', 'EffectinCashFlow');
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var HRM;
    (function (HRM) {
        var EmploymentInfoForm = (function (_super) {
            __extends(EmploymentInfoForm, _super);
            function EmploymentInfoForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!EmploymentInfoForm.init) {
                    EmploymentInfoForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.IntegerEditor;
                    var w2 = s.DateEditor;
                    var w3 = s.BooleanEditor;
                    var w4 = s.DecimalEditor;
                    Q.initFormType(EmploymentInfoForm, [
                        'EmpId', w0,
                        'EmployeeInitial', w0,
                        'TitleId', w1,
                        'FirstName', w0,
                        'MiddleName', w0,
                        'LastName', w0,
                        'FullName', w0,
                        'DateofJoining', w2,
                        'ProvisionMonth', w1,
                        'DateofConfirmation', w2,
                        'DateofPosition', w2,
                        'DesignationId', w1,
                        'DisciplineId', w1,
                        'DivisionId', w1,
                        'SectionId', w1,
                        'SubSectionId', w1,
                        'JobLocationId', w1,
                        'ResourceLevelId', w1,
                        'StaffCategoryId', w1,
                        'ShiftId', w1,
                        'EmploymentTypeId', w1,
                        'ReligionId', w1,
                        'IsContractual', w3,
                        'IsConsultant', w3,
                        'IsOvertimeEligible', w3,
                        'OvertimeRate', w4,
                        'MobileNo', w0,
                        'EmialAddress', w0,
                        'BankId', w1,
                        'BankBranchId', w1,
                        'BankAccountNo', w0,
                        'EmploymentStatusId', w1,
                        'DateofInactive', w2,
                        'IsBonusEligible', w3,
                        'IsTaxPaidbyIwm', w3,
                        'SalaryScaleId', w1,
                        'JobGradeId', w1,
                        'Gender', w0,
                        'ContractExpireDate', w2,
                        'DateofBirth', w2,
                        'ContractDuration', w4,
                        'ContractType', w1,
                        'ActualRate', w4,
                        'BudgetRate', w4,
                        'OrganogramLevelId', w1,
                        'DateofAppointment', w2,
                        'OrderNo', w0,
                        'QuotaId', w1,
                        'EmployeeClassId', w1,
                        'EmploymentProcessId', w1,
                        'SeniorityPosition', w0,
                        'DateofSeniority', w2,
                        'PrlDate', w2,
                        'IsPensionEligible', w3,
                        'IsLeverageEligible', w3,
                        'CardNo', w0,
                        'FingerPrintIdentiyNo', w0,
                        'AttendanceEffectiveDate', w2,
                        'AttendanceStatus', w3,
                        'IUser', w0,
                        'IDate', w2,
                        'EUser', w0,
                        'EDate', w2,
                        'IsGeneralShifted', w3,
                        'RegionId', w1
                    ]);
                }
                return _this;
            }
            EmploymentInfoForm.formKey = 'HRM.EmploymentInfo';
            return EmploymentInfoForm;
        }(Serenity.PrefixedContext));
        HRM.EmploymentInfoForm = EmploymentInfoForm;
    })(HRM = VistaLOAN.HRM || (VistaLOAN.HRM = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var HRM;
    (function (HRM) {
        var EmploymentInfoRow;
        (function (EmploymentInfoRow) {
            EmploymentInfoRow.idProperty = 'Id';
            EmploymentInfoRow.nameProperty = 'LookupText';
            EmploymentInfoRow.localTextPrefix = 'HRM.EmploymentInfo';
            EmploymentInfoRow.lookupKey = 'HRM.EmploymentInfo';
            function getLookup() {
                return Q.getLookup('HRM.EmploymentInfo');
            }
            EmploymentInfoRow.getLookup = getLookup;
        })(EmploymentInfoRow = HRM.EmploymentInfoRow || (HRM.EmploymentInfoRow = {}));
    })(HRM = VistaLOAN.HRM || (VistaLOAN.HRM = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var HRM;
    (function (HRM) {
        var EmploymentInfoService;
        (function (EmploymentInfoService) {
            EmploymentInfoService.baseUrl = 'HRM/EmploymentInfo';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                EmploymentInfoService[x] = function (r, s, o) {
                    return Q.serviceRequest(EmploymentInfoService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(EmploymentInfoService = HRM.EmploymentInfoService || (HRM.EmploymentInfoService = {}));
    })(HRM = VistaLOAN.HRM || (VistaLOAN.HRM = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var HRM;
    (function (HRM) {
        var EmpPhotoRow;
        (function (EmpPhotoRow) {
            EmpPhotoRow.idProperty = 'Id';
            EmpPhotoRow.localTextPrefix = 'HRM.EmpPhoto';
            EmpPhotoRow.lookupKey = 'HRM.EmpPhoto';
            function getLookup() {
                return Q.getLookup('HRM.EmpPhoto');
            }
            EmpPhotoRow.getLookup = getLookup;
        })(EmpPhotoRow = HRM.EmpPhotoRow || (HRM.EmpPhotoRow = {}));
    })(HRM = VistaLOAN.HRM || (VistaLOAN.HRM = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Loandb;
    (function (Loandb) {
        var LaLoanOpeningForm = (function (_super) {
            __extends(LaLoanOpeningForm, _super);
            function LaLoanOpeningForm() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LaLoanOpeningForm.formKey = 'Loandb.LaLoanOpening';
            return LaLoanOpeningForm;
        }(Serenity.PrefixedContext));
        Loandb.LaLoanOpeningForm = LaLoanOpeningForm;
        [['EmployeeId', function () { return Serenity.IntegerEditor; }], ['BalanceMonth', function () { return Serenity.IntegerEditor; }], ['BalanceYear', function () { return Serenity.IntegerEditor; }], ['PrincipalInstallmentNo', function () { return Serenity.IntegerEditor; }], ['PrincipalInstallmentAmount', function () { return Serenity.DecimalEditor; }], ['PrincipalPaidAmount', function () { return Serenity.DecimalEditor; }], ['PrincipalDueAmount', function () { return Serenity.DecimalEditor; }], ['InterestInstallmentNo', function () { return Serenity.IntegerEditor; }], ['InterestInstallmentAmount', function () { return Serenity.DecimalEditor; }], ['InterestPaidAmount', function () { return Serenity.DecimalEditor; }], ['InterestDueAmount', function () { return Serenity.DecimalEditor; }], ['IUser', function () { return Serenity.StringEditor; }], ['IDate', function () { return Serenity.DateEditor; }], ['EUser', function () { return Serenity.StringEditor; }], ['EDate', function () { return Serenity.DateEditor; }], ['LoanApplicationId', function () { return Serenity.IntegerEditor; }]].forEach(function (x) { return Object.defineProperty(LaLoanOpeningForm.prototype, x[0], { get: function () { return this.w(x[0], x[1]()); }, enumerable: true, configurable: true }); });
    })(Loandb = VistaLOAN.Loandb || (VistaLOAN.Loandb = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Loandb;
    (function (Loandb) {
        var LaLoanOpeningRow;
        (function (LaLoanOpeningRow) {
            LaLoanOpeningRow.idProperty = 'Id';
            LaLoanOpeningRow.nameProperty = 'IUser';
            LaLoanOpeningRow.localTextPrefix = 'Loandb.LaLoanOpening';
            var Fields;
            (function (Fields) {
            })(Fields = LaLoanOpeningRow.Fields || (LaLoanOpeningRow.Fields = {}));
            ['Id', 'EmployeeId', 'BalanceMonth', 'BalanceYear', 'PrincipalInstallmentNo', 'PrincipalInstallmentAmount', 'PrincipalPaidAmount', 'PrincipalDueAmount', 'InterestInstallmentNo', 'InterestInstallmentAmount', 'InterestPaidAmount', 'InterestDueAmount', 'IUser', 'IDate', 'EUser', 'EDate', 'LoanApplicationId', 'LoanApplicationLoanNo', 'LoanApplicationEmployeeId', 'LoanApplicationSeniorityNo', 'LoanApplicationApplyDate', 'LoanApplicationLoanCriteriaId', 'LoanApplicationApplyLoanAmount', 'LoanApplicationApplyPrincipalInstallmentNo', 'LoanApplicationApplyInterestAmount', 'LoanApplicationApplyInterestInstallmentNo', 'LoanApplicationApplyInterestRate', 'LoanApplicationPurpose', 'LoanApplicationGrantedLoanAmount', 'LoanApplicationGrantedPrincipalInstallmentNo', 'LoanApplicationGrantedInterestAmount', 'LoanApplicationGrantedInterestInstallmentNo', 'LoanApplicationGrantedInterestRate', 'LoanApplicationNodeId', 'LoanApplicationApproverId', 'LoanApplicationAppStatusId', 'LoanApplicationIsDiscard', 'LoanApplicationIsApprovalProcess', 'LoanApplicationIsOffLine', 'LoanApplicationIUser', 'LoanApplicationIDate', 'LoanApplicationEUser', 'LoanApplicationEDate', 'LoanApplicationApprovedDate', 'LoanApplicationIsRefundablePfLoan', 'LoanApplicationIsReApply', 'LoanApplicationIsIssue', 'LoanApplicationResponsiblePersonId'].forEach(function (x) { return Fields[x] = x; });
        })(LaLoanOpeningRow = Loandb.LaLoanOpeningRow || (Loandb.LaLoanOpeningRow = {}));
    })(Loandb = VistaLOAN.Loandb || (VistaLOAN.Loandb = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Loandb;
    (function (Loandb) {
        var LaLoanOpeningService;
        (function (LaLoanOpeningService) {
            LaLoanOpeningService.baseUrl = 'Loandb/LaLoanOpening';
            var Methods;
            (function (Methods) {
            })(Methods = LaLoanOpeningService.Methods || (LaLoanOpeningService.Methods = {}));
            ['Create', 'Update', 'Delete', 'Retrieve', 'List'].forEach(function (x) {
                LaLoanOpeningService[x] = function (r, s, o) { return Q.serviceRequest(LaLoanOpeningService.baseUrl + '/' + x, r, s, o); };
                Methods[x] = LaLoanOpeningService.baseUrl + '/' + x;
            });
        })(LaLoanOpeningService = Loandb.LaLoanOpeningService || (Loandb.LaLoanOpeningService = {}));
    })(Loandb = VistaLOAN.Loandb || (VistaLOAN.Loandb = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var ChangePasswordForm = (function (_super) {
            __extends(ChangePasswordForm, _super);
            function ChangePasswordForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!ChangePasswordForm.init) {
                    ChangePasswordForm.init = true;
                    var s = Serenity;
                    var w0 = s.PasswordEditor;
                    Q.initFormType(ChangePasswordForm, [
                        'OldPassword', w0,
                        'NewPassword', w0,
                        'ConfirmPassword', w0
                    ]);
                }
                return _this;
            }
            ChangePasswordForm.formKey = 'Membership.ChangePassword';
            return ChangePasswordForm;
        }(Serenity.PrefixedContext));
        Membership.ChangePasswordForm = ChangePasswordForm;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var ForgotPasswordForm = (function (_super) {
            __extends(ForgotPasswordForm, _super);
            function ForgotPasswordForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!ForgotPasswordForm.init) {
                    ForgotPasswordForm.init = true;
                    var s = Serenity;
                    var w0 = s.EmailEditor;
                    Q.initFormType(ForgotPasswordForm, [
                        'Email', w0
                    ]);
                }
                return _this;
            }
            ForgotPasswordForm.formKey = 'Membership.ForgotPassword';
            return ForgotPasswordForm;
        }(Serenity.PrefixedContext));
        Membership.ForgotPasswordForm = ForgotPasswordForm;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var LoginForm = (function (_super) {
            __extends(LoginForm, _super);
            function LoginForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LoginForm.init) {
                    LoginForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.PasswordEditor;
                    Q.initFormType(LoginForm, [
                        'Username', w0,
                        'Password', w1
                    ]);
                }
                return _this;
            }
            LoginForm.formKey = 'Membership.Login';
            return LoginForm;
        }(Serenity.PrefixedContext));
        Membership.LoginForm = LoginForm;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var ResetPasswordForm = (function (_super) {
            __extends(ResetPasswordForm, _super);
            function ResetPasswordForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!ResetPasswordForm.init) {
                    ResetPasswordForm.init = true;
                    var s = Serenity;
                    var w0 = s.PasswordEditor;
                    Q.initFormType(ResetPasswordForm, [
                        'NewPassword', w0,
                        'ConfirmPassword', w0
                    ]);
                }
                return _this;
            }
            ResetPasswordForm.formKey = 'Membership.ResetPassword';
            return ResetPasswordForm;
        }(Serenity.PrefixedContext));
        Membership.ResetPasswordForm = ResetPasswordForm;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var SignUpForm = (function (_super) {
            __extends(SignUpForm, _super);
            function SignUpForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!SignUpForm.init) {
                    SignUpForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.EmailEditor;
                    var w2 = s.PasswordEditor;
                    Q.initFormType(SignUpForm, [
                        'DisplayName', w0,
                        'Email', w1,
                        'ConfirmEmail', w1,
                        'Password', w2,
                        'ConfirmPassword', w2
                    ]);
                }
                return _this;
            }
            SignUpForm.formKey = 'Membership.SignUp';
            return SignUpForm;
        }(Serenity.PrefixedContext));
        Membership.SignUpForm = SignUpForm;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var MonthList;
    (function (MonthList) {
        MonthList[MonthList["January"] = 1] = "January";
        MonthList[MonthList["February"] = 2] = "February";
        MonthList[MonthList["March"] = 3] = "March";
        MonthList[MonthList["April"] = 4] = "April";
        MonthList[MonthList["May"] = 5] = "May";
        MonthList[MonthList["June"] = 6] = "June";
        MonthList[MonthList["July"] = 7] = "July";
        MonthList[MonthList["August"] = 8] = "August";
        MonthList[MonthList["September"] = 9] = "September";
        MonthList[MonthList["October"] = 10] = "October";
        MonthList[MonthList["November"] = 11] = "November";
        MonthList[MonthList["December"] = 12] = "December";
    })(MonthList = VistaLOAN.MonthList || (VistaLOAN.MonthList = {}));
    Serenity.Decorators.registerEnumType(MonthList, 'VistaLOAN.MonthList', 'MonthList');
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var PFLoanType;
    (function (PFLoanType) {
        PFLoanType[PFLoanType["NonRefundable"] = 0] = "NonRefundable";
        PFLoanType[PFLoanType["Refundable"] = 1] = "Refundable";
    })(PFLoanType = VistaLOAN.PFLoanType || (VistaLOAN.PFLoanType = {}));
    Serenity.Decorators.registerEnumType(PFLoanType, 'VistaLOAN.PFLoanType', 'PFLoanType');
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaDonorInformationForm = (function (_super) {
            __extends(LaDonorInformationForm, _super);
            function LaDonorInformationForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaDonorInformationForm.init) {
                    LaDonorInformationForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.DateEditor;
                    Q.initFormType(LaDonorInformationForm, [
                        'DonorName', w0,
                        'Address', w0,
                        'PhoneNo', w0,
                        'FaxNo', w0,
                        'Email', w0,
                        'MobileNo', w0,
                        'ContactPersonName', w0,
                        'ContanctPersonMobileNo', w0,
                        'Remark', w0,
                        'IUser', w0,
                        'IDate', w1,
                        'EUser', w0,
                        'EDate', w1
                    ]);
                }
                return _this;
            }
            LaDonorInformationForm.formKey = 'Setup.LaDonorInformation';
            return LaDonorInformationForm;
        }(Serenity.PrefixedContext));
        Setup.LaDonorInformationForm = LaDonorInformationForm;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaDonorInformationRow;
        (function (LaDonorInformationRow) {
            LaDonorInformationRow.idProperty = 'Id';
            LaDonorInformationRow.nameProperty = 'DonorName';
            LaDonorInformationRow.localTextPrefix = 'Setup.LaDonorInformation';
            LaDonorInformationRow.lookupKey = 'Setup.LaDonorInformation';
            function getLookup() {
                return Q.getLookup('Setup.LaDonorInformation');
            }
            LaDonorInformationRow.getLookup = getLookup;
        })(LaDonorInformationRow = Setup.LaDonorInformationRow || (Setup.LaDonorInformationRow = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaDonorInformationService;
        (function (LaDonorInformationService) {
            LaDonorInformationService.baseUrl = 'Setup/LaDonorInformation';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaDonorInformationService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaDonorInformationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaDonorInformationService = Setup.LaDonorInformationService || (Setup.LaDonorInformationService = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanApplicationLastNumberForm = (function (_super) {
            __extends(LaLoanApplicationLastNumberForm, _super);
            function LaLoanApplicationLastNumberForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanApplicationLastNumberForm.init) {
                    LaLoanApplicationLastNumberForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.IntegerEditor;
                    Q.initFormType(LaLoanApplicationLastNumberForm, [
                        'LoanCriteriaId', w0,
                        'LastLoanNumber', w1
                    ]);
                }
                return _this;
            }
            LaLoanApplicationLastNumberForm.formKey = 'Setup.LaLoanApplicationLastNumber';
            return LaLoanApplicationLastNumberForm;
        }(Serenity.PrefixedContext));
        Setup.LaLoanApplicationLastNumberForm = LaLoanApplicationLastNumberForm;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanApplicationLastNumberRow;
        (function (LaLoanApplicationLastNumberRow) {
            LaLoanApplicationLastNumberRow.idProperty = 'Id';
            LaLoanApplicationLastNumberRow.localTextPrefix = 'Setup.LaLoanApplicationLastNumber';
            LaLoanApplicationLastNumberRow.lookupKey = 'Setup.LaLoanApplicationLastNumber';
            function getLookup() {
                return Q.getLookup('Setup.LaLoanApplicationLastNumber');
            }
            LaLoanApplicationLastNumberRow.getLookup = getLookup;
        })(LaLoanApplicationLastNumberRow = Setup.LaLoanApplicationLastNumberRow || (Setup.LaLoanApplicationLastNumberRow = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanApplicationLastNumberService;
        (function (LaLoanApplicationLastNumberService) {
            LaLoanApplicationLastNumberService.baseUrl = 'Setup/LaLoanApplicationLastNumber';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanApplicationLastNumberService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanApplicationLastNumberService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanApplicationLastNumberService = Setup.LaLoanApplicationLastNumberService || (Setup.LaLoanApplicationLastNumberService = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanCriteriaForm = (function (_super) {
            __extends(LaLoanCriteriaForm, _super);
            function LaLoanCriteriaForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanCriteriaForm.init) {
                    LaLoanCriteriaForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.LookupEditor;
                    Q.initFormType(LaLoanCriteriaForm, [
                        'SchemeName', w0,
                        'LoanTypeId', w1
                    ]);
                }
                return _this;
            }
            LaLoanCriteriaForm.formKey = 'Setup.LaLoanCriteria';
            return LaLoanCriteriaForm;
        }(Serenity.PrefixedContext));
        Setup.LaLoanCriteriaForm = LaLoanCriteriaForm;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanCriteriaRow;
        (function (LaLoanCriteriaRow) {
            LaLoanCriteriaRow.idProperty = 'Id';
            LaLoanCriteriaRow.nameProperty = 'SchemeName';
            LaLoanCriteriaRow.localTextPrefix = 'Setup.LaLoanCriteria';
            LaLoanCriteriaRow.lookupKey = 'Setup.LaLoanCriteria';
            function getLookup() {
                return Q.getLookup('Setup.LaLoanCriteria');
            }
            LaLoanCriteriaRow.getLookup = getLookup;
        })(LaLoanCriteriaRow = Setup.LaLoanCriteriaRow || (Setup.LaLoanCriteriaRow = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanCriteriaService;
        (function (LaLoanCriteriaService) {
            LaLoanCriteriaService.baseUrl = 'Setup/LaLoanCriteria';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanCriteriaService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanCriteriaService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanCriteriaService = Setup.LaLoanCriteriaService || (Setup.LaLoanCriteriaService = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanEligibleInformationForm = (function (_super) {
            __extends(LaLoanEligibleInformationForm, _super);
            function LaLoanEligibleInformationForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanEligibleInformationForm.init) {
                    LaLoanEligibleInformationForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.IntegerEditor;
                    Q.initFormType(LaLoanEligibleInformationForm, [
                        'LoanTypeId', w0,
                        'EmployeeCategoryId', w0,
                        'GradeFromId', w0,
                        'GradeToId', w0,
                        'ServiceDurationMin', w1,
                        'MaxNoLoanApply', w1
                    ]);
                }
                return _this;
            }
            LaLoanEligibleInformationForm.formKey = 'Setup.LaLoanEligibleInformation';
            return LaLoanEligibleInformationForm;
        }(Serenity.PrefixedContext));
        Setup.LaLoanEligibleInformationForm = LaLoanEligibleInformationForm;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanEligibleInformationRow;
        (function (LaLoanEligibleInformationRow) {
            LaLoanEligibleInformationRow.idProperty = 'Id';
            LaLoanEligibleInformationRow.nameProperty = 'IUser';
            LaLoanEligibleInformationRow.localTextPrefix = 'Setup.LaLoanEligibleInformation';
            LaLoanEligibleInformationRow.lookupKey = 'Setup.LaLoanEligibleInformation';
            function getLookup() {
                return Q.getLookup('Setup.LaLoanEligibleInformation');
            }
            LaLoanEligibleInformationRow.getLookup = getLookup;
        })(LaLoanEligibleInformationRow = Setup.LaLoanEligibleInformationRow || (Setup.LaLoanEligibleInformationRow = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanEligibleInformationService;
        (function (LaLoanEligibleInformationService) {
            LaLoanEligibleInformationService.baseUrl = 'Setup/LaLoanEligibleInformation';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanEligibleInformationService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanEligibleInformationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanEligibleInformationService = Setup.LaLoanEligibleInformationService || (Setup.LaLoanEligibleInformationService = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanTypeForm = (function (_super) {
            __extends(LaLoanTypeForm, _super);
            function LaLoanTypeForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanTypeForm.init) {
                    LaLoanTypeForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.LookupEditor;
                    var w2 = s.BooleanEditor;
                    var w3 = s.IntegerEditor;
                    Q.initFormType(LaLoanTypeForm, [
                        'LoanTypeName', w0,
                        'PrincipalHeadId', w1,
                        'InterestHeadId', w1,
                        'IsWelfareLoan', w2,
                        'IsPfLoan', w2,
                        'IsInterestPaymentWithPricipal', w2,
                        'IsInterestCalculateOnIssueDate', w2,
                        'GracePeriodMonth', w3,
                        'CalculationType', w3,
                        'ShortCode', w0
                    ]);
                }
                return _this;
            }
            LaLoanTypeForm.formKey = 'Setup.LaLoanType';
            return LaLoanTypeForm;
        }(Serenity.PrefixedContext));
        Setup.LaLoanTypeForm = LaLoanTypeForm;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanTypeRow;
        (function (LaLoanTypeRow) {
            LaLoanTypeRow.idProperty = 'Id';
            LaLoanTypeRow.nameProperty = 'LoanTypeName';
            LaLoanTypeRow.localTextPrefix = 'Setup.LaLoanType';
            LaLoanTypeRow.lookupKey = 'Setup.LaLoanType';
            function getLookup() {
                return Q.getLookup('Setup.LaLoanType');
            }
            LaLoanTypeRow.getLookup = getLookup;
        })(LaLoanTypeRow = Setup.LaLoanTypeRow || (Setup.LaLoanTypeRow = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanTypeService;
        (function (LaLoanTypeService) {
            LaLoanTypeService.baseUrl = 'Setup/LaLoanType';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List',
                'SetLoanType'
            ].forEach(function (x) {
                LaLoanTypeService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanTypeService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanTypeService = Setup.LaLoanTypeService || (Setup.LaLoanTypeService = {}));
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var SelectLoanTypeForm = (function (_super) {
            __extends(SelectLoanTypeForm, _super);
            function SelectLoanTypeForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!SelectLoanTypeForm.init) {
                    SelectLoanTypeForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    Q.initFormType(SelectLoanTypeForm, [
                        'LoanTypeInformationId', w0
                    ]);
                }
                return _this;
            }
            SelectLoanTypeForm.formKey = 'Setup.SelectLoanTypeForm';
            return SelectLoanTypeForm;
        }(Serenity.PrefixedContext));
        Setup.SelectLoanTypeForm = SelectLoanTypeForm;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaCpfCashOrChequeCollectionForm = (function (_super) {
            __extends(LaCpfCashOrChequeCollectionForm, _super);
            function LaCpfCashOrChequeCollectionForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaCpfCashOrChequeCollectionForm.init) {
                    LaCpfCashOrChequeCollectionForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = VistaLOAN.MonthListEditor;
                    var w2 = s.StringEditor;
                    var w3 = VistaLOAN.CashOrChequeSelectEditor;
                    var w4 = s.DateEditor;
                    var w5 = s.TextAreaEditor;
                    var w6 = s.RadioButtonEditor;
                    var w7 = s.DecimalEditor;
                    Q.initFormType(LaCpfCashOrChequeCollectionForm, [
                        'EmployeeId', w0,
                        'CollectionMonth', w1,
                        'CollectionYear', w2,
                        'CashorCheque', w3,
                        'CollectionDate', w4,
                        'Remarks', w5,
                        'CollectionType', w6,
                        'ApplicationId', w0,
                        'PrincipalInstallment', w7,
                        'InterestInstallment', w7,
                        'PfOwnContribution', w7,
                        'PFOwnInterest', w7,
                        'PFCompanyContribution', w7,
                        'PFCompanyInterest', w7
                    ]);
                }
                return _this;
            }
            LaCpfCashOrChequeCollectionForm.formKey = 'Task.LaCpfCashOrChequeCollection';
            return LaCpfCashOrChequeCollectionForm;
        }(Serenity.PrefixedContext));
        Task.LaCpfCashOrChequeCollectionForm = LaCpfCashOrChequeCollectionForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaCpfCashOrChequeCollectionRow;
        (function (LaCpfCashOrChequeCollectionRow) {
            LaCpfCashOrChequeCollectionRow.idProperty = 'Id';
            LaCpfCashOrChequeCollectionRow.nameProperty = 'CollectionMonth';
            LaCpfCashOrChequeCollectionRow.localTextPrefix = 'Task.LaCpfCashOrChequeCollection';
            LaCpfCashOrChequeCollectionRow.lookupKey = 'Task.LaCpfCashOrChequeCollection';
            function getLookup() {
                return Q.getLookup('Task.LaCpfCashOrChequeCollection');
            }
            LaCpfCashOrChequeCollectionRow.getLookup = getLookup;
        })(LaCpfCashOrChequeCollectionRow = Task.LaCpfCashOrChequeCollectionRow || (Task.LaCpfCashOrChequeCollectionRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaCpfCashOrChequeCollectionService;
        (function (LaCpfCashOrChequeCollectionService) {
            LaCpfCashOrChequeCollectionService.baseUrl = 'Task/LaCpfCashOrChequeCollection';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaCpfCashOrChequeCollectionService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaCpfCashOrChequeCollectionService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaCpfCashOrChequeCollectionService = Task.LaCpfCashOrChequeCollectionService || (Task.LaCpfCashOrChequeCollectionService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationForm = (function (_super) {
            __extends(LaLoanApplicationForm, _super);
            function LaLoanApplicationForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanApplicationForm.init) {
                    LaLoanApplicationForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.LookupEditor;
                    var w2 = s.IntegerEditor;
                    var w3 = s.DateEditor;
                    var w4 = s.DecimalEditor;
                    var w5 = s.BooleanEditor;
                    var w6 = VistaLOAN.PFLoanTypeEditor;
                    Q.initFormType(LaLoanApplicationForm, [
                        'EmployeeName', w0,
                        'EmployeeId', w1,
                        'SeniorityNo', w2,
                        'LoanCriteriaId', w1,
                        'LoanNo', w0,
                        'ApplyDate', w3,
                        'ApplyLoanAmount', w4,
                        'ApplyPrincipalInstallmentNo', w2,
                        'ApplyInterestAmount', w4,
                        'ApplyInterestInstallmentNo', w2,
                        'ApplyInterestRate', w4,
                        'Purpose', w0,
                        'GrantedLoanAmount', w4,
                        'GrantedPrincipalInstallmentNo', w2,
                        'GrantedInterestAmount', w4,
                        'GrantedInterestInstallmentNo', w2,
                        'GrantedInterestRate', w4,
                        'NodeId', w2,
                        'ApproverId', w1,
                        'AppStatusId', w1,
                        'IsDiscard', w5,
                        'IsApprovalProcess', w5,
                        'IsOffLine', w5,
                        'IUser', w0,
                        'IDate', w3,
                        'EUser', w0,
                        'EDate', w3,
                        'ApprovedDate', w3,
                        'PFLoanType', w6,
                        'IsReApply', w5,
                        'IsIssue', w5,
                        'ResponsiblePersonId', w0,
                        'EmployeeWiseLoanId', w2,
                        'NonRefundPFOwnLoanAmount', w4,
                        'NonRefundPFCompanyLoanAmount', w4,
                        'NonRefundOwnInterestLoanAmount', w4,
                        'NonRefundCompanyInterestLoanAmount', w4,
                        'EmpOwnContribution', w4,
                        'EmpOwnInterest', w4,
                        'CompanyContribution', w4,
                        'CompanyInterest', w4,
                        'Signature', w0,
                        'Sign', w0
                    ]);
                }
                return _this;
            }
            LaLoanApplicationForm.formKey = 'Task.LaLoanApplication';
            return LaLoanApplicationForm;
        }(Serenity.PrefixedContext));
        Task.LaLoanApplicationForm = LaLoanApplicationForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationOfflineForm = (function (_super) {
            __extends(LaLoanApplicationOfflineForm, _super);
            function LaLoanApplicationOfflineForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanApplicationOfflineForm.init) {
                    LaLoanApplicationOfflineForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.IntegerEditor;
                    var w2 = s.StringEditor;
                    var w3 = s.DateEditor;
                    var w4 = s.DecimalEditor;
                    var w5 = s.BooleanEditor;
                    var w6 = VistaLOAN.PFLoanTypeEditor;
                    Q.initFormType(LaLoanApplicationOfflineForm, [
                        'EmployeeId', w0,
                        'SeniorityNo', w1,
                        'LoanCriteriaId', w0,
                        'LoanNo', w2,
                        'ApplyDate', w3,
                        'ApplyLoanAmount', w4,
                        'ApplyPrincipalInstallmentNo', w1,
                        'ApplyInterestAmount', w4,
                        'ApplyInterestInstallmentNo', w1,
                        'ApplyInterestRate', w4,
                        'Purpose', w2,
                        'GrantedLoanAmount', w4,
                        'GrantedPrincipalInstallmentNo', w1,
                        'GrantedInterestAmount', w4,
                        'GrantedInterestInstallmentNo', w1,
                        'GrantedInterestRate', w4,
                        'NodeId', w1,
                        'ApproverId', w0,
                        'AppStatusId', w0,
                        'IsDiscard', w5,
                        'IsApprovalProcess', w5,
                        'IsOffLine', w5,
                        'ApprovedDate', w3,
                        'PFLoanType', w6,
                        'NonRefundPFOwnLoanAmount', w4,
                        'NonRefundPFCompanyLoanAmount', w4,
                        'NonRefundOwnInterestLoanAmount', w4,
                        'NonRefundCompanyInterestLoanAmount', w4,
                        'IsReApply', w5,
                        'IsIssue', w5,
                        'ResponsiblePersonId', w2,
                        'EmployeeWiseLoanId', w1,
                        'EmpOwnContribution', w4,
                        'EmpOwnInterest', w4,
                        'CompanyContribution', w4,
                        'CompanyInterest', w4
                    ]);
                }
                return _this;
            }
            LaLoanApplicationOfflineForm.formKey = 'Task.LaLoanApplicationOffline';
            return LaLoanApplicationOfflineForm;
        }(Serenity.PrefixedContext));
        Task.LaLoanApplicationOfflineForm = LaLoanApplicationOfflineForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationRow;
        (function (LaLoanApplicationRow) {
            LaLoanApplicationRow.idProperty = 'Id';
            LaLoanApplicationRow.nameProperty = 'LoanNo';
            LaLoanApplicationRow.localTextPrefix = 'Task.LaLoanApplication';
            LaLoanApplicationRow.lookupKey = 'Task.LaLoanApplication';
            function getLookup() {
                return Q.getLookup('Task.LaLoanApplication');
            }
            LaLoanApplicationRow.getLookup = getLookup;
        })(LaLoanApplicationRow = Task.LaLoanApplicationRow || (Task.LaLoanApplicationRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationService;
        (function (LaLoanApplicationService) {
            LaLoanApplicationService.baseUrl = 'Task/LaLoanApplication';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List',
                'GetCPFContribution',
                'GetCPFPolicy',
                'GetForfeitedRule'
            ].forEach(function (x) {
                LaLoanApplicationService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanApplicationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanApplicationService = Task.LaLoanApplicationService || (Task.LaLoanApplicationService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanCircularInformationForm = (function (_super) {
            __extends(LaLoanCircularInformationForm, _super);
            function LaLoanCircularInformationForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanCircularInformationForm.init) {
                    LaLoanCircularInformationForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.IntegerEditor;
                    var w2 = s.DateEditor;
                    var w3 = s.StringEditor;
                    Q.initFormType(LaLoanCircularInformationForm, [
                        'LoanTypeId', w0,
                        'FiscalYearId', w1,
                        'CircularDate', w2,
                        'ReferenceNo', w3,
                        'CircularDescription', w3,
                        'Attachment', w3,
                        'IUser', w3,
                        'IDate', w2,
                        'EUser', w3,
                        'EDate', w2
                    ]);
                }
                return _this;
            }
            LaLoanCircularInformationForm.formKey = 'Task.LaLoanCircularInformation';
            return LaLoanCircularInformationForm;
        }(Serenity.PrefixedContext));
        Task.LaLoanCircularInformationForm = LaLoanCircularInformationForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanCircularInformationRow;
        (function (LaLoanCircularInformationRow) {
            LaLoanCircularInformationRow.idProperty = 'Id';
            LaLoanCircularInformationRow.nameProperty = 'ReferenceNo';
            LaLoanCircularInformationRow.localTextPrefix = 'Task.LaLoanCircularInformation';
            LaLoanCircularInformationRow.lookupKey = 'Task.LaLoanCircularInformation';
            function getLookup() {
                return Q.getLookup('Task.LaLoanCircularInformation');
            }
            LaLoanCircularInformationRow.getLookup = getLookup;
        })(LaLoanCircularInformationRow = Task.LaLoanCircularInformationRow || (Task.LaLoanCircularInformationRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanCircularInformationService;
        (function (LaLoanCircularInformationService) {
            LaLoanCircularInformationService.baseUrl = 'Task/LaLoanCircularInformation';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanCircularInformationService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanCircularInformationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanCircularInformationService = Task.LaLoanCircularInformationService || (Task.LaLoanCircularInformationService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailForm = (function (_super) {
            __extends(LaLoanIssueDetailForm, _super);
            function LaLoanIssueDetailForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanIssueDetailForm.init) {
                    LaLoanIssueDetailForm.init = true;
                    var s = Serenity;
                    var w0 = s.IntegerEditor;
                    var w1 = s.DateEditor;
                    var w2 = s.DecimalEditor;
                    Q.initFormType(LaLoanIssueDetailForm, [
                        'LoanIssueId', w0,
                        'IssueDate', w1,
                        'LoanPaidAmount', w2
                    ]);
                }
                return _this;
            }
            LaLoanIssueDetailForm.formKey = 'Task.LaLoanIssueDetail';
            return LaLoanIssueDetailForm;
        }(Serenity.PrefixedContext));
        Task.LaLoanIssueDetailForm = LaLoanIssueDetailForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailRow;
        (function (LaLoanIssueDetailRow) {
            LaLoanIssueDetailRow.idProperty = 'Id';
            LaLoanIssueDetailRow.nameProperty = 'LoanIssueIUser';
            LaLoanIssueDetailRow.localTextPrefix = 'Task.LaLoanIssueDetail';
            LaLoanIssueDetailRow.lookupKey = 'Task.LaLoanIssueDetail';
            function getLookup() {
                return Q.getLookup('Task.LaLoanIssueDetail');
            }
            LaLoanIssueDetailRow.getLookup = getLookup;
        })(LaLoanIssueDetailRow = Task.LaLoanIssueDetailRow || (Task.LaLoanIssueDetailRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailService;
        (function (LaLoanIssueDetailService) {
            LaLoanIssueDetailService.baseUrl = 'Task/LaLoanIssueDetail';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanIssueDetailService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanIssueDetailService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanIssueDetailService = Task.LaLoanIssueDetailService || (Task.LaLoanIssueDetailService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueForm = (function (_super) {
            __extends(LaLoanIssueForm, _super);
            function LaLoanIssueForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanIssueForm.init) {
                    LaLoanIssueForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.IntegerEditor;
                    var w2 = s.DecimalEditor;
                    var w3 = s.BooleanEditor;
                    var w4 = s.DateEditor;
                    var w5 = Task.LaLoanIssueDetailEditor;
                    Q.initFormType(LaLoanIssueForm, [
                        'EmployeeId', w0,
                        'LoanApplicationId', w0,
                        'EffectiveMonth', w1,
                        'EffectiveYear', w1,
                        'LoanAmount', w2,
                        'PrincipalInstallmentAmount', w2,
                        'InterestAmount', w2,
                        'InterestInstallmentAmount', w2,
                        'IsFullPaid', w3,
                        'IsReschedule', w3,
                        'IsClose', w3,
                        'FullPaidDate', w4,
                        'LastPrincipalInstallmentAmount', w2,
                        'LastInterestInstallmentAmount', w2,
                        'IsPosting', w3,
                        'CloseDate', w4,
                        'LaLoanIssueDetail', w5
                    ]);
                }
                return _this;
            }
            LaLoanIssueForm.formKey = 'Task.LaLoanIssue';
            return LaLoanIssueForm;
        }(Serenity.PrefixedContext));
        Task.LaLoanIssueForm = LaLoanIssueForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueRow;
        (function (LaLoanIssueRow) {
            LaLoanIssueRow.idProperty = 'Id';
            LaLoanIssueRow.nameProperty = 'LoanApplicationLoanNo';
            LaLoanIssueRow.localTextPrefix = 'Task.LaLoanIssue';
            LaLoanIssueRow.lookupKey = 'Task.LaLoanIssue';
            function getLookup() {
                return Q.getLookup('Task.LaLoanIssue');
            }
            LaLoanIssueRow.getLookup = getLookup;
        })(LaLoanIssueRow = Task.LaLoanIssueRow || (Task.LaLoanIssueRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueService;
        (function (LaLoanIssueService) {
            LaLoanIssueService.baseUrl = 'Task/LaLoanIssue';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanIssueService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanIssueService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanIssueService = Task.LaLoanIssueService || (Task.LaLoanIssueService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanOpeningForm = (function (_super) {
            __extends(LaLoanOpeningForm, _super);
            function LaLoanOpeningForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaLoanOpeningForm.init) {
                    LaLoanOpeningForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = VistaLOAN.MonthListEditor;
                    var w2 = s.StringEditor;
                    var w3 = s.IntegerEditor;
                    var w4 = s.DecimalEditor;
                    Q.initFormType(LaLoanOpeningForm, [
                        'EmployeeId', w0,
                        'LoanApplicationId', w0,
                        'BalanceMonth', w1,
                        'BalanceYear', w2,
                        'PrincipalInstallmentNo', w3,
                        'PrincipalInstallmentAmount', w4,
                        'LoanAmount', w4,
                        'InterestAmount', w4,
                        'PrincipalPaidAmount', w4,
                        'PrincipalDueAmount', w4,
                        'InterestInstallmentNo', w3,
                        'InterestInstallmentAmount', w4,
                        'InterestPaidAmount', w4,
                        'InterestDueAmount', w4
                    ]);
                }
                return _this;
            }
            LaLoanOpeningForm.formKey = 'Task.LaLoanOpening';
            return LaLoanOpeningForm;
        }(Serenity.PrefixedContext));
        Task.LaLoanOpeningForm = LaLoanOpeningForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanOpeningRow;
        (function (LaLoanOpeningRow) {
            LaLoanOpeningRow.idProperty = 'Id';
            LaLoanOpeningRow.nameProperty = 'IUser';
            LaLoanOpeningRow.localTextPrefix = 'Task.LaLoanOpening';
            LaLoanOpeningRow.lookupKey = 'Task.LaLoanOpening';
            function getLookup() {
                return Q.getLookup('Task.LaLoanOpening');
            }
            LaLoanOpeningRow.getLookup = getLookup;
        })(LaLoanOpeningRow = Task.LaLoanOpeningRow || (Task.LaLoanOpeningRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanOpeningService;
        (function (LaLoanOpeningService) {
            LaLoanOpeningService.baseUrl = 'Task/LaLoanOpening';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaLoanOpeningService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaLoanOpeningService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaLoanOpeningService = Task.LaLoanOpeningService || (Task.LaLoanOpeningService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailForm = (function (_super) {
            __extends(LaMonthlyLoanInstallmentDetailForm, _super);
            function LaMonthlyLoanInstallmentDetailForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaMonthlyLoanInstallmentDetailForm.init) {
                    LaMonthlyLoanInstallmentDetailForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.DecimalEditor;
                    var w2 = s.StringEditor;
                    var w3 = s.DateEditor;
                    Q.initFormType(LaMonthlyLoanInstallmentDetailForm, [
                        'MonthlyLoanInstallmentId', w0,
                        'LoanIssueId', w0,
                        'EmployeeId', w0,
                        'PrincipalInstallmentAmount', w1,
                        'InterestInstallmentAmount', w1,
                        'TotalInstallmentAmount', w1,
                        'IUser', w2,
                        'IDate', w3,
                        'EUser', w2,
                        'EDate', w3
                    ]);
                }
                return _this;
            }
            LaMonthlyLoanInstallmentDetailForm.formKey = 'Task.LaMonthlyLoanInstallmentDetail';
            return LaMonthlyLoanInstallmentDetailForm;
        }(Serenity.PrefixedContext));
        Task.LaMonthlyLoanInstallmentDetailForm = LaMonthlyLoanInstallmentDetailForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailRow;
        (function (LaMonthlyLoanInstallmentDetailRow) {
            LaMonthlyLoanInstallmentDetailRow.idProperty = 'Id';
            LaMonthlyLoanInstallmentDetailRow.nameProperty = 'LoanIssueIUser';
            LaMonthlyLoanInstallmentDetailRow.localTextPrefix = 'Task.LaMonthlyLoanInstallmentDetail';
            LaMonthlyLoanInstallmentDetailRow.lookupKey = 'Task.LaMonthlyLoanInstallmentDetail';
            function getLookup() {
                return Q.getLookup('Task.LaMonthlyLoanInstallmentDetail');
            }
            LaMonthlyLoanInstallmentDetailRow.getLookup = getLookup;
        })(LaMonthlyLoanInstallmentDetailRow = Task.LaMonthlyLoanInstallmentDetailRow || (Task.LaMonthlyLoanInstallmentDetailRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailService;
        (function (LaMonthlyLoanInstallmentDetailService) {
            LaMonthlyLoanInstallmentDetailService.baseUrl = 'Task/LaMonthlyLoanInstallmentDetail';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaMonthlyLoanInstallmentDetailService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaMonthlyLoanInstallmentDetailService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaMonthlyLoanInstallmentDetailService = Task.LaMonthlyLoanInstallmentDetailService || (Task.LaMonthlyLoanInstallmentDetailService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentForm = (function (_super) {
            __extends(LaMonthlyLoanInstallmentForm, _super);
            function LaMonthlyLoanInstallmentForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaMonthlyLoanInstallmentForm.init) {
                    LaMonthlyLoanInstallmentForm.init = true;
                    var s = Serenity;
                    var w0 = VistaLOAN.MonthListEditor;
                    var w1 = s.StringEditor;
                    var w2 = s.DateEditor;
                    var w3 = s.DecimalEditor;
                    var w4 = s.BooleanEditor;
                    var w5 = Task.LaMonthlyLoanInstallmentDetailEditor;
                    Q.initFormType(LaMonthlyLoanInstallmentForm, [
                        'ForMonth', w0,
                        'ForYear', w1,
                        'IUser', w1,
                        'IDate', w2,
                        'EUser', w1,
                        'EDate', w2,
                        'TotalPrincipalInstallmentAmount', w3,
                        'TotalInterestInstallmentAmount', w3,
                        'IsProcess', w4,
                        'LaMonthlyLoanInstallmentDetailList', w5
                    ]);
                }
                return _this;
            }
            LaMonthlyLoanInstallmentForm.formKey = 'Task.LaMonthlyLoanInstallment';
            return LaMonthlyLoanInstallmentForm;
        }(Serenity.PrefixedContext));
        Task.LaMonthlyLoanInstallmentForm = LaMonthlyLoanInstallmentForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentRow;
        (function (LaMonthlyLoanInstallmentRow) {
            LaMonthlyLoanInstallmentRow.idProperty = 'Id';
            LaMonthlyLoanInstallmentRow.nameProperty = 'ForYear';
            LaMonthlyLoanInstallmentRow.localTextPrefix = 'Task.LaMonthlyLoanInstallment';
            LaMonthlyLoanInstallmentRow.lookupKey = 'Task.LaMonthlyLoanInstallment';
            function getLookup() {
                return Q.getLookup('Task.LaMonthlyLoanInstallment');
            }
            LaMonthlyLoanInstallmentRow.getLookup = getLookup;
        })(LaMonthlyLoanInstallmentRow = Task.LaMonthlyLoanInstallmentRow || (Task.LaMonthlyLoanInstallmentRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentService;
        (function (LaMonthlyLoanInstallmentService) {
            LaMonthlyLoanInstallmentService.baseUrl = 'Task/LaMonthlyLoanInstallment';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaMonthlyLoanInstallmentService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaMonthlyLoanInstallmentService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaMonthlyLoanInstallmentService = Task.LaMonthlyLoanInstallmentService || (Task.LaMonthlyLoanInstallmentService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaRequestedLoanApplicationForm = (function (_super) {
            __extends(LaRequestedLoanApplicationForm, _super);
            function LaRequestedLoanApplicationForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!LaRequestedLoanApplicationForm.init) {
                    LaRequestedLoanApplicationForm.init = true;
                    var s = Serenity;
                    var w0 = s.StringEditor;
                    var w1 = s.LookupEditor;
                    var w2 = s.IntegerEditor;
                    var w3 = s.DateEditor;
                    var w4 = s.DecimalEditor;
                    var w5 = s.BooleanEditor;
                    var w6 = s.RadioButtonEditor;
                    Q.initFormType(LaRequestedLoanApplicationForm, [
                        'EmployeeName', w0,
                        'EmployeeId', w1,
                        'SeniorityNo', w2,
                        'LoanCriteriaId', w1,
                        'LoanNo', w0,
                        'ApplyDate', w3,
                        'ApplyLoanAmount', w4,
                        'ApplyPrincipalInstallmentNo', w2,
                        'ApplyInterestAmount', w4,
                        'ApplyInterestInstallmentNo', w2,
                        'ApplyInterestRate', w4,
                        'Purpose', w0,
                        'GrantedLoanAmount', w4,
                        'GrantedPrincipalInstallmentNo', w2,
                        'GrantedInterestAmount', w4,
                        'GrantedInterestInstallmentNo', w2,
                        'GrantedInterestRate', w4,
                        'NodeId', w2,
                        'ApproverId', w1,
                        'NextApproverId', w1,
                        'AppStatusId', w1,
                        'IsDiscard', w5,
                        'IsApprovalProcess', w5,
                        'IsOffLine', w5,
                        'ApprovedDate', w3,
                        'PFLoanType', w6,
                        'IsReApply', w5,
                        'IsIssue', w5,
                        'ResponsiblePersonId', w0,
                        'EmployeeWiseLoanId', w2
                    ]);
                }
                return _this;
            }
            LaRequestedLoanApplicationForm.formKey = 'Task.LaRequestedLoanApplication';
            return LaRequestedLoanApplicationForm;
        }(Serenity.PrefixedContext));
        Task.LaRequestedLoanApplicationForm = LaRequestedLoanApplicationForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaRequestedLoanApplicationRow;
        (function (LaRequestedLoanApplicationRow) {
            LaRequestedLoanApplicationRow.idProperty = 'Id';
            LaRequestedLoanApplicationRow.nameProperty = 'LoanNo';
            LaRequestedLoanApplicationRow.localTextPrefix = 'Task.LaRequestedLoanApplication';
            LaRequestedLoanApplicationRow.lookupKey = 'Task.LaRequestedLoanApplication';
            function getLookup() {
                return Q.getLookup('Task.LaRequestedLoanApplication');
            }
            LaRequestedLoanApplicationRow.getLookup = getLookup;
        })(LaRequestedLoanApplicationRow = Task.LaRequestedLoanApplicationRow || (Task.LaRequestedLoanApplicationRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaRequestedLoanApplicationService;
        (function (LaRequestedLoanApplicationService) {
            LaRequestedLoanApplicationService.baseUrl = 'Task/LaRequestedLoanApplication';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                LaRequestedLoanApplicationService[x] = function (r, s, o) {
                    return Q.serviceRequest(LaRequestedLoanApplicationService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(LaRequestedLoanApplicationService = Task.LaRequestedLoanApplicationService || (Task.LaRequestedLoanApplicationService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var NonRefundableFinalPaymentForm = (function (_super) {
            __extends(NonRefundableFinalPaymentForm, _super);
            function NonRefundableFinalPaymentForm(prefix) {
                var _this = _super.call(this, prefix) || this;
                if (!NonRefundableFinalPaymentForm.init) {
                    NonRefundableFinalPaymentForm.init = true;
                    var s = Serenity;
                    var w0 = s.LookupEditor;
                    var w1 = s.IntegerEditor;
                    var w2 = VistaLOAN.PFPaymentTypeEditor;
                    var w3 = s.DateEditor;
                    var w4 = s.StringEditor;
                    var w5 = s.DecimalEditor;
                    var w6 = s.BooleanEditor;
                    Q.initFormType(NonRefundableFinalPaymentForm, [
                        'EmployeeId', w0,
                        'SeniorityNo', w1,
                        'LoanCriteriaId', w0,
                        'PFLoanType', w2,
                        'ApplyDate', w3,
                        'LoanNo', w4,
                        'ApplyLoanAmount', w5,
                        'ApplyPrincipalInstallmentNo', w1,
                        'ApplyInterestAmount', w5,
                        'ApplyInterestInstallmentNo', w1,
                        'ApplyInterestRate', w5,
                        'Purpose', w4,
                        'GrantedLoanAmount', w5,
                        'GrantedPrincipalInstallmentNo', w1,
                        'GrantedInterestAmount', w5,
                        'GrantedInterestInstallmentNo', w1,
                        'GrantedInterestRate', w5,
                        'NodeId', w1,
                        'ApproverId', w0,
                        'AppStatusId', w0,
                        'IsDiscard', w6,
                        'IsApprovalProcess', w6,
                        'IsOffLine', w6,
                        'ApprovedDate', w3,
                        'NonRefundPFOwnLoanAmount', w5,
                        'NonRefundPFCompanyLoanAmount', w5,
                        'NonRefundOwnInterestLoanAmount', w5,
                        'NonRefundCompanyInterestLoanAmount', w5,
                        'IsReApply', w6,
                        'IsIssue', w6,
                        'ResponsiblePersonId', w4,
                        'EmpOwnContribution', w5,
                        'EmpOwnInterest', w5,
                        'CompanyContribution', w5,
                        'CompanyInterest', w5,
                        'EmployeeWiseLoanId', w1,
                        'IUser', w4,
                        'IDate', w3,
                        'EUser', w4,
                        'EDate', w3
                    ]);
                }
                return _this;
            }
            NonRefundableFinalPaymentForm.formKey = 'Task.NonRefundableFinalPayment';
            return NonRefundableFinalPaymentForm;
        }(Serenity.PrefixedContext));
        Task.NonRefundableFinalPaymentForm = NonRefundableFinalPaymentForm;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var NonRefundableFinalPaymentRow;
        (function (NonRefundableFinalPaymentRow) {
            NonRefundableFinalPaymentRow.idProperty = 'Id';
            NonRefundableFinalPaymentRow.nameProperty = 'LoanNo';
            NonRefundableFinalPaymentRow.localTextPrefix = 'Task.NonRefundableFinalPayment';
            NonRefundableFinalPaymentRow.lookupKey = 'Task.NonRefundableFinalPayment';
            function getLookup() {
                return Q.getLookup('Task.NonRefundableFinalPayment');
            }
            NonRefundableFinalPaymentRow.getLookup = getLookup;
        })(NonRefundableFinalPaymentRow = Task.NonRefundableFinalPaymentRow || (Task.NonRefundableFinalPaymentRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var NonRefundableFinalPaymentService;
        (function (NonRefundableFinalPaymentService) {
            NonRefundableFinalPaymentService.baseUrl = 'Task/NonRefundableFinalPayment';
            [
                'Create',
                'Update',
                'Delete',
                'Retrieve',
                'List'
            ].forEach(function (x) {
                NonRefundableFinalPaymentService[x] = function (r, s, o) {
                    return Q.serviceRequest(NonRefundableFinalPaymentService.baseUrl + '/' + x, r, s, o);
                };
            });
        })(NonRefundableFinalPaymentService = Task.NonRefundableFinalPaymentService || (Task.NonRefundableFinalPaymentService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var PfFundDataMigrationForm = (function (_super) {
            __extends(PfFundDataMigrationForm, _super);
            function PfFundDataMigrationForm() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PfFundDataMigrationForm.formKey = 'Task.PfFundDataMigration';
            return PfFundDataMigrationForm;
        }(Serenity.PrefixedContext));
        Task.PfFundDataMigrationForm = PfFundDataMigrationForm;
        [['Empid', function () { return Serenity.StringEditor; }], ['Pfid', function () { return Serenity.IntegerEditor; }], ['Basic', function () { return Serenity.DecimalEditor; }], ['Pfintrate', function () { return Serenity.DecimalEditor; }], ['Pfmonth', function () { return Serenity.DateEditor; }], ['Mrat', function () { return Serenity.DecimalEditor; }], ['Brat', function () { return Serenity.DecimalEditor; }], ['Mcont', function () { return Serenity.DecimalEditor; }], ['Mcontcas', function () { return Serenity.DecimalEditor; }], ['Bcont', function () { return Serenity.DecimalEditor; }], ['Lnid', function () { return Serenity.IntegerEditor; }], ['Lnrecovrsal', function () { return Serenity.DecimalEditor; }], ['Lnrecovrcas', function () { return Serenity.DecimalEditor; }], ['LnAmtRefund', function () { return Serenity.DecimalEditor; }], ['LnAmtNonref', function () { return Serenity.DecimalEditor; }], ['Mcontcum', function () { return Serenity.DecimalEditor; }], ['Bcontcum', function () { return Serenity.DecimalEditor; }], ['Intmcum', function () { return Serenity.DecimalEditor; }], ['Intbcum', function () { return Serenity.DecimalEditor; }], ['Dedowncont', function () { return Serenity.DecimalEditor; }], ['Dedbcont', function () { return Serenity.DecimalEditor; }], ['Dedownint', function () { return Serenity.DecimalEditor; }], ['Dedbint', function () { return Serenity.DecimalEditor; }], ['EmpName', function () { return Serenity.StringEditor; }]].forEach(function (x) { return Object.defineProperty(PfFundDataMigrationForm.prototype, x[0], { get: function () { return this.w(x[0], x[1]()); }, enumerable: true, configurable: true }); });
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var PfFundDataMigrationRow;
        (function (PfFundDataMigrationRow) {
            PfFundDataMigrationRow.nameProperty = 'Empid';
            PfFundDataMigrationRow.localTextPrefix = 'Task.PfFundDataMigration';
            var Fields;
            (function (Fields) {
            })(Fields = PfFundDataMigrationRow.Fields || (PfFundDataMigrationRow.Fields = {}));
            ['Empid', 'Pfid', 'Basic', 'Pfintrate', 'Pfmonth', 'Mrat', 'Brat', 'Mcont', 'Mcontcas', 'Bcont', 'Lnid', 'Lnrecovrsal', 'Lnrecovrcas', 'LnAmtRefund', 'LnAmtNonref', 'Mcontcum', 'Bcontcum', 'Intmcum', 'Intbcum', 'Dedowncont', 'Dedbcont', 'Dedownint', 'Dedbint', 'EmpName'].forEach(function (x) { return Fields[x] = x; });
        })(PfFundDataMigrationRow = Task.PfFundDataMigrationRow || (Task.PfFundDataMigrationRow = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var PfFundDataMigrationService;
        (function (PfFundDataMigrationService) {
            PfFundDataMigrationService.baseUrl = 'Task/PfFundDataMigration';
            var Methods;
            (function (Methods) {
            })(Methods = PfFundDataMigrationService.Methods || (PfFundDataMigrationService.Methods = {}));
            ['Create', 'Update', 'Delete', 'Retrieve', 'List'].forEach(function (x) {
                PfFundDataMigrationService[x] = function (r, s, o) { return Q.serviceRequest(PfFundDataMigrationService.baseUrl + '/' + x, r, s, o); };
                Methods[x] = PfFundDataMigrationService.baseUrl + '/' + x;
            });
        })(PfFundDataMigrationService = Task.PfFundDataMigrationService || (Task.PfFundDataMigrationService = {}));
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var q = (function () {
        function q() {
        }
        q.getHours = function (fromDate, toDate) {
            var hours = 0;
            if (fromDate && toDate) {
                var totalMiliSeconds = toDate.valueOf() - fromDate.valueOf();
                hours = totalMiliSeconds / (1000 * 60 * 60);
            }
            return hours;
        };
        q.bindDateTimeEditorChange = function (editor, handler) {
            editor.change(handler);
            editor.element.closest('.field').find('.time').change(handler);
            editor.element.closest('.field').find('.inplace-now').click(handler);
        };
        q.initDetailEditor = function (dialog, editor) {
            editor.element.siblings('.caption').hide();
            editor.parentDialog = dialog;
        };
        q.addNotificationIcon = function (editor, isSuccess) {
            var isAddOnInitialized = editor.element.data('isAddOnInitialized');
            if (isAddOnInitialized != true) {
                editor.element.after('<span class="text text-danger" style="padding:3px"><i class="fa fa-times"></i></span>');
                editor.element.data('isAddOnInitialized', true);
            }
            if (isSuccess == true) {
                editor.element.switchClass('bg-danger', 'bg-success')
                    .siblings('.text').switchClass('text-danger', 'text-success')
                    .children().switchClass('fa-times', 'fa-check');
            }
            else {
                editor.element.switchClass('bg-success', 'bg-danger')
                    .siblings('.text').switchClass('text-success', 'text-danger')
                    .children().switchClass('fa-check', 'fa-times');
            }
        };
        return q;
    }());
    VistaLOAN.q = q;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var CorolEditor = (function (_super) {
        __extends(CorolEditor, _super);
        function CorolEditor(container) {
            var _this = _super.call(this, container) || this;
            try {
                _this.element.colorpicker({ format: "hex" });
            }
            catch (e) { }
            return _this;
        }
        CorolEditor.prototype.getTemplate = function () {
            return "<div class=\"input-group colorpicker-component\">\n                        <input type=\"text\" value=\"#00AABB\" class=\"form-control\" />\n                        <span class=\"input-group-addon\"><i></i></span>\n                    </div>";
        };
        ;
        CorolEditor.prototype.getEditValue = function (property, target) {
            try {
                var editVal = this.element.colorpicker().data().color;
                target[property.name] = editVal;
            }
            catch (e) { }
        };
        CorolEditor.prototype.setEditValue = function (source, property) {
            var val = source[property.name];
            //this.element.children('input').val(val);
            try {
                this.element.data('colorpicker').setValue(val);
            }
            catch (e) { }
        };
        CorolEditor = __decorate([
            Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue]),
            Serenity.Decorators.editor(),
            Serenity.Decorators.element("<div/>")
        ], CorolEditor);
        return CorolEditor;
    }(Serenity.TemplatedWidget));
    VistaLOAN.CorolEditor = CorolEditor;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var EntityDialogBase = (function (_super) {
        __extends(EntityDialogBase, _super);
        function EntityDialogBase() {
            var _this = _super.call(this) || this;
            _this.element.fadeTo(0, 0);
            VistaLOAN.DialogUtils.pendingChangesConfirmation(_this.element, function () { return _this.getSaveState() != _this.loadedState; });
            return _this;
        }
        //dialogOpen() {
        //    super.dialogOpen();
        //}
        //loadByIdAndOpenDialog(id) {
        //    super.loadByIdAndOpenDialog(id);
        //}
        EntityDialogBase.prototype.onDialogOpen = function () {
            _super.prototype.onDialogOpen.call(this);
            //this.fullContentArea();
            this.element.fadeTo(100, 1);
        };
        EntityDialogBase.prototype.getToolbarButtons = function () {
            var buttons = _super.prototype.getToolbarButtons.call(this);
            //buttons.push({
            //    title: 'Refresh',
            //    icon: 'fa fa-refresh',
            //    onClick: () => {
            //        this.onRefreshClick();
            //    }
            //})
            return buttons;
        };
        EntityDialogBase.prototype.onRefreshClick = function () {
        };
        EntityDialogBase.prototype.getSaveState = function () {
            try {
                return $.toJSON(this.getSaveEntity());
            }
            catch (e) {
                return null;
            }
        };
        EntityDialogBase.prototype.loadResponse = function (data) {
            _super.prototype.loadResponse.call(this, data);
            this.loadedState = this.getSaveState();
        };
        EntityDialogBase.prototype.maximize = function () {
            this.element.closest(".ui-dialog").find(".ui-icon-maximize-window").click();
        };
        EntityDialogBase.prototype.fullContentArea = function () {
            var $content = $('section.content');
            var dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");
            dialogElement.css({
                height: $content.height(),
                width: $content.width(),
                left: $content.position().left + 15,
                top: $content.position().top + 15,
            }).triggerHandler("resize");
            dialogElement.find('.ui-dialog-content').css({
                height: $content.height() - 50,
            });
            //this.element.find('.categories').css({
            //    height: $content.height() - 50,
            //});
            //.find('.s-PropertyGrid .categories').height('auto');
        };
        EntityDialogBase.prototype.setDialogSize = function (width, height, left, top) {
            var $content = $('section.content');
            var dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");
            var css = {
                height: height,
                width: width
            };
            if (left)
                css.left = left;
            if (top)
                css.top = top;
            dialogElement.css(css); //.triggerHandler("resize");
            dialogElement.find('.ui-dialog-content').css({
                height: height - 50,
            });
        };
        EntityDialogBase.prototype.hideEditorCaption = function (editor) {
            editor.siblings('.caption').hide();
        };
        EntityDialogBase.prototype.setGridEditorHeight = function (editor, heightInPx) {
            editor.css('height', heightInPx + 'px');
            editor.children('.grid-container').css('height', (heightInPx - 25) + 'px');
        };
        EntityDialogBase = __decorate([
            Serenity.Decorators.responsive(),
            Serenity.Decorators.maximizable()
        ], EntityDialogBase);
        return EntityDialogBase;
    }(Serenity.EntityDialog));
    VistaLOAN.EntityDialogBase = EntityDialogBase;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var EntityGridBase = (function (_super) {
        __extends(EntityGridBase, _super);
        function EntityGridBase(container, options) {
            return _super.call(this, container, options) || this;
            //$('section.content').fadeTo(0, 0);
            //this.slickContainer.fadeTo(0, 0);
        }
        EntityGridBase.prototype.createSlickGrid = function () {
            var grid = _super.prototype.createSlickGrid.call(this);
            this.autoColumnSizePlugin = new Slick.AutoColumnSize();
            grid.registerPlugin(this.autoColumnSizePlugin);
            return grid;
        };
        EntityGridBase.prototype.markupReady = function () {
            var _this = this;
            _super.prototype.markupReady.call(this);
            setTimeout(function () {
                if (_this.slickGrid.getOptions().forceFitColumns == false) {
                    //gridContainerWidth -= 45;
                }
                else {
                    _this.slickGrid.setOptions({ forceFitColumns: false });
                }
                var allColumns = _this.autoColumnSizePlugin.resizeAllColumns().filter(function (f) { return f.visible != false; }); // this.allColumns;
                var allVisibleColumnWidth = 0;
                allColumns.map(function (m) { return m.width; }).forEach(function (e) { return allVisibleColumnWidth += e; });
                var gridContainerWidth = _this.slickContainer.width();
                //let autoColumnSizePluginWidth = this.autoColumnSizePlugin.getAllColumnsWidth();
                if (allVisibleColumnWidth > gridContainerWidth) {
                    _this.slickGrid.setOptions({ forceFitColumns: false });
                    _this.autoColumnSizePlugin.resizeAllColumns();
                }
                else if (allVisibleColumnWidth < gridContainerWidth) {
                    _this.autoColumnSizePlugin.resizeAllColumns();
                    var fixedSizeColumns = allColumns.filter(function (c) { return c.width == c.maxWidth; });
                    var fixedSizeColumnsWidth_2 = 0;
                    fixedSizeColumns.map(function (m) { return m.width; }).forEach(function (e) { return fixedSizeColumnsWidth_2 += e; });
                    var resizableColumns = allColumns.filter(function (c) {
                        var proposedWidth = c.width * (gridContainerWidth / allVisibleColumnWidth);
                        return !c.maxWidth || c.maxWidth > proposedWidth;
                    });
                    var resizableColumnsWidth_2 = 0;
                    resizableColumns.map(function (m) { return m.width; }).forEach(function (e) { return resizableColumnsWidth_2 += e; });
                    var stretchableGridAreaWidth_2 = gridContainerWidth - fixedSizeColumnsWidth_2;
                    if (_this.slickGrid.getOptions().forceFitColumns == false) {
                        //stretchableGridAreaWidth -= fixedSizeColumnsWidth / 2.2;
                    }
                    resizableColumns.forEach(function (c) {
                        c.width = c.width * (stretchableGridAreaWidth_2 / resizableColumnsWidth_2);
                    });
                    _this.slickGrid.setColumns(allColumns);
                }
                //$('.grid-container').slideDown();
                //$('section.content').fadeTo(200, 1);
                //this.slickContainer.fadeTo(200, 1);
            }, 100);
            //this.slickGrid.autoSizeColumns();
        };
        EntityGridBase.prototype.getSlickOptions = function () {
            var opt = _super.prototype.getSlickOptions.call(this);
            opt.forceFitColumns = false;
            opt.enableTextSelectionOnCells = true;
            return opt;
        };
        EntityGridBase.prototype.getButtons = function () {
            var _this = this;
            var buttons = _super.prototype.getButtons.call(this);
            buttons.push(VistaLOAN.Common.ExcelExportHelper.createToolButton({
                grid: this,
                service: this.getService() + '/ListExcel',
                onViewSubmit: function () { return _this.onViewSubmit(); },
                separator: true
            }));
            buttons.push(VistaLOAN.Common.PdfExportHelper.createToolButton({
                grid: this,
                tableOptions: { theme: 'grid' },
                onViewSubmit: function () { return _this.onViewSubmit(); }
            }));
            return buttons;
        };
        EntityGridBase.prototype.getColumns = function () {
            var cols = _super.prototype.getColumns.call(this);
            cols.unshift({
                field: 'inline-actions',
                name: '',
                width: 25,
                maxWidth: 25,
                minWidth: 25,
                format: function (ctx) { return '<a class="inline-action view-details" title="view details"><i class="fa fa-pencil-square-o"></i></a>'; }
                //'<a class="inline-action delete-row" title="delete"><i class="fa fa-trash-o text-red"></i></a>'
            }, {
                field: 'Serial',
                name: '#',
                cssClass: 'align-center',
                headerCssClass: 'align-center',
                width: 60,
                maxWidth: 60,
                format: function (ctx) { return (ctx.row + 1).toString(); }
            });
            return cols;
        };
        EntityGridBase.prototype.onClick = function (e, row, cell) {
            _super.prototype.onClick.call(this, e, row, cell);
            if (e.isDefaultPrevented())
                return;
            var item = this.itemAt(row);
            var recordId = item[this.getIdProperty()];
            var target = $(e.target);
            // if user clicks "i" element, e.g. icon
            if (target.parent().hasClass('inline-action'))
                target = target.parent();
            if (target.hasClass('inline-action')) {
                //e.preventDefault();
                this.onInlineActionClick(target, recordId, item);
            }
        };
        EntityGridBase.prototype.onInlineActionClick = function (target, recordId, item) {
            var _this = this;
            if (target.hasClass('delete-row')) {
                Q.confirm('Delete record?', function () {
                    var o = _this;
                    if (o.deleteEntity) {
                        o.deleteEntity(recordId);
                    }
                    else {
                        Q.serviceRequest(_this.getService() + '/Delete', { EntityId: recordId }, function (response) {
                            _this.refresh();
                        });
                    }
                });
            }
            else if (target.hasClass('view-details')) {
                this.editItem(recordId);
            }
        };
        EntityGridBase.prototype.onViewProcessData = function (response) {
            var r = _super.prototype.onViewProcessData.call(this, response);
            var items = r.Entities;
            var gs = this.view.getGroups();
            if (gs.length == 0) {
                for (var i = 0; i < items.length; i++) {
                    items[i].Serial = response.Skip + i + 1;
                }
            }
            else {
                var _loop_1 = function (gi) {
                    var _loop_2 = function (i) {
                        var item = items.filter(function (f) { return f.Id == gs[gi].rows[i].Id; })[0];
                        if (item)
                            item.Serial = i + 1;
                    };
                    for (var i = 0; i < gs[gi].rows.length; i++) {
                        _loop_2(i);
                    }
                };
                for (var gi = 0; gi < gs.length; gi++) {
                    _loop_1(gi);
                }
            }
            return r;
        };
        EntityGridBase = __decorate([
            Serenity.Decorators.filterable()
        ], EntityGridBase);
        return EntityGridBase;
    }(Serenity.EntityGrid));
    VistaLOAN.EntityGridBase = EntityGridBase;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var EntityGridBaseNew = (function (_super) {
        __extends(EntityGridBaseNew, _super);
        function EntityGridBaseNew(container, options) {
            var _this = _super.call(this, container, options) || this;
            _this.isAutosized = false;
            $('section.content').fadeTo(0, 0);
            _this.slickContainer.fadeTo(0, 0);
            return _this;
        }
        EntityGridBaseNew.prototype.createSlickGrid = function () {
            var grid = _super.prototype.createSlickGrid.call(this);
            this.autoColumnSizePlugin = new Slick.AutoColumnSize();
            grid.registerPlugin(this.autoColumnSizePlugin);
            grid.setSelectionModel(new Slick.RowSelectionModel());
            return grid;
        };
        EntityGridBaseNew.prototype.markupReady = function () {
            var _this = this;
            _super.prototype.markupReady.call(this);
            setTimeout(function () {
                if (_this.isAutosized == false) {
                    _this.resizeAllCulumn();
                    $('section.content').fadeTo(200, 1);
                    _this.slickContainer.fadeTo(200, 1);
                }
            }, 200);
            //this.slickGrid.autoSizeColumns();
        };
        EntityGridBaseNew.prototype.resizeAllCulumn = function () {
            this.isAutosized = true;
            var gridContainerWidth = this.slickContainer.width();
            if (this.slickGrid.getOptions().forceFitColumns == false) {
                //gridContainerWidth -= 60;
            }
            else {
                this.slickGrid.setOptions({ forceFitColumns: false });
            }
            var allColumns = this.autoColumnSizePlugin.resizeAllColumns().filter(function (f) { return f.visible != false; }); // this.allColumns;
            var allVisibleColumnWidth = 0;
            allColumns.map(function (m) { return m.width; }).forEach(function (e) { return allVisibleColumnWidth += e; });
            if (allVisibleColumnWidth > gridContainerWidth) {
                this.slickGrid.setOptions({ forceFitColumns: false });
                this.autoColumnSizePlugin.resizeAllColumns();
            }
            else if (allVisibleColumnWidth < gridContainerWidth) {
                this.autoColumnSizePlugin.resizeAllColumns();
                var fixedSizeColumns = allColumns.filter(function (c) { return c.minWidth == c.maxWidth; });
                fixedSizeColumns.forEach(function (c) {
                    c.width = c.maxWidth;
                });
                var fixedSizeColumnsWidth_3 = 0;
                fixedSizeColumns.map(function (m) { return m.width; }).forEach(function (e) { return fixedSizeColumnsWidth_3 += e; });
                var stretchableGridAreaWidth_3 = gridContainerWidth - fixedSizeColumnsWidth_3 - 18;
                //if (this.view.getGrouping().length > 0) {
                //    stretchableGridAreaWidth -= 20;
                //}
                //if (this.element.hasClass('editor') == true) { // for detail grid
                //    stretchableGridAreaWidth -= fixedSizeColumnsWidth + 77;
                //}
                var resizableColumns = allColumns.filter(function (c) { return c.minWidth != c.maxWidth; }).filter(function (c) {
                    var proposedWidth = c.width * (gridContainerWidth / allVisibleColumnWidth);
                    return !c.maxWidth || c.maxWidth > proposedWidth;
                });
                var resizableColumnsWidth_3 = 0;
                resizableColumns.map(function (m) { return m.width; }).forEach(function (e) { return resizableColumnsWidth_3 += e; });
                resizableColumns.forEach(function (c) {
                    c.width = c.width * (stretchableGridAreaWidth_3 / resizableColumnsWidth_3);
                });
                this.slickGrid.setColumns(allColumns);
                this.slickGrid.onColumnsResized.notify();
            }
            //this.view.refresh();
            this.setItems(this.getItems());
        };
        EntityGridBaseNew.prototype.getSlickOptions = function () {
            var opt = _super.prototype.getSlickOptions.call(this);
            opt.forceFitColumns = false;
            opt.enableTextSelectionOnCells = true;
            opt.selectedCellCssClass = "slick-row-selected";
            opt.enableCellNavigation = true;
            return opt;
        };
        EntityGridBaseNew.prototype.getButtons = function () {
            var _this = this;
            var buttons = _super.prototype.getButtons.call(this);
            //buttons.push(Common.ExcelExportHelper.createToolButton({
            //    grid: this,
            //    service: this.getService() + '/ListExcel',
            //    onViewSubmit: () => this.onViewSubmit(),
            //    separator: true
            //}));
            buttons.push(VistaLOAN.Common.PdfExportHelper.createToolButton({
                grid: this,
                tableOptions: { theme: 'grid' },
                onViewSubmit: function () { return _this.onViewSubmit(); }
            }));
            return buttons;
        };
        EntityGridBaseNew.prototype.getColumns = function () {
            var cols = _super.prototype.getColumns.call(this);
            cols.unshift(
            //{
            //    field: 'inline-actions',
            //    name: '',
            //    width: 25,
            //    minWidth: 25,
            //    maxWidth: 25,
            //    format: ctx => '<a class="inline-action view-details" title="view details"><i class="fa fa-pencil-square-o"></i></a>'
            //    //+ '<a class="inline-action delete-row" title="delete"><i class="fa fa-trash-o text-red"></i></a>'
            //}
            //    ,
            {
                field: 'Serial',
                name: '#',
                cssClass: 'align-center',
                headerCssClass: 'align-center',
                width: 60,
                minWidth: 60,
                maxWidth: 60,
            });
            return cols;
        };
        EntityGridBaseNew.prototype.onClick = function (e, row, cell) {
            _super.prototype.onClick.call(this, e, row, cell);
            if (e.isDefaultPrevented())
                return;
            var item = this.itemAt(row);
            var recordId = item[this.getIdProperty()];
            var target = $(e.target);
            // if user clicks "i" element, e.g. icon
            if (target.parent().hasClass('inline-action'))
                target = target.parent();
            if (target.hasClass('inline-action')) {
                //e.preventDefault();
                this.onInlineActionClick(target, recordId, item);
            }
        };
        EntityGridBaseNew.prototype.onInlineActionClick = function (target, recordId, item) {
            var _this = this;
            if (target.hasClass('delete-row')) {
                Q.confirm('Delete record?', function () {
                    var o = _this;
                    if (o.deleteEntity) {
                        o.deleteEntity(recordId);
                    }
                    else {
                        Q.serviceRequest(_this.getService() + '/Delete', { EntityId: recordId }, function (response) {
                            _this.refresh();
                        });
                    }
                });
            }
            else if (target.hasClass('view-details')) {
                this.editItem(recordId);
            }
        };
        EntityGridBaseNew.prototype.onViewProcessData = function (response) {
            var _this = this;
            var r = _super.prototype.onViewProcessData.call(this, response);
            var items = r.Entities;
            var grouping_levels = this.view.getGrouping();
            if (grouping_levels.length == 0) {
                for (var i = 0; i < items.length; i++) {
                    items[i].Serial = response.Skip + i + 1;
                }
            }
            else if (grouping_levels.length = 1) {
                var groups_1 = this.view.getGroups();
                var generateSerialNo = function () {
                    groups_1 = _this.view.getGroups();
                    var _loop_3 = function (gi) {
                        var rows = groups_1[gi].rows;
                        var _loop_4 = function (i) {
                            var item = items.filter(function (f) { return f.Id == rows[i].Id; })[0];
                            if (item)
                                item.Serial = i + 1;
                        };
                        for (var i = 0; i < rows.length; i++) {
                            _loop_4(i);
                        }
                    };
                    for (var gi = 0; gi < groups_1.length; gi++) {
                        _loop_3(gi);
                    }
                };
                if (groups_1.length == 0) {
                    setTimeout(generateSerialNo);
                }
                else {
                    generateSerialNo();
                }
            }
            return r;
        };
        EntityGridBaseNew = __decorate([
            Serenity.Decorators.filterable()
        ], EntityGridBaseNew);
        return EntityGridBaseNew;
    }(Serenity.EntityGrid));
    VistaLOAN.EntityGridBaseNew = EntityGridBaseNew;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var GridEditorBase = (function (_super) {
        __extends(GridEditorBase, _super);
        function GridEditorBase(container) {
            var _this = _super.call(this, container) || this;
            _this.nextId = 1;
            return _this;
            //this.autoColumnSizePlugin.resizeAllColumns();
        }
        GridEditorBase.prototype.getIdProperty = function () { return "__id"; };
        GridEditorBase.prototype.getQuickFilters = function () {
            return [];
        };
        GridEditorBase.prototype.id = function (entity) {
            return entity[this.getIdProperty()];
        };
        GridEditorBase.prototype.save = function (opt, callback) {
            var _this = this;
            var request = opt.request;
            var row = Q.deepClone(request.Entity);
            var id = this.id(row);
            if (id == null) {
                row[this.getIdProperty()] = "`" + this.nextId++;
            }
            if (!this.validateEntity(row, id)) {
                return;
            }
            var items = this.view.getItems().slice();
            if (id == null) {
                items.push(row);
            }
            else {
                var index = Q.indexOf(items, function (x) { return _this.id(x) === id; });
                items[index] = Q.deepClone({}, items[index], row);
            }
            this.setEntities(items);
            callback({});
        };
        GridEditorBase.prototype.deleteEntity = function (id) {
            this.view.deleteItem(id);
            this.onItemsChanged();
            return true;
        };
        GridEditorBase.prototype.validateEntity = function (row, id) {
            return true;
        };
        GridEditorBase.prototype.setEntities = function (items) {
            this.view.setItems(items, true);
            this.onItemsChanged();
        };
        GridEditorBase.prototype.getNewEntity = function () {
            return {};
        };
        GridEditorBase.prototype.getButtons = function () {
            var _this = this;
            return [{
                    title: this.getAddButtonCaption(),
                    cssClass: 'add-button',
                    onClick: function () {
                        _this.createEntityDialog(_this.getItemType(), function (dlg) {
                            var dialog = dlg;
                            dialog.parentEditor = _this;
                            dialog.onSave = function (opt, callback) { return _this.save(opt, callback); };
                            dialog.loadEntityAndOpenDialog(_this.getNewEntity());
                        });
                    }
                }];
        };
        GridEditorBase.prototype.editItem = function (entityOrId) {
            var _this = this;
            var id = entityOrId;
            var item = this.view.getItemById(id);
            this.createEntityDialog(this.getItemType(), function (dlg) {
                var dialog = dlg;
                dialog.onDelete = function (opt, callback) {
                    if (!_this.deleteEntity(id)) {
                        return;
                    }
                    callback({});
                };
                dialog.parentEditor = _this;
                dialog.onSave = function (opt, callback) { return _this.save(opt, callback); };
                dialog.loadEntityAndOpenDialog(item);
            });
            ;
        };
        GridEditorBase.prototype.getEditValue = function (property, target) {
            target[property.name] = this.value;
        };
        GridEditorBase.prototype.setEditValue = function (source, property) {
            this.value = source[property.name];
        };
        Object.defineProperty(GridEditorBase.prototype, "value", {
            get: function () {
                var p = this.getIdProperty();
                return this.view.getItems().map(function (x) {
                    var y = Q.deepClone(x);
                    var id = y[p];
                    if (id && id.toString().charAt(0) == '`')
                        delete y[p];
                    return y;
                });
            },
            set: function (value) {
                var _this = this;
                var p = this.getIdProperty();
                this.view.setItems((value || []).map(function (x) {
                    var y = Q.deepClone(x);
                    if (y[p] == null)
                        y[p] = "`" + _this.nextId++;
                    return y;
                }), true);
            },
            enumerable: true,
            configurable: true
        });
        GridEditorBase.prototype.getGridCanLoad = function () {
            return false;
        };
        GridEditorBase.prototype.usePager = function () {
            return false;
        };
        GridEditorBase.prototype.getInitialTitle = function () {
            return null;
        };
        GridEditorBase.prototype.createQuickSearchInput = function () {
        };
        GridEditorBase.prototype.enableFiltering = function () { return false; };
        GridEditorBase.prototype.getSlickOptions = function () {
            var opt = _super.prototype.getSlickOptions.call(this);
            opt.forceFitColumns = false;
            //opt.autoHeight = true;
            return opt;
        };
        GridEditorBase.prototype.setMasterEntity = function (entity) {
            this.masterEntity = entity;
        };
        //custom events
        GridEditorBase.prototype.onItemsChanged = function () {
        };
        GridEditorBase = __decorate([
            Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue]),
            Serenity.Decorators.editor(),
            Serenity.Decorators.element("<div/>")
        ], GridEditorBase);
        return GridEditorBase;
    }(VistaLOAN.EntityGridBase));
    VistaLOAN.GridEditorBase = GridEditorBase;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var GridEditorDialog = (function (_super) {
        __extends(GridEditorDialog, _super);
        function GridEditorDialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GridEditorDialog.prototype.getIdProperty = function () { return "__id"; };
        GridEditorDialog.prototype.destroy = function () {
            this.onSave = null;
            this.onDelete = null;
            _super.prototype.destroy.call(this);
        };
        GridEditorDialog.prototype.updateInterface = function () {
            _super.prototype.updateInterface.call(this);
            this.saveAndCloseButton.find('.button-inner').text(this.isNew() ? 'Add' : 'Apply');
            // apply changes button doesn't work properly with in-memory grids yet
            if (this.applyChangesButton) {
                this.applyChangesButton.hide();
            }
        };
        GridEditorDialog.prototype.saveHandler = function (options, callback) {
            this.onSave && this.onSave(options, callback);
        };
        GridEditorDialog.prototype.deleteHandler = function (options, callback) {
            this.onDelete && this.onDelete(options, callback);
        };
        GridEditorDialog.prototype.setMasterEntity = function (entity) {
            this.masterEntity = entity;
        };
        GridEditorDialog = __decorate([
            Serenity.Decorators.registerClass()
        ], GridEditorDialog);
        return GridEditorDialog;
    }(VistaLOAN.EntityDialogBase));
    VistaLOAN.GridEditorDialog = GridEditorDialog;
})(VistaLOAN || (VistaLOAN = {}));
var q;
(function (q) {
    function groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }
    q.groupBy = groupBy;
    function sortBy(xs, key) {
        return xs.sort(function (a, b) {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        });
    }
    q.sortBy = sortBy;
    function sortByDesc(xs, key) {
        return xs.sort(function (a, b) {
            if (a[key] > b[key]) {
                return -1;
            }
            if (a[key] < b[key]) {
                return 1;
            }
            return 0;
        });
    }
    q.sortByDesc = sortByDesc;
})(q || (q = {}));
var q;
(function (q) {
    function nextTick(date) {
        return new Date(date.getTime() + 1);
    }
    q.nextTick = nextTick;
    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    q.addMinutes = addMinutes;
    function addHours(date, hours) {
        return new Date(date.getTime() + hours * 3600000);
    }
    q.addHours = addHours;
    function getHours(fromDate, toDate) {
        var hours = 0;
        if (fromDate && toDate) {
            var totalMiliSeconds = toDate.valueOf() - fromDate.valueOf();
            hours = totalMiliSeconds / (1000 * 60 * 60);
        }
        return hours;
    }
    q.getHours = getHours;
    function getDays24HourPulse(fromDate, toDate) {
        var days = q.getHours(fromDate, toDate) / 24;
        return Math.ceil(days);
    }
    q.getDays24HourPulse = getDays24HourPulse;
    function getDays(pFromDate, pToDate) {
        var fromDate = new Date(pFromDate.getFullYear(), pFromDate.getMonth(), pFromDate.getDate());
        var toDate = new Date(pToDate.getFullYear(), pToDate.getMonth(), pToDate.getDate(), 23, 59, 59);
        var days = q.getHours(fromDate, toDate) / 24;
        //days = days <= 0 ? 1 : days;
        return Math.ceil(days);
    }
    q.getDays = getDays;
    function getMonths(fromDate, toDate) {
        var months = q.getDays24HourPulse(fromDate, toDate) / 30;
        return Math.ceil(months);
    }
    q.getMonths = getMonths;
    function getCalenderMonths(fromDate, toDate) {
        var months;
        months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
        months -= fromDate.getMonth();
        months += toDate.getMonth();
        return months <= 0 ? 0 : months;
    }
    q.getCalenderMonths = getCalenderMonths;
    function getCalenderMonthsCeil(fromDate, toDate) {
        var months = q.getCalenderMonths(fromDate, toDate);
        return months == 0 ? 1 : months;
    }
    q.getCalenderMonthsCeil = getCalenderMonthsCeil;
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    q.addDays = addDays;
    function addMonths(date, months) {
        var result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }
    q.addMonths = addMonths;
    function addYear(date, years) {
        var result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }
    q.addYear = addYear;
    function getPeriods(fromDate, toDate, periodUnit) {
        if (periodUnit == _Ext.TimeUoM.Day) {
            var days = q.getDays(fromDate, toDate);
            return days;
        }
        else if (periodUnit == _Ext.TimeUoM.Month) {
            var months = q.getMonths(fromDate, toDate);
            return months == 0 ? 1 : months;
        }
        else if (periodUnit == _Ext.TimeUoM.CalenderMonth) {
            var calenderMonths = q.getCalenderMonths(fromDate, toDate);
            return calenderMonths + 1;
        }
    }
    q.getPeriods = getPeriods;
    function addPeriod(date, period, periodUnit) {
        var result = new Date(date);
        if (periodUnit == _Ext.TimeUoM.Day)
            result.setDate(result.getDate() + period);
        else if (periodUnit == _Ext.TimeUoM.Month)
            result.setMonth(result.getMonth() + period);
        else if (periodUnit == _Ext.TimeUoM.CalenderMonth) {
            result.setDate(1);
            result.setMonth(result.getMonth() + period);
        }
        return result;
    }
    q.addPeriod = addPeriod;
    function formatISODate(date) {
        if (date) {
            var offset = date.getTimezoneOffset();
            var result = new Date(date.getTime() - offset * 60 * 1000);
            return result.toISOString();
        }
        else
            return null;
    }
    q.formatISODate = formatISODate;
    //editor utils
    function bindDateTimeEditorChange(editor, handler) {
        editor.change(handler);
        editor.element.closest('.field').find('.time').change(handler);
        editor.element.closest('.field').find('.inplace-now').click(handler);
    }
    q.bindDateTimeEditorChange = bindDateTimeEditorChange;
    function initDateRangeEditor(fromDateEditor, toDateEditor, onChangeHandler) {
        var startDateTextBox = fromDateEditor.element;
        var endDateTextBox = toDateEditor.element;
        startDateTextBox.datepicker('option', 'onClose', function (dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datepicker('setDate', testStartDate);
            }
            else {
                endDateTextBox.val(dateText);
            }
        });
        endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
        startDateTextBox.datepicker('option', 'onSelect', function (selectedDateTime) {
            endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
        });
        endDateTextBox.datepicker('option', 'onClose', function (dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datepicker('setDate', testEndDate);
            }
            else {
                startDateTextBox.val(dateText);
            }
        });
        startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
        endDateTextBox.datepicker('option', 'onSelect', function (selectedDateTime) {
            startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
        });
        setTimeout(function () {
            fromDateEditor.change(onChangeHandler);
            toDateEditor.change(onChangeHandler);
        }, 500);
    }
    q.initDateRangeEditor = initDateRangeEditor;
    function initDateTimeRangeEditor(fromDateTimeEditor, toDateTimeEditor, onChangeHandler) {
        //fromDateTimeEditor.destroy();
        //toDateTimeEditor.destroy();
        var startDateTextBox = fromDateTimeEditor.element;
        var endDateTextBox = toDateTimeEditor.element;
        //startDateTextBox.datetimepicker('option', 'timeFormat', 'HH:mm z')
        startDateTextBox.datetimepicker('option', 'onClose', function (dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datetimepicker('setDate', testStartDate);
            }
            else {
                endDateTextBox.val(dateText);
            }
        });
        endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
        startDateTextBox.datetimepicker('option', 'onSelect', function (selectedDateTime) {
            endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
        });
        //endDateTextBox.datetimepicker('option', 'timeFormat', 'HH:mm z')
        endDateTextBox.datetimepicker('option', 'onClose', function (dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datetimepicker('setDate', testEndDate);
            }
            else {
                startDateTextBox.val(dateText);
            }
        });
        startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
        endDateTextBox.datetimepicker('option', 'onSelect', function (selectedDateTime) {
            startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
        });
        setTimeout(function () {
            fromDateTimeEditor.change(onChangeHandler);
            toDateTimeEditor.change(onChangeHandler);
        }, 500);
    }
    q.initDateTimeRangeEditor = initDateTimeRangeEditor;
    function formatDate(d, format) {
        if (!d) {
            return '';
        }
        var date;
        if (typeof d == "string") {
            var res = Q.parseDate(d);
            if (!res)
                return d;
            date = res;
        }
        else
            date = d;
        if (format == null || format == "d") {
            format = Q.Culture.dateFormat;
        }
        else {
            switch (format) {
                case "g":
                    format = Q.Culture.dateTimeFormat.replace(":ss", "");
                    break;
                case "G":
                    format = Q.Culture.dateTimeFormat;
                    break;
                case "s":
                    format = "yyyy-MM-ddTHH:mm:ss";
                    break;
                case "u": return Q.formatISODateTimeUTC(date);
            }
        }
        var pad = function (i) {
            return Q.zeroPad(i, 2);
        };
        return format.replace(new RegExp('dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|fff|zz?z?|\\/', 'g'), function (fmt) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            switch (fmt) {
                case '/': return Q.Culture.dateSeparator;
                case 'hh': return pad(((date.getHours() < 13) ? date.getHours() : (date.getHours() - 12)));
                case 'h': return ((date.getHours() < 13) ? date.getHours() : (date.getHours() - 12));
                case 'HH': return pad(date.getHours());
                case 'H': return date.getHours();
                case 'mm': return pad(date.getMinutes());
                case 'm': return date.getMinutes();
                case 'ss': return pad(date.getSeconds());
                case 's': return date.getSeconds();
                case 'yyyy': return date.getFullYear();
                case 'yy': return date.getFullYear().toString().substr(2, 4);
                case 'dddd': return days[date.getDay()];
                case 'ddd': return days[date.getDay()].substr(0, 3);
                case 'dd': return pad(date.getDate());
                case 'd': return date.getDate().toString();
                case 'MMMM': return months[date.getMonth()];
                case 'MMM': return months[date.getMonth()].substr(0, 3);
                case 'MM': return pad(date.getMonth() + 1);
                case 'M': return date.getMonth() + 1;
                case 't': return ((date.getHours() < 12) ? 'A' : 'P');
                case 'tt': return ((date.getHours() < 12) ? 'AM' : 'PM');
                case 'fff': return Q.zeroPad(date.getMilliseconds(), 3);
                case 'zzz':
                case 'zz':
                case 'z': return '';
                default: return fmt;
            }
        });
    }
    q.formatDate = formatDate;
})(q || (q = {}));
var q;
(function (q) {
    function initDetailEditor(dialog, editor, options) {
        if (options === void 0) { options = {}; }
        if (options.showCaption != true) {
            editor.element.siblings('.caption').hide();
        }
        if (options.hideToolbar == true) {
            editor.element.find('.grid-toolbar').hide();
        }
        if (options.isReadOnly == true) {
            editor.set_readOnly(options.isReadOnly);
        }
        editor.parentDialog = dialog;
        dialog.onAfterSetDialogSize = function () {
            var $gridContainer = editor.element.find('.grid-container');
            if (options.height) {
                editor.slickGrid.setOptions({ autoHeight: false });
                $gridContainer.height(options.height);
            }
            else {
                var top_1 = $gridContainer.position().top;
                var height = dialog.element.innerHeight() - top_1 - 40;
                if (height > 200)
                    $gridContainer.height(height);
            }
            if (options.width) {
                $gridContainer.width(options.width);
            }
            editor.slickGrid.resizeCanvas();
        };
    }
    q.initDetailEditor = initDetailEditor;
    function setGridEditorHeight(editor, heightInPx) {
        editor.css('height', heightInPx + 'px');
        editor.find('.grid-container')
            .css('height', (heightInPx - 25) + 'px')
            .height(heightInPx);
    }
    q.setGridEditorHeight = setGridEditorHeight;
    function addNotificationIcon(editor, isSuccess) {
        var isAddOnInitialized = editor.element.data('isAddOnInitialized');
        if (isAddOnInitialized != true) {
            editor.element.after('<span class="text text-danger" style="padding:3px"><i class="fa fa-times"></i></span>');
            editor.element.data('isAddOnInitialized', true);
        }
        if (isSuccess == true) {
            editor.element.switchClass('bg-danger', 'bg-success')
                .siblings('.text').switchClass('text-danger', 'text-success')
                .children().switchClass('fa-times', 'fa-check');
        }
        else {
            editor.element.switchClass('bg-success', 'bg-danger')
                .siblings('.text').switchClass('text-success', 'text-danger')
                .children().switchClass('fa-check', 'fa-times');
        }
    }
    q.addNotificationIcon = addNotificationIcon;
    function setEditorLabel(editor, value) {
        editor.element.siblings('label').text(value);
    }
    q.setEditorLabel = setEditorLabel;
    function hideEditorLabel(editor) {
        editor.element.siblings('label').hide();
    }
    q.hideEditorLabel = hideEditorLabel;
    function setEditorCategoryLabel(editor, value) {
        var categoryAnchor = editor.element.closest('.category').find('.category-anchor');
        categoryAnchor.text(value);
        var categoryAnchorName = categoryAnchor.attr('name');
        categoryAnchor.closest('.s-PropertyGrid').find("a[href='#" + categoryAnchorName + "']").text(value);
    }
    q.setEditorCategoryLabel = setEditorCategoryLabel;
    function hideEditorCategory(editor, value) {
        if (value === void 0) { value = true; }
        if (value == true)
            editor.element.closest('.category').hide();
        else
            editor.element.closest('.category').show();
        var categoryAnchor = editor.element.closest('.category').find('.category-anchor');
        var categoryAnchorName = categoryAnchor.attr('name');
        if (value == true)
            categoryAnchor.closest('.s-PropertyGrid').find("a[href='#" + categoryAnchorName + "']").hide();
        else
            categoryAnchor.closest('.s-PropertyGrid').find("a[href='#" + categoryAnchorName + "']").show();
    }
    q.hideEditorCategory = hideEditorCategory;
    function hideField(editor, value) {
        if (value === void 0) { value = true; }
        if (value == true)
            editor.element.closest('.field').hide();
        else
            editor.element.closest('.field').show();
    }
    q.hideField = hideField;
    function showField(editor, value) {
        if (value === void 0) { value = true; }
        if (value == true)
            editor.element.closest('.field').show();
        else
            editor.element.closest('.field').hide();
    }
    q.showField = showField;
    function hideEditorTab(editor, value) {
        if (value === void 0) { value = true; }
        var tabId = editor.element.closest('.tab-pane').hide().attr('id');
        var tabAnchor = editor.element.closest('.s-PropertyGrid').find("a[href='#" + tabId + "']");
        tabAnchor.closest('li').hide();
    }
    q.hideEditorTab = hideEditorTab;
    function readOnlyEditorTab(editor, value) {
        if (value === void 0) { value = true; }
        var $editors = editor.element.closest('.tab-pane').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }
    q.readOnlyEditorTab = readOnlyEditorTab;
    function readOnlyEditorCategory(editor, value) {
        if (value === void 0) { value = true; }
        var $editors = editor.element.closest('.category').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }
    q.readOnlyEditorCategory = readOnlyEditorCategory;
    function readonlyEditorCategory($editor, value) {
        if (value === void 0) { value = true; }
        var $editors = $editor.closest('.category').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }
    q.readonlyEditorCategory = readonlyEditorCategory;
    function readOnlyEditor(editor, value) {
        if (value === void 0) { value = true; }
        Serenity.EditorUtils.setReadOnly(editor, value);
    }
    q.readOnlyEditor = readOnlyEditor;
    function readonlyEditor($editor, value) {
        if (value === void 0) { value = true; }
        Serenity.EditorUtils.setReadonly($editor, value);
    }
    q.readonlyEditor = readonlyEditor;
    function moveEditorFromTab(editor, toElement, isPrepend) {
        if (isPrepend === void 0) { isPrepend = false; }
        var fieldDiv = editor.element.closest('.field');
        if (isPrepend == true)
            fieldDiv.prependTo(toElement);
        else
            fieldDiv.appendTo(toElement);
    }
    q.moveEditorFromTab = moveEditorFromTab;
    function moveEditorCategoryFromTab(editor, toElement, isPrepend) {
        if (isPrepend === void 0) { isPrepend = false; }
        var fieldDiv = editor.element.closest('.field');
        var categoryDiv = editor.element.closest('.category');
        if (isPrepend == true)
            categoryDiv.prependTo(toElement);
        else
            categoryDiv.appendTo(toElement);
        //hide category navigation link
        var categoryAnchor = categoryDiv.find('.category-anchor');
        var categoryAnchorName = categoryAnchor.attr('name');
        categoryAnchor.closest('.s-PropertyGrid').find("a[href='#" + categoryAnchorName + "']").hide();
    }
    q.moveEditorCategoryFromTab = moveEditorCategoryFromTab;
    function selectEditorTab(editor) {
        var tabId = editor.element.closest('.tab-pane').attr('id');
        var tabAnchor = editor.element.closest('.s-PropertyGrid').find("a[href='#" + tabId + "']");
        tabAnchor.tab('show');
    }
    q.selectEditorTab = selectEditorTab;
    // for select2 lookup editor
    function getSelectedRow(e) {
        var selectedItem = e.added;
        var selectedRow = selectedItem.source;
        return selectedRow;
    }
    q.getSelectedRow = getSelectedRow;
})(q || (q = {}));
var q;
(function (q) {
    function getEnumText(enumKey, value) {
        var title = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), value);
        return title;
    }
    q.getEnumText = getEnumText;
    function getEnumValues(enumType) {
        var items = [];
        for (var item in enumType) {
            if (!isNaN(Number(item))) {
                items.push(enumType[item]);
            }
        }
        return items;
    }
    q.getEnumValues = getEnumValues;
    function getEnumKeys(enumType) {
        var items = [];
        for (var item in enumType) {
            if (!isNaN(Number(item))) {
                items.push(item);
            }
        }
        return items;
    }
    q.getEnumKeys = getEnumKeys;
})(q || (q = {}));
var q;
(function (q) {
    function isCosmicThemeApplied() {
        return document.body.className.indexOf('cosmic') >= 0;
    }
    q.isCosmicThemeApplied = isCosmicThemeApplied;
    function formatDecimal(value) {
        var title = Serenity.NumberFormatter.format(value, '#,##0.00');
        return title;
    }
    q.formatDecimal = formatDecimal;
    function formatInt(value) {
        var title = Serenity.NumberFormatter.format(value, '#,##0');
        return title;
    }
    q.formatInt = formatInt;
    // Check numeric or not then return value, if NAN then return zero(0)
    function ToNumber(value) {
        return isNaN(value) ? 0 : value;
    }
    q.ToNumber = ToNumber;
    function ToBool(value) {
        return value == 'true' ? true : false;
    }
    q.ToBool = ToBool;
    //colorDepth should be within '0123456789ABCDEF'
    function getRandomColor(hexLetters) {
        var letters = hexLetters; // '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            var letterIndex = Math.floor((Math.random()) * letters.length);
            if (letterIndex > 15)
                letterIndex = 15;
            if (letterIndex < 0)
                letterIndex = 0;
            color += letters[letterIndex];
        }
        return color;
    }
    q.getRandomColor = getRandomColor;
})(q || (q = {}));
var isPageRefreshRequired;
//const nameof = <T>(name: keyof T) => name;
var nameofFactory = function () { return function (name) { return name; }; };
//usage const nameof = nameofFactory<Edoc.RevenueReportModel>();
var q;
(function (q) {
    q.queryString = {};
    q.jsPDFHeaderImageData = null;
    q.jsPDFHeaderTitle = 'Report Title';
    q.useSerenityInlineEditors = true;
    q.DefaultMainGridOptions = {
        AutoColumnSize: true,
        FadeInEffectWhenInit: true,
        ShowAnyInEqualityFilterWithTextValue: true,
        ShowInlineActionsColumn: true,
        ShowDeleteInlineButtun: false,
        ShowEditInlineButtun: true,
        ShowRowNumberColumn: true,
        RowsPerPage: 100
    };
    q.DefaultEditorGridOptions = {
        AutoColumnSize: true,
        FadeInEffectWhenInit: true,
        ShowAnyInEqualityFilterWithTextValue: true,
        ShowInlineActionsColumn: true,
        ShowDeleteInlineButtun: true,
        ShowEditInlineButtun: true,
        ShowRowNumberColumn: true
    };
    q.DefaultEntityDialogOptions = {
        AutoFitContentArea: true,
        HideCategoyLinksBar: true,
        PendingChangesConfirmation: true,
        ShowCloseButtonInToolbar: false,
        ShowRefreshButtonInToolbar: false,
        ShowChangeLogButtonInToolbar: false,
        ShowReplaceRowButtonInToolbar: false
    };
    q.DefaultEditorDialogOptions = {
        AutoFitContentArea: false,
        HideCategoyLinksBar: true,
        PendingChangesConfirmation: true,
        ShowCloseButtonInToolbar: false,
        ShowRefreshButtonInToolbar: false,
        ShowChangeLogButtonInToolbar: false,
        ShowReplaceRowButtonInToolbar: false
    };
    //date time
    q.fiscalYearMonths = [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5];
})(q || (q = {}));
var _Ext;
(function (_Ext) {
    var AuditLogActionTypeFormatter = (function () {
        function AuditLogActionTypeFormatter() {
        }
        AuditLogActionTypeFormatter_1 = AuditLogActionTypeFormatter;
        AuditLogActionTypeFormatter.format = function (ctx) {
            var item = ctx.item;
            var klass = '';
            if (item.ActionType == _Ext.AuditActionType.Update) {
                klass = 'warning';
            }
            else if (item.ActionType == _Ext.AuditActionType.Delete) {
                klass = 'danger';
            }
            else {
                klass = 'default';
            }
            return "<span class=\"label label-" + klass + "\">" + _Ext.AuditActionType[item.ActionType] + "</span>";
        };
        AuditLogActionTypeFormatter.prototype.format = function (ctx) {
            return AuditLogActionTypeFormatter_1.format(ctx);
        };
        AuditLogActionTypeFormatter = AuditLogActionTypeFormatter_1 = __decorate([
            Serenity.Decorators.registerFormatter([Serenity.ISlickFormatter])
        ], AuditLogActionTypeFormatter);
        return AuditLogActionTypeFormatter;
        var AuditLogActionTypeFormatter_1;
    }());
    _Ext.AuditLogActionTypeFormatter = AuditLogActionTypeFormatter;
})(_Ext || (_Ext = {}));
/// <reference path="../Bases/DialogBase.ts" />
var _Ext;
(function (_Ext) {
    var AuditLogDialog = (function (_super) {
        __extends(AuditLogDialog, _super);
        function AuditLogDialog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.form = new _Ext.AuditLogForm(_this.idPrefix);
            return _this;
        }
        AuditLogDialog.prototype.getFormKey = function () { return _Ext.AuditLogForm.formKey; };
        AuditLogDialog.prototype.getIdProperty = function () { return _Ext.AuditLogRow.idProperty; };
        AuditLogDialog.prototype.getLocalTextPrefix = function () { return _Ext.AuditLogRow.localTextPrefix; };
        AuditLogDialog.prototype.getNameProperty = function () { return _Ext.AuditLogRow.nameProperty; };
        AuditLogDialog.prototype.getService = function () { return _Ext.AuditLogService.baseUrl; };
        AuditLogDialog.prototype.afterLoadEntity = function () {
            _super.prototype.afterLoadEntity.call(this);
            usingJsonDiffPatch();
            //showing diff visually
            var left = JSON.parse(this.entity.OldEntity);
            if (left) {
                if (left.PlantJson) {
                    left.PlantInfo = JSON.parse(left.PlantJson);
                    delete (left.PlantJson);
                }
                delete (left.Id);
                delete (left.IDate);
                delete (left.IUser);
                delete (left.EDate);
                delete (left.EUser);
            }
            var right = JSON.parse(this.entity.NewEntity);
            if (right) {
                if (right.PlantJson) {
                    right.PlantInfo = JSON.parse(right.PlantJson);
                    delete (right.PlantJson);
                }
            }
            var delta = jsondiffpatch.diff(left, right);
            // beautiful html diff
            this.form.Differences.value = jsondiffpatch.formatters.html.format(delta);
        };
        AuditLogDialog = __decorate([
            Serenity.Decorators.registerClass(),
            Serenity.Decorators.responsive()
        ], AuditLogDialog);
        return AuditLogDialog;
    }(_Ext.DialogBase));
    _Ext.AuditLogDialog = AuditLogDialog;
})(_Ext || (_Ext = {}));
/// <reference path="../Bases/GridBase.ts" />
var _Ext;
(function (_Ext) {
    var AuditLogGrid = (function (_super) {
        __extends(AuditLogGrid, _super);
        function AuditLogGrid(container) {
            return _super.call(this, container) || this;
        }
        AuditLogGrid.prototype.getColumnsKey = function () { return '_Ext.AuditLog'; };
        AuditLogGrid.prototype.getDialogType = function () { return _Ext.AuditLogDialog; };
        AuditLogGrid.prototype.getIdProperty = function () { return _Ext.AuditLogRow.idProperty; };
        AuditLogGrid.prototype.getLocalTextPrefix = function () { return _Ext.AuditLogRow.localTextPrefix; };
        AuditLogGrid.prototype.getService = function () { return _Ext.AuditLogService.baseUrl; };
        AuditLogGrid.prototype.getButtons = function () {
            var buttons = _super.prototype.getButtons.call(this);
            buttons.splice(0, 1);
            return buttons;
        };
        AuditLogGrid = __decorate([
            Serenity.Decorators.registerClass()
        ], AuditLogGrid);
        return AuditLogGrid;
    }(_Ext.GridBase));
    _Ext.AuditLogGrid = AuditLogGrid;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AuditLogViewer = (function () {
        function AuditLogViewer(el, entityVersions) {
            this.el = '.content-wrapper';
            this.data = {
                entityVersions: []
            };
            this.mounted = function () {
            };
            this.computed = {
                test: function () {
                    return 'test computed';
                }
            };
            this.filters = {
                filterByYardId: function () {
                    return [];
                }
            };
            this.methods = {
                showDiff: function (versionInfo) {
                    //showing diff visually
                    var left = versionInfo.OldEntity;
                    var right = versionInfo.NewEntity;
                    var delta = jsondiffpatch.diff(left, right);
                    // beautiful html diff
                    document.getElementById('visualizeDiff').innerHTML = jsondiffpatch.formatters.html.format(delta, left);
                },
                getDiff: function (versionInfo) {
                    //showing diff visually
                    var left = versionInfo.OldEntity;
                    var right = versionInfo.NewEntity;
                    var delta = jsondiffpatch.diff(left, right);
                    // beautiful html diff
                    return jsondiffpatch.formatters.html.format(delta);
                    //var delta = jsondiffpatch.diff(left, right);
                    //// left is optional, if specified unchanged values will be visible too
                    //document.getElementBy('the-diff').innerHTML = jsondiffpatch.formatters.html.format(delta, left);
                    //// Also you can dinamically show/hide unchanged values
                    //jsondiffpatch.formatters.html.showUnchanged();
                    //jsondiffpatch.formatters.html.hideUnchanged();
                    //// these will also adjust array move arrows (SVG), which is useful if something alters the html layout
                }
            };
            this.el = el || this.el;
            this.data.entityVersions = entityVersions;
        }
        AuditLogViewer.prototype.destroyed = function () {
        };
        return AuditLogViewer;
    }());
    _Ext.AuditLogViewer = AuditLogViewer;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AuditLogViewerDialog = (function (_super) {
        __extends(AuditLogViewerDialog, _super);
        function AuditLogViewerDialog(request) {
            var _this = _super.call(this) || this;
            _this.request = request;
            _this.dialogTitle = 'Audit Log Viewer';
            _this.onDialogOpen = function () {
                _Ext.AuditLogViewerService.List(_this.request, function (response) {
                    response.EntityVersions.forEach(function (e) {
                        delete (e.Id);
                        e.OldEntity = JSON.parse(e.OldEntity);
                        e.NewEntity = JSON.parse(e.NewEntity);
                        delete (e.OldEntity.Id);
                        delete (e.OldEntity.IDate);
                        delete (e.OldEntity.IUser);
                        delete (e.OldEntity.EDate);
                        delete (e.OldEntity.EUser);
                        e.ActionType = _Ext.AuditActionType[e.ActionType];
                        e.isShowed = false;
                    });
                    new Vue(new _Ext.AuditLogViewer('#' + _this.idPrefix + 'dialogContent', response.EntityVersions));
                });
            };
            return _this;
        }
        AuditLogViewerDialog.prototype.getTemplateName = function () {
            usingVuejs();
            usingJsonDiffPatch();
            return '_Ext.AuditLogViewer';
        };
        AuditLogViewerDialog = __decorate([
            Serenity.Decorators.registerClass(),
            Serenity.Decorators.maximizable()
        ], AuditLogViewerDialog);
        return AuditLogViewerDialog;
    }(Serenity.TemplatedDialog));
    _Ext.AuditLogViewerDialog = AuditLogViewerDialog;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ReportGridBase = (function (_super) {
        __extends(ReportGridBase, _super);
        function ReportGridBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ReportGridBase.prototype.getButtons = function () {
            var buttons = _super.prototype.getButtons.call(this);
            buttons.splice(0, 1);
            return buttons;
        };
        ReportGridBase.prototype.getColumns = function () {
            var columns = _super.prototype.getColumns.call(this);
            columns.splice(0, 1);
            return columns;
        };
        ReportGridBase = __decorate([
            Serenity.Decorators.filterable()
        ], ReportGridBase);
        return ReportGridBase;
    }(_Ext.GridBase));
    _Ext.ReportGridBase = ReportGridBase;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ReplaceRowDialog = (function (_super) {
        __extends(ReplaceRowDialog, _super);
        function ReplaceRowDialog(request, entityList) {
            var _this = _super.call(this) || this;
            _this.request = request;
            _this.entityList = entityList;
            _this.form = new _Ext.ReplaceRowForm(_this.idPrefix);
            _this.dialogTitle = 'Replace Row';
            _this.form.DeletedEntityName.value = request.DeletedEntityName;
            _this.form.ReplaceWithEntityId.items = entityList.map(function (m) { return { id: String(m[request.IdProperty]), text: m[request.NameProperty], source: m }; });
            return _this;
        }
        ReplaceRowDialog.prototype.getFormKey = function () { return _Ext.ReplaceRowForm.formKey; };
        ReplaceRowDialog.prototype.getToolbarButtons = function () {
            var _this = this;
            var buttons = [];
            _super.prototype.getToolbarButtons.call(this);
            buttons.push({
                title: 'Replace',
                icon: 'fa fa fa-trash-o',
                onClick: function () {
                    if (_this.validateForm() == false)
                        return;
                    Q.confirm("Are you sure? \n\n" + _this.request.EntityTypeTitle + ": \"" + _this.request.DeletedEntityName + "\" will be deleted \nand all references will be replaced with \"" + _this.form.ReplaceWithEntityId.text + "\". \n\nThis action cannot be undone!\n\n", function () {
                        _this.request.ReplaceWithEntityId = Q.toId(_this.form.ReplaceWithEntityId.value);
                        Q.serviceRequest(Q.resolveUrl('~/Services/ReplaceRow/Replace'), _this.request, function (response) {
                            _this.dialogClose();
                            if (window['lastGrid'])
                                window['lastGrid'].refresh();
                        });
                    });
                }
            });
            return buttons;
        };
        ReplaceRowDialog = __decorate([
            Serenity.Decorators.registerClass(),
            Serenity.Decorators.maximizable()
        ], ReplaceRowDialog);
        return ReplaceRowDialog;
    }(_Ext.DialogBase));
    _Ext.ReplaceRowDialog = ReplaceRowDialog;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var DevTools;
    (function (DevTools) {
        var SergenPanel = (function (_super) {
            __extends(SergenPanel, _super);
            function SergenPanel(container) {
                var _this = _super.call(this, container) || this;
                var vm = new Vue({
                    el: $('<div/>').appendTo(_this.element)[0],
                    data: {
                        connection: "",
                        connections: [],
                        tables: [],
                        generate: {
                            Row: true,
                            Service: true,
                            UI: true
                        }
                    },
                    methods: {
                        generateCode: function (table) {
                            if (!table.Identifier) {
                                Q.notifyError("Identifier cannot be empty!");
                                return;
                            }
                            if (!table.Module) {
                                Q.notifyError("Module cannot be empty!");
                                return;
                            }
                            DevTools.SergenService.Generate({
                                ConnectionKey: this.connection,
                                Table: table,
                                GenerateOptions: this.generate
                            }, function (r) {
                                Q.notifySuccess("Code for selected table is generated. You'll need to rebuild your project.");
                            });
                        }
                    },
                    watch: {
                        connection: function (val) {
                            if (!val || !val.length)
                                vm.tables = [];
                            else
                                DevTools.SergenService.ListTables({
                                    ConnectionKey: val
                                }, function (response) { return vm.tables = response.Entities; });
                        }
                    },
                    template: Q.getTemplate('_Ext.SergenPanel')
                });
                DevTools.SergenService.ListConnections({}, function (response) { return vm.connections = response.Entities; });
                return _this;
            }
            return SergenPanel;
        }(Serenity.Widget));
        DevTools.SergenPanel = SergenPanel;
    })(DevTools = _Ext.DevTools || (_Ext.DevTools = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var AutoCompleteEditor = (function (_super) {
        __extends(AutoCompleteEditor, _super);
        function AutoCompleteEditor(input, options) {
            var _this = _super.call(this, input) || this;
            _this.options = options;
            input.bind('change', function (e) {
                if (!Serenity.WX.hasOriginalEvent(e)) {
                    return;
                }
            });
            setTimeout(function () {
                _this.bindAutoComplete(input);
            }, 1000);
            return _this;
        }
        AutoCompleteEditor.prototype.bindAutoComplete = function (input) {
            var opt = this.options;
            var source = opt.sourceArray;
            if (opt.sourceCSV) {
                source = opt.sourceCSV.split(',');
            }
            else if (this.options.lookupKey) {
                var lookup_1 = Q.getLookup(opt.lookupKey);
                source = lookup_1.items.map(function (m) { return m[lookup_1.textField]; });
            }
            input.autocomplete({
                minLength: opt.minSearchLength || 0,
                autoFocus: true,
                source: source,
                focus: function (event, ui) {
                    //$(".ui-helper-hidden-accessible").hide();  //fix issue with the selected data showing up on webpage
                    //event.preventDefault();
                    //return false;
                },
            });
            input.data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };
            input.bind('click', function (e) {
                var wasOpen = input.autocomplete("widget").is(":visible");
                // Close if already visible
                if (wasOpen) {
                    return;
                }
                // Pass empty string as value to search for, displaying all results
                input.autocomplete("search", "");
            });
        };
        AutoCompleteEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], AutoCompleteEditor);
        return AutoCompleteEditor;
    }(Serenity.StringEditor));
    _Ext.AutoCompleteEditor = AutoCompleteEditor;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ColorEditor = (function (_super) {
        __extends(ColorEditor, _super);
        function ColorEditor(container) {
            var _this = _super.call(this, container) || this;
            try {
                _this.element.colorpicker({ format: "hex" });
            }
            catch (e) { }
            return _this;
        }
        ColorEditor.prototype.getTemplate = function () {
            usingBootstrapColorPicker();
            return "<div class=\"input-group colorpicker-component\">\n                        <input type=\"text\" value=\"#00AABB\" class=\"form-control\" />\n                        <span class=\"input-group-addon\"><i></i></span>\n                    </div>";
        };
        ;
        ColorEditor.prototype.getEditValue = function (property, target) {
            try {
                var editVal = this.element.colorpicker().data().color;
                target[property.name] = editVal;
            }
            catch (e) { }
        };
        ColorEditor.prototype.setEditValue = function (source, property) {
            var val = source[property.name];
            //this.element.children('input').val(val);
            try {
                this.element.data('colorpicker').setValue(val);
            }
            catch (e) { }
        };
        ColorEditor = __decorate([
            Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue]),
            Serenity.Decorators.editor(),
            Serenity.Decorators.element("<div/>")
        ], ColorEditor);
        return ColorEditor;
    }(Serenity.TemplatedWidget));
    _Ext.ColorEditor = ColorEditor;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var DateTimePickerEditor = (function (_super) {
        __extends(DateTimePickerEditor, _super);
        function DateTimePickerEditor(container) {
            var _this = _super.call(this, container) || this;
            usingJqueryUITimepickerAddon();
            _this.element.datetimepicker({
                timeInput: true,
                controlType: 'select',
                oneLine: true,
                timeFormat: "HH:mm",
                showOn: "button"
            });
            return _this;
        }
        DateTimePickerEditor.prototype.getEditValue = function (property, target) { target[property.name] = this.value; };
        DateTimePickerEditor.prototype.setEditValue = function (source, property) { this.value = source[property.name]; };
        Object.defineProperty(DateTimePickerEditor.prototype, "value", {
            //http://trentrichardson.com/examples/timepicker
            get: function () {
                return Q.formatDate(this.valueAsDate, 'yyyy-MM-ddTHH:mm');
            },
            set: function (val) {
                this.valueAsDate = Q.parseISODateTime(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerEditor.prototype, "valueAsDate", {
            get: function () {
                var val = this.element.datetimepicker('getDate');
                return val;
            },
            set: function (val) {
                this.element.datetimepicker('setDate', val);
            },
            enumerable: true,
            configurable: true
        });
        DateTimePickerEditor.prototype.get_readOnly = function () {
            return this.element.hasClass('readonly');
        };
        DateTimePickerEditor.prototype.set_readOnly = function (value) {
            if (value == true) {
                this.element.datetimepicker("option", "disabled", true);
                this.element.addClass('readonly');
                this.element.attr("disabled");
            }
            else {
                this.element.datetimepicker("option", "disabled", false);
                this.element.removeClass('readonly');
                this.element.removeAttr("disabled");
            }
        };
        DateTimePickerEditor.prototype.set_minDate = function (date) {
            this.element.datetimepicker('option', 'minDate', date);
        };
        DateTimePickerEditor.prototype.set_maxDate = function (date) {
            this.element.datetimepicker('option', 'maxDate', date);
        };
        DateTimePickerEditor.prototype.set_minDateTime = function (date) {
            this.element.datetimepicker('option', 'minDateTime', date);
        };
        DateTimePickerEditor.prototype.set_maxDateTime = function (date) {
            this.element.datetimepicker('option', 'maxDateTime', date);
        };
        DateTimePickerEditor = __decorate([
            Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly]),
            Serenity.Decorators.editor(),
            Serenity.Decorators.element("<input/>")
        ], DateTimePickerEditor);
        return DateTimePickerEditor;
    }(Serenity.Widget));
    _Ext.DateTimePickerEditor = DateTimePickerEditor;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var EmptyLookupEditor = (function (_super) {
        __extends(EmptyLookupEditor, _super);
        function EmptyLookupEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmptyLookupEditor.prototype.setSelect2Items = function (items) {
            var _this = this;
            this.clearItems();
            items.forEach(function (item) { _this.addItem(item); });
        };
        EmptyLookupEditor.prototype.setLookupItems = function (lookup) {
            var items = lookup.items.map(function (m) {
                return {
                    id: m[lookup.idField],
                    text: m[lookup.textField],
                    source: m
                };
            });
            this.setSelect2Items(items);
        };
        EmptyLookupEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], EmptyLookupEditor);
        return EmptyLookupEditor;
    }(Serenity.Select2Editor));
    _Ext.EmptyLookupEditor = EmptyLookupEditor;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var HardCodedLookupEditor = (function (_super) {
        __extends(HardCodedLookupEditor, _super);
        function HardCodedLookupEditor(container, options) {
            var _this = _super.call(this, container, options) || this;
            var source = options.sourceArray;
            if (options.sourceCSV) {
                source = options.sourceCSV.split(',');
            }
            source.forEach(function (i) { return _this.addOption(i, i); });
            return _this;
        }
        HardCodedLookupEditor.prototype.getSelect2Options = function () {
            var opt = _super.prototype.getSelect2Options.call(this);
            return opt;
        };
        HardCodedLookupEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], HardCodedLookupEditor);
        return HardCodedLookupEditor;
    }(Serenity.Select2Editor));
    _Ext.HardCodedLookupEditor = HardCodedLookupEditor;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var HtmlTemplateEditor = (function (_super) {
        __extends(HtmlTemplateEditor, _super);
        function HtmlTemplateEditor(textArea, opt) {
            return _super.call(this, textArea, opt) || this;
        }
        HtmlTemplateEditor.prototype.getConfig = function () {
            var config = _super.prototype.getConfig.call(this);
            var placehorders = this.options.placeholders;
            if (placehorders) {
                config.placeholder_select = {
                    placeholders: placehorders.split(',')
                };
                config.extraPlugins += ',richcombo,placeholder_select';
            }
            config.allowedContent = true;
            config.enterMode = window['CKEDITOR'].ENTER_BR;
            config.extraPlugins += ',showborders';
            config.removePlugins += ',uploadimage';
            //config.forcePasteAsPlainText = true;
            //config.toolbar = [['placeholder_select']];
            config.removeButtons += ',Cut,Copy,Paste,PasteText,PasteFromWord' +
                ',SpecialChar,Subscript,Superscript,Styles,' +
                'Link,Unlink,CreatePlaceholder,' +
                'Image,Anchor,Blockquote,BGColor,' +
                'Superscript,RemoveFormat';
            return config;
        };
        HtmlTemplateEditor = __decorate([
            Serenity.Decorators.editor(),
            Serenity.Decorators.element("<div/>")
        ], HtmlTemplateEditor);
        return HtmlTemplateEditor;
    }(Serenity.HtmlContentEditor));
    _Ext.HtmlTemplateEditor = HtmlTemplateEditor;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var StaticTextBlock = (function (_super) {
        __extends(StaticTextBlock, _super);
        function StaticTextBlock(container, options) {
            var _this = _super.call(this, container, options) || this;
            // hide the caption label for this editor if in a form. ugly hack
            if (_this.options.hideLabel)
                _this.element.closest('.field').find('.caption').hide();
            // remove required asterisk (*)
            _this.element.closest('.field').find('sup').hide();
            _this.updateElementContent();
            return _this;
        }
        StaticTextBlock.prototype.updateElementContent = function () {
            var text = Q.coalesce(this.options.text, this._value);
            // if isLocalText is set, text is actually a local text key
            if (this.options.isLocalText)
                text = Q.text(text);
            // don't html encode if isHtml option is true
            if (this.options.isHtml)
                this.element.html(text);
            else
                this.element.text(text);
        };
        /**
         * By implementing ISetEditValue interface, we allow this editor to display its field value.
         * But only do this when our text content is not explicitly set in options
         */
        StaticTextBlock.prototype.setEditValue = function (source, property) {
            if (this.options.text == null) {
                this._value = Q.coalesce(this.options.text, source[property.name]);
                this.updateElementContent();
            }
        };
        Object.defineProperty(StaticTextBlock.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
                this.updateElementContent();
            },
            enumerable: true,
            configurable: true
        });
        StaticTextBlock = __decorate([
            Serenity.Decorators.element("<div/>"),
            Serenity.Decorators.registerEditor([Serenity.ISetEditValue])
        ], StaticTextBlock);
        return StaticTextBlock;
    }(Serenity.Widget));
    _Ext.StaticTextBlock = StaticTextBlock;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var CardViewMixin = (function () {
        function CardViewMixin(options) {
            var _this = this;
            this.options = options;
            var u, f;
            var dg = this.dataGrid = options.grid;
            var idProperty = dg.getIdProperty();
            var getId = this.getId = function (item) { return item[idProperty]; };
            options.defaultViewType = options.defaultViewType || 'list';
            this.viewType = options.defaultViewType;
            var divViewSwitch = $('\n<div class="btn-group view-switch" data-toggle="buttons" style="float: right">\n    <label class="btn btn-default active" title="List View">\n        <i class="fa fa-th-list text-purple"><\/i>\n        <input type="radio" name="' + dg.element.attr("id") + '_ViewType" value="list" checked />\n    <\/label>\n    <label class="btn btn-default" title="Card View">\n        <i class="fa fa-th-large text-purple"><\/i>\n        <input type="radio" name="' + dg.element.attr("id") + '_ViewType" value="card" />    \n    <\/label>\n<\/div>')
                .prependTo(dg.element.find(".grid-title"));
            this.cardContainer = $('<div class="card-container" style="display: none;"><div class="card-items"><\/div><\/div>').insertAfter(dg.element.children(".grid-container"));
            divViewSwitch.find("input").change(function (e) {
                return _this.switchView($(e.target).val());
            });
            this.resizeCardView();
            dg.element.bind("layout", function () {
                return _this.resizeCardView();
            });
            dg.view.onDataChanged.subscribe(function () {
                _this.vm && _this.updateCardItems();
            });
            u = dg.getCurrentSettings;
            dg.getCurrentSettings = function (n) {
                var i = u.apply(dg, [n]);
                return i.viewType = divViewSwitch.find("input:checked").val(), i;
            };
            f = dg.restoreSettings;
            dg.restoreSettings = function (n, i) {
                var u, e, o, s;
                if (f.apply(dg, [n, i]),
                    n == null) {
                    if (u = this.getPersistanceStorage(),
                        u == null)
                        return;
                    if (e = Q.trimToNull(u.getItem(this.getPersistanceKey())),
                        !e)
                        return;
                    n = JSON.parse(e);
                }
                o = n.viewType || options.defaultViewType;
                s = divViewSwitch.find("input:checked").val() || options.defaultViewType;
                o != s && divViewSwitch.find("input").eq(o == "card" ? 1 : 0).click();
            };
        }
        CardViewMixin.prototype.switchView = function (viewType) {
            this.resizeCardView();
            var isCardView = viewType == "card";
            this.dataGrid.element.children(".card-container").toggle(isCardView);
            this.dataGrid.element.children(".grid-container").toggle(!isCardView);
            isCardView && this.updateCardItems();
            this.dataGrid.persistSettings();
        };
        CardViewMixin.prototype.updateCardItems = function () {
            if (this.vm)
                this.vm.items = this.dataGrid.getItems();
            else {
                usingVuejs();
                this.vm = new Vue({
                    el: this.cardContainer.children()[0],
                    template: this.options.containerTemplate ? "<div> " + this.options.containerTemplate + " </div>"
                        : "<div class=\"card-items\">\n    <div v-for=\"(item, index) in items\" class=\"" + (this.options.itemCssClass || 'col-sm-12 col-md-6 col-lg-4') + "\">\n        <div class=\"card-item\" style=\"" + this.options.itemCssStyle + "\">\n        " + this.options.itemTemplate + "\n        </div>\n    </div>\n</div>",
                    data: {
                        items: this.dataGrid.getItems()
                    },
                    methods: this.options.methods
                });
            }
        };
        CardViewMixin.prototype.resizeCardView = function () {
            var gridContainer = this.dataGrid.element.children(".grid-container"), width = this.dataGrid.element.width(), height = gridContainer.height();
            this.dataGrid.element.children(".card-container").css({
                width: width + "px",
                height: height + "px"
            });
        };
        return CardViewMixin;
    }());
    _Ext.CardViewMixin = CardViewMixin;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    /**
     * A mixin that can be applied to a DataGrid for excel style filtering functionality
     */
    var HeaderFiltersMixin = (function () {
        function HeaderFiltersMixin(options) {
            this.options = options;
            var dg = this.dataGrid = options.grid;
            var currentColumn = null;
            var cachedValues = {};
            usingSlickHeaderFilters();
            var headerFilters = new Slick['Plugins'].HeaderFilters({
                getFilterValues: function (column, setFilterableValues) {
                    if (!dg.view.url || !dg.view["getPagingInfo"]().rowsPerPage || dg.view.getLength() == 0
                        && !Q.any(dg.slickGrid.getColumns(), function (x) { return x.filterValues && x.filterValues.length > 0; })) {
                        return null;
                    }
                    currentColumn = column;
                    try {
                        if (!dg.onViewSubmit()) {
                            setFilterableValues([]);
                            return;
                        }
                    }
                    finally {
                        currentColumn = null;
                    }
                    var request = Q.deepClone(dg.view.params);
                    //request.DistinctFields = [column.field];
                    request.Skip = 0;
                    request.Take = 0;
                    var cacheKey = $.toJSON(request);
                    var cachedValue = cachedValues[cacheKey];
                    if (cachedValue && cachedValue.expires > (new Date).getTime())
                        setFilterableValues(cachedValue.value);
                    else {
                        Q.serviceCall({
                            request: request,
                            url: dg.view.url,
                            onSuccess: function (response) {
                                //cachedValues[cacheKey] = {
                                //    value: response.Values,
                                //    expires: (new Date).getTime() + 1e3 * 30
                                //};
                                //setFilterableValues(response.Values)
                            }
                        });
                    }
                },
                isFilterable: function (column) {
                    return column.sourceItem != null && column.sortable && (column.sourceItem.notFilterable == null || !column.sourceItem.notFilterable);
                }
            });
            headerFilters.onFilterApplied.subscribe(function () {
                dg.refresh();
            });
            dg.slickGrid.registerPlugin(headerFilters);
            var oldOnViewSubmit = dg.onViewSubmit;
            dg.onViewSubmit = function () {
                if (!oldOnViewSubmit.call(dg))
                    return false;
                var columns = dg.slickGrid.getColumns();
                var request = dg.view.params;
                for (var n = 0; n < columns.length; n++) {
                    var column = columns[n];
                    if (column === currentColumn)
                        continue;
                    var filterValues = column.filterValues;
                    if (filterValues && filterValues.length) {
                        var u = filterValues.filter(function (f) { return f != null; });
                        var d = [[column.field], "in", [u]];
                        if (u.length !== filterValues.length) {
                            if (u.length > 0)
                                d = Serenity.Criteria.or(["is null", [column.field]], d);
                            else
                                d = ["is null", [column.field]];
                        }
                        request.Criteria = Serenity.Criteria.and(request.Criteria, d);
                    }
                }
                return true;
            };
        }
        return HeaderFiltersMixin;
    }());
    _Ext.HeaderFiltersMixin = HeaderFiltersMixin;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    /**
     * A mixin that can be applied to a DataGrid for tree functionality
     */
    var TreeGridMixin = (function () {
        function TreeGridMixin(options) {
            this.options = options;
            var dg = this.dataGrid = options.grid;
            var idProperty = options.idField || dg.getIdProperty();
            var getId = this.getId = function (item) { return item[idProperty]; };
            dg.element.find('.grid-container').on('click', function (e) {
                if ($(e.target).hasClass('s-TreeToggle')) {
                    var src = dg.slickGrid.getCellFromEvent(e);
                    if (src.cell >= 0 &&
                        src.row >= 0) {
                        TreeGridMixin.toggleClick(e, src.row, src.row, dg.view, getId);
                    }
                }
            });
            var oldViewFilter = dg.onViewFilter;
            dg.onViewFilter = function (item) {
                if (!oldViewFilter.apply(this, [item]))
                    return false;
                return TreeGridMixin.filterById(item, dg.view, idProperty, options.getParentId);
            };
            var oldProcessData = dg.onViewProcessData;
            dg.onViewProcessData = function (response) {
                response = oldProcessData.apply(this, [response]);
                response.Entities = TreeGridMixin.applyTreeOrdering(response.Entities, getId, options.getParentId);
                Serenity.SlickTreeHelper.setIndents(response.Entities, getId, options.getParentId, (options.initialCollapse && options.initialCollapse()) || false);
                return response;
            };
            if (options.toggleField) {
                var col = Q.first(dg.getGrid().getColumns(), function (x) { return x.field == options.toggleField; });
                col.format = TreeGridMixin.treeToggle(function () { return dg.view; }, getId, col.format || (function (ctx) { return Q.htmlEncode(ctx.value); }));
                col.formatter = Serenity.SlickHelper.convertToFormatter(col.format);
            }
        }
        /**
         * Expands / collapses all rows in a grid automatically
         */
        TreeGridMixin.prototype.toggleAll = function () {
            Serenity.SlickTreeHelper.setCollapsed(this.dataGrid.view.getItems(), !this.dataGrid.view.getItems().every(function (x) { return x._collapsed == true; }));
            this.dataGrid.view.setItems(this.dataGrid.view.getItems(), true);
        };
        TreeGridMixin.prototype.expandAll = function () {
            Serenity.SlickTreeHelper.setCollapsed(this.dataGrid.view.getItems(), false);
            this.dataGrid.view.setItems(this.dataGrid.view.getItems(), true);
        };
        TreeGridMixin.prototype.collapsedAll = function () {
            Serenity.SlickTreeHelper.setCollapsed(this.dataGrid.view.getItems(), true);
            this.dataGrid.view.setItems(this.dataGrid.view.getItems(), true);
        };
        /**
         * Reorders a set of items so that parents comes before their children.
         * This method is required for proper tree ordering, as it is not so easy to perform with SQL.
         * @param items list of items to be ordered
         * @param getId a delegate to get ID of a record (must return same ID with grid identity field)
         * @param getParentId a delegate to get parent ID of a record
         */
        TreeGridMixin.applyTreeOrdering = function (items, getId, getParentId) {
            var result = [];
            var byId = Q.toGrouping(items, getId);
            var byParentId = Q.toGrouping(items, getParentId);
            var visited = {};
            function takeChildren(theParentId) {
                if (visited[theParentId])
                    return;
                visited[theParentId] = true;
                for (var _i = 0, _a = (byParentId[theParentId] || []); _i < _a.length; _i++) {
                    var child = _a[_i];
                    result.push(child);
                    takeChildren(getId(child));
                }
            }
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var parentId = getParentId(item);
                var hasParent = parentId != null;
                var parent_1 = byId[parentId];
                var isRootItem = !hasParent || !(parent_1 || []).length;
                if (isRootItem) {
                    result.push(item);
                    takeChildren(getId(item));
                }
            }
            return result;
        };
        TreeGridMixin.filterById = function (item, view, idProperty, getParentId) {
            return Serenity.SlickTreeHelper.filterCustom(item, function (x) {
                var parentId = getParentId(x);
                if (parentId == null) {
                    return null;
                }
                var items = view.getItems();
                var parentItem = items.filter(function (f) { return f[idProperty] == parentId; })[0];
                return parentItem;
            });
        };
        TreeGridMixin.treeToggle = function (getView, getId, formatter) {
            return function (ctx) {
                var text = formatter(ctx);
                var view = getView();
                var indent = Q.coalesce(ctx.item._indent, 0);
                var spacer = '<span class="s-TreeIndent" style="width:' + 15 * indent + 'px"></span>';
                var id = getId(ctx.item);
                var idx = view.getIdxById(ctx.item.__id || id);
                var next = view.getItemByIdx(idx + 1);
                if (next != null) {
                    var nextIndent = Q.coalesce(next._indent, 0);
                    if (nextIndent > indent) {
                        if (!!!!ctx.item._collapsed) {
                            return spacer + '<span class="s-TreeToggle s-TreeExpand"></span>' + text;
                        }
                        else {
                            return spacer + '<span class="s-TreeToggle s-TreeCollapse"></span>' + text;
                        }
                    }
                }
                return spacer + '<span class="s-TreeToggle"></span>' + text;
            };
        };
        TreeGridMixin.toggleClick = function (e, row, cell, view, getId) {
            var target = $(e.target);
            if (!target.hasClass('s-TreeToggle')) {
                return;
            }
            if (target.hasClass('s-TreeCollapse') || target.hasClass('s-TreeExpand')) {
                var item = view.getItem(row);
                if (item != null) {
                    if (!!!item._collapsed) {
                        item._collapsed = true;
                    }
                    else {
                        item._collapsed = false;
                    }
                    var id = getId(item);
                    view.updateItem(item.__id || id, item); //to support in-memory grid we check fake item.__id
                }
                if (e.shiftKey) {
                    view.beginUpdate();
                    try {
                        Serenity.SlickTreeHelper.setCollapsed(view.getItems(), !!item._collapsed);
                        view.setItems(view.getItems(), true);
                    }
                    finally {
                        view.endUpdate();
                    }
                }
            }
        };
        return TreeGridMixin;
    }());
    _Ext.TreeGridMixin = TreeGridMixin;
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ExcelExportHelper;
    (function (ExcelExportHelper) {
        function createToolButton(options) {
            return {
                hint: Q.coalesce(options.title, 'Excel'),
                title: Q.coalesce(options.hint, ''),
                cssClass: 'export-xlsx-button',
                onClick: function () {
                    if (!options.onViewSubmit()) {
                        return;
                    }
                    var grid = options.grid;
                    var request = Q.deepClone(grid.getView().params);
                    request.Take = 0;
                    request.Skip = 0;
                    var sortBy = grid.getView().sortBy;
                    if (sortBy) {
                        request.Sort = sortBy;
                    }
                    request.IncludeColumns = [];
                    var columns = grid.getGrid().getColumns();
                    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                        var column = columns_1[_i];
                        request.IncludeColumns.push(column.id || column.field);
                    }
                    Q.postToService({ service: options.service, request: request, target: '_blank' });
                },
                separator: options.separator
            };
        }
        ExcelExportHelper.createToolButton = createToolButton;
    })(ExcelExportHelper = _Ext.ExcelExportHelper || (_Ext.ExcelExportHelper = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var PdfExportHelper;
    (function (PdfExportHelper) {
        function toAutoTableColumns(srcColumns, columnStyles, columnTitles) {
            return srcColumns.map(function (src) {
                var col = {
                    dataKey: src.id || src.field,
                    title: src.name || ''
                };
                if (columnTitles && columnTitles[col.dataKey] != null)
                    col.title = columnTitles[col.dataKey];
                var style = {};
                if ((src.cssClass || '').indexOf("align-right") >= 0)
                    style.halign = 'right';
                else if ((src.cssClass || '').indexOf("align-center") >= 0)
                    style.halign = 'center';
                columnStyles[col.dataKey] = style;
                return col;
            });
        }
        function toAutoTableData(entities, keys, srcColumns) {
            var el = document.createElement('span');
            var row = 0;
            return entities.map(function (item) {
                var dst = {};
                for (var cell = 0; cell < srcColumns.length; cell++) {
                    var src = srcColumns[cell];
                    var fld = src.field || '';
                    var key = keys[cell];
                    var txt = void 0;
                    var html = void 0;
                    if (src.formatter) {
                        html = src.formatter(row, cell, item[fld], src, item);
                    }
                    else if (src.format) {
                        html = src.format({ row: row, cell: cell, item: item, value: item[fld] });
                    }
                    else {
                        dst[key] = item[fld];
                        continue;
                    }
                    if (!html || (html.indexOf('<') < 0 && html.indexOf('&') < 0))
                        dst[key] = html;
                    else {
                        el.innerHTML = html;
                        if (el.children.length == 1 &&
                            $(el.children[0]).is(":input")) {
                            dst[key] = $(el.children[0]).val();
                        }
                        else if (el.children.length == 1 &&
                            $(el.children).is('.check-box')) {
                            dst[key] = $(el.children).hasClass("checked") ? "Yes" : "No";
                        }
                        else
                            dst[key] = el.textContent || '';
                    }
                }
                row++;
                return dst;
            });
        }
        function exportToPdf(options) {
            var g = options.grid;
            if (!options.onViewSubmit())
                return;
            includeAutoTable();
            var request = Q.deepClone(g.view.params);
            request.Take = 0;
            request.Skip = 0;
            var sortBy = g.view.sortBy;
            if (sortBy != null)
                request.Sort = sortBy;
            var gridColumns = g.slickGrid.getColumns();
            gridColumns = gridColumns.filter(function (x) { return x.id !== "__select__" && x.name.length > 0; });
            request.IncludeColumns = [];
            for (var _i = 0, gridColumns_1 = gridColumns; _i < gridColumns_1.length; _i++) {
                var column = gridColumns_1[_i];
                request.IncludeColumns.push(column.id || column.field);
            }
            Q.serviceCall({
                url: g.view.url,
                request: request,
                onSuccess: function (response) {
                    var doc = new jsPDF('l', 'pt');
                    var groupings = g.view.getGrouping(); //group fields
                    var groupingColumns = gridColumns.filter(function (f) { return groupings.some(function (s) { return s.getter == f.field; }) == true; });
                    var srcColumns = gridColumns.filter(function (f) { return groupings.some(function (s) { return s.getter == f.field; }) == false; });
                    var columnStyles = {};
                    var columns = toAutoTableColumns(srcColumns, columnStyles, options.columnTitles);
                    var keys = columns.filter(function (f) { return groupings.some(function (s) { return s.getter == f; }) == false; }).map(function (x) { return x.dataKey; });
                    var totalPagesExp = "{{T}}";
                    var pageNumbers = options.pageNumbers == null || options.pageNumbers;
                    var autoOptions = $.extend({
                        margin: { top: 40, left: 40, right: 40, bottom: pageNumbers ? 110 : 100 },
                        startY: 90,
                        styles: {
                            fontSize: 8,
                            overflow: 'linebreak',
                            cellPadding: 5,
                            valign: 'middle',
                            lineColor: 0
                        },
                        headerStyles: { fillColor: 255, textColor: 0, lineWidth: 1, fillStyle: 'S', halign: 'center', valign: 'middle' },
                        columnStyles: columnStyles
                    }, options.tableOptions);
                    ///region Title
                    {
                        if (q.jsPDFHeaderImageData) {
                            doc.addImage(q.jsPDFHeaderImageData, 'PNG', 40, 40, 60, 60);
                        }
                        doc.autoTable([q.jsPDFHeaderTitle], [], {
                            margin: { bottom: 10, left: 110 },
                            startY: options.titleTop || 45,
                            headerStyles: { fillColor: 255, textColor: 0 },
                            styles: { halign: 'left', fontSize: 18 }
                        });
                        var reportTitle = '';
                        if (groupingColumns[0])
                            reportTitle = groupingColumns.map(function (m) { return m.name; }).join(', ') + ' wise ';
                        reportTitle += options.reportTitle || g.getTitle();
                        reportTitle += " Report";
                        doc.autoTable([reportTitle], [], {
                            margin: { top: 10, bottom: 10, left: 110 },
                            startY: doc.autoTableEndPosY(),
                            headerStyles: { fillColor: 255, textColor: 0 },
                            styles: { halign: 'left', fontSize: 14 }
                        });
                    }
                    ///region Header
                    {
                        var header = function (data) {
                        };
                        autoOptions.beforePageContent = header;
                    }
                    ///region Footer
                    {
                        if (pageNumbers) {
                            var footer = function (data) {
                                var str = data.pageCount;
                                // Total page number plugin only available in jspdf v1.0+
                                if (typeof doc.putTotalPages === 'function') {
                                    str = str + " / " + totalPagesExp;
                                }
                                doc.autoTableText(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - autoOptions.margin.bottom, {
                                    halign: 'center'
                                });
                            };
                            autoOptions.afterPageContent = footer;
                        }
                    }
                    ///region Content
                    {
                        //extra space after title
                        doc.autoTable([''], [], {
                            startY: doc.autoTableEndPosY() + 20,
                            headerStyles: { fillColor: 255, textColor: 0 }
                        });
                        var headerHeight = 125;
                        var headerFontSizeBase = 11;
                        var entities = response.Entities || [];
                        g.setItems(entities);
                        var groups = g.view.getGroups(); //grouped data
                        if (groups.length > 0) {
                            var ggg = function (grps, parentGroupIndex) {
                                var endPosY = doc.autoTableEndPosY();
                                for (var i = 0; i < grps.length; i++) {
                                    var group = grps[i];
                                    var level = group.level + 1;
                                    doc.autoTable([group.title], [], {
                                        margin: { left: 30 + level * 10, top: 2 },
                                        startY: doc.autoTableEndPosY(),
                                        headerStyles: { fillColor: 255, textColor: 0, fontSize: 10 - group.level, cellPadding: 0 }
                                    });
                                    if (group.groups) {
                                        ggg(group.groups, i);
                                    }
                                    else {
                                        var data = toAutoTableData(group.rows, keys, srcColumns);
                                        autoOptions.startY = doc.autoTableEndPosY();
                                        autoOptions.margin.left = 30 + level * 10;
                                        autoOptions.margin.bottom = 10;
                                        doc.autoTable(columns, data, autoOptions);
                                        //for extra space
                                        doc.autoTable([''], [], {
                                            margin: { left: 30 + level * 10, top: 2 },
                                            startY: doc.autoTableEndPosY() + 10,
                                            headerStyles: { fillColor: 255, textColor: 0 }
                                        });
                                    }
                                }
                            };
                            ggg(groups, -1);
                        }
                        else {
                            var data = toAutoTableData(g.getItems(), keys, srcColumns);
                            autoOptions.startY = headerHeight;
                            doc.autoTable(columns, data, autoOptions);
                        }
                    }
                    if (typeof doc.putTotalPages === 'function') {
                        doc.putTotalPages(totalPagesExp);
                    }
                    if (!options.output || options.output == "file") {
                        var fileName = options.reportTitle || "{0}_{1}.pdf";
                        fileName = Q.format(fileName, g.getTitle() || "report", Q.formatDate(new Date(), "yyyyMMdd_HHmm"));
                        doc.save(fileName);
                        return;
                    }
                    if (options.autoPrint)
                        doc.autoPrint();
                    var output = options.output;
                    if (output == 'newwindow' || '_blank')
                        output = 'dataurlnewwindow';
                    else if (output == 'window')
                        output = 'datauri';
                    doc.output(output);
                }
            });
        }
        PdfExportHelper.exportToPdf = exportToPdf;
        function createToolButton(options) {
            return {
                title: options.title || '',
                hint: options.hint || 'PDF',
                cssClass: 'export-pdf-button',
                onClick: function () { return exportToPdf(options); },
                separator: options.separator
            };
        }
        PdfExportHelper.createToolButton = createToolButton;
        function includeJsPDF() {
            if (typeof jsPDF !== "undefined")
                return;
            var script = $("jsPDFScript");
            if (script.length > 0)
                return;
            $("<script/>")
                .attr("type", "text/javascript")
                .attr("id", "jsPDFScript")
                .attr("src", Q.resolveUrl("~/Scripts/jspdf.min.js"))
                .appendTo(document.head);
        }
        function includeAutoTable() {
            includeJsPDF();
            if (typeof jsPDF === "undefined" ||
                typeof jsPDF.API == "undefined" ||
                typeof jsPDF.API.autoTable !== "undefined")
                return;
            var script = $("jsPDFAutoTableScript");
            if (script.length > 0)
                return;
            $("<script/>")
                .attr("type", "text/javascript")
                .attr("id", "jsPDFAutoTableScript")
                .attr("src", Q.resolveUrl("~/Scripts/jspdf.plugin.autotable.min.js"))
                .appendTo(document.head);
        }
    })(PdfExportHelper = _Ext.PdfExportHelper || (_Ext.PdfExportHelper = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var ReportHelper;
    (function (ReportHelper) {
        function createToolButton(options) {
            return {
                title: Q.coalesce(options.title, 'Report'),
                cssClass: Q.coalesce(options.cssClass, 'print-button'),
                icon: options.icon,
                onClick: function () {
                    ReportHelper.execute(options);
                }
            };
        }
        ReportHelper.createToolButton = createToolButton;
        function execute(options) {
            var opt = options.getParams ? options.getParams() : options.params;
            Q.postToUrl({
                url: '~/Report/' + (options.download ? 'Download' : 'Render'),
                params: {
                    key: options.reportKey,
                    ext: Q.coalesce(options.extension, 'pdf'),
                    opt: opt ? $.toJSON(opt) : ''
                },
                target: Q.coalesce(options.target, '_blank')
            });
        }
        ReportHelper.execute = execute;
    })(ReportHelper = _Ext.ReportHelper || (_Ext.ReportHelper = {}));
})(_Ext || (_Ext = {}));
var _Ext;
(function (_Ext) {
    var DialogUtils;
    (function (DialogUtils) {
        function pendingChangesConfirmation(element, hasPendingChanges) {
            element.bind('dialogbeforeclose', function (e) {
                if (!Serenity.WX.hasOriginalEvent(e) || !hasPendingChanges()) {
                    return;
                }
                e.preventDefault();
                Q.confirm('You have pending changes. Save them?', function () { return element.find('div.save-and-close-button').click(); }, {
                    onNo: function () {
                        element.dialog().dialog('close');
                    }
                });
            });
        }
        DialogUtils.pendingChangesConfirmation = pendingChangesConfirmation;
    })(DialogUtils = _Ext.DialogUtils || (_Ext.DialogUtils = {}));
})(_Ext || (_Ext = {}));
function loadScriptAsync(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onload = callback;
    // Fire the loading
    head.appendChild(script);
}
function loadScript(url) {
    $.ajax({
        url: url,
        dataType: "script",
        async: false,
        cache: true,
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + url);
        }
    });
}
function usingVuejs() {
    if (window['Vue']) {
        return;
    }
    else {
        loadScript(Q.resolveUrl("~/Scripts/vue.js"));
        //filters
        window['Vue'].filter('formatDate', function (value, format) {
            if (value) {
                return Q.formatDate(value, format);
            }
        });
        window['Vue'].filter('formatDateReadable', function (value) {
            if (value) {
                var date = Q.parseISODateTime(value);
                return date.getDate() + ' ' + _Ext.Months[date.getMonth()].substr(0, 3) + ' ' + date.getFullYear();
            }
        });
        window['Vue'].filter('dayOnly', function (value) {
            if (value) {
                return Q.formatDate(value, 'dd');
            }
        });
        window['Vue'].filter('monthOnly', function (value) {
            if (value) {
                var date = Q.parseISODateTime(value);
                return _Ext.Months[date.getMonth()];
            }
        });
        window['Vue'].filter('monthOnly3', function (value) {
            if (value) {
                var date = Q.parseISODateTime(value);
                return _Ext.Months[date.getMonth()].substr(0, 3);
            }
        });
        window['Vue'].filter('yearOnly', function (value) {
            if (value) {
                var date = Q.parseISODateTime(value);
                return date.getFullYear();
            }
        });
        window['Vue'].filter('timeOnlyHHmm', function (value) {
            if (value) {
                return Q.formatDate(value, 'HH:mm');
            }
        });
        window['Vue'].filter('formatDateTimeReadable', function (value) {
            if (value) {
                var date = Q.parseISODateTime(value);
                return date.getDate() + ' ' + _Ext.Months[date.getMonth()] + ' ' + date.getFullYear()
                    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            }
        });
        window['Vue'].filter('enumText', function (value, enumKey) {
            if (value) {
                return Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), value);
            }
        });
        window['Vue'].filter('truncate', function (text, length, clamp) {
            clamp = clamp || '...';
            length = length || 30;
            if (text.length <= length)
                return text;
            var tcText = text.slice(0, length - clamp.length);
            var last = tcText.length - 1;
            while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0])
                last -= 1;
            // Fix for case when text dont have any `space`
            last = last || length - clamp.length;
            tcText = tcText.slice(0, last);
            return tcText + clamp;
        });
        window['Vue'].filter('capitalize', function (value) {
            if (!value)
                return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
        });
    }
}
function includeBootstrapColorPickerCss() {
    var style = $("#colorpicker");
    if (style.length > 0) {
        return;
    }
    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "colorpicker")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Scripts/colorpicker/bootstrap-colorpicker.min.css"))
        .appendTo(document.head);
}
function usingBootstrapColorPicker() {
    if (window['colorpicker']) {
        return;
    }
    else {
        includeBootstrapColorPickerCss();
        loadScript(Q.resolveUrl("~/Scripts/colorpicker/bootstrap-colorpicker.min.js"));
    }
}
function includeJqueryUITimepickerAddonCss() {
    var style = $("#datetimepicker");
    if (style.length > 0) {
        return;
    }
    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "datetimepicker")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Content/jquery-ui-timepicker-addon.css"))
        .appendTo(document.head);
}
function usingJqueryUITimepickerAddon() {
    if (window['datetimepicker']) {
        return;
    }
    else {
        includeJqueryUITimepickerAddonCss();
        loadScript(Q.resolveUrl("~/Scripts/jquery-ui-timepicker-addon.js"));
    }
}
function usingBabylonjs() {
    if (window['BABYLON'] && window['BABYLON']['Engine']) {
        return;
    }
    else {
        loadScript(Q.resolveUrl("~/Scripts/babylonjs/babylon.js"));
    }
}
function usingChartjs() {
    if (window['Chart']) {
        return;
    }
    else {
        loadScript(Q.resolveUrl('~/Scripts/chartjs/Chart.js'));
    }
}
function includeCustomMarkerCss() {
    var style = $("#customMarker");
    if (style.length > 0) {
        return;
    }
    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "customMarker")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Scripts/googlemap/CustomMarker.css"))
        .appendTo(document.head);
}
function usingCustomMarker() {
    if (window['CustomMarker']) {
        return;
    }
    else {
        includeCustomMarkerCss();
        loadScript(Q.resolveUrl("~/Scripts/googlemap/CustomMarker.js"));
    }
}
function includeGoogleMap(callback, callbackFullName) {
    if (window['google']) {
        if (callback)
            callback();
        return;
    }
    var script = $("#googleScript");
    if (script.length > 0) {
        if (callback)
            callback();
        return;
    }
    $("<script/>")
        .attr("type", "text/javascript")
        .attr("id", "googleScript")
        .attr("src", 'http://maps.google.com/maps/api/js?v=3.31&key=AIzaSyCRiY7aFA2cI6STbl3YQ3r6m1IpUFmBM98&callback=' + callbackFullName || 'includeGoogleMap')
        .appendTo(document.head);
}
function includeMarkerWithLabel() {
    if (window['MarkerWithLabel']) {
        return;
    }
    var script = $("#MarkerWithLabelScript");
    if (script.length > 0) {
        return;
    }
    $("<script/>")
        .attr("type", "text/javascript")
        .attr("id", "MarkerWithLabelScript")
        .attr("src", Q.resolveUrl("~/Scripts/googlemap/markerwithlabel.js"))
        .appendTo(document.head);
}
function includeVisCss() {
    var style = $("#Vis");
    if (style.length > 0) {
        return;
    }
    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "Vis")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Scripts/visjs/vis.min.css"))
        .appendTo(document.head);
}
function usingVisjs() {
    if (window['vis']) {
        return;
    }
    else {
        includeVisCss();
        loadScript(Q.resolveUrl("~/Scripts/visjs/vis.min.js"));
    }
}
function usingJsonDiffPatch() {
    if (window['jsondiffpatch']) {
        return;
    }
    else {
        $("<link/>").attr("type", "text/css").attr("id", "JsonDiffPatch").attr("rel", "stylesheet")
            .attr("href", Q.resolveUrl("~/Modules/_Ext/AuditLogViewer/jsondiffpatch/formatters-styles/html.css"))
            .appendTo(document.head);
        loadScript(Q.resolveUrl("~/Modules/_Ext/AuditLogViewer/jsondiffpatch/jsondiffpatch.min.js"));
        loadScript(Q.resolveUrl("~/Modules/_Ext/AuditLogViewer/jsondiffpatch/jsondiffpatch-formatters.min.js"));
    }
}
function usingSlickGridEditors() {
    if (window['Slick'] && window['Slick']['Editors'] && window['Slick']['Editors']['Text']) {
        return;
    }
    else {
        loadScript(Q.resolveUrl("~/Modules/_Ext/Editors/slick.editors.js"));
    }
}
function usingSlickAutoColumnSize() {
    if (window['Slick'] && window['Slick']['AutoColumnSize']) {
        return;
    }
    else {
        loadScript(Q.resolveUrl("~/Modules/_Ext/CustomSlickGridPlugin/slick.autocolumnsize.js"));
    }
}
function usingSlickHeaderFilters() {
    if (window['Slick'] && window['Slick']['HeaderFilters']) {
        return;
    }
    else {
        $("<link/>")
            .attr("type", "text/css")
            .attr("id", "CustomSlickGridPlugin")
            .attr("rel", "stylesheet")
            .attr("href", Q.resolveUrl("~/Modules/_Ext/CustomSlickGridPlugin/slick-headerfilters.css"))
            .appendTo(document.head);
        loadScript(Q.resolveUrl("~/Modules/_Ext/CustomSlickGridPlugin/slick.headerfilters.js"));
    }
}
/// <reference path="../../_Bases/EntityDialogBase.ts" />
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var LanguageDialog = (function (_super) {
            __extends(LanguageDialog, _super);
            function LanguageDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Administration.LanguageForm(_this.idPrefix);
                return _this;
            }
            LanguageDialog.prototype.getFormKey = function () { return Administration.LanguageForm.formKey; };
            LanguageDialog.prototype.getIdProperty = function () { return Administration.LanguageRow.idProperty; };
            LanguageDialog.prototype.getLocalTextPrefix = function () { return Administration.LanguageRow.localTextPrefix; };
            LanguageDialog.prototype.getNameProperty = function () { return Administration.LanguageRow.nameProperty; };
            LanguageDialog.prototype.getService = function () { return Administration.LanguageService.baseUrl; };
            LanguageDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], LanguageDialog);
            return LanguageDialog;
        }(VistaLOAN.EntityDialogBase));
        Administration.LanguageDialog = LanguageDialog;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
/// <reference path="../../_Bases/EntityGridBase.ts" />
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var LanguageGrid = (function (_super) {
            __extends(LanguageGrid, _super);
            function LanguageGrid(container) {
                return _super.call(this, container) || this;
            }
            LanguageGrid.prototype.getColumnsKey = function () { return "Administration.Language"; };
            LanguageGrid.prototype.getDialogType = function () { return Administration.LanguageDialog; };
            LanguageGrid.prototype.getIdProperty = function () { return Administration.LanguageRow.idProperty; };
            LanguageGrid.prototype.getLocalTextPrefix = function () { return Administration.LanguageRow.localTextPrefix; };
            LanguageGrid.prototype.getService = function () { return Administration.LanguageService.baseUrl; };
            LanguageGrid.prototype.getDefaultSortBy = function () {
                return ["LanguageName" /* LanguageName */];
            };
            LanguageGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LanguageGrid);
            return LanguageGrid;
        }(VistaLOAN.EntityGridBase));
        Administration.LanguageGrid = LanguageGrid;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RoleDialog = (function (_super) {
            __extends(RoleDialog, _super);
            function RoleDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Administration.RoleForm(_this.idPrefix);
                return _this;
            }
            RoleDialog.prototype.getFormKey = function () { return Administration.RoleForm.formKey; };
            RoleDialog.prototype.getIdProperty = function () { return Administration.RoleRow.idProperty; };
            RoleDialog.prototype.getLocalTextPrefix = function () { return Administration.RoleRow.localTextPrefix; };
            RoleDialog.prototype.getNameProperty = function () { return Administration.RoleRow.nameProperty; };
            RoleDialog.prototype.getService = function () { return Administration.RoleService.baseUrl; };
            RoleDialog.prototype.getToolbarButtons = function () {
                var _this = this;
                var buttons = _super.prototype.getToolbarButtons.call(this);
                buttons.push({
                    title: Q.text('Site.RolePermissionDialog.EditButton'),
                    cssClass: 'edit-permissions-button',
                    icon: 'icon-lock-open text-green',
                    onClick: function () {
                        new Administration.RolePermissionDialog({
                            roleID: _this.entity.RoleId,
                            title: _this.entity.RoleName
                        }).dialogOpen();
                    }
                });
                return buttons;
            };
            RoleDialog.prototype.updateInterface = function () {
                _super.prototype.updateInterface.call(this);
                this.toolbar.findButton("edit-permissions-button").toggleClass("disabled", this.isNewOrDeleted());
            };
            RoleDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], RoleDialog);
            return RoleDialog;
        }(VistaLOAN.EntityDialogBase));
        Administration.RoleDialog = RoleDialog;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RoleGrid = (function (_super) {
            __extends(RoleGrid, _super);
            function RoleGrid(container) {
                return _super.call(this, container) || this;
            }
            RoleGrid.prototype.getColumnsKey = function () { return "Administration.Role"; };
            RoleGrid.prototype.getDialogType = function () { return Administration.RoleDialog; };
            RoleGrid.prototype.getIdProperty = function () { return Administration.RoleRow.idProperty; };
            RoleGrid.prototype.getLocalTextPrefix = function () { return Administration.RoleRow.localTextPrefix; };
            RoleGrid.prototype.getService = function () { return Administration.RoleService.baseUrl; };
            RoleGrid.prototype.getDefaultSortBy = function () {
                return ["RoleName" /* RoleName */];
            };
            RoleGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], RoleGrid);
            return RoleGrid;
        }(VistaLOAN.EntityGridBase));
        Administration.RoleGrid = RoleGrid;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RolePermissionDialog = (function (_super) {
            __extends(RolePermissionDialog, _super);
            function RolePermissionDialog(opt) {
                var _this = _super.call(this, opt) || this;
                _this.permissions = new Administration.PermissionCheckEditor(_this.byId('Permissions'), {
                    showRevoke: false
                });
                Administration.RolePermissionService.List({
                    RoleID: _this.options.roleID,
                    Module: null,
                    Submodule: null
                }, function (response) {
                    _this.permissions.set_value(response.Entities.map(function (x) { return ({ PermissionKey: x }); }));
                });
                return _this;
            }
            RolePermissionDialog.prototype.getDialogOptions = function () {
                var _this = this;
                var opt = _super.prototype.getDialogOptions.call(this);
                opt.buttons = [
                    {
                        text: Q.text('Dialogs.OkButton'),
                        click: function (e) {
                            Administration.RolePermissionService.Update({
                                RoleID: _this.options.roleID,
                                Permissions: _this.permissions.get_value().map(function (x) { return x.PermissionKey; }),
                                Module: null,
                                Submodule: null
                            }, function (response) {
                                _this.dialogClose();
                                window.setTimeout(function () { return Q.notifySuccess(Q.text('Site.RolePermissionDialog.SaveSuccess')); }, 0);
                            });
                        }
                    }, {
                        text: Q.text('Dialogs.CancelButton'),
                        click: function () { return _this.dialogClose(); }
                    }
                ];
                opt.title = Q.format(Q.text('Site.RolePermissionDialog.DialogTitle'), this.options.title);
                return opt;
            };
            RolePermissionDialog.prototype.getTemplate = function () {
                return '<div id="~_Permissions"></div>';
            };
            RolePermissionDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], RolePermissionDialog);
            return RolePermissionDialog;
        }(Serenity.TemplatedDialog));
        Administration.RolePermissionDialog = RolePermissionDialog;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var TranslationGrid = (function (_super) {
            __extends(TranslationGrid, _super);
            function TranslationGrid(container) {
                var _this = _super.call(this, container) || this;
                _this.element.on('keyup.' + _this.uniqueName + ' change.' + _this.uniqueName, 'input.custom-text', function (e) {
                    var value = Q.trimToNull($(e.target).val());
                    if (value === '') {
                        value = null;
                    }
                    _this.view.getItemById($(e.target).data('key')).CustomText = value;
                    _this.hasChanges = true;
                });
                return _this;
            }
            TranslationGrid.prototype.getIdProperty = function () { return "Key"; };
            TranslationGrid.prototype.getLocalTextPrefix = function () { return "Administration.Translation"; };
            TranslationGrid.prototype.getService = function () { return Administration.TranslationService.baseUrl; };
            TranslationGrid.prototype.onClick = function (e, row, cell) {
                var _this = this;
                _super.prototype.onClick.call(this, e, row, cell);
                if (e.isDefaultPrevented()) {
                    return;
                }
                var item = this.itemAt(row);
                var done;
                if ($(e.target).hasClass('source-text')) {
                    e.preventDefault();
                    done = function () {
                        item.CustomText = item.SourceText;
                        _this.view.updateItem(item.Key, item);
                        _this.hasChanges = true;
                    };
                    if (Q.isTrimmedEmpty(item.CustomText) ||
                        (Q.trimToEmpty(item.CustomText) === Q.trimToEmpty(item.SourceText))) {
                        done();
                        return;
                    }
                    Q.confirm(Q.text('Db.Administration.Translation.OverrideConfirmation'), done);
                    return;
                }
                if ($(e.target).hasClass('target-text')) {
                    e.preventDefault();
                    done = function () {
                        item.CustomText = item.TargetText;
                        _this.view.updateItem(item.Key, item);
                        _this.hasChanges = true;
                    };
                    if (Q.isTrimmedEmpty(item.CustomText) ||
                        (Q.trimToEmpty(item.CustomText) === Q.trimToEmpty(item.TargetText))) {
                        done();
                        return;
                    }
                    Q.confirm(Q.text('Db.Administration.Translation.OverrideConfirmation'), done);
                    return;
                }
            };
            TranslationGrid.prototype.getColumns = function () {
                var columns = [];
                columns.push({ field: 'Key', width: 300, sortable: false });
                columns.push({
                    field: 'SourceText',
                    width: 300,
                    sortable: false,
                    format: function (ctx) {
                        return Q.outerHtml($('<a/>')
                            .addClass('source-text')
                            .text(ctx.value || ''));
                    }
                });
                columns.push({
                    field: 'CustomText',
                    width: 300,
                    sortable: false,
                    format: function (ctx) { return Q.outerHtml($('<input/>')
                        .addClass('custom-text')
                        .attr('value', ctx.value)
                        .attr('type', 'text')
                        .attr('data-key', ctx.item.Key)); }
                });
                columns.push({
                    field: 'TargetText',
                    width: 300,
                    sortable: false,
                    format: function (ctx) { return Q.outerHtml($('<a/>')
                        .addClass('target-text')
                        .text(ctx.value || '')); }
                });
                return columns;
            };
            TranslationGrid.prototype.createToolbarExtensions = function () {
                var _this = this;
                _super.prototype.createToolbarExtensions.call(this);
                var opt = {
                    lookupKey: 'Administration.Language'
                };
                this.sourceLanguage = Serenity.Widget.create({
                    type: Serenity.LookupEditor,
                    element: function (el) { return el.appendTo(_this.toolbar.element).attr('placeholder', '--- ' +
                        Q.text('Db.Administration.Translation.SourceLanguage') + ' ---'); },
                    options: opt
                });
                this.sourceLanguage.changeSelect2(function (e) {
                    if (_this.hasChanges) {
                        _this.saveChanges(_this.targetLanguageKey).then(function () { return _this.refresh(); });
                    }
                    else {
                        _this.refresh();
                    }
                });
                this.targetLanguage = Serenity.Widget.create({
                    type: Serenity.LookupEditor,
                    element: function (el) { return el.appendTo(_this.toolbar.element).attr('placeholder', '--- ' +
                        Q.text('Db.Administration.Translation.TargetLanguage') + ' ---'); },
                    options: opt
                });
                this.targetLanguage.changeSelect2(function (e) {
                    if (_this.hasChanges) {
                        _this.saveChanges(_this.targetLanguageKey).then(function () { return _this.refresh(); });
                    }
                    else {
                        _this.refresh();
                    }
                });
            };
            TranslationGrid.prototype.saveChanges = function (language) {
                var _this = this;
                var translations = {};
                for (var _i = 0, _a = this.getItems(); _i < _a.length; _i++) {
                    var item = _a[_i];
                    translations[item.Key] = item.CustomText;
                }
                return RSVP.resolve(Administration.TranslationService.Update({
                    TargetLanguageID: language,
                    Translations: translations
                })).then(function () {
                    _this.hasChanges = false;
                    language = Q.trimToNull(language) || 'invariant';
                    Q.notifySuccess('User translations in "' + language +
                        '" language are saved to "user.texts.' +
                        language + '.json" ' + 'file under "~/App_Data/texts/"', '');
                });
            };
            TranslationGrid.prototype.onViewSubmit = function () {
                var request = this.view.params;
                request.SourceLanguageID = this.sourceLanguage.value;
                this.targetLanguageKey = this.targetLanguage.value || '';
                request.TargetLanguageID = this.targetLanguageKey;
                this.hasChanges = false;
                return _super.prototype.onViewSubmit.call(this);
            };
            TranslationGrid.prototype.getButtons = function () {
                var _this = this;
                return [{
                        title: Q.text('Db.Administration.Translation.SaveChangesButton'),
                        onClick: function (e) { return _this.saveChanges(_this.targetLanguageKey).then(function () { return _this.refresh(); }); },
                        cssClass: 'apply-changes-button'
                    }];
            };
            TranslationGrid.prototype.createQuickSearchInput = function () {
                var _this = this;
                Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, function (field, searchText) {
                    _this.searchText = searchText;
                    _this.view.setItems(_this.view.getItems(), true);
                });
            };
            TranslationGrid.prototype.onViewFilter = function (item) {
                if (!_super.prototype.onViewFilter.call(this, item)) {
                    return false;
                }
                if (!this.searchText) {
                    return true;
                }
                var sd = Select2.util.stripDiacritics;
                var searching = sd(this.searchText).toLowerCase();
                function match(str) {
                    if (!str)
                        return false;
                    return str.toLowerCase().indexOf(searching) >= 0;
                }
                return Q.isEmptyOrNull(searching) || match(item.Key) || match(item.SourceText) ||
                    match(item.TargetText) || match(item.CustomText);
            };
            TranslationGrid.prototype.usePager = function () {
                return false;
            };
            TranslationGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], TranslationGrid);
            return TranslationGrid;
        }(VistaLOAN.EntityGridBase));
        Administration.TranslationGrid = TranslationGrid;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserDialog = (function (_super) {
            __extends(UserDialog, _super);
            function UserDialog() {
                var _this = _super.call(this) || this;
                _this.form = new Administration.UserForm(_this.idPrefix);
                _this.form.Password.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.Password.value.length < 7)
                        return "Password must be at least 7 characters!";
                });
                _this.form.PasswordConfirm.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.Password.value != _this.form.PasswordConfirm.value)
                        return "The passwords entered doesn't match!";
                });
                return _this;
            }
            UserDialog.prototype.getFormKey = function () { return Administration.UserForm.formKey; };
            UserDialog.prototype.getIdProperty = function () { return Administration.UserRow.idProperty; };
            UserDialog.prototype.getIsActiveProperty = function () { return Administration.UserRow.isActiveProperty; };
            UserDialog.prototype.getLocalTextPrefix = function () { return Administration.UserRow.localTextPrefix; };
            UserDialog.prototype.getNameProperty = function () { return Administration.UserRow.nameProperty; };
            UserDialog.prototype.getService = function () { return Administration.UserService.baseUrl; };
            UserDialog.prototype.getToolbarButtons = function () {
                var _this = this;
                var buttons = _super.prototype.getToolbarButtons.call(this);
                buttons.push({
                    title: Q.text('Site.UserDialog.EditRolesButton'),
                    cssClass: 'edit-roles-button',
                    icon: 'icon-people text-blue',
                    onClick: function () {
                        new Administration.UserRoleDialog({
                            userID: _this.entity.UserId,
                            username: _this.entity.Username
                        }).dialogOpen();
                    }
                });
                buttons.push({
                    title: Q.text('Site.UserDialog.EditPermissionsButton'),
                    cssClass: 'edit-permissions-button',
                    icon: 'icon-lock-open text-green',
                    onClick: function () {
                        new Administration.UserPermissionDialog({
                            userID: _this.entity.UserId,
                            username: _this.entity.Username
                        }).dialogOpen();
                    }
                });
                return buttons;
            };
            UserDialog.prototype.updateInterface = function () {
                _super.prototype.updateInterface.call(this);
                this.toolbar.findButton('edit-roles-button').toggleClass('disabled', this.isNewOrDeleted());
                this.toolbar.findButton("edit-permissions-button").toggleClass("disabled", this.isNewOrDeleted());
            };
            UserDialog.prototype.afterLoadEntity = function () {
                _super.prototype.afterLoadEntity.call(this);
                // these fields are only required in new record mode
                this.form.Password.element.toggleClass('required', this.isNew())
                    .closest('.field').find('sup').toggle(this.isNew());
                this.form.PasswordConfirm.element.toggleClass('required', this.isNew())
                    .closest('.field').find('sup').toggle(this.isNew());
            };
            UserDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], UserDialog);
            return UserDialog;
        }(VistaLOAN.EntityDialogBase));
        Administration.UserDialog = UserDialog;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserGrid = (function (_super) {
            __extends(UserGrid, _super);
            function UserGrid(container) {
                return _super.call(this, container) || this;
            }
            UserGrid.prototype.getColumnsKey = function () { return "Administration.User"; };
            UserGrid.prototype.getDialogType = function () { return Administration.UserDialog; };
            UserGrid.prototype.getIdProperty = function () { return Administration.UserRow.idProperty; };
            UserGrid.prototype.getIsActiveProperty = function () { return Administration.UserRow.isActiveProperty; };
            UserGrid.prototype.getLocalTextPrefix = function () { return Administration.UserRow.localTextPrefix; };
            UserGrid.prototype.getService = function () { return Administration.UserService.baseUrl; };
            UserGrid.prototype.getDefaultSortBy = function () {
                return ["Username" /* Username */];
            };
            UserGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], UserGrid);
            return UserGrid;
        }(VistaLOAN.EntityGridBase));
        Administration.UserGrid = UserGrid;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Authorization;
    (function (Authorization) {
        Object.defineProperty(Authorization, 'userDefinition', {
            get: function () {
                return Q.getRemoteData('UserData');
            }
        });
        function hasPermission(permissionKey) {
            var ud = Authorization.userDefinition;
            return ud.Username === 'admin' || !!ud.Permissions[permissionKey];
        }
        Authorization.hasPermission = hasPermission;
    })(Authorization = VistaLOAN.Authorization || (VistaLOAN.Authorization = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var PermissionCheckEditor = (function (_super) {
            __extends(PermissionCheckEditor, _super);
            function PermissionCheckEditor(container, opt) {
                var _this = _super.call(this, container, opt) || this;
                _this.rolePermissions = {};
                var titleByKey = {};
                var permissionKeys = _this.getSortedGroupAndPermissionKeys(titleByKey);
                var items = permissionKeys.map(function (key) { return ({
                    Key: key,
                    ParentKey: _this.getParentKey(key),
                    Title: titleByKey[key],
                    GrantRevoke: null,
                    IsGroup: key.charAt(key.length - 1) === ':'
                }); });
                _this.byParentKey = Q.toGrouping(items, function (x) { return x.ParentKey; });
                _this.setItems(items);
                return _this;
            }
            PermissionCheckEditor.prototype.getIdProperty = function () { return "Key"; };
            PermissionCheckEditor.prototype.getItemGrantRevokeClass = function (item, grant) {
                if (!item.IsGroup) {
                    return ((item.GrantRevoke === grant) ? ' checked' : '');
                }
                var desc = this.getDescendants(item, true);
                var granted = desc.filter(function (x) { return x.GrantRevoke === grant; });
                if (!granted.length) {
                    return '';
                }
                if (desc.length === granted.length) {
                    return 'checked';
                }
                return 'checked partial';
            };
            PermissionCheckEditor.prototype.getItemEffectiveClass = function (item) {
                var _this = this;
                if (item.IsGroup) {
                    var desc = this.getDescendants(item, true);
                    var grantCount = Q.count(desc, function (x) { return x.GrantRevoke === true ||
                        (x.GrantRevoke == null && _this.rolePermissions[x.Key]); });
                    if (grantCount === desc.length || desc.length === 0) {
                        return 'allow';
                    }
                    if (grantCount === 0) {
                        return 'deny';
                    }
                    return 'partial';
                }
                var granted = item.GrantRevoke === true ||
                    (item.GrantRevoke == null && this.rolePermissions[item.Key]);
                return (granted ? ' allow' : ' deny');
            };
            PermissionCheckEditor.prototype.getColumns = function () {
                var _this = this;
                var columns = [{
                        name: Q.text('Site.UserPermissionDialog.Permission'),
                        field: 'Title',
                        format: Serenity.SlickFormatting.treeToggle(function () { return _this.view; }, function (x) { return x.Key; }, function (ctx) {
                            var item = ctx.item;
                            var klass = _this.getItemEffectiveClass(item);
                            return '<span class="effective-permission ' + klass + '">' + Q.htmlEncode(ctx.value) + '</span>';
                        }),
                        width: 495,
                        sortable: false
                    }, {
                        name: Q.text('Site.UserPermissionDialog.Grant'), field: 'Grant',
                        format: function (ctx) {
                            var item1 = ctx.item;
                            var klass1 = _this.getItemGrantRevokeClass(item1, true);
                            return "<span class='check-box grant no-float " + klass1 + "'></span>";
                        },
                        width: 65,
                        sortable: false,
                        headerCssClass: 'align-center',
                        cssClass: 'align-center'
                    }];
                if (this.options.showRevoke) {
                    columns.push({
                        name: Q.text('Site.UserPermissionDialog.Revoke'), field: 'Revoke',
                        format: function (ctx) {
                            var item2 = ctx.item;
                            var klass2 = _this.getItemGrantRevokeClass(item2, false);
                            return '<span class="check-box revoke no-float ' + klass2 + '"></span>';
                        },
                        width: 65,
                        sortable: false,
                        headerCssClass: 'align-center',
                        cssClass: 'align-center'
                    });
                }
                return columns;
            };
            PermissionCheckEditor.prototype.setItems = function (items) {
                Serenity.SlickTreeHelper.setIndents(items, function (x) { return x.Key; }, function (x) { return x.ParentKey; }, false);
                this.view.setItems(items, true);
            };
            PermissionCheckEditor.prototype.onViewSubmit = function () {
                return false;
            };
            PermissionCheckEditor.prototype.onViewFilter = function (item) {
                var _this = this;
                if (!_super.prototype.onViewFilter.call(this, item)) {
                    return false;
                }
                if (!Serenity.SlickTreeHelper.filterById(item, this.view, function (x) { return x.ParentKey; }))
                    return false;
                if (this.searchText) {
                    return this.matchContains(item) || item.IsGroup && Q.any(this.getDescendants(item, false), function (x) { return _this.matchContains(x); });
                }
                return true;
            };
            PermissionCheckEditor.prototype.matchContains = function (item) {
                return Select2.util.stripDiacritics(item.Title || '').toLowerCase().indexOf(this.searchText) >= 0;
            };
            PermissionCheckEditor.prototype.getDescendants = function (item, excludeGroups) {
                var result = [];
                var stack = [item];
                while (stack.length > 0) {
                    var i = stack.pop();
                    var children = this.byParentKey[i.Key];
                    if (!children)
                        continue;
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var child = children_1[_i];
                        if (!excludeGroups || !child.IsGroup) {
                            result.push(child);
                        }
                        stack.push(child);
                    }
                }
                return result;
            };
            PermissionCheckEditor.prototype.onClick = function (e, row, cell) {
                _super.prototype.onClick.call(this, e, row, cell);
                if (!e.isDefaultPrevented()) {
                    Serenity.SlickTreeHelper.toggleClick(e, row, cell, this.view, function (x) { return x.Key; });
                }
                if (e.isDefaultPrevented()) {
                    return;
                }
                var target = $(e.target);
                var grant = target.hasClass('grant');
                if (grant || target.hasClass('revoke')) {
                    e.preventDefault();
                    var item = this.itemAt(row);
                    var checkedOrPartial = target.hasClass('checked') || target.hasClass('partial');
                    if (checkedOrPartial) {
                        grant = null;
                    }
                    else {
                        grant = grant !== checkedOrPartial;
                    }
                    if (item.IsGroup) {
                        for (var _i = 0, _a = this.getDescendants(item, true); _i < _a.length; _i++) {
                            var d = _a[_i];
                            d.GrantRevoke = grant;
                        }
                    }
                    else
                        item.GrantRevoke = grant;
                    this.slickGrid.invalidate();
                }
            };
            PermissionCheckEditor.prototype.getParentKey = function (key) {
                if (key.charAt(key.length - 1) === ':') {
                    key = key.substr(0, key.length - 1);
                }
                var idx = key.lastIndexOf(':');
                if (idx >= 0) {
                    return key.substr(0, idx + 1);
                }
                return null;
            };
            PermissionCheckEditor.prototype.getButtons = function () {
                return [];
            };
            PermissionCheckEditor.prototype.createToolbarExtensions = function () {
                var _this = this;
                _super.prototype.createToolbarExtensions.call(this);
                Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, function (field, text) {
                    _this.searchText = Select2.util.stripDiacritics(Q.trimToNull(text) || '').toLowerCase();
                    _this.view.setItems(_this.view.getItems(), true);
                });
            };
            PermissionCheckEditor.prototype.getSortedGroupAndPermissionKeys = function (titleByKey) {
                var keys = Q.getRemoteData('Administration.PermissionKeys').Entities;
                var titleWithGroup = {};
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var k = keys_1[_i];
                    var s = k;
                    if (!s) {
                        continue;
                    }
                    if (s.charAt(s.length - 1) == ':') {
                        s = s.substr(0, s.length - 1);
                        if (s.length === 0) {
                            continue;
                        }
                    }
                    if (titleByKey[s]) {
                        continue;
                    }
                    titleByKey[s] = Q.coalesce(Q.tryGetText('Permission.' + s), s);
                    var parts = s.split(':');
                    var group = '';
                    var groupTitle = '';
                    for (var i = 0; i < parts.length - 1; i++) {
                        group = group + parts[i] + ':';
                        var txt = Q.tryGetText('Permission.' + group);
                        if (txt == null) {
                            txt = parts[i];
                        }
                        titleByKey[group] = txt;
                        groupTitle = groupTitle + titleByKey[group] + ':';
                        titleWithGroup[group] = groupTitle;
                    }
                    titleWithGroup[s] = groupTitle + titleByKey[s];
                }
                keys = Object.keys(titleByKey);
                keys = keys.sort(function (x, y) { return Q.turkishLocaleCompare(titleWithGroup[x], titleWithGroup[y]); });
                return keys;
            };
            PermissionCheckEditor.prototype.get_value = function () {
                var result = [];
                for (var _i = 0, _a = this.view.getItems(); _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.GrantRevoke != null && item.Key.charAt(item.Key.length - 1) != ':') {
                        result.push({ PermissionKey: item.Key, Granted: item.GrantRevoke });
                    }
                }
                return result;
            };
            PermissionCheckEditor.prototype.set_value = function (value) {
                for (var _i = 0, _a = this.view.getItems(); _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.GrantRevoke = null;
                }
                if (value != null) {
                    for (var _b = 0, value_1 = value; _b < value_1.length; _b++) {
                        var row = value_1[_b];
                        var r = this.view.getItemById(row.PermissionKey);
                        if (r) {
                            r.GrantRevoke = Q.coalesce(row.Granted, true);
                        }
                    }
                }
                this.setItems(this.getItems());
            };
            PermissionCheckEditor.prototype.get_rolePermissions = function () {
                return Object.keys(this.rolePermissions);
            };
            PermissionCheckEditor.prototype.set_rolePermissions = function (value) {
                this.rolePermissions = {};
                if (value) {
                    for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                        var k = value_2[_i];
                        this.rolePermissions[k] = true;
                    }
                }
                this.setItems(this.getItems());
            };
            PermissionCheckEditor = __decorate([
                Serenity.Decorators.registerEditor([Serenity.IGetEditValue, Serenity.ISetEditValue])
            ], PermissionCheckEditor);
            return PermissionCheckEditor;
        }(Serenity.DataGrid));
        Administration.PermissionCheckEditor = PermissionCheckEditor;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserPermissionDialog = (function (_super) {
            __extends(UserPermissionDialog, _super);
            function UserPermissionDialog(opt) {
                var _this = _super.call(this, opt) || this;
                _this.permissions = new Administration.PermissionCheckEditor(_this.byId('Permissions'), {
                    showRevoke: true
                });
                Administration.UserPermissionService.List({
                    UserID: _this.options.userID,
                    Module: null,
                    Submodule: null
                }, function (response) {
                    _this.permissions.set_value(response.Entities);
                });
                Administration.UserPermissionService.ListRolePermissions({
                    UserID: _this.options.userID,
                    Module: null,
                    Submodule: null,
                }, function (response) {
                    _this.permissions.set_rolePermissions(response.Entities);
                });
                return _this;
            }
            UserPermissionDialog.prototype.getDialogOptions = function () {
                var _this = this;
                var opt = _super.prototype.getDialogOptions.call(this);
                opt.buttons = [
                    {
                        text: Q.text('Dialogs.OkButton'),
                        click: function (e) {
                            Administration.UserPermissionService.Update({
                                UserID: _this.options.userID,
                                Permissions: _this.permissions.get_value(),
                                Module: null,
                                Submodule: null
                            }, function (response) {
                                _this.dialogClose();
                                window.setTimeout(function () { return Q.notifySuccess(Q.text('Site.UserPermissionDialog.SaveSuccess')); }, 0);
                            });
                        }
                    }, {
                        text: Q.text('Dialogs.CancelButton'),
                        click: function () { return _this.dialogClose(); }
                    }
                ];
                opt.title = Q.format(Q.text('Site.UserPermissionDialog.DialogTitle'), this.options.username);
                return opt;
            };
            UserPermissionDialog.prototype.getTemplate = function () {
                return '<div id="~_Permissions"></div>';
            };
            UserPermissionDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], UserPermissionDialog);
            return UserPermissionDialog;
        }(Serenity.TemplatedDialog));
        Administration.UserPermissionDialog = UserPermissionDialog;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var RoleCheckEditor = (function (_super) {
            __extends(RoleCheckEditor, _super);
            function RoleCheckEditor(div) {
                return _super.call(this, div) || this;
            }
            RoleCheckEditor.prototype.createToolbarExtensions = function () {
                var _this = this;
                _super.prototype.createToolbarExtensions.call(this);
                Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, function (field, text) {
                    _this.searchText = Select2.util.stripDiacritics(text || '').toUpperCase();
                    _this.view.setItems(_this.view.getItems(), true);
                });
            };
            RoleCheckEditor.prototype.getButtons = function () {
                return [];
            };
            RoleCheckEditor.prototype.getTreeItems = function () {
                return Administration.RoleRow.getLookup().items.map(function (role) { return ({
                    id: role.RoleId.toString(),
                    text: role.RoleName
                }); });
            };
            RoleCheckEditor.prototype.onViewFilter = function (item) {
                return _super.prototype.onViewFilter.call(this, item) &&
                    (Q.isEmptyOrNull(this.searchText) ||
                        Select2.util.stripDiacritics(item.text || '')
                            .toUpperCase().indexOf(this.searchText) >= 0);
            };
            RoleCheckEditor = __decorate([
                Serenity.Decorators.registerEditor()
            ], RoleCheckEditor);
            return RoleCheckEditor;
        }(Serenity.CheckTreeEditor));
        Administration.RoleCheckEditor = RoleCheckEditor;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Administration;
    (function (Administration) {
        var UserRoleDialog = (function (_super) {
            __extends(UserRoleDialog, _super);
            function UserRoleDialog(opt) {
                var _this = _super.call(this, opt) || this;
                _this.permissions = new Administration.RoleCheckEditor(_this.byId('Roles'));
                Administration.UserRoleService.List({
                    UserID: _this.options.userID
                }, function (response) {
                    _this.permissions.value = response.Entities.map(function (x) { return x.toString(); });
                });
                return _this;
            }
            UserRoleDialog.prototype.getDialogOptions = function () {
                var _this = this;
                var opt = _super.prototype.getDialogOptions.call(this);
                opt.buttons = [{
                        text: Q.text('Dialogs.OkButton'),
                        click: function () {
                            Q.serviceRequest('Administration/UserRole/Update', {
                                UserID: _this.options.userID,
                                Roles: _this.permissions.value.map(function (x) { return parseInt(x, 10); })
                            }, function (response) {
                                _this.dialogClose();
                                Q.notifySuccess(Q.text('Site.UserRoleDialog.SaveSuccess'));
                            });
                        }
                    }, {
                        text: Q.text('Dialogs.CancelButton'),
                        click: function () { return _this.dialogClose(); }
                    }];
                opt.title = Q.format(Q.text('Site.UserRoleDialog.DialogTitle'), this.options.username);
                return opt;
            };
            UserRoleDialog.prototype.getTemplate = function () {
                return "<div id='~_Roles'></div>";
            };
            UserRoleDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], UserRoleDialog);
            return UserRoleDialog;
        }(Serenity.TemplatedDialog));
        Administration.UserRoleDialog = UserRoleDialog;
    })(Administration = VistaLOAN.Administration || (VistaLOAN.Administration = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var TrueFalseEditor = (function (_super) {
        __extends(TrueFalseEditor, _super);
        function TrueFalseEditor(hidden, opt) {
            var _this = _super.call(this, hidden, opt) || this;
            _super.prototype.addItem.call(_this, { id: "true", text: "Yes", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "false", text: "No", disabled: false, source: "common" });
            return _this;
        }
        TrueFalseEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], TrueFalseEditor);
        return TrueFalseEditor;
    }(Serenity.Select2Editor));
    VistaLOAN.TrueFalseEditor = TrueFalseEditor;
    var ApprovalStatusEditor = (function (_super) {
        __extends(ApprovalStatusEditor, _super);
        function ApprovalStatusEditor(hidden, opt) {
            var _this = _super.call(this, hidden, opt) || this;
            _super.prototype.addItem.call(_this, { id: "1", text: "Draft", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "2", text: "Cancel", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "3", text: "Submit", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "4", text: "Regret", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "5", text: "Recommend", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "6", text: "Approved", disabled: false, source: "common" });
            return _this;
        }
        ApprovalStatusEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], ApprovalStatusEditor);
        return ApprovalStatusEditor;
    }(Serenity.Select2Editor));
    VistaLOAN.ApprovalStatusEditor = ApprovalStatusEditor;
    var MonthListEditor = (function (_super) {
        __extends(MonthListEditor, _super);
        function MonthListEditor(container) {
            var _this = _super.call(this, container, null) || this;
            _this.addItem({ id: "January", text: "January" });
            _this.addItem({ id: "February", text: "February" });
            _this.addItem({ id: "March", text: "March" });
            _this.addItem({ id: "April", text: "April" });
            _this.addItem({ id: "May", text: "May" });
            _this.addItem({ id: "June", text: "June" });
            _this.addItem({ id: "July", text: "July" });
            _this.addItem({ id: "August", text: "August" });
            _this.addItem({ id: "September", text: "September" });
            _this.addItem({ id: "October", text: "October" });
            _this.addItem({ id: "November", text: "November" });
            _this.addItem({ id: "December", text: "December" });
            return _this;
        }
        MonthListEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], MonthListEditor);
        return MonthListEditor;
    }(Serenity.Select2Editor));
    VistaLOAN.MonthListEditor = MonthListEditor;
    var CashOrChequeSelectEditor = (function (_super) {
        __extends(CashOrChequeSelectEditor, _super);
        function CashOrChequeSelectEditor(hidden, opt) {
            var _this = _super.call(this, hidden, opt) || this;
            _super.prototype.addItem.call(_this, { id: "Cash", text: "Cash", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "Cheque", text: "Cheque", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "JV", text: "JV", disabled: false, source: "common" });
            return _this;
        }
        CashOrChequeSelectEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], CashOrChequeSelectEditor);
        return CashOrChequeSelectEditor;
    }(Serenity.Select2Editor));
    VistaLOAN.CashOrChequeSelectEditor = CashOrChequeSelectEditor;
    var PFLoanTypeEditor = (function (_super) {
        __extends(PFLoanTypeEditor, _super);
        function PFLoanTypeEditor(hidden, opt) {
            var _this = _super.call(this, hidden, opt) || this;
            _super.prototype.addItem.call(_this, { id: "Refundable", text: "Refundable", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "Non-Refundable", text: "Non-Refundable", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "FinalPayment", text: "Final Payment", disabled: false, source: "common" });
            return _this;
        }
        PFLoanTypeEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], PFLoanTypeEditor);
        return PFLoanTypeEditor;
    }(Serenity.Select2Editor));
    VistaLOAN.PFLoanTypeEditor = PFLoanTypeEditor;
    var PFPaymentTypeEditor = (function (_super) {
        __extends(PFPaymentTypeEditor, _super);
        function PFPaymentTypeEditor(hidden, opt) {
            var _this = _super.call(this, hidden, opt) || this;
            _super.prototype.addItem.call(_this, { id: "Non-Refundable", text: "Non-Refundable", disabled: false, source: "common" });
            _super.prototype.addItem.call(_this, { id: "FinalPayment", text: "Final Payment", disabled: false, source: "common" });
            return _this;
        }
        PFPaymentTypeEditor = __decorate([
            Serenity.Decorators.registerEditor()
        ], PFPaymentTypeEditor);
        return PFPaymentTypeEditor;
    }(Serenity.Select2Editor));
    VistaLOAN.PFPaymentTypeEditor = PFPaymentTypeEditor;
})(VistaLOAN || (VistaLOAN = {}));
var multiplicationFactor = 10;
var containerWidth = 8;
var containerHeight = 8.6;
var VistaLOAN;
(function (VistaLOAN) {
    var ScriptInitialization;
    (function (ScriptInitialization) {
        Q.Config.responsiveDialogs = true;
        Q.Config.rootNamespaces.push('VistaLOAN');
    })(ScriptInitialization = VistaLOAN.ScriptInitialization || (VistaLOAN.ScriptInitialization = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var BasicProgressDialog = (function (_super) {
        __extends(BasicProgressDialog, _super);
        function BasicProgressDialog() {
            var _this = _super.call(this) || this;
            _this.byId('ProgressBar').progressbar({
                max: 100,
                value: 0,
                change: function (e, v) {
                    _this.byId('ProgressLabel').text(_this.value + ' / ' + _this.max);
                }
            });
            return _this;
        }
        Object.defineProperty(BasicProgressDialog.prototype, "max", {
            get: function () {
                return this.byId('ProgressBar').progressbar().progressbar('option', 'max');
            },
            set: function (value) {
                this.byId('ProgressBar').progressbar().progressbar('option', 'max', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgressDialog.prototype, "value", {
            get: function () {
                return this.byId('ProgressBar').progressbar('value');
            },
            set: function (value) {
                this.byId('ProgressBar').progressbar().progressbar('value', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgressDialog.prototype, "title", {
            get: function () {
                return this.element.dialog().dialog('option', 'title');
            },
            set: function (value) {
                this.element.dialog().dialog('option', 'title', value);
            },
            enumerable: true,
            configurable: true
        });
        BasicProgressDialog.prototype.getDialogOptions = function () {
            var _this = this;
            var opt = _super.prototype.getDialogOptions.call(this);
            opt.title = Q.text('Site.BasicProgressDialog.PleaseWait');
            opt.width = 600;
            opt.buttons = [{
                    text: Q.text('Dialogs.CancelButton'),
                    click: function () {
                        _this.cancelled = true;
                        _this.element.closest('.ui-dialog')
                            .find('.ui-dialog-buttonpane .ui-button')
                            .attr('disabled', 'disabled')
                            .css('opacity', '0.5');
                        _this.element.dialog('option', 'title', Q.trimToNull(_this.cancelTitle) ||
                            Q.text('Site.BasicProgressDialog.CancelTitle'));
                    }
                }];
            return opt;
        };
        BasicProgressDialog.prototype.initDialog = function () {
            _super.prototype.initDialog.call(this);
            this.element.closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
        };
        BasicProgressDialog.prototype.getTemplate = function () {
            return ("<div class='s-DialogContent s-BasicProgressDialogContent'>" +
                "<div id='~_StatusText' class='status-text' ></div>" +
                "<div id='~_ProgressBar' class='progress-bar'>" +
                "<div id='~_ProgressLabel' class='progress-label' ></div>" +
                "</div>" +
                "</div>");
        };
        return BasicProgressDialog;
    }(Serenity.TemplatedDialog));
    VistaLOAN.BasicProgressDialog = BasicProgressDialog;
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var BulkServiceAction = (function () {
            function BulkServiceAction() {
            }
            BulkServiceAction.prototype.createProgressDialog = function () {
                this.progressDialog = new VistaLOAN.BasicProgressDialog();
                this.progressDialog.dialogOpen();
                this.progressDialog.max = this.keys.length;
                this.progressDialog.value = 0;
            };
            BulkServiceAction.prototype.getConfirmationFormat = function () {
                return Q.text('Site.BulkServiceAction.ConfirmationFormat');
            };
            BulkServiceAction.prototype.getConfirmationMessage = function (targetCount) {
                return Q.format(this.getConfirmationFormat(), targetCount);
            };
            BulkServiceAction.prototype.confirm = function (targetCount, action) {
                Q.confirm(this.getConfirmationMessage(targetCount), action);
            };
            BulkServiceAction.prototype.getNothingToProcessMessage = function () {
                return Q.text('Site.BulkServiceAction.NothingToProcess');
            };
            BulkServiceAction.prototype.nothingToProcess = function () {
                Q.notifyError(this.getNothingToProcessMessage());
            };
            BulkServiceAction.prototype.getParallelRequests = function () {
                return 1;
            };
            BulkServiceAction.prototype.getBatchSize = function () {
                return 1;
            };
            BulkServiceAction.prototype.startParallelExecution = function () {
                this.createProgressDialog();
                this.successCount = 0;
                this.errorCount = 0;
                this.pendingRequests = 0;
                this.completedRequests = 0;
                this.errorCount = 0;
                this.errorByKey = {};
                this.queue = this.keys.slice();
                this.queueIndex = 0;
                var parallelRequests = this.getParallelRequests();
                while (parallelRequests-- > 0) {
                    this.executeNextBatch();
                }
            };
            BulkServiceAction.prototype.serviceCallCleanup = function () {
                this.pendingRequests--;
                this.completedRequests++;
                var title = Q.text((this.progressDialog.cancelled ?
                    'Site.BasicProgressDialog.CancelTitle' : 'Site.BasicProgressDialog.PleaseWait'));
                title += ' (';
                if (this.successCount > 0) {
                    title += Q.format(Q.text('Site.BulkServiceAction.SuccessCount'), this.successCount);
                }
                if (this.errorCount > 0) {
                    if (this.successCount > 0) {
                        title += ', ';
                    }
                    title += Q.format(Q.text('Site.BulkServiceAction.ErrorCount'), this.errorCount);
                }
                this.progressDialog.title = title + ')';
                this.progressDialog.value = this.successCount + this.errorCount;
                if (!this.progressDialog.cancelled && this.progressDialog.value < this.keys.length) {
                    this.executeNextBatch();
                }
                else if (this.pendingRequests === 0) {
                    this.progressDialog.dialogClose();
                    this.showResults();
                    if (this.done) {
                        this.done();
                        this.done = null;
                    }
                }
            };
            BulkServiceAction.prototype.executeForBatch = function (batch) {
            };
            BulkServiceAction.prototype.executeNextBatch = function () {
                var batchSize = this.getBatchSize();
                var batch = [];
                while (true) {
                    if (batch.length >= batchSize) {
                        break;
                    }
                    if (this.queueIndex >= this.queue.length) {
                        break;
                    }
                    batch.push(this.queue[this.queueIndex++]);
                }
                if (batch.length > 0) {
                    this.pendingRequests++;
                    this.executeForBatch(batch);
                }
            };
            BulkServiceAction.prototype.getAllHadErrorsFormat = function () {
                return Q.text('Site.BulkServiceAction.AllHadErrorsFormat');
            };
            BulkServiceAction.prototype.showAllHadErrors = function () {
                Q.notifyError(Q.format(this.getAllHadErrorsFormat(), this.errorCount));
            };
            BulkServiceAction.prototype.getSomeHadErrorsFormat = function () {
                return Q.text('Site.BulkServiceAction.SomeHadErrorsFormat');
            };
            BulkServiceAction.prototype.showSomeHadErrors = function () {
                Q.notifyWarning(Q.format(this.getSomeHadErrorsFormat(), this.successCount, this.errorCount));
            };
            BulkServiceAction.prototype.getAllSuccessFormat = function () {
                return Q.text('Site.BulkServiceAction.AllSuccessFormat');
            };
            BulkServiceAction.prototype.showAllSuccess = function () {
                Q.notifySuccess(Q.format(this.getAllSuccessFormat(), this.successCount));
            };
            BulkServiceAction.prototype.showResults = function () {
                if (this.errorCount === 0 && this.successCount === 0) {
                    this.nothingToProcess();
                    return;
                }
                if (this.errorCount > 0 && this.successCount === 0) {
                    this.showAllHadErrors();
                    return;
                }
                if (this.errorCount > 0) {
                    this.showSomeHadErrors();
                    return;
                }
                this.showAllSuccess();
            };
            BulkServiceAction.prototype.execute = function (keys) {
                var _this = this;
                this.keys = keys;
                if (this.keys.length === 0) {
                    this.nothingToProcess();
                    return;
                }
                this.confirm(this.keys.length, function () { return _this.startParallelExecution(); });
            };
            BulkServiceAction.prototype.get_successCount = function () {
                return this.successCount;
            };
            BulkServiceAction.prototype.set_successCount = function (value) {
                this.successCount = value;
            };
            BulkServiceAction.prototype.get_errorCount = function () {
                return this.errorCount;
            };
            BulkServiceAction.prototype.set_errorCount = function (value) {
                this.errorCount = value;
            };
            return BulkServiceAction;
        }());
        Common.BulkServiceAction = BulkServiceAction;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var DialogUtils;
    (function (DialogUtils) {
        function pendingChangesConfirmation(element, hasPendingChanges) {
            element.bind('dialogbeforeclose', function (e) {
                if (!Serenity.WX.hasOriginalEvent(e) || !hasPendingChanges()) {
                    return;
                }
                e.preventDefault();
                Q.confirm('You have pending changes. Save them?', function () { return element.find('div.save-and-close-button').click(); }, {
                    onNo: function () {
                        element.dialog().dialog('close');
                    }
                });
            });
        }
        DialogUtils.pendingChangesConfirmation = pendingChangesConfirmation;
    })(DialogUtils = VistaLOAN.DialogUtils || (VistaLOAN.DialogUtils = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var ExcelExportHelper;
        (function (ExcelExportHelper) {
            function createToolButton(options) {
                return {
                    hint: Q.coalesce(options.title, 'Excel'),
                    title: Q.coalesce(options.hint, ''),
                    cssClass: 'export-xlsx-button',
                    onClick: function () {
                        if (!options.onViewSubmit()) {
                            return;
                        }
                        var grid = options.grid;
                        var request = Q.deepClone(grid.getView().params);
                        request.Take = 0;
                        request.Skip = 0;
                        var sortBy = grid.getView().sortBy;
                        if (sortBy) {
                            request.Sort = sortBy;
                        }
                        request.IncludeColumns = [];
                        var columns = grid.getGrid().getColumns();
                        for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
                            var column = columns_2[_i];
                            request.IncludeColumns.push(column.id || column.field);
                        }
                        Q.postToService({ service: options.service, request: request, target: '_blank' });
                    },
                    separator: options.separator
                };
            }
            ExcelExportHelper.createToolButton = createToolButton;
        })(ExcelExportHelper = Common.ExcelExportHelper || (Common.ExcelExportHelper = {}));
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var LanguageList;
    (function (LanguageList) {
        function getValue() {
            var result = [];
            for (var _i = 0, _a = VistaLOAN.Administration.LanguageRow.getLookup().items; _i < _a.length; _i++) {
                var k = _a[_i];
                if (k.LanguageId !== 'en') {
                    result.push([k.Id.toString(), k.LanguageName]);
                }
            }
            return result;
        }
        LanguageList.getValue = getValue;
    })(LanguageList = VistaLOAN.LanguageList || (VistaLOAN.LanguageList = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var ReportHelper;
        (function (ReportHelper) {
            function createToolButton(options) {
                return {
                    title: Q.coalesce(options.title, 'Report'),
                    cssClass: Q.coalesce(options.cssClass, 'print-button'),
                    icon: options.icon,
                    onClick: function () {
                        Q.postToUrl({
                            url: '~/Report/' + (options.download ? 'Download' : 'Render'),
                            params: {
                                key: options.reportKey,
                                ext: Q.coalesce(options.extension, 'pdf'),
                                opt: (options.getParams == null ? '' : $.toJSON(options.getParams()))
                            },
                            target: Q.coalesce(options.target, '_blank')
                        });
                    }
                };
            }
            ReportHelper.createToolButton = createToolButton;
        })(ReportHelper = Common.ReportHelper || (Common.ReportHelper = {}));
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var LanguageSelection = (function (_super) {
            __extends(LanguageSelection, _super);
            function LanguageSelection(select, currentLanguage) {
                var _this = _super.call(this, select) || this;
                currentLanguage = Q.coalesce(currentLanguage, 'en');
                _this.change(function (e) {
                    $.cookie('LanguagePreference', select.val(), {
                        path: Q.Config.applicationPath,
                        expires: 365
                    });
                    window.location.reload(true);
                });
                Q.getLookupAsync('Administration.Language').then(function (x) {
                    if (!Q.any(x.items, function (z) { return z.LanguageId === currentLanguage; })) {
                        var idx = currentLanguage.lastIndexOf('-');
                        if (idx >= 0) {
                            currentLanguage = currentLanguage.substr(0, idx);
                            if (!Q.any(x.items, function (y) { return y.LanguageId === currentLanguage; })) {
                                currentLanguage = 'en';
                            }
                        }
                        else {
                            currentLanguage = 'en';
                        }
                    }
                    for (var _i = 0, _a = x.items; _i < _a.length; _i++) {
                        var l = _a[_i];
                        Q.addOption(select, l.LanguageId, l.LanguageName);
                    }
                    select.val(currentLanguage);
                });
                return _this;
            }
            return LanguageSelection;
        }(Serenity.Widget));
        Common.LanguageSelection = LanguageSelection;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var SidebarSearch = (function (_super) {
            __extends(SidebarSearch, _super);
            function SidebarSearch(input, menuUL) {
                var _this = _super.call(this, input) || this;
                new Serenity.QuickSearchInput(input, {
                    onSearch: function (field, text, success) {
                        _this.updateMatchFlags(text);
                        success(true);
                    }
                });
                _this.menuUL = menuUL;
                return _this;
            }
            SidebarSearch.prototype.updateMatchFlags = function (text) {
                var liList = this.menuUL.find('li').removeClass('non-match');
                text = Q.trimToNull(text);
                if (text == null) {
                    liList.show();
                    liList.removeClass('expanded');
                    return;
                }
                var parts = text.replace(',', ' ').split(' ').filter(function (x) { return !Q.isTrimmedEmpty(x); });
                for (var i = 0; i < parts.length; i++) {
                    parts[i] = Q.trimToNull(Select2.util.stripDiacritics(parts[i]).toUpperCase());
                }
                var items = liList;
                items.each(function (idx, e) {
                    var x = $(e);
                    var title = Select2.util.stripDiacritics(Q.coalesce(x.text(), '').toUpperCase());
                    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                        var p = parts_1[_i];
                        if (p != null && !(title.indexOf(p) !== -1)) {
                            x.addClass('non-match');
                            break;
                        }
                    }
                });
                var matchingItems = items.not('.non-match');
                var visibles = matchingItems.parents('li').add(matchingItems);
                var nonVisibles = liList.not(visibles);
                nonVisibles.hide().addClass('non-match');
                visibles.show();
                liList.addClass('expanded');
            };
            return SidebarSearch;
        }(Serenity.Widget));
        Common.SidebarSearch = SidebarSearch;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var ThemeSelection = (function (_super) {
            __extends(ThemeSelection, _super);
            function ThemeSelection(select) {
                var _this = _super.call(this, select) || this;
                _this.change(function (e) {
                    $.cookie('ThemePreference', select.val(), {
                        path: Q.Config.applicationPath,
                        expires: 365
                    });
                    $('body').removeClass('skin-' + _this.getCurrentTheme());
                    $('body').addClass('skin-' + select.val());
                });
                Q.addOption(select, 'blue', Q.text('Site.Layout.ThemeBlue'));
                Q.addOption(select, 'blue-light', Q.text('Site.Layout.ThemeBlueLight'));
                Q.addOption(select, 'purple', Q.text('Site.Layout.ThemePurple'));
                Q.addOption(select, 'purple-light', Q.text('Site.Layout.ThemePurpleLight'));
                Q.addOption(select, 'red', Q.text('Site.Layout.ThemeRed'));
                Q.addOption(select, 'red-light', Q.text('Site.Layout.ThemeRedLight'));
                Q.addOption(select, 'green', Q.text('Site.Layout.ThemeGreen'));
                Q.addOption(select, 'green-light', Q.text('Site.Layout.ThemeGreenLight'));
                Q.addOption(select, 'yellow', Q.text('Site.Layout.ThemeYellow'));
                Q.addOption(select, 'yellow-light', Q.text('Site.Layout.ThemeYellowLight'));
                Q.addOption(select, 'black', Q.text('Site.Layout.ThemeBlack'));
                Q.addOption(select, 'black-light', Q.text('Site.Layout.ThemeBlackLight'));
                select.val(_this.getCurrentTheme());
                return _this;
            }
            ThemeSelection.prototype.getCurrentTheme = function () {
                var skinClass = Q.first(($('body').attr('class') || '').split(' '), function (x) { return Q.startsWith(x, 'skin-'); });
                if (skinClass) {
                    return skinClass.substr(5);
                }
                return 'blue';
            };
            return ThemeSelection;
        }(Serenity.Widget));
        Common.ThemeSelection = ThemeSelection;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var PdfExportHelper;
        (function (PdfExportHelper) {
            // Use http://dopiaza.org/tools/datauri or similar service to convert an image into image data
            var headerImgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAYAAADvCdDvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAK4pJREFUeNrkfQdgVeXZ/++MO3Nzs0MGBCFhDyEKIo6irSI4arWtttRBW+3Qz1qt289VcM9WcWuxTqx1UTayh0xBwg4BAtnz5u57znn/z/uec0MWkITQfvZ/4Ca5557xnmf+nvG+V2KM4buyle2YOebQvN+tsyfmQnb3gmxzwuFMQNR/CHogALWhGDlXfPGD5P6TFuM7uqnfqcFGQufIehh5F70Fb87pUKADshPMCKOp+gA2ffA92EtnT/guM0T+d9/w4LdvZWxfdMcP92x6b0hXzquvXGuv3Pby9XLKUHgyx0CRXZBkN0AKLtHfiZnDkFHwAwT2rJgSbipL7cq1K0sWD9g897ZfHt76wvj/bzSk5sDSfoe/fe26yKENtxgNe1JYUv4BLbzv1iHj//ezzpzvUNMGhSu2DvEMvwE2uxMSNDAmQZIk+q1DlhRkDrgE+3bO6uer2HKaMzFn4fGuGfWVyId3fnx9xcZXHpF8h3MP7fXE6nd/8RpLKvzUm3HKkr6jbjL+6xhyYNvMPN+ehXf4Sz/7jT0s29wFF0AadSPCW9/pG/h62ielqveBPmP/ML3teXXl3+TWb57RW3VlZ4c1R4bu33RJRIbaZ9DFxAyuGBJXDetoQ7wSMs6ApDhRt+m5h8vK1w2UtbpKSfcfyhh6fXlW7jkHWl6/onhldrDorRlVRW9fLmUPQdrpLyJSvcrWVDL7Jhz46iZ7/4sXlju807OHXLPs38kQ6WQ59eqDSxMqdn50U/TAV3dLoboUZ9+zkT1yKrynnA9F8qCpZhVKFtyNQMVKuPMvezlr2B9eCvurUlnd2pHRcNPompLFP5Qi9ck21VAlyUEMUJCQdy4KJr0KxZ5CHNFpn0x7OXNigkGapqFk3u/gK50HjfyKSo8WYbquqSkNqemj1yVmDJifmP+jLaG6bUkNRe/c2VSxaXzSsKtRMP4uOLxDoLMIQrUbcHjDawju/Rc0PcjU3pe+P3Tyy7c4XKl132mGlG1+deiBpbcXeZPTkHvJv5CYMVwQTyPiKaSYEiegEUXJmidQvv4ZuI1IJAanLWLzyGpCNvIKzoOaVgDmzYeL3rsdScSIdEg20gpm0H+ZzBUzX9y5G3ZoCmlKTEIsVg8tWomIvxFGQymijRtRWboGgerDsGn1TDOCkjt7HAomPIrkrLOFJ2U0MomRwZBMfQv69qBi8f+gcd8iFFzzzbjkzOFff6cZwgxN2j3nhr83HF4wZeT1u+F0JAB6DLosQTEIH8mGsPtCm4rfRVPxXGFyEnJHwpk0CnZHsnkd/mLmb85OicwU1wziA3TJRCX8M5l+aOI9fycJs8Y3xfqtawH4CRYHDq9AJBpFr2FXwO7uS1pB/oeuq8BBp9H1xfk2RMMhbJ51PjwI7ii4/MvTnd684Hfah0iyylyp/ZfX76ieEiazZOt7ITGACCaZVDRNDTc7UWTm/xzp+T8iYrjoI7mZEZL1gmQgpvmJCX4YegNRPkaMUYkB5FSYJkwWZwGTielqAmTZQzfwcrY1j0eh/YnpI5FEr/hm0LmycEg2urZBL5m0QxKuqfHQfLDytUg557FP/l3MOOlOPWXAFQvqN75R6T+wspe370ThhCWd/5JMR8z4T8U0P0qCYIJGr1jwAMK1+xD2lSBQXwTmq0SIv8Jl5BSqoYWDltYINhC/mNAFm9MFxZlGvzPh9KRDSekPR9ogODw5cCcPgzsxT3CYH20YEVM4SBt0YfpIY5kirmgQ88u3vQ1nYv8yV58LX/6vQVnVh1cyKcEbLNk6G5lj7xEE47ZGZzEYRADy11AV0hWFoalhJxrKtiBEUlm9ZxG0pv3EnQD5DIV8SG+o3izYkvpAdY6G25VBZLQJzeH/QCZQMnTEQj6EY4eghQ6jsWw/wrsXkGY10VPaCTf3Q1bB+Ug6ZTwSMsciMS1XaCTnkEKmlCQCkqWSTXV7ULt7GTIyUsnEfZWd2qew7DuNskp3LZX8FUuv9u957Wm9oSbHOeT3GHrhdDIbLuGEda4VXEq1OvjK1qGx5BPU7viCor8qLuewZQyFM2cUtJSRSO9biOS0flBVivXIFKmSdMS3tAC9cV+ic60jtGTEIgjU7UBNyQoYjUXQajYgVLlNqKDhTkTqwIlIGXwdksip253JzcZN5xoaaMCuVY8gvOstJOihRs+4p29PKbjs7eT0vsZ3jiGlu+ZkNpUsu6u26NnbnCTRuePuQtbwa4lIdlIE7swpIIs0IlA6H4e3vIe64uXEqAYkphYiJXcCMoacBUfWWbCp6c0umfsZk+Sq6czpvUZBoUKoSKHxS9yjS2bigRHD4gySWozL0GsRqPka5duXIXhoDWJVRQhFyS/lnop8iotS+18CuyfL9FscxUl+NB5cg/1rHiGhWYvMgdd8kF144xNJ2eO3fGcYUr3zvavLlj/5SCBYMSDnzNuRceovkeBMF1LHSavrNSjf+BaqvnmTEM9uaI5M9Bk1FWn5k8jhnkomLbk9WhP/JMvBx109a6UlMpPiTyOcMqxj4wGk1Hwt86Vp9RRv7CaztBCHimZC9e2F3VuAXgMmI/P0X5FpHGnpikKMDOHQlndRuvxuyDa1Pm/s7Q/2GXPnX//jDAkFGuTqiu1D8/LHb+vo831rnr21ftWfnoo5ktX+k2cQcrqaHilMxHIKOFpW/Dnq1jyN2OGVgDcZ6aNuRtqAK+BNHw3TxWsWKlJaM4RrgCS1eo84sJW69rAai4lzJEJVinVuyHcQdfs/ROX6lxGs3A9Heh7Sz3gYeSOuE/fVWBQ22Y7G8vUoXvIb6OVbmLfw1mme3LMe6j3wilYmrOzbZz0x25BBmX3HbnO50iInlSHFyx94pHzrc3/ypo1f3Ou0m5/oNfDSlfHPtv3jR08Gi+fegT7nIv/CJ5CaNppU3pTNSLgSB5bej8pv3yZkoyLz1Knoc/otpBFDhAzKTDsiyVJbQ3OUGCfOFKlrHBEAwNIumW7OzZsmm9F+uGEfDm9/H+XrXoEUPYyEQRei4KxHSGDOEDrKxxXyl6Hkq1tRt/1jpAyZ9PmgSbN+RUIkl3z95IRg3beT9dqis8P15X2T+p+7Mn/ia79wuHPKepwhjVWbpLKNb/1v0+6/Pezp/wMEKjcTDG30e/pf9A/3KZOXGOVLzq3Y/vdfZYycityzHxUISOOOlaBo3e5/oGb9EyRdG5FScCUyC29ASr/vEwEUkzxkamSp46SzYRAMleUOtaTbwar1U7KMVzzo5JG/JNvE+6aqDSjfPAMVW96HzZuKXqffhFNG3wKmeAhukIBFGlC6/nHUrv8LXKkDt4bCjRlhrS6bP3cSRf+qLRU1G19E0qDLFuZ9/5VLXYlZXdMU/rDHeu1b/cAv1/wZbNvsnzCD+VksUMQOLLmZrf1rBls7HWzNk2C7lv6W6SzENGZuoVAt277wD2zl4zb29TOprHTb8yzGgnQ+E8do4qfODINeYm/7rampiU2bNo3t2bOHHW8j5olX1zbz3ua5YRYzNBYxIrSXfxJmVbtnsdVv9GNfPcKffSoL+Q6Js6LWeMu3vca2fnAW27HwBlZ34H0WC1fQeTFxzZI1D7KVRJviZQ8+EtNi6vFo3PJ1zA+r9y/43tfPOMOb3juLBfyVdDvGItbj1FStYVu+vJHtXfMC7dcYpwd/mEiwnG377Cq26FGwdW8WsooDy80H0SMsooeJeuagxXMJIvKz2hNz0aJFQnanT5/OTs5mNN83zhimkZehMYa0sNjfWFfCtv7zJ2wVEXfDO6NYfdUm8wwjIEYd1aP8yc1r6CRmOgkd7YvQvqJ5N7N1j4NVbnnjhh5hSMBXmrlp5phtG17OY/76jXQjnSQozDSSJPpBkqJbQyG3Z0RNqW7cyzbOupStoIFs++e1LObbaUkc/aSBco3olOzSvYqLi9mCBQvYhg0biE4aO9mbcUTdzBFbO2JaDds+/1dsxdMkYC8NZTUH14pjY0QLbhUMEjBm8N8BnrQkpkRMKxCqZNvfHMbW/zWrvmL/3HM7y5CjVgzLt7z3h2DZ+mF5582AO7lQZFRtFM0qPCGoGLDx4hAzs0iqZENd+TLs+HAiwntmI/vs6Rhw6UwgcRB5ihg5booP5M6jokgkgjfffBMffvghXn31VdTU1Jz8CLnVH5a3IQygKmkouPA19LvoA/ijB1H82aWo2TWHntkBydBEOsjgf9NLkZxQZEWEvbIzE70v+wiSLTW5csM79+7a9KF8Qj4kWLt38MoXPY3bFtwppJxznrW00yTtmhEVJqyxbjdb8foAtpZ8TenqB1hY7NdJi0iKjLh56tg0dbRVVlYyu90eDxvYpk2bui/5LfxL5/yM6ekMYYZNsxYTxpqx6uJP2frnU9nKv6azyj2LxF7Tb2iWL+S2gPRDN4SfjEYqt5Sufumc6m8/yz9hDXGl5u/MGXDNrODWNxFo2kQSTiiEGc35Ci75EmkG85di35fXA7V7kEWQN3vcQ1ANG+yEslTdxhMRBC+1tnJ4zM3v92Ps2LEYM2YMxo0bRwGl3n3Jl6RmhNYZiM8EQpQEZOcJR/7AssGJFUV6/8vRa+KrCEd8KJ43Fb6DXxIBVZEl5scZ8eCVlxi0SLj88IE7ep/5+xXpw39Y3NnxKg899NDRB+dICtZufunaKBEkpf8PzewoM8wcK5muiP8wds39HfyHvkLv86eh95i7BNbn6QzIilVAsmILqWWV4thbXV2dYMLQoUMxePBgjB49Gmlpad1iSDAYxPPPPy9+FxQUdIKBaBEPHfkt0fMaROyk9GGwJ2bCv2sWGg+tRmL+ZDicaUJADZ4pCDfiQNHfKJAu+7R3/gWPdx2bH0N9dENTtn3+ozlrn0tnFQfXmw7XCAvzE401sh1f/IKtIFi4ff51pLhkkmKkwEZMKPGJbHGEFX/Nnj2729faunUrs9lsbPLkyQIsnKDLt0wvY4c2P8pWPAa28ZNLWSRSSebbINporLpmB1v5pIt9+8H3FncFXR3XZIlwTVL07IE//8RoqMEBimKPpCxkVHwzA00b34VnwHnIP/evorDEFLP7QznB/BjFIK1bgOrruxcI0jgGDRqEiooKvPvuuycQXEqtwktCVsgYdSfSxt6D0O4vsXfdNNEFQx8gNXUgWYr/QWDf8rNr9sy9skf7siLBitTKor9fryRmoP+QycJKGpIdDRX7UbHuNbDMHPQnvyE73aJIxCTVLLPixLLUsVjsmO+7sj388MO46qqrcN111wnGnDgcs5KXhDL7j78F7pwRqFv5Jsp3fglJsQlhzRj7R8gZg+yHVtzxuL9sY3qPMaR66ztTK3d+cXbahNuQlvcDkQCMabXYu+wXCEUqkTfpbXhTxxAKls2KG3jVzSaKPSeycdh7rPed3TgDnnrqKZAJxJdffoldu3b1AEAmWyCrFAIw8h1Z6EOQWPYk4eCS36GpeoMQRrs7C/0veh3+uqKC+uJPHuwWQ/Yuv/Oib14dfHfzw5QustftmHWN55TB6Dvqd0I7ZNhRtvF16HtWodfIq9Cr34WiIMTVVe+BXFPLPFZPmCxFUXDffffhwQcfFJrSu3fvHotaGI+tQMgraxx6nX4rtLoqVG79mD7hycoYEvuMgzfnLNRuePHXgfr9g7rMEK3s67tjoYrH4u8DlRt+6a/bdWpO4Z+hykniUH/dTlRt/gu05GRkD/+jAL+ygLWK1ZygxLsSTuhxA4FAO6TUnS0UCgkI7fP5xCsajXYa/nYmVcmZAhZG3qk3wXXKORQwvoKmmo30CcF+gsOZYx9AwIg4yzc/f7em+dVOM6Ry37/GRqu3FSYNnWyaqvKvMkJb3/2f5NwzkDHwcjCuBiQNJaueg1ZTjr7j7oK31wizDCuZafOe0w8I4h2LQZ3d9u3bh6effhrPPfccnnnmGRDi6rnIXjy32ccluRLQ95x7QSALxauegmaY5a2M/AlIzv8hqta9cH35nllndpohjfvnnh8O1CV6en/flKyqb671lW8fmjL4p+CVHEaCH6gthr/kIyT2HoOMob8l3dDJkUtWUNSzG5fsntCQuNmKb3EN6ZnNSq+Qz9TJSqTnTURW/hQ07JpDMfIc8zNiWO5pt0O2J0Kr2vajTjGkvmavJAXqRvIqaEKq2bOkbZ3zE5acA3f/SyCMkaSjdseHiIUakXbGH6C6k4kRUbNj8CQwpKGhoVUBqq3GdHZrbGxsFeXHGSL1iL+TrVYmHXZNFddMHHYlQf4Ayjc9DUkPiVZWb59CuHO/B/++BZMioQr7cduA6srXOP3B/RPd/c+HzZOL6v3LLqqvWTcyd/RvkejNEZF3oGEvyre8AW/2KGT0u0C0XQp/IUuiIaCnZzW0derdZUhbU1ddXd2To7Rsl5mR4LYrNY8cOQEdf+lKVB5ejuy8CwT9skZciZI5vx1cUzz/N8zed27MV9ZL0coH+bbN6OU59ff7+oy6aZZicwqVU7P7jE8pW35vqmKEsW1mIVxNvtlNbpvSb/AUq8Ito2nvl4C/DNkT/kxQL5PUVLM6z6Uekrb2tr/lFg6HW1UQO7u1NVE8JdNzm3wEv1hWUZU96FV4I5n2eahb/yIy+lwossCpA69C6cZXsf/L6/+iuLwhVZEdATlVdmphBDdMM5Kyz9ye0nv8t+Ia/qaGrFFX/QuR+j0INe5GqGKVkpM0AkkZ+SKZqIUjOPjtPwBPClL6nt9CXVs1e/bo1hYNcdPDO9vtdnuXrtM2oOSMPZkbH29anzEoyx2C2KEtCPkr4ErMhqq6kD3qOvhScpGQcZrLldgPtl5DULV9CRqW/VE2AmXcV5gMSckasNVm84q+V1MRuUPlva4mhPVXriaH9A28Ay4mk9bbZIMk4WRNvuIOvLi4uJ2T707Gt21AWV5efnJrKsQQmyMXKSN/iYo5dyFEZstDwIgZUeSM+JV4cdo2ty+NSkLN1j8TYz48K23Qj98Tok7M0ESvkiWNMpwitJGsrpGmg/Mp+IsiteBHZqq5C2n07vqPtiiLS3bbfZ3Z4oWtuFnljO5ZpNU+raJzX9L7fBiE7qr3zRFWxpDMiI0zw7A6+WU60pOQB3facOjB2oJ2gaFMDDEEU+I1Dwr5oo2o3DsbblK1zH4TLUd2cmftckfc1rRw1BVHXl01IS23kpKSbsc0nbofn85At/QkDYTzlO8R7f6FcGMpRQ42yLwFmU8y4hldg8+S4W5Yhi15EHyNe0ZEAqW9WzFEEvM1DBPGWgoQrN6FWMMOuDLOgOzJ7FKR6UT8B/cXbTWkO4RsmzXufl6MtfjNjqXepA0axT4epPa7DK5ILSK124XWMNmcYCSLtldJ9KNxI5x8CqHWSFXW2gWXXtGCIcwsIFupAOgmpPPXbINB40/MGmd1+uk42RtnSFvYy/d1x2S1RYDcD3XEpONvWgt2HCOTLdusFBJDatYIUX301a7lDkAYF8lCZmJeDJNEcB2s2gEHN9NNoRYmi/noI5XUKAaD75F1cfNo/V4YKpB0yhir9q+ekMnorCNuex7XmMOHD3f5PhydtfVPbbWvc88hm7GX4IhyVC0RgMeat2JP6gfV7kXjwQ0k36TdfGKMyAVLIoLnGnNwzf2oWPEgkof+6r3v/WT1280M2bLoXnMijWQn5+4gW2cTfbDRht2we7PgSh0qypddNVcta9mdZU5Hx4oesWMEdfw+bbWqoziEH9Od2gov30pQrSnYRzdbZoelqQWyIwGu5L4I1G4i5Fgh2lZZc5ggo2TVA6hY8jjShv9kXt/znrzZ5UpramaIb8tr2L54CvSGCrptkE6mQRshaI0lULyDQFGkFZF3zWTNmzcPjz32mCBCZwNI7rw7QkK1tbXt9vH6xscff4zbb78ds2bNavd5W3DAx9Gd4HDv3j344P2P8Kfbb8KevWuPCvl5i1RMi+KFF57H3t0HYUsdyB0xYsJMmnNi9GgdStY8hLpVTyG78MZ38i94+VqbM6kZsQgblDP+rherlk2/udjwYuikxxBFAphei1jwEGwpFwknxStkQh87sa1atUpkWT/77DOMHDkSd9xxR7d9SJyR3JRxE/TNN99g/fr1WLp0KZYvX97sE+6///7jMoT7kDhaO16/MEdkPDs8f/58fPDBR3RevdCMq6+e0KG55NfyNflw0+9/h3ffnYXNRevhTeiLmpiBaIib21FCN6qK/4Gy5Q8jZ+ztb/Y/7+lft8tl8R9pfS9+ucH+7I1atIlCYa+INoLkRCNRPxKd6cIZQeJOx3UUNTUfbNu2bZg5cyZeeumlZifsdru7JI28ftHSZPFr844TXvXj1z548GA7hvHjHQ5Hu3F1pGnHSjByP8WZ/cUXX+DTTz9tA7UdcDliohGuI7PMx33rrX8kZrwPh9ND0bkNiUnZAu5KwfpmY6VHddgp9jMc+S92mFzkP+oPb1A0kn6nLUns4goZC/gRjQQJOHhM+0sYOh4sth3QoUOH8MYbb5CqvtAqU9vVaQPc4bY1KTx/xZOLXOva3vdYvokTviPz1DJRyc+trKzEpk2bMGfOHGH+qqqq2oMncsIGO/ozlJdXYOrU64U2iUnGskV+JdOcnBrxHaGaLZ3jAjkUrko8KkNq932crLGwanP2OkKcoE/MTHIlxyXc2SJ/dSQJyGvWXJr4gx0N+RzLoXMGLlu2DLNnz8a3336LPXv2tGImZ1JHyOh4IKElomp5LL8fl2beosqZUFRUJJjQ9notx9DsyKWW9zf7HRYuXIibb74Zu3fvFgnX5mZCur87JVMkHmOxI7GPzZ0KRdfkvv3PTDsqQ3TZJsCc2gI98NlPfDkLMYM1nnuxnBmvcT/77LNCK+KdHEfrDuT72xaJOBG4f+EM2LBhA0pLS48ZP3Q3BdPWh/DrzpgxAy+++CIOHDjQThNbatzRGM6OZEmwbt06TJkyRSBAs4IIkRoBM6MN2UVxiczHEm7h+PlHDmixgHxUhtjkVCPCBaKl0zb48hXcANqbA3Se+HudmPDKyy9j586dnTId/HPONO6AFyxYIBwlZ0jbQK87EPlYGiOLyFhqN0burLsaM5nnm9ywWcI1d+483HDDr5vhuLh+XIUkw6zb8VUiuCYZLfwOfRCToxxK60dlSCy81cbLDZAcR7TB8Ih0Chk0k7N06KPT7sH0x562Bmmq5/GIx7WgsLCwXU9UvOe21dyIbuXzzGu4XC6Bojjj165dizVr1mD//v2d1rZj39+UeFVVEQpH8NcXX8D99z0g/JFJBxZPZqG5YZb+VkV+kFsge7Oxl8VaLzESGEeHIb9asfPDsxy23vcbxm46PnAk4nTIwibq4SNIpdFXaxHBbqZaOtEQx2FpHJq2tcs9NQOYX5fHPJ9//jlWr17dIWw+oaSh1UbN0dMzT7+CWZ8sOSKUrXyLmHBj+hHa6Q/WCTLJNrUFcAlx1MoMJneYnFN9hz6/jVXt/oEi2wgv1woic5hrT0gQ0Wm48YipM5qJ2b0U9slYpCB+zcWLF5+0e/IF0gQgqGvA/LkrWuw3OvQw4TDPVSkIhyLcesGuKM08i0RJOCWbsWPdh4Gz8i9ozxBn9qT3avct+6EadSlMq7aicXLfTiccdjukWF2zumVn98agwYOh8pZJGPhPL6B5xO80d3ieFIbw+hCvaTjIIycnOtAYDIliVPsClcJbBuF0uOAmCxNrrBJWTHF6jlyLAm4ScT2tb2GHrTRqVv7lJTYl2li85P5UOVKDKKm7KusUBKVAdaQS/C0VGsELdnfdex/uIdvJcXnreMT4T7GkLfY5CibqsfJZi/RRR9dWrDEYoiC1fft2qHwGhztT7OFnhIlJsiE15vY/s8PypWp3epvCZUVexV8L5omRRsQIStih2RIh80izaT+BBZ7jd1Hg9CE5zWUUrVrzJuJSIn13lpo9Eb6zuDqyjue6CNhL/2wUpd/yx9vgjFQhQDjJ7ukt+tckcuYaWZxg1Je6d/kt/7R5+n/qyrvs8/zhP97XEmVV1RR9qmYUXoO0/CuIFx4B28iFwZ6Sg/CepWCxBkiqG/3yMxHTh1sTWtDMECbJ/z3EZx2ZLNaxYrbjG+9yJgujqHC4Ger9FJ94s+DgxT0xYcmGvNN+Q6avl1K7/ZVztMNF5/jLN/2pcdtHS7yDrn2mYPSlmzlDonmXvAxPcl+CZw401O6EymMQ0gibkosqckJlexchOWcCRgzoi8JhBc0jkqyBnozuxf9TPJKMoxrLdniMycLnNNTsFv1sidmFiDaVQw/UCsQl8Q6UEVOQkDMGvrL1CB9amhMsmz3FPvQc3ue6WazksPZZhU8SEgRm1pqDsrXGi40sWEiYRpWwsyaSZW0HJf0XEV+XOmJI5yyzwsxjYuZCFXBoZj0rRCBIEQt1CuPDV/qCxtuCFTdkjVdomeEZfduVw77/9GcCIPc97zGBGjhK4IV63kAt6zYKKnmdXRYRpykkTKCNDuBFj1kLqYeO6gmLxZpNVvtHZEfxNZyOOs8S8GnjHK0SwQyRlI2J1fPMyaS6udZQ/FHUZC2p/xXn8ayUYIg9bbwgettnZmY9srkSbK4PojS/k46BsvgUBcnSOl22HKGYNCq1OY5Zgzcfmq+nJdY/7JBYslXoMaySaFtzyY5obDMWlnBkkacOs1It3pljaf8sR9CcdEz8Jh1Jf7RYQopPlpWamcobIWTR98tpw+fwR42YPRqumeL0ZNSJc/d+ctERCWhBbU4YXVZETVkR5oyJIKmtqWId+BCuXZxYMjOXcjWsilnr6W4WRIw33onjzSaA5gFZzIqvLqSLjg1DzMHQFcls+G5BY27BebrC4OaVi4/o0JespWZaJG2lOGqKU+roWtfMJKkFkDkGGpOsRgdmCatqyNBkSVgXnqPiDQ66Yi5vK4RMI2Q2cIoy+rI3aiVzkYBNM2VZuda8mdRahoTJ4tfVYfCVCwy9FcJqxnvtxsYsyWIidcD4NGkWbwJoSUMr/2OlVaRITDjRI90dUivLKGjjckF2eAQjBfNayC1fMYKPUw6HIUVjZHqZOM+IO+aWjyi1Aa9SKy61NhdSPDNidNKkWidwASIYLKZVW1PD+QoQuhatJQsyg2g0jEboVd1Zc53evA8EQ7TS8ouMcHiuRPGHuHcz1azcE2dKejpsCfZu2WWttFKs2Qur0N9qGQt2JJ6R7UTonJTjXi+8aBUCK5YIU2BYlzDNnmlQvTk5MM47Dwqhwv8TQKG6CYbfR05cMheF9HigZiS9SR91XMItn/n6o7Hpj8LuTRVowGaIL4IQkhrjnOVPnJIA94WXwHPn7XD16fxcPb2mBmUTzoGtvo746kRM1UiFuRmJmdojkfRwNY5GIBcWIm3hfAjBOFYq41+fwv38M1bdBuDlH7slm4p4r8CXnAx21VVIevJxOL0dFucQqa9H2bQnYY/6RZe/uUCg1aojjAkT5kW07YR9cF1wIdJ++tMuMSNcUYma70+EVH4YzGaDTFpr5OYic9ni8+xpaePokLVtGSI5JGV0ZjgCu+4j22uAaIMwQuJDB3fpbhcMXy20F59H1aF9yPlwFmxtathHtb9k0NObmmD3NYGpEQEeAlHz2vGZJXEPxGrMyt3xMJTsspszAHgClJirkkmMOulqQTJRkTBkpw1J9Dv06gxUpSej97TpHfaJSDSmlOefg8uItIPvJmtkwZ6IxSaDzCEjhnQF49XN/DuStm+B2+EiqEv+VycB316E8NIV/e1XXj6xDUOS1LgZF57BRn9oOurGj0XN2WOREHMgsWgrElcugFNKgJZgg+OrhTB2lwAjBnc67aArsmi4k+QYoq4E+K69AXY+QNJGu2F9y0FUgtK3DxKUzjfjMV7jjIQQOuN0+P82A1JpOSIPPYbspctEtc5pI7nfsAE8xrKWrms9NLLtoVPyYATqEVETYWcRseQfXxPYRRphDwf5GkjgUYTir4emdLFRkMvMV/PBs+/8XIWn3omOKjE3+NEH0K647GxVfAkKgpZynK2aztKI0sl2PuVfj2pIuXgicu+9XzAptH8P/IWnQ+GTZshmqxwAxbrWn8VtvUDg3CG63ch77oWeiRlkwvNSFHpiArL6DoFMr/CD5BO/Xg1XVDdLNg11FHwRGLHbOsisZiKNfJGk6/Dw2IHbd1VGOBxFiDRB3boZnJpy1IdIrxyoV/y4S9oR3PgN2Pr1sKsKAnY7oukFsFeWwc5N98K5iBQVRdXhI+JZX94AsMFkuSRHFNMMC/shFR9EcH0RPZAfwUUL4AjxyogNEX8T/D/+OZKHFnRRTuI40w41FkLkldcJedjJP+li3S2+GL4RJrx07tlwjhza+SDS4Mt4yGJVay3kg0YmKPrGR7DHwnQrN0m1hCj5D52I2pFsS4oCe05u+6LabXfBvqUIhssBJdCEqvwCJH/yGRwjhnXpqaMvPI+E+kbodidCub0QvvduSL//PbkGBm9DE7SPPxuG4SPOoUPjRZZKsxVm2qO8+5RFPAnM7/Ww6uQUVpyWyUpTk5nPrjDN6WCaamcVP/s5CzcFu7Rsi1ZVxZqys5nmcDEtIYlFE53MJ9lZE5GyXrIxH4UnDTawRrq//97/7dQ1Y/fcyyEB091eRkRjTRlprPq08ezgKf1Yk83Dwp5EFk5w8bZxVnXfg51eCoevi1d1zz3Mb1NZxJ3IAg6FVSelsfp167u8XE3Y72cNA/qzmM1J41CY7yc/Zv7GBlY3cjDTFBuLOOzM17s3i9TWVtHh97VafIZCeTNWYjaBKBKCIfSp9SO5roHQjw4/2fgo2SrlQDGCsz/tRpXBECkFEVsYDmG6VDKIdnLwNrJ+jhgHDzC/5KuTjkk0nakG2WYb7A0BuDauRq/9JWROA9BIk7VACLWXXYrUP93aKTPDn6nxtj/C+cRTZKUchNI1BNxeON56C8ljTu861N30DdRD5eSnePhHaPW0MXB5k8hv/Aw+vtaYbIdcST5vxbIMOnxSK9jbHOKT+tvCAYQuOAeBi6+GEaxHuPoQHJ8vhHSoGN41mxBcNxV+1Y3EH1/e6VKCZOUNVIpFwglehB9/FJJdESyQRepEFx0u9jPGda1MwVMznHD5/QAedzBzUX3d6QE7bRTSJl8MJTn5+MTjrua2O6G+9BKBARd0Agrh7Cw4X38DiRMndp0ZJHzhd2YimZdwKYCFk8yqFkPT6rVQ7CR6Tu6XZCj0zP6/z4Rz8iW7bTbh43K4mkjV06azEJ8ZkpDIgtx0PHa/WLovYq0ZGnzlL4wXLWOuFBYgcN549c86vxgrmSx/jmWyHA4Wye51wgtWcpMVpXFqNF7SW1bzs6u7vUIXX+yy4rEnWQNdJ0TPF3LYWF1mBgvPndft8YWK97HKtBRm2J3McKayoDeRzH8qK0nLZjVJ/L2TRROSWSjBweodbhZYvWaqZbISuIYUGIqJ0m0kcTxVrFWHoJVVIcrbVZp8YEs3wEsQkn+lkM6nKuiRLjk3/h02hkgdqCLvFdq7F/B6zdQFiyctTdzvSE8VU72OfU0rSyTHRD5I1nUR03R1DSKdpLbxz0/A8cQTsLtVOHgra4IH0ttvw3HRxG6jv8iSJfA0EJR2ucW8EmdTBDnkNaV4AZhozFxhorcTUsQPbdWKCThzHJ8fEuAMCTMxlwfi64hsFHQ1fvA+Kr/4QsQNSU0hpNcR5HU6hckh+QQbMrpLA1QMXdTSOKqRKUgsO+9cM23E4TBv+ZS56SHcRzY2Z9kKuHplHqfpwDSFEYnHCOQyte4VyCrffAvu6Q/D5rTzzjpESNDYkEJEiQ4VX3zZvAI2n6jEIbROTMs+73zIHUDo5jRRKIzo3z8gn6iI5cxjRNnKCyZATvSIpKiuENKsb4Lz62WE/iS4yWsEli65yvmnOxpJoN7hDCmVY2YPrKZrQktyqqqIoxXCHgtXTGMKxRiC9Id/wg+QfdNvuyiKxJQIMUSXRdY2r6y2GQ2bX1WkiVggxPM9xvEdu0YxkRgxwVzepBkK+5HQjbpHwqrVcNMzS0YKQXB6djWChC3rEL3ypwQ0mMha8IJciAJIO92zPrs3NIpN7GlJR71ubOkSOJctgkZ+Q4kEoY0qRMo/P4ec4Gy+r+GncKJwFGwEkhjFPfKSJQ79i9k3KJddkiucupyQBJaUQRxLFCoW41/aaHl83UV/JaXCGD4G0qSJ6HXpJNhSkroQFSqIeNNF1pUpajuEJlpsxLesaQilplKAdvxoOHrRJDQ5nOQgyQHHIpBHjOiyuRKyr0VEa6A91CA6CuOG2NmcE7PSOxTXiKIpITd2jMY7fmwdabg7qRcc9kREYw3Qf/YzOCxmNB/n8cA//gLYqhvhcybBQbGOf/6yUNJll8jmYvx8KeZg2Cogsea0cXNK2mHnDcDdD6nFhEbWcRGhRZabN0tIic5/WxbWP28RWNE2M5nJZ4ypZsunQ+O1C12QuPkLLDUdTenpyP7FNThWT4fuJ+YZrLnWg0R3x6UWnhsJBUWximd1DFmqlxKcSwRDihffSLRQRB5bFPQ5dol/LRHvQDHMWaOyLolpv2KlarOCJSRGNjqIzfkUYLqOQXYeYlkpxar4Ge0cdLyrQyyEFo3F86xoUVayUvWGWZS2SqFcs/hYxBjjuV52nMVoW9bHPW4zGteZIL3BHZmImRRxvRhff5dAjGrVYRgHD9b8Etno+C66TRYLgTYvyiNMIqwyLqxldikK4zkoxcp0E11dueMC2UOmLjYn7OxbTA4lKgYSv494UHRQSuWENszKndTqW6BaF53M7JVhrWDArHcddHCIfiUm9stWZY+1+BadI2VU2bqf+W1q/BjOCMWqWccrivEy6fEZIgkiR2VDpF8Uwy5mIHPUpzCzQqnxqqfYGRV04d+/KDcLbceNckKnpHhRTBaOXDZUQqimxsmiQKUKDeQxGBc+g+IeTXcEs4ZM9f8/AQYAkanvWBd9BdQAAAAASUVORK5CYII=';
            function toAutoTableColumns(srcColumns, columnStyles, columnTitles) {
                return srcColumns.map(function (src) {
                    var col = {
                        dataKey: src.id || src.field,
                        title: src.name || ''
                    };
                    if (columnTitles && columnTitles[col.dataKey] != null)
                        col.title = columnTitles[col.dataKey];
                    var style = {};
                    if ((src.cssClass || '').indexOf("align-right") >= 0)
                        style.halign = 'right';
                    else if ((src.cssClass || '').indexOf("align-center") >= 0)
                        style.halign = 'center';
                    columnStyles[col.dataKey] = style;
                    return col;
                });
            }
            function toAutoTableData(entities, keys, srcColumns) {
                var el = document.createElement('span');
                var row = 0;
                return entities.map(function (item) {
                    var dst = {};
                    for (var cell = 0; cell < srcColumns.length; cell++) {
                        var src = srcColumns[cell];
                        var fld = src.field || '';
                        var key = keys[cell];
                        var txt = void 0;
                        var html = void 0;
                        if (src.formatter) {
                            html = src.formatter(row, cell, item[fld], src, item);
                        }
                        else if (src.format) {
                            html = src.format({ row: row, cell: cell, item: item, value: item[fld] });
                        }
                        else {
                            dst[key] = item[fld];
                            continue;
                        }
                        if (!html || (html.indexOf('<') < 0 && html.indexOf('&') < 0))
                            dst[key] = html;
                        else {
                            el.innerHTML = html;
                            if (el.children.length == 1 &&
                                $(el.children[0]).is(":input")) {
                                dst[key] = $(el.children[0]).val();
                            }
                            else if (el.children.length == 1 &&
                                $(el.children).is('.check-box')) {
                                dst[key] = $(el.children).hasClass("checked") ? "Yes" : "No";
                            }
                            else
                                dst[key] = el.textContent || '';
                        }
                    }
                    row++;
                    return dst;
                });
            }
            function exportToPdf(options) {
                var g = options.grid;
                if (!options.onViewSubmit())
                    return;
                includeAutoTable();
                var request = Q.deepClone(g.view.params);
                request.Take = 0;
                request.Skip = 0;
                var sortBy = g.view.sortBy;
                if (sortBy != null)
                    request.Sort = sortBy;
                var gridColumns = g.slickGrid.getColumns();
                gridColumns = gridColumns.filter(function (x) { return x.id !== "__select__" && x.name.length > 0; });
                request.IncludeColumns = [];
                for (var _i = 0, gridColumns_2 = gridColumns; _i < gridColumns_2.length; _i++) {
                    var column = gridColumns_2[_i];
                    request.IncludeColumns.push(column.id || column.field);
                }
                Q.serviceCall({
                    url: g.view.url,
                    request: request,
                    onSuccess: function (response) {
                        var doc = new jsPDF('l', 'pt');
                        var groupings = g.view.getGrouping(); //group fields
                        var groupingColumns = gridColumns.filter(function (f) { return groupings.some(function (s) { return s.getter == f.field; }) == true; });
                        var srcColumns = gridColumns.filter(function (f) { return groupings.some(function (s) { return s.getter == f.field; }) == false; });
                        var columnStyles = {};
                        var columns = toAutoTableColumns(srcColumns, columnStyles, options.columnTitles);
                        var keys = columns.filter(function (f) { return groupings.some(function (s) { return s.getter == f; }) == false; }).map(function (x) { return x.dataKey; });
                        var totalPagesExp = "{{T}}";
                        var pageNumbers = options.pageNumbers == null || options.pageNumbers;
                        var autoOptions = $.extend({
                            margin: { top: 30, left: 30, right: 30, bottom: pageNumbers ? 25 : 30 },
                            startY: 90,
                            styles: {
                                fontSize: 8,
                                overflow: 'linebreak',
                                cellPadding: 2,
                                valign: 'middle',
                                lineColor: 0
                            },
                            headerStyles: { fillColor: 255, textColor: 0, lineWidth: 1, fillStyle: 'S' },
                            columnStyles: columnStyles
                        }, options.tableOptions);
                        ///region Title
                        {
                            doc.addImage(headerImgData, 'JPEG', 30, 30, 60, 60);
                            doc.autoTable(['BEPZA'], [], {
                                margin: { bottom: 10, left: 100 },
                                startY: options.titleTop || 35,
                                headerStyles: { fillColor: 255, textColor: 0 },
                                styles: { halign: 'left', fontSize: 18 }
                            });
                            var reportTitle = '';
                            if (groupingColumns[0])
                                reportTitle = groupingColumns.map(function (m) { return m.name; }).join(', ') + ' wise ';
                            reportTitle += options.reportTitle || g.getTitle();
                            reportTitle += " Report";
                            doc.autoTable([reportTitle], [], {
                                margin: { top: 10, bottom: 10, left: 100 },
                                startY: doc.autoTableEndPosY(),
                                headerStyles: { fillColor: 255, textColor: 0 },
                                styles: { halign: 'left', fontSize: 14 }
                            });
                        }
                        ///region Header
                        {
                            var header = function (data) {
                            };
                            autoOptions.beforePageContent = header;
                        }
                        ///region Footer
                        {
                            if (pageNumbers) {
                                var footer = function (data) {
                                    var str = data.pageCount;
                                    // Total page number plugin only available in jspdf v1.0+
                                    if (typeof doc.putTotalPages === 'function') {
                                        str = str + " / " + totalPagesExp;
                                    }
                                    doc.autoTableText(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - autoOptions.margin.bottom, {
                                        halign: 'center'
                                    });
                                };
                                autoOptions.afterPageContent = footer;
                            }
                        }
                        ///region Content
                        {
                            //extra space after title
                            doc.autoTable([''], [], {
                                startY: doc.autoTableEndPosY() + 20,
                                headerStyles: { fillColor: 255, textColor: 0 }
                            });
                            var headerHeight = 100;
                            var headerFontSizeBase = 11;
                            var entities = response.Entities || [];
                            g.setItems(entities);
                            var groups = g.view.getGroups(); //grouped data
                            if (groups.length > 0) {
                                var ggg = function (grps, parentGroupIndex) {
                                    var endPosY = doc.autoTableEndPosY();
                                    for (var i = 0; i < grps.length; i++) {
                                        var group = grps[i];
                                        var level = group.level + 1;
                                        doc.autoTable([group.title], [], {
                                            margin: { left: 30 + level * 10, top: 2 },
                                            startY: doc.autoTableEndPosY(),
                                            headerStyles: { fillColor: 255, textColor: 0, fontSize: 10 - group.level, cellPadding: 0 }
                                        });
                                        if (group.groups) {
                                            ggg(group.groups, i);
                                        }
                                        else {
                                            var data = toAutoTableData(group.rows, keys, srcColumns);
                                            autoOptions.startY = doc.autoTableEndPosY();
                                            autoOptions.margin.left = 30 + level * 10;
                                            autoOptions.margin.bottom = 10;
                                            doc.autoTable(columns, data, autoOptions);
                                            //for extra space
                                            doc.autoTable([''], [], {
                                                margin: { left: 30 + level * 10, top: 2 },
                                                startY: doc.autoTableEndPosY() + 10,
                                                headerStyles: { fillColor: 255, textColor: 0 }
                                            });
                                        }
                                    }
                                };
                                ggg(groups, -1);
                            }
                            else {
                                var data = toAutoTableData(g.getItems(), keys, srcColumns);
                                autoOptions.startY = headerHeight;
                                doc.autoTable(columns, data, autoOptions);
                            }
                        }
                        if (typeof doc.putTotalPages === 'function') {
                            doc.putTotalPages(totalPagesExp);
                        }
                        if (!options.output || options.output == "file") {
                            var fileName = options.reportTitle || "{0}_{1}.pdf";
                            fileName = Q.format(fileName, g.getTitle() || "report", Q.formatDate(new Date(), "yyyyMMdd_HHmm"));
                            doc.save(fileName);
                            return;
                        }
                        if (options.autoPrint)
                            doc.autoPrint();
                        var output = options.output;
                        if (output == 'newwindow' || '_blank')
                            output = 'dataurlnewwindow';
                        else if (output == 'window')
                            output = 'datauri';
                        doc.output(output);
                    }
                });
            }
            PdfExportHelper.exportToPdf = exportToPdf;
            function createToolButton(options) {
                return {
                    title: options.title || '',
                    hint: options.hint || 'PDF',
                    cssClass: 'export-pdf-button',
                    onClick: function () { return exportToPdf(options); },
                    separator: options.separator
                };
            }
            PdfExportHelper.createToolButton = createToolButton;
            function includeJsPDF() {
                if (typeof jsPDF !== "undefined")
                    return;
                var script = $("jsPDFScript");
                if (script.length > 0)
                    return;
                $("<script/>")
                    .attr("type", "text/javascript")
                    .attr("id", "jsPDFScript")
                    .attr("src", Q.resolveUrl("~/Scripts/jspdf.min.js"))
                    .appendTo(document.head);
            }
            function includeAutoTable() {
                includeJsPDF();
                if (typeof jsPDF === "undefined" ||
                    typeof jsPDF.API == "undefined" ||
                    typeof jsPDF.API.autoTable !== "undefined")
                    return;
                var script = $("jsPDFAutoTableScript");
                if (script.length > 0)
                    return;
                $("<script/>")
                    .attr("type", "text/javascript")
                    .attr("id", "jsPDFAutoTableScript")
                    .attr("src", Q.resolveUrl("~/Scripts/jspdf.plugin.autotable.min.js"))
                    .appendTo(document.head);
            }
        })(PdfExportHelper = Common.PdfExportHelper || (Common.PdfExportHelper = {}));
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var ReportDialog = (function (_super) {
            __extends(ReportDialog, _super);
            function ReportDialog(options) {
                var _this = _super.call(this, options) || this;
                _this.updateInterface();
                _this.loadReport(_this.options.reportKey);
                return _this;
            }
            ReportDialog.prototype.getDialogButtons = function () {
                return null;
            };
            ReportDialog.prototype.createPropertyGrid = function () {
                this.propertyGrid && this.byId('PropertyGrid').html('').attr('class', '');
                this.propertyGrid = new Serenity.PropertyGrid(this.byId('PropertyGrid'), {
                    idPrefix: this.idPrefix,
                    useCategories: true,
                    items: this.propertyItems
                }).init(null);
            };
            ReportDialog.prototype.loadReport = function (reportKey) {
                var _this = this;
                Q.serviceCall({
                    url: Q.resolveUrl('~/Report/Retrieve'),
                    request: {
                        ReportKey: reportKey
                    },
                    onSuccess: function (response) {
                        _this.report = response;
                        _this.element.dialog().dialog('option', 'title', _this.report.Title);
                        _this.createPropertyGrid();
                        _this.propertyGrid.load(_this.report.InitialSettings || {});
                        _this.updateInterface();
                        _this.dialogOpen();
                    }
                });
            };
            ReportDialog.prototype.updateInterface = function () {
                this.toolbar.findButton('print-preview-button')
                    .toggle(this.report && !this.report.IsDataOnlyReport);
                this.toolbar.findButton('export-pdf-button')
                    .toggle(this.report && !this.report.IsDataOnlyReport);
                this.toolbar.findButton('export-xlsx-button')
                    .toggle(this.report && this.report.IsDataOnlyReport);
            };
            ReportDialog.prototype.executeReport = function (target, ext, download) {
                if (!this.validateForm()) {
                    return;
                }
                var opt = {};
                this.propertyGrid.save(opt);
                Q.postToUrl({
                    url: Q.resolveUrl(download ? '~/Report/Download' : '~/Report/Execute'),
                    params: {
                        key: this.report.ReportKey,
                        opt: JSON.stringify(opt),
                        ext: ext
                    },
                    target: target
                });
            };
            ReportDialog.prototype.getToolbarButtons = function () {
                var _this = this;
                return [
                    {
                        title: 'Preview',
                        cssClass: 'print-preview-button',
                        onClick: function () { return _this.executeReport('_blank', null, false); }
                    },
                    {
                        title: 'PDF',
                        cssClass: 'export-pdf-button',
                        onClick: function () { return _this.executeReport('_blank', 'pdf', true); }
                    },
                    {
                        title: 'Excel',
                        cssClass: 'export-xlsx-button',
                        onClick: function () { return _this.executeReport('_blank', 'xlsx', true); }
                    }
                ];
            };
            return ReportDialog;
        }(Serenity.TemplatedDialog));
        Common.ReportDialog = ReportDialog;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        //export interface ReportButtonOptions extends ReportExecuteOptions {
        //    title?: string;
        //    cssClass?: string;
        //    icon?: string;
        //}
        var ReportHelper;
        (function (ReportHelper) {
            //export function createToolButton(options: ReportButtonOptions): Serenity.ToolButton {
            //    return {
            //        title: Q.coalesce(options.title, 'Report'),
            //        cssClass: Q.coalesce(options.cssClass, 'print-button'),
            //        icon: options.icon,
            //        onClick: () => {
            //            ReportHelper.execute(options);
            //        }
            //    };
            //}
            function execute(options) {
                var opt = options.getParams ? options.getParams() : options.params;
                Q.postToUrl({
                    url: '~/Report/' + (options.download ? 'Download' : 'Render'),
                    params: {
                        key: options.reportKey,
                        ext: Q.coalesce(options.extension, 'pdf'),
                        opt: opt ? $.toJSON(opt) : ''
                    },
                    target: Q.coalesce(options.target, '_blank')
                });
            }
            ReportHelper.execute = execute;
        })(ReportHelper = Common.ReportHelper || (Common.ReportHelper = {}));
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var ReportPage = (function (_super) {
            __extends(ReportPage, _super);
            function ReportPage(element) {
                var _this = _super.call(this, element) || this;
                $('.report-link', element).click(function (e) { return _this.reportLinkClick(e); });
                $('div.line', element).click(function (e) { return _this.categoryClick(e); });
                new Serenity.QuickSearchInput($('.s-QuickSearchBar input', element), {
                    onSearch: function (field, text, done) {
                        _this.updateMatchFlags(text);
                        done(true);
                    }
                });
                return _this;
            }
            ReportPage.prototype.updateMatchFlags = function (text) {
                var liList = $('.report-list', this.element).find('li').removeClass('non-match');
                text = Q.trimToNull(text);
                if (!text) {
                    liList.children('ul').hide();
                    liList.show().removeClass('expanded');
                    return;
                }
                text = Select2.util.stripDiacritics(text).toUpperCase();
                var reportItems = liList.filter('.report-item');
                reportItems.each(function (ix, e) {
                    var x = $(e);
                    var title = Select2.util.stripDiacritics(Q.coalesce(x.text(), '').toUpperCase());
                    if (title.indexOf(text) < 0) {
                        x.addClass('non-match');
                    }
                });
                var matchingItems = reportItems.not('.non-match');
                var visibles = matchingItems.parents('li').add(matchingItems);
                var nonVisibles = liList.not(visibles);
                nonVisibles.hide().addClass('non-match');
                visibles.show();
                if (visibles.length <= 100) {
                    liList.children('ul').show();
                    liList.addClass('expanded');
                }
            };
            ReportPage.prototype.categoryClick = function (e) {
                var li = $(e.target).closest('li');
                if (li.hasClass('expanded')) {
                    li.find('ul').hide('fast');
                    li.removeClass('expanded');
                    li.find('li').removeClass('expanded');
                }
                else {
                    li.addClass('expanded');
                    li.children('ul').show('fast');
                    if (li.children('ul').children('li').length === 1 && !li.children('ul').children('li').hasClass('expanded')) {
                        li.children('ul').children('li').children('.line').click();
                    }
                }
            };
            ReportPage.prototype.reportLinkClick = function (e) {
                e.preventDefault();
                new Common.ReportDialog({
                    reportKey: $(e.target).data('key')
                }).dialogOpen();
            };
            return ReportPage;
        }(Serenity.Widget));
        Common.ReportPage = ReportPage;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Common;
    (function (Common) {
        var UserPreferenceStorage = (function () {
            function UserPreferenceStorage() {
            }
            UserPreferenceStorage.prototype.getItem = function (key) {
                var value;
                Common.UserPreferenceService.Retrieve({
                    PreferenceType: "UserPreferenceStorage",
                    Name: key
                }, function (response) { return value = response.Value; }, {
                    async: false
                });
                return value;
            };
            UserPreferenceStorage.prototype.setItem = function (key, data) {
                Common.UserPreferenceService.Update({
                    PreferenceType: "UserPreferenceStorage",
                    Name: key,
                    Value: data
                });
            };
            return UserPreferenceStorage;
        }());
        Common.UserPreferenceStorage = UserPreferenceStorage;
    })(Common = VistaLOAN.Common || (VistaLOAN.Common = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var HRM;
    (function (HRM) {
        var EmploymentInfoDialog = (function (_super) {
            __extends(EmploymentInfoDialog, _super);
            function EmploymentInfoDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new HRM.EmploymentInfoForm(_this.idPrefix);
                return _this;
            }
            EmploymentInfoDialog.prototype.getFormKey = function () { return HRM.EmploymentInfoForm.formKey; };
            EmploymentInfoDialog.prototype.getIdProperty = function () { return HRM.EmploymentInfoRow.idProperty; };
            EmploymentInfoDialog.prototype.getLocalTextPrefix = function () { return HRM.EmploymentInfoRow.localTextPrefix; };
            EmploymentInfoDialog.prototype.getNameProperty = function () { return HRM.EmploymentInfoRow.nameProperty; };
            EmploymentInfoDialog.prototype.getService = function () { return HRM.EmploymentInfoService.baseUrl; };
            EmploymentInfoDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], EmploymentInfoDialog);
            return EmploymentInfoDialog;
        }(Serenity.EntityDialog));
        HRM.EmploymentInfoDialog = EmploymentInfoDialog;
    })(HRM = VistaLOAN.HRM || (VistaLOAN.HRM = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var HRM;
    (function (HRM) {
        var EmploymentInfoGrid = (function (_super) {
            __extends(EmploymentInfoGrid, _super);
            function EmploymentInfoGrid(container) {
                return _super.call(this, container) || this;
            }
            EmploymentInfoGrid.prototype.getColumnsKey = function () { return 'HRM.EmploymentInfo'; };
            EmploymentInfoGrid.prototype.getDialogType = function () { return HRM.EmploymentInfoDialog; };
            EmploymentInfoGrid.prototype.getIdProperty = function () { return HRM.EmploymentInfoRow.idProperty; };
            EmploymentInfoGrid.prototype.getLocalTextPrefix = function () { return HRM.EmploymentInfoRow.localTextPrefix; };
            EmploymentInfoGrid.prototype.getService = function () { return HRM.EmploymentInfoService.baseUrl; };
            EmploymentInfoGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], EmploymentInfoGrid);
            return EmploymentInfoGrid;
        }(Serenity.EntityGrid));
        HRM.EmploymentInfoGrid = EmploymentInfoGrid;
    })(HRM = VistaLOAN.HRM || (VistaLOAN.HRM = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var LoginPanel = (function (_super) {
            __extends(LoginPanel, _super);
            function LoginPanel(container) {
                var _this = _super.call(this, container) || this;
                $(function () {
                    $('body').vegas({
                        delay: 10000,
                        cover: true,
                        overlay: Q.resolveUrl("~/scripts/vegas/overlays/01.png"),
                        slides: [
                            { src: Q.resolveUrl('~/content/site/slides/slide1.jpg'), transition: 'fade' },
                            { src: Q.resolveUrl('~/content/site/slides/slide2.jpg'), transition: 'fade' },
                            { src: Q.resolveUrl('~/content/site/slides/slide3.jpg'), transition: 'zoomOut' },
                            { src: Q.resolveUrl('~/content/site/slides/slide4.jpg'), transition: 'blur' },
                            { src: Q.resolveUrl('~/content/site/slides/slide5.jpg'), transition: 'swirlLeft' }
                        ]
                    });
                });
                _this.form = new Membership.LoginForm(_this.idPrefix);
                _this.byId('LoginButton').click(function (e) {
                    e.preventDefault();
                    if (!_this.validateForm()) {
                        return;
                    }
                    var request = _this.getSaveEntity();
                    Q.serviceCall({
                        url: Q.resolveUrl('~/Account/Login'),
                        request: request,
                        onSuccess: function (response) {
                            var q = Q.parseQueryString();
                            var returnUrl = q['returnUrl'] || q['ReturnUrl'];
                            if (returnUrl) {
                                window.location.href = returnUrl;
                            }
                            else {
                                window.location.href = Q.resolveUrl('~/');
                            }
                        }
                    });
                });
                return _this;
            }
            LoginPanel.prototype.getFormKey = function () { return Membership.LoginForm.formKey; };
            LoginPanel = __decorate([
                Serenity.Decorators.registerClass()
            ], LoginPanel);
            return LoginPanel;
        }(Serenity.PropertyPanel));
        Membership.LoginPanel = LoginPanel;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var ChangePasswordPanel = (function (_super) {
            __extends(ChangePasswordPanel, _super);
            function ChangePasswordPanel(container) {
                var _this = _super.call(this, container) || this;
                _this.form = new Membership.ChangePasswordForm(_this.idPrefix);
                _this.form.NewPassword.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.w('ConfirmPassword', Serenity.PasswordEditor).value.length < 7) {
                        return Q.format(Q.text('Validation.MinRequiredPasswordLength'), 7);
                    }
                });
                _this.form.ConfirmPassword.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.ConfirmPassword.value !== _this.form.NewPassword.value) {
                        return Q.text('Validation.PasswordConfirm');
                    }
                });
                _this.byId('SubmitButton').click(function (e) {
                    e.preventDefault();
                    if (!_this.validateForm()) {
                        return;
                    }
                    var request = _this.getSaveEntity();
                    Q.serviceCall({
                        url: Q.resolveUrl('~/Account/ChangePassword'),
                        request: request,
                        onSuccess: function (response) {
                            Q.information(Q.text('Forms.Membership.ChangePassword.Success'), function () {
                                window.location.href = Q.resolveUrl('~/');
                            });
                        }
                    });
                });
                return _this;
            }
            ChangePasswordPanel.prototype.getFormKey = function () { return Membership.ChangePasswordForm.formKey; };
            ChangePasswordPanel = __decorate([
                Serenity.Decorators.registerClass()
            ], ChangePasswordPanel);
            return ChangePasswordPanel;
        }(Serenity.PropertyPanel));
        Membership.ChangePasswordPanel = ChangePasswordPanel;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var ForgotPasswordPanel = (function (_super) {
            __extends(ForgotPasswordPanel, _super);
            function ForgotPasswordPanel(container) {
                var _this = _super.call(this, container) || this;
                _this.form = new Membership.ForgotPasswordForm(_this.idPrefix);
                _this.byId('SubmitButton').click(function (e) {
                    e.preventDefault();
                    if (!_this.validateForm()) {
                        return;
                    }
                    var request = _this.getSaveEntity();
                    Q.serviceCall({
                        url: Q.resolveUrl('~/Account/ForgotPassword'),
                        request: request,
                        onSuccess: function (response) {
                            Q.information(Q.text('Forms.Membership.ForgotPassword.Success'), function () {
                                window.location.href = Q.resolveUrl('~/');
                            });
                        }
                    });
                });
                return _this;
            }
            ForgotPasswordPanel.prototype.getFormKey = function () { return Membership.ForgotPasswordForm.formKey; };
            ForgotPasswordPanel = __decorate([
                Serenity.Decorators.registerClass()
            ], ForgotPasswordPanel);
            return ForgotPasswordPanel;
        }(Serenity.PropertyPanel));
        Membership.ForgotPasswordPanel = ForgotPasswordPanel;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var ResetPasswordPanel = (function (_super) {
            __extends(ResetPasswordPanel, _super);
            function ResetPasswordPanel(container) {
                var _this = _super.call(this, container) || this;
                _this.form = new Membership.ResetPasswordForm(_this.idPrefix);
                _this.form.NewPassword.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.ConfirmPassword.value.length < 7) {
                        return Q.format(Q.text('Validation.MinRequiredPasswordLength'), 7);
                    }
                });
                _this.form.ConfirmPassword.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.ConfirmPassword.value !== _this.form.NewPassword.value) {
                        return Q.text('Validation.PasswordConfirm');
                    }
                });
                _this.byId('SubmitButton').click(function (e) {
                    e.preventDefault();
                    if (!_this.validateForm()) {
                        return;
                    }
                    var request = _this.getSaveEntity();
                    request.Token = _this.byId('Token').val();
                    Q.serviceCall({
                        url: Q.resolveUrl('~/Account/ResetPassword'),
                        request: request,
                        onSuccess: function (response) {
                            Q.information(Q.text('Forms.Membership.ResetPassword.Success'), function () {
                                window.location.href = Q.resolveUrl('~/Account/Login');
                            });
                        }
                    });
                });
                return _this;
            }
            ResetPasswordPanel.prototype.getFormKey = function () { return Membership.ResetPasswordForm.formKey; };
            ResetPasswordPanel = __decorate([
                Serenity.Decorators.registerClass()
            ], ResetPasswordPanel);
            return ResetPasswordPanel;
        }(Serenity.PropertyPanel));
        Membership.ResetPasswordPanel = ResetPasswordPanel;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Membership;
    (function (Membership) {
        var SignUpPanel = (function (_super) {
            __extends(SignUpPanel, _super);
            function SignUpPanel(container) {
                var _this = _super.call(this, container) || this;
                _this.form = new Membership.SignUpForm(_this.idPrefix);
                _this.form.ConfirmEmail.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.ConfirmEmail.value !== _this.form.Email.value) {
                        return Q.text('Validation.EmailConfirm');
                    }
                });
                _this.form.ConfirmPassword.addValidationRule(_this.uniqueName, function (e) {
                    if (_this.form.ConfirmPassword.value !== _this.form.Password.value) {
                        return Q.text('Validation.PasswordConfirm');
                    }
                });
                _this.byId('SubmitButton').click(function (e) {
                    e.preventDefault();
                    if (!_this.validateForm()) {
                        return;
                    }
                    Q.serviceCall({
                        url: Q.resolveUrl('~/Account/SignUp'),
                        request: {
                            DisplayName: _this.form.DisplayName.value,
                            Email: _this.form.Email.value,
                            Password: _this.form.Password.value
                        },
                        onSuccess: function (response) {
                            Q.information(Q.text('Forms.Membership.SignUp.Success'), function () {
                                window.location.href = Q.resolveUrl('~/');
                            });
                        }
                    });
                });
                return _this;
            }
            SignUpPanel.prototype.getFormKey = function () { return Membership.SignUpForm.formKey; };
            SignUpPanel = __decorate([
                Serenity.Decorators.registerClass()
            ], SignUpPanel);
            return SignUpPanel;
        }(Serenity.PropertyPanel));
        Membership.SignUpPanel = SignUpPanel;
    })(Membership = VistaLOAN.Membership || (VistaLOAN.Membership = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaDonorInformationDialog = (function (_super) {
            __extends(LaDonorInformationDialog, _super);
            function LaDonorInformationDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Setup.LaDonorInformationForm(_this.idPrefix);
                return _this;
            }
            LaDonorInformationDialog.prototype.getFormKey = function () { return Setup.LaDonorInformationForm.formKey; };
            LaDonorInformationDialog.prototype.getIdProperty = function () { return Setup.LaDonorInformationRow.idProperty; };
            LaDonorInformationDialog.prototype.getLocalTextPrefix = function () { return Setup.LaDonorInformationRow.localTextPrefix; };
            LaDonorInformationDialog.prototype.getNameProperty = function () { return Setup.LaDonorInformationRow.nameProperty; };
            LaDonorInformationDialog.prototype.getService = function () { return Setup.LaDonorInformationService.baseUrl; };
            LaDonorInformationDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaDonorInformationDialog);
            return LaDonorInformationDialog;
        }(Serenity.EntityDialog));
        Setup.LaDonorInformationDialog = LaDonorInformationDialog;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaDonorInformationGrid = (function (_super) {
            __extends(LaDonorInformationGrid, _super);
            function LaDonorInformationGrid(container) {
                return _super.call(this, container) || this;
            }
            LaDonorInformationGrid.prototype.getColumnsKey = function () { return 'Setup.LaDonorInformation'; };
            LaDonorInformationGrid.prototype.getDialogType = function () { return Setup.LaDonorInformationDialog; };
            LaDonorInformationGrid.prototype.getIdProperty = function () { return Setup.LaDonorInformationRow.idProperty; };
            LaDonorInformationGrid.prototype.getLocalTextPrefix = function () { return Setup.LaDonorInformationRow.localTextPrefix; };
            LaDonorInformationGrid.prototype.getService = function () { return Setup.LaDonorInformationService.baseUrl; };
            LaDonorInformationGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaDonorInformationGrid);
            return LaDonorInformationGrid;
        }(Serenity.EntityGrid));
        Setup.LaDonorInformationGrid = LaDonorInformationGrid;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanApplicationLastNumberDialog = (function (_super) {
            __extends(LaLoanApplicationLastNumberDialog, _super);
            function LaLoanApplicationLastNumberDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Setup.LaLoanApplicationLastNumberForm(_this.idPrefix);
                return _this;
            }
            LaLoanApplicationLastNumberDialog.prototype.getFormKey = function () { return Setup.LaLoanApplicationLastNumberForm.formKey; };
            LaLoanApplicationLastNumberDialog.prototype.getIdProperty = function () { return Setup.LaLoanApplicationLastNumberRow.idProperty; };
            LaLoanApplicationLastNumberDialog.prototype.getLocalTextPrefix = function () { return Setup.LaLoanApplicationLastNumberRow.localTextPrefix; };
            LaLoanApplicationLastNumberDialog.prototype.getService = function () { return Setup.LaLoanApplicationLastNumberService.baseUrl; };
            LaLoanApplicationLastNumberDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanApplicationLastNumberDialog);
            return LaLoanApplicationLastNumberDialog;
        }(Serenity.EntityDialog));
        Setup.LaLoanApplicationLastNumberDialog = LaLoanApplicationLastNumberDialog;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanApplicationLastNumberGrid = (function (_super) {
            __extends(LaLoanApplicationLastNumberGrid, _super);
            function LaLoanApplicationLastNumberGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanApplicationLastNumberGrid.prototype.getColumnsKey = function () { return 'Setup.LaLoanApplicationLastNumber'; };
            LaLoanApplicationLastNumberGrid.prototype.getDialogType = function () { return Setup.LaLoanApplicationLastNumberDialog; };
            LaLoanApplicationLastNumberGrid.prototype.getIdProperty = function () { return Setup.LaLoanApplicationLastNumberRow.idProperty; };
            LaLoanApplicationLastNumberGrid.prototype.getLocalTextPrefix = function () { return Setup.LaLoanApplicationLastNumberRow.localTextPrefix; };
            LaLoanApplicationLastNumberGrid.prototype.getService = function () { return Setup.LaLoanApplicationLastNumberService.baseUrl; };
            LaLoanApplicationLastNumberGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanApplicationLastNumberGrid);
            return LaLoanApplicationLastNumberGrid;
        }(Serenity.EntityGrid));
        Setup.LaLoanApplicationLastNumberGrid = LaLoanApplicationLastNumberGrid;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanCriteriaDialog = (function (_super) {
            __extends(LaLoanCriteriaDialog, _super);
            function LaLoanCriteriaDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Setup.LaLoanCriteriaForm(_this.idPrefix);
                return _this;
            }
            LaLoanCriteriaDialog.prototype.getFormKey = function () { return Setup.LaLoanCriteriaForm.formKey; };
            LaLoanCriteriaDialog.prototype.getIdProperty = function () { return Setup.LaLoanCriteriaRow.idProperty; };
            LaLoanCriteriaDialog.prototype.getLocalTextPrefix = function () { return Setup.LaLoanCriteriaRow.localTextPrefix; };
            LaLoanCriteriaDialog.prototype.getNameProperty = function () { return Setup.LaLoanCriteriaRow.nameProperty; };
            LaLoanCriteriaDialog.prototype.getService = function () { return Setup.LaLoanCriteriaService.baseUrl; };
            LaLoanCriteriaDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanCriteriaDialog);
            return LaLoanCriteriaDialog;
        }(Serenity.EntityDialog));
        Setup.LaLoanCriteriaDialog = LaLoanCriteriaDialog;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanCriteriaGrid = (function (_super) {
            __extends(LaLoanCriteriaGrid, _super);
            function LaLoanCriteriaGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanCriteriaGrid.prototype.getColumnsKey = function () { return 'Setup.LaLoanCriteria'; };
            LaLoanCriteriaGrid.prototype.getDialogType = function () { return Setup.LaLoanCriteriaDialog; };
            LaLoanCriteriaGrid.prototype.getIdProperty = function () { return Setup.LaLoanCriteriaRow.idProperty; };
            LaLoanCriteriaGrid.prototype.getLocalTextPrefix = function () { return Setup.LaLoanCriteriaRow.localTextPrefix; };
            LaLoanCriteriaGrid.prototype.getService = function () { return Setup.LaLoanCriteriaService.baseUrl; };
            LaLoanCriteriaGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanCriteriaGrid);
            return LaLoanCriteriaGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Setup.LaLoanCriteriaGrid = LaLoanCriteriaGrid;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanEligibleInformationDialog = (function (_super) {
            __extends(LaLoanEligibleInformationDialog, _super);
            function LaLoanEligibleInformationDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Setup.LaLoanEligibleInformationForm(_this.idPrefix);
                return _this;
            }
            LaLoanEligibleInformationDialog.prototype.getFormKey = function () { return Setup.LaLoanEligibleInformationForm.formKey; };
            LaLoanEligibleInformationDialog.prototype.getIdProperty = function () { return Setup.LaLoanEligibleInformationRow.idProperty; };
            LaLoanEligibleInformationDialog.prototype.getLocalTextPrefix = function () { return Setup.LaLoanEligibleInformationRow.localTextPrefix; };
            LaLoanEligibleInformationDialog.prototype.getNameProperty = function () { return Setup.LaLoanEligibleInformationRow.nameProperty; };
            LaLoanEligibleInformationDialog.prototype.getService = function () { return Setup.LaLoanEligibleInformationService.baseUrl; };
            LaLoanEligibleInformationDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanEligibleInformationDialog);
            return LaLoanEligibleInformationDialog;
        }(Serenity.EntityDialog));
        Setup.LaLoanEligibleInformationDialog = LaLoanEligibleInformationDialog;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanEligibleInformationGrid = (function (_super) {
            __extends(LaLoanEligibleInformationGrid, _super);
            function LaLoanEligibleInformationGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanEligibleInformationGrid.prototype.getColumnsKey = function () { return 'Setup.LaLoanEligibleInformation'; };
            LaLoanEligibleInformationGrid.prototype.getDialogType = function () { return Setup.LaLoanEligibleInformationDialog; };
            LaLoanEligibleInformationGrid.prototype.getIdProperty = function () { return Setup.LaLoanEligibleInformationRow.idProperty; };
            LaLoanEligibleInformationGrid.prototype.getLocalTextPrefix = function () { return Setup.LaLoanEligibleInformationRow.localTextPrefix; };
            LaLoanEligibleInformationGrid.prototype.getService = function () { return Setup.LaLoanEligibleInformationService.baseUrl; };
            LaLoanEligibleInformationGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanEligibleInformationGrid);
            return LaLoanEligibleInformationGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Setup.LaLoanEligibleInformationGrid = LaLoanEligibleInformationGrid;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanTypeDialog = (function (_super) {
            __extends(LaLoanTypeDialog, _super);
            function LaLoanTypeDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Setup.LaLoanTypeForm(_this.idPrefix);
                return _this;
            }
            LaLoanTypeDialog.prototype.getFormKey = function () { return Setup.LaLoanTypeForm.formKey; };
            LaLoanTypeDialog.prototype.getIdProperty = function () { return Setup.LaLoanTypeRow.idProperty; };
            LaLoanTypeDialog.prototype.getLocalTextPrefix = function () { return Setup.LaLoanTypeRow.localTextPrefix; };
            LaLoanTypeDialog.prototype.getNameProperty = function () { return Setup.LaLoanTypeRow.nameProperty; };
            LaLoanTypeDialog.prototype.getService = function () { return Setup.LaLoanTypeService.baseUrl; };
            LaLoanTypeDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanTypeDialog);
            return LaLoanTypeDialog;
        }(Serenity.EntityDialog));
        Setup.LaLoanTypeDialog = LaLoanTypeDialog;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var LaLoanTypeGrid = (function (_super) {
            __extends(LaLoanTypeGrid, _super);
            function LaLoanTypeGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanTypeGrid.prototype.getColumnsKey = function () { return 'Setup.LaLoanType'; };
            LaLoanTypeGrid.prototype.getDialogType = function () { return Setup.LaLoanTypeDialog; };
            LaLoanTypeGrid.prototype.getIdProperty = function () { return Setup.LaLoanTypeRow.idProperty; };
            LaLoanTypeGrid.prototype.getLocalTextPrefix = function () { return Setup.LaLoanTypeRow.localTextPrefix; };
            LaLoanTypeGrid.prototype.getService = function () { return Setup.LaLoanTypeService.baseUrl; };
            LaLoanTypeGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanTypeGrid);
            return LaLoanTypeGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Setup.LaLoanTypeGrid = LaLoanTypeGrid;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Setup;
    (function (Setup) {
        var selectLoanTypeDialog = (function (_super) {
            __extends(selectLoanTypeDialog, _super);
            function selectLoanTypeDialog() {
                var _this = _super.call(this) || this;
                var form = new Setup.SelectLoanTypeForm(_this.idPrefix);
                _this.dialogTitle = "Please select Loan Type";
                form.LoanTypeInformationId.value = VistaLOAN.Authorization.userDefinition.LoanTypeInformationId.toString();
                form.LoanTypeInformationId.changeSelect2(function (e) {
                    console.log(form.LoanTypeInformationId.value);
                    var entity = Setup.LaLoanTypeRow.getLookup().items.filter(function (p) { return p.Id == +form.LoanTypeInformationId.value; });
                    console.log(entity);
                    VistaLOAN.Authorization.userDefinition.LoanTypeInformationId = +form.LoanTypeInformationId.value;
                    VistaLOAN.Authorization.userDefinition.LoanTypeName = entity[0].LoanTypeName;
                    Setup.LaLoanTypeService.SetLoanType({ EntityId: form.LoanTypeInformationId.value }, function (p) {
                        Q.notifySuccess("You selected Loan: " + form.LoanTypeInformationId.text);
                        setTimeout(function () {
                            window.location.reload();
                        }, 100);
                    });
                });
                return _this;
            }
            selectLoanTypeDialog.prototype.getFormKey = function () { return Setup.SelectLoanTypeForm.formKey; };
            selectLoanTypeDialog = __decorate([
                Serenity.Decorators.registerClass()
            ], selectLoanTypeDialog);
            return selectLoanTypeDialog;
        }(Serenity.PropertyDialog));
        Setup.selectLoanTypeDialog = selectLoanTypeDialog;
    })(Setup = VistaLOAN.Setup || (VistaLOAN.Setup = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaCpfCashOrChequeCollectionDialog = (function (_super) {
            __extends(LaCpfCashOrChequeCollectionDialog, _super);
            function LaCpfCashOrChequeCollectionDialog() {
                var _this = _super.call(this) || this;
                _this.form = new Task.LaCpfCashOrChequeCollectionForm(_this.idPrefix);
                _this.form.ApplicationId.element.closest('.category').toggle(false);
                _this.form.PfOwnContribution.element.closest('.category').toggle(false);
                _this.form.ApplicationId.getGridField().toggle(false);
                _this.form.PrincipalInstallment.element.toggle(false);
                _this.form.InterestInstallment.element.toggle(false);
                _this.form.PfOwnContribution.element.toggle(false);
                return _this;
            }
            LaCpfCashOrChequeCollectionDialog.prototype.getFormKey = function () { return Task.LaCpfCashOrChequeCollectionForm.formKey; };
            LaCpfCashOrChequeCollectionDialog.prototype.getIdProperty = function () { return Task.LaCpfCashOrChequeCollectionRow.idProperty; };
            LaCpfCashOrChequeCollectionDialog.prototype.getLocalTextPrefix = function () { return Task.LaCpfCashOrChequeCollectionRow.localTextPrefix; };
            LaCpfCashOrChequeCollectionDialog.prototype.getNameProperty = function () { return Task.LaCpfCashOrChequeCollectionRow.nameProperty; };
            LaCpfCashOrChequeCollectionDialog.prototype.getService = function () { return Task.LaCpfCashOrChequeCollectionService.baseUrl; };
            LaCpfCashOrChequeCollectionDialog.prototype.onDialogOpen = function () {
                var _this = this;
                this.ShowHideCollectionType();
                if (this.isEditMode()) {
                    if (this.form.CollectionType.value == "1") {
                        this.element.find("label:contains('PF Contribution')").css("display", "none");
                    }
                    else {
                        this.element.find("label:contains('Loan Installment')").css("display", "none");
                    }
                }
                this.form.CollectionType.change(function (e) {
                    _this.ShowHideCollectionType();
                });
            };
            LaCpfCashOrChequeCollectionDialog.prototype.ShowHideCollectionType = function () {
                this.form.ApplicationId.element.closest('.category').toggle(false);
                this.form.PfOwnContribution.element.closest('.category').toggle(false);
                this.form.ApplicationId.getGridField().toggle(false);
                this.form.PrincipalInstallment.element.closest('.caption').toggle(false);
                this.form.PrincipalInstallment.element.toggle(false);
                this.form.InterestInstallment.element.closest('.caption').toggle(false);
                this.form.InterestInstallment.element.toggle(false);
                this.form.PfOwnContribution.element.closest('.caption').toggle(false);
                this.form.PfOwnContribution.element.toggle(false);
                if (this.form.CollectionType.value == "1") {
                    this.form.ApplicationId.element.closest('.category').toggle(true);
                    this.form.ApplicationId.getGridField().toggle(true);
                    this.form.PrincipalInstallment.element.toggle(true);
                    this.form.InterestInstallment.element.toggle(true);
                }
                else {
                    this.form.PfOwnContribution.element.closest('.category').toggle(true);
                    this.form.PfOwnContribution.element.toggle(true);
                }
            };
            LaCpfCashOrChequeCollectionDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaCpfCashOrChequeCollectionDialog);
            return LaCpfCashOrChequeCollectionDialog;
        }(Serenity.EntityDialog));
        Task.LaCpfCashOrChequeCollectionDialog = LaCpfCashOrChequeCollectionDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaCpfCashOrChequeCollectionGrid = (function (_super) {
            __extends(LaCpfCashOrChequeCollectionGrid, _super);
            function LaCpfCashOrChequeCollectionGrid(container) {
                return _super.call(this, container) || this;
            }
            LaCpfCashOrChequeCollectionGrid.prototype.getColumnsKey = function () { return 'Task.LaCpfCashOrChequeCollection'; };
            LaCpfCashOrChequeCollectionGrid.prototype.getDialogType = function () { return Task.LaCpfCashOrChequeCollectionDialog; };
            LaCpfCashOrChequeCollectionGrid.prototype.getIdProperty = function () { return Task.LaCpfCashOrChequeCollectionRow.idProperty; };
            LaCpfCashOrChequeCollectionGrid.prototype.getLocalTextPrefix = function () { return Task.LaCpfCashOrChequeCollectionRow.localTextPrefix; };
            LaCpfCashOrChequeCollectionGrid.prototype.getService = function () { return Task.LaCpfCashOrChequeCollectionService.baseUrl; };
            LaCpfCashOrChequeCollectionGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaCpfCashOrChequeCollectionGrid);
            return LaCpfCashOrChequeCollectionGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaCpfCashOrChequeCollectionGrid = LaCpfCashOrChequeCollectionGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationDialog = (function (_super) {
            __extends(LaLoanApplicationDialog, _super);
            function LaLoanApplicationDialog() {
                var _this = _super.call(this) || this;
                _this.form = new Task.LaLoanApplicationForm(_this.idPrefix);
                _this.form.LoanCriteriaId.changeSelect2(function (e) {
                    var count;
                    var loanTypeId;
                    var loanTypeName;
                    var EmpWiseLoanId;
                    Task.LaLoanApplicationService.List({}, function (r) {
                        loanTypeId = VistaLOAN.Setup.LaLoanCriteriaRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.LoanCriteriaId.value; })[0].LoanTypeId;
                        loanTypeName = VistaLOAN.Setup.LaLoanTypeRow.getLookup().items.filter(function (x) { return x.Id == loanTypeId; })[0].ShortCode;
                        var lastLoanNo = 0;
                        VistaLOAN.Setup.LaLoanApplicationLastNumberService.List({}, function (s) {
                            lastLoanNo = s.Entities.filter(function (x) { return x.LoanCriteriaId == +_this.form.LoanCriteriaId.value; })[0].LastLoanNumber;
                            var font = ("00000" + (lastLoanNo + 1)).slice(-5);
                            ;
                            _this.form.LoanNo.value = loanTypeName + font;
                        });
                        EmpWiseLoanId = r.Entities.filter(function (x) { return x.LoanCriteriaId == +_this.form.LoanCriteriaId.value && x.EmployeeId == +_this.form.EmployeeId.value; });
                        if (EmpWiseLoanId.length > 0) {
                            _this.form.EmployeeWiseLoanId.value = EmpWiseLoanId[EmpWiseLoanId.length - 1].EmployeeWiseLoanId + 1;
                        }
                        else {
                            _this.form.EmployeeWiseLoanId.value = 1;
                        }
                        if (loanTypeName == "PFL") {
                            $(".PFLoanType").show();
                            $(".EmpOwnContribution").show();
                            $(".EmpOwnInterest").show();
                            $(".CompanyContribution").show();
                            $(".CompanyInterest").show();
                            _this.form.PFLoanType.value = "Refundable";
                            _this.GetCPFContribution();
                        }
                        else {
                            $(".PFLoanType").hide();
                            $(".EmpOwnContribution").hide();
                            $(".EmpOwnInterest").hide();
                            $(".CompanyContribution").hide();
                            $(".CompanyInterest").hide();
                            _this.form.PFLoanType.value = "";
                        }
                    });
                });
                _this.form.PFLoanType.changeSelect2(function (e) {
                    if (_this.form.PFLoanType.value == "Refundable") {
                        $(".NonRefundPFOwnLoanAmount").hide();
                        $(".NonRefundPFCompanyLoanAmount").hide();
                        $(".NonRefundOwnInterestLoanAmount").hide();
                        $(".NonRefundCompanyInterestLoanAmount").hide();
                    }
                    else {
                        $(".NonRefundPFOwnLoanAmount").show();
                        $(".NonRefundPFCompanyLoanAmount").show();
                        $(".NonRefundOwnInterestLoanAmount").show();
                        $(".NonRefundCompanyInterestLoanAmount").show();
                    }
                });
                _this.form.ApplyDate.change(function (e) {
                    _this.GetCPFContribution();
                });
                _this.form.ApplyLoanAmount.change(function (e) {
                    if (_this.form.LoanCriteriaId.value == "" || _this.form.LoanCriteriaId.value == "0") {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please select Loan Criteria first !");
                        return;
                    }
                    if (_this.form.ApplyDate.value == "" || _this.form.ApplyDate.value == null) {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please fill up Application Date first !");
                        return;
                    }
                    if (_this.form.PFLoanType.value == "Refundable") {
                        var applicableOwnContributionAmount = _this.form.EmpOwnContribution.value * (.80);
                        if (_this.form.ApplyLoanAmount.value > applicableOwnContributionAmount) {
                            _this.form.ApplyLoanAmount.value = 0;
                            Q.notifyWarning("Loan Amount will not more than 80% of Own Contribution!");
                            return;
                        }
                    }
                    else if (_this.form.PFLoanType.value == "Non-Refundable") {
                        var applicableTotalContributionAmount = (_this.form.EmpOwnContribution.value + _this.form.EmpOwnInterest.value + _this.form.CompanyContribution.value + _this.form.CompanyInterest.value) * (.60);
                        if (_this.form.ApplyLoanAmount.value > applicableTotalContributionAmount) {
                            _this.form.ApplyLoanAmount.value = 0;
                            Q.notifyWarning("Loan Amount will not more than 60% of Total Contribution!");
                            return;
                        }
                        _this.form.NonRefundPFOwnLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundPFCompanyLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundOwnInterestLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundCompanyInterestLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                    }
                });
                return _this;
            }
            LaLoanApplicationDialog.prototype.getFormKey = function () { return Task.LaLoanApplicationForm.formKey; };
            LaLoanApplicationDialog.prototype.getIdProperty = function () { return Task.LaLoanApplicationRow.idProperty; };
            LaLoanApplicationDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanApplicationRow.localTextPrefix; };
            LaLoanApplicationDialog.prototype.getNameProperty = function () { return Task.LaLoanApplicationRow.nameProperty; };
            LaLoanApplicationDialog.prototype.getService = function () { return Task.LaLoanApplicationService.baseUrl; };
            LaLoanApplicationDialog.prototype.onDialogOpen = function () {
                var _this = this;
                _super.prototype.onDialogOpen.call(this);
                $(".PFLoanType").hide();
                $(".NonRefundPFOwnLoanAmount").hide();
                $(".NonRefundPFCompanyLoanAmount").hide();
                $(".NonRefundOwnInterestLoanAmount").hide();
                $(".NonRefundCompanyInterestLoanAmount").hide();
                $(".EmpOwnContribution").hide();
                $(".EmpOwnInterest").hide();
                $(".CompanyContribution").hide();
                $(".CompanyInterest").hide();
                // sign
                var fieldButt = $('.Sign')[0];
                fieldButt.innerHTML = '<level style="padding-left: 6px;">Signature</level></br><img src="' + this.form.Signature.value + '" style = "width:13%">';
                if (!this.isNew) {
                    var loanTypeId = VistaLOAN.Setup.LaLoanCriteriaRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.LoanCriteriaId.value; })[0].LoanTypeId;
                    var loanSortName = VistaLOAN.Setup.LaLoanTypeRow.getLookup().items.filter(function (x) { return x.Id == loanTypeId; })[0].ShortCode;
                    if (loanSortName == "PFL") {
                        $(".PFLoanType").show();
                        if (this.form.PFLoanType.value == "Refundable") {
                            $(".NonRefundPFOwnLoanAmount").hide();
                            $(".NonRefundPFCompanyLoanAmount").hide();
                            $(".NonRefundOwnInterestLoanAmount").hide();
                            $(".NonRefundCompanyInterestLoanAmount").hide();
                        }
                        else {
                            $(".NonRefundPFOwnLoanAmount").show();
                            $(".NonRefundPFCompanyLoanAmount").show();
                            $(".NonRefundOwnInterestLoanAmount").show();
                            $(".NonRefundCompanyInterestLoanAmount").show();
                        }
                    }
                    else {
                        $(".PFLoanType").hide();
                    }
                }
            };
            LaLoanApplicationDialog.prototype.GetCPFContribution = function () {
                var _this = this;
                var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var date = new Date(this.form.ApplyDate.value);
                Task.LaLoanApplicationService.GetCPFContribution({ EmployeeId: +this.form.EmployeeId.value, Year: date.getFullYear().toString(), Month: "'" + monthNames[date.getMonth()] + "'" }, function (r) {
                    _this.form.EmpOwnContribution.value = r.EmpCoreContribution;
                    _this.form.EmpOwnInterest.value = r.EmpProfit;
                    _this.form.CompanyContribution.value = r.ComCoreContribution;
                    _this.form.CompanyInterest.value = r.ComProfit;
                });
            };
            ;
            LaLoanApplicationDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive(),
                Serenity.Decorators.panel()
            ], LaLoanApplicationDialog);
            return LaLoanApplicationDialog;
        }(Serenity.EntityDialog));
        Task.LaLoanApplicationDialog = LaLoanApplicationDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationGrid = (function (_super) {
            __extends(LaLoanApplicationGrid, _super);
            function LaLoanApplicationGrid(container) {
                var _this = _super.call(this, container) || this;
                _this.userInfo = VistaLOAN.Authorization.userDefinition;
                _this.empInfo = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == _this.userInfo.EmpId; })[0];
                return _this;
            }
            LaLoanApplicationGrid.prototype.getColumnsKey = function () { return 'Task.LaLoanApplication'; };
            LaLoanApplicationGrid.prototype.getDialogType = function () { return Task.LaLoanApplicationDialog; };
            LaLoanApplicationGrid.prototype.getIdProperty = function () { return Task.LaLoanApplicationRow.idProperty; };
            LaLoanApplicationGrid.prototype.getLocalTextPrefix = function () { return Task.LaLoanApplicationRow.localTextPrefix; };
            LaLoanApplicationGrid.prototype.getService = function () { return Task.LaLoanApplicationService.baseUrl; };
            LaLoanApplicationGrid.prototype.onViewSubmit = function () {
                if (!_super.prototype.onViewSubmit.call(this)) {
                    return false;
                }
                var request = this.view.params;
                request.Criteria = Serenity.Criteria.and(request.Criteria, [['EmployeeId'], '=', this.empInfo.Id], [['IsOffLine'], '=', '0']);
                return true;
            };
            LaLoanApplicationGrid.prototype.addButtonClick = function () {
                var _this = this;
                console.log(this.userInfo);
                var empSignature = VistaLOAN.HRM.EmpPhotoRow.getLookup().items.filter(function (x) { return x.EmployeeId == _this.userInfo.EmpId && x.IsPhoto == false; })[0];
                console.log(empSignature);
                var sign = '';
                if (empSignature != undefined)
                    sign = 'data:image/jpeg;base64,' + empSignature.PhotoSignature;
                this.editItem({
                    EmpId: this.empInfo.LookupText,
                    EmployeeName: this.empInfo.LookupText,
                    EmployeeId: this.empInfo.Id,
                    AppStatusId: 3,
                    Signature: sign
                });
            };
            LaLoanApplicationGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanApplicationGrid);
            return LaLoanApplicationGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaLoanApplicationGrid = LaLoanApplicationGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationOfflineDialog = (function (_super) {
            __extends(LaLoanApplicationOfflineDialog, _super);
            function LaLoanApplicationOfflineDialog() {
                var _this = _super.call(this) || this;
                _this.form = new Task.LaLoanApplicationOfflineForm(_this.idPrefix);
                _this.form.LoanCriteriaId.changeSelect2(function (e) {
                    var count;
                    var loanTypeId;
                    var loanTypeName;
                    var EmpWiseLoanId;
                    if (_this.form.EmployeeId.value == "" || _this.form.EmployeeId.value == null) {
                        _this.form.LoanCriteriaId.value = "";
                        Q.notifyWarning("Please select Employee first !");
                        return;
                    }
                    Task.LaLoanApplicationService.List({}, function (r) {
                        loanTypeId = VistaLOAN.Setup.LaLoanCriteriaRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.LoanCriteriaId.value; })[0].LoanTypeId;
                        loanTypeName = VistaLOAN.Setup.LaLoanTypeRow.getLookup().items.filter(function (x) { return x.Id == loanTypeId; })[0].ShortCode;
                        var lastLoanNo = 0;
                        VistaLOAN.Setup.LaLoanApplicationLastNumberService.List({}, function (s) {
                            lastLoanNo = s.Entities.filter(function (x) { return x.LoanCriteriaId == +_this.form.LoanCriteriaId.value; })[0].LastLoanNumber;
                            var font = ("00000" + (lastLoanNo + 1)).slice(-5);
                            ;
                            _this.form.LoanNo.value = loanTypeName + font;
                        });
                        EmpWiseLoanId = r.Entities.filter(function (x) { return x.LoanCriteriaId == +_this.form.LoanCriteriaId.value && x.EmployeeId == +_this.form.EmployeeId.value; });
                        if (EmpWiseLoanId.length > 0) {
                            _this.form.EmployeeWiseLoanId.value = EmpWiseLoanId[EmpWiseLoanId.length - 1].EmployeeWiseLoanId + 1;
                        }
                        else {
                            _this.form.EmployeeWiseLoanId.value = 1;
                        }
                        if (loanTypeName == "PFL") {
                            $(".PFLoanType").show();
                            $(".EmpOwnContribution").show();
                            $(".EmpOwnInterest").show();
                            $(".CompanyContribution").show();
                            $(".CompanyInterest").show();
                            _this.form.PFLoanType.value = "Refundable";
                            _this.GetCPFContribution();
                            _this.GetCPFPolicy();
                            var joiningDate = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; })[0].DateofJoining;
                            var serviceLength = _this.GetDateDifference(joiningDate);
                            _this.GetForfeitedRule(serviceLength);
                        }
                        else {
                            $(".PFLoanType").hide();
                            $(".EmpOwnContribution").hide();
                            $(".EmpOwnInterest").hide();
                            $(".CompanyContribution").hide();
                            $(".CompanyInterest").hide();
                            _this.form.PFLoanType.value = "";
                        }
                    });
                });
                _this.form.IsApprovalProcess.element.click(function (e) {
                    if (_this.form.IsApprovalProcess.value) {
                        _this.form.AppStatusId.value = "6";
                    }
                    else {
                        _this.form.AppStatusId.value = "3";
                    }
                });
                _this.form.PFLoanType.changeSelect2(function (e) {
                    if (_this.form.PFLoanType.value == "Refundable") {
                        $(".NonRefundPFOwnLoanAmount").hide();
                        $(".NonRefundPFCompanyLoanAmount").hide();
                        $(".NonRefundOwnInterestLoanAmount").hide();
                        $(".NonRefundCompanyInterestLoanAmount").hide();
                    }
                    else if (_this.form.PFLoanType.value == "Non-Refundable") {
                        var birthDate = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; })[0].DateofBirth;
                        var age = _this.GetDateDifference(birthDate);
                        if (age < _this.NRfMinimumAge) {
                            Q.notifyWarning("Applicant age is not applicable for Non-Refundable Loan!");
                            return;
                        }
                        $(".NonRefundPFOwnLoanAmount").show();
                        $(".NonRefundPFCompanyLoanAmount").show();
                        $(".NonRefundOwnInterestLoanAmount").show();
                        $(".NonRefundCompanyInterestLoanAmount").show();
                    }
                    else {
                        $(".NonRefundPFOwnLoanAmount").show();
                        $(".NonRefundPFCompanyLoanAmount").show();
                        $(".NonRefundOwnInterestLoanAmount").show();
                        $(".NonRefundCompanyInterestLoanAmount").show();
                    }
                    _this.form.ApplyLoanAmount.value = 0;
                    _this.form.NonRefundPFOwnLoanAmount.value = 0;
                    _this.form.NonRefundPFCompanyLoanAmount.value = 0;
                    _this.form.NonRefundOwnInterestLoanAmount.value = 0;
                    _this.form.NonRefundCompanyInterestLoanAmount.value = 0;
                });
                _this.form.EmployeeId.changeSelect2(function (e) {
                    _this.EmployeeInfo = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; });
                    _this.GetCPFContribution();
                });
                _this.form.ApplyDate.change(function (e) {
                    _this.GetCPFContribution();
                });
                _this.form.ApplyLoanAmount.change(function (e) {
                    if (_this.form.EmployeeId.value == "" || _this.form.EmployeeId.value == null) {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please select Employee first !");
                        return;
                    }
                    if (_this.form.LoanCriteriaId.value == "" || _this.form.LoanCriteriaId.value == "0") {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please select Loan Criteria first !");
                        return;
                    }
                    if (_this.form.ApplyDate.value == "" || _this.form.ApplyDate.value == null) {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please fill up Application Date first !");
                        return;
                    }
                    if (_this.form.PFLoanType.value == "Refundable") {
                        var joiningDate = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; })[0].DateofJoining;
                        var service = _this.GetDateDifference(joiningDate);
                        if (_this.RfMinServiceYear <= service) {
                            var applicableLoanAmount = 0;
                            if (_this.RfApplicableFor == "Own Contribution") {
                                applicableLoanAmount = _this.form.EmpOwnContribution.value * (_this.RfLoanPercentage / 100);
                            }
                            else {
                                applicableLoanAmount = (_this.form.EmpOwnContribution.value + _this.form.EmpOwnInterest.value + _this.form.CompanyContribution.value + _this.form.CompanyInterest.value) * (_this.RfLoanPercentage / 100);
                            }
                            if (_this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                                _this.form.ApplyLoanAmount.value = 0;
                                Q.notifyWarning("Loan Amount will not more than " + _this.RfLoanPercentage + " % of " + _this.RfApplicableFor + "!");
                                return;
                            }
                        }
                        else {
                            Q.notifyWarning("Applicant Service Length is not applicable for PF Refundable Loan!");
                            return;
                        }
                    }
                    else if (_this.form.PFLoanType.value == "Non-Refundable") {
                        var applicableLoanAmount = 0;
                        if (_this.NRfApplicableFor == "Own Contribution") {
                            applicableLoanAmount = _this.form.EmpOwnContribution.value * (_this.RfLoanPercentage / 100);
                        }
                        else {
                            applicableLoanAmount = (_this.form.EmpOwnContribution.value + _this.form.EmpOwnInterest.value + _this.form.CompanyContribution.value + _this.form.CompanyInterest.value) * (_this.RfLoanPercentage / 100);
                        }
                        if (_this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                            _this.form.ApplyLoanAmount.value = 0;
                            Q.notifyWarning("Loan Amount will not more than " + _this.NRfLoanPercentage + "% of " + _this.RfApplicableFor + "!");
                            return;
                        }
                        _this.form.NonRefundPFOwnLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundPFCompanyLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundOwnInterestLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundCompanyInterestLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                    }
                    else {
                        console.log(_this.ForfeitedRate);
                        var applicableLoanAmount = 0;
                        applicableLoanAmount = (_this.form.EmpOwnContribution.value + _this.form.EmpOwnInterest.value + _this.form.CompanyContribution.value + _this.form.CompanyInterest.value) * (_this.ForfeitedRate / 100);
                        console.log(applicableLoanAmount);
                        if (_this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                            _this.form.ApplyLoanAmount.value = 0;
                            Q.notifyWarning("Loan Amount will not more than " + _this.ForfeitedRate + "% of Total Amount !");
                            return;
                        }
                        //this.form.NonRefundPFOwnLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                        //this.form.NonRefundPFCompanyLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                        //this.form.NonRefundOwnInterestLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                        //this.form.NonRefundCompanyInterestLoanAmount.value = this.form.ApplyLoanAmount.value / 4;
                    }
                });
                return _this;
            }
            LaLoanApplicationOfflineDialog.prototype.getFormKey = function () { return Task.LaLoanApplicationOfflineForm.formKey; };
            LaLoanApplicationOfflineDialog.prototype.getIdProperty = function () { return Task.LaLoanApplicationRow.idProperty; };
            LaLoanApplicationOfflineDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanApplicationRow.localTextPrefix; };
            LaLoanApplicationOfflineDialog.prototype.getNameProperty = function () { return Task.LaLoanApplicationRow.nameProperty; };
            LaLoanApplicationOfflineDialog.prototype.getService = function () { return Task.LaLoanApplicationService.baseUrl; };
            //protected validateBeforeSave() {
            //    if (!this.validateForm()) return false;
            //    var result = super.validateBeforeSave();
            //    if (!result) return false;
            //    if (this.form.PostingFinancialYearId.value == "0") {
            //        Q.alert("Accounting Period not found!");
            //        return false;
            //    }
            //    return result;
            //}
            LaLoanApplicationOfflineDialog.prototype.onDialogOpen = function () {
                var _this = this;
                _super.prototype.onDialogOpen.call(this);
                $(".PFLoanType").hide();
                $(".NonRefundPFOwnLoanAmount").hide();
                $(".NonRefundPFCompanyLoanAmount").hide();
                $(".NonRefundOwnInterestLoanAmount").hide();
                $(".NonRefundCompanyInterestLoanAmount").hide();
                $(".EmpOwnContribution").hide();
                $(".EmpOwnInterest").hide();
                $(".CompanyContribution").hide();
                $(".CompanyInterest").hide();
                if (!this.isNew()) {
                    var loanTypeId = VistaLOAN.Setup.LaLoanCriteriaRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.LoanCriteriaId.value; })[0].LoanTypeId;
                    var loanSortName = VistaLOAN.Setup.LaLoanTypeRow.getLookup().items.filter(function (x) { return x.Id == loanTypeId; })[0].ShortCode;
                    console.log(loanSortName);
                    if (loanSortName == "PFL") {
                        $(".PFLoanType").show();
                        if (this.form.PFLoanType.value == "Refundable") {
                            $(".NonRefundPFOwnLoanAmount").hide();
                            $(".NonRefundPFCompanyLoanAmount").hide();
                            $(".NonRefundOwnInterestLoanAmount").hide();
                            $(".NonRefundCompanyInterestLoanAmount").hide();
                        }
                        else {
                            $(".NonRefundPFOwnLoanAmount").show();
                            $(".NonRefundPFCompanyLoanAmount").show();
                            $(".NonRefundOwnInterestLoanAmount").show();
                            $(".NonRefundCompanyInterestLoanAmount").show();
                        }
                    }
                    else {
                        $(".PFLoanType").hide();
                    }
                }
            };
            LaLoanApplicationOfflineDialog.prototype.ToggleNonRefundFields = function (Boolean) {
            };
            LaLoanApplicationOfflineDialog.prototype.GetCPFContribution = function () {
                var _this = this;
                var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var date = new Date(this.form.ApplyDate.value);
                console.log(monthNames[date.getMonth()]);
                console.log(date.getFullYear().toString());
                Task.LaLoanApplicationService.GetCPFContribution({ EmployeeId: +this.form.EmployeeId.value, Year: date.getFullYear().toString(), Month: "'" + monthNames[date.getMonth()] + "'" }, function (r) {
                    _this.form.EmpOwnContribution.value = r.EmpCoreContribution;
                    _this.form.EmpOwnInterest.value = r.EmpProfit;
                    _this.form.CompanyContribution.value = r.ComCoreContribution;
                    _this.form.CompanyInterest.value = r.ComProfit;
                });
            };
            ;
            LaLoanApplicationOfflineDialog.prototype.GetCPFPolicy = function () {
                var _this = this;
                Task.LaLoanApplicationService.GetCPFPolicy({ ApplicationDate: this.form.ApplyDate.value }, function (r) {
                    _this.NRfApplicableFor = r.NRfApplicableFor;
                    _this.NRfLoanPercentage = r.NRfLoanPercentage;
                    _this.NRfMinimumAge = r.NRfMinimumAge;
                    _this.RfApplicableFor = r.RfApplicableFor;
                    _this.RfLoanPercentage = r.RfLoanPercentage;
                    _this.RfMinServiceYear = r.RfMinServiceYear;
                });
            };
            ;
            LaLoanApplicationOfflineDialog.prototype.GetForfeitedRule = function (serviceLength) {
                var _this = this;
                Task.LaLoanApplicationService.GetForfeitedRule({ ServiceLength: serviceLength }, function (r) {
                    _this.ForfeitedRate = r.ForfeitedRate;
                });
            };
            ;
            LaLoanApplicationOfflineDialog.prototype.GetDateDifference = function (ddate) {
                var currentDate = new Date();
                var j = new Date(ddate);
                var differ = Math.round(((Math.abs(currentDate.valueOf() - j.valueOf())) / (1000 * 3600 * 24)) / 365).toFixed(2);
                return +differ;
            };
            LaLoanApplicationOfflineDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive(),
                Serenity.Decorators.panel()
            ], LaLoanApplicationOfflineDialog);
            return LaLoanApplicationOfflineDialog;
        }(Serenity.EntityDialog));
        Task.LaLoanApplicationOfflineDialog = LaLoanApplicationOfflineDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanApplicationOfflineGrid = (function (_super) {
            __extends(LaLoanApplicationOfflineGrid, _super);
            function LaLoanApplicationOfflineGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanApplicationOfflineGrid.prototype.getColumnsKey = function () { return 'Task.LaLoanApplicationOffline'; };
            LaLoanApplicationOfflineGrid.prototype.getDialogType = function () { return Task.LaLoanApplicationOfflineDialog; };
            LaLoanApplicationOfflineGrid.prototype.getIdProperty = function () { return Task.LaLoanApplicationRow.idProperty; };
            LaLoanApplicationOfflineGrid.prototype.getLocalTextPrefix = function () { return Task.LaLoanApplicationRow.localTextPrefix; };
            LaLoanApplicationOfflineGrid.prototype.getService = function () { return Task.LaLoanApplicationService.baseUrl; };
            //protected getColumns(): Slick.Column[] {
            //    var columns = super.getColumns();         
            //    // It is using to change backcolor of approved voucher.
            //    Q.first(columns, x => x.field == fld.I).cssClass += " col-Approve-Status";
            //    return columns;
            //}
            LaLoanApplicationOfflineGrid.prototype.onViewSubmit = function () {
                if (!_super.prototype.onViewSubmit.call(this)) {
                    return false;
                }
                var request = this.view.params;
                request.Criteria = Serenity.Criteria.and(request.Criteria, [['IsOffLine'], '=', '1']);
                return true;
            };
            LaLoanApplicationOfflineGrid.prototype.addButtonClick = function () {
                this.editItem({
                    AppStatusId: 3
                });
            };
            LaLoanApplicationOfflineGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanApplicationOfflineGrid);
            return LaLoanApplicationOfflineGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaLoanApplicationOfflineGrid = LaLoanApplicationOfflineGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanCircularInformationDialog = (function (_super) {
            __extends(LaLoanCircularInformationDialog, _super);
            function LaLoanCircularInformationDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaLoanCircularInformationForm(_this.idPrefix);
                return _this;
            }
            LaLoanCircularInformationDialog.prototype.getFormKey = function () { return Task.LaLoanCircularInformationForm.formKey; };
            LaLoanCircularInformationDialog.prototype.getIdProperty = function () { return Task.LaLoanCircularInformationRow.idProperty; };
            LaLoanCircularInformationDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanCircularInformationRow.localTextPrefix; };
            LaLoanCircularInformationDialog.prototype.getNameProperty = function () { return Task.LaLoanCircularInformationRow.nameProperty; };
            LaLoanCircularInformationDialog.prototype.getService = function () { return Task.LaLoanCircularInformationService.baseUrl; };
            LaLoanCircularInformationDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanCircularInformationDialog);
            return LaLoanCircularInformationDialog;
        }(Serenity.EntityDialog));
        Task.LaLoanCircularInformationDialog = LaLoanCircularInformationDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanCircularInformationGrid = (function (_super) {
            __extends(LaLoanCircularInformationGrid, _super);
            function LaLoanCircularInformationGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanCircularInformationGrid.prototype.getColumnsKey = function () { return 'Task.LaLoanCircularInformation'; };
            LaLoanCircularInformationGrid.prototype.getDialogType = function () { return Task.LaLoanCircularInformationDialog; };
            LaLoanCircularInformationGrid.prototype.getIdProperty = function () { return Task.LaLoanCircularInformationRow.idProperty; };
            LaLoanCircularInformationGrid.prototype.getLocalTextPrefix = function () { return Task.LaLoanCircularInformationRow.localTextPrefix; };
            LaLoanCircularInformationGrid.prototype.getService = function () { return Task.LaLoanCircularInformationService.baseUrl; };
            LaLoanCircularInformationGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanCircularInformationGrid);
            return LaLoanCircularInformationGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaLoanCircularInformationGrid = LaLoanCircularInformationGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDialog = (function (_super) {
            __extends(LaLoanIssueDialog, _super);
            //public loanApplicationRow: LaLoanApplicationRow[];
            function LaLoanIssueDialog(container) {
                var _this = _super.call(this, container) || this;
                _this.form = new Task.LaLoanIssueForm(_this.idPrefix);
                _this.form.LoanApplicationId.changeSelect2(function (e) {
                    var loanApplication;
                    var loanTypeName;
                    var EmpWiseLoanId;
                    Task.LaLoanApplicationService.List({}, function (r) {
                        loanApplication = r.Entities.filter(function (x) { return x.Id == +_this.form.LoanApplicationId.value; })[0];
                        _this.form.LoanAmount.value = loanApplication.GrantedLoanAmount;
                        _this.form.InterestAmount.value = loanApplication.GrantedInterestAmount;
                    });
                });
                _this.form.EmployeeId.changeSelect2(function (e) {
                    _this.LoanApplication();
                });
                return _this;
            }
            LaLoanIssueDialog.prototype.getFormKey = function () { return Task.LaLoanIssueForm.formKey; };
            LaLoanIssueDialog.prototype.getIdProperty = function () { return Task.LaLoanIssueRow.idProperty; };
            LaLoanIssueDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanIssueRow.localTextPrefix; };
            LaLoanIssueDialog.prototype.getNameProperty = function () { return Task.LaLoanIssueRow.nameProperty; };
            LaLoanIssueDialog.prototype.getService = function () { return Task.LaLoanIssueService.baseUrl; };
            LaLoanIssueDialog.prototype.LoanApplication = function () {
                var _this = this;
                var loanApplicationRow = Task.LaLoanApplicationRow.getLookup().items.filter(function (x) { return x.EmployeeId == +_this.form.EmployeeId.value && x.AppStatusId == 6 && x.IsIssue == false; });
                this.form.LoanApplicationId.clearItems();
                for (var _i = 0, loanApplicationRow_1 = loanApplicationRow; _i < loanApplicationRow_1.length; _i++) {
                    var item = loanApplicationRow_1[_i];
                    this.form.LoanApplicationId.addItem({
                        id: item.Id.toString(),
                        text: item.LoanNo,
                        source: null,
                        disabled: false
                    });
                }
            };
            LaLoanIssueDialog.prototype.onDialogOpen = function () {
                var _this = this;
                if (this.isEditMode) {
                    if (this.entity.LoanApplicationId != undefined)
                        this.form.EmployeeId.value = Task.LaLoanApplicationRow.getLookup().items.filter(function (x) { return x.Id == _this.entity.LoanApplicationId; })[0].EmployeeId.toString();
                }
                if (this.isNew()) {
                    console.log("OK");
                    $("div.field.LastPrincipalInstallmentAmount").hide();
                    $("div.field.LastInterestInstallmentAmount").hide();
                    $("div.field.CloseDate").hide();
                }
            };
            LaLoanIssueDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanIssueDialog);
            return LaLoanIssueDialog;
        }(Serenity.EntityDialog));
        Task.LaLoanIssueDialog = LaLoanIssueDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueGrid = (function (_super) {
            __extends(LaLoanIssueGrid, _super);
            function LaLoanIssueGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanIssueGrid.prototype.getColumnsKey = function () { return 'Task.LaLoanIssue'; };
            LaLoanIssueGrid.prototype.getDialogType = function () { return Task.LaLoanIssueDialog; };
            LaLoanIssueGrid.prototype.getIdProperty = function () { return Task.LaLoanIssueRow.idProperty; };
            LaLoanIssueGrid.prototype.getLocalTextPrefix = function () { return Task.LaLoanIssueRow.localTextPrefix; };
            LaLoanIssueGrid.prototype.getService = function () { return Task.LaLoanIssueService.baseUrl; };
            LaLoanIssueGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanIssueGrid);
            return LaLoanIssueGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaLoanIssueGrid = LaLoanIssueGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailDialog = (function (_super) {
            __extends(LaLoanIssueDetailDialog, _super);
            function LaLoanIssueDetailDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaLoanIssueDetailForm(_this.idPrefix);
                return _this;
            }
            LaLoanIssueDetailDialog.prototype.getFormKey = function () { return Task.LaLoanIssueDetailForm.formKey; };
            LaLoanIssueDetailDialog.prototype.getIdProperty = function () { return Task.LaLoanIssueDetailRow.idProperty; };
            LaLoanIssueDetailDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanIssueDetailRow.localTextPrefix; };
            LaLoanIssueDetailDialog.prototype.getNameProperty = function () { return Task.LaLoanIssueDetailRow.nameProperty; };
            LaLoanIssueDetailDialog.prototype.getService = function () { return Task.LaLoanIssueDetailService.baseUrl; };
            LaLoanIssueDetailDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanIssueDetailDialog);
            return LaLoanIssueDetailDialog;
        }(Serenity.EntityDialog));
        Task.LaLoanIssueDetailDialog = LaLoanIssueDetailDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailEditor = (function (_super) {
            __extends(LaLoanIssueDetailEditor, _super);
            function LaLoanIssueDetailEditor(container) {
                return _super.call(this, container) || this;
            }
            LaLoanIssueDetailEditor.prototype.getColumnsKey = function () { return 'Task.LaLoanIssueDetail'; };
            LaLoanIssueDetailEditor.prototype.getDialogType = function () { return Task.LaLoanIssueDetailEditorDialog; };
            LaLoanIssueDetailEditor.prototype.getLocalTextPrefix = function () { return Task.LaLoanIssueDetailRow.localTextPrefix; };
            LaLoanIssueDetailEditor = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanIssueDetailEditor);
            return LaLoanIssueDetailEditor;
        }(VistaLOAN.GridEditorBase));
        Task.LaLoanIssueDetailEditor = LaLoanIssueDetailEditor;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailEditorDialog = (function (_super) {
            __extends(LaLoanIssueDetailEditorDialog, _super);
            function LaLoanIssueDetailEditorDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaLoanIssueDetailForm(_this.idPrefix);
                return _this;
            }
            LaLoanIssueDetailEditorDialog.prototype.getFormKey = function () { return Task.LaLoanIssueDetailForm.formKey; };
            LaLoanIssueDetailEditorDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanIssueDetailRow.localTextPrefix; };
            LaLoanIssueDetailEditorDialog.prototype.getNameProperty = function () { return Task.LaLoanIssueDetailRow.nameProperty; };
            LaLoanIssueDetailEditorDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanIssueDetailEditorDialog);
            return LaLoanIssueDetailEditorDialog;
        }(VistaLOAN.GridEditorDialog));
        Task.LaLoanIssueDetailEditorDialog = LaLoanIssueDetailEditorDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanIssueDetailGrid = (function (_super) {
            __extends(LaLoanIssueDetailGrid, _super);
            function LaLoanIssueDetailGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanIssueDetailGrid.prototype.getColumnsKey = function () { return 'Task.LaLoanIssueDetail'; };
            LaLoanIssueDetailGrid.prototype.getDialogType = function () { return Task.LaLoanIssueDetailDialog; };
            LaLoanIssueDetailGrid.prototype.getIdProperty = function () { return Task.LaLoanIssueDetailRow.idProperty; };
            LaLoanIssueDetailGrid.prototype.getLocalTextPrefix = function () { return Task.LaLoanIssueDetailRow.localTextPrefix; };
            LaLoanIssueDetailGrid.prototype.getService = function () { return Task.LaLoanIssueDetailService.baseUrl; };
            LaLoanIssueDetailGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanIssueDetailGrid);
            return LaLoanIssueDetailGrid;
        }(Serenity.EntityGrid));
        Task.LaLoanIssueDetailGrid = LaLoanIssueDetailGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanOpeningDialog = (function (_super) {
            __extends(LaLoanOpeningDialog, _super);
            function LaLoanOpeningDialog() {
                var _this = _super.call(this) || this;
                _this.form = new Task.LaLoanOpeningForm(_this.idPrefix);
                var LoanApp;
                Task.LaLoanApplicationService.List({}, function (r) {
                    LoanApp = r.Entities.filter(function (x) { return x.Id == +_this.form.LoanApplicationId.value; })[0];
                    _this.form.LoanAmount.value = LoanApp.GrantedLoanAmount;
                    _this.form.InterestAmount.value = LoanApp.GrantedInterestAmount;
                });
                return _this;
            }
            LaLoanOpeningDialog.prototype.getFormKey = function () { return Task.LaLoanOpeningForm.formKey; };
            LaLoanOpeningDialog.prototype.getIdProperty = function () { return Task.LaLoanOpeningRow.idProperty; };
            LaLoanOpeningDialog.prototype.getLocalTextPrefix = function () { return Task.LaLoanOpeningRow.localTextPrefix; };
            LaLoanOpeningDialog.prototype.getNameProperty = function () { return Task.LaLoanOpeningRow.nameProperty; };
            LaLoanOpeningDialog.prototype.getService = function () { return Task.LaLoanOpeningService.baseUrl; };
            LaLoanOpeningDialog.prototype.onDialogOpen = function () {
                var _this = this;
                _super.prototype.onDialogOpen.call(this);
                this.form.LoanApplicationId.changeSelect2(function (e) {
                    var LoanApp;
                    Task.LaLoanApplicationService.List({}, function (r) {
                        LoanApp = r.Entities.filter(function (x) { return x.Id == +_this.form.LoanApplicationId.value; })[0];
                        _this.form.LoanAmount.value = LoanApp.GrantedLoanAmount;
                        _this.form.InterestAmount.value = LoanApp.GrantedInterestAmount;
                    });
                });
                this.form.PrincipalPaidAmount.change(function (e) {
                    _this.form.PrincipalDueAmount.value = _this.form.LoanAmount.value - _this.form.PrincipalPaidAmount.value;
                });
                this.form.InterestPaidAmount.change(function (e) {
                    _this.form.InterestDueAmount.value = _this.form.InterestAmount.value - _this.form.InterestPaidAmount.value;
                });
            };
            LaLoanOpeningDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaLoanOpeningDialog);
            return LaLoanOpeningDialog;
        }(Serenity.EntityDialog));
        Task.LaLoanOpeningDialog = LaLoanOpeningDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaLoanOpeningGrid = (function (_super) {
            __extends(LaLoanOpeningGrid, _super);
            function LaLoanOpeningGrid(container) {
                return _super.call(this, container) || this;
            }
            LaLoanOpeningGrid.prototype.getColumnsKey = function () { return 'Task.LaLoanOpening'; };
            LaLoanOpeningGrid.prototype.getDialogType = function () { return Task.LaLoanOpeningDialog; };
            LaLoanOpeningGrid.prototype.getIdProperty = function () { return Task.LaLoanOpeningRow.idProperty; };
            LaLoanOpeningGrid.prototype.getLocalTextPrefix = function () { return Task.LaLoanOpeningRow.localTextPrefix; };
            LaLoanOpeningGrid.prototype.getService = function () { return Task.LaLoanOpeningService.baseUrl; };
            LaLoanOpeningGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaLoanOpeningGrid);
            return LaLoanOpeningGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaLoanOpeningGrid = LaLoanOpeningGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDialog = (function (_super) {
            __extends(LaMonthlyLoanInstallmentDialog, _super);
            function LaMonthlyLoanInstallmentDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaMonthlyLoanInstallmentForm(_this.idPrefix);
                return _this;
            }
            LaMonthlyLoanInstallmentDialog.prototype.getFormKey = function () { return Task.LaMonthlyLoanInstallmentForm.formKey; };
            LaMonthlyLoanInstallmentDialog.prototype.getIdProperty = function () { return Task.LaMonthlyLoanInstallmentRow.idProperty; };
            LaMonthlyLoanInstallmentDialog.prototype.getLocalTextPrefix = function () { return Task.LaMonthlyLoanInstallmentRow.localTextPrefix; };
            LaMonthlyLoanInstallmentDialog.prototype.getNameProperty = function () { return Task.LaMonthlyLoanInstallmentRow.nameProperty; };
            LaMonthlyLoanInstallmentDialog.prototype.getService = function () { return Task.LaMonthlyLoanInstallmentService.baseUrl; };
            LaMonthlyLoanInstallmentDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive(),
                Serenity.Decorators.panel()
            ], LaMonthlyLoanInstallmentDialog);
            return LaMonthlyLoanInstallmentDialog;
        }(Serenity.EntityDialog));
        Task.LaMonthlyLoanInstallmentDialog = LaMonthlyLoanInstallmentDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentGrid = (function (_super) {
            __extends(LaMonthlyLoanInstallmentGrid, _super);
            function LaMonthlyLoanInstallmentGrid(container) {
                return _super.call(this, container) || this;
            }
            LaMonthlyLoanInstallmentGrid.prototype.getColumnsKey = function () { return 'Task.LaMonthlyLoanInstallment'; };
            LaMonthlyLoanInstallmentGrid.prototype.getDialogType = function () { return Task.LaMonthlyLoanInstallmentDialog; };
            LaMonthlyLoanInstallmentGrid.prototype.getIdProperty = function () { return Task.LaMonthlyLoanInstallmentRow.idProperty; };
            LaMonthlyLoanInstallmentGrid.prototype.getLocalTextPrefix = function () { return Task.LaMonthlyLoanInstallmentRow.localTextPrefix; };
            LaMonthlyLoanInstallmentGrid.prototype.getService = function () { return Task.LaMonthlyLoanInstallmentService.baseUrl; };
            LaMonthlyLoanInstallmentGrid.prototype.getButtons = function () {
                var buttons = _super.prototype.getButtons.call(this);
                buttons.length = 0;
                return buttons;
            };
            LaMonthlyLoanInstallmentGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaMonthlyLoanInstallmentGrid);
            return LaMonthlyLoanInstallmentGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaMonthlyLoanInstallmentGrid = LaMonthlyLoanInstallmentGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailDialog = (function (_super) {
            __extends(LaMonthlyLoanInstallmentDetailDialog, _super);
            function LaMonthlyLoanInstallmentDetailDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaMonthlyLoanInstallmentDetailForm(_this.idPrefix);
                return _this;
            }
            LaMonthlyLoanInstallmentDetailDialog.prototype.getFormKey = function () { return Task.LaMonthlyLoanInstallmentDetailForm.formKey; };
            LaMonthlyLoanInstallmentDetailDialog.prototype.getIdProperty = function () { return Task.LaMonthlyLoanInstallmentDetailRow.idProperty; };
            LaMonthlyLoanInstallmentDetailDialog.prototype.getLocalTextPrefix = function () { return Task.LaMonthlyLoanInstallmentDetailRow.localTextPrefix; };
            LaMonthlyLoanInstallmentDetailDialog.prototype.getNameProperty = function () { return Task.LaMonthlyLoanInstallmentDetailRow.nameProperty; };
            LaMonthlyLoanInstallmentDetailDialog.prototype.getService = function () { return Task.LaMonthlyLoanInstallmentDetailService.baseUrl; };
            LaMonthlyLoanInstallmentDetailDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaMonthlyLoanInstallmentDetailDialog);
            return LaMonthlyLoanInstallmentDetailDialog;
        }(Serenity.EntityDialog));
        Task.LaMonthlyLoanInstallmentDetailDialog = LaMonthlyLoanInstallmentDetailDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailEditor = (function (_super) {
            __extends(LaMonthlyLoanInstallmentDetailEditor, _super);
            function LaMonthlyLoanInstallmentDetailEditor(container) {
                return _super.call(this, container) || this;
            }
            LaMonthlyLoanInstallmentDetailEditor.prototype.getColumnsKey = function () { return 'Task.LaMonthlyLoanInstallmentDetail'; };
            LaMonthlyLoanInstallmentDetailEditor.prototype.getDialogType = function () { return Task.LaMonthlyLoanInstallmentDetailEditorDialog; };
            LaMonthlyLoanInstallmentDetailEditor.prototype.getLocalTextPrefix = function () { return Task.LaMonthlyLoanInstallmentDetailRow.localTextPrefix; };
            LaMonthlyLoanInstallmentDetailEditor = __decorate([
                Serenity.Decorators.registerClass()
            ], LaMonthlyLoanInstallmentDetailEditor);
            return LaMonthlyLoanInstallmentDetailEditor;
        }(_Ext.GridEditorBase));
        Task.LaMonthlyLoanInstallmentDetailEditor = LaMonthlyLoanInstallmentDetailEditor;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailEditorDialog = (function (_super) {
            __extends(LaMonthlyLoanInstallmentDetailEditorDialog, _super);
            function LaMonthlyLoanInstallmentDetailEditorDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaMonthlyLoanInstallmentDetailForm(_this.idPrefix);
                return _this;
            }
            LaMonthlyLoanInstallmentDetailEditorDialog.prototype.getFormKey = function () { return Task.LaMonthlyLoanInstallmentDetailForm.formKey; };
            LaMonthlyLoanInstallmentDetailEditorDialog.prototype.getLocalTextPrefix = function () { return Task.LaMonthlyLoanInstallmentDetailRow.localTextPrefix; };
            LaMonthlyLoanInstallmentDetailEditorDialog.prototype.getNameProperty = function () { return Task.LaMonthlyLoanInstallmentDetailRow.nameProperty; };
            LaMonthlyLoanInstallmentDetailEditorDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive()
            ], LaMonthlyLoanInstallmentDetailEditorDialog);
            return LaMonthlyLoanInstallmentDetailEditorDialog;
        }(_Ext.EditorDialogBase));
        Task.LaMonthlyLoanInstallmentDetailEditorDialog = LaMonthlyLoanInstallmentDetailEditorDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaMonthlyLoanInstallmentDetailGrid = (function (_super) {
            __extends(LaMonthlyLoanInstallmentDetailGrid, _super);
            function LaMonthlyLoanInstallmentDetailGrid(container) {
                return _super.call(this, container) || this;
            }
            LaMonthlyLoanInstallmentDetailGrid.prototype.getColumnsKey = function () { return 'Task.LaMonthlyLoanInstallmentDetail'; };
            LaMonthlyLoanInstallmentDetailGrid.prototype.getDialogType = function () { return Task.LaMonthlyLoanInstallmentDetailDialog; };
            LaMonthlyLoanInstallmentDetailGrid.prototype.getIdProperty = function () { return Task.LaMonthlyLoanInstallmentDetailRow.idProperty; };
            LaMonthlyLoanInstallmentDetailGrid.prototype.getLocalTextPrefix = function () { return Task.LaMonthlyLoanInstallmentDetailRow.localTextPrefix; };
            LaMonthlyLoanInstallmentDetailGrid.prototype.getService = function () { return Task.LaMonthlyLoanInstallmentDetailService.baseUrl; };
            LaMonthlyLoanInstallmentDetailGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaMonthlyLoanInstallmentDetailGrid);
            return LaMonthlyLoanInstallmentDetailGrid;
        }(Serenity.EntityGrid));
        Task.LaMonthlyLoanInstallmentDetailGrid = LaMonthlyLoanInstallmentDetailGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaRequestedLoanApplicationDialog = (function (_super) {
            __extends(LaRequestedLoanApplicationDialog, _super);
            function LaRequestedLoanApplicationDialog() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.form = new Task.LaRequestedLoanApplicationForm(_this.idPrefix);
                return _this;
            }
            LaRequestedLoanApplicationDialog.prototype.getFormKey = function () { return Task.LaRequestedLoanApplicationForm.formKey; };
            LaRequestedLoanApplicationDialog.prototype.getIdProperty = function () { return Task.LaRequestedLoanApplicationRow.idProperty; };
            LaRequestedLoanApplicationDialog.prototype.getLocalTextPrefix = function () { return Task.LaRequestedLoanApplicationRow.localTextPrefix; };
            LaRequestedLoanApplicationDialog.prototype.getNameProperty = function () { return Task.LaRequestedLoanApplicationRow.nameProperty; };
            LaRequestedLoanApplicationDialog.prototype.getService = function () { return Task.LaRequestedLoanApplicationService.baseUrl; };
            LaRequestedLoanApplicationDialog.prototype.onDialogOpen = function () {
                var _this = this;
                $(".PFLoanType").hide();
                if (this.isEditMode) {
                    var loanTypeId = VistaLOAN.Setup.LaLoanCriteriaRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.LoanCriteriaId.value; })[0].LoanTypeId;
                    var loanSortName = VistaLOAN.Setup.LaLoanTypeRow.getLookup().items.filter(function (x) { return x.Id == loanTypeId; })[0].ShortCode;
                    if (loanSortName == "PFL") {
                        $(".PFLoanType").show();
                    }
                    else {
                        $(".PFLoanType").hide();
                    }
                }
                this.saveAndCloseButton.hide();
                this.applyChangesButton.hide();
                this.deleteButton.hide();
            };
            LaRequestedLoanApplicationDialog.prototype.getToolbarButtons = function () {
                var _this = this;
                var buttons = _super.prototype.getToolbarButtons.call(this);
                buttons.push({
                    title: "Recommend", cssClass: "send-button",
                    onClick: function (x) {
                        var message = "Are you sure you want to Recommend this application ?";
                        Q.confirm(message, function () {
                            if (_this.form.NextApproverId.value == "") {
                                Q.alert("Please select Recommender!");
                                return;
                            }
                            _this.form.AppStatusId.value = VistaLOAN.ApprovalStatus.Recommend.toString();
                            _this.form.ApproverId.value = _this.form.NextApproverId.value;
                            _this.save(function (p) { Q.notifySuccess("Application is recommended successfully."); _this.dialogClose(); });
                        });
                    }
                });
                buttons.push({
                    title: "Approve", cssClass: "send-button",
                    onClick: function (x) {
                        var message = "Are you sure you want to Approve this application ?";
                        Q.confirm(message, function () {
                            _this.form.AppStatusId.value = VistaLOAN.ApprovalStatus.Approved.toString();
                            _this.save(function (p) { Q.notifySuccess("Application is approved successfully."); _this.dialogClose(); });
                        });
                    }
                });
                buttons.push({
                    title: "Cancel", cssClass: "send-button",
                    onClick: function (x) {
                        var message = "Are you sure you want to Reject this application ?";
                        Q.confirm(message, function () {
                            _this.form.AppStatusId.value = VistaLOAN.ApprovalStatus.Cancel.toString();
                            _this.save(function (p) { Q.notifySuccess("Application is Canceled successfully."); _this.dialogClose(); });
                        });
                    }
                });
                return buttons;
            };
            LaRequestedLoanApplicationDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive(),
                Serenity.Decorators.panel()
            ], LaRequestedLoanApplicationDialog);
            return LaRequestedLoanApplicationDialog;
        }(Serenity.EntityDialog));
        Task.LaRequestedLoanApplicationDialog = LaRequestedLoanApplicationDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var LaRequestedLoanApplicationGrid = (function (_super) {
            __extends(LaRequestedLoanApplicationGrid, _super);
            function LaRequestedLoanApplicationGrid(container) {
                var _this = _super.call(this, container) || this;
                _this.userInfo = VistaLOAN.Authorization.userDefinition;
                _this.empInfo = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == _this.userInfo.EmpId; })[0];
                return _this;
            }
            LaRequestedLoanApplicationGrid.prototype.getColumnsKey = function () { return 'Task.LaRequestedLoanApplication'; };
            LaRequestedLoanApplicationGrid.prototype.getDialogType = function () { return Task.LaRequestedLoanApplicationDialog; };
            LaRequestedLoanApplicationGrid.prototype.getIdProperty = function () { return Task.LaRequestedLoanApplicationRow.idProperty; };
            LaRequestedLoanApplicationGrid.prototype.getLocalTextPrefix = function () { return Task.LaRequestedLoanApplicationRow.localTextPrefix; };
            LaRequestedLoanApplicationGrid.prototype.getService = function () { return Task.LaRequestedLoanApplicationService.baseUrl; };
            LaRequestedLoanApplicationGrid.prototype.onViewSubmit = function () {
                if (!_super.prototype.onViewSubmit.call(this)) {
                    return false;
                }
                var request = this.view.params;
                //var eq = request.EqualityFilter;
                //if (eq.hasOwnProperty('IntAppStatusId') && eq.IntAppStatusId == "")
                //    eq.IntAppStatusId = "6";
                request.Criteria = Serenity.Criteria.and(request.Criteria, [['ApproverId'], '=', this.empInfo.Id]);
                return true;
            };
            LaRequestedLoanApplicationGrid.prototype.getButtons = function () {
                var buttons = _super.prototype.getButtons.call(this);
                buttons.length = 0;
                return buttons;
            };
            LaRequestedLoanApplicationGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], LaRequestedLoanApplicationGrid);
            return LaRequestedLoanApplicationGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.LaRequestedLoanApplicationGrid = LaRequestedLoanApplicationGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var NonRefundableFinalPaymentDialog = (function (_super) {
            __extends(NonRefundableFinalPaymentDialog, _super);
            function NonRefundableFinalPaymentDialog() {
                var _this = _super.call(this) || this;
                _this.form = new Task.NonRefundableFinalPaymentForm(_this.idPrefix);
                _this.userInfo = VistaLOAN.Authorization.userDefinition;
                _this.form.PFLoanType.changeSelect2(function (e) {
                    var count;
                    var loanTypeId;
                    var loanTypeName;
                    var EmpWiseLoanId;
                    if (_this.form.EmployeeId.value == "" || _this.form.EmployeeId.value == null) {
                        _this.form.LoanCriteriaId.value = "";
                        Q.notifyWarning("Please select Employee first !");
                        return;
                    }
                    Task.LaLoanApplicationService.List({}, function (r) {
                        var lastLoanNo = 0;
                        if (_this.form.PFLoanType.value == "Non-Refundable")
                            loanTypeName = "NRL";
                        if (_this.form.PFLoanType.value == "FinalPayment")
                            loanTypeName = "FP";
                        VistaLOAN.Setup.LaLoanApplicationLastNumberService.List({}, function (s) {
                            lastLoanNo = s.Entities.filter(function (x) { return x.PFPaymentType == _this.form.PFLoanType.value; })[0].LastLoanNumber;
                            var font = ("00000" + (lastLoanNo + 1)).slice(-5);
                            ;
                            _this.form.LoanNo.value = loanTypeName + font;
                        });
                        EmpWiseLoanId = r.Entities.filter(function (x) { return x.LoanCriteriaId == +_this.form.LoanCriteriaId.value && x.EmployeeId == +_this.form.EmployeeId.value; });
                        if (EmpWiseLoanId.length > 0) {
                            _this.form.EmployeeWiseLoanId.value = EmpWiseLoanId[EmpWiseLoanId.length - 1].EmployeeWiseLoanId + 1;
                        }
                        else {
                            _this.form.EmployeeWiseLoanId.value = 1;
                        }
                        _this.GetCPFContribution();
                        _this.GetCPFPolicy();
                        var joiningDate = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; })[0].DateofJoining;
                        var serviceLength = _this.GetDateDifference(joiningDate);
                        _this.GetForfeitedRule(serviceLength);
                        if (_this.form.PFLoanType.value == "Non-Refundable") {
                            var birthDate = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; })[0].DateofBirth;
                            var age = _this.GetDateDifference(birthDate);
                            if (age < _this.NRfMinimumAge) {
                                Q.notifyWarning("Applicant age is not applicable for Non-Refundable Loan!");
                                return;
                            }
                            $(".NonRefundPFOwnLoanAmount").show();
                            $(".NonRefundPFCompanyLoanAmount").show();
                            $(".NonRefundOwnInterestLoanAmount").show();
                            $(".NonRefundCompanyInterestLoanAmount").show();
                        }
                        else {
                            $(".NonRefundPFOwnLoanAmount").show();
                            $(".NonRefundPFCompanyLoanAmount").show();
                            $(".NonRefundOwnInterestLoanAmount").show();
                            $(".NonRefundCompanyInterestLoanAmount").show();
                        }
                        _this.form.ApplyLoanAmount.value = 0;
                        _this.form.NonRefundPFOwnLoanAmount.value = 0;
                        _this.form.NonRefundPFCompanyLoanAmount.value = 0;
                        _this.form.NonRefundOwnInterestLoanAmount.value = 0;
                        _this.form.NonRefundCompanyInterestLoanAmount.value = 0;
                    });
                });
                _this.form.IsApprovalProcess.element.click(function (e) {
                    if (_this.form.IsApprovalProcess.value) {
                        _this.form.AppStatusId.value = "6";
                    }
                    else {
                        _this.form.AppStatusId.value = "3";
                    }
                });
                _this.form.EmployeeId.changeSelect2(function (e) {
                    _this.EmployeeInfo = VistaLOAN.HRM.EmploymentInfoRow.getLookup().items.filter(function (x) { return x.Id == +_this.form.EmployeeId.value; });
                    _this.GetCPFContribution();
                });
                _this.form.ApplyDate.change(function (e) {
                    _this.GetCPFContribution();
                });
                _this.form.ApplyLoanAmount.change(function (e) {
                    if (_this.form.EmployeeId.value == "" || _this.form.EmployeeId.value == null) {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please select Employee first !");
                        return;
                    }
                    if (_this.form.LoanCriteriaId.value == "" || _this.form.LoanCriteriaId.value == "0") {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please select Loan Criteria first !");
                        return;
                    }
                    if (_this.form.ApplyDate.value == "" || _this.form.ApplyDate.value == null) {
                        _this.form.ApplyLoanAmount.value = 0;
                        Q.notifyWarning("Please fill up Application Date first !");
                        return;
                    }
                    if (_this.form.PFLoanType.value == "Non-Refundable") {
                        var applicableLoanAmount = 0;
                        if (_this.NRfApplicableFor == "Own Contribution") {
                            applicableLoanAmount = _this.form.EmpOwnContribution.value * (_this.RfLoanPercentage / 100);
                        }
                        else {
                            applicableLoanAmount = (_this.form.EmpOwnContribution.value + _this.form.EmpOwnInterest.value + _this.form.CompanyContribution.value + _this.form.CompanyInterest.value) * (_this.RfLoanPercentage / 100);
                        }
                        if (_this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                            _this.form.ApplyLoanAmount.value = 0;
                            Q.notifyWarning("Loan Amount will not more than " + _this.NRfLoanPercentage + "% of " + _this.RfApplicableFor + "!");
                            return;
                        }
                        _this.form.NonRefundPFOwnLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundPFCompanyLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundOwnInterestLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                        _this.form.NonRefundCompanyInterestLoanAmount.value = _this.form.ApplyLoanAmount.value / 4;
                    }
                    else {
                        var applicableLoanAmount = 0;
                        applicableLoanAmount = _this.form.EmpOwnContribution.value + _this.form.EmpOwnInterest.value + _this.form.CompanyContribution.value + _this.form.CompanyInterest.value;
                        if (_this.form.ApplyLoanAmount.value > applicableLoanAmount) {
                            _this.form.ApplyLoanAmount.value = 0;
                            Q.notifyWarning("Amount will not more than Total Amount !");
                            return;
                        }
                        _this.form.NonRefundPFOwnLoanAmount.value = _this.form.EmpOwnContribution.value;
                        _this.form.NonRefundPFCompanyLoanAmount.value = _this.form.CompanyContribution.value;
                        _this.form.NonRefundOwnInterestLoanAmount.value = _this.form.EmpOwnInterest.value;
                        _this.form.NonRefundCompanyInterestLoanAmount.value = _this.form.CompanyInterest.value;
                    }
                });
                return _this;
            }
            NonRefundableFinalPaymentDialog.prototype.getFormKey = function () { return Task.NonRefundableFinalPaymentForm.formKey; };
            NonRefundableFinalPaymentDialog.prototype.getIdProperty = function () { return Task.NonRefundableFinalPaymentRow.idProperty; };
            NonRefundableFinalPaymentDialog.prototype.getLocalTextPrefix = function () { return Task.NonRefundableFinalPaymentRow.localTextPrefix; };
            NonRefundableFinalPaymentDialog.prototype.getNameProperty = function () { return Task.NonRefundableFinalPaymentRow.nameProperty; };
            NonRefundableFinalPaymentDialog.prototype.getService = function () { return Task.NonRefundableFinalPaymentService.baseUrl; };
            NonRefundableFinalPaymentDialog.prototype.onDialogOpen = function () {
                var _this = this;
                _super.prototype.onDialogOpen.call(this);
                if (!this.isNew()) {
                }
                else {
                    var loanCriteriaId = VistaLOAN.Setup.LaLoanCriteriaRow.getLookup().items.filter(function (x) { return x.LoanTypeId == _this.userInfo.LoanTypeInformationId; })[0].Id;
                    this.form.LoanCriteriaId.value = loanCriteriaId.toString();
                }
            };
            NonRefundableFinalPaymentDialog.prototype.ToggleNonRefundFields = function (Boolean) {
            };
            NonRefundableFinalPaymentDialog.prototype.GetCPFContribution = function () {
                var _this = this;
                var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var date = new Date(this.form.ApplyDate.value);
                console.log(monthNames[date.getMonth()]);
                console.log(date.getFullYear().toString());
                Task.LaLoanApplicationService.GetCPFContribution({ EmployeeId: +this.form.EmployeeId.value, Year: date.getFullYear().toString(), Month: "'" + monthNames[date.getMonth()] + "'" }, function (r) {
                    _this.form.EmpOwnContribution.value = r.EmpCoreContribution;
                    _this.form.EmpOwnInterest.value = r.EmpProfit;
                    _this.form.CompanyContribution.value = r.ComCoreContribution;
                    _this.form.CompanyInterest.value = r.ComProfit;
                });
            };
            ;
            NonRefundableFinalPaymentDialog.prototype.GetCPFPolicy = function () {
                var _this = this;
                Task.LaLoanApplicationService.GetCPFPolicy({ ApplicationDate: this.form.ApplyDate.value }, function (r) {
                    _this.NRfApplicableFor = r.NRfApplicableFor;
                    _this.NRfLoanPercentage = r.NRfLoanPercentage;
                    _this.NRfMinimumAge = r.NRfMinimumAge;
                    _this.RfApplicableFor = r.RfApplicableFor;
                    _this.RfLoanPercentage = r.RfLoanPercentage;
                    _this.RfMinServiceYear = r.RfMinServiceYear;
                });
            };
            ;
            NonRefundableFinalPaymentDialog.prototype.GetForfeitedRule = function (serviceLength) {
                var _this = this;
                Task.LaLoanApplicationService.GetForfeitedRule({ ServiceLength: serviceLength }, function (r) {
                    _this.ForfeitedRate = r.ForfeitedRate;
                });
            };
            ;
            NonRefundableFinalPaymentDialog.prototype.GetDateDifference = function (ddate) {
                var currentDate = new Date();
                var j = new Date(ddate);
                var differ = Math.round(((Math.abs(currentDate.valueOf() - j.valueOf())) / (1000 * 3600 * 24)) / 365).toFixed(2);
                return +differ;
            };
            NonRefundableFinalPaymentDialog = __decorate([
                Serenity.Decorators.registerClass(),
                Serenity.Decorators.responsive(),
                Serenity.Decorators.panel()
            ], NonRefundableFinalPaymentDialog);
            return NonRefundableFinalPaymentDialog;
        }(Serenity.EntityDialog));
        Task.NonRefundableFinalPaymentDialog = NonRefundableFinalPaymentDialog;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
var VistaLOAN;
(function (VistaLOAN) {
    var Task;
    (function (Task) {
        var NonRefundableFinalPaymentGrid = (function (_super) {
            __extends(NonRefundableFinalPaymentGrid, _super);
            function NonRefundableFinalPaymentGrid(container) {
                return _super.call(this, container) || this;
            }
            NonRefundableFinalPaymentGrid.prototype.getColumnsKey = function () { return 'Task.NonRefundableFinalPayment'; };
            NonRefundableFinalPaymentGrid.prototype.getDialogType = function () { return Task.NonRefundableFinalPaymentDialog; };
            NonRefundableFinalPaymentGrid.prototype.getIdProperty = function () { return Task.NonRefundableFinalPaymentRow.idProperty; };
            NonRefundableFinalPaymentGrid.prototype.getLocalTextPrefix = function () { return Task.NonRefundableFinalPaymentRow.localTextPrefix; };
            NonRefundableFinalPaymentGrid.prototype.getService = function () { return Task.NonRefundableFinalPaymentService.baseUrl; };
            NonRefundableFinalPaymentGrid.prototype.onViewSubmit = function () {
                if (!_super.prototype.onViewSubmit.call(this)) {
                    return false;
                }
                var request = this.view.params;
                request.Criteria = Serenity.Criteria.and(request.Criteria, [['PFLoanType'], '!=', 'Refundable']);
                return true;
            };
            NonRefundableFinalPaymentGrid.prototype.addButtonClick = function () {
                this.editItem({
                    AppStatusId: 3
                });
            };
            NonRefundableFinalPaymentGrid = __decorate([
                Serenity.Decorators.registerClass()
            ], NonRefundableFinalPaymentGrid);
            return NonRefundableFinalPaymentGrid;
        }(VistaLOAN.EntityGridBaseNew));
        Task.NonRefundableFinalPaymentGrid = NonRefundableFinalPaymentGrid;
    })(Task = VistaLOAN.Task || (VistaLOAN.Task = {}));
})(VistaLOAN || (VistaLOAN = {}));
//# sourceMappingURL=VistaLOAN.Web.js.map