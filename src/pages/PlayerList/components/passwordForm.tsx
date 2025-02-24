import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { changePassword } from '@/services/ant-design-pro/api';
import { FormattedMessage } from '@umijs/max';
import { Form, message } from 'antd';
import React from 'react';
import { createStyles } from 'antd-style';
import lessStyles from './index.less';

const useStyles = createStyles(() => {
  return {
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      height: 100,
      marginBottom: 8,
    },
    accountType: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 4,
    },
    nameContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #1890ff',
      borderRadius: 4,
      marginBottom: 4,
    },
    nameCode: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1890ff',
      color: '#fff',
      padding: '3px 4px',
    },
    nameText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1890ff',
      padding: '3px 4px',
    },
    desc: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 16,
    },
  };
});

export type PasswordFormProps = {
  onCancel: () => void;
  onSuccess: () => Promise<void>;
  open: boolean;
  item: any;
};

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  const { open, onCancel, onSuccess, item } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm<any>();
  return (
    <ModalForm
      form={form}
      open={open}
      width={350}
      modalProps={{
        destroyOnClose: true,
      }}
      onOpenChange={(val) => {
        if (!val) {
          onCancel();
        }
      }}
      autoFocusFirstInput
      onFinish={async (values) => {
        let parmas = {
          ...values,
          user_id: item.id,
        };
        const res = await changePassword(parmas);
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
      <div className={styles.header}>
        {/* <img className={styles.avatar} /> */}
        <div className={styles.accountType}>
          <FormattedMessage id="pages.accounts.player" />
        </div>
        <div className={styles.nameContainer}>
          {item?.prefix ? <div className={styles.nameCode}>{item?.prefix}</div> : ''}
          <div className={styles.nameText}>{item?.username}</div>
        </div>
        <div className={styles.desc}>
          <FormattedMessage id={'pages.accounts.passwordDesc'} />
        </div>
      </div>

      <ProFormText.Password
        formItemProps={{
          className: lessStyles.centerItem,
        }}
        width="sm"
        name="password"
        rules={[{ required: true }]}
        label={<FormattedMessage id="pages.accounts.newPassword" />}
      />
      <ProFormText.Password
        formItemProps={{
          className: lessStyles.centerItem,
        }}
        width="sm"
        name="confirmPassword"
        rules={[{ required: true }]}
        label={<FormattedMessage id="pages.accounts.confirmPassword" />}
      />
    </ModalForm>
  );
};

export default PasswordForm;
