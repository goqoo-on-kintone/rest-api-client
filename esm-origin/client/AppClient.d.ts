import type { HttpClient } from "../http";
import type { AppID, RecordID, Revision, Properties, Lang, Layout, ViewForResponse, ViewForParameter, App, StateForResponse, StateForParameter, ActionForResponse, ActionForParameter, DeployStatus, FieldRightForResponse, FieldRightForParameter, AppRightEntityForResponse, AppRightEntityForParameter, EvaluatedRecordRight, RecordRightForResponse, RecordRightForParameter, AppCustomizeScope, AppCustomizeForResponse, AppCustomizeForParameter, GeneralNotificationForParameter, GeneralNotificationForResponse, PerRecordNotificationForParameter, PerRecordNotificationForResponse, ReminderNotificationForParameter, ReminderNotificationForResponse, ReportForParameter, ReportForResponse, AppActionsForParameter, AppActionsForResponse } from "./types";
type RowLayoutForParameter = {
    type: "ROW";
    fields: Array<{
        [key: string]: unknown;
    }>;
};
type SubtableLayoutForParameter = {
    type: "SUBTABLE";
    code: string;
    fields: Array<{
        [key: string]: unknown;
    }>;
};
type GroupLayoutForParameter = {
    type: "GROUP";
    code: string;
    layout: RowLayoutForParameter[];
};
type LayoutForParameter = Array<RowLayoutForParameter | SubtableLayoutForParameter | GroupLayoutForParameter>;
type NestedPartial<T> = T extends object ? {
    [K in keyof T]?: NestedPartial<T[K]>;
} : T;
type PropertiesForParameter = NestedPartial<Properties>;
export declare class AppClient {
    private client;
    private guestSpaceId?;
    constructor(client: HttpClient, guestSpaceId?: number | string);
    getFormFields<T extends Properties>(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        properties: T;
        revision: string;
    }>;
    addFormFields(params: {
        app: AppID;
        properties: PropertiesForParameter;
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    updateFormFields(params: {
        app: AppID;
        properties: PropertiesForParameter;
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    deleteFormFields(params: {
        app: AppID;
        fields: string[];
        revision?: Revision;
    }): Promise<object>;
    getFormLayout<T extends Layout>(params: {
        app: AppID;
        preview?: boolean;
    }): Promise<{
        layout: T;
        revision: string;
    }>;
    updateFormLayout(params: {
        app: AppID;
        layout: LayoutForParameter;
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getViews(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        views: {
            [viewName: string]: ViewForResponse;
        };
        revision: string;
    }>;
    updateViews(params: {
        app: AppID;
        views: {
            [viewName: string]: ViewForParameter;
        };
        revision?: Revision;
    }): Promise<{
        views: {
            [viewName: string]: {
                id: string;
            };
        };
        revision: string;
    }>;
    getApp(params: {
        id: AppID;
    }): Promise<App>;
    getApps(params: {
        ids?: AppID[] | null;
        codes?: string[] | null;
        name?: string | null;
        spaceIds?: Array<string | number> | null;
        limit?: string | number;
        offset?: string | number;
    }): Promise<{
        apps: App[];
    }>;
    addApp(params: {
        name: string;
        space?: string | number;
    }): Promise<{
        app: string;
        revision: string;
    }>;
    getAppSettings(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        name: string;
        description: string;
        icon: {
            type: "FILE";
            file: {
                contentType: string;
                fileKey: string;
                name: string;
                size: string;
            };
        } | {
            type: "PRESET";
            key: string;
        };
        theme: "WHITE" | "CLIPBOARD" | "BINDER" | "PENCIL" | "CLIPS" | "RED" | "BLUE" | "GREEN" | "YELLOW" | "BLACK";
        revision: string;
    }>;
    updateAppSettings(params: {
        app: AppID;
        name?: string;
        description?: string;
        icon?: {
            type: "FILE";
            file: {
                fileKey: string;
            };
        } | {
            type: "PRESET";
            key: string;
        };
        theme?: "WHITE" | "CLIPBOARD" | "BINDER" | "PENCIL" | "CLIPS" | "RED" | "BLUE" | "GREEN" | "YELLOW" | "BLACK";
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getProcessManagement(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        enable: boolean;
        states: {
            [statusName: string]: StateForResponse;
        };
        actions: ActionForResponse[];
        revision: string;
    }>;
    updateProcessManagement(params: {
        app: AppID;
        enable?: boolean;
        states?: {
            [statusName: string]: StateForParameter;
        };
        actions?: ActionForParameter[];
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getDeployStatus(params: {
        apps: AppID[];
    }): Promise<{
        apps: Array<{
            app: string;
            status: DeployStatus;
        }>;
    }>;
    deployApp(params: {
        apps: Array<{
            app: AppID;
            revision?: Revision;
        }>;
        revert?: boolean;
    }): Promise<{}>;
    getFieldAcl(params: {
        app: AppID;
        preview?: boolean;
    }): Promise<{
        rights: FieldRightForResponse[];
        revision: string;
    }>;
    updateFieldAcl(params: {
        app: AppID;
        rights: FieldRightForParameter[];
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getAppAcl(params: {
        app: AppID;
        preview?: boolean;
    }): Promise<{
        rights: AppRightEntityForResponse[];
        revision: string;
    }>;
    updateAppAcl(params: {
        app: AppID;
        rights: AppRightEntityForParameter[];
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    evaluateRecordsAcl(params: {
        app: AppID;
        ids: RecordID[];
    }): Promise<{
        rights: EvaluatedRecordRight[];
    }>;
    getRecordAcl(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        rights: RecordRightForResponse[];
        revision: string;
    }>;
    updateRecordAcl(params: {
        app: AppID;
        rights: RecordRightForParameter[];
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getAppCustomize(params: {
        app: AppID;
        preview?: boolean;
    }): Promise<{
        scope: AppCustomizeScope;
        desktop: AppCustomizeForResponse;
        mobile: AppCustomizeForResponse;
        revision: string;
    }>;
    updateAppCustomize(params: {
        app: AppID;
        scope?: AppCustomizeScope;
        desktop?: AppCustomizeForParameter;
        mobile?: AppCustomizeForParameter;
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getGeneralNotifications(params: {
        app: AppID;
        preview?: boolean;
    }): Promise<{
        notifications: GeneralNotificationForResponse[];
        notifyToCommenter: boolean;
        revision: string;
    }>;
    updateGeneralNotifications(params: {
        app: AppID;
        notifications?: GeneralNotificationForParameter[];
        notifyToCommenter?: boolean;
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getPerRecordNotifications(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        notifications: PerRecordNotificationForResponse[];
        revision: string;
    }>;
    updatePerRecordNotifications(params: {
        app: AppID;
        notifications: PerRecordNotificationForParameter[];
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getReminderNotifications(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        notifications: ReminderNotificationForResponse[];
        timezone: string;
        revision: string;
    }>;
    updateReminderNotifications(params: {
        app: AppID;
        notifications?: ReminderNotificationForParameter[];
        timezone?: string;
        revision?: Revision;
    }): Promise<{
        revision: string;
    }>;
    getReports(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        reports: {
            [reportName: string]: ReportForResponse;
        };
        revision: string;
    }>;
    updateReports(params: {
        app: AppID;
        reports: ReportForParameter;
        revision?: Revision;
    }): Promise<{
        revision: string;
        reports: {
            [reportName: string]: {
                id: string;
            };
        };
    }>;
    getAppActions(params: {
        app: AppID;
        lang?: Lang;
        preview?: boolean;
    }): Promise<{
        actions: AppActionsForResponse;
        revision: string;
    }>;
    updateAppActions(params: {
        app: AppID;
        actions: AppActionsForParameter;
        revision?: Revision;
    }): Promise<{
        revision: string;
        actions: {
            [actionName: string]: {
                id: string;
            };
        };
    }>;
    private buildPathWithGuestSpaceId;
}
export {};
