import { getPlayerList, changeStatus } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Modal, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import UpdateForm from './components/UpdateForm';
import TransferForm from './components/transferFrom';
import PasswordForm from './components/passwordForm';

const PlayerList: React.FC = () => {
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>({});
  const [transferType, setTransferType] = useState(1);
  const [transferOpen, setTransferOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const intl = useIntl();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.accounts.registerFrom" defaultMessage="Registered From" />,
      valueType: 'date',
      dataIndex: 'start_at',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.accounts.registerTo" defaultMessage="Registered To" />,
      valueType: 'date',
      dataIndex: 'end_at',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.accounts.player" defaultMessage="Player" />,
      dataIndex: 'username',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.player" defaultMessage="Player" />,
      dataIndex: 'username',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.nickName" defaultMessage="NickName" />,
      dataIndex: 'nickname',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.currency" defaultMessage="Currency" />,
      dataIndex: 'currency_code',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.agentBalance" defaultMessage="Agent Balance" />,
      dataIndex: 'agent_balance',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.gameBalance" defaultMessage="Game Balance" />,
      dataIndex: 'game_balance',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.accounts.balanceUpdate" defaultMessage="Balance Update AT" />
      ),
      dataIndex: 'balance_updated_at',
      search: false,
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage id="pages.accounts.lastActivity" defaultMessage="Last Activity AT" />
      ),
      dataIndex: 'updated_at',
      search: false,
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.accounts.status" defaultMessage="Status" />,
      dataIndex: 'status',
      search: false,
      render: (dom, item) => {
        return (
          <Switch
            checked={dom === 1}
            onChange={() => {
              Modal.confirm({
                title: (
                  <>
                    {intl.formatMessage({
                      id: `pages.accounts.${dom === 1 ? 'disable' : 'enable'}Confirm`,
                    })}
                  </>
                ),
                content: (
                  <>
                    {intl.formatMessage({
                      id: `pages.accounts.${dom === 1 ? 'disable' : 'enable'}ConfirmText`,
                    })}

                    <span
                      style={{
                        fontWeight: 'bold',
                        color: '#1890ff',
                      }}
                    >
                      {item.username}
                    </span>
                  </>
                ),
                onOk: async () => {
                  changeStatus({
                    status: dom === 1 ? 2 : 1,
                    user_id: item.id,
                  }).then(() => {
                    actionRef.current?.reload();
                  });
                },
              });
            }}
            checkedChildren={
              <FormattedMessage id={'pages.accounts.statusEnabledUp'} defaultMessage="" />
            }
            unCheckedChildren={
              <FormattedMessage id={'pages.accounts.statusDisabledUp'} defaultMessage="" />
            }
          ></Switch>
        );
      },
    },

    {
      title: '',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setTransferOpen(true);
            setTransferType(1);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.accounts.deposit" defaultMessage="Deposit" />
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            setTransferOpen(true);
            setTransferType(2);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.accounts.withdraw" defaultMessage="Withdraw" />
        </a>,
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.accounts.eit" defaultMessage="Edit" />
        </a>,
        <a
          key="password"
          onClick={() => {
            setPasswordOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.accounts.password" defaultMessage="Password" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={''}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleUpdateModalOpen(true);
              setCurrentRow({});
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (val: any) => {
          let params: any = {
            page: val.current - 1,
            size: val.pageSize,
          };
          if (val.start_at) {
            params.start_at = dayjs(val.start_at).startOf('day').valueOf();
          }
          if (val.end_at) {
            params.end_at = dayjs(val.end_at).startOf('day').valueOf();
          }
          const res = await getPlayerList(params);
          const { data } = res;
          return {
            data: data?.list,
            total: data?.downline_count,
            success: true,
          };
        }}
        columns={columns}
      />

      <UpdateForm
        onSuccess={async () => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          setCurrentRow({});
        }}
        open={updateModalOpen}
        item={currentRow || {}}
      />
      <TransferForm
        transferType={transferType}
        onSuccess={async () => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          setTransferOpen(false);
          setCurrentRow({});
        }}
        open={transferOpen}
        item={currentRow || {}}
      />
      <PasswordForm
        onSuccess={async () => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          setPasswordOpen(false);
          setCurrentRow({});
        }}
        open={passwordOpen}
        item={currentRow || {}}
      />
    </PageContainer>
  );
};

export default PlayerList;
