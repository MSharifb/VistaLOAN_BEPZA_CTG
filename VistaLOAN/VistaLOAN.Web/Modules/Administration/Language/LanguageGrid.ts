/// <reference path="../../_Bases/EntityGridBase.ts" />
namespace VistaLOAN.Administration {

    @Serenity.Decorators.registerClass()
    export class LanguageGrid extends EntityGridBase<LanguageRow, any> {
        protected getColumnsKey() { return "Administration.Language"; }
        protected getDialogType() { return LanguageDialog; }
        protected getIdProperty() { return LanguageRow.idProperty; }
        protected getLocalTextPrefix() { return LanguageRow.localTextPrefix; }
        protected getService() { return LanguageService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }

        protected getDefaultSortBy() {
            return [LanguageRow.Fields.LanguageName];
        }
    }
}