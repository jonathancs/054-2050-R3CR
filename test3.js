const testFolder = 'C:/Users/Jonathan Casagrande/Downloads/cvs/toBeUploaded'
const fs = require('fs')

fs.readdirSync(testFolder).forEach(file => {
    switch (file) {
        case '.net':
            console.log(file)
            break;
    
        default:
            break;
    }
})