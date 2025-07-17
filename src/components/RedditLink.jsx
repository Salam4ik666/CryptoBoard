import React from 'react';
import { RedditOutlined } from '@ant-design/icons';

const RedditLink = ({ url }) => {
  return (
    <a href={url} target={'_blank'}>
      <RedditOutlined style={{ fontSize: 30, color: '#FF5700' }} />
    </a>
  );
};

export default RedditLink;
