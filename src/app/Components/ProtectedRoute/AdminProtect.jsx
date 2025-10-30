import { useAuth } from "@/context/AuthContext";

function UserProtect({ children }) {
  const { user } = useAuth();
  if (user && user?.role === "admin") return <>{children}</>;
}
export default UserProtect;
