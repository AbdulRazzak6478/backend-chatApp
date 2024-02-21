
// const {helper} = require('./helper-service');

function execute(){
    const result = false;
    return result ? "Learning Jest" : "Learning Node,React";
}
const helper = () => {
    const result = Math.floor(Math.random()*10);
    console.log('original helper')
    console.log('random value is  : ',result);
    return result % 2 == 0 ;
}
const executeRandom = () =>{
    const result = module.exports.helper();
    return result ? "Learning Jest" : "Learning Node,React";
}

function addition(a,b){
    try {
        const sum=a+b;
        if(typeof sum !== 'number')
        {
            throw "There is an Error";
        }
        
    } catch (error) {
        return "There is an Error";
    }
    return sum;
}

module.exports = {
    execute,
    addition,
    executeRandom,
    helper
}