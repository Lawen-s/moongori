const { newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  const list = await newsPost.findAll({
    where: { user_Id: id },
    include: [{ model: user, attributes: ["nickname", "address"] }],
  });
  return res.status(200).json({ data: list, message: "ok" });
};
