// import React from 'react';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
// import Stripe from './Stripe';

// const CartModal = ({ isOpen, onClose }) => {
//   // Dummy data for cart items (replace this with your actual cart data)
//   const cartItems = [
//     { id: 1, name: 'Card A', price: 5.99, quantity: 2 },
//     { id: 2, name: 'Card B', price: 3.49, quantity: 1 },
//     // Add more cart items as needed
//   ];

//   // Calculate the total price of the cart
//   const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="lg">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Your Cart</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           {/* Display cart items */}
//           {cartItems.map((item) => (
//             <div key={item.id}>
//               <p>{item.name}</p>
//               <p>Price: ${item.price.toFixed(2)}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//           ))}
//           {/* Display cart total */}
//           <p>Total: ${cartTotal.toFixed(2)}</p>
//           {/* Stripe payment component */}
//           <Stripe />
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={onClose}>
//             Close
//           </Button>
//           {/* Additional buttons or actions for the cart */}
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default CartModal;
