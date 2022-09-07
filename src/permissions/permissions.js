const codigo = 1;
function canSeeProcesses(user) {
  const found = user.role.permissions.find((element) => element == codigo);
  return found == codigo;
}

module.exports = {
  canSeeProcesses,
};
