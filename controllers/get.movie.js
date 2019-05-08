exports.get_movie = (req, res) => {
    console.log(req.query.id);
    // console.log(req.useragent);
    if (req.useragent.isAndroid) {
        res.redirect('intent://URLHandler/#Intent;scheme=naradh;package=com.salam.naradh;S.payload=type%3Dmovies%26%26id%3D' + req.query.id + ';end')
    } else {
        var form = "<center><h3>Website is under constrution. Please use our android application.Download it from play store .Thank you</h3></center>" +
            "<center><a href='https://play.google.com/store/apps/details?id=com.salam.naradh'><img src='https://naaradh.in/uploads/download_play_store.png'></a></center>"
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(form);
    }
}