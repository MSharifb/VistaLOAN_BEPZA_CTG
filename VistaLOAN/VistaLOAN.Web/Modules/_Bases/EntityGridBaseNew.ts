declare namespace Slick {
    //class AutoColumnSize {

    //}
}

namespace VistaLOAN {
    @Serenity.Decorators.filterable()
    export class EntityGridBaseNew<TItem, TOptions>
        //this comment is for preventing replacement
        extends Serenity.EntityGrid<TItem, TOptions> {

        isAutosized = false;

        constructor(container: JQuery, options?: TOptions) {
            super(container, options);
            $('section.content').fadeTo(0, 0);
            this.slickContainer.fadeTo(0, 0);
        }

        public autoColumnSizePlugin;

        protected createSlickGrid() {
            var grid = super.createSlickGrid();

            this.autoColumnSizePlugin = new Slick.AutoColumnSize();
            grid.registerPlugin(this.autoColumnSizePlugin);

            grid.setSelectionModel(new Slick.RowSelectionModel());

            return grid;
        }

        protected markupReady(): void {
            super.markupReady();
            setTimeout(() => {
                if (this.isAutosized == false) {

                    this.resizeAllCulumn();

                    $('section.content').fadeTo(200, 1);
                    this.slickContainer.fadeTo(200, 1);
                }
            }, 200);

            //this.slickGrid.autoSizeColumns();
        }

        resizeAllCulumn() {
            this.isAutosized = true;

            let gridContainerWidth = this.slickContainer.width();

            if (this.slickGrid.getOptions().forceFitColumns == false) { // for detail grid
                //gridContainerWidth -= 60;
            } else {
                this.slickGrid.setOptions({ forceFitColumns: false });
            }

            let allColumns = this.autoColumnSizePlugin.resizeAllColumns().filter(f => f.visible != false) as Slick.Column[];// this.allColumns;

            let allVisibleColumnWidth = 0;
            allColumns.map(m => m.width).forEach(e => allVisibleColumnWidth += e);



            if (allVisibleColumnWidth > gridContainerWidth) {
                this.slickGrid.setOptions({ forceFitColumns: false });
                this.autoColumnSizePlugin.resizeAllColumns()

            } else if (allVisibleColumnWidth < gridContainerWidth) {
                this.autoColumnSizePlugin.resizeAllColumns()
                let fixedSizeColumns = allColumns.filter(c => c.minWidth == c.maxWidth);
                fixedSizeColumns.forEach(c => {
                    c.width = c.maxWidth;
                });
                let fixedSizeColumnsWidth = 0;
                fixedSizeColumns.map(m => m.width).forEach(e => fixedSizeColumnsWidth += e);

                let stretchableGridAreaWidth = gridContainerWidth - fixedSizeColumnsWidth - 18;

                //if (this.view.getGrouping().length > 0) {
                //    stretchableGridAreaWidth -= 20;
                //}

                //if (this.element.hasClass('editor') == true) { // for detail grid
                //    stretchableGridAreaWidth -= fixedSizeColumnsWidth + 77;
                //}

                let resizableColumns = allColumns.filter(c => c.minWidth != c.maxWidth).filter(c => {
                    let proposedWidth = c.width * (gridContainerWidth / allVisibleColumnWidth);
                    return !c.maxWidth || c.maxWidth > proposedWidth;
                });

                let resizableColumnsWidth = 0;
                resizableColumns.map(m => m.width).forEach(e => resizableColumnsWidth += e);

                resizableColumns.forEach(c => {
                    c.width = c.width * (stretchableGridAreaWidth / resizableColumnsWidth);
                });

                this.slickGrid.setColumns(allColumns);
                this.slickGrid.onColumnsResized.notify();

            }
            //this.view.refresh();
            this.setItems(this.getItems());
        }

        protected getSlickOptions() {
            let opt = super.getSlickOptions();

            opt.forceFitColumns = false;
            opt.enableTextSelectionOnCells = true;
            opt.selectedCellCssClass = "slick-row-selected";
            opt.enableCellNavigation = true;

            return opt;
        }

        protected getButtons() {
            var buttons = super.getButtons();

            //buttons.push(Common.ExcelExportHelper.createToolButton({
            //    grid: this,
            //    service: this.getService() + '/ListExcel',
            //    onViewSubmit: () => this.onViewSubmit(),
            //    separator: true
            //}));

            buttons.push(Common.PdfExportHelper.createToolButton({
                grid: this,
                tableOptions: { theme: 'grid' },
                onViewSubmit: () => this.onViewSubmit()
            }));

            return buttons;
        }

        protected getColumns(): Slick.Column[] {
            let cols = super.getColumns();

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
                    //format: ctx => (ctx.row + 1).toString()
                }
            );

            return cols;
        }

        protected onClick(e: JQueryEventObject, row: number, cell: number) {
            super.onClick(e, row, cell);

            if (e.isDefaultPrevented())
                return;

            var item = this.itemAt(row) as TItem;
            let recordId = item[this.getIdProperty()];
            var target = $(e.target);

            // if user clicks "i" element, e.g. icon
            if (target.parent().hasClass('inline-action'))
                target = target.parent();

            if (target.hasClass('inline-action')) {
                //e.preventDefault();

                this.onInlineActionClick(target, recordId, item);

            }
        }

        protected onInlineActionClick(target: JQuery, recordId, item: TItem): void {
            if (target.hasClass('delete-row')) {
                Q.confirm('Delete record?', () => {
                    let o = this as any;
                    if (o.deleteEntity) { //for in-memory grid
                        o.deleteEntity(recordId);
                    }
                    else {
                        Q.serviceRequest(this.getService() + '/Delete', { EntityId: recordId }, response => {
                            this.refresh();
                        });
                    }
                });
            }
            else if (target.hasClass('view-details')) {
                this.editItem(recordId);
            }
        }

        protected onViewProcessData(response: Serenity.ListResponse<TItem>): Serenity.ListResponse<TItem> {
            let r = super.onViewProcessData(response);
            let items = r.Entities
            let grouping_levels = this.view.getGrouping();

            if (grouping_levels.length == 0) {
                for (let i = 0; i < items.length; i++) {
                    (items[i] as any).Serial = response.Skip + i + 1;
                }
            } else if (grouping_levels.length = 1) {

                let groups = this.view.getGroups();

                let generateSerialNo = () => {
                    groups = this.view.getGroups();

                    for (let gi = 0; gi < groups.length; gi++) {
                        let rows = groups[gi].rows;
                        for (let i = 0; i < rows.length; i++) {

                            let item = (items as any[]).filter(f => f.Id == (rows[i] as any).Id)[0];
                            if (item)
                                (item as any).Serial = i + 1;
                        }
                    }
                };

                if (groups.length == 0) {
                    setTimeout(generateSerialNo);
                } else {
                    generateSerialNo();
                }
            }
            return r;
        }
    }
}