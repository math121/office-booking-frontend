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
  officeId: number | undefined;
  userId: number | undefined;
};

export type BookingDetails = {
  id: number;
  startDate: string;
  endDate: string;
  office: Office;
  userObk: number;
};

export type DateEdit = {
  startDate: string;
  endDate: string;
};
