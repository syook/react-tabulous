import React from 'react';

const icons = {
  filter: (
    <path
      d="M0.75 3C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H15.25C15.6642 4.5 16 4.16421 16 3.75C16 3.33579 15.6642 3 15.25 3H0.75ZM3 7.75C3 7.33579 3.33579 7 3.75 7H12.25C12.6642 7 13 7.33579 13 7.75C13 8.16421 12.6642 8.5 12.25 8.5H3.75C3.33579 8.5 3 8.16421 3 7.75ZM6 11.75C6 11.3358 6.33579 11 6.75 11H9.25C9.66421 11 10 11.3358 10 11.75C10 12.1642 9.66421 12.5 9.25 12.5H6.75C6.33579 12.5 6 12.1642 6 11.75Z"
      fill="#24292E"
    />
  ),
  down: <path d="m7 10 5 5 5-5z" />,
  plus: (
    <path
      d="M4.84375 1.25C4.96807 1.25 5.0873 1.29939 5.17521 1.38729C5.26311 1.4752 5.3125 1.59443 5.3125 1.71875V4.375H7.96875C8.09306 4.375 8.21231 4.42439 8.30019 4.51229C8.38812 4.6002 8.4375 4.71943 8.4375 4.84375C8.4375 4.96807 8.38812 5.0873 8.30019 5.17521C8.21231 5.26311 8.09306 5.3125 7.96875 5.3125H5.3125V7.96875C5.3125 8.09306 5.26311 8.21231 5.17521 8.30019C5.0873 8.38812 4.96807 8.4375 4.84375 8.4375C4.71943 8.4375 4.6002 8.38812 4.51229 8.30019C4.42439 8.21231 4.375 8.09306 4.375 7.96875V5.3125H1.71875C1.59443 5.3125 1.4752 5.26311 1.38729 5.17521C1.29939 5.0873 1.25 4.96807 1.25 4.84375C1.25 4.71943 1.29939 4.6002 1.38729 4.51229C1.4752 4.42439 1.59443 4.375 1.71875 4.375H4.375V1.71875C4.375 1.59443 4.42439 1.4752 4.51229 1.38729C4.6002 1.29939 4.71943 1.25 4.84375 1.25Z"
      fill="#4724D8"
    />
  ),
  'chevron-left': (
    <path
      d="M14.3598 6.64019L9.26517 11.7349C9.11872 11.8814 9.11872 12.1188 9.26517 12.2652L14.3598 17.3598C14.5961 17.5961 15 17.4288 15 17.0948V6.90536C15 6.57126 14.5961 6.40395 14.3598 6.64019Z"
      fill="#231F20"
    />
  ),
  'chevron-right': (
    <path
      d="M9.64017 6.64019L14.7348 11.7349C14.8813 11.8814 14.8813 12.1188 14.7348 12.2652L9.64017 17.3598C9.40392 17.5961 9 17.4288 9 17.0948V6.90536C9 6.57126 9.40394 6.40395 9.64017 6.64019Z"
      fill="#231F20"
    />
  ),
};

const Icon = ({ name, width, height, fill = 'none', className }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name]}
    </svg>
  );
};

Icon.defaultProps = {
  width: 16,
  height: 16,
};

export default Icon;
