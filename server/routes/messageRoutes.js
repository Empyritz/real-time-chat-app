const { addMsg, getAllMessages } = require('../controllers/messageController')
const router = require('express').Router();

router.post('/addmsg', addMsg)
router.post('/getmsg', getAllMessages)

module.exports = router