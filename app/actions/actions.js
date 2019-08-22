export const addPage = pageData => (
  {
    type: 'ADD_PAGE',
    payload: pageData,
  }
);

export const savePage = pageData => (
  {
    type: 'SAVE_PAGE',
    payload: pageData,
  }
);
