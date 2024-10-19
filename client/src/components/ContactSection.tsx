import React from 'react';

const ContactSection: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-12 mx-auto">
                <div>
                    <p className="font-medium text-purple-500 dark:text-purple-400">Contact us</p>

                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
                        Chat to our friendly team
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        We’d love to hear from you. Please fill out this form or shoot us an email.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        <ContactInfo
                            icon={<EmailIcon />}
                            title="Email"
                            description="Our friendly team is here to help."
                            contact="hello@merakiui.com"
                        />
                        <ContactInfo
                            icon={<LiveChatIcon />}
                            title="Live chat"
                            description="Our friendly team is here to help."
                            contact="Start new chat"
                        />
                        <ContactInfo
                            icon={<OfficeIcon />}
                            title="Office"
                            description="Come say hello at our office HQ."
                            contact="100 Smith Street Collingwood VIC 3066 AU"
                        />
                        <ContactInfo
                            icon={<PhoneIcon />}
                            title="Phone"
                            description="Mon-Fri from 8am to 5pm."
                            contact="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
                        <form>
                            <div className="-mx-2 md:items-center md:flex">
                                <div className="flex-1 px-2">
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="flex-1 px-2 mt-4 md:mt-0">
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                <input
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>

                            <div className="w-full mt-4">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                                <textarea
                                    className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Message"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-500 rounded-lg hover:bg-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactInfo: React.FC<{ icon: React.ReactNode; title: string; description: string; contact: string }> = ({ icon, title, description, contact }) => {
    return (
        <div>
            <span className="inline-block p-3 text-purple-500 rounded-full bg-purple-100/80 dark:bg-gray-800">
                {icon}
            </span>

            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">{title}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            <p className="mt-2 text-sm text-purple-500 dark:text-purple-400">{contact}</p>
        </div>
    );
};

const EmailIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
    </svg>
);

const LiveChatIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
    </svg>
);

const OfficeIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-6.264-4.842 9.094 9.094 0 01-2.33-6.05V6.75H2.25zm1.368 0v4.173c0 1.273.318 2.526.885 3.646a10.5 10.5 0 004.943 4.668c.437.148.914.073 1.247-.187l1.043-.767c.28-.208.67-.213.964-.015l.975.975c.115.115.173.276.173.444v3.033a.75.75 0 01-1.064.683l-3.651-1.318a7.5 7.5 0 01-3.958-5.287 8.094 8.094 0 01-.294-2.369V6.75h12.75z"
        />
    </svg>
);

const PhoneIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5l-4.5 4.5-1.5 1.5-3-3 1.5-1.5 4.5-4.5M15 21a2.25 2.25 0 01-2.25-2.25v-1.5c0-.414.336-.75.75-.75h3c.414 0 .75.336.75.75v1.5A2.25 2.25 0 0115 21z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 3.75a1.5 1.5 0 013 0M15 4.5c.667 0 1.33.25 1.75.75"
        />
    </svg>
);

export default ContactSection;
