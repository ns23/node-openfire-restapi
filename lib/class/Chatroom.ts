/**
 * All the endpoints related to chatroom
 * @see https://www.igniterealtime.org/projects/openfire/plugins/1.3.8/restAPI/readme.html#chat-room-related-rest-endpoints
 */

import { Rest } from '../got';
import { Response } from 'got/dist/source';
import { IChatroom, Roles, ChatroomsTypes } from '../interfaces/Chatroom';

class Chatroom {
  private endPoint = 'chatrooms';
  constructor(private rest: Rest) {}

  async createChatroom(data: IChatroom): Promise<{ statusMessage: string | undefined; statusCode: number }> {
    const { statusCode, statusMessage } = (await this.rest.post(this.endPoint, {
      json: data,
    })) as Response;
    return {
      statusCode,
      statusMessage,
    };
  }

  async updateChatroom(data: IChatroom, servicename = 'conference'): Promise<number> {
    const url = `${this.endPoint}/${data.roomName}`;
    const response = await this.rest.put(url, {
      searchParams: {
        servicename,
      },
    });

    return response.statusCode;
  }

  async getChatroom(roomname: string, servicename = 'conference'): Promise<IChatroom> {
    const url = `${this.endPoint}/${roomname}`;
    const room = (await this.rest.get(url, {
      searchParams: {
        servicename,
      },
    })) as IChatroom;

    return room;
  }

  async getChatroomParticipants(roomname: string, servicename = 'conference') {
    const url = `${this.endPoint}/${roomname}/participants`;
    const participants = (await this.rest.get(url, { searchParams: { servicename } })) as Object;
    return participants;
  }

  async getChatroomOccupants(roomname: string, servicename = 'conference'): Promise<Object> {
    const url = `${this.endPoint}/${roomname}/occupants`;
    const occupants = (await this.rest.get(url, { searchParams: { servicename } })) as Object;
    return occupants;
  }

  async getChatroomHistory(roomname: string, servicename = 'conference'): Promise<Object> {
    const url = `${this.endPoint}/${roomname}/chathistory`;
    const chatHistory = (await this.rest.get(url, { searchParams: { servicename } })) as Object;
    return chatHistory;
  }

  async getAllChatrooms(
    search: string = '',
    type: ChatroomsTypes = 'public',
    servicename = 'conference',
  ): Promise<Array<IChatroom>> {
    const url = `${this.endPoint}`;

    const rooms = (await this.rest.get(url, {
      searchParams: {
        servicename,
        search,
        type,
      },
    })) as Array<IChatroom>;

    return rooms;
  }

  async deleteChatroom(roomname: string, servicename = 'conference'): Promise<number> {
    const url = `${this.endPoint}/${roomname}`;
    const status = await this.rest.delete(url, { searchParams: { servicename } });
    return status.statusCode;
  }

  async addUserToChatroom(roomname: string, username: string, roles: Roles, servicename = 'conference') {
    const url = `${this.endPoint}/${roomname}/${roles}/${username}`;
    const { statusCode, statusMessage } = (await this.rest.post(url, {
      searchParams: { servicename },
    })) as Response;
    return {
      statusCode,
      statusMessage,
    };
  }

  async addGroupToChatroom(roomname: string, groupname: string, roles: Roles, servicename = 'conference') {
    const url = `${this.endPoint}/${roomname}/${roles}/${groupname}`;
    const { statusCode, statusMessage } = (await this.rest.post(url, {
      searchParams: { servicename },
    })) as Response;
    return {
      statusCode,
      statusMessage,
    };
  }

  async inviteUserToChatroom(roomname: string, username: string, reason = '') {
    const url = `${this.endPoint}/${roomname}/invite/${username}`;
    const body = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <mucInvitation>
            <reason>${reason}</reason>
        </mucInvitation>`;

    const resp = await this.rest.post(this.endPoint, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return {
      statusCode: resp.statusCode,
      statusMessage: resp.statusMessage,
    };
  }
}

export default Chatroom;
