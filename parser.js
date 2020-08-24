const fs = require('fs');

const parseData = (fileData) => {
    const content = fileData.split('\n');
    const validList = {}
    true_values = ['on', 'yes', 'true']
    false_values = ['off', 'no', 'false']

    for (let i = 0; i < content.length; i++) {
        let l = content[i];
        if (l !== '' && l[0] !== '#') {
            let pair = l.split('=');
            if (pair.length === 2) {
                let key = pair[0].trim();
                let value = pair[1].trim();
                if(!isNaN(value)){
                    validList[key] = parseFloat(value);
                    continue;
                }
                if (true_values.includes(value)) {
                    validList[key] = true
                    continue;
                }
                if (false_values.includes(value)) {
                    validList[key] = false;
                    continue;
                }
                validList[key] = value
            }
        }
    }

    return JSON.stringify(validList)
}

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(data)
        })
    })
}


const parseConfig = (filename) => {
    readFile(filename).then((data)=>{
        console.log(parseData(data));
    })
} 

parseConfig('sample1.cfg')
parseConfig('sample2.cfg')

