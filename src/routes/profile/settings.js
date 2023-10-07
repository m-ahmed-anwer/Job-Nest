import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleEmailNotificationsToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  useEffect(() => {
    // Check the initial theme and apply it
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Set dark theme
    function setDarkTheme() {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }

    // Set light theme
    function setLightTheme() {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }

    // Theme switcher item click handler
    function onThemeSwitcherItemClick(event) {
      const theme = event.target.dataset.theme;

      if (theme === "system") {
        localStorage.removeItem("theme");
        // Call setSystemTheme() if you have this function
      } else if (theme === "dark") {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }

    // Attach click event listeners to theme switcher items
    const themeSwitcherItems = document.querySelectorAll("#theme-switcher");
    themeSwitcherItems.forEach((item) => {
      item.addEventListener("click", onThemeSwitcherItemClick);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      themeSwitcherItems.forEach((item) => {
        item.removeEventListener("click", onThemeSwitcherItemClick);
      });
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 ml-4">Settings</h1>

        <div className="mb-6 ml-4">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <div className="flex items-center">
            <label className="flex-1">Enable Notifications</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                className={`toggle-checkbox ${
                  notificationsEnabled ? "toggle-checkbox--enabled" : ""
                }`}
                onChange={handleNotificationsToggle}
                checked={notificationsEnabled}
              />
              <label
                htmlFor="notificationsToggle"
                className={`toggle-label ${
                  notificationsEnabled ? "toggle-label--enabled" : ""
                }`}
              ></label>
            </div>
          </div>
          <div className="ml-12">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={handleEmailNotificationsToggle}
                checked={emailNotifications}
              />
              Receive Email Notifications
            </label>
          </div>
        </div>

        <div className="mb-6 ml-4">
          <h2 className="text-lg font-semibold mb-2">Appearance</h2>
          <div className="flex items-center">
            <label className="flex-1">Dark Mode</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                className={`toggle-checkbox ${
                  darkModeEnabled ? "toggle-checkbox--enabled" : ""
                }`}
                onChange={handleDarkModeToggle}
                checked={darkModeEnabled}
              />
              <label
                htmlFor="darkModeToggle"
                className={`toggle-label ${
                  darkModeEnabled ? "toggle-label--enabled" : ""
                }`}
              ></label>
            </div>
          </div>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4">
          Save Changes
        </button>
        <body>
          <div class="container mx-auto mt-5 p-4">
            <h1 class="text-2xl font-bold mb-4">Change Password</h1>
            <form>
              <div class="mb-4">
                <label
                  for="currentPassword"
                  class="block font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  class="form-input mt-1 block w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="newPassword"
                  class="block font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  class="form-input mt-1 block w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="confirmNewPassword"
                  class="block font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  class="form-input mt-1 block w-full"
                  required
                />
              </div>
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Change Password
              </button>
            </form>
          </div>
        </body>
      </div>
    </div>
  );
}

export default Settings;
