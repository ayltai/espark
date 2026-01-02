import { getDefaultSortOrder, } from '@refinedev/antd';
import { useList, useNavigation, } from '@refinedev/core';
import { Button, Table, Tag, } from 'antd';
import { useTranslation, } from 'react-i18next';

import stringToColour from 'string-to-color';
import type { Device, Notification, Trigger, } from '../data/models';
import { ResourceList, } from './ResourceList';

export const TriggerList = () => {
    const { result : devices, } = useList<Device>({
        resource : 'devices',
    });

    const { result : notifications, } = useList<Notification>({
        resource : 'notifications',
    });

    const { show, } = useNavigation();

    const { t, } = useTranslation();

    return (
        <ResourceList<Trigger>
            resource='triggers'
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
                    <Table.Column<Trigger>
                        dataIndex='name'
                        title={t('labels.trigger.name')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('name', sorters)}
                        render={(value : string, record : Trigger) => {
                            const handleClick = () => show('triggers', record.id!);

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
                    <Table.Column<Trigger>
                        width={250}
                        dataIndex='deviceId'
                        title={t('labels.trigger.deviceId')}
                        render={(value : string) => {
                            const handleClick = () => show('devices', value);

                            return (
                                <Button
                                    style={{
                                        paddingLeft  : 0,
                                        paddingRight : 0,
                                    }}
                                    size='small'
                                    type='link'
                                    onClick={handleClick}>
                                    {devices?.data?.find(device => device.id === value)?.displayName ?? value}
                                </Button>
                            );
                        }} />
                    <Table.Column<Trigger>
                        width={200}
                        dataIndex='dataType'
                        title={t('labels.trigger.dataType')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('dataType', sorters)}
                        render={(value : string) => (
                            <Tag
                                color={stringToColour(value)}
                                variant='solid'>
                                {value}
                            </Tag>
                        )} />
                    <Table.Column<Trigger>
                        width={150}
                        dataIndex='condition'
                        title={t('labels.trigger.condition')} />
                    <Table.Column<Trigger>
                        width={150}
                        dataIndex='value'
                        title={t('labels.trigger.value')} />
                    <Table.Column<Trigger>
                        dataIndex='notificationIds'
                        title={t('labels.trigger.notifications')}
                        render={value => !!value ? value.split(',').map((notificationId : string) => (
                            <Tag key={notificationId}>
                                {notifications?.data?.find(notification => notification.id === Number(notificationId))?.name ?? notificationId}
                            </Tag>
                        )) : ''} />
                </>
            )}
        </ResourceList>
    );
};
