// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    agent_balance: number;
    currency_code: string;
    currency_id: number;
    game_balance: number;
    id: number;
    level: number;
    master_count: number;
    master_id: number;
    status: number;
    superior_count: number;
    superior_id: number;
    username: string;
    prefix: string;
  };

  type LoginResult = {
    code: number;
    type?: string;
    data: string;
    msg: string;
    currentAuthority?: string;
  };

  type ApiResult = {
    code: number;
    msg: string;
    data: any;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
    username?: string;
    id: number;
  };

  type RuleList = {
    code: number;
    msg: string;
    data?: RuleListItem[];
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    currency_id: number;
    source: number;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
