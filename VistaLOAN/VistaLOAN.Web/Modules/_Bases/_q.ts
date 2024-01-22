namespace VistaLOAN {
    export class q {
        static getHours(fromDate: Date, toDate: Date): number {
            let hours = 0;
            if (fromDate && toDate) {
                let totalMiliSeconds = toDate.valueOf() - fromDate.valueOf();
                hours = totalMiliSeconds / (1000 * 60 * 60);
            }
            return hours;
        }

        static bindDateTimeEditorChange(editor: Serenity.DateTimeEditor, handler): void {
            editor.change(handler);
            editor.element.closest('.field').find('.time').change(handler);
            editor.element.closest('.field').find('.inplace-now').click(handler);
        }

        static initDetailEditor(dialog: EntityDialogBase<any, any>, editor: GridEditorBase<any>): void {
            editor.element.siblings('.caption').hide();
            editor.parentDialog = dialog;
        }

        static addNotificationIcon(editor: Serenity.StringEditor, isSuccess: boolean): void {

            let isAddOnInitialized = editor.element.data('isAddOnInitialized');

            if (isAddOnInitialized != true) {
                editor.element.after('<span class="text text-danger" style="padding:3px"><i class="fa fa-times"></i></span>');
                editor.element.data('isAddOnInitialized', true);
            }

            if (isSuccess == true) {
                editor.element.switchClass('bg-danger', 'bg-success')
                    .siblings('.text').switchClass('text-danger', 'text-success')
                    .children().switchClass('fa-times', 'fa-check');
            } else {
                editor.element.switchClass('bg-success', 'bg-danger')
                    .siblings('.text').switchClass('text-success', 'text-danger')
                    .children().switchClass('fa-check', 'fa-times');

            }

        }

    }
}
