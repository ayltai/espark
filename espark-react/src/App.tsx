import { ThemedLayout, useNotificationProvider, } from '@refinedev/antd';
import { type I18nProvider, Refine, type ResourceProps, } from '@refinedev/core';
import routerProvider from '@refinedev/react-router';
import { App, ConfigProvider, type ThemeConfig, } from 'antd';
import { type ReactNode, } from 'react';
import { useTranslation, } from 'react-i18next';
import { createHashRouter, Navigate, Outlet, type RouteObject, RouterProvider, } from 'react-router';

import { createDataProvider, } from './data';
import { resources, routes, } from './routes';

const MainLayout = () => (
    <ThemedLayout
        Header={() => null}
        Footer={() => null}>
        <Outlet />
    </ThemedLayout>
);

export const MainApp = ({
    themeConfig,
    title,
    userResources = [],
    userRoutes    = [],
    apiEndpoint,
} : {
    themeConfig?  : ThemeConfig,
    title?        : {
        icon? : ReactNode,
        text? : ReactNode,
    },
    userResources? : ResourceProps[],
    userRoutes?    : RouteObject[],
    apiEndpoint    : string,
}) => {
    const RefineProvider = () => {
        const { i18n, t, } = useTranslation();

        const i18nProvider: I18nProvider = {
            changeLocale : locale => i18n.changeLanguage(locale),
            getLocale    : () => i18n.language,
            translate    : (key, options : Record<string, unknown>, defaultMessage) => defaultMessage ? t(key, defaultMessage, options) : t(key, options),
        };

        return (
            <Refine
                dataProvider={createDataProvider(apiEndpoint)}
                i18nProvider={i18nProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                options={{
                    disableTelemetry : true,
                    title,
                }}
                resources={[
                    ...resources.map(resource => ({
                        ...resource,
                        meta : {
                            ...resource.meta,
                            label : t(resource.meta.label),
                        },
                    })),
                    ...userResources,
                ]}>
                <Outlet />
            </Refine>
        );
    };

    const router = createHashRouter([
        {
            path    : '/',
            index   : true,
            element : (
                <Navigate
                    replace
                    to='/devices' />
            ),
        }, {
            Component : RefineProvider,
            children  : [
                {
                    Component : MainLayout,
                    children  : routes,
                },
            ],
        }, {
            path    : '*',
            element : <Navigate to='/' />,
        },
        ...userRoutes,
    ]);

    return (
        <ConfigProvider theme={themeConfig}>
            <App>
                <RouterProvider router={router} />
            </App>
        </ConfigProvider>
    );
};
