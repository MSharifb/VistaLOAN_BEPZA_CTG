declare var jsPDF;
namespace VistaLOAN.Common {
    export interface PdfExportOptions {
        grid: Serenity.DataGrid<any, any>;
        onViewSubmit: () => boolean;
        title?: string;
        hint?: string;
        separator?: boolean;
        reportTitle?: string;
        titleTop?: number;
        titleFontSize?: number;
        fileName?: string;
        pageNumbers?: boolean;
        columnTitles?: { [key: string]: string };
        tableOptions?: jsPDF.AutoTableOptions;
        output?: string;
        autoPrint?: boolean;
    }

    export namespace PdfExportHelper {
        // Use http://dopiaza.org/tools/datauri or similar service to convert an image into image data
        var headerImgData = 'data:image/png;base64,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';
        function toAutoTableColumns(srcColumns: Slick.Column[], columnStyles: { [dataKey: string]: jsPDF.AutoTableStyles; },
            columnTitles: { [key: string]: string }) {
            return srcColumns.map(src => {
                let col: jsPDF.AutoTableColumn = {
                    dataKey: src.id || src.field,
                    title: src.name || ''
                };

                if (columnTitles && columnTitles[col.dataKey] != null)
                    col.title = columnTitles[col.dataKey];

                let style: jsPDF.AutoTableStyles = {};
                if ((src.cssClass || '').indexOf("align-right") >= 0)
                    style.halign = 'right';
                else if ((src.cssClass || '').indexOf("align-center") >= 0)
                    style.halign = 'center';

                columnStyles[col.dataKey] = style;

                return col;
            });
        }

        function toAutoTableData(entities: any[], keys: string[], srcColumns: Slick.Column[]) {
            let el = document.createElement('span');
            let row = 0;
            return entities.map(item => {
                let dst = {};
                for (let cell = 0; cell < srcColumns.length; cell++) {
                    let src = srcColumns[cell];
                    let fld = src.field || '';
                    let key = keys[cell];
                    let txt;
                    let html: string;
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
                            dst[key] = $(el.children).hasClass("checked") ? "Yes" : "No"
                        }
                        else
                            dst[key] = el.textContent || '';
                    }
                }
                row++;
                return dst;
            });
        }

        export function exportToPdf(options: PdfExportOptions): void {

            var g = options.grid;

            if (!options.onViewSubmit())
                return;

            includeAutoTable();

            var request = Q.deepClone(g.view.params) as Serenity.ListRequest;
            request.Take = 0;
            request.Skip = 0;

            var sortBy = g.view.sortBy;
            if (sortBy != null)
                request.Sort = sortBy;

            var gridColumns = g.slickGrid.getColumns();
            gridColumns = gridColumns.filter(x => x.id !== "__select__" && x.name.length > 0);

            request.IncludeColumns = [];
            for (var column of gridColumns)
                request.IncludeColumns.push(column.id || column.field);

            Q.serviceCall({
                url: g.view.url,
                request: request,
                onSuccess: response => {
                    var doc = new jsPDF('l', 'pt');
                    var groupings = g.view.getGrouping(); //group fields
                    var groupingColumns = gridColumns.filter(f => groupings.some(s => s.getter == f.field) == true);
                    var srcColumns = gridColumns.filter(f => groupings.some(s => s.getter == f.field) == false);
                    var columnStyles: { [dataKey: string]: jsPDF.AutoTableStyles; } = {};
                    var columns = toAutoTableColumns(srcColumns, columnStyles, options.columnTitles);
                    var keys = columns.filter(f => groupings.some(s => s.getter == f) == false).map(x => x.dataKey);

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
                        headerStyles: { fillColor: 255, textColor: 0, lineWidth:1,fillStyle: 'S'  },
                        columnStyles: columnStyles
                    }, options.tableOptions) as jsPDF.AutoTableOptions;

                    ///region Title
                    {
                        doc.addImage(headerImgData, 'JPEG', 30, 30, 60, 60);
                        doc.autoTable(['BEPZA'], [], {
                            margin: { bottom: 10 , left: 100},
                            startY: options.titleTop || 35,
                            headerStyles: { fillColor: 255, textColor: 0 },
                            styles: { halign: 'left', fontSize: 18 }
                        });

                        let reportTitle = '';
                        if (groupingColumns[0])
                            reportTitle = groupingColumns.map(m => m.name).join(', ') + ' wise '

                        reportTitle += options.reportTitle || g.getTitle();
                        reportTitle += " Report";

                        doc.autoTable([reportTitle], [], {
                            margin: { top: 10, bottom: 10, left: 100},
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
                                doc.autoTableText(str, doc.internal.pageSize.width / 2,
                                    doc.internal.pageSize.height - autoOptions.margin.bottom, {
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

                        var entities = (<Serenity.ListResponse<any>>response).Entities || [];

                        g.setItems(entities);

                        var groups = g.view.getGroups(); //grouped data
                        if (groups.length > 0) {
                            var ggg = function (grps: Slick.Group<any>[], parentGroupIndex) {
                                var endPosY = doc.autoTableEndPosY();
                                for (let i = 0; i < grps.length; i++) {
                                    var group = grps[i];
                                    var level = group.level + 1;

                                    doc.autoTable([group.title], [], {
                                        margin: { left: 30 + level * 10, top: 2 },
                                        startY: doc.autoTableEndPosY(),
                                        headerStyles: { fillColor: 255, textColor: 0, fontSize: 10 - group.level, cellPadding: 0 }
                                    });

                                    if (group.groups) {

                                        ggg(group.groups, i);

                                    } else {

                                        let data = toAutoTableData(group.rows, keys, srcColumns);
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
                            }

                            ggg(groups, -1);

                        } else {
                            let data = toAutoTableData(g.getItems(), keys, srcColumns);
                            autoOptions.startY = headerHeight;
                            doc.autoTable(columns, data, autoOptions);
                        }
                    }

                    if (typeof doc.putTotalPages === 'function') {
                        doc.putTotalPages(totalPagesExp);
                    }


                    if (!options.output || options.output == "file") {
                        var fileName = options.reportTitle || "{0}_{1}.pdf";
                        fileName = Q.format(fileName, g.getTitle() || "report",
                            Q.formatDate(new Date(), "yyyyMMdd_HHmm"));
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

        export function createToolButton(options: PdfExportOptions) {

            return <Serenity.ToolButton>{
                title: options.title || '',
                hint: options.hint || 'PDF',
                cssClass: 'export-pdf-button',
                onClick: () => exportToPdf(options),
                separator: options.separator
            };
        }

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
                typeof (jsPDF as any).API == "undefined" ||
                typeof (jsPDF as any).API.autoTable !== "undefined")
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
    }
}

declare namespace Slick {
    interface RemoteView<TEntity> {
        getGroups(): Slick.Group<TEntity>[];
        getGrouping(): Slick.GroupInfo<TEntity>[];
    }
}