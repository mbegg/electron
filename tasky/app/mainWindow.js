const electron = require('electron')

const{BrowserWindow} = electron

class MainWindow extends BrowserWindow{
    constructor(url) {
        super({
            height: 500,
            width: 300,
            frame: false,
            resizable: false,
            show: false,
            //setting background throttling to false allows app to run normally when window is hidden
            webPreferences: {backgroundThrottling:false}
        })
        this.loadURL(url)
        this.on('blur', this.onBlur.bind(this))
    }

    onBlur(){
        this.hide()
    }
}

module.exports = MainWindow