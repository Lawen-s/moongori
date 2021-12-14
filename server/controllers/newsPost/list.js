const { newsPost, user } = require("../../models");
const { verify } = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const page = req.query.page;
  let offset = 0;
  try {
    if (page > 1) {
      offset = 10 * (page - 1);
    }

    const allPostCount = await newsPost.count();
    if (offset >= allPostCount) {
      return res.status(204).json({ message: "no more data" });
    }

    let list = await newsPost.findAll({
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

        const town = data.town;
        list = await newsPost.findAll({
          where: { town: { [Op.like]: `${town}%` } },
          include: [{ model: user, attributes: ["nickname", "town"] }],
          order: [["createdAt", "DESC"]],
          limit: 10,
          offset: offset,
        });
        return res.status(200).json({ data: list, message: "ok" });
      });
    }
  } catch (err) {
    return res.status(500).json({ data: err, message: "error" });
  }
};
