import { Avatar, Divider } from 'antd'
import React from 'react'
import '../static/components/author.css'
import { GithubOutlined, EditOutlined } from '@ant-design/icons'
const Author = () => {
    return (
        <div className='author-div common-box'>
            <div><Avatar size={100} src='https://upload.jianshu.io/users/upload_avatars/15251349/ed81e005-a74a-405b-8353-9d5a00a97ef7.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240' />
            </div>
            <div className='author-introduction'>
                不忘初心，方得始终
                <Divider>社交账号</Divider>
                <a href='https://github.com/gaoyixiang1'><Avatar size={28} icon={<GithubOutlined />} className='account' /></a>
                <a href='https://www.jianshu.com/u/d049723a7e49'><Avatar size={28} icon={<EditOutlined />} className='account' /></a>
            </div>
        </div>
    )
}
export default Author