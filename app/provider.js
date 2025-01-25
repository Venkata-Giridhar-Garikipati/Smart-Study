"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
//import axios from "axios";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { USER_TABLE } from "@/configs/schema";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      CheckIsNewUser();
    }
  }, [user]);

  const CheckIsNewUser = async () => {
        //Check Is User Already Exist
        const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
        console.log(result)
  
        if (result?.length == 0){
          //If Not, Then add to DB
          const userResp = await db.insert(USER_TABLE).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
          }).returning({ id: USER_TABLE.id })
        
        }
       
    
  };

  return <div>{children}</div>;
}

export default Provider;
