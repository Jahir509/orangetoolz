
const fs = require('fs');

/**
 * Function to process CSV file
 * **/
async function exportToCSV(data, filename) {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(filename);
        // writing data into csv file
        stream.write('firstname,lastname,city,state,zipcode,phone,email,ip\n');
        data.forEach((customer)=> {
            stream.write(`${customer.firstname},${customer.lastname},${customer.city},${customer.state},${customer.zipcode},${customer.phone},${customer.email},${customer.ip}\n`)
        })

        stream.on('finish', () => {
            resolve(true);
        });

        stream.on('error', (error) => {
            console.log(error)
            reject(error);
        });

        stream.end();
    });
}

module.exports = exportToCSV;
