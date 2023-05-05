const Customer = require('./customer.model');
const InvalidCustomer = require('./invalidCustomer.model');
const exportAsCsv = require("./exportCsv");
const { program } = require("commander");
const db = require("./db");


async function exportData(callback){

    const isValidDataExported = await processData('valid');
    const isInValidDataExported = await processData('invalid');

    if(isValidDataExported && isInValidDataExported){
        callback('Process Completed');
    }

    callback('Process Unsuccessful');

}

// function to get valid customer
async function validCustomerData(totalPerFile,skipData=0){
    return Customer.find().skip(skipData).limit(totalPerFile);
}

// function to get invalid customer
async function invalidCustomerData(totalPerFile,skipData=0){
    return InvalidCustomer.find().skip(skipData).limit(totalPerFile);
}

// Processing data based on the type of customer
async function processData(dataTypeName='valid'){

    const batchSize = 100000
    const dataCount = dataTypeName === 'invalid' ? await InvalidCustomer.count() : await Customer.count();
    const batches = Math.ceil(dataCount/batchSize);

    for(let i=0; i < batches ; i++){
        const data = dataTypeName === 'invalid' ? await invalidCustomerData(batchSize) : await validCustomerData(batchSize,i*batchSize);
        const filename = `${dataTypeName}-customer-batch-${i+1}.csv`;

        const response = await exportAsCsv(data,filename)
        if(response === true){
            console.log(`${dataTypeName.toUpperCase()} User Export successful. Total Batch: $${batches} Completed: ${i+1} `);
        }
        else{
            throw new Error(`${response}`);
        }
    }

    return true;
}

// use commander to run program
program
    .action(()=>{
        db.connect().then(()=>{
            console.time("Total Execution Time");
            exportData((message)=>{
                console.log(message);
                console.timeEnd("Total Execution Time");
                process.exit();
            })
        })
    })
    .parse(process.argv);
