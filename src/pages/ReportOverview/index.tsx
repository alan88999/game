import { getReportOverview, getGameList } from '@/services/ant-design-pro/api';
import { createStyles } from 'antd-style';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ProCard } from '@ant-design/pro-components';
import { Row, Col, Select } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

const useStyles = createStyles(() => {
  return {
    title: {
      fontWeight: 'bold',
      marginTop: 12,
      textAlign: 'center',
      width: '100%',
    },
    date: {
      fontsize: 10,
      marginTop: 12,
      textAlign: 'center',
      width: '100%',
    },
    countText: {
      fontWeight: 'bold',
      fontsize: 20,
      color: '#1890ff',
      marginBottom: 8,
    },
    titleText: {
      fontsize: 12,
    },
  };
});
const ReportOverview: React.FC = () => {
  const { styles } = useStyles();
  const [gameList, setGameList] = useState([]);
  const [totalInfo, setTotalInfo] = useState({
    rtp: 0,
    points_sold: 0,
    turnover: 0,
    win_loss: 0,
    user_count: 0,
  });
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  useEffect(() => {
    getGameList().then((res) => {
      if (res.code === 200) {
        setGameList(
          res?.data?.map((item: any) => {
            return {
              label: item.name,
              value: item.game_id,
            };
          }),
        );
      }
    });
  }, []);
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.accounts.game" defaultMessage="Game" />,
      dataIndex: 'game_id',
      hideInTable: true,
      valueType: 'select',
      renderFormItem: () => {
        return <Select options={gameList} allowClear></Select>;
      },
    },
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
      title: <FormattedMessage id="pages.accounts.date" defaultMessage="Date" />,
      dataIndex: 'date',
      valueType: 'dateTime',
      search: false,
    },

    {
      title: <FormattedMessage id="pages.accounts.betCount" defaultMessage="" />,
      dataIndex: 'bet_count',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.turnover" defaultMessage="" />,
      dataIndex: 'turnover',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.PWinLoss" defaultMessage="" />,
      dataIndex: 'player_win_loss',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.CWinLoss" defaultMessage="" />,
      dataIndex: 'agent_win_loss',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.accounts.RTP" defaultMessage="" />,
      dataIndex: 'rtp',
      search: false,
    },
  ];

  return (
    <PageContainer>
      <Row>
        <Col md={24} sm={24} lg={7} style={{ padding: '0 8px', marginBottom: 8 }}>
          <div>
            <Row>
              <Col md={24} lg={24} sm={24}>
                <img />
              </Col>
              <Col md={24} lg={24} sm={24} className={styles.title}>
                <FormattedMessage id="pages.accounts.monthTitle" defaultMessage="" />
              </Col>
              <Col md={24} lg={24} sm={24} className={styles.date}>
                {dayjs(new Date()).format('MM/DD YYYY')}
              </Col>
              <ProCard style={{ marginTop: 8 }}>
                <Row justify={'center'} className={styles.countText}>
                  {totalInfo.user_count}
                </Row>
                <Row justify={'center'}>
                  <FormattedMessage id="pages.accounts.newPlayers" defaultMessage="" />
                </Row>
              </ProCard>
              <ProCard style={{ marginTop: 8 }}>
                <Row justify={'center'} className={styles.countText}>
                  {totalInfo.points_sold}
                </Row>
                <Row justify={'center'}>
                  <FormattedMessage id="pages.accounts.pointsSold" defaultMessage="" />
                </Row>
              </ProCard>
              <ProCard style={{ marginTop: 8 }}>
                <Row justify={'center'} className={styles.countText}>
                  {totalInfo.turnover}
                </Row>
                <Row justify={'center'}>
                  <FormattedMessage id="pages.accounts.turnover" defaultMessage="" />
                </Row>
              </ProCard>
              <ProCard style={{ marginTop: 8 }}>
                <Row justify={'center'} className={styles.countText}>
                  {totalInfo.win_loss}
                </Row>
                <Row justify={'center'}>
                  <FormattedMessage id="pages.accounts.CWinLoss" defaultMessage="" />
                </Row>
              </ProCard>
              <ProCard style={{ marginTop: 8 }}>
                <Row justify={'center'} className={styles.countText}>
                  {totalInfo.rtp}
                </Row>
                <Row justify={'center'}>
                  <FormattedMessage id="pages.accounts.RTP" defaultMessage="" />
                </Row>
              </ProCard>
            </Row>
          </div>
        </Col>

        <Col md={24} lg={17} style={{ padding: '0 8px' }}>
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
            request={async (val: any) => {
              let params: any = {
                ...val,
                page: val.current - 1,
                size: val.pageSize,
              };
              if (val.start) {
                params.start = dayjs(val.start).startOf('day').valueOf();
              }
              if (val.end) {
                params.end = dayjs(val.end).endOf('day').valueOf();
              }
              const res = await getReportOverview(params);
              const { data } = res;
              setTotalInfo({
                rtp: data?.rtp,
                points_sold: data?.points_sold,
                turnover: data?.turnover,
                user_count: data?.user_count,
                win_loss: data?.win_loss,
              });
              return {
                data: data?.list,
                total: data?.downline_count,
                success: true,
              };
            }}
            columns={columns}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ReportOverview;
