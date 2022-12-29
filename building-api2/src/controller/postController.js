const { postServices } = require("../services/");
const { postRepository, userRepository } = require("../repository/");

exports.getAllPosts = async (req, res) => {
  try {
    const query = await postRepository.getAllPosts(req.body.userInfo.id);
    console.log(req.body.userInfo.id);
    res.status(200).json({
      status: "Success",
      message: "Successfully get all posts",
      data: query,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: err,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userUuid } = req.body;
    // const user = await userRepository.getByUuid(userUuid);
    const user = req.body.userInfo;
    const post = {
      name: req.body.name,
      data: req.body.data,
      userID: user.id,
    };
    await postServices.validateInput(post);
    const postCreated = await postRepository.createPost(post);

    res.status(200).json({
      status: "Success",
      message: "Successfully create post",
      data: postCreated,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err.message,
      data: err,
    });
  }
};
