export type Office = {
  id: number;
  officeName: string;
  location: string;
  description: string;
};

export type Login = {
  username: string;
  password: string;
};

export type PostBooking = {
  startDate: string;
  endDate: string;
  officeId: number;
};
