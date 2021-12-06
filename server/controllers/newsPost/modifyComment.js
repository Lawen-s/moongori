const { comment } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const commentId = req.params.id;

  try {
    const commentInfo = await comment.findOne({
      where: { id: commentId },
    });
    if (commentInfo.user_Id !== id) {
      return res.status(403).json({ message: "It's not a user who wrote it." });
    }
    await comment.update(
      { comment: req.body.comment },
      {
        where: {
          id: commentId,
        },
      }
    );
    const payload = {
      id: commentId,
      user_Id: id,
      newsPost_Id: commentInfo.newsPost_Id,
      comment: req.body.comment,
    };
    return res.status(200).json({ data: payload, message: "modify comment!" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
