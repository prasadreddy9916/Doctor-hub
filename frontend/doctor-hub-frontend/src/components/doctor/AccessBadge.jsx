import React from 'react';

/**
 * Displays a Lock or Unlock icon based on access permission.
 * @param {boolean} isAccessible - True if the doctor has access, False otherwise.
 */
const AccessBadge = ({ isAccessible }) => {
  return (
    <div className={`access-badge ${isAccessible ? 'unlocked' : 'locked'}`}>
      {isAccessible ? (
        <span title="You have access">🔓 Unlocked</span>
      ) : (
        <span title="Access Restricted">🔒 Locked</span>
      )}
    </div>
  );
};

export default AccessBadge;