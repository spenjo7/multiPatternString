class multiPatternString{	
	constructor( string ){
		this._rgx = /\{([^{}]+)\}/ig
		this.fullString = string.trim()
		this._blanks = this._matchAll()
		this._isLoud = false

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

	getKeyList(){
		return this._blanks.map( el => el.key )
	}

	getKeyIndex( key ){
		return this.getKeyList().indexOf(key)
	}

	hasKey( key ){
		return this.getKeyIndex( key ) < 0 ? false : true
	}

	setByIndex( ind, val ){
		const { length } = this._blanks
		const outOfBounds = ( ind < 0 || ind >= length )

		if ( !outOfBounds ){
			this._blanks[ind].value = val
			return this
		}

		if( this._isLoud ){
			console.error(`Out of bounds index: ${ind} for length ${length}`)
		}
		
		return this
	}

	setByKey( key, val ){
		const _hasKey = this.hasKey(key)

		if( _hasKey ){
			const ind = this.getKeyIndex(key)
			this._blanks[ind].value = val
			return this
		}

		if ( this._isLoud ){
			const keyList = this.getKeyList().join(', ')
			console.error(`Invalid key: ${key} for [ ${keyList} ]`)
		}

		return this
	}

	louder(){
		this._isLoud = true
		return this
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