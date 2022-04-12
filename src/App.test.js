import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';

window.fetch = jest.fn(() => {
  const user = { name: 'Jack' };

  return Promise.resolve({
    json: () => Promise.resolve(user),
  });
});

describe('Testing App Component', () => {
  test('loading text is shown while API request is in progress', async () => {
    render(<App />);
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getQueryBy('Loading...'));
  });

  test("user's name is rendered", async () => {
    render(<App />);
    const userName = await screen.findByText('Jack');
    expect(userName).toBeInTheDocument();
  });

  test('error message is shown', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: 'Please Enter Something' });
    });

    render(<App />);

    const errorMessage = await screen.findAllByDisplayValue('Please Enter Something');
    expect(errorMessage).toBeInTheDocument();
  });
});