import { Rest } from '../got';
import { URLSearchParams } from 'url';
import { IParamUser, IRetriveUserSearch, IRetriveUsersResponse, IUser } from './../interfaces/User';
import { RosterObject } from '../interfaces/Roster';
import { Response } from 'got/dist/source';


class User {
    private endPoint = 'users';
    constructor(private rest: Rest) { }

    async retriveUsers(query: IRetriveUserSearch): Promise<IRetriveUsersResponse> {
        const searchParams = new URLSearchParams(query as any);
        const users = (await this.rest.get(this.endPoint, { searchParams: searchParams.toString() })) as IRetriveUsersResponse;
        return users;
    }
    async retriveUser(username: string): Promise<IUser> {
        const endPoint = `users/${username}`;
        const user = await this.rest.get(endPoint) as IUser;
        return user;
    }

    async createUser(data: IParamUser): Promise<{ statusMessage: string | undefined; statusCode: number }> {
        const endPoint = 'users';
        const { statusCode, statusMessage } = await this.rest.post(endPoint, { json: data }) as Response;
        return {
            statusCode,
            statusMessage,
        };
    }

    async deleteUser(username: string): Promise<{ body: object; statusCode: number }> {
        const endPoint = `users/${username}`;
        const { body, statusCode } = await this.rest.delete(endPoint) as Response;
        return {
            body: body as object,
            statusCode,
        };
    }

    async updateUser(username: string, data: IParamUser): Promise<IUser> {
        const endPoint = `users/${username}`;
        const response = await this.rest.put(endPoint, { json: data });
        const user = response.body as IUser;
        return user;
    }

    async retriveUserRoster(username: string): Promise<RosterObject> {
        const endPoint = `users/${username}/roster`;
        const rosters = await this.rest.get(endPoint) as RosterObject;
        return rosters;
    }


}


export default User;