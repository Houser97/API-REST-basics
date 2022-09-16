let express = require('express');
let router = express.Router();
const uuid = require('uuid');

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
    const id = uuid.v4();
    const message = {
        id: id,
        text: req.body.text,
        userId: req.context.me.id,
    };

    req.context.models.messages[id] = message;
    return res.send(message);
});

router.delete('/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.context.models.messages = otherMessages;

    return res.send(message);
});

router.put('/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages

    message.text = req.body.text

    req.context.models.messages = otherMessages;
    req.context.models.messages[message.id] = message;
  
    return res.send(req.context.models.messages[message.id])
})

module.exports = router;