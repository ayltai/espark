import type { DataProvider, } from '@refinedev/core';

import { camelCaseToSnakeCase, snakeCaseToCamelCase, } from '../utils/strings';

export const createDataProvider = (apiEndpoint : string) : DataProvider => ({
    getApiUrl : () => apiEndpoint,
    getList   : async ({ resource, pagination, sorters, }) => {
        const query = new URLSearchParams();

        if (pagination && pagination.mode !== 'client' && pagination.mode !== 'off') {
            if (pagination.pageSize) {
                query.append('limit', pagination.pageSize.toString());
                if (pagination.currentPage) query.append('offset', ((pagination.currentPage - 1) * pagination.pageSize).toString());
            }

            if (sorters) query.append('order_by', sorters.map(sorter => `${sorter.field.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g,'$1_').toLowerCase()} ${sorter.order}`).join(','));
        }

        const response = await fetch(`${apiEndpoint}/${resource}${resource === 'devices' ? '/all' : ''}${query.size ? `?${camelCaseToSnakeCase(query.toString())}` : ''}`);

        if (response.ok) {
            const data = await response.json();

            return {
                data  : data.map((item : any) => snakeCaseToCamelCase(item)),
                total : parseInt(response.headers.get('X-Total-Count') ?? data.length, 10),
            };
        }

        throw response;
    },
    // @ts-ignore
    getOne    : async ({ resource, id, }) => {
        const response = await fetch(`${apiEndpoint}/${resource}/${id}`);

        if (response.ok) return {
            data : snakeCaseToCamelCase(await response.json()),
        };

        throw response;
    },
    // @ts-ignore
    create    : async ({ resource, variables, meta, }) => {
        const response = await fetch(`${apiEndpoint}/${resource}`, {
            method  : meta?.method ?? 'POST',
            headers : {
                'Content-Type' : 'application/json',
                ...(meta?.headers ?? {}),
            },
            // @ts-ignore
            body    : JSON.stringify(camelCaseToSnakeCase(variables)),
        });

        if (response.status === 201) return {
            data : snakeCaseToCamelCase(await response.json()),
        };

        throw response;
    },
    // @ts-ignore
    update    : async ({ resource, id, variables, meta, }) => {
        const response = await fetch(`${apiEndpoint}/${resource}/${id}`, {
            method  : meta?.method ?? 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                ...(meta?.headers ?? {}),
            },
            // @ts-ignore
            body    : JSON.stringify(camelCaseToSnakeCase(variables)),
        });

        if (response.ok) return {
            data : snakeCaseToCamelCase(await response.json()),
        };

        throw response;
    },
    // @ts-ignore
    deleteOne : async ({ resource, id, meta, }) => {
        const response = await fetch(`${apiEndpoint}/${resource}/${id}`, {
            method : meta?.method ?? 'DELETE',
        });

        if (response.ok || response.status === 204) return {
            data : snakeCaseToCamelCase(await response.json()),
        };

        throw response;
    },
});
