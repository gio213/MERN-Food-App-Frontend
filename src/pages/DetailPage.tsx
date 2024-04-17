import { useGetRestaurant } from "@/api/RestauratnApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CardItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { isLoading, restaurant } = useGetRestaurant(restaurantId);

  const [cardItems, setCardItems] = useState<CardItem[]>(() => {
    const storedCardItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCardItems ? JSON.parse(storedCardItems) : [];
  });

  const addToCard = (menuItem: MenuItemType) => {
    setCardItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) => {
          // Return updated item when condition matches
          return cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CardItem) => {
    setCardItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const onCheckout = (userFormData: UserFormData) => {
    console.log("userFormData", userFormData);
  };

  if (isLoading || !restaurant) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
          alt="restaurant image"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              addToCard={() => addToCard(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              removeFfromCart={removeFromCart}
              restaurant={restaurant}
              cardItems={cardItems}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cardItems.length === 0}
                onCheckout={() => onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
