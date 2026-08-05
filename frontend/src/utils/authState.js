let authInitialized = false;

let listeners = [];

export const setAuthInitialized = (value) => {
  authInitialized = value;

  listeners.forEach((listener) => listener(value));
};

export const isAuthInitialized = () => {
  return authInitialized;
};

export const subscribeAuthState = (listener) => {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter(
      (item) => item !== listener,
    );
  };
};