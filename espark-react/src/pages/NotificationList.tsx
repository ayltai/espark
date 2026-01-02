import { getDefaultSortOrder, } from '@refinedev/antd';
import { useNavigation, } from '@refinedev/core';
import { Button, Table, } from 'antd';

import { useTranslation, } from 'react-i18next';
import type { Notification, } from '../data/models';
import { ResourceList, } from './ResourceList';

export const NotificationList = () => {
    const { show, } = useNavigation();

    const { t, } = useTranslation();

    return (
        <ResourceList<Notification>
            resource='notifications'
            sorterProps={{
                initial : [
                    {
                        field : 'name',
                        order : 'asc',
                    },
                ],
            }}>
            {({ sorters, }) => (
                <>
                    <Table.Column<Notification>
                        dataIndex='name'
                        title={t('labels.notification.name')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('name', sorters)}
                        render={(value : string, record : Notification) => {
                            const handleClick = () => show('notifications', record.id!);

                            return (
                                <Button
                                    style={{
                                        paddingLeft  : 0,
                                        paddingRight : 0,
                                    }}
                                    size='small'
                                    type='link'
                                    onClick={handleClick}>
                                    {value}
                                </Button>
                            );
                        }} />
                    <Table.Column<Notification>
                        width={250}
                        dataIndex='provider'
                        title={t('labels.notification.provider')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('provider', sorters)} />
                </>
            )}
        </ResourceList>
    );
};
