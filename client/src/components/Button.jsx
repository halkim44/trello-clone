import React from "react";

export const Button = ({
  children = null,
  link,
  isDarkHover,
  icon = null,
  onClick,
}) => {
  return (
    <>
      {link ? (
        <a href={link}>
          <button className={`custom-btn ${isDarkHover ? "hover-darken" : ""}`}>
            {icon !== null && (
              <span
                className={`custom-btn-icon ${
                  children !== null ? "custom-btn--separate" : ""
                }`}
              >
                {icon}
              </span>
            )}
            {children}
          </button>
        </a>
      ) : (
        <button
          className={`custom-btn ${isDarkHover ? "hover-darken" : ""}`}
          onClick={onClick}
        >
          {icon !== null && (
            <span
              className={`custom-btn-icon ${
                children !== null ? "custom-btn--separate" : ""
              }`}
            >
              {icon}
            </span>
          )}
          <span>{children}</span>
        </button>
      )}
    </>
  );
};
