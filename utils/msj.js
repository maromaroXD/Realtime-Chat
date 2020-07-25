const moment = require('moment');

const formatMessage = (name , text) => {
  return {
    name,
    text,
    time : moment().format('h:mma')
  }
};

module.exports = formatMessage;
