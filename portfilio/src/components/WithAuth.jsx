import { Claims } from "@auth0/nextjs-auth0/dist/session/session";
const isAuthorized = (user, role) => {
  return (
    user &&
    // user[process.env.AUTH0_NAMESPACE + "/roles"] &&
    user[AUTH0_ISSUER_BASE_URL + "/roles"].includes(role)
  );
};

const useGetUser = () => {
  // "/api/v1/me" is passed to fetcher as url
  const { data, error, ...rest } = useSWR("/api/v1/me", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};

function withAuth(Component) {
  return (role) => {
    return (props) => {
      // CUSTOM HOOK TO GET THE USER
      const { data, loading } = useGetUser();
      if (loading) {
        return <p>Loading...</p>;
      }

      if (!data) {
        return <Redirect to="/api/v1/login" />;
      } else {
        if (role && !isAuthorized(data, role)) {
          return <Redirect to="/api/v1/login" />;
        }

        return <Component user={data} loading={loading} {...props} />;
      }
    };
  };
}

export default withAuth;
