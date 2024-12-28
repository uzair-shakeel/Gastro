export const mockMessagesByRestaurant = {
  1: [
    {
      id: 1,
      sender: "RESTAURANT 1",
      content: "OFFER WAS UPDATED",
      details: 'SUMMARY:\nREPLACED "STEAK" WITH "FISH"',
      time: "11:55 AM",
      date: "11/28/2024",
      type: "update",
    },
    {
      id: 2,
      sender: "ME - FILIP",
      content: "REQUESTED OFFER",
      time: "11:24 AM",
      date: "11/28/2024",
      type: "request",
    },
    {
      id: 3,
      sender: "ME - FILIP",
      content: "OFFER APPROVED",
      time: "08:53 PM",
      date: "11/28/2024",
      type: "approval",
    },
  ],
  2: [
    {
      id: 1,
      sender: "RESTAURANT 2",
      content: "TABLE RESERVED",
      time: "12:30 PM",
      date: "11/28/2024",
      type: "info",
    },
  ],
  3: [
    {
      id: 1,
      sender: "RESTAURANT 3",
      content: "OFFER UNDER REVIEW",
      time: "10:00 AM",
      date: "11/28/2024",
      type: "review",
    },
  ],
};
