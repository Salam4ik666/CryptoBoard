import React, { useContext } from 'react';
import AppHeader from './AppHeader.jsx';
import { Layout, Spin } from 'antd';
import AppContent from './AppContent.jsx';
import CryptoContext from '../../context/crypto-context.jsx';
import AppSider from './AppSider.jsx';

const AppLayout = () => {
  const { loading } = useContext(CryptoContext);
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
