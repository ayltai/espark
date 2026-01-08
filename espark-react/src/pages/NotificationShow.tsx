import { Form, Input, Select, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { Notification, } from '../data/models';
import { ResourceShow, } from './ResourceShow';

export const NotificationShow = () => {
    const { t, } = useTranslation();

    return (
        <ResourceShow<Notification>
            mutable
            resource='notifications'>
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
                        <Select options={[
                            {
                                label : 'Slack',
                                value : 'Slack',
                            },
                        ]} />
                    </Form.Item>
                    <Form.Item<Notification>
                        name='config'
                        label={t('labels.notification.config')}
                        tooltip={t('labels.notification.config.tip')}
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
                                    value : JSON.stringify(value, null, 2),
                                };
                            } catch {
                                return {
                                    value,
                                };
                            }
                        }}>
                        <Input.TextArea
                            style={{
                                fontFamily : 'monospace',
                            }}
                            autoSize={{
                                minRows : 5,
                                maxRows : 15,
                            }} />
                    </Form.Item>
                </>
            )}
        </ResourceShow>
    );
};
