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
  FaEye,
  FaEyeSlash,
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

  const [tempUserData, setTempUserData] = useState<UserData>(userData);

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

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleDialog = (dialog: keyof DialogState) => {
    setDialogState((prev) => ({ ...prev, [dialog]: !prev[dialog] }));
    if (dialog === "personalInfo" || dialog === "summary") {
      setTempUserData(userData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section: keyof UserData
  ) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], [name]: value }
          : value,
    }));
    console.log(userData);
  };

  const handleNewItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    item: keyof NewItemState
  ) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [item]:
        typeof prev[item] === "string"
          ? value
          : { ...prev[item], [name]: value },
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    // const re = /^\+?[1-9]\d{1,14}$/;
    const re = /^\+?(?:[1-9]\d{1,4})?\d{10}$/;
    // const re = /^\d{10}$/;
    return re.test(phone);
  };

  const validatePassword = (password: string) => {
    // At least one lowercase letter, one uppercase letter, one digit, one special character, and minimum length of 8 characters
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };
  

  const validatePersonalInfo = () => {
    const newErrors: { [key: string]: string } = {};

    if (!tempUserData.name.trim()) newErrors.name = "Name is required";
    if (!tempUserData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(tempUserData.email))
      newErrors.email = "Invalid email format";
    if (!tempUserData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!validatePhone(tempUserData.phone))
      newErrors.phone = "Invalid phone format";
    if (!tempUserData.password.trim())
      newErrors.password = "Password is required";
    else if (!validatePassword(tempUserData.password))
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and minimum length of 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const savePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePersonalInfo()) {
      setUserData(tempUserData);
      toggleDialog("personalInfo");
    }
  };

  const saveSummary = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, summary: tempUserData.summary }));
    toggleDialog("summary");
  };

  const addItem = (item: keyof NewItemState) => {
    if (
      item === "education" &&
      (!newItem.education.institution || !newItem.education.degree)
    ) {
      setErrors({ education: "Both institution and degree are required" });
      return;
    }
    if (item === "skill" && !newItem.skill.trim()) {
      setErrors({ skill: "Skill name is required" });
      return;
    }
    if (
      item === "language" &&
      (!newItem.language.name || !newItem.language.proficiency)
    ) {
      setErrors({
        language: "Both language name and proficiency are required",
      });
      return;
    }
    if (
      item === "social" &&
      (!newItem.social.platform || !newItem.social.url)
    ) {
      setErrors({ social: "Both platform and URL are required" });
      return;
    }

    setUserData((prev) => {
      if (item === "skill") {
        return {
          ...prev,
          skills: [...prev.skills, { name: newItem.skill }],
        };
      } else if (item === "education") {
        return {
          ...prev,
          education: [...prev.education, newItem.education],
        };
      } else {
        return {
          ...prev,
          [item + "s"]: [
            ...prev[(item + "s") as keyof UserData],
            newItem[item],
          ],
        };
      }
    });

    setNewItem((prev) => ({
      ...prev,
      [item]: item === "skill" ? "" : { name: "", proficiency: "" },
    }));
    setErrors({});
    toggleDialog(item as keyof DialogState);
  };

  const removeItem = (item: keyof UserData, index: number) => {
    setUserData((prev) => ({
      ...prev,
      [item]: (prev[item] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className=" shadow-md w-full fixed top-0 z-10">
        <div className="flex justify-center w-full mx-auto px-4 py-2 ">
          <Navbar />
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-3xl py-4 font-bold text-gray-800 mb-8"></div>
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1> */}

        {/* Personal Information */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-purple-500">
          <div className="flex justify-center mb-6">
            <label
              htmlFor="profilePicture"
              className="relative cursor-pointer "
            >
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-800"
                />
              ) : (
                <div className="w-32 h-32 bg-blue-100 border-blue-500 rounded-full flex items-center justify-center border-4 hover:border-purple-400">
                  <FaCamera className="text-blue-500 text-4xl hover:border-purple-400" />
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            <button
              onClick={() => toggleDialog("personalInfo")}
              className="bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-purple-500 rounded"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <FaUser className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.name}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.phone}</span>
            </div>
            <div className="flex items-center">
              <FaLock className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.password.replace(/./g, "*")}</span>
            </div>
            <div className="flex items-center">
              <FaVenusMars className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.gender}</span>
            </div>
            <div className="flex items-center">
              <FaBirthdayCake className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.dob}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-3 text-blue-500 text-xl" />
              <span className="text-gray-700">{userData.location}</span>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Profile Summary</h2>
            <button
              onClick={() => toggleDialog("summary")}
              className="text-blue-500 hover:text-purple-600 transition duration-300 ease-in-out"
            >
              <FaPen className="text-xl" />
            </button>
          </div>
          <p className="text-gray-700">
            {userData.summary ||
              "Help viewers of your profile get to know you better"}
          </p>
        </div>

        {/* Education */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            <button
              onClick={() => toggleDialog("education")}
              className="text-blue-500 hover:text-purple-600 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-xl" />
            </button>
          </div>
          {userData.education.length === 0 ? (
            <p className="text-gray-600">
              Add your educational background here to let viewers know where you
              studied or are currently studying.
            </p>
          ) : (
            <ul className="space-y-4">
              {userData.education.map((edu, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <span className="text-gray-700">
                    {edu.institution} - {edu.degree}
                  </span>
                  <button
                    onClick={() => removeItem("education", index)}
                    className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Key Skills */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Key Skills</h2>
            <button
              onClick={() => toggleDialog("skill")}
              className="text-blue-500 hover:text-purple-600 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-xl" />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {skill.name}
                <button
                  onClick={() => removeItem("skills", index)}
                  className="ml-2 text-blue-500 hover:text-blue-600"
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Languages</h2>
            <button
              onClick={() => toggleDialog("language")}
              className="text-blue-500 hover:text-purple-600 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-xl" />
            </button>
          </div>
          <ul className="space-y-4">
            {userData.languages.map((lang, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-700">
                  {lang.name} - {lang.proficiency}
                </span>
                <button
                  onClick={() => removeItem("languages", index)}
                  className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Socials</h2>
            <button
              onClick={() => toggleDialog("social")}
              className="text-blue-500 hover:text-purple-600 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-xl" />
            </button>
          </div>
          <ul className="space-y-4">
            {userData.socials.map((social, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  {social.platform === "linkedin" && (
                    <FaLinkedin className="mr-2 text-xl" />
                  )}
                  {social.platform === "github" && (
                    <FaGithub className="mr-2 text-xl" />
                  )}
                  {social.platform === "portfolio" && (
                    <FaGlobe className="mr-2 text-xl" />
                  )}
                  {social.url}
                </a>
                <button
                  onClick={() => removeItem("socials", index)}
                  className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Personal Info Dialog */}
      {dialogState.personalInfo && (
        <div className="fixed inset-0 bg-black rounded-lg bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 pr-8 rounded-lg w-96 max-h-[60vh] overflow-y-auto my scrollbar-rounded">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => toggleDialog("personalInfo")}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Edit Personal Information
            </h2>
            <form onSubmit={savePersonalInfo}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={tempUserData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={tempUserData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={tempUserData.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={tempUserData.password}
                    onChange={(e) => handleInputChange(e, "password")}
                    className="mt-1 block w-full pl-2 pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {/* <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={tempUserData.password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  className="mt-1 block w-full pl-2 pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  
                /> */}
                {/* <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button> */}
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={tempUserData.gender}
                  onChange={(e) => handleInputChange(e, "gender")}
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
                  value={tempUserData.dob}
                  onChange={(e) => handleInputChange(e, "dob")}
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
                  value={tempUserData.location}
                  onChange={(e) => handleInputChange(e, "location")}
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
              onClick={() => toggleDialog("summary")}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile Summary</h2>
            <form onSubmit={saveSummary}>
              <textarea
                value={tempUserData.summary}
                onChange={(e) => handleInputChange(e, "summary")}
                className="w-full h-32 p-2 border rounded"
                placeholder="Enter your profile summary"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-purple-500 rounded"
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
              onClick={() => toggleDialog("education")}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Education</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem("education");
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
                  onChange={(e) => handleNewItemChange(e, "education")}
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
                  onChange={(e) => handleNewItemChange(e, "education")}
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
              {errors.education && (
                <p className="text-red-500 text-sm mb-4">{errors.education}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-purple-500 rounded"
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
              onClick={() => toggleDialog("skill")}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Skill</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem("skill");
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  
                </label>
                <input
                  type="text"
                  value={newItem.skill}
                  onChange={(e) => handleNewItemChange(e, "skill")}
                  className="mt-1 block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter a skill"
                />
              </div>
              {errors.skill && (
                <p className="text-red-500 text-sm mb-4">{errors.skill}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-purple-500 rounded"
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
              onClick={() => toggleDialog("language")}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Language</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem("language");
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
                  onChange={(e) => handleNewItemChange(e, "language")}
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
                  onChange={(e) => handleNewItemChange(e, "language")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Native">Native</option>
                </select>
              </div>
              {errors.language && (
                <p className="text-red-500 text-sm mb-4">{errors.language}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-purple-500 rounded"
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
              onClick={() => toggleDialog("social")}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Social Link</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem("social");
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  name="platform"
                  value={newItem.social.platform}
                  onChange={(e) => handleNewItemChange(e, "social")}
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
                  onChange={(e) => handleNewItemChange(e, "social")}
                  className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              {errors.social && (
                <p className="text-red-500 text-sm mb-4">{errors.social}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-purple-500 rounded"
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