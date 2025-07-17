import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space } from 'antd';
import { useCrypto } from '../context/crypto-context.jsx';
import CoinInfo from './CoinInfo.jsx';

const validateMessages = {
  required: "'${label}' is required!",
  types: {
    number: "'${label}' is not valid number!",
  },
  number: {
    range: "'${label}' must be between '${min}' and '${max}'",
  },
  // ...
};

const AddAssetForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const { crypto, addAsset, editCryptoId, editAssets, assets } = useCrypto();
  const [coin, setCoin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();
  const assetForEdit = crypto.find((a) => a.id === editCryptoId);
  const value = assetForEdit || coin;
  const currentAsset = assets.find((a) => a.id === editCryptoId);
  const initialValues = {
    amount: currentAsset ? currentAsset.amount : null,
    price: currentAsset ? currentAsset.price : +value.price,
    date: currentAsset ? dayjs(currentAsset.date) : null,
  };

  if (submitted) {
    return (
      <Result
        status='success'
        title='New Asset Added'
        subTitle={`Added ${assetRef.current.amount} of ${value.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type='primary' key='console' onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!editCryptoId && !coin) {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder='Select Coin'
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
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
    );
  }

  const onFinish = (values) => {
    const asset = {
      id: value.id,
      amount: values.amount,
      price: values.price,
      date: values.date,
    };
    assetRef.current = asset;
    setSubmitted(true);
    coin && addAsset(asset); //если коин тру то тогда изменить стейт(тоже самое что if)
    editCryptoId && editAssets(asset);
    console.log('asset', asset);
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  };

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={value} />
      <Divider />

      <Form.Item label='Amount' name='amount' rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber placeholder='Enter coin amount' style={{ width: '100%' }} onChange={handleAmountChange} />
      </Form.Item>

      <Form.Item label='Price' name='price'>
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Date & Time' name='date'>
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label='Total' name='total'>
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
