import React from "react";

interface PreviewDialogProps {
  courseData: {
    courseTitle: string;
    courseDescription: string;
    thumbnail: File | null;
    courseCategory: string;
    coursePrice: string;
    sections: Array<{
      module: string;
      topics: Array<{
        name: string;
        videoURL: string;
        pdfURL: string;
        description: string;
      }>;
    }>;
  };
  onClose: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ courseData, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-sm shadow-lg w-11/12 md:w-1/3 max-h-[80vh] overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Course Preview</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{courseData.courseTitle}</h3>
          <p className="text-gray-700 mb-2">{courseData.courseDescription}</p>
          {courseData.thumbnail && (
            <img
              src={URL.createObjectURL(courseData.thumbnail)}
              alt="Course Thumbnail"
              className="mt-4 w-full h-auto rounded-md border border-gray-200 shadow-sm"
            />
          )}
          <div className="mt-4">
            <p className="font-semibold">Category: <span className="text-gray-600">{courseData.courseCategory}</span></p>
            <p className="font-semibold">Price: <span className="text-gray-600">{courseData.coursePrice}</span></p>
          </div>
        </div>
        
        <h4 className="text-lg font-semibold mb-2">Sections:</h4>
        {courseData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border-t border-gray-300 pt-2 mt-2">
            <h5 className="font-bold text-md text-purple-700">{section.module}</h5>
            {section.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="mt-2 p-2 border border-gray-200 rounded-md">
                <p className="font-semibold text-lg">{topic.name}</p>
                <p className="text-gray-700">{topic.description}</p>
                <p className="text-gray-600">Video URL: <a href={topic.videoURL} className="text-purple-600 underline">{topic.videoURL}</a></p>
                <p className="text-gray-600">PDF URL: <a href={topic.pdfURL} className="text-purple-600 underline">{topic.pdfURL}</a></p>
              </div>
            ))}
          </div>
        ))}
        
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewDialog;
