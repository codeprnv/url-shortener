import { clerkClient } from '@clerk/express';

import { User } from '../models/User.js';

// This middleware syncs the authenticated user with your MongoDB database.
// It should be placed *after* the requireAuth middleware in the chain.
export const syncUser = async (req, res, next) => {
  // 1. Get the auth object by calling req.auth() as a function.
  const auth = req.auth();

  // 2. Check if the returned auth object or its userId is missing.
  if (!auth || !auth.userId) {
    return res
      .status(401)
      .json({ error: 'Not authorized, no user session found.' });
  }

  try {
    const clerkUser = await clerkClient.users.getUser(auth.userId);

    // console.log('Clerk User: ', clerkUser);

    if (!clerkUser) {
      return res.status(404).json({ error: 'User not found in Clerk!!' });
    }

    const {
      emailAddresses,
      firstName,
      fullName,
      id: clerkId,
      lastName,
      username,
    } = clerkUser;

    const primaryEmail = emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    const compositeName = `${firstName || ''} ${lastName || ''}`.trim();
    const userName = fullName || compositeName || username || 'New User';

    const user = await User.findOneAndUpdate(
      { clerkId: clerkId },
      {
        $set: {
          clerkId: clerkId,
          ...(primaryEmail && { email: primaryEmail }),
          username: userName,
        },
      },
      {
        new: true,
        setDefaultsOnInsert: true,
        upsert: true,
      }
    );

    // Attach the MongoDB user document to the request.
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error syncing user with the database: `, error);
    res.status(500).json({ error: `Error syncing user with the database.` });
  }
};
