const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote')
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '549173',
    key: '2a40f3dcfa20c99ea069',
    secret: 'b528ea561677878b6a8e',
    cluster: 'ap1',
    encrypted: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
    	success: true,
    	votes: votes
    }));
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(vote => {

        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });

        return res.json({
            success: true,
            message: "Cảm ơn bạn đã bình chọn"
        });
    });
});

module.exports = router;