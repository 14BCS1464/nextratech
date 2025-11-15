"use client";

import AdminDashboard from "@/app/feature/admin/home/ui";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function AdminHomePage() {
  const router = useRouter()
  useEffect(()=>{
    
   // router.push("/admin-AR-SK-30121995-X9B7Q4");
  },[])
  
  return (
    <AdminDashboard/>
  );
}
