const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async () => {
    const wxContext = cloud.getWXContext()

    return {
        appid: wxContext.APPID,
        openid: wxContext.OPENID
    }
}