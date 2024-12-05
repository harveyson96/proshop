import express from 'express';
import Poll from '../models/Poll.js';

const router = express.Router()

// 
router.post('/', async(req, res) =>{
    try{
        const {question, options} = req.body
        if(!question || !options || options.length < 2){
            return res.status(400).json({message: 'Invalid input: Question and at least two options are required'})
        }
        const poll = new Poll({question, 
            options: options.map(opt =>({
            text: opt.text,
            votes: 0
        }))})
        await poll.save()
        res.status(201).json(poll)
    } catch(err){
        console.error("Error creating poll: ", err);  // Add this to check the error details
        res.status(500).json({message: 'server error'})
    }
})
router.get('/', async(req, res)=>{
    try{
        const poll = await Poll.find()
        if(!poll){
            return res.status(404).json({message: "Poll not found"})
        }
        res.json(poll)
    }
    catch(err){
        res.status(500).json({message: "server error"})
    
    }
})
router.get('/:id', async(req, res) =>{
    try{
        const poll = await Poll.findById(req.params.id)
        if(!poll){
            return res.status(404).json({message: "Poll not found"})
        }
        res.json(poll)
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})

router.post('./:id/vote', async (req, res)=>{
    try{
        const { optionIndex } = req.body
        const poll = await Poll.findById(req.params.id)
        if(!poll){
            return res.status(404).json({message: "Poll not found"})
        }
        if(optionIndex < 0 || optionIndex > poll.options.length){
            return res.status(400).json({massge: "Invalid option index"})
        }
        poll.options[optionIndex].votes += 1
        await poll.save()
        res.json(poll)
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})

router.get('./:id/results', async(req, res)=>{
    try{
        const poll = await Poll.findById(req.params.id)
        if(!poll){
            return res.status(404).json({message: "Poll not found"})
        }
        res.json({
            question: poll.question,
            options:  poll.options.map(({text, votes}) =>({ text, votes}))
        })
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})

export default router;