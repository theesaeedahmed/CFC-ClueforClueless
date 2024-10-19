import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaVenusMars,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaPen,
  FaPlus,
  FaTimes,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaCamera,
} from "react-icons/fa";

interface Education {
  institution: string;
  degree: string;
}

interface Skill {
  name: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Social {
  platform: string;
  url: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  dob: string;
  location: string;
  summary: string;
  profilePicture: string;
  education: Education[];
  skills: Skill[];
  languages: Language[];
  socials: Social[];
}

interface DialogState {
  personalInfo: boolean;
  summary: boolean;
  education: boolean;
  skill: boolean;
  language: boolean;
  social: boolean;
}

interface NewItemState {
  education: Education;
  skill: string;
  language: Language;
  social: Social;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    password: "********",
    gender: "Male",
    dob: "1990-01-01",
    location: "New York, USA",
    summary: "",
    profilePicture: "",
    education: [],
    skills: [],
    languages: [],
    socials: [],
  });

  const [dialogState, setDialogState] = useState<DialogState>({
    personalInfo: false,
    summary: false,
    education: false,
    skill: false,
    language: false,
    social: false,
  });

  const [newItem, setNewItem] = useState<NewItemState>({
    education: { institution: "", degree: "" },
    skill: "",
    language: { name: "", proficiency: "" },
    social: { platform: "", url: "" },
  });

  const toggleDialog = (dialog: keyof DialogState) => {
    setDialogState(prev => ({ ...prev, [dialog]: !prev[dialog] }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section: keyof UserData
  ) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' ? { ...prev[section], [name]: value } : value,
    }));
    console.log(userData);
  };

  const handleNewItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    item: keyof NewItemState
  ) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [item]: typeof prev[item] === 'string' ? value : { ...prev[item], [name]: value },
    }));
  };

  const addItem = (item: keyof NewItemState) => {
    setUserData(prev => {
      if (item === 'skill') {
        return {
          ...prev,
          skills: [...prev.skills, { name: newItem.skill }],
        };
      } else if (item === 'education') {
        return {
          ...prev,
          education: [...prev.education, newItem.education],
        };
      } else {
        return {
          ...prev,
          [item + 's']: [...prev[item + 's' as keyof UserData], newItem[item]],
        };
      }
    });

    setNewItem(prev => ({
      ...prev,
      [item]: item === 'skill' ? '' : { name: '', proficiency: '' },
    }));
    toggleDialog(item as keyof DialogState);
  };

  const removeItem = (item: keyof UserData, index: number) => {
    setUserData(prev => ({
      ...prev,
      [item]: (prev[item] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUserData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 mb-8 ">
      <nav className="w-full flex justify-center ">
        <div className="flex justify-center">
          <Navbar />
        </div>
      </nav>

      <h1 className="text-3xl font-bold mt-20"></h1>

      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 ">
        <div className="flex justify-center mb-4">
          <label
            htmlFor="profilePicture"
            className="relative cursor-pointer mr-6 "
          >
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <FaCamera className="text-gray-500 text-2xl" />
              </div>
            )}
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button
            onClick={() => toggleDialog('personalInfo')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <span>{userData.name}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-gray-500" />
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center">
            <FaLock className="mr-2 text-gray-500" />
            <span>{userData.password}</span>
          </div>
          <div className="flex items-center">
            <FaVenusMars className="mr-2 text-gray-500" />
            <span>{userData.gender}</span>
          </div>
          <div className="flex items-center">
            <FaBirthdayCake className="mr-2 text-gray-500" />
            <span>{userData.dob}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            <span>{userData.location}</span>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Summary</h2>
          <button
            onClick={() => toggleDialog('summary')}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPen />
          </button>
        </div>
        <p className="text-gray-600">
          {userData.summary ||
            "Help viewers of your profile get to know you better"}
        </p>
      </div>

      {/* Education */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            onClick={() => toggleDialog('education')}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        {userData.education.length === 0 ? (
          <p className="text-gray-600">
            Add your educational background here to let viewers know where you
            studied or are currently studying.
          </p>
        ) : (
          <ul>
            {userData.education.map((edu, index) => (
              <li
                key={index}
                className="mb-2 flex justify-between items-center"
              >
                <span>
                  {edu.institution} - {edu.degree}
                </span>
                <button
                  onClick={() => removeItem('education', index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Key Skills */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Key Skills</h2>
          <button
            onClick={() => toggleDialog('skill')}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {userData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {skill.name}
              <button
                onClick={() => removeItem('skills', index)}
                className="ml-2 text-red-500 hover:text-red-600"
              >
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Languages</h2>
          <button
            onClick={() => toggleDialog('language')}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <ul>
          {userData.languages.map((lang, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>
                {lang.name} - {lang.proficiency}
              </span>
              <button
                onClick={() => removeItem('languages', index)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Socials */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Socials</h2>
          <button
            onClick={() => toggleDialog('social')}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <ul>
          {userData.socials.map((social, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {social.platform === "linkedin" && (
                  <FaLinkedin className="inline mr-2" />
                )}
                {social.platform === "github" && (
                  <FaGithub className="inline mr-2" />
                )}
                {social.platform === "portfolio" && (
                  <FaGlobe className="inline mr-2" />
                )}
                {social.url}
              </a>
              <button
                onClick={() => removeItem('socials', index)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Personal Info Dialog */}
      {dialogState.personalInfo && (
        <div className="fixed inset-0 bg-black rounded-lg bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 pr-8 rounded-lg w-96 max-h-[60vh] overflow-y-auto my scrollbar-rounded">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog('personalInfo')}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Edit Personal Information
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toggleDialog('personalInfo');
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={(e) => handleInputChange(e, 'gender')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={(e) => handleInputChange(e, 'dob')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={(e) => handleInputChange(e, 'location')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Dialog */}
      {dialogState.summary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog('summary')}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile Summary</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toggleDialog('summary');
              }}
            >
              <textarea
                value={userData.summary}
                onChange={(e) => handleInputChange(e, 'summary')}
                className="w-full h-32 p-2 border rounded "
                placeholder="Enter your profile summary"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Dialog */}
      {dialogState.education && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog('education')}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Education</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem('education');
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={newItem.education.institution}
                  onChange={(e) => handleNewItemChange(e, 'education')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <select
                  name="degree"
                  value={newItem.education.degree}
                  onChange={(e) => handleNewItemChange(e, 'education')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Degree</option>
                  <option value="X">X</option>
                  <option value="XII">XII</option>
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Dialog */}
      {dialogState.skill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog('skill')}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Skill</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem('skill');
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Skill
                </label>
                <input
                  type="text"
                  value={newItem.skill}
                  onChange={(e) => handleNewItemChange(e, 'skill')}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter a skill"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Dialog */}
      {dialogState.language && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog('language')}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Language</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem('language');
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <input
                  type="text"
                  name="name"
                  value={newItem.language.name}
                  onChange={(e) => handleNewItemChange(e, 'language')}
                  className="mt-1 block w-full rounded-md pl-2 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Proficiency
                </label>
                <select
                  name="proficiency"
                  value={newItem.language.proficiency}
                  onChange={(e) => handleNewItemChange(e, 'language')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Native">Native</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Social Dialog */}
      {dialogState.social && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog('social')}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Social Link</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem('social');
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  name="platform"
                  value={newItem.social.platform}
                  onChange={(e) => handleNewItemChange(e, 'social')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Platform</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={newItem.social.url}
                  onChange={(e) => handleNewItemChange(e, 'social')}
                  className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;