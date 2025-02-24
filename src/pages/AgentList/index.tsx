import { getPlayerList } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import UpdateForm from './components/UpdateForm';
import TransferForm from './components/transferFrom';

const TableList: React.FC = () => {
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>({});
  const [transferType, setTransferType] = useState(1);
  const [transferOpen, setTransferOpen] = useState(false);

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
      render: (dom) => {
        return (
          <div>
            {
              <FormattedMessage
                id={`pages.accounts.status${dom ? 'Enabled' : 'Disabled'}Up`}
                defaultMessage=""
              />
            }
          </div>
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
          <FormattedMessage id="pages.accounts.status1" defaultMessage="存款" />
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            setTransferOpen(true);
            setTransferType(2);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.accounts.status2" defaultMessage="取款" />
        </a>,
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.accounts.status2" defaultMessage="编辑" />
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
        request={(val: any) => {
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

          return getPlayerList(params);
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
    </PageContainer>
  );
};

export default TableList;
