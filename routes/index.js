var express = require('express'),
    router = express.Router(),
    request = require('request'),
    config = require('../config'),
    nodemailer = require('nodemailer');

router.get('/', function(req, res) {
    res.render('layouts/about.html', {
        page: {
            title: 'About Jennifer Cahalane',
            description: 'So you want to know about Jennifer Cahalane',
            type: 'about'
        },
        nav: {
            about_state: 'is-active'
        }
    });
});

router.get('/about', function(req, res) {
    res.render('layouts/about.html', {
        page: {
            title: 'About Jennifer Cahalane',
            description: 'So you want to know about Jennifer Cahalane',
            type: 'about'
        },
        nav: {
            about_state: 'is-active'
        }
    });
});

router.get('/resume', function(req, res) {
    res.render('layouts/resume.html', {
        page: {
            title: 'Resume -- Jennifer Cahalane',
            description: 'The resume of Jennifer Cahalane',
            type: 'resume'
        },
        skills: config.SKILLS
    });
});

router.get('/create/post/:postId', function(req, res) {
    request.get('https://api.tumblr.com/v2/blog/cahalanejennifer.tumblr.com/posts?api_key=' + config.TUMBLR_API_KEY + '&id=' + req.params.postId,
        function (error, response, body) {
            var data = JSON.parse(body);
            var post = data.response.posts[Object.keys(data.response.posts)[0]]

            var regex =  /<h2>(.+)<\/h2>/;

            post.title = post.caption.match(regex) ? post.caption.match(regex)[1] : '';
            post.caption = post.caption.replace(regex, '');

            res.render('layouts/create-post.html', {
                page: {
                    title: 'Create -- ' + post.title,
                    description: 'The assorted creations of Jennifer Cahalane -- code, crochet, 3d models, and other art',
                    type: 'create'
                },
                post: post,
            });
        }
    );

});

router.get('/create', function(req, res) {
    request.get('https://api.tumblr.com/v2/blog/cahalanejennifer.tumblr.com/posts?api_key=' + config.TUMBLR_API_KEY,
        function (error, response, body) {
            var data = JSON.parse(body);
            // console.log(data.response.posts);
            res.render('layouts/create.html', {
                page: {
                    title: 'Create -- Jennifer Cahalane',
                    description: 'The assorted creations of Jennifer Cahalane -- code, crochet, 3d models, and other art',
                    type: 'create'
                },
                posts: data.response.posts
            });
        }
    );
});

router.get('/contact', function(req, res) {
    res.render('layouts/contact.html', {
        page: {
            title: 'Contact -- Jennifer Cahalane',
            description: 'How to get in touch with Jennifer Cahalane',
            type: 'contact'
        }
    });
});

router.post('/contact/send', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.USER_EMAIL, // Your email id
            pass: config.USER_PASSWORD // Your password
        }
    });

    var emailBody = req.body.message + ' // ' + req.body.name - req.body.email;

    var mailOptions = {
        from: req.body.email,
        to: 'cahalane.jennifer@gmail.com',
        subject: req.body.subject,
        text: emailBody
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            response = {
                response: {
                    status: 'error',
                    details: error
                }
            };
        } else{
            response = {
                response: {
                    status: 'success',
                    details: info.response
                }
            };
        }
        console.log(response);

        res.render('layouts/contact-success.html', {
            page: {
                title: 'Contact -- Jennifer Cahalane',
                description: 'How to get in touch with Jennifer Cahalane',
                type: 'contact'
            }
        });
    });
});

module.exports = router;