import { sql } from "@vercel/postgres";
import TemplateCard from "./TemplateCard";

const TemplateHolder = async ({ children }) => {
  const { rows } = await sql.query(children);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
      {rows.length > 0 &&
        rows.map((row, index) => (
          <TemplateCard key={index}>{row}</TemplateCard>
        ))}
    </div>
  );
};

export default TemplateHolder;
