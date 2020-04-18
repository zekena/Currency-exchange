import React from "react";

function Footer() {
  return (
    <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Made by Zeyad Saber Refaei Kenawi</h5>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Social</h5>
          <ul>
            <li><a className="grey-text text-lighten-3" href="https://github.com/zekena/Currency-exchange">github repo</a></li>
            <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/zeyad-kenawi-b08448172/">Linkedin</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
