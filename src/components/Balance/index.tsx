import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { createStyles, keyframes } from 'antd-style';
import { useModel } from '@umijs/max';

const useStyles = createStyles(() => {
  const refreshing = keyframes`
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  `;

  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      height: 30,
      fontSize: 14
    },
    refreshIcon: {
      width: 20,
      height: 20,
      marginRight: 4,
    },
    refreshing: {
      animation: `${refreshing} 1s linear infinite`,
    },
  };
});

const Balance = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser } = initialState || {};
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    setRefreshing(true);
    const userInfo = await initialState?.fetchUserInfo?.();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  return (
    <div className={styles.container} onClick={fetchUserInfo}>
      <img
        src={require('./img/icon-refresh.png')}
        className={`${styles.refreshIcon} ${refreshing ? styles.refreshing : ''}`}
      />
      <span>{Number(currentUser?.agent_balance || 0 / 1000).toFixed(2)}</span>
    </div>
  );
};

export default Balance;
