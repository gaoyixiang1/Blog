import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const {confirm} = Modal
const WordList =(props)=>{
    const [list,setList]=useState([])

    const getWord=()=>{
        axios(servicePath.getWordsList)
        .then(res=>{
            setList(res.data.data)
        })
    }
    
    useEffect(()=>{
        getWord();
    },[])

const deleteWord=(id)=>{
    confirm({
        title:'确定要删除这条留言嘛？',
        content:'如果你点击ok，留言将被彻底删除了哦',
        onOk(){
            axios(servicePath.deleteWord+id,{withCredentials:true}).then(
                res=>{
                    message.success('留言删除成功了');
                    getWord();
                }
            )
        },
        onCancel(){
            message.success('留言没有被删除嗷')
        }
    })
}
    return (
        <div>
            <List
                header={
                    <Row className='list-div' >
                        <Col span={8}>
                            <b>留言者</b>
                        </Col>
                        <Col span={8}>
                            <b>内容</b>
                        </Col>
                        
                        <Col span={8}>
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
                                <b>{item.name}</b>
                            </Col>
                            <Col span={8}>
                                <b>{item.content}</b>
                            </Col>
                            
                            <Col span={8}>
                                
                                <Button type='primary' onClick={()=>{deleteWord(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />
        </div>
    )
}
export default WordList