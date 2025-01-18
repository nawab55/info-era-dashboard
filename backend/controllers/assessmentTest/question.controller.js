const Question = require('../../models/assessmentTest_model/question.model');

// Add Questions
exports.addQuestions = async (req, res) => {
  const { questionType, background, questions } = req.body;
  try {
    const newQuestionSet = new Question({ questionType, background, questions });
    await newQuestionSet.save();
    res.status(201).json({ message: 'Questions added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving questions.', error });
  }
};

// Get Questions List
exports.getQuestionList = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions.', error });
  }
};

// Fetch questions by background
exports.getQuestionsByBackground = async (req, res) => {
  try {
    const { background } = req.query;

    if (!background) {
      return res.status(400).json({ message: "Background is required" });
    }
    const questionsByType = await Question.find({ background }).select('-__v'); // Exclude version key
    if (!questionsByType || questionsByType.length === 0) {
      return res.status(404).json({ message: 'No questions found for the given background.' });
    }
    res.status(200).json({
      message: 'Questions fetched successfully.',
      questionsByType,
    });

    // const rawQuestions = await Question.find({ background });
    // console.log("rawquestion details", rawQuestions);

    // // Simplify and structure the response
    // const structuredQuestions = rawQuestions.map((item) => ({
    //   questionId: item._id,
    //   questionType: item.questionType,
    //   questions: item.questions.map((q) => ({
    //     _id: q._id,
    //     question: q.question,
    //     options: q.options,
    //     correctAnswer: q.correctAnswer,
    //   })),
    // }));
    // console.log("structure question data ", structuredQuestions);
    // res.status(200).json({
    //   background,
    //   questionsByType: structuredQuestions,
    // });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions.', error: error });
  }
};
