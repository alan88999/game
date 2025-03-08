import { login } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { message, Modal } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import classNames from 'classnames';

const useStyles = createStyles(({ token }) => {
  return {
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
    currencyContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    currencyItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 20px',
      borderRadius: '50px',
      border: '1px solid #d4d4d4',
      margin: '0 4px',
    },
    currencyImg: {
      maxWidth: 20,
      maxHeight: 20,
      margin: '0 4px',
    },
    currencyItemActive: {
      borderColor: '#1677ff',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currencyList } = initialState as any;
  const { styles } = useStyles();
  const intl = useIntl();
  const [currency, setCurrency] = useState<any>({});

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const res = await login({ ...values, currency_id: 1 || currency.id, source: 1 });
      if (res.code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        localStorage.setItem('token', `Bearer ${res.data}`);
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const renderCurrency = () => {
    return currencyList && currencyList.length ? (
      <div className={styles.currencyContainer}>
        {currencyList.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={classNames(styles.currencyItem, {
                [`${styles.currencyItemActive}`]: currency.currency_code === item.currency_code,
              })}
              onClick={() => {
                setCurrency(item);
              }}
            >
              <img className={styles.currencyImg} />
              {item.currency_code}
            </div>
          );
        })}
      </div>
    ) : (
      ''
    );
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Back Office"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名: admin or user',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />

          <div
            style={{
              marginBottom: 64,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
              onClick={()=>{
                Modal.confirm({
                  title: intl.formatMessage( {id: 'pages.accounts.forgetPassword',}),
                  content: intl.formatMessage( {id: 'pages.accounts.forgetPasswordDesc',})
                })
              }}
            >
              <FormattedMessage id="pages.accounts.forgetPassword" defaultMessage="" />
            </a>
          </div>
          {renderCurrency()}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
