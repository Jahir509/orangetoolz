const fs =  require("fs");
const csv =  require("csv-parser");
const InvalidCustomer =  require("./invalidCustomer.model");
const Customer =  require("./customer.model");
const { program } = require("commander");

const db = require("./db");

async function importData(fileName,callback)
{

    const emailCheck = new Set();       // for duplicate email check
    const phoneCheck = new Set();       // for duplicate phone check
    let validatedFailed = 0;            // validation failed user count
    let duplicate = 0;                  // validation failed user count
    let valid = 0;                      // valid user count


    // Reading from csv file
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data',async(customer)=>{
            if(!validateEmail(customer.email) || !validatePhone(customer.phone)){
                validatedFailed++;
                await InvalidCustomer.create(customer);
                return;
            }

            if(emailCheck.has(customer.email) || phoneCheck.has(customer.phone)){
                duplicate++;
                return;
            }
            valid++;
            if(valid % 5000 === 0) console.log("Uploaded Customer: ",valid)
            emailCheck.add(customer.email);
            phoneCheck.add(customer.phone);
            await Customer.create(customer);

        })
        .on('error',callback)
        .on('end',callback)


}

// helper function for validating email
function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(String(email).toLowerCase());
}
// helper function for validating phone based on given format in document
function validatePhone(phone) {
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-. ]?\d{3}[-. ]?\d{4}$/;
    return phoneRegex.test(phone);
}

// used commander to give filename in while program run
program
    .arguments("<filename>","csv file with customer data")
    .action((filename)=>{
        db.connect().then(()=>{
            console.time('Upload Process Execution Time');
            importData(filename,() =>{
                console.log("done");
                console.timeEnd('Upload Process Execution Time');
                process.exit();
            })
        })
    })
    .parse(process.argv);
