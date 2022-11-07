const messageModel = require('../model/message.model');

const addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    console.log(from, to, message);
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: 'Message addedd successfully' });
    res.json({ msg: 'Failed to add messagge to the database' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getAllMsg = async (req, res, next) => {
  const { from, to } = req.body;
  try {
    console.log('hola');
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updtedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  addMsg,
  getAllMsg,
};
