const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: {'type': String, 'default': '!'},
    logChannel: {'type': String, 'default': '996673386266763274'},
    testChannel: {'type': String, 'default': '1007041529308790804'}
    
});

module.exports = mongoose.model('guild', guildSchema);