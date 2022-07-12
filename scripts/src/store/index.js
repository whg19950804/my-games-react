import { createStore } from 'redux'
import reducer from './reducer'


// 创建数据仓库
const store = createStore(reducer)

export default store