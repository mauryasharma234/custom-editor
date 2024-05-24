import { useEffect, useState } from "react"
import axios from 'axios';
import useSWR from "swr"
import { css } from "@emotion/react";
import { Button, Col, Input, Popconfirm, Row, Space, Table, Tooltip, Typography, notification } from "antd";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { fetcher } from "../fetchers";


export default function Manage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const { data: formulaData, isLoading: isFormulaDataLoading } = useSWR(`/api/v1/test/getAll?search=${search}&pageNumber=${currentPage}`, fetcher)
  const[tableData, setTableData] = useState(formulaData?.data || []);

  console.log("formulaData", formulaData)
  const columns = [
    {
      key: 'ID',
      render: (text) => {
        return (
          <span css={{ whiteSpace: 'nowrap' }}>{text.id}</span>
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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        console.log("record === ", record);
        return (
          <Space size="middle">
            <Tooltip placement="top" title="View">
              <a
                onClick={() => {
                  props.setShowVisibleState({
                    showType: "create",
                    type: "view",
                    showData: {
                      id: record.id,
                    },
                  });
                }}>
                {/* View */}
                <EyeOutlined />
              </a>
            </Tooltip>
            <Tooltip placement="top" title="Edit">
              <a
                onClick={() => {
                  props.setShowVisibleState({
                    showType: "create",
                    type: "edit",
                    showData: {
                      id: record.id,
                    },
                  });
                }}>
                {/* Edit */}
                <EditOutlined />
              </a>
            </Tooltip>
            <Tooltip placement="top" title="Delete">
              <Popconfirm
                title="Delete Rule"
                description="Are you sure you want to delete this rule?"
                onConfirm={async () => {
                  try {
                    await axios.delete(
                      (import.meta.env.VITE_BACKEND_URL) +
                      `/api/v1/test/deleteFormula?id=${record.id}`,
                    );
                    notification.success({
                      message: "Formula Deleted",
                    });
                    setIsDeleted((val) => !val);
                  } catch (err) { }
                }}
                okText="Yes"
                cancelText="No">
                {/* <a>Delete</a> */}
                <a><DeleteOutlined /></a>
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ]
  useEffect(() => {
    if (formulaData) {
      setTableData(
        formulaData.data.map((elem) => ({
          ...elem,
          key: elem.id,
        }))
      );
      setTotalItems(formulaData.totalCount || 0);
    }
  }, [tableData]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          (import.meta.env.VITE_BACKEND_URL) +
          `/api/v1/test/getAll?search=${search}&pageNumber=${currentPage}`,
        );

        setTableData(
          res?.data?.data.map((elem) => {
            return { ...elem, key: elem.id };
          })
        );
        setTotalItems(res?.data?.totalCount || 0);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [
    isDeleted,
    currentPage,
    search
  ]);

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
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1); // Reset to the first page on search
            }}
            size="large"
            
          />
        </Col>
        <Col flex="none">
          <Button
            type="primary"
            size="large"
            css={{
              float: 'right',
            }}
            onClick={() => {
              navigate('/new');
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
          total: formulaData?.searchCount || totalItems,
        }}
        loading={isFormulaDataLoading}
        dataSource={tableData}
        style={{ width: '100%' }}
      >
      </Table>

    </Space>
  )
}