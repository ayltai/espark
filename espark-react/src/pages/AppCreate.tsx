import { UploadOutlined, } from '@ant-design/icons';
import { useApiUrl, } from '@refinedev/core';
import { Form, FormInstance, Input, Typography, Upload, } from 'antd';
import { useTranslation, } from 'react-i18next';

import type { AppVersion, } from '../data/models';
import { ResourceCreate, } from './ResourceCreate';

const AppForm = ({
    form,
} : {
    form : FormInstance,
}) => {
    const appName    = Form.useWatch<string>('id', form);
    const appVersion = Form.useWatch<string>('version', form);

    const apiUrl = useApiUrl();

    const { t, } = useTranslation();

    return (
        <>
            <Form.Item<AppVersion>
                name='id'
                label={t('labels.app.appName')}
                rules={[
                    {
                        required : true,
                        message  : t('errors.required', {
                            field : t('labels.app.appName'),
                        }),
                    },
                ]}>
                <Input width='100%' />
            </Form.Item>
            <Form.Item<AppVersion>
                name='version'
                label={t('labels.app.appVersion')}
                rules={[
                    {
                        required : true,
                        message  : t('errors.required', {
                            field : t('labels.app.appVersion'),
                        }),
                    },
                ]}>
                <Input width='100%' />
            </Form.Item>
            <div style={{
                display        : 'flex',
                justifyContent : 'center',
            }}>
                <Upload.Dragger
                    style={{
                        flex : 0.6,
                    }}
                    disabled={!appName || !appVersion}
                    name='file'
                    accept='.zip'
                    action={`${apiUrl}/apps/upload/${appName}/${appVersion}`}>
                    <p>
                        <UploadOutlined />
                    </p>
                    <p>
                        <Typography.Text>
                            {t('labels.app.upload')}
                        </Typography.Text>
                    </p>
                </Upload.Dragger>
            </div>
        </>
    );
};

export const AppCreate = () => (
    <ResourceCreate<AppVersion> resource='apps'>
        {({ form, }) => <AppForm form={form} />}
    </ResourceCreate>
);
