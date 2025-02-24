import { getPoints } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import dayjs from 'dayjs';
import React, { useRef } from 'react';

const Points: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.accounts.from" defaultMessage="From" />,
      valueType: 'date',
      dataIndex: 'start',
      initialValue: dayjs(new Date()),
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.accounts.to" defaultMessage="To" />,
      valueType: 'date',
      dataIndex: 'end',
      initialValue: dayjs(new Date()),
      hideInTable: true,
    },

    {
      title: <FormattedMessage id="pages.accounts.username" defaultMessage="Username" />,
      dataIndex: 'username',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.accounts.transactionId" defaultMessage="" />,
      dataIndex: 'id',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.senderBefore" defaultMessage="" />,
      dataIndex: 'sender_before_amount',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.senderAfter" defaultMessage="" />,
      dataIndex: 'sender_after_amount',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.sender" defaultMessage="" />,
      dataIndex: 'sender_username',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.type" defaultMessage="" />,
      dataIndex: 'transfer_type',
      search: false,
      render: (dom) => {
        return (
          <FormattedMessage
            id={`pages.accounts.fund${dom === 1 ? 'In' : 'Out'}`}
            defaultMessage=""
          />
        );
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.receiver" defaultMessage="" />,
      dataIndex: 'receiver_username',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.receiverBefore" defaultMessage="" />,
      dataIndex: 'receiver_before_amount',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.receiverAfter" defaultMessage="" />,
      dataIndex: 'receiver_after_amount',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.amount" defaultMessage="" />,
      dataIndex: 'amount',
      search: false,
      render: (dom) => {
        return Number(dom) / 1000;
      },
    },
    {
      title: <FormattedMessage id="pages.accounts.transferDate" defaultMessage="" />,
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.remarks" defaultMessage="" />,
      dataIndex: 'remarks',
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<any, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        options={false}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={(val: any) => {
          let params: any = {
            page: val.current - 1,
            size: val.pageSize,
          };
          if (val.username) {
            params.username = val.username;
          }
          if (val.start) {
            params.start = dayjs(val.start).startOf('day').valueOf();
          }
          if (val.end) {
            params.end = dayjs(val.end).startOf('day').valueOf();
          }

          return getPoints(params);
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Points;
