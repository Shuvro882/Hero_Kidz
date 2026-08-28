"use server";
import { authOptions } from "@/lib/authOption";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";


const cartCollections=dbConnect(collections.CART);

export const handleCart = async( productId )=>{
  const {user} = (await getServerSession(authOptions)) || {};
  console.log(user);
  if(!user)
    return{success:false}

  //getCartItem- user.email && productId
 const query = {email: user?.email, productId};

 const isAdded = await cartCollections.findOne(query);

 if(isAdded){
  //if Exist: Update Cart

  const updatedData = {
    $inc: {
      quantity: 1,
    },
  }
  
  const result = await cartCollections.updateOne(query, updatedData);
  return {success: Boolean(result.modifiedCount) };
 }else{
  const product = await dbConnect(collections.PRODUCTS).findOne({
    _id:new ObjectId(productId),
  })
//Not Exist: insert Cart
  const newData = {
    productId: product?._id,
    email:user?.email,
    title:product.title,
    quantity:1,
    image:product.image,
    price:product.price - (product.price * product.discount) / 100,
    userName: user?.name,
  };

  const result = await cartCollections.insertOne(newData);
  return { success: result.acknowledged};
 } 
};

export const getCart= cache(async()=>{
 const {user} = (await getServerSession(authOptions)) || {};
  if(!user) return[];

  const query = {email:user?.email};
  const result =await cartCollections.find(query).toArray();
  return result;
});


export const deleteItemsFromCart = async(id)=>{
  const {user} = (await getServerSession(authOptions)) || {};
  if(!user) return {success:false};

  if(id?.length != 24){
    return {success: false};
  }

  const query ={_id: new ObjectId(id), email:user?.email};

  const result=await cartCollections.deleteOne(query);
 
  // if(Boolean(result.deletedCount)){
  //   revalidatePath("/cart")
  // }


  return {success: Boolean(result.deletedCount)};
};



export const decreaseItemDb = async (id, quantity)=>{
  const {user} = (await getServerSession(authOptions)) || {};
  if(!user) return {success:false};

  if(quantity <= 1){
     return {success: false, message:"quantity cant be empty"};
  };


   const query ={_id: new ObjectId(id), email:user?.email};


  const updatedData = {
    $inc: {
      quantity: -1,
    },
  }


  const result=await cartCollections.updateOne(query, updatedData);

  return {success: Boolean(result.modifiedCount)};
}
export const increaseItemDb = async (id, quantity)=>{
  const {user} = (await getServerSession(authOptions)) || {};
  if(!user) return {success:false};

  if(quantity > 10){
     return {success: false, message:"You cant buy 10 products at a time"};
  };


    const query ={_id: new ObjectId(id), email:user?.email};


  const updatedData = {
    $inc: {
      quantity: 1,
    },
  }


  const result= await cartCollections.updateOne(query, updatedData);

  return {success: Boolean(result.modifiedCount)};
}

export const clearCart = async()=>{
    const { user } = (await getServerSession(authOptions)) || {};
    if(!user) return {success:false};
    const query = {email:user?.email};
    const result =await cartCollections.deleteMany(query);
    return result; 
  }  