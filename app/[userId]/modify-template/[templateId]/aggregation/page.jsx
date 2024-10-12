import { sql } from "@vercel/postgres";
import { EmptyComponent } from "../../../../components/EmptyComponent";

const Page = async ({ params: { templateId, userId } }) => {
  const { rows } =
    await sql`select * from questions where questions.template_id=${templateId} order by questions.index`;

  // console.log(rows);

  const Components = {
    number: async ({ children }) => {
      try {
        const {
          rows: [{ average }],
        } =
          await sql`select avg(answers.number) as average from answers where answers.question_id=${children.id}`;
        return (
          <div className="p-4 bg-base-300 w-full max-w-lg flex flex-col gap-2 rounded-lg border-t-4 border-blue-300">
            <h1 className="text-2xl font-bold">{children.title}</h1>
            <p>{children.description}</p>
            <span>
              <span>Average Value:</span> {parseFloat(average).toPrecision(3)}
            </span>
          </div>
        );
      } catch (e) {
        console.log(e);
        // toast.error("Error fetching data", { duration: 500 });
        return (
          <EmptyComponent>
            No value found for{" "}
            <span className="text-red-500 underline text-xl">
              {children.title}
            </span>
          </EmptyComponent>
        );
      }
      // console.log(typeof average);
    },
    checkbox: async ({ children }) => {
      try {
        const {
          rows: [{ count }],
        } =
          await sql`select count(answers.checkbox) as count from answers where answers.question_id=${children.id} and answers.checkbox=true`;
        return (
          <div className="p-4 bg-base-300 w-full max-w-lg flex flex-col gap-2 rounded-lg border-t-4 border-blue-300">
            <h1 className="text-2xl font-bold">{children.title}</h1>
            <p>{children.description}</p>
            <span>
              <span>Number of True Values:</span> {count}
            </span>
          </div>
        );
      } catch (err) {
        // console.log(err);
        // toast.error("Error fetching data", { duration: 500 });
        return (
          <EmptyComponent>
            No value found for{" "}
            <span className="text-red-500 underline text-xl">
              {children.title}
            </span>
          </EmptyComponent>
        );
      }
    },
    text: async ({ children }) => {
      try {
        const {
          rows: [{ mode }],
        } =
          await sql`select answers.text as mode from answers where answers.question_id=${children.id} group by answers.text order by count(answers.text) desc limit 1`;
        return (
          <div className="p-4 bg-base-300 w-full max-w-lg flex flex-col gap-2 rounded-lg border-t-4 border-blue-300">
            <h1 className="text-2xl font-bold">{children.title}</h1>
            <p>{children.description}</p>
            <span>
              <span>Most Frequent Value:</span> {mode}
            </span>
          </div>
        );
      } catch (err) {
        // console.log(err);
        // toast.error("Error fetching data", { duration: 500 });
        return (
          <EmptyComponent>
            No value found for{" "}
            <span className="text-red-500 underline text-xl">
              {children.title}
            </span>
          </EmptyComponent>
        );
      }
    },
    textarea: async ({ children }) => {
      try {
        const { rows } = await sql`
          select 
              unnest(string_to_array(answers.textarea,' ')) word,count(*) 
          from 
              answers 
          where 
              answers.question_id=${children.id} 
          group by 
              word 
          order by 
              count desc 
          limit 5
          `;
        return (
          <div className="p-4 bg-base-300 w-full max-w-lg flex flex-col gap-2 rounded-lg border-t-4 border-blue-300">
            <h1 className="text-2xl font-bold">{children.title}</h1>
            <p>{children.description}</p>
            <span>
              <span>
                Most Frequent Words:
                <div>
                  {rows.map((row, index) => (
                    <div className="badge badge-neutral m-2" key={index}>
                      {row.word}
                    </div>
                  ))}
                </div>
              </span>
            </span>
          </div>
        );
      } catch (err) {
        // console.log(err);
        // toast.error("Error fetching data", { duration: 500 });
        return (
          <EmptyComponent>
            No value found for{" "}
            <span className="text-red-500 underline text-xl">
              {children.title}
            </span>
          </EmptyComponent>
        );
      }
    },
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-8">
      <div>
        <h1 className="text-2xl font-bold">Aggregations</h1>
      </div>
      {rows.map((row, index) => {
        const Component = Components[row.type];
        return <Component key={index}>{row}</Component>;
      })}
    </div>
  );
};

export default Page;
