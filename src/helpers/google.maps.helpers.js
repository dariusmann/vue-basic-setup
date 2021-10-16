const GoogleMapsHelpers = {
  getWebMapUrl: function (query) {
    const encodedQueryParameter = encodeURIComponent(query)

    return 'https://www.google.com/maps/search/?api=1&query=' + encodedQueryParameter
  }
}

export default GoogleMapsHelpers
