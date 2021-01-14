import React from "react";
import { Link } from "react-router-dom";
import { RiTrelloFill } from "react-icons/ri";
import { HiOutlineHome } from "react-icons/hi";
import { Button } from "../Button";
import { Logo } from "../layout/Logo";
// import { useOverlayToggler } from "../../hooks";
import { PropTypes } from "prop-types";

export const UserMenu = ({ userData }) => {
  return (
    <>
      <div className="level-left custom-top-menu-left">
        <Link to="/">
          <Button icon={<HiOutlineHome />} isDarkHover />
        </Link>
        <Button icon={<RiTrelloFill />} isDarkHover>
          Boards
        </Button>
        {/* <Button onClick={toggleDisplayOverlay}>Bakayaro button</Button>
        {showOverlay && <div ref={overlayRef}>Bakayaro</div>} */}
      </div>
      <div className="center">
        <Logo isLink={true} color="info-light" size="3" />
      </div>
      <div className="right has-text-info-light">
        <span>{userData.full_name}</span>
      </div>
    </>
  );
};

UserMenu.propTypes = {
  userData: PropTypes.object.isRequired,
};
