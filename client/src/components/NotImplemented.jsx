import React from "react";

export const NotImplemented = ({ children }) => {
  return (
    <div className="not-implemented-wrapper">
      {children}
      <div
        className="not-implemented-event-blocker"
        title="Feature is still not implemented"
      ></div>
    </div>
  );
};
