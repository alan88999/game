import {
  DrawerForm,
  ProForm,
  ProFormText,
  ProFormCheckbox,
  ProFormDigit,
} from '@ant-design/pro-components';
import { addPlayer, editPlayer } from '@/services/ant-design-pro/api';
import { FormattedMessage, useModel, useIntl } from '@umijs/max';
import { Form, message } from 'antd';
import React, { useState } from 'react';

export type UpdateFormProps = {
  onCancel: () => void;
  onSuccess: () => Promise<void>;
  open: boolean;
  item: any;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { open, onCancel, onSuccess, item } = props;
  const [form] = Form.useForm<AudioContextLatencyCategory>();
  const [samePrefix, setSamePrefix] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <DrawerForm
      title={<FormattedMessage id="pages.accounts.newAgent" />}
      resize={{
        maxWidth: window.innerWidth * 0.8,
        minWidth: 300,
      }}
      form={form}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          onCancel();
        }
      }}
      initialValues={{
        ...item,
      }}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        let parmas = { ...item, ...values };
        if (item.id) {
          parmas = {
            ...parmas,
            user_id: item.id,
          };
        } else {
          parmas = {
            ...parmas,
            balance: parmas.balance * 1000,
            currency_id: currentUser?.currency_id,
          };
        }
        const res = await (!item.id ? addPlayer : editPlayer)(parmas);
        try {
          if (res.code === 200) {
            message.success('提交成功');
            onSuccess();
            return true;
          } else {
            message.error(res.msg);
            return false;
          }
        } catch (error) {
          return false;
        }
      }}
    >
      <ProFormText
        name="nickname"
        rules={[
          {
            required: true,
          },
        ]}
        placeholder={''}
        width="sm"
        label={intl.formatMessage({
          id: 'pages.accounts.nickName',
        })}
      />
      <ProForm.Group>
        {
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            width={100}
            placeholder={''}
            name="prefix"
            disabled={!!item.id || samePrefix}
            label={intl.formatMessage({
              id: 'pages.accounts.agentCode',
            })}
          />
        }
        {!item.id && currentUser?.prefix ? (
          <ProFormCheckbox
            fieldProps={{
              onChange: (e) => {
                setSamePrefix(e.target.checked);
                form.setFieldValue('prefix', currentUser?.prefix);
              },
            }}
          >
            {<FormattedMessage id="pages.accounts.sameMyAgentCode" />}?
          </ProFormCheckbox>
        ) : (
          ''
        )}
      </ProForm.Group>
      <ProForm.Group>
        <div className="">
          <div>{<FormattedMessage id="pages.accounts.currency" />}</div>
          <div>{item.id ? item.currency_code : currentUser?.currency_code}</div>
        </div>
        {!!item.id ? (
          ''
        ) : (
          <ProFormDigit
            rules={[
              {
                required: true,
              },
            ]}
            disabled={!!item.id}
            width={100}
            placeholder={''}
            name="balance"
            label={intl.formatMessage({
              id: 'pages.accounts.balance',
            })}
          />
        )}
      </ProForm.Group>
      <ProFormText
        width="sm"
        name="phone"
        rules={[
          {
            required: true,
          },
        ]}
        label={<FormattedMessage id="pages.accounts.mobileNumber" />}
        placeholder=""
      />
      <ProFormText
        width="sm"
        name="wechat"
        label={<FormattedMessage id="pages.accounts.wechat" />}
        placeholder=""
      />
      <ProFormText
        width="sm"
        name="whatsapp"
        label={<FormattedMessage id="pages.accounts.whatsApp" />}
        placeholder=""
      />
      <ProFormText
        width="sm"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
        label={intl.formatMessage({
          id: 'pages.accounts.email',
        })}
        placeholder=""
      />
    </DrawerForm>
  );
};

export default UpdateForm;
