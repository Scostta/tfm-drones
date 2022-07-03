import React from 'react';
import { SectionContainer } from '../../components/core/UI/SectionContainer';
import { Plots } from './components/Plots';

export const Home: React.FC = () => {
  return (
    <SectionContainer>
      <Plots />
    </SectionContainer>
  );
};
