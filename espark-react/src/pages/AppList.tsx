import { useNavigation, } from '@refinedev/core';
import { Button, Table, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { AppVersion, } from '../data/models';
import { ResourceList, } from './ResourceList';

export const AppList = () => {
    const { show, } = useNavigation();

    const { t, } = useTranslation();

    return (
        <ResourceList<AppVersion> resource='apps'>
            {() => (
                <>
                    <Table.Column<AppVersion>
                        dataIndex='id'
                        title={t('labels.apps.appName')}
                        render={(value, record) => {
                            const handleClick = () => show('apps', record.id);

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
                    <Table.Column<AppVersion>
                        width={250}
                        dataIndex='version'
                        title={t('labels.apps.appVersion')} />
                </>
            )}
        </ResourceList>
    );
};
