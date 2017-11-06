export default {
  methods: {
    _onBridgeReady () {
      window.WeixinJSBridge && window.WeixinJSBridge.call('hideOptionMenu')
    }
  },
  mounted () {
    // 禁止微信的传播类按钮
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', this._onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', this._onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', this._onBridgeReady)
      }
    } else {
      this._onBridgeReady()
    }
  }
}
