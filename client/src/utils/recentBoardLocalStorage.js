export function getRecentBoards(userId) {
  const data = JSON.parse(localStorage.getItem(`${userId}:fusionRecentBoards`));
  if (!data) {
    return [];
  }
  return data;
}
export function addRecentBoard(userId, data) {
  const oldData = getRecentBoards(userId);
  oldData.forEach((obj, i) => {
    console.log(obj.id);
    if (obj._id === data._id) {
      oldData.splice(i, 1);
      return;
    }
  });

  while (oldData.length > 2) {
    oldData.pop();
  }
  localStorage.setItem(
    `${userId}:fusionRecentBoards`,
    JSON.stringify([data, ...oldData])
  );
}

export function clearRecentBoards(userId) {
  localStorage.removeItem(`${userId}:fusionRecentBoards`);
}
