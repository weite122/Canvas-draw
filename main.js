var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height);
}
download.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画儿'
  a.target = '_blank'
  a.click()
}


red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
  blue.classList.add('active')
}
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.add('active')
}

line.onclick = function() {
  lineWidth = 2
}
thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.closePath()
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.lineCap="round";// 设置所画线条结束的样式帽为圆形。这个很关键，不然在线条角度变化大的地方会出现断带。
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()

}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  // 特性检测
  if(document.body.ontouchstart !== undefined){
    // 触屏设备 苏菲就是个触屏设备啊哥
    canvas.ontouchstart = function(event){
      event.preventDefault()
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(event){
        var yyy = document.getElementById('xxx');
        var context = yyy.getContext('2d');
        var lineWidth = 5

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      console.log('摸完了')
      using = false
    }
  }else{
    // 非触屏设备
    canvas.onmousedown = function(event) {
      var x = event.clientX
      var y = event.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(event) {
      var x = event.clientX
      var y = event.clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(event) {
      using = false
    }
  }

}

 


