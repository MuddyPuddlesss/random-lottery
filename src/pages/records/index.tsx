import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Divider } from "@taroify/core"
import './index.less'

export default class Index extends Component {

  state = {
    isLoading: true,
  }

  recordsList: any[] = []

  onLoad (options) {
    const openid = options.id
    const db = Taro.cloud.database()
    db.collection('records').where({ openid }).get().then(res => {
      this.recordsList = res.data.reverse()
      this.setState({
        isLoading: false
      })
    })
  }


  render () {
    return (
      <View className={`wrapper ${ this.state.isLoading ? "wrapper-loading" : null}`}>
        {this.state.isLoading}
        {
          this.state.isLoading
            ? (
              <View className='loader'>
                <View className='loader-inner'>
                  <View className='loader-line-wrap'>
                    <View className='loader-line'></View>
                  </View>
                  <View className='loader-line-wrap'>
                    <View className='loader-line'></View>
                  </View>
                  <View className='loader-line-wrap'>
                    <View className='loader-line'></View>
                  </View>
                  <View className='loader-line-wrap'>
                    <View className='loader-line'></View>
                  </View>
                  <View className='loader-line-wrap'>
                    <View className='loader-line'></View>
                  </View>
                </View>
              </View>
            )
            : 
              (<View className='list'>
                {
                  this.recordsList.map((record, index) => {
                    return (
                      <View key={index} className='result-item'>
                        <Divider className='result-date'>
                        {record.dateString}
                        </Divider>
                        {
                          record.records.map((item, idx) => {
                            return (
                              <View key={idx} className='result-line'>
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
                  })
                }
              </View>)
        }
      </View>
    )
  }
}
