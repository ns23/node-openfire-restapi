import { Rest } from './got';
import User from './class/User';

interface OpenfireConstructor {
  apiUrl: string;
  secret: string;
  isJson: boolean;
}

class Openfire {
  private rest: Rest;
  public user: User;
  constructor(params: OpenfireConstructor) {
    const { apiUrl, secret, isJson = true } = params;
    this.rest = new Rest(apiUrl, secret);
    this.user = new User(this.rest);
  }
}

export default Openfire;
