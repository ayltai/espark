import { useList, } from '@refinedev/core';
import { Form, Input, Tag, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { Device, Notification, Trigger, } from '../data/models';
import { ResourceShow, } from './ResourceShow';

export const TriggerShow = () => {
    const { result : devices, } = useList<Device>({
        resource : 'devices',
    });

    const { result : notifications, } = useList<Notification>({
        resource : 'notifications',
    });

    const { t, } = useTranslation();

    return (
        <ResourceShow<Trigger> resource='triggers'>
            {({ data, }) => (
                <>
                    <Form.Item<Trigger>
                        name='name'
                        label={t('labels.trigger.name')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='deviceId'
                        label={t('labels.trigger.deviceId')}>
                        <Input
                            width='100%'
                            value={data?.data?.deviceId ? devices?.data?.find((device : Device) => device.id === data.data.deviceId)?.displayName : ''} />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='dataType'
                        label={t('labels.trigger.dataType')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='condition'
                        label={t('labels.trigger.condition')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='value'
                        label={t('labels.trigger.value')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Trigger>
                        name='notificationIds'
                        label={t('labels.trigger.notifications')}>
                        {data?.data?.notificationIds ? data.data.notificationIds.split(',').map((notificationId : string) => notifications?.data?.find((notification : Notification) => notification.id === Number(notificationId))).map(notification => notification ? (
                            <Tag key={notification.name}>
                                {notification.name}
                            </Tag>
                        ) : null) : null}
                    </Form.Item>
                </>
            )}
        </ResourceShow>
    );
};
