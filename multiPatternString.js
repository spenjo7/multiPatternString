class multiPatternString{	
	constructor( string){
		this._rgx = /\{([^{}]+)\}/ig
		this.fullString = string.trim()
		this._blanks = this._matchAll()

		return this
	}

	_matchAll(){
		let blanks = []

		this.fullString.matchAll(this._rgx)
			.forEach(( el, ind ) => {
				const pattern = el[0]
				const key = el[1]
				const value = ''
				blanks.push({ ind, pattern, key, value })
			})
		return blanks
	}

	setByIndex( ind, val ){
		const { length } = this._blanks
		if ( ind < 0 || ind >= length ){
			console.error(`Out of bounds index: ${ind} for length ${length}`)
			return
		}
		this._blanks[ind].value = val
	}

	setByKey( key, val ){
		const keys = this._blanks.map( el => el.key )
		const ind = keys.indexOf(key)

		if ( ind < 0 ){
			let keyList = keys.join(', ')
			console.error(`Invalid key: ${key} for [ ${keyList} ]`)
			return
		}
		this._blanks[ind].value = val
	}

	toString(){
		let string = this.fullString
		this._blanks.forEach( el => {
			const val = el.value.trim()
			
			if ( /[a-z\d]/ig.test(val) ){
				string = string.replace(el.pattern, val)
			}

		})

		return string
	}
	
}