



// import { funcB } from './helper-service';
const {funcB} = require('./helper-service');

const funcA = () => {
  return funcB();
};
module.exports = {
    funcA
}