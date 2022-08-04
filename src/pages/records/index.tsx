import { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Loading, Divider } from "@taroify/core"
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
      <View>
        {this.state.isLoading}
        {
          this.state.isLoading
            ? <Loading size='24px'>加载中...</Loading>
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
