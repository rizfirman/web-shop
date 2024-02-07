import { IconButton } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavLink = ({ children, route }) => {
  return (
    <IconButton as={ReactLink} px="2" py="1" rounded="md" to={route} variant="ghost">
      {children}
    </IconButton>
  );
};

export default NavLink;
