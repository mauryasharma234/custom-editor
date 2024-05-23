import { Button, Col, Form, Input, InputNumber, Popconfirm, Row, Select, Space } from "antd";
import useSWR from "swr";
import { fetcher } from "../fetchers";
import { useEffect, useState } from "react";

export default function NewFormula(){

    const [form] = Form.useForm();
    const {data: clientNames, isLoading: isClientNamesLoading} = useSWR(`/api/v1/test/getClientNames`, fetcher)
    const [existingClientNames, setExistingClientNames] = useState([]);

    useEffect(() => {
        if(clientNames && !isClientNamesLoading){
            setExistingClientNames(clientNames.map((x) => x))
        }  
    }, [clientNames])
    
    return (
       <Form
       form={form}
       name="formData"
       labelCol={{ span: 8 }}
       wrapperCol={{ span: 12 }}
       autoComplete="off"
       layout="horizontal"
       onFinish={(values) => {
           console.log("values === ", values)
       }}
       labelWrap
       style={{width: '100%'}}
       >
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
                <Form.Item
                    label={'Metadata'}
                    name={'metadata'}
                    rules={[{ message: `Please input metadata`, required: true }]}
                >

                </Form.Item>
          </Col>

        </Row>
       </Form>
    )
}