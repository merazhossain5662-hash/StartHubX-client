const getDateStatus = (myDateProps) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const myDate = new Date(myDateProps).setHours(0, 0, 0, 0);
  const expTime = myDate - today;
  const expDate = Math.ceil(expTime / (1000 * 60 * 60 * 24));
  return expDate;
};

export default getDateStatus;
