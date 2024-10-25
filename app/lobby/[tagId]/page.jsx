import TemplateHolder from "../../components/TemplateHolder";

const Page = ({ params: { tagId } }) => {
  return (
    <div className="p-4">
      <h1 className="m-4 p-4 font-bold text-3xl bg-base-200">
        Welcome to the Lobby, here are the relevent templates
      </h1>
      <TemplateHolder>{`select templates.*,users1.username username from templates,templates_tags,tags,users1 where templates.id=templates_tags.template_id and tags.id=templates_tags.tag_id and tags.id=${tagId} and users1.id=templates.owner`}</TemplateHolder>
    </div>
  );
};

export default Page;
