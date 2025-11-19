import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

// Mock next/link and framer-motion for testing
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
    header: ({ children, ...props }: { children: React.ReactNode }) => <header {...props}>{children}</header>,
    section: ({ children, ...props }: { children: React.ReactNode }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: { children: React.ReactNode }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: { children: React.ReactNode }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: { children: React.ReactNode }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAnimation: () => ({ start: jest.fn() }),
}));

jest.mock('react-intersection-observer', () => ({
  useInView: () => [jest.fn(), true],
}));

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />);
    expect(screen.getByText(/AI-Powered Marketing Platform/i)).toBeInTheDocument();
  });

  it('renders the call to action buttons', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Start Free Trial/i)).toBeInTheDocument();
    expect(screen.getByText(/Watch Demo/i)).toBeInTheDocument();
  });

  it('renders the features section', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Powerful Features/i)).toBeInTheDocument();
  });

  it('renders the benefits section', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Transform Your Marketing Results/i)).toBeInTheDocument();
  });

  it('renders testimonials', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Trusted by Industry Leaders/i)).toBeInTheDocument();
  });
});