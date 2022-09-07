function canSeeProcesses(user) {
  return user.role.permissions === 1;
}

export { canSeeProcesses };
