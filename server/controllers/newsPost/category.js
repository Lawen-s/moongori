const { newsPost, user } = require("../../models");
const { verify } = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {

  const cookie = req.cookies.accesstoken;
  const category = req.params.category;
  const page = req.query.page;
  let offset = 0;
  if (page > 1) {
    offset = 10 * (page - 1);
  }
  const allPostCount = await newsPost.count({ where: { category: category } });
  if (offset >= allPostCount) {
    return res.status(204).json({ message: "no more data" });
  }

  let list = await newsPost.findAll({
    where: { category: category },
    include: [{ model: user, attributes: ["nickname", "town"] }],
    order: [["createdAt", "DESC"]],
    limit: 10,
    offset: offset,
  });
  if (!cookie) {
    return res.status(200).json({ data: list, message: "ok" });
  } else {
    await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "invalid cookie. retry signin" });
      }
      const userInfo = await user.findOne({
        where: { id: data.id },
      });
      if (userInfo.address === null) {
        return res
          .status(400)
          .json({ message: "input address" })
          .redirect(`${process.env.ORIGIN}/mypage`);
      }
      const town = userInfo.town;
      list = await newsPost.findAll({
        where: { town: { [Op.like]: `${town}%` }, category: category },
        include: [{ model: user, attributes: ["nickname", "town"] }],
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: offset,
      });
      return res.status(200).json({ data: list, message: "ok" });
    });
  }
};
