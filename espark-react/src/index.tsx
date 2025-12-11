import { useEffect, useState, } from 'react';

import { MainApp, } from './App';
import { apply, } from './i18n';
import en from './i18n/en.json';
import type { AppProps, } from './data/models';
import { handleError, } from './utils';

export const EsparkApp = ({
    themeConfig,
    title,
    telemetryDataTransformer,
    userResources = [],
    userRoutes    = [],
    apiEndpoint,
} : AppProps) => {
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
export { DeviceEdit, DeviceList, DeviceShow, ResourceEdit, ResourceShow, ResourceList, TelemetryList, } from './pages';
export { camelCaseToSnakeCase, capitaliseFirstLetter, formatMacAddress, snakeCaseToCamelCase, } from './utils/strings';
