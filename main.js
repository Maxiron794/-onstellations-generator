stars = Math.floor(Math.random() * 15) + 5
debug = false
var p = []

function getDistance(x1, y1, x2, y2){
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))
}

class entity{
  constructor(x, y, radius, mass, id, list, index){
    this.x = x
    this.y = y
    this.radius = radius
    this.mass = mass
    this.distance = []
    this.id = id
    this.list = list
    this.index = index
    this.connections = []
  }

  setDistance(){
    for(var i = 0; i < this.list.length; i++){this.distance[i] = getDistance(this.x, this.y, this.list[i].x, this.list[i].y)}
  }

  sortArray(list){
    list.sort(function(a, b){return a.distance - b.distance})
  }

  drawToPoint(point){
    const ctx = document.getElementById(this.id).getContext('2d')
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
  }

  drawToListElement(index){
    let arr = this.distance.slice()
    arr.sort(function(a, b){return a - b})

    this.drawToPoint(this.list[this.distance.indexOf(arr[index])])
  }

  setConnections(){
    let howfar = Math.floor(Math.random()*2)+1
    let numberofcon = Math.ceil(Math.random()*2.1)

    for(var i = 0; i < numberofcon; i++){
      this.connections[i] = howfar + i
    }
  }

}

function draw(){
  const canvas = document.getElementById('bg-canvas');
  const height = window.innerHeight - 8;
  const width = window.innerWidth - 8;
  canvas.height = height;
  canvas.width = width;

  const ctx = canvas.getContext('2d');
  ctx.filter = "blur(1px)"
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = "#FFFFFF";
  
  for(var i = 0; i < stars; i++){ 
    p[i] = new entity(Math.floor(Math.random() * (width * 0.6)) + 0.2 * width,
    Math.floor(Math.random() * (height * 0.6)) + 0.2 * height, 5, 100, "bg-canvas", p, i)}


  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < p.length; i++){

    p[i].setDistance()
    p[i].setConnections()


    ctx.beginPath()
    ctx.arc(p[i].x, p[i].y, p[i].radius, 0, 6.4)
    ctx.fill()


    for(var k = 0; k < p[i].connections.length; k++){
      p[i].drawToListElement(p[i].connections[k])
    }


  }
  

}