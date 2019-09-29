const fs = require('fs');
const path = require('path');
const readline  = require('readline');

const filePath = path.join(__dirname, '../', '../', 'logs', 'access.log');

const readStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: readStream
}
)

let entrySum = 0;
let chromEntrySum = 0;

rl.on('line', (lineData) => {
    if (!lineData){
        return;
    }

    entrySum ++;
    let arr = lineData.split(' -- ');
    if (arr[2] && arr[2].lastIndexOf('Chrome')>0){
        chromEntrySum ++;
    }
})

rl.on('close', () => {
    console.log('Chrom per:', chromEntrySum/entrySum);
})