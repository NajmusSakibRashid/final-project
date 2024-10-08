import Link from "next/link";

const TemplateCard = ({ children }) => {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <figure>
        <img
          className="h-48 w-full object-cover"
          src={
            !children.image
              ? "https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg"
              : children.image
          }
          alt="Template"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{children.title}</h2>
        <p>{children.description.slice(0, 50)}...</p>
        <div className="card-actions justify-end">
          <Link href={`/template/${children.id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;