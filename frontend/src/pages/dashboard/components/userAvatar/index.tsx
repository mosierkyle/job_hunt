import React from 'react';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, lastName }) => {
  const initials = `${firstName[0]}${lastName[0]}`;

  const avatarStyle: React.CSSProperties = {
    backgroundColor: '#9d34da',
    color: '#fff',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: '400',
  };

  return <div style={avatarStyle}>{initials}</div>;
};

export default UserAvatar;
