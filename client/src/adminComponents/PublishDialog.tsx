import { IoClose } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface DialogProps {
  onClose: () => void;
  onPublish: () => void;
  onPreview: () => void;
}

const PublishDialog: React.FC<DialogProps> = ({
  onClose,
  onPublish,
  onPreview,
}) => {
  const navigate = useNavigate();
  const handlePublishClick = () => {
    onPublish();
    toast.success("Course added successfully", {
      position: "top-right",
      duration: 2000,
    });
    setTimeout(() => {
      navigate("/admin-view-course");
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <Toaster />
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold ">Confirm the Action</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-200 p-1 rounded-full"
          >
            <IoClose size={24} />
          </button>
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to publish the course?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onPreview}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Preview
          </button>
          <button
            onClick={handlePublishClick}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 text-black"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishDialog;
