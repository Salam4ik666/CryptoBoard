import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useCrypto } from '../../context/crypto-context.jsx';
import CoinInfoModal from '../CoinInfoModal.jsx';
import AddAssetForm from '../AddAssetForm.jsx';
import React, { useEffect, useState } from 'react';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto, drawer, setDrawer, editCryptoId, setEditCryptoId } = useCrypto();

  const handleCloseDrawer = () => {
    setDrawer(false);
    setEditCryptoId(null);
  };

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };
  const handleClick = () => {
    setSelect(!select);
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onClick={handleClick}
        open={select}
        value='press / to open'
        style={{ width: 250 }}
        onSelect={handleSelect}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
      <Button type='primary' onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        key={drawer}
        width={600}
        title={editCryptoId ? 'Edit Asset' : 'Add Asset'}
        onClose={handleCloseDrawer}
        open={drawer}
      >
        <AddAssetForm onClose={handleCloseDrawer} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
