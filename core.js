core = module.exports = {

	clear: function clear() {
		console.log('\033[2J')
	},

	cl: function cl(data) {
		console.log(data)
	},
	
	isObject: function isObject(x) {
		var query = (typeof x === 'object' && x !== null && x !== 'undefined' && x !== '') ? true : false
		return query
	},

	getModuleName: function getModuleName(path) {
		var arr = path.split('\\')
			,	name = arr[arr.length-1].split('.')[0]
		return name
	},

	pad: function pad(str, size) {
		var temp = ''
		for (var lop = 0, len = size; lop < len; lop ++) {
			temp += str
		}
		return temp
	},

	percent: function percent(sum) {
		return Math.round(sum*100)*100/100 + '%'
	},

	timeFn: function timeFn( fn, measurement, callback ) {
		var end, start, time, text
		start = new Date().getTime()
		fn()
		end = new Date().getTime()
		switch( measurement ) {
			case 's':
				time = (end - start) / 1000
				text = 'Completed in: ' + time + ' seconds.'
				callback(text)
				break;
			default:
				time = (end - start)
				text = 'Completed in: ' + time + ' milliseconds.'
				callback(text)
				break;
		}
	},

	asFormattedArray: function asFormattedArray(string, delimiter) {
		var array = []
		array = string.replace(/\s*,\s*/g, ',').split(delimiter)
		return array
	},

	compare: function compare( a, b ) {
		return a - b
	}
	
}