// 禁止右键
window.oncontextmenu=function(){
  console.log('right click')
  return false;
}

// 禁止鍵盤事件(防F12)
window.onkeydown = window.onkeyup = window.onkeypress = function () {
  console.log('key')
  window.event.returnValue = false;
  return false;
}

// 檢查到 debugMode 就無限跳中斷點
setInterval(function() {
  checkDebugMode();
}, 3000);
var checkDebugMode = function() {
  function doCheck() {
     (function() {}["constructor"]("debugger")())
     doCheck()
  }
  try {
     doCheck()
  }
  catch (err) {}
};
checkDebugMode();
