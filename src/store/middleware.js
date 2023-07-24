// middleware.js

export const customMiddleware = (store) => (next) => (action) => {
  // perform any action-related or store-related logic here
  console.log('Middleware triggered:', action);
  return next(action);
};

// If you have multiple middleware, you can export them all here
// export const anotherCustomMiddleware = ...
