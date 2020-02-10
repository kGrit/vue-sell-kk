(function () {
  var viewport = document.querySelector('meta[name=viewport]')
  var passDeviceList = [/MiuiBrowser/i, /Redmi/i, /MI\s\d\w?\s/i, /HUAWEI/i, /walletapp/, /android\s4\.[0-2]/i, /android\s[1-3]/i]
  var pass = passDeviceList.some(function (item) {
    return item.test(navigator.userAgent)
  })
  if (pass) {
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,viewport-fit=cover')
    } else {
      document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,viewport-fit=cover">')
    }
    var clientWidth = document.documentElement.getBoundingClientRect().width || 0
    clientWidth = (window.innerWidth < clientWidth && window.innerWidth !== 0) ? window.innerWidth : clientWidth
    window.scaleInfo = {
      scaleRatio: clientWidth / 375,
      scaleType: 0
    }
    var fontSize = window.scaleInfo.scaleRatio * 50
    fontSize = fontSize || 50
    document.documentElement.style.cssText = 'font-size:' + fontSize + 'px!important;'
  } else {
    if (viewport) {
      viewport.setAttribute('content', 'width=375,user-scalable=0,viewport-fit=cover')
    } else {
      document.write('<meta name="viewport" content="width=375,user-scalable=0,viewport-fit=cover">')
    }
    window.scaleInfo = {
      scaleRatio: 2,
      scaleType: 1
    }
  }
  // var u=navigator.userAgent;
  // if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  //     if([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0){
  //       self.edgesForExtendedLayout = UIRectEdgeNone;
  //       self.extendedLayoutIncludesOpaqueBars = NO;
  //       self.modalPresentationCapturesStatusBarAppearance = NO;

  //       self.navigationController.navigationBar.barTintColor =[UIColor grayColor];
  //       self.tabBarController.tabBar.barTintColor =[UIColor grayColor];
  //     }
  // }
})()
