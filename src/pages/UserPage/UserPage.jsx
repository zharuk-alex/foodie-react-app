import css from "./UserPage.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PathInfo from "components/PathInfo";
import { MainTitle, Subtitle, Modal } from "components/UI";
import { UserInfo, FollowButton, TabsList, ListItems, ListPagination } from "components/User";
// import { LogOutModal } from "components/UI";
import { useAuth } from "hooks/useAuth"; // to do!!!!!!
import { getUserProfile } from "api/user"; // to do!!!!!!

const UserPage = () => {
  const { id } = useParams();
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("recipes");
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const isOwnProfile = id === authUser?.id;

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfile(id);
        setUserData(data);
      } catch (err) {
        setError("User not found");
      }
    })();
  }, [id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await fetchTabItems({
          id,
          activeTab,
          page: currentPage,
        });
        setItems(data);
        setPaginationInfo(pagination);
      } catch {
        setItems([]);
      }
    })();
  }, [activeTab, currentPage]);

  useEffect(() => {
    if (items.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [items, currentPage]);

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <PathInfo current="User Profile" />
      <MainTitle
        title={isOwnProfile ? "My Profile" : `${userData?.name}'s Profile`}
      />
      <Subtitle subtitle="Welcome to the user profile page" />
      <UserInfo user={userData} isOwnProfile={isOwnProfile} />
      {isOwnProfile ? (
        <button type="button" onClick={() => setModalOpen(true)}>
          Log Out
        </button>
      ) : (
        <FollowButton profileUserId={id} />
      )}
      <TabsList
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOwnProfile={isOwnProfile}
      />
      <ListItems tab={activeTab} items={items} />
      <ListPagination
        currentPage={currentPage}
        totalPages={paginationInfo?.totalPages || 1}
        onPageChange={setCurrentPage}
      />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {/* <LogOutModal /> */}
      </Modal>
    </div>
  );
};

export default UserPage;
