import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { Stepper } from '@taroify/core'
import './index.less'
import homeImg from './../../assets/pointer.jpg'

const redpool = Array.from(new Array(34).keys()).slice(1); // 区间 1 - 33
const bluepool = Array.from(new Array(17).keys()).slice(1); // 区间 1 - 16
export default class Index extends Component {
  state = {
    showResult: false,
  }

  count: number | string = 1
  randomNumsList: any[] = []

  generateANoteRandomNums = () => {
    const redResult = this.randomSelect(redpool, 6)
    const blueResult = this.randomSelect(bluepool, 1)
    return {
      redNums: redResult,
      blueNums: blueResult
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

  getRandomNumss = () => {
    this.setState({
      showResult: false
    })
    const { count } = this
    const randomNumsResult: any[] = []
    for (let index = 0; index < count; index++) {
      randomNumsResult.push(this.generateANoteRandomNums())
    }

    this.randomNumsList = randomNumsResult
    this.setState({
      showResult: true
    })
    console.log(this.randomNumsList)
  }

  render () {

    return (
      <View className='wrapper'>
        <View className='header'>
          <Image src={homeImg} className='header-img' />
        </View>
        <View className='content'>
          <View className='content-count'>
            <Text className='content-count-text'>随机数组数(Max: 5)</Text>
            <Stepper size='26' max={5} onChange={(value) => this.count = value} />
          </View>
          <View className='content-btn' onClick={() => this.getRandomNumss()}>生成随机组合</View>
        </View>
        {
          this.state.showResult && (
            <View className='result'>
              {
                this.randomNumsList.map((item, index) => {
                  return (
                    <View key={index} className='result-line'>
                      {item.redNums.map(red => {
                        return (<View key={red} className='redNum'>{red}</View>)
                      })}
                      <View className='blueNum'>{item.blueNums[0]}</View>
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