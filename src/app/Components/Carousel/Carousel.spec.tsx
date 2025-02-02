// import { render, screen, fireEvent } from '@testing-library/react';
// import { ProductCarousel } from '../ProductCarousel/ProductCarousel';

// const mockImages = [
//   '/image1.jpg',
//   '/image2.jpg',
//   '/image3.jpg'
// ];

// describe('ProductCarousel', () => {
//   it('renders all images as thumbnails', () => {
//     render(<ProductCarousel images={mockImages} title="Test Product" />);
//     const thumbnails = screen.getAllByRole('button');
//     expect(thumbnails).toHaveLength(mockImages.length);
//   });

//   it('changes main image when thumbnail is clicked', () => {
//     render(<ProductCarousel images={mockImages} title="Test Product" />);
//     const thumbnails = screen.getAllByRole('button');
    
//     fireEvent.click(thumbnails[1]);
    
//     const mainImage = screen.getByAltText('Test Product - View 2');
//     expect(mainImage).toBeInTheDocument();
//     expect(mainImage).toHaveAttribute('src', mockImages[1]);
//   });

//   it('indicates current image in thumbnails', () => {
//     render(<ProductCarousel images={mockImages} title="Test Product" />);
//     const thumbnails = screen.getAllByRole('button');
    
//     fireEvent.click(thumbnails[1]);
    
//     expect(thumbnails[1]).toHaveAttribute('aria-current', 'true');
//     expect(thumbnails[0]).not.toHaveAttribute('aria-current', 'true');
//   });
// });