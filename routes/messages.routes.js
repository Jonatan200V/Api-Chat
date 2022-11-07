const { Router } = require('express');
const { addMsg, getAllMsg } = require('../controllers/message.controller');

const router = Router();

router.post('/message', addMsg);
router.post('/allmsg', getAllMsg);
module.exports = router;
