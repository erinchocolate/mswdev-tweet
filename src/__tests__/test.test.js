import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { renderer } from 'react-test-renderer';
import App from '../App';
import CategoryFilter from '../App';
import TweetList from '../App';
import NewTweetForm from '../App';

//Header render test
test('should render header', () => {
  render(<App />);
  const headerElement = screen.getByTestId("header");
  expect(headerElement).toBeInTheDocument();
});

//Main render test
test('should render main section', () => {
  render(<App />);
  const headerElement = screen.getByTestId("main");
  expect(headerElement).toBeInTheDocument();
});

test('should render 6 categories', () => {
  render(<CategoryFilter />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem).toHaveLength(6);
});

test('should render 4 tweets', () => {
  render(<TweetList />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem).toHaveLength(4);
});

test('should form input tweets', () => {
  render(<NewTweetForm />);
  const input = screen.getByPlaceholderText(/Share your thought.../i);
  const testValue = "test";
  fireEvent.change(input, { target: { value: testValue } });
  expect(input.value).toBe(testValue);
});
