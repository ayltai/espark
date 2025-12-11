import { Form, Input, Select, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { Device, } from '../data/models';
import { ResourceEdit, } from './ResourceEdit';

export const DeviceEdit = () => {
    const { t, } = useTranslation();

    return (
        <ResourceEdit<Device> resource='devices'>
            {() => (
                <>
                    <Form.Item<Device>
                        name='displayName'
                        label={t('labels.device.displayName')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Device>
                        name='appName'
                        label={t('labels.device.appName')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Device>
                        name='appVersion'
                        label={t('labels.device.appVersion')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<Device>
                        name='capabilities'
                        label={t('labels.device.capabilities')}
                        tooltip={t('labels.device.capabilities.tip')}
                        normalize={value => Array.isArray(value) ? value.filter(item => item && item.length > 0).join(',') : value}
                        getValueProps={value => ({
                            value : typeof value === 'string' && value ? value.split(',').filter(item => item && item.length > 0) : value,
                        })}>
                        <Select
                            allowClear
                            mode='tags' />
                    </Form.Item>
                    <Form.Item<Device>
                        validateDebounce={250}
                        name='parameters'
                        label={t('labels.device.parameters')}
                        tooltip={t('labels.device.parameters.tip')}
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
                                        field : t('labels.device.parameters'),
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
        </ResourceEdit>
    );
};
