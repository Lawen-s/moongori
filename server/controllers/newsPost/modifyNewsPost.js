const { newsPost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;

  const postOne = await newsPost.findOne({
    where: { id: postId },
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    const { category, content, location, img } = req.body;
    const payload = { category, content, location, img };
    let modification = await newsPost.update(payload, {
      where: { id: postId },
    });
    modification = await newsPost.findOne({ where: { id: postId } });
    return res
      .status(200)
      .json({ data: modification, message: "successful modification" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
