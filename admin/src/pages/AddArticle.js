import React,{useState, useEffect} from 'react'
import marked from 'marked'
import '../static/css/addArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import 'antd/dist/antd.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input

const AddArticle = props => {
    // let time = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别

    useEffect(()=>{
        getTypeInfo();
        let tmpId = props.match.params.id;
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])
    //配置markdown格式
    marked.setOptions({
        renderer:marked.Renderer(),
        gfm:true,
        smartLists:true,
        smartypants:false,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false

    })
    //文章内容
    const changeContent = (e)=>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    //文章简介
    const changeIntroduce=(e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    //获得类别信息
    const getTypeInfo=()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*', ' Content-Type ':'application/json' },
            withCredentials:true
        }).then(res=>{
                    setTypeInfo(res.data.data)
        })
    }
    //选择文章类别
    const selectHandlerType = (value)=>{
        setSelectType(value)
    }
    //保存文章
    const saveArticle=()=>{
        if(selectedType === '请选择类型'){
            message.error('请选择文章类型')
            return false;
        }else if(!articleTitle){
            message.error('文章标题不能为空')
            return false;
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false;
        }else if(!introducemd){
            message.error('文章简介不能为空')
            return false;
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false;
        }
        let dataProps ={};
        dataProps.type_id = selectedType;
        dataProps.title= articleTitle;
        dataProps.article_cointent = articleContent;
        dataProps.introduce = introducemd;
        dataProps.addTime = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        if(articleId  === 0){
            dataProps.viewCount = 0;
            
            let params = '';
            for(let i in dataProps){
                params+=i+'='+dataProps[i]+'&'
            }
            params = params.substr(0,params.length-1)
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:params,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                withCredentials:true
            }).then(res=>{
                setArticleId(res.data.insertId)

                if(res.data.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('文章保存失败')
                }
            })
        }else{
            dataProps.id = articleId;
            let params = '';
            for(let i in dataProps){
                params+=i+'='+dataProps[i]+'&'
            }
            params = params.substr(0,params.length-1)
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:params,
                withCredentials:true
            }).then(res=>{
                if(res.data.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('文章保存失败')
                }
            })
        }



    }
    //根据id获取文章
    const getArticleById=(id)=>{
        axios(servicePath.getArticleById+id,{withCredentials:true}).then(res=>{
            let articleInfo = res.data.data[0];
            setArticleTitle(articleInfo.title)
            setArticleContent(articleInfo.context)
            let html  = marked(articleInfo.context)
            setMarkdownContent(html)
            setIntroducemd(articleInfo.introduce)
            let intro =marked(articleInfo.introduce)
            setIntroducehtml(intro)
            setShowDate(articleInfo.addTime)
            setSelectType(articleInfo.typeName)
        })
    }
    

        return (
            <div>
                <Row gutter={5}>
                    <Col span={18}>
                        <Row gutter={10} >
                            <Col span={20}>
                                <Input
                                    value={articleTitle}
                                    placeholder="博客标题"
                                    size="large" 
                                    onChange={e=>{setArticleTitle(e.target.value)}}
                                    />
                            </Col>
                            <Col span={4}>
                                &nbsp;
                        <Select defaultValue={selectedType} size="large" onChange={selectHandlerType} >
                            {
                                typeInfo.map((item,index)=>{
                                return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                })
                            }
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={10} >
                            <Col span={12}>
                                <TextArea
                                    className="markdown-content"
                                    rows={35}
                                    value={articleContent}
                                    placeholder="文章内容"
                                    onChange={changeContent}
                                />
                            </Col>
                            <Col span={12}>
                                <div
                                    className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Button size='large' onClick={saveArticle}>保存文章</Button>&nbsp;
                <Button size='large' type='primary' onClick={saveArticle}>发布文章</Button>
                                <br />
                            </Col>
                            <Col span={24}>
                                <br />
                                <TextArea rows={4} placeholder='文章简介' value={introducemd} onChange={changeIntroduce}></TextArea>
                                <br /><br />
                                <div className='introduce-html' dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                            </Col>
                            <Col span={12}>
                                <div className='date-select'>

                                    <DatePicker
                                    onChange={(date,dateString)=>{setShowDate(dateString)}}
                                        placeholder='发布日期'
                                        size='large'
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )

    }

    export default AddArticle
