// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /bo/api/v1/user/query/info */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/bo/api/v1/user/query/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /bo/api/v1/user/logout */
export async function outLogin(params: { user_id: number }) {
  return request<Record<string, any>>('/bo/api/v1/user/logout', {
    method: 'POST',
    data: params,
  });
}

/** 获取币种列表 GET /bo/api/v1/currency/list */
export async function getCurrencyList(options?: { [key: string]: any }) {
  return request<API.LoginResult>('/bo/api/v1/currency/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/bo/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取代理/用户列表 GET /bo/api/v1/user/query/users */
export async function getPlayerList(params: {
  page?: number;
  size?: number;
  username?: string;
  start_at?: number;
  end_at?: number;
  status?: number;
}) {
  return request<any>('/bo/api/v1/user/query/users', {
    method: 'POST',
    data: params,
  });
}

/** 新增用户列表 POST /bo/api/v1/user/register */
export async function addPlayer(
  body: {
    nickname?: string;
    prefix?: string;
    language?: string;
    currency_id?: number;
    balance?: number;
    email?: string;
    phone?: string;
    wechat?: string;
    whatsapp?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/bo/api/v1/user/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户列表 POST /bo/api/v1/user/modify/profile */
export async function editPlayer(
  body: {
    nickname?: string;
    prefix?: string;
    language?: string;
    currency_id?: number;
    balance?: number;
    email?: string;
    phone?: string;
    wechat?: string;
    whatsapp?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/bo/api/v1/user/modify/profile', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 转账 POST /bo/api/v1/user/transfer */
export async function transfer(body: {
  user_id?: number;
  amount?: number;
  transfer_type?: number;
  type?: number;
}) {
  return request<API.RuleList>('/bo/api/v1/user/transfer', {
    method: 'POST',
    data: body,
  });
}

/** 修改密码 POST /bo/api/v1/user/modify/password */
export async function changePassword(body: { password: string; user_id: number }) {
  return request<API.RuleList>('/bo/api/v1/user/modify/password', {
    method: 'POST',
    data: body,
  });
}

/** 修改状态 POST /bo/api/v1/user/modify/status */
export async function changeStatus(body: { status: number; user_id: number }) {
  return request<API.RuleList>('/bo/api/v1/user/modify/status', {
    method: 'POST',
    data: body,
  });
}

/** 获取points记录 POST /bo/api/v1/transaction/list */
export async function getPoints(params: any) {
  return request<any>('/bo/api/v1/transaction/list', {
    method: 'POST',
    data: params,
  });
}

/** 获取游戏列表 POST /bo/api/v1/game/list */
export async function getGameList() {
  return request<any>('/bo/api/v1/games/list', {
    method: 'GET',
  });
}

/** 获取player报表 POST /bo/api/v1/report/player */
export async function getReportPlayer(params: any) {
  return request<any>('/bo/api/v1/report/player', {
    method: 'POST',
    data: params,
  });
}
/** 获取agent报表 POST /bo/api/v1/report/agent */
export async function getReportAgent(params: any) {
  return request<any>('/bo/api/v1/report/agent', {
    method: 'POST',
    data: params,
  });
}
/** 获取 POST /bo/api/v1/report/game */
export async function getReportGame(params: any) {
  return request<any>('/bo/api/v1/report/game', {
    method: 'POST',
    data: params,
  });
}
/** 获取 POST /bo/api/v1/report/overview */
export async function getReportOverview(params: any) {
  return request<any>('/bo/api/v1/report/overview', {
    method: 'POST',
    data: params,
  });
}
/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
