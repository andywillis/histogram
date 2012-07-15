var data = require('./data').data
	,	core = require('./core')
	,	cl = core.cl
	,	fs = require('fs')
	,	path = './'
	, filename = 'temp.spo'

var offset = 0
	,	el = 0
	,	len = data.length
	,	bLen = len*3
	,	b = new Buffer(bLen)

while ( offset < len ) {
	b.write('13', offset, 'hex')
	offset ++
}

var offset = 0

var processListSpotmap = function(list, fn, object, additionalParameters, callback) {
  var elemNum = 0
  var arrLen = list.length
  var ArrayIterator = function() {
    fn(list[elemNum], elemNum, object, additionalParameters, function(object, iteration, additionalParameters){
      if (iteration === arrLen-1) callback(object)
      elemNum++
      if (elemNum < arrLen) process.nextTick(ArrayIterator)
    })
  }
  if (elemNum < arrLen) process.nextTick(ArrayIterator)
}

var createSpotmap = function(data, callback) {
	
	var rgba = data
		,	Canvas = require('canvas')
		,	processListSpotmap = require('./core').processListSpotmap
		,	rgbaLen = rgba.length
		,	spot = {
				size: 8
			,	border: 'rgba(120,120,120,1)'
			,	borderWidth: 0.1
			}
		,	o = []
		,	xpos = 0
		,	ypos = 0
		,	additionalParameters = [spot,xpos,ypos]

		o[0] = new Canvas(spot.size*60,(spot.size*rgbaLen)/60)
		o[1] = o[0].getContext('2d')

		var processSpotmapData = function(entry, iteration, o, additionalParameters, callback) {
			
			var spot = additionalParameters[0]
				,	xpos = additionalParameters[1]
				,	ypos = additionalParameters[2]

			if (iteration % 60 === 0 && iteration !== 0) {
				ypos = ypos + spot.size
				xpos = 0
			}

			o[1].beginPath();
			o[1].rect(xpos,ypos,spot.size,spot.size)
			o[1].fillStyle = 'rgba(' + entry + ', 1)'
			o[1].fill()
			o[1].lineWidth = spot.borderWidth
			o[1].strokeStyle = spot.border
			o[1].stroke()
			xpos = xpos + spot.size

			additionalParameters[1] = xpos
			additionalParameters[2] = ypos

			callback(o, iteration, additionalParameters)

		}

		processListSpotmap(rgba, processSpotmapData, o, additionalParameters, function(o) {
			callback(o[0])
		})
}


createSpotmap(data, function(image) {
	cl(image)
})








//fs.writeFile(path + filename, b)

/*
while ( el < len ) {
	str.push(data[el][0].toString(16))
	str.push(data[el][1].toString(16))
	str.push(data[el][1].toString(16))
	el ++
}

cl(str.join('').length)

*/