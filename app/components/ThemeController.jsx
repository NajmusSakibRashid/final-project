"use client";

const ThemeContorller = () => {
  return (
    <div>
      <input
        type="checkbox"
        className="toggle theme-controller"
        onChange={(e) => {
          if (e.target.checked) {
            document
              .getElementsByTagName("html")[0]
              .setAttribute("data-theme", "dark");
            document
              .getElementsByTagName("body")[0]
              .classList.add("text-white");
          } else {
            document
              .getElementsByTagName("html")[0]
              .removeAttribute("data-theme");
            document
              .getElementsByTagName("body")[0]
              .classList.remove("text-white");
          }
        }}
      />
    </div>
  );
};

export default ThemeContorller;
