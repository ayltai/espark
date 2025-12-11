import { Form, Input, Select, Typography, } from 'antd';
import { intlFormat, } from 'date-fns';
import { useTranslation, } from 'react-i18next';

import type { Device, } from '../data/models';
import { formatMacAddress, } from '../utils/strings';
import { ResourceShow, } from './ResourceShow';

export const DeviceShow = () => {
    const { t, } = useTranslation();

    return (
        <ResourceShow<Device> resource='devices'>
            {({ data, }) => (
                <>
                    <Form.Item<Device>
                        name='id'
                        label={t('labels.device.id')}
                        getValueProps={value => ({
                            value : formatMacAddress(value),
                        })}>
                        <Input
                            style={{
                                fontFamily : 'monospace',
                            }}
                            disabled
                            width='100%' />
                    </Form.Item>
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
                            disabled
                            mode='tags' />
                    </Form.Item>
                    <Form.Item<Device>
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
                            disabled
                            rows={8} />
                    </Form.Item>
                    <Form.Item<Device>
                        name='lastSeen'
                        label={t('labels.device.lastSeen')}>
                        {data?.data && (
                            <Typography.Text>
                                {intlFormat(data.data.lastSeen, {
                                    dateStyle : 'medium',
                                    timeStyle : 'medium',
                                }, {
                                    locale : navigator.language,
                                })}
                            </Typography.Text>
                        )}
                    </Form.Item>
                </>
            )}
        </ResourceShow>
    );
};
