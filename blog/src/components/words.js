import React, { useState, useEffect } from 'react'
import { List, Input, message } from 'antd'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import '../static/components/word.css'

const Words = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        getWord();
    }, [])
    let time = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    let word = {}
    const getName = (e) => {
        word.name = e.target.value;
        return word
    }
    const getContent = (e) => {
        word.content = e.target.value;
        return word;
    }
    const getWord = () => {
        axios(servicePath.getWordsList)
            .then(res => {
                setList(res.data.data)
            })
    }
    const clear = (e) => {
        e.target.value = ''
    }
    const addWordList = () => {
        if (!word.name || !word.content) {
            message.error('请填写完整信息哦')
        }
        //拼接
        let params = '';
        for (let i in word) {
            params += i + '=' + word[i] + '&'
        }
        params = params.substr(0, params.length - 1);
        axios({
            method: 'post',
            url: servicePath.addWords,
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            if (res.data.isSuccess) {
                message.success('发表成功');
                getWord();

            } else {
                message.error('发表失败')
            }
        })
    }
    return (
        <div className='word-div common-box'>
            <div>
                <List itemLayout='vertical'
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <span>{`${time}--${item.name}说：${item.content}`}</span>
                        </List.Item>
                    )}
                >
                </List>
            </div>
            <form name='myForm'>
                <Input type='text' placeholder='你这么可爱，叫什么呢？' onChange={getName} onBlur={clear} /><br /><br />
                <Input type='text' placeholder='快来给博主留言吧' onKeyUp={getContent} onBlur={clear} /><br /><br />
                <Input type='submit' value='提交' className='btn' onClick={addWordList} style={{
                    position: 'relative',
                    marginLeft: '-1%'
                }} /><br /><br />
            </form>
        </div>
    )
}
export default Words