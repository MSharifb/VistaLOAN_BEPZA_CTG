/// <reference path="../../Modules/_Ext/_q/_q.d.ts" />
/// <reference path="../typings/serenity/Serenity.CoreLib.d.ts" />
/// <reference path="../typings/jspdf/jspdf.autotable.d.ts" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare namespace _Ext {
    class GridBase<TItem, TOptions> extends Serenity.EntityGrid<TItem, TOptions> {
        protected get_ExtGridOptions(): ExtGridOptions;
        isReadOnly: boolean;
        isRequired: boolean;
        isAutosized: boolean;
        isChildGrid: boolean;
        nextRowNumber: number;
        autoColumnSizePlugin: any;
        constructor(container: JQuery, options?: TOptions);
        protected markupReady(): void;
        protected getButtons(): Serenity.ToolButton[];
        protected getReportRequest(): any;
        protected getColumns(): Slick.Column[];
        protected createSlickGrid(): Slick.Grid;
        resetColumns(columns: Slick.Column[]): void;
        resizeAllCulumn(): void;
        protected getSlickOptions(): Slick.GridOptions;
        protected getViewOptions(): Slick.RemoteViewOptions;
        protected onClick(e: JQueryEventObject, row: number, cell: number): void;
        protected onInlineActionClick(target: JQuery, recordId: any, item: TItem): void;
        protected resetRowNumber(): void;
        protected setGrouping(groupInfo: Slick.GroupInfo<TItem>[]): void;
        protected onViewProcessData(response: Serenity.ListResponse<TItem>): Serenity.ListResponse<TItem>;
    }
}
declare namespace _Ext {
    class DialogBase<TEntity, TOptions> extends Serenity.EntityDialog<TEntity, TOptions> {
        protected get_ExtDialogOptions(): ExtDialogOptions;
        private loadedState;
        isReadOnly: boolean;
        protected form: any;
        constructor(opt?: any);
        protected updateInterface(): void;
        protected onDialogOpen(): void;
        protected onDialogClose(): void;
        protected setReadOnly(value: boolean): void;
        protected getToolbarButtons(): Serenity.ToolButton[];
        onRefreshClick(): void;
        protected getSaveState(): string;
        protected onSaveSuccess(response: any): void;
        loadResponse(data: any): void;
        maximize(): void;
        fullContentArea(): void;
        setDialogSize(width?: any, height?: any, top?: any, left?: any, $content?: any): void;
        onAfterSetDialogSize(): void;
        onAfterDialogClose(entity: TEntity): void;
    }
}
declare namespace _Ext {
    class EditorDialogBase<TEntity> extends DialogBase<TEntity, any> {
        protected get_ExtDialogOptions(): ExtDialogOptions;
        protected getIdProperty(): string;
        onSave: (options: Serenity.ServiceOptions<Serenity.SaveResponse>, callback: (response: Serenity.SaveResponse) => void) => void;
        onDelete: (options: Serenity.ServiceOptions<Serenity.DeleteResponse>, callback: (response: Serenity.DeleteResponse) => void) => void;
        destroy(): void;
        protected updateInterface(): void;
        protected saveHandler(options: Serenity.ServiceOptions<Serenity.SaveResponse>, callback: (response: Serenity.SaveResponse) => void): void;
        protected deleteHandler(options: Serenity.ServiceOptions<Serenity.DeleteResponse>, callback: (response: Serenity.DeleteResponse) => void): void;
        parentEditor: GridEditorBase<any>;
    }
}
declare namespace _Ext {
    class GridEditorBase<TEntity> extends _Ext.GridBase<TEntity, any> implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {
        protected get_ExtGridOptions(): ExtGridOptions;
        protected getIdProperty(): string;
        protected nextId: number;
        constructor(container: JQuery);
        private sortGridFunction(grid, column, field);
        protected getQuickFilters(): any[];
        protected id(entity: TEntity): any;
        protected save(opt: Serenity.ServiceOptions<any>, callback: (r: Serenity.ServiceResponse) => void): void;
        protected deleteEntity(id: number): boolean;
        protected validateEntity(row: TEntity, id: number): boolean;
        protected getNewEntity(): TEntity;
        protected getButtons(): Serenity.ToolButton[];
        protected addButtonClick(): void;
        protected editItem(entityOrId: any): void;
        getEditValue(property: any, target: any): void;
        setEditValue(source: any, property: any): void;
        value: TEntity[];
        protected getGridCanLoad(): boolean;
        protected usePager(): boolean;
        protected getInitialTitle(): any;
        private searchText;
        protected createToolbarExtensions(): void;
        protected onViewFilter(row: any): boolean;
        private matchContains(item);
        protected enableFiltering(): boolean;
        protected onViewSubmit(): boolean;
        get_readOnly(): boolean;
        set_readOnly(value: boolean): void;
        protected getSlickOptions(): Slick.GridOptions;
        parentDialog: DialogBase<any, any>;
        onItemsChanged(): void;
        onBeforeGetValue(items: TEntity[]): void;
    }
}
declare namespace _Ext {
    enum AuditActionType {
        Insert = 1,
        Update = 2,
        Delete = 3,
    }
}
declare namespace _Ext {
}
declare namespace _Ext {
    interface AuditLogForm {
        EntityTableName: Serenity.StringEditor;
        VersionNo: Serenity.IntegerEditor;
        UserId: Serenity.LookupEditor;
        ActionType: Serenity.EnumEditor;
        ActionDate: Serenity.DateTimeEditor;
        EntityId: Serenity.IntegerEditor;
        OldEntity: Serenity.StringEditor;
        NewEntity: Serenity.StringEditor;
        Differences: StaticTextBlock;
        IpAddress: Serenity.StringEditor;
        SessionId: Serenity.StringEditor;
    }
    class AuditLogForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace _Ext {
    interface AuditLogRow {
        Id?: number;
        VersionNo?: number;
        UserId?: number;
        ActionType?: AuditActionType;
        ActionDate?: string;
        EntityTableName?: string;
        EntityId?: number;
        OldEntity?: string;
        NewEntity?: string;
        IpAddress?: string;
        SessionId?: string;
    }
    namespace AuditLogRow {
        const idProperty = "Id";
        const nameProperty = "EntityTableName";
        const localTextPrefix = "_Ext.AuditLog";
        const enum Fields {
            Id = "Id",
            VersionNo = "VersionNo",
            UserId = "UserId",
            ActionType = "ActionType",
            ActionDate = "ActionDate",
            EntityTableName = "EntityTableName",
            EntityId = "EntityId",
            OldEntity = "OldEntity",
            NewEntity = "NewEntity",
            IpAddress = "IpAddress",
            SessionId = "SessionId",
        }
    }
}
declare namespace _Ext {
    namespace AuditLogService {
        const baseUrl = "_Ext/AuditLog";
        function Create(request: Serenity.SaveRequest<AuditLogRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<AuditLogRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<AuditLogRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<AuditLogRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "_Ext/AuditLog/Create",
            Update = "_Ext/AuditLog/Update",
            Delete = "_Ext/AuditLog/Delete",
            Retrieve = "_Ext/AuditLog/Retrieve",
            List = "_Ext/AuditLog/List",
        }
    }
}
declare namespace _Ext {
    interface AuditLogViewerRequest extends Serenity.ServiceRequest {
        FormKey?: string;
        EntityId?: number;
    }
}
declare namespace _Ext {
    interface AuditLogViewerResponse extends Serenity.ServiceResponse {
        EntityVersions?: AuditLogRow[];
    }
}
declare namespace _Ext {
    namespace AuditLogViewerService {
        const baseUrl = "AuditLogViewer";
        function List(request: AuditLogViewerRequest, onSuccess?: (response: AuditLogViewerResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            List = "AuditLogViewer/List",
        }
    }
}
declare namespace _Ext.DevTools {
    interface SergenConnection {
        Key?: string;
    }
}
declare namespace _Ext.DevTools {
    interface SergenGenerateOptions {
        Row?: boolean;
        Service?: boolean;
        UI?: boolean;
    }
}
declare namespace _Ext.DevTools {
    interface SergenGenerateRequest extends Serenity.ServiceRequest {
        ConnectionKey?: string;
        Table?: SergenTable;
        GenerateOptions?: SergenGenerateOptions;
    }
}
declare namespace _Ext.DevTools {
    interface SergenListTablesRequest extends Serenity.ServiceRequest {
        ConnectionKey?: string;
    }
}
declare namespace _Ext.DevTools {
    namespace SergenService {
        const baseUrl = "DevTools/Sergen";
        function ListConnections(request: Serenity.ServiceRequest, onSuccess?: (response: Serenity.ListResponse<SergenConnection>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function ListTables(request: SergenListTablesRequest, onSuccess?: (response: Serenity.ListResponse<SergenTable>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Generate(request: SergenGenerateRequest, onSuccess?: (response: Serenity.ServiceResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            ListConnections = "DevTools/Sergen/ListConnections",
            ListTables = "DevTools/Sergen/ListTables",
            Generate = "DevTools/Sergen/Generate",
        }
    }
}
declare namespace _Ext.DevTools {
    interface SergenTable {
        Tablename?: string;
        Identifier?: string;
        Module?: string;
        PermissionKey?: string;
    }
}
declare namespace _Ext {
    interface EntityReportRequest extends Serenity.RetrieveRequest {
        ReportKey?: string;
        ReportServiceMethodName?: string;
        ReportDesignPath?: string;
    }
}
declare namespace _Ext {
    interface ListReportRequest extends Serenity.ListRequest {
        ReportKey?: string;
        ReportServiceMethodName?: string;
        ListExcelServiceMethodName?: string;
        ReportDesignPath?: string;
        EqualityFilterWithTextValue?: {
            [key: string]: string;
        };
    }
}
declare namespace _Ext {
    enum Months {
        January = 0,
        February = 1,
        March = 2,
        April = 3,
        May = 4,
        June = 5,
        July = 6,
        August = 7,
        September = 8,
        October = 9,
        November = 10,
        December = 11,
    }
}
declare namespace _Ext {
    interface ReplaceRowForm {
        DeletedEntityName: Serenity.StringEditor;
        ReplaceWithEntityId: EmptyLookupEditor;
    }
    class ReplaceRowForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace _Ext {
    interface ReplaceRowRequest extends Serenity.ServiceRequest {
        FormKey?: string;
        IdProperty?: string;
        NameProperty?: string;
        EntityTypeTitle?: string;
        DeletedEntityId?: number;
        DeletedEntityName?: string;
        ReplaceWithEntityId?: number;
    }
}
declare namespace _Ext {
    interface ReplaceRowResponse extends Serenity.ServiceResponse {
    }
}
declare namespace _Ext {
    namespace ReplaceRowService {
        const baseUrl = "ReplaceRow";
        function Replace(request: ReplaceRowRequest, onSuccess?: (response: ReplaceRowResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Replace = "ReplaceRow/Replace",
        }
    }
}
declare namespace _Ext {
    enum TimeUoM {
        Hour = 1,
        Day = 2,
        Week = 3,
        Month = 4,
        CalenderMonth = 5,
        Year = 6,
    }
}
declare namespace VistaLOAN.Administration {
}
declare namespace VistaLOAN.Administration {
    interface LanguageForm {
        LanguageId: Serenity.StringEditor;
        LanguageName: Serenity.StringEditor;
    }
    class LanguageForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Administration {
    interface LanguageRow {
        Id?: number;
        LanguageId?: string;
        LanguageName?: string;
    }
    namespace LanguageRow {
        const idProperty = "Id";
        const nameProperty = "LanguageName";
        const localTextPrefix = "Administration.Language";
        const lookupKey = "Administration.Language";
        function getLookup(): Q.Lookup<LanguageRow>;
        const enum Fields {
            Id = "Id",
            LanguageId = "LanguageId",
            LanguageName = "LanguageName",
        }
    }
}
declare namespace VistaLOAN.Administration {
    namespace LanguageService {
        const baseUrl = "Administration/Language";
        function Create(request: Serenity.SaveRequest<LanguageRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LanguageRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LanguageRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LanguageRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Administration/Language/Create",
            Update = "Administration/Language/Update",
            Delete = "Administration/Language/Delete",
            Retrieve = "Administration/Language/Retrieve",
            List = "Administration/Language/List",
        }
    }
}
declare namespace VistaLOAN.Administration {
}
declare namespace VistaLOAN.Administration {
    interface RoleForm {
        RoleName: Serenity.StringEditor;
    }
    class RoleForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Administration {
    interface RolePermissionListRequest extends Serenity.ServiceRequest {
        RoleID?: number;
        Module?: string;
        Submodule?: string;
    }
}
declare namespace VistaLOAN.Administration {
    interface RolePermissionListResponse extends Serenity.ListResponse<string> {
    }
}
declare namespace VistaLOAN.Administration {
    interface RolePermissionRow {
        RolePermissionId?: number;
        RoleId?: number;
        PermissionKey?: string;
        RoleRoleName?: string;
    }
    namespace RolePermissionRow {
        const idProperty = "RolePermissionId";
        const nameProperty = "PermissionKey";
        const localTextPrefix = "Administration.RolePermission";
        const enum Fields {
            RolePermissionId = "RolePermissionId",
            RoleId = "RoleId",
            PermissionKey = "PermissionKey",
            RoleRoleName = "RoleRoleName",
        }
    }
}
declare namespace VistaLOAN.Administration {
    namespace RolePermissionService {
        const baseUrl = "Administration/RolePermission";
        function Update(request: RolePermissionUpdateRequest, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: RolePermissionListRequest, onSuccess?: (response: RolePermissionListResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Update = "Administration/RolePermission/Update",
            List = "Administration/RolePermission/List",
        }
    }
}
declare namespace VistaLOAN.Administration {
    interface RolePermissionUpdateRequest extends Serenity.ServiceRequest {
        RoleID?: number;
        Module?: string;
        Submodule?: string;
        Permissions?: string[];
    }
}
declare namespace VistaLOAN.Administration {
    interface RoleRow {
        RoleId?: number;
        RoleName?: string;
    }
    namespace RoleRow {
        const idProperty = "RoleId";
        const nameProperty = "RoleName";
        const localTextPrefix = "Administration.Role";
        const lookupKey = "Administration.Role";
        function getLookup(): Q.Lookup<RoleRow>;
        const enum Fields {
            RoleId = "RoleId",
            RoleName = "RoleName",
        }
    }
}
declare namespace VistaLOAN.Administration {
    namespace RoleService {
        const baseUrl = "Administration/Role";
        function Create(request: Serenity.SaveRequest<RoleRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<RoleRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<RoleRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<RoleRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Administration/Role/Create",
            Update = "Administration/Role/Update",
            Delete = "Administration/Role/Delete",
            Retrieve = "Administration/Role/Retrieve",
            List = "Administration/Role/List",
        }
    }
}
declare namespace VistaLOAN.Administration {
    interface TranslationItem {
        Key?: string;
        SourceText?: string;
        TargetText?: string;
        CustomText?: string;
    }
}
declare namespace VistaLOAN.Administration {
    interface TranslationListRequest extends Serenity.ListRequest {
        SourceLanguageID?: string;
        TargetLanguageID?: string;
    }
}
declare namespace VistaLOAN.Administration {
    namespace TranslationService {
        const baseUrl = "Administration/Translation";
        function List(request: TranslationListRequest, onSuccess?: (response: Serenity.ListResponse<TranslationItem>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: TranslationUpdateRequest, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            List = "Administration/Translation/List",
            Update = "Administration/Translation/Update",
        }
    }
}
declare namespace VistaLOAN.Administration {
    interface TranslationUpdateRequest extends Serenity.ServiceRequest {
        TargetLanguageID?: string;
        Translations?: {
            [key: string]: string;
        };
    }
}
declare namespace VistaLOAN.Administration {
}
declare namespace VistaLOAN.Administration {
    interface UserForm {
        Username: Serenity.StringEditor;
        DisplayName: Serenity.StringEditor;
        Email: Serenity.EmailEditor;
        UserImage: Serenity.ImageUploadEditor;
        Password: Serenity.PasswordEditor;
        PasswordConfirm: Serenity.PasswordEditor;
        Source: Serenity.StringEditor;
    }
    class UserForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Administration {
    interface UserPermissionListRequest extends Serenity.ServiceRequest {
        UserID?: number;
        Module?: string;
        Submodule?: string;
    }
}
declare namespace VistaLOAN.Administration {
    interface UserPermissionRow {
        UserPermissionId?: number;
        UserId?: number;
        PermissionKey?: string;
        Granted?: boolean;
        Username?: string;
        User?: string;
    }
    namespace UserPermissionRow {
        const idProperty = "UserPermissionId";
        const nameProperty = "PermissionKey";
        const localTextPrefix = "Administration.UserPermission";
        const enum Fields {
            UserPermissionId = "UserPermissionId",
            UserId = "UserId",
            PermissionKey = "PermissionKey",
            Granted = "Granted",
            Username = "Username",
            User = "User",
        }
    }
}
declare namespace VistaLOAN.Administration {
    namespace UserPermissionService {
        const baseUrl = "Administration/UserPermission";
        function Update(request: UserPermissionUpdateRequest, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: UserPermissionListRequest, onSuccess?: (response: Serenity.ListResponse<UserPermissionRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function ListRolePermissions(request: UserPermissionListRequest, onSuccess?: (response: Serenity.ListResponse<string>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function ListPermissionKeys(request: Serenity.ServiceRequest, onSuccess?: (response: Serenity.ListResponse<string>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Update = "Administration/UserPermission/Update",
            List = "Administration/UserPermission/List",
            ListRolePermissions = "Administration/UserPermission/ListRolePermissions",
            ListPermissionKeys = "Administration/UserPermission/ListPermissionKeys",
        }
    }
}
declare namespace VistaLOAN.Administration {
    interface UserPermissionUpdateRequest extends Serenity.ServiceRequest {
        UserID?: number;
        Module?: string;
        Submodule?: string;
        Permissions?: UserPermissionRow[];
    }
}
declare namespace VistaLOAN.Administration {
    interface UserRoleListRequest extends Serenity.ServiceRequest {
        UserID?: number;
    }
}
declare namespace VistaLOAN.Administration {
    interface UserRoleListResponse extends Serenity.ListResponse<number> {
    }
}
declare namespace VistaLOAN.Administration {
    interface UserRoleRow {
        UserRoleId?: number;
        UserId?: number;
        RoleId?: number;
        Username?: string;
        User?: string;
    }
    namespace UserRoleRow {
        const idProperty = "UserRoleId";
        const localTextPrefix = "Administration.UserRole";
        const enum Fields {
            UserRoleId = "UserRoleId",
            UserId = "UserId",
            RoleId = "RoleId",
            Username = "Username",
            User = "User",
        }
    }
}
declare namespace VistaLOAN.Administration {
    namespace UserRoleService {
        const baseUrl = "Administration/UserRole";
        function Update(request: UserRoleUpdateRequest, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: UserRoleListRequest, onSuccess?: (response: UserRoleListResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Update = "Administration/UserRole/Update",
            List = "Administration/UserRole/List",
        }
    }
}
declare namespace VistaLOAN.Administration {
    interface UserRoleUpdateRequest extends Serenity.ServiceRequest {
        UserID?: number;
        Roles?: number[];
    }
}
declare namespace VistaLOAN.Administration {
    interface UserRow {
        UserId?: number;
        Username?: string;
        Source?: string;
        PasswordHash?: string;
        PasswordSalt?: string;
        DisplayName?: string;
        Email?: string;
        UserImage?: string;
        LastDirectoryUpdate?: string;
        IsActive?: number;
        Password?: string;
        PasswordConfirm?: string;
        InsertUserId?: number;
        InsertDate?: string;
        UpdateUserId?: number;
        UpdateDate?: string;
    }
    namespace UserRow {
        const idProperty = "UserId";
        const isActiveProperty = "IsActive";
        const nameProperty = "Username";
        const localTextPrefix = "Administration.User";
        const enum Fields {
            UserId = "UserId",
            Username = "Username",
            Source = "Source",
            PasswordHash = "PasswordHash",
            PasswordSalt = "PasswordSalt",
            DisplayName = "DisplayName",
            Email = "Email",
            UserImage = "UserImage",
            LastDirectoryUpdate = "LastDirectoryUpdate",
            IsActive = "IsActive",
            Password = "Password",
            PasswordConfirm = "PasswordConfirm",
            InsertUserId = "InsertUserId",
            InsertDate = "InsertDate",
            UpdateUserId = "UpdateUserId",
            UpdateDate = "UpdateDate",
        }
    }
}
declare namespace VistaLOAN.Administration {
    namespace UserService {
        const baseUrl = "Administration/User";
        function Create(request: Serenity.SaveRequest<UserRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<UserRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Undelete(request: Serenity.UndeleteRequest, onSuccess?: (response: Serenity.UndeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<UserRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<UserRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Administration/User/Create",
            Update = "Administration/User/Update",
            Delete = "Administration/User/Delete",
            Undelete = "Administration/User/Undelete",
            Retrieve = "Administration/User/Retrieve",
            List = "Administration/User/List",
        }
    }
}
declare namespace VistaLOAN {
    enum ApprovalStatus {
        Draft = 1,
        Cancel = 2,
        Submit = 3,
        Regret = 4,
        Recommend = 5,
        Approved = 6,
    }
}
declare namespace VistaLOAN {
    enum CollectionType {
        Loan_Installment = 1,
        PF_Contribution = 2,
    }
}
declare namespace VistaLOAN.Common.Pages {
    interface UploadResponse extends Serenity.ServiceResponse {
        TemporaryFile?: string;
        Size?: number;
        IsImage?: boolean;
        Width?: number;
        Height?: number;
    }
}
declare namespace VistaLOAN.Common {
    interface UserPreferenceRetrieveRequest extends Serenity.ServiceRequest {
        PreferenceType?: string;
        Name?: string;
    }
}
declare namespace VistaLOAN.Common {
    interface UserPreferenceRetrieveResponse extends Serenity.ServiceResponse {
        Value?: string;
    }
}
declare namespace VistaLOAN.Common {
    interface UserPreferenceRow {
        UserPreferenceId?: number;
        UserId?: number;
        PreferenceType?: string;
        Name?: string;
        Value?: string;
    }
    namespace UserPreferenceRow {
        const idProperty = "UserPreferenceId";
        const nameProperty = "Name";
        const localTextPrefix = "Common.UserPreference";
        const enum Fields {
            UserPreferenceId = "UserPreferenceId",
            UserId = "UserId",
            PreferenceType = "PreferenceType",
            Name = "Name",
            Value = "Value",
        }
    }
}
declare namespace VistaLOAN.Common {
    namespace UserPreferenceService {
        const baseUrl = "Common/UserPreference";
        function Update(request: UserPreferenceUpdateRequest, onSuccess?: (response: Serenity.ServiceResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: UserPreferenceRetrieveRequest, onSuccess?: (response: UserPreferenceRetrieveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Update = "Common/UserPreference/Update",
            Retrieve = "Common/UserPreference/Retrieve",
        }
    }
}
declare namespace VistaLOAN.Common {
    interface UserPreferenceUpdateRequest extends Serenity.ServiceRequest {
        PreferenceType?: string;
        Name?: string;
        Value?: string;
    }
}
declare namespace VistaLOAN.Configurations {
    interface AccAccountingPeriodInformationRow {
        Id?: number;
        IsActive?: boolean;
        IsClosed?: boolean;
        PeriodEndDate?: string;
        PeriodStartDate?: string;
        YearName?: string;
        FundControlInformationId?: number;
        FundControlInformationCode?: string;
        FundControlInformationFundControlName?: string;
        FundControlInformationBookingDate?: string;
        FundControlInformationCurrencyId?: number;
        FundControlInformationAddress?: string;
        FundControlInformationPhone?: string;
        FundControlInformationMobile?: string;
        FundControlInformationFax?: string;
        FundControlInformationEmail?: string;
        FundControlInformationWebUrl?: string;
        FundControlInformationRemarks?: string;
        FundControlInformationZoneInfoId?: number;
    }
    namespace AccAccountingPeriodInformationRow {
        const idProperty = "Id";
        const nameProperty = "YearName";
        const localTextPrefix = "Configurations.AccAccountingPeriodInformation";
        const lookupKey = "Configurations.AccAccountingPeriodInformation";
        function getLookup(): Q.Lookup<AccAccountingPeriodInformationRow>;
        const enum Fields {
            Id = "Id",
            IsActive = "IsActive",
            IsClosed = "IsClosed",
            PeriodEndDate = "PeriodEndDate",
            PeriodStartDate = "PeriodStartDate",
            YearName = "YearName",
            FundControlInformationId = "FundControlInformationId",
            FundControlInformationCode = "FundControlInformationCode",
            FundControlInformationFundControlName = "FundControlInformationFundControlName",
            FundControlInformationBookingDate = "FundControlInformationBookingDate",
            FundControlInformationCurrencyId = "FundControlInformationCurrencyId",
            FundControlInformationAddress = "FundControlInformationAddress",
            FundControlInformationPhone = "FundControlInformationPhone",
            FundControlInformationMobile = "FundControlInformationMobile",
            FundControlInformationFax = "FundControlInformationFax",
            FundControlInformationEmail = "FundControlInformationEmail",
            FundControlInformationWebUrl = "FundControlInformationWebUrl",
            FundControlInformationRemarks = "FundControlInformationRemarks",
            FundControlInformationZoneInfoId = "FundControlInformationZoneInfoId",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    namespace AccAccountingPeriodInformationService {
        const baseUrl = "Configurations/AccAccountingPeriodInformation";
        function Create(request: Serenity.SaveRequest<AccAccountingPeriodInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<AccAccountingPeriodInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<AccAccountingPeriodInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<AccAccountingPeriodInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Configurations/AccAccountingPeriodInformation/Create",
            Update = "Configurations/AccAccountingPeriodInformation/Update",
            Delete = "Configurations/AccAccountingPeriodInformation/Delete",
            Retrieve = "Configurations/AccAccountingPeriodInformation/Retrieve",
            List = "Configurations/AccAccountingPeriodInformation/List",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface ApvApprovalStatusRow {
        Id?: number;
        StatusName?: string;
        ActionType?: string;
        SortOrder?: number;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
    }
    namespace ApvApprovalStatusRow {
        const idProperty = "Id";
        const nameProperty = "StatusName";
        const localTextPrefix = "Configurations.ApvApprovalStatus";
        const lookupKey = "Configurations.ApvApprovalStatus";
        function getLookup(): Q.Lookup<ApvApprovalStatusRow>;
        const enum Fields {
            Id = "Id",
            StatusName = "StatusName",
            ActionType = "ActionType",
            SortOrder = "SortOrder",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    namespace ApvApprovalStatusService {
        const baseUrl = "Configurations/ApvApprovalStatus";
        function Create(request: Serenity.SaveRequest<ApvApprovalStatusRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<ApvApprovalStatusRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<ApvApprovalStatusRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<ApvApprovalStatusRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Configurations/ApvApprovalStatus/Create",
            Update = "Configurations/ApvApprovalStatus/Update",
            Delete = "Configurations/ApvApprovalStatus/Delete",
            Retrieve = "Configurations/ApvApprovalStatus/Retrieve",
            List = "Configurations/ApvApprovalStatus/List",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface PrmEmploymentInfoRow {
        Id?: number;
        EmpId?: string;
        EmployeeInitial?: string;
        TitleId?: number;
        FirstName?: string;
        MiddleName?: string;
        LastName?: string;
        FullName?: string;
        FullNameBangla?: string;
        DateofJoining?: string;
        ProvisionMonth?: number;
        DateofConfirmation?: string;
        DateofPosition?: string;
        DesignationId?: number;
        StatusDesignationId?: number;
        DisciplineId?: number;
        DivisionId?: number;
        SectionId?: number;
        SubSectionId?: number;
        JobLocationId?: number;
        ResourceLevelId?: number;
        StaffCategoryId?: number;
        EmploymentTypeId?: number;
        ReligionId?: number;
        IsContractual?: boolean;
        IsConsultant?: boolean;
        IsOvertimeEligible?: boolean;
        OvertimeRate?: number;
        MobileNo?: string;
        EmialAddress?: string;
        BankId?: number;
        BankBranchId?: number;
        BankAccountNo?: string;
        EmploymentStatusId?: number;
        DateofInactive?: string;
        IsBonusEligible?: boolean;
        SalaryScaleId?: number;
        JobGradeId?: number;
        Gender?: string;
        ContractExpireDate?: string;
        DateofBirth?: string;
        ContractDuration?: number;
        ContractType?: number;
        OrganogramLevelId?: number;
        DateofAppointment?: string;
        OrderNo?: string;
        QuotaId?: number;
        EmployeeClassId?: number;
        EmploymentProcessId?: number;
        SeniorityPosition?: string;
        DateofSeniority?: string;
        PrlDate?: string;
        IsPensionEligible?: boolean;
        IsLeverageEligible?: boolean;
        CardNo?: string;
        FingerPrintIdentiyNo?: string;
        AttendanceEffectiveDate?: string;
        AttendanceStatus?: boolean;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        IsGeneralShifted?: boolean;
        ZoneInfoId?: number;
        TelephoneOffice?: string;
        Intercom?: string;
        HonoraryDegree?: string;
        IsEligibleForCpf?: boolean;
        TaxRegionId?: number;
        TaxAssesseeType?: number;
        HavingChildWithDisability?: boolean;
        DateofRetirement?: string;
        SalaryWithdrawFromZoneId?: number;
        RegionId?: number;
        TitleName?: string;
        TitleSortOrder?: number;
        TitleRemarks?: string;
        TitleIUser?: string;
        TitleEUser?: string;
        TitleIDate?: string;
        TitleEDate?: string;
        DesignationGradeId?: number;
        DesignationName?: string;
        DesignationNameB?: string;
        DesignationEmployeeClassId?: number;
        DesignationRank?: number;
        DesignationJobDescription?: string;
        DesignationRemarks?: string;
        DesignationSortingOrder?: number;
        DesignationShortName?: string;
        DesignationIUser?: string;
        DesignationIDate?: string;
        DesignationEUser?: string;
        DesignationEDate?: string;
        StatusDesignationGradeId?: number;
        StatusDesignationName?: string;
        StatusDesignationNameB?: string;
        StatusDesignationEmployeeClassId?: number;
        StatusDesignationRank?: number;
        StatusDesignationJobDescription?: string;
        StatusDesignationRemarks?: string;
        StatusDesignationSortingOrder?: number;
        StatusDesignationShortName?: string;
        StatusDesignationIUser?: string;
        StatusDesignationIDate?: string;
        StatusDesignationEUser?: string;
        StatusDesignationEDate?: string;
        DisciplineName?: string;
        DisciplineSortOrder?: number;
        DisciplineRemarks?: string;
        DisciplineZoneInfoId?: number;
        DisciplineIUser?: string;
        DisciplineIDate?: string;
        DisciplineEUser?: string;
        DisciplineEDate?: string;
        DivisionName?: string;
        DivisionSortOrder?: number;
        DivisionRemarks?: string;
        DivisionZoneInfoId?: number;
        DivisionIUser?: string;
        DivisionEUser?: string;
        DivisionIDate?: string;
        DivisionEDate?: string;
        SectionName?: string;
        SectionSortOrder?: number;
        SectionRemarks?: string;
        SectionZoneInfoId?: number;
        SectionIUser?: string;
        SectionIDate?: string;
        SectionEUser?: string;
        SectionEDate?: string;
        SubSectionName?: string;
        SubSectionSortOrder?: number;
        SubSectionRemarks?: string;
        SubSectionIUser?: string;
        SubSectionIDate?: string;
        SubSectionEUser?: string;
        SubSectionEDate?: string;
        JobLocationName?: string;
        JobLocationSortOrder?: number;
        JobLocationRemarks?: string;
        JobLocationIUser?: string;
        JobLocationEUser?: string;
        JobLocationIDate?: string;
        JobLocationEDate?: string;
        ResourceLevelName?: string;
        ResourceLevelSortOrder?: number;
        ResourceLevelRemarks?: string;
        ResourceLevelIUser?: string;
        ResourceLevelEUser?: string;
        ResourceLevelIDate?: string;
        ResourceLevelEDate?: string;
        StaffCategoryName?: string;
        StaffCategorySortOrder?: number;
        StaffCategoryRemarks?: string;
        StaffCategoryIUser?: string;
        StaffCategoryEUser?: string;
        StaffCategoryIDate?: string;
        StaffCategoryEDate?: string;
        EmploymentTypeName?: string;
        EmploymentTypeSortOrder?: number;
        EmploymentTypeRemarks?: string;
        EmploymentTypeIUser?: string;
        EmploymentTypeEUser?: string;
        EmploymentTypeIDate?: string;
        EmploymentTypeEDate?: string;
        ReligionName?: string;
        ReligionSortOrder?: number;
        ReligionRemarks?: string;
        ReligionIUser?: string;
        ReligionEUser?: string;
        ReligionIDate?: string;
        ReligionEDate?: string;
        BankName?: string;
        BankNameInBengali?: string;
        BankRemarks?: string;
        BankZoneInfoId?: number;
        BankIUser?: string;
        BankIDate?: string;
        BankEUser?: string;
        BankEDate?: string;
        BankBranchBankId?: number;
        BankBranchName?: string;
        BankBranchNameInBengali?: string;
        BankBranchAddress?: string;
        BankBranchAddressInBengali?: string;
        BankBranchRemarks?: string;
        BankBranchIUser?: string;
        BankBranchIDate?: string;
        BankBranchEUser?: string;
        BankBranchEDate?: string;
        EmploymentStatusName?: string;
        EmploymentStatusSortOrder?: number;
        EmploymentStatusIUser?: string;
        EmploymentStatusEUser?: string;
        EmploymentStatusIDate?: string;
        EmploymentStatusEDate?: string;
        EmploymentStatusRemarks?: string;
        SalaryScaleSalaryScaleName?: string;
        SalaryScaleDateOfCirculation?: string;
        SalaryScaleDateOfEffective?: string;
        SalaryScaleIUser?: string;
        SalaryScaleIDate?: string;
        SalaryScaleEUser?: string;
        SalaryScaleEDate?: string;
        JobGradeSalaryScaleId?: number;
        JobGradeGradeName?: string;
        JobGradeGradeCode?: string;
        JobGradeNumberOfSteps?: number;
        JobGradeInitialBasic?: number;
        JobGradeLastBasic?: number;
        JobGradeYearlyIncrement?: number;
        JobGradeDateOfEffective?: string;
        JobGradeIsConsolidated?: boolean;
        JobGradeIUser?: string;
        JobGradeIDate?: string;
        JobGradeEUser?: string;
        JobGradeEDate?: string;
        JobGradePayScale?: string;
        OrganogramLevelOrganogramTypeId?: number;
        OrganogramLevelLevelName?: string;
        OrganogramLevelParentId?: number;
        OrganogramLevelCode?: string;
        OrganogramLevelPrefix?: string;
        OrganogramLevelPosition?: number;
        OrganogramLevelIsActive?: boolean;
        OrganogramLevelZoneInfoId?: number;
        OrganogramLevelIUser?: string;
        OrganogramLevelIDate?: string;
        OrganogramLevelEUser?: string;
        OrganogramLevelEDate?: string;
        OrganogramLevelIsEditable?: boolean;
        QuotaName?: string;
        QuotaSortOrder?: number;
        QuotaRemarks?: string;
        QuotaIUser?: string;
        QuotaIDate?: string;
        QuotaEUser?: string;
        QuotaEDate?: string;
        EmployeeClassName?: string;
        EmployeeClassSortOrder?: number;
        EmployeeClassRemarks?: string;
        EmployeeClassIUser?: string;
        EmployeeClassIDate?: string;
        EmployeeClassEUser?: string;
        EmployeeClassEDate?: string;
        EmploymentProcessName?: string;
        EmploymentProcessSortOrder?: number;
        EmploymentProcessRemarks?: string;
        EmploymentProcessIUser?: string;
        EmploymentProcessIDate?: string;
        EmploymentProcessEUser?: string;
        EmploymentProcessEDate?: string;
        ZoneInfoZoneName?: string;
        ZoneInfoZoneNameInBengali?: string;
        ZoneInfoZoneCode?: string;
        ZoneInfoSortOrder?: number;
        ZoneInfoOrganogramCategoryTypeId?: number;
        ZoneInfoZoneAddress?: string;
        ZoneInfoZoneAddressInBengali?: string;
        ZoneInfoPrefix?: string;
        ZoneInfoIsHeadOffice?: boolean;
        TaxRegionRegionName?: string;
        TaxRegionIsActive?: boolean;
        TaxRegionIUser?: string;
        TaxRegionEUser?: string;
        TaxRegionIDate?: string;
        TaxRegionEDate?: string;
    }
    namespace PrmEmploymentInfoRow {
        const idProperty = "Id";
        const nameProperty = "FullName";
        const localTextPrefix = "Configurations.PrmEmploymentInfo";
        const lookupKey = "Configurations.PrmEmploymentInfo";
        function getLookup(): Q.Lookup<PrmEmploymentInfoRow>;
        const enum Fields {
            Id = "Id",
            EmpId = "EmpId",
            EmployeeInitial = "EmployeeInitial",
            TitleId = "TitleId",
            FirstName = "FirstName",
            MiddleName = "MiddleName",
            LastName = "LastName",
            FullName = "FullName",
            FullNameBangla = "FullNameBangla",
            DateofJoining = "DateofJoining",
            ProvisionMonth = "ProvisionMonth",
            DateofConfirmation = "DateofConfirmation",
            DateofPosition = "DateofPosition",
            DesignationId = "DesignationId",
            StatusDesignationId = "StatusDesignationId",
            DisciplineId = "DisciplineId",
            DivisionId = "DivisionId",
            SectionId = "SectionId",
            SubSectionId = "SubSectionId",
            JobLocationId = "JobLocationId",
            ResourceLevelId = "ResourceLevelId",
            StaffCategoryId = "StaffCategoryId",
            EmploymentTypeId = "EmploymentTypeId",
            ReligionId = "ReligionId",
            IsContractual = "IsContractual",
            IsConsultant = "IsConsultant",
            IsOvertimeEligible = "IsOvertimeEligible",
            OvertimeRate = "OvertimeRate",
            MobileNo = "MobileNo",
            EmialAddress = "EmialAddress",
            BankId = "BankId",
            BankBranchId = "BankBranchId",
            BankAccountNo = "BankAccountNo",
            EmploymentStatusId = "EmploymentStatusId",
            DateofInactive = "DateofInactive",
            IsBonusEligible = "IsBonusEligible",
            SalaryScaleId = "SalaryScaleId",
            JobGradeId = "JobGradeId",
            Gender = "Gender",
            ContractExpireDate = "ContractExpireDate",
            DateofBirth = "DateofBirth",
            ContractDuration = "ContractDuration",
            ContractType = "ContractType",
            OrganogramLevelId = "OrganogramLevelId",
            DateofAppointment = "DateofAppointment",
            OrderNo = "OrderNo",
            QuotaId = "QuotaId",
            EmployeeClassId = "EmployeeClassId",
            EmploymentProcessId = "EmploymentProcessId",
            SeniorityPosition = "SeniorityPosition",
            DateofSeniority = "DateofSeniority",
            PrlDate = "PrlDate",
            IsPensionEligible = "IsPensionEligible",
            IsLeverageEligible = "IsLeverageEligible",
            CardNo = "CardNo",
            FingerPrintIdentiyNo = "FingerPrintIdentiyNo",
            AttendanceEffectiveDate = "AttendanceEffectiveDate",
            AttendanceStatus = "AttendanceStatus",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            IsGeneralShifted = "IsGeneralShifted",
            ZoneInfoId = "ZoneInfoId",
            TelephoneOffice = "TelephoneOffice",
            Intercom = "Intercom",
            HonoraryDegree = "HonoraryDegree",
            IsEligibleForCpf = "IsEligibleForCpf",
            TaxRegionId = "TaxRegionId",
            TaxAssesseeType = "TaxAssesseeType",
            HavingChildWithDisability = "HavingChildWithDisability",
            DateofRetirement = "DateofRetirement",
            SalaryWithdrawFromZoneId = "SalaryWithdrawFromZoneId",
            RegionId = "RegionId",
            TitleName = "TitleName",
            TitleSortOrder = "TitleSortOrder",
            TitleRemarks = "TitleRemarks",
            TitleIUser = "TitleIUser",
            TitleEUser = "TitleEUser",
            TitleIDate = "TitleIDate",
            TitleEDate = "TitleEDate",
            DesignationGradeId = "DesignationGradeId",
            DesignationName = "DesignationName",
            DesignationNameB = "DesignationNameB",
            DesignationEmployeeClassId = "DesignationEmployeeClassId",
            DesignationRank = "DesignationRank",
            DesignationJobDescription = "DesignationJobDescription",
            DesignationRemarks = "DesignationRemarks",
            DesignationSortingOrder = "DesignationSortingOrder",
            DesignationShortName = "DesignationShortName",
            DesignationIUser = "DesignationIUser",
            DesignationIDate = "DesignationIDate",
            DesignationEUser = "DesignationEUser",
            DesignationEDate = "DesignationEDate",
            StatusDesignationGradeId = "StatusDesignationGradeId",
            StatusDesignationName = "StatusDesignationName",
            StatusDesignationNameB = "StatusDesignationNameB",
            StatusDesignationEmployeeClassId = "StatusDesignationEmployeeClassId",
            StatusDesignationRank = "StatusDesignationRank",
            StatusDesignationJobDescription = "StatusDesignationJobDescription",
            StatusDesignationRemarks = "StatusDesignationRemarks",
            StatusDesignationSortingOrder = "StatusDesignationSortingOrder",
            StatusDesignationShortName = "StatusDesignationShortName",
            StatusDesignationIUser = "StatusDesignationIUser",
            StatusDesignationIDate = "StatusDesignationIDate",
            StatusDesignationEUser = "StatusDesignationEUser",
            StatusDesignationEDate = "StatusDesignationEDate",
            DisciplineName = "DisciplineName",
            DisciplineSortOrder = "DisciplineSortOrder",
            DisciplineRemarks = "DisciplineRemarks",
            DisciplineZoneInfoId = "DisciplineZoneInfoId",
            DisciplineIUser = "DisciplineIUser",
            DisciplineIDate = "DisciplineIDate",
            DisciplineEUser = "DisciplineEUser",
            DisciplineEDate = "DisciplineEDate",
            DivisionName = "DivisionName",
            DivisionSortOrder = "DivisionSortOrder",
            DivisionRemarks = "DivisionRemarks",
            DivisionZoneInfoId = "DivisionZoneInfoId",
            DivisionIUser = "DivisionIUser",
            DivisionEUser = "DivisionEUser",
            DivisionIDate = "DivisionIDate",
            DivisionEDate = "DivisionEDate",
            SectionName = "SectionName",
            SectionSortOrder = "SectionSortOrder",
            SectionRemarks = "SectionRemarks",
            SectionZoneInfoId = "SectionZoneInfoId",
            SectionIUser = "SectionIUser",
            SectionIDate = "SectionIDate",
            SectionEUser = "SectionEUser",
            SectionEDate = "SectionEDate",
            SubSectionName = "SubSectionName",
            SubSectionSortOrder = "SubSectionSortOrder",
            SubSectionRemarks = "SubSectionRemarks",
            SubSectionIUser = "SubSectionIUser",
            SubSectionIDate = "SubSectionIDate",
            SubSectionEUser = "SubSectionEUser",
            SubSectionEDate = "SubSectionEDate",
            JobLocationName = "JobLocationName",
            JobLocationSortOrder = "JobLocationSortOrder",
            JobLocationRemarks = "JobLocationRemarks",
            JobLocationIUser = "JobLocationIUser",
            JobLocationEUser = "JobLocationEUser",
            JobLocationIDate = "JobLocationIDate",
            JobLocationEDate = "JobLocationEDate",
            ResourceLevelName = "ResourceLevelName",
            ResourceLevelSortOrder = "ResourceLevelSortOrder",
            ResourceLevelRemarks = "ResourceLevelRemarks",
            ResourceLevelIUser = "ResourceLevelIUser",
            ResourceLevelEUser = "ResourceLevelEUser",
            ResourceLevelIDate = "ResourceLevelIDate",
            ResourceLevelEDate = "ResourceLevelEDate",
            StaffCategoryName = "StaffCategoryName",
            StaffCategorySortOrder = "StaffCategorySortOrder",
            StaffCategoryRemarks = "StaffCategoryRemarks",
            StaffCategoryIUser = "StaffCategoryIUser",
            StaffCategoryEUser = "StaffCategoryEUser",
            StaffCategoryIDate = "StaffCategoryIDate",
            StaffCategoryEDate = "StaffCategoryEDate",
            EmploymentTypeName = "EmploymentTypeName",
            EmploymentTypeSortOrder = "EmploymentTypeSortOrder",
            EmploymentTypeRemarks = "EmploymentTypeRemarks",
            EmploymentTypeIUser = "EmploymentTypeIUser",
            EmploymentTypeEUser = "EmploymentTypeEUser",
            EmploymentTypeIDate = "EmploymentTypeIDate",
            EmploymentTypeEDate = "EmploymentTypeEDate",
            ReligionName = "ReligionName",
            ReligionSortOrder = "ReligionSortOrder",
            ReligionRemarks = "ReligionRemarks",
            ReligionIUser = "ReligionIUser",
            ReligionEUser = "ReligionEUser",
            ReligionIDate = "ReligionIDate",
            ReligionEDate = "ReligionEDate",
            BankName = "BankName",
            BankNameInBengali = "BankNameInBengali",
            BankRemarks = "BankRemarks",
            BankZoneInfoId = "BankZoneInfoId",
            BankIUser = "BankIUser",
            BankIDate = "BankIDate",
            BankEUser = "BankEUser",
            BankEDate = "BankEDate",
            BankBranchBankId = "BankBranchBankId",
            BankBranchName = "BankBranchName",
            BankBranchNameInBengali = "BankBranchNameInBengali",
            BankBranchAddress = "BankBranchAddress",
            BankBranchAddressInBengali = "BankBranchAddressInBengali",
            BankBranchRemarks = "BankBranchRemarks",
            BankBranchIUser = "BankBranchIUser",
            BankBranchIDate = "BankBranchIDate",
            BankBranchEUser = "BankBranchEUser",
            BankBranchEDate = "BankBranchEDate",
            EmploymentStatusName = "EmploymentStatusName",
            EmploymentStatusSortOrder = "EmploymentStatusSortOrder",
            EmploymentStatusIUser = "EmploymentStatusIUser",
            EmploymentStatusEUser = "EmploymentStatusEUser",
            EmploymentStatusIDate = "EmploymentStatusIDate",
            EmploymentStatusEDate = "EmploymentStatusEDate",
            EmploymentStatusRemarks = "EmploymentStatusRemarks",
            SalaryScaleSalaryScaleName = "SalaryScaleSalaryScaleName",
            SalaryScaleDateOfCirculation = "SalaryScaleDateOfCirculation",
            SalaryScaleDateOfEffective = "SalaryScaleDateOfEffective",
            SalaryScaleIUser = "SalaryScaleIUser",
            SalaryScaleIDate = "SalaryScaleIDate",
            SalaryScaleEUser = "SalaryScaleEUser",
            SalaryScaleEDate = "SalaryScaleEDate",
            JobGradeSalaryScaleId = "JobGradeSalaryScaleId",
            JobGradeGradeName = "JobGradeGradeName",
            JobGradeGradeCode = "JobGradeGradeCode",
            JobGradeNumberOfSteps = "JobGradeNumberOfSteps",
            JobGradeInitialBasic = "JobGradeInitialBasic",
            JobGradeLastBasic = "JobGradeLastBasic",
            JobGradeYearlyIncrement = "JobGradeYearlyIncrement",
            JobGradeDateOfEffective = "JobGradeDateOfEffective",
            JobGradeIsConsolidated = "JobGradeIsConsolidated",
            JobGradeIUser = "JobGradeIUser",
            JobGradeIDate = "JobGradeIDate",
            JobGradeEUser = "JobGradeEUser",
            JobGradeEDate = "JobGradeEDate",
            JobGradePayScale = "JobGradePayScale",
            OrganogramLevelOrganogramTypeId = "OrganogramLevelOrganogramTypeId",
            OrganogramLevelLevelName = "OrganogramLevelLevelName",
            OrganogramLevelParentId = "OrganogramLevelParentId",
            OrganogramLevelCode = "OrganogramLevelCode",
            OrganogramLevelPrefix = "OrganogramLevelPrefix",
            OrganogramLevelPosition = "OrganogramLevelPosition",
            OrganogramLevelIsActive = "OrganogramLevelIsActive",
            OrganogramLevelZoneInfoId = "OrganogramLevelZoneInfoId",
            OrganogramLevelIUser = "OrganogramLevelIUser",
            OrganogramLevelIDate = "OrganogramLevelIDate",
            OrganogramLevelEUser = "OrganogramLevelEUser",
            OrganogramLevelEDate = "OrganogramLevelEDate",
            OrganogramLevelIsEditable = "OrganogramLevelIsEditable",
            QuotaName = "QuotaName",
            QuotaSortOrder = "QuotaSortOrder",
            QuotaRemarks = "QuotaRemarks",
            QuotaIUser = "QuotaIUser",
            QuotaIDate = "QuotaIDate",
            QuotaEUser = "QuotaEUser",
            QuotaEDate = "QuotaEDate",
            EmployeeClassName = "EmployeeClassName",
            EmployeeClassSortOrder = "EmployeeClassSortOrder",
            EmployeeClassRemarks = "EmployeeClassRemarks",
            EmployeeClassIUser = "EmployeeClassIUser",
            EmployeeClassIDate = "EmployeeClassIDate",
            EmployeeClassEUser = "EmployeeClassEUser",
            EmployeeClassEDate = "EmployeeClassEDate",
            EmploymentProcessName = "EmploymentProcessName",
            EmploymentProcessSortOrder = "EmploymentProcessSortOrder",
            EmploymentProcessRemarks = "EmploymentProcessRemarks",
            EmploymentProcessIUser = "EmploymentProcessIUser",
            EmploymentProcessIDate = "EmploymentProcessIDate",
            EmploymentProcessEUser = "EmploymentProcessEUser",
            EmploymentProcessEDate = "EmploymentProcessEDate",
            ZoneInfoZoneName = "ZoneInfoZoneName",
            ZoneInfoZoneNameInBengali = "ZoneInfoZoneNameInBengali",
            ZoneInfoZoneCode = "ZoneInfoZoneCode",
            ZoneInfoSortOrder = "ZoneInfoSortOrder",
            ZoneInfoOrganogramCategoryTypeId = "ZoneInfoOrganogramCategoryTypeId",
            ZoneInfoZoneAddress = "ZoneInfoZoneAddress",
            ZoneInfoZoneAddressInBengali = "ZoneInfoZoneAddressInBengali",
            ZoneInfoPrefix = "ZoneInfoPrefix",
            ZoneInfoIsHeadOffice = "ZoneInfoIsHeadOffice",
            TaxRegionRegionName = "TaxRegionRegionName",
            TaxRegionIsActive = "TaxRegionIsActive",
            TaxRegionIUser = "TaxRegionIUser",
            TaxRegionEUser = "TaxRegionEUser",
            TaxRegionIDate = "TaxRegionIDate",
            TaxRegionEDate = "TaxRegionEDate",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    namespace PrmEmploymentInfoService {
        const baseUrl = "Configurations/PrmEmploymentInfo";
        function Create(request: Serenity.SaveRequest<PrmEmploymentInfoRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<PrmEmploymentInfoRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<PrmEmploymentInfoRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<PrmEmploymentInfoRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Configurations/PrmEmploymentInfo/Create",
            Update = "Configurations/PrmEmploymentInfo/Update",
            Delete = "Configurations/PrmEmploymentInfo/Delete",
            Retrieve = "Configurations/PrmEmploymentInfo/Retrieve",
            List = "Configurations/PrmEmploymentInfo/List",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface PrmEmploymentTypeRow {
        Id?: number;
        Name?: string;
        SortOrder?: number;
        Remarks?: string;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace PrmEmploymentTypeRow {
        const idProperty = "Id";
        const nameProperty = "Name";
        const localTextPrefix = "Configurations.PrmEmploymentType";
        const lookupKey = "Configurations.PrmEmploymentType";
        function getLookup(): Q.Lookup<PrmEmploymentTypeRow>;
        const enum Fields {
            Id = "Id",
            Name = "Name",
            SortOrder = "SortOrder",
            Remarks = "Remarks",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface PrmJobGradeRow {
        Id?: number;
        SalaryScaleId?: number;
        GradeName?: string;
        GradeCode?: string;
        NumberOfSteps?: number;
        InitialBasic?: number;
        LastBasic?: number;
        YearlyIncrement?: number;
        DateOfEffective?: string;
        IsConsolidated?: boolean;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        PayScale?: string;
        SalaryScaleSalaryScaleName?: string;
        SalaryScaleDateOfCirculation?: string;
        SalaryScaleDateOfEffective?: string;
        SalaryScaleIUser?: string;
        SalaryScaleIDate?: string;
        SalaryScaleEUser?: string;
        SalaryScaleEDate?: string;
    }
    namespace PrmJobGradeRow {
        const idProperty = "Id";
        const nameProperty = "GradeName";
        const localTextPrefix = "Configurations.PrmJobGrade";
        const lookupKey = "Configurations.PrmJobGrade";
        function getLookup(): Q.Lookup<PrmJobGradeRow>;
        const enum Fields {
            Id = "Id",
            SalaryScaleId = "SalaryScaleId",
            GradeName = "GradeName",
            GradeCode = "GradeCode",
            NumberOfSteps = "NumberOfSteps",
            InitialBasic = "InitialBasic",
            LastBasic = "LastBasic",
            YearlyIncrement = "YearlyIncrement",
            DateOfEffective = "DateOfEffective",
            IsConsolidated = "IsConsolidated",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            PayScale = "PayScale",
            SalaryScaleSalaryScaleName = "SalaryScaleSalaryScaleName",
            SalaryScaleDateOfCirculation = "SalaryScaleDateOfCirculation",
            SalaryScaleDateOfEffective = "SalaryScaleDateOfEffective",
            SalaryScaleIUser = "SalaryScaleIUser",
            SalaryScaleIDate = "SalaryScaleIDate",
            SalaryScaleEUser = "SalaryScaleEUser",
            SalaryScaleEDate = "SalaryScaleEDate",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface PrmSalaryHeadRow {
        Id?: number;
        GroupId?: number;
        HeadName?: string;
        IsActiveHead?: boolean;
        ShortName?: string;
        HeadType?: string;
        AmountType?: string;
        AccountHeadId?: number;
        EntityNameId?: number;
        IsBasicHead?: boolean;
        IsTaxable?: boolean;
        IsGrossPayHead?: boolean;
        SortOrder?: number;
        DefaultAmount?: number;
        IsOtherAddition?: boolean;
        IsOtherDeduction?: boolean;
        IsIncomeTaxAdditionHead?: boolean;
        IsIncomeTaxDeductionHead?: boolean;
        IsPfOwnContributionHead?: boolean;
        IsPfCompanyContributionHead?: boolean;
        IsHouseRentHead?: boolean;
        IsMedicalHead?: boolean;
        IsConveyanceHead?: boolean;
        IsLeaveWithoutPayHead?: boolean;
        IsPensionHead?: boolean;
        IsGpfHead?: boolean;
        IsArrearHead?: boolean;
        IsGratuityHead?: boolean;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
        GroupName?: string;
        GroupHeadType?: string;
        GroupRemarks?: string;
        GroupSortOrder?: number;
        GroupIUser?: string;
        GroupEUser?: string;
        GroupIDate?: string;
        GroupEDate?: string;
    }
    namespace PrmSalaryHeadRow {
        const idProperty = "Id";
        const nameProperty = "HeadName";
        const localTextPrefix = "Configurations.PrmSalaryHead";
        const lookupKey = "Configurations.PrmSalaryHead";
        function getLookup(): Q.Lookup<PrmSalaryHeadRow>;
        const enum Fields {
            Id = "Id",
            GroupId = "GroupId",
            HeadName = "HeadName",
            IsActiveHead = "IsActiveHead",
            ShortName = "ShortName",
            HeadType = "HeadType",
            AmountType = "AmountType",
            AccountHeadId = "AccountHeadId",
            EntityNameId = "EntityNameId",
            IsBasicHead = "IsBasicHead",
            IsTaxable = "IsTaxable",
            IsGrossPayHead = "IsGrossPayHead",
            SortOrder = "SortOrder",
            DefaultAmount = "DefaultAmount",
            IsOtherAddition = "IsOtherAddition",
            IsOtherDeduction = "IsOtherDeduction",
            IsIncomeTaxAdditionHead = "IsIncomeTaxAdditionHead",
            IsIncomeTaxDeductionHead = "IsIncomeTaxDeductionHead",
            IsPfOwnContributionHead = "IsPfOwnContributionHead",
            IsPfCompanyContributionHead = "IsPfCompanyContributionHead",
            IsHouseRentHead = "IsHouseRentHead",
            IsMedicalHead = "IsMedicalHead",
            IsConveyanceHead = "IsConveyanceHead",
            IsLeaveWithoutPayHead = "IsLeaveWithoutPayHead",
            IsPensionHead = "IsPensionHead",
            IsGpfHead = "IsGpfHead",
            IsArrearHead = "IsArrearHead",
            IsGratuityHead = "IsGratuityHead",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
            GroupName = "GroupName",
            GroupHeadType = "GroupHeadType",
            GroupRemarks = "GroupRemarks",
            GroupSortOrder = "GroupSortOrder",
            GroupIUser = "GroupIUser",
            GroupEUser = "GroupEUser",
            GroupIDate = "GroupIDate",
            GroupEDate = "GroupEDate",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface PrmSalaryScaleRow {
        Id?: number;
        SalaryScaleName?: string;
        DateOfCirculation?: string;
        DateOfEffective?: string;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
    }
    namespace PrmSalaryScaleRow {
        const idProperty = "Id";
        const nameProperty = "SalaryScaleName";
        const localTextPrefix = "Configurations.PrmSalaryScale";
        const lookupKey = "Configurations.PrmSalaryScale";
        function getLookup(): Q.Lookup<PrmSalaryScaleRow>;
        const enum Fields {
            Id = "Id",
            SalaryScaleName = "SalaryScaleName",
            DateOfCirculation = "DateOfCirculation",
            DateOfEffective = "DateOfEffective",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Configurations {
    interface PrmZoneInfoRow {
        Id?: number;
        ZoneName?: string;
        ZoneNameInBengali?: string;
        ZoneCode?: string;
        SortOrder?: number;
        OrganogramCategoryTypeId?: number;
        ZoneAddress?: string;
        ZoneAddressInBengali?: string;
        Prefix?: string;
        IsHeadOffice?: boolean;
        OrganogramCategoryTypeName?: string;
        OrganogramCategoryTypeSortOrder?: number;
        OrganogramCategoryTypeRemarks?: string;
        OrganogramCategoryTypeIUser?: string;
        OrganogramCategoryTypeEUser?: string;
        OrganogramCategoryTypeIDate?: string;
        OrganogramCategoryTypeEDate?: string;
    }
    namespace PrmZoneInfoRow {
        const idProperty = "Id";
        const nameProperty = "ZoneName";
        const localTextPrefix = "Configurations.PrmZoneInfo";
        const lookupKey = "Configurations.PrmZoneInfoRow";
        function getLookup(): Q.Lookup<PrmZoneInfoRow>;
        const enum Fields {
            Id = "Id",
            ZoneName = "ZoneName",
            ZoneNameInBengali = "ZoneNameInBengali",
            ZoneCode = "ZoneCode",
            SortOrder = "SortOrder",
            OrganogramCategoryTypeId = "OrganogramCategoryTypeId",
            ZoneAddress = "ZoneAddress",
            ZoneAddressInBengali = "ZoneAddressInBengali",
            Prefix = "Prefix",
            IsHeadOffice = "IsHeadOffice",
            OrganogramCategoryTypeName = "OrganogramCategoryTypeName",
            OrganogramCategoryTypeSortOrder = "OrganogramCategoryTypeSortOrder",
            OrganogramCategoryTypeRemarks = "OrganogramCategoryTypeRemarks",
            OrganogramCategoryTypeIUser = "OrganogramCategoryTypeIUser",
            OrganogramCategoryTypeEUser = "OrganogramCategoryTypeEUser",
            OrganogramCategoryTypeIDate = "OrganogramCategoryTypeIDate",
            OrganogramCategoryTypeEDate = "OrganogramCategoryTypeEDate",
        }
    }
}
declare namespace VistaLOAN {
    enum EffectinCashFlow {
        Investing = 0,
        Operating = 1,
        Financing = 2,
    }
}
declare namespace VistaLOAN {
    interface ExcelImportRequest extends Serenity.ServiceRequest {
        FileName?: string;
    }
}
declare namespace VistaLOAN {
    interface ExcelImportResponse extends Serenity.ServiceResponse {
        Inserted?: number;
        Updated?: number;
        ErrorList?: string[];
    }
}
declare namespace VistaLOAN {
    interface GetNextNumberRequest extends Serenity.ServiceRequest {
        Prefix?: string;
        Length?: number;
    }
}
declare namespace VistaLOAN {
    interface GetNextNumberResponse extends Serenity.ServiceResponse {
        Number?: number;
        Serial?: string;
    }
}
declare namespace VistaLOAN {
    interface GetNextVoucherNumberRequest extends Serenity.ServiceRequest {
        TransactionTypeId?: number;
        Prefix?: string;
        Length?: number;
        StartingNumber?: number;
        ZoneID?: number;
        FundControlInformationId?: number;
    }
}
declare namespace VistaLOAN.HRM {
}
declare namespace VistaLOAN.HRM {
    interface EmploymentInfoForm {
        EmpId: Serenity.StringEditor;
        EmployeeInitial: Serenity.StringEditor;
        TitleId: Serenity.IntegerEditor;
        FirstName: Serenity.StringEditor;
        MiddleName: Serenity.StringEditor;
        LastName: Serenity.StringEditor;
        FullName: Serenity.StringEditor;
        DateofJoining: Serenity.DateEditor;
        ProvisionMonth: Serenity.IntegerEditor;
        DateofConfirmation: Serenity.DateEditor;
        DateofPosition: Serenity.DateEditor;
        DesignationId: Serenity.IntegerEditor;
        DisciplineId: Serenity.IntegerEditor;
        DivisionId: Serenity.IntegerEditor;
        SectionId: Serenity.IntegerEditor;
        SubSectionId: Serenity.IntegerEditor;
        JobLocationId: Serenity.IntegerEditor;
        ResourceLevelId: Serenity.IntegerEditor;
        StaffCategoryId: Serenity.IntegerEditor;
        ShiftId: Serenity.IntegerEditor;
        EmploymentTypeId: Serenity.IntegerEditor;
        ReligionId: Serenity.IntegerEditor;
        IsContractual: Serenity.BooleanEditor;
        IsConsultant: Serenity.BooleanEditor;
        IsOvertimeEligible: Serenity.BooleanEditor;
        OvertimeRate: Serenity.DecimalEditor;
        MobileNo: Serenity.StringEditor;
        EmialAddress: Serenity.StringEditor;
        BankId: Serenity.IntegerEditor;
        BankBranchId: Serenity.IntegerEditor;
        BankAccountNo: Serenity.StringEditor;
        EmploymentStatusId: Serenity.IntegerEditor;
        DateofInactive: Serenity.DateEditor;
        IsBonusEligible: Serenity.BooleanEditor;
        IsTaxPaidbyIwm: Serenity.BooleanEditor;
        SalaryScaleId: Serenity.IntegerEditor;
        JobGradeId: Serenity.IntegerEditor;
        Gender: Serenity.StringEditor;
        ContractExpireDate: Serenity.DateEditor;
        DateofBirth: Serenity.DateEditor;
        ContractDuration: Serenity.DecimalEditor;
        ContractType: Serenity.IntegerEditor;
        ActualRate: Serenity.DecimalEditor;
        BudgetRate: Serenity.DecimalEditor;
        OrganogramLevelId: Serenity.IntegerEditor;
        DateofAppointment: Serenity.DateEditor;
        OrderNo: Serenity.StringEditor;
        QuotaId: Serenity.IntegerEditor;
        EmployeeClassId: Serenity.IntegerEditor;
        EmploymentProcessId: Serenity.IntegerEditor;
        SeniorityPosition: Serenity.StringEditor;
        DateofSeniority: Serenity.DateEditor;
        PrlDate: Serenity.DateEditor;
        IsPensionEligible: Serenity.BooleanEditor;
        IsLeverageEligible: Serenity.BooleanEditor;
        CardNo: Serenity.StringEditor;
        FingerPrintIdentiyNo: Serenity.StringEditor;
        AttendanceEffectiveDate: Serenity.DateEditor;
        AttendanceStatus: Serenity.BooleanEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        IsGeneralShifted: Serenity.BooleanEditor;
        RegionId: Serenity.IntegerEditor;
    }
    class EmploymentInfoForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.HRM {
    interface EmploymentInfoRow {
        Id?: number;
        EmpId?: string;
        EmployeeInitial?: string;
        TitleId?: number;
        FirstName?: string;
        MiddleName?: string;
        LastName?: string;
        FullName?: string;
        DateofJoining?: string;
        ProvisionMonth?: number;
        DateofConfirmation?: string;
        DateofPosition?: string;
        DesignationId?: number;
        DisciplineId?: number;
        DivisionId?: number;
        SectionId?: number;
        SubSectionId?: number;
        JobLocationId?: number;
        ResourceLevelId?: number;
        StaffCategoryId?: number;
        ShiftId?: number;
        EmploymentTypeId?: number;
        ReligionId?: number;
        IsContractual?: boolean;
        IsConsultant?: boolean;
        IsOvertimeEligible?: boolean;
        OvertimeRate?: number;
        MobileNo?: string;
        EmialAddress?: string;
        BankId?: number;
        BankBranchId?: number;
        BankAccountNo?: string;
        EmploymentStatusId?: number;
        DateofInactive?: string;
        IsBonusEligible?: boolean;
        IsTaxPaidbyIwm?: boolean;
        SalaryScaleId?: number;
        JobGradeId?: number;
        Gender?: string;
        ContractExpireDate?: string;
        DateofBirth?: string;
        ContractDuration?: number;
        ContractType?: number;
        ActualRate?: number;
        BudgetRate?: number;
        OrganogramLevelId?: number;
        DateofAppointment?: string;
        OrderNo?: string;
        QuotaId?: number;
        EmployeeClassId?: number;
        EmploymentProcessId?: number;
        SeniorityPosition?: string;
        DateofSeniority?: string;
        PrlDate?: string;
        IsPensionEligible?: boolean;
        IsLeverageEligible?: boolean;
        CardNo?: string;
        FingerPrintIdentiyNo?: string;
        AttendanceEffectiveDate?: string;
        AttendanceStatus?: boolean;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        IsGeneralShifted?: boolean;
        RegionId?: number;
        TitleName?: string;
        LookupText?: string;
        TitleSortOrder?: number;
        DesignationGradeId?: number;
        DesignationName?: string;
        DesignationShortName?: string;
        DesignationNameB?: string;
        DesignationEmployeeClassId?: number;
        DesignationRank?: number;
        DesignationJobDescription?: string;
        DesignationSortingOrder?: number;
        DisciplineName?: string;
        DisciplineSortOrder?: number;
        DivisionName?: string;
        DivisionSortOrder?: number;
        SectionName?: string;
        SectionSortOrder?: number;
        SubSectionName?: string;
        SubSectionSortOrder?: number;
        JobLocationName?: string;
        JobLocationSortOrder?: number;
        ResourceLevelName?: string;
        ResourceLevelSortOrder?: number;
        StaffCategoryName?: string;
        StaffCategorySortOrder?: number;
        StaffCategoryRetirementAge?: number;
        ShiftName?: string;
        ShiftSortOrder?: number;
        EmploymentTypeName?: string;
        EmploymentTypeSortOrder?: number;
        ReligionName?: string;
        ReligionSortOrder?: number;
        BankName?: string;
        BankBranchBankId?: number;
        BankBranchName?: string;
        BankBranchAddress?: string;
        EmploymentStatusName?: string;
        EmploymentStatusSortOrder?: number;
        SalaryScaleSalaryScaleName?: string;
        SalaryScaleDateOfCirculation?: string;
        SalaryScaleDateOfEffective?: string;
        JobGradeSalaryScaleId?: number;
        JobGradeGradeName?: string;
        JobGradeGradeCode?: string;
        JobGradeNumberOfSteps?: number;
        JobGradeInitialBasic?: number;
        JobGradeLastBasic?: number;
        JobGradeYearlyIncrement?: number;
        JobGradeDateOfEffective?: string;
        JobGradeIsConsolidated?: boolean;
        JobGradePayScale?: string;
        OrganogramLevelOrganogramTypeId?: number;
        OrganogramLevelLevelName?: string;
        OrganogramLevelParentId?: number;
        OrganogramLevelCode?: string;
        OrganogramLevelPrefix?: string;
        OrganogramLevelPosition?: number;
        OrganogramLevelIsActive?: boolean;
        QuotaName?: string;
        QuotaSortOrder?: number;
        EmployeeClassName?: string;
        EmployeeClassSortOrder?: number;
        EmploymentProcessName?: string;
        EmploymentProcessSortOrder?: number;
        RegionName?: string;
        RegionSortOrder?: number;
    }
    namespace EmploymentInfoRow {
        const idProperty = "Id";
        const nameProperty = "LookupText";
        const localTextPrefix = "HRM.EmploymentInfo";
        const lookupKey = "HRM.EmploymentInfo";
        function getLookup(): Q.Lookup<EmploymentInfoRow>;
        const enum Fields {
            Id = "Id",
            EmpId = "EmpId",
            EmployeeInitial = "EmployeeInitial",
            TitleId = "TitleId",
            FirstName = "FirstName",
            MiddleName = "MiddleName",
            LastName = "LastName",
            FullName = "FullName",
            DateofJoining = "DateofJoining",
            ProvisionMonth = "ProvisionMonth",
            DateofConfirmation = "DateofConfirmation",
            DateofPosition = "DateofPosition",
            DesignationId = "DesignationId",
            DisciplineId = "DisciplineId",
            DivisionId = "DivisionId",
            SectionId = "SectionId",
            SubSectionId = "SubSectionId",
            JobLocationId = "JobLocationId",
            ResourceLevelId = "ResourceLevelId",
            StaffCategoryId = "StaffCategoryId",
            ShiftId = "ShiftId",
            EmploymentTypeId = "EmploymentTypeId",
            ReligionId = "ReligionId",
            IsContractual = "IsContractual",
            IsConsultant = "IsConsultant",
            IsOvertimeEligible = "IsOvertimeEligible",
            OvertimeRate = "OvertimeRate",
            MobileNo = "MobileNo",
            EmialAddress = "EmialAddress",
            BankId = "BankId",
            BankBranchId = "BankBranchId",
            BankAccountNo = "BankAccountNo",
            EmploymentStatusId = "EmploymentStatusId",
            DateofInactive = "DateofInactive",
            IsBonusEligible = "IsBonusEligible",
            IsTaxPaidbyIwm = "IsTaxPaidbyIwm",
            SalaryScaleId = "SalaryScaleId",
            JobGradeId = "JobGradeId",
            Gender = "Gender",
            ContractExpireDate = "ContractExpireDate",
            DateofBirth = "DateofBirth",
            ContractDuration = "ContractDuration",
            ContractType = "ContractType",
            ActualRate = "ActualRate",
            BudgetRate = "BudgetRate",
            OrganogramLevelId = "OrganogramLevelId",
            DateofAppointment = "DateofAppointment",
            OrderNo = "OrderNo",
            QuotaId = "QuotaId",
            EmployeeClassId = "EmployeeClassId",
            EmploymentProcessId = "EmploymentProcessId",
            SeniorityPosition = "SeniorityPosition",
            DateofSeniority = "DateofSeniority",
            PrlDate = "PrlDate",
            IsPensionEligible = "IsPensionEligible",
            IsLeverageEligible = "IsLeverageEligible",
            CardNo = "CardNo",
            FingerPrintIdentiyNo = "FingerPrintIdentiyNo",
            AttendanceEffectiveDate = "AttendanceEffectiveDate",
            AttendanceStatus = "AttendanceStatus",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            IsGeneralShifted = "IsGeneralShifted",
            RegionId = "RegionId",
            TitleName = "TitleName",
            LookupText = "LookupText",
            TitleSortOrder = "TitleSortOrder",
            DesignationGradeId = "DesignationGradeId",
            DesignationName = "DesignationName",
            DesignationShortName = "DesignationShortName",
            DesignationNameB = "DesignationNameB",
            DesignationEmployeeClassId = "DesignationEmployeeClassId",
            DesignationRank = "DesignationRank",
            DesignationJobDescription = "DesignationJobDescription",
            DesignationSortingOrder = "DesignationSortingOrder",
            DisciplineName = "DisciplineName",
            DisciplineSortOrder = "DisciplineSortOrder",
            DivisionName = "DivisionName",
            DivisionSortOrder = "DivisionSortOrder",
            SectionName = "SectionName",
            SectionSortOrder = "SectionSortOrder",
            SubSectionName = "SubSectionName",
            SubSectionSortOrder = "SubSectionSortOrder",
            JobLocationName = "JobLocationName",
            JobLocationSortOrder = "JobLocationSortOrder",
            ResourceLevelName = "ResourceLevelName",
            ResourceLevelSortOrder = "ResourceLevelSortOrder",
            StaffCategoryName = "StaffCategoryName",
            StaffCategorySortOrder = "StaffCategorySortOrder",
            StaffCategoryRetirementAge = "StaffCategoryRetirementAge",
            ShiftName = "ShiftName",
            ShiftSortOrder = "ShiftSortOrder",
            EmploymentTypeName = "EmploymentTypeName",
            EmploymentTypeSortOrder = "EmploymentTypeSortOrder",
            ReligionName = "ReligionName",
            ReligionSortOrder = "ReligionSortOrder",
            BankName = "BankName",
            BankBranchBankId = "BankBranchBankId",
            BankBranchName = "BankBranchName",
            BankBranchAddress = "BankBranchAddress",
            EmploymentStatusName = "EmploymentStatusName",
            EmploymentStatusSortOrder = "EmploymentStatusSortOrder",
            SalaryScaleSalaryScaleName = "SalaryScaleSalaryScaleName",
            SalaryScaleDateOfCirculation = "SalaryScaleDateOfCirculation",
            SalaryScaleDateOfEffective = "SalaryScaleDateOfEffective",
            JobGradeSalaryScaleId = "JobGradeSalaryScaleId",
            JobGradeGradeName = "JobGradeGradeName",
            JobGradeGradeCode = "JobGradeGradeCode",
            JobGradeNumberOfSteps = "JobGradeNumberOfSteps",
            JobGradeInitialBasic = "JobGradeInitialBasic",
            JobGradeLastBasic = "JobGradeLastBasic",
            JobGradeYearlyIncrement = "JobGradeYearlyIncrement",
            JobGradeDateOfEffective = "JobGradeDateOfEffective",
            JobGradeIsConsolidated = "JobGradeIsConsolidated",
            JobGradePayScale = "JobGradePayScale",
            OrganogramLevelOrganogramTypeId = "OrganogramLevelOrganogramTypeId",
            OrganogramLevelLevelName = "OrganogramLevelLevelName",
            OrganogramLevelParentId = "OrganogramLevelParentId",
            OrganogramLevelCode = "OrganogramLevelCode",
            OrganogramLevelPrefix = "OrganogramLevelPrefix",
            OrganogramLevelPosition = "OrganogramLevelPosition",
            OrganogramLevelIsActive = "OrganogramLevelIsActive",
            QuotaName = "QuotaName",
            QuotaSortOrder = "QuotaSortOrder",
            EmployeeClassName = "EmployeeClassName",
            EmployeeClassSortOrder = "EmployeeClassSortOrder",
            EmploymentProcessName = "EmploymentProcessName",
            EmploymentProcessSortOrder = "EmploymentProcessSortOrder",
            RegionName = "RegionName",
            RegionSortOrder = "RegionSortOrder",
        }
    }
}
declare namespace VistaLOAN.HRM {
    namespace EmploymentInfoService {
        const baseUrl = "HRM/EmploymentInfo";
        function Create(request: Serenity.SaveRequest<EmploymentInfoRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<EmploymentInfoRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<EmploymentInfoRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<EmploymentInfoRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "HRM/EmploymentInfo/Create",
            Update = "HRM/EmploymentInfo/Update",
            Delete = "HRM/EmploymentInfo/Delete",
            Retrieve = "HRM/EmploymentInfo/Retrieve",
            List = "HRM/EmploymentInfo/List",
        }
    }
}
declare namespace VistaLOAN.HRM {
    interface EmpPhotoRow {
        Id?: number;
        EmployeeId?: number;
        PhotoSignature?: number[];
        IsPhoto?: boolean;
        EmployeeEmpId?: string;
        EmployeeEmployeeInitial?: string;
        EmployeeTitleId?: number;
        EmployeeFirstName?: string;
        EmployeeMiddleName?: string;
        EmployeeLastName?: string;
        EmployeeFullName?: string;
        EmployeeFullNameBangla?: string;
        EmployeeDateofJoining?: string;
        EmployeeProvisionMonth?: number;
        EmployeeDateofConfirmation?: string;
        EmployeeDateofPosition?: string;
        EmployeeDesignationId?: number;
        EmployeeStatusDesignationId?: number;
        EmployeeDisciplineId?: number;
        EmployeeDivisionId?: number;
        EmployeeSectionId?: number;
        EmployeeSubSectionId?: number;
        EmployeeJobLocationId?: number;
        EmployeeResourceLevelId?: number;
        EmployeeStaffCategoryId?: number;
        EmployeeEmploymentTypeId?: number;
        EmployeeReligionId?: number;
        EmployeeIsContractual?: boolean;
        EmployeeOvertimeRate?: number;
        EmployeeMobileNo?: string;
        EmployeeEmialAddress?: string;
        EmployeeBankId?: number;
        EmployeeBankBranchId?: number;
        EmployeeBankAccountNo?: string;
        EmployeeEmploymentStatusId?: number;
        EmployeeDateofInactive?: string;
        EmployeeIsConsultant?: boolean;
        EmployeeIsOvertimeEligible?: boolean;
        EmployeeIsRefreshmentEligible?: boolean;
        EmployeeIsBonusEligible?: boolean;
        EmployeeIsEligibleForCpf?: boolean;
        EmployeeIsGpfEligible?: boolean;
        EmployeeIsPensionEligible?: boolean;
        EmployeeIsLeverageEligible?: boolean;
        EmployeeIsGeneralShifted?: boolean;
        EmployeeSalaryScaleId?: number;
        EmployeeJobGradeId?: number;
        EmployeeGender?: string;
        EmployeeContractExpireDate?: string;
        EmployeeDateofBirth?: string;
        EmployeeContractDuration?: number;
        EmployeeContractType?: number;
        EmployeeOrganogramLevelId?: number;
        EmployeeDateofAppointment?: string;
        EmployeeOrderNo?: string;
        EmployeeQuotaId?: number;
        EmployeeEmployeeClassId?: number;
        EmployeeEmploymentProcessId?: number;
        EmployeeSeniorityPosition?: string;
        EmployeeDateofSeniority?: string;
        EmployeePrlDate?: string;
        EmployeeCardNo?: string;
        EmployeeFingerPrintIdentiyNo?: string;
        EmployeeAttendanceEffectiveDate?: string;
        EmployeeAttendanceStatus?: boolean;
        EmployeeZoneInfoId?: number;
        EmployeeTelephoneOffice?: string;
        EmployeeIntercom?: string;
        EmployeeHonoraryDegree?: string;
        EmployeeTaxRegionId?: number;
        EmployeeTaxAssesseeType?: number;
        EmployeeHavingChildWithDisability?: boolean;
        EmployeeDateofRetirement?: string;
        EmployeeSalaryWithdrawFromZoneId?: number;
        EmployeeRegionId?: number;
        EmployeeEtin?: string;
        EmployeeIUser?: string;
        EmployeeIDate?: string;
        EmployeeEUser?: string;
        EmployeeEDate?: string;
    }
    namespace EmpPhotoRow {
        const idProperty = "Id";
        const localTextPrefix = "HRM.EmpPhoto";
        const lookupKey = "HRM.EmpPhoto";
        function getLookup(): Q.Lookup<EmpPhotoRow>;
        const enum Fields {
            Id = "Id",
            EmployeeId = "EmployeeId",
            PhotoSignature = "PhotoSignature",
            IsPhoto = "IsPhoto",
            EmployeeEmpId = "EmployeeEmpId",
            EmployeeEmployeeInitial = "EmployeeEmployeeInitial",
            EmployeeTitleId = "EmployeeTitleId",
            EmployeeFirstName = "EmployeeFirstName",
            EmployeeMiddleName = "EmployeeMiddleName",
            EmployeeLastName = "EmployeeLastName",
            EmployeeFullName = "EmployeeFullName",
            EmployeeFullNameBangla = "EmployeeFullNameBangla",
            EmployeeDateofJoining = "EmployeeDateofJoining",
            EmployeeProvisionMonth = "EmployeeProvisionMonth",
            EmployeeDateofConfirmation = "EmployeeDateofConfirmation",
            EmployeeDateofPosition = "EmployeeDateofPosition",
            EmployeeDesignationId = "EmployeeDesignationId",
            EmployeeStatusDesignationId = "EmployeeStatusDesignationId",
            EmployeeDisciplineId = "EmployeeDisciplineId",
            EmployeeDivisionId = "EmployeeDivisionId",
            EmployeeSectionId = "EmployeeSectionId",
            EmployeeSubSectionId = "EmployeeSubSectionId",
            EmployeeJobLocationId = "EmployeeJobLocationId",
            EmployeeResourceLevelId = "EmployeeResourceLevelId",
            EmployeeStaffCategoryId = "EmployeeStaffCategoryId",
            EmployeeEmploymentTypeId = "EmployeeEmploymentTypeId",
            EmployeeReligionId = "EmployeeReligionId",
            EmployeeIsContractual = "EmployeeIsContractual",
            EmployeeOvertimeRate = "EmployeeOvertimeRate",
            EmployeeMobileNo = "EmployeeMobileNo",
            EmployeeEmialAddress = "EmployeeEmialAddress",
            EmployeeBankId = "EmployeeBankId",
            EmployeeBankBranchId = "EmployeeBankBranchId",
            EmployeeBankAccountNo = "EmployeeBankAccountNo",
            EmployeeEmploymentStatusId = "EmployeeEmploymentStatusId",
            EmployeeDateofInactive = "EmployeeDateofInactive",
            EmployeeIsConsultant = "EmployeeIsConsultant",
            EmployeeIsOvertimeEligible = "EmployeeIsOvertimeEligible",
            EmployeeIsRefreshmentEligible = "EmployeeIsRefreshmentEligible",
            EmployeeIsBonusEligible = "EmployeeIsBonusEligible",
            EmployeeIsEligibleForCpf = "EmployeeIsEligibleForCpf",
            EmployeeIsGpfEligible = "EmployeeIsGpfEligible",
            EmployeeIsPensionEligible = "EmployeeIsPensionEligible",
            EmployeeIsLeverageEligible = "EmployeeIsLeverageEligible",
            EmployeeIsGeneralShifted = "EmployeeIsGeneralShifted",
            EmployeeSalaryScaleId = "EmployeeSalaryScaleId",
            EmployeeJobGradeId = "EmployeeJobGradeId",
            EmployeeGender = "EmployeeGender",
            EmployeeContractExpireDate = "EmployeeContractExpireDate",
            EmployeeDateofBirth = "EmployeeDateofBirth",
            EmployeeContractDuration = "EmployeeContractDuration",
            EmployeeContractType = "EmployeeContractType",
            EmployeeOrganogramLevelId = "EmployeeOrganogramLevelId",
            EmployeeDateofAppointment = "EmployeeDateofAppointment",
            EmployeeOrderNo = "EmployeeOrderNo",
            EmployeeQuotaId = "EmployeeQuotaId",
            EmployeeEmployeeClassId = "EmployeeEmployeeClassId",
            EmployeeEmploymentProcessId = "EmployeeEmploymentProcessId",
            EmployeeSeniorityPosition = "EmployeeSeniorityPosition",
            EmployeeDateofSeniority = "EmployeeDateofSeniority",
            EmployeePrlDate = "EmployeePrlDate",
            EmployeeCardNo = "EmployeeCardNo",
            EmployeeFingerPrintIdentiyNo = "EmployeeFingerPrintIdentiyNo",
            EmployeeAttendanceEffectiveDate = "EmployeeAttendanceEffectiveDate",
            EmployeeAttendanceStatus = "EmployeeAttendanceStatus",
            EmployeeZoneInfoId = "EmployeeZoneInfoId",
            EmployeeTelephoneOffice = "EmployeeTelephoneOffice",
            EmployeeIntercom = "EmployeeIntercom",
            EmployeeHonoraryDegree = "EmployeeHonoraryDegree",
            EmployeeTaxRegionId = "EmployeeTaxRegionId",
            EmployeeTaxAssesseeType = "EmployeeTaxAssesseeType",
            EmployeeHavingChildWithDisability = "EmployeeHavingChildWithDisability",
            EmployeeDateofRetirement = "EmployeeDateofRetirement",
            EmployeeSalaryWithdrawFromZoneId = "EmployeeSalaryWithdrawFromZoneId",
            EmployeeRegionId = "EmployeeRegionId",
            EmployeeEtin = "EmployeeEtin",
            EmployeeIUser = "EmployeeIUser",
            EmployeeIDate = "EmployeeIDate",
            EmployeeEUser = "EmployeeEUser",
            EmployeeEDate = "EmployeeEDate",
        }
    }
}
declare namespace VistaLOAN.Loandb {
    class LaLoanOpeningForm extends Serenity.PrefixedContext {
        static formKey: string;
    }
    interface LaLoanOpeningForm {
        EmployeeId: Serenity.IntegerEditor;
        BalanceMonth: Serenity.IntegerEditor;
        BalanceYear: Serenity.IntegerEditor;
        PrincipalInstallmentNo: Serenity.IntegerEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        PrincipalPaidAmount: Serenity.DecimalEditor;
        PrincipalDueAmount: Serenity.DecimalEditor;
        InterestInstallmentNo: Serenity.IntegerEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        InterestPaidAmount: Serenity.DecimalEditor;
        InterestDueAmount: Serenity.DecimalEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        LoanApplicationId: Serenity.IntegerEditor;
    }
}
declare namespace VistaLOAN.Loandb {
    interface LaLoanOpeningRow {
        Id?: number;
        EmployeeId?: number;
        BalanceMonth?: number;
        BalanceYear?: number;
        PrincipalInstallmentNo?: number;
        PrincipalInstallmentAmount?: number;
        PrincipalPaidAmount?: number;
        PrincipalDueAmount?: number;
        InterestInstallmentNo?: number;
        InterestInstallmentAmount?: number;
        InterestPaidAmount?: number;
        InterestDueAmount?: number;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        LoanApplicationId?: number;
        LoanApplicationLoanNo?: string;
        LoanApplicationEmployeeId?: number;
        LoanApplicationSeniorityNo?: number;
        LoanApplicationApplyDate?: string;
        LoanApplicationLoanCriteriaId?: number;
        LoanApplicationApplyLoanAmount?: number;
        LoanApplicationApplyPrincipalInstallmentNo?: number;
        LoanApplicationApplyInterestAmount?: number;
        LoanApplicationApplyInterestInstallmentNo?: number;
        LoanApplicationApplyInterestRate?: number;
        LoanApplicationPurpose?: string;
        LoanApplicationGrantedLoanAmount?: number;
        LoanApplicationGrantedPrincipalInstallmentNo?: number;
        LoanApplicationGrantedInterestAmount?: number;
        LoanApplicationGrantedInterestInstallmentNo?: number;
        LoanApplicationGrantedInterestRate?: number;
        LoanApplicationNodeId?: number;
        LoanApplicationApproverId?: string;
        LoanApplicationAppStatusId?: number;
        LoanApplicationIsDiscard?: boolean;
        LoanApplicationIsApprovalProcess?: boolean;
        LoanApplicationIsOffLine?: boolean;
        LoanApplicationIUser?: string;
        LoanApplicationIDate?: string;
        LoanApplicationEUser?: string;
        LoanApplicationEDate?: string;
        LoanApplicationApprovedDate?: string;
        LoanApplicationIsRefundablePfLoan?: boolean;
        LoanApplicationIsReApply?: boolean;
        LoanApplicationIsIssue?: boolean;
        LoanApplicationResponsiblePersonId?: string;
    }
    namespace LaLoanOpeningRow {
        const idProperty = "Id";
        const nameProperty = "IUser";
        const localTextPrefix = "Loandb.LaLoanOpening";
        namespace Fields {
            const Id: any;
            const EmployeeId: any;
            const BalanceMonth: any;
            const BalanceYear: any;
            const PrincipalInstallmentNo: any;
            const PrincipalInstallmentAmount: any;
            const PrincipalPaidAmount: any;
            const PrincipalDueAmount: any;
            const InterestInstallmentNo: any;
            const InterestInstallmentAmount: any;
            const InterestPaidAmount: any;
            const InterestDueAmount: any;
            const IUser: any;
            const IDate: any;
            const EUser: any;
            const EDate: any;
            const LoanApplicationId: any;
            const LoanApplicationLoanNo: string;
            const LoanApplicationEmployeeId: string;
            const LoanApplicationSeniorityNo: string;
            const LoanApplicationApplyDate: string;
            const LoanApplicationLoanCriteriaId: string;
            const LoanApplicationApplyLoanAmount: string;
            const LoanApplicationApplyPrincipalInstallmentNo: string;
            const LoanApplicationApplyInterestAmount: string;
            const LoanApplicationApplyInterestInstallmentNo: string;
            const LoanApplicationApplyInterestRate: string;
            const LoanApplicationPurpose: string;
            const LoanApplicationGrantedLoanAmount: string;
            const LoanApplicationGrantedPrincipalInstallmentNo: string;
            const LoanApplicationGrantedInterestAmount: string;
            const LoanApplicationGrantedInterestInstallmentNo: string;
            const LoanApplicationGrantedInterestRate: string;
            const LoanApplicationNodeId: string;
            const LoanApplicationApproverId: string;
            const LoanApplicationAppStatusId: string;
            const LoanApplicationIsDiscard: string;
            const LoanApplicationIsApprovalProcess: string;
            const LoanApplicationIsOffLine: string;
            const LoanApplicationIUser: string;
            const LoanApplicationIDate: string;
            const LoanApplicationEUser: string;
            const LoanApplicationEDate: string;
            const LoanApplicationApprovedDate: string;
            const LoanApplicationIsRefundablePfLoan: string;
            const LoanApplicationIsReApply: string;
            const LoanApplicationIsIssue: string;
            const LoanApplicationResponsiblePersonId: string;
        }
    }
}
declare namespace VistaLOAN.Loandb {
    namespace LaLoanOpeningService {
        const baseUrl = "Loandb/LaLoanOpening";
        function Create(request: Serenity.SaveRequest<LaLoanOpeningRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanOpeningRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanOpeningRow>) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanOpeningRow>) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        namespace Methods {
            const Create: string;
            const Update: string;
            const Delete: string;
            const Retrieve: string;
            const List: string;
        }
    }
}
declare namespace VistaLOAN.Membership {
    interface ChangePasswordForm {
        OldPassword: Serenity.PasswordEditor;
        NewPassword: Serenity.PasswordEditor;
        ConfirmPassword: Serenity.PasswordEditor;
    }
    class ChangePasswordForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Membership {
    interface ChangePasswordRequest extends Serenity.ServiceRequest {
        OldPassword?: string;
        NewPassword?: string;
        ConfirmPassword?: string;
    }
}
declare namespace VistaLOAN.Membership {
    interface ForgotPasswordForm {
        Email: Serenity.EmailEditor;
    }
    class ForgotPasswordForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Membership {
    interface ForgotPasswordRequest extends Serenity.ServiceRequest {
        Email?: string;
    }
}
declare namespace VistaLOAN.Membership {
    interface LoginForm {
        Username: Serenity.StringEditor;
        Password: Serenity.PasswordEditor;
    }
    class LoginForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Membership {
    interface LoginRequest extends Serenity.ServiceRequest {
        Username?: string;
        Password?: string;
    }
}
declare namespace VistaLOAN.Membership {
    interface ResetPasswordForm {
        NewPassword: Serenity.PasswordEditor;
        ConfirmPassword: Serenity.PasswordEditor;
    }
    class ResetPasswordForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Membership {
    interface ResetPasswordRequest extends Serenity.ServiceRequest {
        Token?: string;
        NewPassword?: string;
        ConfirmPassword?: string;
    }
}
declare namespace VistaLOAN.Membership {
    interface SignUpForm {
        DisplayName: Serenity.StringEditor;
        Email: Serenity.EmailEditor;
        ConfirmEmail: Serenity.EmailEditor;
        Password: Serenity.PasswordEditor;
        ConfirmPassword: Serenity.PasswordEditor;
    }
    class SignUpForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Membership {
    interface SignUpRequest extends Serenity.ServiceRequest {
        DisplayName?: string;
        Email?: string;
        Password?: string;
    }
}
declare namespace VistaLOAN {
    enum MonthList {
        January = 1,
        February = 2,
        March = 3,
        April = 4,
        May = 5,
        June = 6,
        July = 7,
        August = 8,
        September = 9,
        October = 10,
        November = 11,
        December = 12,
    }
}
declare namespace VistaLOAN {
    enum PFLoanType {
        NonRefundable = 0,
        Refundable = 1,
    }
}
declare namespace VistaLOAN {
    interface ScriptUserDefinition {
        Username?: string;
        DisplayName?: string;
        IsAdmin?: boolean;
        FundControlInformationId?: number;
        BaseCurrencyId?: number;
        BaseCurrency?: string;
        ZoneID?: number;
        FundControlName?: string;
        ZoneName?: string;
        FinancialYearName?: string;
        EmpId?: number;
        Permissions?: {
            [key: string]: boolean;
        };
        DesignationName?: string;
        LoanTypeInformationId?: number;
        LoanTypeName?: string;
    }
}
declare namespace VistaLOAN.Setup {
}
declare namespace VistaLOAN.Setup {
    interface LaDonorInformationForm {
        DonorName: Serenity.StringEditor;
        Address: Serenity.StringEditor;
        PhoneNo: Serenity.StringEditor;
        FaxNo: Serenity.StringEditor;
        Email: Serenity.StringEditor;
        MobileNo: Serenity.StringEditor;
        ContactPersonName: Serenity.StringEditor;
        ContanctPersonMobileNo: Serenity.StringEditor;
        Remark: Serenity.StringEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }
    class LaDonorInformationForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Setup {
    interface LaDonorInformationRow {
        Id?: number;
        DonorName?: string;
        Address?: string;
        PhoneNo?: string;
        FaxNo?: string;
        Email?: string;
        MobileNo?: string;
        ContactPersonName?: string;
        ContanctPersonMobileNo?: string;
        Remark?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaDonorInformationRow {
        const idProperty = "Id";
        const nameProperty = "DonorName";
        const localTextPrefix = "Setup.LaDonorInformation";
        const lookupKey = "Setup.LaDonorInformation";
        function getLookup(): Q.Lookup<LaDonorInformationRow>;
        const enum Fields {
            Id = "Id",
            DonorName = "DonorName",
            Address = "Address",
            PhoneNo = "PhoneNo",
            FaxNo = "FaxNo",
            Email = "Email",
            MobileNo = "MobileNo",
            ContactPersonName = "ContactPersonName",
            ContanctPersonMobileNo = "ContanctPersonMobileNo",
            Remark = "Remark",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Setup {
    namespace LaDonorInformationService {
        const baseUrl = "Setup/LaDonorInformation";
        function Create(request: Serenity.SaveRequest<LaDonorInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaDonorInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaDonorInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaDonorInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Setup/LaDonorInformation/Create",
            Update = "Setup/LaDonorInformation/Update",
            Delete = "Setup/LaDonorInformation/Delete",
            Retrieve = "Setup/LaDonorInformation/Retrieve",
            List = "Setup/LaDonorInformation/List",
        }
    }
}
declare namespace VistaLOAN.Setup {
}
declare namespace VistaLOAN.Setup {
    interface LaLoanApplicationLastNumberForm {
        LoanCriteriaId: Serenity.LookupEditor;
        LastLoanNumber: Serenity.IntegerEditor;
    }
    class LaLoanApplicationLastNumberForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Setup {
    interface LaLoanApplicationLastNumberRow {
        Id?: number;
        LoanCriteriaId?: number;
        LastLoanNumber?: number;
        PFPaymentType?: string;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        LoanCriteriaIUser?: string;
        LoanCriteriaIDate?: string;
        LoanCriteriaEUser?: string;
        LoanCriteriaEDate?: string;
    }
    namespace LaLoanApplicationLastNumberRow {
        const idProperty = "Id";
        const localTextPrefix = "Setup.LaLoanApplicationLastNumber";
        const lookupKey = "Setup.LaLoanApplicationLastNumber";
        function getLookup(): Q.Lookup<LaLoanApplicationLastNumberRow>;
        const enum Fields {
            Id = "Id",
            LoanCriteriaId = "LoanCriteriaId",
            LastLoanNumber = "LastLoanNumber",
            PFPaymentType = "PFPaymentType",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            LoanCriteriaIUser = "LoanCriteriaIUser",
            LoanCriteriaIDate = "LoanCriteriaIDate",
            LoanCriteriaEUser = "LoanCriteriaEUser",
            LoanCriteriaEDate = "LoanCriteriaEDate",
        }
    }
}
declare namespace VistaLOAN.Setup {
    namespace LaLoanApplicationLastNumberService {
        const baseUrl = "Setup/LaLoanApplicationLastNumber";
        function Create(request: Serenity.SaveRequest<LaLoanApplicationLastNumberRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanApplicationLastNumberRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanApplicationLastNumberRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanApplicationLastNumberRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Setup/LaLoanApplicationLastNumber/Create",
            Update = "Setup/LaLoanApplicationLastNumber/Update",
            Delete = "Setup/LaLoanApplicationLastNumber/Delete",
            Retrieve = "Setup/LaLoanApplicationLastNumber/Retrieve",
            List = "Setup/LaLoanApplicationLastNumber/List",
        }
    }
}
declare namespace VistaLOAN.Setup {
}
declare namespace VistaLOAN.Setup {
    interface LaLoanCriteriaForm {
        SchemeName: Serenity.StringEditor;
        LoanTypeId: Serenity.LookupEditor;
    }
    class LaLoanCriteriaForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Setup {
    interface LaLoanCriteriaRow {
        Id?: number;
        SchemeName?: string;
        LoanTypeId?: number;
        LoanTypeLoanTypeName?: string;
        LoanTypePrincipalHeadId?: number;
        LoanTypeInterestHeadId?: number;
        LoanTypeIsWelfareLoan?: boolean;
        LoanTypeIsPfLoan?: boolean;
        LoanTypeIsInterestPaymentWithPricipal?: boolean;
        LoanTypeIsInterestCalculateOnIssueDate?: boolean;
        LoanTypeGracePeriodMonth?: number;
        LoanTypeCalculationType?: number;
        LoanTypeShortCode?: string;
        LoanTypeIUser?: string;
        LoanTypeIDate?: string;
        LoanTypeEUser?: string;
        LoanTypeEDate?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanCriteriaRow {
        const idProperty = "Id";
        const nameProperty = "SchemeName";
        const localTextPrefix = "Setup.LaLoanCriteria";
        const lookupKey = "Setup.LaLoanCriteria";
        function getLookup(): Q.Lookup<LaLoanCriteriaRow>;
        const enum Fields {
            Id = "Id",
            SchemeName = "SchemeName",
            LoanTypeId = "LoanTypeId",
            LoanTypeLoanTypeName = "LoanTypeLoanTypeName",
            LoanTypePrincipalHeadId = "LoanTypePrincipalHeadId",
            LoanTypeInterestHeadId = "LoanTypeInterestHeadId",
            LoanTypeIsWelfareLoan = "LoanTypeIsWelfareLoan",
            LoanTypeIsPfLoan = "LoanTypeIsPfLoan",
            LoanTypeIsInterestPaymentWithPricipal = "LoanTypeIsInterestPaymentWithPricipal",
            LoanTypeIsInterestCalculateOnIssueDate = "LoanTypeIsInterestCalculateOnIssueDate",
            LoanTypeGracePeriodMonth = "LoanTypeGracePeriodMonth",
            LoanTypeCalculationType = "LoanTypeCalculationType",
            LoanTypeShortCode = "LoanTypeShortCode",
            LoanTypeIUser = "LoanTypeIUser",
            LoanTypeIDate = "LoanTypeIDate",
            LoanTypeEUser = "LoanTypeEUser",
            LoanTypeEDate = "LoanTypeEDate",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Setup {
    namespace LaLoanCriteriaService {
        const baseUrl = "Setup/LaLoanCriteria";
        function Create(request: Serenity.SaveRequest<LaLoanCriteriaRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanCriteriaRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanCriteriaRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanCriteriaRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Setup/LaLoanCriteria/Create",
            Update = "Setup/LaLoanCriteria/Update",
            Delete = "Setup/LaLoanCriteria/Delete",
            Retrieve = "Setup/LaLoanCriteria/Retrieve",
            List = "Setup/LaLoanCriteria/List",
        }
    }
}
declare namespace VistaLOAN.Setup {
}
declare namespace VistaLOAN.Setup {
    interface LaLoanEligibleInformationForm {
        LoanTypeId: Serenity.LookupEditor;
        EmployeeCategoryId: Serenity.LookupEditor;
        GradeFromId: Serenity.LookupEditor;
        GradeToId: Serenity.LookupEditor;
        ServiceDurationMin: Serenity.IntegerEditor;
        MaxNoLoanApply: Serenity.IntegerEditor;
    }
    class LaLoanEligibleInformationForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Setup {
    interface LaLoanEligibleInformationRow {
        Id?: number;
        LoanTypeId?: number;
        EmployeeCategoryId?: number;
        GradeFromId?: number;
        GradeToId?: number;
        ServiceDurationMin?: number;
        MaxNoLoanApply?: number;
        LoanTypeLoanTypeName?: string;
        LoanTypePrincipalHeadId?: number;
        LoanTypeInterestHeadId?: number;
        LoanTypeIsWelfareLoan?: boolean;
        LoanTypeIsPfLoan?: boolean;
        LoanTypeIsInterestPaymentWithPricipal?: boolean;
        LoanTypeIsInterestCalculateOnIssueDate?: boolean;
        LoanTypeGracePeriodMonth?: number;
        LoanTypeCalculationType?: number;
        LoanTypeShortCode?: string;
        LoanTypeIUser?: string;
        LoanTypeIDate?: string;
        LoanTypeEUser?: string;
        LoanTypeEDate?: string;
        EmployeeCategoryName?: string;
        EmployeeCategorySortOrder?: number;
        EmployeeCategoryRemarks?: string;
        EmployeeCategoryIUser?: string;
        EmployeeCategoryEUser?: string;
        EmployeeCategoryIDate?: string;
        EmployeeCategoryEDate?: string;
        GradeFromSalaryScaleId?: number;
        GradeFromGradeName?: string;
        GradeFromGradeCode?: string;
        GradeFromNumberOfSteps?: number;
        GradeFromInitialBasic?: number;
        GradeFromLastBasic?: number;
        GradeFromYearlyIncrement?: number;
        GradeFromDateOfEffective?: string;
        GradeFromIsConsolidated?: boolean;
        GradeFromIUser?: string;
        GradeFromIDate?: string;
        GradeFromEUser?: string;
        GradeFromEDate?: string;
        GradeFromPayScale?: string;
        GradeToSalaryScaleId?: number;
        GradeToGradeName?: string;
        GradeToGradeCode?: string;
        GradeToNumberOfSteps?: number;
        GradeToInitialBasic?: number;
        GradeToLastBasic?: number;
        GradeToYearlyIncrement?: number;
        GradeToDateOfEffective?: string;
        GradeToIsConsolidated?: boolean;
        GradeToIUser?: string;
        GradeToIDate?: string;
        GradeToEUser?: string;
        GradeToEDate?: string;
        GradeToPayScale?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanEligibleInformationRow {
        const idProperty = "Id";
        const nameProperty = "IUser";
        const localTextPrefix = "Setup.LaLoanEligibleInformation";
        const lookupKey = "Setup.LaLoanEligibleInformation";
        function getLookup(): Q.Lookup<LaLoanEligibleInformationRow>;
        const enum Fields {
            Id = "Id",
            LoanTypeId = "LoanTypeId",
            EmployeeCategoryId = "EmployeeCategoryId",
            GradeFromId = "GradeFromId",
            GradeToId = "GradeToId",
            ServiceDurationMin = "ServiceDurationMin",
            MaxNoLoanApply = "MaxNoLoanApply",
            LoanTypeLoanTypeName = "LoanTypeLoanTypeName",
            LoanTypePrincipalHeadId = "LoanTypePrincipalHeadId",
            LoanTypeInterestHeadId = "LoanTypeInterestHeadId",
            LoanTypeIsWelfareLoan = "LoanTypeIsWelfareLoan",
            LoanTypeIsPfLoan = "LoanTypeIsPfLoan",
            LoanTypeIsInterestPaymentWithPricipal = "LoanTypeIsInterestPaymentWithPricipal",
            LoanTypeIsInterestCalculateOnIssueDate = "LoanTypeIsInterestCalculateOnIssueDate",
            LoanTypeGracePeriodMonth = "LoanTypeGracePeriodMonth",
            LoanTypeCalculationType = "LoanTypeCalculationType",
            LoanTypeShortCode = "LoanTypeShortCode",
            LoanTypeIUser = "LoanTypeIUser",
            LoanTypeIDate = "LoanTypeIDate",
            LoanTypeEUser = "LoanTypeEUser",
            LoanTypeEDate = "LoanTypeEDate",
            EmployeeCategoryName = "EmployeeCategoryName",
            EmployeeCategorySortOrder = "EmployeeCategorySortOrder",
            EmployeeCategoryRemarks = "EmployeeCategoryRemarks",
            EmployeeCategoryIUser = "EmployeeCategoryIUser",
            EmployeeCategoryEUser = "EmployeeCategoryEUser",
            EmployeeCategoryIDate = "EmployeeCategoryIDate",
            EmployeeCategoryEDate = "EmployeeCategoryEDate",
            GradeFromSalaryScaleId = "GradeFromSalaryScaleId",
            GradeFromGradeName = "GradeFromGradeName",
            GradeFromGradeCode = "GradeFromGradeCode",
            GradeFromNumberOfSteps = "GradeFromNumberOfSteps",
            GradeFromInitialBasic = "GradeFromInitialBasic",
            GradeFromLastBasic = "GradeFromLastBasic",
            GradeFromYearlyIncrement = "GradeFromYearlyIncrement",
            GradeFromDateOfEffective = "GradeFromDateOfEffective",
            GradeFromIsConsolidated = "GradeFromIsConsolidated",
            GradeFromIUser = "GradeFromIUser",
            GradeFromIDate = "GradeFromIDate",
            GradeFromEUser = "GradeFromEUser",
            GradeFromEDate = "GradeFromEDate",
            GradeFromPayScale = "GradeFromPayScale",
            GradeToSalaryScaleId = "GradeToSalaryScaleId",
            GradeToGradeName = "GradeToGradeName",
            GradeToGradeCode = "GradeToGradeCode",
            GradeToNumberOfSteps = "GradeToNumberOfSteps",
            GradeToInitialBasic = "GradeToInitialBasic",
            GradeToLastBasic = "GradeToLastBasic",
            GradeToYearlyIncrement = "GradeToYearlyIncrement",
            GradeToDateOfEffective = "GradeToDateOfEffective",
            GradeToIsConsolidated = "GradeToIsConsolidated",
            GradeToIUser = "GradeToIUser",
            GradeToIDate = "GradeToIDate",
            GradeToEUser = "GradeToEUser",
            GradeToEDate = "GradeToEDate",
            GradeToPayScale = "GradeToPayScale",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Setup {
    namespace LaLoanEligibleInformationService {
        const baseUrl = "Setup/LaLoanEligibleInformation";
        function Create(request: Serenity.SaveRequest<LaLoanEligibleInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanEligibleInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanEligibleInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanEligibleInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Setup/LaLoanEligibleInformation/Create",
            Update = "Setup/LaLoanEligibleInformation/Update",
            Delete = "Setup/LaLoanEligibleInformation/Delete",
            Retrieve = "Setup/LaLoanEligibleInformation/Retrieve",
            List = "Setup/LaLoanEligibleInformation/List",
        }
    }
}
declare namespace VistaLOAN.Setup {
}
declare namespace VistaLOAN.Setup {
    interface LaLoanTypeForm {
        LoanTypeName: Serenity.StringEditor;
        PrincipalHeadId: Serenity.LookupEditor;
        InterestHeadId: Serenity.LookupEditor;
        IsWelfareLoan: Serenity.BooleanEditor;
        IsPfLoan: Serenity.BooleanEditor;
        IsInterestPaymentWithPricipal: Serenity.BooleanEditor;
        IsInterestCalculateOnIssueDate: Serenity.BooleanEditor;
        GracePeriodMonth: Serenity.IntegerEditor;
        CalculationType: Serenity.IntegerEditor;
        ShortCode: Serenity.StringEditor;
    }
    class LaLoanTypeForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Setup {
    interface LaLoanTypeRow {
        Id?: number;
        LoanTypeName?: string;
        PrincipalHeadId?: number;
        InterestHeadId?: number;
        IsWelfareLoan?: boolean;
        IsPfLoan?: boolean;
        IsInterestPaymentWithPricipal?: boolean;
        IsInterestCalculateOnIssueDate?: boolean;
        GracePeriodMonth?: number;
        CalculationType?: number;
        ShortCode?: string;
        PrincipalHeadGroupId?: number;
        PrincipalHeadHeadName?: string;
        PrincipalHeadIsActiveHead?: boolean;
        PrincipalHeadShortName?: string;
        PrincipalHeadHeadType?: string;
        PrincipalHeadAmountType?: string;
        PrincipalHeadAccountHeadId?: number;
        PrincipalHeadEntityNameId?: number;
        PrincipalHeadIsBasicHead?: boolean;
        PrincipalHeadIsTaxable?: boolean;
        PrincipalHeadIsGrossPayHead?: boolean;
        PrincipalHeadSortOrder?: number;
        PrincipalHeadDefaultAmount?: number;
        PrincipalHeadIsOtherAddition?: boolean;
        PrincipalHeadIsOtherDeduction?: boolean;
        PrincipalHeadIsIncomeTaxAdditionHead?: boolean;
        PrincipalHeadIsIncomeTaxDeductionHead?: boolean;
        PrincipalHeadIsPfOwnContributionHead?: boolean;
        PrincipalHeadIsPfCompanyContributionHead?: boolean;
        PrincipalHeadIsHouseRentHead?: boolean;
        PrincipalHeadIsMedicalHead?: boolean;
        PrincipalHeadIsConveyanceHead?: boolean;
        PrincipalHeadIsLeaveWithoutPayHead?: boolean;
        PrincipalHeadIsPensionHead?: boolean;
        PrincipalHeadIsGpfHead?: boolean;
        PrincipalHeadIsArrearHead?: boolean;
        PrincipalHeadIsGratuityHead?: boolean;
        PrincipalHeadIUser?: string;
        PrincipalHeadEUser?: string;
        PrincipalHeadIDate?: string;
        PrincipalHeadEDate?: string;
        InterestHeadGroupId?: number;
        InterestHeadHeadName?: string;
        InterestHeadIsActiveHead?: boolean;
        InterestHeadShortName?: string;
        InterestHeadHeadType?: string;
        InterestHeadAmountType?: string;
        InterestHeadAccountHeadId?: number;
        InterestHeadEntityNameId?: number;
        InterestHeadIsBasicHead?: boolean;
        InterestHeadIsTaxable?: boolean;
        InterestHeadIsGrossPayHead?: boolean;
        InterestHeadSortOrder?: number;
        InterestHeadDefaultAmount?: number;
        InterestHeadIsOtherAddition?: boolean;
        InterestHeadIsOtherDeduction?: boolean;
        InterestHeadIsIncomeTaxAdditionHead?: boolean;
        InterestHeadIsIncomeTaxDeductionHead?: boolean;
        InterestHeadIsPfOwnContributionHead?: boolean;
        InterestHeadIsPfCompanyContributionHead?: boolean;
        InterestHeadIsHouseRentHead?: boolean;
        InterestHeadIsMedicalHead?: boolean;
        InterestHeadIsConveyanceHead?: boolean;
        InterestHeadIsLeaveWithoutPayHead?: boolean;
        InterestHeadIsPensionHead?: boolean;
        InterestHeadIsGpfHead?: boolean;
        InterestHeadIsArrearHead?: boolean;
        InterestHeadIsGratuityHead?: boolean;
        InterestHeadIUser?: string;
        InterestHeadEUser?: string;
        InterestHeadIDate?: string;
        InterestHeadEDate?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanTypeRow {
        const idProperty = "Id";
        const nameProperty = "LoanTypeName";
        const localTextPrefix = "Setup.LaLoanType";
        const lookupKey = "Setup.LaLoanType";
        function getLookup(): Q.Lookup<LaLoanTypeRow>;
        const enum Fields {
            Id = "Id",
            LoanTypeName = "LoanTypeName",
            PrincipalHeadId = "PrincipalHeadId",
            InterestHeadId = "InterestHeadId",
            IsWelfareLoan = "IsWelfareLoan",
            IsPfLoan = "IsPfLoan",
            IsInterestPaymentWithPricipal = "IsInterestPaymentWithPricipal",
            IsInterestCalculateOnIssueDate = "IsInterestCalculateOnIssueDate",
            GracePeriodMonth = "GracePeriodMonth",
            CalculationType = "CalculationType",
            ShortCode = "ShortCode",
            PrincipalHeadGroupId = "PrincipalHeadGroupId",
            PrincipalHeadHeadName = "PrincipalHeadHeadName",
            PrincipalHeadIsActiveHead = "PrincipalHeadIsActiveHead",
            PrincipalHeadShortName = "PrincipalHeadShortName",
            PrincipalHeadHeadType = "PrincipalHeadHeadType",
            PrincipalHeadAmountType = "PrincipalHeadAmountType",
            PrincipalHeadAccountHeadId = "PrincipalHeadAccountHeadId",
            PrincipalHeadEntityNameId = "PrincipalHeadEntityNameId",
            PrincipalHeadIsBasicHead = "PrincipalHeadIsBasicHead",
            PrincipalHeadIsTaxable = "PrincipalHeadIsTaxable",
            PrincipalHeadIsGrossPayHead = "PrincipalHeadIsGrossPayHead",
            PrincipalHeadSortOrder = "PrincipalHeadSortOrder",
            PrincipalHeadDefaultAmount = "PrincipalHeadDefaultAmount",
            PrincipalHeadIsOtherAddition = "PrincipalHeadIsOtherAddition",
            PrincipalHeadIsOtherDeduction = "PrincipalHeadIsOtherDeduction",
            PrincipalHeadIsIncomeTaxAdditionHead = "PrincipalHeadIsIncomeTaxAdditionHead",
            PrincipalHeadIsIncomeTaxDeductionHead = "PrincipalHeadIsIncomeTaxDeductionHead",
            PrincipalHeadIsPfOwnContributionHead = "PrincipalHeadIsPfOwnContributionHead",
            PrincipalHeadIsPfCompanyContributionHead = "PrincipalHeadIsPfCompanyContributionHead",
            PrincipalHeadIsHouseRentHead = "PrincipalHeadIsHouseRentHead",
            PrincipalHeadIsMedicalHead = "PrincipalHeadIsMedicalHead",
            PrincipalHeadIsConveyanceHead = "PrincipalHeadIsConveyanceHead",
            PrincipalHeadIsLeaveWithoutPayHead = "PrincipalHeadIsLeaveWithoutPayHead",
            PrincipalHeadIsPensionHead = "PrincipalHeadIsPensionHead",
            PrincipalHeadIsGpfHead = "PrincipalHeadIsGpfHead",
            PrincipalHeadIsArrearHead = "PrincipalHeadIsArrearHead",
            PrincipalHeadIsGratuityHead = "PrincipalHeadIsGratuityHead",
            PrincipalHeadIUser = "PrincipalHeadIUser",
            PrincipalHeadEUser = "PrincipalHeadEUser",
            PrincipalHeadIDate = "PrincipalHeadIDate",
            PrincipalHeadEDate = "PrincipalHeadEDate",
            InterestHeadGroupId = "InterestHeadGroupId",
            InterestHeadHeadName = "InterestHeadHeadName",
            InterestHeadIsActiveHead = "InterestHeadIsActiveHead",
            InterestHeadShortName = "InterestHeadShortName",
            InterestHeadHeadType = "InterestHeadHeadType",
            InterestHeadAmountType = "InterestHeadAmountType",
            InterestHeadAccountHeadId = "InterestHeadAccountHeadId",
            InterestHeadEntityNameId = "InterestHeadEntityNameId",
            InterestHeadIsBasicHead = "InterestHeadIsBasicHead",
            InterestHeadIsTaxable = "InterestHeadIsTaxable",
            InterestHeadIsGrossPayHead = "InterestHeadIsGrossPayHead",
            InterestHeadSortOrder = "InterestHeadSortOrder",
            InterestHeadDefaultAmount = "InterestHeadDefaultAmount",
            InterestHeadIsOtherAddition = "InterestHeadIsOtherAddition",
            InterestHeadIsOtherDeduction = "InterestHeadIsOtherDeduction",
            InterestHeadIsIncomeTaxAdditionHead = "InterestHeadIsIncomeTaxAdditionHead",
            InterestHeadIsIncomeTaxDeductionHead = "InterestHeadIsIncomeTaxDeductionHead",
            InterestHeadIsPfOwnContributionHead = "InterestHeadIsPfOwnContributionHead",
            InterestHeadIsPfCompanyContributionHead = "InterestHeadIsPfCompanyContributionHead",
            InterestHeadIsHouseRentHead = "InterestHeadIsHouseRentHead",
            InterestHeadIsMedicalHead = "InterestHeadIsMedicalHead",
            InterestHeadIsConveyanceHead = "InterestHeadIsConveyanceHead",
            InterestHeadIsLeaveWithoutPayHead = "InterestHeadIsLeaveWithoutPayHead",
            InterestHeadIsPensionHead = "InterestHeadIsPensionHead",
            InterestHeadIsGpfHead = "InterestHeadIsGpfHead",
            InterestHeadIsArrearHead = "InterestHeadIsArrearHead",
            InterestHeadIsGratuityHead = "InterestHeadIsGratuityHead",
            InterestHeadIUser = "InterestHeadIUser",
            InterestHeadEUser = "InterestHeadEUser",
            InterestHeadIDate = "InterestHeadIDate",
            InterestHeadEDate = "InterestHeadEDate",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Setup {
    namespace LaLoanTypeService {
        const baseUrl = "Setup/LaLoanType";
        function Create(request: Serenity.SaveRequest<LaLoanTypeRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanTypeRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanTypeRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanTypeRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function SetLoanType(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanTypeRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Setup/LaLoanType/Create",
            Update = "Setup/LaLoanType/Update",
            Delete = "Setup/LaLoanType/Delete",
            Retrieve = "Setup/LaLoanType/Retrieve",
            List = "Setup/LaLoanType/List",
            SetLoanType = "Setup/LaLoanType/SetLoanType",
        }
    }
}
declare namespace VistaLOAN.Setup {
    interface SelectLoanTypeForm {
        LoanTypeInformationId: Serenity.LookupEditor;
    }
    class SelectLoanTypeForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaCpfCashOrChequeCollectionForm {
        EmployeeId: Serenity.LookupEditor;
        CollectionMonth: MonthListEditor;
        CollectionYear: Serenity.StringEditor;
        CashorCheque: CashOrChequeSelectEditor;
        CollectionDate: Serenity.DateEditor;
        Remarks: Serenity.TextAreaEditor;
        CollectionType: Serenity.RadioButtonEditor;
        ApplicationId: Serenity.LookupEditor;
        PrincipalInstallment: Serenity.DecimalEditor;
        InterestInstallment: Serenity.DecimalEditor;
        PfOwnContribution: Serenity.DecimalEditor;
        PFOwnInterest: Serenity.DecimalEditor;
        PFCompanyContribution: Serenity.DecimalEditor;
        PFCompanyInterest: Serenity.DecimalEditor;
    }
    class LaCpfCashOrChequeCollectionForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaCpfCashOrChequeCollectionRow {
        Id?: number;
        EmployeeId?: number;
        CollectionMonth?: string;
        CollectionYear?: string;
        CashorCheque?: string;
        Remarks?: string;
        CollectionType?: CollectionType;
        ApplicationId?: number;
        PrincipalInstallment?: number;
        InterestInstallment?: number;
        PfOwnContribution?: number;
        PFOwnInterest?: number;
        PFCompanyContribution?: number;
        PFCompanyInterest?: number;
        CollectionDate?: string;
        EmployeeEmpId?: string;
        EmployeeFullName?: string;
        EmployeeDesignationId?: number;
        EmployeeStatusDesignationId?: number;
        EmployeeDisciplineId?: number;
        EmployeeDivisionId?: number;
        EmployeeSectionId?: number;
        EmployeeSubSectionId?: number;
        ApplicationLoanNo?: string;
        ApplicationEmployeeId?: number;
        ApplicationSeniorityNo?: number;
        ApplicationApplyDate?: string;
        ApplicationLoanCriteriaId?: number;
        ApplicationApplyLoanAmount?: number;
        ApplicationApplyInterestAmount?: number;
        ApplicationPurpose?: string;
        ApplicationGrantedLoanAmount?: number;
        ApplicationGrantedInterestAmount?: number;
        ApplicationNodeId?: number;
        ApplicationApproverId?: string;
        ApplicationAppStatusId?: number;
        ApplicationIsDiscard?: boolean;
        ApplicationIsApprovalProcess?: boolean;
        ApplicationIsOffLine?: boolean;
        ApplicationApprovedDate?: string;
        ApplicationIsIssue?: boolean;
        ApplicationResponsiblePersonId?: string;
        ApplicationEmployeeWiseLoanId?: number;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaCpfCashOrChequeCollectionRow {
        const idProperty = "Id";
        const nameProperty = "CollectionMonth";
        const localTextPrefix = "Task.LaCpfCashOrChequeCollection";
        const lookupKey = "Task.LaCpfCashOrChequeCollection";
        function getLookup(): Q.Lookup<LaCpfCashOrChequeCollectionRow>;
        const enum Fields {
            Id = "Id",
            EmployeeId = "EmployeeId",
            CollectionMonth = "CollectionMonth",
            CollectionYear = "CollectionYear",
            CashorCheque = "CashorCheque",
            Remarks = "Remarks",
            CollectionType = "CollectionType",
            ApplicationId = "ApplicationId",
            PrincipalInstallment = "PrincipalInstallment",
            InterestInstallment = "InterestInstallment",
            PfOwnContribution = "PfOwnContribution",
            PFOwnInterest = "PFOwnInterest",
            PFCompanyContribution = "PFCompanyContribution",
            PFCompanyInterest = "PFCompanyInterest",
            CollectionDate = "CollectionDate",
            EmployeeEmpId = "EmployeeEmpId",
            EmployeeFullName = "EmployeeFullName",
            EmployeeDesignationId = "EmployeeDesignationId",
            EmployeeStatusDesignationId = "EmployeeStatusDesignationId",
            EmployeeDisciplineId = "EmployeeDisciplineId",
            EmployeeDivisionId = "EmployeeDivisionId",
            EmployeeSectionId = "EmployeeSectionId",
            EmployeeSubSectionId = "EmployeeSubSectionId",
            ApplicationLoanNo = "ApplicationLoanNo",
            ApplicationEmployeeId = "ApplicationEmployeeId",
            ApplicationSeniorityNo = "ApplicationSeniorityNo",
            ApplicationApplyDate = "ApplicationApplyDate",
            ApplicationLoanCriteriaId = "ApplicationLoanCriteriaId",
            ApplicationApplyLoanAmount = "ApplicationApplyLoanAmount",
            ApplicationApplyInterestAmount = "ApplicationApplyInterestAmount",
            ApplicationPurpose = "ApplicationPurpose",
            ApplicationGrantedLoanAmount = "ApplicationGrantedLoanAmount",
            ApplicationGrantedInterestAmount = "ApplicationGrantedInterestAmount",
            ApplicationNodeId = "ApplicationNodeId",
            ApplicationApproverId = "ApplicationApproverId",
            ApplicationAppStatusId = "ApplicationAppStatusId",
            ApplicationIsDiscard = "ApplicationIsDiscard",
            ApplicationIsApprovalProcess = "ApplicationIsApprovalProcess",
            ApplicationIsOffLine = "ApplicationIsOffLine",
            ApplicationApprovedDate = "ApplicationApprovedDate",
            ApplicationIsIssue = "ApplicationIsIssue",
            ApplicationResponsiblePersonId = "ApplicationResponsiblePersonId",
            ApplicationEmployeeWiseLoanId = "ApplicationEmployeeWiseLoanId",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaCpfCashOrChequeCollectionService {
        const baseUrl = "Task/LaCpfCashOrChequeCollection";
        function Create(request: Serenity.SaveRequest<LaCpfCashOrChequeCollectionRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaCpfCashOrChequeCollectionRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaCpfCashOrChequeCollectionRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaCpfCashOrChequeCollectionRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaCpfCashOrChequeCollection/Create",
            Update = "Task/LaCpfCashOrChequeCollection/Update",
            Delete = "Task/LaCpfCashOrChequeCollection/Delete",
            Retrieve = "Task/LaCpfCashOrChequeCollection/Retrieve",
            List = "Task/LaCpfCashOrChequeCollection/List",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaLoanApplicationForm {
        EmployeeName: Serenity.StringEditor;
        EmployeeId: Serenity.LookupEditor;
        SeniorityNo: Serenity.IntegerEditor;
        LoanCriteriaId: Serenity.LookupEditor;
        LoanNo: Serenity.StringEditor;
        ApplyDate: Serenity.DateEditor;
        ApplyLoanAmount: Serenity.DecimalEditor;
        ApplyPrincipalInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestAmount: Serenity.DecimalEditor;
        ApplyInterestInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestRate: Serenity.DecimalEditor;
        Purpose: Serenity.StringEditor;
        GrantedLoanAmount: Serenity.DecimalEditor;
        GrantedPrincipalInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestAmount: Serenity.DecimalEditor;
        GrantedInterestInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestRate: Serenity.DecimalEditor;
        NodeId: Serenity.IntegerEditor;
        ApproverId: Serenity.LookupEditor;
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        ApprovedDate: Serenity.DateEditor;
        PFLoanType: PFLoanTypeEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
        NonRefundPFOwnLoanAmount: Serenity.DecimalEditor;
        NonRefundPFCompanyLoanAmount: Serenity.DecimalEditor;
        NonRefundOwnInterestLoanAmount: Serenity.DecimalEditor;
        NonRefundCompanyInterestLoanAmount: Serenity.DecimalEditor;
        EmpOwnContribution: Serenity.DecimalEditor;
        EmpOwnInterest: Serenity.DecimalEditor;
        CompanyContribution: Serenity.DecimalEditor;
        CompanyInterest: Serenity.DecimalEditor;
        Signature: Serenity.StringEditor;
        Sign: Serenity.StringEditor;
    }
    class LaLoanApplicationForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaLoanApplicationOfflineForm {
        EmployeeId: Serenity.LookupEditor;
        SeniorityNo: Serenity.IntegerEditor;
        LoanCriteriaId: Serenity.LookupEditor;
        LoanNo: Serenity.StringEditor;
        ApplyDate: Serenity.DateEditor;
        ApplyLoanAmount: Serenity.DecimalEditor;
        ApplyPrincipalInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestAmount: Serenity.DecimalEditor;
        ApplyInterestInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestRate: Serenity.DecimalEditor;
        Purpose: Serenity.StringEditor;
        GrantedLoanAmount: Serenity.DecimalEditor;
        GrantedPrincipalInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestAmount: Serenity.DecimalEditor;
        GrantedInterestInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestRate: Serenity.DecimalEditor;
        NodeId: Serenity.IntegerEditor;
        ApproverId: Serenity.LookupEditor;
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        ApprovedDate: Serenity.DateEditor;
        PFLoanType: PFLoanTypeEditor;
        NonRefundPFOwnLoanAmount: Serenity.DecimalEditor;
        NonRefundPFCompanyLoanAmount: Serenity.DecimalEditor;
        NonRefundOwnInterestLoanAmount: Serenity.DecimalEditor;
        NonRefundCompanyInterestLoanAmount: Serenity.DecimalEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
        EmpOwnContribution: Serenity.DecimalEditor;
        EmpOwnInterest: Serenity.DecimalEditor;
        CompanyContribution: Serenity.DecimalEditor;
        CompanyInterest: Serenity.DecimalEditor;
    }
    class LaLoanApplicationOfflineForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaLoanApplicationRow {
        Id?: number;
        LoanNo?: string;
        EmployeeId?: number;
        SeniorityNo?: number;
        ApplyDate?: string;
        LoanCriteriaId?: number;
        ApplyLoanAmount?: number;
        ApplyPrincipalInstallmentNo?: number;
        ApplyInterestAmount?: number;
        ApplyInterestInstallmentNo?: number;
        ApplyInterestRate?: number;
        Purpose?: string;
        GrantedLoanAmount?: number;
        GrantedPrincipalInstallmentNo?: number;
        GrantedInterestAmount?: number;
        GrantedInterestInstallmentNo?: number;
        GrantedInterestRate?: number;
        NodeId?: number;
        ApproverId?: string;
        AppStatusId?: number;
        IsDiscard?: boolean;
        IsApprovalProcess?: boolean;
        IsOffLine?: boolean;
        ApprovedDate?: string;
        IsReApply?: boolean;
        IsIssue?: boolean;
        ResponsiblePersonId?: string;
        EmployeeWiseLoanId?: number;
        PFLoanType?: string;
        NonRefundPFOwnLoanAmount?: number;
        NonRefundPFCompanyLoanAmount?: number;
        NonRefundOwnInterestLoanAmount?: number;
        NonRefundCompanyInterestLoanAmount?: number;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        EmployeeName?: string;
        EmpId?: string;
        StatusName?: string;
        Signature?: string;
        Sign?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanApplicationRow {
        const idProperty = "Id";
        const nameProperty = "LoanNo";
        const localTextPrefix = "Task.LaLoanApplication";
        const lookupKey = "Task.LaLoanApplication";
        function getLookup(): Q.Lookup<LaLoanApplicationRow>;
        const enum Fields {
            Id = "Id",
            LoanNo = "LoanNo",
            EmployeeId = "EmployeeId",
            SeniorityNo = "SeniorityNo",
            ApplyDate = "ApplyDate",
            LoanCriteriaId = "LoanCriteriaId",
            ApplyLoanAmount = "ApplyLoanAmount",
            ApplyPrincipalInstallmentNo = "ApplyPrincipalInstallmentNo",
            ApplyInterestAmount = "ApplyInterestAmount",
            ApplyInterestInstallmentNo = "ApplyInterestInstallmentNo",
            ApplyInterestRate = "ApplyInterestRate",
            Purpose = "Purpose",
            GrantedLoanAmount = "GrantedLoanAmount",
            GrantedPrincipalInstallmentNo = "GrantedPrincipalInstallmentNo",
            GrantedInterestAmount = "GrantedInterestAmount",
            GrantedInterestInstallmentNo = "GrantedInterestInstallmentNo",
            GrantedInterestRate = "GrantedInterestRate",
            NodeId = "NodeId",
            ApproverId = "ApproverId",
            AppStatusId = "AppStatusId",
            IsDiscard = "IsDiscard",
            IsApprovalProcess = "IsApprovalProcess",
            IsOffLine = "IsOffLine",
            ApprovedDate = "ApprovedDate",
            IsReApply = "IsReApply",
            IsIssue = "IsIssue",
            ResponsiblePersonId = "ResponsiblePersonId",
            EmployeeWiseLoanId = "EmployeeWiseLoanId",
            PFLoanType = "PFLoanType",
            NonRefundPFOwnLoanAmount = "NonRefundPFOwnLoanAmount",
            NonRefundPFCompanyLoanAmount = "NonRefundPFCompanyLoanAmount",
            NonRefundOwnInterestLoanAmount = "NonRefundOwnInterestLoanAmount",
            NonRefundCompanyInterestLoanAmount = "NonRefundCompanyInterestLoanAmount",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            EmployeeName = "EmployeeName",
            EmpId = "EmpId",
            StatusName = "StatusName",
            Signature = "Signature",
            Sign = "Sign",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaLoanApplicationService {
        const baseUrl = "Task/LaLoanApplication";
        function Create(request: Serenity.SaveRequest<LaLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function GetCPFContribution(request: Task.Repositories.eCPFContributionRequest, onSuccess?: (response: Task.Repositories.GetCPFContributionResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function GetCPFPolicy(request: Task.Repositories.eCPFPolicyRequest, onSuccess?: (response: Task.Repositories.GetCPFPolicyResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function GetForfeitedRule(request: Task.Repositories.eForfeitedRuleRequest, onSuccess?: (response: Task.Repositories.GetForfeitedRuleResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaLoanApplication/Create",
            Update = "Task/LaLoanApplication/Update",
            Delete = "Task/LaLoanApplication/Delete",
            Retrieve = "Task/LaLoanApplication/Retrieve",
            List = "Task/LaLoanApplication/List",
            GetCPFContribution = "Task/LaLoanApplication/GetCPFContribution",
            GetCPFPolicy = "Task/LaLoanApplication/GetCPFPolicy",
            GetForfeitedRule = "Task/LaLoanApplication/GetForfeitedRule",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaLoanCircularInformationForm {
        LoanTypeId: Serenity.LookupEditor;
        FiscalYearId: Serenity.IntegerEditor;
        CircularDate: Serenity.DateEditor;
        ReferenceNo: Serenity.StringEditor;
        CircularDescription: Serenity.StringEditor;
        Attachment: Serenity.StringEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }
    class LaLoanCircularInformationForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaLoanCircularInformationRow {
        Id?: number;
        LoanTypeId?: number;
        FiscalYearId?: number;
        CircularDate?: string;
        ReferenceNo?: string;
        CircularDescription?: string;
        Attachment?: number[];
        LoanTypeLoanTypeName?: string;
        LoanTypePrincipalHeadId?: number;
        LoanTypeInterestHeadId?: number;
        LoanTypeIsWelfareLoan?: boolean;
        LoanTypeIsPfLoan?: boolean;
        LoanTypeIsInterestPaymentWithPricipal?: boolean;
        LoanTypeIsInterestCalculateOnIssueDate?: boolean;
        LoanTypeGracePeriodMonth?: number;
        LoanTypeCalculationType?: number;
        LoanTypeShortCode?: string;
        LoanTypeIUser?: string;
        LoanTypeIDate?: string;
        LoanTypeEUser?: string;
        LoanTypeEDate?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanCircularInformationRow {
        const idProperty = "Id";
        const nameProperty = "ReferenceNo";
        const localTextPrefix = "Task.LaLoanCircularInformation";
        const lookupKey = "Task.LaLoanCircularInformation";
        function getLookup(): Q.Lookup<LaLoanCircularInformationRow>;
        const enum Fields {
            Id = "Id",
            LoanTypeId = "LoanTypeId",
            FiscalYearId = "FiscalYearId",
            CircularDate = "CircularDate",
            ReferenceNo = "ReferenceNo",
            CircularDescription = "CircularDescription",
            Attachment = "Attachment",
            LoanTypeLoanTypeName = "LoanTypeLoanTypeName",
            LoanTypePrincipalHeadId = "LoanTypePrincipalHeadId",
            LoanTypeInterestHeadId = "LoanTypeInterestHeadId",
            LoanTypeIsWelfareLoan = "LoanTypeIsWelfareLoan",
            LoanTypeIsPfLoan = "LoanTypeIsPfLoan",
            LoanTypeIsInterestPaymentWithPricipal = "LoanTypeIsInterestPaymentWithPricipal",
            LoanTypeIsInterestCalculateOnIssueDate = "LoanTypeIsInterestCalculateOnIssueDate",
            LoanTypeGracePeriodMonth = "LoanTypeGracePeriodMonth",
            LoanTypeCalculationType = "LoanTypeCalculationType",
            LoanTypeShortCode = "LoanTypeShortCode",
            LoanTypeIUser = "LoanTypeIUser",
            LoanTypeIDate = "LoanTypeIDate",
            LoanTypeEUser = "LoanTypeEUser",
            LoanTypeEDate = "LoanTypeEDate",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaLoanCircularInformationService {
        const baseUrl = "Task/LaLoanCircularInformation";
        function Create(request: Serenity.SaveRequest<LaLoanCircularInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanCircularInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanCircularInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanCircularInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaLoanCircularInformation/Create",
            Update = "Task/LaLoanCircularInformation/Update",
            Delete = "Task/LaLoanCircularInformation/Delete",
            Retrieve = "Task/LaLoanCircularInformation/Retrieve",
            List = "Task/LaLoanCircularInformation/List",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaLoanIssueDetailForm {
        LoanIssueId: Serenity.IntegerEditor;
        IssueDate: Serenity.DateEditor;
        LoanPaidAmount: Serenity.DecimalEditor;
    }
    class LaLoanIssueDetailForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaLoanIssueDetailRow {
        Id?: number;
        LoanIssueId?: number;
        IssueDate?: string;
        LoanPaidAmount?: number;
        LoanIssueLoanApplicationId?: number;
        LoanIssueEffectiveMonth?: number;
        LoanIssueEffectiveYear?: number;
        LoanIssueLoanAmount?: number;
        LoanIssueIUser?: string;
        LoanIssuePrincipalInstallmentAmount?: number;
        LoanIssueInterestAmount?: number;
        LoanIssueInterestInstallmentAmount?: number;
        LoanIssueIsFullPaid?: boolean;
        LoanIssueIsClose?: boolean;
        LoanIssueFullPaidDate?: string;
        LoanIssueIsPosting?: boolean;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanIssueDetailRow {
        const idProperty = "Id";
        const nameProperty = "LoanIssueIUser";
        const localTextPrefix = "Task.LaLoanIssueDetail";
        const lookupKey = "Task.LaLoanIssueDetail";
        function getLookup(): Q.Lookup<LaLoanIssueDetailRow>;
        const enum Fields {
            Id = "Id",
            LoanIssueId = "LoanIssueId",
            IssueDate = "IssueDate",
            LoanPaidAmount = "LoanPaidAmount",
            LoanIssueLoanApplicationId = "LoanIssueLoanApplicationId",
            LoanIssueEffectiveMonth = "LoanIssueEffectiveMonth",
            LoanIssueEffectiveYear = "LoanIssueEffectiveYear",
            LoanIssueLoanAmount = "LoanIssueLoanAmount",
            LoanIssueIUser = "LoanIssueIUser",
            LoanIssuePrincipalInstallmentAmount = "LoanIssuePrincipalInstallmentAmount",
            LoanIssueInterestAmount = "LoanIssueInterestAmount",
            LoanIssueInterestInstallmentAmount = "LoanIssueInterestInstallmentAmount",
            LoanIssueIsFullPaid = "LoanIssueIsFullPaid",
            LoanIssueIsClose = "LoanIssueIsClose",
            LoanIssueFullPaidDate = "LoanIssueFullPaidDate",
            LoanIssueIsPosting = "LoanIssueIsPosting",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaLoanIssueDetailService {
        const baseUrl = "Task/LaLoanIssueDetail";
        function Create(request: Serenity.SaveRequest<LaLoanIssueDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanIssueDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanIssueDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanIssueDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaLoanIssueDetail/Create",
            Update = "Task/LaLoanIssueDetail/Update",
            Delete = "Task/LaLoanIssueDetail/Delete",
            Retrieve = "Task/LaLoanIssueDetail/Retrieve",
            List = "Task/LaLoanIssueDetail/List",
        }
    }
}
declare namespace VistaLOAN.Task {
    interface LaLoanIssueForm {
        EmployeeId: Serenity.LookupEditor;
        LoanApplicationId: Serenity.LookupEditor;
        EffectiveMonth: Serenity.IntegerEditor;
        EffectiveYear: Serenity.IntegerEditor;
        LoanAmount: Serenity.DecimalEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        InterestAmount: Serenity.DecimalEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        IsFullPaid: Serenity.BooleanEditor;
        IsReschedule: Serenity.BooleanEditor;
        IsClose: Serenity.BooleanEditor;
        FullPaidDate: Serenity.DateEditor;
        LastPrincipalInstallmentAmount: Serenity.DecimalEditor;
        LastInterestInstallmentAmount: Serenity.DecimalEditor;
        IsPosting: Serenity.BooleanEditor;
        CloseDate: Serenity.DateEditor;
        LaLoanIssueDetail: LaLoanIssueDetailEditor;
    }
    class LaLoanIssueForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaLoanIssueRow {
        Id?: number;
        LoanApplicationId?: number;
        EffectiveMonth?: number;
        EffectiveYear?: number;
        LoanAmount?: number;
        PrincipalInstallmentAmount?: number;
        InterestAmount?: number;
        InterestInstallmentAmount?: number;
        LastPrincipalInstallmentAmount?: number;
        LastInterestInstallmentAmount?: number;
        IsFullPaid?: boolean;
        IsReschedule?: boolean;
        IsClose?: boolean;
        FullPaidDate?: string;
        IsPosting?: boolean;
        CloseDate?: string;
        InterestConfirmDate?: string;
        LoanApplicationLoanNo?: string;
        LoanApplicationEmployeeId?: number;
        EmpId?: string;
        EmpFullName?: string;
        LoanApplicationSeniorityNo?: number;
        LoanApplicationApplyDate?: string;
        LoanApplicationLoanCriteriaId?: number;
        LoanApplicationApplyLoanAmount?: number;
        LoanApplicationApplyInterestAmount?: number;
        LoanApplicationApplyInterestRate?: number;
        LoanApplicationGrantedLoanAmount?: number;
        LoanApplicationGrantedInterestAmount?: number;
        LoanApplicationGrantedInterestRate?: number;
        LoanApplicationApproverId?: string;
        LoanApplicationAppStatusId?: number;
        LoanApplicationIsDiscard?: boolean;
        LoanApplicationIsApprovalProcess?: boolean;
        LoanApplicationApprovedDate?: string;
        LoanApplicationPFLoanType?: string;
        LoanApplicationIsIssue?: boolean;
        LoanApplicationResponsiblePersonId?: string;
        EmployeeId?: number;
        LaLoanIssueDetail?: LaLoanIssueDetailRow[];
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanIssueRow {
        const idProperty = "Id";
        const nameProperty = "LoanApplicationLoanNo";
        const localTextPrefix = "Task.LaLoanIssue";
        const lookupKey = "Task.LaLoanIssue";
        function getLookup(): Q.Lookup<LaLoanIssueRow>;
        const enum Fields {
            Id = "Id",
            LoanApplicationId = "LoanApplicationId",
            EffectiveMonth = "EffectiveMonth",
            EffectiveYear = "EffectiveYear",
            LoanAmount = "LoanAmount",
            PrincipalInstallmentAmount = "PrincipalInstallmentAmount",
            InterestAmount = "InterestAmount",
            InterestInstallmentAmount = "InterestInstallmentAmount",
            LastPrincipalInstallmentAmount = "LastPrincipalInstallmentAmount",
            LastInterestInstallmentAmount = "LastInterestInstallmentAmount",
            IsFullPaid = "IsFullPaid",
            IsReschedule = "IsReschedule",
            IsClose = "IsClose",
            FullPaidDate = "FullPaidDate",
            IsPosting = "IsPosting",
            CloseDate = "CloseDate",
            InterestConfirmDate = "InterestConfirmDate",
            LoanApplicationLoanNo = "LoanApplicationLoanNo",
            LoanApplicationEmployeeId = "LoanApplicationEmployeeId",
            EmpId = "EmpId",
            EmpFullName = "EmpFullName",
            LoanApplicationSeniorityNo = "LoanApplicationSeniorityNo",
            LoanApplicationApplyDate = "LoanApplicationApplyDate",
            LoanApplicationLoanCriteriaId = "LoanApplicationLoanCriteriaId",
            LoanApplicationApplyLoanAmount = "LoanApplicationApplyLoanAmount",
            LoanApplicationApplyInterestAmount = "LoanApplicationApplyInterestAmount",
            LoanApplicationApplyInterestRate = "LoanApplicationApplyInterestRate",
            LoanApplicationGrantedLoanAmount = "LoanApplicationGrantedLoanAmount",
            LoanApplicationGrantedInterestAmount = "LoanApplicationGrantedInterestAmount",
            LoanApplicationGrantedInterestRate = "LoanApplicationGrantedInterestRate",
            LoanApplicationApproverId = "LoanApplicationApproverId",
            LoanApplicationAppStatusId = "LoanApplicationAppStatusId",
            LoanApplicationIsDiscard = "LoanApplicationIsDiscard",
            LoanApplicationIsApprovalProcess = "LoanApplicationIsApprovalProcess",
            LoanApplicationApprovedDate = "LoanApplicationApprovedDate",
            LoanApplicationPFLoanType = "LoanApplicationPFLoanType",
            LoanApplicationIsIssue = "LoanApplicationIsIssue",
            LoanApplicationResponsiblePersonId = "LoanApplicationResponsiblePersonId",
            EmployeeId = "EmployeeId",
            LaLoanIssueDetail = "LaLoanIssueDetail",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaLoanIssueService {
        const baseUrl = "Task/LaLoanIssue";
        function Create(request: Serenity.SaveRequest<LaLoanIssueRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanIssueRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanIssueRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanIssueRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaLoanIssue/Create",
            Update = "Task/LaLoanIssue/Update",
            Delete = "Task/LaLoanIssue/Delete",
            Retrieve = "Task/LaLoanIssue/Retrieve",
            List = "Task/LaLoanIssue/List",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaLoanOpeningForm {
        EmployeeId: Serenity.LookupEditor;
        LoanApplicationId: Serenity.LookupEditor;
        BalanceMonth: MonthListEditor;
        BalanceYear: Serenity.StringEditor;
        PrincipalInstallmentNo: Serenity.IntegerEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        LoanAmount: Serenity.DecimalEditor;
        InterestAmount: Serenity.DecimalEditor;
        PrincipalPaidAmount: Serenity.DecimalEditor;
        PrincipalDueAmount: Serenity.DecimalEditor;
        InterestInstallmentNo: Serenity.IntegerEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        InterestPaidAmount: Serenity.DecimalEditor;
        InterestDueAmount: Serenity.DecimalEditor;
    }
    class LaLoanOpeningForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaLoanOpeningRow {
        Id?: number;
        EmployeeId?: number;
        BalanceMonth?: string;
        BalanceYear?: string;
        PrincipalInstallmentNo?: number;
        PrincipalInstallmentAmount?: number;
        PrincipalPaidAmount?: number;
        PrincipalDueAmount?: number;
        InterestInstallmentNo?: number;
        InterestInstallmentAmount?: number;
        InterestPaidAmount?: number;
        InterestDueAmount?: number;
        LoanApplicationId?: number;
        LoanApplicationLoanNo?: string;
        LoanApplicationEmployeeId?: number;
        LoanApplicationSeniorityNo?: number;
        LoanApplicationApplyDate?: string;
        LoanApplicationLoanCriteriaId?: number;
        LoanCriteriaSchemeName?: string;
        LoanApplicationApplyLoanAmount?: number;
        LoanApplicationApplyPrincipalInstallmentNo?: number;
        LoanApplicationApplyInterestAmount?: number;
        LoanApplicationApplyInterestInstallmentNo?: number;
        LoanApplicationApplyInterestRate?: number;
        LoanApplicationPurpose?: string;
        LoanApplicationGrantedLoanAmount?: number;
        LoanApplicationGrantedPrincipalInstallmentNo?: number;
        LoanApplicationGrantedInterestAmount?: number;
        LoanApplicationGrantedInterestInstallmentNo?: number;
        LoanApplicationGrantedInterestRate?: number;
        LoanApplicationNodeId?: number;
        LoanApplicationApproverId?: string;
        LoanApplicationAppStatusId?: number;
        LoanApplicationIsDiscard?: boolean;
        LoanApplicationIsApprovalProcess?: boolean;
        LoanApplicationIsOffLine?: boolean;
        LoanApplicationIUser?: string;
        LoanApplicationIDate?: string;
        LoanApplicationEUser?: string;
        LoanApplicationEDate?: string;
        LoanApplicationApprovedDate?: string;
        LoanApplicationPFLoanType?: string;
        LoanApplicationIsReApply?: boolean;
        LoanApplicationIsIssue?: boolean;
        LoanApplicationResponsiblePersonId?: string;
        EmpId?: string;
        EmployeeName?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaLoanOpeningRow {
        const idProperty = "Id";
        const nameProperty = "IUser";
        const localTextPrefix = "Task.LaLoanOpening";
        const lookupKey = "Task.LaLoanOpening";
        function getLookup(): Q.Lookup<LaLoanOpeningRow>;
        const enum Fields {
            Id = "Id",
            EmployeeId = "EmployeeId",
            BalanceMonth = "BalanceMonth",
            BalanceYear = "BalanceYear",
            PrincipalInstallmentNo = "PrincipalInstallmentNo",
            PrincipalInstallmentAmount = "PrincipalInstallmentAmount",
            PrincipalPaidAmount = "PrincipalPaidAmount",
            PrincipalDueAmount = "PrincipalDueAmount",
            InterestInstallmentNo = "InterestInstallmentNo",
            InterestInstallmentAmount = "InterestInstallmentAmount",
            InterestPaidAmount = "InterestPaidAmount",
            InterestDueAmount = "InterestDueAmount",
            LoanApplicationId = "LoanApplicationId",
            LoanApplicationLoanNo = "LoanApplicationLoanNo",
            LoanApplicationEmployeeId = "LoanApplicationEmployeeId",
            LoanApplicationSeniorityNo = "LoanApplicationSeniorityNo",
            LoanApplicationApplyDate = "LoanApplicationApplyDate",
            LoanApplicationLoanCriteriaId = "LoanApplicationLoanCriteriaId",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanApplicationApplyLoanAmount = "LoanApplicationApplyLoanAmount",
            LoanApplicationApplyPrincipalInstallmentNo = "LoanApplicationApplyPrincipalInstallmentNo",
            LoanApplicationApplyInterestAmount = "LoanApplicationApplyInterestAmount",
            LoanApplicationApplyInterestInstallmentNo = "LoanApplicationApplyInterestInstallmentNo",
            LoanApplicationApplyInterestRate = "LoanApplicationApplyInterestRate",
            LoanApplicationPurpose = "LoanApplicationPurpose",
            LoanApplicationGrantedLoanAmount = "LoanApplicationGrantedLoanAmount",
            LoanApplicationGrantedPrincipalInstallmentNo = "LoanApplicationGrantedPrincipalInstallmentNo",
            LoanApplicationGrantedInterestAmount = "LoanApplicationGrantedInterestAmount",
            LoanApplicationGrantedInterestInstallmentNo = "LoanApplicationGrantedInterestInstallmentNo",
            LoanApplicationGrantedInterestRate = "LoanApplicationGrantedInterestRate",
            LoanApplicationNodeId = "LoanApplicationNodeId",
            LoanApplicationApproverId = "LoanApplicationApproverId",
            LoanApplicationAppStatusId = "LoanApplicationAppStatusId",
            LoanApplicationIsDiscard = "LoanApplicationIsDiscard",
            LoanApplicationIsApprovalProcess = "LoanApplicationIsApprovalProcess",
            LoanApplicationIsOffLine = "LoanApplicationIsOffLine",
            LoanApplicationIUser = "LoanApplicationIUser",
            LoanApplicationIDate = "LoanApplicationIDate",
            LoanApplicationEUser = "LoanApplicationEUser",
            LoanApplicationEDate = "LoanApplicationEDate",
            LoanApplicationApprovedDate = "LoanApplicationApprovedDate",
            LoanApplicationPFLoanType = "LoanApplicationPFLoanType",
            LoanApplicationIsReApply = "LoanApplicationIsReApply",
            LoanApplicationIsIssue = "LoanApplicationIsIssue",
            LoanApplicationResponsiblePersonId = "LoanApplicationResponsiblePersonId",
            EmpId = "EmpId",
            EmployeeName = "EmployeeName",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaLoanOpeningService {
        const baseUrl = "Task/LaLoanOpening";
        function Create(request: Serenity.SaveRequest<LaLoanOpeningRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaLoanOpeningRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanOpeningRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanOpeningRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaLoanOpening/Create",
            Update = "Task/LaLoanOpening/Update",
            Delete = "Task/LaLoanOpening/Delete",
            Retrieve = "Task/LaLoanOpening/Retrieve",
            List = "Task/LaLoanOpening/List",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaMonthlyLoanInstallmentDetailForm {
        MonthlyLoanInstallmentId: Serenity.LookupEditor;
        LoanIssueId: Serenity.LookupEditor;
        EmployeeId: Serenity.LookupEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        TotalInstallmentAmount: Serenity.DecimalEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }
    class LaMonthlyLoanInstallmentDetailForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaMonthlyLoanInstallmentDetailRow {
        Id?: number;
        MonthlyLoanInstallmentId?: number;
        LoanIssueId?: number;
        EmployeeId?: number;
        PrincipalInstallmentAmount?: number;
        InterestInstallmentAmount?: number;
        TotalInstallmentAmount?: number;
        MonthlyLoanInstallmentForMonth?: string;
        MonthlyLoanInstallmentForYear?: string;
        MonthlyLoanInstallmentIUser?: string;
        MonthlyLoanInstallmentIDate?: string;
        MonthlyLoanInstallmentEUser?: string;
        MonthlyLoanInstallmentEDate?: string;
        MonthlyLoanInstallmentTotalPrincipalInstallmentAmount?: number;
        MonthlyLoanInstallmentTotalInterestInstallmentAmount?: number;
        MonthlyLoanInstallmentIsProcess?: boolean;
        LoanIssueLoanApplicationId?: number;
        LoanNo?: string;
        LoanIssueEffectiveMonth?: number;
        LoanIssueEffectiveYear?: number;
        LoanIssueLoanAmount?: number;
        LoanIssuePrincipalInstallmentAmount?: number;
        LoanIssueInterestAmount?: number;
        LoanIssueInterestInstallmentAmount?: number;
        LoanIssueLastPrincipalInstallmentAmount?: number;
        LoanIssueLastInterestInstallmentAmount?: number;
        LoanIssueIUser?: string;
        LoanIssueIDate?: string;
        LoanIssueEUser?: string;
        LoanIssueEDate?: string;
        LoanIssueIsFullPaid?: boolean;
        LoanIssueIsReschedule?: boolean;
        LoanIssueIsClose?: boolean;
        LoanIssueFullPaidDate?: string;
        LoanIssueIsPosting?: boolean;
        EmpId?: string;
        EmployeeName?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaMonthlyLoanInstallmentDetailRow {
        const idProperty = "Id";
        const nameProperty = "LoanIssueIUser";
        const localTextPrefix = "Task.LaMonthlyLoanInstallmentDetail";
        const lookupKey = "Task.LaMonthlyLoanInstallmentDetail";
        function getLookup(): Q.Lookup<LaMonthlyLoanInstallmentDetailRow>;
        const enum Fields {
            Id = "Id",
            MonthlyLoanInstallmentId = "MonthlyLoanInstallmentId",
            LoanIssueId = "LoanIssueId",
            EmployeeId = "EmployeeId",
            PrincipalInstallmentAmount = "PrincipalInstallmentAmount",
            InterestInstallmentAmount = "InterestInstallmentAmount",
            TotalInstallmentAmount = "TotalInstallmentAmount",
            MonthlyLoanInstallmentForMonth = "MonthlyLoanInstallmentForMonth",
            MonthlyLoanInstallmentForYear = "MonthlyLoanInstallmentForYear",
            MonthlyLoanInstallmentIUser = "MonthlyLoanInstallmentIUser",
            MonthlyLoanInstallmentIDate = "MonthlyLoanInstallmentIDate",
            MonthlyLoanInstallmentEUser = "MonthlyLoanInstallmentEUser",
            MonthlyLoanInstallmentEDate = "MonthlyLoanInstallmentEDate",
            MonthlyLoanInstallmentTotalPrincipalInstallmentAmount = "MonthlyLoanInstallmentTotalPrincipalInstallmentAmount",
            MonthlyLoanInstallmentTotalInterestInstallmentAmount = "MonthlyLoanInstallmentTotalInterestInstallmentAmount",
            MonthlyLoanInstallmentIsProcess = "MonthlyLoanInstallmentIsProcess",
            LoanIssueLoanApplicationId = "LoanIssueLoanApplicationId",
            LoanNo = "LoanNo",
            LoanIssueEffectiveMonth = "LoanIssueEffectiveMonth",
            LoanIssueEffectiveYear = "LoanIssueEffectiveYear",
            LoanIssueLoanAmount = "LoanIssueLoanAmount",
            LoanIssuePrincipalInstallmentAmount = "LoanIssuePrincipalInstallmentAmount",
            LoanIssueInterestAmount = "LoanIssueInterestAmount",
            LoanIssueInterestInstallmentAmount = "LoanIssueInterestInstallmentAmount",
            LoanIssueLastPrincipalInstallmentAmount = "LoanIssueLastPrincipalInstallmentAmount",
            LoanIssueLastInterestInstallmentAmount = "LoanIssueLastInterestInstallmentAmount",
            LoanIssueIUser = "LoanIssueIUser",
            LoanIssueIDate = "LoanIssueIDate",
            LoanIssueEUser = "LoanIssueEUser",
            LoanIssueEDate = "LoanIssueEDate",
            LoanIssueIsFullPaid = "LoanIssueIsFullPaid",
            LoanIssueIsReschedule = "LoanIssueIsReschedule",
            LoanIssueIsClose = "LoanIssueIsClose",
            LoanIssueFullPaidDate = "LoanIssueFullPaidDate",
            LoanIssueIsPosting = "LoanIssueIsPosting",
            EmpId = "EmpId",
            EmployeeName = "EmployeeName",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaMonthlyLoanInstallmentDetailService {
        const baseUrl = "Task/LaMonthlyLoanInstallmentDetail";
        function Create(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaMonthlyLoanInstallmentDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaMonthlyLoanInstallmentDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaMonthlyLoanInstallmentDetail/Create",
            Update = "Task/LaMonthlyLoanInstallmentDetail/Update",
            Delete = "Task/LaMonthlyLoanInstallmentDetail/Delete",
            Retrieve = "Task/LaMonthlyLoanInstallmentDetail/Retrieve",
            List = "Task/LaMonthlyLoanInstallmentDetail/List",
        }
    }
}
declare namespace VistaLOAN.Task {
    interface LaMonthlyLoanInstallmentForm {
        ForMonth: MonthListEditor;
        ForYear: Serenity.StringEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        TotalPrincipalInstallmentAmount: Serenity.DecimalEditor;
        TotalInterestInstallmentAmount: Serenity.DecimalEditor;
        IsProcess: Serenity.BooleanEditor;
        LaMonthlyLoanInstallmentDetailList: LaMonthlyLoanInstallmentDetailEditor;
    }
    class LaMonthlyLoanInstallmentForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaMonthlyLoanInstallmentRow {
        Id?: number;
        ForMonth?: string;
        ForYear?: string;
        TotalPrincipalInstallmentAmount?: number;
        TotalInterestInstallmentAmount?: number;
        IsProcess?: boolean;
        LaMonthlyLoanInstallmentDetailList?: LaMonthlyLoanInstallmentDetailRow[];
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaMonthlyLoanInstallmentRow {
        const idProperty = "Id";
        const nameProperty = "ForYear";
        const localTextPrefix = "Task.LaMonthlyLoanInstallment";
        const lookupKey = "Task.LaMonthlyLoanInstallment";
        function getLookup(): Q.Lookup<LaMonthlyLoanInstallmentRow>;
        const enum Fields {
            Id = "Id",
            ForMonth = "ForMonth",
            ForYear = "ForYear",
            TotalPrincipalInstallmentAmount = "TotalPrincipalInstallmentAmount",
            TotalInterestInstallmentAmount = "TotalInterestInstallmentAmount",
            IsProcess = "IsProcess",
            LaMonthlyLoanInstallmentDetailList = "LaMonthlyLoanInstallmentDetailList",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaMonthlyLoanInstallmentService {
        const baseUrl = "Task/LaMonthlyLoanInstallment";
        function Create(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaMonthlyLoanInstallmentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaMonthlyLoanInstallmentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaMonthlyLoanInstallment/Create",
            Update = "Task/LaMonthlyLoanInstallment/Update",
            Delete = "Task/LaMonthlyLoanInstallment/Delete",
            Retrieve = "Task/LaMonthlyLoanInstallment/Retrieve",
            List = "Task/LaMonthlyLoanInstallment/List",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface LaRequestedLoanApplicationForm {
        EmployeeName: Serenity.StringEditor;
        EmployeeId: Serenity.LookupEditor;
        SeniorityNo: Serenity.IntegerEditor;
        LoanCriteriaId: Serenity.LookupEditor;
        LoanNo: Serenity.StringEditor;
        ApplyDate: Serenity.DateEditor;
        ApplyLoanAmount: Serenity.DecimalEditor;
        ApplyPrincipalInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestAmount: Serenity.DecimalEditor;
        ApplyInterestInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestRate: Serenity.DecimalEditor;
        Purpose: Serenity.StringEditor;
        GrantedLoanAmount: Serenity.DecimalEditor;
        GrantedPrincipalInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestAmount: Serenity.DecimalEditor;
        GrantedInterestInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestRate: Serenity.DecimalEditor;
        NodeId: Serenity.IntegerEditor;
        ApproverId: Serenity.LookupEditor;
        NextApproverId: Serenity.LookupEditor;
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        ApprovedDate: Serenity.DateEditor;
        PFLoanType: Serenity.RadioButtonEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
    }
    class LaRequestedLoanApplicationForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface LaRequestedLoanApplicationRow {
        Id?: number;
        LoanNo?: string;
        EmployeeId?: number;
        SeniorityNo?: number;
        ApplyDate?: string;
        LoanCriteriaId?: number;
        ApplyLoanAmount?: number;
        ApplyPrincipalInstallmentNo?: number;
        ApplyInterestAmount?: number;
        ApplyInterestInstallmentNo?: number;
        ApplyInterestRate?: number;
        Purpose?: string;
        GrantedLoanAmount?: number;
        GrantedPrincipalInstallmentNo?: number;
        GrantedInterestAmount?: number;
        GrantedInterestInstallmentNo?: number;
        GrantedInterestRate?: number;
        NodeId?: number;
        ApproverId?: string;
        AppStatusId?: number;
        IsDiscard?: boolean;
        IsApprovalProcess?: boolean;
        IsOffLine?: boolean;
        ApprovedDate?: string;
        PFLoanType?: string;
        IsReApply?: boolean;
        IsIssue?: boolean;
        ResponsiblePersonId?: string;
        EmployeeWiseLoanId?: number;
        NextApproverId?: string;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        LoanCriteriaIUser?: string;
        LoanCriteriaIDate?: string;
        LoanCriteriaEUser?: string;
        LoanCriteriaEDate?: string;
        EmployeeName?: string;
        StatusName?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }
    namespace LaRequestedLoanApplicationRow {
        const idProperty = "Id";
        const nameProperty = "LoanNo";
        const localTextPrefix = "Task.LaRequestedLoanApplication";
        const lookupKey = "Task.LaRequestedLoanApplication";
        function getLookup(): Q.Lookup<LaRequestedLoanApplicationRow>;
        const enum Fields {
            Id = "Id",
            LoanNo = "LoanNo",
            EmployeeId = "EmployeeId",
            SeniorityNo = "SeniorityNo",
            ApplyDate = "ApplyDate",
            LoanCriteriaId = "LoanCriteriaId",
            ApplyLoanAmount = "ApplyLoanAmount",
            ApplyPrincipalInstallmentNo = "ApplyPrincipalInstallmentNo",
            ApplyInterestAmount = "ApplyInterestAmount",
            ApplyInterestInstallmentNo = "ApplyInterestInstallmentNo",
            ApplyInterestRate = "ApplyInterestRate",
            Purpose = "Purpose",
            GrantedLoanAmount = "GrantedLoanAmount",
            GrantedPrincipalInstallmentNo = "GrantedPrincipalInstallmentNo",
            GrantedInterestAmount = "GrantedInterestAmount",
            GrantedInterestInstallmentNo = "GrantedInterestInstallmentNo",
            GrantedInterestRate = "GrantedInterestRate",
            NodeId = "NodeId",
            ApproverId = "ApproverId",
            AppStatusId = "AppStatusId",
            IsDiscard = "IsDiscard",
            IsApprovalProcess = "IsApprovalProcess",
            IsOffLine = "IsOffLine",
            ApprovedDate = "ApprovedDate",
            PFLoanType = "PFLoanType",
            IsReApply = "IsReApply",
            IsIssue = "IsIssue",
            ResponsiblePersonId = "ResponsiblePersonId",
            EmployeeWiseLoanId = "EmployeeWiseLoanId",
            NextApproverId = "NextApproverId",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            LoanCriteriaIUser = "LoanCriteriaIUser",
            LoanCriteriaIDate = "LoanCriteriaIDate",
            LoanCriteriaEUser = "LoanCriteriaEUser",
            LoanCriteriaEDate = "LoanCriteriaEDate",
            EmployeeName = "EmployeeName",
            StatusName = "StatusName",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace LaRequestedLoanApplicationService {
        const baseUrl = "Task/LaRequestedLoanApplication";
        function Create(request: Serenity.SaveRequest<LaRequestedLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<LaRequestedLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaRequestedLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaRequestedLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/LaRequestedLoanApplication/Create",
            Update = "Task/LaRequestedLoanApplication/Update",
            Delete = "Task/LaRequestedLoanApplication/Delete",
            Retrieve = "Task/LaRequestedLoanApplication/Retrieve",
            List = "Task/LaRequestedLoanApplication/List",
        }
    }
}
declare namespace VistaLOAN.Task {
}
declare namespace VistaLOAN.Task {
    interface NonRefundableFinalPaymentForm {
        EmployeeId: Serenity.LookupEditor;
        SeniorityNo: Serenity.IntegerEditor;
        LoanCriteriaId: Serenity.LookupEditor;
        PFLoanType: PFPaymentTypeEditor;
        ApplyDate: Serenity.DateEditor;
        LoanNo: Serenity.StringEditor;
        ApplyLoanAmount: Serenity.DecimalEditor;
        ApplyPrincipalInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestAmount: Serenity.DecimalEditor;
        ApplyInterestInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestRate: Serenity.DecimalEditor;
        Purpose: Serenity.StringEditor;
        GrantedLoanAmount: Serenity.DecimalEditor;
        GrantedPrincipalInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestAmount: Serenity.DecimalEditor;
        GrantedInterestInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestRate: Serenity.DecimalEditor;
        NodeId: Serenity.IntegerEditor;
        ApproverId: Serenity.LookupEditor;
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        ApprovedDate: Serenity.DateEditor;
        NonRefundPFOwnLoanAmount: Serenity.DecimalEditor;
        NonRefundPFCompanyLoanAmount: Serenity.DecimalEditor;
        NonRefundOwnInterestLoanAmount: Serenity.DecimalEditor;
        NonRefundCompanyInterestLoanAmount: Serenity.DecimalEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmpOwnContribution: Serenity.DecimalEditor;
        EmpOwnInterest: Serenity.DecimalEditor;
        CompanyContribution: Serenity.DecimalEditor;
        CompanyInterest: Serenity.DecimalEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }
    class NonRefundableFinalPaymentForm extends Serenity.PrefixedContext {
        static formKey: string;
        private static init;
        constructor(prefix: string);
    }
}
declare namespace VistaLOAN.Task {
    interface NonRefundableFinalPaymentRow {
        Id?: number;
        LoanNo?: string;
        EmployeeId?: number;
        SeniorityNo?: number;
        ApplyDate?: string;
        LoanCriteriaId?: number;
        ApplyLoanAmount?: number;
        ApplyPrincipalInstallmentNo?: number;
        ApplyInterestAmount?: number;
        ApplyInterestInstallmentNo?: number;
        ApplyInterestRate?: number;
        Purpose?: string;
        GrantedLoanAmount?: number;
        GrantedPrincipalInstallmentNo?: number;
        GrantedInterestAmount?: number;
        GrantedInterestInstallmentNo?: number;
        GrantedInterestRate?: number;
        IsIssue?: boolean;
        IsApprovalProcess?: boolean;
        ApproverId?: string;
        ApprovedDate?: string;
        AppStatusId?: number;
        IsDiscard?: boolean;
        IsOffLine?: boolean;
        IsReApply?: boolean;
        ResponsiblePersonId?: string;
        EmployeeWiseLoanId?: number;
        NodeId?: number;
        PfLoanType?: string;
        NonRefundPfOwnLoanAmount?: number;
        NonRefundPfCompanyLoanAmount?: number;
        NonRefundOwnInterestLoanAmount?: number;
        NonRefundCompanyInterestLoanAmount?: number;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        LoanCriteriaIUser?: string;
        LoanCriteriaIDate?: string;
        LoanCriteriaEUser?: string;
        LoanCriteriaEDate?: string;
        EmployeeName?: string;
        EmpId?: string;
        StatusName?: string;
    }
    namespace NonRefundableFinalPaymentRow {
        const idProperty = "Id";
        const nameProperty = "LoanNo";
        const localTextPrefix = "Task.NonRefundableFinalPayment";
        const lookupKey = "Task.NonRefundableFinalPayment";
        function getLookup(): Q.Lookup<NonRefundableFinalPaymentRow>;
        const enum Fields {
            Id = "Id",
            LoanNo = "LoanNo",
            EmployeeId = "EmployeeId",
            SeniorityNo = "SeniorityNo",
            ApplyDate = "ApplyDate",
            LoanCriteriaId = "LoanCriteriaId",
            ApplyLoanAmount = "ApplyLoanAmount",
            ApplyPrincipalInstallmentNo = "ApplyPrincipalInstallmentNo",
            ApplyInterestAmount = "ApplyInterestAmount",
            ApplyInterestInstallmentNo = "ApplyInterestInstallmentNo",
            ApplyInterestRate = "ApplyInterestRate",
            Purpose = "Purpose",
            GrantedLoanAmount = "GrantedLoanAmount",
            GrantedPrincipalInstallmentNo = "GrantedPrincipalInstallmentNo",
            GrantedInterestAmount = "GrantedInterestAmount",
            GrantedInterestInstallmentNo = "GrantedInterestInstallmentNo",
            GrantedInterestRate = "GrantedInterestRate",
            IsIssue = "IsIssue",
            IsApprovalProcess = "IsApprovalProcess",
            ApproverId = "ApproverId",
            ApprovedDate = "ApprovedDate",
            AppStatusId = "AppStatusId",
            IsDiscard = "IsDiscard",
            IsOffLine = "IsOffLine",
            IsReApply = "IsReApply",
            ResponsiblePersonId = "ResponsiblePersonId",
            EmployeeWiseLoanId = "EmployeeWiseLoanId",
            NodeId = "NodeId",
            PfLoanType = "PfLoanType",
            NonRefundPfOwnLoanAmount = "NonRefundPfOwnLoanAmount",
            NonRefundPfCompanyLoanAmount = "NonRefundPfCompanyLoanAmount",
            NonRefundOwnInterestLoanAmount = "NonRefundOwnInterestLoanAmount",
            NonRefundCompanyInterestLoanAmount = "NonRefundCompanyInterestLoanAmount",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            LoanCriteriaIUser = "LoanCriteriaIUser",
            LoanCriteriaIDate = "LoanCriteriaIDate",
            LoanCriteriaEUser = "LoanCriteriaEUser",
            LoanCriteriaEDate = "LoanCriteriaEDate",
            EmployeeName = "EmployeeName",
            EmpId = "EmpId",
            StatusName = "StatusName",
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace NonRefundableFinalPaymentService {
        const baseUrl = "Task/NonRefundableFinalPayment";
        function Create(request: Serenity.SaveRequest<NonRefundableFinalPaymentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<NonRefundableFinalPaymentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<NonRefundableFinalPaymentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<NonRefundableFinalPaymentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        const enum Methods {
            Create = "Task/NonRefundableFinalPayment/Create",
            Update = "Task/NonRefundableFinalPayment/Update",
            Delete = "Task/NonRefundableFinalPayment/Delete",
            Retrieve = "Task/NonRefundableFinalPayment/Retrieve",
            List = "Task/NonRefundableFinalPayment/List",
        }
    }
}
declare namespace VistaLOAN.Task {
    class PfFundDataMigrationForm extends Serenity.PrefixedContext {
        static formKey: string;
    }
    interface PfFundDataMigrationForm {
        Empid: Serenity.StringEditor;
        Pfid: Serenity.IntegerEditor;
        Basic: Serenity.DecimalEditor;
        Pfintrate: Serenity.DecimalEditor;
        Pfmonth: Serenity.DateEditor;
        Mrat: Serenity.DecimalEditor;
        Brat: Serenity.DecimalEditor;
        Mcont: Serenity.DecimalEditor;
        Mcontcas: Serenity.DecimalEditor;
        Bcont: Serenity.DecimalEditor;
        Lnid: Serenity.IntegerEditor;
        Lnrecovrsal: Serenity.DecimalEditor;
        Lnrecovrcas: Serenity.DecimalEditor;
        LnAmtRefund: Serenity.DecimalEditor;
        LnAmtNonref: Serenity.DecimalEditor;
        Mcontcum: Serenity.DecimalEditor;
        Bcontcum: Serenity.DecimalEditor;
        Intmcum: Serenity.DecimalEditor;
        Intbcum: Serenity.DecimalEditor;
        Dedowncont: Serenity.DecimalEditor;
        Dedbcont: Serenity.DecimalEditor;
        Dedownint: Serenity.DecimalEditor;
        Dedbint: Serenity.DecimalEditor;
        EmpName: Serenity.StringEditor;
    }
}
declare namespace VistaLOAN.Task {
    interface PfFundDataMigrationRow {
        Empid?: string;
        Pfid?: number;
        Basic?: number;
        Pfintrate?: number;
        Pfmonth?: string;
        Mrat?: number;
        Brat?: number;
        Mcont?: number;
        Mcontcas?: number;
        Bcont?: number;
        Lnid?: number;
        Lnrecovrsal?: number;
        Lnrecovrcas?: number;
        LnAmtRefund?: number;
        LnAmtNonref?: number;
        Mcontcum?: number;
        Bcontcum?: number;
        Intmcum?: number;
        Intbcum?: number;
        Dedowncont?: number;
        Dedbcont?: number;
        Dedownint?: number;
        Dedbint?: number;
        EmpName?: string;
    }
    namespace PfFundDataMigrationRow {
        const nameProperty = "Empid";
        const localTextPrefix = "Task.PfFundDataMigration";
        namespace Fields {
            const Empid: any;
            const Pfid: any;
            const Basic: any;
            const Pfintrate: any;
            const Pfmonth: any;
            const Mrat: any;
            const Brat: any;
            const Mcont: any;
            const Mcontcas: any;
            const Bcont: any;
            const Lnid: any;
            const Lnrecovrsal: any;
            const Lnrecovrcas: any;
            const LnAmtRefund: any;
            const LnAmtNonref: any;
            const Mcontcum: any;
            const Bcontcum: any;
            const Intmcum: any;
            const Intbcum: any;
            const Dedowncont: any;
            const Dedbcont: any;
            const Dedownint: any;
            const Dedbint: any;
            const EmpName: any;
        }
    }
}
declare namespace VistaLOAN.Task {
    namespace PfFundDataMigrationService {
        const baseUrl = "Task/PfFundDataMigration";
        function Create(request: Serenity.SaveRequest<PfFundDataMigrationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function Update(request: Serenity.SaveRequest<PfFundDataMigrationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<PfFundDataMigrationRow>) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<PfFundDataMigrationRow>) => void, opt?: Serenity.ServiceOptions<any>): JQueryXHR;
        namespace Methods {
            const Create: string;
            const Update: string;
            const Delete: string;
            const Retrieve: string;
            const List: string;
        }
    }
}
declare namespace VistaLOAN.Task.Repositories {
    interface eCPFContributionRequest extends Serenity.ListRequest {
        EmployeeId?: number;
        Year?: string;
        Month?: string;
    }
}
declare namespace VistaLOAN.Task.Repositories {
    interface eCPFPolicyRequest extends Serenity.ListRequest {
        ApplicationDate?: string;
    }
}
declare namespace VistaLOAN.Task.Repositories {
    interface eForfeitedRuleRequest extends Serenity.ListRequest {
        ServiceLength?: number;
    }
}
declare namespace VistaLOAN.Task.Repositories {
    interface GetCPFContributionResponse extends Serenity.ServiceResponse {
        EmployeeId?: number;
        EmpID?: string;
        EmployeeName?: string;
        EmpCoreContribution?: number;
        EmpProfit?: number;
        ComCoreContribution?: number;
        ComProfit?: number;
    }
}
declare namespace VistaLOAN.Task.Repositories {
    interface GetCPFPolicyResponse extends Serenity.ServiceResponse {
        NRfApplicableFor?: string;
        NRfLoanPercentage?: number;
        NRfMinimumAge?: number;
        RfApplicableFor?: string;
        RfLoanPercentage?: number;
        RfMinServiceYear?: number;
    }
}
declare namespace VistaLOAN.Task.Repositories {
    interface GetForfeitedRuleResponse extends Serenity.ServiceResponse {
        ForfeitedRate?: number;
    }
}
declare namespace VistaLOAN {
    class q {
        static getHours(fromDate: Date, toDate: Date): number;
        static bindDateTimeEditorChange(editor: Serenity.DateTimeEditor, handler: any): void;
        static initDetailEditor(dialog: EntityDialogBase<any, any>, editor: GridEditorBase<any>): void;
        static addNotificationIcon(editor: Serenity.StringEditor, isSuccess: boolean): void;
    }
}
declare namespace VistaLOAN {
    class CorolEditor extends Serenity.TemplatedWidget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getTemplate(): string;
        constructor(container: JQuery);
        getEditValue(property: any, target: any): void;
        setEditValue(source: any, property: any): void;
    }
}
declare namespace VistaLOAN {
    class EntityDialogBase<TEntity, TOptions> extends Serenity.EntityDialog<TEntity, TOptions> {
        private loadedState;
        constructor();
        protected onDialogOpen(): void;
        protected getToolbarButtons(): Serenity.ToolButton[];
        onRefreshClick(): void;
        protected getSaveState(): string;
        loadResponse(data: any): void;
        maximize(): void;
        fullContentArea(): void;
        setDialogSize(width: any, height: any, left?: any, top?: any): void;
        hideEditorCaption(editor: JQuery): void;
        setGridEditorHeight(editor: JQuery, heightInPx: number): void;
    }
}
declare namespace VistaLOAN {
    class EntityGridBase<TItem, TOptions> extends Serenity.EntityGrid<TItem, TOptions> {
        constructor(container: JQuery, options?: TOptions);
        autoColumnSizePlugin: any;
        protected createSlickGrid(): Slick.Grid;
        protected markupReady(): void;
        protected getSlickOptions(): Slick.GridOptions;
        protected getButtons(): Serenity.ToolButton[];
        protected getColumns(): Slick.Column[];
        protected onClick(e: JQueryEventObject, row: number, cell: number): void;
        protected onInlineActionClick(target: JQuery, recordId: any, item: TItem): void;
        protected onViewProcessData(response: Serenity.ListResponse<TItem>): Serenity.ListResponse<TItem>;
    }
}
declare namespace Slick {
}
declare namespace VistaLOAN {
    class EntityGridBaseNew<TItem, TOptions> extends Serenity.EntityGrid<TItem, TOptions> {
        isAutosized: boolean;
        constructor(container: JQuery, options?: TOptions);
        autoColumnSizePlugin: any;
        protected createSlickGrid(): Slick.Grid;
        protected markupReady(): void;
        resizeAllCulumn(): void;
        protected getSlickOptions(): Slick.GridOptions;
        protected getButtons(): Serenity.ToolButton[];
        protected getColumns(): Slick.Column[];
        protected onClick(e: JQueryEventObject, row: number, cell: number): void;
        protected onInlineActionClick(target: JQuery, recordId: any, item: TItem): void;
        protected onViewProcessData(response: Serenity.ListResponse<TItem>): Serenity.ListResponse<TItem>;
    }
}
declare namespace VistaLOAN {
    class GridEditorBase<TEntity> extends EntityGridBase<TEntity, any> implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getIdProperty(): string;
        protected nextId: number;
        constructor(container: JQuery);
        protected getQuickFilters(): any[];
        protected id(entity: TEntity): any;
        protected save(opt: Serenity.ServiceOptions<any>, callback: (r: Serenity.ServiceResponse) => void): void;
        protected deleteEntity(id: number): boolean;
        protected validateEntity(row: TEntity, id: number): boolean;
        protected setEntities(items: TEntity[]): void;
        protected getNewEntity(): TEntity;
        protected getButtons(): Serenity.ToolButton[];
        protected editItem(entityOrId: any): void;
        getEditValue(property: any, target: any): void;
        setEditValue(source: any, property: any): void;
        value: TEntity[];
        protected getGridCanLoad(): boolean;
        protected usePager(): boolean;
        protected getInitialTitle(): any;
        protected createQuickSearchInput(): void;
        protected enableFiltering(): boolean;
        protected getSlickOptions(): Slick.GridOptions;
        parentDialog: EntityDialogBase<any, any>;
        protected masterEntity: any;
        setMasterEntity(entity: any): void;
        onItemsChanged(): void;
    }
}
declare namespace VistaLOAN {
    class GridEditorDialog<TEntity> extends EntityDialogBase<TEntity, any> {
        protected getIdProperty(): string;
        onSave: (options: Serenity.ServiceOptions<Serenity.SaveResponse>, callback: (response: Serenity.SaveResponse) => void) => void;
        onDelete: (options: Serenity.ServiceOptions<Serenity.DeleteResponse>, callback: (response: Serenity.DeleteResponse) => void) => void;
        destroy(): void;
        protected updateInterface(): void;
        protected saveHandler(options: Serenity.ServiceOptions<Serenity.SaveResponse>, callback: (response: Serenity.SaveResponse) => void): void;
        protected deleteHandler(options: Serenity.ServiceOptions<Serenity.DeleteResponse>, callback: (response: Serenity.DeleteResponse) => void): void;
        parentEditor: GridEditorBase<any>;
        protected masterEntity: any;
        setMasterEntity(entity: any): void;
    }
}
declare namespace q {
    function groupBy(xs: any[], key: any): any;
    function sortBy<T>(xs: T[], key: any): T[];
    function sortByDesc<T>(xs: T[], key: any): T[];
}
declare namespace q {
    function nextTick(date: any): Date;
    function addMinutes(date: Date, minutes: number): Date;
    function addHours(date: Date, hours: number): Date;
    function getHours(fromDate: Date, toDate: Date): number;
    function getDays24HourPulse(fromDate: Date, toDate: Date): number;
    function getDays(pFromDate: Date, pToDate: Date): number;
    function getMonths(fromDate: Date, toDate: Date): number;
    function getCalenderMonths(fromDate: Date, toDate: Date): number;
    function getCalenderMonthsCeil(fromDate: Date, toDate: Date): number;
    function addDays(date: Date, days: number): Date;
    function addMonths(date: Date, months: number): Date;
    function addYear(date: Date, years: number): Date;
    function getPeriods(fromDate: Date, toDate: Date, periodUnit: _Ext.TimeUoM): number;
    function addPeriod(date: Date, period: number, periodUnit: _Ext.TimeUoM): Date;
    function formatISODate(date: Date): string;
    function bindDateTimeEditorChange(editor: any, handler: any): void;
    function initDateRangeEditor(fromDateEditor: Serenity.DateEditor, toDateEditor: Serenity.DateEditor, onChangeHandler?: (e: JQueryEventObject) => void): void;
    function initDateTimeRangeEditor(fromDateTimeEditor: _Ext.DateTimePickerEditor, toDateTimeEditor: _Ext.DateTimePickerEditor, onChangeHandler?: (e: JQueryEventObject) => void): void;
    function formatDate(d: Date | string, format?: string): string;
}
declare namespace q {
    function initDetailEditor(dialog: _Ext.DialogBase<any, any>, editor: _Ext.GridEditorBase<any>, options?: ExtGridEditorOptions): void;
    function setGridEditorHeight(editor: JQuery, heightInPx: number): void;
    function addNotificationIcon(editor: Serenity.StringEditor, isSuccess: boolean): void;
    function setEditorLabel(editor: Serenity.Widget<any>, value: string): void;
    function hideEditorLabel(editor: Serenity.Widget<any>): void;
    function setEditorCategoryLabel(editor: Serenity.Widget<any>, value: string): void;
    function hideEditorCategory(editor: Serenity.Widget<any>, value?: boolean): void;
    function hideField(editor: Serenity.Widget<any>, value?: boolean): void;
    function showField(editor: Serenity.Widget<any>, value?: boolean): void;
    function hideEditorTab(editor: Serenity.Widget<any>, value?: boolean): void;
    function readOnlyEditorTab(editor: Serenity.Widget<any>, value?: boolean): void;
    function readOnlyEditorCategory(editor: Serenity.Widget<any>, value?: boolean): void;
    function readonlyEditorCategory($editor: JQuery, value?: boolean): void;
    function readOnlyEditor(editor: Serenity.Widget<any>, value?: boolean): void;
    function readonlyEditor($editor: JQuery, value?: boolean): void;
    function moveEditorFromTab(editor: Serenity.Widget<any>, toElement: JQuery, isPrepend?: boolean): void;
    function moveEditorCategoryFromTab(editor: Serenity.Widget<any>, toElement: JQuery, isPrepend?: boolean): void;
    function selectEditorTab(editor: Serenity.Widget<any>): void;
    function getSelectedRow<TRow>(e: JQueryEventObject): TRow;
}
declare namespace q {
    function getEnumText(enumKey: any, value: any): string;
    function getEnumValues(enumType: any): string[];
    function getEnumKeys(enumType: any): string[];
}
declare namespace q {
    function isCosmicThemeApplied(): boolean;
    function formatDecimal(value: any): string;
    function formatInt(value: any): string;
    function ToNumber(value: any): any;
    function ToBool(value: any): boolean;
    function getRandomColor(hexLetters: any): string;
}
declare var isPageRefreshRequired: boolean;
declare const nameofFactory: <T>() => (name: keyof T) => keyof T;
declare namespace q {
    var queryString: {};
    var jsPDFHeaderImageData: string;
    var jsPDFHeaderTitle: string;
    var useSerenityInlineEditors: boolean;
    var DefaultMainGridOptions: ExtGridOptions;
    var DefaultEditorGridOptions: ExtGridOptions;
    var DefaultEntityDialogOptions: ExtDialogOptions;
    var DefaultEditorDialogOptions: ExtDialogOptions;
    var fiscalYearMonths: number[];
}
declare namespace _Ext {
    class AuditLogActionTypeFormatter implements Slick.Formatter {
        static format(ctx: Slick.FormatterContext): string;
        format(ctx: Slick.FormatterContext): string;
    }
}
declare namespace _Ext {
    class AuditLogDialog extends DialogBase<AuditLogRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: AuditLogForm;
        protected afterLoadEntity(): void;
    }
}
declare namespace _Ext {
    class AuditLogGrid extends GridBase<AuditLogRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof AuditLogDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected getButtons(): Serenity.ToolButton[];
    }
}
declare var jsondiffpatch: any;
declare namespace _Ext {
    class AuditLogViewer {
        el: string;
        data: {
            entityVersions: any[];
        };
        entity: any;
        entityId: any;
        constructor(el: string, entityVersions: AuditLogRow[]);
        mounted: () => void;
        computed: {
            test: () => string;
        };
        filters: {
            filterByYardId: () => any[];
        };
        methods: {
            showDiff: (versionInfo: AuditLogRow) => void;
            getDiff: (versionInfo: AuditLogRow) => any;
        };
        destroyed(): void;
    }
}
declare namespace _Ext {
    class AuditLogViewerDialog extends Serenity.TemplatedDialog<any> {
        request: AuditLogViewerRequest;
        constructor(request: AuditLogViewerRequest);
        protected getTemplateName(): string;
    }
}
declare namespace _Ext {
    class ReportGridBase<TItem, TOptions> extends _Ext.GridBase<TItem, TOptions> {
        protected getButtons(): Serenity.ToolButton[];
        protected getColumns(): Slick.Column[];
    }
}
declare namespace _Ext {
    class ReplaceRowDialog extends _Ext.DialogBase<any, any> {
        request: ReplaceRowRequest;
        entityList: Array<any>;
        protected getFormKey(): string;
        protected form: ReplaceRowForm;
        constructor(request: ReplaceRowRequest, entityList: Array<any>);
        protected getToolbarButtons(): Serenity.ToolButton[];
    }
}
declare var Vue: any;
declare namespace _Ext.DevTools {
    class SergenPanel extends Serenity.Widget<any> {
        constructor(container: JQuery);
    }
}
declare namespace _Ext {
    class AutoCompleteEditor extends Serenity.StringEditor {
        constructor(input: JQuery, options: AutoCompleteOptions);
        protected bindAutoComplete(input: any): void;
    }
    interface AutoCompleteOptions {
        lookupKey: string;
        sourceArray: string[];
        sourceCSV: string;
        minSearchLength: number;
    }
}
declare namespace _Ext {
    class ColorEditor extends Serenity.TemplatedWidget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getTemplate(): string;
        constructor(container: JQuery);
        getEditValue(property: any, target: any): void;
        setEditValue(source: any, property: any): void;
    }
}
declare namespace _Ext {
    class DateTimePickerEditor extends Serenity.Widget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {
        getEditValue(property: any, target: any): void;
        setEditValue(source: any, property: any): void;
        constructor(container: JQuery);
        value: string;
        valueAsDate: Date;
        get_readOnly(): boolean;
        set_readOnly(value: boolean): void;
        set_minDate(date: Date): void;
        set_maxDate(date: Date): void;
        set_minDateTime(date: Date): void;
        set_maxDateTime(date: Date): void;
    }
}
declare namespace _Ext {
    class EmptyLookupEditor extends Serenity.Select2Editor<any, any> {
        setSelect2Items(items: Serenity.Select2Item[]): void;
        setLookupItems(lookup: Q.Lookup<any>): void;
    }
}
declare namespace _Ext {
    class HardCodedLookupEditor extends Serenity.Select2Editor<any, any> {
        constructor(container: JQuery, options: HardCodedLookupEditorOptions);
        protected getSelect2Options(): Select2Options;
    }
    interface HardCodedLookupEditorOptions {
        sourceArray: string[];
        sourceCSV: string;
        allowOtherValue: boolean;
    }
}
declare namespace _Ext {
    class HtmlTemplateEditor extends Serenity.HtmlContentEditor {
        constructor(textArea: JQuery, opt?: HtmlTemplateEditorOptions);
        protected getConfig(): Serenity.CKEditorConfig;
    }
    interface HtmlTemplateEditorOptions extends Serenity.HtmlContentEditorOptions {
        cols?: any;
        rows?: any;
        placeholders?: any;
    }
}
declare namespace _Ext {
    class StaticTextBlock extends Serenity.Widget<StaticTextBlockOptions> implements Serenity.ISetEditValue {
        private _value;
        constructor(container: JQuery, options: StaticTextBlockOptions);
        private updateElementContent();
        /**
         * By implementing ISetEditValue interface, we allow this editor to display its field value.
         * But only do this when our text content is not explicitly set in options
         */
        setEditValue(source: any, property: Serenity.PropertyItem): void;
        value: string;
    }
    interface StaticTextBlockOptions {
        text: string;
        isHtml: boolean;
        isLocalText: boolean;
        hideLabel: boolean;
    }
}
declare namespace _Ext {
    class CardViewMixin<TItem> {
        private options;
        private dataGrid;
        private getId;
        private vm;
        private cardContainer;
        viewType: ('list' | 'card');
        constructor(options: CardViewMixinOptions<TItem>);
        switchView(viewType: ('grid' | 'card')): void;
        updateCardItems(): void;
        resizeCardView(): void;
    }
    interface CardViewMixinOptions<TItem> {
        grid: Serenity.DataGrid<TItem, any>;
        containerTemplate?: string;
        itemTemplate?: string;
        methods?: any;
        itemCssClass?: string;
        defaultViewType?: ('list' | 'card');
        itemsCssStyle?: string;
        itemCssStyle?: string;
    }
}
declare namespace _Ext {
    /**
     * A mixin that can be applied to a DataGrid for excel style filtering functionality
     */
    class HeaderFiltersMixin<TItem> {
        private options;
        private dataGrid;
        constructor(options: HeaderFiltersMixinOptions<TItem>);
    }
    interface HeaderFiltersMixinOptions<TItem> {
        grid: Serenity.DataGrid<TItem, any>;
    }
}
declare namespace _Ext {
    /**
     * A mixin that can be applied to a DataGrid for tree functionality
     */
    class TreeGridMixin<TItem> {
        private options;
        private dataGrid;
        private getId;
        constructor(options: TreeGridMixinOptions<TItem>);
        /**
         * Expands / collapses all rows in a grid automatically
         */
        toggleAll(): void;
        expandAll(): void;
        collapsedAll(): void;
        /**
         * Reorders a set of items so that parents comes before their children.
         * This method is required for proper tree ordering, as it is not so easy to perform with SQL.
         * @param items list of items to be ordered
         * @param getId a delegate to get ID of a record (must return same ID with grid identity field)
         * @param getParentId a delegate to get parent ID of a record
         */
        static applyTreeOrdering<TItem>(items: TItem[], getId: (item: TItem) => any, getParentId: (item: TItem) => any): TItem[];
        static filterById<TItem>(item: TItem, view: Slick.RemoteView<TItem>, idProperty: any, getParentId: (x: TItem) => any): boolean;
        static treeToggle<TItem>(getView: () => Slick.RemoteView<TItem>, getId: (x: TItem) => any, formatter: Slick.Format): Slick.Format;
        static toggleClick<TItem>(e: JQueryEventObject, row: number, cell: number, view: Slick.RemoteView<TItem>, getId: (x: TItem) => any): void;
    }
    interface TreeGridMixinOptions<TItem> {
        grid: Serenity.DataGrid<TItem, any>;
        idField?: string;
        getParentId: (item: TItem) => any;
        toggleField: string;
        initialCollapse?: () => boolean;
    }
}
declare namespace _Ext {
    interface ExcelExportOptions {
        grid: Serenity.DataGrid<any, any>;
        service: string;
        onViewSubmit: () => boolean;
        title?: string;
        hint?: string;
        separator?: boolean;
    }
    namespace ExcelExportHelper {
        function createToolButton(options: ExcelExportOptions): Serenity.ToolButton;
    }
}
declare var jsPDF: any;
declare namespace _Ext {
    interface PdfExportOptions {
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
        columnTitles?: {
            [key: string]: string;
        };
        tableOptions?: jsPDF.AutoTableOptions;
        output?: string;
        autoPrint?: boolean;
    }
    namespace PdfExportHelper {
        function exportToPdf(options: PdfExportOptions): void;
        function createToolButton(options: PdfExportOptions): Serenity.ToolButton;
    }
}
declare namespace Slick {
    interface RemoteView<TEntity> {
        getGroups(): Slick.Group<TEntity>[];
        getGrouping(): Slick.GroupInfo<TEntity>[];
    }
}
declare namespace _Ext {
    interface ReportExecuteOptions {
        reportKey: string;
        download?: boolean;
        extension?: 'pdf' | 'htm' | 'html' | 'xlsx' | 'docx';
        getParams?: () => any;
        params?: {
            [key: string]: any;
        };
        target?: string;
    }
    interface ReportButtonOptions extends ReportExecuteOptions {
        title?: string;
        cssClass?: string;
        icon?: string;
    }
    namespace ReportHelper {
        function createToolButton(options: ReportButtonOptions): Serenity.ToolButton;
        function execute(options: ReportExecuteOptions): void;
    }
}
declare namespace _Ext.DialogUtils {
    function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean): void;
}
declare function loadScriptAsync(url: any, callback: any): void;
declare function loadScript(url: any): void;
declare function usingVuejs(): void;
declare function includeBootstrapColorPickerCss(): void;
declare function usingBootstrapColorPicker(): void;
declare function includeJqueryUITimepickerAddonCss(): void;
declare function usingJqueryUITimepickerAddon(): void;
declare function usingBabylonjs(): void;
declare function usingChartjs(): void;
declare function includeCustomMarkerCss(): void;
declare function usingCustomMarker(): void;
declare function includeGoogleMap(callback?: Function, callbackFullName?: string): void;
declare function includeMarkerWithLabel(): void;
declare function includeVisCss(): void;
declare function usingVisjs(): void;
declare function usingJsonDiffPatch(): void;
declare function usingSlickGridEditors(): void;
declare function usingSlickAutoColumnSize(): void;
declare function usingSlickHeaderFilters(): void;
declare namespace VistaLOAN.Administration {
    class LanguageDialog extends EntityDialogBase<LanguageRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LanguageForm;
    }
}
declare namespace VistaLOAN.Administration {
    class LanguageGrid extends EntityGridBase<LanguageRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LanguageDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected getDefaultSortBy(): LanguageRow.Fields[];
    }
}
declare namespace VistaLOAN.Administration {
    class RoleDialog extends EntityDialogBase<RoleRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: RoleForm;
        protected getToolbarButtons(): Serenity.ToolButton[];
        protected updateInterface(): void;
    }
}
declare namespace VistaLOAN.Administration {
    class RoleGrid extends EntityGridBase<RoleRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof RoleDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected getDefaultSortBy(): RoleRow.Fields[];
    }
}
declare namespace VistaLOAN.Administration {
    class RolePermissionDialog extends Serenity.TemplatedDialog<RolePermissionDialogOptions> {
        private permissions;
        constructor(opt: RolePermissionDialogOptions);
        protected getDialogOptions(): JQueryUI.DialogOptions;
        protected getTemplate(): string;
    }
    interface RolePermissionDialogOptions {
        roleID?: number;
        title?: string;
    }
}
declare namespace VistaLOAN.Administration {
    class TranslationGrid extends EntityGridBase<TranslationItem, any> {
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        private hasChanges;
        private searchText;
        private sourceLanguage;
        private targetLanguage;
        private targetLanguageKey;
        constructor(container: JQuery);
        protected onClick(e: JQueryEventObject, row: number, cell: number): any;
        protected getColumns(): Slick.Column[];
        protected createToolbarExtensions(): void;
        protected saveChanges(language: string): RSVP.Promise<any>;
        protected onViewSubmit(): boolean;
        protected getButtons(): Serenity.ToolButton[];
        protected createQuickSearchInput(): void;
        protected onViewFilter(item: TranslationItem): boolean;
        protected usePager(): boolean;
    }
}
declare namespace VistaLOAN.Administration {
    class UserDialog extends EntityDialogBase<UserRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getIsActiveProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: UserForm;
        constructor();
        protected getToolbarButtons(): Serenity.ToolButton[];
        protected updateInterface(): void;
        protected afterLoadEntity(): void;
    }
}
declare namespace VistaLOAN.Administration {
    class UserGrid extends EntityGridBase<UserRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof UserDialog;
        protected getIdProperty(): string;
        protected getIsActiveProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected getDefaultSortBy(): UserRow.Fields[];
    }
}
declare namespace VistaLOAN.Authorization {
    let userDefinition: ScriptUserDefinition;
    function hasPermission(permissionKey: string): boolean;
}
declare namespace VistaLOAN.Administration {
    class PermissionCheckEditor extends Serenity.DataGrid<PermissionCheckItem, PermissionCheckEditorOptions> {
        protected getIdProperty(): string;
        private searchText;
        private byParentKey;
        private rolePermissions;
        constructor(container: JQuery, opt: PermissionCheckEditorOptions);
        private getItemGrantRevokeClass(item, grant);
        private getItemEffectiveClass(item);
        protected getColumns(): Slick.Column[];
        setItems(items: PermissionCheckItem[]): void;
        protected onViewSubmit(): boolean;
        protected onViewFilter(item: PermissionCheckItem): boolean;
        private matchContains(item);
        private getDescendants(item, excludeGroups);
        protected onClick(e: any, row: any, cell: any): void;
        private getParentKey(key);
        protected getButtons(): Serenity.ToolButton[];
        protected createToolbarExtensions(): void;
        private getSortedGroupAndPermissionKeys(titleByKey);
        get_value(): UserPermissionRow[];
        set_value(value: UserPermissionRow[]): void;
        get_rolePermissions(): string[];
        set_rolePermissions(value: string[]): void;
    }
    interface PermissionCheckEditorOptions {
        showRevoke?: boolean;
    }
    interface PermissionCheckItem {
        ParentKey?: string;
        Key?: string;
        Title?: string;
        IsGroup?: boolean;
        GrantRevoke?: boolean;
    }
}
declare namespace VistaLOAN.Administration {
    class UserPermissionDialog extends Serenity.TemplatedDialog<UserPermissionDialogOptions> {
        private permissions;
        constructor(opt: UserPermissionDialogOptions);
        protected getDialogOptions(): JQueryUI.DialogOptions;
        protected getTemplate(): string;
    }
    interface UserPermissionDialogOptions {
        userID?: number;
        username?: string;
    }
}
declare namespace VistaLOAN.Administration {
    class RoleCheckEditor extends Serenity.CheckTreeEditor<Serenity.CheckTreeItem<any>, any> {
        private searchText;
        constructor(div: JQuery);
        protected createToolbarExtensions(): void;
        protected getButtons(): any[];
        protected getTreeItems(): Serenity.CheckTreeItem<any>[];
        protected onViewFilter(item: any): boolean;
    }
}
declare namespace VistaLOAN.Administration {
    class UserRoleDialog extends Serenity.TemplatedDialog<UserRoleDialogOptions> {
        private permissions;
        constructor(opt: UserRoleDialogOptions);
        protected getDialogOptions(): JQueryUI.DialogOptions;
        protected getTemplate(): string;
    }
    interface UserRoleDialogOptions {
        userID: number;
        username: string;
    }
}
declare namespace VistaLOAN {
    class TrueFalseEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {
        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions);
    }
    class ApprovalStatusEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {
        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions);
    }
    class MonthListEditor extends Serenity.Select2Editor<any, any> {
        constructor(container: JQuery);
    }
    class CashOrChequeSelectEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {
        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions);
    }
    class PFLoanTypeEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {
        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions);
    }
    class PFPaymentTypeEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {
        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions);
    }
}
declare var multiplicationFactor: number;
declare const containerWidth = 8;
declare const containerHeight = 8.6;
declare namespace VistaLOAN.ScriptInitialization {
}
declare namespace VistaLOAN {
    class BasicProgressDialog extends Serenity.TemplatedDialog<any> {
        constructor();
        cancelled: boolean;
        max: number;
        value: number;
        title: string;
        cancelTitle: string;
        getDialogOptions(): JQueryUI.DialogOptions;
        initDialog(): void;
        getTemplate(): string;
    }
}
declare namespace VistaLOAN.Common {
    class BulkServiceAction {
        protected keys: string[];
        protected queue: string[];
        protected queueIndex: number;
        protected progressDialog: BasicProgressDialog;
        protected pendingRequests: number;
        protected completedRequests: number;
        protected errorByKey: Q.Dictionary<Serenity.ServiceError>;
        private successCount;
        private errorCount;
        done: () => void;
        protected createProgressDialog(): void;
        protected getConfirmationFormat(): string;
        protected getConfirmationMessage(targetCount: any): string;
        protected confirm(targetCount: any, action: any): void;
        protected getNothingToProcessMessage(): string;
        protected nothingToProcess(): void;
        protected getParallelRequests(): number;
        protected getBatchSize(): number;
        protected startParallelExecution(): void;
        protected serviceCallCleanup(): void;
        protected executeForBatch(batch: string[]): void;
        protected executeNextBatch(): void;
        protected getAllHadErrorsFormat(): string;
        protected showAllHadErrors(): void;
        protected getSomeHadErrorsFormat(): string;
        protected showSomeHadErrors(): void;
        protected getAllSuccessFormat(): string;
        protected showAllSuccess(): void;
        protected showResults(): void;
        execute(keys: string[]): void;
        get_successCount(): any;
        set_successCount(value: number): void;
        get_errorCount(): any;
        set_errorCount(value: number): void;
    }
}
declare namespace VistaLOAN.DialogUtils {
    function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean): void;
}
declare namespace VistaLOAN.Common {
    interface ExcelExportOptions {
        grid: Serenity.DataGrid<any, any>;
        service: string;
        onViewSubmit: () => boolean;
        title?: string;
        hint?: string;
        separator?: boolean;
    }
    namespace ExcelExportHelper {
        function createToolButton(options: ExcelExportOptions): Serenity.ToolButton;
    }
}
declare namespace VistaLOAN.LanguageList {
    function getValue(): string[][];
}
declare namespace VistaLOAN.Common {
    interface ReportButtonOptions {
        title?: string;
        cssClass?: string;
        icon?: string;
        download?: boolean;
        reportKey: string;
        extension?: string;
        getParams?: () => any;
        target?: string;
    }
    namespace ReportHelper {
        function createToolButton(options: ReportButtonOptions): Serenity.ToolButton;
    }
}
declare namespace VistaLOAN.Common {
    class LanguageSelection extends Serenity.Widget<any> {
        constructor(select: JQuery, currentLanguage: string);
    }
}
declare namespace VistaLOAN.Common {
    class SidebarSearch extends Serenity.Widget<any> {
        private menuUL;
        constructor(input: JQuery, menuUL: JQuery);
        protected updateMatchFlags(text: string): void;
    }
}
declare namespace VistaLOAN.Common {
    class ThemeSelection extends Serenity.Widget<any> {
        constructor(select: JQuery);
        protected getCurrentTheme(): string;
    }
}
declare var jsPDF: any;
declare namespace VistaLOAN.Common {
    interface PdfExportOptions {
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
        columnTitles?: {
            [key: string]: string;
        };
        tableOptions?: jsPDF.AutoTableOptions;
        output?: string;
        autoPrint?: boolean;
    }
    namespace PdfExportHelper {
        function exportToPdf(options: PdfExportOptions): void;
        function createToolButton(options: PdfExportOptions): Serenity.ToolButton;
    }
}
declare namespace Slick {
    interface RemoteView<TEntity> {
        getGroups(): Slick.Group<TEntity>[];
        getGrouping(): Slick.GroupInfo<TEntity>[];
    }
}
declare var jsPDF: any;
declare namespace VistaLOAN.Common {
    class ReportDialog extends Serenity.TemplatedDialog<ReportDialogOptions> {
        private report;
        private propertyItems;
        private propertyGrid;
        constructor(options: ReportDialogOptions);
        protected getDialogButtons(): any;
        protected createPropertyGrid(): void;
        protected loadReport(reportKey: string): void;
        protected updateInterface(): void;
        executeReport(target: string, ext: string, download: boolean): void;
        getToolbarButtons(): {
            title: string;
            cssClass: string;
            onClick: () => void;
        }[];
    }
    interface ReportDialogOptions {
        reportKey: string;
    }
}
declare namespace VistaLOAN.Common {
    interface ReportExecuteOptions {
        reportKey: string;
        download?: boolean;
        extension?: 'pdf' | 'htm' | 'html' | 'xlsx' | 'docx';
        getParams?: () => any;
        params?: {
            [key: string]: any;
        };
        target?: string;
    }
    namespace ReportHelper {
        function execute(options: ReportExecuteOptions): void;
    }
}
declare var jsPDF: any;
declare namespace VistaLOAN.Common {
    class ReportPage extends Serenity.Widget<any> {
        private reportKey;
        private propertyItems;
        private propertyGrid;
        constructor(element: JQuery);
        protected updateMatchFlags(text: string): void;
        protected categoryClick(e: any): void;
        protected reportLinkClick(e: any): void;
    }
}
declare namespace VistaLOAN.Common {
    class UserPreferenceStorage implements Serenity.SettingStorage {
        getItem(key: string): string;
        setItem(key: string, data: string): void;
    }
}
declare namespace VistaLOAN.HRM {
    class EmploymentInfoDialog extends Serenity.EntityDialog<EmploymentInfoRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: EmploymentInfoForm;
    }
}
declare namespace VistaLOAN.HRM {
    class EmploymentInfoGrid extends Serenity.EntityGrid<EmploymentInfoRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof EmploymentInfoDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Membership {
    class LoginPanel extends Serenity.PropertyPanel<LoginRequest, any> {
        protected getFormKey(): string;
        private form;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Membership {
    class ChangePasswordPanel extends Serenity.PropertyPanel<ChangePasswordRequest, any> {
        protected getFormKey(): string;
        private form;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Membership {
    class ForgotPasswordPanel extends Serenity.PropertyPanel<ForgotPasswordRequest, any> {
        protected getFormKey(): string;
        private form;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Membership {
    class ResetPasswordPanel extends Serenity.PropertyPanel<ResetPasswordRequest, any> {
        protected getFormKey(): string;
        private form;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Membership {
    class SignUpPanel extends Serenity.PropertyPanel<SignUpRequest, any> {
        protected getFormKey(): string;
        private form;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Setup {
    class LaDonorInformationDialog extends Serenity.EntityDialog<LaDonorInformationRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaDonorInformationForm;
    }
}
declare namespace VistaLOAN.Setup {
    class LaDonorInformationGrid extends Serenity.EntityGrid<LaDonorInformationRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaDonorInformationDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanApplicationLastNumberDialog extends Serenity.EntityDialog<LaLoanApplicationLastNumberRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        protected form: LaLoanApplicationLastNumberForm;
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanApplicationLastNumberGrid extends Serenity.EntityGrid<LaLoanApplicationLastNumberRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanApplicationLastNumberDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanCriteriaDialog extends Serenity.EntityDialog<LaLoanCriteriaRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanCriteriaForm;
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanCriteriaGrid extends EntityGridBaseNew<LaLoanCriteriaRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanCriteriaDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanEligibleInformationDialog extends Serenity.EntityDialog<LaLoanEligibleInformationRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanEligibleInformationForm;
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanEligibleInformationGrid extends EntityGridBaseNew<LaLoanEligibleInformationRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanEligibleInformationDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanTypeDialog extends Serenity.EntityDialog<LaLoanTypeRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanTypeForm;
    }
}
declare namespace VistaLOAN.Setup {
    class LaLoanTypeGrid extends EntityGridBaseNew<LaLoanTypeRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanTypeDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Setup {
    class selectLoanTypeDialog extends Serenity.PropertyDialog<any, any> {
        protected getFormKey(): string;
        constructor();
    }
}
declare namespace VistaLOAN.Task {
    class LaCpfCashOrChequeCollectionDialog extends Serenity.EntityDialog<LaCpfCashOrChequeCollectionRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaCpfCashOrChequeCollectionForm;
        constructor();
        protected onDialogOpen(): void;
        ShowHideCollectionType(): void;
    }
}
declare namespace VistaLOAN.Task {
    class LaCpfCashOrChequeCollectionGrid extends EntityGridBaseNew<LaCpfCashOrChequeCollectionRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaCpfCashOrChequeCollectionDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanApplicationDialog extends Serenity.EntityDialog<LaLoanApplicationRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanApplicationForm;
        constructor();
        protected onDialogOpen(): void;
        GetCPFContribution(): void;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanApplicationGrid extends EntityGridBaseNew<LaLoanApplicationRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanApplicationDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        userInfo: ScriptUserDefinition;
        empInfo: HRM.EmploymentInfoRow;
        constructor(container: JQuery);
        protected onViewSubmit(): boolean;
        protected addButtonClick(): void;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanApplicationOfflineDialog extends Serenity.EntityDialog<LaLoanApplicationRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanApplicationOfflineForm;
        EmployeeInfo: HRM.EmploymentInfoRow[];
        NRfApplicableFor: string;
        NRfLoanPercentage: number;
        NRfMinimumAge: number;
        RfApplicableFor: string;
        RfLoanPercentage: number;
        RfMinServiceYear: number;
        ForfeitedRate: number;
        constructor();
        protected onDialogOpen(): void;
        ToggleNonRefundFields(Boolean: any): void;
        GetCPFContribution(): void;
        GetCPFPolicy(): void;
        GetForfeitedRule(serviceLength: number): void;
        GetDateDifference(ddate: string): number;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanApplicationOfflineGrid extends EntityGridBaseNew<LaLoanApplicationRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanApplicationOfflineDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected onViewSubmit(): boolean;
        protected addButtonClick(): void;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanCircularInformationDialog extends Serenity.EntityDialog<LaLoanCircularInformationRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanCircularInformationForm;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanCircularInformationGrid extends EntityGridBaseNew<LaLoanCircularInformationRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanCircularInformationDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanIssueDialog extends Serenity.EntityDialog<LaLoanIssueRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanIssueForm;
        constructor(container: JQuery);
        protected LoanApplication(): void;
        protected onDialogOpen(): void;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanIssueGrid extends EntityGridBaseNew<LaLoanIssueRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanIssueDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanIssueDetailDialog extends Serenity.EntityDialog<LaLoanIssueDetailRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanIssueDetailForm;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanIssueDetailEditor extends GridEditorBase<LaLoanIssueDetailRow> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanIssueDetailEditorDialog;
        protected getLocalTextPrefix(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanIssueDetailEditorDialog extends GridEditorDialog<LaLoanIssueDetailRow> {
        protected getFormKey(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected form: LaLoanIssueDetailForm;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanIssueDetailGrid extends Serenity.EntityGrid<LaLoanIssueDetailRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanIssueDetailDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanOpeningDialog extends Serenity.EntityDialog<LaLoanOpeningRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaLoanOpeningForm;
        constructor();
        onDialogOpen(): void;
    }
}
declare namespace VistaLOAN.Task {
    class LaLoanOpeningGrid extends EntityGridBaseNew<LaLoanOpeningRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaLoanOpeningDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaMonthlyLoanInstallmentDialog extends Serenity.EntityDialog<LaMonthlyLoanInstallmentRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaMonthlyLoanInstallmentForm;
    }
}
declare namespace VistaLOAN.Task {
    class LaMonthlyLoanInstallmentGrid extends EntityGridBaseNew<LaMonthlyLoanInstallmentRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaMonthlyLoanInstallmentDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected getButtons(): Serenity.ToolButton[];
    }
}
declare namespace VistaLOAN.Task {
    class LaMonthlyLoanInstallmentDetailDialog extends Serenity.EntityDialog<LaMonthlyLoanInstallmentDetailRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaMonthlyLoanInstallmentDetailForm;
    }
}
declare namespace VistaLOAN.Task {
    class LaMonthlyLoanInstallmentDetailEditor extends _Ext.GridEditorBase<LaMonthlyLoanInstallmentDetailRow> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaMonthlyLoanInstallmentDetailEditorDialog;
        protected getLocalTextPrefix(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaMonthlyLoanInstallmentDetailEditorDialog extends _Ext.EditorDialogBase<LaMonthlyLoanInstallmentDetailRow> {
        protected getFormKey(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected form: LaMonthlyLoanInstallmentDetailForm;
    }
}
declare namespace VistaLOAN.Task {
    class LaMonthlyLoanInstallmentDetailGrid extends Serenity.EntityGrid<LaMonthlyLoanInstallmentDetailRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaMonthlyLoanInstallmentDetailDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
    }
}
declare namespace VistaLOAN.Task {
    class LaRequestedLoanApplicationDialog extends Serenity.EntityDialog<LaRequestedLoanApplicationRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: LaRequestedLoanApplicationForm;
        protected onDialogOpen(): void;
        protected getToolbarButtons(): Serenity.ToolButton[];
    }
}
declare namespace VistaLOAN.Task {
    class LaRequestedLoanApplicationGrid extends EntityGridBaseNew<LaRequestedLoanApplicationRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof LaRequestedLoanApplicationDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        userInfo: ScriptUserDefinition;
        empInfo: HRM.EmploymentInfoRow;
        constructor(container: JQuery);
        protected onViewSubmit(): boolean;
        protected getButtons(): Serenity.ToolButton[];
    }
}
declare namespace VistaLOAN.Task {
    class NonRefundableFinalPaymentDialog extends Serenity.EntityDialog<NonRefundableFinalPaymentRow, any> {
        protected getFormKey(): string;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getNameProperty(): string;
        protected getService(): string;
        protected form: NonRefundableFinalPaymentForm;
        userInfo: ScriptUserDefinition;
        EmployeeInfo: HRM.EmploymentInfoRow[];
        NRfApplicableFor: string;
        NRfLoanPercentage: number;
        NRfMinimumAge: number;
        RfApplicableFor: string;
        RfLoanPercentage: number;
        RfMinServiceYear: number;
        ForfeitedRate: number;
        constructor();
        protected onDialogOpen(): void;
        ToggleNonRefundFields(Boolean: any): void;
        GetCPFContribution(): void;
        GetCPFPolicy(): void;
        GetForfeitedRule(serviceLength: number): void;
        GetDateDifference(ddate: string): number;
    }
}
declare namespace VistaLOAN.Task {
    class NonRefundableFinalPaymentGrid extends EntityGridBaseNew<NonRefundableFinalPaymentRow, any> {
        protected getColumnsKey(): string;
        protected getDialogType(): typeof NonRefundableFinalPaymentDialog;
        protected getIdProperty(): string;
        protected getLocalTextPrefix(): string;
        protected getService(): string;
        constructor(container: JQuery);
        protected onViewSubmit(): boolean;
        protected addButtonClick(): void;
    }
}
