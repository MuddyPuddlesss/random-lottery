import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Stepper, Button } from '@taroify/core'
import './index.less'
import homeImg from './../../assets/pointer.jpg'

const redpool = Array.from(new Array(34).keys()).slice(1); // 区间 1 - 33
const bluepool = Array.from(new Array(17).keys()).slice(1); // 区间 1 - 16
export default class Index extends Component {
  state = {
    showResult: false,
    openid: null,
    isSaved: false,
  }

  async componentDidMount() {
    const { result } = await Taro.cloud.callFunction({ name: 'login' })
    
    this.setState({
      openid: result?.openid,
    })
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
      showResult: false,
      isSaved: false,
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
  }

  formatTime(timestamp) {
    //日期
    var DD = String(timestamp.getDate()).padStart(2, '0'); // 获取日
    var MM = String(timestamp.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
    var yyyy = timestamp.getFullYear(); // 获取年

    // 时间
    const hh =  String(timestamp.getHours()).padStart(2, '0');       //获取当前小时数(0-23)
    const mm = String(timestamp.getMinutes()).padStart(2, '0');     //获取当前分钟数(0-59)
    const ss = String(timestamp.getSeconds()).padStart(2, '0');     //获取当前秒数(0-59)
    return yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
  }

  saveRecords() {
    if (this.state.isSaved) {
      Taro.showToast({
        title: '请勿重复存档',
        icon: 'error',
        duration: 1000
      })
      return;
    }
    const db = Taro.cloud.database()
    const { openid } = this.state
    const now = new Date()
    db.collection('records').add({
      data: {
        date: now.getTime(),
        dateString: this.formatTime(now),
        records: this.randomNumsList,
        openid: openid
      }
    }).then(() => {
      this.setState({
        isSaved: true
      })
      Taro.showToast({
        title: '存档成功',
        icon: 'success',
        duration: 1000
      })
    })
  }

  jumpToRecords() {
    Taro.navigateTo({
      url: `/pages/records/index?id=${this.state.openid}`
    })
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
        {this.state.showResult && <Button size='large' variant='text' color='info' onClick={() => this.saveRecords()}>号码存档</Button>}
        <View className='record-ball' onClick={() => this.jumpToRecords()}>存档记录</View>
      </View>
    )
  }
}