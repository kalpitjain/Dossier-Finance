import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="dossierFinance-footer">
      <p>Copyright ⓒ KJ {year}</p>
    </footer>
  );
}

export default Footer;
