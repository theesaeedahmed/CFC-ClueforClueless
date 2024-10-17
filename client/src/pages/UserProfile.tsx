import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaVenusMars, FaBirthdayCake, FaMapMarkerAlt, FaPen, FaPlus, FaTimes, FaLinkedin, FaGithub, FaGlobe, FaCamera } from 'react-icons/fa';

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

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    password: '********',
    gender: 'Male',
    dob: '1990-01-01',
    location: 'New York, USA',
    summary: '',
    profilePicture: '',
    education: [],
    skills: [],
    languages: [],
    socials: [],
  });

  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const [newEducation, setNewEducation] = useState<Education>({ institution: '', degree: '' });
  const [newSkill, setNewSkill] = useState<string>('');
  const [newLanguage, setNewLanguage] = useState<Language>({ name: '', proficiency: '' });
  const [newSocial, setNewSocial] = useState<Social>({ platform: '', url: '' });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData({ ...userData, summary: e.target.value });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  const addEducation = () => {
    setUserData({ ...userData, education: [...userData.education, newEducation] });
    setNewEducation({ institution: '', degree: '' });
    setIsEducationOpen(false);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = userData.education.filter((_, i) => i !== index);
    setUserData({ ...userData, education: updatedEducation });
  };

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setUserData({ ...userData, skills: [...userData.skills, { name: newSkill.trim() }] });
      setNewSkill('');
      setIsSkillOpen(false);
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = userData.skills.filter((_, i) => i !== index);
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewLanguage({ ...newLanguage, [e.target.name]: e.target.value });
  };

  const addLanguage = () => {
    setUserData({ ...userData, languages: [...userData.languages, newLanguage] });
    setNewLanguage({ name: '', proficiency: '' });
    setIsLanguageOpen(false);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = userData.languages.filter((_, i) => i !== index);
    setUserData({ ...userData, languages: updatedLanguages });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewSocial({ ...newSocial, [e.target.name]: e.target.value });
  };

  const addSocial = () => {
    setUserData({ ...userData, socials: [...userData.socials, newSocial] });
    setNewSocial({ platform: '', url: '' });
    setIsSocialOpen(false);
  };

  const removeSocial = (index: number) => {
    const updatedSocials = userData.socials.filter((_, i) => i !== index);
    setUserData({ ...userData, socials: updatedSocials });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 mb-8">
        <Navbar/>
      <h1 className="text-3xl font-bold mt-20"></h1>

      {/* Profile Picture */}
      {/* <div className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col items-center">
        <label htmlFor="profilePicture" className="relative cursor-pointer">
          {userData.profilePicture ? (
            <img src={userData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
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
        <span className="text-gray-500 text-sm">Click to upload a profile picture</span>
      </div> */}

      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 ">
      <div className="flex justify-center mb-4" >
          <label htmlFor="profilePicture" className="relative cursor-pointer mr-6 ">
            {userData.profilePicture ? (
              <img src={userData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
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
          {/* <div>
            <span className="text-gray-500 text-sm"><FaPen /></span>
          </div> */}
          {/* <button
            onClick={() => handleProfilePictureChange}
            className="text-blue-500 hover:text-blue-600"
          >
            Edit
          </button> */}
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button
            onClick={() => setIsPersonalInfoOpen(true)}
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
            onClick={() => setIsSummaryOpen(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPen />
          </button>
        </div>
        <p className="text-gray-600">
          {userData.summary || "Help viewers of your profile get to know you better"}
        </p>
      </div>

      {/* Education */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            onClick={() => setIsEducationOpen(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        {userData.education.length === 0 ? (
          <p className="text-gray-600">Add your educational background here to let viewers know where you studied or are currently studying.</p>
        ) : (
          <ul>
            {userData.education.map((edu, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{edu.institution} - {edu.degree}</span>
                <button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-600">
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
            onClick={() => setIsSkillOpen(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {userData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
              {skill.name}
              <button onClick={() => removeSkill(index)} className="ml-2 text-red-500 hover:text-red-600">
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
            onClick={() => setIsLanguageOpen(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <ul>
          {userData.languages.map((lang, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>{lang.name} - {lang.proficiency}</span>
              <button onClick={() => removeLanguage(index)} className="text-red-500 hover:text-red-600">
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
            onClick={() => setIsSocialOpen(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaPlus />
          </button>
        </div>
        <ul>
          {userData.socials.map((social, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {social.platform === 'linkedin' && <FaLinkedin className="inline mr-2" />}
                {social.platform === 'github' && <FaGithub className="inline mr-2" />}
                {social.platform === 'portfolio' && <FaGlobe className="inline mr-2" />}
                {social.url}
              </a>
              <button onClick={() => removeSocial(index)} className="text-red-500 hover:text-red-600">
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Personal Info Dialog */}
      {isPersonalInfoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Personal Information</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsPersonalInfoOpen(false); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={userData.name} onChange={handlePersonalInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={userData.email} onChange={handlePersonalInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" name="phone" value={userData.phone} onChange={handlePersonalInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={userData.password} onChange={handlePersonalInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" value={userData.gender} onChange={handlePersonalInfoChange}   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" name="dob" value={userData.dob} onChange={handlePersonalInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" name="location" value={userData.location} onChange={handlePersonalInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Dialog */}
      {isSummaryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile Summary</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsSummaryOpen(false); }}>
              <textarea
                value={userData.summary}
                onChange={handleSummaryChange}
                className="w-full h-32 p-2 border rounded"
                placeholder="Enter your profile summary"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Dialog */}
      {isEducationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Education</h2>
            <form onSubmit={(e) => { e.preventDefault(); addEducation(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={newEducation.institution}
                  onChange={handleEducationChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <select
                  name="degree"
                  value={newEducation.degree}
                  onChange={handleEducationChange}
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Dialog */}
      {isSkillOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Skill</h2>
            <form onSubmit={(e) => { e.preventDefault(); addSkill(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Skill</label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter a skill"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Dialog */}
      {isLanguageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Language</h2>
            <form onSubmit={(e) => { e.preventDefault(); addLanguage(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  type="text"
                  name="name"
                  value={newLanguage.name}
                  onChange={handleLanguageChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Proficiency</label>
                <select
                  name="proficiency"
                  value={newLanguage.proficiency}
                  onChange={handleLanguageChange}
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Social Dialog */}
      {isSocialOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Social Link</h2>
            <form onSubmit={(e) => { e.preventDefault(); addSocial(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Platform</label>
                <select
                  name="platform"
                  value={newSocial.platform}
                  onChange={handleSocialChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Platform</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="url"
                  name="url"
                  value={newSocial.url}
                  onChange={handleSocialChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;