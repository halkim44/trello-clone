import { useState, useEffect } from 'react';

export const useUser = () => {
  const [ user, setUser ] = useState(null);

  return { user, setUser}
}