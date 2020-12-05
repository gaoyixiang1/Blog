import React,{useState} from 'react'
import 'antd/dist/antd.css'
import '../static/css/Login.css'
import {Card,Input,Button,Spin,message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import servicePath from '../config/apiUrl'
import axios from 'axios'

const Login =props=>{
    const [userName,setUserName]=useState('');
    const [password,setPassword] =useState('')
    const [isLoding,setIsLoding] =useState(false)
    const checkLogin =()=>{
        setIsLoding(true);

        if(!userName||!password){
            message.error('信息不能为空')
            setTimeout(()=>{setIsLoding(false)},500)
            return ;
        }else if(userName.length<3 || password.length<6){
            message.error('信息格式不对')
            setTimeout(()=>{setIsLoding(false)},500)
            return ;
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        let params = '';
        for(let i in dataProps){
            params+=i+'='+dataProps[i]+'&'
        }
        params = params.substr(0,params.length-1)

        axios({
            method:'post',
            url:servicePath.checkLogin,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            data:params,
            withCredentials:true
        }).then(res=>{
            setIsLoding(false);
            if(res.data.error === 0){
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')    
            }else{
                message.error('用户名或密码错误')
            }
        })
    }
    return (
        <div className='login-div'>
            <Spin tip='Loading.....' spinning={isLoding}>
                <Card title='Candy blog' bordered={true} style={{width:400}}>
                    <Input
                    id={userName}
                    size="large"
                    placeholder="Enter your name"
                    prefix={<UserOutlined/>}
                    onChange={(e)=>{setUserName(e.target.value)}}
                    ></Input>
                    <br/>
                    <br/>
                    <Input
                    id={userName}
                    type="password"
                    size="large"
                    placeholder="Enter your password"
                    prefix={<LockOutlined/>}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/>
                    <br/>
                    <Button                   
                    type="primary"
                    size='large'
                    block
                    onClick={checkLogin}
                    >登陆</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login