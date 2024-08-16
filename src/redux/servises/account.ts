class Account {
  static async getBalance() {
    // TODO: Need to replace it with actual API Endpoint
    const response = await fetch('/data.json');
    const data = await response.json();
    return data.balance;
  }

  static async getAccountStatement() {
    // TODO: Need to replace it with actual API Endpoint
    const response = await fetch('/data.json');
    const data = await response.json();
    return data.statement;
  }

  static async depositAmount() {
    // TODO: Need to replace it with actual API Endpoint
    return Promise.resolve();
  }

  static async withdrawAmount() {
    // TODO: Need to replace it with actual API Endpoint
    return Promise.resolve();
  }

  static async sendMoney() {
    // TODO: Need to replace it with actual API Endpoint
    return Promise.resolve();
  }
}

export default Account;
