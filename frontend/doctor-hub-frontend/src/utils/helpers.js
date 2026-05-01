/**
 * Format a date string to a readable format (e.g., "Oct 25, 2023")
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Truncate long text to a specific length
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get initials from a name (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Get file icon based on content type
 */
export const getFileIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'video': return '🎥';
    case 'image': return '🖼️';
    case 'seminar': return '📚';
    default: return '📄';
  }
};