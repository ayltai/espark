import type { ResourceProps, } from '@refinedev/core';
import type { ThemeConfig, } from 'antd';
import { type ReactNode, useEffect, useState, } from 'react';
import type { RouteObject, } from 'react-router';

import { MainApp, } from './App';
import { apply, } from './i18n';
import en from './i18n/en.json';
import { handleError, } from './utils';

export const EsparkApp = ({
    themeConfig,
    title,
    telemetryDataTransformer,
    userResources = [],
    userRoutes    = [],
    apiEndpoint,
} : {
    themeConfig?              : ThemeConfig,
    title?                    : {
        icon? : ReactNode,
        text? : ReactNode,
    },
    telemetryDataTransformer? : (value : number, dataType : string) => string,
    userResources?            : ResourceProps[],
    userRoutes?               : RouteObject[],
    apiEndpoint               : string,
}) => {
    const [ i18nInitialized, setI18nInitialized, ] = useState(false);

    useEffect(() => {
        apply({
            language           : navigator.language.substring(0, 2),
            supportedLanguages : [
                'en',
            ],
            fallbackLanguage   : 'en',
            resources          : {
                en : {
                    translation : en,
                },
            },
        }).then(() => setI18nInitialized(true)).catch(handleError);
    }, []);

    if (i18nInitialized) return (
        <MainApp
            title={title}
            themeConfig={themeConfig}
            telemetryDataTransformer={telemetryDataTransformer}
            userResources={userResources}
            userRoutes={userRoutes}
            apiEndpoint={apiEndpoint} />
    );

    return null;
};

export type { Device, Telemetry, } from './data/models';
export { createDataProvider, } from './data';
export { DeviceEdit, DeviceList, DeviceShow, NotificationCreate, NotificationEdit, NotificationList, NotificationShow, ResourceCreate, ResourceEdit, ResourceShow, ResourceList, TelemetryList, TriggerCreate, TriggerEdit, TriggerList, TriggerShow, } from './pages';
export { camelCaseToSnakeCase, capitaliseFirstLetter, formatMacAddress, snakeCaseToCamelCase, } from './utils/strings';
