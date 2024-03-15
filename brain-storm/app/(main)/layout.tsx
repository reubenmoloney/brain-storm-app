import { MobileNavBar } from "@/components/navigation/mobile-nav";
import { NavigationTopbar } from "@/components/navigation/navigation-top-bar";

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <div>
            <div className="md:flex hidden z-15 pb-[50px]">
                <NavigationTopbar />
            </div>
            <div className="md:hidden z-15 pb-[50px]">
                <MobileNavBar />
            </div>
            <span className="z-0">
                {children}
            </span>
        </div>
     );
}
 
export default AuthLayout;