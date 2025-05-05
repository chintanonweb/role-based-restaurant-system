import { Permit } from 'permitio';

export const permit = new Permit({
  token: process.env.NEXT_PUBLIC_PERMIT_TOKEN,
  pdp: process.env.NEXT_PUBLIC_PERMIT_PDP_URL,
});

export const initializePermit = async () => {
  try {
    //permit operation
    // await permit.check({});
  } catch (error) {
    console.error('Failed to initialize Permit.io:', error);
  }
};
