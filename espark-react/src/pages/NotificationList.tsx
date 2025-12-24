import { useNavigation, } from '@refinedev/core';
import { Button, Table, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { Notification, } from '../data/models';
import { ResourceList, } from './ResourceList';

export const NotificationList = () => {
    const { show, } = useNavigation();

    const { t, } = useTranslation();

    return (
        <ResourceList<Notification> resource='notifications'>
            {() => (
                <>
                    <Table.Column<Notification>
                        dataIndex='name'
                        title={t('labels.notification.name')}
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
                        title={t('labels.notification.provider')} />
                </>
            )}
        </ResourceList>
    );
};
