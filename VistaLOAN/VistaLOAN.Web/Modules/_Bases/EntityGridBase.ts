namespace VistaLOAN {
    @Serenity.Decorators.filterable()
    export class EntityGridBase<TItem, TOptions>
        //this comment is for preventing replacement
        extends Serenity.EntityGrid<TItem, TOptions> {


        constructor(container: JQuery, options?: TOptions) {
            super(container, options);
            //$('section.content').fadeTo(0, 0);
            //this.slickContainer.fadeTo(0, 0);
        }

        public autoColumnSizePlugin;
        protected createSlickGrid() {
            var grid = super.createSlickGrid();
            this.autoColumnSizePlugin = new Slick.AutoColumnSize();
            grid.registerPlugin(this.autoColumnSizePlugin);
            return grid;
        }

        protected markupReady(): void {
            super.markupReady();
            setTimeout(() => {

                if (this.slickGrid.getOptions().forceFitColumns == false) { // for detail grid
                    //gridContainerWidth -= 45;
                } else {
                    this.slickGrid.setOptions({ forceFitColumns: false });
                }

                let allColumns = this.autoColumnSizePlugin.resizeAllColumns().filter(f => f.visible != false);// this.allColumns;

                let allVisibleColumnWidth = 0;
                allColumns.map(m => m.width).forEach(e => allVisibleColumnWidth += e);

                let gridContainerWidth = this.slickContainer.width();

                //let autoColumnSizePluginWidth = this.autoColumnSizePlugin.getAllColumnsWidth();

                if (allVisibleColumnWidth > gridContainerWidth) {
                    this.slickGrid.setOptions({ forceFitColumns: false });
                    this.autoColumnSizePlugin.resizeAllColumns()

                } else if (allVisibleColumnWidth < gridContainerWidth) {
                    this.autoColumnSizePlugin.resizeAllColumns()
                    let fixedSizeColumns = allColumns.filter(c => c.width == c.maxWidth);
                    let fixedSizeColumnsWidth = 0;
                    fixedSizeColumns.map(m => m.width).forEach(e => fixedSizeColumnsWidth += e);

                    let resizableColumns = allColumns.filter(c => {
                        let proposedWidth = c.width * (gridContainerWidth / allVisibleColumnWidth);
                        return !c.maxWidth || c.maxWidth > proposedWidth;
                    });
                    let resizableColumnsWidth = 0;
                    resizableColumns.map(m => m.width).forEach(e => resizableColumnsWidth += e);

                    let stretchableGridAreaWidth = gridContainerWidth - fixedSizeColumnsWidth;

                    if (this.slickGrid.getOptions().forceFitColumns == false) { // for detail grid
                        //stretchableGridAreaWidth -= fixedSizeColumnsWidth / 2.2;
                    }

                    resizableColumns.forEach(c => {
                        c.width = c.width * (stretchableGridAreaWidth / resizableColumnsWidth)
                    });

                    this.slickGrid.setColumns(allColumns);
                }
                //$('.grid-container').slideDown();
                //$('section.content').fadeTo(200, 1);
                //this.slickContainer.fadeTo(200, 1);

            }, 100);
            //this.slickGrid.autoSizeColumns();
        }

        protected getSlickOptions() {
            let opt = super.getSlickOptions();
            opt.forceFitColumns = false;
            opt.enableTextSelectionOnCells = true;

            return opt;
        }

        protected getButtons() {
            var buttons = super.getButtons();

            buttons.push(Common.ExcelExportHelper.createToolButton({
                grid: this,
                service: this.getService() + '/ListExcel',
                onViewSubmit: () => this.onViewSubmit(),
                separator: true
            }));

            buttons.push(Common.PdfExportHelper.createToolButton({
                grid: this,
                tableOptions: { theme: 'grid' },
                onViewSubmit: () => this.onViewSubmit()
            }));

            return buttons;
        }

        protected getColumns(): Slick.Column[] {
            let cols = super.getColumns();

            cols.unshift({
                field: 'inline-actions',
                name: '',
                width: 25,
                maxWidth: 25,
                minWidth: 25,
                format: ctx => '<a class="inline-action view-details" title="view details"><i class="fa fa-pencil-square-o"></i></a>'
                //'<a class="inline-action delete-row" title="delete"><i class="fa fa-trash-o text-red"></i></a>'
            },
                {
                    field: 'Serial',
                    name: '#',
                    cssClass: 'align-center',
                    headerCssClass: 'align-center',
                    width: 60,
                    maxWidth: 60,
                    format: ctx => (ctx.row + 1).toString()
                });

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
            let gs = this.view.getGroups();
            if (gs.length == 0) {
                for (let i = 0; i < items.length; i++) {
                    (items[i] as any).Serial = response.Skip + i + 1;
                }
            } else {
                for (let gi = 0; gi < gs.length; gi++) {

                    for (let i = 0; i < gs[gi].rows.length; i++) {

                        let item = (items as any[]).filter(f => f.Id == (gs[gi].rows[i] as any).Id)[0];
                        if (item)
                            (item as any).Serial = i + 1;
                    }
                }
            }
            return r;
        }
    }
}