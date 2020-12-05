import React, { useState, useEffect } from 'react'
import { CalendarOutlined, FireOutlined, FolderOutlined } from '@ant-design/icons'
import { Row, Col, List, Breadcrumb } from 'antd'
import 'antd/dist/antd.css'
import '../static/pages/main.css'

import axios from 'axios'
import Author from '../components/Author'
import Word from '../components/words'
import Footer from '../components/footer'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Life = () => {
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });
    const [mylist, setMylist] = useState([])
    let index = window.location.href.indexOf('#');
    let id = window.location.href.substr(index, 1)
    useEffect(() => {
        axios(servicePath.getListById+id)
            .then((res) => {
                setMylist(res.data.data)
            })
    }, [])
    return (
        <div>
            <Row justify='center' type='flex' className='common-main'>
                <Col className='common-left' xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className='bread-div'>
                        <Breadcrumb>
                            <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>Life</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <List
                        itemLayout='vertical'
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item>
                                <div className='list-title'><a href={`http://localhost:3000/detailed?id=${item.id}`}>{item.title}</a></div>
                                <div className='list-icon'>
                                    <span><CalendarOutlined />{item.addTime}</span>
                                    <span><FolderOutlined /> {item.typeName}</span>
                                    <span><FireOutlined /> {item.viewCount}人</span>
                                </div>
                                <div className='list-context' dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className='common-right' xs={0} sm={0} md={7} lg={5} xl={5}>
                    <Author></Author>
                    <Word></Word>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    )
}




export default Life