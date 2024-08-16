class User {
  static async getUserDetails() {
    // TODO: Need to replace it with actual API Endpoint
    const response = await fetch('/data.json');
    const data = await response.json();
    const { user } = data;
    return { user };
  }
}

export default User;
