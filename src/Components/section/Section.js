import React from 'react';

const Section = ({ title, children }) => (
  <>
    <h2 style={{padding: "16px 0"}}>{title}</h2>
    {children}
  </>
);

export default Section;
