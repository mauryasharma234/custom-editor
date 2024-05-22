import { useState } from "react"
import axios from 'axios';
import useSWR from "swr"
import {css} from "@emotion/react";
import { Button, Col, Input, Row, Space, Table, Typography } from "antd";
import { render } from "react-dom";

const fetcher = (url) => {
    return axios
      .get("http://localhost:3000" + url)
      .then((res) => res.data);
  };

export default function Manage(){
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    
    const {data: formulaData, isLoading: isFormulaDataLoading} = useSWR(`/api/v1/test/getAll?search=${search}&pageNumber=${currentPage}`, fetcher)
    console.log("formulaData", formulaData)
    const columns = [
        {
            key: 'ID',
            render: (text) => {
                return (
                    <span css={{whiteSpace: 'nowrap'}}>{text.id}</span>
                )
            },
            title: 'ID',
        },
        {
            title: "Client Name",
            dataIndex: "clientName", // Use dataIndex instead of key
        },
        {
            title: "Metadata",
            dataIndex: "metadata",
            render: (text) => {
                if (typeof text === 'object') {
                    return <pre>{JSON.stringify(text, null, 2)}</pre>; // Display formatted JSON if it's an object
                } else {
                    return <span>{text}</span>; // Otherwise, render as plain text
                }
            },
        },
        {
            key: 'date',
            render: (_, item) => {
              return <>{new Date(item.updatedAt).toLocaleDateString()}</>;
            },
            title: 'Updated At',
        }
    ]
    
    return (
        <Space
        direction="vertical"
        style={{ width: '100%' }}
        
        >
            <Typography.Title>Manage</Typography.Title>
            <Row 
                justify={"space-between"}
                gutter={[{ lg: 10, md: 24, sm: 16, xs: 8 }, 8]}
            >
              <Col span={8}>
                <Input.Search
                    placeholder="Search"
                    onSearch={(value) => setSearch(value)}
                    size="middle"
                />
              </Col>
              <Col flex="none">
                <Button
                 type="primary"
                 size="middle"
                 css={{
                    float: 'right',
                 }}
                >
                    Create New Formula
                </Button>
              </Col>
            </Row>

            <Table
                bordered
                columns={columns}
                pagination={{
                    current: currentPage,
                    defaultPageSize: 10,
                    onChange: setCurrentPage,
                    total: formulaData?.totalCount,
                }}
                loading={isFormulaDataLoading}
                dataSource={formulaData?.data}
                style={{ width: '100%' }}
            >

            </Table>

       </Space>
    )
}