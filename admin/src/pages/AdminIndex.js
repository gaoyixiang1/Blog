import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import { Layout, Menu, Breadcrumb } from 'antd';
import '../static/css/adminIndex.css'
import {PieChartOutlined, FileOutlined} from '@ant-design/icons';

import AddArticle from './AddArticle'
import ArticleList from './articleList'
import WordList from './wordList'

const { Header, Content, Footer, Sider } = Layout;

const AdminIndex = props => {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    //根据key显示对应得组件
    const handleClickArticle = e => {
        if (e.key === 'add') {
            props.history.push('/index/add')
        } else if(e.key === 'list') {
            props.history.push('/index/list')
        }else{
            props.history.push('/index/word')
        }
    }
 
    return (
        <Layout style={{ minHeight: '40vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo"  />
                <Menu theme="dark" defaultSelectedKeys={[window.location.pathname.split('/')[2]]} mode="inline">
                    <Menu.Item  icon={<PieChartOutlined />} key="add" onClick={handleClickArticle}>
                    添加文章
                    </Menu.Item>
                    <Menu.Item  icon={<PieChartOutlined />} key="list" onClick={handleClickArticle}>
                    文章列表
                    </Menu.Item>
                    <Menu.Item key="word" onClick={handleClickArticle}>
                        <span><FileOutlined />留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>Workplace</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div>
                            <Route path='/index' exact component={AddArticle}></Route>
                            <Route path='/index/add' exact component={AddArticle}></Route>
                            <Route path='/index/list' exact component={ArticleList}></Route>
                            <Route path='/index/add/:id' exact component={AddArticle}></Route>
                            <Route path='/index/word' exact component={WordList}></Route>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Candy Blog ©2020 Created by Candy</Footer>
            </Layout>
        </Layout>
    );
}

export default AdminIndex;