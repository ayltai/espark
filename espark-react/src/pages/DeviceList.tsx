import { CloseCircleFilled, CheckCircleFilled, } from '@ant-design/icons';
import { useNavigation, } from '@refinedev/core';
import { Button, Space, Table, Tag, Tooltip, Typography, } from 'antd';
import { formatDistanceToNow, intlFormat, } from 'date-fns';
import { useTranslation, } from 'react-i18next';
import stringToColour from 'string-to-color';

import type { Device, } from '../data/models';
import { capitaliseFirstLetter, formatMacAddress, } from '../utils/strings';
import { ResourceList, } from './ResourceList';

export const DeviceList = () => {
    const { show, } = useNavigation();

    const { t, } = useTranslation();

    return (
        <ResourceList<Device> resource='devices'>
            {() => (
                <>
                    <Table.Column<Device>
                        width={100}
                        dataIndex='lastSeen'
                        title={t('labels.device.status')}
                        align='center'
                        render={(value : string) => new Date().getTime() - new Date(value).getTime() > 2 * 24 * 60 * 60 * 1000 ? (
                            <CloseCircleFilled style={{
                                fontSize : 16,
                                color    : '#f44336',
                            }} />
                        ) : new Date().getTime() - new Date(value).getTime() > 24 * 60 * 60 * 1000 ? (
                            <CheckCircleFilled style={{
                                fontSize : 16,
                                color    : '#ffeb3b',
                            }} />
                        ) : (
                            <CheckCircleFilled style={{
                                fontSize : 16,
                                color    : '#4caf50',
                            }} />
                        )} />
                    <Table.Column<Device>
                        width={200}
                        dataIndex='id'
                        title={t('labels.device.id')}
                        render={(value) => (
                            <Typography.Text style={{
                                fontFamily : 'monospace',
                            }}>
                                {formatMacAddress(value)}
                            </Typography.Text>
                        )} />
                    <Table.Column<Device>
                        dataIndex='displayName'
                        title={t('labels.device.displayName')}
                        render={(value, record) => {
                            const handleClick = () => show('devices', record.id);

                            return (
                                <Button
                                    style={{
                                        paddingLeft  : 0,
                                        paddingRight : 0,
                                    }}
                                    size='small'
                                    type='link'
                                    onClick={handleClick}>
                                    {value ?? t('placeholders.notSet')}
                                </Button>
                            );
                        }} />
                    <Table.Column<Device>
                        width={200}
                        dataIndex='appName'
                        title={t('labels.device.appName')} />
                    <Table.Column<Device>
                        width={200}
                        dataIndex='appVersion'
                        title={t('labels.device.appVersion')} />
                    <Table.Column<Device>
                        width={200}
                        dataIndex='capabilities'
                        title={t('labels.device.capabilities')}
                        render={(value : string) => value ? (
                            <Space>
                                {value.split(',').map(capability => (
                                    <Tag
                                        key={capability}
                                        color={stringToColour(capability)}
                                        variant='solid'>
                                        {capability}
                                    </Tag>
                                ))}
                            </Space>
                        ) : '-'} />
                    <Table.Column<Device>
                        width={200}
                        dataIndex='lastSeen'
                        title={t('labels.device.lastSeen')}
                        render={(value : string) => (
                            <Tooltip title={
                                intlFormat(value, {
                                    dateStyle : 'medium',
                                    timeStyle : 'medium',
                                }, {
                                    locale : navigator.language,
                                })}>
                                <Typography.Text style={{
                                    cursor : 'default',
                                }}>
                                    {capitaliseFirstLetter(formatDistanceToNow(new Date(value), {
                                        addSuffix : true,
                                    }))}
                                </Typography.Text>
                            </Tooltip>
                        )} />
                </>
            )}
        </ResourceList>
    );
};
