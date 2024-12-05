process.env.NODE_ENV = 'test'

import {use, expect} from 'chai';
import chaiHttp from 'chai-http';

import Poll from '../models/Poll.js';

import app from "../app.js"

const chai = use(chaiHttp)


describe('Pull API Routes', ()=>{
    beforeEach(async ()=>{
        await Poll.deleteMany({})
    })

    //test for creating new poll
    describe('POST /api/polls', ()=>{
        it('should create a new poll', (done)=>{
            const pollData = {
                question: "what is your favorite programming language",
                options: [
                    { text: "JavaScript"},
                    { text: "Python" },
                    { text: "C++"},
                    { text: "Java" }
                ] 
            }

            chai.request.execute(app).post('/api/polls').send(pollData).end((err, res) =>{
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('question').eql(pollData.question)
                expect(res.body.options).to.be.an('array').that.has.length(4)
                done()
            })
        })
        it('should return an error when question missing', (done) =>{
            const pollData = {
                options: [
                    { text: "JavaScript"},
                    { text: "Python"},
                    { text: "C++"},
                    { text: "Java"}
                ] 
            }

            chai.request.execute(app).post('/api/polls').send(pollData).end((err, res) =>{
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message').eql('Invalid input: Question and at least two options are required')
                done()
            })
        })
    })
    // Test fetching all polls
    describe('GET /api/polls', () => {
        it('should retrieve all polls',  async () => {
            // Add a poll to the database
            await Poll.create({
                question: "what is your favorite programming language",
                options: [
                    { text: "JavaScript", votes: 0},
                    { text: "Python" , votes: 0},
                    { text: "C++" , votes: 0},
                    { text: "Java" , votes: 0}
                ] 
            });

            chai.request.execute(app)
                .get('/api/polls')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                });
        });
    });

    // Test fetching a single poll
    describe('GET /api/polls/:id', () => {
        it('should retrieve a single poll by ID', async () => {
            const poll = await Poll.create({
                question: 'What is your favorite programming language?',
                options: [
                    { text: "JavaScript" , votes: 0},
                    { text: "Python" , votes: 0},
                    { text: "C++" , votes: 0},
                    { text: "Java" , votes: 0}
                ] 
            });

            chai.request.execute(app)
                .get(`/api/polls/${poll._id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('question').eql('What is your favorite programming language?');
                });
        });
    });

    // // Test deleting a poll
    // describe('DELETE /api/polls/:id', () => {
    //     it('should delete a poll by ID', async () => {
    //         const poll = await Poll.create({
    //             question: 'What is your favorite programming language?',
    //             options: [
    //                 { text: "JavaScript" },
    //                 { text: "Python" },
    //                 { text: "C++" },
    //                 { text: "Java" }
    //             ] 
    //         });

    //         chai.request.execute(app)
    //             .delete(`/api/polls/${poll._id}`)
    //             .end((err, res) => {
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.have.property('message').eql('Poll deleted successfully');
    //             });
    //     });
    // });
})