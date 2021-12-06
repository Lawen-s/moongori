const { comment } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const commentId = req.params.id;

  const commentOne = await comment.findOne({
    where: { id: commentId },
  });
  if (commentOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    await comment.destroy({
      where: { id: commentId },
    });
    return res.status(200).json({ message: "success withdrawal" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
