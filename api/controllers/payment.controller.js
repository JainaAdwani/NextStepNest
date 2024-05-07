// import React from 'react';
// import { razorInstance } from '../index.js';

// export const payOut = async (req, res, next) => {

//     if (req.listing.id !== req.params.id)
//     return next(errorHandler(401, 'You cant pay for this listing!'));
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.clearCookie('access_token');
//     res.status(200).json('User has been deleted!');
//   } catch (error) {
//     next(error);
//   }

// };
