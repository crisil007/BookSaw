



'use strict';

const user_type = require("../models/user_type");
module.exports = {
  up: (models, mongoose) => {
  
      return models.user_type.insertMany([
        {
          _id:"67932c9018ec5aaa81754e19",
          user_type:"admin"
        },
        {
          _id:"67932ca618ec5aaa81754e1a",
          user_type:"buyer"
        },
        {
          _id:"67932cba18ec5aaa81754e1b",
          user_type:"seller"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  
  },

  down: (models, mongoose) => {
    
      return models.user_type.deleteMany({
        _id : {
          $in :[
           "67932c9018ec5aaa81754e19" ,
           "67932ca618ec5aaa81754e1a" ,
           "67932cba18ec5aaa81754e1b",
        
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
