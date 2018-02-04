const electron = require('electron')

const {
    Tray,
    app,
    Menu
} = electron

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath)

        this.mainWindow = mainWindow
        this.on('click', this.onClick.bind(this))
        this.setToolTip('Time App')
        this.on('right-click', this.onRightClick.bind(this))
    }

    onClick(event, bounds) {
        //click event bounds
        const {
            x,
            y
        } = bounds
        //windows height and width
        const {
            height,
            width
        } = this.mainWindow.getBounds()
        const yPosition = process.platform === 'darwin' ? y : y - height

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide()
        } else {
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width
            });
            this.mainWindow.show()
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([{
            label: 'Quit',
            click: () => app.quit()
        }])

        this.popUpContextMenu(menuConfig)
    }
}

module.exports = TimerTray