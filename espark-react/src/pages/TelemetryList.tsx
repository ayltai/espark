import { getDefaultSortOrder, } from '@refinedev/antd';
import { useList, useNavigation, } from '@refinedev/core';
import { Button, Table, Tag, Typography, } from 'antd';
import { intlFormat, } from 'date-fns';
import { useTranslation, } from 'react-i18next';

import stringToColour from 'string-to-color';
import type { Device, Telemetry, } from '../data/models';
import { formatMacAddress, } from '../utils/strings';
import { ResourceList, } from './ResourceList';

export const TelemetryList = ({
    dataTransformer,
} : {
    dataTransformer? : (value : number, dataType : string) => string,
}) => {
    const { result : { data, }, } = useList<Device>({
        resource : 'devices',
    });

    const { show, } = useNavigation();

    const { t, } = useTranslation();

    return (
        <ResourceList<Telemetry>
            resource='telemetry'
            sorterProps={{
                initial : [
                    {
                        field : 'timestamp',
                        order : 'desc',
                    },
                ],
            }}>
            {({ sorters, }) => (
                <>
                    <Table.Column<Telemetry>
                        width={200}
                        dataIndex='deviceId'
                        title={t('labels.telemetry.deviceId')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('deviceId', sorters)}
                        render={value => (
                            <Typography.Text style={{
                                fontFamily : 'monospace',
                            }}>
                                {formatMacAddress(value)}
                            </Typography.Text>
                        )} />
                    <Table.Column<Telemetry>
                        dataIndex='deviceId'
                        title={t('labels.telemetry.deviceDisplayName')}
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
                                    {data?.find(device => device.id === value)?.displayName ?? value}
                                </Button>
                            );
                        }} />
                    <Table.Column<Telemetry>
                        width={200}
                        dataIndex='dataType'
                        title={t('labels.telemetry.dataType')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('dataType', sorters)}
                        render={(value : string) => (
                            <Tag
                                color={stringToColour(value)}
                                variant='solid'>
                                {value}
                            </Tag>
                        )} />
                    <Table.Column<Telemetry>
                        width={150}
                        dataIndex='value'
                        title={t('labels.telemetry.value')}
                        render={(value : number, telemetry : Telemetry) => (
                            <Typography.Text>
                                {dataTransformer ? dataTransformer(value, telemetry.dataType) : (value / 100.0).toFixed(2)}
                            </Typography.Text>)} />
                    <Table.Column<Telemetry>
                        width={200}
                        dataIndex='timestamp'
                        title={t('labels.telemetry.timestamp')}
                        sorter
                        defaultSortOrder={getDefaultSortOrder('timestamp', sorters)}
                        render={value => intlFormat(new Date(value), {
                            dateStyle : 'medium',
                            timeStyle : 'medium',
                        }, {
                            locale : navigator.language,
                        })} />
                </>
            )}
        </ResourceList>
    );
};
