var express = require('express'),
    router = express.Router();

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
        }
    });
});

router.get('/create', function(req, res) {
    res.render('layouts/create.html', {
        page: {
            title: 'Create -- Jennifer Cahalane',
            description: 'The assorted creations of Jennifer Cahalane -- code, crochet, 3d models, and other art',
            type: 'create'
        }
    });
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

module.exports = router;