import React, { useState } from "react";
import { Modal, Input } from "antd";

const TaskEditModal = ({ visible, onClose, onSave, task }) => {
  const [taskName, setTaskName] = useState(task.text);

  const handleSave = () => {
    onSave(task.id, taskName); 
    onClose(); 
  };

  return (
    <Modal
      title="Edit Task"
      open={visible}
      onOk={handleSave}
      onCancel={onClose}
    >
      <Input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Edit task name"
      />
    </Modal>
  );
};

export default TaskEditModal;