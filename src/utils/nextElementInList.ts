const nextElementInList = <T>(list: T[], value: T) => {
  const currIndex = list.indexOf(value);
  const nextIndex = (currIndex + 1) % list.length;
  const changeNextAction = list[nextIndex];
  return changeNextAction;
};
export default nextElementInList;
