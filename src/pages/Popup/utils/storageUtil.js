export const setStorage = (key, value) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
};

export const getStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result[key]);
    });
  });
};

export const removeStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.remove([key], () => {
      resolve();
    });
  });
};