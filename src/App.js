import React from 'react';
import TestProvider from './context';
import Home from './screens/Home';

const App = () => {
  return (
    <TestProvider>
      <Home />
    </TestProvider>
  );
};

export default App;
