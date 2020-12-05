import React, { useEffect, useState } from 'react'
import { CalendarOutlined, FireOutlined, FolderOutlined } from '@ant-design/icons'
import { Row, Col, Breadcrumb } from 'antd'
import 'antd/dist/antd.css'
import '../static/pages/detailed.css'

import axios from 'axios'
import Author from '../components/Author'
import Word from '../components/words'
import Footer from '../components/footer'

import marked from 'marked'
import hl from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';
import servicePath from '../config/apiUrl'

const Detailed = () => {
    let index = window.location.href.indexOf('#');
    let id = window.location.href.substr(index, 1)
    const [articleDetail, setArticleDetail] = useState([])
    const [html, setHtml] = useState('loading.....')
    useEffect(() => {
        axios(servicePath.getArticleById+id)
            .then((res) => {
                console.log(res.data.data);
                setArticleDetail(res.data.data[0]);
                setHtml(res.data.data[0].context)
            })
    }, [])
    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hl.highlightAuto(code).value
        }
    })

    return (
        <div>
            <Row justify='center' type='flex' className='common-main'>
                <Col className='common-left' xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className='bread-div'>
                        <Breadcrumb>
                            <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a href='/list'>{articleDetail.typeName}</a></Breadcrumb.Item>
                            <Breadcrumb.Item>{articleDetail.addTime}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <div className="detailed-title">
                            {articleDetail.title}
                        </div>
                        <div className="list-icon center">
                            <span><CalendarOutlined />{articleDetail.addTime}</span>
                            <span><FolderOutlined /> {articleDetail.typeName}</span>
                            <span><FireOutlined /> {articleDetail.viewCount}人</span>
                        </div>
                        <div className="detailed-content" dangerouslySetInnerHTML={{ __html: marked(html) }}>
                        </div>
                    </div>
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

export default Detailed