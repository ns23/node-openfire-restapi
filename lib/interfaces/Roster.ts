export interface RosterItem {
  jid: string;
  nickname: string;
  subscriptionType: number;
  groups: Array<string>;
}

export interface RosterObject {
  rosterItem: RosterItem[];
}
