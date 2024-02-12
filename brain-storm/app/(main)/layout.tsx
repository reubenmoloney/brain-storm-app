import { NavigationTopbar } from "@/components/navigation/navigation-top-bar";

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <div>
            <div className="pb-[50px]">
            <NavigationTopbar />
            </div>
            {children}
        </div>
     );
}
 
export default AuthLayout;