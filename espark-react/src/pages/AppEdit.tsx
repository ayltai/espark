import { Form, Input, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { AppVersion, } from '../data/models';
import { ResourceEdit, } from './ResourceEdit';

export const AppEdit = () => {
    const { t, } = useTranslation();

    return (
        <ResourceEdit<AppVersion> resource='apps'>
            {() => (
                <>
                    <Form.Item<AppVersion>
                        name='id'
                        label={t('labels.apps.appName')}>
                        <Input width='100%' />
                    </Form.Item>
                    <Form.Item<AppVersion>
                        name='version'
                        label={t('labels.apps.appVersion')}>
                        <Input width='100%' />
                    </Form.Item>
                </>
            )}
        </ResourceEdit>
    );
};
