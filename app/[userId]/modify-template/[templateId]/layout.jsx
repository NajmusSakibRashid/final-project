import TemplateNavbar from "../../../components/TemplateNavbar";

const layout = ({ children }) => {
  return (
    <div>
      <TemplateNavbar />
      {children}
    </div>
  );
};

export default layout;
