const addItem = (values, mode) => {
  if (!localStorage.getItem(mode)) {
    const myDATA = [values];
    localStorage.setItem(mode, JSON.stringify(myDATA));
  } else {
    let DATA = JSON.parse(localStorage.getItem(mode));
    localStorage.setItem(mode, JSON.stringify([...DATA, values]));
  }
};

export default addItem;
