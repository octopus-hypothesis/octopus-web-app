import React from "react";
import WebURI, { LocalizedLink } from "../urls/WebsiteURIs";

const LogInRequiredPage = () => {
  return (
    <div className="ui main text container">
      <div className="ui negative icon message">
        <i className="key icon" />
        <LocalizedLink to={WebURI.Login}>
          <div className="content">
            <div className="header">Log-in required</div>
            <p>Logging in via your ORCiD is required to post publications.</p>
          </div>
        </LocalizedLink>
      </div>
    </div>
  );
};

export const loginRequired = Child => props => {
  if (global.session.user === undefined) {
    return <LogInRequiredPage />;
  }

  return <Child {...props} />;
};

export default LogInRequiredPage;