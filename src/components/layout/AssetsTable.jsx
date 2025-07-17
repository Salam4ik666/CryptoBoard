import React from 'react';

import { Table } from 'antd';
import { useCrypto } from '../../context/crypto-context.jsx';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    sorter: (a, b) => a.totalAmount - b.totalAmount,
    defaultSortOrder: 'descend',
  },
];

const AssetsTable = () => {
  const { assets } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
    totalAmount: a.totalAmount,
  }));

  return <Table pagination={false} columns={columns} dataSource={data} showSorterTooltip={{ target: 'sorter-icon' }} />;
};

export default AssetsTable;
