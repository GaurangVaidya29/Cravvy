"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle(){const [dark,setDark]=useState(false);useEffect(()=>{const saved=localStorage.getItem('cravvy-theme');const value=saved==='dark';setDark(value);document.documentElement.dataset.theme=value?'dark':'light'},[]);function toggle(){const value=!dark;setDark(value);document.documentElement.dataset.theme=value?'dark':'light';localStorage.setItem('cravvy-theme',value?'dark':'light')}return <button className="themeToggle" onClick={toggle} aria-label="Toggle colour theme">{dark?'☀':'◐'}</button>}
