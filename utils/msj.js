const moment = require('moment');

const formatMessage = (name , text) => {
  return {
    name,
    text,
    time : moment().format('h:MM A')
  }
};

module.exports = formatMessage;
