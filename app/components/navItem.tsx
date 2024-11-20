import { PRODUCT_CATEGORIES } from '../../types';
//import { Button } from '@mui/material';
import { Link } from '@remix-run/react';
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";
import { Button } from './ui/button';

// type featureArray={
//     name:string,
//     href:string,
//     imageSrc:string
// }

type categorieArray= (typeof PRODUCT_CATEGORIES)[number]

type propsType = {
    categorie: categorieArray,
    handleOpen:()=>void,
    isOpen:boolean,
    isAnyOpen:boolean

}
const NavItem=({categorie,handleOpen,isOpen,isAnyOpen}:propsType)=>{


    return (
        <div className="flex">
           
            <div className=" lg:flex lg:flex-1 lg:items-center lg-justify-end space-x-5 px-4">
            <Link to='/accueil' className={buttonVariants({variant:"link"})}>Accueil</Link>
            </div>
            
            <div className="lg:flex lg:flex-1 lg:items-center lg-justify-end space-x-6 px-4">
                <Button 
                    className='gap 1.5' 
                    onClick={handleOpen} 
                    variant={isOpen ? "outline": "link"}>
                    {categorie.boutique}
                    
                    <ChevronDown  className={cn('h-4 w-4 transition all text-muted-foreground',
                 {'-rotate-180':isOpen})}  />
                </Button>
            </div>
            {
                isOpen ? (
                     
                    <div className={ cn('absolute inset-x-2 text top-full text-sm text-muted-foreground', 
                        {
                            'animate-in fade-in-10 slide-in-from-top-20':!isAnyOpen
                        }
                    ) }>
                        <div className='absolute inset-0 top-1/2 bg-white shadow' aria-hidden='true'></div>
                        <div className='relative bg-white'>
                            <div className='mx-auto max-w-7xl px-8'>
                                <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                                    <div className='col-span-4 col-start-1 grid grid-start-1 grid-cols-3 gap-x-8'>
                                        {categorie.feature.map((item)=>(
                                            <div key={item.name} className='group relative text-base sm:text-sm'>
                                                <Link to={item.href} className='mt-6 block font-medium'> {item.name}</Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ): null
            }

            <div className="lg:flex lg:flex-1 lg:items-center lg-justify-end space-x-6 px-4">
                <Link to='/sign-in' className={buttonVariants({variant:"link"})}>A Propos</Link>
            </div>

        </div>
    )

}

export default NavItem;