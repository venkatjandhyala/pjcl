import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Component:Button:', () => {
  test('should render the component', () => {
    render(<Button label='test'/>);
  })

  test('should have button text as "test"', async () => {
    render(<Button label='test'/>);

    const buttonNode = await screen.getByRole('button');

    expect(buttonNode).toHaveTextContent('test')
  })
})