import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PublishDialog from "./PublishDialog";
import PreviewDialog from "./PreviewDialog";
import { useNavigate } from "react-router-dom";

const AddCourseForm: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [courseCategory, setCourseCategory] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [sections, setSections] = useState([
    {
      module: "",
      topics: [{ name: "", videoURL: "", pdfURL: "", description: "" }],
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        module: "",
        topics: [{ name: "", videoURL: "", pdfURL: "", description: "" }],
      },
    ]);
  };

  const handleAddTopic = (sectionIndex: number) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        return {
          ...section,
          topics: [
            ...section.topics,
            { name: "", videoURL: "", pdfURL: "", description: "" },
          ],
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    //e.preventDefault();
    console.log({
      courseTitle,
      courseDescription,
      thumbnail,
      courseCategory,
      coursePrice,
      sections,
    });
    setOpenDialog(false);
  };

  const handlePreview = () => {
    setOpenPreviewDialog(true);
    setOpenDialog(false);
  };

  const navigate = useNavigate();
  const handleSaveDraft = () => {
    setTimeout(() => {
      navigate("/admin-view-course");
    }, 200);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label
            htmlFor="courseTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </label>
          <input
            id="courseTitle"
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            required
          />
        </div>

        {/* Course Description */}
        <div>
          <label
            htmlFor="courseDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            rows={5}
            required
          />
        </div>

        {/* Upload Thumbnail */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Thumbnail
          </label>
          <input
            id="thumbnail"
            type="file"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        {/* Course Category */}
        <div>
          <label
            htmlFor="courseCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Course Category
          </label>
          <select
            id="courseCategory"
            value={courseCategory}
            onChange={(e) => setCourseCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        {/* Course Price */}
        <div>
          <label
            htmlFor="coursePrice"
            className="block text-sm font-medium text-gray-700"
          >
            Course Price
          </label>
          <input
            id="coursePrice"
            type="number"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>

        {/* Course Sections */}
        <div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Course Modules/Sections
          </h3>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-md p-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Module Name
                </label>
                <input
                  type="text"
                  value={section.module}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[sectionIndex].module = e.target.value;
                    setSections(updatedSections);
                  }}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
              {section.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="mt-4">
                  <h4 className="text-md font-semibold">
                    Topic {topicIndex + 1}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Topic Name
                      </label>
                      <input
                        type="text"
                        value={topic.name}
                        onChange={(e) => {
                          const updatedSections = [...sections];
                          updatedSections[sectionIndex].topics[
                            topicIndex
                          ].name = e.target.value;
                          setSections(updatedSections);
                        }}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Video URL
                      </label>
                      <input
                        type="url"
                        value={topic.videoURL}
                        onChange={(e) => {
                          const updatedSections = [...sections];
                          updatedSections[sectionIndex].topics[
                            topicIndex
                          ].videoURL = e.target.value;
                          setSections(updatedSections);
                        }}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PDF URL
                      </label>
                      <input
                        type="url"
                        value={topic.pdfURL}
                        onChange={(e) => {
                          const updatedSections = [...sections];
                          updatedSections[sectionIndex].topics[
                            topicIndex
                          ].pdfURL = e.target.value;
                          setSections(updatedSections);
                        }}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={topic.description}
                        onChange={(e) => {
                          const updatedSections = [...sections];
                          updatedSections[sectionIndex].topics[
                            topicIndex
                          ].description = e.target.value;
                          setSections(updatedSections);
                        }}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddTopic(sectionIndex)}
                className="mt-4 flex items-center text-purple-500 hover:text-purple-700"
              >
                <FaPlus className="mr-2" /> Add New Topic
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSection}
            className="mt-4 flex items-center text-purple-500 hover:text-purple-700"
          >
            <FaPlus className="mr-2" /> Add New Module
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => setOpenDialog(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Publish Course
          </button>
        </div>
      </form>
      {openDialog && (
        <PublishDialog
          onClose={() => setOpenDialog(false)}
          onPublish={handleSubmit}
          onPreview={handlePreview}
        />
      )}

      {openPreviewDialog && (
        <PreviewDialog
          courseData={{
            courseTitle,
            courseDescription,
            thumbnail,
            courseCategory,
            coursePrice,
            sections,
          }}
          onClose={() => setOpenPreviewDialog(false)}
        />
      )}
    </div>
  );
};

export default AddCourseForm;
