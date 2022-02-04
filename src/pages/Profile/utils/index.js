export function checkAdmin(username, adminData) {
    if (adminData.username === username) {
      return true;
    } else {
      return false;
    }
  }