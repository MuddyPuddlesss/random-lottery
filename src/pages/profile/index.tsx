import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import type CustomTabBar from '../../custom-tab-bar'

export default class Index extends Component {
  pageCtx = Taro.getCurrentInstance().page

  componentDidShow () {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx)
    tabbar?.setSelected(1)
  }

  render () {
    return (
      <View className='index'>
        <Text>个人信息</Text>
      </View>
    )
  }
}