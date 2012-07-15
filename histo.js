var core = require('./core')
	,	cl = core.cl
	,	clear = core.clear
	,	compare = core.compare
	,	pad = core.pad
	,	data = require('./data').data
	,	http = require('http')
//	,	colorspaces = require('colorspaces')

clear()

//var rgb = colorspaces.make_color('sRGB', [200/255, 200/255, 244/255])
//cl(rgb.as('CIELAB'))


var len = data.length
	,	r = []
	, g = []
	, b = []

function array256(default_value) {
  arr = [];
  for (var i=0; i<256; i++) { arr[i] = default_value; }
  return arr;
}

var rvals = array256(0)
var bvals = array256(0)
var gvals = array256(0)
var lvals = array256(0)

var high = []
//var conv = colorspaces.converter('sRGB', 'CIEXYZ')
//cl(conv([255/255,255/255,255/255]))

for ( var el = 0, len = data.length; el < len; el ++ ) {
	var r = data[el][0]
		,	g = data[el][1]
		, b = data[el][2]
//		, l = (r+g+b)/3
//		, l = Math.round(conv([r/255,g/255,b/255])[1]*255)
//			,	l = Math.round((0.2126*r) + (0.7152*g) + (0.0722*b))
			,	l = Math.round((0.299*r) + (0.587*g) + (0.114*b))

	rvals[r]++
	gvals[g]++
	bvals[b]++
	lvals[l]++
}

rmax = Math.max.apply(null, rvals)
gmax = Math.max.apply(null, gvals)
bmax = Math.max.apply(null, bvals)
lmax = Math.max.apply(null, lvals)

//cl(lvals.slice(0).sort(compare))

var col = 255
	,	temp = ''
	,	port = 81
	,	height = 250
	,	bwidth = 5
	,	width = 256*bwidth

var chart = function(data, col, c, max) {

	var array = [], size = bwidth, x = 0, w = size, h = 0, y = 0

	array.push('<g style="opacity: 0.5">')
	for ( var el = 0, len = data.length; el < len; el ++ ) {

		var thisHeight = height - ((data[el] / max) * height)

		var bar = '<rect x="#{x}" y="#{y}" width="#{w}" stroke="rgba(#{fill},1)" fill="rgba(#{fill},1)" height="#{h}"/>'
			.replace('#{fill}', col)
			.replace('#{x}', x)
			.replace('#{y}', Math.round(thisHeight))
			.replace('#{w}', w)
			.replace('#{h}', ((data[el] / max) * height))
		array.push(bar)
		x += w

	}
	array.push('</g>')
	var squares = array.join('')
	return squares
}

var onRequest = function onRequest( req, res ) {

	var r = chart(rvals ,'255,0,0', 'r', rmax)
	var g = chart(gvals ,'0,255,0', 'g', gmax)
	var b = chart(bvals ,'0,0,255', 'b', bmax)
	var l = chart(lvals ,'0,0,0', 'l', lmax)
	var t = r + g + b + l

	var html = ''

	html += '<svg style="margin: 10px 0px 10px 0px" width="#{w}" height="#{h}" id="svg">#{bars}</svg>'.replace('#{bars}', t).replace('#{h}', height).replace('#{w}', width)
//	html += '<br/><svg style="margin: 10px 0px 10px 0px" width="#{w}" height="#{h}" id="svg1">#{bars}</svg>'.replace('#{bars}', g).replace('#{h}', height).replace('#{w}', 256*2)
//	html += '<br/><svg style="margin: 10px 0px 10px 0px" width="#{w}" height="#{h}" id="svg2">#{bars}</svg>'.replace('#{bars}', b).replace('#{h}', height).replace('#{w}', 256*2)
//	html += '<br/><svg style="margin: 10px 0px 10px 0px" width="#{w}" height="#{h}" id="svg2">#{bars}</svg>'.replace('#{bars}', l).replace('#{h}', height).replace('#{w}', 256*2)
	res.writeHead(200, {'Content-Type': 'text/html'})
	res.write(html)
	res.end()
}

var server = require('http').createServer(onRequest).listen(port)

console.log('Server listening on port ' + port)