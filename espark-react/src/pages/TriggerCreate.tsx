import { useList, } from '@refinedev/core';
import { Form, Input, Select, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { Device, Notification, Trigger, } from '../data/models';
import { ResourceCreate, } from './ResourceCreate';

export const TriggerCreate = () => {
    const { result : devices, } = useList<Device>({
        resource : 'devices',
    });

    const { result : notifications, } = useList<Notification>({
        resource : 'notifications',
    });

    const { t, } = useTranslation();

    return (
        <ResourceCreate<Trigger> resource='triggers'>
            {() => (
                <>
                    <Form.Item<Trigger>
                        name='name'
                        label={t('labels.trigger.name')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='deviceId'
                        label={t('labels.trigger.deviceId')}>
                        <Select
                            allowClear
                            options={
                                devices?.data.map((device : Device) => ({
                                    label : device.displayName,
                                    value : device.id,
                                })) ?? []
                            } />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='dataType'
                        label={t('labels.trigger.dataType')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='condition'
                        label={t('labels.trigger.condition')}>
                        <Select
                            allowClear
                            options={[
                                {
                                    label : '==',
                                    value : '==',
                                }, {
                                    label : '<',
                                    value : '<',
                                }, {
                                    label : '<=',
                                    value : '<=',
                                }, {
                                    label : '>',
                                    value : '>',
                                }, {
                                    label : '>=',
                                    value : '>=',
                                },
                            ]} />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='value'
                        label={t('labels.trigger.value')}>
                        <Input
                            width='100%'
                            type='number' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='notificationIds'
                        label={t('labels.trigger.notifications')}
                        getValueProps={(value? : string) => ({
                            value : value ? value.split(',').map(notificationId => Number(notificationId)).map(notificationId => notifications?.data?.find(notification => notification.id === notificationId)?.name) : [],
                        })}
                        normalize={(value? : string | string[]) => value && Array.isArray(value) ? value.map(notificationName => notifications?.data?.find(notification => notification.name === notificationName)).map(notification => notification?.id).join(',') : value}>
                        <Select
                            allowClear
                            options={
                                notifications?.data.map((notification : Notification) => ({
                                    label : notification.name,
                                    value : String(notification.id),
                                })) ?? []
                            } />
                    </Form.Item>
                </>
            )}
        </ResourceCreate>
    );
};
