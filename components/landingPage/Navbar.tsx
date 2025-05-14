"use client";

import { useClerk, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/Button";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import CartIcon from "../icons/CartIcon";
import HeartIcon from "../icons/HeartIcon";
import Logo from "../icons/Logo";

export default function Navbar() {
  const { openSignIn } = useClerk();
  const { router, user } = useAppContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav>
      <div className="grid grid-cols-3 justify-center mx-30 my-2 p-4 text-black">
        <div className="flex gap-4 items-center justify-start cursor-pointer" onClick={() => router.push("/contact-us")}>
            <div className="font-medium hover:rotate-45">+</div>
            <div className="font-medium text-sm">Contact Us</div>
        </div>
        <div className="flex tracking-widest justify-center cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        <div className="flex items-center justify-end gap-5">
          <div>
            {isSearchOpen ? (
              <div className="absolute top-20 left-0 w-full">
                <input
                  className="w-full px-5 py-3 border"
                  type="text"
                  placeholder="What are you looking for?"
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => setIsSearchOpen(true)}
              >
                <SearchIcon />
              </div>
            )}
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/wishlist")}>
            <HeartIcon />
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/cart")}>
            <CartIcon />
          </div>
          <div>
            {user ? (
              <>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Cart"
                      labelIcon={<></>}
                      onClick={() => router.push("/cart")}
                    />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Orders"
                      labelIcon={<></>}
                      onClick={() => router.push("/my-orders")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            ) : (
              <Button
                onClick={openSignIn}
                text="Login"
                size="small"
                variant="tertiary"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
