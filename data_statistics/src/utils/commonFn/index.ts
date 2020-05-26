export class CommonFN {
    _doubleNUmber (value: number): string {
        return value < 10 ? `0${value}` : `${value}`
    }
    useTime (number: number): string {
        if(number >= 0) {
            let hh = Math.floor(number / 3600),
                mm = Math.floor((number - hh * 3600) / 60),
                ss = Math.floor((number - hh * 3600 - mm * 60) % 60);
            return `${this._doubleNUmber(hh)}:${this._doubleNUmber(mm)}:${this._doubleNUmber(ss)}`
        } else {
            return '00:00:00'
        }
    }
}

export default CommonFN