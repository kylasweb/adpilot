import React from 'react';
import {
  render,
  userActions,
  waitForAsync,
  mockResponse
} from '../../../../../test-utils/test-utils.tsx';
import { ConfiguratorExample } from '../ConfiguratorExample';

describe('ConfiguratorExample', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Reset and setup fetch mock
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  it('renders without crashing', () => {
    const { container } = render(<ConfiguratorExample />);
    expect(container).toBeInTheDocument();
  });

  it('displays initial form values', () => {
    const { container } = render(<ConfiguratorExample />);
    
    const projectPrefixInput = container.querySelector('#projectPrefix') as HTMLInputElement;
    const defaultVisibilitySelect = container.querySelector('#defaultVisibility') as HTMLSelectElement;
    const requireApprovalSwitch = container.querySelector('#requireApproval') as HTMLInputElement;

    expect(projectPrefixInput.value).toBe('PRJ-');
    expect(defaultVisibilitySelect.value).toBe('private');
    expect(requireApprovalSwitch.checked).toBe(true);
  });

  it('handles input changes', async () => {
    const { container } = render(<ConfiguratorExample />);
    
    const projectPrefixInput = container.querySelector('#projectPrefix') as HTMLInputElement;
    await userActions.type(projectPrefixInput, 'TEST-');
    expect(projectPrefixInput.value).toBe('TEST-');
  });

  it('handles select changes', async () => {
    const { container } = render(<ConfiguratorExample />);
    
    const defaultVisibilitySelect = container.querySelector('#defaultVisibility') as HTMLSelectElement;
    await userActions.selectOption(defaultVisibilitySelect, 'team');
    expect(defaultVisibilitySelect.value).toBe('team');
  });

  it('handles switch changes', async () => {
    const { container } = render(<ConfiguratorExample />);
    
    const requireApprovalSwitch = container.querySelector('#requireApproval') as HTMLInputElement;
    await userActions.click(requireApprovalSwitch);
    expect(requireApprovalSwitch.checked).toBe(false);
  });

  it('submits form with correct values', async () => {
    const successResponse = mockResponse({ success: true });
    mockFetch.mockResolvedValueOnce(successResponse);

    const { container } = render(<ConfiguratorExample />);
    
    // Update form values
    const projectPrefixInput = container.querySelector('#projectPrefix') as HTMLInputElement;
    const defaultVisibilitySelect = container.querySelector('#defaultVisibility') as HTMLSelectElement;
    const requireApprovalSwitch = container.querySelector('#requireApproval') as HTMLInputElement;

    await userActions.type(projectPrefixInput, 'TEST-');
    await userActions.selectOption(defaultVisibilitySelect, 'team');
    await userActions.click(requireApprovalSwitch);

    // Submit form
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    await userActions.click(submitButton);

    // Wait for async operations
    await waitForAsync();

    // Verify save was called with correct values
    expect(mockFetch).toHaveBeenCalledWith('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectPrefix: 'TEST-',
        defaultVisibility: 'team',
        requireApproval: false
      })
    });
  });

  it('shows error message on save failure', async () => {
    const errorResponse = new Error('Failed to save');
    mockFetch.mockRejectedValueOnce(errorResponse);

    const { container } = render(<ConfiguratorExample />);
    
    // Submit form
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    await userActions.click(submitButton);

    // Wait for async operations
    await waitForAsync();

    // Verify error message is shown
    const errorMessage = container.querySelector('[role="alert"]');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage?.textContent).toContain('Failed to save');
  });

  it('disables submit button while saving', async () => {
    // Mock slow save operation
    mockFetch.mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => resolve(mockResponse({ success: true })), 100);
    }));

    const { container } = render(<ConfiguratorExample />);
    
    // Submit form
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    await userActions.click(submitButton);

    // Verify button is disabled during save
    expect(submitButton).toBeDisabled();

    // Wait for save to complete
    await waitForAsync(100);

    // Verify button is re-enabled
    expect(submitButton).not.toBeDisabled();
  });

  it('handles form reset', async () => {
    const { container } = render(<ConfiguratorExample />);
    
    // Update form values
    const projectPrefixInput = container.querySelector('#projectPrefix') as HTMLInputElement;
    await userActions.type(projectPrefixInput, 'TEST-');

    // Reset form
    const resetButton = container.querySelector('button[type="button"]') as HTMLButtonElement;
    await userActions.click(resetButton);

    // Verify values are reset
    expect(projectPrefixInput.value).toBe('PRJ-');
  });
});