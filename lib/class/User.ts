import { Rest } from '../got';
import { URLSearchParams } from 'url';
import { IParamUser, IRetriveUserSearch, IRetriveUsersResponse, IUser } from './../interfaces/User';
import { RosterObject, RosterItem } from '../interfaces/Roster';
import { Response } from 'got/dist/source';
import Helper from '../helper';

class User {
  private endPoint = 'users';
  constructor(private rest: Rest) {}

  /**
   * Retrieve users
   * @description Endpoint to get all or filtered users
   */
  async retriveUsers(query: IRetriveUserSearch): Promise<IRetriveUsersResponse> {
    const searchParams = new URLSearchParams(query as any);
    const users = (await this.rest.get(this.endPoint, {
      searchParams: searchParams.toString(),
    })) as IRetriveUsersResponse;
    return users;
  }

  /**
   * Retrieve a user
   * @description Endpoint to get information over a specific user
   */
  async retriveUser(username: string): Promise<IUser> {
    const url = `users/${username}`;
    const user = (await this.rest.get(url)) as IUser;
    return user;
  }

  /**
   * Create a user
   * @description Endpoint to create a new user
   */
  async createUser(
    data: IParamUser,
  ): Promise<{ statusMessage: string | undefined; statusCode: number }> {
    const { statusCode, statusMessage } = await this.rest.post(this.endPoint, {
      json: data,
    });
    return {
      statusCode,
      statusMessage,
    };
  }

  /**
   * Delete a user
   * @description Endpoint to delete a user
   */
  async deleteUser(username: string): Promise<{ body: object; statusCode: number }> {
    const endPoint = `users/${username}`;
    const { body, statusCode } = (await this.rest.delete(endPoint)) as Response;
    return {
      body: body as object,
      statusCode,
    };
  }

  /**
   * Update a user
   * @description Endpoint to update / rename a user
   */
  async updateUser(username: string, data: IParamUser): Promise<number> {
    const endPoint = `users/${username}`;
    const response = await this.rest.put(endPoint, { json: data });
    return response.statusCode;
  }

  /**
   * Retrieve all user groups
   * TODO : Add return type
   * @description Endpoint to get group names of a specific user
   */
  async getUserGroups(username: string): Promise<Object> {
    const url = `${this.endPoint}/users/${username}/groups`;
    const groups = await this.rest.get(url);
    return groups;
  }

  /**
   * Add user to group
   * @description Endpoint to add user to a group
   */
  async addUserToGroup(username: string, groupname: string): Promise<number> {
    const url = `${this.endPoint}/${username}/groups/${groupname}`;
    const { statusCode } = await this.rest.post(url);
    return statusCode;
  }

  /**
   * Delete a user from a group
   * TODO add types
   * @description Endpoint to remove a user from a group
   */
  async deleteUserFromGroup(username: string, groupname: string): Promise<number> {
    const url = `${this.endPoint}/${username}/groups/${groupname}`;
    const { statusCode } = await this.rest.delete(url);
    return statusCode;
  }

  /**
   * Lockout a user
   * @description  Endpoint to lockout / ban the user from the chat server.
   * The user will be kicked if the user is online.
   */
  async lockoutUser(username: string): Promise<number> {
    const url = `lockouts/${username}`;
    const { statusCode } = await this.rest.post(url);
    return statusCode;
  }

  async unlockUser(username: string): Promise<number> {
    const url = `lockouts/${username}`;
    const { statusCode } = await this.rest.delete(url);
    return statusCode;
  }

  /**
   * Delete a user from a groups
   * TODO add types
   * @description Endpoint to remove a user from a groups
   */
  async deleteUserFromGroups(username: string): Promise<Object> {
    const url = `${this.endPoint}/${username}/groups`;
    const { body, statusCode } = (await this.rest.delete(url)) as Response;
    return {
      body: body as object,
      statusCode,
    };
  }

  /**
   * Retrieve user roster
   * Endpoint to get roster entries (buddies) from a specific user
   */
  async retriveUserRoster(username: string): Promise<RosterObject> {
    const endPoint = `${this.endPoint}/${username}/roster`;
    const rosters = (await this.rest.get(endPoint)) as RosterObject;
    return rosters;
  }

  /**
   * Create a user roster entry
   * !not working
   */
  async createUserRooster(username: string, rooster: RosterItem): Promise<number> {
    const url = `${this.endPoint}/${username}/roster`;

    const body = Helper.makeRoosterBody(rooster);
    console.log(body);
    const { statusCode } = await this.rest.post(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return statusCode;
  }
}

export default User;
