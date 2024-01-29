import React from 'react';

interface ConsoleSectionProps {
  output: string;
}

const ConsoleSection: React.FC<ConsoleSectionProps> = ({ output }) => {
  return <div style={{marginTop: 20}}><span style={{color: 'white'}}>Console Output:</span> <code>{output}</code></div>;
};

export default ConsoleSection;
