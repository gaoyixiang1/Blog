import React, { useState, useEffect } from 'react'
import { CalendarOutlined, FireOutlined, FolderOutlined } from '@ant-design/icons'
import axios from 'axios'
import 'antd/dist/antd.css'
import '../static/pages/common.css'
import { Row, Col, List } from 'antd'

import Author from '../components/Author'
import Words from '../components/words'
import Footer from '../components/footer'
import marked from 'marked'

import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import servicePath from '../config/apiUrl'

const Main = () => {
    const [mylist, setMylist] = useState([])
    useEffect(() => {
        axios(servicePath.getArticleList)
            .then((res) => {
                setMylist(res.data.data)
            })
    }, [])
    //markdown
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
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
    return (
        <div>
            <Row justify='center' type='flex' className='common-main'>
                <Col className='common-left' xs={24} sm={24} md={16} lg={18} xl={14}>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout='vertical'
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item>
                                <div className='list-title'><a href={`http://localhost:3000/detailed?id=${item.id}`}>
                                    {item.title}</a>
                                    </div>
                                <div className='list-icon'>
                                    <span><CalendarOutlined /> {item.addTime}</span>
                                    <span><FolderOutlined /> {item.typeName}</span>
                                    <span><FireOutlined /> {item.viewCount}人</span>
                                </div>
                                <div className='list-context' dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className='common-right' xs={0} sm={2} md={7} lg={5} xl={5}>
                    <Author></Author>
                    <Words/>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    )
}
export default Main