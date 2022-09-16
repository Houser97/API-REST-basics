let express = require('express');

let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};
  
let messages = {
    1:{
      id: '1',
      text: 'Hellor World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
};

let result = {
    users,
    messages,
}

module.exports = result;
