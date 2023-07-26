# eCommerce-frontEnd

## Authors: Reed Vogt, Kao Saelor, Reece Renninger, Ryan Eastman and Hayden Cooper

Project Description:
This repo will house our web app front end. This will be created using React and stylized with Chakra / Material UI. This react project will allow users to search popular trading cards to generate decks tied to unique user logins as well as shop for cards and allow purchase through Stripe. This application will be built with responsive components to allow for the possible implementation into a mobile app in the future.

## User Stories

![UserStories](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmw0ZDljNzFjOGpocGtrcHd0ZjF1d3BrdjV0bjdmemFzb3doM3J2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a08JEaLsJSAgP7da1j/giphy.gif)

1. **As a user, I want to be able to search for cards by name, so that I can find the cards I want to add to my deck.**

   - Acceptance Tests:
     - Given that a user enters a card name into the search bar, when they click the search button, then the cards matching the search term will be displayed.

2. **As an avid card collector, I want to be able to view my collection of cards, so that I can see what I might be missing.**

   - Acceptance Tests:
     - Given that a user is logged in, when they click the "My Collection" button, then they will be taken to a page that displays all of the cards they have collected.

3. **As a business owner, I want to be able to sell cards, so that I can make money.**

   - Acceptance Tests:
     - Given that a user is logged in, when they click the "Shop" button, then they will be taken to a page that displays all of the cards available for purchase.

4. **As a shopper, I want to be able to add cards to my cart, so that I can purchase them.**

   - Acceptance Tests:
     - Given that a user is logged in, when they click the "Add to Cart" button, then the card will be added to their cart.

5. **As a newcomer to card collection, I want to be able to explore a vast inventory of cards and see cost association with building a deck**

   - Acceptance Tests:
     - Given that a user is logged in, when they search through the card APIs they should be provided all necessary information to understand cost associated with an individual card.
