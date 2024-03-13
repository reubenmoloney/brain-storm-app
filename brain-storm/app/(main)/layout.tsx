import { NavigationTopbar } from "@/components/navigation/navigation-top-bar";

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <div>
            <div className="md:flex hidden pb-[50px]">
            <NavigationTopbar />
            </div>
            <div className="md:hidden pb-[50px]">
            MOBILE NAV BAR
            </div>
            {children}
        </div>
     );
}
 
export default AuthLayout;