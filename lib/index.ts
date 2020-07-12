import { Rest } from './got';
import { URLSearchParams } from 'url';
import { Response } from 'got/dist/source';
import { IParamUser, IRetriveUserSearch, IRetriveUsersResponse, User } from './interfaces/User';
import { RosterObject } from './interfaces/Roster';

interface OpenfireConstructor {
  apiUrl: string;
  secret: string;
  isJson: Boolean;
}

class Openfire {
  private rest: Rest;
  constructor(params: OpenfireConstructor) {
    const { apiUrl, secret, isJson = true } = params;
    this.rest = new Rest(apiUrl, secret);
  }

  async retriveUsers(query: IRetriveUserSearch): Promise<IRetriveUsersResponse> {
    const searchParams = new URLSearchParams(query as any);
    const endPoint = 'users';
    const users = <IRetriveUsersResponse>await this.rest.get(endPoint, { searchParams: searchParams.toString() });
    return users;
  }

  async retriveUser(username: string): Promise<User> {
    const endPoint = `users/${username}`;
    const user = <User>await this.rest.get(endPoint);
    return user;
  }

  async createUser(data: IParamUser): Promise<{ statusMessage: string | undefined; statusCode: number }> {
    const endPoint = 'users';
    const { statusCode, statusMessage } = <Response>await this.rest.post(endPoint, { json: data });
    return {
      statusCode,
      statusMessage,
    };
  }

  async deleteUser(username: string): Promise<{ body: Object; statusCode: number }> {
    const endPoint = `users/${username}`;
    const { body, statusCode } = <Response>await this.rest.delete(endPoint);
    return {
      body: <Object>body,
      statusCode,
    };
  }

  async updateUser(username: string, data: IParamUser): Promise<User> {
    const endPoint = `users/${username}`;
    const user = <User>await this.rest.put(endPoint, { json: data });
    return user;
  }

  async retriveUserRoster(username: string): Promise<RosterObject> {
    const endPoint = `users/${username}/roster`;
    const rosters = <RosterObject>await this.rest.get(endPoint);
    return rosters;
  }
}

export default Openfire;
