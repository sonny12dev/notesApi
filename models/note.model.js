const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    notesTitle: {
        type: String,
        required: true
    },
    notesBody: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Note', NotesSchema);