'use client';

import React, { useState } from 'react';
import './profile.css'; // Ensure to import your CSS


const ProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarClass, setAvatarClass] = useState('avatar-outfit-1');

  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(30);
  const maxExperience = 100;


  const xpPercentage = (experience / maxExperience) * 100; // Percentage of XP out of maxXP

  const [activeTab, setActiveTab] = useState('profile');

  const [skills, setSkills] = useState([]); // Store user skills in an array
  const [newSkill, setNewSkill] = useState(''); // Input for new skill

    // Function to handle adding a skill
    const handleAddSkill = () => {
      if (newSkill.trim() !== '') {
        setSkills([...skills, newSkill.trim()]);
        setNewSkill(''); // Clear input after adding
      }
    };
  
    // Function to remove a skill
    const handleRemoveSkill = (skill) => {
      setSkills(skills.filter((s) => s !== skill));
    };

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Avatar Save', description: 'Save your first avatar.', completed: false },
    { id: 2, title: 'First Quiz Passed', description: 'Pass your first quiz with a score of 70% or higher.', completed: true },
    { id: 3, title: 'Study Marathon', description: 'Study for 3 hours without distraction.', completed: false },
    { id: 4, title: 'Research Pro', description: 'Complete a research project with 5 or more sources cited.', completed: false },
    { id: 5, title: 'Group Study Master', description: 'Successfully collaborate in a group study session.', completed: true },
    { id: 6, title: 'All-Nighter Survivor', description: 'Study through the night to finish an important assignment.', completed: false },
    { id: 7, title: 'Perfect Attendance', description: 'Attend all classes for a month without missing a single session.', completed: false },
    { id: 8, title: 'Subject Expert', description: 'Score 90% or higher in a specific subject or course.', completed: false },
    { id: 9, title: 'Essay Champion', description: 'Write and submit an essay over 1,500 words on a challenging topic.', completed: false },
    { id: 10, title: 'Time Management Guru', description: 'Create and follow a study schedule for a week.', completed: true },
    { id: 11, title: 'Knowledge Seeker', description: 'Read 5 non-textbook books related to your field of study.', completed: false },
    { id: 12, title: 'Speed Reader', description: 'Read and summarize 100 pages in a single day.', completed: false },
    { id: 13, title: 'Ace of Flashcards', description: 'Use flashcards to memorize 100 pieces of information.', completed: false },
    { id: 14, title: 'Presentation Master', description: 'Give a successful presentation to a class or group.', completed: true },
    { id: 15, title: 'Peer Review Expert', description: 'Provide valuable feedback on 5 classmates’ assignments.', completed: false },
    { id: 16, title: 'Procrastination No More', description: 'Complete an assignment 3 days before the deadline.', completed: false },
    { id: 17, title: 'Critical Thinker', description: 'Analyze and critically evaluate a research paper or article.', completed: false },
    { id: 18, title: 'Memory Master', description: 'Memorize and recite a challenging formula or concept from memory.', completed: false },
    { id: 19, title: 'Language Learner', description: 'Learn the basics of a new language and pass a beginner test.', completed: false },
    { id: 20, title: 'Study Break Champion', description: 'Take healthy study breaks to improve focus and productivity.', completed: false },
    { id: 21, title: 'Perfect Planner', description: 'Plan your study time and achieve all tasks in a single week.', completed: false },
    { id: 22, title: 'Research Presentation', description: 'Present a research project with data and findings to peers.', completed: false },
    { id: 23, title: 'Mind Map Master', description: 'Create a detailed mind map for a complex topic.', completed: false },
    { id: 24, title: 'Math Whiz', description: 'Solve 50 math problems in one sitting.', completed: false },
    { id: 25, title: 'Chemistry Buff', description: 'Complete a challenging chemistry experiment with success.', completed: false },
    { id: 26, title: 'Study Journaler', description: 'Write daily in your study journal for a month.', completed: false },
    { id: 27, title: 'Online Course Graduate', description: 'Complete an online course with a certificate.', completed: false },
    { id: 28, title: 'Research Paper Writer', description: 'Write and submit a research paper over 5,000 words.', completed: false },
    { id: 29, title: 'Volunteer Tutor', description: 'Tutor a classmate or peer in a subject you excel in.', completed: false },
    { id: 30, title: 'Focused Learner', description: 'Study without distractions for an entire week.', completed: false },
    { id: 31, title: 'Exam Warrior', description: 'Complete a difficult exam with a passing grade in under 3 hours.', completed: false },
    { id: 32, title: 'Final Project Champion', description: 'Complete and present a final project for a course.', completed: false },
    { id: 33, title: 'Peer Learning Advocate', description: 'Organize a study group and successfully collaborate on learning material.', completed: false },
    { id: 34, title: 'Multitasking Master', description: 'Study for two different subjects simultaneously and retain information from both.', completed: false },
    { id: 35, title: 'Distraction-Free Zone', description: 'Create a distraction-free study environment for a week.', completed: false },
    { id: 36, title: 'Coding Guru', description: 'Complete a complex coding project and troubleshoot errors.', completed: false },
    { id: 37, title: 'Lab Expert', description: 'Complete a hands-on lab experiment with no mistakes.', completed: false },
    { id: 38, title: 'The Study Buddy', description: 'Help a classmate prepare for a major exam or project.', completed: false },
    { id: 39, title: 'Reading List Conqueror', description: 'Finish reading a required reading list for a semester or course.', completed: false },
    { id: 40, title: 'Study Consistency King/Queen', description: 'Study consistently for 30 days straight, hitting your daily study goal.', completed: false },
  ]);
  

  // Assume userLevel and other variables are already defined
let userLevel = 1; // Example starting level

// Function to dynamically create user-level container if it doesn't exist
function createUserLevelElement() {
  // Check if the 'user-level' element already exists
  let levelElement = document.getElementById("user-level");
  if (!levelElement) {
    // Create a new div if not found
    levelElement = document.createElement("div");
    levelElement.id = "user-level";  // Set the id
    document.body.appendChild(levelElement);  // Append to body or a specific container
  }
  return levelElement;
}

// Function to update the level display
function updateLevel() {
  const levelElement = createUserLevelElement();  // Create or get the level element
  levelElement.textContent = `Level: ${userLevel}`;  // Update the text content
}

// Function to create XP bar container if it doesn't exist
function createXPBar() {
  let xpBarElement = document.getElementById("xp-bar");
  if (!xpBarElement) {
    // Create a new div for the XP bar
    xpBarElement = document.createElement("div");
    xpBarElement.id = "xp-bar";
    xpBarElement.style.width = "100%";  // Set some width
    document.body.appendChild(xpBarElement); // Append to body or a specific container
  }
  return xpBarElement;
}

// Function to update the XP bar
function updateXPBar() {
  const xpBar = createXPBar(); // Create or get XP bar container
  const xpFill = xpBar.querySelector("#xp-fill");

  if (!xpFill) {
    // If xp-fill doesn't exist, create it
    const newXpFill = document.createElement("div");
    newXpFill.id = "xp-fill";
    xpBar.appendChild(newXpFill);  // Append to the XP bar
  }

  // Set the width of the XP fill based on user level (example logic)
  const xpFillWidth = userLevel * 10;  // Just an example, you can adjust the logic
  document.getElementById("xp-fill").style.width = `${xpFillWidth}%`;
}

// Simulate gaining XP and leveling up
function gainXP(amount) {
  userLevel += amount;
  updateLevel();  // Update the level display
  updateXPBar();  // Update the XP bar
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function() {
  updateLevel();  // Initial update of level
  updateXPBar();  // Initial XP bar update

  // Example: Simulate gaining XP after 2 seconds
  setTimeout(() => gainXP(1), 2000);  // Gain 1 level after 2 seconds
});

const levelUp = () => {
  if (experience + 10 >= maxExperience) {
    setExperience(0); // Reset XP to 0 for the next level
    setLevel(level + 1); // Increment the level
  } else {
    setExperience(experience + 10); // Add XP (for simulation)
  }
};

<div className="xp-bar-container">
<div className="xp-fill" style={{ width: `${xpPercentage}%` }} /> {/* This fills the XP bar */}
<div className="xp-text">
  <span className="xp-level">{level}</span> - <span className="xp-progress">{experience}/{maxExperience} XP</span>
</div>
</div>
  const [notifications, setNotifications] = useState([]); // To store notifications

  // Function to handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarChange = (newAvatarClass) => {
    setAvatarClass(newAvatarClass);
  };

  // Function to trigger achievement notification
  const triggerNotification = (achievementTitle) => {
    const newNotification = {
      id: Date.now(),
      message: `${achievementTitle} Unlocked!`,
    };

    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);

    // Remove the notification after a set time (e.g., 5 seconds)
    setTimeout(() => {
      setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif.id !== newNotification.id));
    }, 5000); // Notification disappears after 5 seconds
  };

  const saveAvatar = () => {
    // Check if the "First Avatar Save" achievement has been completed
    const updatedAchievements = achievements.map((achievement) => {
      if (achievement.title === 'First Avatar Save' && !achievement.completed) {
        achievement.completed = true;
        triggerNotification(achievement.title); // Trigger notification on achievement
      }
      return achievement;
    });
    setAchievements(updatedAchievements);
    alert('Avatar saved and achievement unlocked!');
  };

  // Render achievements
  const renderAchievements = () => {
    return achievements.map((achievement) => (
      <div key={achievement.id} className={`achievement-item ${achievement.completed ? 'completed' : ''}`}>
        <div className="achievement-icon">
          {achievement.completed ? (
            <i className="fas fa-trophy"></i>
          ) : (
            <i className="fas fa-check-circle"></i>
          )}
        </div>
        <div className="achievement-info">
          <h3>{achievement.title}</h3>
          <p>{achievement.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="profile-container">
      {/* Notification Popups */}
      <div className="notification-container">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification">
            <div className="notification-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="notification-message">{notif.message}</div>
          </div>
        ))}
      </div>

      {/* Tabs for Profile and Achievements */}
      <div className="tabs">
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
          Profile
        </button>
        <button className={activeTab === 'achievements' ? 'active' : ''} onClick={() => setActiveTab('achievements')}>
          Achievements
        </button>
        <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>
          Skills
        </button>
      </div>

      {/* Profile Section */}
      <div className={`tab-content ${activeTab === 'profile' ? 'fade-in' : 'fade-out'}`}>
        {activeTab === 'profile' && (
          <div>
            <header className="profile-header">
              <div className="name-container">
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="name-input"
                      autoFocus
                      maxLength={10}
                    />
                    <div className="char-count">{name.length} / 10</div>
                    <div className="save-icon" onClick={toggleEditMode} />
                  </div>
                ) : (
                  <div className="name-display">
                    <h1>{name}</h1>
                    <div className="edit-icon" onClick={toggleEditMode} />
                  </div>
                )}
              </div>

              {/* XP Bar */}
              <div className="xp-bar-container">
                <div className="xp-fill" style={{ width: `${xpPercentage}%` }} />
                <div className="xp-text">
                  <span className="xp-level">{level}</span> - <span className="xp-progress">{experience}/{maxExperience} XP</span>
                </div>
              </div>
            </header>

            {/* Avatar Customization Panel */}
            <div className="avatar-customization-container">
              <div className="avatar-customization-panel">
                <h2>Avatar Customization</h2>
                <div className={`avatar-preview ${avatarClass}`} />
                <div className="avatar-options">
                  <button onClick={() => handleAvatarChange('avatar-outfit-1')}>Outfit 1</button>
                  <button onClick={() => handleAvatarChange('avatar-outfit-2')}>Outfit 2</button>
                  <button onClick={() => handleAvatarChange('avatar-outfit-3')}>Outfit 3</button>
                </div>
                <div className="customization-footer">
                  <button onClick={saveAvatar}>Save Avatar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className={`tab-content ${activeTab === 'achievements' ? 'fade-in' : 'fade-out'}`}>
        {activeTab === 'achievements' && (
          <div className="achievements-container">
            <h2>Achievements</h2>
            <div className="achievements-list">
              {renderAchievements()}
              </div>
          </div>
        )}
      </div>

   {/* Skills Tab */}
   <div className={`tab-content ${activeTab === 'skills' ? 'fade-in' : 'fade-out'}`}>
        {activeTab === 'skills' && (
          <div className="skills-container">
            <h2>Skills</h2>
            <div className="skills-form">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="skill-input"
              />
              <button onClick={handleAddSkill} className="add-skill-button">
                Add Skill
              </button>
            </div>

            {/* Displaying skills */}
            {skills.length === 0 ? (
              <p className="no-skills-message">No skills added yet. Start by adding your skills!</p>
            ) : (
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index} className="skill-item">
                    <span className="skill-name">{skill}</span>
                    <button onClick={() => handleRemoveSkill(skill)} className="remove-skill-button">
                      x
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;