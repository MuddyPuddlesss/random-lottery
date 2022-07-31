import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Stepper } from '@taroify/core'
import './index.less'
import homeImg from './../../assets/pointer.jpg'

const redpool = Array.from(new Array(34).keys()).slice(1); // red ball 1 - 33
const bluepool = Array.from(new Array(17).keys()).slice(1); // red ball 1 - 36
export default class Index extends Component {
  state = {
    showResult: false,
  }

  count: number | string = 1
  lotteryList: any[] = []

  generateANoteLottery = () => {
    const redResult = this.randomSelect(redpool, 6)
    const blueResult = this.randomSelect(bluepool, 1)
    return {
      redBalls: redResult,
      blueBalls: blueResult
    }
  }

  randomSelect(source, m) {
    const result: number[] = [];
    const map = new Map();
    for (let i = 0, n = source.length; i < m; i++, n--) {
        const rIndex = ~~(Math.random() * n) + i;
        result[i] = map.get(rIndex) ?? source[rIndex];
        map.set(rIndex, map.get(i) ?? source[i]);
    }
    return result.sort((a, b) => a - b);
  }

  getLotterys = () => {
    this.setState({
      showResult: false
    })
    const { count } = this
    const lotteryResult: any[] = []
    for (let index = 0; index < count; index++) {
      lotteryResult.push(this.generateANoteLottery())
    }

    this.lotteryList = lotteryResult
    this.setState({
      showResult: true
    })
    console.log(this.lotteryList)
  }

  render () {

    return (
      <View className='wrapper'>
        <View className='header'>
          <Image src={homeImg} className='header-img' />
        </View>
        <View className='content'>
          <View className='content-count'>
            <Text className='content-count-text'>你想选几注(PS:最多5注)</Text>
            <Stepper size='26' max={5} onChange={(value) => this.count = value} />
          </View>
          <View className='content-btn' onClick={() => this.getLotterys()}>生成号码</View>
        </View>
        {
          this.state.showResult && (
            <View className='result'>
              {
                this.lotteryList.map((item, index) => {
                  return (
                    <View key={index} className='result-line'>
                      {item.redBalls.map(red => {
                        return (<View key={red} className='redBall'>{red}</View>)
                      })}
                      <View className='blueBall'>{item.blueBalls[0]}</View>
                    </View>
                  )
                })
              }
            </View>
          )
        }
      </View>
    )
  }
}