import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from './Carousel';

const mockImages = [
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg'
];

describe('Carousel', () => {
  it('renders all images as thumbnails', () => {
    render(<Carousel images={mockImages} title="Test Product" />);
    const thumbnails = screen.getAllByRole('tab');
    expect(thumbnails).toHaveLength(mockImages.length);
  });

  it('changes main image when thumbnail is clicked', () => {
    render(<Carousel images={mockImages} title="Test Product" />);
    const thumbnails = screen.getAllByRole('tab');
    
    fireEvent.click(thumbnails[1]);
    
    const mainImage = screen.getByAltText('Test Product - View 2 of 3');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', expect.stringContaining('image2.jpg'));
  });

  it('handles keyboard navigation correctly', () => {
    render(<Carousel images={mockImages} title="Test Product" />);
    const thumbnails = screen.getAllByRole('tab');
    
    // Focus first thumbnail
    thumbnails[0].focus();
    
    // Test right arrow
    fireEvent.keyDown(thumbnails[0], { key: 'ArrowRight' });
    expect(screen.getByAltText('Test Product - View 2 of 3')).toBeInTheDocument();
    
    // Test left arrow
    fireEvent.keyDown(thumbnails[1], { key: 'ArrowLeft' });
    expect(screen.getByAltText('Test Product - View 1 of 3')).toBeInTheDocument();
    
    // Test End key
    fireEvent.keyDown(thumbnails[0], { key: 'End' });
    expect(screen.getByAltText('Test Product - View 3 of 3')).toBeInTheDocument();
    
    // Test Home key
    fireEvent.keyDown(thumbnails[2], { key: 'Home' });
    expect(screen.getByAltText('Test Product - View 1 of 3')).toBeInTheDocument();
  });

  it('updates aria-selected state when changing images', () => {
    render(<Carousel images={mockImages} title="Test Product" />);
    const thumbnails = screen.getAllByRole('tab');
    
    fireEvent.click(thumbnails[1]);
    
    expect(thumbnails[1]).toHaveAttribute('aria-selected', 'true');
    expect(thumbnails[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('updates tabIndex when changing images', () => {
    render(<Carousel images={mockImages} title="Test Product" />);
    const thumbnails = screen.getAllByRole('tab');
    
    fireEvent.click(thumbnails[1]);
    
    expect(thumbnails[1]).toHaveAttribute('tabIndex', '0');
    expect(thumbnails[0]).toHaveAttribute('tabIndex', '-1');
  });
});