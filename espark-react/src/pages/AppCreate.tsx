import { Form, Input, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { AppVersion, } from '../data/models';
import { ResourceCreate, } from './ResourceCreate';

export const AppCreate = () => {
    const { t, } = useTranslation();

    return (
        <ResourceCreate<AppVersion> resource='apps'>
            {() => (
                <>
                    <Form.Item<AppVersion>
                        name='id'
                        label={t('labels.app.appName')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<AppVersion>
                        name='version'
                        label={t('labels.app.appVersion')}>
                        <Input width='100%' />
                    </Form.Item>
                </>
            )}
        </ResourceCreate>
    );
};
