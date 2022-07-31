import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Tabbar } from "@taroify/core"
import { Records, BillOutlined, Contact } from "@taroify/icons"
import './index.less'

export default class Index extends Component {
  state = {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        iconType: <BillOutlined />,
        text: '首页',
        value: 0,
      },
      {
        pagePath: '/pages/records/index',
        iconType: <Records />,
        text: '记录',
        value: 1,
      },
      {
        pagePath: '/pages/profile/index',
        iconType: <Contact />,
        text: '我的',
        value: 2,
      }
    ]
  }

  switchTab(index, url) {
    this.setSelected(index)
    Taro.switchTab({ url })
  }

  setSelected (idx: number) {
    this.setState({
      selected: idx
    })
  }

  render() {
    const { list, selected } = this.state

    return (
      <View className='tab-bar'>
        <Tabbar defaultValue={selected}>
          {
            list.map((item, index) => {
              return (
                <Tabbar.TabItem
                  key={item.value}
                  icon={item.iconType}
                  value={item.value}
                  onClick={this.switchTab.bind(this, index, item.pagePath)}
                >
                  {item.text}
                </Tabbar.TabItem>
              )
            })
          }
        </Tabbar>
      </View>
    )
  }
}