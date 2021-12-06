const { tradePost, user } = require("../../models");

module.exports = async (req, res) => {
  const { category } = req.params;
  const list = await tradePost.findAll({
    where: { category: category },
    include: [{ model: user, attributes: ["address"] }],
  });
  return res.status(200).json({ data: list });
};
