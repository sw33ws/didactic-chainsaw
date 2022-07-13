const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection