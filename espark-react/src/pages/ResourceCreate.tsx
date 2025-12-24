import { Create, useForm, } from '@refinedev/antd';
import { Form, type FormInstance, Typography, } from 'antd';
import type { ReactNode, } from 'react';
import { useTranslation, } from 'react-i18next';

export const ResourceCreate = <T extends { id? : number | string, },>({
    resource,
    children,
} : {
    resource  : string,
    children? : ({
        form,
    } : {
        form : FormInstance,
    }) => ReactNode,
}) => {
    const { form, formProps, saveButtonProps, } = useForm<T>({
        redirect : 'show',
    });

    const { t, } = useTranslation();

    return (
        <Create
            saveButtonProps={saveButtonProps}
            title={
                <Typography.Title
                    style={{
                        marginTop    : 0,
                        marginBottom : 0,
                    }}
                    level={4}>
                    {t(`resources.${resource}.create`)}
                </Typography.Title>}>
            <Form
                {...formProps}
                requiredMark
                scrollToFirstError
                labelCol={{
                    span : 8,
                }}
                wrapperCol={{
                    span : 16,
                }}
                form={form}>
                {children?.({
                    form,
                })}
            </Form>
        </Create>
    );
};
