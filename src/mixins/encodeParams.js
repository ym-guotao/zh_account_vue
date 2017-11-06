export default {
  methods: {
    encodeParams (params) {
      return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      }).join('&')
    }
  }
}
