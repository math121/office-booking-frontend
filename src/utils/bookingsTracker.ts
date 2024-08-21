let eventId = 0;

export const createBookingId = () => {
  return String(eventId++);
};
