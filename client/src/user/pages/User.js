import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook"

import UserList from "../components/UserList";

const User = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/`
          );
          setLoadedUser(responseData.users);
        } catch (err) {
        }
      };
      fetchUsers();
    }, [sendRequest]);

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}
        {!isLoading && loadedUser && <UserList items={loadedUser} />}
      </React.Fragment>
    );
}
 
export default User;
