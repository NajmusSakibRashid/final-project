import TemplateNavbar from "../../../components/TemplateNavbar";
import { sql } from "@vercel/postgres";
import { EmptyComponent } from "../../../components/EmptyComponent";

const layout = async ({ children, params: { userId, templateId } }) => {
  const { rows } =
    await sql`select * from templates where owner=${userId} and id=${templateId}`;
  if (rows.length === 0) {
    return <EmptyComponent>Template not found</EmptyComponent>;
  }
  return (
    <div>
      <TemplateNavbar />
      {children}
    </div>
  );
};

export default layout;
