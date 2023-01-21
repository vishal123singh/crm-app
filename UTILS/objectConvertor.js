exports.objectConvertor = (users) => {
  const usersArr = [];
  users.forEach((user) =>
    usersArr.push({
      userId: user.userId,
      name: user.name,
      email: user.email,
      userType: user.userType,
      userStatus: user.userStatus,
    })
  );

  return usersArr;
};
