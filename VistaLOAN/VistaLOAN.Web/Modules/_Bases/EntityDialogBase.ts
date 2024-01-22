namespace VistaLOAN {
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.maximizable()
    export class EntityDialogBase<TEntity, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityDialog<TEntity, TOptions> {
        private loadedState: string;

        constructor() {
            super();
            this.element.fadeTo(0, 0);
            DialogUtils.pendingChangesConfirmation(this.element, () => this.getSaveState() != this.loadedState);
        }

        //dialogOpen() {
        //    super.dialogOpen();
        //}

        //loadByIdAndOpenDialog(id) {
        //    super.loadByIdAndOpenDialog(id);
        //}


        protected onDialogOpen() {
            super.onDialogOpen();
            //this.fullContentArea();
            this.element.fadeTo(100, 1);
        }

        protected getToolbarButtons() {
            let buttons = super.getToolbarButtons();
            //buttons.push({
            //    title: 'Refresh',
            //    icon: 'fa fa-refresh',
            //    onClick: () => {
            //        this.onRefreshClick();
            //    }
            //})
            return buttons;
        }
        onRefreshClick() {
        }
        protected getSaveState() {
            try {
                return $.toJSON(this.getSaveEntity());
            }
            catch (e) {
                return null;
            }
        }

        loadResponse(data) {
            super.loadResponse(data);
            this.loadedState = this.getSaveState();
        }

        maximize() {
            this.element.closest(".ui-dialog").find(".ui-icon-maximize-window").click();
        }

        fullContentArea() {
            let $content = $('section.content');
            let dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");

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


        }

        setDialogSize(width, height, left?, top?) {
            let $content = $('section.content');
            let dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");
            let css : any = {
                height: height,
                width: width
            }

            if (left) css.left = left;
            if (top) css.top = top;

            dialogElement.css(css);//.triggerHandler("resize");

            dialogElement.find('.ui-dialog-content').css({
                height: height - 50,
            });


        }
        hideEditorCaption(editor: JQuery) {
            editor.siblings('.caption').hide();
        }

        setGridEditorHeight(editor: JQuery, heightInPx: number) {
            editor.css('height', heightInPx + 'px');
            editor.children('.grid-container').css('height', (heightInPx - 25) + 'px');

        }
    }
}