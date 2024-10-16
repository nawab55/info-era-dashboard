const Issue = require("../../models/notification_model/issue.model");
const User = require("../../models/user_model/User");

// Create a new issue
exports.createIssue = async (req, res) => {
  try {
    const userId = req.user._id; // Retrieve User Id from token
    const { description } = req.body;
    // Fetch employee information by _id // Ensure the user exists
    const user = await User.findById(userId);
    if(!user) {
        res.status(404).json({message: "User not found"});
    }

    const newIssue = new Issue({
      userId: user._id,
      empname: user.name,
      description,
    });

    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ error: "Failed to create issue" });
  }
};


// Get all issues
exports.getIssues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalIssues = await Issue.countDocuments();
    const issues = await Issue.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // const issues = await Issue.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json({ issues, totalPages: Math.ceil(totalIssues / limit), currentPage: page});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};

// Get all issues of user(employee)
exports.getIssuesByUserId = async (req, res) => {
  try {
    // const userId = req.user._id; // get user id from token
    // console.log(userId);
    const userId = req.params.userId;
    const issues = await Issue.find({userId}).sort({ createdAt: -1 }); // Sort by latest
    // console.log(issues);
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};

// Update issue status (Resolved or Unresolved)
exports.updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: "Failed to update issue status" });
  }
};
