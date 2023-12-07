import React, { useState } from 'react';

const Todo = ({  userData, handleUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(userData.description);

  const handleSave = () => {
    handleUpdate(userData.id, { description: editedDescription }, 'edit');
    setEditMode(false);
  };

  return (
    <div>
      <li className='list-group-item d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between align-items-center'>
          {editMode ? (
            <input
              type='text'
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          ) : (
            userData.description
          )}
        </div>
        <div>
          {editMode ? (
            <button className='btn btn-success btn-sm mx-2' onClick={handleSave}>
              Save
            </button>
          ) : (
            <>
              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={() => handleUpdate(userData.id, { completed: true }, 'edit')}
              >
                Complete
              </button>
              <button
                className='btn btn-danger btn-sm mx-2'
                onClick={() => handleUpdate(userData.id, { completed: true }, 'delete')}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    </div>
  );
}

export default React.memo(Todo);
