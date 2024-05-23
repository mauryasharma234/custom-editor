import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, theme } from 'antd';

const CustomTag = ({ tags, setTags }) => {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue('');
    }
    setInputVisible(false);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          style={{ width: 200 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          autoFocus 
        />
      ) : (
        <Tag onClick={showInput} style={{ background: token.colorBgContainer, borderStyle: 'dashed' }}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default CustomTag;

