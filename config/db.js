const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://phan:phan09041996@ds219051.mlab.com:19051/pusherpoll')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));