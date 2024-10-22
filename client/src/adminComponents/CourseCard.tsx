import React, { useState } from "react"; 
import { FaShareAlt, FaTrash, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface CourseCardProps {
  title: string;
  thumbnail: string;
  category: string;
  price: string;
  description: string;
  moduleName: string;
  sectionName: string;
  isPublished: boolean;
  onDelete: () => void;
  onPublish?: () => void;
  extraButton?: JSX.Element;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  thumbnail,
  category,
  price,
  description,
  moduleName,
  sectionName,
  isPublished,
  onDelete,
  onPublish,
  extraButton,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeleteClick = () => {
    onDelete();
    toast.error("Course deleted successfully", { position: "top-right" });
  };

  const handlePublishClick = () => {
    if (onPublish) {
      onPublish();
      toast.success("Course published successfully", { position: "top-right" });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const truncatedTitle = truncateText(title, 30); 
  const truncatedCategory = truncateText(category, 15); 

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 w-full">
      <img src={thumbnail} alt={title} className="rounded-lg w-full h-40 object-cover mb-4" />
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold">{isExpanded ? title : truncatedTitle}</h3>
          <p className="text-gray-600">{isExpanded ? category : truncatedCategory}</p>
          <p className="text-gray-800 font-bold">{price}</p>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-gray-900">
            <FaShareAlt size={20} />
          </button>
          <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700">
            <FaTrash size={20} />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        {isExpanded ? (
          <>
            <FaAngleUp className="mr-2" /> Show Less
          </>
        ) : (
          <>
            <FaAngleDown className="mr-2" /> Show More
          </>
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 text-gray-700">
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Module:</strong> {moduleName}</p>
          <p><strong>Section:</strong> {sectionName}</p>
        </div>
      )}

      {!isPublished ? (
        <button
          onClick={handlePublishClick}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Publish
        </button>
      ) : null}
      {extraButton}
    </div>
  );
};

export default CourseCard;
