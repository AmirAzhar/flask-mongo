const getAllJobs = {
  jobs: {
    "6289255cad386e9f5d2d2643": {
      _id: "6289255cad386e9f5d2d2643",
      company: "Visa",
      title: "Frontend Software Engineer",
      link: "visa.com",
      dateApplied: "22/05/2022",
      dateUpdated: "22/05/2022",
      status: "APPLIED",
      index: 0,
    },
    "62892566ad386e9f5d2d2644": {
      _id: "62892566ad386e9f5d2d2644",
      company: "ByteDance",
      title: "Full Stack Software Engineer",
      link: "tiktok.com",
      dateApplied: "22/05/2022",
      dateUpdated: "22/05/2022",
      status: "APPLIED",
      index: 1,
    },
    "6289294a5cb47b47548aae78": {
      _id: "6289294a5cb47b47548aae78",
      company: "PayPal",
      title: "Software Engineer",
      link: "paypal.com",
      dateApplied: "22/05/2022",
      dateUpdated: "22/05/2022",
      status: "APPLIED",
      index: 2,
    },
    "628929555cb47b47548aae79": {
      _id: "628929555cb47b47548aae79",
      company: "Meta",
      title: "Software Engineer",
      link: "facebook.com",
      dateApplied: "22/05/2022",
      dateUpdated: "22/05/2022",
      status: "APPLIED",
      index: 3,
    },
    "628929625cb47b47548aae7a": {
      _id: "628929625cb47b47548aae7a",
      company: "Google",
      title: "DevOps Software Engineer",
      link: "google.com",
      dateApplied: "22/05/2022",
      dateUpdated: "22/05/2022",
      status: "APPLIED",
      index: 4,
    },
  },
};

const getJobColumns = {
  columns: {
    APPLIED: {
      id: "APPLIED",
      jobs: [
        [0, "6289255cad386e9f5d2d2643"],
        [1, "62892566ad386e9f5d2d2644"],
        [2, "6289294a5cb47b47548aae78"],
        [3, "628929555cb47b47548aae79"],
        [4, "628929625cb47b47548aae7a"],
      ],
    },
    INTERVIEW: {
      id: "INTERVIEW",
      jobs: [],
    },
    OFFER: {
      id: "OFFER",
      jobs: [],
    },
    REJECTED: {
      id: "REJECTED",
      jobs: [],
    },
  },
  columnOrder: ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"],
};
