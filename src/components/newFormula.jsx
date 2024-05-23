import React, { useContext, useEffect, useRef, useState } from 'react';
import { App, Button, Col, Form, Input, Popconfirm, Row, Select, Space, Table, notification } from 'antd';
import './index.css';
import useSWR from 'swr';
import { creator, fetcher } from '../fetchers';
import { DeleteOutlined } from '@ant-design/icons';
import CustomTag from './tag';
import CustomEditor from './custom';
import { useNavigate } from 'react-router-dom';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const NewFormula = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(1);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const { data: clientNames, isLoading: isClientNamesLoading } = useSWR(`/api/v1/test/getClientNames`, fetcher)
  const [existingClientNames, setExistingClientNames] = useState([]);

  useEffect(() => {
    if (clientNames && !isClientNamesLoading) {
      setExistingClientNames(clientNames.map((x) => x))
    }
  }, [clientNames])

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    form.setFieldsValue({ tableData: newData });
  };

  const handleAdd = () => {
    const newData = {
      key: count.toString(),
      name: `Key ${count}`,
      value: `Value ${count}`
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    form.setFieldsValue({ tableData: [...dataSource, newData] });
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    form.setFieldsValue({ tableData: newData });
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
    form.setFieldsValue({ variables: newTags });
  };

  const onFinish = (values) => {

    const clientName = values.clientName[0];
    const metaData = {};
    values.tableData.forEach((item) => {
      const { name, value } = item;
      metaData[name] = value;
    });
    const transformedValues = {
      clientName,
      metaData,
      expression: values.expression,
      variables: values.variables,
    };

    creator('/api/v1/test/create', transformedValues)
      .then(() => {
        notification.success({ message: 'New Formula Created' });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: JSON.stringify(err),
          message: 'New Formula Creation Failed',
        });
      });
    navigate('/');
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      editable: true,
      width: '30%',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a><DeleteOutlined /></a>
          </Popconfirm>
        ) : null,
    },
  ].map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
    }),
  }));

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row align={'middle'} justify="start">

          <Col xs={24} sm={24} md={19} lg={19} xl={19} xxl={19}>
            <Form.Item
              label={'Client Name'}
              name={'clientName'}
              rules={[{ message: `Please input a client name`, required: true }]}
            >
              <Select
                mode="tags"
                placeholder="Select or add client name"
                allowClear
                maxCount={1}
                style={{ width: '100%' }}
                options={existingClientNames.map((clientName) => ({
                  key: clientName,
                  value: clientName,
                  label: clientName,
                }))}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={19} lg={19} xl={19} xxl={19}>
            <Form.Item label="Metadata" name="tableData">
              <Button
                onClick={handleAdd}
                type='primary'
                style={{
                  marginBottom: 16,
                }}
              >
                Add a Key
              </Button>
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={19} lg={19} xl={19} xxl={19}>
            <Form.Item
              label={'Variables'}
              name={'variables'}
              rules={[{ message: `Please input variables`, required: true }]}
            >
              <CustomTag tags={tags} setTags={handleTagsChange} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={19} lg={19} xl={19} xxl={19}>
            <CustomEditor variables={tags} />
          </Col>

          <Col xs={24} sm={24} md={19} lg={19} xl={19} xxl={19}>
            <Form.Item
              label={'Expression'}
              name={'expression'}
              rules={[{ message: `Please input an expression`, required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={19} lg={19} xl={19} xxl={19}>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </div>
  );
};

export default NewFormula;


