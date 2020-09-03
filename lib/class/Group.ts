import { Rest } from '../got';

/**
 * All api params related to groups
 * @see https://www.igniterealtime.org/projects/openfire/plugins/1.3.8/restAPI/readme.html#group-related-rest-endpoints
 */
class Group {
  private endPoint = 'groups';
  constructor(private rest: Rest) {}

  async retriveAllGroups(): Promise<Array<Object>> {
    const url = `${this.endPoint}`;
    const groups = (await this.rest.get(url)) as Array<Object>;

    return groups;
  }

  async retriveGroup(groupName: string): Promise<Array<Object>> {
    const url = `${this.endPoint}/${groupName}`;
    const group = (await this.rest.get(url)) as Array<Object>;

    return group;
  }

  async createGroup(name: string, description: string): Promise<number> {
    const url = `${this.endPoint}`;

    const body = this.getBody(name, description);

    const resp = await this.rest.post(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return resp.statusCode;
  }

  async deleteGroup(groupName: string): Promise<number> {
    const url = `${this.endPoint}/${groupName}`;
    const status = await this.rest.delete(url);
    return status.statusCode;
  }

  async updateGroup(groupName: string, updatedName: string, description: string): Promise<number> {
    const url = `${this.endPoint}/${groupName}`;
    const body = this.getBody(updatedName, description);
    const status = await this.rest.put(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return status.statusCode;
  }

  private getBody(name: string, description: string) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <group>
	    <name>${name}</name>
	    <description>${description}</description>
    </group>`;
  }
}

export default Group;
