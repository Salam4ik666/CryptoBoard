import React from 'react';
import { Card, Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context.jsx';
import PortfolioChart from './PortfolioChart.jsx';
import AssetsTable from './AssetsTable.jsx';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

const AppContent = () => {
  const { assets } = useCrypto();
  const totalAmount = assets
    .reduce((acc, asset) => {
      return acc + asset.totalAmount;
    }, 0)
    .toFixed(2);

  return (
    <Layout.Content style={contentStyle}>
      {assets.length === 0 ? (
        <Card>
          <Typography.Title level={1}>Add New Asset</Typography.Title>
        </Card>
      ) : (
        <>
          <Typography.Title level={3} style={{ textAlign: 'left', color: 'white' }}>
            Portfolio:{totalAmount}
          </Typography.Title>
          <PortfolioChart />
          <AssetsTable />
        </>
      )}
    </Layout.Content>
  );
};

export default AppContent;
