export interface RosterItem {
  jid: string;
  nickname: string;
  subscriptionType: number;
  groups: any[];
}

export interface RosterObject {
  rosterItem: RosterItem[];
}
