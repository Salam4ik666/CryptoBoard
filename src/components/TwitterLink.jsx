import React from 'react';
import { TwitterOutlined } from '@ant-design/icons';

const TwitterLink = ({ url }) => {
  return (
    <a href={url} target={'_blank'}>
      <TwitterOutlined style={{ fontSize: 30 }} />
    </a>
  );
};

export default TwitterLink;
