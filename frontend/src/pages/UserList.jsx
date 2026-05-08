import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userlist/userSlice";
import MainLayout from "../components/MainLayout";
import CommonTable from "../components/CommonTable";

const UserList = () => {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector(
    (state) => state.userlist
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (error) {
    return (
      <MainLayout>
        <p className="text-danger">
          Error: {error}
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CommonTable
        title="👥 All Users"
        columns={[
          "ID",
          "Name",
          "Email",
          "Referral Code",
          "Referred By",
          "Role",
          "Joined On"
        ]}
        data={list || []}
        loading={loading}
        emptyMessage="No Users Found"
        renderRow={(user) => (
          <tr key={user.id}>
            <td>{user.id}</td>

            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>
              <span className="badge badge-credit">
                {user.referral_code}
              </span>
            </td>

            <td>
              {user.referred_by || "Direct"}
            </td>

            <td>
                
              <span
                className={`badge ${
                  user.role === "admin"
                    ? "badge-debit"
                    : "badge-credit"
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </td>

            <td>
              {new Date(
                user.created_at
              ).toLocaleDateString()}
            </td>
          </tr>
        )}
      />
    </MainLayout>
  );
};

export default UserList;