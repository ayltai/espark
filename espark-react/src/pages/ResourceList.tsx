import { DeleteButton, EditButton, List, useTable, } from '@refinedev/antd';
import { type CrudSort, type GetListResponse, type HttpError, useDeleteMany, type useTableProps, } from '@refinedev/core';
import { Button, Space, Table, type TableProps, Typography, } from 'antd';
import { type Key, type ReactNode, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

export const ResourceList = <T extends { id? : number | string, },>({
    resource,
    title,
    mutable = false,
    extraHeaders,
    filterProps,
    sorterProps,
    children,
} : {
    resource      : string,
    title?        : string,
    mutable?      : boolean,
    extraHeaders? : ({
        data,
    } : {
        data? : GetListResponse<T>,
    }) => ReactNode,
    filterProps?  : useTableProps<T, HttpError, T>['filters'],
    sorterProps?  : useTableProps<T, HttpError, T>['sorters'],
    children?     : ({
        isLoading,
        isSuccess,
        sorters,
        data,
    } : {
        isLoading? : boolean,
        isSuccess? : boolean,
        sorters    : CrudSort[],
        data?      : GetListResponse<T>,
    }) => ReactNode,
}) => {
    const [ selectedRowKeys, setSelectedRowKeys, ] = useState<Key[]>([]);

    const { sorters, tableQuery : { data, isLoading, isSuccess, }, tableProps, } = useTable<T>({
        filters          : filterProps,
        sorters          : sorterProps,
        syncWithLocation : true,
    });

    const { mutate, } = useDeleteMany<T, HttpError>();

    const { t, } = useTranslation();

    const rowSelection : TableRowSelection<T> = {
        selectedRowKeys,
        onChange : setSelectedRowKeys,
    };

    const handleDelete = () => {
        mutate({
            resource,
            ids : selectedRowKeys.map(String),
        });

        setSelectedRowKeys([]);
    };

    return (
        <List
            headerButtons={({ defaultButtons, }) => (
                <>
                    {defaultButtons}
                    {mutable && (
                        <Button
                            aria-label={t('actions.delete')}
                            disabled={!selectedRowKeys.length}
                            onClick={handleDelete}>
                            {t('actions.delete')}
                        </Button>
                    )}
                </>
            )}
            title={
                <Typography.Title
                    style={{
                        marginTop    : 0,
                        marginBottom : 0,
                    }}
                    level={4}>
                    {t(title ?? `resources.${resource}`)}
                </Typography.Title>}>
            {extraHeaders?.({
                data,
            })}
            <Table
                {...tableProps}
                size='middle'
                rowKey='id'
                pagination={{
                    ...tableProps.pagination,
                    hideOnSinglePage : true,
                    showSizeChanger  : true,
                }}
                rowSelection={mutable ? rowSelection : undefined}>
                {children?.({
                    sorters,
                    data,
                    isLoading,
                    isSuccess,
                })}
                {mutable && (
                    <Table.Column<T>
                        width={100}
                        minWidth={100}
                        dataIndex='id'
                        title={t('label.columns.actions')}
                        render={id => (
                            <Space>
                                <EditButton
                                    hideText
                                    recordItemId={id} />
                                <DeleteButton
                                    hideText
                                    recordItemId={id} />
                            </Space>
                        )} />
                )}
            </Table>
        </List>
    );
};
