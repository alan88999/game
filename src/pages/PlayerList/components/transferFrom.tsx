import { ModalForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { transfer } from '@/services/ant-design-pro/api';
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
    dividerBorder: {
      width: '100%',
      height: 1,
      margin: '16px 0',
      background: '#d9d9d9',
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

export type TransferFormProps = {
  onCancel: () => void;
  onSuccess: () => Promise<void>;
  open: boolean;
  transferType: number;
  item: any;
};

const TransferForm: React.FC<TransferFormProps> = (props) => {
  const { open, onCancel, onSuccess, item, transferType } = props;
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
          type: Number(values.type),
          amount: Number(values.amount) * 1000,
          user_id: item?.id,
          transfer_type: transferType,
        };
        const res = await transfer(parmas);
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
        <div className={styles.dividerBorder} />
        <div className={styles.desc}>
          <FormattedMessage id={`pages.accounts.pointsDesc${transferType === 2 ? 'Out' : 'In'}`} />
        </div>
      </div>
      <ProFormSelect
        formItemProps={{
          className: lessStyles.centerItem,
        }}
        width="sm"
        name="type"
        label={<FormattedMessage id="pages.accounts.wallet" />}
        valueEnum={{
          1: <FormattedMessage id="pages.accounts.playerWallet" />,
          2: <FormattedMessage id="pages.accounts.agentWallet" />,
        }}
        rules={[{ required: true, message: <FormattedMessage id="pages.accounts.walletError" /> }]}
      />
      <ProFormDigit
        formItemProps={{
          className: lessStyles.centerItem,
        }}
        width="sm"
        name="amount"
        rules={[{ required: true, message: <FormattedMessage id="pages.accounts.amountError" /> }]}
        label={<FormattedMessage id="pages.accounts.points" />}
        placeholder="0.00"
      />
    </ModalForm>
  );
};

export default TransferForm;
