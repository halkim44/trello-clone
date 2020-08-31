import React from 'react';
import { Link } from 'react-router-dom';


export const Logo = ({ isLink, color, size}) => (
  <>
  {isLink ? 
    <Link to="/" className={`logo has-text-${color} is-size-${size || 1}`}>
      Mello
    </Link>
    :
    <span className={`logo has-text-${color} is-size-${size || 1}`}>
      Mello
    </span>
    }
  </>
)