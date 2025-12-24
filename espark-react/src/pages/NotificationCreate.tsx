import { Form, Input, Select, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { Notification, } from '../data/models';
import { ResourceCreate, } from './ResourceCreate';

export const NotificationCreate = () => {
    const { t, } = useTranslation();

    return (
        <ResourceCreate<Notification> resource='notifications'>
            {() => (
                <>
                    <Form.Item<Notification>
                        name='name'
                        label={t('labels.notification.name')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Notification>
                        name='provider'
                        label={t('labels.notification.provider')}>
                        <Select
                            allowClear
                            options={[
                                {
                                    label : 'Slack',
                                    value : 'Slack',
                                },
                            ]} />
                    </Form.Item>
                    <Form.Item<Notification>
                        name='config'
                        label={t('labels.notification.config')}
                        validateDebounce={250}
                        normalize={value => {
                            if (!value) return value;

                            try {
                                return JSON.parse(value);
                            } catch {
                                return value;
                            }
                        }}
                        getValueProps={value => {
                            if (!value) return {
                                value,
                            };

                            if (typeof value !== 'object') return {
                                value,
                            };

                            try {
                                return {
                                    value : JSON.stringify(value),
                                };
                            } catch {
                                return {
                                    value,
                                };
                            }
                        }}
                        rules={[
                            {
                                validator : (_, value) => {
                                    if (!value) return Promise.resolve();

                                    if (typeof value === 'object') return Promise.resolve();

                                    return Promise.reject(new Error(t('errors.invalidFormat', {
                                        field : t('labels.notification.config'),
                                    })));
                                },
                            },
                        ]}>
                        <Input.TextArea
                            style={{
                                fontFamily : 'monospace',
                            }}
                            rows={8} />
                    </Form.Item>
                </>
            )}
        </ResourceCreate>
    );
};
