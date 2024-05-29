export default [
  {
    id: 1,
    name: "default",
    img: "/default.jpg",
    value: "none",
    key: "none",
    style: {}
  },
  {
    id: 2,
    name: "border",
    img: "/border.png",
    value: "2px solid",
    key: "border",
    style: {
      border: "2px solid #333",
      transition: "border-color 0.3s ease",
      "&:hover": {
        borderColor: "#555"
      }
    }
  },
  {
    id: 3,
    name: "modern",
    img: "/modern.png",
    value: "none",
    key: "modern",
    style: {
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
        transform: "scale(1.02)"
      },
      "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)"
      }
    }
  }
];
