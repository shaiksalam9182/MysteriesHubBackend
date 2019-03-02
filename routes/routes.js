module.exports = (app) => {

    const regController = require('../controllers/register.controller');
    const loginController = require('../controllers/login.controller');
    const userController = require('../controllers/userdata.controller');
    const postController = require('../controllers/send.post');
    const readpostController = require('../controllers/read.post');
    const sendPlaceController = require('../controllers/send.place');
    const readPlacesController = require('../controllers/read.place');
    const sendAlienController = require('../controllers/send.alien');
    const readAlienController = require('../controllers/read.alien');
    const sendMovie = require('../controllers/send.movie');
    const readMovie = require('../controllers/read.movie');
    const sendFeedback = require('../controllers/feedback.controller');
    const readFeedback = require('../controllers/read.feedback');
    const sendmessage = require('../controllers/send.fcm');
    const likepost = require('../controllers/like.post');
    const likeplace = require('../controllers/like.place');
    const likealien = require('../controllers/like.alien');
    const likemovie = require('../controllers/like.movie');
    const dislikepost = require('../controllers/dislike.post');
    const dislikeplace = require('../controllers/dislike.place');
    const dislikealien = require('../controllers/dislike.alien');
    const dislikemovie = require('../controllers/dislike.movie');
    const updateVerification = require('../controllers/verification.controller');
    const userdata = require('../controllers/userdata.controller');
    const readNotifications = require('../controllers/read.notifications');
    const readLimitPost = require('../controllers/read.post.limit');
    const readLimitPlace = require('../controllers/read.place.limit');
    const readLimitAlien = require('../controllers/read.alien.limit');
    const readLimitMovie = require('../controllers/read.movie.limit');
    const demoUser = require('../controllers/demo.user');
    const demoPostLimit = require('../controllers/demo.post.limit');
    const demoPlaceLimit = require('../controllers/demo.place.limit');
    const demoAlienLimit = require('../controllers/demo.alien.limit');
    const demoMovieLimit = require('../controllers/demo.movie.limit');
    const demoPost = require('../controllers/demo.post');
    const demoPlace = require('../controllers/demo.place');
    const demoAlien = require('../controllers/demo.alien');
    const demoMovie = require('../controllers/demo.movie');

    const bodyParser = require('body-parser');

    var multer, storage, path, crypto;

    multer = require('multer');
    path = require('path');
    crypto = require('crypto');


    var form = "<!DOCTYPE HTML><html><body>" +
        "<form method='post' action='/upload' enctype='multipart/form-data'>" +
        "<input type='file' name='upload'/>" +
        "<input type='submit' /></form>" +
        "</body></html>";



    //configuring bodyparse to get request body
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(bodyParser.json());



    app.get('/', function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(form);

    });

    app.post('/register', regController.register);
    app.post('/login', loginController.login);
    // app.post('/users', userController.getUserData);
    app.post('/send_post', postController.send_post);
    app.post('/read_posts', readpostController.read_posts);
    app.post('/read_posts_limit', readLimitPost.read_posts_limit);
    app.post('/send_place', sendPlaceController.send_place);
    app.post('/read_places_limit', readLimitPlace.read_places_limit);
    app.post('/read_places', readPlacesController.read_places);
    app.post('/send_alien', sendAlienController.send_alien);
    app.post('/read_aliens', readAlienController.read_alien);
    app.post('/read_aliens_limit', readLimitAlien.read_alien_limit);
    app.post('/send_movie', sendMovie.send_movie);
    app.post('/read_movies', readMovie.read_moviese);
    app.post('/read_movies_limit', readLimitMovie.read_moviese_limit);
    app.post('/send_feedback', sendFeedback.sendFeedback);
    app.post('/read_feedback', readFeedback.readFeedback);
    app.post('/send_message', sendmessage.sendMessage);
    app.post('/like_post', likepost.like_post);
    app.post('/like_place', likeplace.like_place);
    app.post('/like_alien', likealien.like_alien);
    app.post('/like_movie', likemovie.like_movie);
    app.post('/dis_like_post', dislikepost.dis_like_post);
    app.post('/dis_like_place', dislikeplace.dis_like_place);
    app.post('/dis_like_alien', dislikealien.dis_like_alien);
    app.post('/dis_like_movie', dislikemovie.dis_like_movie);
    app.post('/verify', updateVerification.update_verify);
    app.post('/profile', userdata.getUserData);
    app.post('/read_notification', readNotifications.readNotifications);
    app.post('/demo_user', demoUser.demo_user);
    app.post('/demo_post_limit', demoPostLimit.demo_post_limit);
    app.post('/demo_place_limit', demoPlaceLimit.demo_place_limit);
    app.post('/demo_alien_limit', demoAlienLimit.demo_alien_limit);
    app.post('/demo_movie_limit', demoMovieLimit.demo_movie_limit);
    app.post('/demo_post', demoPost.demo_read_posts);
    app.post('/demo_place', demoPlace.demo_read_places);
    app.post('/demo_alien', demoAlien.demo_read_alien);
    app.post('/demo_movie', demoMovie.demo_read_moviese);




    var fs = require('fs');

    storage = multer.diskStorage({
        destination: __dirname,
        filename: function(req, file, cb) {
            return crypto.pseudoRandomBytes(16, function(err, raw) {
                if (err) {
                    return cb(err);
                }
                return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
            });
        }
    });


    // Post files
    app.post(
        "/upload",
        multer({
            storage: storage
        }).single('upload'),
        function(req, res) {
            console.log(req.file);
            console.log(req.body);
            res.redirect("/uploads/" + req.file.filename);
            console.log(req.file.filename);
            return res.status(200).send({
                image_url: req.file.filename
            })
        });

    app.get('/uploads/:upload', function(req, res) {
        file = req.params.upload;
        console.log(req.params.upload);
        var img = fs.readFileSync(__dirname + "/" + file);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img, 'binary');

    });


}