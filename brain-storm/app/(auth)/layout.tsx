const AuthLayout = ({ children }: { children: React.ReactNode}) => {//comment
    return ( 
        <div className="flex justify-center pt-[100px]">
            {children}
        </div>
     );
}
 
export default AuthLayout;