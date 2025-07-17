import React from 'react';
import { Divider, Flex, Tag, Typography } from 'antd';
import TwitterLink from './TwitterLink.jsx';
import RedditLink from './RedditLink.jsx';
import BinanceLink from './BinanceLink.jsx';
import CoinInfo from './CoinInfo.jsx';

const CoinInfoModal = ({ coin }) => {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 8 }}>
          1 hour:
        </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>

        <Typography.Text strong style={{ marginRight: 8 }}>
          1 day:
        </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>

        <Typography.Text strong style={{ marginRight: 8 }}>
          1 week:
        </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>
          Price:
        </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>
          Price BTC:
        </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>
          Market Cap:
        </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>

      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong style={{ marginRight: 5 }}>
            Contract Address:
          </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}

      <Typography.Paragraph>
        <Typography.Text strong style={{ marginRight: 5 }}>
          Web Site:
        </Typography.Text>
        {coin.websiteUrl}
      </Typography.Paragraph>
      <Divider />

      <Flex align={'center'} gap={10}>
        <TwitterLink url={coin.twitterUrl} />
        <RedditLink url={coin.redditUrl} />
        <BinanceLink url={`https://www.binance.com/en/price/${coin.id}`} />
      </Flex>
    </>
  );
};

export default CoinInfoModal;
