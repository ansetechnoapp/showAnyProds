
import { ShoppingCart } from 'lucide-react';
import { Sheet, SheetTrigger, SheetHeader, SheetContent, SheetTitle, SheetFooter } from './ui/sheet'
// import { Separator } from '@radix-ui/react-separator';
import { Link } from '@remix-run/react';
import { FormatPrice } from '../lib/utils';
import { buttonVariants } from './ui/button';



const itemCount = 0;
const fee = 1;

const Cart = ()=>{
    return <Sheet>
         <SheetTrigger className='group -m-2 flex items-center p-2'> 
            <ShoppingCart aria-hidden='true' className='h-6 w-6 flex-shrink-0 flex-gray-400 group-hover:text-gray-500'>
            </ShoppingCart> 

            <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 '>0</span>          
         </SheetTrigger>
         <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg bg-white'>
            <SheetHeader className='space-y-2.5 pr-6'>
                <SheetTitle>Cart(0)</SheetTitle>
            </SheetHeader>
            {
            itemCount > 0 ? (
                <>
                    <div className='flex w-full flex-col pr-6 '>
                        Item Cart
                    </div>
                <div className='space-y-4 pr-6'>
                    <Separator/>
                    <div className='space-y-1.5 text-sm'>
                        
                        <div className='flex'>
                            <span className='flex-1'>Shipping</span>
                            <span>Free</span>
                        </div>
                        
                        <div className='flex'>
                            <span className='flex-1'>Transaction Fee </span>
                            <span>{FormatPrice(fee)}</span>
                        </div>

                        <div className='flex'>
                            <span className='flex-1'>Total</span>
                            <span>{FormatPrice(fee)}</span>
                        </div>
                  
                    </div>
                    
                    <SheetFooter>
                        <SheetTrigger asChild >
                            <Link to='/cart' 
                            className={buttonVariants({className:'w-full'})}>
                                Continue to Check
                            </Link>
                        </SheetTrigger>
                    </SheetFooter>
                </div>
                </>
            ):(
               <div className='flex h-full flex-col items-center justify-center space-y-2'>
                    
                    <div aria-hidden='true' className='relative w-60 h-60 text-muted-foreground mb-4 '>
                        <img src='/hyppo.jpeg' 
                        fill
                        alt='Empty-Cart'/>
                    </div>
                    <div className='text-xl font-semibold'>
                        Your Card is empty
                    </div>
                    <SheetTrigger asChild>
                    <div>
                        <Link to='/product'
                               className={buttonVariants({
                                variant:'link',
                                size:'sm',
                                className:'text-sm text-muted-foreground'
                               })}>
                            Add items to your card to checkout
                        </Link>
                    </div>
                    </SheetTrigger>
               </div>
            )
            }
         </SheetContent>


         


    </Sheet>
}

export default Cart;