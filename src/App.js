import { useEffect, useState } from 'react';
import { message } from 'antd';


import './App.less';

// 初始化棋盘
const defaultMapList = [
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
]

// 控制移动的正确方向
let moveflag = 'right'


// keycode值
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
const TOP_KEY = 38;
const BOTTOM_KEY = 40;


function App() {

  const [snake, setSnake] = useState([{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }])
  const [mapList, setMapList] = useState(defaultMapList)

  useEffect(() => {
    drawSnake(snake);
  }, [])


  document.onkeyup = (e) => {

    move(e.keyCode || e.which)
  }

  /**
   * 键盘事件/控制蛇的移动
   * @param {number} keyCode 
   */

  const move = (keyCode) => {
    let newSnake = []
    if (keyCode == RIGHT_KEY && moveflag !== 'left') {
      moveflag = 'right'
      if ((snake[snake.length - 1].x + 1) > 9) {
        jedgeIsDie()
        return
      }
      snake.push({
        x: snake[snake.length - 1].x + 1,
        y: snake[snake.length - 1].y
      })
      snake.shift()

    } else if (keyCode == LEFT_KEY && moveflag !== 'right') {
      moveflag = 'left'
      if ((snake[snake.length - 1].x - 1) < 0) {
        jedgeIsDie()
        return
      }
      snake.push({
        x: snake[snake.length - 1].x - 1,
        y: snake[snake.length - 1].y
      })
      snake.shift()

    } else if (keyCode == TOP_KEY && moveflag !== 'bottom') {
      moveflag = 'top'
      if ((snake[snake.length - 1].y - 1) < 0) {
        jedgeIsDie()
        return
      }
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y - 1
      })
      snake.shift()
    } else if (keyCode == BOTTOM_KEY && moveflag !== 'top') {
      moveflag = 'bottom'
      if ((snake[snake.length - 1].y + 1) > 9) {
        jedgeIsDie()
        return
      }
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y + 1
      })
      snake.shift()
    } else {
      return
    }

    newSnake = snake

    setSnake(newSnake)
    drawSnake(newSnake);
  }

  /**
   * 边界
   * @param {void}  
   */

  const jedgeIsDie = () => {
    message.error('sorry, 您已阵亡！！！');
    setTimeout(() => {
      setSnake([])
      drawSnake([])
    }, 500)

    setTimeout(() => {
      console.log(snake);
    }, 1000)
  }

  /**
   * 随机食物
   * 
   */

  const randomFood = () => {

  }



  /**
   * 传入新的蛇坐标数组,画蛇
   * @param {Array} newSnake  新数组
   */

  const drawSnake = (newSnake = []) => {
    let newMaplist = JSON.parse(JSON.stringify(defaultMapList))

    newSnake.forEach((item) => {
      newMaplist[item.y][item.x].state = 1
    })


    setMapList(newMaplist)
  }


  /**
   * 
   * @returns 封装渲染蛇dom
   */
  const snakeMap = () => {
    let html = <>
      {mapList.map((item, idx) => {
        return <div className='map-item-y' key={idx} >
          {item.map((item_x, key) => {
            return <div className={item_x.state ? 'active-x map-item-x' : 'map-item-x'} key={key}></div>
          })}
        </div>
      })}
    </>

    return html

  }

  return (
    <div className="App">
      <div className='map-box'>
        {snakeMap()}
      </div>
    </div>
  );
}

export default App;
