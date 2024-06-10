import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { firebaseUser } = useAuth();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [firebaseUser?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin?email=${firebaseUser.email}`);
            return res.data?.admin;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;