import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/articleList.css'
const { confirm } = Modal;

const ArticleList = (props) => {
    const [list, setList] = useState([])
    useEffect(()=>{
        getList()
    },[])
    
    const getList=()=>{
        axios({
            method:'get',
            url:servicePath.getArticleList,
            header: { 'Access-Control-Allow-Origin': '*', ' Content-Type ':'application/json' },
            withCredentials:true
        }).then(res=>{
                setList(res.data.list)
        })
    }

    const deleteArticle=(id)=>{
        confirm({
            title:'确定要删除这篇博客文章嘛？',
            content:'如果你点击ok，文章将被彻底删除了哦',
            onOk(){
                axios(servicePath.deleteArticle+id,{withCredentials:true}).then(
                    res=>{
                        message.success('文章删除成功了');
                        getList();
                    }
                )
            },
            onCancel(){
                message.success('文章没有被删除嗷')
            }
        })
    }
    const updateArticle =(id,checked)=>{
        props.history.push('/index/add/'+id)
    }
    return (
        <div>
            <List
                header={
                    <Row className='list-div' >
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className='list-div' >
                            <Col span={8}>
                                <b>{item.title}</b>
                            </Col>
                            <Col span={4}>
                                <b>{item.typeName}</b>
                            </Col>
                            <Col span={4}>
                                <b>{item.addTime}</b>
                            </Col>
                            <Col span={4}>
                                <b>{item.viewCount}</b>
                            </Col>
                            <Col span={4}>
                                <Button type='primary' onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
                                <Button  onClick={()=>{deleteArticle(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList