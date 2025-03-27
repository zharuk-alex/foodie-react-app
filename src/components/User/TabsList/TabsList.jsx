import css from "./TabsList.module.css";

const TabsList = ({ activeTab, setActiveTab, isOwnProfile }) => {
  const handleClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const tabs = isOwnProfile
    ? [
        { label: "My Recipes", key: "my-recipes" },
        { label: "My Favorites", key: "favorites" },
        { label: "Followers", key: "followers" },
        { label: "Following", key: "following" },
      ]
    : [
        { label: "Recipes", key: "recipes" },
        { label: "Followers", key: "followers" },
      ];

  return (
    <div className={css.tabsWrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${css.tabButton} ${
            tab.key === activeTab ? css.active : ""
          }`}
          onClick={() => handleClick(tab.key)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsList;
