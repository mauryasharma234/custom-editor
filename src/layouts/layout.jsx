import { Button, Image, Layout, Menu, Space, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
    {
      key: '/',
      label: 'Manage',
    },
    {
      key: '/try',
      label: 'Try',
    }
];
  


function MyLayout() {
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState(location.pathname);
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
      setSelectedPage('/' + location.pathname.split('/')[1]);
    }, [location.pathname]);
    return (
    <Layout>
      <Header
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            flexWrap: "wrap",
            paddingInline: "5%",
            paddingLeft: "0",
          }}
          >
          <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingLeft: "10px",
            marginRight: "auto",
          }}>
            <Link to="/">
          <Typography.Title
            style={{
              // display: logoTitleDisplay,
              color: "white",
              margin: "auto",
              height: 40,
              marginLeft: "20px",
            }}
            level={2}>
            Ensolver
          </Typography.Title>
          </Link>
        </div>
        </Header>
      <Layout>
      <Sider
        collapsible
        breakpoint="lg"
        theme="dark"
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '12px',
            marginTop: '23px',
          }}
        >
        </div>
        <Menu
          css={{
            '& .ant-menu-item, .ant-menu-item-selected': {
              margin: 0,
              borderRadius: 0,
              width: '100%',
            },
          }}
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={(item) => navigate(item.key)}
          selectedKeys={[selectedPage]}
        />
      </Sider>
        <Layout>
        <Content
          style={{
            margin: '24px 16px 0',
            minHeight: '87vh',
            overflowX: 'scroll',
            padding: '2% 5% 2% 5%',
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            minHeight: '3vh',
            textAlign: 'center',
            padding: '14px 50px 0 50px',
          }}
        >
          EnBed © {currentYear} | Powered By Ensuredit Technologies Pvt. Ltd
        </Footer>
        </Layout>
      </Layout>
    </Layout>
    );
}

export default MyLayout;