let express = require('express')
let router = express.Router();

router.get('/', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
})

module.exports = router;