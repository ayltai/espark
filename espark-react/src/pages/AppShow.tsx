import { Form, Input, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { AppVersion, } from '../data/models';
import { ResourceShow, } from './ResourceShow';

export const AppShow = () => {
    const { t, } = useTranslation();

    return (
        <ResourceShow<AppVersion> resource='apps'>
            {() => (
                <>
                    <Form.Item<AppVersion>
                        name='id'
                        label={t('labels.apps.appName')}>
                        <Input width='100%' disabled />
                    </Form.Item>
                    <Form.Item<AppVersion>
                        name='version'
                        label={t('labels.apps.appVersion')}>
                        <Input width='100%' disabled />
                    </Form.Item>
                </>
            )}
        </ResourceShow>
    );
};
