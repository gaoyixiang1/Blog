import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { HomeOutlined, HighlightOutlined, SmileOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Row, Col, Menu } from 'antd'
import '../static/components/header.css'
import '../static/pages/common.css'

import Main from './Main'
import Life from './Life'
import MyList from './list'
import Detailed from './detailed'

function App() {   
    return (
        <Router>
            <div className='header'>
                <Row type='flex' justify='center'>
                    <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                        <span className='header-logo'>Candy</span>
                        <span className='header-txt'>不忘初心，方得始终</span>
                    </Col>
                    <Col xs={0} sm={0} md={14} lg={10} xl={6}>
                        <Menu mode='horizontal' >
                            <Menu.Item key='homes'>
                                <HomeOutlined />
                                <Link to='/'>首页</Link>
                            </Menu.Item>
                            <Menu.Item key='blog'>
                                <HighlightOutlined />
                                <Link to='/list/id=1'>博客</Link>
                            </Menu.Item>
                            <Menu.Item key='lifes'>
                                <SmileOutlined />
                                <Link to='/list/id=2'>生活</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
                <div className='mainer'>
                    <Route path='/' component={Main} exact ></Route>
                    <Route path='/list/id=1' component={MyList} exact></Route>
                    <Route path='/list/id=2' component={Life} exact></Route>
                    <Route path='/detailed' component={Detailed}></Route>
                </div>
            </div>
        </Router>
    )
}

export default App;