import { Button, Image, Layout, Menu, Space, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Outlet, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    return (
     <Layout style={{ minHeight: '100vh' }} hasSider> 
     <Sider
        style={{ backgroundColor: "" }}
        css={{
          '& .ant-layout-sider-trigger': {
            color: "red",
            backgroundColor: "",
          },
        }}
        collapsible
        breakpoint="md"
        // onCollapse={() => {
        //   logoTitleDisplay === 'inline'
        //     ? setLogoTitleDisplay('none')
        //     : setLogoTitleDisplay('inline');
        // }}
        width={220}
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
          {/* <Image
            preview={false}
            // src={darkMode ? '/logo.png' : '/dark.png'}
            width={28}
            height={28}
          /> */}
          <Typography.Title
            style={{
                color: "white",
              fontWeight: 400,
              marginBottom: 0,
            }}
            level={4}
          >
            Ensolver
          </Typography.Title>
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
        //   selectedKeys={[selectedPage]}
          items={menuItems}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'right',
            paddingInline: '5%',
            background: "",
          }}
        >
        </Header>

        <Content
          style={{
            // backgroundColor: colorBgContainer,
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
          EnBed © 2024 | Powered By Ensuredit Technologies Pvt. Ltd
        </Footer>
      </Layout>
     </Layout>
    );
}

export default MyLayout;