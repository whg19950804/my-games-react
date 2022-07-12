import { useState, useEffect, useRef } from 'react'
import './sass/app.scss'
import Clild from './child'

const arr = ['足浴', '养生', '上网', '傻逼', '睡觉', '透批', '男拳', '日本', '泰国', '卡手机', '老八', '恰烟', '哈酒', '今天是怎么嘞', '还会遇见她么', 'emo', '打女人'];

const names = ['江某', '廖某', '付某', '刚子']
function App() {
  const [gType, setGType] = useState(0)
  const [timer, setTimer] = useState(null)
  const [xType, setXType] = useState('')
  const [xTimer, setXTimer] = useState(null)
  const [childNum, setChildNum] = useState('789')


  /**
   * 获取子组件的方法
   */
  const childRef = useRef(null)

  const fromChildFn = () => {
    childRef.current.clickFn()
  }

  useEffect(() => {
    setTimerFunc();
    setXnameTimerFunc()
  }, [])

  /**
   * @description 随机颜色
   */
  const getRandomColor = () => {
    const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#'
    for (let i = 0; i < 6; i++) {
      const item = colors[~~(Math.random() * colors.length)]
      color += item;
    }
    return color;
  }

  /**
   * @description 不停的选择类型
   */
  const setTimerFunc = () => {
    setTimer(setInterval(() => {
      genRandom();
    }, 30))
  }

  /**
   * @description 不停选择名字
   * @returns 
   */
  const setXnameTimerFunc = () => {
    setXTimer(setInterval(() => {
      genNameRandom()
    }, 30))
  }

  /**
   * @description 确定类型
   */
  const chooseType = () => {
    if (!timer && !xTimer) {
      setTimerFunc();
      setXnameTimerFunc()
      return;
    }
    clearInterval(timer);
    clearInterval(xTimer);
    setTimer(null);
    setXTimer(null);

    const bool = false;

    const arr = [
      { value: 1, label: '1' },
      ...(bool ? [{ value: 2, label: '2' }] : []),
      { value: 3, label: '3' },
    ]

    return arr;
  }

  /**
   * @description 随机选择类型
   */
  const genRandom = () => {
    const num = ~~(Math.random() * arr.length);
    setGType(num)
  }

  /**
   * @description 随机信子名字
   * @returns 
   */
  const genNameRandom = () => {
    const num = ~~(Math.random() * names.length)
    setXType(num)
  }

  /**
   * @description 构造出
   * @param {void} 不需要参数
   * @returns {html} 
   */
  const genGangzi = () => {


    const html = <>
      <button onClick={chooseType}>选择{names[xType]}类型</button>
      <h1>
        <span style={{ color: getRandomColor() }}>{arr[gType]}</span>
        <span>{names[xType]}</span>
        <br />
        <span onClick={() => {
          fromChildFn()
        }}>{childNum}</span>
      </h1>
    </>
    return html;
  }

  return (
    <div className="App">
      {genGangzi()}
      <Clild value={childNum} setChildNum={setChildNum} ref={childRef}></Clild>
    </div>
  );
}


export default App;
