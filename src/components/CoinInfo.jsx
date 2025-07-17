import React from 'react';
import { Flex, Typography } from 'antd';

const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <Flex align={'center'} gap={10}>
      <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
      <Typography.Title style={{ marginBottom: 0 }} level={2}>
        {withSymbol && coin.symbol} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
