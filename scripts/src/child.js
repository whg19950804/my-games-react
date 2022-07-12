import { useImperativeHandle, forwardRef } from 'react'
import './sass/child.scss'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import { useSelector } from 'react-redux';




function Child(props, ref) {

    
    useImperativeHandle(ref, () => ({
        clickFn
    }))
    const clickFn = () => {
        console.log('来自子组件的方法')
    }

    /**
     * 接收redux的值
     */
    const listReducer = useSelector(state => state)

    return (
        <div className="clild" onClick={() => { props.setChildNum('欣子洗脚') }}>
            <span>{props.value}</span>
            <br></br>
            <Input placeholder='随便写点什么吧' style={{ width: '200px' }} />
            <Button type='primary'>增加</Button>
            <List
                bordered
                header={<div>头部</div>}
                footer={<div>底部</div>}
                dataSource={listReducer.list}
                renderItem={item => (
                    <List.Item>{item}</List.Item>
                )}
            >

            </List>
        </div>

    )
}

export default forwardRef(Child);