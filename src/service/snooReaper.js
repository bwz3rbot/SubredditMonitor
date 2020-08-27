const {
    RedditUser
} = require('snoowrap');

const
    snoowrap = require('../config/snoo-config').snoowrap,
    Snoostorm = require('snoostorm'),
    colors = require('colors'),
    dateFormat = require('dateformat'),
    sounds = require('./sounds')





let count = 0;
const watchSubreddit = function (subreddit, doPlaySound) {
    submissions = new Snoostorm.SubmissionStream(snoowrap, {
        subreddit: subreddit,
        limit: 1,
        pollTime: 2000
    })

    submissions.on("item", function (item) {
        

        if (doPlaySound) {
            sounds.playSound()
        }

        date = dateFormat(item.created)
        

        let redditObj = {
            author: 'u/'+item.author.name,
            title: item.title,
            selftext: item.selftext,
            created: date,
            url: item.url,
            permalink: 'https://www.reddit.com' + item.permalink
        }

        formatText(redditObj, count)
        count = count + 1;




    })
}

const formatText = function (redditObj, count) {

    let currentColor;
    if (count % 2) {
        currentColor = 'green'
    } else {
        currentColor = 'magenta'
    }

    date = new Date();
    formattedDate = dateFormat(date)
    console.log(

        '\nauthor: '+ redditObj.author[currentColor] +
        '\ntitle: ' + redditObj.title[currentColor] +
        '\nselftext: ' + redditObj.selftext[currentColor] +
        '\ncreated on: ' + redditObj.created[currentColor] +
        '\nseen on: ' + formattedDate[currentColor] +
        '\nurl: ' + redditObj.url[currentColor] + 
        '\npermalink: '+ redditObj.permalink[currentColor]
    )



}


module.exports = {
    watchSubreddit: watchSubreddit
}