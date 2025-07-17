import React from 'react';
import { Button, Card, Flex, Layout, List, Statistic, Tag, Tooltip, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useCrypto } from '../../context/crypto-context.jsx';

const siderStyle = {
  padding: '1rem',
};

const getDate = (date) => {
  if (!date) return 'N/A';

  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  return d.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const AppSider = () => {
  const { loading, assets, crypto, setDrawer, drawer, editCryptoId, setEditCryptoId, deleteAsset } = useCrypto();

  const handleEdit = (id) => {
    setDrawer(true);
    setEditCryptoId(id);
  };

  const getTitle = (asset) => (
    <Flex justify='space-between' align='center'>
      <span>{asset.id.charAt(0).toUpperCase() + asset.id.slice(1, asset.id.length)}</span>
      <Flex justify='space-between' align='center' gap={4}>
        <Tooltip title='Delete Asset'>
          <Button onClick={() => deleteAsset(asset.id)}>X</Button>
        </Tooltip>
        <Button onClick={() => handleEdit(asset.id)}>Edit</Button>
      </Flex>
    </Flex>
  );

  return (
    <Layout.Sider width='25%' style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={getTitle(asset)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix='$'
          />
          <List
            size='small'
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
              { title: 'Date', value: getDate(asset.date), isPlain: true },
              // {title: "Difference", value: asset.growPercent},
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}

                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
