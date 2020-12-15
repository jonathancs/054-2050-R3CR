const testFolder = 'C:/Users/Jonathan Casagrande/Downloads/cvs/toBeUploaded';
const fs = require('fs');

const positionNumber = '990'
const cvType = ''
let jobFit = ''

// will i have problems with assynchronicity?

// retake on:
//     switch '.net' for cvType
//     execute this and see if it goes right

//     3. 
//     put in the for loop
//     catch the cv array


fs.readdirSync(testFolder).forEach(file => {
    if (file.match('.net')) {
        fs.appendFile('D:/repo/054-2050-R3CR/configs/3uploadCVsConfigs.js', "'" + file + "'" + ',' + '\n', function (err, result) {
            if (err) console.log('error', err);
        });
    }
})

fs.appendFile('D:/repo/054-2050-R3CR/configs/3uploadCVsConfigs.js', ']'), function (err, result) {
    if (err) console.log('error', err)
}

module.exports = positionNumber
module.exports = jobFit