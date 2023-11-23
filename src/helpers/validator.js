class validator {
  static validateTaskInfo(taskdetails, TaskData) {
    let valueFound = TaskData.TaskManagerArray.some(
      (val) => val.id == taskdetails.id
    );
    if (valueFound) return false;
    return true;
  }
}

module.exports = validator;
