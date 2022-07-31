import { Component } from 'react'
import './app.less'

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    // @ts-ignore
    return this.props.children
  }
}

export default App
