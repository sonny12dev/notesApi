const router = require('express').Router();
const NotesSchema = require('../models/note.model');
const { notesValidation } = require('../validation');

//router.use('/', (req, res) => res.send('You are on notes route'));

// CREATE - Add notes
router.post('/addNotes', async (req, res) => {

    //Data sanitation

    //Checks if min(6) required() string()
    //NOTES: Becareful in typing. I misspelled error to "erorr" and took me hours to figure it out.
    const { error } = await notesValidation(req.body);
    if(error) return res.status(400).json({ success: false, msg: error.details[0].message });

    // Check if already exist in database
    const titleExist = await NotesSchema.findOne({ notesTitle: req.body.notesTitle });
    if(titleExist) return res.status(400).json({ success: false, msg: 'Title already exist in Database.' });

    //Data to be submitted or posted
    const notesData = new NotesSchema({
        notesTitle: req.body.notesTitle,
        notesBody: req.body.notesBody
    });

    try{
        const savedNotes = await notesData.save();
        res.status(200).json({ success: true, data: savedNotes });
    }catch(err){
        res.status(400).json({ success: false, msg: err});
    }
});

// READ all - Get all notes or read all notes
router.get('/listNotes', async (req, res) => {
    try{
        const listNotes = await NotesSchema.find();
        //res.status(200).json({ success: true, data: listNotes });
        res.json(listNotes);
    }catch(err){
        res.status(400).json({ success: false, msg: err });
    }
});

// READ specific - Get specific note or read specific note
router.get('/listNotes/:noteId', async (req, res) => {
    try{
        const getSpecificNote = await NotesSchema.findById(req.params.noteId);
        res.status(200).json({ success: true, data: getSpecificNote });
    }catch(err){
        res.status(400).json({ success: false, msg: err });
    }
});

// UPDATE - Edit specific note
router.patch('/editNote/:noteId', async (req, res) => {
    try{
        const updatedNote = await NotesSchema.updateOne(
            { _id: req.params.noteId },
            { 
                $set: {
                    notesTitle: req.body.notesTitle,
                    notesBody: req.body.notesBody
                }
            });

            res.status(200).json({ success: true, data: updatedNote, title: req.body.notesTitle });
    }catch(err){
        res.status(400).json({ success: false, msg: err });
    }
});

// DELETE - Delete specific note
router.delete('/deleteNote/:noteId', async (req, res) => {
    try{
        const deletedNote = await NotesSchema.deleteOne({ _id: req.params.noteId });
        res.status(200).json({ success: true, data: deletedNote });
    }catch(err){
        res.status(400).json({ success: false, msg: err });
    }
});

module.exports = router;