import css from "./TabsList.module.css";

const TabsList = ({ activeTab, setActiveTab, isOwnProfile }) => {
  const handleClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const tabs = isOwnProfile
    ? [
        { label: "MY RECIPES", key: "my-recipes" },
        { label: "MY FAVORITES", key: "favorites" },
        { label: "FOLLOWERS", key: "followers" },
        { label: "FOLLOWING", key: "following" },
      ]
    : [
        { label: "RECIPES", key: "recipes" },
        { label: "FOLLOWERS", key: "followers" },
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
