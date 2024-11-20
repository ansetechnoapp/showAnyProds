import { NavLink } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { logo } from "../asset";
import { NavItems } from "./navItems";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";


const Navbar = () => {
  const user = null; // Placeholder for future user authentication logic

  return (
    <div className="bg-white sticky top-0 inset-x-0 z-50 h-16 shadow mt-0">
      <header className="relative bg-white">
        {/* Top border for visual separation */}
        <div className="border-b border-gray-200">
          <div className="flex items-center h-16 px-4 lg:px-8">
            {/* Logo Section */}
            <div className="flex-shrink-0 mr-10">
              <Link to="/" aria-label="Home">
                <img className="h-10 w-10" src={logo} alt="Logo" />
              </Link>
            </div>

            {/* Navigation Items for Larger Screens */}
            <div className="hidden lg:block lg:ml-8 lg:self-stretch pr-8 ">
              <NavItems />
            </div>


            <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg-justify-end lg:space-x-6">
                                 {user ? null : ( <Link to='/sign-in' className={buttonVariants({variant:"ghost"})}>Sign In</Link>
                                 ) }     
                                 {
                                    user? null:( <span className="h-6 w-px bg-gray-200" aria-hidden='true' /> )
                                 }   
                                 {
                                    user? (<p> </p>): ( <Link to='/sign-up' className={
                                        buttonVariants({variant:'ghost'})
                                    }>Create Account</Link> )
                                 }
                                 {
                                    user?  ( <span className='h-6 w-px bg-gray-200' aria-hidden='true'/> ) : null 
                                 }
                                 {
                                    user? null : (
                                        <div className="flex lg:ml-6">
                                            <span className='h-6 w-px bg-gray-200'
                                            aria-hidden='true'/>
                                        </div>
                                    )
                                 }
                                 <div className="ml-4 flow-root lg:ml-6">
                                    <Cart/>
                                 </div>
                </div>
             </div>

          
            <div className="ml-auto lg:hidden">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Open Menu"
              >
              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
