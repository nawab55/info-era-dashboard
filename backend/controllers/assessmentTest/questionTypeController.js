const QuestionType = require('../../models/assessmentTest_model/questionType.model');

// Add a new question type
exports.addQuestionType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Question type name is required' });
    }

    const existingType = await QuestionType.findOne({ name });
    if (existingType) {
      return res.status(400).json({ message: 'Question type already exists' });
    }

    const questionType = await QuestionType.create({ name });
    res.status(201).json({ message: 'Question type added successfully', data: questionType });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all question types
exports.getQuestionTypes = async (req, res) => {
  try {
    const questionTypes = await QuestionType.find();
    res.status(200).json(questionTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a question type
exports.deleteQuestionType = async (req, res) => {
  try {
    const { id } = req.params;

    const questionType = await QuestionType.findByIdAndDelete(id);
    if (!questionType) {
      return res.status(404).json({ message: 'Question type not found' });
    }

    res.status(200).json({ message: 'Question type deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
